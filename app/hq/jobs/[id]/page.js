"use client"

import Link from "next/link"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DeleteJobDialog } from "@/components/hq/delete-job-dialog"
import { HqLoading, HqMissing } from "@/components/hq/hq-shell"
import { useHqJobs } from "@/components/hq/hq-jobs"
import { JobStatusBadge } from "@/components/hq/job-status-badge"
import { formatJobDate } from "@/lib/hq/mock-jobs"
import { ArrowLeftIcon } from "lucide-react"

function Fact({ label, value }) {
  if (!value) return null
  return (
    <div>
      <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</dt>
      <dd className="mt-1 text-sm">{value}</dd>
    </div>
  )
}

function BulletSection({ title, items }) {
  if (!items?.length) return null
  return (
    <section>
      <h2 className="text-sm font-medium">{title}</h2>
      <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}

export default function Page() {
  const params = useParams()
  const router = useRouter()
  const id = String(params.id)
  const { ready, getJob, deleteJob } = useHqJobs()
  const [confirming, setConfirming] = useState(false)
  const job = getJob(id)

  if (!ready) return <HqLoading label="Loading job…" />
  if (!job) return <HqMissing />

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-lg font-medium text-muted-foreground">
            <Link href="/hq/jobs" className="flex items-center gap-2 hover:underline items-center">
             <ArrowLeftIcon className="h-4 w-4" /> <span>Jobs</span>
            </Link>
          </p>
          <h1 className="mt-1 font-heading text-2xl font-semibold tracking-tight">{job.title}</h1>
          <div className="mt-2">
            <JobStatusBadge status={job.status} />
          </div>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href={`/hq/jobs/${job.id}/edit`}>Edit</Link>
          </Button>
          <Button type="button" variant="destructive" onClick={() => setConfirming(true)}>
            Delete
          </Button>
        </div>
      </div>
      <Card>
        <CardContent className="grid gap-6">
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Fact label="Team" value={job.team} />
            <Fact label="Location" value={job.location} />
            <Fact label="Work mode" value={job.workMode} />
            <Fact label="Employment type" value={job.employmentType} />
            <Fact label="Experience required" value={job.experience} />
            <Fact label="Travel" value={job.travel} />
            <Fact label="Created date" value={formatJobDate(job.createdAt)} />
            <Fact label="Status" value={job.status} />
          </dl>
          {job.summary?.length ? (
            <section className="grid gap-3">
              <h2 className="text-sm font-medium">Summary</h2>
              {job.summary.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </section>
          ) : null}
          <BulletSection title="Responsibilities" items={job.responsibilities} />
          <BulletSection title="Skills" items={job.skills} />
          <BulletSection title="Preferred" items={job.preferred} />
          <BulletSection title="Competencies" items={job.competencies} />
          <BulletSection title="Ideal candidate" items={job.ideal} />
          <BulletSection title="What we offer" items={job.offer} />
          {job.applyUrl ? (
            <p className="text-sm">
              <a href={job.applyUrl} className="text-primary underline-offset-4 hover:underline" target="_blank" rel="noreferrer">
                Apply link
              </a>
            </p>
          ) : null}
        </CardContent>
      </Card>
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
