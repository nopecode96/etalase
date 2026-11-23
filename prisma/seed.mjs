import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding initial database...");

  // 1. Create or update Demo User & Super Admin
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@etalase.online" },
    update: {},
    create: {
      email: "admin@etalase.online",
      name: "Mabes Super Admin",
      role: "SUPER_ADMIN",
    },
  });

  const demoUser = await prisma.user.upsert({
    where: { email: "demo@etalase.online" },
    update: {},
    create: {
      email: "demo@etalase.online",
      name: "Studio Demo Creative",
      role: "USER",
    },
  });

  // 2. Create or update Demo Store
  const demoStore = await prisma.store.upsert({
    where: { slug: "demo" },
    update: {},
    create: {
      ownerId: demoUser.id,
      slug: "demo",
      name: "Studio Demo Creative",
      bio: "Etalase resmi showcase etalase.online. Jual produk digital, konsultasi 1-on-1, dan katalog affiliate SEA.",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      bannerUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      tier: "PRO",
      isDemo: true,
      templateId: "clean-minimal",
      chatChannel: "WHATSAPP",
      chatHandle: "6281234567890",
      currency: "IDR",
      locale: "id",
    },
  });

  // 3. Products
  await prisma.product.upsert({
    where: {
      storeId_slug: { storeId: demoStore.id, slug: "creator-os" },
    },
    update: {},
    create: {
      storeId: demoStore.id,
      title: "Creator OS — All-in-One Notion Template",
      slug: "creator-os",
      description: "Template Notion lengkap untuk mengelola konten, pesanan, dan keuangan toko Anda.",
      price: 99000,
      compareAtPrice: 199000,
      productType: "DIGITAL",
      checkoutMode: "DIRECT_CHECKOUT",
      isFeatured: true,
    },
  });

  await prisma.product.upsert({
    where: {
      storeId_slug: { storeId: demoStore.id, slug: "consultation" },
    },
    update: {},
    create: {
      storeId: demoStore.id,
      title: "Sesi 1-on-1 Review & Strategi Toko",
      slug: "consultation",
      description: "Konsultasi eksklusif selama 45 menit via Google Meet.",
      price: 150000,
      productType: "APPOINTMENT",
      checkoutMode: "DIRECT_CHECKOUT",
      appointmentDuration: 45,
      isFeatured: true,
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
