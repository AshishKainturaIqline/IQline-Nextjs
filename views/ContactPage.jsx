"use client"

import { useSearchParams } from "next/navigation"
import { useEffect } from "react";
;
import { motion } from "framer-motion";
import { ContactSection } from "@/components/ContactSection";
import { PageHeroShell } from "@/components/page-hero-shell";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
function ContactPage() {
  const searchParams = useSearchParams();
  const prefillProduct = searchParams.get("product") || "";
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
              <Badge className="mb-4 border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-teal-300 hover:bg-teal-500/15">
                Get in touch
              </Badge>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Request a demo
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-pretty text-slate-400">
                Tell us about your institution and the product you are interested
                in. Our team will arrange a walkthrough around the tasks you want
                to manage.
              </p>
            </motion.div>
          </div>
        </PageHeroShell>

        <ContactSection prefillProduct={prefillProduct} />
      </main>

      <SiteFooter />
    </div>;
}
export {
  ContactPage
};
