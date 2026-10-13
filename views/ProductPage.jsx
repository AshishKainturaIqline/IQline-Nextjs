"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useRef, useState } from "react";
;
import { motion, useInView } from "framer-motion";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BarChart2Icon,
  BrainCircuitIcon,
  CheckCircle2Icon,
  ClipboardListIcon,
  CpuIcon,
  DatabaseIcon,
  FileTextIcon,
  LayersIcon,
  ScanLineIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UserCheckIcon,
  XCircleIcon,
  ZapIcon
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { contactPageTo } from "@/lib/home-sections";
import { getAbdmCertUrl, getProductById, products } from "@/lib/products-data";
import { cn } from "@/lib/utils";
import { VideoGlobalModal } from "@/modal/VideoGlobalModal";
function mixAccent(accent, percent) {
  return `color-mix(in oklch, ${accent} ${percent}%, transparent)`;
}
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } }
};
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
function ProductPage() {
  const { productId } = useParams();
  const product = getProductById(productId ?? "");
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);
  if (!product) {
    return <div className="flex min-h-svh flex-col">
        <SiteHeader />
        <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
          <p className="text-2xl font-bold">Product not found</p>
          <p className="text-muted-foreground">That product doesn't exist.</p>
          <Button asChild>
            <Link href="/">← Back to home</Link>
          </Button>
        </main>
        <SiteFooter />
      </div>;
  }
  const Icon = product.icon;
  const related = products.filter((p) => p.id !== product.id).slice(0, 3);
  return <div className="flex min-h-svh flex-col">
      
      <SiteHeader />

      <main className="flex-1 overflow-x-hidden">
        {
    /* ── HERO ──────────────────────────────────────────── */
  }
        <section className="relative overflow-hidden border-b border-border bg-[oklch(0.97_0.02_240)] dark:border-transparent dark:bg-[oklch(0.09_0.04_240)]">
          {
    /* Animated glow blob */
  }
          <div
    className="animate-blob-a pointer-events-none absolute top-[10%] left-[5%] size-[700px] rounded-full opacity-[0.12] blur-[150px] dark:opacity-[0.18]"
    style={{ background: product.accentColor }}
  />
          <div
    className="pointer-events-none absolute right-0 bottom-0 size-[400px] rounded-full opacity-[0.06] blur-[120px] dark:opacity-[0.08]"
    style={{ background: product.accentColor }}
  />
          {
    /* Grid overlay - light: subtle dark lines; dark: light lines */
  }
          <div
    className="pointer-events-none absolute inset-0 opacity-[0.45] dark:hidden"
    style={{
      backgroundImage: "linear-gradient(oklch(0 0 0 / 5%) 1px, transparent 1px), linear-gradient(90deg, oklch(0 0 0 / 5%) 1px, transparent 1px)",
      backgroundSize: "56px 56px"
    }}
  />
          <div
    className="pointer-events-none absolute inset-0 hidden opacity-30 dark:block"
    style={{
      backgroundImage: "linear-gradient(oklch(1 0 0 / 4%) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 4%) 1px, transparent 1px)",
      backgroundSize: "56px 56px"
    }}
  />
          <div className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(ellipse_70%_60%_at_50%_100%,transparent,oklch(0.09_0.04_240)_80%)] dark:block" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_100%,transparent,oklch(0.97_0.02_240)_75%)] dark:hidden" />

          <div className="relative mx-auto max-w-6xl px-4 pt-12 pb-20 sm:px-6 sm:pt-16 sm:pb-28 lg:px-8">
            <motion.div
    initial="hidden"
    animate="visible"
    variants={stagger}
    className="max-w-3xl"
  >
              {
    /* Back link */
  }
              <motion.div variants={fadeUp} className="mb-8">
                <Button
    variant="ghost"
    size="sm"
    className="gap-1.5 pl-0 text-muted-foreground hover:text-foreground dark:text-slate-400 dark:hover:text-white"
    asChild
  >
                  <Link href="/">
                    <ArrowLeftIcon className="size-4" />
                    Back to home
                  </Link>
                </Button>
              </motion.div>

              {
    /* Icon + badge */
  }
              <motion.div
    variants={fadeUp}
    className="mb-6 flex flex-wrap items-center gap-3"
  >
                <div
    className="flex size-14 items-center justify-center rounded-2xl"
    style={{
      background: mixAccent(product.accentColor, 18),
      color: product.accentColor
    }}
  >
                  <Icon className="size-7" />
                </div>
                <Badge
    variant="outline"
    asChild={Boolean(getAbdmCertUrl(product))}
    className="h-auto min-h-0 overflow-visible border px-3 py-1.5 text-sm font-semibold [&>svg]:size-3.5"
    style={{
      borderColor: mixAccent(product.accentColor, 45),
      background: mixAccent(product.accentColor, 14),
      color: product.accentColor
    }}
  >
                  {getAbdmCertUrl(product) ? <a
    href={getAbdmCertUrl(product) ?? "#"}
    target="_blank"
    rel="noreferrer"
    title="View ABDM certificate"
  >
                      <SparklesIcon className="size-3.5 shrink-0" />
                      {product.badge}
                    </a> : <>
                      <SparklesIcon className="size-3.5 shrink-0" />
                      {product.badge}
                    </>}
                </Badge>
              </motion.div>

              <motion.h1
    variants={fadeUp}
    className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl dark:text-white"
  >
                {product.title}
              </motion.h1>
              <motion.p
    variants={fadeUp}
    className="mt-1.5 text-lg font-medium sm:text-xl"
    style={{ color: product.accentColor }}
  >
                {product.fullTitle}
              </motion.p>
              <motion.p
    variants={fadeUp}
    className="mt-5 max-w-2xl text-lg text-pretty text-muted-foreground dark:text-slate-400"
  >
                {product.tagline}
              </motion.p>

              <motion.div
    variants={fadeUp}
    className="mt-8 flex flex-wrap gap-3"
  >
                <Button
    size="lg"
    className="font-semibold shadow-lg shadow-primary/20"
    asChild
  >
                  <Link href={contactPageTo(product.id)}>
                    Book a Demo <ArrowRightIcon className="size-4" />
                  </Link>
                </Button>
                <Button
    size="lg"
    className="font-semibold shadow-lg shadow-primary/20"
    asChild
  >
                  <Link target="_blank" href={product.brochureLink}>View brochure<ArrowRightIcon className="size-4" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
    variants={fadeUp}
    className="mt-8 flex flex-wrap gap-3"
  >
                {
    /* 2. Updated Watch Product Video Button */
  }
                <Button
    size="lg"
    variant="outline"
    className="font-semibold shadow-lg shadow-primary/20"
    onClick={() => setIsVideoOpen(true)}
  >
                  Watch Product Video <ArrowRightIcon className="size-4" />
                </Button>

              </motion.div>
            </motion.div>

            {
    /* Impact stats */
  }
            {product.impact && <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.7, duration: 0.6 }}
    className="mt-16 grid gap-4 sm:grid-cols-3"
  >
                {product.impact.map((s) => <div
    key={s.label}
    className="rounded-2xl border border-border bg-card/90 p-5 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none"
  >
                    <p
    className="font-heading text-3xl font-bold"
    style={{ color: product.accentColor }}
  >
                      {s.value}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground dark:text-slate-400">
                      {s.label}
                    </p>
                  </div>)}
              </motion.div>}
          </div>
        </section>

        {
    /* ── OVERVIEW ─────────────────────────────────────── */
  }
        <section className="border-b border-border py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <Reveal className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-start lg:gap-16">
              <div>
                <Badge variant="secondary" className="mb-4">
                  Overview
                </Badge>
                <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                  What is {product.title}?
                </h2>
                <p className="mt-1.5 text-sm font-medium text-muted-foreground">
                  {product.fullTitle}
                </p>
              </div>
              <p className="mt-2 leading-relaxed text-pretty text-muted-foreground md:text-lg">
                {product.description}
              </p>
            </Reveal>
          </div>
        </section>

        {
    /* ── FEATURES ─────────────────────────────────────── */
  }
        <section className="border-b border-border bg-muted/20 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <Reveal className="mb-12 text-center">
              <Badge variant="secondary" className="mb-3">
                Key Capabilities
              </Badge>
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                What {product.title} does for you
              </h2>
            </Reveal>

            {(() => {
    const featureIcons = [
      ScanLineIcon,
      FileTextIcon,
      BrainCircuitIcon,
      ZapIcon,
      ShieldCheckIcon,
      DatabaseIcon,
      BarChart2Icon,
      CpuIcon,
      ClipboardListIcon,
      UserCheckIcon,
      LayersIcon,
      CheckCircle2Icon
    ];
    return <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={stagger}
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
                  {product.features.map((f, i) => {
      const FeatureIcon = featureIcons[i % featureIcons.length];
      return <motion.div key={i} variants={fadeUp}>
                        <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
      >
                          <Card className="h-full border-border/60 bg-card/80 transition-all hover:border-border hover:shadow-lg">
                            <CardHeader className="pb-3">
                              <div
        className="mb-3 flex size-9 items-center justify-center rounded-lg"
        style={{
          background: mixAccent(
            product.accentColor,
            14
          ),
          color: product.accentColor
        }}
      >
                                <FeatureIcon className="size-4" />
                              </div>
                              <CardTitle className="text-base leading-snug">
                                {f.title}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm leading-relaxed text-muted-foreground">
                                {f.body}
                              </p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </motion.div>;
    })}
                </motion.div>;
  })()}
          </div>
        </section>

        {
    /* ── CHALLENGES ───────────────────────────────────── */
  }
        {product.challenges && product.challenges.length > 0 && <section className="relative overflow-hidden border-b border-border bg-[oklch(0.09_0.04_240)] py-16 sm:py-24">
            <div
    className="pointer-events-none absolute top-1/2 right-0 size-[600px] translate-x-1/3 -translate-y-1/2 rounded-full opacity-10 blur-[120px]"
    style={{ background: product.accentColor }}
  />
            <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <Reveal className="mb-12">
                <Badge
    variant="outline"
    className="mb-4 h-auto min-h-0 overflow-visible border px-3 py-1.5"
    style={{
      borderColor: mixAccent(product.accentColor, 45),
      background: mixAccent(product.accentColor, 14),
      color: product.accentColor
    }}
  >
                  {product.challengesTitle ? "Where it helps" : "Problems we solve"}
                </Badge>
                <h2 className="font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {product.challengesTitle ?? <>
                      The challenges{" "}
                      <span style={{ color: product.accentColor }}>
                        {product.title} eliminates
                      </span>
                    </>}
                </h2>
              </Reveal>

              <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-60px" }}
    variants={stagger}
    className="grid gap-4 sm:grid-cols-2"
  >
                {product.challenges.map((c, i) => <motion.div key={i} variants={fadeUp}>
                    <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                      <div
    className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg"
    style={{
      background: mixAccent(product.accentColor, 18),
      color: product.accentColor
    }}
  >
                        <XCircleIcon className="size-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{c.title}</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                          {c.body}
                        </p>
                      </div>
                    </div>
                  </motion.div>)}
              </motion.div>
            </div>
          </section>}

        {
    /* ── VISION QUOTE ─────────────────────────────────── */
  }
        {product.vision && <Reveal className="border-b border-border py-14 sm:py-16">
            <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
              <p
    className="font-heading text-xl font-medium italic sm:text-2xl"
    style={{ color: product.accentColor }}
  >
                &ldquo;{product.vision}&rdquo;
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                The IQ-Line Vision
              </p>
            </div>
          </Reveal>}

        {
    /* ── PRODUCT BLOG ─────────────────────────────────── */
  }
        <Reveal className="border-b border-border py-12 sm:py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <Badge variant="secondary" className="mb-2">
                  Product Updates
                </Badge>
                <h2 className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">
                  {product.title} Blog
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Deep dives, use cases, and implementation guides for{" "}
                  {product.fullTitle}.
                </p>
              </div>
              <Button variant="outline" asChild className="shrink-0">
                <Link href={`/products/${product.id}/blog`}>
                  View articles <ArrowRightIcon className="ml-1.5 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>

        {
    /* ── RELATED PRODUCTS ─────────────────────────────── */
  }
        <section className="border-b border-border bg-muted/20 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <Reveal className="mb-10">
              <Badge variant="secondary" className="mb-3">
                Our suite
              </Badge>
              <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                Explore related products
              </h2>
            </Reveal>

            <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-40px" }}
    variants={stagger}
    className="grid gap-4 sm:grid-cols-3"
  >
              {related.map((p) => {
    const RelIcon = p.icon;
    return <motion.div key={p.id} variants={fadeUp}>
                    <Link href={`/products/${p.id}`}>
                      <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-border hover:shadow-xl"
    >
                        <div
      className="pointer-events-none absolute -top-10 -right-10 size-[200px] rounded-full opacity-0 blur-[60px] transition-opacity duration-300 group-hover:opacity-15"
      style={{ background: p.accentColor }}
    />
                        <div className="relative">
                          <div className="mb-3 flex items-start justify-between">
                            <div
      className="flex size-10 items-center justify-center rounded-xl"
      style={{
        background: mixAccent(p.accentColor, 12),
        color: p.accentColor
      }}
    >
                              <RelIcon className="size-5" />
                            </div>
                            {(() => {
      const certUrl = getAbdmCertUrl(p);
      return <Badge
        variant="outline"
        onClick={certUrl ? (e) => {
          e.preventDefault();
          e.stopPropagation();
          window.open(
            certUrl,
            "_blank",
            "noopener,noreferrer"
          );
        } : void 0}
        title={certUrl ? "View ABDM certificate" : void 0}
        className={cn(
          "text-xs",
          certUrl && "cursor-pointer hover:bg-primary/10 hover:text-primary"
        )}
      >
                                  {p.badge}
                                </Badge>;
    })()}
                          </div>
                          <p className="font-semibold">{p.title}</p>
                          <p className="mt-0.5 text-sm font-medium text-pretty text-muted-foreground">
                            {p.fullTitle}
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-pretty text-muted-foreground">
                            {p.tagline}
                          </p>
                          <div
      className="mt-4 flex items-center gap-1 text-sm font-semibold transition-all group-hover:gap-2"
      style={{ color: p.accentColor }}
    >
                            Learn more
                            <ArrowRightIcon className="size-3.5" />
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>;
  })}
            </motion.div>
          </div>
        </section>

        {
    /* ── BOTTOM CTA ───────────────────────────────────── */
  }
        <section className="relative overflow-hidden bg-[oklch(0.09_0.04_240)] py-20 sm:py-28">
          <div
    className="pointer-events-none absolute top-1/2 left-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15 blur-[100px]"
    style={{ background: product.accentColor }}
  />
          <div
    className="pointer-events-none absolute inset-0 opacity-25"
    style={{
      backgroundImage: "linear-gradient(oklch(1 0 0 / 4%) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 4%) 1px, transparent 1px)",
      backgroundSize: "56px 56px"
    }}
  />
          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
            <Reveal>
              <Badge
    variant="outline"
    className="mb-6 h-auto min-h-0 overflow-visible border px-3 py-1.5"
    style={{
      borderColor: mixAccent(product.accentColor, 45),
      background: mixAccent(product.accentColor, 14),
      color: product.accentColor
    }}
  >
                Ready to get started?
              </Badge>
              <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
                See {product.title} in action
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-slate-400">
                {product.ctaDescription ?? "Talk to our implementation team and get a personalized walkthrough tailored to your institution's needs."}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button
    size="lg"
    className="font-semibold shadow-lg shadow-primary/20"
    asChild
  >
                  <Link href={contactPageTo(product.id)}>
                    Request a demo <ArrowRightIcon className="size-4" />
                  </Link>
                </Button>
                <Button
    size="lg"
    variant="outline"
    className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
    asChild
  >
                  <Link href="/products">View all products</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
        <VideoGlobalModal
    isOpen={isVideoOpen}
    onClose={() => setIsVideoOpen(false)}
    videoUrl={product.videoUrl ?? "https://www.youtube.com/embed/dQw4w9WgXcQ"}
    title={`${product.title} Overview`}
  />
      </main>
      <SiteFooter />
    </div>;
}
export {
  ProductPage
};
