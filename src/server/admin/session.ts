import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { getSupabase } from "../supabase";
import { ADMIN_COOKIE, ADMIN_SESSION_SECONDS, decodeSession, encodeSession, type Admin } from "./cookie";

/**
 * Admin sessions.
 *
 * Signing in checks the email and password with Supabase Authentication and
 * that the user is listed in the admin_users table. The server then sets a
 * signed, http-only cookie. The browser cannot read or forge it, and it is
 * sent only over HTTPS in production.
 *
 * There are two checks on every request:
 *   1. src/proxy.ts turns away anyone without a valid cookie before a page
 *      is even rendered.
 *   2. Every admin page and every admin action calls requireAdmin(), which
 *      also confirms the user is still in admin_users. Removing a row from
 *      that table ends that person's access on their next click.
 */

export type { Admin };

export async function createSession(admin: Admin): Promise<void> {
  (await cookies()).set(ADMIN_COOKIE, encodeSession(admin), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: ADMIN_SESSION_SECONDS,
  });
}

export async function destroySession(): Promise<void> {
  (await cookies()).set(ADMIN_COOKIE, "", { httpOnly: true, path: "/admin", maxAge: 0 });
}

/** The signed-in admin, or null. Checked once per request. */
export const getAdmin = cache(async (): Promise<Admin | null> => {
  // Sessions depend on the current time, so they are only ever checked for a live
  // request, never while Next.js prepares a page ahead of a click.
  await connection();
  const admin = decodeSession((await cookies()).get(ADMIN_COOKIE)?.value);
  if (!admin) return null;
  const db = getSupabase();
  if (!db) return null;
  const { data, error } = await db.from("admin_users").select("user_id").eq("user_id", admin.id).limit(1);
  if (error || !data || data.length === 0) return null;
  return admin;
});

/** Use at the top of every admin page and action. Sends anyone else to the sign-in page. */
export async function requireAdmin(): Promise<Admin> {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}
