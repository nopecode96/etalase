"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Store,
  CreditCard,
  Wallet,
  Globe,
  Users,
  Settings,
  ShoppingBag,
  Sparkles,
  Cpu,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Shield,
  Activity,
  X,
} from "lucide-react";

interface MabesSidebarProps {
  user: {
    id: string;
    email: string;
    name?: string | null;
    role: "SUPER_ADMIN" | "ADMIN_MABES";
  };
  pendingBillingCount: number;
  pendingPayoutCount: number;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function MabesSidebar({
  user,
  pendingBillingCount,
  pendingPayoutCount,
  isMobileOpen = false,
  onMobileClose,
}: MabesSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const navSections = [
    {
      title: "Core Operations",
      items: [
        {
          label: "Overview",
          href: "/mabes",
          icon: LayoutDashboard,
          badge: null,
          exact: true,
        },
        {
          label: "Tenant Management",
          href: "/mabes/tenants",
          icon: Store,
          badge: null,
        },
        {
          label: "Upgrade & Billing",
          href: "/mabes/billing",
          icon: CreditCard,
          badge: pendingBillingCount > 0 ? pendingBillingCount : null,
          badgeVariant: "rose",
        },
        {
          label: "Payouts & Withdrawals",
          href: "/mabes/payouts",
          icon: Wallet,
          badge: pendingPayoutCount > 0 ? pendingPayoutCount : null,
          badgeVariant: "amber",
        },
      ],
    },
    {
      title: "Commerce & Services",
      items: [
        {
          label: "Global Orders",
          href: "/mabes/orders",
          icon: ShoppingBag,
          badge: null,
        },
        {
          label: "Terima Beres (DFY)",
          href: "/mabes/dfy",
          icon: Sparkles,
          badge: null,
        },
        {
          label: "Custom Domains",
          href: "/mabes/domains",
          icon: Globe,
          badge: null,
        },
      ],
    },
    {
      title: "Automation & Growth",
      items: [
        {
          label: "Automations Hub",
          href: "/mabes/automations",
          icon: Cpu,
          badge: null,
        },
        {
          label: "Blog & SEO CMS",
          href: "/mabes/blog",
          icon: BookOpen,
          badge: null,
        },
      ],
    },
    {
      title: "Platform & Governance",
      items: [
        {
          label: "Mabes Team",
          href: "/mabes/team",
          icon: Users,
          badge: null,
        },
        {
          label: "Platform Settings",
          href: "/mabes/settings",
          icon: Settings,
          badge: null,
        },
      ],
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800 text-slate-300">
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800 shrink-0">
        <Link href="/mabes" className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-600 flex items-center justify-center text-white shadow-md shrink-0">
            <Shield className="w-5 h-5 fill-white/20" />
          </div>
          {!collapsed && (
            <div className="leading-tight truncate">
              <div className="text-sm font-bold text-white tracking-wide">
                MABES <span className="text-rose-500 font-mono text-xs">HQ</span>
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                Rafa Kreasindo Teknologi
              </div>
            </div>
          )}
        </Link>

        {/* Desktop collapse toggle */}
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white items-center justify-center transition cursor-pointer"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        {/* Mobile close toggle */}
        {onMobileClose && (
          <button
            type="button"
            onClick={onMobileClose}
            className="md:hidden w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation Links (100% Vertical, zero tabs) */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4 scrollbar-thin">
        {navSections.map((section, sIdx) => (
          <div key={section.title} className="space-y-1">
            {!collapsed && (
              <div className="px-3 pt-1 pb-1 text-[9px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                {section.title}
              </div>
            )}

            {section.items.map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(item.href + "/");

              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onMobileClose}
                  title={collapsed ? item.label : undefined}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all group relative ${
                    isActive
                      ? "bg-rose-600 text-white shadow-md shadow-rose-950/40"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/80"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                      isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"
                    }`}
                  />

                  {!collapsed && (
                    <span className="flex-1 truncate tracking-tight">{item.label}</span>
                  )}

                  {/* Badge for pending tasks */}
                  {item.badge !== null && !collapsed && (
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold leading-none ${
                        isActive
                          ? "bg-white text-rose-700"
                          : item.badgeVariant === "rose"
                          ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                          : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}

                  {/* Collapsed dot indicator */}
                  {item.badge !== null && collapsed && (
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500" />
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Operator & System Status Footer */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/40 shrink-0">
        <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50 space-y-2">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {!collapsed ? "Engine Online" : ""}
            </span>
            {!collapsed && (
              <span className="text-[10px] font-mono text-slate-500">v2.4-mabes</span>
            )}
          </div>

          {!collapsed && (
            <div className="text-[11px] truncate text-slate-300">
              <div className="font-bold text-white truncate">{user.name || "Operator"}</div>
              <div className="text-[10px] text-slate-400 font-mono truncate">{user.email}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Left Sidebar */}
      <aside
        className={`hidden md:block fixed top-0 left-0 bottom-0 z-40 transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            onClick={onMobileClose}
          />
          <aside className="fixed top-0 left-0 bottom-0 w-72 max-w-[85vw] z-50">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
