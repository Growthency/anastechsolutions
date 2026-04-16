import { MessageCircle, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { GradientBlob } from "@/components/effects/GradientBlob";
import { WA_LINKS } from "@/lib/utils";

export function CtaBand() {
  return (
    <section className="section-pad relative overflow-hidden bg-gradient-to-br from-brand-blue via-brand-blue-dark to-ink">
      {/* Effects */}
      <GradientBlob color="red" size="lg" className="-top-24 -right-24" opacity={0.15} />
      <GradientBlob color="blue" size="md" className="-bottom-16 left-1/4" opacity={0.2} />
      <div className="absolute inset-0 line-grid opacity-10" aria-hidden="true" />

      {/* Decorative dots */}
      <div className="absolute top-8 left-8 w-3 h-3 rounded-full bg-white/20" aria-hidden="true" />
      <div className="absolute top-16 left-20 w-2 h-2 rounded-full bg-brand-red/60" aria-hidden="true" />
      <div className="absolute bottom-12 right-12 w-4 h-4 rounded-full bg-white/10" aria-hidden="true" />
      <div className="absolute bottom-8 right-32 w-2 h-2 rounded-full bg-brand-red/40" aria-hidden="true" />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <ScrollReveal direction="up">
          <p className="text-brand-red text-sm font-semibold uppercase tracking-widest mb-4 opacity-90">
            Let's Build Together
          </p>
          <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-5 leading-tight">
            Ready to Build Something{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
              Amazing?
            </span>
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
            Let's talk about your next project. We respond within 1 hour on WhatsApp — no forms, no waiting, just real conversation.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <MagneticButton>
              <a
                href={WA_LINKS.general}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-ink px-8 py-4 rounded-button font-bold text-base hover:bg-paper-2 transition-colors shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all"
              >
                <MessageCircle className="size-5 text-[#25D366]" />
                Chat on WhatsApp
              </a>
            </MagneticButton>
            <a
              href="/services"
              className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-button font-semibold text-base hover:bg-white/10 transition-colors"
            >
              Explore Services
              <ArrowRight className="size-4" />
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
            {[
              "✓ Reply within 1 hour",
              "✓ Free consultation",
              "✓ No commitment required",
            ].map((item) => (
              <span key={item} className="text-white/60 text-sm font-medium">
                {item}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
