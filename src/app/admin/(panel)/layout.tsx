import Link from "next/link";
import { Suspense } from "react";
import {
  ArrowSquareOut,
  Briefcase,
  Buildings,
  CalendarBlank,
  EnvelopeSimple,
  Notebook,
  SignOut,
  SquaresFour,
  Stack,
  UsersThree,
  VideoCamera,
} from "@phosphor-icons/react/dist/ssr";
import { NavLink } from "@/components/admin/controls";
import { LogoMark } from "@/components/logo";
import { signOut } from "@/server/admin/actions";
import { getBadges } from "@/server/admin/data";
import { requireAdmin } from "@/server/admin/session";

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-1 lg:mt-6 lg:flex-col">
      <p className="hidden px-3 pb-1.5 text-xs text-fog/70 lg:block">{label}</p>
      {children}
    </div>
  );
}

/** Count shown beside an inbox link. Loaded after the frame, so it never delays a page. */
async function Count({ of }: { of: "enquiries" | "bookings" | "applications" }) {
  await requireAdmin();
  const n = (await getBadges())[of];
  if (!n) return null;
  return <span className="ml-auto rounded-full bg-lime px-1.5 text-[0.6875rem] font-semibold leading-5 text-ink">{n}</span>;
}

async function AdminEmail() {
  const admin = await requireAdmin();
  return <span title={admin.email}>{admin.email}</span>;
}

/**
 * The frame around every admin page. It contains no data of its own, so it
 * appears at once and stays put while moving between sections. Who may see
 * what is decided by src/proxy.ts and by requireAdmin() in each page.
 */
export default function PanelLayout({ children }: { children: React.ReactNode }) {
  const count = (of: "enquiries" | "bookings" | "applications") => (
    <Suspense fallback={null}>
      <Count of={of} />
    </Suspense>
  );
  const icon = { size: 17, weight: "light" as const, "aria-hidden": true };

  return (
    <div className="admin w-full bg-paper text-ink lg:grid lg:min-h-dvh lg:grid-cols-[15.5rem_minmax(0,1fr)]">
      <aside className="on-ink bg-ink text-paper lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col">
        <div className="flex items-center justify-between px-5 pb-3 pt-4 lg:pb-2 lg:pt-6">
          <Link href="/admin" className="inline-flex items-center gap-2.5">
            <LogoMark size={26} />
            <span className="font-medium tracking-tight">
              Apps Solutions <span className="text-fog">Admin</span>
            </span>
          </Link>
          <form action={signOut} className="lg:hidden">
            <button type="submit" className="inline-flex h-10 items-center gap-2 rounded-lg px-2 text-sm text-fog hover:text-paper">
              <SignOut size={17} aria-hidden="true" />
              Sign out
            </button>
          </form>
        </div>

        <nav aria-label="Admin" className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-1 lg:flex-col lg:gap-0 lg:overflow-y-auto">
          <div className="flex lg:mt-3 lg:flex-col">
            <NavLink href="/admin" exact>
              <SquaresFour {...icon} />
              Overview
            </NavLink>
          </div>
          <Group label="Inbox">
            <NavLink href="/admin/enquiries" badge={count("enquiries")}>
              <EnvelopeSimple {...icon} />
              Enquiries
            </NavLink>
            <NavLink href="/admin/bookings" badge={count("bookings")}>
              <CalendarBlank {...icon} />
              Bookings
            </NavLink>
            <NavLink href="/admin/applications" badge={count("applications")}>
              <UsersThree {...icon} />
              Applications
            </NavLink>
          </Group>
          <Group label="Website content">
            <NavLink href="/admin/content/services">
              <Stack {...icon} />
              Services
            </NavLink>
            <NavLink href="/admin/content/industries">
              <Buildings {...icon} />
              Industries
            </NavLink>
            <NavLink href="/admin/content/case_studies">
              <Notebook {...icon} />
              Case studies
            </NavLink>
            <NavLink href="/admin/content/jobs">
              <Briefcase {...icon} />
              Open roles
            </NavLink>
            <NavLink href="/admin/content/consultation_types">
              <VideoCamera {...icon} />
              Session types
            </NavLink>
          </Group>
        </nav>

        <div className="hidden border-t border-ink-line p-3 lg:block">
          <p className="min-h-8 truncate px-3 py-2 text-xs text-fog">
            <Suspense fallback={null}>
              <AdminEmail />
            </Suspense>
          </p>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-fog transition-colors hover:bg-ink-soft hover:text-paper"
          >
            <ArrowSquareOut {...icon} />
            View website
          </a>
          <form action={signOut}>
            <button
              type="submit"
              className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-fog transition-colors hover:bg-ink-soft hover:text-paper"
            >
              <SignOut {...icon} />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <main className="min-w-0">
        <div className="mx-auto max-w-6xl px-5 py-8 md:px-10 md:py-10">{children}</div>
      </main>
    </div>
  );
}
