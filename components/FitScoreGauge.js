export default function FitScoreGauge({ label, score, color }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 text-center">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-3xl font-bold" style={{ color }}>
        {score}
        {label.includes("ATS") ? " / 100" : "%"}
      </p>
    </div>
  );
}
