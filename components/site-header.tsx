"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { mailto } from "@/lib/site"

const links = [
  { href: "/botiga", label: "Botiga" },
  { href: "/tortugues", label: "Tortugues" },
  { href: "/#preguntes", label: "Preguntes" },
  { href: "/#contacta", label: "Contacta" },
]

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-escuma/90 backdrop-blur-md border-b border-posidonia/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Closcaverda, inici">
          <Image src="/logoCrop.svg" alt="" width={36} height={36} priority />
          <span className="heading text-2xl">closcaverda</span>
        </Link>

        <nav aria-label="Principal" className="hidden md:flex items-center gap-7">
          {links.map((link) => (
            <NavLink key={link.href} href={link.href} active={pathname.startsWith(link.href) && link.href !== "/"}>
              {link.label}
            </NavLink>
          ))}
          <a
            href={mailto("Reserva de producte Closcaverda")}
            className="rounded-full bg-casc px-4 py-2 font-semibold text-posidonia hover:bg-[#ffe066] transition-colors"
          >
            Reserva per correu
          </a>
        </nav>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <button
              type="button"
              aria-label="Obre el menú"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-posidonia/20"
            >
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-escuma">
            <SheetTitle className="heading text-2xl text-posidonia">closcaverda</SheetTitle>
            <nav aria-label="Principal" className="flex flex-col mt-8">
              <MobileNavLink href="/" onClick={() => setIsOpen(false)}>
                Inici
              </MobileNavLink>
              {links.map((link) => (
                <MobileNavLink key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
                  {link.label}
                </MobileNavLink>
              ))}
              <a
                href={mailto("Reserva de producte Closcaverda")}
                className="mt-6 rounded-full bg-casc px-5 py-3 text-center font-semibold text-posidonia"
              >
                Reserva per correu
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`font-medium underline-offset-[6px] decoration-2 hover:underline ${active ? "underline decoration-closca" : ""}`}
    >
      {children}
    </Link>
  )
}

function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <Link href={href} onClick={onClick} className="heading text-3xl py-3 border-b border-posidonia/10">
      {children}
    </Link>
  )
}
