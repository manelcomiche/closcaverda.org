import type { Metadata } from "next"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import ProductCard from "@/components/product-card"
import HowToBuy from "@/components/how-to-buy"
import JsonLd from "@/components/json-ld"
import Breadcrumbs, { breadcrumbSchema } from "@/components/breadcrumbs"
import { products } from "@/data/products"
import { site, social } from "@/lib/site"

const description =
  "Polseres marines i clauers de peluix de tortuga a 3 €. El 100% dels beneficis va a la Fundació CRAM. Reserva per correu i recull a Cornellà de Llobregat."

const crumbs = [
  { name: "Inici", path: "/" },
  { name: "Botiga", path: "/botiga" },
]

export const metadata: Metadata = {
  title: "Botiga solidària: polseres i peluixos de tortuga a 3 €",
  description,
  keywords: [
    "botiga solidària",
    "polseres de tortuga",
    "polsera tortuga marina",
    "clauer de tortuga",
    "peluix de tortuga",
    "regal solidari",
    "Fundació CRAM",
    "Cornellà de Llobregat",
  ],
  alternates: { canonical: "/botiga" },
  ...social({ title: "Botiga solidària de tortugues marines", description, path: "/botiga" }),
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      name: "Botiga solidària Closcaverda",
      url: `${site.url}/botiga`,
      description,
      inLanguage: "ca",
      mainEntity: {
        "@type": "ItemList",
        itemListElement: products.map((product, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${site.url}/botiga/${product.slug}`,
          name: product.title,
        })),
      },
    },
    breadcrumbSchema(crumbs),
  ],
}

export default function ShopPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <SiteHeader />
      <main id="contingut">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 sm:pt-14 pb-20">
          <Breadcrumbs items={crumbs} />
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <h1 className="display text-[clamp(2.75rem,7vw,6rem)] max-w-[14ch]">
              Botiga solidària per les tortugues marines
            </h1>
            <p className="text-lg text-pedra max-w-[44ch] lg:pb-2">
              Tots els productes costen 3 € i el 100% dels beneficis es destinen a la {site.partner.name}. Tria,
              reserva per correu i recull-ho a {site.pickup.locality}.
            </p>
          </div>

          <h2 className="sr-only">Productes</h2>
          <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <ProductCard key={product.slug} product={product} priority={i === 0} />
            ))}
          </div>
        </section>

        <section aria-labelledby="com-comprar" className="border-t border-posidonia/10 bg-white/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
            <HowToBuy />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
