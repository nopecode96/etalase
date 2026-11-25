"use client";

import React from "react";
import { StoreTemplateProps } from "./types";
import { getTemplateComponent } from "./index";

export const TemplateRenderer: React.FC<StoreTemplateProps> = ({
  store,
  products = [],
  blocks = [],
  isPreview = false,
  isMockup = false,
}) => {
  const TemplateComponent = getTemplateComponent(store.templateId);
  const appearance = store.appearanceConfig;

  // Compute background styling overrides if specified
  const containerStyle: React.CSSProperties = {};

  if (appearance?.bgType === "solid" && appearance.bgValue) {
    containerStyle.backgroundColor = appearance.bgValue;
  } else if (appearance?.bgType === "gradient" && appearance.bgValue) {
    containerStyle.backgroundImage = appearance.bgValue;
  } else if (appearance?.bgType === "pattern") {
    if (appearance.bgValue === "subtle-dots") {
      containerStyle.backgroundColor = "#F8FAFC";
      containerStyle.backgroundImage = "radial-gradient(#CBD5E1 1px, transparent 1px)";
      containerStyle.backgroundSize = "20px 20px";
    } else if (appearance.bgValue === "organic-pastel") {
      containerStyle.backgroundColor = "#FDF8F6";
      containerStyle.backgroundImage = "radial-gradient(at 0% 0%, #FFE4E6 0px, transparent 50%), radial-gradient(at 100% 100%, #FEE2E2 0px, transparent 50%)";
    } else if (appearance.bgValue === "grid") {
      containerStyle.backgroundColor = "#FAFAF9";
      containerStyle.backgroundImage = "linear-gradient(to right, #E7E5E4 1px, transparent 1px), linear-gradient(to bottom, #E7E5E4 1px, transparent 1px)";
      containerStyle.backgroundSize = "24px 24px";
    }
  } else if (appearance?.bgType === "image" && appearance.bgValue) {
    containerStyle.backgroundImage = `url(${appearance.bgValue})`;
    containerStyle.backgroundSize = "cover";
    containerStyle.backgroundPosition = "center top";
    containerStyle.backgroundAttachment = "fixed";
  }

  const activeBlocks = (blocks.length > 0 ? blocks : store.blocks || []).filter(
    (b) => b.isActive !== false
  );

  return (
    <div className="w-full min-h-full overflow-x-hidden transition-colors duration-300" style={containerStyle}>
      <div className={isMockup ? "w-full" : "w-full max-w-[480px] mx-auto min-h-screen"}>
        <TemplateComponent
          store={store}
          products={products}
          blocks={blocks}
          isPreview={isPreview}
          isMockup={isMockup}
        />

        {activeBlocks.length > 0 && (
          <section className="w-full max-w-[28rem] mx-auto px-4 pb-10 space-y-3">
          {activeBlocks.map((block) => {
            const href = isMockup ? "#" : block.targetUrl || undefined;
            if (block.type === "IMAGE_BANNER" && block.imageUrl) {
              const inner = (
                <div className="rounded-2xl overflow-hidden border border-black/10 bg-white shadow-xs group">
                  <img
                    src={block.imageUrl}
                    alt={block.title || "Promo Banner"}
                    className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform"
                  />
                  {(block.title || block.subtitle) && (
                    <div className="p-3.5 text-left">
                      {block.badgeText && (
                        <span className="inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#FDF0EC] text-[#D94E28] mb-1">
                          {block.badgeText}
                        </span>
                      )}
                      {block.title && (
                        <div className="text-sm font-bold text-stone-900">{block.title}</div>
                      )}
                      {block.subtitle && (
                        <div className="text-xs text-stone-500 mt-0.5">{block.subtitle}</div>
                      )}
                    </div>
                  )}
                </div>
              );
              return href ? (
                <a
                  key={block.id}
                  href={href}
                  target={isMockup ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="block"
                >
                  {inner}
                </a>
              ) : (
                <div key={block.id}>{inner}</div>
              );
            }

            if (block.type === "TEXT_QUOTE") {
              return (
                <div
                  key={block.id}
                  className="rounded-2xl border border-black/10 bg-white/95 backdrop-blur-xs p-4 text-left shadow-2xs"
                >
                  {block.badgeText && (
                    <span className="inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 mb-1.5">
                      {block.badgeText}
                    </span>
                  )}
                  {block.title && (
                    <div className="text-sm font-bold text-stone-900">{block.title}</div>
                  )}
                  {block.subtitle && (
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">{block.subtitle}</p>
                  )}
                </div>
              );
            }

            // LINK_BUTTON or default action card
            return (
              <a
                key={block.id}
                href={href || "#"}
                target={href && !isMockup ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 rounded-2xl border border-black/10 bg-white/95 hover:bg-white p-4 shadow-2xs transition"
              >
                <div className="min-w-0 text-left">
                  {block.badgeText && (
                    <span className="inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#FDF0EC] text-[#D94E28] mb-1">
                      {block.badgeText}
                    </span>
                  )}
                  <div className="text-sm font-bold text-stone-900 truncate">
                    {block.title || "Lihat Tautan"}
                  </div>
                  {block.subtitle && (
                    <div className="text-xs text-stone-500 truncate mt-0.5">{block.subtitle}</div>
                  )}
                </div>
                <span className="text-xs font-bold text-[#D94E28] shrink-0">Buka →</span>
              </a>
            );
          })}
        </section>
      )}
      </div>
    </div>
  );
};
