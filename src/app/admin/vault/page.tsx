'use client'
import { useEffect, useMemo, useState, useCallback } from 'react'
import {
  Lock, Plus, Search, Eye, EyeOff, Copy, Pencil, Trash2, Globe,
  Loader2, X, ExternalLink, Check, KeyRound, User as UserIcon, StickyNote,
} from 'lucide-react'
import { useTheme } from '@/components/providers/ThemeProvider'
import { useModal } from '@/components/admin/AdminModal'
import { toast } from 'sonner'

interface Credential {
  id: number
  site_name: string
  site_url: string
  username: string
  password: string
  notes: string
  created_at: string
  updated_at: string
}

interface FormState {
  id: number | null
  site_name: string
  site_url: string
  username: string
  password: string
  notes: string
}

const EMPTY_FORM: FormState = {
  id: null, site_name: '', site_url: '', username: '', password: '', notes: '',
}

export default function VaultPage() {
  const { theme } = useTheme()
  const dark = theme === 'dark'
  const { showConfirm } = useModal()
  const [items, setItems] = useState<Credential[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [revealedIds, setRevealedIds] = useState<Set<number>>(new Set())
  const [revealedValues, setRevealedValues] = useState<Record<number, string>>({})

  const reload = useCallback(async () => {
    try {
      const r = await fetch('/api/admin/credentials', { cache: 'no-store' })
      if (!r.ok) {
        setItems([])
        return
      }
      const d = await r.json().catch(() => ({ items: [] }))
      setItems(Array.isArray(d.items) ? d.items : [])
    } catch {
      setItems([])
    }
  }, [])

  useEffect(() => {
    setLoading(true)
    reload().finally(() => setLoading(false))
  }, [reload])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return items
    return items.filter(
      i =>
        i.site_name.toLowerCase().includes(q) ||
        i.site_url.toLowerCase().includes(q) ||
        i.username.toLowerCase().includes(q) ||
        i.notes.toLowerCase().includes(q),
    )
  }, [items, search])

  const openNew = () => {
    setForm(EMPTY_FORM)
    setFormOpen(true)
  }

  const openEdit = (c: Credential) => {
    setForm({
      id: c.id,
      site_name: c.site_name,
      site_url: c.site_url,
      username: c.username,
      password: '',
      notes: c.notes,
    })
    setFormOpen(true)
  }

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.site_name.trim()) {
      toast.error('Site name is required')
      return
    }
    if (!form.id && !form.password) {
      toast.error('Password is required')
      return
    }
    setSaving(true)
    try {
      const method = form.id ? 'PATCH' : 'POST'
      const body: any = {
        site_name: form.site_name,
        site_url: form.site_url,
        username: form.username,
        notes: form.notes,
      }
      if (form.id) body.id = form.id
      if (form.password) body.password = form.password
      const r = await fetch('/api/admin/credentials', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const d = await r.json().catch(() => ({}))
      if (!r.ok) {
        toast.error(d.error || 'Save failed')
        return
      }
      toast.success(form.id ? 'Credential updated' : 'Credential added')
      setFormOpen(false)
      setForm(EMPTY_FORM)
      await reload()
    } finally {
      setSaving(false)
    }
  }

  const remove = async (c: Credential) => {
    const ok = await showConfirm(
      'Delete credential?',
      `Remove "${c.site_name}" from the vault. This cannot be undone.`,
      'danger',
    )
    if (!ok) return
    const r = await fetch(`/api/admin/credentials?id=${c.id}`, { method: 'DELETE' })
    if (!r.ok) {
      toast.error('Delete failed')
      return
    }
    toast.success('Credential deleted')
    setItems(prev => prev.filter(x => x.id !== c.id))
    setRevealedIds(s => { const n = new Set(s); n.delete(c.id); return n })
    setRevealedValues(v => { const n = { ...v }; delete n[c.id]; return n })
  }

  const toggleReveal = async (c: Credential) => {
    if (revealedIds.has(c.id)) {
      setRevealedIds(s => { const n = new Set(s); n.delete(c.id); return n })
      return
    }
    if (revealedValues[c.id] !== undefined) {
      setRevealedIds(s => new Set(s).add(c.id))
      return
    }
    const r = await fetch(`/api/admin/credentials?id=${c.id}&reveal=1`, { cache: 'no-store' })
    if (!r.ok) {
      toast.error('Could not reveal password')
      return
    }
    const d = await r.json().catch(() => ({ item: null }))
    const pw = d.item?.password ?? ''
    setRevealedValues(v => ({ ...v, [c.id]: pw }))
    setRevealedIds(s => new Set(s).add(c.id))
  }

  const copyPassword = async (c: Credential) => {
    let pw = revealedValues[c.id]
    if (pw === undefined) {
      const r = await fetch(`/api/admin/credentials?id=${c.id}&reveal=1`, { cache: 'no-store' })
      if (!r.ok) {
        toast.error('Could not fetch password')
        return
      }
      const d = await r.json().catch(() => ({ item: null }))
      pw = d.item?.password ?? ''
      setRevealedValues(v => ({ ...v, [c.id]: pw! }))
    }
    try {
      await navigator.clipboard.writeText(pw || '')
      toast.success('Password copied')
    } catch {
      toast.error('Clipboard blocked')
    }
  }

  const copyUsername = async (c: Credential) => {
    if (!c.username) return
    try {
      await navigator.clipboard.writeText(c.username)
      toast.success('Username copied')
    } catch {}
  }

  const textPrimary = dark ? '#fff' : '#0f172a'
  const textSoft = dark ? '#94a3b8' : '#64748b'
  const textMuted = dark ? '#64748b' : '#94a3b8'
  const cardBg = dark ? '#1e293b' : '#fff'
  const cardBorder = dark ? '#334155' : '#e2e8f0'
  const inputBg = dark ? 'rgba(15,23,42,0.5)' : '#f8fafc'
  const inputBorder = dark ? '#334155' : '#e2e8f0'

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: textPrimary }}>
            Secure Vault <Lock className="w-5 h-5" style={{ color: '#ED1C24' }} />
          </h1>
          <p className="text-sm mt-1" style={{ color: textSoft }}>
            Securely manage company logins and access keys.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: textMuted }} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search credentials..."
              className="pl-9 pr-3 py-2.5 rounded-xl text-[13px] w-[260px] outline-none transition-all"
              style={{
                background: cardBg,
                border: `1px solid ${cardBorder}`,
                color: textPrimary,
              }}
            />
          </div>
          <button
            onClick={openNew}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-white transition-all shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #0F75BC 0%, #ED1C24 100%)',
              boxShadow: '0 8px 20px rgba(15,117,188,0.25)',
            }}
          >
            <Plus className="w-4 h-4" /> Add New
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin" style={{ color: '#0F75BC' }} />
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="rounded-2xl border p-12 text-center"
          style={{ background: cardBg, borderColor: cardBorder }}
        >
          <Lock className="w-10 h-10 mx-auto mb-3" style={{ color: textMuted }} />
          <p className="text-sm mb-1" style={{ color: textPrimary }}>
            {search ? 'No matches found' : 'Vault is empty'}
          </p>
          <p className="text-xs mb-4" style={{ color: textSoft }}>
            {search ? 'Try a different search term.' : 'Add your first credential to get started.'}
          </p>
          {!search && (
            <button
              onClick={openNew}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white"
              style={{ background: '#0F75BC' }}
            >
              <Plus className="w-3.5 h-3.5" /> Add credential
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(c => (
            <CredCard
              key={c.id}
              c={c}
              dark={dark}
              revealed={revealedIds.has(c.id)}
              revealedPw={revealedValues[c.id]}
              onToggleReveal={() => toggleReveal(c)}
              onCopyPw={() => copyPassword(c)}
              onCopyUser={() => copyUsername(c)}
              onEdit={() => openEdit(c)}
              onDelete={() => remove(c)}
            />
          ))}
        </div>
      )}

      {formOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }}
          onClick={() => !saving && setFormOpen(false)}
        >
          <form
            onClick={e => e.stopPropagation()}
            onSubmit={submitForm}
            className="w-full max-w-lg rounded-2xl shadow-2xl"
            style={{
              background: dark ? '#0c1120' : '#fff',
              border: `1px solid ${cardBorder}`,
              boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
            }}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: cardBorder }}>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0F75BC, #ED1C24)' }}>
                  <Lock className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold" style={{ color: textPrimary }}>
                    {form.id ? 'Edit credential' : 'Add credential'}
                  </h3>
                  <p className="text-[11px]" style={{ color: textSoft }}>
                    Encrypted with AES-256-GCM at rest
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="p-1.5 rounded-lg hover:bg-black/5"
                style={{ color: textMuted }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-5 py-4 space-y-3">
              <FormField label="Site name *" icon={Globe} dark={dark}>
                <input
                  type="text"
                  required
                  autoFocus
                  value={form.site_name}
                  onChange={e => setForm(f => ({ ...f, site_name: e.target.value }))}
                  placeholder="e.g. GoDaddy, GitHub, AWS"
                  className="w-full bg-transparent outline-none text-sm"
                  style={{ color: textPrimary }}
                />
              </FormField>
              <FormField label="Site URL" icon={ExternalLink} dark={dark}>
                <input
                  type="url"
                  value={form.site_url}
                  onChange={e => setForm(f => ({ ...f, site_url: e.target.value }))}
                  placeholder="https://..."
                  className="w-full bg-transparent outline-none text-sm"
                  style={{ color: textPrimary }}
                />
              </FormField>
              <FormField label="Username / Email" icon={UserIcon} dark={dark}>
                <input
                  type="text"
                  value={form.username}
                  onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                  placeholder="user@example.com"
                  className="w-full bg-transparent outline-none text-sm"
                  style={{ color: textPrimary }}
                />
              </FormField>
              <FormField
                label={form.id ? 'Password (leave blank to keep current)' : 'Password *'}
                icon={KeyRound}
                dark={dark}
              >
                <input
                  type="text"
                  required={!form.id}
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="w-full bg-transparent outline-none text-sm font-mono"
                  style={{ color: textPrimary }}
                />
              </FormField>
              <FormField label="Notes" icon={StickyNote} dark={dark}>
                <textarea
                  rows={2}
                  value={form.notes}
                  onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  placeholder="Optional extra info (API key, recovery codes, etc.)"
                  className="w-full bg-transparent outline-none text-sm resize-none"
                  style={{ color: textPrimary }}
                />
              </FormField>
            </div>

            <div className="flex items-center justify-end gap-2 px-5 py-4 border-t" style={{ borderColor: cardBorder }}>
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                disabled={saving}
                className="px-4 py-2 rounded-xl text-[13px] font-semibold transition-colors disabled:opacity-50"
                style={{
                  background: dark ? 'rgba(255,255,255,0.04)' : '#f1f5f9',
                  color: textSoft,
                  border: `1px solid ${cardBorder}`,
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2 rounded-xl text-[13px] font-semibold text-white transition-all shadow-lg disabled:opacity-50 flex items-center gap-2"
                style={{ background: 'linear-gradient(135deg, #0F75BC, #ED1C24)' }}
              >
                {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {form.id ? 'Save changes' : 'Add to vault'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

function FormField({
  label, icon: Icon, children, dark,
}: {
  label: string; icon: any; children: React.ReactNode; dark: boolean
}) {
  const labelColor = dark ? '#94a3b8' : '#64748b'
  const border = dark ? '#334155' : '#e2e8f0'
  const bg = dark ? 'rgba(15,23,42,0.5)' : '#f8fafc'
  return (
    <div>
      <label className="text-[11px] font-semibold uppercase tracking-wider mb-1.5 block" style={{ color: labelColor }}>
        {label}
      </label>
      <div
        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border focus-within:ring-2 focus-within:ring-blue-500/20 transition-all"
        style={{ background: bg, borderColor: border }}
      >
        <Icon className="w-4 h-4 shrink-0" style={{ color: labelColor }} />
        {children}
      </div>
    </div>
  )
}

function CredCard({
  c, dark, revealed, revealedPw, onToggleReveal, onCopyPw, onCopyUser, onEdit, onDelete,
}: {
  c: Credential; dark: boolean; revealed: boolean; revealedPw: string | undefined
  onToggleReveal: () => void; onCopyPw: () => void; onCopyUser: () => void
  onEdit: () => void; onDelete: () => void
}) {
  const [hostIcon, setHostIcon] = useState<string | null>(null)
  useEffect(() => {
    if (!c.site_url) { setHostIcon(null); return }
    try {
      const u = new URL(c.site_url)
      setHostIcon(`https://www.google.com/s2/favicons?domain=${u.hostname}&sz=64`)
    } catch { setHostIcon(null) }
  }, [c.site_url])

  const cardBg = dark ? '#1e293b' : '#fff'
  const cardBorder = dark ? '#334155' : '#e2e8f0'
  const textPrimary = dark ? '#fff' : '#0f172a'
  const textSoft = dark ? '#94a3b8' : '#64748b'
  const textMuted = dark ? '#64748b' : '#94a3b8'
  const fieldBg = dark ? 'rgba(15,23,42,0.5)' : '#f8fafc'

  const maskedPw = '••••••••••••'
  const displayPw = revealed ? (revealedPw ?? '…') : maskedPw

  return (
    <div
      className="rounded-2xl border p-4 relative overflow-hidden transition-all hover:shadow-lg"
      style={{ background: cardBg, borderColor: cardBorder }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: 'linear-gradient(90deg, #0F75BC, #ED1C24)' }}
      />

      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 overflow-hidden"
          style={{ background: dark ? 'rgba(15,117,188,0.12)' : 'rgba(15,117,188,0.08)' }}
        >
          {hostIcon ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={hostIcon} alt="" className="w-6 h-6" onError={() => setHostIcon(null)} />
          ) : (
            <Globe className="w-5 h-5" style={{ color: '#0F75BC' }} />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-[14px] leading-tight truncate" style={{ color: textPrimary }}>
            {c.site_name}
          </h3>
          {c.site_url && (
            <a
              href={c.site_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] mt-0.5 inline-flex items-center gap-1 hover:underline"
              style={{ color: '#0F75BC' }}
            >
              Visit Site <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={onEdit}
            className="p-1.5 rounded-lg hover:bg-black/5 transition-colors"
            style={{ color: textMuted }}
            title="Edit"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-colors"
            style={{ color: textMuted }}
            title="Delete"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <FieldRow
          icon={UserIcon}
          value={c.username || '—'}
          fieldBg={fieldBg}
          textPrimary={textPrimary}
          textMuted={textMuted}
          onCopy={c.username ? onCopyUser : undefined}
        />
        <FieldRow
          icon={KeyRound}
          value={displayPw}
          mono
          fieldBg={fieldBg}
          textPrimary={textPrimary}
          textMuted={textMuted}
          actionIcon={revealed ? EyeOff : Eye}
          onAction={onToggleReveal}
          actionTitle={revealed ? 'Hide' : 'Reveal'}
          onCopy={onCopyPw}
        />
        {c.notes && (
          <p className="text-[11px] pt-1 leading-relaxed" style={{ color: textSoft }}>
            {c.notes}
          </p>
        )}
      </div>
    </div>
  )
}

function FieldRow({
  icon: Icon, value, mono, fieldBg, textPrimary, textMuted,
  actionIcon: ActionIcon, onAction, actionTitle, onCopy,
}: {
  icon: any; value: string; mono?: boolean; fieldBg: string
  textPrimary: string; textMuted: string
  actionIcon?: any; onAction?: () => void; actionTitle?: string
  onCopy?: () => void
}) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    if (!onCopy) return
    onCopy()
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }
  return (
    <div
      className="flex items-center gap-2.5 px-3 py-2 rounded-lg"
      style={{ background: fieldBg }}
    >
      <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: textMuted }} />
      <span
        className={`text-[12px] flex-1 truncate ${mono ? 'font-mono tracking-wider' : ''}`}
        style={{ color: textPrimary }}
      >
        {value}
      </span>
      {ActionIcon && onAction && (
        <button
          onClick={onAction}
          className="p-1 rounded hover:bg-black/5 transition-colors"
          style={{ color: textMuted }}
          title={actionTitle}
        >
          <ActionIcon className="w-3.5 h-3.5" />
        </button>
      )}
      {onCopy && (
        <button
          onClick={handleCopy}
          className="p-1 rounded hover:bg-black/5 transition-colors"
          style={{ color: copied ? '#10b981' : textMuted }}
          title="Copy"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      )}
    </div>
  )
}
