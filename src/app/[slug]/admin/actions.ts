"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser, requireStoreOwner } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { createProduct, deleteProduct, CreateProductInput } from "@/services/product-catalog";
import { updateStoreProfile, UpdateStoreProfileInput } from "@/services/store-profile";
import { fail, ok, ServiceResult } from "@/lib/core/response";

export async function actionCreateProduct(
  slug: string,
  input: CreateProductInput
): Promise<ServiceResult<unknown>> {
  try {
    const { store } = await requireStoreOwner(slug);
    const res = await createProduct(store.id, input);
    revalidatePath(`/${slug}/admin`);
    revalidatePath(`/${slug}`);
    return res;
  } catch (err: unknown) {
    return fail("UNAUTHORIZED", err instanceof Error ? err.message : "Akses ditolak");
  }
}

export async function actionDeleteProduct(
  slug: string,
  productId: string
): Promise<ServiceResult<null>> {
  try {
    const { store } = await requireStoreOwner(slug);
    const res = await deleteProduct(store.id, productId);
    revalidatePath(`/${slug}/admin`);
    revalidatePath(`/${slug}`);
    return res;
  } catch (err: unknown) {
    return fail("UNAUTHORIZED", err instanceof Error ? err.message : "Akses ditolak");
  }
}

export async function actionUpdateStoreSettings(
  slug: string,
  input: UpdateStoreProfileInput
): Promise<ServiceResult<unknown>> {
  try {
    const { store } = await requireStoreOwner(slug);
    const res = await updateStoreProfile(store.id, input);
    revalidatePath(`/${slug}/admin`);
    revalidatePath(`/${slug}`);
    return res;
  } catch (err: unknown) {
    return fail("UNAUTHORIZED", err instanceof Error ? err.message : "Akses ditolak");
  }
}

export async function actionUpdateAppearance(
  slug: string,
  appearanceConfig: any,
  templateId?: string
): Promise<ServiceResult<unknown>> {
  try {
    const user = await getCurrentUser();
    const store = await prisma.store.findUnique({
      where: { slug },
      select: { id: true, ownerId: true, isDemo: true, tier: true },
    });

    if (!store) {
      if (slug === "demo") {
        return ok({ message: "Pratinjau demo diperbarui" });
      }
      return fail("NOT_FOUND", "Toko tidak ditemukan");
    }

    if (!store.isDemo) {
      if (!user || (user.id !== store.ownerId && (user as any).role !== "SUPER_ADMIN")) {
        return fail("UNAUTHORIZED", "Akses ditolak");
      }
    }

    // Guard: PRO templates require PRO tier
    const proTemplates = [
      "visual-menu-grid",
      "showroom-pro",
      "editorial-pastel",
      "cafe-menu",
      "sales-showcase",
      "beauty-glam",
      "sage-creator",
      "editorial-paper",
      "midnight-glow",
      "boutique-visual",
      "wellness-pro",
    ];

    if (templateId && proTemplates.includes(templateId) && store.tier === "FREE" && !store.isDemo) {
      return fail("FORBIDDEN", "Template ini hanya tersedia untuk paket Pro.");
    }

    const updated = await prisma.store.update({
      where: { id: store.id },
      data: {
        ...(templateId ? { templateId } : {}),
        appearanceConfig: appearanceConfig || {},
      },
    });

    revalidatePath(`/${slug}/admin/appearance`);
    revalidatePath(`/${slug}/admin`);
    revalidatePath(`/${slug}`);
    return ok(updated);
  } catch (err: unknown) {
    return fail("INTERNAL_ERROR", err instanceof Error ? err.message : "Gagal memperbarui tampilan");
  }
}

export async function actionSaveBlocks(
  slug: string,
  blocks: Array<{
    id?: string;
    type: string;
    title?: string | null;
    subtitle?: string | null;
    imageUrl?: string | null;
    targetUrl?: string | null;
    productId?: string | null;
    badgeText?: string | null;
    isActive?: boolean;
    sortOrder?: number;
  }>
): Promise<ServiceResult<unknown>> {
  try {
    const user = await getCurrentUser();
    const store = await prisma.store.findUnique({
      where: { slug },
      select: { id: true, ownerId: true, isDemo: true },
    });

    if (!store) {
      if (slug === "demo") {
        return ok({ message: "Pratinjau demo diperbarui" });
      }
      return fail("NOT_FOUND", "Toko tidak ditemukan");
    }

    if (!store.isDemo) {
      if (!user || (user.id !== store.ownerId && (user as any).role !== "SUPER_ADMIN")) {
        return fail("UNAUTHORIZED", "Akses ditolak");
      }
    }

    await prisma.$transaction(async (tx) => {
      await tx.storeBlock.deleteMany({ where: { storeId: store.id } });
      if (blocks && blocks.length > 0) {
        await tx.storeBlock.createMany({
          data: blocks.map((b, index) => ({
            storeId: store.id,
            type: b.type,
            title: b.title || null,
            subtitle: b.subtitle || null,
            imageUrl: b.imageUrl || null,
            targetUrl: b.targetUrl || null,
            productId: b.productId || null,
            badgeText: b.badgeText || null,
            isActive: b.isActive ?? true,
            sortOrder: b.sortOrder ?? index + 1,
          })),
        });
      }
    });

    revalidatePath(`/${slug}/admin/appearance`);
    revalidatePath(`/${slug}/admin`);
    revalidatePath(`/${slug}`);
    return ok({ success: true });
  } catch (err: unknown) {
    return fail("INTERNAL_ERROR", err instanceof Error ? err.message : "Gagal menyimpan blok");
  }
}
