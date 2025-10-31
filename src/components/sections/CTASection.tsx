import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function CTASection() {
  return (
    <section className="border-t border-border bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h3 className="text-2xl font-semibold">Pronto para dar o próximo passo?</h3>
        <p className="mx-auto mt-3 max-w-2xl text-foreground/80">Agende uma conversa para entender seu objetivo e apresentar um plano sob medida.</p>
        <div className="mt-6 flex justify-center"><Link href="/contato"><Button size="lg" variant="primary">Falar com Especialista</Button></Link></div>
      </div>
    </section>
  )
}


