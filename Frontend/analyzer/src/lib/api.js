const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function analyzeResume({ resume, job_description }) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(`${API_URL}/match`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resume, job_description }),
      signal: controller.signal,
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Something went wrong");
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