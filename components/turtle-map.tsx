// "use client"

// import { useEffect, useRef } from "react"

// interface TurtleMapProps {
//   turtleName: string
// }

// export default function TurtleMap({ turtleName }: TurtleMapProps) {
//   const mapRef = useRef<HTMLDivElement>(null)
//   const mapInstanceRef = useRef<any>(null)

//   useEffect(() => {
//     if (typeof window === "undefined" || !mapRef.current) return

//     // Dynamically import Leaflet
//     const loadLeaflet = async () => {
//       try {
//         const L = (await import("leaflet")).default

//         // Add Leaflet CSS
//         if (!document.querySelector('link[href*="leaflet.css"]')) {
//           const link = document.createElement("link")
//           link.rel = "stylesheet"
//           link.href = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
//           document.head.appendChild(link)
//         }

//         // Initialize map if not already initialized
//         if (!mapInstanceRef.current && mapRef.current) {
//           mapInstanceRef.current = L.map(mapRef.current)

//           L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//             maxZoom: 19,
//             attribution: "© OpenStreetMap - Manel Comiche (manelcomiche.com) - Closcaverda.org",
//           }).addTo(mapInstanceRef.current)

//           // Load GeoJSON data
//           const geojsonUrl = `/geojson/${turtleName}.geojson`

//           try {
//             const response = await fetch(geojsonUrl)
//             if (!response.ok) {
//               throw new Error(`Failed to load GeoJSON: ${response.status}`)
//             }

//             const geojsonData = await response.json()

//             // Filter points by date
//             const today = new Date()
//             today.setHours(23, 59, 59, 999)

//             const validPoints = geojsonData.features.filter((feature: any) => {
//               if (feature.properties.timestamp) {
//                 const featureDate = new Date(feature.properties.timestamp)
//                 return featureDate <= today
//               }
//               return true
//             })

//             // Find the last valid point
//             const lastValidPointIndex = validPoints.reduce((lastIndex: number, feature: any, index: number) => {
//               return feature.geometry.type === "Point" ? index : lastIndex
//             }, -1)

//             // Create turtle icon
//             const turtleIcon = L.icon({
//               iconUrl: "/tortugaBlip.png",
//               iconSize: [38, 38],
//               iconAnchor: [19, 19],
//             })

//             // Add points to map
//             validPoints.forEach((feature: any, index: number) => {
//               if (feature.geometry.type === "Point") {
//                 L.geoJSON(feature, {
//                   pointToLayer: (feature, latlng) => {
//                     if (index === lastValidPointIndex) {
//                       return L.marker(latlng, { icon: turtleIcon })
//                     } else {
//                       return L.marker(latlng)
//                     }
//                   },
//                 }).addTo(mapInstanceRef.current)
//               }
//             })

//             // Create line from points
//             if (lastValidPointIndex !== -1) {
//               const lineCoordinates = validPoints
//                 .slice(0, lastValidPointIndex + 1)
//                 .filter((feature: any) => feature.geometry.type === "Point")
//                 .map((feature: any) => feature.geometry.coordinates)

//               const newLineString = {
//                 type: "Feature",
//                 geometry: {
//                   type: "LineString",
//                   coordinates: lineCoordinates,
//                 },
//                 properties: {},
//               }

//               L.geoJSON(newLineString).addTo(mapInstanceRef.current)
//             }

//             // Center map on last valid point
//             if (lastValidPointIndex !== -1) {
//               const lastValidPoint = validPoints[lastValidPointIndex].geometry.coordinates
//               mapInstanceRef.current.setView([lastValidPoint[1], lastValidPoint[0]], 13)
//             } else {
//               // Default view if no valid points
//               mapInstanceRef.current.setView([40.4168, 3.7038], 6) // Default to Spain
//             }
//           } catch (error) {
//             console.error("Error loading GeoJSON:", error)

//             // Show error message on map
//             const errorDiv = L.DomUtil.create("div", "error-message")
//             errorDiv.innerHTML = `<p>No s'han pogut carregar les dades de seguiment per a ${turtleName}.</p>`
//             errorDiv.style.padding = "20px"
//             errorDiv.style.backgroundColor = "white"
//             errorDiv.style.border = "1px solid #ccc"
//             errorDiv.style.borderRadius = "4px"

//             const errorPopup = L.popup()
//               .setLatLng([40.4168, 3.7038]) // Default to Spain
//               .setContent(errorDiv)
//               .openOn(mapInstanceRef.current)

//             mapInstanceRef.current.setView([40.4168, 3.7038], 6) // Default to Spain
//           }
//         }
//       } catch (error) {
//         console.error("Error loading Leaflet:", error)
//       }
//     }

//     loadLeaflet()

//     // Cleanup
//     return () => {
//       if (mapInstanceRef.current) {
//         mapInstanceRef.current.remove()
//         mapInstanceRef.current = null
//       }
//     }
//   }, [turtleName])

//   return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
// }


"use client"

import { useEffect, useRef } from "react"

interface TurtleMapProps {
  turtleName: string
}

export default function TurtleMap({ turtleName }: TurtleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return

    // Dynamically import Leaflet
    const loadLeaflet = async () => {
      try {
        const L = (await import("leaflet")).default

        // Add Leaflet CSS
        if (!document.querySelector('link[href*="leaflet.css"]')) {
          const link = document.createElement("link")
          link.rel = "stylesheet"
          link.href = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          document.head.appendChild(link)
        }

        // Initialize map if not already initialized
        if (!mapInstanceRef.current && mapRef.current) {
          mapInstanceRef.current = L.map(mapRef.current)

          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: "© OpenStreetMap - Manel Comiche (manelcomiche.com) - Closcaverda.org",
          }).addTo(mapInstanceRef.current)

          // Load GeoJSON data
          const geojsonUrl = `/geojson/${turtleName}.geojson`

          try {
            const response = await fetch(geojsonUrl)
            if (!response.ok) {
              throw new Error(`Failed to load GeoJSON: ${response.status}`)
            }

            const geojsonData = await response.json()

            // Filter points by date
            const today = new Date()
            today.setHours(23, 59, 59, 999)

            const validPoints = geojsonData.features.filter((feature: any) => {
              if (feature.properties.timestamp) {
                const featureDate = new Date(feature.properties.timestamp)
                return featureDate <= today
              }
              return true
            })

            // Find the last valid point
            const lastValidPointIndex = validPoints.reduce((lastIndex: number, feature: any, index: number) => {
              return feature.geometry.type === "Point" ? index : lastIndex
            }, -1)

            // Create turtle icon
            const turtleIcon = L.icon({
              iconUrl: "/tortugaBlip.png",
              iconSize: [38, 38],
              iconAnchor: [19, 19],
            })

            // Create standard marker icon
            const standardMarkerIcon = L.icon({
              iconUrl:
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/marker-icon-d0OiAuFomOfqzyeHNBYz2UwkhvnOTq.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
            })

            // Add points to map
            validPoints.forEach((feature: any, index: number) => {
              if (feature.geometry.type === "Point") {
                L.geoJSON(feature, {
                  pointToLayer: (feature, latlng) => {
                    if (index === lastValidPointIndex) {
                      return L.marker(latlng, { icon: turtleIcon })
                    } else {
                      return L.marker(latlng, { icon: standardMarkerIcon })
                    }
                  },
                }).addTo(mapInstanceRef.current)
              }
            })

            // Create line from points
            if (lastValidPointIndex !== -1) {
              const lineCoordinates = validPoints
                .slice(0, lastValidPointIndex + 1)
                .filter((feature: any) => feature.geometry.type === "Point")
                .map((feature: any) => feature.geometry.coordinates)

              const newLineString = {
                type: "Feature",
                geometry: {
                  type: "LineString",
                  coordinates: lineCoordinates,
                },
                properties: {},
              }

              L.geoJSON(newLineString).addTo(mapInstanceRef.current)
            }

            // Center map on last valid point
            if (lastValidPointIndex !== -1) {
              const lastValidPoint = validPoints[lastValidPointIndex].geometry.coordinates
              mapInstanceRef.current.setView([lastValidPoint[1], lastValidPoint[0]], 13)
            } else {
              // Default view if no valid points
              mapInstanceRef.current.setView([40.4168, 3.7038], 6) // Default to Spain
            }
          } catch (error) {
            console.error("Error loading GeoJSON:", error)

            // Show error message on map
            const errorDiv = L.DomUtil.create("div", "error-message")
            errorDiv.innerHTML = `<p>No s'han pogut carregar les dades de seguiment per a ${turtleName}.</p>`
            errorDiv.style.padding = "20px"
            errorDiv.style.backgroundColor = "white"
            errorDiv.style.border = "1px solid #ccc"
            errorDiv.style.borderRadius = "4px"

            const errorPopup = L.popup()
              .setLatLng([40.4168, 3.7038]) // Default to Spain
              .setContent(errorDiv)
              .openOn(mapInstanceRef.current)

            mapInstanceRef.current.setView([40.4168, 3.7038], 6) // Default to Spain
          }
        }
      } catch (error) {
        console.error("Error loading Leaflet:", error)
      }
    }

    loadLeaflet()

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [turtleName])

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
}
