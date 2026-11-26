import { notFound } from "next/navigation";
import { prisma, serializePlain } from "@/lib/db/prisma";
import { CheckoutClient } from "./CheckoutClient";
import { StorefrontPixelTracker } from "@/components/tracking/StorefrontPixelTracker";

interface CheckoutPageProps {
  params: {
    slug: string;
    productSlug: string;
  };
  searchParams?: {
    paypal_status?: string;
    token?: string;
    orderCode?: string;
  };
}

export default async function CheckoutPage({ params, searchParams }: CheckoutPageProps) {
  const { slug, productSlug } = params;

  // Demo fallback
  if (slug === "demo") {
    return (
      <CheckoutClient
        store={{
          slug: "demo",
          name: "Studio Demo Creative",
          currency: "IDR",
          locale: "id",
          tier: "FREE",
          feeBorneBy: "CUSTOMER",
          chatHandle: "6281234567890",
        }}
        product={{
          id: "demo-p1",
          slug: productSlug,
          title: "Template Notion All-in-One Creator OS",
          description: "Sistem operasional lengkap untuk kreator konten dan solopreneur.",
          price: 79000,
          productType: "DIGITAL",
        }}
        paypalStatus={searchParams?.paypal_status}
        paypalToken={searchParams?.token}
        paypalOrderCode={searchParams?.orderCode}
      />
    );
  }

  const store = await prisma.store.findUnique({
    where: { slug },
    include: {
      products: {
        where: { slug: productSlug, isActive: true },
      },
    },
  });

  if (!store || store.products.length === 0) {
    notFound();
  }

  const product = store.products[0];
  const serializedStore = serializePlain(store);
  const serializedProduct = serializePlain(product);

  return (
    <>
      <StorefrontPixelTracker
        tier={serializedStore.tier}
        metaPixelId={serializedStore.metaPixelId}
        tiktokPixelId={serializedStore.tiktokPixelId}
        gaMeasurementId={serializedStore.gaMeasurementId}
        event={{
          name: "InitiateCheckout",
          value: Number(serializedProduct.price),
          currency: serializedStore.currency || "IDR",
          contentId: serializedProduct.id,
          contentName: serializedProduct.title,
        }}
      />
      <CheckoutClient
        store={{
          slug: serializedStore.slug,
          name: serializedStore.name,
          currency: serializedStore.currency,
          locale: serializedStore.locale,
          tier: serializedStore.tier,
          feeBorneBy: serializedStore.feeBorneBy || "CUSTOMER",
          chatHandle: serializedStore.chatHandle,
        }}
        product={{
          id: serializedProduct.id,
          slug: serializedProduct.slug,
          title: serializedProduct.title,
          description: serializedProduct.description,
          price: Number(serializedProduct.price),
          compareAtPrice: serializedProduct.compareAtPrice ? Number(serializedProduct.compareAtPrice) : null,
          images: serializedProduct.images,
          productType: serializedProduct.productType,
        }}
        paypalStatus={searchParams?.paypal_status}
        paypalToken={searchParams?.token}
        paypalOrderCode={searchParams?.orderCode}
      />
    </>
  );
}
