import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, QrCode, Sparkles, MapPin } from "lucide-react";
import { getMarketingKitData } from "@/services/marketing-kit";
import { PrintButton } from "@/components/marketing-kit/PrintButton";

interface MarketingKitPageProps {
  params: {
    slug: string;
  };
}

export default async function MarketingKitPage({ params }: MarketingKitPageProps) {
  const { slug } = params;
  let kitData = null;

  try {
    const res = await getMarketingKitData(slug);
    if (res.success && res.data) {
      kitData = res.data;
    }
  } catch (e) {
    // Graceful fallback for mock/demo
  }

  if (!kitData) {
    if (slug === "demo") {
      kitData = {
        storeName: "Studio Demo Creative",
        storeSlug: "demo",
        storeUrl: "https://demo.etalase.online",
        qrVisitUrl: "https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=https://demo.etalase.online",
        qrReviewUrl: "https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=https://maps.google.com",
        googleReviewUrl: "https://maps.google.com",
        topProducts: [
          { title: "Preset Lightroom Pro", price: 49000 },
          { title: "Microphone Wireless", price: 189000 },
        ],
      };
    } else {
      notFound();
    }
  }

  return <MarketingKitView kit={kitData} />;
}

function MarketingKitView({ kit }: { kit: any }) {
  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 font-sans print:bg-white print:p-0">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8 print:hidden">
          <Link
            href={`/${kit.storeSlug}/admin`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Dashboard Admin</span>
          </Link>

          <PrintButton />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* KIT 1: Standee Meja Kasir (Tent Card Kasir) */}
          <div className="flex flex-col items-center">
            <h3 className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-1.5 print:hidden">
              <QrCode className="w-4 h-4 text-blue-600" />
              <span>Standee Meja Kasir (Ukuran A5)</span>
            </h3>

            <div className="w-[360px] bg-white border-2 border-slate-900 rounded-3xl p-6 text-center shadow-xl flex flex-col items-center print:shadow-none print:border-2">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg mb-3">
                E
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 leading-tight mb-1">
                {kit.storeName}
              </h2>
              <p className="text-xs text-slate-500 mb-6 font-mono">
                {kit.storeSlug}.etalase.online
              </p>

              {/* QR Code Scan Visit */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 mb-3 shadow-inner">
                <img
                  src={kit.qrVisitUrl}
                  alt="QR Visit"
                  className="w-44 h-44 object-contain rounded-lg"
                />
              </div>
              <div className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-4">
                📱 Scan untuk Lihat Menu &amp; Katalog
              </div>

              {/* Optional QR Google Maps Review */}
              {kit.qrReviewUrl && (
                <div className="pt-4 border-t border-slate-100 w-full flex items-center justify-center gap-3">
                  <img
                    src={kit.qrReviewUrl}
                    alt="QR Review"
                    className="w-12 h-12 object-contain rounded border border-slate-200"
                  />
                  <div className="text-left">
                    <div className="text-[11px] font-bold text-slate-800 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-rose-500" /> Review Bintang 5
                    </div>
                    <div className="text-[10px] text-slate-500">Scan &amp; Beri Review di Google Maps</div>
                  </div>
                </div>
              )}

              <div className="mt-6 text-[10px] text-slate-400">
                Ditenagai oleh etalase.online
              </div>
            </div>
          </div>

          {/* KIT 2: Poster Vertikal Story 9:16 (IG/TikTok/WA Status) */}
          <div className="flex flex-col items-center">
            <h3 className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-1.5 print:hidden">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Poster Story 9:16 (Instagram / TikTok / WA)</span>
            </h3>

            <div className="w-[320px] h-[568px] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 text-white rounded-3xl p-6 shadow-xl flex flex-col justify-between text-center relative overflow-hidden border border-slate-700 print:shadow-none">
              <div>
                <div className="inline-block bg-blue-500/20 text-blue-300 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-blue-400/30 mb-4">
                  Katalog Online Resmi
                </div>
                <h2 className="text-2xl font-black tracking-tight mb-1 text-white">
                  {kit.storeName}
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  {kit.storeSlug}.etalase.online
                </p>
              </div>

              {/* Center QR Code in Story */}
              <div className="bg-white p-3 rounded-2xl mx-auto shadow-2xl">
                <img
                  src={kit.qrVisitUrl}
                  alt="Story QR"
                  className="w-36 h-36 object-contain"
                />
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-300 mb-2">
                  👆 Screenshot atau Scan untuk Kunjungi Toko
                </p>
                <div className="text-[10px] text-slate-500 font-mono">
                  Order Cepat &bull; Bayar QRIS Instan &bull; 0% Komisi
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
