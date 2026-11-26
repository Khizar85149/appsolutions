export type IconKey =
  | "stack"
  | "browser"
  | "erp"
  | "chat"
  | "automation"
  | "mobile"
  | "pos"
  | "management"
  | "healthcare"
  | "restaurant"
  | "retail"
  | "finance"
  | "logistics"
  | "realestate"
  | "education"
  | "manufacturing"
  | "shield"
  | "users"
  | "code"
  | "handshake"
  | "clock"
  | "globe"
  | "video"
  | "calendar"
  | "pin"
  | "mail"
  | "phone"
  | "chart"
  | "search"
  | "rocket"
  | "wrench"
  | "lock"
  | "document";

export interface Metric {
  value: string;
  label: string;
}

export interface TitledText {
  title: string;
  body: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Seo {
  title: string;
  description: string;
}

export interface Service {
  slug: string;
  icon: IconKey;
  name: string;
  /** One line shown under the name on cards and in the menu. */
  tagline: string;
  /** Two sentences for index cards. */
  summary: string;
  heroTitle: string;
  heroLead: string;
  /** Three headline numbers for the detail page. */
  outcomes: Metric[];
  /** "You probably need this if" list. */
  signals: string[];
  /** What the client receives. */
  deliverables: TitledText[];
  process: TitledText[];
  stack: string[];
  engagement: { timeline: string; team: string; model: string };
  faqs: Faq[];
  industries: string[];
  caseStudies: string[];
  seo: Seo;
}

export interface Industry {
  slug: string;
  icon: IconKey;
  name: string;
  tagline: string;
  summary: string;
  heroTitle: string;
  heroLead: string;
  stats: Metric[];
  challenges: TitledText[];
  solutions: TitledText[];
  /** Standards and regulations we build to. */
  compliance: string[];
  services: string[];
  caseStudies: string[];
  faqs: Faq[];
  seo: Seo;
}

export type CoverTone = "ink" | "lime" | "sand" | "sage";

export interface CaseStudy {
  slug: string;
  /** Anonymised client description, e.g. "Restaurant group, 14 locations". */
  client: string;
  title: string;
  summary: string;
  industry: string;
  services: string[];
  location: string;
  year: string;
  duration: string;
  team: string;
  featured: boolean;
  tone: CoverTone;
  heroMetric: Metric;
  metrics: Metric[];
  challenge: string[];
  approach: TitledText[];
  solution: string[];
  results: string[];
  stack: string[];
  quote?: { text: string; role: string };
  seo: Seo;
}

export interface Job {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  posted: string;
  summary: string;
  about: string[];
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
}

export interface ConsultationType {
  slug: string;
  icon: IconKey;
  name: string;
  /** Minutes. */
  duration: number;
  summary: string;
  description: string;
  agenda: string[];
  host: { name: string; role: string };
  seo: Seo;
}
