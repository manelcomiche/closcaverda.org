import { ImageResponse } from "next/og"

export const alt = "Closcaverda: polseres i peluixos solidaris per les tortugues marines"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// A simplified version of the home hero: routes fanning out from the CRAM over the deep-green sea.
export default function OpengraphImage() {
  const routes = [
    { d: "M150 130 C 260 150, 420 200, 560 180 S 820 230, 1000 200", c: "#F4D23C" },
    { d: "M150 130 C 220 200, 320 260, 500 270 S 860 290, 1100 240", c: "#E9A6C6" },
    { d: "M150 130 C 200 90, 300 60, 380 80 S 470 130, 520 100", c: "#8EC9EC" },
    { d: "M150 130 C 110 180, 120 230, 210 260", c: "#5CC2B8" },
    { d: "M150 130 C 210 110, 280 130, 330 160", c: "#B7C77E" },
  ]

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "#0f3a34",
          color: "#f2f5ec",
          padding: "64px 72px",
          position: "relative",
        }}
      >
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", top: 0, left: 0 }}>
          {routes.map((r) => (
            <path key={r.d} d={r.d} stroke={r.c} strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.85" />
          ))}
          <circle cx="150" cy="130" r="22" fill="none" stroke="#F4D23C" strokeWidth="4" />
          <circle cx="150" cy="130" r="8" fill="#F4D23C" />
        </svg>
        <div style={{ fontSize: 34, color: "#F4D23C", fontWeight: 700 }}>closcaverda.org</div>
        <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1, letterSpacing: -2, marginTop: 12, maxWidth: 980 }}>
          Polseres i peluixos que tornen tortugues al mar
        </div>
        <div style={{ fontSize: 32, marginTop: 20, opacity: 0.85 }}>
          3 € cada producte. El 100% del benefici va a la Fundació CRAM.
        </div>
      </div>
    ),
    size,
  )
}
