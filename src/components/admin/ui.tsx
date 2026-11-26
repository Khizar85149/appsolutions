import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { statusLabel } from "@/lib/admin-schema";
import { HOST_TIME_ZONE } from "@/lib/scheduling";

/* ------------------------------------------------------------------ */
/* Dates. The panel shows office (Toronto) time everywhere.            */
/* ------------------------------------------------------------------ */

const clean = (s: string) => s.replace(/\./g, "").replace(/\s?(am|pm)$/i, (m) => m.toLowerCase());

export function formatDateTime(iso: string, timeZone: string = HOST_TIME_ZONE): string {
  return clean(
    new Intl.DateTimeFormat("en-CA", {
      timeZone,
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(iso)),
  );
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: HOST_TIME_ZONE, month: "short", day: "numeric", year: "numeric" }).format(
    new Date(iso),
  );
}

export function formatTime(iso: string, timeZone: string = HOST_TIME_ZONE): string {
  return clean(new Intl.DateTimeFormat("en-CA", { timeZone, hour: "numeric", minute: "2-digit" }).format(new Date(iso)));
}

/* ------------------------------------------------------------------ */
/* Page furniture                                                      */
/* ------------------------------------------------------------------ */

export function PageHeader({
  title,
  description,
  back,
  actions,
}: {
  title: ReactNode;
  description?: ReactNode;
  back?: { href: string; label: string };
  actions?: ReactNode;
}) {
  return (
    <header className="mb-8">
      {back && (
        <Link href={back.href} className="mb-4 inline-flex items-center gap-1.5 text-sm text-stone hover:text-ink">
          <ArrowLeft size={14} aria-hidden="true" />
          {back.label}
        </Link>
      )}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-medium tracking-tight md:text-[1.75rem]">{title}</h1>
          {description && <p className="mt-1.5 max-w-2xl text-stone">{description}</p>}
        </div>
        {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
      </div>
    </header>
  );
}

const TONES: Record<string, string> = {
  // Needs attention
  new: "bg-lime text-ink",
  confirmed: "bg-lime-soft text-moss",
  // In progress or done
  replied: "bg-paper-deep text-ink",
  qualified: "bg-paper-deep text-ink",
  reviewing: "bg-paper-deep text-ink",
  interview: "bg-paper-deep text-ink",
  offer: "bg-lime-soft text-moss",
  completed: "bg-paper-deep text-ink",
  published: "bg-lime-soft text-moss",
};

/** Small status pill. Statuses not listed above (closed, cancelled, hidden...) are shown muted. */
export function Badge({ status, label }: { status: string; label?: string }) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ${
        TONES[status] ?? "border border-rule text-stone"
      }`}
    >
      {label ?? statusLabel(status)}
    </span>
  );
}

/** Row of filter links, e.g. All / New / Replied. */
export function Tabs({ items, current }: { items: { href: string; label: string; key: string }[]; current: string }) {
  return (
    <nav aria-label="Filter" className="mb-5 flex gap-1 overflow-x-auto">
      {items.map((t) => (
        <Link
          key={t.key}
          href={t.href}
          aria-current={t.key === current ? "page" : undefined}
          className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm transition-colors ${
            t.key === current ? "bg-ink text-paper" : "text-stone hover:bg-paper-deep hover:text-ink"
          }`}
        >
          {t.label}
        </Link>
      ))}
    </nav>
  );
}

export function Empty({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="acard px-6 py-14 text-center">
      <p className="font-medium">{title}</p>
      {children && <p className="mx-auto mt-1.5 max-w-md text-sm text-stone">{children}</p>}
    </div>
  );
}

/** Label and value pairs on detail pages. */
export function Facts({ items }: { items: { label: string; value: ReactNode }[] }) {
  return (
    <dl className="acard divide-y divide-rule">
      {items
        .filter((i) => i.value !== "" && i.value !== null && i.value !== undefined)
        .map((i) => (
          <div key={i.label} className="grid gap-1 px-5 py-3.5 sm:grid-cols-[10rem_1fr] sm:gap-4">
            <dt className="text-sm text-stone">{i.label}</dt>
            <dd className="min-w-0 break-words">{i.value}</dd>
          </div>
        ))}
    </dl>
  );
}

export function Panel({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="acard">
      <div className="flex items-center justify-between gap-4 border-b border-rule px-5 py-3.5">
        <h2 className="font-medium">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}
