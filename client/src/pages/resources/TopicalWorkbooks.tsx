import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import {
  topicalFeatures,
  topicalReferences,
} from "@/components/resources/topical-workbooks-content";

export default function TopicalWorkbooks() {
  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") || "";

    document.title = "Topical Exam Practice Workbooks - Cambridge O-Level Past Questions | EduMeUp";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "EduMeUp's Topical Workbooks organize all Cambridge O-Level past paper questions by topic for downloadable hand-written practice - with enhanced solutions viewable on the platform.",
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
              Topical Exam Practice Workbooks with Enhanced Solutions
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base text-slate-700 md:text-lg">
              Past paper questions organized by topic, with enhanced explanations for every answer.
            </p>
            <p className="mx-auto mt-3 max-w-3xl text-sm text-slate-600">
              Cambridge O-Level topical past paper workbook practice.
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
              <Link href="/resources/topical-workbooks">
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
              Unlike standard collections arranged by exam session, topical workbooks
              group all Cambridge past paper questions for each topic in one sequence.
              Students download and complete by hand, then review enhanced solutions
              on the EduMeUp platform with mark scheme commentary, examiner-language
              guidance, and common error analysis. Separating attempt from solution
              review is intentional and mirrors real exam behavior.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              Retrieval practice, attempting before seeing answers, is strongly linked
              to better long-term retention.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-14 md:pb-20">
        <div className="container-custom">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">Features</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {topicalFeatures.map((feature) => (
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

      <section className="border-y border-blue-100 bg-blue-50/40 py-14 md:py-20">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl rounded-2xl border border-blue-100 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-semibold text-slate-900">Research References</h2>
            <div className="mt-4 space-y-3">
              {topicalReferences.map((reference) => (
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
            <p className="mt-3 text-sm text-slate-700">Confirm current pricing with Muhammad Benyameen.</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Link href="/resources/topical-workbooks">
                <span className="flex items-center justify-between rounded-xl border border-blue-200 bg-white px-5 py-4 text-sm font-semibold text-slate-900 hover:border-blue-300 hover:text-[#2366c9]">
                  Browse Topical Workbooks
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link href="/programs/ai-diagnostic">
                <span className="flex items-center justify-between rounded-xl bg-[#2366c9] px-5 py-4 text-sm font-semibold text-white hover:bg-blue-700">
                  Take Free Diagnostic
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
