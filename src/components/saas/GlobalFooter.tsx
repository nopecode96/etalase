"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { EtalaseLogo } from "@/components/brand/EtalaseLogo";
import { Mail, ShieldCheck, Zap, Building, MapPin } from "lucide-react";
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
      colLegal: string;
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
        refund: string;
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
      colSales: "Solusi Jualan",
      colFeatures: "Fitur Unggulan",
      colCompany: "Perusahaan",
      colLegal: "Bantuan & Legal",
      rights: "Hak Cipta Dilindungi di Seluruh Asia Tenggara.",
      statusNormal: "Semua Sistem Normal",
      links: {
        about: "Tentang Kami (About Us)",
        digital: "Produk Digital & E-Book",
        catalog: "Katalog Fisik & Showroom",
        affiliate: "Affiliate Keranjang Kuning",
        chatOrder: "Order Direct by Chat (0% Fee)",
        event: "Event, Tiket & Jadwal",
        waDelivery: "Kirim File & Struk ke WhatsApp",
        qris: "QRIS Instan & Margin Guard",
        customDomain: "Custom Domain (namabrand.com)",
        archetypes: "4 Arketipe Template Desain",
        freeTools: "Free Tools WhatsApp & QR",
        blog: "Blog & Panduan Monetisasi",
        helpCenter: "Pusat Bantuan",
        contact: "Hubungi Kami & Layanan DFY",
        pricing: "Biaya & Paket Langganan",
        terms: "Syarat & Ketentuan",
        refund: "Kebijakan Pengembalian & Refund",
        privacy: "Kebijakan Privasi",
      },
    },
    en: {
      tagline:
        "One storefront website for all your sales across Southeast Asia. Visual bio links, instant catalogs, and zero-commission chat checkouts.",
      managedBy: "Developed & Operated by",
      trust1: "Instant QRIS Payments",
      trust2: "Automated WhatsApp Delivery",
      colSales: "Sales Solutions",
      colFeatures: "Core Features",
      colCompany: "Company",
      colLegal: "Support & Legal",
      rights: "All Rights Reserved across Southeast Asia.",
      statusNormal: "All Systems Operational",
      links: {
        about: "About Us (Company Profile)",
        digital: "Digital Products & E-Books",
        catalog: "Physical Catalogs & Showrooms",
        affiliate: "TikTok Yellow Basket Affiliate",
        chatOrder: "Direct Chat Orders (0% Fee)",
        event: "Events, Tickets & Bookings",
        waDelivery: "Automated Files to WhatsApp",
        qris: "Instant QRIS & Margin Guard",
        customDomain: "Custom Domain (yourbrand.com)",
        archetypes: "4 Design Template Archetypes",
        freeTools: "Free Tools: WhatsApp & QR",
        blog: "Blog & Monetization Guides",
        helpCenter: "Help Center",
        contact: "Contact Us & DFY Concierge",
        pricing: "Pricing & Plans",
        terms: "Terms & Conditions",
        refund: "Refund Policy",
        privacy: "Privacy Policy",
      },
    },
    ms: {
      tagline:
        "Satu laman web etalase untuk semua jualan anda di Asia Tenggara. Pautan bio visual, katalog pantas, dan pesanan chat tanpa potongan komisen.",
      managedBy: "Dibangun & Dikendalikan oleh",
      trust1: "Pembayaran QRIS Pantas",
      trust2: "Hantar Fail Automatik ke WhatsApp",
      colSales: "Penyelesaian Jualan",
      colFeatures: "Ciri Utama",
      colCompany: "Syarikat",
      colLegal: "Bantuan & Perundangan",
      rights: "Hak Cipta Terpelihara di Seluruh Asia Tenggara.",
      statusNormal: "Semua Sistem Beroperasi",
      links: {
        about: "Mengenai Kami (Profil Syarikat)",
        digital: "Produk Digital & E-Buku",
        catalog: "Katalog Fizikal & Bilik Pameran",
        affiliate: "Affiliate Bakul Kuning",
        chatOrder: "Pesanan Direct Chat (0% Komisen)",
        event: "Acara, Tiket & Temujanji",
        waDelivery: "Hantar Fail & Resit ke WhatsApp",
        qris: "QRIS Pantas & Kawalan Margin",
        customDomain: "Domain Tersuai (jenamaanda.com)",
        archetypes: "4 Reka Bentuk Templat",
        freeTools: "Alatan Percuma WhatsApp & QR",
        blog: "Blog & Panduan Pengewangan",
        helpCenter: "Pusat Bantuan",
        contact: "Hubungi Kami & Servis DFY",
        pricing: "Harga & Pakej Langganan",
        terms: "Terma & Syarat",
        refund: "Dasar Bayaran Balik",
        privacy: "Dasar Privasi",
      },
    },
    th: {
      tagline:
        "เว็บไซต์หน้าร้านเดียวสำหรับทุกยอดขายของคุณในเอเชียตะวันออกเฉียงใต้ ลิงก์โปรไฟล์ แคตตาล็อกสินค้า และระบบสั่งซื้อผ่านแชทโดยไม่มีค่าคอมมิชชัน",
      managedBy: "พัฒนาและดำเนินการโดย",
      trust1: "ชำระเงิน QRIS รวดเร็ว",
      trust2: "ส่งไฟล์อัตโนมัติไปยัง WhatsApp",
      colSales: "โซลูชันการขาย",
      colFeatures: "ฟีเจอร์เด่น",
      colCompany: "บริษัท",
      colLegal: "ช่วยเหลือ & กฎหมาย",
      rights: "สงวนลิขสิทธิ์ทั่วเอเชียตะวันออกเฉียงใต้",
      statusNormal: "ระบบทำงานปกติทั้งหมด",
      links: {
        about: "เกี่ยวกับเรา (ข้อมูลบริษัท)",
        digital: "สินค้าดิจิทัลและอีบุ๊ก",
        catalog: "แคตตาล็อกสินค้าและโชว์รูม",
        affiliate: "ระบบนายหน้าตะกร้าเหลือง",
        chatOrder: "สั่งซื้อผ่านแชท (ค่าธรรมเนียม 0%)",
        event: "อีเวนต์ ตั๋ว และการจองคิว",
        waDelivery: "ส่งไฟล์อัตโนมัติไปยัง WhatsApp",
        qris: "ระบบ QRIS และป้องกันกำไร",
        customDomain: "โดเมนส่วนตัว (แบรนด์ของคุณ.com)",
        archetypes: "4 รูปแบบแม่แบบมาตรฐาน",
        freeTools: "เครื่องมือฟรี: WhatsApp & QR",
        blog: "บล็อกและคู่มือสร้างรายได้",
        helpCenter: "ศูนย์ช่วยเหลือ",
        contact: "ติดต่อเราและบริการ DFY",
        pricing: "ราคาและแพ็กเกจ",
        terms: "ข้อกำหนดและเงื่อนไข",
        refund: "นโยบายการคืนเงิน",
        privacy: "นโยบายความเป็นส่วนตัว",
      },
    },
    vi: {
      tagline:
        "Một website cửa hàng cho tất cả hoạt động kinh doanh tại Đông Nam Á. Bio link trực quan, danh mục tức thì, và chốt đơn qua chat không mất phí hoa hồng.",
      managedBy: "Phát triển và Vận hành bởi",
      trust1: "Thanh toán QRIS tức thì",
      trust2: "Tự động gửi tệp qua WhatsApp",
      colSales: "Giải pháp Bán hàng",
      colFeatures: "Tính năng Nổi bật",
      colCompany: "Doanh nghiệp",
      colLegal: "Hỗ trợ & Pháp lý",
      rights: "Bảo lưu mọi quyền tại khu vực Đông Nam Á.",
      statusNormal: "Hệ thống hoạt động bình thường",
      links: {
        about: "Về Chúng Tôi (Hồ sơ Doanh nghiệp)",
        digital: "Sản phẩm Số & E-Book",
        catalog: "Danh mục Vật lý & Showroom",
        affiliate: "Tiếp thị Giỏ hàng Vàng",
        chatOrder: "Đơn hàng Chat Trực tiếp (0% Phí)",
        event: "Sự kiện, Vé & Đặt lịch",
        waDelivery: "Gửi tệp & hóa đơn qua WhatsApp",
        qris: "QRIS Tức thì & Bảo toàn Lợi nhuận",
        customDomain: "Tên miền Riêng (thuonghieu.com)",
        archetypes: "4 Mẫu Giao diện Thiết kế",
        freeTools: "Công cụ Miễn phí: WhatsApp & QR",
        blog: "Blog & Hướng dẫn Kiếm tiền",
        helpCenter: "Trung tâm Hỗ trợ",
        contact: "Liên hệ & Dịch vụ Trọn gói DFY",
        pricing: "Bảng giá & Gói Dịch vụ",
        terms: "Điều khoản & Điều kiện",
        refund: "Chính sách Hoàn tiền",
        privacy: "Chính sách Bảo mật",
      },
    },
  };

  const t = footerTexts[currentLocale] || footerTexts.id;

  return (
    <footer className="bg-white border-t border-[#E7E5E4] pt-14 pb-12 px-4 sm:px-6 lg:px-8 text-sm text-[#57534E]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 mb-12">
        {/* Kolom 1 (Brand Profile & Kontak) - spans 4 cols */}
        <div className="lg:col-span-4 space-y-4 pr-0 lg:pr-4">
          <Link href={currentLocale === "id" ? "/" : `/${currentLocale}`} className="inline-block">
            <EtalaseLogo size="md" withTagline={true} />
          </Link>
          <p className="text-[#57534E] text-xs leading-relaxed max-w-sm">
            {t.tagline}
          </p>

          <div className="pt-1 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-[#57534E]">
              <Building className="w-4 h-4 text-[#D94E28] shrink-0" />
              <span>{t.managedBy}: <strong className="text-[#1C1917]">PT Rafa Kreasindo Teknologi</strong></span>
            </div>
            <a
              href="mailto:halo@etalase.online"
              className="flex items-center gap-2 text-[#57534E] hover:text-[#D94E28] transition"
            >
              <Mail className="w-4 h-4 text-[#D94E28] shrink-0" />
              <span>Email Resmi: halo@etalase.online</span>
            </a>
            <div className="flex items-start gap-2 text-[#57534E]">
              <MapPin className="w-4 h-4 text-[#D94E28] shrink-0 mt-0.5" />
              <span>Jl. Nias Dalam No. 14, Bandung, Jawa Barat 40115</span>
            </div>
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

          {/* Payment Badges */}
          <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px]">
            <span className="inline-flex items-center gap-1.5 bg-[#FAF8F5] border border-[#E7E5E4] px-2.5 py-1 rounded-lg text-[#1C1917] font-semibold">
              <span className="text-[10px] font-bold text-red-600">QRIS</span>
              <span className="text-[#57534E] font-normal text-[10px]">via PJP BI</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[#FAF8F5] border border-[#E7E5E4] px-2.5 py-1 rounded-lg text-[#1C1917] font-semibold">
              <span className="text-[10px] font-bold text-sky-600">PayPal</span>
              <span className="text-[#57534E] font-normal text-[10px]">Internasional</span>
            </span>
          </div>
        </div>

        {/* Kolom 2 (Solusi Jualan) - spans 2 cols */}
        <div className="lg:col-span-2 space-y-3">
          <h4 className="font-bold text-[#1C1917] text-xs uppercase tracking-wider">{t.colSales}</h4>
          <ul className="space-y-2.5 text-xs">
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

        {/* Kolom 3 (Fitur & Tools) - spans 2 cols */}
        <div className="lg:col-span-2 space-y-3">
          <h4 className="font-bold text-[#1C1917] text-xs uppercase tracking-wider">{t.colFeatures}</h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <Link href={getLocalizedHref("/fitur#whatsapp")} className="hover:text-[#1C1917] transition">
                {t.links.waDelivery}
              </Link>
            </li>
            <li>
              <Link href={getLocalizedHref("/fitur#qris")} className="hover:text-[#1C1917] transition">
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

        {/* Kolom 4 (Perusahaan) - spans 2 cols */}
        <div className="lg:col-span-2 space-y-3">
          <h4 className="font-bold text-[#1C1917] text-xs uppercase tracking-wider">{t.colCompany}</h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <Link href={getLocalizedHref("/about")} className="hover:text-[#1C1917] transition font-semibold text-[#D94E28]">
                {t.links.about}
              </Link>
            </li>
            <li>
              <Link href={getLocalizedHref("/blog")} className="hover:text-[#1C1917] transition">
                {t.links.blog}
              </Link>
            </li>
            <li>
              <Link href={getLocalizedHref("/harga")} className="hover:text-[#1C1917] transition">
                {t.links.pricing}
              </Link>
            </li>
            <li>
              <Link href={getLocalizedHref("/kontak")} className="hover:text-[#1C1917] transition">
                {t.links.contact}
              </Link>
            </li>
            <li>
              <a
                href="https://t.me/etalaseonline_bot"
                target="_blank"
                rel="noreferrer"
                className="text-sky-600 hover:text-sky-700 transition font-medium inline-flex items-center gap-1.5"
                title="Chat Customer Service: Rani • EtalaseOnline CS"
              >
                <div className="relative w-4 h-4 rounded-full overflow-hidden border border-sky-300 shrink-0">
                  <img
                    src="/images/rani-cs.png"
                    alt="Rani CS"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span>Rani (CS 24/7)</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </a>
            </li>
          </ul>
        </div>

        {/* Kolom 5 (Bantuan & Legal) - spans 2 cols */}
        <div className="lg:col-span-2 space-y-3">
          <h4 className="font-bold text-[#1C1917] text-xs uppercase tracking-wider">{t.colLegal}</h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <Link href={getLocalizedHref("/bantuan")} className="hover:text-[#1C1917] transition">
                {t.links.helpCenter}
              </Link>
            </li>
            <li>
              <Link href={getLocalizedHref("/syarat")} className="hover:text-[#1C1917] transition">
                {t.links.terms}
              </Link>
            </li>
            <li>
              <Link href={getLocalizedHref("/refund")} className="hover:text-[#1C1917] transition">
                {t.links.refund}
              </Link>
            </li>
            <li>
              <Link href={getLocalizedHref("/privasi")} className="hover:text-[#1C1917] transition">
                {t.links.privacy}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar: Copyright, Language, System Status */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-[#E7E5E4] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#57534E]">
        <div>
          &copy; {currentYear} PT Rafa Kreasindo Teknologi. {t.rights}
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
