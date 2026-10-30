"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { EMPLOYMENT_TYPES, formatJobDate, validateJobForm } from "@/lib/hq/mock-jobs"

const controlClass =
  "h-11 rounded-lg border-input bg-background px-3 shadow-none focus-visible:border-[#117a72] focus-visible:ring-[#117a72]/20"

function Field({ id, label, hint, error, className, children }) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Label htmlFor={id}>{label}</Label>
      {children}
      {hint && !error ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  )
}

function LinesField({ id, label, hint, error, value, onChange }) {
  return (
    <Field id={id} label={label} hint={hint} error={error}>
      <Textarea
        id={id}
        name={id}
        className="min-h-28 rounded-lg shadow-none focus-visible:border-[#117a72] focus-visible:ring-[#117a72]/20"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
      />
    </Field>
  )
}

function Panel({ title, children }) {
  return (
    <section className="rounded-xl bg-card p-5 shadow-xs ring-1 ring-foreground/10">
      <h2 className="font-medium">{title}</h2>
      <div className="mt-4 grid gap-4">{children}</div>
    </section>
  )
}

export function JobForm({ initial, teams = [], formId = "hq-job-form", onSubmit, onDelete }) {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})

  function update(name, value) {
    setValues((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validateJobForm(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    onSubmit(values)
  }

  const employmentOptions = EMPLOYMENT_TYPES.includes(values.employmentType)
    ? EMPLOYMENT_TYPES
    : [values.employmentType, ...EMPLOYMENT_TYPES]
  const active = values.status === "Active"

  return (
    <form id={formId} onSubmit={handleSubmit} className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_300px]" noValidate>
      <div className="grid gap-4">
        <Panel title="Basics">
          <Field id="title" label="Job title" error={errors.title}>
            <Input
              id="title"
              name="title"
              value={values.title}
              onChange={(event) => update("title", event.target.value)}
              aria-invalid={Boolean(errors.title)}
              className={controlClass}
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field id="team" label="Team" error={errors.team}>
              <Input
                id="team"
                name="team"
                list="hq-teams"
                value={values.team}
                onChange={(event) => update("team", event.target.value)}
                aria-invalid={Boolean(errors.team)}
                className={controlClass}
              />
              <datalist id="hq-teams">
                {teams.map((team) => (
                  <option key={team} value={team} />
                ))}
              </datalist>
            </Field>
            <Field id="location" label="Location" error={errors.location}>
              <Input
                id="location"
                name="location"
                value={values.location}
                onChange={(event) => update("location", event.target.value)}
                aria-invalid={Boolean(errors.location)}
                className={controlClass}
              />
            </Field>
            <Field id="employmentType" label="Type" error={errors.employmentType}>
              <select
                id="employmentType"
                name="employmentType"
                className={cn(
                  "h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-[#117a72] focus-visible:ring-3 focus-visible:ring-[#117a72]/20",
                  errors.employmentType && "border-destructive"
                )}
                value={values.employmentType}
                onChange={(event) => update("employmentType", event.target.value)}
              >
                {employmentOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field id="experience" label="Experience required" error={errors.experience}>
              <Input
                id="experience"
                name="experience"
                value={values.experience}
                onChange={(event) => update("experience", event.target.value)}
                placeholder="2–6 years"
                aria-invalid={Boolean(errors.experience)}
                className={controlClass}
              />
            </Field>
            <Field id="workMode" label="Work mode">
              <Input
                id="workMode"
                name="workMode"
                value={values.workMode}
                onChange={(event) => update("workMode", event.target.value)}
                placeholder="Work from office"
                className={controlClass}
              />
            </Field>
            <Field id="travel" label="Travel">
              <Input
                id="travel"
                name="travel"
                value={values.travel}
                onChange={(event) => update("travel", event.target.value)}
                className={controlClass}
              />
            </Field>
          </div>
        </Panel>

        <Panel title="Summary">
          <Field id="summary" label="Summary" hint="One paragraph per line." error={errors.summary}>
            <Textarea
              id="summary"
              name="summary"
              className="min-h-40 rounded-lg shadow-none focus-visible:border-[#117a72] focus-visible:ring-[#117a72]/20"
              placeholder="Describe the role, responsibilities and requirements..."
              value={values.summary}
              onChange={(event) => update("summary", event.target.value)}
              aria-invalid={Boolean(errors.summary)}
            />
          </Field>
        </Panel>

        <Panel title="Role details">
          <LinesField
            id="responsibilities"
            label="Responsibilities"
            hint="One item per line."
            value={values.responsibilities}
            onChange={(value) => update("responsibilities", value)}
          />
          <LinesField
            id="skills"
            label="Skills"
            hint="One item per line."
            value={values.skills}
            onChange={(value) => update("skills", value)}
          />
          <LinesField
            id="preferred"
            label="Preferred qualifications"
            hint="One item per line."
            value={values.preferred}
            onChange={(value) => update("preferred", value)}
          />
          <LinesField
            id="competencies"
            label="Preferred competencies"
            hint="One item per line."
            value={values.competencies}
            onChange={(value) => update("competencies", value)}
          />
          <LinesField
            id="ideal"
            label="Ideal candidate"
            hint="One item per line. Leave blank if this role does not use it."
            value={values.ideal}
            onChange={(value) => update("ideal", value)}
          />
          <LinesField
            id="offer"
            label="What we offer"
            hint="One item per line. Leave blank if this role does not use it."
            value={values.offer}
            onChange={(value) => update("offer", value)}
          />
          <Field id="applyUrl" label="Apply link" error={errors.applyUrl}>
            <Input
              id="applyUrl"
              name="applyUrl"
              type="url"
              value={values.applyUrl}
              onChange={(event) => update("applyUrl", event.target.value)}
              aria-invalid={Boolean(errors.applyUrl)}
              className={controlClass}
            />
          </Field>
        </Panel>
      </div>

      <div className="grid gap-4">
        <section className="rounded-xl bg-card p-5 shadow-xs ring-1 ring-foreground/10">
          <h2 className="font-medium">Visibility</h2>
          <div className="mt-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium">{active ? "Active" : "Inactive"}</p>
              <p className="text-xs text-muted-foreground">
                {active ? "Shown on the careers page" : "Hidden from the careers page"}
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={active}
              aria-label="Active"
              onClick={() => update("status", active ? "Inactive" : "Active")}
              className={cn(
                "relative h-6 w-11 shrink-0 rounded-full transition-colors",
                active ? "bg-[#117a72]" : "bg-muted-foreground/30"
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 size-5 rounded-full bg-white transition-all",
                  active ? "left-5" : "left-0.5"
                )}
              />
            </button>
          </div>
          <div className="mt-4 border-t pt-4">
            <Field id="createdAt" label="Created date" error={errors.createdAt}>
              <Input
                id="createdAt"
                name="createdAt"
                type="date"
                value={values.createdAt}
                onChange={(event) => update("createdAt", event.target.value)}
                aria-invalid={Boolean(errors.createdAt)}
                className={controlClass}
              />
            </Field>
            <p className="mt-2 text-xs text-muted-foreground">Created {formatJobDate(values.createdAt)}</p>
          </div>
        </section>

        {onDelete ? (
          <section className="rounded-xl bg-card p-5 shadow-xs ring-1 ring-foreground/10">
            <h2 className="font-medium">Danger zone</h2>
            <p className="mt-1 text-sm text-muted-foreground">Deleting a job removes it from this browser.</p>
            <Button
              type="button"
              variant="outline"
              className="mt-4 w-full border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={onDelete}
            >
              Delete job
            </Button>
          </section>
        ) : null}
      </div>
    </form>
  )
}
