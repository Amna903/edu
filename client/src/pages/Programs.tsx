import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  BookOpen,
  FlaskConical,
  Beaker,
  Dna,
  Languages,
  Calculator,
  Users,
  UserRound,
  GraduationCap,
  Monitor,
  BarChart2,
  Clock,
  Award,
} from "lucide-react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";

/* ── Sidebar anchor links ── */
const sidebarLinks = [
  { label: "What Is This Programme?", href: "#what-is" },
  { label: "Subjects and Topics", href: "#subjects" },
  { label: "The Pathway to O-Level", href: "#pathway" },
  { label: "Self-Learning Track", href: "#self-learning" },
  { label: "Tutor-Guided Sessions", href: "#tutor" },
  { label: "Pricing", href: "#pricing" },
  { label: "Group Discount", href: "#group" },
  { label: "How to Start", href: "#how-to-start" },
  { label: "FAQs", href: "#faqs" },
];

/* ── Subject colour config ── */
const subjectConfig = {
  English: { color: "#2366c9", bg: "#eef6ff", borderColor: "#bfdbfe" },
  Mathematics: { color: "#1a4fa0", bg: "#eef6ff", borderColor: "#bfdbfe" },
  Physics: { color: "#4f86e0", bg: "#f1f7ff", borderColor: "#bfdbfe" },
  Chemistry: { color: "#0369A1", bg: "#f0f9ff", borderColor: "#bae6fd" },
  Biology: { color: "#1e3a8a", bg: "#eef6ff", borderColor: "#bfdbfe" },
};

/* ── Subject topics ── */
const subjects = [
  {
    key: "English",
    icon: Languages,
    cert: "Leads to EduMeUp Pre-O-Level Certification (Phase 2 — after completing the Bridge Course for this subject).",
    grades: {
      "Grade 6": ["Vocabulary building", "Reading comprehension", "Paragraph writing", "Punctuation & grammar"],
      "Grade 7": ["Text types & structures", "Descriptive writing", "Inferring meaning", "Formal & informal tone"],
      "Grade 8": ["Argumentative writing", "Summary techniques", "Directed writing", "Reader response skills"],
    },
  },
  {
    key: "Mathematics",
    icon: Calculator,
    cert: "Leads to EduMeUp Pre-O-Level Certification (Phase 2 — after completing the Bridge Course for this subject).",
    grades: {
      "Grade 6": ["Number & place value", "Fractions & decimals", "Ratio & proportion", "Basic algebra"],
      "Grade 7": ["Linear equations", "Geometry: angles & shapes", "Data handling basics", "Percentages & interest"],
      "Grade 8": ["Simultaneous equations", "Quadratic intro", "Probability", "Mensuration"],
    },
  },
  {
    key: "Physics",
    icon: FlaskConical,
    cert: "Leads to EduMeUp Pre-O-Level Certification (Phase 2 — after completing the Bridge Course for this subject).",
    grades: {
      "Grade 6": ["Measurement & units", "Forces & motion intro", "Light & optics basics", "Heat & temperature"],
      "Grade 7": ["Energy forms & transfer", "Pressure & moments", "Waves — sound", "Electricity basics"],
      "Grade 8": ["Electromagnetism intro", "Speed, velocity, acceleration", "Circuits & resistance", "Thermal physics"],
    },
  },
  {
    key: "Chemistry",
    icon: Beaker,
    cert: "Leads to EduMeUp Pre-O-Level Certification (Phase 2 — after completing the Bridge Course for this subject).",
    grades: {
      "Grade 6": ["Matter & its properties", "Elements & compounds", "Physical vs chemical change", "Mixtures & separation"],
      "Grade 7": ["Atomic structure intro", "The Periodic Table", "Acids, bases & salts intro", "Metals & non-metals"],
      "Grade 8": ["Chemical equations", "Reactivity series", "Oxidation & reduction intro", "Energy in reactions"],
    },
  },
  {
    key: "Biology",
    icon: Dna,
    cert: "Biology is not included in Phase 1 certification. Pre-O-Level Certification for Biology is planned for a later phase.",
    grades: {
      "Grade 6": ["Cell structure & function", "Living & non-living", "Nutrition in plants", "Habitats & ecosystems"],
      "Grade 7": ["Photosynthesis & respiration", "Human digestive system", "Transport in plants", "Reproduction basics"],
      "Grade 8": ["Genetics intro", "Nervous system", "Homeostasis", "Disease & immunity"],
    },
  },
];

/* ── Pathway steps ── */
const pathwaySteps = [
  { step: "STEP 1", title: "Lower Secondary", sub: "Grade 6 → 8 per subject", color: "#2366c9" },
  { step: "STEP 2", title: "Bridge Course", sub: "Pre-O-Level content", color: "#4f86e0" },
  { step: "STEP 3", title: "EduMeUp Certification", sub: "Pre-O-Level Certificate", color: "#1a4fa0" },
  { step: "STEP 4", title: "O-Level", sub: "Cambridge exams", color: "#1e3a8a" },
];

/* ── Self-learning features ── */
const selfLearningFeatures = [
  { icon: BookOpen, text: "A structured interactive lesson (concept explanation + worked examples with visual diagrams)" },
  { icon: Monitor, text: "H5P retrieval practice activities — drag-and-drop, fill-in-the-blank, matching, and short answer" },
  { icon: CheckCircle2, text: "A short topic quiz (10 questions) with instant feedback and answer explanations" },
  { icon: Award, text: "A topic summary card downloadable as PDF for revision" },
];

/* ── Getting started steps ── */
const startingSteps = [
  {
    num: 1,
    title: "Choose Your Subject and Grade Level",
    body: "Select the subject you want to enrol in. Full subject access gives you all Grade 6, 7, and 8 content for that subject in a single enrolment — you study at your current level and move upward at your own pace.",
  },
  {
    num: 2,
    title: "Take the Free AI Diagnostic (Recommended)",
    body: "Before starting, take the free 30-minute AI Diagnostic for your subject. It identifies exactly which Grade 6–8 topics you already know and which have gaps, so you begin from the right place — not the beginning of everything.",
  },
  {
    num: 3,
    title: "Begin Self-Learning",
    body: "Log in to your student dashboard and start working through your selected topics. Each topic includes an interactive lesson, worked examples, retrieval practice activities, and a short topic quiz. You can move between topics freely at any time.",
  },
  {
    num: 4,
    title: "Add Tutor-Guided Sessions (Optional)",
    body: "From your dashboard, book a one-on-one session with an EduMeUp-trained tutor for any topic you find difficult — or join a small group session on a scheduled topic. Tutor sessions are booked separately and can be added at any point.",
  },
  {
    num: 5,
    title: "Track Your Progress",
    body: "Your dashboard shows topic-by-topic completion status, quiz scores, and a cumulative progress indicator for each grade level. Parents have a linked view with the same data.",
  },
  {
    num: 6,
    title: "Advance to the Bridge Course (When Ready)",
    body: "When you have completed the Grade 8 content for a subject and your quiz performance is consistently strong, you are ready to move to the Bridge Course for that subject. The Bridge Course extends your learning to full pre-O-Level standard — and leads to the EduMeUp Pre-O-Level Certification.",
  },
];

/* ── FAQs ── */
const faqs = [
  {
    q: "Do I have to start from Grade 6, or can I join at Grade 7 or Grade 8?",
    a: "You can start at any grade level. Full subject access gives you all Grade 6, 7, and 8 content — you can go directly to Grade 8 topics if that matches your current level, or use the free AI Diagnostic to confirm where to begin.",
  },
  {
    q: "Can I study more than one subject at the same time?",
    a: "Yes. Each subject is enroled separately. You can be active in up to five subjects simultaneously. There is no restriction on how many subjects you study at once.",
  },
  {
    q: "What happens after Grade 8 — is there anything beyond this programme?",
    a: "Yes. When you have completed the Grade 8 content for a subject with strong performance, you are ready to enrol in the EduMeUp Bridge Course for that subject. The Bridge Course takes you to pre-O-Level standard and leads to the EduMeUp Pre-O-Level Certification. It is the natural next step.",
  },
  {
    q: "Does the 20% or 30% concession apply automatically when I renew?",
    a: "Yes. When you renew your enrolment for the same subject in Year 2, the 20% concession is applied automatically at checkout. The 30% concession applies in Year 3 and beyond. No code or application is needed — the system recognises your renewal.",
  },
  {
    q: "How does group enrolment work?",
    a: "One person sets up the group and pays the organiser rate of 65% of the subject price. All other members who join the group pay 80% of the subject price. The organiser sends the group link to others, who complete their own enrolment and payment. All members get full access to the same content.",
  },
  {
    q: "How are tutor sessions booked and paid for?",
    a: "Tutor sessions are booked from your student dashboard under the Tutor Sessions tab. One-on-one and group sessions have separate booking flows. Session fees are displayed at the time of booking. Tutor sessions are charged separately from the annual subject enrolment fee.",
  },
  {
    q: "Are the tutor sessions online or in-person?",
    a: "All EduMeUp tutor sessions are conducted online via a live video session. In-person sessions are not part of this programme.",
  },
  {
    q: "Can a parent monitor what their child is studying?",
    a: "Yes. Parents can create a linked parent account which gives a read-only view of the child's progress dashboard — including topics completed, quiz scores, and tutor session history. No separate fee applies for the parent account.",
  },
  {
    q: "Is Biology included in the EduMeUp Pre-O-Level Certification?",
    a: "In Phase 1, the Pre-O-Level Certification covers English Language, Mathematics, Physics, and Chemistry only. Biology is a full subject in the Lower Secondary programme, but Biology certification is planned for a later phase. Students who complete the Biology Grade 6–8 content can note this on their learning record, but a formal certification exam is not yet available for Biology.",
  },
];

/* ── Subject accordion item ── */
function SubjectAccordion({ subject, defaultOpen }: { subject: typeof subjects[0]; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  const cfg = subjectConfig[subject.key as keyof typeof subjectConfig];
  const Icon = subject.icon;

  return (
    <div
      className="overflow-hidden rounded-2xl border shadow-sm"
      style={{ borderColor: cfg.borderColor }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between p-5 text-left"
        style={{ background: cfg.bg }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: cfg.color + "20" }}
          >
            <Icon className="h-5 w-5" style={{ color: cfg.color }} />
          </div>
          <div>
            <h3 className="text-base font-semibold" style={{ color: cfg.color }}>
              {subject.key} Language{subject.key === "English" ? "" : ""}
              {subject.key !== "English" ? subject.key : "English Language"}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Grade 6, 7 & 8 — Full access in one enrolment</p>
          </div>
        </div>
        {open ? (
          <ChevronDown className="h-5 w-5 shrink-0" style={{ color: cfg.color }} />
        ) : (
          <ChevronRight className="h-5 w-5 shrink-0" style={{ color: cfg.color }} />
        )}
      </button>

      {open && (
        <div className="border-t bg-white p-5" style={{ borderColor: cfg.borderColor }}>
          {/* Certification note */}
          <p className="mb-4 text-xs text-slate-500 italic">{subject.cert}</p>

          {/* Topic grid */}
          <div className="grid gap-4 sm:grid-cols-3">
            {Object.entries(subject.grades).map(([grade, topics]) => (
              <div key={grade}>
                <div
                  className="mb-2 rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white"
                  style={{ background: cfg.color }}
                >
                  {grade}
                </div>
                <ul className="space-y-1.5">
                  {topics.map((t) => (
                    <li key={t} className="flex items-start gap-1.5 text-sm text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: cfg.color }} />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs italic text-slate-400">
            ▸ Full topic list available in-platform after enrolment
          </p>

          <div className="mt-4">
            <a
              href="/enrol"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white"
              style={{ background: cfg.color }}
            >
              Enrol in {subject.key}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── FAQ accordion item ── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="text-sm font-semibold text-slate-900 pr-4">{q}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-[#2366c9] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <p className="pb-4 text-sm leading-relaxed text-slate-600 border-l-4 border-[#2366c9] pl-4">
          {a}
        </p>
      )}
    </div>
  );
}

/* ── MAIN PAGE ── */
export default function LowerSecondary() {
  useEffect(() => {
    const prev = document.title;
    document.title = "Lower Secondary Programme — Grade 6 to 8 | EduMeUp";
    return () => { document.title = prev; };
  }, []);

  return (
    <Layout>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[#1a4fa0] py-16 md:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />
        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-5xl text-center"
          >
            <p className="mb-4 inline-flex rounded-full border border-white/20 px-4 py-1 text-[11px] font-bold uppercase tracking-[0.28em] text-white/70">
              EduMeUp | Grade 6 to Grade 8
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-6xl">
              Build the Foundation That Makes{" "}
              <span className="text-[#38bdf8]">O-Level Possible</span>
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base text-white/75 md:text-lg">
              The EduMeUp Lower Secondary Programme gives Grade 6–8 students topic-by-topic mastery in five core
              subjects — at their own pace, with a trained tutor available whenever they need one.
            </p>

            {/* Trust stats */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {[
                { icon: BookOpen, text: "Five Subjects — English, Maths, Physics, Chemistry, Biology" },
                { icon: GraduationCap, text: "Grade 6, 7, and 8 content — full access in one enrolment" },
                { icon: Award, text: "Leads to EduMeUp Pre-O-Level Certification (4 subjects)" },
              ].map((s) => (
                <div
                  key={s.text}
                  className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white"
                >
                  <s.icon className="h-4 w-4 text-[#38bdf8]" />
                  {s.text}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="/enrol"
                className="inline-flex items-center gap-2 rounded-xl bg-[#2366c9] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1a4fa0]"
              >
                Choose Your Subject
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link href="/diagnostic">
                <span className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:border-white/60">
                  Take Free AI Diagnostic First
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── LAYOUT: sidebar + main ── */}
      <div className="bg-[#f8fbff]">
        <div className="container-custom max-w-7xl py-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">

            {/* LEFT STICKY SIDEBAR */}
            <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
              {/* Quick Enrol Widget */}
              <div className="rounded-xl border border-[#dbe7f4] bg-white p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-900">Enrol in a Subject</h3>
                <div className="mt-3 space-y-1.5">
                  {Object.entries(subjectConfig).map(([subj, cfg]) => (
                    <a
                      key={subj}
                      href="/enrol"
                      className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-white"
                      style={{ background: cfg.color }}
                    >
                      {subj}
                    </a>
                  ))}
                </div>
                <a
                  href="/enrol"
                  className="mt-3 block rounded-lg bg-[#2366c9] px-3 py-2 text-center text-sm font-semibold text-white"
                >
                  ENROL NOW
                </a>
                <p className="mt-2 text-center text-xs text-slate-500">Group enrolment available ↓</p>
              </div>

              {/* Diagnostic widget */}
              <div className="rounded-xl border border-[#dbe7f4] bg-white p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-900">Not Sure Where to Start?</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Take the free 30-minute AI Diagnostic to find your starting topic in any subject.
                </p>
                <a
                  href="/diagnostic"
                  className="mt-3 block rounded-lg bg-[#2366c9] px-3 py-2 text-center text-sm font-semibold text-white"
                >
                  TAKE FREE DIAGNOSTIC
                </a>
              </div>

              {/* Nav links */}
              <div className="rounded-xl border border-[#dbe7f4] bg-white p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-900">Page Navigation</h3>
                <div className="mt-3 space-y-2">
                  {sidebarLinks.map((l) => (
                    <a key={l.href} href={l.href} className="block text-sm text-[#2366c9] hover:underline">
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-[#dbe7f4] bg-white p-4 shadow-sm text-sm text-slate-700">
                View all prices?{" "}
                <a href="/pricing" className="font-semibold text-[#2366c9]">
                  View Pricing Page
                </a>
              </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="space-y-10">

              {/* SECTION 2: What Is This Programme */}
              <section id="what-is" className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm md:p-8">
                <p className="mb-3 inline-flex rounded-full bg-[#2366c9] px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">
                  About This Programme
                </p>
                <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
                  A Structured Foundation — Before O-Level Begins
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
                  Most Grade 6–8 students in Pakistan study from school textbooks with little structure, limited practice, and no
                  way to know which topics they have truly understood and which they have only memorised temporarily. When they
                  arrive at O-Level, the gaps show up immediately — and are much harder to fix.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">
                  The EduMeUp Lower Secondary Programme solves this before it happens. Students build their subject knowledge
                  topic by topic, at their own pace, with immediate feedback on every activity. When they are ready to move to
                  O-Level preparation, they move with a genuine foundation — not a patchy one.
                </p>

                {/* Two ways to learn */}
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-5">
                    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-[#2366c9]">
                      <Monitor className="h-4 w-4" />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900">Self-Learning Track</h3>
                    <p className="mt-1 text-sm text-slate-600">
                      Study independently at your own pace. Available 24/7 from any device. Included in: Annual subject enrolment fee.
                    </p>
                  </div>
                  <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-5">
                    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-[#2366c9]">
                      <UserRound className="h-4 w-4" />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900">Tutor-Guided Track</h3>
                    <p className="mt-1 text-sm text-slate-600">
                      Add a trained EduMeUp tutor for topics you find difficult. Choose one-on-one or group sessions. Charged separately: Per session, booked from your dashboard.
                    </p>
                  </div>
                </div>
              </section>

              {/* SECTION 3: Subjects */}
              <section id="subjects">
                <div className="mb-5">
                  <p className="mb-2 inline-flex rounded-full bg-[#2366c9] px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">
                    Five Subjects
                  </p>
                  <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
                    What Your Child Will Learn — Topic by Topic
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Each subject covers three grade levels — Grade 6, Grade 7, and Grade 8 — in a single full-access enrolment.
                  </p>
                </div>
                <div className="space-y-3">
                  {subjects.map((subject, i) => (
                    <SubjectAccordion key={subject.key} subject={subject} defaultOpen={i === 0} />
                  ))}
                </div>
                <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-slate-700">
                  <strong className="text-[#2366c9]">Important note:</strong> After completing the Grade 8 content for English,
                  Mathematics, Physics, or Chemistry, students are ready to enrol in the corresponding EduMeUp Bridge Course.
                  The Bridge Course is a separate enrolment from the Lower Secondary Programme.
                </div>
              </section>

              {/* SECTION 4: Progression Pathway */}
              <section id="pathway">
                <div className="mb-6">
                  <p className="mb-2 inline-flex rounded-full bg-[#2366c9] px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">
                    The Pathway
                  </p>
                  <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
                    Your Pathway from Grade 6 to O-Level
                  </h2>
                </div>

                {/* Desktop: horizontal arrow flow */}
                <div className="hidden sm:flex items-center gap-0">
                  {pathwaySteps.map((step, i) => (
                    <div key={step.step} className="flex items-center flex-1">
                      <div
                        className="flex-1 rounded-xl p-4 text-white text-center"
                        style={{ background: step.color }}
                      >
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">{step.step}</p>
                        <p className="mt-1 text-sm text-white font-semibold">{step.title}</p>
                        <p className="mt-0.5 text-xs text-white/70">{step.sub}</p>
                      </div>
                      {i < pathwaySteps.length - 1 && (
                        <ArrowRight className="h-5 w-5 shrink-0 text-slate-400 mx-1" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Mobile: vertical */}
                <div className="flex flex-col gap-2 sm:hidden">
                  {pathwaySteps.map((step, i) => (
                    <div key={step.step} className="flex items-start gap-3">
                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                        style={{ background: step.color }}
                      >
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{step.title}</p>
                        <p className="text-xs text-slate-500">{step.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-xs text-slate-500 italic">
                  Pathway note for Biology: Biology Grade 6–8 content is available. As Biology is not included in Phase 1
                  certification, the Biology pathway currently ends at Grade 8 completion.
                </p>
              </section>

              {/* SECTION 5: Self-Learning */}
              <section id="self-learning" className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm md:p-8">
                <p className="mb-3 inline-flex rounded-full bg-[#2366c9] px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">
                  Self-Learning
                </p>
                <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
                  Self-Learning — Study at Your Own Pace, Any Time
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  Every subject enrolment includes full self-learning access for all three grade levels. There are no scheduled
                  sessions, no deadlines, and no requirement to follow a fixed sequence. Students move through topics at a pace
                  that suits them.
                </p>

                <h3 className="mt-5 text-sm font-semibold text-slate-900">What Each Topic Includes</h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {selfLearningFeatures.map((f) => (
                    <div key={f.text} className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/40 p-3">
                      <f.icon className="mt-0.5 h-4 w-4 shrink-0 text-[#2366c9]" />
                      <p className="text-sm text-slate-700">{f.text}</p>
                    </div>
                  ))}
                </div>

                <h3 className="mt-5 text-sm font-semibold text-slate-900">What Full Subject Access Means</h3>
                <div className="mt-3 space-y-2">
                  {[
                    "All Grade 6 topics for the subject — available immediately on enrolment",
                    "All Grade 7 topics for the subject — available immediately on enrolment",
                    "All Grade 8 topics for the subject — available immediately on enrolment",
                    "No locked progression — students can move freely across grade levels and topics",
                    "Dashboard tracks completion status and quiz score for every topic",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2366c9]" />
                      <p className="text-sm text-slate-700">{item}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION 6: Tutor-Guided */}
              <section id="tutor">
                <p className="mb-3 inline-flex rounded-full bg-[#2366c9] px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">
                  Tutor Sessions
                </p>
                <h2 className="mb-5 text-xl font-semibold text-slate-900 md:text-2xl">
                  Add a Tutor — Two Ways to Learn with Expert Support
                </h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="rounded-2xl border border-blue-200 bg-white p-6 shadow-sm"
                    style={{ borderTopWidth: "4px", borderTopColor: "#2366c9" }}>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-[#2366c9]">
                      <UserRound className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900">One-on-One Session</h3>
                    <div className="mt-3 space-y-1.5 text-sm text-slate-600">
                      <p><strong>Format:</strong> Live online session, student and tutor only</p>
                      <p><strong>Duration:</strong> 45 or 60 minutes (chosen at booking)</p>
                      <p><strong>Best for:</strong> Students who want focused personal attention on a specific topic they find difficult</p>
                    </div>
                    <p className="mt-3 text-xs text-slate-400 italic">Price shown at time of booking</p>
                  </div>
                  <div className="rounded-2xl border border-blue-200 bg-white p-6 shadow-sm"
                    style={{ borderTopWidth: "4px", borderTopColor: "#2366c9" }}>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-[#2366c9]">
                      <Users className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900">Small Group Session</h3>
                    <div className="mt-3 space-y-1.5 text-sm text-slate-600">
                      <p><strong>Format:</strong> Live online session, 4–8 students per group, tutor-led</p>
                      <p><strong>Duration:</strong> 60 minutes</p>
                      <p><strong>Best for:</strong> Students who want structured topic revision in a collaborative setting at a lower per-session cost</p>
                    </div>
                    <p className="mt-3 text-xs text-slate-400 italic">Price shown at time of booking</p>
                  </div>
                </div>
              </section>

              {/* SECTION 7: Pricing */}
              <section id="pricing">
                <p className="mb-3 inline-flex rounded-full bg-[#2366c9] px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">
                  Pricing
                </p>
                <h2 className="mb-5 text-xl font-semibold text-slate-900 md:text-2xl">
                  Simple Annual Pricing — Per Subject, Per Year
                </h2>
                <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-md">
                  <table className="w-full min-w-[560px]">
                    <thead>
                      <tr className="bg-[#1a4fa0] text-white text-left">
                        {["Subject", "Year 1 (Full Price)", "Year 2 (20% off)", "Year 3 (30% off)"].map((h) => (
                          <th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-wide">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(subjectConfig).map(([subj, cfg], i) => (
                        <tr key={subj} className={`border-t border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
                          <td className="px-4 py-3 text-sm font-medium" style={{ color: cfg.color }}>{subj}</td>
                          <td className="px-4 py-3 text-sm font-semibold text-slate-900">[PRICE]</td>
                          <td className="px-4 py-3 text-sm font-semibold text-[#2563eb]">[PRICE × 0.80]</td>
                          <td className="px-4 py-3 text-sm font-semibold text-[#1e3a8a]">[PRICE × 0.70]</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-[#1E3A5F]">
                  <strong>CA ACTION REQUIRED:</strong> Insert actual prices before this page goes live. All [PRICE] fields must be filled. Year 2 (20% concession) and Year 3+ (30% concession) are applied automatically at renewal — no code required.
                </div>
              </section>

              {/* SECTION 8: Group Discount */}
              <section id="group">
                <p className="mb-3 inline-flex rounded-full bg-[#2366c9] px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">
                  Group Discount
                </p>
                <h2 className="mb-5 text-xl font-semibold text-slate-900 md:text-2xl">
                  Study with Friends — Group Discount Available
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5"
                    style={{ borderTopWidth: "4px", borderTopColor: "#2366c9" }}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className="rounded-full bg-[#2366c9] px-3 py-1 text-xs font-bold text-white">Group Organiser</span>
                    </div>
                    <p className="text-2xl font-bold text-[#2366c9]">65%</p>
                    <p className="text-sm text-slate-700">of subject price</p>
                    <p className="mt-2 text-sm text-slate-600">Creates the group, shares the group link with others</p>
                  </div>
                  <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5"
                    style={{ borderTopWidth: "4px", borderTopColor: "#2366c9" }}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className="rounded-full bg-[#2366c9] px-3 py-1 text-xs font-bold text-white">Group Members</span>
                    </div>
                    <p className="text-2xl font-bold text-[#2366c9]">80%</p>
                    <p className="text-sm text-slate-700">of subject price</p>
                    <p className="mt-2 text-sm text-slate-600">Use the group link to enrol and pay the member rate</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  {[
                    "The organiser goes to enrolment for the chosen subject and selects 'Create a Group'",
                    "The organiser completes their enrolment and pays 65% of the subject price",
                    "A unique group link is generated and displayed in the organiser's dashboard",
                    "The organiser shares the link with classmates, siblings, or study partners",
                    "Each person who uses the group link enrols at the 80% member rate",
                    "All group members and the organiser have full independent access to the same subject content",
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-700">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2366c9] text-xs font-bold text-white">
                        {i + 1}
                      </span>
                      {step}
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION 9: How to Get Started */}
              <section id="how-to-start">
                <p className="mb-3 inline-flex rounded-full bg-[#2366c9] px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">
                  Getting Started
                </p>
                <h2 className="mb-5 text-xl font-semibold text-slate-900 md:text-2xl">
                  Getting Started — Six Steps
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {startingSteps.map((s) => (
                    <div
                      key={s.num}
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                      style={{ borderTopWidth: "4px", borderTopColor: "#2366c9" }}
                    >
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#2366c9] text-sm font-bold text-white">
                        {s.num}
                      </span>
                      <h3 className="mt-3 text-sm font-semibold text-slate-900">{s.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.body}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION 10: FAQ */}
              <section id="faqs" className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm md:p-8">
                <p className="mb-3 inline-flex rounded-full bg-[#2366c9] px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">
                  FAQs
                </p>
                <h2 className="mb-5 text-xl font-semibold text-slate-900 md:text-2xl">
                  Frequently Asked Questions
                </h2>
                <div>
                  {faqs.map((faq) => (
                    <FaqItem key={faq.q} q={faq.q} a={faq.a} />
                  ))}
                </div>
              </section>

            </main>
          </div>
        </div>
      </div>

      {/* ── BOTTOM CTA BANNER ── */}
      <section className="bg-[#1a4fa0] py-14">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            Give Your Child the Foundation They Need for O-Level
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/70">
            Five subjects. Grades 6 to 8. Learn independently or with a tutor. The choice is yours.
          </p>
          <p className="mt-2 text-xs text-white/50">
            English Language — Mathematics — Physics — Chemistry — Biology
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="/enrol"
              className="inline-flex items-center gap-2 rounded-xl bg-[#2366c9] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1a4fa0]"
            >
              ENROL NOW — CHOOSE YOUR SUBJECT
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link href="/diagnostic">
              <span className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:border-white/60">
                TAKE FREE AI DIAGNOSTIC
              </span>
            </Link>
          </div>
          <p className="mt-4 text-sm text-white/50">
            Want to know more?{" "}
            <a href="/contact" className="underline text-white/70 hover:text-white">
              Talk to us on WhatsApp →
            </a>
          </p>
        </div>
      </section>
    </Layout>
  );
}