import { useState, useRef, useCallback } from "react";
import "./App.css";

// ─── Icons (inline SVG components) ───────────────────────────────────────────
const Icon = {
  Upload: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  ),
  File: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  ChevronRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  Star: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Brain: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9.5 2A2.5 2.5 0 017 4.5v1A2.5 2.5 0 004.5 8H4a2 2 0 000 4h.5A2.5 2.5 0 007 14.5v1A2.5 2.5 0 009.5 18h5a2.5 2.5 0 002.5-2.5v-1a2.5 2.5 0 002.5-2.5H20a2 2 0 000-4h-.5A2.5 2.5 0 0017 5.5v-1A2.5 2.5 0 0014.5 2z" />
    </svg>
  ),
  Chart: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  ),
  User: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Trophy: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="8 21 12 17 16 21" />
      <line x1="12" y1="17" x2="12" y2="11" />
      <path d="M7 4h10l1 7H6z" />
      <path d="M6 4c0 2-1 4-4 5" />
      <path d="M18 4c0 2 1 4 4 5" />
    </svg>
  ),
  Sparkle: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5z" />
    </svg>
  ),
  Alert: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  Book: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    </svg>
  ),
  Building: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" />
    </svg>
  ),
  Calculator: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="8" y1="6" x2="16" y2="6" />
      <line x1="8" y1="10" x2="8.01" y2="10" />
      <line x1="12" y1="10" x2="12.01" y2="10" />
      <line x1="16" y1="10" x2="16.01" y2="10" />
      <line x1="8" y1="14" x2="8.01" y2="14" />
      <line x1="12" y1="14" x2="12.01" y2="14" />
      <line x1="16" y1="14" x2="16.01" y2="14" />
      <line x1="8" y1="18" x2="16" y2="18" />
    </svg>
  ),
  Code: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  Send: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  Next: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="5 12 19 12" />
      <polyline points="13 6 19 12 13 18" />
    </svg>
  ),
  Target: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  X: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
};

// ─── Toast Notification ────────────────────────────────────────────────────────
function Toast({ toasts, removeToast }) {
  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast--${t.type}`}>
          <span className="toast__icon">
            {t.type === "success" ? <Icon.Check /> : <Icon.Alert />}
          </span>
          <span className="toast__msg">{t.message}</span>
          <button className="toast__close" onClick={() => removeToast(t.id)}>
            <Icon.X />
          </button>
        </div>
      ))}
    </div>
  );
}

// ─── Progress Bar ──────────────────────────────────────────────────────────────
function ProgressBar({ value, color = "var(--blue-500)", label, showValue = true }) {
  return (
    <div className="progress-row">
      {label && <span className="progress-label">{label}</span>}
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${value}%`, background: color }}
        />
      </div>
      {showValue && <span className="progress-value">{value}%</span>}
    </div>
  );
}

// ─── Loading Spinner ───────────────────────────────────────────────────────────
function Spinner({ size = "md" }) {
  return <div className={`spinner spinner--${size}`} />;
}

// ─── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, accent }) {
  return (
    <div className="stat-card" style={{ "--accent": accent }}>
      <div className="stat-card__icon">{icon}</div>
      <div className="stat-card__body">
        <span className="stat-card__value">{value}</span>
        <span className="stat-card__label">{label}</span>
      </div>
    </div>
  );
}

// ─── Section Header ────────────────────────────────────────────────────────────
function SectionHeader({ step, title, subtitle }) {
  return (
    <div className="section-header">
      <div className="section-step">{step}</div>
      <div>
        <h2 className="section-title">{title}</h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
      </div>
    </div>
  );
}

// ─── Mock performance chart (pure CSS bars) ────────────────────────────────────
function PerformanceChart({ scores }) {
  const labels = scores.map((s) => s.label);
  const values = scores.map((s) => s.score);
  const max = 10;
  return (
    <div className="perf-chart">
      {scores.map((s, i) => (
        <div key={i} className="perf-chart__col">
          <div className="perf-chart__bar-wrap">
            <div
              className="perf-chart__bar"
              style={{ height: `${(s.score / max) * 100}%` }}
            >
              <span className="perf-chart__bar-val">{s.score}</span>
            </div>
          </div>
          <span className="perf-chart__label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── APP ───────────────────────────────────────────────────────────────────────
const STEPS = ["upload", "analysis", "questions", "mock", "feedback", "results"];

export default function App() {
  const [step, setStep] = useState("upload");
  const [toasts, setToasts] = useState([]);

  // Upload state
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Analysis state
  const [analysis, setAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  // Questions state
  const [questions, setQuestions] = useState([]);
  const [loadingQ, setLoadingQ] = useState(null);
  const [activeQType, setActiveQType] = useState(null);

  // Mock interview state
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [answer, setAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);

  // Results state
  const [report, setReport] = useState(null);
  const [loadingReport, setLoadingReport] = useState(false);

  // ── Toast helpers ────────────────────────────────────────────────────────────
  const addToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // ── File handlers ────────────────────────────────────────────────────────────
  const handleFileSelect = (file) => {
    if (!file) return;
    const allowed = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowed.includes(file.type)) {
      addToast("Only PDF or DOCX files are accepted.", "error");
      return;
    }
    setUploadedFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files[0]);
  };

  // ── upload ─────────────────────────────────────────────────────────────────
  const handleUpload = async () => {
  if (!uploadedFile) return;

  setUploading(true);

  try {
    const formData = new FormData();
    formData.append("resume", uploadedFile);

    const res = await fetch("http://localhost:8080/resume/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.text();

    console.log(data);

    addToast("Resume uploaded successfully!");
    setStep("analysis");

    handleAnalyze();
  } catch {
    addToast("Upload failed. Please try again.", "error");
  } finally {
    setUploading(false);
  }
};
 

  // ── Analysis ─────────────────────────────────────────────────────────────────
  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      // const res = await fetch("/analyze-resume");
      // const data = await res.json();
      await new Promise((r) => setTimeout(r, 2200));
      setAnalysis({
        name: uploadedFile?.name?.replace(/\.[^.]+$/, "") || "Your Resume",
        atsScore: 82,
        skills: ["React", "Node.js", "Python", "SQL", "REST APIs", "Git", "AWS", "TypeScript"],
        experience: "3.5 years in full-stack development with a focus on scalable web applications and cloud infrastructure.",
        strengths: ["Strong technical stack alignment", "Clear project impact metrics", "Consistent career progression"],
        improvements: ["Add more quantified achievements", "Include relevant certifications", "Expand on leadership experience"],
        sections: { completeness: 88, keywords: 74, formatting: 91, impact: 68 },
      });
    } catch {
      addToast("Analysis failed. Please try again.", "error");
    } finally {
      setAnalyzing(false);
    }
  };

  // ── Questions ────────────────────────────────────────────────────────────────
  const QTYPES = [
    { key: "hr", label: "HR Questions", icon: <Icon.User />, endpoint: "/interview/hr", color: "var(--indigo)" },
    { key: "technical", label: "Technical Questions", icon: <Icon.Code />, endpoint: "/interview/technical", color: "var(--blue-500)" },
    { key: "resume", label: "Resume Based Questions", icon: <Icon.File />, endpoint: "/resume/questions", color: "var(--green)"},
    { key: "aptitude", label: "Aptitude Questions", icon: <Icon.Calculator />, endpoint: "/interview/aptitude", color: "var(--teal)" },
    { key: "company", label: "Company Specific", icon: <Icon.Building />, endpoint: "/interview/company", color: "var(--violet)" },
  ];

  
  const handleGenerateQ = async (type) => {
    setLoadingQ(type.key);
    setActiveQType(type.key);
    try {
      // const res = await fetch(type.endpoint);
      // const data = await res.json();
let endpoint = "http://localhost:8080/interview/hr";

if (type.key === "technical") {
  endpoint = "http://localhost:8080/technical";
}

if (type.key === "resume") {
  endpoint = "http://localhost:8080/resume/questions";
}

const res = await fetch(endpoint);

let questionsArray = [];

if (type.key === "resume") {

  const data = await res.text();

  questionsArray = data
    .split("\n")
    .filter(q => q.trim() !== "");

}else {

  const data = await res.text();

  questionsArray = data
    .split("\n")
    .filter(q => q.trim() !== "");
}

setQuestions(
  questionsArray.map((q, i) => ({
    id: i + 1,
    text: q,
    type: type.key
  }))
);
      addToast(`${type.label} loaded!`);
    } catch {
      addToast("Failed to load questions.", "error");
    } finally {
      setLoadingQ(null);
    }
  };

  // ── Mock Interview ───────────────────────────────────────────────────────────
  const currentQ = questions[currentQIdx];

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) return;
    setSubmitting(true);
    try {
      // const res = await fetch("/interview/evaluate", { method: "POST", body: JSON.stringify({ question: currentQ.text, answer }) });
      // const data = await res.json();
    const res = await fetch("http://localhost:8080/interview/evaluate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    question: currentQ.text,
    answer: answer,
  }),
});

const data = await res.json();

setFeedbacks((prev) => [
  ...prev,
  {
    questionId: currentQ.id,
    question: currentQ.text,
    answer,
    score: data.score,
    strengths: data.strengths,
    weaknesses: data.weaknesses,
    suggestion: data.suggestion,
  },
]);
      setStep("feedback");
    } catch {
      addToast("Evaluation failed. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleNextQ = () => {
    if (currentQIdx < questions.length - 1) {
      setCurrentQIdx((i) => i + 1);
      setAnswer("");
      setStep("mock");
    } else {
      fetchReport();
    }
  };

  // ── Report ────────────────────────────────────────────────────────────────────
  const fetchReport = async () => {
    setLoadingReport(true);
    setStep("results");
    try {
      // const res = await fetch("/interview/report");
      // const data = await res.json();
      await new Promise((r) => setTimeout(r, 2000));
      const avg = feedbacks.length
        ? Math.round(feedbacks.reduce((a, f) => a + f.score, 0) / feedbacks.length * 10)
        : 78;
      setReport({
        totalScore: avg,
        readiness: avg + 4 > 100 ? 100 : avg + 4,
        performanceScores: feedbacks.slice(0, 5).map((f, i) => ({
          label: `Q${i + 1}`,
          score: f.score,
        })),
        recommendedTopics: [
          "System Design Fundamentals",
          "Behavioral Interview Techniques",
          "Data Structures & Algorithms",
          "Cloud Architecture Patterns",
        ],
        overallFeedback:
          "Strong technical foundation with clear communication skills. Focus on quantifying your impact and structuring STAR-format answers for behavioral questions. Your experience aligns well with senior engineering roles.",
      });
    } catch {
      addToast("Failed to generate report.", "error");
    } finally {
      setLoadingReport(false);
    }
  };

  const latestFeedback = feedbacks[feedbacks.length - 1];

  // ── Restart ───────────────────────────────────────────────────────────────────
  const restart = () => {
    setStep("upload");
    setUploadedFile(null);
    setAnalysis(null);
    setQuestions([]);
    setActiveQType(null);
    setCurrentQIdx(0);
    setAnswer("");
    setFeedbacks([]);
    setReport(null);
  };

  // ── Step nav ──────────────────────────────────────────────────────────────────
  const stepIdx = STEPS.indexOf(step);

  return (
    <div className="app">
      <Toast toasts={toasts} removeToast={removeToast} />

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <div className="navbar__inner">
          <div className="navbar__brand">
            <div className="navbar__logo">
              <Icon.Brain />
            </div>
            <div>
              <span className="navbar__name">InterviewAI</span>
              <span className="navbar__tagline">Preparation Assistant</span>
            </div>
          </div>
          <div className="navbar__steps">
            {["Upload", "Analysis", "Questions", "Mock", "Feedback", "Results"].map((label, i) => (
              <div
                key={i}
                className={`nav-step ${i === stepIdx ? "nav-step--active" : ""} ${i < stepIdx ? "nav-step--done" : ""}`}
              >
                <div className="nav-step__dot">
                  {i < stepIdx ? <Icon.Check /> : <span>{i + 1}</span>}
                </div>
                <span className="nav-step__label">{label}</span>
              </div>
            ))}
          </div>
          <button className="btn btn--ghost btn--sm" onClick={restart}>
            Restart
          </button>
        </div>
      </nav>

      {/* ── HERO BAND ── */}
      <div className="hero-band">
        <div className="hero-band__inner">
          <div className="hero-badge">
            <Icon.Sparkle />
            <span>AI-Powered Coaching</span>
          </div>
          <h1 className="hero-title">
            Land your <em>dream role</em>
            <br />
            with confidence
          </h1>
          <p className="hero-sub">
            Upload your resume, get an instant ATS analysis, practice with adaptive interview questions, and receive real-time AI feedback — all in one place.
          </p>
        </div>
        <div className="hero-graphic" aria-hidden="true">
          <div className="hero-graphic__ring hero-graphic__ring--1" />
          <div className="hero-graphic__ring hero-graphic__ring--2" />
          <div className="hero-graphic__ring hero-graphic__ring--3" />
          <div className="hero-graphic__center">
            <Icon.Trophy />
          </div>
        </div>
      </div>

      <main className="main">

        {/* ════════════════════════════════════════════════════
            STEP 1 — UPLOAD
        ════════════════════════════════════════════════════ */}
        {step === "upload" && (
          <section className="panel">
            <SectionHeader step="01" title="Upload Your Resume" subtitle="PDF or DOCX · max 10 MB" />

            <div
              className={`dropzone ${dragOver ? "dropzone--over" : ""} ${uploadedFile ? "dropzone--filled" : ""}`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => !uploadedFile && fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx"
                hidden
                onChange={(e) => handleFileSelect(e.target.files[0])}
              />

              {!uploadedFile ? (
                <>
                  <div className="dropzone__icon">
                    <Icon.Upload />
                  </div>
                  <p className="dropzone__primary">Drag & drop your resume here</p>
                  <p className="dropzone__secondary">or click to browse files</p>
                  <div className="dropzone__types">
                    <span>PDF</span>
                    <span>DOCX</span>
                  </div>
                </>
              ) : (
                <div className="file-preview">
                  <div className="file-preview__icon">
                    <Icon.File />
                  </div>
                  <div className="file-preview__info">
                    <span className="file-preview__name">{uploadedFile.name}</span>
                    <span className="file-preview__size">{(uploadedFile.size / 1024).toFixed(1)} KB</span>
                  </div>
                  <button
                    className="file-preview__remove"
                    onClick={(e) => { e.stopPropagation(); setUploadedFile(null); }}
                    aria-label="Remove file"
                  >
                    <Icon.X />
                  </button>
                </div>
              )}
            </div>

            {uploadedFile && (
              <button
                className="btn btn--primary btn--lg"
                onClick={handleUpload}
                disabled={uploading}
              >
                {uploading ? <><Spinner size="sm" /> Uploading…</> : <><Icon.ChevronRight /> Analyze My Resume</>}
              </button>
            )}

            {/* Feature cards */}
            <div className="feature-grid">
              {[
                { icon: <Icon.Target />, title: "ATS Score", desc: "See how your resume ranks against applicant tracking systems." },
                { icon: <Icon.Brain />, title: "Skill Detection", desc: "Automatically surfaces key technologies and competencies." },
                { icon: <Icon.Chart />, title: "Gap Analysis", desc: "Pinpoints what to improve before your next application." },
              ].map((f, i) => (
                <div key={i} className="feature-card">
                  <div className="feature-card__icon">{f.icon}</div>
                  <h4 className="feature-card__title">{f.title}</h4>
                  <p className="feature-card__desc">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ════════════════════════════════════════════════════
            STEP 2 — ANALYSIS
        ════════════════════════════════════════════════════ */}
        {step === "analysis" && (
          <section className="panel">
            <SectionHeader step="02" title="Resume Analysis" subtitle="AI-powered breakdown of your profile" />

            {analyzing ? (
              <div className="loading-state">
                <div className="loading-state__graphic">
                  <Spinner size="lg" />
                </div>
                <p className="loading-state__title">Analyzing your resume…</p>
                <p className="loading-state__sub">Scanning for skills, formatting, and ATS alignment</p>
                <div className="loading-steps">
                  {["Parsing document", "Extracting skills", "Scoring ATS compatibility", "Identifying gaps"].map((s, i) => (
                    <div key={i} className="loading-step">
                      <Spinner size="xs" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : analysis ? (
              <>
                {/* Stat row */}
                <div className="stat-row">
                  <StatCard icon={<Icon.Target />} label="ATS Score" value={`${analysis.atsScore}/100`} accent="var(--blue-500)" />
                  <StatCard icon={<Icon.Book />} label="Skills Found" value={analysis.skills.length} accent="var(--teal)" />
                  <StatCard icon={<Icon.Star />} label="Strengths" value={analysis.strengths.length} accent="var(--indigo)" />
                  <StatCard icon={<Icon.Alert />} label="Improvements" value={analysis.improvements.length} accent="var(--amber)" />
                </div>

                {/* ATS score card */}
                <div className="ats-card">
                  <div className="ats-card__header">
                    <h3>ATS Compatibility Score</h3>
                    <span className={`badge ${analysis.atsScore >= 80 ? "badge--green" : "badge--amber"}`}>
                      {analysis.atsScore >= 80 ? "Good" : "Needs Work"}
                    </span>
                  </div>
                  <div className="ats-card__sections">
                    <ProgressBar label="Completeness" value={analysis.sections.completeness} />
                    <ProgressBar label="Keyword Match" value={analysis.sections.keywords} color="var(--teal)" />
                    <ProgressBar label="Formatting" value={analysis.sections.formatting} color="var(--indigo)" />
                    <ProgressBar label="Impact Statements" value={analysis.sections.impact} color="var(--amber)" />
                  </div>
                </div>

                <div className="analysis-grid">
                  {/* Skills */}
                  <div className="card">
                    <h3 className="card__title">
                      <Icon.Code /> Detected Skills
                    </h3>
                    <div className="skill-tags">
                      {analysis.skills.map((s) => (
                        <span key={s} className="skill-tag">{s}</span>
                      ))}
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="card">
                    <h3 className="card__title">
                      <Icon.User /> Experience Summary
                    </h3>
                    <p className="card__text">{analysis.experience}</p>
                  </div>

                  {/* Strengths */}
                  <div className="card card--green">
                    <h3 className="card__title">
                      <Icon.Check /> Strengths
                    </h3>
                    <ul className="check-list check-list--green">
                      {analysis.strengths.map((s, i) => (
                        <li key={i}><Icon.Check />{s}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Improvements */}
                  <div className="card card--amber">
                    <h3 className="card__title">
                      <Icon.Alert /> Areas to Improve
                    </h3>
                    <ul className="check-list check-list--amber">
                      {analysis.improvements.map((s, i) => (
                        <li key={i}><Icon.Alert />{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button className="btn btn--primary btn--lg" onClick={() => setStep("questions")}>
                  Continue to Interview Prep <Icon.ChevronRight />
                </button>
              </>
            ) : null}
          </section>
        )}

        {/* ════════════════════════════════════════════════════
            STEP 3 — QUESTIONS
        ════════════════════════════════════════════════════ */}
        {step === "questions" && (
          <section className="panel">
            <SectionHeader step="03" title="Interview Preparation" subtitle="Choose a question type to load your practice set" />

            <div className="qtype-grid">
              {QTYPES.map((type) => (
                <button
                  key={type.key}
                  className={`qtype-card ${activeQType === type.key ? "qtype-card--active" : ""}`}
                  style={{ "--qcolor": type.color }}
                  onClick={() => handleGenerateQ(type)}
                  disabled={loadingQ !== null}
                >
                  <div className="qtype-card__icon">{type.icon}</div>
                  <span className="qtype-card__label">{type.label}</span>
                  {loadingQ === type.key && <Spinner size="sm" />}
                  {activeQType === type.key && loadingQ !== type.key && (
                    <span className="qtype-card__badge">Active</span>
                  )}
                </button>
              ))}
            </div>

            {questions.length > 0 && (
              <>
                <div className="question-list">
                  <div className="question-list__header">
                    <h3>
                      {QTYPES.find((t) => t.key === activeQType)?.label} — {questions.length} questions ready
                    </h3>
                    <span className="badge badge--blue">Loaded</span>
                  </div>
                  {questions.map((q, i) => (
                    <div key={q.id} className="question-item">
                      <span className="question-item__num">Q{i + 1}</span>
                      <span className="question-item__text">{q.text}</span>
                    </div>
                  ))}
                </div>

                <button
                  className="btn btn--primary btn--lg"
                  onClick={() => { setCurrentQIdx(0); setAnswer(""); setStep("mock"); }}
                >
                  Start Mock Interview <Icon.ChevronRight />
                </button>
              </>
            )}
          </section>
        )}

        {/* ════════════════════════════════════════════════════
            STEP 4 — MOCK INTERVIEW
        ════════════════════════════════════════════════════ */}
        {step === "mock" && currentQ && (
          <section className="panel">
            <SectionHeader
              step="04"
              title="Mock Interview"
              subtitle={`Question ${currentQIdx + 1} of ${questions.length}`}
            />

            <div className="mock-progress">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`mock-progress__dot ${i < currentQIdx ? "done" : ""} ${i === currentQIdx ? "active" : ""}`}
                />
              ))}
            </div>

            <div className="question-card">
              <div className="question-card__badge">
                <Icon.Brain />
                <span>{QTYPES.find((t) => t.key === activeQType)?.label}</span>
              </div>
              <p className="question-card__text">{currentQ.text}</p>
              <div className="question-card__tips">
                <span>💡 Tip: Use the STAR method — Situation, Task, Action, Result</span>
              </div>
            </div>

            <div className="answer-section">
              <label className="answer-label">Your Answer</label>
              <textarea
                className="answer-textarea"
                placeholder="Type your answer here. Be specific, use examples, and aim for 2–4 paragraphs…"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={8}
              />
              <div className="answer-meta">
                <span>{answer.split(/\s+/).filter(Boolean).length} words</span>
                <span>Recommended: 100–250 words</span>
              </div>
            </div>

            <div className="mock-actions">
              <button
                className="btn btn--primary"
                onClick={handleSubmitAnswer}
                disabled={!answer.trim() || submitting}
              >
                {submitting ? <><Spinner size="sm" /> Evaluating…</> : <><Icon.Send /> Submit Answer</>}
              </button>
              <button
                className="btn btn--outline"
                onClick={handleNextQ}
                disabled={submitting}
              >
                Skip <Icon.Next />
              </button>
            </div>
          </section>
        )}

        {/* ════════════════════════════════════════════════════
            STEP 5 — FEEDBACK
        ════════════════════════════════════════════════════ */}
        {step === "feedback" && latestFeedback && (
          <section className="panel">
            <SectionHeader step="05" title="AI Feedback" subtitle="Detailed evaluation of your answer" />

            {/* Score ring */}
            <div className="score-display">
              <div className="score-ring" style={{ "--pct": (latestFeedback.score / 10) * 100 }}>
                <div className="score-ring__inner">
                  <span className="score-ring__val">{latestFeedback.score}</span>
                  <span className="score-ring__denom">/10</span>
                </div>
              </div>
              <div className="score-display__info">
                <h3 className="score-display__title">Answer Score</h3>
                <p className="score-display__sub">
                  {latestFeedback.score >= 9 ? "Excellent — near perfect answer!" :
                   latestFeedback.score >= 7 ? "Strong answer with minor improvements possible" :
                   "Good start — review the suggestions below"}
                </p>
                <div className="readiness-row">
                  <span>Interview Readiness</span>
                  <ProgressBar value={Math.min(latestFeedback.score * 10 + 5, 100)} showValue />
                </div>
              </div>
            </div>

            {/* Question asked */}
            <div className="feedback-question">
              <span className="feedback-question__label">Question</span>
              <p>{latestFeedback.question}</p>
            </div>

            {/* Feedback cards */}
            <div className="feedback-grid">
              <div className="card card--green">
                <h4 className="card__title"><Icon.Check /> Strengths</h4>
                <ul className="check-list check-list--green">
                  {latestFeedback.strengths.map((s, i) => <li key={i}><Icon.Check />{s}</li>)}
                </ul>
              </div>
              <div className="card card--red">
                <h4 className="card__title"><Icon.Alert /> Weaknesses</h4>
                <ul className="check-list check-list--red">
                  {latestFeedback.weaknesses.map((w, i) => <li key={i}><Icon.Alert />{w}</li>)}
                </ul>
              </div>
              <div className="card card--blue full-width">
                <h4 className="card__title"><Icon.Sparkle /> Suggested Improvement</h4>
                <p className="card__text">{latestFeedback.suggestion}</p>
              </div>
            </div>

            <div className="feedback-actions">
              <button className="btn btn--primary" onClick={handleNextQ}>
                {currentQIdx < questions.length - 1 ? <><Icon.Next /> Next Question</> : <><Icon.Trophy /> View Full Report</>}
              </button>
              <button className="btn btn--outline" onClick={() => setStep("mock")}>
                Retry This Question
              </button>
            </div>
          </section>
        )}

        {/* ════════════════════════════════════════════════════
            STEP 6 — RESULTS
        ════════════════════════════════════════════════════ */}
        {step === "results" && (
          <section className="panel">
            <SectionHeader step="06" title="Interview Report" subtitle="Your complete performance overview" />

            {loadingReport ? (
              <div className="loading-state">
                <Spinner size="lg" />
                <p className="loading-state__title">Generating your report…</p>
                <p className="loading-state__sub">Compiling scores, patterns, and recommendations</p>
              </div>
            ) : report ? (
              <>
                {/* Top stats */}
                <div className="stat-row">
                  <StatCard icon={<Icon.Trophy />} label="Overall Score" value={`${report.totalScore}%`} accent="var(--blue-500)" />
                  <StatCard icon={<Icon.Target />} label="Readiness" value={`${report.readiness}%`} accent="var(--teal)" />
                  <StatCard icon={<Icon.Star />} label="Questions Done" value={feedbacks.length} accent="var(--indigo)" />
                  <StatCard icon={<Icon.Chart />} label="Avg Score" value={feedbacks.length ? `${(feedbacks.reduce((a,f)=>a+f.score,0)/feedbacks.length).toFixed(1)}/10` : "—"} accent="var(--violet)" />
                </div>

                {/* Performance chart */}
                <div className="card">
                  <h3 className="card__title"><Icon.Chart /> Performance by Question</h3>
                  {report.performanceScores.length > 0 ? (
                    <PerformanceChart scores={report.performanceScores} />
                  ) : (
                    <p className="card__text muted">No performance data available.</p>
                  )}
                </div>

                {/* Overall readiness */}
                <div className="readiness-card">
                  <div className="readiness-card__header">
                    <h3>Interview Readiness</h3>
                    <span className={`badge ${report.readiness >= 75 ? "badge--green" : "badge--amber"}`}>
                      {report.readiness >= 75 ? "Interview Ready" : "Keep Practicing"}
                    </span>
                  </div>
                  <ProgressBar value={report.readiness} label="Overall Readiness" />
                  <p className="readiness-card__text">{report.overallFeedback}</p>
                </div>

                {/* Recommendations */}
                <div className="card">
                  <h3 className="card__title"><Icon.Book /> Recommended Learning Topics</h3>
                  <div className="topic-list">
                    {report.recommendedTopics.map((t, i) => (
                      <div key={i} className="topic-item">
                        <span className="topic-item__num">{String(i + 1).padStart(2, "0")}</span>
                        <span className="topic-item__label">{t}</span>
                        <Icon.ChevronRight />
                      </div>
                    ))}
                  </div>
                </div>

                <button className="btn btn--primary btn--lg" onClick={restart}>
                  <Icon.Sparkle /> Start a New Session
                </button>
              </>
            ) : null}
          </section>
        )}
      </main>

      <footer className="footer">
        <span>© 2025 InterviewAI — All analyses are AI-generated and for practice purposes only.</span>
      </footer>
    </div>
  );
}
