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
      title: "Welcome to etalase.online!",
      subtitle: "Step 1 of 4 • Store Profile & WhatsApp",
      icon: Store,
      iconBg: "bg-orange-100 text-[#D94E28]",
      desc: "Set up your brand name and official WhatsApp number. Buyers can place chat orders directly with 0% commission.",
      actionText: "Open Store Profile",
      actionHref: "/admin/settings/profile",
      tip: "Tip: Use your country code without leading zeros or '+' (e.g. 6281234567890).",
    },
    {
      title: "Publish Your First Product",
      subtitle: "Step 2 of 4 • Catalog & Storefront",
      icon: ShoppingBag,
      iconBg: "bg-emerald-100 text-emerald-600",
      desc: "Start selling by uploading images, title, and pricing for digital downloads, physical goods, courses, or consultations.",
      actionText: "Add Product Now",
      actionHref: "/admin/products/new",
      tip: "Tip: Clear square (1:1) photos help showcase your products cleanly on mobile screens.",
    },
    {
      title: "Configure Your Payout Bank",
      subtitle: "Step 3 of 4 • Wallet & Withdrawals",
      icon: Building2,
      iconBg: "bg-sky-100 text-sky-600",
      desc: "Save your bank account (BCA, Mandiri, BRI, BNI) or e-wallet (GoPay, OVO, DANA) to withdraw QRIS & PayPal sales balances.",
      actionText: "Set Payout Account",
      actionHref: "/admin/orders/payouts#payout-bank-card",
      tip: "Tip: Margin Guard lets customers cover QRIS processing fees so you keep 100% of your product price.",
    },
    {
      title: "Your Storefront Is Ready!",
      subtitle: "Step 4 of 4 • Share Your Store Link",
      icon: Globe,
      iconBg: "bg-purple-100 text-purple-600",
      desc: "Your online storefront is active. Share your link across Instagram, TikTok, and WhatsApp profiles to start converting.",
      actionText: "View Live Storefront",
      actionHref: liveStoreUrl,
      isExternal: true,
      tip: "Tip: PRO stores can also connect a custom domain (e.g. shop.yourbrand.com).",
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
        showToast("Onboarding tour completed! Welcome to etalase.online.", "success");
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
              Store Setup Guide
            </span>
          </div>
          <button
            type="button"
            onClick={() => handleFinishOrSkip(false)}
            className="text-stone-400 hover:text-stone-600 p-1 rounded-lg hover:bg-stone-200/60 transition cursor-pointer"
            title="Skip & Close Guide"
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
            Skip Guide
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
                <span>Previous</span>
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
                  <span>Finish &amp; Start</span>
                </>
              ) : (
                <>
                  <span>Next</span>
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
