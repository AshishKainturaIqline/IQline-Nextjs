"use client"

import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion
} from "framer-motion";
import { cn } from "@/lib/utils";
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};
const riseIn = {
  hidden: { opacity: 0, y: 44, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 110, damping: 18, mass: 0.7 }
  }
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } }
};
const staggerTight = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } }
};
const replayViewport = {
  once: false,
  amount: 0.15,
  margin: "-72px 0px -72px 0px"
};
function tint(color, percent) {
  return `color-mix(in oklch, ${color} ${percent}%, transparent)`;
}
function Section({
  children,
  className,
  id,
  once = true,
  amount
}) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once, amount, margin: "-80px" });
  return <motion.section
    ref={ref}
    id={id}
    initial={reduceMotion ? "visible" : "hidden"}
    animate={reduceMotion || isInView ? "visible" : "hidden"}
    variants={stagger}
    className={cn("relative scroll-mt-16", className)}
  >
      {children}
    </motion.section>;
}
function GlowCard({
  children,
  className,
  glowColor
}) {
  const reduceMotion = useReducedMotion();
  return <motion.div
    whileHover={reduceMotion ? void 0 : { y: -6, scale: 1.012 }}
    transition={{ type: "spring", stiffness: 260, damping: 22 }}
    className={cn("group relative", className)}
  >
      {glowColor && <div
    aria-hidden
    className="pointer-events-none absolute -inset-2 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
    style={{
      background: `radial-gradient(60% 60% at 50% 0%, ${tint(glowColor, 45)}, transparent 72%)`
    }}
  />}
      {children}
    </motion.div>;
}
function SectionAura({
  className,
  color = "var(--primary)"
}) {
  return <div
    aria-hidden
    className={cn("pointer-events-none absolute inset-0", className)}
  >
      <div
    className="absolute -top-24 left-1/2 h-72 w-[46rem] -translate-x-1/2 rounded-full blur-3xl"
    style={{ background: tint(color, 12) }}
  />
      <div
    className="absolute right-0 -bottom-32 h-64 w-[28rem] rounded-full blur-3xl"
    style={{ background: tint(color, 8) }}
  />
    </div>;
}
export {
  GlowCard,
  Section,
  SectionAura,
  fadeUp,
  replayViewport,
  riseIn,
  stagger,
  staggerTight,
  tint
};
