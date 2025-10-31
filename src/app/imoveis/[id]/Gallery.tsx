"use client"
import Image from 'next/image'
import { useState } from 'react'
import { ImageLightbox } from '@/components/ImageLightbox'

interface GalleryProps {
  coverImage: string
  gallery: string[]
  title: string
}

export function Gallery({ coverImage, gallery, title }: GalleryProps) {
  const [open, setOpen] = useState<{ show: boolean; index: number }>({ show: false, index: 0 })
  const images = gallery.length ? gallery : [coverImage]

  return (
    <div>
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover cursor-zoom-in"
          onClick={() => setOpen({ show: true, index: 0 })}
        />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-3">
        {images.map((src, i) => (
          <button
            key={i}
            className="relative aspect-[4/3] overflow-hidden rounded-md"
            onClick={() => setOpen({ show: true, index: i })}
          >
            <Image src={src} alt={title + ' ' + (i + 1)} fill className="object-cover" />
          </button>
        ))}
      </div>
      {open.show && (
        <ImageLightbox images={images} startIndex={open.index} onClose={() => setOpen({ show: false, index: 0 })} />
      )}
    </div>
  )
}

