'use client'
import { useEffect, useMemo, useState } from 'react'
import {
  BarChart3, Users, UserPlus, Globe2, MousePointerClick, Eye,
  Activity, TrendingUp, AlertCircle, Loader2, CheckCircle2,
  LineChart as LineChartIcon, FileText, Search,
} from 'lucide-react'
import { useTheme } from '@/components/providers/ThemeProvider'

interface DailyPoint { date: string; value: number }
interface TopItem { label: string; value: number; extra?: string }
interface SearchRow {
  key: string; clicks: number; impressions: number; ctr: number; position: number
}
interface Snapshot {
  users30d: number; users7d: number; usersToday: number; newUsers30d: number
  sessions30d: number; pageViews30d: number; activeUsersTotal: number
  dailyActiveUsers: DailyPoint[]
  topPages: TopItem[]
  topCountries: TopItem[]
  searchKeywords: SearchRow[]
  searchPages: SearchRow[]
  errors: string[]
}
interface ApiResponse {
  ga4Connected: boolean
  gscConnected: boolean
  snapshot: Snapshot
}

export default function AnalyticsPage() {
  const { theme } = useTheme()
  const dark = theme === 'dark'
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let aborted = false
    setLoading(true)
    fetch('/api/admin/analytics', { cache: 'no-store' })
      .then(async r => {
        try { return await r.json() } catch { return null }
      })
      .then(d => { if (!aborted) setData(d) })
      .catch(() => { if (!aborted) setData(null) })
      .finally(() => { if (!aborted) setLoading(false) })
    return () => { aborted = true }
  }, [])

  const cardBg = dark ? '#1e293b' : '#fff'
  const cardBorder = dark ? '#334155' : '#e2e8f0'
  const textPrimary = dark ? '#fff' : '#0f172a'
  const textMuted = dark ? '#64748b' : '#94a3b8'
  const textSoft = dark ? '#94a3b8' : '#64748b'

  const snap = data?.snapshot
  const ga4 = !!data?.ga4Connected
  const gsc = !!data?.gscConnected

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: textPrimary }}>Analytics</h1>
          <p className="text-sm mt-1" style={{ color: textSoft }}>
            Real-time data from Google Analytics &amp; Search Console
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <ConnPill ok={ga4} label="GA4" dark={dark} />
          <ConnPill ok={gsc} label="Search Console" dark={dark} />
        </div>
      </div>

      {!loading && snap?.errors?.length ? (
        <div
          className="rounded-xl border p-4 mb-6 flex items-start gap-3"
          style={{
            background: dark ? 'rgba(245,158,11,0.08)' : '#fffbeb',
            borderColor: dark ? 'rgba(245,158,11,0.3)' : '#fde68a',
          }}
        >
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#f59e0b' }} />
          <div className="text-[13px] leading-relaxed" style={{ color: dark ? '#fbbf24' : '#92400e' }}>
            <p className="font-semibold mb-1">Some data sources aren&apos;t connected yet</p>
            <ul className="list-disc list-inside space-y-0.5">
              {snap.errors.map((e, i) => <li key={i}>{e}</li>)}
            </ul>
          </div>
        </div>
      ) : null}

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <KpiCard icon={Users} label="Users (30d)" value={snap?.users30d} loading={loading} dark={dark} color="blue" />
        <KpiCard icon={Activity} label="Users (7d)" value={snap?.users7d} loading={loading} dark={dark} color="indigo" />
        <KpiCard icon={TrendingUp} label="Today" value={snap?.usersToday} loading={loading} dark={dark} color="emerald" />
        <KpiCard icon={UserPlus} label="New Users (30d)" value={snap?.newUsers30d} loading={loading} dark={dark} color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <KpiCard icon={MousePointerClick} label="Sessions (30d)" value={snap?.sessions30d} loading={loading} dark={dark} color="amber" />
        <KpiCard icon={Eye} label="Page Views (30d)" value={snap?.pageViews30d} loading={loading} dark={dark} color="rose" />
        <KpiCard icon={BarChart3} label="Total Active Users" value={snap?.activeUsersTotal} loading={loading} dark={dark} color="teal" />
      </div>

      {/* Chart */}
      <div className="rounded-2xl border p-5 mb-6" style={{ background: cardBg, borderColor: cardBorder }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <LineChartIcon className="w-4 h-4" style={{ color: '#0F75BC' }} />
            <h2 className="font-semibold text-sm" style={{ color: textPrimary }}>
              Daily Active Users — Last 30 Days
            </h2>
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: textMuted }}>
            from Google Analytics
          </span>
        </div>
        <DailyBarChart points={snap?.dailyActiveUsers ?? []} loading={loading} dark={dark} />
      </div>

      {/* Top pages + countries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <RankCard
          title="Top 25 Pages"
          subtitle="by pageviews"
          icon={FileText}
          items={snap?.topPages ?? []}
          loading={loading}
          dark={dark}
          accent="#0F75BC"
        />
        <RankCard
          title="Top 25 Countries"
          subtitle="by active users"
          icon={Globe2}
          items={snap?.topCountries ?? []}
          loading={loading}
          dark={dark}
          accent="#ED1C24"
        />
      </div>

      {/* Search Console tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SearchTable
          title="Top 25 Search Keywords"
          subtitle="Google Search Console"
          icon={Search}
          column="KEYWORD"
          rows={snap?.searchKeywords ?? []}
          loading={loading}
          dark={dark}
        />
        <SearchTable
          title="Top 25 Search Pages"
          subtitle="by clicks"
          icon={FileText}
          column="PAGE"
          rows={snap?.searchPages ?? []}
          loading={loading}
          dark={dark}
        />
      </div>
    </div>
  )
}

function ConnPill({ ok, label, dark }: { ok: boolean; label: string; dark: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold"
      style={{
        background: ok ? 'rgba(16,185,129,0.12)' : (dark ? 'rgba(255,255,255,0.06)' : '#f1f5f9'),
        color: ok ? '#10b981' : (dark ? '#94a3b8' : '#64748b'),
        border: `1px solid ${ok ? 'rgba(16,185,129,0.25)' : (dark ? 'rgba(255,255,255,0.08)' : '#e2e8f0')}`,
      }}
    >
      {ok ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
      {label} {ok ? 'Connected' : 'Not Connected'}
    </span>
  )
}

function KpiCard({
  icon: Icon, label, value, loading, dark, color,
}: {
  icon: any; label: string; value: number | undefined
  loading: boolean; dark: boolean; color: string
}) {
  const colors: Record<string, { bg: string; fg: string }> = {
    blue:    { bg: 'rgba(59,130,246,0.15)',  fg: '#3b82f6' },
    indigo:  { bg: 'rgba(99,102,241,0.15)',  fg: '#6366f1' },
    emerald: { bg: 'rgba(16,185,129,0.15)',  fg: '#10b981' },
    purple:  { bg: 'rgba(168,85,247,0.15)',  fg: '#a855f7' },
    amber:   { bg: 'rgba(245,158,11,0.15)',  fg: '#f59e0b' },
    rose:    { bg: 'rgba(244,63,94,0.15)',   fg: '#f43f5e' },
    teal:    { bg: 'rgba(20,184,166,0.15)',  fg: '#14b8a6' },
  }
  const c = colors[color] ?? colors.blue
  return (
    <div
      className="p-5 rounded-2xl border"
      style={{ background: dark ? '#1e293b' : '#fff', borderColor: dark ? '#334155' : '#e2e8f0' }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: dark ? '#94a3b8' : '#64748b' }}>
          {label}
        </span>
        <div className="p-1.5 rounded-lg" style={{ background: c.bg, color: c.fg }}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <p className="text-3xl font-bold" style={{ color: dark ? '#fff' : '#0f172a' }}>
        {loading ? '—' : (value ?? 0).toLocaleString()}
      </p>
    </div>
  )
}

function DailyBarChart({ points, loading, dark }: { points: DailyPoint[]; loading: boolean; dark: boolean }) {
  const max = useMemo(() => Math.max(1, ...points.map(p => p.value)), [points])
  if (loading) {
    return (
      <div className="h-48 flex items-center justify-center">
        <Loader2 className="w-5 h-5 animate-spin" style={{ color: '#0F75BC' }} />
      </div>
    )
  }
  if (!points.length) {
    return (
      <div className="h-48 flex items-center justify-center">
        <p className="text-sm" style={{ color: dark ? '#64748b' : '#94a3b8' }}>No data yet</p>
      </div>
    )
  }
  return (
    <div>
      <div className="h-48 flex items-end gap-1">
        {points.map(p => {
          const pct = Math.max(2, Math.round((p.value / max) * 100))
          return (
            <div
              key={p.date}
              className="flex-1 rounded-t-md transition-all"
              style={{ height: `${pct}%`, background: 'linear-gradient(to top, #0F75BC, #6ea8d8)' }}
              title={`${p.date}: ${p.value}`}
            />
          )
        })}
      </div>
      <div className="flex justify-between mt-2 text-[10px]" style={{ color: dark ? '#64748b' : '#94a3b8' }}>
        <span>{points[0]?.date}</span>
        <span>{points[points.length - 1]?.date}</span>
      </div>
    </div>
  )
}

function RankCard({
  title, subtitle, icon: Icon, items, loading, dark, accent,
}: {
  title: string; subtitle: string; icon: any; items: TopItem[]
  loading: boolean; dark: boolean; accent: string
}) {
  const cardBg = dark ? '#1e293b' : '#fff'
  const cardBorder = dark ? '#334155' : '#e2e8f0'
  const textPrimary = dark ? '#fff' : '#0f172a'
  const textMuted = dark ? '#64748b' : '#94a3b8'
  const textSoft = dark ? '#94a3b8' : '#64748b'
  const max = Math.max(1, ...items.map(i => i.value))

  return (
    <div className="rounded-2xl border overflow-hidden" style={{ background: cardBg, borderColor: cardBorder }}>
      <div className="px-5 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${cardBorder}` }}>
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4" style={{ color: accent }} />
          <h3 className="font-semibold text-sm" style={{ color: textPrimary }}>{title}</h3>
        </div>
        <span className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: textMuted }}>{subtitle}</span>
      </div>
      {loading ? (
        <div className="py-10 flex justify-center">
          <Loader2 className="w-5 h-5 animate-spin" style={{ color: accent }} />
        </div>
      ) : items.length === 0 ? (
        <div className="py-10 text-center text-sm" style={{ color: textSoft }}>No data</div>
      ) : (
        <ul className="divide-y" style={{ borderColor: dark ? 'rgba(255,255,255,0.04)' : '#f1f5f9' }}>
          {items.map((item, i) => {
            const pct = Math.round((item.value / max) * 100)
            return (
              <li key={i} className="px-5 py-2.5" style={{ borderBottom: i < items.length - 1 ? `1px solid ${dark ? 'rgba(255,255,255,0.04)' : '#f1f5f9'}` : undefined }}>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold shrink-0 w-6" style={{ color: accent }}>
                    #{i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-medium truncate" style={{ color: textPrimary }}>{item.label}</p>
                    {item.extra ? (
                      <p className="text-[11px] truncate" style={{ color: textSoft }}>{item.extra}</p>
                    ) : null}
                    <div className="h-1 mt-1.5 rounded-full overflow-hidden" style={{ background: dark ? 'rgba(255,255,255,0.04)' : '#f1f5f9' }}>
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: accent }} />
                    </div>
                  </div>
                  <span className="text-[12px] font-semibold tabular-nums shrink-0" style={{ color: textPrimary }}>
                    {item.value.toLocaleString()}
                  </span>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

function SearchTable({
  title, subtitle, icon: Icon, column, rows, loading, dark,
}: {
  title: string; subtitle: string; icon: any; column: string
  rows: SearchRow[]; loading: boolean; dark: boolean
}) {
  const cardBg = dark ? '#1e293b' : '#fff'
  const cardBorder = dark ? '#334155' : '#e2e8f0'
  const textPrimary = dark ? '#fff' : '#0f172a'
  const textMuted = dark ? '#64748b' : '#94a3b8'
  const textSoft = dark ? '#94a3b8' : '#64748b'

  return (
    <div className="rounded-2xl border overflow-hidden" style={{ background: cardBg, borderColor: cardBorder }}>
      <div className="px-5 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${cardBorder}` }}>
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4" style={{ color: '#0F75BC' }} />
          <h3 className="font-semibold text-sm" style={{ color: textPrimary }}>{title}</h3>
        </div>
        <span className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: textMuted }}>{subtitle}</span>
      </div>
      {loading ? (
        <div className="py-10 flex justify-center">
          <Loader2 className="w-5 h-5 animate-spin" style={{ color: '#0F75BC' }} />
        </div>
      ) : rows.length === 0 ? (
        <div className="py-10 text-center text-sm" style={{ color: textSoft }}>No data</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr style={{ color: textMuted, background: dark ? 'rgba(255,255,255,0.02)' : '#f8fafc' }}>
                <th className="px-4 py-2 text-left font-semibold w-8">#</th>
                <th className="px-4 py-2 text-left font-semibold">{column}</th>
                <th className="px-4 py-2 text-right font-semibold">CLICKS</th>
                <th className="px-4 py-2 text-right font-semibold">IMPR.</th>
                <th className="px-4 py-2 text-right font-semibold">CTR</th>
                <th className="px-4 py-2 text-right font-semibold">POS.</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} style={{ borderTop: `1px solid ${dark ? 'rgba(255,255,255,0.04)' : '#f1f5f9'}` }}>
                  <td className="px-4 py-2 font-bold" style={{ color: '#0F75BC' }}>#{i + 1}</td>
                  <td className="px-4 py-2 max-w-[220px] truncate" style={{ color: textPrimary }}>{r.key}</td>
                  <td className="px-4 py-2 text-right tabular-nums" style={{ color: textPrimary }}>{r.clicks.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right tabular-nums" style={{ color: textSoft }}>{r.impressions.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right tabular-nums" style={{ color: textSoft }}>{(r.ctr * 100).toFixed(1)}%</td>
                  <td className="px-4 py-2 text-right tabular-nums" style={{ color: textSoft }}>{r.position.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
