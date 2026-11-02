/**
 * IQ-Line Website — Google Apps Script email backend
 *
 * SETUP
 * 1. Create a project at https://script.google.com and paste this file into it.
 * 2. Replace PASTE_THE_SAME_SECRET_FROM_ENV with GOOGLE_APPS_SCRIPT_SECRET.
 * 3. Run testEmail once and approve the requested email permission.
 * 4. Deploy as a Web app:
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Put the /exec deployment URL in GOOGLE_APPS_SCRIPT_URL.
 * 6. After changing this script, deploy a new version from Manage deployments.
 *
 * The From address is the Google account that owns the deployment. The
 * website visitor's validated email address is used as Reply-To.
 */

var WEBHOOK_SECRET = "PASTE_THE_SAME_SECRET_FROM_ENV"

function doPost(e) {
  try {
    var data = JSON.parse(e.postData && e.postData.contents ? e.postData.contents : "{}")

    if (!WEBHOOK_SECRET || data.secret !== WEBHOOK_SECRET) {
      return jsonResponse({ success: false, message: "Unauthorized" })
    }

    if (!data.to || !data.subject || !data.htmlBody) {
      return jsonResponse({ success: false, message: "Invalid email data" })
    }

    var options = {
      to: data.to,
      subject: data.subject,
      body: data.textBody || "New IQ-Line website form submission",
      htmlBody: data.htmlBody,
      name: "IQ-Line Website",
    }

    if (data.replyTo) {
      options.replyTo = data.replyTo
    }

    if (data.attachment) {
      options.attachments = [
        Utilities.newBlob(
          Utilities.base64Decode(data.attachment.base64),
          data.attachment.contentType,
          data.attachment.filename
        ),
      ]
    }

    console.log("Sending website form email to: " + data.to)
    MailApp.sendEmail(options)
    console.log("Website form email accepted for delivery to: " + data.to)
    return jsonResponse({
      success: true,
      protocol: 2,
      recipient: data.to,
      message: "Form submitted successfully",
    })
  } catch (error) {
    console.error("doPost failed", error)
    return jsonResponse({ success: false, message: "Email delivery failed" })
  }
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  )
}

function testEmail() {
  MailApp.sendEmail({
    to: Session.getActiveUser().getEmail(),
    subject: "IQ-Line Apps Script test",
    body: "The IQ-Line website email service is configured.",
    htmlBody: "<p>The IQ-Line website email service is configured.</p>",
    name: "IQ-Line Website",
  })
}
