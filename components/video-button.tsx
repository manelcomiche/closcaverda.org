"use client"

import { useState } from "react"
import { Play } from "lucide-react"
import YoutubePopup from "@/components/youtube-popup"

export default function VideoButton({ videoId, className = "" }: { videoId: string; className?: string }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`inline-flex items-center gap-2 font-semibold underline-offset-4 hover:underline ${className}`}
      >
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-current">
          <Play className="h-4 w-4 translate-x-px" fill="currentColor" />
        </span>
        Mira el vídeo del projecte
      </button>
      {open && <YoutubePopup videoId={videoId} onClose={() => setOpen(false)} />}
    </>
  )
}
