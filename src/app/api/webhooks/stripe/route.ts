import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { sendBookingConfirmationEmails } from "@/lib/email";
import { getStripe } from "@/lib/stripe";
import { confirmBookingDeposit } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Webhook not configured" },
      { status: 400 }
    );
  }

  const stripe = getStripe();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.payment_status === "paid" && session.id) {
      try {
        const booking = await confirmBookingDeposit(session.id);

        if (booking) {
          try {
            await sendBookingConfirmationEmails(booking);
          } catch (emailErr) {
            console.error("Email send failed:", emailErr);
          }
        }
      } catch (dbErr) {
        console.error("Booking confirmation failed:", dbErr);
        return NextResponse.json(
          { error: "Database update failed" },
          { status: 500 }
        );
      }
    }
  }

  return NextResponse.json({ received: true });
}
