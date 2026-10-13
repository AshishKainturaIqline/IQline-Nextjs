import { notFound } from "next/navigation"

import { StructuredData } from "@/components/structured-data"
import {
  getProductBlogPostBySlug,
  productBlogPosts,
} from "@/lib/product-blog-data"
import { getProductById } from "@/lib/products-data"
import { articleJsonLd, buildMetadata, productOgImagePath } from "@/lib/seo"
import { ProductBlogPostPage } from "@/views/ProductBlogPostPage"

export function generateStaticParams() {
  return productBlogPosts.map((post) => ({
    productId: post.productId,
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }) {
  const { productId, slug } = await params
  const product = getProductById(productId)
  const post = getProductBlogPostBySlug(productId, slug)
  if (!product || !post) {
    return { title: { absolute: "Article not found | IQ-Line" } }
  }
  return buildMetadata({
    title: `${post.title} — ${product.title}`,
    description: post.excerpt,
    path: `/products/${product.id}/blog/${post.slug}`,
    ogType: "article",
    ogImage: productOgImagePath(product.id),
    publishedTime: post.publishedAt,
    authors: [post.author],
  })
}

export default async function Page({ params }) {
  const { productId, slug } = await params
  const product = getProductById(productId)
  const post = getProductBlogPostBySlug(productId, slug)
  if (!product || !post) {
    notFound()
  }
  return (
    <>
      <StructuredData
        data={articleJsonLd({
          headline: post.title,
          description: post.excerpt,
          path: `/products/${product.id}/blog/${post.slug}`,
          datePublished: post.publishedAt,
          authorName: post.author,
          authorRole: post.authorRole,
        })}
      />
      <ProductBlogPostPage />
    </>
  )
}
