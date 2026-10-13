"use client"

import Link from "next/link"
;
import { motion } from "framer-motion";
import { PageHeroShell } from "@/components/page-hero-shell";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
const lastUpdated = "June 2, 2026";
const contactEmail = "info@iqline.co.in";
const privacyPolicy = {
  title: "Privacy Policy",
  badge: "Legal",
  path: "/privacy-policy",
  description: "How IQ-Line Private Limited collects, uses, stores, processes, discloses, and safeguards information across its platforms and services.",
  sections: [
    {
      title: "IQ-Line Private Limited",
      paragraphs: [
        'IQ-Line Private Limited ("IQ-Line", "Company", "We", "Us", or "Our") is committed to protecting the privacy, confidentiality, and security of personal information shared through Our website and Services. In this Privacy Policy, "We", "Us" and "Our" mean IQ-Line. "You" and "Your" mean the person or organisation using the website or Services.',
        'Our Services include this website, applications, healthcare platforms, MEDU Campus (IQ-Line\u2019s medical college student management platform), and related software used by hospitals, laboratories and medical colleges (together, the "Platform" or "Services").',
        "This Privacy Policy explains how We collect, use, store, process, disclose, and safeguard information when You access or use Our Platform and Services.",
        "By accessing or using the Platform, You agree to the terms of this Privacy Policy and consent to the collection and use of information in accordance with this Policy."
      ]
    },
    {
      title: "Website enquiries and software data",
      paragraphs: [
        "This Privacy Policy covers two different contexts. Please read the parts that apply to how You use IQ-Line.",
        "Website enquiries: If You send a demo request, career enquiry or other message through this website, We receive the details You submit, such as Your name, email address, phone number, organisation, the product You selected and Your message. The public website does not collect patient records, student academic records or biometric attendance data.",
        "Hospital, laboratory and college software: Patient, prescription, laboratory, radiology, student and faculty records are processed only where an institution uses the relevant IQ-Line software and has configured those functions. The institution remains responsible for the records it enters and for telling its own users how that software is used."
      ]
    },
    {
      title: "1. Information We Collect",
      paragraphs: [
        "We may collect personal, professional, technical, healthcare-related, educational, and institutional information from Users including but not limited to:"
      ],
      subsections: [
        {
          title: "a) Personal Information",
          bullets: [
            "Full Name",
            "Phone Number",
            "Email Address",
            "Hospital/Clinic/Institution Name",
            "Designation",
            "Address",
            "Profile Information"
          ]
        },
        {
          title: "b) Healthcare & Medical Information",
          paragraphs: ["Depending on the Services used, We may collect:"],
          bullets: [
            "Prescription records",
            "Digitized prescriptions through OCR",
            "Patient demographics",
            "Medical records and reports",
            "Diagnostic reports",
            "Consultation details",
            "Treatment history",
            "Appointment information",
            "Pharmacy and billing records",
            "Clinical workflow data"
          ]
        },
        {
          title: "c) Educational & Institutional Information",
          paragraphs: [
            "For MEDU Campus, We may also collect and process the following where an institution uses that software:"
          ],
          bullets: [
            "Student information, including student name and profile details, enrollment and registration data, academic records and performance, attendance records, examination and assessment data, clinical postings and ward duties, internship and rotation details, competency tracking records, digital logbook submissions, assignment and project submissions, and facial biometric attendance data only if the institution has enabled that function.",
            "Faculty and institutional information, including faculty profiles and credentials, department information, teaching schedules, evaluation records, academic feedback, administrative workflows, and accreditation and compliance records.",
            "Clinical and competency records, including clinical exposure records, bedside postings, internship records, ward duties, and other academic records configured by the institution. Software can support an institution\u2019s own review process; it does not by itself establish regulatory compliance."
          ]
        },
        {
          title: "d) Technical Information",
          paragraphs: ["We may automatically collect:"],
          bullets: [
            "IP address",
            "Browser type",
            "Device information",
            "Operating system",
            "Access timestamps",
            "Usage analytics",
            "Log data"
          ]
        },
        {
          title: "e) Uploaded Content",
          paragraphs: ["Users may voluntarily upload:"],
          bullets: [
            "Prescription images",
            "Medical documents",
            "Reports",
            "Lab records",
            "Profile images",
            "Healthcare-related documents",
            "Academic documents",
            "Assignments",
            "Institutional records"
          ]
        }
      ]
    },
    {
      title: "2. How IQ-Line Uses Information",
      bullets: [
        "Providing healthcare digitization services",
        "Prescription OCR processing",
        "HIMS and EMR workflow management",
        "Healthcare analytics and reporting",
        "Appointment and patient management",
        "Improving operational efficiency",
        "Customer support and troubleshooting",
        "Platform performance monitoring",
        "Security and fraud prevention",
        "Compliance with applicable laws and regulations",
        "Communication regarding services, updates, and support",
        "Managing student academic workflows",
        "Facilitating faculty-student engagement",
        "Tracking attendance, assessments, and competencies",
        "Managing clinical postings and digital logbooks",
        "Supporting institutional academic and competency records, according to the configured process",
        "Enabling academic reporting and institutional analytics",
        "Improving institutional administration and operational efficiency",
        "Bringing academic, clinical, and administrative records into one system",
        "Supporting faculty review of recorded activities and competency tracking",
        "Supporting faculty and student collaboration tools"
      ],
      paragraphs: [
        "We may also use anonymized and aggregated data for research, analytics, product enhancement, and operational insights."
      ]
    },
    {
      title: "3. Prescription OCR & Healthcare Data Processing",
      paragraphs: [
        "IQ-Line's Prescription OCR technology is designed to digitize handwritten and printed prescriptions into structured healthcare records.",
        "The OCR process only analyses documents explicitly uploaded or scanned by authorized users.",
        "We do not alter doctor prescriptions or modify medical recommendations during OCR processing.",
        "OCR outputs may require professional validation. Recognised details should be checked before they are used for orders, dispensing or clinical decisions.",
        "Our solutions are designed to support existing healthcare workflows, including pen-based consultation routines where those are in use."
      ]
    },
    {
      title: "4. Educational & Institutional Data Management",
      paragraphs: [
        "MEDU Campus is designed to help medical colleges, universities, and teaching hospitals manage academic, clinical and administrative records.",
        "Our platform helps institutions eliminate fragmented data systems by consolidating academic, clinical, and administrative information into centralized and secure digital infrastructure.",
        "The platform may support:"
      ],
      bullets: [
        "Student lifecycle management",
        "Academic administration",
        "Competency tracking",
        "Clinical exposure monitoring",
        "Faculty-student engagement tools",
        "Digital logbooks",
        "Attendance systems",
        "Assignment submissions",
        "Ward duty tracking",
        "Clinical competency assessments",
        "Faculty evaluations and feedback systems",
        "Accreditation and compliance reporting"
      ],
      subsections: [
        {
          title: "Institutional safeguards",
          paragraphs: [
            "IQ-Line implements reasonable safeguards to ensure institutional, academic, and clinical data remains protected and accessible only to authorized stakeholders."
          ]
        }
      ]
    },
    {
      title: "5. Camera, Storage & Device Permissions",
      paragraphs: [
        "Depending on the features used, the Platform may request access to:"
      ],
      subsections: [
        {
          title: "Camera Access",
          paragraphs: ["Used for:"],
          bullets: [
            "Capturing prescriptions",
            "Uploading medical records",
            "Scanning healthcare documents",
            "Updating profile images",
            "Uploading academic or institutional documents"
          ]
        },
        {
          title: "Storage Access",
          paragraphs: ["Used for:"],
          bullets: [
            "Uploading files and medical records",
            "Downloading reports",
            "Saving healthcare documents",
            "Uploading assignments and institutional records"
          ]
        },
        {
          title: "File access",
          paragraphs: [
            "IQ-Line only accesses files explicitly selected or uploaded by You.",
            "We do not scan unrelated files or personal device content."
          ]
        }
      ]
    },
    {
      title: "6. Cookies & Tracking Technologies",
      paragraphs: [
        "IQ-Line may use cookies and similar technologies to:"
      ],
      bullets: [
        "Improve website functionality",
        "Analyze user interactions",
        "Enhance user experience",
        "Maintain login sessions",
        "Measure platform performance"
      ],
      subsections: [
        {
          title: "Cookie settings",
          paragraphs: [
            "You may disable cookies through browser settings; however, certain Platform functionalities may become unavailable."
          ]
        }
      ]
    },
    {
      title: "7. Data Sharing & Disclosure",
      paragraphs: [
        "We may share information only in the following circumstances:"
      ],
      bullets: [
        "With hospitals, clinics, universities, institutions, pharmacies, or healthcare providers authorized by the User",
        "With technology partners and service providers operating under confidentiality obligations",
        "To comply with legal or regulatory requirements",
        "To protect rights, safety, and platform security",
        "During mergers, acquisitions, or restructuring activities",
        "With government authorities where legally required"
      ],
      subsections: [
        {
          title: "No sale of data",
          paragraphs: [
            "IQ-Line does not sell personal healthcare or educational information to third parties."
          ]
        }
      ]
    },
    {
      title: "8. Data Security",
      paragraphs: [
        "IQ-Line implements reasonable administrative, technical, and physical safeguards to protect personal, healthcare, academic, and institutional information from:"
      ],
      bullets: [
        "Unauthorized access",
        "Data loss",
        "Misuse",
        "Alteration",
        "Disclosure",
        "Destruction"
      ],
      subsections: [
        {
          title: "Security measures may include:",
          bullets: [
            "Encrypted data transmission",
            "Secure cloud infrastructure",
            "Role-based access control",
            "Authentication systems",
            "Audit logs",
            "Secure storage mechanisms",
            "Institution-level access permissions",
            "Student and faculty role-based authentication",
            "Academic record access controls",
            "Audit trails for institutional workflows",
            "Secure storage of academic and clinical competency records",
            "Access monitoring for university administrative systems"
          ],
          paragraphs: [
            "While We strive to protect all information, no digital platform can guarantee absolute security."
          ]
        }
      ]
    },
    {
      title: "9. Data Retention",
      paragraphs: [
        "Retention depends on the context. Website enquiry details are kept for as long as needed to respond to Your request and manage related follow-up. Records processed through hospital, laboratory or college software are retained according to the institution\u2019s configuration, applicable law and any written customer agreement. We do not apply a single retention period to every category of information.",
        "We retain personal, healthcare, academic, and institutional information only for as long as necessary:"
      ],
      bullets: [
        "To provide Services",
        "To comply with legal obligations",
        "To maintain healthcare and academic records",
        "To resolve disputes",
        "To enforce agreements"
      ],
      subsections: [
        {
          title: "Regulated records",
          paragraphs: [
            "Certain healthcare and institutional records may be retained in accordance with applicable regulations and industry standards."
          ]
        }
      ]
    },
    {
      title: "10. Your Rights",
      paragraphs: ["Users may:"],
      bullets: [
        "Access their information",
        "Request correction of inaccurate information",
        "Request deletion, subject to regulatory requirements",
        "Withdraw consent where applicable",
        "Request limitation of processing",
        "Contact Us regarding privacy concerns"
      ],
      subsections: [
        {
          title: "Academic and institutional records",
          paragraphs: [
            "Students, faculty members, institutional administrators, and authorized academic personnel may request access, correction, or updates to academic and institutional records subject to institutional policies and applicable laws and regulations.",
            "Requests may be submitted through the contact information provided below."
          ]
        }
      ]
    },
    {
      title: "11. Third-Party Services",
      paragraphs: [
        "The Platform may integrate with third-party healthcare systems, payment gateways, cloud providers, analytics tools, APIs, university software systems, or institutional platforms.",
        "IQ-Line is not responsible for the privacy practices of third-party platforms and encourages You to review their respective privacy policies."
      ]
    },
    {
      title: "12. Children's Privacy",
      paragraphs: [
        "IQ-Line's Services are not intended for individuals below the age permitted under applicable laws without parental or guardian supervision."
      ]
    },
    {
      title: "13. Changes to This Privacy Policy",
      paragraphs: [
        "IQ-Line reserves the right to update or modify this Privacy Policy at any time.",
        "Updated versions will be published on the Platform with the revised effective date.",
        "Continued use of the Platform after updates constitutes acceptance of the revised Privacy Policy."
      ]
    },
    {
      title: "14. Contact Us",
      paragraphs: [
        "For questions about this Privacy Policy or to submit a privacy request, email info@iqline.co.in or write to:",
        "IQ-Line Private Limited",
        `Email: ${contactEmail}`
      ]
    },
    {
      title: "15. Grievance Officer",
      paragraphs: [
        "In accordance with applicable laws and regulations, grievances regarding privacy or data protection may be addressed to:",
        "IQ-Line Private Limited",
        `Email: ${contactEmail}`,
        `In case You have any questions, comments, or concerns about this Privacy Policy or wish to exercise any of the above-mentioned rights, You can contact Us at ${contactEmail}.`
      ]
    }
  ]
};
const termsAndConditions = {
  title: "Terms of Service",
  badge: "Terms",
  path: "/terms-and-conditions",
  description: "Terms governing access to and use of IQ-Line's website, software platforms, healthcare digitization tools, and related services.",
  sections: [
    {
      title: "IQ-Line Private Limited",
      paragraphs: [
        "Welcome to IQ-Line.",
        'These Terms of Service ("Terms") govern Your access to and use of the website, software platforms, healthcare digitization tools, Prescription OCR services, Hospital Information Management Systems (HIMS), MEDU Campus (IQ-Line\u2019s medical college student management platform), applications, APIs, and related services ("Services") operated by IQ-Line Private Limited ("IQ-Line", "Company", "We", "Us", or "Our"). In these Terms, "We", "Us" and "Our" mean IQ-Line. "You" and "Your" mean the person or organisation using the website or Services.',
        'By accessing, registering, or using the Platform, You ("User") agree to comply with and be legally bound by these Terms and Our Privacy Policy.',
        "If You do not agree with these Terms, You must discontinue use of the Platform immediately."
      ]
    },
    {
      title: "1. Eligibility",
      paragraphs: ["By using the Platform, You represent and warrant that:"],
      bullets: [
        "You are legally capable of entering into binding agreements.",
        "You are authorized to represent the healthcare institution, clinic, pharmacy, laboratory, university, or organization, if applicable.",
        "All information provided by You is accurate and complete.",
        "Your use of the Platform complies with all applicable laws and regulations."
      ]
    },
    {
      title: "2. Services Provided",
      paragraphs: [
        "IQ-Line provides technology solutions including but not limited to:"
      ],
      bullets: [
        "Prescription OCR & digitization",
        "Hospital Information Management Systems (HIMS)",
        "MEDU Campus",
        "Patient data management systems",
        "Academic and institutional workflow management",
        "Healthcare workflow automation",
        "Clinical competency tracking systems",
        "Digital logbooks and attendance systems",
        "Analytics and reporting dashboards",
        "Appointment and healthcare record management",
        "Faculty-student engagement tools",
        "API and software integrations"
      ],
      subsections: [
        {
          title: "Service changes",
          paragraphs: [
            "IQ-Line reserves the right to modify, suspend, or discontinue any Services at any time without prior notice, except where a written customer agreement provides otherwise. Service commitments, data availability and support arrangements in a signed customer agreement take precedence for that customer."
          ]
        }
      ]
    },
    {
      title: "3. User Responsibilities",
      paragraphs: ["By using the Platform, You agree:"],
      bullets: [
        "To provide accurate and lawful information.",
        "Not to misuse the Platform or Services.",
        "Not to upload false, misleading, harmful, or unlawful content.",
        "Not to attempt unauthorized access to systems or data.",
        "Not to interfere with Platform functionality or security.",
        "To maintain confidentiality of login credentials.",
        "To comply with healthcare regulations, educational compliance requirements, and applicable data protection laws."
      ],
      subsections: [
        {
          title: "Account activity",
          paragraphs: [
            "Users are solely responsible for all activities conducted through their accounts."
          ]
        }
      ]
    },
    {
      title: "4. Prescription OCR Services",
      paragraphs: [
        "IQ-Line's OCR technology is designed to assist healthcare providers in digitizing prescriptions and medical documents.",
        "You acknowledge and agree that:"
      ],
      bullets: [
        "OCR outputs may require manual verification.",
        "IQ-Line does not independently diagnose, prescribe, or alter medical advice.",
        "Healthcare professionals remain solely responsible for validating prescriptions and clinical decisions.",
        "IQ-Line acts as a technology facilitator and workflow support platform."
      ],
      subsections: [
        {
          title: "Professional judgment",
          paragraphs: [
            "The Platform should not be used as a substitute for professional medical judgment."
          ]
        }
      ]
    },
    {
      title: "5. MEDU Campus",
      paragraphs: [
        "MEDU Campus is designed to help medical colleges, universities, teaching hospitals, and academic institutions manage academic and clinical records.",
        "MEDU Campus may include the following, according to the functions configured for the institution:"
      ],
      bullets: [
        "Student lifecycle management",
        "Attendance and assessment tracking, including facial biometric attendance only if that function is enabled",
        "Digital logbooks",
        "Competency tracking systems",
        "Clinical postings and ward duty management",
        "Faculty evaluation systems",
        "Academic analytics and reporting",
        "Support for institutional academic and competency records",
        "Faculty-student collaboration tools"
      ],
      subsections: [
        {
          title: "Institutional responsibility",
          paragraphs: [
            "Institutions using the MEDU Campus platform are responsible for ensuring the accuracy, legality, and validity of academic and institutional records uploaded or processed through the Platform."
          ]
        }
      ]
    },
    {
      title: "6. Healthcare Data & Compliance",
      paragraphs: [
        "Users acknowledge that healthcare, academic, and institutional data may include sensitive personal information and agree to use the Platform responsibly and lawfully.",
        "Healthcare institutions, universities, and professionals using the Platform are responsible for:"
      ],
      bullets: [
        "Obtaining required consents.",
        "Maintaining compliance with applicable laws and regulations.",
        "Ensuring lawful processing of medical and institutional information.",
        "Verifying the accuracy of records, prescriptions, assessments, and data uploads."
      ]
    },
    {
      title: "7. Account Security",
      paragraphs: ["Users are responsible for:"],
      bullets: [
        "Safeguarding account credentials.",
        "Restricting unauthorized access.",
        "Immediately notifying IQ-Line of any suspected security breach."
      ],
      subsections: [
        {
          title: "Unauthorized use",
          paragraphs: [
            "IQ-Line shall not be liable for losses resulting from unauthorized use of User accounts."
          ]
        }
      ]
    },
    {
      title: "8. Intellectual Property",
      paragraphs: [
        "All intellectual property rights related to the Platform, including but not limited to the following, shall remain the exclusive property of IQ-Line or its licensors:"
      ],
      bullets: [
        "Software",
        "Technology",
        "Designs",
        "Trademarks",
        "Logos",
        "Databases",
        "Content",
        "OCR systems",
        "MEDU Campus systems",
        "Analytics systems",
        "UI/UX elements"
      ],
      subsections: [
        {
          title: "Restrictions",
          paragraphs: ["Users may not:"],
          bullets: [
            "Copy",
            "Reproduce",
            "Modify",
            "Reverse engineer",
            "Distribute",
            "Sell",
            "Commercially exploit any part of the Platform without prior written permission."
          ]
        }
      ]
    },
    {
      title: "9. Third-Party Services",
      paragraphs: [
        "The Platform may integrate with third-party software, APIs, cloud services, payment gateways, analytics tools, university systems, or healthcare systems.",
        "IQ-Line is not responsible for:"
      ],
      bullets: [
        "Third-party services",
        "Availability",
        "Security",
        "Accuracy",
        "Policies",
        "Downtime associated with such integrations"
      ],
      subsections: [
        {
          title: "Third-party terms",
          paragraphs: [
            "Use of third-party services is subject to their respective terms and policies."
          ]
        }
      ]
    },
    {
      title: "10. Limitation of Liability",
      paragraphs: [
        "To the maximum extent permitted by law, IQ-Line shall not be liable for:"
      ],
      bullets: [
        "Medical decisions made using the Platform.",
        "Incorrect interpretation of OCR outputs.",
        "Academic or institutional decisions made using analytics or reports.",
        "Loss of data.",
        "Business interruption.",
        "Indirect or consequential damages.",
        "System downtime.",
        "Unauthorized access caused beyond reasonable control."
      ],
      subsections: [
        {
          title: "Service basis",
          paragraphs: [
            "The Platform is provided on an as is and as available basis without warranties of any kind."
          ]
        }
      ]
    },
    {
      title: "11. Disclaimer",
      paragraphs: [
        "IQ-Line does not provide medical advice, diagnosis, or treatment.",
        "The Platform is intended solely to support healthcare operations, workflow digitization, institutional management, and record management.",
        "Healthcare professionals, faculty members, and institutions are solely responsible for all medical judgments, diagnoses, prescriptions, academic decisions, assessments, and compliance obligations."
      ]
    },
    {
      title: "12. Termination",
      paragraphs: ["IQ-Line reserves the right to:"],
      bullets: [
        "Suspend or terminate accounts.",
        "Restrict access.",
        "Remove content.",
        "Discontinue Services."
      ],
      subsections: [
        {
          title: "Grounds for action",
          paragraphs: [
            "IQ-Line may take these actions without prior notice if Users violate these Terms or applicable laws.",
            "Users may discontinue use of the Platform at any time."
          ]
        }
      ]
    },
    {
      title: "13. Confidentiality",
      paragraphs: [
        "Users agree to maintain confidentiality of all proprietary, healthcare, academic, and institutional information obtained through the Platform.",
        "Users shall not disclose, distribute, or misuse any confidential information without prior written approval."
      ]
    },
    {
      title: "14. Indemnification",
      paragraphs: [
        "You agree to indemnify and hold harmless IQ-Line, its directors, employees, affiliates, and partners from any claims, damages, liabilities, losses, or expenses arising from:"
      ],
      bullets: [
        "Your misuse of the Platform.",
        "Violation of these Terms.",
        "Breach of applicable laws.",
        "Infringement of third-party rights."
      ]
    },
    {
      title: "15. Changes to Terms",
      paragraphs: [
        "IQ-Line reserves the right to update or revise these Terms at any time.",
        "Continued use of the Platform after modifications constitutes acceptance of the revised Terms.",
        "Users are encouraged to review these Terms periodically."
      ]
    },
    {
      title: "16. Governing Law & Jurisdiction",
      paragraphs: [
        "These Terms shall be governed by and interpreted in accordance with the laws of India.",
        "Any disputes arising out of or relating to these Terms shall be subject to the exclusive jurisdiction of the courts located in Lucknow, India."
      ]
    },
    {
      title: "17. Contact Us",
      paragraphs: [
        "For questions about these Terms of Service, email info@iqline.co.in or write to:",
        "IQ-Line Private Limited",
        `Email: ${contactEmail}`
      ]
    }
  ]
};
const documents = {
  privacy: privacyPolicy,
  terms: termsAndConditions
};
function LegalDocumentPage({ document }) {
  return <div className="flex min-h-svh flex-col">
      
      <SiteHeader />

      <main className="flex-1 overflow-x-hidden">
        <PageHeroShell>
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
              <Badge className="mb-4 border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-teal-300 hover:bg-teal-500/15">
                {document.badge}
              </Badge>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {document.title}
              </h1>
              <p className="mt-4 max-w-3xl text-lg text-pretty text-slate-400">
                {document.description}
              </p>
              <p className="mt-5 text-sm font-medium text-slate-300">
                Last updated: {lastUpdated}
              </p>
            </motion.div>
          </div>
        </PageHeroShell>

        <section className="py-14 sm:py-18">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm backdrop-blur sm:p-8 lg:p-10">
              <div className="space-y-10">
                {document.sections.map((section, index) => <section key={section.title} className="scroll-mt-24">
                    {index > 0 ? <Separator className="mb-8" /> : null}
                    <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
                      {section.title}
                    </h2>
                    {section.paragraphs?.map((paragraph) => <p
    key={paragraph}
    className="mt-4 text-base leading-7 text-muted-foreground"
  >
                        {paragraph}
                      </p>)}
                    {section.bullets ? <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-7 text-muted-foreground">
                        {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                      </ul> : null}
                    {section.subsections?.map((subsection) => <div key={subsection.title} className="mt-6">
                        <h3 className="text-lg font-semibold text-foreground">
                          {subsection.title}
                        </h3>
                        {subsection.paragraphs?.map((paragraph) => <p
    key={paragraph}
    className="mt-3 text-base leading-7 text-muted-foreground"
  >
                            {paragraph}
                          </p>)}
                        {subsection.bullets ? <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-7 text-muted-foreground">
                            {subsection.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                          </ul> : null}
                      </div>)}
                  </section>)}
              </div>

              <div className="mt-10 rounded-2xl border border-border/70 bg-muted/40 p-5 text-sm leading-6 text-muted-foreground">
                <p>
                  {document.path === "/privacy-policy" ? "For questions about this Privacy Policy or to submit a privacy request, email " : "For questions about these Terms of Service, email "}
                  <a
    href={`mailto:${contactEmail}`}
    className="font-medium text-primary underline-offset-4 hover:underline"
  >
                    {contactEmail}
                  </a>
                  .
                </p>
                {document.path === "/terms-and-conditions" ? <p className="mt-3">
                    You can also review Our{" "}
                    <Link
    href="/privacy-policy"
    className="font-medium text-primary underline-offset-4 hover:underline"
  >
                      Privacy Policy
                    </Link>
                    .
                  </p> : <p className="mt-3">
                    You can also review Our{" "}
                    <Link
    href="/terms-and-conditions"
    className="font-medium text-primary underline-offset-4 hover:underline"
  >
                      Terms of Service
                    </Link>
                    .
                  </p>}
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>;
}
function PrivacyPolicyPage() {
  return <LegalDocumentPage document={documents.privacy} />;
}
function TermsAndConditionsPage() {
  return <LegalDocumentPage document={documents.terms} />;
}
export {
  PrivacyPolicyPage,
  TermsAndConditionsPage
};
