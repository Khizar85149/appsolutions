"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarBlank,
  CaretLeft,
  CaretRight,
  CheckCircle,
  Clock,
  DownloadSimple,
  GlobeHemisphereWest,
  UserPlus,
  VideoCamera,
} from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";
import { submitLead } from "@/lib/submit";
import type { ConsultationType } from "@/lib/types";
import {
  buildIcs,
  dateKeyInZone,
  formatDateKey,
  formatTime,
  getAvailability,
  HOST_TIME_ZONE,
  lastBookableDateKey,
  listTimeZones,
  timeZoneLabel,
  toDateKey,
} from "./availability";

type Step = 1 | 2 | 3;

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const BUDGETS = [
  "Under $25,000",
  "$25,000 to $50,000",
  "$50,000 to $100,000",
  "$100,000 to $250,000",
  "Over $250,000",
  "Not sure yet",
];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const CONFERENCING = "Web conferencing details provided upon confirmation";

const noopSubscribe = () => () => {};

interface FormState {
  name: string;
  email: string;
  company: string;
  phone: string;
  guests: string;
  budget: string;
  notes: string;
}

const emptyForm: FormState = { name: "", email: "", company: "", phone: "", guests: "", budget: "", notes: "" };

function parseGuests(value: string): string[] {
  return value
    .split(/[\s,;]+/)
    .map((g) => g.trim())
    .filter(Boolean);
}

export function Scheduler({ session }: { session: ConsultationType }) {
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  const [now, setNow] = useState(() => Date.now());
  const [zoneChoice, setZoneChoice] = useState<string | null>(null);
  const [hour12, setHour12] = useState(true);
  const [view, setView] = useState<{ year: number; month: number } | null>(null);
  const [dateKey, setDateKey] = useState<string | null>(null);
  const [slot, setSlot] = useState<number | null>(null);
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [showGuests, setShowGuests] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sending, setSending] = useState(false);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const timesRef = useRef<HTMLDivElement>(null);
  const lastStep = useRef<Step>(1);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(id);
  }, []);

  // Move focus to the step heading whenever the step changes.
  useEffect(() => {
    if (lastStep.current !== step) {
      lastStep.current = step;
      headingRef.current?.focus();
    }
  }, [step]);

  const timeZone = zoneChoice ?? (mounted ? Intl.DateTimeFormat().resolvedOptions().timeZone : HOST_TIME_ZONE);
  const zones = useMemo(() => (mounted ? listTimeZones(timeZone) : []), [mounted, timeZone]);

  // Recalculate open slots at most every ten minutes.
  const bucket = Math.floor(now / 600000);
  const availability = useMemo(
    () => (mounted ? getAvailability(bucket * 600000, timeZone, session.duration) : new Map<string, number[]>()),
    [mounted, bucket, timeZone, session.duration],
  );

  const todayKey = dateKeyInZone(now, timeZone);
  const lastKey = lastBookableDateKey(now, timeZone);
  const firstOpenKey = useMemo(() => [...availability.keys()].sort()[0] ?? null, [availability]);

  const [todayYear, todayMonth] = todayKey.split("-").map(Number);
  const [lastYear, lastMonth] = lastKey.split("-").map(Number);
  const defaultView = firstOpenKey
    ? { year: Number(firstOpenKey.slice(0, 4)), month: Number(firstOpenKey.slice(5, 7)) }
    : { year: todayYear, month: todayMonth };
  const current = view ?? defaultView;
  const canGoBack = current.year * 12 + current.month > todayYear * 12 + todayMonth;
  const canGoForward = current.year * 12 + current.month < lastYear * 12 + lastMonth;

  const shiftMonth = (delta: number) => {
    const index = current.year * 12 + (current.month - 1) + delta;
    setView({ year: Math.floor(index / 12), month: (index % 12) + 1 });
  };

  const firstWeekday = new Date(Date.UTC(current.year, current.month - 1, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(current.year, current.month, 0)).getUTCDate();
  const monthTitle = formatDateKey(toDateKey(current.year, current.month, 1), { month: "long", year: "numeric" });

  const slots = dateKey ? (availability.get(dateKey) ?? []) : [];
  const nowInZone = formatTime(now, timeZone, hour12);

  const chooseDate = (key: string) => {
    setDateKey(key);
    setSlot(null);
    requestAnimationFrame(() => timesRef.current?.focus());
  };

  const changeZone = (zone: string) => {
    setZoneChoice(zone);
    setView(null);
    setDateKey(slot ? dateKeyInZone(slot, zone) : null);
  };

  const update = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!slot) return;
    const next: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 2) next.name = "Enter your full name.";
    if (!EMAIL.test(form.email.trim())) next.email = "Enter a valid work email address.";
    if (!form.company.trim()) next.company = "Enter your company name.";
    const guests = parseGuests(form.guests);
    if (guests.some((g) => !EMAIL.test(g))) next.guests = "Check the guest email addresses. Separate them with commas.";
    else if (guests.length > 5) next.guests = "You can add up to five guests.";
    setErrors(next);
    const firstError = Object.keys(next)[0];
    if (firstError) {
      document.getElementById(`booking-${firstError}`)?.focus();
      return;
    }
    setSending(true);
    await submitLead({
      kind: "consultation",
      session: session.slug,
      startsAt: new Date(slot).toISOString(),
      durationMinutes: session.duration,
      timeZone,
      name: form.name.trim(),
      email: form.email.trim(),
      company: form.company.trim(),
      phone: form.phone.trim(),
      guests,
      budget: form.budget,
      notes: form.notes.trim(),
    });
    setSending(false);
    setStep(3);
  };

  const downloadIcs = () => {
    if (!slot) return;
    const ics = buildIcs({
      startMs: slot,
      durationMinutes: session.duration,
      title: `${session.name} with ${site.name}`,
      description: `${session.summary}\nHost: ${session.host.name}, ${session.host.role}.\nThe video link will arrive by email.`,
      organizerName: site.name,
      organizerEmail: site.email,
      uidDomain: new URL(site.url).hostname,
    });
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `apps-solutions-${session.slug}.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const slotRange = slot
    ? `${formatTime(slot, timeZone, hour12)} to ${formatTime(slot + session.duration * 60000, timeZone, hour12)}`
    : "";
  const slotDate = slot ? formatDateKey(dateKeyInZone(slot, timeZone)) : "";

  const stepMessage =
    step === 1 ? "Step 1 of 3. Select a date and time." : step === 2 ? "Step 2 of 3. Enter your details." : "Booking confirmed.";

  const cardClass =
    "mx-auto w-full max-w-[1060px] overflow-hidden rounded-2xl border border-rule bg-card shadow-[0_1px_2px_rgba(21,22,19,0.05)]";

  /* ---------------------------------------------------------------- */
  /* Step 3: confirmation                                              */
  /* ---------------------------------------------------------------- */
  if (step === 3 && slot) {
    const rows = [
      { label: "Session", value: `${session.name}, ${session.duration} minutes` },
      { label: "Host", value: `${session.host.name}, ${session.host.role}` },
      { label: "Date and time", value: `${slotRange}, ${slotDate}` },
      { label: "Time zone", value: timeZoneLabel(timeZone) },
      { label: "Conferencing", value: "Video call. The link arrives with your invitation." },
    ];
    return (
      <div className={cardClass}>
        <p aria-live="polite" className="sr-only">
          {stepMessage}
        </p>
        <div className="mx-auto max-w-xl px-5 py-12 text-center sm:px-8 md:py-16">
          <CheckCircle size={52} weight="light" aria-hidden="true" className="mx-auto text-moss" />
          <h2 ref={headingRef} tabIndex={-1} className="h3 mt-5 outline-none">
            You are scheduled
          </h2>
          <p className="body mt-3 text-stone">
            A calendar invitation will be sent to <span className="font-medium text-ink">{form.email.trim()}</span>.
          </p>
          <dl className="mt-9 rounded-xl border border-rule text-left">
            {rows.map((r, i) => (
              <div key={r.label} className={`grid gap-1 px-5 py-4 sm:grid-cols-[9rem_1fr] sm:gap-4 ${i > 0 ? "border-t border-rule" : ""}`}>
                <dt className="text-sm text-stone">{r.label}</dt>
                <dd className="text-[0.9375rem] font-medium leading-snug">{r.value}</dd>
              </div>
            ))}
          </dl>
          <button type="button" onClick={downloadIcs} className="btn btn-ink mt-8 w-full sm:w-auto">
            <DownloadSimple size={18} aria-hidden="true" />
            Add to calendar
          </button>
          <p className="mt-8 text-sm text-stone">
            While you wait, see{" "}
            <Link href="/case-studies" className="link text-ink">
              how similar projects turned out
            </Link>{" "}
            or{" "}
            <Link href="/" className="link text-ink">
              return to the home page
            </Link>
            .
          </p>
        </div>
      </div>
    );
  }

  /* ---------------------------------------------------------------- */
  /* Steps 1 and 2                                                     */
  /* ---------------------------------------------------------------- */
  return (
    <div className={cardClass}>
      <p aria-live="polite" className="sr-only">
        {stepMessage}
      </p>
      <div className="grid lg:grid-cols-[minmax(0,340px)_1fr]">
        {/* Session summary */}
        <aside className="border-b border-rule p-5 sm:p-8 lg:border-b-0 lg:border-r">
          {step === 1 ? (
            <Link
              href="/consultation"
              aria-label="Back to all session types"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-rule text-ink transition-colors hover:border-ink"
            >
              <ArrowLeft size={20} aria-hidden="true" />
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => setStep(1)}
              aria-label="Back to date and time"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-rule text-ink transition-colors hover:border-ink"
            >
              <ArrowLeft size={20} aria-hidden="true" />
            </button>
          )}
          <p className="mt-6 text-sm font-medium text-stone">{session.host.name}</p>
          <h2 className="mt-1 text-2xl font-medium leading-tight tracking-tight">{session.name}</h2>
          <ul className="mt-5 space-y-3 text-[0.9375rem] text-stone">
            <li className="flex items-start gap-3">
              <Clock size={20} weight="light" aria-hidden="true" className="mt-0.5 shrink-0" />
              {session.duration} min
            </li>
            <li className="flex items-start gap-3">
              <VideoCamera size={20} weight="light" aria-hidden="true" className="mt-0.5 shrink-0" />
              {CONFERENCING}
            </li>
            {step === 2 && slot && (
              <>
                <li className="flex items-start gap-3 font-medium text-ink">
                  <CalendarBlank size={20} weight="light" aria-hidden="true" className="mt-0.5 shrink-0" />
                  <span>
                    {slotRange}
                    <br />
                    {slotDate}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <GlobeHemisphereWest size={20} weight="light" aria-hidden="true" className="mt-0.5 shrink-0" />
                  {timeZoneLabel(timeZone)}
                </li>
              </>
            )}
          </ul>
          <div className={step === 2 ? "hidden lg:block" : ""}>
            <p className="body mt-6 text-[0.9375rem] text-stone">{session.description}</p>
            <p className="eyebrow mt-7 text-moss">On the call</p>
            <ul className="mt-4 space-y-2.5 text-[0.9375rem] leading-snug">
              {session.agenda.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-7 border-t border-rule pt-5 text-sm text-stone">
              Hosted by a {session.host.role}. Free, with no obligation.
            </p>
          </div>
        </aside>

        {step === 1 ? (
          <div className="p-5 sm:p-8">
            <h3 ref={headingRef} tabIndex={-1} className="text-xl font-medium tracking-tight outline-none">
              Select a date and time
            </h3>

            {!mounted ? (
              <div aria-hidden="true" className="mt-6 max-w-[26rem]">
                <div className="h-6 w-40 rounded bg-paper-deep" />
                <div className="mt-6 grid grid-cols-7 gap-2">
                  {Array.from({ length: 35 }, (_, i) => (
                    <div key={i} className="mx-auto aspect-square w-full max-w-11 rounded-full bg-paper-deep/70" />
                  ))}
                </div>
                <div className="mt-8 h-5 w-56 rounded bg-paper-deep" />
              </div>
            ) : (
              <div className="mt-6 gap-8 md:flex">
                {/* Calendar */}
                <div className={`min-w-0 flex-1 md:max-w-[26rem] ${dateKey ? "hidden md:block" : ""}`}>
                  <div className="flex items-center justify-between">
                    <p aria-live="polite" className="text-[0.9375rem] font-medium">
                      {monthTitle}
                    </p>
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => shiftMonth(-1)}
                        disabled={!canGoBack}
                        aria-label="Previous month"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors enabled:hover:bg-lime-soft disabled:text-rule"
                      >
                        <CaretLeft size={18} weight="bold" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => shiftMonth(1)}
                        disabled={!canGoForward}
                        aria-label="Next month"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors enabled:hover:bg-lime-soft disabled:text-rule"
                      >
                        <CaretRight size={18} weight="bold" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-7 gap-x-1 gap-y-1.5 text-center" role="group" aria-label={monthTitle}>
                    {WEEKDAYS.map((d) => (
                      <span key={d} className="eyebrow pb-2 text-[0.6875rem] text-stone">
                        {d}
                      </span>
                    ))}
                    {Array.from({ length: firstWeekday }, (_, i) => (
                      <span key={`blank-${i}`} />
                    ))}
                    {Array.from({ length: daysInMonth }, (_, i) => {
                      const day = i + 1;
                      const key = toDateKey(current.year, current.month, day);
                      const open = availability.has(key);
                      const isToday = key === todayKey;
                      const selected = key === dateKey;
                      const base =
                        "relative mx-auto flex aspect-square w-full max-w-11 items-center justify-center rounded-full text-[0.9375rem] tabular-nums";
                      const dot = isToday && (
                        <span
                          aria-hidden="true"
                          className={`absolute bottom-1.5 h-1 w-1 rounded-full ${selected ? "bg-lime" : "bg-ink"}`}
                        />
                      );
                      if (!open) {
                        return (
                          <span key={key} className={`${base} text-fog`}>
                            {day}
                            {dot}
                          </span>
                        );
                      }
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => chooseDate(key)}
                          aria-pressed={selected}
                          aria-label={`${formatDateKey(key)}, ${availability.get(key)?.length ?? 0} times available`}
                          className={`${base} font-semibold transition-colors ${
                            selected ? "bg-ink text-paper" : "bg-lime-soft text-ink hover:bg-lime"
                          }`}
                        >
                          {day}
                          {dot}
                        </button>
                      );
                    })}
                  </div>

                  {availability.size === 0 && (
                    <p className="mt-4 text-sm text-stone">
                      No times are open in this window. Email {site.email} and we will find one.
                    </p>
                  )}

                  <div className="mt-7 border-t border-rule pt-5">
                    <label htmlFor="booking-zone" className="text-sm font-medium">
                      Time zone
                    </label>
                    <div className="mt-2 flex items-center gap-2.5">
                      <GlobeHemisphereWest size={20} weight="light" aria-hidden="true" className="shrink-0 text-stone" />
                      <select
                        id="booking-zone"
                        value={timeZone}
                        onChange={(e) => changeZone(e.target.value)}
                        className="h-11 min-w-0 flex-1 cursor-pointer rounded-lg border border-transparent bg-transparent text-[0.9375rem] hover:border-rule focus:border-ink focus:outline-none"
                      >
                        {zones.map((z) => (
                          <option key={z} value={z}>
                            {timeZoneLabel(z)}
                          </option>
                        ))}
                      </select>
                      <span className="shrink-0 text-sm tabular-nums text-stone">{nowInZone}</span>
                    </div>
                    <div className="mt-3 inline-flex rounded-full border border-rule p-0.5 text-sm" role="group" aria-label="Time format">
                      {[true, false].map((v) => (
                        <button
                          key={String(v)}
                          type="button"
                          aria-pressed={hour12 === v}
                          onClick={() => setHour12(v)}
                          className={`min-h-9 rounded-full px-3.5 transition-colors ${
                            hour12 === v ? "bg-ink text-paper" : "text-stone hover:text-ink"
                          }`}
                        >
                          {v ? "12h" : "24h"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Times */}
                {dateKey && (
                  <div ref={timesRef} tabIndex={-1} className="outline-none md:w-56 md:shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setDateKey(null);
                        setSlot(null);
                      }}
                      className="mb-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium md:hidden"
                    >
                      <ArrowLeft size={16} aria-hidden="true" />
                      Choose another date
                    </button>
                    <p className="text-[0.9375rem] font-medium">
                      {formatDateKey(dateKey, { weekday: "long", month: "long", day: "numeric" })}
                    </p>
                    <p className="mt-1 text-sm text-stone md:hidden">Times shown in {timeZoneLabel(timeZone)}</p>
                    {slots.length === 0 ? (
                      <p className="mt-4 text-sm text-stone">No times are open on this date in your time zone.</p>
                    ) : (
                      <ul className="mt-4 space-y-2.5 md:max-h-[27rem] md:overflow-y-auto md:pr-1">
                        {slots.map((s) => {
                          const label = formatTime(s, timeZone, hour12);
                          if (s === slot) {
                            return (
                              <li key={s} className="grid grid-cols-2 gap-2">
                                <span className="flex min-h-[3.25rem] items-center justify-center rounded-lg bg-ink text-[0.9375rem] font-semibold tabular-nums text-paper">
                                  {label}
                                </span>
                                <button
                                  type="button"
                                  autoFocus
                                  onClick={() => setStep(2)}
                                  className="flex min-h-[3.25rem] items-center justify-center gap-1.5 rounded-lg bg-lime text-[0.9375rem] font-semibold text-ink transition-colors hover:bg-[#d6fb8c]"
                                >
                                  Next
                                  <ArrowRight size={15} weight="bold" aria-hidden="true" />
                                </button>
                              </li>
                            );
                          }
                          return (
                            <li key={s}>
                              <button
                                type="button"
                                onClick={() => setSlot(s)}
                                className="flex min-h-[3.25rem] w-full items-center justify-center rounded-lg border border-ink/40 text-[0.9375rem] font-semibold tabular-nums transition-colors hover:border-ink hover:bg-lime-soft"
                              >
                                {label}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="p-5 sm:p-8">
            <h3 ref={headingRef} tabIndex={-1} className="text-xl font-medium tracking-tight outline-none">
              Enter details
            </h3>
            <form onSubmit={submit} noValidate className="mt-6 max-w-lg space-y-5">
              <Field id="name" label="Name" error={errors.name}>
                <input
                  id="booking-name"
                  className="field"
                  autoComplete="name"
                  value={form.name}
                  onChange={update("name")}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "booking-name-error" : undefined}
                  required
                />
              </Field>
              <Field id="email" label="Work email" error={errors.email}>
                <input
                  id="booking-email"
                  type="email"
                  inputMode="email"
                  className="field"
                  autoComplete="email"
                  value={form.email}
                  onChange={update("email")}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "booking-email-error" : undefined}
                  required
                />
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="company" label="Company" error={errors.company}>
                  <input
                    id="booking-company"
                    className="field"
                    autoComplete="organization"
                    value={form.company}
                    onChange={update("company")}
                    aria-invalid={Boolean(errors.company)}
                    aria-describedby={errors.company ? "booking-company-error" : undefined}
                    required
                  />
                </Field>
                <Field id="phone" label="Phone" optional>
                  <input
                    id="booking-phone"
                    type="tel"
                    inputMode="tel"
                    className="field"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={update("phone")}
                  />
                </Field>
              </div>

              {showGuests ? (
                <Field id="guests" label="Guest emails" optional error={errors.guests}>
                  <input
                    id="booking-guests"
                    className="field"
                    placeholder="colleague@company.com, cto@company.com"
                    value={form.guests}
                    onChange={update("guests")}
                    aria-invalid={Boolean(errors.guests)}
                    aria-describedby={errors.guests ? "booking-guests-error" : undefined}
                    autoFocus
                  />
                </Field>
              ) : (
                <button type="button" onClick={() => setShowGuests(true)} className="btn btn-outline btn-sm">
                  <UserPlus size={16} aria-hidden="true" />
                  Add guests
                </button>
              )}

              <Field id="budget" label="Budget range (USD)" optional>
                <select id="booking-budget" className="field" value={form.budget} onChange={update("budget")}>
                  <option value="">Select a range</option>
                  {BUDGETS.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </Field>
              <Field id="notes" label="Please share anything that will help prepare for our meeting" optional>
                <textarea id="booking-notes" rows={4} className="field" value={form.notes} onChange={update("notes")} />
              </Field>

              <p className="text-sm leading-relaxed text-stone">
                By scheduling you agree to our{" "}
                <Link href="/privacy" className="link text-ink">
                  privacy policy
                </Link>
                . We use your details to prepare for this call and nothing else.
              </p>
              <button type="submit" disabled={sending} className="btn btn-ink w-full disabled:opacity-60 sm:w-auto">
                {sending ? "Scheduling" : "Schedule meeting"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  optional = false,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={`booking-${id}`} className="label">
        {label}
        {optional && <span className="font-normal text-stone"> (optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`booking-${id}-error`} role="alert" className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
