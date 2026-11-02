export async function fetchPublicJobs() {
  const response = await fetch("/api/jobs", { cache: "no-store" })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.message || "Open roles could not be loaded.")
  return Array.isArray(data.jobs) ? data.jobs : []
}
