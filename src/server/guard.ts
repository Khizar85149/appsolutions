import "server-only";
import { createHmac } from "node:crypto";
import { headers } from "next/headers";
import type { SupabaseClient } from "@supabase/supabase-js";
import { env } from "./env";

/**
 * Abuse protection for the public forms.
 *
 * The visitor's IP address is never stored. A keyed hash of it is saved with
 * each submission, which is enough to count how many came from one place.
 */
export async function visitorHash(): Promise<string | null> {
  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || h.get("x-real-ip") || "";
  if (!ip) return null;
  return createHmac("sha256", env.supabaseSecretKey || "local").update(ip).digest("hex").slice(0, 32);
}

type GuardedTable = "contact_messages" | "job_applications" | "bookings";

/** True when this visitor has already sent `limit` submissions to `table` in the last hour. */
export async function isRateLimited(
  db: SupabaseClient,
  table: GuardedTable,
  ipHash: string | null,
  limit: number,
): Promise<boolean> {
  if (!ipHash) return false;
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count, error } = await db
    .from(table)
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", since);
  // If the count itself fails, let the submission through rather than lose a real enquiry.
  if (error) return false;
  return (count ?? 0) >= limit;
}

/* ------------------------------------------------------------------ */
/* Input cleaning                                                      */
/* ------------------------------------------------------------------ */

export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Trims a value to a string of at most `max` characters. Anything that is not a string becomes "". */
export function text(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/** Result every form action returns to the browser. */
export type ActionResult =
  | { ok: true }
  | { ok: false; message: string; fields?: Record<string, string>; code?: "slot_taken" };

export const GENERIC_FAILURE = "We could not send this just now. Please try again in a moment.";
export const TOO_MANY = "You have sent several requests in the last hour. Please try again later or email us directly.";
export const fail = (message: string = GENERIC_FAILURE, fields?: Record<string, string>): ActionResult => ({
  ok: false,
  message,
  ...(fields ? { fields } : {}),
});
