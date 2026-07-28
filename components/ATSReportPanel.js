export default function ATSReportPanel({ atsMissingKeywords, atsSectionChecks, atsFormattingFeedback }) {
  const checks = [
    { label: "Contact Info", ok: atsSectionChecks.contactInfo },
    { label: "Experience", ok: atsSectionChecks.experience },
    { label: "Education", ok: atsSectionChecks.education },
    { label: "Skills", ok: atsSectionChecks.skills },
  ];

  return (
    <div className="card p-6">
      <h2 className="font-semibold text-[var(--color-text)] mb-4">ATS Report</h2>

      <p className="text-xs font-medium text-[var(--color-text-muted)] mb-2 uppercase tracking-wide">
        Missing Keywords
      </p>
      <div className="flex flex-wrap gap-2 mb-5">
        {atsMissingKeywords.length ? (
          atsMissingKeywords.map((kw, i) => (
            <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
              {kw}
            </span>
          ))
        ) : (
          <p className="text-sm text-[var(--color-text-muted)]">None</p>
        )}
      </div>

      <p className="text-xs font-medium text-[var(--color-text-muted)] mb-2 uppercase tracking-wide">
        Section Checks
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
        {checks.map((c) => (
          <div
            key={c.label}
            className={
              "text-xs font-medium rounded-lg px-2 py-2 text-center " +
              (c.ok ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500")
            }
          >
            {c.ok ? "✓" : "✕"} {c.label}
          </div>
        ))}
      </div>

      {atsFormattingFeedback.length > 0 && (
        <>
          <p className="text-xs font-medium text-[var(--color-text-muted)] mb-2 uppercase tracking-wide">
            Formatting Notes
          </p>
          <p className="text-sm text-[var(--color-text-muted)]">{atsFormattingFeedback.join(" ")}</p>
        </>
      )}
    </div>
  );
}
