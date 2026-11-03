import { deleteJob, isJobId, parseJobFields, updateJob } from "@/lib/jobs-repository"
import { readHqSession } from "@/lib/hq/session"

export const dynamic = "force-dynamic"

async function requireUser() {
  const user = await readHqSession()
  if (!user) return { response: Response.json({ message: "Sign in required." }, { status: 401 }) }
  return { user }
}

export async function PATCH(request, { params }) {
  const auth = await requireUser()
  if (auth.response) return auth.response

  const { id } = await params
  if (!isJobId(id)) return Response.json({ message: "Job not found." }, { status: 404 })

  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ message: "Invalid job." }, { status: 400 })
  }

  const parsed = parseJobFields(body)
  if (parsed.message) return Response.json({ message: parsed.message }, { status: 400 })

  try {
    const job = await updateJob(id, parsed.fields)
    if (!job) return Response.json({ message: "Job not found." }, { status: 404 })
    return Response.json({ job })
  } catch (error) {
    console.error("Update job failed:", error instanceof Error ? error.message : error)
    return Response.json({ message: "The job could not be saved." }, { status: 500 })
  }
}

export async function DELETE(_request, { params }) {
  const auth = await requireUser()
  if (auth.response) return auth.response

  const { id } = await params
  if (!isJobId(id)) return Response.json({ message: "Job not found." }, { status: 404 })

  try {
    const removed = await deleteJob(id)
    if (!removed) return Response.json({ message: "Job not found." }, { status: 404 })
    return Response.json({ ok: true })
  } catch (error) {
    console.error("Delete job failed:", error instanceof Error ? error.message : error)
    return Response.json({ message: "The job could not be deleted." }, { status: 500 })
  }
}
