import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, BookOpen, Zap, Target } from "lucide-react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";

const preOLevelCoverage = [
  {
    title: "Foundational O-Level Bridge Courses Content",
    description: "Build Grade 7-8 level understanding across all subjects before progressing to O-Level topics.",
    icon: BookOpen,
  },
  {
    title: "Early O-Level Readiness",
    description: "Introduce O-Level concepts gradually while reinforcing foundational thinking skills.",
    icon: Zap,
  },
  {
    title: "Structured Weekly Roadmap",
    description: "Follow a 9-month progressive pathway with clear milestones and checkpoints.",
    icon: Target,
  },
];

const preOLevelHowItWorks = [
  {
    title: "1. AI Diagnostic & Remedial Mapping",
    description: "Start with an AI-powered assessment to identify precise gaps in your foundation.",
    icon: Target,
  },
  {
    title: "2. Progressive Concept Building",
    description: "Work through modules from Grade 7-8 foundations into early O-Level topics.",
    icon: BookOpen,
  },
  {
    title: "3. Interactive Practice & Parent Visibility",
    description: "Solve practice problems with immediate feedback. Parents track progress in real-time.",
    icon: Zap,
  },
];

const preOLevelWhoItsFor = [
  "Grade 7-8 learners preparing for O-Level transition",
  "Students with weak foundational math or science",
  "Those seeking structured, guided O-Level preparation",
  "Learners wanting parental involvement and progress tracking",
];

const preOLevelSubjectsIncluded = [
  "Mathematics (Grade 7-8 + Early O-Level)",
  "Physics (Grade 7-8 + Early O-Level)",
  "Chemistry (Grade 7-8 + Early O-Level)",
  "Biology (Grade 7-8 + Early O-Level)",
  "English Language Foundations",
];

export default function PreOLevelVictory() {
  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") || "";

    document.title =
      "Pre-O-Level Victory Program - Confident Transition to O-Level | EduMeUp";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Pre-O-Level Victory Program: Complete 9-month pathway for Grade 7-8 students transitioning to O-Level. AI diagnostics, structured roadmap, and parent visibility.",
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
              Build Foundation & Transition Confidently to O-Level
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base text-slate-700 md:text-lg">
              Complete 9-month pathway combining Grade 7-8 repair with early O-Level readiness. AI diagnostics,
              structured weekly roadmap, and parent progress visibility.
            </p>
            <p className="mx-auto mt-3 max-w-3xl text-sm text-slate-600">
              Perfect for Grade 7-8 students seeking confident O-Level transition.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/programs/bridge-courses">
                <span className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:border-blue-300 hover:text-[#2366c9]">
                  Bridge Courses
                </span>
              </Link>
              <Link href="/programs/complete-o-level">
                <span className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:border-blue-300 hover:text-[#2366c9]">
                  Complete O-Level
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
              Why Pre-O-Level Victory is the 3-in-1 Solution
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              Pre-O-Level Victory combines three essential elements: Gap repair (fixing Grade 7-8 weaknesses),
              Foundational O-Level Bridge Courses introduction (early concepts), and O-Level readiness (confidence and study skills).
              Unlike standalone bridge courses, Pre-O-Level Victory is a complete 9-month journey designed to move
              students from foundational anxiety to O-Level confidence within a structured, tracked pathway.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-14 md:pb-20">
        <div className="container-custom">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
              What Pre-O-Level Victory Covers
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {preOLevelCoverage.map((item) => (
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
            {preOLevelHowItWorks.map((item) => (
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
                {preOLevelWhoItsFor.map((item) => (
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
                {preOLevelSubjectsIncluded.map((item) => (
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
                      Price (PKR)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-blue-100">
                    <td className="px-4 py-3 text-sm text-slate-800">Full 9-Month Pathway</td>
                    <td className="px-4 py-3 text-sm text-slate-800">9 months access</td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-900">36,000</td>
                  </tr>
                  <tr className="border-t border-blue-100">
                    <td className="px-4 py-3 text-sm text-slate-800">Monthly Subscription</td>
                    <td className="px-4 py-3 text-sm text-slate-800">1 month</td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-900">4,500</td>
                  </tr>
                  <tr className="border-t border-blue-100 bg-blue-50/50">
                    <td className="px-4 py-3 text-sm font-semibold text-slate-900">Best Value</td>
                    <td className="px-4 py-3 text-sm text-slate-800">9-month lump sum</td>
                    <td className="px-4 py-3 text-sm font-semibold text-[#2366c9]">
                      36,000 (Save 4,500 vs monthly)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Link href="/programs/pre-o-level-victory">
                <span className="flex items-center justify-between rounded-xl border border-blue-200 bg-white px-5 py-4 text-sm font-semibold text-slate-900 hover:border-blue-300 hover:text-[#2366c9]">
                  Browse Pre-O-Level Victory
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

