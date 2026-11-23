import { prisma } from "@/lib/db/prisma";

export interface PostListItem {
  id: string;
  slug: string;
  category: string;
  coverImage: string | null;
  coverAlt: string;
  authorName: string;
  authorRole: string | null;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  excerpt: string;
  readingTimeMin: number;
  resolvedLocale: string;
  isExactLocale: boolean;
  availableLocales: string[];
}

export interface PostDetailItem extends PostListItem {
  content: string;
  seoTitle: string | null;
  seoDescription: string | null;
  translations: {
    locale: string;
    title: string;
    isPublished: boolean;
  }[];
}

interface GetPostsOptions {
  category?: string;
  query?: string;
}

/**
 * Resolves the best matching translation for a post given the target locale.
 * Fallback priority: targetLocale -> "en" -> "id" -> first available translation.
 */
function resolveBestTranslation(
  translations: Array<{
    id: string;
    locale: string;
    title: string;
    excerpt: string;
    content: string;
    coverAlt: string | null;
    seoTitle: string | null;
    seoDescription: string | null;
    readingTimeMin: number;
    isPublished: boolean;
  }>,
  targetLocale: string
) {
  const publishedTranslations = translations.filter((t) => t.isPublished);
  if (publishedTranslations.length === 0) return null;

  // 1. Exact locale match
  const exact = publishedTranslations.find((t) => t.locale === targetLocale);
  if (exact) {
    return { translation: exact, isExactLocale: true };
  }

  // 2. Fallback to English
  const enFallback = publishedTranslations.find((t) => t.locale === "en");
  if (enFallback) {
    return { translation: enFallback, isExactLocale: false };
  }

  // 3. Fallback to Indonesian
  const idFallback = publishedTranslations.find((t) => t.locale === "id");
  if (idFallback) {
    return { translation: idFallback, isExactLocale: false };
  }

  // 4. Fallback to first available translation
  return { translation: publishedTranslations[0], isExactLocale: false };
}

/**
 * Retrieves published posts ordered by publishedAt DESC, prioritizing active locale with fallback.
 */
export async function getPublishedPostsByLocale(
  locale: string = "id",
  options?: GetPostsOptions
): Promise<PostListItem[]> {
  try {
    const whereClause: Record<string, unknown> = {
      isPublished: true,
      translations: {
        some: {
          isPublished: true,
        },
      },
    };

    if (options?.category && options.category !== "Semua" && options.category !== "All") {
      whereClause.category = options.category;
    }

    const posts = await prisma.post.findMany({
      where: whereClause,
      include: {
        translations: {
          where: { isPublished: true },
        },
      },
      orderBy: {
        publishedAt: "desc",
      },
    });

    const items: PostListItem[] = [];

    for (const post of posts) {
      const resolved = resolveBestTranslation(post.translations, locale);
      if (!resolved) continue;

      const { translation, isExactLocale } = resolved;

      // Search query filtering if present
      if (options?.query && options.query.trim() !== "") {
        const q = options.query.toLowerCase().trim();
        const matchesTitle = translation.title.toLowerCase().includes(q);
        const matchesExcerpt = translation.excerpt.toLowerCase().includes(q);
        const matchesSlug = post.slug.toLowerCase().includes(q);
        if (!matchesTitle && !matchesExcerpt && !matchesSlug) {
          continue;
        }
      }

      items.push({
        id: post.id,
        slug: post.slug,
        category: post.category,
        coverImage: post.coverImage,
        coverAlt:
          translation.coverAlt ||
          `${translation.title} — etalase.online`,
        authorName: post.authorName,
        authorRole: post.authorRole,
        publishedAt: post.publishedAt,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        title: translation.title,
        excerpt: translation.excerpt,
        readingTimeMin: translation.readingTimeMin,
        resolvedLocale: translation.locale,
        isExactLocale,
        availableLocales: post.translations.map((t) => t.locale),
      });
    }

    return items;
  } catch (error) {
    console.error("Failed to query published posts by locale:", error);
    return [];
  }
}

/**
 * Retrieves a single post by slug with translation prioritized by locale (and safe fallback).
 */
export async function getPostBySlugAndLocale(
  slug: string,
  locale: string = "id"
): Promise<PostDetailItem | null> {
  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        translations: {
          where: { isPublished: true },
        },
      },
    });

    if (!post || !post.isPublished || post.translations.length === 0) {
      return null;
    }

    const resolved = resolveBestTranslation(post.translations, locale);
    if (!resolved) return null;

    const { translation, isExactLocale } = resolved;

    return {
      id: post.id,
      slug: post.slug,
      category: post.category,
      coverImage: post.coverImage,
      coverAlt:
        translation.coverAlt ||
        `${translation.title} — etalase.online`,
      authorName: post.authorName,
      authorRole: post.authorRole,
      publishedAt: post.publishedAt,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      title: translation.title,
      excerpt: translation.excerpt,
      content: translation.content,
      seoTitle: translation.seoTitle,
      seoDescription: translation.seoDescription,
      readingTimeMin: translation.readingTimeMin,
      resolvedLocale: translation.locale,
      isExactLocale,
      availableLocales: post.translations.map((t) => t.locale),
      translations: post.translations.map((t) => ({
        locale: t.locale,
        title: t.title,
        isPublished: t.isPublished,
      })),
    };
  } catch (error) {
    console.error(`Failed to query post by slug "${slug}":`, error);
    return null;
  }
}

/**
 * Returns distinct published categories.
 */
export async function getPublishedCategories(): Promise<string[]> {
  try {
    const categories = await prisma.post.findMany({
      where: { isPublished: true },
      select: { category: true },
      distinct: ["category"],
    });
    return categories.map((c) => c.category);
  } catch (error) {
    console.error("Failed to query published categories:", error);
    return [];
  }
}
