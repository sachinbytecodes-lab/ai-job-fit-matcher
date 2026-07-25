"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import UploadForm from "@/components/UploadForm";

export default function Analyze() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function handleSubmit({ file, jobDescription }) {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobDescription", jobDescription);

      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-[var(--color-primary)] mb-6">
          New Job-Fit Analysis
        </h1>

        <UploadForm onSubmit={handleSubmit} loading={loading} />

        {loading && (
          <div className="mt-8 text-center text-gray-500">
            ⟳ Analyzing your fit — this can take 10–20 seconds...
          </div>
        )}

        {error && (
          <div className="mt-8 bg-red-50 text-red-600 rounded-lg p-4 text-sm">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-8 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <p className="text-sm text-gray-500 mb-1">Job-Fit Score</p>
                <p className="text-3xl font-bold text-[var(--color-primary)]">{result.fitScore}%</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <p className="text-sm text-gray-500 mb-1">ATS Compatibility</p>
                <p className="text-3xl font-bold text-[var(--color-accent)]">{result.atsScore} / 100</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-semibold mb-2">✅ Matching Skills</h2>
              <p className="text-gray-600 text-sm">
                {result.matchingSkills.length ? result.matchingSkills.join(" · ") : "None found"}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-semibold mb-2">⚠️ Missing Skills</h2>
              <p className="text-gray-600 text-sm">
                {result.missingSkills.length ? result.missingSkills.join(" · ") : "None found"}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-semibold mb-2">💡 Suggestions</h2>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                {result.suggestions.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-semibold mb-2">🔍 ATS Report</h2>
              <p className="text-gray-600 text-sm mb-2">
                Missing Keywords:{" "}
                {result.atsMissingKeywords.length ? result.atsMissingKeywords.join(", ") : "None"}
              </p>
              <p className="text-gray-600 text-sm mb-2">
                {result.atsSectionChecks.contactInfo ? "✅" : "❌"} Contact Info{"  "}
                {result.atsSectionChecks.experience ? "✅" : "❌"} Experience{"  "}
                {result.atsSectionChecks.education ? "✅" : "❌"} Education{"  "}
                {result.atsSectionChecks.skills ? "✅" : "❌"} Skills
              </p>
              {result.atsFormattingFeedback.length > 0 && (
                <p className="text-gray-600 text-sm">
                  Formatting: {result.atsFormattingFeedback.join(" ")}
                </p>
              )}
            </div>

            <p className="text-xs text-gray-400 text-center">
              (This result is not saved yet — the dashboard and history feature is built on Day 6.)
            </p>
          </div>
        )}
      </main>
    </>
  );
}