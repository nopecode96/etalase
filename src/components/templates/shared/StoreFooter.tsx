"use client";

import React from "react";

export function StoreFooter({
  tier,
  className = "",
}: {
  tier?: string | null;
  className?: string;
}) {
  const isProOrDfy = tier === "PRO" || tier === "DFY" || tier === "DFY_BUSINESS";
  if (isProOrDfy) {
    return null;
  }

  return (
    <footer
      className={`w-full py-5 px-4 text-center text-[11px] text-stone-400 ${className}`}
    >
      <span>Powered by </span>
      <a
        href="https://etalase.online"
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-stone-600 hover:underline"
      >
        etalase.online
      </a>
    </footer>
  );
}
