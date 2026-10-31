import Image from "next/image"
import Link from "next/link"
import { formatPrice, type Product } from "@/data/products"

export function PriceSticker({ price, className = "" }: { price: number; className?: string }) {
  return (
    <span
      className={`heading inline-flex h-20 w-20 -rotate-8 items-center justify-center rounded-full bg-casc text-2xl text-posidonia shadow-[0_2px_0_rgba(15,58,52,0.35)] ${className}`}
    >
      {formatPrice(price).replace(",00", "")}
    </span>
  )
}

export default function ProductCard({
  product,
  headingLevel = "h3",
  priority = false,
}: {
  product: Product
  headingLevel?: "h2" | "h3"
  priority?: boolean
}) {
  const Heading = headingLevel
  return (
    <article className="group relative">
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-posidonia/10">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
        />
      </div>
      <PriceSticker price={product.price} className="absolute -top-4 -right-2 sm:-right-4" />
      <Heading className="heading mt-5 text-3xl">
        <Link href={`/botiga/${product.slug}`} className="after:absolute after:inset-0 hover:underline underline-offset-4">
          {product.title}
        </Link>
      </Heading>
      <p className="mt-2 text-pedra max-w-[36ch]">{product.shortDescription}</p>
    </article>
  )
}
