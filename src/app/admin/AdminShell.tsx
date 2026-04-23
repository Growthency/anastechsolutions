'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, FileText, BarChart3, Lock, LogOut, ChevronRight, Menu, X, Sun, Moon,
  ExternalLink,
} from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '@/components/providers/ThemeProvider'
import { logoutAction } from '../login/actions'

const NAV = [
  { href: '/admin',           label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/pages',     label: 'Pages',     icon: FileText },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/vault',     label: 'Vault',     icon: Lock },
]

export default function AdminShell({ children, userEmail }: { children: React.ReactNode; userEmail: string }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { theme, toggle } = useTheme()

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  const dark = theme === 'dark'
  const initial = userEmail[0]?.toUpperCase() ?? 'A'

  return (
    <div className="min-h-screen flex transition-colors duration-300" style={{ background: dark ? '#080c14' : '#f1f5f9' }}>

      {/* Sidebar desktop */}
      <aside className="hidden lg:flex flex-col w-[260px] border-r transition-colors duration-300" style={{ borderColor: dark ? 'rgba(255,255,255,0.06)' : '#e2e8f0', background: dark ? '#0c1120' : '#ffffff' }}>
        {/* Logo */}
        <div className="px-6 py-5 border-b" style={{ borderColor: dark ? 'rgba(255,255,255,0.06)' : '#e2e8f0' }}>
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-lg" style={{ background: 'linear-gradient(135deg, #0F75BC 0%, #ED1C24 100%)', boxShadow: '0 6px 16px rgba(15,117,188,0.25)' }}>
              A
            </div>
            <div>
              <span className="text-[15px] font-bold tracking-tight" style={{ color: dark ? '#fff' : '#0f172a' }}>Admin</span>
              <span className="text-[10px] ml-1.5 px-1.5 py-0.5 rounded-md font-semibold border" style={{ background: 'rgba(15,117,188,0.1)', color: '#0F75BC', borderColor: 'rgba(15,117,188,0.2)' }}>
                PRO
              </span>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 space-y-1">
          <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-wider" style={{ color: dark ? '#64748b' : '#94a3b8' }}>Menu</p>
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = isActive(href)
            return (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200"
                style={active
                  ? { background: 'linear-gradient(to right, rgba(15,117,188,0.15), rgba(15,117,188,0.05))', color: '#0F75BC' }
                  : { color: dark ? '#94a3b8' : '#64748b' }}
              >
                <Icon className="w-[18px] h-[18px]" />
                {label}
                {active && <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-60" />}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t" style={{ borderColor: dark ? 'rgba(255,255,255,0.06)' : '#e2e8f0' }}>
          <div className="flex items-center gap-3 mb-3 px-1">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold ring-1" style={{ background: 'linear-gradient(135deg, rgba(15,117,188,0.2), rgba(237,28,36,0.2))', color: '#0F75BC', boxShadow: 'inset 0 0 0 1px rgba(15,117,188,0.2)' }}>
              {initial}
            </div>
            <div className="min-w-0">
              <p className="text-[12px] font-semibold truncate" style={{ color: dark ? '#fff' : '#0f172a' }}>{userEmail}</p>
              <p className="text-[10px] font-medium" style={{ color: dark ? '#64748b' : '#94a3b8' }}>Administrator</p>
            </div>
          </div>
          <button
            onClick={toggle}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-[12px] transition-colors mb-1 hover:bg-black/5"
            style={{ color: dark ? '#94a3b8' : '#64748b' }}
          >
            {dark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            {dark ? 'Light mode' : 'Dark mode'}
          </button>
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] transition-colors hover:bg-black/5"
            style={{ color: dark ? '#94a3b8' : '#64748b' }}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View site
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-[12px] transition-colors hover:bg-red-500/10 hover:text-red-400"
              style={{ color: dark ? '#94a3b8' : '#64748b' }}
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile header */}
      <div
        className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 border-b backdrop-blur-xl transition-colors duration-300"
        style={{ borderColor: dark ? 'rgba(255,255,255,0.06)' : '#e2e8f0', background: dark ? 'rgba(12,17,32,0.95)' : 'rgba(255,255,255,0.95)' }}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: 'linear-gradient(135deg, #0F75BC 0%, #ED1C24 100%)' }}>A</div>
          <span className="text-sm font-bold" style={{ color: dark ? '#fff' : '#0f172a' }}>Admin</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={toggle} className="p-1.5 rounded-lg transition-colors" style={{ color: dark ? '#94a3b8' : '#64748b' }}>
            {dark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
          </button>
          <button onClick={() => setOpen(!open)} className="p-1" style={{ color: dark ? '#94a3b8' : '#64748b' }}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden fixed inset-0 z-40 pt-14 backdrop-blur-xl" style={{ background: dark ? 'rgba(12,17,32,0.98)' : 'rgba(255,255,255,0.98)' }}>
          <nav className="px-4 py-4 space-y-1">
            {NAV.map(({ href, label, icon: Icon }) => {
              const active = isActive(href)
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium"
                  style={active
                    ? { background: 'rgba(15,117,188,0.1)', color: '#0F75BC' }
                    : { color: dark ? '#94a3b8' : '#64748b' }}
                >
                  <Icon className="w-[18px] h-[18px]" />
                  {label}
                </Link>
              )
            })}
            <form action={logoutAction} className="pt-4">
              <button
                type="submit"
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10"
              >
                <LogOut className="w-[18px] h-[18px]" /> Sign out
              </button>
            </form>
          </nav>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 lg:pl-0 pt-14 lg:pt-0 overflow-auto">
        <div className="p-5 lg:p-8 max-w-[1400px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
