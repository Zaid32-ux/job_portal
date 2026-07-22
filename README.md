# 💼 JobFit AI

An AI-powered job portal built using the MERN stack that connects job seekers and employers while providing an intelligent ATS Resume Analyzer. JobFit AI compares uploaded resumes with job descriptions, generates an ATS score, identifies missing keywords, highlights skill gaps, and provides personalized suggestions to improve resume quality.

---

# 📖 Overview

JobFit AI is a full-stack recruitment platform designed to simplify the hiring process for both job seekers and employers.

Job seekers can create accounts, upload resumes, apply for jobs, and evaluate their resumes using an AI-powered ATS Resume Analyzer.

Employers can register, post jobs, manage applications, and review candidate information through a secure dashboard.

---

# ✨ Features

### 👤 Authentication
- Secure User Registration & Login
- JWT Authentication
- Password Encryption using bcrypt
- Protected Routes

### 👨‍💼 Employer Features
- Post New Jobs
- Update Existing Jobs
- Delete Jobs
- View Posted Jobs
- Manage Applications
- Role-Based Access Control (RBAC)

### 👨‍🎓 Job Seeker Features
- Browse Available Jobs
- Search Jobs
- Apply for Jobs
- Upload Resume (PDF)
- Track Applied Jobs

### 🤖 AI ATS Resume Analyzer
- Upload Resume (PDF)
- Paste Job Description
- AI-powered Resume Analysis
- ATS Compatibility Score
- Resume vs Job Description Matching
- Missing Keyword Detection
- Skill Gap Analysis
- Personalized Resume Improvement Suggestions

### ☁️ Cloud Storage
- Cloudinary Integration
- Secure Resume Upload
- Resume Storage & Retrieval

---

# 🛠️ Tech Stack

## Frontend
- React.js
- React Router
- Axios
- CSS

## Backend
- Node.js
- Express.js

## Database
- MongoDB
- Mongoose

## Authentication
- JWT
- bcrypt

## AI
- Groq API

## Cloud Storage
- Cloudinary

## Tools
- Git
- GitHub
- Postman

---

# 📂 Project Structure

```
JobFit-AI/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── utils/
│   └── server.js
│
└── README.md
```

---

# 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/JobFit-AI.git
```

### Navigate to Project

```bash
cd JobFit-AI
```

### Install Backend Dependencies

```bash
cd server
npm install
```

### Install Frontend Dependencies

```bash
cd ../client
npm install
```

---

# ▶️ Running the Project

### Start Backend

```bash
cd server
npm run dev
```

### Start Frontend

```bash
cd client
npm run dev
```

Visit:

```
http://localhost:5173
```

---

# 📸 Application Workflow

## Job Seeker

1. Register/Login
2. Browse Jobs
3. Upload Resume
4. Apply for Jobs
5. Analyze Resume using ATS
6. View ATS Score
7. Improve Resume using AI Suggestions

---

## Employer

1. Register/Login
2. Post Jobs
3. Manage Posted Jobs
4. Review Applications
5. View Applicant Details

---

# 🤖 ATS Resume Analyzer

The ATS Resume Analyzer compares uploaded resumes with job descriptions and provides:

- ATS Compatibility Score
- Resume Match Percentage
- Missing Keywords
- Resume Strengths
- Personalized Improvement Suggestions

---

# 🔒 Security Features

- JWT Authentication
- Password Hashing using bcrypt
- Protected API Routes
- Role-Based Access Control (RBAC)

---

# 📡 API Modules

### Authentication
- Register User
- Login User

### Jobs
- Create Job
- Update Job
- Delete Job
- View Jobs

### Applications
- Apply for Job
- View Applications

### ATS Analyzer
- Upload Resume
- Analyze Resume
- Generate ATS Score
- Keyword Matching
- Resume Suggestions

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push the branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 👨‍💻 Author

**Mohd Zaid**

- GitHub: https://github.com/Zaid32-ux
- LeetCode: https://leetcode.com/u/zaid_gour/

---

# ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub.
