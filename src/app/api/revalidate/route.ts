import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { CONTENT_TABLES, type ContentTable } from "@/server/content";
import { env } from "@/server/env";

/**
 * POST /api/revalidate
 * Refreshes cached content the moment it changes in Supabase.
 *
 * Supabase Database Webhooks call this after an insert, update or delete
 * (setup in supabase/README.md). The request must carry the shared secret
 * in an "x-revalidate-secret" header. The table name is read from the
 * webhook body, or from ?table=services for a manual call. ?table=all
 * refreshes everything.
 */
function authorised(request: NextRequest): boolean {
  const given = request.headers.get("x-revalidate-secret") ?? "";
  const expected = env.revalidateSecret;
  if (!expected || given.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(given), Buffer.from(expected));
}

export async function POST(request: NextRequest) {
  if (!authorised(request)) return Response.json({ revalidated: false, error: "Unauthorised" }, { status: 401 });

  let table = request.nextUrl.searchParams.get("table") ?? "";
  if (!table) {
    const body: unknown = await request.json().catch(() => null);
    if (body && typeof body === "object" && "table" in body && typeof body.table === "string") table = body.table;
  }

  const tables: readonly ContentTable[] =
    table === "all" ? CONTENT_TABLES : CONTENT_TABLES.filter((t) => t === table);
  if (tables.length === 0) {
    return Response.json({ revalidated: false, error: `Unknown table "${table}"` }, { status: 400 });
  }

  // expire: 0 means the next visitor waits for fresh data instead of seeing the old page once more.
  for (const t of tables) revalidateTag(t, { expire: 0 });
  return Response.json({ revalidated: true, tables });
}
