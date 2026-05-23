import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, BookOpen, PenTool, FileText, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";

// ─── DESIGN TOKENS (mirrors About page) ────────────────────────────────────────


// ─── CAMBRIDGE BAND DATA ────────────────────────────────────────────────────────
const cambridgeBands = [
  {
    band: "Band 1",
    examinerSees:
      "Compelling, sophisticated, precise — examiner reads with pleasure. Sentence variety, vivid vocabulary, structural coherence throughout.",
    edumeupDoes:
      "Most students never reach this without deliberate teaching. F3 teaches what it looks like sentence by sentence and scaffolds students to write at this level systematically.",
    color: "#16A34A",
    bg: "#f0fdf4",
  },
  {
    band: "Band 2",
    examinerSees:
      "Clear, organised, mostly accurate — clearly communicates but lacks the precision and variety of Band 1.",
    edumeupDoes:
      "The gap from Band 2 to Band 1 is a vocabulary and sentence variety problem — both taught explicitly in F2 and F3.",
    color: "#2366c9", // brand-primary
    bg: "#eff6ff",
  },
  {
    band: "Band 3",
    examinerSees:
      "Communicates meaning but with frequent errors, limited vocabulary, and predictable structure.",
    edumeupDoes:
      "Where most students without deliberate writing training sit. F1 provides the structural framework; F2 provides the intensive sprint out of Band 3.",
    color: "#d97706",
    bg: "#fffbeb",
  },
  {
    band: "Band 4",
    examinerSees:
      "Basic communication — meaning is often unclear. Limited vocabulary, many errors, no structural control.",
    edumeupDoes:
      "Entry-level writing. The entire three-course pathway is designed to move students from Band 4/3 entry to Band 1 exit.",
    color: "#dc2626",
    bg: "#fef2f2",
  },
];

// ─── 9-STEP SYSTEM DATA ─────────────────────────────────────────────────────────
const nineSteps = [
  {
    step: 1,
    title: "Vocabulary Preview",
    what: "Key words defined before reading — no student is ambushed by unfamiliar vocabulary mid-passage when answering comprehension questions",
    relevance: "Eliminates the most common reason students misread comprehension questions — unfamiliar vocabulary in either text",
    duration: "~15 min",
  },
  {
    step: 2,
    title: "Scanning & Skimming Technique",
    what: "How to locate relevant sections quickly across both reading texts — the reading efficiency skill Cambridge examiners expect",
    relevance: "Exam time management with two texts: students who read both texts word-for-word have insufficient time for written responses",
    duration: "~10 min",
  },
  {
    step: 3,
    title: "MCQs with Full Justifications",
    what: "Every answer explained — not just the right answer but why the wrong answers are wrong",
    relevance: "Cambridge Paper 1 MCQs test fine-grained comprehension distinctions across the two texts",
    duration: "~20 min",
  },
  {
    step: 4,
    title: "Cambridge Exam Questions + Model Answers",
    what: "Authentic past paper questions with full Band 1 model answers and mark-scheme annotation",
    relevance: "The core of the 9-step system — students see exactly what a Band 1 answer looks like for every question type",
    duration: "~30 min",
  },
  {
    step: 5,
    title: "AO Categorisation",
    what: "Every question labelled AO1 (literal), AO2 (inferential), or AO3 (evaluative) — students know which cognitive skill each question tests",
    relevance: "Students who know which AO a question targets write answers pitched at exactly the right cognitive level",
    duration: "~10 min",
  },
  {
    step: 6,
    title: "Exam Skills Tip Per Question Type",
    what: "One targeted technique per question type — derived from Cambridge examiner reports",
    relevance: "Targeted technique per question type is more useful than generic advice",
    duration: "~15 min",
  },
  {
    step: 7,
    title: "Higher-Order Challenge Corner",
    what: "Band 1 extension task — for students targeting the highest marks. Goes beyond the standard mark scheme.",
    relevance: "Shows students what a Band 1 answer looks like when it goes beyond the minimum",
    duration: "~15 min",
  },
  {
    step: 8,
    title: "100% H5P Interactive",
    what: "No passive reading. Every activity is interactive — drag-and-drop, fill-in-blank, matching, or written response",
    relevance: "Active engagement produces stronger retention than passive reading of model answers",
    duration: "~15 min",
  },
  {
    step: 9,
    title: "Timed Practice Under Exam Conditions",
    what: "Final timed simulation — full past paper reading section, real time allocation, immediate feedback on completion",
    relevance: "Final test of exam readiness under pressure — the only reliable way to know whether a student can perform at Paper 1 standard",
    duration: "Full timing",
  },
];

// ─── COMPREHENSION COURSES (C1–C5) ─────────────────────────────────────────────
const comprehensionCourses = [
  {
    id: "C1",
    title: "Comprehension Mastery — Course 1",
    tag: "Paper 1 · Reading",
    feature:
      "Establishes the 9-Step system as a repeatable technique across both reading texts. Students learn to navigate two texts efficiently before answering questions.",
    includes:
      "9-Step system per course · H5P throughout · MCQs with justifications · Cambridge model answers with AO annotation · Timed final simulation",
    badge: "Part of $110 bundle",
  },
  {
    id: "C2",
    title: "Comprehension Mastery — Course 2",
    tag: "Paper 1 · 'In Own Words' Focus",
    feature:
      "The entire course prioritises the 'in own words' / paraphrasing skill — the most common mark-loss area in Cambridge Paper 1. Both reading texts provide source material.",
    includes:
      "Special emphasis on Step 4 (Band 1 model answers for 'in own words' questions) and Step 6 (exam skills tip specifically for paraphrasing)",
    badge: "Part of $110 bundle",
  },
  {
    id: "C3",
    title: "Comprehension Mastery — Course 3",
    tag: "Paper 1 · Inference Focus",
    feature:
      "Targets AO2/AO3 inference questions — the hardest questions on Paper 1 and the ones that most reliably separate Band 1 from Band 2 students.",
    includes:
      "Step 5 (AO categorisation) expanded with detailed AO2/AO3 distinction training · Step 7 expanded: extended inference and evaluation tasks",
    badge: "Part of $110 bundle",
  },
  {
    id: "C4",
    title: "Comprehension Mastery — Course 4",
    tag: "Paper 1 · Summary Question Focus",
    feature:
      "Cambridge Paper 1 typically includes a summary question that requires students to synthesise information from one or both reading texts.",
    includes:
      "3-stage model answer approach (identify from both texts → synthesise → write within word limit) · Step 9 includes a standalone timed summary task",
    badge: "Part of $110 bundle",
  },
  {
    id: "C5",
    title: "Comprehension Mastery — Course 5",
    tag: "Paper 1 · Most Recent Past Paper",
    feature:
      "Uses the most recent available Cambridge Paper 1 past paper. Every step performed under progressively tighter time conditions across both reading texts.",
    includes:
      "Step 9: full timed simulation with AI evaluation and performance report · Time tracking per question included · Comparison against all Band 1 criteria",
    badge: "Part of $110 bundle",
  },
];

// ─── COMPOSITION COURSES ────────────────────────────────────────────────────────
const compositionCourses = [
  {
    id: "F1",
    title: "Essay Types and Structure",
    tag: "Paper 2 · Foundation Course",
    modules: "5 modules",
    feature:
      "Establishes the architectural framework for every essay type Cambridge Paper 2 can set. Students who complete F1 know exactly how to structure a narrative, descriptive, argumentative, and discursive essay.",
    moduleList: [
      "M1 — Narrative Writing: Story Mountain, show don't tell, opening hooks",
      "M2 — Descriptive Writing: Sensory vocabulary, zoom technique, sentence length variation",
      "M3 — Argumentative Writing: PEEL, counterargument management, persuasive devices",
      "M4 — Discursive Writing: Balanced structure, evaluative conclusion",
      "M5 — Cambridge Marking: Band 1–4 Content and Language criteria applied to sample essays",
    ],
    badge: "Part of $145 bundle",
  },
  {
    id: "F2",
    title: "10-Day Band 3 → Band 1 Bridge",
    tag: "Paper 2 · Intensive Sprint",
    modules: "10 daily sessions (~55 min each)",
    feature:
      "A 10-session intensive that moves students from Band 3 to Band 1 writing through daily structured practice with immediate AI feedback.",
    moduleList: [
      "Days 1–3: Narrative — Opening hooks, Show Don't Tell, full timed essay",
      "Days 4–6: Argumentative sprint — PEEL mastery, counterargument, timed essay",
      "Days 7–9: Descriptive sprint — Sensory vocabulary, extended metaphor, timed essay",
      "Day 10: Student choice + full course review · 100 vocabulary words",
    ],
    badge: "Part of $145 bundle",
  },
  {
    id: "F3",
    title: "Complete Mastery — Band 3 to Band 1",
    tag: "Paper 2 · Complete Transformation",
    modules: "12 modules · 120+ activities",
    feature:
      "The most comprehensive Paper 2 composition course available. The Sentence Comparison Approach: every module presents Band 3 sentences alongside Band 1 rewrites with full commentary.",
    moduleList: [
      "M1–M3 — Sentence Comparison Library (30+ Band 3→Band 1 transformations per essay type)",
      "M4–M7 — 30+ authentic O-Level exam prompts (one technique required per prompt)",
      "M8–M11 — 4 full timed Paper 2 essays under exam conditions (AI-evaluated, Band estimate)",
      "M12 — Portfolio review + final assessment + Certificate (80% mastery gate)",
    ],
    badge: "Part of $145 bundle",
  },
];

// ─── DIRECTED WRITING COURSES ───────────────────────────────────────────────────
const directedCourses = [
  {
    id: "DW1",
    title: "Directed Writing Part 1 — All Non-Letter Types",
    tag: "Paper 2 · All Non-Letter Formats",
    modules: "9 modules (~7 hrs)",
    feature:
      "9 modules covering every non-letter directed writing format Cambridge Paper 2 can set. Every module: specific structural conventions, what Cambridge marks as 'format correct', a full Band 1 model answer.",
    moduleList: [
      "M1 Formal Speech · M2 Formal Report · M3 Newspaper/Magazine Article",
      "M4 Formal Email · M5 Review · M6 Blog Post · M7 Newsletter",
      "M8 Exam Technique Integration (45-minute time plan, top 10 examiner-flagged errors)",
      "M9 Integrated Timed Simulation — unseen Paper 2 past paper question, 45 minutes, AI-evaluated",
    ],
    badge: "Price TBC",
    pricePending: true,
  },
  {
    id: "DW2",
    title: "Directed Writing Part 2 — Letters and Applications",
    tag: "Paper 2 · All 6 Letter Types",
    modules: "7 modules + email + mock exam (~8 hrs)",
    feature:
      "6 modules teaching all six Cambridge letter types through the Formal Letter Master Framework — a foundational structural template that all letter types share.",
    moduleList: [
      "M1 Formal Letter Master Framework · M2 Letter to the Editor · M3 Letter of Complaint",
      "M4 Letter of Appreciation · M5 Letter to a Person in Authority · M6 Informal Letter",
      "M7 Letter of Application · FE Formal Email",
      "MOCK — 4-question integrated mock exam · Self-marking checklist against Cambridge Band 1",
    ],
    badge: "Price TBC",
    pricePending: true,
  },
];

// ─── PRICING TABLE DATA ─────────────────────────────────────────────────────────
const pricingRows = [
  {
    course: "Comprehension Mastery — Courses C1 to C5 (bundle)",
    paper: "Paper 1",
    modules: "5 courses × ~90 min",
    includes:
      "9-Step system per past paper · Band 1 model answers · AO annotation · H5P · AI-evaluated written responses · 5 timed simulations · Certificate",
    price: "$110",
    confirmed: true,
  },
  {
    course: "Composition Mastery — F1 + F2 + F3 (bundle)",
    paper: "Paper 2",
    modules: "F1: 5 mod · F2: 10 sessions · F3: 12 mod",
    includes:
      "Essay architecture · Sentence comparison library · 30+ prompts · 4 timed essays · Portfolio · AI chatbot · Certificate",
    price: "$145",
    confirmed: true,
  },
  {
    course: "Directed Writing Part 1 — Non-Letter Types",
    paper: "Paper 2",
    modules: "9 modules (~7 hrs)",
    includes:
      "All non-letter formats · Band 1 model answers from Paper 2 past papers · H5P · AI-evaluated · Timed simulation",
    price: "$[___]",
    confirmed: false,
  },
  {
    course: "Directed Writing Part 2 — Letters and Applications",
    paper: "Paper 2",
    modules: "7 mod + email + mock (~8 hrs)",
    includes:
      "All 6 letter types · Formal email · Master Framework · 4-question integrated mock exam · Self-marking checklist",
    price: "$[___]",
    confirmed: false,
  },
  {
    course: "ALL 10 O-LEVEL ENGLISH COURSES (full programme bundle)",
    paper: "P1+P2",
    modules: "10 courses total",
    includes:
      "Complete Cambridge Paper 1 and Paper 2 preparation — all comprehension, composition, and directed writing formats covered",
    price: "$[___]",
    confirmed: false,
    isBundle: true,
  },
];

// ─── SIDEBAR ────────────────────────────────────────────────────────────────────
function OLevelSidebar({ activeSection }: { activeSection: string }) {
  const links = [
    { href: "the-standard", label: "The Cambridge Standard" },
    { href: "paper-structure", label: "Paper Structure" },
    { href: "comprehension-mastery", label: "Paper 1 — Comprehension Mastery" },
    { href: "nine-step-system", label: "— The 9-Step System" },
    { href: "composition-mastery", label: "Paper 2 — Composition Mastery" },
    { href: "f1-essay-types", label: "— F1 Essay Types" },
    { href: "f2-bridge", label: "— F2 10-Day Bridge" },
    { href: "f3-mastery", label: "— F3 Complete Mastery" },
    { href: "directed-writing", label: "Paper 2 — Directed Writing" },
    { href: "dw1-non-letters", label: "— Part 1: Non-Letter Types" },
    { href: "dw2-letters", label: "— Part 2: Letters" },
    { href: "pricing", label: "Pricing" },
    { href: "enrol", label: "Enrol Now" },
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
        borderRight: "1px solid #dbe7f4",
        padding: "28px 0",
      }}
    >
      <div className="px-4 mb-5">
        <p className="font-bold text-[13px] text-brand-navy mb-1">
          O-Level English
        </p>
        <p className="text-[11px] text-slate-500">Cambridge Paper 1 & Paper 2</p>
      </div>

      <div className="px-4 mb-4">
        <p className="uppercase mb-2 text-[10px] font-bold text-slate-500 tracking-[0.15em]">
          On This Page
        </p>
        {links.map((link) => {
          const isActive = activeSection === link.href;
          const isChild = link.label.startsWith("—");
          return (
            <a
              key={link.href}
              href={`#${link.href}`}
              className={`block rounded-lg text-[12px] font-medium transition-all mb-0.5 ${
                isActive 
                  ? "text-brand-primary bg-brand-primary-soft font-semibold" 
                  : isChild ? "text-slate-900 font-normal" : "text-slate-900 font-medium"
              }`}
              style={{
                padding: isChild ? "5px 12px 5px 20px" : "6px 12px",
              }}
            >
              {link.label}
            </a>
          );
        })}
      </div>

      {/* Quick info */}
       
    </aside>
  );
}

// ─── COURSE GROUP CARD ──────────────────────────────────────────────────────────
function CourseGroupCard({ course, accentColor, accentBg }: any) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`rounded-2xl overflow-hidden transition-all duration-200 border-[1.5px] bg-white ${
        open ? "border-brand-primary shadow-xl" : "border-slate-200 shadow-none"
      }`}
    >
      {/* Header */}
      <div
        className="flex items-start justify-between p-6 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex-1 pr-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="rounded-full px-3 py-0.5 bg-brand-primary-soft text-brand-primary text-[11px] font-bold">
              {course.id}
            </span>
            <span className="rounded-full px-3 py-0.5 bg-brand-primary-soft text-brand-navy text-[11px] font-semibold">
              {course.tag}
            </span>
            {course.badge && (
               <span className="rounded-full px-3 py-0.5 bg-brand-primary-soft text-brand-primary text-[11px] font-bold">
                {course.badge}
              </span>
            )}
          </div>
          <h3 className="font-bold text-[17px] text-brand-navy mb-1">
            {course.title}
          </h3>
            <p className="text-[12px] text-slate-500"> {course.modules}</p>
        </div>
        <span
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform bg-brand-primary-soft text-brand-primary text-[16px] ${
            open ? "rotate-180" : "rotate-0"
          }`}
        >
          ↓
        </span>
      </div>
      {open && (
        <div className="px-6 pb-6 border-t border-slate-200">
          <p className="text-[14px] text-slate-900 leading-relaxed mt-4 mb-4">
            <strong>Key Feature:</strong> {course.feature}
          </p>
          {course.moduleList && (
            <div className="space-y-2">
              <p className="uppercase text-[11px] font-bold text-slate-500 tracking-[0.1em]">
                Module Structure
              </p>
              {course.moduleList.map((item: string, i: number) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-brand-primary font-bold text-[14px] mt-px">
                    
                  </span>
                  <p className="text-[13px] text-slate-900 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          )}
             <div className="mt-4 rounded-xl p-4 bg-brand-primary-soft border border-brand-primary/10">
              <p className="text-[12px] text-brand-primary font-semibold">
                Included: {course.includes}
              </p>
            </div>
        </div>
      )}
    </div>
  );
}

// ─── MAIN PAGE ──────────────────────────────────────────────────────────────────
export default function OLevelEnglish() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    document.title = "O-Level English Language Courses | Cambridge Paper 1 & 2 | EduMeUp";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Ten courses covering every component of Cambridge O-Level English Language — Paper 1 Reading comprehension and Paper 2 Writing. Built from authentic Cambridge past papers, assessed against the official Cambridge Band 1 rubric."
      );
    }

    const sectionIds = [
      "the-standard", "paper-structure", "comprehension-mastery", "nine-step-system",
      "composition-mastery", "f1-essay-types", "f2-bridge", "f3-mastery",
      "directed-writing", "dw1-non-letters", "dw2-letters", "pricing", "enrol",
    ];
     const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
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
      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
       <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-navy">
        <div className="absolute -top-20 -right-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" aria-hidden="true" />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-[1.4fr_0.9fr] gap-8 items-center max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
               <p className="uppercase mb-4 text-[11px] font-bold text-blue-300 tracking-[0.28em]">
                O-Level English Language Courses — Cambridge Paper 1 (Reading) and Paper 2 (Writing)
              </p>
               <h1 className="mb-5 font-bold text-[clamp(2rem,4.5vw,3.2rem)] text-white leading-[1.1]">
                Built From Real Cambridge Past Papers.
              </h1>
               <p className="mb-4 font-bold text-[clamp(1.1rem,2.5vw,1.5rem)] text-blue-300">
                Band 1 Standards. Every Course. Every Lesson.
              </p>
               <p className="mb-8 max-w-2xl text-base text-white/80 leading-relaxed">
                Ten courses covering every component of Cambridge O-Level English Language — Paper 1
                Reading comprehension and Paper 2 Writing (directed writing and composition). Every
                course is built from authentic Cambridge past papers, assessed against the official
                Cambridge Band 1 rubric.
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                 <a
                  href="#comprehension-mastery"
                  className="inline-flex items-center gap-2 rounded-xl font-semibold transition bg-brand-primary text-white text-[14px] px-6 py-3 hover:bg-brand-primary-dark"
                >
                  Explore All 10 Courses →
                </a>
                <Link href="/programs/ai-diagnostic">
                   <span className="inline-flex items-center gap-2 rounded-xl font-semibold bg-white/10 text-white text-[14px] px-6 py-3 border border-white/25 cursor-pointer hover:bg-white/20">
                    Take the Free Diagnostic First
                  </span>
                </Link>
              </div>

               <p className="text-[13px] text-white/50">
                Not yet at O-Level English level?{" "}
                <Link href="/courses/english">
                  <span className="text-blue-300 cursor-pointer underline hover:text-blue-200">
                    Start with the complete English Pathway →
                  </span>
                </Link>
              </p>
            </motion.div>

            {/* Stats panel */}
             <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.45 }}
              className="rounded-[2rem] p-8 bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { stat: "10", label: "Courses", sub: "Covering both Cambridge papers" },
                  { stat: "9-Step", label: "System", sub: "Applied to every Paper 1 course" },
                  { stat: "2", label: "Papers", sub: "Paper 1 Reading + Paper 2 Writing" },
                  { stat: "Band 1", label: "Standard", sub: "Every course, every lesson" },
                ].map((s) => (
                   <div
                    key={s.stat}
                    className="rounded-xl p-4 bg-white/5 border border-white/5"
                  >
                     <p className="font-extrabold text-[22px] text-brand-primary leading-none">
                      {s.stat}
                    </p>
                    <p className="text-[12px] text-white font-semibold">{s.label}</p>
                    <p className="text-[11px] text-white/50 mt-0.5">{s.sub}</p>
                  </div>
                ))}
              </div>
               <div className="rounded-xl p-4 bg-brand-primary/10 border border-brand-primary/20">
                <p className="text-[12px] text-blue-200 font-semibold mb-1">
                  REVISION NOTE
                </p>
                 <p className="text-[12px] text-white/70 leading-relaxed">
                  <strong className="text-white">Paper 1 = Reading</strong> · 2 hrs · 50 marks · 50%
                  <br />
                  <strong className="text-white">Paper 2 = Writing</strong> · 2 hrs · 50 marks · 50%
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MAIN LAYOUT: SIDEBAR + CONTENT ────────────────────────────────────── */}
       <div className="flex bg-slate-50">
        <OLevelSidebar activeSection={activeSection} />

        <main className="flex-1 min-w-0">

          {/* ── SECTION 2: WHAT THE EXAMINER IS LOOKING FOR ─────────────────── */}
          <section id="the-standard" className="py-14 md:py-20 px-6 md:px-10 bg-white">
            <div className="max-w-4xl">
               <p className="uppercase mb-3 text-brand-primary text-[11px] font-bold tracking-[0.28em]">
                What the Cambridge Examiner Is Looking For
              </p>
               <h2 className="mb-6 font-bold text-[clamp(1.5rem,3vw,2.2rem)] text-brand-navy leading-snug">
                Cambridge Examiners Are Not Reading for Enjoyment. They Are Marking Against a Rubric.
              </h2>
               <p className="mb-6 text-[15px] text-slate-900 leading-relaxed max-w-[720px]">
                Cambridge O-Level English Language examiners use two marking criteria:{" "}
                <strong>Content</strong> (what the student communicates — relevance, completeness,
                understanding) and <strong>Language</strong> (how they communicate it — accuracy,
                range, precision). Both criteria use the same Band 1–4 scale. A student can have
                excellent content and still score Band 3 because of limited vocabulary. A student can
                write beautifully and still score Band 3 because they misunderstood the question.
              </p>
               <p className="text-[15px] text-slate-900 leading-relaxed max-w-[720px]">
                EduMeUp's O-Level English courses are built to close both gaps simultaneously. Every
                lesson targets both Content and Language criteria as defined by the official Cambridge
                Band 1 rubric.
              </p>
            </div>

            {/* Cambridge Band Comparison Table */}
             <div className="mt-10 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
              <table className="w-full min-w-[640px]">
                <thead>
                   <tr className="bg-brand-primary">
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-white">
                      Cambridge Band
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-white">
                      What the Examiner Sees
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-white">
                      What EduMeUp Does About It
                    </th>
                  </tr>
                </thead>
                <tbody>
                   {cambridgeBands.map((row: any, i: number) => (
                       <tr
                        key={row.band}
                        className={`border-t border-slate-200 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}
                      >
                      <td className="px-5 py-4">
                        <span
                          className="inline-block rounded-lg px-3 py-1 font-bold text-sm"
                          style={{ background: row.bg, color: row.color }}
                        >
                          {row.band}
                        </span>
                      </td>
                       <td className="px-5 py-4 text-sm text-slate-900 leading-relaxed max-w-[280px]">
                        {row.examinerSees}
                      </td>
                       <td className="px-5 py-4 text-sm text-slate-900 leading-relaxed max-w-[280px]">
                        {row.edumeupDoes}
                      </td>
                     </tr>
                   ))}
                </tbody>
              </table>
            </div>

            {/* Stats strip */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { stat: "10", label: "Courses covering both Cambridge papers" },
                { stat: "9-Step", label: "Learning Mastery System applied to every Paper 1 course" },
                { stat: "2 Papers", label: "All Cambridge O-Level English components covered" },
              ].map((s) => (
                 <div
                  key={s.stat}
                  className="rounded-xl p-5 text-center bg-brand-primary-soft border border-blue-200"
                >
                    <p className="font-extrabold text-[24px] text-brand-primary">
                    {s.stat}
                  </p>
                   <p className="text-[12px] text-slate-500 mt-1 leading-relaxed">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── SECTION 3: PAPER STRUCTURE ──────────────────────────────────── */}
          <section
            id="paper-structure"
            className="py-14 md:py-20 px-6 md:px-10"
            style={{ background: "white" }}
          >
             <p className="uppercase mb-3 text-brand-primary text-[11px] font-bold tracking-[0.28em]">
                Official Cambridge O-Level English Language Syllabus — Confirmed Structure
              </p>
               <h2 className="mb-8 font-bold text-[clamp(1.4rem,2.5vw,2rem)] text-brand-navy">
                Cambridge O-Level English Paper Structure — At a Glance
              </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Paper 1 */}
               <div className="rounded-2xl p-7 bg-brand-primary-soft border-2 border-brand-primary">
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg bg-brand-primary">
                    P1
                  </div>
                  <div>
                     <p className="font-bold text-[18px] text-brand-navy">
                      Paper 1 — Reading
                    </p>
                     <p className="text-[12px] text-slate-500">2 hours · 50 marks · 50%</p>
                  </div>
                </div>
                 <p className="text-[14px] text-slate-900 leading-relaxed mb-3">
                  <strong>What the exam contains:</strong> Structured and extended writing questions
                  based on <strong>TWO reading texts</strong>. Questions test literal comprehension,
                  inference, evaluation, and summary skills across both texts.
                </p>
                 <p className="text-[14px] text-slate-900 leading-relaxed mb-3">
                  <strong>Key skill required:</strong> Reading two texts accurately and efficiently,
                  then producing structured written responses to comprehension questions at AO1
                  (literal), AO2 (inferential), and AO3 (evaluative) levels.
                </p>
                 <div className="rounded-xl p-3 bg-blue-100 border border-blue-200">
                   <p className="text-[12px] text-brand-primary font-semibold">
                    EduMeUp courses for Paper 1:
                    <br />→ Comprehension Mastery — 5 courses, one past paper per course, 9-Step
                    Learning Mastery System
                  </p>
                </div>
              </div>

              {/* Paper 2 */}
               <div className="rounded-2xl p-7 bg-slate-50 border-2 border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg bg-brand-primary-dark">
                    P2
                  </div>
                  <div>
                     <p className="font-bold text-[18px] text-brand-navy">
                      Paper 2 — Writing
                    </p>
                     <p className="text-[12px] text-slate-500">2 hours · 50 marks · 50%</p>
                  </div>
                </div>
                 <p className="text-[14px] text-slate-900 leading-relaxed mb-3">
                  <strong>What the exam contains:</strong> PART 1 — Directed Writing question
                  (speech, report, article, letter, email, etc. using provided stimulus material).
                  PART 2 — Composition task (narrative, descriptive, argumentative, or discursive
                  essay).
                </p>
                 <p className="text-[14px] text-slate-900 leading-relaxed mb-3">
                  <strong>Key skill required:</strong> Format accuracy, structural control, vocabulary
                  range and precision, sentence variety, and the ability to communicate at Cambridge
                  Band 1 standard under timed conditions.
                </p>
                 <div className="rounded-xl p-3 bg-blue-100 border border-blue-200">
                   <p className="text-[12px] text-blue-900 font-semibold">
                    EduMeUp courses for Paper 2:
                    <br />→ Composition Mastery — F1, F2, F3 ($145 bundle)
                    <br />→ Directed Writing — Parts 1 and 2
                  </p>
                </div>
              </div>
            </div>

            {/* Two-texts callout */}
             <div className="rounded-xl p-5 bg-brand-primary-soft border-2 border-blue-200">
              <p style={{ fontSize: "14px", color: "#166534", lineHeight: 1.7, fontWeight: 500 }}>
                <strong> IMPORTANT — Paper 1 uses TWO reading texts:</strong> Every comprehension
                question in Paper 1 is based on two reading texts provided in the exam. EduMeUp's 5
                Comprehension Mastery courses are built on past papers that use this two-text format —
                so students practise navigating and answering questions across two different reading
                passages exactly as the Cambridge examination requires. Skimming and scanning technique
                (Step 2 of the 9-Step system) is taught specifically for two-text navigation.
              </p>
            </div>
          </section>

       <section
        id="comprehension-mastery"
        className="py-14 md:py-20 px-6 md:px-10 bg-brand-primary-soft"
      >
            <div className="max-w-5xl">
               <p className="uppercase mb-2 text-brand-primary text-[11px] font-bold tracking-[0.28em]">
                Cambridge O-Level English · Paper 1 — Reading
              </p>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
                 <h2 className="font-bold text-[clamp(1.5rem,3vw,2rem)] text-brand-navy">
                  Comprehension Mastery
                </h2>
                 <span className="inline-flex items-center rounded-xl px-4 py-2 font-bold text-sm bg-brand-primary text-white">
                  Bundle: $110 (all 5 courses)
                </span>
              </div>
               <p className="text-[14px] text-slate-500 mb-6">
                Five courses · one complete Cambridge past paper per course · 9-Step Learning Mastery
                System applied to every lesson · 5 courses · All Available
              </p>

              {/* Course cards */}
              <div className="space-y-4">
                 {comprehensionCourses.map((course: any) => (
                  <CourseGroupCard
                    key={course.id}
                    course={course}
                    accentColor="#2366c9"
                    accentBg="#eef6ff"
                  />
                ))}
              </div>
            </div>
          </section>

          {/* ── SECTION 5: 9-STEP SYSTEM ────────────────────────────────────── */}
          <section id="nine-step-system" className="py-14 md:py-20 px-6 md:px-10 bg-white">
            <div className="max-w-5xl">
               <p className="uppercase mb-2 text-brand-primary text-[11px] font-bold tracking-[0.28em]">
                Applied to Every Paper 1 Comprehension Course
              </p>
               <h2 className="mb-4 font-bold text-[clamp(1.4rem,2.5vw,1.9rem)] text-brand-navy">
                The 9-Step Learning Mastery System
              </h2>
               <p className="text-[14px] text-slate-900 leading-relaxed mb-8 max-w-[680px]">
                Every EduMeUp Comprehension Mastery course is built around one complete Cambridge
                Paper 1 past paper — including both reading texts — taught through the 9-Step
                Learning Mastery System applied consistently across all 5 courses.
              </p>

              <div className="space-y-3">
                {nineSteps.map((step: any) => (
                   <div
                    key={step.step}
                    className="rounded-xl overflow-hidden border-[1.5px] border-slate-200 bg-white"
                  >
                    <div className="flex items-stretch">
                      {/* Step number */}
                       <div className="flex-shrink-0 flex items-center justify-center w-14 bg-brand-primary">
                         <span className="font-extrabold text-[20px] text-white">
                          {step.step}
                        </span>
                      </div>
                      {/* Content */}
                      <div className="flex-1 p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                             <p className="font-bold text-[14px] text-brand-navy mb-1">
                              {step.title}
                            </p>
                             <p className="text-[13px] text-slate-900 leading-relaxed">
                              {step.what}
                            </p>
                          </div>
                          <div className="flex-shrink-0 text-right">
                             <span className="inline-block rounded-full px-3 py-1 bg-brand-primary-soft text-brand-primary text-[11px] font-bold">
                              {step.duration}
                            </span>
                          </div>
                        </div>
                         <div className="mt-3 rounded-lg p-3 bg-brand-primary-soft border border-blue-200">
                          <p style={{ fontSize: "12px", color: "#1E3A5F", lineHeight: 1.5 }}>
                            <strong>Cambridge Relevance:</strong> {step.relevance}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

       <section
        id="composition-mastery"
        className="py-14 md:py-20 px-6 md:px-10 bg-slate-50"
      >
            <div className="max-w-5xl">
               <p className="uppercase mb-2 text-brand-primary text-[11px] font-bold tracking-[0.28em]">
                Cambridge O-Level English · Paper 2 — Writing · Composition task
              </p>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
                 <h2 className="font-bold text-[clamp(1.5rem,3vw,2rem)] text-brand-navy">
                  Composition Mastery
                </h2>
                 <span className="inline-flex items-center rounded-xl px-4 py-2 font-bold text-sm bg-brand-primary-dark text-white">
                  Bundle: $145 (all 3 courses)
                </span>
              </div>
               <p className="text-[14px] text-slate-500 mb-3">
                Three progressive courses · Band 3 → Band 1 transformation · Official Cambridge Band
                1 rubric taught and applied throughout · 3 courses · All Available
              </p>

               <div className="rounded-xl p-5 mb-8 bg-white border border-indigo-200">
                 <p className="font-bold text-[14px] text-brand-navy mb-2">
                  Why Three Courses?
                </p>
                 <p className="text-[13px] text-slate-900 leading-relaxed">
                  Paper 2 Part 2 (the composition task) requires three distinct capabilities: (1)
                  knowing the architecture of each essay type — what goes where and how to structure
                  narrative, descriptive, argumentative, and discursive writing, (2) acquiring the
                  vocabulary and sentence variety that Cambridge Band 1 Language criteria reward, and
                  (3) sufficient deliberate practice — timed essays with immediate feedback — to
                  perform at Band 1 standard under exam conditions. The three Composition courses
                  address each in sequence.{" "}
                  <strong>They are most effective taken in order: F1 → F2 → F3.</strong>
                </p>
              </div>

              {/* F1, F2, F3 */}
              <div className="space-y-4" id="f1-essay-types">
                {compositionCourses.map((course: any, i: number) => (
                  <div key={course.id} id={i === 1 ? "f2-bridge" : i === 2 ? "f3-mastery" : undefined}>
                    <CourseGroupCard
                      course={course}
                      accentColor="#2366c9"
                      accentBg="#eef6ff"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── SECTION 7: DIRECTED WRITING ──────────────────────────────────── */}
          <section
            id="directed-writing"
            className="py-14 md:py-20 px-6 md:px-10 bg-white"
          >
            <div className="max-w-5xl">
               <p className="uppercase mb-2 text-brand-primary text-[11px] font-bold tracking-[0.28em]">
                Cambridge O-Level English · Paper 2 — Writing · Directed writing question
              </p>
               <h2 className="mb-4 font-bold text-[clamp(1.5rem,3vw,2rem)] text-brand-navy">
                Directed Writing Mastery
              </h2>
               <p className="text-[14px] text-slate-500 mb-3">
                Two courses · all Cambridge directed writing formats · current syllabus Cambridge past
                papers (2021–2024) · 2 courses · All Available
              </p>

               <div className="rounded-xl p-5 mb-8 bg-brand-primary-soft border border-blue-200">
                 <p className="font-bold text-[14px] text-brand-navy mb-2">
                  Why Directed Writing Is the Most Format-Dependent Component
                </p>
                 <p className="text-[13px] text-brand-navy leading-relaxed">
                  In Cambridge Paper 2, the directed writing question awards marks in two dimensions:{" "}
                  <strong>Format</strong> (does the writing look and sound like the type it claims to
                  be?) and <strong>Content/Language</strong>. A student can write well and still score
                  a lower band if they do not know the precise structural conventions of a speech vs. a
                  report vs. a letter of complaint. <strong>Format marks are awarded before the
                  examiner reads the content.</strong> EduMeUp's two Directed Writing courses teach
                  every format Cambridge can set — so no student can be surprised by any directed
                  writing question on Paper 2.
                </p>
              </div>

               <div className="rounded-xl p-4 mb-8 bg-brand-primary-soft border border-blue-200">
                 <p className="text-[13px] text-brand-navy leading-relaxed">
                  <strong>STIMULUS MATERIAL IN PAPER 2 DIRECTED WRITING:</strong> Cambridge Paper 2
                  directed writing questions often provide stimulus material — a scenario, a brief
                  text, or contextual information — that the student must incorporate into their
                  written response. All EduMeUp Directed Writing courses are built from real Cambridge
                  Paper 2 past paper questions, so students practise with authentic stimulus material
                  in the exact format Cambridge provides it.
                </p>
              </div>

              {/* DW1 and DW2 */}
              <div className="space-y-4" id="dw1-non-letters">
                {directedCourses.map((course: any, i: number) => (
                  <div key={course.id} id={i === 1 ? "dw2-letters" : undefined}>
                    <CourseGroupCard
                      course={course}
                      accentColor="#2366c9"
                      accentBg="#eef6ff"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

       <section
        id="pricing"
        className="py-14 md:py-20 px-6 md:px-10 bg-brand-primary-soft"
      >
            <div className="max-w-5xl">
               <p className="uppercase mb-2 text-brand-primary text-[11px] font-bold tracking-[0.28em]">
                All Prices in USD Only
              </p>
                 <h2 className="font-bold text-[clamp(1.5rem,3vw,2rem)] text-brand-navy mb-3">
                  Pricing Summary — All 10 O-Level English Courses
                </h2>
               <p className="text-[13px] text-slate-500 mb-6">
                Three prices are pending CA confirmation before page launch: Directed Writing Part 1,
                Directed Writing Part 2, and the full-programme bundle. Confirmed prices are shown
                prominently.
              </p>

               <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                <table className="w-full min-w-[700px]">
                  <thead>
                     <tr className="bg-brand-primary">
                      {["Course", "Paper", "Modules", "Includes", "Price (USD)"].map((h) => (
                        <th
                          key={h}
                          className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-white"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pricingRows.map((row: any, i: number) => (
                       <tr
                        key={row.course}
                        className={`border-t border-slate-200 ${row.isBundle ? "bg-brand-primary-soft" : i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}
                      >
                         <td className={`px-4 py-3 text-sm text-slate-900 max-w-[220px] ${row.isBundle ? "font-bold" : "font-medium"}`}>
                          {row.course}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className="inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold"
                            style={{
                              background: row.paper.includes("P1+P2")
                                 ? "#dbeafe"
                                : row.paper === "Paper 1"
                                ? "#eef6ff"
                                : "#eef6ff",
                               color: row.paper.includes("P1+P2")
                                ? "#1e3a8a"
                                : row.paper === "Paper 1"
                                ? "#2366c9"
                                : "#1e3a8a",
                            }}
                          >
                            {row.paper}
                          </span>
                        </td>
                         <td className="px-4 py-3 text-xs text-slate-500 max-w-[140px]">
                          {row.modules}
                        </td>
                         <td className="px-4 py-3 text-xs text-slate-500 max-w-[220px] leading-relaxed">
                          {row.includes}
                        </td>
                        <td className="px-4 py-3">
                             <span className={`font-extrabold text-[16px] ${row.confirmed ? "text-brand-primary" : "text-slate-500"}`}>
                              {row.price}
                            </span>
                          {!row.confirmed && (
                            <p style={{ fontSize: "10px", color: "#2563eb", marginTop: "2px" }}>
                              Pending CA confirmation
                            </p>
                          )}
                        </td>
                        </tr>
                    ))}
                  </tbody>
                </table>
              </div>

               <p className="text-[12px] text-slate-500 mt-3">
                Prices shown in USD only. Never display PKR or local currency on this page.
              </p>
            </div>
          </section>

       <section
        id="enrol"
        className="py-16 md:py-24 px-6 md:px-10 relative overflow-hidden bg-gradient-to-br from-brand-navy to-brand-primary"
      >
            <div
              className="absolute -top-16 -left-16 h-64 w-64 rounded-full opacity-20 blur-3xl"
              style={{ background: "#3B82F6" }}
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full opacity-20 blur-3xl"
              style={{ background: "#3B82F6" }}
              aria-hidden="true"
            />

            <div className="max-w-5xl relative z-10">
              <p
                className="uppercase mb-3"
                style={{ color: "#93c5fd", fontSize: "11px", fontWeight: 700, letterSpacing: "0.28em" }}
              >
                Cambridge O-Level English Is Learnable. Every Mark Is Earnable.
              </p>
               <h2 className="mb-4 font-bold text-[clamp(1.5rem,3vw,2.2rem)] text-white leading-snug max-w-[640px]">
                Cambridge Band 1 Is Not a Gift. It Is the Outcome of Knowing Exactly What the
                Examiner Is Looking For.
              </h2>
               <p className="mb-10 max-w-2xl text-[15px] text-white/75 leading-relaxed">
                These 10 courses teach the standard. The practice is built in. Choose the step that is
                right for you right now.
              </p>

              {/* Three CTA Cards */}
              <div className="grid md:grid-cols-3 gap-6 mb-10">
                {/* Primary */}
                 <div className="rounded-[2rem] p-7 flex flex-col bg-brand-primary border-4 border-white/20 shadow-2xl scale-[1.02]">
                   <h3 className="font-bold text-[20px] text-white mb-2">
                    Enrol in the Full Programme
                  </h3>
                  <p style={{ fontSize: "13px", color: "#93c5fd", fontWeight: 600, marginBottom: "12px" }}>
                    All 10 courses — Paper 1 (Reading) and Paper 2 (Writing) — complete preparation.
                  </p>
                   <p className="text-[13px] text-white/75 leading-relaxed flex-1 mb-4">
                    Paper 1: 5 Comprehension Mastery courses. Paper 2: 3 Composition courses + 2
                    Directed Writing courses. Everything Cambridge can set. Everything the mark scheme
                    rewards.
                  </p>
                  <Link href="/programs/o-level-english/enrol">
                   <span className="flex items-center justify-center gap-2 rounded-xl font-bold bg-white text-brand-primary text-[14px] p-3 cursor-pointer">
                    Enrol in All 10 Courses →
                  </span>
                  </Link>
                </div>

                {/* Secondary */}
                 <div className="rounded-[2rem] p-7 flex flex-col bg-white border-4 border-brand-primary shadow-xl">
                   <h3 className="font-bold text-[18px] text-brand-navy mb-2">
                    Take the Free Diagnostic First
                  </h3>
                   <p className="text-[13px] text-brand-primary font-bold mb-3">
                    Already strong in Paper 1? Only need Paper 2? The diagnostic tells you which
                    courses to prioritise.
                  </p>
                   <p className="text-[13px] text-slate-900 leading-relaxed flex-1 mb-4">
                    The 30-minute diagnostic assesses your Paper 1 reading comprehension level and
                    Paper 2 writing ability — and recommends exactly which of the 10 courses to
                    prioritise.
                  </p>
                  <Link href="/programs/ai-diagnostic">
                   <span className="flex items-center justify-center gap-2 rounded-xl font-bold bg-brand-primary text-white text-[14px] p-3 cursor-pointer">
                    Take the Free Diagnostic →
                  </span>
                  </Link>
                </div>

                {/* Tertiary */}
                <div
                  className="rounded-[2rem] p-7 flex flex-col"
                  style={{ background: "#F1F5F9", border: "4px solid white" }}
                >
                   <h3 className="font-bold text-[18px] text-brand-navy mb-2">
                    Not Yet at O-Level English Level?
                  </h3>
                   <p className="text-[13px] text-slate-500 font-bold mb-3">
                    Start with the English Language Pathway first — then return here.
                  </p>
                   <p className="text-[13px] text-slate-500 leading-relaxed flex-1 mb-4">
                    If your diagnostic result is below B2, the complete English pathway (Vocabulary →
                    RC68 → ESL1 → ESL2 → Bridge) takes you to O-Level ready standard before these
                    courses begin.
                  </p>
                  <Link href="/courses/english">
                   <span className="flex items-center justify-center gap-2 rounded-xl font-bold bg-white text-brand-navy text-[14px] p-3 border-2 border-slate-200 cursor-pointer">
                    View the Full English Pathway →
                  </span>
                  </Link>
                </div>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                {[
                  " Band 1 Standard Throughout",
                  " Built From Real Cambridge Past Papers",
                  " Covers Both Papers — Paper 1 & Paper 2",
                  " AI-Evaluated Written Tasks",
                  " Certificate on Completion",
                  " All 10 Courses Available Now",
                ].map((item) => (
                  <span
                    key={item}
                    style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", fontWeight: 500 }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </section>

        </main>
      </div>
    </Layout>
  );
}