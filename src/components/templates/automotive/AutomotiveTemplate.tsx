import Link from "next/link";
import { FloatingWhatsApp } from "@/components/common/FloatingWhatsApp";
import type { Tenant, CatalogItem, GalleryItem, Testimonial, TenantCategory } from "@/generated/prisma";

type TenantWithRelations = Tenant & {
  category: TenantCategory;
  catalogs: CatalogItem[];
  galleries: GalleryItem[];
  testimonials: Testimonial[];
};

interface Props {
  tenant: TenantWithRelations;
}

export default function AutomotiveTemplate({ tenant }: Props) {
  const featuredCatalogs = tenant.catalogs.filter((c) => c.isFeatured).slice(0, 6);
  const allCatalogs = tenant.catalogs.slice(0, 12);

  return (
    <div className="min-h-screen bg-white" style={{ "--theme": tenant.themeColor } as React.CSSProperties}>
      {/* Header / Nav */}
      <header
        className="sticky top-0 z-40 text-white px-6 py-4 flex items-center justify-between shadow-md"
        style={{ backgroundColor: tenant.themeColor }}
      >
        <div className="flex items-center gap-3">
          {tenant.logoUrl && (
            <img src={tenant.logoUrl} alt={tenant.businessName} className="h-8 w-auto rounded" />
          )}
          <h1 className="font-bold text-lg">{tenant.businessName}</h1>
        </div>
        <a
          href={`https://wa.me/${tenant.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-sm font-semibold px-4 py-2 rounded-full transition-opacity hover:opacity-90"
          style={{ color: tenant.themeColor }}
        >
          Hubungi Kami
        </a>
      </header>

      {/* Hero */}
      <section
        className="text-white py-20 px-6 text-center relative overflow-hidden"
        style={{
          background: tenant.heroBannerUrl
            ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${tenant.heroBannerUrl}) center/cover`
            : `linear-gradient(135deg, ${tenant.themeColor}, #1e40af)`,
        }}
      >
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            {tenant.heroTitle ?? `Selamat Datang di ${tenant.businessName}`}
          </h2>
          {tenant.heroSubtitle && (
            <p className="text-xl text-white/90 mb-8">{tenant.heroSubtitle}</p>
          )}
          {tenant.geoCity && (
            <p className="text-sm text-white/70 mb-6">📍 {tenant.geoCity}</p>
          )}
          <a
            href={`https://wa.me/${tenant.whatsappNumber}?text=${encodeURIComponent("Halo, saya ingin konsultasi mobil.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow-400 text-gray-900 font-bold px-8 py-4 rounded-xl text-lg hover:bg-yellow-300 transition-colors"
          >
            🚗 Konsultasi Gratis via WhatsApp
          </a>
        </div>
      </section>

      {/* Unit Unggulan */}
      {featuredCatalogs.length > 0 && (
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Unit Unggulan</h2>
            <p className="text-gray-500 mb-8">Pilihan terbaik untuk Anda</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCatalogs.map((item) => (
                <CatalogCard key={item.id} item={item} domain={tenant.customDomain} themeColor={tenant.themeColor} waNumber={tenant.whatsappNumber} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Semua Unit */}
      {allCatalogs.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Semua Unit Tersedia</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allCatalogs.map((item) => (
                <CatalogCard key={item.id} item={item} domain={tenant.customDomain} themeColor={tenant.themeColor} waNumber={tenant.whatsappNumber} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Galeri Serah Terima */}
      {tenant.galleries.length > 0 && (
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">📸 Galeri Serah Terima</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {tenant.galleries.map((g) => (
                <div key={g.id} className="relative group">
                  <img
                    src={g.imageUrl}
                    alt={g.caption ?? "Serah terima unit"}
                    className="rounded-xl object-cover aspect-square w-full"
                  />
                  {g.caption && (
                    <div className="absolute inset-0 bg-black/60 rounded-xl flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-xs">{g.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimoni */}
      {tenant.testimonials.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              ⭐ Kata Konsumen
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tenant.testimonials.map((t) => (
                <div key={t.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <div className="flex mb-3">
                    {"⭐".repeat(t.rating)}
                  </div>
                  <p className="text-gray-600 text-sm italic mb-4">&ldquo;{t.comment}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    {t.avatarUrl && (
                      <img src={t.avatarUrl} alt={t.clientName} className="w-10 h-10 rounded-full object-cover" />
                    )}
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{t.clientName}</p>
                      {t.clientRole && <p className="text-xs text-gray-500">{t.clientRole}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer
        className="text-white py-8 px-6 text-center"
        style={{ backgroundColor: tenant.themeColor }}
      >
        <p className="font-bold text-lg mb-1">{tenant.businessName}</p>
        {tenant.address && <p className="text-sm text-white/80">{tenant.address}</p>}
        {tenant.geoCity && <p className="text-xs text-white/60 mt-1">📍 {tenant.geoCity}</p>}
      </footer>

      {/* Floating WhatsApp */}
      <FloatingWhatsApp
        whatsappNumber={tenant.whatsappNumber}
        businessName={tenant.businessName}
        themeColor={tenant.themeColor}
      />
    </div>
  );
}

function CatalogCard({
  item,
  domain,
  themeColor,
  waNumber,
}: {
  item: CatalogItem;
  domain: string;
  themeColor: string;
  waNumber: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <img
        src={item.imageUrl}
        alt={item.title}
        className="w-full object-cover aspect-video"
      />
      <div className="p-4">
        {item.category && (
          <span className="text-xs text-gray-500 mb-1 block">{item.category}</span>
        )}
        <h3 className="font-bold text-gray-800 mb-1">{item.title}</h3>
        {item.price && (
          <p className="font-semibold text-sm" style={{ color: themeColor }}>
            {item.pricePrefix && <span className="text-gray-500 font-normal">{item.pricePrefix} </span>}
            Rp {Number(item.price).toLocaleString("id-ID")}
          </p>
        )}
        <div className="flex gap-2 mt-3">
          <Link
            href={`/${item.slug}`}
            className="flex-1 text-center text-xs border rounded-lg py-2 font-medium text-gray-600 hover:border-gray-400 transition-colors"
          >
            Detail
          </Link>
          <a
            href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Halo, saya tertarik dengan *${item.title}*. Bisa info lebih lanjut?`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center text-xs py-2 rounded-lg text-white font-medium transition-opacity hover:opacity-90"
            style={{ backgroundColor: themeColor }}
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
