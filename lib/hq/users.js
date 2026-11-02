import "server-only"

import bcrypt from "bcryptjs"

import { ensureSchema, getPool } from "@/lib/db"

const DUMMY_HASH = "$2b$12$0nuUb/QcNAadV0KKESmIkuvLZiLS4oTrsO75uy2Tc3fooYP32cpzW"

export async function authenticateHqUser(id, password) {
  const normalizedId = typeof id === "string" ? id.trim().toLowerCase() : ""
  const supplied = typeof password === "string" ? password : ""
  if (!normalizedId || !supplied) {
    await bcrypt.compare(supplied || "invalid", DUMMY_HASH)
    return null
  }

  await ensureSchema()
  const [rows] = await getPool().query(
    "SELECT id, password_hash, name, role FROM users WHERE id = ? LIMIT 1",
    [normalizedId]
  )
  const user = rows[0]
  const matches = await bcrypt.compare(supplied, user?.password_hash || DUMMY_HASH)
  if (!user || !matches) return null
  return {
    id: user.id,
    name: user.name,
    role: user.role,
  }
}
