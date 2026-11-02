"use client"

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from "react"

import { useHqAuth } from "@/components/hq/hq-auth"

const listeners = new Set()
const serverSnapshot = { ready: false, jobs: [], error: "" }
let snapshot = serverSnapshot
let loadToken = 0

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

async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
    cache: "no-store",
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.message || "Request failed.")
  return data
}

async function loadJobs() {
  const token = ++loadToken
  try {
    const data = await request("/api/hq/jobs")
    if (token !== loadToken) return
    snapshot = { ready: true, jobs: Array.isArray(data.jobs) ? data.jobs : [], error: "" }
  } catch (error) {
    if (token !== loadToken) return
    snapshot = {
      ready: true,
      jobs: [],
      error: error instanceof Error ? error.message : "Jobs could not be loaded.",
    }
  }
  emit()
}

const HqJobsContext = createContext(null)

export function HqJobsProvider({ children }) {
  const { user, ready: authReady } = useHqAuth()
  const state = useSyncExternalStore(subscribe, getSnapshot, () => serverSnapshot)
  const userId = user?.id ?? ""

  useEffect(() => {
    if (!authReady) return
    if (!userId) {
      loadToken += 1
      snapshot = { ready: true, jobs: [], error: "" }
      emit()
      return
    }
    snapshot = { ready: false, jobs: [], error: "" }
    emit()
    loadJobs()
  }, [authReady, userId])

  const value = useMemo(
    () => ({
      jobs: state.jobs,
      ready: state.ready,
      error: state.error,
      getJob(id) {
        return state.jobs.find((job) => job.id === id) ?? null
      },
      async createJob(fields) {
        const data = await request("/api/hq/jobs", { method: "POST", body: JSON.stringify(fields) })
        await loadJobs()
        return data.job
      },
      async updateJob(id, fields) {
        await request(`/api/hq/jobs/${id}`, { method: "PATCH", body: JSON.stringify(fields) })
        await loadJobs()
      },
      async deleteJob(id) {
        await request(`/api/hq/jobs/${id}`, { method: "DELETE" })
        await loadJobs()
      },
      async restoreSamples() {
        await request("/api/hq/jobs/restore", { method: "POST" })
        await loadJobs()
      },
    }),
    [state]
  )

  return <HqJobsContext.Provider value={value}>{children}</HqJobsContext.Provider>
}

export function useHqJobs() {
  const context = useContext(HqJobsContext)
  if (!context) throw new Error("useHqJobs must be used within HqJobsProvider")
  return context
}
