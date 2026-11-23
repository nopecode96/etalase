import { MSG, MessageCode } from "./messages";

export type ServiceResult<T = unknown> =
  | { success: true; data: T; message: string; code?: string }
  | { success: false; error: string; code: string; details?: unknown };

export function ok<T>(
  data: T,
  code: keyof typeof MSG.SUCCESS = "SAVED",
  customMessage?: string
): ServiceResult<T> {
  return {
    success: true,
    data,
    message: customMessage || MSG.SUCCESS[code] || "Sukses.",
    code,
  };
}

export function fail<T = never>(
  code: keyof typeof MSG.ERROR = "INTERNAL_ERROR",
  customError?: string,
  details?: unknown
): ServiceResult<T> {
  return {
    success: false,
    error: customError || MSG.ERROR[code] || "Terjadi kesalahan.",
    code,
    details,
  };
}

export async function withErrorHandler<T>(
  fn: () => Promise<ServiceResult<T>>
): Promise<ServiceResult<T>> {
  try {
    return await fn();
  } catch (err: unknown) {
    console.error("Unhandled Service Error:", err);
    const message = err instanceof Error ? err.message : String(err);
    return fail("INTERNAL_ERROR", message) as ServiceResult<T>;
  }
}
