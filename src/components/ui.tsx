import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Plus } from "@phosphor-icons/react/dist/ssr";
import type { Faq, Metric } from "@/lib/types";
import { CONSULTATION_HREF, site } from "@/lib/site";
import { CountUp, RevealGroup } from "./motion";

type Variant = "lime" | "ink" | "outline" | "outline-light";

export function Button({
  href,
  children,
  variant = "ink",
  size = "md",
  arrow = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "sm";
  arrow?: boolean;
  className?: string;
}) {
  return (
    <Link href={href} className={`btn btn-${variant} ${size === "sm" ? "btn-sm" : ""} ${className}`}>
      {children}
      {arrow && <ArrowRight size={16} weight="bold" className="btn-arrow" aria-hidden="true" />}
    </Link>
  );
}

/** Inline text link with an arrow, used at the end of cards and sections. */
export function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`group inline-flex items-center gap-1.5 text-[0.9375rem] font-medium ${className}`}>
      <span className="link">{children}</span>
      <ArrowUpRight
        size={16}
        weight="bold"
        aria-hidden="true"
        className="transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </Link>
  );
}

export function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return <p className={`eyebrow ${tone === "dark" ? "text-lime" : "text-moss"}`}>{children}</p>;
}

/** Standard section heading: eyebrow, title, optional lead and trailing action. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  action,
  tone = "light",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  action?: ReactNode;
  tone?: "light" | "dark";
  as?: "h1" | "h2";
}) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
      <div className="max-w-3xl">
        {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
        <Tag className={`h2 ${eyebrow ? "mt-3" : ""}`}>{title}</Tag>
        {lead && <p className={`lead mt-5 max-w-2xl ${tone === "dark" ? "text-fog" : "text-stone"}`}>{lead}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/**
 * Photographic backdrop for dark page headers. Desaturated and held back
 * behind an ink wash so the headline stays the loudest thing on screen.
 */
export function HeroBackdrop({ src, priority = false }: { src: string; priority?: boolean }) {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10">
      <Image src={src} alt="" fill priority={priority} sizes="100vw" quality={60} className="object-cover opacity-45 grayscale" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#151613_0%,rgba(21,22,19,0.88)_45%,rgba(21,22,19,0.55)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(0deg,#151613,transparent)]" />
    </div>
  );
}

export interface Crumb {
  href?: string;
  label: string;
}

/** Dark page header used on every interior page. */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
  aside,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  crumbs?: Crumb[];
  /** Buttons or meta shown under the lead. */
  children?: ReactNode;
  /** Optional right column on large screens. */
  aside?: ReactNode;
}) {
  return (
    <section className="on-ink relative isolate overflow-hidden bg-ink text-paper">
      <HeroBackdrop src="/images/hero-interior.jpg" priority />
      <div className="wrap pb-16 pt-10 md:pb-24 md:pt-14">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-10 md:mb-14">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-fog">
              <li>
                <Link href="/" className="hover:text-paper">
                  Home
                </Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-2">
                  <span aria-hidden="true">/</span>
                  {c.href ? (
                    <Link href={c.href} className="hover:text-paper">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-paper">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className={aside ? "grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16" : ""}>
          <div className="max-w-4xl">
            {eyebrow && <Eyebrow tone="dark">{eyebrow}</Eyebrow>}
            <h1 className={`h1 ${eyebrow ? "mt-4" : ""}`}>{title}</h1>
            {lead && <p className="lead mt-6 max-w-2xl text-fog">{lead}</p>}
            {children && <div className="mt-9">{children}</div>}
          </div>
          {aside && <div className="lg:pt-2">{aside}</div>}
        </div>
      </div>
    </section>
  );
}

/** Row of headline numbers separated by hairlines. */
export function StatRow({ stats, tone = "light" }: { stats: readonly Metric[]; tone?: "light" | "dark" }) {
  const border = tone === "dark" ? "border-ink-line" : "border-rule";
  const cols = stats.length === 3 ? "md:grid-cols-3" : "md:grid-cols-4";
  return (
    <RevealGroup as="dl" className={`grid grid-cols-2 border-t ${border} ${cols}`}>
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={`flex flex-col-reverse justify-end border-b ${border} py-7 pr-4 md:border-b-0 md:py-9 ${i % 2 === 1 ? "pl-5 border-l md:pl-8" : "md:pl-0"} ${
            i > 0 ? `md:border-l md:pl-8` : ""
          }`}
        >
            <dt className={`mt-3 block max-w-[16rem] text-sm leading-snug ${tone === "dark" ? "text-fog" : "text-stone"}`}>{s.label}</dt>
            <dd>
              <CountUp value={s.value} className="figure block" />
            </dd>
        </div>
      ))}
    </RevealGroup>
  );
}

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="border-t border-rule">
      {items.map((f) => (
        <details key={f.q} className="faq group border-b border-rule">
          <summary className="flex items-start justify-between gap-6 py-6">
            <h3 className="text-lg font-medium leading-snug tracking-tight md:text-xl">{f.q}</h3>
            <Plus size={20} aria-hidden="true" className="faq-icon mt-1 shrink-0 text-stone" />
          </summary>
          <p className="body max-w-3xl pb-7 text-stone">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/** FAQPage structured data for a list of questions. */
export function FaqJsonLd({ items }: { items: Faq[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }}
    />
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

/** Closing call to action. Place it as the last section of every page. */
export function CtaBand({
  title = "Tell us what you need built. Leave with a plan.",
  lead = "Thirty minutes with a senior engineer, not a salesperson. You get a candid view of scope, risks and budget, and a written summary within two business days.",
  primaryLabel = "Book a free consultation",
  primaryHref = CONSULTATION_HREF,
  secondaryLabel = "Send a project brief",
  secondaryHref = "/contact",
}: {
  title?: string;
  lead?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  const { intake } = site;
  return (
    <section className="on-ink bg-ink text-paper">
      <div className="wrap section">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-20">
          <div>
            <Eyebrow tone="dark">Start here</Eyebrow>
            <h2 className="h1 mt-4 max-w-3xl">{title}</h2>
            <p className="lead mt-6 max-w-xl text-fog">{lead}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href={primaryHref} variant="lime" arrow>
                {primaryLabel}
              </Button>
              <Button href={secondaryHref} variant="outline-light">
                {secondaryLabel}
              </Button>
            </div>
          </div>
          <div className="border-t border-ink-line pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <p className="eyebrow text-fog">Availability, {intake.period}</p>
            <p className="mt-4 text-2xl font-medium leading-tight tracking-tight">
              {intake.slotsOpen} of {intake.slotsTotal} project starts still open.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-fog">
              We cap new engagements each quarter so every client gets a senior team. Once the slots are taken, the
              next start date moves to the following quarter.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
