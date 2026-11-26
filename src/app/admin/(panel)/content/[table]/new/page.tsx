import { notFound } from "next/navigation";
import { RecordForm } from "@/components/admin/record-form";
import { PageHeader } from "@/components/admin/ui";
import { emptyRow, isContentTable, TABLES } from "@/lib/admin-schema";
import { listContent } from "@/server/admin/data";
import { loadRefOptions } from "@/server/admin/options";
import { requireAdmin } from "@/server/admin/session";

type Props = { params: Promise<{ table: string }> };

export default async function NewContentPage({ params }: Props) {
  await requireAdmin();
  const { table } = await params;
  if (!isContentTable(table)) notFound();
  const def = TABLES[table];
  const [options, existing] = await Promise.all([loadRefOptions(table), listContent(table)]);

  // Place the new record after the last one. Roles are dated today.
  const initial = emptyRow(table);
  initial.position = existing.reduce((max, r) => Math.max(max, Number(r.position) || 0), 0) + 10;
  if ("posted" in initial) initial.posted = new Date().toISOString().slice(0, 10);

  return (
    <>
      <PageHeader back={{ href: `/admin/content/${table}`, label: def.label }} title={`New ${def.singular}`} />
      <RecordForm table={table} initial={initial} originalSlug={null} options={options} />
    </>
  );
}
