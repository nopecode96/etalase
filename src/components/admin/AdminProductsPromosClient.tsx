"use client";

import React, { useState, useTransition, useMemo } from "react";
import Link from "next/link";
import {
  Zap,
  Tag,
  Clock,
  Check,
  Save,
  Loader2,
  AlertCircle,
  TrendingDown,
  Plus,
  ArrowRight,
  Eye,
  MousePointerClick,
  Calendar,
  Filter,
  Search,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { actionToggleProductPromo } from "@/app/admin/actions";
import { showToast } from "@/components/ui/GlobalToast";
import { AdminPagination } from "@/components/admin/AdminPagination";

interface AdminProductsPromosClientProps {
  store: any;
  tier: "FREE" | "PRO" | "DFY";
}

type DateFilterOption = "all" | "7d" | "30d" | "month" | "custom";
type StatusFilterOption = "all" | "active" | "inactive";

export function AdminProductsPromosClient({ store }: AdminProductsPromosClientProps) {
  const [products, setProducts] = useState<any[]>(store.products || []);
  const [draftPrices, setDraftPrices] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();

  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState<DateFilterOption>("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilterOption>("all");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Aggregate metrics across active promos & all products
  const activePromoProducts = useMemo(() => {
    return products.filter(
      (p) => p.compareAtPrice && Number(p.compareAtPrice) > Number(p.price)
    );
  }, [products]);

  const activePromoCount = activePromoProducts.length;

  const promoViews = useMemo(() => {
    return activePromoProducts.reduce((acc, p) => acc + (p.views || 0), 0);
  }, [activePromoProducts]);

  const promoClicks = useMemo(() => {
    return activePromoProducts.reduce((acc, p) => acc + (p.clicks || 0), 0);
  }, [activePromoProducts]);

  const promoCtr = promoViews > 0 ? ((promoClicks / promoViews) * 100).toFixed(1) : "0.0";

  const avgDiscount = useMemo(() => {
    if (activePromoProducts.length === 0) return 0;
    const totalDisc = activePromoProducts.reduce((acc, p) => {
      const reg = Number(p.compareAtPrice);
      const cur = Number(p.price);
      return reg > cur ? acc + ((reg - cur) / reg) * 100 : acc;
    }, 0);
    return Math.round(totalDisc / activePromoProducts.length);
  }, [activePromoProducts]);

  // Date filtering logic
  const now = new Date();
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. Promo Status Filter
      const isPromoActive =
        product.compareAtPrice && Number(product.compareAtPrice) > Number(product.price);
      if (statusFilter === "active" && !isPromoActive) return false;
      if (statusFilter === "inactive" && isPromoActive) return false;

      // 2. Search Query Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const titleMatch = (product.title || "").toLowerCase().includes(query);
        const categoryMatch = (product.category || "").toLowerCase().includes(query);
        if (!titleMatch && !categoryMatch) return false;
      }

      // 3. Date Filter (based on product creation / update timestamp)
      const targetDate = product.createdAt ? new Date(product.createdAt) : null;
      if (!targetDate || isNaN(targetDate.getTime())) return true;

      if (dateFilter === "7d") {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(now.getDate() - 7);
        if (targetDate < sevenDaysAgo) return false;
      } else if (dateFilter === "30d") {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(now.getDate() - 30);
        if (targetDate < thirtyDaysAgo) return false;
      } else if (dateFilter === "month") {
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        if (targetDate < firstDayOfMonth) return false;
      } else if (dateFilter === "custom") {
        if (startDate) {
          const start = new Date(startDate);
          start.setHours(0, 0, 0, 0);
          if (targetDate < start) return false;
        }
        if (endDate) {
          const end = new Date(endDate);
          end.setHours(23, 59, 59, 999);
          if (targetDate > end) return false;
        }
      }

      return true;
    });
  }, [products, statusFilter, searchQuery, dateFilter, startDate, endDate]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedProducts = filteredProducts.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize
  );

  const resetFilters = () => {
    setSearchQuery("");
    setDateFilter("all");
    setStartDate("");
    setEndDate("");
    setStatusFilter("all");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    dateFilter !== "all" ||
    statusFilter !== "all" ||
    startDate !== "" ||
    endDate !== "";

  const handleTogglePromo = (product: any, activate: boolean) => {
    const draft = Number(draftPrices[product.id]);
    startTransition(async () => {
      const res = await actionToggleProductPromo({
        storeId: store.id,
        productId: product.id,
        activate,
        promoPrice: activate && draft > 0 ? draft : undefined,
      });

      if (res.success && res.data) {
        setProducts(products.map((p) => (p.id === product.id ? res.data : p)));
        showToast(
          activate
            ? `Promo flash sale diaktifkan untuk ${product.title}!`
            : `Promo flash sale dinonaktifkan untuk ${product.title}`,
          "success"
        );
      } else {
        showToast(res.error || "Gagal memperbarui promo", "error");
      }
    });
  };

  const handleUpdatePromoPrice = (product: any, newPromoPrice: number) => {
    if (newPromoPrice <= 0) return;

    startTransition(async () => {
      const res = await actionToggleProductPromo({
        storeId: store.id,
        productId: product.id,
        activate: true,
        promoPrice: newPromoPrice,
      });

      if (res.success && res.data) {
        setProducts(products.map((p) => (p.id === product.id ? res.data : p)));
        showToast(`Harga promo berhasil diperbarui untuk ${product.title}`, "success");
      } else {
        showToast(res.error || "Gagal memperbarui harga", "error");
      }
    });
  };

  return (
    <div className="space-y-8 animate-fade-in w-full">
      {/* Header */}
      <div className="pb-6 border-b border-[#E7E5E4] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#1C1917]">
              Flash Sale &amp; Promos (Boost)
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
              {activePromoCount} Active Promos
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#57534E] mt-1">
            Pasang harga coret diskon promo untuk mendongkrak konversi (boost sales) dan pantau performa view &amp; klik.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#D94E28] hover:bg-[#B83E1D] text-white text-xs font-bold transition shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Produk</span>
          </Link>
        </div>
      </div>

      {/* 4 Performance Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E7E5E4] shadow-xs">
          <div className="flex items-center justify-between text-[#78716C] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Promo Aktif</span>
            <Tag className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-2xl font-bold text-[#1C1917]">{activePromoCount}</p>
          <p className="text-[11px] text-[#78716C] mt-1">Dari total {products.length} produk katalog</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E7E5E4] shadow-xs">
          <div className="flex items-center justify-between text-[#78716C] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Promo Views</span>
            <Eye className="w-4 h-4 text-[#D94E28]" />
          </div>
          <p className="text-2xl font-bold text-[#1C1917]">
            {promoViews.toLocaleString("id-ID")}
          </p>
          <p className="text-[11px] text-[#78716C] mt-1">Tayangan produk berstatus promo</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E7E5E4] shadow-xs">
          <div className="flex items-center justify-between text-[#78716C] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Promo Clicks</span>
            <MousePointerClick className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-[#1C1917]">
            {promoClicks.toLocaleString("id-ID")}
          </p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">
            {promoCtr}% CTR Promo
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E7E5E4] shadow-xs">
          <div className="flex items-center justify-between text-[#78716C] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Rata-rata Diskon</span>
            <TrendingDown className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-emerald-700">
            {avgDiscount > 0 ? `-${avgDiscount}%` : "0%"}
          </p>
          <p className="text-[11px] text-[#78716C] mt-1">Besaran potongan harga aktif</p>
        </div>
      </div>

      {/* Visual Explainer Banner */}
      <div className="bg-white rounded-3xl border border-[#E7E5E4] p-5 sm:p-6 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-7 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-bold">
            <Zap className="w-3.5 h-3.5 fill-rose-600" />
            <span>Cara Kerja Flash Sale &amp; Boost Konversi</span>
          </div>
          <h2 className="text-base font-bold text-[#1C1917]">
            Tampilkan Harga Coret &amp; Badge Diskon untuk Meningkatkan Penjualan
          </h2>
          <p className="text-xs text-[#57534E] leading-relaxed">
            Atur harga promo di bawah harga normal untuk menciptakan urgensi bagi calon pembeli di storefront Anda:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-[11px]">
            <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E7E5E4]">
              <div className="font-bold text-[#1C1917]">1. Tambah Produk</div>
              <div className="text-[#78716C] mt-0.5">Buat produk dengan harga reguler normal terlebih dahulu.</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E7E5E4]">
              <div className="font-bold text-[#1C1917]">2. Pasang Harga Promo</div>
              <div className="text-[#78716C] mt-0.5">Masukkan nominal harga diskon coret pada tabel di bawah.</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E7E5E4]">
              <div className="font-bold text-[#1C1917]">3. Pantau View &amp; Klik</div>
              <div className="text-[#78716C] mt-0.5">Ukur respons dan interaksi pembeli secara langsung.</div>
            </div>
          </div>
        </div>

        {/* Mini Storefront Product Card Preview */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-[260px] rounded-2xl border border-[#E7E5E4] bg-[#FAF8F5] p-3.5 space-y-2.5 shadow-2xs">
            <div className="flex items-center justify-between text-[10px] text-[#78716C] font-semibold">
              <span>Preview Live Storefront</span>
              <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[9px]">
                -34% FLASH SALE
              </span>
            </div>
            <div className="rounded-xl bg-white border border-[#E7E5E4] p-3 space-y-1.5">
              <div className="text-xs font-bold text-[#1C1917]">Creator Starter Pack</div>
              <div className="flex items-baseline gap-2">
                <span className="text-[11px] text-stone-400 line-through">Rp 150.000</span>
                <span className="text-sm font-extrabold text-[#D94E28]">Rp 99.000</span>
              </div>
              <div className="pt-1">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-white bg-[#D94E28] px-2.5 py-1 rounded-lg">
                  <span>Beli Sekarang</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white rounded-2xl border border-[#E7E5E4] p-4 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Cari nama produk atau kategori..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-[#E7E5E4] text-xs text-[#1C1917] bg-[#FAF8F5] focus:bg-white focus:border-[#D94E28] outline-none transition"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Status Filter */}
            <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-xl border border-[#E7E5E4] text-xs">
              <button
                type="button"
                onClick={() => {
                  setStatusFilter("all");
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  statusFilter === "all"
                    ? "bg-white text-[#1C1917] font-bold shadow-2xs"
                    : "text-[#78716C] hover:text-[#1C1917]"
                }`}
              >
                Semua
              </button>
              <button
                type="button"
                onClick={() => {
                  setStatusFilter("active");
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  statusFilter === "active"
                    ? "bg-white text-rose-700 font-bold shadow-2xs"
                    : "text-[#78716C] hover:text-[#1C1917]"
                }`}
              >
                Sedang Promo
              </button>
              <button
                type="button"
                onClick={() => {
                  setStatusFilter("inactive");
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  statusFilter === "inactive"
                    ? "bg-white text-stone-800 font-bold shadow-2xs"
                    : "text-[#78716C] hover:text-[#1C1917]"
                }`}
              >
                Harga Normal
              </button>
            </div>

            {/* Date Filter Dropdown */}
            <div className="flex items-center gap-1.5 bg-[#FAF8F5] px-2.5 py-1.5 rounded-xl border border-[#E7E5E4] text-xs">
              <Calendar className="w-3.5 h-3.5 text-[#78716C]" />
              <select
                value={dateFilter}
                onChange={(e) => {
                  setDateFilter(e.target.value as DateFilterOption);
                  setCurrentPage(1);
                }}
                className="bg-transparent text-[#1C1917] font-medium outline-none cursor-pointer"
              >
                <option value="all">Semua Tanggal</option>
                <option value="7d">7 Hari Terakhir</option>
                <option value="30d">30 Hari Terakhir</option>
                <option value="month">Bulan Ini</option>
                <option value="custom">Rentang Kustom</option>
              </select>
            </div>

            {/* Reset Filter Button */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-[#78716C] hover:text-stone-900 bg-stone-100 hover:bg-stone-200 transition"
                title="Reset Filter"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Custom Date Range Picker inputs when selected */}
        {dateFilter === "custom" && (
          <div className="pt-2 border-t border-[#E7E5E4] flex flex-wrap items-center gap-3 text-xs">
            <span className="text-[#78716C] font-medium">Dari:</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setCurrentPage(1);
              }}
              className="px-2.5 py-1 rounded-lg border border-[#E7E5E4] bg-white text-[#1C1917] outline-none focus:border-[#D94E28]"
            />
            <span className="text-[#78716C] font-medium">Sampai:</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setCurrentPage(1);
              }}
              className="px-2.5 py-1 rounded-lg border border-[#E7E5E4] bg-white text-[#1C1917] outline-none focus:border-[#D94E28]"
            />
            {(startDate || endDate) && (
              <span className="text-[11px] text-[#78716C]">
                Menampilkan produk dalam rentang {startDate || "Awal"} s/d {endDate || "Sekarang"}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Products Promo Table */}
      <div className="bg-white rounded-3xl border border-[#E7E5E4] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] text-[#78716C] font-semibold border-b border-[#E7E5E4]">
              <tr>
                <th className="py-3 px-4">Produk</th>
                <th className="py-3 px-4">Harga Normal</th>
                <th className="py-3 px-4">Harga Flash Sale</th>
                <th className="py-3 px-4">Diskon</th>
                <th className="py-3 px-4">Traffic (View &amp; Klik)</th>
                <th className="py-3 px-4">Tanggal Ditambahkan</th>
                <th className="py-3 px-4 text-right">Status Promo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E5E4]">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 px-4 text-center text-xs text-[#78716C]">
                    <div className="max-w-sm mx-auto space-y-3">
                      <Tag className="w-8 h-8 text-stone-300 mx-auto" />
                      <p className="font-bold text-[#1C1917] text-sm">
                        {hasActiveFilters
                          ? "Tidak Ada Produk yang Cocok dengan Filter"
                          : "Belum Ada Produk di Toko"}
                      </p>
                      <p>
                        {hasActiveFilters
                          ? "Coba ubah kata kunci pencarian, rentang filter tanggal, atau status promo Anda."
                          : "Tambahkan produk pertama Anda sebelum mengatur harga Flash Sale dan diskon coret."}
                      </p>
                      {hasActiveFilters ? (
                        <button
                          type="button"
                          onClick={resetFilters}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Reset Filter</span>
                        </button>
                      ) : (
                        <Link
                          href="/admin/products/new"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D94E28] hover:bg-[#B83E1D] text-white text-xs font-bold transition shadow-xs"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Tambah Produk Pertama</span>
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedProducts.map((product) => {
                  const isPromoActive =
                    product.compareAtPrice && Number(product.compareAtPrice) > Number(product.price);
                  const regularPrice = Number(
                    isPromoActive ? product.compareAtPrice : product.price
                  );
                  const currentPrice = Number(product.price);
                  const discountPercent =
                    isPromoActive && regularPrice > 0
                      ? Math.round(((regularPrice - currentPrice) / regularPrice) * 100)
                      : 0;

                  const pViews = product.views || 0;
                  const pClicks = product.clicks || 0;
                  const pCtr = pViews > 0 ? ((pClicks / pViews) * 100).toFixed(1) : "0.0";

                  const formattedDate = product.createdAt
                    ? new Date(product.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "-";

                  return (
                    <tr key={product.id} className="hover:bg-[#FAF8F5]/50 transition">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3 min-w-0">
                          {product.images && product.images[0] ? (
                            <img
                              src={product.images[0]}
                              alt={product.title}
                              className="w-10 h-10 rounded-xl object-cover border border-[#E7E5E4] shrink-0"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-xs text-stone-500 font-bold shrink-0">
                              📦
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-bold text-[#1C1917] truncate max-w-xs">
                              {product.title}
                            </p>
                            <p className="text-[10px] text-[#78716C]">
                              {product.category || "General"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 font-semibold text-[#1C1917]">
                        Rp {regularPrice.toLocaleString("id-ID")}
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            min={1000}
                            max={Math.max(1000, regularPrice - 1)}
                            value={
                              draftPrices[product.id] ??
                              (isPromoActive ? String(currentPrice) : String(Math.round(regularPrice * 0.8)))
                            }
                            onChange={(e) =>
                              setDraftPrices((prev) => ({ ...prev, [product.id]: e.target.value }))
                            }
                            className="w-24 px-2 py-1 rounded-lg border border-[#E7E5E4] font-mono text-xs font-bold text-[#1C1917] bg-white focus:border-[#D94E28] outline-none"
                          />
                          {isPromoActive && (
                            <button
                              type="button"
                              onClick={() =>
                                handleUpdatePromoPrice(
                                  product,
                                  Number(draftPrices[product.id] ?? currentPrice)
                                )
                              }
                              disabled={isPending}
                              className="px-2 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-[10px] font-bold text-stone-700 transition"
                            >
                              Simpan
                            </button>
                          )}
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        {isPromoActive ? (
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                            <TrendingDown className="w-3 h-3 text-rose-600" />
                            <span>-{discountPercent}%</span>
                          </span>
                        ) : (
                          <span className="text-stone-400 text-[11px]">-</span>
                        )}
                      </td>

                      {/* Views & Clicks Performance Column */}
                      <td className="py-3 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-[11px]">
                            <span className="inline-flex items-center gap-1 text-stone-600 font-medium">
                              <Eye className="w-3 h-3 text-[#D94E28]" />
                              <span>{pViews.toLocaleString("id-ID")}</span>
                            </span>
                            <span className="text-stone-300">•</span>
                            <span className="inline-flex items-center gap-1 text-stone-800 font-bold">
                              <MousePointerClick className="w-3 h-3 text-blue-600" />
                              <span>{pClicks.toLocaleString("id-ID")}</span>
                            </span>
                          </div>
                          <div className="text-[10px] text-emerald-600 font-semibold">
                            {pCtr}% CTR
                          </div>
                        </div>
                      </td>

                      {/* Date Added */}
                      <td className="py-3 px-4 text-[#78716C] text-[11px] whitespace-nowrap">
                        {formattedDate}
                      </td>

                      {/* Promo Toggle Button */}
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleTogglePromo(product, !isPromoActive)}
                          disabled={isPending}
                          className={`px-3 py-1 rounded-xl text-xs font-bold transition shadow-2xs ${
                            isPromoActive
                              ? "bg-stone-100 hover:bg-stone-200 text-stone-700"
                              : "bg-[#D94E28] hover:bg-[#B83E1D] text-white"
                          }`}
                        >
                          {isPromoActive ? "Nonaktifkan" : "Aktifkan Diskon"}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <AdminPagination
          currentPage={safePage}
          totalItems={filteredProducts.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
