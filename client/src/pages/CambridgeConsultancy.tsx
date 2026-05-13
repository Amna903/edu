
import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { PageSidebar } from "@/components/PageSidebar";
import {
  ArrowRight,
  Brain,
  BarChart3,
  GraduationCap,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Globe,
  Users,
  School,
  Download,
  Play,
  Zap,
  Target,
  Search,
  MessageCircle,
  Calendar,
  Star,
  ChevronDown,
  ChevronUp,
  Shield,
  Clock,
  Layers,
  TrendingUp,
} from "lucide-react";



// ─── DATA ────────────────────────────────────────────────────────────────────

const gaps = [
  {
    title: "The Information Gap",
    icon: BookOpen,
    color: "border-l-brand-primary",
    desc: "Students and parents in developing countries lack access to accurate, current Cambridge information — how the system works, what grades mean, which subjects to choose, how registration works. Generic information is available, but personalised guidance for individual situations is not.",
  },
  {
    title: "The Expert Gap",
    icon: Users,
    color: "border-l-[#1e1b4b]",
    desc: "Existing online Cambridge consultancy is generic, one-off, and disconnected from any learning infrastructure. The adviser gives advice — but the student has no system to act on it. The session ends and the student is alone again.",
  },
  {
    title: "The Teacher Development Gap",
    icon: GraduationCap,
    color: "border-l-amber-500",
    desc: "Most Cambridge teachers in developing countries have excellent subject knowledge but no systematic training in how Cambridge examiners mark, what AO2 and AO3 questions actually require, or how to teach conceptual understanding rather than memorisation.",
  },
  {
    title: "The System Transition Gap",
    icon: School,
    color: "border-l-green-500",
    desc: "Schools transitioning from national board systems to Cambridge face years of uncertainty — how to register, how to train teachers, what minimum standards are, how to align their curriculum. Without structured guidance, this transition is slow and expensive.",
  },
];

const cambridgeComparison = [
  {
    aspect: "What is tested",
    rote: "Recall and reproduction of textbook content. Students are given predictable questions on known texts. The 'correct answer' is the textbook answer — verbatim.",
    cambridge: "Genuine understanding, application, and evaluation of concepts. Questions are UNSEEN — never seen before. Students must demonstrate they can THINK, not just remember.",
  },
  {
    aspect: "Bloom's Taxonomy levels covered",
    rote: "Levels 1–3 only: Knowledge, Comprehension, Application — the lowest three cognitive levels.",
    cambridge: "All 6 levels. Cambridge AO1 = Levels 1–2. AO2 = Levels 3–4. AO3 = Levels 5–6. A Cambridge student at Band 1 is operating at the top of the cognitive pyramid.",
  },
  {
    aspect: "The 'out of syllabus' argument",
    rote: "When students cannot answer a question because they have never seen it before, it is called 'out of syllabus'. This reaction is itself evidence that the system teaches recognition, not understanding.",
    cambridge: "'Unseen' questions are the standard — and the point. A student who can answer only questions they have seen before has memorised; a student who can answer unseen questions understands.",
  },
  {
    aspect: "Long-term outcomes",
    rote: "Research consistently shows that students trained in rote memorisation underperform at university level — where synthesis, analysis, and evaluation are required from day one.",
    cambridge: "Cambridge graduates consistently outperform national board graduates at university and in professional environments. Hattie (2009) — conceptual learning d=0.62 vs. d=0.15 for rote learning.",
  },
  {
    aspect: "Preparation for future skills",
    rote: "Critical thinking, problem-solving, evaluation, and creative thinking are not developed by rote learning systems.",
    cambridge: "These are exactly the skills Cambridge Assessment Objectives 2 and 3 test and develop. Every student achieving AO3 proficiency has demonstrably developed higher-order thinking skills.",
  },
];

const platformComponents = [
  {
    title: "Proprietary MultiFunction AI Intelligence System",
    desc: "Not a generic chatbot. A proprietary multifunction AI intelligence system purpose-built for Cambridge education — capable of adapting diagnostics, personalising study pathways, answering subject questions, predicting learning risks, and generating practice assessments.",
  },
  {
    title: "Adaptive Diagnostic System (4 types)",
    desc: "AI can refer to actual diagnostic results from: O-Level Bridge Diagnostics (5 subjects), English Language Level Check, O-Level Subject Diagnostics (10 subjects), and ATP Diagnostics (3 subjects).",
  },
  {
    title: "H5P Interactive Course Library",
    desc: "40+ courses, all interactive. Pre-O-Level Victory (Chemistry, Maths, Physics, Biology), 10 O-Level subject courses, O-Level Bridge courses, Must-Have courses, ATP courses, O-Level English (10 courses).",
  },
  {
    title: "Cambridge Examiner-Level Intelligence",
    desc: "EduMeUp AI provides guidance at Cambridge examiner level — delivering the same quality of insight on mark scheme application, AO1/AO2/AO3 performance, common student errors, and Band 1 answer quality.",
  },
  {
    title: "6-Stage Mastery Learning Cycle",
    desc: "Every course uses: Diagnose → Repair → Master → Verify → Retain → Grow Independent. 80% mastery gate enforced before advancing. Spaced retrieval system activated per student per topic.",
  },
  {
    title: "Teacher Training System (T1–T6)",
    desc: "7 teacher programmes — from the T1 Diagnostic through to the T6 AI Teaching Tools subscription. C360 Hub connects teachers to actual courses, workshops, and certification programmes.",
  },
];

const competitorRows = [
  ["Cambridge-Specific AI Diagnostic", "✔ 4 types, AO-level, all 10 subjects", "✘", "✘", "~ Manual", "✘", "✘"],
  ["AO1/AO2/AO3 adaptive question routing", "✔ Full 3-level routing", "✘", "✘", "~ Depends on tutor", "✘", "✘"],
  ["Mastery-gated progression (80% gate)", "✔ Enforced by Moodle", "✘ Self-directed", "~ Basic", "✘", "✘", "✘"],
  ["Spaced retrieval (Day 1/3/7/14/30/90)", "✔ Per topic per student", "✘", "✘", "✘", "✘", "✘"],
  ["H5P interactive content (no passive video)", "✔ 100% interactive", "✘ Video-based", "~ Mix", "✘", "✘ PDFs only", "✘"],
  ["Cambridge examiner-level AI intelligence", "✔ Examiner-calibrated", "✘", "~ Partial", "~ Experience-dependent", "~ Partial", "✘"],
  ["Teacher professional development (T1–T6)", "✔ 7 programmes, certificates", "✘", "✘", "✘", "✘", "✘"],
  ["Parent real-time dashboard", "✔ Live mastery, traffic lights", "✘", "✘", "~ Periodic verbal", "✘", "✘"],
  ["School admin cohort analytics", "✔ Full cohort heatmaps", "✘", "~ Basic", "✘", "✘", "✘"],
  ["Spaced retrieval (automated)", "✔ Day 1/3/7/14/30/90", "✘", "✘", "✘", "✘", "✘"],
  ["Annual cost (1 student, full prep)", "$65–299/yr + plan", "Free (limited)", "$300–1,200/yr", "$2,000–6,000/yr", "Free (incomplete)", "$0–240 (no curriculum)"],
];

const plans = [
  {
    name: "Cambridge Essentials",
    price: "$15",
    period: "/month",
    annual: "$130/year",
    tag: "",
    color: "border-slate-200",
    btnClass: "border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white",
    for: "Students wanting Cambridge guidance. Parents researching. Teachers starting CPD. Schools exploring.",
    ai: ["Unlimited AI Cambridge advisor (all 8 domains)", "Cambridge Information Q&A", "Diagnostic report interpretation (basic)", "EduMeUp navigation guide", "Template preview (5 templates)"],
    human: ["Expert Review: 2 questions/month", "48-hour written response", "No live sessions"],
    platform: ["Free diagnostic (always free)", "Platform read-only orientation", "No course enrolment included"],
  },
  {
    name: "Cambridge Navigator",
    price: "$39",
    period: "/month",
    annual: "$340/year",
    tag: "MOST POPULAR",
    color: "border-brand-primary shadow-2xl",
    btnClass: "bg-brand-primary text-white hover:bg-brand-primary-dark",
    scale: true,
    for: "Students who have taken the diagnostic. Parents supporting Cambridge prep. Teachers developing CPD pathway.",
    ai: ["All Plan 1 AI features", "Personalised AI study plan from diagnostic results", "Full diagnostic interpretation (per topic, per AO)", "Skill development coaching per AO gap", "Template download access (all 5 templates)"],
    human: ["1 live expert session/month — 15 minutes", "Calendly booking provided", "Expert Review: 5 questions/month, 24h response"],
    platform: ["Free diagnostic (up to 2 subjects)", "Access to 2 chapter courses of choice", "Moodle resource library (workbooks, mind maps)", "Spaced retrieval activated for enrolled chapters"],
  },
  {
    name: "Cambridge Accelerator",
    price: "$69",
    period: "/month",
    annual: "$590/year",
    tag: "",
    color: "border-[#1e1b4b]",
    btnClass: "border-2 border-[#1e1b4b] text-[#1e1b4b] hover:bg-[#1e1b4b] hover:text-white",
    for: "Students in intensive exam prep (within 12 months). Teachers seeking systematic CPD. Schools beginning teacher training.",
    ai: ["All Plan 2 AI features", "AI-powered monthly progress review", "AI mock exam analysis", "Proactive AI alerts by topic", "Cambridge command word coaching", "Personalised revision schedule generation"],
    human: ["2 live expert sessions/month — 30 min each", "Priority Expert Review: unlimited questions", "12-hour response"],
    platform: ["Diagnostics for up to 3 subjects", "1 complete O-Level subject course ($65 value)", "Full past paper practice system", "Mock exam simulation activated"],
  },
  {
    name: "Cambridge Excellence",
    price: "$99",
    period: "/month",
    annual: "$850/year (individual) | $2,100/year (school)",
    tag: "SCHOOL AVAILABLE",
    color: "border-amber-400",
    btnClass: "border-2 border-amber-500 text-amber-700 hover:bg-amber-500 hover:text-white",
    for: "Individual: Students within 6 months of O-Level. School: Principals, academic directors, school partnerships.",
    ai: ["All Plan 3 AI features", "Pre-session AI brief (compiled before every session)", "School cohort AI analytics (school plan)", "Teacher CPD AI tracking", "AI-generated quarterly curriculum alignment report"],
    human: ["Individual: 3 sessions/month — 30 min each", "School: 4 sessions/month — 45 min each", "Expert Review: unlimited, 4-hour priority response"],
    platform: ["All diagnostics + 2 complete subject courses", "English language pathway access", "Mock exam system + all past papers", "School: Full partnership + white-label"],
  },
];

const stakeholderPortals = [
  {
    icon: "🎓",
    role: "Students",
    color: "border-l-brand-primary",
    tagColor: "bg-brand-primary",
    desc: "Understand where you stand, where you need to go, and exactly how to get there — with a personalised AI guide that knows your diagnostic results.",
    questions: [
      "Which subjects should I take for medicine?",
      "I scored 44% in Chemistry. What do I do next?",
      "What is AO3 and why am I losing marks there?",
      "How do I use EduMeUp to prepare for O-Level in 10 months?",
    ],
  },
  {
    icon: "👨‍👩‍👧",
    role: "Parents",
    color: "border-l-[#1e1b4b]",
    tagColor: "bg-[#1e1b4b]",
    desc: "Understand exactly what your child needs, how to support them, and whether Cambridge is the right path — explained in plain English, not examination jargon.",
    questions: [
      "Is Cambridge right for my child or should they stay on the national board?",
      "My child's diagnostic shows AO2 gaps — what does that mean?",
      "How much should my child study each day for O-Level?",
      "How do I read the EduMeUp parent dashboard?",
    ],
  },
  {
    icon: "📋",
    role: "Teachers",
    color: "border-l-amber-500",
    tagColor: "bg-amber-500",
    desc: "Develop your Cambridge expertise from your own T1 diagnostic results — mark scheme mastery, AO-level lesson design, examiner intelligence, and AI teaching tools.",
    questions: [
      "My T1 diagnostic shows AO2 gaps in Chemistry. What CPD do I take?",
      "How do I teach students to avoid losing marks on AO3 evaluation questions?",
      "What is the mark scheme for a 6-mark Economics evaluation question?",
      "How do I use EduMeUp's AI tools in my lessons?",
    ],
  },
  {
    icon: "🏫",
    role: "Schools",
    color: "border-l-green-500",
    tagColor: "bg-green-500",
    desc: "Navigate Cambridge registration, teacher training, curriculum alignment, and the complete transition from national board — with a structured AI guide and expert audit services.",
    questions: [
      "How do we become a registered Cambridge school?",
      "How many teachers need T1 diagnostic before we start?",
      "Can EduMeUp train all 25 of our teachers?",
      "What is the EduMeUp school partnership and what does it cost?",
    ],
  },
];

const faqs = [
  {
    q: "Is the AI as knowledgeable as a human Cambridge expert?",
    a: "For factual information, diagnostic interpretation, course recommendations, and Cambridge system guidance — yes, consistently. The AI draws from deep Cambridge-calibrated expertise covering mark scheme application, AO-level assessment, common student errors, and subject-specific guidance at examiner standard. It is also connected to EduMeUp's complete course library, so every answer comes with direct links to the specific resource that addresses the question.",
  },
  {
    q: "Is this service connected to EduMeUp's platform or is it standalone?",
    a: "Fully connected. The Cambridge 360° Hub is not a separate chatbot. It is powered by EduMeUp's AI Tutor and diagnostic system — the same AI that teaches in the courses. When the AI recommends a specific course module, it links directly to that module in Moodle.",
  },
  {
    q: "What is Expert Review and how is it different from a live session?",
    a: "Expert Review (Academic Helpline) is a written service — you submit a question the AI could not answer satisfactorily, and a human expert provides a written response within your plan's timeframe (48h / 24h / 12h / 4h). Live sessions are video calls — used for interactive coaching, complex strategic planning, and nuanced discussions.",
  },
  {
    q: "How do I know which plan is right for me?",
    a: "Primarily need Cambridge information and AI-guided direction: Plan 1 (Essentials). Want personalised AI guidance plus a monthly expert check-in: Plan 2 (Navigator). Within 12 months of O-Level examinations: Plan 3 (Accelerator). Highest level of support — individual in final stretch or school implementing Cambridge: Plan 4 (Excellence).",
  },
  {
    q: "Do I need to have taken the EduMeUp diagnostic first?",
    a: "No — but the service is significantly more useful if you have. The AI can provide general Cambridge guidance without diagnostic data, but when it has your actual diagnostic results, its recommendations become specific to your exact gaps and situation. The free 30-minute diagnostic is always available and always recommended as the first step.",
  },
  {
    q: "What is Moodle and why does it matter for a Cambridge school?",
    a: "Moodle 5.2 is the world's most widely used open-source Learning Management System. It provides the complete infrastructure for EduMeUp's courses: mastery-gated progression, competency tracking, gradebook, certificates, H5P interactive content, spaced retrieval scheduling, and full integration with EduMeUp's proprietary AI intelligence system.",
  },
];

// ─── FAQ ITEM ─────────────────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="bg-white rounded-2xl border border-blue-100 shadow-sm cursor-pointer select-none"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between p-6">
        <p className="text-[15px] font-semibold text-slate-900 pr-4">{q}</p>
        {open ? <ChevronUp className="h-5 w-5 text-brand-primary flex-shrink-0" /> : <ChevronDown className="h-5 w-5 text-slate-400 flex-shrink-0" />}
      </div>
      {open && (
        <div className="px-6 pb-6 border-t border-blue-50 pt-4">
          <p className="text-base text-slate-700 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

// ─── PLAN CARD ────────────────────────────────────────────────────────────────
function PlanCard({ plan, index }: { plan: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className={`relative bg-white rounded-[2rem] border-4 ${plan.color} p-8 flex flex-col ${plan.scale ? "md:-translate-y-2 md:scale-[1.02]" : ""} shadow-sm hover:shadow-xl transition-all`}
    >
      {plan.tag && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className={`px-4 py-1.5 rounded-full text-white text-sm-small font-black uppercase tracking-[0.2em] ${plan.name.includes("Navigator") ? "bg-brand-primary" : "bg-amber-500"}`}>
            {plan.tag}
          </span>
        </div>
      )}

      <div className="mb-6 pt-2">
        <h3 className="text-xl font-semibold text-slate-900 mb-1">{plan.name}</h3>
        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-4xl font-bold text-brand-primary">{plan.price}</span>
          <span className="text-slate-500 text-sm">{plan.period}</span>
        </div>
        <p className="text-[12px] text-slate-500">{plan.annual} · save ~15% annually</p>
        <p className="text-[13px] text-slate-600 mt-3 leading-relaxed border-t border-slate-100 pt-3">{plan.for}</p>
      </div>

      <div className="space-y-5 flex-1">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.25em] text-brand-primary mb-3">AI Services</p>
          <ul className="space-y-2">
            {plan.ai.map((item: any, i: number) => (
              <li key={i} className="flex items-start gap-2 text-[13px] text-slate-700">
                <CheckCircle2 className="h-3.5 w-3.5 text-brand-primary mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.25em] text-[#1e1b4b] mb-3">Human Expert Support</p>
          <ul className="space-y-2">
            {plan.human.map((item: any, i: number) => (
              <li key={i} className="flex items-start gap-2 text-[13px] text-slate-700">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#1e1b4b] mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-400 mb-3">Platform Access</p>
          <ul className="space-y-2">
            {plan.platform.map((item: any, i: number) => (
              <li key={i} className="flex items-start gap-2 text-[13px] text-slate-600">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-300 mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button className={`mt-8 w-full py-3 px-4 rounded-xl text-base font-semibold transition-all flex items-center justify-center gap-2 ${plan.btnClass}`}>
        Get Started — {plan.name.split(" ")[1]} <ArrowRight className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function CambridgeConsultancy() {
  return (
    <Layout>
      <div className="w-full lg:px-8 lg:grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-12 items-start pt-8 md:pt-12">

        <PageSidebar
          title="Cambridge 360°"
          quote="Cambridge guidance, training, and empowerment for every stakeholder."
          links={[
            { label: "Why This Service", href: "#why" },
            { label: "Why Cambridge", href: "#cambridge" },
            { label: "Why EduMeUp", href: "#platform" },
            { label: "How It Works", href: "#how" },
            { label: "For Stakeholders", href: "#portals" },
            { label: "Plans & Pricing", href: "#plans" },
            { label: "FAQ", href: "#faq" },
            { label: "Get Started", href: "#cta" },
          ]}
        />

        <main className="min-w-0 space-y-0">

          {/* ════════════════════ SECTION 2: THE GAP ══ */}
          <section id="why" className="py-16 md:py-24 bg-[#FFF8EC] -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0">
            <div className="w-full max-w-6xl mx-auto">
              <div className="text-center mb-10">
                <p className="text-sm-small font-black uppercase tracking-[0.28em] text-brand-primary mb-3">The Problem We Solve</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 mb-6">
                  Cambridge Success Is Available — But the Right Guidance Has Never Been Accessible.
                </h2>
                <p className="text-base text-slate-700 leading-relaxed max-w-3xl mx-auto">
                  Cambridge O-Level produces better-prepared, more independent thinkers than any national board system in developing countries. But this advantage is only realised when students, teachers, and schools have access to the right guidance.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {gaps.map((gap, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className={`bg-white rounded-[1.5rem] p-8 border-l-4 ${gap.color} shadow-sm hover:shadow-lg transition-all`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                        <gap.icon className="h-5 w-5 text-brand-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">{gap.title}</h3>
                    </div>
                    <p className="text-base text-slate-700 leading-relaxed">{gap.desc}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 relative bg-gradient-to-br from-[#1e1b4b] via-brand-primary to-[#4f86e0] p-6 rounded-[1.5rem] text-center">
                <p className="text-white font-semibold text-lg">
                  The Cambridge 360° Empowerment Hub addresses all four gaps — simultaneously.
                </p>
                <p className="text-blue-200 text-sm mt-1">One AI-powered service. One platform. Every answer when you need it.</p>
              </div>
            </div>
          </section>

          {/* ════════════════════ SECTION 3: WHY CAMBRIDGE ══ */}
          <section id="cambridge" className="bg-gradient-to-br from-blue-50/80 via-slate-50 to-blue-50/40 py-16 md:py-24 -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0">
            <div className="w-full max-w-6xl mx-auto">
              <div className="text-center mb-10">
                <p className="text-sm-small font-black uppercase tracking-[0.28em] text-brand-primary mb-3">The Case That Needs to Be Made</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 mb-4">
                  Why Cambridge? A Research-Backed Answer.
                </h2>
                <p className="text-base text-slate-700 max-w-3xl mx-auto">
                  Based on Bloom's Taxonomy — the most widely accepted educational framework in the world — and on independent research into learning outcomes.
                </p>
              </div>

              <div className="overflow-x-auto rounded-[1.5rem] shadow-sm mb-8">
                <table className="w-full min-w-[620px]">
                  <thead>
                    <tr>
                      <th className="p-4 text-left text-[13px] font-bold bg-slate-700 text-white">Aspect</th>
                      <th className="p-4 text-left text-[13px] font-bold bg-red-500/90 text-white">Rote-Based National Board Systems</th>
                      <th className="p-4 text-left text-[13px] font-bold bg-brand-primary text-white rounded-tr-[1rem]">Cambridge O-Level / IGCSE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cambridgeComparison.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                        <td className="p-4 border-t border-slate-100 text-[13px] font-semibold text-slate-700">{row.aspect}</td>
                        <td className="p-4 border-t border-slate-100 text-[13px] text-slate-500 line-through decoration-red-300 decoration-2">{row.rote}</td>
                        <td className="p-4 border-t border-blue-100 text-[13px] text-slate-900 font-medium">{row.cambridge}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="border-l-4 border-brand-primary bg-white p-6 rounded-r-[1.5rem] shadow-sm">
                <p className="text-base text-slate-700 leading-relaxed font-medium">
                  <strong>Important note:</strong> This comparison is not a criticism of national education systems. It is a factual comparison of what each system tests and what each develops. Cambridge O-Level can coexist with national board qualifications — and EduMeUp's platform is designed to serve students in both systems simultaneously.
                </p>
              </div>
            </div>
          </section>

          {/* ════════════════════ SECTION 4: WHY EDUMEUP ══ */}
          <section id="platform" className="py-16 md:py-24 bg-white -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0">
            <div className="w-full max-w-6xl mx-auto">
              <div className="text-center mb-10">
                <p className="text-sm-small font-black uppercase tracking-[0.28em] text-brand-primary mb-3">Not All Cambridge Platforms Are Equal</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 mb-4">
                  The Quality of the Consultancy Is Only as Good as the Platform Behind It.
                </h2>
                <p className="text-base text-slate-700 max-w-3xl mx-auto">
                  The C360 Hub draws its answers from EduMeUp's complete Cambridge educational ecosystem — not from a generic AI trained on internet text.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
                {platformComponents.map((comp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="bg-white rounded-[1.5rem] p-6 border border-blue-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
                  >
                    <div className="h-1 bg-brand-primary rounded-full w-12 mb-4" />
                    <h3 className="text-[15px] font-bold text-brand-primary mb-3">{comp.title}</h3>
                    <p className="text-[13px] text-slate-600 leading-relaxed">{comp.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* Moodle advantage */}
              <div className="bg-gradient-to-br from-[#1e1b4b] via-brand-primary to-[#4f86e0] rounded-[2rem] p-8 text-white">
                <h3 className="text-xl font-semibold mb-2">The Moodle 5.2 Advantage</h3>
                <p className="text-blue-200 text-sm mb-6">Most schools in developing countries have never used Moodle — or use it only for basic file sharing. EduMeUp uses Moodle 5.2 to its full capability.</p>
                <div className="grid md:grid-cols-2 gap-4">
                  {["Full LMS infrastructure: enrolment, tracking, gradebook, certificates","Mastery gates: 80% gate enforced — students cannot skip","Competency framework: tracks AO level per topic, not just completion","H5P integration: all interactive content runs natively","Spaced retrieval scheduling: Day 1/3/7/14/30/90 automated per student","White-label capable: school branding applied throughout","AI integration: proprietary AI connects to Moodle via API in real time"].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-[13px] text-white/90">
                      <CheckCircle2 className="h-4 w-4 text-blue-300 mt-0.5 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-6 border-t border-white/20 pt-6">
                  <p className="text-base text-blue-200 font-medium">
                    <strong className="text-white">Bottom line for schools:</strong> Most schools manage teaching through WhatsApp groups and printed notes. EduMeUp provides enterprise-grade LMS infrastructure — fully configured, fully populated with Cambridge content — at a fraction of the cost of building it independently.
                  </p>
                </div>
              </div>

              {/* Competitor table */}
              <div className="mt-12">
                <h3 className="text-xl font-semibold text-slate-900 mb-2 text-center">Comprehensive Competitor Comparison</h3>
                <p className="text-base text-slate-500 text-center mb-6">EduMeUp vs. Every Alternative</p>
                <div className="overflow-x-auto rounded-[1.5rem] shadow-sm">
                  <table className="w-full min-w-[800px]">
                    <thead>
                      <tr className="bg-[#1e1b4b] text-white text-xs uppercase tracking-wider">
                        <th className="p-4 text-left font-semibold">Feature</th>
                        <th className="p-4 text-center font-semibold bg-green-700/30">EduMeUp ★</th>
                        <th className="p-4 text-center font-semibold">Khan Academy</th>
                        <th className="p-4 text-center font-semibold">Kognity</th>
                        <th className="p-4 text-center font-semibold">Generic Tutoring</th>
                        <th className="p-4 text-center font-semibold">ZNotes/PMT</th>
                        <th className="p-4 text-center font-semibold">ChatGPT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {competitorRows.map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                          <td className="p-3 text-[13px] text-slate-700 font-medium border-t border-slate-100">{row[0]}</td>
                          {row.slice(1).map((val, j) => (
                            <td key={j} className={`p-3 text-center text-[12px] font-bold border-t border-slate-100 ${j === 0 ? "bg-green-50" : ""} ${val.startsWith("✔") ? "text-green-600" : val.startsWith("✘") ? "text-red-400" : "text-amber-600"}`}>
                              {val}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[12px] text-slate-400 mt-3">✔ = Yes, fully available | ~ = Partial or limited | ✘ = Not available</p>
              </div>
            </div>
          </section>

          {/* ════════════════════ SECTION 5: HOW IT WORKS ══ */}
          <section id="how" className="py-16 md:py-24 bg-[#FFF8EC] -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0">
            <div className="w-full max-w-6xl mx-auto">
              <div className="text-center mb-10">
                <p className="text-sm-small font-black uppercase tracking-[0.28em] text-brand-primary mb-3">Simple to Start</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
                  Get Started in 3 Steps. Your AI Advisor Is Ready in Minutes.
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { num: "1", icon: Target, title: "Choose Your Role and Plan", desc: "Tell us who you are — Student, Parent, Teacher, or School. Select the plan that fits your needs. Your AI advisor is configured for your role immediately." },
                  { num: "2", icon: MessageCircle, title: "Ask Anything — AI Answers Instantly", desc: "Type your question in plain language. The AI draws from Cambridge knowledge, EduMeUp's course library, diagnostic data, and examiner intelligence to give a specific, actionable answer — with direct links to the resources you need." },
                  { num: "3", icon: Calendar, title: "Get Resources, Book Sessions If Needed", desc: "Your AI response includes links to EduMeUp courses, templates, checklists, and diagnostic tools. If your question needs a human expert — book a live session (Plans 2, 3, 4) or send it to Expert Review (all plans)." },
                ].map((step, i) => (
                  <div key={i} className="bg-white rounded-[1.5rem] p-8 shadow-sm hover:shadow-lg transition-all text-center">
                    <div className="w-14 h-14 bg-brand-primary rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">{step.num}</div>
                    <step.icon className="h-6 w-6 text-brand-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">{step.title}</h3>
                    <p className="text-base text-slate-600 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 border-l-4 border-brand-primary bg-white p-5 rounded-r-[1.5rem] shadow-sm">
                <p className="text-base text-slate-700 leading-relaxed">
                  <strong>If the AI cannot answer satisfactorily:</strong> Mark the answer 'Not Helpful'. The system will offer Expert Review (written response, included in all plans with limits) or a live session booking (Plans 2, 3, 4). Unanswered questions are stored and reviewed weekly — adding to the AI knowledge base continuously.
                </p>
              </div>
            </div>
          </section>

          {/* ════════════════════ SECTION 6: STAKEHOLDER PORTALS ══ */}
          <section id="portals" className="bg-gradient-to-br from-blue-50/80 via-slate-50 to-blue-50/40 py-16 md:py-24 -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0">
            <div className="w-full max-w-6xl mx-auto">
              <div className="text-center mb-10">
                <p className="text-sm-small font-black uppercase tracking-[0.28em] text-brand-primary mb-3">Built Specifically for You</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
                  The Hub Is Specifically Designed for You — Whichever Role You Are In.
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {stakeholderPortals.map((portal, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className={`bg-white rounded-[2rem] p-8 border-l-4 ${portal.color} shadow-sm hover:shadow-xl transition-all`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{portal.icon}</span>
                      <div>
                        <span className={`text-xs font-black uppercase tracking-[0.2em] text-white px-3 py-1 rounded-full ${portal.tagColor}`}>For {portal.role}</span>
                      </div>
                    </div>
                    <p className="text-base text-slate-700 leading-relaxed mb-5">{portal.desc}</p>
                    <div>
                      <p className="text-sm-small font-black uppercase tracking-[0.2em] text-brand-primary mb-3">Sample questions the AI answers:</p>
                      <ul className="space-y-2">
                        {portal.questions.map((q, j) => (
                          <li key={j} className="flex items-start gap-2 text-[13px] text-slate-600 italic">
                            <MessageCircle className="h-3.5 w-3.5 text-brand-primary mt-0.5 flex-shrink-0" />
                            "{q}"
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button className="mt-6 flex items-center gap-2 text-[13px] font-semibold text-brand-primary hover:text-blue-700 transition-colors">
                      Start Your {portal.role.slice(0,-1)} Journey <ArrowRight className="h-4 w-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ════════════════════ SECTION 7: ROADMAPS ══ */}
          <section id="roadmap" className="py-16 md:py-24 bg-white -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0">
            <div className="w-full max-w-6xl mx-auto">
              <div className="text-center mb-10">
                <p className="text-sm-small font-black uppercase tracking-[0.28em] text-brand-primary mb-3">Research-Backed Pathways</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
                  The EduMeUp O-Level Mastery Pathway
                </h2>
                <p className="text-base text-slate-700 max-w-3xl mx-auto">Two diagnostic-first, research-backed roadmaps — designed for different stages of the Cambridge journey. Neither is generic advice.</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Variant A */}
                <div>
                  <div className="bg-brand-primary text-white rounded-2xl px-6 py-4 mb-6 inline-block">
                    <h3 className="text-lg font-semibold text-white">Variant A — The Early Advantage Pathway</h3>
                    <p className="text-blue-200 text-sm">Grade 7–8 or first 5 months of O-Level Year 1</p>
                  </div>
                  <div className="space-y-4">
                    {[
                      { step: 1, title: "English Language Diagnostic", desc: "Assess CEFR level first — before any subject work. If below B1, the English Language Pathway must begin immediately. Research: Nation (2001) — vocabulary breadth is the single strongest predictor of reading comprehension across ALL academic subjects." },
                      { step: 2, title: "Learn How to Learn — Must-Have Course", desc: "Cornell note-taking, spaced retrieval practice, exam strategy, academic independence. This course makes every subsequent study hour 10× more effective. Research: Zimmerman (2002)." },
                      { step: 3, title: "O-Level Bridge Diagnostic", desc: "Take the Bridge Diagnostic for each O-Level subject. Identifies foundational gaps before O-Level study begins. Research: Bloom (1968) — cumulative knowledge gaps compound." },
                      { step: 4, title: "Pre-O-Level Victory Programme", desc: "If Bridge Diagnostic shows significant gaps: enrol in Pre-O-Level Victory Programme for Chemistry, Mathematics, Physics, and/or Biology. Research: Bloom (1984) — mastery at prerequisite level d=2.0." },
                      { step: 5, title: "O-Level Subject Courses — Mastery-Gated", desc: "With English secure, study skills active, and foundations established: begin O-Level subject courses chapter by chapter. 80% mastery gate before advancing. Research: VanLehn (2011) d=0.76." },
                      { step: 6, title: "Diagnostic Retesting — Every 3 Months", desc: "Retake the relevant diagnostic every 3 months to measure improvement and update the study plan. Progress tracked in dashboard — visible to student, parent, and teacher simultaneously." },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-1">{item.step}</div>
                        <div className="bg-blue-50/60 rounded-[1rem] p-4 flex-1 border border-blue-100">
                          <h4 className="text-base font-semibold text-slate-900 mb-1">{item.title}</h4>
                          <p className="text-[13px] text-slate-600 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Variant B */}
                <div>
                  <div className="bg-[#1e1b4b] text-white rounded-2xl px-6 py-4 mb-6 inline-block">
                    <h3 className="text-lg font-semibold text-white">Variant B — The Targeted Recovery Pathway</h3>
                    <p className="text-blue-200 text-sm">O-Level Year 1 — more than 5 months in</p>
                  </div>
                  <div className="space-y-4">
                    {[
                      { step: 1, title: "English Language Check", desc: "Non-negotiable regardless of stage. Many students who appear to struggle with subject content are actually struggling with the English of the questions — particularly common in multilingual contexts." },
                      { step: 2, title: "O-Level Subject Diagnostic — Priority Subjects", desc: "Take the O-Level Subject Diagnostic for their weakest or most critical subjects. The diagnostic produces an AO-level gap matrix — showing exactly which topics, and at which AO level, the gaps exist." },
                      { step: 3, title: "Targeted Remedial Plan — AI-Generated", desc: "The AI generates a targeted remedial plan based on the diagnostic gap matrix. Focus exclusively on O-Level topics below 50% mastery — in priority order by marks available. Research: Dunlosky et al. (2013)." },
                      { step: 4, title: "O-Level Chapter Courses + Past Papers from Day 1", desc: "Access only the chapter courses for the weak topics identified. Cambridge past papers integrated from the first lesson — not saved for revision. Every lesson links back to the Cambridge mark scheme." },
                      { step: 5, title: "Mock Exam Simulation + Re-diagnostic", desc: "After targeted study (4–6 weeks): run the full mock exam simulation. Compare results against the original diagnostic. The AI updates the remedial plan based on remaining gaps. Repeat every 4–6 weeks." },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-8 h-8 bg-[#1e1b4b] rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-1">{item.step}</div>
                        <div className="bg-slate-50 rounded-[1rem] p-4 flex-1 border border-slate-100">
                          <h4 className="text-base font-semibold text-slate-900 mb-1">{item.title}</h4>
                          <p className="text-[13px] text-slate-600 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 border-l-4 border-brand-primary bg-blue-50 p-6 rounded-r-[1.5rem]">
                <p className="text-base text-slate-700 leading-relaxed">
                  The AI C360 Hub advisor can help you identify which variant applies to you and walk you through each step. Ask: <em>"Which O-Level roadmap should I follow?"</em> — and the AI will ask you 3 questions to determine your variant.
                </p>
              </div>
            </div>
          </section>

          {/* ════════════════════ SECTION 8: PLANS & PRICING ══ */}
          <section id="plans" className="py-16 md:py-24 bg-[#FFF8EC] -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0">
            <div className="w-full max-w-6xl mx-auto">
              <div className="text-center mb-10">
                <p className="text-sm-small font-black uppercase tracking-[0.28em] text-brand-primary mb-3">Choose Your Level</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
                  Four Plans. One for Every Need and Every Budget.
                </h2>
                <p className="text-base text-slate-700 max-w-3xl mx-auto">
                  All plans include unlimited access to the AI Cambridge advisor for your stakeholder type. All prices in USD.
                </p>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
                {plans.map((plan, i) => <PlanCard key={i} plan={plan} index={i} />)}
              </div>

              {/* Feature comparison strip */}
              <div className="mt-12 overflow-x-auto rounded-[1.5rem] shadow-sm">
                <table className="w-full min-w-[700px]">
                  <thead>
                    <tr className="bg-brand-primary text-white text-xs uppercase tracking-wider">
                      <th className="p-4 text-left font-semibold">Feature</th>
                      <th className="p-4 text-center font-semibold">Essentials $15/mo</th>
                      <th className="p-4 text-center font-semibold">Navigator $39/mo</th>
                      <th className="p-4 text-center font-semibold">Accelerator $69/mo</th>
                      <th className="p-4 text-center font-semibold">Excellence $99/mo+</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Unlimited AI Cambridge advisor", "✔", "✔", "✔", "✔"],
                      ["Cambridge info Q&A", "✔", "✔", "✔", "✔"],
                      ["Diagnostic interpretation (AI)", "Basic", "Full", "Full + monthly review", "Full + pre-session brief"],
                      ["Template access", "Preview only", "✔ Download", "✔ Download", "✔ Download"],
                      ["Diagnostics included", "Free only", "Free + 2 paid", "Free + 3 paid", "Free + all subjects"],
                      ["Chapter courses included", "✘", "2 chapters", "1 complete subject", "2 complete subjects"],
                      ["English language pathway", "✘", "✘", "✘", "✔ Full access"],
                      ["Past paper + mock exam system", "✘", "✘", "✔", "✔"],
                      ["Spaced retrieval system", "✘", "2 chapters", "Full subject", "Full + school"],
                      ["Live sessions / month", "✘", "1 × 15 min", "2 × 30 min", "3–4 × 30–45 min"],
                      ["Expert Review questions", "2/month (48h)", "5/month (24h)", "Unlimited (12h)", "Unlimited (4h priority)"],
                      ["School cohort analytics", "✘", "✘", "✘", "✔ (school plan)"],
                      ["White-label platform", "✘", "✘", "✘", "✔ (school plan)"],
                    ].map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                        <td className="p-3 text-[13px] text-slate-700 font-medium border-t border-slate-100">{row[0]}</td>
                        {row.slice(1).map((val, j) => (
                          <td key={j} className={`p-3 text-center text-[12px] border-t border-slate-100 ${val === "✔" ? "text-green-600 font-bold" : val === "✘" ? "text-red-400" : "text-slate-600"}`}>
                            {val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[12px] text-slate-400 mt-2">All prices in USD only. Annual subscription saves ~15% vs monthly.</p>
            </div>
          </section>

          {/* ════════════════════ SECTION 9: FAQ ══ */}
          <section id="faq" className="bg-gradient-to-br from-blue-50/80 via-slate-50 to-blue-50/40 py-16 md:py-24 -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0">
            <div className="w-full max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <p className="text-sm-small font-black uppercase tracking-[0.28em] text-brand-primary mb-3">Common Questions</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 mb-4">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-4">
                {faqs.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} />)}
              </div>
            </div>
          </section>

          {/* ════════════════════ FINAL CTA ══ */}
          <section id="cta" className="relative bg-gradient-to-br from-[#1e1b4b] via-brand-primary to-[#4f86e0] py-20 md:py-32 overflow-hidden">
            <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-blue-600 opacity-30 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-blue-600 opacity-30 blur-3xl" />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-[1.05] mb-3 tracking-tight">
                Your Cambridge Journey Begins With One Question. Ask It Now.
              </h2>
              <p className="text-base text-blue-200 mb-12 max-w-3xl mx-auto">
                The AI is ready. The courses are ready. The experts are available. The only thing missing is your first question.
              </p>

              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
                <div className="bg-brand-primary border-4 border-white/20 rounded-[2rem] p-8 text-left flex flex-col shadow-2xl md:scale-105">
                  <h3 className="text-xl font-semibold text-white mb-2">Get Started with Your Plan</h3>
                  <p className="text-blue-200 text-sm font-semibold mb-4">Choose your level. AI advisor active within minutes.</p>
                  <p className="text-white/80 text-base leading-relaxed mb-6 flex-1">
                    Select the plan that fits your role and budget. Your AI advisor will be configured for your specific stakeholder profile immediately upon signup.
                  </p>
                  <a href="#plans">
                    <button className="w-full bg-white text-brand-primary hover:bg-brand-primary-soft font-semibold py-3 rounded-xl text-base flex items-center justify-center gap-2 transition-all">
                      See All Plans <ArrowRight className="h-4 w-4" />
                    </button>
                  </a>
                </div>

                <div className="bg-white border-4 border-brand-primary rounded-[2rem] p-8 text-left flex flex-col shadow-xl">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Start with the Free Diagnostic</h3>
                  <p className="text-brand-primary text-sm font-semibold mb-4">Not sure which plan? Know your gaps first — free, 30 minutes.</p>
                  <p className="text-slate-700 text-base leading-relaxed mb-6 flex-1">
                    Our AI identifies your exact sub-skill gaps before you spend a single dollar. Know precisely what to focus on from day one.
                  </p>
                  <a href="/diagnostic">
                    <button className="w-full border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-semibold py-3 rounded-xl text-base flex items-center justify-center gap-2 transition-all">
                      Take Free Diagnostic <ArrowRight className="h-4 w-4" />
                    </button>
                  </a>
                </div>

                <div className="bg-slate-100 rounded-[2rem] p-8 text-left flex flex-col shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Schools — Book a Strategy Session</h3>
                  <p className="text-slate-500 text-sm font-semibold mb-4">Understand exactly how EduMeUp would work for your school. 30 minutes. No obligation.</p>
                  <p className="text-slate-600 text-base leading-relaxed mb-6 flex-1">
                    For principals, academic directors, and school leaders exploring the Cambridge partnership model.
                  </p>
                  <a href="/contact">
                    <button className="w-full border-2 border-slate-300 text-slate-700 hover:bg-slate-200 font-semibold py-3 rounded-xl text-base flex items-center justify-center gap-2 transition-all">
                      Book School Session <ArrowRight className="h-4 w-4" />
                    </button>
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-blue-200 font-medium">
                {["🌍 Available in Any Country", "🤖 AI-Powered · Research-Backed", "🔗 Connected to EduMeUp's Complete Platform", "🔒 Private — Results Only Yours", "⚡ AI Response in Seconds", "✋ Expert Review Included in All Plans"].map((item, i) => (
                  <span key={i}>{item}</span>
                ))}
              </div>
            </div>
          </section>

        </main>
    </div>
    </Layout>
  );
}
