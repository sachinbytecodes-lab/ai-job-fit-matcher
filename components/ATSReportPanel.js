export default function ATSReportPanel({ atsMissingKeywords, atsSectionChecks, atsFormattingFeedback }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="font-semibold mb-2">ATS Report</h2>
      <p className="text-gray-600 text-sm mb-2">
        Missing Keywords: {atsMissingKeywords.length ? atsMissingKeywords.join(", ") : "None"}
      </p>
      <p className="text-gray-600 text-sm mb-2">
        {atsSectionChecks.contactInfo ? "Yes" : "No"} Contact Info -{" "}
        {atsSectionChecks.experience ? "Yes" : "No"} Experience -{" "}
        {atsSectionChecks.education ? "Yes" : "No"} Education -{" "}
        {atsSectionChecks.skills ? "Yes" : "No"} Skills
      </p>
      {atsFormattingFeedback.length > 0 && (
        <p className="text-gray-600 text-sm">Formatting: {atsFormattingFeedback.join(" ")}</p>
      )}
    </div>
  );
}
