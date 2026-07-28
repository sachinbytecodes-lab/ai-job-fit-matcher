"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import DashboardList from "@/components/DashboardList";

function SkeletonCard() {
  return (
    <div className="card p-5 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="space-y-2 w-2/3">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-100 rounded w-1/3" />
        </div>
        <div className="h-7 w-20 bg-gray-200 rounded-full" />
      </div>
    </div>
  );
}

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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-text)]">Your Analyses</h1>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">
              {analyses.length > 0 ? analyses.length + " analyses" : "Track your job-fit history"}
            </p>
          </div>
            <a
            href="/analyze"
            className="bg-[var(--color-primary)] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[var(--color-primary-dark)] shadow-sm whitespace-nowrap"
          >
            + New Analysis
          </a>
        </div>

        {loading && (
          <div className="space-y-3">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 rounded-xl p-4 text-sm border border-red-100">{error}</div>
        )}

        {!loading && !error && analyses.length === 0 && (
          <div className="card text-center py-16 px-6">
            <div className="text-4xl mb-4">📋</div>
            <p className="text-[var(--color-text)] font-medium mb-1">No analyses yet</p>
            <p className="text-sm text-[var(--color-text-muted)] mb-6">Upload a resume and job description to get started</p>
              <a
              href="/analyze"
              className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-medium inline-block hover:bg-[var(--color-primary-dark)]"
            >
              + Start Your First Analysis
            </a>
          </div>
        )}

        {!loading && !error && analyses.length > 0 && <DashboardList analyses={analyses} />}
      </main>
    </>
  );
}
