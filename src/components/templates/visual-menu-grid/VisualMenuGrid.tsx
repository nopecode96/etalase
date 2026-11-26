"use client";

import React, { useMemo, useState } from "react";
import { StoreTemplateProps } from "../types";
import { TopBar } from "../shared/TopBar";
import { CoverBanner } from "../shared/CoverBanner";
import { SocialLinksBar } from "../shared/SocialLinksBar";
import { PriceDisplay } from "../shared/PriceDisplay";
import {
  isDemoStoreContext,
  getStoreInitial,
  getProductDiscountPercent,
  getTemplateProductUrl,
  getTemplateProductCtaLabel,
  trackStorefrontEventClient,
} from "../shared/template-helpers";
import { Coffee, Clock, Sparkles, MessageCircle, ArrowRight, Utensils, ExternalLink, Zap } from "lucide-react";
import styles from "./VisualMenuGrid.module.css";

export const VisualMenuGrid: React.FC<StoreTemplateProps> = ({
  store,
  products = [],
  isPreview = false,
  isMockup = false,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("Semua");
  const accent = store.appearanceConfig?.accentColor || "#4A2C2A";
  const btnStyle = store.appearanceConfig?.buttonStyle || "pill";
  const btnRadiusClass =
    btnStyle === "pill" ? "rounded-full" : btnStyle === "sharp" ? "rounded-none" : "rounded-xl";
  const isDemo = isDemoStoreContext(store, isMockup);
  const isBioLinkMode = store.displayMode === "BIO_LINK";

  const avatarSrc = store.avatarUrl || (isDemo ? "/images/demo/avatar-senja.jpg" : undefined);
  const bannerSrc =
    store.appearanceConfig?.coverBannerUrl ||
    store.bannerUrl ||
    (isDemo ? "/images/demo/banner-cafe.jpg" : undefined);

  const categories = useMemo(() => {
    if (isDemo) return ["Semua", "Kopi", "Pastry", "Biji Kopi"];
    const uniqueCats = Array.from(
      new Set(products.map((p) => (p.category || "").trim()).filter(Boolean))
    );
    return uniqueCats.length > 0 ? ["Semua", ...uniqueCats] : ["Semua"];
  }, [isDemo, products]);

  const filteredProducts = products.filter((p) => {
    if (activeCategory === "Semua") return true;
    if (!isDemo) {
      return (p.category || "").trim() === activeCategory;
    }
    const titleLower = p.title.toLowerCase();
    const catLower = (p.category || "").toLowerCase();
    if (activeCategory === "Kopi")
      return titleLower.includes("kopi") || titleLower.includes("aren") || titleLower.includes("v60") || catLower.includes("kopi");
    if (activeCategory === "Pastry")
      return titleLower.includes("croissant") || titleLower.includes("pastry") || titleLower.includes("roti") || catLower.includes("pastry");
    if (activeCategory === "Biji Kopi")
      return titleLower.includes("biji") || titleLower.includes("beans") || catLower.includes("beans");
    return true;
  });

  const featuredProduct = isBioLinkMode ? undefined : products.find((p) => p.isFeatured) || products[0];
  const gridProducts = isBioLinkMode
    ? filteredProducts
    : filteredProducts.filter((p) => p.id !== featuredProduct?.id || activeCategory !== "Semua");

  const handleProductClick = (productId: string) => {
    if (!isPreview && !isMockup) {
      trackStorefrontEventClient({ storeSlug: store.slug, type: "click", productId });
    }
  };

  return (
    <div className={styles.container}>
      <TopBar slug={store.slug} isMockup={isMockup} />

      <CoverBanner
        bannerUrl={bannerSrc}
        defaultGradient="from-[#3E2723] via-[#4E342E] to-[#271510]"
        heightClass="h-32"
      />

      {/* Profile Header */}
      <div className={styles.profileSection}>
        <div className={styles.avatarWrapper}>
          {avatarSrc ? (
            <img src={avatarSrc} alt={store.name} className={styles.avatar} />
          ) : (
            <div
              className={`${styles.avatar} flex items-center justify-center text-2xl font-bold text-white`}
              style={{ backgroundColor: accent }}
            >
              {getStoreInitial(store.name)}
            </div>
          )}
          <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-xs" />
        </div>

        <div className={styles.nameRow}>
          {isMockup ? (
            <div className={styles.storeName}>{store.name}</div>
          ) : (
            <h1 className={styles.storeName}>{store.name}</h1>
          )}
          <Coffee className="w-4 h-4 text-[#D94E28] shrink-0" />
        </div>

        {isDemo && (
          <div className={styles.hoursBadge}>
            <Clock className="w-3 h-3 shrink-0" />
            <span>Buka Hari Ini 08:00 - 22:00 &bull; Order via WA</span>
          </div>
        )}

        {(store.bio || isDemo) && (
          <p className={styles.storeBio}>
            {store.bio ||
              "Kopi spesialti seduh manual & bakery fresh oven setiap pagi. Siap dine-in & takeaway via WhatsApp."}
          </p>
        )}

        <SocialLinksBar links={store.appearanceConfig?.socialLinks} accentColor={accent} />
      </div>

      {/* Storefront Content */}
      <div className={styles.contentBody}>
        {/* Demo Promo Banner Only */}
        {isDemo && (
          <div>
            <a
              href={
                isMockup
                  ? `https://${store.slug}.etalase.online`
                  : `https://wa.me/${store.chatHandle || "6281234567891"}?text=Halo%20Kopi%20Senja,%20saya%20mau%20pesan%20Paket%20Sarapan`
              }
              target={isMockup ? "_blank" : undefined}
              rel={isMockup ? "noopener noreferrer" : undefined}
              className={styles.posterBanner}
            >
              <img src="/images/demo/banner-poster-cafe.jpg" alt="Promo Spesial Paket Sarapan Hemat" />
            </a>
          </div>
        )}

        {/* Featured Hero Product Card */}
        {featuredProduct && (
          <div>
            <div className={styles.blockSectionTitle}>
              <span className="flex items-center gap-1.5 text-[#38221D] font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#D94E28]" />
                <span>{featuredProduct.isFeatured ? "Menu Unggulan" : "Pilihan Terbaik"}</span>
              </span>
              {getProductDiscountPercent(featuredProduct.price, featuredProduct.compareAtPrice) && (
                <span className="text-[10px] bg-amber-100 text-[#4A2C2A] font-bold px-2 py-0.5 rounded-full border border-amber-200">
                  Promo
                </span>
              )}
            </div>

            <div className={styles.featuredCard}>
              {(featuredProduct.images?.[0] || isDemo) && (
                <div className="relative aspect-video w-full overflow-hidden bg-stone-100">
                  <img
                    src={featuredProduct.images?.[0] || "/images/demo/product-coffee-aren.jpg"}
                    alt={featuredProduct.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-bold text-[#38221D] text-sm sm:text-base leading-snug">
                    {featuredProduct.title}
                  </h3>
                  {featuredProduct.description && (
                    <p className="text-xs text-[#6E5D53] mt-1 line-clamp-2 leading-relaxed">
                      {featuredProduct.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <PriceDisplay
                    price={featuredProduct.price}
                    compareAtPrice={featuredProduct.compareAtPrice}
                    size="lg"
                    accentColor={accent}
                  />
                </div>

                <a
                  href={getTemplateProductUrl(store, featuredProduct, isMockup)}
                  target={featuredProduct.checkoutMode === "EXTERNAL_LINK" ? "_blank" : undefined}
                  rel={featuredProduct.checkoutMode === "EXTERNAL_LINK" ? "noopener noreferrer" : undefined}
                  onClick={() => handleProductClick(featuredProduct.id)}
                  className={`w-full py-3 px-4 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition ${btnRadiusClass} cursor-pointer`}
                  style={{ backgroundColor: accent }}
                >
                  {featuredProduct.checkoutMode === "DIRECT_CHECKOUT" ? (
                    <Zap className="w-4 h-4 fill-current" />
                  ) : featuredProduct.checkoutMode === "EXTERNAL_LINK" ? (
                    <ExternalLink className="w-4 h-4" />
                  ) : (
                    <MessageCircle className="w-4 h-4 fill-current" />
                  )}
                  <span>{getTemplateProductCtaLabel(featuredProduct)}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Category Filter Pills (shown when > 1 category exists) */}
        {categories.length > 1 && (
          <div>
            <div className={styles.blockSectionTitle}>
              <span className="flex items-center gap-1.5 text-[#38221D] font-bold">
                <Utensils className="w-3.5 h-3.5 text-[#D94E28]" />
                <span>Daftar Katalog</span>
              </span>
            </div>

            <div className={styles.categoryPills}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`${styles.pillBtn} ${activeCategory === cat ? styles.pillBtnActive : ""}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Bio Link Compact Mode vs Visual Grid */}
        {isBioLinkMode ? (
          <div className="space-y-2.5">
            {gridProducts.map((item) => (
              <a
                key={item.id}
                href={getTemplateProductUrl(store, item, isMockup)}
                onClick={() => handleProductClick(item.id)}
                className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-white border border-amber-200/80 shadow-2xs"
              >
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#38221D] truncate">{item.title}</div>
                  {item.description && (
                    <div className="text-[11px] text-[#6E5D53] truncate">{item.description}</div>
                  )}
                </div>
                <PriceDisplay price={item.price} compareAtPrice={item.compareAtPrice} size="sm" accentColor={accent} />
              </a>
            ))}
          </div>
        ) : (
          <div className={styles.grid2Col}>
            {(gridProducts.length > 0 ? gridProducts : isDemo ? products : []).map((item) => (
              <div key={item.id} className={styles.menuItemCard}>
                <div className="aspect-square w-full overflow-hidden bg-stone-100 relative">
                  {item.images?.[0] || isDemo ? (
                    <img
                      src={item.images?.[0] || "/images/demo/product-croissant.jpg"}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-400 font-bold text-lg">
                      {getStoreInitial(item.title)}
                    </div>
                  )}
                </div>
                <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h4 className="font-bold text-xs text-[#38221D] line-clamp-2 leading-snug">
                      {item.title}
                    </h4>
                    <div className="mt-1">
                      <PriceDisplay price={item.price} compareAtPrice={item.compareAtPrice} size="sm" accentColor={accent} />
                    </div>
                  </div>

                  <a
                    href={getTemplateProductUrl(store, item, isMockup)}
                    target={item.checkoutMode === "EXTERNAL_LINK" ? "_blank" : undefined}
                    rel={item.checkoutMode === "EXTERNAL_LINK" ? "noopener noreferrer" : undefined}
                    onClick={() => handleProductClick(item.id)}
                    className={`w-full py-2 px-2 text-center text-[11px] font-bold text-white bg-[#38221D] hover:bg-black transition flex items-center justify-center gap-1 ${btnRadiusClass} cursor-pointer`}
                  >
                    <span>
                      {item.checkoutMode === "CHAT_ORDER"
                        ? "Pesan"
                        : item.checkoutMode === "EXTERNAL_LINK"
                        ? "Buka"
                        : "Beli"}
                    </span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
