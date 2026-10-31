import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { turtles } from "@/data/turtles"
import { turtleImages } from "@/data/turtle-images"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import JsonLd from "@/components/json-ld"
import Breadcrumbs, { breadcrumbSchema } from "@/components/breadcrumbs"
import { site, mailto, social } from "@/lib/site"
import { sized } from "@/lib/images"

const description =
  "Coneix les tortugues babaues (Caretta caretta) rescatades per la Fundació CRAM, segueix el seu recorregut pel Mediterrani i apadrina-les per 50 € l'any."

const crumbs = [
  { name: "Inici", path: "/" },
  { name: "Tortugues", path: "/tortugues" },
]

export const metadata: Metadata = {
  title: "Apadrina una tortuga marina rescatada pel CRAM",
  description,
  keywords: [
    "apadrinar una tortuga",
    "apadrinament tortugues marines",
    "tortuga babaua",
    "Caretta caretta",
    "seguiment de tortugues",
    "Fundació CRAM",
    "Closcaverda",
  ],
  alternates: { canonical: "/tortugues" },
  ...social({ title: "Apadrina una tortuga marina", description, path: "/tortugues" }),
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      name: "Tortugues marines per apadrinar",
      url: `${site.url}/tortugues`,
      description,
      inLanguage: "ca",
      about: { "@type": "Taxon", name: "Caretta caretta", alternateName: "Tortuga babaua", taxonRank: "species" },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: turtles.map((turtle, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${site.url}/tortugues/${turtle.slug}`,
          name: turtle.name,
        })),
      },
    },
    breadcrumbSchema(crumbs),
  ],
}

const reasons = [
  "Rescat i rehabilitació d'exemplars ferits",
  "Seguiment científic amb transmissors per satèl·lit",
  "Programes d'educació i conscienciació",
  "Protecció de platges de nidificació",
]

export default function TurtlesPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <SiteHeader />
      <main id="contingut">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 sm:pt-14 pb-16">
          <Breadcrumbs items={crumbs} />
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <h1 className="display text-[clamp(2.75rem,7vw,6rem)] max-w-[13ch]">Apadrina una tortuga marina</h1>
            <div className="lg:pb-2">
              <p className="text-lg text-pedra max-w-[46ch]">
                Aquestes {turtles.length} tortugues babaues han passat pel centre de recuperació de la{" "}
                {site.partner.name}. Llegeix la seva història i segueix el recorregut que van enviar els seus transmissors.
              </p>
              <p className="mt-3 font-semibold">L&apos;apadrinament costa 50 € l&apos;any.</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="llista-titol" className="mx-auto max-w-7xl px-4 sm:px-6 pb-24">
          <h2 id="llista-titol" className="sr-only">
            Les nostres tortugues
          </h2>
          <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {turtles.map((turtle, i) => (
              <li key={turtle.slug} className="group relative">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-posidonia/10">
                  <Image
                    src={sized(turtleImages[turtle.slug as keyof typeof turtleImages]?.[0] || turtle.image, 720)}
                    alt={`Tortuga marina ${turtle.name} (${turtle.species})`}
                    fill
                    priority={i < 3}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
                  />
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h3 className="heading text-3xl">
                    <Link
                      href={`/tortugues/${turtle.slug}`}
                      className="after:absolute after:inset-0 hover:underline underline-offset-4"
                    >
                      {turtle.name}
                    </Link>
                  </h3>
                  {turtle.status && <span className="text-sm font-semibold text-turquesa">{turtle.status}</span>}
                </div>
                <p className="text-sm italic text-pedra">{turtle.species}</p>
                <p className="mt-3 text-pedra line-clamp-3">{turtle.shortDescription}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="perque-titol" className="on-dark bg-posidonia text-escuma">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20 grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 id="perque-titol" className="heading text-4xl sm:text-5xl max-w-[16ch]">
                Per què apadrinar una tortuga?
              </h2>
              <p className="mt-5 text-lg text-escuma/80 max-w-[52ch]">
                Les tortugues marines estan amenaçades per la pèrdua d&apos;hàbitat, la contaminació, el canvi climàtic
                i les xarxes de pesca. Apadrinar-ne una és una manera directa d&apos;ajudar-les.
              </p>
              <a
                href={mailto("Apadrinament de tortuga")}
                className="mt-8 inline-block rounded-full bg-casc px-6 py-3 text-lg font-semibold text-posidonia hover:bg-[#ffe066] transition-colors"
              >
                Apadrina per correu
              </a>
            </div>
            <div>
              <h3 className="text-xl font-bold">Els diners es destinen a</h3>
              <ul className="mt-4 divide-y divide-escuma/15 border-y border-escuma/15">
                {reasons.map((reason) => (
                  <li key={reason} className="py-4 text-lg">
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
