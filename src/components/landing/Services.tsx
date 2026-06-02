"use client";

import { motion } from "framer-motion";
import { Check, Shirt } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BASE_PRICE, LAUNDRY_ADDON_PRICE } from "@/lib/constants";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const standardIncludes = [
  "Deep clean throughout",
  "Steam clean surfaces",
  "Dusting & polishing",
  "Mopping & vacuuming",
  "Trash removal",
  "Dishes washed",
  "Cabinet wipe-down",
];

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
          className="mt-16 grid gap-8 md:grid-cols-2"
        >
          <motion.article
            variants={fadeInUp}
            className="relative overflow-hidden rounded-2xl border border-navy/10 bg-white p-8 shadow-card md:p-10"
          >
            <div className="absolute right-0 top-0 h-32 w-32 bg-gradient-to-bl from-gold/10 to-transparent" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Most Popular
            </p>
            <h3 className="mt-2 font-display text-3xl text-navy">Standard Clean</h3>
            <p className="mt-2 text-navy/60">Up to 3 bedrooms</p>
            <p className="mt-6 font-display text-5xl text-navy">
              ${BASE_PRICE}
            </p>

            <ul className="mt-8 space-y-3">
              {standardIncludes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-navy/80">
                  <Check size={18} className="mt-0.5 shrink-0 text-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.article>

          <motion.article
            variants={fadeInUp}
            className="relative overflow-hidden rounded-2xl border border-gold/30 bg-navy p-8 text-white shadow-premium md:p-10"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/20">
              <Shirt size={24} className="text-gold" />
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Add-on
            </p>
            <h3 className="mt-2 font-display text-3xl">Laundry Service</h3>
            <p className="mt-2 text-white/60">
              Wash, dry, and fold — handled with care
            </p>
            <p className="mt-6 font-display text-5xl text-gold">
              +${LAUNDRY_ADDON_PRICE}
            </p>
            <p className="mt-6 text-sm leading-relaxed text-white/70">
              Add laundry to any Standard Clean. We collect, wash, dry, fold,
              and return everything to its place — hotel-quality results for your
              home.
            </p>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}
