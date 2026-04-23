import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { GradientBlob } from "@/components/effects/GradientBlob";
import { SectionDivider } from "@/components/effects/SectionDivider";
import { CtaBand } from "@/components/sections/CtaBand";
import { getAllPosts } from "@/lib/data/posts";

export const metadata: Metadata = {
  title: "Blog & Insights",
  description: "Expert articles on web development, mobile apps, SMS marketing, and business growth from the AnasTech Solutions team.",
};

export const revalidate = 60;

const categoryColors: Record<string, string> = {
  "Digital Strategy": "#0F75BC",
  "Mobile Development": "#ED1C24",
  "Accounting": "#0F75BC",
  "SMS Marketing": "#ED1C24",
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const [featured, ...rest] = posts;
  if (!featured) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-ink-soft">No posts yet.</p>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-paper overflow-hidden">
        <GradientBlob color="blue" size="xl" className="-top-32 -right-32" opacity={0.05} />
        <div className="dot-grid absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <ScrollReveal>
            <p className="text-brand-blue text-sm font-semibold uppercase tracking-widest mb-3">Blog & Insights</p>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-ink mb-5">
              Knowledge to <span className="gradient-text">Grow Your Business</span>
            </h1>
            <p className="text-ink-soft text-lg max-w-2xl mx-auto">
              Expert articles on web development, mobile apps, digital marketing, accounting, and business growth from our team.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider variant="wave" color="#F7F8FB" />

      {/* Featured post */}
      <section className="section-pad bg-paper-2">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal className="mb-10">
            <h2 className="font-display text-2xl font-bold text-ink">Featured Article</h2>
          </ScrollReveal>
          <ScrollReveal>
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid lg:grid-cols-2 gap-0 bg-paper border border-border rounded-[28px] overflow-hidden hover:border-brand-blue/30 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <div className="h-64 lg:h-full min-h-[280px] bg-gradient-to-br from-brand-blue/10 to-brand-red/10 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 dot-grid opacity-40" />
                <span className="text-8xl relative z-10">📝</span>
                <span
                  className="absolute top-5 left-5 text-xs font-semibold px-3 py-1.5 rounded-full text-white"
                  style={{ backgroundColor: categoryColors[featured.category] ?? "#0F75BC" }}
                >
                  {featured.category}
                </span>
              </div>
              {/* Content */}
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <div className="flex gap-4 text-xs text-ink-muted mb-4">
                  <span className="flex items-center gap-1.5"><Calendar className="size-3.5" />{new Date(featured.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                  <span className="flex items-center gap-1.5"><Clock className="size-3.5" />{featured.readTime} min read</span>
                </div>
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-ink mb-3 group-hover:text-brand-blue transition-colors leading-snug">
                  {featured.title}
                </h3>
                <p className="text-ink-soft leading-relaxed mb-6">{featured.excerpt}</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-blue to-brand-red flex items-center justify-center text-white text-xs font-bold">
                    {featured.author[0]}
                  </div>
                  <span className="text-sm text-ink-soft font-medium">{featured.author}</span>
                  <span className="ml-auto inline-flex items-center gap-2 text-brand-blue font-semibold text-sm group-hover:gap-3 transition-all">
                    Read Article <ArrowRight className="size-4" />
                  </span>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* All posts grid */}
      <section className="pb-20 bg-paper-2">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal className="mb-10">
            <h2 className="font-display text-2xl font-bold text-ink">All Articles</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 0.08}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col bg-paper border border-border rounded-2xl overflow-hidden hover:border-brand-blue/30 hover:shadow-card hover:-translate-y-1 transition-all duration-300 h-full"
                >
                  <div className="h-44 bg-gradient-to-br from-brand-blue/8 to-brand-red/8 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 dot-grid opacity-30" />
                    <span className="text-5xl relative z-10">
                      {["💼", "📱", "💰", "📨"][i] ?? "📄"}
                    </span>
                    <span
                      className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full text-white"
                      style={{ backgroundColor: categoryColors[post.category] ?? "#0F75BC" }}
                    >
                      {post.category}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex gap-3 text-xs text-ink-muted mb-3">
                      <span className="flex items-center gap-1"><Calendar className="size-3" />{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                      <span className="flex items-center gap-1"><Clock className="size-3" />{post.readTime} min</span>
                    </div>
                    <h3 className="font-display font-bold text-ink mb-2 group-hover:text-brand-blue transition-colors leading-snug flex-1 line-clamp-3">
                      {post.title}
                    </h3>
                    <p className="text-ink-muted text-xs leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex gap-2 flex-wrap mt-auto">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs bg-paper-2 border border-border rounded-full px-2.5 py-0.5 text-ink-muted">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="curve" color="#0B0B0F" />
      <CtaBand />
    </>
  );
}
