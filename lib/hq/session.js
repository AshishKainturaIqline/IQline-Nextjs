import { createHmac, timingSafeEqual } from "node:crypto"
import { cookies } from "next/headers"

const COOKIE = "iqline_hq"
const MAX_AGE = 60 * 60 * 24 * 7

function secret() {
  const value = process.env.SESSION_SECRET?.trim()
  if (!value || value.length < 32) {
    throw new Error("SESSION_SECRET must be set to a random string of at least 32 characters.")
  }
  return value
}

function sign(payload) {
  return createHmac("sha256", secret()).update(payload).digest("base64url")
}

export function encodeSession(user) {
  const payload = Buffer.from(
    JSON.stringify({
      id: user.id,
      name: user.name,
      role: user.role,
      exp: Date.now() + MAX_AGE * 1000,
    })
  ).toString("base64url")
  return `${payload}.${sign(payload)}`
}

export function decodeSession(token) {
  if (typeof token !== "string") return null
  const dot = token.lastIndexOf(".")
  if (dot <= 0) return null
  const payload = token.slice(0, dot)
  const signature = token.slice(dot + 1)
  const expected = sign(payload)
  const actualBuffer = Buffer.from(signature)
  const expectedBuffer = Buffer.from(expected)
  if (actualBuffer.length !== expectedBuffer.length || !timingSafeEqual(actualBuffer, expectedBuffer)) return null

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"))
    if (!data?.id || !data?.name || !data?.role || typeof data.exp !== "number") return null
    if (data.exp < Date.now()) return null
    return { id: data.id, name: data.name, role: data.role }
  } catch {
    return null
  }
}

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: MAX_AGE,
}

export async function readHqSession() {
  const jar = await cookies()
  return decodeSession(jar.get(COOKIE)?.value)
}

export async function writeHqSession(user) {
  const jar = await cookies()
  jar.set(COOKIE, encodeSession(user), cookieOptions)
}

export async function clearHqSession() {
  const jar = await cookies()
  jar.delete(COOKIE)
}
