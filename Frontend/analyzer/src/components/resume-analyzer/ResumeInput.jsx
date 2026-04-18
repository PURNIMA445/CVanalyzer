"use client";
import { useState } from "react";

export default function ResumeInput({ onTabChange, onFileChange, onTextChange }) {
  const [activeTab, setActiveTab] = useState("file");
  const [fileName, setFileName] = useState("");

  const switchTab = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (f) { setFileName(f.name); onFileChange(f); }
  };

  return (
    <div>
      <p className="text-sm font-medium text-gray-600 mb-2">Resume input</p>
      <div className="flex gap-2 mb-3">
        {["file", "paste"].map((tab) => (
          <button
            key={tab}
            onClick={() => switchTab(tab)}
            className={`text-sm px-3 py-1.5 rounded-lg transition-all ${
              activeTab === tab
                ? "bg-gray-100 text-gray-900 font-medium border border-gray-200"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            {tab === "file" ? "Upload file" : "Paste text"}
          </button>
        ))}
      </div>

      {activeTab === "file" ? (
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-lg p-6 cursor-pointer hover:bg-gray-50 hover:border-blue-300 transition-all">
          <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center mb-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-800">
            {fileName || "Click to upload or drag & drop"}
          </p>
          <p className="text-xs text-gray-400 mt-1">.txt, .pdf, .doc, .docx</p>
          <input type="file" className="hidden" accept=".txt,.pdf,.doc,.docx" onChange={handleFile} />
        </label>
      ) : (
        <textarea
          className="w-full border border-gray-200 rounded-lg p-3 text-sm text-gray-800 resize-y focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
          rows={6}
          placeholder="Paste your resume content here…"
          onChange={(e) => onTextChange(e.target.value)}
        />
      )}
    </div>
  );
}