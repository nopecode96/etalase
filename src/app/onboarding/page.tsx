"use client";

import React, { Suspense, useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { EtalaseLogo } from "@/components/brand/EtalaseLogo";
import {
  Check,
  AlertCircle,
  Loader2,
  ArrowRight,
  Sparkles,
  Phone,
  Store,
  Compass,
} from "lucide-react";
import { actionCheckSlug, actionCreateStore } from "./actions";
import { showServiceResultToast } from "@/components/ui/GlobalToast";

const SEA_COUNTRY_CODES = [
  { code: "+62", label: "🇮🇩 ID (+62)", name: "Indonesia" },
  { code: "+60", label: "🇲🇾 MY (+60)", name: "Malaysia" },
  { code: "+65", label: "🇸🇬 SG (+65)", name: "Singapura" },
  { code: "+66", label: "🇹🇭 TH (+66)", name: "Thailand" },
  { code: "+84", label: "🇻🇳 VN (+84)", name: "Vietnam" },
  { code: "+63", label: "🇵🇭 PH (+63)", name: "Filipina" },
];

const BUSINESS_CATEGORIES = [
  { id: "Kreator Digital", label: "Kreator Digital", desc: "E-Book, Preset & Mentoring" },
  { id: "Cafe & F&B", label: "Cafe & F&B", desc: "Menu Visual & Order Kasir" },
  { id: "Sales Mobil/Properti", label: "Sales Mobil/Properti", desc: "Showroom & Simulasi DP" },
  { id: "Beauty & Affiliate", label: "Beauty & Affiliate", desc: "Keranjang Kuning & Shopee" },
  { id: "UMKM Lainnya", label: "UMKM Lainnya", desc: "Produk Fisik, Jasa & Toko" },
];

function OnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [slug, setSlug] = useState("");
  const [slugStatus, setSlugStatus] = useState<"idle" | "checking" | "available" | "unavailable">("idle");
  const [slugMessage, setSlugMessage] = useState("");

  const [countryCode, setCountryCode] = useState("+62");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [category, setCategory] = useState("Kreator Digital");
  const [selectedPlan, setSelectedPlan] = useState("");

  // Read ?slug=... and ?plan=... on mount or fallback to sessionStorage / cookies
  useEffect(() => {
    let initialPlan = searchParams.get("plan") || searchParams.get("tier") || "";
    if (!initialPlan) {
      try {
        initialPlan = sessionStorage.getItem("selected_plan") || "";
        if (!initialPlan) {
          const match = document.cookie.match(/(?:^|; )selected_plan=([^;]*)/);
          if (match) initialPlan = decodeURIComponent(match[1]);
        }
      } catch {}
    }
    if (initialPlan) {
      setSelectedPlan(initialPlan.trim().toLowerCase());
    }

    let initialSlug = searchParams.get("slug") || "";

    if (!initialSlug) {
      try {
        initialSlug = sessionStorage.getItem("claimed_slug") || "";
        if (!initialSlug) {
          const match = document.cookie.match(/(?:^|; )claimed_slug=([^;]*)/);
          if (match) initialSlug = decodeURIComponent(match[1]);
        }
      } catch {
        // Fallback
      }
    }

    if (initialSlug) {
      const clean = initialSlug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");
      setSlug(clean);
      performCheck(clean);
    }
  }, [searchParams]);

  const performCheck = async (val: string) => {
    const clean = val.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");
    if (clean.length < 3) {
      setSlugStatus("idle");
      setSlugMessage("");
      return;
    }

    setSlugStatus("checking");
    const check = await actionCheckSlug(clean);
    if (check.success && check.data.available) {
      setSlugStatus("available");
      setSlugMessage(`✓ ${check.data.slug}.etalase.online tersedia!`);
    } else {
      setSlugStatus("unavailable");
      setSlugMessage(!check.success ? check.error : "Subdomain tidak tersedia.");
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-");
    setSlug(raw);
    performCheck(raw);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanSlug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");

    if (cleanSlug.length < 3) {
      setSlugStatus("unavailable");
      setSlugMessage("Subdomain minimal terdiri dari 3 karakter.");
      return;
    }

    startTransition(async () => {
      const res = await actionCreateStore({
        slug: cleanSlug,
        name: cleanSlug.charAt(0).toUpperCase() + cleanSlug.slice(1),
        templateId: "clean-minimal",
        category,
        whatsappCountryCode: countryCode,
        whatsappNumber: whatsappNumber.trim(),
      });

      showServiceResultToast(res);

      if (res.success && res.data) {
        try {
          sessionStorage.removeItem("claimed_slug");
          sessionStorage.removeItem("selected_plan");
          document.cookie = "claimed_slug=; path=/; max-age=0;";
          document.cookie = "selected_plan=; path=/; max-age=0;";
        } catch {}

        const plan = selectedPlan || (searchParams.get("plan") || searchParams.get("tier") || "").toLowerCase();

        if (plan === "pro" || plan === "dfy") {
          router.push(`/admin/billing/upgrade?plan=${plan}`);
        } else {
          router.push("/admin");
        }
      }
    });
  };

  return (
    <div className="w-full max-w-xl bg-white rounded-3xl border border-[#E7E5E4] shadow-sm p-6 sm:p-10 space-y-8">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-2">
          <EtalaseLogo size="lg" />
        </div>

        {selectedPlan ? (
          <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-amber-900 px-3 py-1 rounded-full text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#D94E28]" />
            <span>
              Target Upgrade:{" "}
              <strong>
                {selectedPlan.toUpperCase() === "DFY" ? "Terima Beres (DFY)" : "PRO Plan (Rp 49.000/mo)"}
              </strong>
            </span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-1.5 bg-[#FDF0EC] border border-[#FADCD3] text-[#D94E28] px-3 py-1 rounded-full text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Setup Kilat 30 Detik</span>
          </div>
        )}

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1917]">
          Buka Etalase Online Anda
        </h1>
        <p className="text-xs sm:text-sm text-[#57534E] max-w-md mx-auto leading-relaxed">
          Lengkapi 3 data singkat di bawah ini. Toko Anda langsung siap menerima order dan terhubung ke WhatsApp.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. Subdomain Etalase */}
        <div className="space-y-2">
          <label className="flex items-center justify-between text-xs font-bold text-[#1C1917] uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Store className="w-3.5 h-3.5 text-[#D94E28]" />
              <span>1. Alamat Subdomain Toko</span>
            </span>
            <span className="text-[11px] font-normal text-[#57534E] lowercase">
              Gratis selamanya
            </span>
          </label>

          <div className="flex rounded-xl border border-[#E7E5E4] bg-white overflow-hidden shadow-2xs focus-within:border-[#D94E28] focus-within:ring-2 focus-within:ring-[#D94E28]/15 transition">
            <input
              type="text"
              required
              value={slug}
              onChange={handleSlugChange}
              placeholder="namatoko"
              className="flex-1 px-3.5 py-3 text-sm sm:text-base font-semibold text-[#1C1917] focus:outline-none placeholder:text-[#57534E]/40"
            />
            <span className="bg-[#FAF8F5] text-[#57534E] text-xs sm:text-sm px-3.5 py-3 flex items-center border-l border-[#E7E5E4] font-mono select-none font-medium">
              .etalase.online
            </span>
          </div>

          {slugStatus !== "idle" && (
            <div className="pt-0.5 text-xs">
              {slugStatus === "checking" && (
                <span className="text-[#57534E] flex items-center gap-1">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#D94E28]" />
                  <span>Memeriksa ketersediaan...</span>
                </span>
              )}
              {slugStatus === "available" && (
                <span className="text-emerald-600 flex items-center gap-1 font-semibold">
                  <Check className="w-3.5 h-3.5" />
                  <span>{slugMessage}</span>
                </span>
              )}
              {slugStatus === "unavailable" && (
                <span className="text-rose-600 flex items-center gap-1 font-semibold">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{slugMessage}</span>
                </span>
              )}
            </div>
          )}
        </div>

        {/* 2. Nomor WhatsApp Aktif */}
        <div className="space-y-2">
          <label className="flex items-center justify-between text-xs font-bold text-[#1C1917] uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#D94E28]" />
              <span>2. Nomor WhatsApp Aktif</span>
            </span>
            <span className="text-[11px] font-normal text-[#57534E]">
              Untuk notifikasi pesanan
            </span>
          </label>

          <div className="flex rounded-xl border border-[#E7E5E4] bg-white overflow-hidden shadow-2xs focus-within:border-[#D94E28] focus-within:ring-2 focus-within:ring-[#D94E28]/15 transition">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="bg-[#FAF8F5] text-[#1C1917] text-xs sm:text-sm font-semibold px-3 py-3 border-r border-[#E7E5E4] focus:outline-none cursor-pointer"
            >
              {SEA_COUNTRY_CODES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>
            <input
              type="tel"
              required
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value.replace(/[^0-9]/g, ""))}
              placeholder="81234567890"
              className="flex-1 px-3.5 py-3 text-sm sm:text-base text-[#1C1917] font-semibold focus:outline-none placeholder:text-[#57534E]/40"
            />
          </div>
          <p className="text-[11px] text-[#57534E]">
            Order chat dan struk transaksi akan otomatis terkirim ke WhatsApp ini tanpa perantara.
          </p>
        </div>

        {/* 3. Kategori Bisnis (Pilihan Cepat) */}
        <div className="space-y-2.5">
          <label className="flex items-center gap-1.5 text-xs font-bold text-[#1C1917] uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-[#D94E28]" />
            <span>3. Kategori Bisnis (Pilihan Cepat)</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {BUSINESS_CATEGORIES.map((item) => {
              const isSelected = category === item.id;
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setCategory(item.id)}
                  className={`text-left p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "border-[#D94E28] bg-[#FDF0EC] text-[#1C1917] shadow-xs"
                      : "border-[#E7E5E4] bg-white hover:bg-[#FAF8F5] text-[#57534E]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1C1917]">
                      {item.label}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#D94E28]" />
                    )}
                  </div>
                  <span className="text-[11px] text-[#57534E] mt-0.5">
                    {item.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* CTA Button: Buka Etalase Saya Sekarang */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isPending || slugStatus === "unavailable"}
            className="w-full bg-[#D94E28] hover:bg-[#B83E1D] text-white font-bold text-sm py-4 px-6 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Menyiapkan Etalase Anda...</span>
              </>
            ) : (
              <>
                <span>Buka Etalase Saya Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="text-center text-[11px] text-[#57534E] pt-3 font-medium">
            Paket Gratis Selamanya &bull; 0% Komisi Order Chat &bull; Template Default Clean Minimal
          </div>
        </div>
      </form>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] flex flex-col justify-center items-center px-4 py-12 selection:bg-[#D94E28] selection:text-white">
      <Suspense
        fallback={
          <div className="w-full max-w-xl bg-white rounded-3xl border border-[#E7E5E4] p-10 text-center animate-pulse text-[#57534E] text-xs">
            Memuat langkah onboarding...
          </div>
        }
      >
        <OnboardingContent />
      </Suspense>
    </main>
  );
}
