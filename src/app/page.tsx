import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Gallery } from "@/components/landing/Gallery";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Reviews } from "@/components/landing/Reviews";
import { Services } from "@/components/landing/Services";
import { Trust } from "@/components/landing/Trust";
import { VisualBanner } from "@/components/landing/VisualBanner";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { homeMetadata } from "@/lib/site-metadata";

export const metadata = homeMetadata;

export default function HomePage() {
  return (
    <>
      <LocalBusinessJsonLd />
      <Header />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <HowItWorks />
        <VisualBanner />
        <Trust />
        <Reviews />
      </main>
      <Footer />
    </>
  );
}
