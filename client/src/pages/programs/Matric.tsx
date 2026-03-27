import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";

const matricCoverage = [
  {
    title: "Complete Syllabus Mastery",
    description: "100% Pakistan Board curriculum (Grades 9-10) with conceptual depth matching Cambridge standards.",
    icon: CheckCircle2,
  },
  {
    title: "Adaptive Learning Pathways",
    description: "AI-powered diagnostic identifies gaps and customizes learning sequence for each student.",
    icon: CheckCircle2,
  },
  {
    title: "Past Paper Practice",
    description: "Hundreds of solved past papers with detailed solutions and explanations.",
    icon: CheckCircle2,
  },
];

const matricHowItWorks = [
  {
    title: "1. Diagnostic Assessment",
    description: "90-minute AI gap analysis reveals exactly where your understanding breaks down.",
    icon: CheckCircle2,
  },
  {
    title: "2. Structured Learning",
    description: "Follow a STEM roadmap: Foundation â†’ Concept Building â†’ Practice â†’ Mastery.",
    icon: CheckCircle2,
  },
  {
    title: "3. Interactive H5P Activities",
    description: "2000+ interactive activities for self-checking and real-time feedback.",
    icon: CheckCircle2,
  },
  {
    title: "4. Mock Exams",
    description: "Full-length practicals mirroring actual Matric format with authentic timing.",
    icon: CheckCircle2,
  },
];

const matricWhoItsFor = [
  "Grade 9-10 students in Pakistan Board institutions",
  "Students aiming for A+ grades in Matric",
  "Learners transitioning to FSc with strong fundamentals",
  "Parents seeking structured, science-backed exam prep",
];

const matricSubjectsIncluded = [
  "Mathematics (Algebra, Geometry, Trigonometry)",
  "Physics (Mechanics, Electromagnetism, Optics)",
  "Chemistry (Inorganic, Organic, Physical)",
  "Biology (Botany, Zoology, Cell Biology)",
  "English (Comprehen & Composition)",
];

export default function Matric() {
  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") || "";

    document.title =
      "Pakistan Matric Programme (Grades 9-10) | Science-Backed Exam Prep | EduMeUp";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "EduMeUp's Pakistan Matric Programme (Grades 9-10) with AI-powered diagnostics, 2000+ interactive activities, and proven grade improvement system.",
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
              Master Pakistan Matric with Science-Backed Strategies
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base text-slate-700 md:text-lg">
              Complete Grades 9-10 preparation with AI diagnostics, conceptual depth, and proven grade improvement.
            </p>
            <p className="mx-auto mt-3 max-w-3xl text-sm text-slate-600">
              The only Pakistan Board programme designed on cognitive science principles.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/programs">
                <span className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:border-blue-300 hover:text-[#2366c9]">
                  All Programmes
                </span>
              </Link>
              <Link href="/programs/fsc-ics">
                <span className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:border-blue-300 hover:text-[#2366c9]">
                  FSc / ICS
                </span>
              </Link>
              <Link href="/programs/ecat">
                <span className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:border-blue-300 hover:text-[#2366c9]">
                  ECAT Prep
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
              Why Pakistan Matric Students Struggle (And How We Fix It)
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              Pakistan Board Matric covers 5 major subjects with dense syllabi and demanding practical components. Most students memorize content without understanding the underlying principles, leading to weak retention and poor performance under exam pressure. EduMeUp's science-backed approach ensures conceptual clarity first, then builds exam readiness and speed.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-14 md:pb-20">
        <div className="container-custom">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
              What the Matric Programme Covers
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {matricCoverage.map((item) => (
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
          <div className="grid gap-6 md:grid-cols-2">
            {matricHowItWorks.map((item) => (
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
                {matricWhoItsFor.map((item) => (
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
                {matricSubjectsIncluded.map((item) => (
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
                      Monthly
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide">
                      Annual
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide">
                      What's Included
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-blue-100">
                    <td className="px-4 py-3 text-sm font-semibold text-slate-900">Pakistan Matric (All 5 Subjects)</td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-900">$18/mo</td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-900">$160/yr</td>
                    <td className="px-4 py-3 text-sm text-slate-800">
                      Complete Grade 9-10 curriculum, AI diagnostics, 2000+ activities, mock exams
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Link href="/programs">
                <span className="flex items-center justify-between rounded-xl border border-blue-200 bg-white px-5 py-4 text-sm font-semibold text-slate-900 hover:border-blue-300 hover:text-[#2366c9]">
                  Browse All Programmes
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

