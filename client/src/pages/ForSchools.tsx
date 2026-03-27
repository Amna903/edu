import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  schoolAudience,
  schoolSolutions,
} from "@/components/for-schools/for-schools-content";

export default function ForSchools() {
  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") || "";

    document.title = "For Schools - Transform Your School with EduMeUp | EduMeUp";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "EduMeUp provides Cambridge schools with a complete academic system: teacher training, student platform, parent tools, and admin analytics - in one school partnership.",
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
              Transform Your School into a Centre of Cambridge Excellence
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base text-slate-700 md:text-lg">
              One partnership. All four stakeholders. Complete academic infrastructure.
            </p>
            <p className="mx-auto mt-3 max-w-3xl text-sm text-slate-600">
              Cambridge school EdTech system IGCSE.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/for-schools/partnership">
                <span className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:border-blue-300 hover:text-[#2366c9]">
                  School Partnership
                </span>
              </Link>
              <Link href="/teacher-training">
                <span className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:border-blue-300 hover:text-[#2366c9]">
                  Teacher Training
                </span>
              </Link>
              <Link href="/why-edumeup/how-it-works">
                <span className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:border-blue-300 hover:text-[#2366c9]">
                  How It Works
                </span>
              </Link>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/for-schools/partnership">
                <Button className="bg-[#2366c9] hover:bg-blue-700 text-white font-semibold text-[14px] py-3 px-6">
                  Book a School Consultation <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl rounded-2xl border border-blue-100 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
              The Problem Most Cambridge Schools Share
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              Strong teachers. Well-intentioned leadership. Significant investment in
              facilities. And yet: students still depend heavily on private tutors,
              parents still have no real-time visibility into progress, and teachers
              rarely receive CPD that is specifically Cambridge-aligned. EduMeUp
              addresses all three in one school partnership.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-14 md:pb-20">
        <div className="container-custom">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
              What EduMeUp Provides to Your School
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {schoolSolutions.map((item) => (
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
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
              The EduMeUp Advantage Over Standard EdTech
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-slate-700 md:text-base">
              Most EdTech platforms provide student access only. EduMeUp serves all
              four stakeholder groups - students, teachers, schools, and parents -
              with purpose-built tools in a single school partnership. No franchise
              fees. Transparent per-student pricing. Immediate deployment.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-custom">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
              Who This Is For
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {schoolAudience.map((item) => (
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

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Link href="/for-schools/partnership">
              <span className="flex items-center justify-between rounded-xl border border-blue-200 bg-white px-5 py-4 text-sm font-semibold text-slate-900 hover:border-blue-300 hover:text-[#2366c9]">
                Explore the Full Partnership Details
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>

            <Link href="/for-schools/partnership">
              <span className="flex items-center justify-between rounded-xl bg-[#2366c9] px-5 py-4 text-sm font-semibold text-white hover:bg-blue-700">
                Book a School Consultation
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
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
              Transform Your School's Academic Results
            </h2>
          </div>
          <p className="text-base text-blue-200 mb-12 max-w-3xl mx-auto">
            Partner with EduMeUp to deliver Cambridge-standard education with real data, trained teachers, and measurable outcomes.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6 max-w-5xl mx-auto">
            <Link href="/for-schools/partnership">
              <Button size="lg" className="w-full md:w-auto min-w-[260px] bg-white text-[#2366c9] hover:bg-blue-50 font-semibold py-3 px-6 rounded-xl text-[14px] shadow-md flex items-center justify-center gap-2">
                Book a School Consultation <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/teacher-training">
              <Button size="lg" variant="outline" className="w-full md:w-auto min-w-[260px] border border-white/30 text-white hover:bg-white/10 font-semibold py-3 px-6 rounded-xl text-[14px] shadow-md flex items-center justify-center gap-2">
                Explore Teacher Training <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
