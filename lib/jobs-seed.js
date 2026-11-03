import { careerOpenings } from "@/lib/career-openings"

const SEED_META = [
  { id: "job-business-analyst", createdAt: "2026-08-12" },
  { id: "job-senior-engineer", createdAt: "2026-09-02" },
  { id: "job-senior-ba", createdAt: "2026-09-18" },
]

function withDefaults(opening) {
  return {
    title: opening.title,
    team: opening.team,
    location: opening.location,
    workMode: opening.workMode ?? "",
    employmentType: opening.employmentType,
    experience: opening.experience,
    travel: opening.travel ?? "",
    summary: opening.summary ?? [],
    responsibilities: opening.responsibilities ?? [],
    skills: opening.skills ?? [],
    preferred: opening.preferred ?? [],
    competencies: opening.competencies ?? [],
    ideal: opening.ideal ?? [],
    offer: opening.offer ?? [],
    applyUrl: opening.applyUrl ?? "",
  }
}

export function seedJobs() {
  const applyUrl = careerOpenings[0]?.applyUrl ?? ""
  return [
    ...careerOpenings.map((opening, index) => ({
      ...withDefaults(opening),
      id: SEED_META[index]?.id ?? `job-opening-${index + 1}`,
      status: "Active",
      createdAt: SEED_META[index]?.createdAt ?? "2026-08-01",
    })),
    {
      id: "job-hr-coordinator",
      title: "HR Coordinator",
      team: "People",
      location: "Noida",
      workMode: "",
      employmentType: "Full-time",
      experience: "1–3 years",
      travel: "",
      summary: ["Coordinate hiring operations, interview schedules, and offer paperwork for open roles."],
      responsibilities: [
        "Schedule interviews and keep candidates updated.",
        "Prepare offer paperwork with the hiring manager.",
      ],
      skills: ["Experience coordinating hiring for a growing team."],
      preferred: [],
      competencies: ["Organisation", "Clear communication"],
      ideal: [],
      offer: [],
      applyUrl,
      status: "Inactive",
      createdAt: "2026-07-01",
    },
  ]
}
