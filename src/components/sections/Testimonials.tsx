import { Star } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { testimonials } from "@/lib/data/testimonials";
import { cn } from "@/lib/utils";

export function Testimonials() {
  // Split into 3 columns for masonry
  const col1 = testimonials.filter((_, i) => i % 3 === 0);
  const col2 = testimonials.filter((_, i) => i % 3 === 1);
  const col3 = testimonials.filter((_, i) => i % 3 === 2);

  return (
    <section className="section-pad bg-paper">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal className="text-center mb-14">
          <p className="text-brand-blue text-sm font-semibold uppercase tracking-widest mb-3">Testimonials</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-ink mb-4">
            What Clients <span className="gradient-text">Say</span>
          </h2>
          <p className="text-ink-soft text-lg max-w-2xl mx-auto">
            Don't take our word for it — hear from the businesses we've helped grow.
          </p>
        </ScrollReveal>

        {/* Masonry grid */}
        <div className="hidden lg:grid grid-cols-3 gap-5 items-start">
          {[col1, col2, col3].map((col, ci) => (
            <div key={ci} className="flex flex-col gap-5">
              {col.map((t, i) => (
                <ScrollReveal key={t.name} delay={ci * 0.05 + i * 0.08}>
                  <TestimonialCard testimonial={t} />
                </ScrollReveal>
              ))}
            </div>
          ))}
        </div>

        {/* Mobile: single column */}
        <div className="lg:hidden flex flex-col gap-5">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.05}>
              <TestimonialCard testimonial={t} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div
      className="bg-paper-2 border border-border rounded-2xl p-6 hover:border-brand-blue/30 hover:shadow-card hover:-translate-y-1 transition-all duration-300"
    >
      {/* Quote icon */}
      <svg
        className="w-8 h-8 text-brand-blue/20 mb-3"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>

      <p className="text-ink-soft text-sm leading-relaxed mb-4">"{testimonial.content}"</p>

      {/* Stars */}
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="size-3.5 fill-brand-red text-brand-red" />
        ))}
      </div>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-blue to-brand-red flex items-center justify-center text-white text-xs font-bold shrink-0">
          {testimonial.name[0]}
        </div>
        <div>
          <p className="font-semibold text-ink text-sm">{testimonial.name}</p>
          <p className="text-ink-muted text-xs">{testimonial.role}, {testimonial.company}</p>
        </div>
        <span className="ml-auto text-xs text-ink-subtle">{testimonial.country}</span>
      </div>
    </div>
  );
}
