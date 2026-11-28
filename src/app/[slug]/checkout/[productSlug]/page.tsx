import type { Metadata } from "next";
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

export async function generateMetadata({ params }: CheckoutPageProps): Promise<Metadata> {
  const { slug, productSlug } = params;

  const store = await prisma.store.findUnique({
    where: { slug },
    select: { id: true, name: true },
  });
  if (!store) {
    return { title: "Checkout | etalase.online", robots: { index: false, follow: false } };
  }

  const product = await prisma.product.findUnique({
    where: { storeId_slug: { storeId: store.id, slug: productSlug } },
    select: { title: true, description: true },
  });
  if (!product) {
    return { title: `Checkout | ${store.name}`, robots: { index: false, follow: false } };
  }

  const title = `Checkout ${product.title} | ${store.name}`;
  const description = product.description || `Beli ${product.title} di ${store.name}.`;
  return {
    title,
    description,
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description,
    },
  };
}

export default async function CheckoutPage({ params, searchParams }: CheckoutPageProps) {
  const { slug, productSlug } = params;

  const store = await prisma.store.findUnique({
    where: { slug },
    include: {
      products: {
        where: { slug: productSlug, isActive: true },
      },
    },
  });

  if (!store || store.products.length === 0) {
    // Only fallback if demo and DB store doesn't exist
    if (slug === "demo" && !store) {
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
          stock: product.stock ?? null,
          isPreOrder: Boolean((product as any).isPreOrder),
          poNote: (product as any).poNote || null,
          variants: Array.isArray((product as any).variants) ? (product as any).variants : null,
        }}
        paypalStatus={searchParams?.paypal_status}
        paypalToken={searchParams?.token}
        paypalOrderCode={searchParams?.orderCode}
      />
    </>
  );
}
