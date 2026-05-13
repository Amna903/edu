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
  Award, AlertCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
  English: { color: "#2563eb", bg: "#f8fbff", borderColor: "#e2e8f0" },
  Mathematics: { color: "#1a4fa0", bg: "#f8fbff", borderColor: "#e2e8f0" },
  Physics: { color: "#4f86e0", bg: "#f1f7ff", borderColor: "#e2e8f0" },
  Chemistry: { color: "#0369A1", bg: "#f0f9ff", borderColor: "#bae6fd" },
  Biology: { color: "#1e3a8a", bg: "#f8fbff", borderColor: "#e2e8f0" },
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
  { step: "STEP 1", title: "Lower Secondary", sub: "Grade 6 → 8 per subject", color: "#2563eb" },
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
        className="flex w-full items-center justify-between p-5 text-left transition-colors"
        style={{ background: cfg.bg }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: cfg.color + "15" }}
          >
            <Icon className="h-5 w-5" style={{ color: cfg.color }} />
          </div>
          <div>
            <h3 className="text-base font-bold" style={{ color: cfg.color }}>
              {subject.key === "English" ? "English Language" : `${subject.key} Language`}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">Grade 6, 7 & 8 — Full access in one enrolment</p>
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
          <p className="mb-4 text-xs text-slate-500 italic font-medium">{subject.cert}</p>

          {/* Topic grid */}
          <div className="grid gap-4 sm:grid-cols-3">
            {Object.entries(subject.grades).map(([grade, topics]) => (
              <div key={grade}>
                <div
                  className="mb-2 rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white"
                  style={{ background: cfg.color }}
                >
                  {grade}
                </div>
                <ul className="space-y-1.5">
                  {topics.map((t) => (
                    <li key={t} className="flex items-start gap-1.5 text-sm text-slate-600 font-medium leading-relaxed">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: cfg.color }} />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-4 text-[10px] font-bold italic text-slate-400 uppercase tracking-widest">
            ▸ Full topic list available in-platform after enrolment
          </p>

          <div className="mt-6">
            <a
              href="/enrol"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-95"
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
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-5 text-left group"
      >
        <span className="text-base font-bold text-slate-900 group-hover:text-brand-primary transition-colors pr-6">{q}</span>
        <div className={`p-1.5 rounded-full transition-all ${open ? 'bg-brand-primary text-white rotate-180' : 'bg-slate-100 text-slate-400'}`}>
          <ChevronDown className="h-4 w-4 shrink-0" />
        </div>
      </button>
      {open && (
        <div className="pb-6 animate-in slide-in-from-top-2 duration-300">
          <p className="text-sm leading-relaxed text-slate-600 border-l-4 border-brand-primary pl-6 font-medium">
            {a}
          </p>
        </div>
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
      <section className="relative overflow-hidden bg-brand-navy py-20 md:py-32">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-5xl text-center"
          >
            <p className="mb-6 inline-flex rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-6 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white">
              EduMeUp | Grade 6 to Grade 8
            </p>
            <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl tracking-tighter uppercase mb-8">
              Build the Foundation That Makes <br />
              <span className="text-brand-primary">O-Level Possible</span>
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg text-white/80 font-medium leading-relaxed mb-12">
              The EduMeUp Lower Secondary Programme gives Grade 6–8 students topic-by-topic mastery in five core
              subjects — at their own pace, with a trained tutor available whenever they need one.
            </p>

            {/* Trust stats */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {[
                { icon: BookOpen, text: "Five Core Subjects" },
                { icon: GraduationCap, text: "Full Grade 6-8 Access" },
                { icon: Award, text: "Pre-O-Level Certification" },
              ].map((s) => (
                <div
                  key={s.text}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white backdrop-blur-md"
                >
                  <s.icon className="h-5 w-5 text-brand-primary" />
                  {s.text}
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/enrol"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-2xl bg-brand-primary px-10 py-5 text-base font-bold text-white hover:bg-white hover:text-brand-navy transition-all shadow-xl shadow-brand-primary/20 uppercase tracking-widest"
              >
                Choose Your Subject
                <ArrowRight className="h-5 w-5" />
              </a>
              <Link href="/diagnostic" className="w-full sm:w-auto">
                <span className="w-full inline-flex items-center justify-center gap-3 rounded-2xl border border-white/20 px-10 py-5 text-base font-bold text-white hover:bg-white/5 transition-all uppercase tracking-widest cursor-pointer">
                  Take Free AI Diagnostic
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── LAYOUT: sidebar + main ── */}
      <div className="bg-[#f8fbff] min-h-screen">
        <div className="container-custom max-w-7xl py-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[280px_minmax(0,1fr)]">

            {/* LEFT STICKY SIDEBAR */}
            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              {/* Quick Enrol Widget */}
              <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
                <h3 className="text-xs font-bold text-brand-navy uppercase tracking-widest mb-6">Enrol in a Subject</h3>
                <div className="space-y-2">
                  {Object.entries(subjectConfig).map(([subj, cfg]) => (
                    <a
                      key={subj}
                      href="/enrol"
                      className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
                      style={{ background: cfg.color }}
                    >
                      {subj}
                    </a>
                  ))}
                </div>
                <a
                  href="/enrol"
                  className="mt-6 block rounded-xl bg-brand-navy px-4 py-4 text-center text-[11px] font-bold text-white uppercase tracking-[0.2em] hover:bg-brand-primary transition-colors"
                >
                  ENROL NOW
                </a>
              </div>

              {/* Diagnostic widget */}
              <div className="rounded-[2rem] border border-slate-200 bg-[#f1f7ff] p-8">
                <h3 className="text-xs font-bold text-brand-navy uppercase tracking-widest mb-4 leading-tight">Not Sure Where to Start?</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed mb-6">
                  Take the free 30-minute AI Diagnostic to find your starting topic in any subject.
                </p>
                <a
                  href="/diagnostic"
                  className="block rounded-xl bg-brand-primary px-4 py-4 text-center text-[11px] font-bold text-white uppercase tracking-[0.2em] hover:bg-brand-navy transition-colors shadow-lg shadow-brand-primary/20"
                >
                  START FREE DIAGNOSTIC
                </a>
              </div>

              {/* Nav links */}
              <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
                <h3 className="text-xs font-bold text-brand-navy uppercase tracking-widest mb-6">Page Navigation</h3>
                <div className="space-y-3">
                  {sidebarLinks.map((l) => (
                    <a key={l.href} href={l.href} className="block text-sm text-slate-500 font-bold hover:text-brand-primary transition-colors">
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm text-sm font-bold text-brand-navy border border-slate-100">
                <p className="text-slate-400 uppercase text-[10px] mb-2 tracking-widest">Full List</p>
                <a href="/pricing" className="flex items-center justify-between group">
                  <span>View Pricing</span>
                  <ArrowRight className="h-4 w-4 text-brand-primary group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="space-y-16">

              {/* SECTION 2: What Is This Programme */}
              <section id="what-is" className="rounded-[3rem] border border-slate-200 bg-white p-10 shadow-xl shadow-slate-200/50 md:p-16">
                <Badge className="mb-6 bg-[#eaf2ff] text-brand-primary border-none uppercase tracking-[0.2em] px-4 py-1.5 text-[10px] font-bold">About Programme</Badge>
                <h2 className="text-3xl font-bold text-brand-navy md:text-5xl tracking-tighter uppercase leading-none mb-8">
                  A Structured Foundation — <br />Before O-Level Begins
                </h2>
                <div className="space-y-6 text-base md:text-lg text-slate-600 font-medium leading-relaxed">
                  <p>
                    Most Grade 6–8 students in Pakistan study from school textbooks with little structure, limited practice, and no
                    way to know which topics they have truly understood. When they arrive at O-Level, the gaps show up immediately.
                  </p>
                  <p>
                    The EduMeUp Lower Secondary Programme solves this. Students build mastery topic by topic, at their own pace, with immediate feedback. Move with a genuine foundation.
                  </p>
                </div>

                {/* Two ways to learn */}
                <div className="mt-12 grid gap-6 sm:grid-cols-2">
                  <div className="rounded-3xl border border-slate-100 bg-[#f8fbff] p-8 group hover:border-brand-primary/30 transition-all">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-md text-brand-primary group-hover:scale-110 transition-transform">
                      <Monitor className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-brand-navy mb-3">Self-Learning Track</h3>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">
                      Study independently at your own pace. Available 24/7. Included in: Annual subject enrolment fee.
                    </p>
                  </div>
                  <div className="rounded-3xl border border-slate-100 bg-[#f8fbff] p-8 group hover:border-brand-primary/30 transition-all">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-md text-brand-primary group-hover:scale-110 transition-transform">
                      <UserRound className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-brand-navy mb-3">Tutor-Guided Track</h3>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">
                      Add a trained tutor for difficult topics. Choose 1-on-1 or group sessions. Book separately from your dashboard.
                    </p>
                  </div>
                </div>
              </section>

              {/* SECTION 3: Subjects */}
              <section id="subjects">
                <div className="mb-10">
                  <Badge className="mb-4 bg-slate-100 text-slate-600 border-none uppercase tracking-[0.2em] px-4 py-1.5 text-[10px] font-bold">Curriculum</Badge>
                  <h2 className="text-3xl font-bold text-brand-navy md:text-5xl tracking-tighter uppercase leading-none">
                    What Your Child Will Master
                  </h2>
                  <p className="mt-4 text-lg text-slate-500 font-medium">
                    Grade 6, 7, and 8 — All in one enrolment.
                  </p>
                </div>
                <div className="space-y-4">
                  {subjects.map((subject, i) => (
                    <SubjectAccordion key={subject.key} subject={subject} defaultOpen={i === 0} />
                  ))}
                </div>
                <div className="mt-8 rounded-[2rem] border border-amber-100 bg-amber-50/50 p-8 flex gap-6 items-start">
                  <AlertCircle className="w-8 h-8 text-amber-500 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-sm font-bold text-amber-700 uppercase tracking-widest mb-2">Important Progression Note</h4>
                    <p className="text-sm text-amber-900/70 font-medium leading-relaxed">
                      After completing Grade 8 for English, Maths, Physics, or Chemistry, students are ready for the EduMeUp Bridge Course. 
                      This leads to Pre-O-Level Certification.
                    </p>
                  </div>
                </div>
              </section>

              {/* SECTION 4: Progression Pathway */}
              <section id="pathway" className="py-8">
                <div className="mb-10">
                  <Badge className="mb-4 bg-brand-primary text-white border-none uppercase tracking-[0.2em] px-4 py-1.5 text-[10px] font-bold">The Pathway</Badge>
                  <h2 className="text-3xl font-bold text-brand-navy md:text-5xl tracking-tighter uppercase leading-none">
                    The Success Route
                  </h2>
                </div>

                {/* Desktop: horizontal arrow flow */}
                <div className="hidden sm:flex items-center gap-4">
                  {pathwaySteps.map((step, i) => (
                    <div key={step.step} className="flex items-center flex-1">
                      <div
                        className="flex-1 rounded-[2rem] p-8 text-white text-center shadow-xl shadow-brand-navy/10 group hover:-translate-y-1 transition-transform"
                        style={{ background: step.color }}
                      >
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-2">{step.step}</p>
                        <p className="text-base text-white font-bold uppercase tracking-tight">{step.title}</p>
                        <p className="mt-2 text-xs text-white/70 font-medium">{step.sub}</p>
                      </div>
                      {i < pathwaySteps.length - 1 && (
                        <ChevronRight className="h-6 w-6 shrink-0 text-slate-300" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Mobile: vertical */}
                <div className="flex flex-col gap-4 sm:hidden">
                  {pathwaySteps.map((step, i) => (
                    <div key={step.step} className="flex items-center gap-5 p-6 rounded-3xl border border-slate-100 bg-white">
                      <div
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-bold text-white shadow-lg"
                        style={{ background: step.color }}
                      >
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{step.step}</p>
                        <p className="text-base font-bold text-brand-navy uppercase tracking-tight">{step.title}</p>
                        <p className="text-xs text-slate-500 font-medium">{step.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-8 text-[11px] text-slate-400 italic font-medium uppercase tracking-widest text-center">
                  Biology pathway currently ends at Grade 8 completion.
                </p>
              </section>

              {/* SECTION 5: Self-Learning */}
              <section id="self-learning" className="rounded-[3rem] border border-slate-200 bg-white p-10 shadow-xl shadow-slate-200/50 md:p-16">
                <Badge className="mb-6 bg-slate-100 text-slate-600 border-none uppercase tracking-[0.2em] px-4 py-1.5 text-[10px] font-bold">Independent Study</Badge>
                <h2 className="text-3xl font-bold text-brand-navy md:text-5xl tracking-tighter uppercase leading-none mb-10">
                  Study at Your Own Pace
                </h2>
                
                <div className="grid gap-4 sm:grid-cols-2 mb-12">
                  {selfLearningFeatures.map((f) => (
                    <div key={f.text} className="flex items-start gap-4 rounded-3xl bg-[#f8fbff] p-6 border border-slate-50">
                      <div className="bg-white p-2.5 rounded-xl shadow-sm text-brand-primary">
                        <f.icon className="h-5 w-5" />
                      </div>
                      <p className="text-sm text-slate-600 font-bold leading-relaxed">{f.text}</p>
                    </div>
                  ))}
                </div>

                <h3 className="text-xs font-bold text-brand-navy uppercase tracking-[0.3em] mb-6">Full Access Inclusions</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Grade 6-8 topics available immediately",
                    "No locked progression flow",
                    "Real-time completion tracking",
                    "Quiz performance analytics",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      <p className="text-sm text-brand-navy font-bold">{item}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION 6: Tutor-Guided */}
              <section id="tutor">
                <div className="mb-10">
                  <Badge className="mb-4 bg-brand-primary text-white border-none uppercase tracking-[0.2em] px-4 py-1.5 text-[10px] font-bold">Expert Support</Badge>
                  <h2 className="text-3xl font-bold text-brand-navy md:text-5xl tracking-tighter uppercase leading-none">
                    Two Ways to Learn
                  </h2>
                </div>
                <div className="grid gap-8 sm:grid-cols-2">
                  <div className="rounded-[2.5rem] border border-slate-200 bg-white p-10 shadow-xl shadow-slate-200/50 group hover:-translate-y-2 transition-all">
                    <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eaf2ff] text-brand-primary group-hover:scale-110 transition-transform">
                      <UserRound className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-brand-navy mb-4">1-on-1 Sessions</h3>
                    <div className="space-y-4 text-sm text-slate-600 font-medium">
                      <p className="pb-3 border-b border-slate-50"><strong>Format:</strong> Student and tutor only</p>
                      <p className="pb-3 border-b border-slate-50"><strong>Duration:</strong> 45 or 60 minutes</p>
                      <p><strong>Best for:</strong> Personal attention on difficult topics</p>
                    </div>
                  </div>
                  <div className="rounded-[2.5rem] border border-slate-200 bg-white p-10 shadow-xl shadow-slate-200/50 group hover:-translate-y-2 transition-all">
                    <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eaf2ff] text-brand-primary group-hover:scale-110 transition-transform">
                      <Users className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-brand-navy mb-4">Small Group</h3>
                    <div className="space-y-4 text-sm text-slate-600 font-medium">
                      <p className="pb-3 border-b border-slate-50"><strong>Format:</strong> 4–8 students, tutor-led</p>
                      <p className="pb-3 border-b border-slate-50"><strong>Duration:</strong> 60 minutes</p>
                      <p><strong>Best for:</strong> Structured revision & collaboration</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 7: Pricing */}
              <section id="pricing">
                <Badge className="mb-6 bg-slate-100 text-slate-600 border-none uppercase tracking-[0.2em] px-4 py-1.5 text-[10px] font-bold">Invest in Success</Badge>
                <h2 className="text-3xl font-bold text-brand-navy md:text-5xl tracking-tighter uppercase leading-none mb-10">
                  Simple Annual Pricing
                </h2>
                <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 shadow-2xl bg-white">
                  <table className="w-full min-w-[560px]">
                    <thead>
                      <tr className="bg-brand-navy text-white text-left">
                        {["Subject", "Year 1", "Year 2 (20% off)", "Year 3 (30% off)"].map((h) => (
                          <th key={h} className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-100/50">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {Object.entries(subjectConfig).map(([subj, cfg], i) => (
                        <tr key={subj} className={`hover:bg-slate-50 transition-colors`}>
                          <td className="px-8 py-6 text-base font-bold text-brand-navy">{subj}</td>
                          <td className="px-8 py-6 text-base font-bold text-brand-primary">$120</td>
                          <td className="px-8 py-6 text-base font-bold text-slate-900">$96</td>
                          <td className="px-8 py-6 text-base font-bold text-slate-900">$84</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* SECTION 8: Group Discount */}
              <section id="group" className="rounded-[3rem] border border-brand-primary bg-brand-primary p-10 shadow-2xl shadow-brand-primary/20 md:p-16 text-white relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-[100px] pointer-events-none" />
                <Badge className="mb-8 bg-white/20 text-white border-none uppercase tracking-[0.2em] px-4 py-1.5 text-[10px] font-bold">Group Offers</Badge>
                <h2 className="text-3xl font-bold text-white md:text-5xl tracking-tighter uppercase leading-none mb-12">
                  Study with Friends
                </h2>
                <div className="grid gap-8 sm:grid-cols-2 mb-12 relative z-10">
                  <div className="rounded-3xl bg-white/10 backdrop-blur-md p-10 border border-white/20 group hover:bg-white/20 transition-all">
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] mb-6 text-blue-100">Organiser Rate</h4>
                    <p className="text-6xl font-bold mb-2">65<span className="text-2xl opacity-50">%</span></p>
                    <p className="text-sm font-bold text-blue-100">of subject price</p>
                  </div>
                  <div className="rounded-3xl bg-white/10 backdrop-blur-md p-10 border border-white/20 group hover:bg-white/20 transition-all">
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] mb-6 text-blue-100">Member Rate</h4>
                    <p className="text-6xl font-bold mb-2">80<span className="text-2xl opacity-50">%</span></p>
                    <p className="text-sm font-bold text-blue-100">of subject price</p>
                  </div>
                </div>
                <div className="space-y-3 relative z-10">
                  {[
                    "Organiser selects 'Create a Group' during enrolment",
                    "Organiser pays the 65% reduced rate",
                    "Unique group link is generated for classmates",
                    "Classmates join at the 80% member rate",
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-5 p-5 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-brand-navy text-xs font-bold">
                        {i + 1}
                      </span>
                      {step}
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION 9: How to Get Started */}
              <section id="how-to-start">
                <div className="mb-10">
                  <Badge className="mb-4 bg-slate-100 text-slate-600 border-none uppercase tracking-[0.2em] px-4 py-1.5 text-[10px] font-bold">Implementation</Badge>
                  <h2 className="text-3xl font-bold text-brand-navy md:text-5xl tracking-tighter uppercase leading-none">
                    Six Steps to Start
                  </h2>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {startingSteps.map((s) => (
                    <div
                      key={s.num}
                      className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/30 group hover:border-brand-primary transition-all"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf2ff] text-brand-primary font-bold text-xl mb-6 group-hover:scale-110 transition-transform">
                        {s.num}
                      </div>
                      <h3 className="text-base font-bold text-brand-navy mb-4 uppercase tracking-tight leading-tight">{s.title}</h3>
                      <p className="text-sm leading-relaxed text-slate-600 font-medium">{s.body}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION 10: FAQ */}
              <section id="faqs" className="rounded-[3rem] border border-slate-200 bg-white p-10 shadow-xl shadow-slate-200/50 md:p-16">
                <Badge className="mb-6 bg-slate-100 text-slate-600 border-none uppercase tracking-[0.2em] px-4 py-1.5 text-[10px] font-bold">Questions</Badge>
                <h2 className="text-3xl font-bold text-brand-navy md:text-5xl tracking-tighter uppercase leading-none mb-12">
                  Frequently Asked
                </h2>
                <div className="divide-y divide-slate-100">
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
      <section className="bg-brand-navy py-24 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-brand-primary/10 blur-[120px] pointer-events-none" />
        <div className="container-custom relative z-10 text-center">
          <h2 className="text-3xl font-bold text-white md:text-5xl uppercase tracking-tighter leading-none mb-6">
            Build the Foundation <br />for O-Level Success
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-white/70 font-medium leading-relaxed mb-12">
            Five subjects. Grades 6 to 8. Learn independently or with a tutor. The choice is yours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/enrol"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-2xl bg-brand-primary px-10 py-5 text-base font-bold text-white hover:bg-white hover:text-brand-navy transition-all shadow-xl shadow-brand-primary/20 uppercase tracking-widest"
            >
              ENROL NOW
              <ArrowRight className="h-5 w-5" />
            </a>
            <Link href="/diagnostic" className="w-full sm:w-auto">
              <span className="w-full inline-flex items-center justify-center gap-3 rounded-2xl border border-white/20 px-10 py-5 text-base font-bold text-white hover:bg-white/5 transition-all uppercase tracking-widest cursor-pointer">
                FREE DIAGNOSTIC
              </span>
            </Link>
          </div>
          <p className="mt-12 text-sm font-bold text-white/30 uppercase tracking-[0.3em]">
            Need more info? <a href="/contact" className="text-white/70 hover:text-white transition-colors underline">WhatsApp Us</a>
          </p>
        </div>
      </section>
    </Layout>
  );
}
