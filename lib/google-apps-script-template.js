/**
 * IQ-Line Website — Google Apps Script Backend
 *
 * This file is a REFERENCE TEMPLATE. It is NOT used by the React application.
 * Copy-paste its contents into the Google Apps Script editor to set up the
 * backend that receives form submissions from the IQ-Line website.
 *
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com and create a new project.
 * 2. Paste this entire script into the editor (replace any default code).
 * 3. Create a Google Sheet and copy its ID from the URL
 *    (the long string between /d/ and /edit in the sheet URL).
 * 4. Replace SPREADSHEET_ID below with your sheet ID.
 * 5. Create three tabs (sheets) in the spreadsheet:
 *    - "Demo Leads"
 *    - "Job Applications"
 *    - "Career Enquiries"
 * 6. Add header rows to each tab:
 *    Demo Leads:
 *      Timestamp | Name | Email | Phone | Organization | Product Interest | Message | Source Page | Source CTA | Status
 *    Job Applications:
 *      Timestamp | Name | Email | Phone | Position | Resume Link | LinkedIn | Source Page | Status
 *    Career Enquiries:
 *      Timestamp | Name | Email | Phone | Subject | Message | Source Page | Status
 * 7. Deploy the script:
 *    Deploy -> New deployment -> Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 8. Copy the deployment URL and set it as VITE_GOOGLE_APPS_SCRIPT_URL in
 *    your project's .env file.
 */

var SPREADSHEET_ID = "1lOwivi6fQKQ_MKlGzRjz9ylCiwgzPf0jm1vSYm6WvrQ"

// Optional: email addresses for notifications
var NOTIFY_DEMO_EMAIL = "sales@iqline.co.in"
var NOTIFY_JOB_EMAIL = "careers@iqline.co.in"

// ---------------------------------------------------------------------------
// Entry point — handles POST requests from the website
// ---------------------------------------------------------------------------
function doPost(e) {
  try {
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID)
    var data

    // Parse the incoming data — always JSON via text/plain
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents)
    } else if (e.parameter && e.parameter.data) {
      data = JSON.parse(e.parameter.data)
    } else {
      return jsonResponse({ success: false, message: "No data received" })
    }

    Logger.log("Received formType: " + data.formType)
    Logger.log("Has resumeBase64: " + !!data.resumeBase64)

    var result
    if (data.formType === "demo") {
      result = handleDemoLead(ss, data)
    } else if (data.formType === "job_application") {
      result = handleJobApplication(ss, data)
    } else if (data.formType === "career_contact") {
      result = handleCareerContact(ss, data)
    } else {
      return jsonResponse({ success: false, message: "Unknown form type" })
    }

    return jsonResponse(result)
  } catch (err) {
    Logger.log("doPost error: " + err.toString())
    return jsonResponse({ success: false, message: err.toString() })
  }
}

// ---------------------------------------------------------------------------
// Demo lead handler
// ---------------------------------------------------------------------------
function handleDemoLead(ss, data) {
  var sheet = ss.getSheetByName("Demo Leads")
  if (!sheet) throw new Error("Sheet 'Demo Leads' not found")

  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.name || "",
    data.email || "",
    data.phone || "",
    data.organization || "",
    data.productInterest || "",
    data.message || "",
    data.sourcePage || "",
    data.sourceCta || "",
    "New", // default status
  ])

  // Send notification email
  if (NOTIFY_DEMO_EMAIL) {
    try {
      MailApp.sendEmail({
        to: NOTIFY_DEMO_EMAIL,
        subject:
          "New Demo Request: " +
          data.name +
          " — " +
          (data.productInterest || "General"),
        htmlBody:
          "<h2>New Demo Request</h2>" +
          "<p><strong>Name:</strong> " +
          data.name +
          "</p>" +
          "<p><strong>Email:</strong> " +
          data.email +
          "</p>" +
          "<p><strong>Phone:</strong> " +
          (data.phone || "Not provided") +
          "</p>" +
          "<p><strong>Organization:</strong> " +
          (data.organization || "Not provided") +
          "</p>" +
          "<p><strong>Product Interest:</strong> " +
          (data.productInterest || "Not specified") +
          "</p>" +
          "<p><strong>Message:</strong> " +
          (data.message || "No message") +
          "</p>" +
          "<p><strong>Source:</strong> " +
          data.sourcePage +
          " / " +
          data.sourceCta +
          "</p>" +
          "<hr>" +
          "<p><small>Submitted via IQ-Line website</small></p>",
      })
    } catch (emailErr) {
      // Don't fail the form submission if email fails
      Logger.log("Email notification failed: " + emailErr.toString())
    }
  }

  return { success: true, message: "Demo request submitted successfully" }
}

// ---------------------------------------------------------------------------
// Job application handler
// ---------------------------------------------------------------------------
function handleJobApplication(ss, data) {
  var sheet = ss.getSheetByName("Job Applications")
  if (!sheet) throw new Error("Sheet 'Job Applications' not found")

  var resumeLink = data.resumeUrl || ""

  // Save base64 resume to Google Drive
  if (data.resumeBase64 && data.resumeFileName) {
    try {
      resumeLink = saveResumeToDrive(
        data.resumeBase64,
        data.resumeFileName,
        data.name
      )
    } catch (fileErr) {
      Logger.log("Resume base64 upload failed: " + fileErr.toString())
      resumeLink = "[Upload failed] " + (data.resumeUrl || "")
    }
  }

  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.name || "",
    data.email || "",
    data.phone || "",
    data.position || "",
    resumeLink,
    data.linkedinUrl || "",
    data.sourcePage || "",
    "Received", // default status
  ])

  // Send notification email
  if (NOTIFY_JOB_EMAIL) {
    try {
      MailApp.sendEmail({
        to: NOTIFY_JOB_EMAIL,
        subject: "New Application: " + data.name + " — " + data.position,
        htmlBody:
          "<h2>New Job Application</h2>" +
          "<p><strong>Name:</strong> " +
          data.name +
          "</p>" +
          "<p><strong>Email:</strong> " +
          data.email +
          "</p>" +
          "<p><strong>Phone:</strong> " +
          (data.phone || "Not provided") +
          "</p>" +
          "<p><strong>Position:</strong> " +
          data.position +
          "</p>" +
          "<p><strong>Resume:</strong> " +
          (resumeLink
            ? '<a href="' + resumeLink + '">View Resume</a>'
            : "Not uploaded") +
          "</p>" +
          "<p><strong>LinkedIn:</strong> " +
          (data.linkedinUrl
            ? '<a href="' + data.linkedinUrl + '">' + data.linkedinUrl + "</a>"
            : "Not provided") +
          "</p>" +
          "<hr>" +
          "<p><small>Submitted via IQ-Line website</small></p>",
      })
    } catch (emailErr) {
      Logger.log("Email notification failed: " + emailErr.toString())
    }
  }

  return { success: true, message: "Application submitted successfully" }
}

// ---------------------------------------------------------------------------
// Career contact handler
// ---------------------------------------------------------------------------
function handleCareerContact(ss, data) {
  var sheet = ss.getSheetByName("Career Enquiries")
  if (!sheet) throw new Error("Sheet 'Career Enquiries' not found")

  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.name || "",
    data.email || "",
    data.phone || "",
    data.subject || "",
    data.message || "",
    data.sourcePage || "",
    "New",
  ])

  if (NOTIFY_JOB_EMAIL) {
    try {
      MailApp.sendEmail({
        to: NOTIFY_JOB_EMAIL,
        subject: "Career enquiry: " + data.name + " — " + (data.subject || "General"),
        htmlBody:
          "<h2>New Career Enquiry</h2>" +
          "<p><strong>Name:</strong> " +
          data.name +
          "</p>" +
          "<p><strong>Email:</strong> " +
          data.email +
          "</p>" +
          "<p><strong>Phone:</strong> " +
          (data.phone || "Not provided") +
          "</p>" +
          "<p><strong>Subject:</strong> " +
          (data.subject || "Not specified") +
          "</p>" +
          "<p><strong>Message:</strong> " +
          (data.message || "No message") +
          "</p>" +
          "<p><strong>Source:</strong> " +
          data.sourcePage +
          "</p>" +
          "<hr>" +
          "<p><small>Submitted via IQ-Line website</small></p>",
      })
    } catch (emailErr) {
      Logger.log("Email notification failed: " + emailErr.toString())
    }
  }

  return { success: true, message: "Message sent successfully" }
}

// ---------------------------------------------------------------------------
// Save uploaded file blob directly to Google Drive (multipart upload)
// ---------------------------------------------------------------------------
function saveBlobToDrive(blob, applicantName) {
  // Create or get the "IQ-Line Resumes" folder
  var folders = DriveApp.getFoldersByName("IQ-Line Resumes")
  var folder
  if (folders.hasNext()) {
    folder = folders.next()
  } else {
    folder = DriveApp.createFolder("IQ-Line Resumes")
  }

  var safeName = (applicantName || "Unknown")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .trim()
  var originalName = blob.getName ? blob.getName() : "resume.pdf"
  var finalName = safeName ? safeName + " - " + originalName : originalName

  var file = folder.createFile(blob).setName(finalName)
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW)

  return file.getUrl()
}

// ---------------------------------------------------------------------------
// Save resume file to Google Drive from base64 data (fallback)
// ---------------------------------------------------------------------------
function saveResumeToDrive(base64Data, fileName, applicantName) {
  // base64Data comes as a data URL: "data:application/pdf;base64,XXXXX..."
  // Strip the prefix to get raw base64
  var parts = base64Data.split(",")
  var raw = parts.length > 1 ? parts[1] : parts[0]

  // Detect MIME type from the data URL prefix
  var mimeType = "application/pdf"
  if (parts.length > 1 && parts[0].indexOf(":") > -1) {
    mimeType = parts[0].split(":")[1].split(";")[0]
  }

  var blob = Utilities.newBlob(Utilities.base64Decode(raw), mimeType, fileName)

  // Create or get the "IQ-Line Resumes" folder
  var folders = DriveApp.getFoldersByName("IQ-Line Resumes")
  var folder
  if (folders.hasNext()) {
    folder = folders.next()
  } else {
    folder = DriveApp.createFolder("IQ-Line Resumes")
  }

  // Save with a prefixed name: "ApplicantName - OriginalFileName"
  var safeName = applicantName.replace(/[^a-zA-Z0-9 ]/g, "").trim()
  var finalName = safeName ? safeName + " - " + fileName : fileName
  var file = folder.createFile(blob.setName(finalName))

  // Make the file viewable by anyone with the link
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW)

  return file.getUrl()
}

// ---------------------------------------------------------------------------
// Utility — return a JSON response
// ---------------------------------------------------------------------------
function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  )
}

// ---------------------------------------------------------------------------
// Test function — run this in the Apps Script editor to verify setup
// ---------------------------------------------------------------------------
function testSetup() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID)
  var demoSheet = ss.getSheetByName("Demo Leads")
  var jobSheet = ss.getSheetByName("Job Applications")
  var careerSheet = ss.getSheetByName("Career Enquiries")

  if (!demoSheet) Logger.log("ERROR: 'Demo Leads' sheet not found!")
  else Logger.log("OK: 'Demo Leads' sheet found")

  if (!jobSheet) Logger.log("ERROR: 'Job Applications' sheet not found!")
  else Logger.log("OK: 'Job Applications' sheet found")

  if (!careerSheet) Logger.log("ERROR: 'Career Enquiries' sheet not found!")
  else Logger.log("OK: 'Career Enquiries' sheet found")
}
