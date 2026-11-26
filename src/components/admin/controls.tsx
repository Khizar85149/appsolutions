"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useActionState, useRef, useState, useTransition, type ReactNode } from "react";
import { STATUSES, statusLabel, type InboxTable } from "@/lib/admin-schema";
import {
  addBlock,
  deleteBlock,
  deleteContent,
  deleteInboxItem,
  setPublished,
  setStatus,
  signIn,
  type LoginState,
  type Result,
} from "@/server/admin/actions";

interface NavLinkProps {
  href: string;
  exact?: boolean;
  /** Small count shown at the end of the link. */
  badge?: ReactNode;
  children: ReactNode;
}

/** Sidebar link that knows when it is the current section. */
export function NavLink(props: NavLinkProps) {
  // The address is only known in the browser, so the plain link is what the server sends first.
  return (
    <Suspense fallback={<NavAnchor {...props} active={false} />}>
      <CurrentNavLink {...props} />
    </Suspense>
  );
}

function CurrentNavLink(props: NavLinkProps) {
  const pathname = usePathname();
  const { href, exact = false } = props;
  return <NavAnchor {...props} active={exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`)} />;
}

function NavAnchor({ href, badge, children, active }: NavLinkProps & { active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-lg px-3 py-2 text-sm transition-colors ${
        active ? "bg-ink-line text-paper" : "text-fog hover:bg-ink-soft hover:text-paper"
      }`}
    >
      {children}
      {badge}
    </Link>
  );
}

export function LoginForm({ disabled }: { disabled: boolean }) {
  const [state, action, pending] = useActionState<LoginState, FormData>(signIn, { message: "", email: "" });
  return (
    <form action={action} className="mt-7 space-y-4">
      <div>
        <label htmlFor="email" className="label">
          Email
        </label>
        <input id="email" name="email" type="email" autoComplete="username" required defaultValue={state.email} className="field" />
      </div>
      <div>
        <label htmlFor="password" className="label">
          Password
        </label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className="field" />
      </div>
      {state.message && (
        <p role="alert" className="text-sm text-danger">
          {state.message}
        </p>
      )}
      <button type="submit" disabled={pending || disabled} className="abtn abtn-primary w-full">
        {pending ? "Signing in" : "Sign in"}
      </button>
    </form>
  );
}

/** Dropdown that saves the new status as soon as it is chosen. */
export function StatusSelect({ table, id, status }: { table: InboxTable; id: string; status: string }) {
  const [pending, start] = useTransition();
  const [error, setError] = useState("");
  return (
    <div>
      <label className="sr-only" htmlFor={`status-${id}`}>
        Status
      </label>
      <select
        id={`status-${id}`}
        value={status}
        disabled={pending}
        onChange={(e) => {
          const next = e.target.value;
          setError("");
          start(async () => {
            const result = await setStatus(table, id, next);
            if (!result.ok) setError(result.message);
          });
        }}
        className="field min-w-40 cursor-pointer font-medium"
      >
        {STATUSES[table].map((s) => (
          <option key={s} value={s}>
            {statusLabel(s)}
          </option>
        ))}
      </select>
      {error && (
        <p role="alert" className="mt-1.5 max-w-56 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

/** Asks once, then deletes. The server redirects to the list afterwards. */
export function DeleteButton({
  target,
  confirm,
  label = "Delete",
}: {
  target: { kind: "inbox"; table: InboxTable; id: string } | { kind: "content"; table: string; slug: string };
  confirm: string;
  label?: string;
}) {
  const [pending, start] = useTransition();
  const [error, setError] = useState("");
  return (
    <>
      <button
        type="button"
        disabled={pending}
        className="abtn abtn-danger"
        onClick={() => {
          if (!window.confirm(confirm)) return;
          start(async () => {
            const result =
              target.kind === "inbox" ? await deleteInboxItem(target.table, target.id) : await deleteContent(target.table, target.slug);
            if (result && !result.ok) setError(result.message);
          });
        }}
      >
        {pending ? "Deleting" : label}
      </button>
      {error && (
        <span role="alert" className="text-sm text-danger">
          {error}
        </span>
      )}
    </>
  );
}

/** Switch in content lists: show or hide a record on the website. */
export function PublishSwitch({ table, slug, published, name }: { table: string; slug: string; published: boolean; name: string }) {
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      role="switch"
      aria-checked={published}
      aria-label={`${name}: visible on the website`}
      disabled={pending}
      onClick={() => start(async () => void (await setPublished(table, slug, !published)))}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors disabled:opacity-60 ${
        published ? "bg-moss" : "bg-rule"
      }`}
    >
      <span className={`inline-block h-4.5 w-4.5 rounded-full bg-white shadow-sm transition-transform ${published ? "translate-x-5.5" : "translate-x-1"}`} />
    </button>
  );
}

export function BlockForm() {
  const ref = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState<Result | null, FormData>(async (previous, form) => {
    const result = await addBlock(previous, form);
    if (result.ok) ref.current?.reset();
    return result;
  }, null);
  return (
    <form ref={ref} action={action} className="grid gap-4 border-t border-rule p-5 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.4fr_auto] lg:items-end">
      <div>
        <label htmlFor="block-from" className="label">
          From
        </label>
        <input id="block-from" name="from" type="datetime-local" required className="field" />
      </div>
      <div>
        <label htmlFor="block-to" className="label">
          To
        </label>
        <input id="block-to" name="to" type="datetime-local" required className="field" />
      </div>
      <div>
        <label htmlFor="block-reason" className="label">
          Reason <span className="font-normal text-stone">(only you see this)</span>
        </label>
        <input id="block-reason" name="reason" maxLength={200} placeholder="Holiday, client workshop" className="field" />
      </div>
      <button type="submit" disabled={pending} className="abtn abtn-primary min-h-10">
        {pending ? "Blocking" : "Block time"}
      </button>
      {state && !state.ok && (
        <p role="alert" className="text-sm text-danger sm:col-span-2 lg:col-span-4">
          {state.message}
        </p>
      )}
    </form>
  );
}

export function RemoveBlockButton({ id }: { id: string }) {
  const [pending, start] = useTransition();
  return (
    <button type="button" disabled={pending} onClick={() => start(async () => void (await deleteBlock(id)))} className="abtn abtn-ghost">
      {pending ? "Removing" : "Remove"}
    </button>
  );
}
