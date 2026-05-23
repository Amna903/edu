import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Brain, BarChart3, BookOpen, GraduationCap, FileStack, Timer, Star, Mic, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";

// ─── DESIGN TOKENS (mirrors About page) ────────────────────────────────────────
const ui = {
  sections: {
    brand: "relative bg-[#2366c9] text-white",
    softBlue: "bg-[#eef6ff]",
  },
  buttons: {
    brandLight: "bg-white text-[#2366c9] hover:bg-[#eef6ff]",
  },
  cards: {
    standard: "relative bg-white border border-[#dbe7f4]",
  },
};

// ─── COURSE DATA (from PDF Part 4) ─────────────────────────────────────────────
const courses = [
  {
    id: "C1",
    section: 1,
    cardTag: "Study Science",
    title: "Learn How to Learn — The Complete System",
    levelBadge: "All Levels",
    modules: 6,
    duration: "8–10 hrs",
    price: "$19",
    rating: "4.9",
    ratingCount: "218",
    thumbnailGradient: "linear-gradient(135deg, #1e3a5f, #2563eb)",
    icon: BookOpen,
    popupTag: "Study Science · Foundation",
    popupSubtitle:
      "The single most valuable course before starting any other subject. Master cognitive science for high retention.",
    audience: "All students Grade 6 and above, especially those preparing for O-Level",
    whatYoullLearn: [
      "Spaced repetition & the Ebbinghaus forgetting curve",
      "Active recall vs passive re-reading — why rereading fails",
      "Mind mapping & dual coding strategies",
      "Managing exam stress & building sustained focus",
      "Time-blocking and study sprint systems",
    ],
  },
  {
    id: "C2",
    section: 2,
    cardTag: "Vocabulary",
    title: "Grade 5–7 Vocabulary Mastery",
    levelBadge: "Grade 5–7",
    modules: 7,
    duration: "14–18 hrs",
    price: "$35",
    rating: "4.8",
    ratingCount: "304",
    thumbnailGradient: "linear-gradient(135deg, #7c2d12, #ea580c)",
    icon: BookOpen,
    popupTag: "Vocabulary · Grade 5–7 · Complete",
    popupSubtitle:
      "500+ academic and contextual words across 7 complete modules. Spaced repetition built in for maximum retention.",
    audience: "Students in Grade 5, 6, or 7 building foundational English vocabulary",
    whatYoullLearn: [
      "500+ high-frequency academic words with context",
      "Word families, roots, prefixes and suffixes",
      "Context-based vocabulary learning strategies",
      "Collocations and idiomatic English usage",
      "Vocabulary for reading comprehension tasks",
      "Formal and informal register distinction",
    ],
  },
  {
    id: "C3",
    section: 2,
    cardTag: "Reading",
    title: "Reading Comprehension Grade 6–8",
    levelBadge: "Grade 6–8",
    modules: 8,
    duration: "12–16 hrs",
    price: "$39",
    rating: "4.7",
    ratingCount: "189",
    thumbnailGradient: "linear-gradient(135deg, #164e63, #0891b2)",
    icon: BookOpen,
    popupTag: "Reading Skills · Grade 6–8",
    popupSubtitle:
      "Go beyond surface reading. Inference, author's purpose, tone, and summary skills that transfer to exam papers.",
    audience: "Grade 6–8 students who need to develop deep reading and comprehension skills",
    whatYoullLearn: [
      "Inference and implicit meaning extraction",
      "Identifying author's purpose, tone, and attitude",
      "Effective summary writing techniques",
      "Skimming and scanning for specific information",
      "Answering comprehension questions with precision",
      "Unseen passage analysis frameworks",
    ],
  },
  {
    id: "C4",
    section: 3,
    cardTag: "ESL · Elementary",
    title: "ESL 1 — Elementary English (A2)",
    levelBadge: "CEFR A2",
    modules: 10,
    duration: "20–24 hrs",
    price: "$49",
    rating: "4.8",
    ratingCount: "267",
    thumbnailGradient: "linear-gradient(135deg, #3b0764, #7c3aed)",
    icon: BookOpen,
    popupTag: "ESL · CEFR A2 · Elementary",
    popupSubtitle:
      "From basic grammar to simple conversations. Builds essential English structure for students new to the language.",
    audience: "Learners with basic or beginner English proficiency moving toward A2 standard",
    whatYoullLearn: [
      "Core grammar: tenses, prepositions, articles, determiners",
      "500 essential everyday vocabulary words in context",
      "Simple sentence construction and short paragraph writing",
      "Reading short texts with full comprehension",
      "Listening comprehension at A2 standard",
    ],
  },
  {
    id: "C5",
    section: 3,
    cardTag: "ESL · Intermediate",
    title: "ESL 2 — Intermediate English (B1)",
    levelBadge: "CEFR B1",
    modules: 12,
    duration: "24–28 hrs",
    price: "$55",
    rating: "4.9",
    ratingCount: "198",
    thumbnailGradient: "linear-gradient(135deg, #0f4c3f, #059669)",
    icon: BookOpen,
    popupTag: "ESL · CEFR B1 · Intermediate",
    popupSubtitle:
      "Move from basic to confident English use. Prepare for academic reading, structured writing, and O-Level readiness.",
    audience: "Students who have completed ESL 1 A2 or have elementary English knowledge",
    whatYoullLearn: [
      "Complex grammar: conditionals, passive voice, reported speech",
      "Academic vocabulary expansion to 800+ words",
      "Essay structure and multi-paragraph writing",
      "Reading comprehension at B1 standard",
      "Writing formal letters and structured short reports",
    ],
  },
  {
    id: "C6",
    section: 4,
    cardTag: "O-Level Prep · English Bridge",
    title: "O-Level English Bridge: B1+ to B2",
    levelBadge: "B1+",
    modules: 14,
    duration: "28–34 hrs",
    price: "$69",
    rating: "4.9",
    ratingCount: "312",
    thumbnailGradient: "linear-gradient(135deg, #0B3C5D, #1a6fa8)",
    icon: BookOpen,
    popupTag: "O-Level Bridge · B1+ to B2",
    popupSubtitle:
      "The structured bridge between intermediate English and Cambridge Paper 1 & 2 readiness. Changes examination outcomes.",
    audience: "Students at B1+ who are 6–12 months away from O-Level English examinations",
    whatYoullLearn: [
      "Cambridge Paper 1 directed writing formats (all types)",
      "Paper 2 comprehension question techniques",
      "Advanced grammar for examination accuracy",
      "Narrative, argumentative, and descriptive composition writing",
      "Summary writing at O-Level standard",
      "Unseen passage analysis with timed practice",
    ],
  },
  {
    id: "SB1",
    section: 5,
    cardTag: "Skill Booster · Communication",
    title: "Classroom English Communication — Student Edition",
    levelBadge: "All Levels",
    modules: 5,
    duration: "10–12 hrs",
    price: "$25",
    rating: "4.7",
    ratingCount: "143",
    thumbnailGradient: "linear-gradient(135deg, #064e3b, #10b981)",
    icon: BookOpen,
    popupTag: "Skill Booster · Communication",
    popupSubtitle:
      "Academic speaking, participation, and presentation skills that teachers rarely teach but examinations reward.",
    audience:
      "All grade levels — particularly beneficial for students switching to English-medium instruction",
    whatYoullLearn: [
      "Asking academic questions with structure and confidence",
      "Note-taking in English during fast-paced lessons",
      "Presenting ideas clearly and concisely",
      "Participating in structured classroom discussions",
      "Academic vocabulary for classroom contexts",
    ],
    isSkillBooster: true,
  },
];

const sections = [
  {
    id: "learn-how-to-learn",
    sectionNum: 1,
    eyebrow: "Foundation First",
    title: "Learn How to Learn",
    courses: [1],
  },
  {
    id: "english-foundation",
    sectionNum: 2,
    eyebrow: "English Foundation",
    title: "Vocabulary Mastery & Reading Comprehension",
    courses: [2, 3],
  },
  {
    id: "esl-courses",
    sectionNum: 3,
    eyebrow: "ESL Programme",
    title: "English as a Second Language",
    courses: [4, 5],
  },
  {
    id: "o-level-bridge",
    sectionNum: 4,
    eyebrow: "Pre-O-Level",
    title: "O-Level English Bridge",
    courses: [6],
  },
  {
    id: "skill-boosters",
    sectionNum: 5,
    eyebrow: "Skill Booster",
    title: "Quick-Win Skill Courses",
    courses: [7],
    isSkillBooster: true,
  },
];

// ─── COURSE CARD ────────────────────────────────────────────────────────────────
function CourseCard({ course }) {
  const [showPopup, setShowPopup] = useState(false);
  const [popupSide, setPopupSide] = useState("right");
  const [popupRect, setPopupRect] = useState(null);
  const cardRef = useRef(null);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setPopupSide(window.innerWidth - rect.right < 320 ? "left" : "right");
      setPopupRect(rect);
    }
    setShowPopup(true);
  };

  const Icon = course.icon;

  return (
    <div
      ref={cardRef}
      className="relative flex-shrink-0 cursor-pointer"
      style={{ width: "272px" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setShowPopup(false)}
    >
      {/* Card */}
      <div
        className="rounded-[14px] bg-[#eef6ff] overflow-hidden transition-all duration-200"
        style={{
          border: showPopup
            ? "1.5px solid rgba(11,60,93,0.2)"
            : "1.5px solid #cfe0f5",
          boxShadow: showPopup ? "0 8px 28px rgba(0,0,0,0.12)" : "none",
        }}
      >
        {/* Thumbnail */}
        <div
          className="relative flex items-center justify-center"
          style={{
            height: "148px",
            background: "linear-gradient(135deg, #2366c9, #4f86e0)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.18))",
            }}
          />
          <Icon className="relative z-10 text-white" style={{ width: 48, height: 48 }} />
          {/* Level badge */}
          <span
            className="absolute top-2 left-2 rounded-md px-2 py-0.5"
            style={{
              background: "white",
              color: "#2366c9",
              fontSize: "10px",
              fontWeight: 700,
            }}
          >
            {course.levelBadge}
          </span>
          {/* Available badge */}
          <span
            className="absolute top-2 right-2 rounded-md px-2 py-0.5"
            style={{
              background: "#2366c9",
              color: "white",
              fontSize: "10px",
              fontWeight: 700,
            }}
          >
            Available
          </span>
        </div>

        {/* Card body */}
        <div className="p-4">
          <p
            className="uppercase mb-1"
            style={{
              color: "#2366c9",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
          >
            {course.cardTag}
          </p>
          <h3
            className="text-[#1E3A5F] leading-[1.35] mb-2"
            style={{ fontSize: "15px", fontFamily: "Sora, sans-serif", fontWeight: 700 }}
          >
            {course.title}
          </h3>
          <p className="mb-1 inline-flex items-center gap-1.5" style={{ fontSize: "12px", color: "#64748B" }}>
            <BookOpen className="h-3.5 w-3.5" /> {course.modules} modules · <Timer className="h-3.5 w-3.5" /> {course.duration}
          </p>
          <p className="mb-3" style={{ fontSize: "12px", color: "#64748B" }}>
            <Star className="mr-1 inline h-3.5 w-3.5" /> <strong style={{ color: "#1E293B" }}>{course.rating}</strong>{" "}
            ({course.ratingCount})
          </p>
          <div
            className="flex items-center justify-between pt-3"
            style={{ borderTop: "1px solid #dbe7f4" }}
          >
            <span
              style={{
                fontFamily: "Sora, sans-serif",
                fontWeight: 800,
                fontSize: "18px",
                color: "#1E3A5F",
              }}
            >
              {course.price}
            </span>
            <button
              className="transition-colors"
              style={{
                background: "#2366c9",
                color: "white",
                fontSize: "12.5px",
                fontWeight: 700,
                borderRadius: "7px",
                padding: "6px 14px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Enroll
            </button>
          </div>
        </div>
      </div>

      {/* Hover Popup */}
      {popupRect && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            width: "300px",
            top: popupRect.top + window.scrollY + "px",
            left:
              popupSide === "right"
                ? popupRect.right + 12 + "px"
                : popupRect.left - 12 - 300 + "px",
            opacity: showPopup ? 1 : 0,
            transform: showPopup ? "scale(1)" : "scale(0.97)",
            transition: "opacity 150ms, transform 200ms",
            boxShadow: "0 20px 60px rgba(11,60,93,0.22)",
            borderRadius: "14px",
            overflow: "hidden",
          }}
        >
          {/* Popup header */}
          <div className="px-5 py-4" style={{ background: "#2366c9" }}>
          <p
            className="uppercase mb-1"
            style={{ color: "#dbeafe", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em" }}
          >
            {course.popupTag}
          </p>
          <p
            style={{
              fontFamily: "Sora, sans-serif",
              fontWeight: 800,
              fontSize: "16px",
              color: "white",
              lineHeight: 1.3,
            }}
          >
            {course.title}
          </p>
          <p style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.65)", lineHeight: 1.45, marginTop: "6px" }}>
            {course.popupSubtitle}
          </p>
        </div>

        {/* Popup body */}
        <div className="px-5 py-4 bg-white">
          <p
            className="uppercase mb-2"
            style={{ fontSize: "11px", fontWeight: 700, color: "#64748B" }}
          >
            What You'll Learn
          </p>
          <div className="space-y-1 mb-3">
            {course.whatYoullLearn.map((item, i) => (
              <p key={i} style={{ fontSize: "13px", color: "#1E293B", display: "flex", gap: "6px" }}>
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-[#2366c9]" />
                {item}
              </p>
            ))}
          </div>

          {/* Info chips */}
          <div className="flex flex-wrap gap-2 mb-3">
            {[
              `${course.modules} modules`,
              course.duration,
              course.levelBadge,
              "Certificate",
            ].map((chip) => (
              <span
                key={chip}
                className="rounded-full px-2.5 py-0.5"
                style={{
                  background: "#eef6ff",
                  color: "#1E3A5F",
                  fontSize: "11px",
                  fontWeight: 600,
                }}
              >
                {chip}
              </span>
            ))}
          </div>

          <div style={{ borderTop: "1px solid #dbe7f4", paddingTop: "12px" }} />

          {/* Popup footer */}
          <div className="flex items-center gap-3 mt-3">
            <span
              style={{
                fontFamily: "Sora, sans-serif",
                fontWeight: 800,
                fontSize: "24px",
                color: "#1E3A5F",
              }}
            >
              {course.price}
            </span>
            <button
              style={{
                flex: 1,
                background: "#2366c9",
                color: "white",
                fontSize: "14px",
                fontWeight: 700,
                borderRadius: "10px",
                padding: "10px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Enroll Now →
            </button>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}

// ─── HORIZONTAL SCROLL ROW ──────────────────────────────────────────────────────
function CourseScrollRow({ courseIds }) {
  const rowRef = useRef(null);
  const filteredCourses = courses.filter((_, idx) =>
    courseIds.includes(idx + 1)
  );

  const scroll = (dir) => {
    rowRef.current?.scrollBy({ left: dir * 580, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <button
        onClick={() => scroll(-1)}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 items-center justify-center w-9 h-9 rounded-full bg-white border border-[#dbe7f4] shadow-sm hover:border-[#2366c9] transition"
        aria-label="Scroll left"
      >
        ←
      </button>
      <div
        ref={rowRef}
        className="flex gap-[18px] overflow-x-auto pb-4 md:pl-12 md:pr-12"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#dbe7f4 transparent",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
      <button
        onClick={() => scroll(1)}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 items-center justify-center w-9 h-9 rounded-full bg-white border border-[#dbe7f4] shadow-sm hover:border-[#2366c9] transition"
        aria-label="Scroll right"
      >
        →
      </button>
    </div>
  );
}

// ─── LEFT STICKY SIDEBAR ────────────────────────────────────────────────────────
function CoursesSidebar({ activeSection }) {
  return (
    <aside
      className="hidden lg:block flex-shrink-0"
      style={{
        width: "240px",
        position: "sticky",
        top: "64px",
        height: "calc(100vh - 64px)",
        overflowY: "auto",
        background: "#FFFFFF",
        borderRight: "1px solid #dbe7f4",
        padding: "28px 0",
      }}
    >
      {/* AI Diagnostic Widget */}
      <div
        className="mx-4 mb-6 rounded-xl p-4"
        style={{
          background: "linear-gradient(135deg, #fff7ed, #ffedd5)",
          border: "1.5px solid #fed7aa",
        }}
      >
        <p
          className="uppercase mb-1"
          style={{ color: "#2366c9", fontSize: "10px", fontWeight: 700, letterSpacing: "0.28em" }}
        >
          Free · 30 Minutes
        </p>
        <h4
          style={{
            fontFamily: "Sora, sans-serif",
            fontWeight: 700,
            fontSize: "14px",
            color: "#1E3A5F",
            marginBottom: "6px",
          }}
        >
          Not sure where to start?
        </h4>
        <p style={{ fontSize: "12px", color: "#64748B", marginBottom: "10px", lineHeight: 1.5 }}>
          Take a free 30-min diagnostic and get a personalised learning roadmap.
        </p>
        <Link href="/programs/ai-diagnostic">
          <span
            className="block text-center font-semibold rounded-lg py-2 transition"
            style={{
              background: "#2366c9",
              color: "white",
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            Take Free Diagnostic
          </span>
        </Link>
      </div>

      {/* On this page */}
      <div className="px-4 mb-4">
        <p
          className="uppercase mb-2"
          style={{ fontSize: "10px", fontWeight: 700, color: "#64748B", letterSpacing: "0.15em" }}
        >
          On This Page
        </p>
        {[
          { href: "#learn-how-to-learn", label: "Learn How to Learn" },
          { href: "#english-foundation", label: "English Foundation" },
          { href: "#esl-courses", label: "ESL Courses" },
          { href: "#o-level-bridge", label: "O-Level Bridge" },
          { href: "#skill-boosters", label: "Skill Boosters" },
          { href: "#diagnostic", label: "Free Diagnostic" },
        ].map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="block px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all mb-0.5"
            style={{
              color:
                activeSection === link.href.replace("#", "")
                  ? "#2366c9"
                  : "#1E293B",
              background:
                activeSection === link.href.replace("#", "")
                  ? "rgba(35,102,201,0.1)"
                  : "transparent",
              fontWeight:
                activeSection === link.href.replace("#", "") ? 600 : 400,
            }}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Filter by level */}
      <div className="px-4 mb-4">
        <p
          className="uppercase mb-2"
          style={{ fontSize: "10px", fontWeight: 700, color: "#64748B", letterSpacing: "0.15em" }}
        >
          Filter by Level
        </p>
        {["Grade 5–7", "Grade 6–8", "Pre-O-Level", "O-Level Ready"].map((lvl) => (
          <a
            key={lvl}
            href="#"
            className="block px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all mb-0.5 hover:bg-[#eef6ff] hover:text-[#2366c9]"
            style={{ color: "#1E293B" }}
          >
            {lvl}
          </a>
        ))}
      </div>

      {/* Quick info */}
      <div className="px-4">
        <div className="rounded-lg p-3" style={{ background: "#f8fbff", border: "1px solid #dbe7f4" }}>
          <p style={{ fontSize: "12.5px", color: "#64748B", lineHeight: 1.6 }}>
            All 7 courses available now
            <br />
            Lifetime access included
            <br />
            H5P interactive activities
            <br />
            AI diagnostic included free
          </p>
        </div>
      </div>
    </aside>
  );
}

// ─── MAIN PAGE ──────────────────────────────────────────────────────────────────
export default function MustHaveCoursesPage() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    document.title = "Must-Have Courses | EduMeUp";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Build the academic foundations that O-Level students need — from vocabulary and comprehension through ESL fluency and English bridge. Every course is research-backed and available now."
      );
    }

    // IntersectionObserver for sidebar active state
    const sectionIds = [
      "learn-how-to-learn",
      "english-foundation",
      "esl-courses",
      "o-level-bridge",
      "skill-boosters",
      "diagnostic",
    ];
    const observers = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <Layout>
      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-14 md:py-20"
        style={{ background: "linear-gradient(135deg, #1a4fa0 0%, #2366c9 100%)" }}
      >
        <div className="absolute -top-20 -right-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" aria-hidden="true" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
              style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}
            >
              <span style={{ fontSize: "13px", fontWeight: 700, color: "white" }}>
                Complete Learning Pathway
              </span>
            </div>

            <h1
              className="mb-5"
              style={{
                fontFamily: "Sora, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                color: "white",
                lineHeight: 1.1,
              }}
            >
              Must-Have Courses{" "}
              <span style={{ color: "#dbeafe" }}>for Every Learner</span>
            </h1>

            <p
              className="mx-auto mb-8 max-w-3xl"
              style={{ fontSize: "17px", color: "rgba(255,255,255,0.85)", lineHeight: 1.7 }}
            >
              Build the academic foundations that O-Level students need — from vocabulary and
              comprehension through ESL fluency and English bridge. Every course is research-backed
              and available now.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
              <Link href="/programs/ai-diagnostic">
                <span
                  className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold transition"
                  style={{
                    background: "#2366c9",
                    color: "white",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  Take Free AI Diagnostic <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <a
                href="#learn-how-to-learn"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold transition"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  color: "white",
                  fontSize: "14px",
                  border: "1px solid rgba(255,255,255,0.25)",
                }}
              >
                Browse Courses
              </a>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[
                { stat: "7", label: "Courses Available" },
                { stat: "30 min", label: "Free Diagnostic" },
                { stat: "50–75%", label: "Retention Rate" },
                { stat: "100%", label: "H5P Interactive" },
              ].map((s) => (
                <div
                  key={s.stat}
                  className="rounded-xl py-3 px-4 text-center"
                  style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
                >
                  <p
                    style={{
                      fontFamily: "Sora, sans-serif",
                      fontWeight: 800,
                      fontSize: "22px",
                      color: "#dbeafe",
                    }}
                  >
                    {s.stat}
                  </p>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── DIAGNOSTIC BANNER ─────────────────────────────────────────────────── */}
      <div
        style={{
          background: "linear-gradient(90deg, #eef6ff, #f8fbff)",
          borderTop: "4px solid #2366c9",
          borderBottom: "1px solid #dbe7f4",
          padding: "22px 48px",
        }}
      >
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Brain className="h-8 w-8 text-brand-primary" />
            <div className="flex-1">
              <p style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "17px", color: "#1E3A5F" }}>
                Free 30-Minute AI Diagnostic — Know Exactly Which Course Is Right for You
              </p>
              <p style={{ fontSize: "14px", color: "#64748B" }}>
                Answer adaptive questions, get a skills report, and receive a personalised learning
                roadmap. No account needed.
              </p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Link href="/programs/ai-diagnostic">
                <span
                  className="inline-block rounded-xl px-5 py-2.5 font-semibold"
                  style={{ background: "#2366c9", color: "white", fontSize: "14px", cursor: "pointer" }}
                >
                  Take Free Diagnostic
                </span>
              </Link>
              <p style={{ fontSize: "12px", color: "#64748B" }}>Free · No login · Instant report</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ──────────────────────────────────────────────────────── */}
      <div className="flex" style={{ background: "#f8fbff" }}>
        <CoursesSidebar activeSection={activeSection} />

        <main className="flex-1 min-w-0 py-10">
          {/* ── SECTION 1: LEARN HOW TO LEARN ──────────────────────────── */}
          <section id="learn-how-to-learn" className="px-6 md:px-10 mb-10">
            <p
              className="uppercase mb-1"
              style={{ color: "#2366c9", fontSize: "11px", fontWeight: 700, letterSpacing: "0.28em" }}
            >
              Foundation First
            </p>
            <h2
              className="mb-6"
              style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "28px", color: "#1E3A5F" }}
            >
              Learn How to Learn
            </h2>
            <CourseScrollRow courseIds={[1]} />
          </section>

          <div style={{ height: "1px", background: "#dbe7f4", margin: "0 2.5rem 2.5rem" }} />

          {/* ── SECTION 2: ENGLISH FOUNDATION ──────────────────────────── */}
          <section id="english-foundation" className="px-6 md:px-10 mb-10">
            <p
              className="uppercase mb-1"
              style={{ color: "#2366c9", fontSize: "11px", fontWeight: 700, letterSpacing: "0.28em" }}
            >
              English Foundation
            </p>
            <h2
              className="mb-6"
              style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "28px", color: "#1E3A5F" }}
            >
              Vocabulary Mastery & Reading Comprehension
            </h2>
            <CourseScrollRow courseIds={[2, 3]} />
          </section>

          <div style={{ height: "1px", background: "#dbe7f4", margin: "0 2.5rem 2.5rem" }} />

          {/* ── SECTION 3: ESL COURSES ──────────────────────────────────── */}
          <section id="esl-courses" className="px-6 md:px-10 mb-10">
            <p
              className="uppercase mb-1"
              style={{ color: "#2366c9", fontSize: "11px", fontWeight: 700, letterSpacing: "0.28em" }}
            >
              ESL Programme
            </p>
            <h2
              className="mb-6"
              style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "28px", color: "#1E3A5F" }}
            >
              English as a Second Language
            </h2>
            <CourseScrollRow courseIds={[4, 5]} />
          </section>

          <div style={{ height: "1px", background: "#dbe7f4", margin: "0 2.5rem 2.5rem" }} />

          {/* ── SECTION 4: O-LEVEL BRIDGE ───────────────────────────────── */}
          <section id="o-level-bridge" className="px-6 md:px-10 mb-10">
            <p
              className="uppercase mb-1"
              style={{ color: "#2366c9", fontSize: "11px", fontWeight: 700, letterSpacing: "0.28em" }}
            >
              Pre-O-Level
            </p>
            <h2
              className="mb-6"
              style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "28px", color: "#1E3A5F" }}
            >
              O-Level English Bridge
            </h2>
            <CourseScrollRow courseIds={[6]} />
          </section>

          <div style={{ height: "1px", background: "#dbe7f4", margin: "0 2.5rem 2.5rem" }} />

          {/* ── SECTION 5: SKILL BOOSTERS ───────────────────────────────── */}
          <section id="skill-boosters" className="px-6 md:px-10 mb-10">
            <div
              className="rounded-[2rem] p-8"
              style={{ background: "linear-gradient(135deg, #eef6ff, #f8fbff)", border: "1px solid #dbe7f4" }}
            >
              <p
                className="uppercase mb-1"
                style={{ color: "#2366c9", fontSize: "11px", fontWeight: 700, letterSpacing: "0.28em" }}
              >
                Skill Booster
              </p>
              <h2
                className="mb-6"
                style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "28px", color: "#1E3A5F" }}
              >
                Quick-Win Skill Courses
              </h2>
              <CourseScrollRow courseIds={[7]} />
            </div>
          </section>

          {/* ── FULL DIAGNOSTIC SECTION ─────────────────────────────────── */}
          <section id="diagnostic" className="px-6 md:px-10 mb-10">
            <div
              className="relative overflow-hidden rounded-[20px] p-12"
              style={{ background: "#1a4fa0", margin: "0" }}
            >
              <span
                className="absolute pointer-events-none select-none"
                style={{
                  right: "48px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "140px",
                  opacity: 0.08,
                }}
              >
                
              </span>

              <p
                className="uppercase mb-3"
                style={{ color: "#dbeafe", fontSize: "11px", fontWeight: 700, letterSpacing: "0.28em" }}
              >
                Free · No Account Required · 30 Minutes
              </p>
              <h2
                className="mb-4 max-w-2xl"
                style={{
                  fontFamily: "Sora, sans-serif",
                  fontWeight: 800,
                  fontSize: "30px",
                  color: "white",
                  lineHeight: 1.2,
                }}
              >
                Not Sure Where to Start? Let Our AI Decide for You.
              </h2>
              <p
                className="mb-8 max-w-2xl"
                style={{ fontSize: "15px", color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}
              >
                Answer 30 adaptive questions and get an instant, personalised skills report that
                identifies your exact starting point. No account required, no credit card, no
                guesswork.
              </p>

              {/* Three steps */}
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                {[
                  {
                    num: "1",
                    title: "Take the Diagnostic",
                    sub: "30 adaptive questions · 30 minutes",
                  },
                  {
                    num: "2",
                    title: "Get Your Report",
                    sub: "Instant skills breakdown · Level identification",
                  },
                  {
                    num: "3",
                    title: "Start the Right Course",
                    sub: "AI recommends your exact starting point",
                  },
                ].map((step) => (
                  <div key={step.num} className="flex items-start gap-3 flex-1">
                    <div
                      className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full"
                      style={{
                        background: "rgba(249,115,22,0.2)",
                        border: "1.5px solid #93c5fd",
                        color: "#dbeafe",
                        fontWeight: 700,
                        fontSize: "14px",
                      }}
                    >
                      {step.num}
                    </div>
                    <div>
                      <p style={{ color: "white", fontWeight: 600, fontSize: "14px" }}>{step.title}</p>
                      <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "13px" }}>{step.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/programs/ai-diagnostic">
                <span
                  className="inline-flex items-center gap-2 rounded-xl font-bold transition"
                  style={{
                    background: "#2366c9",
                    color: "white",
                    fontSize: "16px",
                    padding: "14px 32px",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(35,102,201,0.45)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "";
                    e.currentTarget.style.boxShadow = "";
                  }}
                >
                  Take Free AI Diagnostic <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "13px", marginTop: "12px" }}>
                100% Free · No credit card · Instant results
              </p>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
