import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icon";
import { InlineCta, LinkRows, RelatedCases, TitledGrid } from "@/components/services/sections";
import { Button, CtaBand, FaqJsonLd, FaqList, JsonLd, PageHero, SectionHeading, StatRow } from "@/components/ui";
import { CONSULTATION_HREF, inSentence, site, type NavItem } from "@/lib/site";
import { getIndustries, getIndustry, getServiceNav, staticSlugs } from "@/server/content";

type Props = { params: Promise<{ slug: string }> };

/**
 * A record added in Supabase after the last deploy has no prebuilt page.
 * Its first visitor waits for the full page (with the correct 200 or 404
 * status) instead of receiving an empty shell, and the result is then cached.
 */
export const instant = false;

export async function generateStaticParams() {
  return staticSlugs(await getIndustries());
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = await getIndustry(slug);
  if (!industry) return {};
  return pageMetadata({ title: industry.seo.title, description: industry.seo.description, path: `/industries/${industry.slug}`, type: "website" });
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = await getIndustry(slug);
  if (!industry) notFound();

  const serviceNav = await getServiceNav();
  const relatedServices = industry.services
    .map((s) => serviceNav.find((n) => n.slug === s))
    .filter((s): s is NavItem => Boolean(s));
  const url = `${site.url}/industries/${industry.slug}`;
  const lowerName = inSentence(industry.name);

  return (
    <>
      <PageHero
        eyebrow={`${industry.name} software development`}
        title={industry.heroTitle}
        lead={industry.heroLead}
        crumbs={[{ href: "/industries", label: "Industries" }, { label: industry.name }]}
        aside={
          <div className="border-t border-ink-line pt-6">
            <p className="eyebrow flex items-center gap-2.5 text-fog">
              <Icon name="shield" size={18} className="text-lime" />
              Standards we build to
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {industry.compliance.map((c) => (
                <li key={c} className="rounded-full border border-ink-line px-3.5 py-1.5 text-sm">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={CONSULTATION_HREF} variant="lime" arrow>
            Book a free consultation
          </Button>
          <Button href="#what-we-build" variant="outline-light">
            See what we build
          </Button>
        </div>
      </PageHero>

      {/* Stats */}
      <section className="pt-4 md:pt-8">
        <div className="wrap">
          <h2 className="sr-only">Results we target in {lowerName}</h2>
          <StatRow stats={industry.stats} />
        </div>
      </section>

      {/* Challenges */}
      <section className="section">
        <div className="wrap">
          <SectionHeading
            eyebrow="The problems"
            title="What we are usually hired to fix."
            lead="These four issues come up in nearly every first conversation. Each one has a measurable cost, and it grows every quarter it is left alone."
          />
          <div className="mt-12 md:mt-16">
            <TitledGrid items={industry.challenges} numbered />
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section id="what-we-build" className="section border-t border-rule">
        <div className="wrap">
          <SectionHeading
            eyebrow="What we build"
            title={`Systems we deliver for ${lowerName}.`}
            lead="Each is built around your processes, integrated with the systems you keep, and owned by you."
          />
          <div className="mt-12 md:mt-16">
            <TitledGrid items={industry.solutions} />
          </div>
          <div className="mt-12 md:mt-16">
            <InlineCta
              title="See what this would look like for your operation."
              body="Book a 30 minute call with an engineer who has delivered in your sector. Within two business days you receive a written summary of scope, risks and a budget range."
            />
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="section border-t border-rule">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Compliance"
              title="Built to the standards your auditors check."
              lead="Requirements are identified in the first week and mapped to specific technical controls. You receive the documentation with the software."
            />
          </div>
          <ul className="border-t border-rule">
            {industry.compliance.map((c) => (
              <li key={c} className="flex items-center gap-4 border-b border-rule py-5">
                <Icon name="shield" size={22} className="shrink-0 text-moss" />
                <span className="text-lg font-medium tracking-tight">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services */}
      {relatedServices.length > 0 && (
        <section className="section border-t border-rule">
          <div className="wrap">
            <SectionHeading
              eyebrow="Services"
              title={`What ${lowerName} clients hire us for.`}
              action={
                <Button href="/services" variant="outline" arrow>
                  All services
                </Button>
              }
            />
            <div className="mt-12 md:mt-16">
              <LinkRows base="/services" items={relatedServices} />
            </div>
          </div>
        </section>
      )}

      <RelatedCases
        slugs={industry.caseStudies}
        title={`Our work in ${lowerName}.`}
        lead="What we built, how long it took and what changed for the client."
      />

      {/* FAQ */}
      <section className="section border-t border-rule">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Questions"
              title={`What ${lowerName} teams ask us first.`}
              lead={
                <>
                  Something we did not cover?{" "}
                  <a href={`mailto:${site.email}`} className="link text-ink">
                    Email us
                  </a>{" "}
                  and an engineer will reply within one business day.
                </>
              }
            />
          </div>
          <FaqList items={industry.faqs} />
        </div>
      </section>

      <FaqJsonLd items={industry.faqs} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: industry.seo.title,
          description: industry.seo.description,
          url,
          about: { "@type": "Thing", name: industry.name },
          publisher: { "@type": "Organization", name: site.name, url: site.url },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: site.url },
            { "@type": "ListItem", position: 2, name: "Industries", item: `${site.url}/industries` },
            { "@type": "ListItem", position: 3, name: industry.name, item: url },
          ],
        }}
      />

      <CtaBand
        title={`Planning software for ${lowerName}? Start with a straight answer.`}
        lead="Thirty minutes with an engineer who knows your sector. You leave with a candid view of scope, compliance and budget, and a written summary within two business days."
      />
    </>
  );
}
