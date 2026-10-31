import type { Metadata } from "next"
import Link from "next/link"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Pàgina no trobada",
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="contingut" className="mx-auto max-w-7xl px-4 sm:px-6 py-24 sm:py-32">
        <h1 className="display text-[clamp(3rem,9vw,7rem)] max-w-[12ch]">Aquesta pàgina s&apos;ha perdut al mar</h1>
        <p className="mt-6 text-lg text-pedra max-w-[48ch]">
          L&apos;enllaç pot estar trencat o la pàgina pot haver canviat d&apos;adreça. Prova des d&apos;aquí:
        </p>
        <ul className="mt-8 flex flex-wrap gap-4">
          <li>
            <Link href="/" className="inline-block rounded-full bg-casc px-6 py-3 font-semibold">
              Torna a l&apos;inici
            </Link>
          </li>
          <li>
            <Link href="/botiga" className="inline-block rounded-full border-2 border-posidonia px-6 py-3 font-semibold">
              Veure la botiga
            </Link>
          </li>
          <li>
            <Link href="/tortugues" className="inline-block rounded-full border-2 border-posidonia px-6 py-3 font-semibold">
              Veure les tortugues
            </Link>
          </li>
        </ul>
      </main>
      <SiteFooter />
    </>
  )
}
