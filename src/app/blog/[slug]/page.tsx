import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db/prisma";
import { GlobalHeader } from "@/components/saas/GlobalHeader";
import { GlobalFooter } from "@/components/saas/GlobalFooter";
import { getPostBySlugAndLocale } from "@/lib/queries/blog";
import {
  generateLocalizedMetadata,
  generateArticleJsonLd,
  generateBreadcrumbJsonLd,
  generateFaqJsonLd,
  BASE_URL,
} from "@/lib/seo/metadata-helper";
import { SupportedLocale, SUPPORTED_LOCALES } from "@/lib/config/constants";
import {
  Calendar,
  Clock,
  User,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Sparkles,
  Globe,
} from "lucide-react";

interface ArticlePageProps {
  params: {
    slug: string;
  };
  searchParams?: {
    lang?: string;
  };
}

export const revalidate = 60; // ISR cache revalidation every 60s

export async function generateStaticParams() {
  try {
    const posts = await prisma.post.findMany({
      where: { isPublished: true },
      select: { slug: true },
    });
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Failed to generate static params for blog:", error);
    return [
      { slug: "cara-jual-produk-digital-2027" },
      { slug: "strategi-closing-sales-mobil-chat" },
      { slug: "optimasi-keranjang-kuning-tiktok" },
      { slug: "otomasi-chat-qris-instan" },
      { slug: "panduan-ekspansi-e-commerce-asean" },
    ];
  }
}

export async function generateMetadata({
  params,
  searchParams,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = params;
  const rawLang = searchParams?.lang;
  const locale: SupportedLocale =
    rawLang && (SUPPORTED_LOCALES as readonly string[]).includes(rawLang)
      ? (rawLang as SupportedLocale)
      : "id";

  const article = await getPostBySlugAndLocale(slug, locale);
  if (!article) {
    return {
      title: "Artikel Tidak Ditemukan — etalase.online",
      description: "Halaman panduan yang Anda cari tidak tersedia di etalase.online.",
    };
  }

  const title = article.seoTitle || `${article.title} — etalase.online`;
  const description = article.seoDescription || article.excerpt;

  return generateLocalizedMetadata({
    path: `/blog/${slug}`,
    locale,
    title,
    description,
    imageUrl:
      article.coverImage ||
      `${BASE_URL}/og-preview.png`,
    imageAlt: article.coverAlt,
    type: "article",
    publishedTime: article.publishedAt ? article.publishedAt.toISOString() : undefined,
    modifiedTime: article.updatedAt.toISOString(),
    authorName: article.authorName,
    keywords: [
      article.category.toLowerCase(),
      "panduan etalase online",
      "monetisasi chat asia tenggara",
      "qris borderpay",
    ],
  });
}

interface ParsedContent {
  directAnswer?: string;
  keyTakeaways?: string[];
  table?: {
    caption: string;
    headers: string[];
    rows: string[][];
  };
  sections?: {
    heading: string;
    directAnswer?: string;
    content: string[];
    bulletPoints?: string[];
  }[];
  faqs?: {
    question: string;
    answer: string;
  }[];
  body?: string;
}

function parseArticleContent(rawContent: string): ParsedContent {
  try {
    if (rawContent.trim().startsWith("{")) {
      return JSON.parse(rawContent) as ParsedContent;
    }
  } catch {
    // If not JSON, treat as standard plain text
  }
  return {
    body: rawContent,
    sections: [
      {
        heading: "Ulasan Panduan Lengkap",
        content: [rawContent],
      },
    ],
  };
}

const LOCALE_DISPLAY_NAMES: Record<string, string> = {
  id: "Bahasa Indonesia",
  en: "English",
  ms: "Bahasa Melayu",
  th: "ภาษาไทย (Thai)",
  vi: "Tiếng Việt (Vietnamese)",
};

export default async function ArticleDetailPage({
  params,
  searchParams,
}: ArticlePageProps) {
  const { slug } = params;
  const rawLang = searchParams?.lang;
  const locale: SupportedLocale =
    rawLang && (SUPPORTED_LOCALES as readonly string[]).includes(rawLang)
      ? (rawLang as SupportedLocale)
      : "id";

  const article = await getPostBySlugAndLocale(slug, locale);
  if (!article) {
    notFound();
  }

  const parsed = parseArticleContent(article.content);
  const articleUrl = `${BASE_URL}${locale === "id" ? "" : `/${locale}`}/blog/${article.slug}`;

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    try {
      return date.toLocaleDateString(
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
      return date.toISOString();
    }
  };

  // Structured Data Schemas
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: locale === "id" ? "Beranda" : "Home", url: "/" },
    { name: "Blog", url: locale === "id" ? "/blog" : `/${locale}/blog` },
    { name: article.title, url: articleUrl },
  ]);

  const articleJsonLd = generateArticleJsonLd({
    title: article.title,
    description: article.excerpt,
    url: articleUrl,
    imageUrl:
      article.coverImage ||
      `${BASE_URL}/og-preview.png`,
    datePublished: article.publishedAt
      ? article.publishedAt.toISOString()
      : article.createdAt.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    authorName: article.authorName,
    locale,
  });

  const faqJsonLd =
    parsed.faqs && parsed.faqs.length > 0
      ? generateFaqJsonLd(parsed.faqs)
      : null;

  // Localized UI Labels
  const ui = {
    home: locale === "id" ? "Beranda" : "Home",
    factChecked:
      locale === "id"
        ? "Ditinjau & Terverifikasi Praktisi FinTech"
        : locale === "en"
        ? "Fact-Checked & Verified by FinTech Practitioners"
        : locale === "ms"
        ? "Disemak & Disahkan Pakar FinTech"
        : locale === "th"
        ? "ผ่านการตรวจสอบข้อเท็จจริงโดยผู้เชี่ยวชาญ FinTech"
        : "Được xác thực bởi Chuyên gia FinTech",
    quickAnswer:
      locale === "id"
        ? "Ringkasan Eksekutif (Jawaban Cepat)"
        : locale === "en"
        ? "Executive Summary (Quick Answer)"
        : locale === "ms"
        ? "Ringkasan Eksekutif (Jawapan Pantas)"
        : locale === "th"
        ? "สรุปใจความสำคัญ (คำตอบด่วน)"
        : "Tóm tắt Điều hành (Câu trả lời nhanh)",
    keyTakeawaysTitle:
      locale === "id"
        ? "Poin Kunci yang Perlu Anda Ketahui:"
        : locale === "en"
        ? "Key Takeaways:"
        : locale === "ms"
        ? "Perkara Utama Yang Perlu Anda Tahu:"
        : locale === "th"
        ? "ประเด็นสำคัญที่คุณต้องรู้:"
        : "Các điểm mấu chốt bạn cần biết:",
    faqsTitle:
      locale === "id"
        ? "Pertanyaan Umum (FAQ)"
        : locale === "en"
        ? "Frequently Asked Questions (FAQ)"
        : locale === "ms"
        ? "Soalan Lazim (FAQ)"
        : locale === "th"
        ? "คำถามที่พบบ่อย (FAQ)"
        : "Câu hỏi thường gặp (FAQ)",
    authorBoxTitle:
      locale === "id"
        ? "Tentang Tim Editorial & Dewan Pakar"
        : locale === "en"
        ? "About the Editorial Team & Expert Board"
        : locale === "ms"
        ? "Mengenai Pasukan Editorial & Panel Pakar"
        : locale === "th"
        ? "เกี่ยวกับทีมบรรณาธิการและคณะผู้เชี่ยวชาญ"
        : "Về Đội ngũ Biên tập & Hội đồng Chuyên gia",
    ctaTitle:
      locale === "id"
        ? "Mulai Bangun Etalase Bisnismu Hari Ini"
        : locale === "en"
        ? "Launch Your Business Storefront Today"
        : locale === "ms"
        ? "Mula Bina Etalase Anda Hari Ini"
        : locale === "th"
        ? "เริ่มสร้างหน้าร้านของคุณวันนี้"
        : "Bắt đầu Xây dựng Storefront của Bạn Ngay Hôm Nay",
    ctaSubtitle:
      locale === "id"
        ? "Gratis selamanya, 0% komisi order chat WhatsApp, dan siap jualan dalam 3 menit."
        : locale === "en"
        ? "Free forever, 0% WhatsApp chat commissions, ready to sell in 3 minutes."
        : locale === "ms"
        ? "Percuma selamanya, 0% komisen sembang WhatsApp, siap berniaga dalam 3 minit."
        : locale === "th"
        ? "ฟรีตลอดชีพ ไม่มีค่าคอมมิชชันแชต WhatsApp พร้อมขายใน 3 นาที"
        : "Miễn phí vĩnh viễn, 0% hoa hồng chat WhatsApp, sẵn sàng bán sau 3 phút.",
    ctaButton:
      locale === "id"
        ? "Daftar Gratis dengan Akun Google"
        : locale === "en"
        ? "Sign Up Free with Google"
        : locale === "ms"
        ? "Daftar Percuma dengan Google"
        : locale === "th"
        ? "สมัครฟรีด้วยบัญชี Google"
        : "Đăng ký Miễn phí với Google",
    updatedOn:
      locale === "id"
        ? "Diperbarui"
        : locale === "en"
        ? "Updated"
        : locale === "ms"
        ? "Dikemas kini"
        : locale === "th"
        ? "อัปเดตเมื่อ"
        : "Cập nhật",
    fallbackNoticeTitle:
      locale === "id"
        ? "Terjemahan Belum Tersedia"
        : locale === "en"
        ? "Translation Not Yet Available"
        : locale === "ms"
        ? "Terjemahan Belum Tersedia"
        : locale === "th"
        ? "ยังไม่มีคำแปลในภาษานี้"
        : "Chưa có bản dịch cho ngôn ngữ này",
    fallbackNoticeDesc:
      locale === "id"
        ? `Artikel ini belum tersedia dalam bahasa pilihan Anda. Kami menampilkan versi bahasa ${LOCALE_DISPLAY_NAMES[article.resolvedLocale] || article.resolvedLocale.toUpperCase()}.`
        : locale === "en"
        ? `This article is not yet translated into your selected language. Showing the ${LOCALE_DISPLAY_NAMES[article.resolvedLocale] || article.resolvedLocale.toUpperCase()} version.`
        : locale === "ms"
        ? `Artikel ini belum diterjemahkan ke dalam bahasa pilihan anda. Memaparkan versi ${LOCALE_DISPLAY_NAMES[article.resolvedLocale] || article.resolvedLocale.toUpperCase()}.`
        : locale === "th"
        ? `บทความนี้ยังไม่ได้แปลเป็นภาษาที่คุณเลือก กำลังแสดงเวอร์ชันภาษา ${LOCALE_DISPLAY_NAMES[article.resolvedLocale] || article.resolvedLocale.toUpperCase()}`
        : `Bài viết này chưa được dịch sang ngôn ngữ bạn chọn. Đang hiển thị phiên bản tiếng ${LOCALE_DISPLAY_NAMES[article.resolvedLocale] || article.resolvedLocale.toUpperCase()}.`,
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-[#1C1917]">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <GlobalHeader />

      <main className="flex-1">
        {/* Breadcrumb Navigation */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-4">
          <nav aria-label="Breadcrumb" className="text-xs text-[#57534E] flex flex-wrap items-center gap-2">
            <Link href={locale === "id" ? "/" : `/${locale}`} className="hover:text-[#D94E28] transition">
              {ui.home}
            </Link>
            <span>/</span>
            <Link href={locale === "id" ? "/blog" : `/${locale}/blog`} className="hover:text-[#D94E28] transition">
              Blog
            </Link>
            <span>/</span>
            <span className="font-semibold text-[#1C1917] truncate max-w-xs sm:max-w-md">
              {article.title}
            </span>
          </nav>
        </div>

        {/* Article Container */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
          {/* Language Fallback Notice if active locale has no translation */}
          {!article.isExactLocale && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 mb-8 text-xs sm:text-sm text-amber-900 flex items-start gap-3 shadow-2xs">
              <Globe className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold text-amber-950">
                  {ui.fallbackNoticeTitle}
                </p>
                <p className="text-amber-800 leading-relaxed">
                  {ui.fallbackNoticeDesc}
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-semibold text-amber-900">Bahasa yang tersedia:</span>
                  {article.translations.map((t) => (
                    <Link
                      key={t.locale}
                      href={t.locale === "id" ? `/blog/${article.slug}` : `/${t.locale}/blog/${article.slug}`}
                      className="px-2.5 py-1 bg-white border border-amber-300 rounded-md font-semibold text-amber-900 hover:bg-amber-100 transition"
                    >
                      {LOCALE_DISPLAY_NAMES[t.locale] || t.locale.toUpperCase()}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          <header className="space-y-4 mb-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#D94E28] text-white text-xs font-bold px-3 py-1 rounded-md shadow-2xs">
                {article.category}
              </span>
              <span className="inline-flex items-center gap-1 bg-[#FDF0EC] text-[#D94E28] border border-[#FADCD3] text-xs font-semibold px-3 py-1 rounded-md">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{ui.factChecked}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C1917] leading-[1.18]">
              {article.title}
            </h1>

            {/* Author Credentials & Dates */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#57534E] pt-2 border-b border-[#E7E5E4] pb-6">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#D94E28]/10 border border-[#D94E28]/20 flex items-center justify-center text-[#D94E28] font-bold">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-[#1C1917] block">{article.authorName}</span>
                  {article.authorRole && (
                    <span className="text-[11px] text-[#57534E]">{article.authorRole}</span>
                  )}
                </div>
              </div>
              {article.publishedAt && (
                <>
                  <span className="hidden sm:inline text-[#E7E5E4]">&bull;</span>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#57534E]" />
                    <span>{formatDate(article.publishedAt)}</span>
                    <span className="text-[#57534E]/60 text-xs">
                      ({ui.updatedOn}: {formatDate(article.updatedAt)})
                    </span>
                  </div>
                </>
              )}
              <span className="hidden sm:inline text-[#E7E5E4]">&bull;</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#57534E]" />
                <span>{article.readingTimeMin} min baca</span>
              </div>
            </div>
          </header>

          {/* Featured Cover Image with Semantic Alt */}
          {article.coverImage && (
            <figure className="mb-10">
              <div className="w-full aspect-16/9 overflow-hidden rounded-3xl bg-stone-100 border border-[#E7E5E4] shadow-xs">
                <img
                  src={article.coverImage}
                  alt={article.coverAlt}
                  width={1200}
                  height={675}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              <figcaption className="text-xs text-[#57534E] text-center mt-2.5 italic">
                {article.coverAlt}
              </figcaption>
            </figure>
          )}

          {/* AEO Direct Answer & Key Takeaways Highlight Box */}
          {parsed.directAnswer && (
            <div className="bg-[#FDF0EC] border border-[#FADCD3] rounded-3xl p-6 sm:p-8 mb-12 shadow-2xs space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D94E28] uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>{ui.quickAnswer}</span>
              </div>
              <p className="text-sm sm:text-base text-[#1C1917] font-medium leading-relaxed">
                {parsed.directAnswer}
              </p>
              {parsed.keyTakeaways && parsed.keyTakeaways.length > 0 && (
                <div className="pt-2 border-t border-[#FADCD3]/60 space-y-2">
                  <span className="text-xs font-bold text-[#1C1917] block">
                    {ui.keyTakeawaysTitle}
                  </span>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#57534E]">
                    {parsed.keyTakeaways.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#D94E28] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* GEO / AEO Comparison Table if provided */}
          {parsed.table && (
            <div className="my-10 space-y-3">
              <h3 className="text-lg font-bold text-[#1C1917]">
                {parsed.table.caption}
              </h3>
              <div className="overflow-x-auto rounded-2xl border border-[#E7E5E4] bg-white shadow-2xs">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#FAF8F5] border-b border-[#E7E5E4]">
                      {parsed.table.headers.map((h, i) => (
                        <th
                          key={i}
                          className={`p-3.5 sm:p-4 font-bold text-[#1C1917] ${
                            i === 1 ? "text-[#D94E28] bg-[#FDF0EC]/60" : ""
                          }`}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7E5E4]">
                    {parsed.table.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-stone-50/60 transition">
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`p-3.5 sm:p-4 text-[#57534E] ${
                              cIdx === 1 ? "font-semibold text-[#1C1917] bg-[#FDF0EC]/20" : ""
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Main Article Sections with Semantic H2 and Paragraphs */}
          {parsed.sections && parsed.sections.length > 0 && (
            <div className="space-y-10 my-10">
              {parsed.sections.map((section, idx) => (
                <section key={idx} className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1917] pt-2">
                    {section.heading}
                  </h2>
                  {section.directAnswer && (
                    <p className="text-sm sm:text-base font-semibold text-[#D94E28] bg-[#FDF0EC]/50 p-4 rounded-xl border border-[#FADCD3]/40">
                      {section.directAnswer}
                    </p>
                  )}
                  {section.content.map((p, pIdx) => (
                    <p key={pIdx} className="text-sm sm:text-base text-[#57534E] leading-relaxed">
                      {p}
                    </p>
                  ))}
                  {section.bulletPoints && section.bulletPoints.length > 0 && (
                    <ul className="space-y-2 pl-4 text-sm sm:text-base text-[#57534E] list-disc list-inside">
                      {section.bulletPoints.map((bp, bIdx) => (
                        <li key={bIdx}>{bp}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          )}

          {/* AEO/AIO FAQ Section */}
          {parsed.faqs && parsed.faqs.length > 0 && (
            <section className="my-14 pt-8 border-t border-[#E7E5E4] space-y-6">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#D94E28]" />
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight">
                  {ui.faqsTitle}
                </h2>
              </div>
              <div className="space-y-4">
                {parsed.faqs.map((faq, fIdx) => (
                  <div
                    key={fIdx}
                    className="bg-white border border-[#E7E5E4] rounded-2xl p-5 sm:p-6 shadow-2xs space-y-2"
                  >
                    <h3 className="text-base sm:text-lg font-bold text-[#1C1917]">
                      {faq.question}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* EEAT Author Credentials & Editorial Trust Box */}
          <section className="my-14 bg-white border border-[#E7E5E4] rounded-3xl p-6 sm:p-8 shadow-2xs space-y-4">
            <span className="text-xs font-bold text-[#D94E28] uppercase tracking-wider block">
              {ui.authorBoxTitle}
            </span>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#D94E28]/10 border border-[#D94E28]/20 flex items-center justify-center text-[#D94E28] shrink-0 font-bold text-xl">
                E
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[#1C1917]">{article.authorName}</h3>
                {article.authorRole && (
                  <p className="text-xs font-semibold text-[#D94E28]">{article.authorRole}</p>
                )}
                <p className="text-xs text-[#57534E] leading-relaxed">
                  Praktisi e-commerce dan arsitek transaksi chat dengan rekam jejak membantu lebih dari 10.000 kreator di Asia Tenggara memaksimalkan margin keuntungan.
                </p>
              </div>
            </div>
            <div className="pt-3 border-t border-[#E7E5E4] text-[11px] text-[#57534E] flex flex-wrap items-center justify-between gap-2">
              <span>Publikasi Resmi Rafa Kreasindo Teknologi &bull; Indonesia</span>
              <a
                href="mailto:support@etalase.online"
                className="text-[#D94E28] hover:underline font-medium"
              >
                support@etalase.online
              </a>
            </div>
          </section>

          {/* High-Converting CRO Call-to-Action Card */}
          <section className="my-14 bg-[#FDF0EC] border border-[#FADCD3] rounded-3xl p-8 sm:p-12 text-center shadow-xs space-y-4">
            <div className="inline-flex items-center gap-1.5 bg-white border border-[#FADCD3] text-[#D94E28] text-xs font-semibold px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Etalase Storefront 2027</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight">
              {ui.ctaTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E] max-w-md mx-auto leading-relaxed">
              {ui.ctaSubtitle}
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/register"
                className="w-full sm:w-auto bg-[#D94E28] hover:bg-[#B83E1D] text-white font-semibold px-6 py-3 rounded-xl text-xs sm:text-sm transition shadow-xs inline-flex items-center justify-center gap-2"
              >
                <span>{ui.ctaButton}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/harga"
                className="w-full sm:w-auto bg-white hover:bg-stone-50 border border-[#E7E5E4] text-[#1C1917] font-semibold px-5 py-3 rounded-xl text-xs sm:text-sm transition"
              >
                {locale === "id" ? "Bandingkan Paket Harga" : "View Pricing"}
              </Link>
            </div>
          </section>
        </article>
      </main>

      <GlobalFooter />
    </div>
  );
}
