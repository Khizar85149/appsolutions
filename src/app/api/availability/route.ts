import { connection } from "next/server";
import { getBusyIntervals } from "@/server/bookings";

/**
 * GET /api/availability
 * Booked and blocked periods for the booking calendar, as
 * { busy: [[startMs, endMs], ...] }. Always answered live, never cached,
 * so a time that was just booked disappears for the next visitor.
 */
export async function GET() {
  await connection();
  const busy = await getBusyIntervals(Date.now());
  return Response.json(
    { busy: busy ?? [], connected: busy !== null },
    { headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } },
  );
}
