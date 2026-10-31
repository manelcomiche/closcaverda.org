import type { Metadata } from "next"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import HomeContent from "@/components/home-content"
import JsonLd from "@/components/json-ld"
import { faq } from "@/data/faq"
import { products } from "@/data/products"
import { site, social } from "@/lib/site"

export const metadata: Metadata = {
  title: { absolute: "Polseres i peluixos solidaris de tortuga | Closcaverda" },
  description: site.description,
  alternates: { canonical: "/" },
  ...social({
    title: "Polseres i peluixos solidaris per les tortugues marines",
    description: site.description,
    path: "/",
  }),
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "@id": `${site.url}/#preguntes`,
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
    {
      "@type": "ItemList",
      name: "Productes de la botiga solidària Closcaverda",
      itemListElement: products.map((product, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${site.url}/botiga/${product.slug}`,
        name: product.title,
      })),
    },
  ],
}

export default function Home() {
  return (
    <>
      <JsonLd data={structuredData} />
      <SiteHeader />
      <HomeContent />
      <SiteFooter />
    </>
  )
}
