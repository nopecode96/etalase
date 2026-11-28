"use client";

import React, { useState, useTransition, useMemo } from "react";
import Link from "next/link";
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
  Calendar,
  RotateCcw,
  Filter,
} from "lucide-react";
import { actionUpdatePixels } from "@/app/admin/actions";
import { showToast } from "@/components/ui/GlobalToast";

interface AdminAnalyticsClientProps {
  store: any;
  tier: "FREE" | "PRO" | "DFY";
}

type DateRangeOption = "all" | "7d" | "30d" | "month" | "custom";

export function AdminAnalyticsClient({ store, tier }: AdminAnalyticsClientProps) {
  const isFree = tier === "FREE";
  const [isPending, startTransition] = useTransition();

  // Marketing Pixels State
  const [metaPixelId, setMetaPixelId] = useState(store.metaPixelId || "");
  const [metaCapiToken, setMetaCapiToken] = useState(store.metaCapiToken || "");
  const [tiktokPixelId, setTiktokPixelId] = useState(store.tiktokPixelId || "");
  const [gaMeasurementId, setGaMeasurementId] = useState(store.gaMeasurementId || "");

  // Date Filtering State
  const [dateFilter, setDateFilter] = useState<DateRangeOption>("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const rawProducts = store.products || [];
  const rawOrders = store.orders || [];

  // Filter Orders & Products by Date
  const { filteredOrders, filteredProducts, dateLabel } = useMemo(() => {
    const now = new Date();

    if (dateFilter === "all") {
      return {
        filteredOrders: rawOrders,
        filteredProducts: rawProducts,
        dateLabel: "Semua Waktu",
      };
    }

    let minDate: Date | null = null;
    let maxDate: Date | null = null;
    let label = "";

    if (dateFilter === "7d") {
      minDate = new Date();
      minDate.setDate(now.getDate() - 7);
      minDate.setHours(0, 0, 0, 0);
      label = "7 Hari Terakhir";
    } else if (dateFilter === "30d") {
      minDate = new Date();
      minDate.setDate(now.getDate() - 30);
      minDate.setHours(0, 0, 0, 0);
      label = "30 Hari Terakhir";
    } else if (dateFilter === "month") {
      minDate = new Date(now.getFullYear(), now.getMonth(), 1);
      minDate.setHours(0, 0, 0, 0);
      label = "Bulan Ini";
    } else if (dateFilter === "custom") {
      if (startDate) {
        minDate = new Date(startDate);
        minDate.setHours(0, 0, 0, 0);
      }
      if (endDate) {
        maxDate = new Date(endDate);
        maxDate.setHours(23, 59, 59, 999);
      }
      label = `${startDate || "Awal"} s/d ${endDate || "Sekarang"}`;
    }

    const oFiltered = rawOrders.filter((o: any) => {
      if (!o.createdAt) return true;
      const d = new Date(o.createdAt);
      if (minDate && d < minDate) return false;
      if (maxDate && d > maxDate) return false;
      return true;
    });

    const pFiltered = rawProducts.filter((p: any) => {
      if (!p.createdAt) return true;
      const d = new Date(p.createdAt);
      if (minDate && d < minDate) return false;
      if (maxDate && d > maxDate) return false;
      return true;
    });

    return {
      filteredOrders: oFiltered,
      filteredProducts: pFiltered,
      dateLabel: label,
    };
  }, [dateFilter, startDate, endDate, rawOrders, rawProducts]);

  // Aggregated Metrics
  const totalViews = useMemo(() => {
    // If user filtered by date, calculate views of products active/created in that period, or all products if "all"
    const targetProducts = dateFilter === "all" ? rawProducts : filteredProducts;
    return targetProducts.reduce((acc: number, p: any) => acc + (p.views || 0), 0);
  }, [dateFilter, rawProducts, filteredProducts]);

  const totalClicks = useMemo(() => {
    const targetProducts = dateFilter === "all" ? rawProducts : filteredProducts;
    return targetProducts.reduce((acc: number, p: any) => acc + (p.clicks || 0), 0);
  }, [dateFilter, rawProducts, filteredProducts]);

  const paidOrders = useMemo(() => {
    return filteredOrders.filter(
      (o: any) => o.status === "PAID" || o.status === "COMPLETED"
    );
  }, [filteredOrders]);

  const totalRevenue = useMemo(() => {
    return paidOrders.reduce((acc: number, o: any) => acc + Number(o.amount || 0), 0);
  }, [paidOrders]);

  const ctr = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : "0.0";
  const conversionRate = totalViews > 0 ? ((filteredOrders.length / totalViews) * 100).toFixed(1) : "0.0";

  // Handle Save Pixels
  const handleSavePixels = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFree) return;

    startTransition(async () => {
      const res = await actionUpdatePixels({
        storeId: store.id,
        metaPixelId,
        metaCapiToken,
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
    <div className="space-y-8 animate-fade-in w-full">
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

      {/* Date Filter Bar */}
      <div className="bg-white rounded-2xl border border-[#E7E5E4] p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#1C1917] flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#D94E28]" />
              <span>Filter Periode:</span>
            </span>
            <span className="text-xs text-[#78716C] bg-[#FAF8F5] px-2.5 py-0.5 rounded-full border border-[#E7E5E4] font-medium">
              {dateLabel}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-xl border border-[#E7E5E4] text-xs">
              <button
                type="button"
                onClick={() => setDateFilter("all")}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  dateFilter === "all"
                    ? "bg-white text-[#1C1917] font-bold shadow-2xs"
                    : "text-[#78716C] hover:text-[#1C1917]"
                }`}
              >
                Semua
              </button>
              <button
                type="button"
                onClick={() => setDateFilter("7d")}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  dateFilter === "7d"
                    ? "bg-white text-[#1C1917] font-bold shadow-2xs"
                    : "text-[#78716C] hover:text-[#1C1917]"
                }`}
              >
                7 Hari
              </button>
              <button
                type="button"
                onClick={() => setDateFilter("30d")}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  dateFilter === "30d"
                    ? "bg-white text-[#1C1917] font-bold shadow-2xs"
                    : "text-[#78716C] hover:text-[#1C1917]"
                }`}
              >
                30 Hari
              </button>
              <button
                type="button"
                onClick={() => setDateFilter("month")}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  dateFilter === "month"
                    ? "bg-white text-[#1C1917] font-bold shadow-2xs"
                    : "text-[#78716C] hover:text-[#1C1917]"
                }`}
              >
                Bulan Ini
              </button>
              <button
                type="button"
                onClick={() => setDateFilter("custom")}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  dateFilter === "custom"
                    ? "bg-white text-[#D94E28] font-bold shadow-2xs"
                    : "text-[#78716C] hover:text-[#1C1917]"
                }`}
              >
                Kustom
              </button>
            </div>

            {dateFilter !== "all" && (
              <button
                type="button"
                onClick={() => {
                  setDateFilter("all");
                  setStartDate("");
                  setEndDate("");
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-[#78716C] hover:text-stone-900 bg-stone-100 hover:bg-stone-200 transition"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {dateFilter === "custom" && (
          <div className="pt-2 border-t border-[#E7E5E4] flex flex-wrap items-center gap-3 text-xs">
            <span className="text-[#78716C] font-medium">Dari:</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-2.5 py-1 rounded-lg border border-[#E7E5E4] bg-white text-[#1C1917] outline-none focus:border-[#D94E28]"
            />
            <span className="text-[#78716C] font-medium">Sampai:</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-2.5 py-1 rounded-lg border border-[#E7E5E4] bg-white text-[#1C1917] outline-none focus:border-[#D94E28]"
            />
          </div>
        )}
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
            {filteredOrders.length}
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

        {rawProducts.length === 0 ? (
          <p className="text-xs text-[#78716C] py-4">No product data available yet.</p>
        ) : (
          <div className="divide-y divide-[#E7E5E4]">
            {rawProducts.slice(0, 5).map((p: any) => {
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
              {isFree && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                  <Lock className="w-3 h-3" />
                  <span>PRO Feature</span>
                </span>
              )}
            </div>
            <p className="text-xs text-[#57534E] mt-1">
              Fire standard PageView, ViewContent, InitiateCheckout, and Purchase events automatically.
            </p>
          </div>

          {isFree && (
            <Link
              href="/admin/billing"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#D94E28] text-white text-xs font-bold hover:bg-[#B83E1D] transition shadow-xs self-start sm:self-auto"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Upgrade to PRO</span>
            </Link>
          )}
        </div>

        {isFree ? (
          <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E4] text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-500 mx-auto flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h3 className="text-sm font-bold text-[#1C1917]">
                Unlock Server-Side Conversions &amp; Retargeting
              </h3>
              <p className="text-xs text-[#78716C] leading-relaxed">
                Track ad return on ad spend (ROAS) and retarget dropped checkouts with Meta Conversions API (CAPI), TikTok Events API, and Google Analytics 4.
              </p>
            </div>
            <Link
              href="/admin/billing"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D94E28] hover:bg-[#B83E1D] text-white text-xs font-bold transition shadow-xs"
            >
              <span>Unlock Pixel Tracking</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSavePixels} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Meta Pixel ID */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1C1917]">
                  Meta (Facebook) Pixel ID
                </label>
                <input
                  type="text"
                  placeholder="e.g. 123456789012345"
                  value={metaPixelId}
                  onChange={(e) => setMetaPixelId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E5E4] text-xs text-[#1C1917] font-mono bg-white focus:border-[#D94E28] outline-none transition"
                />
                <p className="text-[10px] text-[#78716C]">
                  Required for browser pixel tracking on your storefront.
                </p>
              </div>

              {/* TikTok Pixel ID */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1C1917]">
                  TikTok Pixel ID
                </label>
                <input
                  type="text"
                  placeholder="e.g. C5XXXXXXXXXXXXXX"
                  value={tiktokPixelId}
                  onChange={(e) => setTiktokPixelId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E5E4] text-xs text-[#1C1917] font-mono bg-white focus:border-[#D94E28] outline-none transition"
                />
                <p className="text-[10px] text-[#78716C]">
                  Fires TikTok Ads standard eCommerce events.
                </p>
              </div>

              {/* Google Analytics Measurement ID */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1C1917]">
                  Google Analytics 4 Measurement ID
                </label>
                <input
                  type="text"
                  placeholder="e.g. G-XXXXXXXXXX"
                  value={gaMeasurementId}
                  onChange={(e) => setGaMeasurementId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E5E4] text-xs text-[#1C1917] font-mono bg-white focus:border-[#D94E28] outline-none transition"
                />
                <p className="text-[10px] text-[#78716C]">
                  Tracks storefront traffic and conversion funnels in Google Analytics.
                </p>
              </div>

              {/* Meta CAPI Token */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1C1917]">
                  Meta Conversions API (CAPI) Access Token
                </label>
                <input
                  type="password"
                  placeholder="EAAG..."
                  value={metaCapiToken}
                  onChange={(e) => setMetaCapiToken(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E5E4] text-xs text-[#1C1917] font-mono bg-white focus:border-[#D94E28] outline-none transition"
                />
                <p className="text-[10px] text-[#78716C]">
                  Server-side tracking to bypass iOS 14+ and browser adblockers.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isPending}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D94E28] hover:bg-[#B83E1D] text-white text-xs font-bold transition shadow-xs disabled:opacity-50"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving Pixels...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Pixel Configurations</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
