import React from "react";
import styles from "./SageCreator.module.css";
import { StoreTemplateProps } from "../types";
import { formatCurrency, buildChatUrl } from "@/lib/core/formatters";
import { MARKETPLACE_PRESETS } from "@/lib/config/constants";
import { CHAT_CHANNELS_REGISTRY } from "@/lib/master-data/sea-registry";

export const SageCreator: React.FC<StoreTemplateProps> = ({
  store,
  products = [],
  isPreview = false,
}) => {
  const activeChannels =
    store.chatChannels && store.chatChannels.length > 0
      ? store.chatChannels
      : store.chatHandle
      ? [{ channel: store.chatChannel || "WHATSAPP", handle: store.chatHandle }]
      : [];

  return (
    <div className={styles.container}>
      <div className={styles.profileCard}>
        <div className={styles.avatar}>
          {store.avatarUrl ? (
            <img
              src={store.avatarUrl}
              alt={store.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <div className="w-full h-full rounded-full flex items-center justify-center font-bold text-sage-800 text-2xl bg-[#dce3d8]">
              {store.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <h1 className={styles.title}>{store.name}</h1>
        {store.bio && <p className={styles.bio}>{store.bio}</p>}

        {activeChannels.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            {activeChannels.map((ch, idx) => {
              const cfg = CHAT_CHANNELS_REGISTRY[ch.channel.toUpperCase()];
              const url = buildChatUrl(ch.channel, ch.handle, `Halo ${store.name}`);
              return (
                <a
                  key={idx}
                  href={isPreview ? undefined : url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-sm transition hover:opacity-90"
                  style={{ backgroundColor: cfg?.badgeColor || "#4a5d4e" }}
                >
                  <span>Chat di {cfg?.name || ch.channel}</span>
                </a>
              );
            })}
          </div>
        )}
      </div>

      <div className={styles.productList}>
        {products.map((item) => {
          let btnLabel = "Beli Sekarang";
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
            btnLabel = "Chat Penjual";
            actionUrl = buildChatUrl(
              store.chatChannel || "WHATSAPP",
              store.chatHandle,
              `Halo, saya tertarik dengan ${item.title}`
            );
          } else {
            actionUrl = `/${store.slug}/checkout/${item.slug}`;
          }

          const hasSecondary = item.secondaryModes && item.secondaryModes.length > 0;

          return (
            <div key={item.id} className={styles.productCard}>
              {item.images && item.images.length > 0 ? (
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className={styles.productImage}
                />
              ) : (
                <div className={`${styles.productImage} flex items-center justify-center text-xs text-[#5c6f5a] bg-[#eef2eb]`}>
                  <svg className="w-5 h-5 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                    <circle cx="9" cy="9" r="2"/>
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                  </svg>
                </div>
              )}
              <div className={styles.productInfo}>
                <h3 className={styles.productTitle}>{item.title}</h3>
                <div className={styles.productPrice}>
                  {formatCurrency(item.price, store.currency as any, store.locale as any)}
                </div>
              </div>

              <div className="flex flex-col gap-1 shrink-0">
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
                            `Halo, saya ingin tanya: ${item.title}`
                          )
                        : sec.externalUrl || "#";

                    return (
                      <a
                        key={sIdx}
                        href={isPreview ? undefined : secUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-semibold text-[#5c6f5a] hover:text-[#283618] text-center py-1 transition"
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

      {store.tier === "FREE" && (
        <footer className={styles.footer}>
          Ditenagai oleh <span className="font-semibold text-[#283618]">etalase.online</span>
        </footer>
      )}
    </div>
  );
};
