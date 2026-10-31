import type { MetadataRoute } from "next"
import { site } from "@/lib/site"

export default function robots(): MetadataRoute.Robots {
  return {
    // Search engines and AI assistants are welcome: the goal is for people to find the shop and the turtles.
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  }
}
