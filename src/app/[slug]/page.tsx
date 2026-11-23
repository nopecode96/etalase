import { notFound } from "next/navigation";
import { prisma, serializePlain } from "@/lib/db/prisma";
import { getTemplateComponent } from "@/components/templates";
import { StoreTemplateProps } from "@/components/templates/types";

interface StorePageProps {
  params: {
    slug: string;
  };
}

export default async function StorefrontPage({ params }: StorePageProps) {
  const { slug } = params;

  // Provide mock fallback for "demo" slug if DB is not yet populated
  if (slug === "demo") {
    const Template = getTemplateComponent("clean-minimal");
    return (
      <Template
        store={{
          name: "Studio Demo Creative",
          slug: "demo",
          bio: "Akun demo resmi etalase.online untuk pratinjau template & checkout.",
          locale: "id",
          currency: "IDR",
          tier: "FREE",
        }}
        products={[
          {
            id: "d1",
            title: "Template Notion All-in-One Creator OS",
            slug: "creator-os",
            price: 79000,
            checkoutMode: "DIRECT_CHECKOUT",
          },
          {
            id: "d2",
            title: "Lampu Ring Light Studio (Keranjang Kuning)",
            slug: "ring-light",
            price: 145000,
            checkoutMode: "EXTERNAL_LINK",
            externalPlatform: "TIKTOK_SHOP",
          },
          {
            id: "d3",
            title: "Konsultasi Brand & Social Media 1-on-1",
            slug: "konsultasi-brand",
            price: 300000,
            checkoutMode: "CHAT_ORDER",
          },
        ]}
      />
    );
  }

  const store = await prisma.store.findUnique({
    where: { slug },
    include: {
      products: {
        where: { isActive: true },
        orderBy: { createdAt: "desc" },
      },
      blocks: {
        where: { isVisible: true },
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  if (!store || !store.isActive) {
    notFound();
  }

  const serializedStore = serializePlain(store);
  const TemplateComponent = getTemplateComponent(serializedStore.templateId);

  return (
    <TemplateComponent
      store={{
        name: serializedStore.name,
        slug: serializedStore.slug,
        bio: serializedStore.bio,
        avatarUrl: serializedStore.avatarUrl,
        bannerUrl: serializedStore.bannerUrl,
        locale: serializedStore.locale,
        currency: serializedStore.currency,
        chatChannel: serializedStore.chatChannel,
        chatHandle: serializedStore.chatHandle,
        tier: serializedStore.tier,
      }}
      products={serializedStore.products.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        description: p.description,
        price: Number(p.price),
        compareAtPrice: p.compareAtPrice ? Number(p.compareAtPrice) : null,
        images: p.images,
        checkoutMode: p.checkoutMode,
        externalPlatform: p.externalPlatform,
        externalUrl: p.externalUrl,
        externalLabel: p.externalLabel,
      }))}
    />
  );
}
