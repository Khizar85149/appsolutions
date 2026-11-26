import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Icon } from "@/components/icon";
import { ArrowLink, Button, CtaBand, Eyebrow, PageHero, SectionHeading, StatRow } from "@/components/ui";
import { hiringStages } from "@/content/hiring";
import { CONSULTATION_HREF, site } from "@/lib/site";
import type { IconKey } from "@/lib/types";

const title = "About Us: A Canadian Software Engineering Company";
const description =
  "Apps Solutions Tech is a Canadian software company with a senior engineering team. Learn how we hire the top 3%, run delivery and protect your IP.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/about" });

const principles = [
  {
    title: "Say the uncomfortable thing early",
    body: "If a deadline is at risk, you hear it the week we know, with options and costs. A late surprise is a failure on our side.",
  },
  {
    title: "Show working software every week",
    body: "Progress is what you can click on. Every Thursday you see a demo on a staging environment, and you can use it yourself afterwards.",
  },
  {
    title: "Build what the business needs, then stop",
    body: "We challenge features that do not earn their cost. Several clients have shipped sooner because we talked them out of a third of their list.",
  },
  {
    title: "Leave nothing that only we can maintain",
    body: "Standard frameworks, written documentation and tests. Your own team, or another vendor, can take over the code on any day.",
  },
];

const delivery: { icon: IconKey; title: string; body: string }[] = [
  {
    icon: "clock",
    title: "Answers in your working day",
    body: "Your delivery manager works North American hours. Stand-ups, reviews and questions are handled during your day, by someone who knows the project.",
  },
  {
    icon: "video",
    title: "A demo every week",
    body: "One fixed slot, working software, recorded for anyone who misses it. You also receive a written status report each Friday.",
  },
  {
    icon: "document",
    title: "Fixed scope proposals",
    body: "You sign a proposal that lists deliverables, price and dates. A change goes through a written request with its cost before any work starts.",
  },
  {
    icon: "lock",
    title: "You own the code and the IP",
    body: "The repository sits in your organisation from the first commit. Ownership of all work transfers to you on payment, stated in the contract.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Apps Solutions Tech"
        title="Senior engineers. One accountable Canadian team."
        lead="We started this company to fix one problem: software teams with real talent and nobody answerable to the client. Our contracts, delivery managers and commitments are in Canada. Our engineers come from the top 3% of the people who apply."
        crumbs={[{ label: "About" }]}
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

      <section className="wrap section">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <div>
            <Eyebrow>Our story</Eyebrow>
            <h2 className="h2 mt-5">Why we built the company this way.</h2>
          </div>
          <div className="max-w-2xl space-y-6">
            <p className="lead">
              Most companies that have bought custom software tell the same story. The proposal looked good. Then came
              missed calls, vague updates and a codebase nobody in the business could judge.
            </p>
            <p className="body text-stone">
              The engineers were rarely the problem. What was missing was someone on the client&rsquo;s side of the
              table: in their time zone, under their legal system, accountable for the outcome.
            </p>
            <p className="body text-stone">
              Apps Solutions Tech is built around that gap. Our Canadian head office owns the client relationship, the
              contract and the delivery plan. Engineering and design are staffed only by people who pass a four stage
              hiring process that about 3% of applicants complete.
            </p>
            <p className="body text-stone">
              You get one team with one standard, and a named person in Canada who answers for the result.
            </p>
          </div>
        </div>
      </section>

      <section className="wrap pb-18 md:pb-28">
        <h2 className="sr-only">Apps Solutions Tech in numbers</h2>
        <StatRow stats={site.stats} />
      </section>

      <section className="bg-paper-deep">
        <div className="wrap section">
          <SectionHeading
            eyebrow="Where we are"
            title="Based in Canada. Working with clients worldwide."
            lead="Contracts, client partnership and delivery management run from our Canadian head office."
          />
          <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2">
            {site.offices.map((o) => (
              <article key={o.country} className="rounded-xl border border-rule bg-card p-6 sm:p-9">
                <p className="eyebrow text-moss">{o.country}</p>
                <h3 className="h2 mt-5">{o.city}</h3>
                <p className="body mt-4 text-stone">{o.role}</p>
                <dl className="mt-8 border-t border-rule">
                  <div className="flex items-start gap-3 border-b border-rule py-4 text-[0.9375rem]">
                    <Icon name="clock" size={20} className="mt-0.5 shrink-0 text-stone" />
                    <div>
                      <dt className="sr-only">Office hours</dt>
                      <dd>{o.hours}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 py-4 text-[0.9375rem]">
                    <Icon name="users" size={20} className="mt-0.5 shrink-0 text-stone" />
                    <div>
                      <dt className="sr-only">Who works here</dt>
                      <dd>
                        {"Client partners, delivery managers, solution architects"}
                      </dd>
                    </div>
                  </div>
                </dl>
              </article>
            ))}
            <article className="rounded-xl border border-rule p-6 sm:p-9">
              <p className="eyebrow text-moss">Clients</p>
              <h3 className="h2 mt-5">Four regions served</h3>
              <p className="body mt-4 text-stone">
                Most of our work is for companies in Canada and the United States. We also deliver for clients in Europe
                and the Gulf, on the same contracts and the same delivery process.
              </p>
              <ul className="mt-8 border-t border-rule text-[0.9375rem]">
                {["Canada", "United States", "United Kingdom and Europe", "United Arab Emirates and the Gulf"].map((r) => (
                  <li key={r} className="border-b border-rule py-4 last:border-b-0">
                    {r}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="wrap section">
        <SectionHeading
          eyebrow="The top 3%"
          title="How an engineer earns a seat on your project."
          lead="Out of every 100 people who apply, about 3 are hired. Each stage removes a different kind of risk from your project."
          action={<ArrowLink href="/careers">See open roles</ArrowLink>}
        />
        <ol className="mt-12 border-t border-rule md:mt-16">
          {hiringStages.map((s, i) => (
            <li key={s.title} className="grid gap-3 border-b border-rule py-7 md:grid-cols-[5rem_1.2fr_2fr_1fr] md:items-baseline md:gap-8 md:py-8">
              <span className="eyebrow text-moss">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="h3">{s.title}</h3>
              <p className="body text-stone">{s.body}</p>
              <p className="text-sm font-medium md:text-right">{s.pass}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-paper-deep">
        <div className="wrap section">
          <SectionHeading
            eyebrow="Principles"
            title="Four rules we hold ourselves to."
            lead="They are specific on purpose. You can check each one against what you see in the first month."
          />
          <ol className="mt-12 grid gap-x-16 md:mt-16 md:grid-cols-2">
            {principles.map((p, i) => (
              <li key={p.title} className="border-t border-rule py-8">
                <span className="eyebrow text-moss">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h3 mt-4">{p.title}</h3>
                <p className="body mt-3 max-w-lg text-stone">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap section">
        <SectionHeading
          eyebrow="How delivery runs"
          title="What working with us looks like, week to week."
          lead="No guesswork about where your project stands or who owns what."
        />
        <ul className="mt-12 grid gap-x-10 gap-y-10 md:mt-16 md:grid-cols-2 lg:grid-cols-4">
          {delivery.map((d) => (
            <li key={d.title} className="border-t border-rule pt-6">
              <Icon name={d.icon} size={28} className="text-moss" />
              <h3 className="mt-5 text-lg font-medium tracking-tight">{d.title}</h3>
              <p className="body mt-2 text-stone">{d.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand
        title="Meet the people who would build your product."
        lead="Book thirty minutes with a senior engineer and a delivery manager. Ask how we would staff your project, what it would cost and what we would do in the first two weeks."
      />
    </>
  );
}
