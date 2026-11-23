# closcaverda.org

Web de **Closcaverda** (https://closcaverda.org), proyecto escolar solidario (Institut Miquel Martí i Pol, Cornellà; creado para «The Challenge» de EduCaixa): vende pulseras y llaveros de peluche de tortuga a 3 € y el 100 % va a la **Fundació CRAM**. No hay venta online: se reserva por correo y se recoge en el instituto. Muestra las tortugas que se siguen por satélite con su ruta. Todo el contenido en **catalán** (`<html lang="ca">`, `locale ca_ES`).

## Stack

- Next.js 16.4 (App Router) · React 19.3 (versiones fijadas sin `^`) · TypeScript 6 · Tailwind CSS 4 en modo compatibilidad (`@config "../tailwind.config.ts"` en `app/globals.css`) + shadcn/ui
- Leaflet (mapa en vivo), recharts, framer-motion, `react-intersection-observer`
- Node **26.x** (`engines`, que fija también el runtime de Vercel; `.nvmrc` = `26`) · pnpm · ESLint 10 flat config (`eslint-config-next` core-web-vitals + typescript). Sin tests ni backend: todo es estático (SSG con `generateStaticParams`).

## Comandos

```bash
pnpm install
pnpm dev                               # http://localhost:3000
pnpm lint
pnpm exec tsc --noEmit
pnpm build                             # ignoreBuildErrors: false → falla con errores de TS
node scripts/generate-tracks.mjs       # regenera public/geojson/*.geojson desde cram.org
node scripts/generate-tracks.mjs --cache <dir>   # igual, leyendo <file>.kml de una carpeta local
```

Verificación antes de dar algo por bueno: `pnpm lint && pnpm build`.

## Arquitectura

- `app/` — `page.tsx` (home), `botiga/` y `botiga/[slug]`, `tortugues/` y `tortugues/[slug]`, más `sitemap.ts`, `robots.ts`, `manifest.ts`, `opengraph-image.tsx`, `not-found.tsx`.
- `data/` — **todo el contenido** es TypeScript: `products.ts` (slug, títulos SEO, precio), `turtles.ts` (ficha de cada tortuga), `turtle-images.ts`, `faq.ts`. Para cambiar textos o añadir productos/tortugas se edita aquí.
- `lib/site.ts` — datos globales (URL, email, redes, punto de recogida, partner CRAM, vídeo) y `social()`, que construye openGraph/twitter **completos** por página (Next reemplaza, no fusiona, esos objetos del layout padre).
- `lib/tracks.ts` — lee `public/geojson/<slug>.geojson` con `fs` **en build** (lo usa `components/sea-chart.tsx`). `lib/images.ts#sized()` pide a wsrv.nl la imagen redimensionada (las fotos de tortugas van por ese proxy).
- `components/` — `turtle-map.tsx` (Leaflet, cliente), `json-ld.tsx` (schema.org), `breadcrumbs.tsx`, `site-header/footer`, `ui/` (shadcn).
- `public/llms.txt` — resumen del sitio para IA; actualízalo si cambian productos, precios, tortugas o rutas.

## Rutas GPS de las tortugas

- `scripts/generate-tracks.mjs` descarga los KML de CRAM/seaturtle.org (lista `TURTLES`: complot, damm, daura, godzilla, maria, sis) y prolonga cada ruta día a día con posiciones **simuladas** hasta `END_DATE = 2027-12-31`. Cada punto lleva `source: "argos"` (real) o `"simulacio"` (estimado). Usa las demás rutas de CRAM como «mapa de agua» para no simular sobre tierra.
- `turtle-map.tsx` hace `fetch('/geojson/<slug>.geojson')` y filtra puntos hasta hoy en el navegador; `sea-chart` filtra en build, así que su ruta solo avanza al redesplegar.
- A partir de 2028 no habrá más puntos simulados: hay que subir `END_DATE` y regenerar.
- Una tortuga nueva necesita entrada en `data/turtles.ts`, en `TURTLES` del script y su `.geojson`.

## Convenciones

- UI, slugs y URLs en catalán (`/botiga`, `/tortugues`). Código, comentarios y commits en inglés.
- Las URLs antiguas se mantienen con redirects permanentes en `next.config.mjs` (`/tortugas` → `/tortugues`, `/blog` → `/`, `/botiga/clauers` → `/botiga`). Si renombras una ruta, añade su redirect.
- SEO cuidado: metadata por página vía `social()`, JSON-LD, sitemap, `llms.txt`. Mantenlo coherente al tocar contenido.
- `images.unoptimized: true`: no hay optimización de imágenes de Next.

## Gotchas

- `styles/globals.css` es un residuo de shadcn que no se importa en ningún sitio; el CSS real es `app/globals.css` (+ `tailwind.config.ts`).
- `CNAME` en la raíz es de la época de GitHub Pages (antes era HTML estático); hoy se despliega en Vercel.
- `pnpm-workspace.yaml`: override `minimatch@10 → ^11.0.1` con justificación (las 3.x no se tocan porque rompen plugins de ESLint) y `minimumReleaseAge: 1440`.

## Despliegue

Vercel, desde `main` (sin variables de entorno), Node 26.x. Dominio closcaverda.org.

## Git

- `main` como rama principal; cambios en ramas (`chore/…`, `redesign-…`) y PR a `main`. El usuario suele pedir: commit, push, abrir PR, merge y borrar la rama.
- Commits: los recientes en inglés con Conventional Commits (`chore(deps): …`, `ci: …`); los antiguos son libres.
- Renovate (semanal, cooldown 7 días, auto-merge de minor/patch) + Dependabot solo para seguridad con auto-merge en `.github/workflows/dependabot-automerge.yml`. El único check de PR es el build de Vercel.
