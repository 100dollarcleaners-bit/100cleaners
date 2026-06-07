"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { reviewImages } from "@/lib/images";
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
  {
    name: "David L.",
    location: "Silver Lake",
    text: "Booked online in minutes. The team showed up on time and our place has never looked better.",
    rating: 5,
  },
  {
    name: "Priya K.",
    location: "West Hollywood",
    text: "I added laundry service and everything came back folded perfectly. True white-glove care.",
    rating: 5,
  },
  {
    name: "Robert & Ana G.",
    location: "Manhattan Beach",
    text: "We use 100 Cleaners monthly. Consistent quality every single visit — highly recommend.",
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
          className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {reviews.map((review, index) => (
            <motion.blockquote
              key={review.name}
              variants={fadeInUp}
              className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-card"
            >
              <div className="relative aspect-[16/10] w-full">
                <OptimizedImage
                  src={reviewImages[index].src}
                  alt={reviewImages[index].alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-8">
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
              </div>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
