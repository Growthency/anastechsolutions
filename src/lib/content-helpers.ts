/**
 * Extracts the `src` of the first `<img>` tag in an HTML blob.
 * Returns null if input is empty or no image is found.
 */
export function extractFirstImage(html: string | null | undefined): string | null {
  if (!html || typeof html !== 'string') return null
  const match = html.match(/<img[^>]*\ssrc\s*=\s*["']([^"']+)["']/i)
  if (!match) return null
  const src = match[1].trim()
  if (!src) return null
  return src
}

/**
 * Resolves the "effective" featured image for a post: explicit value if set,
 * otherwise the first image in the content, otherwise empty string.
 */
export function resolveFeaturedImage(
  featuredImage: string | null | undefined,
  content: string | null | undefined,
): string {
  const explicit = (featuredImage || '').trim()
  if (explicit) return explicit
  return extractFirstImage(content) || ''
}
