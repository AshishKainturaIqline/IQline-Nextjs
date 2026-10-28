"use client"

import Link from "next/link"
import { useEffect } from "react";
;
import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
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
function OpeningCard({ job }) {
  return <Card className="flex h-full flex-col">
      <CardHeader>
        <h3 className="font-heading text-xl font-semibold tracking-tight">
          {job.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {job.title} | {job.team} | {job.location} | {job.workMode} |{" "}
          {job.experience}. You will {job.responsibility}
        </p>
      </CardHeader>
      <CardContent className="flex-1 space-y-4 text-sm">
        <dl className="grid gap-3 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Employment type
            </dt>
            <dd className="mt-1">{job.employmentType}</dd>
          </div>
          {job.travel ? <div>
              <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Travel
              </dt>
              <dd className="mt-1">{job.travel}</dd>
            </div> : null}
          {job.compensation ? <div className="sm:col-span-2">
              <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Compensation
              </dt>
              <dd className="mt-1">{job.compensation}</dd>
            </div> : null}
        </dl>
        <div>
          <h4 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Main responsibilities
          </h4>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
            {job.responsibilities.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Essential skills
          </h4>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
            {job.skills.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild>
          <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
            View role and apply
            <ArrowRightIcon className="size-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>;
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
            <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
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
    className="mt-10 grid gap-6 md:grid-cols-2"
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
