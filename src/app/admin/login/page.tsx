import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/controls";
import { LogoMark } from "@/components/logo";
import { site } from "@/lib/site";
import { getAdmin } from "@/server/admin/session";
import { isSupabaseConfigured } from "@/server/env";

export default async function AdminLoginPage() {
  if (await getAdmin()) redirect("/admin");

  return (
    <div className="admin flex min-h-dvh w-full items-center justify-center bg-paper px-5 py-12">
      <div className="w-full max-w-sm">
        <div className="acard p-7 md:p-8">
          <LogoMark size={36} />
          <h1 className="mt-6 text-xl font-medium tracking-tight">Sign in</h1>
          <p className="mt-1.5 text-stone">{site.name} admin panel</p>
          {!isSupabaseConfigured && (
            <p role="alert" className="mt-5 rounded-lg border border-rule bg-card px-4 py-3 text-sm">
              The database is not connected yet. Add the Supabase keys, then return here. See supabase/README.md.
            </p>
          )}
          <LoginForm disabled={!isSupabaseConfigured} />
        </div>
        <p className="mt-5 text-center text-sm text-stone">
          <Link href="/" className="link">
            Back to the website
          </Link>
        </p>
      </div>
    </div>
  );
}
