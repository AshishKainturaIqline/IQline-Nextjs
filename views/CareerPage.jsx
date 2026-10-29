"use client"

import Link from "next/link"
import { useEffect, useState } from "react";
;
import { motion } from "framer-motion";
import { ArrowRightIcon, BriefcaseIcon, MapPinIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { AboutSectionCareer } from "@/components/AboutSectionCareer";
import { CareerContact } from "@/components/CareerContact";
import { CareerMoments } from "@/components/CareerMoments";
import { PageHeroShell } from "@/components/page-hero-shell";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { careerOpenings } from "@/lib/career-openings";
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } }
};
const hasLiveOpenings = careerOpenings.length > 0;
const careerPortalUrl =
  "https://career.hrone.cloud/career-portal?appId=s9v8ieloV_N6BR2Oa1aS1l1XZ9zHrGj1e5W1Fz02H6oi9EA8x0FApFrA5HxzbIqcLPJg33y4SZ7W_dWrehekqa_G2sphbJ_tX3Hrs0pvmvUD130hq1SIBXXP62miG7AC&dc=poctgroup&rqt=m8jH4bpBQbccEU8MZpSP5Q&cc=eaqzS8e-weZZc3W_dw_T1Q";
function jobFacts(job) {
  return [job.location, job.workMode, job.experience, job.employmentType, job.travel].filter(Boolean);
}
function DetailSection({ title, items }) {
  if (!items?.length) return null;
  return <section>
    <h4 className="font-heading text-base font-semibold tracking-tight">
      {title}
    </h4>
    <ul className="mt-3 space-y-2.5">
      {items.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
        <span>{item}</span>
      </li>)}
    </ul>
  </section>;
}
function OpeningCard({ job }) {
  const [open, setOpen] = useState(false);
  const preview = job.summary?.[0] || "";
  function applyForRole() {
    setOpen(false);
    window.dispatchEvent(new CustomEvent("iqline-career-apply", {
      detail: { title: job.title }
    }));
    window.setTimeout(() => {
      document.getElementById("career-contact")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 180);
  }
  return <>
    <Card className="flex h-full flex-col overflow-hidden border-border/80 shadow-sm transition-shadow duration-300 hover:shadow-lg">
      <div className="h-1 bg-gradient-to-r from-primary/80 via-primary to-primary/40" />
      <CardHeader className="space-y-3">
        <Badge variant="secondary" className="w-fit">
          {job.team}
        </Badge>
        <h3 className="font-heading text-xl font-semibold tracking-tight">
          {job.title}
        </h3>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
          {job.location ? <span className="inline-flex items-center gap-1.5">
            <MapPinIcon className="size-3.5 text-primary" />
            {job.location}
          </span> : null}
          {job.experience ? <span className="inline-flex items-center gap-1.5">
            <BriefcaseIcon className="size-3.5 text-primary" />
            {job.experience}
          </span> : null}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="line-clamp-4 text-sm leading-relaxed text-muted-foreground">
          {preview}
        </p>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setOpen(true)}
        >
          Full details
          <ArrowRightIcon className="size-4" />
        </Button>
      </CardFooter>
    </Card>

    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex max-h-[min(92vh,52rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-3xl">
        <DialogHeader className="space-y-3 border-b border-border/70 px-6 pt-6 pr-14 pb-5">
          <Badge variant="secondary" className="w-fit">
            {job.team}
          </Badge>
          <DialogTitle className="text-2xl font-bold tracking-tight">
            {job.title}
          </DialogTitle>
          <DialogDescription className="text-sm">
            {jobFacts(job).join(" · ")}
          </DialogDescription>
        </DialogHeader>

        <div className="min-h-0 flex-1 space-y-7 overflow-y-auto px-6 py-6">
          {job.summary?.map((paragraph) => <p
            key={paragraph}
            className="text-sm leading-relaxed text-muted-foreground"
          >
            {paragraph}
          </p>)}
          <DetailSection title="Key responsibilities" items={job.responsibilities} />
          <DetailSection title="Required skills" items={job.skills} />
          <DetailSection title="Preferred qualifications" items={job.preferred} />
          <DetailSection title="Preferred competencies" items={job.competencies} />
          <DetailSection title="Ideal candidate" items={job.ideal} />
          <DetailSection title="What we offer" items={job.offer} />
          <DetailSection title="Portfolio or assessment" items={job.portfolio} />
        </div>

        <DialogFooter className="flex-col gap-3 border-t border-border/70 bg-muted/30 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            {/* Apply with your resume using the form on this page. */}
          
          </p>
          {/* <Button size="lg" className="w-full sm:w-auto" onClick={applyForRole}>
          Apply for this role
          <ArrowRightIcon className="size-4" />
        </Button> */}
          <Button size="lg" className="w-full sm:w-auto" asChild>
            <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
              <span>Apply for this role</span>
              <ArrowRightIcon className="size-4" />
            </a>
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>;
}
function CareerPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div className="flex min-h-svh flex-col">

    <SiteHeader />

    <main className="flex-1 overflow-x-hidden">
      <PageHeroShell>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div className="animate-hero-rise">
            {hasLiveOpenings ? <Badge className="mb-4 border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-teal-300 hover:bg-teal-500/15">
              We&apos;re hiring
            </Badge> : null}
            <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Build your future while building the future of care,{" "}
              <span className="bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent">
                for Bharat
              </span>
            </h1>
            <div className="mt-4 max-w-2xl space-y-4 text-lg text-pretty text-slate-400">
              <p>
                At IQ-Line, we build software for hospitals, laboratories and
                medical colleges. Our work spans product development,
                implementation and the day-to-day support of the people using
                our systems.
              </p>
              <p>
                If you enjoy understanding a problem, working through the
                details and seeing your work used in practice, explore our
                current openings.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {hasLiveOpenings ? <Button
                size="lg"
                className="bg-teal-500 font-semibold text-slate-900 shadow-lg shadow-teal-500/25 hover:bg-teal-400"
                asChild
              >
                <a href={careerPortalUrl} target="_blank" rel="noopener noreferrer">
                  View open roles <ArrowRightIcon className="size-4" />
                </a>
              </Button> : null}
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link href="/about-us">About IQ-Line</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </PageHeroShell>


      <AboutSectionCareer />
      {
        /* <CareerPageSlide /> */
      }
      <section
        id="openings"
        className="scroll-mt-20 border-b border-border bg-muted/20 py-20 sm:py-28"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="max-w-2xl"
          >
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Current openings
            </h2>
            <p className="mt-3 text-pretty text-muted-foreground">
              Find a role that matches your experience and the kind of work
              you want to do.
            </p>
          </motion.div>

          {hasLiveOpenings ? <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {careerOpenings.map((job) => <motion.div
              key={`${job.title}-${job.team}`}
              variants={fadeUp}
              className="h-full"
            >
              <OpeningCard job={job} />
            </motion.div>)}
          </motion.div> : <p className="mt-8 max-w-2xl text-pretty text-muted-foreground">
            There are no open roles listed at the moment. Please check this
            page for future opportunities.
          </p>}
        </div>
      </section>

      <CareerMoments />
      <CareerContact />
    </main>

    <SiteFooter />
  </div>;
}
export {
  CareerPage
};
