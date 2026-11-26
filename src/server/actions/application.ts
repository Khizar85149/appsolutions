"use server";

import { randomUUID } from "node:crypto";
import { MAX_RESUME_MB, RESUME_TYPES } from "@/lib/uploads";
import { getJob } from "../content";
import { EMAIL, fail, isRateLimited, text, TOO_MANY, visitorHash, type ActionResult } from "../guard";
import { getSupabase, RESUME_BUCKET } from "../supabase";

/** The first bytes of a real PDF, DOCX (zip) or DOC (OLE) file. */
function looksLikeDocument(bytes: Uint8Array, ext: string): boolean {
  const starts = (...sig: number[]) => sig.every((b, i) => bytes[i] === b);
  if (ext === ".pdf") return starts(0x25, 0x50, 0x44, 0x46);
  if (ext === ".docx") return starts(0x50, 0x4b, 0x03, 0x04);
  if (ext === ".doc") return starts(0xd0, 0xcf, 0x11, 0xe0);
  return false;
}

/**
 * Stores a job application: the résumé goes to the private "resumes" bucket
 * in Supabase Storage and the details to the job_applications table.
 */
export async function submitApplication(form: FormData): Promise<ActionResult> {
  if (text(form.get("website"), 200)) return { ok: true };

  const v = {
    name: text(form.get("name"), 120),
    email: text(form.get("email"), 200).toLowerCase(),
    phone: text(form.get("phone"), 40),
    link: text(form.get("link"), 300),
    note: text(form.get("note"), 1500),
  };
  const jobSlug = text(form.get("jobSlug"), 120);
  const file = form.get("resume");

  const fields: Record<string, string> = {};
  if (v.name.length < 2) fields.name = "Enter your full name.";
  if (!EMAIL.test(v.email)) fields.email = "Enter a valid email address.";
  if (v.phone && !/^[+()\d\s.-]{7,20}$/.test(v.phone)) fields.phone = "Enter a valid phone number, or leave this blank.";
  if (!/^(https?:\/\/)?[\w-]+(\.[\w-]+)+\S*$/i.test(v.link)) fields.link = "Enter a link to your LinkedIn profile or portfolio.";

  const ext = file instanceof File ? (file.name.toLowerCase().match(/\.[a-z0-9]+$/)?.[0] ?? "") : "";
  if (!(file instanceof File) || file.size === 0) fields.resume = "Attach your résumé.";
  else if (!(ext in RESUME_TYPES)) fields.resume = "Upload a PDF, DOC or DOCX file.";
  else if (file.size > MAX_RESUME_MB * 1024 * 1024) fields.resume = `The file must be under ${MAX_RESUME_MB} MB.`;
  if (Object.keys(fields).length > 0 || !(file instanceof File)) {
    return fail("Check the highlighted fields and try again.", fields);
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  if (!looksLikeDocument(bytes, ext)) {
    return fail("Check the highlighted fields and try again.", {
      resume: "This file does not look like a PDF or Word document. Export it again and retry.",
    });
  }

  // Only roles that are currently published can be applied for.
  const job = await getJob(jobSlug);
  if (!job) return fail("This role is no longer open. See the careers page for current openings.");

  const db = getSupabase();
  if (!db) {
    console.error("[application] Supabase is not configured, the application was not stored.");
    return fail();
  }
  const ipHash = await visitorHash();
  if (await isRateLimited(db, "job_applications", ipHash, 5)) return fail(TOO_MANY);

  const path = `${job.slug}/${new Date().toISOString().slice(0, 7)}/${randomUUID()}${ext}`;
  const upload = await db.storage
    .from(RESUME_BUCKET)
    .upload(path, bytes, { contentType: RESUME_TYPES[ext], upsert: false });
  if (upload.error) {
    console.error(`[application] résumé upload failed: ${upload.error.message}`);
    return fail();
  }

  const { error } = await db.from("job_applications").insert({
    ...v,
    job_slug: job.slug,
    job_title: job.title,
    resume_path: path,
    resume_name: file.name.slice(0, 200),
    ip_hash: ipHash,
  });
  if (error) {
    console.error(`[application] insert failed: ${error.message}`);
    // Do not leave a file behind that no application points to.
    await db.storage.from(RESUME_BUCKET).remove([path]);
    return fail();
  }
  return { ok: true };
}
