"use client";

import React from "react";
import { StoreTemplateProps } from "../types";
import { formatCurrency, buildChatUrl } from "@/lib/core/formatters";
import styles from "./SalesShowcase.module.css";
import { Shield, CheckCircle2, MessageCircle, Car } from "lucide-react";

export const SalesShowcase: React.FC<StoreTemplateProps> = ({
  store,
  products = [],
  isPreview = false,
}) => {
  return (
    <div className={styles.container}>
      {/* Header Sales & Dealer Resmi */}
      <div className={styles.salesHeader}>
        <div className="relative mb-3">
          {store.avatarUrl ? (
            <img
              src={store.avatarUrl}
              alt={store.name}
              className={styles.avatar}
            />
          ) : (
            <div className={`${styles.avatar} bg-slate-900 text-white flex items-center justify-center font-bold text-xl`}>
              <Car className="w-8 h-8 text-blue-400" />
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-1.5 mb-1">
          <h1 className={styles.salesName}>{store.name}</h1>
          <CheckCircle2 className="w-4 h-4 text-blue-600" />
        </div>

        <span className={styles.verifiedBadge}>
          <Shield className="w-3 h-3 inline mr-1" />
          Konsultan Resmi &bull; Unit Ready Stock
        </span>

        {store.bio && <p className={styles.salesBio}>{store.bio}</p>}
      </div>

      {/* Catalog Title */}
      <div className="w-full max-w-[440px] mb-3 flex items-center justify-between">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
          Katalog Unit &amp; Promo Spesial
        </h2>
        <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
          12 Unit Terjual
        </span>
      </div>

      {/* Full-Width Showcase Cards (Strict Vertical Layout) */}
      <div className={styles.showcaseList}>
        {products.map((item) => {
          let btnLabel = "Tanya Unit / Test Drive";
          let actionUrl = buildChatUrl(
            store.chatChannel || "WHATSAPP",
            store.chatHandle,
            `Halo Pak/Bu, saya ingin tanya info unit ${item.title}`
          );

          if (item.checkoutMode === "DIRECT_CHECKOUT") {
            btnLabel = "Booking Fee Online";
            actionUrl = `/${store.slug}/checkout/${item.slug}`;
          }

          const hasSecondary = item.secondaryModes && item.secondaryModes.length > 0;

          return (
            <div key={item.id} className={styles.unitCard}>
              {/* Unit Photo Top Full-Width */}
              <div className={styles.unitImageWrapper}>
                {item.images && item.images.length > 0 ? (
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className={styles.unitImage}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400 font-bold text-xs">
                    🚘 Unit Siap Kirim
                  </div>
                )}
                <span className="absolute top-2.5 right-2.5 bg-slate-900/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md backdrop-blur-xs">
                  Ready Stock
                </span>
              </div>

              {/* Specs Chips & Title/Price Center */}
              <div className={styles.cardContent}>
                <div className="flex flex-wrap gap-1.5 mb-1.5">
                  <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                    Tahun 2026
                  </span>
                  <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md">
                    DP Ringan
                  </span>
                  <span className="text-[10px] font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md">
                    Garansi 5 Thn
                  </span>
                </div>

                <h3 className={styles.unitTitle}>{item.title}</h3>
                <div className={styles.unitPrice}>
                  {formatCurrency(item.price, store.currency as any, store.locale as any)}
                </div>
              </div>

              {/* Action Buttons Full Width Bottom */}
              <div className="w-full flex flex-col gap-1.5 pt-2">
                <a
                  href={isPreview ? undefined : actionUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.actionBtn}
                >
                  <MessageCircle className="w-3.5 h-3.5 inline mr-1.5" />
                  <span>{btnLabel}</span>
                </a>

                {hasSecondary &&
                  item.secondaryModes!.map((sec, sIdx) => {
                    const secUrl =
                      sec.mode === "CHAT_ORDER"
                        ? buildChatUrl(
                            sec.chatChannel || store.chatChannel || "WHATSAPP",
                            sec.chatHandle || store.chatHandle,
                            `Halo, saya ingin simulasi cicilan unit: ${item.title}`
                          )
                        : sec.externalUrl || "#";

                    return (
                      <a
                        key={sIdx}
                        href={isPreview ? undefined : secUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-semibold text-blue-600 hover:underline text-center py-0.5"
                      >
                        {sec.label || "Simulasi Cicilan via WhatsApp"}
                      </a>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>

      <footer className={styles.footer}>
        Showroom Online &bull; <span className="font-bold text-slate-900">etalase.online</span>
      </footer>
    </div>
  );
};
