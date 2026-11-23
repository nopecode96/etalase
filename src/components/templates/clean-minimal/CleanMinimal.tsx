"use client";

import React from "react";
import { StoreTemplateProps } from "../types";
import { formatCurrency, buildChatUrl } from "@/lib/core/formatters";
import { CHAT_CHANNELS, MARKETPLACE_PRESETS } from "@/lib/config/constants";
import styles from "./CleanMinimal.module.css";
import { Sparkles, CheckCircle2 } from "lucide-react";

export const CleanMinimal: React.FC<StoreTemplateProps> = ({
  store,
  products = [],
  isPreview = false,
}) => {
  return (
    <div className={styles.container}>
      {/* Profil Header */}
      <div className={styles.profileHeader}>
        <div className="relative mb-3 inline-block">
          {store.avatarUrl ? (
            <img
              src={store.avatarUrl}
              alt={store.name}
              className={styles.avatar}
            />
          ) : (
            <div className={`${styles.avatar} bg-slate-900 text-white flex items-center justify-center font-bold text-xl`}>
              {store.name.charAt(0)}
            </div>
          )}
          <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"></span>
        </div>

        <div className="flex items-center justify-center gap-1.5 mb-1">
          <h1 className={styles.storeName}>{store.name}</h1>
          <CheckCircle2 className="w-4 h-4 text-[#D94E28]" />
        </div>

        {store.bio && <p className={styles.storeBio}>{store.bio}</p>}

        {/* Chat Channels Badge */}
        {store.chatChannels && store.chatChannels.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3">
            {store.chatChannels.map((ch, idx) => {
              const cfg = CHAT_CHANNELS[ch.channel as keyof typeof CHAT_CHANNELS];
              const channelColor =
                ch.channel === "WHATSAPP"
                  ? "#16A34A"
                  : ch.channel === "LINE"
                  ? "#06C755"
                  : ch.channel === "ZALO"
                  ? "#0068FF"
                  : "#1C1917";

              return (
                <a
                  key={idx}
                  href={isPreview ? undefined : buildChatUrl(ch.channel, ch.handle)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold text-white shadow-2xs transition hover:opacity-90"
                  style={{ backgroundColor: channelColor }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white/80"></span>
                  <span>{cfg?.name || ch.channel}</span>
                </a>
              );
            })}
          </div>
        )}
      </div>

      {/* Product List - Strict Vertical Stacking (Anti-Collision) */}
      <div className={styles.productList}>
        {products.map((item, index) => {
          let btnLabel = "Beli via QRIS Instan";
          let actionUrl = "#";

          if (item.checkoutMode === "EXTERNAL_LINK") {
            const presetKey = item.externalPlatform as keyof typeof MARKETPLACE_PRESETS;
            const preset = MARKETPLACE_PRESETS[presetKey];
            btnLabel =
              item.externalLabel ||
              preset?.labels[store.locale as keyof typeof preset.labels] ||
              "Beli";
            actionUrl = item.externalUrl || "#";
          } else if (item.checkoutMode === "CHAT_ORDER") {
            btnLabel = "Pesan via WhatsApp";
            actionUrl = buildChatUrl(
              store.chatChannel || "WHATSAPP",
              store.chatHandle,
              `Halo, saya ingin memesan ${item.title}`
            );
          } else {
            actionUrl = `/${store.slug}/checkout/${item.slug}`;
          }

          const hasSecondary = item.secondaryModes && item.secondaryModes.length > 0;
          const isFeatured = index === 0;

          return (
            <div
              key={item.id}
              className={`${styles.productCard} ${isFeatured ? styles.featuredCard : ""}`}
            >
              {/* Image Top */}
              <div className={isFeatured ? styles.featuredImageWrapper : styles.imageWrapper}>
                {item.images && item.images.length > 0 ? (
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className={styles.productImage}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-stone-100 text-stone-400">
                    <Sparkles className="w-6 h-6 opacity-40" />
                  </div>
                )}
                {isFeatured && (
                  <span className="absolute top-2.5 left-2.5 bg-[#D94E28] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                    PILIHAN UTAMA
                  </span>
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
              <div className="w-full flex flex-col gap-1.5 mt-auto pt-2">
                <a
                  href={isPreview ? undefined : actionUrl}
                  target={item.checkoutMode === "EXTERNAL_LINK" ? "_blank" : undefined}
                  rel="noreferrer"
                  className={styles.actionBtn}
                >
                  {btnLabel}
                </a>

                {hasSecondary &&
                  item.secondaryModes!.map((sec, sIdx) => {
                    const secUrl =
                      sec.mode === "CHAT_ORDER"
                        ? buildChatUrl(
                            sec.chatChannel || store.chatChannel || "WHATSAPP",
                            sec.chatHandle || store.chatHandle,
                            `Halo, saya ingin tanya produk: ${item.title}`
                          )
                        : sec.externalUrl || "#";

                    return (
                      <a
                        key={sIdx}
                        href={isPreview ? undefined : secUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-semibold text-[#57534E] hover:text-[#D94E28] text-center py-0.5 transition"
                      >
                        {sec.label || "Tanya via Chat"}
                      </a>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>

      <footer className={styles.footer}>
        Ditenagai oleh <span className="font-bold text-[#1C1917]">etalase.online</span>
      </footer>
    </div>
  );
};
