import Navbar from "@/components/Navbar";

export default function Dashboard() {
  const mockAnalyses = [
    { id: "1", title: "Backend Engineer @ Acme Corp", date: "Jul 20, 2026", fitScore: 78, atsScore: 65 },
    { id: "2", title: "Frontend Dev @ Beta Inc", date: "Jul 18, 2026", fitScore: 54, atsScore: 48 },
  ];

  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[var(--color-primary)]">Your Analyses</h1>
          <a href="/analyze" className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg text-sm">
            + New Analysis
          </a>
        </div>
        <div className="space-y-4">
          {mockAnalyses.map((a) => (
            <a
              key={a.id}
              href={"/results/" + a.id}
              className="block bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition"
            >
              <div className="flex justify-between">
                <span className="font-medium">{a.title}</span>
                <span className="text-[var(--color-primary)] font-bold">Fit: {a.fitScore}%</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>{a.date}</span>
                <span>ATS: {a.atsScore}</span>
              </div>
            </a>
          ))}
        </div>
      </main>
    </>
  );
}
