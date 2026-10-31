/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
    remotePatterns: []
  },
  productionBrowserSourceMaps: false,
  // Old and duplicate URLs, so links and search results that point at them keep working.
  async redirects() {
    return [
      { source: "/tortugas", destination: "/tortugues", permanent: true },
      { source: "/tortugas/:slug", destination: "/tortugues/:slug", permanent: true },
      { source: "/blog", destination: "/", permanent: true },
      { source: "/botiga/clauers", destination: "/botiga", permanent: true },
    ]
  },
}

export default nextConfig
