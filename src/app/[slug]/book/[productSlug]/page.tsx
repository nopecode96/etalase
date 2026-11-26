import { notFound } from "next/navigation";
import { prisma, serializePlain } from "@/lib/db/prisma";
import BookingClient from "./BookingClient";

interface BookingPageProps {
  params: {
    slug: string;
    productSlug: string;
  };
}

const DEFAULT_SLOTS = [
  "Besok, 10:00 WIB",
  "Besok, 14:00 WIB",
  "Besok, 16:30 WIB",
  "Lusa, 11:00 WIB",
  "Lusa, 15:00 WIB",
  "Lusa, 19:30 WIB",
];

export default async function BookingPage({ params }: BookingPageProps) {
  const { slug, productSlug } = params;

  if (slug === "demo") {
    return (
      <BookingClient
        storeSlug={slug}
        productSlug={productSlug}
        title="Sesi 1-on-1 Review Portofolio & Audit Toko"
        description="Konsultasi langsung via Google Meet selama 45 menit untuk membedah strategi visual storefront, konversi WhatsApp, dan integrasi pembayaran QRIS."
        price={150000}
        durationMinutes={45}
        availableSlots={DEFAULT_SLOTS}
      />
    );
  }

  const store = await prisma.store.findUnique({
    where: { slug },
    select: { id: true, slug: true, name: true, isActive: true },
  });

  if (!store || !store.isActive) {
    notFound();
  }

  const product = await prisma.product.findFirst({
    where: {
      storeId: store.id,
      slug: productSlug,
      isActive: true,
    },
  });

  if (!product) {
    notFound();
  }

  const serialized = serializePlain(product);
  const rawSlots = Array.isArray(serialized.appointmentSlots)
    ? (serialized.appointmentSlots as string[]).filter((s) => typeof s === "string" && s.trim())
    : [];

  return (
    <BookingClient
      storeSlug={store.slug}
      productSlug={serialized.slug}
      title={serialized.title}
      description={serialized.description || `Sesi konsultasi bersama ${store.name}.`}
      price={Number(serialized.price)}
      durationMinutes={serialized.appointmentDuration || 45}
      availableSlots={rawSlots.length > 0 ? rawSlots : DEFAULT_SLOTS}
    />
  );
}
