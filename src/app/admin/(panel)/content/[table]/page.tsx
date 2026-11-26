import Link from "next/link";
import { notFound } from "next/navigation";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import { PublishSwitch } from "@/components/admin/controls";
import { Empty, PageHeader } from "@/components/admin/ui";
import { isContentTable, TABLES } from "@/lib/admin-schema";
import { listContent } from "@/server/admin/data";
import { requireAdmin } from "@/server/admin/session";

type Props = { params: Promise<{ table: string }> };

const DESCRIPTIONS: Record<string, string> = {
  services: "Each service has its own page and appears in the menu, the footer and the contact form.",
  industries: "Each industry has its own page and appears in the menu and the footer.",
  case_studies: "Client stories shown on the case studies pages and across the site.",
  jobs: "Roles shown on the careers page. Hide a role when it is filled.",
  consultation_types: "The kinds of call a visitor can book on the consultation page.",
};

export default async function ContentListPage({ params }: Props) {
  await requireAdmin();
  const { table } = await params;
  if (!isContentTable(table)) notFound();
  const def = TABLES[table];
  const rows = await listContent(table);

  return (
    <>
      <PageHeader
        title={def.label}
        description={DESCRIPTIONS[table]}
        actions={
          <Link href={`/admin/content/${table}/new`} className="abtn abtn-primary">
            <Plus size={14} weight="bold" aria-hidden="true" />
            New {def.singular}
          </Link>
        }
      />
      {rows.length === 0 ? (
        <Empty title={`No ${def.label.toLowerCase()} yet`}>Create the first one with the button above.</Empty>
      ) : (
        <div className="acard overflow-x-auto">
          <table className="atable">
            <thead>
              <tr>
                <th>{def.titleColumn === "name" ? "Name" : "Title"}</th>
                <th>Address</th>
                <th className="text-right">Order</th>
                <th>Visible</th>
                <th>
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const slug = String(r.slug);
                const name = String(r[def.titleColumn] ?? slug);
                return (
                  <tr key={slug} className={r.published ? "" : "text-stone"}>
                    <td className="min-w-64 max-w-md">
                      <Link href={`/admin/content/${table}/${slug}`} className="block">
                        <span className="block font-medium">{name}</span>
                        <span className="block truncate text-sm text-stone">{String(r[def.subtitleColumn] ?? "")}</span>
                      </Link>
                    </td>
                    <td className="whitespace-nowrap text-sm text-stone">
                      {def.path}/{slug}
                    </td>
                    <td className="text-right tabular-nums text-stone">{String(r.position ?? 0)}</td>
                    <td>
                      <PublishSwitch table={table} slug={slug} published={r.published === true} name={name} />
                    </td>
                    <td className="text-right">
                      <Link href={`/admin/content/${table}/${slug}`} className="abtn abtn-ghost">
                        Edit
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
