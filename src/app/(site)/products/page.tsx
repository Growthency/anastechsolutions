import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Heart, BarChart3, Stethoscope, Zap, CheckCircle2, BookMarked, ExternalLink } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { GradientBlob } from "@/components/effects/GradientBlob";
import { SectionDivider } from "@/components/effects/SectionDivider";
import { CtaBand } from "@/components/sections/CtaBand";
import { products } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Our Products",
  description: "Muhius Sunnah, Khdimatul Ummah, eBusiness, Hospital Care, and Bulk SMS Platform — enterprise software products by AnasTech Solutions.",
  alternates: { canonical: "/products" },
};

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  BookMarked, Heart, BarChart3, Stethoscope, Zap,
};

export default function ProductsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-paper overflow-hidden">
        <GradientBlob color="red" size="xl" className="-top-32 -left-32" opacity={0.05} />
        <GradientBlob color="blue" size="lg" className="-top-16 right-0" opacity={0.05} />
        <div className="dot-grid absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <ScrollReveal>
            <p className="text-brand-red text-sm font-semibold uppercase tracking-widest mb-3">Our Products</p>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-ink mb-5">
              Software Built for <span className="gradient-text">Real Problems</span>
            </h1>
            <p className="text-ink-soft text-lg leading-relaxed max-w-2xl mx-auto">
              Ready-to-deploy platforms that solve specific industry challenges — each one battle-tested, customizable, and built to scale with your business.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider variant="wave" color="#F7F8FB" />

      {/* Product cards */}
      <section className="section-pad bg-paper-2">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-20">
          {products.map((product, i) => {
            const Icon = iconMap[product.icon] ?? Zap;
            const isEven = i % 2 === 0;
            return (
              <ScrollReveal key={product.slug}>
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? "lg:grid-flow-dense" : ""}`}>
                  {/* Visual */}
                  <div className={`flex justify-center ${!isEven ? "lg:col-start-2" : ""}`}>
                    <div
                      className="relative w-full max-w-sm aspect-square rounded-[40px] flex flex-col items-center justify-center gap-4 overflow-hidden p-8"
                      style={{ backgroundColor: product.bgColor, border: `2px solid ${product.color}20` }}
                    >
                      <div className="absolute inset-0 line-grid opacity-30" aria-hidden="true" />
                      <div className="relative z-10 text-center">
                        <div
                          className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                          style={{ backgroundColor: product.color + "20", border: `2px solid ${product.color}30` }}
                        >
                          <Icon className="size-10" style={{ color: product.color }} />
                        </div>
                        <h3 className="font-display font-bold text-2xl text-ink mb-1">{product.title}</h3>
                        <p className="text-ink-soft text-sm">{product.tagline}</p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={!isEven ? "lg:col-start-1 lg:row-start-1" : ""}>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: product.color }}>
                        AnasTech Product
                      </p>
                      {product.liveUrl && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ backgroundColor: product.color + "15", color: product.color, border: `1px solid ${product.color}30` }}>
                          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: product.color }} />
                          Live
                        </span>
                      )}
                    </div>
                    <h2 className="font-display text-3xl lg:text-4xl font-bold text-ink mb-3">{product.title}</h2>
                    <p className="text-ink-soft leading-relaxed mb-6">{product.description}</p>

                    <div className="grid sm:grid-cols-2 gap-3 mb-8">
                      {product.features.slice(0, 4).map((f) => (
                        <div key={f.title} className="flex items-start gap-2">
                          <CheckCircle2 className="size-4 shrink-0 mt-0.5" style={{ color: product.color }} />
                          <div>
                            <p className="text-ink text-sm font-medium">{f.title}</p>
                            <p className="text-ink-muted text-xs">{f.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={`/products/${product.slug}`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-button font-semibold text-white hover:-translate-y-0.5 transition-all"
                        style={{ backgroundColor: product.color }}
                      >
                        Learn More <ArrowRight className="size-4" />
                      </Link>
                      {product.liveUrl ? (
                        <a
                          href={product.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-button font-semibold border-2 hover:-translate-y-0.5 transition-all"
                          style={{ borderColor: product.color, color: product.color }}
                        >
                          Visit Live Site <ExternalLink className="size-4" />
                        </a>
                      ) : (
                        <a
                          href={product.whatsappMessage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-button font-semibold border-2 hover:-translate-y-0.5 transition-all"
                          style={{ borderColor: product.color, color: product.color }}
                        >
                          Request Demo
                        </a>
                      )}
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
