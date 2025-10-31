import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const listings = await db.listing.findMany({
      orderBy: { createdAt: 'desc' }
    })
    const formatted = listings.map((l: any) => ({
      ...l,
      gallery: typeof l.gallery === 'string' ? JSON.parse(l.gallery || '[]') : l.gallery || [],
      tags: typeof l.tags === 'string' ? JSON.parse(l.tags || '[]') : l.tags || []
    }))
    return NextResponse.json({ listings: formatted })
  } catch (error) {
    console.error('Error fetching listings:', error)
    return NextResponse.json({ listings: [] }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const listing = await db.listing.create({
      data: {
        ...body,
        gallery: Array.isArray(body.gallery) ? JSON.stringify(body.gallery) : body.gallery || '[]',
        tags: Array.isArray(body.tags) ? JSON.stringify(body.tags) : body.tags || '[]'
      }
    })
    return NextResponse.json({ listing })
  } catch (error) {
    console.error('Error creating listing:', error)
    return NextResponse.json({ error: 'Erro ao criar imóvel' }, { status: 500 })
  }
}

