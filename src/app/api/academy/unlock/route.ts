import { NextRequest, NextResponse } from "next/server";
import {
  setAcademyAccessCookie,
  verifyAcademyStripeSession,
} from "@/lib/academy-access";

function resourcesUrl(request: NextRequest, query = "") {
  return new URL(`/academy/resources${query}`, request.url);
}

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.redirect(
      resourcesUrl(request, "?error=missing_session")
    );
  }

  const enrollment = await verifyAcademyStripeSession(sessionId);

  if (!enrollment) {
    return NextResponse.redirect(
      resourcesUrl(request, "?error=unlock_failed")
    );
  }

  const response = NextResponse.redirect(
    resourcesUrl(request, "?unlocked=1")
  );
  setAcademyAccessCookie(response, enrollment.email);
  return response;
}
