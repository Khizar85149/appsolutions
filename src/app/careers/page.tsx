import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Icon } from "@/components/icon";
import { Button, Eyebrow, PageHero, SectionHeading } from "@/components/ui";
import { jobs } from "@/content/careers";
import { hiringStages } from "@/content/hiring";
import { site } from "@/lib/site";
import type { IconKey } from "@/lib/types";

const title = "Careers: Engineering, Design and Delivery Roles";
const description =
  "Join Apps Solutions Tech in Toronto or remotely. We hire the top 3% of applicants through a four stage process and put them on software that businesses run on.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/careers" });

const offers: { icon: IconKey; title: string; body: string }[] = [
  {
    icon: "code",
    title: "Work that reaches production",
    body: "You build systems that run hospitals, restaurants and warehouses. Every project ships, and you see the numbers after launch.",
  },
  {
    icon: "users",
    title: "Senior colleagues only",
    body: "Everyone passed the same four stages you will. Code review is a conversation between peers, and you will learn from it weekly.",
  },
  {
    icon: "handshake",
    title: "Direct client contact",
    body: "Engineers and designers present their own work. No account manager rewrites your explanation.",
  },
  {
    icon: "clock",
    title: "Predictable hours",
    body: "Fixed scope projects mean planned releases. Core hours for client calls, and the rest of the day is yours to plan.",
  },
  {
    icon: "chart",
    title: "Pay reviewed twice a year",
    body: "Salaries sit in the top quartile for each city and are reviewed every six months against a published ladder.",
  },
  {
    icon: "rocket",
    title: "A learning budget you will use",
    body: "An annual allowance for courses, books and conferences, plus one paid week a year for a project of your choice.",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Do the best work of your career, with people at your level."
        lead="We hire about 3 in every 100 applicants. Those who join work in small senior teams, speak to clients directly and ship software that businesses depend on every day."
        crumbs={[{ label: "Careers" }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button href="#open-roles" variant="lime" arrow>
            See {jobs.length} open roles
          </Button>
          <p className="text-sm text-fog">Toronto and remote.</p>
        </div>
      </PageHero>

      <section className="wrap section">
        <SectionHeading
          eyebrow="The hiring bar"
          title="Four stages. About 3% receive an offer."
          lead="The process is demanding and we tell you that up front. It takes two to three weeks, every stage is run by working engineers, and you get written feedback wherever you stop."
        />
        <ol className="mt-12 grid border-t border-rule md:mt-16 md:grid-cols-2 lg:grid-cols-4">
          {hiringStages.map((s, i) => (
            <li
              key={s.title}
              className={`border-b border-rule py-8 lg:border-b-0 lg:px-7 lg:first:pl-0 lg:last:pr-0 ${
                i > 0 ? "lg:border-l" : ""
              } ${i % 2 === 1 ? "md:border-l md:pl-7" : "md:pr-7"}`}
            >
              <span className="eyebrow text-moss">Stage {i + 1}</span>
              <h3 className="h3 mt-4">{s.title}</h3>
              <p className="body mt-3 text-stone">{s.body}</p>
              <p className="mt-5 text-sm font-medium">{s.pass}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-paper-deep">
        <div className="wrap section">
          <SectionHeading
            eyebrow="What we offer"
            title="What you get in return."
            lead="A high bar only makes sense if what is on the other side is worth it."
          />
          <ul className="mt-12 grid gap-x-10 gap-y-10 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
            {offers.map((o) => (
              <li key={o.title} className="border-t border-rule pt-6">
                <Icon name={o.icon} size={28} className="text-moss" />
                <h3 className="mt-5 text-lg font-medium tracking-tight">{o.title}</h3>
                <p className="body mt-2 text-stone">{o.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="open-roles" className="wrap section">
        <SectionHeading
          eyebrow="Open roles"
          title={`${jobs.length} positions open now.`}
          lead="Each role is tied to a signed project. We close a posting as soon as it is filled."
        />
        <ul className="mt-12 border-t border-rule md:mt-16">
          {jobs.map((j) => (
            <li key={j.slug} className="border-b border-rule">
              <Link
                href={`/careers/${j.slug}`}
                className="group grid gap-3 py-7 md:grid-cols-[1.6fr_1fr_1fr_auto] md:items-center md:gap-8"
              >
                <div>
                  <h3 className="h3">{j.title}</h3>
                  <p className="mt-1.5 text-sm text-stone md:hidden">
                    {j.department} · {j.experience}
                  </p>
                </div>
                <p className="flex items-start gap-2 text-[0.9375rem] text-stone">
                  <Icon name="pin" size={18} className="mt-0.5 shrink-0" />
                  {j.location}
                </p>
                <p className="hidden text-[0.9375rem] text-stone md:block">
                  {j.department}
                  <span className="block">{j.experience}</span>
                </p>
                <span className="inline-flex items-center gap-2 text-[0.9375rem] font-medium">
                  <span className="link">View role</span>
                  <ArrowRight size={16} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="on-ink bg-ink text-paper">
        <div className="wrap section grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-20">
          <div>
            <Eyebrow tone="dark">Open application</Eyebrow>
            <h2 className="h1 mt-6 max-w-3xl">No role that fits? Write to us anyway.</h2>
            <p className="lead mt-6 max-w-xl text-fog">
              We keep a short list of people we want to work with and contact them first when a project is signed. Send
              your résumé and two lines on the work you want to do.
            </p>
          </div>
          <div className="lg:pb-2">
            <a href={`mailto:${site.careersEmail}?subject=Open%20application`} className="btn btn-lime w-full sm:w-auto">
              <Icon name="mail" size={18} />
              <span className="truncate">{site.careersEmail}</span>
            </a>
            <p className="mt-4 text-sm text-fog">An engineer reads every message. We reply within five business days.</p>
          </div>
        </div>
      </section>
    </>
  );
}
