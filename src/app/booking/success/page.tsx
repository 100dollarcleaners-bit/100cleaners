import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { getStripe } from "@/lib/stripe";
import { getBookingById } from "@/lib/supabase";
import { getBookingServiceTotal } from "@/lib/booking-utils";
import { TIME_SLOTS } from "@/lib/constants";

interface Props {
  searchParams: { session_id?: string };
}

export default async function BookingSuccessPage({ searchParams }: Props) {
  const sessionId = searchParams.session_id;
  let confirmed = false;
  let summary: {
    name: string;
    date: string;
    time: string;
    total: number;
  } | null = null;

  if (sessionId) {
    try {
      const stripe = getStripe();
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      const bookingId = session.metadata?.booking_id;

      if (session.payment_status === "paid" && bookingId) {
        const booking = await getBookingById(bookingId);
        if (booking?.deposit_paid) {
          confirmed = true;
          const timeLabel =
            TIME_SLOTS.find((s) => s.value === booking.booking_time)?.label ??
            booking.booking_time;
          const total = getBookingServiceTotal(booking);

          summary = {
            name: booking.customer_name,
            date: new Date(booking.booking_date + "T12:00:00").toLocaleDateString(
              "en-US",
              { weekday: "long", month: "long", day: "numeric", year: "numeric" }
            ),
            time: timeLabel,
            total,
          };
        }
      }
    } catch {
      // Show generic success if Stripe lookup fails but payment likely went through
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-6">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold/20">
          <CheckCircle size={40} className="text-gold-dark" />
        </div>

        <h1 className="mt-8 font-display text-3xl text-navy">
          {confirmed ? "You're all set!" : "Thank you!"}
        </h1>

        <p className="mt-4 text-navy/60">
          {confirmed && summary ? (
            <>
              {summary.name}, your ${25} deposit has been received. We&apos;ll see
              you on <strong className="text-navy">{summary.date}</strong> during{" "}
              <strong className="text-navy">{summary.time}</strong>. A confirmation
              email is on its way.
            </>
          ) : (
            <>
              Your payment is being processed. You&apos;ll receive a confirmation
              email shortly.
            </>
          )}
        </p>

        {summary && (
          <p className="mt-4 text-sm text-navy/50">
            Service total: ${summary.total} (balance due on the day of your clean)
          </p>
        )}

        <Link
          href="/"
          className="mt-10 inline-flex rounded-full bg-navy px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-light"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
