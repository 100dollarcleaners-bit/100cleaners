import { NextRequest, NextResponse } from "next/server";
import { createAcademyCheckoutSession } from "@/lib/stripe";

function validateBody(body: { customerName?: string; customerEmail?: string }) {
  if (!body.customerName?.trim() || body.customerName.trim().length < 2) {
    return "Please enter your full name";
  }
  if (!body.customerEmail?.includes("@")) {
    return "Please enter a valid email";
  }
  return null;
}

function checkoutErrorMessage(error: unknown): string {
  if (error && typeof error === "object") {
    const err = error as { message?: string; type?: string };

    if (err.message?.includes("Missing STRIPE_SECRET_KEY")) {
      return "Enrollment is not available yet. Please contact us directly.";
    }

    if (
      err.type === "StripeAuthenticationError" ||
      err.message?.includes("Invalid API Key")
    ) {
      return "Payment is not set up correctly. Please call (213) 761-4379 to enroll.";
    }

    if (err.type?.startsWith("Stripe")) {
      return "Could not start checkout. Please try again or call (213) 761-4379.";
    }
  }

  return "Unable to start checkout. Please try again.";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validationError = validateBody(body);

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const session = await createAcademyCheckoutSession({
      customerName: body.customerName.trim(),
      customerEmail: body.customerEmail.trim().toLowerCase(),
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Failed to create checkout session" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Academy checkout error:", error);
    return NextResponse.json(
      { error: checkoutErrorMessage(error) },
      { status: 500 }
    );
  }
}
