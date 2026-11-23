"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import { SupportedLocale } from "@/lib/config/constants";

interface ArticleItem {
  slug: string;
  title: string;
  summary: string;
  category: string;
  readTime: string;
  datePublished: string;
  image: {
    url: string;
    alt: string;
    caption: string;
  };
  author: {
    name: string;
    role: string;
  };
}

interface BlogListClientProps {
  articles: ArticleItem[];
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
  const [selectedCategory, setSelectedCategory] = useState(categories[0] || "Semua");

  const filtered =
    selectedCategory === categories[0]
      ? articles
      : articles.filter((a) => a.category === selectedCategory);

  const getArticleHref = (slug: string) => {
    return locale === "id" ? `/blog/${slug}` : `/${locale}/blog/${slug}`;
  };

  const formatDate = (isoDate: string) => {
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

  return (
    <div className="w-full space-y-12">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCategory(c)}
            type="button"
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
              selectedCategory === c
                ? "bg-[#D94E28] text-white shadow-xs"
                : "bg-white text-[#57534E] hover:text-[#1C1917] border border-[#E7E5E4]"
            }`}
          >
            {c}
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
                  src={item.image.url}
                  alt={item.image.alt}
                  loading="lazy"
                  width={600}
                  height={338}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-[#D94E28] text-white text-[11px] font-bold px-3 py-1 rounded-md shadow-xs">
                  {item.category}
                </span>
              </div>

              {/* Text Info */}
              <div className="p-6 sm:p-8 space-y-3">
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#57534E]">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#D94E28]" />
                    <span className="font-medium text-[#1C1917]">{item.author.name}</span>
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatDate(item.datePublished)}</span>
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.readTime}</span>
                  </span>
                </div>

                <h2 className="text-xl font-bold text-[#1C1917] group-hover:text-[#D94E28] transition-colors leading-snug">
                  {item.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed line-clamp-3">
                  {item.summary}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0">
              <span className="inline-flex items-center text-xs font-bold text-[#D94E28] gap-1.5 group-hover:gap-2.5 transition-all">
                <span>{readMoreLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
