import React from "react";
import Link from "next/link";
import {
  Store,
  DollarSign,
  Users,
  CreditCard,
  Wallet,
  ShoppingBag,
  Activity,
  ArrowRight,
  ExternalLink,
  ShieldAlert,
  Clock,
  Sparkles,
  Server,
  Send,
} from "lucide-react";
import { prisma, serializePlain } from "@/lib/db/prisma";
import { requireMabesContext } from "@/lib/auth/mabes-guard";
import { formatCurrency, formatDate } from "@/lib/core/formatters";

export const dynamic = "force-dynamic";

export default async function MabesOverviewPage() {
  await requireMabesContext();

  // Run parallel database queries for real-time overview metrics
  const [
    totalTenants,
    activeTenants,
    suspendedTenants,
    freeTenants,
    proTenants,
    dfyTenants,
    totalProducts,
    pendingBillingCount,
    pendingPayoutCount,
    recentTenants,
    telegramSetting,
  ] = await Promise.all([
    prisma.store.count({ where: { isDemo: false } }),
    prisma.store.count({ where: { isDemo: false, isActive: true } }),
    prisma.store.count({ where: { isDemo: false, isActive: false } }),
    prisma.store.count({ where: { isDemo: false, tier: "FREE" } }),
    prisma.store.count({ where: { isDemo: false, tier: "PRO" } }),
    prisma.store.count({ where: { isDemo: false, tier: "DFY_BUSINESS" } }),
    prisma.product.count(),
    prisma.planOrder.count({
      where: { status: { in: ["PENDING", "UNDER_REVIEW"] } },
    }),
    prisma.withdrawal.count({
      where: { status: "PENDING" },
    }),
    prisma.store.findMany({
      where: { isDemo: false },
      take: 6,
      orderBy: { createdAt: "desc" },
      include: {
        owner: {
          select: { email: true, name: true },
        },
        _count: {
          select: { products: true, orders: true },
        },
      },
    }),
    prisma.platformSetting.findUnique({
      where: { key: "telegram_mabes_chat_id" },
    }),
  ]);

  // Calculate MRR estimate based on real PRO and DFY subscribers
  // PRO: Rp 49,000/mo avg, DFY: amortized ~Rp 75,000/mo
  const estimatedMRR = proTenants * 49000 + dfyTenants * 75000;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400">
              Operations Center
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
            Mabes Platform Overview
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time analytics and mission-critical controls for PT Rafa Kreasindo Teknologi.
          </p>
        </div>

        {/* Quick Health Signals */}
        <div className="flex items-center gap-2.5">
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 text-xs">
            <Server className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-400">PostgreSQL:</span>
            <span className="font-bold text-emerald-400">Healthy</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 text-xs">
            <Send className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-slate-400">Telegram Bot:</span>
            <span className="font-bold text-blue-400">
              {telegramSetting?.value ? "Configured" : "Unset"}
            </span>
          </div>
        </div>
      </div>

      {/* Top Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Tenants */}
        <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Tenants
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
              <Store className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white tracking-tight">
              {totalTenants}
            </div>
            <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
              <span className="text-emerald-400 font-bold">{activeTenants} Active</span>
              <span>&bull;</span>
              <span className="text-slate-500">{suspendedTenants} Suspended</span>
            </div>
          </div>
        </div>

        {/* Card 2: Estimated MRR */}
        <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Estimated MRR
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-emerald-400 tracking-tight">
              {formatCurrency(estimatedMRR, "IDR", "id")}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Active subscriptions recurring monthly
            </div>
          </div>
        </div>

        {/* Card 3: Pending Billing Approvals */}
        <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Billing Queue
            </span>
            <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center border border-rose-500/20">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white tracking-tight flex items-baseline gap-2">
              <span>{pendingBillingCount}</span>
              {pendingBillingCount > 0 && (
                <span className="text-xs font-bold text-rose-400">Action Required</span>
              )}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Pending plan upgrade requests
            </div>
          </div>
        </div>

        {/* Card 4: Pending Payouts */}
        <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Payout Requests
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white tracking-tight flex items-baseline gap-2">
              <span>{pendingPayoutCount}</span>
              {pendingPayoutCount > 0 && (
                <span className="text-xs font-bold text-amber-400">In Queue</span>
              )}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Merchant wallet withdrawal claims
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Tier Breakdown Bar */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-rose-500" />
            <span>Storefront Tier Distribution</span>
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            Catalog: {totalProducts} items live
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-400">FREE Forever</span>
              <div className="text-xl font-extrabold text-white mt-0.5">{freeTenants}</div>
            </div>
            <span className="text-xs font-mono font-bold text-slate-400 bg-slate-800 px-2 py-1 rounded-lg">
              0% Fee Chat
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-emerald-400">PRO Plan</span>
              <div className="text-xl font-extrabold text-emerald-400 mt-0.5">{proTenants}</div>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-2 py-1 rounded-lg">
              2% Low QRIS
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-purple-400">Terima Beres (DFY)</span>
              <div className="text-xl font-extrabold text-purple-400 mt-0.5">{dfyTenants}</div>
            </div>
            <span className="text-xs font-mono font-bold text-purple-400 bg-purple-950/40 border border-purple-800/50 px-2 py-1 rounded-lg">
              VIP Setup
            </span>
          </div>
        </div>
      </div>

      {/* Recent Registered Tenants Table */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Latest Registered Tenants</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Live stores created on etalase.online infrastructure.
            </p>
          </div>
          <Link
            href="/mabes/tenants"
            className="text-xs font-bold text-rose-400 hover:text-rose-300 inline-flex items-center gap-1 transition"
          >
            <span>View All Tenants</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase">
                <th className="pb-3 pl-2">Store Details</th>
                <th className="pb-3">Owner Account</th>
                <th className="pb-3">Tier</th>
                <th className="pb-3">Catalog</th>
                <th className="pb-3">Registered</th>
                <th className="pb-3 pr-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {recentTenants.map((t) => (
                <tr key={t.id} className="hover:bg-slate-800/30 transition">
                  <td className="py-3.5 pl-2">
                    <div className="font-bold text-white">{t.name}</div>
                    <div className="text-slate-400 font-mono text-[11px]">
                      {t.slug}.etalase.online
                    </div>
                  </td>
                  <td className="py-3.5 text-slate-300 font-mono text-[11px]">
                    {t.owner?.email || "Unknown"}
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase tracking-wider ${
                        t.tier === "PRO"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : t.tier === "DFY_BUSINESS"
                          ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {t.tier === "DFY_BUSINESS" ? "DFY" : t.tier}
                    </span>
                  </td>
                  <td className="py-3.5 text-slate-400">
                    <span className="font-semibold text-white">{t._count.products}</span> products
                  </td>
                  <td className="py-3.5 text-slate-400 font-mono text-[11px]">
                    {formatDate(t.createdAt)}
                  </td>
                  <td className="py-3.5 pr-2 text-right">
                    <div className="inline-flex items-center gap-2">
                      <a
                        href={`https://${t.slug}.etalase.online`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                        title="Open Live Storefront"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <Link
                        href={`/mabes/tenants?search=${encodeURIComponent(t.slug)}`}
                        className="px-2.5 py-1 rounded-lg bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 border border-rose-500/20 text-[11px] font-bold transition"
                      >
                        Manage &rarr;
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
