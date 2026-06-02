"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const reviews = [
  {
    name: "Sarah M.",
    location: "Beverly Hills",
    text: "Absolutely flawless. Every corner sparkled. This is the only cleaning service I'll use in LA.",
    rating: 5,
  },
  {
    name: "James & Elena R.",
    location: "Santa Monica",
    text: "Professional, punctual, and thorough. They handled our home like it was their own.",
    rating: 5,
  },
  {
    name: "Michelle T.",
    location: "Pasadena",
    text: "The steam clean on our kitchen was incredible. Worth every penny for the peace of mind.",
    rating: 5,
  },
];

export function Reviews() {
  return (
    <section id="reviews" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Client Love"
          title="Trusted by LA homeowners"
          subtitle="Join hundreds of satisfied clients across Los Angeles."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-16 grid gap-8 md:grid-cols-3"
        >
          {reviews.map((review) => (
            <motion.blockquote
              key={review.name}
              variants={fadeInUp}
              className="rounded-2xl border border-navy/10 bg-white p-8 shadow-card"
            >
              <div className="flex gap-1">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-gold text-gold"
                  />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-navy/80">
                &ldquo;{review.text}&rdquo;
              </p>
              <footer className="mt-6 border-t border-navy/5 pt-4">
                <cite className="not-italic font-semibold text-navy">
                  {review.name}
                </cite>
                <p className="text-xs text-navy/50">{review.location}</p>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
