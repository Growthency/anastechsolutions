import Link from "next/link";
import { ArrowRight, Heart, BarChart3, Stethoscope, Zap } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { products } from "@/lib/data/products";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Heart, BarChart3, Stethoscope, Zap,
};

export function ProductsShowcase() {
  return (
    <section className="section-pad bg-paper overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal className="text-center mb-14">
          <p className="text-brand-red text-sm font-semibold uppercase tracking-widest mb-3">Our Products</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-ink mb-4">
            Platforms Built for{" "}
            <span className="gradient-text">Real Businesses</span>
          </h2>
          <p className="text-ink-soft text-lg max-w-2xl mx-auto">
            Ready-to-deploy software products that solve specific industry problems — customizable for your needs.
          </p>
        </ScrollReveal>

        {/* Product cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product, i) => {
            const Icon = iconMap[product.icon] ?? Zap;
            return (
              <ScrollReveal key={product.slug} delay={i * 0.1}>
                <Link
                  href={`/products/${product.slug}`}
                  className="group relative flex flex-col bg-paper border border-border rounded-[28px] p-7 hover:border-brand-blue/30 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full min-h-[220px]"
                >
                  {/* Background blob */}
                  <div
                    className="absolute -right-12 -top-12 w-40 h-40 rounded-full blur-2xl opacity-60 transition-opacity group-hover:opacity-100"
                    style={{ backgroundColor: product.color + "15" }}
                    aria-hidden="true"
                  />

                  <div className="relative z-10 flex-1">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: product.bgColor }}
                    >
                      <Icon className="size-6" style={{ color: product.color }} />
                    </div>

                    <h3 className="font-display text-xl font-bold text-ink mb-1 group-hover:text-brand-blue transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-ink-muted text-sm mb-4">{product.tagline}</p>

                    {/* Feature pills */}
                    <div className="flex flex-wrap gap-2">
                      {product.modules.slice(0, 3).map((mod) => (
                        <span
                          key={mod}
                          className="text-xs font-medium px-2.5 py-1 rounded-full border"
                          style={{ color: product.color, borderColor: product.color + "30", backgroundColor: product.bgColor }}
                        >
                          {mod}
                        </span>
                      ))}
                      {product.modules.length > 3 && (
                        <span className="text-xs text-ink-muted px-2.5 py-1">
                          +{product.modules.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center gap-2 mt-5 pt-5 border-t border-border">
                    <span
                      className="text-sm font-semibold group-hover:gap-3 transition-all flex items-center gap-2"
                      style={{ color: product.color }}
                    >
                      Learn More <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="ml-auto text-xs text-ink-subtle">Request Demo →</span>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
