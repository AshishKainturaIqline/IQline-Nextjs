import { notFound } from "next/navigation"

import { StructuredData } from "@/components/structured-data"
import { blogPosts, getBlogPostBySlug } from "@/lib/blog-data"
import { articleJsonLd, buildMetadata } from "@/lib/seo"
import { BlogPostPage } from "@/views/BlogPostPage"

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) {
    return { title: { absolute: "Article not found | IQ-Line" } }
  }
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    ogType: "article",
    publishedTime: post.publishedAt,
    authors: [post.author],
  })
}

export default async function Page({ params }) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) {
    notFound()
  }
  return (
    <>
      <StructuredData
        data={articleJsonLd({
          headline: post.title,
          description: post.excerpt,
          path: `/blog/${post.slug}`,
          datePublished: post.publishedAt,
          authorName: post.author,
          authorRole: post.authorRole,
        })}
      />
      <BlogPostPage />
    </>
  )
}
