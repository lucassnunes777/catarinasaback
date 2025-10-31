"use client"
import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface ImageCropperModalProps {
  imageFile: File
  onCropComplete: (dataUrl: string) => void
  onUseAsIs: () => void
  onCancel: () => void
}

export function ImageCropperModal({ imageFile, onCropComplete, onUseAsIs, onCancel }: ImageCropperModalProps) {
  const [imageSrc, setImageSrc] = useState<string>('')
  const [crop, setCrop] = useState({ x: 0, y: 0, width: 100, height: 100 })
  const [scale, setScale] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setImageSrc(reader.result as string)
    }
    reader.readAsDataURL(imageFile)
  }, [imageFile])

  function handleCrop() {
    if (!imgRef.current) return

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = imgRef.current
    const imgWidth = img.naturalWidth
    const imgHeight = img.naturalHeight
    const displayWidth = img.offsetWidth
    const displayHeight = img.offsetHeight

    const scaleX = imgWidth / displayWidth
    const scaleY = imgHeight / displayHeight

    canvas.width = crop.width * scaleX
    canvas.height = crop.height * scaleY

    ctx.drawImage(
      img,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    )

    const dataUrl = canvas.toDataURL('image/png')
    onCropComplete(dataUrl)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold">Recortar Imagem</h2>
        <div ref={containerRef} className="relative mb-4 aspect-video w-full overflow-hidden rounded border bg-gray-100">
          {imageSrc && (
            <img
              ref={imgRef}
              src={imageSrc}
              alt="Crop preview"
              className="h-full w-full object-contain"
              style={{ transform: `scale(${scale})` }}
            />
          )}
        </div>
        <div className="mb-4 space-y-2">
          <label className="block text-sm">Zoom</label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={scale}
            onChange={(e) => setScale(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={onUseAsIs} variant="outline">Usar como está</Button>
          <Button onClick={handleCrop} variant="primary">Aplicar Recorte</Button>
          <Button onClick={onCancel} variant="ghost">Cancelar</Button>
        </div>
      </div>
    </div>
  )
}

