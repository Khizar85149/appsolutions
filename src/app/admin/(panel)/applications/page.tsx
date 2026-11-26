import Link from "next/link";
import { Badge, Empty, formatDate, PageHeader, Tabs } from "@/components/admin/ui";
import { STATUSES, statusLabel } from "@/lib/admin-schema";
import { listInbox } from "@/server/admin/data";
import { requireAdmin } from "@/server/admin/session";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function ApplicationsPage({ searchParams }: Props) {
  const { status } = await searchParams;
  const current = typeof status === "string" && (STATUSES.job_applications as readonly string[]).includes(status) ? status : "all";
  const [, applications] = await Promise.all([requireAdmin(), listInbox("job_applications", current === "all" ? undefined : current)]);

  return (
    <>
      <PageHeader title="Applications" description="Candidates who applied through the careers pages." />
      <Tabs
        current={current}
        items={[
          { key: "all", label: "All", href: "/admin/applications" },
          ...STATUSES.job_applications.map((s) => ({ key: s, label: statusLabel(s), href: `/admin/applications?status=${s}` })),
        ]}
      />
      {applications.length === 0 ? (
        <Empty title="Nothing here">
          {current === "all" ? "Job applications will appear here." : "No applications have this status."}
        </Empty>
      ) : (
        <div className="acard overflow-x-auto">
          <table className="atable">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Role</th>
                <th>Received</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((a) => (
                <tr key={a.id}>
                  <td className="min-w-56">
                    <Link href={`/admin/applications/${a.id}`} className="block">
                      <span className="block font-medium">{a.name}</span>
                      <span className="block text-sm text-stone">{a.email}</span>
                    </Link>
                  </td>
                  <td className="whitespace-nowrap text-stone">{a.job_title || a.job_slug}</td>
                  <td className="whitespace-nowrap text-stone">{formatDate(a.created_at)}</td>
                  <td>
                    <Badge status={a.status} />
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
