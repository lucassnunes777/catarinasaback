"use client"
import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ImageCropperModal } from './ImageCropperModal'

interface LocalImagePickerProps {
  currentImage?: string
  onImageSelected: (dataUrl: string) => void
}

export function LocalImagePicker({ currentImage, onImageSelected }: LocalImagePickerProps) {
  const [showCropper, setShowCropper] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file)
      setShowCropper(true)
    }
  }

  function handleCropComplete(dataUrl: string) {
    onImageSelected(dataUrl)
    setShowCropper(false)
    setSelectedFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function handleUseAsIs() {
    if (selectedFile) {
      const reader = new FileReader()
      reader.onloadend = () => {
        onImageSelected(reader.result as string)
        setShowCropper(false)
        setSelectedFile(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  return (
    <>
      <div className="space-y-2">
        {currentImage && (
          <div className="relative h-32 w-32 overflow-hidden rounded border">
            <img src={currentImage} alt="Preview" className="h-full w-full object-contain" />
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="image-upload"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
        >
          {currentImage ? 'Alterar Imagem' : 'Selecionar Imagem'}
        </Button>
      </div>
      {showCropper && selectedFile && (
        <ImageCropperModal
          imageFile={selectedFile}
          onCropComplete={handleCropComplete}
          onUseAsIs={handleUseAsIs}
          onCancel={() => {
            setShowCropper(false)
            setSelectedFile(null)
            if (fileInputRef.current) fileInputRef.current.value = ''
          }}
        />
      )}
    </>
  )
}

