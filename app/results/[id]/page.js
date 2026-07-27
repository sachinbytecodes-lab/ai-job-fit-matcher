"use client";

import { useEffect, useState, use } from "react";
import Navbar from "@/components/Navbar";
import ResultCard from "@/components/ResultCard";

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
        const res = await fetch(`/api/analyses/${id}`, { signal: controller.signal });
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
        {loading && <p className="text-gray-500">Loading analysis...</p>}

        {error && (
          <div className="bg-red-50 text-red-600 rounded-lg p-4 text-sm">{error}</div>
        )}

        {result && (
          <>
            <h1 className="text-xl font-bold mb-6">
              {result.jobTitleSnippet} -{" "}
              {new Date(result.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </h1>

            <ResultCard result={result} />

            <a href="/dashboard" className="text-[var(--color-primary)] font-medium mt-8 inline-block">
              &larr; Back to Dashboard
            </a>
          </>
        )}
      </main>
    </>
  );
}
