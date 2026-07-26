export default function DashboardList({ analyses }) {
  return (
    <div className="space-y-4">
      {analyses.map((a) => (
        <a
          key={a._id}
          href={`/results/${a._id}`}
          className="block bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition"
        >
          <div className="flex justify-between">
            <span className="font-medium">{a.jobTitleSnippet}</span>
            <span className="text-[var(--color-primary)] font-bold">Fit: {a.fitScore}%</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>{new Date(a.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
            <span>ATS: {a.atsScore}</span>
          </div>
        </a>
      ))}
    </div>
  );
}
