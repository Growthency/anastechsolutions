import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Globe, Code2, Smartphone, TrendingUp, Calculator, MessageSquare, Phone, CheckCircle2 } from "lucide-react";
import { ScrollReveal, StaggerReveal } from "@/components/effects/ScrollReveal";
import { GradientBlob } from "@/components/effects/GradientBlob";
import { SectionDivider } from "@/components/effects/SectionDivider";
import { CtaBand } from "@/components/sections/CtaBand";
import { services } from "@/lib/data/services";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Our Services",
  description: "Website development, software, mobile apps, bulk SMS, call center, accounting & business development services by AnasTech Solutions.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Our Services | AnasTech Solutions",
    description: "Website development, software, mobile apps, bulk SMS, call center, accounting & business development services by AnasTech Solutions.",
    url: "/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Services | AnasTech Solutions",
    description: "Website development, software, mobile apps, bulk SMS, call center, accounting & business development services by AnasTech Solutions.",
  },
};

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Globe, Code2, Smartphone, TrendingUp, Calculator, MessageSquare, Phone,
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-paper overflow-hidden">
        <GradientBlob color="blue" size="xl" className="-top-32 -right-32" opacity={0.06} />
        <GradientBlob color="red" size="md" className="top-0 left-0" opacity={0.04} />
        <div className="dot-grid absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <p className="text-brand-blue text-sm font-semibold uppercase tracking-widest mb-3">What We Do</p>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-ink mb-5">
              Services Built for <span className="gradient-text">Your Growth</span>
            </h1>
            <p className="text-ink-soft text-lg leading-relaxed">
              From your first website to enterprise-grade software — we deliver end-to-end digital solutions that help businesses in Bangladesh and beyond compete on a global stage.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider variant="wave" color="#F7F8FB" />

      {/* Services list — alternating layout */}
      <section className="section-pad bg-paper-2">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-20">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Globe;
            const isEven = i % 2 === 0;
            return (
              <ScrollReveal key={service.slug} delay={0.05}>
                <div className={cn("grid lg:grid-cols-2 gap-12 items-center", !isEven && "lg:grid-flow-dense")}>
                  {/* Icon side */}
                  <div className={cn("flex justify-center", !isEven && "lg:col-start-2")}>
                    <div
                      className="relative w-full max-w-sm aspect-square rounded-[40px] flex items-center justify-center overflow-hidden"
                      style={{ backgroundColor: service.bgColor }}
                    >
                      <div className="absolute inset-0 dot-grid opacity-40" aria-hidden="true" />
                      <div className="relative z-10 flex flex-col items-center gap-4">
                        <div
                          className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-lg"
                          style={{ backgroundColor: service.color + "20", border: `2px solid ${service.color}30` }}
                        >
                          <Icon className="size-12" style={{ color: service.color }} />
                        </div>
                        <span className="font-display font-bold text-2xl text-ink">{service.title}</span>
                      </div>
                      {/* Decorative circles */}
                      <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-30" style={{ backgroundColor: service.color }} />
                      <div className="absolute -top-8 -left-8 w-20 h-20 rounded-full opacity-20" style={{ backgroundColor: service.color }} />
                    </div>
                  </div>

                  {/* Content side */}
                  <div className={cn(!isEven && "lg:col-start-1 lg:row-start-1")}>
                    <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: service.color }}>
                      Service 0{i + 1}
                    </p>
                    <h2 className="font-display text-3xl lg:text-4xl font-bold text-ink mb-3">{service.title}</h2>
                    <p className="text-ink-soft text-base leading-relaxed mb-6">{service.description}</p>

                    {/* Features */}
                    <ul className="space-y-2 mb-8">
                      {service.features.slice(0, 4).map((f) => (
                        <li key={f} className="flex items-start gap-3">
                          <CheckCircle2 className="size-5 shrink-0 mt-0.5" style={{ color: service.color }} />
                          <span className="text-ink-soft text-sm">{f}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {service.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-medium px-3 py-1 rounded-full border"
                          style={{ color: service.color, borderColor: service.color + "30", backgroundColor: service.bgColor }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-button font-semibold text-white transition-all hover:-translate-y-0.5"
                        style={{ backgroundColor: service.color }}
                      >
                        Learn More <ArrowRight className="size-4" />
                      </Link>
                      <a
                        href={service.whatsappMessage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-button font-semibold border-2 transition-all hover:-translate-y-0.5"
                        style={{ borderColor: service.color, color: service.color }}
                      >
                        Get Started
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      <SectionDivider variant="curve" color="#0B0B0F" />
      <CtaBand />
    </>
  );
}
