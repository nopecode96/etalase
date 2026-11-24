import React from "react";
import { prisma, serializePlain } from "@/lib/db/prisma";
import { requireMabesContext } from "@/lib/auth/mabes-guard";
import { MabesBlogClient } from "@/components/mabes/MabesBlogClient";

export const dynamic = "force-dynamic";

export default async function MabesBlogPage() {
  await requireMabesContext();

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      translations: {
        select: {
          id: true,
          locale: true,
          title: true,
          excerpt: true,
          content: true,
          isPublished: true,
        },
      },
    },
    take: 100,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          Platform Blog &amp; Content Marketing CMS
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Write and publish articles, feature announcements, and SEO content localized for 5 Southeast Asian markets.
        </p>
      </div>

      <MabesBlogClient initialPosts={serializePlain(posts) as any} />
    </div>
  );
}
