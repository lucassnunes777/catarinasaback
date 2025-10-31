import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BedDouble, Bath, Square } from 'lucide-react'
import { formatPriceBRL, type Listing } from '@/lib/data'

function statusToBadge(status: Listing['status']) {
  switch (status) {
    case 'novo-lancamento':
      return { label: 'Novo Lançamento', variant: 'success' as const }
    case 'em-destaque':
      return { label: 'Em Destaque', variant: 'default' as const }
    case 'vendido':
      return { label: 'Vendido', variant: 'warning' as const }
  }
}

export function ListingCard({ listing }: { listing: Listing }) {
  const badge = statusToBadge(listing.status)
  return (
    <Card className="overflow-hidden transition-shadow duration-200 hover:shadow-md">
      <CardHeader className="relative">
        <Link href={`/imoveis/${listing.id}`} className="block">
          <div className="relative aspect-[16/9] w-full">
            <Image src={listing.coverImage} alt={listing.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
          </div>
        </Link>
        <div className="absolute left-3 top-3">
          <Badge variant={badge.variant}>{badge.label}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Link href={`/imoveis/${listing.id}`} className="block"><h3 className="text-lg font-semibold leading-tight">{listing.title}</h3></Link>
        <p className="text-sm text-foreground/70">{listing.neighborhood} • {listing.city}</p>
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4 text-sm text-foreground/80">
          <span className="inline-flex items-center gap-1"><BedDouble size={16}/> {listing.bedrooms}</span>
          <span className="inline-flex items-center gap-1"><Bath size={16}/> {listing.bathrooms}</span>
          <span className="inline-flex items-center gap-1"><Square size={16}/> {listing.area} m²</span>
        </div>
        <div className="flex items-center gap-2">
          <a href={`https://wa.me/5571999842288?text=${encodeURIComponent('Me interessei no imóvel: ' + listing.title)}`} target="_blank" rel="noopener noreferrer"><Button size="sm" variant="outline">WhatsApp</Button></a>
          <div className="text-base font-semibold">{formatPriceBRL(listing.price)}</div>
        </div>
      </CardFooter>
    </Card>
  )
}


