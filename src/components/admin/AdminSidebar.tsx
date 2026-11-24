"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Palette,
  Package,
  ShoppingBag,
  BarChart3,
  Settings,
  ExternalLink,
  Sparkles,
  Menu,
  X,
  Store as StoreIcon,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { EtalaseLogo } from "@/components/brand/EtalaseLogo";

interface AdminSidebarProps {
  store: {
    id: string;
    slug: string;
    name: string;
    avatarUrl?: string | null;
    tier: string;
    isDemo?: boolean;
    customDomain?: string | null;
  };
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

const NAV_ITEMS = [
  {
    href: "/admin",
    exact: true,
    label: "Overview",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    href: "/admin/storefront",
    exact: false,
    label: "Storefront & Blocks",
    icon: Palette,
    badge: null,
  },
  {
    href: "/admin/products",
    exact: false,
    label: "Products & Promos",
    icon: Package,
    badge: null,
  },
  {
    href: "/admin/orders",
    exact: false,
    label: "Orders & Payouts",
    icon: ShoppingBag,
    badge: null,
  },
  {
    href: "/admin/analytics",
    exact: false,
    label: "Analytics & Pixel",
    icon: BarChart3,
    badge: null,
  },
  {
    href: "/admin/settings",
    exact: false,
    label: "Settings & Integrations",
    icon: Settings,
    badge: null,
  },
];

export function AdminSidebar({ store, user }: AdminSidebarProps) {
  const pathname = usePathname();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const isFree = store.tier === "FREE";
  const tierLabel = isFree ? "FREE" : store.tier === "PRO" ? "PRO" : "DFY";

  const liveStoreUrl = store.customDomain
    ? `https://${store.customDomain}`
    : `/${store.slug}`;

  const isActiveLink = (href: string, exact: boolean) => {
    if (exact) {
      return pathname === href;
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      {/* =========================================================================
          DESKTOP SIDEBAR (w-64, hidden on mobile, fixed on left)
      ========================================================================= */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-[#E7E5E4] bg-white h-screen fixed inset-y-0 left-0 z-30 select-none">
        {/* Brand & Store Header */}
        <div className="p-5 border-b border-[#E7E5E4] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-2">
              <EtalaseLogo size="sm" />
              <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md bg-[#FAF8F5] text-[#57534E] border border-[#E7E5E4]">
                Console
              </span>
            </Link>

            {/* Active Tier Badge */}
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                isFree
                  ? "bg-stone-100 text-stone-700 border border-stone-200"
                  : store.tier === "PRO"
                  ? "bg-[#FDF0EC] text-[#D94E28] border border-[#FADCD3]"
                  : "bg-purple-100 text-purple-700 border border-purple-200"
              }`}
            >
              {tierLabel}
            </span>
          </div>

          {/* Store Switcher / Identity Card */}
          <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E7E5E4] flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              {store.avatarUrl ? (
                <img
                  src={store.avatarUrl}
                  alt={store.name}
                  className="w-8 h-8 rounded-lg object-cover border border-[#E7E5E4]"
                />
              ) : (
                <div className="w-8 h-8 rounded-lg bg-[#D94E28]/10 text-[#D94E28] font-bold flex items-center justify-center text-xs shrink-0">
                  {store.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#1C1917] truncate leading-tight">
                  {store.name}
                </p>
                <p className="text-[10px] text-[#78716C] truncate">
                  {store.slug}.etalase.online
                </p>
              </div>
            </div>

            {/* View Live Storefront Button */}
            <a
              href={liveStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="View Live Storefront"
              className="p-1.5 rounded-lg text-[#57534E] hover:text-[#D94E28] hover:bg-white transition shrink-0"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 6 Core Navigation Menus */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-[#A8A29E]">
            Store Management
          </div>

          {NAV_ITEMS.map((item) => {
            const active = isActiveLink(item.href, item.exact);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  active
                    ? "bg-[#D94E28] text-white shadow-xs"
                    : "text-[#57534E] hover:bg-[#FAF8F5] hover:text-[#1C1917]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-transform group-hover:scale-105 ${
                      active ? "text-white" : "text-[#78716C]"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {active ? (
                  <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        {/* Free Plan Upgrade Card if FREE */}
        {isFree && (
          <div className="m-3 p-3.5 rounded-2xl bg-gradient-to-br from-[#FDF0EC] to-[#FAF8F5] border border-[#FADCD3]">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#D94E28]">
              <Sparkles className="w-4 h-4" />
              <span>Unlock PRO Features</span>
            </div>
            <p className="text-[11px] text-[#57534E] mt-1 leading-snug">
              Get 2% QRIS fee, custom domain, 4 templates & 4x free monthly payouts.
            </p>
            <Link
              href="/pricing"
              className="mt-3 block w-full text-center text-xs font-bold text-white bg-[#D94E28] hover:bg-[#B83E1D] py-2 rounded-xl transition shadow-xs"
            >
              Upgrade for Rp 49.000/mo
            </Link>
          </div>
        )}

        {/* User Account / Footer */}
        <div className="p-3 border-t border-[#E7E5E4] bg-[#FAF8F5]/60 flex items-center justify-between text-xs text-[#57534E]">
          <div className="flex items-center gap-2 min-w-0">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name || "User"}
                className="w-7 h-7 rounded-full object-cover"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-[#E7E5E4] text-[#1C1917] font-bold text-[11px] flex items-center justify-center shrink-0">
                {(user.name || "U").charAt(0).toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-[#1C1917] truncate leading-tight">
                {user.name || "Merchant Owner"}
              </p>
              <p className="text-[10px] text-[#78716C] truncate">
                {user.email || "merchant@etalase.online"}
              </p>
            </div>
          </div>

          <a
            href={liveStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-medium text-[#D94E28] hover:underline shrink-0"
          >
            Live ↗
          </a>
        </div>
      </aside>

      {/* =========================================================================
          MOBILE TOP BAR (Sticky header with logo, title, drawer toggle)
      ========================================================================= */}
      <header className="lg:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E7E5E4] px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <EtalaseLogo size="sm" />
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-stone-100 text-stone-600">
            {tierLabel}
          </span>
          <span className="text-xs font-bold text-[#1C1917] truncate ml-1">
            {store.name}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={liveStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[#D94E28] bg-[#FDF0EC] border border-[#FADCD3] px-2.5 py-1 rounded-lg flex items-center gap-1"
          >
            <span>Live Store</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <button
            type="button"
            onClick={() => setMobileDrawerOpen(true)}
            className="p-2 rounded-xl text-[#57534E] hover:bg-stone-100 transition"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* =========================================================================
          MOBILE BOTTOM NAVIGATION (Fixed at bottom for quick thumb reach)
      ========================================================================= */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#E7E5E4] z-40 px-2 py-1 flex items-center justify-around">
        {NAV_ITEMS.slice(0, 4).map((item) => {
          const active = isActiveLink(item.href, item.exact);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition ${
                active ? "text-[#D94E28] font-bold" : "text-[#78716C] font-medium"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[9px] leading-tight">{item.label.split(" ")[0]}</span>
            </Link>
          );
        })}

        <button
          type="button"
          onClick={() => setMobileDrawerOpen(true)}
          className="flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl text-[#78716C] font-medium"
        >
          <Menu className="w-4 h-4" />
          <span className="text-[9px] leading-tight">More</span>
        </button>
      </nav>

      {/* =========================================================================
          MOBILE SLIDE-OVER DRAWER
      ========================================================================= */}
      {mobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileDrawerOpen(false)}
          />

          <div className="relative ml-auto w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-slide-in-right">
            <div className="p-4 border-b border-[#E7E5E4] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <EtalaseLogo size="sm" />
                <span className="text-xs font-bold text-[#1C1917]">Tenant Admin</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1.5 rounded-lg text-stone-500 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-[#FAF8F5] border-b border-[#E7E5E4]">
              <p className="text-xs font-bold text-[#1C1917] truncate">{store.name}</p>
              <p className="text-[11px] text-[#78716C] truncate mt-0.5">
                {store.slug}.etalase.online
              </p>
              <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase bg-[#FDF0EC] text-[#D94E28] border border-[#FADCD3]">
                Plan: {tierLabel}
              </span>
            </div>

            <nav className="flex-1 overflow-y-auto p-4 space-y-1.5">
              {NAV_ITEMS.map((item) => {
                const active = isActiveLink(item.href, item.exact);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileDrawerOpen(false)}
                    className={`flex items-center justify-between p-3 rounded-xl text-xs font-semibold transition ${
                      active
                        ? "bg-[#D94E28] text-white"
                        : "text-[#57534E] hover:bg-[#FAF8F5]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-[#E7E5E4]">
              <a
                href={liveStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#D94E28] text-[#D94E28] font-semibold text-xs hover:bg-[#FDF0EC] transition"
              >
                <span>View Live Storefront</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
