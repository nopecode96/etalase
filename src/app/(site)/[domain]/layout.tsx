import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTenantFullByDomain } from "@/services/tenant.service";
import { buildTenantMetadata, buildLocalBusinessJsonLd } from "@/lib/seo";
import "@/app/globals.css";

// Layout ini di-rewrite oleh proxy.ts dari domain custom klien
// URL asli: salesmobilbandung.com/
// URL internal: /site/salesmobilbandung.com/

export async function generateMetadata({
  params,
}: {
  params: Promise<{ domain: string }>;
}): Promise<Metadata> {
  const { domain } = await params;
  const tenant = await getTenantFullByDomain(domain);
  if (!tenant) return { title: "Website Tidak Ditemukan" };

  return buildTenantMetadata(tenant);
}

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const tenant = await getTenantFullByDomain(domain);

  if (!tenant) {
    notFound();
  }

  const jsonLd = buildLocalBusinessJsonLd(tenant);

  return (
    <html lang="id">
      <head>
        {/* Theme color dari branding tenant */}
        <meta name="theme-color" content={tenant.themeColor} />
      </head>
      <body>
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
