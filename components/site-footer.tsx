import Link from "next/link"
import Image from "next/image"
import { InstagramIcon } from "./icons/InstagramIcon"
import { site, mailto } from "@/lib/site"
import { products } from "@/data/products"
import { turtles } from "@/data/turtles"

export default function SiteFooter() {
  return (
    <footer className="on-dark bg-posidonia text-escuma">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-16 pb-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-escuma">
                <Image src="/logoCrop.svg" alt="" width={30} height={30} />
              </span>
              <span className="heading text-2xl">closcaverda</span>
            </Link>
            <p className="mt-4 max-w-xs text-escuma/75">
              Projecte solidari que ven polseres i peluixos de tortuga per finançar el rescat de tortugues marines de
              la {site.partner.name}.
            </p>
          </div>

          <nav aria-label="Botiga">
            <h2 className="font-semibold mb-3">Botiga</h2>
            <ul className="space-y-2 text-escuma/80">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link href={`/botiga/${p.slug}`} className="hover:text-casc">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Tortugues">
            <h2 className="font-semibold mb-3">Tortugues</h2>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-escuma/80">
              {turtles.map((t) => (
                <li key={t.slug}>
                  <Link href={`/tortugues/${t.slug}`} className="hover:text-casc">
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-semibold mb-3">Contacte</h2>
            <ul className="space-y-2 text-escuma/80">
              <li>
                <a href={mailto()} className="hover:text-casc">
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-casc"
                >
                  <InstagramIcon className="h-4 w-4" />
                  @closcaverda
                </a>
              </li>
              <li>
                Recollida: {site.pickup.name}, {site.pickup.locality}
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-14 pt-6 border-t border-escuma/15 text-sm text-escuma/60">
          © {new Date().getFullYear()} closcaverda.org. Disseny i desenvolupament de{" "}
          <a href="https://manelcomiche.com" target="_blank" rel="noopener" className="underline hover:text-casc">
            Manel Comiche
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
