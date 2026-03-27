import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";

const fscIcsCoverage = [
  {
    title: "FSc & ICS Full Curriculum",
    description: "Complete Part 1 & 2 (Grade 11-12) aligned with Pakistan Board standards covering all 6 subjects.",
    icon: CheckCircle2,
  },
  {
    title: "University Entrance Preparation",
    description: "Designed to prepare students for competitive university exams and STEM pathways.",
    icon: CheckCircle2,
  },
  {
    title: "Past Paper & MCQ Bank",
    description: "Thousands of solved past papers, MCQuestions, and topic-wise practicals with solutions.",
    icon: CheckCircle2,
  },
];

const fscIcsHowItWorks = [
  {
    title: "1. Foundational Mastery",
    description: "Build rock-solid understanding of Matric concepts that FSc/ICS builds upon.",
    icon: CheckCircle2,
  },
  {
    title: "2. Advanced Concept Training",
    description: "Step-by-step videos, animations, and interactive H5P activities for complex topics.",
    icon: CheckCircle2,
  },
  {
    title: "3. University Mock Exams",
    description: "Full-length practicals and examinations matching actual university entrance formats.",
    icon: CheckCircle2,
  },
  {
    title: "4. Merit List Preparation",
    description: "Strategies for achieving top grades required for competitive university entry.",
    icon: CheckCircle2,
  },
];

const fscIcsWhoItsFor = [
  "Grade 11-12 students in Pakistan Board institutions",
  "FSc Pre-Engineering, Pre-Medical, General students",
  "ICS students aiming for top universities",
  "Students preparing for university entrance exams",
];

const fscIcsSubjectsIncluded = [
  "Mathematics (Calculus, Algebra, Geometry)",
  "Physics (Mechanics, Heat, Electromagnetism, Modern Physics)",
  "Chemistry (Organic, Inorganic, Physical)",
  "Biology / Computer Science (as per stream)",
  "Urdu & English composition",
];

export default function FscIcs() {
  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") || "";

    document.title =
      "Pakistan FSc / ICS Programme (Grade 11-12) | University Entry Prep | EduMeUp";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "EduMeUp's Pakistan FSc / ICS Programme for Grade 11-12 with complete curriculum coverage, university entrance prep, and merit list achievement.",
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
              FSc / ICS Excellence: From Grades to University Entry
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base text-slate-700 md:text-lg">
              Complete Grade 11-12 preparation designed to achieve top marks and secure merit-based university admission.
            </p>
            <p className="mx-auto mt-3 max-w-3xl text-sm text-slate-600">
              Advanced concepts training with university entrance exam focus.
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
              <Link href="/programs/ecat">
                <span className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:border-blue-300 hover:text-[#2366c9]">
                  ECAT Entry Test
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
              Why FSc / ICS Students Need Strategic Support
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              FSc and ICS are crucial transition years where university entrance competition intensifies. Students face advanced abstract concepts, heavy practical workloads, and tight competition for merit-based admission. While traditional tuition covers content, it rarely ensures deep conceptual understanding or exam strategy mastery. EduMeUp bridges this gap with cognitive science-backed learning combined with university entrance readiness.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-14 md:pb-20">
        <div className="container-custom">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
              What the FSc / ICS Programme Covers
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {fscIcsCoverage.map((item) => (
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
            {fscIcsHowItWorks.map((item) => (
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
                {fscIcsWhoItsFor.map((item) => (
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
                {fscIcsSubjectsIncluded.map((item) => (
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
                    <td className="px-4 py-3 text-sm font-semibold text-slate-900">FSc / ICS (All Subjects, Part 1 & 2)</td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-900">$20/mo</td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-900">$199/yr</td>
                    <td className="px-4 py-3 text-sm text-slate-800">
                      Complete Grade 11-12 curriculum, university entrance prep, past papers, MCQs
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

