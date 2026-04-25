import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MessageCircle, CheckCircle2, Heart, BarChart3, Stethoscope, Zap, BookMarked, ExternalLink, Code2, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { GradientBlob } from "@/components/effects/GradientBlob";
import { SectionDivider } from "@/components/effects/SectionDivider";
import { Accordion } from "@/components/ui/accordion";
import { products, getProductBySlug } from "@/lib/data/products";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  productSchema,
  breadcrumbSchema,
  faqPageSchema,
  SITE_URL,
} from "@/lib/seo/schemas";

const productIconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  BookMarked, Heart, BarChart3, Stethoscope, Zap,
};

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  const canonical = `/products/${product.slug}`;
  return {
    title: product.title,
    description: product.description,
    alternates: { canonical },
    openGraph: {
      title: `${product.title} — ${product.tagline}`,
      description: product.description,
      url: canonical,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} — ${product.tagline}`,
      description: product.description,
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const ProductIcon = productIconMap[product.icon] ?? Zap;

  return (
    <>
      {/* Structured data — Product, Breadcrumb, FAQ */}
      <JsonLd
        data={productSchema({
          slug: product.slug,
          title: product.title,
          description: product.description,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Products", url: `${SITE_URL}/products` },
          { name: product.title, url: `${SITE_URL}/products/${product.slug}` },
        ])}
      />
      {product.faqs?.length > 0 && <JsonLd data={faqPageSchema(product.faqs)} />}

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ backgroundColor: product.bgColor }}>
        <GradientBlob color="blue" size="xl" className="-top-32 -right-32" opacity={0.08} />
        <div className="dot-grid absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <Link href="/products" className="inline-flex items-center gap-2 text-sm font-medium mb-8 hover:gap-3 transition-all" style={{ color: product.color }}>
              <ArrowLeft className="size-4" /> All Products
            </Link>
          </ScrollReveal>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="flex items-center gap-2 mb-3">
                <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: product.color }}>AnasTech Product</p>
                {product.liveUrl && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ backgroundColor: product.color + "15", color: product.color, border: `1px solid ${product.color}30` }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: product.color }} />
                    Live in Production
                  </span>
                )}
              </div>
              <h1 className="font-display text-5xl lg:text-6xl font-bold text-ink mb-3 leading-tight">{product.title}</h1>
              <p className="text-xl font-medium mb-4" style={{ color: product.color }}>{product.tagline}</p>
              <p className="text-ink-soft text-lg leading-relaxed mb-8">{product.description}</p>
              <div className="flex flex-wrap gap-3">
                {product.liveUrl && (
                  <a
                    href={product.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-button font-bold text-white shadow-lg hover:-translate-y-0.5 transition-all"
                    style={{ backgroundColor: product.color }}
                  >
                    <ExternalLink className="size-4" /> Visit Live Site
                  </a>
                )}
                <a
                  href={product.whatsappMessage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-button font-bold hover:-translate-y-0.5 transition-all ${product.liveUrl ? "border-2" : "text-white shadow-lg"}`}
                  style={product.liveUrl
                    ? { borderColor: product.color, color: product.color }
                    : { backgroundColor: product.color }}
                >
                  <MessageCircle className="size-4" /> Request Demo
                </a>
                <Link href="/products" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-button font-semibold border-2 hover:-translate-y-0.5 transition-all" style={{ borderColor: product.color, color: product.color }}>
                  All Products
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15} className="hidden lg:flex justify-center">
              <div className="w-64 h-64 rounded-[40px] flex items-center justify-center shadow-xl" style={{ backgroundColor: product.color + "20", border: `2px solid ${product.color}30` }}>
                <ProductIcon className="size-28" style={{ color: product.color, opacity: 0.8 }} />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionDivider variant="wave" color="#FFFFFF" />

      {/* Features */}
      <section className="section-pad bg-paper">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-ink mb-3">Key Features</h2>
            <p className="text-ink-soft">Everything you need — built in, not bolted on.</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {product.features.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 0.07}>
                <div className="bg-paper-2 border border-border rounded-2xl p-6 hover:border-brand-blue/30 hover:shadow-card hover:-translate-y-1 transition-all duration-300">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 text-xl" style={{ backgroundColor: product.bgColor }}>
                    ✦
                  </div>
                  <h3 className="font-semibold text-ink mb-1">{f.title}</h3>
                  <p className="text-ink-muted text-sm leading-relaxed">{f.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="section-pad bg-paper-2">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-ink mb-3">Modules & Capabilities</h2>
            <p className="text-ink-soft">A complete system, not a patchwork of tools.</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-w-5xl mx-auto">
            {product.modules.map((mod, i) => (
              <ScrollReveal key={mod} delay={i * 0.05}>
                <div className="flex items-center gap-3 bg-paper rounded-xl p-4 border border-border hover:border-brand-blue/30 transition-colors">
                  <CheckCircle2 className="size-4 shrink-0" style={{ color: product.color }} />
                  <span className="text-sm text-ink-soft font-medium">{mod}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Built by / Powered by */}
      {(product.developer || product.poweredBy) && (
        <section className="section-pad bg-paper">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <ScrollReveal className="text-center mb-10">
              <h2 className="font-display text-4xl font-bold text-ink mb-3">Built & Backed By</h2>
              <p className="text-ink-soft">The engineering minds and partners behind {product.title}.</p>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-6">
              {product.developer && (
                <ScrollReveal>
                  <div className="h-full bg-paper-2 border border-border rounded-2xl p-6 hover:border-brand-blue/30 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: product.bgColor, border: `1px solid ${product.color}30` }}>
                        <Code2 className="size-5" style={{ color: product.color }} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: product.color }}>Lead Developer</p>
                        <h3 className="font-display text-xl font-bold text-ink mb-1">{product.developer.name}</h3>
                        <p className="text-ink-soft text-sm leading-relaxed">{product.developer.role}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              )}
              {product.poweredBy && product.poweredBy.length > 0 && (
                <ScrollReveal delay={0.1}>
                  <div className="h-full bg-paper-2 border border-border rounded-2xl p-6 hover:border-brand-blue/30 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: product.bgColor, border: `1px solid ${product.color}30` }}>
                        <Sparkles className="size-5" style={{ color: product.color }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: product.color }}>Powered By</p>
                        <h3 className="font-display text-xl font-bold text-ink mb-3">Strategic Partners</h3>
                        <div className="flex flex-wrap gap-2">
                          {product.poweredBy.map((partner) => (
                            <a
                              key={partner.name}
                              href={partner.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border hover:-translate-y-0.5 transition-all"
                              style={{ borderColor: product.color + "40", color: product.color, backgroundColor: product.bgColor }}
                            >
                              {partner.name}
                              <ExternalLink className="size-3" />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              )}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="section-pad bg-paper-2">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <ScrollReveal className="text-center mb-10">
            <h2 className="font-display text-4xl font-bold text-ink mb-3">Frequently Asked</h2>
          </ScrollReveal>
          <ScrollReveal>
            <div className="bg-paper rounded-2xl border border-border px-6">
              <Accordion items={product.faqs} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${product.color} 0%, ${product.color}CC 100%)` }}>
        <div className="absolute inset-0 line-grid opacity-15" aria-hidden="true" />
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal>
            <h2 className="font-display text-4xl font-bold text-white mb-4">Ready to See {product.title}?</h2>
            <p className="text-white/75 text-lg mb-8">Request a free demo on WhatsApp. We'll walk you through the entire platform.</p>
            <a
              href={product.whatsappMessage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-ink px-8 py-4 rounded-button font-bold text-base hover:-translate-y-0.5 transition-all shadow-xl"
            >
              <MessageCircle className="size-5 text-[#25D366]" /> Request Free Demo
            </a>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
