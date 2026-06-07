import { createClient } from "@supabase/supabase-js";
import { PENDING_HOLD_MINUTES } from "./constants";
import type { BookingRecord } from "./types";

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_SECRET_KEY;

  if (!url || !key) {
    throw new Error("Missing Supabase environment variables");
  }

  return createClient(url, key);
}

export async function getBookedSlotsForDate(date: string): Promise<string[]> {
  const supabase = getSupabaseAdmin();
  const holdCutoff = new Date(
    Date.now() - PENDING_HOLD_MINUTES * 60 * 1000
  ).toISOString();

  const { data, error } = await supabase
    .from("bookings")
    .select("booking_time, deposit_paid, created_at")
    .eq("booking_date", date);

  if (error) throw error;

  const rows = (data ?? []) as Pick<
    BookingRecord,
    "booking_time" | "deposit_paid" | "created_at"
  >[];

  return rows
    .filter(
      (row) =>
        row.deposit_paid ||
        new Date(row.created_at).toISOString() > holdCutoff
    )
    .map((row) => row.booking_time);
}

export async function createPendingBooking(
  booking: Omit<
    BookingRecord,
    | "id"
    | "deposit_paid"
    | "stripe_session_id"
    | "created_at"
    | "service_type"
  > & { service_type?: string }
): Promise<BookingRecord> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("bookings")
    .insert({
      customer_name: booking.customer_name,
      customer_email: booking.customer_email,
      customer_phone: booking.customer_phone,
      address: booking.address,
      bedroom_count: booking.bedroom_count,
      special_instructions: booking.special_instructions,
      service_type: booking.service_type ?? "standard",
      laundry_addon: booking.laundry_addon,
      booking_date: booking.booking_date,
      booking_time: booking.booking_time,
      deposit_paid: false,
    })
    .select()
    .single();

  if (error) throw error;
  return data as BookingRecord;
}

export async function updateBookingStripeSession(
  bookingId: string,
  stripeSessionId: string
) {
  const supabase = getSupabaseAdmin();

  const { error } = await supabase
    .from("bookings")
    .update({ stripe_session_id: stripeSessionId })
    .eq("id", bookingId);

  if (error) throw error;
}

export async function confirmBookingDeposit(
  stripeSessionId: string
): Promise<BookingRecord | null> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("bookings")
    .update({ deposit_paid: true })
    .eq("stripe_session_id", stripeSessionId)
    .select()
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }

  return data as BookingRecord;
}

export async function getBookingById(id: string): Promise<BookingRecord | null> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }

  return data as BookingRecord;
}
