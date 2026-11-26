"use client";

import React from "react";
import { StoreTemplateProps } from "../types";
import { formatCurrency, buildChatUrl } from "@/lib/core/formatters";
import styles from "./CafeMenu.module.css";
import { Coffee, MapPin, Clock } from "lucide-react";

export const CafeMenu: React.FC<StoreTemplateProps> = ({
  store,
  products = [],
  isPreview = false,
}) => {
  return (
    <div className={styles.container}>
      {/* Header Cafe */}
      <div className={styles.cafeHeader}>
        <div className="relative mb-3">
          {store.avatarUrl ? (
            <img
              src={store.avatarUrl}
              alt={store.name}
              className={styles.cafeLogo}
            />
          ) : (
            <div className={`${styles.cafeLogo} bg-amber-900 text-amber-100 flex items-center justify-center`}>
              <Coffee className="w-8 h-8" />
            </div>
          )}
        </div>

        <h1 className={styles.cafeName}>{store.name}</h1>
        {store.bio && <p className={styles.cafeBio}>{store.bio}</p>}

        <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
          <span className={styles.hoursBadge}>
            <Clock className="w-3 h-3 inline mr-1" />
            Buka 08:00 - 22:00
          </span>
          <span className="inline-flex items-center text-[10px] font-semibold text-amber-900 bg-amber-100/70 px-2.5 py-1 rounded-full border border-amber-200">
            <MapPin className="w-3 h-3 inline mr-0.5" />
            Bandung
          </span>
        </div>
      </div>

      {/* Category Title */}
      <div className="w-full max-w-[440px] mb-3 flex items-center justify-between">
        <h2 className="text-xs font-bold uppercase tracking-wider text-amber-950">
          Menu Pilihan &amp; Seduh Manual
        </h2>
        <span className="text-[10px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
          QR Order Meja
        </span>
      </div>

      {/* Visual Menu 2-Column Grid */}
      <div className={styles.menuGrid}>
        {products.map((item) => {
          let btnLabel = "Pesan";
          let actionUrl = "#";

          if (item.checkoutMode === "CHAT_ORDER") {
            btnLabel = "Pesan via WA";
            actionUrl = buildChatUrl(
              store.chatChannel || "WHATSAPP",
              store.chatHandle,
              `Halo, saya ingin pesan menu: ${item.title}`
            );
          } else {
            actionUrl = `/${store.slug}/checkout/${item.slug}`;
          }

          return (
            <div key={item.id} className={styles.menuItemCard}>
              {/* Product Image Top */}
              <div className={styles.imageWrapper}>
                {item.images && item.images.length > 0 ? (
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className={styles.productImage}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-amber-50 text-amber-700 font-bold text-xs">
                    ☕ Menu
                  </div>
                )}
              </div>

              {/* Title & Price Center */}
              <div className={styles.productInfo}>
                <h3 className={styles.productTitle}>{item.title}</h3>
                <div className={styles.productPrice}>
                  {formatCurrency(item.price, store.currency as any, store.locale as any)}
                </div>
              </div>

              {/* CTA Button Full Width Bottom */}
              <a
                href={isPreview ? undefined : actionUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.actionBtn}
              >
                {btnLabel}
              </a>
            </div>
          );
        })}
      </div>

      {store.tier === "FREE" && (
        <footer className={styles.footer}>
          Menu Visual &bull; <span className="font-bold text-amber-950">etalase.online</span>
        </footer>
      )}
    </div>
  );
};
