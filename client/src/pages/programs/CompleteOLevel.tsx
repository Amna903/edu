import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, BookOpen, Brain, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";

const completeOLevelCoverage = [
  {
    title: "Complete Syllabus Coverage",
    description: "Master all Cambridge O-Level topics with comprehensive content aligned to 2024 curriculum.",
    icon: BookOpen,
  },
  {
    title: "Retention-Focused Learning Design",
    description: "Active recall, spaced review, and interleaving techniques built into every module.",
    icon: Brain,
  },
  {
    title: "Exam-Focused Question Banks",
    description: "Thousands of Cambridge past paper questions with detailed solutions and marking schemes.",
    icon: Zap,
  },
];

const completeOLevelHowItWorks = [
  {
    title: "1. Concept Learning Modules",
    description: "Study comprehensive content with visual explanations, real-world examples, and diagrams.",
    icon: BookOpen,
  },
  {
    title: "2. AI-Powered Spaced Repetition",
    description: "System automatically schedules review at optimal intervals for long-term retention.",
    icon: Brain,
  },
  {
    title: "3. 24/7 AI Support",
    description: "Ask questions anytime and get instant, detailed explanations aligned with Cambridge standards.",
    icon: Zap,
  },
];

const completeOLevelWhoItsFor = [
  "O-Level students seeking comprehensive subject preparation from foundation to mastery",
  "Students aiming for A*/9 grades with systematic syllabus coverage",
  "Those needing flexible, self-paced learning with AI mentorship",
  "Cambridge O-Level candidates wanting retention-focused methodology",
];

const completeOLevelSubjectsIncluded = [
  "Mathematics (Pure + Applied)",
  "Physics (comprehensive practical & theory)",
  "Chemistry (all practical and theory papers)",
  "Biology (complete organ systems & ecology)",
  "English Language (Papers 1, 2 & extended)",
];

export default function CompleteOLevel() {
  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") || "";

    document.title =
      "Complete O-Level Preparation - Full Syllabus Coverage | EduMeUp";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Complete O-Level Preparation with 100% syllabus coverage, retention-focused learning design, past papers, and 24/7 AI support. Master Cambridge O-Level subjects.",
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
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 to-white py-16 md:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mx-auto max-w-5xl text-center"
          >
        
            <h1 className="text-4xl font-semibold text-slate-900 md:text-6xl">
              Complete O-Level Subject Preparation
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base text-slate-700 md:text-lg">
              Full Cambridge-aligned O-Level preparation with retention-focused learning design. Master the complete
              syllabus with active recall, spaced repetition, and exam-focused question banks.
            </p>
            <p className="mx-auto mt-3 max-w-3xl text-sm text-slate-600">
              Available for all Cambridge O-Level subjects with 24/7 AI mentorship.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/programs/atp-courses">
                <span className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:border-blue-300 hover:text-[#2366c9]">
                  ATP Courses
                </span>
              </Link>
              <Link href="/programs/exam-prep">
                <span className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:border-blue-300 hover:text-[#2366c9]">
                  Exam Prep
                </span>
              </Link>
              <Link href="/programs/ai-diagnostic">
                <span className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:border-blue-300 hover:text-[#2366c9]">
                  AI Diagnostic
                </span>
              </Link>
            </div>

            <div className="mt-10">
              <Link href="/programs/ai-diagnostic">
                <span className="inline-flex items-center gap-2 rounded-lg bg-[#2366c9] px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700">
                  Start Free Diagnostic
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl rounded-2xl border border-blue-100 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
              Why Complete O-Level Coverage Matters More Than Quick Prep
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              Many students rush through quick topic reviews before exams, only to forget material by test day. Complete
              O-Level Preparation uses Cambridge-aligned content with active recall and spaced repetition to build
              durable, retrievable knowledge. Every topic connects to real exam questions, ensuring you don't just learn
              conceptsâ€”you master them in exam contexts. With 24/7 AI support and thousands of past paper questions, you
              develop both content mastery and exam techniques simultaneously.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-14 md:pb-20">
        <div className="container-custom">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
              What Complete O-Level Covers
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {completeOLevelCoverage.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-[#2366c9]">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-blue-100 bg-blue-50/40 py-14 md:py-20">
        <div className="container-custom">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
              How It Works
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {completeOLevelHowItWorks.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-[#2366c9]">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-custom">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-green-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">
                Who This Is For
              </h2>
              <div className="mt-5 space-y-3">
                {completeOLevelWhoItsFor.map((item) => (
                  <p key={item} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                    <span>{item}</span>
                  </p>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-blue-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Subjects Included</h2>
              <div className="mt-5 space-y-3">
                {completeOLevelSubjectsIncluded.map((item) => (
                  <p key={item} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2366c9]" />
                    <span>{item}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-14 md:pb-20">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl rounded-2xl border border-blue-100 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">Pricing</h2>

            <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 shadow-md">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="bg-[#2366c9] text-white text-left">
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide">
                      Plan
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide">
                      Duration
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide">
                      Price (USD)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-blue-100">
                    <td className="px-4 py-3 text-sm text-slate-800">Monthly Subscription</td>
                    <td className="px-4 py-3 text-sm text-slate-800">1 month</td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-900">$199</td>
                  </tr>
                  <tr className="border-t border-blue-100">
                    <td className="px-4 py-3 text-sm text-slate-800">Quarterly Plan</td>
                    <td className="px-4 py-3 text-sm text-slate-800">3 months</td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-900">$497</td>
                  </tr>
                  <tr className="border-t border-blue-100 bg-blue-50/50">
                    <td className="px-4 py-3 text-sm font-semibold text-slate-900">Annual Plan (Best Value)</td>
                    <td className="px-4 py-3 text-sm text-slate-800">12 months</td>
                    <td className="px-4 py-3 text-sm font-semibold text-[#2366c9]">$1,599 (Save $789)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Link href="/programs/complete-o-level">
                <span className="flex items-center justify-between rounded-xl border border-blue-200 bg-white px-5 py-4 text-sm font-semibold text-slate-900 hover:border-blue-300 hover:text-[#2366c9]">
                  Browse Complete O-Level
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link href="/programs/ai-diagnostic">
                <span className="flex items-center justify-between rounded-xl bg-[#2366c9] px-5 py-4 text-sm font-semibold text-white hover:bg-blue-700">
                  Start Free Diagnostic First
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

