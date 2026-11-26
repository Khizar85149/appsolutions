import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icon";
import { CheckList, InlineCta, LinkRows, ProcessSteps, RelatedCases, TitledGrid } from "@/components/services/sections";
import { Button, CtaBand, FaqJsonLd, FaqList, JsonLd, PageHero, SectionHeading, StatRow } from "@/components/ui";
import { getService, services } from "@/content/services";
import { CONSULTATION_HREF, inSentence, industryNav, site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({ title: service.seo.title, description: service.seo.description, path: `/services/${service.slug}`, type: "website" });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const relatedIndustries = industryNav.filter((i) => service.industries.includes(i.slug));
  const url = `${site.url}/services/${service.slug}`;
  const lowerName = inSentence(service.name);

  const facts = [
    { icon: "clock" as const, label: "Timeline", value: service.engagement.timeline },
    { icon: "users" as const, label: "Team", value: service.engagement.team },
    { icon: "document" as const, label: "Commercial model", value: service.engagement.model },
  ];

  return (
    <>
      <PageHero
        eyebrow={service.name}
        title={service.heroTitle}
        lead={service.heroLead}
        crumbs={[{ href: "/services", label: "Services" }, { label: service.name }]}
        aside={
          <dl className="border-t border-ink-line">
            {facts.map((f) => (
              <div key={f.label} className="flex items-start gap-4 border-b border-ink-line py-5">
                <Icon name={f.icon} size={22} className="mt-0.5 shrink-0 text-lime" />
                <div>
                  <dt className="eyebrow text-fog">{f.label}</dt>
                  <dd className="mt-2 text-[0.9375rem] leading-snug">{f.value}</dd>
                </div>
              </div>
            ))}
          </dl>
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={CONSULTATION_HREF} variant="lime" arrow>
            Book a free consultation
          </Button>
          <Button href="#deliverables" variant="outline-light">
            See what you get
          </Button>
        </div>
      </PageHero>

      {/* Outcomes */}
      <section className="pt-4 md:pt-8">
        <div className="wrap">
          <h2 className="sr-only">What to expect</h2>
          <StatRow stats={service.outcomes} />
        </div>
      </section>

      {/* Signals */}
      <section className="section">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Is this you"
              title="Five signs it is time to act."
              lead="If two or more of these describe your week, the cost of waiting is already higher than the cost of fixing it."
            />
          </div>
          <CheckList items={service.signals} />
        </div>
      </section>

      {/* Deliverables */}
      <section id="deliverables" className="section border-t border-rule">
        <div className="wrap">
          <SectionHeading
            eyebrow="What you get"
            title="Deliverables you can hold us to."
            lead="Each item below is written into the statement of work with acceptance criteria. Nothing is implied."
          />
          <div className="mt-12 md:mt-16">
            <TitledGrid items={service.deliverables} />
          </div>
          <div className="mt-12 md:mt-16">
            <InlineCta
              title={`Get a written scope for your ${lowerName} project.`}
              body="Book a 30 minute call with a senior engineer. Within two business days you receive a summary of scope, risks and a budget range. It costs nothing and you keep the document."
            />
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section border-t border-rule">
        <div className="wrap">
          <SectionHeading
            eyebrow="How it runs"
            title="Four stages. You see progress at every one."
            lead="No long silences followed by a big reveal. You review working software throughout and can stop after any stage."
          />
          <div className="mt-12 md:mt-16">
            <ProcessSteps steps={service.process} />
          </div>
        </div>
      </section>

      {/* Stack and engagement */}
      <section className="section border-t border-rule">
        <div className="wrap grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="h3">Technology we use for this work</h2>
            <p className="body mt-3 max-w-md text-stone">
              We choose proven tools that your own team or any competent vendor can maintain after us.
            </p>
            <ul className="mt-7 flex flex-wrap gap-2">
              {service.stack.map((t) => (
                <li key={t} className="rounded-full border border-rule px-3.5 py-1.5 text-sm">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="h3">How the engagement is set up</h2>
            <dl className="mt-7 border-t border-rule">
              {facts.map((f) => (
                <div key={f.label} className="grid gap-1 border-b border-rule py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="text-sm text-stone">{f.label}</dt>
                  <dd className="text-[0.9375rem] font-medium leading-snug">{f.value}</dd>
                </div>
              ))}
              <div className="grid gap-1 border-b border-rule py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <dt className="text-sm text-stone">Ownership</dt>
                <dd className="text-[0.9375rem] font-medium leading-snug">
                  All code, infrastructure and documentation belong to you
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <RelatedCases
        slugs={service.caseStudies}
        title={`${service.name} in production.`}
        lead="What we built, how long it took and what changed for the client."
      />

      {/* Industries */}
      {relatedIndustries.length > 0 && (
        <section className="section border-t border-rule">
          <div className="wrap">
            <SectionHeading
              eyebrow="Where we apply it"
              title="Industries that rely on this service."
              action={
                <Button href="/industries" variant="outline" arrow>
                  All industries
                </Button>
              }
            />
            <div className="mt-12 md:mt-16">
              <LinkRows base="/industries" items={relatedIndustries} />
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="section border-t border-rule">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Questions"
              title="What buyers ask before they sign."
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
          <FaqList items={service.faqs} />
        </div>
      </section>

      <FaqJsonLd items={service.faqs} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.name,
          serviceType: service.name,
          description: service.seo.description,
          url,
          provider: { "@type": "Organization", name: site.name, url: site.url },
          areaServed: ["Canada", "United States"],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: site.url },
            { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/services` },
            { "@type": "ListItem", position: 3, name: service.name, item: url },
          ],
        }}
      />

      <CtaBand
        title={`Ready to talk about ${lowerName}?`}
        lead="Thirty minutes with the engineer who leads this practice. You leave with a candid view of scope, timeline and budget, and a written summary within two business days."
      />
    </>
  );
}
