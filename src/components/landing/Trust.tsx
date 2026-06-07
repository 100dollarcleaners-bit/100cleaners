"use client";

import { motion } from "framer-motion";
import { Award, Shield, Clock } from "lucide-react";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { siteImages } from "@/lib/images";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const items = [
  {
    icon: Shield,
    title: "Fully Insured",
    description:
      "Licensed, bonded, and insured for your complete peace of mind.",
  },
  {
    icon: Clock,
    title: "Reliable",
    description:
      "On-time arrivals and consistent quality you can count on.",
  },
  {
    icon: Award,
    title: "Professional",
    description:
      "Background-checked, trained cleaners who treat your home with respect.",
  },
];

export function Trust() {
  return (
    <section className="border-y border-navy/5 bg-white">
      <div className="grid lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative min-h-[280px] lg:min-h-[480px]"
        >
          <OptimizedImage
            src={siteImages.bedroom.src}
            alt={siteImages.bedroom.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>

        <div className="px-6 py-16 lg:px-12 lg:py-20">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-10 sm:grid-cols-3 lg:grid-cols-1 lg:gap-12"
          >
            {items.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                className="flex flex-col sm:items-center sm:text-center lg:items-start lg:text-left"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cream ring-1 ring-gold/20">
                  <item.icon size={26} className="text-gold-dark" />
                </div>
                <h3 className="mt-4 font-display text-xl text-navy">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-navy/60">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
