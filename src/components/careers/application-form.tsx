"use client";

import { useRef, useState } from "react";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { submitLead } from "@/lib/submit";

type Fields = "name" | "email" | "phone" | "link" | "resume" | "note";
type Errors = Partial<Record<Fields, string>>;

const MAX_FILE_MB = 5;
const ACCEPT = [".pdf", ".doc", ".docx"];

function validate(values: Record<Exclude<Fields, "resume">, string>, file: File | null): Errors {
  const e: Errors = {};
  if (values.name.trim().length < 2) e.name = "Enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) e.email = "Enter a valid email address.";
  if (values.phone.trim() && !/^[+()\d\s.-]{7,20}$/.test(values.phone.trim())) e.phone = "Enter a valid phone number, or leave this blank.";
  if (!/^(https?:\/\/)?[\w-]+(\.[\w-]+)+\S*$/i.test(values.link.trim())) e.link = "Enter a link to your LinkedIn profile or portfolio.";
  if (!file) e.resume = "Attach your résumé.";
  else if (!ACCEPT.some((ext) => file.name.toLowerCase().endsWith(ext))) e.resume = "Upload a PDF, DOC or DOCX file.";
  else if (file.size > MAX_FILE_MB * 1024 * 1024) e.resume = `The file must be under ${MAX_FILE_MB} MB.`;
  if (values.note.length > 1500) e.note = "Keep your note under 1,500 characters.";
  return e;
}

export function ApplicationForm({ jobSlug, jobTitle }: { jobSlug: string; jobTitle: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "failed">("idle");
  const [sentTo, setSentTo] = useState("");

  const read = () => {
    const data = new FormData(formRef.current!);
    const text = (k: string) => String(data.get(k) ?? "");
    const file = data.get("resume");
    return {
      values: { name: text("name"), email: text("email"), phone: text("phone"), link: text("link"), note: text("note") },
      file: file instanceof File && file.size > 0 ? file : null,
    };
  };

  // Re-check a single field once it has shown an error, so the message clears as soon as it is fixed.
  const recheck = (field: Fields) => {
    if (!errors[field]) return;
    const { values, file } = read();
    const next = validate(values, file);
    setErrors((prev) => ({ ...prev, [field]: next[field] }));
  };

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const { values, file } = read();
    const found = validate(values, file);
    setErrors(found);
    const first = (Object.keys(found) as Fields[])[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      await submitLead({
        kind: "application",
        jobSlug,
        jobTitle,
        ...values,
        resumeName: file?.name,
        resumeSize: file?.size,
      });
      setSentTo(values.email.trim());
      setStatus("done");
    } catch {
      setStatus("failed");
    }
  };

  if (status === "done") {
    return (
      <div role="status" className="rounded-xl border border-rule bg-card p-6 sm:p-8">
        <CheckCircle size={36} weight="light" aria-hidden="true" className="text-moss" />
        <h3 className="h3 mt-5">Application received.</h3>
        <p className="body mt-3 text-stone">
          Thank you for applying for {jobTitle}. An engineer on the hiring panel reads every application. You will hear
          from us at <span className="break-all text-ink">{sentTo}</span> within five business days, whether or not we
          move forward.
        </p>
      </div>
    );
  }

  const err = (field: Fields) =>
    errors[field] ? (
      <p id={`${field}-error`} className="mt-1.5 text-sm text-danger">
        {errors[field]}
      </p>
    ) : null;

  const aria = (field: Fields) => ({
    "aria-invalid": errors[field] ? (true as const) : undefined,
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
    // The ref is only read inside the blur handler, never during render.
    // eslint-disable-next-line react-hooks/refs
    onBlur: () => recheck(field),
  });

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="rounded-xl border border-rule bg-card p-5 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label">
            Full name
          </label>
          <input id="name" name="name" type="text" autoComplete="name" required className="field" {...aria("name")} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="email" className="label">
            Email
          </label>
          <input id="email" name="email" type="email" autoComplete="email" inputMode="email" required className="field" {...aria("email")} />
          {err("email")}
        </div>
        <div>
          <label htmlFor="phone" className="label">
            Phone <span className="font-normal text-stone">(optional)</span>
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" className="field" {...aria("phone")} />
          {err("phone")}
        </div>
        <div>
          <label htmlFor="link" className="label">
            LinkedIn or portfolio URL
          </label>
          <input id="link" name="link" type="url" inputMode="url" placeholder="linkedin.com/in/yourname" required className="field" {...aria("link")} />
          {err("link")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="resume" className="label">
            Résumé
          </label>
          <input
            id="resume"
            name="resume"
            type="file"
            accept={ACCEPT.join(",")}
            required
            className="field cursor-pointer file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-1.5 file:text-sm file:font-medium file:text-paper"
            aria-invalid={errors.resume ? true : undefined}
            aria-describedby={errors.resume ? "resume-error" : "resume-hint"}
            onChange={() => recheck("resume")}
          />
          {err("resume") ?? (
            <p id="resume-hint" className="mt-1.5 text-sm text-stone">
              PDF, DOC or DOCX. {MAX_FILE_MB} MB maximum.
            </p>
          )}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="note" className="label">
            Anything we should know <span className="font-normal text-stone">(optional)</span>
          </label>
          <textarea
            id="note"
            name="note"
            rows={5}
            placeholder="A project you are proud of, your notice period, or a question for us."
            className="field resize-y"
            {...aria("note")}
          />
          {err("note")}
        </div>
      </div>

      {status === "failed" && (
        <p role="alert" className="mt-5 text-sm text-danger">
          Your application could not be sent. Check your connection and try again.
        </p>
      )}

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={status === "sending"} className="btn btn-ink disabled:opacity-60">
          {status === "sending" ? "Sending application" : "Submit application"}
          {status !== "sending" && <ArrowRight size={16} weight="bold" className="btn-arrow" aria-hidden="true" />}
        </button>
        <p className="text-sm text-stone">We reply to every applicant within five business days.</p>
      </div>
    </form>
  );
}
