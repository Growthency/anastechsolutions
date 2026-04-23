'use client'
import { useState, useEffect, useMemo } from 'react'
import { Link2, Copy, Check, ChevronDown, ChevronUp, Loader2, Zap, Plus } from 'lucide-react'
import { useTheme } from '@/components/providers/ThemeProvider'

interface InterlinkCheckerProps {
  content: string
  currentSlug?: string
  onContentChange?: (newHtml: string) => void
}

interface ArticleEntry {
  slug: string
  title: string
  keywords: string[]
}

// No hardcoded articles — interlinks are sourced entirely from the published
// pages fetched via /api/admin/posts.
const STATIC_ARTICLES: ArticleEntry[] = []

function stripHtml(html: string): string {
  const div = document.createElement('div')
  div.innerHTML = html
  return (div.textContent || div.innerText || '').toLowerCase()
}

function getExistingLinks(html: string): string[] {
  const div = document.createElement('div')
  div.innerHTML = html
  const anchors = div.querySelectorAll('a[href]')
  const hrefs: string[] = []
  anchors.forEach(a => {
    const href = a.getAttribute('href') || ''
    hrefs.push(href)
  })
  return hrefs
}

interface InterlinkMatch {
  keyword: string
  slug: string
  title: string
}

const SKIP_TAGS = new Set([
  'A', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
  'CODE', 'PRE', 'SCRIPT', 'STYLE',
])

function wrapFirstMatch(root: Node, regex: RegExp, slug: string): boolean {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      let el: Element | null = node.parentElement
      while (el) {
        if (SKIP_TAGS.has(el.tagName)) return NodeFilter.FILTER_REJECT
        el = el.parentElement
      }
      return NodeFilter.FILTER_ACCEPT
    },
  })

  let textNode = walker.nextNode() as Text | null
  while (textNode) {
    const text = textNode.nodeValue || ''
    const m = text.match(regex)
    if (m && m.index !== undefined) {
      const before = text.slice(0, m.index)
      const matched = m[0]
      const after = text.slice(m.index + matched.length)

      const frag = document.createDocumentFragment()
      if (before) frag.appendChild(document.createTextNode(before))
      const a = document.createElement('a')
      a.setAttribute('href', slug)
      a.textContent = matched
      frag.appendChild(a)
      if (after) frag.appendChild(document.createTextNode(after))

      textNode.parentNode!.replaceChild(frag, textNode)
      return true
    }
    textNode = walker.nextNode() as Text | null
  }
  return false
}

function applyInterlinks(html: string, matches: InterlinkMatch[]): string {
  if (!html || matches.length === 0) return html

  const container = document.createElement('div')
  container.innerHTML = html

  for (const match of matches) {
    const escaped = match.keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`\\b(${escaped})\\b`, 'i')
    wrapFirstMatch(container, regex, match.slug)
  }

  return container.innerHTML
}

export default function InterlinkChecker({ content, currentSlug, onContentChange }: InterlinkCheckerProps) {
  const { theme } = useTheme()
  const dark = theme === 'dark'

  const [dynamicArticles, setDynamicArticles] = useState<ArticleEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(true)
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null)
  const [appliedSlug, setAppliedSlug] = useState<string | null>(null)
  const [applyingAll, setApplyingAll] = useState(false)

  useEffect(() => {
    fetch('/api/admin/posts')
      .then(r => r.json())
      .then(data => {
        const posts = data.posts || []
        const entries: ArticleEntry[] = posts
          .filter((p: any) => p.status === 'published')
          .map((p: any) => {
            const slug = p.slug.startsWith('/') ? p.slug : `/${p.slug}`
            const keywords = [
              p.title.toLowerCase(),
              ...slug.replace(/^\//, '').split('-').length > 1
                ? [slug.replace(/^\//, '').replace(/-/g, ' ')]
                : [],
            ]
            return { slug, title: p.title, keywords }
          })
        setDynamicArticles(entries)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const allArticles = useMemo(() => {
    const slugSet = new Set(STATIC_ARTICLES.map(a => a.slug))
    const merged = [...STATIC_ARTICLES]
    for (const da of dynamicArticles) {
      if (!slugSet.has(da.slug)) {
        merged.push(da)
        slugSet.add(da.slug)
      }
    }
    return merged
  }, [dynamicArticles])

  const matches = useMemo(() => {
    if (!content || content.trim().length < 10) return []

    const plainText = stripHtml(content)
    const existingLinks = getExistingLinks(content)

    const found: InterlinkMatch[] = []
    const matchedSlugs = new Set<string>()

    const normCurrent = currentSlug
      ? (currentSlug.startsWith('/') ? currentSlug : `/${currentSlug}`)
      : null

    for (const article of allArticles) {
      if (normCurrent && article.slug === normCurrent) continue
      if (existingLinks.some(href => href.includes(article.slug))) continue
      if (matchedSlugs.has(article.slug)) continue

      for (const keyword of article.keywords) {
        if (keyword.length < 3) continue
        const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const regex = new RegExp(`\\b${escaped}\\b`, 'i')
        if (regex.test(plainText)) {
          found.push({
            keyword,
            slug: article.slug,
            title: article.title,
          })
          matchedSlugs.add(article.slug)
          break
        }
      }
    }

    return found
  }, [content, allArticles, currentSlug])

  const handleApply = (match: InterlinkMatch) => {
    if (!onContentChange) return
    const newHtml = applyInterlinks(content, [match])
    if (newHtml !== content) {
      onContentChange(newHtml)
      setAppliedSlug(match.slug)
      setTimeout(() => setAppliedSlug(null), 2000)
    }
  }

  const handleApplyAll = () => {
    if (!onContentChange || matches.length === 0) return
    setApplyingAll(true)
    requestAnimationFrame(() => {
      const newHtml = applyInterlinks(content, matches)
      onContentChange(newHtml)
      setApplyingAll(false)
    })
  }

  const handleCopy = async (slug: string) => {
    const url = `https://anastechsolutions.com${slug}`
    try {
      await navigator.clipboard.writeText(url)
      setCopiedSlug(slug)
      setTimeout(() => setCopiedSlug(null), 2000)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = url
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopiedSlug(slug)
      setTimeout(() => setCopiedSlug(null), 2000)
    }
  }

  const cardBg = dark ? '#1e293b' : '#fff'
  const cardBorder = dark ? '#334155' : '#e2e8f0'
  const textPrimary = dark ? '#fff' : '#0f172a'
  const textLabel = dark ? '#94a3b8' : '#64748b'
  const itemBg = dark ? '#0f172a' : '#f8fafc'
  const itemBorder = dark ? '#1e293b' : '#e2e8f0'

  return (
    <div className="rounded-xl border p-4" style={{ background: cardBg, borderColor: cardBorder }}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full"
      >
        <div className="flex items-center gap-2">
          <Link2 className="w-4 h-4" style={{ color: '#0F75BC' }} />
          <h3 className="text-sm font-semibold" style={{ color: textPrimary }}>Interlink Checker</h3>
          {matches.length > 0 && (
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold" style={{ background: 'rgba(15,117,188,0.15)', color: '#0F75BC' }}>
              {matches.length}
            </span>
          )}
        </div>
        {expanded
          ? <ChevronUp className="w-4 h-4" style={{ color: textLabel }} />
          : <ChevronDown className="w-4 h-4" style={{ color: textLabel }} />
        }
      </button>

      {expanded && (
        <div className="mt-3">
          {loading ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="w-4 h-4 animate-spin" style={{ color: '#0F75BC' }} />
              <span className="ml-2 text-xs" style={{ color: textLabel }}>Scanning articles...</span>
            </div>
          ) : matches.length === 0 ? (
            <p className="text-xs py-2" style={{ color: textLabel }}>
              {content.trim().length < 10
                ? 'Start writing to see interlink suggestions.'
                : 'No interlink opportunities found. All relevant articles are already linked or no keyword matches detected.'}
            </p>
          ) : (
            <>
              <div className="flex items-center justify-between mb-3 gap-2">
                <p className="text-xs" style={{ color: textLabel }}>
                  {matches.length} interlink {matches.length === 1 ? 'opportunity' : 'opportunities'} found
                </p>
                {onContentChange && (
                  <button
                    onClick={handleApplyAll}
                    disabled={applyingAll}
                    className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-semibold text-white transition disabled:opacity-50"
                    style={{ background: '#0F75BC' }}
                    title={`Insert all ${matches.length} interlinks into the content`}
                  >
                    {applyingAll
                      ? <Loader2 className="w-3 h-3 animate-spin" />
                      : <Zap className="w-3 h-3" />
                    }
                    Approve all ({matches.length})
                  </button>
                )}
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {matches.map((m) => (
                  <div
                    key={m.slug}
                    className="rounded-lg p-2.5 text-xs"
                    style={{ background: itemBg, border: `1px solid ${itemBorder}` }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p style={{ color: textLabel }}>
                          Content mentions <span className="font-semibold" style={{ color: '#0F75BC' }}>&quot;{m.keyword}&quot;</span>
                        </p>
                        <p className="mt-1 font-medium truncate" style={{ color: textPrimary }}>
                          {m.title}
                        </p>
                        <p className="truncate mt-0.5" style={{ color: 'rgba(15,117,188,0.7)' }}>{m.slug}</p>
                      </div>
                      <div className="shrink-0 flex items-center gap-1">
                        {onContentChange && (
                          <button
                            onClick={() => handleApply(m)}
                            className="p-1.5 rounded-md transition-colors"
                            style={{
                              background: appliedSlug === m.slug ? 'rgba(15,117,188,0.15)' : 'rgba(15,117,188,0.08)',
                              color: '#0F75BC',
                            }}
                            title="Insert this interlink into the content"
                          >
                            {appliedSlug === m.slug
                              ? <Check className="w-3.5 h-3.5" />
                              : <Plus className="w-3.5 h-3.5" />
                            }
                          </button>
                        )}
                        <button
                          onClick={() => handleCopy(m.slug)}
                          className="p-1.5 rounded-md transition-colors"
                          style={{
                            background: copiedSlug === m.slug ? 'rgba(15,117,188,0.15)' : (dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'),
                            color: copiedSlug === m.slug ? '#0F75BC' : textLabel,
                          }}
                          title="Copy full URL"
                        >
                          {copiedSlug === m.slug
                            ? <Check className="w-3.5 h-3.5" />
                            : <Copy className="w-3.5 h-3.5" />
                          }
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
