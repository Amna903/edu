import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { PageSidebar } from "@/components/PageSidebar";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Brain,
  Target,
  Zap,
  Layers,
  Search,
  BarChart3,
  RefreshCw,
  ClipboardList,
  CheckCircle2,
  Download,
  BookOpen,
  Users,
  School,
} from "lucide-react";
import { Link } from "wouter";
import { InquiryDialog } from "@/components/InquiryDialog";

// ─── DATA ────────────────────────────────────────────────────────────────────

const comparisonRows = [
  {
    typical: "Content delivered — no prior diagnosis",
    edumeup: "Step 1: Exact gaps identified before a single lesson begins",
  },
  {
    typical: "Passive consumption — video or text only",
    edumeup: "Step 2: Foundations repaired before new content is introduced",
  },
  {
    typical: "Single quiz at the end of a topic",
    edumeup: "Step 3: Active H5P engagement at every stage — no passive consumption",
  },
  {
    typical: "Move to next topic regardless of mastery",
    edumeup: "Step 4: Cambridge past papers integrated from Day 1 — not Week 12",
  },
  {
    typical: "Student revises when motivated (rarely)",
    edumeup: "Step 5: Retrieval scheduled automatically at optimal intervals",
  },
  {
    typical: "Test at end of term — gaps revealed too late",
    edumeup: "Step 6: Formative check after every unit — gaps caught early",
  },
  {
    typical: "Generic review assigned when result is poor",
    edumeup: "Step 7: Personalised corrective plan generated immediately",
  },
  {
    typical: "Mock exam in final weeks only",
    edumeup: "Step 8: Timed simulation introduced early — stamina built over time",
  },
];

const phase1Steps = [
  {
    number: 1,
    icon: Search,
    phase: "Phase 1 — Diagnostic",
    title: "Diagnostic Analysis",
    desc: "A 90-minute AI-powered assessment maps every learner's exact knowledge gaps — subject by subject, topic by topic, sub-skill by sub-skill. No guessing. No generic starting points. The student does not begin learning until we know precisely where they actually stand.",
    aiTutor:
      "The Cambridge AI Tutor conducts and interprets the diagnostic. It identifies not just which topics are weak, but which specific sub-skills within each topic are causing the gap. It generates a personalised gap report for each student.",
    examinerLink:
      "Cambridge assessment objectives AO1, AO2, and AO3 are assessed separately — so the AI knows not just what a student does not know, but whether the gap is in recall, application, or higher-order thinking.",
    research: "Bloom (1984) — Mastery Learning & 2 Sigma Problem (d=2.0). VanLehn (2011) — Intelligent Tutoring Systems.",
    popup:
      "Bloom's research showed that starting instruction from a student's actual knowledge level — not an assumed level — produces outcomes 2 standard deviations above conventional instruction. This diagnostic is the foundation of the entire personalised learning architecture.",
    color: "bg-brand-primary",
  },
  {
    number: 2,
    icon: Brain,
    phase: "Phase 1 — Remedial",
    title: "Remedial Concept Repair",
    desc: "Gaps identified in Step 1 are closed before any new O-Level content is introduced. Weak foundations from earlier grades are rebuilt concept by concept using structured micro-modules. Students are not asked to learn new Cambridge content while standing on unstable prior knowledge.",
    aiTutor:
      "The Cambridge AI Tutor delivers remedial instruction at exactly the right level for each student — consistent with Vygotsky's ZPD. It tracks mastery of each repaired concept and triggers advancement only when the 80% mastery gate is met.",
    examinerLink:
      "Remedial content is calibrated to Cambridge assessment expectations — even foundational repair work is framed in terms of what the Cambridge examiner will later look for in AO1 responses.",
    research: "Vygotsky (1978) — Zone of Proximal Development (ZPD). Black & Wiliam (1998) — Formative Assessment.",
    popup:
      "Most students who struggle in Cambridge exams have compounding gaps — a concept from Grade 7 that was never fully understood is still missing in Grade 10, silently undermining every subsequent topic. EduMeUp's remedial step eliminates this root cause before it can compound further.",
    color: "bg-brand-primary",
  },
  {
    number: 3,
    icon: Layers,
    phase: "Phase 1 — Bridge",
    title: "Bridge & Readiness Courses",
    desc: "For students not yet ready for O-Level content, EduMeUp provides pre-O-Level bridge courses. These scaffold key concepts, vocabulary, and thinking frameworks that are prerequisites for O-Level success.",
    aiTutor:
      "The Cambridge AI Tutor builds academic language, examiner-response habits, and conceptual frameworks directly relevant when the student enters O-Level subject courses. It also monitors readiness and signals when the student is prepared to transition.",
    examinerLink:
      "Bridge courses introduce students to Cambridge examination culture — command words (describe, explain, evaluate, analyse), mark scheme structure, and AO1/AO2/AO3 distinctions — before they encounter them under exam conditions.",
    research: "Vygotsky (1978) — Scaffolding and ZPD. Freeman et al. (2014) — Active Learning meta-analysis.",
    popup:
      "Bridge courses are a must-have, not optional. Students who skip this step and move directly into O-Level content without the right foundations typically regress, requiring more remediation later. The bridge is the investment that makes Phase 2 efficient.",
    color: "bg-brand-primary",
  },
];

const phase2Steps = [
  {
    number: 4,
    icon: Zap,
    phase: "Phase 2 — Active Learning",
    title: "Interactive H5P Learning",
    desc: "Every concept in Phase 2 is taught through H5P interactive modules — not passive video or text. Dual-coding (text + visuals) is applied throughout. There are no spectators — every lesson requires the learner to do something before they can advance.",
    aiTutor:
      "The Cambridge AI Tutor operates as a real-time teaching companion during H5P modules — answering questions, explaining concepts using Cambridge examiner language, providing hints calibrated to the student's level, and flagging conceptual confusion.",
    examinerLink:
      "AO1 content (recall) is presented first; AO2 (application) requires the student to use the concept in context; AO3 (analysis/evaluation) is developed progressively. Students learn to think at the level Cambridge examiners expect.",
    research: "Paivio (1971) — Dual Coding Theory (2× memory consolidation). Mayer (2009) — Multimedia Learning. Freeman et al. (2014) — Active Learning meta-analysis.",
    popup:
      "The distinction between interactive H5P learning and passive video is not cosmetic. Research consistently shows that requiring active retrieval during learning — not after it — produces dramatically higher retention. EduMeUp courses are built around this finding from the ground up.",
    color: "bg-brand-navy",
  },
  {
    number: 5,
    icon: ClipboardList,
    phase: "Phase 2 — Practice",
    title: "Cambridge Past Paper Practice",
    desc: "Authentic Cambridge past questions are integrated from the first lesson of Phase 2 — not saved for the final weeks. Exam familiarity, command word recognition, and mark scheme thinking are built progressively from Day 1.",
    aiTutor:
      "The Cambridge AI Tutor marks past paper responses against the Cambridge mark scheme and provides examiner-style feedback — explaining why marks were awarded or deducted, and what the examiner specifically expected at each mark level.",
    examinerLink:
      "Every question on EduMeUp is linked to specific assessment objectives, command words, and mark scheme criteria — so students understand not just the answer, but the examiner's thinking.",
    research: "Bransford et al. (2000) — Transfer of Learning. Hattie (2009) — Visible Learning (deliberate practice).",
    popup:
      "Most students see past papers for the first time in the final weeks before an exam — when it is too late to correct the conceptual misunderstandings the papers reveal. EduMeUp integrates past papers from the beginning because transfer of learning must be practised, not crammed.",
    color: "bg-brand-navy",
  },
  {
    number: 6,
    icon: RefreshCw,
    phase: "Phase 2 — Retrieval",
    title: "AI-Timed Spaced Retrieval Practice",
    desc: "Scheduled recall sessions run at scientifically optimal intervals — Day 1, 3, 7, 14, 30, and 90 — after each concept is first learned. The EduMeUp AI tracks each student's forgetting curve and adjusts timing automatically.",
    aiTutor:
      "The Cambridge AI Tutor delivers all retrieval practice sessions. It varies question format, introduces concepts in new contexts, and uses Cambridge-style questioning. AI alerts are sent to students, parents, and teachers when a retrieval session is due.",
    examinerLink:
      "Retrieval practice questions are drawn from Cambridge past papers and curriculum-mapped question banks — so every retrieval session simultaneously reinforces content knowledge and builds Cambridge examination familiarity.",
    research: "Roediger & Karpicke (2006) — Retrieval Practice Effect. Cepeda et al. (2006) — Spacing Effect. Bjork & Bjork (2011) — Desirable Difficulties.",
    popup:
      "Spaced retrieval is the most powerful evidence-based tool for defeating the Ebbinghaus Forgetting Curve. The critical difference in EduMeUp is that retrieval is automated and individually calibrated — students do not need to remember to revise. The system tracks, schedules, and delivers.",
    color: "bg-brand-navy",
  },
  {
    number: 7,
    icon: Target,
    phase: "Phase 2 — Assessment",
    title: "Formative Assessment & Gap Correction",
    desc: "After every unit, a short formative check identifies precisely what has not yet been retained — and generates a personalised corrective plan immediately. Students are never pushed forward with hidden gaps still in place.",
    aiTutor:
      "The Cambridge AI Tutor analyses formative assessment results and generates the corrective plan. It identifies whether a gap is at AO1, AO2, or AO3 level — so the correction targets the right level of thinking, not just the right topic.",
    examinerLink:
      "Cambridge examiners consistently note that the most common cause of underperformance is not lack of knowledge but lack of exam technique at AO2 and AO3 levels. EduMeUp's formative assessment distinguishes these levels and corrects them separately.",
    research: "Black & Wiliam (1998) — Formative Assessment (effect size d=0.7). Hattie & Timperley (2007) — The Power of Feedback.",
    popup:
      "Black & Wiliam's landmark 1998 review of 580 research studies found that high-quality formative assessment consistently produces among the largest learning gains of any educational intervention — equivalent to moving from the 50th to the 85th percentile.",
    color: "bg-slate-700",
  },
  {
    number: 8,
    icon: BarChart3,
    phase: "Phase 2 — Simulation",
    title: "Time-Bound Cambridge Mock Exams",
    desc: "Full-length, timed Cambridge-style mock exams are introduced well before the final examination date. Students build exam stamina, timing discipline, and real confidence through progressive simulation. A post-mock personalised improvement plan is generated automatically.",
    aiTutor:
      "The Cambridge AI Tutor analyses mock exam scripts against Cambridge mark scheme criteria — identifying AO1, AO2, and AO3 performance levels, examining command word response quality, and flagging timing and structure issues consistent with examiner feedback patterns.",
    examinerLink:
      "EduMeUp mock exams are calibrated to Cambridge paper formats, time allocations, mark distributions, and question style — so students sit their real Cambridge exam having already experienced conditions that closely mirror the actual assessment.",
    research: "Bransford et al. (2000) — Transfer of Learning. Hattie (2009) — Effect of deliberate practice and simulation.",
    popup:
      "Exam anxiety and poor timing are among the most frequently cited causes of underperformance in Cambridge results — both are direct consequences of insufficient simulation practice. EduMeUp introduces mock exams early precisely because simulation, like any skill, requires extended, deliberate practice.",
    color: "bg-slate-700",
  },
];

const stakeholders = [
  {
    icon: "🎓",
    title: "Students",
    color: "border-l-brand-primary",
    bg: "bg-blue-50/60",
    steps: [
      "Step 1: Take the AI Diagnostic — know exactly what to focus on and what to skip",
      "Steps 2–3: Work through targeted remedial and bridge modules at exactly your level",
      "Step 4: Learn through interactive H5P modules — engage actively at every stage",
      "Step 5: Practise Cambridge past papers from Day 1 — build exam familiarity early",
      "Step 6: Receive AI-scheduled retrieval sessions at the right time, automatically",
      "Step 7: Short formative checks after every unit catch gaps before they compound",
      "Step 8: Progressive, timed mock exams build stamina well before exam day",
      "Throughout: Cambridge AI Tutor available 24/7 — examiner-style feedback always on",
    ],
  },
  {
    icon: "📋",
    title: "Teachers",
    color: "border-l-brand-navy",
    bg: "bg-slate-50",
    steps: [
      "Diagnostic generates a detailed class gap report — exact weak concepts by AO level",
      "H5P modules and remedial content are pre-built and Cambridge-aligned — save hours",
      "Cambridge AI Tutor handles routine Q&A and marking — teachers focus on higher-order discussion",
      "Formative system flags at-risk students before they become exam statistics",
      "Automated retrieval scheduling removes the burden of reminding students to revise",
      "Real-time dashboards show mastery levels by topic, AO level, and student",
      "Professional development resources embedded — teachers grow alongside students",
    ],
  },
  {
    icon: "👨‍👩‍👧",
    title: "Parents",
    color: "border-l-green-500",
    bg: "bg-green-50/40",
    steps: [
      "After Step 1, parents receive a plain-language summary of diagnostic results",
      "Parent dashboard shows real-time progress through all 8 steps",
      "AI alerts sent when a retrieval session is due or a formative gap is flagged",
      "Mock exam results reported with a clear improvement plan — no surprises",
      "Cambridge AI Tutor answers parent questions about pathway and exam readiness",
      "Full visibility throughout the preparation journey — confidence, not anxiety",
    ],
  },
  {
    icon: "🏫",
    title: "Schools & Administrators",
    color: "border-l-orange-500",
    bg: "bg-orange-50/30",
    steps: [
      "School-wide diagnostic data shows systemic weaknesses across subjects and AOs",
      "8-step system implemented as a structured partnership — EduMeUp provides all content",
      "Predictive AI alerts flag students and classes at risk well before exam season",
      "Automated formative and retrieval scheduling reduces administrative burden",
      "School partner dashboards show real-time and historical performance data",
      "White-label options available for institutions wanting to brand the ecosystem",
      "Non-franchise model — no large upfront fees, no royalty percentages",
    ],
  },
];

const foundationalStudies = [
  {
    author: "Black & Wiliam",
    year: "1998",
    study: "Formative Assessment",
    step: "Step 7",
    desc: "Inside the Black Box — 580-study review showing formative assessment produces effect size d=0.7, one of the highest in educational research.",
  },
  {
    author: "Bloom",
    year: "1984",
    study: "Mastery Learning & 2 Sigma Problem",
    step: "Steps 1, 2, 5",
    desc: "Students receiving mastery-based personalised instruction outperform conventional classroom students by 2 standard deviations.",
  },
  {
    author: "Freeman et al.",
    year: "2014",
    study: "Active Learning Meta-Analysis",
    step: "Steps 3, 4",
    desc: "Active learning produces 1.5 SD improvement in STEM outcomes and 1.5× reduction in exam failure vs. passive instruction.",
  },
  {
    author: "Roediger & Karpicke",
    year: "2006",
    study: "Retrieval Practice Effect",
    step: "Step 6",
    desc: "Testing produces significantly better long-term retention than re-study — the single most powerful finding for defeating the forgetting curve.",
  },
  {
    author: "Hattie & Timperley",
    year: "2007",
    study: "The Power of Feedback",
    step: "Steps 6, 7, 8",
    desc: "High-quality, specific, timely feedback is among the highest-impact educational interventions — effect size d=0.73.",
  },
  {
    author: "Bjork & Bjork",
    year: "2011",
    study: "Desirable Difficulties",
    step: "Steps 6, 7",
    desc: "Introducing manageable challenges during retrieval (varying formats, contexts, spacing) produces deeper encoding and more durable learning.",
  },
];

// ─── STEP CARD ───────────────────────────────────────────────────────────────

function StepCard({ step, index }: { step: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group relative"
    >
      {/* Header band */}
      <div className={`${step.color} text-white rounded-t-[2rem] px-8 py-5 flex items-center gap-4`}>
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
          {step.number}
        </div>
        <step.icon className="h-5 w-5 text-white/80" />
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/60 font-bold">{step.phase}</p>
          <h3 className="text-xl font-semibold text-white">{step.title}</h3>
        </div>
      </div>

      {/* Body */}
      <div className="bg-blue-50/60 rounded-b-[2rem] p-8 border-4 border-white hover:shadow-2xl transition-all duration-300">
        <p className="text-base text-slate-700 leading-relaxed mb-6 font-medium">{step.desc}</p>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 border border-blue-100">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-primary mb-2">Cambridge AI Tutor</p>
            <p className="text-[13px] text-slate-700 leading-relaxed">{step.aiTutor}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-blue-100">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-primary mb-2">Cambridge Examiner Link</p>
            <p className="text-[13px] text-slate-700 leading-relaxed">{step.examinerLink}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-blue-100">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-primary mb-2">Research</p>
            <p className="text-[13px] text-slate-600 italic leading-relaxed">{step.research}</p>
          </div>
        </div>

        {/* Hover popup strip */}
        <div className="border-l-4 border-brand-primary bg-white/80 rounded-r-xl p-4">
          <p className="text-[13px] text-slate-700 leading-relaxed">{step.popup}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────

const sidebarLinks = [
  { label: "The 10X Difference", href: "#hero" },
  { label: "Typical vs EduMeUp", href: "#two-systems-comparison" },
  { label: "The 8-Step Method", href: "#step-1" },
  { label: "— Step 1: Diagnostic", href: "#step-1" },
  { label: "— Step 2: Remedial", href: "#step-2" },
  { label: "— Step 3: Bridge", href: "#step-3" },
  { label: "— Step 4: H5P Learning", href: "#step-4" },
  { label: "— Step 5: Past Papers", href: "#step-5" },
  { label: "— Step 6: Retrieval", href: "#step-6" },
  { label: "— Step 7: Formative", href: "#step-7" },
  { label: "— Step 8: Simulation", href: "#step-8" },
  { label: "Course Types", href: "#course-types" },
  { label: "For Different Users", href: "#stakeholders" },
  { label: "Research Basis", href: "#research" },
  { label: "Expected Outcomes", href: "#outcomes" },
  { label: "Get Started", href: "#get-started" },
];

export default function HowItWorks() {
  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") || "";

    document.title = "How EduMeUp Works — The 8-Step Mastery Cycle | EduMeUp";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "The science. The system. The steps. EduMeUp's 8-step mastery cycle moves every learner from diagnostic to exam mastery through research-validated methodology.",
      );
    }

    return () => {
      document.title = previousTitle;
      if (metaDescription) metaDescription.setAttribute("content", previousDescription);
    };
  }, []);

  return (
    <Layout>
      <div className="flex min-h-screen bg-white">
        <PageSidebar
          title="How It Works"
          quote="8 research-validated steps. One systematic transformation."
          links={sidebarLinks}
        />

        <div className="flex-1 min-w-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex flex-col">
            {/* ═══════════════════════════════════════════════════════ HERO ══ */}
            <section id="hero" className="relative overflow-hidden bg-white py-8 md:py-12">
              <div className="container-custom max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-[1.4fr_0.9fr] gap-6 items-stretch">
                  {/* Left: headline */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-brand-primary text-white relative overflow-hidden rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 shadow-2xl"
                  >
                    <div className="absolute -top-20 -right-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
                    <div className="relative z-10 max-w-2xl space-y-6">
                      <p className="text-[11px] font-black uppercase tracking-[0.28em] text-blue-100">
                        The Science. The System. The Steps.
                      </p>
                      <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.05] tracking-tight text-white">
                        Built for Retention.{" "}
                        <span className="text-blue-200">Not Content Delivery.</span>
                      </h1>
                      <p className="text-lg md:text-xl text-blue-50/90 leading-relaxed">
                        Most EdTech platforms deliver content and hope students remember it. EduMeUp is built
                        around a systematic, research-validated 8-step cycle that transforms the traditional
                        5–10% retention model into 50–75%+ durable mastery.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 pt-2">
                        <Link href="/programs/ai-diagnostic">
                          <Button className="bg-white text-brand-primary hover:bg-blue-50 font-semibold px-6 py-3 rounded-xl text-base shadow-md flex items-center gap-2">
                            Start Your Free Diagnostic <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Link>
                        <a href="#step-1">
                          <Button variant="outline" className="border border-white/35 text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-xl text-base flex items-center gap-2">
                            See the 8 Steps <ArrowRight className="h-4 w-4" />
                          </Button>
                        </a>
                      </div>
                    </div>
                  </motion.div>

                  {/* Right: stat cards */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="rounded-2xl border border-slate-200 bg-white shadow-lg relative p-8 md:p-10"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(35,102,201,0.18),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(79,134,224,0.16),transparent_35%)]" />
                    <div className="relative z-10 flex h-full flex-col justify-between gap-8">
                      <div>
                        <p className="text-[11px] font-black uppercase tracking-[0.28em] text-brand-primary mb-4">System Overview</p>
                        <div className="bg-gradient-to-br from-brand-primary via-brand-sky to-blue-50 p-8 rounded-[1.5rem] text-white text-center space-y-2">
                          <p className="text-sm font-semibold text-blue-100 uppercase tracking-wider">The Mastery Cycle</p>
                          <p className="text-[13px] text-white/80 leading-relaxed">
                            Diagnose → Repair → Bridge → Learn → Practise → Retrieve → Assess → Simulate →{" "}
                            <span className="font-bold text-yellow-300">MASTERY</span>
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { stat: "91%", label: "Pass rate" },
                          { stat: "85%+", label: "Retention" },
                          { stat: "271%", label: "ROI" },
                        ].map((item) => (
                          <div key={item.stat} className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 text-center">
                            <p className="text-2xl font-semibold text-brand-primary">{item.stat}</p>
                            <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 mt-1">{item.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            <main className="w-full min-w-0 space-y-0">

              {/* ═══════════════════════════════ SECTION 2: TWO SYSTEMS ══ */}
              <section id="two-systems-comparison" className="py-16 md:py-24 bg-[#FFF8EC] -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0">
                <div className="w-full max-w-6xl mx-auto">
                  <div className="mb-10">
                    <p className="text-[11px] font-black uppercase tracking-[0.28em] text-brand-primary mb-3">
                      The Difference Is Not Cosmetic — It Is Structural
                    </p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 mb-6">
                      Two Systems. Two Very Different Outcomes.
                    </h2>
                    <p className="text-base text-slate-700 leading-relaxed max-w-3xl">
                      The reason most students fail to retain what they study is not a lack of effort — it is a structural flaw in how most educational content is delivered. Here is the difference:
                    </p>
                  </div>

                  {/* Comparison table */}
                  <div className="overflow-x-auto rounded-[1.5rem] shadow-sm mb-8">
                    <table className="w-full min-w-[600px]">
                      <thead>
                        <tr>
                          <th className="p-4 text-left font-semibold text-sm bg-red-500/90 text-white rounded-tl-[1.5rem]">
                            Typical EdTech / Tutoring — 5–10% knowledge retention
                          </th>
                          <th className="p-4 text-left font-semibold text-sm bg-brand-primary text-white rounded-tr-[1.5rem]">
                            EduMeUp 8-Step Mastery Cycle — 50–75%+ durable knowledge retention
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {comparisonRows.map((row, i) => (
                          <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                            <td className="p-4 border-t border-slate-100 text-base text-slate-500 line-through decoration-red-300 decoration-2">
                              {row.typical}
                            </td>
                            <td className="p-4 border-t border-blue-100 text-base text-slate-900 font-semibold">
                              {row.edumeup}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Outcome strip */}
                  <div className="bg-brand-primary text-white relative overflow-hidden p-6 rounded-[1.5rem] text-center">
                    <p className="text-white font-semibold text-lg">
                      Typical EdTech: 5–10% retention →→→ EduMeUp 8-Step System: 50–75%+ retention
                    </p>
                    <p className="text-blue-200 text-sm mt-1">The sequence is the product. Each step creates the conditions for the next.</p>
                  </div>
                </div>
              </section>

              {/* ═════════════════════════════════════ SECTION 3: 8 STEPS ══ */}
              <section id="step-1" className="bg-blue-50/20 py-16 md:py-24 -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0">
                <div className="w-full max-w-6xl mx-auto">
                  <div className="text-center mb-10 md:mb-16">
                    <p className="text-[11px] font-black uppercase tracking-[0.28em] text-brand-primary mb-3">
                      The Method Behind the Results
                    </p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 mb-4">
                      The 8-Step Mastery Cycle — What Happens at Each Stage
                    </h2>
                    <p className="text-base text-slate-700 max-w-3xl mx-auto">
                      Every step below is research-validated and sequenced deliberately. Skip a step and the system breaks. Follow it and the research-backed outcomes follow.
                    </p>
                  </div>

                  {/* Phase 1 */}
                  <div className="mb-12" id="phase1-diagnostic">
                    <div className="bg-brand-primary text-white rounded-2xl px-6 py-4 mb-6 inline-block">
                      <h3 className="text-lg font-semibold text-white">Phase 1 — Diagnostic &amp; Remedial</h3>
                      <p className="text-blue-200 text-sm">Steps 1–3 | Goal: Know exactly what to fix before teaching a single new concept</p>
                    </div>
                    <div className="space-y-6">
                      {phase1Steps.map((step, i) => (
                        <div key={step.number} id={`step-${step.number}`}>
                          <StepCard step={step} index={i} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Phase 2 */}
                  <div>
                    <div className="bg-brand-navy text-white rounded-2xl px-6 py-4 mb-6 inline-block">
                      <h3 className="text-lg font-semibold text-white">Phase 2 — Systematic Mastery</h3>
                      <p className="text-blue-200 text-sm">Steps 4–8 | Goal: Active learning → long-term retention → Cambridge exam readiness</p>
                    </div>
                    <div className="space-y-6">
                      {phase2Steps.map((step, i) => (
                        <div key={step.number} id={`step-${step.number}`}>
                          <StepCard step={step} index={i} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* ─── Cycle at a glance strip ─── */}
              <section className="py-10 bg-white -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0">
                <div className="w-full max-w-6xl mx-auto text-center">
                  <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-3">The Cycle at a Glance</h2>
                  <div className="flex flex-wrap justify-center gap-2 items-center text-base font-medium text-slate-700">
                    {["Diagnose", "Repair", "Bridge", "Learn", "Practise", "Retrieve", "Assess", "Correct", "Simulate"].map((s, i, arr) => (
                      <span key={s} className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-white text-xs font-bold ${i < 3 ? "bg-brand-primary" : i < 6 ? "bg-brand-navy" : i < 8 ? "bg-slate-600" : "bg-yellow-500"}`}>
                          {s}
                        </span>
                        {i < arr.length - 1 && <ArrowRight className="h-3 w-3 text-slate-400" />}
                      </span>
                    ))}
                    <ArrowRight className="h-3 w-3 text-slate-400" />
                    <span className="px-3 py-1 rounded-full text-white text-xs font-bold bg-yellow-500">MASTERY</span>
                  </div>
                  <p className="mt-3 text-base text-slate-500">Each step creates the conditions for the next. The sequence is the product.</p>
                </div>
              </section>

              {/* ═══════════════════════════════ SECTION 4: COURSE TYPES ══ */}
              <section id="course-types" className="py-16 md:py-24 bg-[#FFF8EC] -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0">
                <div className="w-full max-w-6xl mx-auto">
                  <div className="text-center mb-10 md:mb-16">
                    <p className="text-[11px] font-black uppercase tracking-[0.28em] text-brand-primary mb-3">Understanding the Two Course Categories</p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 mb-4">
                      Not All EduMeUp Courses Are the Same — By Design.
                    </h2>
                    <p className="text-base text-slate-700 max-w-3xl mx-auto">
                      EduMeUp offers two distinct categories of courses, serving different purposes within the 8-step mastery cycle. Understanding which type is appropriate is part of what the diagnostic determines.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-white rounded-[2rem] p-8 border-l-4 border-l-brand-primary shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <BookOpen className="h-6 w-6 text-brand-primary" />
                        <h3 className="text-2xl font-semibold text-slate-900">Must-Have &amp; Bridge Courses</h3>
                      </div>
                      <p className="text-[15px] text-slate-700 leading-relaxed mb-4">
                        Essential prerequisite courses — not full subject preparation. They cover foundational knowledge, skills, and thinking frameworks that students must have before they can succeed in O-Level subject courses. They correspond to Steps 2 and 3 of the 8-step cycle.
                      </p>
                      <p className="text-base text-slate-500">
                        <span className="font-semibold text-slate-700">Examples:</span> Pre-O-Level mathematics foundations · English academic language and command word skills · Scientific literacy for IGCSE sciences · Study skills and examination technique preparation · Conceptual bridging for students transitioning from other curricula
                      </p>
                    </div>

                    <div className="bg-white rounded-[2rem] p-8 border-l-4 border-l-brand-navy shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <School className="h-6 w-6 text-brand-navy" />
                        <h3 className="text-2xl font-semibold text-slate-900">Subject Courses</h3>
                      </div>
                      <p className="text-[15px] text-slate-700 leading-relaxed mb-4">
                        Complete, systematic O-Level subject preparation courses — covering the full Cambridge syllabus for each subject, chapter by chapter, topic by topic, assessment objective by assessment objective. Built around all 8 steps of the mastery cycle.
                      </p>
                      <p className="text-base text-slate-500">
                        <span className="font-semibold text-slate-700">Available subjects:</span> Physics · Chemistry · Biology · Mathematics · Additional Mathematics · Economics · Business Studies · English Language · English Literature · Computer Science · and more
                      </p>
                    </div>
                  </div>

                  <div className="text-center mt-8">
                    <Link href="/courses">
                      <Button className="bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold px-6 py-3 rounded-xl text-base flex items-center gap-2 mx-auto">
                        Browse All Courses <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </section>

              {/* ════════════════════════════════ SECTION 5: STAKEHOLDERS ══ */}
              <section id="stakeholders" className="bg-blue-50/20 py-16 md:py-24 -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0">
                <div className="w-full max-w-6xl mx-auto">
                  <div className="text-center mb-10 md:mb-16">
                    <p className="text-[11px] font-black uppercase tracking-[0.28em] text-brand-primary mb-3">The System Serves Everyone — Simultaneously</p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 mb-4">
                      One System. Four Stakeholder Experiences.
                    </h2>
                    <p className="text-base text-slate-700 max-w-3xl mx-auto">
                      The 8-step mastery cycle operates differently depending on your role. Here is how each stakeholder group experiences and benefits from the same system.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {stakeholders.map((s, i) => (
                      <div key={i} className={`bg-white rounded-[2rem] p-8 border-l-4 ${s.color} shadow-sm`}>
                        <div className="flex items-center gap-3 mb-5">
                          <span className="text-3xl">{s.icon}</span>
                          <h3 className="text-2xl font-semibold text-slate-900">How the 8-Step System Works for: {s.title}</h3>
                        </div>
                        <ul className="space-y-3">
                          {s.steps.map((step, j) => (
                            <li key={j} className="flex items-start gap-3 text-base font-medium text-slate-700">
                              <ArrowRight className="h-4 w-4 text-brand-primary mt-0.5 flex-shrink-0" />
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* ════════════════════════════════ SECTION 6: RESEARCH FOUNDATION ══ */}
              <section id="research" className="py-16 md:py-24 bg-white -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0">
                <div className="w-full max-w-6xl mx-auto">
                  <div className="text-center mb-10 md:mb-16">
                    <p className="text-[11px] font-black uppercase tracking-[0.28em] text-brand-primary mb-3">The Evidence</p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 mb-4">
                      Six Foundational Studies — Implemented, Not Cited.
                    </h2>
                    <p className="text-base text-slate-700 max-w-3xl mx-auto">
                      The 8-step cycle is not based on intuition or convention. Every step traces directly to peer-reviewed cognitive science research.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {foundationalStudies.map((study, i) => (
                      <div
                        key={i}
                        className="group bg-white rounded-[1.5rem] p-6 border border-blue-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default relative overflow-hidden"
                      >
                        <div className="h-1 bg-brand-primary rounded-full w-12 mb-4" />
                        <p className="text-lg font-bold text-brand-primary">{study.author} ({study.year})</p>
                        <p className="text-base font-semibold text-slate-900 mb-2">{study.study}</p>
                        <p className="text-[12px] text-slate-500 mb-3">Implemented in {study.step}</p>
                        <p className="text-[13px] text-slate-600 leading-relaxed">{study.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="text-center mt-8">
                    <a href="/research-rnd" className="inline-flex items-center gap-2 text-base font-semibold text-brand-primary hover:text-brand-primary/80">
                      See the Full Research Foundation <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </section>

              {/* ═══════════════════════════════════════ SECTION 7: OUTCOMES ══ */}
              <section id="outcomes" className="bg-blue-50/20 py-16 md:py-24 -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0">
                <div className="w-full max-w-6xl mx-auto">
                  <div className="text-center mb-10 md:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 mb-4">
                      The 8-Step System Produces Measurable, Validated Results.
                    </h2>
                    <p className="text-base text-slate-700 max-w-3xl mx-auto">
                      These outcomes are not projected or modelled. They are the results of a rigorous 3-year longitudinal study across 611 students — independently validated.
                    </p>
                  </div>

                  <div className="bg-brand-primary text-white relative overflow-hidden p-12 rounded-[3rem] mb-8">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                      {[
                        { stat: "91%", label: "Exam pass rate (vs. approximately 35% traditional average)" },
                        { stat: "85%+", label: "Knowledge retention after 90 days (vs. 10% traditional)" },
                        { stat: "271%", label: "ROI demonstrated for school partners" },
                      ].map((item) => (
                        <div key={item.stat}>
                          <p className="text-4xl font-semibold text-blue-400 mb-2">{item.stat}</p>
                          <p className="text-xs font-semibold text-blue-200">{item.label}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-center text-blue-300 text-xs mt-6">
                      Additional validated outcomes: 47% of students achieved A or A* grades. Average study time reduced by 40% vs linear curriculum coverage.
                    </p>
                  </div>
                </div>
              </section>

              {/* ═══════════════════════════════════════════ FINAL CTA SECTION ══ */}
              <section id="get-started" className="bg-brand-primary text-white relative overflow-hidden py-20 md:py-32">
                <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-blue-600 opacity-30 blur-3xl" />
                <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-blue-600 opacity-30 blur-3xl" />
                <div className="container-custom max-w-6xl mx-auto text-center relative z-10">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-[1.05] mb-3 tracking-tight px-4">
                    Your Mastery Journey Starts with Step 1.
                  </h2>
                  <p className="text-base text-blue-200 mb-12 max-w-3xl mx-auto">
                    Begin with the free diagnostic and follow the 8-step system designed to take you from confusion to Cambridge exam confidence.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
                    <div className="bg-brand-primary border-4 border-white/20 rounded-[2rem] p-8 text-left flex flex-col shadow-2xl md:scale-105">
                      <h3 className="text-xl font-semibold text-white mb-2">Start Your Free Diagnostic</h3>
                      <p className="text-blue-200 text-sm font-semibold mb-4">~90 minutes. No credit card required.</p>
                      <p className="text-white/80 text-base leading-relaxed mb-6 flex-1">
                        Our AI identifies your exact sub-skill gaps and produces a personalised learning plan before spending a single dollar on courses.
                      </p>
                      <Link href="/programs/ai-diagnostic">
                        <Button className="w-full bg-white text-brand-primary hover:bg-blue-50 font-semibold py-3 rounded-xl text-base flex items-center justify-center gap-2">
                          Start Free Diagnostic <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>

                    <div className="bg-white border-4 border-brand-primary rounded-[2rem] p-8 text-left flex flex-col shadow-xl">
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">Browse All Courses</h3>
                      <p className="text-brand-primary text-sm font-semibold mb-4">O-Level subjects. Bridge courses. Must-have courses.</p>
                      <p className="text-slate-700 text-base leading-relaxed mb-6 flex-1">
                        Explore the full course library — subject courses, bridge courses, and free modules.
                      </p>
                      <Link href="/courses">
                        <Button variant="outline" className="w-full border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-semibold py-3 rounded-xl text-base flex items-center justify-center gap-2">
                          Browse Courses <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>

                    <div className="bg-slate-100 rounded-[2rem] p-8 text-left flex flex-col shadow-sm">
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">Book a Free Consultation</h3>
                      <p className="text-slate-500 text-sm font-semibold mb-4">30 minutes with a Cambridge expert. No obligation.</p>
                      <p className="text-slate-600 text-base leading-relaxed mb-6 flex-1">
                        Schools, parents, and students can book a free consultation to understand how the 8-step system applies to their specific context.
                      </p>
                      <InquiryDialog
                        defaultType="consultation"
                        title="Book Free Consultation"
                        trigger={
                          <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-xl text-base flex items-center justify-center gap-2">
                            Contact Us <ArrowRight className="h-4 w-4" />
                          </Button>
                        }
                      />
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
}
