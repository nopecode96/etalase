"use client";

import React, { useState, useTransition } from "react";
import {
  Zap,
  Tag,
  Clock,
  Check,
  Save,
  Loader2,
  AlertCircle,
  TrendingDown,
} from "lucide-react";
import { actionSaveProduct } from "@/app/admin/actions";
import { showToast } from "@/components/ui/GlobalToast";

interface AdminProductsPromosClientProps {
  store: any;
  tier: "FREE" | "PRO" | "DFY";
}

export function AdminProductsPromosClient({ store }: AdminProductsPromosClientProps) {
  const [products, setProducts] = useState<any[]>(store.products || []);
  const [isPending, startTransition] = useTransition();

  // Active promo items
  const activePromoCount = products.filter(
    (p) => p.compareAtPrice && Number(p.compareAtPrice) > Number(p.price)
  ).length;

  const handleTogglePromo = (product: any, activate: boolean) => {
    const originalPrice = Number(product.compareAtPrice || product.price);
    const promoDiscountPrice = activate ? Math.round(originalPrice * 0.8) : originalPrice;

    startTransition(async () => {
      const res = await actionSaveProduct({
        storeId: store.id,
        productId: product.id,
        title: product.title,
        price: activate ? promoDiscountPrice : originalPrice,
        compareAtPrice: activate ? originalPrice : null,
        checkoutMode: product.checkoutMode,
        promoActive: activate,
        promoPrice: activate ? promoDiscountPrice : null,
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
    const originalPrice = Number(product.compareAtPrice || product.price);

    startTransition(async () => {
      const res = await actionSaveProduct({
        storeId: store.id,
        productId: product.id,
        title: product.title,
        price: newPromoPrice,
        compareAtPrice: originalPrice,
        checkoutMode: product.checkoutMode,
        promoActive: true,
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

      {/* Overview Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-50 to-[#FAF8F5] border border-rose-200 flex items-center justify-between text-xs text-[#57534E]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 fill-rose-600" />
          </div>
          <div>
            <p className="font-bold text-[#1C1917]">Flash Sale Pricing Mechanics</p>
            <p className="text-[11px] text-[#78716C]">
              When active, the slashed original price and discount percentage will be highlighted prominently on your mobile storefront.
            </p>
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
                  <td colSpan={5} className="py-12 text-center text-xs text-[#78716C]">
                    No products in store yet. Add products first to configure promos.
                  </td>
                </tr>
              ) : (
                products.map((product) => {
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
                        {isPromoActive ? (
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-xs font-bold text-rose-600">
                              Rp {currentPrice.toLocaleString("id-ID")}
                            </span>
                          </div>
                        ) : (
                          <span className="text-stone-400 italic">No Promo</span>
                        )}
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
      </div>
    </div>
  );
}
