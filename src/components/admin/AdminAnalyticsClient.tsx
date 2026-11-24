"use client";

import React, { useState, useTransition } from "react";
import {
  BarChart3,
  TrendingUp,
  Eye,
  MousePointerClick,
  ShoppingBag,
  Sparkles,
  Lock,
  Check,
  Save,
  Loader2,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";
import { actionUpdatePixels } from "@/app/admin/actions";
import { showToast } from "@/components/ui/GlobalToast";

interface AdminAnalyticsClientProps {
  store: any;
  tier: "FREE" | "PRO" | "DFY";
}

export function AdminAnalyticsClient({ store, tier }: AdminAnalyticsClientProps) {
  const isFree = tier === "FREE";
  const [isPending, startTransition] = useTransition();

  // Marketing Pixels State
  const [metaPixelId, setMetaPixelId] = useState(store.metaPixelId || "");
  const [tiktokPixelId, setTiktokPixelId] = useState(store.tiktokPixelId || "");
  const [gaMeasurementId, setGaMeasurementId] = useState(store.gaMeasurementId || "");

  // Analytics Aggregation
  const products = store.products || [];
  const totalViews = products.reduce((acc: number, p: any) => acc + (p.views || 0), 0);
  const totalClicks = products.reduce((acc: number, p: any) => acc + (p.clicks || 0), 0);
  const orders = store.orders || [];
  const paidOrders = orders.filter((o: any) => o.status === "PAID" || o.status === "COMPLETED");
  const totalRevenue = paidOrders.reduce((acc: number, o: any) => acc + Number(o.amount || 0), 0);

  const ctr = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : "0.0";
  const conversionRate = totalViews > 0 ? ((orders.length / totalViews) * 100).toFixed(1) : "0.0";

  // Handle Save Pixels
  const handleSavePixels = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFree) return;

    startTransition(async () => {
      const res = await actionUpdatePixels({
        storeId: store.id,
        metaPixelId,
        tiktokPixelId,
        gaMeasurementId,
      });

      if (res.success) {
        showToast("Marketing pixels saved successfully!", "success");
      } else {
        showToast(res.error || "Failed to update pixels", "error");
      }
    });
  };

  return (
    <div className="space-y-10 animate-fade-in w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#E7E5E4]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1917]">
            Analytics &amp; Pixel
          </h1>
          <p className="text-xs sm:text-sm text-[#57534E] mt-1">
            Storefront conversion metrics and advertising pixel integrations for Meta, TikTok &amp; GA4.
          </p>
        </div>

        <span
          className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto ${
            isFree
              ? "bg-stone-200 text-stone-700"
              : "bg-[#FDF0EC] text-[#D94E28] border border-[#FADCD3]"
          }`}
        >
          {tier} Plan Tracking
        </span>
      </div>

      {/* 1. Core Conversion Metrics */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E7E5E4] shadow-xs">
          <div className="flex items-center justify-between text-[#78716C] mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Total Impressions</span>
            <Eye className="w-4 h-4 text-[#D94E28]" />
          </div>
          <p className="text-2xl font-bold text-[#1C1917]">
            {totalViews.toLocaleString("id-ID")}
          </p>
          <p className="text-[11px] text-[#78716C] mt-1">Catalog and block pageviews</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E7E5E4] shadow-xs">
          <div className="flex items-center justify-between text-[#78716C] mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Intent Clicks</span>
            <MousePointerClick className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-[#1C1917]">
            {totalClicks.toLocaleString("id-ID")}
          </p>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">
            {ctr}% Click-Through Rate
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E7E5E4] shadow-xs">
          <div className="flex items-center justify-between text-[#78716C] mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Total Checkouts</span>
            <ShoppingBag className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-[#1C1917]">
            {orders.length}
          </p>
          <p className="text-[11px] text-[#78716C] mt-1">
            {conversionRate}% Store Conversion
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E7E5E4] shadow-xs">
          <div className="flex items-center justify-between text-[#78716C] mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Paid Revenue</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-emerald-700">
            Rp {totalRevenue.toLocaleString("id-ID")}
          </p>
          <p className="text-[11px] text-[#78716C] mt-1">
            {paidOrders.length} completed transactions
          </p>
        </div>
      </section>

      {/* 2. Top-Performing Products Traffic Breakdown */}
      <section className="bg-white rounded-3xl border border-[#E7E5E4] shadow-xs p-6 space-y-4">
        <div>
          <h2 className="text-base font-bold text-[#1C1917]">
            Product Conversion Funnel
          </h2>
          <p className="text-xs text-[#57534E]">
            Products ranked by views and customer purchase intent clicks.
          </p>
        </div>

        {products.length === 0 ? (
          <p className="text-xs text-[#78716C] py-4">No product data available yet.</p>
        ) : (
          <div className="divide-y divide-[#E7E5E4]">
            {products.slice(0, 5).map((p: any) => {
              const productCtr =
                p.views > 0 ? (((p.clicks || 0) / p.views) * 100).toFixed(1) : "0.0";
              const percentBar = totalViews > 0 ? Math.round(((p.views || 0) / totalViews) * 100) : 0;

              return (
                <div key={p.id} className="py-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#1C1917] truncate max-w-sm">
                      {p.title}
                    </span>
                    <div className="flex items-center gap-4 text-right">
                      <span className="text-stone-500">{p.views || 0} views</span>
                      <span className="font-semibold text-[#1C1917]">{p.clicks || 0} clicks</span>
                      <span className="font-bold text-emerald-600 w-16 text-right">
                        {productCtr}% CTR
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#D94E28] h-full rounded-full"
                      style={{ width: `${percentBar}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 3. Marketing Pixels & Tracking Gated Section */}
      <section className="bg-white rounded-3xl border border-[#E7E5E4] shadow-xs p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E7E5E4]">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-[#1C1917]">
                Marketing Pixels &amp; Ad Retargeting
              </h2>
              {isFree ? (
                <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FDF0EC] text-[#D94E28] border border-[#FADCD3]">
                  <Lock className="w-3 h-3" />
                  <span>PRO Feature</span>
                </span>
              ) : (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                  Active
                </span>
              )}
            </div>
            <p className="text-xs text-[#57534E] mt-0.5">
              Inject Meta Pixel (Facebook &amp; Instagram), TikTok Pixel, and Google Analytics 4 tracking.
            </p>
          </div>
        </div>

        {isFree ? (
          /* FREE Plan Lock Card */
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#FAF8F5] to-white border border-[#FADCD3] text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FDF0EC] text-[#D94E28] flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>

            <div className="max-w-md mx-auto">
              <h3 className="text-sm font-bold text-[#1C1917]">
                Unlock Pixel Tracking on PRO
              </h3>
              <p className="text-xs text-[#57534E] mt-1 leading-relaxed">
                Ad pixels let you track <em>ViewContent</em>, <em>InitiateCheckout</em>, and <em>Purchase</em> events to build high-ROAS Lookalike and Retargeting audiences on TikTok and Meta Ads.
              </p>
            </div>

            <a
              href="/pricing"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D94E28] hover:bg-[#B83E1D] text-white text-xs font-bold shadow-xs transition"
            >
              <span>Upgrade to PRO (Rp 49.000/mo)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ) : (
          /* PRO / DFY Pixel Input Form */
          <form onSubmit={handleSavePixels} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Meta Pixel */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#1C1917]">
                  Meta Pixel ID (Facebook / IG Ads)
                </label>
                <input
                  type="text"
                  value={metaPixelId}
                  onChange={(e) => setMetaPixelId(e.target.value)}
                  placeholder="e.g. 123456789012345"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E7E5E4] font-mono"
                />
                <p className="text-[10px] text-[#78716C]">
                  Find in Meta Events Manager &gt; Data Sources.
                </p>
              </div>

              {/* TikTok Pixel */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#1C1917]">
                  TikTok Pixel ID
                </label>
                <input
                  type="text"
                  value={tiktokPixelId}
                  onChange={(e) => setTiktokPixelId(e.target.value)}
                  placeholder="e.g. C1234567890ABCDEF"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E7E5E4] font-mono"
                />
                <p className="text-[10px] text-[#78716C]">
                  Find in TikTok Ads Manager &gt; Assets &gt; Events.
                </p>
              </div>

              {/* GA4 ID */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#1C1917]">
                  Google Analytics 4 (GA4) ID
                </label>
                <input
                  type="text"
                  value={gaMeasurementId}
                  onChange={(e) => setGaMeasurementId(e.target.value)}
                  placeholder="e.g. G-XXXXXXXXXX"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E7E5E4] font-mono"
                />
                <p className="text-[10px] text-[#78716C]">
                  Measurement ID starting with G-.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isPending}
                className="px-5 py-2.5 rounded-xl bg-[#D94E28] hover:bg-[#B83E1D] text-white text-xs font-bold shadow-xs transition flex items-center gap-2 disabled:opacity-50"
              >
                {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                <span>Save Pixel Configuration</span>
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
