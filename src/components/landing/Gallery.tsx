"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { galleryImages } from "@/lib/images";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function Gallery() {
  return (
    <section id="gallery" className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Work"
          title="Spaces we transform"
          subtitle="Every room finished to a hotel-standard shine — living areas, kitchens, baths, and more."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:gap-5"
        >
          {galleryImages.map((item, index) => (
            <motion.figure
              key={item.src}
              variants={fadeInUp}
              className={`group relative overflow-hidden rounded-2xl ${
                index === 0 ? "col-span-2 row-span-2 aspect-[4/3] md:aspect-auto md:min-h-[420px]" : "aspect-[4/5] md:aspect-[3/4]"
              }`}
            >
              <OptimizedImage
                src={item.src}
                alt={item.alt}
                fill
                sizes={
                  index === 0
                    ? "(max-width: 768px) 100vw, 50vw"
                    : "(max-width: 768px) 50vw, 33vw"
                }
                className="transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold">
                  {item.caption}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
