import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { PageSidebar } from "@/components/PageSidebar";
import {
  ArrowRight,
  Brain,
  BarChart3,
  GraduationCap,
  CheckCircle2,
  BookOpen,
  Globe,
  Users,
  School,
  Zap,
  Target,
  Search,
  Clock,
  Layers,
  Shield,
} from "lucide-react";

// ─── THEME (matches About page exactly) ──────────────────────────────────────
const ui = {
  sections: {
    brand: "relative bg-gradient-to-br from-[#1e1b4b] via-[#2366c9] to-[#4f86e0]",
    softBlue: "bg-gradient-to-br from-blue-50/80 via-slate-50 to-blue-50/40",
  },
  cards: {
    standard: "relative bg-white/90 backdrop-blur-sm border border-blue-50",
  },
  buttons: {
    brandLight: "bg-white text-[#2366c9] hover:bg-blue-50",
  },
};

// ─── DATA ────────────────────────────────────────────────────────────────────

const problemCards = [
  {
    title: "Rapid Forgetting",
    icon: BarChart3,
    stat: "Up to 70% of new material is forgotten within 24 hours.",
    body: "The Ebbinghaus Forgetting Curve shows that without timely reinforcement, even well-taught content vanishes rapidly. Traditional tutoring has no system to prevent this.",
    popup: "EduMeUp's AI tracks each student's forgetting curve and delivers precisely timed retrieval prompts — converting short-term memory into long-term mastery.",
    color: "bg-red-50",
    iconColor: "text-red-500",
  },
  {
    title: "Tutor Dependency",
    icon: Users,
    stat: "Quality, availability, and Cambridge expertise vary dramatically between tutors.",
    body: "When a student's progress is tied to a single human tutor, inconsistency, absence, and varying expertise levels create learning gaps that compound over time.",
    popup: "EduMeUp provides a 24/7 Cambridge-expert AI tutor trained on IGCSE/O-Level curriculum and examiner expectations — consistent, always available, always Cambridge-standard.",
    color: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    title: "Passive Learning Illusion",
    icon: BookOpen,
    stat: "Watching videos and reading PDFs creates the feeling of learning — without the reality.",
    body: "The Learning Pyramid shows that passive methods (lectures, reading, audiovisual) produce 5–20% retention. Real mastery requires active engagement, practice, and application.",
    popup: "Every EduMeUp course is interactive by design — built with H5P technology so students actively engage, apply, and are evaluated in real time, not just consume content.",
    color: "bg-amber-50",
    iconColor: "text-amber-600",
  },
];

const differentiators = [
  {
    icon: Brain,
    title: "Cambridge-Focused AI Tutor",
    desc: "Not a generic chatbot. Our AI tutor is trained specifically on IGCSE and O-Level curriculum, Cambridge assessment objectives (AO1, AO2, AO3), and examiner marking expectations. It thinks like a Cambridge examiner — available 24/7.",
    popup: "Unlike generic AI tools, EduMeUp's AI tutor has deep knowledge of Cambridge syllabus nuances, common examiner pitfalls, mark scheme logic, and subject-specific expectations. It diagnoses, teaches, and evaluates — all in one conversation.",
    color: "bg-[#2366c9]",
  },
  {
    icon: Zap,
    title: "Interactive Courses — Not Videos",
    desc: "Every lesson is an active experience. Powered by H5P and research-backed instructional design, our courses require students to engage, apply, and demonstrate understanding at every step — not sit and watch.",
    popup: "Research consistently shows that interactive, retrieval-based learning produces 3–5× higher retention than passive video learning. Every course element is designed to make the learner DO something, not just consume something.",
    color: "bg-[#2366c9]",
  },
  {
    icon: Search,
    title: "Diagnostic & Remedial Engine",
    desc: "Our platform identifies learning gaps before they become exam failures. Targeted remedial pathways automatically repair foundational weaknesses — students are not left to struggle silently with concepts they never fully understood.",
    popup: "Many students fail Cambridge exams not because of the exam content, but because of unresolved gaps from earlier grades. EduMeUp's diagnostic system maps each student's knowledge landscape and prescribes targeted remedial content.",
    color: "bg-[#1e1b4b]",
  },
  {
    icon: Clock,
    title: "AI-Timed Retrieval Practice",
    desc: "Our system tracks the forgetting curve for each student individually and delivers precisely timed practice prompts — converting short-term memory into long-term, exam-ready mastery.",
    popup: "Spaced retrieval is the most evidence-backed method for long-term retention (Roediger & Karpicke, 2006; Cepeda et al., 2008). EduMeUp automates this entirely — students receive the right practice at the right time, without any manual scheduling.",
    color: "bg-[#1e1b4b]",
  },
  {
    icon: Users,
    title: "Complete Stakeholder Ecosystem",
    desc: "Students, parents, teachers, and school administrators — all empowered with the tools, insights, and dashboards relevant to their specific role. Education does not happen in isolation, and neither does EduMeUp.",
    popup: "Parents track progress in real time. Teachers access curriculum tools and training. Administrators manage school-wide learning data. Students learn. All in one ecosystem — not scattered across disconnected tools.",
    color: "bg-slate-700",
  },
  {
    icon: Globe,
    title: "Language Barriers Removed",
    desc: "Built-in translation and audio features ensure that language is never a barrier to understanding Cambridge-standard content — making world-class education accessible to every learner.",
    popup: "For students learning Cambridge content in a second or third language, comprehension barriers can be as damaging as knowledge gaps. EduMeUp's translation layer removes this friction.",
    color: "bg-slate-700",
  },
];

const comparisonRows = [
  ["Cambridge / IGCSE curriculum alignment", "✔", "~", "✘", "✔"],
  ["AI tutor (curriculum-specific, not generic)", "✔", "✘", "✘", "✘"],
  ["Cambridge examiner insight & mark scheme logic", "✔", "~", "✘", "~"],
  ["Interactive courses (active learning — not videos)", "✔", "✘", "~", "✘"],
  ["Diagnostic & remedial learning pathways", "✔", "✘", "~", "✘"],
  ["AI-timed retrieval practice (spaced repetition)", "✔", "✘", "✘", "✘"],
  ["24/7 availability", "✔", "✘", "✔", "✘"],
  ["Language barrier support (translation + audio)", "✔", "✘", "~", "✘"],
  ["Complete stakeholder ecosystem (4 groups)", "✔", "✘", "✘", "~"],
  ["Forgetting curve management (automated)", "✔", "✘", "✘", "✘"],
  ["School partnership model (non-franchise)", "✔", "✘", "✘", "✘"],
  ["Teacher training & CPD support", "✔", "✘", "✘", "~"],
  ["Transparent pricing (USD, no hidden fees)", "✔", "~", "✔", "✘"],
  ["Research-backed learning architecture", "✔", "✘", "~", "✘"],
];

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function HowEduMeUpIsDifferent() {
  return (
    <Layout>
      <div className="w-full lg:px-8 lg:grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-12 items-start pt-8 md:pt-12">

        <PageSidebar
          title="Why EduMeUp"
          quote="A complete Cambridge learning ecosystem — not just content delivery."
          links={[
            { label: "The Problem", href: "#problem" },
            { label: "Our Solution", href: "#section-3" },
            { label: "Key Differentiators", href: "#differentiators" },
            { label: "Comparison Table", href: "#comparison-table" },
            { label: "For Schools", href: "#schools" },
            { label: "Get Started", href: "#cta" },
          ]}
        />

        <main className="min-w-0 space-y-0">

          {/* ════════════════════ SECTION 2: THE PROBLEM ══ */}
          <section id="problem" className="py-16 md:py-24 bg-[#FFF8EC] -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0">
            <div className="w-full max-w-6xl mx-auto">
              <div className="text-center mb-10">
                <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#2366c9] mb-3">The Research Is Clear</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 mb-6">
                  The Traditional Model Fails 95% of Learners.
                </h2>
                <p className="text-xl text-slate-900/60 font-medium max-w-3xl mx-auto mb-8">
                  Here is the research — and here is why it matters for your child's Cambridge results.
                </p>

                {/* Research callout */}
                <div className="border-l-4 border-[#2366c9] bg-blue-50 p-6 rounded-r-[1.5rem] text-left mb-10 max-w-3xl mx-auto">
                  <p className="text-base md:text-lg italic text-slate-800 leading-relaxed">
                    According to the Learning Pyramid (NTL Institute), traditional teaching methods — lectures, textbooks, and assigned readings — yield only 5% knowledge retention after 24 hours. Most tutoring centers and EdTech platforms are built on exactly this model.
                  </p>
                  <p className="text-[12px] text-slate-500 mt-3 font-medium">NTL Institute, National Training Laboratories, Bethel, Maine.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {problemCards.map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative bg-white rounded-[1.5rem] p-8 shadow-sm hover:shadow-xl transition-all cursor-default overflow-hidden"
                  >
                    <div className={`w-14 h-14 ${card.color} rounded-2xl flex items-center justify-center mb-5`}>
                      <card.icon className={`h-7 w-7 ${card.iconColor}`} />
                    </div>
                    <h3 className={`text-lg font-semibold ${card.iconColor} mb-2`}>{card.title}</h3>
                    <p className="text-[14px] font-semibold text-slate-700 mb-3">{card.stat}</p>
                    <p className="text-[14px] text-slate-600 leading-relaxed">{card.body}</p>
                    {/* Hover popup */}
                    <div className="absolute inset-0 bg-white rounded-[1.5rem] p-8 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 flex flex-col justify-center border-l-4 border-[#2366c9]">
                      <p className="text-[13px] text-slate-700 leading-relaxed">{card.popup}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ════════════════════ SECTION 3: THE 10X SOLUTION ══ */}
          <section id="section-3" className="bg-gradient-to-br from-blue-50/80 via-slate-50 to-blue-50/40 py-16 md:py-24 -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0">
            <div className="w-full max-w-6xl mx-auto">
              <div className="text-center mb-10">
                <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#2366c9] mb-3">Our Proprietary Methodology</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 mb-4">
                  We Built the Solution from the Ground Up.
                </h2>
                <p className="text-xl text-blue-700 font-medium mb-6">
                  EduMeUp's 10X Learning Leap Model transforms the traditional 5% retention rate into 50%+ mastery — systematically, measurably, and at scale.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 mb-10">
                <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-blue-100">
                  <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#2366c9] mb-4">What It Is</p>
                  <p className="text-base text-slate-700 leading-relaxed mb-6">
                    Our proprietary 10X Learning Leap Model is an 8-stage learning architecture engineered around cognitive science, retrieval practice, spaced repetition, and Cambridge examiner expectations.
                  </p>
                  <p className="text-base text-slate-700 leading-relaxed mb-6">
                    It is not a content library. It is not a video course. It is the first complete Cambridge learning ecosystem of its kind — transforming passive content consumption into active, exam-ready mastery.
                  </p>
                  <p className="text-base text-slate-700 leading-relaxed">
                    Backed by decades of educational research and designed for the realities of the Cambridge and IGCSE examination system, EduMeUp does not just teach — it ensures that what is taught is retained, applied, and performed under exam conditions.
                  </p>
                  <a href="/how-it-works" className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#2366c9] hover:text-blue-700 mt-6">
                    Read More About How It Works <ArrowRight className="h-4 w-4" />
                  </a>
                </div>

                <div className="space-y-4">
                  {[
                    { title: "Phase 1 — Diagnostic & Remedial", steps: ["Step 1: Comprehensive Diagnostic Assessment — AI identifies precise sub-skill gaps (Bloom d=2.0)", "Step 2: Personalised Remedial Pathway — targets only actual weak areas, saves 40–60% study time", "Step 3: Bridge & Readiness Courses — scaffolding for students not yet ready for O-Level content"], color: "bg-[#2366c9]" },
                    { title: "Phase 2 — Systematic Mastery", steps: ["Step 4: Dual-Coding Interactive Instruction — text + visuals + H5P simultaneously (2× memory strength)", "Step 5: Mastery Progression Gates — 80% mastery required before advancing", "Step 6: AI-Timed Spaced Retrieval — Day 1, 3, 7, 14, 30, 90. 85%+ retention after 90 days", "Step 7: Application & Exam Integration — past Cambridge papers from Day 1", "Step 8: Real-Time Progress & Stakeholder Monitoring — predictive alerts before problems become failures"], color: "bg-[#1e1b4b]" },
                  ].map((phase, i) => (
                    <div key={i}>
                      <div className={`${phase.color} text-white rounded-xl px-5 py-3 mb-3 inline-block`}>
                        <h3 className="text-sm font-semibold text-white">{phase.title}</h3>
                      </div>
                      <ul className="space-y-2">
                        {phase.steps.map((step, j) => (
                          <li key={j} className="flex items-start gap-3 text-[13px] text-slate-700 bg-white rounded-xl p-3 border border-blue-50 shadow-sm">
                            <CheckCircle2 className="h-4 w-4 text-[#2366c9] mt-0.5 flex-shrink-0" />
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stat strip */}
              <div className="relative bg-gradient-to-br from-[#1e1b4b] via-[#2366c9] to-[#4f86e0] p-10 rounded-[2rem] mb-8">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  {[
                    { stat: "5% → 50%+", label: "Learning Retention Transformation", sub: "NTL Institute Learning Pyramid vs. active practice methods" },
                    { stat: "24/7", label: "Cambridge Expert AI Tutor Availability", sub: "Always available, always Cambridge-standard" },
                    { stat: "8 Stages", label: "Proprietary Learning Architecture", sub: "The sequence is the product" },
                  ].map((item) => (
                    <div key={item.stat}>
                      <p className="text-4xl font-semibold text-blue-400 mb-2">{item.stat}</p>
                      <p className="text-sm font-semibold text-white mb-1">{item.label}</p>
                      <p className="text-[12px] text-blue-300">{item.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ════════════════════ SECTION 4: KEY DIFFERENTIATORS ══ */}
          <section id="differentiators" className="py-16 md:py-24 bg-white -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0">
            <div className="w-full max-w-6xl mx-auto">
              <div className="text-center mb-10">
                <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#2366c9] mb-3">In Detail</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 mb-4">
                  What Makes EduMeUp Different — In Detail
                </h2>
                <p className="text-base text-slate-700 max-w-3xl mx-auto">
                  Every feature below is built around one goal: ensuring that every student achieves Cambridge-level mastery, not just Cambridge-level exposure.
                </p>
              </div>

              <div className="space-y-6">
                {differentiators.map((diff, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="group relative"
                  >
                    {/* Header band */}
                    <div className={`${diff.color} text-white rounded-t-[2rem] px-8 py-5 flex items-center gap-4`}>
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <diff.icon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">{diff.title}</h3>
                    </div>
                    {/* Body */}
                    <div className="bg-blue-50/60 rounded-b-[2rem] p-8 border-4 border-white hover:shadow-2xl transition-all duration-300">
                      <p className="text-[14px] text-slate-700 leading-relaxed mb-4 font-medium">{diff.desc}</p>
                      {/* Insight strip */}
                      <div className="border-l-4 border-[#2366c9] bg-white/80 rounded-r-xl p-4">
                        <p className="text-[13px] text-slate-700 leading-relaxed">{diff.popup}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ════════════════════ SECTION 5: COMPARISON TABLE ══ */}
          <section id="comparison-table" className="bg-gradient-to-br from-blue-50/80 via-slate-50 to-blue-50/40 py-16 md:py-24 -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0">
            <div className="w-full max-w-6xl mx-auto">
              <div className="text-center mb-10">
                <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#2366c9] mb-3">An Honest Comparison</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 mb-4">
                  See How EduMeUp Compares
                </h2>
                <p className="text-base text-slate-700 max-w-3xl mx-auto">
                  Not all Cambridge preparation is created equal. Here is an honest comparison across the options available to students and schools today.
                </p>
              </div>

              <div className="overflow-x-auto rounded-[1.5rem] shadow-sm mb-6">
                <table className="w-full min-w-[720px]">
                  <thead>
                    <tr>
                      <th className="p-4 text-left font-semibold text-sm bg-[#1e1b4b] text-white">Feature / Capability</th>
                      <th className="p-4 text-center font-semibold text-sm bg-green-600/80 text-white">EduMeUp ★</th>
                      <th className="p-4 text-center font-semibold text-sm bg-[#2366c9] text-white">Traditional Tutoring</th>
                      <th className="p-4 text-center font-semibold text-sm bg-[#2366c9] text-white">Generic EdTech</th>
                      <th className="p-4 text-center font-semibold text-sm bg-[#2366c9] text-white rounded-tr-[1rem]">Cambridge Prep Franchises</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                        <td className="p-4 border-t border-slate-100 text-[14px] text-slate-700 font-medium">{row[0]}</td>
                        {row.slice(1).map((val, j) => (
                          <td key={j} className={`p-4 border-t border-slate-100 text-center text-xl font-bold ${j === 0 ? "bg-green-50/60" : ""} ${val === "✔" ? "text-green-600" : val === "✘" ? "text-red-400" : "text-amber-500"}`}>
                            {val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[12px] text-slate-500">Legend: ✔ = Yes, fully available | ~ = Partial or limited | ✘ = Not available</p>

              {/* Verdict */}
              <div className="mt-8 border-l-4 border-[#2366c9] bg-white p-6 rounded-r-[1.5rem] shadow-sm">
                <p className="text-[14px] text-slate-700 leading-relaxed font-medium">
                  <strong>Verdict:</strong> EduMeUp combines the breadth and accessibility of generic EdTech + the Cambridge curriculum depth of specialist platforms + the AI power of modern LLMs — and adds what none of them provide: a systematic, research-validated retention methodology, Cambridge examiner-calibrated AI tutoring, automated spaced retrieval, and a complete four-stakeholder ecosystem. This combination is unique in the global EdTech market.
                </p>
              </div>
            </div>
          </section>

          {/* ════════════════════ SECTION 6: FOR SCHOOLS ══ */}
          <section id="schools" className="py-16 md:py-24 bg-white -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0">
            <div className="w-full max-w-6xl mx-auto">
              <div className="relative bg-gradient-to-br from-[#1e1b4b] via-[#2366c9] to-[#4f86e0] rounded-[3rem] p-10 md:p-16 overflow-hidden">
                <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
                <div className="relative z-10 max-w-4xl">
                  <p className="text-[11px] font-black uppercase tracking-[0.28em] text-blue-200 mb-3">A Note for Schools</p>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-6">
                    EduMeUp Is a Partner, Not a Franchise.
                  </h2>
                  <div className="space-y-4 mb-8">
                    <p className="text-base text-blue-50/90 leading-relaxed">
                      Most Cambridge prep solutions charge schools large upfront fees, ongoing royalties, and franchise costs — in exchange for content that schools are left to implement on their own.
                    </p>
                    <p className="text-base text-blue-50/90 leading-relaxed">
                      EduMeUp works differently. We provide schools with a complete, research-backed Cambridge education ecosystem — including curriculum content, teacher training, student diagnostics, parent engagement tools, and ongoing expert support — while schools focus on what they do best: teaching and building communities.
                    </p>
                    <p className="text-base text-blue-50/90 leading-relaxed font-semibold">
                      No franchise model. No hidden costs. No dependency. Just a genuine partnership built for results.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {[
                      { stat: "91%", label: "Pass rate (vs ~35% traditional average)" },
                      { stat: "85%+", label: "Knowledge retention after 90 days" },
                      { stat: "271%", label: "ROI for school partners (validated study)" },
                    ].map((item) => (
                      <div key={item.stat} className="bg-white/10 rounded-2xl p-6 text-center">
                        <p className="text-3xl font-semibold text-blue-300 mb-1">{item.stat}</p>
                        <p className="text-[12px] text-blue-200 font-medium">{item.label}</p>
                      </div>
                    ))}
                  </div>

                  <a href="/for-schools">
                    <button className="border-2 border-white/50 text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-xl text-[14px] flex items-center gap-2 transition-all">
                      Explore Our School Partnership <ArrowRight className="h-4 w-4" />
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* ════════════════════ FINAL CTA ══ */}
          <section id="cta" className="relative bg-gradient-to-br from-[#1e1b4b] via-[#2366c9] to-[#4f86e0] py-20 md:py-32 overflow-hidden">
            <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-blue-600 opacity-30 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-blue-600 opacity-30 blur-3xl" />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-[1.05] mb-3 tracking-tight">
                Ready to Experience the Difference?
              </h2>
              <p className="text-base text-blue-200 mb-12 max-w-3xl mx-auto">
                Join the first Cambridge learning ecosystem built around how students actually learn — and built for results that matter.
              </p>

              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
                <div className="bg-[#2366c9] border-4 border-white/20 rounded-[2rem] p-8 text-left flex flex-col shadow-2xl md:scale-105">
                  <h3 className="text-xl font-semibold text-white mb-2">Start Exploring Courses</h3>
                  <p className="text-blue-200 text-sm font-semibold mb-4">O-Level subjects. Bridge courses. Must-have courses.</p>
                  <p className="text-white/80 text-[14px] leading-relaxed mb-6 flex-1">
                    Explore the full course library — subject courses, bridge courses, and free modules — all built on the 10X Learning Leap Model.
                  </p>
                  <a href="/courses">
                    <button className="w-full bg-white text-[#2366c9] hover:bg-blue-50 font-semibold py-3 rounded-xl text-[14px] flex items-center justify-center gap-2 transition-all">
                      Browse All Courses <ArrowRight className="h-4 w-4" />
                    </button>
                  </a>
                </div>

                <div className="bg-white border-4 border-[#2366c9] rounded-[2rem] p-8 text-left flex flex-col shadow-xl">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Start Your Free Diagnostic</h3>
                  <p className="text-[#2366c9] text-sm font-semibold mb-4">~90 minutes. No credit card required.</p>
                  <p className="text-slate-700 text-[14px] leading-relaxed mb-6 flex-1">
                    Our AI identifies your exact sub-skill gaps and produces a personalised learning plan before spending a single dollar on courses.
                  </p>
                  <a href="/diagnostic">
                    <button className="w-full border-2 border-[#2366c9] text-[#2366c9] hover:bg-[#2366c9] hover:text-white font-semibold py-3 rounded-xl text-[14px] flex items-center justify-center gap-2 transition-all">
                      Start Free Diagnostic <ArrowRight className="h-4 w-4" />
                    </button>
                  </a>
                </div>

                <div className="bg-slate-100 rounded-[2rem] p-8 text-left flex flex-col shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Partner With Us</h3>
                  <p className="text-slate-500 text-sm font-semibold mb-4">30 minutes with a Cambridge expert. No obligation.</p>
                  <p className="text-slate-600 text-[14px] leading-relaxed mb-6 flex-1">
                    Schools, parents, and institutions can book a free consultation to understand how the 8-step system applies to their specific context.
                  </p>
                  <a href="/for-schools">
                    <button className="w-full border-2 border-slate-300 text-slate-700 hover:bg-slate-200 font-semibold py-3 rounded-xl text-[14px] flex items-center justify-center gap-2 transition-all">
                      Explore School Partnership <ArrowRight className="h-4 w-4" />
                    </button>
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-blue-200 font-medium">
                {["🎓 2,000+ Students", "🌍 25+ Countries", "🏛 University-Validated (3 years)", "📊 91% Pass Rate", "🔒 30-Day Money-Back Guarantee", "📞 24/7 Cambridge Expert Support"].map((item, i) => (
                  <span key={i}>{item}</span>
                ))}
              </div>
            </div>
          </section>

          {/* Research strip */}
          <section className="py-10 bg-white border-t border-blue-100">
            <div className="max-w-4xl mx-auto px-4">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">Research Foundation</h3>
              <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs text-slate-500">
                {["NTL Institute Learning Pyramid", "Ebbinghaus (1885/2015)", "Roediger & Karpicke (2006)", "Cepeda et al. (2006)", "Bloom (1984)", "Hattie (2009)", "Freeman et al. (2014)", "Vygotsky (1978)", "Paivio (1971)", "Mayer (2009)"].map((r) => (
                  <span key={r}>{r}</span>
                ))}
              </div>
            </div>
          </section>

        </main>
      </div>
    </Layout>
  );
}