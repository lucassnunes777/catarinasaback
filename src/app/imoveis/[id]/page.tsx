import Image from 'next/image'
import { notFound } from 'next/navigation'
import { listings } from '@/lib/data'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default async function ListingDetailPage({ params }: { params: { id: string } }) {
  let listing: any | null = null
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/listings/${params.id}`, { cache: 'no-store' })
    if (res.ok) { const data = await res.json(); listing = data.listing }
  } catch {}
  if (!listing) { listing = listings.find(l => (l as any).id === params.id) }
  if (!listing) return notFound()

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
            <Image src={listing.coverImage} alt={listing.title} fill className="object-cover cursor-zoom-in" />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {(listing.gallery || []).map((src: string, i: number) => (
              <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-md">
                <Image src={src} alt={listing.title + ' ' + (i+1)} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-semibold leading-tight">{listing.title}</h1>
          <div className="mt-1 text-foreground/70">{listing.neighborhood} • {listing.city}</div>
          <div className="mt-4">
            <a href={`https://wa.me/5571999842288?text=${encodeURIComponent('Me interessei no imóvel: ' + listing.title)}`} target="_blank" rel="noopener noreferrer"><Button variant="primary">Falar no WhatsApp</Button></a>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {(listing.tags || []).map((tag: string) => (<Badge key={tag} variant="outline">{tag}</Badge>))}
          </div>
          <div className="prose container-prose mt-6 text-foreground/80"><p>{listing.description}</p></div>
          <div className="mt-8 rounded-lg border border-border p-4">
            <h2 className="mb-3 text-lg font-semibold">Tenho Interesse</h2>
            <form className="grid grid-cols-1 gap-3">
              <Input placeholder="Seu nome" required />
              <Input placeholder="Seu e-mail" type="email" required />
              <Input placeholder="Seu telefone" required />
              <Textarea placeholder="Mensagem" rows={5} />
              <Button variant="primary" className="w-full">Enviar</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}


