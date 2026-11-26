import { notFound } from "next/navigation";
import { DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import { DeleteButton, StatusSelect } from "@/components/admin/controls";
import { Facts, formatDateTime, PageHeader } from "@/components/admin/ui";
import { getInboxItem } from "@/server/admin/data";
import { requireAdmin } from "@/server/admin/session";

type Props = { params: Promise<{ id: string }> };

export default async function ApplicationPage({ params }: Props) {
  const { id } = await params;
  const [, a] = await Promise.all([requireAdmin(), getInboxItem("job_applications", id)]);
  if (!a) notFound();

  const link = /^https?:\/\//i.test(a.link) ? a.link : `https://${a.link}`;

  return (
    <>
      <PageHeader
        back={{ href: "/admin/applications", label: "Applications" }}
        title={a.name}
        description={`Applied for ${a.job_title || a.job_slug}`}
        actions={<StatusSelect table="job_applications" id={a.id} status={a.status} />}
      />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <section className="acard p-5 md:p-7">
          <h2 className="text-sm text-stone">Note from the candidate</h2>
          <p className="mt-3 whitespace-pre-wrap leading-relaxed">{a.note || "No note was added."}</p>
          <div className="mt-7 flex flex-wrap items-center gap-2 border-t border-rule pt-5">
            {/* A plain link on purpose: this address answers with a redirect to the file, not a page. */}
            <a href={`/admin/applications/${a.id}/resume`} className="abtn abtn-primary" download>
              <DownloadSimple size={16} aria-hidden="true" />
              Download résumé
            </a>
            <a href={`mailto:${a.email}`} className="abtn abtn-ghost">
              Email candidate
            </a>
            <DeleteButton
              target={{ kind: "inbox", table: "job_applications", id: a.id }}
              confirm="Delete this application and its résumé file? This cannot be undone."
            />
          </div>
        </section>
        <Facts
          items={[
            { label: "Email", value: <a href={`mailto:${a.email}`} className="link">{a.email}</a> },
            { label: "Phone", value: a.phone && <a href={`tel:${a.phone}`} className="link">{a.phone}</a> },
            { label: "Profile", value: a.link && <a href={link} target="_blank" rel="noreferrer noopener" className="link">{a.link}</a> },
            { label: "Role", value: a.job_title || a.job_slug },
            { label: "Résumé file", value: a.resume_name },
            { label: "Received", value: `${formatDateTime(a.created_at)} (Toronto)` },
          ]}
        />
      </div>
    </>
  );
}
