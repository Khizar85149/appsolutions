import "server-only";
import { TABLES, type ContentTable, type InboxTable, type RowValues } from "@/lib/admin-schema";
import { getSupabase } from "../supabase";

/**
 * Reads for the admin panel. Unlike the public site these are never cached:
 * an admin always sees the database as it is right now, including records
 * that are not published.
 */

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
  status: string;
  created_at: string;
}

export interface JobApplication {
  id: string;
  job_slug: string;
  job_title: string;
  name: string;
  email: string;
  phone: string;
  link: string;
  note: string;
  resume_path: string;
  resume_name: string;
  status: string;
  created_at: string;
}

export interface Booking {
  id: string;
  consultation_slug: string;
  consultation_name: string;
  starts_at: string;
  ends_at: string;
  time_zone: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  guests: string[];
  budget: string;
  notes: string;
  status: string;
  created_at: string;
}

export interface AvailabilityBlock {
  id: string;
  starts_at: string;
  ends_at: string;
  reason: string;
}

interface InboxRows {
  contact_messages: ContactMessage;
  job_applications: JobApplication;
  bookings: Booking;
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export const isUuid = (value: string) => UUID.test(value);

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

export async function listContent(table: ContentTable): Promise<RowValues[]> {
  const db = getSupabase();
  if (!db) return [];
  const { data, error } = await db.from(table).select("*").order("position").order("slug");
  if (error) throw new Error(`Could not load ${table}: ${error.message}`);
  return data as RowValues[];
}

export async function getContent(table: ContentTable, slug: string): Promise<RowValues | null> {
  const db = getSupabase();
  if (!db) return null;
  const { data, error } = await db.from(table).select("*").eq("slug", slug).limit(1);
  if (error) throw new Error(`Could not load ${table}: ${error.message}`);
  return (data?.[0] as RowValues | undefined) ?? null;
}

/** Slug and name of every record in a table, for the "related" pickers. */
export async function listOptions(table: ContentTable): Promise<{ slug: string; label: string }[]> {
  const column = TABLES[table].titleColumn;
  return (await listContent(table)).map((r) => ({ slug: String(r.slug), label: String(r[column] ?? r.slug) }));
}

/* ------------------------------------------------------------------ */
/* Inbox                                                               */
/* ------------------------------------------------------------------ */

export async function listInbox<T extends InboxTable>(table: T, status?: string): Promise<InboxRows[T][]> {
  const db = getSupabase();
  if (!db) return [];
  let query = db.from(table).select("*");
  if (status) query = query.eq("status", status);
  const { data, error } = await query.order(table === "bookings" ? "starts_at" : "created_at", { ascending: false }).limit(300);
  if (error) throw new Error(`Could not load ${table}: ${error.message}`);
  return data as InboxRows[T][];
}

export async function getInboxItem<T extends InboxTable>(table: T, id: string): Promise<InboxRows[T] | null> {
  const db = getSupabase();
  if (!db || !isUuid(id)) return null;
  const { data, error } = await db.from(table).select("*").eq("id", id).limit(1);
  if (error) throw new Error(`Could not load ${table}: ${error.message}`);
  return (data?.[0] as InboxRows[T] | undefined) ?? null;
}

/** Bookings for one tab of the bookings page. */
export async function listBookings(view: "upcoming" | "past" | "cancelled"): Promise<Booking[]> {
  const all = await listInbox("bookings");
  const now = Date.now();
  const bookings = all.filter((b) => {
    const future = Date.parse(b.ends_at) > now;
    if (view === "cancelled") return b.status === "cancelled";
    if (view === "upcoming") return b.status === "confirmed" && future;
    return b.status !== "cancelled" && !(b.status === "confirmed" && future);
  });
  // Soonest first for upcoming calls, most recent first otherwise.
  return view === "upcoming" ? bookings.reverse() : bookings;
}

export async function listBlocks(): Promise<AvailabilityBlock[]> {
  const db = getSupabase();
  if (!db) return [];
  const { data, error } = await db
    .from("availability_blocks")
    .select("*")
    .gt("ends_at", new Date().toISOString())
    .order("starts_at");
  if (error) throw new Error(`Could not load blocked time: ${error.message}`);
  return data as AvailabilityBlock[];
}

/* ------------------------------------------------------------------ */
/* Overview                                                            */
/* ------------------------------------------------------------------ */

export interface Overview {
  newMessages: number;
  newApplications: number;
  upcomingBookings: number;
  openRoles: number;
  nextBookings: Booking[];
  latestMessages: ContactMessage[];
  latestApplications: JobApplication[];
}

export async function getOverview(): Promise<Overview> {
  const empty: Overview = {
    newMessages: 0,
    newApplications: 0,
    upcomingBookings: 0,
    openRoles: 0,
    nextBookings: [],
    latestMessages: [],
    latestApplications: [],
  };
  const db = getSupabase();
  if (!db) return empty;
  const now = new Date().toISOString();
  const count = { count: "exact" as const, head: true };
  const [messages, applications, upcoming, roles, nextBookings, latestMessages, latestApplications] = await Promise.all([
    db.from("contact_messages").select("id", count).eq("status", "new"),
    db.from("job_applications").select("id", count).eq("status", "new"),
    db.from("bookings").select("id", count).eq("status", "confirmed").gt("starts_at", now),
    db.from("jobs").select("slug", count).eq("published", true),
    db.from("bookings").select("*").eq("status", "confirmed").gt("starts_at", now).order("starts_at").limit(5),
    db.from("contact_messages").select("*").order("created_at", { ascending: false }).limit(5),
    db.from("job_applications").select("*").order("created_at", { ascending: false }).limit(5),
  ]);
  return {
    newMessages: messages.count ?? 0,
    newApplications: applications.count ?? 0,
    upcomingBookings: upcoming.count ?? 0,
    openRoles: roles.count ?? 0,
    nextBookings: (nextBookings.data ?? []) as Booking[],
    latestMessages: (latestMessages.data ?? []) as ContactMessage[],
    latestApplications: (latestApplications.data ?? []) as JobApplication[],
  };
}

/** Counts for the badges in the sidebar. */
export async function getBadges(): Promise<{ enquiries: number; applications: number; bookings: number }> {
  const db = getSupabase();
  if (!db) return { enquiries: 0, applications: 0, bookings: 0 };
  const count = { count: "exact" as const, head: true };
  const [m, a, b] = await Promise.all([
    db.from("contact_messages").select("id", count).eq("status", "new"),
    db.from("job_applications").select("id", count).eq("status", "new"),
    db.from("bookings").select("id", count).eq("status", "confirmed").gt("starts_at", new Date().toISOString()),
  ]);
  return { enquiries: m.count ?? 0, applications: a.count ?? 0, bookings: b.count ?? 0 };
}
