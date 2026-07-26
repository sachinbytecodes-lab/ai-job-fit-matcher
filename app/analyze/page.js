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
        <h1 className="text-2xl font-bold text-[var(--color-primary)] mb-6">
          New Job-Fit Analysis
        </h1>

        <UploadForm onSubmit={handleSubmit} loading={loading} />

        {loading && (
          <div className="mt-8 text-center text-gray-500">
            Analyzing your fit - this can take 10-20 seconds...
          </div>
        )}

        {error && (
          <div className="mt-8 bg-red-50 text-red-600 rounded-lg p-4 text-sm">
            {error}
          </div>
        )}
      </main>
    </>
  );
}
