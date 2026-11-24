"use client";

import React from "react";
import Link from "next/link";
import {
  Eye,
  MousePointerClick,
  ShoppingBag,
  Wallet,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Circle,
  ExternalLink,
  Plus,
  Palette,
  ShieldCheck,
  TrendingUp,
  Clock,
  ArrowRight,
} from "lucide-react";
import { StoreSetupChecklist } from "./StoreSetupChecklist";

interface AdminOverviewClientProps {
  store: any;
  tier: "FREE" | "PRO" | "DFY";
  rules: any;
  monthlyWithdrawalsCount: number;
  remainingFreeWithdrawals: number;
}

export function AdminOverviewClient({
  store,
  tier,
  rules,
  monthlyWithdrawalsCount,
  remainingFreeWithdrawals,
}: AdminOverviewClientProps) {
  const isFree = tier === "FREE";

  // Calculate total views and clicks from products
  const products = store.products || [];
  const totalViews = products.reduce((acc: number, p: any) => acc + (p.views || 0), 0);
  const totalClicks = products.reduce((acc: number, p: any) => acc + (p.clicks || 0), 0);
  const ctr = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : "0.0";

  // Orders breakdown
  const orders = store.orders || [];
  const paidOrders = orders.filter((o: any) => o.status === "PAID" || o.status === "COMPLETED");
  const pendingOrders = orders.filter((o: any) => o.status === "PENDING");
  const totalOrderRevenue = paidOrders.reduce((acc: number, o: any) => acc + Number(o.amount || 0), 0);

  // Balance
  const walletBalance = Number(store.walletBalance || 0);

  // Onboarding Checklist
  const hasWhatsapp = Boolean(store.chatHandle && store.chatHandle.trim());
  const hasProducts = products.length > 0;
  const hasCustomized = Boolean(store.templateId !== "clean-minimal" || store.bannerUrl || store.avatarUrl);
  const checklistItems = [
    {
      title: "Configure Store WhatsApp Handle",
      desc: "Needed for 0% commission direct chat orders.",
      completed: hasWhatsapp,
      href: "/admin/settings",
    },
    {
      title: "Add Your First Product or Offer",
      desc: "Publish digital files, physical catalog items, or services.",
      completed: hasProducts,
      href: "/admin/products",
    },
    {
      title: "Customize Storefront Archetype",
      desc: "Pick your layout archetype, accent color, and banners.",
      completed: hasCustomized,
      href: "/admin/storefront",
    },
    {
      title: "Verify Fee Bearer Guardrail",
      desc: "Customer convenience fee is active to protect 100% profit.",
      completed: store.feeBorneBy === "CUSTOMER",
      href: "/admin/orders",
    },
  ];

  const completedCount = checklistItems.filter((item) => item.completed).length;
  const progressPercent = Math.round((completedCount / checklistItems.length) * 100);

  return (
    <div className="space-y-8 animate-fade-in w-full">
      {/* 1. Header Greeting & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1917]">
              Overview
            </h1>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                isFree
                  ? "bg-stone-200 text-stone-700"
                  : tier === "PRO"
                  ? "bg-[#FDF0EC] text-[#D94E28] border border-[#FADCD3]"
                  : "bg-purple-100 text-purple-700 border border-purple-200"
              }`}
            >
              {tier} Plan
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#57534E] mt-1">
            Welcome back to <strong>{store.name}</strong>. Real-time store performance &amp; sales overview.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/products"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#D94E28] hover:bg-[#B83E1D] text-white text-xs font-semibold shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </Link>
          <a
            href={`/${store.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#E7E5E4] hover:bg-[#FAF8F5] text-xs font-semibold text-[#1C1917] transition shadow-2xs"
          >
            <span>Live Store</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#78716C]" />
          </a>
        </div>
      </div>

      {/* 2. Four Key Performance Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Views & Clicks */}
        <div className="bg-white p-5 rounded-2xl border border-[#E7E5E4] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#78716C]">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Traffic</span>
            <div className="w-8 h-8 rounded-xl bg-[#FAF8F5] flex items-center justify-center text-[#D94E28]">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold tracking-tight text-[#1C1917]">
              {totalViews.toLocaleString("id-ID")}
            </p>
            <div className="flex items-center justify-between text-xs text-[#57534E] mt-1.5">
              <span>{totalClicks} product clicks</span>
              <span className="font-semibold text-emerald-600">{ctr}% CTR</span>
            </div>
          </div>
        </div>

        {/* Card 2: Total Orders */}
        <div className="bg-white p-5 rounded-2xl border border-[#E7E5E4] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#78716C]">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Orders</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold tracking-tight text-[#1C1917]">
              {orders.length}
            </p>
            <div className="flex items-center justify-between text-xs text-[#57534E] mt-1.5">
              <span className="text-emerald-600 font-medium">{paidOrders.length} Completed</span>
              <span className="text-amber-600">{pendingOrders.length} Pending</span>
            </div>
          </div>
        </div>

        {/* Card 3: Available Balance */}
        <div className="bg-white p-5 rounded-2xl border border-[#E7E5E4] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#78716C]">
            <span className="text-xs font-semibold uppercase tracking-wider">Available Balance</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold tracking-tight text-[#1C1917]">
              Rp {walletBalance.toLocaleString("id-ID")}
            </p>
            <div className="flex items-center justify-between text-xs mt-1.5">
              <span className="text-[#57534E]">
                {isFree ? "Rp 5.000 payout fee" : `${remainingFreeWithdrawals}/4 Free Payouts`}
              </span>
              <Link
                href="/admin/orders"
                className="font-semibold text-[#D94E28] hover:underline"
              >
                Withdraw ↗
              </Link>
            </div>
          </div>
        </div>

        {/* Card 4: Plan & BorderPay Margin Guard */}
        <div className="bg-white p-5 rounded-2xl border border-[#E7E5E4] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#78716C]">
            <span className="text-xs font-semibold uppercase tracking-wider">Margin Guard</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold tracking-tight text-[#1C1917]">
              {store.feeBorneBy === "CUSTOMER" ? "100% Intact" : "Absorbed"}
            </p>
            <div className="flex items-center justify-between text-xs text-[#57534E] mt-1.5">
              <span>0% Chat commission</span>
              <span className="font-semibold text-[#D94E28]">{rules.directCheckoutFeePercent}% QRIS</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Database-Driven Store Setup Checklist */}
      <StoreSetupChecklist store={store} />

      {/* 4. Bottom Grid: Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders Table */}
        <div className="bg-white rounded-3xl border border-[#E7E5E4] shadow-xs p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4]">
              <div>
                <h3 className="text-sm font-bold text-[#1C1917]">Recent Orders</h3>
                <p className="text-xs text-[#78716C]">Latest transactions from your storefront</p>
              </div>
              <Link
                href="/admin/orders"
                className="text-xs font-semibold text-[#D94E28] hover:underline"
              >
                View all ({orders.length}) →
              </Link>
            </div>

            <div className="divide-y divide-[#E7E5E4]/60 mt-2">
              {orders.length === 0 ? (
                <div className="py-8 text-center text-xs text-[#78716C]">
                  No orders yet. Share your store link on WhatsApp bio to get your first customer!
                </div>
              ) : (
                orders.slice(0, 5).map((order: any) => (
                  <div key={order.id} className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-[#1C1917] truncate">
                        {order.buyerName || "Customer"}
                      </p>
                      <p className="text-[11px] text-[#78716C]">
                        {order.product?.title || "Store Item"} &bull;{" "}
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-[#1C1917]">
                        Rp {Number(order.amount).toLocaleString("id-ID")}
                      </p>
                      <span
                        className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          order.status === "PAID" || order.status === "COMPLETED"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Top Performing Products */}
        <div className="bg-white rounded-3xl border border-[#E7E5E4] shadow-xs p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4]">
              <div>
                <h3 className="text-sm font-bold text-[#1C1917]">Top Catalog Products</h3>
                <p className="text-xs text-[#78716C]">Products with the highest traffic &amp; clicks</p>
              </div>
              <Link
                href="/admin/products"
                className="text-xs font-semibold text-[#D94E28] hover:underline"
              >
                Manage ({products.length}) →
              </Link>
            </div>

            <div className="divide-y divide-[#E7E5E4]/60 mt-2">
              {products.length === 0 ? (
                <div className="py-8 text-center text-xs text-[#78716C]">
                  No products added yet. Click &quot;Add Product&quot; to begin selling!
                </div>
              ) : (
                products.slice(0, 5).map((product: any) => (
                  <div key={product.id} className="py-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      {product.images && product.images[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-9 h-9 rounded-xl object-cover border border-[#E7E5E4]"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-xl bg-stone-100 flex items-center justify-center text-[#78716C] font-bold text-xs">
                          📦
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="font-semibold text-[#1C1917] truncate max-w-[180px]">
                          {product.title}
                        </p>
                        <p className="text-[11px] text-[#78716C]">
                          {product.category || "General"} &bull;{" "}
                          <span className="font-medium text-[#1C1917]">
                            Rp {Number(product.price).toLocaleString("id-ID")}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-[#1C1917]">
                        {product.clicks || 0} <span className="font-normal text-[11px] text-[#78716C]">clicks</span>
                      </p>
                      <p className="text-[10px] text-stone-500">
                        {product.views || 0} views
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
