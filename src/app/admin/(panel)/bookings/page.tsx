import Link from "next/link";
import { BlockForm, RemoveBlockButton } from "@/components/admin/controls";
import { Badge, Empty, formatDateTime, formatTime, PageHeader, Panel, Tabs } from "@/components/admin/ui";
import { listBlocks, listBookings } from "@/server/admin/data";
import { requireAdmin } from "@/server/admin/session";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

const VIEWS = ["upcoming", "past", "cancelled"] as const;

export default async function BookingsPage({ searchParams }: Props) {
  await requireAdmin();
  const { view } = await searchParams;
  const current = VIEWS.find((v) => v === view) ?? "upcoming";
  const [bookings, blocks] = await Promise.all([listBookings(current), listBlocks()]);

  return (
    <>
      <PageHeader title="Bookings" description="Consultation calls booked through the website. Times are shown in Toronto time." />
      <Tabs
        current={current}
        items={[
          { key: "upcoming", label: "Upcoming", href: "/admin/bookings" },
          { key: "past", label: "Past", href: "/admin/bookings?view=past" },
          { key: "cancelled", label: "Cancelled", href: "/admin/bookings?view=cancelled" },
        ]}
      />
      {bookings.length === 0 ? (
        <Empty title={current === "upcoming" ? "No upcoming calls" : "Nothing here"}>
          {current === "upcoming" ? "New bookings from the consultation page will appear here." : undefined}
        </Empty>
      ) : (
        <div className="acard overflow-x-auto">
          <table className="atable">
            <thead>
              <tr>
                <th>When</th>
                <th>With</th>
                <th>Session</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td className="whitespace-nowrap">
                    <Link href={`/admin/bookings/${b.id}`} className="block font-medium">
                      {formatDateTime(b.starts_at)}
                      <span className="font-normal text-stone"> to {formatTime(b.ends_at)}</span>
                    </Link>
                  </td>
                  <td className="min-w-48">
                    <span className="block">{b.name}</span>
                    <span className="block text-sm text-stone">{b.company || b.email}</span>
                  </td>
                  <td className="whitespace-nowrap text-stone">{b.consultation_name || b.consultation_slug}</td>
                  <td>
                    <Badge status={b.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-8">
        <Panel title="Blocked time">
          <p className="px-5 pt-4 text-sm text-stone">
            Hours the booking calendar must not offer, such as holidays or days out of office. Enter times in Toronto time.
          </p>
          {blocks.length > 0 && (
            <ul className="mt-4 divide-y divide-rule border-t border-rule">
              {blocks.map((block) => (
                <li key={block.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3">
                  <span>
                    <span className="font-medium">{formatDateTime(block.starts_at)}</span>
                    <span className="text-stone"> to {formatDateTime(block.ends_at)}</span>
                    {block.reason && <span className="block text-sm text-stone">{block.reason}</span>}
                  </span>
                  <RemoveBlockButton id={block.id} />
                </li>
              ))}
            </ul>
          )}
          <div className="mt-4">
            <BlockForm />
          </div>
        </Panel>
      </div>
    </>
  );
}
