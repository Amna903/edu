import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Building2,
  GraduationCap,
  MessageSquare,
  Zap,
  Gift,
  ArrowRight,
  Mail,
  Clock,
  Users,
  BookOpen,
  School,
  AlertCircle,
} from "lucide-react";
import { Layout } from "@/components/Layout";

export default function Contact() {
  const [location] = useLocation();
  const [activeRoute, setActiveRoute] = useState<string | null>(null);

  // Parse URL parameter on mount
  useEffect(() => {
    const params = new URLSearchParams(location.split("?")[1] || "");
    const typeParam = params.get("type");
    if (typeParam) {
      setActiveRoute(typeParam);
      // Auto-scroll to form
      setTimeout(() => {
        const element = document.querySelector(`#${typeParam}-section`);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location]);

  useEffect(() => {
    document.title = "Contact EduMeUp - Get in Touch | EduMeUp";
    const metaDescription = document.querySelector(
      'meta[name="description"]'
    );
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Contact EduMeUp for school partnerships, expert sessions, student support, or technical help. Fast response times — choose your route."
      );
    }
  }, []);

  return (
    <Layout>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 to-white py-16 md:py-24">
        <div className="container-custom relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900">
              How Can We Help You?
            </h1>
            <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto">
              Select the option that best describes what you need — you will be
              routed to the right team or form immediately.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FIVE CONTACT ROUTES - CARDS */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom max-w-6xl">
          <div className="space-y-6">
            {/* SCHOOL CONSULTATION - FEATURED CARD (full width) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => setActiveRoute("school_consultation")}
              className="group cursor-pointer rounded-2xl bg-gradient-to-br from-[#0b3c5d] to-[#2366c9] p-8 md:p-10 text-white shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <Building2 className="h-6 w-6 text-amber-300" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                      Featured Route
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl text-white font-semibold mb-3">
                    Book a Free School Strategy Session
                  </h3>
                  <p className="text-base text-white/90 mb-4">
                    <strong>Who this is for:</strong> School principals, academic
                    directors, and heads of department considering an EduMeUp
                    school partnership.
                  </p>
                  <div className="space-y-2 text-sm text-white/80 mb-6">
                    <p className="flex items-center text-white gap-2">
                      <Clock className="h-4 w-4 flex-shrink-0 text-amber-300" />
                      <strong className="text-white ">Response:</strong > Personal response from Chief
                      Adviser within 1 working day
                    </p>
                    <p className="flex items-center gap-2 text-white" >
                      <Clock className="h-4 w-4 flex-shrink-0 text-amber-300" />
                     <strong className="text-white ">Session scheduled:</strong> Within 5 working days
                    </p>
                  </div>
                  <button className="inline-flex items-center gap-2 bg-amber-300 text-[#0b3c5d] font-semibold px-6 py-3 rounded-lg hover:bg-amber-200 transition-colors shadow-sm">
                    Book a 30-Minute Strategy Session
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* REMAINING FOUR ROUTES - 2x2 GRID */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Cambridge 360deg Hub Session */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                onClick={() => setActiveRoute("c360_session")}
                className="group cursor-pointer rounded-xl bg-white border-2 border-blue-200 p-6 hover:border-[#2366c9] hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <GraduationCap className="h-6 w-6 text-[#2366c9]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900">
                      Book a Cambridge 360deg Hub Session
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      For: Existing or prospective C360 Hub subscribers
                    </p>
                  </div>
                </div>
                <p className="text-sm text-slate-700 mb-4">
                  Book a live expert session (Plans 2, 3, or 4).
                </p>
                <div className="mb-4 p-3 bg-blue-50 rounded text-sm text-slate-900 font-medium border border-blue-100">
                  Response: <span className="text-[#2366c9] font-bold">Instant</span> — Calendly
                  booking opens immediately
                </div>
                <button className="text-sm font-semibold text-[#2366c9] hover:text-blue-700 flex items-center gap-2">
                  Book Session via Calendly
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>

              {/* General Enquiry */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                onClick={() => setActiveRoute("general")}
                className="group cursor-pointer rounded-xl bg-white border-2 border-blue-200 p-6 hover:border-[#2366c9] hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <MessageSquare className="h-6 w-6 text-[#2366c9]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900">
                      General Enquiry — Students and Parents
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      For: Questions about courses, pricing, the diagnostic
                    </p>
                  </div>
                </div>
                <p className="text-sm text-slate-700 mb-4">
                  Questions about courses, pricing, the diagnostic, or anything
                  else on the platform.
                </p>
                <div className="mb-4 p-3 bg-blue-50 rounded text-sm text-slate-900 font-medium border border-blue-100">
                  Response: <span className="text-[#2366c9] font-bold">1-2 working days</span>
                </div>
                <button className="text-sm font-semibold text-[#2366c9] hover:text-blue-700 flex items-center gap-2">
                  Send a Message
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>

              {/* Technical Support */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                onClick={() => setActiveRoute("support")}
                className="group cursor-pointer rounded-xl bg-white border-2 border-blue-200 p-6 hover:border-[#2366c9] hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Zap className="h-6 w-6 text-[#2366c9]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900">
                      Technical Support
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      For: Login, course access, payments, errors
                    </p>
                  </div>
                </div>
                <p className="text-sm text-slate-700 mb-4">
                  Enrolled students, parents, or teachers with technical
                  problems.
                </p>
                <div className="mb-4 p-3 bg-blue-50 rounded text-sm text-slate-900 font-medium border border-blue-100">
                  Response: <span className="text-[#2366c9] font-bold">1 working day</span>
                </div>
                <button className="text-sm font-semibold text-[#2366c9] hover:text-blue-700 flex items-center gap-2">
                  Report a Problem
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>

              {/* Global Access Scholarship */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                onClick={() =>
                  window.location.href = "/pricing#scholarship"
                }
                className="group cursor-pointer rounded-xl bg-white border-2 border-blue-200 p-6 hover:border-[#2366c9] hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Gift className="h-6 w-6 text-[#2366c9]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900">
                      Global Access Scholarship
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      For: Students from developing countries
                    </p>
                  </div>
                </div>
                <p className="text-sm text-slate-700 mb-4">
                  Up to 40% off course pricing for qualifying students.
                </p>
                <div className="mb-4 p-3 bg-blue-50 rounded text-sm text-slate-900 font-medium border border-blue-100">
                  Response: <span className="text-[#2366c9] font-bold">Instant</span> — eligibility
                  checked instantly
                </div>
                <button className="text-sm font-semibold text-[#2366c9] hover:text-blue-700 flex items-center gap-2">
                  Check My Eligibility
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* RESPONSE TIME COMMITMENTS TABLE */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom max-w-6xl">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-6">
              Response Time Commitments
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full rounded-xl overflow-hidden shadow-sm border border-blue-200">
                <thead>
                  <tr className="bg-[#2366c9] text-white">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                      Enquiry Type
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                      Routed To
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                      Response Time
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                      Channel
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr className="border-b border-slate-100">
                    <td className="px-6 py-4 text-sm text-slate-900 font-medium">
                      School Strategy Session
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      Chief Adviser
                    </td>
                    <td className="px-6 py-4 text-sm text-[#2366c9] font-semibold">
                      Within 1 working day
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      Email from CA
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-900 font-medium">
                      C360 Hub Session
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      Calendly (instant)
                    </td>
                    <td className="px-6 py-4 text-sm text-[#2366c9] font-semibold">
                      Instant booking
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      Calendly confirmation
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-6 py-4 text-sm text-slate-900 font-medium">
                      General Student/Parent Enquiry
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      Support inbox
                    </td>
                    <td className="px-6 py-4 text-sm text-[#2366c9] font-semibold">
                      1-2 working days
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      Email reply
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-900 font-medium">
                      Technical Support
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      Tech support inbox
                    </td>
                    <td className="px-6 py-4 text-sm text-[#2366c9] font-semibold">
                      1 working day
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      Email reply
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-6 py-4 text-sm text-slate-900 font-medium">
                      Scholarship Enquiry
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      Automatic system
                    </td>
                    <td className="px-6 py-4 text-sm text-[#2366c9] font-semibold">
                      Instant
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      Email with code
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <p className="text-sm text-slate-700">
                <strong>EduMeUp operates Monday to Friday.</strong> Enquiries
                received on weekends or public holidays are responded to on the
                next working day. For enrolled students and parents with urgent
                platform access issues, the technical support form is monitored{" "}
                <strong>7 days a week.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BEFORE YOU CONTACT - SELF-SERVE RESOURCES */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom max-w-6xl">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
              Many Questions Are Already Answered — Instantly
            </h2>
            <p className="text-lg text-slate-700 mb-10">
              Before sending a message, check these pages — you may find your
              answer in under a minute:
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Pricing Questions",
                  desc: "All course prices, chapter pricing, subscription options, and scholarship details are on the Pricing page.",
                  link: "/pricing",
                  linkText: "Go to /pricing",
                  color: "blue",
                },
                {
                  title: "How the Platform Works",
                  desc: "The 8-step learning journey, the mastery cycle, and the diagnostic system are all explained for students.",
                  link: "/for-students",
                  linkText: "Go to /for-students",
                  color: "amber",
                },
                {
                  title: "School Partnership",
                  desc: "Full details of all school services, the partnership process, and how to get started.",
                  link: "/for-schools",
                  linkText: "Go to /for-schools",
                  color: "green",
                },
                {
                  title: "Parent Questions",
                  desc: "Plain-English explanations of the parent dashboard, diagnostic report, and how to support your child.",
                  link: "/for-parents",
                  linkText: "Go to /for-parents",
                  color: "purple",
                },
                {
                  title: "Teacher Programmes",
                  desc: "All 7 teacher development programmes, the pathway, and certification details.",
                  link: "/teacher-training",
                  linkText: "Go to /teacher-training",
                  color: "rose",
                },
                {
                  title: "Cambridge 360deg Hub",
                  desc: "AI consultancy plans, session booking, and the full C360 Hub feature list.",
                  link: "/pricing",
                  linkText: "Go to /cambridge-360",
                  color: "cyan",
                },
              ].map((item, i) => (
                <Link key={i} href={item.link}>
                  <div className="p-6 rounded-xl border-2 border-blue-200 bg-white hover:border-[#2366c9] hover:shadow-lg transition-all cursor-pointer">
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-700 mb-4">{item.desc}</p>
                    <span className="text-sm font-semibold text-[#2366c9] hover:underline flex items-center gap-2">
                      {item.linkText}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PLACEHOLDER FOR FORMS - To be implemented next */}
      <div className="bg-slate-50 py-6 px-4 text-center text-slate-600 text-sm">
        <p>
          ℹ️ Forms are being implemented and will appear when you select a
          contact route above
        </p>
      </div>
    </Layout>
  );
}
