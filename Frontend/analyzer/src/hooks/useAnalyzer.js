import { useState } from "react";
import { analyzeResume } from "@/lib/api";

export function useAnalyzer() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyze = async ({ file, resumeText, activeTab, jobDescription }) => {
    setError("");
    setResult(null);

    const resume =
      activeTab === "file" && file ? await file.text() : resumeText.trim();

    if (!resume) { setError("Please upload a file or paste resume text."); return; }
    if (!jobDescription.trim()) { setError("Please add a job description."); return; }

    setLoading(true);
    try {
      const data = await analyzeResume({ resume, job_description: jobDescription });
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, error, analyze };
}