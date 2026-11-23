"use client";

import { Toaster, toast } from "sonner";
import { ServiceResult } from "@/lib/core/response";

export function GlobalToast() {
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      theme="system"
      toastOptions={{
        duration: 4000,
      }}
    />
  );
}

/**
 * Universal feedback handler that accepts a ServiceResult
 * and automatically triggers the correct toast.
 */
export function showServiceResultToast(result: ServiceResult<unknown>) {
  if (result.success) {
    toast.success(result.message || "Berhasil!");
  } else {
    toast.error(result.error || "Terjadi kesalahan!");
  }
}
