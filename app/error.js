"use client";

export default function Error({ error, reset }) {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-4">
        Something went wrong
      </h1>
      <p className="text-gray-600 mb-8 max-w-md">
        An unexpected error occurred. This has been logged. Please try again.
      </p>
      <button
        onClick={reset}
        className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-medium hover:opacity-90"
      >
        Try Again
      </button>
      <a href="/dashboard" className="text-[var(--color-primary)] font-medium mt-4">
        Back to Dashboard
      </a>
    </main>
  );
}