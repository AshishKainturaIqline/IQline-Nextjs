"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useRef } from "react";
;
import { motion, useInView } from "framer-motion";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarIcon,
  ClockIcon,
  TagIcon
} from "lucide-react";
import { PageHeroShell } from "@/components/page-hero-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getProductById } from "@/lib/products-data";
import { getProductBlogPosts } from "@/lib/product-blog-data";
function Reveal({
  children,
  className,
  delay = 0
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return <motion.div
    ref={ref}
    initial={{ opacity: 0, y: 24 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, ease: "easeOut", delay }}
    className={className}
  >
      {children}
    </motion.div>;
}
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
function ProductBlogListPage() {
  const { productId } = useParams();
  const product = getProductById(productId ?? "");
  const posts = getProductBlogPosts(productId ?? "");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);
  if (!product) {
    return <div className="flex min-h-svh flex-col">
        <SiteHeader />
        <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
          <p className="text-2xl font-bold">Product not found</p>
          <Button asChild>
            <Link href="/">← Back to home</Link>
          </Button>
        </main>
        <SiteFooter />
      </div>;
  }
  const Icon = product.icon;
  return <div className="flex min-h-svh flex-col">
      
      <SiteHeader />

      <main className="flex-1 overflow-x-hidden">
        <PageHeroShell>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
              <Button
    variant="ghost"
    size="sm"
    className="mb-6 gap-1.5 pl-0 text-slate-400 hover:text-white"
    asChild
  >
                <Link href={`/products/${product.id}`}>
                  <ArrowLeftIcon className="size-4" />
                  Back to {product.title}
                </Link>
              </Button>

              <div className="mb-4 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl border border-teal-500/30 bg-teal-500/10 text-teal-300">
                  <Icon className="size-5" />
                </div>
                <Badge className="border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-teal-300 hover:bg-teal-500/15">
                  Product Updates
                </Badge>
              </div>

              <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {product.title} Blog
              </h1>
              <p className="mt-3 max-w-2xl text-lg text-pretty text-slate-400">
                Deep dives, use cases, and product updates for{" "}
                {product.fullTitle}.
              </p>
            </motion.div>
          </div>
        </PageHeroShell>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            {posts.length === 0 ? <div className="py-16 text-center text-muted-foreground">
                <p className="text-lg">No posts yet, check back soon.</p>
              </div> : <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post, i) => <Reveal key={post.slug} delay={i * 0.08}>
                    <Link
    href={`/products/${product.id}/blog/${post.slug}`}
    className="group block h-full"
  >
                      <motion.article
    whileHover={{ y: -6 }}
    transition={{ duration: 0.2 }}
    className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all hover:border-border hover:shadow-xl"
  >
                        <div
    className="h-1.5 w-full"
    style={{
      background: `linear-gradient(to right, ${product.accentColor}50, transparent)`
    }}
  />
                        <div className="flex flex-1 flex-col p-5">
                          <div className="mb-3 flex flex-wrap gap-1.5">
                            {post.tags.map((tag) => <Badge
    key={tag}
    variant="secondary"
    className="text-xs"
  >
                                <TagIcon className="mr-1 size-2.5" />
                                {tag}
                              </Badge>)}
                          </div>

                          <h2 className="font-heading text-base leading-snug font-semibold tracking-tight transition-colors group-hover:text-primary">
                            {post.title}
                          </h2>

                          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                            {post.excerpt}
                          </p>

                          <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
                            <div className="flex flex-col gap-0.5 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <CalendarIcon className="size-3" />
                                {formatDate(post.publishedAt)}
                              </span>
                              <span className="flex items-center gap-1">
                                <ClockIcon className="size-3" />
                                {post.readingTime} min read
                              </span>
                            </div>
                            <div
    className="flex items-center gap-1 text-xs font-semibold transition-all group-hover:gap-2"
    style={{ color: product.accentColor }}
  >
                              Read
                              <ArrowRightIcon className="size-3" />
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    </Link>
                  </Reveal>)}
              </div>}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>;
}
export {
  ProductBlogListPage
};
