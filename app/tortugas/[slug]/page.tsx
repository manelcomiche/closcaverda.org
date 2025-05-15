"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TurtleMap from "@/components/turtle-map"
import { turtles } from "@/data/turtles"
import { notFound } from "next/navigation"

export default function TurtlePage() {
  const params = useParams()
  const slug = params?.slug as string
  const turtle = turtles.find((t) => t.slug === slug)

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!turtle) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-100">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
              <span className="text-white font-bold">CV</span>
            </div>
            <span className="font-bold text-green-700">closcaverda.org</span>
          </div>

          <nav className="hidden md:flex space-x-6">
            <NavLink href="/#inici">Inici</NavLink>
            <NavLink href="/botiga">Botiga</NavLink>
            <NavLink href="/#blog">Blog</NavLink>
            <NavLink href="/#donacions">Donacions</NavLink>
            <NavLink href="/#contacta">Contacta</NavLink>
          </nav>

          <Button variant="outline" size="sm" className="md:hidden">
            <span className="sr-only">Menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-menu"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </header>

      {/* Turtle Header */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4">
          <Link href="/tortugas" className="inline-flex items-center text-green-100 hover:text-white mb-6">
            <ChevronLeft className="mr-1 h-5 w-5" />
            Totes les tortugues
          </Link>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{turtle.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-green-100">
              <div className="flex items-center gap-2">
                <span className="bg-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  Espècie: {turtle.species}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-green-700 px-3 py-1 rounded-full text-sm font-medium">Pes: {turtle.weight} kg</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  Longitud: {turtle.length} cm
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  Alliberada: {turtle.releaseDate}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Turtle Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="info">Informació</TabsTrigger>
                <TabsTrigger value="tracking">Seguiment</TabsTrigger>
                <TabsTrigger value="sponsor">Apadrina</TabsTrigger>
              </TabsList>
              <TabsContent value="info" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="relative h-80 w-full rounded-lg overflow-hidden mb-4">
                      <Image
                        src={turtle.image || "/placeholder.svg?height=400&width=600&query=sea turtle"}
                        alt={turtle.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative h-40 w-full rounded-lg overflow-hidden">
                        <Image
                          src={turtle.imageGallery[0] || "/placeholder.svg?height=200&width=300&query=turtle swimming"}
                          alt={`${turtle.name} - imatge 1`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="relative h-40 w-full rounded-lg overflow-hidden">
                        <Image
                          src={turtle.imageGallery[1] || "/placeholder.svg?height=200&width=300&query=turtle release"}
                          alt={`${turtle.name} - imatge 2`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-green-800 mb-4">Història</h2>
                      <div className="prose prose-green">
                        <p>{turtle.description}</p>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-green-800 mb-4">Característiques</h2>
                      <ul className="space-y-2">
                        {turtle.characteristics.map((characteristic, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            {characteristic}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-green-800 mb-4">Estat actual</h2>
                      <p className="text-slate-600">{turtle.currentStatus}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="tracking">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-green-800 mb-4">Seguiment de {turtle.name}</h2>
                    <p className="text-slate-600 mb-6">
                      Segueix el recorregut de {turtle.name} en temps real. El mapa mostra la seva última posició
                      coneguda i la ruta que ha seguit des del seu alliberament.
                    </p>
                    <div className="bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                      <div className="h-[500px] w-full" id="map">
                        {mounted && <TurtleMap turtleName={turtle.slug} />}
                      </div>
                    </div>
                    <div className="mt-6 bg-green-50 p-4 rounded-lg">
                      <h3 className="font-bold text-green-800 mb-2">Informació del seguiment</h3>
                      <p className="text-slate-600">
                        {turtle.name} porta un dispositiu de seguiment que envia senyals periòdicament. L'última
                        actualització va ser el {turtle.lastUpdate}. El dispositiu té una bateria amb una durada
                        estimada de {turtle.batteryLife}.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="sponsor">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-green-800 mb-4">Apadrina a {turtle.name}</h2>
                    <p className="text-slate-600 mb-6">
                      Apadrinar a {turtle.name} és una forma meravellosa de contribuir a la conservació de les tortugues
                      marines. Amb la teva ajuda, podem continuar el seguiment i protecció d'aquesta espècie en perill.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      <div className="bg-green-50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-green-800 mb-4">Què inclou l'apadrinament?</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            Certificat d'apadrinament personalitzat
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            Actualitzacions periòdiques sobre {turtle.name}
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            Accés exclusiu al seguiment en temps real
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            Menció al nostre lloc web com a padrí/padrina
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            Un petit obsequi de record
                          </li>
                        </ul>
                      </div>
                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold text-green-800 mb-4">Com apadrinar</h3>
                        <p className="text-slate-600 mb-4">
                          L'apadrinament té un cost de 50€ anuals, que es destinen íntegrament a la conservació i
                          seguiment de les tortugues marines.
                        </p>
                        <p className="text-slate-600 mb-6">
                          Per apadrinar a {turtle.name}, envia'ns un correu electrònic amb el teu nom i dades de
                          contacte, i t'enviarem tota la informació necessària.
                        </p>
                        <Button className="w-full bg-green-600 hover:bg-green-700">
                          <a href="mailto:hola@closcaverda.org?subject=Apadrinament de {turtle.name}">Apadrina ara</a>
                        </Button>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-lg">
                      <h3 className="text-xl font-bold text-green-800 mb-4">Per què és important?</h3>
                      <p className="text-slate-600">
                        Les tortugues marines són espècies en perill d'extinció. El teu apadrinament ajuda a finançar
                        projectes de conservació, investigació i educació per protegir aquestes meravelloses criatures i
                        els seus hàbitats naturals. Cada apadrinament marca la diferència!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Other Turtles */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">Altres tortugues per apadrinar</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {turtles
                .filter((t) => t.slug !== turtle.slug)
                .slice(0, 3)
                .map((otherTurtle) => (
                  <Link key={otherTurtle.slug} href={`/tortugas/${otherTurtle.slug}`} className="group block">
                    <div className="relative h-40 rounded-lg overflow-hidden mb-3">
                      <Image
                        src={otherTurtle.image || "/placeholder.svg?height=200&width=300&query=sea turtle"}
                        alt={otherTurtle.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105 duration-300"
                      />
                    </div>
                    <h3 className="font-bold text-green-800 group-hover:text-green-600 transition-colors">
                      {otherTurtle.name}
                    </h3>
                    <p className="text-sm text-slate-600">{otherTurtle.species}</p>
                  </Link>
                ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                <Link href="/tortugas">Veure totes les tortugues</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <span className="text-green-800 font-bold">CV</span>
              </div>
              <span className="font-bold">closcaverda.org</span>
            </div>

            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <Link href="/#inici" className="hover:text-green-300 transition-colors">
                Inici
              </Link>
              <Link href="/botiga" className="hover:text-green-300 transition-colors">
                Botiga
              </Link>
              <Link href="/#blog" className="hover:text-green-300 transition-colors">
                Blog
              </Link>
              <Link href="/#donacions" className="hover:text-green-300 transition-colors">
                Donacions
              </Link>
              <Link href="/#contacta" className="hover:text-green-300 transition-colors">
                Contacta
              </Link>
            </nav>
          </div>

          <div className="text-center text-sm text-green-200">
            <p>
              © {new Date().getFullYear()} closcaverda.org - designed by Manel Comiche (manelcomiche.com). All Rights
              Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Component for navigation links
function NavLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={`text-slate-700 hover:text-green-600 font-medium transition-colors ${className}`}>
      {children}
    </Link>
  )
}
