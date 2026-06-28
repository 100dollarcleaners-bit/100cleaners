import type { Metadata } from "next";
import { ACADEMY_COURSE_NAME, ACADEMY_LAUNCH_PRICE } from "@/lib/academy";
import { totalDownloadCount } from "@/lib/academy-downloads";
import { BRAND_NAME } from "@/lib/constants";

export const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ??
  "https://www.100cleaner.com";

export const SITE_NAME = BRAND_NAME;

/** Shared local SEO terms for Los Angeles cleaning searches */
export const LA_CLEANERS_KEYWORDS = [
  "LA cleaners",
  "Los Angeles cleaners",
  "house cleaners Los Angeles",
  "home cleaning service LA",
  "residential cleaners Los Angeles",
  "maid service Los Angeles",
  "deep cleaning Los Angeles",
  "premium cleaners LA",
  "100% Cleaner",
] as const;

export const DEFAULT_DESCRIPTION =
  "LA cleaners you can trust — premium home cleaning across Los Angeles. Standard cleans from $150, deep cleans from $300. Book online with a $25 deposit. Insured, detail-focused residential service.";

export const ACADEMY_DESCRIPTION = `Built by LA cleaners for aspiring cleaning business owners. ${ACADEMY_COURSE_NAME} teaches you to start and scale a profitable residential cleaning company with ${totalDownloadCount}+ SOPs, checklists, pricing tools, and hiring systems. Launch special $${ACADEMY_LAUNCH_PRICE}, lifetime access.`;

const OG_IMAGE = "/academy/flyer.png";

type PageMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  ogImage?: string;
  ogImageAlt?: string;
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path = "",
  keywords = [],
  ogImage = OG_IMAGE,
  ogImageAlt,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const url = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  return {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: ogImageAlt ?? title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export const homeMetadata = createPageMetadata({
  title: "LA Cleaners — Premium Home Cleaning in Los Angeles",
  description: DEFAULT_DESCRIPTION,
  path: "/",
  keywords: [...LA_CLEANERS_KEYWORDS],
  ogImageAlt: "100% Cleaner — premium LA home cleaning service",
});

export const bookingMetadata = createPageMetadata({
  title: "Book LA Cleaners Online",
  description:
    "Book trusted LA cleaners for your home. Standard or deep clean, flexible scheduling across Los Angeles. Secure your appointment with a $25 deposit.",
  path: "/booking",
  keywords: [
    ...LA_CLEANERS_KEYWORDS,
    "book cleaners online Los Angeles",
    "schedule house cleaning LA",
  ],
});

export const academyMetadata = createPageMetadata({
  title: `${ACADEMY_COURSE_NAME} — LA Cleaning Business Course`,
  description: ACADEMY_DESCRIPTION,
  path: "/academy",
  keywords: [
    "LA cleaning business",
    "start cleaning company Los Angeles",
    "cleaning business course",
    "cleaning business SOPs",
    "how to scale a cleaning business",
    "cleaning CEO training",
    ACADEMY_COURSE_NAME,
  ],
  ogImageAlt: `${ACADEMY_COURSE_NAME} — LA cleaning business training`,
});

export const academyResourcesMetadata = createPageMetadata({
  title: `Course Materials | ${ACADEMY_COURSE_NAME}`,
  description: `Download ${totalDownloadCount} cleaning business templates, SOPs, checklists, and spreadsheets from ${ACADEMY_COURSE_NAME}.`,
  path: "/academy/resources",
  noIndex: true,
});

export const academySuccessMetadata = createPageMetadata({
  title: "Enrollment Confirmed",
  description: `Welcome to ${ACADEMY_COURSE_NAME}. Access your course materials and start building your cleaning business.`,
  path: "/academy/success",
  noIndex: true,
});

export const bookingSuccessMetadata = createPageMetadata({
  title: "Booking Confirmed",
  description: "Your cleaning appointment is confirmed. We will see you soon.",
  path: "/booking/success",
  noIndex: true,
});
