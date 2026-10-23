const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL || ""

export async function POST(request) {
  if (!APPS_SCRIPT_URL) {
    return Response.json({
      success: false,
      message:
        "Form email is not configured. Set NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL in .env.local and restart the dev server.",
    })
  }

  let payload
  try {
    payload = await request.json()
  } catch {
    return Response.json({ success: false, message: "Invalid form data." })
  }

  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        ...payload,
        timestamp: new Date().toISOString(),
      }),
      redirect: "follow",
    })
    const text = await response.text()

    try {
      const data = JSON.parse(text)
      return Response.json(data)
    } catch {
      const denied = text.includes("do not have permission")
      return Response.json({
        success: false,
        message: denied
          ? "Google blocked the form before it could send email. In Apps Script, open Deploy → Manage deployments → Edit, set Execute as to Me and Who has access to Anyone, choose New version, then Deploy."
          : "The form reached Google, but no email was confirmed. Redeploy the Apps Script web app and try again.",
      })
    }
  } catch {
    return Response.json({
      success: false,
      message: "Unable to reach the form service. Please try again.",
    })
  }
}
