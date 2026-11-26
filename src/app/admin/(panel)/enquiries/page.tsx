import Link from "next/link";
import { Badge, Empty, formatDate, PageHeader, Tabs } from "@/components/admin/ui";
import { STATUSES, statusLabel } from "@/lib/admin-schema";
import { listInbox } from "@/server/admin/data";
import { requireAdmin } from "@/server/admin/session";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function EnquiriesPage({ searchParams }: Props) {
  const { status } = await searchParams;
  const current = typeof status === "string" && (STATUSES.contact_messages as readonly string[]).includes(status) ? status : "all";
  const [, messages] = await Promise.all([requireAdmin(), listInbox("contact_messages", current === "all" ? undefined : current)]);

  return (
    <>
      <PageHeader title="Enquiries" description="Project briefs sent through the contact form." />
      <Tabs
        current={current}
        items={[
          { key: "all", label: "All", href: "/admin/enquiries" },
          ...STATUSES.contact_messages.map((s) => ({ key: s, label: statusLabel(s), href: `/admin/enquiries?status=${s}` })),
        ]}
      />
      {messages.length === 0 ? (
        <Empty title="Nothing here">
          {current === "all" ? "Enquiries from the contact form will appear here." : "No enquiries have this status."}
        </Empty>
      ) : (
        <div className="acard overflow-x-auto">
          <table className="atable">
            <thead>
              <tr>
                <th>From</th>
                <th>Service</th>
                <th>Budget</th>
                <th>Received</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((m) => (
                <tr key={m.id}>
                  <td className="min-w-56">
                    <Link href={`/admin/enquiries/${m.id}`} className="block">
                      <span className="block font-medium">{m.name}</span>
                      <span className="block text-sm text-stone">{m.company || m.email}</span>
                    </Link>
                  </td>
                  <td className="whitespace-nowrap text-stone">{m.service || "Not given"}</td>
                  <td className="whitespace-nowrap text-stone">{m.budget || "Not given"}</td>
                  <td className="whitespace-nowrap text-stone">{formatDate(m.created_at)}</td>
                  <td>
                    <Badge status={m.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
