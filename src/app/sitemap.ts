import type { MetadataRoute } from "next";
import { jobs } from "@/content/careers";
import { caseStudies } from "@/content/case-studies";
import { industryNav, serviceNav, site } from "@/lib/site";

type Entry = MetadataRoute.Sitemap[number];

/**
 * Served at /sitemap.xml. Every indexable URL on the site is listed here,
 * built from the same content files as the pages, so a new service, industry,
 * case study or job appears automatically.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified: string = site.lastUpdated;
  const entry = (
    path: string,
    priority: number,
    changeFrequency: Entry["changeFrequency"],
    modified: string = lastModified,
  ): Entry => ({
    url: `${site.url}${path}`,
    lastModified: modified,
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
    ...serviceNav.map((s) => entry(`/services/${s.slug}`, 0.8, "monthly")),
    ...industryNav.map((s) => entry(`/industries/${s.slug}`, 0.8, "monthly")),
    ...caseStudies.map((s) => entry(`/case-studies/${s.slug}`, 0.7, "monthly")),
    ...jobs.map((j) => entry(`/careers/${j.slug}`, 0.5, "weekly", j.posted)),
    entry("/privacy", 0.2, "yearly"),
    entry("/terms", 0.2, "yearly"),
  ];
}
