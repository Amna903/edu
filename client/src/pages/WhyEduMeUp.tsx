import { useEffect } from "react";
import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { PageSidebar } from "@/components/PageSidebar";
import { Button } from "@/components/ui/button";

type ProblemCard = {
  title: string;
  description: string;
  hover: string;
};

type DifferentiatorCard = {
  badge: string;
  title: string;
  description: string;
  hover: string;
};

type ComparisonRow = {
  feature: string;
  edumeup: string;
  khan: string;
  kognity: string;
  tutoring: string;
  znotes: string;
  ai: string;
};

const problemCards: ProblemCard[] = [
  {
    title: "Rapid Forgetting",
    description:
      "Up to 70% of new material is forgotten within 24 hours. Without timely, systematic reinforcement, even well-taught content vanishes rapidly.",
    hover:
      "EduMeUp's proprietary AI intelligence system tracks each student's forgetting curve and schedules retrieval at Day 1, 3, 7, 14, 30, and 90. After 90 days, retention averages 85%+ versus passive re-reading.",
  },
  {
    title: "Passive Learning Illusion",
    description:
      "Watching videos and reading notes feels like learning but often fails to produce durable mastery. Passive methods typically produce 5-20% retention.",
    hover:
      "Every EduMeUp course is interactive by design with H5P activities that require students to engage, apply, and get evaluated in real time. Active learning reduces examination failure rates by 55% (Freeman et al., 2014).",
  },
  {
    title: "Tutor Dependency",
    description:
      "Tutor quality, Cambridge expertise, and availability vary widely. A system that depends on one person's schedule is structurally fragile.",
    hover:
      "EduMeUp provides a Cambridge-calibrated AI advisor, available 24/7 for every enrolled subject, with examiner-level guidance and consistent quality for every learner.",
  },
];

const differentiators: DifferentiatorCard[] = [
  {
    badge: "AI",
    title: "Cambridge-Calibrated AI Advisor",
    description:
      "Not a generic chatbot. EduMeUp's AI advisor is calibrated to AO1, AO2, AO3, mark scheme logic, command words, and examiner expectations.",
    hover:
      "EduMeUp's proprietary AI intelligence system is built for Cambridge assessment logic, including what distinguishes stronger versus weaker responses and where students typically lose marks.",
  },
  {
    badge: "H5P",
    title: "Interactive Courses — No Passive Video",
    description:
      "Every lesson requires active engagement through H5P. Students apply and demonstrate understanding instead of passively consuming content.",
    hover:
      "EduMeUp uses retrieval-based interactive formats including drag-and-drop, fill-in-blank, and adaptive sequences to improve retention and transfer.",
  },
  {
    badge: "DIAG",
    title: "4-Type Diagnostic System",
    description:
      "Before full study begins, EduMeUp identifies exact gaps per subject, topic, and AO level, then generates personalized remedial pathways.",
    hover:
      "Diagnostic pathways include O-Level Bridge, English Language Level Check, O-Level Subject Diagnostic, and ATP Diagnostic with written remedial direction.",
  },
  {
    badge: "CLOCK",
    title: "AI-Timed Spaced Retrieval System",
    description:
      "EduMeUp schedules retrieval at Day 1, 3, 7, 14, 30, and 90 after first learning, automatically managed per student and topic.",
    hover:
      "Spaced retrieval is among the strongest evidence-backed retention strategies. EduMeUp automates it at scale across subjects without manual planning burden.",
  },
  {
    badge: "PEOPLE",
    title: "Complete Stakeholder Ecosystem",
    description:
      "Students, parents, teachers, and school administrators each receive purpose-built tools, dashboards, and analytics.",
    hover:
      "Parents get real-time visibility, teachers get T1-T6 professional pathways, and schools get cohort analytics with implementation support.",
  },
  {
    badge: "GLOBE",
    title: "Global Access Scholarship — Up to 40% Off",
    description:
      "Eligible students from qualifying developing countries can receive up to 40% off O-Level subject courses with a simple declaration process.",
    hover:
      "No salary certificates and no document-heavy process. Eligibility checks and discount application are streamlined to improve access without reducing quality.",
  },
];

const comparisonRows: ComparisonRow[] = [
  {
    feature: "Cambridge-specific AI diagnostic (AO1/AO2/AO3 level)",
    edumeup: "[YES]",
    khan: "[NO]",
    kognity: "[NO]",
    tutoring: "[PART] Manual, tutor-dependent",
    znotes: "[NO]",
    ai: "[NO] No curriculum structure",
  },
  {
    feature: "Adaptive question routing by AO level per topic",
    edumeup: "[YES]",
    khan: "[NO]",
    kognity: "[NO]",
    tutoring: "[PART] Depends on tutor training",
    znotes: "[NO]",
    ai: "[NO] Cannot guarantee AO calibration",
  },
  {
    feature: "80% mastery gate — cannot advance without mastering",
    edumeup: "[YES] Enforced by platform",
    khan: "[NO] Self-directed",
    kognity: "[PART] Basic completion only",
    tutoring: "[NO] No system",
    znotes: "[NO]",
    ai: "[NO]",
  },
  {
    feature: "Spaced retrieval system — automated per student per topic",
    edumeup: "[YES] Day 1/3/7/14/30/90",
    khan: "[NO]",
    kognity: "[NO]",
    tutoring: "[NO]",
    znotes: "[NO]",
    ai: "[NO]",
  },
  {
    feature: "H5P interactive content — no passive video",
    edumeup: "[YES] 100% interactive",
    khan: "[NO] Video-based (5% retention)",
    kognity: "[PART] Mix of video and text",
    tutoring: "[NO]",
    znotes: "[NO] PDFs and notes only",
    ai: "[NO] Text responses only",
  },
  {
    feature: "Cambridge examiner-level AI intelligence (mark scheme, AO, errors)",
    edumeup: "[YES]",
    khan: "[NO] Not Cambridge-specific",
    kognity: "[PART] Partial",
    tutoring: "[PART] Depends on experience",
    znotes: "[PART] PMT has some content",
    ai: "[NO] General AI — not examiner-calibrated",
  },
  {
    feature: "Teacher professional development T1-T6 (CPD + certification)",
    edumeup: "[YES] 7 programmes",
    khan: "[NO]",
    kognity: "[NO]",
    tutoring: "[NO]",
    znotes: "[NO]",
    ai: "[NO]",
  },
  {
    feature: "Parent real-time dashboard — free with all enrolments",
    edumeup: "[YES] Free with all plans",
    khan: "[NO]",
    kognity: "[NO]",
    tutoring: "[PART] Verbal updates only",
    znotes: "[NO]",
    ai: "[NO]",
  },
  {
    feature: "School admin cohort analytics and CPD tracking",
    edumeup: "[YES] Real-time heatmaps",
    khan: "[NO]",
    kognity: "[PART] Basic only",
    tutoring: "[NO]",
    znotes: "[NO]",
    ai: "[NO]",
  },
  {
    feature: "Comprehensive proprietary AI intelligence system",
    edumeup: "[YES] Multi-function, Cambridge-specific",
    khan: "[PART] Single general AI",
    kognity: "[NO]",
    tutoring: "[NO]",
    znotes: "[NO]",
    ai: "[PART] General-purpose only",
  },
  {
    feature: "Pre-O-Level foundational courses (with certification)",
    edumeup: "[YES] Chem, Maths, Physics, Biology",
    khan: "[NO]",
    kognity: "[NO]",
    tutoring: "[PART] Tutor-dependent",
    znotes: "[NO]",
    ai: "[NO]",
  },
  {
    feature: "Research-backed 10X learning model (d=0.62-2.0 effect sizes)",
    edumeup: "[YES] All documented",
    khan: "[PART] Some research backing",
    kognity: "[NO] Not systematic",
    tutoring: "[NO]",
    znotes: "[NO]",
    ai: "[NO]",
  },
  {
    feature: "Enterprise LMS — Moodle 5.2 (mastery gates, competency, white-label)",
    edumeup: "[YES] Full enterprise features",
    khan: "[NO] Proprietary platform",
    kognity: "[NO]",
    tutoring: "[NO]",
    znotes: "[NO]",
    ai: "[NO]",
  },
  {
    feature: "White-label platform for schools (name, logo, domain)",
    edumeup: "[YES]",
    khan: "[NO]",
    kognity: "[NO]",
    tutoring: "[NO]",
    znotes: "[NO]",
    ai: "[NO]",
  },
  {
    feature: "Cambridge 360° AI consultancy service (4 plans)",
    edumeup: "[YES] Essentials to Excellence",
    khan: "[NO]",
    kognity: "[NO]",
    tutoring: "[PART] Ad hoc, not systematic",
    znotes: "[NO]",
    ai: "[PART] Generic only",
  },
  {
    feature: "Pre-O-Level Certification (EduMeUp, 5 subjects)",
    edumeup: "[YES]",
    khan: "[NO]",
    kognity: "[NO]",
    tutoring: "[NO]",
    znotes: "[NO]",
    ai: "[NO]",
  },
  {
    feature: "Global Access Scholarship — up to 40% off (developing countries)",
    edumeup: "[YES] Automatic, no documents",
    khan: "[NO]",
    kognity: "[NO]",
    tutoring: "[NO]",
    znotes: "[NO] Free already",
    ai: "[NO]",
  },
  {
    feature: "Annual cost — 1 student, full O-Level prep (1 subject)",
    edumeup: "$120/yr (scholarship: $72)",
    khan: "Free (limited depth)",
    kognity: "$300-1,200/yr",
    tutoring: "$2,000-6,000/yr",
    znotes: "Free (incomplete)",
    ai: "$0-240/yr (no curriculum)",
  },
];

const cellClass = (value: string) => {
  if (value.startsWith("[YES]")) return "text-green-700 font-semibold";
  if (value.startsWith("[PART]")) return "text-amber-700 font-semibold";
  if (value.startsWith("[NO]")) return "text-rose-700 font-semibold";
  return "text-slate-700";
};

const cleanCell = (value: string) => value.replace("[YES] ", "").replace("[PART] ", "").replace("[NO] ", "");

export default function WhyEduMeUp() {
  useEffect(() => {
    const prev = document.title;
    document.title = "How EduMeUp Is Different | EduMeUp";
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-white font-sans text-slate-700">
        <div className="flex flex-col xl:flex-row items-start">
          <PageSidebar
            title="Why EduMeUp"
            quote="Compare the architecture, not just the features."
            links={[
              { label: "The Problem", href: "#problem" },
              { label: "Our Solution", href: "#solution" },
              { label: "Key Differentiators", href: "#differentiators" },
              { label: "Competitor Comparison", href: "#comparison-table" },
              { label: "The Platform (Moodle)", href: "#platform" },
              { label: "For Schools", href: "#schools" },
              { label: "Get Started", href: "#cta" },
            ]}
          />

          <main className="flex-1 min-w-0">
            <section className="min-h-[620px] bg-gradient-to-br from-[#1E3A5F] to-[#2366c9] p-6 md:p-12 lg:px-[60px] lg:pb-[60px] relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.10),transparent_35%)]" />
              <div className="relative grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-8 items-center">
                <div>
                  <h1 className="text-white text-4xl md:text-5xl leading-[1.1] mb-4 font-bold">
                    Not Just Another EdTech Platform.
                    <br />
                    A Complete Cambridge Learning Ecosystem.
                  </h1>
                  <p className="text-white/90 text-base md:text-lg leading-[1.75] max-w-[760px] mb-7">
                    Most platforms deliver content. EduMeUp delivers mastery — built on how the human brain actually learns, and engineered specifically for Cambridge O-Level and IGCSE standards worldwide. The difference is not a feature. It is an architecture.
                  </p>
                  <div className="flex gap-3 flex-wrap">
                    <a href="#comparison-table" className="no-underline rounded-lg px-6 py-3 text-base font-bold inline-block bg-[#2366c9] text-white hover:bg-[#1a4fa0] transition-colors">
                      See the Comparison
                    </a>
                    <Link href="/how-it-works" className="no-underline rounded-lg px-6 py-3 text-base font-bold inline-block border-2 border-white/85 text-white hover:bg-white/10 transition-colors">
                      Explore How It Works
                    </Link>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-6">
                  <p className="text-xs uppercase tracking-[2px] text-blue-100 font-bold mb-3">Comparison Snapshot</p>
                  <div className="space-y-3">
                    {[
                      "Private tutoring only",
                      "Generic free-content platforms",
                      "Notes-only resources",
                      "Generic AI chatbots",
                      "Single-tool school products",
                    ].map((item) => (
                      <div key={item} className="rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white/55 line-through">
                        {item}
                      </div>
                    ))}
                    <div className="rounded-lg border border-[#2366c9]/50 bg-[#2366c9]/20 px-4 py-3 text-white font-semibold shadow-lg">
                      EduMeUp complete mastery architecture
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="problem" className="bg-[#eef6ff] p-8 md:p-[60px]">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">The Traditional Model Fails Most Learners — Quietly.</h2>
              <p className="text-slate-700 text-[17px] leading-[1.75] max-w-5xl mb-6">
                Most students study consistently, pay for tutoring, and attend thousands of hours of lessons — yet leave without durable mastery. Cambridge examination results confirm this every year. The problem is not effort. The problem is method.
              </p>
              <div className="bg-white border-l-4 border-[#2366c9] rounded-xl p-5 md:p-6 mb-8 shadow-sm">
                <p className="text-slate-700 leading-[1.75]">
                  Research Finding: The NTL Institute's Learning Pyramid shows that traditional teaching methods — lectures, textbooks, and audio-visual content — produce between 5% and 20% knowledge retention. Yet the majority of educational institutions and EdTech platforms are built on these methods. EduMeUp is built on the other 80%.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {problemCards.map((card) => (
                  <div key={card.title} className="group relative rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all">
                    <div className="h-2 w-full rounded-full bg-gradient-to-r from-[#1E3A5F] to-[#2366c9] mb-4" />
                    <h3 className="text-xl font-bold text-[#e86f51] mb-2">{card.title}</h3>
                    <p className="text-slate-700 leading-[1.7]">{card.description}</p>
                    <div className="pointer-events-none absolute inset-0 rounded-xl border border-[#17A589]/35 bg-white p-6 opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100">
                      <p className="text-sm leading-[1.7] text-slate-700">{card.hover}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="solution" className="bg-[#eef6ff] p-8 md:p-[60px]">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">We Built the Solution from the Ground Up.</h2>
              <p className="text-slate-700 text-[17px] leading-[1.75] max-w-5xl mb-6">
                EduMeUp's 10X Learning Leap Model is an 8-stage learning architecture engineered around cognitive science, retrieval practice, spaced repetition, and Cambridge examiner expectations. It is not a question bank. It is not an adaptive quiz. It is a complete, architecturally designed system — built so that everything a student studies stays with them until examination day and beyond.
              </p>
              <p className="text-slate-700 text-[17px] leading-[1.75] max-w-5xl mb-7">
                Every step is evidence-based. Every transition is sequenced. And unlike other platforms, the system is self-correcting — EduMeUp's proprietary AI intelligence system continuously monitors mastery levels and adjusts pathways in real time.
              </p>
              <Link href="/how-it-works" className="inline-block mb-8 text-[#1E3A5F] font-bold hover:text-[#2366c9] transition-colors">
                Read the full methodology →
              </Link>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <div className="text-3xl font-bold text-[#1E3A5F] mb-1">5% to 75%+</div>
                  <div className="font-semibold text-slate-900 mb-1">Learning Retention Transformation</div>
                  <div className="text-sm text-slate-600">Passive study vs EduMeUp spaced retrieval after 90 days.</div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <div className="text-3xl font-bold text-[#1E3A5F] mb-1">80%</div>
                  <div className="font-semibold text-slate-900 mb-1">Mastery Gate — No Gaps Left Behind</div>
                  <div className="text-sm text-slate-600">Students cannot advance until genuine mastery is achieved.</div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <div className="text-3xl font-bold text-[#1E3A5F] mb-1">24/7</div>
                  <div className="font-semibold text-slate-900 mb-1">AI Study Advisor Availability</div>
                  <div className="text-sm text-slate-600">Examiner-level guidance for every enrolled subject.</div>
                </div>
              </div>
            </section>

            <section id="differentiators" className="p-8 md:p-[60px] bg-white">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">What Makes EduMeUp Different — In Detail.</h2>
              <p className="text-slate-700 text-[17px] leading-[1.75] max-w-5xl mb-8">
                Every feature below is built around one goal: ensuring that every student achieves Cambridge-level mastery, not just Cambridge-level exposure.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {differentiators.map((card) => (
                  <div key={card.title} className="group relative rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all overflow-hidden">
                    <div className="px-5 py-3 bg-gradient-to-r from-[#1E3A5F] to-[#2366c9] text-white font-bold tracking-wide text-sm">
                      [{card.badge}] {card.title}
                    </div>
                    <div className="p-5">
                      <p className="text-slate-700 leading-[1.7]">{card.description}</p>
                    </div>
                    <div className="pointer-events-none absolute inset-0 bg-white p-5 opacity-0 transition-opacity duration-200 group-hover:opacity-100 border border-[#17A589]/35">
                      <p className="text-sm text-slate-700 leading-[1.7]">{card.hover}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="comparison-table" className="p-8 md:p-[60px] bg-white">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Not All Cambridge Preparation Is Equal. Here Is the Evidence.</h2>
              <p className="text-slate-700 text-[17px] leading-[1.75] max-w-5xl mb-6">
                Every claim in this table reflects specific, implemented platform features — not aspirational marketing.
              </p>

              <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
                <table className="min-w-[1200px] w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="sticky left-0 z-20 min-w-[280px] bg-slate-100 border-b border-r border-slate-200 px-4 py-3 text-left font-bold text-slate-900">Feature / Capability</th>
                      <th className="sticky left-[280px] z-20 min-w-[220px] bg-[#2366c9] border-b border-r border-slate-200 px-4 py-3 text-left font-bold text-white">EduMeUp</th>
                      <th className="border-b border-r border-slate-200 px-4 py-3 text-left font-bold text-slate-900">Khan Academy</th>
                      <th className="border-b border-r border-slate-200 px-4 py-3 text-left font-bold text-slate-900">Kognity / GCSEPod</th>
                      <th className="border-b border-r border-slate-200 px-4 py-3 text-left font-bold text-slate-900">Generic Tutoring</th>
                      <th className="border-b border-r border-slate-200 px-4 py-3 text-left font-bold text-slate-900">ZNotes / PMT</th>
                      <th className="border-b border-slate-200 px-4 py-3 text-left font-bold text-slate-900">Generic AI Chatbots</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row) => (
                      <tr key={row.feature} className="odd:bg-white even:bg-slate-50/50">
                        <td className="sticky left-0 z-10 bg-inherit border-r border-b border-slate-200 px-4 py-3 text-slate-800 font-medium">{row.feature}</td>
                        <td className="sticky left-[280px] z-10 bg-[#eef6ff] border-r border-b border-slate-200 px-4 py-3">
                          <span className={cellClass(row.edumeup)}>{cleanCell(row.edumeup)}</span>
                        </td>
                        <td className="border-r border-b border-slate-200 px-4 py-3"><span className={cellClass(row.khan)}>{cleanCell(row.khan)}</span></td>
                        <td className="border-r border-b border-slate-200 px-4 py-3"><span className={cellClass(row.kognity)}>{cleanCell(row.kognity)}</span></td>
                        <td className="border-r border-b border-slate-200 px-4 py-3"><span className={cellClass(row.tutoring)}>{cleanCell(row.tutoring)}</span></td>
                        <td className="border-r border-b border-slate-200 px-4 py-3"><span className={cellClass(row.znotes)}>{cleanCell(row.znotes)}</span></td>
                        <td className="border-b border-slate-200 px-4 py-3"><span className={cellClass(row.ai)}>{cleanCell(row.ai)}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                <span className="font-semibold">Legend:</span> [YES] Fully available | [PART] Partial or limited | [NO] Not available
              </div>
              <p className="mt-4 text-sm text-slate-600 leading-[1.7]">
                This comparison is based on publicly available information at the time of publication. EduMeUp invites scrutiny — every claim in the EduMeUp column reflects a specific, implemented platform feature that can be demonstrated.
              </p>
            </section>

            <section id="platform" className="p-8 md:p-[60px] bg-[#f8fbff]">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Most Cambridge EdTech Platforms Use Lightweight Infrastructure. EduMeUp Uses an Enterprise LMS.</h2>
              <p className="text-slate-700 text-[17px] leading-[1.75] max-w-5xl mb-8">
                EduMeUp is built on Moodle 5.2 — the world's most widely deployed open-source LMS. This infrastructure enables mastery gates, rich analytics, and AI-assisted personalization at scale.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <h3 className="text-lg font-bold text-[#1E3A5F] mb-2">Mastery Gates and Competency Tracking</h3>
                  <p className="text-slate-700 leading-[1.7]">Moodle enforces 80% mastery progression and tracks AO1/AO2/AO3 competencies per topic.</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <h3 className="text-lg font-bold text-[#1E3A5F] mb-2">H5P Native Integration</h3>
                  <p className="text-slate-700 leading-[1.7]">Interactive content runs natively with 12+ activity types — no fragmented learning stack.</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <h3 className="text-lg font-bold text-[#1E3A5F] mb-2">AI Integration via API</h3>
                  <p className="text-slate-700 leading-[1.7]">EduMeUp's proprietary AI intelligence system integrates with progress, scores, and schedules for real-time recommendations.</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <h3 className="text-lg font-bold text-[#1E3A5F] mb-2">White-Label for Schools</h3>
                  <p className="text-slate-700 leading-[1.7]">School identity is preserved with custom name, logo, and domain while EduMeUp powers the infrastructure.</p>
                </div>
              </div>
            </section>

            <section id="schools" className="p-8 md:p-[60px] bg-[#f8fbff] border-t border-slate-200">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">EduMeUp Is a School Partner — Not a Franchise.</h2>
              <p className="text-slate-700 text-[17px] leading-[1.75] max-w-5xl mb-6">
                EduMeUp supports schools with 24 services across teacher capacity-building, classroom empowerment, student development, and exam preparation infrastructure — with implementation support from Day 1.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-7">
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <p className="font-bold text-[#1E3A5F] mb-2">A: Capacity Building of Teachers</p>
                  <p className="text-slate-700 text-sm leading-[1.7]">T1-T6 pathway, subject mastery, examiner intelligence, AI teaching tools, and classroom communication.</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <p className="font-bold text-[#1E3A5F] mb-2">B: Empowering Teachers</p>
                  <p className="text-slate-700 text-sm leading-[1.7]">Curriculum planning support, H5P content, auto-assessment, and expert implementation support.</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <p className="font-bold text-[#1E3A5F] mb-2">C: Student Skill Development</p>
                  <p className="text-slate-700 text-sm leading-[1.7]">Must-Have courses, English pathway, Pre-O-Level, Bridge courses, and holiday programs.</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <p className="font-bold text-[#1E3A5F] mb-2">D: Student Learning & Exam Prep</p>
                  <p className="text-slate-700 text-sm leading-[1.7]">Diagnostics, subject courses, ATP, mock exams, retrieval practice, AI advisor, parent dashboard, and school analytics.</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <p className="text-slate-700 font-medium">Most schools are fully operational within 14 days of first contact.</p>
                <Link href="/for-schools" className="inline-block rounded-lg border border-[#1E3A5F] bg-white px-5 py-2.5 text-sm font-bold text-[#1E3A5F] hover:bg-[#2366c9] hover:text-white transition-colors">
                  Explore the full school partnership
                </Link>
              </div>
            </section>

            <section id="cta" className="bg-[#2366c9] p-8 md:p-[60px]">
              <h2 className="text-3xl font-bold text-white text-center mb-3">Ready to Experience the Difference?</h2>
              <p className="text-white/85 text-center text-[17px] leading-[1.75] max-w-4xl mx-auto mb-8">
                The free diagnostic is the fastest way to see EduMeUp in action — and identify exactly what to study next.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-7">
                <div className="rounded-xl border border-white/20 bg-white/10 p-5 text-white">
                  <h3 className="text-lg font-bold mb-2">Take the Free Diagnostic</h3>
                  <p className="text-sm text-white/85 mb-4">30 minutes. No credit card. Know your exact gaps before spending anything.</p>
                  <Link href="/diagnostics">
                    <Button className="w-full bg-[#2366c9] hover:bg-[#1a4fa0] text-white font-bold">Start Free Diagnostic</Button>
                  </Link>
                </div>
                <div className="rounded-xl border border-white/20 bg-white/10 p-5 text-white">
                  <h3 className="text-lg font-bold mb-2">Browse All Courses</h3>
                  <p className="text-sm text-white/85 mb-4">10 O-Level subjects, ATP, Pre-O-Level, and English pathways.</p>
                  <Link href="/olevel-subjects">
                    <Button variant="outline" className="w-full border-white/70 text-white hover:bg-white hover:text-[#2366c9] font-bold">Browse Courses</Button>
                  </Link>
                </div>
                <div className="rounded-xl border border-white/20 bg-white/10 p-5 text-white">
                  <h3 className="text-lg font-bold mb-2">Explore School Partnership</h3>
                  <p className="text-sm text-white/85 mb-4">See all 24 services, onboarding flow, and implementation model.</p>
                  <Link href="/for-schools">
                    <Button variant="outline" className="w-full border-white/70 text-white hover:bg-white hover:text-[#2366c9] font-bold">For Schools</Button>
                  </Link>
                </div>
              </div>

              <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white/95 leading-[1.8]">
                91% Pass Rate — Designed to Achieve | Available Worldwide — All Prices in USD | 3-Week Money-Back Guarantee | Global Access Scholarship — up to 40% off for qualifying countries | AI Advisor Included — all enrolled subjects | Access Begins Immediately After Payment
              </div>
            </section>
          </main>
        </div>
      </div>
    </Layout>
  );
}
