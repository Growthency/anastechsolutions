import Link from "next/link";
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { WA_LINKS, WA_BASE } from "@/lib/utils";
import { services } from "@/lib/data/services";
import { products } from "@/lib/data/products";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                <polygon points="20,2 38,34 2,34" fill="#ED1C24" opacity="0.9" />
                <polygon points="20,10 35,36 5,36" fill="#0F75BC" opacity="0.85" />
              </svg>
              <span className="font-display font-700 text-xl text-white">
                Anas<span className="text-brand-red">Tech</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Building digital futures for businesses across Bangladesh and beyond. Enterprise websites, software, mobile apps, and more.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {[
                { label: "Facebook", href: "#", svg: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /> },
                { label: "LinkedIn", href: "#", svg: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></> },
                { label: "Twitter", href: "#", svg: <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /> },
                { label: "Instagram", href: "#", svg: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></> },
              ].map(({ label, href, svg }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-brand-blue transition-colors"
                >
                  <svg className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">{svg}</svg>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Services</h3>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Products</h3>
            <ul className="space-y-2">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-semibold text-white mt-6 mb-4 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-2">
              {[
                { label: "About Us", href: "/about" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
                { label: "Support", href: "/support" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <Phone className="size-4 text-brand-blue shrink-0 mt-0.5" />
                <a href="tel:+8801743656066" className="text-white/60 hover:text-white text-sm transition-colors">
                  +880 1743-656066
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="size-4 text-brand-blue shrink-0 mt-0.5" />
                <a href="mailto:info@anastechsolutions.com" className="text-white/60 hover:text-white text-sm transition-colors">
                  info@anastechsolutions.com
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="size-4 text-brand-blue shrink-0 mt-0.5" />
                <span className="text-white/60 text-sm">Dhaka, Bangladesh</span>
              </li>
              <li className="flex gap-3">
                <MessageCircle className="size-4 text-[#25D366] shrink-0 mt-0.5" />
                <a
                  href={WA_LINKS.general}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] hover:text-white text-sm transition-colors font-medium"
                >
                  Chat on WhatsApp
                </a>
              </li>
            </ul>

            {/* WhatsApp CTA */}
            <a
              href={WA_LINKS.general}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center gap-2 bg-[#25D366] text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#128C7E] transition-colors"
            >
              <MessageCircle className="size-4" />
              Start a Project
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            &copy; {year} AnasTech Solutions. All rights reserved.
          </p>
          <p className="text-white/40 text-sm">
            Powered by <span className="text-brand-blue font-medium">AnasTech</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
