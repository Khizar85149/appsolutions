"use client";

import { useState, type ReactNode } from "react";

export interface FilterOption {
  slug: string;
  name: string;
  count: number;
}

/**
 * Industry filter for the case study grid. Cards are rendered on the server
 * and passed in with their industry slug, so the page stays fully static and
 * every card is in the HTML for search engines.
 */
export function CaseFilter({
  options,
  items,
}: {
  options: FilterOption[];
  items: { slug: string; industry: string; card: ReactNode }[];
}) {
  const [active, setActive] = useState<string>("all");
  const total = items.length;
  const visible = active === "all" ? items : items.filter((i) => i.industry === active);

  const chip = (selected: boolean) =>
    `inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-full border px-4 text-sm font-medium transition-colors ${
      selected ? "border-ink bg-ink text-paper" : "border-rule text-ink hover:border-ink"
    }`;

  return (
    <div>
      <div
        role="group"
        aria-label="Filter case studies by industry"
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
      >
        <button type="button" className={chip(active === "all")} aria-pressed={active === "all"} onClick={() => setActive("all")}>
          All work
          <span className={active === "all" ? "text-fog" : "text-stone"}>{total}</span>
        </button>
        {options.map((o) => (
          <button
            key={o.slug}
            type="button"
            className={chip(active === o.slug)}
            aria-pressed={active === o.slug}
            onClick={() => setActive(o.slug)}
          >
            {o.name}
            <span className={active === o.slug ? "text-fog" : "text-stone"}>{o.count}</span>
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} of {total} case studies
      </p>

      <ul className="mt-10 grid gap-x-8 gap-y-14 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
        {items.map((i) => (
          <li key={i.slug} hidden={active !== "all" && i.industry !== active}>
            {i.card}
          </li>
        ))}
      </ul>
    </div>
  );
}
