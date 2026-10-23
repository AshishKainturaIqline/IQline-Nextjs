/**
 * IQ-Line Website — Google Apps Script Backend (email only)
 *
 * This file is a REFERENCE TEMPLATE. It is NOT used by the React application.
 * Copy-paste its contents into the Google Apps Script editor. Every form
 * submission from the website is emailed to NOTIFY_EMAIL. Nothing is stored
 * in a spreadsheet.
 *
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com and create a new project.
 * 2. Paste this entire script into the editor (replace any default code).
 * 3. Set NOTIFY_EMAIL below to the inbox that should receive submissions.
 * 4. Select the "testEmail" function and click Run once. Approve the Gmail
 *    permission prompt, then check that the test email arrived.
 * 5. Deploy the script:
 *    Deploy -> New deployment -> Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the deployment URL and set it as NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL
 *    in the project's .env.local file. Restart the dev server after saving it.
 * 7. After any later edit: Deploy -> Manage deployments -> Edit -> Version:
 *    New version -> Deploy. This keeps the same URL.
 */

// Every form submission (demo, career enquiry, job application) goes here.
var NOTIFY_EMAIL = "info@iqline.co.in"

var FORM_TITLES = {
  demo: "New Demo Request",
  career_contact: "New Career Enquiry",
  job_application: "New Job Application",
}

var FIELD_LABELS = {
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

var HIDDEN_FIELDS = ["formType", "resumeBase64", "resumeFileName"]

// ---------------------------------------------------------------------------
// Entry point — handles POST requests from the website
// ---------------------------------------------------------------------------
function doPost(e) {
  try {
    var data
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents)
    } else if (e.parameter && e.parameter.data) {
      data = JSON.parse(e.parameter.data)
    } else {
      return jsonResponse({ success: false, message: "No data received" })
    }

    sendSubmissionEmail(data)
    return jsonResponse({ success: true, message: "Form submitted successfully" })
  } catch (err) {
    Logger.log("doPost error: " + err.toString())
    return jsonResponse({ success: false, message: err.toString() })
  }
}

// ---------------------------------------------------------------------------
// Build and send the notification email with every submitted field
// ---------------------------------------------------------------------------
function sendSubmissionEmail(data) {
  var title = FORM_TITLES[data.formType] || "New Website Form Submission"
  var detail = data.productInterest || data.subject || data.position || ""
  var subject = title + ": " + (data.name || "Unknown") + (detail ? " — " + detail : "")

  var rows = ""
  Object.keys(data).forEach(function (key) {
    if (HIDDEN_FIELDS.indexOf(key) !== -1) return
    var value = data[key]
    if (value === null || value === undefined || value === "") return
    rows +=
      "<tr>" +
      '<td style="padding:6px 12px;border:1px solid #ddd;background:#f6f6f6;font-weight:bold;vertical-align:top">' +
      escapeHtml(FIELD_LABELS[key] || key) +
      "</td>" +
      '<td style="padding:6px 12px;border:1px solid #ddd;white-space:pre-wrap">' +
      escapeHtml(String(value)) +
      "</td>" +
      "</tr>"
  })

  var htmlBody =
    "<h2>" + escapeHtml(title) + "</h2>" +
    '<table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">' +
    rows +
    "</table>" +
    "<hr><p><small>Submitted via IQ-Line website</small></p>"

  var options = {
    to: NOTIFY_EMAIL,
    subject: subject,
    htmlBody: htmlBody,
  }

  if (data.email) options.replyTo = data.email

  if (data.resumeBase64 && data.resumeFileName) {
    var attachment = resumeBlob(data.resumeBase64, data.resumeFileName)
    if (attachment) options.attachments = [attachment]
  }

  MailApp.sendEmail(options)
}

// ---------------------------------------------------------------------------
// Turn a base64 data URL ("data:application/pdf;base64,XXXX") into a blob
// ---------------------------------------------------------------------------
function resumeBlob(base64Data, fileName) {
  try {
    var parts = base64Data.split(",")
    var raw = parts.length > 1 ? parts[1] : parts[0]
    var mimeType = "application/pdf"
    if (parts.length > 1 && parts[0].indexOf(":") > -1) {
      mimeType = parts[0].split(":")[1].split(";")[0]
    }
    return Utilities.newBlob(Utilities.base64Decode(raw), mimeType, fileName)
  } catch (err) {
    Logger.log("Resume attachment failed: " + err.toString())
    return null
  }
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  )
}

// ---------------------------------------------------------------------------
// Run this once from the Apps Script editor to grant Gmail permission and
// confirm emails arrive.
// ---------------------------------------------------------------------------
function testEmail() {
  sendSubmissionEmail({
    formType: "career_contact",
    name: "Test User",
    email: "test@example.com",
    phone: "9999999999",
    subject: "Test enquiry",
    message: "This is a test submission from the Apps Script editor.",
    sourcePage: "/careers",
    timestamp: new Date().toISOString(),
  })
}
