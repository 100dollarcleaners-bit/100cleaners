"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Download, FileText } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { clientForms } from "@/lib/forms";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function ClientForms() {
  return (
    <section id="forms" className="border-t border-navy/5 bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Client Forms"
          title="Download, sign & return"
          subtitle="Review and complete these forms before your first clean. Print, sign, and bring them on service day — or email a photo to 100dollarcleaners@gmail.com."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-16 grid gap-6 sm:grid-cols-2"
        >
          {clientForms.map((form) => (
            <motion.article
              key={form.slug}
              variants={fadeInUp}
              className="group flex flex-col rounded-2xl border border-navy/10 bg-cream/50 p-8 transition-shadow hover:shadow-card"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15">
                <FileText size={22} className="text-gold-dark" />
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.15em] text-gold-dark">
                {form.summary}
              </p>
              <h3 className="mt-2 font-display text-xl text-navy">
                {form.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-navy/60">
                {form.description}
              </p>
              <Link
                href={`/forms/${form.slug}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors group-hover:text-gold-dark"
              >
                <Download size={16} />
                Open & download form
              </Link>
            </motion.article>
          ))}
        </motion.div>

        <p className="mt-10 text-center text-sm text-navy/50">
          Questions about a form?{" "}
          <a
            href="mailto:100dollarcleaners@gmail.com"
            className="font-medium text-gold-dark hover:underline"
          >
            Email us
          </a>{" "}
          or call{" "}
          <a href="tel:2137614379" className="font-medium text-gold-dark hover:underline">
            (213) 761-4379
          </a>
        </p>
      </div>
    </section>
  );
}
