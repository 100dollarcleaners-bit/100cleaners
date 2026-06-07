import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { BRAND_NAME } from "@/lib/constants";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${BRAND_NAME} | Premium Home Cleaning in Los Angeles`,
  description:
    "Luxury home cleaning for LA homeowners. Standard cleans from $150. Book online with a $25 deposit.",
  openGraph: {
    title: BRAND_NAME,
    description: "Premium home cleaning in Los Angeles",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
