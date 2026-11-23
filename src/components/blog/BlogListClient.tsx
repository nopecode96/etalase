"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, User, Globe } from "lucide-react";
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

export function BlogListClient({
  articles,
  categories,
  locale,
  readMoreLabel,
}: BlogListClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("ALL");

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

  const filterOptions = [
    { id: "ALL", label: allLabel },
    ...categories
      .filter((c) => c !== "Semua" && c !== "All" && c !== "ทั้งหมด" && c !== "Tất cả")
      .map((c) => ({
        id: c,
        label: getLocalizedCategory(c, locale),
      })),
  ];

  const filtered =
    selectedCategory === "ALL"
      ? articles
      : articles.filter((a) => a.category === selectedCategory);

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
        { day: "numeric", month: "long", year: "numeric" }
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
        return `${mins} นาทีในการอ่าน`;
      case "vi":
        return `${mins} phút đọc`;
      case "id":
      default:
        return `${mins} min baca`;
    }
  };

  return (
    <div className="w-full space-y-12">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {filterOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setSelectedCategory(opt.id)}
            type="button"
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
              selectedCategory === opt.id
                ? "bg-[#D94E28] text-white shadow-xs"
                : "bg-white text-[#57534E] hover:text-[#1C1917] border border-[#E7E5E4]"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((item) => (
          <Link
            key={item.slug}
            href={getArticleHref(item.slug)}
            className="group flex flex-col justify-between bg-white border border-[#E7E5E4] rounded-3xl overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300"
          >
            <div>
              {/* Image Container with Stable Aspect Ratio & Semantic Alt */}
              <div className="w-full aspect-16/9 overflow-hidden bg-stone-100 relative">
                <img
                  src={
                    item.coverImage ||
                    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80"
                  }
                  alt={item.coverAlt}
                  loading="lazy"
                  width={600}
                  height={338}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="bg-[#D94E28] text-white text-[11px] font-bold px-3 py-1 rounded-md shadow-xs">
                    {getLocalizedCategory(item.category, locale)}
                  </span>
                  {!item.isExactLocale && (
                    <span className="inline-flex items-center gap-1 bg-white/95 text-amber-800 text-[10px] font-bold px-2 py-1 rounded-md shadow-xs border border-amber-200">
                      <Globe className="w-3 h-3 text-amber-600" />
                      <span>{localeNames[item.resolvedLocale] || item.resolvedLocale.toUpperCase()} Version</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Text Info */}
              <div className="p-6 sm:p-8 space-y-3">
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#57534E]">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#D94E28]" />
                    <span className="font-medium text-[#1C1917]">{item.authorName}</span>
                  </span>
                  {item.publishedAt && (
                    <>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formatDate(item.publishedAt)}</span>
                      </span>
                    </>
                  )}
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{formatReadingTime(item.readingTimeMin)}</span>
                  </span>
                </div>

                <h2 className="text-xl font-bold text-[#1C1917] group-hover:text-[#D94E28] transition-colors leading-snug">
                  {item.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed line-clamp-3">
                  {item.excerpt}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0 flex items-center justify-between">
              <span className="inline-flex items-center text-xs font-bold text-[#D94E28] gap-1.5 group-hover:gap-2.5 transition-all">
                <span>{readMoreLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </span>

              {item.availableLocales.length > 1 && (
                <div className="flex items-center gap-1 text-[10px] font-mono text-[#57534E]">
                  {item.availableLocales.map((loc) => (
                    <span
                      key={loc}
                      className={`px-1.5 py-0.5 rounded ${
                        loc === item.resolvedLocale
                          ? "bg-[#FDF0EC] text-[#D94E28] font-bold"
                          : "text-stone-400"
                      }`}
                    >
                      {loc.toUpperCase()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
