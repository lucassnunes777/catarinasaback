import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const listing = await db.listing.findUnique({
      where: { id: params.id }
    })
    if (!listing) {
      return NextResponse.json({ error: 'Imóvel não encontrado' }, { status: 404 })
    }
    const formatted = {
      ...listing,
      gallery: typeof (listing as any).gallery === 'string' ? JSON.parse((listing as any).gallery || '[]') : (listing as any).gallery || [],
      tags: typeof (listing as any).tags === 'string' ? JSON.parse((listing as any).tags || '[]') : (listing as any).tags || []
    }
    return NextResponse.json({ listing: formatted })
  } catch (error) {
    console.error('Error fetching listing:', error)
    return NextResponse.json({ error: 'Erro ao buscar imóvel' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const listing = await db.listing.update({
      where: { id: params.id },
      data: body
    })
    return NextResponse.json({ listing })
  } catch (error) {
    console.error('Error updating listing:', error)
    return NextResponse.json({ error: 'Erro ao atualizar imóvel' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db.listing.delete({
      where: { id: params.id }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting listing:', error)
    return NextResponse.json({ error: 'Erro ao deletar imóvel' }, { status: 500 })
  }
}

