export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-4">
        Page Not Found
      </h1>
      <p className="text-gray-600 mb-8 max-w-md">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <a
        href="/dashboard"
        className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-medium hover:opacity-90"
      >
        Back to Dashboard
      </a>
    </main>
  );
}
