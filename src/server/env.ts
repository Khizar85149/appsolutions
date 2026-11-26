import "server-only";

/**
 * Server environment. These values are read only on the server and are never
 * sent to the browser. Set them in Vercel (Project > Settings > Environment
 * Variables) and, for local work, in .env.local. See .env.example.
 */
/**
 * The project URL is only the address, e.g. https://abcdefgh.supabase.co.
 * Supabase also shows longer addresses such as https://abcdefgh.supabase.co/rest/v1/.
 * If one of those is pasted in, everything after the host is dropped, because
 * the database, sign-in and file storage each add their own path.
 */
function projectUrl(value: string | undefined): string {
  const raw = (value ?? "").trim();
  if (!raw) return "";
  try {
    return new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`).origin;
  } catch {
    return "";
  }
}

export const env = {
  /** Project URL, e.g. https://abcdefgh.supabase.co */
  supabaseUrl: projectUrl(process.env.SUPABASE_URL),
  /** Secret key (sb_secret_...) or the legacy service_role key. Server only. */
  supabaseSecretKey: (process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY ?? "").trim(),
  /** Shared secret for POST /api/revalidate. */
  revalidateSecret: (process.env.REVALIDATE_SECRET ?? "").trim(),
};

export const isSupabaseConfigured = Boolean(env.supabaseUrl && env.supabaseSecretKey);
