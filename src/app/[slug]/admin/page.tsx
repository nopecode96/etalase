import { notFound } from "next/navigation";
import { prisma, serializePlain } from "@/lib/db/prisma";
import { AdminDashboardClient } from "./AdminDashboardClient";

interface AdminPageProps {
  params: {
    slug: string;
  };
}

export default async function TenantAdminPage({ params }: AdminPageProps) {
  const { slug } = params;

  // Provide mock store for demo if not yet created in DB
  if (slug === "demo") {
    return (
      <AdminDashboardClient
        store={{
          id: "demo-store",
          slug: "demo",
          name: "Studio Demo Creative",
          tier: "FREE",
          locale: "id",
          currency: "IDR",
          chatChannel: "WHATSAPP",
          chatHandle: "6281234567890",
          chatChannels: [
            { channel: "WHATSAPP", handle: "6281234567890", isPrimary: true },
            { channel: "LINE", handle: "demostudio", isPrimary: false },
          ],
          products: [
            {
              id: "d1",
              title: "Template Notion All-in-One Creator OS",
              slug: "creator-os",
              price: 79000,
              checkoutMode: "DIRECT_CHECKOUT",
              clicks: 42,
              views: 120,
            },
            {
              id: "d2",
              title: "Lampu Ring Light Studio (Keranjang Kuning)",
              slug: "ring-light",
              price: 145000,
              checkoutMode: "EXTERNAL_LINK",
              externalPlatform: "TIKTOK_SHOP",
              externalUrl: "https://vt.tiktok.com/demo",
              clicks: 89,
              views: 240,
            },
          ],
        }}
      />
    );
  }

  const store = await prisma.store.findUnique({
    where: { slug },
    include: {
      products: {
        orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
      },
    },
  });

  if (!store) {
    notFound();
  }

  const serializedStore = serializePlain(store);

  return (
    <AdminDashboardClient
      store={{
        id: serializedStore.id,
        slug: serializedStore.slug,
        name: serializedStore.name,
        tier: serializedStore.tier,
        locale: serializedStore.locale,
        currency: serializedStore.currency,
        chatChannel: serializedStore.chatChannel,
        chatHandle: serializedStore.chatHandle,
        chatChannels: serializedStore.chatChannels as any,
        products: serializedStore.products.map((p) => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
          price: Number(p.price),
          compareAtPrice: p.compareAtPrice ? Number(p.compareAtPrice) : null,
          checkoutMode: p.checkoutMode,
          externalPlatform: p.externalPlatform,
          externalUrl: p.externalUrl,
          externalLabel: p.externalLabel,
          clicks: p.clicks,
          views: p.views,
        })),
      }}
    />
  );
}
