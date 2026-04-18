export default function AnalysisResult({ result }) {
    if (!result) return null;
    return (
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-gray-600">Analysis result</p>
          <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">
            Complete
          </span>
        </div>
        <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-xs font-mono text-gray-800 whitespace-pre-wrap overflow-auto max-h-80">
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
    );
  }