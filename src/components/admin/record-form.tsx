"use client";

import { useState, useTransition } from "react";
import { ArrowDown, ArrowSquareOut, ArrowUp, Plus, Trash } from "@phosphor-icons/react/dist/ssr";
import {
  slugify,
  TABLES,
  type ContentTable,
  type Field,
  type Key,
  type RowValues,
} from "@/lib/admin-schema";
import { saveContent } from "@/server/admin/actions";
import { DeleteButton } from "./controls";

export type RefOptions = Partial<Record<ContentTable, { slug: string; label: string }[]>>;

type Pair = Record<string, string>;

/** Fields that sit two to a row on wide screens. Everything else takes the full width. */
const isShort = (f: Field) => ["text", "select", "number", "date", "boolean", "ref"].includes(f.type);

/**
 * The create and edit form for every content type. It is drawn entirely from
 * the table definition in src/lib/admin-schema.ts.
 */
export function RecordForm({
  table,
  initial,
  originalSlug,
  options,
  created = false,
}: {
  table: ContentTable;
  initial: RowValues;
  /** null when creating a new record. */
  originalSlug: string | null;
  options: RefOptions;
  created?: boolean;
}) {
  const def = TABLES[table];
  const isNew = originalSlug === null;

  // "lines" fields are edited as text, one item per line, and split when saving.
  const [values, setValues] = useState<RowValues>(() => {
    const v: RowValues = { ...initial };
    for (const f of def.sections.flatMap((s) => s.fields)) {
      if (f.type === "lines") v[f.name] = (Array.isArray(v[f.name]) ? (v[f.name] as string[]) : []).join("\n");
      if (f.type === "object" && !v[f.name]) v[f.name] = Object.fromEntries(f.keys.map((k) => [k.key, ""]));
      if (f.type === "date") v[f.name] = String(v[f.name] ?? "").slice(0, 10);
    }
    return v;
  });
  const [slug, setSlug] = useState(originalSlug ?? "");
  const [slugTouched, setSlugTouched] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<{ tone: "ok" | "error"; text: string } | null>(
    created ? { tone: "ok", text: "Created. It is now live if marked visible." } : null,
  );
  const [pending, start] = useTransition();

  const set = (name: string, value: unknown) => {
    setValues((v) => ({ ...v, [name]: value }));
    setMessage(null);
    if (errors[name]) setErrors((e) => ({ ...e, [name]: "" }));
    if (isNew && !slugTouched && name === def.titleColumn) setSlug(slugify(String(value)));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: RowValues = { ...values, slug };
    for (const f of def.sections.flatMap((s) => s.fields)) {
      if (f.type === "lines") payload[f.name] = String(values[f.name] ?? "").split("\n");
    }
    start(async () => {
      const result = await saveContent(table, originalSlug, payload);
      // A successful create redirects to the edit page, so there is no result to read.
      if (!result) return;
      if (result.ok) {
        setErrors({});
        setMessage({ tone: "ok", text: "Saved. The website is updated." });
      } else {
        setErrors(result.errors ?? {});
        setMessage({ tone: "error", text: result.message });
        const first = Object.keys(result.errors ?? {})[0];
        if (first) document.getElementById(`f-${first}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  };

  const control = (f: Field) => {
    const id = `f-${f.name}`;
    const invalid = Boolean(errors[f.name]);
    const common = { id, "aria-invalid": invalid || undefined, "aria-describedby": f.help ? `${id}-help` : undefined };
    switch (f.type) {
      case "text":
        return <input {...common} className="field" value={String(values[f.name] ?? "")} onChange={(e) => set(f.name, e.target.value)} />;
      case "textarea":
        return (
          <textarea {...common} rows={3} className="field" value={String(values[f.name] ?? "")} onChange={(e) => set(f.name, e.target.value)} />
        );
      case "date":
        return (
          <input {...common} type="date" className="field" value={String(values[f.name] ?? "")} onChange={(e) => set(f.name, e.target.value)} />
        );
      case "number":
        return (
          <input
            {...common}
            type="number"
            min={f.min}
            max={f.max}
            step={f.step ?? 1}
            className="field"
            value={String(values[f.name] ?? 0)}
            onChange={(e) => set(f.name, e.target.value === "" ? "" : Number(e.target.value))}
          />
        );
      case "select":
        return (
          <select {...common} className="field cursor-pointer" value={String(values[f.name] ?? "")} onChange={(e) => set(f.name, e.target.value)}>
            {f.options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        );
      case "ref":
        return (
          <select {...common} className="field cursor-pointer" value={String(values[f.name] ?? "")} onChange={(e) => set(f.name, e.target.value)}>
            <option value="">None</option>
            {(options[f.table] ?? []).map((o) => (
              <option key={o.slug} value={o.slug}>
                {o.label}
              </option>
            ))}
          </select>
        );
      case "lines":
        return (
          <textarea
            {...common}
            rows={f.rows ?? 6}
            className="field"
            value={String(values[f.name] ?? "")}
            onChange={(e) => set(f.name, e.target.value)}
          />
        );
      case "boolean":
        return (
          <label className="flex min-h-10 cursor-pointer items-center gap-3">
            <input
              id={id}
              type="checkbox"
              className="h-4.5 w-4.5 cursor-pointer accent-[#3f5a0e]"
              checked={values[f.name] === true}
              onChange={(e) => set(f.name, e.target.checked)}
            />
            <span>{f.label}</span>
          </label>
        );
      case "refs": {
        const selected = Array.isArray(values[f.name]) ? (values[f.name] as string[]) : [];
        const list = options[f.table] ?? [];
        if (list.length === 0) return <p className="text-sm text-stone">Nothing to choose from yet.</p>;
        return (
          <div id={id} className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {list.map((o) => (
              <label key={o.slug} className="flex cursor-pointer items-start gap-2.5">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-[#3f5a0e]"
                  checked={selected.includes(o.slug)}
                  onChange={(e) => set(f.name, e.target.checked ? [...selected, o.slug] : selected.filter((s) => s !== o.slug))}
                />
                <span>{o.label}</span>
              </label>
            ))}
          </div>
        );
      }
      case "object": {
        const value = (values[f.name] ?? {}) as Pair;
        return (
          <div id={id} className="grid gap-3 rounded-lg border border-rule bg-card p-4 sm:grid-cols-2">
            {f.keys.map((k) => (
              <div key={k.key} className={k.long ? "sm:col-span-2" : ""}>
                <label htmlFor={`${id}-${k.key}`} className="mb-1 block text-xs text-stone">
                  {k.label}
                </label>
                {k.long ? (
                  <textarea
                    id={`${id}-${k.key}`}
                    rows={3}
                    className="field"
                    value={value[k.key] ?? ""}
                    onChange={(e) => set(f.name, { ...value, [k.key]: e.target.value })}
                  />
                ) : (
                  <input
                    id={`${id}-${k.key}`}
                    className="field"
                    value={value[k.key] ?? ""}
                    onChange={(e) => set(f.name, { ...value, [k.key]: e.target.value })}
                  />
                )}
              </div>
            ))}
          </div>
        );
      }
      case "pairs":
        return (
          <PairsEditor
            id={id}
            keys={f.keys}
            items={Array.isArray(values[f.name]) ? (values[f.name] as Pair[]) : []}
            onChange={(items) => set(f.name, items)}
          />
        );
    }
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-5 pb-24">
      {def.sections.map((section, index) => (
        <section key={section.title} className="acard p-5 md:p-7">
          <h2 className="text-base font-medium">{section.title}</h2>
          {section.note && <p className="mt-1 text-sm text-stone">{section.note}</p>}
          <div className="mt-5 grid gap-x-5 gap-y-5 md:grid-cols-2">
            {index === 0 && (
              <div className="md:col-span-2">
                <label htmlFor="f-slug" className="label">
                  Web address
                </label>
                {isNew ? (
                  <div className="flex items-center gap-2">
                    <span className="shrink-0 text-sm text-stone">{def.path}/</span>
                    <input
                      id="f-slug"
                      className="field"
                      value={slug}
                      aria-invalid={Boolean(errors.slug) || undefined}
                      onChange={(e) => {
                        setSlugTouched(true);
                        setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"));
                        if (errors.slug) setErrors((er) => ({ ...er, slug: "" }));
                      }}
                    />
                  </div>
                ) : (
                  <p id="f-slug" className="flex min-h-10 items-center rounded-lg border border-rule bg-card px-3 text-stone">
                    {def.path}/{slug}
                  </p>
                )}
                {errors.slug ? (
                  <p role="alert" className="mt-1.5 text-sm text-danger">
                    {errors.slug}
                  </p>
                ) : (
                  <p className="mt-1.5 text-xs text-stone">
                    {isNew ? "Filled in from the name. It cannot be changed after the record is created." : "The address cannot be changed, so existing links keep working."}
                  </p>
                )}
              </div>
            )}
            {section.fields.map((f) => (
              <div key={f.name} className={isShort(f) ? "" : "md:col-span-2"}>
                {f.type === "boolean" ? (
                  <span className="label invisible hidden md:block" aria-hidden="true">
                    &nbsp;
                  </span>
                ) : (
                  <label htmlFor={`f-${f.name}`} className="label">
                    {f.label}
                    {!f.required && f.type !== "pairs" && f.type !== "refs" && f.type !== "object" && (
                      <span className="font-normal text-stone"> (optional)</span>
                    )}
                  </label>
                )}
                {control(f)}
                {errors[f.name] ? (
                  <p role="alert" className="mt-1.5 text-sm text-danger">
                    {errors[f.name]}
                  </p>
                ) : (
                  f.help && (
                    <p id={`f-${f.name}-help`} className="mt-1.5 text-xs text-stone">
                      {f.help}
                    </p>
                  )
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Save bar, always in reach */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-rule bg-white/95 backdrop-blur lg:left-[15.5rem]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-5 py-3 md:px-10">
          <button type="submit" disabled={pending} className="abtn abtn-primary min-w-32">
            {pending ? "Saving" : isNew ? `Create ${def.singular}` : "Save changes"}
          </button>
          {!isNew && (
            <a href={`${def.path}/${slug}`} target="_blank" rel="noreferrer" className="abtn abtn-ghost">
              View page
              <ArrowSquareOut size={15} aria-hidden="true" />
            </a>
          )}
          {message && (
            <p role="status" className={`text-sm ${message.tone === "ok" ? "text-moss" : "text-danger"}`}>
              {message.text}
            </p>
          )}
          {!isNew && (
            <span className="ml-auto flex items-center gap-3">
              <DeleteButton
                target={{ kind: "content", table, slug }}
                confirm={`Delete this ${def.singular}? Its page will be removed from the website. This cannot be undone.`}
              />
            </span>
          )}
        </div>
      </div>
    </form>
  );
}

/** Editor for a list of two-part items: add, remove and reorder. */
function PairsEditor({ id, keys, items, onChange }: { id: string; keys: [Key, Key]; items: Pair[]; onChange: (items: Pair[]) => void }) {
  const [a, b] = keys;
  const update = (i: number, key: string, value: string) => onChange(items.map((item, n) => (n === i ? { ...item, [key]: value } : item)));
  const move = (i: number, by: number) => {
    const next = [...items];
    const [item] = next.splice(i, 1);
    next.splice(i + by, 0, item);
    onChange(next);
  };
  const icon = "inline-flex h-8 w-8 items-center justify-center rounded-md text-stone transition-colors hover:bg-paper-deep hover:text-ink disabled:opacity-30 disabled:hover:bg-transparent";

  return (
    <div id={id} className="space-y-2.5">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2 rounded-lg border border-rule bg-card p-3">
          <div className={`grid min-w-0 flex-1 gap-2 ${b.long ? "" : "sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]"}`}>
            <input
              className="field"
              aria-label={`${a.label} ${i + 1}`}
              placeholder={a.label}
              value={item[a.key] ?? ""}
              onChange={(e) => update(i, a.key, e.target.value)}
            />
            {b.long ? (
              <textarea
                className="field"
                rows={2}
                aria-label={`${b.label} ${i + 1}`}
                placeholder={b.label}
                value={item[b.key] ?? ""}
                onChange={(e) => update(i, b.key, e.target.value)}
              />
            ) : (
              <input
                className="field"
                aria-label={`${b.label} ${i + 1}`}
                placeholder={b.label}
                value={item[b.key] ?? ""}
                onChange={(e) => update(i, b.key, e.target.value)}
              />
            )}
          </div>
          <div className={`flex shrink-0 ${b.long ? "flex-col" : "items-center"}`}>
            <button type="button" className={icon} aria-label={`Move item ${i + 1} up`} disabled={i === 0} onClick={() => move(i, -1)}>
              <ArrowUp size={15} aria-hidden="true" />
            </button>
            <button type="button" className={icon} aria-label={`Move item ${i + 1} down`} disabled={i === items.length - 1} onClick={() => move(i, 1)}>
              <ArrowDown size={15} aria-hidden="true" />
            </button>
            <button
              type="button"
              className={`${icon} hover:text-danger`}
              aria-label={`Remove item ${i + 1}`}
              onClick={() => onChange(items.filter((_, n) => n !== i))}
            >
              <Trash size={15} aria-hidden="true" />
            </button>
          </div>
        </div>
      ))}
      <button type="button" className="abtn abtn-ghost" onClick={() => onChange([...items, { [a.key]: "", [b.key]: "" }])}>
        <Plus size={14} weight="bold" aria-hidden="true" />
        Add item
      </button>
    </div>
  );
}
