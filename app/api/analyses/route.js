import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectDB from "@/lib/mongodb";
import Analysis from "@/models/Analysis";

export async function GET() {
  try {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "You must be signed in." }, { status: 401 });
    }

    await connectDB();

    const analyses = await Analysis.find({ userId: session.user.email })
      .sort({ createdAt: -1 })
      .select("jobTitleSnippet fitScore atsScore createdAt")
      .lean();

    return NextResponse.json({
      analyses: analyses.map((a) => ({
        _id: a._id.toString(),
        jobTitleSnippet: a.jobTitleSnippet,
        fitScore: a.fitScore,
        atsScore: a.atsScore,
        createdAt: a.createdAt,
      })),
    });
  } catch (err) {
    console.error("Analyses list route error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}