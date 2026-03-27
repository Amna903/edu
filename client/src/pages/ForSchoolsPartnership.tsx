import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, BookOpen, GraduationCap, Users, BarChart3, Palette, Headset, CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";

const partnershipIncludes = [
  {
    icon: BookOpen,
    title: "Student Platform — All Subjects",
    desc: "Full access to EduMeUp's interactive learning platform for every enrolled student. 10 subjects, Grades 1 through O-Level.",
  },
  {
    icon: GraduationCap,
    title: "Cambridge Teacher Mastery Workshop",
    desc: "The full one-day CTMW for your teaching staff — 7 CPD hours, Certificate of Cambridge Teaching Excellence. Delivered per term or per year.",
  },
  {
    icon: Users,
    title: "Parent Dashboard & Training",
    desc: "Every parent receives real-time visibility into their child's learning, plus training modules on how to support effectively at home.",
  },
  {
    icon: BarChart3,
    title: "Admin Analytics Dashboard",
    desc: "School leadership receives aggregated data on student progress, teacher performance, course effectiveness, and subject-level trends — updated in real time.",
  },
  {
    icon: Palette,
    title: "White-Label Option",
    desc: "Schools can deploy the platform under their own branding — maintaining institutional identity while powered by EduMeUp's content and system.",
  },
  {
    icon: Headset,
    title: "Ongoing Expert Support",
    desc: "Access to EduMeUp's Cambridge education specialists throughout the partnership — for curriculum queries, teacher support, and platform guidance.",
  },
];

const comparisonRows = [
  { typical: "Student access only — teachers not trained", edumeup: "Teacher CPD built into the partnership from Day 1" },
  { typical: "No parent component", edumeup: "Parent dashboard and training modules included" },
  { typical: "No admin analytics", edumeup: "Real-time aggregated data for school leadership" },
  { typical: "Franchise model — high upfront fee, revenue percentage", edumeup: "Transparent per-student pricing — no hidden fees, no franchise charges" },
  { typical: "Content updates at extra cost", edumeup: "Continuous content updates included in partnership" },
  { typical: "No ongoing support after onboarding", edumeup: "Expert support throughout the partnership term" },
];

const implementationPhases = [
  {
    period: "Month 1",
    title: "Setup & Training",
    desc: "Platform configured. Cambridge Teacher Mastery Workshop delivered for all teaching staff. Parent dashboard activated.",
  },
  {
    period: "Months 2–3",
    title: "Student Onboarding",
    desc: "Diagnostics completed for all enrolled students. Personalised pathways activated. Admin analytics dashboard live.",
  },
  {
    period: "Months 4–6",
    title: "Data Review & Adjustment",
    desc: "First performance data reviewed with school leadership. Corrective adjustments to pathways and support.",
  },
  {
    period: "Month 7+",
    title: "Optimisation & Expansion",
    desc: "System embedded. Results visible. Expansion to additional year groups or subjects as needed.",
  },
];

export default function ForSchoolsPartnership() {
  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") || "";

    document.title = "EduMeUp School Partnership — Complete Academic Infrastructure for Cambridge Schools";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "EduMeUp's school partnership provides Cambridge schools with teacher training, student platform, parent tools, and admin analytics — a complete academic system, not another EdTech tool.",
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
              A Complete Academic System - Not Another EdTech Tool
            </h1>
            <p className="text-base text-slate-700 max-w-3xl mx-auto leading-relaxed mb-8">
              Everything your school needs to deliver Cambridge excellence, in one partnership.
            </p>
            <Link href="/contact">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#2366c9] px-7 py-3.5 text-[14px] font-semibold text-white hover:bg-blue-700">
                Book a School Partnership Consultation
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* WHAT SCHOOLS ACTUALLY NEED */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl">
            <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
              The Problem
            </p>
            <h2 className="text-4xl md:text-6xl font-semibold text-slate-900 tracking-tight mb-5">
              What Schools Actually Need — vs What Most EdTech Delivers
            </h2>
            <p className="text-base text-black leading-relaxed">
              Most schools are not short of EdTech tools. They are short of a system. Individual tools produce individual results. A student platform without teacher training. Analytics without the capacity to act on them. Content without a retention architecture. EduMeUp is built differently — one partnership, four stakeholders served, one coherent system.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT THE PARTNERSHIP INCLUDES */}
      <section className="py-14 md:py-20 bg-blue-50/50">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
                COMPLETE ECOSYSTEM
              </p>
              <h2 className="text-4xl md:text-6xl font-semibold text-slate-900 tracking-tight">
                What the Partnership Includes — Full Breakdown
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {partnershipIncludes.map((item) => (
                <div key={item.title} className="bg-white p-8 rounded-xl border border-blue-200 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-[#2366c9] transition-all duration-300 group">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-[#2366c9]">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-semibold text-[#2366c9] mb-4">{item.title}</h3>
                  <p className="text-[14px] text-black leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-10">
              <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
                Two Models
              </p>
              <h2 className="text-4xl md:text-6xl font-semibold text-slate-900 tracking-tight">
                Partnership vs One-Off Tool Procurement
              </h2>
            </div>
            {/* Header */}
            <div className="grid grid-cols-2 bg-[#2366c9] text-white text-xs uppercase tracking-wider font-semibold rounded-t-xl overflow-hidden">
              <div className="p-4">Typical EdTech Tool</div>
              <div className="p-4 border-l border-blue-400/30">EduMeUp Partnership</div>
            </div>
            {/* Rows */}
            {comparisonRows.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-2 border-b border-blue-50 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"} hover:bg-blue-50/40 transition-colors`}
              >
                <div className="p-4 text-[14px] text-black flex items-start gap-2">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                  {row.typical}
                </div>
                <div className="p-4 border-l border-slate-200 text-[14px] text-black font-medium flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                  {row.edumeup}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPLEMENTATION */}
      <section className="py-14 md:py-20 bg-blue-50/50">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
                Implementation
              </p>
              <h2 className="text-4xl md:text-6xl font-semibold text-slate-900 tracking-tight">
                Implementation — 4 Phases
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {implementationPhases.map((phase, i) => (
                <div key={i} className="bg-white p-8 rounded-xl border border-blue-200 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-[#2366c9] transition-all duration-300 group">
                  <div className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-[#2366c9] mb-4 uppercase tracking-wide">
                    {phase.period}
                  </div>
                  <h3 className="text-2xl font-semibold text-[#2366c9] mb-4">{phase.title}</h3>
                  <p className="text-[14px] text-black leading-relaxed">{phase.desc}</p>
                </div>
              ))}
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
              The Evidence for Whole-School EdTech Implementation
            </h2>
            <p className="text-base text-black leading-relaxed">
              Teacher quality is the single most powerful in-school factor affecting student outcomes (Hattie, 2009). EdTech implementations that include teacher training and stakeholder alignment produce significantly stronger results than student-only tool deployments (Fullan, 2007). Personalised learning at the school level requires diagnostic data infrastructure, teacher capacity to respond to it, and parent engagement as a multiplier — all three components EduMeUp delivers (Pane et al., 2017).
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
              Build Your School Partnership Today
            </h2>
          </div>
          <p className="text-base text-blue-200 mb-12 max-w-3xl mx-auto">
            EduMeUp delivers a complete academic infrastructure. Students. Teachers. Parents. Admin. All in one partnership.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6 max-w-5xl mx-auto">
            <Link href="/contact">
              <Button size="lg" className="w-full md:w-auto min-w-[260px] bg-white text-[#2366c9] hover:bg-blue-50 font-semibold py-3 px-6 rounded-xl text-[14px] shadow-md flex items-center justify-center gap-2">
                Book a School Partnership Consultation <ArrowRight className="h-4 w-4" />
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

      {/* REFERENCES */}
      <section className="py-10 bg-white border-t border-blue-100">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">References</h3>
            <ul className="space-y-1 text-xs text-slate-500">
              <li>Fullan, M. (2007). <em>The new meaning of educational change</em> (4th ed.). Teachers College Press.</li>
              <li>Hattie, J. (2009). <em>Visible learning.</em> Routledge.</li>
              <li>Pane, J. F., Steiner, E. D., Baird, M. D., &amp; Hamilton, L. S. (2017). Informing progress: Insights on personalised learning. RAND Corporation.</li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}
