"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ShoppingBag, MessageCircle, Zap, ExternalLink, Eye } from "lucide-react";
import { SupportedLocale } from "@/lib/config/constants";

interface DemoStoreCard {
  name: string;
  subdomain: string;
  role: Record<SupportedLocale, string>;
  avatar: string;
  templateName: string;
  templateTag: Record<SupportedLocale, string>;
  productTitle: Record<SupportedLocale, string>;
  productPrice: Record<SupportedLocale, string>;
  modeIcon: "qris" | "yellow" | "chat";
  modeLabel: Record<SupportedLocale, string>;
}

const SAMPLE_LABEL: Record<SupportedLocale, string> = {
  id: "Contoh tampilan",
  en: "Sample store",
  ms: "Contoh paparan",
  th: "ตัวอย่างหน้าร้าน",
  vi: "Cửa hàng mẫu",
};

const VIEW_DEMO_LABEL: Record<SupportedLocale, string> = {
  id: "Lihat contoh →",
  en: "View sample →",
  ms: "Lihat contoh →",
  th: "ดูตัวอย่าง →",
  vi: "Xem mẫu →",
};

const DEMO_STORES: DemoStoreCard[] = [
  {
    name: "Studio Rafa Creative",
    subdomain: "rafa.etalase.online",
    role: {
      id: "Video Editor & Digital Creator",
      en: "Video Editor & Digital Creator",
      ms: "Penyunting Video & Pencipta Digital",
      th: "นักตัดต่อวิดีโอและครีเอเตอร์",
      vi: "Biên tập Video & Nhà Sáng Tạo",
    },
    avatar: "/images/demo/avatar-rafa.jpg",
    templateName: "Clean Minimal",
    templateTag: {
      id: "Gratis",
      en: "Free",
      ms: "Percuma",
      th: "ฟรี",
      vi: "Miễn Phí",
    },
    productTitle: {
      id: "Preset Lightroom Cinematic Pack",
      en: "Lightroom Cinematic Presets Pack",
      ms: "Pek Praset Lightroom Cinematic",
      th: "พรีเซ็ตแต่งรูป Lightroom โทนภาพยนตร์",
      vi: "Bộ Preset Lightroom Cinematic",
    },
    productPrice: {
      id: "Rp 49.000",
      en: "$3.99",
      ms: "RM 15.00",
      th: "฿119",
      vi: "79.000 ₫",
    },
    modeIcon: "qris",
    modeLabel: {
      id: "Pembayaran QRIS Instan",
      en: "Instant QR Payment",
      ms: "Bayaran QR Pantas",
      th: "ชำระเงินผ่าน QR ทันใจ",
      vi: "Thanh Toán QR Tức Thì",
    },
  },
  {
    name: "Kopi Senja & Roastery",
    subdomain: "kopisenja.etalase.online",
    role: {
      id: "Artisan Cafe & F&B",
      en: "Artisan Cafe & Dining",
      ms: "Kafe Kraf & F&B",
      th: "คาเฟ่และร้านกาแฟพรีเมียม",
      vi: "Quán Cafe & Đồ Uống",
    },
    avatar: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=200&q=80",
    templateName: "Visual Menu Grid",
    templateTag: {
      id: "Pro",
      en: "Pro",
      ms: "Pro",
      th: "โปร",
      vi: "Pro",
    },
    productTitle: {
      id: "Buku Menu Visual & Order WhatsApp",
      en: "Visual Menu & WhatsApp Ordering",
      ms: "Menu Visual & Pesanan WhatsApp",
      th: "เมนูรูปภาพและสั่งซื้อผ่าน WhatsApp",
      vi: "Thực Đơn Trực Quan & Đặt Qua WhatsApp",
    },
    productPrice: {
      id: "Rp 25.000",
      en: "$1.99",
      ms: "RM 8.00",
      th: "฿65",
      vi: "39.000 ₫",
    },
    modeIcon: "chat",
    modeLabel: {
      id: "Order via WhatsApp (0% Fee)",
      en: "WhatsApp Order (0% Fee)",
      ms: "Pesanan WhatsApp (0% Fi)",
      th: "สั่งผ่าน WhatsApp (0% ค่าคอมฯ)",
      vi: "Đặt qua WhatsApp (0% Phí)",
    },
  },
  {
    name: "Bastian Showroom Mobil",
    subdomain: "bastianmobil.etalase.online",
    role: {
      id: "Konsultan Otomotif",
      en: "Automotive Consultant",
      ms: "Perunding Automotif",
      th: "ที่ปรึกษาการขายยานยนต์",
      vi: "Chuyên Viên Tư Vấn Ô Tô",
    },
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    templateName: "Showroom Pro",
    templateTag: {
      id: "Pro",
      en: "Pro",
      ms: "Pro",
      th: "โปร",
      vi: "Pro",
    },
    productTitle: {
      id: "Katalog Unit & Simulasi Cicilan",
      en: "Vehicle Catalog & Installment Est.",
      ms: "Katalog Kenderaan & Ansuran",
      th: "แคตตาล็อกรถและคำนวณค่างวด",
      vi: "Danh Mục Xe & Tính Trả Góp",
    },
    productPrice: {
      id: "Mulai DP 15 Jt",
      en: "DP from $990",
      ms: "DP Dari RM 4,500",
      th: "ดาวน์เริ่ม ฿35,000",
      vi: "Trả trước từ 25 Tr",
    },
    modeIcon: "chat",
    modeLabel: {
      id: "Chat Test Drive Langsung",
      en: "Direct Test Drive Inquiry",
      ms: "Uji Pandu Terus",
      th: "นัดหมายทดลองขับโดยตรง",
      vi: "Đăng Ký Lái Thử Trực Tiếp",
    },
  },
  {
    name: "Aisyah Hijab & Beauty",
    subdomain: "aisyahlook.etalase.online",
    role: {
      id: "Beauty & Fashion Creator",
      en: "Beauty & Fashion Creator",
      ms: "Pencipta Fesyen & Kecantikan",
      th: "บิวตี้และแฟชั่นครีเอเตอร์",
      vi: "Nhà Sáng Tạo Làm Đẹp",
    },
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    templateName: "Editorial Pastel",
    templateTag: {
      id: "Pro",
      en: "Pro",
      ms: "Pro",
      th: "โปร",
      vi: "Pro",
    },
    productTitle: {
      id: "Katalog Skincare & Pashmina Silk",
      en: "Curated Skincare & Silk Pashmina",
      ms: "Syor Penjagaan Kulit & Pashmina",
      th: "รวมสกินแคร์และผ้าคลุมผมซิลค์",
      vi: "BST Chăm Sóc Da & Khăn Lụa",
    },
    productPrice: {
      id: "Rp 89.000",
      en: "$5.99",
      ms: "RM 25.00",
      th: "฿199",
      vi: "145.000 ₫",
    },
    modeIcon: "yellow",
    modeLabel: {
      id: "TikTok & Shopee Affiliate",
      en: "TikTok & Shopee Affiliate",
      ms: "Afiliasi TikTok & Shopee",
      th: "แอฟฟิลิเอต TikTok & Shopee",
      vi: "Tiếp thị TikTok & Shopee",
    },
  },
  {
    name: "Konsultasi Finansial 1-on-1",
    subdomain: "demo.etalase.online",
    role: {
      id: "Coach & Mentor Bisnis",
      en: "Business Coach & Mentor",
      ms: "Jurulatih & Mentor Perniagaan",
      th: "โค้ชและที่ปรึกษาธุรกิจ",
      vi: "Cố Vấn & Huấn Luyện Viên",
    },
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    templateName: "Clean Minimal",
    templateTag: {
      id: "Gratis",
      en: "Free",
      ms: "Percuma",
      th: "ฟรี",
      vi: "Miễn Phí",
    },
    productTitle: {
      id: "Sesi Mentoring & Konsultasi Jadwal",
      en: "1-on-1 Mentoring & Calendar Booking",
      ms: "Pementoran 1-on-1 & Tempahan Jadual",
      th: "เซสชันที่ปรึกษาและจองคิวเวลา",
      vi: "Cố Vấn 1-kèm-1 & Đặt Lịch",
    },
    productPrice: {
      id: "Rp 350.000",
      en: "$25.00",
      ms: "RM 99.00",
      th: "฿790",
      vi: "550.000 ₫",
    },
    modeIcon: "qris",
    modeLabel: {
      id: "Google Meet Booking",
      en: "Google Meet Booking",
      ms: "Tempahan Google Meet",
      th: "จองเซสชัน Google Meet",
      vi: "Đặt Lịch Google Meet",
    },
  },
  {
    name: "Katalog UMKM Kuliner",
    subdomain: "kopisenja.etalase.online",
    role: {
      id: "Toko Kue & Katering Harian",
      en: "Bakery & Daily Catering",
      ms: "Kek & Katering Harian",
      th: "เบเกอรี่และอาหารกล่องโฮมเมด",
      vi: "Tiệm Bánh & Đặt Tiệc",
    },
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    templateName: "Visual Menu Grid",
    templateTag: {
      id: "Pro",
      en: "Pro",
      ms: "Pro",
      th: "โปร",
      vi: "Pro",
    },
    productTitle: {
      id: "Paket Hampers & Katalog Menu",
      en: "Gift Hampers & Digital Menu",
      ms: "Pakej Hamper & Menu Digital",
      th: "เซ็ตของขวัญและเมนูดิจิทัล",
      vi: "Set Quà Tặng & Menu Online",
    },
    productPrice: {
      id: "Rp 120.000",
      en: "$8.50",
      ms: "RM 35.00",
      th: "฿270",
      vi: "190.000 ₫",
    },
    modeIcon: "chat",
    modeLabel: {
      id: "WhatsApp Direct Order",
      en: "WhatsApp Direct Order",
      ms: "Pesanan Terus WhatsApp",
      th: "สั่งออเดอร์ตรงสู่ WhatsApp",
      vi: "Đặt Trực Tiếp Qua WhatsApp",
    },
  },
];

export function CreatorMarquee() {
  const pathname = usePathname() || "";

  let currentLocale: SupportedLocale = "id";
  if (pathname.startsWith("/en")) currentLocale = "en";
  else if (pathname.startsWith("/ms")) currentLocale = "ms";
  else if (pathname.startsWith("/th")) currentLocale = "th";
  else if (pathname.startsWith("/vi")) currentLocale = "vi";

  const sampleLabel = SAMPLE_LABEL[currentLocale] || SAMPLE_LABEL.id;
  const viewDemoLabel = VIEW_DEMO_LABEL[currentLocale] || VIEW_DEMO_LABEL.id;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {DEMO_STORES.map((item, idx) => (
          <a
            key={`${item.name}-${idx}`}
            href={`https://${item.subdomain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#FAF8F5] border border-[#E7E5E4] rounded-2xl p-4 flex flex-col justify-between shadow-2xs hover:shadow-sm hover:border-[#D94E28]/50 transition group"
          >
            {/* Sample label + template tier badge */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                <Eye className="w-3 h-3" />
                <span>{sampleLabel}</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#57534E] bg-white border border-[#E7E5E4] px-2 py-0.5 rounded-md shrink-0">
                {item.templateName} &bull; {item.templateTag[currentLocale] || item.templateTag.id}
              </span>
            </div>

            {/* Header Profil Toko Demo */}
            <div className="flex items-center gap-3">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-10 h-10 rounded-full object-cover border border-[#E7E5E4] shrink-0"
              />
              <div className="flex-1 min-w-0 text-left">
                <div className="font-bold text-xs text-[#1C1917] truncate">
                  {item.name}
                </div>
                <div className="text-[11px] text-[#57534E] truncate">
                  {item.role[currentLocale] || item.role.id}
                </div>
                <div className="text-[11px] text-[#D94E28] font-mono truncate">
                  {item.subdomain}
                </div>
              </div>
            </div>

            {/* Produk Unggulan Preview */}
            <div className="mt-3 pt-3 border-t border-stone-200/70 flex items-center justify-between text-left gap-2">
              <div className="min-w-0">
                <div className="text-[11px] text-[#57534E] truncate font-medium">
                  {item.productTitle[currentLocale] || item.productTitle.id}
                </div>
                <div className="text-xs font-black text-[#1C1917]">
                  {item.productPrice[currentLocale] || item.productPrice.id}
                </div>
              </div>
              <span className="text-[11px] font-semibold text-[#D94E28] group-hover:underline shrink-0 inline-flex items-center gap-1">
                <span>{viewDemoLabel}</span>
                <ExternalLink className="w-3 h-3" />
              </span>
            </div>

            {/* Mode Transaksi Chip */}
            <div className="mt-2.5 pt-2 border-t border-stone-200/50 flex items-center justify-between text-[10px] text-[#57534E]">
              <span className="flex items-center gap-1 font-semibold truncate">
                {item.modeIcon === "qris" && <Zap className="w-3 h-3 text-[#D94E28]" />}
                {item.modeIcon === "chat" && <MessageCircle className="w-3 h-3 text-emerald-600" />}
                {item.modeIcon === "yellow" && <ShoppingBag className="w-3 h-3 text-amber-600" />}
                {item.modeLabel[currentLocale] || item.modeLabel.id}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
