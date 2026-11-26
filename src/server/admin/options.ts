import "server-only";
import { allFields, type ContentTable } from "@/lib/admin-schema";
import type { RefOptions } from "@/components/admin/record-form";
import { listOptions } from "./data";

/** Choices for every "related records" picker on a table's form. */
export async function loadRefOptions(table: ContentTable): Promise<RefOptions> {
  const needed = new Set<ContentTable>();
  for (const f of allFields(table)) if (f.type === "ref" || f.type === "refs") needed.add(f.table);
  const entries = await Promise.all([...needed].map(async (t) => [t, await listOptions(t)] as const));
  return Object.fromEntries(entries);
}
