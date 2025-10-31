"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function AboutMeSummary() {
  const [photo, setPhoto] = useState('https://images.unsplash.com/photo-1544005313-94ddf0286df2')
  const [about, setAbout] = useState('Sou especialista em mercado imobiliário de alto padrão em Salvador e Litoral Norte. Minha abordagem combina dados, sensibilidade e estratégia para entregar resultados consistentes.')
  const [creci, setCreci] = useState('35622')
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('profile') || '{}')
      if (saved.photoUrl) setPhoto(saved.photoUrl)
      if (saved.aboutIntro) setAbout(saved.aboutIntro)
      if (saved.creci) setCreci(saved.creci)
    } catch {}
  }, [])

  return (
    <section className="border-t border-border bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2">
        <div className="relative w-full overflow-hidden rounded-lg bg-muted h-[360px] md:h-[420px]">
          <Image src={photo} alt="Sobre mim" fill className="object-contain" sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
        <div>
          <h3 className="text-2xl font-semibold">Sobre mim</h3>
          <p className="mt-3 text-foreground/80">{about}</p>
          <p className="mt-3 text-foreground/80">CRECI-BA: {creci}</p>
          <Link href="/sobre" className="mt-4 inline-block text-sm text-foreground/80 underline-offset-4 hover:underline">Conheça minha história</Link>
        </div>
      </div>
    </section>
  )
}


