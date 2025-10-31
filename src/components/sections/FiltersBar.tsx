"use client"
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { formatPriceBRL } from '@/lib/data'
import { useRouter } from 'next/navigation'

export function FiltersBar() {
  const router = useRouter()
  const [q, setQ] = useState('')
  const [type, setType] = useState('')
  const [priceMin, setPriceMin] = useState(0)
  const [priceMax, setPriceMax] = useState(15000000)
  const [neighborhoodOptions, setNeighborhoodOptions] = useState<string[]>([])
  const [neighborhood, setNeighborhood] = useState('')
  const [beds, setBeds] = useState('')

  useEffect(() => { fetch('/api/listings').then(r=>r.json()).then(d=> setNeighborhoodOptions(Array.from(new Set((d.listings||[]).map((l:any)=>l.neighborhood))).sort())) }, [])

  function onSearch() {
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (type) params.set('type', type)
    if (priceMin > 0) params.set('priceMin', String(priceMin))
    if (priceMax < 15000000) params.set('priceMax', String(priceMax))
    if (neighborhood) params.set('neighborhood', neighborhood)
    if (beds) params.set('beds', beds)
    router.push(`/imoveis?${params.toString()}`)
  }

  return (
    <div className="rounded-lg border border-border bg-white p-3 shadow-sm">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
        <Input placeholder="Buscar por bairro, condomínio ou palavra-chave" value={q} onChange={(e)=>setQ(e.target.value)} />
        <Select value={type} onChange={(e)=>setType(e.target.value)}>
          <option value="">Tipo</option>
          <option value="Casa">Casa</option>
          <option value="Apartamento">Apartamento</option>
        </Select>
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-xs text-foreground/70"><span>{formatPriceBRL(priceMin*100)}</span><span>{formatPriceBRL(priceMax*100)}</span></div>
          <div className="flex items-center gap-2">
            <input className="w-full" type="range" min={0} max={15000000} step={50000} value={priceMin} onChange={(e)=>setPriceMin(Math.min(Number(e.target.value), priceMax))} />
            <input className="w-full" type="range" min={0} max={15000000} step={50000} value={priceMax} onChange={(e)=>setPriceMax(Math.max(Number(e.target.value), priceMin))} />
          </div>
        </div>
        <Select value={neighborhood} onChange={(e)=>setNeighborhood(e.target.value)}>
          <option value="">Bairro</option>
          {neighborhoodOptions.map(n => (<option key={n} value={n}>{n}</option>))}
        </Select>
        <div className="flex gap-2">
          <Select className="flex-1" value={beds} onChange={(e)=>setBeds(e.target.value)}>
            <option value="">Quartos</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </Select>
          <Button variant="primary" onClick={onSearch}>Buscar</Button>
        </div>
      </div>
    </div>
  )
}


