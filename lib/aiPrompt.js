import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const MODEL_FALLBACKS = [
  "gemini-2.0-flash-001",
  "gemini-2.0-flash-lite-001",
  "gemini-flash-latest",
];

function withTimeout(promise, ms, timeoutMessage) {
  let timeoutId;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error(timeoutMessage)), ms);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timeoutId));
}

export async function callGeminiWithFallback(prompt) {
  let lastError;

  for (const modelName of MODEL_FALLBACKS) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await withTimeout(
        model.generateContent(prompt),
        20000,
        `Model ${modelName} timed out`
      );
      return result.response.text();
    } catch (err) {
      console.warn(`Model ${modelName} failed:`, err.message);
      lastError = err;
    }
  }

  throw lastError || new Error("All Gemini models failed");
}

const RESPONSE_SHAPE = {
  jobTitle: "Job Analysis",
  fitScore: 0,
  matchingSkills: [],
  missingSkills: [],
  suggestions: [],
  atsScore: 0,
  atsMissingKeywords: [],
  atsSectionChecks: {
    contactInfo: false,
    experience: false,
    education: false,
    skills: false,
  },
  atsFormattingFeedback: [],
};

function buildPrompt(resumeText, jobDescription) {
  return `You are an expert technical recruiter AND an Applicant Tracking System (ATS) simulator.

Analyze the RESUME against the JOB DESCRIPTION below and respond with ONLY a single valid JSON object — no markdown fences, no explanation, no extra text before or after it.

The JSON object must have EXACTLY this shape (types must match):
{
  "jobTitle": string (a short, likely job title/role guessed from the job description, e.g. "Data Analyst" or "Backend Engineer", max 5 words),
  "fitScore": number (0-100, overall match percentage),
  "matchingSkills": string[] (skills/keywords found in both resume and job description),
  "missingSkills": string[] (important skills in the job description NOT found in the resume),
  "suggestions": string[] (3-5 specific, actionable suggestions to improve this resume for this exact job),
  "atsScore": number (0-100, how well an ATS parser would read and rank this resume for this job),
  "atsMissingKeywords": string[] (important keywords from the job description missing from the resume),
  "atsSectionChecks": {
    "contactInfo": boolean (true if resume clearly has name/email/phone),
    "experience": boolean (true if resume has a work experience or projects section),
    "education": boolean (true if resume has an education section),
    "skills": boolean (true if resume has a clearly labeled skills section)
  },
  "atsFormattingFeedback": string[] (1-3 short notes on formatting issues that could confuse an ATS parser, or an empty array if none)
}

RESUME TEXT:
"""
${resumeText}
"""

JOB DESCRIPTION:
"""
${jobDescription}
"""

Respond with ONLY the JSON object.`;
}

function extractJson(rawText) {
  let cleaned = rawText.trim();
  cleaned = cleaned.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "");
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.slice(firstBrace, lastBrace + 1);
  }
  return JSON.parse(cleaned);
}

function validateAndFill(parsed) {
  const safe = { ...RESPONSE_SHAPE, ...parsed };

  safe.jobTitle = typeof safe.jobTitle === "string" && safe.jobTitle.trim() ? safe.jobTitle.trim() : "Job Analysis";
  safe.fitScore = typeof safe.fitScore === "number" ? Math.max(0, Math.min(100, safe.fitScore)) : 0;
  safe.atsScore = typeof safe.atsScore === "number" ? Math.max(0, Math.min(100, safe.atsScore)) : 0;

  safe.matchingSkills = Array.isArray(safe.matchingSkills) ? safe.matchingSkills : [];
  safe.missingSkills = Array.isArray(safe.missingSkills) ? safe.missingSkills : [];
  safe.suggestions = Array.isArray(safe.suggestions) ? safe.suggestions : [];
  safe.atsMissingKeywords = Array.isArray(safe.atsMissingKeywords) ? safe.atsMissingKeywords : [];
  safe.atsFormattingFeedback = Array.isArray(safe.atsFormattingFeedback) ? safe.atsFormattingFeedback : [];

  safe.atsSectionChecks = {
    contactInfo: !!safe.atsSectionChecks?.contactInfo,
    experience: !!safe.atsSectionChecks?.experience,
    education: !!safe.atsSectionChecks?.education,
    skills: !!safe.atsSectionChecks?.skills,
  };

  return safe;
}

export async function analyzeResumeVsJob(resumeText, jobDescription) {
  const prompt = buildPrompt(resumeText, jobDescription);

  let rawText;
  try {
    rawText = await callGeminiWithFallback(prompt);
  } catch (err) {
    console.error("Gemini API call failed on all fallback models:", err);
    throw new Error("The AI service is temporarily unavailable. Please try again in a moment.");
  }

  try {
    const parsed = extractJson(rawText);
    return validateAndFill(parsed);
  } catch (err) {
    console.error("Failed to parse Gemini response as JSON:", rawText);
    throw new Error("The AI returned an unexpected response. Please try again.");
  }
}


