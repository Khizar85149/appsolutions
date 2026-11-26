/**
 * Describes the editable content tables for the admin panel. The edit forms
 * are drawn from these definitions and the server validates against the same
 * ones, so a field cannot be shown without also being checked.
 *
 * Field names are database column names (see supabase/schema.sql).
 */
import type { IconKey } from "./types";

export const CONTENT_TABLES = ["services", "industries", "case_studies", "jobs", "consultation_types"] as const;
export type ContentTable = (typeof CONTENT_TABLES)[number];

export const ICON_KEYS = [
  "stack", "browser", "erp", "chat", "automation", "mobile", "pos", "management", "healthcare", "restaurant",
  "retail", "finance", "logistics", "realestate", "education", "manufacturing", "shield", "users", "code",
  "handshake", "clock", "globe", "video", "calendar", "pin", "mail", "phone", "chart", "search", "rocket",
  "wrench", "lock", "document",
] as const satisfies readonly IconKey[];

interface Base {
  name: string;
  label: string;
  help?: string;
  required?: boolean;
}

export type Field =
  | (Base & { type: "text" | "textarea" | "date" })
  | (Base & { type: "number"; min: number; max: number; step?: number })
  | (Base & { type: "boolean" })
  | (Base & { type: "select"; options: readonly string[] })
  /** A list of short texts, typed one per line. Stored as text[]. */
  | (Base & { type: "lines"; rows?: number })
  /** A list of two-part items, e.g. question and answer. Stored as jsonb. */
  | (Base & { type: "pairs"; keys: [Key, Key] })
  /** One fixed group of texts. Stored as a jsonb object. `optional` stores null when all are empty. */
  | (Base & { type: "object"; keys: Key[]; optional?: boolean })
  /** Links to records in another table, stored as their slugs. */
  | (Base & { type: "refs"; table: ContentTable })
  | (Base & { type: "ref"; table: ContentTable });

export interface Key {
  key: string;
  label: string;
  long?: boolean;
}

export interface Section {
  title: string;
  note?: string;
  fields: Field[];
}

export interface TableDef {
  /** Plural, for menus and headings. */
  label: string;
  singular: string;
  /** Public address of a record is `${path}/${slug}`. */
  path: string;
  /** Column shown as the record's name. */
  titleColumn: "name" | "title";
  /** Second column shown in lists. */
  subtitleColumn: string;
  sections: Section[];
}

const METRIC: [Key, Key] = [
  { key: "value", label: "Figure" },
  { key: "label", label: "What it measures" },
];
const TITLED: [Key, Key] = [
  { key: "title", label: "Title" },
  { key: "body", label: "Text", long: true },
];
const FAQ: [Key, Key] = [
  { key: "q", label: "Question" },
  { key: "a", label: "Answer", long: true },
];

const seo: Section = {
  title: "Search engines",
  note: "Shown in Google results and when the page is shared.",
  fields: [
    { name: "seo_title", label: "Page title", type: "text", required: true, help: "Aim for 60 characters or fewer." },
    { name: "seo_description", label: "Description", type: "textarea", required: true, help: "Aim for 160 characters or fewer." },
  ],
};

const publishing: Section = {
  title: "Publishing",
  fields: [
    { name: "published", label: "Visible on the website", type: "boolean" },
    { name: "position", label: "Order", type: "number", min: 0, max: 100000, help: "Lower numbers appear first." },
  ],
};

export const TABLES: Record<ContentTable, TableDef> = {
  services: {
    label: "Services",
    singular: "service",
    path: "/services",
    titleColumn: "name",
    subtitleColumn: "tagline",
    sections: [
      {
        title: "Basics",
        fields: [
          { name: "name", label: "Name", type: "text", required: true },
          { name: "icon", label: "Icon", type: "select", options: ICON_KEYS },
          { name: "tagline", label: "Tagline", type: "text", required: true, help: "One line, shown in the menu and on cards." },
          { name: "summary", label: "Summary", type: "textarea", help: "Two sentences for the services page." },
        ],
      },
      {
        title: "Page header",
        fields: [
          { name: "hero_title", label: "Headline", type: "text", required: true },
          { name: "hero_lead", label: "Introduction", type: "textarea" },
          { name: "outcomes", label: "Headline numbers", type: "pairs", keys: METRIC, help: "Three work best." },
          {
            name: "engagement",
            label: "How we engage",
            type: "object",
            keys: [
              { key: "timeline", label: "Timeline" },
              { key: "team", label: "Team" },
              { key: "model", label: "Commercial model" },
            ],
          },
        ],
      },
      {
        title: "Page content",
        fields: [
          { name: "signals", label: "Signs a client needs this", type: "lines", help: "One per line." },
          { name: "deliverables", label: "What the client receives", type: "pairs", keys: TITLED },
          { name: "process", label: "Process steps", type: "pairs", keys: TITLED },
          { name: "stack", label: "Technology", type: "lines", help: "One per line.", rows: 5 },
          { name: "faqs", label: "Questions and answers", type: "pairs", keys: FAQ },
        ],
      },
      {
        title: "Related",
        fields: [
          { name: "industries", label: "Industries", type: "refs", table: "industries" },
          { name: "case_studies", label: "Case studies", type: "refs", table: "case_studies" },
        ],
      },
      seo,
      publishing,
    ],
  },
  industries: {
    label: "Industries",
    singular: "industry",
    path: "/industries",
    titleColumn: "name",
    subtitleColumn: "tagline",
    sections: [
      {
        title: "Basics",
        fields: [
          { name: "name", label: "Name", type: "text", required: true },
          { name: "icon", label: "Icon", type: "select", options: ICON_KEYS },
          { name: "tagline", label: "Tagline", type: "text", required: true, help: "One line, shown in the menu and on cards." },
          { name: "summary", label: "Summary", type: "textarea" },
        ],
      },
      {
        title: "Page header",
        fields: [
          { name: "hero_title", label: "Headline", type: "text", required: true },
          { name: "hero_lead", label: "Introduction", type: "textarea" },
          { name: "stats", label: "Headline numbers", type: "pairs", keys: METRIC },
          { name: "compliance", label: "Standards we build to", type: "lines", help: "One per line.", rows: 5 },
        ],
      },
      {
        title: "Page content",
        fields: [
          { name: "challenges", label: "Challenges", type: "pairs", keys: TITLED },
          { name: "solutions", label: "What we build", type: "pairs", keys: TITLED },
          { name: "faqs", label: "Questions and answers", type: "pairs", keys: FAQ },
        ],
      },
      {
        title: "Related",
        fields: [
          { name: "services", label: "Services", type: "refs", table: "services" },
          { name: "case_studies", label: "Case studies", type: "refs", table: "case_studies" },
        ],
      },
      seo,
      publishing,
    ],
  },
  case_studies: {
    label: "Case studies",
    singular: "case study",
    path: "/case-studies",
    titleColumn: "title",
    subtitleColumn: "client",
    sections: [
      {
        title: "Basics",
        fields: [
          { name: "title", label: "Title", type: "text", required: true },
          { name: "client", label: "Client", type: "text", required: true, help: "For example: Restaurant group, 14 locations." },
          { name: "summary", label: "Summary", type: "textarea" },
          { name: "industry", label: "Industry", type: "ref", table: "industries" },
          { name: "services", label: "Services delivered", type: "refs", table: "services" },
        ],
      },
      {
        title: "Project facts",
        fields: [
          { name: "location", label: "Location", type: "text" },
          { name: "year", label: "Year", type: "text" },
          { name: "duration", label: "Duration", type: "text" },
          { name: "team", label: "Team", type: "text" },
          { name: "hero_metric", label: "Main result", type: "object", keys: METRIC },
          { name: "metrics", label: "Other results in numbers", type: "pairs", keys: METRIC },
        ],
      },
      {
        title: "The story",
        fields: [
          { name: "challenge", label: "The challenge", type: "lines", help: "One paragraph per line." },
          { name: "approach", label: "Our approach", type: "pairs", keys: TITLED },
          { name: "solution", label: "What we built", type: "lines", help: "One paragraph per line." },
          { name: "results", label: "Results", type: "lines", help: "One per line." },
          { name: "stack", label: "Technology", type: "lines", help: "One per line.", rows: 5 },
          {
            name: "quote",
            label: "Client quote",
            type: "object",
            optional: true,
            keys: [
              { key: "text", label: "Quote", long: true },
              { key: "role", label: "Who said it" },
            ],
          },
        ],
      },
      {
        title: "Appearance",
        fields: [
          { name: "tone", label: "Card colour", type: "select", options: ["ink", "lime", "sand", "sage"] },
          { name: "featured", label: "Show on the home page", type: "boolean" },
        ],
      },
      seo,
      publishing,
    ],
  },
  jobs: {
    label: "Open roles",
    singular: "role",
    path: "/careers",
    titleColumn: "title",
    subtitleColumn: "department",
    sections: [
      {
        title: "Basics",
        fields: [
          { name: "title", label: "Job title", type: "text", required: true },
          { name: "department", label: "Department", type: "text" },
          { name: "location", label: "Location", type: "text" },
          { name: "type", label: "Type", type: "text", help: "For example: Full time, hybrid." },
          { name: "experience", label: "Experience", type: "text" },
          { name: "posted", label: "Date posted", type: "date", required: true },
          { name: "summary", label: "Summary", type: "textarea", required: true },
        ],
      },
      {
        title: "Description",
        fields: [
          { name: "about", label: "About the role", type: "lines", help: "One paragraph per line." },
          { name: "responsibilities", label: "Responsibilities", type: "lines", help: "One per line." },
          { name: "requirements", label: "Requirements", type: "lines", help: "One per line." },
          { name: "nice_to_have", label: "Nice to have", type: "lines", help: "One per line." },
        ],
      },
      publishing,
    ],
  },
  consultation_types: {
    label: "Session types",
    singular: "session type",
    path: "/consultation",
    titleColumn: "name",
    subtitleColumn: "summary",
    sections: [
      {
        title: "Basics",
        fields: [
          { name: "name", label: "Name", type: "text", required: true },
          { name: "icon", label: "Icon", type: "select", options: ICON_KEYS },
          { name: "duration", label: "Length in minutes", type: "number", min: 15, max: 240, step: 15, required: true },
          { name: "summary", label: "Summary", type: "textarea", required: true },
          { name: "description", label: "Description", type: "textarea" },
          { name: "agenda", label: "On the call", type: "lines", help: "One per line." },
        ],
      },
      {
        title: "Host",
        fields: [
          { name: "host_name", label: "Host name", type: "text" },
          { name: "host_role", label: "Host role", type: "text" },
        ],
      },
      seo,
      publishing,
    ],
  },
};

export function isContentTable(value: string): value is ContentTable {
  return (CONTENT_TABLES as readonly string[]).includes(value);
}

export const allFields = (table: ContentTable): Field[] => TABLES[table].sections.flatMap((s) => s.fields);

export const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/** "ERP System Development" -> "erp-system-development" */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export type RowValues = Record<string, unknown>;

/** An empty record with sensible defaults, for the "new" form. */
export function emptyRow(table: ContentTable): RowValues {
  const row: RowValues = {};
  for (const f of allFields(table)) {
    if (f.type === "boolean") row[f.name] = f.name === "published";
    else if (f.type === "number") row[f.name] = f.name === "duration" ? 30 : 0;
    else if (f.type === "select") row[f.name] = f.options.includes("code") ? "code" : f.options[0];
    else if (f.type === "lines" || f.type === "pairs" || f.type === "refs") row[f.name] = [];
    else if (f.type === "object") row[f.name] = Object.fromEntries(f.keys.map((k) => [k.key, ""]));
    else if (f.type === "date") row[f.name] = "";
    else row[f.name] = "";
  }
  return row;
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/**
 * Cleans and checks submitted values against the table definition.
 * Returns the row to store, or a message for each field that is wrong.
 */
export function validateRow(
  table: ContentTable,
  input: RowValues,
): { ok: true; row: RowValues } | { ok: false; errors: Record<string, string> } {
  const row: RowValues = {};
  const errors: Record<string, string> = {};
  for (const f of allFields(table)) {
    const raw = input?.[f.name];
    switch (f.type) {
      case "text":
        row[f.name] = str(raw, 300);
        break;
      case "textarea":
        row[f.name] = str(raw, 5000);
        break;
      case "date":
        row[f.name] = str(raw, 10);
        if (!/^\d{4}-\d{2}-\d{2}$/.test(row[f.name] as string)) errors[f.name] = "Choose a date.";
        break;
      case "number": {
        const n = Number(raw);
        if (!Number.isInteger(n) || n < f.min || n > f.max) errors[f.name] = `Enter a whole number from ${f.min} to ${f.max}.`;
        else if (f.step && n % f.step !== 0) errors[f.name] = `Use a multiple of ${f.step}.`;
        row[f.name] = n;
        break;
      }
      case "boolean":
        row[f.name] = raw === true;
        break;
      case "select":
        row[f.name] = f.options.includes(String(raw)) ? String(raw) : f.options[0];
        break;
      case "lines":
        row[f.name] = (Array.isArray(raw) ? raw : []).map((v) => str(v, 3000)).filter(Boolean).slice(0, 60);
        break;
      case "refs":
        row[f.name] = (Array.isArray(raw) ? raw : []).map((v) => str(v, 120)).filter((v) => SLUG.test(v)).slice(0, 40);
        break;
      case "ref":
        row[f.name] = SLUG.test(str(raw, 120)) ? str(raw, 120) : "";
        break;
      case "pairs": {
        const [a, b] = f.keys;
        row[f.name] = (Array.isArray(raw) ? raw : [])
          .map((item) => {
            const o = (item ?? {}) as Record<string, unknown>;
            return { [a.key]: str(o[a.key], 300), [b.key]: str(o[b.key], 3000) };
          })
          .filter((o) => o[a.key] || o[b.key])
          .slice(0, 40);
        if ((row[f.name] as Record<string, string>[]).some((o) => !o[a.key] || !o[b.key])) {
          errors[f.name] = `Fill in both parts of every item, or remove the item.`;
        }
        break;
      }
      case "object": {
        const o = (raw ?? {}) as Record<string, unknown>;
        const value = Object.fromEntries(f.keys.map((k) => [k.key, str(o[k.key], k.long ? 3000 : 300)]));
        const empty = Object.values(value).every((v) => !v);
        row[f.name] = f.optional && empty ? null : value;
        break;
      }
    }
    if (f.required && !errors[f.name]) {
      const v = row[f.name];
      if (v === "" || (Array.isArray(v) && v.length === 0)) errors[f.name] = "This is required.";
    }
  }
  return Object.keys(errors).length > 0 ? { ok: false, errors } : { ok: true, row };
}

/* ------------------------------------------------------------------ */
/* Inbox statuses                                                      */
/* ------------------------------------------------------------------ */

export const STATUSES = {
  contact_messages: ["new", "replied", "qualified", "closed", "spam"],
  job_applications: ["new", "reviewing", "interview", "offer", "rejected", "withdrawn"],
  bookings: ["confirmed", "completed", "no_show", "cancelled"],
} as const;
export type InboxTable = keyof typeof STATUSES;

export const statusLabel = (status: string) => status.replace(/_/g, " ").replace(/^./, (c) => c.toUpperCase());
