import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { GlobalHeader } from "@/components/saas/GlobalHeader";
import { GlobalFooter } from "@/components/saas/GlobalFooter";
import { Showcase4Archetypes } from "@/components/home/Showcase4Archetypes";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { SupportedLocale, SUPPORTED_LOCALES } from "@/lib/config/constants";
import { generateLocalizedMetadata } from "@/lib/seo/metadata-helper";

interface TemplatePageProps {
  searchParams?: {
    lang?: string;
  };
}

export async function generateMetadata({
  searchParams,
}: TemplatePageProps): Promise<Metadata> {
  const rawLang = searchParams?.lang;
  const locale: SupportedLocale =
    rawLang && (SUPPORTED_LOCALES as readonly string[]).includes(rawLang)
      ? (rawLang as SupportedLocale)
      : "id";

  const titles: Record<SupportedLocale, string> = {
    id: "4 Arketipe Template Desain Toko — etalase.online",
    en: "4 Storefront Design Archetypes — etalase.online",
    ms: "4 Arketip Templat Reka Bentuk — etalase.online",
    th: "4 รูปแบบแม่แบบหน้าร้านที่เพิ่มยอดขายได้จริง — etalase.online",
    vi: "4 Mẫu Giao Diện Storefront Đột Phá — etalase.online",
  };

  const descriptions: Record<SupportedLocale, string> = {
    id: "Pilih arketipe storefront mobile-first yang dirancang khusus untuk kreator, kafe F&B, sales showroom mobil/properti, dan beauty influencer.",
    en: "Choose mobile-first storefront archetypes designed specifically for digital creators, dining cafes, automotive & property dealers, and beauty influencers.",
    ms: "Pilih arketip storefront mobile-first yang direka khas untuk pencipta, kafe F&B, jurujual kereta/hartanah dan pempengaruh.",
    th: "เลือกแม่แบบหน้าร้านบนมือถือที่ออกแบบมาสำหรับครีเอเตอร์ ร้านอาหาร ฝ่ายขายรถยนต์และอสังหาริมทรัพย์ เพื่อเพิ่มอัตราการปิดการขาย",
    vi: "Chọn các mẫu storefront tối ưu di động được thiết kế riêng cho nhà sáng tạo, ẩm thực cafe, tư vấn ô tô bất động sản và làm đẹp.",
  };

  return generateLocalizedMetadata({
    path: "/template",
    locale,
    title: titles[locale] || titles.id,
    description: descriptions[locale] || descriptions.id,
    type: "website",
  });
}

export default function TemplatePage({ searchParams }: TemplatePageProps) {
  const rawLang = searchParams?.lang;
  const locale: SupportedLocale =
    rawLang && (SUPPORTED_LOCALES as readonly string[]).includes(rawLang)
      ? (rawLang as SupportedLocale)
      : "id";

  const getLocalizedHref = (basePath: string) => {
    if (locale === "id") return basePath;
    return `/${locale}${basePath}`;
  };

  const templateTranslations = {
    id: {
      badge: "Desain Terisolasi • Anti Tabrakan Tombol",
      h1: "4 Arketipe Desain Toko yang Terbukti Mengonversi.",
      subtitle:
        "Tidak ada lagi tombol bertumpuk atau teks terpotong aneh di layar HP pembeli. Setiap arketipe dibangun dengan konsep layout vertikal khusus sesuai bidang bisnismu.",
      standardsTitle: "Semua Template Sudah Dilengkapi Standar Modern 2027",
      standardsSubtitle:
        "Standar baku teknis untuk memastikan kenyamanan pembeli Anda di smartphone.",
      card1Title: "Desain Mobile-First yang Rapi",
      card1Desc:
        "Foto di atas, judul & harga rapi di tengah, tombol aksi penuh di bawah. Memudahkan checkout 1-klik di layar smartphone.",
      card2Title: "Mendukung Berbagai Format Harga",
      card2Desc:
        "Mendukung harga pasti, simulasi DP, hingga tombol 'Tanya Harga' yang nyaman untuk produk bernilai tinggi atau konsultasi.",
      card3Title: "Subdomain Mandiri Aktif",
      card3Desc:
        "Langsung aktif di namamu.etalase.online tanpa biaya hosting tambahan. Siap dibagikan ke bio Instagram, TikTok, dan kartu nama fisik.",
      ctaBtn: "Pilih Template & Buka Etalase Sekarang",
    },
    en: {
      badge: "Isolated Architecture • Zero Button Clutter",
      h1: "4 Storefront Design Archetypes Proven to Convert.",
      subtitle:
        "No more overlapping buttons or awkwardly clipped text on customer smartphones. Each archetype is engineered with vertical layouts tailored to your industry.",
      standardsTitle: "All Templates Include Modern 2027 Standards",
      standardsSubtitle:
        "Engineered specifications ensuring optimal customer buying experiences on smartphones.",
      card1Title: "Polished Mobile-First Design",
      card1Desc:
        "Top imagery, centered title & pricing, full-width action buttons. Enables frictionless 1-click checkout on mobile screens.",
      card2Title: "Flexible Pricing Formats",
      card2Desc:
        "Supports fixed prices, down-payment estimates, and 'Inquire Price' buttons ideal for high-ticket items or consulting.",
      card3Title: "Active Dedicated Subdomain",
      card3Desc:
        "Instant live deployment at yourname.etalase.online with zero extra hosting charges. Ready for your Instagram & TikTok bio.",
      ctaBtn: "Choose Template & Launch Storefront",
    },
    ms: {
      badge: "Seni Bina Terpencil • Reka Bentuk Kemas",
      h1: "4 Arketip Reka Bentuk Kedai yang Terbukti Meningkatkan Jualan.",
      subtitle:
        "Tiada lagi butang bertindih atau teks terpotong pada skrin telefon pintar pembeli. Setiap arketip dibina mengikut susun atur khusus untuk industri anda.",
      standardsTitle: "Semua Templat Dilengkapi Piawaian Moden 2027",
      standardsSubtitle:
        "Spesifikasi kejuruteraan bagi memastikan keselesaan pembelian di telefon pintar.",
      card1Title: "Reka Bentuk Mobile-First yang Kemas",
      card1Desc:
        "Gambar di atas, tajuk & harga di tengah, butang tindakan penuh di bawah. Memudahkan pembelian 1-klik di telefon bimbit.",
      card2Title: "Sokongan Pelbagai Format Harga",
      card2Desc:
        "Menyokong harga tetap, anggaran wang muka (DP), dan butang 'Tanya Harga' untuk produk bernilai tinggi atau perundingan.",
      card3Title: "Subdomain Sendiri Aktif",
      card3Desc:
        "Aktif serta-merta di namamu.etalase.online tanpa sebarang caj pengehosan tambahan. Sedia dikongsi ke bio media sosial anda.",
      ctaBtn: "Pilih Templat & Lancarkan Etalase",
    },
    th: {
      badge: "สถาปัตยกรรมแยกส่วน • ดีไซน์เป็นระเบียบบนมือถือ",
      h1: "4 รูปแบบแม่แบบหน้าร้านที่พิสูจน์แล้วว่าเพิ่มยอดขายได้จริง",
      subtitle:
        "หมดปัญหาปุ่มทับซ้อนหรือข้อความตกหล่นบนหน้าจอมือถือของลูกค้า ทุกรูปแบบเทมเพลตได้รับการออกแบบโครงสร้างแนวตั้งให้เหมาะกับอุตสาหกรรมของคุณโดยเฉพาะ",
      standardsTitle: "ทุกเทมเพลตมาพร้อมมาตรฐานโมเดิร์น 2027",
      standardsSubtitle:
        "โครงสร้างมาตรฐานระดับสูงเพื่อประสบการณ์การสั่งซื้อที่ราบรื่นที่สุดบนสมาร์ตโฟน",
      card1Title: "การออกแบบที่เน้นการใช้งานบนมือถือ (Mobile-First)",
      card1Desc:
        "รูปภาพด้านบน ชื่อสินค้าและราคาชัดเจนตรงกลาง ปุ่มกดเต็มความกว้างด้านล่าง ช่วยให้ลูกค้าปิดการขายใน 1 คลิกได้ง่ายดาย",
      card2Title: "รองรับการแสดงราคาหลากหลายรูปแบบ",
      card2Desc:
        "รองรับทั้งราคาคงที่, การคำนวณเงินดาวน์, และปุ่ม 'สอบถามราคา' สำหรับสินค้ามูลค่าสูงหรือบริการให้คำปรึกษา",
      card3Title: "ซับโดเมนส่วนตัวพร้อมใช้งานทันที",
      card3Desc:
        "เปิดใช้งานทันทีบน yourname.etalase.online โดยไม่มีค่าโฮสติ้งเพิ่มเติม พร้อมแชร์ลงในไบโอ Instagram และ TikTok ได้ทันที",
      ctaBtn: "เลือกเทมเพลตและเปิดหน้าร้านทันที",
    },
    vi: {
      badge: "Kiến Trúc Tách Biệt • Bố Cục Tối Ưu",
      h1: "4 Mẫu Giao Diện Storefront Đột Phá Đã Được Kiểm Chứng.",
      subtitle:
        "Không còn tình trạng nút bấm chồng chéo hay văn bản bị cắt cụt trên màn hình điện thoại. Mỗi mẫu giao diện đều được tinh chỉnh riêng biệt theo đặc thù ngành hàng của bạn.",
      standardsTitle: "Toàn Bộ Mẫu Đều Đạt Tiêu Chuẩn Hiện Đại 2027",
      standardsSubtitle:
        "Thông số kỹ thuật chuẩn mực mang lại trải nghiệm mua sắm mượt mà nhất trên thiết bị di động.",
      card1Title: "Thiết Kế Tối Ưu Di Động (Mobile-First)",
      card1Desc:
        "Hình ảnh nổi bật phía trên, tiêu đề & giá rõ ràng ở giữa, nút hành động toàn chiều rộng phía dưới. Đặt hàng 1 chạm cực nhanh.",
      card2Title: "Linh Hoạt Nhiều Hình Thức Giá",
      card2Desc:
        "Hỗ trợ giá niêm yết cố định, tính toán trả góp, và nút 'Liên Hệ Báo Giá' cho sản phẩm giá trị cao hoặc gói tư vấn.",
      card3Title: "Tên Miền Phụ Riêng Sẵn Sàng",
      card3Desc:
        "Kích hoạt tức thì tại yourname.etalase.online không mất phí máy chủ. Sẵn sàng gắn ngay vào bio TikTok và Instagram.",
      ctaBtn: "Chọn Mẫu & Tạo Storefront Ngay",
    },
  };

  const t = templateTranslations[locale] || templateTranslations.id;

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-[#1C1917]">
      <GlobalHeader />

      {/* Header Halaman */}
      <section className="pt-16 pb-12 px-4 sm:px-6 text-center max-w-4xl mx-auto">
        <ScrollReveal direction="up" delay={50}>
          <div className="inline-flex items-center gap-1.5 bg-[#FDF0EC] border border-[#FADCD3] text-[#D94E28] px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1C1917] mb-4">
            {t.h1}
          </h1>
          <p className="text-[#57534E] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </ScrollReveal>
      </section>

      {/* Interactive 4 Archetypes Showcase */}
      <section className="pb-16 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <Showcase4Archetypes locale={locale} />
      </section>

      {/* 3 Standar Modern Toko Online 2027 */}
      <section className="py-16 bg-white border-t border-[#E7E5E4] px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917]">
              {t.standardsTitle}
            </h2>
            <p className="text-sm text-[#57534E]">
              {t.standardsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E4] space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#D94E28] text-white flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="font-bold text-base text-[#1C1917]">
                {t.card1Title}
              </h3>
              <p className="text-xs text-[#57534E] leading-relaxed">
                {t.card1Desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E4] space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#D94E28] text-white flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="font-bold text-base text-[#1C1917]">
                {t.card2Title}
              </h3>
              <p className="text-xs text-[#57534E] leading-relaxed">
                {t.card2Desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E4] space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#D94E28] text-white flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="font-bold text-base text-[#1C1917]">
                {t.card3Title}
              </h3>
              <p className="text-xs text-[#57534E] leading-relaxed">
                {t.card3Desc}
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href={getLocalizedHref("/register")}
              className="inline-flex items-center gap-2 bg-[#D94E28] hover:bg-[#B83E1D] text-white font-semibold px-8 py-3.5 rounded-xl text-sm transition shadow-xs hover:shadow-md cursor-pointer"
            >
              <span>{t.ctaBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <GlobalFooter />
    </div>
  );
}
