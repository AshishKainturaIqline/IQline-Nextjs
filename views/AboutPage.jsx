"use client"

import Link from "next/link"
import { useEffect } from "react";
;
import { motion } from "framer-motion";
import { AboutFounders } from "@/components/AboutFounders";
import { PageHeroShell } from "@/components/page-hero-shell";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WhyIqLine } from "@/components/WhyIqLine";
function AboutPage() {
  const hash = typeof window !== "undefined" ? window.location.hash : "";
  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const start = window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 50);
      return () => window.clearTimeout(start);
    }
    window.scrollTo(0, 0);
  }, [hash]);
  return <div className="flex min-h-svh flex-col">
      
      <SiteHeader />

      <main className="flex-1 overflow-x-hidden">
        <PageHeroShell>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <motion.div className="animate-hero-rise">
              <Badge className="mb-4 border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-teal-300 hover:bg-teal-500/15">
                About IQ-Line
              </Badge>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Software for the work behind care
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-pretty text-slate-400">
                IQ-Line develops software for hospitals, diagnostic laboratories
                and medical colleges in India. Our products support registration,
                reporting, prescriptions, radiology and student administration.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
    size="lg"
    className="bg-teal-500 font-semibold text-slate-900 shadow-lg shadow-teal-500/25 hover:bg-teal-400"
    asChild
  >
                  <Link href="/products">View products</Link>
                </Button>
                <Button
    size="lg"
    variant="outline"
    className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
    asChild
  >
                  <Link href="/contact-us">Request a demo</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </PageHeroShell>

        <AboutFounders />
        <WhyIqLine />
      </main>

      <SiteFooter />
    </div>;
}
export {
  AboutPage
};
