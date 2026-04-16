"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { WA_LINKS } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrolled
            ? "glass border-b border-border/50 shadow-sm"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0" aria-label="AnasTech Solutions Home">
            <div className="flex items-center gap-2">
              {/* Logo mark */}
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="20,2 38,34 2,34" fill="#ED1C24" opacity="0.9" />
                <polygon points="20,10 35,36 5,36" fill="#0F75BC" opacity="0.85" />
              </svg>
              <span className="font-display font-700 text-xl text-ink tracking-tight">
                Anas<span className="text-brand-red">Tech</span>
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "text-brand-blue bg-brand-blue/8"
                      : "text-ink-soft hover:text-brand-blue hover:bg-paper-2"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={WA_LINKS.general}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-red text-white px-5 py-2.5 rounded-button text-sm font-semibold hover:bg-brand-red-dark transition-colors shadow-red"
            >
              <MessageCircle className="size-4" />
              WhatsApp Us
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg text-ink-soft hover:bg-paper-2 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-50 bg-paper flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 h-16 border-b border-border">
              <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
                  <polygon points="20,2 38,34 2,34" fill="#ED1C24" opacity="0.9" />
                  <polygon points="20,10 35,36 5,36" fill="#0F75BC" opacity="0.85" />
                </svg>
                <span className="font-display font-700 text-xl text-ink">
                  Anas<span className="text-brand-red">Tech</span>
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg text-ink-soft hover:bg-paper-2"
                aria-label="Close menu"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Links */}
            <motion.ul
              className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-2"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
            >
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
                  }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "block px-4 py-3 rounded-xl text-lg font-semibold transition-colors",
                      pathname === link.href
                        ? "text-brand-blue bg-brand-blue/8"
                        : "text-ink hover:text-brand-blue hover:bg-paper-2"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            {/* CTA */}
            <div className="px-6 pb-8">
              <a
                href={WA_LINKS.general}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-brand-red text-white px-6 py-4 rounded-xl text-base font-semibold hover:bg-brand-red-dark transition-colors w-full"
              >
                <MessageCircle className="size-5" />
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
