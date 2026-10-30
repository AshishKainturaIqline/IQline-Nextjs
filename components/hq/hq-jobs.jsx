"use client"

import { createContext, useContext, useMemo, useSyncExternalStore } from "react"

import { HQ_JOBS_STORAGE_KEY, SEED_JOBS } from "@/lib/hq/mock-jobs"

const listeners = new Set()
let cachedRaw
let cachedJobs = SEED_JOBS

function emit() {
  listeners.forEach((listener) => listener())
}

function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function isStringList(value) {
  return Array.isArray(value) && value.every((item) => typeof item === "string")
}

function isJob(value) {
  return Boolean(
    value &&
      typeof value.id === "string" &&
      typeof value.title === "string" &&
      typeof value.team === "string" &&
      typeof value.location === "string" &&
      typeof value.employmentType === "string" &&
      typeof value.experience === "string" &&
      typeof value.applyUrl === "string" &&
      typeof value.status === "string" &&
      typeof value.createdAt === "string" &&
      isStringList(value.summary) &&
      isStringList(value.responsibilities) &&
      isStringList(value.skills) &&
      isStringList(value.preferred) &&
      isStringList(value.competencies)
  )
}

function readJobs() {
  try {
    const raw = window.localStorage.getItem(HQ_JOBS_STORAGE_KEY)
    if (raw === cachedRaw) return cachedJobs
    cachedRaw = raw
    if (!raw) {
      cachedJobs = SEED_JOBS
      return cachedJobs
    }
    const parsed = JSON.parse(raw)
    cachedJobs = Array.isArray(parsed) ? parsed.filter(isJob) : SEED_JOBS
    return cachedJobs
  } catch {
    cachedRaw = null
    cachedJobs = SEED_JOBS
    return cachedJobs
  }
}

function persist(jobs) {
  const raw = JSON.stringify(jobs)
  cachedJobs = jobs
  cachedRaw = raw
  window.localStorage.setItem(HQ_JOBS_STORAGE_KEY, raw)
  emit()
}

function sortJobs(jobs) {
  return [...jobs].sort(
    (a, b) => b.createdAt.localeCompare(a.createdAt) || a.title.localeCompare(b.title)
  )
}

const HqJobsContext = createContext(null)

const EMPTY_JOBS = []

export function HqJobsProvider({ children }) {
  const stored = useSyncExternalStore(subscribe, readJobs, () => null)
  const ready = stored !== null
  const jobs = stored ?? EMPTY_JOBS

  const value = useMemo(() => {
    const ordered = sortJobs(jobs)
    return {
      jobs: ordered,
      ready,
      getJob(id) {
        return ordered.find((job) => job.id === id) ?? null
      },
      createJob(fields) {
        const job = { ...fields, id: crypto.randomUUID() }
        persist([job, ...jobs])
        return job
      },
      updateJob(id, fields) {
        persist(jobs.map((job) => (job.id === id ? { ...job, ...fields, id } : job)))
      },
      deleteJob(id) {
        persist(jobs.filter((job) => job.id !== id))
      },
      restoreSamples() {
        persist([...SEED_JOBS])
      },
    }
  }, [jobs, ready])

  return <HqJobsContext.Provider value={value}>{children}</HqJobsContext.Provider>
}

export function useHqJobs() {
  const context = useContext(HqJobsContext)
  if (!context) throw new Error("useHqJobs must be used within HqJobsProvider")
  return context
}
