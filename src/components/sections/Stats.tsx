import { CountUp } from "@/components/effects/CountUp";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

const stats = [
  { value: 150, suffix: "+", label: "Projects Delivered", desc: "Across industries and continents" },
  { value: 80, suffix: "+", label: "Happy Clients", desc: "Businesses that trust us" },
  { value: 5, suffix: "+", label: "Years Experience", desc: "Building digital solutions" },
  { value: 10, suffix: "+", label: "Countries Served", desc: "From Bangladesh to the world" },
];

export function Stats() {
  return (
    <section className="section-pad bg-gradient-to-br from-brand-blue/5 via-paper to-brand-red/5 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 line-grid opacity-30" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <ScrollReveal className="text-center mb-14">
          <p className="text-brand-blue text-sm font-semibold uppercase tracking-widest mb-3">By The Numbers</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-ink">
            Results That <span className="gradient-text">Speak</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="text-center group">
                <div className="font-mono text-5xl lg:text-6xl font-bold text-brand-red mb-2 group-hover:scale-105 transition-transform inline-block">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="font-display font-700 text-ink text-lg mb-1">{stat.label}</div>
                <div className="text-ink-muted text-sm">{stat.desc}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
