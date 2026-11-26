import { Metadata } from "next";
import {
  SupportedLocale,
  SUPPORTED_LOCALES,
  OFFICIAL_SOCIAL_URLS,
} from "@/lib/config/constants";

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
  imageAlt = "etalase.online — Katalog Online yang Closing di WhatsApp. Gratis, Tanpa Komisi.",
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
    authors: [{ name: resolvedAuthor, url: `${BASE_URL}/about` }],
    creator: resolvedAuthor,
    publisher: "Rafa Kreasindo Teknologi",
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
    legalName: "PT Rafa Kreasindo Teknologi",
    url: BASE_URL,
    logo: `${BASE_URL}/favicon.svg`,
    description:
      "Platform katalog online, bio link visual, dan checkout WhatsApp (0% komisi) serta QRIS otomatis untuk kreator, UMKM, kafe, dan showroom di Asia Tenggara, dikembangkan oleh PT Rafa Kreasindo Teknologi.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Nias Dalam No. 14",
      addressLocality: "Bandung",
      addressRegion: "Jawa Barat",
      postalCode: "40115",
      addressCountry: "ID",
    },
    sameAs: OFFICIAL_SOCIAL_URLS,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@etalase.online",
        url: `${BASE_URL}/kontak`,
        availableLanguage: ["Indonesian", "English", "Malay", "Thai", "Vietnamese"],
        areaServed: ["ID", "MY", "SG", "TH", "VN", "PH"],
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "halo@etalase.online",
        url: `${BASE_URL}/bantuan`,
        availableLanguage: ["Indonesian", "English"],
        areaServed: ["ID", "MY", "SG", "TH", "VN"],
      },
    ],
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
    name: "etalase.online Storefront Platform",
    operatingSystem: "Web Browser, iOS, Android",
    applicationCategory: "BusinessApplication",
    publisher: {
      "@type": "Organization",
      name: "PT Rafa Kreasindo Teknologi",
      url: `${BASE_URL}/about`,
    },
    offers: [
      {
        "@type": "Offer",
        name: "Paket Gratis (Free Tier)",
        price: "0",
        priceCurrency: "IDR",
        url: `${BASE_URL}/harga`,
      },
      {
        "@type": "Offer",
        name: "Paket PRO Bulanan",
        price: "49000",
        priceCurrency: "IDR",
        url: `${BASE_URL}/harga`,
      },
      {
        "@type": "Offer",
        name: "Paket Terima Beres (DFY Concierge)",
        price: "899000",
        priceCurrency: "IDR",
        url: `${BASE_URL}/harga`,
      },
    ],
    featureList: [
      "Katalog Online & Bio Link Visual Mobile-First",
      "Order Chat WhatsApp Tanpa Komisi (0%)",
      "Pembayaran QRIS Otomatis (4,5% Free / 2% PRO) + Convenience Fee",
      "Auto-Delivery File Digital ke WhatsApp & Dynamic PDF Watermark",
      "14 Variasi Template dalam 4 Arketipe Desain Terisolasi",
      "Pencairan Saldo Minimum Rp 50.000 (PRO Gratis 4x/bulan)",
      "Custom Domain + SSL Gratis, Meta Pixel CAPI, TikTok Pixel & GA4",
    ],
  };
}

/**
 * WebPage + Speakable Schema.org JSON-LD for EEAT, AEO, GEO & AIO
 */
export function generateWebPageJsonLd({
  url,
  name,
  description,
  locale = "id",
  dateModified = "2026-11-25",
  speakableSelectors = ["h1", "main p"],
}: {
  url: string;
  name: string;
  description: string;
  locale?: SupportedLocale;
  dateModified?: string;
  speakableSelectors?: string[];
}) {
  const fullUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": fullUrl,
    url: fullUrl,
    name,
    description,
    inLanguage: locale,
    dateModified,
    isPartOf: {
      "@type": "WebSite",
      name: "etalase.online",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "PT Rafa Kreasindo Teknologi",
      url: `${BASE_URL}/about`,
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: speakableSelectors,
    },
  };
}

/**
 * HowTo Schema.org JSON-LD for AEO/GEO Step Walkthroughs
 */
export function generateHowToJsonLd({
  name,
  description,
  totalTime = "PT1M",
  steps,
}: {
  name: string;
  description: string;
  totalTime?: string;
  steps: { name: string; text: string; url?: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    totalTime,
    step: steps.map((s, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: s.name,
      text: s.text,
      url: s.url || `${BASE_URL}/register`,
    })),
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
      url: `${BASE_URL}/about`,
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
