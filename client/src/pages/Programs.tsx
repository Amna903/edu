import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { ui } from "@/theme";
import {
  Target,
  BookOpen,
  Star,
  Award,
  GitBranch,
  Languages,
  NotebookPen,
  Files,
  FlaskConical,
  Monitor,
  FileCheck2,
  BookMarked,
  UserRound,
  School,
  GraduationCap,
  ClipboardList,
} from "lucide-react";

type TabKey = "cambridge" | "pakistan";
type Audience = "all" | "students" | "parents" | "teachers" | "schools";

type ProgramCard = {
  id: string;
  icon: keyof typeof iconMap;
  title: string;
  description: string;
  count: string;
  audienceBadge: string;
  audience: Audience[];
  sellingLine: string;
  href: string;
  accent: string;
};

const iconMap = {
  target: Target,
  book: BookOpen,
  star: Star,
  award: Award,
  bridge: GitBranch,
  language: Languages,
  notebook: NotebookPen,
  files: Files,
  flask: FlaskConical,
  monitor: Monitor,
  mock: FileCheck2,
  workbook: BookMarked,
  tutor: UserRound,
  school: School,
  grad: GraduationCap,
  clipboard: ClipboardList,
};

const stakeholders: Array<{ key: Audience; label: string }> = [
  { key: "all", label: "All" },
  { key: "students", label: "Students" },
  { key: "parents", label: "Parents" },
  { key: "teachers", label: "Teachers" },
  { key: "schools", label: "Schools" },
];

const cambridgeCards: ProgramCard[] = [
  { id: "diagnostics", icon: "target", title: "Diagnostic Services", description: "AI-powered gap analysis before you study anything. Free and paid options.", count: "10 services — D1 to D10", audienceBadge: "All", audience: ["all"], sellingLine: "Identify your exact gaps before investing a single hour of study time.", href: "/programs/diagnostics", accent: "#EA580C" },
  { id: "lower-secondary", icon: "book", title: "Lower Secondary — Grade 6 to 8", description: "Five subjects. All three grade levels in one enrolment. Self-learning and tutor-guided.", count: "5 subjects — Maths, Physics, Chemistry, Biology, English", audienceBadge: "Students Gr 6–8", audience: ["students", "parents"], sellingLine: "Build the foundation that makes O-Level possible — one subject at a time.", href: "/programs/lower-secondary", accent: "#2563EB" },
  { id: "must-have", icon: "star", title: "Must-Have Courses", description: "Research-backed foundational skills every student needs before subject study begins.", count: "4 courses — Learn How to Learn, Vocab 5–7, RC 6–8, Classroom English", audienceBadge: "All Students", audience: ["students", "parents"], sellingLine: "The skills that make every other course more effective.", href: "/programs/must-have", accent: "#7C3AED" },
  { id: "pre-olevel", icon: "award", title: "Pre-O-Level Certification", description: "Complete a Bridge Course and pass the certification exam to earn your EduMeUp readiness certificate.", count: "4 subjects — English, Mathematics, Physics, Chemistry", audienceBadge: "Bridge Students", audience: ["students", "parents"], sellingLine: "Formally confirm you are ready for O-Level. EduMeUp internal qualification.", href: "/certification", accent: "#D97706" },
  { id: "bridge-courses", icon: "bridge", title: "Bridge Courses", description: "Pre-O-Level foundation courses — the last step before O-Level subject content begins.", count: "5 subjects — English, Mathematics, Physics, Chemistry, Economics", audienceBadge: "Gr 8 → O-Level", audience: ["students", "parents"], sellingLine: "Every Bridge Course includes the Pre-O-Level Certification Exam.", href: "/programs/bridge", accent: "#0F766E" },
  { id: "english", icon: "language", title: "English Language Pathway", description: "The only end-to-end English pathway — Vocab 5–7 through to Cambridge O-Level mastery.", count: "12 courses — Vocab, RC, ESL1, ESL2, Bridge, O-Level, Writing, Comprehension", audienceBadge: "All English Levels", audience: ["students", "parents"], sellingLine: "Free AI Diagnostic tells you exactly which course to start from.", href: "/programs/english", accent: "#4F46E5" },
  { id: "olevel-subjects", icon: "notebook", title: "O-Level Subject Courses", description: "Ten subjects. 114 topic courses. Each topic follows the 8-step mastery cycle.", count: "10 subjects — Maths, Physics, Chemistry, Biology, Economics, Business, Pak Studies, Islamiyat, Urdu, English", audienceBadge: "O-Level Students", audience: ["students", "parents"], sellingLine: "Enrol in one topic, several, or the full subject.", href: "/programs/o-level-subjects", accent: "#0EA5E9" },
  { id: "chapter-wise", icon: "files", title: "Chapter-wise Courses", description: "Purchase a complete course for any single chapter of any O-Level subject.", count: "1 service — any subject, any chapter", audienceBadge: "O-Level Students", audience: ["students", "parents"], sellingLine: "Targeted catch-up on exactly the chapter you need.", href: "/programs/chapter-wise", accent: "#9333EA" },
  { id: "atp", icon: "flask", title: "ATP Courses", description: "Alternative to Practical preparation for Physics, Chemistry and Biology.", count: "3 courses — Physics ATP, Chemistry ATP, Biology ATP", audienceBadge: "O-Level Science", audience: ["students", "parents", "teachers"], sellingLine: "No lab equipment needed. Full virtual preparation for Cambridge Paper 4.", href: "/programs/atp", accent: "#059669" },
  { id: "exam-prep", icon: "monitor", title: "Online Exam Preparation", description: "Structured online exam preparation sessions for each O-Level subject.", count: "7 subjects — Maths, Physics, Chemistry, Biology, Economics, English, Business", audienceBadge: "O-Level Students", audience: ["students", "parents"], sellingLine: "Topic-wise practice, past paper sessions and error analysis.", href: "/programs/exam-prep", accent: "#EA580C" },
  { id: "mock-exams", icon: "mock", title: "Final Mock Exams with Detailed Reports", description: "Full Cambridge-format timed mock examinations. AI report: AO scores, error analysis, predicted grade.", count: "7 subjects — Maths, Physics, Chemistry, Biology, Economics, English, Business", audienceBadge: "O-Level Students", audience: ["students", "parents"], sellingLine: "Simulate the real examination. Know your grade before exam day.", href: "/programs/mock-exams", accent: "#2563EB" },
  { id: "workbooks", icon: "workbook", title: "Workbooks and Downloads", description: "Digitally downloadable workbooks — chapter-wise, topical past papers and year-wise past papers.", count: "3 workbook types — all O-Level subjects", audienceBadge: "O-Level Students", audience: ["students", "parents", "teachers"], sellingLine: "Enhanced solutions available on-platform. Download and study anywhere.", href: "/programs/workbooks", accent: "#0D9488" },
  { id: "tutors", icon: "tutor", title: "Tutor Booking", description: "Book a certified EduMeUp tutor for one-to-one or small group online sessions.", count: "2 options — one-to-one and small group sessions", audienceBadge: "All Students", audience: ["students", "parents"], sellingLine: "Human expertise when you need it — booked from your dashboard.", href: "/programs/tutors", accent: "#7C3AED" },
  { id: "teacher-dev", icon: "school", title: "Teacher and Professional Development", description: "Subject knowledge diagnostics, Cambridge workshops, SMK training, tutor certification and AI teaching tools.", count: "7 services — T1 to T6 + Classroom English Teacher Edition", audienceBadge: "Teachers / Schools", audience: ["teachers", "schools"], sellingLine: "Cambridge examiner intelligence. CPD certificate. AI teaching tools.", href: "/programs/teacher", accent: "#0F766E" },
];

const pakistanTopCards: ProgramCard[] = [
  { id: "pk-matric", icon: "book", title: "Pakistan Matric Programme", description: "Complete preparation for Grade 9 and Grade 10 Matric students following the Federal and Provincial Matric syllabus.", count: "Programme Group", audienceBadge: "Matric Students", audience: ["students", "parents"], sellingLine: "Structured Matric coverage with topic clarity and exam alignment.", href: "/programs/pakistan#matric", accent: "#15803D" },
  { id: "pk-fsc", icon: "book", title: "Pakistan FSc and ICS Programme", description: "Full science subject preparation for FSc Year 1 and Year 2 (Pre-Medical, Pre-Engineering) and ICS Year 2.", count: "Programme Group", audienceBadge: "FSc / ICS Students", audience: ["students", "parents"], sellingLine: "Build board-level mastery with clear technique and timed practice.", href: "/programs/pakistan#fsc", accent: "#B45309" },
  { id: "pk-ecat", icon: "grad", title: "ECAT — Engineering Colleges Admission Test", description: "Comprehensive ECAT preparation — Mathematics, Physics and Chemistry. Topic coverage, timed practice tests and AI performance analysis.", count: "Programme Group", audienceBadge: "ECAT Candidates", audience: ["students", "parents"], sellingLine: "Exam-ready ECAT preparation with speed, accuracy, and confidence.", href: "/programs/pakistan#ecat", accent: "#B91C1C" },
];

const pakistanServiceCards: ProgramCard[] = [
  { id: "pk-ex-mat", icon: "monitor", title: "Online Exam Preparation — Matric Mathematics", description: "Intensive online preparation for Matric Mathematics (Grade 9 and 10). Topic-wise practice, past paper sessions and error analysis aligned to Matric marking standards.", count: "PK-EX-MAT", audienceBadge: "Matric Students", audience: ["students", "parents"], sellingLine: "Focused Matric Maths preparation with better exam control.", href: "/programs/pakistan#pk-ex-mat", accent: "#0EA5E9" },
  { id: "pk-ex-fsc", icon: "monitor", title: "Online Exam Preparation — FSc / ICS Core Subjects", description: "Online preparation for FSc and ICS core science subjects. Structured question technique, timed practice and AI feedback aligned to Inter Board standards.", count: "PK-EX-FSC", audienceBadge: "FSc / ICS Students", audience: ["students", "parents"], sellingLine: "Board-style technique and timed practice for stronger marks.", href: "/programs/pakistan#pk-ex-fsc", accent: "#2563EB" },
  { id: "pk-ex-ecat", icon: "monitor", title: "Online Exam Preparation — ECAT", description: "Targeted online preparation for the ECAT — timed topic tests, full mock tests and AI gap analysis.", count: "PK-EX-ECAT", audienceBadge: "ECAT Candidates", audience: ["students", "parents"], sellingLine: "Tackle ECAT with guided speed and precision.", href: "/programs/pakistan#pk-ex-ecat", accent: "#0891B2" },
  { id: "pk-mk-mat", icon: "clipboard", title: "Final Mock Exam + Report — Matric Mathematics", description: "Full time-bound mock for Matric Mathematics in the exact Matric paper format. AI report: section scores, common errors, marks by topic.", count: "PK-MK-MAT", audienceBadge: "Matric Students", audience: ["students", "parents"], sellingLine: "See your real exam readiness before test day.", href: "/programs/pakistan#pk-mk-mat", accent: "#EA580C" },
  { id: "pk-mk-fsc", icon: "clipboard", title: "Final Mock Exam + Report — FSc / ICS Core Subjects", description: "Full time-bound mock examinations for FSc and ICS Physics, Chemistry and Mathematics. AI report: AO analysis and final revision guidance.", count: "PK-MK-FSC", audienceBadge: "FSc / ICS Students", audience: ["students", "parents"], sellingLine: "Pinpoint weak areas and revise with precision.", href: "/programs/pakistan#pk-mk-fsc", accent: "#DC2626" },
  { id: "pk-mk-ecat", icon: "clipboard", title: "Final ECAT Mock Exam + Report", description: "Full time-bound ECAT mock — MCQ format matching actual ECAT paper. AI report: subject-level scores, accuracy rate, time management analysis.", count: "PK-MK-ECAT", audienceBadge: "ECAT Candidates", audience: ["students", "parents"], sellingLine: "Practice the real ECAT rhythm before the real paper.", href: "/programs/pakistan#pk-mk-ecat", accent: "#9333EA" },
];

function Card({ card }: { card: ProgramCard }) {
  const Icon = iconMap[card.icon];
  return (
    <article
      id={card.id}
      data-audience={card.audience.join(",")}
      className="group rounded-xl border border-[#dbe7f4] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)]"
      style={{ borderTopWidth: "4px", borderTopColor: card.accent }}
    >
      <div className="mb-1">
        <Icon className="h-8 w-8" style={{ color: card.accent }} />
      </div>
      <h3 className="mt-3 text-lg font-semibold text-slate-900" style={{ color: card.accent }}>
        {card.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm text-slate-700">{card.description}</p>
      <p className="mt-3 text-[13px] italic text-slate-600">{card.count}</p>
      <span className="mt-3 inline-block rounded-full bg-[#2366c9] px-3 py-1 text-xs text-white">{card.audienceBadge}</span>
      <p className="mt-3 text-sm italic text-slate-700">{card.sellingLine}</p>
      <a href={card.href} className="mt-4 inline-block text-[13px] font-bold text-[#F97316]">
        Browse {card.title} →
      </a>
    </article>
  );
}

export default function Programs() {
  const [location, setLocation] = useLocation();
  const [tab, setTab] = useState<TabKey>("cambridge");
  const [audience, setAudience] = useState<Audience>("all");

  useEffect(() => {
    const params = new URLSearchParams(location.split("?")[1] || "");
    setTab(params.get("tab") === "pakistan" ? "pakistan" : "cambridge");
  }, [location]);

  useEffect(() => {
    const title = "All Programs Directory | EduMeUp";
    document.title = title;
  }, []);

  const filteredCambridge = useMemo(() => {
    if (audience === "all") return cambridgeCards;
    return cambridgeCards.filter((c) => c.audience.includes(audience));
  }, [audience]);

  const filteredPakistanTop = useMemo(() => {
    if (audience === "all") return pakistanTopCards;
    return pakistanTopCards.filter((c) => c.audience.includes(audience));
  }, [audience]);

  const filteredPakistanServices = useMemo(() => {
    if (audience === "all") return pakistanServiceCards;
    return pakistanServiceCards.filter((c) => c.audience.includes(audience));
  }, [audience]);

  const switchTab = (nextTab: TabKey) => {
    setTab(nextTab);
    const nextUrl = nextTab === "pakistan" ? "/programs?tab=pakistan" : "/programs";
    setLocation(nextUrl);
  };

  const currentAnchors = tab === "cambridge"
    ? cambridgeCards.map((c) => ({ label: c.title, id: c.id }))
    : [
        { label: "Pakistan Matric Programme", id: "pk-matric" },
        { label: "Pakistan FSc and ICS Programme", id: "pk-fsc" },
        { label: "ECAT Programme", id: "pk-ecat" },
        { label: "Pakistan Exam Services", id: "pk-services" },
      ];

  return (
    <Layout>
      <section className="bg-white py-10 md:py-14">
        <div className="container-custom max-w-7xl">
          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#2366c9]">EduMeUp | Cambridge O-Level / IGCSE | Pakistan Curriculum</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-900 md:text-5xl">All Programmes — Find Exactly What You Need</h1>
          <p className="mt-4 max-w-4xl text-slate-700">
            From Grade 5 vocabulary foundation through to O-Level subject mastery, mock exams and teacher development — every EduMeUp programme is listed here.
            Use the tabs to switch between Cambridge and Pakistan Curriculum programmes. Use the filter to find what is right for your role.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a href="/diagnostics" className="rounded-md bg-[#2366c9] px-5 py-3 text-sm font-semibold text-white">
              TAKE FREE DIAGNOSTIC — FIND YOUR STARTING POINT
            </a>
            <p className="text-sm text-slate-600">
              Already know what you need? Jump to:
              {" "}
              <a href="#diagnostics" className="font-semibold text-[#2366c9]">Diagnostics</a>
              {" | "}
              <a href="#lower-secondary" className="font-semibold text-[#2366c9]">Lower Secondary</a>
              {" | "}
              <a href="#bridge-courses" className="font-semibold text-[#2366c9]">Bridge Courses</a>
              {" | "}
              <a href="#olevel-subjects" className="font-semibold text-[#2366c9]">O-Level Subjects</a>
              {" | "}
              <a href="#english" className="font-semibold text-[#2366c9]">English Pathway</a>
              {" | "}
              <a href="#atp" className="font-semibold text-[#2366c9]">ATP</a>
              {" | "}
              <a href="#mock-exams" className="font-semibold text-[#2366c9]">Mock Exams</a>
              {" | "}
              <a href="/programs?tab=pakistan" className="font-semibold text-[#2366c9]">Pakistan Curriculum</a>
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-8">
        <div className="container-custom max-w-7xl grid grid-cols-1 gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            <div className={ui.cards.standard + " p-4"}>
              <h3 className="text-sm font-semibold text-slate-900">Not sure where to start?</h3>
              <p className="mt-2 text-sm text-slate-600">The free AI Diagnostic identifies your exact gaps and recommends which programme to begin with.</p>
              <a href="/diagnostics" className="mt-3 block rounded-md bg-[#2366c9] px-3 py-2 text-center text-sm font-semibold text-white">TAKE FREE DIAGNOSTIC</a>
            </div>

            <div className={ui.cards.standard + " p-4"}>
              <h3 className="text-sm font-semibold text-slate-900">Jump to what is right for you</h3>
              <div className="mt-2 space-y-2 text-sm">
                <button className="block text-left text-[#2366c9]" onClick={() => setAudience("students")}>I am a Student →</button>
                <button className="block text-left text-[#2366c9]" onClick={() => setAudience("parents")}>I am a Parent →</button>
                <button className="block text-left text-[#2366c9]" onClick={() => setAudience("teachers")}>I am a Teacher →</button>
                <a className="block text-[#2366c9]" href="/for-schools">I represent a School →</a>
              </div>
            </div>

            <div className={ui.cards.standard + " p-4"}>
              <h3 className="text-sm font-semibold text-slate-900">Section Links</h3>
              <div className="mt-2 space-y-2 text-sm">
                {currentAnchors.map((anchor) => (
                  <button
                    key={anchor.id}
                    onClick={() => document.getElementById(anchor.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
                    className="block text-left text-[#2366c9]"
                  >
                    {anchor.label}
                  </button>
                ))}
              </div>
            </div>

            <div className={ui.cards.standard + " p-4 text-sm text-slate-700"}>
              Want to see all prices in one place?{" "}
              <a href="/pricing" className="font-semibold text-[#2366c9]">View Pricing Page</a>
            </div>
          </aside>

          <main className="space-y-6">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button onClick={() => switchTab("cambridge")} className={`rounded-lg px-4 py-3 text-sm font-semibold ${tab === "cambridge" ? "bg-[#2366c9] text-white" : "border border-[#dbe7f4] bg-white text-slate-700"}`}>
                Cambridge / IGCSE Programmes
              </button>
              <button onClick={() => switchTab("pakistan")} className={`rounded-lg px-4 py-3 text-sm font-semibold ${tab === "pakistan" ? "bg-[#2366c9] text-white" : "border border-[#dbe7f4] bg-white text-slate-700"}`}>
                Pakistan Curriculum Programmes
              </button>
            </div>

            <div className="overflow-x-auto">
              <div className="inline-flex min-w-full gap-2">
                {stakeholders.map((option) => (
                  <button
                    key={option.key}
                    onClick={() => setAudience(option.key)}
                    className={`rounded-full px-4 py-2 text-sm font-medium ${audience === option.key ? "bg-[#2366c9] text-white" : "border border-[#dbe7f4] bg-white text-slate-700"}`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {tab === "cambridge" && (
              <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredCambridge.map((card) => <Card key={card.id} card={card} />)}
              </section>
            )}

            {tab === "pakistan" && (
              <section className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {filteredPakistanTop.map((card) => <Card key={card.id} card={card} />)}
                </div>
                <h2 id="pk-services" className="text-xl font-semibold text-slate-900">Online Exam Preparation and Final Mock Exams — Matric, FSc / ICS, ECAT</h2>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {filteredPakistanServices.map((card) => <Card key={card.id} card={card} />)}
                </div>
              </section>
            )}

            <section className="rounded-[2rem] bg-[#2366c9] px-6 py-8 text-white">
              <h2 className="text-2xl font-semibold">Not Sure Which Programme Is Right for You?</h2>
              <p className="mt-3 max-w-4xl text-sm text-slate-100">
                Take the free AI Diagnostic — 30 minutes, no account required. It identifies exactly where you are, which programme matches your current level, and what to study first.
                Or browse the full programme list above and enrol directly.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href="/diagnostics" className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-[#2366c9]">TAKE FREE DIAGNOSTIC</a>
                <a href="/pricing" className="rounded-md border border-white/60 px-4 py-2 text-sm font-semibold text-white">VIEW PRICING — ALL PROGRAMMES</a>
                <Link href="/contact?type=general" className="self-center text-sm font-medium text-slate-100 underline">Have a question? Chat with us on WhatsApp →</Link>
              </div>
            </section>
          </main>
        </div>
      </section>
    </Layout>
  );
}
