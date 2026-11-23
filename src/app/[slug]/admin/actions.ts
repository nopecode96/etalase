"use server";

import { revalidatePath } from "next/cache";
import { requireStoreOwner } from "@/lib/auth/session";
import { createProduct, deleteProduct, CreateProductInput } from "@/services/product-catalog";
import { updateStoreProfile, UpdateStoreProfileInput } from "@/services/store-profile";
import { fail, ServiceResult } from "@/lib/core/response";

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
