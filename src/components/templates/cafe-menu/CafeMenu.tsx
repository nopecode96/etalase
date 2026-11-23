import React from "react";
import styles from "./CafeMenu.module.css";
import { StoreTemplateProps } from "../types";
import { formatCurrency, buildChatUrl } from "@/lib/core/formatters";
import { MARKETPLACE_PRESETS } from "@/lib/config/constants";
import { CHAT_CHANNELS_REGISTRY } from "@/lib/master-data/sea-registry";

export const CafeMenu: React.FC<StoreTemplateProps> = ({
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
            <div className="w-full h-full rounded-full flex items-center justify-center font-bold text-amber-800 text-2xl">
              ☕
            </div>
          )}
        </div>
        <h1 className={styles.title}>{store.name}</h1>
        {store.bio && <p className={styles.bio}>{store.bio}</p>}
        <div className={styles.hoursBadge}>🕒 Buka Setiap Hari: 08:00 - 22:00</div>

        {activeChannels.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            {activeChannels.map((ch, idx) => {
              const cfg = CHAT_CHANNELS_REGISTRY[ch.channel.toUpperCase()];
              const url = buildChatUrl(ch.channel, ch.handle, `Halo ${store.name}, saya mau order menu`);
              return (
                <a
                  key={idx}
                  href={isPreview ? undefined : url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-sm transition hover:opacity-90"
                  style={{ backgroundColor: cfg?.badgeColor || "#b45309" }}
                >
                  <span>Order via {cfg?.name || ch.channel}</span>
                </a>
              );
            })}
          </div>
        )}
      </div>

      <div className={styles.productList}>
        {products.map((item) => {
          let btnLabel = "Pesan Menu";
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
            btnLabel = "Pesan Chat";
            actionUrl = buildChatUrl(
              store.chatChannel || "WHATSAPP",
              store.chatHandle,
              `Halo, saya ingin pesan: ${item.title}`
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
                <div className={`${styles.productImage} flex items-center justify-center text-xs text-amber-700 font-bold`}>
                  Menu
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
                            `Halo, saya ingin tanya ketersediaan menu: ${item.title}`
                          )
                        : sec.externalUrl || "#";

                    return (
                      <a
                        key={sIdx}
                        href={isPreview ? undefined : secUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] font-semibold text-amber-800 hover:underline text-center py-0.5"
                      >
                        {sec.label || "Tanya Kasir"}
                      </a>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>

      <footer className={styles.footer}>
        Buku menu digital oleh <span className="font-semibold text-[#78350f]">etalase.online</span>
      </footer>
    </div>
  );
};
