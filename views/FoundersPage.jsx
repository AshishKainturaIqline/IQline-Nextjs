"use client"

import Link from "next/link"
import { useEffect, useRef } from "react";
;
import { motion, useInView } from "framer-motion";
import {
  BrainCircuitIcon,
  CloudIcon,
  GraduationCapIcon,
  HeartPulseIcon,
  LayersIcon,
  ShieldCheckIcon,
  SparklesIcon,
  TrendingUpIcon
} from "lucide-react";
import ayushPhoto from "@/assets/team/ayush.webp";
import amitPhoto from "@/assets/team/amit.webp";
import { Badge } from "@/components/ui/badge";
import { assetSrc } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PageHeroShell } from "@/components/page-hero-shell";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
function Reveal({
  children,
  className,
  delay = 0
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return <motion.div
    ref={ref}
    initial={{ opacity: 0, y: 24 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, ease: "easeOut", delay }}
    className={className}
  >
      {children}
    </motion.div>;
}
function LinkedInIcon({ className }) {
  return <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>;
}
const founders = [
  {
    name: "Ayush Garg",
    image: ayushPhoto,
    role: "Founder and CEO, IQ-Line",
    linkedin: "https://www.linkedin.com/in/ayush-garg-12a787131",
    bio: [
      "Ayush Garg is the Founder and CEO of IQ-Line. His work spans healthcare technology, product development and business growth. Drawing on his experience within POCT Group, he focuses on developing software for the operational needs of hospitals, laboratories and medical colleges."
    ],
    expertise: [
      { icon: HeartPulseIcon, label: "Healthcare technology" },
      { icon: SparklesIcon, label: "Product development" },
      { icon: TrendingUpIcon, label: "Business growth" }
    ],
    education: [
      {
        icon: GraduationCapIcon,
        institution: "University of Sydney",
        detail: "Former student"
      }
    ]
  },
  {
    name: "Amit Kumar Jain",
    image: amitPhoto,
    role: "Co-Founder and CTO, IQ-Line",
    linkedin: "https://www.linkedin.com/in/amitjainsprofile",
    bio: [
      "Amit Kumar Jain is the Co-Founder and CTO of IQ-Line. He leads the company\u2019s technology work, with experience in cloud-based software, data systems and AI. His focus is on building and maintaining products for healthcare and institutional workflows."
    ],
    expertise: [
      { icon: BrainCircuitIcon, label: "AI" },
      { icon: LayersIcon, label: "Cloud-based software" },
      { icon: CloudIcon, label: "Data systems" },
      { icon: ShieldCheckIcon, label: "Healthcare products" }
    ],
    education: [
      {
        icon: GraduationCapIcon,
        institution: "NIT Jaipur"
      },
      {
        icon: GraduationCapIcon,
        institution: "IIM Calcutta"
      }
    ]
  }
];
function ColumnLabel({ children }) {
  return <p className="mb-4 text-[0.65rem] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
      {children}
    </p>;
}
function FoundersPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div className="flex min-h-svh flex-col">
      
      <SiteHeader />

      <main className="flex-1 overflow-x-hidden">
        <PageHeroShell>
          <div className="mx-auto max-w-[84rem] px-4 sm:px-6 lg:px-8">
            <motion.div className="animate-hero-rise">
              <Badge className="mb-4 border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-teal-300 hover:bg-teal-500/15">
                Leadership
              </Badge>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Meet the founders
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-pretty text-slate-400">
                Ayush Garg and Amit Kumar Jain lead IQ-Line’s business and
                technology teams.
              </p>
            </motion.div>
          </div>
        </PageHeroShell>

        <section className="bg-muted/30 py-14 sm:py-20">
          <div className="mx-auto flex max-w-[84rem] flex-col gap-10 px-4 sm:px-6 lg:px-8">
            {founders.map((founder, fi) => <Reveal key={founder.name} delay={fi * 0.1}>
                <article className="group relative overflow-hidden rounded-[2rem] border border-border/70 bg-card p-6 shadow-sm transition-shadow duration-500 hover:shadow-xl sm:p-8">
                  <span
    aria-hidden
    className="pointer-events-none absolute -top-32 -right-24 size-72 rounded-full bg-primary/10 opacity-70 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
  />

                  <div className="relative grid gap-10 md:grid-cols-2 xl:grid-cols-[minmax(0,13rem)_minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1.6fr)] xl:gap-6">
                    <div className="mx-auto w-full max-w-[13rem] md:mx-0">
                      <div className="relative">
                        <span
    aria-hidden
    className="absolute -top-3 -left-3 size-full rounded-[1.75rem] bg-primary/12"
  />
                        <div className="relative overflow-hidden rounded-[1.5rem] shadow-lg ring-1 ring-border/70">
                          <img
    src={assetSrc(founder.image)}
    alt={founder.name}
    loading="lazy"
    className="aspect-[4/5] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
  />
                        </div>
                      </div>
                      <p className="mt-3 -rotate-2 text-right font-script text-2xl text-primary/70">
                        {founder.name}
                      </p>
                    </div>

                    <div>
                      <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                        {founder.name}
                      </h2>
                      <p className="mt-1.5 font-medium text-primary">
                        {founder.role}
                      </p>
                      <span
    aria-hidden
    className="mt-4 block h-0.5 w-14 rounded-full bg-primary/70"
  />

                      <a
    href={founder.linkedin}
    target="_blank"
    rel="noreferrer"
    aria-label={`${founder.name} on LinkedIn`}
    className="mt-5 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors duration-300 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
  >
                        <LinkedInIcon className="size-3.5" />
                        LinkedIn
                      </a>

                      <div className="mt-7">
                        <ColumnLabel>Focus</ColumnLabel>
                        <div className="flex flex-wrap gap-2">
                          {founder.expertise.map(({ icon: Icon, label }) => <span
    key={label}
    className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1.5 text-[0.6875rem] font-medium text-primary ring-1 ring-primary/15"
  >
                              <Icon className="size-3 shrink-0" />
                              {label}
                            </span>)}
                        </div>
                      </div>
                    </div>

                    <div className="xl:border-l xl:border-border/60 xl:pl-8">
                      <ColumnLabel>Education</ColumnLabel>
                      <div className="flex flex-col gap-3.5">
                        {founder.education.map(
    ({
      icon: Icon,
      institution,
      detail
    }) => <div
      key={institution}
      className="flex items-center gap-3"
    >
                              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Icon className="size-4" />
                              </div>
                              <div>
                                <p className="text-sm leading-tight font-semibold">
                                  {institution}
                                </p>
                                {detail ? <p className="text-xs text-muted-foreground">
                                    {detail}
                                  </p> : null}
                              </div>
                            </div>
  )}
                      </div>
                    </div>

                    <div className="xl:border-l xl:border-border/60 xl:pl-8">
                      <ColumnLabel>About</ColumnLabel>
                      <div className="flex flex-col gap-3.5">
                        {founder.bio.map((para) => <p
    key={para}
    className="text-sm leading-relaxed text-pretty text-muted-foreground"
  >
                            {para}
                          </p>)}
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>)}
          </div>
        </section>

        <section className="relative overflow-hidden bg-[oklch(0.09_0.04_240)] py-20 sm:py-28">
          <div className="pointer-events-none absolute top-1/2 left-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[100px]" />
          <Reveal className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
            <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
              Get in touch
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Explore our products or find out about working at IQ-Line.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button
    size="lg"
    className="font-semibold shadow-lg shadow-primary/25"
    asChild
  >
                <Link href="/products">Explore products</Link>
              </Button>
              <Button
    size="lg"
    variant="outline"
    className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
    asChild
  >
                <Link href="/careers">View careers</Link>
              </Button>
            </div>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </div>;
}
export {
  FoundersPage
};
