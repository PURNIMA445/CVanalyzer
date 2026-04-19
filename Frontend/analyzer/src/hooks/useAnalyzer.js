import { useState } from "react";
import { analyzeResume } from "@/lib/api";

export function useAnalyzer() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyze = async ({ file, resumeText, activeTab, jobDescription }) => {
    setError("");
    setResult(null);

    // validation only — no file.text() anymore, backend does extraction
    if (activeTab === "file" && !file) {
      setError("Please upload a file."); return;
    }
    if (activeTab === "paste" && !resumeText.trim()) {
      setError("Please paste your resume text."); return;
    }
    if (!jobDescription.trim()) {
      setError("Please add a job description."); return;
    }

    setLoading(true);
    try {
      const data = await analyzeResume({ file, resumeText, activeTab, jobDescription });
      setResult(data);
    } catch (err) {
      setError("err.message");
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, error, analyze };
}