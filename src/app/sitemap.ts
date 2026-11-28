import type { MetadataRoute } from "next";
import { getPublishedPostsByLocale } from "@/lib/queries/blog";
import { SUPPORTED_LOCALES } from "@/lib/config/constants";
import { SEGMENT_PAGES } from "@/lib/constants/segments";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://etalase.online";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

function buildAlternates(path: string): Record<string, string> {
  const clean = path === "/" ? "" : path;
  const languages: Record<string, string> = {};
  for (const loc of SUPPORTED_LOCALES) {
    languages[loc] = loc === "id" ? `${BASE_URL}${path}` : `${BASE_URL}/${loc}${clean}`;
  }
  return languages;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
    localize: boolean;
  }> = [
    { path: "/", changeFrequency: "daily", priority: 1.0, localize: true },
    { path: "/fitur", changeFrequency: "weekly", priority: 0.9, localize: true },
    { path: "/solusi", changeFrequency: "weekly", priority: 0.9, localize: true },
    { path: "/solusi/kue-hampers", changeFrequency: "weekly", priority: 0.9, localize: true },
    { path: "/template", changeFrequency: "weekly", priority: 0.85, localize: true },
    { path: "/harga", changeFrequency: "weekly", priority: 0.9, localize: true },
    { path: "/tools", changeFrequency: "weekly", priority: 0.8, localize: true },
    { path: "/blog", changeFrequency: "daily", priority: 0.85, localize: true },
    { path: "/bantuan", changeFrequency: "weekly", priority: 0.85, localize: true },
    { path: "/about", changeFrequency: "monthly", priority: 0.75, localize: true },
    { path: "/kontak", changeFrequency: "monthly", priority: 0.75, localize: true },
    { path: "/alternatif-lynk-id", changeFrequency: "weekly", priority: 0.85, localize: true },
    { path: "/syarat", changeFrequency: "monthly", priority: 0.5, localize: false },
    { path: "/privasi", changeFrequency: "monthly", priority: 0.5, localize: false },
    { path: "/refund", changeFrequency: "monthly", priority: 0.5, localize: false },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const route of staticRoutes) {
    const alternates = route.localize ? { languages: buildAlternates(route.path) } : undefined;
    entries.push({
      url: `${BASE_URL}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates,
    });
    if (route.localize) {
      for (const loc of SUPPORTED_LOCALES) {
        if (loc === "id") continue;
        const localizedPath = route.path === "/" ? `/${loc}` : `/${loc}${route.path}`;
        entries.push({
          url: `${BASE_URL}${localizedPath}`,
          lastModified: now,
          changeFrequency: route.changeFrequency,
          priority: Math.max(0.5, route.priority - 0.1),
          alternates,
        });
      }
    }
  }

  for (const seg of SEGMENT_PAGES) {
    const segPath = `/solusi/${seg.slug}`;
    const alternates = { languages: buildAlternates(segPath) };
    entries.push({
      url: `${BASE_URL}${segPath}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates,
    });
  }

  try {
    const posts = await getPublishedPostsByLocale("id");
    for (const post of posts) {
      const postPath = `/blog/${post.slug}`;
      entries.push({
        url: `${BASE_URL}${postPath}`,
        lastModified: post.updatedAt || now,
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: { languages: buildAlternates(postPath) },
      });
    }
  } catch {
    // Fallback if database is temporarily unavailable
  }

  return entries;
}
