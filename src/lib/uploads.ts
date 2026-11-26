/**
 * Résumé upload rules, shared by the application form and the server.
 * 4 MB keeps the whole request under Vercel's 4.5 MB limit for server functions.
 * The same limit and types are set on the storage bucket in supabase/schema.sql.
 */
export const MAX_RESUME_MB = 4;

export const RESUME_TYPES: Record<string, string> = {
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};
