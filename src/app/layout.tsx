import type { Metadata } from "next";
import "./globals.css";
import { GlobalToast } from "@/components/ui/GlobalToast";

export const metadata: Metadata = {
  title: "etalase.online — Satu Website Etalase untuk Semua Jualan Anda",
  description:
    "Bio link visual, katalog instan, dan checkout chat tanpa potongan komisi untuk kreator, afiliator, sales showroom, dan UMKM di Asia Tenggara.",
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
