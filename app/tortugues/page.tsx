import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { turtles } from "@/data/turtles"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Apadrina una Tortuga Marina | Closcaverda",
  description:
    "Contribueix a la conservació de les tortugues marines apadrinant una de les nostres tortugues geolocalitzades. Segueix el seu recorregut i ajuda a protegir aquesta espècie en perill.",
  keywords: [
    "apadrinament tortugues",
    "tortugues marines",
    "conservació marina",
    "CRAM",
    "Closcaverda",
    "seguiment tortugues",
  ],
}

export default function TurtlesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-100">
      <SiteHeader />

      {/* Hero Section */}
      <section className="py-20 bg-[#768350] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Apadrina una Tortuga Marina</h1>
            <p className="text-xl mb-8">
              Ajuda'ns a protegir aquestes meravelloses criatures i contribueix a la conservació del medi marí
            </p>
            <Button className="bg-white text-[#768350] hover:bg-green-100">
              <a href="#tortugues">Veure les tortugues</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-[#768350] mb-6">Per què apadrinar?</h2>
                <p className="text-slate-600 mb-4">
                  Les tortugues marines són espècies en perill d'extinció que s'enfronten a nombroses amenaces: pèrdua
                  d'hàbitat, contaminació, canvi climàtic i interaccions amb activitats humanes.
                </p>
                <p className="text-slate-600 mb-4">
                  Apadrinar una tortuga marina és una forma directa de contribuir a la seva conservació. Els fons
                  recaptats es destinen a:
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-[#768350] mr-2">✓</span>
                    Rescat i rehabilitació d'exemplars ferits
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#768350] mr-2">✓</span>
                    Seguiment científic mitjançant dispositius GPS
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#768350] mr-2">✓</span>
                    Programes d'educació i conscienciació
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#768350] mr-2">✓</span>
                    Protecció de platges de nidificació
                  </li>
                </ul>
              </div>
              <div className="relative h-80 rounded-lg overflow-hidden">
                <Image src="/logoCRAM.svg" alt="Conservació de tortugues marines" fill className="object-contain p-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Turtles Section */}
      <section id="tortugues" className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-[#768350] mb-12">Les nostres tortugues</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {turtles.map((turtle) => (
                <div
                  key={turtle.slug}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-56">
                    <Image
                      src={turtle.image || "/placeholder.svg?height=300&width=400&query=sea turtle"}
                      alt={turtle.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#768350] mb-2">{turtle.name}</h3>
                    <p className="text-sm text-slate-500 mb-3">{turtle.species}</p>
                    <p className="text-slate-600 mb-4 line-clamp-3">{turtle.shortDescription}</p>
                    <Button className="w-full bg-[#768350] hover:bg-green-700">
                      <Link href={`/tortugues/${turtle.slug}`}>Conèixer més</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Fes un pas per la conservació marina</h2>
            <p className="text-xl mb-8">
              Apadrina una tortuga avui mateix i forma part d'un projecte que marca la diferència
            </p>
            <Button className="bg-white text-blue-600 hover:bg-blue-50">
              <a href="mailto:hola@closcaverda.org?subject=Apadrinament de tortuga">Contacta'ns</a>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
