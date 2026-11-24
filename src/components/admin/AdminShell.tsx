"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Menu,
  ExternalLink,
  LogOut,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { AdminSidebar } from "./AdminSidebar";

interface AdminShellProps {
  store: any;
  user: any;
  children: React.ReactNode;
}

const BREADCRUMB_MAP: Record<string, { parent?: string; title: string }> = {
  "/admin": { title: "Overview" },
  "/admin/storefront/theme": { parent: "Storefront", title: "Templates & Theme" },
  "/admin/storefront/blocks": { parent: "Storefront", title: "Content Blocks" },
  "/admin/products": { parent: "Products & Promos", title: "All Products" },
  "/admin/products/promos": { parent: "Products & Promos", title: "Flash Sale & Promos" },
  "/admin/orders": { parent: "Orders & Payouts", title: "Customer Orders" },
  "/admin/orders/payouts": { parent: "Orders & Payouts", title: "Wallet & Withdrawals" },
  "/admin/analytics": { title: "Analytics & Pixel" },
  "/admin/settings/profile": { parent: "Settings", title: "Store Profile" },
  "/admin/settings/domain": { parent: "Settings", title: "Custom Domain" },
  "/admin/settings/integrations": { parent: "Settings", title: "Integrations" },
};

export function AdminShell({ store, user, children }: AdminShellProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const breadcrumb = BREADCRUMB_MAP[pathname] || { title: "Tenant Console" };

  const isFree = store.tier === "FREE";
  const tierLabel = isFree ? "FREE" : store.tier === "PRO" ? "PRO" : "DFY";

  const liveStoreUrl = store.customDomain
    ? `https://${store.customDomain}`
    : `/${store.slug}`;

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: "/login" });
    } catch {
      window.location.href = "/login";
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] flex flex-col antialiased selection:bg-[#D94E28] selection:text-white">
      {/* 1. Left Sidebar Navigation */}
      <AdminSidebar
        store={store}
        user={user}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* 2. Right Side: Top Bar + Clean Canvas Content */}
      <div
        className={`flex flex-col flex-1 min-h-screen transition-all duration-300 ${
          isCollapsed ? "lg:pl-20" : "lg:pl-64"
        }`}
      >
        {/* Sleek Top Bar (h-14) */}
        <header className="sticky top-0 z-20 h-14 bg-white/90 backdrop-blur-md border-b border-[#E7E5E4] px-4 sm:px-6 flex items-center justify-between">
          {/* Left: Mobile Toggle + Breadcrumb */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-1.5 rounded-xl text-stone-600 hover:bg-stone-100 transition shrink-0"
              aria-label="Open Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb / Title */}
            <div className="flex items-center gap-1.5 text-xs text-[#78716C] truncate">
              {breadcrumb.parent && (
                <>
                  <span className="font-medium hidden sm:inline">{breadcrumb.parent}</span>
                  <ChevronRight className="w-3.5 h-3.5 hidden sm:inline text-stone-400" />
                </>
              )}
              <h1 className="text-xs sm:text-sm font-bold text-[#1C1917] truncate">
                {breadcrumb.title}
              </h1>
            </div>
          </div>

          {/* Right: Plan Badge, Live Storefront, Logout */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Plan Badge */}
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

            {/* Live Storefront Quick Link */}
            <a
              href={liveStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E7E5E4] hover:bg-[#FAF8F5] text-xs font-semibold text-[#1C1917] transition shadow-2xs"
            >
              <span>Live Storefront</span>
              <ExternalLink className="w-3 h-3 text-[#78716C]" />
            </a>

            {/* Logout Button */}
            <button
              type="button"
              onClick={handleSignOut}
              title="Sign Out"
              className="p-1.5 rounded-xl border border-[#E7E5E4] hover:bg-rose-50 hover:border-rose-200 text-stone-500 hover:text-rose-600 transition text-xs font-medium flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Sign Out</span>
            </button>
          </div>
        </header>

        {/* 3. Main Content Canvas (No Horizontal Tabs) */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto pb-16">
          {children}
        </main>
      </div>
    </div>
  );
}
