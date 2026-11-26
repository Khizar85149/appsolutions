"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import {
  isContentTable,
  SLUG,
  STATUSES,
  TABLES,
  validateRow,
  type InboxTable,
  type RowValues,
} from "@/lib/admin-schema";
import { HOST_TIME_ZONE, zonedTimeToUtc } from "@/lib/scheduling";
import { env, isSupabaseConfigured } from "../env";
import { EMAIL, text } from "../guard";
import { getSupabase, RESUME_BUCKET } from "../supabase";
import { isUuid } from "./data";
import { createSession, destroySession, requireAdmin } from "./session";

/**
 * Every operation the admin panel can perform. Each one is a public endpoint
 * as far as the network is concerned, so each one starts with requireAdmin().
 */

export type Result = { ok: true } | { ok: false; message: string; errors?: Record<string, string> };

const failed = (message: string, errors?: Record<string, string>): Result => ({ ok: false, message, ...(errors ? { errors } : {}) });
const NOT_CONNECTED = "The database is not connected yet. Add the Supabase keys first.";

function db() {
  const client = getSupabase();
  if (!client) throw new Error(NOT_CONNECTED);
  return client;
}

/** Admin pages are rendered per request; this makes the open page show the change. */
const refreshAdmin = () => revalidatePath("/admin", "layout");

/* ------------------------------------------------------------------ */
/* Signing in and out                                                  */
/* ------------------------------------------------------------------ */

export interface LoginState {
  message: string;
  email: string;
}

export async function signIn(_previous: LoginState, form: FormData): Promise<LoginState> {
  const email = text(form.get("email"), 200).toLowerCase();
  const password = typeof form.get("password") === "string" ? String(form.get("password")) : "";
  const wrong = { message: "That email and password do not match an admin account.", email };

  if (!isSupabaseConfigured) return { message: NOT_CONNECTED, email };
  if (!EMAIL.test(email) || password.length < 6 || password.length > 200) return wrong;

  // A separate, throwaway client: signing in on the shared one would switch
  // its database requests from the secret key to this user's token.
  const auth = createClient(env.supabaseUrl, env.supabaseSecretKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
  const { data, error } = await auth.auth.signInWithPassword({ email, password });
  if (error || !data.user) return wrong;
  await auth.auth.signOut({ scope: "local" }).catch(() => undefined);

  // Having a Supabase user is not enough. The user must be listed as an admin.
  const allowed = await db().from("admin_users").select("user_id").eq("user_id", data.user.id).limit(1);
  if (allowed.error || !allowed.data || allowed.data.length === 0) return wrong;

  await createSession({ id: data.user.id, email: data.user.email ?? email });
  redirect("/admin");
}

export async function signOut(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}

/* ------------------------------------------------------------------ */
/* Content: services, industries, case studies, roles, session types    */
/* ------------------------------------------------------------------ */

/**
 * Creates a record (originalSlug = null) or updates one. On success a new
 * record redirects to its edit page; an update returns { ok: true }.
 */
export async function saveContent(table: string, originalSlug: string | null, values: RowValues): Promise<Result> {
  await requireAdmin();
  if (!isContentTable(table)) return failed("Unknown content type.");
  const checked = validateRow(table, values);
  if (!checked.ok) return failed("Some fields need attention.", checked.errors);

  if (originalSlug === null) {
    const slug = text(values?.slug, 120);
    if (!SLUG.test(slug)) {
      return failed("Some fields need attention.", { slug: "Use lowercase letters, numbers and hyphens only." });
    }
    const { error } = await db().from(table).insert({ ...checked.row, slug });
    if (error) {
      if (error.code === "23505") return failed("Some fields need attention.", { slug: "This address is already in use." });
      console.error(`[admin] insert into ${table} failed: ${error.message}`);
      return failed("The record could not be saved. Please try again.");
    }
    updateTag(table);
    redirect(`/admin/content/${table}/${slug}?created=1`);
  }

  const { error } = await db().from(table).update(checked.row).eq("slug", originalSlug);
  if (error) {
    console.error(`[admin] update of ${table} failed: ${error.message}`);
    return failed("The record could not be saved. Please try again.");
  }
  updateTag(table);
  return { ok: true };
}

export async function setPublished(table: string, slug: string, published: boolean): Promise<Result> {
  await requireAdmin();
  if (!isContentTable(table) || !SLUG.test(slug)) return failed("Unknown record.");
  const { error } = await db().from(table).update({ published: published === true }).eq("slug", slug);
  if (error) return failed("The change could not be saved. Please try again.");
  updateTag(table);
  return { ok: true };
}

export async function deleteContent(table: string, slug: string): Promise<Result> {
  await requireAdmin();
  if (!isContentTable(table) || !SLUG.test(slug)) return failed("Unknown record.");
  const { error } = await db().from(table).delete().eq("slug", slug);
  if (error) return failed(`The ${TABLES[table].singular} could not be deleted. Please try again.`);
  updateTag(table);
  redirect(`/admin/content/${table}`);
}

/* ------------------------------------------------------------------ */
/* Inbox: enquiries, applications, bookings                            */
/* ------------------------------------------------------------------ */

export async function setStatus(table: InboxTable, id: string, status: string): Promise<Result> {
  await requireAdmin();
  const allowed: readonly string[] | undefined = STATUSES[table];
  if (!allowed || !allowed.includes(status) || !isUuid(id)) return failed("Unknown record.");
  const { error } = await db().from(table).update({ status }).eq("id", id);
  if (error) {
    // Re-confirming a cancelled booking whose time has since been taken.
    if (error.code === "23P01") return failed("Another confirmed booking now occupies this time.");
    return failed("The status could not be changed. Please try again.");
  }
  refreshAdmin();
  return { ok: true };
}

const INBOX_HOME: Record<InboxTable, string> = {
  contact_messages: "/admin/enquiries",
  job_applications: "/admin/applications",
  bookings: "/admin/bookings",
};

export async function deleteInboxItem(table: InboxTable, id: string): Promise<Result> {
  await requireAdmin();
  if (!(table in STATUSES) || !isUuid(id)) return failed("Unknown record.");
  const client = db();

  if (table === "job_applications") {
    // Remove the résumé file too, so no personal document is left behind.
    const found = await client.from("job_applications").select("resume_path").eq("id", id).limit(1);
    const path = found.data?.[0]?.resume_path as string | undefined;
    if (path) await client.storage.from(RESUME_BUCKET).remove([path]);
  }
  const { error } = await client.from(table).delete().eq("id", id);
  if (error) return failed("The record could not be deleted. Please try again.");
  redirect(INBOX_HOME[table]);
}

/* ------------------------------------------------------------------ */
/* Blocked time on the booking calendar                                */
/* ------------------------------------------------------------------ */

/** "2027-01-04T09:00" in office (Toronto) time -> UTC milliseconds. */
function officeTimeToUtc(value: string): number | null {
  const m = value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/);
  if (!m) return null;
  const [year, month, day, hour, minute] = m.slice(1).map(Number);
  return zonedTimeToUtc(year, month, day, hour, minute, HOST_TIME_ZONE);
}

export async function addBlock(_previous: Result | null, form: FormData): Promise<Result> {
  await requireAdmin();
  const from = officeTimeToUtc(text(form.get("from"), 16));
  const to = officeTimeToUtc(text(form.get("to"), 16));
  if (from === null || to === null) return failed("Choose a start and an end.");
  if (to <= from) return failed("The end must be after the start.");
  const { error } = await db()
    .from("availability_blocks")
    .insert({ starts_at: new Date(from).toISOString(), ends_at: new Date(to).toISOString(), reason: text(form.get("reason"), 200) });
  if (error) return failed("The time could not be blocked. Please try again.");
  refreshAdmin();
  return { ok: true };
}

export async function deleteBlock(id: string): Promise<Result> {
  await requireAdmin();
  if (!isUuid(id)) return failed("Unknown record.");
  const { error } = await db().from("availability_blocks").delete().eq("id", id);
  if (error) return failed("The block could not be removed. Please try again.");
  refreshAdmin();
  return { ok: true };
}
