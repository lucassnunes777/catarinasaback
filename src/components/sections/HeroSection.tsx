"use client"
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="border-b border-border bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 py-16 md:py-24">
        <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: 'easeOut' }} className="text-4xl font-bold tracking-tight md:text-5xl">Inteligência e sensibilidade na busca pelo seu imóvel.</motion.h1>
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }} className="max-w-2xl text-base text-foreground/70 md:text-lg">Assessoria imobiliária em Salvador que une tecnologia e atendimento humano para resultados precisos.</motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.2 }} className="flex flex-wrap items-center gap-3">
          <Link href="/imoveis"><Button size="lg" variant="primary">Ver Imóveis</Button></Link>
          <Link href="/sobre"><Button variant="link" size="lg">Saiba Mais</Button></Link>
        </motion.div>
      </div>
    </section>
  )
}


