import type { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { Check } from "lucide-react"
import TurtleMap from "@/components/turtle-map"
import TurtleGallery from "@/components/turtle-gallery"
import Breadcrumbs, { type Crumb } from "@/components/breadcrumbs"
import { turtleImages } from "@/data/turtle-images"
import { turtles, type Turtle } from "@/data/turtles"
import { mailto, site } from "@/lib/site"
import { sized } from "@/lib/images"
import { lastRealFix } from "@/lib/tracks"

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("ca-ES", { day: "numeric", month: "long", year: "numeric" }).format(date)

const sponsorPerks = (name: string) => [
  "Certificat d'apadrinament personalitzat",
  `Actualitzacions periòdiques sobre ${name}`,
  "Accés al seguiment del seu recorregut",
  "Menció al nostre web com a padrí o padrina",
  "Un petit obsequi de record",
]

export default function TurtleDetail({ turtle, crumbs }: { turtle: Turtle; crumbs: Crumb[] }) {
  const gallery = turtleImages[turtle.slug as keyof typeof turtleImages] || []
  const cover = gallery[0] || turtle.image
  const otherTurtles = turtles.filter((t) => t.slug !== turtle.slug).slice(0, 3)
  const paragraphs = turtle.description.split(/\n\s*\n/).filter(Boolean)
  const lastFix = lastRealFix(turtle.slug)

  const facts = [
    { label: "Espècie", value: <em>{turtle.species}</em> },
    turtle.weight ? { label: "Pes al rescat", value: `${turtle.weight} kg` } : null,
    turtle.rescueDate ? { label: "Rescat", value: turtle.rescueDate } : null,
    turtle.status ? { label: "Estat", value: turtle.status } : null,
  ].filter(Boolean) as { label: string; value: ReactNode }[]

  return (
    <main id="contingut">
      {/* Header */}
      <section className="on-dark bg-posidonia text-escuma">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 pb-14 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <div>
            <Breadcrumbs items={crumbs} className="text-escuma/70" />
            <h1 className="display mt-6 text-[clamp(3.5rem,10vw,8rem)]">{turtle.name}</h1>
            <p className="mt-4 text-lg text-escuma/85 max-w-[48ch]">{turtle.shortDescription}</p>
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-escuma/20 pt-5 max-w-md">
              {facts.map((fact) => (
                <div key={fact.label} className="flex flex-col-reverse">
                  <dt className="text-sm text-escuma/65">{fact.label}</dt>
                  <dd className="text-lg font-semibold">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-escuma/10">
            <Image
              src={sized(cover, 960)}
              alt={`Tortuga marina ${turtle.name} al CRAM`}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Story */}
      <section aria-labelledby="historia" className="mx-auto max-w-7xl px-4 sm:px-6 py-20 grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div>
          <h2 id="historia" className="heading text-4xl sm:text-5xl">
            La història de {turtle.name}
          </h2>
          {turtle.characteristics && turtle.characteristics.length > 0 && (
            <>
              <h3 className="mt-10 text-xl font-bold">Característiques</h3>
              <ul className="mt-4 space-y-3">
                {turtle.characteristics.map((characteristic) => (
                  <li key={characteristic} className="flex gap-3 text-pedra">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-closca" aria-hidden="true" />
                    {characteristic}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="max-w-[68ch] space-y-5 text-lg leading-relaxed">
          {paragraphs.map((p, i) => (
            <p key={i}>{p.trim()}</p>
          ))}
          {turtle.currentStatus && (
            <div className="mt-10 border-l-4 border-closca pl-5">
              <h3 className="text-xl font-bold">Com està ara</h3>
              <p className="mt-2 text-pedra">{turtle.currentStatus}</p>
            </div>
          )}
        </div>
      </section>

      {gallery.length > 1 && (
        <section aria-labelledby="galeria" className="mx-auto max-w-7xl px-4 sm:px-6 pb-20">
          <TurtleGallery turtleName={turtle.name} images={gallery.map((src) => sized(src, 1200))} />
        </section>
      )}

      {/* Tracking */}
      <section aria-labelledby="seguiment" className="border-y border-posidonia/10 bg-white/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
          <div className="grid gap-6 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <div>
              <h2 id="seguiment" className="heading text-4xl sm:text-5xl">
                On és {turtle.name}?
              </h2>
              <p className="mt-4 text-pedra max-w-[44ch]">
                Quan la van alliberar, {turtle.name} portava un transmissor per satèl·lit del CRAM. La línia contínua
                és el recorregut que va enviar
                {lastFix && <> fins al {formatDate(lastFix)}, l&apos;últim senyal rebut</>}.
              </p>
              <p className="mt-3 text-pedra max-w-[44ch]">
                Des d&apos;aleshores, la línia discontínua mostra una posició estimada dels últims quatre mesos, que
                s&apos;actualitza cada dia a partir de les zones on es mouen les tortugues seguides pel CRAM.
              </p>
              <dl className="mt-6 space-y-2 text-sm">
                <div className="flex items-center gap-3">
                  <dt className="sr-only">Línia contínua</dt>
                  <svg width="28" height="6" aria-hidden="true">
                    <line x1="2" x2="26" y1="3" y2="3" stroke="#1f7a72" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  <dd>Senyal del satèl·lit</dd>
                </div>
                <div className="flex items-center gap-3">
                  <dt className="sr-only">Línia discontínua</dt>
                  <svg width="28" height="6" aria-hidden="true">
                    <line x1="2" x2="26" y1="3" y2="3" stroke="#768350" strokeWidth="2.5" strokeDasharray="3 8" strokeLinecap="round" />
                  </svg>
                  <dd>Posició estimada</dd>
                </div>
              </dl>
            </div>
            <div className="h-[420px] sm:h-[520px] overflow-hidden rounded-lg border border-posidonia/15 bg-posidonia/5">
              <TurtleMap turtleName={turtle.slug} />
            </div>
          </div>
        </div>
      </section>

      {/* Sponsor */}
      <section aria-labelledby="apadrina" className="mx-auto max-w-7xl px-4 sm:px-6 py-20 grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 id="apadrina" className="heading text-4xl sm:text-5xl">
            Apadrina {turtle.name}
          </h2>
          <p className="mt-4 text-lg text-pedra max-w-[50ch]">
            L&apos;apadrinament costa 50 € l&apos;any i es destina íntegrament a la conservació i el seguiment de les
            tortugues marines de la {site.partner.name}. Escriu-nos amb el teu nom i t&apos;enviarem la informació.
          </p>
          <a
            href={mailto(`Apadrinament de ${turtle.name}`)}
            className="mt-8 inline-block rounded-full bg-casc px-6 py-3 text-lg font-semibold text-posidonia hover:bg-[#ffe066] transition-colors"
          >
            Apadrina {turtle.name} per correu
          </a>
        </div>
        <div>
          <h3 className="text-xl font-bold">Què inclou</h3>
          <ul className="mt-4 divide-y divide-posidonia/15 border-y border-posidonia/15">
            {sponsorPerks(turtle.name).map((perk) => (
              <li key={perk} className="py-4 text-lg">
                {perk}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Other turtles */}
      <section aria-labelledby="altres" className="on-dark bg-[#5d6640] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="altres" className="heading text-4xl sm:text-5xl">
              Altres tortugues per apadrinar
            </h2>
            <Link href="/tortugues" className="font-semibold underline underline-offset-4">
              Totes les tortugues
            </Link>
          </div>
          <ul className="mt-10 grid gap-8 sm:grid-cols-3">
            {otherTurtles.map((other) => (
              <li key={other.slug} className="group relative">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-posidonia/30">
                  <Image
                    src={sized(turtleImages[other.slug as keyof typeof turtleImages]?.[0] || other.image, 640)}
                    alt={`Tortuga marina ${other.name}`}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
                  />
                </div>
                <h3 className="heading mt-4 text-3xl">
                  <Link href={`/tortugues/${other.slug}`} className="after:absolute after:inset-0 hover:underline underline-offset-4">
                    {other.name}
                  </Link>
                </h3>
                <p className="mt-1 text-white/80">{other.status}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
