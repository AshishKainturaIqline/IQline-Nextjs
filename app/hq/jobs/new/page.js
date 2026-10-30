"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { JobForm } from "@/components/hq/job-form"
import { HqLoading } from "@/components/hq/hq-shell"
import { useHqJobs } from "@/components/hq/hq-jobs"
import { Button } from "@/components/ui/button"
import { emptyJobForm, formToJobFields } from "@/lib/hq/mock-jobs"

export default function Page() {
  const router = useRouter()
  const { jobs, ready, createJob } = useHqJobs()
  const teams = [...new Set(jobs.map((job) => job.team))].sort()

  if (!ready) return <HqLoading label="Loading jobs…" />

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">
            <Link href="/hq/jobs" className="hover:underline">
              Jobs
            </Link>
            <span> / </span>
            <span>Add job</span>
          </p>
          <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight">Add job</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Fill in the details candidates will see on the careers page.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button type="button" variant="outline" className="rounded-lg" onClick={() => router.push("/hq/jobs")}>
            Cancel
          </Button>
          <Button type="submit" form="hq-job-form" className="rounded-lg bg-[#117a72] text-white hover:bg-[#0f6b64]">
            Create job
          </Button>
        </div>
      </div>
      <JobForm
        initial={emptyJobForm()}
        teams={teams}
        onSubmit={(values) => {
          const job = createJob(formToJobFields(values))
          router.push(`/hq/jobs/${job.id}`)
        }}
      />
    </div>
  )
}
