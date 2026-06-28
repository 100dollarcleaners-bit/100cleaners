import { existsSync, readFileSync } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import {
  COOKIE_NAME,
  verifyAcademyAccessToken,
} from "@/lib/academy-access";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CONTENT_ROOT = path.join(process.cwd(), "content/academy");

const ALLOWED_EXTENSIONS = new Set([".pdf", ".csv"]);

function resolveFile(safePath: string): string | null {
  const normalized = path.normalize(safePath).replace(/^(\.\.(\/|\\|$))+/, "");
  const full = path.join(CONTENT_ROOT, normalized);

  if (!full.startsWith(CONTENT_ROOT)) return null;

  const ext = path.extname(full).toLowerCase();
  if (!ALLOWED_EXTENSIONS.has(ext)) return null;

  if (!existsSync(full)) return null;

  return full;
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const email = verifyAcademyAccessToken(token);

  if (!email) {
    return NextResponse.json(
      { error: "Access denied. Please enroll and unlock your materials first." },
      { status: 403 }
    );
  }

  const fileParam = request.nextUrl.searchParams.get("file");
  if (!fileParam) {
    return NextResponse.json({ error: "Missing file parameter" }, { status: 400 });
  }

  const ext = path.extname(fileParam).toLowerCase();
  const subdir = ext === ".csv" ? "downloads" : "pdfs";
  const resolved = resolveFile(path.join(subdir, fileParam));

  if (!resolved) {
    console.error("Academy file missing on server:", fileParam);
    return NextResponse.json(
      { error: "File not found on server. Contact support." },
      { status: 404 }
    );
  }

  const filename = path.basename(resolved);
  const contentType =
    ext === ".pdf" ? "application/pdf" : "text/csv; charset=utf-8";

  const buffer = readFileSync(resolved);

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Length": String(buffer.length),
      "Cache-Control": "private, no-cache",
    },
  });
}
