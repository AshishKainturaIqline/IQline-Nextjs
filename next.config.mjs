/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["nodemailer"],
  turbopack: {
    root: import.meta.dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    const hidden = [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }]
    return [
      { source: "/hq", headers: hidden },
      { source: "/hq/:path*", headers: hidden },
    ]
  },
  async redirects() {
    return [
      {
        source: "/career",
        destination: "/careers",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/about-us",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/contact-us",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
