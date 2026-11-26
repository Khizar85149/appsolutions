import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "@phosphor-icons/react/dist/ssr";
import { coverTone } from "@/components/case-card";
import { ArrowLink, Button, CtaBand, Eyebrow, JsonLd, PageHero, StatRow } from "@/components/ui";
import { CONSULTATION_HREF, inSentence, site } from "@/lib/site";
import { getCaseStudies, getCaseStudy, getIndustryNav, getServiceNav, staticSlugs } from "@/server/content";

type Props = { params: Promise<{ slug: string }> };

/**
 * A record added in Supabase after the last deploy has no prebuilt page.
 * Its first visitor waits for the full page (with the correct 200 or 404
 * status) instead of receiving an empty shell, and the result is then cached.
 */
export const instant = false;

export async function generateStaticParams() {
  return staticSlugs(await getCaseStudies());
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) return {};
  return pageMetadata({ title: study.seo.title, description: study.seo.description, path: `/case-studies/${study.slug}`, type: "article" });
}

function Block({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-6 border-t border-rule py-12 md:grid-cols-[1fr_2fr] md:gap-16 md:py-16">
      <div>
        <Eyebrow>{label}</Eyebrow>
        <h2 className="h3 mt-5 max-w-xs">{title}</h2>
      </div>
      <div className="max-w-2xl">{children}</div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) notFound();

  const [caseStudies, industryNav, serviceNav] = await Promise.all([getCaseStudies(), getIndustryNav(), getServiceNav()]);
  const industry = industryNav.find((i) => i.slug === study.industry);
  const services = study.services
    .map((s) => serviceNav.find((n) => n.slug === s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const index = caseStudies.findIndex((c) => c.slug === study.slug);
  const next = caseStudies[(index + 1) % caseStudies.length];
  const nextTone = coverTone[next.tone];
  const url = `${site.url}/case-studies/${study.slug}`;

  const facts = [
    { k: "Client", v: study.client },
    { k: "Industry", v: industry?.name ?? study.industry },
    { k: "Location", v: study.location },
    { k: "Duration", v: study.duration },
    { k: "Team", v: study.team },
    { k: "Year", v: study.year },
  ];

  return (
    <>
      <PageHero
        eyebrow={industry?.name ?? "Case study"}
        title={study.title}
        lead={study.summary}
        crumbs={[{ href: "/case-studies", label: "Case Studies" }, { label: study.client }]}
        aside={
          <dl className="border-t border-ink-line">
            {facts.map((f) => (
              <div key={f.k} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-ink-line py-3.5 text-[0.9375rem]">
                <dt className="text-fog">{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>
        }
      >
        <Button href={CONSULTATION_HREF} variant="lime" arrow>
          Discuss a similar project
        </Button>
      </PageHero>

      <section className="wrap pt-14 md:pt-20">
        <h2 className="sr-only">Measured results</h2>
        <StatRow stats={study.metrics} />
      </section>

      <div className="wrap pb-6 pt-14 md:pt-20">
        <Block label="The challenge" title="What was getting in the way">
          <div className="space-y-5">
            {study.challenge.map((p) => (
              <p key={p} className="body text-stone first:text-lg first:leading-relaxed first:text-ink">
                {p}
              </p>
            ))}
          </div>
        </Block>

        <Block label="Our approach" title="The decisions that mattered">
          <ol className="space-y-9">
            {study.approach.map((a, i) => (
              <li key={a.title} className="grid grid-cols-[2.5rem_1fr] gap-2">
                <span className="eyebrow pt-1.5 text-moss">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-lg font-medium leading-snug tracking-tight">{a.title}</h3>
                  <p className="body mt-2 text-stone">{a.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Block>

        <Block label="What we built" title="The system in production">
          <ul className="space-y-4">
            {study.solution.map((s) => (
              <li key={s} className="flex gap-3.5">
                <Check size={20} weight="light" aria-hidden="true" className="mt-0.5 shrink-0 text-moss" />
                <span className="body">{s}</span>
              </li>
            ))}
          </ul>
          <h3 className="eyebrow mt-10 text-stone">Technology</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {study.stack.map((t) => (
              <li key={t} className="rounded-full border border-rule px-3.5 py-1.5 text-sm">
                {t}
              </li>
            ))}
          </ul>
        </Block>

        <Block label="The results" title="What changed after launch">
          <ul className="border-t border-rule">
            {study.results.map((r) => (
              <li key={r} className="border-b border-rule py-5 text-lg leading-snug tracking-tight">
                {r}
              </li>
            ))}
          </ul>
        </Block>
      </div>

      {study.quote && (
        <section className="bg-paper-deep">
          <figure className="wrap section">
            <blockquote className="h2 max-w-4xl">“{study.quote.text}”</blockquote>
            <figcaption className="mt-8 text-[0.9375rem] text-stone">{study.quote.role}</figcaption>
          </figure>
        </section>
      )}

      <section className="wrap section">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <Eyebrow>Services on this project</Eyebrow>
            <ul className="mt-6 border-t border-rule">
              {services.map((s) => (
                <li key={s.slug} className="border-b border-rule">
                  <Link href={`/services/${s.slug}`} className="group flex min-h-14 items-center justify-between gap-4 py-4">
                    <span className="text-lg font-medium tracking-tight">{s.name}</span>
                    <ArrowRight size={18} aria-hidden="true" className="shrink-0 text-stone transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {industry && (
            <div>
              <Eyebrow>Industry</Eyebrow>
              <p className="h3 mt-6">{industry.name}</p>
              <p className="body mt-3 max-w-md text-stone">{industry.blurb}</p>
              <ArrowLink href={`/industries/${industry.slug}`} className="mt-5">
                How we work in {inSentence(industry.name)}
              </ArrowLink>
            </div>
          )}
        </div>

        <div className="mt-16 border-t border-rule pt-10 md:mt-24 md:pt-14">
          <p className="eyebrow text-stone">Next case study</p>
          <Link href={`/case-studies/${next.slug}`} className="group mt-6 grid gap-6 md:grid-cols-[1fr_2fr] md:items-center md:gap-12">
            <div className={`rounded-xl p-6 sm:p-7 ${nextTone.panel}`}>
              <p className="figure">{next.heroMetric.value}</p>
              <p className={`mt-3 text-[0.9375rem] leading-snug ${nextTone.sub}`}>{next.heroMetric.label}</p>
            </div>
            <div>
              <p className="text-sm text-stone">{next.client}</p>
              <p className="h2 mt-2">{next.title}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-[0.9375rem] font-medium">
                <span className="link">Read next</span>
                <ArrowRight size={16} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      <CtaBand
        title={`Facing something similar in ${industry ? inSentence(industry.name) : "your business"}?`}
        lead="Tell us where you are today. A senior engineer who worked on projects like this one will walk you through how we would approach yours, with a written summary inside two business days."
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: study.title,
          description: study.seo.description,
          url,
          mainEntityOfPage: url,
          articleSection: industry?.name,
          author: { "@type": "Organization", name: site.name, url: site.url },
          publisher: { "@type": "Organization", name: site.name, url: site.url },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: site.url },
            { "@type": "ListItem", position: 2, name: "Case Studies", item: `${site.url}/case-studies` },
            { "@type": "ListItem", position: 3, name: study.title, item: url },
          ],
        }}
      />
    </>
  );
}
