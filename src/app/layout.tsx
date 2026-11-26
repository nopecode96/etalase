import type { Metadata } from "next";
import "./globals.css";
import { GlobalToast } from "@/components/ui/GlobalToast";
import { CookieConsentBanner } from "@/components/tracking/CookieConsentBanner";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://etalase.online";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "etalase.online — Katalog Online yang Closing di WhatsApp. Gratis, Tanpa Komisi.",
  description:
    "Etalase digital dan katalog instan yang langsung terhubung ke WhatsApp serta checkout QRIS. 0% komisi order chat, siap online dalam 30 detik.",
  keywords: [
    "etalase online",
    "bio link toko online",
    "checkout whatsapp",
    "qris instan",
    "katalog digital asia tenggara",
    "alternatif lynk id",
    "toko online mobile",
  ],
  authors: [{ name: "Tim Editorial Etalase.online", url: `${BASE_URL}/about` }],
  creator: "Tim Editorial Etalase.online",
  publisher: "Rafa Kreasindo Teknologi",
  alternates: {
    canonical: BASE_URL,
    languages: {
      "x-default": BASE_URL,
      id: BASE_URL,
      en: `${BASE_URL}/en`,
      ms: `${BASE_URL}/ms`,
      th: `${BASE_URL}/th`,
      vi: `${BASE_URL}/vi`,
    },
  },
  openGraph: {
    title: "etalase.online — Katalog Online yang Closing di WhatsApp. Gratis, Tanpa Komisi.",
    description:
      "Etalase digital dan katalog instan yang langsung terhubung ke WhatsApp serta checkout QRIS. 0% komisi order chat, siap online dalam 30 detik.",
    url: BASE_URL,
    siteName: "etalase.online",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: `${BASE_URL}/og-preview.png`,
        width: 1200,
        height: 630,
        alt: "etalase.online — Katalog Online yang Closing di WhatsApp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "etalase.online — Katalog Online yang Closing di WhatsApp. Gratis, Tanpa Komisi.",
    description:
      "Etalase digital dan katalog instan yang langsung terhubung ke WhatsApp serta checkout QRIS. 0% komisi order chat.",
    images: [`${BASE_URL}/og-preview.png`],
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
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-icon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              window.gtag = window.gtag || gtag;
              var consentMatch = document.cookie.match(/(?:^|; )etalase_cookie_consent=([^;]*)/);
              var isRejected = consentMatch && consentMatch[1] === 'essential_only';
              window.gtag('consent', 'default', {
                ad_storage: isRejected ? 'denied' : 'granted',
                ad_user_data: isRejected ? 'denied' : 'granted',
                ad_personalization: isRejected ? 'denied' : 'granted',
                analytics_storage: isRejected ? 'denied' : 'granted',
                wait_for_update: 500
              });
              window.gtag('js', new Date());
              window.gtag('config', 'GTM-WM3KQKB6');
            `,
          }}
        />
        <script
          async
          src="https://www.googletagmanager.com/gtm.js?id=GTM-WM3KQKB6"
        />
        <link rel="alternate" type="text/plain" title="LLMs Context" href="/llms.txt" />
      </head>
      <body className="antialiased min-h-screen bg-[#FAF8F5] text-[#1C1917]" suppressHydrationWarning>
        {children}
        <CookieConsentBanner />
        <GlobalToast />
      </body>
    </html>
  );
}
