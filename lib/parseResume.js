import pdfParse from "pdf-parse/lib/pdf-parse.js";
import mammoth from "mammoth";

export async function parseResume(file) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = file.name.toLowerCase();

  let text = "";

  if (fileName.endsWith(".pdf")) {
    const data = await pdfParse(buffer);
    text = data.text;
  } else if (fileName.endsWith(".docx")) {
    const result = await mammoth.extractRawText({ buffer });
    text = result.value;
  } else {
    throw new Error("Unsupported file type. Please upload a PDF or DOCX file.");
  }

  const cleaned = text.replace(/\s+/g, " ").trim();

  if (!cleaned || cleaned.length < 20) {
    throw new Error("Could not extract readable text from this file. Try a different file.");
  }

  return cleaned;
}