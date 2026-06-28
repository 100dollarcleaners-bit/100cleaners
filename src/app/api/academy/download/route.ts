import { createReadStream, existsSync } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";
import {
  COOKIE_NAME,
  verifyAcademyAccessToken,
} from "@/lib/academy-access";

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

function nodeStreamToWeb(stream: Readable) {
  return new ReadableStream({
    start(controller) {
      stream.on("data", (chunk) => controller.enqueue(chunk));
      stream.on("end", () => controller.close());
      stream.on("error", (err) => controller.error(err));
    },
  });
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const email = verifyAcademyAccessToken(token);

  if (!email) {
    return NextResponse.json(
      { error: "Access denied. Please enroll to download course materials." },
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
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const filename = path.basename(resolved);
  const contentType =
    ext === ".pdf" ? "application/pdf" : "text/csv; charset=utf-8";

  const stream = createReadStream(resolved);

  return new NextResponse(nodeStreamToWeb(stream), {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "private, no-cache",
    },
  });
}
