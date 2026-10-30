"use client"

import Link from "next/link"

import { HqLoading } from "@/components/hq/hq-shell"
import { useHqAuth } from "@/components/hq/hq-auth"
import { useHqJobs } from "@/components/hq/hq-jobs"
import { formatJobDate } from "@/lib/hq/mock-jobs"
import { cn } from "@/lib/utils"

function greeting() {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning"
  if (hour < 17) return "Good afternoon"
  return "Good evening"
}

function StatusRing({ percent }) {
  const radius = 36
  const circumference = 2 * Math.PI * radius
  const filled = (percent / 100) * circumference
  return (
    <svg viewBox="0 0 100 100" className="size-24 shrink-0" aria-hidden="true">
      <circle cx="50" cy="50" r={radius} fill="none" strokeWidth="10" className="stroke-muted" />
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        strokeWidth="10"
        strokeLinecap="round"
        className="stroke-[#117a72]"
        strokeDasharray={`${filled} ${circumference - filled}`}
        transform="rotate(-90 50 50)"
      />
    </svg>
  )
}

export default function Page() {
  const { user } = useHqAuth()
  const { jobs, ready } = useHqJobs()

  if (!ready) return <HqLoading label="Loading jobs…" />

  const active = jobs.filter((job) => job.status === "Active").length
  const inactive = jobs.length - active
  const teams = new Set(jobs.map((job) => job.team)).size
  const recent = jobs.slice(0, 5)
  const live = jobs.length ? Math.round((active / jobs.length) * 100) : 0
  const cards = [
    { label: "Total jobs", value: jobs.length, tone: "text-foreground" },
    { label: "Active", value: active, tone: "text-[#117a72]" },
    { label: "Inactive", value: inactive, tone: "text-foreground" },
    { label: "Teams", value: teams, tone: "text-foreground" },
  ]

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          {greeting()}, {user?.name}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Here is what is happening with your open roles.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-xl bg-card px-5 py-4 shadow-xs ring-1 ring-foreground/10">
            <p className="text-sm text-muted-foreground">{card.label}</p>
            <p className={cn("mt-2 text-3xl font-semibold tracking-tight", card.tone)}>{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
        <section className="rounded-xl bg-card p-5 shadow-xs ring-1 ring-foreground/10">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-medium">Recent jobs</h2>
              <p className="text-sm text-muted-foreground">Newest first</p>
            </div>
            <Link href="/hq/jobs" className="text-sm font-medium text-[#117a72] hover:underline">
              View all
            </Link>
          </div>
          {recent.length === 0 ? (
            <p className="mt-6 text-sm text-muted-foreground">No jobs yet. Add one to see it here.</p>
          ) : (
            <ul className="mt-4 divide-y">
              {recent.map((job) => (
                <li key={job.id} className="flex items-center gap-3 py-3">
                  <span
                    className={cn(
                      "grid size-9 shrink-0 place-items-center rounded-lg text-sm font-semibold",
                      job.status === "Active" ? "bg-teal-50 text-teal-800" : "bg-muted text-muted-foreground"
                    )}
                  >
                    {job.title.trim().charAt(0).toUpperCase()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <Link href={`/hq/jobs/${job.id}`} className="block truncate font-medium hover:underline">
                      {job.title}
                    </Link>
                    <p className="truncate text-sm text-muted-foreground">
                      {job.team} · {job.location} · {formatJobDate(job.createdAt)}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium",
                      job.status === "Active" ? "bg-teal-50 text-teal-800" : "bg-muted text-muted-foreground"
                    )}
                  >
                    {job.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <div className="grid gap-4">
          <section className="rounded-xl bg-card p-5 shadow-xs ring-1 ring-foreground/10">
            <h2 className="font-medium">Job status</h2>
            <div className="mt-4 flex items-center gap-4">
              <StatusRing percent={live} />
              <div>
                <p className="text-3xl font-semibold tracking-tight">{live}%</p>
                <p className="text-sm text-muted-foreground">of roles are live</p>
              </div>
            </div>
          </section>
          <section className="rounded-xl bg-card p-5 shadow-xs ring-1 ring-foreground/10">
            <h2 className="font-medium">Quick actions</h2>
            <div className="mt-4 grid gap-2">
              <Link
                href="/hq/jobs/new"
                className="rounded-lg bg-teal-50 px-4 py-3 text-center text-sm font-medium text-teal-800 hover:bg-teal-100"
              >
                Post a new job
              </Link>
              <Link
                href="/hq/jobs?status=Inactive"
                className="rounded-lg bg-teal-50 px-4 py-3 text-center text-sm font-medium text-teal-800 hover:bg-teal-100"
              >
                Review inactive roles
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
