import Link from "next/link";
import { site } from "@/lib/site";

/**
 * The mark: a capital A drawn as a single peak, with a square block set
 * into its base in place of the crossbar. The same artwork is used for the
 * browser tab icon (src/app/icon.svg) and the social share image.
 */
export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect width="28" height="28" rx="7" fill="#c5f569" />
      <path d="M7.25 20.5 14 7.25l6.75 13.25" stroke="#151613" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" />
      <rect x="12" y="16.5" width="4" height="4" fill="#151613" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label={`${site.name} home`} className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      {/* "Tech" is dropped on very narrow phones so the wordmark never wraps beside the header button. */}
      <span className="whitespace-nowrap text-base font-medium tracking-tight sm:text-[1.0625rem]">
        Apps Solutions<span className="hidden text-fog min-[420px]:inline"> Tech</span>
      </span>
    </Link>
  );
}
