"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TemplateRenderer } from "../templates/TemplateRenderer";
import { StoreTemplateProps } from "../templates/types";
import { CheckCircle2, ArrowRight, ExternalLink, Eye } from "lucide-react";
import { SupportedLocale } from "@/lib/config/constants";

interface ArchetypeDemo {
  id: string;
  name: string;
  subdomain: string;
  industry: string;
  tag: string;
  store: StoreTemplateProps["store"];
  products: StoreTemplateProps["products"];
}

const ARCHETYPE_LOCALES: Record<
  string,
  Record<
    SupportedLocale,
    {
      name: string;
      tag: string;
      industry: string;
    }
  >
> = {
  creator: {
    id: { name: "Kreator Digital", tag: "Clean Minimal", industry: "E-Book, Preset & Mentoring" },
    en: { name: "Digital Creator", tag: "Clean Minimal", industry: "E-Books, Presets & Mentoring" },
    ms: { name: "Pencipta Digital", tag: "Clean Minimal", industry: "E-Buku, Preset & Pementoran" },
    th: { name: "ครีเอเตอร์ดิจิทัล", tag: "Clean Minimal", industry: "อีบุ๊ก, พรีเซ็ต และการให้คำปรึกษา" },
    vi: { name: "Nhà Sáng Tạo Số", tag: "Clean Minimal", industry: "E-Book, Preset & Khóa học" },
  },
  cafe: {
    id: { name: "Cafe & F&B", tag: "Visual Menu Grid", industry: "Menu Visual & Order Kasir WA" },
    en: { name: "Cafe & Dining", tag: "Visual Menu Grid", industry: "Visual Menu & WhatsApp Ordering" },
    ms: { name: "Kafe & F&B", tag: "Visual Menu Grid", industry: "Menu Visual & Pesanan WhatsApp" },
    th: { name: "คาเฟ่และร้านอาหาร", tag: "Visual Menu Grid", industry: "เมนูรูปภาพและสั่งออเดอร์ทาง WhatsApp" },
    vi: { name: "Cafe & Nhà hàng", tag: "Visual Menu Grid", industry: "Thực đơn Hình ảnh & Đặt món qua WhatsApp" },
  },
  sales: {
    id: { name: "Sales Mobil & Properti", tag: "Showroom Pro", industry: "Katalog Showroom & Simulasi DP" },
    en: { name: "Auto & Property Sales", tag: "Showroom Pro", industry: "Showroom Catalog & DP Calculator" },
    ms: { name: "Jurujual Kereta & Hartanah", tag: "Showroom Pro", industry: "Katalog Bilik Pameran & Simulasi Wang Muka" },
    th: { name: "ฝ่ายขายรถยนต์และอสังหาฯ", tag: "Showroom Pro", industry: "แคตตาล็อกโชว์รูมและระบบคำนวณเงินดาวน์" },
    vi: { name: "Kinh Doanh Ô Tô & BĐS", tag: "Showroom Pro", industry: "Danh Mục Showroom & Dự Tính Trả Trước" },
  },
  beauty: {
    id: { name: "Beauty & Affiliate", tag: "Editorial Pastel", industry: "Rekomendasi Skincare & OOTD" },
    en: { name: "Beauty & Affiliate", tag: "Editorial Pastel", industry: "Skincare Recommendations & OOTD" },
    ms: { name: "Kecantikan & Afiliasi", tag: "Editorial Pastel", industry: "Syor Penjagaan Kulit & OOTD" },
    th: { name: "ความงามและแอฟฟิลิเอต", tag: "Editorial Pastel", industry: "แนะนำสกินแคร์และแฟชั่น OOTD" },
    vi: { name: "Làm Đẹp & Tiếp Thị", tag: "Editorial Pastel", industry: "Gợi Ý Chăm Sóc Da & OOTD" },
  },
};

const UI_TEXT = {
  id: {
    badge: "Contoh tampilan • Subdomain Mandiri",
    descPrefix: "Dirancang khusus untuk kebutuhan",
    descSuffix: "Desain mobile-first yang rapi dan memudahkan pembeli menyelesaikan pesanan dalam 1 kali klik.",
    point1: "Desain mobile-first yang rapi dan memudahkan checkout 1-klik",
    point2: "Mendukung harga pasti, simulasi DP, hingga tombol 'Tanya Harga'",
    point3: "Terhubung langsung ke WhatsApp (0% komisi) & Checkout QRIS (mulai 2%)",
    btn: "Gunakan Template Ini Sekarang",
    previewBtn: "Lihat contoh toko",
  },
  en: {
    badge: "Sample preview • Dedicated Subdomain",
    descPrefix: "Engineered specifically for",
    descSuffix: "Polished mobile-first layout designed to help buyers complete orders in a single click.",
    point1: "Refined mobile-first layout enabling frictionless 1-click checkout",
    point2: "Supports fixed prices, down-payment estimates, and 'Inquire Price' buttons",
    point3: "Connected to WhatsApp (0% commission) & instant QRIS checkout (from 2%)",
    btn: "Use This Template Now",
    previewBtn: "View sample store",
  },
  ms: {
    badge: "Contoh paparan • Subdomain Sendiri",
    descPrefix: "Direka khas untuk keperluan",
    descSuffix: "Reka bentuk mobile-first yang kemas dan memudahkan pembeli menyelesaikan pesanan dalam 1 klik.",
    point1: "Reka bentuk mobile-first kemas untuk pembelian 1-klik mudah",
    point2: "Menyokong harga tetap, simulasi wang pendahuluan, dan butang 'Tanya Harga'",
    point3: "Terhubung ke WhatsApp (0% komisen) & bayaran QRIS pantas (dari 2%)",
    btn: "Gunakan Templat Ini Sekarang",
    previewBtn: "Lihat contoh kedai",
  },
  th: {
    badge: "ตัวอย่างหน้าร้าน • ซับโดเมนส่วนตัว",
    descPrefix: "ออกแบบมาเป็นพิเศษสำหรับ",
    descSuffix: "เลย์เอาต์แนวตั้งสำหรับมือถือที่สวยงาม ช่วยให้ลูกค้าสั่งซื้อเสร็จสิ้นได้ในคลิกเดียว",
    point1: "เลย์เอาต์สำหรับมือถือที่ใช้งานง่าย สั่งซื้อได้ในคลิกเดียว",
    point2: "รองรับราคาคงที่ การจำลองเงินดาวน์ และปุ่ม 'สอบถามราคา'",
    point3: "เชื่อมต่อ WhatsApp (0% คอมฯ) และระบบชำระเงิน QR (เริ่มต้น 2%)",
    btn: "ใช้เทมเพลตนี้ตอนนี้",
    previewBtn: "ดูตัวอย่างร้านค้า",
  },
  vi: {
    badge: "Giao diện mẫu • Tên Miền Phụ Độc Lập",
    descPrefix: "Được thiết kế chuyên biệt cho",
    descSuffix: "Giao diện tối ưu di động tinh tế giúp người mua hoàn tất đơn hàng chỉ với 1 chạm.",
    point1: "Thiết kế tối ưu di động giúp chốt đơn trong 1 chạm",
    point2: "Hỗ trợ giá niêm yết, dự tính trả trước và nút 'Hỏi giá'",
    point3: "Kết nối trực tiếp đến WhatsApp (0% phí) & Thanh toán mã QR (từ 2%)",
    btn: "Sử Dụng Giao Diện Này Ngay",
    previewBtn: "Xem cửa hàng mẫu",
  },
};

const ARCHETYPES: ArchetypeDemo[] = [
  {
    id: "creator",
    name: "Kreator Digital",
    subdomain: "rafa.etalase.online",
    industry: "E-Book, Preset & Mentoring",
    tag: "Clean Minimal",
    store: {
      name: "Studio Rafa Creative",
      slug: "rafa",
      bio: "Digital Creator & Video Editor. Berbagi preset cinematic & kelas editing.",
      locale: "id",
      currency: "IDR",
      tier: "FREE",
      templateId: "clean-minimal",
      avatarUrl: "/images/demo/avatar-rafa.jpg",
      bannerUrl: "/images/demo/banner-creator.jpg",
      chatChannel: "WHATSAPP",
      chatHandle: "6281234567890",
      chatChannels: [{ channel: "WHATSAPP", handle: "6281234567890", isPrimary: true }],
      appearanceConfig: {
        bgType: "pattern",
        bgValue: "subtle-dots",
        buttonStyle: "rounded",
        accentColor: "#D94E28",
        coverBannerUrl: "/images/demo/banner-creator.jpg",
        socialLinks: {
          tiktok: "https://tiktok.com/@rafacreative",
          instagram: "https://instagram.com/rafacreative",
          whatsapp: "https://wa.me/6281234567890",
          youtube: "https://youtube.com/@rafacreative",
        },
      },
    },
    products: [
      {
        id: "r1",
        title: "Preset Lightroom Pro Cinematic Pack",
        slug: "preset-cinematic",
        price: 49000,
        compareAtPrice: 99000,
        images: ["/images/demo/product-preset.jpg"],
        checkoutMode: "DIRECT_CHECKOUT",
        isFeatured: true,
      },
      {
        id: "r2",
        title: "E-Book: 30 Hari Kuasai CapCut & Premiere",
        slug: "ebook-capcut",
        price: 99000,
        compareAtPrice: 159000,
        images: ["/images/demo/product-ebook.jpg"],
        checkoutMode: "DIRECT_CHECKOUT",
      },
      {
        id: "r3",
        title: "Microphone Wireless Clip-On Studio",
        slug: "mic-wireless",
        price: 189000,
        compareAtPrice: 249000,
        images: ["/images/demo/product-mic.jpg"],
        checkoutMode: "EXTERNAL_LINK",
        externalPlatform: "TIKTOK_SHOP",
        externalLabel: "Keranjang Kuning",
      },
      {
        id: "r4",
        title: "Mentoring 1-on-1 Content Growth",
        slug: "mentoring-content",
        price: 250000,
        compareAtPrice: 500000,
        images: ["/images/demo/product-mentoring.jpg"],
        checkoutMode: "CHAT_ORDER",
      },
    ],
  },
  {
    id: "cafe",
    name: "Cafe & F&B",
    subdomain: "kopisenja.etalase.online",
    industry: "Menu Visual & Order Kasir WA",
    tag: "Visual Menu Grid",
    store: {
      name: "Kopi Senja Roastery",
      slug: "kopisenja",
      bio: "Kopi spesialti seduh manual & bakery fresh oven setiap pagi. Buka 08:00 - 22:00.",
      locale: "id",
      currency: "IDR",
      tier: "PRO",
      templateId: "visual-menu-grid",
      avatarUrl: "/images/demo/avatar-senja.jpg",
      bannerUrl: "/images/demo/banner-cafe.jpg",
      chatChannel: "WHATSAPP",
      chatHandle: "6281234567891",
      chatChannels: [{ channel: "WHATSAPP", handle: "6281234567891", isPrimary: true }],
      appearanceConfig: {
        bgType: "solid",
        bgValue: "#FAF6F0",
        buttonStyle: "pill",
        accentColor: "#4A2C2A",
        coverBannerUrl: "/images/demo/banner-cafe.jpg",
        socialLinks: {
          instagram: "https://instagram.com/kopisenja",
          whatsapp: "https://wa.me/6281234567891",
          website: "https://kopisenja.etalase.online",
        },
      },
    },
    products: [
      {
        id: "k1",
        title: "Kopi Susu Aren Senja",
        slug: "aren-senja",
        price: 25000,
        compareAtPrice: 28000,
        images: ["/images/demo/product-coffee-aren.jpg"],
        checkoutMode: "CHAT_ORDER",
        isFeatured: true,
        category: "Kopi",
      },
      {
        id: "k2",
        title: "Butter Croissant Fresh Oven",
        slug: "croissant",
        price: 28000,
        compareAtPrice: 32000,
        images: ["/images/demo/product-croissant.jpg"],
        checkoutMode: "CHAT_ORDER",
        category: "Pastry",
      },
      {
        id: "k3",
        title: "V60 Gayo Highland Single Origin",
        slug: "v60-gayo",
        price: 32000,
        images: ["/images/demo/product-v60.jpg"],
        checkoutMode: "CHAT_ORDER",
        category: "Kopi",
      },
      {
        id: "k4",
        title: "Biji Kopi Arabika Gayo 250g",
        slug: "arabika-250",
        price: 95000,
        compareAtPrice: 110000,
        images: ["/images/demo/product-beans.jpg"],
        checkoutMode: "DIRECT_CHECKOUT",
        category: "Biji Kopi",
      },
    ],
  },
  {
    id: "sales",
    name: "Sales Mobil & Properti",
    subdomain: "bastianmobil.etalase.online",
    industry: "Katalog Showroom & Simulasi DP",
    tag: "Showroom Pro",
    store: {
      name: "Bastian Showroom Mobil",
      slug: "bastianmobil",
      bio: "Dealer Resmi Mobil Baru & Bekas. Simulasi DP Ringan & Booking Test Drive ke Rumah Anda.",
      locale: "id",
      currency: "IDR",
      tier: "PRO",
      templateId: "showroom-pro",
      avatarUrl: "/images/demo/avatar-bastian.jpg",
      bannerUrl: "/images/demo/banner-showroom.jpg",
      chatChannel: "WHATSAPP",
      chatHandle: "6281234567892",
      chatChannels: [{ channel: "WHATSAPP", handle: "6281234567892", isPrimary: true }],
      appearanceConfig: {
        bgType: "solid",
        bgValue: "#F4F5F7",
        buttonStyle: "sharp",
        accentColor: "#18181B",
        coverBannerUrl: "/images/demo/banner-showroom.jpg",
        socialLinks: {
          tiktok: "https://tiktok.com/@bastianmobil",
          instagram: "https://instagram.com/bastianmobil",
          whatsapp: "https://wa.me/6281234567892",
        },
      },
    },
    products: [
      {
        id: "s1",
        title: "All-New SUV Hybrid 2026",
        slug: "suv-hybrid",
        price: 0,
        images: ["/images/demo/product-car-suv.jpg"],
        checkoutMode: "CHAT_ORDER",
        isFeatured: true,
      },
      {
        id: "s2",
        title: "City Car Matic Sporty 1.2",
        slug: "city-car",
        price: 0,
        images: ["/images/demo/product-car-city.jpg"],
        checkoutMode: "CHAT_ORDER",
      },
      {
        id: "s3",
        title: "Cluster Modern Minimalis 2 Lantai",
        slug: "cluster-modern",
        price: 0,
        images: ["/images/demo/product-property.jpg"],
        checkoutMode: "CHAT_ORDER",
      },
    ],
  },
  {
    id: "beauty",
    name: "Beauty & Affiliate",
    subdomain: "aisyahlook.etalase.online",
    industry: "Keranjang Kuning & Racun Viral",
    tag: "Editorial Pastel",
    store: {
      name: "Aisyah Hijab & Beauty",
      slug: "aisyahlook",
      bio: "Beauty, Hijab & Skincare Favorit. Rekomendasi racun harian yang beneran dipakai & worth to buy ✨",
      locale: "id",
      currency: "IDR",
      tier: "PRO",
      templateId: "editorial-pastel",
      avatarUrl: "/images/demo/avatar-aisyah.jpg",
      bannerUrl: "/images/demo/banner-beauty.jpg",
      chatChannel: "WHATSAPP",
      chatHandle: "6281234567893",
      chatChannels: [{ channel: "WHATSAPP", handle: "6281234567893", isPrimary: true }],
      appearanceConfig: {
        bgType: "pattern",
        bgValue: "organic-pastel",
        buttonStyle: "pill",
        accentColor: "#D94E28",
        coverBannerUrl: "/images/demo/banner-beauty.jpg",
        socialLinks: {
          tiktok: "https://tiktok.com/@aisyahlook",
          instagram: "https://instagram.com/aisyahlook",
          whatsapp: "https://wa.me/6281234567893",
        },
      },
    },
    products: [
      {
        id: "b1",
        title: "Glow Barrier Serum 30ml",
        slug: "glow-serum",
        price: 89000,
        compareAtPrice: 149000,
        images: ["/images/demo/product-serum.jpg"],
        checkoutMode: "EXTERNAL_LINK",
        externalPlatform: "TIKTOK_SHOP",
        externalLabel: "Keranjang Kuning",
        isFeatured: true,
      },
      {
        id: "b2",
        title: "Velvet Matte Lip Cream Silk",
        slug: "lip-cream",
        price: 79000,
        compareAtPrice: 110000,
        images: ["/images/demo/product-lipcream.jpg"],
        checkoutMode: "EXTERNAL_LINK",
        externalPlatform: "SHOPEE",
        externalLabel: "Shopee Mall",
      },
      {
        id: "b3",
        title: "Hijab Segiempat Voal Premium",
        slug: "hijab-voal",
        price: 45000,
        images: ["/images/demo/product-hijab.jpg"],
        checkoutMode: "EXTERNAL_LINK",
        externalPlatform: "TIKTOK_SHOP",
      },
      {
        id: "b4",
        title: "E-Book: 14 Hari Glowing Alami",
        slug: "ebook-glowing",
        price: 35000,
        images: ["/images/demo/product-ebook.jpg"],
        checkoutMode: "DIRECT_CHECKOUT",
        productType: "DIGITAL",
      },
    ],
  },
];

export function Showcase4Archetypes({ locale: propLocale }: { locale?: SupportedLocale } = {}) {
  const pathname = usePathname() || "";
  let locale: SupportedLocale = propLocale || "id";
  if (!propLocale) {
    if (pathname.startsWith("/en")) locale = "en";
    else if (pathname.startsWith("/ms")) locale = "ms";
    else if (pathname.startsWith("/th")) locale = "th";
    else if (pathname.startsWith("/vi")) locale = "vi";
  }

  const copy = UI_TEXT[locale] || UI_TEXT.id;
  const [activeTab, setActiveTab] = useState(0);
  const activeArchetype = ARCHETYPES[activeTab];
  const activeLocInfo = ARCHETYPE_LOCALES[activeArchetype.id]?.[locale] || {
    name: activeArchetype.name,
    tag: activeArchetype.tag,
    industry: activeArchetype.industry,
  };

  const getLocalizedRegisterHref = (templateId: string) => {
    if (locale === "id") return `/register?template=${templateId}`;
    return `/${locale}/register?template=${templateId}`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
      {/* 4 Archetype Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10 p-1.5 bg-white border border-[#E7E5E4] rounded-2xl shadow-xs">
        {ARCHETYPES.map((arch, index) => {
          const isSelected = activeTab === index;
          const locInfo = ARCHETYPE_LOCALES[arch.id]?.[locale] || {
            name: arch.name,
            tag: arch.tag,
          };
          return (
            <button
              key={arch.id}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                isSelected
                  ? "bg-[#D94E28] text-white shadow-xs"
                  : "text-[#57534E] hover:text-[#1C1917] hover:bg-[#FAF8F5]"
              }`}
            >
              <span>{locInfo.name}</span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isSelected ? "bg-white/20 text-white" : "bg-[#FAF8F5] text-[#57534E]"
                }`}
              >
                {locInfo.tag}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Showcase Display: Info Card Left + Real Phone Mockup Right */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white border border-[#E7E5E4] rounded-3xl p-6 sm:p-10 shadow-sm">
        {/* Left Column: Archetype Details */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="inline-flex items-center gap-1.5 bg-[#FDF0EC] border border-[#FADCD3] text-[#D94E28] text-xs font-bold px-3 py-1 rounded-full">
            <Eye className="w-3.5 h-3.5" />
            <span>{copy.badge}</span>
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#1C1917]">
              {activeLocInfo.name}
            </h3>
            <a
              href={`https://${activeArchetype.subdomain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm sm:text-base font-bold text-[#D94E28] mt-1 inline-flex items-center gap-1.5 hover:underline"
            >
              <span>https://{activeArchetype.subdomain}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <p className="text-sm text-[#57534E] mt-3 leading-relaxed">
              {copy.descPrefix} {activeLocInfo.industry}. {copy.descSuffix}
            </p>
          </div>

          <div className="space-y-2.5 pt-2 border-t border-[#E7E5E4] text-xs text-[#57534E]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D94E28]"></span>
              <span>{copy.point1}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D94E28]"></span>
              <span>{copy.point2}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D94E28]"></span>
              <span>{copy.point3}</span>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href={getLocalizedRegisterHref(activeArchetype.id)}
              className="inline-flex items-center gap-2 bg-[#D94E28] hover:bg-[#B83E1D] text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition"
            >
              <span>{copy.btn}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`https://${activeArchetype.subdomain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#FAF8F5] hover:bg-white border border-[#E7E5E4] text-[#1C1917] px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm transition"
            >
              <span>{copy.previewBtn}</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#D94E28]" />
            </a>
          </div>
        </div>

        {/* Right Column: 1 Clean Phone Mockup Rendering the Exact Single Source of Truth Template */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-[320px] sm:max-w-[340px] bg-[#1C1917] rounded-[2.8rem] p-3 shadow-xl border-4 border-[#292524] flex flex-col items-center">
            {/* Notch */}
            <div className="w-24 h-4 bg-black rounded-full mb-2 flex items-center justify-between px-2.5 shrink-0 z-10">
              <div className="w-1.5 h-1.5 rounded-full bg-stone-800"></div>
              <div className="w-2 h-2 rounded-full bg-stone-800 border border-stone-700"></div>
            </div>

            {/* Screen Frame - Strict Single Source of Truth */}
            <div className="w-full h-[540px] bg-[#FAF8F5] rounded-[2.1rem] overflow-y-auto no-scrollbar relative shadow-inner">
              <TemplateRenderer
                store={activeArchetype.store}
                products={activeArchetype.products}
                isMockup={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
