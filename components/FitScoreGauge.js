function scoreColor(score) {
  if (score >= 70) {
    return "#2e7d32";
  }
  if (score >= 40) {
    return "#b8860b";
  }
  return "#c0392b";
}

export default function FitScoreGauge({ label, score, isPercent }) {
  const color = scoreColor(score);
  return (
    <div className="card p-6 text-center">
      <p className="text-sm text-[var(--color-text-muted)] mb-2">{label}</p>
      <p className="text-4xl font-bold" style={{ color: color }}>
        {score}
        {isPercent ? "%" : " / 100"}
      </p>
    </div>
  );
}
