import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | etalase.online",
    default: "Jasa Pembuatan Website Sales, Rental & Bisnis Lokal | etalase.online",
  },
  description:
    "Bikin website portofolio sales dan bisnis lokal tanpa ribet. Dilengkapi domain sendiri, katalog interaktif, optimasi Google lokal, dan langsung terhubung ke WhatsApp.",
  keywords: [
    "jasa pembuatan website sales",
    "website sales mobil",
    "website rental mobil",
    "website sales properti",
    "website bisnis lokal",
    "web portfolio whatsapp",
    "etalase online",
  ],
  metadataBase: new URL("https://etalase.online"),
  openGraph: {
    title: "Jasa Pembuatan Website Sales, Rental & Bisnis Lokal | etalase.online",
    description:
      "Bikin website portofolio sales dan bisnis lokal tanpa ribet. Dilengkapi domain sendiri, katalog interaktif, optimasi Google lokal, dan langsung terhubung ke WhatsApp.",
    url: "https://etalase.online",
    siteName: "etalase.online",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: "etalase.online - Website Portofolio & Lead Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jasa Pembuatan Website Sales, Rental & Bisnis Lokal | etalase.online",
    description:
      "Bikin website portofolio sales dan bisnis lokal tanpa ribet. Dilengkapi domain sendiri, katalog interaktif, dan terhubung WhatsApp.",
  },
};

export default function SaasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "etalase.online",
    url: "https://etalase.online",
    logo: "https://etalase.online/logo.png",
    description:
      "Jasa pembuatan website portofolio profesional untuk sales mobil, rental kendaraan, sales properti, dan bisnis lokal dengan domain sendiri dan integrasi WhatsApp.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "ID",
    },
    priceRange: "Rp 1.700.000 - Rp 2.500.000",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "21:00",
    },
  };

  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} text-slate-800 antialiased selection:bg-blue-600 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
