import mongoose from "mongoose";

const AnalysisSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
  userEmail: { type: String, required: true },
  jobTitleSnippet: { type: String, required: true },
  jobDescription: { type: String, required: true, minlength: 50 },
  resumeFileName: { type: String, required: true },
  resumeText: { type: String, required: true },
  fitScore: { type: Number, required: true, min: 0, max: 100 },
  matchingSkills: { type: [String], default: [] },
  missingSkills: { type: [String], default: [] },
  suggestions: { type: [String], default: [] },
  atsScore: { type: Number, required: true, min: 0, max: 100 },
  atsMissingKeywords: { type: [String], default: [] },
  atsSectionChecks: {
    contactInfo: { type: Boolean, default: false },
    experience: { type: Boolean, default: false },
    education: { type: Boolean, default: false },
    skills: { type: Boolean, default: false },
  },
  atsFormattingFeedback: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

AnalysisSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.models.Analysis || mongoose.model("Analysis", AnalysisSchema);