import { useEffect } from "react";
import type { ReactNode } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Users,
  Layers,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";

const sidebarLinks = [
  { label: "Why English Matters", href: "#why-english" },
  { label: "The CEFR Pathway", href: "#cefr-pathway" },
  { label: "Vocabulary Mastery (Gr 5-7)", href: "#vocab" },
  { label: "Reading Comprehension RC68", href: "#rc68" },
  { label: "ESL1 (A2)", href: "#esl1" },
  { label: "ESL2 (B1)", href: "#esl2" },
  { label: "O-Level Bridge (B1+ to B2)", href: "#bridge" },
  { label: "Skill Booster", href: "#skill-booster" },
  { label: "O-Level English Courses", href: "#olevel-english" },
  { label: "Get Started", href: "#final-cta" },
];

const cefrLevels = [
  { level: "Gr.5-7", course: "Vocabulary Mastery", desc: "Word recognition to production", color: "#4f86e0", href: "#vocab" },
  { level: "A2", course: "ESL1", desc: "Cambridge A2 Key aligned", color: "#3b82f6", href: "#esl1" },
  { level: "A2 to B1", course: "ESL2", desc: "B1 Preliminary aligned", color: "#2366c9", href: "#esl2" },
  { level: "B1+", course: "Bridge", desc: "O-Level English ready", color: "#1a4fa0", href: "#bridge" },
  { level: "B2", course: "O-Level English", desc: "Paper 1 + Paper 2", color: "#1e3a8a", href: "#olevel-english" },
];

const vocabModules = [
  { num: "M1", title: "Describing the World Around Us", learns: "Adjectives of quality and scale. Antonym pairs. Synonym sets.", relevance: "Builds descriptive vocabulary for Cambridge Paper 2 composition writing.", duration: "55 min" },
  { num: "M2", title: "Thoughts, Feelings, and Actions", learns: "Emotion vocabulary. Verb-noun collocations. Formal vs informal register.", relevance: "Cambridge Paper 2 composition rewards emotional precision and vocabulary variety.", duration: "60 min" },
  { num: "M3", title: "Cause, Effect, and Change", learns: "Academic connectives. Process words. Contrast structures.", relevance: "Cross-subject benefit for Biology, Economics, and English writing.", duration: "55 min" },
  { num: "M4", title: "Confusable Word Pairs", learns: "affect/effect, principal/principle, accept/except and more.", relevance: "These pairs are a common Cambridge mark-loss source.", duration: "50 min" },
  { num: "M5", title: "Describing People, Places, and Events", learns: "Vivid descriptive vocabulary. Show-don't-tell technique. Sensory vocabulary.", relevance: "Directly addresses Cambridge Paper 2 Band 1 vocabulary criteria.", duration: "60 min" },
  { num: "M6", title: "Academic and Formal English", learns: "Formal language toolkit. Hedging. Discourse markers.", relevance: "Paper 1 directed writing marks formal register explicitly.", duration: "55 min" },
  { num: "M7", title: "Retrieval Review and Consolidation", learns: "Active recall across all modules in new contexts.", relevance: "Strengthens long-term retention with structured retrieval.", duration: "50 min" },
];

const rc68Modules = [
  { num: "M1", title: "Animals and Their Adaptations [A2]", learns: "Literal comprehension, vocabulary in context, writer purpose.", duration: "50 min" },
  { num: "M2", title: "Young People and Technology [A2]", learns: "Fact vs opinion, writer attitude, summary in own words.", duration: "50 min" },
  { num: "M3", title: "A Journey Through a City [A2+]", learns: "Inferential comprehension, implied emotion, tone.", duration: "55 min" },
  { num: "M4", title: "Sports and Human Achievement [B1]", learns: "Skimming and scanning, structural cues.", duration: "50 min" },
  { num: "M5", title: "The Natural World Under Pressure [B1]", learns: "Cause-effect relationships, technical vocabulary, summary response.", duration: "60 min" },
  { num: "M6", title: "Culture and Identity [B1]", learns: "Writer perspective, evaluative comprehension, figurative language.", duration: "55 min" },
  { num: "M7", title: "Science and Discovery [B1]", learns: "Claim and evidence reading, AI-evaluated paragraph.", duration: "60 min" },
  { num: "M8", title: "Voices from History [B1+]", learns: "Character inference, context, extended written response.", duration: "60 min" },
  { num: "M9", title: "The Future of Education [B1+]", learns: "Persuasive techniques, argument evaluation, counter-argument writing.", duration: "65 min" },
  { num: "M10", title: "Consolidation and Reading Profile [B1+]", learns: "Full unseen passage, integrated comprehension skills, timed challenge.", duration: "70 min" },
];

const comprehensionCourses = [
  { code: "C1", title: "Comprehension Mastery - Course 1", focus: "9-step system on Cambridge past paper set 1.", duration: "~90 min" },
  { code: "C2", title: "Comprehension Mastery - Course 2", focus: "In-own-words paraphrasing and B2 skimming/scanning.", duration: "~90 min" },
  { code: "C3", title: "Comprehension Mastery - Course 3", focus: "Inference and implied meaning at AO3 level.", duration: "~90 min" },
  { code: "C4", title: "Comprehension Mastery - Course 4", focus: "Summary responses and structured 15-mark tasks.", duration: "~90 min" },
  { code: "C5", title: "Comprehension Mastery - Course 5", focus: "Recent paper set simulation under timed conditions.", duration: "~90 min" },
];

const compositionCourses = [
  { code: "F1", title: "Essay Types and Structure", focus: "All 4 Cambridge essay types and core structures.", duration: "~4 hours" },
  { code: "F2", title: "10-Day Band 3 to Band 1 Bridge", focus: "10-day intensive with model essays and review.", duration: "10 sessions (~1 hr each)" },
  { code: "F3", title: "Complete Mastery - Band 3 to Band 1", focus: "Portfolio, timed essays, and complete transformation pathway.", duration: "~12 hours" },
];

const directedWritingCourses = [
  { code: "DW1", title: "Directed Writing Part 1", focus: "All non-letter formats including 2024 format changes.", modules: "9 modules (~7 hours)" },
  { code: "DW2", title: "Directed Writing Part 2", focus: "All letter/application formats and integrated mock exam.", modules: "7 modules (~6 hours)" },
];

const trustSignals = [
  "2,000+ Students",
  "25+ Countries",
  "All 10 O-Level English Courses Available",
  "CEFR Aligned A2 to B2",
  "AI-Evaluated Written Tasks",
  "Certificate on Completion",
];

function CardRow<T extends { code?: string; num?: string; title: string; focus?: string; learns?: string; relevance?: string; duration?: string; modules?: string }>({
  items,
  accentColor,
}: {
  items: T[];
  accentColor: string;
}) {
  return (
    <div className="overflow-x-auto pb-3">
      <div className="flex gap-4" style={{ minWidth: "max-content" }}>
        {items.map((item) => (
          <div
            key={item.code ?? item.num ?? item.title}
            className="w-[220px] shrink-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            style={{ borderTopWidth: "4px", borderTopColor: accentColor }}
          >
            <span
              className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold text-white"
              style={{ background: accentColor }}
            >
              {item.code ?? item.num}
            </span>
            <h4 className="mt-2 text-sm font-semibold text-slate-900 leading-snug">{item.title}</h4>
            <p className="mt-2 text-xs leading-relaxed text-slate-600 line-clamp-4">
              {item.focus ?? item.learns}
            </p>
            {item.relevance && (
              <p className="mt-2 text-xs italic text-brand-primary line-clamp-2">{item.relevance}</p>
            )}
            <div className="mt-3 flex items-center gap-1 text-xs text-slate-400">
              <Clock className="h-3 w-3" />
              {item.duration ?? item.modules}
            </div>
            <div className="mt-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-brand-primary">
                <CheckCircle2 className="h-3 w-3" /> Available
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CourseSection({
  id,
  badge,
  cefr,
  moduleCount,
  title,
  description,
  whoFor,
  includes,
  pathway,
  accentColor,
  bgColor,
  children,
}: {
  id: string;
  badge: string;
  cefr?: string;
  moduleCount?: string;
  title: string;
  description: string;
  whoFor: string;
  includes: string;
  pathway: string;
  accentColor: string;
  bgColor: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="py-12 md:py-16" style={{ background: bgColor }}>
      <div className="container-custom">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 rounded-2xl p-6" style={{ background: accentColor }}>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-white/70">{badge}</span>
              {cefr && (
                <span className="rounded-full bg-white/20 px-3 py-0.5 text-xs font-semibold text-white">
                  CEFR: {cefr}
                </span>
              )}
              {moduleCount && (
                <span className="rounded-full bg-white/20 px-3 py-0.5 text-xs font-semibold text-white">
                  {moduleCount}
                </span>
              )}
            </div>
            <h2 className="text-xl font-semibold text-white md:text-2xl">{title}</h2>
          </div>

          <p className="mb-5 text-sm leading-relaxed text-slate-700 md:text-base">{description}</p>

          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Who it is for", text: whoFor, icon: Users },
              { label: "What is included", text: includes, icon: Layers },
              { label: "Pathway note", text: pathway, icon: ChevronRight },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: accentColor }}>
                  {item.label}
                </p>
                <p className="text-xs leading-relaxed text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>

          {children}
        </div>
      </div>
    </section>
  );
}

function DiagnosticStrip({ headline, sub }: { headline: string; sub: string }) {
  return (
    <section className="bg-brand-primary py-10">
      <div className="container-custom text-center">
        <h3 className="text-lg font-semibold text-white">{headline}</h3>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-white/75">{sub}</p>
        <Link href="/diagnostics">
          <span className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-2.5 text-sm font-semibold text-brand-primary hover:bg-[#eef6ff]">
            Take the Free English Diagnostic
            <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      </div>
    </section>
  );
}

export default function BridgeEnglishPage() {
  useEffect(() => {
    const prev = document.title;
    document.title = "All English Courses - Complete Cambridge Learning Pathway | EduMeUp";
    return () => { document.title = prev; };
  }, []);

  return (
    <Layout>
      <section className="relative overflow-hidden bg-gradient-to-r from-[#0b1e3a] to-[#1a3a5c] py-16 md:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="container-custom relative">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="mb-4 inline-flex rounded-full border border-white/20 px-4 py-1 text-sm-small font-bold uppercase tracking-[0.28em] text-white/70">
                All English Courses - The Complete Learning Pathway
              </p>
              <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
                From First Words to <span className="text-[#93c5fd]">Cambridge Excellence.</span>
                <br />Every Stage. Every Skill. One Pathway.
              </h1>
              <p className="mt-5 text-base text-white/75">
                EduMeUp's English programme is a complete Cambridge-aligned pathway from Grade 5-7 vocabulary
                through Cambridge O-Level Paper 1 and Paper 2 mastery. One free diagnostic tells you where to begin.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/diagnostics">
                  <span className="inline-flex flex-col items-center rounded-xl bg-brand-primary px-6 py-3 text-sm font-semibold text-white hover:bg-brand-primary-dark">
                    Take the Free Diagnostic - Find Your English Level
                    <span className="mt-0.5 text-xs font-normal text-white/70">Free | 30 minutes | Personalised recommendation</span>
                  </span>
                </Link>
                <a href="#english-pathway" className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:border-white/60">
                  Browse All English Courses
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="hidden lg:block"
            >
              <svg viewBox="0 0 340 280" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm ml-auto">
                {[
                  { x: 20, y: 220, w: 290, h: 40, label: "A2 - ESL1", color: "#4f86e0" },
                  { x: 60, y: 170, w: 250, h: 40, label: "A2 to B1 - ESL2", color: "#3b82f6" },
                  { x: 100, y: 120, w: 210, h: 40, label: "B1+ - Bridge", color: "#2366c9" },
                  { x: 140, y: 70, w: 170, h: 40, label: "B2 - O-Level English", color: "#1a4fa0" },
                ].map((s) => (
                  <g key={s.label}>
                    <rect x={s.x} y={s.y} width={s.w} height={s.h} rx={8} fill={s.color} />
                    <text x={s.x + s.w / 2} y={s.y + 25} textAnchor="middle" fill="white" fontSize={12} fontWeight="600">{s.label}</text>
                  </g>
                ))}
                <text x="250" y="55" fontSize="28" textAnchor="middle">🎓</text>
                <text x="35" y="275" fill="rgba(255,255,255,0.5)" fontSize="11">Gr.5-7 Vocabulary</text>
              </svg>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="bg-slate-50" id="english-pathway">
        <div className="container-custom max-w-7xl py-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
            <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
              <div className="rounded-xl border border-[#dbe7f4] bg-white p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-900">Page Navigation</h3>
                <div className="mt-3 space-y-2">
                  {sidebarLinks.map((l) => (
                    <a key={l.href} href={l.href} className="block text-sm text-brand-primary hover:underline">{l.label}</a>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-[#dbe7f4] bg-white p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-900">Not sure where to start?</h3>
                <p className="mt-2 text-sm text-slate-600">Take the free diagnostic to get your course start point.</p>
                <Link href="/diagnostics">
                  <span className="mt-3 block rounded-lg bg-brand-primary px-3 py-2 text-center text-sm font-semibold text-white hover:bg-brand-primary-dark">TAKE FREE DIAGNOSTIC</span>
                </Link>
              </div>
            </aside>

            <main className="space-y-10">
              <section id="why-english" className="rounded-2xl border border-blue-200 bg-white p-6 shadow-sm md:p-8">
                <p className="mb-3 inline-flex rounded-full bg-brand-primary px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">Why English Proficiency Affects Every Subject</p>
                <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">English is the medium of every O-Level subject.</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">Cambridge O-Level exams are in English across subjects. Strong English proficiency improves performance in every paper.</p>
              </section>

              <section id="cefr-pathway">
                <p className="mb-3 inline-flex rounded-full bg-brand-primary px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">The EduMeUp English Learning Pathway</p>
                <h2 className="mb-2 text-xl font-semibold text-slate-900 md:text-2xl">Eight Courses. One Continuous Pathway.</h2>
                <div className="overflow-x-auto pb-2">
                  <div className="flex min-w-[600px] items-stretch gap-1">
                    {cefrLevels.map((lvl, i) => (
                      <div key={lvl.level} className="flex items-center flex-1 gap-1">
                        <a href={lvl.href} className="flex-1 rounded-xl p-3 text-center text-white hover:opacity-90 transition-opacity" style={{ background: lvl.color }}>
                          <p className="text-lg text-white font-bold">{lvl.level}</p>
                          <p className="text-xs text-white font-semibold mt-0.5">{lvl.course}</p>
                          <p className="text-[10px] text-white/70 mt-0.5">{lvl.desc}</p>
                        </a>
                        {i < cefrLevels.length - 1 && <ArrowRight className="h-4 w-4 shrink-0 text-slate-400" />}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>

      <DiagnosticStrip headline="Not sure which level you are at?" sub="Free 30-minute diagnostic with personalised recommendation." />

      <CourseSection
        id="vocab"
        badge="MH2 | 7 Modules"
        cefr="Gr.5-7"
        title="Grade 5-7 English Vocabulary Mastery"
        description="Structured vocabulary mastery from passive recognition to active use."
        whoFor="Grades 5-7 students and learners preparing for ESL1."
        includes="7 interactive modules, retrieval tasks, and completion certificate."
        pathway="Prepares students for RC68 and ESL1."
        accentColor="#2366c9"
        bgColor="#eef6ff"
      >
        <CardRow items={vocabModules} accentColor="#2366c9" />
      </CourseSection>

      <CourseSection
        id="rc68"
        badge="MH3 | RC68"
        cefr="A2 to B1+"
        title="Reading Comprehension - Grade 6-8 (RC68)"
        description="10-module comprehension pathway from literal reading to evaluative analysis."
        whoFor="Grade 6-8 learners building reading performance for Cambridge pathways."
        includes="Dual track, AI-evaluated writing, and completion certificate."
        pathway="Feeds directly into O-Level English comprehension courses."
        accentColor="#2366c9"
        bgColor="#ffffff"
      >
        <CardRow items={rc68Modules} accentColor="#2366c9" />
      </CourseSection>

      <CourseSection
        id="esl1"
        badge="MH4 | ESL1"
        cefr="A2 to B1"
        title="ESL1 - EduMeUp English A2"
        description="A2 learners progress to B1 threshold through interactive modules."
        whoFor="Students at A2 level and English-medium transition learners."
        includes="Interactive modules, AI writing feedback, and certificate."
        pathway="Entry into ESL2 at 80%+ exit readiness."
        accentColor="#2366c9"
        bgColor="#eef6ff"
      >
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-slate-700">All modules available now.</div>
      </CourseSection>

      <CourseSection
        id="esl2"
        badge="MH5 | ESL2"
        cefr="B1 to B1+"
        title="ESL2 - EduMeUp English B1"
        description="B1 development into upper B1 and B1+ readiness for bridge-level English."
        whoFor="Students at B1 level and ESL1 completers."
        includes="Extended writing, Cambridge-style reading tasks, and certificate."
        pathway="Prepares students for O-Level English Bridge."
        accentColor="#2366c9"
        bgColor="#ffffff"
      >
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-slate-700">All modules available now.</div>
      </CourseSection>

      <CourseSection
        id="bridge"
        badge="MH6 | O-Level Bridge"
        cefr="B1+ to B2"
        title="O-Level English Bridge"
        description="Final transition from B1+ to B2 readiness for Cambridge O-Level English performance."
        whoFor="Students within 1-2 years of O-Level English examinations."
        includes="B2-level reading/writing tasks and AI-assessed extended writing."
        pathway="Feeds into Comprehension, Composition, and Directed Writing groups."
        accentColor="#1a4fa0"
        bgColor="#eef6ff"
      >
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-slate-700">All modules available now.</div>
      </CourseSection>

      <DiagnosticStrip headline="Starting directly at O-Level?" sub="The diagnostic also gives O-Level English entry recommendations." />

      <section id="skill-booster" className="bg-[#eef6ff] py-12">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl">
            <span className="rounded-full bg-brand-primary px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">Skill Booster</span>
            <h2 className="mt-4 text-xl font-semibold text-slate-900 md:text-2xl">Classroom English Communication (Student Edition)</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">Academic communication skills for classroom participation and exam readiness.</p>
          </div>
        </div>
      </section>

      <section id="olevel-english" className="bg-[#1e2a4a] py-14 md:py-20">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 inline-flex rounded-full bg-[#1a4fa0] px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">O-Level English</p>
            <h2 className="text-2xl font-semibold text-white md:text-3xl">10 Courses. Both Cambridge Papers.</h2>

            <div className="mt-8">
              <div className="mb-3 flex items-center gap-3">
                <h3 className="text-lg font-semibold text-white">Paper 1 - Comprehension Mastery</h3>
                <span className="rounded-full bg-[#1a4fa0] px-3 py-0.5 text-xs font-semibold text-white">5 courses</span>
              </div>
              <CardRow items={comprehensionCourses} accentColor="#1a4fa0" />
            </div>

            <div className="mt-8">
              <div className="mb-3 flex items-center gap-3">
                <h3 className="text-lg font-semibold text-white">Paper 2 - Composition Mastery</h3>
                <span className="rounded-full bg-[#1a4fa0] px-3 py-0.5 text-xs font-semibold text-white">3 courses</span>
              </div>
              <CardRow items={compositionCourses} accentColor="#1a4fa0" />
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-white">Paper 1 - Directed Writing</h3>
              <CardRow items={directedWritingCourses} accentColor="#1a4fa0" />
            </div>
          </div>
        </div>
      </section>

      <section id="final-cta" className="bg-[#0b1e3a] py-14 md:py-20">
        <div className="container-custom">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">Your English Level Determines Your Cambridge Ceiling.</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-white/70">Take the free diagnostic and get your personal pathway.</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {[
              {
                title: "Take the Free English Diagnostic",
                sub: "30 minutes | Free | Personalised recommendation",
                body: "AI assesses vocabulary, reading, and proficiency with instant recommendations.",
                btn: "Start Free Diagnostic",
                href: "/diagnostics",
                primary: true,
              },
              {
                title: "Ready for O-Level Subject Courses?",
                sub: "Build on strong English foundations.",
                body: "Explore full O-Level subject pathways with chapter-level progression.",
                btn: "Browse O-Level Subject Courses",
                href: "/programs/complete-o-level",
                primary: false,
              },
              {
                title: "English Pathway for Your School",
                sub: "Whole-cohort pathway support.",
                body: "School plans with analytics and training support.",
                btn: "School Partnership Details",
                href: "/for-schools",
                primary: false,
              },
            ].map((card) => (
              <div key={card.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-base font-semibold text-white">{card.title}</h3>
                <p className="mt-1 text-xs text-white/50">{card.sub}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{card.body}</p>
                <a
                  href={card.href}
                  className={`mt-4 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold ${card.primary ? "bg-brand-primary text-white hover:bg-brand-primary-dark" : "border border-white/30 text-white hover:border-white/60"}`}
                >
                  {card.btn}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {trustSignals.map((s) => (
              <span key={s} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/70">{s}</span>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
