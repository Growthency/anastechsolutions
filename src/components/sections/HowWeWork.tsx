import { Search, Palette, Code2, Rocket } from "lucide-react";
import { ScrollReveal, StaggerReveal } from "@/components/effects/ScrollReveal";

const steps = [
  { step: 1, title: "Discover", icon: Search, color: "#0F75BC", description: "We deep-dive into your business, goals, and competitors to build the right strategy — not a generic one." },
  { step: 2, title: "Design", icon: Palette, color: "#ED1C24", description: "Wireframes and pixel-perfect mockups reviewed with you before any code is written. You approve every pixel." },
  { step: 3, title: "Develop", icon: Code2, color: "#0F75BC", description: "Clean, documented code delivered in sprints. Weekly demos so you're never in the dark." },
  { step: 4, title: "Deliver", icon: Rocket, color: "#ED1C24", description: "Full QA, performance audit, deployment, and handover. Then 3 months of free support." },
];

export function HowWeWork() {
  return (
    <section className="section-pad bg-paper-2 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <p className="text-brand-blue text-sm font-semibold uppercase tracking-widest mb-3">Our Process</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-ink mb-4">
            How We <span className="gradient-text">Work</span>
          </h2>
          <p className="text-ink-soft text-lg max-w-2xl mx-auto">
            A transparent, structured process that delivers results on time, every time.
          </p>
        </ScrollReveal>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative">
          {/* Connecting line (desktop) */}
          <div className="absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-brand-blue via-brand-red to-brand-blue hidden lg:block" aria-hidden="true" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <ScrollReveal key={step.step} delay={i * 0.12}>
                <div className="flex flex-col items-center text-center group">
                  {/* Icon circle */}
                  <div
                    className="relative w-24 h-24 rounded-full flex items-center justify-center mb-6 transition-transform group-hover:-translate-y-2 duration-300 z-10"
                    style={{ backgroundColor: step.color + "15", border: `2px solid ${step.color}30` }}
                  >
                    <Icon className="size-9" style={{ color: step.color }} />
                    {/* Step number */}
                    <div
                      className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: step.color }}
                    >
                      {step.step}
                    </div>
                  </div>

                  <h3 className="font-display text-xl font-bold text-ink mb-2 group-hover:text-brand-blue transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-ink-soft text-sm leading-relaxed">{step.description}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
