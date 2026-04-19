"use client";

export default function AnalysisResult({ result }) {
  if (!result) return null;

  const {
    score = 0,
    matched_keywords = [],
    missing_keywords = [],
    total_job_keywords = 0,
    total_matched = 0
  } = result;

  const scoreColor =
    score >= 75 ? "text-green-600" :
    score >= 50 ? "text-amber-500" :
    "text-red-500";

  const scoreBg =
    score >= 75 ? "bg-green-50 border-green-200" :
    score >= 50 ? "bg-amber-50 border-amber-200" :
    "bg-red-50 border-red-200";

  const scoreLabel =
    score >= 75 ? "Strong match" :
    score >= 50 ? "Partial match" :
    "Low match";

  const circumference = 2 * Math.PI * 40;
  const dash = (score / 100) * circumference;

  return (
    <div className="space-y-4">

      {/* SCORE CARD */}
      <div className={`border rounded-xl p-6 flex items-center gap-6 ${scoreBg}`}>
        <div className="relative w-24 h-24">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="10" fill="none" />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke={score >= 75 ? "#16a34a" : score >= 50 ? "#f59e0b" : "#dc2626"}
              strokeWidth="10"
              fill="none"
              strokeDasharray={`${dash} ${circumference}`}
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-xl font-bold ${scoreColor}`}>
              {score}%
            </span>
          </div>
        </div>

        <div>
          <p className={`font-semibold ${scoreColor}`}>
            {scoreLabel}
          </p>

          <p className="text-sm text-gray-500">
            {total_matched} of {total_job_keywords} keywords matched
          </p>
        </div>
      </div>

      {/* KEYWORDS */}
      <div className="grid grid-cols-2 gap-4">

        <div className="border rounded-xl p-4">
          <p className="font-medium mb-2">Matched</p>
          <div className="flex flex-wrap gap-2">
            {matched_keywords.length ? matched_keywords.map((k, i) => (
              <span key={i} className="bg-green-100 px-2 py-1 text-xs rounded">
                {k}
              </span>
            )) : <p className="text-xs text-gray-400">None</p>}
          </div>
        </div>

        <div className="border rounded-xl p-4">
          <p className="font-medium mb-2">Missing</p>
          <div className="flex flex-wrap gap-2">
            {missing_keywords.length ? missing_keywords.map((k, i) => (
              <span key={i} className="bg-red-100 px-2 py-1 text-xs rounded">
                {k}
              </span>
            )) : <p className="text-xs text-gray-400">None</p>}
          </div>
        </div>

      </div>

    </div>
  );
}