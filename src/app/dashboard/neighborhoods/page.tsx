"use client"
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getNeighborhoods, addNeighborhood, removeNeighborhood } from '@/lib/neighborhoods'

export default function NeighborhoodsPage() {
  const [neighborhoods, setNeighborhoods] = useState<string[]>([])
  const [newName, setNewName] = useState('')

  useEffect(() => {
    setNeighborhoods(getNeighborhoods())
  }, [])

  function handleAdd() {
    if (newName.trim() && !neighborhoods.includes(newName.trim())) {
      addNeighborhood(newName.trim())
      setNeighborhoods(getNeighborhoods())
      setNewName('')
    }
  }

  function handleRemove(name: string) {
    removeNeighborhood(name)
    setNeighborhoods(getNeighborhoods())
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Gerenciar Bairros</h2>
      <div className="flex gap-2">
        <Input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Nome do bairro"
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
        />
        <Button onClick={handleAdd} variant="primary">Adicionar</Button>
      </div>
      <div className="space-y-2">
        {neighborhoods.length === 0 ? (
          <p className="text-foreground/70">Nenhum bairro cadastrado</p>
        ) : (
          neighborhoods.map((name) => (
            <div key={name} className="flex items-center justify-between rounded border border-border bg-white p-3">
              <span>{name}</span>
              <Button variant="ghost" size="sm" onClick={() => handleRemove(name)}>Remover</Button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

