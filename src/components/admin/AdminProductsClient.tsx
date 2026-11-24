"use client";

import React, { useState, useTransition } from "react";
import {
  Package,
  Plus,
  Search,
  Filter,
  Eye,
  MousePointerClick,
  Edit,
  Trash2,
  Star,
  ExternalLink,
  MessageCircle,
  QrCode,
  Tag,
  Sparkles,
  Check,
  X,
  Loader2,
  Zap,
} from "lucide-react";
import { actionSaveProduct, actionDeleteProduct } from "@/app/admin/actions";
import { showToast } from "@/components/ui/GlobalToast";

interface AdminProductsClientProps {
  store: any;
  tier: "FREE" | "PRO" | "DFY";
  rules: any;
}

const CATEGORIES = [
  "Digital Product (E-Book/Preset)",
  "Physical Goods & Merchandise",
  "Online Course & Video Series",
  "Event & Webinar Ticket",
  "1-on-1 Consultation & Booking",
  "Affiliate Link / Yellow Basket",
  "Other Service",
];

export function AdminProductsClient({ store, tier, rules }: AdminProductsClientProps) {
  const [products, setProducts] = useState<any[]>(store.products || []);
  const [isPending, startTransition] = useTransition();

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<"ALL" | "ACTIVE" | "FEATURED" | "DIGITAL" | "PHYSICAL">("ALL");

  // Modal / Drawer State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Digital Product (E-Book/Preset)");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState<number>(50000);
  const [compareAtPrice, setCompareAtPrice] = useState<number | null>(null);

  // Checkout Mode & Channels
  const [checkoutMode, setCheckoutMode] = useState<"CHAT_ORDER" | "DIRECT_CHECKOUT" | "EXTERNAL_LINK">("CHAT_ORDER");
  const [externalPlatform, setExternalPlatform] = useState<string>("TIKTOK_SHOP");
  const [externalUrl, setExternalUrl] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isActive, setIsActive] = useState(true);

  // Flash Sale / Promo Tool
  const [promoActive, setPromoActive] = useState(false);
  const [promoPrice, setPromoPrice] = useState<number | null>(null);

  // Open modal for New Product
  const handleOpenNew = () => {
    setEditingProduct(null);
    setTitle("");
    setSlug("");
    setCategory("Digital Product (E-Book/Preset)");
    setDescription("");
    setImageUrl("");
    setPrice(50000);
    setCompareAtPrice(null);
    setCheckoutMode("CHAT_ORDER");
    setExternalPlatform("TIKTOK_SHOP");
    setExternalUrl("");
    setChatMessage("Hi, I want to order this item from your storefront!");
    setIsFeatured(false);
    setIsActive(true);
    setPromoActive(false);
    setPromoPrice(null);
    setModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEdit = (product: any) => {
    setEditingProduct(product);
    setTitle(product.title);
    setSlug(product.slug);
    setCategory(product.category || "Digital Product (E-Book/Preset)");
    setDescription(product.description || "");
    setImageUrl(product.images?.[0] || "");
    setPrice(Number(product.price || 0));
    setCompareAtPrice(product.compareAtPrice ? Number(product.compareAtPrice) : null);
    setCheckoutMode(product.checkoutMode || "CHAT_ORDER");
    setExternalPlatform(product.externalPlatform || "TIKTOK_SHOP");
    setExternalUrl(product.externalUrl || "");
    setChatMessage(product.chatMessage || "");
    setIsFeatured(Boolean(product.isFeatured));
    setIsActive(Boolean(product.isActive));
    setPromoActive(Boolean(product.compareAtPrice && Number(product.compareAtPrice) > Number(product.price)));
    setPromoPrice(product.compareAtPrice ? Number(product.price) : null);
    setModalOpen(true);
  };

  // Handle Save
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast("Product title is required.", "error");
      return;
    }

    startTransition(async () => {
      const res = await actionSaveProduct({
        storeId: store.id,
        productId: editingProduct?.id,
        title,
        slug,
        category,
        description,
        images: imageUrl.trim() ? [imageUrl.trim()] : [],
        price,
        compareAtPrice: promoActive && promoPrice ? price : compareAtPrice,
        checkoutMode,
        externalPlatform: checkoutMode === "EXTERNAL_LINK" ? externalPlatform : null,
        externalUrl: checkoutMode === "EXTERNAL_LINK" ? externalUrl : null,
        chatMessage,
        isFeatured,
        isActive,
        promoActive,
        promoPrice,
      });

      if (res.success && res.data) {
        showToast(editingProduct ? "Product updated successfully!" : "Product published to store!", "success");
        if (editingProduct) {
          setProducts(products.map((p) => (p.id === editingProduct.id ? res.data : p)));
        } else {
          setProducts([res.data, ...products]);
        }
        setModalOpen(false);
      } else {
        showToast(res.error || "Failed to save product", "error");
      }
    });
  };

  // Handle Delete
  const handleDelete = (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    startTransition(async () => {
      const res = await actionDeleteProduct({
        productId,
        storeId: store.id,
      });
      if (res.success) {
        setProducts(products.filter((p) => p.id !== productId));
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

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl">
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

        <button
          type="button"
          onClick={handleOpenNew}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#D94E28] hover:bg-[#B83E1D] text-white text-xs font-semibold shadow-xs transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter & Search Bar - Clean without horizontal tab strips */}
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

        {/* Clean Dropdown Filter (No Horizontal Tabs) */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-[#78716C] whitespace-nowrap">
            Filter Status:
          </label>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value as any)}
            className="px-3 py-1.5 rounded-xl border border-[#E7E5E4] bg-white text-xs font-semibold text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#D94E28]/20"
          >
            <option value="ALL">All Items</option>
            <option value="ACTIVE">Active Only</option>
            <option value="FEATURED">Featured Only</option>
            <option value="DIGITAL">Digital Products</option>
            <option value="PHYSICAL">Physical Goods</option>
          </select>
        </div>
      </div>

      {/* Products List / Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-3xl border border-[#E7E5E4] p-8 shadow-xs">
          <Package className="w-10 h-10 text-stone-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-[#1C1917]">No products found</h3>
          <p className="text-xs text-[#78716C] mt-1 max-w-md mx-auto">
            {searchQuery
              ? "No catalog items matched your search query. Try clearing the search."
              : "Start by adding your first digital product, physical item, or affiliate yellow basket offer."}
          </p>
          <button
            type="button"
            onClick={handleOpenNew}
            className="mt-4 px-4 py-2 rounded-xl bg-[#D94E28] hover:bg-[#B83E1D] text-white text-xs font-bold transition shadow-xs"
          >
            + Create First Product
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-[#E7E5E4] shadow-xs overflow-hidden">
          <div className="divide-y divide-[#E7E5E4]">
            {filteredProducts.map((product) => {
              const isPromo =
                product.compareAtPrice && Number(product.compareAtPrice) > Number(product.price);

              return (
                <div
                  key={product.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#FAF8F5]/50 transition"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Thumbnail */}
                    {product.images && product.images[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-14 h-14 rounded-2xl object-cover border border-[#E7E5E4] shrink-0"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E4] flex items-center justify-center text-xl shrink-0">
                        📦
                      </div>
                    )}

                    {/* Details */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-bold text-[#1C1917] truncate">
                          {product.title}
                        </h3>
                        {product.isFeatured && (
                          <span className="flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                            <span>Featured</span>
                          </span>
                        )}
                        {isPromo && (
                          <span className="flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                            <Zap className="w-3 h-3 text-rose-600 fill-rose-600" />
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

                  {/* Pricing, Metrics & Quick Actions */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-0 border-[#E7E5E4]">
                    {/* Price */}
                    <div className="text-left sm:text-right">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm font-bold text-[#1C1917]">
                          Rp {Number(product.price).toLocaleString("id-ID")}
                        </span>
                        {isPromo && (
                          <span className="text-xs text-stone-400 line-through">
                            Rp {Number(product.compareAtPrice).toLocaleString("id-ID")}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-[#78716C] mt-0.5">
                        <span>{product.clicks || 0} clicks</span>
                        <span>&bull;</span>
                        <span>{product.views || 0} views</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(product)}
                        className="p-2 rounded-xl border border-[#E7E5E4] hover:bg-stone-100 text-stone-700 transition"
                        title="Edit Product"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(product.id)}
                        className="p-2 rounded-xl border border-[#E7E5E4] hover:bg-rose-50 hover:border-rose-200 text-stone-400 hover:text-rose-600 transition"
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

      {/* Add / Edit Drawer Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl border border-[#E7E5E4] shadow-2xl max-w-lg w-full my-8 p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E4]">
              <h3 className="text-base font-bold text-[#1C1917]">
                {editingProduct ? "Edit Product" : "Add New Catalog Product"}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
              {/* Product Title */}
              <div>
                <label className="block text-xs font-bold text-[#1C1917] mb-1">
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Masterclass Notion Template OS"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E7E5E4] bg-white focus:outline-none focus:ring-2 focus:ring-[#D94E28]/20 focus:border-[#D94E28]"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-[#1C1917] mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E7E5E4] bg-white"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-xs font-bold text-[#1C1917] mb-1">
                  Product Image URL
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E7E5E4] bg-white"
                />
              </div>

              {/* Pricing Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#1C1917] mb-1">
                    Selling Price (IDR) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E7E5E4] font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#78716C] mb-1">
                    Original Price (Crossed out)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={compareAtPrice || ""}
                    onChange={(e) =>
                      setCompareAtPrice(e.target.value ? Number(e.target.value) : null)
                    }
                    placeholder="e.g. 150000"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E7E5E4]"
                  />
                </div>
              </div>

              {/* Checkout Mode Selector */}
              <div className="space-y-2 pt-2 border-t border-[#E7E5E4]">
                <label className="block text-xs font-bold text-[#1C1917]">
                  Primary Checkout Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutMode("CHAT_ORDER")}
                    className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                      checkoutMode === "CHAT_ORDER"
                        ? "border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-600/10"
                        : "border-[#E7E5E4] bg-white text-stone-600 hover:border-stone-300"
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 mb-1 text-emerald-600" />
                    <span className="text-xs font-bold leading-tight">Order by Chat</span>
                    <span className="text-[10px] text-emerald-700 font-semibold mt-0.5">0% Fee</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCheckoutMode("DIRECT_CHECKOUT")}
                    className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                      checkoutMode === "DIRECT_CHECKOUT"
                        ? "border-[#D94E28] bg-[#FDF0EC] text-[#B83E1D] ring-2 ring-[#D94E28]/10"
                        : "border-[#E7E5E4] bg-white text-stone-600 hover:border-stone-300"
                    }`}
                  >
                    <QrCode className="w-4 h-4 mb-1 text-[#D94E28]" />
                    <span className="text-xs font-bold leading-tight">Instant QRIS</span>
                    <span className="text-[10px] text-[#B83E1D] font-semibold mt-0.5">{rules.directCheckoutFeePercent}% Fee</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCheckoutMode("EXTERNAL_LINK")}
                    className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                      checkoutMode === "EXTERNAL_LINK"
                        ? "border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-600/10"
                        : "border-[#E7E5E4] bg-white text-stone-600 hover:border-stone-300"
                    }`}
                  >
                    <ExternalLink className="w-4 h-4 mb-1 text-blue-600" />
                    <span className="text-xs font-bold leading-tight">Affiliate Link</span>
                    <span className="text-[10px] text-blue-700 font-semibold mt-0.5">TikTok/Shopee</span>
                  </button>
                </div>
              </div>

              {/* Conditional: Order by Chat Message */}
              {checkoutMode === "CHAT_ORDER" && (
                <div>
                  <label className="block text-xs font-bold text-[#1C1917] mb-1">
                    Pre-filled WhatsApp Message
                  </label>
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Hi, I want to order..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E7E5E4]"
                  />
                </div>
              )}

              {/* Conditional: External Link Platform & URL */}
              {checkoutMode === "EXTERNAL_LINK" && (
                <div className="space-y-3 p-3 bg-[#FAF8F5] rounded-xl border border-[#E7E5E4]">
                  <div>
                    <label className="block text-[11px] font-bold text-[#1C1917] mb-1">
                      Platform Preset
                    </label>
                    <select
                      value={externalPlatform}
                      onChange={(e) => setExternalPlatform(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#E7E5E4] bg-white"
                    >
                      <option value="TIKTOK_SHOP">TikTok Shop (Keranjang Kuning)</option>
                      <option value="SHOPEE">Shopee (Orange App)</option>
                      <option value="TOKOPEDIA">Tokopedia (Toko Hijau)</option>
                      <option value="CUSTOM">Custom Affiliate URL</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#1C1917] mb-1">
                      Product Affiliate URL *
                    </label>
                    <input
                      type="url"
                      required
                      value={externalUrl}
                      onChange={(e) => setExternalUrl(e.target.value)}
                      placeholder="https://vt.tiktok.com/... or https://shopee.co.id/..."
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#E7E5E4] bg-white"
                    />
                  </div>
                </div>
              )}

              {/* Simple Flash Sale / Promo Switch */}
              <div className="p-3.5 rounded-2xl bg-[#FDF0EC]/60 border border-[#FADCD3] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#D94E28]" />
                    <span className="text-xs font-bold text-[#B83E1D]">
                      Flash Sale / Promo Discount
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={promoActive}
                    onChange={(e) => setPromoActive(e.target.checked)}
                    className="w-4 h-4 text-[#D94E28] rounded border-stone-300 focus:ring-[#D94E28]"
                  />
                </div>

                {promoActive && (
                  <div className="pt-2">
                    <label className="block text-[11px] font-bold text-[#1C1917] mb-1">
                      Special Promo Price (IDR)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={promoPrice || ""}
                      onChange={(e) => setPromoPrice(e.target.value ? Number(e.target.value) : null)}
                      placeholder="e.g. 35000"
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#E7E5E4] bg-white font-bold text-[#D94E28]"
                    />
                    <p className="text-[10px] text-[#78716C] mt-1">
                      Selling price will temporarily show as slashed discount on your storefront.
                    </p>
                  </div>
                )}
              </div>

              {/* Featured & Active Toggles */}
              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-[#1C1917] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 text-[#D94E28] rounded"
                  />
                  <span>Mark as Featured Item</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-[#1C1917] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 text-[#D94E28] rounded"
                  />
                  <span>Visible on Store</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-[#E7E5E4]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-5 py-2 text-xs font-bold text-white bg-[#D94E28] hover:bg-[#B83E1D] rounded-xl transition shadow-xs flex items-center gap-2 disabled:opacity-50"
                >
                  {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                  <span>{editingProduct ? "Update Product" : "Publish Product"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
