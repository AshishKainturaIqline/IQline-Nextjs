import { blogPosts } from "@/lib/blog-data"
import { productBlogPosts } from "@/lib/product-blog-data"
import { products } from "@/lib/products-data"
import { BASE_URL } from "@/lib/seo"

const SITE_SUMMARY =
  "IQ-Line Private Limited builds software for hospitals, diagnostic laboratories and medical colleges in India. Products support patient records, laboratory testing, prescriptions, radiology and academic administration."

const staticPages = [
  {
    path: "/",
    title: "Healthcare Software for Hospitals and Labs",
    blurb: "Healthcare Software for Hospitals and Labs",
  },
  {
    path: "/about",
    title: "About IQ-Line",
    blurb: "Company overview and approach",
  },
  {
    path: "/products",
    title: "Products",
    blurb: "Full product suite",
  },
  {
    path: "/contact",
    title: "Contact",
    blurb: "Request a product demonstration",
  },
  {
    path: "/founders",
    title: "Meet the Founders",
    blurb: "Meet the Founders",
  },
  {
    path: "/careers",
    title: "Careers at IQ-Line | Current Openings",
    blurb: "Careers at IQ-Line | Current Openings",
  },
  {
    path: "/blog",
    title: "Blog",
    blurb: "Articles on hospital, laboratory and education workflows",
  },
  {
    path: "/privacy-policy",
    title: "Privacy Policy",
    blurb: "Privacy Policy",
  },
  {
    path: "/terms-and-conditions",
    title: "Terms of Service",
    blurb: "Terms of Service",
  },
]

function link(path, label, blurb) {
  const url = `${BASE_URL}${path}`
  return `- [${label}](${url}): ${blurb}`
}

export function generateLlmsTxt() {
  const lines = [
    "# IQ-Line",
    "",
    `> ${SITE_SUMMARY}`,
    "",
    "IQ-Line is based in Noida, India. Contact: info@iqline.co.in",
    "",
    `This file lists the same public URLs as ${BASE_URL}/sitemap.xml and ${BASE_URL}/robots.txt.`,
    "",
    "## Company",
    "",
    ...staticPages.map(({ path, title, blurb }) => link(path, title, blurb)),
    "",
    "## Products",
    "",
    ...products.map((product) =>
      link(
        `/products/${product.id}`,
        product.title,
        product.seoTitle?.replace(/\s*\|\s*IQ-Line\s*$/, "") ?? product.tagline
      )
    ),
    "",
    "## Product articles",
    "",
    ...products.map((product) =>
      link(
        `/products/${product.id}/blog`,
        `${product.title} articles`,
        `${product.title} articles`
      )
    ),
    "",
    "## Articles",
    "",
    ...blogPosts.map((post) =>
      link(`/blog/${post.slug}`, post.title, post.title)
    ),
    ...productBlogPosts.map((post) =>
      link(
        `/products/${post.productId}/blog/${post.slug}`,
        post.title,
        post.title
      )
    ),
    "",
    "## Optional",
    "",
    `- [Sitemap](${BASE_URL}/sitemap.xml)`,
    `- [Robots](${BASE_URL}/robots.txt)`,
    "",
  ]

  return lines.join("\n")
}
