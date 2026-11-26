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

export interface NavItem {
  slug: string;
  name: string;
  blurb: string;
  icon: IconKey;
}

/** Canonical service slugs. Full content lives in src/content/services.ts. */
export const serviceNav: NavItem[] = [
  { slug: "full-stack-development", name: "Full Stack Development", blurb: "Web platforms built end to end by one accountable team.", icon: "stack" },
  { slug: "frontend-development", name: "Front End Development", blurb: "Fast, accessible interfaces in React and Next.js.", icon: "browser" },
  { slug: "erp-development", name: "ERP System Development", blurb: "One system for finance, inventory, HR and operations.", icon: "erp" },
  { slug: "ai-chatbots", name: "AI Chatbots", blurb: "Assistants that answer from your data and know when to hand over.", icon: "chat" },
  { slug: "ai-automation", name: "AI Automation", blurb: "Remove the manual work between your systems.", icon: "automation" },
  { slug: "mobile-app-development", name: "Mobile App Development", blurb: "Native and cross-platform apps for iOS and Android.", icon: "mobile" },
  { slug: "custom-pos-systems", name: "Custom POS Systems", blurb: "Point of sale that keeps selling when the internet drops.", icon: "pos" },
  { slug: "management-software", name: "Hospital and Restaurant Software", blurb: "Management systems shaped around how your floor runs.", icon: "management" },
];

/** Canonical industry slugs. Full content lives in src/content/industries.ts. */
export const industryNav: NavItem[] = [
  { slug: "healthcare", name: "Healthcare", blurb: "Hospital management, patient portals and clinical workflows.", icon: "healthcare" },
  { slug: "restaurants-hospitality", name: "Restaurants and Hospitality", blurb: "POS, kitchen display, ordering and multi-branch reporting.", icon: "restaurant" },
  { slug: "retail-ecommerce", name: "Retail and E-commerce", blurb: "Unified inventory, storefronts and in-store point of sale.", icon: "retail" },
  { slug: "fintech", name: "Financial Services", blurb: "Secure platforms, reconciliations and client onboarding.", icon: "finance" },
  { slug: "logistics", name: "Logistics and Supply Chain", blurb: "Dispatch, tracking and warehouse operations.", icon: "logistics" },
  { slug: "real-estate", name: "Real Estate", blurb: "Listings, CRM and property management portals.", icon: "realestate" },
  { slug: "education", name: "Education", blurb: "Learning platforms and school administration systems.", icon: "education" },
  { slug: "manufacturing", name: "Manufacturing", blurb: "Production planning, quality control and ERP.", icon: "manufacturing" },
];

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
