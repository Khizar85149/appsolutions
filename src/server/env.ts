import "server-only";

/**
 * Server environment. These values are read only on the server and are never
 * sent to the browser. Set them in Vercel (Project > Settings > Environment
 * Variables) and, for local work, in .env.local. See .env.example.
 */
export const env = {
  /** Project URL, e.g. https://abcdefgh.supabase.co */
  supabaseUrl: (process.env.SUPABASE_URL ?? "").trim().replace(/\/$/, ""),
  /** Secret key (sb_secret_...) or the legacy service_role key. Server only. */
  supabaseSecretKey: (process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY ?? "").trim(),
  /** Shared secret for POST /api/revalidate. */
  revalidateSecret: (process.env.REVALIDATE_SECRET ?? "").trim(),
};

export const isSupabaseConfigured = Boolean(env.supabaseUrl && env.supabaseSecretKey);
