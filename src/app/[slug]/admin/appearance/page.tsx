import { notFound } from "next/navigation";
import { prisma, serializePlain } from "@/lib/db/prisma";
import { AppearanceClient } from "./AppearanceClient";

interface AppearancePageProps {
  params: {
    slug: string;
  };
}

export default async function AppearancePage({ params }: AppearancePageProps) {
  const { slug } = params;

  // Provide mock store for demo if not yet created in DB
  if (slug === "demo") {
    return (
      <AppearanceClient
        store={{
          id: "demo-store",
          slug: "demo",
          name: "Studio Demo Creative",
          tier: "FREE",
          templateId: "clean-minimal",
          bio: "Akun demo resmi etalase.online untuk kustomisasi template & tampilan.",
          avatarUrl: "/images/demo/avatar-rafa.jpg",
          bannerUrl: "/images/demo/banner-creator.jpg",
          locale: "id",
          currency: "IDR",
          chatChannel: "WHATSAPP",
          chatHandle: "6281234567890",
          appearanceConfig: {
            bgType: "pattern",
            bgValue: "subtle-dots",
            buttonStyle: "rounded",
            accentColor: "#D94E28",
            coverBannerUrl: "/images/demo/banner-creator.jpg",
            socialLinks: {
              tiktok: "https://tiktok.com/@rafacreative",
              instagram: "https://instagram.com/rafacreative",
              whatsapp: "https://wa.me/6281234567890",
              youtube: "https://youtube.com/@rafacreative",
            },
          },
        }}
        products={[
          {
            id: "d1",
            title: "Preset Lightroom Pro Cinematic Pack",
            slug: "preset-cinematic",
            price: 49000,
            compareAtPrice: 99000,
            images: ["/images/demo/product-preset.jpg"],
            checkoutMode: "DIRECT_CHECKOUT",
            isFeatured: true,
          },
          {
            id: "d2",
            title: "E-Book: 30 Hari Kuasai CapCut & Premiere",
            slug: "ebook-capcut",
            price: 99000,
            compareAtPrice: 159000,
            images: ["/images/demo/product-ebook.jpg"],
            checkoutMode: "DIRECT_CHECKOUT",
          },
          {
            id: "d3",
            title: "Microphone Wireless Clip-On Studio",
            slug: "mic-wireless",
            price: 189000,
            compareAtPrice: 249000,
            images: ["/images/demo/product-mic.jpg"],
            checkoutMode: "EXTERNAL_LINK",
            externalPlatform: "TIKTOK_SHOP",
            externalLabel: "Keranjang Kuning",
          },
          {
            id: "d4",
            title: "Mentoring 1-on-1 Content Growth",
            slug: "mentoring-content",
            price: 250000,
            compareAtPrice: 500000,
            images: ["/images/demo/product-mentoring.jpg"],
            checkoutMode: "CHAT_ORDER",
          },
        ]}
        initialBlocks={[
          {
            id: "b1",
            type: "FEATURED_PRODUCT",
            title: "🔥 Produk Terlaris Bulan Ini",
            subtitle: "Preset cinematic terfavorit dengan 3.400+ download",
            badgeText: "Diskon 50% Khusus Hari Ini",
            productId: "d1",
            sortOrder: 1,
            isActive: true,
          },
          {
            id: "b2",
            type: "COMPACT_STRIP",
            title: "E-Book & Panduan Digital Pilihan",
            sortOrder: 2,
            isActive: true,
          },
          {
            id: "b3",
            type: "IMAGE_BANNER",
            title: "Klaim Bonus Video Asset senilai Rp 300.000",
            subtitle: "Klik untuk konsultasi dan dapatkan link Google Drive bonus!",
            imageUrl: "/images/demo/banner-poster-creator.jpg",
            targetUrl: "https://wa.me/6281234567890",
            sortOrder: 3,
            isActive: true,
          },
          {
            id: "b4",
            type: "PRODUCT_GRID",
            title: "Rekomendasi Gear & Mentoring",
            sortOrder: 4,
            isActive: true,
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
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  if (!store) {
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
    <AppearanceClient
      store={{
        id: serializedStore.id,
        slug: serializedStore.slug,
        name: serializedStore.name,
        bio: serializedStore.bio,
        avatarUrl: serializedStore.avatarUrl,
        bannerUrl: serializedStore.bannerUrl,
        tier: serializedStore.tier,
        templateId: serializedStore.templateId,
        locale: serializedStore.locale,
        currency: serializedStore.currency,
        chatChannel: serializedStore.chatChannel,
        chatHandle: serializedStore.chatHandle,
        chatChannels: serializedStore.chatChannels as any,
        appearanceConfig: (serializedStore.appearanceConfig as any) || {},
      }}
      products={formattedProducts}
      initialBlocks={formattedBlocks}
    />
  );
}
