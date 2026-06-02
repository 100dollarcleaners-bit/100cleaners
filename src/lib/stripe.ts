import Stripe from "stripe";
import { DEPOSIT_AMOUNT } from "./constants";

let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeInstance) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("Missing STRIPE_SECRET_KEY");
    stripeInstance = new Stripe(key, { apiVersion: "2025-02-24.acacia" });
  }
  return stripeInstance;
}

export async function createDepositCheckoutSession(params: {
  bookingId: string;
  customerEmail: string;
  customerName: string;
}) {
  const stripe = getStripe();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: params.customerEmail,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Cleaning Service Deposit",
            description:
              "$25 deposit to confirm your 100 Cleaners appointment",
          },
          unit_amount: DEPOSIT_AMOUNT * 100,
        },
        quantity: 1,
      },
    ],
    metadata: {
      booking_id: params.bookingId,
    },
    success_url: `${appUrl}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/booking?cancelled=1`,
  });

  return session;
}
