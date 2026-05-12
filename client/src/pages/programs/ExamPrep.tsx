import { useEffect } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  CheckCircle2,
  Zap,
  BarChart3,
  Target,
  FlaskConical,
  BookOpen,
  TrendingUp,
  Briefcase,
} from "lucide-react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const subjects = [
  {
    code: "EX-MAT",
    name: "Online Exam Preparation — Mathematics",
    syllabus: "Cambridge O-Level 4024 / IGCSE 0580",
    anchor: "mathematics",
    colour: "#1E3A5F",
    icon: Target,
    popupDescription:
      "Structured online exam preparation for O-Level Mathematics. Topic-wise targeted practice sessions, timed past paper questions with instant AI feedback, systematic error correction and Cambridge mark scheme analysis. Covers Paper 1 and Paper 2 question types.",
    includes: [
      "Topic-by-topic targeted practice — identify and fix your weakest areas first",
      "Timed past paper practice sessions matching Cambridge paper durations",
      "AI feedback on every answer — correct answer, why yours was wrong, what the mark scheme expects",
      "Paper 1 and Paper 2 strategies — different technique for each paper type",
      "Common error analysis — the mistakes Cambridge markers see most often in Mathematics",
      "Time management training — how to allocate minutes per mark in both papers",
    ],
    whoFor: "O-Level Mathematics students in the final term before examinations",
    international: "Cambridge O-Level 4024, IGCSE 0580, and all international secondary mathematics examinations based on the same scope",
  },
  {
    code: "EX-PHY",
    name: "Online Exam Preparation — Physics",
    syllabus: "Cambridge O-Level 5054 / IGCSE 0625",
    anchor: "physics",
    colour: "#7B2FBE",
    icon: Zap,
    popupDescription:
      "Structured online exam preparation for O-Level Physics. Covers multiple choice technique, structured calculation questions and extended writing questions. Systematic past paper practice with AI feedback aligned to Cambridge assessment objectives.",
    includes: [
      "Multiple choice strategy — eliminating wrong answers using elimination and substitution",
      "Structured question technique — command word analysis (state, describe, explain, deduce)",
      "Calculation practice with full working shown — the format Cambridge requires",
      "Graph and data interpretation skills for structured questions",
      "Extended writing responses — language and depth Cambridge expects at each mark level",
      "Paper 1 and Paper 2 timing strategies",
    ],
    whoFor: "O-Level Physics students preparing for final examinations",
    international: "Cambridge O-Level 5054, IGCSE 0625, IB MYP, UAE curriculum, and all international secondary physics examinations",
  },
  {
    code: "EX-CHE",
    name: "Online Exam Preparation — Chemistry",
    syllabus: "Cambridge O-Level 5070 / IGCSE 0620",
    anchor: "chemistry",
    colour: "#1A7A4A",
    icon: FlaskConical,
    popupDescription:
      "Structured online exam preparation for O-Level Chemistry. Covers the full range of question types Cambridge sets — multiple choice, structured short answer, extended writing and calculations. AI feedback on every response aligned to the Chemistry mark scheme.",
    includes: [
      "Multiple choice technique for Chemistry — distinguishing similar answer choices",
      "Structured short answer writing — precision of language Cambridge Chemistry requires",
      "Equation writing and balancing — common errors identified and corrected",
      "Organic chemistry question technique — naming, reactions and mechanisms",
      "Extended writing — how much to write per mark for Chemistry descriptive questions",
      "Calculations — mole concept, yield, concentration, electrolysis",
    ],
    whoFor: "O-Level Chemistry students in the final examination preparation phase",
    international: "Cambridge O-Level 5070, IGCSE 0620, IB MYP, UAE curriculum, and all international secondary chemistry examinations",
  },
  {
    code: "EX-BIO",
    name: "Online Exam Preparation — Biology",
    syllabus: "Cambridge O-Level 5090 / IGCSE 0610",
    anchor: "biology",
    colour: "#2ECC71",
    icon: BookOpen,
    popupDescription:
      "Structured online exam preparation for O-Level Biology. Covers diagram labelling, data response, short structured answers and extended writing at Cambridge mark scheme depth. AI feedback identifies the specific language Cambridge Biology examiners expect.",
    includes: [
      "Diagram labelling — precise terminology, arrow placement and label completeness",
      "Data response technique — calculating percentage change, describing trends, explaining anomalies",
      "Short structured answers — how many points per mark and what counts as one marking point",
      "Extended writing — essay-style Biology questions and the examiner language required",
      "Multiple choice Biology strategy — distinguishing similar physiological answers",
      "Common examiner complaints from Biology paper chief examiner reports",
    ],
    whoFor: "O-Level Biology students preparing for final Cambridge examinations",
    international: "Cambridge O-Level 5090, IGCSE 0610, IB MYP, and all international secondary biology examinations",
  },
  {
    code: "EX-ECO",
    name: "Online Exam Preparation — Economics",
    syllabus: "Cambridge O-Level 2281 / IGCSE 0455",
    anchor: "economics",
    colour: "#D4A017",
    icon: TrendingUp,
    popupDescription:
      "Structured online exam preparation for O-Level Economics. Covers data response, structured questions and evaluative essay writing. AI feedback on every answer identifies whether argument, analysis and evaluation are correctly applied at Cambridge standard.",
    includes: [
      "Data response technique — extracting information, describing trends, calculating percentage changes",
      "Structured question technique — distinguishing between describe, explain and analyse",
      "Diagram drawing — demand/supply shifts, PED curves, market failure diagrams with correct labelling",
      "Evaluative essay writing — two-sided arguments and the 'it depends' conclusion Cambridge rewards",
      "Application skill — using the case study information provided in the question",
      "Mark allocation strategy — how to allocate time across a 7 or 12 mark question",
    ],
    whoFor: "O-Level Economics students in the final term before Cambridge examinations",
    international: "Cambridge O-Level 2281, IGCSE 0455, IB MYP Economics, and all international secondary economics examinations based on analysis and evaluation",
  },
  {
    code: "EX-ENG",
    name: "Online Exam Preparation — English Language",
    syllabus: "Cambridge O-Level 1123 / IGCSE 0500",
    anchor: "english",
    colour: "#2366c9",
    icon: BookOpen,
    popupDescription:
      "Structured online exam preparation for O-Level English Language. Covers Paper 1 reading and directed writing and Paper 2 extended writing under timed conditions. AI feedback identifies exactly which assessment objectives each response meets or misses.",
    includes: [
      "Paper 1 reading skills — locating information, inferring meaning, understanding writer's purpose",
      "Directed writing — format recognition, register adaptation, organising content for Cambridge mark schemes",
      "Summary writing — selecting main points from an unseen text at mark-scheme depth",
      "Paper 2 narrative writing — story structure, Show Don't Tell, variety of sentence structure",
      "Paper 2 argumentative writing — thesis statement, point-evidence-explain structure, balanced argument",
      "Time management — how to allocate 90 minutes across all Paper 1 and Paper 2 questions",
    ],
    whoFor: "O-Level English Language students in the final examination preparation phase",
    international: "Cambridge O-Level 1123, IGCSE 0500, and all international secondary English language examinations based on unseen comprehension and extended writing",
  },
  {
    code: "EX-BUS",
    name: "Online Exam Preparation — Business Studies",
    syllabus: "Cambridge O-Level 7115 / IGCSE 0450",
    anchor: "business",
    colour: "#E67E22",
    icon: Briefcase,
    popupDescription:
      "Structured online exam preparation for O-Level Business Studies. Covers case study analysis, multi-part structured questions and evaluative extended writing at Cambridge standard. AI feedback identifies whether application, analysis and judgement are present in every answer.",
    includes: [
      "Case study reading and annotation — identifying information relevant to each question part",
      "Application skill — always referring to the business context in the question, not just general knowledge",
      "Define and state questions — precise business terminology at one or two marking points",
      "Analyse questions — cause and effect chains to the required depth for the marks available",
      "Evaluate questions — two-sided argument with a justified recommendation",
      "Time allocation — 90-minute paper strategy for Paper 1 and Paper 2 question structure",
    ],
    whoFor: "O-Level Business Studies students preparing for final Cambridge examinations",
    international: "Cambridge O-Level 7115, IGCSE 0450, IB MYP Business, and all international secondary business studies examinations based on case study and analysis",
  },
];

const trustStats = [
  { stat: "7 Subjects", label: "Mathematics, Physics, Chemistry, Biology, Economics, English, Business" },
  { stat: "AI Feedback on Every Answer", label: "Correct answer, why yours was wrong, what the mark scheme expects" },
  { stat: "Cambridge O-Level & IGCSE Aligned", label: "Throughout — all question types, all mark schemes" },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function ExamPrep() {
  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") || "";

    document.title = "Online Exam Preparation — Cambridge O-Level | EduMeUp";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Structured multi-session online exam preparation for Cambridge O-Level. Topic-by-topic targeted practice, timed past paper question sets, AI feedback on every answer, and systematic error correction. 7 subjects.",
      );
    }

    return () => {
      document.title = previousTitle;
      if (metaDescription) metaDescription.setAttribute("content", previousDescription);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Layout>
      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 to-white py-16 md:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mx-auto max-w-5xl text-center"
          >
            <span className="inline-block rounded-full border border-blue-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#2366c9]">
              Cambridge O-Level / IGCSE | Final Term Exam Preparation | 7 Subjects
            </span>

            <h1 className="mt-5 text-4xl font-semibold text-slate-900 md:text-6xl">
              Online Exam Preparation — Sharpen Technique, Eliminate Errors, Maximise Your Score
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-base text-slate-700 md:text-lg">
              Structured multi-session preparation for the final weeks before your O-Level examinations. Topic-by-topic
              targeted practice. Past paper question sets with AI feedback on every answer. Systematic error
              correction. Cambridge examination technique coaching. Not a mock exam — a preparation programme designed
              to fix what you are still getting wrong before it matters.
            </p>

            {/* Trust stats */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {trustStats.map((s) => (
                <div key={s.stat} className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
                  <p className="text-base font-semibold text-[#2366c9]">{s.stat}</p>
                  <p className="mt-1 text-xs text-slate-600">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => scrollTo("subjects")}
                className="inline-flex items-center gap-2 rounded-lg bg-[#2366c9] px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Enrol in Exam Preparation — Choose Your Subject
                <ArrowRight className="h-4 w-4" />
              </button>
              <Link href="/programs/ai-diagnostic">
                <span className="inline-flex items-center gap-2 rounded-lg border border-[#2366c9] bg-white px-6 py-3 text-sm font-semibold text-[#2366c9] hover:bg-blue-50">
                  Take Free Diagnostic — Check Your Readiness First
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── DISTINCTION NOTICE ──────────────────────────────────────────────── */}
      <section className="border-y border-blue-100 bg-blue-50/40 py-6">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl rounded-xl border-l-4 border-[#2366c9] bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">
              This is a preparation programme — multiple sessions of structured practice.
            </p>
            <p className="mt-1 text-sm text-slate-700">
              Looking for a single timed mock paper instead?{" "}
              <Link href="/programs/mock-exams">
                <span className="font-semibold text-[#2366c9] underline cursor-pointer">
                  → Final Mock Exams with Detailed Reports
                </span>
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── SUBJECT FILTER STRIP (sticky) ──────────────────────────────────── */}
      <div className="sticky top-16 z-40 border-b border-blue-100 bg-white shadow-sm">
        <div className="container-custom">
          <div className="flex gap-1 overflow-x-auto py-3">
            {subjects.map((s) => (
              <button
                key={s.anchor}
                onClick={() => scrollTo(s.anchor)}
                className="shrink-0 rounded-full border border-[#2366c9] px-4 py-1.5 text-sm font-medium text-[#2366c9] transition-colors hover:bg-[#2366c9] hover:text-white"
              >
                {s.code.replace("EX-", "")}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── SUBJECT CARDS ───────────────────────────────────────────────────── */}
      <section id="subjects" className="py-10 md:py-14">
        <div className="container-custom space-y-8">
          {subjects.map((subject, i) => (
            <motion.div
              key={subject.code}
              id={subject.anchor}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm"
            >
              {/* Card header */}
              <div className="flex items-center gap-4 px-6 py-5" style={{ backgroundColor: subject.colour }}>
                <span className="rounded-lg bg-white/20 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  {subject.code}
                </span>
                <div>
                  <h2 className="text-xl font-semibold text-white">{subject.name}</h2>
                  <p className="text-sm text-white/80 italic">{subject.syllabus}</p>
                </div>
              </div>

              {/* Card body */}
              <div className="p-6">
                {/* Popup description */}
                <div className="mb-5 rounded-xl border border-blue-100 bg-blue-50/40 p-4">
                  <p className="text-sm text-slate-700 leading-relaxed">{subject.popupDescription}</p>
                </div>

                {/* What's included */}
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  What the Course Includes ({subject.code})
                </h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  {subject.includes.map((item, j) => (
                    <p key={j} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2366c9]" />
                      <span>{item}</span>
                    </p>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-5 flex flex-col gap-3 border-t border-blue-100 pt-5 sm:flex-row sm:items-end sm:justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-slate-700">
                      <strong>Who this is for:</strong> {subject.whoFor}
                    </p>
                    <p className="text-sm italic text-slate-500">
                      <strong>International applications:</strong> {subject.international}
                    </p>
                  </div>
                  <button
                    className="shrink-0 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
                    style={{ backgroundColor: subject.colour }}
                  >
                    Enrol Now <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── RELATED SERVICES STRIP ──────────────────────────────────────────── */}
      <section className="border-y border-blue-100 bg-blue-50/40 py-8">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">Ready for the full timed mock?</p>
              <p className="text-sm text-slate-600">
                Complete Online Exam Preparation first, then sit the Final Mock Exam.
              </p>
            </div>
            <Link href="/programs/mock-exams">
              <span className="inline-flex items-center gap-2 rounded-lg border border-[#2366c9] bg-white px-5 py-2.5 text-sm font-semibold text-[#2366c9] hover:bg-blue-50">
                Final Mock Exams with Detailed Reports <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── BOTTOM BANNER ───────────────────────────────────────────────────── */}
      <section className="bg-slate-800 py-16 md:py-24">
        <div className="container-custom text-center">
          <h2 className="mx-auto max-w-3xl text-3xl font-semibold text-white md:text-4xl">
            The Examination Is Not About What You Know — It Is About What You Can Show Under Pressure
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-blue-200">
            Structured exam preparation fixes the three things that cost students marks in Cambridge O-Level:
            examination technique, time management, and the specific errors examiners see year after year. Enrol in
            any subject and begin immediately.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => scrollTo("subjects")}
              className="inline-flex items-center gap-2 rounded-lg bg-[#2366c9] px-7 py-3.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Choose Your Subject — Enrol Now <ArrowRight className="h-4 w-4" />
            </button>
            <Link href="/programs/mock-exams">
              <span className="inline-flex items-center gap-2 rounded-lg border border-blue-400 bg-transparent px-7 py-3.5 text-sm font-semibold text-blue-200 hover:border-white hover:text-white">
                View Final Mock Exams — Timed Simulation <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}