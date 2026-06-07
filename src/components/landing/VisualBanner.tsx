"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { siteImages } from "@/lib/images";
import { fadeInUp } from "@/lib/animations";

export function VisualBanner() {
  return (
    <section className="relative overflow-hidden py-0">
      <div className="relative min-h-[320px] md:min-h-[400px]">
        <OptimizedImage
          src={siteImages.professional.src}
          alt={siteImages.professional.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy/75" />
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-center px-6 py-20 text-center lg:px-8 md:py-28"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Los Angeles · In-home service
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl text-white sm:text-4xl md:text-5xl text-balance">
            Walk in to a home that feels brand new
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
            Trusted professionals. Premium products. Results you can see and feel
            in every room.
          </p>
          <Link
            href="/booking"
            className="mt-8 inline-flex rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-navy transition-colors hover:bg-gold-light"
          >
            Book Your Clean
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
