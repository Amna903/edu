import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";

// ─── DESIGN TOKENS ──────────────────────────────────────────────────────────────
const NAVY   = "#1E3A5F";
const ORANGE = "#2366c9";
const SOFT   = "#eef6ff";
const BORDER = "#dbe7f4";
const META   = "#64748B";
const BODY   = "#334155";

const GREEN  = "#2366c9";
const GREEN_BG = "#eef6ff";
const AMBER  = "#4f86e0";
const AMBER_BG = "#f8fbff";
const RED    = "#1E3A5F";
const RED_BG  = "#eef6ff";

// ─── MATRIC SUBJECTS ────────────────────────────────────────────────────────────
const matricSubjects = [
  { subject: "Mathematics",         gr9: true, gr10: true },
  { subject: "Physics",             gr9: true, gr10: true },
  { subject: "Chemistry",           gr9: true, gr10: true },
  { subject: "Biology",             gr9: true, gr10: true },
  { subject: "Computer Science",    gr9: true, gr10: true },
  { subject: "English (Compulsory)",gr9: true, gr10: true },
];

// ─── FSc / ICS SUBJECTS ─────────────────────────────────────────────────────────
const fscSubjects = [
  { subject: "Physics",          preMed: "Yr 1 + 2", preEng: "Yr 1 + 2", ics: "Yr 1 + 2" },
  { subject: "Chemistry",        preMed: "Yr 1 + 2", preEng: "Yr 1 + 2", ics: "Yr 1 + 2" },
  { subject: "Biology",          preMed: "Yr 1 + 2", preEng: "—",        ics: "—" },
  { subject: "Mathematics",      preMed: "—",        preEng: "Yr 1 + 2", ics: "Yr 1 + 2" },
  { subject: "Computer Science", preMed: "—",        preEng: "—",        ics: "Year 2" },
  { subject: "English",          preMed: "Yr 1 + 2", preEng: "Yr 1 + 2", ics: "Yr 1 + 2" },
];

// ─── ECAT TOPICS ────────────────────────────────────────────────────────────────
const ecatTopics = [
  {
    subject: "Mathematics",
    color: GREEN,
    bg: GREEN_BG,
    topics: [
      "Algebra and functions",
      "Sequences and series",
      "Trigonometry",
      "Analytic geometry",
      "Calculus — differentiation and integration",
      "Permutations and combinations",
      "Probability",
    ],
  },
  {
    subject: "Physics",
    color: AMBER,
    bg: AMBER_BG,
    topics: [
      "Measurements and vectors",
      "Mechanics — kinematics, dynamics, work/energy",
      "Oscillations and waves",
      "Thermodynamics",
      "Electrostatics and current electricity",
      "Electromagnetic induction",
      "Nuclear physics",
    ],
  },
  {
    subject: "Chemistry",
    color: NAVY,
    bg: "#f8fbff",
    topics: [
      "Atomic structure and periodic table",
      "Chemical bonding",
      "States of matter",
      "Solutions and electrochemistry",
      "Organic chemistry — functional groups",
      "Reaction kinetics",
      "Thermochemistry",
    ],
  },
  {
    subject: "English",
    color: GREEN,
    bg: GREEN_BG,
    topics: [
      "Reading comprehension — passage analysis",
      "Vocabulary in context",
      "Grammar — tenses, articles, prepositions",
      "Sentence correction and completion",
      "Analogies and antonyms",
      "Précis and summary skills",
      "Error identification",
    ],
  },
  {
    subject: "Computer Science",
    color: AMBER,
    bg: AMBER_BG,
    topics: [
      "Number systems — binary, octal, hexadecimal",
      "Basic programming concepts and logic",
      "Data structures — arrays, stacks, queues",
      "Operating system fundamentals",
      "Computer networks basics",
      "Database concepts",
      "Flowcharts and algorithms",
    ],
  },
];

// ─── EXAM SERVICES ──────────────────────────────────────────────────────────────
const examServices = [
  {
    code: "PK-EX-MAT",
    type: "Online Exam Preparation",
    level: "Matric Mathematics",
    color: GREEN,
    bg: GREEN_BG,
    description:
      "Intensive online exam preparation for Matric Mathematics. Topic-wise practice sessions, past paper question sets from all major boards, AI feedback on every answer aligned to the Matric marking scheme, and common error correction. Covers Grade 9 and Grade 10 syllabuses separately.",
    included: [
      "Topic-by-topic practice matched to FBISE and Provincial Board syllabuses",
      "Past paper question sets from all major boards (FBISE, Lahore, Karachi, Rawalpindi, Multan)",
      "AI feedback aligned to Matric Mathematics marking standards",
      "Common calculation and algebraic errors identified and corrected",
      "Timing strategy for the Matric Mathematics paper",
    ],
    audience: "Grade 9 and Grade 10 Matric students",
  },
  {
    code: "PK-EX-FSC",
    type: "Online Exam Preparation",
    level: "FSc / ICS Core Subjects",
    color: AMBER,
    bg: AMBER_BG,
    description:
      "Online exam preparation for FSc and ICS core science subjects — Physics, Chemistry, Biology, Mathematics and English. Structured question technique, timed practice and AI performance feedback aligned to Inter Board standards. Year 1 and Year 2 courses available separately per subject.",
    included: [
      "Subject-specific preparation — Physics, Chemistry, Biology, Mathematics, English",
      "Past paper questions from Federal Board and major Provincial Inter Boards",
      "Structured question technique — derivations, numerical problems, theory questions",
      "AI feedback at Inter Board marking standard",
      "Common examiner feedback and error patterns incorporated throughout",
    ],
    audience: "FSc Pre-Medical, Pre-Engineering and ICS Year 1 and Year 2 students",
  },
  {
    code: "PK-EX-ECAT",
    type: "Online Exam Preparation",
    level: "ECAT",
    color: RED,
    bg: RED_BG,
    description:
      "Targeted online preparation for the ECAT — Mathematics, Physics, Chemistry, English and Computer Science. Timed MCQ practice matched to the exact ECAT syllabus scope. Full practice tests and AI gap analysis so students know exactly which areas are costing them marks.",
    included: [
      "Topic-wise MCQ practice for all five ECAT subjects",
      "Timed practice matching ECAT paper format and question difficulty",
      "AI gap analysis by subject and topic area",
      "Full practice tests under ECAT conditions",
      "High-frequency ECAT question patterns from past papers — all five subjects",
    ],
    audience: "Students sitting the ECAT",
  },
  {
    code: "PK-MK-MAT",
    type: "Final Mock Exam + Report",
    level: "Matric Mathematics",
    color: GREEN,
    bg: GREEN_BG,
    description:
      "Full time-bound mock for Matric Mathematics in the exact Matric paper format. AI report: total score, section breakdown, error classification, marks lost by question type, and recommended final revision priorities.",
    included: [
      "Full Matric paper — Grade 9 or Grade 10 in exact board format",
      "AI report: total score, section-by-section marks breakdown",
      "Error classification — calculation errors, formula errors, method errors",
      "Marks-by-topic analysis — which syllabus sections cost the most marks",
      "Top final revision priorities before the board examination",
    ],
    audience: "Grade 9 and Grade 10 Matric students and parents",
  },
  {
    code: "PK-MK-FSC",
    type: "Final Mock Exam + Report",
    level: "FSc / ICS Core Subjects",
    color: AMBER,
    bg: AMBER_BG,
    description:
      "Full timed mocks per subject in exact Inter Board format — Physics, Chemistry, Biology, Mathematics and English. AI report: total score, theory vs numericals breakdown, derivation accuracy, and final revision recommendations.",
    included: [
      "Full FSc / ICS paper per subject in exact Inter Board format",
      "AI report: total score, section breakdown, theory vs numericals analysis",
      "Derivation accuracy assessment — common derivation errors identified",
      "Numerical problem method analysis — where working breaks down",
      "Recommended final revision topics and question types per subject",
    ],
    audience: "FSc Year 2 and ICS Year 2 students and parents",
  },
  {
    code: "PK-MK-ECAT",
    type: "Final ECAT Mock Exam + Report",
    level: "ECAT — All 5 Subjects",
    color: RED,
    bg: RED_BG,
    description:
      "Full time-bound ECAT mock in exact MCQ format — all five subjects. AI report: subject-level scores (Mathematics, Physics, Chemistry, English, Computer Science separately), accuracy rate, time management and final preparation priorities.",
    included: [
      "Full ECAT mock — all five subjects in exact MCQ format",
      "AI report: total score plus subject-level breakdown for all five subjects",
      "Accuracy rate analysis per subject",
      "Time management data — time spent per section vs recommended",
      "Top priority topics for final ECAT preparation based on performance",
    ],
    audience: "ECAT candidates and parents",
  },
];

type ExamService = (typeof examServices)[number];

// ─── SERVICE CARD ────────────────────────────────────────────────────────────────
function ServiceCard({ service }: { service: ExamService }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all"
      style={{
        border: `1.5px solid ${open ? service.color : BORDER}`,
        background: "white",
        boxShadow: open ? "0 10px 24px rgba(30,58,95,0.12)" : "none",
      }}
    >
      <div
        className="flex items-start justify-between p-5 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex-1 pr-4">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span
              className="rounded-full px-3 py-0.5 text-xs font-bold"
              style={{ background: service.bg, color: service.color }}
            >
              {service.code}
            </span>
            <span
              className="rounded-full px-3 py-0.5 text-xs font-semibold"
              style={{ background: SOFT, color: NAVY }}
            >
              {service.type}
            </span>
          </div>
          <p
            style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "15px", color: NAVY }}
          >
            {service.level}
          </p>
          <p style={{ fontSize: "12px", color: META, marginTop: "2px" }}>
            Audience: {service.audience}
          </p>
        </div>
        <span
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
          style={{
            background: service.bg,
            color: service.color,
            fontSize: "14px",
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 200ms",
          }}
        >
          ↓
        </span>
      </div>

      {open && (
        <div className="px-5 pb-5" style={{ borderTop: `1px solid ${BORDER}` }}>
          <p style={{ fontSize: "14px", color: BODY, lineHeight: 1.7, marginTop: "14px", marginBottom: "14px" }}>
            {service.description}
          </p>
          <p
            className="uppercase mb-2"
            style={{ fontSize: "11px", fontWeight: 700, color: META, letterSpacing: "0.12em" }}
          >
            What Is Included
          </p>
          <div className="space-y-2">
            {service.included.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2
                  className="flex-shrink-0 mt-0.5"
                  style={{ width: "15px", height: "15px", color: service.color }}
                />
                <p style={{ fontSize: "13px", color: BODY, lineHeight: 1.6 }}>{item}</p>
              </div>
            ))}
          </div>
          <button
            className="mt-5 rounded-xl font-bold"
            style={{
              background: service.color,
              color: "white",
              fontSize: "13px",
              padding: "9px 20px",
              border: "none",
              cursor: "pointer",
            }}
          >
            ENROL NOW
          </button>
        </div>
      )}
    </div>
  );
}

// ─── SIDEBAR ────────────────────────────────────────────────────────────────────
function PakistanSidebar({ activeSection }: { activeSection: string }) {
  const links = [
    { href: "matric", label: "Pakistan Matric" },
    { href: "fsc", label: "FSc and ICS" },
    { href: "ecat", label: "ECAT" },
    { href: "exam-services", label: "Exam Prep and Mock Exams" },
  ];

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
        borderRight: `1px solid ${BORDER}`,
        padding: "24px 0",
      }}
    >
      {/* Widget 1 — Diagnostic */}
      <div
        className="mx-4 mb-5 rounded-xl p-4"
        style={{ background: NAVY, border: `1px solid ${NAVY}`, boxShadow: "0 8px 18px rgba(30,58,95,0.12)" }}
      >
        <p style={{ fontSize: "12px", color: "white", lineHeight: 1.6, marginBottom: "10px", fontWeight: 700 }}>
          Not sure where to start? Take the free AI Diagnostic.
        </p>
        <button
          className="w-full rounded-lg font-semibold"
          style={{ background: "white", color: NAVY, fontSize: "12px", padding: "8px", border: "none", cursor: "pointer" }}
        >
          TAKE FREE DIAGNOSTIC
        </button>
      </div>

      {/* Widget 2 — Programme links */}
      <div className="px-4 mb-5">
        <p
          className="uppercase mb-2"
          style={{ fontSize: "10px", fontWeight: 700, color: META, letterSpacing: "0.15em" }}
        >
          Programme Links
        </p>
        {links.map((l) => {
          const isActive = activeSection === l.href;
          return (
            <a
              key={l.href}
              href={`#${l.href}`}
              className="block rounded-lg text-[12px] font-medium transition-all mb-0.5"
              style={{
                padding: "5px 12px",
                color: isActive ? ORANGE : BODY,
                background: isActive ? "rgba(35,102,201,0.1)" : "transparent",
                fontWeight: isActive ? 600 : 400,
              }}
            >
              {l.label}
            </a>
          );
        })}
      </div>

      {/* Widget 3 — Track selector */}
      <div className="px-4 mb-5">
        <p
          className="uppercase mb-2"
          style={{ fontSize: "10px", fontWeight: 700, color: META, letterSpacing: "0.15em" }}
        >
          Track Selector
        </p>
        {["Pre-Medical", "Pre-Engineering", "ICS", "Matric", "ECAT"].map((t) => (
          <a
            key={t}
            href={`#${t === "Matric" ? "matric" : t === "ECAT" ? "ecat" : "fsc"}`}
            className="block rounded-lg text-[12px] font-medium transition-all mb-0.5 px-3 py-1.5"
            style={{ color: BODY }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#e0f2fe"; e.currentTarget.style.color = NAVY; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = BODY; }}
          >
            {t}
          </a>
        ))}
      </div>

      {/* Widget 4 — Cambridge link */}
      <div className="px-4">
        <div
          className="rounded-xl p-4"
          style={{ background: SOFT, border: `1px solid ${BORDER}` }}
        >
          <p style={{ fontSize: "12px", color: NAVY, lineHeight: 1.6, marginBottom: "8px" }}>
            Looking for Cambridge O-Level / IGCSE programmes?
          </p>
          <Link href="/programs/cambridge">
            <span
              style={{
                display: "block",
                textAlign: "center",
                background: ORANGE,
                color: "white",
                fontSize: "11px",
                fontWeight: 700,
                borderRadius: "8px",
                padding: "7px",
                cursor: "pointer",
              }}
            >
              Browse Cambridge Programmes →
            </span>
          </Link>
        </div>
      </div>
    </aside>
  );
}

// ─── SECTION HEADING ────────────────────────────────────────────────────────────
function SectionHeading({
  eyebrow,
  title,
  eyebrowColor = NAVY,
}: {
  eyebrow: string;
  title: string;
  eyebrowColor?: string;
}) {
  return (
    <div className="mb-8">
      <p
        className="uppercase mb-2"
        style={{ fontSize: "11px", fontWeight: 700, color: eyebrowColor, letterSpacing: "0.28em" }}
      >
        {eyebrow}
      </p>
      <h2
        style={{
          fontFamily: "Sora, sans-serif",
          fontWeight: 700,
          fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
          color: NAVY,
          lineHeight: 1.2,
        }}
      >
        {title}
      </h2>
    </div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────────
export default function PakistanCurriculum() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    document.title = "Pakistan Curriculum Programmes — Matric, FSc, ICS and ECAT | EduMeUp";

    const ids = ["matric", "fsc", "ecat", "exam-services"];
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <Layout>
      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-14 md:py-20"
        style={{ background: "linear-gradient(135deg, #2366c9 0%, #1E3A5F 100%)" }}
      >
        <div className="absolute -top-20 -right-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" aria-hidden="true" />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mx-auto max-w-4xl text-center"
          >
            <p
              className="uppercase mb-4"
              style={{ fontSize: "11px", fontWeight: 700, color: "#93c5fd", letterSpacing: "0.28em" }}
            >
              EduMeUp  │  Pakistan Curriculum  │  Matric · FSc / ICS · ECAT
            </p>
            <h1
              className="mb-5"
              style={{
                fontFamily: "Sora, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1.8rem, 4.5vw, 3rem)",
                color: "white",
                lineHeight: 1.1,
              }}
            >
              Pakistan Curriculum Programmes —{" "}
              <span style={{ color: "#bfdbfe" }}>Matric, FSc, ICS and ECAT</span>
            </h1>
            <p
              className="mb-8 mx-auto max-w-3xl"
              style={{ fontSize: "16px", color: "rgba(255,255,255,0.8)", lineHeight: 1.75 }}
            >
              EduMeUp's Pakistan Curriculum programmes cover the complete secondary and higher secondary
              pathway — from Matric Grade 9 through FSc and ICS Year 2, through to ECAT for engineering
              college admission. Research-backed instruction, AI-powered diagnostic and support, and full
              board examination preparation aligned to FBISE and all major Provincial Boards.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="#matric"
                className="inline-flex items-center gap-2 rounded-xl font-bold"
                style={{ background: "white", color: ORANGE, fontSize: "14px", padding: "12px 28px" }}
              >
                CHOOSE YOUR PROGRAMME
              </a>
              <Link href="/programs/ai-diagnostic">
                <span
                  className="inline-flex items-center gap-2 rounded-xl font-semibold"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    color: "white",
                    fontSize: "14px",
                    padding: "12px 28px",
                    border: "1px solid rgba(255,255,255,0.25)",
                    cursor: "pointer",
                  }}
                >
                  TAKE FREE AI DIAGNOSTIC — FIND YOUR STARTING POINT
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PATHWAY FLOW GRAPHIC ─────────────────────────────────────────── */}
      <section className="py-8 px-6 bg-white" style={{ borderBottom: `1px solid ${BORDER}` }}>
        <div className="container-custom max-w-4xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            {[
              {
                label: "MATRIC",
                sub: "Grade 9 and Grade 10",
                subjects: "Mathematics · Physics · Chemistry · Biology · Computer Science · English",
                color: GREEN, bg: GREEN_BG, href: "#matric",
              },
              {
                label: "FSc / ICS",
                sub: "Year 1 and Year 2",
                subjects: "Pre-Medical · Pre-Engineering · ICS",
                color: AMBER, bg: AMBER_BG, href: "#fsc",
              },
              {
                label: "ECAT",
                sub: "5 Subjects",
                subjects: "Mathematics · Physics · Chemistry · English · Computer Science",
                color: RED, bg: RED_BG, href: "#ecat",
              },
            ].map((box, i) => (
              <div key={box.label} className="flex items-center gap-3 flex-1 w-full">
                <a
                  href={box.href}
                  className="flex-1 rounded-xl p-5 text-center transition hover:shadow-md"
                  style={{ background: box.bg, border: `1px solid ${BORDER}`, textDecoration: "none" }}
                >
                  <p style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: "18px", color: box.color }}>
                    {box.label}
                  </p>
                  <p style={{ fontSize: "12px", color: BODY, fontWeight: 600, marginTop: "2px" }}>{box.sub}</p>
                  <p style={{ fontSize: "11px", color: META, marginTop: "4px", lineHeight: 1.5 }}>{box.subjects}</p>
                </a>
                {i < 2 && (
                  <ArrowRight
                    className="flex-shrink-0 hidden md:block"
                    style={{ width: "20px", height: "20px", color: "#94a3b8" }}
                  />
                )}
              </div>
            ))}
          </div>
          <p style={{ fontSize: "13px", color: META, textAlign: "center", marginTop: "14px" }}>
            Take the free AI Diagnostic at any stage to find your exact starting point.{" "}
            <Link href="/programs/ai-diagnostic">
              <span style={{ color: ORANGE, fontWeight: 600, cursor: "pointer" }}>TAKE FREE DIAGNOSTIC →</span>
            </Link>
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}
      <div className="flex" style={{ background: "#f8fbff" }}>
        <PakistanSidebar activeSection={activeSection} />

        <main className="flex-1 min-w-0">

          {/* ── MATRIC ─────────────────────────────────────────────────── */}
          <section id="matric" className="py-14 px-6 md:px-10 bg-white">
            <div className="max-w-4xl">
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5"
                style={{ background: GREEN_BG, border: `1px solid ${BORDER}` }}
              >
                <span style={{ fontSize: "12px", fontWeight: 700, color: GREEN }}>
                  Pakistan Matric Programme  │  Grade 9 and Grade 10  │  PK1 + PK2
                </span>
              </div>

              <SectionHeading
                eyebrow="Pakistan Board Examinations"
                title="Matric — Grade 9 and Grade 10 Complete Preparation"
                eyebrowColor={GREEN}
              />

              <p style={{ fontSize: "15px", color: BODY, lineHeight: 1.75, marginBottom: "20px" }}>
                EduMeUp's Matric programme covers all core science and compulsory English subjects for
                Grade 9 and Grade 10, aligned to the Federal Board (FBISE) and all major Provincial
                Boards — Lahore Board, Karachi Board, Rawalpindi Board, Multan Board and others.
                Interactive H5P modules, spaced retrieval practice and AI support throughout. Full past
                paper practice from all major boards integrated into every subject course.
              </p>

              {/* Features */}
              <div className="grid md:grid-cols-2 gap-3 mb-8">
                {[
                  "6 core subjects — Grade 9 and Grade 10 syllabuses covered separately",
                  "Aligned to FBISE and all major Provincial Boards",
                  "Interactive H5P modules — practice by doing, not passive reading",
                  "AI Tutor support available 24/7 for any subject question",
                  "Full past paper integration — all major boards, all recent sessions",
                  "Online Exam Preparation and Final Mock Exam services available",
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="flex-shrink-0 mt-0.5" style={{ width: "15px", height: "15px", color: GREEN }} />
                    <p style={{ fontSize: "13px", color: BODY, lineHeight: 1.6 }}>{f}</p>
                  </div>
                ))}
              </div>

              {/* Subject table */}
              <div className="overflow-x-auto rounded-2xl shadow-sm mb-6" style={{ border: `1px solid ${BORDER}` }}>
                <table className="w-full min-w-[400px]">
                  <thead>
                    <tr style={{ background: GREEN }}>
                      <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-white">Subject</th>
                      <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-white">Grade 9</th>
                      <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-white">Grade 10</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matricSubjects.map((row, i) => (
                      <tr key={row.subject} style={{ borderTop: `1px solid ${BORDER}`, background: i % 2 === 0 ? "white" : "#f8fbff" }}>
                        <td className="px-5 py-3 text-sm font-medium" style={{ color: BODY }}>{row.subject}</td>
                        <td className="px-5 py-3 text-center text-lg" style={{ color: GREEN }}></td>
                        <td className="px-5 py-3 text-center text-lg" style={{ color: GREEN }}></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div
                className="rounded-xl p-4 mb-6"
                style={{ background: SOFT, border: `1px solid ${BORDER}` }}
              >
                <p style={{ fontSize: "13px", color: BODY }}>
                  <strong>Note:</strong> Urdu, Islamiyat and Pakistan Studies are NOT included in the
                  EduMeUp Matric programme. The six subjects above are the core science and compulsory
                  English subjects offered.
                </p>
              </div>

              <button
                className="rounded-xl font-bold"
                style={{ background: GREEN, color: "white", fontSize: "14px", padding: "12px 28px", border: "none", cursor: "pointer" }}
              >
                ENROL IN MATRIC PROGRAMME
              </button>
            </div>
          </section>

          <div style={{ height: "1px", background: BORDER }} />

          {/* ── FSc / ICS ───────────────────────────────────────────────── */}
          <section id="fsc" className="py-14 px-6 md:px-10 bg-white">
            <div className="max-w-4xl">
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5"
                style={{ background: AMBER_BG, border: `1px solid ${BORDER}` }}
              >
                <span style={{ fontSize: "12px", fontWeight: 700, color: AMBER }}>
                  Pakistan FSc / ICS Programme  │  Year 1 and Year 2  │  PK3 + PK4
                </span>
              </div>

              <SectionHeading
                eyebrow="Higher Secondary"
                title="FSc and ICS — Pre-Medical, Pre-Engineering and Computer Science Preparation"
                eyebrowColor={AMBER}
              />

              <p style={{ fontSize: "15px", color: BODY, lineHeight: 1.75, marginBottom: "20px" }}>
                EduMeUp's FSc and ICS courses cover Year 1 and Year 2 for all three tracks —
                Pre-Medical, Pre-Engineering and ICS. All courses are aligned to FBISE and major
                Provincial Inter Boards. Science subjects cover all core theory, derivations, numerical
                problems and past paper practice. Year 2 courses include intensive board examination
                preparation.
              </p>

              {/* Features */}
              <div className="grid md:grid-cols-2 gap-3 mb-8">
                {[
                  "Three tracks — Pre-Medical, Pre-Engineering and ICS",
                  "Year 1 and Year 2 courses available separately per subject",
                  "All derivations and numerical problems at board examination standard",
                  "Aligned to FBISE and all major Provincial Inter Boards",
                  "Past paper integration across all recent board examination sessions",
                  "Online Exam Preparation and Final Mock Exam services available",
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="flex-shrink-0 mt-0.5" style={{ width: "15px", height: "15px", color: AMBER }} />
                    <p style={{ fontSize: "13px", color: BODY, lineHeight: 1.6 }}>{f}</p>
                  </div>
                ))}
              </div>

              {/* Subject by track table */}
              <div className="overflow-x-auto rounded-2xl shadow-sm mb-6" style={{ border: `1px solid ${BORDER}` }}>
                <table className="w-full min-w-[500px]">
                  <thead>
                    <tr style={{ background: AMBER }}>
                      <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-white">Subject</th>
                      <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-white">Pre-Medical</th>
                      <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-white">Pre-Engineering</th>
                      <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-white">ICS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fscSubjects.map((row, i) => (
                      <tr key={row.subject} style={{ borderTop: `1px solid ${BORDER}`, background: i % 2 === 0 ? "white" : "#f8fbff" }}>
                        <td className="px-5 py-3 text-sm font-medium" style={{ color: BODY }}>{row.subject}</td>
                        {[row.preMed, row.preEng, row.ics].map((val, j) => (
                          <td key={j} className="px-5 py-3 text-center text-sm"
                            style={{ color: val === "—" ? "#CBD5E1" : AMBER, fontWeight: val === "—" ? 400 : 600 }}>
                            {val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div
                className="rounded-xl p-4 mb-6"
                style={{ background: SOFT, border: `1px solid ${BORDER}` }}
              >
                <p style={{ fontSize: "13px", color: BODY }}>
                  <strong>Note:</strong> Urdu and Islamiyat / Pakistan Studies are NOT included in the
                  EduMeUp FSc/ICS programme. The subjects listed above are the core science and English
                  subjects offered across all three tracks.
                </p>
              </div>

              <button
                className="rounded-xl font-bold"
                style={{ background: AMBER, color: "white", fontSize: "14px", padding: "12px 28px", border: "none", cursor: "pointer" }}
              >
                ENROL IN FSc / ICS PROGRAMME
              </button>
            </div>
          </section>

          <div style={{ height: "1px", background: BORDER }} />

          {/* ── ECAT ────────────────────────────────────────────────────── */}
          <section id="ecat" className="py-14 px-6 md:px-10 bg-white">
            <div className="max-w-4xl">
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5"
                style={{ background: RED_BG, border: `1px solid ${BORDER}` }}
              >
                <span style={{ fontSize: "12px", fontWeight: 700, color: RED }}>
                  ECAT Preparation Programme  │  5 Subjects  │  PK5
                </span>
              </div>

              <SectionHeading
                eyebrow="Engineering Colleges Admission Test"
                title="ECAT — Comprehensive Preparation for All 5 Subjects"
                eyebrowColor={RED}
              />

              <p style={{ fontSize: "15px", color: BODY, lineHeight: 1.75, marginBottom: "20px" }}>
                The Engineering Colleges Admission Test (ECAT) covers five subjects: Mathematics,
                Physics, Chemistry, English and Computer Science. EduMeUp's ECAT preparation programme
                covers the complete ECAT syllabus for all five subjects, matched exactly to the topics
                and difficulty level the ECAT tests. All questions are in MCQ format as the actual ECAT
                uses. The programme includes timed topic tests, full mock tests across all five subjects
                and AI gap analysis so students know exactly which areas are costing them marks before
                the actual test.
              </p>

              {/* Features */}
              <div className="grid md:grid-cols-2 gap-3 mb-8">
                {[
                  "Complete ECAT syllabus coverage — all 5 subjects: Mathematics, Physics, Chemistry, English, Computer Science",
                  "All questions in MCQ format matching the actual ECAT",
                  "Timed topic tests — practice at ECAT speed per subject",
                  "Full ECAT mock examinations with AI performance report per subject",
                  "AI gap analysis — identifies which topics and subjects are costing the most marks",
                  "High-frequency ECAT question patterns identified from past tests",
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="flex-shrink-0 mt-0.5" style={{ width: "15px", height: "15px", color: RED }} />
                    <p style={{ fontSize: "13px", color: BODY, lineHeight: 1.6 }}>{f}</p>
                  </div>
                ))}
              </div>

              {/* ECAT topic columns */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {ecatTopics.map((subj) => (
                  <div
                    key={subj.subject}
                    className="rounded-xl p-5"
                    style={{ background: subj.bg, border: `1.5px solid ${subj.color}22` }}
                  >
                    <p
                      style={{
                        fontFamily: "Sora, sans-serif",
                        fontWeight: 700,
                        fontSize: "14px",
                        color: subj.color,
                        marginBottom: "10px",
                      }}
                    >
                      {subj.subject}
                    </p>
                    <div className="space-y-1.5">
                      {subj.topics.map((t, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span style={{ color: subj.color, fontSize: "12px", marginTop: "1px", flexShrink: 0 }}>•</span>
                          <p style={{ fontSize: "12px", color: BODY, lineHeight: 1.5 }}>{t}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="rounded-xl font-bold"
                style={{ background: RED, color: "white", fontSize: "14px", padding: "12px 28px", border: "none", cursor: "pointer" }}
              >
                ENROL IN ECAT PREPARATION
              </button>
            </div>
          </section>

          <div style={{ height: "1px", background: BORDER }} />

          {/* ── EXAM SERVICES ────────────────────────────────────────────── */}
          <section id="exam-services" className="py-14 px-6 md:px-10" style={{ background: "#f8fbff" }}>
            <div className="max-w-4xl">
              <SectionHeading
                eyebrow="Exam Preparation and Mock Exams"
                title="Online Exam Preparation and Final Mock Exams — Matric · FSc / ICS · ECAT"
              />
              <p style={{ fontSize: "15px", color: BODY, lineHeight: 1.75, marginBottom: "28px" }}>
                Structured online preparation and full timed mock examinations — designed separately for
                each curriculum level. The ECAT services now cover all 5 subjects.
              </p>

              <div className="space-y-4">
                {examServices.map((service) => (
                  <ServiceCard key={service.code} service={service} />
                ))}
              </div>
            </div>
          </section>

          {/* ── BOTTOM BANNER ────────────────────────────────────────────── */}
          <section
            className="py-14 px-6 md:px-10 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #2366c9 0%, #1E3A5F 100%)" }}
          >
            <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
            <div className="max-w-3xl relative z-10">
              <h2
                className="mb-4"
                style={{
                  fontFamily: "Sora, sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.4rem, 3vw, 2rem)",
                  color: "white",
                  lineHeight: 1.2,
                }}
              >
                Board Examinations. University Admission. Every Step, Covered.
              </h2>
              <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.75)", lineHeight: 1.75, marginBottom: "24px" }}>
                From Matric Grade 9 through FSc and ICS Year 2 to ECAT — diagnostic-first,
                AI-powered, board-aligned throughout.
              </p>
              <div className="flex flex-wrap gap-3 mb-4">
                <a
                  href="#matric"
                  className="inline-flex items-center gap-2 rounded-xl font-bold"
                  style={{ background: "white", color: ORANGE, fontSize: "14px", padding: "12px 24px" }}
                >
                  CHOOSE YOUR PROGRAMME
                </a>
                <Link href="/programs/ai-diagnostic">
                  <span
                    className="inline-flex items-center gap-2 rounded-xl font-semibold"
                    style={{
                      background: "rgba(255,255,255,0.12)",
                      color: "white",
                      fontSize: "14px",
                      padding: "12px 24px",
                      border: "1px solid rgba(255,255,255,0.25)",
                      cursor: "pointer",
                    }}
                  >
                    TAKE FREE AI DIAGNOSTIC
                  </span>
                </Link>
              </div>
              <a
                href="/contact"
                style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", textDecoration: "underline" }}
              >
                Questions? Talk to us on WhatsApp →
              </a>
            </div>
          </section>

        </main>
      </div>
    </Layout>
  );
}
