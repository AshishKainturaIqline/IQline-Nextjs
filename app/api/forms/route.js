import nodemailer from "nodemailer"

const CAREER_TYPES = new Set(["career_contact", "job_application"])

const TITLES = {
  demo: "New Demo Request",
  career_contact: "New Career Enquiry",
  job_application: "New Job Application",
}

const FIELD_LABELS = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  organization: "Organization",
  productInterest: "Product Interest",
  subject: "Subject",
  position: "Position",
  message: "Message",
  preferredDate: "Preferred Date",
  preferredTime: "Preferred Time",
  linkedinUrl: "LinkedIn",
  resumeUrl: "Resume Link",
  sourcePage: "Source Page",
  sourceCta: "Source CTA",
  timestamp: "Submitted At",
}

const FIELD_ORDER = Object.keys(FIELD_LABELS)
const HIDDEN_FIELDS = new Set(["formType", "resumeBase64", "resumeFileName", "to"])

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function senderAddress(name, email) {
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return undefined
  const safeName = typeof name === "string" ? name.replace(/[\r\n"<>]/g, "").trim() : ""
  return safeName ? `"${safeName}" <${email}>` : email
}

function recipientFor(formType) {
  if (CAREER_TYPES.has(formType)) {
    return process.env.MAIL_TO_CAREERS || process.env.MAIL_TO_GENERAL || ""
  }
  return process.env.MAIL_TO_GENERAL || ""
}

function isConfigured() {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env
  return Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS && SMTP_FROM)
}

function buildRows(data) {
  const keys = [
    ...FIELD_ORDER.filter((key) => key in data),
    ...Object.keys(data).filter((key) => !FIELD_ORDER.includes(key)),
  ]

  return keys
    .filter((key) => {
      if (HIDDEN_FIELDS.has(key)) return false
      const value = data[key]
      return value !== null && value !== undefined && value !== ""
    })
    .map((key) => {
      const label = FIELD_LABELS[key] || key
      return (
        "<tr>" +
        '<td style="padding:6px 12px;border:1px solid #ddd;background:#f6f6f6;font-weight:bold;vertical-align:top">' +
        escapeHtml(label) +
        "</td>" +
        '<td style="padding:6px 12px;border:1px solid #ddd;white-space:pre-wrap">' +
        escapeHtml(data[key]) +
        "</td>" +
        "</tr>"
      )
    })
    .join("")
}

function resumeAttachment(data) {
  if (!data.resumeBase64 || !data.resumeFileName) return undefined
  const rawValue = String(data.resumeBase64)
  const parts = rawValue.split(",")
  const raw = parts.length > 1 ? parts[1] : parts[0]
  if (!raw || raw.length > 7_000_000) return undefined

  let contentType = "application/pdf"
  if (parts.length > 1 && parts[0].includes(":")) {
    contentType = parts[0].split(":")[1].split(";")[0] || contentType
  }

  const filename = String(data.resumeFileName).replace(/[^\w.\- ]/g, "") || "resume"
  return [
    {
      filename,
      content: Buffer.from(raw, "base64"),
      contentType,
    },
  ]
}

export async function POST(request) {
  if (!isConfigured()) {
    return Response.json({
      success: false,
      message: "Form email is not configured. Set the SMTP values in .env.local and restart the dev server.",
    })
  }

  let payload
  try {
    payload = await request.json()
  } catch {
    return Response.json({ success: false, message: "Invalid form data." })
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return Response.json({ success: false, message: "Invalid form data." })
  }

  const to = recipientFor(payload.formType)
  if (!to) {
    return Response.json({ success: false, message: "Form email is not configured." })
  }

  const data = { ...payload, timestamp: new Date().toISOString() }
  const title = TITLES[data.formType] || "New Website Form Submission"
  const detail = data.productInterest || data.subject || data.position || ""
  const subject = `${title}: ${data.name || "Unknown"}${detail ? ` — ${detail}` : ""}`.replace(
    /[\r\n]/g,
    " "
  )

  const from = senderAddress(data.name, data.email) || process.env.SMTP_FROM

  try {
    const port = Number(process.env.SMTP_PORT || 2525)
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transport.sendMail({
      from,
      to,
      replyTo: from,
      subject,
      html:
        `<h2>${escapeHtml(title)}</h2>` +
        `<table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${buildRows(data)}</table>` +
        "<hr><p><small>Submitted via IQ-Line website</small></p>",
      attachments: resumeAttachment(data),
    })

    return Response.json({ success: true, message: "Form submitted successfully" })
  } catch (error) {
    console.error("Form email failed:", error instanceof Error ? error.message : error)
    return Response.json({
      success: false,
      message: "Unable to send the form. Please try again.",
    })
  }
}
