import {
  Building2Icon,
  FileTextIcon,
  GraduationCapIcon,
  MicroscopeIcon,
  ScanLineIcon
} from "lucide-react";
const ABDM_COMPANY_CERT_URL = "https://abdm.gov.in/strapicms/uploads/IQ_Line_Private_Limited_certi_9feb303f7e.pdf";
function getAbdmCertUrl(product) {
  if (!product.badge.toLowerCase().includes("abdm")) return null;
  return product.abdmCertUrl ?? ABDM_COMPANY_CERT_URL;
}
const products = [
  {
    id: "lims",
    title: "LabSaarthi",
    fullTitle: "Laboratory information management system",
    seoTitle: "LabSaarthi Laboratory Management Software | IQ-Line",
    badge: "ABDM-compliant",
    abdmCertUrl: "https://abdm.gov.in/strapicms/uploads/IQ_line_certi_0a036104c0.pdf",
    tagline: "Track samples, connect supported analysers and manage reports from registration to release.",
    description: "LabSaarthi is a laboratory information management system for diagnostic centres and laboratory networks. It brings registration, sample tracking, analyser integration, result review and reporting into one workflow, helping teams follow each sample and reduce repeated manual entry.",
    icon: MicroscopeIcon,
    gradient: "from-teal-600 via-teal-500 to-cyan-500",
    accentColor: "oklch(0.5 0.15 195)",
    textAccent: "text-teal-500",
    bgAccent: "bg-teal-500/10",
    brochureLink: "https://brochure.iqline.co.in/LabSaarthi.html",
    videoUrl: "/productsvideos/LIMSDEMO.mp4",
    features: [
      {
        title: "Sample tracking",
        body: "Use barcodes to follow samples through collection, processing and reporting."
      },
      {
        title: "Report preparation",
        body: "Create reports in configured formats once results have been reviewed and authorised."
      },
      {
        title: "Configurable review rules",
        body: "Set rules to flag results that need attention and support your laboratory\u2019s validation process."
      },
      {
        title: "Analyser integration",
        body: "Bring results from supported analysers into LabSaarthi to reduce manual transcription."
      },
      {
        title: "Quality control records",
        body: "Maintain quality control data, calibration records and Levey-Jennings charts for review."
      },
      {
        title: "Reagent inventory",
        body: "Track stock and expiry dates, use first-expiry-first-out logic and set alerts for low stock."
      }
    ],
    challengesTitle: "Where LabSaarthi helps",
    challenges: [
      {
        title: "Sample handovers",
        body: "Give staff a record of where a sample is in the workflow."
      },
      {
        title: "Report preparation",
        body: "Reduce repeated entry and manual formatting."
      },
      {
        title: "Quality reviews",
        body: "Keep quality control and calibration records organised."
      },
      {
        title: "Reagent planning",
        body: "Make stock levels and approaching expiry dates easier to monitor."
      }
    ],
    ctaDescription: "Tell us about your sample volumes, analysers and reporting process."
  },
  {
    id: "hims",
    title: "HospitalSaarthi",
    fullTitle: "Hospital information management system",
    seoTitle: "HospitalSaarthi Hospital Management Software | IQ-Line",
    badge: "ABDM Compliant",
    tagline: "Bring registration, patient records, pharmacy and billing into one connected workflow.",
    description: "HospitalSaarthi brings registration, outpatient and inpatient workflows, patient records, diagnostics, pharmacy and billing into one system. It helps hospital teams access the information they need across departments and reduce repeated data entry.",
    icon: Building2Icon,
    gradient: "from-blue-600 via-blue-500 to-indigo-500",
    accentColor: "oklch(0.5 0.15 235)",
    textAccent: "text-blue-500",
    bgAccent: "bg-blue-500/10",
    brochureLink: "https://brochure.iqline.co.in/HospitalSaarthi.html",
    videoUrl: "/productsvideos/HospitalSaarthi.mp4",
    features: [
      {
        title: "Electronic patient records",
        body: "Keep visit details and clinical records together so authorised teams can refer to a patient\u2019s history."
      },
      {
        title: "Registration to discharge",
        body: "Manage appointments, registration, admissions and discharge through linked workflows."
      },
      {
        title: "Prescription digitisation",
        body: "Connect with Smart Parcha to convert handwritten prescriptions into digital records for verification."
      },
      {
        title: "Pharmacy workflows",
        body: "Connect prescription and stock information to support dispensing and inventory management."
      },
      {
        title: "Diagnostic orders and results",
        body: "Send requests and access results through configured laboratory and radiology integrations."
      },
      {
        title: "Billing and charge capture",
        body: "Record charges from configured workflows and give billing teams a clearer view of services provided."
      }
    ],
    challengesTitle: "Where HospitalSaarthi helps",
    challenges: [
      {
        title: "Registration",
        body: "Reduce repeated entry when recording patient details."
      },
      {
        title: "Department handovers",
        body: "Make orders and results easier for authorised teams to find."
      },
      {
        title: "Clinical documentation",
        body: "Support prescription digitisation alongside existing consultation routines."
      },
      {
        title: "Administration",
        body: "Bring operational records and billing information into a clearer workflow."
      }
    ],
    ctaDescription: "Walk us through your registration, clinical and administrative requirements."
  },
  {
    id: "meducampus",
    title: "MEDUCampus",
    fullTitle: "Student management software for medical colleges",
    seoTitle: "MEDU Campus Medical College Software | IQ-Line",
    badge: "Education",
    tagline: "Manage admissions, attendance, assessments, clinical postings and digital logbooks.",
    description: "MEDU Campus helps medical colleges manage admissions, attendance, assessments, clinical postings and digital logbooks. Faculty and administrators can follow student progress and organise the records used for academic and competency reviews.",
    icon: GraduationCapIcon,
    gradient: "from-violet-600 via-purple-500 to-fuchsia-500",
    accentColor: "oklch(0.5 0.18 280)",
    textAccent: "text-violet-500",
    bgAccent: "bg-violet-500/10",
    brochureLink: "https://brochure.iqline.co.in/MeduCampus.html",
    videoUrl: "/productsvideos/meducampus-mums-walkthrough_2026-08-21_19-36-55.mp4",
    features: [
      {
        title: "Admissions and student records",
        body: "Manage student registration, documents and fee records in one place."
      },
      {
        title: "Academic scheduling",
        body: "Plan classes, faculty allocations and clinical postings."
      },
      {
        title: "Attendance tracking",
        body: "Maintain attendance records for academic sessions and clinical postings."
      },
      {
        title: "Assessments and results",
        body: "Organise examination schedules, assessments and published results."
      },
      {
        title: "Competency tracking",
        body: "Record assessments and follow student progress against the institution\u2019s configured competencies."
      },
      {
        title: "Digital clinical logbooks",
        body: "Let students record clinical activities and give faculty a way to review their learning records."
      }
    ],
    challengesTitle: "Where MEDU Campus helps",
    challenges: [
      {
        title: "Student records",
        body: "Bring academic and administrative information together."
      },
      {
        title: "Clinical learning",
        body: "Make logbooks and posting records easier to review."
      },
      {
        title: "Faculty oversight",
        body: "Show recorded progress and activities that need attention."
      },
      {
        title: "Reporting",
        body: "Organise information for internal reviews and institutional reporting."
      }
    ],
    ctaDescription: "Explore the workflows your faculty and administration need to manage."
  },
  {
    id: "eprescription",
    title: "SmartParcha",
    fullTitle: "AI-assisted prescription digitisation",
    seoTitle: "Smart Parcha Prescription Digitisation | IQ-Line",
    badge: "AI",
    tagline: "Convert handwritten prescriptions into structured digital records for review and use across connected departments.",
    description: "Smart Parcha uses AI-assisted handwriting recognition to convert prescriptions into structured digital records. It supports a pen-based consultation workflow while helping hospital teams use prescription information across connected systems. Recognised details should be checked before they are used for orders, dispensing or clinical decisions.",
    icon: FileTextIcon,
    gradient: "from-emerald-600 via-green-500 to-teal-500",
    accentColor: "oklch(0.5 0.15 155)",
    textAccent: "text-emerald-500",
    bgAccent: "bg-emerald-500/10",
    brochureLink: "https://brochure.iqline.co.in/SmartParcha.html",
    videoUrl: "/productsvideos/smartparcha-product-demo-final.mp4",
    features: [
      {
        title: "Handwriting recognition",
        body: "Extract text from prescription images using AI-assisted recognition."
      },
      {
        title: "Structured prescription details",
        body: "Organise recognised information into fields such as medicines, dosage and instructions for verification."
      },
      {
        title: "Digital prescription records",
        body: "Convert recognised text into a readable record that can be searched and referred to later."
      },
      {
        title: "Connected department workflows",
        body: "Use verified prescription details in connected laboratory, pharmacy and radiology workflows, according to the configured process."
      },
      {
        title: "System integration",
        body: "Connect prescription records with supported hospital and diagnostic systems."
      }
    ],
    challengesTitle: "Where Smart Parcha helps",
    challenges: [
      {
        title: "Repeated transcription",
        body: "Reduce the need to enter the same prescription details in several systems."
      },
      {
        title: "Record access",
        body: "Make digitised prescriptions easier to retrieve."
      },
      {
        title: "Department handovers",
        body: "Share verified information through connected workflows."
      },
      {
        title: "Consultation routines",
        body: "Support doctors who continue to write prescriptions by hand."
      }
    ],
    ctaDescription: "Follow a prescription from capture to review and onward use in connected workflows."
  },
  {
    id: "rims",
    title: "Paxoris",
    fullTitle: "Radiology information and image management",
    seoTitle: "Paxoris Radiology Software | IQ-Line",
    badge: "RIS / PACS",
    tagline: "Manage imaging requests, access scans and organise reporting across connected facilities.",
    description: "Paxoris supports radiology workflows from imaging requests to report delivery. It brings image access, reporting and departmental coordination together, with options for connected facilities and remote reporting.",
    icon: ScanLineIcon,
    gradient: "from-amber-500 via-orange-500 to-yellow-500",
    accentColor: "oklch(0.65 0.17 80)",
    textAccent: "text-amber-500",
    bgAccent: "bg-amber-500/10",
    brochureLink: "https://brochure.iqline.co.in/Paxoris.html",
    videoUrl: "/productsvideos/paxoris-product-walkthrough-sdr-audio.mp4",
    features: [
      {
        title: "Image storage and access",
        body: "Store and retrieve imaging studies through the supported archive and PACS setup."
      },
      {
        title: "Reporting tools",
        body: "Use configured templates to prepare structured reports."
      },
      {
        title: "Remote reporting",
        body: "Support authorised radiologists reporting across connected locations."
      },
      {
        title: "Radiology workflow management",
        body: "Follow imaging requests through the configured scheduling, reporting and delivery process."
      },
      {
        title: "Access for authorised teams",
        body: "View images and reports through supported devices and access arrangements."
      },
      {
        title: "Operational dashboards",
        body: "Monitor scan volumes and reporting timelines across connected facilities."
      }
    ],
    challengesTitle: "Where Paxoris helps",
    challenges: [
      {
        title: "Image retrieval",
        body: "Make stored studies easier to locate."
      },
      {
        title: "Reporting coordination",
        body: "Give teams a view of work awaiting reporting."
      },
      {
        title: "Multiple locations",
        body: "Support image and report access across connected facilities."
      },
      {
        title: "Department handovers",
        body: "Make completed reports available through configured integrations."
      }
    ],
    ctaDescription: "Tell us about your imaging equipment, reporting workflow and connected locations."
  }
];
function getProductById(id) {
  return products.find((p) => p.id === id);
}
export {
  ABDM_COMPANY_CERT_URL,
  getAbdmCertUrl,
  getProductById,
  products
};
