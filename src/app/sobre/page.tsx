"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function SobrePage() {
  const [name, setName] = useState('Catarina Saback')
  const [photo, setPhoto] = useState('https://images.unsplash.com/photo-1544005313-94ddf0286df2')
  const [bio, setBio] = useState('')
  const [creci, setCreci] = useState('35622')
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('profile') || '{}')
      if (saved.name) setName(saved.name)
      if (saved.photoUrl) setPhoto(saved.photoUrl)
      if (saved.bio) setBio(saved.bio)
      if (saved.creci) setCreci(saved.creci)
    } catch {}
  }, [])

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[360px,1fr]">
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
          <Image src={photo} alt={name} fill className="object-cover" />
        </div>
        <div>
          <h1 className="text-3xl font-semibold">{name}</h1>
          <h2 className="mt-1 text-foreground/70">Especialista em Mercado Imobiliário de Salvador e Litoral Norte</h2>
          <div className="mt-2 text-sm font-medium">CRECI-BA: {creci}</div>
          <div className="prose container-prose mt-6 text-foreground/80">
            <h3>Minha Filosofia</h3>
            <p>Acredito na combinação entre dados de qualidade, leitura fina do cliente e um processo consultivo transparente. Meu objetivo é reduzir ruído, economizar tempo e maximizar resultados.</p>
            <h3>Por que trabalho com tecnologia?</h3>
            <p>Ferramentas certas permitem análises comparativas mais precisas, prospecção eficiente e comunicação clara. Com isso, a experiência se torna mais previsível e o cliente toma decisões com confiança.</p>
            <h3>Atendimento Personalizado (PJ)</h3>
            <p>Atuo como pessoa jurídica para oferecer estrutura e governança no atendimento. Cada mandato recebe um plano sob medida, com metas, prazos e indicadores.</p>
            {bio && (<><h3>Sobre</h3><p>{bio}</p></>)}
          </div>
        </div>
      </div>
    </div>
  )
}


