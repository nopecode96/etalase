"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { EtalaseLogo } from "@/components/brand/EtalaseLogo";
import { OfficialSocialLinks } from "@/components/saas/OfficialSocialLinks";
import {
  Mail,
  ShieldCheck,
  Zap,
  Building,
  MapPin,
  MessageCircle,
} from "lucide-react";
import {
  OFFICIAL_WHATSAPP_GROUP_URL,
  SupportedLocale,
} from "@/lib/config/constants";

interface FooterLocaleCopy {
  tagline: string;
  managedBy: string;
  trust1: string;
  trust2: string;
  international: string;
  colSales: string;
  colFeatures: string;
  colCompany: string;
  colLegal: string;
  rights: string;
  statusNormal: string;
  links: {
    solutions: string;
    digital: string;
    catalog: string;
    affiliate: string;
    chatOrder: string;
    event: string;
    waDelivery: string;
    qris: string;
    customDomain: string;
    archetypes: string;
    freeTools: string;
    about: string;
    pricing: string;
    lynkAlt: string;
    blog: string;
    contact: string;
    helpCenter: string;
    waSupport: string;
    telegramCs: string;
    terms: string;
    refund: string;
    privacy: string;
  };
}

const FOOTER_TEXTS: Record<SupportedLocale, FooterLocaleCopy> = {
  id: {
    tagline:
      "Satu website etalase untuk semua jualan Anda di Asia Tenggara. Bio link visual, katalog instan, dan checkout chat tanpa komisi.",
    managedBy: "Dikelola oleh",
    trust1: "Pembayaran QRIS Instan",
    trust2: "Kirim File Otomatis ke WA",
    international: "Internasional",
    colSales: "Solusi Jualan",
    colFeatures: "Fitur & Produk",
    colCompany: "Perusahaan",
    colLegal: "Bantuan & Legal",
    rights: "Hak Cipta Dilindungi di Seluruh Asia Tenggara.",
    statusNormal: "Semua Sistem Normal",
    links: {
      solutions: "Solusi Per Industri",
      digital: "Produk Digital & E-Book",
      catalog: "Katalog & Showroom",
      affiliate: "Affiliate TikTok & Bio",
      chatOrder: "Order Chat (0% Komisi)",
      event: "Event, Tiket & Booking",
      waDelivery: "Kirim File ke WhatsApp",
      qris: "QRIS Instan & Margin",
      customDomain: "Custom Domain (.com)",
      archetypes: "4 Arketipe Template",
      freeTools: "Tools WhatsApp & QR",
      about: "Tentang Kami",
      pricing: "Biaya & Paket Harga",
      lynkAlt: "Alternatif Lynk.id",
      blog: "Blog & Panduan",
      contact: "Hubungi Kami & DFY",
      helpCenter: "Pusat Bantuan (FAQ)",
      waSupport: "WhatsApp Support",
      telegramCs: "Rani (Telegram CS)",
      terms: "Syarat & Ketentuan",
      refund: "Kebijakan Refund",
      privacy: "Kebijakan Privasi",
    },
  },
  en: {
    tagline:
      "One storefront website for all your sales across Southeast Asia. Visual bio links, instant catalogs, and zero-commission chat checkouts.",
    managedBy: "Operated by",
    trust1: "Instant QRIS Payments",
    trust2: "Automated WA Delivery",
    international: "International",
    colSales: "Sales Solutions",
    colFeatures: "Features & Tools",
    colCompany: "Company",
    colLegal: "Support & Legal",
    rights: "All Rights Reserved across Southeast Asia.",
    statusNormal: "All Systems Operational",
    links: {
      solutions: "Industry Solutions",
      digital: "Digital Goods & E-Books",
      catalog: "Catalogs & Showrooms",
      affiliate: "TikTok & Bio Affiliates",
      chatOrder: "Chat Orders (0% Fee)",
      event: "Events & Bookings",
      waDelivery: "WhatsApp File Delivery",
      qris: "Instant QRIS & Margin",
      customDomain: "Custom Domain (.com)",
      archetypes: "4 Design Templates",
      freeTools: "Free WA & QR Tools",
      about: "About Us",
      pricing: "Pricing & Plans",
      lynkAlt: "Lynk.id Alternative",
      blog: "Blog & Playbooks",
      contact: "Contact & DFY Setup",
      helpCenter: "Help Center (FAQ)",
      waSupport: "WhatsApp Support",
      telegramCs: "Rani (Telegram CS)",
      terms: "Terms & Conditions",
      refund: "Refund Policy",
      privacy: "Privacy Policy",
    },
  },
  ms: {
    tagline:
      "Satu laman web etalase untuk semua jualan anda di Asia Tenggara. Pautan bio visual, katalog pantas, dan pesanan chat tanpa komisen.",
    managedBy: "Dikendalikan oleh",
    trust1: "Pembayaran QRIS Pantas",
    trust2: "Hantar Fail ke WhatsApp",
    international: "Antarabangsa",
    colSales: "Penyelesaian Jualan",
    colFeatures: "Ciri & Produk",
    colCompany: "Syarikat",
    colLegal: "Bantuan & Legal",
    rights: "Hak Cipta Terpelihara di Seluruh Asia Tenggara.",
    statusNormal: "Semua Sistem Beroperasi",
    links: {
      solutions: "Solusi Mengikut Industri",
      digital: "Produk Digital & E-Buku",
      catalog: "Katalog & Showroom",
      affiliate: "Affiliate Bakul Kuning",
      chatOrder: "Pesanan Chat (0% Fee)",
      event: "Acara, Tiket & Tempahan",
      waDelivery: "Hantar Fail ke WhatsApp",
      qris: "QRIS Pantas & Margin",
      customDomain: "Domain Tersuai (.com)",
      archetypes: "4 Reka Bentuk Templat",
      freeTools: "Alatan Percuma WA & QR",
      about: "Mengenai Kami",
      pricing: "Harga & Pakej",
      lynkAlt: "Alternatif Lynk.id",
      blog: "Blog & Panduan",
      contact: "Hubungi Kami & DFY",
      helpCenter: "Pusat Bantuan (FAQ)",
      waSupport: "WhatsApp Support",
      telegramCs: "Rani (Telegram CS)",
      terms: "Terma & Syarat",
      refund: "Dasar Bayaran Balik",
      privacy: "Dasar Privasi",
    },
  },
  th: {
    tagline:
      "เว็บไซต์หน้าร้านเดียวสำหรับทุกยอดขายของคุณในเอเชียตะวันออกเฉียงใต้ ลิงก์โปรไฟล์ แคตตาล็อกสินค้า และระบบสั่งซื้อผ่านแชทไม่มีค่าคอมมิชชัน",
    managedBy: "ดำเนินการโดย",
    trust1: "ชำระเงิน QRIS รวดเร็ว",
    trust2: "ส่งไฟล์อัตโนมัติทาง WA",
    international: "สากล",
    colSales: "โซลูชันการขาย",
    colFeatures: "ฟีเจอร์และเครื่องมือ",
    colCompany: "บริษัท",
    colLegal: "ช่วยเหลือและกฎหมาย",
    rights: "สงวนลิขสิทธิ์ทั่วเอเชียตะวันออกเฉียงใต้",
    statusNormal: "ระบบทำงานปกติทั้งหมด",
    links: {
      solutions: "โซลูชันตามอุตสาหกรรม",
      digital: "สินค้าดิจิทัลและอีบุ๊ก",
      catalog: "แคตตาล็อกและโชว์รูม",
      affiliate: "Affiliate ตะกร้าเหลือง",
      chatOrder: "สั่งผ่านแชท (0% Fee)",
      event: "อีเวนต์และจองคิว",
      waDelivery: "ส่งไฟล์ทาง WhatsApp",
      qris: "ระบบ QRIS และมาร์จิน",
      customDomain: "โดเมนส่วนตัว (.com)",
      archetypes: "4 แม่แบบดีไซน์",
      freeTools: "เครื่องมือฟรี WA & QR",
      about: "เกี่ยวกับเรา",
      pricing: "ราคาและแพ็กเกจ",
      lynkAlt: "ทางเลือก Lynk.id",
      blog: "บล็อกและคู่มือ",
      contact: "ติดต่อเราและ DFY",
      helpCenter: "ศูนย์ช่วยเหลือ (FAQ)",
      waSupport: "WhatsApp Support",
      telegramCs: "Rani (Telegram CS)",
      terms: "ข้อกำหนดและเงื่อนไข",
      refund: "นโยบายการคืนเงิน",
      privacy: "นโยบายความเป็นส่วนตัว",
    },
  },
  vi: {
    tagline:
      "Một website cửa hàng cho tất cả hoạt động kinh doanh tại Đông Nam Á. Bio link trực quan, danh mục tức thì, chốt đơn qua chat không mất hoa hồng.",
    managedBy: "Vận hành bởi",
    trust1: "Thanh toán QRIS tức thì",
    trust2: "Gửi tệp qua WhatsApp",
    international: "Quốc tế",
    colSales: "Giải pháp Bán hàng",
    colFeatures: "Tính năng & Công cụ",
    colCompany: "Công ty",
    colLegal: "Hỗ trợ & Pháp lý",
    rights: "Bảo lưu mọi quyền tại Đông Nam Á.",
    statusNormal: "Hệ thống Hoạt động Ổn định",
    links: {
      solutions: "Giải pháp Theo Ngành",
      digital: "Sản phẩm Số & E-Book",
      catalog: "Danh mục & Showroom",
      affiliate: "Tiếp thị Liên kết",
      chatOrder: "Đơn Chat (0% Phí)",
      event: "Sự kiện & Đặt lịch",
      waDelivery: "Gửi tệp qua WhatsApp",
      qris: "QRIS Tức thì & Lợi nhuận",
      customDomain: "Tên miền Riêng (.com)",
      archetypes: "4 Mẫu Giao diện",
      freeTools: "Công cụ Miễn phí WA",
      about: "Về Chúng tôi",
      pricing: "Bảng giá & Gói",
      lynkAlt: "Thay thế Lynk.id",
      blog: "Blog & Cẩm nang",
      contact: "Liên hệ & Gói DFY",
      helpCenter: "Trung tâm Trợ giúp",
      waSupport: "WhatsApp Support",
      telegramCs: "Rani (Telegram CS)",
      terms: "Điều khoản Sử dụng",
      refund: "Chính sách Hoàn tiền",
      privacy: "Chính sách Bảo mật",
    },
  },
};

export function GlobalFooter() {
  const pathname = usePathname() || "";

  let currentLocale: SupportedLocale = "id";
  if (pathname.startsWith("/en")) currentLocale = "en";
  else if (pathname.startsWith("/ms")) currentLocale = "ms";
  else if (pathname.startsWith("/th")) currentLocale = "th";
  else if (pathname.startsWith("/vi")) currentLocale = "vi";

  const getLocalizedHref = (basePath: string) => {
    if (currentLocale === "id") return basePath;
    return `/${currentLocale}${basePath}`;
  };

  const currentYear = new Date().getFullYear() || 2026;
  const t = FOOTER_TEXTS[currentLocale] || FOOTER_TEXTS.id;

  return (
    <footer className="bg-white border-t border-[#E7E5E4] pt-12 pb-8 text-sm text-[#57534E]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Band 1: 5-Column Directory Aligned to Exact Height */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-12 gap-x-6 gap-y-8 pb-10">
          {/* Kolom 1: Brand Identity & Direct Contact */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-4 space-y-4">
            <Link
              href={currentLocale === "id" ? "/" : `/${currentLocale}`}
              className="inline-block"
            >
              <EtalaseLogo size="md" withTagline={true} />
            </Link>

            <p className="text-xs leading-relaxed text-[#57534E] max-w-xs">
              {t.tagline}
            </p>

            <div className="space-y-2 pt-0.5 text-xs text-[#57534E]">
              <div className="flex items-start gap-2.5">
                <Building className="w-3.5 h-3.5 text-[#D94E28] shrink-0 mt-0.5" />
                <span>
                  {t.managedBy}{" "}
                  <strong className="text-[#1C1917] font-semibold">
                    PT Rafa Kreasindo Teknologi
                  </strong>
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#D94E28] shrink-0 mt-0.5" />
                <span>Jl. Nias Dalam No. 14, Bandung, Jawa Barat 40115</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#D94E28] shrink-0 mt-0.5" />
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <a
                    href="mailto:support@etalase.online"
                    className="font-medium text-[#1C1917] hover:text-[#D94E28] transition"
                  >
                    support@etalase.online
                  </a>
                  <span className="text-[#D6D3D1]" aria-hidden="true">
                    •
                  </span>
                  <a
                    href="mailto:halo@etalase.online"
                    className="hover:text-[#D94E28] transition"
                  >
                    halo@etalase.online
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Kolom 2: Solusi Jualan (6 links) */}
          <div className="col-span-1 lg:col-span-2 space-y-3">
            <h4 className="font-bold text-[#1C1917] text-[11px] uppercase tracking-wider">
              {t.colSales}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href={getLocalizedHref("/solusi")}
                  className="hover:text-[#1C1917] transition block leading-snug"
                >
                  {t.links.solutions}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedHref("/fitur#digital")}
                  className="hover:text-[#1C1917] transition block leading-snug"
                >
                  {t.links.digital}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedHref("/fitur#katalog")}
                  className="hover:text-[#1C1917] transition block leading-snug"
                >
                  {t.links.catalog}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedHref("/fitur#affiliate")}
                  className="hover:text-[#1C1917] transition block leading-snug"
                >
                  {t.links.affiliate}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedHref("/fitur#chat-order")}
                  className="hover:text-[#1C1917] transition block leading-snug"
                >
                  {t.links.chatOrder}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedHref("/fitur#event")}
                  className="hover:text-[#1C1917] transition block leading-snug"
                >
                  {t.links.event}
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Fitur & Produk (5 links) */}
          <div className="col-span-1 lg:col-span-2 space-y-3">
            <h4 className="font-bold text-[#1C1917] text-[11px] uppercase tracking-wider">
              {t.colFeatures}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href={getLocalizedHref("/fitur#whatsapp")}
                  className="hover:text-[#1C1917] transition block leading-snug"
                >
                  {t.links.waDelivery}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedHref("/fitur#qris")}
                  className="hover:text-[#1C1917] transition block leading-snug"
                >
                  {t.links.qris}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedHref("/fitur#domain")}
                  className="hover:text-[#1C1917] transition block leading-snug"
                >
                  {t.links.customDomain}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedHref("/template")}
                  className="hover:text-[#1C1917] transition block leading-snug"
                >
                  {t.links.archetypes}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedHref("/tools")}
                  className="hover:text-[#1C1917] transition block leading-snug"
                >
                  {t.links.freeTools}
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Perusahaan (5 links) */}
          <div className="col-span-1 lg:col-span-2 space-y-3">
            <h4 className="font-bold text-[#1C1917] text-[11px] uppercase tracking-wider">
              {t.colCompany}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href={getLocalizedHref("/about")}
                  className="font-semibold text-[#D94E28] hover:text-[#B83E1D] transition block leading-snug"
                >
                  {t.links.about}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedHref("/harga")}
                  className="hover:text-[#1C1917] transition block leading-snug"
                >
                  {t.links.pricing}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedHref("/alternatif-lynk-id")}
                  className="hover:text-[#1C1917] transition block leading-snug"
                >
                  {t.links.lynkAlt}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedHref("/blog")}
                  className="hover:text-[#1C1917] transition block leading-snug"
                >
                  {t.links.blog}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedHref("/kontak")}
                  className="hover:text-[#1C1917] transition block leading-snug"
                >
                  {t.links.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 5: Bantuan & Legal (6 links) */}
          <div className="col-span-1 lg:col-span-2 space-y-3">
            <h4 className="font-bold text-[#1C1917] text-[11px] uppercase tracking-wider">
              {t.colLegal}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href={getLocalizedHref("/bantuan")}
                  className="hover:text-[#1C1917] transition block leading-snug"
                >
                  {t.links.helpCenter}
                </Link>
              </li>
              <li>
                <a
                  href={OFFICIAL_WHATSAPP_GROUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 hover:text-emerald-800 transition font-semibold inline-flex items-center gap-1.5 leading-snug"
                >
                  <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{t.links.waSupport}</span>
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/etalaseonline_bot"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-600 hover:text-sky-700 transition font-medium inline-flex items-center gap-1.5 leading-snug"
                  title="Chat Customer Service: Rani • EtalaseOnline CS"
                >
                  <div className="relative w-3.5 h-3.5 rounded-full overflow-hidden border border-sky-300 shrink-0">
                    <img
                      src="/images/rani-cs.png"
                      alt="Rani CS"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span>{t.links.telegramCs}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                </a>
              </li>
              <li>
                <Link
                  href={getLocalizedHref("/syarat")}
                  className="hover:text-[#1C1917] transition block leading-snug"
                >
                  {t.links.terms}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedHref("/refund")}
                  className="hover:text-[#1C1917] transition block leading-snug"
                >
                  {t.links.refund}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedHref("/privasi")}
                  className="hover:text-[#1C1917] transition block leading-snug"
                >
                  {t.links.privacy}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Band 2: Trust & Payment Badges (left) + Official Social Channels (right) */}
        <div className="py-5 border-t border-[#E7E5E4] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            <span className="inline-flex items-center gap-1.5 bg-[#FAF8F5] border border-[#E7E5E4] px-2.5 py-1.5 rounded-xl text-[#1C1917] font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D94E28] shrink-0" />
              {t.trust1}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[#FAF8F5] border border-[#E7E5E4] px-2.5 py-1.5 rounded-xl text-[#1C1917] font-medium">
              <Zap className="w-3.5 h-3.5 text-[#D94E28] shrink-0" />
              {t.trust2}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[#FAF8F5] border border-[#E7E5E4] px-2.5 py-1.5 rounded-xl text-[#1C1917] font-semibold">
              <span className="text-[10px] font-bold text-red-600">QRIS</span>
              <span className="text-[#57534E] font-normal">via PJP BI</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[#FAF8F5] border border-[#E7E5E4] px-2.5 py-1.5 rounded-xl text-[#1C1917] font-semibold">
              <span className="text-[10px] font-bold text-sky-600">PayPal</span>
              <span className="text-[#57534E] font-normal">{t.international}</span>
            </span>
          </div>

          <OfficialSocialLinks locale={currentLocale} variant="pills" />
        </div>

        {/* Band 3: Bottom Bar (Copyright, Language Switcher, System Status) */}
        <div className="pt-5 border-t border-[#E7E5E4] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#57534E]">
          <div>
            &copy; {currentYear} PT Rafa Kreasindo Teknologi. {t.rights}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2 font-medium">
              <Link
                href="/"
                className={`${
                  currentLocale === "id"
                    ? "text-[#1C1917] font-bold"
                    : "hover:text-[#D94E28]"
                } transition`}
              >
                ID
              </Link>
              <span className="text-[#E7E5E4]">|</span>
              <Link
                href="/en"
                className={`${
                  currentLocale === "en"
                    ? "text-[#1C1917] font-bold"
                    : "hover:text-[#D94E28]"
                } transition`}
              >
                EN
              </Link>
              <span className="text-[#E7E5E4]">|</span>
              <Link
                href="/ms"
                className={`${
                  currentLocale === "ms"
                    ? "text-[#1C1917] font-bold"
                    : "hover:text-[#D94E28]"
                } transition`}
              >
                MS
              </Link>
              <span className="text-[#E7E5E4]">|</span>
              <Link
                href="/th"
                className={`${
                  currentLocale === "th"
                    ? "text-[#1C1917] font-bold"
                    : "hover:text-[#D94E28]"
                } transition`}
              >
                TH
              </Link>
              <span className="text-[#E7E5E4]">|</span>
              <Link
                href="/vi"
                className={`${
                  currentLocale === "vi"
                    ? "text-[#1C1917] font-bold"
                    : "hover:text-[#D94E28]"
                } transition`}
              >
                VI
              </Link>
            </div>
            <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              {t.statusNormal}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
