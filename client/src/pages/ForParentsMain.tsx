import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  parentBenefits,
  parentCanDoList,
  parentDoNotNeedList,
  parentReferences,
} from "@/components/for-parents/for-parents-content";

export default function ForParentsMain() {
  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") || "";

    document.title =
      "For Parents - Real-Time Visibility into Your Child's O-Level Learning | EduMeUp";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "EduMeUp gives parents real-time progress dashboards, weak-topic alerts, parent training modules, and structured home-support guides for their child's Cambridge preparation.",
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
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mx-auto max-w-5xl text-center"
          >
            <div className="mb-4 inline-flex rounded-full border border-blue-200 bg-blue-100 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#2366c9]">
              For Parents
            </div>
            <h1 className="text-4xl font-semibold text-slate-900 md:text-6xl">
              You Cannot Support What You Cannot See
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base text-slate-700 md:text-lg">
              Real-time visibility into your child's O-Level preparation, not just
              at exam time.
            </p>
            <p className="mx-auto mt-3 max-w-3xl text-sm text-slate-600">
              parent IGCSE progress tracking child O-Level.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/programs/ai-diagnostic">
                <span className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:border-blue-300 hover:text-[#2366c9]">
                  AI Diagnostic
                </span>
              </Link>
              <Link href="/why-edumeup/how-it-works">
                <span className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:border-blue-300 hover:text-[#2366c9]">
                  How It Works
                </span>
              </Link>
              <Link href="/for-schools">
                <span className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:border-blue-300 hover:text-[#2366c9]">
                  For Schools
                </span>
              </Link>
            </div>

            <div className="mt-10">
              <Link href="/programs/ai-diagnostic">
                <span className="inline-flex items-center gap-2 rounded-lg bg-[#2366c9] px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700">
                  Start Your Child's Free Diagnostic
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
              The Parent's Frustration, Solved
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              Most parents spend thousands on tutors and still find out their child
              had a serious gap only when exam results arrive. EduMeUp gives you the
              visibility to act early before the exam, not after. You do not need to
              know the subject. You just need to see what is happening.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-14 md:pb-20">
        <div className="container-custom">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
              What EduMeUp Gives Parents
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {parentBenefits.map((item) => (
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
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-green-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">
                What You Can Do This Week
              </h2>
              <div className="mt-5 space-y-3">
                {parentCanDoList.map((item) => (
                  <p key={item} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                    <span>{item}</span>
                  </p>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">
                What You Do Not Need To Do
              </h2>
              <div className="mt-5 space-y-3">
                {parentDoNotNeedList.map((item) => (
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

      <section className="py-14 md:py-20">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl rounded-2xl border border-blue-100 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
              The Evidence for Parent Engagement
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              Parent engagement is one of the most consistent predictors of student
              achievement across educational contexts. Students whose parents have
              real visibility into learning demonstrate higher consistency and better
              outcomes, not because parents teach content, but because they maintain
              the conditions for learning.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Link href="/programs/ai-diagnostic">
                <span className="flex items-center justify-between rounded-xl bg-[#2366c9] px-5 py-4 text-sm font-semibold text-white hover:bg-blue-700">
                  Start Your Child's Free Diagnostic
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link href="/programs">
                <span className="flex items-center justify-between rounded-xl border border-blue-200 bg-white px-5 py-4 text-sm font-semibold text-slate-900 hover:border-blue-300 hover:text-[#2366c9]">
                  Explore All Programmes
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 md:py-32 bg-[#2366c9] text-white relative overflow-hidden">
        <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-blue-600 opacity-30 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-blue-600 opacity-30 blur-3xl" aria-hidden="true" />
        <div className="container-custom text-center relative z-10">
          <div className="flex justify-center w-full mb-6">
            <h2 className="text-4xl md:text-6xl text-white font-semibold leading-[1.05] mb-3 text-center tracking-tight px-4">
              See Your Child's Learning — In Real Time
            </h2>
          </div>
          <p className="text-base text-blue-200 mb-12 max-w-3xl mx-auto">
            Start with a free diagnostic. Know exactly where your child is and what to do next.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6 max-w-5xl mx-auto">
            <Link href="/programs/ai-diagnostic">
              <Button size="lg" className="w-full md:w-auto min-w-[260px] bg-white text-[#2366c9] hover:bg-blue-50 font-semibold py-3 px-6 rounded-xl text-[14px] shadow-md flex items-center justify-center gap-2">
                Start Your Child's Free Diagnostic <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/programs">
              <Button size="lg" variant="outline" className="w-full md:w-auto min-w-[260px] border border-white/30 text-white hover:bg-white/10 font-semibold py-3 px-6 rounded-xl text-[14px] shadow-md flex items-center justify-center gap-2">
                Explore All Programmes <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="pb-14 md:pb-20">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-slate-900">References</h2>
            <div className="mt-4 space-y-2">
              {parentReferences.map((reference) => (
                <p key={reference} className="text-sm text-slate-700">
                  {reference}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
