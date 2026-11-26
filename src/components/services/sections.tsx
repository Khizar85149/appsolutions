import Link from "next/link";
import { ArrowUpRight, Check } from "@phosphor-icons/react/dist/ssr";
import { CaseCard } from "@/components/case-card";
import { Icon } from "@/components/icon";
import { Button, SectionHeading } from "@/components/ui";
import { getCaseStudies } from "@/server/content";
import { CONSULTATION_HREF, site } from "@/lib/site";
import type { CaseStudy, IconKey, TitledText } from "@/lib/types";

/** Bulleted list with check marks. */
export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="border-t border-rule">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-4 border-b border-rule py-5">
          <Check size={20} weight="bold" aria-hidden="true" className="mt-0.5 shrink-0 text-moss" />
          <span className="body">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Two column grid of titled items separated by hairlines. */
export function TitledGrid({ items, numbered = false }: { items: TitledText[]; numbered?: boolean }) {
  return (
    <div className="grid border-t border-rule md:grid-cols-2 md:gap-x-16">
      {items.map((item, i) => (
        <div key={item.title} className="border-b border-rule py-7 md:py-9">
          {numbered && <p className="eyebrow mb-4 text-moss">{String(i + 1).padStart(2, "0")}</p>}
          <h3 className="h3">{item.title}</h3>
          <p className="body mt-3 text-stone">{item.body}</p>
        </div>
      ))}
    </div>
  );
}

/** Numbered process steps: four columns on desktop, stacked on mobile. */
export function ProcessSteps({ steps }: { steps: TitledText[] }) {
  return (
    <ol className="grid border-t border-rule md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <li
          key={step.title}
          className={`border-b border-rule py-8 lg:border-b-0 lg:pr-8 ${i > 0 ? "lg:border-l lg:pl-8" : ""} ${
            i % 2 === 1 ? "md:max-lg:border-l md:max-lg:pl-8" : "md:max-lg:pr-8"
          }`}
        >
          <p className="eyebrow text-moss">Step {String(i + 1).padStart(2, "0")}</p>
          <h3 className="h3 mt-5">{step.title}</h3>
          <p className="body mt-3 text-stone">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}

/** Mid-page conversion prompt on a tinted panel. */
export function InlineCta({
  title,
  body,
  label = "Book a free consultation",
  href = CONSULTATION_HREF,
}: {
  title: string;
  body: string;
  label?: string;
  href?: string;
}) {
  const { intake } = site;
  return (
    <aside className="rounded-xl border border-rule bg-paper-deep p-7 md:p-10">
      <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="max-w-2xl">
          <p className="eyebrow text-moss">
            {intake.slotsOpen} of {intake.slotsTotal} project starts open for {intake.period}
          </p>
          <p className="h3 mt-4">{title}</p>
          <p className="body mt-3 text-stone">{body}</p>
        </div>
        <Button href={href} variant="ink" arrow className="w-full shrink-0 sm:w-auto">
          {label}
        </Button>
      </div>
    </aside>
  );
}

/** Linked rows used for cross links between services and industries. */
export function LinkRows({
  base,
  items,
}: {
  base: string;
  items: { slug: string; name: string; blurb: string; icon: IconKey }[];
}) {
  return (
    <ul className="grid border-t border-rule md:grid-cols-2 md:gap-x-16">
      {items.map((item) => (
        <li key={item.slug} className="border-b border-rule">
          <Link href={`${base}/${item.slug}`} className="group flex min-h-11 items-start gap-4 py-6">
            <Icon name={item.icon} size={26} className="mt-0.5 shrink-0 text-moss" />
            <span className="flex-1">
              <span className="block text-lg font-medium tracking-tight">{item.name}</span>
              <span className="mt-1 block text-[0.9375rem] leading-snug text-stone">{item.blurb}</span>
            </span>
            <ArrowUpRight
              size={18}
              aria-hidden="true"
              className="mt-1 shrink-0 text-stone transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Related case studies. Renders nothing when no slug resolves. */
export async function RelatedCases({ slugs, title, lead }: { slugs: string[]; title: string; lead?: string }) {
  const all = await getCaseStudies();
  const studies = slugs.map((s) => all.find((c) => c.slug === s)).filter((s): s is CaseStudy => Boolean(s));
  if (studies.length === 0) return null;
  return (
    <section className="section border-t border-rule">
      <div className="wrap">
        <SectionHeading
          eyebrow="Proof"
          title={title}
          lead={lead}
          action={
            <Button href="/case-studies" variant="outline" arrow>
              All case studies
            </Button>
          }
        />
        <div className={`mt-12 grid gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-3`}>
          {studies.map((study) => (
            <CaseCard key={study.slug} study={study} />
          ))}
        </div>
      </div>
    </section>
  );
}
