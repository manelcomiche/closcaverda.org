import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Closcaverda - Conservació de Tortugues Marines",
    template: "%s | Closcaverda",
  },
  description:
    "Fundació dedicada a la conservació de les tortugues marines i la preservació dels seus hàbitats naturals.",
  keywords: [
    "tortugues marines",
    "conservació marina",
    "apadrinament",
    "CRAM",
    "Closcaverda",
    "medi ambient",
    "protecció d'espècies",
  ],
  authors: [{ name: "Manel Comiche" }],
  creator: "Closcaverda.org",
  openGraph: {
    type: "website",
    locale: "ca_ES",
    url: "https://closcaverda.org",
    title: "Closcaverda - Conservació de Tortugues Marines",
    description:
      "Fundació dedicada a la conservació de les tortugues marines i la preservació dels seus hàbitats naturals.",
    siteName: "Closcaverda",
  },
  twitter: {
    card: "summary_large_image",
    title: "Closcaverda - Conservació de Tortugues Marines",
    description:
      "Fundació dedicada a la conservació de les tortugues marines i la preservació dels seus hàbitats naturals.",
  },
  icons: {
    icon: "/favicon.ico",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ca" suppressHydrationWarning>
      <body className={inter.className}>
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
