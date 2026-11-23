import React from "react";
import styles from "./SalesShowcase.module.css";
import { StoreTemplateProps } from "../types";
import { formatCurrency, buildChatUrl } from "@/lib/core/formatters";
import { MARKETPLACE_PRESETS } from "@/lib/config/constants";
import { CHAT_CHANNELS_REGISTRY } from "@/lib/master-data/sea-registry";

export const SalesShowcase: React.FC<StoreTemplateProps> = ({
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
            <div className="w-full h-full rounded-full flex items-center justify-center font-bold text-blue-700 text-2xl bg-blue-100">
              {store.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className={styles.badge}>✓ Verified Official Sales</div>
        <h1 className={styles.title}>{store.name}</h1>
        {store.bio && <p className={styles.bio}>{store.bio}</p>}

        {activeChannels.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            {activeChannels.map((ch, idx) => {
              const cfg = CHAT_CHANNELS_REGISTRY[ch.channel.toUpperCase()];
              const url = buildChatUrl(ch.channel, ch.handle, `Halo ${store.name}, saya ingin konsultasi unit`);
              return (
                <a
                  key={idx}
                  href={isPreview ? undefined : url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-sm transition hover:opacity-90"
                  style={{ backgroundColor: cfg?.badgeColor || "#2563eb" }}
                >
                  <span>Hubungi via {cfg?.name || ch.channel}</span>
                </a>
              );
            })}
          </div>
        )}
      </div>

      <div className={styles.productList}>
        {products.map((item) => {
          let btnLabel = "Konsultasi Promo";
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
            btnLabel = "Tanya Unit / Test Drive";
            actionUrl = buildChatUrl(
              store.chatChannel || "WHATSAPP",
              store.chatHandle,
              `Halo Pak/Bu, saya tertarik dengan unit ${item.title}`
            );
          } else {
            actionUrl = `/${store.slug}/checkout/${item.slug}`;
          }

          const hasSecondary = item.secondaryModes && item.secondaryModes.length > 0;

          return (
            <div key={item.id} className={styles.productCard}>
              <div className={styles.imageContainer}>
                {item.images && item.images.length > 0 ? (
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className={styles.productImage}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold text-slate-400 text-sm">
                    Unit Siap Kirim
                  </div>
                )}
              </div>

              <div className={styles.cardBody}>
                <div>
                  <h3 className={styles.productTitle}>{item.title}</h3>
                  <div className={styles.productPrice}>
                    {formatCurrency(item.price, store.currency as any, store.locale as any)}
                  </div>
                </div>

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
                            `Halo, saya ingin tanya info unit: ${item.title}`
                          )
                        : sec.externalUrl || "#";

                    return (
                      <a
                        key={sIdx}
                        href={isPreview ? undefined : secUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-bold text-blue-600 hover:underline text-center py-1"
                      >
                        {sec.label || "Simulasi Cicilan via Chat"}
                      </a>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>

      <footer className={styles.footer}>
        Showroom digital ditenagai oleh <span className="font-semibold text-slate-800">etalase.online</span>
      </footer>
    </div>
  );
};
