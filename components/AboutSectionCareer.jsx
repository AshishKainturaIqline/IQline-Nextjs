"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import { ImageIcon, ZoomInIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  fadeUp,
  replayViewport,
  riseIn,
  Section,
  SectionAura,
  staggerTight
} from "@/components/home-section-primitives";
const photos = [
  {
    src: "/images/Christmas.webp",
    label: "Christmas",
    title: "Christmas at IQ-Line",
    caption: "The team came together for our Christmas celebration.",
    ratio: "aspect-video"
  },
  {
    src: "/images/newoffice2.webp",
    label: "New office",
    title: "Our new office",
    caption: "A few moments from the office inauguration.",
    ratio: "aspect-[4/5]"
  },
  {
    src: "/images/Team offsite.webp",
    label: "Offsite 2025",
    title: "Team offsite 2025",
    caption: "Time together to recognise contributions and catch up outside the usual workday.",
    ratio: "aspect-square"
  },
  {
    src: "/images/New Office Inauguration.webp",
    label: "Team celebration",
    title: "Team celebration",
    caption: "A celebration at the office.",
    ratio: "aspect-[4/3]"
  }
];
const highlights = [
  {
    title: "Location and work mode",
    body: "Our office is in Noida. Work mode and any travel requirements are listed against each role."
  }
];
function PhotoCard({
  photo,
  onOpen
}) {
  const [status, setStatus] = useState(
    "loading"
  );
  return <motion.figure variants={riseIn} className="group relative">
      <button
    type="button"
    onClick={status === "ready" ? onOpen : void 0}
    aria-label={status === "ready" ? `View photo: ${photo.title}` : photo.title}
    className={cn(
      "relative block w-full overflow-hidden rounded-2xl border border-border/70 bg-muted/40 text-left shadow-sm transition-all duration-500 outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
      photo.ratio,
      status === "ready" ? "cursor-zoom-in hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl" : "cursor-default"
    )}
  >
        <img
    src={photo.src}
    alt={photo.title}
    loading="lazy"
    decoding="async"
    onLoad={() => setStatus("ready")}
    onError={() => setStatus("missing")}
    className={cn(
      "size-full object-cover transition-transform duration-700 group-hover:scale-105",
      status === "ready" ? "opacity-100" : "opacity-0"
    )}
  />

        {status !== "ready" && <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-muted/60 to-muted p-6 text-center">
            <ImageIcon
    className="size-7 text-muted-foreground/50"
    aria-hidden
  />
            <span className="text-sm font-semibold text-foreground/70">
              {photo.title}
            </span>
            <span className="text-xs text-muted-foreground">
              {photo.caption}
            </span>
          </span>}

        {status === "ready" && <>
            <span
    aria-hidden
    className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/15 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100"
  />
            <span className="absolute inset-x-0 bottom-0 p-4">
              <span className="block font-heading text-sm font-semibold text-white">
                {photo.title}
              </span>
              <span className="mt-1 block max-h-0 overflow-hidden text-xs leading-relaxed text-white/75 opacity-0 transition-all duration-500 group-hover:max-h-20 group-hover:opacity-100">
                {photo.caption}
              </span>
            </span>
            <span
    aria-hidden
    className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100"
  >
              <ZoomInIcon className="size-4" />
            </span>
          </>}

        <Badge
    className={cn(
      "absolute top-3 left-3 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-[0.12em] uppercase",
      status === "ready" ? "border-white/20 bg-slate-950/60 text-white backdrop-blur-md hover:bg-slate-950/70" : "border-primary/25 bg-primary/10 text-primary hover:bg-primary/15"
    )}
  >
          {photo.label}
        </Badge>
      </button>
    </motion.figure>;
}
function AboutSectionCareer() {
  const [active, setActive] = useState(null);
  return <Section
    id="life-at-iqline"
    className="overflow-hidden border-b border-border bg-background py-20 sm:py-28"
  >
      <SectionAura />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        {
    /* Copy */
  }
        <motion.div variants={fadeUp}>
          <Badge
    variant="secondary"
    className="mb-5 px-3.5 py-1.5 ring-1 ring-primary/20"
  >
            <span className="mr-1.5 size-1.5 rounded-full bg-primary" />
            People of healthcare infrastructure
          </Badge>

          <h2 className="font-heading text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Life at{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              IQ-Line
            </span>
          </h2>

          <p className="mt-5 max-w-lg font-heading text-xl leading-snug font-semibold text-pretty sm:text-2xl">
            We&apos;re building technology for healthcare. But we&apos;re
            building it with people first.
          </p>

          <p className="mt-4 max-w-lg text-sm leading-relaxed text-pretty text-muted-foreground">
            A look at the people, moments, and experiences that shape life
            beyond the screens at IQ-Line, from hospital site trials to evening
            table-tennis clashes.
          </p>

          <Separator className="my-8 max-w-lg" />

          <dl className="max-w-lg">
            {highlights.map((h) => <div key={h.title} className="border-l-2 border-primary/40 pl-4">
                <dt className="font-heading text-base font-bold">{h.title}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {h.body}
                </dd>
              </div>)}
          </dl>
        </motion.div>

        {
    /* Photo mosaic */
  }
        <motion.div
    variants={staggerTight}
    initial="hidden"
    whileInView="visible"
    viewport={replayViewport}
    className="grid grid-cols-2 gap-3 sm:gap-4"
  >
          <div className="flex flex-col gap-3 sm:gap-4">
            {photos.filter((_, i) => i % 2 === 0).map((p) => <PhotoCard
    key={p.src}
    photo={p}
    onOpen={() => setActive(p)}
  />)}
          </div>
          <div className="flex flex-col gap-3 sm:gap-4 lg:mt-10">
            {photos.filter((_, i) => i % 2 === 1).map((p) => <PhotoCard
    key={p.src}
    photo={p}
    onOpen={() => setActive(p)}
  />)}
          </div>
        </motion.div>
      </div>

      {
    /* Lightbox */
  }
      <Dialog open={active !== null} onOpenChange={() => setActive(null)}>
        <DialogContent className="overflow-hidden p-0 sm:max-w-3xl">
          {active && <>
              <img
    src={active.src}
    alt={active.title}
    className="max-h-[70vh] w-full bg-muted object-contain"
  />
              <div className="p-5">
                <DialogTitle className="font-heading text-lg">
                  {active.title}
                </DialogTitle>
                <DialogDescription className="mt-1">
                  {active.caption}
                </DialogDescription>
              </div>
            </>}
        </DialogContent>
      </Dialog>
    </Section>;
}
export {
  AboutSectionCareer
};
