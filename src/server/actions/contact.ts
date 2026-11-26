"use server";

import { EMAIL, fail, isRateLimited, text, TOO_MANY, visitorHash, type ActionResult } from "../guard";
import { getSupabase } from "../supabase";

export interface ContactInput {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
  /** Hidden field. People leave it empty; bots fill it in. */
  website?: string;
}

/** Stores a contact form enquiry in the contact_messages table. */
export async function sendContactMessage(input: ContactInput): Promise<ActionResult> {
  // Never trust the browser: every value is cleaned and checked again here.
  const v = {
    name: text(input?.name, 120),
    email: text(input?.email, 200).toLowerCase(),
    company: text(input?.company, 160),
    phone: text(input?.phone, 40),
    service: text(input?.service, 80),
    budget: text(input?.budget, 60),
    timeline: text(input?.timeline, 60),
    message: text(input?.message, 5000),
  };
  if (text(input?.website, 200)) return { ok: true };

  const fields: Record<string, string> = {};
  if (v.name.length < 2) fields.name = "Enter your full name.";
  if (!EMAIL.test(v.email)) fields.email = "Enter a valid work email address.";
  if (!v.company) fields.company = "Enter your company name.";
  if (!v.service) fields.service = "Choose the service closest to what you need.";
  if (!v.budget) fields.budget = "Choose a budget range. An estimate is fine.";
  if (v.message.length < 20) fields.message = "Tell us a little more. Two or three sentences is enough.";
  if (Object.keys(fields).length > 0) return fail("Check the highlighted fields and try again.", fields);

  const db = getSupabase();
  if (!db) {
    console.error("[contact] Supabase is not configured, the enquiry was not stored.");
    return fail();
  }
  const ipHash = await visitorHash();
  if (await isRateLimited(db, "contact_messages", ipHash, 5)) return fail(TOO_MANY);

  const { error } = await db.from("contact_messages").insert({ ...v, ip_hash: ipHash });
  if (error) {
    console.error(`[contact] insert failed: ${error.message}`);
    return fail();
  }
  return { ok: true };
}
