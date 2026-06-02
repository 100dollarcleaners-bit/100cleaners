import { Suspense } from "react";
import Link from "next/link";
import { BookingWizard } from "@/components/booking/BookingWizard";

export const metadata = {
  title: "Book a Clean | 100 Cleaners",
  description: "Schedule your premium home cleaning in Los Angeles.",
};

function BookingFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center text-navy/50">
      Loading booking form…
    </div>
  );
}

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-navy/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <Link href="/" className="font-display text-xl text-navy">
            100<span className="text-gold">Cleaners</span>
          </Link>
          <Link
            href="/"
            className="text-sm text-navy/60 transition-colors hover:text-gold"
          >
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Reserve Your Clean
          </p>
          <h1 className="mt-2 font-display text-3xl text-navy sm:text-4xl">
            Book your appointment
          </h1>
        </div>

        <Suspense fallback={<BookingFallback />}>
          <BookingWizard />
        </Suspense>
      </main>
    </div>
  );
}
