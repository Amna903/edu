import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import {
  conceptualFeatures,
  conceptualReferences,
} from "@/components/resources/conceptual-workbooks-content";

export default function ConceptualWorkbooks() {
  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") || "";

    document.title = "Conceptual Learning & Practice Workbooks | EduMeUp";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "EduMeUp's Conceptual Workbooks provide downloadable topic-by-topic practice for every O-Level subject - with key concept summaries before each section and full enhanced solutions at the end.",
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
              Conceptual Workbooks with Solutions, All Subjects, All Topics
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base text-slate-700 md:text-lg">
              Downloadable topic-by-topic practice with concept summaries and full enhanced solutions.
            </p>
            <p className="mx-auto mt-3 max-w-3xl text-sm text-slate-600">
              O-Level conceptual workbooks downloadable practice solutions Cambridge.
            </p>
            <div className="mt-8">
              <Link href="/resources/workbooks">
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
              Each workbook covers a complete O-Level subject topic by topic. Before
              each practice section, students receive concise concept summaries,
              essential formulas, and key points to build foundation before attempt.
              Practice sections are designed for handwritten completion. Full
              enhanced solutions appear at the end so students review only after an
              independent attempt. This design supports active engagement over passive
              reading.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              Writing by hand has been shown to strengthen retention and recall versus
              keyboard-based input because it requires deeper cognitive processing.
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
            {conceptualFeatures.map((feature) => (
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
              {conceptualReferences.map((reference) => (
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
            <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">Next Step</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Link href="/resources/workbooks">
                <span className="flex items-center justify-between rounded-xl border border-blue-200 bg-white px-5 py-4 text-sm font-semibold text-slate-900 hover:border-blue-300 hover:text-[#2366c9]">
                  Browse Workbooks
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
