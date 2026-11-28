"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Loader2,
  Package,
  Sparkles,
  MessageCircle,
  QrCode,
  ExternalLink,
  Eye,
  Star,
  Tag,
  Zap,
  Check,
  AlertCircle,
  Plus,
  Trash2,
  HelpCircle,
} from "lucide-react";
import { actionSaveProduct } from "@/app/admin/actions";
import { showToast } from "@/components/ui/GlobalToast";
import { ImageUploadDropzone } from "@/components/admin/ImageUploadDropzone";

interface ProductFormClientProps {
  store: any;
  initialProduct?: any;
  mode: "create" | "edit";
}

const CATEGORIES = [
  "Digital Product (E-Book/Preset/Template)",
  "Physical Goods (Merchandise/Fashion/Retail)",
  "Service / Consultation (1-on-1 Coaching/Design)",
  "Course / Video Tutorial",
  "Event / Ticket / Webinar",
  "General / Other",
];

export function ProductFormClient({
  store,
  initialProduct,
  mode,
}: ProductFormClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Basic Information
  const [title, setTitle] = useState(initialProduct?.title || "");
  const [category, setCategory] = useState(
    initialProduct?.category || "Digital Product (E-Book/Preset/Template)"
  );
  const normalizedInitialType =
    initialProduct?.productType === "SERVICE"
      ? "APPOINTMENT"
      : initialProduct?.productType === "EVENT"
      ? "EVENT_WEBINAR"
      : initialProduct?.productType || "DIGITAL";

  const [productType, setProductType] = useState<string>(normalizedInitialType);
  const [description, setDescription] = useState(
    initialProduct?.description || ""
  );

  // Course, Appointment & Event Extensions
  const [courseModules, setCourseModules] = useState<
    Array<{ id: string; title: string; duration: string; videoUrl: string; isFreePreview: boolean }>
  >(() =>
    Array.isArray(initialProduct?.courseModules) ? initialProduct.courseModules : []
  );
  const [appointmentDuration, setAppointmentDuration] = useState<number>(
    initialProduct?.appointmentDuration || 45
  );
  const [appointmentSlotsText, setAppointmentSlotsText] = useState<string>(() =>
    Array.isArray(initialProduct?.appointmentSlots)
      ? initialProduct.appointmentSlots.join(", ")
      : "Besok 10:00 WIB, Besok 14:00 WIB, Besok 16:00 WIB"
  );
  const [eventDate, setEventDate] = useState<string>(() => {
    if (!initialProduct?.eventDate) return "";
    const d = new Date(initialProduct.eventDate);
    return Number.isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 16);
  });
  const [eventLocation, setEventLocation] = useState<string>(
    initialProduct?.eventLocation || ""
  );

  // Media (Up to 4 images: Primary + 3 Gallery slots)
  const initialImages: string[] = Array.isArray(initialProduct?.images)
    ? initialProduct.images
    : [];
  const [coverImage, setCoverImage] = useState<string>(initialImages[0] || "");
  const [galleryImage1, setGalleryImage1] = useState<string>(initialImages[1] || "");
  const [galleryImage2, setGalleryImage2] = useState<string>(initialImages[2] || "");
  const [galleryImage3, setGalleryImage3] = useState<string>(initialImages[3] || "");

  // Pricing & Checkout
  const [price, setPrice] = useState<number | string>(
    initialProduct ? Number(initialProduct.price) : 50000
  );
  const [compareAtPrice, setCompareAtPrice] = useState<number | string>(
    initialProduct?.compareAtPrice ? Number(initialProduct.compareAtPrice) : ""
  );
  const [checkoutMode, setCheckoutMode] = useState<
    "DIRECT_CHECKOUT" | "CHAT_ORDER" | "EXTERNAL_LINK"
  >(initialProduct?.checkoutMode || "CHAT_ORDER");
  const [chatMessage, setChatMessage] = useState(
    initialProduct?.chatMessage || "Halo, saya mau pesan produk ini dari etalase Anda!"
  );
  const [externalPlatform, setExternalPlatform] = useState(
    initialProduct?.externalPlatform || "TIKTOK_SHOP"
  );
  const [externalUrl, setExternalUrl] = useState(
    initialProduct?.externalUrl || ""
  );
  const [digitalFileUrl, setDigitalFileUrl] = useState(
    initialProduct?.digitalFileUrl || ""
  );
  const [isUploadingDigital, setIsUploadingDigital] = useState(false);

  // Settings & Highlight
  const [isActive, setIsActive] = useState<boolean>(
    initialProduct ? Boolean(initialProduct.isActive) : true
  );
  const [isFeatured, setIsFeatured] = useState<boolean>(
    initialProduct ? Boolean(initialProduct.isFeatured) : false
  );
  const [stock, setStock] = useState<string>(
    initialProduct?.stock !== null && initialProduct?.stock !== undefined
      ? String(initialProduct.stock)
      : ""
  );
  const [isPreOrder, setIsPreOrder] = useState<boolean>(
    Boolean((initialProduct as any)?.isPreOrder)
  );
  const [poNote, setPoNote] = useState<string>(
    (initialProduct as any)?.poNote || ""
  );
  const [variants, setVariants] = useState<Array<{ name: string; price: number }>>(
    Array.isArray((initialProduct as any)?.variants)
      ? (initialProduct as any).variants
      : []
  );

  // Flash Sale / Promo
  const isInitialPromo = Boolean(
    initialProduct?.compareAtPrice &&
      Number(initialProduct.compareAtPrice) > Number(initialProduct.price)
  );
  const [promoActive, setPromoActive] = useState<boolean>(isInitialPromo);
  const [promoPrice, setPromoPrice] = useState<number | string>(
    isInitialPromo ? Number(initialProduct?.price) : ""
  );
  const [promoDurationNote, setPromoDurationNote] = useState<string>("");

  const currency = store.currency || "IDR";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      showToast("Product title is required", "error");
      return;
    }

    if (Number(price) < 0) {
      showToast("Selling price cannot be negative", "error");
      return;
    }

    if (checkoutMode === "EXTERNAL_LINK" && !externalUrl.trim()) {
      showToast("Please enter destination URL for affiliate/external checkout", "error");
      return;
    }

    // Assemble up to 4 images
    const images = [coverImage, galleryImage1, galleryImage2, galleryImage3].filter(
      (img): img is string => typeof img === "string" && img.trim().length > 0
    );

    const parsedSlots =
      productType === "APPOINTMENT"
        ? appointmentSlotsText
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : undefined;

    startTransition(async () => {
      const res = await actionSaveProduct({
        storeId: store.id,
        productId: initialProduct?.id,
        title: title.trim(),
        description: description.trim(),
        category,
        productType,
        images,
        price: Number(price),
        compareAtPrice: compareAtPrice ? Number(compareAtPrice) : null,
        checkoutMode,
        externalPlatform: checkoutMode === "EXTERNAL_LINK" ? (externalPlatform as any) : null,
        externalUrl: checkoutMode === "EXTERNAL_LINK" ? externalUrl.trim() : null,
        digitalFileUrl: digitalFileUrl.trim() || null,
        chatMessage: checkoutMode === "CHAT_ORDER" ? chatMessage.trim() : null,
        isActive,
        isFeatured,
        stock: stock.trim() !== "" ? Number(stock) : null,
        isPreOrder,
        poNote: isPreOrder ? poNote.trim() || null : null,
        variants: variants.filter((v) => v.name.trim().length > 0 && Number(v.price) >= 0),
        promoActive,
        promoPrice: promoActive && promoPrice ? Number(promoPrice) : null,
        promoDurationNote,
        courseModules:
          productType === "COURSE"
            ? courseModules.filter((m) => m.title.trim().length > 0)
            : undefined,
        appointmentDuration:
          productType === "APPOINTMENT" ? Number(appointmentDuration) || 45 : undefined,
        appointmentSlots: parsedSlots,
        eventDate: productType === "EVENT_WEBINAR" ? eventDate || null : undefined,
        eventLocation: productType === "EVENT_WEBINAR" ? eventLocation.trim() || null : undefined,
      });

      if (res.success) {
        showToast(
          mode === "create"
            ? "Product created successfully!"
            : "Product updated successfully!",
          "success"
        );
        router.push("/admin/products");
        router.refresh();
      } else {
        showToast(res.error || "Failed to save product", "error");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in w-full pb-20">
      {/* 1. Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#E7E5E4]">
        <div className="space-y-1">
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#78716C] hover:text-[#1C1917] transition group mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to All Products</span>
          </Link>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1917]">
              {mode === "create" ? "Add New Product" : `Edit Product: ${initialProduct?.title}`}
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FDF0EC] text-[#D94E28] border border-[#FADCD3]">
              {currency}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#57534E]">
            {mode === "create"
              ? "Publish a new digital asset, physical item, or consultation service to your storefront."
              : "Update product pricing, media attachments, and checkout configuration."}
          </p>
        </div>

        {/* Top Action Button */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <Link
            href="/admin/products"
            className="px-4 py-2.5 rounded-xl border border-[#E7E5E4] hover:bg-stone-50 text-xs font-semibold text-[#1C1917] transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-2.5 rounded-xl bg-[#D94E28] hover:bg-[#B83E1D] text-white text-xs font-bold shadow-xs transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{mode === "create" ? "Save Product" : "Save Changes"}</span>
          </button>
        </div>
      </div>

      {/* 2. Structured Two-Column Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Main Column (2/3 Width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card 1: Basic Information */}
          <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8 space-y-5 shadow-xs">
            <div className="flex items-center gap-2 border-b border-[#E7E5E4] pb-4">
              <Package className="w-4 h-4 text-[#D94E28]" />
              <h2 className="text-sm font-bold text-[#1C1917] uppercase tracking-wider">
                Basic Information
              </h2>
            </div>

            <div className="space-y-4">
              {/* Product Title */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#1C1917]">
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Masterclass Notion Template OS"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E7E5E4] font-semibold text-[#1C1917] focus:border-[#D94E28] focus:ring-1 focus:ring-[#D94E28] outline-none"
                />
              </div>

              {/* Category & Product Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#1C1917]">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => {
                      const val = e.target.value;
                      setCategory(val);
                      const CATEGORY_TO_FULFILLMENT: [string, string][] = [
                        ["Digital Product", "DIGITAL"],
                        ["Physical Goods", "PHYSICAL"],
                        ["Service / Consultation", "APPOINTMENT"],
                        ["Course / Video", "COURSE"],
                        ["Event / Ticket", "EVENT_WEBINAR"],
                      ];
                      const match = CATEGORY_TO_FULFILLMENT.find(([p]) =>
                        val.startsWith(p)
                      );
                      if (match) setProductType(match[1]);
                    }}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E7E5E4] bg-white font-semibold text-[#1C1917] focus:border-[#D94E28] outline-none cursor-pointer"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#1C1917]">
                    Fulfillment Type
                  </label>
                  <select
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E7E5E4] bg-white font-semibold text-[#1C1917] focus:border-[#D94E28] outline-none cursor-pointer"
                  >
                    <option value="DIGITAL">Digital Item (Instant Download / Link)</option>
                    <option value="PHYSICAL">Physical Parcel (Courier Delivery)</option>
                    <option value="APPOINTMENT">Service / 1-on-1 Consultation Booking</option>
                    <option value="COURSE">Video Course / LMS Module</option>
                    <option value="EVENT_WEBINAR">Event / Ticket Pass</option>
                    <option value="AFFILIATE_LINK">Affiliate Recommendation</option>
                    <option value="SUPPORT_TIP">Creator Support / Tip</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#1C1917]">
                  Product Description
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your product deliverables, key benefits, technical specs, or download instructions..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E7E5E4] text-[#1C1917] focus:border-[#D94E28] focus:ring-1 focus:ring-[#D94E28] outline-none leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Product Media (Image Upload Dropzones) */}
          <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8 space-y-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E7E5E4] pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D94E28]" />
                <h2 className="text-sm font-bold text-[#1C1917] uppercase tracking-wider">
                  Product Media (Up to 4 Photos)
                </h2>
              </div>
              <span className="text-[11px] text-[#78716C]">
                First photo is the cover thumbnail
              </span>
            </div>

            {/* Primary Cover Image Dropzone */}
            <div className="space-y-1.5">
              <ImageUploadDropzone
                label="1. Primary Cover Image *"
                value={coverImage}
                onChange={setCoverImage}
                folder="product"
                aspectRatio="product"
                helperText="Main photo shown on catalog grids (Square 1:1 or 4:3 recommended, max 5MB)"
              />
            </div>

            {/* Gallery Images (Slots 2, 3, 4) */}
            <div className="pt-2 border-t border-[#E7E5E4] space-y-3">
              <label className="block text-xs font-bold text-[#1C1917]">
                Additional Gallery Photos (Optional)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <ImageUploadDropzone
                  label="Photo 2"
                  value={galleryImage1}
                  onChange={setGalleryImage1}
                  folder="product"
                  aspectRatio="product"
                />
                <ImageUploadDropzone
                  label="Photo 3"
                  value={galleryImage2}
                  onChange={setGalleryImage2}
                  folder="product"
                  aspectRatio="product"
                />
                <ImageUploadDropzone
                  label="Photo 4"
                  value={galleryImage3}
                  onChange={setGalleryImage3}
                  folder="product"
                  aspectRatio="product"
                />
              </div>
            </div>
          </div>

          {/* Card 3: Pricing & Checkout Method */}
          <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E7E5E4] pb-4">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#D94E28]" />
                <h2 className="text-sm font-bold text-[#1C1917] uppercase tracking-wider">
                  Pricing &amp; Checkout Method
                </h2>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                Currency: {currency}
              </span>
            </div>

            {/* Price Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#1C1917]">
                  Selling Price ({currency}) *
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="50000"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-mono font-bold text-[#1C1917] rounded-xl border border-[#E7E5E4] focus:border-[#D94E28] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#78716C]">
                  Original Price (Crossed Out)
                </label>
                <input
                  type="number"
                  min="0"
                  value={compareAtPrice}
                  onChange={(e) => setCompareAtPrice(e.target.value)}
                  placeholder="e.g. 150000"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-mono font-bold text-[#1C1917] placeholder:font-normal placeholder:text-[#A8A29E] rounded-xl border border-[#E7E5E4] focus:border-[#D94E28] outline-none"
                />
              </div>
            </div>

            {/* Primary Checkout Selector Cards */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold text-[#1C1917]">
                Primary Checkout Method
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* 1. Order by Chat */}
                <div
                  onClick={() => setCheckoutMode("CHAT_ORDER")}
                  className={`p-4 rounded-2xl border-2 transition cursor-pointer flex flex-col justify-between ${
                    checkoutMode === "CHAT_ORDER"
                      ? "border-emerald-600 bg-emerald-50/50 shadow-xs ring-1 ring-emerald-600/20"
                      : "border-[#E7E5E4] bg-white hover:border-emerald-400"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    {checkoutMode === "CHAT_ORDER" && (
                      <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#1C1917]">
                      Order by Chat
                    </h3>
                    <span className="text-[10px] font-bold text-emerald-700 uppercase">
                      0% Commission Fee
                    </span>
                    <p className="text-[11px] text-[#78716C] mt-1">
                      Closes sales via WhatsApp with auto pre-filled greeting.
                    </p>
                  </div>
                </div>

                {/* 2. Instant QRIS */}
                <div
                  onClick={() => setCheckoutMode("DIRECT_CHECKOUT")}
                  className={`p-4 rounded-2xl border-2 transition cursor-pointer flex flex-col justify-between ${
                    checkoutMode === "DIRECT_CHECKOUT"
                      ? "border-[#D94E28] bg-[#FDF0EC]/50 shadow-xs ring-1 ring-[#D94E28]/20"
                      : "border-[#E7E5E4] bg-white hover:border-[#D94E28]/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-xl bg-[#FDF0EC] text-[#D94E28] flex items-center justify-center">
                      <QrCode className="w-4 h-4" />
                    </div>
                    {checkoutMode === "DIRECT_CHECKOUT" && (
                      <span className="w-2 h-2 rounded-full bg-[#D94E28]" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#1C1917]">
                      Instant QRIS
                    </h3>
                    <span className="text-[10px] font-bold text-[#D94E28] uppercase">
                      Automated Checkout
                    </span>
                    <p className="text-[11px] text-[#78716C] mt-1">
                      Direct scan payment with instant file access.
                    </p>
                  </div>
                </div>

                {/* 3. External / Affiliate Link */}
                <div
                  onClick={() => setCheckoutMode("EXTERNAL_LINK")}
                  className={`p-4 rounded-2xl border-2 transition cursor-pointer flex flex-col justify-between ${
                    checkoutMode === "EXTERNAL_LINK"
                      ? "border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-600/20"
                      : "border-[#E7E5E4] bg-white hover:border-blue-400"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                    {checkoutMode === "EXTERNAL_LINK" && (
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#1C1917]">
                      Affiliate / External
                    </h3>
                    <span className="text-[10px] font-bold text-blue-700 uppercase">
                      Redirect Link
                    </span>
                    <p className="text-[11px] text-[#78716C] mt-1">
                      Redirect buyers to TikTok Shop, Shopee, or custom URL.
                    </p>
                  </div>
                </div>
              </div>

              {/* Conditional Sub-Inputs */}
              {checkoutMode === "CHAT_ORDER" && (
                <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-2xl space-y-1.5 animate-fade-in">
                  <label className="block text-xs font-bold text-emerald-900">
                    Pre-filled WhatsApp Message
                  </label>
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Halo, saya mau pesan produk ini dari etalase Anda!"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-emerald-300 bg-white font-medium text-[#1C1917] outline-none"
                  />
                  <p className="text-[11px] text-emerald-700">
                    Sent automatically when customer taps &quot;Order by WhatsApp&quot; on your storefront.
                  </p>
                </div>
              )}

              {checkoutMode === "EXTERNAL_LINK" && (
                <div className="p-4 bg-blue-50/50 border border-blue-200 rounded-2xl space-y-3 animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-blue-900">
                        Target Platform
                      </label>
                      <select
                        value={externalPlatform}
                        onChange={(e) => setExternalPlatform(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-blue-300 bg-white font-semibold text-[#1C1917] outline-none cursor-pointer"
                      >
                        <option value="TIKTOK_SHOP">TikTok Shop</option>
                        <option value="SHOPEE">Shopee</option>
                        <option value="TOKOPEDIA">Tokopedia</option>
                        <option value="LAZADA">Lazada</option>
                        <option value="CUSTOM">Custom Landing Page</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-blue-900">
                        Destination URL *
                      </label>
                      <input
                        type="url"
                        required
                        value={externalUrl}
                        onChange={(e) => setExternalUrl(e.target.value)}
                        placeholder="https://vt.tiktok.com/... or https://shopee.co.id/..."
                        className="w-full px-3 py-2 text-xs rounded-xl border border-blue-300 bg-white font-mono text-[#1C1917] outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Digital File / Download Link (for Digital Products & Courses) */}
              {(productType === "DIGITAL" || productType === "COURSE") && (
                <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-2xl space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <label className="block text-xs font-bold text-amber-950">
                      Digital Product File / Download Link (Auto-Sent After Payment)
                    </label>
                    <label className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-amber-300 text-[11px] font-bold text-amber-900 hover:bg-amber-100/60 cursor-pointer transition shrink-0">
                      {isUploadingDigital ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <Plus className="w-3 h-3" />
                      )}
                      <span>{isUploadingDigital ? "Uploading..." : "Upload File"}</span>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.zip,.rar,.mp3,.mp4,.epub,.png,.jpg,.jpeg"
                        disabled={isUploadingDigital}
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          setIsUploadingDigital(true);
                          try {
                            const formData = new FormData();
                            formData.append("file", file);
                            const resp = await fetch("/api/upload", {
                              method: "POST",
                              body: formData,
                            });
                            const json = await resp.json();
                            if (resp.ok && json.url) {
                              setDigitalFileUrl(json.url);
                              showToast("Digital file uploaded successfully!", "success");
                            } else {
                              showToast(json.error || "Failed to upload file", "error");
                            }
                          } catch {
                            showToast("An error occurred while uploading the file", "error");
                          } finally {
                            setIsUploadingDigital(false);
                          }
                        }}
                      />
                    </label>
                  </div>
                  <input
                    type="text"
                    value={digitalFileUrl}
                    onChange={(e) => setDigitalFileUrl(e.target.value)}
                    placeholder="https://drive.google.com/... or upload a file on the right"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-amber-300 bg-white font-mono text-[#1C1917] outline-none"
                  />
                  <p className="text-[11px] text-amber-800">
                    Buyers will automatically receive access to this file or link once their QRIS or PayPal payment is settled.
                  </p>
                </div>
              )}

              {/* Consultation Booking Schedule Settings */}
              {productType === "APPOINTMENT" && (
                <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-2xl space-y-3">
                  <div className="text-xs font-bold text-emerald-950">
                    1-on-1 Consultation Booking Settings
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-emerald-900 mb-1">
                        Duration (Minutes)
                      </label>
                      <input
                        type="number"
                        min={15}
                        max={240}
                        value={appointmentDuration}
                        onChange={(e) => setAppointmentDuration(Number(e.target.value))}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-emerald-300 bg-white font-mono text-[#1C1917]"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-emerald-900 mb-1">
                        Available Slots (comma-separated)
                      </label>
                      <input
                        type="text"
                        value={appointmentSlotsText}
                        onChange={(e) => setAppointmentSlotsText(e.target.value)}
                        placeholder="Tomorrow 10:00 WIB, Tomorrow 14:00 WIB"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-emerald-300 bg-white text-[#1C1917]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Pre-Order (PO), Kuota Stok & Varian Ukuran */}
              <div className="p-4 bg-[#FAF8F5] border border-[#E7E5E4] rounded-2xl space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold text-[#1C1917]">
                      Pre-Order (PO), Kuota &amp; Varian Produk
                    </div>
                    <p className="text-[11px] text-[#57534E]">
                      Opsional: cocok untuk jualan kue kering, hampers, atau produk dengan ukuran/batch kirim.
                    </p>
                  </div>
                  <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#1C1917]">
                    <input
                      type="checkbox"
                      checked={isPreOrder}
                      onChange={(e) => setIsPreOrder(e.target.checked)}
                      className="rounded border-[#D6D3D1] text-[#D94E28] focus:ring-[#D94E28]"
                    />
                    <span>Produk Pre-Order (PO)</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#57534E] mb-1">
                      Kuota / Stok Tersedia (opsional)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      placeholder="Kosongkan jika unlimited"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7E5E4] bg-white text-[#1C1917]"
                    />
                  </div>
                  {isPreOrder && (
                    <div>
                      <label className="block text-[11px] font-bold text-[#57534E] mb-1">
                        Jadwal / Estimasi Kirim PO
                      </label>
                      <input
                        type="text"
                        value={poNote}
                        onChange={(e) => setPoNote(e.target.value)}
                        placeholder="Contoh: Batch 1 kirim 18 Des / PO H-3"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7E5E4] bg-white text-[#1C1917]"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#57534E]">
                      Varian Ukuran / Paket (opsional)
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setVariants([...variants, { name: "", price: Number(price) || 0 }])
                      }
                      className="text-[11px] font-bold text-[#D94E28] hover:underline"
                    >
                      + Tambah Varian
                    </button>
                  </div>
                  {variants.map((v, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                      <input
                        type="text"
                        value={v.name}
                        onChange={(e) => {
                          const next = [...variants];
                          next[idx] = { ...next[idx], name: e.target.value };
                          setVariants(next);
                        }}
                        placeholder="Misal: Toples 500gr"
                        className="col-span-6 px-3 py-1.5 text-xs rounded-xl border border-[#E7E5E4] bg-white text-[#1C1917]"
                      />
                      <input
                        type="number"
                        min={0}
                        value={v.price}
                        onChange={(e) => {
                          const next = [...variants];
                          next[idx] = { ...next[idx], price: Number(e.target.value) };
                          setVariants(next);
                        }}
                        placeholder="Harga"
                        className="col-span-4 px-3 py-1.5 text-xs rounded-xl border border-[#E7E5E4] bg-white font-mono text-[#1C1917]"
                      />
                      <button
                        type="button"
                        onClick={() => setVariants(variants.filter((_, i) => i !== idx))}
                        className="col-span-2 text-[11px] text-rose-600 hover:underline font-semibold"
                      >
                        Hapus
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Event / Webinar Date & Location */}
              {productType === "EVENT_WEBINAR" && (
                <div className="p-4 bg-purple-50/50 border border-purple-200 rounded-2xl space-y-3">
                  <div className="text-xs font-bold text-purple-950">
                    Event / Webinar Details
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-purple-900 mb-1">
                        Event Date &amp; Time
                      </label>
                      <input
                        type="datetime-local"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-purple-300 bg-white text-[#1C1917]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-purple-900 mb-1">
                        Venue or Meeting Link
                      </label>
                      <input
                        type="text"
                        value={eventLocation}
                        onChange={(e) => setEventLocation(e.target.value)}
                        placeholder="https://zoom.us/j/... or Venue Address"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-purple-300 bg-white text-[#1C1917]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Video Course Modules */}
              {productType === "COURSE" && (
                <div className="p-4 bg-sky-50/50 border border-sky-200 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-950">
                      Course Curriculum Modules ({courseModules.length})
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setCourseModules((prev) => [
                          ...prev,
                          {
                            id: `mod-${Date.now()}`,
                            title: "",
                            duration: "10:00",
                            videoUrl: "",
                            isFreePreview: prev.length === 0,
                          },
                        ])
                      }
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-sky-300 text-[11px] font-bold text-sky-900 hover:bg-sky-100/60"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Module</span>
                    </button>
                  </div>

                  {courseModules.length === 0 && (
                    <p className="text-[11px] text-sky-800">
                      Add video modules here so paid buyers can unlock them in your Member Area.
                    </p>
                  )}

                  <div className="space-y-2.5">
                    {courseModules.map((mod, idx) => (
                      <div key={mod.id} className="p-3 bg-white rounded-xl border border-sky-200 space-y-2">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder={`Module ${idx + 1} Title`}
                            value={mod.title}
                            onChange={(e) => {
                              const val = e.target.value;
                              setCourseModules((prev) =>
                                prev.map((item, i) => (i === idx ? { ...item, title: val } : item))
                              );
                            }}
                            className="flex-1 px-2.5 py-1.5 text-xs rounded-lg border border-stone-200"
                          />
                          <input
                            type="text"
                            placeholder="Duration"
                            value={mod.duration}
                            onChange={(e) => {
                              const val = e.target.value;
                              setCourseModules((prev) =>
                                prev.map((item, i) => (i === idx ? { ...item, duration: val } : item))
                              );
                            }}
                            className="w-20 px-2.5 py-1.5 text-xs rounded-lg border border-stone-200 font-mono"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setCourseModules((prev) => prev.filter((_, i) => i !== idx))
                            }
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <input
                            type="url"
                            placeholder="https://youtube.com/... or Vimeo/Drive video URL"
                            value={mod.videoUrl}
                            onChange={(e) => {
                              const val = e.target.value;
                              setCourseModules((prev) =>
                                prev.map((item, i) => (i === idx ? { ...item, videoUrl: val } : item))
                              );
                            }}
                            className="flex-1 px-2.5 py-1.5 text-xs rounded-lg border border-stone-200 font-mono"
                          />
                          <label className="flex items-center gap-1.5 text-[11px] text-stone-700 shrink-0">
                            <input
                              type="checkbox"
                              checked={mod.isFreePreview}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setCourseModules((prev) =>
                                  prev.map((item, i) =>
                                    i === idx ? { ...item, isFreePreview: checked } : item
                                  )
                                );
                              }}
                            />
                            <span>Free Preview</span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar Column (1/3 Width) */}
        <div className="lg:col-span-1 space-y-6">
          {/* Card 1: Visibility & Promotion */}
          <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 space-y-5 shadow-xs">
            <h2 className="text-xs font-bold text-[#1C1917] uppercase tracking-wider flex items-center gap-1.5 border-b border-[#E7E5E4] pb-3">
              <Eye className="w-3.5 h-3.5 text-[#D94E28]" />
              <span>Visibility &amp; Promotion</span>
            </h2>

            {/* Visible on Storefront Toggle */}
            <label className="flex items-start justify-between gap-3 cursor-pointer select-none">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-[#1C1917]">
                  Visible on Storefront
                </span>
                <p className="text-[11px] text-[#78716C] leading-relaxed">
                  Toggle on to display this product in your public catalog.
                </p>
              </div>
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="mt-1 w-4 h-4 accent-[#D94E28] rounded cursor-pointer"
              />
            </label>

            {/* Featured Item Toggle */}
            <label className="flex items-start justify-between gap-3 pt-3 border-t border-[#E7E5E4] cursor-pointer select-none">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-[#1C1917] flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span>Featured Hero Highlight</span>
                </span>
                <p className="text-[11px] text-[#78716C] leading-relaxed">
                  Pins this item to the top featured banner slot of your storefront.
                </p>
              </div>
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="mt-1 w-4 h-4 accent-[#D94E28] rounded cursor-pointer"
              />
            </label>
          </div>

          {/* Card 2: Flash Sale / Promo Discount */}
          <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 space-y-4 shadow-xs">
            <h2 className="text-xs font-bold text-[#1C1917] uppercase tracking-wider flex items-center gap-1.5 border-b border-[#E7E5E4] pb-3">
              <Zap className="w-3.5 h-3.5 text-rose-600" />
              <span>Flash Sale / Promo</span>
            </h2>

            <label className="flex items-start justify-between gap-3 cursor-pointer select-none">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-rose-700">
                  Enable Promo Discount
                </span>
                <p className="text-[11px] text-[#78716C] leading-relaxed">
                  Displays discounted price tag &amp; countdown banner.
                </p>
              </div>
              <input
                type="checkbox"
                checked={promoActive}
                onChange={(e) => setPromoActive(e.target.checked)}
                className="mt-1 w-4 h-4 accent-rose-600 rounded cursor-pointer"
              />
            </label>

            {promoActive && (
              <div className="space-y-3 pt-2 animate-fade-in border-t border-rose-100">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#1C1917]">
                    Discounted Promo Price ({currency}) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    required={promoActive}
                    value={promoPrice}
                    onChange={(e) => setPromoPrice(e.target.value)}
                    placeholder="e.g. 29000"
                    className="w-full px-3.5 py-2 text-xs font-mono font-bold text-rose-600 rounded-xl border border-rose-200 bg-rose-50/50 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#78716C]">
                    Duration Note (Optional)
                  </label>
                  <input
                    type="text"
                    value={promoDurationNote}
                    onChange={(e) => setPromoDurationNote(e.target.value)}
                    placeholder="e.g. Flash Sale ends midnight"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E7E5E4] text-[#1C1917] outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Card 3: Storefront Quick Info */}
          <div className="bg-[#FAF8F5] rounded-3xl border border-[#E7E5E4] p-5 space-y-3">
            <h3 className="text-xs font-bold text-[#1C1917] uppercase tracking-wider">
              Storefront Preview
            </h3>
            <p className="text-xs text-[#57534E] leading-relaxed">
              Once published, buyers can find this product on your live storefront:
            </p>
            <code className="block bg-white p-2.5 rounded-xl border border-[#E7E5E4] font-mono text-[11px] break-all text-[#D94E28]">
              https://{store.slug}.etalase.online
            </code>
          </div>
        </div>
      </div>

      {/* 3. Mobile Sticky Bottom Action Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 p-4 bg-white/95 backdrop-blur-md border-t border-[#E7E5E4] flex items-center gap-3">
        <Link
          href="/admin/products"
          className="flex-1 py-3 text-center rounded-xl border border-[#E7E5E4] text-xs font-bold text-[#1C1917]"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 py-3 rounded-xl bg-[#D94E28] hover:bg-[#B83E1D] text-white text-xs font-bold shadow-xs transition flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{mode === "create" ? "Save Product" : "Save Changes"}</span>
        </button>
      </div>
    </form>
  );
}
