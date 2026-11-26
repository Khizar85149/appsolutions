"use server";

import { isOfferedSlot } from "@/lib/scheduling";
import { getConsultation } from "../content";
import { EMAIL, fail, isRateLimited, text, TOO_MANY, visitorHash, type ActionResult } from "../guard";
import { getSupabase } from "../supabase";

export interface BookingInput {
  session: string;
  /** Start time in UTC milliseconds. */
  startsAt: number;
  timeZone: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  guests: string[];
  budget: string;
  notes: string;
  /** Hidden field. People leave it empty; bots fill it in. */
  website?: string;
}

const SLOT_TAKEN: ActionResult = {
  ok: false,
  code: "slot_taken",
  message: "That time was booked a moment ago. Please choose another.",
};

function isTimeZone(value: string): boolean {
  try {
    new Intl.DateTimeFormat("en-CA", { timeZone: value });
    return true;
  } catch {
    return false;
  }
}

/** Books a consultation. The database guarantees no two confirmed bookings overlap. */
export async function bookConsultation(input: BookingInput): Promise<ActionResult> {
  if (text(input?.website, 200)) return { ok: true };

  const v = {
    name: text(input?.name, 120),
    email: text(input?.email, 200).toLowerCase(),
    company: text(input?.company, 160),
    phone: text(input?.phone, 40),
    budget: text(input?.budget, 60),
    notes: text(input?.notes, 3000),
  };
  const guests = (Array.isArray(input?.guests) ? input.guests : []).map((g) => text(g, 200).toLowerCase()).filter(Boolean);
  const timeZone = text(input?.timeZone, 64);

  const fields: Record<string, string> = {};
  if (v.name.length < 2) fields.name = "Enter your full name.";
  if (!EMAIL.test(v.email)) fields.email = "Enter a valid work email address.";
  if (!v.company) fields.company = "Enter your company name.";
  if (guests.some((g) => !EMAIL.test(g))) fields.guests = "Check the guest email addresses. Separate them with commas.";
  else if (guests.length > 5) fields.guests = "You can add up to five guests.";
  if (Object.keys(fields).length > 0) return fail("Check the highlighted fields and try again.", fields);

  // The length of the meeting comes from the database, never from the browser.
  const session = await getConsultation(text(input?.session, 120));
  if (!session) return fail("This session type is no longer offered. Please choose another.");

  const startMs = Number(input?.startsAt);
  if (!isOfferedSlot(startMs, session.duration, Date.now())) return SLOT_TAKEN;
  const startsAt = new Date(startMs).toISOString();
  const endsAt = new Date(startMs + session.duration * 60000).toISOString();

  const db = getSupabase();
  if (!db) {
    console.error("[booking] Supabase is not configured, the booking was not stored.");
    return fail();
  }
  const ipHash = await visitorHash();
  if (await isRateLimited(db, "bookings", ipHash, 4)) return fail(TOO_MANY);

  // Blocked time (holidays, leave) that overlaps the requested slot.
  const blocked = await db
    .from("availability_blocks")
    .select("id", { count: "exact", head: true })
    .lt("starts_at", endsAt)
    .gt("ends_at", startsAt);
  if (blocked.error) {
    console.error(`[booking] could not check blocked time: ${blocked.error.message}`);
    return fail();
  }
  if ((blocked.count ?? 0) > 0) return SLOT_TAKEN;

  const { error } = await db.from("bookings").insert({
    ...v,
    guests,
    consultation_slug: session.slug,
    consultation_name: session.name,
    starts_at: startsAt,
    ends_at: endsAt,
    time_zone: isTimeZone(timeZone) ? timeZone : "",
    ip_hash: ipHash,
  });
  if (error) {
    // 23P01: the bookings_no_overlap constraint refused the row. Someone else holds this time.
    if (error.code === "23P01") return SLOT_TAKEN;
    console.error(`[booking] insert failed: ${error.message}`);
    return fail();
  }
  return { ok: true };
}
