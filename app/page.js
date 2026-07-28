"use client";

import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center px-6 relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: "var(--color-primary)" }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-10 blur-3xl"
        style={{ background: "var(--color-accent)" }}
      />

      <span className="text-xs font-semibold tracking-wide uppercase text-[var(--color-accent)] mb-4">
        AI-Powered Career Tool
      </span>

      <h1 className="text-4xl sm:text-5xl font-bold text-[var(--color-primary)] mb-4 max-w-2xl leading-tight">
        Know your fit before you apply
      </h1>
      <p className="text-lg text-[var(--color-text-muted)] mb-10 max-w-md">
        Upload your resume. Paste a job. Get an instant fit score, skill gaps, and an ATS compatibility check.
      </p>

      <button
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        className="flex items-center gap-3 bg-[var(--color-primary)] text-white px-7 py-3.5 rounded-xl font-medium hover:bg-[var(--color-primary-dark)] shadow-lg shadow-blue-900/10"
      >
        <svg width="18" height="18" viewBox="0 0 18 18">
          <path fill="#fff" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84c-.21 1.13-.84 2.09-1.8 2.73v2.27h2.91c1.7-1.57 2.69-3.88 2.69-6.64z"/>
          <path fill="#fff" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.27c-.81.54-1.84.86-3.05.86-2.35 0-4.34-1.58-5.05-3.71H.94v2.34C2.42 15.98 5.48 18 9 18z"/>
          <path fill="#fff" d="M3.95 10.7c-.18-.54-.28-1.11-.28-1.7s.1-1.16.28-1.7V4.96H.94A8.996 8.996 0 000 9c0 1.45.35 2.83.94 4.04l3.01-2.34z"/>
          <path fill="#fff" d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0 5.48 0 2.42 2.02.94 4.96l3.01 2.34C4.66 5.16 6.65 3.58 9 3.58z"/>
        </svg>
        Sign in with Google
      </button>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl text-left">
        <div>
          <div className="text-2xl mb-2">📄</div>
          <p className="font-semibold text-sm mb-1">Upload once</p>
          <p className="text-xs text-[var(--color-text-muted)]">PDF or DOCX resume, no formatting needed</p>
        </div>
        <div>
          <div className="text-2xl mb-2">🎯</div>
          <p className="font-semibold text-sm mb-1">Instant scoring</p>
          <p className="text-xs text-[var(--color-text-muted)]">Fit score and ATS compatibility in seconds</p>
        </div>
        <div>
          <div className="text-2xl mb-2">💡</div>
          <p className="font-semibold text-sm mb-1">Actionable tips</p>
          <p className="text-xs text-[var(--color-text-muted)]">Know exactly what to add or fix</p>
        </div>
      </div>
    </main>
  );
}