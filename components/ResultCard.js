import FitScoreGauge from "./FitScoreGauge";
import ATSReportPanel from "./ATSReportPanel";

export default function ResultCard({ result }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <FitScoreGauge label="Job-Fit Score" score={result.fitScore} color="var(--color-primary)" />
        <FitScoreGauge label="ATS Compatibility" score={result.atsScore} color="var(--color-accent)" />
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="font-semibold mb-2">Matching Skills</h2>
        <p className="text-gray-600 text-sm">
          {result.matchingSkills.length ? result.matchingSkills.join(" - ") : "None found"}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="font-semibold mb-2">Missing Skills</h2>
        <p className="text-gray-600 text-sm">
          {result.missingSkills.length ? result.missingSkills.join(" - ") : "None found"}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="font-semibold mb-2">Suggestions</h2>
        <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
          {result.suggestions.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>

      <ATSReportPanel
        atsMissingKeywords={result.atsMissingKeywords}
        atsSectionChecks={result.atsSectionChecks}
        atsFormattingFeedback={result.atsFormattingFeedback}
      />
    </div>
  );
}
