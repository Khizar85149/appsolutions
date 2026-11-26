import { getInboxItem } from "@/server/admin/data";
import { getAdmin } from "@/server/admin/session";
import { getSupabase, RESUME_BUCKET } from "@/server/supabase";

/**
 * GET /admin/applications/<id>/resume
 * Résumés live in a private bucket. For a signed-in admin this creates a
 * download link that works for one minute and redirects to it.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getAdmin())) return new Response("Sign in to the admin panel first.", { status: 401 });
  const { id } = await params;
  const application = await getInboxItem("job_applications", id);
  const db = getSupabase();
  if (!application || !db) return new Response("Not found.", { status: 404 });

  const { data, error } = await db.storage
    .from(RESUME_BUCKET)
    .createSignedUrl(application.resume_path, 60, { download: application.resume_name || true });
  if (error || !data?.signedUrl) return new Response("The file could not be found in storage.", { status: 404 });
  return Response.redirect(data.signedUrl, 302);
}
