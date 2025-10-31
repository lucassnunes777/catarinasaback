"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './ui/button'

interface ImageLightboxProps {
  images: string[]
  startIndex: number
  onClose: () => void
}

export function ImageLightbox({ images, startIndex, onClose }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(startIndex)
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    setCurrentIndex(startIndex)
    setZoom(1)
  }, [startIndex])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  function handleNext() {
    setCurrentIndex((prev) => (prev + 1) % images.length)
    setZoom(1)
  }

  function handlePrev() {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    setZoom(1)
  }

  function handleZoom(e: React.WheelEvent) {
    e.preventDefault()
    setZoom((prev) => Math.max(1, Math.min(3, prev + (e.deltaY > 0 ? -0.1 : 0.1))))
  }

  if (images.length === 0) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90" onClick={onClose}>
      <div className="relative flex h-full w-full items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-10 text-white hover:bg-white/20"
          onClick={onClose}
        >
          <X size={24} />
        </Button>
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 z-10 text-white hover:bg-white/20"
              onClick={handlePrev}
            >
              <ChevronLeft size={24} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 z-10 text-white hover:bg-white/20"
              onClick={handleNext}
            >
              <ChevronRight size={24} />
            </Button>
          </>
        )}
        <div className="relative h-[90vh] w-[90vw] max-w-6xl overflow-hidden" onWheel={handleZoom}>
          <Image
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            fill
            className="object-contain"
            style={{ transform: `scale(${zoom})`, transition: 'transform 0.2s' }}
          />
        </div>
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/50'
                }`}
                onClick={() => {
                  setCurrentIndex(i)
                  setZoom(1)
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

