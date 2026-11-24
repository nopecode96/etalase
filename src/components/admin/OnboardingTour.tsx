"use client";

import React, { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import {
  Sparkles,
  Store,
  ShoppingBag,
  Building2,
  Globe,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  X,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { completeOnboardingTourAction } from "@/lib/actions/payout-actions";
import { showToast } from "@/components/ui/GlobalToast";

interface OnboardingTourProps {
  store: any;
}

export function OnboardingTour({ store }: OnboardingTourProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // Automatically trigger for fresh tenants who haven't completed onboarding
    if (store && store.hasCompletedOnboarding === false) {
      const tourDismissed = sessionStorage.getItem(`onboarding_dismissed_${store.id}`);
      if (!tourDismissed) {
        setIsOpen(true);
      }
    }

    // Custom event listener for replaying the tour
    const handleOpen = () => {
      setCurrentStep(0);
      setIsOpen(true);
    };

    window.addEventListener("open-onboarding-tour", handleOpen);
    return () => {
      window.removeEventListener("open-onboarding-tour", handleOpen);
    };
  }, [store]);

  const liveStoreUrl = store?.customDomain
    ? `https://${store.customDomain}`
    : `/${store?.slug}`;

  const steps = [
    {
      title: "Selamat Datang di etalase.online!",
      subtitle: "Langkah 1 dari 4 • Profil & WhatsApp Toko",
      icon: Store,
      iconBg: "bg-orange-100 text-[#D94E28]",
      desc: "Lengkapi nama merek dan nomor WhatsApp resmi toko Anda. Pelanggan dapat langsung menghubungi Anda untuk pesanan via WhatsApp tanpa potongan biaya komisi (0% Fee).",
      actionText: "Buka Pengaturan Profil",
      actionHref: "/admin/settings/profile",
      tip: "Tips: Pastikan format nomor WhatsApp diawali kode negara (contoh: 6281234567890).",
    },
    {
      title: "Pasang Produk Pertama Anda",
      subtitle: "Langkah 2 dari 4 • Katalog & Etalase",
      icon: ShoppingBag,
      iconBg: "bg-emerald-100 text-emerald-600",
      desc: "Mulai berjualan dengan mengunggah foto, nama produk, dan harga. Anda bisa menjual barang fisik, produk digital (unduh otomatis), voucher, atau jasa.",
      actionText: "Tambah Produk Sekarang",
      actionHref: "/admin/products/new",
      tip: "Tips: Gunakan foto beresolusi jelas dengan rasio 1:1 agar etalase tampak profesional.",
    },
    {
      title: "Daftarkan Rekening Bank Pencairan",
      subtitle: "Langkah 3 dari 4 • Payout & BorderPay",
      icon: Building2,
      iconBg: "bg-sky-100 text-sky-600",
      desc: "Simpan nomor rekening bank (BCA, Mandiri, BRI, BNI, dll) atau dompet digital (GoPay, OVO, DANA) Anda. Seluruh hasil pembayaran QRIS otomatis dicairkan ke rekening ini.",
      actionText: "Atur Rekening Pencairan",
      actionHref: "/admin/orders/payouts#payout-bank-card",
      tip: "Tips: Sistem BorderPay Anti-Rugi otomatis memproteksi margin keuntungan toko Anda.",
    },
    {
      title: "Etalase Anda Siap Menerima Order!",
      subtitle: "Langkah 4 dari 4 • Bagikan Link Toko",
      icon: Globe,
      iconBg: "bg-purple-100 text-purple-600",
      desc: "Selamat! Toko online Anda sudah aktif. Salin dan tempelkan tautan toko ke bio Instagram, TikTok, WhatsApp Story, atau website profil Anda.",
      actionText: "Lihat Etalase Toko",
      actionHref: liveStoreUrl,
      isExternal: true,
      tip: "Tips: Anda juga dapat menghubungkan domain kustom sendiri (contoh: tokoanda.com).",
    },
  ];

  const step = steps[currentStep];

  const handleFinishOrSkip = (isFinalStep = false) => {
    startTransition(async () => {
      if (store?.id) {
        await completeOnboardingTourAction(store.id);
        sessionStorage.setItem(`onboarding_dismissed_${store.id}`, "true");
      }
      setIsOpen(false);
      if (isFinalStep) {
        showToast("Tur onboarding selesai! Selamat berjualan di etalase.online.", "success");
      }
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinishOrSkip(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isOpen) return null;

  const IconComp = step.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl border border-[#E7E5E4] shadow-2xl max-w-lg w-full overflow-hidden flex flex-col">
        {/* Header bar */}
        <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-stone-100 bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#FDF0EC] text-[#D94E28]">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-stone-700 tracking-wide">
              Panduan Memulai Toko
            </span>
          </div>
          <button
            type="button"
            onClick={() => handleFinishOrSkip(false)}
            className="text-stone-400 hover:text-stone-600 p-1 rounded-lg hover:bg-stone-200/60 transition cursor-pointer"
            title="Tutup & Lewati Panduan"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal body */}
        <div className="p-6 space-y-5">
          {/* Progress dots */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#D94E28] uppercase tracking-wider">
              {step.subtitle}
            </span>
            <div className="flex items-center gap-1.5">
              {steps.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentStep
                      ? "w-6 bg-[#D94E28]"
                      : idx < currentStep
                      ? "w-2 bg-emerald-500"
                      : "w-2 bg-stone-200"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Main spotlight content */}
          <div className="flex items-start gap-4">
            <div className={`p-3.5 rounded-2xl ${step.iconBg} shrink-0`}>
              <IconComp className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#1C1917] leading-snug">
                {step.title}
              </h3>
              <p className="text-xs text-[#57534E] leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>

          {/* Action shortcut button */}
          <div className="pt-2">
            {step.isExternal ? (
              <a
                href={step.actionHref}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E7E5E4] hover:bg-[#F3EFEA] text-xs font-bold text-[#1C1917] transition shadow-2xs"
              >
                <span>{step.actionText}</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#78716C]" />
              </a>
            ) : (
              <Link
                href={step.actionHref}
                onClick={() => setIsOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E7E5E4] hover:bg-[#F3EFEA] text-xs font-bold text-[#1C1917] transition shadow-2xs"
              >
                <span>{step.actionText}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#78716C]" />
              </Link>
            )}
          </div>

          {/* Tip card */}
          <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 text-[11px] text-amber-800">
            {step.tip}
          </div>
        </div>

        {/* Footer controls */}
        <div className="px-6 py-4 bg-[#FAF8F5] border-t border-stone-100 flex items-center justify-between">
          <button
            type="button"
            onClick={() => handleFinishOrSkip(false)}
            disabled={isPending}
            className="text-xs font-semibold text-stone-500 hover:text-stone-800 transition"
          >
            Lewati Panduan
          </button>

          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={handlePrev}
                disabled={isPending}
                className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-stone-700 bg-white border border-[#E7E5E4] hover:bg-stone-50 rounded-xl transition cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Sebelumnya</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleNext}
              disabled={isPending}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#D94E28] hover:bg-[#B83E1D] rounded-xl transition shadow-xs cursor-pointer disabled:opacity-50"
            >
              {isPending ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : currentStep === steps.length - 1 ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Selesai &amp; Mulai</span>
                </>
              ) : (
                <>
                  <span>Lanjut</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
