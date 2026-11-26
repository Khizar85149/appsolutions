import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { CaseCard } from "@/components/case-card";
import { CaseFilter } from "@/components/case-studies/case-filter";
import { Button, CtaBand, PageHero, StatRow } from "@/components/ui";
import { caseStudies } from "@/content/case-studies";
import { CONSULTATION_HREF, industryNav } from "@/lib/site";

const title = "Case Studies: Software We Have Shipped";
const description =
  "Read how Nexora Digital delivered POS, hospital management, ERP, AI assistants and mobile apps for clients in Canada and abroad, with the numbers that followed.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/case-studies" });

const headline = [
  { value: "6", label: "engagements documented here, start to finish" },
  { value: "11 wks", label: "shortest time from kickoff to first production release" },
  { value: "0", label: "trading days lost across every cutover on this page" },
];

export default function CaseStudiesPage() {
  const options = industryNav
    .map((i) => ({ slug: i.slug, name: i.name, count: caseStudies.filter((c) => c.industry === i.slug).length }))
    .filter((o) => o.count > 0);

  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="Results our clients can show their board."
        lead="Each story covers the problem, the decisions we made and the numbers measured after launch. Client names are withheld under NDA."
        crumbs={[{ label: "Case Studies" }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={CONSULTATION_HREF} variant="lime" arrow>
            Discuss a similar project
          </Button>
          <Button href="/services" variant="outline-light">
            See what we build
          </Button>
        </div>
      </PageHero>

      <section className="wrap section">
        <CaseFilter
          options={options}
          items={caseStudies.map((c) => ({ slug: c.slug, industry: c.industry, card: <CaseCard study={c} /> }))}
        />
      </section>

      <section className="wrap pb-18 md:pb-28">
        <h2 className="sr-only">Delivery record</h2>
        <StatRow stats={headline} />
      </section>

      <CtaBand
        title="Your project could be the next one on this page."
        lead="Bring the problem. In thirty minutes a senior engineer will tell you how we would approach it, what it is likely to cost and what could go wrong."
      />
    </>
  );
}
