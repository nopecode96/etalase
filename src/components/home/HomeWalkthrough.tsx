"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Play,
  Pause,
  Globe,
  CheckCircle2,
  Package,
  Rocket,
  ArrowRight,
  MessageCircle,
  QrCode,
  Sparkles,
} from "lucide-react";
import { SupportedLocale } from "@/lib/config/constants";

interface WalkthroughStep {
  id: string;
  durationSec: number;
  timeRange: string;
  title: string;
  desc: string;
  previewBadge: string;
  previewMain: string;
  previewSub: string;
}

interface WalkthroughCopy {
  badge: string;
  title: string;
  subtitle: string;
  totalDuration: string;
  cta: string;
  playingLabel: string;
  pausedLabel: string;
  steps: WalkthroughStep[];
}

const COPY: Record<SupportedLocale, WalkthroughCopy> = {
  id: {
    badge: "Preview Alur 45 Detik",
    title: "Dari Daftar Sampai Toko Live dalam ±45 Detik",
    subtitle: "Tanpa install aplikasi atau coding—cukup klaim nama, login Google, tambah produk pertama, dan sebar link ke bio.",
    totalDuration: "00:45",
    cta: "Coba Sekarang — Gratis",
    playingLabel: "Jeda Demo",
    pausedLabel: "Putar Demo",
    steps: [
      {
        id: "claim",
        durationSec: 10,
        timeRange: "00:00 – 00:10",
        title: "1. Klaim Subdomain Unik",
        desc: "Ketik nama bisnismu dan cek ketersediaannya secara real-time (3–30 karakter).",
        previewBadge: "Tersedia Instan",
        previewMain: "tokokamu.etalase.online ✓",
        previewSub: "Dicek langsung sebelum lanjut ke Google",
      },
      {
        id: "google",
        durationSec: 10,
        timeRange: "00:10 – 00:20",
        title: "2. Masuk 1-Klik via Google",
        desc: "Tanpa buat password baru—kami hanya membaca nama dan email Anda.",
        previewBadge: "Google OAuth Aman",
        previewMain: "Akun Terverifikasi & Nomor WA Aktif",
        previewSub: "Otomatis siap menerima order chat",
      },
      {
        id: "product",
        durationSec: 15,
        timeRange: "00:20 – 00:35",
        title: "3. Tambah Produk Pertama",
        desc: "Upload foto produk, tentukan harga, dan pilih Checkout WhatsApp (0% komisi) atau QRIS Instan.",
        previewBadge: "Mode Closing Fleksibel",
        previewMain: "WhatsApp 0% Komisi • QRIS Otomatis",
        previewSub: "Auto-kirim struk & file digital ke pembeli",
      },
      {
        id: "live",
        durationSec: 10,
        timeRange: "00:35 – 00:45",
        title: "4. Toko Live & Siap Closing",
        desc: "Salin link etalase ke bio TikTok, Instagram, atau Threads—pembeli langsung check-out dari HP.",
        previewBadge: "Status: LIVE",
        previewMain: "https://tokokamu.etalase.online 🚀",
        previewSub: "Siap terima pesanan pertama hari ini",
      },
    ],
  },
  en: {
    badge: "45-Second Interactive Walkthrough",
    title: "From Sign-Up to Live Storefront in ~45 Seconds",
    subtitle: "No coding or app downloads—claim your subdomain, sign in with Google, add your first product, and share your link.",
    totalDuration: "00:45",
    cta: "Try It Free Now",
    playingLabel: "Pause Demo",
    pausedLabel: "Play Demo",
    steps: [
      {
        id: "claim",
        durationSec: 10,
        timeRange: "00:00 – 00:10",
        title: "1. Claim Your Subdomain",
        desc: "Type your brand name and verify availability in real time (3–30 chars).",
        previewBadge: "Instantly Available",
        previewMain: "yourstore.etalase.online ✓",
        previewSub: "Checked before Google sign-in",
      },
      {
        id: "google",
        durationSec: 10,
        timeRange: "00:10 – 00:20",
        title: "2. 1-Click Google Login",
        desc: "No new password needed—we only read your name and email address.",
        previewBadge: "Verified Google Auth",
        previewMain: "Account Ready & WhatsApp Linked",
        previewSub: "Configured to route direct buyer chats",
      },
      {
        id: "product",
        durationSec: 15,
        timeRange: "00:20 – 00:35",
        title: "3. Add Your First Product",
        desc: "Upload a photo, set pricing, and choose 0% WhatsApp Order or Instant QRIS.",
        previewBadge: "Flexible Checkout",
        previewMain: "WhatsApp 0% Fee • Instant QRIS",
        previewSub: "Automatic receipt & digital delivery",
      },
      {
        id: "live",
        durationSec: 10,
        timeRange: "00:35 – 00:45",
        title: "4. Store Live & Ready",
        desc: "Paste your storefront URL in TikTok, Instagram, or Threads bio and start selling.",
        previewBadge: "Status: LIVE",
        previewMain: "https://yourstore.etalase.online 🚀",
        previewSub: "Ready for mobile checkout",
      },
    ],
  },
  ms: {
    badge: "Pratonton Aliran 45 Saat",
    title: "Dari Daftar Hingga Kedai Live dalam ~45 Saat",
    subtitle: "Tiada kod atau aplikasi rumit—tuntut subdomain, log masuk Google, tambah produk pertama, dan kongsi pautan bio.",
    totalDuration: "00:45",
    cta: "Cuba Percuma Sekarang",
    playingLabel: "Jeda Demo",
    pausedLabel: "Main Demo",
    steps: [
      {
        id: "claim",
        durationSec: 10,
        timeRange: "00:00 – 00:10",
        title: "1. Tuntut Subdomain Unik",
        desc: "Taip nama perniagaan dan semak ketersediaan secara masa nyata (3–30 aksara).",
        previewBadge: "Tersedia Segera",
        previewMain: "kedaianda.etalase.online ✓",
        previewSub: "Disemak sebelum log masuk Google",
      },
      {
        id: "google",
        durationSec: 10,
        timeRange: "00:10 – 00:20",
        title: "2. Log Masuk 1-Klik Google",
        desc: "Kami hanya membaca nama dan e-mel anda tanpa kata laluan baharu.",
        previewBadge: "Google Auth Selamat",
        previewMain: "Akaun Disahkan & WhatsApp Aktif",
        previewSub: "Sedia menerima pesanan terus ke chat",
      },
      {
        id: "product",
        durationSec: 15,
        timeRange: "00:20 – 00:35",
        title: "3. Tambah Produk Pertama",
        desc: "Muat naik gambar, tetapkan harga, dan pilih Pesanan WhatsApp (0% komisen) atau QRIS.",
        previewBadge: "Pembayaran Fleksibel",
        previewMain: "WhatsApp 0% Komisen • QRIS Pantas",
        previewSub: "Resit & fail digital dihantar automatik",
      },
      {
        id: "live",
        durationSec: 10,
        timeRange: "00:35 – 00:45",
        title: "4. Kedai Live & Sedia Jual",
        desc: "Tampal pautan di bio TikTok atau Instagram—pembeli terus membuat pesanan dari telefon.",
        previewBadge: "Status: LIVE",
        previewMain: "https://kedaianda.etalase.online 🚀",
        previewSub: "Sedia menerima pesanan pertama",
      },
    ],
  },
  th: {
    badge: "ตัวอย่างขั้นตอน 45 วินาที",
    title: "จากสมัครจนร้านค้าออนไลน์พร้อมขายใน ~45 วินาที",
    subtitle: "ไม่ต้องเขียนโค้ด จองซับโดเมน เข้าสู่ระบบด้วย Google เพิ่มสินค้าแรก และวางลิงก์บนไบโอได้ทันที",
    totalDuration: "00:45",
    cta: "ทดลองใช้ฟรีตอนนี้",
    playingLabel: "หยุดชั่วคราว",
    pausedLabel: "เล่นตัวอย่าง",
    steps: [
      {
        id: "claim",
        durationSec: 10,
        timeRange: "00:00 – 00:10",
        title: "1. จองซับโดเมนร้าน",
        desc: "พิมพ์ชื่อแบรนด์และเช็กสถานะว่างแบบเรียลไทม์ (3–30 ตัวอักษร)",
        previewBadge: "พร้อมใช้งานทันที",
        previewMain: "yourshop.etalase.online ✓",
        previewSub: "ตรวจสอบก่อนเข้าสู่ระบบ Google",
      },
      {
        id: "google",
        durationSec: 10,
        timeRange: "00:10 – 00:20",
        title: "2. เข้าสู่ระบบ 1 คลิกด้วย Google",
        desc: "ไม่ต้องสร้างรหัสผ่านใหม่ เราอ่านเฉพาะชื่อและอีเมลของคุณเท่านั้น",
        previewBadge: "ยืนยันตัวตนปลอดภัย",
        previewMain: "ยืนยันบัญชีและเชื่อมต่อ WhatsApp",
        previewSub: "พร้อมรับออเดอร์ทางแชตทันที",
      },
      {
        id: "product",
        durationSec: 15,
        timeRange: "00:20 – 00:35",
        title: "3. เพิ่มสินค้าชิ้นแรก",
        desc: "อัปโหลดรูปภาพ กำหนดราคา และเลือกสั่งซื้อทาง WhatsApp (0%) หรือชำระ QRIS",
        previewBadge: "ปิดการขายยืดหยุ่น",
        previewMain: "WhatsApp 0% • QRIS อัตโนมัติ",
        previewSub: "ส่งใบเสร็จและไฟล์ดิจิทัลอัตโนมัติ",
      },
      {
        id: "live",
        durationSec: 10,
        timeRange: "00:35 – 00:45",
        title: "4. หน้าร้านเปิดขายทันที",
        desc: "คัดลอกลิงก์ไปวางในไบโอ TikTok หรือ Instagram ลูกค้ากดสั่งซื้อมือถือได้เลย",
        previewBadge: "Status: LIVE",
        previewMain: "https://yourshop.etalase.online 🚀",
        previewSub: "พร้อมรับออเดอร์แรกของคุณวันนี้",
      },
    ],
  },
  vi: {
    badge: "Xem Nhanh Quy Trình 45 Giây",
    title: "Từ Đăng Ký Đến Cửa Hàng Hoạt Động Trong ~45 Giây",
    subtitle: "Không cần lập trình—chỉ cần giữ tên miền phụ, đăng nhập Google, thêm sản phẩm đầu tiên và gắn link lên bio.",
    totalDuration: "00:45",
    cta: "Dùng Thử Miễn Phí Ngay",
    playingLabel: "Tạm dừng",
    pausedLabel: "Chạy demo",
    steps: [
      {
        id: "claim",
        durationSec: 10,
        timeRange: "00:00 – 00:10",
        title: "1. Chọn Tên Miền Phụ",
        desc: "Nhập tên cửa hàng và kiểm tra trạng thái khả dụng theo thời gian thực (3–30 ký tự).",
        previewBadge: "Có Thể Dùng Ngay",
        previewMain: "tenban.etalase.online ✓",
        previewSub: "Kiểm tra ngay trước khi đăng nhập Google",
      },
      {
        id: "google",
        durationSec: 10,
        timeRange: "00:10 – 00:20",
        title: "2. Đăng Nhập 1 Chạm Google",
        desc: "Không cần tạo mật khẩu mới—chúng tôi chỉ đọc tên và email của bạn.",
        previewBadge: "Google Auth An Toàn",
        previewMain: "Xác Thực Tài Khoản & WhatsApp",
        previewSub: "Sẵn sàng điều hướng đơn chat",
      },
      {
        id: "product",
        durationSec: 15,
        timeRange: "00:20 – 00:35",
        title: "3. Thêm Sản Phẩm Đầu Tiên",
        desc: "Tải ảnh sản phẩm, đặt giá và chọn Đặt qua WhatsApp (0% hoa hồng) hoặc QR tức thì.",
        previewBadge: "Thanh Toán Linh Hoạt",
        previewMain: "WhatsApp 0% Phí • QR Tự Động",
        previewSub: "Tự động gửi biên nhận & file số",
      },
      {
        id: "live",
        durationSec: 10,
        timeRange: "00:35 – 00:45",
        title: "4. Cửa Hàng Online Ngay",
        desc: "Sao chép link lên bio TikTok hoặc Instagram—khách hàng đặt mua mượt mà trên di động.",
        previewBadge: "Status: LIVE",
        previewMain: "https://tenban.etalase.online 🚀",
        previewSub: "Sẵn sàng nhận đơn hàng đầu tiên",
      },
    ],
  },
};

export function HomeWalkthrough({ locale = "id" }: { locale?: SupportedLocale }) {
  const copy = COPY[locale] || COPY.id;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % copy.steps.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [isPlaying, copy.steps.length]);

  const currentStep = copy.steps[activeIndex];
  const registerHref = locale === "id" ? "/register" : `/${locale}/register`;

  return (
    <section
      id="walkthrough"
      className="py-14 sm:py-20 bg-[#FAF8F5] border-b border-[#E7E5E4] px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#D94E28] bg-[#FDF0EC] border border-[#FADCD3] px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{copy.badge}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight">
              {copy.title}
            </h2>
            <p className="text-sm text-[#57534E] leading-relaxed">
              {copy.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsPlaying((v) => !v)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#E7E5E4] hover:border-[#D94E28]/50 text-xs font-semibold text-[#1C1917] shadow-2xs transition cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#D94E28]" /> : <Play className="w-3.5 h-3.5 text-[#D94E28]" />}
              <span>{isPlaying ? copy.pausedLabel : copy.playingLabel}</span>
              <span className="font-mono text-[#57534E]">({copy.totalDuration})</span>
            </button>
            <Link
              href={registerHref}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#D94E28] hover:bg-[#B83E1D] text-white text-xs font-semibold shadow-xs transition"
            >
              <span>{copy.cta}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch bg-white border border-[#E7E5E4] rounded-3xl p-4 sm:p-6 shadow-sm">
          {/* Interactive Timeline Steps */}
          <div className="lg:col-span-6 space-y-2.5">
            {copy.steps.map((step, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => {
                    setActiveIndex(index);
                    setIsPlaying(false);
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#FDF0EC] border-[#FADCD3] shadow-2xs"
                      : "bg-[#FAF8F5]/70 border-transparent hover:border-[#E7E5E4] hover:bg-[#FAF8F5]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span
                      className={`text-sm font-bold ${
                        isActive ? "text-[#B83E1D]" : "text-[#1C1917]"
                      }`}
                    >
                      {step.title}
                    </span>
                    <span className="text-[11px] font-mono font-semibold text-[#57534E] bg-white px-2 py-0.5 rounded-md border border-[#E7E5E4]">
                      {step.timeRange}
                    </span>
                  </div>
                  <p className="text-xs text-[#57534E] leading-relaxed">{step.desc}</p>
                </button>
              );
            })}
          </div>

          {/* Animated UI Frame Stage */}
          <div className="lg:col-span-6 bg-[#1C1917] rounded-2xl p-5 sm:p-7 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Simulated browser / player chrome */}
            <div className="flex items-center justify-between border-b border-stone-800 pb-3.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
              </div>
              <span className="text-[11px] font-mono text-stone-400">
                Langkah {activeIndex + 1} / {copy.steps.length} &bull; {currentStep.timeRange}
              </span>
            </div>

            {/* Active visual stage card */}
            <div className="my-6 bg-stone-900/90 border border-stone-700/80 rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{currentStep.previewBadge}</span>
                </span>
                <div className="w-9 h-9 rounded-xl bg-[#D94E28]/20 text-[#FF8D6B] flex items-center justify-center">
                  {activeIndex === 0 && <Globe className="w-5 h-5" />}
                  {activeIndex === 1 && <CheckCircle2 className="w-5 h-5" />}
                  {activeIndex === 2 && <Package className="w-5 h-5" />}
                  {activeIndex === 3 && <Rocket className="w-5 h-5" />}
                </div>
              </div>

              <div className="bg-stone-950 rounded-xl p-4 border border-stone-800 font-mono text-sm sm:text-base font-bold text-white break-all">
                {currentStep.previewMain}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-stone-300">
                <span className="inline-flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp 0%</span>
                </span>
                <span className="text-stone-600">&bull;</span>
                <span className="inline-flex items-center gap-1.5">
                  <QrCode className="w-3.5 h-3.5 text-amber-300" />
                  <span>QRIS Instan</span>
                </span>
                <span className="text-stone-600 hidden sm:inline">&bull;</span>
                <span className="text-stone-400">{currentStep.previewSub}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="grid grid-cols-4 gap-2">
                {copy.steps.map((s, idx) => (
                  <button
                    key={s.id}
                    type="button"
                    aria-label={s.title}
                    onClick={() => {
                      setActiveIndex(idx);
                      setIsPlaying(false);
                    }}
                    className="h-1.5 rounded-full bg-stone-800 overflow-hidden cursor-pointer"
                  >
                    <div
                      className={`h-full transition-all duration-300 ${
                        idx <= activeIndex ? "bg-[#D94E28] w-full" : "w-0"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
