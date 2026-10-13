import { notFound } from "next/navigation"

import { StructuredData } from "@/components/structured-data"
import {
  buildMetadata,
  productJsonLd,
  productOgImagePath,
} from "@/lib/seo"
import { getProductById, products } from "@/lib/products-data"
import { ProductPage } from "@/views/ProductPage"

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
    title: product.seoTitle.replace(/\s*\|\s*IQ-Line\s*$/i, "").trim(),
    description: product.description,
    path: `/products/${product.id}`,
    ogImage: productOgImagePath(product.id),
  })
}

export default async function Page({ params }) {
  const { productId } = await params
  const product = getProductById(productId)
  if (!product) {
    notFound()
  }
  return (
    <>
      <StructuredData data={productJsonLd(product)} />
      <ProductPage />
    </>
  )
}
