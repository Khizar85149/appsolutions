import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/contact-form";
import { Icon } from "@/components/icon";
import { ArrowLink, Eyebrow, FaqJsonLd, FaqList, JsonLd, PageHero, SectionHeading } from "@/components/ui";
import { CONSULTATION_HREF, site } from "@/lib/site";
import type { Faq } from "@/lib/types";

const title = "Contact Us";
const description =
  "Send Nexora Digital your project brief and a senior engineer will reply within one business day. Based in Canada, working with clients across North America, Europe and the Middle East.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/contact" });

const steps = [
  { title: "An engineer reads your brief", body: "Not a sales desk. You hear back within one business day, usually with a few sharp questions." },
  { title: "We hold a 30 minute call", body: "We confirm what you need, flag the risks we see and agree on what a proposal should cover." },
  { title: "You receive a written proposal", body: "Fixed scope, timeline, team and price. Typically within five business days of the call." },
];

const faqs: Faq[] = [
  {
    q: "Will you sign an NDA before we share details?",
    a: "Yes. Ask in your message and we will send our mutual NDA the same day, or we can sign yours. Nothing you send us is shared outside the team assessing your project.",
  },
  {
    q: "How do you price projects?",
    a: "Three ways. Fixed price for work with a clear scope. Time and materials for products that will change as they grow. A dedicated team on a monthly rate when you need engineers working as part of your own. We recommend one after the first call and explain why.",
  },
  {
    q: "We are in a different time zone. How does that work?",
    a: "Our head office works on Eastern Time, and your delivery manager schedules stand ups, demos and reviews inside your working day. We already work this way with clients in Europe and the Gulf.",
  },
  {
    q: "Is there a minimum engagement size?",
    a: "Most first projects start around $25,000 USD. Below that we will tell you plainly whether we are a sensible choice, and suggest a smaller first phase or an alternative if we are not.",
  },
];

function Row({ icon, label, children }: { icon: "mail" | "phone" | "pin"; label: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-4 border-b border-rule py-5">
      <Icon name={icon} size={22} className="mt-0.5 shrink-0 text-moss" />
      <div className="min-w-0">
        <p className="text-sm text-stone">{label}</p>
        <div className="mt-1 text-[0.9375rem] leading-relaxed">{children}</div>
      </div>
    </li>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you need built."
        lead="Write a few lines about the project. A senior engineer will read it and reply within one business day with questions, a first opinion and a suggested next step."
        crumbs={[{ label: "Contact" }]}
      />

      <section className="section">
        <div className="wrap grid gap-16 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
          <div>
            <Eyebrow>Project brief</Eyebrow>
            <h2 className="h3 mt-5">The more specific you are, the more useful our reply.</h2>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <aside>
            <div className="rounded-2xl border border-rule bg-card p-6 sm:p-7">
              <p className="eyebrow text-moss">Prefer to talk</p>
              <p className="mt-4 text-xl font-medium leading-snug tracking-tight">
                Skip the form and book 30 minutes with a senior engineer.
              </p>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-stone">
                Free, with no obligation. Pick a time that suits your calendar.
              </p>
              <ArrowLink href={CONSULTATION_HREF} className="mt-5">
                Book a free consultation
              </ArrowLink>
            </div>

            <h2 className="eyebrow mt-12 text-stone">Reach us directly</h2>
            <ul className="mt-5 border-t border-rule">
              <Row icon="mail" label="Email">
                <a href={`mailto:${site.email}`} className="link font-medium">
                  {site.email}
                </a>
              </Row>
              <Row icon="phone" label="Phone">
                <p>
                  <a href={`tel:${site.phoneCanada.replace(/[^+\d]/g, "")}`} className="link font-medium">
                    {site.phoneCanada}
                  </a>{" "}
                  <span className="text-stone">Mon to Fri</span>
                </p>
              </Row>
              {site.offices.map((o) => (
                <Row key={o.country} icon="pin" label={`${o.country} office`}>
                  <p className="font-medium">{o.city}</p>
                  <p className="text-stone">{o.role}</p>
                  <p className="text-stone">{o.hours}</p>
                </Row>
              ))}
            </ul>

            <h2 className="eyebrow mt-12 text-stone">After you send</h2>
            <ol className="mt-5 space-y-6">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink text-sm font-medium tabular-nums">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-medium leading-snug">{s.title}</h3>
                    <p className="mt-1 text-[0.9375rem] leading-relaxed text-stone">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>

      <section className="section border-t border-rule">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <SectionHeading eyebrow="Before you write" title="Four questions we hear first." />
          <FaqList items={faqs} />
        </div>
      </section>

      <FaqJsonLd items={faqs} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: `Contact ${site.name}`,
          description,
          url: `${site.url}/contact`,
          mainEntity: {
            "@type": "Organization",
            name: site.name,
            url: site.url,
            email: site.email,
            contactPoint: [
              { "@type": "ContactPoint", contactType: "sales", telephone: site.phoneCanada, areaServed: "CA", availableLanguage: "English" },
            ],
          },
        }}
      />
    </>
  );
}
