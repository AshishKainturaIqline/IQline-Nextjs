"use client"

import Link from "next/link"
;
import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  Building2Icon,
  GraduationCapIcon,
  MicroscopeIcon
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  fadeUp,
  GlowCard,
  replayViewport,
  riseIn,
  Section,
  SectionAura,
  stagger,
  tint
} from "@/components/home-section-primitives";
const settings = [
  {
    Icon: Building2Icon,
    category: "HospitalSaarthi",
    title: "Hospitals and health systems",
    desc: "Connect registration, consultations, admissions, diagnostics, pharmacy and billing with HospitalSaarthi.",
    tags: ["ABDM Compliant", "Smart Parcha\u2122", "Revenue Cycle"],
    href: "/products/hims",
    cta: "Explore HospitalSaarthi",
    color: "oklch(0.5 0.15 235)"
  },
  {
    Icon: MicroscopeIcon,
    category: "LabSaarthi",
    title: "Diagnostic laboratories",
    desc: "Track sample progress, bring analyser results into the system and manage report review with LabSaarthi.",
    tags: ["Bidirectional", "Quality control records", "Patient Portal"],
    href: "/products/lims",
    cta: "Explore LabSaarthi",
    color: "oklch(0.5 0.15 195)"
  },
  {
    Icon: GraduationCapIcon,
    category: "MEDU Campus",
    title: "Medical colleges and teaching hospitals",
    desc: "Keep student records, attendance, assessments and clinical learning records organised with MEDU Campus.",
    tags: ["Competency tracking", "CBME Ready", "Digital Logbooks"],
    href: "/products/meducampus",
    cta: "Explore MEDU Campus",
    color: "oklch(0.5 0.18 280)"
  }
];
function SolutionsBySetting() {
  return <Section
    once={false}
    className="overflow-hidden border-b border-border bg-gradient-to-b from-background via-background to-muted/25 py-20 sm:py-28"
  >
      <SectionAura />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} className="mb-14 text-center">
          <Badge
    variant="secondary"
    className="mb-4 px-3.5 py-1.5 ring-1 ring-primary/20"
  >
            Built for you
          </Badge>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Find the right software{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              for your institution
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            Start with the work your team needs to manage.
          </p>
        </motion.div>

        <motion.div
    variants={stagger}
    initial="hidden"
    whileInView="visible"
    viewport={replayViewport}
    className="grid gap-6 md:grid-cols-3"
  >
          {settings.map((s, i) => {
    const SettingIcon = s.Icon;
    return <motion.div key={s.title} variants={riseIn} className="h-full">
                <GlowCard glowColor={s.color} className="h-full">
                  <Card
      className="relative h-full gap-0 border-0 bg-card/85 ring-1 ring-border/70 backdrop-blur-sm transition-shadow duration-300 group-hover:shadow-2xl"
      style={{ "--accent": s.color }}
    >
                    <span
      aria-hidden
      className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
      style={{
        background: `linear-gradient(90deg, ${s.color}, ${tint(s.color, 10)})`
      }}
    />
                    <span
      aria-hidden
      className="pointer-events-none absolute -top-20 -right-16 size-48 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      style={{ background: tint(s.color, 35) }}
    />

                    <CardHeader className="relative">
                      <div className="mb-5 flex items-start justify-between">
                        <div
      className="flex size-14 items-center justify-center rounded-2xl transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:rotate-3"
      style={{
        background: `linear-gradient(145deg, ${tint(s.color, 26)}, ${tint(s.color, 8)})`,
        color: s.color,
        boxShadow: `inset 0 0 0 1px ${tint(s.color, 22)}`
      }}
    >
                          <SettingIcon
      className="size-6 stroke-[1.75]"
      aria-hidden
    />
                        </div>
                        <span className="font-mono text-xs font-bold tracking-wider text-muted-foreground/50 transition-colors duration-300 group-hover:text-[var(--accent)]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <p className="flex items-center gap-2 text-[11px] font-bold tracking-[0.16em] text-muted-foreground/80 uppercase">
                        <span
      aria-hidden
      className="size-1.5 shrink-0 rounded-full"
      style={{ background: s.color }}
    />
                        {s.category}
                      </p>
                      <h3 className="mt-2 font-heading text-xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-[var(--accent)] sm:text-2xl">
                        {s.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-pretty text-muted-foreground">
                        {s.desc}
                      </p>
                    </CardHeader>

                    <CardContent className="mt-6 flex flex-1 flex-col justify-end gap-5">
                      <div className="flex flex-wrap gap-2">
                        {s.tags.map((t) => <span
      key={t}
      className="rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors duration-300"
      style={{
        borderColor: tint(s.color, 28),
        background: tint(s.color, 8),
        color: s.color
      }}
    >
                            {t}
                          </span>)}
                      </div>

                      <Link
      href={s.href}
      className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-[var(--accent)] transition-opacity hover:opacity-80"
    >
                        {s.cta}
                        <ArrowRightIcon
      className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
      aria-hidden
    />
                      </Link>
                    </CardContent>
                  </Card>
                </GlowCard>
              </motion.div>;
  })}
        </motion.div>
      </div>
    </Section>;
}
export {
  SolutionsBySetting
};
