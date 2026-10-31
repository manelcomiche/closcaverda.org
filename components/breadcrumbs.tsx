import Link from "next/link"
import { site } from "@/lib/site"

export interface Crumb {
  name: string
  path: string
}

export function breadcrumbSchema(items: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path === "/" ? "" : item.path}`,
    })),
  }
}

export default function Breadcrumbs({ items, className = "text-pedra" }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Ruta de navegació" className={`text-sm ${className}`}>
      <ol className="flex flex-wrap gap-x-2">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={item.path} className="flex gap-x-2">
              {last ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <>
                  <Link href={item.path} className="underline-offset-4 hover:underline">
                    {item.name}
                  </Link>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
