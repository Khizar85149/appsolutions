import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Icon } from "@/components/icon";
import { InlineCta, TitledGrid } from "@/components/services/sections";
import { Button, CtaBand, JsonLd, PageHero, SectionHeading } from "@/components/ui";
import { industries } from "@/content/industries";
import { CONSULTATION_HREF, site } from "@/lib/site";

const title = "Industries We Build Software For";
const description =
  "Software development for healthcare, restaurants and hospitality, retail, financial services, logistics, real estate, education and manufacturing, built to each sector's regulations.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/industries" });

const approach = [
  {
    title: "We learn the floor before the code",
    body: "Discovery includes time with the people who will use the system: nurses, cashiers, dispatchers, accountants. Requirements come from watching the work, not from a questionnaire.",
  },
  {
    title: "Compliance is designed in",
    body: "Privacy, payment and accessibility requirements are listed in the first week and mapped to specific controls. Your auditor gets documentation, not assurances.",
  },
  {
    title: "Pilots before rollouts",
    body: "One ward, one branch or one depot goes first. We measure the result against the baseline, fix what staff report, then expand.",
  },
  {
    title: "Support that matches your hours",
    body: "A hospital and a restaurant cannot wait until Monday. Support agreements set response times that match when your operation actually runs.",
  },
];

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Software shaped by how your sector works."
        lead="A hospital, a restaurant group and a lender have different regulations, different peak hours and different costs of failure. We staff each project with engineers who have shipped in that sector before."
        crumbs={[{ label: "Industries" }]}
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
            eyebrow="Who we build for"
            title="Eight sectors we know from the inside."
            lead="Each page lists the problems we are usually hired to fix, what we build and the standards we build to."
          />
          <ul className="mt-12 border-t border-rule md:mt-16">
            {industries.map((ind) => (
              <li key={ind.slug} className="border-b border-rule">
                <Link
                  href={`/industries/${ind.slug}`}
                  className="group grid gap-4 py-7 transition-colors hover:bg-card md:grid-cols-[3rem_1fr_1.4fr_auto] md:items-center md:gap-8 md:px-4 md:py-9"
                >
                  <Icon name={ind.icon} size={30} className="text-moss" />
                  <h2 className="h3">{ind.name}</h2>
                  <p className="body text-stone">{ind.summary}</p>
                  <span className="inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] font-medium md:justify-end">
                    <span className="link md:sr-only">View industry</span>
                    <ArrowUpRight
                      size={20}
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
            title="The same four commitments in every sector."
            lead="Your industry is not listed? The method is the same. Tell us how your operation runs and we will tell you honestly whether we are the right team."
          />
          <div className="mt-12 md:mt-16">
            <TitledGrid items={approach} numbered />
          </div>
          <div className="mt-12 md:mt-16">
            <InlineCta
              title="Talk to an engineer who has worked in your sector."
              body="We match the consultation to your industry, so the first conversation is about your regulations, your peak hours and your systems. Thirty minutes, no obligation."
            />
          </div>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: title,
          itemListElement: industries.map((ind, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: ind.name,
            url: `${site.url}/industries/${ind.slug}`,
          })),
        }}
      />

      <CtaBand title="Your sector has rules. We build software that respects them." />
    </>
  );
}
