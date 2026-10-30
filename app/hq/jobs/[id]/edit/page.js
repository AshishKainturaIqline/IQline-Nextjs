"use client"

import Link from "next/link"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"

import { DeleteJobDialog } from "@/components/hq/delete-job-dialog"
import { JobForm } from "@/components/hq/job-form"
import { HqLoading, HqMissing } from "@/components/hq/hq-shell"
import { useHqJobs } from "@/components/hq/hq-jobs"
import { Button } from "@/components/ui/button"
import { formToJobFields, jobToForm } from "@/lib/hq/mock-jobs"

export default function Page() {
  const params = useParams()
  const router = useRouter()
  const id = String(params.id)
  const { jobs, ready, getJob, updateJob, deleteJob } = useHqJobs()
  const [confirming, setConfirming] = useState(false)
  const job = getJob(id)
  const teams = [...new Set(jobs.map((item) => item.team))].sort()

  if (!ready) return <HqLoading label="Loading job…" />
  if (!job) return <HqMissing />

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">
            <Link href="/hq/jobs" className="hover:underline">
              Jobs
            </Link>
            <span> / </span>
            <span>Edit job</span>
          </p>
          <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight">{job.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Fill in the details candidates will see on the careers page.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button type="button" variant="outline" className="rounded-lg" onClick={() => router.push(`/hq/jobs/${job.id}`)}>
            Cancel
          </Button>
          <Button type="submit" form="hq-job-form" className="rounded-lg bg-[#117a72] text-white hover:bg-[#0f6b64]">
            Save changes
          </Button>
        </div>
      </div>

      <JobForm
        key={job.id}
        initial={jobToForm(job)}
        teams={teams}
        onDelete={() => setConfirming(true)}
        onSubmit={(values) => {
          updateJob(job.id, formToJobFields(values))
          router.push(`/hq/jobs/${job.id}`)
        }}
      />

      <DeleteJobDialog
        job={job}
        open={confirming}
        onOpenChange={setConfirming}
        onConfirm={() => {
          deleteJob(job.id)
          router.replace("/hq/jobs")
        }}
      />
    </div>
  )
}
