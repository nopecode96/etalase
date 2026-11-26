"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Circle,
  Sparkles,
  ArrowRight,
  Store,
  ShoppingBag,
  Building2,
  HelpCircle,
  RotateCcw,
} from "lucide-react";

interface StoreSetupChecklistProps {
  store: any;
  onReplayTour?: () => void;
}

export function StoreSetupChecklist({ store, onReplayTour }: StoreSetupChecklistProps) {
  const [collapsed, setCollapsed] = useState(false);

  const hasProfile = Boolean(store.name && store.chatHandle && store.chatHandle.trim());
  const hasProducts = Boolean(store.products && store.products.length > 0);
  const hasPayoutBank = Boolean(store.payoutAccountNumber && store.payoutAccountNumber.trim());
  const hasCompletedTour = Boolean(store.hasCompletedOnboarding);

  const items = [
    {
      id: "profile",
      title: "Store Profile & Seller WhatsApp",
      desc: "Set your store name and WhatsApp handle to receive 0% commission direct chat orders.",
      isDone: hasProfile,
      href: "/admin/settings/profile",
      cta: "Edit Profile",
      icon: Store,
    },
    {
      id: "product",
      title: "First Storefront Product",
      desc: "Publish at least 1 digital or physical product so visitors can browse and checkout.",
      isDone: hasProducts,
      href: "/admin/products/new",
      cta: "Add Product",
      icon: ShoppingBag,
    },
    {
      id: "payout",
      title: "Payout Bank Account",
      desc: "Configure your bank or e-wallet account (BCA, Mandiri, GoPay, etc.) for wallet withdrawals.",
      isDone: hasPayoutBank,
      href: "/admin/orders/payouts#payout-bank-card",
      cta: "Set Account",
      icon: Building2,
    },
    {
      id: "tour",
      title: "Onboarding Store Guide",
      desc: "Walk through storefront customization, QRIS checkout, and order payout management.",
      isDone: hasCompletedTour,
      action: () => {
        if (onReplayTour) {
          onReplayTour();
        } else {
          window.dispatchEvent(new CustomEvent("open-onboarding-tour"));
        }
      },
      cta: "Open Guide",
      icon: HelpCircle,
    },
  ];

  const completedCount = items.filter((item) => item.isDone).length;
  const progressPercent = Math.round((completedCount / items.length) * 100);
  const isAllDone = completedCount === items.length;

  return (
    <div className="bg-white rounded-3xl border border-[#E7E5E4] shadow-xs overflow-hidden transition-all">
      {/* Header bar */}
      <div className="p-5 sm:p-6 border-b border-[#E7E5E4] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-white via-white to-orange-50/30">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-[#FDF0EC] text-[#D94E28]">
              <Sparkles className="w-4 h-4" />
            </span>
            <h2 className="text-base font-bold text-[#1C1917]">
              Store Launch Checklist
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
              {completedCount}/{items.length} Completed
            </span>
          </div>
          <p className="text-xs text-[#57534E] mt-1">
            {isAllDone
              ? "All set! Your essential store settings are complete and ready to accept orders."
              : "Complete these 4 essential steps so your storefront is ready to accept payments and process payouts."}
          </p>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <div className="w-28 sm:w-36 bg-stone-100 rounded-full h-2.5 overflow-hidden border border-stone-200">
            <div
              className={`h-full transition-all duration-500 ${
                isAllDone ? "bg-emerald-600" : "bg-[#D94E28]"
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-bold text-[#1C1917] min-w-[3rem] text-right font-mono">
            {progressPercent}%
          </span>
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="text-xs text-stone-500 hover:text-stone-800 font-semibold px-2 py-1 rounded-lg hover:bg-stone-100 transition"
          >
            {collapsed ? "Show" : "Hide"}
          </button>
        </div>
      </div>

      {/* Checklist items */}
      {!collapsed && (
        <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-3.5 bg-[#FAF8F5]/40">
          {items.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                  item.isDone
                    ? "bg-white border-emerald-100/80 shadow-2xs"
                    : "bg-white border-[#E7E5E4] hover:border-[#D94E28]/40 shadow-xs"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    {item.isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-50" />
                    ) : (
                      <Circle className="w-5 h-5 text-stone-300" />
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <IconComponent className="w-3.5 h-3.5 text-stone-400" />
                      <h3
                        className={`text-xs font-bold ${
                          item.isDone ? "text-stone-700 line-through decoration-stone-300" : "text-[#1C1917]"
                        }`}
                      >
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-[11px] text-[#57534E] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.isDone
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {item.isDone ? "Completed" : "Needs Setup"}
                  </span>

                  {item.href ? (
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#D94E28] hover:text-[#B83E1D] transition"
                    >
                      <span>{item.cta}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  ) : item.action ? (
                    <button
                      type="button"
                      onClick={item.action}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#D94E28] hover:text-[#B83E1D] transition cursor-pointer"
                    >
                      <span>{item.cta}</span>
                      <RotateCcw className="w-3 h-3" />
                    </button>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
