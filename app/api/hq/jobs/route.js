import { createJob, listJobs, parseJobFields } from "@/lib/jobs-repository"
import { readHqSession } from "@/lib/hq/session"

export const dynamic = "force-dynamic"

async function requireUser() {
  const user = await readHqSession()
  if (!user) return { response: Response.json({ message: "Sign in required." }, { status: 401 }) }
  return { user }
}

export async function GET() {
  const auth = await requireUser()
  if (auth.response) return auth.response
  try {
    return Response.json({ jobs: await listJobs() }, { headers: { "Cache-Control": "no-store" } })
  } catch (error) {
    console.error("Studio jobs failed:", error instanceof Error ? error.message : error)
    return Response.json({ message: "Jobs could not be loaded." }, { status: 500 })
  }
}

export async function POST(request) {
  const auth = await requireUser()
  if (auth.response) return auth.response

  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ message: "Invalid job." }, { status: 400 })
  }

  const parsed = parseJobFields(body)
  if (parsed.message) return Response.json({ message: parsed.message }, { status: 400 })

  try {
    const job = await createJob(parsed.fields)
    return Response.json({ job }, { status: 201 })
  } catch (error) {
    console.error("Create job failed:", error instanceof Error ? error.message : error)
    return Response.json({ message: "The job could not be saved." }, { status: 500 })
  }
}
