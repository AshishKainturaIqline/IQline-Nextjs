import { randomUUID } from "node:crypto"

import { INSERT_JOB_SQL, ensureSchema, getPool, jobValues } from "@/lib/db"
import { EMPLOYMENT_TYPES, JOB_STATUSES } from "@/lib/hq/mock-jobs"
import { seedJobs } from "@/lib/jobs-seed"

const LIST_SQL = "SELECT * FROM jobs ORDER BY created_at DESC, title ASC"
const ACTIVE_SQL = "SELECT * FROM jobs WHERE status = 'Active' ORDER BY created_at DESC, title ASC"

function text(value, max) {
  if (typeof value !== "string") return ""
  return value.trim().slice(0, max)
}

function list(value, maxItems, maxLength) {
  if (!Array.isArray(value)) return []
  return value
    .filter((item) => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, maxItems)
    .map((item) => item.slice(0, maxLength))
}

function isDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const [year, month, day] = value.split("-").map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
}

function readList(value) {
  if (Array.isArray(value)) return value.filter((item) => typeof item === "string")
  try {
    const parsed = JSON.parse(value || "[]")
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : []
  } catch {
    return []
  }
}

function dateStamp(value) {
  if (!value) return ""
  if (value instanceof Date) {
    const month = String(value.getMonth() + 1).padStart(2, "0")
    const day = String(value.getDate()).padStart(2, "0")
    return `${value.getFullYear()}-${month}-${day}`
  }
  return String(value).slice(0, 10)
}

async function query(sql, params = []) {
  await ensureSchema()
  const [rows] = await getPool().query(sql, params)
  return rows
}

export function parseJobFields(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { message: "Invalid job." }
  }

  const fields = {
    title: text(input.title, 160),
    team: text(input.team, 120),
    location: text(input.location, 160),
    workMode: text(input.workMode, 160),
    employmentType: text(input.employmentType, 40),
    experience: text(input.experience, 80),
    travel: text(input.travel, 300),
    summary: list(input.summary, 20, 2000),
    responsibilities: list(input.responsibilities, 40, 500),
    skills: list(input.skills, 40, 500),
    preferred: list(input.preferred, 40, 500),
    competencies: list(input.competencies, 40, 500),
    ideal: list(input.ideal, 40, 500),
    offer: list(input.offer, 40, 500),
    applyUrl: text(input.applyUrl, 2000),
    status: text(input.status, 20),
    createdAt: text(input.createdAt, 10),
  }

  if (!fields.title) return { message: "Enter a job title." }
  if (!fields.team) return { message: "Enter a team." }
  if (!fields.location) return { message: "Enter a location." }
  if (!EMPLOYMENT_TYPES.includes(fields.employmentType)) return { message: "Choose an employment type." }
  if (!fields.experience) return { message: "Enter the experience required." }
  if (fields.summary.length === 0) return { message: "Enter at least one summary paragraph." }
  if (!JOB_STATUSES.includes(fields.status)) return { message: "Choose a status." }
  if (!isDate(fields.createdAt)) return { message: "Choose a created date." }
  if (fields.applyUrl && !/^https?:\/\/\S+$/i.test(fields.applyUrl)) {
    return { message: "Apply link must be an http or https URL." }
  }

  return { fields }
}

export function isJobId(id) {
  return typeof id === "string" && /^[A-Za-z0-9-]{1,80}$/.test(id)
}

function rowToJob(row) {
  return {
    id: row.id,
    title: row.title,
    team: row.team,
    location: row.location,
    workMode: row.work_mode,
    employmentType: row.employment_type,
    experience: row.experience,
    travel: row.travel,
    summary: readList(row.summary),
    responsibilities: readList(row.responsibilities),
    skills: readList(row.skills),
    preferred: readList(row.preferred),
    competencies: readList(row.competencies),
    ideal: readList(row.ideal),
    offer: readList(row.offer),
    applyUrl: row.apply_url,
    status: row.status,
    createdAt: dateStamp(row.created_at),
  }
}

export async function listJobs({ activeOnly = false } = {}) {
  const rows = await query(activeOnly ? ACTIVE_SQL : LIST_SQL)
  return rows.map(rowToJob)
}

export async function getJob(id) {
  if (!isJobId(id)) return null
  const rows = await query("SELECT * FROM jobs WHERE id = ? LIMIT 1", [id])
  return rows[0] ? rowToJob(rows[0]) : null
}

export async function createJob(fields) {
  const id = randomUUID()
  await query(INSERT_JOB_SQL, jobValues(id, fields))
  return getJob(id)
}

export async function updateJob(id, fields) {
  const existing = await getJob(id)
  if (!existing) return null
  await query(
    `UPDATE jobs SET
      title = ?, team = ?, location = ?, work_mode = ?, employment_type = ?,
      experience = ?, travel = ?, summary = ?, responsibilities = ?, skills = ?,
      preferred = ?, competencies = ?, ideal = ?, offer = ?, apply_url = ?,
      status = ?, created_at = ?
    WHERE id = ?`,
    [
      fields.title,
      fields.team,
      fields.location,
      fields.workMode || "",
      fields.employmentType,
      fields.experience,
      fields.travel || "",
      JSON.stringify(fields.summary),
      JSON.stringify(fields.responsibilities),
      JSON.stringify(fields.skills),
      JSON.stringify(fields.preferred),
      JSON.stringify(fields.competencies),
      JSON.stringify(fields.ideal),
      JSON.stringify(fields.offer),
      fields.applyUrl || "",
      fields.status,
      fields.createdAt,
      id,
    ]
  )
  return getJob(id)
}

export async function deleteJob(id) {
  if (!isJobId(id)) return false
  const result = await query("DELETE FROM jobs WHERE id = ?", [id])
  return Number(result.affectedRows) > 0
}

export async function restoreSeedJobs() {
  await ensureSchema()
  const connection = await getPool().getConnection()
  try {
    await connection.beginTransaction()
    await connection.query("DELETE FROM jobs")
    for (const job of seedJobs()) {
      await connection.query(INSERT_JOB_SQL, jobValues(job.id, job))
    }
    await connection.commit()
  } catch (error) {
    await connection.rollback()
    throw error
  } finally {
    connection.release()
  }
  return listJobs()
}
