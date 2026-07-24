"use client";

import { useState } from "react";

export default function UploadForm({ onSubmit, loading }) {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [fileError, setFileError] = useState("");
  const [jdError, setJdError] = useState("");

  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  function handleFileChange(e) {
    const selected = e.target.files[0];
    setFileError("");
    setFile(null);

    if (!selected) return;

    const isValidType =
      ALLOWED_TYPES.includes(selected.type) ||
      selected.name.toLowerCase().endsWith(".pdf") ||
      selected.name.toLowerCase().endsWith(".docx");

    if (!isValidType) {
      setFileError("Only PDF or DOCX files are allowed.");
      return;
    }

    if (selected.size > MAX_SIZE) {
      setFileError("File is too large. Max size is 5MB.");
      return;
    }

    setFile(selected);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setFileError("");
    setJdError("");

    let hasError = false;

    if (!file) {
      setFileError("Please upload a resume (PDF or DOCX).");
      hasError = true;
    }

    if (jobDescription.trim().length < 50) {
      setJdError("Job description must be at least 50 characters.");
      hasError = true;
    }

    if (hasError) return;

    onSubmit({ file, jobDescription });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block font-medium mb-2">Resume (PDF or DOCX)</label>
        <label className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500 block cursor-pointer hover:border-[var(--color-primary)] transition">
          {file ? (
            <span className="text-[var(--color-primary)] font-medium">{file.name}</span>
          ) : (
            <span>Click or drag file to upload</span>
          )}
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        {fileError && <p className="text-red-500 text-sm mt-2">{fileError}</p>}
      </div>

      <div>
        <label className="block font-medium mb-2">Job Description</label>
        <textarea
          rows={8}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste job description here..."
          className="w-full border border-gray-300 rounded-lg p-3"
        />
        <p className="text-xs text-gray-400 mt-1">{jobDescription.length} / 50 minimum characters</p>
        {jdError && <p className="text-red-500 text-sm mt-2">{jdError}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[var(--color-primary)] text-white py-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Analyze Fit"}
      </button>
    </form>
  );
}