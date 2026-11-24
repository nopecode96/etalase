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
    // Check if path starts with localized prefix: /(id|en|ms|th|vi)(/.*)?
    const localeMatch = path.match(/^\/(id|en|ms|th|vi)(\/.*)?$/);
    if (localeMatch) {
      const locale = localeMatch[1];
      const restPath = localeMatch[2] || "/";
      const targetUrl = new URL(restPath, req.url);
      targetUrl.searchParams.set("lang", locale);
      const res = NextResponse.rewrite(targetUrl);
      res.headers.set("x-locale", locale);
      return res;
    }
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

    // Determine port and protocol for central domain redirects
    const rawHost = req.headers.get("host") || "";
    const port = rawHost.includes(":") ? `:${rawHost.split(":")[1]}` : "";
    const isLocal = host.endsWith(".localhost") || host === "localhost" || host === "127.0.0.1";
    const protocol = isLocal ? "http" : "https";
    const centralHost = isLocal ? `localhost${port}` : rootDomain;

    // A. Subdomain /login redirect to central /login (preserving query params & Google OAuth callback)
    if (path === "/login" || path.startsWith("/login/")) {
      const centralLoginUrl = new URL(`${protocol}://${centralHost}/login`);
      centralLoginUrl.searchParams.set("from_subdomain", slug);
      url.searchParams.forEach((val, key) => {
        centralLoginUrl.searchParams.set(key, val);
      });
      return NextResponse.redirect(centralLoginUrl, 307);
    }

    // B. Subdomain /register redirect to central /register with slug pre-filled
    if (path === "/register" || path.startsWith("/register/")) {
      const centralRegisterUrl = new URL(`${protocol}://${centralHost}/register`);
      centralRegisterUrl.searchParams.set("slug", slug);
      url.searchParams.forEach((val, key) => {
        if (key !== "slug") {
          centralRegisterUrl.searchParams.set(key, val);
        }
      });
      return NextResponse.redirect(centralRegisterUrl, 307);
    }

    // C. Subdomain /admin redirect to central /admin where tenant session is verified
    if (path === "/admin" || path.startsWith("/admin/")) {
      const centralAdminUrl = new URL(`${protocol}://${centralHost}${path}`);
      url.searchParams.forEach((val, key) => {
        centralAdminUrl.searchParams.set(key, val);
      });
      return NextResponse.redirect(centralAdminUrl, 307);
    }

    // D. Public storefront rewrite to dynamic tenant storefront /[slug]
    return NextResponse.rewrite(new URL(`/${slug}${path}`, req.url));
  }

  // 4. Custom Domain: namabrand.com (PRO Tier)
  // Rewrite to dynamic custom domain route
  return NextResponse.rewrite(new URL(`/custom/${host}${path}`, req.url));
}
