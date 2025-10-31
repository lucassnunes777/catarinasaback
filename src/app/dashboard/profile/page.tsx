"use client"
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { LocalImagePicker } from '@/components/LocalImagePicker'

export default function ProfilePage() {
  const [name, setName] = useState('Catarina Saback')
  const [logoUrl, setLogoUrl] = useState<string>('')
  const [photoUrl, setPhotoUrl] = useState<string>('')
  const [creci, setCreci] = useState('35622')
  const [aboutIntro, setAboutIntro] = useState('')
  const [bio, setBio] = useState('')

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('profile') || '{}')
      if (saved.name) setName(saved.name)
      if (saved.logoUrl) setLogoUrl(saved.logoUrl)
      if (saved.photoUrl) setPhotoUrl(saved.photoUrl)
      if (saved.creci) setCreci(saved.creci)
      if (saved.aboutIntro) setAboutIntro(saved.aboutIntro)
      if (saved.bio) setBio(saved.bio)
    } catch {}
  }, [])

  function handleSave() {
    const profile = { name, logoUrl, photoUrl, creci, aboutIntro, bio }
    localStorage.setItem('profile', JSON.stringify(profile))
    alert('Perfil salvo com sucesso!')
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Configurações do Perfil</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Input label="Nome" value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" />
          <Input label="CRECI" value={creci} onChange={(e) => setCreci(e.target.value)} placeholder="CRECI-BA" />
          <div>
            <label className="mb-2 block text-sm font-medium">Logo (Navbar)</label>
            <LocalImagePicker
              currentImage={logoUrl}
              onImageSelected={(url) => setLogoUrl(url)}
            />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Foto de Perfil (Sobre Mim)</label>
            <LocalImagePicker
              currentImage={photoUrl}
              onImageSelected={(url) => setPhotoUrl(url)}
            />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium">Introdução (Resumo Sobre Mim)</label>
          <Textarea value={aboutIntro} onChange={(e) => setAboutIntro(e.target.value)} placeholder="Breve introdução que aparece na homepage" rows={3} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Biografia Completa</label>
          <Textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Biografia completa para a página Sobre" rows={6} />
        </div>
      </div>
      <Button onClick={handleSave} variant="primary">Salvar Alterações</Button>
    </div>
  )
}

