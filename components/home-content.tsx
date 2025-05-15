"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChevronRight, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useInView } from "react-intersection-observer"
import YoutubePopup from "@/components/youtube-popup"

export default function HomeContent() {
  const [showPopup, setShowPopup] = useState(false)
  const [popupShown, setPopupShown] = useState(false)

  useEffect(() => {
    // Show popup after a short delay, but only if it hasn't been shown before
    if (!popupShown) {
      const timer = setTimeout(() => {
        setShowPopup(true)
        setPopupShown(true)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [popupShown])

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

  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [commitmentRef, commitmentInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [productsRef, productsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [helpRef, helpInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <>
      {showPopup && <YoutubePopup videoId="jF3hWutBB2g" onClose={() => setShowPopup(false)} />}

      {/* Hero Section */}
      <section id="inici" className="relative py-20 overflow-hidden" ref={heroRef}>
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-teal-300 blur-3xl"></div>
          <div className="absolute left-20 top-40 w-72 h-72 rounded-full bg-blue-300 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.h1 className="text-4xl md:text-6xl font-bold text-[#768350] mb-6" variants={fadeInUp}>
              Fundació dedicada a la conservació de les tortugues marines
            </motion.h1>

            <motion.p className="text-lg md:text-xl text-slate-700 mb-8" variants={fadeInUp}>
              Preservació dels seus hàbitats naturals i protecció de les espècies en perill.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={fadeInUp}>
              <Button size="lg" className="bg-[#768350] hover:bg-green-700">
                <Link href="/botiga">Visita la nostra botiga</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-[#768350] text-[#768350] hover:bg-green-50">
                <Link href="mailto:hola@closcaverda.org">Fes un donatiu</Link>
              </Button>
            </motion.div>

            <motion.div className="mt-12" variants={fadeInUp}>
              <Link
                href="#compromisos"
                className="inline-flex items-center text-[#768350] hover:text-green-700 font-medium"
              >
                Descobreix més <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-cyan-50 to-transparent"></div>
      </section>

      {/* Commitments Section */}
      <section id="compromisos" className="py-20 bg-white" ref={commitmentRef}>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            animate={commitmentInView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold text-[#768350] mb-2">COMPROMISOS</h2>
            <p className="text-xl text-slate-600">El nostre compromís amb la fundació CRAM</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
            initial="hidden"
            animate={commitmentInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <CommitmentCard
              title="Donació Íntegra de Beneficis"
              description="Ens comprometem a donar el 100% dels beneficis obtinguts de la venda de les nostres polseres i clauers a la Fundació CRAM. Creiem que, a través d'aquest gest, podem contribuir de manera significativa a la conservació del medi marí."
              icon="💰"
              variants={fadeInUp}
            />

            <CommitmentCard
              title="Conscienciació i Educació"
              description="A més del nostre suport econòmic, ens comprometem a utilitzar les nostres plataformes i esdeveniments per a difondre informació rellevant sobre la preservació del medi marí, les espècies en risc i el treball vital que realitza la Fundació CRAM."
              icon="🧠"
              variants={fadeInUp}
            />

            <CommitmentCard
              title="Participació Activa"
              description="Ens comprometem a participar activament en les iniciatives i esdeveniments organitzats per la Fundació CRAM, fomentant la integració de la nostra comunitat en aquestes activitats."
              icon="🤝"
              variants={fadeInUp}
            />

            <CommitmentCard
              title="Innovació en Pro de la Conservació"
              description="Ens comprometem a explorar i desenvolupar noves formes de suport a la Fundació CRAM, que puguin incloure des de la creació de productes exclusius en col·laboració amb artistes i dissenyadors, fins a la implementació de tecnologies netes."
              icon="💡"
              variants={fadeInUp}
            />
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section id="botiga" className="py-20 bg-gradient-to-b from-cyan-50 to-blue-100" ref={productsRef}>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            animate={productsInView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold text-[#768350] mb-2">Els nostres productes</h2>
            <p className="text-xl text-slate-600">Productes sostenibles que ajuden a la conservació</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            animate={productsInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <ProductCard
              title="Polseres marines"
              description="Polseres de qualitat amb un disseny únic. Fets a mà amb amor per promoure la conservació de les tortugues."
              image="/images/products/PolseresMarines.webp"
              variants={fadeInUp}
            />

            <ProductCard
              title="Peluixos amb casc"
              description="Peluixos amb casc en format clauer per als amants de les tortugues marines i les aventures emocionants."
              image="/images/products/PeluixosCasc.webp"
              variants={fadeInUp}
            />

            <ProductCard
              title="Peluixos"
              description="Adorables peluixos en format clauer, perfectes per acompanyar-te a tot arreu i protegir les tortugues marines."
              image="/images/products/Peluixos.webp"
              variants={fadeInUp}
            />
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial="hidden"
            animate={productsInView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <Button size="lg" className="bg-[#768350] hover:bg-green-700">
              <Link href="/botiga">Reserva ja el teu favorit!</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* How to Help Section */}
      <section id="donacions" className="py-20 bg-white" ref={helpRef}>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            animate={helpInView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold text-[#768350] mb-2">AJUDAN'S</h2>
            <p className="text-xl text-slate-600">Com ens pots ajudar?</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            animate={helpInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <HelpCard
              title="Fes una Donació"
              description="Aporta un donatiu per ajudar-nos a protegir les tortugues marines i els seus hàbitats. Tota contribució és important."
              icon="🎁"
              variants={fadeInUp}
            />

            <HelpCard
              title="Compra de productes"
              description="Explora la nostra increïble selecció de productes, fets amb amor i compromís per a la conservació de les tortugues marines."
              icon="🛍️"
              variants={fadeInUp}
              link="/botiga"
            />

            <HelpCard
              title="Apadrina una tortuga"
              description="Apadrina una de les nostres tortugues marines i segueix el seu recorregut. El teu suport ajuda a la seva conservació."
              icon="🐢"
              variants={fadeInUp}
              link="/tortugues"
            />
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gradient-to-b from-cyan-50 to-blue-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#768350] mb-2">FAQ</h2>
            <p className="text-xl text-slate-600">Preguntes Comunes</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-medium">
                  Quins productes comercialitza la fundació?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  La fundació ven una varietat de productes, incloent polseres i clauers.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-medium">
                  Com ajuden els beneficis de les vendes a salvar les tortugues marines?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  Tots els beneficis de les vendes es destinen a finançar projectes de conservació, donar suport als
                  esforços de recerca i implementar iniciatives per protegir les tortugues marines i els seus hàbitats.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-medium">
                  Puc fer una donació en comptes de comprar un producte?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  Sí, pots optar per fer una donació directa a la fundació si prefereixes no comprar un producte. La
                  teva donació encara contribuirà a salvar les tortugues marines.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-medium">
                  Els productes estan fets de materials sostenibles?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  Sí, la fundació està compromesa amb la sostenibilitat. Els productes estan fabricats amb materials
                  ecològics com el plàstic reciclat i components biodegradables.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-lg font-medium">
                  Veneu els vostres productes a través d'internet?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  No, dona't el nostre limitat estoc, només podem fer reserves en línia i garantir la compra per la seva
                  recollida en el centre: Miquel Martí i Pol de Cornellà de Llobregat.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#768350] text-white" ref={statsRef}>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold mb-2">Uneix-te a la lluita per salvar tortugues marines</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <StatCard number="3" label="Productes sostenibles" variants={fadeInUp} />

            <StatCard number="+120€" label="Recaptats per la fundació CRAM" variants={fadeInUp} />

            <StatCard number="+87" label="Donants Actius" variants={fadeInUp} />

            <StatCard number="8" label="Tortugues geolocalitzades" variants={fadeInUp} />
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacta" className="py-20 bg-gradient-to-b from-green-50 to-blue-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#768350] mb-2">Contacta amb nosaltres</h2>
          </div>

          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-center gap-4 mb-8 bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Mail className="h-6 w-6 text-[#768350]" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="font-medium">hola@closcaverda.org</p>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-slate-600">
                Per a qualsevol consulta o informació addicional, no dubtis en contactar-nos per correu electrònic.
                Estarem encantats d'ajudar-te!
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// Component for commitment cards
function CommitmentCard({
  title,
  description,
  icon,
  variants,
}: {
  title: string
  description: string
  icon: string
  variants: any
}) {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-100 hover:shadow-lg transition-shadow"
      variants={variants}
    >
      <div className="p-6">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4 text-2xl">{icon}</div>
        <h3 className="text-xl font-bold text-[#768350] mb-2">{title}</h3>
        <p className="text-slate-600">{description}</p>
      </div>
    </motion.div>
  )
}

// Component for product cards
function ProductCard({
  title,
  description,
  image,
  variants,
}: {
  title: string
  description: string
  image: string
  variants: any
}) {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      variants={variants}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform hover:scale-105 duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-[#768350] mb-2">{title}</h3>
        <p className="text-slate-600">{description}</p>
      </div>
    </motion.div>
  )
}

// Component for help cards
function HelpCard({
  title,
  description,
  icon,
  variants,
  link,
}: {
  title: string
  description: string
  icon: string
  variants: any
  link?: string
}) {
  return (
    <motion.div
      className="bg-green-50 rounded-xl p-6 border border-green-100 hover:bg-green-100 transition-colors"
      variants={variants}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-[#768350] mb-2">{title}</h3>
      <p className="text-slate-600 mb-4">{description}</p>
      {link && (
        <div className="mt-auto">
          <Link href={link} className="text-[#768350] hover:text-green-700 font-medium inline-flex items-center">
            Més informació <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      )}
    </motion.div>
  )
}

// Component for stat cards
function StatCard({
  number,
  label,
  variants,
}: {
  number: string
  label: string
  variants: any
}) {
  return (
    <motion.div className="text-center" variants={variants}>
      <div className="text-4xl md:text-5xl font-bold mb-2">{number}</div>
      <div className="text-green-200">{label}</div>
    </motion.div>
  )
}
