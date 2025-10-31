"use client"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

const links = [
  { href: '/', label: 'Início' },
  { href: '/imoveis', label: 'Imóveis' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/contato', label: 'Contato' }
]

export function Navbar() {
  const [isAuthed, setIsAuthed] = useState(false)
  useEffect(() => {
    const refresh = async () => {
      try { const r = await fetch('/api/me'); const d = await r.json(); setIsAuthed(Boolean(d.authenticated)) } catch {}
    }
    refresh()
    const id = setInterval(refresh, 2000)
    return () => clearInterval(id)
  }, [])
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-black text-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded bg-white/10" />
          <Link href="/" className={cn('text-base font-semibold tracking-tight')}>Catarina Saback</Link>
        </div>
        <nav className="hidden gap-6 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-white/80 transition-colors hover:text-white underline-offset-4 hover:underline">{l.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/contato"><Button variant="primary" size="md">Fale com Especialista</Button></Link>
          {isAuthed ? (
            <Link href="/dashboard"><Button size="md" className="bg-white/10 text-white hover:bg-white/20">Perfil</Button></Link>
          ) : (
            <Link href="/login"><Button size="md" className="bg-white/10 text-white hover:bg-white/20">Login</Button></Link>
          )}
        </div>
      </div>
    </header>
  )
}


