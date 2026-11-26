import { createHash, createHmac, timingSafeEqual } from "node:crypto";

/**
 * The signed admin session cookie: how it is written and how it is checked.
 * Kept free of Next.js imports so both the proxy (src/proxy.ts) and the
 * server code (session.ts) can use it.
 *
 * Format: base64url(JSON { id, email, exp }) + "." + HMAC-SHA256 signature.
 * The signing key is derived from the Supabase secret key, so it never needs
 * its own environment variable and rotating that key signs everyone out.
 */

export const ADMIN_COOKIE = "ast_admin";
export const ADMIN_SESSION_SECONDS = 12 * 60 * 60;

export interface Admin {
  id: string;
  email: string;
}

const secret = () => (process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY ?? "").trim();
const sign = (body: string) =>
  createHmac("sha256", createHash("sha256").update(`admin-session:${secret()}`).digest()).update(body).digest("base64url");

export function encodeSession(admin: Admin): string {
  const body = Buffer.from(
    JSON.stringify({ id: admin.id, email: admin.email, exp: Math.floor(Date.now() / 1000) + ADMIN_SESSION_SECONDS }),
  ).toString("base64url");
  return `${body}.${sign(body)}`;
}

/** The admin named in a cookie, or null if it is missing, forged or expired. */
export function decodeSession(value: string | undefined): Admin | null {
  if (!value || !secret()) return null;
  const [body, signature] = value.split(".");
  if (!body || !signature) return null;
  const expected = sign(body);
  if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  try {
    const data = JSON.parse(Buffer.from(body, "base64url").toString()) as { id?: string; email?: string; exp?: number };
    if (!data.id || !data.email || !data.exp || data.exp < Date.now() / 1000) return null;
    return { id: data.id, email: data.email };
  } catch {
    return null;
  }
}
