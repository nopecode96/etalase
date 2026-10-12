import { NextRequest, NextResponse } from "next/server";

/**
 * EDGE ROUTING RESOLVER — etalase.online
 *
 * Next.js 16: File konvensi bernama proxy.ts dengan export function bernama `proxy`.
 *
 * Logika routing:
 * 1. ZERO SUBDOMAINS: Tidak ada format subdomain.
 * 2. Host dikelompokkan ke dua kategori:
 *    a. Domain Utama SaaS: etalase.online, www.etalase.online, localhost, 127.0.0.1, etalase.local
 *    b. Custom Domain Mandiri Klien: domain mandiri (misal: bastian-sales.com, bastian-rental.com)
 * 3. Jika domain kustom, rewrite ke rute dinamis tenant: /[domain] (route group (site) tidak muncul di URL rewrite)
 */

export function proxy(req: NextRequest) {
  const url = req.nextUrl;
  const rawHost = req.headers.get("host") || "";
  // Bersihkan port jika berjalan di lingkungan lokal/pengujian (contoh: localhost:3005 -> localhost)
  const host = rawHost.replace(/:\d+$/, "").toLowerCase();

  // Daftar host utama SaaS (Landing Page SaaS & CMS terpadu)
  const isMainSaas =
    host === "etalase.online" ||
    host === "www.etalase.online" ||
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "etalase.local";

  // Bypass route aset publik dan internal Next.js
  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/api") ||
    url.pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Jika domain SaaS utama, cek apakah mengakses subpath preview tenant
  if (isMainSaas) {
    const previewSlugs = [
      "bastian-sales",
      "bastian-rental",
      "properti-bandung",
      "kuliner-kita",
      "jasaprofesional",
    ];

    const firstSegment = url.pathname.split("/")[1];
    if (previewSlugs.includes(firstSegment)) {
      // Rewrite request ke handler rute dinamis tenant: /[domain]
      return NextResponse.rewrite(new URL(`/${firstSegment}`, req.url));
    }

    return NextResponse.next();
  }

  // Jika domain kustom klien (Pure Custom Domain mandiri)
  // Rewrite rute secara transparan ke handler rute dinamis tenant: (site)/[domain]
  return NextResponse.rewrite(new URL(`/${host}${url.pathname}`, req.url));
}

// Kompatibilitas alias untuk Next.js tooling jika mengecek middleware
export const middleware = proxy;

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
