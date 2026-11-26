import { notFound } from "next/navigation";
import { DeleteButton, StatusSelect } from "@/components/admin/controls";
import { Facts, formatDateTime, formatTime, PageHeader } from "@/components/admin/ui";
import { getInboxItem } from "@/server/admin/data";
import { requireAdmin } from "@/server/admin/session";

type Props = { params: Promise<{ id: string }> };

export default async function BookingPage({ params }: Props) {
  await requireAdmin();
  const { id } = await params;
  const b = await getInboxItem("bookings", id);
  if (!b) notFound();

  const minutes = Math.round((Date.parse(b.ends_at) - Date.parse(b.starts_at)) / 60000);
  const everyone = [b.email, ...b.guests].join(",");
  const subject = encodeURIComponent(`${b.consultation_name || "Consultation"} with Apps Solutions Tech`);

  return (
    <>
      <PageHeader
        back={{ href: "/admin/bookings", label: "Bookings" }}
        title={formatDateTime(b.starts_at)}
        description={`${b.consultation_name || b.consultation_slug}, ${minutes} minutes, with ${b.name}`}
        actions={<StatusSelect table="bookings" id={b.id} status={b.status} />}
      />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <section className="acard p-5 md:p-7">
          <h2 className="text-sm text-stone">What they want to cover</h2>
          <p className="mt-3 whitespace-pre-wrap leading-relaxed">{b.notes || "No notes were added."}</p>
          <p className="mt-6 rounded-lg border border-rule bg-card px-4 py-3 text-sm text-stone">
            The website does not send invitations. Email the video link to the client and any guests yourself. Setting the status
            to Cancelled frees this time on the calendar.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-rule pt-5">
            <a href={`mailto:${everyone}?subject=${subject}`} className="abtn abtn-primary">
              Email the invitation
            </a>
            <DeleteButton target={{ kind: "inbox", table: "bookings", id: b.id }} confirm="Delete this booking? This cannot be undone." />
          </div>
        </section>
        <Facts
          items={[
            { label: "Office time", value: `${formatDateTime(b.starts_at)} to ${formatTime(b.ends_at)} (Toronto)` },
            {
              label: "Their time",
              value: b.time_zone && `${formatDateTime(b.starts_at, b.time_zone)} (${b.time_zone.replace(/_/g, " ")})`,
            },
            { label: "Name", value: b.name },
            { label: "Email", value: <a href={`mailto:${b.email}`} className="link">{b.email}</a> },
            { label: "Phone", value: b.phone && <a href={`tel:${b.phone}`} className="link">{b.phone}</a> },
            { label: "Company", value: b.company },
            { label: "Guests", value: b.guests.length > 0 && b.guests.join(", ") },
            { label: "Budget", value: b.budget },
            { label: "Booked on", value: `${formatDateTime(b.created_at)} (Toronto)` },
          ]}
        />
      </div>
    </>
  );
}
