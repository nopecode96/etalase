import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const EXTENSION_MAP: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(req: NextRequest) {
  try {
    // 1. Strict Tenant Authentication & Isolation Guard (JSON 401/403 instead of redirect)
    const user = await getCurrentUser();
    if (!user?.id) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const store = await prisma.store.findFirst({
      where: { ownerId: user.id },
      select: { id: true },
    });

    if (!store?.id) {
      return NextResponse.json(
        { success: false, error: "Store context not found" },
        { status: 403 }
      );
    }
    const storeId = store.id;

    // 2. Parse Multipart Form Data
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const rawFolder = (formData.get("folder") as string) || "general";

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No image file provided" },
        { status: 400 }
      );
    }

    // Sanitize folder name (only lowercase letters, numbers, hyphens)
    const folder = rawFolder.toLowerCase().replace(/[^a-z0-9-]/g, "") || "general";

    // 3. Validation: MIME Type & File Size
    const mimeType = file.type.toLowerCase();
    if (!ALLOWED_MIME_TYPES.has(mimeType)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid file format. Allowed types: JPG, PNG, WebP, GIF.",
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: "File is too large. Maximum allowed size is 5MB.",
        },
        { status: 400 }
      );
    }

    // 4. Generate Unique Filename
    const ext = EXTENSION_MAP[mimeType] || path.extname(file.name) || ".jpg";
    const uniqueSuffix = `${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
    const filename = `${uniqueSuffix}${ext}`;

    // 5. Tenant-Isolated Storage Directory
    // Both in ./uploads and ./public/uploads for docker/local volume sync
    const relativeDir = path.join("tenants", storeId, folder);
    
    // Target base directories
    const targetDirs = [
      path.join(process.cwd(), "uploads", relativeDir),
      path.join(process.cwd(), "public", "uploads", relativeDir),
      path.join("/app/public/uploads", relativeDir),
    ];

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let saved = false;
    for (const dir of targetDirs) {
      try {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        const fullPath = path.join(dir, filename);
        fs.writeFileSync(fullPath, buffer);
        saved = true;
      } catch {
        // Continue to other candidate dirs
      }
    }

    if (!saved) {
      return NextResponse.json(
        { success: false, error: "Failed to write file to storage" },
        { status: 500 }
      );
    }

    // 6. Return Publicly Accessible Relative URL
    const publicUrl = `/uploads/tenants/${storeId}/${folder}/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
      size: file.size,
      mimeType,
    });
  } catch (err: any) {
    console.error("Image upload API error:", err);
    return NextResponse.json(
      {
        success: false,
        error: err?.message || "Failed to process image upload",
      },
      { status: 500 }
    );
  }
}
