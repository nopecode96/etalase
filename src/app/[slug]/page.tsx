import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma, serializePlain } from "@/lib/db/prisma";
import { TemplateRenderer } from "@/components/templates/TemplateRenderer";

interface StorePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: StorePageProps): Promise<Metadata> {
  const { slug } = params;
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "etalase.online";
  const baseAppUrl = process.env.NEXT_PUBLIC_APP_URL || `https://${rootDomain}`;

  const toAbsoluteUrl = (url?: string | null) => {
    if (!url) return `${baseAppUrl}/og-preview.png`;
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `${baseAppUrl}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  if (slug === "demo") {
    const demoUrl = `https://demo.${rootDomain}`;
    const demoImg = toAbsoluteUrl("/images/demo/banner-creator.jpg");
    return {
      title: "Studio Demo Creative — Contoh Tampilan Toko | etalase.online",
      description: "Contoh tampilan etalase toko digital, katalog, dan checkout WhatsApp di etalase.online.",
      alternates: {
        canonical: demoUrl,
      },
      openGraph: {
        type: "website",
        url: demoUrl,
        title: "Studio Demo Creative — Contoh Tampilan Toko",
        description: "Contoh tampilan etalase toko digital, katalog, dan checkout WhatsApp di etalase.online.",
        siteName: "Studio Demo Creative",
        images: [{ url: demoImg, width: 1200, height: 630, alt: "Studio Demo Creative" }],
      },
      twitter: {
        card: "summary_large_image",
        title: "Studio Demo Creative — Contoh Tampilan Toko",
        description: "Contoh tampilan etalase toko digital, katalog, dan checkout WhatsApp di etalase.online.",
        images: [demoImg],
      },
    };
  }

  const store = await prisma.store.findUnique({
    where: { slug },
    select: {
      name: true,
      slug: true,
      bio: true,
      avatarUrl: true,
      bannerUrl: true,
      customDomain: true,
      isActive: true,
    },
  });

  if (!store || !store.isActive) {
    return {
      title: "Toko Tidak Ditemukan | etalase.online",
      robots: { index: false, follow: false },
    };
  }

  const storeUrl = store.customDomain
    ? `https://${store.customDomain}`
    : `https://${store.slug}.${rootDomain}`;
  const title = `${store.name} | etalase.online`;
  const description =
    store.bio?.trim() || `Kunjungi etalase resmi ${store.name} di ${store.slug}.${rootDomain}.`;
  const ogImage = toAbsoluteUrl(store.bannerUrl || store.avatarUrl);

  return {
    title,
    description,
    alternates: {
      canonical: storeUrl,
    },
    openGraph: {
      type: "website",
      url: storeUrl,
      title: store.name,
      description,
      siteName: store.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: store.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: store.name,
      description,
      images: [ogImage],
    },
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
