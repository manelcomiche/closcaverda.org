import type { MetadataRoute } from "next"
import { products } from "@/data/products"
import { turtles } from "@/data/turtles"
import { site } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    { url: site.url, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/botiga`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    ...products.map((product) => ({
      url: `${site.url}/botiga/${product.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [`${site.url}${product.image}`],
    })),
    { url: `${site.url}/tortugues`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...turtles.map((turtle) => ({
      url: `${site.url}/tortugues/${turtle.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]
}
