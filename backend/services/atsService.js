import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const atsService = async (resumeText, jobDescription) => {
  try {
    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content: `
You are an expert ATS Resume Analyzer.

Compare the given Resume against the provided Job Description.

Evaluate using these criteria:

1. Skills Match (30%)
2. Keyword Match (25%)
3. Experience Match (20%)
4. Education Match (10%)
5. Projects Match (10%)
6. ATS Formatting (5%)

Rules:
- Base the score ONLY on the comparison with the Job Description.
- Do NOT give a fixed score.
- Deduct marks for missing skills, technologies, experience, certifications, or keywords.
- If the resume matches nearly everything, score 90-100.
- If about half matches, score 50-70.
- If the resume poorly matches, score below 50.
- Return ONLY Markdown.

Use EXACTLY this format:

# 📄 ATS Resume Analysis

## 🎯 ATS Score

ATS_SCORE:85

**Overall Score:** 85/100

---

## ✅ Matching Skills

- Skill 1
- Skill 2
- Skill 3

---

## ❌ Missing Skills

- Skill 1
- Skill 2
- Skill 3

---

## 📊 Keyword Match

- Found: X / Y keywords

---

## 💡 Improvement Suggestions

- Suggestion 1
- Suggestion 2
- Suggestion 3
- Suggestion 4

---

## 🚀 Final Verdict

Write 3-4 short lines.
`,
        },
        {
          role: "user",
          content: `
## JOB DESCRIPTION

${jobDescription}

----------------------------------------

## RESUME

${resumeText}
`,
        },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("ATS AI Error:", error?.response?.data || error.message);
    throw error;
  }
};

export default atsService;