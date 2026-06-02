"use client";

import { motion } from "framer-motion";
import { Calendar, CreditCard, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const steps = [
  {
    icon: Calendar,
    title: "Book",
    description:
      "Choose your service, pick a date and 3-hour time window, and tell us about your home.",
  },
  {
    icon: CreditCard,
    title: "Pay Deposit",
    description:
      "Secure your appointment with a $25 deposit. The remaining balance is due on the day of service.",
  },
  {
    icon: Sparkles,
    title: "We Clean",
    description:
      "Our professional team arrives on time and leaves your home spotless — guaranteed.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-navy py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          light
          eyebrow="Simple Process"
          title="How it works"
          subtitle="Three effortless steps to a cleaner home."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-16 grid gap-8 md:grid-cols-3"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={fadeInUp}
              className="relative rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm"
            >
              <span className="absolute -top-3 left-8 rounded-full bg-gold px-3 py-0.5 text-xs font-bold text-navy">
                {index + 1}
              </span>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/20">
                <step.icon size={28} className="text-gold" />
              </div>
              <h3 className="mt-6 font-display text-2xl text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
