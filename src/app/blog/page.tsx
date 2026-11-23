import React from "react";
import { Metadata } from "next";
import { GlobalHeader } from "@/components/saas/GlobalHeader";
import { GlobalFooter } from "@/components/saas/GlobalFooter";
import { BlogListClient, BlogListItemProps } from "@/components/blog/BlogListClient";
import { BookOpen } from "lucide-react";
import {
  getPublishedPostsByLocale,
  getPublishedCategories,
} from "@/lib/queries/blog";
import {
  generateLocalizedMetadata,
  generateBreadcrumbJsonLd,
  BASE_URL,
} from "@/lib/seo/metadata-helper";
import { SupportedLocale, SUPPORTED_LOCALES } from "@/lib/config/constants";

interface BlogPageProps {
  searchParams?: {
    lang?: string;
  };
}

export const revalidate = 60; // Revalidate at most every 60 seconds

export async function generateMetadata({
  searchParams,
}: BlogPageProps): Promise<Metadata> {
  const rawLang = searchParams?.lang;
  const locale: SupportedLocale =
    rawLang && (SUPPORTED_LOCALES as readonly string[]).includes(rawLang)
      ? (rawLang as SupportedLocale)
      : "id";

  const titles: Record<SupportedLocale, string> = {
    id: "Blog & Panduan Monetisasi Chat Commerce Asia Tenggara — etalase.online",
    en: "Southeast Asia Chat Commerce & Monetization Playbooks — etalase.online",
    ms: "Blog & Panduan Pengewangan Perdagangan Chat SEA — etalase.online",
    th: "บล็อกและคู่มือสร้างรายได้ผ่านแชตในเอเชียตะวันออกเฉียงใต้ — etalase.online",
    vi: "Blog & Cẩm nang Tối ưu Bán hàng qua Chat Đông Nam Á — etalase.online",
  };

  const descriptions: Record<SupportedLocale, string> = {
    id: "Kumpulan artikel edukasi teknis, studi kasus seller lokal, optimasi bio link keranjang kuning, otomasi QRIS, dan panduan jualan produk digital di Asia Tenggara.",
    en: "Expert engineering guides, seller case studies, TikTok bio optimization, instant QRIS automation, and digital product sales strategies for Southeast Asia.",
    ms: "Koleksi panduan teknikal, kajian kes peniaga, pengoptimuman pautan bio TikTok, automasi QRIS dan penjualan produk digital.",
    th: "รวมบทความเทคนิค กรณีศึกษาผู้ขายจริง การปรับแต่งไบโอลิงก์ TikTok ระบบอัตโนมัติ QRIS และกลยุทธ์ขายสินค้าดิจิทัล",
    vi: "Tuyển tập bài viết chuyên sâu, case study bán hàng, tối ưu bio link tiếp thị liên kết và hạ tầng tự động hóa thanh toán QRIS.",
  };

  return generateLocalizedMetadata({
    path: "/blog",
    locale,
    title: titles[locale] || titles.id,
    description: descriptions[locale] || descriptions.id,
    imageUrl: `${BASE_URL}/og-preview.png`,
    type: "website",
    keywords: [
      "blog etalase",
      "panduan jualan whatsapp",
      "tutorial produk digital",
      "tips afiliasi tiktok",
      "qris borderpay otomasi",
    ],
  });
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const rawLang = searchParams?.lang;
  const locale: SupportedLocale =
    rawLang && (SUPPORTED_LOCALES as readonly string[]).includes(rawLang)
      ? (rawLang as SupportedLocale)
      : "id";

  // Query posts and categories directly from PostgreSQL database with language fallback
  const dbPosts = await getPublishedPostsByLocale(locale);
  const dbCategories = await getPublishedCategories();

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

  const categories = [allLabel, ...dbCategories];

  const heroCopy: Record<
    SupportedLocale,
    { badge: string; h1: string; subtitle: string; readMore: string }
  > = {
    id: {
      badge: "Blog & Panduan Monetisasi SEA",
      h1: "Edukasi & Trik Praktis Menjual di Jalur Chat.",
      subtitle:
        "Artikel panduan teknis, studi kasus seller lokal, dan strategi memaksimalkan konversi bio link untuk pasar Asia Tenggara.",
      readMore: "Baca Selengkapnya",
    },
    en: {
      badge: "Blog & SEA Monetization Playbooks",
      h1: "Tactical Playbooks & Chat Commerce Conversion Guides.",
      subtitle:
        "Actionable engineering playbooks, local seller case studies, and bio link conversion optimization for Southeast Asian merchants.",
      readMore: "Read Full Article",
    },
    ms: {
      badge: "Blog & Panduan Pengewangan SEA",
      h1: "Panduan Taktikal & Rahsia Jualan Jalur Chat.",
      subtitle:
        "Artikel panduan teknikal, kajian kes peniaga tempatan dan strategi memaksimumkan penukaran jualan di Asia Tenggara.",
      readMore: "Baca Penuh",
    },
    th: {
      badge: "บล็อกและแนวทางการสร้างรายได้ในเอเชียตะวันออกเฉียงใต้",
      h1: "กลยุทธ์และคู่มือการค้าผ่านแชตในเอเชียตะวันออกเฉียงใต้",
      subtitle:
        "บทความแนะนำทางเทคนิค กรณีศึกษาผู้ขายจริง และกลยุทธ์เพิ่มอัตราการสั่งซื้อผ่านไบโอลิงก์",
      readMore: "อ่านบทความฉบับเต็ม",
    },
    vi: {
      badge: "Blog & Cẩm nang Kiếm tiền Trực tuyến Đông Nam Á",
      h1: "Cẩm nang Chiến thuật & Tối ưu Bán hàng qua Tin nhắn.",
      subtitle:
        "Các bài viết hướng dẫn thực chiến, case study bán hàng thực tế và chiến lược tối ưu hóa chuyển đổi link bio.",
      readMore: "Đọc toàn bộ bài viết",
    },
  };

  const copy = heroCopy[locale] || heroCopy.id;

  const homeLabel =
    locale === "id"
      ? "Beranda"
      : locale === "ms"
      ? "Utama"
      : locale === "th"
      ? "หน้าแรก"
      : locale === "vi"
      ? "Trang chủ"
      : "Home";

  const breadcrumbsJsonLd = generateBreadcrumbJsonLd([
    { name: homeLabel, url: "/" },
    { name: "Blog", url: locale === "id" ? "/blog" : `/${locale}/blog` },
  ]);

  const blogSchemaJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: copy.h1,
    description: copy.subtitle,
    url: `${BASE_URL}${locale === "id" ? "" : `/${locale}`}/blog`,
    publisher: {
      "@type": "Organization",
      name: "etalase.online",
      url: BASE_URL,
      logo: `${BASE_URL}/favicon.svg`,
    },
    blogPost: dbPosts.map((a) => ({
      "@type": "BlogPosting",
      headline: a.title,
      description: a.excerpt,
      url: `${BASE_URL}${locale === "id" ? "" : `/${locale}`}/blog/${a.slug}`,
      datePublished: a.publishedAt?.toISOString(),
      dateModified: a.updatedAt.toISOString(),
      image: a.coverImage || `${BASE_URL}/og-preview.png`,
      author: {
        "@type": "Organization",
        name: a.authorName,
      },
    })),
  };

  // Convert Date objects to strings for Client Component
  const serializableArticles: BlogListItemProps[] = dbPosts.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    readingTimeMin: p.readingTimeMin,
    publishedAt: p.publishedAt ? p.publishedAt.toISOString() : null,
    coverImage: p.coverImage,
    coverAlt: p.coverAlt,
    authorName: p.authorName,
    authorRole: p.authorRole,
    resolvedLocale: p.resolvedLocale,
    isExactLocale: p.isExactLocale,
    availableLocales: p.availableLocales,
  }));

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-[#1C1917]">
      {/* Schema.org Breadcrumbs & Blog JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchemaJsonLd) }}
      />

      <GlobalHeader />

      {/* Semantic Breadcrumbs Bar */}
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 pt-6">
        <nav aria-label="Breadcrumb" className="text-xs text-[#57534E] flex items-center gap-2">
          <a href={locale === "id" ? "/" : `/${locale}`} className="hover:text-[#D94E28] transition">
            {homeLabel}
          </a>
          <span>/</span>
          <span className="font-semibold text-[#1C1917]">Blog</span>
        </nav>
      </div>

      {/* Header Section */}
      <section className="pt-8 pb-10 px-4 sm:px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-1.5 bg-[#FDF0EC] border border-[#FADCD3] text-[#D94E28] px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{copy.badge}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1C1917] mb-4">
          {copy.h1}
        </h1>
        <p className="text-[#57534E] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          {copy.subtitle}
        </p>
      </section>

      {/* Articles Grid with Interactive Filter Client */}
      <section className="pb-24 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <BlogListClient
          articles={serializableArticles}
          categories={categories}
          locale={locale}
          readMoreLabel={copy.readMore}
        />
      </section>

      <GlobalFooter />
    </div>
  );
}
