"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRightIcon,
  CheckCircle2Icon,
  ClockIcon,
  Loader2Icon,
  LockIcon,
  MailIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ZapIcon
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { submitDemoForm } from "@/lib/form-service";
import { products } from "@/lib/products-data";
import {
  fadeUp,
  Section,
  SectionAura,
  staggerTight
} from "@/components/home-section-primitives";
const DELIVERY_ERROR = "Your request could not be sent. Please try again or email info@iqline.co.in.";
function ContactSection({
  prefillProduct = ""
}) {
  const [inquiry, setInquiry] = useState(prefillProduct);
  const [productLocked, setProductLocked] = useState(Boolean(prefillProduct));
  const [minBookingDate, setMinBookingDate] = useState("");
  useEffect(() => {
    setMinBookingDate(new Date().toISOString().split("T")[0]);
  }, []);
  const [multiProducts, setMultiProducts] = useState([]);
  const [consent, setConsent] = useState(false);
  const [formStatus, setFormStatus] = useState("idle");
  const [formError, setFormError] = useState("");
  useEffect(() => {
    if (!prefillProduct) return;
    setInquiry(prefillProduct);
    setProductLocked(true);
    setMultiProducts([]);
  }, [prefillProduct]);
  async function handleContactSubmit(e) {
    e.preventDefault();
    if (!inquiry) {
      setFormStatus("error");
      setFormError("Please select a product you're interested in.");
      return;
    }
    if (inquiry === "multi" && multiProducts.length === 0) {
      setFormStatus("error");
      setFormError("Please select at least one product.");
      return;
    }
    if (!consent) {
      setFormStatus("error");
      setFormError(
        "Please tick the consent box so we can contact you about your demo."
      );
      return;
    }
    setFormStatus("submitting");
    setFormError("");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const productLabel = (id) => id === "other" ? "Other" : products.find((p) => p.id === id)?.title ?? id;
    const selectedProducts = inquiry === "multi" ? multiProducts.map(productLabel).join(", ") : productLabel(inquiry);
    const result = await submitDemoForm({
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      organization: formData.get("organization"),
      productInterest: selectedProducts,
      message: formData.get("message"),
      preferredDate: formData.get("preferredDate") || "",
      preferredTime: formData.get("preferredTime") || "",
      sourcePage: window.location.pathname + window.location.search,
      sourceCta: "contact-form"
    });
    if (result.success) {
      setFormStatus("success");
      form.reset();
      setInquiry("");
      setProductLocked(false);
      setMultiProducts([]);
      setConsent(false);
    } else {
      setFormStatus("error");
      setFormError(DELIVERY_ERROR);
    }
  }
  return <Section id="contact" className="relative overflow-hidden py-20 sm:py-28">
      <SectionAura />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
          {
    /* Left Column: Value Proposition & Highlights */
  }
          <motion.div
    variants={fadeUp}
    className="flex flex-col justify-between lg:sticky lg:top-24 lg:self-start"
  >
            <div>
              <Badge
    variant="secondary"
    className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold ring-1 ring-primary/20"
  >
                <SparklesIcon className="size-3.5 text-primary" /> Book a Demo
              </Badge>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                See how <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  IQ-Line fits your workflow
                </span>
              </h2>
              <p className="mt-4 text-pretty text-muted-foreground leading-relaxed md:text-lg">
                Tell us about your institution and the product you are interested in. Our team will arrange a walkthrough around the tasks you want to manage.
              </p>

              {
    /* Enhanced Value Prop Badges */
  }
              <motion.div
    variants={staggerTight}
    initial="hidden"
    whileInView="visible"
    className="mt-8 space-y-3.5"
  >
                {[
    {
      icon: ShieldCheckIcon,
      label: "Explore the product",
      sub: "See the workflows relevant to your team."
    },
    {
      icon: ZapIcon,
      label: "Discuss implementation",
      sub: "Talk through configuration, integrations and rollout requirements."
    },
    {
      icon: ClockIcon,
      label: "Agree the next step",
      sub: "Our team will contact you to arrange a suitable time."
    }
  ].map((item) => {
    const Icon = item.icon;
    return <div
      key={item.label}
      className="group relative flex items-start gap-4 rounded-2xl border border-border/50 bg-background/60 p-3.5 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-background/90 hover:shadow-md"
    >
                      <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-transform duration-300 group-hover:scale-110">
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {item.label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.sub}
                        </p>
                      </div>
                    </div>;
  })}
              </motion.div>
            </div>

            {
    /* Micro-Contact Support Banner */
  }
            <div className="mt-10 rounded-2xl border border-border/60 bg-muted/30 p-4 backdrop-blur-md">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Direct Contact
              </p>
              <div className="mt-2 flex items-center gap-2 text-sm font-medium text-foreground">
                <MailIcon className="size-4 text-primary" />
                <a
    href="mailto:info@iqline.co.in"
    className="hover:text-primary hover:underline"
  >
                  info@iqline.co.in
                </a>
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">
                This inbox is monitored.
              </p>
            </div>
          </motion.div>

          {
    /* Right Column: High Converting Form Card */
  }
          <motion.div variants={fadeUp}>
            <Card className="relative overflow-hidden border-border/80 bg-card/95 shadow-2xl backdrop-blur-xl ring-1 ring-border/50">
              {
    /* Subtle Ambient Top Border Accent */
  }
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/80 via-primary to-primary/40" />

              <CardHeader className="space-y-1.5 pb-6 pt-8">
                <CardTitle className="text-2xl font-bold tracking-tight">
                  Request a consultation
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Fill in your details below and our team will get in touch.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <AnimatePresence mode="wait">
                  {formStatus === "success" ? <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="flex flex-col items-center justify-center py-12 text-center"
  >
                      <div className="relative flex size-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 ring-8 ring-emerald-500/5 dark:bg-emerald-500/20 dark:text-emerald-400">
                        <CheckCircle2Icon className="size-10" />
                      </div>
                      <h3 className="mt-6 text-2xl font-bold tracking-tight">
                        Thank you.
                      </h3>
                      <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground leading-relaxed">
                        We have received your demo request and will contact you
                        to arrange a suitable time.
                      </p>
                      <Button
    variant="outline"
    className="mt-8 rounded-xl border-border/80 font-medium shadow-sm hover:bg-muted"
    onClick={() => setFormStatus("idle")}
  >
                        Submit another request
                      </Button>
                    </motion.div> : <form
    className="space-y-5"
    onSubmit={handleContactSubmit}
  >
                      {
    /* Name & Email Row */
  }
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Full name <span className="text-destructive">*</span>
                          </Label>
                          <div className="relative">
                            <Input
    id="name"
    name="name"
    autoComplete="name"
    required
    minLength={2}
    pattern="[A-Za-z\s\.\-']+"
    title="Please enter a valid name (letters only)"
    placeholder="e.g. Amit Kumar"
    className="h-11 bg-background/50 pl-3.5 transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/20"
  />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Work email <span className="text-destructive">*</span>
                          </Label>
                          <Input
    id="email"
    name="email"
    type="email"
    autoComplete="email"
    required
    title="Please enter a valid email address"
    placeholder="e.g. amit@hospital.org"
    className="h-11 bg-background/50 transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/20"
  />
                        </div>
                      </div>

                      {
    /* Phone & Organization Row */
  }
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Phone <span className="text-destructive">*</span>
                          </Label>
                          <Input
    id="phone"
    name="phone"
    type="tel"
    autoComplete="tel"
    required
    pattern="[0-9\+\-\s\(\)]{10,15}"
    title="Please enter a valid phone number (10-15 digits)"
    placeholder="e.g. +91 9876543210"
    className="h-11 bg-background/50 transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/20"
  />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="org" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Organization / Institution
                          </Label>
                          <Input
    id="org"
    name="organization"
    placeholder="e.g. AIIMS / City Lab"
    className="h-11 bg-background/50 transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/20"
  />
                        </div>
                      </div>

                      {
    /* Product Interest Selector */
  }
                      {productLocked ? <div className="space-y-2">
                          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Interested in
                          </Label>
                          <div className="flex items-center justify-between rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 shadow-inner">
                            <div className="flex items-center gap-2">
                              <LockIcon className="size-4 text-primary" />
                              <span className="text-sm font-semibold text-foreground">
                                {products.find((p) => p.id === inquiry)?.title ?? "Selected product"}
                              </span>
                            </div>
                            <button
    type="button"
    onClick={() => {
      setProductLocked(false);
      setInquiry("");
    }}
    className="text-xs font-semibold text-primary transition-colors hover:underline"
  >
                              Change product
                            </button>
                          </div>
                        </div> : <div className="space-y-2">
                          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Interested in <span className="text-destructive">*</span>
                          </Label>
                          <Select
    value={inquiry}
    onValueChange={(v) => {
      setInquiry(v);
      if (v !== "multi") setMultiProducts([]);
    }}
    required
  >
                            <SelectTrigger className="h-11 bg-background/50 text-sm transition-all focus:ring-2 focus:ring-primary/20">
                              <SelectValue placeholder="Select a product platform" />
                            </SelectTrigger>
                            <SelectContent>
                              {products.map((p) => <SelectItem key={p.id} value={p.id} className="cursor-pointer">
                                  {p.title}
                                </SelectItem>)}
                              <SelectItem value="multi" className="cursor-pointer font-medium text-primary">
                                Multiple products
                              </SelectItem>
                              <SelectItem value="other" className="cursor-pointer">
                                Other / Custom Solution
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>}

                      {
    /* Multi-Product Selection Checkboxes Grid */
  }
                      {!productLocked && inquiry === "multi" && <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    exit={{ opacity: 0, height: 0 }}
    className="space-y-2"
  >
                          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Select products <span className="text-destructive">*</span>
                          </Label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 rounded-xl border border-border/80 bg-muted/20 p-3.5">
                            {products.map((p) => {
    const isChecked = multiProducts.includes(p.id);
    return <label
      key={p.id}
      htmlFor={`multi-${p.id}`}
      className={`flex items-center gap-3 rounded-lg border p-2.5 transition-all cursor-pointer ${isChecked ? "border-primary bg-primary/10 font-medium text-foreground shadow-sm" : "border-border/60 bg-background/50 hover:bg-muted/50 text-muted-foreground"}`}
    >
                                  <Checkbox
      id={`multi-${p.id}`}
      checked={isChecked}
      onCheckedChange={(checked) => {
        setMultiProducts(
          (prev) => checked ? [...prev, p.id] : prev.filter((id) => id !== p.id)
        );
      }}
    />
                                  <span className="text-xs font-medium leading-none">
                                    {p.title}
                                  </span>
                                </label>;
  })}
                          </div>
                        </motion.div>}

                      {
    /* Preferred Schedule Row */
  }
                      <div className="space-y-2">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="preferredDate" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                              Preferred demo date{" "}
                              <span className="font-medium normal-case tracking-normal">
                                (optional)
                              </span>
                            </Label>
                            <div className="relative">
                              <Input
    id="preferredDate"
    name="preferredDate"
    type="date"
    min={minBookingDate || undefined}
    className="h-11 bg-background/50 transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/20"
  />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="preferredTime" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                              Preferred time{" "}
                              <span className="font-medium normal-case tracking-normal">
                                (optional)
                              </span>
                            </Label>
                            <Input
    id="preferredTime"
    name="preferredTime"
    type="time"
    className="h-11 bg-background/50 transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/20"
  />
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Share a preferred time in IST. We will confirm
                          availability.
                        </p>
                      </div>

                      {
    /* Message Field */
  }
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Additional Requirements / Message
                        </Label>
                        <Textarea
    id="message"
    name="message"
    rows={3}
    className="bg-background/50 resize-none transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/20"
  />
                        <p className="text-xs text-muted-foreground">
                          Tell us which workflows you want to improve. Please do
                          not include patient information.
                        </p>
                      </div>

                      {
    /* Consent Checkbox */
  }
                      <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5">
                        <div className="flex items-start gap-3">
                          <Checkbox
    id="consent"
    name="consent"
    className="mt-0.5"
    checked={consent}
    onCheckedChange={(v) => setConsent(v === true)}
    aria-describedby="consent-description"
    required
  />
                          <div
    id="consent-description"
    className="text-xs leading-relaxed text-muted-foreground"
  >
                            <Label
    htmlFor="consent"
    className="cursor-pointer font-medium text-foreground"
  >
                              I agree to be contacted by IQ-Line about this demo
                              request.{" "}
                              <span className="text-destructive">*</span>
                            </Label>
                            <p className="mt-1.5">
                              Read how we handle this information in our{" "}
                              <Link
    href="/privacy-policy"
    className="font-medium text-primary underline-offset-4 hover:underline"
  >
                                Privacy Policy
                              </Link>
                              .
                            </p>
                          </div>
                        </div>
                      </div>

                      {
    /* Error Message Box */
  }
                      {formStatus === "error" && <motion.div
    initial={{ opacity: 0, y: -5 }}
    animate={{ opacity: 1, y: 0 }}
    className="rounded-xl border border-destructive/20 bg-destructive/10 p-3.5 text-xs font-medium text-destructive"
  >
                          {formError === DELIVERY_ERROR ? <>
                              Your request could not be sent. Please try again
                              or{" "}
                              <a
    href="mailto:info@iqline.co.in"
    className="underline underline-offset-2"
  >
                                email info@iqline.co.in
                              </a>
                              .
                            </> : formError || DELIVERY_ERROR}
                        </motion.div>}

                      {
    /* Submit CTA Button */
  }
                      <Button
    type="submit"
    size="lg"
    className="h-12 w-full rounded-xl font-semibold text-sm shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.99]"
    disabled={formStatus === "submitting" || !consent}
  >
                        {formStatus === "submitting" ? <span className="flex items-center justify-center gap-2">
                            Sending Request...{" "}
                            <Loader2Icon className="size-4 animate-spin" />
                          </span> : <span className="flex items-center justify-center gap-2">
                            Confirm Walkthrough Request{" "}
                            <ArrowRightIcon className="size-4" />
                          </span>}
                      </Button>
                    </form>}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </Section>;
}
export {
  ContactSection
};
