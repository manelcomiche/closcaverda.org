// Turtle photos are proxied through wsrv.nl; ask it for a resized image instead of the full original.
// WebP for the page, JPEG for social previews (some crawlers still skip WebP).
export function sized(src: string, width: number, format: "webp" | "jpg" = "webp") {
  if (!src.includes("wsrv.nl")) return src
  const url = src.startsWith("//") ? `https:${src}` : src
  return `${url}&w=${width}&output=${format}&q=80`
}
