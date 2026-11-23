import { Metadata } from "next";
import { SupportedLocale, SUPPORTED_LOCALES } from "@/lib/config/constants";

export const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://etalase.online";

export const LOCALE_OG_MAP: Record<SupportedLocale, string> = {
  id: "id_ID",
  en: "en_US",
  ms: "ms_MY",
  th: "th_TH",
  vi: "vi_VN",
};

export const EDITORIAL_TEAM_MAP: Record<SupportedLocale, string> = {
  id: "Tim Editorial Etalase.online",
  en: "Etalase.online Editorial Team",
  ms: "Pasukan Editorial Etalase.online",
  th: "ทีมบรรณาธิการ Etalase.online",
  vi: "Đội ngũ Biên tập Etalase.online",
};

export interface LocalizedMetadataOptions {
  path: string;
  locale: SupportedLocale;
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authorName?: string;
  keywords?: string[];
}

/**
 * Builds localized Next.js metadata conforming to technical SEO, OpenGraph,
 * Twitter cards, hreflang alternates, and canonical links.
 */
export function generateLocalizedMetadata({
  path,
  locale = "id",
  title,
  description,
  imageUrl = `${BASE_URL}/og-preview.png`,
  imageAlt = "etalase.online — Satu Website Etalase untuk Semua Jualan Anda",
  type = "website",
  publishedTime,
  modifiedTime,
  authorName,
  keywords = [],
}: LocalizedMetadataOptions): Metadata {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl =
    locale === "id" ? `${BASE_URL}${cleanPath}` : `${BASE_URL}/${locale}${cleanPath}`;

  const alternatesLanguages: Record<string, string> = {
    "x-default": `${BASE_URL}${cleanPath}`,
    id: `${BASE_URL}${cleanPath}`,
    en: `${BASE_URL}/en${cleanPath}`,
    ms: `${BASE_URL}/ms${cleanPath}`,
    th: `${BASE_URL}/th${cleanPath}`,
    vi: `${BASE_URL}/vi${cleanPath}`,
  };

  const resolvedAuthor = authorName || EDITORIAL_TEAM_MAP[locale];

  return {
    metadataBase: new URL(BASE_URL),
    title,
    description,
    keywords: [
      ...keywords,
      "etalase online",
      "bio link toko online",
      "checkout whatsapp",
      "qris instan",
      "katalog digital asia tenggara",
    ],
    authors: [{ name: resolvedAuthor, url: `${BASE_URL}/tentang-kami` }],
    creator: resolvedAuthor,
    publisher: "PT Etalase Digital Asia",
    alternates: {
      canonical: canonicalUrl,
      languages: alternatesLanguages,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "etalase.online",
      locale: LOCALE_OG_MAP[locale],
      type: type === "article" ? "article" : "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors: [resolvedAuthor],
        section: "E-Commerce Education",
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: "@etalase_online",
      site: "@etalase_online",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

/**
 * Organization Schema.org JSON-LD
 */
export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "etalase.online",
    legalName: "PT Etalase Digital Asia",
    url: BASE_URL,
    logo: `${BASE_URL}/favicon.svg`,
    description:
      "Platform storefront terintegrasi, bio link visual, dan sistem checkout otomatis via WhatsApp & QRIS untuk pebisnis di Asia Tenggara.",
    sameAs: [
      "https://instagram.com/etalase.online",
      "https://tiktok.com/@etalase.online",
      "https://twitter.com/etalase_online",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+62-812-3456-7890",
      contactType: "customer service",
      email: "support@etalase.online",
      availableLanguage: [
        "Indonesian",
        "English",
        "Malay",
        "Thai",
        "Vietnamese",
      ],
      areaServed: ["ID", "MY", "SG", "TH", "VN", "PH"],
    },
  };
}

/**
 * WebSite Schema.org JSON-LD
 */
export function generateWebsiteJsonLd(locale: SupportedLocale = "id") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "etalase.online",
    url: BASE_URL,
    inLanguage: locale,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * SoftwareApplication Schema.org JSON-LD for Homepage
 */
export function generateSoftwareAppJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Etalase.online Storefront Platform",
    operatingSystem: "Web Browser, iOS, Android",
    applicationCategory: "BusinessApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "IDR",
    },
    featureList: [
      "Bio Link Visual & Storefront Modern",
      "Checkout WhatsApp Tanpa Potongan Komisi (0%)",
      "Pembayaran QRIS BorderPay Terverifikasi Otomatis",
      "Pengiriman Produk Digital Otomatis ke WhatsApp 3 Detik",
      "4 Arketipe Template Terisolasi",
      "Dukungan Mata Uang Asia Tenggara (IDR, MYR, SGD, THB, VND, PHP)",
    ],
  };
}

/**
 * BreadcrumbList Schema.org JSON-LD
 */
export function generateBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}

/**
 * Article / BlogPosting Schema.org JSON-LD
 */
export function generateArticleJsonLd({
  title,
  description,
  url,
  imageUrl,
  datePublished,
  dateModified,
  authorName,
  locale = "id",
}: {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  datePublished: string;
  dateModified: string;
  authorName?: string;
  locale?: SupportedLocale;
}) {
  const author = authorName || EDITORIAL_TEAM_MAP[locale];
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    image: [imageUrl],
    datePublished: datePublished,
    dateModified: dateModified,
    inLanguage: locale,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    author: {
      "@type": "Organization",
      name: author,
      url: `${BASE_URL}/tentang-kami`,
    },
    publisher: {
      "@type": "Organization",
      name: "etalase.online",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/favicon.svg`,
      },
    },
  };
}

/**
 * FAQPage Schema.org JSON-LD
 */
export function generateFaqJsonLd(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
