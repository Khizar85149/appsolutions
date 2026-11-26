import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { SiteChrome } from "@/components/site-chrome";
import { Button, Eyebrow } from "@/components/ui";
import { CONSULTATION_HREF } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

const links = [
  { href: "/services", label: "Services", note: "What we build" },
  { href: "/case-studies", label: "Case Studies", note: "Results from past projects" },
  { href: "/industries", label: "Industries", note: "Sectors we know well" },
  { href: "/contact", label: "Contact", note: "Send a project brief" },
];

export default function NotFound() {
  return (
    <SiteChrome>
      <section className="on-ink bg-ink text-paper">
        <div className="wrap grid gap-14 py-20 md:py-28 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-20">
          <div>
            <Eyebrow tone="dark">Error 404</Eyebrow>
            <h1 className="display mt-6">This page does not exist.</h1>
            <p className="lead mt-6 max-w-xl text-fog">
              The link may be old or the address mistyped. The rest of the site is in working order.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/" variant="lime" arrow>
                Back to home
              </Button>
              <Button href={CONSULTATION_HREF} variant="outline-light">
                Book a free consultation
              </Button>
            </div>
          </div>
          <nav aria-label="Suggested pages">
            <ul className="border-t border-ink-line">
              {links.map((l) => (
                <li key={l.href} className="border-b border-ink-line">
                  <Link href={l.href} className="group flex items-center justify-between gap-4 py-5">
                    <span>
                      <span className="block text-lg font-medium tracking-tight">{l.label}</span>
                      <span className="mt-0.5 block text-sm text-fog">{l.note}</span>
                    </span>
                    <ArrowUpRight
                      size={20}
                      aria-hidden="true"
                      className="shrink-0 text-fog transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lime"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </SiteChrome>
  );
}
