import { useEffect } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  CheckCircle2,
  FlaskConical,
  Microscope,
  Atom,
  BarChart2,
  PenLine,
  Layers,
  BookOpen,
  BrainCircuit,
  ClipboardCheck,
  Beaker,
  Dna,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";

/* ─── Sidebar anchor links ─── */
const sidebarLinks = [
  { label: "What Is ATP?", href: "#what-is-atp" },
  { label: "How Courses Are Structured", href: "#structure" },
  { label: "ATP Physics", href: "#section-physics" },
  { label: "ATP Chemistry", href: "#section-chemistry" },
  { label: "ATP Biology", href: "#section-biology" },
  { label: "What Is Included", href: "#includes" },
  { label: "Free ATP Diagnostic", href: "#diagnostic" },
  { label: "Enrol", href: "#cta" },
];

/* ─── 4-step structure ─── */
const steps = [
  {
    step: "Step 1",
    title: "Teach the Skill",
    description:
      "The practical skill is explained — what it tests in Cambridge Paper 4, the technique required, common examiner expectations, and the command words Cambridge uses for this skill type.",
    icon: BookOpen,
  },
  {
    step: "Step 2",
    title: "Worked Examples",
    description:
      "A fully worked example from a real Cambridge ATP past paper — showing the examiner's expected response step by step, with AO-level annotation and mark scheme commentary.",
    icon: PenLine,
  },
  {
    step: "Step 3",
    title: "Interactive Practice",
    description:
      "H5P interactive exercises — students practise the skill with structured activities, immediate feedback, and progressive difficulty. No passive reading.",
    icon: BrainCircuit,
  },
  {
    step: "Step 4",
    title: "Solved Past Papers",
    description:
      "Latest 5 years of Cambridge ATP past paper questions for this skill, with model answers, mark scheme breakdown, and extension questions for AO3 development.",
    icon: ClipboardCheck,
  },
];

/* ─── What every course includes ─── */
const courseIncludes = [
  {
    title: "Latest 5 Years of Past Papers",
    description:
      "Cambridge ATP past papers from 2019–2024 are integrated into every skill topic — not as a separate revision resource but as the core practice material throughout the course.",
    icon: BookOpen,
  },
  {
    title: "Examiner-Calibrated Mark Schemes",
    description:
      "Every past paper question comes with a detailed mark scheme breakdown — showing exactly which words and statements earn marks, and the most common student errors that lose marks.",
    icon: ClipboardCheck,
  },
  {
    title: "H5P Interactive Practice",
    description:
      "No passive reading. Every skill is practised through interactive exercises — graph-drawing simulations, data processing activities, error analysis tasks — requiring active engagement at every step.",
    icon: Layers,
  },
  {
    title: "ATP Diagnostic Available",
    description:
      "Take the free ATP diagnostic before beginning — it identifies which skill types you are weakest in so you can prioritise your preparation. Available for Physics, Chemistry, and Biology — one subject at a time.",
    icon: BarChart2,
  },
  {
    title: "AI Study Advisor — 24/7",
    description:
      "The AI Study Advisor is available for all enrolled ATP subjects — answer questions about practical techniques, data processing, graph drawing, or any Paper 4 question at any hour.",
    icon: BrainCircuit,
  },
  {
    title: "Complements School Lab Work",
    description:
      "EduMeUp's ATP courses work alongside school laboratory sessions — not as a replacement. Students who have laboratory access use the courses to reinforce their understanding of what the experiments test.",
    icon: Beaker,
  },
];

/* ─── Physics skills ─── */
const physicsSkills = [
  { num: 1, title: "Experimental Design and Planning", tests: "Identifying variables, suggesting methods, specifying apparatus, controlling fair tests" },
  { num: 2, title: "Measurement and Recording", tests: "Reading scales accurately, significant figures, consistent units, tabulating data" },
  { num: 3, title: "Graph Drawing — Axes and Scales", tests: "Choosing appropriate scales, labelling axes with quantity and unit, plotting points accurately" },
  { num: 4, title: "Graph Drawing — Line of Best Fit", tests: "Drawing best-fit straight lines and smooth curves, excluding anomalous points" },
  { num: 5, title: "Gradient Calculation", tests: "Identifying and calculating gradient from a straight-line graph, units of gradient" },
  { num: 6, title: "Intercepts and Relationships", tests: "y-intercept determination, using graph to find constants, determining relationships" },
  { num: 7, title: "Processing Data — Calculations", tests: "Using tabulated data to calculate derived quantities, showing working clearly" },
  { num: 8, title: "Identifying Patterns and Anomalies", tests: "Recognising trends, identifying anomalous results and suggesting causes" },
  { num: 9, title: "Sources of Error and Limitations", tests: "Systematic vs random errors, precision vs accuracy, limitations of methods" },
  { num: 10, title: "Evaluation and Suggested Improvements", tests: "Evaluating quality of data, suggesting specific improvements to method or apparatus" },
  { num: 11, title: "Physics Practical Skills — Forces and Motion", tests: "Graph analysis and calculation for forces, motion, acceleration experiments" },
  { num: 12, title: "Physics Practical Skills — Electricity", tests: "Current-voltage graphs, resistance calculations, circuit diagram reading" },
  { num: 13, title: "Physics Practical Skills — Light and Waves", tests: "Ray diagrams, angle measurement, focal length determination from graphs" },
  { num: 14, title: "Physics Practical Skills — Thermal", tests: "Temperature-time graphs, cooling experiments, specific heat capacity calculations" },
];

/* ─── Chemistry skills ─── */
const chemistrySkills = [
  { num: 1, title: "Safety in the Laboratory", tests: "Identifying hazards, safety precautions, protective equipment, handling chemicals" },
  { num: 2, title: "Experimental Design — Chemistry", tests: "Designing titrations, crystallisation, gas collection, identifying appropriate techniques" },
  { num: 3, title: "Measurement and Observation Recording", tests: "Colour changes, precipitate formation, gas evolution — precise qualitative recording" },
  { num: 4, title: "Graph Drawing and Analysis", tests: "Concentration-volume graphs, temperature change graphs, rate of reaction analysis" },
  { num: 5, title: "Calculations from Experimental Data", tests: "Titration calculations, yield calculations, concentration from experimental results" },
  { num: 6, title: "Identification Tests", tests: "Flame tests, gas tests, ion identification — method, observation, conclusion format" },
  { num: 7, title: "Rate of Reaction Experiments", tests: "Interpreting rate experiments — graph gradients, tangent drawing, rate comparisons" },
  { num: 8, title: "Electrolysis Experiments", tests: "Electrode products, mass calculations, current-time graphs" },
  { num: 9, title: "Chromatography — Analysis and Rf Values", tests: "Rf value calculation, identifying substances, interpreting chromatograms" },
  { num: 10, title: "Sources of Error in Chemistry Experiments", tests: "Systematic and random errors specific to chemistry techniques, precision and accuracy" },
  { num: 11, title: "Evaluation and Improvements — Chemistry", tests: "Evaluating titration methods, crystallisation procedures, suggesting modifications" },
];

/* ─── Biology skills ─── */
const biologySkills = [
  { num: 1, title: "Experimental Design — Biology", tests: "Designing fair tests, controlling variables, using appropriate biological techniques" },
  { num: 2, title: "Microscopy and Drawing", tests: "Producing biological drawings, magnification calculations, scale bars" },
  { num: 3, title: "Measurement and Recording — Biology", tests: "Measuring length, counting cells, recording observations precisely" },
  { num: 4, title: "Graph Drawing — Biology", tests: "Plotting growth curves, enzyme activity graphs, population data — axes and best-fit lines" },
  { num: 5, title: "Processing Biological Data", tests: "Calculating means, percentage change, rate calculations from biological experiments" },
  { num: 6, title: "Identifying Patterns — Biology", tests: "Interpreting trends in biological data, identifying anomalies, drawing conclusions" },
  { num: 7, title: "Food Tests and Identification", tests: "Benedict's, Biuret, iodine, emulsion — method, expected observation, conclusion" },
  { num: 8, title: "Osmosis and Diffusion Experiments", tests: "Potato cylinder experiments, dialysis tubing, interpreting results and graphs" },
  { num: 9, title: "Enzyme Experiments", tests: "pH and temperature effects on enzyme activity, interpreting rate-substrate concentration graphs" },
  { num: 10, title: "Photosynthesis Experiments", tests: "Chromatography of leaf pigments, leaf disk experiments, interpreting rate-light intensity graphs" },
  { num: 11, title: "Respiration Experiments", tests: "Respirometer readings, germinating seed experiments, CO2 production data" },
  { num: 12, title: "Evaluation and Improvements — Biology", tests: "Sources of error in biological experiments, suggesting improvements, reliability assessment" },
];

/* ─── Subject section component ─── */
function SubjectSection({
  id,
  accent,
  bg,
  label,
  icon: Icon,
  code,
  title,
  count,
  skills,
  enrollHref,
}: {
  id: string;
  accent: string;
  bg: string;
  label: string;
  icon: React.ElementType;
  code: string;
  title: string;
  count: string;
  skills: { num: number; title: string; tests: string }[];
  enrollHref: string;
}) {
  return (
    <section id={id} className="py-14 md:py-20" style={{ background: bg }}>
      <div className="container-custom">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div
            className="mb-8 rounded-2xl p-6 md:p-8"
            style={{ background: accent }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Icon className="h-7 w-7 text-white" />
              <span className="text-xs font-bold uppercase tracking-widest text-white/80">
                {code}
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              {title}
            </h2>
            <p className="mt-1 text-sm text-white/80">
              Cambridge Paper 4 — Alternative to Practical | All topics built from latest 5 years ATP past papers
            </p>
            <span className="mt-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
              {count}
            </span>
          </div>

          {/* Skills table */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            <div className="grid grid-cols-[48px_1fr_1fr_80px] bg-slate-800 text-white text-xs uppercase tracking-wide font-semibold">
              <div className="p-3">#</div>
              <div className="p-3">Practical Skill / Topic</div>
              <div className="p-3">What the skill tests</div>
              <div className="p-3">Availability</div>
            </div>
            {skills.map((skill, i) => (
              <div
                key={skill.num}
                className={`grid grid-cols-[48px_1fr_1fr_80px] border-t border-slate-100 text-sm ${
                  i % 2 === 0 ? "bg-white" : "bg-slate-50"
                }`}
              >
                <div className="p-3 font-bold" style={{ color: accent }}>
                  {skill.num}
                </div>
                <div className="p-3 font-medium text-slate-900">{skill.title}</div>
                <div className="p-3 text-slate-600">{skill.tests}</div>
                <div className="p-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700">
                    <CheckCircle2 className="h-3 w-3" /> Available
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing callout */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
                Chapter / Skill Course
              </p>
              <p className="text-sm text-slate-800">From $6/skill (1yr). Volume discounts — see /pricing.</p>
            </div>
            <div
              className="rounded-xl p-4 text-white"
              style={{ background: accent }}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-white/70 mb-1">
                Full {label} ATP Course
              </p>
              <p className="text-sm text-white font-medium">$120/year (1yr) · $90/yr (2yr) · $72/yr (3yr)</p>
            </div>
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#2366c9] mb-1">
                Scholarship Available
              </p>
              <p className="text-sm text-slate-700">
                Developing country? May qualify for up to 40% off. Check eligibility at{" "}
                <a href="/pricing#scholarship" className="underline">
                  /pricing#scholarship
                </a>
              </p>
            </div>
          </div>

          {/* Enrol CTA */}
          <div className="mt-6">
            <a
              href={enrollHref}
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white"
              style={{ background: accent }}
            >
              Enrol in ATP {label}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Main page ─── */
export default function ATPCoursesPage() {
  useEffect(() => {
    const prev = document.title;
    document.title = "ATP Courses — Alternative to Practical Physics Chemistry Biology | EduMeUp";
    return () => { document.title = prev; };
  }, []);

  return (
    <Layout>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0b1e3a] via-[#0d2a4a] to-[#0a1f36] py-16 md:py-24">
        {/* subtle pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mx-auto max-w-5xl text-center"
          >
            <p className="mb-4 inline-flex rounded-full border border-white/20 px-4 py-1 text-[11px] font-bold uppercase tracking-[0.28em] text-white/70">
              EduMeUp | Cambridge O-Level / IGCSE
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-6xl">
              Cambridge Paper 4. Alternative to Practical.{" "}
              <span className="text-[#38bdf8]">Fully Prepared — With or Without a Laboratory.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-base text-white/75 md:text-lg">
              Cambridge Paper 4 tests practical skills without requiring a live experiment. EduMeUp's ATP courses teach every
              practical skill Cambridge Paper 4 assesses — through structured instruction, worked past paper examples,
              interactive practice, and the full archive of the latest 5 years of Cambridge ATP questions.
            </p>
            <p className="mt-2 text-sm text-white/50">
              Available for Physics, Chemistry, and Biology · All courses available now
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/diagnostic">
                <span className="inline-flex items-center gap-2 rounded-xl bg-[#0ea5e9] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0284c7]">
                  Take the Free ATP Diagnostic
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <a
                href="#section-physics"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:border-white/60"
              >
                Browse ATP Courses
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── LAYOUT: sidebar + main ── */}
      <div className="bg-slate-50">
        <div className="container-custom max-w-7xl py-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">

            {/* ── LEFT STICKY SIDEBAR ── */}
            <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
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

              <div className="rounded-xl border border-[#dbe7f4] bg-white p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-900">Not sure which subject?</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Take the free ATP Diagnostic for each science subject separately and decide based on the results.
                </p>
                <a
                  href="/diagnostic"
                  className="mt-3 block rounded-lg bg-[#2366c9] px-3 py-2 text-center text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Free ATP Diagnostic
                </a>
              </div>

              <div className="rounded-xl border border-[#dbe7f4] bg-white p-4 shadow-sm text-sm text-slate-700">
                View all prices?{" "}
                <a href="/pricing" className="font-semibold text-[#2366c9]">
                  View Pricing Page
                </a>
              </div>
            </aside>

            {/* ── MAIN CONTENT ── */}
            <main className="space-y-0">

              {/* SECTION: What Is ATP */}
              <section id="what-is-atp" className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm md:p-8 mb-8">
                <p className="mb-3 inline-flex rounded-full bg-[#2366c9] px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">
                  What Is Cambridge Paper 4?
                </p>
                <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
                  Cambridge Paper 4 Tests Practical Thinking — Not Lab Technique.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
                  Cambridge O-Level Physics, Chemistry, and Biology each include a practical component. Cambridge offers two
                  routes: Coursework (ongoing practical experiments assessed by the school) or the Alternative to Practical
                  paper (Paper 4) — a written examination that tests the same practical skills without requiring live experiments.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      q: "Who takes Paper 4?",
                      a: "Students whose school does not offer coursework-based practical assessment, or students who choose the ATP route. In most O-Level centres in South Asia, MENA, and other developing regions, Paper 4 is the standard route — not the exception.",
                    },
                    {
                      q: "What does Paper 4 test?",
                      a: "Practical skills — how to plan experiments, record observations accurately, process data (draw graphs, calculate gradients, identify patterns), evaluate experimental methods, and suggest improvements. All testable skills that do not require a physical laboratory.",
                    },
                    {
                      q: "Why do many students underperform in Paper 4?",
                      a: "Paper 4 is often undertaught. Students receive extensive preparation for Papers 1 and 2 (theory) but limited systematic preparation for Paper 4. The skills it tests — graph drawing, gradient calculation, error analysis — are specific and learnable but require deliberate practice.",
                    },
                    {
                      q: "What EduMeUp's ATP courses provide",
                      a: "Systematic, skill-by-skill preparation for every practical skill Cambridge Paper 4 assesses. Each skill is taught, demonstrated with past paper worked examples, practised interactively, and reinforced with solved past paper questions from the last 5 years. No laboratory needed.",
                    },
                  ].map((item) => (
                    <div key={item.q} className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
                      <p className="text-xs font-bold uppercase tracking-wide text-[#2366c9] mb-2">{item.q}</p>
                      <p className="text-sm leading-relaxed text-slate-700">{item.a}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-5 rounded-xl bg-slate-800 p-4 text-sm leading-relaxed text-white">
                  EduMeUp's ATP courses are equally valuable for students who do have laboratory access — they provide the
                  systematic Paper 4 preparation that lab sessions alone do not always deliver, and they develop the data
                  analysis and evaluation skills that earn marks in AO2 and AO3.
                </p>
              </section>

              {/* SECTION: 4-Step Structure */}
              <section id="structure" className="mb-8">
                <div className="mb-6 text-center">
                  <p className="mb-2 inline-flex rounded-full bg-[#2366c9] px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">
                    Course Structure
                  </p>
                  <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
                    Every Practical Skill. Four Steps. Past Papers From Day One.
                  </h2>
                  <p className="mx-auto mt-3 max-w-3xl text-sm text-slate-600 md:text-base">
                    EduMeUp's ATP courses are structured around individual practical skills — the specific competencies that
                    Cambridge Paper 4 questions test. Each skill is a self-contained learning unit following the same four-step
                    sequence.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {steps.map((s, i) => (
                    <div
                      key={s.step}
                      className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm"
                      style={{ borderTopWidth: "4px", borderTopColor: "#2366c9" }}
                    >
                      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-[#2366c9]">
                        <s.icon className="h-4 w-4" />
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#2366c9]">{s.step}</p>
                      <h3 className="mt-1 text-base font-semibold text-slate-900">{s.title}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-slate-600">{s.description}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm leading-relaxed text-slate-700">
                  <strong className="text-[#2366c9]">The 4-step structure</strong> is what distinguishes EduMeUp's ATP
                  preparation from textbook-based study. A student who completes all skill units for their subject has: seen
                  every Cambridge ATP skill type, worked through the latest 5 years of Cambridge past papers for that skill, and
                  received immediate feedback on their practice responses.
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>

      {/* ── PHYSICS ── */}
      <SubjectSection
        id="section-physics"
        accent="#2366c9" // Brand blue
        bg="#fff"        // White background
        label="Physics"
        icon={Zap}
        code="PHY"
        title="ATP Physics"
        count="14 skill topics — all available"
        skills={physicsSkills}
        enrollHref="#cta"
      />

      {/* ── CHEMISTRY ── */}
      <SubjectSection
        id="section-chemistry"
        accent="#2366c9" // Brand blue
        bg="#fff"        // White background
        label="Chemistry"
        icon={FlaskConical}
        code="CHEM"
        title="ATP Chemistry"
        count="11 skill topics — all available"
        skills={chemistrySkills}
        enrollHref="#cta"
      />

      {/* ── BIOLOGY ── */}
      <SubjectSection
        id="section-biology"
        accent="#2366c9" // Brand blue
        bg="#fff"        // White background
        label="Biology"
        icon={Dna}
        code="BIO"
        title="ATP Biology"
        count="12 skill topics — all available"
        skills={biologySkills}
        enrollHref="#cta"
      />

      {/* ── WHAT EVERY COURSE INCLUDES ── */}
      <section id="includes" className="bg-gradient-to-b from-[#eef6ff]/80 to-white py-14 md:py-20">
        <div className="container-custom">
          <div className="mb-8 text-center">
            <p className="mb-2 inline-flex rounded-full bg-[#2366c9] px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">
              What's Included
            </p>
            <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
              Every ATP Course Includes Full Practical Skill Coverage and Past Paper Integration.
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {courseIncludes.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm"
                style={{ borderTopWidth: "4px", borderTopColor: "#2366c9" }}
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-[#2366c9]">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIAGNOSTIC CTA ── */}
      <section id="diagnostic" className="border-y border-[#2366c9]/10 bg-gradient-to-b from-[#eef6ff]/80 to-white py-14 md:py-20">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 inline-flex rounded-full bg-[#2366c9] px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">
              ATP Diagnostic — Free
            </p>
            <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
              ATP Diagnostic — Free, 30 Minutes, One Subject at a Time
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-700 md:text-base">
              The ATP Diagnostic identifies which practical skill types you are weakest in for your chosen science subject —
              before you begin any course content. This means you can prioritise the skill topics that will give you the highest
              marks improvement in the least time.
            </p>
            <p className="mt-3 text-sm text-slate-500">
              Available for: Physics ATP · Chemistry ATP · Biology ATP
            </p>
            <p className="mt-1 text-xs text-slate-500">
              The diagnostic is free — you can take it for each science subject separately and decide based on the results.
            </p>
            <div className="mt-6">
              <Link href="/diagnostic">
                <span className="inline-flex items-center gap-2 rounded-xl bg-[#2366c9] px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700">
                  Take the Free ATP Diagnostic
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section id="cta" className="bg-gradient-to-br from-[#1e1b4b] via-[#2366c9] to-[#4f86e0] py-16 md:py-24">
        <div className="container-custom">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              Cambridge Paper 4 Is Learnable. Every Skill Is Teachable.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-white/80">
              The practical skills Cambridge Paper 4 tests are specific and well-defined. They are fully learnable without a
              laboratory — if you have the right structured preparation.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              { label: "ATP Physics", count: "All 14 skill topics available", href: "#section-physics" },
              { label: "ATP Chemistry", count: "All 11 skill topics available", href: "#section-chemistry" },
              { label: "ATP Biology", count: "All 12 skill topics available", href: "#section-biology" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center"
              >
                <h3 className="text-lg font-semibold text-white">{s.label}</h3>
                <p className="mt-1 text-sm text-white/70">{s.count}</p>
                <a
                  href={s.href}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#2366c9] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#174a8b]"
                >
                  Enrol in {s.label}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/diagnostic">
              <span className="inline-flex items-center gap-2 rounded-xl bg-[#2366c9] px-6 py-3 text-sm font-semibold text-white hover:bg-[#174a8b]">
                Start ATP Diagnostic
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
            <Link href="/pricing">
              <span className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:border-white/60">
                View All Pricing — ATP Courses
              </span>
            </Link>
          </div>
          <p className="mt-4 text-center text-xs text-white/60">
            Chapter courses from $6. Full ATP course from $120/yr.
          </p>
        </div>
      </section>
    </Layout>
  );
}