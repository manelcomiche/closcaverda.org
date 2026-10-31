import { loadTracks } from "@/lib/tracks"

// Bead colours from the bracelets, one per turtle route.
const BEADS = ["#5CC2B8", "#E9A6C6", "#F2F5EC", "#F4D23C", "#B7C77E", "#8EC9EC"]

const WIDTH = 1000

// Fundació CRAM, el Prat de Llobregat: the release point for most of the turtles.
const CRAM: [number, number] = [2.094, 41.283]

// Catmull-Rom spline through the points, written as cubic Béziers, so legs between fixes read as swims.
function curve(pts: readonly (readonly [number, number])[]) {
  const f = (n: number) => n.toFixed(1)
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] ?? p2
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += ` C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`
  }
  return d
}

export default function SeaChart() {
  const tracks = loadTracks()
  if (tracks.length === 0) return null

  const all = [CRAM, ...tracks.flatMap((t) => [...t.real, ...t.estimated])]
  const lons = all.map((p) => p[0])
  const lats = all.map((p) => p[1])
  const pad = 0.6
  const minLon = Math.min(...lons) - pad
  const maxLon = Math.max(...lons) + pad
  const minLat = Math.min(...lats) - pad
  const maxLat = Math.max(...lats) + pad

  // Equirectangular projection corrected for latitude, so distances look right at these latitudes.
  const k = Math.cos((((minLat + maxLat) / 2) * Math.PI) / 180)
  const scale = WIDTH / ((maxLon - minLon) * k)
  const height = Math.round((maxLat - minLat) * scale)
  const project = ([lon, lat]: [number, number]) => [(lon - minLon) * k * scale, (maxLat - lat) * scale] as const

  const origin = project(CRAM)
  const endOf = (t: (typeof tracks)[number]) => (t.estimated.length ? t.estimated : t.real).at(-1)!
  const pct = ([x, y]: readonly [number, number]) => ({ left: `${(x / WIDTH) * 100}%`, top: `${(y / height) * 100}%` })

  const meridians: number[] = []
  for (let lon = Math.ceil(minLon / 2) * 2; lon <= maxLon; lon += 2) meridians.push(lon)
  const parallels: number[] = []
  for (let lat = Math.ceil(minLat); lat <= maxLat; lat += 2) parallels.push(lat)

  return (
    <figure className="sea-chart relative">
      <div className="relative">
        <svg
          viewBox={`0 0 ${WIDTH} ${height}`}
          className="block w-full h-auto"
          role="img"
          aria-labelledby="sea-chart-caption"
        >
          <g stroke="rgba(242,245,236,0.09)" strokeWidth="1">
            {meridians.map((lon) => {
              const [x] = project([lon, minLat])
              return <line key={`m${lon}`} x1={x} x2={x} y1={0} y2={height} />
            })}
            {parallels.map((lat) => {
              const [, y] = project([minLon, lat])
              return <line key={`p${lat}`} x1={0} x2={WIDTH} y1={y} y2={y} />
            })}
          </g>

          {tracks.map((track, i) => {
            const colour = BEADS[i % BEADS.length]
            const [ex, ey] = project(endOf(track))
            return (
              <g key={track.slug} style={{ ["--i" as string]: i }}>
                <path
                  d={curve(track.real.map(project))}
                  pathLength={1}
                  fill="none"
                  stroke={colour}
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="sea-chart-route"
                />
                {track.estimated.length > 1 && (
                  <path
                    d={curve(track.estimated.map(project))}
                    fill="none"
                    stroke={colour}
                    strokeWidth="1.75"
                    strokeDasharray="2 7"
                    strokeLinecap="round"
                    className="sea-chart-estimate"
                  />
                )}
                <circle cx={ex} cy={ey} r="6" fill={colour} className="sea-chart-end" />
              </g>
            )
          })}

          <circle cx={origin[0]} cy={origin[1]} r="14" fill="none" stroke="#F4D23C" strokeWidth="2" />
          <circle cx={origin[0]} cy={origin[1]} r="5" fill="#F4D23C" />
        </svg>

        <span
          className="absolute -translate-x-3 -translate-y-[calc(100%+1.25rem)] text-sm font-semibold text-casc whitespace-nowrap"
          style={pct(origin)}
        >
          CRAM, el Prat
        </span>

        {tracks.map((track, i) => {
          const end = project(endOf(track))
          return (
            <a
              key={track.slug}
              href={`/tortugues/${track.slug}`}
              className="sea-chart-label absolute -translate-y-1/2 ml-2.5 rounded bg-posidonia/80 px-1 text-sm sm:text-base font-semibold whitespace-nowrap hover:underline underline-offset-4"
              style={{ ...pct(end), color: BEADS[i % BEADS.length], ["--i" as string]: i }}
            >
              {track.name}
            </a>
          )
        })}
      </div>
      <figcaption id="sea-chart-caption" className="mt-4 flex flex-wrap items-start gap-x-8 gap-y-3 text-sm text-escuma/70">
        <span className="max-w-prose">
          Recorregut de les {tracks.length} tortugues que seguim, segons els transmissors per satèl·lit del CRAM. Toca
          un nom per veure la seva història.
        </span>
        <span className="flex flex-wrap gap-x-5 gap-y-1">
          <span className="inline-flex items-center gap-2">
            <svg width="28" height="6" aria-hidden="true">
              <line x1="2" x2="26" y1="3" y2="3" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
            </svg>
            Senyal del satèl·lit
          </span>
          <span className="inline-flex items-center gap-2">
            <svg width="28" height="6" aria-hidden="true">
              <line x1="2" x2="26" y1="3" y2="3" stroke="currentColor" strokeWidth="1.75" strokeDasharray="2 7" strokeLinecap="round" />
            </svg>
            Posició estimada des que el transmissor es va aturar
          </span>
        </span>
      </figcaption>
    </figure>
  )
}
