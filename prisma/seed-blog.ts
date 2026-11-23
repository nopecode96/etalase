import { PrismaClient } from "@prisma/client";
import { ARTICLES_DATA } from "../src/lib/blog/articles-data";
import { SupportedLocale } from "../src/lib/config/constants";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding blog posts and multi-language translations...");

  for (const item of ARTICLES_DATA) {
    const post = await prisma.post.upsert({
      where: { slug: item.slug },
      update: {
        category: item.translations.id.category,
        coverImage: item.image.url,
        authorName: item.author.name.id,
        authorRole: item.author.role.id,
        isPublished: true,
        publishedAt: new Date(item.datePublished),
      },
      create: {
        slug: item.slug,
        category: item.translations.id.category,
        coverImage: item.image.url,
        authorName: item.author.name.id,
        authorRole: item.author.role.id,
        isPublished: true,
        publishedAt: new Date(item.datePublished),
      },
    });

    const locales: SupportedLocale[] = ["id", "en", "ms", "th", "vi"];

    for (const loc of locales) {
      const trans = item.translations[loc];
      if (!trans) continue;

      const readingTime = parseInt(trans.readTime.replace(/\D/g, ""), 10) || 4;
      const contentJson = JSON.stringify({
        directAnswer: trans.directAnswer,
        keyTakeaways: trans.keyTakeaways,
        table: trans.table,
        sections: trans.sections,
        faqs: trans.faqs,
      });

      await prisma.postTranslation.upsert({
        where: {
          postId_locale: {
            postId: post.id,
            locale: loc,
          },
        },
        update: {
          title: trans.title,
          excerpt: trans.summary,
          content: contentJson,
          coverAlt: item.image.alt[loc] || item.image.alt.id,
          seoTitle: `${trans.title} — etalase.online`,
          seoDescription: trans.summary,
          readingTimeMin: readingTime,
          isPublished: true,
        },
        create: {
          postId: post.id,
          locale: loc,
          title: trans.title,
          excerpt: trans.summary,
          content: contentJson,
          coverAlt: item.image.alt[loc] || item.image.alt.id,
          seoTitle: `${trans.title} — etalase.online`,
          seoDescription: trans.summary,
          readingTimeMin: readingTime,
          isPublished: true,
        },
      });
    }

    console.log(`✓ Seeded post & 5 translations for slug: ${item.slug}`);
  }

  // 5th Article with ONLY "id" and "en" translations to test fallback mechanism
  const fallbackTestSlug = "panduan-ekspansi-e-commerce-asean";
  const fallbackPost = await prisma.post.upsert({
    where: { slug: fallbackTestSlug },
    update: {
      category: "Eksplorasi Pasar SEA",
      coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      authorName: "Tim Riset Makro Etalase",
      authorRole: "Ekonom Digital & Kebijakan Transaksi Lintas Batas",
      isPublished: true,
      publishedAt: new Date("2026-11-22T10:00:00+07:00"),
    },
    create: {
      slug: fallbackTestSlug,
      category: "Eksplorasi Pasar SEA",
      coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      authorName: "Tim Riset Makro Etalase",
      authorRole: "Ekonom Digital & Kebijakan Transaksi Lintas Batas",
      isPublished: true,
      publishedAt: new Date("2026-11-22T10:00:00+07:00"),
    },
  });

  // ID translation
  await prisma.postTranslation.upsert({
    where: {
      postId_locale: {
        postId: fallbackPost.id,
        locale: "id",
      },
    },
    update: {
      title: "Panduan Ekspansi Penjualan Brand Lokal Menembus Pasar Malaysia & Thailand",
      excerpt: "Kiat operasional menerima pembayaran mata uang asing dan pengiriman digital lintas batas tanpa terbebani selisih kurs yang merugikan.",
      content: JSON.stringify({
        directAnswer: "Kunci ekspansi jualan ke negara tetangga di Asia Tenggara adalah menyediakan storefront multi-mata uang (MYR, THB, SGD) dengan sistem checkout chat terpadu dan pengiriman instan.",
        keyTakeaways: [
          "Gunakan multi-currency switcher otomatis pada etalase toko.",
          "Manfaatkan gateway QRIS antarnegara (Cross-Border QR Payment) BI-BNM-BOT.",
          "Hilangkan friksi logistik dengan menjual produk digital atau voucher pra-bayar.",
        ],
        table: {
          caption: "Kesiapan Infrastruktur Pembayaran Lintas Batas SEA",
          headers: ["Negara", "Konektivitas QR", "Mata Uang", "Kecepatan Settlement"],
          rows: [
            ["Malaysia", "QRIS - DuitNow", "MYR", "Instan Real-time"],
            ["Thailand", "QRIS - PromptPay", "THB", "Instan Real-time"],
            ["Singapura", "QRIS - NETS", "SGD", "Instan Real-time"],
          ],
        },
        sections: [
          {
            heading: "1. Integrasi Sistem Pembayaran Lintas Batas",
            directAnswer: "Standardisasi QR antarnegara di ASEAN memungkinkan pembeli luar negeri memindai kode QR etalase Anda menggunakan aplikasi perbankan lokal mereka.",
            content: [
              "Sejak diresmikannya interkoneksi pembayaran lintas batas antara Bank Indonesia, Bank Negara Malaysia, dan Bank of Thailand, pembeli dari Kuala Lumpur atau Bangkok dapat berbelanja di etalase.online seolah bertransaksi domestik.",
            ],
          },
        ],
        faqs: [
          {
            question: "Mata uang apa saja yang didukung oleh etalase.online?",
            answer: "Platform mendukung IDR, MYR, SGD, THB, VND, PHP, dan USD.",
          },
        ],
      }),
      coverAlt: "Gedung finansial modern pusat transaksi perdagangan digital Asia Tenggara",
      seoTitle: "Panduan Ekspansi Brand Lokal ke Pasar ASEAN — etalase.online",
      seoDescription: "Strategi praktis ekspansi penjualan ke pasar regional Asia Tenggara dengan multi-currency dan QR lintas negara.",
      readingTimeMin: 5,
      isPublished: true,
    },
    create: {
      postId: fallbackPost.id,
      locale: "id",
      title: "Panduan Ekspansi Penjualan Brand Lokal Menembus Pasar Malaysia & Thailand",
      excerpt: "Kiat operasional menerima pembayaran mata uang asing dan pengiriman digital lintas batas tanpa terbebani selisih kurs yang merugikan.",
      content: JSON.stringify({
        directAnswer: "Kunci ekspansi jualan ke negara tetangga di Asia Tenggara adalah menyediakan storefront multi-mata uang (MYR, THB, SGD) dengan sistem checkout chat terpadu dan pengiriman instan.",
        keyTakeaways: [
          "Gunakan multi-currency switcher otomatis pada etalase toko.",
          "Manfaatkan gateway QRIS antarnegara (Cross-Border QR Payment) BI-BNM-BOT.",
          "Hilangkan friksi logistik dengan menjual produk digital atau voucher pra-bayar.",
        ],
        table: {
          caption: "Kesiapan Infrastruktur Pembayaran Lintas Batas SEA",
          headers: ["Negara", "Konektivitas QR", "Mata Uang", "Kecepatan Settlement"],
          rows: [
            ["Malaysia", "QRIS - DuitNow", "MYR", "Instan Real-time"],
            ["Thailand", "QRIS - PromptPay", "THB", "Instan Real-time"],
            ["Singapura", "QRIS - NETS", "SGD", "Instan Real-time"],
          ],
        },
        sections: [
          {
            heading: "1. Integrasi Sistem Pembayaran Lintas Batas",
            directAnswer: "Standardisasi QR antarnegara di ASEAN memungkinkan pembeli luar negeri memindai kode QR etalase Anda menggunakan aplikasi perbankan lokal mereka.",
            content: [
              "Sejak diresmikannya interkoneksi pembayaran lintas batas antara Bank Indonesia, Bank Negara Malaysia, dan Bank of Thailand, pembeli dari Kuala Lumpur atau Bangkok dapat berbelanja di etalase.online seolah bertransaksi domestik.",
            ],
          },
        ],
        faqs: [
          {
            question: "Mata uang apa saja yang didukung oleh etalase.online?",
            answer: "Platform mendukung IDR, MYR, SGD, THB, VND, PHP, dan USD.",
          },
        ],
      }),
      coverAlt: "Gedung finansial modern pusat transaksi perdagangan digital Asia Tenggara",
      seoTitle: "Panduan Ekspansi Brand Lokal ke Pasar ASEAN — etalase.online",
      seoDescription: "Strategi praktis ekspansi penjualan ke pasar regional Asia Tenggara dengan multi-currency dan QR lintas negara.",
      readingTimeMin: 5,
      isPublished: true,
    },
  });

  // EN translation
  await prisma.postTranslation.upsert({
    where: {
      postId_locale: {
        postId: fallbackPost.id,
        locale: "en",
      },
    },
    update: {
      title: "Playbook: Expanding Southeast Asian Cross-Border Sales to Malaysia & Thailand",
      excerpt: "Operational strategies to accept regional currencies and execute digital cross-border fulfillment with zero forex penalty.",
      content: JSON.stringify({
        directAnswer: "The cornerstone of cross-border expansion in Southeast Asia is offering multi-currency storefronts with instant chat-based checkout and cross-border QR interoperability.",
        keyTakeaways: [
          "Deploy multi-currency storefront pricing automatically.",
          "Leverage ASEAN cross-border QR linkages (DuitNow, PromptPay, NETS).",
          "Eliminate customs frictions with digital product distribution.",
        ],
        sections: [
          {
            heading: "1. Cross-Border QR Payment Rail Integration",
            directAnswer: "Standardized QR rails allow regional buyers to pay using their native banking apps while merchants settle locally.",
            content: [
              "With bilateral QR agreements live across Indonesia, Malaysia, and Thailand, friction-free commerce across borders is now reality.",
            ],
          },
        ],
        faqs: [
          {
            question: "Which currencies are supported on etalase.online?",
            answer: "We support IDR, MYR, SGD, THB, VND, PHP, and USD.",
          },
        ],
      }),
      coverAlt: "Modern financial district in Southeast Asia representing cross-border trade",
      seoTitle: "Southeast Asia Cross-Border E-Commerce Expansion Playbook — etalase.online",
      seoDescription: "Step-by-step guidance on scaling regional commerce across ASEAN with multi-currency pricing and instant QR payment.",
      readingTimeMin: 5,
      isPublished: true,
    },
    create: {
      postId: fallbackPost.id,
      locale: "en",
      title: "Playbook: Expanding Southeast Asian Cross-Border Sales to Malaysia & Thailand",
      excerpt: "Operational strategies to accept regional currencies and execute digital cross-border fulfillment with zero forex penalty.",
      content: JSON.stringify({
        directAnswer: "The cornerstone of cross-border expansion in Southeast Asia is offering multi-currency storefronts with instant chat-based checkout and cross-border QR interoperability.",
        keyTakeaways: [
          "Deploy multi-currency storefront pricing automatically.",
          "Leverage ASEAN cross-border QR linkages (DuitNow, PromptPay, NETS).",
          "Eliminate customs frictions with digital product distribution.",
        ],
        sections: [
          {
            heading: "1. Cross-Border QR Payment Rail Integration",
            directAnswer: "Standardized QR rails allow regional buyers to pay using their native banking apps while merchants settle locally.",
            content: [
              "With bilateral QR agreements live across Indonesia, Malaysia, and Thailand, friction-free commerce across borders is now reality.",
            ],
          },
        ],
        faqs: [
          {
            question: "Which currencies are supported on etalase.online?",
            answer: "We support IDR, MYR, SGD, THB, VND, PHP, and USD.",
          },
        ],
      }),
      coverAlt: "Modern financial district in Southeast Asia representing cross-border trade",
      seoTitle: "Southeast Asia Cross-Border E-Commerce Expansion Playbook — etalase.online",
      seoDescription: "Step-by-step guidance on scaling regional commerce across ASEAN with multi-currency pricing and instant QR payment.",
      readingTimeMin: 5,
      isPublished: true,
    },
  });

  console.log(`✓ Seeded fallback-test post for slug: ${fallbackTestSlug} (id & en only)`);
  console.log("✅ Blog database seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
