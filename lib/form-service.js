async function postForm(payload) {
  try {
    const response = await fetch("/api/forms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (data && typeof data.success === "boolean") return data;
    return {
      success: false,
      message: "The form could not be sent. Please try again."
    };
  } catch {
    return {
      success: false,
      message: "Unable to reach the server. Please check your connection and try again."
    };
  }
}
async function submitDemoForm(data) {
  return postForm({ formType: "demo", ...data });
}
async function submitJobApplication(data) {
  return postForm({ formType: "job_application", ...data });
}
async function submitCareerContact(data) {
  return postForm({ formType: "career_contact", ...data });
}
export {
  submitCareerContact,
  submitDemoForm,
  submitJobApplication
};
