"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { lazy, Suspense, useEffect, useRef, useState } from "react";
;
import { animate, motion, useInView, useMotionValue } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { HeroBackground } from "@/components/hero-background";
import { ProductGridSection } from "@/components/ProductGridSection";
import { SolutionsBySetting } from "@/components/SolutionsBySetting";
import { WhyIqLine } from "@/components/WhyIqLine";
import { AboutFounders } from "@/components/AboutFounders";
import { HomeBlogs } from "@/components/HomeBlogs";
import { ContactSection } from "@/components/ContactSection";
import { fadeUp } from "@/components/home-section-primitives";
import {
  HOME_SECTION_QUERY,
  homeSectionTo,
  isHomeSectionId
} from "@/lib/home-sections";
import { products } from "@/lib/products-data";
import { cn } from "@/lib/utils";
const MainVideo = lazy(
  () => import("@/components/MainVideo").then((m) => ({ default: m.MainVideo }))
);
const stats = [
  { label: "AIIMS & apex institutions", value: "4+", raw: 4 },
  { label: "Health Facilities Served", value: "350+", raw: 350 },
  { label: "Patient registrations", value: "100M+", raw: 100 }
];
const trustSegments = [
  "AIIMS & apex partners",
  "Medical universities",
  "District hospital networks",
  "Diagnostic chains",
  "Public health programs"
];
function AnimatedStat({
  value,
  raw,
  label,
  accent
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const suffix = value.replace(/[\d.]/g, "");
  const motionVal = useMotionValue(0);
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!isInView) return;
    const ctrl = animate(motionVal, raw, {
      duration: 2.2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v).toString())
    });
    return ctrl.stop;
  }, [isInView, raw, motionVal]);
  return <motion.div
    ref={ref}
    variants={fadeUp}
    className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.07] p-6 text-center"
  >
      <p
    className="font-heading text-4xl font-bold tabular-nums text-white sm:text-5xl"
    style={accent ? { color: accent } : void 0}
  >
        {display}
        {suffix}
      </p>
      <p className="mt-2 text-sm text-slate-400">
        {label}
      </p>
    </motion.div>;
}
function BookDemoDialog({
  open,
  onOpenChange,
  onConfirm
}) {
  const [selected, setSelected] = useState("");
  function handleContinue() {
    onOpenChange(false);
    onConfirm(selected);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  return <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Book a Demo</DialogTitle>
          <DialogDescription>
            Which product would you like to see in action?
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-2">
          {products.map((product) => {
    const Icon = product.icon;
    const isSelected = selected === product.id;
    return <button
      key={product.id}
      type="button"
      onClick={() => setSelected(product.id)}
      className={cn(
        "flex items-center gap-3 rounded-xl border p-3.5 text-left transition-all",
        isSelected ? "border-primary bg-primary/10" : "border-border hover:border-border/80 hover:bg-muted/50"
      )}
    >
                <div
      className="flex size-9 shrink-0 items-center justify-center rounded-lg"
      style={{
        background: `${product.accentColor}18`,
        color: product.accentColor
      }}
    >
                  <Icon className="size-4" />
                </div>
                <div>
                  <p className="text-sm leading-tight font-semibold">
                    {product.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {product.fullTitle}
                  </p>
                </div>
              </button>;
  })}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button disabled={!selected} onClick={handleContinue}>
            Continue <ArrowRightIcon className="size-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>;
}
function TrustedAcrossIndia() {
  const labels = [...trustSegments, ...trustSegments];
  return <div className="overflow-hidden border-y border-border border-t-primary/20 bg-gradient-to-b from-primary/[0.05] via-muted/25 to-muted/35 dark:from-primary/10 dark:via-muted/20">
      <div className="bg-background/60 px-4 py-8 backdrop-blur-sm sm:px-6">
        <p className="text-center text-sm font-semibold text-pretty text-foreground sm:text-base">
          Built for hospitals, laboratories and medical colleges
        </p>
        <div className="group relative mt-4">
          <div className="scrollbar-hide w-full overflow-x-auto">
            <div className="animate-trusted-slider flex w-max gap-2 sm:gap-2.5">
              {labels.map((label, index) => <span
    key={`${label}-${index}`}
    className="mx-0.5 rounded-full border border-primary/30 bg-background/80 px-3 py-1.5 text-center text-xs font-semibold whitespace-nowrap text-primary shadow transition-all duration-200 select-none hover:scale-105 hover:bg-primary/90 hover:text-background"
  >
                  {label}
                </span>)}
            </div>
          </div>
        </div>
      </div>
    </div>;
}
function HomeSectionScroll() {
  const searchParams = useSearchParams();
  useEffect(() => {
    const sectionParam = searchParams.get(HOME_SECTION_QUERY);
    if (!sectionParam || !isHomeSectionId(sectionParam)) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }
    const sectionId = sectionParam;
    let cancelled = false;
    let attempts = 0;
    let timeoutId = 0;
    function tryScroll() {
      if (cancelled) return;
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      attempts += 1;
      if (attempts < 40) timeoutId = window.setTimeout(tryScroll, 100);
    }
    timeoutId = window.setTimeout(tryScroll, 50);
    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [searchParams]);
  return null;
}
function HomeContactSection({ demoProduct }) {
  const searchParams = useSearchParams();
  return <ContactSection prefillProduct={demoProduct || searchParams.get("product") || ""} />;
}
const heroStep = (index) => ({ animationDelay: `${index * 90}ms` });
function HomePage() {
  const [demoProduct, setDemoProduct] = useState("");
  const [demoOpen, setDemoOpen] = useState(false);
  return <>
      <Suspense fallback={null}>
        <HomeSectionScroll />
      </Suspense>
      <BookDemoDialog
    open={demoOpen}
    onOpenChange={setDemoOpen}
    onConfirm={setDemoProduct}
  />
      <main className="overflow-x-clip">
        <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[oklch(0.09_0.04_240)]" />
          <HeroBackground />

          <div className="relative z-20 mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <div className="animate-hero-in" style={heroStep(0)}>
                <Badge className="mb-6 border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-teal-300 hover:bg-teal-500/15">
                  Healthcare technology built in India
                </Badge>
              </div>

              <h1
    className="animate-hero-rise font-heading text-4xl leading-[1.12] font-bold tracking-tight text-balance text-white sm:text-5xl md:text-6xl lg:text-7xl"
    style={heroStep(1)}
  >
                Healthcare software for the way your team works.
              </h1>

              <p
    className="animate-hero-in mx-auto mt-6 max-w-3xl text-sm text-pretty text-slate-400 sm:text-base"
    style={heroStep(2)}
  >
                IQ-Line builds software for hospitals, diagnostic laboratories
                and medical colleges. Our products help teams manage patient
                records, laboratory testing, prescriptions, radiology and
                academic administration, with less repeated data entry and
                clearer access to information.
              </p>

              <div
    className="animate-hero-in mt-10 flex flex-wrap items-center justify-center gap-4"
    style={heroStep(3)}
  >
                <Button
    size="lg"
    className="bg-teal-500 font-semibold text-slate-900 shadow-lg shadow-teal-500/25 hover:bg-teal-400"
    onClick={() => setDemoOpen(true)}
  >
                  Book a demo <ArrowRightIcon className="size-4" />
                </Button>
                <Button
    size="lg"
    variant="outline"
    className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
    asChild
  >
                  <Link href={homeSectionTo("products")}>Explore products</Link>
                </Button>
              </div>
            </div>

            <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: {},
      visible: {
        transition: { staggerChildren: 0.1, delayChildren: 0.8 }
      }
    }}
    className="mt-20 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4"
  >
              {stats.map((stat) => <AnimatedStat
    key={stat.label}
    value={stat.value}
    raw={stat.raw}
    label={stat.label}
    accent="oklch(0.72 0.14 195)"
  />)}
            </motion.div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-32 bg-gradient-to-t from-background to-transparent dark:block" />
        </section>

        <TrustedAcrossIndia />

        <Suspense
    fallback={<section className="scroll-mt-16 border-b border-border bg-background pt-20 sm:pt-28">
              <div className="aspect-video w-full animate-pulse bg-muted/50 " />
            </section>}
  >
          <MainVideo />
        </Suspense>

        <ProductGridSection />
        <SolutionsBySetting />
        <WhyIqLine />
        <AboutFounders />
        <HomeBlogs />
        <Suspense fallback={<ContactSection prefillProduct={demoProduct} />}>
          <HomeContactSection demoProduct={demoProduct} />
        </Suspense>
      </main>
    </>;
}
export {
  HomePage
};
