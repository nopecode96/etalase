import React from "react";
import styles from "./CatalogGrid.module.css";
import { StoreTemplateProps } from "../types";
import { formatCurrency, buildChatUrl } from "@/lib/core/formatters";
import { MARKETPLACE_PRESETS } from "@/lib/config/constants";
import { CHAT_CHANNELS_REGISTRY } from "@/lib/master-data/sea-registry";

export const CatalogGrid: React.FC<StoreTemplateProps> = ({
  store,
  products = [],
  isPreview = false,
}) => {
  const activeChannels = (store.chatChannels && store.chatChannels.length > 0)
    ? store.chatChannels
    : store.chatHandle
    ? [{ channel: store.chatChannel || "WHATSAPP", handle: store.chatHandle }]
    : [];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.avatar}>
          {store.avatarUrl ? (
            <img
              src={store.avatarUrl}
              alt={store.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <div className="w-full h-full rounded-full flex items-center justify-center font-bold text-slate-500 text-xl">
              {store.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className={styles.storeInfo}>
          <h1 className={styles.title}>{store.name}</h1>
          {store.bio && <p className={styles.bio}>{store.bio}</p>}

          {/* Multi-Channel Chat Row */}
          {activeChannels.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              {activeChannels.map((ch, idx) => {
                const cfg = CHAT_CHANNELS_REGISTRY[ch.channel.toUpperCase()];
                const url = buildChatUrl(ch.channel, ch.handle, `Halo ${store.name}`);
                return (
                  <a
                    key={idx}
                    href={isPreview ? undefined : url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold text-white transition hover:opacity-90"
                    style={{ backgroundColor: cfg?.badgeColor || "#0f172a" }}
                  >
                    <span>{cfg?.name || ch.channel}</span>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </header>

      <div className={styles.productGrid}>
        {products.map((item) => {
          let btnLabel = "Beli";
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
            btnLabel = "Chat";
            actionUrl = buildChatUrl(
              store.chatChannel || "WHATSAPP",
              store.chatHandle,
              `Halo, saya ingin order ${item.title}`
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
                <div className={`${styles.productImage} flex items-center justify-center text-xs text-slate-400`}>
                  Foto
                </div>
              )}
              <div className={styles.cardBody}>
                <h3 className={styles.productTitle}>{item.title}</h3>
                <div className={styles.productPrice}>
                  {formatCurrency(item.price, store.currency as any, store.locale as any)}
                </div>

                <div className="mt-auto flex flex-col gap-1">
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
                          className="text-[10px] font-semibold text-slate-500 hover:text-orange-600 text-center py-0.5 transition"
                        >
                          {sec.label || "Tanya Chat"}
                        </a>
                      );
                    })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <footer className={styles.footer}>
        Ditenagai oleh <span className="font-semibold text-slate-700">etalase.online</span>
      </footer>
    </div>
  );
};
