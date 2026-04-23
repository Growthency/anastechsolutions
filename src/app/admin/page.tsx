'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  FileText, CheckCircle2, FileEdit, Eye, BarChart3, ExternalLink,
  Loader2, Plus, TrendingUp, Calendar, ArrowUpRight,
} from 'lucide-react'
import { useTheme } from '@/components/providers/ThemeProvider'

interface Post {
  id: number
  title: string
  slug: string
  status: 'draft' | 'published'
  views: number
  category: string
  created_at: string
  updated_at: string
}

export default function AdminDashboard() {
  const { theme } = useTheme()
  const dark = theme === 'dark'
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    fetch('/api/admin/posts?page=1')
      .then(async r => {
        try {
          return await r.json()
        } catch {
          return { posts: [], total: 0 }
        }
      })
      .then(d => {
        setPosts(Array.isArray(d.posts) ? d.posts : [])
        setTotal(typeof d.total === 'number' ? d.total : 0)
      })
      .catch(() => {
        setPosts([])
        setTotal(0)
      })
      .finally(() => setLoading(false))
  }, [])

  const published = posts.filter(p => p.status === 'published').length
  const drafts = posts.filter(p => p.status === 'draft').length
  const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0)

  const cardBg = dark ? '#1e293b' : '#fff'
  const cardBorder = dark ? '#334155' : '#e2e8f0'
  const textPrimary = dark ? '#fff' : '#0f172a'
  const textMuted = dark ? '#64748b' : '#94a3b8'
  const textSoft = dark ? '#94a3b8' : '#64748b'

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: textPrimary }}>Dashboard</h1>
          <p className="text-sm mt-1" style={{ color: textSoft }}>Overview of your blog activity</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href="/admin/pages/new"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-white transition-all shadow-lg"
            style={{ background: 'linear-gradient(135deg, #0F75BC 0%, #ED1C24 100%)', boxShadow: '0 8px 20px rgba(15,117,188,0.25)' }}
          >
            <Plus className="w-4 h-4" /> New Page
          </Link>
          <a
            href="https://analytics.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-colors"
            style={{ background: dark ? 'rgba(255,255,255,0.05)' : '#f1f5f9', border: `1px solid ${cardBorder}`, color: textPrimary }}
          >
            <BarChart3 className="w-4 h-4" /> Open Google Analytics
            <ExternalLink className="w-3.5 h-3.5" style={{ color: textMuted }} />
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={FileText} label="Total Pages" value={total} color="blue" loading={loading} dark={dark} />
        <StatCard icon={CheckCircle2} label="Published" value={published} color="emerald" loading={loading} dark={dark} />
        <StatCard icon={FileEdit} label="Drafts" value={drafts} color="amber" loading={loading} dark={dark} />
        <StatCard icon={Eye} label="Total Views" value={totalViews} color="purple" loading={loading} dark={dark} />
      </div>

      {/* Analytics callout */}
      <div
        className="rounded-2xl border p-6 mb-8 relative overflow-hidden"
        style={{ background: cardBg, borderColor: cardBorder }}
      >
        <div
          className="absolute -right-20 -top-20 w-64 h-64 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #0F75BC 0%, transparent 70%)' }}
        />
        <div className="relative z-10 flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: 'linear-gradient(135deg, #0F75BC, #ED1C24)' }}
          >
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold mb-1" style={{ color: textPrimary }}>
              Analytics are live
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: textSoft }}>
              Google Analytics (GA4) is wired into every page on anastechsolutions.com. Real-time visitor, geographic, and page performance
              data is available on the official Google Analytics dashboard. Search Console tracks search
              impressions, clicks, and keyword rankings.
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://analytics.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors text-white"
                style={{ background: '#0F75BC' }}
              >
                GA4 Dashboard <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://search.google.com/search-console"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                style={{ background: dark ? 'rgba(255,255,255,0.06)' : '#f1f5f9', border: `1px solid ${cardBorder}`, color: textPrimary }}
              >
                Search Console <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Recent posts */}
      <div className="rounded-2xl border overflow-hidden" style={{ background: cardBg, borderColor: cardBorder }}>
        <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${cardBorder}` }}>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" style={{ color: '#0F75BC' }} />
            <h2 className="font-semibold text-sm" style={{ color: textPrimary }}>Recent Pages</h2>
          </div>
          <Link
            href="/admin/pages"
            className="text-xs font-medium hover:underline"
            style={{ color: '#0F75BC' }}
          >
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin" style={{ color: '#0F75BC' }} />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 px-5">
            <FileText className="w-10 h-10 mx-auto mb-3" style={{ color: textMuted }} />
            <p className="text-sm mb-1" style={{ color: textPrimary }}>No pages yet</p>
            <p className="text-xs mb-4" style={{ color: textSoft }}>Create your first page to get started.</p>
            <Link
              href="/admin/pages/new"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white"
              style={{ background: '#0F75BC' }}
            >
              <Plus className="w-3.5 h-3.5" /> Create page
            </Link>
          </div>
        ) : (
          <ul>
            {posts.slice(0, 8).map((post) => (
              <li key={post.id} className="px-5 py-3 flex items-center gap-4" style={{ borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.04)' : '#f1f5f9'}` }}>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate" style={{ color: textPrimary }}>{post.title}</p>
                  <div className="flex items-center gap-2 mt-0.5 text-[11px]" style={{ color: textSoft }}>
                    <span>{post.category}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-lg font-semibold shrink-0 ring-1 ${
                    post.status === 'published'
                      ? 'bg-emerald-500/10 text-emerald-500 ring-emerald-500/20'
                      : dark
                        ? 'bg-white/[0.04] text-slate-400 ring-white/[0.06]'
                        : 'bg-slate-100 text-slate-500 ring-slate-200'
                  }`}
                >
                  {post.status}
                </span>
                <Link
                  href={`/admin/pages/edit?id=${post.id}`}
                  className="text-xs font-medium shrink-0 hover:underline"
                  style={{ color: '#0F75BC' }}
                >
                  Edit
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function StatCard({
  icon: Icon, label, value, color, loading, dark,
}: {
  icon: any; label: string; value: number; color: string; loading: boolean; dark: boolean
}) {
  const colorMap: Record<string, { bg: string; fg: string }> = {
    blue:    { bg: 'rgba(59,130,246,0.15)',  fg: '#3b82f6' },
    emerald: { bg: 'rgba(16,185,129,0.15)',  fg: '#10b981' },
    amber:   { bg: 'rgba(245,158,11,0.15)',  fg: '#f59e0b' },
    purple:  { bg: 'rgba(168,85,247,0.15)',  fg: '#a855f7' },
  }
  const c = colorMap[color] ?? colorMap.blue
  return (
    <div className="p-5 rounded-xl border" style={{ background: dark ? '#1e293b' : '#fff', borderColor: dark ? '#334155' : '#e2e8f0' }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium" style={{ color: dark ? '#94a3b8' : '#64748b' }}>{label}</span>
        <div className="p-1.5 rounded-lg" style={{ background: c.bg, color: c.fg }}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <p className="text-2xl font-bold" style={{ color: dark ? '#fff' : '#0f172a' }}>
        {loading ? '—' : value.toLocaleString()}
      </p>
    </div>
  )
}
