import Navbar from "@/components/Navbar";

export default function Analyze() {
  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-[var(--color-primary)] mb-6">
          New Job-Fit Analysis
        </h1>
        <form className="space-y-6">
          <div>
            <label className="block font-medium mb-2">Resume (PDF or DOCX)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500">
              Click or drag file to upload
            </div>
          </div>
          <div>
            <label className="block font-medium mb-2">Job Description</label>
            <textarea
              rows={8}
              placeholder="Paste job description here..."
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>
          <button
            type="button"
            className="w-full bg-[var(--color-primary)] text-white py-3 rounded-lg font-medium hover:opacity-90"
          >
            Analyze Fit
          </button>
        </form>
      </main>
    </>
  );
}