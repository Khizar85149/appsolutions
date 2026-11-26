/**
 * Front-end availability model.
 *
 * Everything the scheduler knows about open slots comes from `getAvailability`.
 * To connect a backend, replace the body of that function with a request that
 * returns the same shape: a map of local date keys ("YYYY-MM-DD" in the
 * visitor's time zone) to slot start times in UTC milliseconds.
 */

export const HOST_TIME_ZONE = "America/Toronto";
export const BOOKING_WINDOW_DAYS = 60;
const DAY_START_HOUR = 9;
const DAY_END_HOUR = 17;
const SLOT_STEP_MINUTES = 30;
const MIN_NOTICE_MS = 24 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

export type Availability = Map<string, number[]>;

interface Parts {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}

const formatters = new Map<string, Intl.DateTimeFormat>();

function partsFormatter(timeZone: string): Intl.DateTimeFormat {
  let f = formatters.get(timeZone);
  if (!f) {
    f = new Intl.DateTimeFormat("en-CA", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    });
    formatters.set(timeZone, f);
  }
  return f;
}

/** Wall-clock parts of an instant in a given time zone. */
export function zonedParts(utcMs: number, timeZone: string): Parts {
  const out: Parts = { year: 0, month: 0, day: 0, hour: 0, minute: 0 };
  for (const p of partsFormatter(timeZone).formatToParts(utcMs)) {
    if (p.type === "year" || p.type === "month" || p.type === "day" || p.type === "hour" || p.type === "minute") {
      out[p.type] = Number(p.value);
    }
  }
  return out;
}

const pad = (n: number) => String(n).padStart(2, "0");

export function toDateKey(year: number, month: number, day: number): string {
  return `${year}-${pad(month)}-${pad(day)}`;
}

/** Local date key ("YYYY-MM-DD") of an instant in a given time zone. */
export function dateKeyInZone(utcMs: number, timeZone: string): string {
  const p = zonedParts(utcMs, timeZone);
  return toDateKey(p.year, p.month, p.day);
}

/** Offset of a zone from UTC at a given instant, in milliseconds. */
function zoneOffset(utcMs: number, timeZone: string): number {
  const p = zonedParts(utcMs, timeZone);
  const asUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute);
  return asUtc - Math.floor(utcMs / 60000) * 60000;
}

/** Converts a wall-clock time in a zone to a UTC instant. Handles DST changes. */
export function zonedTimeToUtc(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  timeZone: string,
): number {
  const guess = Date.UTC(year, month - 1, day, hour, minute);
  const first = guess - zoneOffset(guess, timeZone);
  const second = guess - zoneOffset(first, timeZone);
  return second;
}

/** Small deterministic generator so the same date always shows the same gaps. */
function seeded(seed: string): () => number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  let a = h >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Open slot start times (UTC ms) for one calendar day at the host office. */
function hostDaySlots(year: number, month: number, day: number, durationMinutes: number): number[] {
  const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  if (weekday === 0 || weekday === 6) return [];

  const key = toDateKey(year, month, day);
  const random = seeded(key);
  if (random() < 0.14) return []; // some days are fully booked
  const busyness = 0.25 + random() * 0.4;

  const slots: number[] = [];
  const lastStart = DAY_END_HOUR * 60 - durationMinutes;
  for (let m = DAY_START_HOUR * 60; m <= lastStart; m += SLOT_STEP_MINUTES) {
    const taken = random() < busyness;
    if (!taken) slots.push(zonedTimeToUtc(year, month, day, Math.floor(m / 60), m % 60, HOST_TIME_ZONE));
  }
  return slots;
}

/**
 * Open slots for the booking window, grouped by date in the visitor's zone.
 * Replace this function when a scheduling backend exists.
 */
export function getAvailability(nowMs: number, visitorTimeZone: string, durationMinutes: number): Availability {
  const result: Availability = new Map();
  const earliest = nowMs + MIN_NOTICE_MS;
  const lastKey = lastBookableDateKey(nowMs, visitorTimeZone);
  const today = zonedParts(nowMs, HOST_TIME_ZONE);
  const anchor = Date.UTC(today.year, today.month - 1, today.day);

  for (let i = 0; i <= BOOKING_WINDOW_DAYS + 2; i++) {
    const d = new Date(anchor + i * DAY_MS);
    const slots = hostDaySlots(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate(), durationMinutes);
    for (const slot of slots) {
      if (slot < earliest) continue;
      const key = dateKeyInZone(slot, visitorTimeZone);
      if (key > lastKey) continue;
      const list = result.get(key);
      if (list) list.push(slot);
      else result.set(key, [slot]);
    }
  }
  for (const list of result.values()) list.sort((a, b) => a - b);
  return result;
}

/** Last date (visitor zone) that can be booked. */
export function lastBookableDateKey(nowMs: number, timeZone: string): string {
  const p = zonedParts(nowMs, timeZone);
  const d = new Date(Date.UTC(p.year, p.month - 1, p.day) + BOOKING_WINDOW_DAYS * DAY_MS);
  return toDateKey(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate());
}

export function formatTime(utcMs: number, timeZone: string, hour12: boolean): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12,
  })
    .format(utcMs)
    .replace(/\./g, "")
    .replace(/\s?(am|pm)$/i, (m) => m.toLowerCase());
}

/** "Thursday, December 3, 2026" for a date key. */
export function formatDateKey(key: string, options?: Intl.DateTimeFormatOptions): string {
  const [y, m, d] = key.split("-").map(Number);
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "UTC",
    ...(options ?? { weekday: "long", month: "long", day: "numeric", year: "numeric" }),
  }).format(Date.UTC(y, m - 1, d));
}

export function timeZoneLabel(timeZone: string): string {
  return timeZone.replace(/_/g, " ").replace(/\//g, " / ");
}

const FALLBACK_ZONES = [
  "America/Vancouver",
  "America/Edmonton",
  "America/Winnipeg",
  "America/Toronto",
  "America/Halifax",
  "America/St_Johns",
  "America/Los_Angeles",
  "America/Denver",
  "America/Chicago",
  "America/New_York",
  "Europe/London",
  "Europe/Berlin",
  "Asia/Dubai",
  "Asia/Riyadh",
  "Asia/Karachi",
  "Asia/Singapore",
  "Australia/Sydney",
];

export function listTimeZones(include: string): string[] {
  const intl = Intl as unknown as { supportedValuesOf?: (key: string) => string[] };
  let zones: string[];
  try {
    zones = intl.supportedValuesOf?.("timeZone") ?? FALLBACK_ZONES;
  } catch {
    zones = FALLBACK_ZONES;
  }
  return zones.includes(include) ? zones : [include, ...zones];
}

/** Builds a calendar file for the confirmed meeting. */
export function buildIcs(input: {
  startMs: number;
  durationMinutes: number;
  title: string;
  description: string;
  organizerName: string;
  organizerEmail: string;
  uidDomain: string;
}): string {
  const stamp = (ms: number) => new Date(ms).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const escape = (s: string) => s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/([,;])/g, "\\$1");
  const end = input.startMs + input.durationMinutes * 60000;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Apps Solutions Tech//Consultation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${input.startMs}-${input.durationMinutes}@${input.uidDomain}`,
    `DTSTAMP:${stamp(input.startMs)}`,
    `DTSTART:${stamp(input.startMs)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${escape(input.title)}`,
    `DESCRIPTION:${escape(input.description)}`,
    "LOCATION:Video call. Link sent by email.",
    `ORGANIZER;CN=${escape(input.organizerName)}:mailto:${input.organizerEmail}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
