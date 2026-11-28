"use client";

import React, { useEffect, useState } from "react";
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
import { useAdminI18n } from "./AdminI18nContext";

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
  const { t } = useAdminI18n();
  const [mounted, setMounted] = useState(false);

  const navGroups: NavGroup[] = [
    { id: "overview", label: t.nav.overview, icon: LayoutDashboard, href: "/admin", exact: true },
    {
      id: "storefront",
      label: t.nav.storefront,
      icon: Palette,
      items: [
        { href: "/admin/storefront/theme", label: t.nav.templatesTheme },
        { href: "/admin/storefront/blocks", label: t.nav.contentBlocks },
      ],
    },
    {
      id: "products",
      label: t.nav.productsPromos,
      icon: Package,
      items: [
        { href: "/admin/products", label: t.nav.allProducts, exact: true },
        { href: "/admin/products/promos", label: t.nav.flashSalePromos },
      ],
    },
    {
      id: "orders",
      label: t.nav.ordersPayouts,
      icon: ShoppingBag,
      items: [
        { href: "/admin/orders", label: t.nav.customerOrders, exact: true },
        { href: "/admin/orders/payouts", label: t.nav.walletWithdrawals },
      ],
    },
    { id: "analytics", label: t.nav.analyticsPixel, icon: BarChart3, href: "/admin/analytics" },
    {
      id: "settings",
      label: t.nav.settings,
      icon: Settings,
      items: [
        { href: "/admin/settings/profile", label: t.nav.storeProfile },
        { href: "/admin/settings/domain", label: t.nav.customDomain },
        { href: "/admin/settings/integrations", label: t.nav.integrations },
      ],
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Accordion open state for groups
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    storefront: pathname.startsWith("/admin/storefront"),
    products: pathname.startsWith("/admin/products") || pathname.startsWith("/admin/boost"),
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
    if (href === "/admin/products/promos" && pathname.startsWith("/admin/boost")) {
      return true;
    }
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
          {navGroups.map((group) => {
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

        {/* Footer: Upgrade Box / Billing Quick Access */}
        {!isCollapsed && (
          <div className="p-3 m-3 rounded-2xl bg-gradient-to-br from-[#FDF0EC] to-[#FAF8F5] border border-[#FADCD3]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#D94E28]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isFree ? "Unlock PRO (2% QRIS)" : `${store.tier} Plan Active`}</span>
              </div>
              {!isFree && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Active
                </span>
              )}
            </div>
            <Link
              href="/admin/billing/upgrade"
              className="mt-2 block w-full text-center text-xs font-bold text-white bg-[#D94E28] hover:bg-[#B83E1D] py-1.5 rounded-xl transition shadow-xs"
            >
              {isFree ? "Upgrade Plan" : "Manage Subscription"}
            </Link>
          </div>
        )}

        {/* Customer Care Direct Link */}
        {!isCollapsed && (
          <div className="px-3 py-2 border-t border-[#E7E5E4] flex items-center justify-between text-[11px] bg-sky-50/50">
            <a
              href="https://t.me/etalaseonline_bot"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sky-700 hover:text-sky-800 font-semibold transition truncate min-w-0"
              title="Chat Customer Support (Rani • EtalaseOnline CS)"
            >
              <div className="w-4 h-4 rounded-full overflow-hidden border border-sky-300 shrink-0">
                <img
                  src="/images/rani-cs.png"
                  alt="Rani CS"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="truncate">Rani • EtalaseOnline CS</span>
            </a>
            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-semibold shrink-0 ml-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Online
            </span>
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
                  {mounted ? (user.email || "owner@etalase.online") : ""}
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
              {navGroups.map((group) => {
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

            <div className="p-4 border-t border-[#E7E5E4] space-y-2">
              <Link
                href="/admin/billing/upgrade"
                onClick={onCloseMobile}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#D94E28] text-white font-semibold text-xs hover:bg-[#B83E1D] transition shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isFree ? "Upgrade to PRO (2% QRIS)" : "Manage Subscription"}</span>
              </Link>
              <a
                href={liveStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#D94E28] text-[#D94E28] font-semibold text-xs hover:bg-[#FDF0EC] transition"
              >
                <span>View Live Storefront</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://t.me/etalaseonline_bot"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2.5 py-2.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-700 font-semibold text-xs hover:bg-sky-100 transition"
                title="Chat Customer Support (Rani • EtalaseOnline CS)"
              >
                <div className="w-4 h-4 rounded-full overflow-hidden border border-sky-300 shrink-0">
                  <img
                    src="/images/rani-cs.png"
                    alt="Rani CS"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span>Chat CS: Rani • EtalaseOnline CS</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
