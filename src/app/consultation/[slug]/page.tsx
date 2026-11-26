import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Scheduler } from "@/components/booking/scheduler";
import { JsonLd } from "@/components/ui";
import { consultations, getConsultation } from "@/content/consultations";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return consultations.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const session = getConsultation(slug);
  if (!session) return {};
  return pageMetadata({ title: session.seo.title, description: session.seo.description, path: `/consultation/${session.slug}`, type: "website" });
}

export default async function ConsultationBookingPage({ params }: Props) {
  const { slug } = await params;
  const session = getConsultation(slug);
  if (!session) notFound();

  return (
    <section className="bg-paper">
      <div className="wrap py-8 md:py-14">
        <h1 className="sr-only">
          Book a free {session.name} with {site.name}
        </h1>
        <Suspense fallback={<div className="mx-auto h-[36rem] max-w-[1060px] rounded-xl border border-rule bg-card" aria-busy="true" />}>
          <Scheduler session={session} />
        </Suspense>
        <p className="mx-auto mt-6 max-w-[1060px] text-center text-sm text-stone">
          Free of charge. No obligation. Ask for an NDA before the call and we will send one the same day.
        </p>
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: session.name,
          description: session.seo.description,
          provider: { "@type": "Organization", name: site.name, url: site.url },
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          url: `${site.url}/consultation/${session.slug}`,
        }}
      />
    </section>
  );
}
