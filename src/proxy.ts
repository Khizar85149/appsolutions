import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, decodeSession } from "@/server/admin/cookie";

/**
 * Gate for the admin panel. Runs before any /admin page is rendered and
 * sends visitors without a valid session cookie to the sign-in page with a
 * real redirect. It runs for /admin only, so the public site is unaffected.
 *
 * This is the first of two checks. Pages and actions verify the session
 * again themselves (requireAdmin in src/server/admin/session.ts).
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();
  if (decodeSession(request.cookies.get(ADMIN_COOKIE)?.value)) return NextResponse.next();

  // Résumé downloads answer with a plain 401 rather than a sign-in page.
  if (pathname.endsWith("/resume")) return new NextResponse("Sign in to the admin panel first.", { status: 401 });
  return NextResponse.redirect(new URL("/admin/login", request.url));
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
