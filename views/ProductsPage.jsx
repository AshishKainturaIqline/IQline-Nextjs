"use client"

import Link from "next/link"
import { useEffect } from "react";
;
import { motion } from "framer-motion";
import { PageHeroShell } from "@/components/page-hero-shell";
import { ProductGridSection } from "@/components/ProductGridSection";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SolutionsBySetting } from "@/components/SolutionsBySetting";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
function ProductsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div className="flex min-h-svh flex-col">
      
      <SiteHeader />

      <main className="flex-1 ">
        <PageHeroShell>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
              <Badge className="mb-4 border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-teal-300 hover:bg-teal-500/15">
                Product suite
              </Badge>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Software for your daily workflows
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-pretty text-slate-400">
                Explore products for hospital operations, laboratory management,
                medical education, prescriptions and radiology.
              </p>
              <div className="mt-8">
                <Button
    size="lg"
    className="bg-teal-500 font-semibold text-slate-900 shadow-lg shadow-teal-500/25 hover:bg-teal-400"
    asChild
  >
                  <Link href="/contact-us">Request a demo</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </PageHeroShell>

        <ProductGridSection />
        <SolutionsBySetting />
      </main>

      <SiteFooter />
    </div>;
}
export {
  ProductsPage
};
