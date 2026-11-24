"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { EtalaseLogo } from "@/components/brand/EtalaseLogo";
import { Mail, ShieldCheck, Zap, Building } from "lucide-react";
import { SupportedLocale } from "@/lib/config/constants";

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

  const footerTexts: Record<
    SupportedLocale,
    {
      tagline: string;
      managedBy: string;
      trust1: string;
      trust2: string;
      colSales: string;
      colFeatures: string;
      colCompany: string;
      rights: string;
      statusNormal: string;
      links: {
        about: string;
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
        blog: string;
        helpCenter: string;
        contact: string;
        pricing: string;
        terms: string;
        privacy: string;
      };
    }
  > = {
    id: {
      tagline:
        "Satu website etalase untuk semua jualan Anda di Asia Tenggara. Bio link visual, katalog instan, dan checkout chat tanpa potongan komisi.",
      managedBy: "Pengembang & Pengelola",
      trust1: "Pembayaran QRIS Instan",
      trust2: "Kirim File Otomatis ke WA",
      colSales: "Jualan",
      colFeatures: "Fitur & Tools",
      colCompany: "Perusahaan & Bantuan",
      rights: "Hak Cipta Dilindungi di Seluruh Asia Tenggara.",
      statusNormal: "Semua Sistem Normal",
      links: {
        about: "Tentang Kami (About Us)",
        digital: "Produk Digital & E-Book",
        catalog: "Katalog Fisik & Showroom",
        affiliate: "Affiliate Keranjang Kuning",
        chatOrder: "Order Direct by Chat (0% Fee)",
        event: "Event, Tiket & Booking Jadwal",
        waDelivery: "Kirim File & Struk ke WhatsApp",
        qris: "QRIS Instan & Margin Guard",
        customDomain: "Custom Domain (namabrand.com)",
        archetypes: "4 Arketipe Template Desain",
        freeTools: "Free Tools WhatsApp & QR Code",
        blog: "Blog & Panduan Monetisasi",
        helpCenter: "Pusat Bantuan & Panduan",
        contact: "Hubungi Kami & Layanan DFY",
        pricing: "Biaya & Paket Berlangganan",
        terms: "Syarat & Ketentuan Layanan",
        privacy: "Kebijakan Privasi",
      },
    },
    en: {
      tagline:
        "One storefront website for all your sales across Southeast Asia. Visual bio links, instant catalogs, and zero-commission chat checkouts.",
      managedBy: "Developed & Operated by",
      trust1: "Instant QRIS Payments",
      trust2: "Automated WhatsApp Delivery",
      colSales: "Selling",
      colFeatures: "Features & Tools",
      colCompany: "Company & Support",
      rights: "All Rights Reserved across Southeast Asia.",
      statusNormal: "All Systems Operational",
      links: {
        about: "About Us (Company Profile)",
        digital: "Digital Products & E-Books",
        catalog: "Physical Catalogs & Showrooms",
        affiliate: "TikTok Yellow Basket Affiliate",
        chatOrder: "Direct Chat Orders (0% Commission)",
        event: "Events, Tickets & Schedule Bookings",
        waDelivery: "Automated Files & Receipts to WhatsApp",
        qris: "Instant QRIS & Margin Guardrails",
        customDomain: "Custom Domain (yourbrand.com)",
        archetypes: "4 Design Template Archetypes",
        freeTools: "Free Tools: WhatsApp & QR Code",
        blog: "Blog & Monetization Guides",
        helpCenter: "Help Center & Documentation",
        contact: "Contact Us & DFY Concierge",
        pricing: "Pricing & Plans",
        terms: "Terms & Conditions",
        privacy: "Privacy Policy",
      },
    },
    ms: {
      tagline:
        "Satu laman web etalase untuk semua jualan anda di Asia Tenggara. Pautan bio visual, katalog pantas, dan pesanan chat tanpa potongan komisen.",
      managedBy: "Dibangun & Dikendalikan oleh",
      trust1: "Pembayaran QRIS Pantas",
      trust2: "Hantar Fail Automatik ke WhatsApp",
      colSales: "Jualan",
      colFeatures: "Ciri & Alat",
      colCompany: "Syarikat & Bantuan",
      rights: "Hak Cipta Terpelihara di Seluruh Asia Tenggara.",
      statusNormal: "Semua Sistem Beroperasi Normal",
      links: {
        about: "Tentang Kami (Profil Syarikat)",
        digital: "Produk Digital & E-Buku",
        catalog: "Katalog Fizikal & Bilik Pameran",
        affiliate: "Afiliasi Beg Kuning TikTok",
        chatOrder: "Pesanan Terus Chat (0% Komisen)",
        event: "Acara, Tiket & Tempahan Slot",
        waDelivery: "Hantar Fail & Resit ke WhatsApp",
        qris: "QRIS Pantas & Kawalan Margin",
        customDomain: "Domain Tersuai (jenamaanda.com)",
        archetypes: "4 Arketip Templat Reka Bentuk",
        freeTools: "Alat Percuma WhatsApp & QR Code",
        blog: "Blog & Panduan Pengewangan",
        helpCenter: "Pusat Bantuan & Panduan",
        contact: "Hubungi Kami & Servis DFY",
        pricing: "Yuran & Pelan Langganan",
        terms: "Terma & Syarat Perkhidmatan",
        privacy: "Dasar Privasi",
      },
    },
    th: {
      tagline:
        "เว็บไซต์หน้าร้านเดียวสำหรับทุกยอดขายของคุณในเอเชียตะวันออกเฉียงใต้ ไบโอลิงก์แบบรูปภาพ แคตตาล็อกทันใจ และระบบชำระเงินผ่านแชตโดยไม่มีค่าคอมมิชชัน",
      managedBy: "พัฒนาและดำเนินการโดย",
      trust1: "ชำระเงิน QRIS รวดเร็ว",
      trust2: "ส่งไฟล์อัตโนมัติถึง WhatsApp",
      colSales: "การขาย",
      colFeatures: "ฟีเจอร์และเครื่องมือ",
      colCompany: "เกี่ยวกับเราและความช่วยเหลือ",
      rights: "สงวนลิขสิทธิ์ทั่วเอเชียตะวันออกเฉียงใต้",
      statusNormal: "ระบบทั้งหมดทำงานปกติ",
      links: {
        about: "เกี่ยวกับเรา (ข้อมูลบริษัท)",
        digital: "สินค้าดิจิทัลและอีบุ๊ก",
        catalog: "แคตตาล็อกสินค้าจริงและโชว์รูม",
        affiliate: "แอฟฟิลิเอตตะกร้าเหลือง TikTok",
        chatOrder: "สั่งซื้อผ่านแชตโดยตรง (0% คอมมิชชัน)",
        event: "อีเวนต์ ตั๋ว และการจองเวลา",
        waDelivery: "ส่งไฟล์และใบเสร็จสู่ WhatsApp อัตโนมัติ",
        qris: "ระบบ QRIS และป้องกันกำไร",
        customDomain: "โดเมนส่วนตัว (yourbrand.com)",
        archetypes: "4 รูปแบบแม่แบบการออกแบบ",
        freeTools: "เครื่องมือฟรี WhatsApp & QR Code",
        blog: "บล็อกและคู่มือสร้างรายได้",
        helpCenter: "ศูนย์ช่วยเหลือและคู่มือ",
        contact: "ติดต่อเราและบริการ DFY",
        pricing: "ราคาและแพ็กเกจ",
        terms: "ข้อกำหนดและเงื่อนไข",
        privacy: "นโยบายความเป็นส่วนตัว",
      },
    },
    vi: {
      tagline:
        "Một website storefront cho tất cả sản phẩm bán của bạn tại Đông Nam Á. Link bio trực quan, danh mục tức thì, và chốt đơn qua chat không mất phí hoa hồng.",
      managedBy: "Phát triển & Quản lý bởi",
      trust1: "Thanh toán QRIS tức thì",
      trust2: "Gửi file tự động vào WhatsApp",
      colSales: "Bán hàng",
      colFeatures: "Tính năng & Công cụ",
      colCompany: "Doanh nghiệp & Hỗ trợ",
      rights: "Bảo lưu mọi quyền tại khu vực Đông Nam Á.",
      statusNormal: "Mọi hệ thống hoạt động bình thường",
      links: {
        about: "Về chúng tôi (Hồ sơ công ty)",
        digital: "Sản phẩm số & E-Book",
        catalog: "Danh mục sản phẩm & Showroom",
        affiliate: "Tiếp thị liên kết Giỏ vàng TikTok",
        chatOrder: "Đơn hàng Chat Trực tiếp (0% Hoa hồng)",
        event: "Sự kiện, Vé & Đặt lịch hẹn",
        waDelivery: "Gửi file & Hóa đơn tự động qua WhatsApp",
        qris: "QRIS Tức thì & Bảo toàn Lợi nhuận",
        customDomain: "Tên miền riêng (yourbrand.com)",
        archetypes: "4 Mẫu Giao Diện Thiết Kế",
        freeTools: "Công cụ Miễn phí WhatsApp & QR Code",
        blog: "Blog & Cẩm nang Kiếm tiền",
        helpCenter: "Trung tâm Hỗ trợ & Hướng dẫn",
        contact: "Liên hệ & Dịch vụ Trọn gói DFY",
        pricing: "Bảng giá & Gói dịch vụ",
        terms: "Điều khoản & Điều kiện dịch vụ",
        privacy: "Chính sách Bảo mật",
      },
    },
  };

  const t = footerTexts[currentLocale] || footerTexts.id;

  return (
    <footer className="mt-auto bg-white border-t border-[#E7E5E4] py-16 px-4 sm:px-6 lg:px-8 text-xs text-[#57534E]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Kolom 1 (Brand & Kontak) */}
        <div className="space-y-4">
          <Link href={currentLocale === "id" ? "/" : `/${currentLocale}`}>
            <EtalaseLogo size="md" withTagline={true} />
          </Link>
          <p className="text-[#57534E] text-xs leading-relaxed">
            {t.tagline}
          </p>

          <div className="pt-2 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-[#57534E]">
              <Building className="w-4 h-4 text-[#D94E28] shrink-0" />
              <span>{t.managedBy}: <strong className="text-[#1C1917]">Rafa Kreasindo Teknologi</strong></span>
            </div>
            <a
              href="mailto:halo@etalase.online"
              className="flex items-center gap-2 text-[#57534E] hover:text-[#D94E28] transition"
            >
              <Mail className="w-4 h-4 text-[#D94E28] shrink-0" />
              <span>Email Resmi: halo@etalase.online</span>
            </a>
          </div>

          <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
            <span className="inline-flex items-center gap-1.5 bg-[#FAF8F5] border border-[#E7E5E4] px-2.5 py-1 rounded-lg text-[#1C1917]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D94E28]" />
              {t.trust1}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[#FAF8F5] border border-[#E7E5E4] px-2.5 py-1 rounded-lg text-[#1C1917]">
              <Zap className="w-3.5 h-3.5 text-[#D94E28]" />
              {t.trust2}
            </span>
          </div>
        </div>

        {/* Kolom 2 (Jualan) */}
        <div className="space-y-3">
          <h4 className="font-bold text-[#1C1917] text-xs uppercase tracking-wider">{t.colSales}</h4>
          <ul className="space-y-2.5">
            <li>
              <Link href={getLocalizedHref("/fitur#digital")} className="hover:text-[#1C1917] transition">
                {t.links.digital}
              </Link>
            </li>
            <li>
              <Link href={getLocalizedHref("/fitur#katalog")} className="hover:text-[#1C1917] transition">
                {t.links.catalog}
              </Link>
            </li>
            <li>
              <Link href={getLocalizedHref("/fitur#affiliate")} className="hover:text-[#1C1917] transition">
                {t.links.affiliate}
              </Link>
            </li>
            <li>
              <Link href={getLocalizedHref("/fitur#chat-order")} className="hover:text-[#1C1917] transition">
                {t.links.chatOrder}
              </Link>
            </li>
            <li>
              <Link href={getLocalizedHref("/fitur#event")} className="hover:text-[#1C1917] transition">
                {t.links.event}
              </Link>
            </li>
          </ul>
        </div>

        {/* Kolom 3 (Fitur & Tools) */}
        <div className="space-y-3">
          <h4 className="font-bold text-[#1C1917] text-xs uppercase tracking-wider">{t.colFeatures}</h4>
          <ul className="space-y-2.5">
            <li>
              <Link href={getLocalizedHref("/fitur#chat-order")} className="hover:text-[#1C1917] transition">
                {t.links.waDelivery}
              </Link>
            </li>
            <li>
              <Link href={getLocalizedHref("/fitur#fintech")} className="hover:text-[#1C1917] transition">
                {t.links.qris}
              </Link>
            </li>
            <li>
              <Link href={getLocalizedHref("/fitur#domain")} className="hover:text-[#1C1917] transition">
                {t.links.customDomain}
              </Link>
            </li>
            <li>
              <Link href={getLocalizedHref("/template")} className="hover:text-[#1C1917] transition">
                {t.links.archetypes}
              </Link>
            </li>
            <li>
              <Link href={getLocalizedHref("/tools")} className="hover:text-[#1C1917] transition">
                {t.links.freeTools}
              </Link>
            </li>
          </ul>
        </div>

        {/* Kolom 4 (Perusahaan & Bantuan) */}
        <div className="space-y-3">
          <h4 className="font-bold text-[#1C1917] text-xs uppercase tracking-wider">{t.colCompany}</h4>
          <ul className="space-y-2.5">
            <li>
              <Link href={getLocalizedHref("/about")} className="hover:text-[#1C1917] transition font-semibold text-[#D94E28]">
                {t.links.about}
              </Link>
            </li>
            <li>
              <Link href={getLocalizedHref("/blog")} className="hover:text-[#1C1917] transition font-medium">
                {t.links.blog}
              </Link>
            </li>
            <li>
              <Link href={getLocalizedHref("/kontak")} className="hover:text-[#1C1917] transition">
                {t.links.contact}
              </Link>
            </li>
            <li>
              <Link href={getLocalizedHref("/bantuan")} className="hover:text-[#1C1917] transition">
                {t.links.helpCenter}
              </Link>
            </li>
            <li>
              <Link href={getLocalizedHref("/harga")} className="hover:text-[#1C1917] transition">
                {t.links.pricing}
              </Link>
            </li>
            <li>
              <Link href={getLocalizedHref("/bantuan")} className="hover:text-[#1C1917] transition">
                {t.links.terms}
              </Link>
            </li>
            <li>
              <Link href={getLocalizedHref("/bantuan")} className="hover:text-[#1C1917] transition">
                {t.links.privacy}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-6 border-t border-[#E7E5E4] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#57534E]">
        <div>
          &copy; {currentYear} Rafa Kreasindo Teknologi. {t.rights}
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 font-medium">
            <Link href="/" className={`${currentLocale === "id" ? "text-[#1C1917] font-bold" : "hover:text-[#D94E28]"} transition`}>ID</Link>
            <span className="text-[#E7E5E4]">|</span>
            <Link href="/en" className={`${currentLocale === "en" ? "text-[#1C1917] font-bold" : "hover:text-[#D94E28]"} transition`}>EN</Link>
            <span className="text-[#E7E5E4]">|</span>
            <Link href="/ms" className={`${currentLocale === "ms" ? "text-[#1C1917] font-bold" : "hover:text-[#D94E28]"} transition`}>MS</Link>
            <span className="text-[#E7E5E4]">|</span>
            <Link href="/th" className={`${currentLocale === "th" ? "text-[#1C1917] font-bold" : "hover:text-[#D94E28]"} transition`}>TH</Link>
            <span className="text-[#E7E5E4]">|</span>
            <Link href="/vi" className={`${currentLocale === "vi" ? "text-[#1C1917] font-bold" : "hover:text-[#D94E28]"} transition`}>VI</Link>
          </div>
          <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            {t.statusNormal}
          </span>
        </div>
      </div>
    </footer>
  );
}
