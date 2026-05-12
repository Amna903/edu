import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, BookOpen, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ui } from "@/theme";

const reportElements = [
  "Total score and predicted Cambridge grade (A* to G equivalent)",
  "Paper-by-paper performance breakdown — marks earned and lost per section",
  "Question-by-question analysis — where you earned marks and where you did not",
  "Error classification — the types of mistakes made and their frequency",
  "Top 3 priority topics for final revision — ranked by impact on your grade",
  "Recommended next step — whether to sit the resit, use Exam Preparation, or proceed with confidence",
];

const subjects = [
  {
    code: "MK-MAT",
    name: "Mathematics",
    cambridge: "Cambridge O-Level 4024 / IGCSE 0580",
    color: "bg-slate-900",
    icon: "📐",
    paperFormat: "Paper 1: 80 marks, 2 hours 30 minutes — structured questions. Paper 2: 100 marks, 2 hours 30 minutes — structured and problem-solving questions.",
    reportIncludes: [
      "Total score and predicted Cambridge grade (A* to G equivalent)",
      "Paper 1 and Paper 2 performance breakdown by syllabus section",
      "Question-by-question mark allocation — where marks were earned and lost",
      "Most significant errors — what went wrong and the correct approach",
      "Top 3 topics requiring urgent final revision before the examination",
      "Time management analysis — how your timing compares to the recommended allocation",
    ],
  },
  {
    code: "MK-PHY",
    name: "Physics",
    cambridge: "Cambridge O-Level 5054 / IGCSE 0625",
    color: "bg-purple-600",
    icon: "⚛️",
    paperFormat: "Paper 1: Multiple choice — 40 questions, 75 minutes. Paper 2: Theory — 75 marks, 1 hour 45 minutes.",
    reportIncludes: [
      "Total score across both papers and predicted Cambridge grade",
      "Multiple choice performance — topic areas of strength and weakness",
      "Theory paper performance — marks by section (Forces, Thermal, Waves, Electricity, Nuclear)",
      "Assessment objective breakdown — AO1 Knowledge, AO2 Handling, AO3 Experimental skills",
      "Calculation errors identified — where working broke down, correct method shown",
      "Top priority topics and question types for final revision",
    ],
  },
  {
    code: "MK-CHE",
    name: "Chemistry",
    cambridge: "Cambridge O-Level 5070 / IGCSE 0620",
    color: "bg-blue-600",
    icon: "⚗️",
    paperFormat: "Paper 1: Multiple choice — 40 questions, 1 hour. Paper 2: Theory — 80 marks, 1 hour 45 minutes.",
    reportIncludes: [
      "Total score and predicted Cambridge grade across both papers",
      "Multiple choice accuracy — which topic areas are secure and which need revision",
      "Theory paper section breakdown — Particulate Matter, Organic, Acids and Bases, Electrochemistry, etc.",
      "Equation writing accuracy — balanced equations, state symbols, correct products",
      "Extended writing quality — language precision compared to mark scheme standard",
      "Priority sections and question types for final preparation",
    ],
  },
  {
    code: "MK-BIO",
    name: "Biology",
    cambridge: "Cambridge O-Level 5090 / IGCSE 0610",
    color: "bg-green-600",
    icon: "🧬",
    paperFormat: "Paper 1: Multiple choice — 40 questions, 1 hour. Paper 2: Theory — 80 marks, 1 hour 45 minutes.",
    reportIncludes: [
      "Total score and predicted Cambridge grade across both papers",
      "Multiple choice topic-level accuracy — all 21 syllabus topics analysed",
      "Theory paper section performance — short answer, data response and extended writing separately",
      "Diagram quality assessment — terminology, labelling accuracy and completeness",
      "Data response analysis — where marks were earned or missed on graphs and tables",
      "Extended writing language feedback — examiner-standard vocabulary compared to your responses",
    ],
  },
  {
    code: "MK-ECO",
    name: "Economics",
    cambridge: "Cambridge O-Level 2281 / IGCSE 0455",
    color: "bg-teal-600",
    icon: "📊",
    paperFormat: "Section A: Data response — 30 marks. Section B: Structured questions — 60 marks (choose 3 from 5). (Format matches Cambridge 2281, 1 hour 45 minutes total.)",
    reportIncludes: [
      "Total score and predicted Cambridge grade",
      "Section A data response performance — extraction, calculation and explanation marks separately",
      "Section B structured question performance — marks by sub-part and question type",
      "Diagram quality — accuracy of economic diagrams and correct shift labelling",
      "Application score — how well the answer uses the context provided in the question",
      "Evaluation quality — whether two-sided argument and justified conclusion are present",
    ],
  },
  {
    code: "MK-ENG",
    name: "English Language",
    cambridge: "Cambridge O-Level 1123 / IGCSE 0500",
    color: "bg-blue-700",
    icon: "📖",
    paperFormat: "Paper 1: Reading and Directed Writing — 50 marks, 1 hour 45 minutes. Paper 2: Writing — 50 marks, 1 hour 30 minutes.",
    reportIncludes: [
      "Total score across both papers and predicted Cambridge grade",
      "Paper 1 AO breakdown — comprehension accuracy, inference quality, writer's technique responses",
      "Directed writing assessment — format correctness, register accuracy, content coverage and language quality",
      "Summary performance — main points identified vs total available marks",
      "Paper 2 extended writing Band allocation — which Band your response falls in and why",
      "Language quality feedback — vocabulary range, sentence variety and accuracy assessed per question",
    ],
  },
  {
    code: "MK-BUS",
    name: "Business Studies",
    cambridge: "Cambridge O-Level 7115 / IGCSE 0450",
    color: "bg-orange-600",
    icon: "💼",
    paperFormat: "Paper 1: Short answer and data response — 80 marks, 1 hour 30 minutes. Paper 2: Case study — 80 marks, 1 hour 30 minutes.",
    reportIncludes: [
      "Total score across both papers and predicted Cambridge grade",
      "Paper 1 and Paper 2 performance by section and question type",
      "Application score — how consistently the case study context was used in answers",
      "Analysis quality — whether cause-and-effect chains reach the required depth",
      "Evaluation quality — whether balanced arguments with justified conclusions are present",
      "Specific language feedback — business terminology accuracy and examiner-standard phrasing",
    ],
  },
];

export default function MockExams() {
  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") || "";

    document.title = "Final Mock Exams with Detailed Reports | EduMeUp";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "EduMeUp Final Mock Exams — full timed Cambridge papers with AI-generated detailed reports covering scores, predicted grades, AO performance, error analysis and revision priorities. 7 subjects. Includes one resit."
      );
    }

    return () => {
      document.title = previousTitle;
      if (metaDescription) {
        metaDescription.setAttribute("content", previousDescription);
      }
    };
  }, []);

  return (
    <Layout>
      {/* HERO */}
      <section className={ui.sections.hero + " py-16 md:py-24"}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <p className={ui.pills.brand + " mb-6 justify-center"}>
              Cambridge O-Level / IGCSE | Full Timed Simulation | 7 Subjects
            </p>
            <h1 className="text-5xl md:text-7xl font-semibold text-slate-900 mb-6 tracking-tight leading-tight">
              Final Mock Exams with Detailed Reports — Know Your Grade Before Exam Day
            </h1>
            <p className="text-base text-slate-700 max-w-3xl mx-auto leading-relaxed mb-8">
              A full Cambridge-format timed examination for your subject — sat under exam conditions, marked by AI, and followed by a detailed report showing your predicted grade, where you lost marks, and exactly what to revise in the final weeks. For students who want to know the truth about their preparation. For parents who need more than 'it went okay'.
            </p>

            {/* Hero Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
              <div className="rounded-lg bg-white/50 border border-white/80 p-5">
                <p className="text-2xl font-semibold text-[#2366c9]">Full Cambridge Paper Format</p>
                <p className="text-[14px] text-slate-600 mt-2">exact durations, exact mark allocations</p>
              </div>
              <div className="rounded-lg bg-white/50 border border-white/80 p-5">
                <p className="text-2xl font-semibold text-[#2366c9]">AI Detailed Report</p>
                <p className="text-[14px] text-slate-600 mt-2">score, predicted grade, AO breakdown, error analysis, revision priorities</p>
              </div>
              <div className="rounded-lg bg-white/50 border border-white/80 p-5">
                <p className="text-2xl font-semibold text-[#2366c9]">Parents Receive the Report</p>
                <p className="text-[14px] text-slate-600 mt-2">complete visibility, weeks before the actual examination</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link href="/contact">
                <span className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-semibold ${ui.buttons.brand}`}>
                  Book Your Mock Exam — Choose Your Subject
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link href="/programs/exam-prep">
                <span className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-semibold ${ui.buttons.brandOutlineDark}`}>
                  Take Free Diagnostic First — Check Your Readiness
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CRITICAL DISTINCTION */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container-custom">
          <div className={`${ui.cards.soft} mx-auto max-w-5xl p-8 md:p-10 border-l-4 border-orange-500`}>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-6">Critical Distinction — Mock Exam (P5) vs Exam Prep (P4)</h2>
            <div className="space-y-4 text-base text-black">
              <p>
                <strong>Final Mock Exam (this page — /programs/mock-exams):</strong> One complete sitting in full Cambridge format. Timed to exact Cambridge paper durations. No pause, no retry, no feedback during the exam. Simulates the actual examination experience. When the sitting ends, an AI-generated detailed report is produced covering scores, predicted grade, AO performance, error analysis and final revision priorities.
              </p>
              <p>
                <strong>Online Exam Preparation (P4 — /programs/exam-prep):</strong> Multi-session structured preparation programme. Students work through topic-by-topic practice, past paper questions and error correction over multiple sessions. AI feedback is given after every question. Students can pause, review and retry. This is preparation — the mock exam is the simulation.
              </p>
              <p>
                <strong>Recommended sequence on page:</strong> 'Not yet fully prepared? Complete Online Exam Preparation first, then sit the Final Mock Exam.' Both pages link to each other. A student who sits the mock and receives a poor report is directed to the Exam Preparation service for the specific weak areas identified.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IS IN THE REPORT */}
      <section className={ui.sections.softBlue + " py-14 md:py-20"}>
        <div className="container-custom">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight">
                What Is In The Report
              </h2>
              <p className="text-base text-slate-600 mt-4">Every EduMeUp Mock Exam Report includes these six elements as standard, for all subjects:</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reportElements.map((element, idx) => (
                <div key={idx} className="flex gap-4">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[#2366c9] mt-0.5" />
                  <p className="text-[14px] text-black">{element}</p>
                </div>
              ))}
            </div>
            <div className={`${ui.cards.standard} p-6 md:p-8 mt-8`}>
              <p className="text-sm font-semibold text-[#2366c9] mb-3">Plus subject-specific elements:</p>
              <p className="text-[14px] text-black">Each subject's report includes additional analysis specific to that subject's question types — AO breakdown, diagram quality, evaluation quality, language precision etc. Full details are in each subject section below.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PARENT BENEFIT CALLOUT */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container-custom">
          <div className={`rounded-2xl border-2 border-green-200 bg-green-50 p-8 md:p-10 max-w-4xl mx-auto`}>
            <h2 className="text-3xl font-semibold text-slate-900 mb-5">For Parents — Real Information, Not Reassurance</h2>
            <p className="text-base text-black leading-relaxed mb-5">
              When your child sits an EduMeUp Mock Exam, you receive the same detailed report they do. The report tells you, in plain language: what grade your child is currently predicted, which specific topics are costing the most marks, and what the recommended revision priorities are for the remaining weeks before the examination.
            </p>
            <p className="text-base text-black leading-relaxed">
              If the report identifies a serious gap — in any topic or skill area — there is still time to address it. The report links directly to the relevant Online Exam Preparation course for that subject, so the next step is clear immediately.
            </p>
            <div className="flex flex-col md:flex-row gap-4 mt-8">
              <Link href="/contact">
                <span className={`inline-flex items-center gap-2 px-6 py-2.5 text-[14px] font-semibold rounded-lg ${ui.buttons.brand}`}>
                  View Pricing — Mock Exams
                </span>
              </Link>
              <Link href="/contact">
                <span className={`inline-flex items-center gap-2 px-6 py-2.5 text-[14px] font-semibold rounded-lg border-2 border-[#2366c9] text-[#2366c9] hover:bg-[#2366c9] hover:text-white transition-colors`}>
                  Contact Us — School Group Booking
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SUBJECTS */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className={ui.pills.brand + " mb-5 justify-center"}>
                Choose Your Subject
              </p>
              <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight">
                7 Subjects — 7 Full Cambridge Papers
              </h2>
            </div>

            <div className="space-y-8">
              {subjects.map((subject, idx) => (
                <motion.div
                  key={subject.code}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`${ui.cards.standard} overflow-hidden hover:shadow-lg transition-shadow`}
                >
                  {/* Header */}
                  <div className={`${subject.color} text-white p-6 md:p-8 flex items-center justify-between`}>
                    <div>
                      <p className="text-[14px] font-semibold uppercase tracking-wide opacity-90">{subject.code}</p>
                      <h3 className="text-3xl md:text-4xl font-semibold mt-2">{subject.name}</h3>
                      <p className="text-white/80 text-sm mt-2">{subject.cambridge}</p>
                    </div>
                    <span className="text-6xl">{subject.icon}</span>
                  </div>

                  {/* Body */}
                  <div className="p-6 md:p-8">
                    <div className="mb-6">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#2366c9] mb-2">Paper Format</p>
                      <p className="text-[14px] text-black">{subject.paperFormat}</p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#2366c9] mb-3">What The Report Includes</p>
                      <ul className="space-y-2">
                        {subject.reportIncludes.map((item, i) => (
                          <li key={i} className="flex gap-3 text-[14px] text-black">
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-[#2366c9] mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 pt-6 border-t border-[#dbe7f4]">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Resit Included</p>
                      <p className="text-[14px] text-black">If you are not satisfied with your performance on the first sitting, you may book the resit from your student dashboard after a 7-day waiting period. No additional charge — included in the mock exam fee.</p>
                    </div>

                    <div className="mt-6">
                      <Link href="/contact">
                        <button className={`w-full py-3 rounded-lg font-semibold text-[14px] ${ui.buttons.brand}`}>
                          Enrol in {subject.name} Mock Exam
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RESIT POLICY */}
      <section className={ui.sections.softBlue + " py-14 md:py-20"}>
        <div className="container-custom">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-semibold text-slate-900 mb-6">Resit Policy</h2>
            <div className="space-y-4 text-base text-black">
              <p>
                <strong>Resit included:</strong> Every mock exam purchase includes one resit. If you are not satisfied with your performance on the first sitting, you may book the resit from your student dashboard after a 7-day waiting period.
              </p>
              <p>
                <strong>Resit fee:</strong> No additional charge. Included in the original mock exam fee.
              </p>
              <p>
                <strong>After both attempts:</strong> If both sittings are complete, the student may purchase the mock exam again for a new sitting in the same subject.
              </p>
              <p>
                <strong>Report for resit:</strong> A new AI report is generated for every sitting — including the resit. Students can compare their two reports to see improvement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className={ui.sections.brand + " py-20 md:py-32"}>
        <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-blue-600 opacity-30 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-blue-600 opacity-30 blur-3xl" aria-hidden="true" />
        <div className="container-custom text-center relative z-10">
          <h2 className="text-4xl md:text-6xl text-white font-semibold leading-[1.05] mb-5 tracking-tight">
            The Grade on Your Mock Report Is the Grade You Are Currently Heading For
          </h2>
          <p className="text-base text-blue-200 mb-12 max-w-3xl mx-auto">
            That grade may already be where you want it. Or it may tell you exactly what needs to change in the next few weeks. Either way — knowing is better than guessing. Book your mock exam and get the truth.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Link href="/contact">
              <Button size="lg" className={`w-full md:w-auto min-w-[280px] font-semibold py-3 px-6 rounded-xl text-[14px] shadow-md flex items-center justify-center gap-2 ${ui.buttons.brandLight}`}>
                Book Mock Exam — Choose Your Subject <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/programs/exam-prep">
              <Button size="lg" variant="outline" className={`w-full md:w-auto min-w-[280px] font-semibold py-3 px-6 rounded-xl text-[14px] shadow-md flex items-center justify-center gap-2 ${ui.buttons.brandOutline}`}>
                View Online Exam Preparation — Structured Practice
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
