"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Store,
  ExternalLink,
  Shield,
  Sparkles,
  Check,
  X,
  Phone,
  Mail,
  Calendar,
  AlertCircle,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Globe,
  Send,
  Power,
  Clock,
} from "lucide-react";
import { actionUpdateTenantStatus, actionUpdateTenantTier } from "@/app/mabes/actions";
import { showToast } from "@/components/ui/GlobalToast";
import { formatDate } from "@/lib/core/formatters";

interface TenantItem {
  id: string;
  name: string;
  slug: string;
  customDomain?: string | null;
  domainVerified: boolean;
  tier: "FREE" | "PRO" | "DFY_BUSINESS";
  planExpiresAt?: string | null;
  isActive: boolean;
  isDemo: boolean;
  chatHandle?: string | null;
  createdAt: string;
  owner: {
    name?: string | null;
    email: string;
  };
  _count: {
    products: number;
    orders: number;
  };
}

interface MabesTenantsClientProps {
  initialTenants: TenantItem[];
}

export function MabesTenantsClient({ initialTenants }: MabesTenantsClientProps) {
  const [tenants, setTenants] = useState<TenantItem[]>(initialTenants);
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState<string>("ALL");
  const [selectedTenant, setSelectedTenant] = useState<TenantItem | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [isPending, startTransition] = useTransition();

  // Filtered tenants
  const filtered = tenants.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.slug.toLowerCase().includes(search.toLowerCase()) ||
      t.owner.email.toLowerCase().includes(search.toLowerCase()) ||
      (t.customDomain && t.customDomain.toLowerCase().includes(search.toLowerCase()));

    const matchesTier =
      tierFilter === "ALL" ||
      (tierFilter === "DFY" ? t.tier === "DFY_BUSINESS" : t.tier === tierFilter);

    return matchesSearch && matchesTier;
  });

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleToggleStatus = (storeId: string, currentStatus: boolean) => {
    startTransition(async () => {
      const nextStatus = !currentStatus;
      const res = await actionUpdateTenantStatus(storeId, nextStatus);
      if (res.success) {
        setTenants((prev) =>
          prev.map((t) => (t.id === storeId ? { ...t, isActive: nextStatus } : t))
        );
        if (selectedTenant && selectedTenant.id === storeId) {
          setSelectedTenant({ ...selectedTenant, isActive: nextStatus });
        }
        showToast(`Tenant status updated to ${nextStatus ? "Active" : "Suspended"}`, "success");
      } else {
        showToast(res.error || "Failed to update status", "error");
      }
    });
  };

  const handleUpdateTier = (
    storeId: string,
    tier: "FREE" | "PRO" | "DFY_BUSINESS",
    extendDays?: number
  ) => {
    startTransition(async () => {
      const res = await actionUpdateTenantTier(storeId, tier, extendDays);
      if (res.success) {
        const updated = res.data as any;
        setTenants((prev) =>
          prev.map((t) =>
            t.id === storeId
              ? { ...t, tier: updated.tier, planExpiresAt: updated.planExpiresAt }
              : t
          )
        );
        if (selectedTenant && selectedTenant.id === storeId) {
          setSelectedTenant({
            ...selectedTenant,
            tier: updated.tier,
            planExpiresAt: updated.planExpiresAt,
          });
        }
        showToast(`Store tier upgraded to ${tier}!`, "success");
      } else {
        showToast(res.error || "Failed to update plan tier", "error");
      }
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Controls: Search + Tier Filter */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by store name, slug, email, domain..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition font-mono"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <select
            value={tierFilter}
            onChange={(e) => {
              setTierFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full sm:w-44 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold text-slate-200 focus:outline-none focus:border-rose-500 cursor-pointer"
          >
            <option value="ALL">All Tiers ({tenants.length})</option>
            <option value="FREE">FREE Forever</option>
            <option value="PRO">PRO Plan</option>
            <option value="DFY">Terima Beres (DFY)</option>
          </select>
        </div>
      </div>

      {/* Master Table (Max 6 Columns) */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase">
            Showing {paginated.length} of {filtered.length} Tenants
          </span>
          <span className="text-[11px] text-slate-500 font-mono">
            Click &apos;Manage&apos; to toggle status or adjust plan tiers
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                <th className="pb-3 pl-2">Store &amp; Owner</th>
                <th className="pb-3">Tier</th>
                <th className="pb-3">Status &amp; Validity</th>
                <th className="pb-3">Catalog &amp; Orders</th>
                <th className="pb-3">Channels</th>
                <th className="pb-3 pr-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500 text-xs">
                    No matching tenants found.
                  </td>
                </tr>
              ) : (
                paginated.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-800/30 transition">
                    {/* 1. Store & Owner */}
                    <td className="py-3.5 pl-2">
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <span>{t.name}</span>
                        {t.customDomain && (
                          <span
                            className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20"
                            title={t.customDomain}
                          >
                            Custom Domain
                          </span>
                        )}
                      </div>
                      <div className="text-slate-400 font-mono text-[11px]">
                        {t.slug}.etalase.online
                      </div>
                      <div className="text-slate-500 text-[10px] truncate max-w-[200px]">
                        {t.owner.email}
                      </div>
                    </td>

                    {/* 2. Tier Badge */}
                    <td className="py-3.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase tracking-wider ${
                          t.tier === "PRO"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : t.tier === "DFY_BUSINESS"
                            ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                            : "bg-slate-800 text-slate-400 border border-slate-700/60"
                        }`}
                      >
                        {t.tier === "DFY_BUSINESS" ? "DFY" : t.tier}
                      </span>
                    </td>

                    {/* 3. Status & Expiry */}
                    <td className="py-3.5">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            t.isActive ? "bg-emerald-400" : "bg-rose-500"
                          }`}
                        />
                        <span className="font-semibold text-slate-200">
                          {t.isActive ? "Active" : "Suspended"}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                        {t.planExpiresAt ? formatDate(t.planExpiresAt) : "Lifetime / No Exp"}
                      </div>
                    </td>

                    {/* 4. Products & Orders */}
                    <td className="py-3.5 text-slate-300">
                      <div>
                        <span className="font-bold text-white">{t._count.products}</span> products
                      </div>
                      <div className="text-[11px] text-slate-500">
                        <span className="font-semibold text-slate-400">{t._count.orders}</span> orders
                      </div>
                    </td>

                    {/* 5. Channel Info */}
                    <td className="py-3.5 text-slate-400 text-[11px] font-mono">
                      {t.chatHandle ? (
                        <div className="text-emerald-400 flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          <span>{t.chatHandle}</span>
                        </div>
                      ) : (
                        <span className="text-slate-600">No WA set</span>
                      )}
                    </td>

                    {/* 6. Action */}
                    <td className="py-3.5 pr-2 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedTenant(t)}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-600/20 hover:text-rose-400 hover:border-rose-500/30 text-slate-300 text-xs font-bold transition border border-slate-700/60 cursor-pointer"
                      >
                        Manage &rarr;
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Clean Pagination Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-400">
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 transition cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Slide-Over Detail Drawer (Right side) */}
      {selectedTenant && (
        <div className="fixed inset-0 z-50 animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setSelectedTenant(null)}
          />

          <div className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto space-y-6">
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold">
                    Tenant Control Panel
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5 truncate">
                    {selectedTenant.name}
                  </h3>
                  <div className="text-xs text-slate-400 font-mono">
                    {selectedTenant.slug}.etalase.online
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedTenant(null)}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Status Section */}
              <div className="py-5 space-y-5">
                {/* 1. Toggle Storefront Status */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Storefront Status
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {selectedTenant.isActive
                        ? "Storefront is live and accepting orders"
                        : "Storefront is suspended from public access"}
                    </span>
                  </div>
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() =>
                      handleToggleStatus(selectedTenant.id, selectedTenant.isActive)
                    }
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      selectedTenant.isActive
                        ? "bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500/20"
                        : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20"
                    }`}
                  >
                    <Power className="w-3.5 h-3.5" />
                    <span>{selectedTenant.isActive ? "Suspend" : "Activate"}</span>
                  </button>
                </div>

                {/* 2. Subscription Plan Tier Change */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 block">
                    Change Subscription Tier
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["FREE", "PRO", "DFY_BUSINESS"] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        disabled={isPending || selectedTenant.tier === t}
                        onClick={() => handleUpdateTier(selectedTenant.id, t)}
                        className={`py-2 px-2.5 rounded-xl text-xs font-bold transition border cursor-pointer ${
                          selectedTenant.tier === t
                            ? "bg-rose-600 text-white border-rose-500 shadow-sm"
                            : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white"
                        }`}
                      >
                        {t === "DFY_BUSINESS" ? "DFY" : t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Extend Active Period */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 block">
                    Extend Active Validity Period
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() =>
                        handleUpdateTier(selectedTenant.id, selectedTenant.tier, 30)
                      }
                      className="py-2 px-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold transition"
                    >
                      +30 Days
                    </button>
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() =>
                        handleUpdateTier(selectedTenant.id, selectedTenant.tier, 365)
                      }
                      className="py-2 px-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold transition"
                    >
                      +365 Days
                    </button>
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() =>
                        handleUpdateTier(selectedTenant.id, selectedTenant.tier, -1)
                      }
                      className="py-2 px-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold transition"
                    >
                      Lifetime
                    </button>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono mt-1">
                    Current Expiry:{" "}
                    {selectedTenant.planExpiresAt
                      ? formatDate(selectedTenant.planExpiresAt)
                      : "Never (No Expiry Date)"}
                  </div>
                </div>

                {/* 4. Owner & Store Info Details */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-400 pb-1.5 border-b border-slate-800/80">
                    <span>Owner Email:</span>
                    <span className="font-mono text-white">{selectedTenant.owner.email}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400 pb-1.5 border-b border-slate-800/80">
                    <span>Registered Date:</span>
                    <span className="font-mono text-white">{formatDate(selectedTenant.createdAt)}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400 pb-1.5 border-b border-slate-800/80">
                    <span>Custom Domain:</span>
                    <span className="font-mono text-white">
                      {selectedTenant.customDomain || "None"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Total Products:</span>
                    <span className="font-bold text-white">{selectedTenant._count.products} items</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Shortcut Actions */}
            <div className="pt-4 border-t border-slate-800 space-y-2">
              <a
                href={`https://${selectedTenant.slug}.etalase.online`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Visit Live Storefront</span>
              </a>

              {selectedTenant.chatHandle && (
                <a
                  href={`https://wa.me/${selectedTenant.chatHandle.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 text-xs font-bold transition flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Contact Owner via WhatsApp</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
