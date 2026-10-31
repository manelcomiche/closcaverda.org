import type React from "react"
import "@/app/globals.css"
import { Bricolage_Grotesque } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import JsonLd from "@/components/json-ld"
import type { Metadata, Viewport } from "next"
import { site } from "@/lib/site"

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  variable: "--font-bricolage",
  display: "swap",
})

const title = "Polseres i peluixos solidaris de tortuga | Closcaverda"

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: "%s | Closcaverda",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "tortugues marines",
    "botiga solidària",
    "polseres de tortuga",
    "peluix de tortuga",
    "clauer de tortuga",
    "regal solidari",
    "tortuga babaua",
    "Caretta caretta",
    "Fundació CRAM",
    "apadrinar una tortuga",
    "conservació marina",
    "Cornellà de Llobregat",
    "Closcaverda",
  ],
  authors: [{ name: "Manel Comiche", url: "https://manelcomiche.com" }],
  creator: "Manel Comiche",
  publisher: site.name,
  category: "Conservació marina",
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    site: "@closcaverda",
    creator: "@closcaverda",
    title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/tortugaBlip.png",
  },
  formatDetection: { telephone: false },
}

export const viewport: Viewport = {
  themeColor: "#0f3a34",
  colorScheme: "light",
}

const organization = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      logo: `${site.url}/tortugaBlip.png`,
      email: site.email,
      description: site.description,
      sameAs: [site.instagram, site.twitter],
      areaServed: { "@type": "Place", name: `${site.pickup.locality}, Catalunya` },
      knowsAbout: ["Tortugues marines", "Caretta caretta", "Conservació marina", site.partner.name],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      inLanguage: "ca",
      publisher: { "@id": `${site.url}/#organization` },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ca" className={bricolage.variable} suppressHydrationWarning>
      <body className="font-sans">
        <a
          href="#contingut"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-casc focus:px-5 focus:py-3 focus:font-semibold"
        >
          Salta al contingut
        </a>
        <JsonLd data={organization} />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          enableColorScheme={true}
          storageKey="closcaverda-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
