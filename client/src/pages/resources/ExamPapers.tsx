import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import {
  examPapersFeatures,
  examPapersReferences,
} from "@/components/resources/exam-papers-content";

export default function ExamPapers() {
  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") || "";

    document.title = "Cambridge O-Level Past Papers with Enhanced Solutions | EduMeUp";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "EduMeUp provides real Cambridge O-Level past papers in two formats: online timed MCQ exams with instant solutions, and downloadable essay papers with real-exam simulation and enhanced solutions on the platform.",
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
              Real Cambridge O-Level Papers, Online and Hands-On with Enhanced Solutions
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base text-slate-700 md:text-lg">
              Two exam formats. One platform. Practice exactly the way Cambridge tests you.
            </p>
            <p className="mx-auto mt-3 max-w-3xl text-sm text-slate-600">
              Cambridge O-Level past papers enhanced solutions online.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/programs/ai-diagnostic">
                <span className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:border-blue-300 hover:text-[#2366c9]">
                  AI Diagnostic
                </span>
              </Link>
              <Link href="/resources/all">
                <span className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:border-blue-300 hover:text-[#2366c9]">
                  All Resources
                </span>
              </Link>
              <Link href="/programs/complete-o-level">
                <span className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:border-blue-300 hover:text-[#2366c9]">
                  Complete O-Level
                </span>
              </Link>
            </div>

            <div className="mt-10">
              <Link href="/resources/exam-papers">
                <span className="inline-flex items-center gap-2 rounded-lg bg-[#2366c9] px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700">
                  Explore Now
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl rounded-2xl border border-blue-100 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">What This Resource Provides</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              Cambridge O-Level exams test students differently by paper type.
              Multiple-choice papers demand speed and precision under time pressure,
              while essay and structured-response papers require handwritten depth,
              diagrams, and calculations. EduMeUp supports both modes with separate
              exam-practice formats rather than a single digital approximation.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-14 md:pb-20">
        <div className="container-custom">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">The Two Paper Formats</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">Format A - Paper 1: Multiple Choice (Online, Time-Bound)</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Paper 1 MCQ exams run directly on the platform with Cambridge-matched
                timing and countdown control. On submission, enhanced solutions are
                released instantly: correct reasoning, wrong-answer traps, and tested
                concept focus. Students may also review solutions without timed attempt.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Immediate corrective feedback after retrieval attempts is strongly linked
                with stronger long-term retention.
              </p>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">Format B - Paper 2: Essay/Structured Response (Download + Simulation)</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Paper 2 practice is completed by hand using downloadable PDFs. Students
                can do standard self-timed practice, or use real-time simulation:
              </p>
              <div className="mt-3 space-y-2 text-sm text-slate-700">
                <p>1. Start the exam session on platform; timer begins for full Cambridge duration.</p>
                <p>2. Complete handwritten responses on the downloaded paper.</p>
                <p>3. After timer end, use a 15-minute upload window to submit photos/PDF.</p>
                <p>4. Enhanced solutions release after upload, or can be accessed without submission for review.</p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                This hybrid approach supports authentic practice for diagrams,
                equations, constructions, and extended written responses.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-blue-100 bg-blue-50/40 py-14 md:py-20">
        <div className="container-custom">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">Features</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {examPapersFeatures.map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-[#2366c9]">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl rounded-2xl border border-amber-300 bg-amber-50 p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-semibold text-amber-900">Developer Note - Paper 2 Upload Workflow</h2>
            <p className="mt-3 text-sm leading-relaxed text-amber-900/90">
              Real-time simulation requires: (1) timer start on student confirmation
              with exact Cambridge duration, (2) automatic 15-minute post-timer upload
              window, (3) file upload for PDF and image formats up to confirmed size
              limit, and (4) enhanced solutions released automatically after upload or
              when student clicks access without submitting. Confirm upload size limits
              and accepted file types with development team before launch.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-blue-100 bg-blue-50/40 py-14 md:py-20">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl rounded-2xl border border-blue-100 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-semibold text-slate-900">Research References</h2>
            <div className="mt-4 space-y-3">
              {examPapersReferences.map((reference) => (
                <p key={reference} className="text-sm text-slate-700">
                  {reference}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl rounded-2xl border border-blue-100 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">Pricing</h2>
            <p className="mt-3 text-sm text-slate-700">Confirm pricing from the owner.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Link href="/resources/exam-papers">
                <span className="flex items-center justify-between rounded-xl border border-blue-200 bg-white px-5 py-4 text-sm font-semibold text-slate-900 hover:border-blue-300 hover:text-[#2366c9]">
                  Start Exam Preparation
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link href="/resources/exam-papers">
                <span className="flex items-center justify-between rounded-xl bg-[#2366c9] px-5 py-4 text-sm font-semibold text-white hover:bg-blue-700">
                  View Sample Paper
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