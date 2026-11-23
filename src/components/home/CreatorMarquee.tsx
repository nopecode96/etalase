"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { CheckCircle2, ShoppingBag, MessageCircle, Zap } from "lucide-react";
import { SupportedLocale } from "@/lib/config/constants";

interface CreatorCard {
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
  stat: Record<SupportedLocale, string>;
}

const CREATORS: CreatorCard[] = [
  {
    name: "Rafa Creative Studio",
    subdomain: "rafa.etalase.online",
    role: {
      id: "Video Editor & Digital Creator",
      en: "Video Editor & Digital Creator",
      ms: "Penyunting Video & Pencipta Digital",
      th: "นักตัดต่อวิดีโอและครีเอเตอร์",
      vi: "Biên tập Video & Nhà Sáng Tạo",
    },
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
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
    stat: {
      id: "1,420 Terjual",
      en: "1,420 Sold",
      ms: "1,420 Terjual",
      th: "ขายแล้ว 1,420 ชิ้น",
      vi: "Đã bán 1.420",
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
      id: "Buku Menu Visual & Meja Kasir QR",
      en: "Visual Menu & Table QR Ordering",
      ms: "Menu Visual & Meja Kasir QR",
      th: "เมนูรูปภาพ & QR สั่งอาหารที่โต๊ะ",
      vi: "Thực Đơn Trực Quan & QR Tại Bàn",
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
      th: "สั่งผ่าน WhatsApp (ฟรีค่าธรรมเนียม)",
      vi: "Đặt qua WhatsApp (0% Phí)",
    },
    stat: {
      id: "850+ Order/Bln",
      en: "850+ Orders/Mo",
      ms: "850+ Pesanan/Bln",
      th: "850+ ออเดอร์/เดือน",
      vi: "850+ Đơn/Tháng",
    },
  },
  {
    name: "Bastian Showroom Mobil",
    subdomain: "bastianmobil.etalase.online",
    role: {
      id: "Konsultan Otomotif Senior",
      en: "Senior Automotive Consultant",
      ms: "Perunding Automotif Kanan",
      th: "ที่ปรึกษาการขายยานยนต์อาวุโส",
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
    stat: {
      id: "12 Unit Terjual",
      en: "12 Units Sold",
      ms: "12 Unit Terjual",
      th: "ส่งมอบแล้ว 12 คัน",
      vi: "Đã giao 12 Xe",
    },
  },
  {
    name: "Aisyah Hijab & Beauty",
    subdomain: "aisyahlook.etalase.online",
    role: {
      id: "Beauty & Fashion Creator",
      en: "Beauty & Fashion Creator",
      ms: "Pencipta Fesyen & Kecantikan",
      th: "บิวตี้และแฟชั่นบล็อกเกอร์",
      vi: "Nhà Sáng Tạo Làm Đẹp & Thời Trang",
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
      id: "Rekomendasi Lipcream & Pashmina Silk",
      en: "Curated Lip Cream & Silk Pashmina",
      ms: "Syor Krim Bibir & Pashmina Sutera",
      th: "รวมไอเทมลิปสติกและผ้าคลุมผมซิลค์",
      vi: "BST Son Môi & Khăn Lụa Cao Cấp",
    },
    productPrice: {
      id: "Keranjang Kuning",
      en: "Yellow Basket",
      ms: "Beg Kuning",
      th: "ตะกร้าเหลือง",
      vi: "Giỏ Vàng",
    },
    modeIcon: "yellow",
    modeLabel: {
      id: "TikTok Shop Affiliate",
      en: "TikTok Shop Affiliate",
      ms: "Afiliasi TikTok Shop",
      th: "แอฟฟิลิเอต TikTok Shop",
      vi: "Tiếp thị TikTok Shop",
    },
    stat: {
      id: "3.4K Klik Rekomendasi",
      en: "3.4K Product Clicks",
      ms: "3.4K Klik Syor",
      th: "3.4 พันคลิกแนะนำ",
      vi: "3,4K Lượt Nhấp",
    },
  },
  {
    name: "Dr. Hendra Wibowo",
    subdomain: "drhendra.etalase.online",
    role: {
      id: "Konsultan Finansial & Edukasi Saham",
      en: "Financial Consultant & Wealth Coach",
      ms: "Perunding Kewangan & Jurulatih Saham",
      th: "ที่ปรึกษาการเงินและการลงทุน",
      vi: "Chuyên Gia Tư Vấn Tài Chính",
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
      id: "Mentoring Portfolio Audit 1-on-1",
      en: "1-on-1 Portfolio Audit Mentoring",
      ms: "Pementoran Audit Portfolio 1-on-1",
      th: "ให้คำปรึกษาตรวจพอร์ตการลงทุน 1 ต่อ 1",
      vi: "Cố Vấn & Đánh Giá Danh Mục 1-kèm-1",
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
    stat: {
      id: "94 Slot Penuh",
      en: "94 Booked Slots",
      ms: "94 Slot Dipenuhi",
      th: "เต็ม 94 รอบ",
      vi: "Đã kín 94 Lịch",
    },
  },
  {
    name: "Nurul Kitchen KL",
    subdomain: "nurulkl.etalase.online",
    role: {
      id: "Kek & Pastri Homebaker",
      en: "Artisan Pastry & Homebaker",
      ms: "Kek & Pastri Homebaker",
      th: "เบเกอรี่โฮมเมดและขนมอบ",
      vi: "Bánh Ngọt & Tiệm Bánh Thủ Công",
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
      id: "Order Kek Batik & Brownies",
      en: "Fudge Brownies & Artisan Cakes",
      ms: "Pesanan Kek Batik & Brownies",
      th: "สั่งบราวนี่และเค้กพรีเมียม",
      vi: "Đặt Bánh Brownie & Bánh Kem",
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
    stat: {
      id: "1,150 Kotak/Bln",
      en: "1,150 Boxes/Mo",
      ms: "1,150 Kotak/Bln",
      th: "1,150 กล่อง/เดือน",
      vi: "1.150 Hộp/Tháng",
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

  return (
    <div className="w-full overflow-hidden select-none relative group py-2">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-5">
        {[...CREATORS, ...CREATORS].map((item, idx) => (
          <div
            key={idx}
            className="w-[300px] sm:w-[320px] bg-[#FAF8F5] border border-[#E7E5E4] rounded-2xl p-4 flex flex-col justify-between shadow-2xs hover:shadow-xs hover:border-[#D94E28]/40 transition shrink-0"
          >
            {/* Header Profil Kreator */}
            <div className="flex items-center gap-3">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-10 h-10 rounded-full object-cover border border-[#E7E5E4] shrink-0"
              />
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-[#1C1917] truncate">
                    {item.name}
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                </div>
                <div className="text-[11px] text-[#D94E28] font-mono truncate">
                  {item.subdomain}
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#57534E] bg-white border border-[#E7E5E4] px-2 py-0.5 rounded-md shrink-0">
                {item.templateTag[currentLocale] || item.templateTag.id}
              </span>
            </div>

            {/* Produk Unggulan Preview */}
            <div className="mt-3 pt-3 border-t border-stone-200/60 flex items-center justify-between text-left">
              <div className="min-w-0 pr-2">
                <div className="text-[11px] text-[#57534E] truncate font-medium">
                  {item.productTitle[currentLocale] || item.productTitle.id}
                </div>
                <div className="text-xs font-black text-[#1C1917]">
                  {item.productPrice[currentLocale] || item.productPrice.id}
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 block">
                  {item.stat[currentLocale] || item.stat.id}
                </span>
              </div>
            </div>

            {/* Mode Transaksi Chip */}
            <div className="mt-2.5 pt-2 border-t border-stone-200/40 flex items-center justify-between text-[10px] text-[#57534E]">
              <span className="flex items-center gap-1 font-semibold truncate">
                {item.modeIcon === "qris" && <Zap className="w-3 h-3 text-[#D94E28]" />}
                {item.modeIcon === "chat" && <MessageCircle className="w-3 h-3 text-emerald-600" />}
                {item.modeIcon === "yellow" && <ShoppingBag className="w-3 h-3 text-amber-600" />}
                {item.modeLabel[currentLocale] || item.modeLabel.id}
              </span>
              <span className="text-[10px] text-stone-400 font-medium">
                {item.templateName}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
