import fs from "node:fs"
import path from "node:path"
import { turtles } from "@/data/turtles"

type Point = [number, number] // [lon, lat]

export interface Track {
  slug: string
  name: string
  real: Point[] // satellite fixes recorded by the tag
  estimated: Point[] // simulated route since the tag stopped, up to today; starts at the last real fix
  lastRealFix: Date
}

interface Feature {
  geometry: { type: string; coordinates: Point }
  properties: { timestamp: string; source: "argos" | "simulacio" }
}

interface TrackFile {
  properties: { lastRealFix: string }
  features: Feature[]
}

function readTrackFile(slug: string): TrackFile | null {
  const file = path.join(process.cwd(), "public", "geojson", `${slug}.geojson`)
  if (!fs.existsSync(file)) return null
  return JSON.parse(fs.readFileSync(file, "utf8"))
}

export function lastRealFix(slug: string): Date | null {
  const data = readTrackFile(slug)
  return data ? new Date(data.properties.lastRealFix) : null
}

// Moving average over a window of +/- `radius` points.
function smooth(points: Point[], radius: number): Point[] {
  return points.map((_, i) => {
    const slice = points.slice(Math.max(0, i - radius), i + radius + 1)
    return [
      slice.reduce((s, p) => s + p[0], 0) / slice.length,
      slice.reduce((s, p) => s + p[1], 0) / slice.length,
    ]
  })
}

// Thin a dense daily series to roughly `samples` points, smoothing first so it reads as a journey.
// The exact first and last positions are kept so the real route and its estimate join up.
function thin(points: Point[], samples: number): Point[] {
  if (points.length <= samples) return points
  const smoothed = smooth(points, Math.max(2, Math.round(points.length / samples)))
  const step = Math.floor(smoothed.length / samples)
  const inner = smoothed.filter((_, i) => i % step === 0).slice(1, -1)
  return [points[0], ...inner, points[points.length - 1]]
}

// Read at build time. Only positions dated up to today are used, the same rule as the live map.
export function loadTracks(): Track[] {
  const now = Date.now()

  return turtles.flatMap((turtle) => {
    const data = readTrackFile(turtle.slug)
    if (!data) return []

    const points = data.features.filter(
      (f) => f.geometry.type === "Point" && new Date(f.properties.timestamp).getTime() <= now,
    )
    const real = points.filter((f) => f.properties.source === "argos").map((f) => f.geometry.coordinates)
    const simulated = points.filter((f) => f.properties.source === "simulacio").map((f) => f.geometry.coordinates)
    if (real.length < 2) return []

    const lastReal = real[real.length - 1]
    return [
      {
        slug: turtle.slug,
        name: turtle.name,
        real: thin(real, 80),
        estimated: simulated.length ? [lastReal, ...thin(simulated, 30)] : [],
        lastRealFix: new Date(data.properties.lastRealFix),
      },
    ]
  })
}
