import { BLOG_INDEX_INTRO } from "@/lib/blog-data"
import { buildMetadata } from "@/lib/seo"
import { BlogListPage } from "@/views/BlogListPage"

export const metadata = buildMetadata({
  title: "Healthcare Software Insights",
  description: `${BLOG_INDEX_INTRO} Company and product articles from the IQ-Line team.`,
  path: "/blog",
})

export default function Page() {
  return <BlogListPage />
}
