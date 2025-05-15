"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface YoutubePopupProps {
  videoId: string
  onClose: () => void
}

export default function YoutubePopup({ videoId, onClose }: YoutubePopupProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "auto"
    }
  }, [onClose])

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
        onClick={handleOverlayClick}
        ref={overlayRef}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative bg-white rounded-xl overflow-hidden shadow-2xl max-w-3xl w-full mx-4 max-h-[90vh] flex flex-col"
        >
          <div className="absolute top-2 right-2 z-10">
            <button
              onClick={onClose}
              className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </button>
          </div>

          <div className="p-4 bg-green-600 text-white">
            <h3 className="text-xl font-bold">Benvinguts a Closcaverda</h3>
            <p className="text-green-100">Descobreix la nostra missió per protegir les tortugues marines</p>
          </div>

          <div className="aspect-video flex-1 min-h-0">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>

          <div className="p-4 bg-gray-50 border-t">
            <p className="text-sm text-gray-600">
              Gràcies per visitar la nostra pàgina. Junts podem fer la diferència!
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
