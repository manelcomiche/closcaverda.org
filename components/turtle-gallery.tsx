"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TurtleGalleryProps {
  turtleName: string
  images: string[]
}

export default function TurtleGallery({ turtleName, images }: TurtleGalleryProps) {
  const [open, setOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const openGallery = (index: number) => {
    setSelectedImageIndex(index)
    setCurrentImageIndex(index)
    setOpen(true)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-[#768350]">Galeria de {turtleName}</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative h-40 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => openGallery(index)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${turtleName} - imatge ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <Button
        variant="link"
        className="text-[#768350] hover:text-green-700 font-medium text-sm p-0"
        onClick={() => openGallery(0)}
      >
        Veure totes les imatges
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-w-5xl p-0 bg-black/90 border-none rounded-lg"
          onInteractOutside={() => setOpen(false)}
        >
          <div className="relative">
            <div className="relative h-[80vh] w-full">
              <Image
                src={images[currentImageIndex] || "/placeholder.svg"}
                alt={`${turtleName} - imatge ${currentImageIndex + 1}`}
                fill
                className="object-contain"
              />
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/70 rounded-full"
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Tancar</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 rounded-full"
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Anterior</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 rounded-full"
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Següent</span>
            </Button>

            <div className="absolute bottom-4 left-0 right-0 text-center text-white">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
