/**
 * Prototype studio accounts. Every account can use every screen.
 * Replace this list when real authentication is added.
 */
export const HQ_USERS = [
  {
    id: "superadmin",
    password: "studio-super",
    name: "Super Admin",
    role: "Super Admin",
  },
  {
    id: "adminhr",
    password: "studio-hr",
    name: "Admin HR",
    role: "Admin HR",
  },
  {
    id: "adminmarketing",
    password: "studio-marketing",
    name: "Admin Marketing",
    role: "Admin Marketing",
  },
]

export function authenticateHqUser(id, password) {
  const normalizedId = id.trim().toLowerCase()
  const user = HQ_USERS.find((entry) => entry.id === normalizedId)
  if (!user || user.password !== password) return null
  return {
    id: user.id,
    name: user.name,
    role: user.role,
  }
}
