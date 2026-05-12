import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, BookOpen, FileText, Brain, CheckCircle2, AlertTriangle, Download, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";

// ─── DATA ──────────────────────────────────────────────────────────────────────

const subjectColours: Record<string, string> = {
  Mathematics: "#1E3A5F",
  Physics: "#2E75B6",
  Chemistry: "#1A7A4A",
  Biology: "#2ECC71",
  Economics: "#D4A017",
  "Business Studies": "#E67E22",
  "English Language": "#17A589",
  Urdu: "#8E44AD",
  Islamiyat: "#117A65",
  "Pakistan Studies": "#C0392B",
};

const topicalWorkbooks = [
  // Mathematics
  { subject: "Mathematics", topic: "Number — Types and Properties", questions: "20 questions", price: "$8" },
  { subject: "Mathematics", topic: "Fractions, Decimals and Percentages", questions: "20 questions", price: "$8" },
  { subject: "Mathematics", topic: "Ratio and Proportion", questions: "20 questions", price: "$8" },
  { subject: "Mathematics", topic: "Directed Numbers", questions: "18 questions", price: "$8" },
  { subject: "Mathematics", topic: "Indices and Standard Form", questions: "18 questions", price: "$8" },
  { subject: "Mathematics", topic: "Algebra — Expressions and Formulae", questions: "22 questions", price: "$8" },
  { subject: "Mathematics", topic: "Linear Equations and Inequalities", questions: "20 questions", price: "$8" },
  { subject: "Mathematics", topic: "Simultaneous Equations", questions: "18 questions", price: "$8" },
  { subject: "Mathematics", topic: "Quadratic Equations", questions: "20 questions", price: "$8" },
  { subject: "Mathematics", topic: "Functions and Graphs", questions: "18 questions", price: "$8" },
  { subject: "Mathematics", topic: "Coordinate Geometry", questions: "20 questions", price: "$8" },
  { subject: "Mathematics", topic: "Geometry — Angles and Lines", questions: "22 questions", price: "$8" },
  { subject: "Mathematics", topic: "Mensuration", questions: "20 questions", price: "$8" },
  { subject: "Mathematics", topic: "Trigonometry (Sine, Cosine, Bearings)", questions: "20 questions", price: "$8" },
  // Physics
  { subject: "Physics", topic: "Measurements and Units", questions: "18 questions", price: "$8" },
  { subject: "Physics", topic: "Motion and Forces — Newton's Laws", questions: "22 questions", price: "$8" },
  { subject: "Physics", topic: "Energy, Work and Power", questions: "20 questions", price: "$8" },
  { subject: "Physics", topic: "Pressure and Density", questions: "18 questions", price: "$8" },
  { subject: "Physics", topic: "Thermal Physics", questions: "22 questions", price: "$8" },
  { subject: "Physics", topic: "Waves — Properties and Applications", questions: "20 questions", price: "$8" },
  { subject: "Physics", topic: "Light and Optics", questions: "18 questions", price: "$8" },
  { subject: "Physics", topic: "Electricity — Circuits and Resistance", questions: "22 questions", price: "$8" },
  { subject: "Physics", topic: "Electromagnetism", questions: "18 questions", price: "$8" },
  { subject: "Physics", topic: "Atomic Physics and Radioactivity", questions: "20 questions", price: "$8" },
  // Chemistry
  { subject: "Chemistry", topic: "Atomic Structure and the Periodic Table", questions: "20 questions", price: "$8" },
  { subject: "Chemistry", topic: "Chemical Bonding", questions: "20 questions", price: "$8" },
  { subject: "Chemistry", topic: "Stoichiometry and Mole Calculations", questions: "22 questions", price: "$8" },
  { subject: "Chemistry", topic: "Electrochemistry", questions: "18 questions", price: "$8" },
  { subject: "Chemistry", topic: "Rates of Reaction", questions: "20 questions", price: "$8" },
  { subject: "Chemistry", topic: "Acids, Bases and Salts", questions: "22 questions", price: "$8" },
  { subject: "Chemistry", topic: "Organic Chemistry", questions: "20 questions", price: "$8" },
  { subject: "Chemistry", topic: "Metals and Reactivity", questions: "18 questions", price: "$8" },
  // Biology
  { subject: "Biology", topic: "Cell Biology and Organisation", questions: "20 questions", price: "$8" },
  { subject: "Biology", topic: "Nutrition in Humans — Digestion", questions: "22 questions", price: "$8" },
  { subject: "Biology", topic: "Nutrition in Plants — Photosynthesis", questions: "20 questions", price: "$8" },
  { subject: "Biology", topic: "Transport in Humans", questions: "22 questions", price: "$8" },
  { subject: "Biology", topic: "Respiration", questions: "18 questions", price: "$8" },
  { subject: "Biology", topic: "Excretion and the Kidneys", questions: "18 questions", price: "$8" },
  { subject: "Biology", topic: "Coordination and Response", questions: "20 questions", price: "$8" },
  { subject: "Biology", topic: "Reproduction and Inheritance", questions: "22 questions", price: "$8" },
  { subject: "Biology", topic: "Disease and Immunity", questions: "18 questions", price: "$8" },
  { subject: "Biology", topic: "Ecology and the Environment", questions: "20 questions", price: "$8" },
  // English Language
  { subject: "English Language", topic: "Comprehension — Reading Strategies", questions: "18 questions", price: "$8" },
  { subject: "English Language", topic: "Comprehension — Summary Writing", questions: "15 questions", price: "$8" },
  { subject: "English Language", topic: "Comprehension — Language Analysis", questions: "15 questions", price: "$8" },
  { subject: "English Language", topic: "Essay Writing — Narrative and Descriptive", questions: "12 tasks", price: "$8" },
  { subject: "English Language", topic: "Essay Writing — Argumentative and Discursive", questions: "12 tasks", price: "$8" },
  { subject: "English Language", topic: "Directed Writing — Letters (All Types)", questions: "12 tasks", price: "$8" },
  { subject: "English Language", topic: "Directed Writing — Reports and Articles", questions: "12 tasks", price: "$8" },
  { subject: "English Language", topic: "Directed Writing — Speeches and Interviews", questions: "10 tasks", price: "$8" },
  // Economics
  { subject: "Economics", topic: "Supply and Demand", questions: "20 questions", price: "$8" },
  { subject: "Economics", topic: "Market Structures", questions: "18 questions", price: "$8" },
  { subject: "Economics", topic: "Money and Banking", questions: "18 questions", price: "$8" },
  { subject: "Economics", topic: "International Trade", questions: "18 questions", price: "$8" },
  { subject: "Economics", topic: "Government and the Economy", questions: "20 questions", price: "$8" },
  // Business Studies
  { subject: "Business Studies", topic: "Business Organisation", questions: "20 questions", price: "$8" },
  { subject: "Business Studies", topic: "Marketing", questions: "20 questions", price: "$8" },
  { subject: "Business Studies", topic: "Finance and Accounts", questions: "18 questions", price: "$8" },
  { subject: "Business Studies", topic: "Human Resources", questions: "18 questions", price: "$8" },
];

const mindMaps = [
  { subject: "Mathematics", topics: "25 topics", included: "All 25 O-Level Maths topics. Colour-coded by chapter. Formula references included." },
  { subject: "Physics", topics: "27 sub-topics", included: "All 6 main topics + sub-topics. Key formulae on each map. Unit references." },
  { subject: "Chemistry", topics: "11 topics", included: "All 11 Chemistry topics. Equation boxes. Reaction type indicators." },
  { subject: "Biology", topics: "21 topics", included: "All 21 Biology topics. Process diagrams referenced. Terminology highlighted." },
  { subject: "Economics", topics: "Full syllabus", included: "All macro and micro topics. Key definitions. Diagram reference boxes." },
  { subject: "Business Studies", topics: "Full syllabus", included: "All Business Studies topics. Case study links. Key terminology." },
  { subject: "English Language", topics: "Full syllabus", included: "Paper 1 (Reading) + Paper 2 (Writing) skill maps. Format guides. Band descriptors overview." },
  { subject: "Islamiyat", topics: "Full syllabus", included: "All topics per Cambridge Islamiyat syllabus." },
  { subject: "Pakistan Studies", topics: "Full syllabus", included: "All Geography and History topics. Timeline references." },
];

const allSubjects = ["All", "Mathematics", "Physics", "Chemistry", "Biology", "Economics", "Business Studies", "English Language", "Urdu", "Islamiyat", "Pakistan Studies"];

const bundleCounts: Record<string, string> = {
  Mathematics: "14 available",
  Physics: "10 available",
  Chemistry: "8 available",
  Biology: "10 available",
  "English Language": "8 available",
};

const howToUseSteps = [
  {
    number: 1,
    title: "Attempt Without the Solutions",
    description: "Work through the questions as you would in a real Cambridge exam. Do not look at the solutions until you have attempted every question — even if you are unsure. This is the most important step. The struggle is where learning happens.",
  },
  {
    number: 2,
    title: "Mark Your Own Work",
    description: "Turn to the enhanced solutions at the end of the workbook (topical workbooks) or access solutions on the EduMeUp platform (past paper collections). Mark each answer against the solution. Do not just check if your answer matches — read the full explanation to understand why the answer is correct and what the marking criteria require.",
  },
  {
    number: 3,
    title: "Identify Your Pattern",
    description: "Look across your marked answers. Are the mistakes in one specific topic area? Are you consistently losing marks on a particular question type? Your mistake pattern tells you exactly what to practise next.",
  },
  {
    number: 4,
    title: "Link to EduMeUp Platform",
    description: "Take the relevant EduMeUp diagnostic or enrol in the specific course topic that matches your identified gap. The workbook identifies the problem — the EduMeUp platform gives you the targeted practice to close it.",
  },
];

const pricingData = [
  { product: "Topical Workbook — Individual", price: "$8", notes: "Per subject, per topic. Enhanced solutions included at end." },
  { product: "Subject Workbook Bundle", price: "$95", notes: "All available topical workbooks for one subject. Includes all future workbooks added for that subject." },
  { product: "Past Paper Collection — 1 Year", price: "$10", notes: "One subject. Most recent Cambridge past paper. Papers only — solutions on platform." },
  { product: "Past Paper Collection — 5 Years", price: "$35", notes: "One subject. 5 most recent Cambridge past papers. Papers only — solutions on platform. Saving $15 vs 5 × $10." },
  { product: "Subject Mind Map Set", price: "$15", notes: "Full subject — all topics. Paid complete version. Samples on /free-resources." },
  { product: "Complete Subject Resource Pack", price: "$120", notes: "Workbook Bundle ($95) + 5-Year Past Papers ($35) + Mind Maps ($15) = $145 separately. Save $25." },
];

const pastPaperSubjects = [
  { subject: "Mathematics", oneYear: true, fiveYears: true, notes: "Cambridge O-Level and IGCSE variants available" },
  { subject: "Physics", oneYear: true, fiveYears: true, notes: "Paper 1 (Multiple Choice) NOT included — structured questions only per EduMeUp policy" },
  { subject: "Chemistry", oneYear: true, fiveYears: true, notes: "Paper 1 NOT included — structured questions only" },
  { subject: "Biology", oneYear: true, fiveYears: true, notes: "Paper 1 NOT included — structured questions only" },
  { subject: "Economics", oneYear: true, fiveYears: true, notes: "" },
  { subject: "Business Studies", oneYear: true, fiveYears: true, notes: "" },
  { subject: "English Language", oneYear: true, fiveYears: true, notes: "Paper 1 and Paper 2 available separately or together" },
  { subject: "Urdu", oneYear: true, fiveYears: true, notes: "" },
  { subject: "Islamiyat", oneYear: true, fiveYears: true, notes: "" },
  { subject: "Pakistan Studies", oneYear: true, fiveYears: true, notes: "" },
];

// ─── COMPONENT ─────────────────────────────────────────────────────────────────

export default function ExamWorkbooks() {
  const [activeTab, setActiveTab] = useState<"topical" | "pastpapers" | "mindmaps">("topical");
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [pastPaperSubject, setPastPaperSubject] = useState("Mathematics");

  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") || "";

    document.title = "Cambridge Exam Preparation Workbooks | Topical Workbooks & Past Papers | EduMeUp";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Cambridge O-Level exam preparation workbooks — topical practice with enhanced solutions, past paper collections, and full subject mind maps. Essay and structured questions only. From $8.",
      );
    }

    return () => {
      document.title = previousTitle;
      if (metaDescription) metaDescription.setAttribute("content", previousDescription);
    };
  }, []);

  const filteredWorkbooks =
    subjectFilter === "All" ? topicalWorkbooks : topicalWorkbooks.filter((w) => w.subject === subjectFilter);

  const selectedPastPaper = pastPaperSubjects.find((p) => p.subject === pastPaperSubject) || pastPaperSubjects[0];
  const isScience = ["Physics", "Chemistry", "Biology"].includes(selectedPastPaper.subject);

  return (
    <Layout>
      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 to-white py-16 md:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mx-auto max-w-5xl text-center"
          >
            <span className="inline-block rounded-full border border-blue-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#2366c9]">
              Cambridge Exam Preparation Resources
            </span>

            <h1 className="mt-5 text-4xl font-semibold text-slate-900 md:text-6xl">
              Cambridge-Aligned Workbooks. Built From Past Papers. Examiner-Informed.
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-base text-slate-700 md:text-lg">
              EduMeUp's Exam Preparation Workbooks are professional-grade Cambridge practice resources — topical
              workbooks with enhanced solutions, past paper collections, and full subject mind map sets. All digital.
              All downloadable. All aligned to the latest Cambridge syllabus.
            </p>

            <div className="mt-4 flex items-center justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#2366c9] bg-blue-50 px-4 py-2 text-sm font-medium text-[#2366c9]">
                Essay &amp; Structured Questions Only — No MCQ. This mirrors real Cambridge exam conditions.
              </span>
            </div>

            {/* Trust strip */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-600">
              {["Essay & Structured Questions Only", "Enhanced Solutions Included", "Cambridge Syllabus Aligned", "Instant PDF Download"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#2366c9]" />
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => { setActiveTab("topical"); document.getElementById("products")?.scrollIntoView({ behavior: "smooth" }); }}
                className="inline-flex items-center gap-2 rounded-lg bg-[#2366c9] px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Browse Workbooks <ArrowRight className="h-4 w-4" />
              </button>
              <Link href="/free-resources">
                <span className="inline-flex items-center gap-2 rounded-lg border border-[#2366c9] bg-white px-6 py-3 text-sm font-semibold text-[#2366c9] hover:bg-blue-50">
                  Try Free Samples First
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STICKY PRODUCT TYPE NAV ──────────────────────────────────────────── */}
      <div id="products" className="sticky top-16 z-40 border-b border-blue-100 bg-white shadow-sm">
        <div className="container-custom">
          <div className="flex gap-0">
            {(["topical", "pastpapers", "mindmaps"] as const).map((tab) => {
              const labels: Record<string, { label: string; sublabel: string; icon: React.ReactNode }> = {
                topical: { label: "Topical Workbooks", sublabel: "From $8 per topic", icon: <BookOpen className="h-4 w-4" /> },
                pastpapers: { label: "Past Paper Collections", sublabel: "From $10 per subject", icon: <FileText className="h-4 w-4" /> },
                mindmaps: { label: "Mind Map Sets", sublabel: "From $15 per subject", icon: <Brain className="h-4 w-4" /> },
              };
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); document.getElementById(tab)?.scrollIntoView({ behavior: "smooth" }); }}
                  className={`flex flex-1 flex-col items-center gap-0.5 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
                    isActive ? "border-[#2366c9] text-[#2366c9]" : "border-transparent text-slate-600 hover:text-[#2366c9]"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {labels[tab].icon}
                    {labels[tab].label}
                  </span>
                  <span className="text-xs font-normal text-slate-500">{labels[tab].sublabel}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── SECTION 3: TOPICAL WORKBOOKS ────────────────────────────────────── */}
      <section id="topical" className="py-14 md:py-20">
        <div className="container-custom">
          <div className="mb-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#2366c9]">Topical Workbooks</span>
          </div>
          <h2 className="mb-2 text-3xl font-semibold text-slate-900 md:text-4xl">
            Targeted Practice. One Topic. One Workbook. Full Enhanced Solutions.
          </h2>
          <p className="mb-8 max-w-3xl text-sm leading-relaxed text-slate-700 md:text-base">
            Each topical workbook covers one topic from one Cambridge O-Level subject — essay and structured questions
            only, aligned to Cambridge marking criteria, with full enhanced solutions at the end showing the correct
            answer, the mark-scheme logic, and the most common student mistakes.
          </p>

          {/* Subject filter */}
          <div className="mb-8 flex flex-wrap gap-2">
            {allSubjects.map((s) => (
              <button
                key={s}
                onClick={() => setSubjectFilter(s)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  subjectFilter === s
                    ? "border-[#2366c9] bg-[#2366c9] text-white"
                    : "border-[#2366c9] bg-white text-[#2366c9] hover:bg-blue-50"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Card grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredWorkbooks.map((w, i) => {
              const colour = subjectColours[w.subject] || "#2366c9";
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.02 }}
                  className="flex flex-col overflow-hidden rounded-xl border border-blue-100 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="h-2 w-full" style={{ backgroundColor: colour }} />
                  <div className="flex flex-1 flex-col p-5">
                    <span
                      className="mb-2 inline-block self-start rounded-full px-3 py-0.5 text-xs font-semibold text-white"
                      style={{ backgroundColor: colour }}
                    >
                      {w.subject}
                    </span>
                    <h3 className="mb-2 text-base font-semibold text-slate-900">{w.topic}</h3>
                    <div className="mt-1 space-y-1 text-xs text-slate-600">
                      <p className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-[#2366c9]" /> Essay &amp; structured questions</p>
                      <p className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-[#2366c9]" /> Cambridge syllabus aligned</p>
                      <p className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-[#2366c9]" /> Enhanced solutions at end</p>
                      <p className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-[#2366c9]" /> {w.questions} included</p>
                    </div>
                    <div className="mt-auto pt-4">
                      <p className="text-2xl font-bold" style={{ color: colour }}>$8</p>
                      <p className="mb-3 text-xs text-green-600">Enhanced solutions included</p>
                      <button className="mb-2 w-full rounded-md py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ backgroundColor: colour }}>
                        Buy Workbook — $8
                      </button>
                      <Link href="/free-resources#workbook-samples">
                        <span className="block text-center text-xs font-medium" style={{ color: colour }}>
                          Preview sample →
                        </span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bundle callout — shown when a specific subject is selected */}
          {subjectFilter !== "All" && (
            <div className="mt-10 rounded-2xl border border-[#2366c9] bg-blue-50 p-6">
              <p className="mb-1 text-base font-semibold text-slate-900">
                Want all {subjectFilter} workbooks at once?
              </p>
              <p className="mb-4 text-sm text-slate-700">
                The {subjectFilter} Workbook Bundle includes all available topical workbooks for this subject in a
                single purchase — with enhanced solutions included in every workbook. This bundle also includes all
                future workbooks added for this subject at no extra cost.
              </p>
              <div className="flex items-center gap-4">
                <span className="text-xl font-bold text-[#2366c9]">
                  {subjectFilter} Bundle: $95
                </span>
                <button className="rounded-lg bg-[#2366c9] px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                  Buy Bundle
                </button>
              </div>
              {bundleCounts[subjectFilter] && (
                <p className="mt-2 text-xs text-slate-500">
                  {bundleCounts[subjectFilter]} — includes all future workbooks added for this subject
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── SECTION 4: PAST PAPER COLLECTIONS ──────────────────────────────── */}
      <section id="pastpapers" className="bg-slate-50 py-14 md:py-20">
        <div className="container-custom">
          <div className="mb-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#2366c9]">Past Paper Collections</span>
          </div>
          <h2 className="mb-2 text-3xl font-semibold text-slate-900 md:text-4xl">
            Cambridge Past Papers — The Most Authentic Exam Practice Available.
          </h2>
          <p className="mb-8 max-w-3xl text-sm leading-relaxed text-slate-700 md:text-base">
            EduMeUp past paper collections give you real Cambridge exam papers — formatted exactly as they appear in
            the exam hall. Papers are provided without solutions. Solutions are accessed on the EduMeUp platform after
            purchase — simulating genuine exam conditions.
          </p>

          {/* Subject tabs */}
          <div className="mb-8 flex flex-wrap gap-2">
            {pastPaperSubjects.map((p) => (
              <button
                key={p.subject}
                onClick={() => setPastPaperSubject(p.subject)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  pastPaperSubject === p.subject
                    ? "border-[#2366c9] bg-[#2366c9] text-white"
                    : "border-[#2366c9] bg-white text-[#2366c9] hover:bg-blue-50"
                }`}
              >
                {p.subject}
              </button>
            ))}
          </div>

          {/* Science note */}
          {isScience && (
            <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              <strong>Note:</strong> This collection includes structured response papers (Paper 2/3) only. Cambridge
              Paper 1 (Multiple Choice) is not included per EduMeUp policy.
            </div>
          )}

          {/* 2 cards */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* 1-year */}
            <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#2366c9]">1-Year Collection</p>
              <p className="mb-1 text-3xl font-bold text-slate-900">$10</p>
              <p className="mb-4 text-sm text-slate-500">1 year — 1 subject</p>
              <div className="mb-4 space-y-2 text-sm text-slate-700">
                <p className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2366c9]" /> Most recent Cambridge past paper for this subject</p>
                <p className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2366c9]" /> Paper formatted exactly as Cambridge exam</p>
                <p className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2366c9]" /> All sections and question types included</p>
              </div>
              <div className="mb-4 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <span><strong>Paper only — no solutions in download.</strong> Solutions accessed on EduMeUp platform after purchase.</span>
              </div>
              <button className="w-full rounded-lg bg-[#2366c9] py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
                Buy 1-Year Collection — $10
              </button>
            </div>

            {/* 5-year */}
            <div className="rounded-2xl border-2 border-[#2366c9] bg-white p-6 shadow-sm">
              <div className="mb-2 inline-block rounded-full bg-[#2366c9] px-3 py-0.5 text-xs font-semibold text-white">Best Value</div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#2366c9]">5-Year Collection</p>
              <p className="mb-1 text-3xl font-bold text-slate-900">$35</p>
              <p className="mb-4 text-sm text-slate-500">5 years — 1 subject (save $15 vs 5 × $10)</p>
              <div className="mb-4 space-y-2 text-sm text-slate-700">
                <p className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2366c9]" /> 5 most recent Cambridge past papers for this subject</p>
                <p className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2366c9]" /> 5 years of question variety — essential for pattern recognition</p>
                <p className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2366c9]" /> All papers formatted exactly as Cambridge exam</p>
              </div>
              <div className="mb-4 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <span><strong>Papers only — no solutions in download.</strong> Solutions for all 5 years accessed on EduMeUp platform.</span>
              </div>
              <button className="w-full rounded-lg bg-[#2366c9] py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
                Buy 5-Year Collection — $35
              </button>
            </div>
          </div>

          {/* Platform solutions note */}
          <div className="mt-8 rounded-2xl border border-blue-100 bg-white p-6">
            <h3 className="mb-3 text-lg font-semibold text-slate-900">How Platform Solutions Access Works</h3>
            <div className="space-y-2 text-sm text-slate-700">
              <p><strong>Purchase flow:</strong> Student purchases a past paper collection. Payment confirmed. PDF download link delivered immediately.</p>
              <p><strong>Solutions access:</strong> After purchase, student is prompted to create or log in to a free EduMeUp account. Solutions for all purchased papers are unlocked in the student's EduMeUp dashboard under 'My Purchases → Past Paper Solutions'.</p>
              <p><strong>Why solutions are on-platform:</strong> (1) Simulates real exam conditions — sit the paper first, then check solutions. (2) Platform solutions are annotated, mark-scheme aligned, and better than a static PDF. (3) Drives platform registration, which opens the full EduMeUp learning ecosystem.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: MIND MAP SETS ────────────────────────────────────────── */}
      <section id="mindmaps" className="py-14 md:py-20">
        <div className="container-custom">
          <div className="mb-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#2366c9]">Subject Mind Map Sets</span>
          </div>
          <h2 className="mb-2 text-3xl font-semibold text-slate-900 md:text-4xl">
            Full-Subject Mind Maps — Every Topic. Every Connection. Beautifully Structured.
          </h2>
          <p className="mb-8 max-w-3xl text-sm leading-relaxed text-slate-700 md:text-base">
            EduMeUp mind map sets cover every topic in a Cambridge O-Level subject — in a single professionally
            designed PDF. Each mind map shows the topic structure, key concepts, connections between ideas, and
            Cambridge-relevant terminology. Selected sample mind maps are available free at /free-resources.
          </p>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {mindMaps.map((m, i) => {
              const colour = subjectColours[m.subject] || "#2366c9";
              return (
                <div key={i} className="flex flex-col overflow-hidden rounded-xl border border-blue-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                  <div className="h-1 w-full" style={{ backgroundColor: colour }} />
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="mb-1 text-lg font-semibold text-slate-900">{m.subject}</h3>
                    <p className="mb-3 text-sm text-slate-500">{m.topics} covered — complete subject mind map set</p>
                    <div className="mb-3 space-y-1 text-xs text-slate-600">
                      <p className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-[#2366c9]" /> All key concepts mapped</p>
                      <p className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-[#2366c9]" /> Cambridge terminology</p>
                      <p className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-[#2366c9]" /> Colour-coded by topic</p>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{m.included}</p>
                    <div className="mt-auto pt-4">
                      <p className="text-2xl font-bold text-[#2366c9]">$15</p>
                      <p className="mb-3 text-xs text-slate-500">Full subject PDF download</p>
                      <button className="mb-2 w-full rounded-md bg-[#2366c9] py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
                        Buy Mind Map Set — $15
                      </button>
                      <Link href="/free-resources#mind-maps">
                        <span className="block text-center text-xs font-medium text-[#2366c9]">Preview a free sample mind map →</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: BUNDLE OPTIONS ────────────────────────────────────────── */}
      <section className="bg-slate-800 py-14 md:py-20">
        <div className="container-custom">
          <h2 className="mb-10 text-3xl font-semibold text-white md:text-4xl">Save More When You Buy More.</h2>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Subject Bundle */}
            <div className="rounded-2xl border border-white/20 bg-white/10 p-6">
              <div className="mb-1 inline-block rounded-full border border-[#2366c9] bg-blue-600 px-3 py-0.5 text-xs font-semibold text-white">
                Subject Workbook Bundle
              </div>
              <h3 className="mt-3 text-xl font-semibold text-white">All Topics for One Subject</h3>
              <p className="mt-2 text-sm text-blue-200">
                Buy all available topical workbooks for one subject together. Your bundle includes all workbooks
                available now <strong>AND all future workbooks added for this subject — at no extra cost.</strong>
              </p>
              <div className="mt-4 overflow-hidden rounded-xl border border-white/20">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-white/10 text-left text-xs uppercase tracking-wide text-blue-200">
                      <th className="px-4 py-2">Subject</th>
                      <th className="px-4 py-2">Topics</th>
                      <th className="px-4 py-2">Bundle Price</th>
                      <th className="px-4 py-2">vs Separate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { subject: "Mathematics", count: "14 available", save: "14 × $8 = $112. Save $17." },
                      { subject: "Physics", count: "10 available", save: "10 × $8 = $80." },
                      { subject: "Chemistry", count: "8 available", save: "8 × $8 = $64." },
                      { subject: "Biology", count: "10 available", save: "10 × $8 = $80." },
                      { subject: "English Language", count: "8 available", save: "8 × $8 = $64." },
                      { subject: "Other subjects", count: "Varies", save: "All available workbooks." },
                    ].map((row, i) => (
                      <tr key={i} className="border-t border-white/10">
                        <td className="px-4 py-2 text-white">{row.subject}</td>
                        <td className="px-4 py-2 text-blue-200">{row.count}</td>
                        <td className="px-4 py-2 font-semibold text-white">$95</td>
                        <td className="px-4 py-2 text-blue-200 text-xs">{row.save}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Complete Resource Pack */}
            <div className="rounded-2xl border-2 border-[#2366c9] bg-white/10 p-6">
              <div className="mb-1 inline-block rounded-full bg-[#2366c9] px-3 py-0.5 text-xs font-semibold text-white">
                Best Value
              </div>
              <h3 className="mt-3 text-xl font-semibold text-white">Complete Subject Resource Pack</h3>
              <p className="mt-2 text-sm text-blue-200">
                Everything you need for one subject — workbooks, past papers, and mind maps in a single purchase.
              </p>
              <div className="mt-4 space-y-2 text-sm text-blue-200">
                <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#2366c9]" /> Subject Workbook Bundle ($95)</p>
                <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#2366c9]" /> 5-Year Past Paper Collection ($35)</p>
                <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#2366c9]" /> Subject Mind Map Set ($15)</p>
                <p className="mt-2 text-xs text-blue-300">$145 separately</p>
              </div>
              <div className="mt-6 flex items-center gap-4">
                <div>
                  <p className="text-3xl font-bold text-white">$120</p>
                  <p className="text-sm text-green-400 font-semibold">Save $25</p>
                </div>
                <button className="rounded-lg bg-[#2366c9] px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
                  Buy Complete Pack
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: HOW TO USE ───────────────────────────────────────────── */}
      <section className="bg-slate-50 py-14 md:py-20">
        <div className="container-custom">
          <h2 className="mb-10 text-3xl font-semibold text-slate-900 md:text-4xl">
            How to Get the Most From Your EduMeUp Workbook.
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {howToUseSteps.map((step) => (
              <div key={step.number} className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#2366c9] text-sm font-bold text-white">
                  {step.number}
                </div>
                <h3 className="mb-2 text-base font-semibold text-slate-900">{step.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 8: FREE SAMPLES CTA STRIP ──────────────────────────────── */}
      <section className="bg-[#17A589] py-10">
        <div className="container-custom flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h3 className="text-xl font-semibold text-white">Not Sure Yet? Preview Before You Buy.</h3>
            <p className="mt-1 text-sm text-white/90 max-w-xl">
              Sample extracts from every EduMeUp workbook are available free — so you can assess content quality,
              question difficulty, and solution depth before purchasing. Sample mind maps and past paper question
              previews are also available.
            </p>
          </div>
          <Link href="/free-resources">
            <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border-2 border-white bg-transparent px-5 py-2.5 text-sm font-semibold text-white hover:bg-white hover:text-[#17A589]">
              <Eye className="h-4 w-4" />
              View Free Samples
            </span>
          </Link>
        </div>
      </section>

      {/* ── COMPLETE PRICING REFERENCE ──────────────────────────────────────── */}
      <section className="py-14 md:py-20">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-semibold text-slate-900 md:text-4xl">Complete Pricing Reference</h2>
            <p className="mb-6 text-sm text-slate-500">All prices in USD. No currency conversion shown. Scholarship does not apply to these products.</p>
            <div className="overflow-hidden rounded-2xl border border-blue-100 shadow-sm">
              <table className="w-full min-w-[560px]">
                <thead>
                  <tr className="bg-[#2366c9] text-left text-white">
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide">Product</th>
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide">Price</th>
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingData.map((row, i) => (
                    <tr key={i} className={`border-t border-blue-50 ${i % 2 === 1 ? "bg-blue-50/40" : "bg-white"}`}>
                      <td className="px-5 py-3 text-sm font-medium text-slate-900">{row.product}</td>
                      <td className="px-5 py-3 text-sm font-bold text-[#2366c9]">{row.price}</td>
                      <td className="px-5 py-3 text-sm text-slate-600">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 9: FINAL CTA BLOCK ──────────────────────────────────────── */}
      <section className="bg-slate-800 py-14 md:py-20">
        <div className="container-custom">
          <h2 className="mb-10 text-center text-3xl font-semibold text-white md:text-4xl">
            Ready to Start? Everything You Need Is Here.
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-6">
              <Download className="mb-3 h-8 w-8 text-[#2366c9]" />
              <h3 className="mb-2 text-lg font-semibold text-white">Browse Workbooks</h3>
              <p className="mb-4 text-sm text-blue-200">Browse all topical workbooks, past papers, and mind maps by subject. Buy instantly — PDF delivered immediately.</p>
              <button
                onClick={() => document.getElementById("topical")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2 text-sm font-semibold text-[#2366c9] hover:underline"
              >
                Browse Products <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-6">
              <Eye className="mb-3 h-8 w-8 text-[#17A589]" />
              <h3 className="mb-2 text-lg font-semibold text-white">Try Free Samples</h3>
              <p className="mb-4 text-sm text-blue-200">Not sure which workbook you need? Try the free samples first — one extract per workbook, no registration required.</p>
              <Link href="/free-resources">
                <span className="flex items-center gap-2 text-sm font-semibold text-[#17A589] hover:underline">
                  View Free Samples <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-6">
              <Brain className="mb-3 h-8 w-8 text-blue-300" />
              <h3 className="mb-2 text-lg font-semibold text-white">Take the Diagnostic First</h3>
              <p className="mb-4 text-sm text-blue-200">The free EduMeUp diagnostic tells you exactly which topics you have gaps in — so you buy only the workbooks you actually need.</p>
              <Link href="/diagnostics">
                <span className="flex items-center gap-2 text-sm font-semibold text-blue-300 hover:underline">
                  Take Free Diagnostic <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}