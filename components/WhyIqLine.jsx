"use client"

import { motion } from "framer-motion";
import { SparklesIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PillarGrid } from "@/components/PillarGrid";
import {
  fadeUp,
  Section,
  SectionAura
} from "@/components/home-section-primitives";
function WhyIqLine() {
  return <Section
    id="why"
    once={false}
    className="overflow-hidden border-b border-border bg-gradient-to-b from-muted/25 via-background to-background py-24 sm:py-32"
  >
      <SectionAura />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} className="mb-14 text-center">
          <Badge
    variant="secondary"
    className="mb-4 gap-1.5 px-4 py-1.5 text-sm ring-1 ring-primary/20"
  >
            <SparklesIcon className="size-3.5" aria-hidden />
            Why IQ-Line
          </Badge>
          <h2 className="font-heading text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Our approach to building{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              healthcare systems
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground md:text-lg">
            Six principles behind every product decision we make.
          </p>
          <motion.span
    aria-hidden
    variants={{
      hidden: { scaleX: 0, opacity: 0 },
      visible: {
        scaleX: 1,
        opacity: 1,
        transition: { duration: 0.7, ease: "easeOut" }
      }
    }}
    className="mx-auto mt-8 block h-px w-40 origin-center bg-gradient-to-r from-transparent via-primary/50 to-transparent"
  />
        </motion.div>

        <motion.div variants={fadeUp}>
          <PillarGrid />
        </motion.div>
      </div>
    </Section>;
}
export {
  WhyIqLine
};
