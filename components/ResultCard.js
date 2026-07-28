import FitScoreGauge from "./FitScoreGauge";
import ATSReportPanel from "./ATSReportPanel";

export default function ResultCard({ result }) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <FitScoreGauge label="Job-Fit Score" score={result.fitScore} isPercent={true} />
        <FitScoreGauge label="ATS Compatibility" score={result.atsScore} isPercent={false} />
      </div>

      <div className="card p-6">
        <h2 className="font-semibold text-[var(--color-text)] mb-3 flex items-center gap-2">
          <span className="text-green-600">✓</span> Matching Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {result.matchingSkills.length ? (
            result.matchingSkills.map((skill, i) => (
              <span key={i} className="text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded-full">
                {skill}
              </span>
            ))
          ) : (
            <p className="text-sm text-[var(--color-text-muted)]">None found</p>
          )}
        </div>
      </div>

      <div className="card p-6">
        <h2 className="font-semibold text-[var(--color-text)] mb-3 flex items-center gap-2">
          <span className="text-amber-600">!</span> Missing Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {result.missingSkills.length ? (
            result.missingSkills.map((skill, i) => (
              <span key={i} className="text-xs bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full">
                {skill}
              </span>
            ))
          ) : (
            <p className="text-sm text-[var(--color-text-muted)]">None found</p>
          )}
        </div>
      </div>

      <div className="card p-6">
        <h2 className="font-semibold text-[var(--color-text)] mb-3">Suggestions</h2>
        <ul className="space-y-2">
          {result.suggestions.map((s, i) => (
            <li key={i} className="text-sm text-[var(--color-text-muted)] flex gap-2">
              <span className="text-[var(--color-primary)] font-bold flex-shrink-0">{i + 1}.</span>
              <span>{s}</span>
            </li>
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
