"use client"

import { motion } from "framer-motion";
import {
  ActivityIcon,
  BrainCircuitIcon,
  HeartPulseIcon,
  LayersIcon,
  ShieldCheckIcon,
  ZapIcon
} from "lucide-react";
import { replayViewport } from "@/components/home-section-primitives";
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};
const cardVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 0.8
    }
  }
};
const iconVariants = {
  rest: { scale: 1, y: 0, rotate: 0 },
  hover: {
    scale: 1.12,
    y: -3,
    rotate: [0, -6, 6, 0],
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 12
    }
  }
};
const pillars = [
  {
    icon: ActivityIcon,
    title: "Built around everyday work",
    body: "We design around the tasks doctors, technicians and administrative teams perform every day. The aim is to make digital tools easier to use in a busy care setting."
  },
  {
    icon: HeartPulseIcon,
    title: "Start with the operational problem",
    body: "A missing record, a repeated entry or an unclear handover can slow a team down. We focus on the steps behind these problems when designing a workflow."
  },
  {
    icon: LayersIcon,
    title: "Connect the departments that need to work together",
    body: "Our products support linked workflows across patient records, prescriptions, diagnostics and billing. We define the required integrations with each institution."
  },
  {
    icon: BrainCircuitIcon,
    title: "Use AI where it helps with a specific task",
    body: "Smart Parcha uses AI to help convert handwritten prescriptions into digital records. The output needs to be checked before it is used for clinical work."
  },
  {
    icon: ZapIcon,
    title: "Plan for the conditions on site",
    body: "Connectivity, infrastructure and staff routines vary between facilities. These need to be considered when planning a deployment."
  },
  {
    icon: ShieldCheckIcon,
    title: "Make requirements clear from the start",
    body: "Discuss your institution's data access, integration and reporting requirements with our team. We will explain the capabilities available in the proposed solution."
  }
];
function PillarGrid() {
  return <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={replayViewport}
    variants={containerVariants}
    className="grid gap-px overflow-hidden rounded-3xl border border-border/80 bg-border/80 shadow-sm sm:grid-cols-2 lg:grid-cols-3"
  >
      {pillars.map((p, i) => {
    const Icon = p.icon;
    return <motion.div
      key={p.title}
      variants={cardVariants}
      whileHover="hover"
      initial="rest"
      className="group relative flex flex-col justify-between bg-card p-8 transition-colors duration-300 hover:bg-accent/40 hover:shadow-lg"
    >
            <div>
              {
      /* Header: Animated Icon & Badge */
    }
              <div className="flex items-center justify-between">
                <motion.div
      variants={iconVariants}
      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
    >
                  <Icon className="h-6 w-6 stroke-[1.75]" />
                </motion.div>

                <motion.span
      variants={{
        rest: { scale: 1, opacity: 0.6 },
        hover: { scale: 1.1, opacity: 1 }
      }}
      transition={{ duration: 0.2 }}
      className="font-mono text-xs font-bold tracking-wider text-muted-foreground group-hover:text-primary"
    >
                  {String(i + 1).padStart(2, "0")}
                </motion.span>
              </div>

              {
      /* Text Content */
    }
              <h3 className="mt-6 text-lg font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </div>

            {
      /* Bottom Sliding Accent Bar */
    }
            <motion.div
      variants={{
        rest: { scaleX: 0, opacity: 0 },
        hover: { scaleX: 1, opacity: 1 }
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-primary"
    />
          </motion.div>;
  })}
    </motion.div>;
}
export {
  PillarGrid
};
