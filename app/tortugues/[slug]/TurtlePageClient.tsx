"use client"
import { notFound } from "next/navigation"
import { turtles } from "@/data/turtles"
import TurtleDetail from "@/components/turtle-detail"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"

interface PageProps {
  params: {
    slug: string
  }
}

export default async function TurtlePageClient({ params }: PageProps) {
  const { slug } = await params
  const turtle = turtles.find((t) => t.slug === slug)

  if (!turtle) { notFound() }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-100">
      <SiteHeader />
      <TurtleDetail turtle={turtle} />
      <SiteFooter />
    </div>
  )
}
