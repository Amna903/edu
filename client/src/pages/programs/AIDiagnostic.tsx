import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Target, CheckCircle2, BarChart3, Gauge, ListChecks, Zap } from "lucide-react";
import { Layout } from "@/components/Layout";
import { InquiryDialog } from "@/components/InquiryDialog";

const whatItFinds = [
  {
    icon: Target,
    title: "Subject-level gaps",
    desc: "Which of your child's subjects need urgent attention vs which are already solid — ranked by priority.",
  },
  {
    icon: ListChecks,
    title: "Topic-level blind spots",
    desc: "Within each subject, the specific topics where conceptual understanding is missing, weak, or confused.",
  },
  {
    icon: Brain,
    title: "Foundation gaps from earlier grades",
    desc: "Weaknesses from Grade 6–8 that were never properly addressed — and are now compounding at O-Level.",
  },
  {
    icon: Gauge,
    title: "Exam-readiness level",
    desc: "A predicted readiness score for each subject — based on current knowledge, not effort or attendance.",
  },
  {
    icon: Zap,
    title: "Learning pace indicators",
    desc: "How quickly the student processes and consolidates new material — used to calibrate the study pathway.",
  },
  {
    icon: BarChart3,
    title: "Priority intervention order",
    desc: "A specific, sequenced list of what to address first — so study time is invested where it produces the most improvement.",
  },
];

const threeSteps = [
  {
    title: "Take the diagnostic",
    desc: "90 minutes, online, AI-powered. No preparation needed. It is a map, not a test to pass.",
  },
  {
    title: "Receive the gap report",
    desc: "Within 24 hours. A clear breakdown of every subject gap, ranked by severity and impact on exam performance.",
  },
  {
    title: "Begin a targeted study pathway",
    desc: "Designed for your child's exact gap profile. No generic starting point. No wasted time on topics already understood.",
  },
];

const afterDiagnostic = [
  {
    title: "Remedial modules assigned",
    desc: "Targeted foundation repair begins immediately for any Grade 6–8 gaps identified.",
  },
  {
    title: "Study pathway generated",
    desc: "A personalised sequence of interactive H5P modules, past paper practice, and retrieval sessions.",
  },
  {
    title: "Parent dashboard activated",
    desc: "Real-time visibility into progress, mastery scores, and exam readiness from Day 1.",
  },
];

export default function AIDiagnostic() {
  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") || "";

    document.title = "AI Diagnostic Assessment — Know Your Child's Exact Gaps Before a Single Lesson | EduMeUp";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "EduMeUp's 90-minute AI diagnostic maps every IGCSE learner's exact knowledge gaps and generates a personalised study pathway. Free. No credit card required.",
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
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 to-white py-16 md:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
         
            <h1 className="text-5xl md:text-7xl font-semibold text-slate-900 mb-6 tracking-tight leading-tight">
              Know Exactly Where Your Child Stands - Before a Single Lesson Begins
            </h1>
            <p className="text-base text-slate-700 max-w-3xl mx-auto leading-relaxed mb-8">
              90 minutes. AI-powered. Free. No credit card required.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <InquiryDialog
                defaultType="diagnostic"
                title="Book Free AI Diagnostic"
                trigger={
                  <button
                    data-testid="button-start-diagnostic"
                    className="inline-flex items-center gap-2 rounded-full bg-[#2366c9] px-7 py-3.5 text-[14px] font-semibold text-white hover:bg-blue-700"
                  >
                    Start Free Diagnostic Now
                    <ArrowRight className="h-4 w-4" />
                  </button>
                }
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* THE COST OF GUESSING */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl">
            <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
              The Problem
            </p>
            <h2 className="text-4xl md:text-6xl font-semibold text-slate-900 tracking-tight mb-5">
              The Cost of Guessing
            </h2>
            <p className="text-base text-black leading-relaxed">
              Most students begin exam preparation without knowing where their real gaps are. They study what feels comfortable. They avoid what feels hard. They cover content they already know while the actual gaps accumulate silently. On exam day, the gaps are revealed — but by then it is too late.
            </p>
            <p className="mt-4 text-base text-black leading-relaxed font-semibold">
              Ninety minutes of precise diagnosis saves ninety hours of misdirected study.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT THE DIAGNOSTIC FINDS */}
      <section className="py-14 md:py-20 bg-blue-50/50">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
                What It Finds
              </p>
              <h2 className="text-4xl md:text-6xl font-semibold text-slate-900 tracking-tight">
                What the Diagnostic Finds
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {whatItFinds.map((item) => (
                <div key={item.title} className="bg-white p-8 rounded-xl border border-blue-200 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-[#2366c9] transition-all duration-300 group">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-[#2366c9]">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-semibold text-[#2366c9] mb-4">{item.title}</h3>
                  <p className="text-[14px] text-black leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
                How It Works
              </p>
              <h2 className="text-4xl md:text-6xl font-semibold text-slate-900 tracking-tight">
                Three Steps
              </h2>
            </div>
            <div className="space-y-4">
              {threeSteps.map((s, i) => (
                <div key={i} className="flex gap-5 bg-white p-8 rounded-xl border border-blue-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#2366c9] transition-all duration-300">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[#2366c9] text-white text-xs font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-[#2366c9] mb-3">{s.title}</h3>
                    <p className="text-[14px] text-black leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT HAPPENS AFTER */}
      <section className="py-14 md:py-20 bg-blue-50/50">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-10">
              <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
                After The Diagnostic
              </p>
              <h2 className="text-4xl md:text-6xl font-semibold text-slate-900 tracking-tight mb-3">
                What Happens After the Diagnostic
              </h2>
              <p className="text-[14px] text-black max-w-2xl mx-auto">
                The diagnostic is Step 1 of EduMeUp's{" "}
                <Link href="/why-edumeup/8-step-model">
                  <span className="text-[#2366c9] underline cursor-pointer font-semibold">8-step mastery cycle</span>
                </Link>
                . The moment results are generated, the system activates:
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {afterDiagnostic.map((item) => (
                <div key={item.title} className="bg-white p-8 rounded-xl border border-blue-200 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-[#2366c9] transition-all duration-300 text-center">
                  <CheckCircle2 className="mx-auto mb-4 h-8 w-8 text-green-500" />
                  <h3 className="text-2xl font-semibold text-[#2366c9] mb-4">{item.title}</h3>
                  <p className="text-[14px] text-black leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EVIDENCE */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl bg-blue-50/50 border border-blue-200 rounded-xl p-8 md:p-10">
            <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
              Research Engine
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight mb-5">
              The Evidence for Diagnostic-First Learning
            </h2>
            <p className="text-base text-black leading-relaxed">
              Formative and diagnostic assessment produces significant improvements in learning outcomes when used to shape instruction (Black &amp; Wiliam, 1998). Personalised learning pathways generated from diagnostic data significantly outperform fixed-curriculum approaches for learners with uneven prior knowledge (Bloom, 1984). When teachers and students know precisely where the gaps are before instruction begins, both teaching and learning become dramatically more efficient (Shepard, 2008).
            </p>
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="py-14 md:py-20 bg-blue-50/50">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
                Who This Is For
              </p>
              <h2 className="text-4xl md:text-6xl font-semibold text-slate-900 tracking-tight">
                Who This Is For
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-white p-8 rounded-xl border border-blue-200 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-[#2366c9] transition-all duration-300">
                <h3 className="text-2xl font-semibold text-[#2366c9] mb-4">Students who:</h3>
                <ul className="space-y-3">
                  {[
                    "Are in Grade 7–10 preparing for O-Level / IGCSE",
                    "Are struggling despite consistent tutoring",
                    "Want to know exactly what to prioritise",
                    "Are switching from a national to Cambridge curriculum",
                    "Want a structured starting point, not guesswork",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[14px] text-black">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-8 rounded-xl border border-blue-200 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-[#2366c9] transition-all duration-300">
                <h3 className="text-2xl font-semibold text-[#2366c9] mb-4">Parents who:</h3>
                <ul className="space-y-3">
                  {[
                    "Want to know exactly where their child's gaps are",
                    "Are spending on tutoring without seeing proportional results",
                    "Want to identify problems before exam season reveals them",
                    "Want an evidence-based starting point for preparation",
                    "Want real-time visibility after the diagnostic is complete",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[14px] text-black">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="bg-[#2366c9] py-12">
        <div className="container-custom">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <InquiryDialog
              defaultType="diagnostic"
              title="Book Free AI Diagnostic"
              trigger={
                <button className="inline-flex items-center gap-2 rounded-full bg-[#2366c9] px-7 py-3.5 text-[14px] font-semibold text-white hover:bg-blue-600">
                  Start Free Diagnostic — No Credit Card
                  <ArrowRight className="h-4 w-4" />
                </button>
              }
            />
            <Link href="/why-edumeup/how-it-works">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-400 px-7 py-3.5 text-[14px] font-semibold text-white hover:border-blue-300">
                See What Happens Next
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* REFERENCES */}
      <section className="py-10 bg-white border-t border-blue-100">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">References</h3>
            <ul className="space-y-1 text-xs text-slate-500">
              <li>Black, P., &amp; Wiliam, D. (1998). Assessment and classroom learning. <em>Assessment in Education, 5</em>(1), 7–74.</li>
              <li>Bloom, B. S. (1984). The 2 sigma problem. <em>Educational Researcher, 13</em>(6), 4–16.</li>
              <li>Shepard, L. A. (2008). Formative assessment: Caveat emptor. In C. A. Dwyer (Ed.), <em>The future of assessment</em> (pp. 279–303). Erlbaum.</li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}
