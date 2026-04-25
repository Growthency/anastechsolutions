import type { MetadataRoute } from "next";
import { products } from "@/lib/data/products";
import { services } from "@/lib/data/services";
import { getAllPosts } from "@/lib/data/posts";

const SITE = "https://anastechsolutions.com";

// Re-generate hourly so newly published Supabase posts surface fast.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`,         lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${SITE}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/products`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/blog`,     lastModified: now, changeFrequency: "daily",   priority: 0.8 },
    { url: `${SITE}/about`,    lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/contact`,  lastModified: now, changeFrequency: "yearly",  priority: 0.6 },
    { url: `${SITE}/support`,  lastModified: now, changeFrequency: "yearly",  priority: 0.5 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  let postRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await getAllPosts();
    postRoutes = posts.map((p) => ({
      url: `${SITE}/blog/${p.slug}`,
      lastModified: p.date ? new Date(p.date) : now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  } catch {
    // Ignore — static fallback already covered by getAllPosts inner try/catch.
  }

  return [...staticRoutes, ...productRoutes, ...serviceRoutes, ...postRoutes];
}
