"use client";

import { motion } from "framer-motion";
import { Check, Shirt, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import {
  deepCleanIncludes,
  DEEP_CLEAN_PRICE,
  LAUNDRY_ADDON_PRICE,
  standardIncludes,
  STANDARD_PRICE,
} from "@/lib/constants";
import { siteImages } from "@/lib/images";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import Link from "next/link";

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Services"
          title="Exceptional care, transparent pricing"
          subtitle="Every clean is performed by trained professionals using premium products and proven techniques."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-16 grid gap-8 lg:grid-cols-3"
        >
          <motion.article
            variants={fadeInUp}
            className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-card"
          >
            <div className="relative aspect-[16/10] w-full">
              <OptimizedImage
                src={siteImages.standardClean.src}
                alt={siteImages.standardClean.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>
            <div className="p-8 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Most Popular
              </p>
              <h3 className="mt-2 font-display text-2xl text-navy">
                Standard Clean
              </h3>
              <p className="mt-2 text-navy/60">Up to 3 bedrooms</p>
              <p className="mt-6 font-display text-4xl text-navy">
                ${STANDARD_PRICE}
              </p>
              <ul className="mt-6 space-y-2.5">
                {standardIncludes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-navy/80"
                  >
                    <Check size={16} className="mt-0.5 shrink-0 text-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>

          <motion.article
            variants={fadeInUp}
            className="overflow-hidden rounded-2xl border border-gold/30 bg-navy shadow-premium"
          >
            <div className="relative aspect-[16/10] w-full">
              <OptimizedImage
                src={siteImages.deepClean.src}
                alt={siteImages.deepClean.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-navy/30" />
            </div>
            <div className="p-8 text-white md:p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/20">
                <Sparkles size={24} className="text-gold" />
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Premium
              </p>
              <h3 className="mt-2 font-display text-2xl">Deep Clean</h3>
              <p className="mt-2 text-white/60">Up to 3 bedrooms · intensive</p>
              <p className="mt-6 font-display text-4xl text-gold">
                ${DEEP_CLEAN_PRICE}
              </p>
              <ul className="mt-6 space-y-2.5">
                {deepCleanIncludes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-white/80"
                  >
                    <Check size={16} className="mt-0.5 shrink-0 text-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>

          <motion.article
            variants={fadeInUp}
            className="overflow-hidden rounded-2xl border border-navy/10 bg-cream shadow-card lg:col-span-1"
          >
            <div className="relative aspect-[16/10] w-full">
              <OptimizedImage
                src={siteImages.laundry.src}
                alt={siteImages.laundry.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>
            <div className="p-8 md:p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15">
                <Shirt size={24} className="text-gold-dark" />
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
                Add-on
              </p>
              <h3 className="mt-2 font-display text-2xl text-navy">
                Laundry Service
              </h3>
              <p className="mt-2 text-navy/60">Wash, dry & fold</p>
              <p className="mt-6 font-display text-4xl text-gold-dark">
                +${LAUNDRY_ADDON_PRICE}
              </p>
              <p className="mt-6 text-sm leading-relaxed text-navy/70">
                Add to any Standard or Deep Clean. We collect, wash, dry, fold,
                and return everything to its place.
              </p>
              <Link
                href="/booking"
                className="mt-6 inline-flex text-sm font-semibold text-navy hover:text-gold-dark"
              >
                Book with laundry →
              </Link>
            </div>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}
