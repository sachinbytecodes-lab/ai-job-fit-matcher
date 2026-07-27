"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import DashboardList from "@/components/DashboardList";

export default function Dashboard() {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAnalyses() {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      try {
        const res = await fetch("/api/analyses", { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Could not load your analyses.");
        }

        setAnalyses(data.analyses);
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

    fetchAnalyses();
  }, []);

  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 py-10 w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[var(--color-primary)]">Your Analyses</h1>
          <a href="/analyze" className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg text-sm">
            + New Analysis
          </a>
        </div>

        {loading && <p className="text-gray-500">Loading your analyses...</p>}

        {error && (
          <div className="bg-red-50 text-red-600 rounded-lg p-4 text-sm">{error}</div>
        )}

        {!loading && !error && analyses.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-4">You haven't analyzed anything yet.</p>
            <a href="/analyze" className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-medium inline-block">
              + Start Your First Analysis
            </a>
          </div>
        )}

        {!loading && !error && analyses.length > 0 && <DashboardList analyses={analyses} />}
      </main>
    </>
  );
}
