import { PageHero } from "@/components/ui";

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

/** Shared layout for the privacy and terms pages. */
export function LegalPage({
  title,
  lead,
  crumb,
  updated,
  sections,
}: {
  title: string;
  lead: string;
  crumb: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} lead={lead} crumbs={[{ label: crumb }]} />
      <section className="section">
        <div className="wrap">
          <div className="max-w-3xl">
            <p role="note" className="rounded-xl border border-rule bg-card p-5 text-[0.9375rem] leading-relaxed">
              <span className="font-medium">Draft text.</span> This page is a plain-language placeholder. It must be
              reviewed and approved by legal counsel in Canada before the site goes live.
            </p>
            <p className="mt-6 text-sm text-stone">Last updated: {updated}</p>
            <div className="mt-10 space-y-12">
              {sections.map((s, i) => (
                <section key={s.heading}>
                  <h2 className="h3">
                    {i + 1}. {s.heading}
                  </h2>
                  {s.paragraphs.map((p) => (
                    <p key={p} className="body mt-4 text-stone">
                      {p}
                    </p>
                  ))}
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
