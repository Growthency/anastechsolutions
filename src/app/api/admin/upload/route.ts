import { NextRequest, NextResponse } from 'next/server'
import { readSession } from '@/lib/auth/session'
import { getSupabaseAdmin, hasSupabaseConfig } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const session = await readSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!hasSupabaseConfig()) {
    return NextResponse.json({ error: 'Supabase is not configured on the server.' }, { status: 503 })
  }

  const admin = getSupabaseAdmin()

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: 'Invalid file type. Use JPG, PNG, WebP, GIF, or SVG.' }, { status: 400 })
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: 'File too large. Maximum 5MB.' }, { status: 400 })
  }

  const ext = file.name.split('.').pop() || 'webp'
  const timestamp = Date.now()
  const safeName = file.name
    .replace(/\.[^/.]+$/, '')
    .replace(/[^a-zA-Z0-9-_]/g, '-')
    .toLowerCase()
    .slice(0, 50)
  const fileName = `blog/${timestamp}-${safeName}.${ext}`

  const arrayBuffer = await file.arrayBuffer()
  const buffer = new Uint8Array(arrayBuffer)

  const { error } = await admin.storage
    .from('images')
    .upload(fileName, buffer, {
      contentType: file.type,
      cacheControl: '31536000',
      upsert: false,
    })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const { data: urlData } = admin.storage
    .from('images')
    .getPublicUrl(fileName)

  return NextResponse.json({
    url: urlData.publicUrl,
    path: fileName,
  })
}
