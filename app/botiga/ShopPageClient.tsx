"use client"
import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useInView } from "react-intersection-observer"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"

export default function ShopPageClient() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

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

  const [productsRef, productsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-100">
      {/* Navigation */}
      <SiteHeader />

      {/* Store Header */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">La nostra botiga solidària</h1>
            <p className="text-lg md:text-xl text-green-100 mb-8">
              Cada compra que fas contribueix directament a la conservació de les tortugues marines i els seus hàbitats.
              Tots els productes tenen un preu de 3€ i el 100% dels beneficis es destinen a la Fundació CRAM.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20" ref={productsRef}>
        <div className="container mx-auto px-4">
          {selectedProduct ? (
            <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />
          ) : (
            <>
              <motion.div
                className="text-center mb-16"
                initial="hidden"
                animate={productsInView ? "visible" : "hidden"}
                variants={fadeInUp}
              >
                <h2 className="text-3xl font-bold text-green-800 mb-2">Els nostres productes</h2>
                <p className="text-xl text-slate-600">Tots els productes tenen un preu de 3€</p>
              </motion.div>

              <motion.div
                className="grid md:grid-cols-3 gap-8"
                initial="hidden"
                animate={productsInView ? "visible" : "hidden"}
                variants={staggerContainer}
              >
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer flex flex-col h-full"
                    variants={fadeInUp}
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform hover:scale-105 duration-500"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-green-800 mb-2">{product.title}</h3>
                      <p className="text-slate-600 mb-4 flex-grow">{product.shortDescription}</p>
                      <div className="flex justify-between items-center mt-auto">
                        <span className="font-bold text-green-600">3,00 €</span>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Veure detalls
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </div>
      </section>

      {/* How to Buy Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-green-800 mb-4">Com comprar</h2>
              <p className="text-lg text-slate-600">
                Per adquirir qualsevol dels nostres productes, segueix aquests senzills passos:
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-green-600">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-green-800 mb-2">Selecciona el teu producte</h3>
                  <p className="text-slate-600">
                    Explora la nostra botiga i tria el producte que més t'agradi. Tots tenen un preu de 3€.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-green-600">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-green-800 mb-2">Contacta'ns per email</h3>
                  <p className="text-slate-600">
                    Envia'ns un correu a <span className="font-medium">hola@closcaverda.org</span> indicant el producte
                    que vols comprar i la quantitat.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-green-600">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-green-800 mb-2">Recollida al centre</h3>
                  <p className="text-slate-600">
                    Donat el nostre limitat estoc, només podem fer reserves en línia i garantir la compra per la seva
                    recollida en el centre: Miquel Martí i Pol de Cornellà de Llobregat.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-green-50 rounded-xl border border-green-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-green-800">Contacta per comprar</h3>
                  <p className="text-green-600">hola@closcaverda.org</p>
                </div>
              </div>
              <p className="text-slate-600">
                Per a qualsevol consulta sobre els productes o el procés de compra, no dubtis en contactar-nos. Estarem
                encantats d'ajudar-te!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </div>
  )
}

// Product Detail Component
function ProductDetail({ product, onBack }: { product: Product; onBack: () => void }) {
  return (
    <div className="max-w-5xl mx-auto">
      <button onClick={onBack} className="flex items-center text-green-600 hover:text-green-700 font-medium mb-8">
        <ChevronLeft className="mr-1 h-5 w-5" />
        Tornar a la botiga
      </button>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <div className="relative h-72 md:h-96 w-full">
              <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-cover" />
            </div>
          </div>
          <div className="md:w-1/2 p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">{product.title}</h2>
            <div className="flex items-center mb-6">
              <span className="text-2xl font-bold text-green-600 mr-4">3,00 €</span>
              <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                100% solidari
              </span>
            </div>

            <div className="prose prose-green mb-8">
              <p className="text-lg text-slate-600 mb-4">{product.longDescription}</p>
              <ul className="space-y-2 text-slate-600">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <p className="text-green-800">
                <strong>Com comprar:</strong> Envia un correu a{" "}
                <span className="font-medium">hola@closcaverda.org</span> indicant el producte i la quantitat.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2">
                <a href={`mailto:hola@closcaverda.org?subject=Compra de producte: ${product.title}`}>
                  <Mail className="h-4 w-4 inline mr-2" />
                  Contactar per comprar
                </a>
              </Button>
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                Més informació
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Product Type
interface Product {
  id: number
  title: string
  shortDescription: string
  longDescription: string
  features: string[]
  image: string
}

// Product Data
const products: Product[] = [
  {
    id: 1,
    title: "Polseres marines",
    shortDescription: "Polseres de qualitat amb un disseny únic.",
    longDescription:
      "Les nostres polseres marines són molt més que un accessori de moda. Cada peça està feta a mà amb materials sostenibles i representa el nostre compromís amb la conservació de les tortugues marines. El disseny únic s'inspira en les ones del mar i els colors de les espècies que protegim.",
    features: [
      "Fetes a mà amb materials sostenibles",
      "Disseny exclusiu inspirat en el mar",
      "Ajustables a qualsevol canell",
      "Resistents a l'aigua",
      "El 100% dels beneficis es destinen a la Fundació CRAM",
    ],
    image: "/images/products/PolseresMarines.webp",
  },
  {
    id: 2,
    title: "Peluixos amb casc",
    shortDescription: "Peluixos amb casc en format clauer per als amants de les tortugues marines.",
    longDescription:
      "Els nostres adorables peluixos amb casc són perfectes per als amants de les tortugues marines i les aventures emocionants. Cada clauer representa una tortuga marina amb el seu casc protector, simbolitzant la nostra missió de protegir aquestes meravelloses criatures marines.",
    features: [
      "Material suau i durador",
      "Casc protector extraïble",
      "Perfecte com a clauer o decoració",
      "Disseny exclusiu de Closcaverda",
      "Ideal per a regalar i conscienciar",
    ],
    image: "/images/products/PeluixosCasc.webp",
  },
  {
    id: 3,
    title: "Peluixos",
    shortDescription: "Adorables peluixos en format clauer, perfectes per acompanyar-te a tot arreu.",
    longDescription:
      "Els nostres peluixos de tortuga són els companys perfectes per al dia a dia. Aquests adorables clauers de tortuga marina t'acompanyaran a tot arreu mentre contribueixes a una causa important. Cada peluix representa una de les espècies de tortugues marines que treballem per protegir.",
    features: [
      "Disseny compacte i lleuger",
      "Materials ecològics i sostenibles",
      "Colors vius i detalls acurats",
      "Anella resistent per a claus o motxilles",
      "Cada model representa una espècie diferent de tortuga marina",
    ],
    image: "/images/products/Peluixos.webp",
  },
]
