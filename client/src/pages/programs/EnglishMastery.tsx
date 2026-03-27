import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, BookOpen, PenTool, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";

const englishCoverage = [
  {
    title: "Paper 1: Comprehension Mastery",
    description: "Develop advanced reading skills, understanding complex texts, drawing inferences, and managing time.",
    icon: BookOpen,
  },
  {
    title: "Paper 2: Composition Excellence",
    description: "Master essay writing, formal letters, creative narratives, and persuasive techniques with examiner feedback.",
    icon: PenTool,
  },
  {
    title: "Vocabulary & Grammar Foundation",
    description: "Build Cambridge-level vocabulary and grammatical accuracy for both papers.",
    icon: Lightbulb,
  },
];

const englishHowItWorks = [
  {
    title: "1. Skill Building Modules",
    description: "Work through targeted modules on comprehension strategies, essay structures, and writing techniques.",
    icon: BookOpen,
  },
  {
    title: "2. Guided Practice Sets",
    description: "Solve real past paper questions with detailed explanations and marking guidance.",
    icon: PenTool,
  },
  {
    title: "3. Personalized Feedback",
    description: "Receive detailed feedback on essays and comprehension answers aligned with Cambridge standards.",
    icon: Lightbulb,
  },
];

const englishWhoItsFor = [
  "O-Level students aiming for English Language A* / 9",
  "Non-native English speakers strengthening comprehension and expression",
  "Students struggling with essay writing or time management",
  "Learners wanting structured, systematic English mastery",
];

const englishSubjectsIncluded = [
  "Paper 1: Reading Comprehension (2 hours)",
  "Paper 2: Directed Writing & Composition (2 hours)",
  "Vocabulary building exercises",
  "Grammar correction and improvement",
  "Cambridge past papers (2010-2024)",
];

export default function EnglishMastery() {
  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") || "";

    document.title =
      "Cambridge English Language Mastery | O-Level Papers 1 & 2 | EduMeUp";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Master Cambridge O-Level English Language with comprehensive comprehension and composition training. Get A* with EduMeUp's structured approach to Papers 1 & 2.",
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
              Master Cambridge English Language Papers 1 & 2
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base text-slate-700 md:text-lg">
              Complete comprehension and composition training aligned with Cambridge standards. Get A* with
              structured skill-building and real past papers.
            </p>
            <p className="mx-auto mt-3 max-w-3xl text-sm text-slate-600">
              Available separately: Comprehension ($110), Composition ($160), or Bundle ($250 â€” save $60).
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/programs/complete-o-level">
                <span className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:border-blue-300 hover:text-[#2366c9]">
                  Complete O-Level
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
              Why English Language Requires Different Strategies for Papers 1 & 2
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              Comprehension and Composition are fundamentally different skills. Students excel at one but struggle
              with the other because they apply the same strategies universally. Paper 1 demands precision in
              reading, inference-drawing, and speed. Paper 2 requires planning, original thinking, and technical
              accuracy. Our dual-track training ensures you master both independently, then integrate seamlessly
              for a 4-hour exam marathon of writing excellence.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-14 md:pb-20">
        <div className="container-custom">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
              What English Mastery Covers
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {englishCoverage.map((item) => (
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
            {englishHowItWorks.map((item) => (
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
                {englishWhoItsFor.map((item) => (
                  <p key={item} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                    <span>{item}</span>
                  </p>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-blue-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Coverage</h2>
              <div className="mt-5 space-y-3">
                {englishSubjectsIncluded.map((item) => (
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
                      Programme
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
                    <td className="px-4 py-3 text-sm text-slate-800">Comprehension Only</td>
                    <td className="px-4 py-3 text-sm text-slate-800">Lifetime access</td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-900">$110</td>
                  </tr>
                  <tr className="border-t border-blue-100">
                    <td className="px-4 py-3 text-sm text-slate-800">Composition Only</td>
                    <td className="px-4 py-3 text-sm text-slate-800">Lifetime access</td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-900">$160</td>
                  </tr>
                  <tr className="border-t border-blue-100 bg-blue-50/50">
                    <td className="px-4 py-3 text-sm font-semibold text-slate-900">Bundle (Both Papers)</td>
                    <td className="px-4 py-3 text-sm text-slate-800">Lifetime access</td>
                    <td className="px-4 py-3 text-sm font-semibold text-[#2366c9]">$250 (Save $20)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Link href="/programs/english-mastery">
                <span className="flex items-center justify-between rounded-xl border border-blue-200 bg-white px-5 py-4 text-sm font-semibold text-slate-900 hover:border-blue-300 hover:text-[#2366c9]">
                  Browse English Mastery
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

