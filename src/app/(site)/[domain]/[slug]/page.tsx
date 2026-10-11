import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { getTenantByDomain } from "@/services/tenant.service";
import { buildTenantMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ domain: string; slug: string }>;
}): Promise<Metadata> {
  const { domain, slug } = await params;
  const tenant = await getTenantByDomain(domain);
  if (!tenant) return { title: "Halaman Tidak Ditemukan" };

  const item = await prisma.catalogItem.findUnique({
    where: { tenantId_slug: { tenantId: tenant.id, slug } },
  });
  if (!item) return { title: "Item Tidak Ditemukan" };

  return buildTenantMetadata(tenant, {
    title: `${item.title} — ${tenant.businessName}`,
    description: item.description ?? undefined,
    path: `/${slug}`,
  });
}

export default async function CatalogDetailPage({
  params,
}: {
  params: Promise<{ domain: string; slug: string }>;
}) {
  const { domain, slug } = await params;
  const tenant = await getTenantByDomain(domain);
  if (!tenant) notFound();

  const item = await prisma.catalogItem.findUnique({
    where: { tenantId_slug: { tenantId: tenant.id, slug } },
  });
  if (!item) notFound();

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: tenant.businessName, url: `https://${domain}` },
    { name: item.title, url: `https://${domain}/${slug}` },
  ]);

  const specs = item.specsJson as Record<string, string> | null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="min-h-screen bg-white">
        {/* Header */}
        <div
          className="py-4 px-6 text-white text-center font-bold text-lg"
          style={{ backgroundColor: tenant.themeColor }}
        >
          {tenant.businessName}
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-6">
            <a href="/" className="hover:underline">
              {tenant.businessName}
            </a>
            <span className="mx-2">/</span>
            <span className="text-gray-800 font-medium">{item.title}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Gambar */}
            <div>
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full rounded-2xl object-cover aspect-video"
              />
              {item.images.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {item.images.slice(0, 4).map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`${item.title} ${i + 1}`}
                      className="rounded-xl object-cover aspect-square"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Detail */}
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {item.title}
              </h1>

              {item.price && (
                <div className="mb-4">
                  {item.pricePrefix && (
                    <p className="text-sm text-gray-500">{item.pricePrefix}</p>
                  )}
                  <p
                    className="text-3xl font-bold"
                    style={{ color: tenant.themeColor }}
                  >
                    Rp {Number(item.price).toLocaleString("id-ID")}
                  </p>
                </div>
              )}

              {item.description && (
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {item.description}
                </p>
              )}

              {/* Spesifikasi */}
              {specs && Object.keys(specs).length > 0 && (
                <div className="mb-6">
                  <h2 className="font-semibold text-gray-700 mb-3">Spesifikasi</h2>
                  <div className="space-y-2">
                    {Object.entries(specs).map(([key, val]) => (
                      <div
                        key={key}
                        className="flex justify-between text-sm border-b border-gray-100 pb-2"
                      >
                        <span className="text-gray-500">{key}</span>
                        <span className="font-medium text-gray-700">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA WhatsApp */}
              <a
                href={`https://wa.me/${tenant.whatsappNumber}?text=${encodeURIComponent(`Halo, saya tertarik dengan *${item.title}*. Mohon info lebih lanjut.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-white font-semibold text-lg transition-opacity hover:opacity-90"
                style={{ backgroundColor: tenant.themeColor }}
              >
                💬 Tanya via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
