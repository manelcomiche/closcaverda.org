"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useInView } from "react-intersection-observer"
import { turtles } from "@/data/turtles"

export default function TurtlesPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [turtlesRef, turtlesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

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

      {/* Turtles Header */}
      <section className="py-16 bg-green-600 text-white" ref={headerRef}>
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.h1 className="text-4xl md:text-5xl font-bold mb-6" variants={fadeInUp}>
              Apadrina una tortuga marina
            </motion.h1>
            <motion.p className="text-lg md:text-xl text-green-100 mb-8" variants={fadeInUp}>
              Contribueix a la conservació de les tortugues marines apadrinant una de les nostres tortugues
              geolocalitzades. Segueix el seu recorregut i ajuda a protegir aquesta espècie en perill.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Turtles Grid */}
      <section className="py-20" ref={turtlesRef}>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            animate={turtlesInView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold text-green-800 mb-2">Les nostres tortugues</h2>
            <p className="text-xl text-slate-600">Coneix les tortugues que pots apadrinar i seguir el seu recorregut</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate={turtlesInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            {turtles.map((turtle) => (
              <motion.div
                key={turtle.slug}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                variants={fadeInUp}
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={turtle.image || "/placeholder.svg?height=300&width=500&query=sea turtle"}
                    alt={turtle.name}
                    fill
                    className="object-cover transition-transform hover:scale-105 duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-green-800 mb-1">{turtle.name}</h3>
                      <p className="text-sm text-slate-500">{turtle.species}</p>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {turtle.status}
                    </span>
                  </div>
                  <p className="text-slate-600 mb-6 line-clamp-3">{turtle.shortDescription}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-slate-500">
                      <span>Alliberada: {turtle.releaseDate}</span>
                    </div>
                    <Link
                      href={`/tortugas/${turtle.slug}`}
                      className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                    >
                      Més detalls <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sponsorship Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-green-800 mb-4">Per què apadrinar una tortuga?</h2>
              <p className="text-lg text-slate-600">
                L'apadrinament de tortugues marines és una forma directa de contribuir a la seva conservació i
                protecció.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-green-50 p-6 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4 text-2xl">
                  🔬
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">Investigació</h3>
                <p className="text-slate-600">
                  El teu apadrinament finança projectes d'investigació sobre el comportament i les rutes migratòries de
                  les tortugues marines.
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4 text-2xl">
                  🌊
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">Conservació</h3>
                <p className="text-slate-600">
                  Ajudes a protegir els hàbitats naturals de les tortugues marines i a implementar mesures per reduir
                  les amenaces a la seva supervivència.
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4 text-2xl">
                  📚
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">Educació</h3>
                <p className="text-slate-600">
                  Contribueixes a programes educatius que sensibilitzen sobre la importància de la conservació de les
                  tortugues marines i els ecosistemes marins.
                </p>
              </div>
            </div>

            <div className="text-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                <a href="mailto:hola@closcaverda.org?subject=Informació sobre apadrinament de tortugues">
                  Sol·licita més informació
                </a>
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
