import type { Metadata } from "next"
import { turtles } from "@/data/turtles"
import TurtlePageClient from "./TurtlePageClient"

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const turtle = turtles.find((t) => t.slug === slug)

  if (!turtle) {
    return {
      title: "Tortuga no trobada | Closcaverda",
      description: "La tortuga que busques no existeix.",
    }
  }

  return {
    title: `${turtle.name} | Apadrina una Tortuga Marina | Closcaverda`,
    description: turtle.shortDescription,
    keywords: [
      turtle.name,
      turtle.species,
      "apadrinament tortugues",
      "tortugues marines",
      "conservació marina",
      "CRAM",
      "Closcaverda",
    ],
    openGraph: {
      title: `${turtle.name} | Apadrina una Tortuga Marina | Closcaverda`,
      description: turtle.shortDescription,
      images: [
        {
          url: turtle.image,
          width: 800,
          height: 600,
          alt: turtle.name,
        },
      ],
    },
  }
}

export async function generateStaticParams() {
  return turtles.map((turtle) => ({ slug: turtle.slug }))
}

export default async function TurtlePage({ params }: PageProps) {
  const { slug } = await params
  const turtle = turtles.find((t) => t.slug === slug) as any;

  return <TurtlePageClient params={turtle} />
}
