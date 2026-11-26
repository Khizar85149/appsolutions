import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env, isSupabaseConfigured } from "./env";

let client: SupabaseClient | null = null;

/**
 * The one database client for the whole site. It runs only on the server and
 * uses the secret key, so the browser never holds database credentials and
 * never talks to Supabase directly.
 *
 * Returns null until SUPABASE_URL and SUPABASE_SECRET_KEY are set.
 */
export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  client ??= createClient(env.supabaseUrl, env.supabaseSecretKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
  return client;
}

export const RESUME_BUCKET = "resumes";
