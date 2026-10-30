import { careerOpenings } from "@/lib/career-openings"

/** Browser-only sample jobs. The public careers page does not read this file. */
export const HQ_JOBS_STORAGE_KEY = "iqline-hq-jobs-v2"

export const EMPLOYMENT_TYPES = ["Full-time", "Part-time", "Contract", "Internship"]

export const JOB_STATUSES = ["Active", "Inactive"]

export const DEFAULT_APPLY_URL = careerOpenings[0]?.applyUrl ?? ""

const SEED_META = [
  { id: "job-business-analyst", createdAt: "2026-08-12" },
  { id: "job-senior-engineer", createdAt: "2026-09-02" },
  { id: "job-senior-ba", createdAt: "2026-09-18" },
]

export const SEED_JOBS = [
  ...careerOpenings.map((opening, index) => ({
    ...opening,
    id: SEED_META[index]?.id ?? `job-opening-${index + 1}`,
    status: "Active",
    createdAt: SEED_META[index]?.createdAt ?? "2026-08-01",
  })),
  {
    id: "job-hr-coordinator",
    title: "HR Coordinator",
    team: "People",
    location: "Noida",
    employmentType: "Full-time",
    experience: "1–3 years",
    summary: [
      "Coordinate hiring operations, interview schedules, and offer paperwork for open roles.",
    ],
    responsibilities: [
      "Schedule interviews and keep candidates updated.",
      "Prepare offer paperwork with the hiring manager.",
    ],
    skills: ["Experience coordinating hiring for a growing team."],
    preferred: [],
    competencies: ["Organisation", "Clear communication"],
    applyUrl: DEFAULT_APPLY_URL,
    status: "Inactive",
    createdAt: "2026-07-01",
  },
]

export function formatJobDate(value) {
  if (!value) return "—"
  const [year, month, day] = value.split("-").map(Number)
  if (!year || !month || !day) return value
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(year, month - 1, day))
}

export function linesToList(text) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
}

export function listToLines(list) {
  return (list ?? []).join("\n")
}

function todayStamp() {
  const today = new Date()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")
  return `${today.getFullYear()}-${month}-${day}`
}

export function emptyJobForm() {
  return {
    title: "",
    team: "",
    location: "",
    workMode: "",
    employmentType: "Full-time",
    experience: "",
    travel: "",
    summary: "",
    responsibilities: "",
    skills: "",
    preferred: "",
    competencies: "",
    ideal: "",
    offer: "",
    applyUrl: "",
    status: "Active",
    createdAt: todayStamp(),
  }
}

export function jobToForm(job) {
  return {
    title: job.title ?? "",
    team: job.team ?? "",
    location: job.location ?? "",
    workMode: job.workMode ?? "",
    employmentType: job.employmentType ?? "Full-time",
    experience: job.experience ?? "",
    travel: job.travel ?? "",
    summary: listToLines(job.summary),
    responsibilities: listToLines(job.responsibilities),
    skills: listToLines(job.skills),
    preferred: listToLines(job.preferred),
    competencies: listToLines(job.competencies),
    ideal: listToLines(job.ideal),
    offer: listToLines(job.offer),
    applyUrl: job.applyUrl ?? "",
    status: job.status ?? "Active",
    createdAt: job.createdAt ?? todayStamp(),
  }
}

export function validateJobForm(values) {
  const errors = {}
  if (!values.title.trim()) errors.title = "Enter a job title."
  if (!values.team.trim()) errors.team = "Enter a team."
  if (!values.location.trim()) errors.location = "Enter a location."
  if (!values.employmentType) errors.employmentType = "Choose an employment type."
  if (!values.experience.trim()) errors.experience = "Enter the experience required."
  if (linesToList(values.summary).length === 0) errors.summary = "Enter at least one summary paragraph."
  if (!JOB_STATUSES.includes(values.status)) errors.status = "Choose a status."
  if (!/^\d{4}-\d{2}-\d{2}$/.test(values.createdAt)) {
    errors.createdAt = "Choose a created date."
  }
  return errors
}

export function formToJobFields(values) {
  const job = {
    title: values.title.trim(),
    team: values.team.trim(),
    location: values.location.trim(),
    employmentType: values.employmentType,
    experience: values.experience.trim(),
    summary: linesToList(values.summary),
    responsibilities: linesToList(values.responsibilities),
    skills: linesToList(values.skills),
    preferred: linesToList(values.preferred),
    competencies: linesToList(values.competencies),
    applyUrl: values.applyUrl.trim(),
    status: values.status,
    createdAt: values.createdAt,
  }
  const workMode = values.workMode.trim()
  const travel = values.travel.trim()
  const ideal = linesToList(values.ideal)
  const offer = linesToList(values.offer)
  if (workMode) job.workMode = workMode
  if (travel) job.travel = travel
  if (ideal.length) job.ideal = ideal
  if (offer.length) job.offer = offer
  return job
}
