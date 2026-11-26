import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { CaseCard } from "@/components/case-card";
import { Icon } from "@/components/icon";
import { RevealGroup } from "@/components/motion";
import { ArrowLink, Button, CtaBand, Eyebrow, FaqJsonLd, FaqList, HeroBackdrop, HeroHeading, SectionHeading, StatRow } from "@/components/ui";
import { caseStudies } from "@/content/case-studies";
import { CONSULTATION_HREF, industryNav, serviceNav, site } from "@/lib/site";
import type { Faq, IconKey } from "@/lib/types";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const reasons: { icon: IconKey; title: string; body: string }[] = [
  {
    icon: "users",
    title: "Three in every hundred applicants are hired",
    body: "Each engineer passes a code review, a system design interview, a live build and a client communication assessment. The people who pass are the people on your project.",
  },
  {
    icon: "handshake",
    title: "Accountability in your time zone",
    body: "Your account lead, contract and escalation path sit in Canada. You get answers during your working day, from a named person who is responsible for the result.",
  },
  {
    icon: "document",
    title: "A fixed scope before you commit",
    body: "Every proposal lists deliverables, price and milestones. If the scope changes, you see the cost and approve it before any work begins.",
  },
  {
    icon: "lock",
    title: "You own everything we build",
    body: "Source code, designs and infrastructure live in your accounts from the first commit. There are no licence fees and no lock-in.",
  },
];

const steps = [
  {
    when: "Day 1",
    title: "Consultation",
    body: "A 30 minute call with a senior engineer. We ask about the business problem first and the technology second.",
  },
  {
    when: "Week 1",
    title: "Scope and proposal",
    body: "You receive a written scope, architecture outline, fixed price and delivery plan. No charge and no obligation.",
  },
  {
    when: "Every 2 weeks",
    title: "Build and demo",
    body: "Work ships in two week sprints. Each one ends with a live demo on a staging environment you can use yourself.",
  },
  {
    when: "Launch onward",
    title: "Release and support",
    body: "We handle deployment, monitoring and handover. Most clients keep the same team on a support retainer afterwards.",
  },
];

const faqs: Faq[] = [
  {
    q: "How much does a custom software project cost?",
    a: "It depends on scope, integrations and compliance requirements. Most first releases fall between $25,000 and $150,000 USD. You get a fixed price after the free consultation, before you commit to anything.",
  },
  {
    q: "How soon can you start, and how long will it take?",
    a: "A team is usually assigned within two weeks of a signed proposal. A focused first release typically takes 8 to 16 weeks. ERP and hospital systems are delivered in phases over a longer period, with usable modules going live along the way.",
  },
  {
    q: "Who will actually work on my project?",
    a: "A dedicated team: a delivery manager, a lead engineer and the engineers and designers the scope calls for. You meet them before work starts and they stay with the project. We do not rotate people between clients mid-build.",
  },
  {
    q: "Can you take over or modernise software we already have?",
    a: "Yes. We begin with a technical audit of the code, data and infrastructure, then recommend whether to stabilise, extend or rebuild in phases. Your current system keeps running while the work is done.",
  },
  {
    q: "What happens after launch?",
    a: "Every project includes a warranty period for defects. After that, support retainers cover monitoring, security updates and new features with agreed response times.",
  },
];

export default function HomePage() {
  const featured = caseStudies.filter((c) => c.featured).slice(0, 3);
  const quotes = caseStudies.filter((c) => c.quote).slice(0, 2);
  const { intake } = site;

  return (
    <>
      {/* Hero */}
      <section className="on-ink relative isolate overflow-hidden bg-ink text-paper">
        <HeroBackdrop src="/images/hero-towers.jpg" />
        <div className="wrap flex min-h-[calc(100svh-4rem)] flex-col justify-end pb-10 pt-20 md:min-h-[calc(100svh-4.5rem)] md:pb-14 md:pt-28">
          <div className="max-w-4xl">
            <HeroHeading label="Custom software development company in Canada" size="display">
              Serious software, built by the top 3% of engineers.
            </HeroHeading>
            <p className="lead mt-7 max-w-2xl text-paper/75">
              We design, build and run ERP systems, AI automation, mobile apps and custom platforms for companies
              whose operations depend on them. Built by senior engineers and delivered on a scope and price you approve before we start.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={CONSULTATION_HREF} variant="lime" arrow>
                Book a free consultation
              </Button>
              <Button href="/case-studies" variant="outline-light" className="border-paper/40">
                See our work
              </Button>
            </div>
            <p className="mt-6 text-sm text-paper/70">
              Free 30 minute call with a senior engineer. {intake.slotsOpen} of {intake.slotsTotal} project starts
              still open for {intake.period}.
            </p>
          </div>

          <div className="mt-14 md:mt-20">
            <StatRow stats={site.stats} tone="dark" />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section">
        <div className="wrap">
          <SectionHeading
            eyebrow="What we build"
            title="Eight practices. One accountable team."
            lead="Whatever the system, the same senior people design it, build it and stay to support it."
            action={<ArrowLink href="/services">All services</ArrowLink>}
          />
          <RevealGroup as="ul" className="mt-12 grid border-l border-t border-rule sm:grid-cols-2 lg:grid-cols-4 md:mt-16">
            {serviceNav.map((s) => (
              <li key={s.slug} className="border-b border-r border-rule">
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col p-6 transition-colors hover:bg-card md:p-7"
                >
                  <div className="flex items-start justify-between">
                    <Icon name={s.icon} size={30} className="text-ink" />
                    <ArrowUpRight
                      size={18}
                      aria-hidden="true"
                      className="text-stone transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                    />
                  </div>
                  <h3 className="mt-10 text-lg font-medium leading-snug tracking-tight md:mt-14">{s.name}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-stone">{s.blurb}</p>
                </Link>
              </li>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Why us */}
      <section className="section border-t border-rule bg-paper-deep">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>Why companies choose us</Eyebrow>
            <h2 className="h2 mt-3">Senior engineers. One accountable Canadian team.</h2>
            <p className="lead mt-5 text-stone">
              Most software projects fail on communication and ownership, not on code. We built the company around
              fixing both.
            </p>
            <div className="mt-8">
              <Button href="/about" variant="outline">
                How we work
              </Button>
            </div>
          </div>
          <ul className="border-t border-rule">
            {reasons.map((r) => (
              <li key={r.title} className="grid gap-4 border-b border-rule py-8 sm:grid-cols-[3rem_1fr] sm:gap-6">
                <Icon name={r.icon} size={30} className="text-moss" />
                <div>
                  <h3 className="h3">{r.title}</h3>
                  <p className="body mt-3 max-w-xl text-stone">{r.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Case studies */}
      <section className="section">
        <div className="wrap">
          <SectionHeading
            eyebrow="Selected work"
            title="Results our clients report to their boards."
            lead="Each engagement is measured against a number agreed at the start."
            action={<ArrowLink href="/case-studies">All case studies</ArrowLink>}
          />
          <RevealGroup className="mt-12 grid gap-8 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((study) => (
              <CaseCard key={study.slug} study={study} />
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Process */}
      <section className="section border-t border-rule">
        <div className="wrap">
          <SectionHeading
            eyebrow="How an engagement runs"
            title="From first call to live software, with no surprises in between."
          />
          <RevealGroup as="ol" className="mt-12 grid border-t border-rule md:mt-16 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className={`border-b border-rule py-8 lg:border-b-0 lg:py-10 lg:pr-8 ${
                  i > 0 ? "lg:border-l lg:pl-8" : ""
                } ${i % 2 === 1 ? "md:border-l md:pl-8" : "md:pr-8"}`}
              >
                <p className="eyebrow text-moss">
                  0{i + 1} / {s.when}
                </p>
                <h3 className="h3 mt-6">{s.title}</h3>
                <p className="body mt-3 text-stone">{s.body}</p>
              </li>
            ))}
          </RevealGroup>
          <div className="mt-10 flex flex-col items-start gap-4 rounded-xl border border-rule bg-card p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
            <p className="max-w-xl text-lg font-medium leading-snug tracking-tight">
              Step one costs nothing and takes 30 minutes. Pick a time that suits you.
            </p>
            <Button href={CONSULTATION_HREF} arrow>
              Choose a time
            </Button>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section border-t border-rule bg-paper-deep">
        <div className="wrap">
          <SectionHeading
            eyebrow="Industries"
            title="We already know how your sector runs."
            lead="Regulations, peak hours, legacy systems and the people who use the software on a busy day."
            action={<ArrowLink href="/industries">All industries</ArrowLink>}
          />
          <RevealGroup as="ul" className="mt-12 grid border-t border-rule md:mt-16 md:grid-cols-2 md:gap-x-16">
            {industryNav.map((ind) => (
              <li key={ind.slug} className="border-b border-rule">
                <Link href={`/industries/${ind.slug}`} className="group flex items-center gap-5 py-6">
                  <Icon name={ind.icon} size={28} className="shrink-0 text-moss" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-lg font-medium tracking-tight">{ind.name}</span>
                    <span className="mt-1 block text-[0.9375rem] leading-snug text-stone">{ind.blurb}</span>
                  </span>
                  <ArrowUpRight
                    size={18}
                    aria-hidden="true"
                    className="shrink-0 text-stone transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                  />
                </Link>
              </li>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Client voices */}
      {quotes.length > 0 && (
        <section className="section">
          <div className="wrap">
            <Eyebrow>In our clients&rsquo; words</Eyebrow>
            <div className="mt-10 grid gap-12 md:grid-cols-2 md:gap-16">
              {quotes.map((c) => (
                <figure key={c.slug} className="border-t border-ink pt-8">
                  <blockquote className="text-xl font-medium leading-snug tracking-tight md:text-2xl">
                    &ldquo;{c.quote!.text}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-stone">
                    <span>{c.quote!.role}</span>
                    <ArrowLink href={`/case-studies/${c.slug}`}>Read the case study</ArrowLink>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="section border-t border-rule">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <Eyebrow>Before you ask</Eyebrow>
            <h2 className="h2 mt-3">The questions every buyer raises first.</h2>
            <p className="body mt-5 text-stone">
              Something else on your mind?{" "}
              <Link href="/contact" className="link text-ink">
                Ask us directly
              </Link>
              . You will get a reply within one business day.
            </p>
          </div>
          <FaqList items={faqs} />
        </div>
        <FaqJsonLd items={faqs} />
      </section>

      <CtaBand />
    </>
  );
}
