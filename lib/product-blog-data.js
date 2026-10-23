const productBlogPosts = [
  // ── LIMS ──────────────────────────────────────────────────────────────────
  {
    slug: "lims-zero-error-lab-barcode-workflows",
    productId: "lims",
    title: "Tracking a laboratory sample from collection to report",
    excerpt: "A barcode is useful when it connects a sample to a clear record of what happened next. It helps laboratory teams identify the sample and follow its progress through the configured workflow.",
    author: "IQ-Line Lab Team",
    authorRole: "Product Engineering, LIMS",
    publishedAt: "2026-03-10",
    readingTime: 3,
    tags: ["LabSaarthi", "Sample tracking", "Laboratory workflows"],
    body: `
A barcode is useful when it connects a sample to a clear record of what happened next. It helps laboratory teams identify the sample and follow its progress through the configured workflow.

LabSaarthi supports barcode-based sample tracking. Before implementation, identify the points at which your team needs to record a handover, from receipt and processing to review and report release. Agree how rejected samples, repeat tests and missed scans will be handled.

For supported analysers, an integration can reduce manual result entry. The laboratory still needs a defined process for checking results, handling exceptions and authorising reports.

Quality control records and calibration logs also need a clear owner and review process. Software can help organise these records; the team\u2019s procedures determine how they are maintained and used.

[Ask for a LabSaarthi walkthrough using your sample journey and analyser requirements.](/contact-us?product=lims)
    `.trim()
  },
  // ── HIMS ──────────────────────────────────────────────────────────────────
  {
    slug: "hims-reducing-patient-wait-times-digital-opd",
    productId: "hims",
    title: "Reducing repeated work at the OPD registration desk",
    excerpt: "Registration delays can have several causes: patient volumes, staffing, repeated data entry and the way patients are directed to departments. Reviewing these steps helps a hospital decide where software can be useful.",
    author: "IQ-Line Clinical Team",
    authorRole: "Product Engineering, HIMS",
    publishedAt: "2026-03-18",
    readingTime: 3,
    tags: ["HospitalSaarthi", "OPD", "Registration"],
    body: `
Registration delays can have several causes: patient volumes, staffing, repeated data entry and the way patients are directed to departments. Reviewing these steps helps a hospital decide where software can be useful.

HospitalSaarthi connects registration with patient records and other hospital workflows. In a demonstration, follow both a first-time visit and a returning patient\u2019s visit. Check how staff find an existing record, correct details and direct the patient to the next step.

Then review the handover to consultation, diagnostics, pharmacy and billing. Confirm which information moves between systems and where staff must review or approve it.

Measure registration time separately from queue waiting time and total visit time. This makes any comparison meaningful and avoids attributing every change in patient flow to the software.

[Book a HospitalSaarthi demo around your OPD process.](/contact-us?product=hims)
    `.trim()
  },
  // ── MEDU Campus ───────────────────────────────────────────────────────────
  {
    slug: "meducampus-cbme-compliance-digital-logbooks",
    productId: "meducampus",
    title: "Making clinical logbooks easier for students and faculty to review",
    excerpt: "Clinical learning records are useful when students can keep them up to date and faculty can review them in context. A digital logbook gives both groups a shared place to work with those records.",
    author: "IQ-Line EdTech Team",
    authorRole: "Product Engineering, MEDU Campus",
    publishedAt: "2026-03-22",
    readingTime: 3,
    tags: ["MEDU Campus", "Clinical logbooks", "Medical education"],
    body: `
Clinical learning records are useful when students can keep them up to date and faculty can review them in context. A digital logbook gives both groups a shared place to work with those records.

MEDU Campus supports clinical logbooks and competency tracking alongside academic administration. During setup, agree which activities students should record, what faculty need to review and how progress will be reported.

Clear responsibilities matter as much as the format. Decide who can correct an entry, how a review is recorded and how incomplete submissions are followed up. Confirm the actual controls available in the product.

A demonstration should include a student recording an activity and a faculty member reviewing it. Ask to see how the resulting information appears in student and cohort reports.

[Explore MEDU Campus for your college\u2019s academic and clinical learning workflows.](/contact-us?product=meducampus)
    `.trim()
  },
  // ── EPRESCRIPTION ─────────────────────────────────────────────────────────
  {
    slug: "eprescription-ai-handwriting-recognition-ocr",
    productId: "eprescription",
    title: "What to check when evaluating prescription recognition",
    excerpt: "Handwritten prescriptions vary in layout, image quality and the way medicines and instructions are written. A useful product evaluation should include examples representative of the hospital\u2019s daily work.",
    author: "IQ-Line AI Team",
    authorRole: "Product Engineering, Smart Parcha",
    publishedAt: "2026-03-25",
    readingTime: 3,
    tags: ["Smart Parcha", "Prescription digitisation", "AI"],
    body: `
Handwritten prescriptions vary in layout, image quality and the way medicines and instructions are written. A useful product evaluation should include examples representative of the hospital\u2019s daily work.

Smart Parcha uses AI-assisted recognition to turn handwritten prescriptions into structured digital records. Review the output field by field, especially medicine names, dosage and instructions. Establish who will verify the information before it is used in the next workflow.

Ask how corrections are made, whether the source prescription remains available and how the process handles information that cannot be read reliably. Check which controls are available in the proposed configuration.

Evaluate the complete task, including capture, checking and correction, rather than processing speed alone. Record the sample size, testing conditions and the definitions used for any accuracy result.

[Book a Smart Parcha demonstration to review the workflow with your team.](/contact-us?product=eprescription)
    `.trim()
  },
  // ── RIMS ──────────────────────────────────────────────────────────────────
  {
    slug: "rims-radiology-workflow-digital-transformation",
    productId: "rims",
    title: "Connecting imaging requests with radiology reports",
    excerpt: "A radiology workflow depends on how requests, images and reports move between teams. Reviewing those connections is a useful starting point for digitisation.",
    author: "IQ-Line Radiology Team",
    authorRole: "Product Engineering, Paxoris",
    publishedAt: "2026-04-01",
    readingTime: 4,
    tags: ["Paxoris", "Radiology", "Imaging workflows"],
    body: `
An imaging request passes through several stages before a report reaches the referring clinician. When those stages use separate systems, teams may need to search for studies or repeat information during handovers.

Paxoris supports image access and radiology workflow management. Before implementation, map how requests are received, how studies are associated with the right patient and how completed reports are delivered.

Confirm the equipment and systems that need to connect. Review supported modalities, the reporting workstation requirements and how access will work for authorised radiologists at other locations.

During a demonstration, follow a request through to the completed report. Include a case that needs correction or further review, so the team can see how exceptions are managed.

If AI-assisted functions are part of the proposal, evaluate each function separately. Ask what it is intended to do, how its output is reviewed and what evidence supports any performance claim.

[Book a Paxoris walkthrough around your imaging and reporting process.](/contact-us?product=rims)
    `.trim()
  }
];
function getProductBlogPosts(productId) {
  return productBlogPosts.filter((p) => p.productId === productId);
}
function getProductBlogPostBySlug(productId, slug) {
  return productBlogPosts.find(
    (p) => p.productId === productId && p.slug === slug
  );
}
export {
  getProductBlogPostBySlug,
  getProductBlogPosts,
  productBlogPosts
};
