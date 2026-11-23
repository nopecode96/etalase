import { notFound } from "next/navigation";
import { prisma, serializePlain } from "@/lib/db/prisma";
import { CheckoutClient } from "./CheckoutClient";

interface CheckoutPageProps {
  params: {
    slug: string;
    productSlug: string;
  };
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
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
        }}
        product={{
          id: "demo-p1",
          slug: productSlug,
          title: "Template Notion All-in-One Creator OS",
          description: "Sistem operasional lengkap untuk kreator konten dan solopreneur.",
          price: 79000,
          productType: "DIGITAL",
        }}
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
    <CheckoutClient
      store={{
        slug: serializedStore.slug,
        name: serializedStore.name,
        currency: serializedStore.currency,
        locale: serializedStore.locale,
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
    />
  );
}
