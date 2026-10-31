export const site = {
  name: "Closcaverda",
  url: "https://closcaverda.org",
  email: "hola@closcaverda.org",
  instagram: "https://www.instagram.com/closcaverda",
  twitter: "https://twitter.com/closcaverda",
  locale: "ca_ES",
  description:
    "Botiga solidària de polseres i peluixos de tortuga a 3 €. El 100% dels beneficis va a la Fundació CRAM per rescatar i curar tortugues marines.",
  pickup: {
    name: "Institut Miquel Martí i Pol",
    locality: "Cornellà de Llobregat",
    region: "Barcelona",
    country: "ES",
  },
  partner: {
    name: "Fundació CRAM",
    url: "https://cram.org",
  },
  videoId: "jF3hWutBB2g",
} as const

interface SocialImage {
  url: string
  width?: number
  height?: number
  alt: string
}

const defaultImage: SocialImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Closcaverda: polseres i peluixos solidaris per les tortugues marines",
}

// Child pages replace (not merge) the parent's openGraph/twitter objects, so every page builds the full set here.
export function social({
  title,
  description,
  path,
  type = "website",
  image,
}: {
  title: string
  description: string
  path: string
  type?: "website" | "article"
  image?: SocialImage
}) {
  return {
    openGraph: {
      type,
      locale: site.locale,
      siteName: site.name,
      url: `${site.url}${path === "/" ? "" : path}`,
      title,
      description,
      images: [image ?? defaultImage],
    },
    twitter: {
      card: "summary_large_image" as const,
      site: "@closcaverda",
      title,
      description,
      images: [(image ?? defaultImage).url],
    },
  }
}

export const mailto = (subject?: string) =>
  `mailto:${site.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`
