import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, MessageCircle, Globe, Code2, Smartphone, TrendingUp, Calculator, MessageSquare, Phone } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { GradientBlob } from "@/components/effects/GradientBlob";
import { SectionDivider } from "@/components/effects/SectionDivider";
import { Accordion } from "@/components/ui/accordion";
import { services, getServiceBySlug } from "@/lib/data/services";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  serviceSchema,
  breadcrumbSchema,
  faqPageSchema,
  SITE_URL,
} from "@/lib/seo/schemas";

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Globe, Code2, Smartphone, TrendingUp, Calculator, MessageSquare, Phone,
};

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  const canonical = `/services/${service.slug}`;
  return {
    title: service.title,
    description: service.description,
    alternates: { canonical },
    openGraph: {
      title: `${service.title} — ${service.tagline}`,
      description: service.description,
      url: canonical,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} — ${service.tagline}`,
      description: service.description,
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const Icon = iconMap[service.icon] ?? Globe;

  return (
    <>
      {/* Structured data — Service, Breadcrumb, FAQ */}
      <JsonLd
        data={serviceSchema({
          slug: service.slug,
          title: service.title,
          description: service.description,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Services", url: `${SITE_URL}/services` },
          { name: service.title, url: `${SITE_URL}/services/${service.slug}` },
        ])}
      />
      {service.faqs?.length > 0 && <JsonLd data={faqPageSchema(service.faqs)} />}

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ backgroundColor: service.bgColor }}>
        <GradientBlob color="blue" size="xl" className="-top-32 -right-32" opacity={0.08} />
        <div className="dot-grid absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <ScrollReveal>
            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-medium mb-8 hover:gap-3 transition-all" style={{ color: service.color }}>
              <ArrowLeft className="size-4" /> All Services
            </Link>
          </ScrollReveal>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: service.color }}>
                AnasTech Service
              </p>
              <h1 className="font-display text-5xl lg:text-6xl font-bold text-ink mb-4 leading-tight">
                {service.title}
              </h1>
              <p className="text-xl font-medium mb-4" style={{ color: service.color }}>{service.tagline}</p>
              <p className="text-ink-soft text-lg leading-relaxed mb-8">{service.description}</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={service.whatsappMessage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-button font-bold text-white shadow-lg hover:-translate-y-0.5 transition-all"
                  style={{ backgroundColor: service.color }}
                >
                  <MessageCircle className="size-4" /> Get Started
                </a>
                <Link href="/services" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-button font-semibold border-2 hover:-translate-y-0.5 transition-all" style={{ borderColor: service.color, color: service.color }}>
                  All Services
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15} className="hidden lg:flex justify-center">
              <div className="w-72 h-72 rounded-[40px] flex items-center justify-center shadow-xl" style={{ backgroundColor: service.color + "15", border: `2px solid ${service.color}25` }}>
                <Icon className="size-32" style={{ color: service.color, opacity: 0.8 }} />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionDivider variant="wave" color="#FFFFFF" />

      {/* Challenges + Solutions */}
      <section className="section-pad bg-paper">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10">
            <ScrollReveal>
              <div className="bg-red-50 border border-red-100 rounded-2xl p-8">
                <h2 className="font-display text-2xl font-bold text-ink mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-brand-red/10 flex items-center justify-center text-brand-red text-lg">⚠</span>
                  Challenges You Face
                </h2>
                <ul className="space-y-3">
                  {service.challenges.map((c) => (
                    <li key={c} className="flex items-start gap-3 text-ink-soft text-sm">
                      <span className="w-5 h-5 rounded-full bg-brand-red/15 text-brand-red flex items-center justify-center text-xs shrink-0 mt-0.5">✕</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="rounded-2xl p-8 border" style={{ backgroundColor: service.bgColor, borderColor: service.color + "25" }}>
                <h2 className="font-display text-2xl font-bold text-ink mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center text-lg" style={{ backgroundColor: service.color + "20", color: service.color }}>✓</span>
                  How We Solve It
                </h2>
                <ul className="space-y-3">
                  {service.solutions.map((s) => (
                    <li key={s} className="flex items-start gap-3 text-ink-soft text-sm">
                      <CheckCircle2 className="size-5 shrink-0 mt-0.5" style={{ color: service.color }} />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-pad bg-paper-2">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-ink mb-3">What's Included</h2>
            <p className="text-ink-soft">Everything you need, built in from day one.</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.features.map((f, i) => (
              <ScrollReveal key={f} delay={i * 0.06}>
                <div className="flex items-start gap-3 bg-paper rounded-xl p-4 border border-border hover:border-brand-blue/30 hover:shadow-card transition-all">
                  <CheckCircle2 className="size-5 shrink-0 mt-0.5" style={{ color: service.color }} />
                  <span className="text-ink-soft text-sm">{f}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-pad bg-paper">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-ink mb-3">Our Process</h2>
            <p className="text-ink-soft">Clear, transparent steps from kickoff to launch.</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 0.1}>
                <div className="relative">
                  {i < service.process.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 -translate-y-1/2 z-0" style={{ background: `linear-gradient(90deg, ${service.color}60, transparent)` }} />
                  )}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 font-mono text-2xl font-bold text-white shadow-md" style={{ backgroundColor: service.color }}>
                      0{step.step}
                    </div>
                    <h3 className="font-display font-bold text-ink mb-2">{step.title}</h3>
                    <p className="text-ink-soft text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="section-pad bg-paper-2">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-ink mb-3">What You Get</h2>
            <p className="text-ink-soft">Every deliverable, clearly laid out. No surprises.</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {service.deliverables.map((d, i) => (
              <ScrollReveal key={d} delay={i * 0.06}>
                <div className="flex items-center gap-3 bg-paper rounded-xl p-4 border border-border">
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold text-white shrink-0" style={{ backgroundColor: service.color }}>
                    {i + 1}
                  </span>
                  <span className="text-ink-soft text-sm font-medium">{d}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="py-12 bg-paper">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal className="text-center mb-8">
            <h2 className="font-display text-2xl font-bold text-ink">Tech Stack</h2>
          </ScrollReveal>
          <ScrollReveal className="flex flex-wrap justify-center gap-3">
            {service.techStack.map((tech) => (
              <span key={tech} className="px-4 py-2 rounded-full border font-medium text-sm" style={{ color: service.color, borderColor: service.color + "40", backgroundColor: service.bgColor }}>
                {tech}
              </span>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad bg-paper-2">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <ScrollReveal className="text-center mb-10">
            <h2 className="font-display text-4xl font-bold text-ink mb-3">Frequently Asked</h2>
          </ScrollReveal>
          <ScrollReveal>
            <div className="bg-paper rounded-2xl border border-border px-6">
              <Accordion items={service.faqs} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${service.color} 0%, ${service.color}CC 100%)` }}>
        <div className="absolute inset-0 line-grid opacity-15" aria-hidden="true" />
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal>
            <h2 className="font-display text-4xl font-bold text-white mb-4">
              Ready to Start?
            </h2>
            <p className="text-white/75 text-lg mb-8">
              Chat with our team on WhatsApp and we'll get back to you within 1 hour.
            </p>
            <a
              href={service.whatsappMessage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-ink px-8 py-4 rounded-button font-bold text-base hover:-translate-y-0.5 transition-all shadow-xl"
            >
              <MessageCircle className="size-5 text-[#25D366]" />
              Start {service.title}
            </a>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
