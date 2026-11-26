"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Calendar, Clock, ArrowUpRight, User, Globe, Search, Sparkles } from "lucide-react";
import { SupportedLocale } from "@/lib/config/constants";
import { getLocalizedCategory } from "@/lib/blog/category-translations";

export interface BlogListItemProps {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTimeMin: number;
  publishedAt: string | null;
  coverImage: string | null;
  coverAlt: string;
  authorName: string;
  authorRole: string | null;
  resolvedLocale: string;
  isExactLocale: boolean;
  availableLocales: string[];
}

interface BlogListClientProps {
  articles: BlogListItemProps[];
  categories: string[];
  locale: SupportedLocale;
  readMoreLabel: string;
}

const PIN_ASPECT_CLASSES = [
  "aspect-[4/5]",
  "aspect-[4/3]",
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[16/10]",
  "aspect-[4/5]",
  "aspect-[4/3]",
  "aspect-[3/4]",
  "aspect-[16/10]",
  "aspect-square",
];

const FALLBACK_COVER = "/images/blog/cover-digital-products.jpg";

export function BlogListClient({
  articles,
  categories,
  locale,
  readMoreLabel,
}: BlogListClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  const allLabel =
    locale === "id"
      ? "Semua"
      : locale === "en"
      ? "All"
      : locale === "ms"
      ? "Semua"
      : locale === "th"
      ? "ทั้งหมด"
      : "Tất cả";

  const searchPlaceholder =
    locale === "id"
      ? "Cari artikel, QRIS, WhatsApp, afiliasi..."
      : locale === "en"
      ? "Search playbooks, QRIS, WhatsApp, affiliate..."
      : locale === "ms"
      ? "Cari artikel, QRIS, WhatsApp, afiliasi..."
      : locale === "th"
      ? "ค้นหาบทความ, QRIS, WhatsApp..."
      : "Tìm bài viết, QRIS, WhatsApp...";

  const filterOptions = [
    { id: "ALL", label: allLabel },
    ...categories
      .filter((c) => c !== "Semua" && c !== "All" && c !== "ทั้งหมด" && c !== "Tất cả")
      .map((c) => ({
        id: c,
        label: getLocalizedCategory(c, locale),
      })),
  ];

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return articles.filter((a) => {
      const catMatch = selectedCategory === "ALL" || a.category === selectedCategory;
      if (!catMatch) return false;
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        getLocalizedCategory(a.category, locale).toLowerCase().includes(q) ||
        a.slug.toLowerCase().includes(q)
      );
    });
  }, [articles, selectedCategory, searchQuery, locale]);

  const getArticleHref = (slug: string) => {
    return locale === "id" ? `/blog/${slug}` : `/${locale}/blog/${slug}`;
  };

  const formatDate = (isoDate: string | null) => {
    if (!isoDate) return "";
    try {
      return new Date(isoDate).toLocaleDateString(
        locale === "id"
          ? "id-ID"
          : locale === "en"
          ? "en-US"
          : locale === "ms"
          ? "ms-MY"
          : locale === "th"
          ? "th-TH"
          : "vi-VN",
        { day: "numeric", month: "short", year: "numeric" }
      );
    } catch {
      return isoDate;
    }
  };

  const localeNames: Record<string, string> = {
    id: "ID",
    en: "EN",
    ms: "MS",
    th: "TH",
    vi: "VI",
  };

  const formatReadingTime = (mins: number) => {
    switch (locale) {
      case "en":
        return `${mins} min read`;
      case "ms":
        return `${mins} min baca`;
      case "th":
        return `${mins} นาที`;
      case "vi":
        return `${mins} phút`;
      case "id":
      default:
        return `${mins} min`;
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Search + Category Filter Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 max-w-3xl mx-auto">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#78716C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-[#E7E5E4] text-xs sm:text-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#D94E28]/20 focus:border-[#D94E28] transition"
            />
          </div>
          <div className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-white border border-[#E7E5E4] text-xs font-semibold text-[#57534E] shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-[#D94E28]" />
            <span>
              {filtered.length} {locale === "id" ? "Artikel" : "Articles"}
            </span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedCategory(opt.id)}
              type="button"
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                selectedCategory === opt.id
                  ? "bg-[#D94E28] text-white shadow-xs"
                  : "bg-white text-[#57534E] hover:text-[#1C1917] hover:border-[#D94E28]/40 border border-[#E7E5E4]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Pinterest-Style Masonry Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-dashed border-[#E7E5E4] rounded-3xl p-12 text-center space-y-3">
          <p className="text-sm font-bold text-[#1C1917]">
            {locale === "id"
              ? "Artikel belum ditemukan untuk filter ini"
              : "No articles match your current filter"}
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("ALL");
              setSearchQuery("");
            }}
            className="px-4 py-2 rounded-xl bg-[#FDF0EC] text-[#D94E28] text-xs font-bold hover:bg-[#FADCD3]/60 transition cursor-pointer"
          >
            {locale === "id" ? "Reset Filter" : "Reset Filter"}
          </button>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {filtered.map((item, idx) => {
            const aspectClass = PIN_ASPECT_CLASSES[idx % PIN_ASPECT_CLASSES.length];
            const isTallPin = idx % 3 === 0 || idx % 5 === 2;
            const src =
              !brokenImages[item.slug] && item.coverImage
                ? item.coverImage
                : FALLBACK_COVER;

            return (
              <Link
                key={item.slug}
                href={getArticleHref(item.slug)}
                className="group block break-inside-avoid mb-6 bg-white border border-[#E7E5E4] rounded-3xl overflow-hidden shadow-2xs hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                {/* Pin Media with Variable Aspect Ratio */}
                <div className={`w-full ${aspectClass} overflow-hidden bg-stone-100 relative`}>
                  <img
                    src={src}
                    alt={item.coverAlt}
                    loading={idx < 3 ? "eager" : "lazy"}
                    onError={() =>
                      setBrokenImages((prev) => ({ ...prev, [item.slug]: true }))
                    }
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  />

                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                  {/* Top floating pills */}
                  <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                    <span className="bg-[#D94E28] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                      {getLocalizedCategory(item.category, locale)}
                    </span>

                    <span className="inline-flex items-center gap-1 bg-black/55 backdrop-blur-xs text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                      <Clock className="w-3 h-3" />
                      <span>{formatReadingTime(item.readingTimeMin)}</span>
                    </span>
                  </div>

                  {/* Bottom pin action hint */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                    {!item.isExactLocale ? (
                      <span className="inline-flex items-center gap-1 bg-white/95 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200">
                        <Globe className="w-3 h-3 text-amber-600" />
                        <span>
                          {localeNames[item.resolvedLocale] ||
                            item.resolvedLocale.toUpperCase()}
                        </span>
                      </span>
                    ) : (
                      <span />
                    )}

                    <span className="inline-flex items-center gap-1 bg-white text-[#1C1917] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm opacity-95 group-hover:bg-[#D94E28] group-hover:text-white transition-colors">
                      <span>{readMoreLabel}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* Pin Editorial Card Body */}
                <div className="p-5 space-y-2.5">
                  <h2 className="text-base sm:text-[17px] font-bold text-[#1C1917] group-hover:text-[#D94E28] transition-colors leading-snug">
                    {item.title}
                  </h2>

                  <p
                    className={`text-xs text-[#57534E] leading-relaxed ${
                      isTallPin ? "line-clamp-4" : "line-clamp-2"
                    }`}
                  >
                    {item.excerpt}
                  </p>

                  {/* Pin Footer Metadata */}
                  <div className="pt-2.5 border-t border-[#F5F5F4] flex items-center justify-between gap-2 text-[11px] text-[#78716C]">
                    <span className="flex items-center gap-1.5 min-w-0 truncate">
                      <User className="w-3 h-3 text-[#D94E28] shrink-0" />
                      <span className="font-medium text-[#1C1917] truncate">
                        {item.authorName}
                      </span>
                    </span>

                    <div className="flex items-center gap-2 shrink-0">
                      {item.publishedAt && (
                        <span className="flex items-center gap-1 text-[10px]">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(item.publishedAt)}</span>
                        </span>
                      )}
                      {item.availableLocales.length > 1 && (
                        <span className="px-1.5 py-0.5 rounded bg-[#FDF0EC] text-[#D94E28] text-[9px] font-bold">
                          {item.availableLocales.length} Lang
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
