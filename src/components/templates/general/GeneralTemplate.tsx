import { FloatingWhatsApp } from "@/components/common/FloatingWhatsApp";
import type { Tenant, CatalogItem, GalleryItem, Testimonial, TenantCategory } from "@/generated/prisma";

type TenantWithRelations = Tenant & {
  category: TenantCategory;
  catalogs: CatalogItem[];
  galleries: GalleryItem[];
  testimonials: Testimonial[];
};

export default function GeneralTemplate({ tenant }: { tenant: TenantWithRelations }) {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-40 text-white px-6 py-4 flex items-center justify-between shadow-md" style={{ backgroundColor: tenant.themeColor }}>
        <h1 className="font-bold text-lg">{tenant.businessName}</h1>
        <a href={`https://wa.me/${tenant.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="bg-white text-sm font-semibold px-4 py-2 rounded-full" style={{ color: tenant.themeColor }}>
          Hubungi Kami
        </a>
      </header>

      <section className="text-white py-24 px-6 text-center" style={{ background: `linear-gradient(135deg, ${tenant.themeColor}, #374151)` }}>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">{tenant.heroTitle ?? tenant.businessName}</h2>
        {tenant.heroSubtitle && <p className="text-xl text-white/90 mb-8">{tenant.heroSubtitle}</p>}
        <a href={`https://wa.me/${tenant.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="inline-block bg-yellow-400 text-gray-900 font-bold px-8 py-4 rounded-xl text-lg">
          💬 Hubungi via WhatsApp
        </a>
      </section>

      {tenant.catalogs.length > 0 && (
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Layanan Kami</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tenant.catalogs.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">
                  <img src={item.imageUrl} alt={item.title} className="w-full object-cover aspect-video" />
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800">{item.title}</h3>
                    {item.price && (
                      <p className="font-semibold text-sm mt-1" style={{ color: tenant.themeColor }}>
                        {item.pricePrefix} Rp {Number(item.price).toLocaleString("id-ID")}
                      </p>
                    )}
                    {item.description && <p className="text-gray-500 text-sm mt-2 line-clamp-2">{item.description}</p>}
                  </div>
                </div>
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
