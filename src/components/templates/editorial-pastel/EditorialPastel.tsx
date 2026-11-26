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
  trackStorefrontEventClient,
} from "../shared/template-helpers";
import { Sparkles, Heart, ExternalLink, ArrowRight, ShoppingBag, Zap, MessageCircle } from "lucide-react";
import styles from "./EditorialPastel.module.css";

export const EditorialPastel: React.FC<StoreTemplateProps> = ({
  store,
  products = [],
  isPreview = false,
  isMockup = false,
}) => {
  const accent = store.appearanceConfig?.accentColor || "#D94E28";
  const btnStyle = store.appearanceConfig?.buttonStyle || "pill";
  const btnRadiusClass =
    btnStyle === "pill" ? "rounded-full" : btnStyle === "sharp" ? "rounded-none" : "rounded-xl";
  const isDemo = isDemoStoreContext(store, isMockup);
  const isBioLinkMode = store.displayMode === "BIO_LINK";

  const avatarSrc = store.avatarUrl || (isDemo ? "/images/demo/avatar-aisyah.jpg" : undefined);
  const bannerSrc =
    store.appearanceConfig?.coverBannerUrl ||
    store.bannerUrl ||
    (isDemo ? "/images/demo/banner-beauty.jpg" : undefined);

  const featuredProduct = isBioLinkMode ? undefined : products.find((p) => p.isFeatured) || products[0];
  const remaining = isBioLinkMode ? products : products.filter((p) => p.id !== featuredProduct?.id);
  const compactProduct = isBioLinkMode
    ? undefined
    : remaining.find((p) => p.productType === "DIGITAL") || remaining[0];
  const gridProducts = isBioLinkMode
    ? products
    : remaining.filter((p) => p.id !== compactProduct?.id);

  const handleProductClick = (productId: string) => {
    if (!isPreview && !isMockup) {
      trackStorefrontEventClient({ storeSlug: store.slug, type: "click", productId });
    }
  };

  const getPlatformBadge = (platform?: string | null) => {
    if (platform === "TIKTOK_SHOP") {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-900 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-full">
          <span>🟡</span> TikTok Shop
        </span>
      );
    }
    if (platform === "SHOPEE") {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-orange-900 bg-orange-100 border border-orange-200 px-2 py-0.5 rounded-full">
          <span>🟠</span> Shopee
        </span>
      );
    }
    if (platform === "LAZADA") {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-900 bg-blue-100 border border-blue-200 px-2 py-0.5 rounded-full">
          <span>🔵</span> Lazada
        </span>
      );
    }
    return null;
  };

  return (
    <div className={styles.container}>
      <TopBar slug={store.slug} isMockup={isMockup} />

      <CoverBanner
        bannerUrl={bannerSrc}
        defaultGradient="from-[#FFE4E6] via-[#FECDD3] to-[#FDE8E1]"
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
          <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-rose-500 border-2 border-white shadow-xs" />
        </div>

        <div className={styles.nameRow}>
          {isMockup ? (
            <div className={styles.storeName}>{store.name}</div>
          ) : (
            <h1 className={styles.storeName}>{store.name}</h1>
          )}
          <Sparkles className="w-4 h-4 text-[#D94E28] shrink-0" />
        </div>

        {isDemo && (
          <div className={styles.badgeEditorial}>
            <Heart className="w-3 h-3 shrink-0 fill-current" />
            <span>Beauty, Hijab &amp; Skincare Favorit &bull; Racun Shopee &amp; TikTok</span>
          </div>
        )}

        {(store.bio || isDemo) && (
          <p className={styles.storeBio}>
            {store.bio ||
              "Rekomendasi harian skincare, hijab, & makeup yang beneran dipakai & worth to buy. Dapatkan link voucher diskon sebelum checkout! ✨"}
          </p>
        )}

        <SocialLinksBar links={store.appearanceConfig?.socialLinks} accentColor={accent} />
      </div>

      {/* Storefront Content */}
      <div className={styles.contentBody}>
        {/* Featured Card */}
        {featuredProduct && (
          <div>
            <div className={styles.blockSectionTitle}>
              <span className="flex items-center gap-1.5 text-stone-900 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#D94E28]" />
                <span>{featuredProduct.isFeatured ? "Pilihan Utama" : "Produk Terbaru"}</span>
              </span>
              {getProductDiscountPercent(featuredProduct.price, featuredProduct.compareAtPrice) && (
                <span className="text-[10px] bg-[#FDF0EC] text-[#D94E28] font-bold px-2 py-0.5 rounded-full border border-[#FADCD3]">
                  Diskon {getProductDiscountPercent(featuredProduct.price, featuredProduct.compareAtPrice)}%
                </span>
              )}
            </div>

            <div className={styles.featuredCard}>
              {(featuredProduct.images?.[0] || isDemo) && (
                <div className="relative aspect-video w-full overflow-hidden bg-rose-50">
                  <img
                    src={featuredProduct.images?.[0] || "/images/demo/product-serum.jpg"}
                    alt={featuredProduct.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-bold text-stone-900 text-sm sm:text-base leading-snug">
                    {featuredProduct.title}
                  </h3>
                  {featuredProduct.description && (
                    <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
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
                  {getPlatformBadge(featuredProduct.externalPlatform)}
                </div>

                <a
                  href={getTemplateProductUrl(store, featuredProduct, isMockup)}
                  target={featuredProduct.checkoutMode === "EXTERNAL_LINK" ? "_blank" : undefined}
                  rel={featuredProduct.checkoutMode === "EXTERNAL_LINK" ? "noopener noreferrer" : undefined}
                  onClick={() => handleProductClick(featuredProduct.id)}
                  className={`w-full py-3 px-4 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition ${btnRadiusClass} cursor-pointer`}
                  style={{ backgroundColor: accent }}
                >
                  {featuredProduct.checkoutMode === "EXTERNAL_LINK" ? (
                    <ShoppingBag className="w-4 h-4 fill-current" />
                  ) : featuredProduct.checkoutMode === "CHAT_ORDER" ? (
                    <MessageCircle className="w-4 h-4" />
                  ) : (
                    <Zap className="w-4 h-4 fill-current" />
                  )}
                  <span>{getTemplateProductCtaLabel(featuredProduct)}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Demo Only Poster Banner */}
        {isDemo && (
          <div>
            <a
              href={isMockup ? `https://${store.slug}.etalase.online` : `https://tiktok.com/@aisyahlook`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.posterBanner}
            >
              <img src="/images/demo/banner-poster-beauty.jpg" alt="Promo Spesial Canva Poster Beauty" />
            </a>
          </div>
        )}

        {/* Compact Strip */}
        {compactProduct && (
          <div>
            <div className={styles.blockSectionTitle}>
              <span>Rekomendasi</span>
            </div>

            <a
              href={getTemplateProductUrl(store, compactProduct, isMockup)}
              target={compactProduct.checkoutMode === "EXTERNAL_LINK" ? "_blank" : undefined}
              rel={compactProduct.checkoutMode === "EXTERNAL_LINK" ? "noopener noreferrer" : undefined}
              onClick={() => handleProductClick(compactProduct.id)}
              className={styles.compactStrip}
            >
              {compactProduct.images?.[0] || isDemo ? (
                <img
                  src={compactProduct.images?.[0] || "/images/demo/product-ebook.jpg"}
                  alt={compactProduct.title}
                  className="w-14 h-14 rounded-xl object-cover shrink-0 bg-rose-50"
                />
              ) : (
                <div className="w-14 h-14 rounded-xl bg-rose-50 text-rose-500 font-bold text-xs flex items-center justify-center shrink-0">
                  {getStoreInitial(compactProduct.title)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-xs sm:text-sm text-stone-900 truncate">
                  {compactProduct.title}
                </h4>
                {compactProduct.description && (
                  <p className="text-[11px] text-stone-500 truncate mt-0.5">
                    {compactProduct.description}
                  </p>
                )}
              </div>
              <div className="shrink-0 text-right">
                <PriceDisplay
                  price={compactProduct.price}
                  compareAtPrice={compactProduct.compareAtPrice}
                  size="sm"
                  accentColor={accent}
                />
              </div>
            </a>
          </div>
        )}

        {/* Bio Link Mode vs 2-Column Affiliate/Catalog Grid */}
        {isBioLinkMode ? (
          <div className="space-y-2.5">
            {gridProducts.map((item) => (
              <a
                key={item.id}
                href={getTemplateProductUrl(store, item, isMockup)}
                onClick={() => handleProductClick(item.id)}
                className={styles.compactStrip}
              >
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs text-stone-900 truncate">{item.title}</h4>
                </div>
                <PriceDisplay price={item.price} compareAtPrice={item.compareAtPrice} size="sm" accentColor={accent} />
              </a>
            ))}
          </div>
        ) : (
          gridProducts.length > 0 && (
            <div>
              <div className={styles.blockSectionTitle}>
                <span>Koleksi Produk</span>
              </div>

              <div className={styles.grid2Col}>
                {gridProducts.map((item) => (
                  <div key={item.id} className={styles.affiliateCard}>
                    <div className="aspect-square w-full overflow-hidden bg-rose-50 relative">
                      {item.images?.[0] || isDemo ? (
                        <img
                          src={item.images?.[0] || "/images/demo/product-lipcream.jpg"}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-rose-300 font-bold text-lg">
                          {getStoreInitial(item.title)}
                        </div>
                      )}
                      {getPlatformBadge(item.externalPlatform) && (
                        <div className="absolute top-1.5 left-1.5">
                          {getPlatformBadge(item.externalPlatform)}
                        </div>
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
                          {item.checkoutMode === "EXTERNAL_LINK"
                            ? "Keranjang"
                            : item.checkoutMode === "CHAT_ORDER"
                            ? "Chat"
                            : "Beli"}
                        </span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
