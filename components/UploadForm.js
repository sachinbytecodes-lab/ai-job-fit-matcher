"use client";

import { useState } from "react";

export default function UploadForm({ onSubmit, loading }) {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [fileError, setFileError] = useState("");
  const [jdError, setJdError] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const MAX_SIZE = 5 * 1024 * 1024;
  const MAX_JD_LENGTH = 5000;
  const ALLOWED_TYPES = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  function validateFile(selected) {
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

  function handleFileChange(e) {
    validateFile(e.target.files[0]);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragActive(false);
    validateFile(e.dataTransfer.files[0]);
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
    } else if (jobDescription.trim().length > MAX_JD_LENGTH) {
      setJdError(`Job description is too long. Please keep it under ${MAX_JD_LENGTH} characters.`);
      hasError = true;
    }
    if (hasError) return;
    onSubmit({ file, jobDescription });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="resume-upload" className="block font-medium mb-2 text-sm">
          Resume (PDF or DOCX)
        </label>
        <label
          htmlFor="resume-upload"
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-10 text-center block cursor-pointer transition-colors ${
            dragActive
              ? "border-[var(--color-primary)] bg-blue-50"
              : file
              ? "border-[var(--color-primary)] bg-blue-50/40"
              : "border-gray-300 hover:border-[var(--color-primary)] hover:bg-gray-50"
          }`}
        >
          {file ? (
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl">✅</span>
              <span className="text-[var(--color-primary)] font-medium text-sm">{file.name}</span>
              <span className="text-xs text-[var(--color-text-muted)]">Click to replace</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1 text-[var(--color-text-muted)]">
              <span className="text-2xl">📄</span>
              <span className="text-sm font-medium">Click or drag file to upload</span>
              <span className="text-xs">PDF or DOCX, up to 5MB</span>
            </div>
          )}
          <input
            id="resume-upload"
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileChange}
            aria-describedby={fileError ? "resume-error" : undefined}
            className="hidden"
          />
        </label>
        {fileError && (
          <p id="resume-error" role="alert" className="text-red-500 text-sm mt-2">{fileError}</p>
        )}
      </div>

      <div>
        <label htmlFor="job-description" className="block font-medium mb-2 text-sm">
          Job Description
        </label>
        <textarea
          id="job-description"
          rows={8}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste job description here..."
          aria-describedby={jdError ? "jd-error" : "jd-counter"}
          className="w-full border border-gray-300 rounded-xl p-4 text-sm focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none"
        />
        <p id="jd-counter" className="text-xs text-[var(--color-text-muted)] mt-1.5">
          {jobDescription.length} / {MAX_JD_LENGTH} characters (50 minimum)
        </p>
        {jdError && (
          <p id="jd-error" role="alert" className="text-red-500 text-sm mt-2">{jdError}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[var(--color-primary)] text-white py-3.5 rounded-xl font-medium hover:bg-[var(--color-primary-dark)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            Analyzing...
          </>
        ) : (
          "Analyze Fit"
        )}
      </button>
    </form>
  );
}
