"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import UploadForm from "@/components/UploadForm";

export default function Analyze() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit({ file, jobDescription }) {
    setLoading(true);
    setError("");

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

      router.push(`/results/${data.analysisId}`);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto px-6 py-10 w-full">
        <h1 className="text-2xl font-bold text-[var(--color-text)] mb-1">
          New Job-Fit Analysis
        </h1>
        <p className="text-sm text-[var(--color-text-muted)] mb-8">
          Upload your resume and paste a job description to get started
        </p>

        <div className="card p-6 sm:p-8">
          <UploadForm onSubmit={handleSubmit} loading={loading} />
        </div>

        {loading && (
          <div className="mt-6 text-center text-sm text-[var(--color-text-muted)]">
            This usually takes 10-20 seconds...
          </div>
        )}

        {error && (
          <div className="mt-6 bg-red-50 text-red-600 rounded-xl p-4 text-sm border border-red-100" role="alert">
            {error}
          </div>
        )}
      </main>
    </>
  );
}
