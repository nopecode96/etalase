import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://etalase.online";

export default function robots(): MetadataRoute.Robots {
  const disallowedPaths = [
    "/admin",
    "/admin/",
    "/mabes",
    "/mabes/",
    "/api/",
    "/onboarding",
    "/auth/",
    "/pay/",
    "/*/admin",
    "/*/admin/",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: disallowedPaths,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: disallowedPaths,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: disallowedPaths,
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: disallowedPaths,
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: disallowedPaths,
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: disallowedPaths,
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: disallowedPaths,
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: disallowedPaths,
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: disallowedPaths,
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
