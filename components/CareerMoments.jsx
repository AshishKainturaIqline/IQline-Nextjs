"use client"

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import {
  fadeUp,
  replayViewport,
  riseIn,
  Section,
  SectionAura,
  staggerTight
} from "@/components/home-section-primitives";
import { cn } from "@/lib/utils";
const moments = [
  {
    src: "/images/Team%20offsite.webp",
    label: "Offsite 2025",
    title: "Team offsite 2025",
    caption: "Time together to recognise contributions and catch up outside the usual workday."
  },
  {
    src: "/images/Diwal.webp",
    label: "Team photograph",
    title: "IQ-Line team photograph",
    caption: "Colleagues coming together for a team photograph."
  },
  {
    src: "/images/New%20Office%20Inauguration.webp",
    label: "New office",
    title: "Our new office",
    caption: "A few moments from the office inauguration.",
    accent: true
  },
  {
    src: "/images/Christmas.webp",
    label: "Christmas",
    title: "Christmas at IQ-Line",
    caption: "The team came together for our Christmas celebration."
  }
];
function MomentCard({ moment }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);
  return <motion.figure
    variants={riseIn}
    className="group relative flex h-[340px] w-[78vw] shrink-0 snap-start flex-col justify-end overflow-hidden sm:h-[340px] sm:w-[22rem] lg:h-[360px] lg:w-[24rem]"
  >
      <div className="relative flex h-full min-h-[320px] max-h-[360px] w-full flex-col justify-end overflow-hidden rounded-3xl border border-border/70 bg-muted/40 shadow-sm transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-primary/40 group-hover:shadow-xl">
        <img
    ref={imgRef}
    src={moment.src}
    alt={moment.title}
    loading="lazy"
    decoding="async"
    onLoad={() => setLoaded(true)}
    className={cn(
      "absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-105",
      loaded ? "opacity-100" : "opacity-0"
    )}
  />
        {!loaded && <div
    aria-hidden
    className="absolute inset-0 animate-pulse bg-gradient-to-br from-muted/70 to-muted"
  />}
        <span
    aria-hidden
    className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/25"
  />
        <div className="absolute inset-x-0 top-0 z-10 p-3.5">
          <span
    className={cn(
      "rounded-full px-2.5 py-1 text-[10px] font-bold tracking-[0.12em] uppercase backdrop-blur-md",
      moment.accent ? "bg-primary text-primary-foreground" : "bg-slate-950/75 text-white"
    )}
  >
            {moment.label}
          </span>
        </div>
        <figcaption className="absolute inset-x-3.5 bottom-3.5 z-10 rounded-2xl border border-white/60 bg-background/95 p-4 shadow-lg backdrop-blur-sm dark:border-white/10">
          <p className="font-heading text-sm font-semibold">{moment.title}</p>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
            {moment.caption}
          </p>
        </figcaption>
      </div>
    </motion.figure>;
}
function CareerMoments() {
  const railRef = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const syncEdges = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const max = rail.scrollWidth - rail.clientWidth;
    setEdges({
      start: rail.scrollLeft <= 8,
      end: max <= 8 || rail.scrollLeft >= max - 8
    });
  }, []);
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const observer = new ResizeObserver(syncEdges);
    observer.observe(rail);
    return () => observer.disconnect();
  }, [syncEdges]);
  function scrollByCard(direction) {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector("figure");
    const step = card ? card.clientWidth + 24 : rail.clientWidth * 0.8;
    rail.scrollBy({ left: step * direction, behavior: "smooth" });
  }
  return <Section
    id="moments-between-milestones"
    className="overflow-hidden border-b border-border bg-background py-20 sm:py-28"
  >
      <SectionAura />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
    variants={fadeUp}
    className="flex flex-wrap items-end justify-between gap-6"
  >
          <div className="max-w-2xl">
            <p className="mb-4 flex items-center gap-3 text-[11px] font-bold tracking-[0.22em] text-primary uppercase">
              <span aria-hidden className="h-px w-8 bg-primary" />
              Team moments
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              The moments between the milestones.
            </h2>
            <p className="mt-3 text-sm text-pretty text-muted-foreground sm:text-base">
              Because not everything worth remembering makes it to a meeting
              agenda.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
    type="button"
    onClick={() => scrollByCard(-1)}
    disabled={edges.start}
    aria-label="Previous moments"
    className="flex size-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary/50 hover:text-primary disabled:opacity-40 disabled:hover:border-border disabled:hover:text-foreground"
  >
              <ArrowLeftIcon className="size-4" />
            </button>
            <button
    type="button"
    onClick={() => scrollByCard(1)}
    disabled={edges.end}
    aria-label="More moments"
    className="flex size-10 items-center justify-center rounded-full bg-slate-950 text-white transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 dark:bg-primary dark:text-primary-foreground"
  >
              <ArrowRightIcon className="size-4" />
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div
    ref={railRef}
    onScroll={syncEdges}
    variants={staggerTight}
    initial="hidden"
    whileInView="visible"
    viewport={replayViewport}
    className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:px-6 lg:px-[max(2rem,calc((100vw-72rem)/2+2rem))] [&::-webkit-scrollbar]:hidden"
  >
        {moments.map((moment) => <MomentCard key={moment.src} moment={moment} />)}
      </motion.div>
    </Section>;
}
export {
  CareerMoments
};
