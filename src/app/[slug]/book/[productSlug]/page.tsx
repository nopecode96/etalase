import { notFound } from "next/navigation";
import BookingClient from "./BookingClient";

interface BookingPageProps {
  params: {
    slug: string;
    productSlug: string;
  };
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { slug, productSlug } = params;

  // Render booking interface for the product
  return (
    <BookingClient
      storeSlug={slug}
      productSlug={productSlug}
      title="Sesi 1-on-1 Review Portofolio & Audit Toko"
      description="Konsultasi langsung via Google Meet selama 45 menit untuk membedah strategi visual storefront, konversi WhatsApp, dan integrasi pembayaran QRIS."
      price={150000}
      durationMinutes={45}
      availableSlots={[
        "Besok, 10:00 WIB",
        "Besok, 14:00 WIB",
        "Besok, 16:30 WIB",
        "Lusa, 11:00 WIB",
        "Lusa, 15:00 WIB",
        "Lusa, 19:30 WIB",
      ]}
    />
  );
}
