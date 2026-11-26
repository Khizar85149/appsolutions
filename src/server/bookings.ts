import "server-only";
import { BOOKING_WINDOW_DAYS, type BusyInterval } from "@/lib/scheduling";
import { getSupabase } from "./supabase";

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Every period the calendar must not offer between now and the end of the
 * booking window: confirmed bookings plus rows in availability_blocks.
 * Only start and end times leave the server. No names or emails.
 *
 * Returns null when the database is not connected or cannot be reached.
 */
export async function getBusyIntervals(nowMs: number): Promise<BusyInterval[] | null> {
  const db = getSupabase();
  if (!db) return null;
  const from = new Date(nowMs).toISOString();
  const to = new Date(nowMs + (BOOKING_WINDOW_DAYS + 3) * DAY_MS).toISOString();

  const [booked, blocked] = await Promise.all([
    db.from("bookings").select("starts_at, ends_at").eq("status", "confirmed").gt("ends_at", from).lt("starts_at", to),
    db.from("availability_blocks").select("starts_at, ends_at").gt("ends_at", from).lt("starts_at", to),
  ]);
  if (booked.error || blocked.error) {
    console.error(`[bookings] could not load busy times: ${(booked.error ?? blocked.error)?.message}`);
    return null;
  }
  return [...booked.data, ...blocked.data]
    .map((r): BusyInterval => [Date.parse(r.starts_at), Date.parse(r.ends_at)])
    .sort((a, b) => a[0] - b[0]);
}
