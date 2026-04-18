"use client";
import { useState } from "react";
import { useAnalyzer } from "@/hooks/useAnalyzer";
import ResumeInput from "./ResumeInput";
import JobDescriptionInput from "./JobDescriptionInput";
import AnalysisResult from "./AnalysisResult";

export default function ResumeAnalyzer() {
  const [activeTab, setActiveTab] = useState("file");
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const { result, loading, error, analyze } = useAnalyzer();

  const handleSubmit = () =>
    analyze({ file, resumeText, activeTab, jobDescription });

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-6">

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Resume Analyzer</h1>
            <p className="text-sm text-gray-500 mt-1">Match your resume against a job description</p>
          </div>
          <span className="text-xs font-medium bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
            AI Powered
          </span>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
          <ResumeInput
            onTabChange={setActiveTab}
            onFileChange={setFile}
            onTextChange={setResumeText}
          />
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <div className="flex-1 h-px bg-gray-100" /> Job description <div className="flex-1 h-px bg-gray-100" />
          </div>
          <JobDescriptionInput value={jobDescription} onChange={setJobDescription} />
        </div>

        {error && (
          <p className="text-sm bg-red-50 text-red-700 border border-red-200 px-4 py-2.5 rounded-lg">
            {error}
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-100 disabled:text-gray-400 text-white font-medium py-3 rounded-lg transition-all active:scale-[0.98]"
        >
          {loading ? "Analyzing…" : "Analyze resume"}
        </button>

        <AnalysisResult result={result} />
      </div>
    </main>
  );
}