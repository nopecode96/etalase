import type { Metadata } from "next";
import "./globals.css";
import { GlobalToast } from "@/components/ui/GlobalToast";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://etalase.online";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "etalase.online — Satu Website Etalase untuk Semua Jualan Anda",
  description:
    "Bio link visual, katalog instan, dan checkout chat tanpa potongan komisi untuk kreator, afiliator, sales showroom, dan UMKM di Asia Tenggara.",
  keywords: [
    "etalase online",
    "bio link toko online",
    "checkout whatsapp",
    "qris instan",
    "katalog digital asia tenggara",
    "alternatif lynk id",
    "toko online mobile",
  ],
  authors: [{ name: "Tim Editorial Etalase.online", url: `${BASE_URL}/tentang-kami` }],
  creator: "Tim Editorial Etalase.online",
  publisher: "PT Etalase Digital Asia",
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
    title: "etalase.online — Satu Website Etalase untuk Semua Jualan Anda",
    description:
      "Bio link visual, katalog instan, dan checkout chat tanpa potongan komisi untuk kreator, afiliator, sales showroom, dan UMKM di Asia Tenggara.",
    url: BASE_URL,
    siteName: "etalase.online",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: `${BASE_URL}/og-preview.png`,
        width: 1200,
        height: 630,
        alt: "etalase.online — Satu Website Etalase untuk Semua Jualan Anda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "etalase.online — Satu Website Etalase untuk Semua Jualan Anda",
    description:
      "Bio link visual, katalog instan, dan checkout chat tanpa potongan komisi untuk kreator, afiliator, sales showroom, dan UMKM di Asia Tenggara.",
    images: [`${BASE_URL}/og-preview.png`],
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
    <html lang="id">
      <body className="antialiased min-h-screen bg-[#FAF8F5] text-[#1C1917]">
        {children}
        <GlobalToast />
      </body>
    </html>
  );
}
