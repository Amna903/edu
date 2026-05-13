import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";


const courses = [
  {
    id: "MH-VOC",
    code: "MH-VOC",
    badge: "Grade 5–7",
    badgeColor: "#4f86e0",
    badgeBg: "#eef6ff",
    borderColor: "#4f86e0",
    title: "Vocabulary Mastery — Grade 5 to 7",
    description:
      "A 7-module systematic vocabulary acquisition course for students at Grade 5 to 7 level. Each module builds vocabulary through dual coding — word meanings paired with visual context, antonyms, and contextual sentences. Spaced retrieval practice locks every word into long-term memory. Builds the vocabulary base needed for reading comprehension, ESL1 entry, and academic English. AI Tutor support included.",
    bullets: [
      "Read and understand a range of text types with confidence — from stories to informational articles",
      "Write structured paragraphs with correct grammar, punctuation and coherence at Grade 8 level",
      "Build the vocabulary and reading skills needed to begin ESL1 or the O-Level Bridge directly",
      "Receive targeted gap analysis through the AI Diagnostic before starting",
    ],
    leadsTo: "LS-ENG or ESL1",
    anchor: "mh-voc",
  },
  {
    id: "MH-RC",
    code: "MH-RC",
    badge: "Grade 6–8",
    badgeColor: "#4f86e0",
    badgeBg: "#eef6ff",
    borderColor: "#4f86e0",
    title: "Reading Comprehension — Grade 6 to 8",
    description:
      "A progressive reading comprehension course from Grade 6 through to Grade 8 level. Develops literal, inferential and evaluative reading skills — the three question types Cambridge English examiners test. Moves from basic text understanding at Grade 6 through to analytical reading and response at Grade 8. Builds the reading foundation required for ESL1, ESL2 and O-Level English Paper 1.",
    bullets: [
      "Read and understand a range of text types with confidence — from stories to informational articles",
      "Write structured paragraphs with correct grammar, punctuation and coherence at Grade 8 level",
      "Build the vocabulary and reading skills needed to begin ESL1 or the O-Level Bridge directly",
      "Receive targeted gap analysis through the AI Diagnostic before starting",
    ],
    leadsTo: "LS-ENG or ESL1",
    anchor: "mh-rc",
  },
  {
    id: "E-ESL1",
    code: "E-ESL1",
    badge: "CEFR A2",
    badgeColor: "#4f86e0",
    badgeBg: "#eef6ff",
    borderColor: "#4f86e0",
    title: "ESL1 — A2 Foundation English",
    description:
      "Structured English for learners at A2 CEFR level. Basic grammar, sentence structure, vocabulary in context, simple reading comprehension and short writing tasks. Entry-level course in the EduMeUp English Pathway.",
    bullets: [
      "Communicate in English at A2 level with basic fluency in reading, writing and comprehension",
      "Use correct basic grammar structures including simple and compound sentences",
      "Build a working vocabulary of 500+ high-frequency academic and everyday English words",
      "Progress to ESL2 with a solid grammatical and vocabulary foundation",
    ],
    leadsTo: "ESL2",
    anchor: "esl1",
  },
  {
    id: "E-ESL2",
    code: "E-ESL2",
    badge: "CEFR B1",
    badgeColor: "#2366c9",
    badgeBg: "#eef6ff",
    borderColor: "#2366c9",
    title: "ESL2 — B1 Intermediate English",
    description:
      "Intermediate English at B1 CEFR level. Reading comprehension, paragraph and short essay writing, grammar consolidation and academic vocabulary development.",
    bullets: [
      "Read and respond to B1-level texts — news articles, short stories and informational writing",
      "Write a structured paragraph and a short essay with a clear argument and supporting evidence",
      "Use a range of grammatical structures accurately including complex sentences and connectors",
      "Progress to O-Level English Bridge with confidence at B1 CEFR level",
    ],
    leadsTo: "O-Level English Bridge",
    anchor: "esl2",
  },
  {
    id: "E-BRG",
    code: "E-BRG",
    badge: "B1+–B2",
    badgeColor: "#1a4fa0",
    badgeBg: "#eef6ff",
    borderColor: "#1a4fa0",
    title: "O-Level English Bridge (B1+→B2)",
    description:
      "Pre-O-Level English consolidation — directed writing, summary writing, essay structure and unseen comprehension at CEFR B1+ to B2. The final step before O-Level English. Pre-O-Level Certification exam included.",
    bullets: [
      "Write directed text in three different formats — letter, report and article — to Cambridge standard",
      "Write a summary of an unseen text identifying the main points accurately",
      "Achieve B2 CEFR reading comprehension level required for O-Level English Paper 1",
      "Sit the EduMeUp Pre-O-Level Certification Exam in English and earn your readiness certificate",
    ],
    leadsTo: "O-Level English Language",
    anchor: "bridge",
  },
  {
    id: "E-ENG",
    code: "E-ENG",
    badge: "O-Level 1123",
    badgeColor: "#1e3a5f",
    badgeBg: "#eef6ff",
    borderColor: "#1e3a5f",
    title: "O-Level English Language (1123/0500)",
    description:
      "Complete Cambridge O-Level English Language preparation. Paper 1 reading and directed writing, Paper 2 writing and summary. All assessment objectives covered with exam-standard feedback on every activity.",
    bullets: [
      "Answer all question types on Cambridge O-Level English Language Paper 1 and Paper 2",
      "Write directed text to the AO1 and AO2 standards Cambridge examiners apply when marking",
      "Produce a summary of a reading passage identifying all main points at mark-scheme depth",
      "Write an extended composition — narrative, argumentative or descriptive — to Band 1 standard",
    ],
    leadsTo: null,
    anchor: "o-level-english",
  },
  {
    id: "E-ENG-COMP",
    code: "E-ENG-COMP",
    badge: "Comprehension Mastery",
    badgeColor: "#2366c9",
    badgeBg: "#eef6ff",
    borderColor: "#2366c9",
    title: "O-Level English (1123/0500) Comprehension Mastery — 5 Latest Cambridge Past Papers",
    description:
      "Passage-by-passage course built from the 5 most recent Cambridge past papers. Each module includes: vocabulary preview, skimming and scanning tasks, MCQs with examiner justifications, official Cambridge questions with graded model answers (Literal, Inferential, Evaluative), exam technique tips, and a Band 1 Challenge Corner. Supported by AI Tutor. Certificate on completion.",
    bullets: [
      "Work through the 5 most recent Cambridge O-Level English past papers passage by passage",
      "Answer all question types with examiner-level justification — Literal, Inferential and Evaluative",
      "Apply skimming, scanning and vocabulary preview strategies systematically across all 5 papers",
      "Complete the series and earn a certificate — applicable to Cambridge O-Level 1123 and IGCSE 0500",
    ],
    leadsTo: null,
    anchor: "comprehension-mastery",
  },
  {
    id: "E-EW1",
    code: "E-EW1",
    badge: "Essay Writing",
    badgeColor: "#4f86e0",
    badgeBg: "#eef6ff",
    borderColor: "#4f86e0",
    title: "Essay Writing Foundation: Types and Structure",
    description:
      "All four essay types explained with deep focus on the three that appear in O-Level. Covers the Story Mountain framework and the Show Don't Tell technique. The essential starting point before any extended writing course.",
    bullets: [
      "Identify the four essay types and know which three appear in Cambridge O-Level",
      "Structure any essay using the Story Mountain framework with a clear opening, build and resolution",
      "Apply the Show Don't Tell technique to produce writing that earns examiner credit at AO2",
      "Have a clear foundation to build on before beginning the Band 3 to Band 1 Bridge Programme",
    ],
    leadsTo: "E-EW2 or E-EW3",
    anchor: "ew1",
  },
  {
    id: "E-EW2",
    code: "E-EW2",
    badge: "10-Day Bridge",
    badgeColor: "#2366c9",
    badgeBg: "#eef6ff",
    borderColor: "#2366c9",
    title: "Band 3 to Band 1 Bridge Programme (10 Days)",
    description:
      "A focused 10-day writing intensive. Each day covers Narrative, Argumentative or Descriptive writing with a daily vocabulary session, a model essay, spiral review and a real O-Level past paper application.",
    bullets: [
      "Write Narrative, Argumentative and Descriptive essays that meet Band 1 Cambridge criteria",
      "Build a bank of 60+ high-value vocabulary words drawn directly from O-Level past papers",
      "Complete 10 model essay analyses — understanding exactly what the examiner rewards in each",
      "Apply skills to real O-Level past paper prompts at the end of every session",
    ],
    leadsTo: "E-EW3 or O-Level English",
    anchor: "ew2",
  },
  {
    id: "E-EW3",
    code: "E-EW3",
    badge: "Complete Mastery",
    badgeColor: "#1a4fa0",
    badgeBg: "#eef6ff",
    borderColor: "#1a4fa0",
    title: "Cambridge Composition Complete Mastery Course",
    description:
      "The most comprehensive O-Level English writing course on EduMeUp. Side-by-side sentence comparisons show what separates Band 3 from Band 1 — then scaffold students to write at Band 1 level. 120+ H5P activities, 30+ O-Level prompts, 4 timed essays, official Band 1 rubric, 60+ vocabulary words from O-Level past papers, AI Tutor support, writing portfolio and certificate on completion.",
    bullets: [
      "Write at Band 1 level on any O-Level English composition prompt through guided progressive practice",
      "Understand exactly what separates a Band 3 and Band 1 essay through side-by-side sentence comparisons",
      "Complete 4 full timed essays under real exam conditions and receive AI-scored feedback",
      "Track your writing growth from your first essay to your final through a structured portfolio, and receive a certificate on completion",
    ],
    leadsTo: null,
    anchor: "ew3",
  },
  {
    id: "E-DW1",
    code: "E-DW1",
    badge: "Directed Writing",
    badgeColor: "#2366c9",
    badgeBg: "#eef6ff",
    borderColor: "#2366c9",
    title: "Directed Writing — Part 1",
    description:
      "Intensive directed writing skills — identifying format requirements, adapting register, organising content to Cambridge mark scheme standard.",
    bullets: [
      "Identify the format requirements for any directed writing task — letter, email, article, speech or report",
      "Adapt register and tone appropriately for the audience and purpose specified in the question",
      "Organise directed writing content to the structure that Cambridge mark schemes reward",
      "Demonstrate AO-standard language use in formal and semi-formal directed writing responses",
    ],
    leadsTo: "E-DW2",
    anchor: "dw1",
  },
  {
    id: "E-DW2",
    code: "E-DW2",
    badge: "Directed Writing",
    badgeColor: "#1a4fa0",
    badgeBg: "#eef6ff",
    borderColor: "#1a4fa0",
    title: "Directed Writing — Part 2",
    description:
      "Advanced directed writing — complex text types, extended argument development, timed practice with AO-standard feedback.",
    bullets: [
      "Write extended directed writing responses for complex multi-purpose questions with confidence",
      "Develop sophisticated argument and persuasion within a constrained format — letter, speech or article",
      "Complete timed directed writing practice with AO-standard AI feedback on each response",
      "Achieve the directed writing standard required for Cambridge O-Level English Language Paper 1",
    ],
    leadsTo: null,
    anchor: "dw2",
  },
];

const pathwaySteps = [
  { label: "Grade 6–8 Foundation", sub: "CEFR: Pre-A2 to A1", color: "#4f86e0", anchor: "mh-voc" },
  { label: "ESL1 — A2 Foundation", sub: "CEFR: A2", color: "#4f86e0", anchor: "esl1" },
  { label: "ESL2 — B1 Intermediate", sub: "CEFR: B1", color: "#2366c9", anchor: "esl2" },
  { label: "O-Level English Bridge", sub: "CEFR: B1+ to B2", color: "#1a4fa0", anchor: "bridge" },
  { label: "O-Level English Language", sub: "Cambridge Exam Ready", color: "#1e3a5f", anchor: "o-level-english", star: true },
];

function CourseSection({ course }: { course: any }) {
  return (
    <section
      id={course.anchor}
      className="py-12 px-6 md:px-10"
      style={{
        borderLeft: `5px solid ${course.borderColor}`,
        background: "white",
        marginBottom: "2px",
      }}
    >
      <div className="max-w-3xl">
        <span
          className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase mb-3"
          style={{
            background: course.badgeBg,
            color: course.badgeColor,
            letterSpacing: "0.08em",
          }}
        >
          {course.badge}
        </span>

        <h2 className="mb-3 font-bold text-[clamp(1.2rem,2.5vw,1.5rem)] text-brand-navy leading-snug">
          {course.title}
        </h2>

        <p className="text-[15px] text-slate-900 leading-relaxed mb-5">
          {course.description}
        </p>

        <div className="mb-6">
           <p className="uppercase mb-3 text-slate-500 text-[11px] font-bold tracking-[0.15em]">
            What You Will Achieve
          </p>
          <div className="space-y-2">
            {course.bullets.map((b: string, i: number) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2
                  className="flex-shrink-0 mt-0.5"
                  style={{ width: "16px", height: "16px", color: course.badgeColor }}
                />
                 <p className="text-[14px] text-slate-900 leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
           <button
            className="rounded-xl font-bold transition text-[14px] px-6 py-2.5 bg-brand-primary text-white hover:bg-brand-primary-dark cursor-pointer border-none"
            style={{
              background: course.badgeColor,
            }}
          >
            ENROL NOW
          </button>

           {course.leadsTo && (
            <div className="flex items-center gap-2 text-slate-500 text-[13px]">
              <span>Complete this course</span>
              <ArrowRight style={{ width: "14px", height: "14px" }} />
              <span
                className="font-semibold"
                style={{
                  color: course.badgeColor,
                }}
              >
                {course.leadsTo}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function EnglishSidebar({ activeSection }: { activeSection: string }) {
  const links = [
    { href: "mh-voc", label: "Grade 6–8 Foundation" },
    { href: "mh-rc", label: "Reading Comprehension" },
    { href: "esl1", label: "ESL1 — A2" },
    { href: "esl2", label: "ESL2 — B1" },
    { href: "bridge", label: "O-Level Bridge" },
    { href: "o-level-english", label: "O-Level English" },
    { href: "comprehension-mastery", label: "Comprehension Mastery" },
    { href: "ew1", label: "Essay Writing Foundation" },
    { href: "ew2", label: "Band 3→1 Bridge" },
    { href: "ew3", label: "Complete Mastery" },
    { href: "dw1", label: "Directed Writing 1" },
    { href: "dw2", label: "Directed Writing 2" },
  ];

  return (
       <aside
        className="hidden lg:block flex-shrink-0 sticky top-[64px] h-[calc(100vh-64px)] overflow-y-auto bg-white border-r border-slate-200 py-6 w-[240px]"
      >
       <div className="mx-4 mb-5 rounded-xl p-4 bg-brand-primary-soft border border-slate-200">
        <p className="text-[12px] text-slate-900 leading-relaxed mb-2.5">
          Not sure which course to start? Take the free English Level Assessment.
        </p>
         <button
          className="w-full rounded-lg font-semibold bg-brand-primary text-white text-[12px] p-2 border-none cursor-pointer hover:bg-brand-primary-dark"
        >
          TAKE FREE ENGLISH DIAGNOSTIC
        </button>
      </div>

       <div className="px-4 mb-5">
        <p className="uppercase mb-2 text-slate-500 text-[10px] font-bold tracking-[0.15em]">
          Pathway Navigation
        </p>
         {links.map((l) => {
          const isActive = activeSection === l.href;
          return (
            <a
              key={l.href}
              href={`#${l.href}`}
              className={`block rounded-lg text-[12px] font-medium transition-all mb-0.5 px-3 py-1.5 ${
                isActive ? "text-brand-primary bg-brand-primary-soft font-semibold" : "text-slate-900 font-normal"
              }`}
            >
              {l.label}
            </a>
          );
        })}
      </div>

       <div className="mx-4 rounded-xl p-4 bg-brand-primary-soft border border-blue-200">
        <p className="text-[12px] text-brand-navy leading-relaxed mb-2">
          Want the full pre-O-Level foundation before English? Take the O-Level English Bridge Course — includes the Pre-O-Level Certification Exam.
        </p>
         <Link href="/programs/bridge">
          <span className="block text-center bg-brand-navy text-white text-[11px] font-bold rounded-lg p-2 cursor-pointer hover:bg-black transition-colors">
            VIEW BRIDGE COURSES
          </span>
        </Link>
      </div>
    </aside>
  );
}

export default function EnglishPathway() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    document.title = "English Language Complete Pathway | EduMeUp";

    const ids = courses.map((c) => c.anchor);
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <Layout>
       <section
        className="relative overflow-hidden py-14 md:py-20 bg-gradient-to-br from-brand-primary to-brand-sky"
      >
        <div className="absolute -top-20 -right-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" aria-hidden="true" />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mx-auto max-w-4xl text-center"
          >
            <p
              className="uppercase mb-4"
              style={{ fontSize: "11px", fontWeight: 700, color: "#93c5fd", letterSpacing: "0.28em" }}
            >
              Cambridge O-Level / IGCSE  │  CEFR A2 to B2+  │  Foundation to Exam Mastery
            </p>
             <h1 className="mb-5 font-bold text-[clamp(1.8rem,4.5vw,3rem)] text-white leading-[1.1]">
              The Complete English Language Pathway — From Foundation to O-Level Mastery 
            </h1>
             <p className="mb-8 mx-auto max-w-3xl text-[16px] text-white/80 leading-relaxed">
              Unlike platforms where English courses are disconnected purchases, every EduMeUp English
              course is purpose-built as part of a connected, progressive pathway. Each course is a
              complete standalone — but together they form the only end-to-end English mastery journey
              from Grade 6 foundation to Cambridge O-Level. A free AI Diagnostic at any entry point
              tells you exactly where to start.
            </p>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
              {[{ stat: "10 Courses", sub: "One Complete Pathway" }, { stat: "Free AI Diagnostic", sub: "Know Your Entry Point Before Enrolling" }, { stat: "Cambridge 1123 / IGCSE 0500", sub: "Aligned Throughout" }].map((s) => (
                <div
                  key={s.stat}
                  className="rounded-xl py-4 px-5 text-center bg-white/10 border border-white/15"
                >
                  <p className="font-extrabold text-[18px] text-white leading-none mb-1">{s.stat}</p>
                  <p className="text-[11px] text-white/70">{s.sub}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-3">
               <Link href="/programs/ai-diagnostic">
                <span className="inline-flex items-center gap-2 rounded-xl font-bold bg-brand-primary text-white text-[14px] px-7 py-3 cursor-pointer hover:bg-brand-primary-dark transition-colors">
                  TAKE FREE ENGLISH DIAGNOSTIC
                </span>
              </Link>
               <a
                href="#mh-voc"
                className="inline-flex items-center gap-2 rounded-xl font-semibold bg-white/10 text-white text-[14px] px-7 py-3 border border-white/25 hover:bg-white/20 transition-colors"
              >
                VIEW ALL COURSES IN THE PATHWAY
              </a>
            </div>
          </motion.div>
        </div>
      </section>

       <section className="py-10 px-6 bg-white border-b border-slate-200">
        <div className="container-custom max-w-5xl">
          <div className="hidden md:flex items-center justify-between gap-2">
            {pathwaySteps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2 flex-1">
                 <a
                  href={`#${step.anchor}`}
                  className="flex-1 rounded-xl p-4 text-center transition hover:shadow-md cursor-pointer no-underline"
                  style={{ background: step.color }}
                >
                  {step.star && <p className="text-[16px] mb-0.5">⭐</p>}
                  <p className="font-bold text-[12px] text-white leading-tight">{step.label}</p>
                  <p className="text-[10px] text-white/75 mt-1">{step.sub}</p>
                </a>
                {i < pathwaySteps.length - 1 && (
                  <ArrowRight style={{ width: "18px", height: "18px", color: "#94a3b8", flexShrink: 0 }} />
                )}
              </div>
            ))}
          </div>

          <div className="flex md:hidden flex-col gap-2">
            {pathwaySteps.map((step, i) => (
              <div key={step.label} className="flex flex-col items-center">
                 <a
                  href={`#${step.anchor}`}
                  className="w-full rounded-xl p-3 text-center no-underline"
                  style={{ background: step.color }}
                >
                  <p className="font-bold text-[13px] text-white">{step.star && "⭐ "}{step.label}</p>
                  <p className="text-[11px] text-white/75 mt-0.5">{step.sub}</p>
                </a>
                {i < pathwaySteps.length - 1 && (
                  <div style={{ width: "2px", height: "20px", background: "#CBD5E1", margin: "2px 0" }} />
                )}
              </div>
            ))}
          </div>

           <div className="mt-5 rounded-xl px-5 py-4 bg-brand-primary-soft border border-slate-200">
            <p className="text-[13px] text-brand-navy leading-relaxed">
              <strong>Writing Enhancer Courses</strong> — Essay Writing Foundation · Band 3→1 Bridge · Cambridge Composition Complete Mastery · Directed Writing Part 1 · Directed Writing Part 2 — run as a parallel track alongside Steps 3–5, deepening writing skills at every level.
            </p>
          </div>
        </div>
      </section>

       <div
        className="py-8 px-6 bg-brand-primary-soft border-b border-slate-200"
      >
        <div className="container-custom max-w-5xl flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
             <p className="font-bold text-[18px] text-brand-navy mb-1.5">
              Not Sure Which English Course Is Right for You?
            </p>
             <p className="text-[14px] text-slate-500 leading-relaxed">
              Take the free AI English Level Assessment. It identifies your exact CEFR level and
              recommends which course to start from — personalised, not one-size-fits-all.
            </p>
          </div>
           <Link href="/programs/ai-diagnostic">
            <span className="inline-flex items-center gap-2 rounded-xl font-bold whitespace-nowrap bg-brand-primary text-white text-[14px] px-6 py-3 cursor-pointer hover:bg-brand-primary-dark transition-colors">
              TAKE FREE ENGLISH DIAGNOSTIC
            </span>
          </Link>
        </div>
      </div>

       <div className="flex bg-slate-50">
        <EnglishSidebar activeSection={activeSection} />

        <main className="flex-1 min-w-0">
          {courses.map((course) => (
            <CourseSection key={course.id} course={course} />
          ))}

           <section
            className="py-16 px-6 md:px-10 relative overflow-hidden bg-gradient-to-br from-brand-primary to-brand-sky"
          >
            <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
            <div className="max-w-3xl relative z-10">
               <h2 className="mb-4 font-bold text-[clamp(1.4rem,3vw,2rem)] text-white leading-tight">
                From First Words to First-Class Essays — One Pathway, Every Step Covered
              </h2>
               <p className="text-[15px] text-white/75 leading-relaxed mb-7">
                Whether you are building English from the foundation or preparing your final O-Level
                compositions, EduMeUp has the exact course for where you are right now — and the next
                step after that. Take the free diagnostic and start exactly where you need to.
              </p>
              <div className="flex flex-wrap gap-3 mb-4">
                 <Link href="/programs/ai-diagnostic">
                  <span className="inline-flex items-center gap-2 rounded-xl font-bold bg-brand-primary text-white text-[14px] px-6 py-3 cursor-pointer hover:bg-brand-primary-dark transition-colors">
                    TAKE FREE ENGLISH DIAGNOSTIC
                  </span>
                </Link>
                 <Link href="/programs/o-level-english">
                  <span className="inline-flex items-center gap-2 rounded-xl font-semibold bg-white/10 text-white text-[14px] px-6 py-3 border border-white/25 cursor-pointer hover:bg-white/20 transition-colors">
                    ENROL IN O-LEVEL ENGLISH LANGUAGE
                  </span>
                </Link>
              </div>
              <a
                href="/contact"
                style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", textDecoration: "underline" }}
              >
                Talk to us about which English course is right for you →
              </a>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
