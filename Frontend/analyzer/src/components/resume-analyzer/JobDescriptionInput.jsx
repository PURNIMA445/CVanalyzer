"use client";

export default function JobDescriptionInput({ value, onChange }) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-600 mb-2">Job description</p>
      <textarea
        className="w-full border border-gray-200 rounded-lg p-3 text-sm text-gray-800 resize-y focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
        rows={5}
        placeholder="Paste the job description you're applying for…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <p className="text-xs text-gray-400 text-right mt-1">
        {value.length.toLocaleString()} chars
      </p>
    </div>
  );
}