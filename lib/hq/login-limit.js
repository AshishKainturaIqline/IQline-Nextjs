import "server-only"

const MAX_FAILURES = 5
const LOCK_MS = 15 * 60 * 1000

const attempts = new Map()

export function clientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) {
    const ip = forwarded.split(",")[0]?.trim()
    if (ip) return ip
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown"
}

export function loginLock(ip) {
  const entry = attempts.get(ip)
  if (!entry) return null
  if (entry.lockedUntil && entry.lockedUntil > Date.now()) {
    return { retryAfter: Math.ceil((entry.lockedUntil - Date.now()) / 1000) }
  }
  if (entry.lockedUntil && entry.lockedUntil <= Date.now()) {
    attempts.delete(ip)
  }
  return null
}

export function recordLoginFailure(ip) {
  const now = Date.now()
  const entry = attempts.get(ip)
  const failures = entry && (!entry.lockedUntil || entry.lockedUntil > now) ? entry.failures + 1 : 1
  if (failures >= MAX_FAILURES) {
    attempts.set(ip, { failures, lockedUntil: now + LOCK_MS })
    return { retryAfter: Math.ceil(LOCK_MS / 1000) }
  }
  attempts.set(ip, { failures, lockedUntil: 0 })
  return null
}

export function clearLoginFailures(ip) {
  attempts.delete(ip)
}
