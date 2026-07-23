"use client";

import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      <h1 className="text-4xl font-bold text-[var(--color-primary)] mb-4">
        AI Job-Fit Matcher
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-md">
        Know your fit before you apply. Upload your resume. Paste a job. Get clarity.
      </p>
      <button
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-medium hover:opacity-90"
      >
        Sign in with Google
      </button>
    </main>
  );
}