import Navbar from "@/components/Navbar";

export default function Results() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-xl font-bold mb-6">Backend Engineer @ Acme Corp — Jul 20, 2026</h1>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <p className="text-sm text-gray-500 mb-1">Job-Fit Score</p>
            <p className="text-3xl font-bold text-[var(--color-primary)]">78%</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <p className="text-sm text-gray-500 mb-1">ATS Compatibility</p>
            <p className="text-3xl font-bold text-[var(--color-accent)]">65 / 100</p>
          </div>
        </div>

        <section className="mb-6">
          <h2 className="font-semibold mb-2">✅ Matching Skills</h2>
          <p className="text-gray-600">React · Node.js · REST APIs</p>
        </section>

        <section className="mb-6">
          <h2 className="font-semibold mb-2">⚠️ Missing Skills</h2>
          <p className="text-gray-600">GraphQL · Docker</p>
        </section>

        <section className="mb-6">
          <h2 className="font-semibold mb-2">💡 Suggestions</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Add "GraphQL" if you've used it</li>
            <li>Mention containerization experience</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-semibold mb-2">🔍 ATS Report</h2>
          <p className="text-gray-600 mb-1">Missing Keywords: CI/CD, Agile</p>
          <p className="text-gray-600">✅ Contact Info ✅ Experience ✅ Education ❌ Skills section</p>
        </section>

        <a href="/dashboard" className="text-[var(--color-primary)] font-medium">
          ← Back to Dashboard
        </a>
      </main>
    </>
  );
}