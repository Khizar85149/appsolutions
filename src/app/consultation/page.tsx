import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight, Check, Clock } from "@phosphor-icons/react/dist/ssr";
import { Icon } from "@/components/icon";
import { Eyebrow, JsonLd, PageHero } from "@/components/ui";
import { consultations } from "@/content/consultations";
import { site } from "@/lib/site";

const title = "Book a Free Consultation";
const description =
  "Choose a free session with a senior Apps Solutions Tech engineer. Pick a time that suits you and receive a written summary of scope, risks and budget within two business days.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/consultation" });

const onTheCall = [
  { title: "You talk, we listen", body: "The first ten minutes are yours. Tell us what you are building, fixing or replacing, and why now." },
  { title: "We ask the hard questions", body: "Users, data, integrations, deadlines. The details that decide whether a project lands on budget." },
  { title: "You get a straight answer", body: "How we would approach it, what it is likely to cost, and whether we are the right team for it." },
];

const afterwards = [
  "A written summary of what we discussed, within two business days",
  "A first scope outline with the main risks named",
  "A budget range and a realistic timeline",
  "A recommendation on team size and where to start",
];

export default function ConsultationPage() {
  return (
    <>
      <PageHero
        eyebrow="Free consultation"
        title="Pick a session. Talk to an engineer this week."
        lead="Every call is with someone who builds software for a living. No sales script and no obligation. Choose the session closest to your situation and select a time."
        crumbs={[{ label: "Consultation" }]}
      />

      <section className="section">
        <div className="wrap grid gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
          <div>
            <div className="overflow-hidden rounded-2xl border border-rule bg-card">
              <div className="border-b border-rule px-5 py-6 sm:px-8">
                <p className="text-sm font-medium text-stone">{site.name}</p>
                <h2 className="mt-1 text-2xl font-medium tracking-tight">Select a session type</h2>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-stone">
                  All sessions are held by video call. You will choose a date and time on the next step.
                </p>
              </div>
              <ul>
                {consultations.map((c, i) => (
                  <li key={c.slug} className={i > 0 ? "border-t border-rule" : ""}>
                    <Link
                      href={`/consultation/${c.slug}`}
                      className="group flex items-start gap-4 px-5 py-6 transition-colors hover:bg-lime-soft/50 sm:gap-5 sm:px-8"
                    >
                      <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-rule bg-paper text-ink">
                        <Icon name={c.icon} size={22} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span className="text-lg font-medium leading-snug tracking-tight">{c.name}</span>
                          <span className="inline-flex items-center gap-1.5 text-sm text-stone">
                            <Clock size={15} weight="light" aria-hidden="true" />
                            {c.duration} min
                          </span>
                        </span>
                        <span className="mt-1.5 block text-[0.9375rem] leading-relaxed text-stone">{c.summary}</span>
                      </span>
                      <ArrowRight
                        size={20}
                        aria-hidden="true"
                        className="mt-3 shrink-0 text-stone transition-transform duration-150 group-hover:translate-x-1 group-hover:text-ink"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-stone">
              Free of charge. No obligation. An NDA is available before the call if you ask for one. Not sure which
              session fits? Choose the Project Discovery Call, or{" "}
              <Link href="/contact" className="link text-ink">
                send us a message
              </Link>
              .
            </p>
          </div>

          <div>
            <Eyebrow>What happens on the call</Eyebrow>
            <ol className="mt-7 border-t border-rule">
              {onTheCall.map((s, i) => (
                <li key={s.title} className="flex gap-5 border-b border-rule py-6">
                  <span className="eyebrow pt-1.5 text-stone">0{i + 1}</span>
                  <div>
                    <h3 className="text-lg font-medium tracking-tight">{s.title}</h3>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-stone">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-12">
              <Eyebrow>What you receive afterwards</Eyebrow>
              <ul className="mt-6 space-y-3.5">
                {afterwards.map((a) => (
                  <li key={a} className="flex gap-3 text-[0.9375rem] leading-snug">
                    <Check size={18} weight="bold" aria-hidden="true" className="mt-0.5 shrink-0 text-moss" />
                    {a}
                  </li>
                ))}
              </ul>
              <p className="mt-7 text-sm leading-relaxed text-stone">
                The summary is yours to keep. Use it to brief your team or to compare other vendors against the same
                scope.
              </p>
            </div>
          </div>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: title,
          description,
          url: `${site.url}/consultation`,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: consultations.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: c.name,
              url: `${site.url}/consultation/${c.slug}`,
            })),
          },
        }}
      />
    </>
  );
}
