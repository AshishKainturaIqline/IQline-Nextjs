"use client"

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from "react"

const listeners = new Set()
const serverSnapshot = { ready: false, user: null }
let snapshot = serverSnapshot

function emit() {
  listeners.forEach((listener) => listener())
}

function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot() {
  return snapshot
}

async function loadSession() {
  try {
    const response = await fetch("/api/hq/session", { cache: "no-store" })
    const data = await response.json()
    snapshot = { ready: true, user: data.user ?? null }
  } catch {
    snapshot = { ready: true, user: null }
  }
  emit()
}

const HqAuthContext = createContext(null)

export function HqAuthProvider({ children }) {
  const state = useSyncExternalStore(subscribe, getSnapshot, () => serverSnapshot)

  useEffect(() => {
    loadSession()
  }, [])

  const value = useMemo(
    () => ({
      user: state.user,
      ready: state.ready,
      async login(id, password) {
        const response = await fetch("/api/hq/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
          body: JSON.stringify({ id, password }),
        })
        const data = await response.json().catch(() => ({}))
        if (!response.ok || !data.user) return { ok: false, message: data.message }
        snapshot = { ready: true, user: data.user }
        emit()
        return { ok: true }
      },
      async logout() {
        await fetch("/api/hq/session", { method: "DELETE", cache: "no-store" })
        snapshot = { ready: true, user: null }
        emit()
      },
    }),
    [state]
  )

  return <HqAuthContext.Provider value={value}>{children}</HqAuthContext.Provider>
}

export function useHqAuth() {
  const context = useContext(HqAuthContext)
  if (!context) throw new Error("useHqAuth must be used within HqAuthProvider")
  return context
}
