import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { GlobalHeader } from "@/components/saas/GlobalHeader";
import { GlobalFooter } from "@/components/saas/GlobalFooter";
import { SubdomainClaimer } from "@/components/home/SubdomainClaimer";
import { Hero3DDevice } from "@/components/home/Hero3DDevice";
import { CreatorMarquee } from "@/components/home/CreatorMarquee";
import { InteractiveFeatureShowcase } from "@/components/home/InteractiveFeatureShowcase";
import { Showcase4Archetypes } from "@/components/home/Showcase4Archetypes";
import { HomeWalkthrough } from "@/components/home/HomeWalkthrough";
import { HomeFaqSection } from "@/components/home/HomeFaqSection";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Sparkles, ArrowRight } from "lucide-react";
import {
  generateOrganizationJsonLd,
  generateWebsiteJsonLd,
  generateSoftwareAppJsonLd,
  generateWebPageJsonLd,
  generateHowToJsonLd,
  generateLocalizedMetadata,
} from "@/lib/seo/metadata-helper";
import { SupportedLocale, SUPPORTED_LOCALES } from "@/lib/config/constants";

interface HomePageProps {
  searchParams?: {
    lang?: string;
  };
}

export async function generateMetadata({
  searchParams,
}: HomePageProps): Promise<Metadata> {
  const rawLang = searchParams?.lang;
  const locale: SupportedLocale =
    rawLang && (SUPPORTED_LOCALES as readonly string[]).includes(rawLang)
      ? (rawLang as SupportedLocale)
      : "id";

  const titles: Record<SupportedLocale, string> = {
    id: "etalase.online — Katalog Online yang Closing di WhatsApp. Gratis, Tanpa Komisi.",
    en: "etalase.online — Online Catalog That Closes on WhatsApp. Free, Zero Commission.",
    ms: "etalase.online — Katalog Dalam Talian yang Tutup Jualan di WhatsApp. Percuma, Tanpa Komisen.",
    th: "etalase.online — แคตตาล็อกออนไลน์ที่ปิดการขายบน WhatsApp ฟรี ไม่มีค่าคอมมิชชัน",
    vi: "etalase.online — Danh Mục Online Chốt Đơn Trên WhatsApp. Miễn Phí, Không Hoa Hồng.",
  };

  const descriptions: Record<SupportedLocale, string> = {
    id: "Cocok untuk jualan produk digital atau katalog produk fisik—pembeli langsung pesan ke WhatsApp (0% komisi) atau bayar QRIS instan mulai 2%.",
    en: "Great for digital products or physical catalogs—buyers message straight to WhatsApp (0% commission) or pay via instant QRIS from 2%.",
    ms: "Sesuai untuk jual produk digital atau katalog fizikal—pembeli terus pesan ke WhatsApp (0% komisen) atau bayar QRIS bermula 2%.",
    th: "เหมาะสำหรับขายสินค้าดิจิทัลหรือแคตตาล็อกสินค้าจริง ลูกค้าทักสั่งผ่าน WhatsApp (0%) หรือจ่าย QRIS เริ่มต้น 2%",
    vi: "Phù hợp bán sản phẩm số hoặc danh mục vật lý—khách đặt thẳng qua WhatsApp (0% hoa hồng) hoặc thanh toán QR từ 2%.",
  };

  return generateLocalizedMetadata({
    path: "/",
    locale,
    title: titles[locale] || titles.id,
    description: descriptions[locale] || descriptions.id,
    type: "website",
  });
}

export default function HomePage({ searchParams }: HomePageProps) {
  const rawLang = searchParams?.lang;
  const locale: SupportedLocale =
    rawLang && (SUPPORTED_LOCALES as readonly string[]).includes(rawLang)
      ? (rawLang as SupportedLocale)
      : "id";

  const orgJsonLd = generateOrganizationJsonLd();
  const websiteJsonLd = generateWebsiteJsonLd(locale);
  const softwareAppJsonLd = generateSoftwareAppJsonLd();
  const webPageJsonLd = generateWebPageJsonLd({
    url: locale === "id" ? "/" : `/${locale}`,
    name: "etalase.online — Katalog Online yang Closing di WhatsApp. Gratis, Tanpa Komisi.",
    description:
      "Platform katalog online dan bio-link visual untuk jualan produk digital atau katalog UMKM dengan 0% komisi order chat WhatsApp serta checkout QRIS otomatis mulai 2%.",
    locale,
    speakableSelectors: ["h1", "header + main p"],
  });
  const howToJsonLd = generateHowToJsonLd({
    name: "Cara Membuat Toko Online & Katalog WhatsApp di etalase.online",
    description: "Langkah praktis dari klaim subdomain hingga toko online siap pakai.",
    totalTime: "PT1M",
    steps: [
      { name: "Klaim Subdomain", text: "Ketik nama bisnis dan cek ketersediaannya secara real-time (3–30 karakter)." },
      { name: "Login 1-Klik Google", text: "Daftar menggunakan akun Google tanpa password baru; kami hanya membaca nama dan email." },
      { name: "Tambah Produk & Metode Closing", text: "Unggah foto produk lalu pilih Order WhatsApp (0% komisi) atau QRIS Instan." },
      { name: "Toko Live", text: "Pasang link toko .etalase.online ke bio Instagram, TikTok, atau WhatsApp." },
    ],
  });

  const getLocalizedHref = (basePath: string) => {
    if (locale === "id") return basePath;
    return `/${locale}${basePath}`;
  };

  const homeTranslations = {
    id: {
      heroBadge: "Katalog Bio Link & Closing WhatsApp",
      heroTitle: "Katalog online yang closing di WhatsApp. Gratis, tanpa komisi.",
      heroDesc:
        "Cocok untuk jualan produk digital maupun katalog UMKM—pembeli langsung pesan ke WhatsApp (0% komisi) atau bayar QRIS instan mulai 2%.",
      claimBtn: "Klaim Gratis",
      claimPlaceholder: "namamu",
      trust: ["Gratis Selamanya", "0% Komisi Order Chat (QRIS mulai 2%)", "Otomatis ke WhatsApp"],
      marqueeTitle: "Contoh Tampilan Toko di Berbagai Kategori Bisnis",
      sec1Badge: "Kemampuan Lengkap",
      sec1Title: "Lebih dari Sekadar Link di Bio",
      sec1Desc:
        "Satu platform dengan ekosistem jualan terlengkap yang dirancang khusus untuk mempercepat closing dan transaksi langsung di Asia Tenggara.",
      sec2Badge: "4 Arketipe Template Desain",
      sec2Title: "Pilih Arketipe yang Tepat untuk Karakter Bisnismu",
      sec2Desc:
        "Semua template terisolasi dengan desain mobile-first yang rapi dan subdomain mandiri siap pakai.",
      ctaBadge: "Mulai Gratis Tanpa Kartu Kredit",
      ctaTitle: "Amankan Nama Subdomain Bisnismu Sebelum Diambil Orang Lain.",
      ctaDesc:
        "Daftar gratis dalam 30 detik pakai akun Google. 0% komisi order chat (QRIS mulai 2%), tanpa kartu kredit, langsung terhubung ke WhatsApp Anda.",
      ctaPrimaryBtn: "Buat Etalase Gratis Sekarang",
      ctaSecondaryBtn: "Lihat 4 Arketipe Template",
      ctaTrust:
        "Gratis Selamanya • Setup Cepat & Praktis • Subdomain Mandiri Siap Pakai",
    },
    en: {
      heroBadge: "Visual Storefront & WhatsApp Closing",
      heroTitle: "Online catalog that closes on WhatsApp. Free, zero commission.",
      heroDesc:
        "Great for digital products or physical catalogs—buyers message straight to WhatsApp (0% commission) or pay via instant QRIS from 2%.",
      claimBtn: "Claim Free",
      claimPlaceholder: "yourname",
      trust: ["Free Forever", "0% Chat Orders (QRIS from 2%)", "Automated to WhatsApp"],
      marqueeTitle: "Sample Storefront Previews Across Business Categories",
      sec1Badge: "Full Capabilities",
      sec1Title: "More Than Just a Link in Bio",
      sec1Desc:
        "A complete commerce ecosystem engineered specifically to accelerate conversions and direct transactions in Southeast Asia.",
      sec2Badge: "4 Design Template Archetypes",
      sec2Title: "Choose the Right Archetype for Your Business Identity",
      sec2Desc:
        "All templates are fully isolated with polished mobile-first UX and instant dedicated subdomains.",
      ctaBadge: "Start Free Without Credit Card",
      ctaTitle: "Claim Your Business Subdomain Before Someone Else Does.",
      ctaDesc:
        "Sign up free in 30 seconds with Google. 0% chat commissions (QRIS from 2%), no credit card required, connected straight to your WhatsApp.",
      ctaPrimaryBtn: "Create Free Storefront Now",
      ctaSecondaryBtn: "Explore 4 Archetype Templates",
      ctaTrust:
        "Free Forever • Setup Under 3 Minutes • Ready-to-Use Dedicated Subdomain",
    },
    ms: {
      heroBadge: "Katalog Bio Link & Jualan WhatsApp",
      heroTitle: "Katalog dalam talian yang tutup jualan di WhatsApp. Percuma, tanpa komisen.",
      heroDesc:
        "Sesuai untuk jual produk digital atau katalog PKS—pembeli terus pesan ke WhatsApp (0% komisen) atau bayar QRIS bermula 2%.",
      claimBtn: "Tuntut Percuma",
      claimPlaceholder: "namamu",
      trust: ["Percuma Selamanya", "0% Pesanan Chat (QRIS dari 2%)", "Automatik ke WhatsApp"],
      marqueeTitle: "Contoh Paparan Kedai Mengikut Kategori Perniagaan",
      sec1Badge: "Keupayaan Lengkap",
      sec1Title: "Lebih daripada Sekadar Pautan di Bio",
      sec1Desc:
        "Ekosistem jualan lengkap yang direka khas untuk mempercepatkan penutupan jualan dan transaksi terus di Asia Tenggara.",
      sec2Badge: "4 Arketip Templat Reka Bentuk",
      sec2Title: "Pilih Arketip yang Tepat untuk Karakter Perniagaan Anda",
      sec2Desc:
        "Semua templat diasingkan dengan reka bentuk mobile-first yang kemas dan subdomain sendiri.",
      ctaBadge: "Mula Percuma Tanpa Kad Kredit",
      ctaTitle: "Kunci Nama Subdomain Perniagaan Anda Sebelum Diambil Orang Lain.",
      ctaDesc:
        "Daftar percuma dalam 30 saat dengan akaun Google. 0% komisen pesanan chat (QRIS dari 2%), tiada kad kredit, terus disambungkan ke WhatsApp anda.",
      ctaPrimaryBtn: "Bina Etalase Percuma Sekarang",
      ctaSecondaryBtn: "Lihat 4 Arketip Templat",
      ctaTrust:
        "Percuma Selamanya • Persediaan Bawah 3 Minit • Subdomain Sendiri Siap Digunakan",
    },
    th: {
      heroBadge: "แคตตาล็อกไบโอลิงก์และปิดการขายทาง WhatsApp",
      heroTitle: "แคตตาล็อกออนไลน์ที่ปิดการขายบน WhatsApp ฟรี ไม่มีค่าคอมมิชชัน",
      heroDesc:
        "เหมาะสำหรับขายสินค้าดิจิทัลหรือแคตตาล็อกร้านค้า ลูกค้าทักสั่งทาง WhatsApp (0%) หรือชำระ QRIS ทันใจเริ่มต้น 2%",
      claimBtn: "รับชื่อฟรี",
      claimPlaceholder: "yourname",
      trust: ["ฟรีตลอดชีพ", "0% ออเดอร์แชต (QRIS เริ่ม 2%)", "อัตโนมัติถึง WhatsApp"],
      marqueeTitle: "ตัวอย่างหน้าร้านในหมวดหมู่ธุรกิจต่างๆ",
      sec1Badge: "ความสามารถครบครัน",
      sec1Title: "มากกว่าแค่ลิงก์รวมบนไบโอ",
      sec1Desc:
        "แพลตฟอร์มการค้าครบวงจรที่ออกแบบมาเพื่อเร่งการปิดการขายและธุรกรรมโดยตรงในเอเชียตะวันออกเฉียงใต้",
      sec2Badge: "4 รูปแบบแม่แบบการออกแบบ",
      sec2Title: "เลือกรูปแบบที่ตรงกับเอกลักษณ์ธุรกิจของคุณ",
      sec2Desc:
        "ทุกเทมเพลตได้รับการแยกส่วนอย่างสมบูรณ์ ออกแบบสำหรับมือถือโดยเฉพาะพร้อมซับโดเมนส่วนตัว",
      ctaBadge: "เริ่มต้นฟรีโดยไม่ต้องใช้บัตรเครดิต",
      ctaTitle: "จองชื่อซับโดเมนธุรกิจของคุณก่อนที่ผู้อื่นจะใช้ไป",
      ctaDesc:
        "สมัครฟรีใน 30 วินาทีด้วยบัญชี Google ค่าคอมฯ แชต 0% (QRIS เริ่ม 2%) ไม่ต้องใช้บัตรเครดิต เชื่อมต่อ WhatsApp ทันที",
      ctaPrimaryBtn: "สร้างหน้าร้านฟรีตอนนี้",
      ctaSecondaryBtn: "ดูเทมเพลตทั้ง 4 รูปแบบ",
      ctaTrust:
        "ฟรีตลอดชีพ • ตั้งค่าในเวลาไม่ถึง 3 นาที • ซับโดเมนพร้อมใช้งานทันที",
    },
    vi: {
      heroBadge: "Danh Mục Link Bio & Chốt Đơn WhatsApp",
      heroTitle: "Danh mục online chốt đơn trên WhatsApp. Miễn phí, không hoa hồng.",
      heroDesc:
        "Phù hợp bán sản phẩm số hoặc danh mục sản phẩm—khách đặt thẳng qua WhatsApp (0% hoa hồng) hoặc thanh toán QR từ 2%.",
      claimBtn: "Nhận Miễn Phí",
      claimPlaceholder: "tenban",
      trust: ["Miễn phí vĩnh viễn", "0% Đơn Chat (QR từ 2%)", "Tự động gửi qua WhatsApp"],
      marqueeTitle: "Giao Diện Cửa Hàng Mẫu Theo Ngành Hàng",
      sec1Badge: "Tính năng Toàn diện",
      sec1Title: "Vượt Trội Hơn Một Trang Link Bio Thông Thường",
      sec1Desc:
        "Hệ sinh thái bán hàng hoàn chỉnh được thiết kế chuyên biệt để tăng tốc chốt đơn và giao dịch trực tiếp tại Đông Nam Á.",
      sec2Badge: "4 Mẫu Giao Diện Thiết Kế Đặc Trưng",
      sec2Title: "Chọn Giao Diện Phù Hợp Nhất Với Thương Hiệu Của Bạn",
      sec2Desc:
        "Mọi giao diện đều được tối ưu hóa cho di động với tên miền phụ độc lập sẵn sàng sử dụng.",
      ctaBadge: "Bắt đầu miễn phí không cần thẻ tín dụng",
      ctaTitle: "Giữ Chỗ Tên Miền Phụ Doanh Nghiệp Trước Khi Người Khác Đăng Ký.",
      ctaDesc:
        "Đăng ký miễn phí sau 30 giây bằng Google. 0% hoa hồng đơn chat, không cần thẻ tín dụng, kết nối trực tiếp đến WhatsApp.",
      ctaPrimaryBtn: "Tạo Storefront Miễn Phí Ngay",
      ctaSecondaryBtn: "Xem 4 Mẫu Giao Diện",
      ctaTrust:
        "Miễn Phí Vĩnh Viễn • Thiết Lập Dưới 3 Phút • Tên Miền Phụ Sẵn Sàng Bán Ngay",
    },
  };

  const copy = homeTranslations[locale] || homeTranslations.id;

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-[#1C1917] selection:bg-[#D94E28] selection:text-white">
      {/* Schema.org Structured Data for SEO / GEO / AIO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      {/* 1. Global Header Terpusat */}
      <GlobalHeader />

      {/* 2. Hero Section - Warm Editorial 2027 (#FAF8F5) with 3D Tilt Device */}
      <section className="border-b border-[#E7E5E4] pt-14 sm:pt-20 lg:pt-24 pb-20 lg:pb-28 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Kolom Kiri: Copywriting & Subdomain Claim Bar (Immediate paint, zero fade delay) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[#FDF0EC] border border-[#FADCD3] text-[#D94E28] px-3.5 py-1.5 rounded-full text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#D94E28]" />
                <span>{copy.heroBadge}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1C1917] tracking-tight leading-[1.12]">
                {copy.heroTitle}
              </h1>

              <p className="text-[#57534E] text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {copy.heroDesc}
              </p>

              {/* Subdomain Claim Input Bar dengan Real-Time Availability */}
              <SubdomainClaimer
                buttonText={copy.claimBtn}
                defaultPlaceholder={copy.claimPlaceholder}
                registerBasePath={getLocalizedHref("/register")}
              />

              {/* 3 Micro-trust text */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-[#57534E] pt-1 font-medium">
                <span>{copy.trust[0]}</span>
                <span className="text-[#E7E5E4]">&bull;</span>
                <span>{copy.trust[1]}</span>
                <span className="text-[#E7E5E4]">&bull;</span>
                <span>{copy.trust[2]}</span>
              </div>
            </div>

            {/* Kolom Kanan: CSS 3D Tilt Smartphone Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <ScrollReveal direction="none" delay={150}>
                <Hero3DDevice locale={locale} />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 2B. Interactive 45s Walkthrough Preview Right Below Hero */}
      <HomeWalkthrough locale={locale} />

      {/* 3. Sample Storefronts Showcase (Rendered Once) */}
      <section className="py-12 bg-white border-b border-[#E7E5E4]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#57534E]">
            {copy.marqueeTitle}
          </span>
        </div>
        <CreatorMarquee />
      </section>

      {/* 4. Seksi "Lebih dari Sekadar Link di Bio" (Interactive Context-Aware Showcase) */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <ScrollReveal direction="up" delay={100}>
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D94E28] bg-[#FDF0EC] border border-[#FADCD3] px-3.5 py-1 rounded-full">
              {copy.sec1Badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight">
              {copy.sec1Title}
            </h2>
            <p className="text-[#57534E] text-sm sm:text-base leading-relaxed">
              {copy.sec1Desc}
            </p>
          </div>
        </ScrollReveal>

        <InteractiveFeatureShowcase locale={locale} />
      </section>

      {/* 5. 4 Arketipe Template Tenant Terisolasi */}
      <section className="bg-white border-y border-[#E7E5E4] py-20 lg:py-28 px-4 sm:px-6">
        <ScrollReveal direction="up" delay={100}>
          <div className="max-w-6xl mx-auto text-center mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D94E28] bg-[#FDF0EC] px-3.5 py-1 rounded-full border border-[#FADCD3]">
              {copy.sec2Badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight">
              {copy.sec2Title}
            </h2>
            <p className="text-[#57534E] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              {copy.sec2Desc}
            </p>
          </div>
        </ScrollReveal>

        <Showcase4Archetypes locale={locale} />
      </section>

      {/* 6. Homepage FAQ (5 Key Questions & Honest Answers) */}
      <HomeFaqSection locale={locale} />

      {/* 7. Closing CTA Banner - Harmonis Soft Tint (#FDF0EC) */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <ScrollReveal direction="up" delay={150}>
          <div className="bg-[#FDF0EC] border border-[#FADCD3] rounded-3xl p-10 sm:p-16 text-center shadow-xs space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/90 border border-[#FADCD3] text-[#D94E28] px-3.5 py-1.5 rounded-full text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#D94E28]" />
              <span>{copy.ctaBadge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C1917] leading-tight">
              {copy.ctaTitle}
            </h2>

            <p className="text-sm sm:text-base text-[#57534E] max-w-xl mx-auto leading-relaxed">
              {copy.ctaDesc}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href={getLocalizedHref("/register")}
                className="w-full sm:w-auto bg-[#D94E28] hover:bg-[#B83E1D] text-white font-semibold px-8 py-3.5 rounded-xl text-sm transition shadow-xs hover:shadow-md inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{copy.ctaPrimaryBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={getLocalizedHref("/template")}
                className="w-full sm:w-auto bg-white hover:bg-[#FAF8F5] border border-[#E7E5E4] text-[#1C1917] font-semibold px-6 py-3.5 rounded-xl text-sm transition inline-flex items-center justify-center gap-2 shadow-2xs"
              >
                <span>{copy.ctaSecondaryBtn}</span>
              </Link>
            </div>

            <div className="text-xs text-[#57534E] pt-2 font-medium">
              {copy.ctaTrust}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 7. Global Footer Terpusat */}
      <GlobalFooter />
    </div>
  );
}
