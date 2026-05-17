import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { readSession } from '@/lib/auth/session'
import { getSupabaseAdmin, hasSupabaseConfig } from '@/lib/supabase/server'
import { resolveFeaturedImage } from '@/lib/content-helpers'

async function requireAdmin(): Promise<
  | { ok: true; admin: ReturnType<typeof getSupabaseAdmin> }
  | { ok: false; response: NextResponse }
> {
  const session = await readSession()
  if (!session) {
    return { ok: false, response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) }
  }
  if (!hasSupabaseConfig()) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: 'Supabase is not configured on the server.', posts: [], total: 0, page: 1, totalPages: 0 },
        { status: 503 },
      ),
    }
  }
  return { ok: true, admin: getSupabaseAdmin() }
}

export async function GET(req: NextRequest) {
  const guard = await requireAdmin()
  if (!guard.ok) return guard.response
  const { admin } = guard

  const url = new URL(req.url)

  const id = url.searchParams.get('id')
  if (id) {
    const { data: post, error } = await admin
      .from('blog_posts')
      .select('*')
      .eq('id', Number(id))
      .single()
    if (error) return NextResponse.json({ error: error.message }, { status: 404 })
    return NextResponse.json(post)
  }

  const page = Number(url.searchParams.get('page') ?? '1')
  const limit = 25
  const offset = (page - 1) * limit

  const { data: posts, count } = await admin
    .from('blog_posts')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  return NextResponse.json({
    posts: posts ?? [],
    total: count ?? 0,
    page,
    totalPages: Math.ceil((count ?? 0) / limit),
  })
}

function autoExcerpt(html: string): string {
  if (!html) return ''
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  if (text.length <= 160) return text
  return text.slice(0, 157).replace(/\s+\S*$/, '') + '...'
}

export async function POST(req: NextRequest) {
  const guard = await requireAdmin()
  if (!guard.ok) return guard.response
  const { admin } = guard

  const body = await req.json()
  const {
    title, slug, content, featured_image,
    category, is_premium, status,
    author_name, author_role, custom_css, custom_schema,
    meta_title, meta_description, layout, show_on_blog,
  } = body

  if (!title || !slug) {
    return NextResponse.json({ error: 'Title and slug are required' }, { status: 400 })
  }

  const effectiveFeaturedImage = resolveFeaturedImage(featured_image, content)

  const { data, error } = await admin
    .from('blog_posts')
    .insert({
      title,
      slug: slug.startsWith('/') ? slug : `/${slug}`,
      excerpt: autoExcerpt(content || ''),
      content: content || '',
      featured_image: effectiveFeaturedImage,
      category: category || 'Insights',
      is_premium: is_premium ?? false,
      status: status || 'draft',
      author_name: author_name || 'Anas Tech Solutions',
      author_role: author_role || 'Editorial Team',
      meta_title: meta_title || null,
      meta_description: meta_description || null,
      published_at: status === 'published' ? new Date().toISOString() : null,
      layout: layout || 'with-sidebar',
      custom_css: custom_css || null,
      custom_schema: custom_schema || null,
      show_on_blog: show_on_blog ?? true,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  if (data?.slug) revalidatePath(data.slug)
  revalidatePath('/blog')
  revalidatePath('/sitemap.xml')

  return NextResponse.json(data)
}

export async function PATCH(req: NextRequest) {
  const guard = await requireAdmin()
  if (!guard.ok) return guard.response
  const { admin } = guard

  const body = await req.json()
  const { id, ...updates } = body

  if (!id) return NextResponse.json({ error: 'Post ID required' }, { status: 400 })

  if (updates.content) {
    updates.excerpt = autoExcerpt(updates.content)
  }

  if (
    Object.prototype.hasOwnProperty.call(updates, 'featured_image') &&
    !(updates.featured_image && String(updates.featured_image).trim()) &&
    updates.content
  ) {
    updates.featured_image = resolveFeaturedImage('', updates.content)
  }

  if (updates.slug && !updates.slug.startsWith('/')) {
    updates.slug = `/${updates.slug}`
  }

  if (updates.status === 'published') {
    updates.published_at = updates.published_at || new Date().toISOString()
  }
  updates.updated_at = new Date().toISOString()

  const { data, error } = await admin
    .from('blog_posts')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  if (data?.slug) revalidatePath(data.slug)
  revalidatePath('/blog')
  revalidatePath('/sitemap.xml')

  return NextResponse.json(data)
}

export async function DELETE(req: NextRequest) {
  const guard = await requireAdmin()
  if (!guard.ok) return guard.response
  const { admin } = guard

  const { id } = await req.json()
  if (!id) return NextResponse.json({ error: 'Post ID required' }, { status: 400 })

  const { data: post } = await admin
    .from('blog_posts')
    .select('slug')
    .eq('id', id)
    .single()

  const { error } = await admin.from('blog_posts').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  if (post?.slug) revalidatePath(post.slug)
  revalidatePath('/blog')
  revalidatePath('/sitemap.xml')

  return NextResponse.json({ success: true })
}
