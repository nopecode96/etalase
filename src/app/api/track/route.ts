import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || !body.storeSlug || !body.type) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const storeSlug = String(body.storeSlug).trim().toLowerCase();
    if (storeSlug === "demo") {
      return NextResponse.json({ ok: true });
    }

    const store = await prisma.store.findUnique({
      where: { slug: storeSlug },
      select: { id: true },
    });

    if (!store) {
      return NextResponse.json({ ok: true });
    }

    if (body.type === "click" && typeof body.productId === "string" && body.productId) {
      await prisma.product.updateMany({
        where: { id: body.productId, storeId: store.id },
        data: { clicks: { increment: 1 } },
      });
    } else if (body.type === "view") {
      const ids = Array.isArray(body.productIds)
        ? body.productIds.filter((id: unknown) => typeof id === "string" && id.length > 0).slice(0, 50)
        : [];
      if (ids.length > 0) {
        await prisma.product.updateMany({
          where: { id: { in: ids }, storeId: store.id },
          data: { views: { increment: 1 } },
        });
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
