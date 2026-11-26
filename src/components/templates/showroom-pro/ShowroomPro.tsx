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
import { Shield, CheckCircle2, MessageCircle, ArrowRight, Car, Building2, Zap, ExternalLink } from "lucide-react";
import styles from "./ShowroomPro.module.css";

export const ShowroomPro: React.FC<StoreTemplateProps> = ({
  store,
  products = [],
  isPreview = false,
  isMockup = false,
}) => {
  const accent = store.appearanceConfig?.accentColor || "#18181B";
  const btnStyle = store.appearanceConfig?.buttonStyle || "sharp";
  const btnRadiusClass =
    btnStyle === "pill" ? "rounded-full" : btnStyle === "rounded" ? "rounded-xl" : "rounded-lg";
  const isDemo = isDemoStoreContext(store, isMockup);
  const isBioLinkMode = store.displayMode === "BIO_LINK";

  const avatarSrc = store.avatarUrl || (isDemo ? "/images/demo/avatar-bastian.jpg" : undefined);
  const bannerSrc =
    store.appearanceConfig?.coverBannerUrl ||
    store.bannerUrl ||
    (isDemo ? "/images/demo/banner-showroom.jpg" : undefined);

  const featuredProduct = isBioLinkMode ? undefined : products.find((p) => p.isFeatured) || products[0];
  const gridProducts = isBioLinkMode
    ? products
    : products.filter((p) => p.id !== featuredProduct?.id);

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
        defaultGradient="from-[#0F172A] via-[#1E293B] to-[#020617]"
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
          <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-xs" />
        </div>

        <div className={styles.nameRow}>
          {isMockup ? (
            <div className={styles.storeName}>{store.name}</div>
          ) : (
            <h1 className={styles.storeName}>{store.name}</h1>
          )}
          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
        </div>

        {isDemo && (
          <div className={styles.verifiedBadge}>
            <Shield className="w-3 h-3 shrink-0" />
            <span>Authorized Sales Consultant &bull; Dealer Resmi Jabodetabek</span>
          </div>
        )}

        {(store.bio || isDemo) && (
          <p className={styles.storeBio}>
            {store.bio ||
              "Dealer Resmi Mobil Baru & Bekas Terkurasi. Layanan simulasi DP ringan, trade-in, dan test drive langsung ke rumah Anda."}
          </p>
        )}

        {isDemo && (
          <div className={styles.specChips}>
            <span className={styles.chipItem}>⚡ DP Mulai 15 Jt</span>
            <span className={styles.chipItem}>🚗 Ready Stock</span>
            <span className={styles.chipItem}>⏱️ Approval 24 Jam</span>
          </div>
        )}

        <SocialLinksBar links={store.appearanceConfig?.socialLinks} accentColor={accent} />
      </div>

      {/* Storefront Content */}
      <div className={styles.contentBody}>
        {/* Featured Showcase Card */}
        {featuredProduct && (
          <div>
            <div className={styles.blockSectionTitle}>
              <span className="flex items-center gap-1.5 text-slate-900 font-bold">
                <Car className="w-3.5 h-3.5 text-blue-600" />
                <span>{featuredProduct.isFeatured ? "Produk Unggulan" : "Pilihan Terbaru"}</span>
              </span>
              {getProductDiscountPercent(featuredProduct.price, featuredProduct.compareAtPrice) && (
                <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full border border-blue-200">
                  Promo -{getProductDiscountPercent(featuredProduct.price, featuredProduct.compareAtPrice)}%
                </span>
              )}
            </div>

            <div className={styles.featuredCard}>
              {(featuredProduct.images?.[0] || isDemo) && (
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                  <img
                    src={featuredProduct.images?.[0] || "/images/demo/product-car-suv.jpg"}
                    alt={featuredProduct.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                    {featuredProduct.title}
                  </h3>
                  {featuredProduct.description && (
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                      {featuredProduct.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                  <PriceDisplay
                    price={featuredProduct.price}
                    compareAtPrice={featuredProduct.compareAtPrice}
                    size="lg"
                    zeroPriceLabel={isDemo ? "Mulai DP 15 Jt" : "Hubungi Kami"}
                    accentColor="#0F172A"
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

        {/* Demo Only Poster Banner */}
        {isDemo && (
          <div>
            <a
              href={
                isMockup
                  ? `https://${store.slug}.etalase.online`
                  : `https://wa.me/${store.chatHandle || "6281234567892"}?text=Halo%20Bastian,%20saya%20minta%20simulasi%20kredit%20bunga%20rendah`
              }
              target={isMockup ? "_blank" : undefined}
              rel={isMockup ? "noopener noreferrer" : undefined}
              className={styles.posterBanner}
            >
              <img src="/images/demo/banner-poster-showroom.jpg" alt="Promo Kredit Bunga Rendah" />
            </a>
          </div>
        )}

        {/* Bio Link Mode vs 2-Column Grid */}
        {isBioLinkMode ? (
          <div className="space-y-2.5">
            {gridProducts.map((item) => (
              <a
                key={item.id}
                href={getTemplateProductUrl(store, item, isMockup)}
                onClick={() => handleProductClick(item.id)}
                className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs"
              >
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 truncate">{item.title}</div>
                  {item.description && (
                    <div className="text-[11px] text-slate-500 truncate">{item.description}</div>
                  )}
                </div>
                <PriceDisplay price={item.price} compareAtPrice={item.compareAtPrice} size="sm" accentColor="#0F172A" />
              </a>
            ))}
          </div>
        ) : (
          (gridProducts.length > 0 || isDemo) && (
            <div>
              <div className={styles.blockSectionTitle}>
                <span className="flex items-center gap-1.5 text-slate-900 font-bold">
                  <Building2 className="w-3.5 h-3.5 text-slate-700" />
                  <span>{isDemo ? "Katalog Unit & Showroom Listing" : "Katalog Produk"}</span>
                </span>
              </div>

              <div className={styles.grid2Col}>
                {(gridProducts.length > 0 ? gridProducts : products).map((item) => (
                  <div key={item.id} className={styles.showroomCard}>
                    <div className="aspect-video w-full overflow-hidden bg-slate-900 relative">
                      {item.images?.[0] || isDemo ? (
                        <img
                          src={item.images?.[0] || "/images/demo/product-car-city.jpg"}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-lg">
                          {getStoreInitial(item.title)}
                        </div>
                      )}
                    </div>
                    <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                      <div>
                        <h4 className="font-bold text-xs text-slate-900 line-clamp-2 leading-snug">
                          {item.title}
                        </h4>
                        {item.description && (
                          <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                            {item.description}
                          </p>
                        )}
                        <div className="mt-1.5">
                          <PriceDisplay
                            price={item.price}
                            compareAtPrice={item.compareAtPrice}
                            size="sm"
                            zeroPriceLabel={isDemo ? "Mulai DP 12 Jt" : "Hubungi Kami"}
                            accentColor="#0F172A"
                          />
                        </div>
                      </div>

                      <a
                        href={getTemplateProductUrl(store, item, isMockup)}
                        target={item.checkoutMode === "EXTERNAL_LINK" ? "_blank" : undefined}
                        rel={item.checkoutMode === "EXTERNAL_LINK" ? "noopener noreferrer" : undefined}
                        onClick={() => handleProductClick(item.id)}
                        className={`w-full py-2 px-2 text-center text-[11px] font-bold text-white bg-slate-900 hover:bg-black transition flex items-center justify-center gap-1 ${btnRadiusClass} cursor-pointer`}
                      >
                        <span>
                          {item.checkoutMode === "CHAT_ORDER"
                            ? isDemo
                              ? "Tanya Unit"
                              : "Tanya via WA"
                            : "Detail"}
                        </span>
                        <ArrowRight className="w-3 h-3" />
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
