import { notFound } from "next/navigation";
import { prisma, serializePlain } from "@/lib/db/prisma";
import { AdminDashboardClient } from "./AdminDashboardClient";

interface AdminPageProps {
  params: {
    slug: string;
  };
  searchParams?: {
    tab?: string;
  };
}

export default async function TenantAdminPage({ params, searchParams }: AdminPageProps) {
  const { slug } = params;
  const initialTab =
    searchParams?.tab === "finance"
      ? "finance"
      : searchParams?.tab === "regional"
      ? "regional"
      : "products";

  // Provide mock store for demo if not yet created in DB
  if (slug === "demo") {
    return (
      <AdminDashboardClient
        initialTab={initialTab}
        store={{
          id: "demo-store",
          slug: "demo",
          name: "Studio Demo Creative",
          tier: "FREE",
          locale: "id",
          currency: "IDR",
          chatChannel: "WHATSAPP",
          chatHandle: "6281234567890",
          feeBorneBy: "CUSTOMER",
          walletBalance: 450000,
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
              compareAtPrice: 149000,
              checkoutMode: "DIRECT_CHECKOUT",
              clicks: 42,
              views: 120,
            },
            {
              id: "d2",
              title: "Lampu Ring Light Studio (Keranjang Kuning)",
              slug: "ring-light",
              price: 145000,
              compareAtPrice: 200000,
              checkoutMode: "EXTERNAL_LINK",
              externalPlatform: "TIKTOK_SHOP",
              externalUrl: "https://vt.tiktok.com/demo",
              clicks: 89,
              views: 240,
            },
          ],
        }}
        monthlyWithdrawalCount={0}
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

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthlyWithdrawalCount = await prisma.withdrawal.count({
    where: {
      storeId: store.id,
      createdAt: { gte: startOfMonth },
      status: { in: ["PENDING", "APPROVED", "SUCCESS", "COMPLETED"] },
    },
  });

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
        feeBorneBy: (serializedStore.feeBorneBy as any) || "CUSTOMER",
        walletBalance: Number(serializedStore.walletBalance || 0),
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
      monthlyWithdrawalCount={monthlyWithdrawalCount}
      initialTab={initialTab}
    />
  );
}
