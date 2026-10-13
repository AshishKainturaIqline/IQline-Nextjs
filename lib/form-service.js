const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL || "";
function isConfigured() {
  return APPS_SCRIPT_URL.length > 0;
}
async function postToAppsScript(payload) {
  if (!isConfigured()) {
    console.warn(
      "[form-service] Google Apps Script URL is not configured. Set VITE_GOOGLE_APPS_SCRIPT_URL in your .env file."
    );
    return {
      success: false,
      message: "Form submission is not configured yet. Please contact the site administrator."
    };
  }
  const body = JSON.stringify({
    ...payload,
    timestamp: new Date().toISOString()
  });
  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body
    });
    if (response.ok) {
      try {
        const data = await response.json();
        return data;
      } catch {
        return { success: true, message: "Form submitted successfully." };
      }
    }
    return {
      success: false,
      message: `Server responded with status ${response.status}. Please try again later.`
    };
  } catch (error) {
    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body
      });
      return {
        success: true,
        message: "Form submitted successfully."
      };
    } catch (retryError) {
      const errorMessage = retryError instanceof Error ? retryError.message : String(retryError);
      console.error("[form-service] Network error on retry:", errorMessage);
      return {
        success: false,
        message: "Unable to reach the server. Please check your internet connection and try again."
      };
    }
  }
}
async function submitDemoForm(data) {
  return postToAppsScript({ formType: "demo", ...data });
}
async function submitJobApplication(data) {
  return postToAppsScript({ formType: "job_application", ...data });
}
async function submitCareerContact(data) {
  return postToAppsScript({ formType: "career_contact", ...data });
}
export {
  isConfigured,
  submitCareerContact,
  submitDemoForm,
  submitJobApplication
};
