import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { industryNav } from "@/lib/site";
import type { CaseStudy, CoverTone } from "@/lib/types";

export const coverTone: Record<CoverTone, { panel: string; sub: string }> = {
  ink: { panel: "bg-ink text-paper", sub: "text-fog" },
  lime: { panel: "bg-lime text-ink", sub: "text-ink/70" },
  sand: { panel: "bg-[#e4dccb] text-ink", sub: "text-ink/65" },
  sage: { panel: "bg-[#cfd8c4] text-ink", sub: "text-ink/65" },
};

export function CaseCard({ study }: { study: CaseStudy }) {
  const tone = coverTone[study.tone];
  const industry = industryNav.find((i) => i.slug === study.industry)?.name ?? study.industry;

  return (
    <article className="h-full">
      <Link href={`/case-studies/${study.slug}`} className="group flex h-full flex-col">
        <div className={`flex aspect-[4/3] flex-col justify-between rounded-xl p-6 sm:p-7 ${tone.panel}`}>
          <p className={`eyebrow ${tone.sub}`}>{industry}</p>
          <div>
            <p className="figure">{study.heroMetric.value}</p>
            <p className={`mt-3 max-w-[18rem] text-[0.9375rem] leading-snug ${tone.sub}`}>{study.heroMetric.label}</p>
          </div>
        </div>
        <div className="flex flex-1 flex-col pt-5">
          <p className="text-sm text-stone">{study.client}</p>
          <h3 className="h3 mt-2">{study.title}</h3>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[0.9375rem] font-medium">
            <span className="link">Read the case study</span>
            <ArrowUpRight
              size={16}
              weight="bold"
              aria-hidden="true"
              className="transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
