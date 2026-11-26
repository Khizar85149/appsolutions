import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { ApplicationForm } from "@/components/careers/application-form";
import { ArrowLink, Button, Eyebrow, JsonLd, PageHero } from "@/components/ui";
import { getJob, jobs } from "@/content/careers";
import { hiringStages } from "@/content/hiring";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) return {};
  return pageMetadata({ title: `${job.title}, ${job.location}`, description: job.summary, path: `/careers/${job.slug}`, type: "website" });
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="border-t border-rule py-10 md:py-12">
      <h2 className="h3">{title}</h2>
      <ul className="mt-6 space-y-3.5">
        {items.map((i) => (
          <li key={i} className="flex gap-3.5">
            <Check size={20} weight="light" aria-hidden="true" className="mt-0.5 shrink-0 text-moss" />
            <span className="body">{i}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function JobPage({ params }: Props) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();

  const url = `${site.url}/careers/${job.slug}`;
  const facts = [
    { k: "Department", v: job.department },
    { k: "Location", v: job.location },
    { k: "Type", v: job.type },
    { k: "Experience", v: job.experience },
  ];
  const remote = /remote/i.test(job.location);
  const country = "CA";

  return (
    <>
      <PageHero
        eyebrow={job.department}
        title={job.title}
        lead={job.summary}
        crumbs={[{ href: "/careers", label: "Careers" }, { label: job.title }]}
        aside={
          <dl className="border-t border-ink-line">
            {facts.map((f) => (
              <div key={f.k} className="grid grid-cols-[7rem_1fr] gap-4 border-b border-ink-line py-3.5 text-[0.9375rem]">
                <dt className="text-fog">{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>
        }
      >
        <Button href="#apply" variant="lime" arrow>
          Apply for this role
        </Button>
      </PageHero>

      <div className="wrap grid gap-x-16 pb-6 pt-14 md:pt-20 lg:grid-cols-[2fr_1fr]">
        <div className="max-w-2xl">
          <section className="pb-10 md:pb-12">
            <Eyebrow>About the role</Eyebrow>
            <div className="mt-6 space-y-5">
              {job.about.map((p) => (
                <p key={p} className="body text-stone first:text-lg first:leading-relaxed first:text-ink">
                  {p}
                </p>
              ))}
            </div>
          </section>
          <List title="What you will do" items={job.responsibilities} />
          <List title="What we are looking for" items={job.requirements} />
          <List title="Nice to have" items={job.niceToHave} />
        </div>

        <aside className="lg:pt-1">
          <div className="border-t border-rule pt-8 lg:sticky lg:top-28">
            <h2 className="eyebrow text-stone">Hiring process</h2>
            <ol className="mt-6 space-y-6">
              {hiringStages.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[2rem_1fr] gap-1">
                  <span className="eyebrow pt-1 text-moss">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-medium tracking-tight">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-stone">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-7 text-sm leading-relaxed text-stone">
              The full process takes two to three weeks. You receive written feedback at whichever stage you stop.
            </p>
          </div>
        </aside>
      </div>

      <section id="apply" className="bg-paper-deep">
        <div className="wrap section grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div>
            <Eyebrow>Apply</Eyebrow>
            <h2 className="h2 mt-5">Apply for {job.title}.</h2>
            <p className="body mt-5 max-w-md text-stone">
              It takes about five minutes. A link to real work tells us more than a cover letter, so send the profile or
              portfolio that shows what you have shipped.
            </p>
            <p className="body mt-5 max-w-md text-stone">
              Prefer email? Write to{" "}
              <a href={`mailto:${site.careersEmail}?subject=${encodeURIComponent(job.title)}`} className="link break-all text-ink">
                {site.careersEmail}
              </a>
              .
            </p>
            <ArrowLink href="/careers" className="mt-7">
              See all open roles
            </ArrowLink>
          </div>
          <ApplicationForm jobSlug={job.slug} jobTitle={job.title} />
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "JobPosting",
          title: job.title,
          description: [job.summary, ...job.about, ...job.responsibilities, ...job.requirements].join(" "),
          datePosted: job.posted,
          employmentType: "FULL_TIME",
          url,
          directApply: true,
          hiringOrganization: { "@type": "Organization", name: site.name, sameAs: site.url },
          jobLocation: {
            "@type": "Place",
            address: { "@type": "PostalAddress", addressLocality: job.location, addressCountry: country },
          },
          ...(remote
            ? { jobLocationType: "TELECOMMUTE", applicantLocationRequirements: { "@type": "Country", name: "Canada" } }
            : {}),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: site.url },
            { "@type": "ListItem", position: 2, name: "Careers", item: `${site.url}/careers` },
            { "@type": "ListItem", position: 3, name: job.title, item: url },
          ],
        }}
      />
    </>
  );
}
