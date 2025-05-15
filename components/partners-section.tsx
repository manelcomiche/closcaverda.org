import Image from "next/image"

export default function PartnersSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#768350] mb-2">Entitats col·laboradores amb el projecte</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Treballem conjuntament amb aquestes entitats per a la conservació i protecció de les tortugues marines.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-12">
          <div className="w-40 h-40 bg-white rounded-lg shadow-md flex items-center justify-center p-4">
            <div className="relative w-full h-full">
              <Image src="/logoMMPOL.svg" alt="Logo MMPOL" fill className="object-contain" />
            </div>
          </div>

          <div className="w-40 h-40 bg-white rounded-lg shadow-md flex items-center justify-center p-4">
            <div className="relative w-full h-full">
              <Image src="/logoCRAM.svg" alt="Logo CRAM" fill className="object-contain" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
