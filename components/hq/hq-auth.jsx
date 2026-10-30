"use client"

import { createContext, useContext, useMemo, useSyncExternalStore } from "react"

import { authenticateHqUser } from "@/lib/hq/users"

const SESSION_KEY = "iqline-hq-session-v1"
const UNREADY = { unready: true }

const listeners = new Set()
let cachedRaw
let cachedUser = null

function emit() {
  listeners.forEach((listener) => listener())
}

function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function readSession() {
  try {
    const raw = window.localStorage.getItem(SESSION_KEY)
    if (raw === cachedRaw) return cachedUser
    cachedRaw = raw
    if (!raw) {
      cachedUser = null
      return cachedUser
    }
    const parsed = JSON.parse(raw)
    cachedUser =
      parsed?.id && parsed?.name && parsed?.role
        ? { id: parsed.id, name: parsed.name, role: parsed.role }
        : null
    return cachedUser
  } catch {
    cachedRaw = null
    cachedUser = null
    return cachedUser
  }
}

export function HqAuthProvider({ children }) {
  const session = useSyncExternalStore(subscribe, readSession, () => UNREADY)
  const ready = session !== UNREADY
  const user = ready ? session : null

  const value = useMemo(
    () => ({
      user,
      ready,
      login(id, password) {
        const next = authenticateHqUser(id, password)
        if (!next) return { ok: false }
        const raw = JSON.stringify(next)
        window.localStorage.setItem(SESSION_KEY, raw)
        cachedRaw = raw
        cachedUser = next
        emit()
        return { ok: true }
      },
      logout() {
        window.localStorage.removeItem(SESSION_KEY)
        cachedRaw = null
        cachedUser = null
        emit()
      },
    }),
    [ready, user]
  )

  return <HqAuthContext.Provider value={value}>{children}</HqAuthContext.Provider>
}

const HqAuthContext = createContext(null)

export function useHqAuth() {
  const context = useContext(HqAuthContext)
  if (!context) throw new Error("useHqAuth must be used within HqAuthProvider")
  return context
}
