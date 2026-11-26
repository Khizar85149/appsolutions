import { notFound } from "next/navigation";
import { RecordForm } from "@/components/admin/record-form";
import { Badge, PageHeader } from "@/components/admin/ui";
import { isContentTable, TABLES } from "@/lib/admin-schema";
import { getContent } from "@/server/admin/data";
import { loadRefOptions } from "@/server/admin/options";
import { requireAdmin } from "@/server/admin/session";

type Props = {
  params: Promise<{ table: string; slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function EditContentPage({ params, searchParams }: Props) {
  const { table, slug } = await params;
  if (!isContentTable(table)) notFound();
  const def = TABLES[table];
  const [, row, options, query] = await Promise.all([requireAdmin(), getContent(table, slug), loadRefOptions(table), searchParams]);
  if (!row) notFound();

  return (
    <>
      <PageHeader
        back={{ href: `/admin/content/${table}`, label: def.label }}
        title={String(row[def.titleColumn] ?? slug)}
        actions={<Badge status={row.published ? "published" : "hidden"} label={row.published ? "Visible" : "Hidden"} />}
      />
      {/* The key resets the form when moving between records. */}
      <RecordForm key={slug} table={table} initial={row} originalSlug={slug} options={options} created={query.created === "1"} />
    </>
  );
}
