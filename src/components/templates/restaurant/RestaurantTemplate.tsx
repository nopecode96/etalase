import { FloatingWhatsApp } from "@/components/common/FloatingWhatsApp";
import type { Tenant, CatalogItem, GalleryItem, Testimonial, TenantCategory } from "@/generated/prisma";

type TenantWithRelations = Tenant & {
  category: TenantCategory;
  catalogs: CatalogItem[];
  galleries: GalleryItem[];
  testimonials: Testimonial[];
};

export default function RestaurantTemplate({ tenant }: { tenant: TenantWithRelations }) {
  // Kelompokkan menu berdasarkan kategori
  const menuByCategory = tenant.catalogs.reduce<Record<string, CatalogItem[]>>(
    (acc, item) => {
      const cat = item.category ?? "Menu";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(item);
      return acc;
    },
    {}
  );

  return (
    <div className="min-h-screen bg-amber-50">
      <header className="sticky top-0 z-40 text-white px-6 py-4 flex items-center justify-between shadow-md" style={{ backgroundColor: tenant.themeColor }}>
        <h1 className="font-bold text-lg">{tenant.businessName}</h1>
        <a href={`https://wa.me/${tenant.whatsappNumber}?text=${encodeURIComponent("Halo, saya ingin reservasi meja.")}`} target="_blank" rel="noopener noreferrer" className="bg-white text-sm font-semibold px-4 py-2 rounded-full" style={{ color: tenant.themeColor }}>
          Reservasi Meja
        </a>
      </header>

      <section className="text-white py-24 px-6 text-center" style={{ background: tenant.heroBannerUrl ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${tenant.heroBannerUrl}) center/cover` : `linear-gradient(135deg, ${tenant.themeColor}, #92400e)` }}>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">{tenant.heroTitle ?? tenant.businessName}</h2>
        {tenant.heroSubtitle && <p className="text-xl text-white/90 mb-8">{tenant.heroSubtitle}</p>}
        {tenant.geoCity && <p className="text-sm text-white/70 mb-6">📍 {tenant.geoCity}</p>}
        <a href={`https://wa.me/${tenant.whatsappNumber}?text=${encodeURIComponent("Halo, saya ingin reservasi meja.")}`} target="_blank" rel="noopener noreferrer" className="inline-block bg-yellow-400 text-gray-900 font-bold px-8 py-4 rounded-xl text-lg">
          🍽️ Reservasi via WhatsApp
        </a>
      </section>

      {/* Menu */}
      {Object.keys(menuByCategory).length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Menu Kami</h2>
            {Object.entries(menuByCategory).map(([cat, items]) => (
              <div key={cat} className="mb-12">
                <h3 className="text-xl font-bold text-gray-700 mb-4 border-b pb-2" style={{ borderColor: tenant.themeColor }}>
                  {cat}
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {items.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm flex gap-4">
                      <img src={item.imageUrl} alt={item.title} className="w-28 h-28 object-cover flex-shrink-0" />
                      <div className="p-4 flex-1">
                        <h4 className="font-bold text-gray-800">{item.title}</h4>
                        {item.description && <p className="text-gray-500 text-xs mt-1 line-clamp-2">{item.description}</p>}
                        {item.price && (
                          <p className="font-bold mt-2" style={{ color: tenant.themeColor }}>
                            Rp {Number(item.price).toLocaleString("id-ID")}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Galeri */}
      {tenant.galleries.length > 0 && (
        <section className="py-16 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Suasana Tempat</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {tenant.galleries.map((g) => (
                <img key={g.id} src={g.imageUrl} alt={g.caption ?? "Suasana"} className="rounded-2xl object-cover aspect-square w-full" />
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="text-white py-8 px-6 text-center" style={{ backgroundColor: tenant.themeColor }}>
        <p className="font-bold">{tenant.businessName}</p>
        {tenant.address && <p className="text-sm text-white/80 mt-1">{tenant.address}</p>}
      </footer>
      <FloatingWhatsApp whatsappNumber={tenant.whatsappNumber} businessName={tenant.businessName} themeColor={tenant.themeColor} />
    </div>
  );
}
