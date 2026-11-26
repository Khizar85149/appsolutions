import Link from "next/link";
import { site } from "@/lib/site";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label={`${site.name} home`} className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <rect width="26" height="26" rx="6" fill="#c5f569" />
        <path d="M8 18V8l10 10V8" stroke="#151613" strokeWidth="2.2" strokeLinecap="square" />
      </svg>
      <span className="text-[1.0625rem] font-medium tracking-tight">
        Nexora <span className="text-fog">Digital</span>
      </span>
    </Link>
  );
}
