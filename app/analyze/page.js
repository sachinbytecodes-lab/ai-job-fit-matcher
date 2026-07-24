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
            ⟳ Extracting text from your resume...
          </div>
        )}

        {error && (
          <div className="mt-8 bg-red-50 text-red-600 rounded-lg p-4 text-sm">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h2 className="font-semibold mb-3">✅ Extracted Resume Text (Debug Preview)</h2>
            <p className="text-xs text-gray-400 mb-2">
              File: {result.fileName} — {result.textLength} characters extracted
            </p>
            <pre className="whitespace-pre-wrap text-sm text-gray-600 max-h-96 overflow-y-auto border border-gray-200 rounded p-4">
              {result.extractedText}
            </pre>
          </div>
        )}
      </main>
    </>
  );
}