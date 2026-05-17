import "server-only";
import { blogPosts as staticPosts, type BlogPost } from "./blog-posts";
import { getSupabaseAdmin, hasSupabaseConfig } from "@/lib/supabase/server";

interface DbPostRow {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  featured_image: string | null;
  category: string | null;
  read_time: string | null;
  author_name: string | null;
  status: string | null;
  created_at: string;
  published_at: string | null;
  show_on_blog?: boolean | null;
}

const COLUMNS =
  "id, slug, title, excerpt, content, featured_image, category, read_time, author_name, status, created_at, published_at, show_on_blog";

// Fallback when the show_on_blog column hasn't been migrated yet — drop it
// from the select list and re-run the query so the page still renders.
const COLUMNS_NO_FLAG = COLUMNS.replace(/, show_on_blog/, "");

function parseReadTime(text: string | null | undefined): number {
  if (!text) return 5;
  const m = text.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : 5;
}

function normalizeSlug(slug: string): string {
  return slug.replace(/^\/+/, "").replace(/\/+$/, "");
}

function rowToPost(row: DbPostRow): BlogPost {
  return {
    slug: normalizeSlug(row.slug),
    title: row.title,
    excerpt: row.excerpt ?? "",
    content: row.content ?? "",
    coverImage: row.featured_image ?? "",
    category: row.category ?? "Insights",
    date: row.published_at ?? row.created_at,
    readTime: parseReadTime(row.read_time),
    author: row.author_name ?? "Anas Tech Solutions",
    tags: [],
  };
}

async function fetchDbPosts(): Promise<BlogPost[]> {
  if (!hasSupabaseConfig()) return [];
  try {
    let data: unknown = null;
    let error: { message: string } | null = null;
    const first = await getSupabaseAdmin()
      .from("blog_posts")
      .select(COLUMNS)
      .eq("status", "published")
      .order("published_at", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false });
    data = first.data;
    error = first.error;

    // Older databases may not have the show_on_blog column yet — retry without it.
    if (error && /show_on_blog/.test(error.message)) {
      const retry = await getSupabaseAdmin()
        .from("blog_posts")
        .select(COLUMNS_NO_FLAG)
        .eq("status", "published")
        .order("published_at", { ascending: false, nullsFirst: false })
        .order("created_at", { ascending: false });
      data = retry.data;
      error = retry.error;
    }

    if (error) {
      console.error("[posts] Supabase select failed:", error.message);
      return [];
    }
    // Exclude posts explicitly marked Hide (show_on_blog === false). Posts
    // with null/undefined (legacy rows) stay visible by default.
    return (data as DbPostRow[] | null ?? [])
      .filter((row) => row.show_on_blog !== false)
      .map(rowToPost);
  } catch (e) {
    console.error("[posts] Supabase fetch threw:", (e as Error).message);
    return [];
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const dbPosts = await fetchDbPosts();
  const slugsInDb = new Set(dbPosts.map((p) => p.slug));
  const merged = [
    ...dbPosts,
    ...staticPosts.filter((p) => !slugsInDb.has(p.slug)),
  ];
  return merged.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const normalized = normalizeSlug(slug);
  if (hasSupabaseConfig()) {
    try {
      // Admin may store slug with or without leading slash — try both.
      // Note: we do NOT filter by show_on_blog here. Pages with show_on_blog=false
      // are intentionally accessible via their direct URL.
      let data: unknown = null;
      let error: { message: string } | null = null;
      const first = await getSupabaseAdmin()
        .from("blog_posts")
        .select(COLUMNS)
        .eq("status", "published")
        .in("slug", [normalized, `/${normalized}`])
        .maybeSingle();
      data = first.data;
      error = first.error;

      if (error && /show_on_blog/.test(error.message)) {
        const retry = await getSupabaseAdmin()
          .from("blog_posts")
          .select(COLUMNS_NO_FLAG)
          .eq("status", "published")
          .in("slug", [normalized, `/${normalized}`])
          .maybeSingle();
        data = retry.data;
        error = retry.error;
      }

      if (!error && data) return rowToPost(data as DbPostRow);
    } catch {
      // fall through to static
    }
  }
  return staticPosts.find((p) => p.slug === normalized) ?? null;
}
