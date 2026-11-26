"use client";

import React from "react";
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
  getProductTypeBadgeLabel,
  trackStorefrontEventClient,
} from "../shared/template-helpers";
import { CheckCircle2, Zap, ArrowRight, Sparkles, ExternalLink, MessageCircle } from "lucide-react";
import styles from "./CleanMinimal.module.css";

export const CleanMinimal: React.FC<StoreTemplateProps> = ({
  store,
  products = [],
  isPreview = false,
  isMockup = false,
}) => {
  const accent = store.appearanceConfig?.accentColor || "#D94E28";
  const btnStyle = store.appearanceConfig?.buttonStyle || "rounded";
  const btnRadiusClass =
    btnStyle === "pill" ? "rounded-full" : btnStyle === "sharp" ? "rounded-none" : "rounded-xl";
  const isDemo = isDemoStoreContext(store, isMockup);
  const isBioLinkMode = store.displayMode === "BIO_LINK";

  const avatarSrc = store.avatarUrl || (isDemo ? "/images/demo/avatar-rafa.jpg" : undefined);
  const bannerSrc =
    store.appearanceConfig?.coverBannerUrl ||
    store.bannerUrl ||
    (isDemo ? "/images/demo/banner-creator.jpg" : undefined);

  const featuredProduct = isBioLinkMode ? undefined : products.find((p) => p.isFeatured) || products[0];
  const remainingProducts = isBioLinkMode
    ? products
    : products.filter((p) => p.id !== featuredProduct?.id);
  const compactProducts = isBioLinkMode ? remainingProducts : remainingProducts.slice(0, 2);
  const gridProducts = isBioLinkMode ? [] : remainingProducts.slice(2);

  const handleProductClick = (productId: string) => {
    if (!isPreview && !isMockup) {
      trackStorefrontEventClient({ storeSlug: store.slug, type: "click", productId });
    }
  };

  const renderCtaIcon = (checkoutMode: string) => {
    if (checkoutMode === "EXTERNAL_LINK") return <ExternalLink className="w-4 h-4" />;
    if (checkoutMode === "CHAT_ORDER") return <MessageCircle className="w-4 h-4" />;
    return <Zap className="w-4 h-4 fill-current" />;
  };

  const featuredDiscount = featuredProduct
    ? getProductDiscountPercent(featuredProduct.price, featuredProduct.compareAtPrice)
    : null;

  return (
    <div className={styles.container}>
      <TopBar slug={store.slug} isMockup={isMockup} />

      <CoverBanner
        bannerUrl={bannerSrc}
        defaultGradient="from-[#134E4A] via-[#115E59] to-[#042F2E]"
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
          <CheckCircle2 className="w-4 h-4 text-[#D94E28] shrink-0" />
        </div>

        {(store.bio || isDemo) && (
          <p className={styles.storeBio}>
            {store.bio ||
              "Digital Creator & Video Editor. Berbagi preset cinematic & panduan workflow editing."}
          </p>
        )}

        <SocialLinksBar links={store.appearanceConfig?.socialLinks} accentColor={accent} />
      </div>

      {/* Storefront Content */}
      <div className={styles.contentBody}>
        {products.length === 0 && !isDemo && (
          <div className="bg-white rounded-2xl border border-stone-200 p-6 text-center text-xs text-stone-500">
            Katalog produk sedang disiapkan. Hubungi kami via media sosial di atas.
          </div>
        )}

        {/* Featured Hero Product Card */}
        {featuredProduct && (
          <div>
            <div className={styles.blockSectionTitle}>
              <span className="flex items-center gap-1.5 text-stone-900 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#D94E28]" />
                <span>{featuredProduct.isFeatured ? "Produk Unggulan" : "Produk Terbaru"}</span>
              </span>
              {featuredDiscount && (
                <span className="text-[10px] bg-[#FDF0EC] text-[#D94E28] font-bold px-2 py-0.5 rounded-full border border-[#FADCD3]">
                  Diskon {featuredDiscount}%
                </span>
              )}
            </div>

            <div className={styles.featuredCard}>
              {featuredProduct.images?.[0] || isDemo ? (
                <div className="relative aspect-video w-full overflow-hidden bg-stone-100">
                  <img
                    src={featuredProduct.images?.[0] || "/images/demo/product-preset.jpg"}
                    alt={featuredProduct.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">
                    {getProductTypeBadgeLabel(featuredProduct.productType)}
                  </div>
                </div>
              ) : null}

              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-bold text-stone-900 text-sm sm:text-base leading-snug">
                    {featuredProduct.title}
                  </h3>
                  {featuredProduct.description && (
                    <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed font-normal">
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
                  <span className="text-[10px] text-stone-700 bg-stone-100 border border-stone-200 font-bold px-2 py-0.5 rounded-md">
                    {featuredProduct.checkoutMode === "CHAT_ORDER"
                      ? "Auto WA"
                      : featuredProduct.checkoutMode === "EXTERNAL_LINK"
                      ? "Marketplace"
                      : "QRIS / PayPal"}
                  </span>
                </div>

                <a
                  href={getTemplateProductUrl(store, featuredProduct, isMockup)}
                  target={featuredProduct.checkoutMode === "EXTERNAL_LINK" ? "_blank" : undefined}
                  rel={featuredProduct.checkoutMode === "EXTERNAL_LINK" ? "noopener noreferrer" : undefined}
                  onClick={() => handleProductClick(featuredProduct.id)}
                  className={`w-full py-3 px-4 bg-[#D94E28] hover:bg-[#B83E1D] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition ${btnRadiusClass} cursor-pointer`}
                  style={{ backgroundColor: accent }}
                >
                  {renderCtaIcon(featuredProduct.checkoutMode)}
                  <span>{getTemplateProductCtaLabel(featuredProduct)}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Compact Strip */}
        {compactProducts.length > 0 && (
          <div>
            <div className={styles.blockSectionTitle}>
              <span>{isBioLinkMode ? "Daftar Tautan & Produk" : "Pilihan Lainnya"}</span>
            </div>

            <div className="space-y-2.5">
              {compactProducts.map((item) => (
                <a
                  key={item.id}
                  href={getTemplateProductUrl(store, item, isMockup)}
                  target={item.checkoutMode === "EXTERNAL_LINK" ? "_blank" : undefined}
                  rel={item.checkoutMode === "EXTERNAL_LINK" ? "noopener noreferrer" : undefined}
                  onClick={() => handleProductClick(item.id)}
                  className={styles.compactStrip}
                >
                  {item.images?.[0] || isDemo ? (
                    <img
                      src={item.images?.[0] || "/images/demo/product-ebook.jpg"}
                      alt={item.title}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 bg-stone-100"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-xl bg-stone-100 text-stone-500 font-bold text-xs flex items-center justify-center shrink-0">
                      {getStoreInitial(item.title)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm text-stone-900 truncate">
                      {item.title}
                    </h4>
                    {item.description && (
                      <p className="text-[11px] text-stone-500 truncate mt-0.5">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <div className="shrink-0 text-right">
                    <PriceDisplay
                      price={item.price}
                      compareAtPrice={item.compareAtPrice}
                      size="sm"
                      accentColor={accent}
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Demo Only Poster Banner */}
        {isDemo && (
          <div>
            <a
              href={
                isMockup
                  ? `https://${store.slug}.etalase.online`
                  : `https://wa.me/${store.chatHandle || "6281234567890"}?text=Halo%20Rafa,%20saya%20mau%20klaim%20bonus%20video`
              }
              target={isMockup ? "_blank" : undefined}
              rel={isMockup ? "noopener noreferrer" : undefined}
              className={styles.posterBanner}
            >
              <img src="/images/demo/banner-poster-creator.jpg" alt="Promo Spesial Canva Poster" />
            </a>
          </div>
        )}

        {/* 2-Column Visual Grid */}
        {gridProducts.length > 0 && (
          <div>
            <div className={styles.blockSectionTitle}>
              <span>Katalog Produk</span>
            </div>

            <div className={styles.grid2Col}>
              {gridProducts.map((item) => {
                const disc = getProductDiscountPercent(item.price, item.compareAtPrice);
                return (
                  <div key={item.id} className={styles.gridCard}>
                    <div className="aspect-square w-full overflow-hidden bg-stone-100 relative">
                      {item.images?.[0] || isDemo ? (
                        <img
                          src={item.images?.[0] || "/images/demo/product-mic.jpg"}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-stone-400 font-bold text-lg">
                          {getStoreInitial(item.title)}
                        </div>
                      )}
                      {disc && (
                        <span className="absolute top-1.5 right-1.5 bg-rose-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                          -{disc}%
                        </span>
                      )}
                    </div>
                    <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                      <div>
                        <h4 className="font-bold text-xs text-stone-900 line-clamp-2 leading-snug">
                          {item.title}
                        </h4>
                        <div className="mt-1">
                          <PriceDisplay
                            price={item.price}
                            compareAtPrice={item.compareAtPrice}
                            size="sm"
                            accentColor={accent}
                          />
                        </div>
                      </div>

                      <a
                        href={getTemplateProductUrl(store, item, isMockup)}
                        target={item.checkoutMode === "EXTERNAL_LINK" ? "_blank" : undefined}
                        rel={item.checkoutMode === "EXTERNAL_LINK" ? "noopener noreferrer" : undefined}
                        onClick={() => handleProductClick(item.id)}
                        className={`w-full py-2 px-2 text-center text-[11px] font-bold text-white bg-stone-900 hover:bg-black transition flex items-center justify-center gap-1 ${btnRadiusClass} cursor-pointer`}
                      >
                        <span>
                          {item.checkoutMode === "EXTERNAL_LINK" ? "Beli di Toko" : "Detail"}
                        </span>
                        {item.checkoutMode === "EXTERNAL_LINK" ? (
                          <ExternalLink className="w-3 h-3" />
                        ) : (
                          <ArrowRight className="w-3 h-3" />
                        )}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
