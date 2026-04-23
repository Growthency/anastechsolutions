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
}

const COLUMNS =
  "id, slug, title, excerpt, content, featured_image, category, read_time, author_name, status, created_at, published_at";

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
    const { data, error } = await getSupabaseAdmin()
      .from("blog_posts")
      .select(COLUMNS)
      .eq("status", "published")
      .order("published_at", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false });
    if (error) {
      console.error("[posts] Supabase select failed:", error.message);
      return [];
    }
    return (data as DbPostRow[]).map(rowToPost);
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
      const { data, error } = await getSupabaseAdmin()
        .from("blog_posts")
        .select(COLUMNS)
        .eq("status", "published")
        .in("slug", [normalized, `/${normalized}`])
        .maybeSingle();
      if (!error && data) return rowToPost(data as DbPostRow);
    } catch {
      // fall through to static
    }
  }
  return staticPosts.find((p) => p.slug === normalized) ?? null;
}
