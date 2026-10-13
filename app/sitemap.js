import { blogPosts } from "@/lib/blog-data"
import { productBlogPosts } from "@/lib/product-blog-data"
import { products } from "@/lib/products-data"
import { BASE_URL } from "@/lib/seo"

const staticPages = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/products", priority: 0.9, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/founders", priority: 0.6, changeFrequency: "monthly" },
  { path: "/careers", priority: 0.6, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms-and-conditions", priority: 0.3, changeFrequency: "yearly" },
]

function entry(path, { lastModified, changeFrequency, priority }) {
  return {
    url: `${BASE_URL}${path}`,
    lastModified: lastModified ? new Date(lastModified) : new Date("2026-10-05"),
    changeFrequency,
    priority,
  }
}

export default function sitemap() {
  const routes = staticPages.map(({ path, ...rest }) => entry(path, rest))

  for (const product of products) {
    routes.push(
      entry(`/products/${product.id}`, {
        changeFrequency: "monthly",
        priority: 0.9,
      })
    )
    const productPosts = productBlogPosts.filter((p) => p.productId === product.id)
    const latestProductPost = productPosts.reduce(
      (max, p) => (p.publishedAt > max ? p.publishedAt : max),
      productPosts[0]?.publishedAt ?? "2026-10-05"
    )
    routes.push(
      entry(`/products/${product.id}/blog`, {
        lastModified: latestProductPost,
        changeFrequency: "monthly",
        priority: 0.5,
      })
    )
  }

  for (const post of blogPosts) {
    routes.push(
      entry(`/blog/${post.slug}`, {
        lastModified: post.publishedAt,
        changeFrequency: "yearly",
        priority: 0.6,
      })
    )
  }

  for (const post of productBlogPosts) {
    routes.push(
      entry(`/products/${post.productId}/blog/${post.slug}`, {
        lastModified: post.publishedAt,
        changeFrequency: "yearly",
        priority: 0.5,
      })
    )
  }

  return routes
}
