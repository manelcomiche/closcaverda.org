import type { MetadataRoute } from "next"
import { site } from "@/lib/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Closcaverda: botiga solidària per les tortugues marines",
    short_name: site.name,
    description: site.description,
    lang: "ca",
    start_url: "/",
    display: "standalone",
    background_color: "#f2f5ec",
    theme_color: "#0f3a34",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { src: "/tortugaBlip.png", sizes: "512x512", type: "image/png" },
    ],
  }
}
