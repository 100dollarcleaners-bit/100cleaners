"use client";

import { motion } from "framer-motion";
import { Award, Shield, Clock } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const items = [
  {
    icon: Shield,
    title: "Fully Insured",
    description: "Licensed, bonded, and insured for your complete peace of mind.",
  },
  {
    icon: Clock,
    title: "Reliable",
    description: "On-time arrivals and consistent quality you can count on.",
  },
  {
    icon: Award,
    title: "Professional",
    description: "Background-checked, trained cleaners who treat your home with respect.",
  },
];

export function Trust() {
  return (
    <section className="border-y border-navy/5 bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-10 md:grid-cols-3"
        >
          {items.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeInUp}
              className="flex flex-col items-center text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cream ring-1 ring-gold/20">
                <item.icon size={28} className="text-gold-dark" />
              </div>
              <h3 className="mt-5 font-display text-xl text-navy">{item.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-navy/60">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
