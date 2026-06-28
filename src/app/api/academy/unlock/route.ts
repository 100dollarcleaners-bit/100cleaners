import { NextRequest, NextResponse } from "next/server";
import {
  COOKIE_NAME,
  TOKEN_TTL_MS,
  createAcademyAccessToken,
  verifyAcademyStripeSession,
} from "@/lib/academy-access";

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.redirect(
      new URL("/academy/resources?error=missing_session", request.url)
    );
  }

  const enrollment = await verifyAcademyStripeSession(sessionId);

  if (!enrollment) {
    return NextResponse.redirect(
      new URL("/academy/resources?error=unlock_failed", request.url)
    );
  }

  const token = createAcademyAccessToken(enrollment.email);
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
