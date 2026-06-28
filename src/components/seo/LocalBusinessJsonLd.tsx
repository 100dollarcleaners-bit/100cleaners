import { SITE_URL } from "@/lib/site-metadata";
import { BRAND_NAME } from "@/lib/constants";

export function LocalBusinessJsonLd() {
  const phone =
    process.env.NEXT_PUBLIC_BUSINESS_PHONE?.replace(/\D/g, "") ?? "2137614379";
  const email =
    process.env.NEXT_PUBLIC_BUSINESS_EMAIL ?? "100dollarcleaners@gmail.com";

  const schema = {
    "@context": "https://schema.org",
    "@type": "HousekeepingService",
    name: BRAND_NAME,
    description:
      "Premium LA cleaners offering residential standard and deep home cleaning across Los Angeles.",
    url: SITE_URL,
    telephone: `+1${phone}`,
    email,
    areaServed: {
      "@type": "City",
      name: "Los Angeles",
      containedInPlace: {
        "@type": "State",
        name: "California",
      },
    },
    serviceType: ["House Cleaning", "Deep Cleaning", "Residential Cleaning"],
    priceRange: "$$",
    image: `${SITE_URL}/academy/flyer.png`,
    sameAs: process.env.NEXT_PUBLIC_INSTAGRAM_URL
      ? [process.env.NEXT_PUBLIC_INSTAGRAM_URL]
      : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
