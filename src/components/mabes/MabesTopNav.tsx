"use client";

import React, { useTransition } from "react";
import { usePathname } from "next/navigation";
import { Menu, LogOut, Shield, ShieldCheck, Loader2 } from "lucide-react";
import { actionMabesLogout } from "@/app/mabes/actions";

interface MabesTopNavProps {
  user: {
    id: string;
    email: string;
    name?: string | null;
    role: "SUPER_ADMIN" | "ADMIN_MABES";
  };
  onMenuClick: () => void;
}

const PAGE_TITLES: Record<string, string> = {
  "/mabes": "HQ Overview & Platform Health",
  "/mabes/tenants": "Tenant Storefront Management",
  "/mabes/billing": "Upgrade Orders & Billing Verifications",
  "/mabes/payouts": "Merchant Payouts & Fund Settlements",
  "/mabes/domains": "Custom Domain Mappings & DNS Routing",
  "/mabes/team": "Mabes Operators & Internal Staff",
  "/mabes/settings": "Rafa Kreasindo Global Platform Settings",
};

export function MabesTopNav({ user, onMenuClick }: MabesTopNavProps) {
  const pathname = usePathname();
  const [isLoggingOut, startLogout] = useTransition();

  const title =
    PAGE_TITLES[pathname] ||
    Object.entries(PAGE_TITLES).find(([key]) => key !== "/mabes" && pathname.startsWith(key))?.[1] ||
    "Mabes Console";

  const handleLogout = () => {
    startLogout(async () => {
      await actionMabesLogout();
    });
  };

  return (
    <header className="sticky top-0 z-30 h-14 bg-slate-900/90 border-b border-slate-800 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between text-white shrink-0">
      {/* Left: Mobile hamburger + Active Page Title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="md:hidden p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          aria-label="Open mobile menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">Mabes /</span>
          <h2 className="text-xs sm:text-sm font-bold tracking-tight text-white">
            {title}
          </h2>
        </div>
      </div>

      {/* Right: Role badge + User info + Logout */}
      <div className="flex items-center gap-3">
        {/* Role Badge */}
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border ${
            user.role === "SUPER_ADMIN"
              ? "bg-rose-500/10 text-rose-400 border-rose-500/30"
              : "bg-blue-500/10 text-blue-400 border-blue-500/30"
          }`}
        >
          <Shield className="w-3 h-3" />
          <span>{user.role}</span>
        </span>

        {/* User email (Desktop) */}
        <span className="text-xs text-slate-400 font-mono hidden lg:inline">
          {user.email}
        </span>

        {/* Logout Button */}
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-950/40 hover:text-rose-400 hover:border-rose-800/50 border border-slate-700/60 text-xs font-semibold text-slate-300 transition cursor-pointer disabled:opacity-50"
          title="Sign out of Mabes"
        >
          {isLoggingOut ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <LogOut className="w-3.5 h-3.5" />
          )}
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
