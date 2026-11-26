import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getCaseStudies, getIndustries, getJobs, getServices } from "@/server/content";

type Entry = MetadataRoute.Sitemap[number];

/**
 * Served at /sitemap.xml. Every indexable URL on the site is listed here,
 * built from the same database content as the pages, so a new service, industry,
 * case study or job appears automatically.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, industries, caseStudies, jobs] = await Promise.all([
    getServices(),
    getIndustries(),
    getCaseStudies(),
    getJobs(),
  ]);
  const lastModified: string = site.lastUpdated;
  const entry = (
    path: string,
    priority: number,
    changeFrequency: Entry["changeFrequency"],
    modified: string | undefined = lastModified,
  ): Entry => ({
    url: `${site.url}${path}`,
    lastModified: modified ?? lastModified,
    changeFrequency,
    priority,
  });

  return [
    entry("", 1, "weekly"),
    entry("/services", 0.9, "monthly"),
    entry("/industries", 0.9, "monthly"),
    entry("/case-studies", 0.9, "weekly"),
    entry("/consultation", 0.9, "monthly"),
    entry("/contact", 0.8, "monthly"),
    entry("/about", 0.7, "monthly"),
    entry("/careers", 0.7, "weekly"),
    ...services.map((s) => entry(`/services/${s.slug}`, 0.8, "monthly", s.updatedAt)),
    ...industries.map((s) => entry(`/industries/${s.slug}`, 0.8, "monthly", s.updatedAt)),
    ...caseStudies.map((s) => entry(`/case-studies/${s.slug}`, 0.7, "monthly", s.updatedAt)),
    ...jobs.map((j) => entry(`/careers/${j.slug}`, 0.5, "weekly", j.posted)),
    entry("/privacy", 0.2, "yearly"),
    entry("/terms", 0.2, "yearly"),
  ];
}
