import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, MessageCircle, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionDivider } from "@/components/effects/SectionDivider";
import { WA_LINKS } from "@/lib/utils";
import { blogPosts } from "@/lib/data/blog-posts";
import { getAllPosts, getPostBySlug } from "@/lib/data/posts";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  articleSchema,
  breadcrumbSchema,
  SITE_URL,
} from "@/lib/seo/schemas";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const canonical = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonical,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const all = await getAllPosts();
  const related = all.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      {/* Structured data — BlogPosting + Breadcrumb */}
      <JsonLd
        data={articleSchema({
          slug: post.slug,
          title: post.title,
          description: post.excerpt,
          image: post.coverImage,
          author: post.author,
          datePublished: post.date,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Blog", url: `${SITE_URL}/blog` },
          { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
        ])}
      />

      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-border z-50" aria-hidden="true">
        <div id="reading-progress" className="h-full bg-gradient-to-r from-brand-blue to-brand-red w-0 transition-none" />
      </div>

      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-paper-2 overflow-hidden">
        <div className="dot-grid absolute inset-0 opacity-20" aria-hidden="true" />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <Link href="/blog" className="inline-flex items-center gap-2 text-brand-blue text-sm font-medium mb-8 hover:gap-3 transition-all">
              <ArrowLeft className="size-4" /> All Articles
            </Link>
          </ScrollReveal>
          <ScrollReveal>
            <span className="inline-block bg-brand-blue/10 text-brand-blue text-xs font-semibold px-3 py-1 rounded-full mb-4">
              {post.category}
            </span>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-ink mb-4 leading-tight">{post.title}</h1>
            <p className="text-ink-soft text-xl leading-relaxed mb-6">{post.excerpt}</p>
            <div className="flex flex-wrap items-center gap-5 text-sm text-ink-muted border-t border-border pt-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-blue to-brand-red flex items-center justify-center text-white text-xs font-bold">
                  {post.author[0]}
                </div>
                <span className="font-medium text-ink">{post.author}</span>
              </div>
              <span className="flex items-center gap-1.5"><Calendar className="size-4" />{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
              <span className="flex items-center gap-1.5"><Clock className="size-4" />{post.readTime} min read</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider variant="wave" color="#FFFFFF" />

      {/* Content */}
      <section className="py-16 bg-paper">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <article className="prose prose-lg max-w-none
              prose-headings:font-display prose-headings:font-bold prose-headings:text-ink
              prose-h1:text-4xl prose-h2:text-2xl prose-h3:text-xl
              prose-p:text-ink-soft prose-p:leading-relaxed
              prose-a:text-brand-blue prose-a:no-underline hover:prose-a:underline
              prose-strong:text-ink prose-strong:font-semibold
              prose-ul:text-ink-soft prose-li:marker:text-brand-blue
              prose-blockquote:border-brand-blue prose-blockquote:text-ink-soft
              prose-code:text-brand-red prose-code:bg-paper-2 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            ">
              <div dangerouslySetInnerHTML={{ __html: renderContent(post.content) }} />
            </article>
          </ScrollReveal>

          {/* Tags */}
          <ScrollReveal className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-border">
            {post.tags.map((tag) => (
              <span key={tag} className="text-sm bg-paper-2 border border-border rounded-full px-4 py-1.5 text-ink-muted font-medium">
                #{tag}
              </span>
            ))}
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal className="mt-10 bg-gradient-to-br from-brand-blue/8 to-brand-red/8 border border-brand-blue/20 rounded-2xl p-8 text-center">
            <h3 className="font-display text-2xl font-bold text-ink mb-2">Need Help With This?</h3>
            <p className="text-ink-soft mb-5">Our team is available on WhatsApp 7 days a week. Let's talk about your project.</p>
            <a
              href={WA_LINKS.general}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-red text-white px-6 py-3 rounded-button font-semibold hover:-translate-y-0.5 transition-all shadow-red"
            >
              <MessageCircle className="size-4" /> Chat on WhatsApp
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="section-pad bg-paper-2">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <ScrollReveal className="mb-8">
              <h2 className="font-display text-2xl font-bold text-ink">More Articles</h2>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p, i) => (
                <ScrollReveal key={p.slug} delay={i * 0.08}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group flex flex-col bg-paper border border-border rounded-2xl p-5 hover:border-brand-blue/30 hover:shadow-card hover:-translate-y-0.5 transition-all"
                  >
                    <span className="text-xs font-semibold text-brand-blue mb-2">{p.category}</span>
                    <h3 className="font-display font-bold text-ink text-sm leading-snug mb-2 group-hover:text-brand-blue transition-colors line-clamp-2">{p.title}</h3>
                    <span className="text-xs text-ink-muted flex items-center gap-1 mt-auto"><Clock className="size-3" />{p.readTime} min read</span>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

// If content already looks like HTML (admin-authored via rich editor), render as-is.
// Otherwise treat it as Markdown (legacy static posts).
function renderContent(content: string): string {
  if (/^\s*<(p|h[1-6]|div|section|article|ul|ol|blockquote|figure|table|img)\b/i.test(content)) {
    return content;
  }
  return markdownToHtml(content);
}

// Simple markdown-to-HTML converter
function markdownToHtml(md: string): string {
  return md
    .trim()
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/^> (.+)$/gm, "<blockquote><p>$1</p></blockquote>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>")
    .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[hupbl])/gm, "")
    .replace(/(<\/h[123]>|<\/ul>|<\/blockquote>)\n/g, "$1")
    || `<p>${md}</p>`;
}
