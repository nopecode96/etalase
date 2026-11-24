"use client";

import React from "react";
import { StoreTemplateProps, StoreTemplateProduct } from "../types";
import { TopBar } from "../shared/TopBar";
import { CoverBanner } from "../shared/CoverBanner";
import { SocialLinksBar } from "../shared/SocialLinksBar";
import { PriceDisplay } from "../shared/PriceDisplay";
import { Shield, CheckCircle2, MessageCircle, ArrowRight, Car, Sparkles, Building2 } from "lucide-react";
import styles from "./ShowroomPro.module.css";

export const ShowroomPro: React.FC<StoreTemplateProps> = ({
  store,
  products = [],
  blocks = [],
  isPreview = false,
  isMockup = false,
}) => {
  const accent = store.appearanceConfig?.accentColor || "#18181B";
  const btnStyle = store.appearanceConfig?.buttonStyle || "sharp";
  const btnRadiusClass = btnStyle === "pill" ? "rounded-full" : btnStyle === "rounded" ? "rounded-xl" : "rounded-lg";

  const featuredProduct = products.find((p) => p.isFeatured) || products[0];
  const gridProducts = products.filter((p) => p.id !== featuredProduct?.id);

  const getProductOrderUrl = (item: StoreTemplateProduct) => {
    if (isMockup) return "#";
    const wa = store.chatHandle || "6281234567892";
    return `https://wa.me/${wa}?text=Halo%20${encodeURIComponent(store.name)},%20saya%20minta%20simulasi%20cicilan%20untuk%20${encodeURIComponent(item.title)}`;
  };

  return (
    <div className={styles.container}>
      <TopBar slug={store.slug} isMockup={isMockup} />

      {/* Cover Banner Showroom Dealership */}
      <CoverBanner
        bannerUrl={store.appearanceConfig?.coverBannerUrl || store.bannerUrl || "/images/demo/banner-showroom.jpg"}
        defaultGradient="from-[#0F172A] via-[#1E293B] to-[#020617]"
        heightClass="h-32"
      />

      {/* Profil Header Showroom dengan Avatar Overlap & Verified Consultant */}
      <div className={styles.profileSection}>
        <div className={styles.avatarWrapper}>
          <img
            src={store.avatarUrl || "/images/demo/avatar-bastian.jpg"}
            alt={store.name}
            className={styles.avatar}
          />
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

        {/* Verified Sales Consultant Badge */}
        <div className={styles.verifiedBadge}>
          <Shield className="w-3 h-3 shrink-0" />
          <span>Authorized Sales Consultant &bull; Dealer Resmi Jabodetabek</span>
        </div>

        <p className={styles.storeBio}>
          {store.bio || "Dealer Resmi Mobil Baru & Bekas Terkurasi. Layanan simulasi DP ringan, trade-in, dan test drive langsung ke rumah Anda."}
        </p>

        {/* Spec Chips Bar */}
        <div className={styles.specChips}>
          <span className={styles.chipItem}>⚡ DP Mulai 15 Jt</span>
          <span className={styles.chipItem}>🚗 Ready Stock</span>
          <span className={styles.chipItem}>⏱️ Approval 24 Jam</span>
        </div>

        {/* Baris Ikon Media Sosial */}
        <SocialLinksBar
          links={store.appearanceConfig?.socialLinks}
          accentColor={accent}
        />
      </div>

      {/* Content Blocks (Showroom Executive Anatomy) */}
      <div className={styles.contentBody}>
        {/* BLOK 1: Featured Unit Showcase Card */}
        {featuredProduct && (
          <div>
            <div className={styles.blockSectionTitle}>
              <span className="flex items-center gap-1.5 text-slate-900 font-bold">
                <Car className="w-3.5 h-3.5 text-blue-600" />
                <span>Unit Pilihan Showroom</span>
              </span>
              <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full border border-blue-200">
                Unit Terlaris
              </span>
            </div>

            <div className={styles.featuredCard}>
              <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                <img
                  src={featuredProduct.images?.[0] || "/images/demo/product-car-suv.jpg"}
                  alt={featuredProduct.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 left-2.5 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-xs">
                  DP 15 Jt &bull; Ready Stock
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                    {featuredProduct.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {featuredProduct.description || "Mulai DP 15 Jt • Angsuran 4 Jt-an • Ready Stock Hitam & Putih. Free Asuransi 2 Tahun."}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                  <PriceDisplay
                    price={featuredProduct.price}
                    compareAtPrice={featuredProduct.compareAtPrice}
                    size="lg"
                    zeroPriceLabel="Mulai DP 15 Jt"
                    accentColor="#0F172A"
                  />
                  <span className="text-[10px] text-blue-700 bg-blue-50 border border-blue-200 font-bold px-2 py-0.5 rounded-md">
                    Cicilan 4.8 Jt/bln
                  </span>
                </div>

                <a
                  href={getProductOrderUrl(featuredProduct)}
                  className={`w-full py-3 px-4 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition ${btnRadiusClass} cursor-pointer`}
                  style={{ backgroundColor: accent }}
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Minta Simulasi Cicilan</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* BLOK 2: Promo Kredit Image Banner 16:9 */}
        <div>
          <a
            href={isMockup ? "#" : `https://wa.me/${store.chatHandle || "6281234567892"}?text=Halo%20Bastian,%20saya%20minta%20simulasi%20kredit%20bunga%20rendah`}
            className={styles.posterBanner}
          >
            <img
              src="/images/demo/banner-poster-showroom.jpg"
              alt="Promo Kredit Bunga Rendah"
            />
          </a>
        </div>

        {/* BLOK 3: 2-Column Listing Unit */}
        <div>
          <div className={styles.blockSectionTitle}>
            <span className="flex items-center gap-1.5 text-slate-900 font-bold">
              <Building2 className="w-3.5 h-3.5 text-slate-700" />
              <span>Katalog Unit &amp; Showroom Listing</span>
            </span>
          </div>

          <div className={styles.grid2Col}>
            {(gridProducts.length > 0 ? gridProducts : products).map((item) => (
              <div key={item.id} className={styles.showroomCard}>
                <div className="aspect-video w-full overflow-hidden bg-slate-900 relative">
                  <img
                    src={item.images?.[0] || "/images/demo/product-car-city.jpg"}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1.5 left-1.5 bg-black/75 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                    Ready
                  </div>
                </div>
                <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 line-clamp-2 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                      {item.description || "Unit ready stock & terawat"}
                    </p>
                    <div className="mt-1.5">
                      <PriceDisplay
                        price={item.price}
                        size="sm"
                        zeroPriceLabel={item.title.toLowerCase().includes("cluster") ? "Tanya Harga" : "Mulai DP 12 Jt"}
                        accentColor="#0F172A"
                      />
                    </div>
                  </div>

                  <a
                    href={getProductOrderUrl(item)}
                    className={`w-full py-2 px-2 text-center text-[11px] font-bold text-white bg-slate-900 hover:bg-black transition flex items-center justify-center gap-1 ${btnRadiusClass} cursor-pointer`}
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>Tanya Unit</span>
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
