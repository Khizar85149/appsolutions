import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Badge, formatDate, formatDateTime, PageHeader, Panel } from "@/components/admin/ui";
import { getOverview } from "@/server/admin/data";
import { requireAdmin } from "@/server/admin/session";

function Stat({ href, value, label, note }: { href: string; value: number; label: string; note: string }) {
  return (
    <Link href={href} className="acard group block p-5 transition-colors hover:border-ink">
      <p className="text-sm text-stone">{label}</p>
      <p className="mt-3 text-4xl font-medium tabular-nums tracking-tight">{value}</p>
      <p className="mt-3 flex items-center gap-1.5 text-sm text-stone group-hover:text-ink">
        {note}
        <ArrowRight size={13} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
      </p>
    </Link>
  );
}

const more = "text-sm text-stone hover:text-ink";
const row = "flex items-center justify-between gap-4 px-5 py-3.5 transition-colors hover:bg-card";
const none = "px-5 py-8 text-center text-sm text-stone";

export default async function AdminOverviewPage() {
  // The access check and the query run together; a failed check redirects and discards the data.
  const [, o] = await Promise.all([requireAdmin(), getOverview()]);

  return (
    <>
      <PageHeader title="Overview" description="What needs your attention today." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat href="/admin/enquiries?status=new" value={o.newMessages} label="New enquiries" note="Open enquiries" />
        <Stat href="/admin/bookings" value={o.upcomingBookings} label="Upcoming calls" note="Open bookings" />
        <Stat href="/admin/applications?status=new" value={o.newApplications} label="New applications" note="Open applications" />
        <Stat href="/admin/content/jobs" value={o.openRoles} label="Open roles" note="Manage roles" />
      </div>

      <div className="mt-6 grid items-start gap-6 xl:grid-cols-2">
        <Panel title="Next calls" action={<Link href="/admin/bookings" className={more}>All bookings</Link>}>
          {o.nextBookings.length === 0 ? (
            <p className={none}>No calls are booked.</p>
          ) : (
            <ul className="divide-y divide-rule">
              {o.nextBookings.map((b) => (
                <li key={b.id}>
                  <Link href={`/admin/bookings/${b.id}`} className={row}>
                    <span className="min-w-0">
                      <span className="block truncate font-medium">{formatDateTime(b.starts_at)}</span>
                      <span className="block truncate text-sm text-stone">
                        {b.name}, {b.company || b.email}
                      </span>
                    </span>
                    <span className="hidden shrink-0 text-sm text-stone sm:block">{b.consultation_name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel title="Latest enquiries" action={<Link href="/admin/enquiries" className={more}>All enquiries</Link>}>
          {o.latestMessages.length === 0 ? (
            <p className={none}>No enquiries yet.</p>
          ) : (
            <ul className="divide-y divide-rule">
              {o.latestMessages.map((m) => (
                <li key={m.id}>
                  <Link href={`/admin/enquiries/${m.id}`} className={row}>
                    <span className="min-w-0">
                      <span className="block truncate font-medium">
                        {m.name}
                        {m.company && <span className="font-normal text-stone">, {m.company}</span>}
                      </span>
                      <span className="block truncate text-sm text-stone">{m.message}</span>
                    </span>
                    <span className="flex shrink-0 items-center gap-3">
                      <span className="hidden text-sm text-stone sm:block">{formatDate(m.created_at)}</span>
                      <Badge status={m.status} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel title="Latest applications" action={<Link href="/admin/applications" className={more}>All applications</Link>}>
          {o.latestApplications.length === 0 ? (
            <p className={none}>No applications yet.</p>
          ) : (
            <ul className="divide-y divide-rule">
              {o.latestApplications.map((a) => (
                <li key={a.id}>
                  <Link href={`/admin/applications/${a.id}`} className={row}>
                    <span className="min-w-0">
                      <span className="block truncate font-medium">{a.name}</span>
                      <span className="block truncate text-sm text-stone">{a.job_title || a.job_slug}</span>
                    </span>
                    <span className="flex shrink-0 items-center gap-3">
                      <span className="hidden text-sm text-stone sm:block">{formatDate(a.created_at)}</span>
                      <Badge status={a.status} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </>
  );
}
