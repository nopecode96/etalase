import React from "react";
import { formatCurrency } from "@/lib/core/formatters";

export function PriceDisplay({
  price,
  compareAtPrice,
  currency = "IDR",
  locale = "id",
  size = "normal",
  accentColor,
  zeroPriceLabel,
}: {
  price: number | string;
  compareAtPrice?: number | string | null;
  currency?: any;
  locale?: string;
  size?: "sm" | "normal" | "lg";
  accentColor?: string;
  zeroPriceLabel?: string;
}) {
  const numPrice = typeof price === "number" ? price : parseFloat(String(price));
  const numCompare = compareAtPrice ? (typeof compareAtPrice === "number" ? compareAtPrice : parseFloat(String(compareAtPrice))) : null;

  // Anti-bug Rp 0: Handle quotation, DP simulation, or free consultation
  if (isNaN(numPrice) || numPrice <= 0) {
    const textLabel = zeroPriceLabel || (typeof price === "string" && price.trim().length > 0 && price !== "0"
      ? price
      : "Tanya Harga");

    return (
      <span className="font-bold text-stone-800 text-xs sm:text-sm">
        {textLabel}
      </span>
    );
  }

  const formattedPrice = formatCurrency(numPrice, currency as any, locale as any);
  const formattedCompare = numCompare && numCompare > numPrice
    ? formatCurrency(numCompare, currency as any, locale as any)
    : null;

  const sizeClasses = {
    sm: "text-xs font-bold",
    normal: "text-sm sm:text-base font-bold",
    lg: "text-lg sm:text-xl font-extrabold",
  }[size];

  return (
    <div className="inline-flex items-baseline gap-2">
      <span
        className={`${sizeClasses} text-stone-900 tracking-tight`}
        style={accentColor ? { color: accentColor } : undefined}
      >
        {formattedPrice}
      </span>
      {formattedCompare && (
        <span className="text-[11px] sm:text-xs text-stone-400 line-through font-normal">
          {formattedCompare}
        </span>
      )}
    </div>
  );
}
