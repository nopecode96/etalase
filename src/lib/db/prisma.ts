import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

/**
 * Safely serialize Prisma objects containing Decimal or Date
 * into plain JSON objects for Next.js Client Components.
 */
export function serializePlain<T>(data: T): T {
  if (data === null || data === undefined) return data;
  return JSON.parse(
    JSON.stringify(data, (_, value) => {
      // Check if value is a Prisma Decimal or BigInt
      if (typeof value === "object" && value !== null && "s" in value && "e" in value && "d" in value) {
        return Number(value.toString());
      }
      if (typeof value === "bigint") {
        return Number(value);
      }
      return value;
    })
  );
}
