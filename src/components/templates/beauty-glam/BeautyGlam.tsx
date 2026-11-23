"use client";

import React from "react";
import { StoreTemplateProps } from "../types";
import { formatCurrency } from "@/lib/core/formatters";
import { MARKETPLACE_PRESETS } from "@/lib/config/constants";
import styles from "./BeautyGlam.module.css";
import { Heart, Sparkles, ShoppingBag } from "lucide-react";

export const BeautyGlam: React.FC<StoreTemplateProps> = ({
  store,
  products = [],
  isPreview = false,
}) => {
  return (
    <div className={styles.container}>
      {/* Header Beauty Creator */}
      <div className={styles.beautyHeader}>
        <div className="relative mb-3 inline-block">
          {store.avatarUrl ? (
            <img
              src={store.avatarUrl}
              alt={store.name}
              className={styles.avatar}
            />
          ) : (
            <div className={`${styles.avatar} bg-rose-200 text-rose-800 flex items-center justify-center font-bold text-xl`}>
              {store.name.charAt(0)}
            </div>
          )}
          <span className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-2xs">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </span>
        </div>

        <h1 className={styles.name}>{store.name}</h1>
        <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-100/70 border border-rose-200 px-3 py-0.5 rounded-full mt-1">
          <Sparkles className="w-3 h-3 text-rose-600" />
          <span>Beauty, Hijab &amp; Skincare Favorit</span>
        </div>

        {store.bio && <p className={styles.bio}>{store.bio}</p>}
      </div>

      {/* Affiliate Showcase Heading */}
      <div className="w-full max-w-[440px] mb-3 flex items-center justify-between">
        <h2 className="text-xs font-bold uppercase tracking-wider text-rose-900">
          Koleksi Rekomendasi
        </h2>
        <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
          💛 Keranjang Kuning
        </span>
      </div>

      {/* Editorial Pastel Vertical Product Cards */}
      <div className={styles.productList}>
        {products.map((item) => {
          let actionUrl = item.externalUrl || "#";
          const presetKey = item.externalPlatform as keyof typeof MARKETPLACE_PRESETS;
          const preset = MARKETPLACE_PRESETS[presetKey];

          let btnLabel = item.externalLabel || "Beli via Keranjang Kuning";
          let btnStyle: React.CSSProperties = {
            backgroundColor: "#F59E0B", // Default Yellow TikTok Beg
            color: "#1C1917",
          };

          if (preset) {
            btnLabel = item.externalLabel || preset.labels[store.locale as keyof typeof preset.labels] || preset.name;
            btnStyle = {
              backgroundColor: preset.badgeColor || "#F59E0B",
              color: "#FFFFFF",
            };
          }

          return (
            <div key={item.id} className={styles.productCard}>
              {/* Large Square Image on Top */}
              <div className={styles.imageWrapper}>
                {item.images && item.images.length > 0 ? (
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className={styles.productImage}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-rose-50 text-rose-400">
                    <ShoppingBag className="w-8 h-8 opacity-40" />
                  </div>
                )}
                <span className="absolute top-2.5 left-2.5 bg-white/90 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-2xs backdrop-blur-xs">
                  Review Jujur ⭐ 4.9
                </span>
              </div>

              {/* Title & Price Center */}
              <div className={styles.productInfo}>
                <h3 className={styles.productTitle}>{item.title}</h3>
                <div className={styles.productPrice}>
                  {formatCurrency(item.price, store.currency as any, store.locale as any)}
                </div>
              </div>

              {/* Marketplace Full-Width Button at Bottom */}
              <div className="w-full pt-1">
                <a
                  href={isPreview ? undefined : actionUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.actionBtn}
                  style={btnStyle}
                >
                  <ShoppingBag className="w-3.5 h-3.5 inline mr-1.5 shrink-0" />
                  <span className="truncate">{btnLabel}</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <footer className={styles.footer}>
        Affiliate Storefront &bull; <span className="font-bold text-rose-950">etalase.online</span>
      </footer>
    </div>
  );
};
