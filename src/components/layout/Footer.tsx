"use client"
import Link from 'next/link'
import { Instagram, PhoneCall } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-white/10" />
            <div>
              <div className="text-base font-semibold">Catarina Saback</div>
              <div className="text-sm text-white/70">CRECI-BA: 35622</div>
            </div>
          </div>
          <nav className="flex gap-6 text-sm">
            <Link className="text-white/80 hover:text-white underline-offset-4 hover:underline" href="/">Início</Link>
            <Link className="text-white/80 hover:text-white underline-offset-4 hover:underline" href="/imoveis">Imóveis</Link>
            <Link className="text-white/80 hover:text-white underline-offset-4 hover:underline" href="/sobre">Sobre</Link>
            <Link className="text-white/80 hover:text-white underline-offset-4 hover:underline" href="/contato">Contato</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link aria-label="Instagram" href="https://www.instagram.com/catarinasabacksantos/" className="text-white/70 hover:text-white"><Instagram size={20} /></Link>
            <Link aria-label="WhatsApp" href="https://wa.me/5571999842288" className="text-white/70 hover:text-white"><PhoneCall size={20} /></Link>
          </div>
        </div>
        <div className="mt-6 text-xs text-white/60">© {new Date().getFullYear()} Lucas Nunes. Todos os direitos reservados.</div>
      </div>
    </footer>
  )
}


