"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { ShieldCheck } from "lucide-react";
import { EtalaseLogo } from "@/components/brand/EtalaseLogo";
import { SupportedLocale } from "@/lib/config/constants";

function GoogleIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

export interface LoginTranslation {
  title: string;
  subtitle: string;
  ctaButton: string;
  connecting: string;
  securityBadge: string;
  noAccount: string;
  registerLink: string;
  loadingCard: string;
}

export const LOGIN_TRANSLATIONS: Record<SupportedLocale, LoginTranslation> = {
  en: {
    title: "Sign in to your Etalase",
    subtitle: "Manage your products, WhatsApp orders, and store analytics.",
    ctaButton: "Continue with Google",
    connecting: "Connecting...",
    securityBadge: "Official Google OAuth authentication security",
    noAccount: "Don't have an etalase yet?",
    registerLink: "Sign Up Free",
    loadingCard: "Loading sign in form...",
  },
  id: {
    title: "Masuk ke Etalase Anda",
    subtitle: "Kelola produk, pesanan WhatsApp, dan analitik tokomu.",
    ctaButton: "Masuk dengan Google",
    connecting: "Menghubungkan...",
    securityBadge: "Keamanan autentikasi OAuth Google resmi",
    noAccount: "Belum punya etalase?",
    registerLink: "Daftar Gratis",
    loadingCard: "Memuat formulir masuk...",
  },
  th: {
    title: "เข้าสู่ระบบร้านค้าของคุณ",
    subtitle: "จัดการสินค้า คำสั่งซื้อ WhatsApp/LINE และสถิติร้านค้าของคุณ",
    ctaButton: "เข้าสู่ระบบด้วย Google",
    connecting: "กำลังเชื่อมต่อ...",
    securityBadge: "ความปลอดภัยการยืนยันตัวตน Google OAuth อย่างเป็นทางการ",
    noAccount: "ยังไม่มีหน้าร้านใช่ไหม?",
    registerLink: "สมัครสมาชิกฟรี",
    loadingCard: "กำลังโหลดแบบฟอร์มเข้าสู่ระบบ...",
  },
  ms: {
    title: "Log Masuk ke Etalase Anda",
    subtitle: "Urus produk, pesanan WhatsApp, dan analitik kedai anda.",
    ctaButton: "Log Masuk dengan Google",
    connecting: "Menyambung...",
    securityBadge: "Keselamatan pengesahan Google OAuth rasmi",
    noAccount: "Belum ada etalase?",
    registerLink: "Daftar Percuma",
    loadingCard: "Memuatkan borang log masuk...",
  },
  vi: {
    title: "Đăng nhập vào Etalase của bạn",
    subtitle: "Quản lý sản phẩm, đơn hàng WhatsApp/Zalo và phân tích cửa hàng.",
    ctaButton: "Tiếp tục với Google",
    connecting: "Đang kết nối...",
    securityBadge: "Bảo mật xác thực Google OAuth chính thức",
    noAccount: "Chưa có cửa hàng?",
    registerLink: "Đăng ký miễn phí",
    loadingCard: "Đang tải biểu mẫu đăng nhập...",
  },
};

interface LoginClientProps {
  locale: SupportedLocale;
  callbackUrl?: string;
}

function LoginCard({ locale, callbackUrl: propCallbackUrl }: LoginClientProps) {
  const searchParams = useSearchParams();
  const callbackUrl = propCallbackUrl || searchParams.get("callbackUrl") || "/onboarding";
  const [loading, setLoading] = useState(false);

  // Default to English as required
  const t = LOGIN_TRANSLATIONS[locale] || LOGIN_TRANSLATIONS.en;

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signIn("google", { callbackUrl });
    } catch {
      window.location.href = callbackUrl;
    }
  };

  const registerHref =
    locale === "en"
      ? "/en/register"
      : locale === "id"
      ? "/register"
      : `/${locale}/register`;

  return (
    <div className="w-full max-w-md bg-white rounded-3xl border border-[#E7E5E4] shadow-sm p-8 sm:p-10 text-center space-y-6">
      {/* Logo etalase.online */}
      <div className="flex justify-center">
        <Link href={locale === "id" ? "/" : `/${locale}`}>
          <EtalaseLogo size="lg" />
        </Link>
      </div>

      {/* Judul & Subjudul */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1917]">
          {t.title}
        </h1>
        <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* 1 Tombol Utama: Masuk dengan Google */}
      <div className="pt-2 space-y-3">
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full py-3.5 px-4 rounded-xl border border-[#E7E5E4] bg-white hover:bg-[#FAF8F5] font-semibold text-[#1C1917] shadow-xs flex items-center justify-center gap-3 transition-all hover:border-[#D94E28]/40 hover:shadow-sm cursor-pointer disabled:opacity-60"
        >
          <GoogleIcon />
          <span className="text-sm">
            {loading ? t.connecting : t.ctaButton}
          </span>
        </button>

        <div className="flex items-center justify-center gap-2 text-[11px] text-[#57534E] font-medium pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>{t.securityBadge}</span>
        </div>
      </div>

      {/* Tautan Bawah: Belum punya etalase? Daftar Gratis */}
      <div className="pt-4 border-t border-[#E7E5E4] flex items-center justify-center gap-2 text-xs text-[#57534E]">
        <span>{t.noAccount}</span>
        <Link
          href={registerHref}
          className="font-bold text-[#D94E28] hover:text-[#B83E1D] hover:underline"
        >
          {t.registerLink}
        </Link>
      </div>
    </div>
  );
}

export function LoginClient({ locale, callbackUrl }: LoginClientProps) {
  const t = LOGIN_TRANSLATIONS[locale] || LOGIN_TRANSLATIONS.en;

  return (
    <main className="min-h-screen bg-[#FAF8F5] flex flex-col justify-center items-center px-4 py-12 selection:bg-[#D94E28] selection:text-white">
      <Suspense
        fallback={
          <div className="w-full max-w-md bg-white rounded-3xl border border-[#E7E5E4] p-10 text-center animate-pulse text-[#57534E] text-xs">
            {t.loadingCard}
          </div>
        }
      >
        <LoginCard locale={locale} callbackUrl={callbackUrl} />
      </Suspense>
    </main>
  );
}
