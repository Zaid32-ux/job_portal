import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { useNavigate } from "react-router-dom";

function ATS() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const [score, setScore] = useState(0);
  const [jobDescription, setJobDescription] = useState("");

  const navigate = useNavigate();

  const analyzeResume = async () => {
    if (!file) {
      alert("Please select a PDF resume.");
      return;
    }

    if (!jobDescription.trim()) {
      alert("Please paste the Job Description.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDescription);

    try {
      setLoading(true);

      const { data } = await axios.post(
        "http://localhost:3000/ats/analyze",
        formData,
        {
          withCredentials: true,
        }
      );

      setAnalysis(data.report.analysis);
      setScore(data.report.atsScore);
    } catch (err) {
      console.log("Status:", err.response?.status);
      console.log("Data:", err.response?.data);
      console.log(err);

      alert(err.response?.data?.message || "Analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="ats-page">
    <div className="ats-container">

      {/* Header */}
      <div className="ats-header">

        <button
          onClick={() => navigate(-1)}
          className="ats-back-btn"
        >
          ← Back
        </button>

        <h1 className="ats-title">
          📄 ATS Resume Analyzer
        </h1>

        <div></div>

      </div>

      {/* Upload Card */}
      <div className="ats-card">

        <h2 className="ats-card-title">
          Upload Resume
        </h2>

        <p className="ats-card-subtitle">
          Upload your resume and paste the job description to calculate an accurate ATS score.
        </p>

        <div className="ats-grid">

          {/* Resume */}
          <div>

            <label className="ats-label">
              📄 Upload Resume (PDF)
            </label>

            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="ats-file"
            />

            {file && (
              <p className="file-name">
                ✅ {file.name}
              </p>
            )}

          </div>

          {/* Job Description */}
          <div>

            <label className="ats-label">
              💼 Job Description
            </label>

            <textarea
              placeholder="Paste the complete Job Description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="ats-textarea"
            />

          </div>

        </div>

        <div className="ats-btn-area">

          <button
            onClick={analyzeResume}
            disabled={loading}
            className="ats-btn"
          >
            {loading ? "Analyzing Resume..." : "🚀 Analyze Resume"}
          </button>

        </div>

      </div>

      {/* Results */}
      {analysis && (
        <>

          {/* Score Card */}
          <div className="score-card">

            <h2 className="score-title">
              ATS Match Score
            </h2>

            <div className="score-circle">
              {score}%
            </div>

          </div>

          {/* Analysis */}
          <div className="analysis-card">

            <h2 className="analysis-title">
              AI Resume Report
            </h2>

            <div className="analysis-box">

              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {analysis}
              </ReactMarkdown>

            </div>

          </div>

        </>
      )}

    </div>
  </div>
);
}

export default ATS;