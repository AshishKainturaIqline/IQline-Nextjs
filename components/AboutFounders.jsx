"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ayushPhoto from "@/assets/team/ayush.jpg";
import amitPhoto from "@/assets/team/amit.png";
import meenalPhoto from "@/assets/team/meenal.png";
import abhishekPhoto from "@/assets/team/abhishek.png";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { assetSrc, cn } from "@/lib/utils";
import {
  fadeUp,
  GlowCard,
  replayViewport,
  riseIn,
  Section,
  SectionAura,
  staggerTight,
  tint
} from "@/components/home-section-primitives";
const founders = [
  {
    name: "Ayush Garg",
    role: "Founder and CEO, IQ-Line",
    initials: "AG",
    image: ayushPhoto,
    linkedin: "https://www.linkedin.com/in/ayush-garg-12a787131",
    bio: [
      "Ayush Garg is the Founder and CEO of IQ-Line. His work spans healthcare technology, product development and business growth. Drawing on his experience within POCT Group, he focuses on developing software for the operational needs of hospitals, laboratories and medical colleges."
    ],
    color: "oklch(0.5 0.15 280)"
  },
  {
    name: "Amit Kumar Jain",
    role: "Co-Founder and CTO, IQ-Line",
    initials: "AJ",
    image: amitPhoto,
    linkedin: "https://www.linkedin.com/in/amitjainsprofile",
    bio: [
      "Amit Kumar Jain is the Co-Founder and CTO of IQ-Line. He leads the company\u2019s technology work, with experience in cloud-based software, data systems and AI. His focus is on building and maintaining products for healthcare and institutional workflows."
    ],
    color: "oklch(0.5 0.15 195)"
  },
  {
    name: "Meenal Gupta",
    role: "Group CFO, POCT Group (IQ-Line, Q-Line Biotech & Group Companies)",
    initials: "MG",
    image: meenalPhoto,
    linkedin: "https://www.linkedin.com/in/meenal-gupta-b9bb3a48",
    bio: [
      "Meenal Gupta leads finance for POCT Group, including IQ-Line and its group companies. Her work supports financial planning and business operations across the group."
    ],
    color: "oklch(0.55 0.15 25)"
  },
  {
    name: "Abhishek Maya Khare",
    role: "Chief Human Resources Officer (CHRO)",
    initials: "AK",
    image: abhishekPhoto,
    linkedin: "https://www.linkedin.com/in/abhihr81",
    bio: [
      "Abhishek Maya Khare leads human resources and people operations. His work includes recruitment and organisational development across the team."
    ],
    color: "oklch(0.5 0.15 155)"
  }
];
const advantagePoints = [
  {
    title: "Understand the workflow",
    body: "We begin with the tasks your team needs to manage, the systems already in use and the points where work gets delayed."
  },
  {
    title: "Practical workflows",
    body: "We look for repeated data entry and unclear handovers between departments, then design workflows that reduce those steps in a busy care setting."
  },
  {
    title: "Prepare the team for rollout",
    body: "Configuration, training and rollout planning are part of getting the software ready for daily use. The implementation scope is agreed with your institution."
  },
  {
    title: "Real On-Ground Adoption",
    body: "Implementation means nothing without usage. Our dedicated field teams ensure that systems are not just deployed, they are adopted, trusted, and woven into the muscle memory of daily clinical operations."
  },
  {
    title: "Plan integrations and ongoing support",
    body: "We discuss the required integrations, deployment setup and support arrangements before implementation begins."
  },
  {
    title: "Make requirements clear from the start",
    body: "Discuss your institution's data access, integration and reporting requirements with our team. We will explain the capabilities available in the proposed solution."
  }
];
function AboutFounders() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    if (isPaused || reduceMotion) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % founders.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, reduceMotion, activeIndex]);
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % founders.length);
  };
  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + founders.length) % founders.length);
  };
  return <Section
    id="about"
    once={false}
    className="overflow-hidden border-b border-border bg-muted/20 py-20 sm:py-28"
  >
      <SectionAura />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {
    /* Header Section */
  }
        <motion.div variants={fadeUp} className="text-center">
          <Badge
    variant="secondary"
    className="mb-4 px-3.5 py-1.5 ring-1 ring-primary/20"
  >
            About Us
          </Badge>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-5xl">
            About{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              IQ-Line
            </span>
          </h2>
          <div className="mx-auto mt-4 max-w-2xl space-y-4 text-pretty text-muted-foreground">
            <p>
              IQ-Line develops software for hospitals, diagnostic laboratories
              and medical colleges in India. Our products support the work
              behind care delivery, from registration and reporting to
              prescriptions, radiology and student administration.
            </p>
            <p>
              We focus on making information easier to record, find and use
              across the teams that need it.
            </p>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-16 mb-8 text-center">
          <p className="text-xs font-bold tracking-[0.22em] text-muted-foreground/70 uppercase">
            What sets us apart
          </p>
          <h3 className="mt-2 font-heading text-2xl font-bold tracking-tight sm:text-4xl">
            The IQ-Line Advantage
          </h3>
        </motion.div>

        <motion.div
    variants={staggerTight}
    initial="hidden"
    whileInView="visible"
    viewport={replayViewport}
    className="grid gap-px overflow-hidden rounded-3xl border border-border/60 bg-border/60 shadow-sm sm:grid-cols-2 lg:grid-cols-3"
  >
          {advantagePoints.map((a, i) => <motion.div
    key={a.title}
    variants={riseIn}
    className="group relative overflow-hidden bg-background p-7 transition-colors duration-300 hover:bg-muted/40"
  >
              <span
    aria-hidden
    className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-primary transition-transform duration-500 ease-out group-hover:scale-y-100"
  />
              <span className="inline-block origin-left bg-gradient-to-br from-primary to-primary/25 bg-clip-text font-heading text-3xl font-bold text-transparent transition-transform duration-300 group-hover:scale-110">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h4 className="mt-3 font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                {a.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {a.body}
              </p>
            </motion.div>)}
        </motion.div>

        <motion.div variants={fadeUp} className="my-16 flex items-center gap-4">
          <Separator className="flex-1" />
          <span className="text-xs font-bold tracking-[0.22em] text-muted-foreground/70 uppercase">
            Leadership
          </span>
          <Separator className="flex-1" />
        </motion.div>

        <motion.div variants={fadeUp} className="mb-10 text-center">
          <h3 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
            The Team Behind The Platform
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Meet the people leading our products, technology and operations.
          </p>
        </motion.div>

        {
    /* --- AUTO-PLAYING COVERFLOW CAROUSEL --- */
  }
        <div
    className="relative py-8"
    role="group"
    aria-roledescription="carousel"
    aria-label="IQ-Line leadership"
    onMouseEnter={() => setIsPaused(true)}
    onMouseLeave={() => setIsPaused(false)}
    onFocusCapture={() => setIsPaused(true)}
    onBlurCapture={() => setIsPaused(false)}
  >
          <div className="relative">
            {
    /* Overlay arrows: only where there is room beside the card */
  }
            <Button
    variant="outline"
    size="icon-lg"
    onClick={handlePrev}
    aria-label="Previous leadership card"
    className="absolute top-1/2 left-0 z-30 hidden -translate-y-1/2 rounded-full bg-background/80 shadow-lg backdrop-blur-sm hover:border-primary/40 hover:text-primary lg:inline-flex"
  >
              <ArrowLeft className="size-5" />
            </Button>

            <Button
    variant="outline"
    size="icon-lg"
    onClick={handleNext}
    aria-label="Next leadership card"
    className="absolute top-1/2 right-0 z-30 hidden -translate-y-1/2 rounded-full bg-background/80 shadow-lg backdrop-blur-sm hover:border-primary/40 hover:text-primary lg:inline-flex"
  >
              <ArrowRight className="size-5" />
            </Button>

            {
    /* Carousel Track Container */
  }
            <div className="relative flex h-[560px] items-center justify-center overflow-hidden sm:h-[520px]">
              {founders.map((f, i) => {
    let offset = (i - activeIndex + founders.length) % founders.length;
    if (offset > founders.length / 2) {
      offset -= founders.length;
    }
    const isActive = offset === 0;
    return <motion.div
      key={f.name}
      initial={false}
      animate={{
        x: `${offset * 75}%`,
        scale: isActive ? 1 : 0.85,
        opacity: isActive ? 1 : Math.abs(offset) === 1 ? 0.35 : 0,
        zIndex: 20 - Math.abs(offset)
      }}
      transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 26 }}
      aria-hidden={!isActive}
      className={cn(
        "absolute w-full max-w-xl px-4",
        !isActive && "pointer-events-none"
      )}
    >
                    <GlowCard glowColor={f.color} className="h-full">
                      <Card
      className="relative h-full gap-0 border-0 bg-card/95  ring-1 ring-border/80 backdrop-blur-md"
      style={{ "--accent": f.color }}
    >
                        <span
      aria-hidden
      className="absolute inset-x-0 top-0 h-1 rounded-t-xl"
      style={{
        background: `linear-gradient(90deg, ${f.color}, ${tint(f.color, 8)})`
      }}
    />
                        <span
      aria-hidden
      className="pointer-events-none absolute -top-24 -right-20 size-56 rounded-full opacity-30 blur-3xl"
      style={{ background: tint(f.color, 28) }}
    />

                        <CardHeader className="relative pt-2">
                          <div className="flex items-start gap-4">
                            <Avatar
      className="size-16 shrink-0 transition-transform duration-300 group-hover:scale-105"
      style={{
        boxShadow: `0 0 0 2px ${tint(f.color, 45)}, 0 6px 16px -8px ${tint(f.color, 60)}`
      }}
    >
                              {f.image ? <AvatarImage
      src={assetSrc(f.image)}
      alt={f.name}
      loading="lazy"
      className="object-cover object-top"
    /> : null}
                              <AvatarFallback
      className="text-base font-bold"
      style={{
        background: `linear-gradient(145deg, ${tint(f.color, 32)}, color-mix(in oklch, ${f.color} 18%, var(--card)))`,
        color: f.color
      }}
    >
                                {f.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h4 className="font-heading text-lg leading-tight font-bold">
                                {f.name}
                              </h4>
                              <p
      className="mt-1 text-xs leading-snug font-medium"
      style={{ color: f.color }}
    >
                                {f.role}
                              </p>
                              <a
      href={f.linkedin}
      target="_blank"
      rel="noreferrer"
      aria-label={`${f.name} on LinkedIn`}
      className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors duration-300  hover:text-white"
      style={{
        borderColor: tint(f.color, 30),
        color: f.color
      }}
    >
                                <svg
      className="size-3.5"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
                                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                                LinkedIn
                              </a>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="mt-2 space-y-3 pb-6">
                          {f.bio.map((para) => <p
      key={para}
      className="text-sm leading-relaxed text-muted-foreground"
    >
                              {para}
                            </p>)}
                        </CardContent>
                      </Card>
                    </GlowCard>
                  </motion.div>;
  })}
            </div>
          </div>

          {
    /* Controls: arrows below the track until the overlay arrows fit */
  }
          <div className="mt-6 flex items-center justify-center gap-4">
            <Button
    variant="outline"
    size="icon-sm"
    onClick={handlePrev}
    aria-label="Previous leadership card"
    className="rounded-full hover:border-primary/40 hover:text-primary lg:hidden"
  >
              <ArrowLeft className="size-4" />
            </Button>

            <div className="flex items-center gap-2">
              {founders.map((f, i) => <button
    key={f.name}
    type="button"
    onClick={() => setActiveIndex(i)}
    aria-label={`Show ${f.name}`}
    aria-current={activeIndex === i ? "true" : undefined}
    className="group inline-flex size-12 shrink-0 items-center justify-center rounded-full outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50"
  >
                <span
    aria-hidden
    className={cn(
      "block h-2.5 rounded-full transition-all duration-300",
      activeIndex === i ? "w-8 bg-primary" : "w-2.5 bg-muted-foreground/30 group-hover:bg-muted-foreground/60"
    )}
  />
              </button>)}
            </div>

            <Button
    variant="outline"
    size="icon-sm"
    onClick={handleNext}
    aria-label="Next leadership card"
    className="rounded-full hover:border-primary/40 hover:text-primary lg:hidden"
  >
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </Section>;
}
export {
  AboutFounders
};
