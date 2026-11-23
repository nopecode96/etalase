import { prisma, serializePlain } from "@/lib/db/prisma";
import { ok, fail, ServiceResult } from "@/lib/core/response";
import { MSG } from "@/lib/core/messages";
import { env } from "@/lib/config/env";

export interface BlogPostData {
  id: string;
  storeId: string;
  title: string;
  slug: string;
  coverImage?: string | null;
  content: string;
  isPublished: boolean;
  views: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export async function getStoreBlogPosts(
  storeId: string,
  onlyPublished = true
): Promise<ServiceResult<BlogPostData[]>> {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        storeId,
        ...(onlyPublished ? { isPublished: true } : {}),
      },
      orderBy: { createdAt: "desc" },
    });
    return ok(serializePlain(posts), "SAVED");
  } catch (error) {
    return fail("INTERNAL_ERROR", undefined, error);
  }
}

export async function getBlogPostBySlug(
  storeId: string,
  slug: string
): Promise<ServiceResult<BlogPostData | null>> {
  try {
    const post = await prisma.blogPost.findUnique({
      where: {
        storeId_slug: { storeId, slug },
      },
    });

    if (!post) {
      return fail("NOT_FOUND");
    }

    // Increment view count asynchronously
    prisma.blogPost
      .update({
        where: { id: post.id },
        data: { views: { increment: 1 } },
      })
      .catch(() => {});

    return ok(serializePlain(post), "SAVED");
  } catch (error) {
    return fail("INTERNAL_ERROR", undefined, error);
  }
}

export async function createBlogPost(params: {
  storeId: string;
  title: string;
  slug: string;
  content: string;
  coverImage?: string;
  isPublished?: boolean;
}): Promise<ServiceResult<BlogPostData>> {
  try {
    const cleanSlug = params.slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-");
    const existing = await prisma.blogPost.findUnique({
      where: {
        storeId_slug: { storeId: params.storeId, slug: cleanSlug },
      },
    });

    if (existing) {
      return fail("SLUG_TAKEN");
    }

    const post = await prisma.blogPost.create({
      data: {
        storeId: params.storeId,
        title: params.title,
        slug: cleanSlug,
        content: params.content,
        coverImage: params.coverImage,
        isPublished: params.isPublished ?? false,
      },
    });

    return ok(serializePlain(post), "CREATED");
  } catch (error) {
    return fail("INTERNAL_ERROR", undefined, error);
  }
}

/**
 * Generates programmatic Schema.org Article / BlogPosting JSON-LD
 * to boost SEO indexing on Southeast Asian Google searches.
 */
export function generateArticleJsonLd(params: {
  title: string;
  slug: string;
  storeSlug: string;
  storeName: string;
  publishedAt: string;
  modifiedAt?: string;
  authorName?: string;
  imageUrl?: string;
  description?: string;
}) {
  const postUrl = `https://${params.storeSlug}.${env.NEXT_PUBLIC_ROOT_DOMAIN}/blog/${params.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: params.title,
    url: postUrl,
    datePublished: params.publishedAt,
    dateModified: params.modifiedAt || params.publishedAt,
    description: params.description || params.title,
    image: params.imageUrl ? [params.imageUrl] : undefined,
    author: {
      "@type": "Person",
      name: params.authorName || params.storeName,
    },
    publisher: {
      "@type": "Organization",
      name: params.storeName,
      url: `https://${params.storeSlug}.${env.NEXT_PUBLIC_ROOT_DOMAIN}`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
  };
}
