"use client"
import { useEffect, useMemo, useState } from 'react'
import { listings } from '@/lib/data'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { ListingCard } from '@/components/ListingCard'
import { useSearchParams, useRouter } from 'next/navigation'

export default function ImoveisPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [type, setType] = useState<string>('')
  const [priceMin, setPriceMin] = useState<number>(0)
  const [priceMax, setPriceMax] = useState<number>(15000000)
  const [neighborhood, setNeighborhood] = useState<string>('')
  const [beds, setBeds] = useState<string>('')

  useEffect(() => {
    setQuery(searchParams.get('q') || '')
    setType(searchParams.get('type') || '')
    const spMin = searchParams.get('priceMin')
    const spMax = searchParams.get('priceMax')
    setPriceMin(spMin ? Number(spMin) : 0)
    setPriceMax(spMax ? Number(spMax) : 15000000)
    setNeighborhood(searchParams.get('neighborhood') || '')
    setBeds(searchParams.get('beds') || '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [dbListings, setDbListings] = useState<any[]>([])
  useEffect(() => { fetch('/api/listings').then(r=>r.json()).then(d=> setDbListings(d.listings || [])) }, [])

  const filtered = useMemo(() => {
    return (dbListings.length ? dbListings : listings).filter((l) => {
      const matchQuery = !query || `${l.neighborhood} ${l.title}`.toLowerCase().includes(query.toLowerCase())
      const matchType = !type || l.type === type
      const p = l.price / 100
      const matchPrice = p >= priceMin && p <= priceMax
      const matchNeighborhood = !neighborhood || l.neighborhood === neighborhood
      const matchBeds = !beds || l.bedrooms >= parseInt(beds, 10)
      return matchQuery && matchType && matchPrice && matchNeighborhood && matchBeds
    })
  }, [query, type, priceMin, priceMax, neighborhood, beds, dbListings])

  const [neighborhoodOptions, setNeighborhoodOptions] = useState<string[]>([])
  useEffect(() => { setNeighborhoodOptions(Array.from(new Set((dbListings.length?dbListings:listings).map((l:any)=>l.neighborhood))).sort()) }, [dbListings])

  function applyFilters() {
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (type) params.set('type', type)
    if (priceMin > 0) params.set('priceMin', String(priceMin))
    if (priceMax < 15000000) params.set('priceMax', String(priceMax))
    if (neighborhood) params.set('neighborhood', neighborhood)
    if (beds) params.set('beds', beds)
    router.replace(`/imoveis?${params.toString()}`)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-semibold">Imóveis Disponíveis</h1>
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-5">
        <Input placeholder="Buscar por bairro ou condomínio..." value={query} onChange={(e) => setQuery(e.target.value)} />
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Tipo de Imóvel</option>
          <option value="Casa">Casa</option>
          <option value="Apartamento">Apartamento</option>
        </Select>
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-xs text-foreground/70">
            <span>{priceMin.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            <span>{priceMax.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          </div>
          <div className="flex items-center gap-2">
            <input className="w-full" type="range" min={0} max={15000000} step={50000} value={priceMin} onChange={(e)=>setPriceMin(Math.min(Number(e.target.value), priceMax))} />
            <input className="w-full" type="range" min={0} max={15000000} step={50000} value={priceMax} onChange={(e)=>setPriceMax(Math.max(Number(e.target.value), priceMin))} />
          </div>
        </div>
        <Select value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)}>
          <option value="">Bairro</option>
          {neighborhoodOptions.map(n => <option key={n} value={n}>{n}</option>)}
        </Select>
        <Select value={beds} onChange={(e) => setBeds(e.target.value)}>
          <option value="">Quartos</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </Select>
        <div className="md:col-span-5 -mt-2"><button onClick={applyFilters} className="text-sm text-foreground/80 underline-offset-4 hover:underline">Aplicar filtros</button></div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((l:any) => (<ListingCard key={l.id} listing={l} />))}
      </div>
    </div>
  )
}


