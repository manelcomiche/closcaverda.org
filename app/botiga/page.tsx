import type { Metadata } from "next"
import ShopPageClient from "./ShopPageClient"

export const metadata: Metadata = {
  title: "Botiga | Closcaverda - Conservació de Tortugues Marines",
  description:
    "Explora la nostra botiga solidària. Cada compra contribueix directament a la conservació de les tortugues marines i els seus hàbitats.",
  keywords: [
    "botiga solidària",
    "productes sostenibles",
    "tortugues marines",
    "conservació marina",
    "CRAM",
    "Closcaverda",
  ],
}

export default function ShopPage() {
  return <ShopPageClient />
}
