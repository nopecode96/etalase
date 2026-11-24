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
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Sparkles,
  PanelLeftClose,
  PanelLeftOpen,
  X,
  Tag,
  Zap,
  Wallet,
  Globe,
  Send,
  Layers,
  Store as StoreIcon,
  User,
} from "lucide-react";
import { EtalaseLogo } from "@/components/brand/EtalaseLogo";

interface AdminSidebarProps {
  store: {
    id: string;
    slug: string;
    name: string;
    avatarUrl?: string | null;
    tier: string;
    customDomain?: string | null;
  };
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

interface NavGroup {
  id: string;
  label: string;
  icon: React.ElementType;
  items?: {
    href: string;
    label: string;
    exact?: boolean;
  }[];
  href?: string;
  exact?: boolean;
}

const NAV_GROUPS: NavGroup[] = [
  {
    id: "overview",
    label: "Overview",
    icon: LayoutDashboard,
    href: "/admin",
    exact: true,
  },
  {
    id: "storefront",
    label: "Storefront",
    icon: Palette,
    items: [
      { href: "/admin/storefront/theme", label: "Templates & Theme" },
      { href: "/admin/storefront/blocks", label: "Content Blocks" },
    ],
  },
  {
    id: "products",
    label: "Products & Promos",
    icon: Package,
    items: [
      { href: "/admin/products", label: "All Products", exact: true },
      { href: "/admin/products/promos", label: "Flash Sale & Promos" },
    ],
  },
  {
    id: "orders",
    label: "Orders & Payouts",
    icon: ShoppingBag,
    items: [
      { href: "/admin/orders", label: "Customer Orders", exact: true },
      { href: "/admin/orders/payouts", label: "Wallet & Withdrawals" },
    ],
  },
  {
    id: "analytics",
    label: "Analytics & Pixel",
    icon: BarChart3,
    href: "/admin/analytics",
    exact: false,
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    items: [
      { href: "/admin/settings/profile", label: "Store Profile" },
      { href: "/admin/settings/domain", label: "Custom Domain" },
      { href: "/admin/settings/integrations", label: "Integrations" },
    ],
  },
];

export function AdminSidebar({
  store,
  user,
  isCollapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
}: AdminSidebarProps) {
  const pathname = usePathname();

  // Accordion open state for groups
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    storefront: pathname.startsWith("/admin/storefront"),
    products: pathname.startsWith("/admin/products"),
    orders: pathname.startsWith("/admin/orders"),
    settings: pathname.startsWith("/admin/settings"),
  });

  const toggleGroup = (id: string) => {
    setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const isFree = store.tier === "FREE";
  const tierLabel = isFree ? "FREE" : store.tier === "PRO" ? "PRO" : "DFY";

  const liveStoreUrl = store.customDomain
    ? `https://${store.customDomain}`
    : `/${store.slug}`;

  const isItemActive = (href: string, exact: boolean = false) => {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  };

  const isGroupActive = (group: NavGroup) => {
    if (group.href) return isItemActive(group.href, group.exact);
    return group.items?.some((item) => isItemActive(item.href, item.exact)) || false;
  };

  return (
    <>
      {/* =========================================================================
          DESKTOP FIXED LEFT SIDEBAR
      ========================================================================= */}
      <aside
        className={`hidden lg:flex flex-col border-r border-[#E7E5E4] bg-white h-screen fixed inset-y-0 left-0 z-30 select-none transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Header & Logo + Collapse Button */}
        <div className="h-14 px-4 border-b border-[#E7E5E4] flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2 min-w-0">
            <EtalaseLogo size="sm" />
            {!isCollapsed && (
              <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md bg-[#FAF8F5] text-[#57534E] border border-[#E7E5E4] truncate">
                Console
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={onToggleCollapse}
            title={isCollapsed ? "Expand Sidebar (w-64)" : "Collapse Sidebar (w-20)"}
            className="p-1.5 rounded-lg text-stone-500 hover:text-[#1C1917] hover:bg-stone-100 transition cursor-pointer shrink-0"
          >
            {isCollapsed ? (
              <PanelLeftOpen className="w-4 h-4" />
            ) : (
              <PanelLeftClose className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Store Identity Pill (Expanded vs Collapsed) */}
        <div className="p-3 border-b border-[#E7E5E4] bg-[#FAF8F5]/50">
          {!isCollapsed ? (
            <div className="p-2.5 rounded-2xl bg-white border border-[#E7E5E4] shadow-2xs flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                {store.avatarUrl ? (
                  <img
                    src={store.avatarUrl}
                    alt={store.name}
                    className="w-8 h-8 rounded-xl object-cover border border-[#E7E5E4] shrink-0"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-xl bg-[#D94E28]/10 text-[#D94E28] font-bold flex items-center justify-center text-xs shrink-0">
                    {store.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#1C1917] truncate leading-tight">
                    {store.name}
                  </p>
                  <p className="text-[10px] text-[#78716C] truncate mt-0.5">
                    {store.slug}.etalase.online
                  </p>
                </div>
              </div>

              <span
                className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
                  isFree
                    ? "bg-stone-100 text-stone-700 border border-stone-200"
                    : "bg-[#FDF0EC] text-[#D94E28] border border-[#FADCD3]"
                }`}
              >
                {tierLabel}
              </span>
            </div>
          ) : (
            <div className="flex justify-center" title={`${store.name} (${tierLabel})`}>
              {store.avatarUrl ? (
                <img
                  src={store.avatarUrl}
                  alt={store.name}
                  className="w-9 h-9 rounded-xl object-cover border border-[#E7E5E4]"
                />
              ) : (
                <div className="w-9 h-9 rounded-xl bg-[#D94E28]/10 text-[#D94E28] font-bold flex items-center justify-center text-xs">
                  {store.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Vertical Navigation Tree */}
        <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1.5">
          {NAV_GROUPS.map((group) => {
            const hasSubItems = Boolean(group.items && group.items.length > 0);
            const activeGroup = isGroupActive(group);
            const isOpen = openGroups[group.id] || activeGroup;
            const Icon = group.icon;

            // Simple Single Link (e.g. Overview, Analytics)
            if (!hasSubItems && group.href) {
              const active = isItemActive(group.href, group.exact);
              return (
                <Link
                  key={group.id}
                  href={group.href}
                  title={isCollapsed ? group.label : undefined}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    active
                      ? "bg-[#D94E28] text-white shadow-xs"
                      : "text-[#57534E] hover:bg-[#FAF8F5] hover:text-[#1C1917]"
                  } ${isCollapsed ? "justify-center px-0" : ""}`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-105 ${
                      active ? "text-white" : "text-[#78716C]"
                    }`}
                  />
                  {!isCollapsed && <span className="truncate">{group.label}</span>}
                </Link>
              );
            }

            // Accordion Group (Storefront, Products, Orders, Settings)
            if (isCollapsed) {
              // Collapsed mode: link to first sub-item with tooltip
              const firstHref = group.items![0].href;
              const active = activeGroup;
              return (
                <Link
                  key={group.id}
                  href={firstHref}
                  title={`${group.label}: ${group.items?.map((i) => i.label).join(", ")}`}
                  className={`flex items-center justify-center py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    active
                      ? "bg-[#D94E28] text-white shadow-xs"
                      : "text-[#57534E] hover:bg-[#FAF8F5] hover:text-[#1C1917]"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-105 ${
                      active ? "text-white" : "text-[#78716C]"
                    }`}
                  />
                </Link>
              );
            }

            // Expanded Mode: Collapsible Vertical Section
            return (
              <div key={group.id} className="space-y-0.5">
                <button
                  type="button"
                  onClick={() => toggleGroup(group.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition ${
                    activeGroup
                      ? "text-[#D94E28]"
                      : "text-[#57534E] hover:text-[#1C1917] hover:bg-[#FAF8F5]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-[#78716C]" />
                    <span>{group.label}</span>
                  </div>
                  {isOpen ? (
                    <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                  )}
                </button>

                {isOpen && (
                  <div className="pl-6 pr-1 space-y-0.5 border-l-2 border-stone-200 ml-4 py-1">
                    {group.items?.map((sub) => {
                      const active = isItemActive(sub.href, sub.exact);
                      return (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={`block px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                            active
                              ? "bg-[#FDF0EC] text-[#D94E28] font-bold"
                              : "text-[#57534E] hover:text-[#1C1917] hover:bg-[#FAF8F5]"
                          }`}
                        >
                          {sub.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer: Upgrade Box (if Free & Expanded) */}
        {!isCollapsed && isFree && (
          <div className="p-3 m-3 rounded-2xl bg-gradient-to-br from-[#FDF0EC] to-[#FAF8F5] border border-[#FADCD3]">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#D94E28]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Unlock PRO (2% QRIS)</span>
            </div>
            <Link
              href="/pricing"
              className="mt-2 block w-full text-center text-xs font-bold text-white bg-[#D94E28] hover:bg-[#B83E1D] py-1.5 rounded-xl transition shadow-xs"
            >
              Upgrade Plan
            </Link>
          </div>
        )}

        {/* User Card */}
        <div className="p-3 border-t border-[#E7E5E4] bg-[#FAF8F5]/60 flex items-center justify-between text-xs text-[#57534E]">
          {!isCollapsed ? (
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-full bg-[#E7E5E4] text-[#1C1917] font-bold text-[11px] flex items-center justify-center shrink-0">
                {(user.name || "U").charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold text-[#1C1917] truncate leading-tight">
                  {user.name || "Merchant"}
                </p>
                <p className="text-[10px] text-[#78716C] truncate">
                  {user.email || "owner@etalase.online"}
                </p>
              </div>
            </div>
          ) : (
            <div className="mx-auto" title={user.email || "Merchant"}>
              <div className="w-7 h-7 rounded-full bg-[#E7E5E4] text-[#1C1917] font-bold text-[11px] flex items-center justify-center">
                {(user.name || "U").charAt(0).toUpperCase()}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* =========================================================================
          MOBILE SLIDE-OVER DRAWER (for viewports < 768px / 1024px)
      ========================================================================= */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />

          <div className="relative ml-auto w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-slide-in-right">
            <div className="p-4 border-b border-[#E7E5E4] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <EtalaseLogo size="sm" />
                <span className="text-xs font-bold text-[#1C1917]">Tenant Console</span>
              </div>
              <button
                type="button"
                onClick={onCloseMobile}
                className="p-1.5 rounded-lg text-stone-500 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-[#FAF8F5] border-b border-[#E7E5E4]">
              <p className="text-xs font-bold text-[#1C1917] truncate">{store.name}</p>
              <p className="text-[11px] text-[#78716C] truncate mt-0.5">
                {store.slug}.etalase.online
              </p>
              <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase bg-[#FDF0EC] text-[#D94E28] border border-[#FADCD3]">
                Plan: {tierLabel}
              </span>
            </div>

            <nav className="flex-1 overflow-y-auto p-3 space-y-2">
              {NAV_GROUPS.map((group) => {
                const hasSubItems = Boolean(group.items && group.items.length > 0);
                const Icon = group.icon;

                if (!hasSubItems && group.href) {
                  const active = isItemActive(group.href, group.exact);
                  return (
                    <Link
                      key={group.id}
                      href={group.href}
                      onClick={onCloseMobile}
                      className={`flex items-center gap-3 p-2.5 rounded-xl text-xs font-semibold transition ${
                        active ? "bg-[#D94E28] text-white" : "text-[#57534E] hover:bg-[#FAF8F5]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{group.label}</span>
                    </Link>
                  );
                }

                return (
                  <div key={group.id} className="space-y-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400 px-2 pt-2">
                      {group.label}
                    </p>
                    {group.items?.map((sub) => {
                      const active = isItemActive(sub.href, sub.exact);
                      return (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={onCloseMobile}
                          className={`block p-2 rounded-xl text-xs font-medium transition ${
                            active
                              ? "bg-[#D94E28] text-white font-bold"
                              : "text-[#57534E] hover:bg-[#FAF8F5]"
                          }`}
                        >
                          {sub.label}
                        </Link>
                      );
                    })}
                  </div>
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
