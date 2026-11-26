"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Fades its direct children up, one after another, the first time the group
 * scrolls into view. The styles live in globals.css under `.reveal-group`.
 */
export function RevealGroup({
  as: Tag = "div",
  className = "",
  children,
}: {
  as?: "div" | "ul" | "ol" | "dl";
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    // @ts-expect-error the ref type is shared across the allowed list tags
    <Tag ref={ref} data-in={shown} className={`reveal-group ${className}`}>
      {children}
    </Tag>
  );
}

/**
 * Counts a figure such as "120+", "Top 3%" or "99.2%" up from zero when it
 * scrolls into view. The server renders the final value, so search engines
 * and visitors without JavaScript always see the real number.
 */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
    if (!el || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const [, prefix, digits, suffix] = match;
    const target = Number(digits);
    const decimals = digits.includes(".") ? digits.split(".")[1].length : 0;
    const duration = 1400;
    let frame = 0;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 4);
          el.textContent = `${prefix}${(target * eased).toFixed(decimals)}${suffix}`;
          if (t < 1) frame = requestAnimationFrame(tick);
          else el.textContent = value;
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = value;
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
