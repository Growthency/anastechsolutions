import Link from "next/link";
import { Home, MessageCircle, Search } from "lucide-react";
import { WA_LINKS } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Root not-found.tsx fires for URLs that don't match ANY segment in the app
// (e.g. /random-typo, /-softwareofmadrasahmanagement). Next.js does NOT
// apply (site)/layout.tsx here, so we render the Navbar + Footer directly
// to keep the chrome consistent with the rest of the site.
export default function NotFound() {
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Products", href: "/products" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="min-h-[80vh] bg-paper flex flex-col items-center justify-center px-6 py-24 relative overflow-hidden">
          {/* Background */}
          <div className="dot-grid absolute inset-0 opacity-30" aria-hidden="true" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl" aria-hidden="true" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-brand-red/5 rounded-full blur-3xl" aria-hidden="true" />

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            {/* 404 */}
            <div className="relative mb-6">
              <p className="font-mono text-[140px] lg:text-[180px] font-bold leading-none select-none">
                <span className="text-brand-blue/15">4</span>
                <span className="gradient-text">0</span>
                <span className="text-brand-red/15">4</span>
              </p>
              <div className="absolute inset-0 flex items-center justify-center">
                <Search className="size-16 text-ink-muted opacity-40" />
              </div>
            </div>

            <h1 className="font-display text-3xl lg:text-4xl font-bold text-ink mb-3">
              Page Not Found
            </h1>
            <p className="text-ink-soft text-lg mb-10">
              The page you're looking for doesn't exist or has been moved. Let's get you back on track.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-brand-blue text-white px-7 py-3.5 rounded-button font-semibold hover:bg-brand-blue-dark hover:-translate-y-0.5 transition-all shadow-blue"
              >
                <Home className="size-4" />
                Back to Home
              </Link>
              <a
                href={WA_LINKS.general}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-border text-ink-soft px-7 py-3.5 rounded-button font-semibold hover:border-brand-blue hover:text-brand-blue hover:-translate-y-0.5 transition-all"
              >
                <MessageCircle className="size-4" />
                Contact Us
              </a>
            </div>

            {/* Quick links */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-4">
                Or explore these pages
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-2 rounded-lg bg-paper-2 border border-border text-ink-soft text-sm font-medium hover:border-brand-blue hover:text-brand-blue hover:bg-brand-blue/5 transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
