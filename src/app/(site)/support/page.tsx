import type { Metadata } from "next";
import { MessageCircle, Heart, BarChart3, Stethoscope, Zap, Clock, Phone } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { GradientBlob } from "@/components/effects/GradientBlob";
import { SectionDivider } from "@/components/effects/SectionDivider";
import { Accordion } from "@/components/ui/accordion";
import { products } from "@/lib/data/products";
import { WA_LINKS, waLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Customer Support",
  description: "Get support for AnasTech products — Khdimatul Ummah, eBusiness, Hospital Care, and Bulk SMS Platform. WhatsApp support available 7 days a week.",
  alternates: { canonical: "/support" },
};

const productIconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Heart, BarChart3, Stethoscope, Zap,
};

const generalFaqs = [
  { q: "What are your support hours?", a: "Our WhatsApp support is available Saturday through Thursday, 9:00 AM to 10:00 PM BST. For critical issues, we have an emergency line available 24/7." },
  { q: "How quickly do you respond?", a: "We respond to WhatsApp messages within 30 minutes during business hours. For email, expect a response within 4 hours." },
  { q: "Do you offer on-site support?", a: "Yes. For Hospital Care and eBusiness enterprise clients, we offer on-site training and support visits in Dhaka. Contact us to schedule." },
  { q: "Is there a maintenance contract?", a: "Yes. All our software products come with a 3-month free support period. After that, affordable annual maintenance contracts are available." },
  { q: "Can I request new features?", a: "Absolutely. We actively take feature requests from existing clients. Major features are prioritized on our roadmap and some are included in maintenance plans." },
];

export default function SupportPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-paper overflow-hidden">
        <GradientBlob color="blue" size="xl" className="-top-32 -right-32" opacity={0.05} />
        <div className="dot-grid absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <ScrollReveal>
            <p className="text-brand-blue text-sm font-semibold uppercase tracking-widest mb-3">Support Center</p>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-ink mb-5">
              We're Here to <span className="gradient-text">Help</span>
            </h1>
            <p className="text-ink-soft text-lg max-w-2xl mx-auto">
              Get support for any AnasTech product or service. Our team is available on WhatsApp 7 days a week — fast, friendly, and always on your side.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider variant="wave" color="#F7F8FB" />

      {/* Main WhatsApp CTA */}
      <section className="py-14 bg-paper-2">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="bg-white border border-[#25D366]/30 rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-6 shadow-card">
              <div className="w-16 h-16 rounded-2xl bg-[#25D366] flex items-center justify-center shrink-0">
                <MessageCircle className="size-8 text-white" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="font-display text-xl font-bold text-ink mb-1">Get Support on WhatsApp</h2>
                <p className="text-ink-soft text-sm">The fastest way. Average response time: under 30 minutes.</p>
              </div>
              <a
                href={WA_LINKS.support}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-button font-semibold hover:bg-[#128C7E] hover:-translate-y-0.5 transition-all"
              >
                <MessageCircle className="size-4" /> Chat Now
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Product support cards */}
      <section className="section-pad bg-paper">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-ink mb-3">Product Support</h2>
            <p className="text-ink-soft">Select your product to get specific support with pre-filled context.</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((product, i) => {
              const Icon = productIconMap[product.icon] ?? Zap;
              const supportLink = waLink(`Hi AnasTech, I need support with ${product.title}`);
              return (
                <ScrollReveal key={product.slug} delay={i * 0.08}>
                  <a
                    href={supportLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center text-center bg-paper-2 border border-border rounded-2xl p-7 hover:border-brand-blue/30 hover:shadow-card hover:-translate-y-1 transition-all duration-300"
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: product.bgColor }}
                    >
                      <Icon className="size-7" style={{ color: product.color }} />
                    </div>
                    <h3 className="font-display font-bold text-ink mb-1">{product.title}</h3>
                    <p className="text-ink-muted text-xs mb-4">{product.tagline}</p>
                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#25D366] bg-[#25D366]/10 rounded-full px-3 py-1.5">
                      <MessageCircle className="size-3" /> Get Support
                    </span>
                  </a>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Support info */}
      <section className="py-16 bg-paper-2">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { icon: Clock, title: "Response Time", value: "< 30 mins", desc: "During business hours on WhatsApp", color: "#0F75BC" },
              { icon: Phone, title: "Emergency Line", value: "24/7 Available", desc: "For critical production issues", color: "#ED1C24" },
              { icon: MessageCircle, title: "Support Channels", value: "WhatsApp + Email", desc: "Choose what works best for you", color: "#0F75BC" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.title} delay={i * 0.1}>
                  <div className="bg-paper border border-border rounded-2xl p-6 flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: item.color + "15" }}>
                      <Icon className="size-5" style={{ color: item.color }} />
                    </div>
                    <div>
                      <p className="text-xs text-ink-muted font-medium uppercase tracking-wider mb-0.5">{item.title}</p>
                      <p className="font-display font-bold text-ink mb-0.5">{item.value}</p>
                      <p className="text-ink-muted text-xs">{item.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* General FAQ */}
      <section className="section-pad bg-paper">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <ScrollReveal className="text-center mb-10">
            <h2 className="font-display text-4xl font-bold text-ink mb-3">General FAQs</h2>
          </ScrollReveal>
          <ScrollReveal>
            <div className="bg-paper-2 rounded-2xl border border-border px-6">
              <Accordion items={generalFaqs} />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
