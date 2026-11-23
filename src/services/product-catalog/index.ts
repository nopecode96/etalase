import { prisma, serializePlain } from "@/lib/db/prisma";
import { ok, fail, withErrorHandler, ServiceResult } from "@/lib/core/response";
import { slugify } from "@/lib/core/formatters";
import { CheckoutMode, ExternalPlatform, ProductType } from "@prisma/client";

export interface CreateProductInput {
  title: string;
  slug?: string;
  description?: string;
  category?: string;
  images?: string[];
  price: number;
  compareAtPrice?: number | null;
  productType?: ProductType;
  checkoutMode: CheckoutMode;
  externalPlatform?: ExternalPlatform | null;
  externalUrl?: string | null;
  externalLabel?: string | null;
  digitalFileUrl?: string | null;
  chatMessage?: string | null;
  stock?: number | null;
  isFeatured?: boolean;
  secondaryModes?: Array<{
    mode: CheckoutMode;
    label?: string;
    chatChannel?: string;
    chatHandle?: string;
    externalUrl?: string;
  }>;
}

export interface UpdateProductInput extends Partial<CreateProductInput> {
  isActive?: boolean;
}

export async function createProduct(
  storeId: string,
  input: CreateProductInput
): Promise<ServiceResult<unknown>> {
  return withErrorHandler(async () => {
    if (!input.title || input.title.trim().length === 0) {
      return fail("INVALID_INPUT", "Nama produk tidak boleh kosong.");
    }

    const baseSlug = input.slug ? slugify(input.slug) : slugify(input.title);
    let finalSlug = baseSlug;
    let counter = 1;

    // Ensure unique slug per store
    while (true) {
      const existing = await prisma.product.findUnique({
        where: { storeId_slug: { storeId, slug: finalSlug } },
        select: { id: true },
      });
      if (!existing) break;
      finalSlug = `${baseSlug}-${counter++}`;
    }

    const product = await prisma.product.create({
      data: {
        storeId,
        title: input.title.trim(),
        slug: finalSlug,
        description: input.description,
        category: input.category,
        images: input.images || [],
        price: input.price,
        compareAtPrice: input.compareAtPrice,
        productType: input.productType || "DIGITAL",
        checkoutMode: input.checkoutMode,
        externalPlatform: input.externalPlatform,
        externalUrl: input.externalUrl,
        externalLabel: input.externalLabel,
        digitalFileUrl: input.digitalFileUrl,
        chatMessage: input.chatMessage,
        stock: input.stock,
        isFeatured: input.isFeatured ?? false,
        secondaryModes: input.secondaryModes ? JSON.parse(JSON.stringify(input.secondaryModes)) : undefined,
      },
    });

    return ok(serializePlain(product), "CREATED");
  });
}

export async function updateProduct(
  storeId: string,
  productId: string,
  input: UpdateProductInput
): Promise<ServiceResult<unknown>> {
  return withErrorHandler(async () => {
    const existing = await prisma.product.findFirst({
      where: { id: productId, storeId },
    });

    if (!existing) {
      return fail("NOT_FOUND", "Produk tidak ditemukan.");
    }

    const updated = await prisma.product.update({
      where: { id: productId },
      data: {
        title: input.title?.trim(),
        description: input.description,
        category: input.category,
        images: input.images,
        price: input.price !== undefined ? input.price : undefined,
        compareAtPrice: input.compareAtPrice,
        productType: input.productType,
        checkoutMode: input.checkoutMode,
        externalPlatform: input.externalPlatform,
        externalUrl: input.externalUrl,
        externalLabel: input.externalLabel,
        digitalFileUrl: input.digitalFileUrl,
        chatMessage: input.chatMessage,
        stock: input.stock,
        isFeatured: input.isFeatured,
        isActive: input.isActive,
        secondaryModes: input.secondaryModes ? JSON.parse(JSON.stringify(input.secondaryModes)) : undefined,
      },
    });

    return ok(serializePlain(updated), "UPDATED");
  });
}

export async function deleteProduct(
  storeId: string,
  productId: string
): Promise<ServiceResult<null>> {
  return withErrorHandler(async () => {
    const existing = await prisma.product.findFirst({
      where: { id: productId, storeId },
    });

    if (!existing) {
      return fail("NOT_FOUND", "Produk tidak ditemukan.");
    }

    await prisma.product.delete({
      where: { id: productId },
    });

    return ok(null, "DELETED");
  });
}

export async function getStoreProducts(storeId: string): Promise<ServiceResult<unknown[]>> {
  return withErrorHandler(async () => {
    const products = await prisma.product.findMany({
      where: { storeId },
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    });
    return ok(serializePlain(products), "SAVED");
  });
}

export async function trackProductClick(
  productId: string,
  platform?: string
): Promise<ServiceResult<null>> {
  return withErrorHandler(async () => {
    await prisma.product.update({
      where: { id: productId },
      data: { clicks: { increment: 1 } },
    });
    return ok(null, "UPDATED");
  });
}
