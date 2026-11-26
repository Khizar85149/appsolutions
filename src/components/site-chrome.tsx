import type { ReactNode } from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/ui";
import { site } from "@/lib/site";
import { getIndustryNav, getServiceNav } from "@/server/content";

/**
 * Everything that surrounds a public page: skip link, header, footer and the
 * site-wide structured data. The admin panel does not use it.
 */
export async function SiteChrome({ children }: { children: ReactNode }) {
  const [serviceNav, industryNav] = await Promise.all([getServiceNav(), getIndustryNav()]);
  return (
    <>
      <noscript>
        <style>{`.reveal-group > * { opacity: 1 !important; transform: none !important; }`}</style>
      </noscript>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-lime focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Header services={serviceNav} industries={industryNav} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${site.url}/#website`,
          name: site.name,
          url: site.url,
          inLanguage: "en-CA",
          publisher: { "@id": `${site.url}/#organization` },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": `${site.url}/#organization`,
          logo: `${site.url}/icon.svg`,
          name: site.name,
          legalName: site.legalName,
          url: site.url,
          email: site.email,
          description: site.description,
          address: site.offices.map((o) => ({
            "@type": "PostalAddress",
            addressLocality: o.city.split(",")[0],
            addressRegion: "ON",
            addressCountry: "CA",
          })),
          areaServed: ["CA", "US"],
          knowsAbout: serviceNav.map((s) => s.name),
          // Profiles and phone numbers are published only once they are real.
          ...(/linkedin\.com\/(company|in)\//.test(site.social.linkedin) ? { sameAs: [site.social.linkedin] } : {}),
        }}
      />
    </>
  );
}
