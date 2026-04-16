import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { blogPosts } from "@/lib/data/blog-posts";

export function BlogPreview() {
  const [featured, ...rest] = blogPosts;
  const side = rest.slice(0, 2);

  return (
    <section className="section-pad bg-paper-2">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal className="flex items-end justify-between mb-10">
          <div>
            <p className="text-brand-blue text-sm font-semibold uppercase tracking-widest mb-2">Latest</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-ink">
              News & <span className="gradient-text">Insights</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-2 text-brand-blue font-semibold hover:gap-3 transition-all group"
          >
            All Posts <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Featured post */}
          <ScrollReveal className="lg:col-span-2">
            <Link
              href={`/blog/${featured.slug}`}
              className="group flex flex-col bg-paper border border-border rounded-2xl overflow-hidden hover:border-brand-blue/30 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 h-full"
            >
              {/* Image placeholder */}
              <div className="h-52 bg-gradient-to-br from-brand-blue/10 to-brand-red/10 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 dot-grid opacity-50" />
                <span className="text-6xl relative z-10">📝</span>
                <span className="absolute top-4 left-4 bg-brand-blue text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {featured.category}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex gap-4 text-xs text-ink-muted mb-3">
                  <span className="flex items-center gap-1"><Calendar className="size-3" />{new Date(featured.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  <span className="flex items-center gap-1"><Clock className="size-3" />{featured.readTime} min read</span>
                </div>
                <h3 className="font-display font-700 text-ink text-xl mb-2 group-hover:text-brand-blue transition-colors leading-snug">
                  {featured.title}
                </h3>
                <p className="text-ink-soft text-sm leading-relaxed flex-1">{featured.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-brand-blue text-sm font-semibold mt-4 group-hover:gap-2 transition-all">
                  Read Article <ArrowRight className="size-3.5" />
                </span>
              </div>
            </Link>
          </ScrollReveal>

          {/* Side posts */}
          <div className="flex flex-col gap-6">
            {side.map((post, i) => (
              <ScrollReveal key={post.slug} delay={(i + 1) * 0.1}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col bg-paper border border-border rounded-2xl overflow-hidden hover:border-brand-blue/30 hover:shadow-card hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="h-28 bg-gradient-to-br from-brand-blue/8 to-brand-red/8 flex items-center justify-center relative">
                    <span className="text-4xl">
                      {["💼", "📱", "💰", "📨"][i] ?? "📄"}
                    </span>
                    <span className="absolute top-3 left-3 bg-brand-red/10 text-brand-red text-xs font-semibold px-2 py-0.5 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-600 text-ink text-sm mb-1 group-hover:text-brand-blue transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                    <span className="text-ink-muted text-xs flex items-center gap-1">
                      <Clock className="size-3" />{post.readTime} min
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Mobile view all */}
        <ScrollReveal className="text-center mt-8 sm:hidden">
          <Link href="/blog" className="inline-flex items-center gap-2 text-brand-blue font-semibold">
            All Posts <ArrowRight className="size-4" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
