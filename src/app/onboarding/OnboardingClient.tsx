"use client";

import React, { useState, useEffect, useTransition } from "react";
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
import { validateSubdomainFormat } from "@/lib/core/formatters";
import { showServiceResultToast } from "@/components/ui/GlobalToast";
import { trackGtmOnboardingStart, trackGtmSignUpComplete } from "@/lib/analytics/gtm";

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

export function OnboardingClient() {
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
  const [selectedCycle, setSelectedCycle] = useState("yearly");

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

    let initialCycle = searchParams.get("cycle") || "";
    if (!initialCycle) {
      try {
        initialCycle = sessionStorage.getItem("selected_cycle") || "";
      } catch {}
    }
    if (initialCycle) {
      setSelectedCycle(initialCycle.trim().toLowerCase());
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
      const clean = initialSlug.trim().toLowerCase().replace(/\s+/g, "-");
      setSlug(clean);
      performCheck(clean);
    }

    trackGtmOnboardingStart({
      claimedSlug: initialSlug || undefined,
      selectedPlan: initialPlan || undefined,
    });
  }, [searchParams]);

  const performCheck = async (val: string) => {
    const clean = val.trim().toLowerCase();
    if (!clean) {
      setSlugStatus("idle");
      setSlugMessage("");
      return;
    }

    const formatCheck = validateSubdomainFormat(clean);
    if (!formatCheck.valid) {
      setSlugStatus("unavailable");
      setSlugMessage(formatCheck.message || "Format subdomain belum valid (3–30 karakter).");
      return;
    }

    setSlugStatus("checking");
    const check = await actionCheckSlug(clean);
    if (check.success && check.data) {
      if (check.data.available) {
        setSlugStatus("available");
        setSlugMessage(`✓ ${check.data.slug}.etalase.online tersedia`);
      } else {
        setSlugStatus("unavailable");
        setSlugMessage(
          check.data.suggestion
            ? `✗ ${check.data.slug} sudah dipakai, coba ${check.data.suggestion}`
            : `✗ ${check.data.message || "Subdomain tidak tersedia."}`
        );
      }
    } else {
      setSlugStatus("unavailable");
      setSlugMessage(!check.success ? check.error : "Subdomain tidak tersedia.");
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.toLowerCase().replace(/\s+/g, "-");
    setSlug(raw);
    performCheck(raw);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanSlug = slug.trim().toLowerCase();
    const formatCheck = validateSubdomainFormat(cleanSlug);

    if (!formatCheck.valid) {
      setSlugStatus("unavailable");
      setSlugMessage(formatCheck.message || "Subdomain harus 3–30 karakter (huruf kecil, angka, satu tanda hubung).");
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
          sessionStorage.removeItem("selected_cycle");
          document.cookie = "claimed_slug=; path=/; max-age=0;";
          document.cookie = "selected_plan=; path=/; max-age=0;";
          document.cookie = "selected_cycle=; path=/; max-age=0;";
        } catch {}

        const plan = selectedPlan || (searchParams.get("plan") || searchParams.get("tier") || "").toLowerCase();
        const cycle = selectedCycle || (searchParams.get("cycle") || "").toLowerCase();

        trackGtmSignUpComplete({
          storeSlug: cleanSlug,
          businessCategory: category,
          selectedPlan: plan || "free",
        });

        if (plan === "pro" || plan === "dfy") {
          const query = new URLSearchParams();
          query.set("plan", plan);
          if (cycle) query.set("cycle", cycle);
          router.push(`/admin/billing/upgrade?${query.toString()}`);
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
          <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-amber-900 px-3.5 py-1.5 rounded-full text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#D94E28]" />
            <span>
              Paket Berbayar:{" "}
              <strong>
                {selectedPlan.toUpperCase() === "DFY" ? "Terima Beres (DFY)" : `PRO Plan (${selectedCycle === "monthly" ? "Bulanan" : "Tahunan Hemat 20%"})`}
              </strong>{" "}
              &bull; Selesaikan data toko, lalu lanjut bayar
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
              placeholder="namatokomu"
              className="flex-1 px-4 py-3 text-sm text-[#1C1917] placeholder:text-stone-400 focus:outline-none font-mono"
            />
            <div className="bg-[#FAF8F5] border-l border-[#E7E5E4] px-4 py-3 text-xs sm:text-sm font-mono text-[#57534E] flex items-center select-none">
              .etalase.online
            </div>
          </div>

          {/* Status availability badge */}
          {slugStatus === "checking" && (
            <div className="flex items-center gap-1.5 text-xs text-[#78716C] pt-1">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#D94E28]" />
              <span>Memeriksa ketersediaan alamat...</span>
            </div>
          )}

          {slugStatus === "available" && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium pt-1">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>{slugMessage}</span>
            </div>
          )}

          {slugStatus === "unavailable" && (
            <div className="flex items-center gap-1.5 text-xs text-rose-600 font-medium pt-1">
              <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
              <span>{slugMessage}</span>
            </div>
          )}
        </div>

        {/* 2. Nomor WhatsApp */}
        <div className="space-y-2">
          <label className="flex items-center justify-between text-xs font-bold text-[#1C1917] uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#D94E28]" />
              <span>2. Nomor WhatsApp Aktif</span>
            </span>
            <span className="text-[11px] font-normal text-[#57534E] lowercase">
              Untuk notifikasi pesanan
            </span>
          </label>

          <div className="flex rounded-xl border border-[#E7E5E4] bg-white overflow-hidden shadow-2xs focus-within:border-[#D94E28] focus-within:ring-2 focus-within:ring-[#D94E28]/15 transition">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="bg-[#FAF8F5] border-r border-[#E7E5E4] px-3 py-3 text-xs sm:text-sm font-medium text-[#1C1917] focus:outline-none cursor-pointer"
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
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="81234567890"
              className="flex-1 px-4 py-3 text-sm text-[#1C1917] placeholder:text-stone-400 focus:outline-none font-mono"
            />
          </div>
          <p className="text-[11px] text-[#78716C] pt-0.5">
            Order chat dan struk transaksi akan otomatis terkirim ke WhatsApp ini tanpa perantara.
          </p>
        </div>

        {/* 3. Kategori Bisnis / Use Case */}
        <div className="space-y-2">
          <label className="flex items-center gap-1.5 text-xs font-bold text-[#1C1917] uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-[#D94E28]" />
            <span>3. Kategori Bisnis (Pilihan Cepat)</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {BUSINESS_CATEGORIES.map((cat) => {
              const active = category === cat.id;
              return (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`text-left p-3.5 rounded-2xl border transition relative ${
                    active
                      ? "border-[#D94E28] bg-[#FDF0EC]/40 ring-1 ring-[#D94E28]"
                      : "border-[#E7E5E4] bg-white hover:border-stone-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1C1917]">
                      {cat.label}
                    </span>
                    {active && (
                      <span className="w-2 h-2 rounded-full bg-[#D94E28]" />
                    )}
                  </div>
                  <p className="text-[11px] text-[#78716C] mt-0.5">{cat.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-[#E7E5E4]">
          <button
            type="submit"
            disabled={isPending || slugStatus === "checking" || slugStatus === "unavailable"}
            className="w-full py-4 px-6 rounded-2xl bg-[#D94E28] hover:bg-[#B83E1D] text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Menyiapkan Etalase Anda...</span>
              </>
            ) : selectedPlan === "pro" || selectedPlan === "dfy" ? (
              <>
                <span>Lanjut ke Pembayaran ({selectedPlan.toUpperCase() === "DFY" ? "Terima Beres" : "Paket PRO"})</span>
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Buka Toko & Masuk Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="text-center text-[11px] text-[#57534E] pt-3 font-medium">
            {selectedPlan === "pro" || selectedPlan === "dfy" ? (
              <span className="text-[#D94E28] font-semibold">
                Pembayaran otomatis &amp; instan via Borderpay QRIS &amp; PayPal (Credit Card)
              </span>
            ) : (
              "Paket Gratis Selamanya • 0% Komisi Order Chat • Template Default Clean Minimal"
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
