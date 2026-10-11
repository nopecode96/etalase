"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/auth";

const CatalogItemSchema = z.object({
  tenantId: z.string().min(1),
  title: z.string().min(2, "Judul minimal 2 karakter"),
  slug: z
    .string()
    .min(2, "Slug minimal 2 karakter")
    .regex(/^[a-z0-9-]+$/, "Slug hanya boleh huruf kecil, angka, dan tanda hubung"),
  category: z.string().optional(),
  price: z.number().positive().optional(),
  pricePrefix: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().url("URL gambar tidak valid"),
  images: z.array(z.string().url()).optional().default([]),
  isFeatured: z.boolean().optional().default(false),
  orderIndex: z.number().int().optional().default(0),
  specsJson: z.record(z.string(), z.unknown()).optional(),
});

export type CatalogItemInput = z.infer<typeof CatalogItemSchema>;

export interface CatalogActionResult {
  success: boolean;
  error?: string;
  itemId?: string;
}

/**
 * Server Action: Tambah item katalog baru
 */
export async function createCatalogItemAction(
  input: CatalogItemInput
): Promise<CatalogActionResult> {
  await requireSession();

  const parsed = CatalogItemSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Input tidak valid",
    };
  }

  const { tenantId, price, specsJson, ...rest } = parsed.data;

  const item = await prisma.catalogItem.create({
    data: {
      tenantId,
      ...rest,
      specsJson: (specsJson as any) ?? undefined,
      price: price !== undefined ? price : null,
    },
  });

  revalidatePath(`/dashboard/catalogs`);

  return { success: true, itemId: item.id };
}

/**
 * Server Action: Update item katalog
 */
export async function updateCatalogItemAction(
  itemId: string,
  input: Partial<CatalogItemInput>
): Promise<CatalogActionResult> {
  await requireSession();

  const { price, tenantId: _tenantId, specsJson, ...rest } = input;

  await prisma.catalogItem.update({
    where: { id: itemId },
    data: {
      ...rest,
      ...(specsJson !== undefined ? { specsJson: specsJson as any } : {}),
      ...(price !== undefined ? { price } : {}),
    },
  });

  revalidatePath(`/dashboard/catalogs`);

  return { success: true };
}

/**
 * Server Action: Hapus item katalog
 */
export async function deleteCatalogItemAction(
  itemId: string
): Promise<CatalogActionResult> {
  await requireSession();

  await prisma.catalogItem.delete({ where: { id: itemId } });
  revalidatePath(`/dashboard/catalogs`);

  return { success: true };
}
