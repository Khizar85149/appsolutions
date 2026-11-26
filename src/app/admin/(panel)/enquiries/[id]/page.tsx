import { notFound } from "next/navigation";
import { DeleteButton, StatusSelect } from "@/components/admin/controls";
import { Facts, formatDateTime, PageHeader } from "@/components/admin/ui";
import { getInboxItem } from "@/server/admin/data";
import { requireAdmin } from "@/server/admin/session";

type Props = { params: Promise<{ id: string }> };

export default async function EnquiryPage({ params }: Props) {
  const { id } = await params;
  const [, m] = await Promise.all([requireAdmin(), getInboxItem("contact_messages", id)]);
  if (!m) notFound();

  const subject = encodeURIComponent("Your enquiry to Apps Solutions Tech");

  return (
    <>
      <PageHeader
        back={{ href: "/admin/enquiries", label: "Enquiries" }}
        title={m.name}
        description={m.company || undefined}
        actions={<StatusSelect table="contact_messages" id={m.id} status={m.status} />}
      />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <section className="acard p-5 md:p-7">
          <h2 className="text-sm text-stone">What they need built</h2>
          <p className="mt-3 whitespace-pre-wrap leading-relaxed">{m.message}</p>
          <div className="mt-7 flex flex-wrap items-center gap-2 border-t border-rule pt-5">
            <a href={`mailto:${m.email}?subject=${subject}`} className="abtn abtn-primary">
              Reply by email
            </a>
            <DeleteButton
              target={{ kind: "inbox", table: "contact_messages", id: m.id }}
              confirm="Delete this enquiry? This cannot be undone."
            />
          </div>
        </section>
        <Facts
          items={[
            { label: "Email", value: <a href={`mailto:${m.email}`} className="link">{m.email}</a> },
            { label: "Phone", value: m.phone && <a href={`tel:${m.phone}`} className="link">{m.phone}</a> },
            { label: "Company", value: m.company },
            { label: "Service", value: m.service },
            { label: "Budget", value: m.budget },
            { label: "Start", value: m.timeline },
            { label: "Received", value: `${formatDateTime(m.created_at)} (Toronto)` },
          ]}
        />
      </div>
    </>
  );
}
