"use client"

import { useEffect, useRef } from "react"

interface TurtleMapProps {
  turtleName: string
}

interface TrackFeature {
  geometry: { type: string; coordinates: [number, number] }
  properties: { timestamp: string; source: "argos" | "simulacio" }
}

const RECENT_DAYS = 120

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("ca-ES", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso))

export default function TurtleMap({ turtleName }: TurtleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<import("leaflet").Map | null>(null)

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return
    let cancelled = false

    const loadLeaflet = async () => {
      const L = (await import("leaflet")).default

      if (!document.querySelector('link[href*="leaflet.css"]')) {
        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        document.head.appendChild(link)
      }

      if (cancelled || mapInstanceRef.current || !mapRef.current) return
      const map = L.map(mapRef.current, { scrollWheelZoom: false })
      mapInstanceRef.current = map

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap · Dades de seguiment: Fundació CRAM",
      }).addTo(map)

      try {
        const response = await fetch(`/geojson/${turtleName}.geojson`)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const data: { features: TrackFeature[] } = await response.json()

        // Only show positions up to today; the file already holds the estimated route until the end of 2027.
        const now = Date.now()
        const visible = data.features.filter(
          (f) => f.geometry.type === "Point" && new Date(f.properties.timestamp).getTime() <= now,
        )
        const real = visible.filter((f) => f.properties.source === "argos")
        const estimated = visible.filter((f) => f.properties.source === "simulacio")
        const latLng = (f: TrackFeature) => [f.geometry.coordinates[1], f.geometry.coordinates[0]] as [number, number]

        L.polyline(real.map(latLng), { color: "#1f7a72", weight: 3 }).addTo(map)
        real.forEach((f) =>
          L.circleMarker(latLng(f), { radius: 3, color: "#1f7a72", fillOpacity: 1, weight: 1 })
            .bindTooltip(`Senyal del satèl·lit, ${formatDate(f.properties.timestamp)}`)
            .addTo(map),
        )

        // Years of daily estimates would bury the real route, so draw only the recent stretch, joined to the
        // last satellite fix by a faint line.
        const recent = estimated.slice(-RECENT_DAYS)
        if (recent.length) {
          L.polyline([latLng(real[real.length - 1]), latLng(recent[0])], {
            color: "#768350",
            weight: 1.5,
            dashArray: "1 8",
            opacity: 0.6,
          }).addTo(map)
          L.polyline(recent.map(latLng), { color: "#768350", weight: 2.5, dashArray: "3 8", opacity: 0.9 }).addTo(map)
        }

        const last = estimated.at(-1) ?? real.at(-1)
        if (last) {
          const label =
            last.properties.source === "argos"
              ? `Última senyal del satèl·lit: ${formatDate(last.properties.timestamp)}`
              : `Posició estimada: ${formatDate(last.properties.timestamp)}`
          L.marker(latLng(last), {
            icon: L.icon({ iconUrl: "/tortugaBlip.png", iconSize: [38, 38], iconAnchor: [19, 19] }),
            alt: label,
          })
            .bindPopup(label)
            .addTo(map)
        }

        map.fitBounds(L.latLngBounds([...real, ...recent].map(latLng)), { padding: [24, 24] })
      } catch (error) {
        console.error("Error loading GeoJSON:", error)
        L.popup()
          .setLatLng([40.4, 3])
          .setContent(`No s'han pogut carregar les dades de seguiment de ${turtleName}.`)
          .openOn(map)
        map.setView([40.4, 3], 6)
      }
    }

    loadLeaflet()

    return () => {
      cancelled = true
      mapInstanceRef.current?.remove()
      mapInstanceRef.current = null
    }
  }, [turtleName])

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
}
