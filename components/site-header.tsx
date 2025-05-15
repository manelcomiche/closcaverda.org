"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative w-10 h-10">
            <Image src="/logoCrop.svg" alt="Closcaverda Logo" fill className="object-contain" />
          </div>
          <span className="font-bold text-[#768350]">closcaverda.org</span>
        </Link>

        <nav className="hidden md:flex space-x-6">
          <NavLink href="/#inici">Inici</NavLink>
          <NavLink href="/botiga">Botiga</NavLink>
          <NavLink href="/tortugues">Tortugues</NavLink>
          <NavLink href="/#contacta">Contacta</NavLink>
        </nav>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="sm" aria-label="Menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col space-y-4 mt-8">
              <MobileNavLink href="/#inici" onClick={() => setIsOpen(false)}>
                Inici
              </MobileNavLink>
              <MobileNavLink href="/botiga" onClick={() => setIsOpen(false)}>
                Botiga
              </MobileNavLink>
              <MobileNavLink href="/tortugues" onClick={() => setIsOpen(false)}>
                Tortugues
              </MobileNavLink>
              <MobileNavLink href="/#contacta" onClick={() => setIsOpen(false)}>
                Contacta
              </MobileNavLink>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

function NavLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={`text-slate-700 hover:text-[#768350] font-medium transition-colors ${className}`}>
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
    <Link
      href={href}
      onClick={onClick}
      className="text-lg font-medium text-slate-700 hover:text-[#768350] transition-colors py-2"
    >
      {children}
    </Link>
  )
}
