import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, GraduationCap, BookOpen, Target, Brain, Lightbulb, AlertTriangle, PenLine } from "lucide-react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";

const workshopDetails = [
  { label: "Workshop Name", value: "Cambridge Teacher Mastery Workshop (CTMW)" },
  { label: "Certificate Awarded", value: "EduMeUp Certificate of Cambridge Teaching Excellence (CCTE)" },
  { label: "CPD Hours", value: "7 hours — recognised continuing professional development" },
  { label: "Duration", value: "One full day — 08:30 to 16:30" },
  { label: "Format", value: "In-person (school or venue) or live online — maximum 30 participants" },
  { label: "Subjects Covered", value: "All 10: English, Mathematics, Physics, Chemistry, Biology, Economics, Business Studies, Urdu (3248), Islamiyat, Pakistan Studies" },
  { label: "Certificate Criteria", value: "Full attendance + open-book post-workshop reflective assessment" },
  { label: "Conducted by", value: "EduMeUp Cambridge Education Specialists — 27+ years in school leadership" },
];

const modules = [
  {
    number: 1,
    icon: BookOpen,
    title: "Cambridge Assessment Architecture",
    desc: "How examinations are structured, how marks are allocated, and the command word taxonomy every teacher must master.",
  },
  {
    number: 2,
    icon: Target,
    title: "Teaching for Maximum Marks",
    desc: "The content-performance gap and 8 specific response-architecture techniques that close it.",
  },
  {
    number: 3,
    icon: Brain,
    title: "High-Retention Lesson Design",
    desc: "The forgetting curve and a practical 3-phase lesson structure based on retrieval practice and spaced repetition science.",
  },
  {
    number: 4,
    icon: GraduationCap,
    title: "Classroom Management for Cambridge",
    desc: "High-expectation academic culture, anxiety management, cold calling without embarrassment, and the 3-second wait-time technique.",
  },
  {
    number: 5,
    icon: Lightbulb,
    title: "Inspiring Students",
    desc: "SDT in Cambridge classrooms, 8 growth mindset language shifts, and targeted strategies for the 4 most common student motivation profiles.",
  },
  {
    number: 6,
    icon: AlertTriangle,
    title: "Common Teaching Mistakes",
    desc: "The 7 most costly student mark-loss patterns, their root teaching cause, and a specific correction for each — applicable the next morning.",
  },
  {
    number: 7,
    icon: PenLine,
    title: "Subject Application & Action Planning",
    desc: "Subject breakout groups apply the day's learning. Every participant leaves with a 3-week lesson improvement plan and one ready-to-use classroom intervention.",
  },
];

const practicalTools = [
  "A 3-week personalised lesson improvement plan",
  "One retrieval practice opener for their next lesson",
  "The Cambridge command word taxonomy — annotated",
  "A mark-loss pattern analysis for their subject",
  "The 3-phase retention lesson structure template",
];

const certConfirms = [
  "Cambridge assessment architecture competency",
  "Evidence-based retention lesson design skills",
  "Examination strategy teaching capability",
  "Classroom management for academic culture",
  "7 CPD hours of recognised professional development",
];

export default function TeacherTraining() {
  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") || "";

    document.title = "Cambridge Teacher Training — CTMW Workshop & CCTE Certificate | EduMeUp";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "EduMeUp's Cambridge Teacher Mastery Workshop (CTMW) trains educators in mark scheme mastery, retention lesson design, and exam strategy. 7 CPD hours. Certificate of Cambridge Teaching Excellence awarded.",
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
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 to-white py-16 md:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
      
            <h1 className="text-5xl md:text-7xl font-semibold text-slate-900 mb-6 tracking-tight leading-tight">
              Cambridge Teacher Training That Changes What Happens in the Exam Room
            </h1>
            <p className="text-base text-slate-700 max-w-3xl mx-auto leading-relaxed mb-8">
              One day. 7 CPD hours. Certificate of Cambridge Teaching Excellence.
            </p>
            <Link href="/contact">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#2366c9] px-7 py-3.5 text-[14px] font-semibold text-white hover:bg-blue-700">
                Book a Workshop for Your School
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* THE GAP */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl">
            <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
              The Problem
            </p>
            <h2 className="text-4xl md:text-6xl font-semibold text-slate-900 tracking-tight mb-5">
              The Gap Most Teacher Training Ignores
            </h2>
            <p className="text-base text-black leading-relaxed">
              Subject knowledge is necessary. Cambridge exam performance requires something additional: explicit understanding of how assessment works, how marks are allocated, and how to teach students to demonstrate their knowledge under timed, unsupported conditions. Most teacher training programmes never address this. The Cambridge Teacher Mastery Workshop does — in a single, intensive, practical day.
            </p>
          </div>
        </div>
      </section>

      {/* WORKSHOP AT A GLANCE — grid table */}
      <section className="py-14 md:py-20 bg-blue-50/50">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-10">
              <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
                Workshop Details
              </p>
              <h2 className="text-4xl md:text-6xl font-semibold text-slate-900 tracking-tight">
                Workshop at a Glance
              </h2>
            </div>
            {/* Header */}
            <div className="grid grid-cols-[200px_1fr] bg-[#2366c9] text-white text-xs uppercase tracking-wider font-semibold rounded-t-xl overflow-hidden">
              <div className="p-4">Detail</div>
              <div className="p-4 border-l border-blue-400/30">Information</div>
            </div>
            {/* Rows */}
            {workshopDetails.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-[200px_1fr] border-b border-blue-50 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"} hover:bg-blue-50/40 transition-colors`}
              >
                <div className="p-4 text-xs font-semibold uppercase tracking-wide text-[#2366c9]">{row.label}</div>
                <div className="p-4 border-l border-slate-200 text-[14px] text-black">{row.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 MODULES */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
                The Day
              </p>
              <h2 className="text-4xl md:text-6xl font-semibold text-slate-900 tracking-tight">
                7 Modules — What the Day Covers
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {modules.map((mod) => (
                <motion.div
                  key={mod.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: mod.number * 0.05 }}
                  className="bg-white p-8 rounded-xl border border-blue-200 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-[#2366c9] transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[#2366c9] text-white text-xs font-bold shrink-0">
                      {mod.number}
                    </div>
                    <mod.icon className="h-5 w-5 text-[#2366c9]" />
                  </div>
                  <h3 className="text-2xl font-semibold text-[#2366c9] mb-4">{mod.title}</h3>
                  <p className="text-[14px] text-black leading-relaxed">{mod.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT TEACHERS LEAVE WITH */}
      <section className="py-14 md:py-20 bg-blue-50/50">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
                Outcomes
              </p>
              <h2 className="text-4xl md:text-6xl font-semibold text-slate-900 tracking-tight">
                What Teachers Leave With
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-white p-8 rounded-xl border border-blue-200 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-[#2366c9] transition-all duration-300">
                <h3 className="text-2xl font-semibold text-[#2366c9] mb-4">Practical tools — ready tomorrow:</h3>
                <ul className="space-y-3">
                  {practicalTools.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[14px] text-black">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-8 rounded-xl border border-[#2366c9] border-2 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="h-6 w-6 text-[#2366c9]" />
                  <h3 className="text-2xl font-semibold text-[#2366c9]">The CCTE Certificate confirms:</h3>
                </div>
                <ul className="space-y-3">
                  {certConfirms.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[14px] text-black">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2366c9]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EVIDENCE */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl bg-blue-50/50 border border-blue-200 rounded-xl p-8 md:p-10">
            <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
              Research Engine
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight mb-5">
              The Evidence for Teacher Professional Development
            </h2>
            <p className="text-base text-black leading-relaxed">
              Teacher quality is the single most powerful in-school factor affecting student achievement — more than class size, school resources, or curriculum (Hattie, 2009). Effective CPD is sustained, content-specific, and directly connected to classroom practice (Darling-Hammond et al., 2017). Pedagogical content knowledge — knowing how to teach a subject, not just knowing the subject — is the most significant differentiator between teachers who produce exam results and those who do not (Shulman, 1986).
            </p>
          </div>
        </div>
      </section>

      {/* BOOK SECTION */}
      <section className="py-14 md:py-20 bg-blue-50/50">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl">
            <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
              Enrol
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight mb-5">
              Book a Workshop for Your School or Register Individually
            </h2>
            <p className="text-base text-black leading-relaxed">
              The CTMW is available as a full school booking (all subject teachers, one day) or for individual teacher registration. School bookings include a pre-workshop needs analysis and a post-workshop 30-day follow-up session at no additional cost. Part of the{" "}
              <Link href="/for-schools/partnership">
                <span className="text-[#2366c9] underline cursor-pointer font-semibold">EduMeUp School Partnership</span>
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="py-20 md:py-32 bg-[#2366c9] text-white relative overflow-hidden">
        <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-blue-600 opacity-30 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-blue-600 opacity-30 blur-3xl" aria-hidden="true" />
        <div className="container-custom text-center relative z-10">
          <div className="flex justify-center w-full mb-6">
            <h2 className="text-4xl md:text-6xl text-white font-semibold leading-[1.05] mb-3 text-center tracking-tight px-4">
              Train Your Teachers. Transform Your Results.
            </h2>
          </div>
          <p className="text-base text-blue-200 mb-12 max-w-3xl mx-auto">
            One day. 7 CPD hours. Certificate of Cambridge Teaching Excellence. Immediate classroom application.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6 max-w-5xl mx-auto">
            <Link href="/contact">
              <Button size="lg" className="w-full md:w-auto min-w-[260px] bg-white text-[#2366c9] hover:bg-blue-50 font-semibold py-3 px-6 rounded-xl text-[14px] shadow-md flex items-center justify-center gap-2">
                Book for Your School <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="w-full md:w-auto min-w-[260px] border border-white/30 text-white hover:bg-white/10 font-semibold py-3 px-6 rounded-xl text-[14px] shadow-md flex items-center justify-center gap-2">
                Register as an Individual Teacher <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* REFERENCES */}
      <section className="py-10 bg-white border-t border-blue-100">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">References</h3>
            <ul className="space-y-1 text-xs text-slate-500">
              <li>Darling-Hammond, L., Hyler, M. E., &amp; Gardner, M. (2017). <em>Effective teacher professional development.</em> Learning Policy Institute.</li>
              <li>Hattie, J. (2009). <em>Visible learning.</em> Routledge.</li>
              <li>Shulman, L. S. (1986). Those who understand: Knowledge growth in teaching. <em>Educational Researcher, 15</em>(2), 4–14.</li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}
