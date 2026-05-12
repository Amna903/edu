import { useEffect } from "react";
import type { ElementType } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  CheckCircle2,
  Calculator,
  FlaskConical,
  Beaker,
  Dna,
  TrendingUp,
  Award,
  Clock,
  Target,
} from "lucide-react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";

const subjectColors: Record<string, { color: string; bg: string; border: string }> = {
  Mathematics: { color: "#2366c9", bg: "#eef6ff", border: "#bfdbfe" },
  Physics: { color: "#1a4fa0", bg: "#eef6ff", border: "#bfdbfe" },
  Chemistry: { color: "#4f86e0", bg: "#f1f7ff", border: "#bfdbfe" },
  Economics: { color: "#1e3a8a", bg: "#eef6ff", border: "#bfdbfe" },
  Biology: { color: "#2563eb", bg: "#eef6ff", border: "#bfdbfe" },
};

const sidebarLinks = [
  { label: "Why Bridge Matters", href: "#why-bridge" },
  { label: "Two Programme Types", href: "#two-types" },
  { label: "Pre-O-Level Victory Programme", href: "#pre-olevel" },
  { label: "- Mathematics", href: "#po-maths" },
  { label: "- Physics", href: "#po-physics" },
  { label: "- Chemistry", href: "#po-chemistry" },
  { label: "- Biology", href: "#po-biology" },
  { label: "O-Level Bridge Courses", href: "#bridge-courses" },
  { label: "- Bridge Physics", href: "#br-physics" },
  { label: "- Bridge Chemistry", href: "#br-chemistry" },
  { label: "- Bridge Mathematics", href: "#br-maths" },
  { label: "- Bridge Economics", href: "#br-economics" },
  { label: "Get Started", href: "#cta" },
];

const brPhysicsTopics = [
  { num: "B1", title: "Forces and Free Body Diagrams", concepts: "Identifying forces, free-body diagrams, resultant force.", outcome: "Draw accurate free-body diagrams and calculate net force.", duration: "~45 min" },
  { num: "B2", title: "Energy and Transfers", concepts: "Kinetic, potential, thermal and electrical energy, conservation.", outcome: "Apply conservation of energy and efficiency calculations.", duration: "~45 min" },
  { num: "B3", title: "Wave Behaviour", concepts: "Reflection, refraction, diffraction and superposition basics.", outcome: "Apply wave rules to common exam scenarios.", duration: "~50 min" },
  { num: "B4", title: "Electric Circuits", concepts: "Series/parallel analysis and core circuit laws.", outcome: "Calculate equivalent resistance and circuit quantities.", duration: "~50 min" },
  { num: "B5", title: "Pressure in Fluids", concepts: "Pressure, depth, buoyancy and atmospheric pressure.", outcome: "Solve pressure-at-depth and buoyancy questions.", duration: "~45 min" },
];

const brChemistryTopics = [
  { num: "B1", title: "Atomic Structure", concepts: "Protons, neutrons, electrons, isotopes, configuration.", outcome: "Write electron configurations and use atomic/mass numbers.", duration: "~50 min" },
  { num: "B2", title: "Chemical Bonding", concepts: "Ionic/covalent bonding and dot-cross diagrams.", outcome: "Draw bonding diagrams and predict bond type.", duration: "~55 min" },
  { num: "B3", title: "Stoichiometry", concepts: "Moles, molar mass, reacting masses.", outcome: "Calculate moles and solve reacting-mass problems.", duration: "~60 min" },
  { num: "B4", title: "Acids and Bases", concepts: "pH, neutralisation, acids/bases properties.", outcome: "Write neutralisation equations and classify substances.", duration: "~50 min" },
  { num: "B5", title: "Rate of Reaction", concepts: "Collision theory and factors affecting rate.", outcome: "Predict rate changes and justify with collision theory.", duration: "~50 min" },
];

const brMathsTopics = [
  { num: "B1", title: "Factorisation", concepts: "Quadratics, identities, common factors.", outcome: "Factorise core O-Level expressions reliably.", duration: "~55 min" },
  { num: "B2", title: "Simultaneous Equations", concepts: "Elimination, substitution and interpretation.", outcome: "Solve linear and mixed linear-quadratic pairs.", duration: "~55 min" },
  { num: "B3", title: "Quadratic Equations", concepts: "Factorisation, completing square, quadratic formula.", outcome: "Solve quadratics using all major methods.", duration: "~60 min" },
  { num: "B4", title: "Circle Theorems", concepts: "Core theorem set and proof-style application.", outcome: "Apply circle theorems to multi-step geometry tasks.", duration: "~60 min" },
  { num: "B5", title: "Matrices", concepts: "Operations, inverses, transformation matrices.", outcome: "Perform matrix operations and 2x2 inverses.", duration: "~55 min" },
];

const brEconomicsTopics = [
  { num: "B1", title: "The Economic Problem", concepts: "Scarcity, choice, opportunity cost, PPF.", outcome: "Interpret and draw PPF with opportunity cost.", duration: "~50 min" },
  { num: "B2", title: "Demand Analysis", concepts: "Demand law, shifts, PED and revenue.", outcome: "Draw demand shifts and calculate PED.", duration: "~60 min" },
  { num: "B3", title: "Supply and Equilibrium", concepts: "Supply law, shifts, equilibrium and controls.", outcome: "Determine and analyse market equilibrium changes.", duration: "~60 min" },
  { num: "B4", title: "Government and Economy", concepts: "Fiscal/monetary policy and objectives.", outcome: "Explain policy tools and objective trade-offs.", duration: "~55 min" },
  { num: "B5", title: "International Trade", concepts: "Comparative advantage, tariffs/quotas, BOP basics.", outcome: "Analyse trade barriers with diagrams.", duration: "~55 min" },
];

function TopicCardRow({
  topics,
  accentColor,
}: {
  topics: { num: string; title: string; concepts: string; outcome: string; duration: string }[];
  accentColor: string;
}) {
  return (
    <div className="overflow-x-auto pb-3">
      <div className="flex gap-4" style={{ minWidth: "max-content" }}>
        {topics.map((t) => (
          <div
            key={t.num}
            className="w-[220px] shrink-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            style={{ borderTopWidth: "4px", borderTopColor: accentColor }}
          >
            <span className="inline-flex h-7 min-w-[28px] items-center justify-center rounded-lg px-2 text-xs font-bold text-white" style={{ background: accentColor }}>{t.num}</span>
            <h4 className="mt-2 text-sm font-semibold text-slate-900 leading-snug">{t.title}</h4>
            <p className="mt-2 text-xs leading-relaxed text-slate-500 line-clamp-3">{t.concepts}</p>
            <p className="mt-2 text-xs leading-relaxed text-slate-700 font-medium line-clamp-2">{t.outcome}</p>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-slate-400"><Clock className="h-3 w-3" />{t.duration}</div>
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-[#2366c9]"><CheckCircle2 className="h-3 w-3" /> Available</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SubjectHeader({
  id,
  icon: Icon,
  badge,
  label,
  count,
  description,
  whoFor,
  includes,
  bridgeNote,
  accentColor,
  bg,
  certBadge,
}: {
  id: string;
  icon: ElementType;
  badge: string;
  label: string;
  count: string;
  description: string;
  whoFor: string;
  includes: string;
  bridgeNote: string;
  accentColor: string;
  bg: string;
  certBadge?: boolean;
}) {
  return (
    <div id={id} className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm mb-5">
      <div className="p-5" style={{ background: accentColor }}>
        <div className="flex items-center gap-3 mb-2">
          <Icon className="h-6 w-6 text-white" />
          <span className="text-xs font-bold uppercase tracking-widest text-white/70">{badge}</span>
          {certBadge && <span className="rounded-full bg-white/20 px-3 py-0.5 text-xs font-semibold text-white">Certification on completion</span>}
        </div>
        <h3 className="text-lg font-semibold text-white">{label}</h3>
        <p className="text-sm text-white/70 mt-1">{count}</p>
      </div>
      <div className="p-5 bg-white">
        <p className="text-sm leading-relaxed text-slate-700 mb-4">{description}</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: "Who it is for", text: whoFor },
            { label: "What is included", text: includes },
            { label: "Bridge / Pathway note", text: bridgeNote },
          ].map((item) => (
            <div key={item.label} className="rounded-xl p-3" style={{ background: bg }}>
              <p className="text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: accentColor }}>{item.label}</p>
              <p className="text-xs leading-relaxed text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BridgeSciencesEconomics() {
  useEffect(() => {
    const prev = document.title;
    document.title = "Bridge Courses & Pre-O-Level Preparation - Sciences and Economics | EduMeUp";
    return () => { document.title = prev; };
  }, []);

  return (
    <Layout>
      <section className="relative overflow-hidden bg-[#1a4fa0] py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
        <div className="container-custom relative">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="mb-4 inline-flex rounded-full border border-white/20 px-4 py-1 text-[11px] font-bold uppercase tracking-[0.28em] text-white/70">Bridge Courses & Pre-O-Level Preparation</p>
              <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">Enter O-Level With <span className="text-[#93c5fd]">20-30% Already Mastered.</span></h1>
              <p className="mt-5 text-base text-white/70">Bridge and pre-O-Level pathways close foundational gaps before they cost marks.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/diagnostics"><span className="inline-flex items-center gap-2 rounded-xl bg-[#2366c9] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1a4fa0]">Take the Free Diagnostic<ArrowRight className="h-4 w-4" /></span></Link>
                <a href="#pre-olevel" className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:border-white/60">Jump to Pre-O-Level Victory</a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="bg-slate-50">
        <div className="container-custom max-w-7xl py-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
            <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
              <div className="rounded-xl border border-[#dbe7f4] bg-white p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-900">Not sure where to start?</h3>
                <p className="mt-2 text-sm text-slate-600">Take the free AI Diagnostic to identify exact subject gaps.</p>
                <Link href="/diagnostics"><span className="mt-3 block rounded-lg bg-[#2366c9] px-3 py-2 text-center text-sm font-semibold text-white">TAKE FREE DIAGNOSTIC</span></Link>
              </div>
              <div className="rounded-xl border border-[#dbe7f4] bg-white p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-900">Page Navigation</h3>
                <div className="mt-3 space-y-1.5">
                  {sidebarLinks.map((l) => (
                    <a key={l.href} href={l.href} className={`block text-sm hover:underline ${l.label.startsWith("-") ? "pl-3 text-slate-500" : "text-[#2366c9]"}`}>{l.label}</a>
                  ))}
                </div>
              </div>
            </aside>

            <main className="space-y-10">
              <section id="why-bridge" className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm md:p-8">
                <p className="mb-3 inline-flex rounded-full bg-[#2366c9] px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">Why Bridge Courses Matter</p>
                <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">Most O-Level failures begin with unresolved foundational gaps.</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">Bridge pathways remove those gaps before full O-Level progression.</p>
              </section>

              <section id="two-types">
                <p className="mb-3 inline-flex rounded-full bg-[#2366c9] px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">Two Programme Types</p>
                <h2 className="mb-2 text-xl font-semibold text-slate-900 md:text-2xl">Two Programmes. One Goal: O-Level readiness.</h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="rounded-2xl border-2 border-[#2366c9] bg-white p-6 shadow-sm" style={{ borderTopWidth: "4px" }}>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-[#2366c9]"><Award className="h-5 w-5" /></div>
                    <h3 className="text-base font-semibold text-[#2366c9]">PRE-O-LEVEL VICTORY PROGRAMME</h3>
                    <p className="mt-3 text-sm text-slate-700">Structured sequence with certification at completion.</p>
                  </div>
                  <div className="rounded-2xl border-2 border-[#1a4fa0] bg-white p-6 shadow-sm" style={{ borderTopWidth: "4px" }}>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-[#1a4fa0]"><Target className="h-5 w-5" /></div>
                    <h3 className="text-base font-semibold text-[#1a4fa0]">O-LEVEL BRIDGE COURSES</h3>
                    <p className="mt-3 text-sm text-slate-700">Diagnostic-directed targeted gap closure with 80% mastery gates.</p>
                  </div>
                </div>
              </section>

              <section id="pre-olevel">
                <div className="mb-6 rounded-2xl bg-[#2366c9] p-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-100 mb-2">Pre-O-Level Victory Programme</p>
                  <h2 className="text-xl font-semibold text-white md:text-2xl">4 Subjects. 20-30% of O-Level covered before start.</h2>
                  <p className="mt-3 text-sm text-blue-100">Pre-O-Level pathways are available for Mathematics, Physics, Chemistry, and Biology.</p>
                </div>

                <SubjectHeader
                  id="po-maths"
                  icon={Calculator}
                  badge="PO2"
                  label="Pre-O-Level Mathematics"
                  count="13 topics"
                  description="Sequenced math foundations for O-Level entry readiness."
                  whoFor="Grade 7-9 students preparing for O-Level Mathematics."
                  includes="Interactive modules, practice, mastery checks, and certification exam."
                  bridgeNote="Feeds directly into O-Level Mathematics subject pathways."
                  accentColor={subjectColors.Mathematics.color}
                  bg={subjectColors.Mathematics.bg}
                  certBadge
                />

                <div className="mt-8">
                  <SubjectHeader
                    id="po-physics"
                    icon={FlaskConical}
                    badge="PO3"
                    label="Pre-O-Level Physics"
                    count="15 topics"
                    description="Core conceptual physics before O-Level depth topics."
                    whoFor="Grade 7-9 students entering Cambridge O-Level Physics."
                    includes="Interactive modules, examples, quizzes, mastery gates."
                    bridgeNote="Aligns with mechanics, waves, thermal physics, and electricity."
                    accentColor={subjectColors.Physics.color}
                    bg={subjectColors.Physics.bg}
                    certBadge
                  />
                </div>

                <div className="mt-8">
                  <SubjectHeader
                    id="po-chemistry"
                    icon={Beaker}
                    badge="PO4"
                    label="Pre-O-Level Chemistry"
                    count="11 chapters"
                    description="Strong chemistry foundations from atomic structure through organic basics."
                    whoFor="Grade 7-9 and first-time Chemistry learners."
                    includes="Chapter modules, H5P tasks, worked examples, mastery checks."
                    bridgeNote="Maps directly into multiple O-Level Chemistry topic blocks."
                    accentColor={subjectColors.Chemistry.color}
                    bg={subjectColors.Chemistry.bg}
                    certBadge
                  />
                </div>

                <div className="mt-8">
                  <SubjectHeader
                    id="po-biology"
                    icon={Dna}
                    badge="PO5"
                    label="Pre-O-Level Biology"
                    count="Foundational biology topics"
                    description="Biology readiness for full O-Level subject coverage."
                    whoFor="Grade 7-9 students preparing for O-Level Biology."
                    includes="Interactive content, diagram tasks, and formative assessments."
                    bridgeNote="Direct pathway into O-Level Biology course progression."
                    accentColor={subjectColors.Biology.color}
                    bg={subjectColors.Biology.bg}
                    certBadge
                  />
                </div>
              </section>

              <section id="bridge-courses">
                <div className="mb-6 rounded-2xl bg-[#1a4fa0] p-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-2">O-Level Bridge Courses</p>
                  <h2 className="text-xl font-semibold text-white md:text-2xl">4 Subjects. Targeted Gaps. 80% Mastery Before Advance.</h2>
                </div>

                <SubjectHeader
                  id="br-physics"
                  icon={FlaskConical}
                  badge="BR1"
                  label="O-Level Bridge - Physics"
                  count="5 bridge topics"
                  description="Most common foundational gap areas before O-Level Physics."
                  whoFor="Students with diagnostic-identified physics gaps."
                  includes="Bridge modules + examples + mastery checks + AI tutor."
                  bridgeNote="Each module links to related O-Level Physics topics."
                  accentColor={subjectColors.Physics.color}
                  bg={subjectColors.Physics.bg}
                />
                <TopicCardRow topics={brPhysicsTopics} accentColor={subjectColors.Physics.color} />

                <div className="mt-8">
                  <SubjectHeader
                    id="br-chemistry"
                    icon={Beaker}
                    badge="BR2"
                    label="O-Level Bridge - Chemistry"
                    count="5 bridge topics"
                    description="Foundational chemistry concepts most often missing at O-Level entry."
                    whoFor="Students needing diagnostic-guided chemistry gap closure."
                    includes="Topic-selectable bridge modules and 80% mastery progression."
                    bridgeNote="Prepares students for faster O-Level Chemistry progress."
                    accentColor={subjectColors.Chemistry.color}
                    bg={subjectColors.Chemistry.bg}
                  />
                  <TopicCardRow topics={brChemistryTopics} accentColor={subjectColors.Chemistry.color} />
                </div>

                <div className="mt-8">
                  <SubjectHeader
                    id="br-maths"
                    icon={Calculator}
                    badge="BR3"
                    label="O-Level Bridge - Mathematics"
                    count="5 bridge topics"
                    description="Algebra and geometry readiness topics for O-Level Mathematics."
                    whoFor="Students with algebra/geometry prerequisite gaps."
                    includes="Interactive bridge modules and mastery gates."
                    bridgeNote="Links directly to related O-Level Mathematics chapters."
                    accentColor={subjectColors.Mathematics.color}
                    bg={subjectColors.Mathematics.bg}
                  />
                  <TopicCardRow topics={brMathsTopics} accentColor={subjectColors.Mathematics.color} />
                </div>

                <div className="mt-8">
                  <SubjectHeader
                    id="br-economics"
                    icon={TrendingUp}
                    badge="BR4"
                    label="O-Level Bridge - Economics"
                    count="5 bridge topics"
                    description="Conceptual economics groundwork for first-time O-Level Economics learners."
                    whoFor="Students without prior formal economics background."
                    includes="Diagram practice, policy reasoning, and mastery progression."
                    bridgeNote="Moves directly into full O-Level Economics with stronger analytical readiness."
                    accentColor={subjectColors.Economics.color}
                    bg={subjectColors.Economics.bg}
                  />
                  <TopicCardRow topics={brEconomicsTopics} accentColor={subjectColors.Economics.color} />
                </div>
              </section>

              <section id="cta" className="rounded-2xl bg-[#1a4fa0] p-6 md:p-8">
                <h2 className="text-xl font-semibold text-white md:text-2xl">Ready to close the gaps before they cost marks?</h2>
                <p className="mt-2 text-sm text-white/70">Start with the free diagnostic to get a personalised bridge plan.</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {[
                    { title: "Take the Free Diagnostic", btn: "Start Free Diagnostic", href: "/diagnostics", primary: true },
                    { title: "Browse O-Level Subject Courses", btn: "Browse O-Level Courses", href: "/programs/complete-o-level", primary: false },
                    { title: "Start with Must-Have Courses", btn: "Must-Have Courses", href: "/programs/must-have-courses", primary: false },
                  ].map((card) => (
                    <div key={card.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                      <h3 className="text-sm font-semibold text-white">{card.title}</h3>
                      <a href={card.href} className={`mt-4 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold ${card.primary ? "bg-[#2366c9] text-white hover:bg-[#1a4fa0]" : "border border-white/30 text-white hover:border-white/60"}`}>
                        {card.btn}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  ))}
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
}
