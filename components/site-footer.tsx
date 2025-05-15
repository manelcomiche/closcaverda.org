import Link from "next/link"
import Image from "next/image"
import { Instagram } from "lucide-react"

export default function SiteFooter() {
  return (
    <footer className="bg-[#768350] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <Image src="/logoCrop.svg" alt="Closcaverda Logo" width={30} height={30} className="object-contain" />
              </div>
              <span className="font-bold">closcaverda.org</span>
            </div>
            <p className="text-sm text-green-100 text-center md:text-left">
              Fundació dedicada a la conservació de les tortugues marines i la preservació dels seus hàbitats naturals.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold mb-4">Enllaços</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/#inici" className="hover:text-green-300 transition-colors">
                Inici
              </Link>
              <Link href="/botiga" className="hover:text-green-300 transition-colors">
                Botiga
              </Link>
              <Link href="/tortugues" className="hover:text-green-300 transition-colors">
                Tortugues
              </Link>
              <Link href="/#contacta" className="hover:text-green-300 transition-colors">
                Contacta
              </Link>
            </nav>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold mb-4">Contacte</h3>
            <p className="text-sm text-green-100 mb-2">Email: hola@closcaverda.org</p>
            <div className="flex items-center space-x-4 mt-4">
              <a
                href="https://www.instagram.com/closcaverda"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-300 transition-colors flex items-center gap-2"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
                <span>@closcaverda</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-green-600 pt-8">
          <div className="text-center text-sm text-green-200">
            <p>
              © {new Date().getFullYear()} closcaverda.org - designed by manel comiche (
              <a
                href="https://manelcomiche.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-300 transition-colors underline"
              >
                manelcomiche.com
              </a>
              ). all rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
