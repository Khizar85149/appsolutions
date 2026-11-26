/**
 * Translation between database rows (snake_case columns) and the models the
 * pages use (src/lib/types.ts). This file has no runtime imports, so the seed
 * script in scripts/ can load it directly with Node.
 */
import type {
  CaseStudy,
  ConsultationType,
  CoverTone,
  Faq,
  IconKey,
  Industry,
  Job,
  Metric,
  Service,
  TitledText,
} from "@/lib/types";

interface BaseRow {
  slug: string;
  position: number;
  published: boolean;
  updated_at?: string;
}

export interface ServiceRow extends BaseRow {
  icon: string;
  name: string;
  tagline: string;
  summary: string;
  hero_title: string;
  hero_lead: string;
  outcomes: Metric[];
  signals: string[];
  deliverables: TitledText[];
  process: TitledText[];
  stack: string[];
  engagement: Service["engagement"];
  faqs: Faq[];
  industries: string[];
  case_studies: string[];
  seo_title: string;
  seo_description: string;
}

export interface IndustryRow extends BaseRow {
  icon: string;
  name: string;
  tagline: string;
  summary: string;
  hero_title: string;
  hero_lead: string;
  stats: Metric[];
  challenges: TitledText[];
  solutions: TitledText[];
  compliance: string[];
  services: string[];
  case_studies: string[];
  faqs: Faq[];
  seo_title: string;
  seo_description: string;
}

export interface CaseStudyRow extends BaseRow {
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
  tone: string;
  hero_metric: Metric;
  metrics: Metric[];
  challenge: string[];
  approach: TitledText[];
  solution: string[];
  results: string[];
  stack: string[];
  quote: { text: string; role: string } | null;
  seo_title: string;
  seo_description: string;
}

export interface JobRow extends BaseRow {
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
  nice_to_have: string[];
}

export interface ConsultationTypeRow extends BaseRow {
  icon: string;
  name: string;
  duration: number;
  summary: string;
  description: string;
  agenda: string[];
  host_name: string;
  host_role: string;
  seo_title: string;
  seo_description: string;
}

/** Arrays and objects can come back null if a row was created by hand with empty cells. */
const list = <T>(value: T[] | null | undefined): T[] => (Array.isArray(value) ? value : []);

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export function serviceFromRow(r: ServiceRow): Service {
  return {
    slug: r.slug,
    icon: r.icon as IconKey,
    name: r.name,
    tagline: r.tagline,
    summary: r.summary,
    heroTitle: r.hero_title,
    heroLead: r.hero_lead,
    outcomes: list(r.outcomes),
    signals: list(r.signals),
    deliverables: list(r.deliverables),
    process: list(r.process),
    stack: list(r.stack),
    engagement: {
      timeline: r.engagement?.timeline ?? "",
      team: r.engagement?.team ?? "",
      model: r.engagement?.model ?? "",
    },
    faqs: list(r.faqs),
    industries: list(r.industries),
    caseStudies: list(r.case_studies),
    seo: { title: r.seo_title, description: r.seo_description },
    ...(r.updated_at ? { updatedAt: r.updated_at } : {}),
  };
}

export function serviceToRow(s: Service, position: number): ServiceRow {
  return {
    slug: s.slug,
    position,
    published: true,
    icon: s.icon,
    name: s.name,
    tagline: s.tagline,
    summary: s.summary,
    hero_title: s.heroTitle,
    hero_lead: s.heroLead,
    outcomes: s.outcomes,
    signals: s.signals,
    deliverables: s.deliverables,
    process: s.process,
    stack: s.stack,
    engagement: s.engagement,
    faqs: s.faqs,
    industries: s.industries,
    case_studies: s.caseStudies,
    seo_title: s.seo.title,
    seo_description: s.seo.description,
  };
}

/* ------------------------------------------------------------------ */
/* Industries                                                          */
/* ------------------------------------------------------------------ */

export function industryFromRow(r: IndustryRow): Industry {
  return {
    slug: r.slug,
    icon: r.icon as IconKey,
    name: r.name,
    tagline: r.tagline,
    summary: r.summary,
    heroTitle: r.hero_title,
    heroLead: r.hero_lead,
    stats: list(r.stats),
    challenges: list(r.challenges),
    solutions: list(r.solutions),
    compliance: list(r.compliance),
    services: list(r.services),
    caseStudies: list(r.case_studies),
    faqs: list(r.faqs),
    seo: { title: r.seo_title, description: r.seo_description },
    ...(r.updated_at ? { updatedAt: r.updated_at } : {}),
  };
}

export function industryToRow(i: Industry, position: number): IndustryRow {
  return {
    slug: i.slug,
    position,
    published: true,
    icon: i.icon,
    name: i.name,
    tagline: i.tagline,
    summary: i.summary,
    hero_title: i.heroTitle,
    hero_lead: i.heroLead,
    stats: i.stats,
    challenges: i.challenges,
    solutions: i.solutions,
    compliance: i.compliance,
    services: i.services,
    case_studies: i.caseStudies,
    faqs: i.faqs,
    seo_title: i.seo.title,
    seo_description: i.seo.description,
  };
}

/* ------------------------------------------------------------------ */
/* Case studies                                                        */
/* ------------------------------------------------------------------ */

export function caseStudyFromRow(r: CaseStudyRow): CaseStudy {
  return {
    slug: r.slug,
    client: r.client,
    title: r.title,
    summary: r.summary,
    industry: r.industry,
    services: list(r.services),
    location: r.location,
    year: r.year,
    duration: r.duration,
    team: r.team,
    featured: Boolean(r.featured),
    tone: r.tone as CoverTone,
    heroMetric: { value: r.hero_metric?.value ?? "", label: r.hero_metric?.label ?? "" },
    metrics: list(r.metrics),
    challenge: list(r.challenge),
    approach: list(r.approach),
    solution: list(r.solution),
    results: list(r.results),
    stack: list(r.stack),
    ...(r.quote?.text ? { quote: { text: r.quote.text, role: r.quote.role } } : {}),
    seo: { title: r.seo_title, description: r.seo_description },
    ...(r.updated_at ? { updatedAt: r.updated_at } : {}),
  };
}

export function caseStudyToRow(c: CaseStudy, position: number): CaseStudyRow {
  return {
    slug: c.slug,
    position,
    published: true,
    client: c.client,
    title: c.title,
    summary: c.summary,
    industry: c.industry,
    services: c.services,
    location: c.location,
    year: c.year,
    duration: c.duration,
    team: c.team,
    featured: c.featured,
    tone: c.tone,
    hero_metric: c.heroMetric,
    metrics: c.metrics,
    challenge: c.challenge,
    approach: c.approach,
    solution: c.solution,
    results: c.results,
    stack: c.stack,
    quote: c.quote ?? null,
    seo_title: c.seo.title,
    seo_description: c.seo.description,
  };
}

/* ------------------------------------------------------------------ */
/* Jobs                                                                */
/* ------------------------------------------------------------------ */

export function jobFromRow(r: JobRow): Job {
  return {
    slug: r.slug,
    title: r.title,
    department: r.department,
    location: r.location,
    type: r.type,
    experience: r.experience,
    posted: String(r.posted).slice(0, 10),
    summary: r.summary,
    about: list(r.about),
    responsibilities: list(r.responsibilities),
    requirements: list(r.requirements),
    niceToHave: list(r.nice_to_have),
  };
}

export function jobToRow(j: Job, position: number): JobRow {
  return {
    slug: j.slug,
    position,
    published: true,
    title: j.title,
    department: j.department,
    location: j.location,
    type: j.type,
    experience: j.experience,
    posted: j.posted,
    summary: j.summary,
    about: j.about,
    responsibilities: j.responsibilities,
    requirements: j.requirements,
    nice_to_have: j.niceToHave,
  };
}

/* ------------------------------------------------------------------ */
/* Consultation types                                                  */
/* ------------------------------------------------------------------ */

export function consultationFromRow(r: ConsultationTypeRow): ConsultationType {
  return {
    slug: r.slug,
    icon: r.icon as IconKey,
    name: r.name,
    duration: Number(r.duration),
    summary: r.summary,
    description: r.description,
    agenda: list(r.agenda),
    host: { name: r.host_name, role: r.host_role },
    seo: { title: r.seo_title, description: r.seo_description },
  };
}

export function consultationToRow(c: ConsultationType, position: number): ConsultationTypeRow {
  return {
    slug: c.slug,
    position,
    published: true,
    icon: c.icon,
    name: c.name,
    duration: c.duration,
    summary: c.summary,
    description: c.description,
    agenda: c.agenda,
    host_name: c.host.name,
    host_role: c.host.role,
    seo_title: c.seo.title,
    seo_description: c.seo.description,
  };
}
