"use client";

import React, { useState } from "react";
import { Share2, Check } from "lucide-react";

export function TopBar({
  slug,
  isMockup = false,
}: {
  slug: string;
  isMockup?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMockup) return;

    const shareUrl = typeof window !== "undefined" ? window.location.href : `https://${slug}.etalase.online`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: slug,
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback to copy
      }
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full px-4 py-2 flex items-center justify-between text-xs text-stone-500 border-b border-black/5 bg-white/70 backdrop-blur-xs select-none z-10 shrink-0">
      <span className="font-mono text-[11px] font-semibold text-stone-700 truncate max-w-[200px]">
        {slug}.etalase.online
      </span>

      <button
        type="button"
        onClick={handleShare}
        aria-label="Bagikan etalase"
        className="p-1 rounded-lg hover:bg-black/5 text-stone-600 transition flex items-center gap-1 cursor-pointer"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[10px] text-emerald-600 font-bold">Disalin</span>
          </>
        ) : (
          <Share2 className="w-3.5 h-3.5" />
        )}
      </button>
    </div>
  );
}
