import { NextRequest, NextResponse } from "next/server";
import {
  createAcademyAccessToken,
  isPreviewAccessEnabled,
  isValidAcademyEmail,
  normalizeAcademyEmail,
  setAcademyAccessCookie,
  verifyPreviewPassword,
} from "@/lib/academy-access";

function resourcesUrl(request: NextRequest, query = "") {
  return new URL(`/academy/resources${query}`, request.url);
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") ?? "";
  let email = "";
  let password = "";

  if (contentType.includes("application/json")) {
    const body = await request.json();
    email = normalizeAcademyEmail(String(body.email ?? ""));
    password = String(body.password ?? "");
  } else {
    const body = await request.formData();
    email = normalizeAcademyEmail(String(body.get("email") ?? ""));
    password = String(body.get("password") ?? "");
  }

  const wantsJson = contentType.includes("application/json");

  if (!isValidAcademyEmail(email)) {
    if (wantsJson) {
      return NextResponse.json(
        { error: "invalid_email", message: "Please enter a valid email address." },
        { status: 400 }
      );
    }
    return NextResponse.redirect(
      resourcesUrl(request, "?error=invalid_email")
    );
  }

  if (!isPreviewAccessEnabled()) {
    if (wantsJson) {
      return NextResponse.json(
        {
          error: "preview_not_configured",
          message: "Preview access is not set up yet. Contact support or enroll below.",
        },
        { status: 503 }
      );
    }
    return NextResponse.redirect(
      resourcesUrl(request, "?error=preview_not_configured")
    );
  }

  if (!verifyPreviewPassword(password)) {
    if (wantsJson) {
      return NextResponse.json(
        {
          error: "invalid_preview_password",
          message: "Incorrect preview password. Try again.",
        },
        { status: 401 }
      );
    }
    return NextResponse.redirect(
      resourcesUrl(request, "?error=invalid_preview_password")
    );
  }

  if (wantsJson) {
    const response = NextResponse.json({ ok: true, email });
    setAcademyAccessCookie(response, email);
    return response;
  }

  const response = NextResponse.redirect(
    resourcesUrl(request, "?unlocked=1")
  );
  setAcademyAccessCookie(response, email);
  return response;
}
