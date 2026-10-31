import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { turtles } from "@/data/turtles"
import { turtleImages } from "@/data/turtle-images"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import TurtleDetail from "@/components/turtle-detail"
import JsonLd from "@/components/json-ld"
import { breadcrumbSchema } from "@/components/breadcrumbs"
import { site, social } from "@/lib/site"
import { sized } from "@/lib/images"

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return turtles.map((turtle) => ({ slug: turtle.slug }))
}

const coverOf = (slug: string, fallback: string) =>
  sized(turtleImages[slug as keyof typeof turtleImages]?.[0] || fallback, 1200, "jpg")

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const turtle = turtles.find((t) => t.slug === slug)
  if (!turtle) return {}

  const title = `${turtle.name}, tortuga babaua rescatada pel CRAM`
  const description = `${turtle.shortDescription} Apadrina-la amb Closcaverda.`

  return {
    title,
    description,
    keywords: [
      `tortuga ${turtle.name}`,
      turtle.species,
      "tortuga babaua",
      "apadrinar una tortuga",
      "tortugues marines",
      "Fundació CRAM",
      "Closcaverda",
    ],
    alternates: { canonical: `/tortugues/${turtle.slug}` },
    ...social({
      title,
      description,
      path: `/tortugues/${turtle.slug}`,
      type: "article",
      image: { url: coverOf(turtle.slug, turtle.image), width: 1200, alt: `Tortuga marina ${turtle.name}` },
    }),
  }
}

export default async function TurtlePage({ params }: Props) {
  const { slug } = await params
  const turtle = turtles.find((t) => t.slug === slug)
  if (!turtle) notFound()

  const url = `${site.url}/tortugues/${turtle.slug}`
  const crumbs = [
    { name: "Inici", path: "/" },
    { name: "Tortugues", path: "/tortugues" },
    { name: turtle.name, path: `/tortugues/${turtle.slug}` },
  ]

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: `${turtle.name}, tortuga babaua rescatada pel CRAM`,
        description: turtle.shortDescription,
        image: coverOf(turtle.slug, turtle.image),
        url,
        inLanguage: "ca",
        mainEntityOfPage: url,
        author: { "@id": `${site.url}/#organization` },
        publisher: { "@id": `${site.url}/#organization` },
        about: {
          "@type": "Taxon",
          name: turtle.species,
          alternateName: "Tortuga babaua",
          taxonRank: "species",
        },
      },
      breadcrumbSchema(crumbs),
    ],
  }

  return (
    <>
      <JsonLd data={structuredData} />
      <SiteHeader />
      <TurtleDetail turtle={turtle} crumbs={crumbs} />
      <SiteFooter />
    </>
  )
}
