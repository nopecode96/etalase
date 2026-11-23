"use client";

import React from "react";
import Link from "next/link";

export interface EtalaseLogoProps {
  /**
   * Preset sizes:
   * 'xs' = 24px icon, text-sm
   * 'sm' = 28px icon, text-base
   * 'md' = 32px icon, text-lg (Standard header / nav)
   * 'lg' = 40px icon, text-2xl (Auth card / modal header)
   * 'xl' = 48px icon, text-3xl (Hero / splash)
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /**
   * 'full': Icon + 'etalase.online'
   * 'icon': Standalone squircle icon mark
   * 'wordmark': Text only
   */
  variant?: "full" | "icon" | "wordmark";
  /**
   * 'light': Dark text on porcelain cream / white backgrounds
   * 'dark': White text on dark espresso / black backgrounds
   */
  theme?: "light" | "dark";
  /**
   * Optional destination link. Defaults to "/". Pass null or empty string to render non-clickable.
   */
  href?: string | null;
  /**
   * Display micro tagline kicker below the wordmark
   */
  withTagline?: boolean;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}

const SIZE_MAP = {
  xs: {
    iconSize: 24,
    textClass: "text-sm",
    taglineClass: "text-[9px]",
    gapClass: "gap-1.5",
  },
  sm: {
    iconSize: 28,
    textClass: "text-base",
    taglineClass: "text-[10px]",
    gapClass: "gap-2",
  },
  md: {
    iconSize: 32,
    textClass: "text-lg",
    taglineClass: "text-[11px]",
    gapClass: "gap-2.5",
  },
  lg: {
    iconSize: 40,
    textClass: "text-2xl",
    taglineClass: "text-xs",
    gapClass: "gap-3",
  },
  xl: {
    iconSize: 48,
    textClass: "text-3xl",
    taglineClass: "text-sm",
    gapClass: "gap-3.5",
  },
};

/**
 * High-fidelity vector Icon Mark for Etalase.online:
 * - Squircle base in Warm Editorial Burnt Terracotta Gradient
 * - The "Vitrine E" (3-Tier Floating Showcase Shelves)
 * - The 4-Point Curation Sparkle (Bintang Etalase)
 */
export function EtalaseLogoIcon({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-200 group-hover:scale-105 ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="etalase-icon-bg" x1="16" y1="12" x2="112" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E15326" />
          <stop offset="55%" stopColor="#D94E28" />
          <stop offset="100%" stopColor="#B33814" />
        </linearGradient>

        <linearGradient id="etalase-icon-hl" x1="64" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.04" />
        </linearGradient>

        <linearGradient id="etalase-icon-shelf" x1="28" y1="24" x2="100" y2="104" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FFF2ED" />
        </linearGradient>

        <radialGradient id="etalase-icon-aura" cx="94" cy="32" r="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFEAD9" stopOpacity="0.8" />
          <stop offset="45%" stopColor="#FF9663" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#D94E28" stopOpacity="0" />
        </radialGradient>

        <filter id="etalase-icon-shadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="2.5" floodColor="#4A1304" floodOpacity="0.32" />
        </filter>
      </defs>

      <rect x="0" y="0" width="128" height="128" rx="36" fill="url(#etalase-icon-bg)" />
      <rect x="1" y="1" width="126" height="126" rx="35" stroke="url(#etalase-icon-hl)" strokeWidth="2" fill="none" />

      <circle cx="94" cy="32" r="22" fill="url(#etalase-icon-aura)" />

      <g filter="url(#etalase-icon-shadow)">
        <path
          d="M34,24 H64 C68.4,24 72,27.6 72,32 C72,36.4 68.4,40 64,40 H46 C43.8,40 42,41.8 42,44 V52 C42,54.2 43.8,56 46,56 H76 C80.4,56 84,59.6 84,64 C84,68.4 80.4,72 76,72 H46 C43.8,72 42,73.8 42,76 V84 C42,86.2 43.8,88 46,88 H92 C96.4,88 100,91.6 100,96 C100,100.4 96.4,104 92,104 H34 C29.6,104 26,100.4 26,96 V32 C26,27.6 29.6,24 34,24 Z"
          fill="url(#etalase-icon-shelf)"
        />

        <path
          d="M94,20 C94,27.5 98.5,32 106,32 C98.5,32 94,36.5 94,44 C94,36.5 89.5,32 82,32 C89.5,32 94,27.5 94,20 Z"
          fill="#FFFFFF"
        />
        <circle cx="94" cy="32" r="2.2" fill="#FFEAD9" />
      </g>
    </svg>
  );
}

export function EtalaseLogo({
  size = "md",
  variant = "full",
  theme = "light",
  href = "/",
  withTagline = false,
  className = "",
  iconClassName = "",
  textClassName = "",
}: EtalaseLogoProps) {
  const conf = SIZE_MAP[size];

  const content = (
    <div
      className={`inline-flex items-center ${conf.gapClass} ${
        href ? "group cursor-pointer select-none" : ""
      } ${className}`}
    >
      {/* Icon Mark */}
      {variant !== "wordmark" && (
        <EtalaseLogoIcon size={conf.iconSize} className={iconClassName} />
      )}

      {/* Wordmark Typography */}
      {variant !== "icon" && (
        <div className="flex flex-col text-left leading-none">
          <span
            className={`font-black tracking-tight ${conf.textClass} ${
              theme === "dark" ? "text-white" : "text-[#1C1917]"
            } ${textClassName}`}
          >
            etalase
            <span className={theme === "dark" ? "text-[#FF8A65]" : "text-[#D94E28]"}>
              .online
            </span>
          </span>

          {withTagline && (
            <span
              className={`mt-0.5 font-medium tracking-normal ${conf.taglineClass} ${
                theme === "dark" ? "text-stone-400" : "text-[#57534E]"
              }`}
            >
              Toko Mini &bull; Katalog Instan
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center">
        {content}
      </Link>
    );
  }

  return content;
}
