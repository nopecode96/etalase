"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import {
  Package,
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  MessageCircle,
  QrCode,
  Sparkles,
  Zap,
} from "lucide-react";
import { actionDeleteProduct } from "@/app/admin/actions";
import { showToast } from "@/components/ui/GlobalToast";

interface AdminProductsClientProps {
  store: any;
  tier: "FREE" | "PRO" | "DFY";
  rules: any;
}

export function AdminProductsClient({ store }: AdminProductsClientProps) {
  const [products, setProducts] = useState<any[]>(store.products || []);
  const [, startTransition] = useTransition();

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<
    "ALL" | "ACTIVE" | "FEATURED" | "DIGITAL" | "PHYSICAL"
  >("ALL");

  // Handle Delete
  const handleDelete = (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    startTransition(async () => {
      const res = await actionDeleteProduct({
        productId,
        storeId: store.id,
      });
      if (res.success) {
        setProducts((prev) => prev.filter((p) => p.id !== productId));
        showToast("Product deleted.", "success");
      } else {
        showToast(res.error || "Failed to delete product", "error");
      }
    });
  };

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (selectedFilter === "ACTIVE") return p.isActive !== false;
    if (selectedFilter === "FEATURED") return Boolean(p.isFeatured);
    if (selectedFilter === "DIGITAL") return p.productType === "DIGITAL";
    if (selectedFilter === "PHYSICAL") return p.productType === "PHYSICAL";
    return true;
  });

  const currency = store.currency || "IDR";

  return (
    <div className="space-y-8 animate-fade-in w-full pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#E7E5E4]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1917]">
              Products &amp; Promos
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
              {products.length} Items (Unlimited)
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#57534E] mt-1">
            Manage your catalog items, 0% chat checkout, BorderPay QRIS, and flash sale discounts.
          </p>
        </div>

        {/* Link directly to dedicated full-page create route */}
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#D94E28] hover:bg-[#B83E1D] text-white text-xs font-bold shadow-xs transition self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by title or category..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-[#E7E5E4] bg-white focus:outline-none focus:ring-2 focus:ring-[#D94E28]/20 focus:border-[#D94E28]"
          />
        </div>

        {/* Dropdown Filter */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-[#78716C] whitespace-nowrap">
            Filter Status:
          </label>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value as any)}
            className="px-3 py-1.5 rounded-xl border border-[#E7E5E4] bg-white text-xs font-semibold text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#D94E28]/20 cursor-pointer"
          >
            <option value="ALL">All Items</option>
            <option value="ACTIVE">Active Only</option>
            <option value="FEATURED">Featured Only</option>
            <option value="DIGITAL">Digital Products</option>
            <option value="PHYSICAL">Physical Goods</option>
          </select>
        </div>
      </div>

      {/* Product List Content */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#E7E5E4] p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FDF0EC] text-[#D94E28] flex items-center justify-center mx-auto">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#1C1917]">
              {searchQuery ? "No products match your filter" : "Your catalog is empty"}
            </h3>
            <p className="text-xs text-[#78716C] mt-1 max-w-md mx-auto">
              {searchQuery
                ? "Try searching with different keywords or reset your filter status."
                : "Add your first digital product, physical item, or consultation service to start accepting orders."}
            </p>
          </div>
          {!searchQuery && (
            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#D94E28] hover:bg-[#B83E1D] text-white text-xs font-semibold rounded-xl shadow-xs transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add Your First Product</span>
            </Link>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-[#E7E5E4] overflow-hidden shadow-xs">
          <div className="divide-y divide-[#E7E5E4]">
            {filteredProducts.map((product) => {
              const isPromo =
                Boolean(product.compareAtPrice) &&
                Number(product.compareAtPrice) > Number(product.price);

              const coverPhoto = product.images?.[0];

              return (
                <div
                  key={product.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#FAF8F5]/60 transition"
                >
                  {/* Left: Thumbnail & Details */}
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Thumbnail */}
                    <div className="w-14 h-14 rounded-2xl bg-stone-100 border border-[#E7E5E4] flex items-center justify-center overflow-hidden shrink-0">
                      {coverPhoto ? (
                        <img
                          src={coverPhoto}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Package className="w-6 h-6 text-stone-400" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="text-sm font-bold text-[#1C1917] hover:text-[#D94E28] transition truncate"
                        >
                          {product.title}
                        </Link>
                        {product.isFeatured && (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                            <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500" />
                            <span>Featured</span>
                          </span>
                        )}
                        {!product.isActive && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-stone-500">
                            Draft
                          </span>
                        )}
                        {isPromo && (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                            <Zap className="w-3 h-3" />
                            <span>Promo</span>
                          </span>
                        )}
                      </div>

                      {/* Category & Checkout Badges */}
                      <div className="flex items-center gap-2 mt-1 text-xs text-[#78716C] flex-wrap">
                        <span>{product.category || "General"}</span>
                        <span>&bull;</span>

                        {product.checkoutMode === "CHAT_ORDER" && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                            <MessageCircle className="w-3 h-3" />
                            <span>Order by Chat (0% Fee)</span>
                          </span>
                        )}

                        {product.checkoutMode === "DIRECT_CHECKOUT" && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#D94E28] bg-[#FDF0EC] px-2 py-0.5 rounded-md">
                            <QrCode className="w-3 h-3" />
                            <span>Instant QRIS</span>
                          </span>
                        )}

                        {product.checkoutMode === "EXTERNAL_LINK" && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                            <ExternalLink className="w-3 h-3" />
                            <span>{product.externalPlatform || "External Link"}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Pricing, Metrics & Quick Actions */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-0 border-[#E7E5E4]">
                    {/* Price */}
                    <div className="text-left sm:text-right">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm font-bold text-[#1C1917]">
                          {currency} {Number(product.price).toLocaleString("id-ID")}
                        </span>
                        {isPromo && (
                          <span className="text-xs text-stone-400 line-through">
                            {currency} {Number(product.compareAtPrice).toLocaleString("id-ID")}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-[#78716C] mt-0.5">
                        <span>{product.clicks || 0} clicks</span>
                        <span>&bull;</span>
                        <span>{product.views || 0} views</span>
                      </div>
                    </div>

                    {/* Action Buttons: Edit Link & Delete */}
                    <div className="flex items-center gap-1.5">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="p-2 rounded-xl border border-[#E7E5E4] hover:bg-stone-100 text-stone-700 transition"
                        title="Edit Product"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(product.id)}
                        className="p-2 rounded-xl border border-[#E7E5E4] hover:bg-rose-50 hover:border-rose-200 text-stone-400 hover:text-rose-600 transition cursor-pointer"
                        title="Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
