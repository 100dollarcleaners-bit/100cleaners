import { Instagram, Mail, Phone } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const phone = process.env.NEXT_PUBLIC_BUSINESS_PHONE ?? "(213) 761-4379";
  const email =
    process.env.NEXT_PUBLIC_BUSINESS_EMAIL ?? "100dollarcleaners@gmail.com";
  const instagram =
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://instagram.com/100cleaners";

  return (
    <footer id="contact" className="bg-navy-dark text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl font-medium">
              100<span className="text-gold">Cleaners</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Premium home cleaning for Los Angeles homeowners. Spotless
              results, every time.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-gold" />
                <a href={`tel:${phone.replace(/\D/g, "")}`} className="hover:text-gold">
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-gold" />
                <a href={`mailto:${email}`} className="hover:text-gold">
                  {email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Instagram size={16} className="text-gold" />
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold"
                >
                  @100cleaners
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li>
                <Link href="/booking" className="hover:text-gold">
                  Book a Clean
                </Link>
              </li>
              <li>
                <Link href="/forms" className="hover:text-gold">
                  Client Forms
                </Link>
              </li>
              <li>
                <a href="#services" className="hover:text-gold">
                  Services
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-gold">
                  How It Works
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-white/40">
          © {new Date().getFullYear()} 100 Cleaners. Los Angeles, CA. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
