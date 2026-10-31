import { site, mailto } from "@/lib/site"

const steps = [
  {
    title: "Tria el producte",
    body: "Polsera, peluix o peluix amb casc. Tots costen 3 €.",
  },
  {
    title: "Reserva'l per correu",
    body: (
      <>
        Escriu a{" "}
        <a href={mailto("Reserva de producte Closcaverda")} className="font-semibold underline underline-offset-4">
          {site.email}
        </a>{" "}
        amb el producte i la quantitat. Et confirmem la reserva.
      </>
    ),
  },
  {
    title: "Recull-lo i paga",
    body: `Passa per l'${site.pickup.name}, a ${site.pickup.locality}. No fem enviaments perquè l'estoc és limitat.`,
  },
]

export default function HowToBuy({ headingLevel = "h2" }: { headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
      <div>
        <Heading id="com-comprar" className="heading text-4xl sm:text-5xl">
          Com comprar
        </Heading>
        <p className="mt-4 text-lg text-pedra max-w-sm">
          No hi ha carret ni pagament en línia. Reserves per correu i ho recolleixes en persona.
        </p>
      </div>
      <ol className="grid gap-8 sm:grid-cols-3">
        {steps.map((step, i) => (
          <li key={step.title} className="border-t-2 border-posidonia pt-4">
            <span className="heading text-5xl text-closca" aria-hidden="true">
              {i + 1}
            </span>
            <h3 className="mt-2 text-xl font-bold">{step.title}</h3>
            <p className="mt-2 text-pedra">{step.body}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
