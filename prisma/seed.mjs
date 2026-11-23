import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding rich demo stores for 4 Archetypes...");

  // 1. Demo User
  const demoUser = await prisma.user.upsert({
    where: { email: "demo@etalase.online" },
    update: {},
    create: {
      email: "demo@etalase.online",
      name: "Kreator Demo Nusantara",
      role: "USER",
    },
  });

  // 2. STORE 1: RAFA (clean-minimal)
  const rafaStore = await prisma.store.upsert({
    where: { slug: "rafa" },
    update: {
      templateId: "clean-minimal",
      avatarUrl: "/images/demo/avatar-rafa.jpg",
      bannerUrl: "/images/demo/banner-creator.jpg",
      appearanceConfig: {
        bgType: "pattern",
        bgValue: "subtle-dots",
        coverBannerUrl: "/images/demo/banner-creator.jpg",
        buttonStyle: "rounded",
        accentColor: "#D94E28",
        socialLinks: {
          tiktok: "https://tiktok.com/@rafacreative",
          instagram: "https://instagram.com/rafacreative",
          whatsapp: "https://wa.me/6281234567890",
          youtube: "https://youtube.com/@rafacreative",
        },
      },
    },
    create: {
      ownerId: demoUser.id,
      slug: "rafa",
      name: "Studio Rafa Creative",
      bio: "Digital Creator & Video Editor. Berbagi preset cinematic & panduan workflow editing.",
      avatarUrl: "/images/demo/avatar-rafa.jpg",
      bannerUrl: "/images/demo/banner-creator.jpg",
      tier: "FREE",
      isDemo: true,
      templateId: "clean-minimal",
      chatChannel: "WHATSAPP",
      chatHandle: "6281234567890",
      chatChannels: [{ channel: "WHATSAPP", handle: "6281234567890", isPrimary: true }],
      currency: "IDR",
      locale: "id",
      appearanceConfig: {
        bgType: "pattern",
        bgValue: "subtle-dots",
        coverBannerUrl: "/images/demo/banner-creator.jpg",
        buttonStyle: "rounded",
        accentColor: "#D94E28",
        socialLinks: {
          tiktok: "https://tiktok.com/@rafacreative",
          instagram: "https://instagram.com/rafacreative",
          whatsapp: "https://wa.me/6281234567890",
          youtube: "https://youtube.com/@rafacreative",
        },
      },
    },
  });

  const pRafa1 = await prisma.product.upsert({
    where: { storeId_slug: { storeId: rafaStore.id, slug: "preset-cinematic" } },
    update: { compareAtPrice: 99000, price: 49000, isFeatured: true },
    create: {
      storeId: rafaStore.id,
      title: "Preset Lightroom Pro Cinematic Pack",
      slug: "preset-cinematic",
      description: "30+ Preset warna sinematik siap pakai untuk mobile & desktop. Garansi auto-kirim ke WhatsApp.",
      price: 49000,
      compareAtPrice: 99000,
      images: ["/images/demo/product-preset.jpg"],
      productType: "DIGITAL",
      checkoutMode: "DIRECT_CHECKOUT",
      isFeatured: true,
    },
  });

  const pRafa2 = await prisma.product.upsert({
    where: { storeId_slug: { storeId: rafaStore.id, slug: "ebook-capcut" } },
    update: { compareAtPrice: 159000, price: 99000 },
    create: {
      storeId: rafaStore.id,
      title: "E-Book: 30 Hari Kuasai CapCut & Premiere",
      slug: "ebook-capcut",
      description: "Panduan praktis editing video viral format vertikal untuk kreator konten.",
      price: 99000,
      compareAtPrice: 159000,
      images: ["/images/demo/product-ebook.jpg"],
      productType: "DIGITAL",
      checkoutMode: "DIRECT_CHECKOUT",
    },
  });

  await prisma.product.upsert({
    where: { storeId_slug: { storeId: rafaStore.id, slug: "mic-wireless" } },
    update: { compareAtPrice: 249000, price: 189000 },
    create: {
      storeId: rafaStore.id,
      title: "Microphone Wireless Clip-On Studio",
      slug: "mic-wireless",
      description: "Audio jernih noise-cancelling dengan transmisi jarak 20 meter.",
      price: 189000,
      compareAtPrice: 249000,
      images: ["/images/demo/product-mic.jpg"],
      productType: "PHYSICAL",
      checkoutMode: "EXTERNAL_LINK",
      externalPlatform: "TIKTOK_SHOP",
      externalLabel: "Keranjang Kuning TikTok",
    },
  });

  await prisma.product.upsert({
    where: { storeId_slug: { storeId: rafaStore.id, slug: "mentoring-content" } },
    update: { compareAtPrice: 500000, price: 250000 },
    create: {
      storeId: rafaStore.id,
      title: "Mentoring 1-on-1 Content Growth",
      slug: "mentoring-content",
      description: "Sesi privat 60 menit bedah akun dan strategi funneling via WhatsApp.",
      price: 250000,
      compareAtPrice: 500000,
      images: ["/images/demo/product-mentoring.jpg"],
      productType: "APPOINTMENT",
      checkoutMode: "CHAT_ORDER",
    },
  });

  // Rafa StoreBlocks
  await prisma.storeBlock.deleteMany({ where: { storeId: rafaStore.id } });
  await prisma.storeBlock.createMany({
    data: [
      {
        storeId: rafaStore.id,
        type: "FEATURED_PRODUCT",
        title: "🔥 Produk Terlaris Bulan Ini",
        subtitle: "Preset cinematic terfavorit dengan 3.400+ download",
        badgeText: "Diskon 50% Khusus Hari Ini",
        productId: pRafa1.id,
        sortOrder: 1,
        isActive: true,
      },
      {
        storeId: rafaStore.id,
        type: "COMPACT_STRIP",
        title: "E-Book & Panduan Digital Pilihan",
        sortOrder: 2,
        isActive: true,
      },
      {
        storeId: rafaStore.id,
        type: "IMAGE_BANNER",
        title: "Klaim Bonus Video Asset senilai Rp 300.000",
        subtitle: "Klik untuk konsultasi dan dapatkan link Google Drive bonus!",
        imageUrl: "/images/demo/banner-poster-creator.jpg",
        targetUrl: "https://wa.me/6281234567890?text=Halo%20Rafa,%20saya%20tertarik%20dengan%20kelas%20editing",
        sortOrder: 3,
        isActive: true,
      },
      {
        storeId: rafaStore.id,
        type: "PRODUCT_GRID",
        title: "Rekomendasi Gear & Mentoring",
        sortOrder: 4,
        isActive: true,
      },
    ],
  });

  // 3. STORE 2: KOPI SENJA (visual-menu-grid)
  const senjaStore = await prisma.store.upsert({
    where: { slug: "kopisenja" },
    update: {
      templateId: "visual-menu-grid",
      avatarUrl: "/images/demo/avatar-senja.jpg",
      bannerUrl: "/images/demo/banner-cafe.jpg",
      appearanceConfig: {
        bgType: "solid",
        bgValue: "#FAF6F0",
        coverBannerUrl: "/images/demo/banner-cafe.jpg",
        buttonStyle: "pill",
        accentColor: "#4A2C2A",
        socialLinks: {
          instagram: "https://instagram.com/kopisenja",
          whatsapp: "https://wa.me/6281234567891",
          website: "https://kopisenja.etalase.online",
        },
      },
    },
    create: {
      ownerId: demoUser.id,
      slug: "kopisenja",
      name: "Kopi Senja Roastery",
      bio: "Kopi spesialti seduh manual & bakery fresh oven setiap pagi. Buka 08:00 - 22:00.",
      avatarUrl: "/images/demo/avatar-senja.jpg",
      bannerUrl: "/images/demo/banner-cafe.jpg",
      tier: "PRO",
      isDemo: true,
      templateId: "visual-menu-grid",
      chatChannel: "WHATSAPP",
      chatHandle: "6281234567891",
      chatChannels: [{ channel: "WHATSAPP", handle: "6281234567891", isPrimary: true }],
      currency: "IDR",
      locale: "id",
      appearanceConfig: {
        bgType: "solid",
        bgValue: "#FAF6F0",
        coverBannerUrl: "/images/demo/banner-cafe.jpg",
        buttonStyle: "pill",
        accentColor: "#4A2C2A",
        socialLinks: {
          instagram: "https://instagram.com/kopisenja",
          whatsapp: "https://wa.me/6281234567891",
          website: "https://kopisenja.etalase.online",
        },
      },
    },
  });

  const pSenja1 = await prisma.product.upsert({
    where: { storeId_slug: { storeId: senjaStore.id, slug: "aren-senja" } },
    update: { compareAtPrice: 28000, price: 25000, isFeatured: true },
    create: {
      storeId: senjaStore.id,
      title: "Kopi Susu Aren Senja",
      slug: "aren-senja",
      description: "Espresso robusta-arabika blend dengan gula aren murni organik.",
      price: 25000,
      compareAtPrice: 28000,
      images: ["/images/demo/product-coffee-aren.jpg"],
      productType: "PHYSICAL",
      checkoutMode: "CHAT_ORDER",
      isFeatured: true,
    },
  });

  await prisma.product.upsert({
    where: { storeId_slug: { storeId: senjaStore.id, slug: "croissant" } },
    update: { compareAtPrice: 32000, price: 28000 },
    create: {
      storeId: senjaStore.id,
      title: "Butter Croissant Fresh Oven",
      slug: "croissant",
      description: "Pastry renyah dengan butter Prancis premium yang wangi.",
      price: 28000,
      compareAtPrice: 32000,
      images: ["/images/demo/product-croissant.jpg"],
      productType: "PHYSICAL",
      checkoutMode: "CHAT_ORDER",
    },
  });

  await prisma.product.upsert({
    where: { storeId_slug: { storeId: senjaStore.id, slug: "v60-gayo" } },
    update: { price: 32000 },
    create: {
      storeId: senjaStore.id,
      title: "V60 Gayo Highland Single Origin",
      slug: "v60-gayo",
      description: "Notes buah persik, melati, dan aftertaste manis madu.",
      price: 32000,
      images: ["/images/demo/product-v60.jpg"],
      productType: "PHYSICAL",
      checkoutMode: "CHAT_ORDER",
    },
  });

  await prisma.product.upsert({
    where: { storeId_slug: { storeId: senjaStore.id, slug: "arabika-250" } },
    update: { compareAtPrice: 110000, price: 95000 },
    create: {
      storeId: senjaStore.id,
      title: "Biji Kopi Arabika Gayo 250g",
      slug: "arabika-250",
      description: "Sangrai medium roast khusus seduh manual di rumah.",
      price: 95000,
      compareAtPrice: 110000,
      images: ["/images/demo/product-beans.jpg"],
      productType: "PHYSICAL",
      checkoutMode: "DIRECT_CHECKOUT",
    },
  });

  await prisma.storeBlock.deleteMany({ where: { storeId: senjaStore.id } });
  await prisma.storeBlock.createMany({
    data: [
      {
        storeId: senjaStore.id,
        type: "IMAGE_BANNER",
        title: "Paket Sarapan Hemat Kopi + Pastry",
        subtitle: "Hemat s/d 20% setiap pagi pukul 08:00 - 11:00 WIB",
        imageUrl: "/images/demo/banner-poster-cafe.jpg",
        targetUrl: "https://wa.me/6281234567891?text=Halo%20Kopi%20Senja,%20saya%20mau%20pesan%20Paket%20Sarapan",
        sortOrder: 1,
        isActive: true,
      },
      {
        storeId: senjaStore.id,
        type: "FEATURED_PRODUCT",
        title: "Signature Drink Terlaris",
        subtitle: "Racikan kopi susu gula aren yang lembut dan creamy",
        badgeText: "Favorit Barista",
        productId: pSenja1.id,
        sortOrder: 2,
        isActive: true,
      },
      {
        storeId: senjaStore.id,
        type: "PRODUCT_GRID",
        title: "Buku Menu & Kudapan Fresh",
        sortOrder: 3,
        isActive: true,
      },
    ],
  });

  // 4. STORE 3: BASTIAN MOBIL (showroom-pro)
  const bastianStore = await prisma.store.upsert({
    where: { slug: "bastianmobil" },
    update: {
      templateId: "showroom-pro",
      avatarUrl: "/images/demo/avatar-bastian.jpg",
      bannerUrl: "/images/demo/banner-showroom.jpg",
      appearanceConfig: {
        bgType: "solid",
        bgValue: "#F4F5F7",
        coverBannerUrl: "/images/demo/banner-showroom.jpg",
        buttonStyle: "sharp",
        accentColor: "#18181B",
        socialLinks: {
          tiktok: "https://tiktok.com/@bastianmobil",
          instagram: "https://instagram.com/bastianmobil",
          whatsapp: "https://wa.me/6281234567892",
        },
      },
    },
    create: {
      ownerId: demoUser.id,
      slug: "bastianmobil",
      name: "Bastian Showroom Mobil",
      bio: "Dealer Resmi Mobil Baru & Bekas. Simulasi DP Ringan & Booking Test Drive ke Rumah Anda.",
      avatarUrl: "/images/demo/avatar-bastian.jpg",
      bannerUrl: "/images/demo/banner-showroom.jpg",
      tier: "PRO",
      isDemo: true,
      templateId: "showroom-pro",
      chatChannel: "WHATSAPP",
      chatHandle: "6281234567892",
      chatChannels: [{ channel: "WHATSAPP", handle: "6281234567892", isPrimary: true }],
      currency: "IDR",
      locale: "id",
      appearanceConfig: {
        bgType: "solid",
        bgValue: "#F4F5F7",
        coverBannerUrl: "/images/demo/banner-showroom.jpg",
        buttonStyle: "sharp",
        accentColor: "#18181B",
        socialLinks: {
          tiktok: "https://tiktok.com/@bastianmobil",
          instagram: "https://instagram.com/bastianmobil",
          whatsapp: "https://wa.me/6281234567892",
        },
      },
    },
  });

  const pBastian1 = await prisma.product.upsert({
    where: { storeId_slug: { storeId: bastianStore.id, slug: "suv-hybrid" } },
    update: { price: 0, isFeatured: true },
    create: {
      storeId: bastianStore.id,
      title: "All-New SUV Hybrid 2026",
      slug: "suv-hybrid",
      description: "Mulai DP 15 Jt • Angsuran 4 Jt-an • Ready Stock Hitam & Putih. Free Asuransi 2 Tahun.",
      price: 0,
      images: ["/images/demo/product-car-suv.jpg"],
      productType: "PHYSICAL",
      checkoutMode: "CHAT_ORDER",
      isFeatured: true,
    },
  });

  await prisma.product.upsert({
    where: { storeId_slug: { storeId: bastianStore.id, slug: "city-car" } },
    update: { price: 0 },
    create: {
      storeId: bastianStore.id,
      title: "City Car Matic Sporty 1.2",
      slug: "city-car",
      description: "Angsuran 3 Jt-an • Irit 1:22 km/l • Bonus Kaca Film Full & Talang Air.",
      price: 0,
      images: ["/images/demo/product-car-city.jpg"],
      productType: "PHYSICAL",
      checkoutMode: "CHAT_ORDER",
    },
  });

  await prisma.product.upsert({
    where: { storeId_slug: { storeId: bastianStore.id, slug: "cluster-modern" } },
    update: { price: 0 },
    create: {
      storeId: bastianStore.id,
      title: "Cluster Modern Minimalis 2 Lantai",
      slug: "cluster-modern",
      description: "Tanya Harga • Free BPHTB & Biaya KPR • Selangkah ke Akses Tol & Stasiun LRT.",
      price: 0,
      images: ["/images/demo/product-property.jpg"],
      productType: "PHYSICAL",
      checkoutMode: "CHAT_ORDER",
    },
  });

  await prisma.storeBlock.deleteMany({ where: { storeId: bastianStore.id } });
  await prisma.storeBlock.createMany({
    data: [
      {
        storeId: bastianStore.id,
        type: "FEATURED_PRODUCT",
        title: "🔥 Unit Pilihan Showroom",
        subtitle: "SUV Hybrid terlaris dengan konsumsi bahan bakar 1:24 km/liter",
        badgeText: "DP 15 Jt • Ready Stock",
        productId: pBastian1.id,
        sortOrder: 1,
        isActive: true,
      },
      {
        storeId: bastianStore.id,
        type: "IMAGE_BANNER",
        title: "Promo Kredit Bunga Rendah",
        subtitle: "Dapatkan simulasi cicilan instan & diskon admin khusus bulan ini",
        imageUrl: "/images/demo/banner-poster-showroom.jpg",
        targetUrl: "https://wa.me/6281234567892?text=Halo%20Bastian,%20saya%20minta%20simulasi%20kredit%20SUV%20Hybrid",
        sortOrder: 2,
        isActive: true,
      },
      {
        storeId: bastianStore.id,
        type: "PRODUCT_GRID",
        title: "Katalog Unit & Showroom Listing",
        sortOrder: 3,
        isActive: true,
      },
    ],
  });

  // 5. STORE 4: AISYAH LOOK (editorial-pastel)
  const aisyahStore = await prisma.store.upsert({
    where: { slug: "aisyahlook" },
    update: {
      templateId: "editorial-pastel",
      avatarUrl: "/images/demo/avatar-aisyah.jpg",
      bannerUrl: "/images/demo/banner-beauty.jpg",
      appearanceConfig: {
        bgType: "pattern",
        bgValue: "organic-pastel",
        coverBannerUrl: "/images/demo/banner-beauty.jpg",
        buttonStyle: "pill",
        accentColor: "#D94E28",
        socialLinks: {
          tiktok: "https://tiktok.com/@aisyahlook",
          instagram: "https://instagram.com/aisyahlook",
          whatsapp: "https://wa.me/6281234567893",
        },
      },
    },
    create: {
      ownerId: demoUser.id,
      slug: "aisyahlook",
      name: "Aisyah Hijab & Beauty",
      bio: "Beauty, Hijab & Skincare Favorit. Rekomendasi racun harian yang beneran dipakai & worth to buy ✨",
      avatarUrl: "/images/demo/avatar-aisyah.jpg",
      bannerUrl: "/images/demo/banner-beauty.jpg",
      tier: "PRO",
      isDemo: true,
      templateId: "editorial-pastel",
      chatChannel: "WHATSAPP",
      chatHandle: "6281234567893",
      chatChannels: [{ channel: "WHATSAPP", handle: "6281234567893", isPrimary: true }],
      currency: "IDR",
      locale: "id",
      appearanceConfig: {
        bgType: "pattern",
        bgValue: "organic-pastel",
        coverBannerUrl: "/images/demo/banner-beauty.jpg",
        buttonStyle: "pill",
        accentColor: "#D94E28",
        socialLinks: {
          tiktok: "https://tiktok.com/@aisyahlook",
          instagram: "https://instagram.com/aisyahlook",
          whatsapp: "https://wa.me/6281234567893",
        },
      },
    },
  });

  const pAisyah1 = await prisma.product.upsert({
    where: { storeId_slug: { storeId: aisyahStore.id, slug: "lip-cream" } },
    update: { compareAtPrice: 119000, price: 89000, isFeatured: true },
    create: {
      storeId: aisyahStore.id,
      title: "Velvet Matte Lip Cream Silk Rose",
      slug: "lip-cream",
      description: "Transferproof 16 jam, melembapkan bibir dengan kandungan Vitamin E alami.",
      price: 89000,
      compareAtPrice: 119000,
      images: ["/images/demo/product-lipcream.jpg"],
      productType: "PHYSICAL",
      checkoutMode: "EXTERNAL_LINK",
      externalPlatform: "TIKTOK_SHOP",
      externalLabel: "Keranjang Kuning TikTok",
      isFeatured: true,
    },
  });

  await prisma.product.upsert({
    where: { storeId_slug: { storeId: aisyahStore.id, slug: "glow-serum" } },
    update: { compareAtPrice: 169000, price: 129000 },
    create: {
      storeId: aisyahStore.id,
      title: "Glow Serum Niacinamide 10% + Zinc",
      slug: "glow-serum",
      description: "Mencerahkan noda hitam bekas jerawat dalam 14 hari pemakaian rutin.",
      price: 129000,
      compareAtPrice: 169000,
      images: ["/images/demo/product-serum.jpg"],
      productType: "PHYSICAL",
      checkoutMode: "EXTERNAL_LINK",
      externalPlatform: "TIKTOK_SHOP",
      externalLabel: "Keranjang Kuning TikTok",
    },
  });

  await prisma.product.upsert({
    where: { storeId_slug: { storeId: aisyahStore.id, slug: "pashmina-silk" } },
    update: { compareAtPrice: 75000, price: 55000 },
    create: {
      storeId: aisyahStore.id,
      title: "Pashmina Silk Premium Malaysia",
      slug: "pashmina-silk",
      description: "Bahan flowy, tidak gampang kusut, dan gampang dibentuk rapi tanpa jarum.",
      price: 55000,
      compareAtPrice: 75000,
      images: ["/images/demo/product-hijab.jpg"],
      productType: "PHYSICAL",
      checkoutMode: "EXTERNAL_LINK",
      externalPlatform: "SHOPEE",
      externalLabel: "Shopee Toko Orange",
    },
  });

  await prisma.storeBlock.deleteMany({ where: { storeId: aisyahStore.id } });
  await prisma.storeBlock.createMany({
    data: [
      {
        storeId: aisyahStore.id,
        type: "FEATURED_PRODUCT",
        title: "✨ Racun Ter-viral Minggu Ini",
        subtitle: "Lip cream favorit dipakai daily dengan ribuan ulasan bintang 5",
        badgeText: "Rating 4.9/5 • 12k+ Terjual",
        productId: pAisyah1.id,
        sortOrder: 1,
        isActive: true,
      },
      {
        storeId: aisyahStore.id,
        type: "IMAGE_BANNER",
        title: "Voucher Diskon Keranjang Kuning",
        subtitle: "Klaim potongan s/d Rp 30.000 khusus hari ini!",
        imageUrl: "/images/demo/banner-poster-beauty.jpg",
        targetUrl: "https://tiktok.com",
        sortOrder: 2,
        isActive: true,
      },
      {
        storeId: aisyahStore.id,
        type: "COMPACT_STRIP",
        title: "Skincare & Hijab Favorit",
        sortOrder: 3,
        isActive: true,
      },
      {
        storeId: aisyahStore.id,
        type: "PRODUCT_GRID",
        title: "Semua Rekomendasi Pilihan Aisyah",
        sortOrder: 4,
        isActive: true,
      },
    ],
  });

  // Also update 'demo' store
  await prisma.store.upsert({
    where: { slug: "demo" },
    update: {
      appearanceConfig: {
        bgType: "pattern",
        bgValue: "subtle-dots",
        coverBannerUrl: "/images/demo/banner-creator.jpg",
        buttonStyle: "rounded",
        accentColor: "#D94E28",
        socialLinks: {
          tiktok: "https://tiktok.com/@etalaseonline",
          instagram: "https://instagram.com/etalaseonline",
          whatsapp: "https://wa.me/6281288003005",
        },
      },
    },
    create: {
      ownerId: demoUser.id,
      slug: "demo",
      name: "Studio Demo Creative",
      bio: "Etalase resmi showcase etalase.online.",
      avatarUrl: "/images/demo/avatar-rafa.jpg",
      bannerUrl: "/images/demo/banner-creator.jpg",
      tier: "PRO",
      isDemo: true,
      templateId: "clean-minimal",
      currency: "IDR",
      locale: "id",
    },
  });

  console.log("All 4 demo stores seeded successfully with products, blocks, and appearanceConfig!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
