"use client";

import React, { useState, useTransition } from "react";
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
} from "lucide-react";
import { actionToggleProductPromo } from "@/app/admin/actions";
import { showToast } from "@/components/ui/GlobalToast";
import { AdminPagination } from "@/components/admin/AdminPagination";

interface AdminProductsPromosClientProps {
  store: any;
  tier: "FREE" | "PRO" | "DFY";
}

export function AdminProductsPromosClient({ store }: AdminProductsPromosClientProps) {
  const [products, setProducts] = useState<any[]>(store.products || []);
  const [draftPrices, setDraftPrices] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const totalPages = Math.max(1, Math.ceil(products.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedProducts = products.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize
  );

  // Active promo items
  const activePromoCount = products.filter(
    (p) => p.compareAtPrice && Number(p.compareAtPrice) > Number(p.price)
  ).length;

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
            ? `Promo activated for ${product.title}!`
            : `Promo turned off for ${product.title}`,
          "success"
        );
      } else {
        showToast(res.error || "Failed to update promo", "error");
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
        showToast(`Promo price updated for ${product.title}`, "success");
      } else {
        showToast(res.error || "Failed to update price", "error");
      }
    });
  };

  return (
    <div className="space-y-8 animate-fade-in w-full">
      {/* Header */}
      <div className="pb-6 border-b border-[#E7E5E4]">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-[#1C1917]">
            Flash Sale &amp; Promos
          </h1>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
            {activePromoCount} Active Promos
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#57534E] mt-1">
          Apply limited-time slashed prices and flash sale badges to increase buyer urgency.
        </p>
      </div>

      {/* Visual Explainer + Storefront Card Preview */}
      <div className="bg-white rounded-3xl border border-[#E7E5E4] p-5 sm:p-6 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-7 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-bold">
            <Zap className="w-3.5 h-3.5 fill-rose-600" />
            <span>How Flash Sale &amp; Promos Work</span>
          </div>
          <h2 className="text-base font-bold text-[#1C1917]">
            Show Crossed-Out Prices &amp; Discount Badges to Boost Conversions
          </h2>
          <p className="text-xs text-[#57534E] leading-relaxed">
            Set a temporary promo price below your regular price to create urgency on your storefront:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-[11px]">
            <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E7E5E4]">
              <div className="font-bold text-[#1C1917]">1. Add a Product</div>
              <div className="text-[#78716C] mt-0.5">Create your product with its regular price first.</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E7E5E4]">
              <div className="font-bold text-[#1C1917]">2. Set Promo Price</div>
              <div className="text-[#78716C] mt-0.5">Enter a lower Flash Sale price in the table below.</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E7E5E4]">
              <div className="font-bold text-[#1C1917]">3. Auto Highlight</div>
              <div className="text-[#78716C] mt-0.5">Strikethrough price &amp; % OFF badge appear live.</div>
            </div>
          </div>
        </div>

        {/* Mini Storefront Product Card Preview */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-[260px] rounded-2xl border border-[#E7E5E4] bg-[#FAF8F5] p-3.5 space-y-2.5 shadow-2xs">
            <div className="flex items-center justify-between text-[10px] text-[#78716C] font-semibold">
              <span>Storefront Preview Example</span>
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
                  <span>Order Now</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Promo Table */}
      <div className="bg-white rounded-3xl border border-[#E7E5E4] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] text-[#78716C] font-semibold border-b border-[#E7E5E4]">
              <tr>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Regular Price</th>
                <th className="py-3 px-4">Flash Sale Price</th>
                <th className="py-3 px-4">Discount</th>
                <th className="py-3 px-4 text-right">Promo Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E5E4]">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 px-4 text-center text-xs text-[#78716C]">
                    <div className="max-w-sm mx-auto space-y-3">
                      <Tag className="w-8 h-8 text-stone-300 mx-auto" />
                      <p className="font-bold text-[#1C1917] text-sm">No Products in Store Yet</p>
                      <p>Add your first product before configuring Flash Sale prices and discount badges.</p>
                      <Link
                        href="/admin/products/new"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D94E28] hover:bg-[#B83E1D] text-white text-xs font-bold transition shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add First Product</span>
                      </Link>
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
                              Save
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
                          {isPromoActive ? "Deactivate" : "Activate Sale"}
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
          totalItems={products.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
