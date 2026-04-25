'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import {
  ArrowLeft, Save, Eye, Loader2, Image as ImageIcon,
  Upload, Globe, Lock, Search, AlertCircle, CheckCircle2,
  Code2, Braces,
} from 'lucide-react'
import { useModal } from '@/components/admin/AdminModal'
import { useTheme } from '@/components/providers/ThemeProvider'

const RichEditor = dynamic(() => import('@/components/admin/RichEditor'), { ssr: false })
const InterlinkChecker = dynamic(() => import('@/components/admin/InterlinkChecker'), { ssr: false })

const CATEGORIES = [
  'Insights', 'Digital Strategy', 'Web Development', 'Mobile Development',
  'Software', 'SMS Marketing', 'Accounting', 'Business', 'Muhius Sunnah',
]

const META_TITLE_MAX = 60
const META_DESC_MAX = 155

function slugify(text: string) {
  return '/' + text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export default function NewPageEditor() {
  const { theme } = useTheme()
  const dark = theme === 'dark'
  const { showAlert } = useModal()
  const router = useRouter()
  const featuredFileRef = useRef<HTMLInputElement>(null)
  const [saving, setSaving] = useState(false)
  const [uploadingFeatured, setUploadingFeatured] = useState(false)
  const [error, setError] = useState('')

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [excerpt] = useState('')
  const [content, setContent] = useState('')
  const contentRef = useRef('')
  const [featuredImage, setFeaturedImage] = useState('')
  const [category, setCategory] = useState('Insights')
  const [isPremium, setIsPremium] = useState(false)
  const [status] = useState<'draft' | 'published'>('draft')
  const [layout, setLayout] = useState<'with-sidebar' | 'full-page'>('with-sidebar')
  const [authorName, setAuthorName] = useState('Anas Tech Solutions')
  const [authorRole, setAuthorRole] = useState('Editorial Team')
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [customCss, setCustomCss] = useState('')
  const [customSchema, setCustomSchema] = useState('')
  const [schemaError, setSchemaError] = useState('')

  const [autoSlug, setAutoSlug] = useState(true)

  const handleContentChange = (html: string) => {
    contentRef.current = html
    setContent(html)
  }

  const [editorResetKey, setEditorResetKey] = useState(0)

  const handleInterlinksApplied = (newHtml: string) => {
    contentRef.current = newHtml
    setContent(newHtml)
    setEditorResetKey(k => k + 1)
  }

  const handleTitleChange = (val: string) => {
    setTitle(val)
    if (autoSlug) setSlug(slugify(val))
  }

  const handleSlugChange = (val: string) => {
    setAutoSlug(false)
    setSlug(val)
  }

  const handleFeaturedUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingFeatured(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setFeaturedImage(data.url)
    } catch (err: any) {
      showAlert('Upload Failed', err.message, 'warning')
    } finally {
      setUploadingFeatured(false)
      if (featuredFileRef.current) featuredFileRef.current.value = ''
    }
  }

  const handleSave = async (pub: boolean) => {
    if (!title.trim()) { setError('Title is required'); return }
    if (!slug.trim()) { setError('Slug is required'); return }

    if (customSchema.trim()) {
      try { JSON.parse(customSchema) }
      catch (e: any) {
        setError(`Custom Schema contains invalid JSON: ${e.message}`)
        setSchemaError(e.message)
        return
      }
    }
    setSchemaError('')

    setSaving(true)
    setError('')

    const finalStatus = pub ? 'published' : status

    try {
      const res = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          slug: slug.trim(),
          content: contentRef.current || content,
          featured_image: featuredImage.trim(),
          category,
          is_premium: isPremium,
          layout,
          status: finalStatus,
          author_name: authorName,
          author_role: authorRole,
          meta_title: metaTitle.trim(),
          meta_description: metaDescription.trim(),
          custom_css: customCss.trim() || null,
          custom_schema: customSchema.trim() || null,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to save')

      router.push('/admin/pages')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const metaTitleLen = metaTitle.length
  const metaDescLen = metaDescription.length

  const cardBg = dark ? '#1e293b' : '#fff'
  const cardBorder = dark ? '#334155' : '#e2e8f0'
  const inputBg = dark ? '#0f172a' : '#f1f5f9'
  const inputBorder = dark ? '#1e293b' : '#d1d5db'
  const textPrimary = dark ? '#fff' : '#0f172a'
  const textLabel = dark ? '#94a3b8' : '#64748b'
  const textMuted = dark ? '#64748b' : '#94a3b8'
  const inputCls = `w-full px-3 py-2 rounded-lg text-sm outline-none transition-colors`
  const inputStyle = { background: inputBg, border: `1px solid ${inputBorder}`, color: textPrimary }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/pages"
            className="p-2 rounded-lg transition-colors"
            style={{ color: textLabel }}
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: textPrimary }}>New Page</h1>
            <p className="text-sm mt-0.5" style={{ color: textMuted }}>Create a new page</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
            style={{ border: `1px solid ${cardBorder}`, color: dark ? '#cbd5e1' : '#475569' }}
          >
            <Save className="w-4 h-4" />
            Save Draft
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #0F75BC 0%, #ED1C24 100%)', boxShadow: '0 8px 20px rgba(15,117,188,0.25)' }}
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Eye className="w-4 h-4" />}
            Publish
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/15 border border-red-500/30 text-red-500 text-sm">
          {error}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border p-4" style={{ background: cardBg, borderColor: cardBorder }}>
            <label className="block text-xs font-medium mb-2" style={{ color: textLabel }}>Title</label>
            <input
              type="text"
              value={title}
              onChange={e => handleTitleChange(e.target.value)}
              placeholder="Enter page title…"
              className="w-full px-4 py-3 rounded-lg outline-none text-lg font-semibold"
              style={{ background: inputBg, border: `1px solid ${inputBorder}`, color: textPrimary }}
            />
          </div>

          <div className="rounded-xl border p-4" style={{ background: cardBg, borderColor: cardBorder }}>
            <label className="block text-xs font-medium mb-2" style={{ color: textLabel }}>Permalink</label>
            <div className="flex items-center gap-2">
              <span className="text-sm" style={{ color: textMuted }}>anastechsolutions.com</span>
              <input
                type="text"
                value={slug}
                onChange={e => handleSlugChange(e.target.value)}
                className={inputCls + ' flex-1'}
                style={inputStyle}
              />
            </div>
          </div>

          <div className="rounded-xl border p-4" style={{ background: cardBg, borderColor: cardBorder }}>
            <label className="block text-xs font-medium mb-2" style={{ color: textLabel }}>Featured Image</label>
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 shrink-0" style={{ color: textMuted }} />
              <input
                type="text"
                value={featuredImage}
                onChange={e => setFeaturedImage(e.target.value)}
                placeholder="/image-filename.webp or https://..."
                className={inputCls + ' flex-1'}
                style={inputStyle}
              />
              <button
                type="button"
                onClick={() => featuredFileRef.current?.click()}
                disabled={uploadingFeatured}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors shrink-0 disabled:opacity-50"
                style={{ background: 'rgba(15,117,188,0.15)', color: '#0F75BC' }}
              >
                {uploadingFeatured
                  ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  : <Upload className="w-3.5 h-3.5" />
                }
                Upload
              </button>
              <input
                ref={featuredFileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleFeaturedUpload}
                className="hidden"
              />
            </div>
            {featuredImage && (
              <div className="mt-3 rounded-lg overflow-hidden" style={{ border: `1px solid ${cardBorder}` }}>
                <img src={featuredImage} alt="Preview" className="w-full h-48 object-cover" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium mb-2" style={{ color: textLabel }}>Content</label>
            <RichEditor value={content} onChange={handleContentChange} resetKey={editorResetKey} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border p-4" style={{ background: cardBg, borderColor: cardBorder }}>
            <h3 className="text-sm font-semibold mb-2" style={{ color: textPrimary }}>Status</h3>
            <p className="text-xs" style={{ color: textLabel }}>
              Use <strong style={{ color: dark ? '#cbd5e1' : '#334155' }}>Save Draft</strong> to save without publishing, or{' '}
              <strong style={{ color: '#0F75BC' }}>Publish</strong> to make it live immediately.
            </p>
          </div>

          <div className="rounded-xl border p-4" style={{ background: cardBg, borderColor: cardBorder }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: textPrimary }}>Layout</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setLayout('full-page')}
                className="flex-1 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{
                  background: layout === 'full-page' ? 'rgba(237,28,36,0.15)' : (dark ? '#0f172a' : '#f8fafc'),
                  color: layout === 'full-page' ? '#ED1C24' : textMuted,
                  border: `1px solid ${layout === 'full-page' ? 'rgba(237,28,36,0.3)' : (dark ? '#1e293b' : '#e2e8f0')}`,
                }}
              >
                Full Page
              </button>
              <button
                onClick={() => setLayout('with-sidebar')}
                className="flex-1 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{
                  background: layout === 'with-sidebar' ? 'rgba(15,117,188,0.15)' : (dark ? '#0f172a' : '#f8fafc'),
                  color: layout === 'with-sidebar' ? '#0F75BC' : textMuted,
                  border: `1px solid ${layout === 'with-sidebar' ? 'rgba(15,117,188,0.3)' : (dark ? '#1e293b' : '#e2e8f0')}`,
                }}
              >
                With Sidebar
              </button>
            </div>
          </div>

          <InterlinkChecker content={content} onContentChange={handleInterlinksApplied} />

          <div className="rounded-xl border p-4" style={{ background: cardBg, borderColor: cardBorder }}>
            <div className="flex items-center gap-2 mb-3">
              <Search className="w-4 h-4" style={{ color: '#0F75BC' }} />
              <h3 className="text-sm font-semibold" style={{ color: textPrimary }}>SEO Settings</h3>
            </div>

            <label className="block text-xs mb-1" style={{ color: textLabel }}>Meta Title</label>
            <input
              type="text"
              value={metaTitle}
              onChange={e => setMetaTitle(e.target.value)}
              placeholder={title || 'Custom title for search engines…'}
              className={inputCls + ' mb-1'}
              style={inputStyle}
            />
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs ${metaTitleLen > META_TITLE_MAX ? 'text-red-500' : metaTitleLen > 50 ? 'text-amber-500' : ''}`} style={metaTitleLen <= 50 ? { color: textMuted } : undefined}>
                {metaTitleLen}/{META_TITLE_MAX} characters
              </span>
              {metaTitleLen > 0 && metaTitleLen <= META_TITLE_MAX && (
                <span className="flex items-center gap-1 text-xs text-emerald-500">
                  <CheckCircle2 className="w-3 h-3" /> Good length
                </span>
              )}
              {metaTitleLen > META_TITLE_MAX && (
                <span className="flex items-center gap-1 text-xs text-red-500">
                  <AlertCircle className="w-3 h-3" /> Too long
                </span>
              )}
            </div>

            <label className="block text-xs mb-1" style={{ color: textLabel }}>Meta Description</label>
            <textarea
              value={metaDescription}
              onChange={e => setMetaDescription(e.target.value)}
              placeholder="Brief description for Google search results (max 155 chars)…"
              rows={3}
              className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none mb-1"
              style={inputStyle}
            />
            <div className="flex items-center justify-between">
              <span className={`text-xs ${metaDescLen > META_DESC_MAX ? 'text-red-500' : metaDescLen > 140 ? 'text-amber-500' : ''}`} style={metaDescLen <= 140 ? { color: textMuted } : undefined}>
                {metaDescLen}/{META_DESC_MAX} characters
              </span>
              {metaDescLen > 0 && metaDescLen <= META_DESC_MAX && (
                <span className="flex items-center gap-1 text-xs text-emerald-500">
                  <CheckCircle2 className="w-3 h-3" /> Good length
                </span>
              )}
              {metaDescLen > META_DESC_MAX && (
                <span className="flex items-center gap-1 text-xs text-red-500">
                  <AlertCircle className="w-3 h-3" /> Too long — Google will truncate
                </span>
              )}
            </div>

            {(metaTitle || title) && (
              <div className="mt-4 p-3 rounded-lg" style={{ background: dark ? 'rgba(255,255,255,0.03)' : '#f8fafc', border: `1px solid ${cardBorder}` }}>
                <p className="text-[10px] mb-1" style={{ color: textMuted }}>Google Preview</p>
                <p className="text-sm font-medium truncate" style={{ color: '#0F75BC' }}>
                  {(metaTitle || title).slice(0, 60)}{(metaTitle || title).length > 60 ? '…' : ''}
                </p>
                <p className="text-emerald-600 text-xs truncate">
                  anastechsolutions.com{slug}
                </p>
                <p className="text-xs line-clamp-2 mt-0.5" style={{ color: textLabel }}>
                  {(metaDescription || excerpt || 'No description set').slice(0, 155)}{(metaDescription || excerpt || '').length > 155 ? '…' : ''}
                </p>
              </div>
            )}
          </div>

          <div className="rounded-xl border p-4" style={{ background: cardBg, borderColor: cardBorder }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: textPrimary }}>Author</h3>
            <label className="block text-xs mb-1" style={{ color: textLabel }}>Name</label>
            <input
              type="text"
              value={authorName}
              onChange={e => setAuthorName(e.target.value)}
              className={inputCls + ' mb-3'}
              style={inputStyle}
            />
            <label className="block text-xs mb-1" style={{ color: textLabel }}>Role</label>
            <input
              type="text"
              value={authorRole}
              onChange={e => setAuthorRole(e.target.value)}
              className={inputCls}
              style={inputStyle}
            />
          </div>

          <div className="rounded-xl border p-4" style={{ background: cardBg, borderColor: cardBorder }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: textPrimary }}>Category</h3>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className={inputCls}
              style={inputStyle}
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="rounded-xl border p-4" style={{ background: cardBg, borderColor: cardBorder }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: textPrimary }}>Access Type</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setIsPremium(false)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors"
                style={{
                  background: !isPremium ? 'rgba(15,117,188,0.15)' : (dark ? '#0f172a' : '#f8fafc'),
                  color: !isPremium ? '#0F75BC' : textMuted,
                  border: `1px solid ${!isPremium ? 'rgba(15,117,188,0.3)' : (dark ? '#1e293b' : '#e2e8f0')}`,
                }}
              >
                <Globe className="w-4 h-4" />
                Public
              </button>
              <button
                onClick={() => setIsPremium(true)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors"
                style={{
                  background: isPremium ? 'rgba(245,158,11,0.15)' : (dark ? '#0f172a' : '#f8fafc'),
                  color: isPremium ? '#f59e0b' : textMuted,
                  border: `1px solid ${isPremium ? 'rgba(245,158,11,0.3)' : (dark ? '#1e293b' : '#e2e8f0')}`,
                }}
              >
                <Lock className="w-4 h-4" />
                Premium
              </button>
            </div>
          </div>

          <div className="rounded-xl border p-4" style={{ background: cardBg, borderColor: cardBorder }}>
            <div className="flex items-center gap-2 mb-2">
              <Code2 className="w-4 h-4" style={{ color: '#0F75BC' }} />
              <h3 className="text-sm font-semibold" style={{ color: textPrimary }}>Custom CSS</h3>
            </div>
            <p className="text-[11px] mb-2" style={{ color: textMuted }}>
              Only loads on this page. Loaded after global CSS so your rules win.
            </p>
            <textarea
              value={customCss}
              onChange={e => setCustomCss(e.target.value)}
              placeholder={`/* Example */\n.rich-content h2 {\n  color: #0F75BC;\n}`}
              rows={8}
              spellCheck={false}
              className="w-full px-3 py-2 rounded-lg text-xs outline-none resize-y font-mono"
              style={{ ...inputStyle, tabSize: 2 }}
            />
            {customCss.trim() && (
              <p className="text-[10px] mt-1.5" style={{ color: '#0F75BC' }}>
                {customCss.length} chars — will inject on publish
              </p>
            )}
          </div>

          <div className="rounded-xl border p-4" style={{ background: cardBg, borderColor: cardBorder }}>
            <div className="flex items-center gap-2 mb-2">
              <Braces className="w-4 h-4" style={{ color: '#0F75BC' }} />
              <h3 className="text-sm font-semibold" style={{ color: textPrimary }}>Custom Schema (JSON-LD)</h3>
            </div>
            <p className="text-[11px] mb-2" style={{ color: textMuted }}>
              Only loads on this page. If set, <strong>replaces</strong> the default Article schema. Use for HowTo, FAQPage, Service, Product, etc.
            </p>
            <textarea
              value={customSchema}
              onChange={e => {
                setCustomSchema(e.target.value)
                if (schemaError) setSchemaError('')
              }}
              onBlur={() => {
                if (!customSchema.trim()) { setSchemaError(''); return }
                try { JSON.parse(customSchema); setSchemaError('') }
                catch (e: any) { setSchemaError(e.message) }
              }}
              placeholder={`{\n  "@context": "https://schema.org",\n  "@type": "FAQPage",\n  "mainEntity": [\n    {\n      "@type": "Question",\n      "name": "What services do you offer?",\n      "acceptedAnswer": {\n        "@type": "Answer",\n        "text": "Web, mobile, software, and digital marketing."\n      }\n    }\n  ]\n}`}
              rows={10}
              spellCheck={false}
              className="w-full px-3 py-2 rounded-lg text-xs outline-none resize-y font-mono"
              style={{ ...inputStyle, tabSize: 2 }}
            />
            {schemaError ? (
              <p className="text-[10px] mt-1.5 text-red-500">Invalid JSON: {schemaError}</p>
            ) : customSchema.trim() ? (
              <p className="text-[10px] mt-1.5" style={{ color: '#0F75BC' }}>
                {customSchema.length} chars — valid JSON, will replace default schema on publish
              </p>
            ) : null}
          </div>

        </div>
      </div>
    </div>
  )
}
