import { Suspense } from "react";
import Link from "next/link";
import { BookingHero } from "@/components/booking/BookingHero";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { BRAND_NAME } from "@/lib/constants";

export const metadata = {
  title: `Book a Clean | ${BRAND_NAME}`,
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
            <BrandLogo />
          </Link>
          <Link
            href="/"
            className="text-sm text-navy/60 transition-colors hover:text-gold"
          >
            ← Back to home
          </Link>
        </div>
      </header>

      <BookingHero />

      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <Suspense fallback={<BookingFallback />}>
          <BookingWizard />
        </Suspense>
      </main>
    </div>
  );
}
