import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Check } from "lucide-react"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import ProductCard, { PriceSticker } from "@/components/product-card"
import HowToBuy from "@/components/how-to-buy"
import JsonLd from "@/components/json-ld"
import Breadcrumbs, { breadcrumbSchema } from "@/components/breadcrumbs"
import { products, formatPrice } from "@/data/products"
import { site, mailto, social } from "@/lib/site"

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)
  if (!product) return {}

  const title = product.seoTitle
  const description = `${product.shortDescription} El 100% dels beneficis va a la Fundació CRAM per salvar tortugues marines.`

  return {
    title,
    description,
    keywords: [product.title.toLowerCase(), "tortuga marina", "regal solidari", "botiga solidària", "Fundació CRAM"],
    alternates: { canonical: `/botiga/${product.slug}` },
    ...social({ title, description, path: `/botiga/${product.slug}` }),
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)
  if (!product) notFound()

  const url = `${site.url}/botiga/${product.slug}`
  const crumbs = [
    { name: "Inici", path: "/" },
    { name: "Botiga", path: "/botiga" },
    { name: product.title, path: `/botiga/${product.slug}` },
  ]

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${url}#product`,
        name: product.title,
        description: product.longDescription,
        image: `${site.url}${product.image}`,
        url,
        brand: { "@type": "Brand", name: site.name },
        offers: {
          "@type": "Offer",
          price: product.price.toFixed(2),
          priceCurrency: "EUR",
          availability: "https://schema.org/InStoreOnly",
          itemCondition: "https://schema.org/NewCondition",
          url,
          seller: { "@id": `${site.url}/#organization` },
          availableDeliveryMethod: "https://schema.org/OnSitePickup",
          availableAtOrFrom: {
            "@type": "Place",
            name: site.pickup.name,
            address: {
              "@type": "PostalAddress",
              addressLocality: site.pickup.locality,
              addressRegion: site.pickup.region,
              addressCountry: site.pickup.country,
            },
          },
          hasMerchantReturnPolicy: {
            "@type": "MerchantReturnPolicy",
            applicableCountry: "ES",
            returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
          },
        },
      },
      breadcrumbSchema(crumbs),
    ],
  }

  const others = products.filter((p) => p.slug !== product.slug)

  return (
    <>
      <JsonLd data={structuredData} />
      <SiteHeader />
      <main id="contingut">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 pb-20">
          <Breadcrumbs items={crumbs} />

          <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-posidonia/10">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <PriceSticker price={product.price} className="absolute -top-4 -right-2 sm:-right-5" />
            </div>

            <div className="lg:pt-6">
              <h1 className="display text-[clamp(2.75rem,6vw,5.5rem)]">{product.title}</h1>
              <p className="mt-4 text-xl font-semibold">
                {formatPrice(product.price)}, 100% solidari amb la {site.partner.name}
              </p>
              <p className="mt-6 text-lg text-pedra max-w-[56ch]">{product.longDescription}</p>

              <h2 className="mt-10 text-xl font-bold">Característiques</h2>
              <ul className="mt-4 space-y-3">
                {product.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-closca" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
                <a
                  href={mailto(`Reserva: ${product.title}`)}
                  className="rounded-full bg-casc px-7 py-3.5 text-lg font-semibold text-posidonia hover:bg-[#ffe066] transition-colors"
                >
                  Reserva per correu
                </a>
                <p className="text-pedra">
                  Recollida a l&apos;{site.pickup.name}, {site.pickup.locality}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="com-comprar" className="border-y border-posidonia/10 bg-white/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
            <HowToBuy />
          </div>
        </section>

        <section aria-labelledby="altres-titol" className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
          <h2 id="altres-titol" className="heading text-4xl sm:text-5xl">
            També a la botiga
          </h2>
          <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
