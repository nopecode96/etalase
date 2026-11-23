"use client";

import React from "react";
import { StoreTemplateProps, StoreTemplateProduct } from "../types";
import { TopBar } from "../shared/TopBar";
import { CoverBanner } from "../shared/CoverBanner";
import { SocialLinksBar } from "../shared/SocialLinksBar";
import { PriceDisplay } from "../shared/PriceDisplay";
import { CheckCircle2, Zap, ArrowRight, Sparkles, ExternalLink } from "lucide-react";
import styles from "./CleanMinimal.module.css";

export const CleanMinimal: React.FC<StoreTemplateProps> = ({
  store,
  products = [],
  blocks = [],
  isPreview = false,
  isMockup = false,
}) => {
  const accent = store.appearanceConfig?.accentColor || "#D94E28";
  const btnStyle = store.appearanceConfig?.buttonStyle || "rounded";
  const btnRadiusClass = btnStyle === "pill" ? "rounded-full" : btnStyle === "sharp" ? "rounded-none" : "rounded-xl";

  // Featured Product: first featured or first product
  const featuredProduct = products.find((p) => p.isFeatured) || products[0];
  const compactProducts = products.filter((p) => p.id !== featuredProduct?.id).slice(0, 2);
  const gridProducts = products.filter((p) => p.id !== featuredProduct?.id).slice(2);

  const getProductActionUrl = (item: StoreTemplateProduct) => {
    if (isMockup) return "#";
    if (item.checkoutMode === "EXTERNAL_LINK") {
      return item.externalUrl || "#";
    }
    if (item.checkoutMode === "CHAT_ORDER") {
      const wa = store.chatHandle || "6281234567890";
      return `https://wa.me/${wa}?text=Halo%20${encodeURIComponent(store.name)},%20saya%20tertarik%20dengan%20${encodeURIComponent(item.title)}`;
    }
    return `/${store.slug}/checkout/${item.slug}`;
  };

  return (
    <div className={styles.container}>
      <TopBar slug={store.slug} isMockup={isMockup} />

      {/* Cover Banner (Deep Teal / Sage) */}
      <CoverBanner
        bannerUrl={store.appearanceConfig?.coverBannerUrl || store.bannerUrl || "/images/demo/banner-creator.jpg"}
        defaultGradient="from-[#134E4A] via-[#115E59] to-[#042F2E]"
        heightClass="h-32"
      />

      {/* Profil Header dengan Avatar Overlap */}
      <div className={styles.profileSection}>
        <div className={styles.avatarWrapper}>
          <img
            src={store.avatarUrl || "/images/demo/avatar-rafa.jpg"}
            alt={store.name}
            className={styles.avatar}
          />
          <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-xs" />
        </div>

        <div className={styles.nameRow}>
          <h1 className={styles.storeName}>{store.name}</h1>
          <CheckCircle2 className="w-4 h-4 text-[#D94E28] shrink-0" />
        </div>

        <p className={styles.storeBio}>
          {store.bio || "Digital Creator & Video Editor. Berbagi preset cinematic & panduan workflow editing."}
        </p>

        {/* Baris Ikon Media Sosial */}
        <SocialLinksBar
          links={store.appearanceConfig?.socialLinks || {
            tiktok: "https://tiktok.com/@rafacreative",
            instagram: "https://instagram.com/rafacreative",
            whatsapp: `https://wa.me/${store.chatHandle || "6281234567890"}`,
            youtube: "https://youtube.com/@rafacreative",
          }}
          accentColor={accent}
        />
      </div>

      {/* Content Blocks (Mixed Layout Anatomy) */}
      <div className={styles.contentBody}>
        {/* BLOK 1: Featured Hero Digital Product Card */}
        {featuredProduct && (
          <div>
            <div className={styles.blockSectionTitle}>
              <span className="flex items-center gap-1.5 text-stone-900 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#D94E28]" />
                <span>Produk Terlaris Bulan Ini</span>
              </span>
              <span className="text-[10px] bg-[#FDF0EC] text-[#D94E28] font-bold px-2 py-0.5 rounded-full border border-[#FADCD3]">
                Diskon 50%
              </span>
            </div>

            <div className={styles.featuredCard}>
              <div className="relative aspect-video w-full overflow-hidden bg-stone-100">
                <img
                  src={featuredProduct.images?.[0] || "/images/demo/product-preset.jpg"}
                  alt={featuredProduct.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">
                  Instant Download
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-bold text-stone-900 text-sm sm:text-base leading-snug">
                    {featuredProduct.title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed font-normal">
                    {featuredProduct.description || "Preset warna sinematik siap pakai untuk mobile & desktop. Garansi auto-kirim ke WhatsApp."}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <PriceDisplay
                    price={featuredProduct.price}
                    compareAtPrice={featuredProduct.compareAtPrice}
                    size="lg"
                    accentColor={accent}
                  />
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 font-bold px-2 py-0.5 rounded-md">
                    ⚡ Auto WA
                  </span>
                </div>

                <a
                  href={getProductActionUrl(featuredProduct)}
                  className={`w-full py-3 px-4 bg-[#D94E28] hover:bg-[#B83E1D] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition ${btnRadiusClass} cursor-pointer`}
                  style={{ backgroundColor: accent }}
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Beli Sekarang — Auto WA</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* BLOK 2: Compact Strip */}
        {compactProducts.length > 0 && (
          <div>
            <div className={styles.blockSectionTitle}>
              <span>E-Book &amp; Panduan Pilihan</span>
            </div>

            <div className="space-y-2.5">
              {compactProducts.map((item) => (
                <a
                  key={item.id}
                  href={getProductActionUrl(item)}
                  className={styles.compactStrip}
                >
                  <img
                    src={item.images?.[0] || "/images/demo/product-ebook.jpg"}
                    alt={item.title}
                    className="w-14 h-14 rounded-xl object-cover shrink-0 bg-stone-100"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm text-stone-900 truncate">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-stone-500 truncate mt-0.5">
                      {item.description || "Panduan praktis berformat PDF siap baca"}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <PriceDisplay price={item.price} size="sm" accentColor={accent} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* BLOK 3: Clickable Image Banner / Canva Poster */}
        <div>
          <a
            href={isMockup ? "#" : `https://wa.me/${store.chatHandle || "6281234567890"}?text=Halo%20Rafa,%20saya%20mau%20klaim%20bonus%20video`}
            className={styles.posterBanner}
          >
            <img
              src="/images/demo/banner-poster-creator.jpg"
              alt="Promo Spesial Canva Poster"
            />
          </a>
        </div>

        {/* BLOK 4: Visual Grid 2 Kolom */}
        {gridProducts.length > 0 && (
          <div>
            <div className={styles.blockSectionTitle}>
              <span>Rekomendasi Gear &amp; Mentoring</span>
            </div>

            <div className={styles.grid2Col}>
              {gridProducts.map((item) => (
                <div key={item.id} className={styles.gridCard}>
                  <div className="aspect-square w-full overflow-hidden bg-stone-100">
                    <img
                      src={item.images?.[0] || "/images/demo/product-mic.jpg"}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <h4 className="font-bold text-xs text-stone-900 line-clamp-2 leading-snug">
                        {item.title}
                      </h4>
                      <div className="mt-1">
                        <PriceDisplay price={item.price} size="sm" accentColor={accent} />
                      </div>
                    </div>

                    <a
                      href={getProductActionUrl(item)}
                      className={`w-full py-2 px-2 text-center text-[11px] font-bold text-white bg-stone-900 hover:bg-black transition flex items-center justify-center gap-1 ${btnRadiusClass} cursor-pointer`}
                    >
                      <span>{item.checkoutMode === "EXTERNAL_LINK" ? "Beli di Toko" : "Detail"}</span>
                      {item.checkoutMode === "EXTERNAL_LINK" ? <ExternalLink className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
