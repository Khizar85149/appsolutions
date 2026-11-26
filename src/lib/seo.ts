import type { Metadata } from "next";
import { site } from "./site";

const TITLE_LIMIT = 60;
const DESCRIPTION_LIMIT = 160;

/** Keeps whole sentences up to the length search engines display. */
export function clipDescription(text: string): string {
  if (text.length <= DESCRIPTION_LIMIT) return text;
  const sentences = text.match(/[^.?]+[.?]+/g) ?? [];
  let out = "";
  for (const sentence of sentences) {
    if ((out + sentence).trim().length > DESCRIPTION_LIMIT) break;
    out += sentence;
  }
  if (out.trim().length >= 70) return out.trim();
  const cut = text.slice(0, DESCRIPTION_LIMIT - 3);
  return `${cut.slice(0, cut.lastIndexOf(" "))}...`;
}

/**
 * Builds the complete metadata for one page: title, description, canonical
 * URL, Open Graph and Twitter tags including the share image. Every page
 * uses this so nothing is missed when a page is added.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  /** Path beginning with a slash, for example "/services/erp-development". */
  path: string;
  type?: "website" | "article";
}): Metadata {
  const withBrand = `${title} | ${site.name}`;
  // Drop the brand suffix when it would push the title past what Google shows.
  const fullTitle = withBrand.length <= TITLE_LIMIT ? withBrand : title;
  const summary = clipDescription(description);
  const image = { url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name}: ${title}` };

  return {
    title: { absolute: fullTitle },
    description: summary,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: site.name,
      locale: "en_CA",
      url: path,
      title: fullTitle,
      description: summary,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: summary,
      images: [image.url],
    },
  };
}
