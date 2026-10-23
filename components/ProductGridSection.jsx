"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react";
;
import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";
import { ArrowRightIcon, ChevronDownIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getAbdmCertUrl, products } from "@/lib/products-data";
import { cn, productCardImageUrl } from "@/lib/utils";
const cardHover = {
  initial: { y: 0 },
  hover: {
    y: -6,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  }
};
const cardImage = {
  initial: {
    scale: 1,
    opacity: 0.08,
    filter: "grayscale(50%)"
  },
  hover: {
    scale: 1.08,
    opacity: 0.25,
    filter: "grayscale(0%)",
    transition: { duration: 0.7, ease: "easeOut" }
  }
};
const cardGlow = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 0.25,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};
const arrowButton = {
  initial: { scale: 1 },
  hover: {
    scale: 1.1,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  }
};
const arrowIcon = {
  initial: { rotate: 0 },
  hover: {
    rotate: -45,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  }
};
function enterDirection(index) {
  return index % 2 === 0 ? -1 : 1;
}
const gridSpan = [
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2 lg:col-start-2",
  "sm:col-span-2 lg:col-span-2 lg:col-start-4"
];
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const sync = () => setMatches((prev) => prev === mql.matches ? prev : mql.matches);
    sync();
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, [query]);
  return matches;
}
function ProductIntro() {
  return <div className="mx-auto max-w-2xl text-center">
      <Badge variant="secondary">Product suite</Badge>
      <h2 className="mt-5 font-heading text-4xl font-bold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
        Software for your{" "}
        <span className="text-primary">daily workflows</span>
      </h2>
      <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed font-light text-pretty text-muted-foreground sm:text-lg">
        Explore five products for hospital operations, laboratory management,
        medical education, prescriptions and radiology.
      </p>
    </div>;
}
function ProductCard({ product }) {
  const certUrl = getAbdmCertUrl(product);
  return <motion.div
    initial="initial"
    whileHover="hover"
    variants={cardHover}
    className="h-full"
  >
      <Link
    href={`/products/${product.id}`}
    className="group relative flex h-full min-h-52 flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-500 hover:border-primary/25 hover:shadow-2xl hover:shadow-primary/20 dark:hover:bg-card/40 lg:min-h-60"
  >
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <motion.div
    variants={cardImage}
    className="absolute inset-0 bg-cover bg-center mix-blend-multiply dark:mix-blend-plus-lighter"
            style={{
              backgroundImage: `url('${productCardImageUrl(product.id)}')`,
            }}
  />
          <motion.div
    variants={cardGlow}
    className="absolute -top-16 -right-16 size-[280px] rounded-full blur-[90px]"
    style={{ background: product.accentColor }}
  />
          <div className="absolute inset-x-0 top-1/4 bottom-0 bg-gradient-to-t from-card via-card/95 to-transparent transition-opacity duration-500" />
        </div>

        <div className="relative z-10 flex flex-1 flex-col p-6">
          <div className="flex items-start justify-end">
            <Badge
    variant="secondary"
    onClick={certUrl ? (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.open(certUrl, "_blank", "noopener,noreferrer");
    } : void 0}
    title={certUrl ? "View ABDM certificate" : void 0}
    className={cn(
      "shrink-0 rounded-full border-border/50 bg-background/50 text-[10px] font-bold tracking-widest text-foreground/80 uppercase shadow-sm backdrop-blur-md dark:bg-card/50",
      certUrl && "cursor-pointer hover:bg-primary/10 hover:text-primary"
    )}
  >
              {product.badge}
            </Badge>
          </div>

          <h3 className="mt-2 font-heading text-2xl font-bold tracking-tight text-foreground">
            {product.title}
          </h3>
          <p className="mt-1.5 text-sm font-medium text-pretty text-muted-foreground">
            {product.fullTitle}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-pretty text-foreground/80 dark:text-slate-300">
            {product.tagline}
          </p>

          <div className="mt-auto flex items-center justify-end pt-5">
            <motion.div
    variants={arrowButton}
    className="flex size-9 items-center justify-center rounded-full border bg-background/50 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)] backdrop-blur-sm"
    style={{
      color: product.accentColor,
      borderColor: `${product.accentColor}30`
    }}
  >
              <motion.div variants={arrowIcon} className="flex">
                <ArrowRightIcon className="size-4" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>;
}
function ScrollRevealCard({
  product,
  index,
  progress
}) {
  const direction = enterDirection(index);
  const start = 0.2 + index * 0.07;
  const end = start + 0.36;
  const travel = useTransform(progress, [start, end], [direction * 62, 0]);
  const x = useMotionTemplate`${travel}vw`;
  const opacity = useTransform(progress, [start, start + 0.14], [0, 1]);
  const scale = useTransform(progress, [start, end], [0.88, 1]);
  const rotate = useTransform(progress, [start, end], [direction * 7, 0]);
  return <motion.div
    style={{ x, opacity, scale, rotate }}
    className={gridSpan[index]}
  >
      <ProductCard product={product} />
    </motion.div>;
}
function PinnedProductStage() {
  const stageRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"]
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    mass: 0.35,
    restDelta: 5e-4
  });
  const introOpacity = useTransform(progress, [0, 0.1, 0.32], [1, 1, 0]);
  const introScale = useTransform(progress, [0, 0.32], [1, 0.9]);
  const introY = useTransform(progress, [0, 0.32], [0, -70]);
  const introBlur = useTransform(progress, [0.1, 0.32], [0, 12]);
  const introFilter = useMotionTemplate`blur(${introBlur}px)`;
  const hintOpacity = useTransform(progress, [0, 0.07], [1, 0]);
  const glowOpacity = useTransform(progress, [0, 0.32], [1, 0]);
  return <section
    id="products"
    className="scroll-mt-20 border-b border-border bg-background"
  >
      <div ref={stageRef} className="relative h-[280vh]">
        <div className="sticky top-20 flex h-[calc(100svh-5rem)] items-center overflow-hidden">
          <motion.div
    aria-hidden
    style={{ opacity: glowOpacity }}
    className="pointer-events-none absolute top-1/2 left-1/2 size-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]"
  />

          <motion.div
    style={{
      opacity: introOpacity,
      scale: introScale,
      y: introY,
      filter: introFilter
    }}
    className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6"
  >
            <ProductIntro />
            <motion.div
    aria-hidden
    style={{ opacity: hintOpacity }}
    className="mt-12 flex flex-col items-center gap-2 text-muted-foreground/70"
  >
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase">
                Scroll
              </span>
              <ChevronDownIcon className="size-4 animate-bounce" />
            </motion.div>
          </motion.div>

          <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5">
              {products.map((product, index) => <ScrollRevealCard
    key={product.id}
    product={product}
    index={index}
    progress={progress}
  />)}
            </div>
          </div>
        </div>
      </div>
    </section>;
}
function FlowProductStage({ animate }) {
  return <section
    id="products"
    className="scroll-mt-20 border-b border-border bg-background py-20 sm:py-28"
  >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
    initial={{ opacity: 0, y: animate ? 24 : 0 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="mb-14"
  >
          <ProductIntro />
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5">
          {products.map((product, index) => <motion.div
    key={product.id}
    initial={{
      opacity: 0,
      x: animate ? enterDirection(index) * 56 : 0,
      scale: animate ? 0.94 : 1
    }}
    whileInView={{ opacity: 1, x: 0, scale: 1 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      delay: index % 2 * 0.08
    }}
    className={gridSpan[index]}
  >
              <ProductCard product={product} />
            </motion.div>)}
        </div>
      </div>
    </section>;
}
function ProductGridSection() {
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const canPin = useMediaQuery("(min-width: 1024px) and (min-height: 620px)");
  if (prefersReducedMotion || !canPin) {
    return <FlowProductStage animate={!prefersReducedMotion} />;
  }
  return <PinnedProductStage />;
}
var stdin_default = ProductGridSection;
export {
  ProductGridSection,
  stdin_default as default
};
