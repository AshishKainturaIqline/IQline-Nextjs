import { notFound } from "next/navigation"

import { buildMetadata } from "@/lib/seo"
import { getProductById, products } from "@/lib/products-data"
import { ProductBlogListPage } from "@/views/ProductBlogListPage"

export function generateStaticParams() {
  return products.map((product) => ({ productId: product.id }))
}

export async function generateMetadata({ params }) {
  const { productId } = await params
  const product = getProductById(productId)
  if (!product) {
    return { title: { absolute: "Product not found | IQ-Line" } }
  }
  return buildMetadata({
    title: `${product.title} Articles & Guides`,
    description: `${product.tagline} Read practical articles on ${product.fullTitle.toLowerCase()} workflows, implementation tips and product updates from IQ-Line.`,
    path: `/products/${product.id}/blog`,
    ogImage: `/products/${product.id}.png`,
  })
}

export default async function Page({ params }) {
  const { productId } = await params
  if (!getProductById(productId)) {
    notFound()
  }
  return <ProductBlogListPage />
}
