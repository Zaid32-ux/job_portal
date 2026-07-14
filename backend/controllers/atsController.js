import { extractPdfText } from "../utils/extractPdfText.js";
import ATS from "../Model/atsSchema.js";
import atsService from "../services/atsService.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";

// ----------------------
// Analyze Resume
// ----------------------
export const analyzeResume = catchAsyncErrors(async (req, res) => {
  // Check file
  if (!req.files || !req.files.resume) {
    return res.status(400).json({
      success: false,
      message: "Please upload a PDF resume.",
    });
  }

  const resume = req.files.resume;

  console.log("========== FILE INFO ==========");
  console.log("Name:", resume.name);
  console.log("Type:", resume.mimetype);
  console.log("Size:", resume.size);
  console.log("Is Buffer:", Buffer.isBuffer(resume.data));
  console.log("===============================");

  // Extract PDF Text
  let resumeText = "";

  try {
    resumeText = await extractPdfText(resume.data);
  } catch (err) {
    console.error("PDF EXTRACT ERROR");
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Failed to extract text from the PDF.",
    });
  }

  if (!resumeText || resumeText.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: "Unable to extract text from this PDF.",
    });
  }

  // AI Analysis
  const analysis = await atsService(
  resumeText,
  req.body.jobDescription
);
  // Extract ATS Score
  const match = analysis.match(/ATS_SCORE:(\d+)/);

  const atsScore = match ? Number(match[1]) : 0;

  // Remove ATS_SCORE line before saving
  const cleanedAnalysis = analysis
    .replace(/ATS_SCORE:\d+/g, "")
    .trim();

  // Save Report
  const report = await ATS.create({
    user: req.user._id,
    resumeName: resume.name,
    atsScore,
    analysis: cleanedAnalysis,
  });

  return res.status(200).json({
    success: true,
    report,
  });
});

// ----------------------
// Get History
// ----------------------
export const getHistory = catchAsyncErrors(async (req, res) => {
  const reports = await ATS.find({
    user: req.user._id,
  }).sort({
    createdAt: -1,
  });

  return res.status(200).json({
    success: true,
    reports,
  });
});

// ----------------------
// Delete Report
// ----------------------
export const deleteReport = catchAsyncErrors(async (req, res) => {
  const report = await ATS.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!report) {
    return res.status(404).json({
      success: false,
      message: "Report not found.",
    });
  }

  await report.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Report deleted successfully.",
  });
});