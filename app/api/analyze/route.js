import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { parseResume } from "@/lib/parseResume";
import { analyzeResumeVsJob } from "@/lib/aiPrompt";

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_EXTENSIONS = [".pdf", ".docx"];

export async function POST(request) {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ error: "You must be signed in." }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("resume");
    const jobDescription = formData.get("jobDescription");

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No resume file provided." }, { status: 400 });
    }

    const fileName = file.name.toLowerCase();
    const isValidExtension = ALLOWED_EXTENSIONS.some((ext) => fileName.endsWith(ext));

    if (!isValidExtension) {
      return NextResponse.json({ error: "Only PDF or DOCX files are allowed." }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File is too large. Max size is 5MB." }, { status: 400 });
    }

    if (!jobDescription || jobDescription.trim().length < 50) {
      return NextResponse.json(
        { error: "Job description must be at least 50 characters." },
        { status: 400 }
      );
    }

    let extractedText;
    try {
      extractedText = await parseResume(file);
    } catch (parseError) {
      return NextResponse.json({ error: parseError.message }, { status: 422 });
    }

    let analysis;
    try {
      analysis = await analyzeResumeVsJob(extractedText, jobDescription);
    } catch (aiError) {
      return NextResponse.json({ error: aiError.message }, { status: 502 });
    }

    return NextResponse.json({
      fileName: file.name,
      jobTitleSnippet: jobDescription.trim().slice(0, 60),
      jobDescription: jobDescription.trim(),
      resumeText: extractedText,
      ...analysis,
    });
  } catch (err) {
    console.error("Analyze route error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}