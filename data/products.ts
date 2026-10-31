export interface Product {
  slug: string
  title: string
  seoTitle: string
  shortDescription: string
  longDescription: string
  features: string[]
  image: string
  imageAlt: string
  price: number
}

export const products: Product[] = [
  {
    slug: "polseres",
    title: "Polseres marines",
    seoTitle: "Polseres de tortuga marina solidàries a 3 €",
    shortDescription: "Polsera de pedres amb una tortuga turquesa al centre. Quatre colors per triar.",
    longDescription:
      "Les nostres polseres marines són molt més que un accessori de moda. Cada peça porta una tortuga turquesa entre pedres de colors i representa el nostre compromís amb la conservació de les tortugues marines. El disseny s'inspira en les ones del mar i els colors de les espècies que protegim.",
    features: [
      "Disseny exclusiu inspirat en el mar",
      "Ajustables a qualsevol canell",
      "Resistents a l'aigua",
      "Disponibles en turquesa, blanc, negre i rosa",
      "El 100% dels beneficis es destinen a la Fundació CRAM",
    ],
    image: "/images/products/PolseresMarines.webp",
    imageAlt: "Cinc polseres marines de pedres turquesa, blanques, negres i roses amb una tortuga al centre, posades en un canell",
    price: 3,
  },
  {
    slug: "peluixos-amb-casc",
    title: "Peluixos amb casc",
    seoTitle: "Clauer peluix de tortuga amb casc a 3 €",
    shortDescription: "Clauer de tortuga de peluix amb un casc groc de moto.",
    longDescription:
      "Els nostres peluixos amb casc són perfectes per als amants de les tortugues marines i les aventures. Cada clauer és una tortuga amb el seu casc protector, que simbolitza la nostra missió de protegir aquestes criatures marines.",
    features: [
      "Material suau i durador",
      "Casc protector extraïble",
      "Perfecte com a clauer o decoració",
      "Disseny exclusiu de Closcaverda",
      "Ideal per regalar i conscienciar",
    ],
    image: "/images/products/PeluixosCasc.webp",
    imageAlt: "Clauer de peluix en forma de tortuga verda amb un casc groc, a la mà davant de l'institut",
    price: 3,
  },
  {
    slug: "peluixos",
    title: "Peluixos",
    seoTitle: "Clauer peluix de tortuga marina a 3 €",
    shortDescription: "Clauer de tortuga de peluix per penjar a les claus o a la motxilla.",
    longDescription:
      "Els nostres peluixos de tortuga són el company perfecte per al dia a dia. Aquests clauers de tortuga marina t'acompanyen a tot arreu mentre contribueixes a una causa important.",
    features: [
      "Disseny compacte i lleuger",
      "Materials ecològics i sostenibles",
      "Colors vius i detalls acurats",
      "Anella resistent per a claus o motxilles",
      "Cada model representa una espècie diferent de tortuga marina",
    ],
    image: "/images/products/Peluixos.webp",
    imageAlt: "Clauer de peluix en forma de tortuga marina verda",
    price: 3,
  },
]

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("ca-ES", { style: "currency", currency: "EUR" }).format(price)
