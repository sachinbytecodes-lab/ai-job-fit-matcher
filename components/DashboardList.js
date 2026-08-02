"use client";

import { useState } from "react";

function scoreColor(score) {
  if (score >= 70) {
    return { bg: "#e8f5e9", text: "#2e7d32" };
  }
  if (score >= 40) {
    return { bg: "#fff8e1", text: "#b8860b" };
  }
  return { bg: "#fdecea", text: "#c0392b" };
}

export default function DashboardList({ analyses, onDeleted }) {
  const [confirmingId, setConfirmingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  async function handleDelete(id) {
    setDeletingId(id);
    setError("");

    try {
      const res = await fetch("/api/analyses/" + id, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Could not delete this analysis.");
      }

      onDeleted(id);
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
      setConfirmingId(null);
    }
  }

  return (
    <div className="space-y-3">
      {error && (
        <div className="bg-red-50 text-red-600 rounded-xl p-3 text-sm border border-red-100">
          {error}
        </div>
      )}

      {analyses.map((item) => {
        const fit = scoreColor(item.fitScore);
        const isConfirming = confirmingId === item._id;
        const isDeleting = deletingId === item._id;

        return (
          <div key={item._id} className="card p-5">
            <div className="flex items-center justify-between gap-4">
              <a href={"/results/" + item._id} className="min-w-0 flex-1">
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
              </a>

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

                {!isConfirming ? (
                  <button
                    onClick={() => setConfirmingId(item._id)}
                    aria-label={"Delete analysis: " + item.jobTitleSnippet}
                    title="Delete"
                    className="text-gray-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0l-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6h16z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleDelete(item._id)}
                      disabled={isDeleting}
                      className="text-xs font-medium bg-red-600 text-white px-2.5 py-1.5 rounded-lg hover:bg-red-700 disabled:opacity-50"
                    >
                      {isDeleting ? "..." : "Confirm"}
                    </button>
                    <button
                      onClick={() => setConfirmingId(null)}
                      disabled={isDeleting}
                      className="text-xs font-medium text-gray-500 px-2.5 py-1.5 rounded-lg hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
