import { allAgreementsAccepted } from "@/lib/agreements";
import { NextRequest, NextResponse } from "next/server";
import { TIME_SLOTS } from "@/lib/constants";
import { createDepositCheckoutSession } from "@/lib/stripe";
import {
  createPendingBooking,
  getBookedSlotsForDate,
  updateBookingStripeSession,
} from "@/lib/supabase";
import type { BookingFormData } from "@/lib/types";

function checkoutErrorMessage(error: unknown): string {
  if (error && typeof error === "object") {
    const err = error as { message?: string; code?: string; type?: string };

    if (err.message?.includes("Missing STRIPE_SECRET_KEY")) {
      return "Payment is not configured yet. Please contact us to complete your booking.";
    }
    if (err.message?.includes("Invalid NEXT_PUBLIC_SUPABASE_URL")) {
      return "Booking system is temporarily unavailable. Please call us to complete your deposit.";
    }
    if (err.message?.includes("Missing Supabase")) {
      return "Booking system is temporarily unavailable. Please call us to complete your deposit.";
    }

    // Supabase / PostgREST
    if (err.code && err.message) {
      if (
        err.code === "PGRST204" ||
        err.message.includes("column") ||
        err.message.includes("Could not find")
      ) {
        return "Our booking database needs a quick update. Please call (213) 761-4379 to complete your deposit.";
      }
      console.error("Supabase checkout error:", err.code, err.message);
    }

    // Stripe
    if (err.type?.startsWith("Stripe")) {
      console.error("Stripe checkout error:", err.type, err.message);
      if (err.message?.includes("api_key")) {
        return "Payment is not configured correctly. Please call (213) 761-4379 to book.";
      }
      return "Could not start payment. Please try again or call (213) 761-4379.";
    }

    if (err.message) {
      console.error("Checkout error:", err.message);
    }
  }

  return "Unable to start checkout. Please try again or call (213) 761-4379.";
}

function validateBody(body: BookingFormData): string | null {
  if (!body.serviceType || !["standard", "deep"].includes(body.serviceType))
    return "Please select a service";
  if (!body.address?.trim()) return "Address is required";
  if (body.bedroomCount < 1 || body.bedroomCount > 3)
    return "Bedroom count must be 1–3";
  if (!body.bookingDate) return "Booking date is required";
  if (!body.bookingTime) return "Booking time is required";
  if (!TIME_SLOTS.some((s) => s.value === body.bookingTime))
    return "Invalid time slot";
  if (!body.customerName?.trim()) return "Name is required";
  if (!body.customerEmail?.includes("@")) return "Valid email is required";
  if (body.customerPhone.replace(/\D/g, "").length < 10)
    return "Valid phone is required";
  if (!body.agreements || !allAgreementsAccepted(body.agreements))
    return "You must read and accept all agreements to continue";
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as BookingFormData;
    const validationError = validateBody(body);

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const booked = await getBookedSlotsForDate(body.bookingDate);
    if (booked.includes(body.bookingTime)) {
      return NextResponse.json(
        { error: "This time slot is no longer available. Please choose another." },
        { status: 409 }
      );
    }

    const booking = await createPendingBooking({
      customer_name: body.customerName.trim(),
      customer_email: body.customerEmail.trim().toLowerCase(),
      customer_phone: body.customerPhone.trim(),
      address: body.address.trim(),
      bedroom_count: body.bedroomCount,
      special_instructions: body.specialInstructions?.trim() || null,
      laundry_addon: body.laundryAddon,
      service_type: body.serviceType,
      booking_date: body.bookingDate,
      booking_time: body.bookingTime,
    });

    const session = await createDepositCheckoutSession({
      bookingId: booking.id,
      customerEmail: booking.customer_email,
      customerName: booking.customer_name,
    });

    await updateBookingStripeSession(booking.id, session.id);

    if (!session.url) {
      return NextResponse.json(
        { error: "Failed to create checkout session" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url, bookingId: booking.id });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: checkoutErrorMessage(error) },
      { status: 500 }
    );
  }
}
