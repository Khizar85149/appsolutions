import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { jobs as localJobs } from "@/content/careers";
import { caseStudies as localCaseStudies } from "@/content/case-studies";
import { consultations as localConsultations } from "@/content/consultations";
import { industries as localIndustries } from "@/content/industries";
import { services as localServices } from "@/content/services";
import type { NavItem } from "@/lib/site";
import type { CaseStudy, ConsultationType, Industry, Job, Service } from "@/lib/types";
import {
  caseStudyFromRow,
  consultationFromRow,
  industryFromRow,
  jobFromRow,
  serviceFromRow,
  type CaseStudyRow,
  type ConsultationTypeRow,
  type IndustryRow,
  type JobRow,
  type ServiceRow,
} from "./mappers";
import { getSupabase } from "./supabase";

/**
 * Content queries. Every page reads its data through these functions.
 *
 * Caching: each list is cached and tagged with its table name. Pages built
 * from it are served as static HTML. The cache refreshes on its own within
 * the hour, and immediately when Supabase calls POST /api/revalidate after
 * an edit (see supabase/README.md).
 *
 * Fallback: until the Supabase keys are set, or if the database cannot be
 * reached, the content bundled in src/content is served instead, so the
 * site never goes blank.
 */

/** Cache tags. One per content table, named after the table. */
export const CONTENT_TABLES = ["services", "industries", "case_studies", "jobs", "consultation_types"] as const;
export type ContentTable = (typeof CONTENT_TABLES)[number];

async function loadPublished<Row, Model>(
  table: ContentTable,
  fromRow: (row: Row) => Model,
  fallback: Model[],
): Promise<Model[]> {
  const db = getSupabase();
  if (!db) return fallback;
  const { data, error } = await db
    .from(table)
    .select("*")
    .eq("published", true)
    .order("position", { ascending: true })
    .order("slug", { ascending: true });
  if (error) {
    console.error(`[content] could not load "${table}" from Supabase, serving bundled content: ${error.message}`);
    return fallback;
  }
  return (data as Row[]).map(fromRow);
}

export async function getServices(): Promise<Service[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("services");
  return loadPublished<ServiceRow, Service>("services", serviceFromRow, localServices);
}

export async function getIndustries(): Promise<Industry[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("industries");
  return loadPublished<IndustryRow, Industry>("industries", industryFromRow, localIndustries);
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("case_studies");
  return loadPublished<CaseStudyRow, CaseStudy>("case_studies", caseStudyFromRow, localCaseStudies);
}

export async function getJobs(): Promise<Job[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("jobs");
  return loadPublished<JobRow, Job>("jobs", jobFromRow, localJobs);
}

export async function getConsultations(): Promise<ConsultationType[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("consultation_types");
  return loadPublished<ConsultationTypeRow, ConsultationType>(
    "consultation_types",
    consultationFromRow,
    localConsultations,
  );
}

/* Single records. The tables are small, so one cached list serves every lookup. */

export async function getService(slug: string): Promise<Service | undefined> {
  return (await getServices()).find((s) => s.slug === slug);
}

export async function getIndustry(slug: string): Promise<Industry | undefined> {
  return (await getIndustries()).find((i) => i.slug === slug);
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | undefined> {
  return (await getCaseStudies()).find((c) => c.slug === slug);
}

export async function getJob(slug: string): Promise<Job | undefined> {
  return (await getJobs()).find((j) => j.slug === slug);
}

export async function getConsultation(slug: string): Promise<ConsultationType | undefined> {
  return (await getConsultations()).find((c) => c.slug === slug);
}

/**
 * Params for generateStaticParams. Next.js needs at least one entry, so an
 * empty table (for example, no open roles) yields a placeholder slug that
 * the page answers with a 404.
 */
export function staticSlugs(items: { slug: string }[]): { slug: string }[] {
  return items.length > 0 ? items.map((i) => ({ slug: i.slug })) : [{ slug: "__none__" }];
}

/* Short lists for the menu, the footer and cross links. */

const toNav = (item: Service | Industry): NavItem => ({
  slug: item.slug,
  name: item.name,
  blurb: item.tagline,
  icon: item.icon,
});

export async function getServiceNav(): Promise<NavItem[]> {
  return (await getServices()).map(toNav);
}

export async function getIndustryNav(): Promise<NavItem[]> {
  return (await getIndustries()).map(toNav);
}
