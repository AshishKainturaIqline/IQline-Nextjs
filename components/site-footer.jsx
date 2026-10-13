"use client"

import Link from "next/link"
import { motion } from "framer-motion";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
;
import { Separator } from "@/components/ui/separator"
import { assetSrc } from "@/lib/utils";
import logoDark from "@/assets/logo/Logo-Darktheme.svg";
import logoLight from "@/assets/logo/Logo-Lighttheme.svg";
import makeInIndia from "@/assets/make_in_india.png";
const footerLinks = {
  products: [
    { to: "/products/lims", label: "LabSaarthi: LIMS" },
    { to: "/products/hims", label: "HospitalSaarthi: HIMS" },
    { to: "/products/meducampus", label: "MEDU Campus" },
    { to: "/products/eprescription", label: "Smart Parcha" },
    { to: "/products/rims", label: "Paxoris: RIMS" }
  ],
  company: [
    { to: "/about#why", label: "Why IQ-Line" },
    { to: "/about", label: "About" },
    { to: "/blog", label: "Blogs" },
    { to: "/careers", label: "Careers" },
    { to: "/contact", label: "Contact" }
  ]
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } }
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};
function SiteFooter() {
  return <footer className="relative overflow-hidden border-t border-border bg-muted/40 text-foreground dark:bg-muted/25">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="pointer-events-none absolute top-0 left-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px] dark:bg-primary/10" />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-80px" }}
    variants={stagger}
    className="grid gap-12 md:grid-cols-2 lg:grid-cols-4"
  >
          {
    /* Brand */
  }
          <motion.div variants={fadeUp} className="space-y-4 lg:col-span-1">
            <div className="flex items-center">
              <img
    src={assetSrc(logoLight)}
    alt="IQ-Line"
    width={228}
    height={97}
    className="h-24 w-auto dark:hidden"
  />
              <img
    src={assetSrc(logoDark)}
    alt="IQ-Line"
    width={228}
    height={97}
    className="hidden h-24 w-auto dark:block"
  />
            </div>
            <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
            Software for hospitals, laboratories and medical colleges, covering clinical, diagnostic and academic workflows.
            </p>
            <p className="text-xs font-medium text-primary/90">
              Elevating Lives Digitally
            </p>
            {
    /* Make in India */
  }
            <div className="flex items-center pt-2">
              <img
    src={assetSrc(makeInIndia)}
    alt="Make in India"
    className="h-24 w-auto object-contain"
  />
            </div>
          </motion.div>

          {
    /* Products */
  }
          <motion.div variants={fadeUp}>
            <Link
    href="/products"
    className="mb-4 inline-block text-xs font-semibold tracking-widest text-muted-foreground uppercase transition-colors hover:text-primary"
  >
              Products
            </Link>
            <ul className="space-y-2.5 text-sm">
              {footerLinks.products.map((link) => <li key={link.to}>
                  <Link
    href={link.to}
    className="text-muted-foreground transition-colors hover:text-primary"
  >
                    {link.label}
                  </Link>
                </li>)}
            </ul>
          </motion.div>

          {
    /* Company */
  }
          <motion.div variants={fadeUp}>
            <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              Company
            </p>
            <ul className="space-y-2.5 text-sm">
              {footerLinks.company.map((link) => <li key={link.label}>
                  <Link
    href={link.to}
    className="text-muted-foreground transition-colors hover:text-primary"
  >
                    {link.label}
                  </Link>
                </li>)}
            </ul>
          </motion.div>

          {
    /* Contact */
  }
          <motion.div variants={fadeUp} className="space-y-3 text-sm">
            <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              Get in touch
            </p>
            <a
    href="mailto:info@iqline.co.in"
    className="flex items-start gap-2.5 text-muted-foreground transition-colors hover:text-primary"
  >
              <MailIcon className="mt-0.5 size-4 shrink-0" />
              info@iqline.co.in
            </a>
            <a
    href="tel:+918384020035"
    className="flex items-start gap-2.5 text-muted-foreground transition-colors hover:text-primary"
  >
              <PhoneIcon className="mt-0.5 size-4 shrink-0" />
              +91 83840 20035
            </a>
            <p className="flex items-start gap-2.5 text-muted-foreground">
              <MapPinIcon className="mt-0.5 size-4 shrink-0" />
              <span>
                2nd Floor, Pinnacle Tower, Noida-Greater Noida Expy, Sector 142, Noida, Uttar Pradesh 201305
              </span>
            </p>
            <div className="flex gap-3 pt-1">
              <a
    href="https://www.linkedin.com/company/iq-line-pvt-ltd/"
    target="_blank"
    rel="noreferrer"
    aria-label="LinkedIn"
    className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"
  >
                {
    /* LinkedIn */
  }
                <svg
    className="size-4 shrink-0"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span className="text-xs">LinkedIn</span>
              </a>
              <a
    href="https://www.facebook.com/profile.php?id=61586462710135"
    target="_blank"
    rel="noreferrer"
    aria-label="Facebook"
    className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"
  >
                {
    /* Facebook */
  }
                <svg
    className="size-4 shrink-0"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="text-xs">Facebook</span>
              </a>
              <a
    href="https://www.instagram.com/_iqline_/"
    target="_blank"
    rel="noreferrer"
    aria-label="Instagram"
    className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"
  >
                {
    /* Instagram */
  }
                <svg
    className="size-4 shrink-0"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span className="text-xs">Instagram</span>
              </a>
            </div>
          </motion.div>
        </motion.div>

        <Separator className="my-10 bg-border" />

        <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row"
  >
          <p>
            © {2026} IQ-Line Pvt Ltd. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <Link
    href="/privacy-policy"
    className="transition-colors hover:text-primary"
  >
              Privacy Policy
            </Link>
            <Link
    href="/terms-and-conditions"
    className="transition-colors hover:text-primary"
  >
              Terms of Service
            </Link>
            <span className="text-primary/70">
              Leading AI-first healthcare automation · India
            </span>
          </div>
        </motion.div>
      </div>
    </footer>;
}
export {
  SiteFooter
};
