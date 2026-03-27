import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Zap, BarChart3, Target } from "lucide-react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";

const examPrepCoverage = [
  {
    title: "Timed Mock Paper Interface",
    description: "Practice under exam conditions with realistic timing and automatic marking.",
    icon: Zap,
  },
  {
    title: "Performance Analytics by Topic",
    description: "See detailed breakdowns of your strengths and weaknesses across all topics.",
    icon: BarChart3,
  },
  {
    title: "High-Yield Revision Focus",
    description: "Concentrate on topics most likely to appear in exams based on historical patterns.",
    icon: Target,
  },
];

const examPrepHowItWorks = [
  {
    title: "1. Select Your Mock Paper",
    description: "Choose from past papers or generated papers tailored to your current level and targets.",
    icon: Target,
  },
  {
    title: "2. Practice Under Exam Conditions",
    description: "Solve within real exam time limits with automatic marking and detailed solutions.",
    icon: Zap,
  },
  {
    title: "3. Review Analytics & Improve",
    description: "Analyze your performance, identify weak areas, and revise with high-yield focus.",
    icon: BarChart3,
  },
];

const examPrepWhoItsFor = [
  "O-Level students in final 3-month exam preparation phase",
  "Those who've completed content learning and need timed practice",
  "Students seeking performance analytics to guide final revision",
  "Learners preparing for multiple simultaneous exam sessions",
];

const examPrepSubjectsIncluded = [
  "Full past paper library (2010-2024)",
  "Timed mock tests for all major O-Level subjects",
  "Automatic marking with detailed solution explanations",
  "Performance analytics dashboard",
  "Custom paper generation based on topic focus",
];

export default function ExamPrep() {
  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") || "";

    document.title =
      "Real-Time Exam Preparation - Mock Tests & Timed Practice | EduMeUp";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Real-Time Exam Preparation with timed mock papers, performance analytics, and high-yield revision focus. Master exam technique and timing with Cambridge past papers.",
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
              Real-Time Exam Preparation & Strategy
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base text-slate-700 md:text-lg">
              Timed mock testing and exam strategy refinement for final-phase readiness. Master exam technique,
              timing, and high-yield revision with performance analytics.
            </p>
            <p className="mx-auto mt-3 max-w-3xl text-sm text-slate-600">
              Perfect for students in their final 3 months before O-Level exams.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/programs/complete-o-level">
                <span className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:border-blue-300 hover:text-[#2366c9]">
                  Complete O-Level
                </span>
              </Link>
              <Link href="/programs/atp-courses">
                <span className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:border-blue-300 hover:text-[#2366c9]">
                  ATP Courses
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
              Why Timed Practice Determines Your Final Exam Grade
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              Knowing content isn't enough if you can't manage time under exam pressure. Many students lose marks
              because they can't finish papers or make careless errors due to rushing. Real-Time Exam Preparation
              combines timed mock testing with performance analytics to expose your timing weaknesses while you have
              time to fix them. Every practice paper teaches you exam technique, strategic question selection, and
              pacing. By exam day, managing 2-4 hours of continuous writing feels automatic.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-14 md:pb-20">
        <div className="container-custom">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
              What Exam Prep Covers
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {examPrepCoverage.map((item) => (
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
            {examPrepHowItWorks.map((item) => (
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
                {examPrepWhoItsFor.map((item) => (
                  <p key={item} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                    <span>{item}</span>
                  </p>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-blue-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Included</h2>
              <div className="mt-5 space-y-3">
                {examPrepSubjectsIncluded.map((item) => (
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
                    <td className="px-4 py-3 text-sm text-slate-800">3-Month Access</td>
                    <td className="px-4 py-3 text-sm text-slate-800">12 weeks</td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-900">$300</td>
                  </tr>
                  <tr className="border-t border-blue-100">
                    <td className="px-4 py-3 text-sm text-slate-800">6-Month Access</td>
                    <td className="px-4 py-3 text-sm text-slate-800">24 weeks</td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-900">$499</td>
                  </tr>
                  <tr className="border-t border-blue-100 bg-blue-50/50">
                    <td className="px-4 py-3 text-sm font-semibold text-slate-900">Best Value - Full Year</td>
                    <td className="px-4 py-3 text-sm text-slate-800">12 months</td>
                    <td className="px-4 py-3 text-sm font-semibold text-[#2366c9]">$799 (Save $301)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Link href="/programs/exam-prep">
                <span className="flex items-center justify-between rounded-xl border border-blue-200 bg-white px-5 py-4 text-sm font-semibold text-slate-900 hover:border-blue-300 hover:text-[#2366c9]">
                  Browse Exam Prep
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

