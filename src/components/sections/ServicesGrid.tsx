import Link from "next/link";
import { ArrowRight, Globe, Code2, Smartphone, TrendingUp, Calculator, MessageSquare, Phone } from "lucide-react";
import { ScrollReveal, StaggerReveal } from "@/components/effects/ScrollReveal";
import { services } from "@/lib/data/services";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Globe, Code2, Smartphone, TrendingUp, Calculator, MessageSquare, Phone,
};

export function ServicesGrid() {
  const [flagship, ...rest] = services;

  return (
    <section className="section-pad bg-paper">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="text-center mb-14">
          <p className="text-brand-blue text-sm font-semibold uppercase tracking-widest mb-3">What We Do</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-ink mb-4">
            Services Built for{" "}
            <span className="gradient-text">Growth</span>
          </h2>
          <p className="text-ink-soft text-lg max-w-2xl mx-auto">
            From your first website to enterprise software — we build the digital infrastructure your business needs to thrive.
          </p>
        </ScrollReveal>

        {/* Asymmetric bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Flagship — spans 2 cols + 2 rows */}
          <ScrollReveal className="md:col-span-2 lg:col-span-2" delay={0}>
            <FlagshipCard service={flagship} />
          </ScrollReveal>

          {/* First small card */}
          <ScrollReveal delay={0.1}>
            <SmallCard service={rest[0]} />
          </ScrollReveal>

          {/* Row 2 */}
          <ScrollReveal delay={0.15}>
            <SmallCard service={rest[1]} />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <SmallCard service={rest[2]} />
          </ScrollReveal>
          <ScrollReveal delay={0.25}>
            <SmallCard service={rest[3]} />
          </ScrollReveal>

          {/* Row 3 */}
          <ScrollReveal className="lg:col-span-1" delay={0.3}>
            <SmallCard service={rest[4]} />
          </ScrollReveal>
          <ScrollReveal className="lg:col-span-1" delay={0.35}>
            <SmallCard service={rest[5]} />
          </ScrollReveal>
        </div>

        {/* View all */}
        <ScrollReveal className="text-center mt-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-brand-blue font-semibold hover:gap-3 transition-all group"
          >
            View All Services
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

function FlagshipCard({ service }: { service: typeof services[0] }) {
  const Icon = iconMap[service.icon] ?? Globe;
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex flex-col justify-between bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white rounded-[32px] p-8 lg:p-10 h-full min-h-[280px] overflow-hidden hover:-translate-y-1 transition-transform duration-300"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 line-grid opacity-20" />
      <div className="absolute -right-16 -top-16 w-48 h-48 bg-white/5 rounded-full" />
      <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full" />

      <div className="relative z-10">
        <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/25 transition-colors">
          <Icon className="size-7 text-white" />
        </div>
        <h3 className="font-display text-2xl lg:text-3xl font-bold mb-3">{service.title}</h3>
        <p className="text-white/75 text-base leading-relaxed max-w-lg">{service.description}</p>
      </div>

      <div className="relative z-10 flex flex-wrap gap-2 mt-6">
        {service.techStack.slice(0, 4).map((tech) => (
          <span key={tech} className="text-xs font-medium bg-white/15 rounded-full px-3 py-1">
            {tech}
          </span>
        ))}
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-white ml-auto group-hover:gap-2 transition-all">
          Learn More <ArrowRight className="size-3" />
        </span>
      </div>
    </Link>
  );
}

function SmallCard({ service }: { service: typeof services[0] }) {
  const Icon = iconMap[service.icon] ?? Globe;
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col bg-paper border border-border rounded-2xl p-6 hover:border-brand-blue/30 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 h-full min-h-[160px]"
      style={{ "--service-color": service.color } as React.CSSProperties}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
        style={{ backgroundColor: service.bgColor }}
      >
        <Icon className="size-5" style={{ color: service.color }} />
      </div>
      <h3 className="font-display font-700 text-ink mb-1 group-hover:text-brand-blue transition-colors">
        {service.title}
      </h3>
      <p className="text-ink-muted text-sm flex-1">{service.tagline}</p>
      <div
        className="h-0.5 rounded-full mt-4 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
        style={{ backgroundColor: service.color }}
      />
    </Link>
  );
}
