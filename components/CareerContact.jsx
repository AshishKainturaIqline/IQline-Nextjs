"use client"

import Link from "next/link"
import { useEffect, useState } from "react";
;
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRightIcon,
  CheckCircle2Icon,
  Loader2Icon,
  MailIcon,
  MapPinIcon,
  PhoneIcon
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
import {
  fadeUp,
  Section,
  SectionAura
} from "@/components/home-section-primitives";
import { careerOpenings } from "@/lib/career-openings";
import { submitCareerContact } from "@/lib/form-service";
const OFFICE_ADDRESS = "2nd Floor, Pinnacle Tower, Noida-Greater Noida Expy, Sector 142, Noida, Uttar Pradesh 201305";
const OFFICE_MAP_SRC = "https://maps.google.com/maps?q=28.50114,77.411824&z=17&output=embed";
const OFFICE_MAPS_LINK = "https://www.google.com/maps/search/?api=1&query=28.50114,77.411824";
const GENERAL_ENQUIRY = "General enquiry";
const MAX_RESUME_BYTES = 1024 * 1024;
const ALLOWED_RESUME_EXTENSIONS = [".pdf", ".doc", ".docx"];
const hasLiveOpenings = careerOpenings.length > 0;
function resumeExtension(fileName) {
  const dot = fileName.lastIndexOf(".");
  return dot === -1 ? "" : fileName.slice(dot).toLowerCase();
}
function formatKilobytes(bytes) {
  const kilobytes = Math.max(1, Math.ceil(bytes / 1024));
  return `${kilobytes} KB`;
}
function resumeFileError(file) {
  if (!ALLOWED_RESUME_EXTENSIONS.includes(resumeExtension(file.name))) {
    return "Resume must be a PDF or Word file (.pdf, .doc, or .docx).";
  }
  if (file.size > MAX_RESUME_BYTES) {
    return `Resume must be 1024 KB or smaller. This file is ${formatKilobytes(file.size)}.`;
  }
  if (file.size < 1) {
    return "The resume file is empty.";
  }
  return "";
}
function readResume(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Could not read the resume. Please try again."));
    reader.readAsDataURL(file);
  });
}
function CareerContact() {
  const [subject, setSubject] = useState("");
  const [resume, setResume] = useState(null);
  const [resumeInputKey, setResumeInputKey] = useState(0);
  const [consent, setConsent] = useState(false);
  const [formStatus, setFormStatus] = useState("idle");
  const [formError, setFormError] = useState("");
  useEffect(() => {
    function onApply(event) {
      const title = event.detail?.title;
      if (!title) return;
      setSubject(title);
      setFormError("");
      setFormStatus((status) => status === "success" ? "idle" : status);
    }
    window.addEventListener("iqline-career-apply", onApply);
    return () => window.removeEventListener("iqline-career-apply", onApply);
  }, []);
  function handleResumeChange(event) {
    const file = event.target.files?.[0];
    if (!file) {
      setResume(null);
      return;
    }
    const error = resumeFileError(file);
    if (error) {
      setResume(null);
      event.target.value = "";
      setFormStatus("error");
      setFormError(error);
      return;
    }
    setResume(file);
    if (formStatus === "error") {
      setFormStatus("idle");
      setFormError("");
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (hasLiveOpenings && !subject) {
      setFormStatus("error");
      setFormError("Please select what this message is about.");
      return;
    }
    const fileError = resume ? resumeFileError(resume) : "Please attach your resume.";
    if (fileError) {
      setFormStatus("error");
      setFormError(fileError);
      return;
    }
    if (!consent) {
      setFormStatus("error");
      setFormError("Please tick the consent box so we can reply to you.");
      return;
    }
    setFormStatus("submitting");
    setFormError("");
    const form = e.currentTarget;
    const formData = new FormData(form);
    let resumeBase64 = "";
    try {
      resumeBase64 = await readResume(resume);
    } catch (error) {
      setFormStatus("error");
      setFormError(error instanceof Error ? error.message : "Could not read the resume. Please try again.");
      return;
    }
    const result = await submitCareerContact({
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: hasLiveOpenings ? subject : GENERAL_ENQUIRY,
      message: formData.get("message"),
      resumeBase64,
      resumeFileName: resume.name,
      sourcePage: "/careers"
    });
    if (result.success) {
      setFormStatus("success");
      form.reset();
      setSubject("");
      setResume(null);
      setResumeInputKey((key) => key + 1);
      setConsent(false);
    } else {
      setFormStatus("error");
      setFormError(result.message);
    }
  }
  return <Section
    id="career-contact"
    className="relative overflow-hidden border-t border-border py-20 sm:py-28"
  >
    <SectionAura />

    <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <motion.div variants={fadeUp}>
          <Badge
            variant="secondary"
            className="mb-4 px-3 py-1 text-xs font-semibold ring-1 ring-primary/20"
          >
            Contact
          </Badge>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Get in touch
          </h2>
          <p className="mt-3 max-w-lg text-pretty text-muted-foreground">
            Ask a question about a listed role or about working at IQ-Line.
            Our office is in Noida.
          </p>

          <div className="mt-8 space-y-4 text-sm">
            <p className="flex items-start gap-3 text-muted-foreground">
              <MapPinIcon className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{OFFICE_ADDRESS}</span>
            </p>
            <a
              href="mailto:info@iqline.co.in"
              className="flex items-start gap-3 text-muted-foreground transition-colors hover:text-primary"
            >
              <MailIcon className="mt-0.5 size-4 shrink-0 text-primary" />
              info@iqline.co.in
            </a>
            <a
              href="tel:+918384020035"
              className="flex items-start gap-3 text-muted-foreground transition-colors hover:text-primary"
            >
              <PhoneIcon className="mt-0.5 size-4 shrink-0 text-primary" />
              +91 83840 20035
            </a>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-border/70 bg-muted/30 shadow-sm">
            <iframe
              title="IQ-Line office location, Pinnacle Tower, Sector 142, Noida"
              src={OFFICE_MAP_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-72 w-full border-0 sm:h-80"
            />
            <div className="border-t border-border/70 px-4 py-3">
              <a
                href={OFFICE_MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                Open office location in Google Maps
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Card className="relative border-border/80 bg-card/95 shadow-xl ring-1 ring-border/50">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/80 via-primary to-primary/40" />
            <CardHeader className="space-y-1.5 pt-8">
              <CardTitle className="text-2xl font-bold tracking-tight">
                Send a message
              </CardTitle>
              <CardDescription>
                Fields marked with{" "}
                <span className="text-destructive">*</span> are required.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                {formStatus === "success" ? <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center py-10 text-center"
                >
                  <div className="flex size-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 ring-8 ring-emerald-500/5 dark:text-emerald-400">
                    <CheckCircle2Icon className="size-8" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">
                    Message sent
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                    Thank you. We will review your message and reply if we
                    can help.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => setFormStatus("idle")}
                  >
                    Send another message
                  </Button>
                </motion.div> : <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="career-name">
                        Full name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="career-name"
                        name="name"
                        autoComplete="name"
                        required
                        minLength={2}
                        pattern="[A-Za-z\s.\-']+"
                        title="Please enter a valid name"
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="career-email">
                        Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="career-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="career-phone">
                      Phone <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="career-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      pattern="[0-9+\-\s()]{10,15}"
                      title="Please enter a valid phone number"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  {hasLiveOpenings ? <div className="space-y-2">
                    <Label htmlFor="career-subject">
                      This message is about{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={subject}
                      onValueChange={setSubject}
                      required
                    >
                      <SelectTrigger id="career-subject">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={GENERAL_ENQUIRY}>
                          {GENERAL_ENQUIRY}
                        </SelectItem>
                        {careerOpenings.map((job) => <SelectItem
                          key={`${job.title}-${job.team}`}
                          value={job.title}
                        >
                          {job.title}
                        </SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div> : null}

                  <div className="space-y-2">
                    <Label htmlFor="career-message">
                      Message <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="career-message"
                      name="message"
                      required
                      minLength={10}
                      rows={4}
                      placeholder="Tell us what you would like to know."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="career-resume">
                      Resume <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      key={resumeInputKey}
                      id="career-resume"
                      name="resume"
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      required
                      onChange={handleResumeChange}
                    />
                    <p className="text-xs text-muted-foreground">
                      PDF or Word only (.pdf, .doc, .docx). Maximum 1024 KB.
                    </p>
                    {resume ? <p className="text-xs font-medium text-foreground">
                      {resume.name} · {formatKilobytes(resume.size)}
                    </p> : null}
                  </div>

                  <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="career-consent"
                        name="consent"
                        className="mt-0.5"
                        checked={consent}
                        onCheckedChange={(v) => setConsent(v === true)}
                        required
                      />
                      <Label
                        htmlFor="career-consent"
                        className="cursor-pointer text-xs leading-relaxed font-normal text-muted-foreground"
                      >
                        I consent to IQ-Line contacting me about this
                        message and agree to the{" "}
                        <Link
                          href="/privacy-policy"
                          className="font-medium text-primary underline-offset-4 hover:underline"
                        >
                          Privacy Policy
                        </Link>
                        . <span className="text-destructive">*</span>
                      </Label>
                    </div>
                  </div>

                  {formStatus === "error" && formError ? <p className="rounded-xl border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                    {formError}
                  </p> : null}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={formStatus === "submitting"}
                  >
                    {formStatus === "submitting" ? <>
                      Sending
                      <Loader2Icon className="size-4 animate-spin" />
                    </> : <>
                      Send message
                      <ArrowRightIcon className="size-4" />
                    </>}
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
  CareerContact
};
