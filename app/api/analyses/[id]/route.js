import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Analysis from "@/models/Analysis";

export async function GET(request, { params }) {
  try {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "You must be signed in." }, { status: 401 });
    }

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid analysis id." }, { status: 400 });
    }

    await connectDB();

    const analysis = await Analysis.findById(id).lean();

    if (!analysis) {
      return NextResponse.json({ error: "Analysis not found." }, { status: 404 });
    }

    if (analysis.userId !== session.user.email) {
      return NextResponse.json({ error: "You do not have access to this analysis." }, { status: 403 });
    }

    return NextResponse.json({
      _id: analysis._id.toString(),
      jobTitleSnippet: analysis.jobTitleSnippet,
      jobDescription: analysis.jobDescription,
      resumeFileName: analysis.resumeFileName,
      fitScore: analysis.fitScore,
      matchingSkills: analysis.matchingSkills,
      missingSkills: analysis.missingSkills,
      suggestions: analysis.suggestions,
      atsScore: analysis.atsScore,
      atsMissingKeywords: analysis.atsMissingKeywords,
      atsSectionChecks: analysis.atsSectionChecks,
      atsFormattingFeedback: analysis.atsFormattingFeedback,
      createdAt: analysis.createdAt,
    });
  } catch (err) {
    console.error("Analysis detail route error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "You must be signed in." }, { status: 401 });
    }

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid analysis id." }, { status: 400 });
    }

    await connectDB();

    const analysis = await Analysis.findById(id);

    if (!analysis) {
      return NextResponse.json({ error: "Analysis not found." }, { status: 404 });
    }

    if (analysis.userId !== session.user.email) {
      return NextResponse.json({ error: "You do not have access to this analysis." }, { status: 403 });
    }

    await Analysis.deleteOne({ _id: id });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Analysis delete route error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
