import { clearLoginFailures, clientIp, loginLock, recordLoginFailure } from "@/lib/hq/login-limit"
import { clearHqSession, readHqSession, writeHqSession } from "@/lib/hq/session"
import { authenticateHqUser } from "@/lib/hq/users"

export const dynamic = "force-dynamic"

function lockedResponse(retryAfter) {
  return Response.json(
    { message: "Too many sign-in attempts. Try again in 15 minutes." },
    { status: 429, headers: { "Retry-After": String(retryAfter), "Cache-Control": "no-store" } }
  )
}

export async function GET() {
  const user = await readHqSession()
  return Response.json({ user }, { headers: { "Cache-Control": "no-store" } })
}

export async function POST(request) {
  const ip = clientIp(request)
  const locked = loginLock(ip)
  if (locked) return lockedResponse(locked.retryAfter)

  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ message: "Invalid sign-in." }, { status: 400 })
  }

  const id = typeof body?.id === "string" ? body.id : ""
  const password = typeof body?.password === "string" ? body.password : ""
  const user = await authenticateHqUser(id, password)
  if (!user) {
    const nextLock = recordLoginFailure(ip)
    if (nextLock) return lockedResponse(nextLock.retryAfter)
    return Response.json({ message: "That ID or password is not recognized." }, { status: 401 })
  }

  clearLoginFailures(ip)
  await writeHqSession(user)
  return Response.json({ user })
}

export async function DELETE() {
  await clearHqSession()
  return Response.json({ ok: true })
}
