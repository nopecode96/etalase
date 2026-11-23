"use client";

import React from "react";
import { StoreTemplateProps, StoreTemplateProduct } from "../types";
import { TopBar } from "../shared/TopBar";
import { CoverBanner } from "../shared/CoverBanner";
import { SocialLinksBar } from "../shared/SocialLinksBar";
import { PriceDisplay } from "../shared/PriceDisplay";
import { Sparkles, Heart, ExternalLink, ArrowRight, ShoppingBag } from "lucide-react";
import styles from "./EditorialPastel.module.css";

export const EditorialPastel: React.FC<StoreTemplateProps> = ({
  store,
  products = [],
  blocks = [],
  isPreview = false,
  isMockup = false,
}) => {
  const accent = store.appearanceConfig?.accentColor || "#D94E28";
  const btnStyle = store.appearanceConfig?.buttonStyle || "pill";
  const btnRadiusClass = btnStyle === "pill" ? "rounded-full" : btnStyle === "sharp" ? "rounded-none" : "rounded-xl";

  const featuredProduct = products.find((p) => p.isFeatured) || products[0];
  const compactProduct = products.find((p) => p.id !== featuredProduct?.id && p.productType === "DIGITAL") || products.filter((p) => p.id !== featuredProduct?.id)[0];
  const gridProducts = products.filter((p) => p.id !== featuredProduct?.id && p.id !== compactProduct?.id);

  const getProductActionUrl = (item: StoreTemplateProduct) => {
    if (isMockup) return "#";
    if (item.checkoutMode === "EXTERNAL_LINK") {
      return item.externalUrl || "#";
    }
    if (item.checkoutMode === "CHAT_ORDER") {
      const wa = store.chatHandle || "6281234567893";
      return `https://wa.me/${wa}?text=Halo%20${encodeURIComponent(store.name)},%20saya%20mau%20tanya%20${encodeURIComponent(item.title)}`;
    }
    return `/${store.slug}/checkout/${item.slug}`;
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
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-900 bg-rose-100 border border-rose-200 px-2 py-0.5 rounded-full">
        <span>✨</span> Rekomendasi
      </span>
    );
  };

  return (
    <div className={styles.container}>
      <TopBar slug={store.slug} isMockup={isMockup} />

      {/* Cover Banner Beauty Editorial */}
      <CoverBanner
        bannerUrl={store.appearanceConfig?.coverBannerUrl || store.bannerUrl || "/images/demo/banner-beauty.jpg"}
        defaultGradient="from-[#FFE4E6] via-[#FECDD3] to-[#FDE8E1]"
        heightClass="h-32"
      />

      {/* Profil Header Beauty dengan Avatar Overlap & Verified Icon */}
      <div className={styles.profileSection}>
        <div className={styles.avatarWrapper}>
          <img
            src={store.avatarUrl || "/images/demo/avatar-aisyah.jpg"}
            alt={store.name}
            className={styles.avatar}
          />
          <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-rose-500 border-2 border-white shadow-xs" />
        </div>

        <div className={styles.nameRow}>
          <h1 className={styles.storeName}>{store.name}</h1>
          <Sparkles className="w-4 h-4 text-[#D94E28] shrink-0" />
        </div>

        {/* Editorial Pill */}
        <div className={styles.badgeEditorial}>
          <Heart className="w-3 h-3 shrink-0 fill-current" />
          <span>Beauty, Hijab &amp; Skincare Favorit &bull; Racun Shopee &amp; TikTok</span>
        </div>

        <p className={styles.storeBio}>
          {store.bio || "Rekomendasi harian skincare, hijab, & makeup yang beneran dipakai & worth to buy. Dapatkan link voucher diskon sebelum checkout! ✨"}
        </p>

        {/* Baris Ikon Media Sosial */}
        <SocialLinksBar
          links={store.appearanceConfig?.socialLinks || {
            tiktok: "https://tiktok.com/@aisyahlook",
            instagram: "https://instagram.com/aisyahlook",
            whatsapp: `https://wa.me/${store.chatHandle || "6281234567893"}`,
          }}
          accentColor={accent}
        />
      </div>

      {/* Content Blocks (Mixed Layout Beauty Anatomy) */}
      <div className={styles.contentBody}>
        {/* BLOK 1: Featured Racun Spill Card */}
        {featuredProduct && (
          <div>
            <div className={styles.blockSectionTitle}>
              <span className="flex items-center gap-1.5 text-stone-900 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#D94E28]" />
                <span>Racun Spill Paling Viral</span>
              </span>
              <span className="text-[10px] bg-[#FDF0EC] text-[#D94E28] font-bold px-2 py-0.5 rounded-full border border-[#FADCD3]">
                Diskon 40% TikTok Shop
              </span>
            </div>

            <div className={styles.featuredCard}>
              <div className="relative aspect-video w-full overflow-hidden bg-rose-50">
                <img
                  src={featuredProduct.images?.[0] || "/images/demo/product-serum.jpg"}
                  alt={featuredProduct.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">
                  Wajib Punya ✨
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-bold text-stone-900 text-sm sm:text-base leading-snug">
                    {featuredProduct.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                    {featuredProduct.description || "Serum ceramide 5x yang memperbaiki skin barrier & bikin kulit glowing natural tanpa lengket."}
                  </p>
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
                  href={getProductActionUrl(featuredProduct)}
                  className={`w-full py-3 px-4 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition ${btnRadiusClass} cursor-pointer`}
                  style={{ backgroundColor: accent }}
                >
                  <ShoppingBag className="w-4 h-4 fill-current" />
                  <span>Beli di TikTok Shop / Shopee</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* BLOK 2: Canva Poster Promo Gajian */}
        <div>
          <a
            href={isMockup ? "#" : `https://tiktok.com/@aisyahlook`}
            className={styles.posterBanner}
          >
            <img
              src="/images/demo/banner-poster-beauty.jpg"
              alt="Promo Spesial Canva Poster Beauty"
            />
          </a>
        </div>

        {/* BLOK 3: Compact Strip (Panduan Skincare / E-Book) */}
        {compactProduct && (
          <div>
            <div className={styles.blockSectionTitle}>
              <span>Panduan Skincare Rutin</span>
            </div>

            <a
              href={getProductActionUrl(compactProduct)}
              className={styles.compactStrip}
            >
              <img
                src={compactProduct.images?.[0] || "/images/demo/product-ebook.jpg"}
                alt={compactProduct.title}
                className="w-14 h-14 rounded-xl object-cover shrink-0 bg-rose-50"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-xs sm:text-sm text-stone-900 truncate">
                  {compactProduct.title}
                </h4>
                <p className="text-[11px] text-stone-500 truncate mt-0.5">
                  {compactProduct.description || "Panduan step-by-step skincare glowing dalam 14 hari"}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <PriceDisplay price={compactProduct.price} compareAtPrice={compactProduct.compareAtPrice} size="sm" accentColor={accent} />
              </div>
            </a>
          </div>
        )}

        {/* BLOK 4: 2-Column Affiliate Grid with SEA Marketplace Badges */}
        <div>
          <div className={styles.blockSectionTitle}>
            <span>Koleksi Racun &amp; Rekomendasi Hijab</span>
          </div>

          <div className={styles.grid2Col}>
            {(gridProducts.length > 0 ? gridProducts : products).map((item) => (
              <div key={item.id} className={styles.affiliateCard}>
                <div className="aspect-square w-full overflow-hidden bg-rose-50 relative">
                  <img
                    src={item.images?.[0] || "/images/demo/product-lipcream.jpg"}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1.5 left-1.5">
                    {getPlatformBadge(item.externalPlatform)}
                  </div>
                </div>
                <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h4 className="font-bold text-xs text-stone-900 line-clamp-2 leading-snug">
                      {item.title}
                    </h4>
                    <div className="mt-1">
                      <PriceDisplay price={item.price} compareAtPrice={item.compareAtPrice} size="sm" accentColor={accent} />
                    </div>
                  </div>

                  <a
                    href={getProductActionUrl(item)}
                    className={`w-full py-2 px-2 text-center text-[11px] font-bold text-white bg-stone-900 hover:bg-black transition flex items-center justify-center gap-1 ${btnRadiusClass} cursor-pointer`}
                  >
                    <span>Keranjang</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
