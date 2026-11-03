import { listJobs } from "@/lib/jobs-repository"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    return Response.json(
      { jobs: await listJobs({ activeOnly: true }) },
      { headers: { "Cache-Control": "no-store" } }
    )
  } catch (error) {
    console.error("Public jobs failed:", error instanceof Error ? error.message : error)
    return Response.json({ message: "Open roles could not be loaded." }, { status: 500 })
  }
}
