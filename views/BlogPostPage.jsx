"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect } from "react";
;
import { motion } from "framer-motion";
import { ArrowLeftIcon, CalendarIcon, ClockIcon, TagIcon } from "lucide-react";
import { PageHeroShell } from "@/components/page-hero-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getBlogPostBySlug, blogPosts } from "@/lib/blog-data";
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
function BlogBody({ body }) {
  const lines = body.split("\n");
  const elements = [];
  let listItems = [];
  function flushList() {
    if (listItems.length > 0) {
      elements.push(
        <ul
          key={`ul-${elements.length}`}
          className="mb-5 ml-5 list-disc space-y-1.5 text-muted-foreground"
        >
          {listItems.map((item, i) => <li
          key={i}
          className="text-base leading-relaxed"
          dangerouslySetInnerHTML={{ __html: inlineFormat(item) }}
        />)}
        </ul>
      );
      listItems = [];
    }
  }
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("## ")) {
      flushList();
      elements.push(
        <h2
          key={i}
          className="mt-10 mb-4 font-heading text-2xl font-semibold tracking-tight"
        >
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("**") && line.endsWith("**")) {
      flushList();
      elements.push(
        <p
          key={i}
          className="mb-2 font-semibold text-foreground"
          dangerouslySetInnerHTML={{ __html: inlineFormat(line) }}
        />
      );
    } else if (line.startsWith("> ")) {
      flushList();
      elements.push(
        <blockquote
          key={i}
          className="my-6 border-l-4 border-primary/60 pl-5 text-muted-foreground italic"
          dangerouslySetInnerHTML={{ __html: inlineFormat(line.slice(2)) }}
        />
      );
    } else if (line.startsWith("- ")) {
      listItems.push(line.slice(2));
    } else if (line.startsWith("---")) {
      flushList();
      elements.push(<hr key={i} className="my-8 border-border" />);
    } else if (line.trim() === "") {
      flushList();
    } else {
      flushList();
      elements.push(
        <p
          key={i}
          className="mb-5 text-base leading-relaxed text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: inlineFormat(line) }}
        />
      );
    }
  }
  flushList();
  return <>{elements}</>;
}
function inlineFormat(text) {
  return text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="font-medium text-primary underline-offset-4 hover:underline">$1</a>'
  ).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>").replace(
    /`(.+?)`/g,
    '<code class="rounded bg-muted px-1 py-0.5 text-sm font-mono">$1</code>'
  );
}
function BlogPostPage() {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug ?? "");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  if (!post) {
    return <div className="flex min-h-svh flex-col">
        <SiteHeader />
        <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
          <p className="text-2xl font-bold">Post not found</p>
          <p className="text-muted-foreground">That article doesn't exist.</p>
          <Button asChild>
            <Link href="/blog">← Back to blog</Link>
          </Button>
        </main>
        <SiteFooter />
      </div>;
  }
  const related = blogPosts.filter((p) => p.slug !== post.slug);
  return <div className="flex min-h-svh flex-col">
      
      <SiteHeader />

      <main className="flex-1 overflow-x-hidden">
        <PageHeroShell>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
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
                <Link href="/blog">
                  <ArrowLeftIcon className="size-4" />
                  All articles
                </Link>
              </Button>

              <div className="mb-4 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => <Badge
    key={tag}
    className="border border-white/20 bg-white/10 text-slate-300"
  >
                    <TagIcon className="mr-1 size-2.5" />
                    {tag}
                  </Badge>)}
              </div>

              <h1 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                {post.title}
              </h1>

              <p className="mt-4 text-lg text-pretty text-slate-400">
                {post.excerpt}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-5">
                <div>
                  <p className="text-sm font-medium text-white">
                    {post.author}
                  </p>
                  <p className="text-xs text-slate-400">{post.authorRole}</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-400">
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
            </motion.div>
          </div>
        </PageHeroShell>

        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
    className="prose-sm sm:prose"
  >
              <BlogBody body={post.body} />
            </motion.div>
          </div>
        </section>

        {related.length > 0 && <section className="border-t border-border bg-muted/20 py-12 sm:py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <h2 className="mb-6 font-heading text-xl font-semibold tracking-tight">
                More from the blog
              </h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => <Link
    key={p.slug}
    href={`/blog/${p.slug}`}
    className="group block"
  >
                    <motion.div
    whileHover={{ y: -4 }}
    transition={{ duration: 0.2 }}
    className="overflow-hidden rounded-2xl border border-border/60 bg-card transition-all hover:border-border hover:shadow-lg"
  >
                      <div
    className={`h-1.5 w-full bg-gradient-to-r ${p.coverGradient} bg-primary/30`}
  />
                      <div className="p-5">
                        <p className="line-clamp-2 leading-snug font-semibold transition-colors group-hover:text-primary">
                          {p.title}
                        </p>
                        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                          {p.excerpt}
                        </p>
                        <p className="mt-3 text-xs text-muted-foreground">
                          {formatDate(p.publishedAt)}
                        </p>
                      </div>
                    </motion.div>
                  </Link>)}
              </div>
            </div>
          </section>}
      </main>

      <SiteFooter />
    </div>;
}
export {
  BlogPostPage
};
