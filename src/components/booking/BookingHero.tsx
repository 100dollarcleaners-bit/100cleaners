"use client";

import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { siteImages } from "@/lib/images";

export function BookingHero() {
  return (
    <div className="relative overflow-hidden border-b border-navy/10">
      <div className="relative h-48 sm:h-56 md:h-64">
        <OptimizedImage
          src={siteImages.livingRoom.src}
          alt={siteImages.livingRoom.alt}
          fill
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Reserve Your Clean
          </p>
          <h1 className="mt-2 font-display text-3xl text-white sm:text-4xl">
            Book your appointment
          </h1>
        </div>
      </div>
    </div>
  );
}
