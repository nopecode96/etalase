"use client";

import React, { Suspense, useState, useEffect, useCallback, useRef, useTransition } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { CheckCircle2, Lock, Loader2, ShieldCheck, Sparkles, XCircle } from "lucide-react";
import { EtalaseLogo } from "@/components/brand/EtalaseLogo";
import { SupportedLocale } from "@/lib/config/constants";
import { trackGtmRegisterView, trackGtmSignUpStart } from "@/lib/analytics/gtm";
import { actionCheckSlug } from "@/app/onboarding/actions";
import { validateSubdomainFormat } from "@/lib/core/formatters";

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

export interface RegisterTranslation {
  title: string;
  subtitle: string;
  slugLabel: string;
  slugPlaceholder: string;
  slugHint: string;
  ctaButton: string;
  connecting: string;
  googleReassurance: string;
  consentPrefix: string;
  termsLabel: string;
  consentAnd: string;
  privacyLabel: string;
  trustGuarantee: string;
  hasAccount: string;
  loginLink: string;
  loadingCard: string;
}

export const REGISTER_TRANSLATIONS: Record<SupportedLocale, RegisterTranslation> = {
  id: {
    title: "Mulai Gratis dengan Google",
    subtitle: "Klaim subdomain etalasemu dalam 30 detik.",
    slugLabel: "Pilih alamat subdomain etalasemu:",
    slugPlaceholder: "nama-tokomu",
    slugHint: "Huruf kecil, angka, satu tanda hubung, 3–30 karakter.",
    ctaButton: "Lanjutkan dengan Google",
    connecting: "Menghubungkan...",
    googleReassurance: "Kami hanya membaca nama dan email Anda.",
    consentPrefix: "Dengan mendaftar, Anda menyetujui",
    termsLabel: "Syarat & Ketentuan",
    consentAnd: "dan",
    privacyLabel: "Kebijakan Privasi",
    trustGuarantee: "0% Komisi order chat • Tanpa kartu kredit • Siap 30 detik",
    hasAccount: "Sudah punya akun?",
    loginLink: "Masuk",
    loadingCard: "Memuat formulir pendaftaran...",
  },
  en: {
    title: "Start Free with Google",
    subtitle: "Claim your custom etalase subdomain in 30 seconds.",
    slugLabel: "Choose your storefront subdomain:",
    slugPlaceholder: "your-store-name",
    slugHint: "Lowercase letters, numbers, single hyphen, 3–30 characters.",
    ctaButton: "Continue with Google",
    connecting: "Connecting...",
    googleReassurance: "We only read your name and email address.",
    consentPrefix: "By signing up, you agree to our",
    termsLabel: "Terms & Conditions",
    consentAnd: "and",
    privacyLabel: "Privacy Policy",
    trustGuarantee: "0% chat order commission • No credit card required • Ready in 30s",
    hasAccount: "Already have an account?",
    loginLink: "Sign In",
    loadingCard: "Loading registration form...",
  },
  ms: {
    title: "Mula Percuma dengan Google",
    subtitle: "Tuntut subdomain etalase anda dalam masa 30 saat.",
    slugLabel: "Pilih alamat subdomain kedai anda:",
    slugPlaceholder: "nama-kedai-anda",
    slugHint: "Huruf kecil, nombor, satu tanda sempang, 3–30 aksara.",
    ctaButton: "Teruskan dengan Google",
    connecting: "Menyambung...",
    googleReassurance: "Kami hanya membaca nama dan e-mel anda.",
    consentPrefix: "Dengan mendaftar, anda bersetuju dengan",
    termsLabel: "Terma & Syarat",
    consentAnd: "dan",
    privacyLabel: "Dasar Privasi",
    trustGuarantee: "0% Komisen pesanan chat • Tanpa kad kredit • Siap 30 saat",
    hasAccount: "Sudah mempunyai akaun?",
    loginLink: "Log Masuk",
    loadingCard: "Memuatkan borang pendaftaran...",
  },
  th: {
    title: "เริ่มต้นใช้งานฟรีด้วย Google",
    subtitle: "จองซับโดเมนร้านค้าของคุณได้ภายใน 30 วินาที",
    slugLabel: "เลือกซับโดเมนร้านค้าของคุณ:",
    slugPlaceholder: "your-shop",
    slugHint: "ตัวพิมพ์เล็ก ตัวเลข ขีดกลางเดี่ยว ความยาว 3–30 ตัวอักษร",
    ctaButton: "ดำเนินการต่อด้วย Google",
    connecting: "กำลังเชื่อมต่อ...",
    googleReassurance: "เราจะอ่านเฉพาะชื่อและอีเมลของคุณเท่านั้น",
    consentPrefix: "การสมัครใช้งานถือว่าคุณยอมรับ",
    termsLabel: "ข้อกำหนดและเงื่อนไข",
    consentAnd: "และ",
    privacyLabel: "นโยบายความเป็นส่วนตัว",
    trustGuarantee: "คอมมิชชันแชต 0% • ไม่ต้องใช้บัตรเครดิต • พร้อมใช้ใน 30 วิ",
    hasAccount: "มีบัญชีอยู่แล้ว?",
    loginLink: "เข้าสู่ระบบ",
    loadingCard: "กำลังโหลดแบบฟอร์มลงทะเบียน...",
  },
  vi: {
    title: "Bắt đầu miễn phí với Google",
    subtitle: "Sở hữu tên miền phụ cửa hàng của bạn trong 30 giây.",
    slugLabel: "Chọn tên miền phụ cửa hàng:",
    slugPlaceholder: "ten-shop-cua-ban",
    slugHint: "Chữ thường, số, một dấu gạch nối, dài 3–30 ký tự.",
    ctaButton: "Tiếp tục với Google",
    connecting: "Đang kết nối...",
    googleReassurance: "Chúng tôi chỉ đọc tên và email của bạn.",
    consentPrefix: "Khi đăng ký, bạn đồng ý với",
    termsLabel: "Điều khoản & Điều kiện",
    consentAnd: "và",
    privacyLabel: "Chính sách bảo mật",
    trustGuarantee: "0% Phí hoa hồng đơn chat • Không cần thẻ tín dụng • Sẵn sàng trong 30s",
    hasAccount: "Đã có tài khoản?",
    loginLink: "Đăng nhập",
    loadingCard: "Đang tải biểu mẫu đăng ký...",
  },
};

interface RegisterClientProps {
  locale: SupportedLocale;
  initialSlug?: string;
  initialPlan?: string;
}

type SlugStatus = "idle" | "checking" | "available" | "taken" | "invalid";

function RegisterCard({ locale, initialSlug = "", initialPlan = "" }: RegisterClientProps) {
  const searchParams = useSearchParams();
  const slugParam = searchParams.get("slug") || initialSlug;
  const planParam = searchParams.get("plan") || searchParams.get("tier") || initialPlan;
  const cycleParam = searchParams.get("cycle");

  const [slug, setSlug] = useState(slugParam ? slugParam.trim().toLowerCase() : "");
  const [plan, setPlan] = useState(planParam);
  const [loading, setLoading] = useState(false);
  const [slugStatus, setSlugStatus] = useState<SlugStatus>("idle");
  const [slugMessage, setSlugMessage] = useState<string>("");
  const [suggestion, setSuggestion] = useState<string | undefined>(undefined);
  const [, startTransition] = useTransition();
  const latestQueryRef = useRef("");

  const t = REGISTER_TRANSLATIONS[locale] || REGISTER_TRANSLATIONS.id;

  useEffect(() => {
    trackGtmRegisterView({
      slug: slugParam || undefined,
      plan: planParam || "free",
      locale,
    });
  }, [locale, planParam, slugParam]);

  const checkSlugRealtime = useCallback((rawInput: string) => {
    const trimmed = rawInput.trim().toLowerCase();
    if (!trimmed) {
      latestQueryRef.current = "";
      setSlugStatus("idle");
      setSlugMessage("");
      setSuggestion(undefined);
      return;
    }

    const formatCheck = validateSubdomainFormat(trimmed);
    if (!formatCheck.valid) {
      setSlugStatus("invalid");
      setSlugMessage(formatCheck.message || t.slugHint);
      setSuggestion(undefined);
      return;
    }

    const clean = formatCheck.slug;
    latestQueryRef.current = clean;
    setSlugStatus("checking");
    setSlugMessage("");
    setSuggestion(undefined);

    startTransition(async () => {
      try {
        const res = await actionCheckSlug(clean);
        if (latestQueryRef.current !== clean) return;
        if (res.success && res.data) {
          setSuggestion(res.data.suggestion);
          if (res.data.available) {
            setSlugStatus("available");
            setSlugMessage(`✓ ${res.data.slug}.etalase.online tersedia`);
          } else if (res.data.reason === "format" || res.data.reason === "length") {
            setSlugStatus("invalid");
            setSlugMessage(res.data.message || t.slugHint);
          } else {
            setSlugStatus("taken");
            setSlugMessage(`✗ ${res.data.message || "Subdomain sudah dipakai"}`);
          }
        }
      } catch {
        if (latestQueryRef.current === clean) {
          setSlugStatus("idle");
        }
      }
    });
  }, [t.slugHint]);

  useEffect(() => {
    if (slugParam) {
      const clean = slugParam.trim().toLowerCase();
      setSlug(clean);
      try {
        sessionStorage.setItem("claimed_slug", clean);
        document.cookie = `claimed_slug=${encodeURIComponent(clean)}; path=/; max-age=3600; SameSite=Lax`;
      } catch {
        // Safe fallback if storage blocked
      }
    }
  }, [slugParam]);

  useEffect(() => {
    const timer = setTimeout(() => checkSlugRealtime(slug), 280);
    return () => clearTimeout(timer);
  }, [slug, checkSlugRealtime]);

  useEffect(() => {
    if (planParam) {
      const cleanPlan = planParam.trim().toLowerCase();
      setPlan(cleanPlan);
      try {
        sessionStorage.setItem("selected_plan", cleanPlan);
        document.cookie = `selected_plan=${encodeURIComponent(cleanPlan)}; path=/; max-age=3600; SameSite=Lax`;
        if (cycleParam) {
          sessionStorage.setItem("selected_cycle", cycleParam.trim().toLowerCase());
        }
      } catch {
        // Safe fallback
      }
    }
  }, [planParam, cycleParam]);

  const handleApplySuggestion = () => {
    if (!suggestion) return;
    setSlug(suggestion);
    checkSlugRealtime(suggestion);
  };

  const handleGoogleConnect = () => {
    const trimmedSlug = slug.trim().toLowerCase();
    if (trimmedSlug) {
      const formatCheck = validateSubdomainFormat(trimmedSlug);
      if (!formatCheck.valid) {
        setSlugStatus("invalid");
        setSlugMessage(formatCheck.message || t.slugHint);
        return;
      }
      if (slugStatus === "taken") {
        return;
      }
    }

    setLoading(true);
    const targetSlug = trimmedSlug;
    const targetPlan = plan ? plan.trim().toLowerCase() : "";
    const targetCycle = cycleParam ? cycleParam.trim().toLowerCase() : "";

    trackGtmSignUpStart({
      method: "google",
      claimedSlug: targetSlug || undefined,
      selectedPlan: targetPlan || undefined,
    });

    if (targetSlug) {
      try {
        sessionStorage.setItem("claimed_slug", targetSlug);
        document.cookie = `claimed_slug=${encodeURIComponent(targetSlug)}; path=/; max-age=3600; SameSite=Lax`;
      } catch {
        // Storage fallback
      }
    }

    if (targetPlan) {
      try {
        sessionStorage.setItem("selected_plan", targetPlan);
        document.cookie = `selected_plan=${encodeURIComponent(targetPlan)}; path=/; max-age=3600; SameSite=Lax`;
        if (targetCycle) {
          sessionStorage.setItem("selected_cycle", targetCycle);
        }
      } catch {
        // Storage fallback
      }
    }

    const queryParams = new URLSearchParams();
    if (targetSlug) queryParams.set("slug", targetSlug);
    if (targetPlan) queryParams.set("plan", targetPlan);
    if (targetCycle) queryParams.set("cycle", targetCycle);

    const queryString = queryParams.toString();
    const callbackUrl = queryString ? `/onboarding?${queryString}` : "/onboarding";

    const width = 500;
    const height = 620;
    const left = Math.max(0, window.screenX + (window.outerWidth - width) / 2);
    const top = Math.max(0, window.screenY + (window.outerHeight - height) / 2);

    const popupUrl = `/auth/popup-start?callbackUrl=${encodeURIComponent(callbackUrl)}`;
    const popup = window.open(
      popupUrl,
      "EtalaseGoogleAuth",
      `width=${width},height=${height},left=${left},top=${top},status=no,menubar=no,toolbar=no,scrollbars=yes,resizable=yes`
    );

    if (!popup) {
      window.location.href = popupUrl;
      return;
    }

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type === "ETALASE_AUTH_SUCCESS") {
        cleanup();
        window.location.href = event.data.url || callbackUrl;
      }
    };
    window.addEventListener("message", onMessage);

    const timer = setInterval(async () => {
      if (popup.closed) {
        cleanup();
        try {
          const res = await fetch("/api/auth/session");
          const session = await res.json();
          if (session?.user) {
            window.location.href = callbackUrl;
            return;
          }
        } catch {}
        setLoading(false);
      }
    }, 600);

    const cleanup = () => {
      clearInterval(timer);
      window.removeEventListener("message", onMessage);
    };
  };

  const loginHref = locale === "id" || locale === "en" ? "/login" : `/${locale}/login`;
  const hasBlockingSlugError = slug.trim().length > 0 && (slugStatus === "taken" || slugStatus === "invalid");

  return (
    <div className="w-full max-w-md bg-white rounded-3xl border border-[#E7E5E4] shadow-sm p-7 sm:p-9 text-center space-y-5">
      {/* Logo etalase.online */}
      <div className="flex justify-center">
        <Link href={locale === "id" ? "/" : `/${locale}`}>
          <EtalaseLogo size="lg" />
        </Link>
      </div>

      {/* Judul & Subjudul */}
      <div className="space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1917]">
          {t.title}
        </h1>
        <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Input & Cek Subdomain Real-Time Sebelum Lanjut Google */}
      <div className="text-left space-y-1.5">
        <label
          htmlFor="register-slug-input"
          className="block text-[11px] font-bold uppercase tracking-wider text-[#57534E]"
        >
          {t.slugLabel}
        </label>
        <div
          className={`flex items-center rounded-xl border px-3 py-2.5 bg-[#FAF8F5] transition-all ${
            slugStatus === "available"
              ? "border-emerald-400 bg-emerald-50/40"
              : slugStatus === "taken" || slugStatus === "invalid"
              ? "border-red-400 bg-red-50/40"
              : "border-[#E7E5E4] focus-within:border-[#D94E28] focus-within:bg-white"
          }`}
        >
          <input
            id="register-slug-input"
            type="text"
            maxLength={30}
            value={slug}
            onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
            placeholder={t.slugPlaceholder}
            className="w-full min-w-0 bg-transparent text-sm font-semibold text-[#1C1917] focus:outline-none placeholder:text-[#57534E]/45"
          />
          <span className="text-xs font-semibold text-[#57534E] pl-1 whitespace-nowrap select-none">
            .etalase.online
          </span>
        </div>

        {/* Real-time status feedback */}
        {slugStatus === "checking" && (
          <div className="flex items-center gap-1.5 text-[11px] text-[#57534E]">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-[#D94E28]" />
            <span>Memeriksa ketersediaan...</span>
          </div>
        )}
        {slugStatus === "available" && (
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>{slugMessage}</span>
          </div>
        )}
        {(slugStatus === "taken" || slugStatus === "invalid") && (
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-red-600">
            <span className="inline-flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{slugMessage}</span>
            </span>
            {suggestion && (
              <button
                type="button"
                onClick={handleApplySuggestion}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 hover:bg-amber-100 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3 h-3" />
                <span>coba {suggestion}</span>
              </button>
            )}
          </div>
        )}
        {slugStatus === "idle" && (
          <p className="text-[11px] text-[#57534E]/80">{t.slugHint}</p>
        )}
      </div>

      {/* Badge Konfirmasi Plan (?plan=pro / ?plan=dfy) */}
      {plan ? (
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-amber-900 px-3.5 py-2 rounded-2xl text-xs font-semibold w-full justify-center">
          <Sparkles className="w-4 h-4 text-[#D94E28] shrink-0" />
          <span>
            Paket Dipilih:{" "}
            <strong>
              {plan.toUpperCase() === "DFY" ? "Terima Beres (DFY)" : "PRO Plan (Rp 49.000/bln)"}
            </strong>
          </span>
        </div>
      ) : null}

      {/* 1 Tombol Utama: Lanjutkan dengan Google */}
      <div className="pt-1 space-y-3">
        <button
          type="button"
          onClick={handleGoogleConnect}
          disabled={loading || hasBlockingSlugError}
          className="w-full py-3.5 px-4 rounded-xl border border-[#E7E5E4] bg-white hover:bg-[#FAF8F5] font-semibold text-[#1C1917] shadow-xs flex items-center justify-center gap-3 transition-all hover:border-[#D94E28]/40 hover:shadow-sm cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed"
        >
          <GoogleIcon />
          <span className="text-sm">
            {loading ? t.connecting : t.ctaButton}
          </span>
        </button>

        {/* Kalimat penenang izin Google */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#57534E] font-medium">
          <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>{t.googleReassurance}</span>
        </div>

        {/* Teks persetujuan Syarat & Ketentuan + Kebijakan Privasi */}
        <p className="text-[11px] text-[#57534E]/90 leading-relaxed px-2">
          {t.consentPrefix}{" "}
          <Link href="/syarat" className="text-[#1C1917] font-semibold underline hover:text-[#D94E28]">
            {t.termsLabel}
          </Link>{" "}
          {t.consentAnd}{" "}
          <Link href="/privasi" className="text-[#1C1917] font-semibold underline hover:text-[#D94E28]">
            {t.privacyLabel}
          </Link>
          .
        </p>

        {/* Micro-trust Guarantee */}
        <div className="flex items-center justify-center gap-2 text-[11px] text-[#57534E] font-medium pt-0.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>{t.trustGuarantee}</span>
        </div>
      </div>

      {/* Tautan Bawah: Sudah punya akun? Masuk */}
      <div className="pt-4 border-t border-[#E7E5E4] flex items-center justify-center gap-2 text-xs text-[#57534E]">
        <span>{t.hasAccount}</span>
        <Link
          href={loginHref}
          className="font-bold text-[#D94E28] hover:text-[#B83E1D] hover:underline"
        >
          {t.loginLink}
        </Link>
      </div>
    </div>
  );
}

export function RegisterClient({ locale, initialSlug }: RegisterClientProps) {
  const t = REGISTER_TRANSLATIONS[locale] || REGISTER_TRANSLATIONS.id;

  return (
    <main className="min-h-screen bg-[#FAF8F5] flex flex-col justify-center items-center px-4 py-12 selection:bg-[#D94E28] selection:text-white">
      <Suspense
        fallback={
          <div className="w-full max-w-md bg-white rounded-3xl border border-[#E7E5E4] p-10 text-center animate-pulse text-[#57534E] text-xs">
            {t.loadingCard}
          </div>
        }
      >
        <RegisterCard locale={locale} initialSlug={initialSlug} />
      </Suspense>
    </main>
  );
}
