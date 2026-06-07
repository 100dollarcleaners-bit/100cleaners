"use client";

import { motion } from "framer-motion";
import { Calendar, CreditCard, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { siteImages } from "@/lib/images";
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
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/5] overflow-hidden rounded-2xl lg:aspect-[3/4]"
          >
            <OptimizedImage
              src={siteImages.kitchen.src}
              alt={siteImages.kitchen.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
          </motion.div>

          <div className="text-left [&_h2]:text-left [&_p]:mx-0">
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
              className="mt-12 space-y-6"
            >
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  variants={fadeInUp}
                  className="flex gap-5 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-bold text-navy">
                    {index + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-3">
                      <step.icon size={20} className="text-gold" />
                      <h3 className="font-display text-xl text-white">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
