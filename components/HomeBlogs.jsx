"use client"

import Link from "next/link"
;
import { motion } from "framer-motion";
import { ArrowRightIcon, CalendarIcon, ClockIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  fadeUp,
  GlowCard,
  Section,
  stagger
} from "@/components/home-section-primitives";
import { getLatestBlogPosts } from "@/lib/blog-data";
import { cn } from "@/lib/utils";
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function ArticleCard({ post }) {
  const topic = post.tags[0] ?? "Article";
  return <GlowCard>
      <Link
    href={`/blog/${post.slug}`}
    className="group block h-full focus-visible:outline-none"
  >
        <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-xl group-focus-visible:ring-3 group-focus-visible:ring-ring/50">
          <div className="relative isolate flex min-h-44 flex-col justify-between overflow-hidden bg-[oklch(0.16_0.04_240)] p-5 sm:min-h-48 sm:p-6">
            <div
    aria-hidden
    className={cn(
      "absolute inset-0 bg-gradient-to-br opacity-90",
      post.coverGradient
    )}
  />
            <div
    aria-hidden
    className="absolute inset-0 bg-[radial-gradient(80%_70%_at_100%_0%,oklch(0.72_0.14_195/0.28),transparent_55%)]"
  />
            <Badge className="relative w-fit border-white/15 bg-white/10 text-xs font-semibold text-white backdrop-blur-sm hover:bg-white/15">
              {topic}
            </Badge>
            <p className="relative mt-10 font-heading text-lg leading-snug font-semibold text-balance text-white sm:text-xl">
              {post.title}
            </p>
          </div>

          <div className="flex flex-1 flex-col p-5 sm:p-6">
            <p className="line-clamp-3 text-sm leading-relaxed text-pretty text-muted-foreground">
              {post.excerpt}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{post.author}</span>
              <span className="inline-flex items-center gap-1">
                <CalendarIcon className="size-3" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="inline-flex items-center gap-1">
                <ClockIcon className="size-3" />
                {post.readingTime} min read
              </span>
            </div>

            <div className="mt-auto flex items-center gap-1 pt-5 text-sm font-semibold text-primary transition-all group-hover:gap-2">
              Read article
              <ArrowRightIcon className="size-3.5" />
            </div>
          </div>
        </article>
      </Link>
    </GlowCard>;
}
function HomeBlogs() {
  const posts = getLatestBlogPosts(2);
  return <Section id="insights" className="border-b border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <motion.div variants={fadeUp}>
            <Badge variant="secondary" className="mb-3">
              Blogs
            </Badge>
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              From the IQ-Line team
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Published articles on AI-first workflows, ABDM, and building
              healthcare systems that work at India&apos;s scale.
            </p>
          </motion.div>
          <motion.div variants={fadeUp}>
            <Button variant="outline" asChild>
              <Link href="/blog">
                View all articles
                <ArrowRightIcon className="size-4" />
              </Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
    variants={stagger}
    className="mt-10 grid gap-5 md:grid-cols-2"
  >
          {posts.map((post) => <motion.div key={post.slug} variants={fadeUp} className="h-full">
              <ArticleCard post={post} />
            </motion.div>)}
        </motion.div>
      </div>
    </Section>;
}
export {
  HomeBlogs
};
