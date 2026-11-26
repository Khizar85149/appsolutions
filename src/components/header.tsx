"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, CaretDown, List, X } from "@phosphor-icons/react/dist/ssr";
import { CONSULTATION_HREF, industryNav, mainNav, serviceNav } from "@/lib/site";
import { Icon } from "./icon";
import { Logo } from "./logo";

type Menu = "services" | "industries" | null;

const menus = {
  services: { base: "/services", items: serviceNav, all: "All services" },
  industries: { base: "/industries", items: industryNav, all: "All industries" },
} as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState<Menu>(null);
  const [mobile, setMobile] = useState(false);
  const [mobileSection, setMobileSection] = useState<Menu>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close everything when the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(null);
    setMobile(false);
  }

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobile]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const hoverOpen = (m: Menu) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(m);
  };
  const hoverClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 140);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="on-ink sticky top-0 z-50 border-b border-ink-line bg-ink text-paper">
      <div className="wrap flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const key = item.href === "/services" ? "services" : item.href === "/industries" ? "industries" : null;
              const active = isActive(item.href);
              const cls = `flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.9375rem] transition-colors hover:text-paper ${
                active ? "text-paper" : "text-fog"
              }`;
              if (!key) {
                return (
                  <li key={item.href}>
                    <Link href={item.href} className={cls} aria-current={active ? "page" : undefined}>
                      {item.label}
                    </Link>
                  </li>
                );
              }
              return (
                <li key={item.href} onMouseEnter={() => hoverOpen(key)} onMouseLeave={hoverClose}>
                  <button
                    type="button"
                    className={cls}
                    aria-expanded={open === key}
                    aria-controls={`menu-${key}`}
                    onClick={() => setOpen(open === key ? null : key)}
                  >
                    {item.label}
                    <CaretDown
                      size={12}
                      weight="bold"
                      aria-hidden="true"
                      className={`transition-transform duration-150 ${open === key ? "rotate-180" : ""}`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href={CONSULTATION_HREF} className="btn btn-lime btn-sm">
            <span className="sm:hidden">Book a call</span>
            <span className="hidden sm:inline">Book a free consultation</span>
          </Link>
          <button
            type="button"
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
            aria-label={mobile ? "Close menu" : "Open menu"}
            aria-expanded={mobile}
            aria-controls="mobile-menu"
            onClick={() => setMobile(!mobile)}
          >
            {mobile ? <X size={24} aria-hidden="true" /> : <List size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Desktop mega menu */}
      {open && (
        <div
          id={`menu-${open}`}
          className="absolute inset-x-0 top-full hidden border-b border-ink-line bg-ink lg:block"
          onMouseEnter={() => hoverOpen(open)}
          onMouseLeave={hoverClose}
        >
          <div className="wrap grid grid-cols-[1fr_3fr] gap-12 py-10">
            <div>
              <p className="eyebrow text-fog">{open === "services" ? "What we build" : "Who we build for"}</p>
              <p className="mt-4 max-w-[15rem] text-xl font-medium leading-snug tracking-tight">
                {open === "services"
                  ? "Eight practices. One accountable team."
                  : "Software shaped by how your sector works."}
              </p>
              <Link
                href={menus[open].base}
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-lime"
              >
                {menus[open].all}
                <ArrowRight size={14} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <ul className="grid grid-cols-2 gap-x-12 border-t border-ink-line">
              {menus[open].items.map((s) => (
                <li key={s.slug} className="border-b border-ink-line">
                  <Link href={`${menus[open].base}/${s.slug}`} className="group flex items-center gap-4 py-4">
                    <Icon name={s.icon} size={24} className="shrink-0 text-fog transition-colors duration-300 group-hover:text-lime" />
                    <span className="min-w-0 flex-1 transition-transform duration-300 ease-out group-hover:translate-x-1">
                      <span className="block text-[0.9375rem] font-medium">{s.name}</span>
                      <span className="mt-0.5 block text-sm leading-snug text-fog">{s.blurb}</span>
                    </span>
                    <ArrowRight
                      size={18}
                      aria-hidden="true"
                      className="shrink-0 -translate-x-3 text-lime opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobile && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto overscroll-contain bg-ink md:top-[4.5rem] lg:hidden"
        >
          <nav aria-label="Mobile" className="wrap flex min-h-full flex-col pb-8 pt-2">
            <ul>
              {mainNav.map((item) => {
                const key = item.href === "/services" ? "services" : item.href === "/industries" ? "industries" : null;
                if (!key) {
                  return (
                    <li key={item.href} className="border-b border-ink-line">
                      <Link href={item.href} className="block py-5 text-2xl font-medium tracking-tight">
                        {item.label}
                      </Link>
                    </li>
                  );
                }
                const expanded = mobileSection === key;
                return (
                  <li key={item.href} className="border-b border-ink-line">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between py-5 text-left text-2xl font-medium tracking-tight"
                      aria-expanded={expanded}
                      onClick={() => setMobileSection(expanded ? null : key)}
                    >
                      {item.label}
                      <CaretDown
                        size={18}
                        aria-hidden="true"
                        className={`text-fog transition-transform duration-150 ${expanded ? "rotate-180" : ""}`}
                      />
                    </button>
                    {expanded && (
                      <ul className="pb-4">
                        {menus[key].items.map((s) => (
                          <li key={s.slug}>
                            <Link href={`${menus[key].base}/${s.slug}`} className="flex items-center gap-3 py-2.5 text-fog">
                              <Icon name={s.icon} size={20} className="shrink-0 text-lime" />
                              {s.name}
                            </Link>
                          </li>
                        ))}
                        <li>
                          <Link href={menus[key].base} className="mt-1 inline-flex items-center gap-2 py-2.5 font-medium text-lime">
                            {menus[key].all}
                            <ArrowRight size={14} weight="bold" aria-hidden="true" />
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="mt-auto pt-8">
              <Link href={CONSULTATION_HREF} className="btn btn-lime w-full">
                Book a free consultation
                <ArrowRight size={16} weight="bold" aria-hidden="true" />
              </Link>
              <p className="mt-4 text-center text-sm text-fog">30 minutes with a senior engineer. No obligation.</p>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
