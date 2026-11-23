"use client";

import React, { useState } from "react";
import { StoreTemplateProps, StoreTemplateProduct } from "../types";
import { TopBar } from "../shared/TopBar";
import { CoverBanner } from "../shared/CoverBanner";
import { SocialLinksBar } from "../shared/SocialLinksBar";
import { PriceDisplay } from "../shared/PriceDisplay";
import { Coffee, Clock, Sparkles, MessageCircle, ArrowRight, Utensils } from "lucide-react";
import styles from "./VisualMenuGrid.module.css";

export const VisualMenuGrid: React.FC<StoreTemplateProps> = ({
  store,
  products = [],
  blocks = [],
  isPreview = false,
  isMockup = false,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("Semua");
  const accent = store.appearanceConfig?.accentColor || "#4A2C2A";
  const btnStyle = store.appearanceConfig?.buttonStyle || "pill";
  const btnRadiusClass = btnStyle === "pill" ? "rounded-full" : btnStyle === "sharp" ? "rounded-none" : "rounded-xl";

  const categories = ["Semua", "Kopi", "Pastry", "Biji Kopi"];

  const filteredProducts = products.filter((p) => {
    if (activeCategory === "Semua") return true;
    const titleLower = p.title.toLowerCase();
    const catLower = (p.category || "").toLowerCase();
    if (activeCategory === "Kopi") return titleLower.includes("kopi") || titleLower.includes("aren") || titleLower.includes("v60") || catLower.includes("kopi");
    if (activeCategory === "Pastry") return titleLower.includes("croissant") || titleLower.includes("pastry") || titleLower.includes("roti") || catLower.includes("pastry");
    if (activeCategory === "Biji Kopi") return titleLower.includes("biji") || titleLower.includes("beans") || catLower.includes("beans");
    return true;
  });

  const featuredProduct = products.find((p) => p.isFeatured) || products[0];
  const gridProducts = filteredProducts.filter((p) => p.id !== featuredProduct?.id || activeCategory !== "Semua");

  const getProductOrderUrl = (item: StoreTemplateProduct) => {
    if (isMockup) return "#";
    const wa = store.chatHandle || "6281234567891";
    return `https://wa.me/${wa}?text=Halo%20${encodeURIComponent(store.name)},%20saya%20mau%20pesan%20${encodeURIComponent(item.title)}`;
  };

  return (
    <div className={styles.container}>
      <TopBar slug={store.slug} isMockup={isMockup} />

      {/* Cover Banner Cafe Atmosphere */}
      <CoverBanner
        bannerUrl={store.appearanceConfig?.coverBannerUrl || store.bannerUrl || "/images/demo/banner-cafe.jpg"}
        defaultGradient="from-[#3E2723] via-[#4E342E] to-[#271510]"
        heightClass="h-32"
      />

      {/* Profil Header Cafe dengan Avatar Overlap & Jam Buka */}
      <div className={styles.profileSection}>
        <div className={styles.avatarWrapper}>
          <img
            src={store.avatarUrl || "/images/demo/avatar-senja.jpg"}
            alt={store.name}
            className={styles.avatar}
          />
          <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-xs" />
        </div>

        <div className={styles.nameRow}>
          <h1 className={styles.storeName}>{store.name}</h1>
          <Coffee className="w-4 h-4 text-[#D94E28] shrink-0" />
        </div>

        {/* Live Operational Status */}
        <div className={styles.hoursBadge}>
          <Clock className="w-3 h-3 shrink-0" />
          <span>Buka Hari Ini 08:00 - 22:00 &bull; Order via WA</span>
        </div>

        <p className={styles.storeBio}>
          {store.bio || "Kopi spesialti seduh manual & bakery fresh oven setiap pagi. Siap dine-in & takeaway via WhatsApp."}
        </p>

        {/* Baris Ikon Media Sosial */}
        <SocialLinksBar
          links={store.appearanceConfig?.socialLinks || {
            instagram: "https://instagram.com/kopisenja",
            whatsapp: `https://wa.me/${store.chatHandle || "6281234567891"}`,
            website: `https://${store.slug}.etalase.online`,
          }}
          accentColor={accent}
        />
      </div>

      {/* Content Blocks (Mixed Layout Cafe Anatomy) */}
      <div className={styles.contentBody}>
        {/* BLOK 1: Promo Banner Strip / Canva Poster */}
        <div>
          <a
            href={isMockup ? "#" : `https://wa.me/${store.chatHandle || "6281234567891"}?text=Halo%20Kopi%20Senja,%20saya%20mau%20pesan%20Paket%20Sarapan`}
            className={styles.posterBanner}
          >
            <img
              src="/images/demo/banner-poster-cafe.jpg"
              alt="Promo Spesial Paket Sarapan Hemat"
            />
          </a>
        </div>

        {/* BLOK 2: Featured Hero Signature Drink Card */}
        {featuredProduct && (
          <div>
            <div className={styles.blockSectionTitle}>
              <span className="flex items-center gap-1.5 text-[#38221D] font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#D94E28]" />
                <span>Signature Menu Terlaris</span>
              </span>
              <span className="text-[10px] bg-amber-100 text-[#4A2C2A] font-bold px-2 py-0.5 rounded-full border border-amber-200">
                Paling Diminati
              </span>
            </div>

            <div className={styles.featuredCard}>
              <div className="relative aspect-video w-full overflow-hidden bg-stone-100">
                <img
                  src={featuredProduct.images?.[0] || "/images/demo/product-coffee-aren.jpg"}
                  alt={featuredProduct.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">
                  Seduh Segar
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-bold text-[#38221D] text-sm sm:text-base leading-snug">
                    {featuredProduct.title}
                  </h3>
                  <p className="text-xs text-[#6E5D53] mt-1 line-clamp-2 leading-relaxed">
                    {featuredProduct.description || "Espresso blend spesial dengan gula aren murni organik dan susu creamy segar."}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <PriceDisplay
                    price={featuredProduct.price}
                    compareAtPrice={featuredProduct.compareAtPrice}
                    size="lg"
                    accentColor={accent}
                  />
                  <span className="text-[10px] text-amber-800 bg-amber-50 border border-amber-200 font-bold px-2 py-0.5 rounded-md">
                    ☕ Best Seller
                  </span>
                </div>

                <a
                  href={getProductOrderUrl(featuredProduct)}
                  className={`w-full py-3 px-4 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition ${btnRadiusClass} cursor-pointer`}
                  style={{ backgroundColor: accent }}
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Pesan via WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* BLOK 3: Category Filter Pills */}
        <div>
          <div className={styles.blockSectionTitle}>
            <span className="flex items-center gap-1.5 text-[#38221D] font-bold">
              <Utensils className="w-3.5 h-3.5 text-[#D94E28]" />
              <span>Buku Menu &amp; Kudapan</span>
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

        {/* BLOK 4: Visual Menu Grid 2 Kolom */}
        <div className={styles.grid2Col}>
          {(gridProducts.length > 0 ? gridProducts : products).map((item) => (
            <div key={item.id} className={styles.menuItemCard}>
              <div className="aspect-square w-full overflow-hidden bg-stone-100 relative">
                <img
                  src={item.images?.[0] || "/images/demo/product-croissant.jpg"}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
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
                  href={getProductOrderUrl(item)}
                  className={`w-full py-2 px-2 text-center text-[11px] font-bold text-white bg-[#38221D] hover:bg-black transition flex items-center justify-center gap-1 ${btnRadiusClass} cursor-pointer`}
                >
                  <MessageCircle className="w-3 h-3" />
                  <span>Pesan</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
