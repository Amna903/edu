import { useEffect } from "react";
import { Link } from "wouter";
import { CheckCircle2, ClipboardList, GraduationCap, School, UserCheck } from "lucide-react";
import { Layout } from "@/components/Layout";

type DiagnosticCard = {
  id: number;
  title: string;
  description: string;
  duration: string;
  audience: string;
  cta: string;
  href: string;
};

const diagnosticCards: DiagnosticCard[] = [
  {
    id: 1,
    title: "O-Level Bridge Diagnostic",
    description:
      "Assesses your readiness across 5 core O-Level subjects: English, Chemistry, Physics, Mathematics, and Economics. Identify gaps before you begin O-Level study.",
    duration: "40-60 min",
    audience: "Students Gr 6+",
    cta: "Start Diagnostic",
    href: "/diagnostics/start?type=1",
  },
  {
    id: 2,
    title: "English Level Check",
    description:
      "Find your exact English level - from A2 to B2. EduMeUp assesses your vocabulary, reading, and writing foundations and recommends exactly where to begin your English pathway.",
    duration: "40-60 min",
    audience: "Students Gr 6+",
    cta: "Check My Level",
    href: "/diagnostics/start?type=2",
  },
  {
    id: 3,
    title: "O-Level Subject Diagnostic",
    description:
      "Take a full diagnostic in any of EduMeUp's 10 Cambridge O-Level subjects. Identify topic-by-topic gaps in a single subject.",
    duration: "40-60 min",
    audience: "Students Gr 6+",
    cta: "Choose Subject",
    href: "/diagnostics/start?type=3",
  },
  {
    id: 4,
    title: "ATP Diagnostic",
    description:
      "A past-paper-based assessment for Cambridge Physics, Chemistry, or Biology. Reveals which ATP topics need the most attention before your Cambridge examination.",
    duration: "40-60 min",
    audience: "Students Gr 6+ (ideally Gr 9-10)",
    cta: "Start ATP Diagnostic",
    href: "/diagnostics/start?type=4",
  },
  {
    id: 5,
    title: "Teacher Subject Knowledge Diagnostic",
    description:
      "For teachers joining the EduMeUp network. A full subject knowledge assessment - the T1 Teacher Diagnostic. First attempt is free. Pass mark: 81%.",
    duration: "40-60 min",
    audience: "Teachers applying to tutor",
    cta: "Go to T1 Diagnostic",
    href: "/teacher-courses#t1",
  },
  {
    id: 6,
    title: "School Class-Level Diagnostic",
    description:
      "A class-wide diagnostic for all students in one class simultaneously. Generates a class-level gap report for the teacher AND individual student reports. Arranged for partner schools.",
    duration: "40-60 min per student",
    audience: "Partner schools",
    cta: "Contact Us to Arrange",
    href: "/contact",
  },
];

const howItWorks = [
  {
    title: "Choose your diagnostic",
    description:
      "Select the diagnostic type and subject from the list. For the English Level Check, confirm your grade and the system routes you to the right level automatically.",
  },
  {
    title: "Take the assessment",
    description:
      "Answer interactive questions over 40-60 minutes. Written response sections are included where relevant.",
  },
  {
    title: "Receive your full report",
    description:
      "Immediately on completion: your full detailed report is generated with score, topic-by-topic gap analysis, CEFR level (for English), remedial action list, and recommended resources.",
  },
  {
    title: "Take recommended actions",
    description:
      "Your report tells you exactly what to do next - which topics to focus on, which EduMeUp courses address your gaps, and in what order to tackle them.",
  },
  {
    title: "Re-test when ready",
    description:
      "After working on your recommended resources, you can take a follow-up diagnostic to measure improvement. Follow-up diagnostics are $18 per subject.",
  },
];

export default function Diagnostics() {
  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") || "";

    document.title = "Cambridge Diagnostic Tests | Find Your Learning Gaps | EduMeUp";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Free Cambridge O-Level diagnostic test - full detailed report in 40-60 minutes. Identify your exact knowledge gaps before you start. Grade 6+. No registration required.",
      );
    }

    return () => {
      document.title = previousTitle;
      if (metaDescription) {
        metaDescription.setAttribute("content", previousDescription);
      }
    };
  }, []);

  return (
    <Layout>
      <section className="border-b border-[#dbe4ef] bg-white">
        <div className="container-custom flex flex-wrap items-center gap-3 py-3 text-sm">
          <Link href="/" className="font-semibold text-[#2366c9] hover:underline">
            Home
          </Link>
          <span className="text-slate-400">/</span>
          <Link href="/diagnostics" className="font-semibold text-[#2366c9] hover:underline">
            Diagnostic Services
          </Link>
          <span className="text-slate-400">/</span>
          <Link href="/diagnostics/start" className="font-semibold text-[#2366c9] hover:underline">
            Start Flow
          </Link>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl text-center">
            <h1 className="text-4xl font-bold text-[#2366c9] md:text-5xl">Find Your Exact Starting Point.</h1>
            <p className="mx-auto mt-4 max-w-3xl text-base text-slate-600">
              EduMeUp diagnostics identify precisely which topics and subjects you need to focus on - so you study smarter, not harder. One free full diagnostic included. No registration required.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-[#dbe4ef] bg-[#eef6ff] py-8">
        <div className="container-custom">
          <div className="rounded-2xl border border-[#dbe4ef] bg-white p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#2366c9]">One Free Full Diagnostic - No Registration Required</p>
            <p className="mt-3 text-slate-700">
              Your free diagnostic is a full 40-60 minute subject assessment with a complete detailed report - the same quality report every EduMeUp student receives. Not a brief summary. Not a teaser. The real thing.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-700">
              <span className="rounded-full bg-[#eef6ff] px-3 py-1">One free per student</span>
              <span className="rounded-full bg-[#eef6ff] px-3 py-1">40-60 minutes</span>
              <span className="rounded-full bg-[#eef6ff] px-3 py-1">Full detailed report</span>
              <span className="rounded-full bg-[#eef6ff] px-3 py-1">Immediate results</span>
              <span className="rounded-full bg-[#eef6ff] px-3 py-1">Grade 6 minimum</span>
            </div>
            <Link href="/diagnostics/start" className="mt-6 inline-flex items-center rounded-lg bg-[#2366c9] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1d57aa]">
              Start My Free Diagnostic
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container-custom">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {diagnosticCards.map((card) => (
              <article key={card.id} className="flex h-full flex-col rounded-2xl border border-[#dbe4ef] bg-white p-6 shadow-sm">
                <div className="mb-4 inline-flex w-fit rounded-full bg-[#2366c9]/12 px-3 py-1 text-xs font-semibold text-[#2366c9]">Type {card.id}</div>
                <h2 className="text-xl font-semibold text-[#2366c9]">{card.title}</h2>
                <p className="mt-3 flex-1 text-sm text-slate-600">{card.description}</p>
                <div className="mt-4 space-y-1 text-sm text-slate-700">
                  <p>
                    <strong>Duration:</strong> {card.duration}
                  </p>
                  <p>
                    <strong>For:</strong> {card.audience}
                  </p>
                </div>
                <Link href={card.href} className="mt-5 inline-flex items-center justify-center rounded-lg border border-[#2366c9] px-4 py-2 text-sm font-semibold text-[#2366c9] hover:bg-[#2366c9] hover:text-white">
                  {card.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-6">
        <div className="container-custom">
          <div className="grid gap-4 rounded-xl border border-slate-200 bg-white p-6 md:grid-cols-2">
            <div>
              <h3 className="text-base font-semibold text-[#2366c9]">Free Diagnostic</h3>
              <p className="mt-2 text-sm text-slate-700">
                Your first diagnostic is completely free. Full detailed report. 40-60 minutes. One free diagnostic per student. Grade 6 minimum.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#2366c9]">Additional Diagnostics</h3>
              <p className="mt-2 text-sm text-slate-700">
                After your free diagnostic: $18 per additional subject diagnostic. $30 for up to 3 subjects in one session (save $24). Teacher T1 resit: $20.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container-custom">
          <h2 className="text-center text-3xl font-bold text-[#2366c9]">How the Diagnostic Works</h2>
          <div className="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-5">
            {howItWorks.map((step, index) => (
              <div key={step.title} className="rounded-xl border border-[#dbe4ef] bg-white p-4">
                <div className="mb-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#2366c9] text-xs font-semibold text-white">{index + 1}</div>
                <h3 className="text-sm font-semibold text-[#2366c9]">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#eef6ff] py-14">
        <div className="container-custom">
          <div className="rounded-2xl border border-[#dbe4ef] bg-white p-7 md:p-10">
            <div className="flex items-start gap-3">
              <School className="mt-1 h-6 w-6 text-[#2366c9]" />
              <div>
                <h2 className="text-2xl font-bold text-[#2366c9]">Arranging a Diagnostic for an Entire Class?</h2>
                <p className="mt-3 max-w-4xl text-sm text-slate-700">
                  The EduMeUp School Class-Level Diagnostic runs simultaneously for all students in a class - generating a class-wide gap report for the teacher and individual student reports for each student. Available for EduMeUp partner schools.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link href="/contact" className="inline-flex items-center rounded-lg bg-[#2366c9] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1d57aa]">
                    Contact Us to Arrange
                  </Link>
                  <a href="https://wa.me/" className="inline-flex items-center rounded-lg border border-[#2366c9] px-5 py-2.5 text-sm font-semibold text-[#2366c9] hover:bg-[#2366c9] hover:text-white">
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="container-custom">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-[#dbe4ef] p-4">
              <div className="mb-2 flex items-center gap-2 text-[#2366c9]">
                <ClipboardList className="h-4 w-4" />
                <p className="text-sm font-semibold">Policy 1</p>
              </div>
              <p className="text-sm text-slate-600">One free diagnostic per student, with a full detailed report at the same quality standard as paid diagnostics.</p>
            </div>
            <div className="rounded-xl border border-[#dbe4ef] p-4">
              <div className="mb-2 flex items-center gap-2 text-[#2366c9]">
                <UserCheck className="h-4 w-4" />
                <p className="text-sm font-semibold">Policy 2</p>
              </div>
              <p className="text-sm text-slate-600">Free limit enforcement: one free per IP for guests or one free per account for logged-in users.</p>
            </div>
            <div className="rounded-xl border border-[#dbe4ef] p-4">
              <div className="mb-2 flex items-center gap-2 text-[#2366c9]">
                <GraduationCap className="h-4 w-4" />
                <p className="text-sm font-semibold">Policy 3</p>
              </div>
              <p className="text-sm text-slate-600">Grade 6 minimum for all student diagnostics. Grade 5 and below are redirected to lower secondary pathways.</p>
            </div>
          </div>
          <div className="mt-5 flex items-center gap-2 text-sm text-slate-600">
            <CheckCircle2 className="h-4 w-4 text-[#2366c9]" />
            This page follows the new diagnostics policy specification and replaces the previous diagnostics landing experience.
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="container-custom">
          <div className="rounded-2xl border border-[#dbe4ef] bg-[#1E3A5F] p-6 text-white md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#17A589]">Related Product</p>
            <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold">Need a grade forecast instead of a gap diagnostic?</h2>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-white/80">
                  The Cambridge O-Level Readiness Forecast predicts your likely grade band before you start O-Level. It is a separate product for a different stage.
                </p>
              </div>
              <Link href="/olevel-readiness-forecast" className="inline-flex items-center rounded-lg bg-[#17A589] px-5 py-3 text-sm font-semibold text-white">
                View Readiness Forecast
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
