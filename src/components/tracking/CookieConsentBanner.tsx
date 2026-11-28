"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cookie, ShieldCheck, X } from "lucide-react";
import { SupportedLocale } from "@/lib/config/constants";
import { trackGtmCookieConsent } from "@/lib/analytics/gtm";

const STORAGE_KEY = "etalase_cookie_consent";

interface BannerCopy {
  title: string;
  body: string;
  privacyLink: string;
  acceptAll: string;
  essentialOnly: string;
}

const BANNER_COPY: Record<SupportedLocale, BannerCopy> = {
  id: {
    title: "Preferensi Cookie & Analitik",
    body: "Kami menggunakan cookie esensial serta cookie analitik/iklan (GA4, Meta Pixel, TikTok Pixel melalui Google Tag Manager) untuk mengukur performa toko dan pendaftaran.",
    privacyLink: "Kebijakan Privasi",
    acceptAll: "Terima Semua",
    essentialOnly: "Esensial Saja",
  },
  en: {
    title: "Cookie & Analytics Preferences",
    body: "We use essential cookies along with analytics & marketing tags (GA4, Meta Pixel, TikTok Pixel via Google Tag Manager) to measure storefront and signup performance.",
    privacyLink: "Privacy Policy",
    acceptAll: "Accept All",
    essentialOnly: "Essential Only",
  },
  ms: {
    title: "Keutamaan Kuki & Analitik",
    body: "Kami menggunakan kuki penting serta tag analitik/iklan (GA4, Meta Pixel, TikTok Pixel melalui Google Tag Manager) untuk mengukur prestasi kedai dan pendaftaran.",
    privacyLink: "Dasar Privasi",
    acceptAll: "Terima Semua",
    essentialOnly: "Penting Sahaja",
  },
  th: {
    title: "การตั้งค่าคุกกี้และการวิเคราะห์",
    body: "เราใช้คุกกี้ที่จำเป็นร่วมกับแท็กวิเคราะห์และการตลาด (GA4, Meta Pixel, TikTok Pixel ผ่าน Google Tag Manager) เพื่อวัดประสิทธิภาพร้านค้าและการสมัครใช้งาน",
    privacyLink: "นโยบายความเป็นส่วนตัว",
    acceptAll: "ยอมรับทั้งหมด",
    essentialOnly: "เฉพาะที่จำเป็น",
  },
  vi: {
    title: "Tùy chọn Cookie & Phân tích",
    body: "Chúng tôi sử dụng cookie thiết yếu cùng thẻ phân tích/tiếp thị (GA4, Meta Pixel, TikTok Pixel qua Google Tag Manager) để đo lường hiệu quả cửa hàng và đăng ký.",
    privacyLink: "Chính sách bảo mật",
    acceptAll: "Chấp nhận tất cả",
    essentialOnly: "Chỉ thiết yếu",
  },
};

function detectLocale(pathname: string): SupportedLocale {
  const first = pathname.split("/").filter(Boolean)[0];
  if (first === "en" || first === "ms" || first === "th" || first === "vi") {
    return first;
  }
  return "id";
}

function updateGtagConsent(granted: boolean) {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };
  w.dataLayer = w.dataLayer || [];
  if (typeof w.gtag !== "function") {
    w.gtag = function gtag(...args: unknown[]) {
      w.dataLayer?.push(args);
    };
  }
  const state = granted ? "granted" : "denied";
  w.gtag("consent", "update", {
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
    analytics_storage: state,
  });
  trackGtmCookieConsent(granted ? "accepted" : "essential_only");
}

export function CookieConsentBanner() {
  const pathname = usePathname() || "/";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const host = window.location.hostname.toLowerCase();
    const isMainDomain =
      host === "etalase.online" ||
      host === "www.etalase.online" ||
      host === "localhost" ||
      host === "127.0.0.1";
    if (!isMainDomain) return;

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "accepted") {
        updateGtagConsent(true);
        return;
      }
      if (saved === "essential_only") {
        updateGtagConsent(false);
        return;
      }
      setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const locale = detectLocale(pathname);
  const t = BANNER_COPY[locale] || BANNER_COPY.id;

  const handleChoice = (accepted: boolean) => {
    const val = accepted ? "accepted" : "essential_only";
    try {
      localStorage.setItem(STORAGE_KEY, val);
      document.cookie = `${STORAGE_KEY}=${val}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // Ignore storage failures in restricted contexts
    }
    updateGtagConsent(accepted);
    setVisible(false);
  };

  return (
    <aside
      role="dialog"
      aria-label={t.title}
      data-testid="cookie-consent-banner"
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50 bg-white/95 backdrop-blur-md border border-[#E7E5E4] rounded-2xl shadow-xl p-4 sm:p-5 text-[#1C1917]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#FDF0EC] text-[#D94E28] flex items-center justify-center shrink-0">
            <Cookie className="w-4 h-4" />
          </div>
          <h2 className="text-xs sm:text-sm font-bold text-[#1C1917]">
            {t.title}
          </h2>
        </div>
        <button
          type="button"
          onClick={() => handleChoice(false)}
          aria-label={t.essentialOnly}
          className="text-[#57534E] hover:text-[#1C1917] p-1 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="mt-2.5 text-[11px] sm:text-xs text-[#57534E] leading-relaxed">
        {t.body}{" "}
        <Link
          href="/privasi"
          className="text-[#D94E28] font-semibold underline hover:text-[#B83E1D]"
        >
          {t.privacyLink}
        </Link>
        .
      </p>

      <div className="mt-3.5 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => handleChoice(true)}
          className="flex-1 min-w-[130px] bg-[#D94E28] hover:bg-[#B83E1D] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-xs inline-flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{t.acceptAll}</span>
        </button>
        <button
          type="button"
          onClick={() => handleChoice(false)}
          className="flex-1 min-w-[120px] bg-[#FAF8F5] hover:bg-[#F3EFEA] border border-[#E7E5E4] text-[#1C1917] text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
        >
          {t.essentialOnly}
        </button>
      </div>
    </aside>
  );
}
