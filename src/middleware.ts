import { NextRequest, NextResponse } from "next/server";
import { env } from "./lib/config/env";
import { RESERVED_SLUGS } from "./lib/config/constants";

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files with extensions (e.g. .svg, .png, .jpg)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const path = url.pathname;

  // Bypass API routes, payment webhooks, and static asset paths from hostname rewriting
  if (path.startsWith("/api") || path.startsWith("/uploads") || path.startsWith("/pay")) {
    return NextResponse.next();
  }

  const rawHost = req.headers.get("host") || "";
  // Strip port for domain matching
  const host = rawHost.split(":")[0].toLowerCase();
  const rootDomain = env.NEXT_PUBLIC_ROOT_DOMAIN.split(":")[0].toLowerCase();

  // 1. Mabes (Super Admin) Routing: mabes.etalase.online or mabes.localhost
  if (host === `mabes.${rootDomain}` || host === "mabes.localhost") {
    return NextResponse.rewrite(new URL(`/mabes${path}`, req.url));
  }

  // 2. Main Portal: etalase.online, www.etalase.online, localhost, 127.0.0.1
  if (
    host === rootDomain ||
    host === `www.${rootDomain}` ||
    host === "localhost" ||
    host === "127.0.0.1"
  ) {
    return NextResponse.next();
  }

  // 3. Tenant Subdomain: [slug].etalase.online or [slug].localhost
  const isSubdomain =
    host.endsWith(`.${rootDomain}`) || host.endsWith(".localhost");

  if (isSubdomain) {
    const slug = host.replace(`.${rootDomain}`, "").replace(".localhost", "");

    // If it matches a reserved non-tenant slug, let it pass through to main portal
    if ((RESERVED_SLUGS as readonly string[]).includes(slug) && slug !== "demo") {
      return NextResponse.next();
    }

    // Rewrite to dynamic tenant storefront or admin: /[slug] or /[slug]/admin
    return NextResponse.rewrite(new URL(`/${slug}${path}`, req.url));
  }

  // 4. Custom Domain: namabrand.com (PRO Tier)
  // Rewrite to dynamic custom domain route
  return NextResponse.rewrite(new URL(`/custom/${host}${path}`, req.url));
}
