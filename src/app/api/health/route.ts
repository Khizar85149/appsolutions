import { connection } from "next/server";
import { isSupabaseConfigured } from "@/server/env";
import { getSupabase, RESUME_BUCKET } from "@/server/supabase";

/**
 * GET /api/health
 * Open this after adding the Supabase keys to confirm the connection works.
 * It reports status only and never reveals keys or data.
 *   database: "connected" | "not_configured" | "error"
 */
export async function GET() {
  await connection();
  const headers = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" };
  const db = getSupabase();
  if (!isSupabaseConfigured || !db) {
    return Response.json(
      { database: "not_configured", hint: "Set SUPABASE_URL and SUPABASE_SECRET_KEY, then redeploy." },
      { headers },
    );
  }

  const tables = ["services", "industries", "case_studies", "jobs", "consultation_types", "bookings"] as const;
  const counts: Record<string, number | string> = {};
  let failed = false;
  await Promise.all(
    tables.map(async (t) => {
      const { count, error } = await db.from(t).select("*", { count: "exact", head: true });
      if (error) failed = true;
      // Content counts are public anyway. Booking volume is not, so it reports only "ok".
      counts[t] = error ? "error: run supabase/schema.sql" : t === "bookings" ? "ok" : (count ?? 0);
    }),
  );
  const bucket = await db.storage.getBucket(RESUME_BUCKET);
  if (bucket.error) failed = true;

  return Response.json(
    {
      database: failed ? "error" : "connected",
      rows: counts,
      resumeBucket: bucket.error ? "missing: run supabase/schema.sql" : "ready",
    },
    { status: failed ? 503 : 200, headers },
  );
}
