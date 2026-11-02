import { restoreSeedJobs } from "@/lib/jobs-repository"
import { readHqSession } from "@/lib/hq/session"

export const dynamic = "force-dynamic"

export async function POST() {
  const user = await readHqSession()
  if (!user) return Response.json({ message: "Sign in required." }, { status: 401 })

  try {
    return Response.json({ jobs: await restoreSeedJobs() })
  } catch (error) {
    console.error("Restore jobs failed:", error instanceof Error ? error.message : error)
    return Response.json({ message: "Sample jobs could not be restored." }, { status: 500 })
  }
}
