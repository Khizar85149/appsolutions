import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Admin | Apps Solutions Tech" },
  robots: { index: false, follow: false },
};

/**
 * Admin pages depend on who is signed in, so none of them can be prebuilt.
 * This tells Next.js to render them per request instead of looking for a
 * static shell.
 */
export const instant = false;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
