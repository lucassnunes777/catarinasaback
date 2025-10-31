export type ListingStatus = 'novo-lancamento' | 'em-destaque' | 'vendido'

export type Listing = {
  id: string
  title: string
  neighborhood: string
  city: string
  type: 'Casa' | 'Apartamento'
  bedrooms: number
  bathrooms: number
  area: number
  price: number
  coverImage: string
  gallery: string[]
  status: ListingStatus
  tags: string[]
  description: string
}

export const listings: Listing[] = []

export function formatPriceBRL(cents: number) {
  return (cents / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}


