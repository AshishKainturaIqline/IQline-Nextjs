"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import {
  fadeUp,
  Section,
  SectionAura
} from "@/components/home-section-primitives";
import { cn } from "@/lib/utils";
const TEAM_PANORAMA = {
  src: "/images/team.webp",
  title: "IQ-Line team photograph"
};
function CareerPageSlide() {
  const [loaded, setLoaded] = useState(false);
  return <Section
    id="more-than-the-work"
    className="overflow-hidden border-b border-border bg-background py-20 sm:py-28"
  >
      <SectionAura />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} className="max-w-3xl">
          <p className="mb-5 flex items-center gap-3 text-[11px] font-bold tracking-[0.22em] text-primary uppercase">
            <span aria-hidden className="h-px w-8 bg-primary" />
            More than the work
          </p>

          <h2 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-5xl">
            Some days are about solving complex healthcare problems.
          </h2>
          <p className="mt-3 font-heading text-3xl font-semibold tracking-tight text-balance text-foreground/55 sm:text-5xl">
            Some are about stepping away from the screen and simply being a
            team.
          </p>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-pretty text-muted-foreground sm:text-base">
            From everyday office moments to celebrations, team activities and
            offsites, we believe the people building IQ-Line should have
            moments worth remembering along the way.
          </p>
        </motion.div>

        <motion.figure
    variants={fadeUp}
    className="relative mt-12 overflow-hidden rounded-[1.75rem] border border-border/70 bg-muted/40 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.35)]"
  >
          <div className="relative aspect-[21/9] min-h-[280px] w-full sm:min-h-[340px]">
            <img
    src={TEAM_PANORAMA.src}
    alt={TEAM_PANORAMA.title}
    loading="lazy"
    decoding="async"
    onLoad={() => setLoaded(true)}
    onError={() => setLoaded(false)}
    className={cn(
      "absolute inset-0 size-full object-cover",
      loaded ? "opacity-100" : "opacity-0"
    )}
  />
            {!loaded && <div
    aria-hidden
    className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,oklch(0.94_0.01_220)_0px,oklch(0.94_0.01_220)_10px,oklch(0.9_0.015_210)_10px,oklch(0.9_0.015_210)_20px)] dark:bg-[repeating-linear-gradient(-45deg,oklch(0.28_0.02_230)_0px,oklch(0.28_0.02_230)_10px,oklch(0.24_0.02_230)_10px,oklch(0.24_0.02_230)_20px)]"
  />}
            {loaded && <div
    aria-hidden
    className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-slate-950/20"
  />}
          </div>
        </motion.figure>
      </div>
    </Section>;
}
export {
  CareerPageSlide
};
