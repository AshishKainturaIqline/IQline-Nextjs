"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DeleteJobDialog } from "@/components/hq/delete-job-dialog"
import { HqLoading } from "@/components/hq/hq-shell"
import { useHqJobs } from "@/components/hq/hq-jobs"
import { formatJobDate } from "@/lib/hq/mock-jobs"
import { cn } from "@/lib/utils"

const FILTERS = ["All", "Active", "Inactive"]

function statusFromParam(value) {
  return value === "Active" || value === "Inactive" ? value : "All"
}

export default function Page() {
  const searchParams = useSearchParams()
  const paramQuery = searchParams.get("q") ?? ""
  const paramStatus = statusFromParam(searchParams.get("status"))
  const urlKey = `${paramQuery}|${searchParams.get("status") ?? ""}`
  const { jobs, ready, deleteJob, restoreSamples } = useHqJobs()
  const [query, setQuery] = useState(paramQuery)
  const [status, setStatus] = useState(paramStatus)
  const [seenUrl, setSeenUrl] = useState(urlKey)
  const [pending, setPending] = useState(null)

  if (urlKey !== seenUrl) {
    setSeenUrl(urlKey)
    setQuery(paramQuery)
    setStatus(paramStatus)
  }

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return jobs.filter((job) => {
      if (status !== "All" && job.status !== status) return false
      if (!needle) return true
      return [job.title, job.team, job.location].join(" ").toLowerCase().includes(needle)
    })
  }, [jobs, query, status])

  if (!ready) return <HqLoading label="Loading jobs…" />

  const counts = {
    All: jobs.length,
    Active: jobs.filter((job) => job.status === "Active").length,
    Inactive: jobs.filter((job) => job.status === "Inactive").length,
  }

  return (
    <div className="grid gap-5">
      <div>
        <h1 className="font-heading text-3xl font-semibold tracking-tight">Jobs</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {jobs.length} {jobs.length === 1 ? "job" : "jobs"} stored in this browser.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search title, team, or location"
          aria-label="Search jobs"
          className="h-11 rounded-lg bg-card shadow-none sm:max-w-sm"
        />
        <div className="flex gap-2" role="group" aria-label="Filter by status">
          {FILTERS.map((item) => {
            const selected = status === item
            return (
              <button
                key={item}
                type="button"
                onClick={() => setStatus(item)}
                aria-pressed={selected}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-medium",
                  selected ? "bg-[#117a72] text-white" : "text-muted-foreground hover:bg-card hover:text-foreground"
                )}
              >
                {item} {counts[item]}
              </button>
            )
          })}
        </div>
      </div>

      {jobs.length === 0 ? (
        <div className="rounded-xl border bg-card px-6 py-12 text-center">
          <p className="font-medium">No jobs yet</p>
          <p className="mt-1 text-sm text-muted-foreground">Add a job or restore the sample list.</p>
          <Button type="button" variant="outline" className="mt-4" onClick={restoreSamples}>
            Restore sample jobs
          </Button>
        </div>
      ) : visible.length === 0 ? (
        <p className="rounded-xl border bg-card px-6 py-12 text-center text-sm text-muted-foreground">
          No jobs match this search.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl bg-card shadow-xs ring-1 ring-foreground/10">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="text-xs tracking-wide text-muted-foreground uppercase">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Team</th>
                <th className="px-4 py-3 font-medium">Location</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Created</th>
                <th className="px-4 py-3 font-medium">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {visible.map((job, index) => (
                <tr key={job.id} className={cn("border-t", index % 2 === 1 && "bg-teal-50/70 dark:bg-teal-950/30")}>
                  <td className="max-w-[240px] px-4 py-4 font-semibold">{job.title}</td>
                  <td className="px-4 py-4 text-muted-foreground">{job.team}</td>
                  <td className="px-4 py-4 text-muted-foreground">{job.location}</td>
                  <td className="px-4 py-4 text-muted-foreground">{job.employmentType}</td>
                  <td className="px-4 py-4">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
                        job.status === "Active" ? "bg-teal-50 text-teal-800" : "bg-muted text-muted-foreground"
                      )}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-muted-foreground">{formatJobDate(job.createdAt)}</td>
                  <td className="px-4 py-4 text-right whitespace-nowrap">
                    <Link href={`/hq/jobs/${job.id}`} className="text-muted-foreground hover:text-foreground hover:underline">
                      View
                    </Link>
                    <span className="px-1.5 text-muted-foreground">·</span>
                    <Link href={`/hq/jobs/${job.id}/edit`} className="text-muted-foreground hover:text-foreground hover:underline">
                      Edit
                    </Link>
                    <span className="px-1.5 text-muted-foreground">·</span>
                    <button
                      type="button"
                      className="text-destructive hover:underline"
                      onClick={() => setPending(job)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <DeleteJobDialog
        job={pending}
        open={Boolean(pending)}
        onOpenChange={(open) => {
          if (!open) setPending(null)
        }}
        onConfirm={() => {
          if (pending) deleteJob(pending.id)
          setPending(null)
        }}
      />
    </div>
  )
}
