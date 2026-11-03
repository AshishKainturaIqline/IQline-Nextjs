import mysql from "mysql2/promise"

import { seedJobs } from "@/lib/jobs-seed"

const globalStore = globalThis

const CREATE_JOBS = `
  CREATE TABLE IF NOT EXISTS jobs (
    id VARCHAR(80) NOT NULL,
    title VARCHAR(160) NOT NULL,
    team VARCHAR(120) NOT NULL,
    location VARCHAR(160) NOT NULL,
    work_mode VARCHAR(160) NOT NULL DEFAULT '',
    employment_type VARCHAR(40) NOT NULL,
    experience VARCHAR(80) NOT NULL,
    travel VARCHAR(300) NOT NULL DEFAULT '',
    summary LONGTEXT NOT NULL,
    responsibilities LONGTEXT NOT NULL,
    skills LONGTEXT NOT NULL,
    preferred LONGTEXT NOT NULL,
    competencies LONGTEXT NOT NULL,
    ideal LONGTEXT NOT NULL,
    offer LONGTEXT NOT NULL,
    apply_url VARCHAR(2000) NOT NULL DEFAULT '',
    status ENUM('Active', 'Inactive') NOT NULL,
    created_at DATE NOT NULL,
    PRIMARY KEY (id),
    KEY jobs_status_created_idx (status, created_at)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
`

const CREATE_USERS = `
  CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(80) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(120) NOT NULL,
    role VARCHAR(80) NOT NULL,
    PRIMARY KEY (id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
`

export const INSERT_JOB_SQL = `INSERT INTO jobs (
  id, title, team, location, work_mode, employment_type, experience, travel,
  summary, responsibilities, skills, preferred, competencies, ideal, offer,
  apply_url, status, created_at
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

function requiredEnv(name) {
  const value = process.env[name]?.trim()
  if (!value) throw new Error(`Missing ${name}.`)
  return value
}

export function jobValues(id, fields) {
  return [
    id,
    fields.title,
    fields.team,
    fields.location,
    fields.workMode || "",
    fields.employmentType,
    fields.experience,
    fields.travel || "",
    JSON.stringify(fields.summary ?? []),
    JSON.stringify(fields.responsibilities ?? []),
    JSON.stringify(fields.skills ?? []),
    JSON.stringify(fields.preferred ?? []),
    JSON.stringify(fields.competencies ?? []),
    JSON.stringify(fields.ideal ?? []),
    JSON.stringify(fields.offer ?? []),
    fields.applyUrl || "",
    fields.status,
    fields.createdAt,
  ]
}

export function getPool() {
  if (globalStore.__iqlineMysql) return globalStore.__iqlineMysql
  const pool = mysql.createPool({
    host: requiredEnv("DB_HOST"),
    port: Number(process.env.DB_PORT || 3306),
    user: requiredEnv("DB_USER"),
    password: requiredEnv("DB_PASSWORD"),
    database: requiredEnv("DB_NAME"),
    waitForConnections: true,
    connectionLimit: 5,
    connectTimeout: 10000,
    dateStrings: true,
    charset: "utf8mb4",
    enableKeepAlive: true,
  })
  globalStore.__iqlineMysql = pool
  return pool
}

async function seedIfEmpty(connection) {
  const [rows] = await connection.query("SELECT COUNT(*) AS count FROM jobs")
  if (Number(rows[0]?.count ?? 0) > 0) return
  for (const job of seedJobs()) {
    await connection.query(INSERT_JOB_SQL, jobValues(job.id, job))
  }
}

async function migrate() {
  const pool = getPool()
  await pool.query(CREATE_JOBS)
  await pool.query(CREATE_USERS)
  const connection = await pool.getConnection()
  try {
    await connection.beginTransaction()
    await seedIfEmpty(connection)
    await connection.commit()
  } catch (error) {
    await connection.rollback()
    throw error
  } finally {
    connection.release()
  }
}

export function ensureSchema() {
  if (!globalStore.__iqlineMysqlReady) {
    globalStore.__iqlineMysqlReady = migrate().catch((error) => {
      globalStore.__iqlineMysqlReady = null
      throw error
    })
  }
  return globalStore.__iqlineMysqlReady
}
