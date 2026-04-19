const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function analyzeResume({ file, resumeText, activeTab, jobDescription }) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  try {
    const form = new FormData();

    if (activeTab === "file" && file) {
      form.append("file", file);
    } else {
      form.append("resume_text", resumeText);
    }

    form.append("job_description", jobDescription);

    const res = await fetch(`${API_URL}/match`, {
      method: "POST",
      body: form,
      signal: controller.signal,
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.detail || errorData.error || "Something went wrong");
    }

    return await res.json();
  } catch (err) {
    if (err.name === "AbortError") {
      throw new Error("Request timed out. Try again.");
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}