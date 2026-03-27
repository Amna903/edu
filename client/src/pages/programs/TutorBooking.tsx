import { useMemo, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { TutorBookingRegistrationDialogs } from "@/components/tutor-booking/TutorBookingRegistrationDialogs";
import {
  studentFeatures,
  studentJourneySteps,
  tutorFeatures,
  tutorJourneySteps,
  tutorNetworkReasons,
} from "@/components/tutor-booking/tutor-booking-content";

export default function TutorBooking() {
  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") || "";

    document.title =
      "Certified Tutor Booking - Personalized 1-to-1 O-Level & IGCSE Support | EduMeUp";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "EduMeUp personally matches students with certified tutors for 1-to-1 O-Level and IGCSE preparation. We manage the matching, the trial classes, and the support - you focus on results.",
      );
    }

    return () => {
      document.title = previousTitle;
      if (metaDescription) {
        metaDescription.setAttribute("content", previousDescription);
      }
    };
  }, []);

  const whatsappHref = useMemo(() => {
    const numberRaw = (import.meta.env.VITE_EDUMEUP_WHATSAPP_NUMBER as string | undefined) || "";
    const number = numberRaw.replace(/[^\d]/g, "");
    if (!number) return "";
    const text = encodeURIComponent("Hello EduMeUp, I need support regarding Tutor Booking.");
    return `https://wa.me/${number}?text=${text}`;
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
              Personalized 1-to-1 Tutoring, Matched by Experts, Not an Algorithm
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base text-slate-700 md:text-lg">
              Tell us what you need. We find the right tutor. You approve. Learning begins.
            </p>
            <p className="mx-auto mt-3 max-w-3xl text-sm text-slate-600">
              certified IGCSE O-Level tutor personalized matching service.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/programs/ai-diagnostic">
                <span className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:border-blue-300 hover:text-[#2366c9]">
                  AI Diagnostic
                </span>
              </Link>
              <Link href="/for-parents">
                <span className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:border-blue-300 hover:text-[#2366c9]">
                  For Parents
                </span>
              </Link>
              <Link href="/teacher-training">
                <span className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:border-blue-300 hover:text-[#2366c9]">
                  Teacher Training
                </span>
              </Link>
              <Link href="/contact">
                <span className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:border-blue-300 hover:text-[#2366c9]">
                  Contact
                </span>
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <TutorBookingRegistrationDialogs />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl rounded-2xl border border-blue-100 bg-white p-6 shadow-sm md:p-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#2366c9]">
              Why 1-to-1 Tutoring Exists at EduMeUp
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900 md:text-4xl">
              When a Student Joins Late, This Is the Answer
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              EduMeUp's strongest outcomes come from students who begin early with
              diagnostics, remedial repair, and bridge learning before O-Level. But
              some students arrive mid-journey carrying unaddressed gaps. For them,
              self-paced learning alone is not enough. They need a qualified human
              who adapts in real time and rebuilds confidence alongside knowledge.
              Every EduMeUp tuition arrangement includes manual tutor matching,
              diagnostic-guided sessions, selected platform resources, and live
              progress visibility.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-14 md:pb-20">
        <div className="container-custom">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">Two Journeys, One Managed System</h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:divide-x lg:divide-blue-100">
            <div className="space-y-6 lg:pr-8">
              <h3 className="text-2xl font-semibold text-slate-900">For Students and Parents</h3>
              {studentJourneySteps.map((step) => (
                <div key={step.title} className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-[#2366c9]">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <p className="text-base font-semibold text-slate-900">{step.title}</p>
                  <p className="mt-2 text-sm text-slate-700">{step.description}</p>
                </div>
              ))}
            </div>

            <div className="space-y-6 lg:pl-8">
              <h3 className="text-2xl font-semibold text-slate-900">For Tutors</h3>
              {tutorJourneySteps.map((step) => (
                <div key={step.title} className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-[#2366c9]">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <p className="text-base font-semibold text-slate-900">{step.title}</p>
                  <p className="mt-2 text-sm text-slate-700">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-blue-100 bg-blue-50/40 py-14 md:py-20">
        <div className="container-custom space-y-12">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">What Comes With Your Tutor</h2>
            <p className="mt-3 text-sm text-slate-700 md:text-base">
              EduMeUp tuition goes beyond teacher matching. Selected platform tools are included to strengthen outcomes alongside tutor sessions, at no extra cost.
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {studentFeatures.map((feature) => (
                <div key={feature.title} className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-[#2366c9]">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <p className="text-base font-semibold text-slate-900">{feature.title}</p>
                  <p className="mt-2 text-sm text-slate-700">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">What EduMeUp Provides Tutors</h2>
            <p className="mt-3 text-sm text-slate-700 md:text-base">
              Once certified, tutors receive selected platform support tools at no cost.
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {tutorFeatures.map((feature) => (
                <div key={feature.title} className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-[#2366c9]">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <p className="text-base font-semibold text-slate-900">{feature.title}</p>
                  <p className="mt-2 text-sm text-slate-700">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-custom">
          <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">Pricing</h2>
          <p className="mt-3 text-sm text-slate-700 md:text-base">All prices are per subject. Platform access is free in all packages.</p>

          <div className="mt-6 overflow-x-auto rounded-xl border border-blue-100 bg-white shadow-sm">
            <table className="w-full min-w-[760px]">
              <thead>
                <tr className="bg-[#2366c9] text-white text-left">
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide">Level</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide">Online (Standard)</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide">Online (Intensive)</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide">Physical (Standard)</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide">Physical (Intensive)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-blue-100">
                  <td className="px-4 py-3 text-sm font-medium text-slate-800">Grades 4-8</td>
                  <td className="px-4 py-3 text-sm text-slate-700">$60/mo (6 hrs)</td>
                  <td className="px-4 py-3 text-sm text-slate-700">$95/mo (10 hrs)</td>
                  <td className="px-4 py-3 text-sm text-slate-700">$90/mo (6 hrs)</td>
                  <td className="px-4 py-3 text-sm text-slate-700">$140/mo (10 hrs)</td>
                </tr>
                <tr className="border-t border-blue-100">
                  <td className="px-4 py-3 text-sm font-medium text-slate-800">O-Level</td>
                  <td className="px-4 py-3 text-sm text-slate-700">$88/mo (8 hrs)</td>
                  <td className="px-4 py-3 text-sm text-slate-700">$125/mo (12 hrs)</td>
                  <td className="px-4 py-3 text-sm text-slate-700">$120/mo (8 hrs)</td>
                  <td className="px-4 py-3 text-sm text-slate-700">$180/mo (12 hrs)</td>
                </tr>
                <tr className="border-t border-blue-100">
                  <td className="px-4 py-3 text-sm font-medium text-slate-800">A-Level</td>
                  <td className="px-4 py-3 text-sm text-slate-700">$96/mo (8 hrs)</td>
                  <td className="px-4 py-3 text-sm text-slate-700">$190/mo (16 hrs)</td>
                  <td className="px-4 py-3 text-sm text-slate-700">$150/mo (8 hrs)</td>
                  <td className="px-4 py-3 text-sm text-slate-700">$280/mo (16 hrs)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-5">
            <p className="text-sm font-semibold text-amber-900">What is free and what is not</p>
            <p className="mt-2 text-sm text-amber-900/90">
              Tutor matching, tutor registration/certification pre-confirmation, parent dashboard, and selected support worksheets are free.
              Full interactive courses, workbooks, exam papers, and full programme access are separate paid offerings.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-blue-100 bg-blue-50/40 py-14 md:py-20">
        <div className="container-custom">
          <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">Why Join the EduMeUp Certified Tutor Network</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {tutorNetworkReasons.map((item) => (
              <div key={item.title} className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-[#2366c9]">
                  <item.icon className="h-5 w-5" />
                </div>
                <p className="text-base font-semibold text-slate-900">{item.title}</p>
                <p className="mt-2 text-sm text-slate-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl rounded-2xl border border-blue-100 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">Bottom CTA</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              <TutorBookingRegistrationDialogs />
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Link href="/tutor-booking/request">
                <span className="flex items-center justify-between rounded-xl border border-blue-200 bg-white px-5 py-4 text-sm font-semibold text-slate-900 hover:border-blue-300 hover:text-[#2366c9]">
                  Request a Tutor
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link href="/tutor-booking/apply">
                <span className="flex items-center justify-between rounded-xl bg-[#2366c9] px-5 py-4 text-sm font-semibold text-white hover:bg-blue-700">
                  Become a Tutor
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-600">
              WhatsApp admin support is available after registration. Configure
              VITE_EDUMEUP_WHATSAPP_NUMBER with the confirmed EduMeUp admin number
              before publishing.
            </p>
          </div>
        </div>
      </section>

      {whatsappHref ? (
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600"
          aria-label="Chat on WhatsApp"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="h-7 w-7" />
        </a>
      ) : null}
    </Layout>
  );
}