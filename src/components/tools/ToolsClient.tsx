"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GlobalHeader } from "@/components/saas/GlobalHeader";
import { GlobalFooter } from "@/components/saas/GlobalFooter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Wrench, ArrowRight } from "lucide-react";
import { SupportedLocale } from "@/lib/config/constants";

interface ToolsTranslation {
  badge: string;
  h1: string;
  subtitle: string;

  tool1Badge: string;
  tool1Title: string;
  tool1Desc: string;
  channelLabel: string;
  phoneLabel: string;
  phonePlaceholder: string;
  messageLabel: string;
  messageDefault: string;
  generateBtn: string;
  linkReadyLabel: string;

  tool2Badge: string;
  tool2Title: string;
  tool2Desc: string;
  gmvLabel: string;
  currencyPrefix: string;
  currencySuffix: string;
  defaultGmv: number;
  marketplaceFeeLabel: string;
  etalaseFeeLabel: string;
  estimatedSavingsLabel: string;
  savingsNote: string;
  ctaBtn: string;
}

export const TOOLS_TRANSLATIONS: Record<SupportedLocale, ToolsTranslation> = {
  id: {
    badge: "Free Growth Tools untuk Kreator & Seller SEA",
    h1: "Alat Bantu Gratis untuk Akselerasi Bisnis Anda.",
    subtitle:
      "Koleksi kalkulator profit dan generator link multi-channel gratis untuk mempercepat penjualan langsung Anda di Asia Tenggara.",

    tool1Badge: "Tool #1 • Multi-Channel SEA",
    tool1Title: "Direct Chat Order Link Generator",
    tool1Desc:
      "Buat link chat otomatis (WhatsApp, Zalo, LINE) yang siap dipasang di bio media sosial Anda.",
    channelLabel: "Pilih Saluran Chat",
    phoneLabel: "Nomor HP (Contoh: 628123456789)",
    phonePlaceholder: "628xxxxxxxxxx",
    messageLabel: "Format Pesan Pembuka",
    messageDefault: "Halo, saya ingin bertanya tentang produk...",
    generateBtn: "Generate Link Chat",
    linkReadyLabel: "Link Anda Siap Dipakai:",

    tool2Badge: "Tool #2 • Kalkulator Penghematan",
    tool2Title: "Kalkulator Potongan Marketplace vs Direct Storefront",
    tool2Desc:
      "Bandingkan berapa banyak uang yang bisa Anda hemat tiap bulan dengan direct checkout di etalase.online vs potongan 10–12% marketplace.",
    gmvLabel: "Estimasi Penjualan Bulanan (GMV)",
    currencyPrefix: "Rp ",
    currencySuffix: "",
    defaultGmv: 10000000,
    marketplaceFeeLabel: "Potongan Marketplace (Est. 10%)",
    etalaseFeeLabel: "Biaya Transaksi etalase.online (Est. 2%)",
    estimatedSavingsLabel: "Estimasi Penghematan Margin Bersih Anda",
    savingsNote:
      "*Belum termasuk keuntungan dari 100% kepemilikan data pelanggan (nomor WhatsApp pembeli langsung masuk ke kontak Anda).",
    ctaBtn: "Mulai Amankan Margin Anda",
  },
  en: {
    badge: "Free Growth Tools for SEA Creators & Sellers",
    h1: "Free Utility Tools to Accelerate Your Business.",
    subtitle:
      "A collection of free profit calculators and multi-channel chat link generators designed to streamline your direct commerce in Southeast Asia.",

    tool1Badge: "Tool #1 • Multi-Channel SEA",
    tool1Title: "Direct Chat Order Link Generator",
    tool1Desc:
      "Generate instant pre-filled chat order links (WhatsApp, Zalo, LINE) ready for your social media bio links.",
    channelLabel: "Select Chat Platform",
    phoneLabel: "Phone Number with Country Code",
    phonePlaceholder: "628xxxxxxxxxx / 601xxxxxxxxx",
    messageLabel: "Opening Message Template",
    messageDefault: "Hello! I would like to inquire about your product...",
    generateBtn: "Generate Chat Link",
    linkReadyLabel: "Your Link is Ready to Share:",

    tool2Badge: "Tool #2 • Savings Calculator",
    tool2Title: "Marketplace Commissions vs Direct Storefront Calculator",
    tool2Desc:
      "Calculate how much net profit you can preserve each month by offering direct checkout on etalase.online versus 10–12% marketplace commission cuts.",
    gmvLabel: "Estimated Monthly Sales (GMV)",
    currencyPrefix: "$",
    currencySuffix: "",
    defaultGmv: 1000,
    marketplaceFeeLabel: "Marketplace Commission Cuts (Est. 10%)",
    etalaseFeeLabel: "etalase.online Processing Cost (Est. 2%)",
    estimatedSavingsLabel: "Your Estimated Net Profit Preserved",
    savingsNote:
      "*Excludes the exponential value of 100% first-party customer data ownership (direct WhatsApp contacts in your CRM).",
    ctaBtn: "Protect Your Profits Now",
  },
  ms: {
    badge: "Alat Pertumbuhan Percuma untuk Peniaga SEA",
    h1: "Alat Bantu Percuma untuk Pacu Perniagaan Anda.",
    subtitle:
      "Koleksi kalkulator keuntungan dan penjana pautan pesanan sembang pelbagai saluran percuma untuk mempercepatkan jualan terus di Asia Tenggara.",

    tool1Badge: "Alat #1 • Pelbagai Saluran SEA",
    tool1Title: "Penjana Pautan Pesanan Direct Chat",
    tool1Desc:
      "Hasilkan pautan pesanan automatik (WhatsApp, Zalo, LINE) sedia untuk diletakkan pada bio media sosial anda.",
    channelLabel: "Pilih Saluran Sembang",
    phoneLabel: "Nombor Telefon Beserta Kod Negara",
    phonePlaceholder: "601xxxxxxxx / 628xxxxxxxxxx",
    messageLabel: "Format Mesej Pembukaan",
    messageDefault: "Salam, saya berminat untuk membuat pertanyaan tentang produk...",
    generateBtn: "Jana Pautan Sembang",
    linkReadyLabel: "Pautan Anda Sedia Digunakan:",

    tool2Badge: "Alat #2 • Kalkulator Penjimatan",
    tool2Title: "Kalkulator Potongan Pasaran vs Etalase Mandiri",
    tool2Desc:
      "Bandingkan berapa banyak wang yang boleh dijimatkan setiap bulan dengan jualan terus di etalase.online berbanding potongan 10–12% platform pasaran.",
    gmvLabel: "Anggaran Jualan Bulanan (GMV)",
    currencyPrefix: "RM ",
    currencySuffix: "",
    defaultGmv: 4000,
    marketplaceFeeLabel: "Potongan Pasaran (Anggaran 10%)",
    etalaseFeeLabel: "Kos Pemprosesan etalase.online (Anggaran 2%)",
    estimatedSavingsLabel: "Anggaran Penjimatan Untung Bersih Anda",
    savingsNote:
      "*Tidak termasuk nilai pemilikan 100% data pelanggan (nombor WhatsApp pembeli kekal milik anda).",
    ctaBtn: "Kekalkan Keuntungan Anda",
  },
  th: {
    badge: "เครื่องมือฟรีสำหรับครีเอเตอร์และร้านค้าใน SEA",
    h1: "เครื่องมือฟรีเพื่อเร่งการเติบโตของธุรกิจคุณ",
    subtitle:
      "รวมเครื่องมือคำนวณกำไรและสร้างลิงก์สั่งซื้อผ่านแชตหลายช่องทาง เพื่อเร่งยอดขายโดยตรงในเอเชียตะวันออกเฉียงใต้",

    tool1Badge: "เครื่องมือ #1 • ครอบคลุมทั่วเอเชียตะวันออกเฉียงใต้",
    tool1Title: "ระบบสร้างลิงก์สั่งซื้อทางแชตโดยตรง",
    tool1Desc:
      "สร้างลิงก์แชตพร้อมข้อความเริ่มต้นอัตโนมัติ (WhatsApp, Zalo, LINE) พร้อมนำไปใส่ในไบโอโซเชียลมีเดียของคุณ",
    channelLabel: "เลือกช่องทางแชต",
    phoneLabel: "เบอร์โทรศัพท์พร้อมรหัสประเทศ (เช่น 66812345678)",
    phonePlaceholder: "668xxxxxxxx / 628xxxxxxxxxx",
    messageLabel: "ข้อความเริ่มต้นเมื่อลูกค้ากดลิงก์",
    messageDefault: "สวัสดีครับ/ค่ะ สนใจสอบถามข้อมูลเกี่ยวกับสินค้า...",
    generateBtn: "สร้างลิงก์แชต",
    linkReadyLabel: "ลิงก์ของคุณพร้อมใช้งานแล้ว:",

    tool2Badge: "เครื่องมือ #2 • คำนวณส่วนต่างกำไร",
    tool2Title: "เปรียบเทียบค่าคอมมิชชันมาร์เก็ตเพลส vs หน้าร้านของตนเอง",
    tool2Desc:
      "คำนวณจำนวนเงินที่คุณประหยัดได้ในแต่ละเดือนเมื่อใช้ระบบสั่งซื้อโดยตรงบน etalase.online เทียบกับการถูกหักค่าธรรมเนียม 10–12% บนมาร์เก็ตเพลส",
    gmvLabel: "ยอดขายโดยประมาณต่อเดือน (GMV)",
    currencyPrefix: "฿",
    currencySuffix: "",
    defaultGmv: 35000,
    marketplaceFeeLabel: "ค่าคอมมิชชันมาร์เก็ตเพลส (ประมาณ 10%)",
    etalaseFeeLabel: "ค่าธรรมเนียม etalase.online (ประมาณ 2%)",
    estimatedSavingsLabel: "กำไรสุทธิที่คุณสามารถประหยัดได้ต่อเดือน",
    savingsNote:
      "*ยังไม่รวมมูลค่ามหาศาลของการเป็นเจ้าของฐานข้อมูลลูกค้า 100% (เบอร์โทรและช่องทางติดต่อบันทึกเป็นฐานข้อมูลส่วนตัวของคุณ)",
    ctaBtn: "เริ่มปกป้องกำไรของคุณ",
  },
  vi: {
    badge: "Công Cụ Tăng Trưởng Miễn Phí Tại SEA",
    h1: "Bộ Công Cụ Miễn Phí Giúp Tăng Tốc Kinh Doanh.",
    subtitle:
      "Tập hợp các bảng tính lợi nhuận và trình tạo liên kết chat đa kênh giúp tối ưu hóa bán hàng trực tiếp tại Đông Nam Á.",

    tool1Badge: "Công cụ #1 • Đa Kênh SEA",
    tool1Title: "Trình Tạo Liên Kết Đặt Hàng Qua Chat",
    tool1Desc:
      "Tạo nhanh liên kết chat kèm tin nhắn soạn sẵn (WhatsApp, Zalo, LINE) để gắn vào bio mạng xã hội của bạn.",
    channelLabel: "Chọn Kênh Chat",
    phoneLabel: "Số Điện Thoại Kèm Mã Quốc Gia (ví dụ: 84912345678)",
    phonePlaceholder: "849xxxxxxxx / 628xxxxxxxxxx",
    messageLabel: "Nội Dung Tin Nhắn Soạn Sẵn",
    messageDefault: "Xin chào! Tôi muốn tìm hiểu thông tin về sản phẩm...",
    generateBtn: "Tạo Liên Kết Chat",
    linkReadyLabel: "Liên Kết Của Bạn Đã Sẵn Sàng:",

    tool2Badge: "Công cụ #2 • Tính Toán Tiết Kiệm",
    tool2Title: "So Sánh Phí Sàn Thương Mại vs Storefront Độc Lập",
    tool2Desc:
      "Tính toán số tiền bạn giữ lại được mỗi tháng khi bán hàng qua etalase.online thay vì bị trừ 10–12% phí sàn thương mại điện tử.",
    gmvLabel: "Ước Tính Doanh Số Hàng Tháng (GMV)",
    currencyPrefix: "",
    currencySuffix: " ₫",
    defaultGmv: 25000000,
    marketplaceFeeLabel: "Phí Hoa Hồng Sàn (Ước tính 10%)",
    etalaseFeeLabel: "Phí Xử Lý etalase.online (Ước tính 2%)",
    estimatedSavingsLabel: "Lợi Nhuận Ròng Ước Tính Bạn Giữ Lại",
    savingsNote:
      "*Chưa bao gồm giá trị vô giá của việc sở hữu 100% dữ liệu khách hàng (số điện thoại và thông tin liên hệ thuộc về bạn).",
    ctaBtn: "Bảo Vệ Lợi Nhuận Ngay",
  },
};

export function ToolsClient({ locale }: { locale: SupportedLocale }) {
  const t = TOOLS_TRANSLATIONS[locale] || TOOLS_TRANSLATIONS.id;

  const getLocalizedHref = (basePath: string) => {
    if (locale === "id") return basePath;
    return `/${locale}${basePath}`;
  };

  // Tool 1: Chat Link Generator
  const [channel, setChannel] = useState<"whatsapp" | "zalo" | "line">(
    locale === "th" ? "line" : locale === "vi" ? "zalo" : "whatsapp"
  );
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(t.messageDefault);
  const [generatedLink, setGeneratedLink] = useState("");

  const handleGenerateChatLink = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    let url = "";

    if (channel === "whatsapp") {
      url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    } else if (channel === "zalo") {
      url = `https://zalo.me/${cleanPhone}`;
    } else {
      url = `https://line.me/ti/p/~${cleanPhone || phone}`;
    }

    setGeneratedLink(url);
  };

  // Tool 2: Fee Savings Calculator
  const [monthlyGmv, setMonthlyGmv] = useState(t.defaultGmv);
  const marketplaceFee = monthlyGmv * 0.1; // 10%
  const etalaseFee = monthlyGmv * 0.02; // 2%
  const estimatedSavings = marketplaceFee - etalaseFee;

  const formatMoney = (val: number) => {
    return `${t.currencyPrefix}${Math.round(val).toLocaleString()}${t.currencySuffix}`;
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] flex flex-col">
      <GlobalHeader />

      <main className="py-16 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <ScrollReveal direction="up" delay={50}>
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#FDF0EC] border border-[#FADCD3] text-[#D94E28] px-3.5 py-1.5 rounded-full text-xs font-semibold">
                <Wrench className="w-3.5 h-3.5 text-[#D94E28]" />
                <span>{t.badge}</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917]">
                {t.h1}
              </h1>
              <p className="text-[#57534E] max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                {t.subtitle}
              </p>
            </div>
          </ScrollReveal>

          {/* Tool 1: Multi-Channel Chat Link Generator */}
          <ScrollReveal direction="up" delay={100}>
            <div className="bg-white border border-[#E7E5E4] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xs">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FDF0EC] text-[#D94E28] border border-[#FADCD3]">
                  {t.tool1Badge}
                </span>
                <h2 className="text-2xl font-bold text-[#1C1917] mt-3">
                  {t.tool1Title}
                </h2>
                <p className="text-[#57534E] text-sm mt-1">
                  {t.tool1Desc}
                </p>
              </div>

              <form onSubmit={handleGenerateChatLink} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                      {t.channelLabel}
                    </label>
                    <select
                      value={channel}
                      onChange={(e) => setChannel(e.target.value as any)}
                      className="w-full bg-[#FAF8F5] border border-[#E7E5E4] rounded-xl px-4 py-2.5 text-[#1C1917] text-sm focus:outline-none focus:ring-2 focus:ring-[#D94E28]/20"
                    >
                      <option value="whatsapp">WhatsApp (ID, MY, SG)</option>
                      <option value="line">LINE (Thailand)</option>
                      <option value="zalo">Zalo (Vietnam)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                      {t.phoneLabel}
                    </label>
                    <input
                      type="text"
                      placeholder={t.phonePlaceholder}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#E7E5E4] rounded-xl px-4 py-2.5 text-[#1C1917] text-sm focus:outline-none focus:ring-2 focus:ring-[#D94E28]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                    {t.messageLabel}
                  </label>
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E7E5E4] rounded-xl px-4 py-2.5 text-[#1C1917] text-sm focus:outline-none focus:ring-2 focus:ring-[#D94E28]/20"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#D94E28] hover:bg-[#B83E1D] text-white px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shadow-xs"
                >
                  {t.generateBtn}
                </button>
              </form>

              {generatedLink && (
                <div className="p-4 bg-[#FAF8F5] border border-[#E7E5E4] rounded-2xl space-y-2">
                  <div className="text-xs font-bold text-[#1C1917]">
                    {t.linkReadyLabel}
                  </div>
                  <div className="p-3 bg-white border border-[#E7E5E4] rounded-xl text-xs font-mono text-[#D94E28] break-all select-all">
                    {generatedLink}
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* Tool 2: Fee Savings Calculator */}
          <ScrollReveal direction="up" delay={150}>
            <div className="bg-white border border-[#E7E5E4] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xs">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {t.tool2Badge}
                </span>
                <h2 className="text-2xl font-bold text-[#1C1917] mt-3">
                  {t.tool2Title}
                </h2>
                <p className="text-[#57534E] text-sm mt-1">
                  {t.tool2Desc}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-[#1C1917]">
                      {t.gmvLabel}
                    </label>
                    <span className="text-sm font-bold text-[#D94E28]">
                      {formatMoney(monthlyGmv)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={t.defaultGmv * 0.1}
                    max={t.defaultGmv * 10}
                    step={t.defaultGmv * 0.05}
                    value={monthlyGmv}
                    onChange={(e) => setMonthlyGmv(Number(e.target.value))}
                    className="w-full accent-[#D94E28]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-red-50 border border-red-200 space-y-1">
                    <div className="text-xs text-red-700 font-medium">
                      {t.marketplaceFeeLabel}
                    </div>
                    <div className="text-xl font-black text-red-900">
                      {formatMoney(marketplaceFee)}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                    <div className="text-xs text-stone-600 font-medium">
                      {t.etalaseFeeLabel}
                    </div>
                    <div className="text-xl font-black text-stone-900">
                      {formatMoney(etalaseFee)}
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#FDF0EC] border-2 border-[#D94E28]/40 space-y-2">
                  <div className="text-xs font-bold text-[#D94E28] uppercase tracking-wider">
                    {t.estimatedSavingsLabel}
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-[#1C1917]">
                    {formatMoney(estimatedSavings)}
                  </div>
                  <p className="text-xs text-[#57534E]">
                    {t.savingsNote}
                  </p>
                  <div className="pt-2">
                    <Link
                      href={getLocalizedHref("/register")}
                      className="bg-[#D94E28] hover:bg-[#B83E1D] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shadow-xs inline-flex items-center gap-2"
                    >
                      <span>{t.ctaBtn}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>

      <GlobalFooter />
    </div>
  );
}
