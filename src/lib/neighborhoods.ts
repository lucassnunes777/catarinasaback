"use client"

const STORAGE_KEY = 'neighborhoods'

export function getNeighborhoods(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function addNeighborhood(name: string): void {
  if (typeof window === 'undefined') return
  const current = getNeighborhoods()
  if (!current.includes(name)) {
    current.push(name)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current))
  }
}

export function removeNeighborhood(name: string): void {
  if (typeof window === 'undefined') return
  const current = getNeighborhoods().filter((n) => n !== name)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current))
}

