import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";

const ecatCoverage = [
  {
    title: "Engineering Entry Test Mastery",
    description: "100% ECAT curriculum with focus on Physics, Chemistry, Mathematics, and English sections.",
    icon: CheckCircle2,
  },
  {
    title: "Time Management & Speed",
    description: "Timed mock exams and section-wise drills to maximize score in 2-hour exam window.",
    icon: CheckCircle2,
  },
  {
    title: "Competitive Strategy",
    description: "Proven tactics for high-scoring universities (FAST, LUMS, UET, NED, GIKI) and cutoff optimization.",
    icon: CheckCircle2,
  },
];

const ecatHowItWorks = [
  {
    title: "1. Concept + Formula Review",
    description: "Quick refresh of FSc topics plus ECAT-specific formula collections and shortcuts.",
    icon: CheckCircle2,
  },
  {
    title: "2. Topic-Wise ECAT Drills",
    description: "Past ECAT questions organized by topic with detailed explanations and alternative approaches.",
    icon: CheckCircle2,
  },
  {
    title: "3. Full-Length Mock Exams",
    description: "Timed tests matching actual ECAT format with score analytics and performance tracking.",
    icon: CheckCircle2,
  },
  {
    title: "4. Merit List Optimization",
    description: "Strategies to maximize composite score and improve merit-based admission chances.",
    icon: CheckCircle2,
  },
];

const ecatWhoItsFor = [
  "FSc students preparing for ECAT (Engineering Entry Test)",
  "Students targeting top engineering universities",
  "Learners aiming for merit-based scholarships",
  "Anyone needing speed and accuracy under exam pressure",
];

const ecatSubjectsIncluded = [
  "Physics (Mechanics, Electromagnetism, Thermodynamics, Modern Physics)",
  "Chemistry (Inorganic, Organic, Physical, Analytical)",
  "Mathematics (Algebra, Calculus, Geometry, Trigonometry)",
  "English (Comprehension, Grammar, Vocabulary)",
  "Reasoning & Logic Skills",
];

export default function Ecat() {
  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") || "";

    document.title =
      "Pakistan ECAT â€” Engineering Entry Test Prep | FAST | LUMS | UET | EduMeUp";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "EduMeUp's Pakistan ECAT Engineering Entry Test preparation with timed mock exams, topic-wise drills, and proven strategies for FAST, LUMS, UET, NED, GIKI.",
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
              Master ECAT: Ace Pakistan's Toughest Engineering Exam
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base text-slate-700 md:text-lg">
              Competitive prep for FAST, LUMS, UET, NED, and GIKI with proven strategies and real ECAT past papers.
            </p>
            <p className="mx-auto mt-3 max-w-3xl text-sm text-slate-600">
              2-year specialized training designed for speed, accuracy, and merit-based engineering admission.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/programs">
                <span className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:border-blue-300 hover:text-[#2366c9]">
                  All Programmes
                </span>
              </Link>
              <Link href="/programs/matric">
                <span className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:border-blue-300 hover:text-[#2366c9]">
                  Matric Prep
                </span>
              </Link>
              <Link href="/programs/fsc-ics">
                <span className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:border-blue-300 hover:text-[#2366c9]">
                  FSc / ICS
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
              Why ECAT Is Brutal (And How EduMeUp Breaks The Code)
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              ECAT tests not just knowledge, but speed, decision-making, and strategic question selection under extreme time pressure. With only 120 minutes for 100+ questions, students must master advanced problem-solving and develop game plans for each exam section. Traditional FSc preparation doesn't adequately prepare for this intensity. EduMeUp's ECAT program systematically builds both conceptual strength and competitive exam mastery.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-14 md:pb-20">
        <div className="container-custom">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
              What the ECAT Programme Covers
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {ecatCoverage.map((item) => (
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
            {ecatHowItWorks.map((item) => (
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
                {ecatWhoItsFor.map((item) => (
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
                {ecatSubjectsIncluded.map((item) => (
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
                      Price
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide">
                      What's Included
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-blue-100">
                    <td className="px-4 py-3 text-sm font-semibold text-slate-900">Pakistan ECAT â€” Engineering Entry Test</td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-900">24 months</td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-900">$140</td>
                    <td className="px-4 py-3 text-sm text-slate-800">
                      All 5 subjects, past papers, mock exams, merit optimization strategy
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

