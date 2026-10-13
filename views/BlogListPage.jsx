"use client"

import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react";
;
import { motion, useInView } from "framer-motion";
import { ArrowRightIcon, CalendarIcon, ClockIcon, TagIcon } from "lucide-react";
import { PageHeroShell } from "@/components/page-hero-shell";
import { Badge } from "@/components/ui/badge";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  BLOG_INDEX_INSIGHTS_FILTER,
  BLOG_INDEX_INTRO,
  getBlogIndexItems
} from "@/lib/blog-data";
import { products } from "@/lib/products-data";
import { cn } from "@/lib/utils";
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
function BlogListPage() {
  const [filter, setFilter] = useState("all");
  const items = useMemo(() => getBlogIndexItems(), []);
  const productFilters = products.filter(
    (product) => items.some((item) => item.filter === product.id)
  );
  const visibleItems = filter === "all" ? items : items.filter((item) => item.filter === filter);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
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
              <Badge className="mb-4 border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-teal-300 hover:bg-teal-500/15">
                Blog
              </Badge>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Insights from IQ-Line
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-pretty text-slate-400">
                {BLOG_INDEX_INTRO}
              </p>
            </motion.div>
          </div>
        </PageHeroShell>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-wrap gap-2">
              {[
    { id: "all", label: "All articles" },
    { id: BLOG_INDEX_INSIGHTS_FILTER, label: "Insights" },
    ...productFilters.map((product) => ({
      id: product.id,
      label: product.title
    }))
  ].map((option) => {
    const isActive = filter === option.id;
    return <button
      key={option.id}
      type="button"
      aria-pressed={isActive}
      onClick={() => setFilter(option.id)}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
        isActive ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
      )}
    >
                    {option.label}
                  </button>;
  })}
            </div>

            {visibleItems.length === 0 ? <p className="py-16 text-center text-muted-foreground">
                No articles in this category yet.
              </p> : <div className="grid gap-8 sm:grid-cols-2">
                {visibleItems.map((post, i) => <Reveal key={post.key} delay={i * 0.06}>
                    <Link href={post.href} className="group block h-full">
                      <motion.article
    whileHover={{ y: -6 }}
    transition={{ duration: 0.2 }}
    className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all hover:border-border hover:shadow-xl"
  >
                        <div
    className={`h-2 w-full bg-gradient-to-r ${post.coverGradient} bg-[#00d4ff]/30`}
  />
                        <div className="flex flex-1 flex-col p-6">
                          <div className="mb-3 flex flex-wrap gap-1.5">
                            {post.productTitle && <Badge className="text-xs">{post.productTitle}</Badge>}
                            {post.tags.map((tag) => <Badge
    key={tag}
    variant="secondary"
    className="text-xs"
  >
                                <TagIcon className="mr-1 size-2.5" />
                                {tag}
                              </Badge>)}
                          </div>

                          <h2 className="font-heading text-xl leading-snug font-semibold tracking-tight transition-colors group-hover:text-primary">
                            {post.title}
                          </h2>

                          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                            {post.excerpt}
                          </p>

                          <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4">
                            <div>
                              <p className="text-sm font-medium">{post.author}</p>
                              <p className="text-xs text-muted-foreground">
                                {post.authorRole}
                              </p>
                            </div>
                            <div className="flex flex-col items-end gap-1 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <CalendarIcon className="size-3" />
                                {formatDate(post.publishedAt)}
                              </span>
                              <span className="flex items-center gap-1">
                                <ClockIcon className="size-3" />
                                {post.readingTime} min read
                              </span>
                            </div>
                          </div>

                          <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-primary transition-all group-hover:gap-2">
                            {post.linkText}
                            <ArrowRightIcon className="size-3.5 shrink-0" />
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
  BlogListPage
};
