"use client";

import { useEffect, useState, use } from "react";
import Navbar from "@/components/Navbar";
import ResultCard from "@/components/ResultCard";

function ResultsSkeleton() {
  return (
    <div className="space-y-5 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/2" />
      <div className="grid grid-cols-2 gap-4">
        <div className="card h-28" />
        <div className="card h-28" />
      </div>
      <div className="card h-24" />
      <div className="card h-24" />
      <div className="card h-32" />
    </div>
  );
}

export default function Results({ params }) {
  const { id } = use(params);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAnalysis() {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      try {
        const res = await fetch("/api/analyses/" + id, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Could not load this analysis.");
        }

        setResult(data);
      } catch (err) {
        if (err.name === "AbortError") {
          setError("This is taking longer than expected. Please refresh the page.");
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchAnalysis();
  }, [id]);

  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 py-10 w-full">
        {loading && <ResultsSkeleton />}

        {error && (
          <div className="bg-red-50 text-red-600 rounded-xl p-4 text-sm border border-red-100">{error}</div>
        )}

        {result && (
          <>
            <div className="mb-6">
              <h1 className="text-xl font-bold text-[var(--color-text)]">{result.jobTitleSnippet}</h1>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">
                {new Date(result.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>

            <ResultCard result={result} />

            <a
              href="/dashboard"
              className="text-[var(--color-primary)] font-medium mt-8 inline-flex items-center gap-1 text-sm"
            >
              ← Back to Dashboard
            </a>
          </>
        )}
      </main>
    </>
  );
}
