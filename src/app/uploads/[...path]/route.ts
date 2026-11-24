import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const MIME_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

export async function GET(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const rawSegments = params.path || [];

    // Security: sanitize path against directory traversal
    for (const segment of rawSegments) {
      if (
        segment.includes("..") ||
        segment.includes("/") ||
        segment.includes("\\") ||
        segment.startsWith(".")
      ) {
        return new NextResponse("Forbidden", { status: 403 });
      }
    }

    const relativeSubPath = rawSegments.join("/");

    // Candidate file locations on disk
    const candidatePaths = [
      path.join(process.cwd(), "public", "uploads", relativeSubPath),
      path.join(process.cwd(), "uploads", relativeSubPath),
      path.join("/app/public/uploads", relativeSubPath),
    ];

    let foundPath: string | null = null;
    for (const p of candidatePaths) {
      if (fs.existsSync(p)) {
        foundPath = p;
        break;
      }
    }

    if (!foundPath) {
      return new NextResponse("Image not found", { status: 404 });
    }

    const ext = path.extname(foundPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    const fileBuffer = await fs.promises.readFile(foundPath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving uploaded asset:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
