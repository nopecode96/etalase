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

  return (
    <div className="w-full min-h-full transition-colors duration-300" style={containerStyle}>
      <TemplateComponent
        store={store}
        products={products}
        blocks={blocks}
        isPreview={isPreview}
        isMockup={isMockup}
      />
    </div>
  );
};
