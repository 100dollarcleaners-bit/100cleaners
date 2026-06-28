import { NextRequest, NextResponse } from "next/server";
import { getAppUrl } from "@/lib/app-url";
import {
  COOKIE_NAME,
  TOKEN_TTL_MS,
  createAcademyAccessToken,
  isPreviewAccessEnabled,
  isValidAcademyEmail,
  normalizeAcademyEmail,
  verifyPreviewPassword,
} from "@/lib/academy-access";

export async function POST(request: NextRequest) {
  const body = await request.formData();
  const email = normalizeAcademyEmail(String(body.get("email") ?? ""));
  const password = String(body.get("password") ?? "");

  if (!isValidAcademyEmail(email)) {
    return NextResponse.redirect(
      new URL("/academy/resources?error=invalid_email", getAppUrl())
    );
  }

  if (!isPreviewAccessEnabled()) {
    return NextResponse.redirect(
      new URL("/academy/resources?error=preview_not_configured", getAppUrl())
    );
  }

  if (!verifyPreviewPassword(password)) {
    return NextResponse.redirect(
      new URL("/academy/resources?error=invalid_preview_password", getAppUrl())
    );
  }

  const token = createAcademyAccessToken(email);
  const response = NextResponse.redirect(
    new URL("/academy/resources?unlocked=1", getAppUrl())
  );

  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: TOKEN_TTL_MS / 1000,
    path: "/",
  });

  return response;
}
