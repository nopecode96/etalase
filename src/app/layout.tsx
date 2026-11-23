import type { Metadata } from "next";
import "./globals.css";
import { GlobalToast } from "@/components/ui/GlobalToast";

export const metadata: Metadata = {
  title: "etalase.online — Bio Link & Visual Storefront for Southeast Asia",
  description:
    "All-in-One Bio Link, Visual Storefront & Chat-First Commerce Platform. 3 mode transaksi: QRIS instan, Keranjang Kuning, dan Order via WhatsApp/LINE/Zalo tanpa potongan komisi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased min-h-screen">
        {children}
        <GlobalToast />
      </body>
    </html>
  );
}
