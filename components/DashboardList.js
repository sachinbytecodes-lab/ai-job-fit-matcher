import Link from "next/link";

function scoreColor(score) {
  if (score >= 70) {
    return { bg: "#e8f5e9", text: "#2e7d32" };
  }
  if (score >= 40) {
    return { bg: "#fff8e1", text: "#b8860b" };
  }
  return { bg: "#fdecea", text: "#c0392b" };
}

export default function DashboardList({ analyses }) {
  return (
    <div className="space-y-3">
      {analyses.map((item) => {
        const fit = scoreColor(item.fitScore);
        return (
          <Link
            key={item._id}
            href={"/results/" + item._id}
            className="card card-hover block p-5"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="font-semibold text-[var(--color-text)] truncate">
                  {item.jobTitleSnippet}
                </p>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">
                  {new Date(item.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{ background: fit.bg, color: fit.text }}
                >
                  ATS {item.atsScore}
                </span>
                <span
                  className="text-sm font-bold px-3 py-1.5 rounded-full"
                  style={{ background: fit.bg, color: fit.text }}
                >
                  {item.fitScore}% Fit
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}