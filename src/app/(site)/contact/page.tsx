import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { GradientBlob } from "@/components/effects/GradientBlob";
import { SectionDivider } from "@/components/effects/SectionDivider";
import { WA_LINKS } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with AnasTech Solutions. Chat on WhatsApp, call, or email us. We respond within 1 hour.",
};

const contactCards = [
  {
    icon: Phone,
    label: "Phone",
    value: "+880 1743-656066",
    href: "tel:+8801743656066",
    color: "#0F75BC",
    desc: "Mon–Sat, 9am–8pm BST",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@anastechsolutions.com",
    href: "mailto:info@anastechsolutions.com",
    color: "#ED1C24",
    desc: "We reply within 24 hours",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Dhaka, Bangladesh",
    href: "https://maps.google.com/?q=Dhaka,Bangladesh",
    color: "#0F75BC",
    desc: "Visit by appointment",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "9:00 AM – 8:00 PM",
    href: null,
    color: "#ED1C24",
    desc: "Saturday to Thursday",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-paper overflow-hidden">
        <GradientBlob color="blue" size="xl" className="-top-32 -right-32" opacity={0.06} />
        <GradientBlob color="red" size="md" className="top-0 left-0" opacity={0.04} />
        <div className="dot-grid absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <ScrollReveal>
            <p className="text-brand-blue text-sm font-semibold uppercase tracking-widest mb-3">Get In Touch</p>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-ink mb-5">
              Let's Build <span className="gradient-text">Together</span>
            </h1>
            <p className="text-ink-soft text-lg max-w-2xl mx-auto">
              We don't do long forms or automated responses. Chat with our team directly on WhatsApp — we respond within 1 hour, 7 days a week.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider variant="wave" color="#F7F8FB" />

      {/* Main CTA */}
      <section className="py-16 bg-paper-2">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="bg-gradient-to-br from-[#25D366]/10 to-[#128C7E]/10 border border-[#25D366]/30 rounded-3xl p-10">
              <div className="w-20 h-20 rounded-full bg-[#25D366] flex items-center justify-center mx-auto mb-6 shadow-lg">
                <MessageCircle className="size-10 text-white" />
              </div>
              <h2 className="font-display text-3xl font-bold text-ink mb-3">Chat on WhatsApp</h2>
              <p className="text-ink-soft mb-6">
                The fastest way to reach us. Tell us about your project and we'll get back to you with ideas and pricing within the hour.
              </p>
              <a
                href={WA_LINKS.general}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-button font-bold text-lg hover:bg-[#128C7E] hover:-translate-y-0.5 transition-all shadow-lg"
              >
                <MessageCircle className="size-5" />
                Open WhatsApp Chat
              </a>
              <p className="text-ink-muted text-sm mt-4">+880 1743-656066 · Available 7 days a week</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact cards */}
      <section className="section-pad bg-paper">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-ink">Other Ways to Reach Us</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactCards.map((card, i) => {
              const Icon = card.icon;
              const inner = (
                <div className="bg-paper-2 border border-border rounded-2xl p-6 text-center hover:border-brand-blue/30 hover:shadow-card hover:-translate-y-1 transition-all duration-300 h-full flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: card.color + "15" }}>
                    <Icon className="size-6" style={{ color: card.color }} />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-1">{card.label}</p>
                  <p className="font-semibold text-ink mb-1 text-sm">{card.value}</p>
                  <p className="text-ink-muted text-xs">{card.desc}</p>
                </div>
              );
              return (
                <ScrollReveal key={card.label} delay={i * 0.08}>
                  {card.href ? (
                    <a href={card.href} target={card.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block h-full">
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-20 bg-paper">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="rounded-3xl overflow-hidden border border-border shadow-card h-80 bg-paper-2 flex items-center justify-center relative">
              <div className="dot-grid absolute inset-0 opacity-50" aria-hidden="true" />
              <div className="relative z-10 text-center">
                <MapPin className="size-12 text-brand-blue mx-auto mb-3" />
                <p className="font-display font-bold text-ink text-xl">Dhaka, Bangladesh</p>
                <p className="text-ink-muted text-sm mt-1">Serving clients globally from the heart of Bangladesh</p>
                <a
                  href="https://maps.google.com/?q=Dhaka,Bangladesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 bg-brand-blue text-white px-5 py-2.5 rounded-button text-sm font-semibold hover:-translate-y-0.5 transition-all"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
