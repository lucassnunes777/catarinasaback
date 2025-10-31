"use client"
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { ListingCard } from '@/components/ListingCard'
import { formatPriceBRL } from '@/lib/data'

export default function ListingsPage() {
  const [listings, setListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: '',
    neighborhood: '',
    city: 'Salvador',
    type: 'Apartamento',
    bedrooms: 2,
    bathrooms: 1,
    area: 0,
    price: 0,
    priceBRL: '',
    coverImage: '',
    gallery: '',
    status: 'em-destaque',
    tags: '',
    description: ''
  })

  useEffect(() => {
    loadListings()
  }, [])

  async function loadListings() {
    try {
      const res = await fetch('/api/listings')
      const data = await res.json()
      setListings(data.listings || [])
    } catch (error) {
      console.error('Erro ao carregar imóveis:', error)
    } finally {
      setLoading(false)
    }
  }

  function handlePriceBRLChange(value: string) {
    setFormData({ ...formData, priceBRL: value })
    const cents = Math.round(parseFloat(value.replace(/[^\d,]/g, '').replace(',', '.')) * 100) || 0
    setFormData(prev => ({ ...prev, price: cents }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      const payload = {
        ...formData,
        price: formData.price,
        gallery: formData.gallery.split(',').map(s => s.trim()).filter(Boolean),
        tags: formData.tags.split(',').map(s => s.trim()).filter(Boolean)
      }
      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (res.ok) {
        alert('Imóvel adicionado com sucesso!')
        setFormData({
          title: '', neighborhood: '', city: 'Salvador', type: 'Apartamento',
          bedrooms: 2, bathrooms: 1, area: 0, price: 0, priceBRL: '',
          coverImage: '', gallery: '', status: 'em-destaque', tags: '', description: ''
        })
        loadListings()
      } else {
        alert('Erro ao adicionar imóvel')
      }
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao adicionar imóvel')
    }
  }

  if (loading) return <div>Carregando...</div>

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Gerenciar Imóveis</h2>
      <form onSubmit={handleSubmit} className="grid gap-4 rounded-lg border border-border bg-white p-6">
        <Input label="Título" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Bairro" value={formData.neighborhood} onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })} required />
          <Input label="Cidade" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} required />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
            <option value="Apartamento">Apartamento</option>
            <option value="Casa">Casa</option>
          </Select>
          <Input type="number" label="Quartos" value={formData.bedrooms} onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) })} min="0" />
          <Input type="number" label="Banheiros" value={formData.bathrooms} onChange={(e) => setFormData({ ...formData, bathrooms: parseInt(e.target.value) })} min="0" />
          <Input type="number" label="Área (m²)" value={formData.area} onChange={(e) => setFormData({ ...formData, area: parseInt(e.target.value) })} min="0" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Preço (R$)</label>
            <Input value={formData.priceBRL} onChange={(e) => handlePriceBRLChange(e.target.value)} placeholder="Ex: 500.000,00" />
          </div>
          <Select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
            <option value="novo-lancamento">Novo Lançamento</option>
            <option value="em-destaque">Em Destaque</option>
            <option value="vendido">Vendido</option>
          </Select>
        </div>
        <Input label="Imagem Principal (URL)" value={formData.coverImage} onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })} required />
        <Input label="Galeria (URLs separadas por vírgula)" value={formData.gallery} onChange={(e) => setFormData({ ...formData, gallery: e.target.value })} />
        <Input label="Tags (separadas por vírgula)" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} />
        <Textarea label="Descrição" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4} />
        <Button type="submit" variant="primary">Adicionar Imóvel</Button>
      </form>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Imóveis Cadastrados ({listings.length})</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </div>
  )
}

