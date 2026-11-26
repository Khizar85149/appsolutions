"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { CONSULTATION_HREF, serviceNav } from "@/lib/site";
import { submitLead } from "@/lib/submit";

const BUDGETS = [
  "Under $25,000",
  "$25,000 to $50,000",
  "$50,000 to $100,000",
  "$100,000 to $250,000",
  "Over $250,000",
  "Not sure yet",
];
const TIMELINES = ["As soon as possible", "Within 1 to 3 months", "Within 3 to 6 months", "Planning for later"];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const empty = {
  name: "",
  email: "",
  company: "",
  phone: "",
  service: "",
  budget: "",
  timeline: "",
  message: "",
};

type Values = typeof empty;
type Key = keyof Values;
type Errors = Partial<Record<Key, string>>;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Enter your full name.";
  if (!EMAIL.test(v.email.trim())) e.email = "Enter a valid work email address.";
  if (!v.company.trim()) e.company = "Enter your company name.";
  if (!v.service) e.service = "Choose the service closest to what you need.";
  if (!v.budget) e.budget = "Choose a budget range. An estimate is fine.";
  if (v.message.trim().length < 20) e.message = "Tell us a little more. Two or three sentences is enough.";
  return e;
}

export function ContactForm() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const successRef = useRef<HTMLDivElement>(null);

  const set = (key: Key) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const props = (key: Key) => ({
    id: `contact-${key}`,
    name: key,
    value: values[key],
    onChange: set(key),
    "aria-invalid": Boolean(errors[key]),
    "aria-describedby": errors[key] ? `contact-${key}-error` : undefined,
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = validate(values);
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    await submitLead({
      kind: "contact",
      ...Object.fromEntries(Object.entries(values).map(([k, v]) => [k, v.trim()])),
    });
    setStatus("sent");
    requestAnimationFrame(() => successRef.current?.focus());
  };

  if (status === "sent") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-2xl border border-rule bg-card p-7 outline-none sm:p-10"
      >
        <CheckCircle size={44} weight="light" aria-hidden="true" className="text-moss" />
        <h2 className="h3 mt-5">Your brief is with us.</h2>
        <p className="body mt-3 max-w-lg text-stone">
          Thank you, {values.name.trim().split(" ")[0]}. A senior engineer will read it and reply to{" "}
          <span className="font-medium text-ink">{values.email.trim()}</span> within one business day.
        </p>
        <p className="body mt-3 max-w-lg text-stone">If the project is urgent, you can book a call now and skip the wait.</p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link href={CONSULTATION_HREF} className="btn btn-ink">
            Book a free consultation
            <ArrowRight size={16} weight="bold" className="btn-arrow" aria-hidden="true" />
          </Link>
          <Link href="/case-studies" className="btn btn-outline">
            Read case studies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name}>
          <input className="field" autoComplete="name" required {...props("name")} />
        </Field>
        <Field id="email" label="Work email" error={errors.email}>
          <input className="field" type="email" inputMode="email" autoComplete="email" required {...props("email")} />
        </Field>
        <Field id="company" label="Company" error={errors.company}>
          <input className="field" autoComplete="organization" required {...props("company")} />
        </Field>
        <Field id="phone" label="Phone" optional>
          <input className="field" type="tel" inputMode="tel" autoComplete="tel" {...props("phone")} />
        </Field>
      </div>

      <Field id="service" label="Service of interest" error={errors.service}>
        <select className="field" required {...props("service")}>
          <option value="">Select a service</option>
          {serviceNav.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
          <option value="other">Something else, or not sure yet</option>
        </select>
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="budget" label="Budget range (USD)" error={errors.budget}>
          <select className="field" required {...props("budget")}>
            <option value="">Select a range</option>
            {BUDGETS.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </Field>
        <Field id="timeline" label="When do you want to start" optional>
          <select className="field" {...props("timeline")}>
            <option value="">Select a timeline</option>
            {TIMELINES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="message" label="What do you need built" error={errors.message}>
        <textarea
          className="field"
          rows={6}
          required
          placeholder="The problem, who will use the software, what exists today and any deadline we should know about."
          {...props("message")}
        />
      </Field>

      <p className="text-sm leading-relaxed text-stone">
        By sending this form you agree to our{" "}
        <Link href="/privacy" className="link text-ink">
          privacy policy
        </Link>
        . We use your details to reply to this enquiry and for nothing else. We never share them.
      </p>

      <button type="submit" disabled={status === "sending"} className="btn btn-ink w-full disabled:opacity-60 sm:w-auto">
        {status === "sending" ? "Sending" : "Send project brief"}
        {status !== "sending" && <ArrowRight size={16} weight="bold" className="btn-arrow" aria-hidden="true" />}
      </button>
    </form>
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
      <label htmlFor={`contact-${id}`} className="label">
        {label}
        {optional && <span className="font-normal text-stone"> (optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`contact-${id}-error`} role="alert" className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
