
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  ArrowRight,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";
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
    { to: "/products/rims", label: "Paxoris: RIMS" },
  ],
  company: [
    { to: "/about-us#why", label: "Why IQ-Line" },
    { to: "/about-us", label: "About" },
    { to: "/blog", label: "Blogs" },
    { to: "/careers", label: "Careers" },
    { to: "/contact-us", label: "Contact" },
  ],
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex items-center gap-2 rounded-md
        text-muted-foreground transition-colors
        hover:text-primary focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-primary
        focus-visible:ring-offset-2"
    >
      {children}
      <span className="text-xs">{label}</span>
    </a>
  );
}

function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-border bg-muted/40 text-foreground dark:bg-muted/25">
      {/* Top accent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* Subtle background glow */}
      <div className="pointer-events-none absolute left-1/4 top-0 -z-10 size-[420px] -translate-y-1/2 rounded-full bg-primary/[0.06] blur-[100px] dark:bg-primary/10" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12"
        >
          {/* Premium Brand Section */}
          <motion.div
            variants={fadeUp}
            className="space-y-5 lg:pr-4"
          >
            {/* Brand logo */}
            <Link
              href="/"
              aria-label="IQ-Line homepage"
              className="inline-flex items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <img
                src={assetSrc(logoLight)}
                alt="IQ-Line"
                width={228}
                height={97}
                className="h-16 w-auto object-contain dark:hidden"
              />

              <img
                src={assetSrc(logoDark)}
                alt="IQ-Line"
                width={228}
                height={97}
                className="hidden h-16 w-auto object-contain dark:block"
              />
            </Link>

            {/* Brand heading */}
            <div className="space-y-3">
              <h3 className="max-w-sm text-xl font-semibold leading-snug tracking-tight text-foreground sm:text-2xl">
                Technology that moves{" "}
                <span className="text-primary">
                  healthcare forward.
                </span>
              </h3>

              <p className="max-w-sm text-sm leading-7 text-muted-foreground">
                Software for hospitals, laboratories and
                medical colleges, covering clinical,
                diagnostic and academic workflows.
              </p>
            </div>

            {/* Brand tagline */}
            <div className="border-l-2 border-primary py-1 pl-3">
              <p className="text-sm font-semibold tracking-wide text-foreground">
                Elevating Lives Digitally
              </p>
            </div>

            {/* Make in India */}
            <div className="flex items-center pt-1">
              <img
                src={assetSrc(makeInIndia)}
                alt="Make in India"
                width={140}
                height={70}
                loading="lazy"
                className="h-14 w-auto object-contain opacity-90 transition-opacity duration-300 hover:opacity-100"
              />
            </div>

            {/* Contact CTA */}
            {/* <Link
              href="/contact-us"
              className="group flex max-w-md items-center gap-3 rounded-xl border border-primary/30 bg-primary/[0.04] p-4 transition-all duration-300 hover:border-primary/60 hover:bg-primary/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MailIcon className="size-5" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-foreground">
                  Let&apos;s build better healthcare workflows.
                </span>

                <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                  Find the right solution for your institution.
                </span>
              </span>

              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="size-4" />
              </span>
            </Link> */}
          </motion.div>

          {/* Products */}
          <motion.div variants={fadeUp}>
            <Link
              href="/products"
              className="mb-5 inline-block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-primary"
            >
              Products
            </Link>

            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.to}>
                  <Link
                    href={link.to}
                    className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={fadeUp}>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Company
            </p>

            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.to}>
                  <Link
                    href={link.to}
                    className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact and Social Links */}
          <motion.div
            variants={fadeUp}
            className="space-y-5 text-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Get in touch
            </p>

            <a
              href="mailto:info@iqline.co.in"
              className="group flex items-start gap-3 text-muted-foreground transition-colors hover:text-primary"
            >
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-background/60 transition-colors group-hover:border-primary/30 group-hover:bg-primary/5">
                <MailIcon className="size-4" />
              </span>
              <span className="pt-2 break-all">
                info@iqline.co.in
              </span>
            </a>

            <a
              href="tel:+918384020035"
              className="group flex items-start gap-3 text-muted-foreground transition-colors hover:text-primary"
            >
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-background/60 transition-colors group-hover:border-primary/30 group-hover:bg-primary/5">
                <PhoneIcon className="size-4" />
              </span>
              <span className="pt-2">+91 83840 20035</span>
            </a>

            <div className="flex items-start gap-3 text-muted-foreground">
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-background/60">
                <MapPinIcon className="size-4" />
              </span>
              <address className="pt-1.5 not-italic leading-6">
                2nd Floor, Pinnacle Tower,
                <br />
                Noida-Greater Noida Expy,
                <br />
                Sector 142, Noida,
                <br />
                Uttar Pradesh 201305
              </address>
            </div>

            <Separator className="!my-6 bg-border" />

            {/* Social media */}
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Follow IQ-Line
              </p>

              <div className="flex flex-wrap gap-x-4 gap-y-3">
  <SocialLink
    href="https://www.linkedin.com/company/iq-line-pvt-ltd/"
    label="LinkedIn"
  >
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.21 0 22.23 0Z" />
    </svg>
  </SocialLink>

  <SocialLink
    href="https://www.facebook.com/profile.php?id=61586462710135"
    label="Facebook"
  >
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4"
      aria-hidden="true"
    >
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.019 4.388 11.016 10.125 11.927v-8.437H7.078v-3.49h3.047V9.41c0-3.026 1.792-4.7 4.533-4.7 1.312 0 2.686.236 2.686.236v2.963h-1.514c-1.491 0-1.956.929-1.956 1.882v2.282h3.328l-.532 3.49h-2.796V24C19.612 23.089 24 18.092 24 12.073Z" />
    </svg>
  </SocialLink>

  <SocialLink
    href="https://www.instagram.com/_iqline_/"
    label="Instagram"
  >
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="size-4"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" />
    </svg>
  </SocialLink>
</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer bottom */}
        <Separator className="my-10 bg-border" />

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-between gap-4 text-center text-xs text-muted-foreground sm:flex-row sm:text-left"
        >
          <p>
            © {new Date().getFullYear()} IQ-Line Pvt Ltd.
            All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-primary"
            >
              Privacy Policy
            </Link>

            <span className="hidden h-3 w-px bg-border sm:block" />

            <Link
              href="/terms-and-conditions"
              className="transition-colors hover:text-primary"
            >
              Terms of Service
            </Link>

            <span className="hidden h-3 w-px bg-border sm:block" />

            <span className="text-primary/80">
              Elevating Lives Digitally · India
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export { SiteFooter };
