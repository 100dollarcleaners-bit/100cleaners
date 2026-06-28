import { NextRequest, NextResponse } from "next/server";
import {
  COOKIE_NAME,
  TOKEN_TTL_MS,
  createAcademyAccessToken,
  verifyPreviewPassword,
} from "@/lib/academy-access";

export async function POST(request: NextRequest) {
  const body = await request.formData();
  const email = String(body.get("email") ?? "").trim().toLowerCase();
  const password = String(body.get("password") ?? "");

  if (!email.includes("@") || email.length < 5) {
    return NextResponse.redirect(
      new URL("/academy/resources?error=invalid_email", request.url)
    );
  }

  if (!verifyPreviewPassword(password)) {
    return NextResponse.redirect(
      new URL("/academy/resources?error=invalid_preview_password", request.url)
    );
  }

  const token = createAcademyAccessToken(email);
  const response = NextResponse.redirect(
    new URL("/academy/resources?unlocked=1", request.url)
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
