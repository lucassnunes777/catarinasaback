import Link from 'next/link'
import { LogoutButton } from '@/components/LogoutButton'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <LogoutButton />
      </div>
      <nav className="mb-6 flex gap-4 border-b border-border">
        <Link href="/dashboard" className="border-b-2 border-transparent px-4 py-2 text-sm hover:border-primary">Visão Geral</Link>
        <Link href="/dashboard/profile" className="border-b-2 border-transparent px-4 py-2 text-sm hover:border-primary">Perfil</Link>
        <Link href="/dashboard/listings" className="border-b-2 border-transparent px-4 py-2 text-sm hover:border-primary">Imóveis</Link>
        <Link href="/dashboard/neighborhoods" className="border-b-2 border-transparent px-4 py-2 text-sm hover:border-primary">Bairros</Link>
      </nav>
      {children}
    </div>
  )
}

