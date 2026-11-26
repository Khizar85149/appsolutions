import Link from "next/link";
import { ArrowRight, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { CONSULTATION_HREF, industryNav, serviceNav, site } from "@/lib/site";
import { Logo } from "./logo";

const company = [
  { href: "/about", label: "About" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
  { href: CONSULTATION_HREF, label: "Free Consultation" },
];

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="eyebrow text-fog">{title}</h2>
      <ul className="mt-5 space-y-3 text-[0.9375rem]">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-paper/85 transition-colors hover:text-lime">
        {children}
      </Link>
    </li>
  );
}

export function Footer() {
  return (
    <footer className="on-ink border-t border-ink-line bg-ink text-paper">
      <div className="wrap py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2.7fr] lg:gap-16">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-[0.9375rem] leading-relaxed text-fog">{site.tagline}</p>
            <Link
              href={CONSULTATION_HREF}
              className="group mt-7 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-lime"
            >
              Book a free consultation
              <ArrowRight size={15} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
            <Column title="Services">
              {serviceNav.map((s) => (
                <FooterLink key={s.slug} href={`/services/${s.slug}`}>
                  {s.name}
                </FooterLink>
              ))}
            </Column>
            <Column title="Industries">
              {industryNav.map((s) => (
                <FooterLink key={s.slug} href={`/industries/${s.slug}`}>
                  {s.name}
                </FooterLink>
              ))}
            </Column>
            <Column title="Company">
              {company.map((c) => (
                <FooterLink key={c.href} href={c.href}>
                  {c.label}
                </FooterLink>
              ))}
            </Column>
            <div>
              <h2 className="eyebrow text-fog">Office</h2>
              <ul className="mt-5 space-y-6 text-[0.9375rem]">
                {site.offices.map((o) => (
                  <li key={o.country}>
                    <p className="font-medium">{o.country}</p>
                    <p className="mt-1 text-fog">{o.city}</p>
                    <p className="text-fog">{o.hours}</p>
                  </li>
                ))}
                <li>
                  <a href={`mailto:${site.email}`} className="link break-all">
                    {site.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-ink-line pt-7 text-sm text-fog md:flex-row md:items-center md:justify-between">
          <p>
            © {site.copyrightYear} {site.legalName} All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-paper">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-paper">
              Terms
            </Link>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${site.name} on LinkedIn`}
              className="hover:text-paper"
            >
              <LinkedinLogo size={22} weight="light" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
