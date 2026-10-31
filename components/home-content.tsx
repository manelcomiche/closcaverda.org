import Image from "next/image"
import Link from "next/link"
import SeaChart from "@/components/sea-chart"
import ProductCard from "@/components/product-card"
import HowToBuy from "@/components/how-to-buy"
import FaqList from "@/components/faq-list"
import VideoButton from "@/components/video-button"
import { products } from "@/data/products"
import { turtles } from "@/data/turtles"
import { turtleImages } from "@/data/turtle-images"
import { site, mailto } from "@/lib/site"
import { sized } from "@/lib/images"

const commitments = [
  {
    title: "Donem el 100% dels beneficis",
    body: "Tot el que guanyem amb les polseres i els clauers va a la Fundació CRAM per rescatar i curar tortugues marines.",
  },
  {
    title: "Expliquem per què cal protegir-les",
    body: "Fem servir les xarxes i els actes de l'institut per parlar de les amenaces del mar i de la feina del CRAM.",
  },
  {
    title: "Participem en les seves activitats",
    body: "Ens apuntem a les iniciatives i alliberaments que organitza el CRAM i hi portem la nostra comunitat.",
  },
  {
    title: "Busquem noves maneres d'ajudar",
    body: "Volem crear productes amb artistes i dissenyadors i trobar formes més netes de fer-los.",
  },
]

export default function HomeContent() {
  const featuredTurtles = turtles.slice(0, 3)

  return (
    <main id="contingut">
      {/* Hero: the routes of the turtles the project follows */}
      <section aria-labelledby="titol" className="on-dark bg-posidonia text-escuma overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-14 sm:pt-20 pb-10">
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end">
            <h1 id="titol" className="display text-[clamp(3rem,8.5vw,7.25rem)] max-w-[13ch]">
              Polseres i peluixos que tornen tortugues al mar
            </h1>
            <div className="lg:pb-3">
              <p className="text-lg sm:text-xl text-escuma/85 max-w-[42ch]">
                Cada producte costa 3 € i el 100% del benefici va a la {site.partner.name}, que rescata i cura
                tortugues marines a la costa catalana.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Link
                  href="/botiga"
                  className="rounded-full bg-casc px-6 py-3 text-lg font-semibold text-posidonia hover:bg-[#ffe066] transition-colors"
                >
                  Veure la botiga
                </Link>
                <VideoButton videoId={site.videoId} />
              </div>
            </div>
          </div>

          <div className="mt-12 sm:mt-16">
            <SeaChart />
          </div>
        </div>
      </section>

      {/* Shop */}
      <section id="botiga" aria-labelledby="botiga-titol" className="mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 id="botiga-titol" className="heading text-4xl sm:text-6xl max-w-[16ch]">
              Tres productes, un sol preu
            </h2>
            <p className="mt-4 text-lg text-pedra max-w-[52ch]">
              Fets per portar posats i recordar per què els portes. Reserva’ls per correu i recull-los a{" "}
              {site.pickup.locality}.
            </p>
          </div>
          <Link href="/botiga" className="font-semibold underline underline-offset-4 decoration-2 decoration-closca">
            Tota la botiga
          </Link>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section aria-labelledby="com-comprar" className="border-y border-posidonia/10 bg-white/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
          <HowToBuy />
        </div>
      </section>

      {/* Where the money goes */}
      <section
        id="compromisos"
        aria-labelledby="compromisos-titol"
        className="mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28"
      >
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <h2 id="compromisos-titol" className="heading text-4xl sm:text-5xl max-w-[14ch]">
              On van els teus 3 euros
            </h2>
            <p className="mt-4 text-lg text-pedra max-w-[44ch]">
              Closcaverda és un projecte d’alumnes de l’{site.pickup.name}. No ens quedem res: treballem per a la{" "}
              <a href={site.partner.url} target="_blank" rel="noopener" className="underline underline-offset-4">
                {site.partner.name}
              </a>
              , el centre de recuperació d’animals marins del Prat de Llobregat.
            </p>
          </div>

          <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {commitments.map((c) => (
              <li key={c.title}>
                <h3 className="text-xl font-bold">{c.title}</h3>
                <p className="mt-2 text-pedra">{c.body}</p>
              </li>
            ))}
          </ul>
        </div>

        <dl className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 border-t-2 border-posidonia pt-8">
          <div className="flex flex-col-reverse">
            <dt className="mt-2 text-pedra">Recaptat per al CRAM</dt>
            <dd className="heading text-5xl sm:text-6xl whitespace-nowrap">+120 €</dd>
          </div>
          <div className="flex flex-col-reverse">
            <dt className="mt-2 text-pedra">Persones que ens donen suport</dt>
            <dd className="heading text-5xl sm:text-6xl whitespace-nowrap">+87</dd>
          </div>
          <div className="flex flex-col-reverse">
            <dt className="mt-2 text-pedra">Tortugues que seguim</dt>
            <dd className="heading text-5xl sm:text-6xl whitespace-nowrap">{turtles.length}</dd>
          </div>
        </dl>
      </section>

      {/* Turtles */}
      <section aria-labelledby="tortugues-titol" className="bg-[#5d6640] text-white on-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 id="tortugues-titol" className="heading text-4xl sm:text-6xl max-w-[18ch]">
                Coneix les tortugues que ajudes
              </h2>
              <p className="mt-4 text-lg text-white/85 max-w-[50ch]">
                Totes són tortugues babaues (Caretta caretta) ateses pel CRAM. Llegeix la seva història, segueix el seu
                recorregut o apadrina-les per 50 € l’any.
              </p>
            </div>
            <Link
              href="/tortugues"
              className="rounded-full border-2 border-white px-5 py-2.5 font-semibold hover:bg-white hover:text-posidonia transition-colors"
            >
              Veure les {turtles.length} tortugues
            </Link>
          </div>

          <ul className="mt-12 grid gap-8 sm:grid-cols-3">
            {featuredTurtles.map((turtle) => (
              <li key={turtle.slug} className="group relative">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-posidonia/30">
                  <Image
                    src={sized(turtleImages[turtle.slug as keyof typeof turtleImages]?.[0] || turtle.image, 640)}
                    alt={`Tortuga marina ${turtle.name} al centre de recuperació del CRAM`}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
                  />
                </div>
                <h3 className="heading mt-4 text-3xl">
                  <Link href={`/tortugues/${turtle.slug}`} className="after:absolute after:inset-0 hover:underline underline-offset-4">
                    {turtle.name}
                  </Link>
                </h3>
                <p className="mt-1 text-white/80">{turtle.status}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="preguntes"
        aria-labelledby="preguntes-titol"
        className="mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28 grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16"
      >
        <h2 id="preguntes-titol" className="heading text-4xl sm:text-5xl">
          Preguntes freqüents
        </h2>
        <FaqList />
      </section>

      {/* Partners */}
      <section aria-labelledby="entitats-titol" className="border-t border-posidonia/10 bg-white/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 grid gap-8 md:grid-cols-[1fr_2fr] md:items-center">
          <div>
            <h2 id="entitats-titol" className="heading text-3xl">
              Amb qui treballem
            </h2>
            <p className="mt-3 text-pedra max-w-sm">
              El projecte neix a l’institut i treballa colze a colze amb el CRAM.
            </p>
          </div>
          <ul className="flex flex-wrap items-center gap-10">
            <li>
              <Image src="/logoMMPOL.svg" alt={site.pickup.name} width={140} height={140} className="h-28 w-auto" />
            </li>
            <li>
              <a href={site.partner.url} target="_blank" rel="noopener">
                <Image src="/logoCRAM.svg" alt={site.partner.name} width={180} height={140} className="h-28 w-auto" />
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* Contact */}
      <section id="contacta" aria-labelledby="contacta-titol" className="mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28">
        <h2 id="contacta-titol" className="heading text-4xl sm:text-5xl">
          Escriu-nos
        </h2>
        <p className="mt-4 text-lg text-pedra max-w-[52ch]">
          Per reservar un producte, apadrinar una tortuga, fer una donació o qualsevol altra pregunta.
        </p>
        <a
          href={mailto()}
          className="display mt-8 inline-block break-all text-[clamp(2rem,6.5vw,5.5rem)] underline decoration-casc decoration-[0.12em] underline-offset-[0.12em] hover:decoration-closca"
        >
          {site.email}
        </a>
      </section>
    </main>
  )
}
