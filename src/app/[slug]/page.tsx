import { notFound } from "next/navigation";
import { prisma, serializePlain } from "@/lib/db/prisma";
import { TemplateRenderer } from "@/components/templates/TemplateRenderer";

interface StorePageProps {
  params: {
    slug: string;
  };
}

export default async function StorefrontPage({ params }: StorePageProps) {
  const { slug } = params;

  // Provide mock fallback for "demo" slug if DB is not yet populated
  if (slug === "demo") {
    return (
      <TemplateRenderer
        store={{
          name: "Studio Demo Creative",
          slug: "demo",
          bio: "Akun demo resmi etalase.online untuk pratinjau template & checkout.",
          locale: "id",
          currency: "IDR",
          tier: "FREE",
          templateId: "clean-minimal",
          chatChannel: "WHATSAPP",
          chatHandle: "6281234567890",
          appearanceConfig: {
            bgType: "pattern",
            bgValue: "subtle-dots",
            buttonStyle: "rounded",
            accentColor: "#D94E28",
            coverBannerUrl: "/images/demo/banner-creator.jpg",
          },
        }}
        products={[
          {
            id: "d1",
            title: "Template Notion All-in-One Creator OS",
            slug: "creator-os",
            price: 79000,
            compareAtPrice: 149000,
            images: ["/images/demo/product-preset.jpg"],
            checkoutMode: "DIRECT_CHECKOUT",
            isFeatured: true,
          },
          {
            id: "d2",
            title: "Lampu Ring Light Studio (Keranjang Kuning)",
            slug: "ring-light",
            price: 145000,
            compareAtPrice: 200000,
            images: ["/images/demo/product-mic.jpg"],
            checkoutMode: "EXTERNAL_LINK",
            externalPlatform: "TIKTOK_SHOP",
          },
          {
            id: "d3",
            title: "Konsultasi Brand & Social Media 1-on-1",
            slug: "konsultasi-brand",
            price: 300000,
            images: ["/images/demo/product-mentoring.jpg"],
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
        orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
      },
      storeBlocks: {
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  if (!store || !store.isActive) {
    notFound();
  }

  const serializedStore = serializePlain(store);

  const formattedProducts = serializedStore.products.map((p) => ({
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
    isFeatured: p.isFeatured,
    category: p.category,
    secondaryModes: p.secondaryModes as any,
  }));

  const formattedBlocks = (serializedStore.storeBlocks || []).map((b) => ({
    id: b.id,
    type: b.type,
    title: b.title,
    subtitle: b.subtitle,
    imageUrl: b.imageUrl,
    targetUrl: b.targetUrl,
    productId: b.productId,
    badgeText: b.badgeText,
    isActive: b.isActive,
    sortOrder: b.sortOrder,
  }));

  return (
    <TemplateRenderer
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
        chatChannels: serializedStore.chatChannels as any,
        tier: serializedStore.tier,
        templateId: serializedStore.templateId,
        appearanceConfig: serializedStore.appearanceConfig as any,
        blocks: formattedBlocks,
      }}
      products={formattedProducts}
      blocks={formattedBlocks}
    />
  );
}
