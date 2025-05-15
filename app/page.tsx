import type { Metadata } from "next"
import ClientPage from "./ClientPage"

export const metadata: Metadata = {
  title: "Inici | Closcaverda - Conservació de Tortugues Marines",
  description:
    "Fundació dedicada a la conservació de les tortugues marines i la preservació dels seus hàbitats naturals.",
}

export default function Home() {
  return <ClientPage />
}
