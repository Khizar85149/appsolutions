import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Icon } from "@/components/icon";
import { InlineCta, TitledGrid } from "@/components/services/sections";
import { Button, CtaBand, JsonLd, PageHero, SectionHeading, StatRow } from "@/components/ui";
import { services } from "@/content/services";
import { CONSULTATION_HREF, site } from "@/lib/site";

const title = "Software Development Services";
const description =
  "Full stack and front end development, ERP systems, AI chatbots and automation, mobile apps, custom POS and hospital and restaurant management software. Built by the senior engineers of a Canadian software company.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/services" });

const engagementModels = [
  {
    title: "Fixed scope project",
    body: "A defined release for a fixed price and date. Best when you know what you need and want cost certainty. Discovery comes first, so the price is based on a written scope and not a guess.",
  },
  {
    title: "Dedicated team",
    body: "A full squad working only on your product, billed monthly. Best for a roadmap that will keep changing. You set priorities each sprint and can scale the team with 30 days notice.",
  },
  {
    title: "Team extension",
    body: "One to five senior engineers who join your existing team, your stand ups and your repository. Best when you have technical leadership and need capacity quickly.",
  },
  {
    title: "Audit and rescue",
    body: "A paid two week review of a system that is late, unstable or inherited from another vendor. You get a written report with what to keep, repair and replace, whether or not you continue with us.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Software development services"
        path="/services"
        title="Eight practices. One team accountable for the result."
        lead="We build the systems a business depends on every day: the ERP, the app, the point of sale, the automation behind them. Each practice is led by a senior engineer who has shipped that kind of system before."
        crumbs={[{ label: "Services" }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={CONSULTATION_HREF} variant="lime" arrow>
            Book a free consultation
          </Button>
          <Button href="/case-studies" variant="outline-light">
            See our work
          </Button>
        </div>
      </PageHero>

      <section className="section">
        <div className="wrap">
          <SectionHeading
            eyebrow="What we build"
            title="Choose the problem you need solved."
            lead="Every service page covers what you receive, how long it takes, who works on it and what it depends on."
          />
          <ul className="mt-12 grid border-l border-t border-rule md:mt-16 md:grid-cols-2">
            {services.map((s, i) => (
              <li key={s.slug} className="border-b border-r border-rule">
                <Link href={`/services/${s.slug}`} className="group flex h-full flex-col p-6 transition-colors hover:bg-card md:p-9">
                  <div className="flex items-start justify-between gap-4">
                    <Icon name={s.icon} size={32} className="text-moss" />
                    <span className="eyebrow text-stone">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h2 className="h3 mt-8">{s.name}</h2>
                  <p className="body mt-3 text-stone">{s.summary}</p>
                  <p className="mt-6 text-sm text-stone">{s.engagement.timeline}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 pt-1 text-[0.9375rem] font-medium md:mt-auto md:pt-7">
                    <span className="link">View service</span>
                    <ArrowUpRight
                      size={16}
                      weight="bold"
                      aria-hidden="true"
                      className="transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section border-t border-rule">
        <div className="wrap">
          <SectionHeading
            eyebrow="How we engage"
            title="Four ways to work with us, depending on what you already have."
            lead="Not sure which fits? That is the first thing we settle on the consultation call."
          />
          <div className="mt-12 md:mt-16">
            <TitledGrid items={engagementModels} numbered />
          </div>
          <div className="mt-12 md:mt-16">
            <InlineCta
              title="Not sure which service you need?"
              body="Describe the problem in plain terms. A senior engineer will tell you which approach fits, what it is likely to cost and what could go wrong. Thirty minutes, no obligation."
            />
          </div>
        </div>
      </section>

      <section className="section border-t border-rule">
        <div className="wrap">
          <SectionHeading eyebrow="Why clients stay" title="The same standards on every engagement." />
          <div className="mt-12 md:mt-16">
            <StatRow stats={site.stats} />
          </div>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: title,
          itemListElement: services.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: s.name,
            url: `${site.url}/services/${s.slug}`,
          })),
        }}
      />

      <CtaBand title="Tell us the problem. We will tell you which service solves it." />
    </>
  );
}
