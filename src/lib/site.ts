import type { IconKey } from "./types";

/**
 * Single source of truth for company details.
 * Everything marked REPLACE is placeholder data to confirm before launch.
 */
export const site = {
  name: "Apps Solutions Tech",
  legalName: "Apps Solutions Tech Inc.",
  /** Live domain. No trailing slash. Canonical URLs, the sitemap and social tags are all built from this. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://appssolutionstech.com").replace(/\/$/, ""),
  /** Date the content last changed, reported to search engines in the sitemap. Update when you publish edits. */
  lastUpdated: "2026-11-26",
  tagline: "Software engineering for companies that cannot afford a second attempt.",
  description:
    "Apps Solutions Tech is a Canadian custom software development company building ERP systems, AI chatbots and automation, mobile apps and POS software.",
  email: "hello@appssolutionstech.com", // REPLACE
  careersEmail: "careers@appssolutionstech.com", // REPLACE
  phoneCanada: "+1 (000) 000-0000", // REPLACE
  copyrightYear: 2026,
  offices: [
    {
      country: "Canada",
      city: "Toronto, Ontario", // REPLACE
      role: "Head office: client partnership, solution architecture and delivery",
      hours: "Mon to Fri, 9:00 to 18:00 ET",
    },
  ],
  social: {
    linkedin: "https://www.linkedin.com/", // REPLACE
  },
  /** Headline numbers. REPLACE with audited figures before launch. */
  stats: [
    { value: "Top 3%", label: "of engineering applicants are hired" },
    { value: "120+", label: "products and systems shipped" },
    { value: "94%", label: "of clients return for a second project" },
    { value: "48 hrs", label: "from first call to a written scope" },
  ],
  /** Shown in availability notices. Keep this truthful and current. */
  intake: {
    period: "Q1 2027",
    slotsTotal: 4,
    slotsOpen: 2,
  },
} as const;

/** A menu entry for a service or an industry. Built from the database in src/server/content.ts. */
export interface NavItem {
  slug: string;
  name: string;
  blurb: string;
  icon: IconKey;
}

export const mainNav = [
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
] as const;

export const CONSULTATION_HREF = "/consultation";

/** Lower-cases a title for use mid-sentence while keeping acronyms intact. */
export function inSentence(name: string): string {
  return name
    .split(" ")
    .map((w) => (/^(ERP|AI|POS|E-commerce)$/.test(w) ? w : w.toLowerCase()))
    .join(" ");
}
