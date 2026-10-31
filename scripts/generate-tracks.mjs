// Builds public/geojson/<turtle>.geojson from the CRAM satellite tracks, then extends each one day by day
// until END_DATE with a simulated position once the real transmitter has stopped.
//
//   node scripts/generate-tracks.mjs              fetch the KML files from cram.org
//   node scripts/generate-tracks.mjs --cache dir  read <file>.kml from a local folder instead
//
// Every point carries `source`: "argos" (real fix from the satellite tag) or "simulacio" (estimated).
// The site only shows points dated up to the current day, so the simulated route keeps advancing on its own.

import fs from "node:fs"
import path from "node:path"

const KML_BASE = "https://www.cram.org/wp-content/uploads/"
const END_DATE = "2027-12-31T23:59:59Z"
const OUT_DIR = path.join(process.cwd(), "public", "geojson")

// Our turtles and the CRAM/seaturtle.org tag that recorded each one (see cram.org/seguimiento-tortugas-satelite).
const TURTLES = [
  { slug: "complot", name: "COMPLOT", kml: "complot.kml" },
  { slug: "damm", name: "DAMM", kml: "damm.kml" },
  { slug: "daura", name: "DAURA", kml: "daura.kml" },
  { slug: "godzilla", name: "GODZILLA", kml: "godzilla.kml" },
  { slug: "maria", name: "MARIA", kml: "maria.kml" },
  { slug: "sis", name: "SIS", kml: "tag163910.kml" }, // "Tortuga número 6", released off Tarragona in 2016
]

// Every track on the CRAM page. Their real fixes double as a map of water that turtles actually use,
// which keeps simulated routes off land without needing a coastline dataset.
const ALL_KML = [
  ...TURTLES.map((t) => t.kml),
  "bohemia.kml",
  "norix.kml",
  "adria.kml",
  "paquita.kml",
  "griselda-pepita.kml",
  "maria_jesus.kml",
  "estrella.kml",
  "ArgosData.kml",
  "ArgosData_fsantander_2022.kml",
  "tag164928.kml",
  "tag160303a.kml",
]

const cacheIndex = process.argv.indexOf("--cache")
const cacheDir = cacheIndex > -1 ? process.argv[cacheIndex + 1] : null

async function readKml(file) {
  if (cacheDir) return fs.readFileSync(path.join(cacheDir, file), "utf8")
  // cram.org answers 503 to bursts, so retry with a pause.
  for (let attempt = 1; ; attempt++) {
    const res = await fetch(`${KML_BASE}${file}?nocache=${Date.now()}`, { headers: { "User-Agent": "closcaverda.org" } })
    if (res.ok) return res.text()
    if (attempt === 4) throw new Error(`${file}: HTTP ${res.status}`)
    await new Promise((r) => setTimeout(r, 2000 * attempt))
  }
}

// Timestamped point placemarks only; release markers and line strings without a date are skipped.
function parseKml(xml) {
  const points = []
  for (const placemark of xml.split(/<Placemark[\s>]/).slice(1)) {
    const coords = placemark.match(/<Point>\s*<coordinates>\s*([-\d.]+),([-\d.]+)/)
    const when = placemark.match(/<when>([^<]+)<\/when>/)
    if (coords && when) points.push({ lon: +coords[1], lat: +coords[2], time: new Date(when[1].trim()).getTime() })
  }
  points.sort((a, b) => a.time - b.time)
  return points.filter((p, i) => i === 0 || p.time !== points[i - 1].time)
}

const dist = (a, b) => Math.hypot((a.lon - b.lon) * Math.cos((a.lat * Math.PI) / 180), a.lat - b.lat)

// Argos fixes include the odd wild location (class B/Z). Drop a point when it is far from both neighbours
// while those neighbours are close to each other.
function dropOutliers(points) {
  return points.filter((p, i) => {
    const prev = points[i - 1]
    const next = points[i + 1]
    if (!prev || !next) return true
    return !(dist(p, prev) > 1 && dist(p, next) > 1 && dist(prev, next) < 1)
  })
}

// Small deterministic PRNG so re-running the script gives the same simulated route.
function mulberry32(seed) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const hash = (s) => [...s].reduce((h, c) => (Math.imul(h, 31) + c.charCodeAt(0)) | 0, 7)
const gauss = (rand) => Math.sqrt(-2 * Math.log(rand() || 1e-9)) * Math.cos(2 * Math.PI * rand())

function buildSeaMask(points, cell = 0.25, reach = 0.3) {
  const grid = new Map()
  const key = (lon, lat) => `${Math.floor(lon / cell)},${Math.floor(lat / cell)}`
  for (const p of points) {
    const k = key(p.lon, p.lat)
    if (!grid.has(k)) grid.set(k, [])
    grid.get(k).push(p)
  }
  const span = Math.ceil(reach / cell)
  return (lon, lat) => {
    const cx = Math.floor(lon / cell)
    const cy = Math.floor(lat / cell)
    for (let dx = -span; dx <= span; dx++)
      for (let dy = -span; dy <= span; dy++)
        for (const p of grid.get(`${cx + dx},${cy + dy}`) || []) if (dist(p, { lon, lat }) <= reach) return true
    return false
  }
}

// Correlated random walk: the turtle keeps some of yesterday's heading, wanders around a home range that
// itself drifts slowly, and only moves into water where tagged turtles have been recorded.
function simulate(real, slug, inSea) {
  const rand = mulberry32(hash(slug))
  const recent = real.slice(-30)
  const home = {
    lon: recent.reduce((s, p) => s + p.lon, 0) / recent.length,
    lat: recent.reduce((s, p) => s + p.lat, 0) / recent.length,
  }
  let pos = { ...real[real.length - 1] }
  let v = { lon: 0, lat: 0 }
  const out = []
  const end = new Date(END_DATE).getTime()
  const day = 864e5

  for (let t = pos.time + day; t <= end; t += day) {
    const nextHome = { lon: home.lon + gauss(rand) * 0.03, lat: home.lat + gauss(rand) * 0.02 }
    if (inSea(nextHome.lon, nextHome.lat)) Object.assign(home, nextHome)

    let moved = false
    for (let attempt = 0; attempt < 16 && !moved; attempt++) {
      const nv = {
        lon: 0.7 * v.lon + gauss(rand) * 0.07 + 0.015 * (home.lon - pos.lon),
        lat: 0.7 * v.lat + gauss(rand) * 0.05 + 0.015 * (home.lat - pos.lat),
      }
      const next = { lon: pos.lon + nv.lon, lat: pos.lat + nv.lat }
      if (inSea(next.lon, next.lat)) {
        v = nv
        pos = { ...next, time: t }
        moved = true
      } else {
        v = { lon: -v.lon * 0.5, lat: -v.lat * 0.5 }
      }
    }
    if (!moved) pos = { ...pos, time: t }

    // Vary the time of day like real satellite passes.
    const stamp = t - (t % day) + Math.floor(rand() * day)
    out.push({ lon: +pos.lon.toFixed(5), lat: +pos.lat.toFixed(5), time: stamp })
  }
  return out
}

const feature = (name, p, source) => ({
  type: "Feature",
  geometry: { type: "Point", coordinates: [p.lon, p.lat] },
  properties: { name, timestamp: new Date(p.time).toISOString(), source },
})

const kml = {}
for (const file of ALL_KML) kml[file] = parseKml(await readKml(file))
const inSea = buildSeaMask(Object.values(kml).flat())

for (const turtle of TURTLES) {
  const real = dropOutliers(kml[turtle.kml])
  const simulated = simulate(real, turtle.slug, inSea)
  const geojson = {
    type: "FeatureCollection",
    properties: {
      turtle: turtle.slug,
      source: `${KML_BASE}${turtle.kml}`,
      lastRealFix: new Date(real[real.length - 1].time).toISOString(),
      simulatedUntil: END_DATE,
      generated: new Date().toISOString(),
    },
    features: [
      ...real.map((p) => feature(turtle.name, p, "argos")),
      ...simulated.map((p) => feature(turtle.name, p, "simulacio")),
    ],
  }
  fs.writeFileSync(path.join(OUT_DIR, `${turtle.slug}.geojson`), JSON.stringify(geojson))
  console.log(
    `${turtle.slug.padEnd(9)} ${String(real.length).padStart(4)} real fixes until ${geojson.properties.lastRealFix.slice(0, 10)}, ` +
      `${simulated.length} simulated days until ${END_DATE.slice(0, 10)}`,
  )
}
