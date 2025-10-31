"use client"
import { useEffect, useState } from 'react'
import { ListingCard } from '@/components/ListingCard'

type L = any

export function FeaturedListings() {
  const [featured, setFeatured] = useState<L[]>([])
  useEffect(() => {
    fetch('/api/listings').then(r=>r.json()).then(d=>{
      const data = (d.listings || []).filter((l:L)=> l.status !== 'vendido').slice(0,3)
      setFeatured(data)
    }).catch(()=>setFeatured([]))
  }, [])
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Destaques</h2>
            <p className="text-sm text-foreground/70">Seleção de oportunidades curadas</p>
          </div>
          <a className="text-sm text-foreground/80 hover:text-foreground" href="/imoveis">Ver todos</a>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      </div>
    </section>
  )
}


