import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, XCircle, BookOpen, FlaskConical, Globe, Calculator, Beaker } from "lucide-react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";

const isNotIs = [
  { isNot: "Extra homework on top of the current syllabus", is: "Structured preparation that replaces random tutoring" },
  { isNot: "A crash course in O-Level content", is: "A conceptual foundation that makes O-Level content learnable" },
  { isNot: "More pressure on an already busy student", is: "Self-paced, interactive, and designed to build confidence" },
  { isNot: "A replacement for O-Level study later", is: "A multiplier that makes O-Level study faster and more effective" },
  { isNot: "Only for struggling students", is: "Most valuable for ambitious students who want a genuine advantage" },
];

const subjects = [
  {
    icon: Calculator,
    title: "Mathematics",
    gap: "Students entering O-Level often lack algebraic fluency, coordinate geometry foundations, and the ability to approach non-routine problems systematically — skills assumed from the first O-Level lesson.",
    covers: "Algebraic thinking and manipulation. Coordinate geometry. Ratio, proportion and percentages. Statistical interpretation. Introduction to functions and graph analysis. Non-calculator techniques.",
    outcome: "Students approach O-Level Mathematics without the anxiety of encountering unfamiliar notation and can focus on depth rather than catching up.",
  },
  {
    icon: FlaskConical,
    title: "Physics",
    gap: "The conceptual leap from general science to O-Level Physics is severe. Students who have not been exposed to mechanics, energy principles, and wave theory struggle with every subsequent topic that builds on these foundations.",
    covers: "Forces and motion — Newton's laws in plain language. Energy transfers and efficiency. Wave properties and the electromagnetic spectrum. Pressure and density. Introduction to electricity and circuits.",
    outcome: "Students begin O-Level Physics with the conceptual vocabulary and physical intuition the syllabus assumes — dramatically reducing the time needed to master later topics.",
  },
  {
    icon: Beaker,
    title: "Chemistry",
    gap: "O-Level Chemistry opens with atomic structure, bonding, and chemical equations. Students who have not been introduced to these concepts at a foundational level spend their first term memorising symbols they do not understand.",
    covers: "Atomic structure and the periodic table. Chemical bonding — covalent, ionic, metallic. Balancing chemical equations. States of matter and particle theory. Introduction to acids, bases, and reactions.",
    outcome: "Students arrive at O-Level Chemistry with a working mental model of how matter behaves — transforming abstract symbols into meaningful concepts from the first lesson.",
  },
  {
    icon: BookOpen,
    title: "English",
    gap: "Cambridge O-Level English demands analytical reading, inferential comprehension, and structured writing in academic register — skills that require deliberate development, not assumption.",
    covers: "Reading for inference and evaluation. Academic register and formal writing structures. Essay planning and paragraph construction. Directed writing for audience and purpose. Comprehension technique for unseen passages.",
    outcome: "Students approach Cambridge English papers understanding what the examiner is asking for and how to express it — rather than discovering the register gap under exam conditions.",
  },
  {
    icon: Globe,
    title: "Economics",
    gap: "O-Level Economics introduces supply and demand, market structures, and macroeconomic theory with an expectation of analytical thinking that most Grade 8 students have never been formally taught.",
    covers: "The basic economic problem and resource allocation. Supply, demand, and market equilibrium. Price elasticity — concept and calculation. Government intervention in markets. Introduction to macroeconomic objectives.",
    outcome: "Students enter O-Level Economics able to think analytically about markets and policy — converting what would otherwise feel abstract into a structured and learnable framework.",
  },
];

const pricing = [
  { option: "Individual bridge course (single subject)", price: "$55 per subject", highlight: false },
  { option: "Any 3 subjects", price: "$145 (save $20)", highlight: false },
  { option: "Complete package — all 5 subjects", price: "$250 (save $25 — 24% discount)", highlight: true },
];

export default function BridgeCourses() {
  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") || "";

    document.title = "IGCSE Bridge Courses — Foundation Preparation Grades 7–8 | EduMeUp";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "EduMeUp's O-Level Bridge Courses prepare Grade 7–8 students for Cambridge IGCSE in Math, Physics, Chemistry, English, and Economics. Students cover 20–30% of the O-Level syllabus before they start.",
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
              The Head Start Every O-Level Student Needs - Two Years Before It Matters
            </h1>
            <p className="text-base text-slate-700 max-w-3xl mx-auto leading-relaxed mb-8">
              Cover 20–30% of the Cambridge syllabus before O-Level even begins.
            </p>
            <Link href="/programs/ai-diagnostic">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#2366c9] px-7 py-3.5 text-[14px] font-semibold text-white hover:bg-blue-700">
                Start Your Free Diagnostic First
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
              The Gap Nobody Warns Families About
            </h2>
            <p className="text-base text-black leading-relaxed">
              The jump from Grade 8 to Cambridge O-Level is the steepest academic step most students will ever take. The concepts, the analytical language, the exam thinking — none of it is introduced gradually. Students arrive at O-Level and encounter material that assumes a conceptual baseline they simply do not have.
            </p>
            <p className="mt-4 text-base text-black leading-relaxed">
              The result is predictable: a difficult first year, urgent tutoring, and learning that is always catching up rather than building forward. The bridge courses eliminate this problem entirely — before it begins.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT IT IS / IS NOT — grid table like homepage */}
      <section className="py-14 md:py-20 bg-blue-50/50">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-10">
              <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
                What It Is
              </p>
              <h2 className="text-4xl md:text-6xl font-semibold text-slate-900 tracking-tight">
                What a Bridge Course Is — and What It Is Not
              </h2>
            </div>
            {/* Header */}
            <div className="grid grid-cols-2 bg-[#2366c9] text-white text-xs uppercase tracking-wider font-semibold rounded-t-xl overflow-hidden">
              <div className="p-4">It is NOT</div>
              <div className="p-4 border-l border-blue-400/30">It IS</div>
            </div>
            {/* Rows */}
            {isNotIs.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-2 border-b border-blue-50 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"} hover:bg-blue-50/40 transition-colors`}
              >
                <div className="p-4 text-[14px] text-black flex items-start gap-2">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                  {row.isNot}
                </div>
                <div className="p-4 border-l border-slate-200 text-[14px] text-black font-medium flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                  {row.is}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 SUBJECTS */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
                Five Subjects
              </p>
              <h2 className="text-4xl md:text-6xl font-semibold text-slate-900 tracking-tight">
                Five Subjects — What Each Bridge Course Covers
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {subjects.map((sub) => (
                <div key={sub.title} className="bg-white p-8 rounded-xl border border-blue-200 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-[#2366c9] transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-[#2366c9] shrink-0">
                      <sub.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-semibold text-[#2366c9]">{sub.title}</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wide text-red-500">The gap: </span>
                      <span className="text-[14px] text-black leading-relaxed">{sub.gap}</span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wide text-[#2366c9]">What the bridge covers: </span>
                      <span className="text-[14px] text-black leading-relaxed">{sub.covers}</span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wide text-green-600">Outcome: </span>
                      <span className="text-[14px] text-black leading-relaxed">{sub.outcome}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EVIDENCE */}
      <section className="py-14 md:py-20 bg-blue-50/50">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl bg-white border border-blue-200 rounded-xl p-8 md:p-10 shadow-sm">
            <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
              Research Engine
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight mb-5">
              The Evidence for Early Structured Preparation
            </h2>
            <p className="text-base text-black leading-relaxed">
              Deliberate, structured preparation that begins before a new level of study significantly reduces the cognitive load of that transition (Vygotsky, 1978; Sweller, 1988). Students who enter a new academic level with 20–30% prior conceptual familiarity demonstrate faster mastery of subsequent content, lower anxiety, and greater independence in study (Bloom, 1984; Ericsson, 1993).
            </p>
          </div>
        </div>
      </section>

      {/* PRICING — grid table */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-10">
              <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
                Pricing
              </p>
              <h2 className="text-4xl md:text-6xl font-semibold text-slate-900 tracking-tight">Pricing</h2>
            </div>
            {/* Header */}
            <div className="grid grid-cols-2 bg-[#2366c9] text-white text-xs uppercase tracking-wider font-semibold rounded-t-xl overflow-hidden">
              <div className="p-4">Option</div>
              <div className="p-4 border-l border-blue-400/30">Price</div>
            </div>
            {/* Rows */}
            {pricing.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-2 border-b border-blue-50 ${row.highlight ? "bg-blue-50" : i % 2 === 0 ? "bg-white" : "bg-slate-50"} hover:bg-blue-50/60 transition-colors`}
              >
                <div className={`p-4 text-[14px] text-black ${row.highlight ? "font-semibold" : ""}`}>
                  {row.option}
                  {row.highlight && (
                    <span className="ml-2 rounded-full bg-[#2366c9] px-2 py-0.5 text-[10px] font-bold text-white">BEST VALUE</span>
                  )}
                </div>
                <div className={`p-4 border-l border-slate-200 text-[14px] font-semibold ${row.highlight ? "text-[#2366c9] text-base" : "text-black"}`}>
                  {row.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="bg-[#2366c9] py-12">
        <div className="container-custom">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/programs/ai-diagnostic">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#2366c9] px-7 py-3.5 text-[14px] font-semibold text-white hover:bg-blue-600">
                Take the Free Diagnostic First
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
            <Link href="/contact">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-400 px-7 py-3.5 text-[14px] font-semibold text-white hover:border-blue-300">
                Enrol in a Bridge Course
                <ArrowRight className="h-4 w-4" />
              </span>
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
              <li>Bloom, B. S. (1984). The 2 sigma problem. <em>Educational Researcher, 13</em>(6), 4–16.</li>
              <li>Ericsson, K. A., Krampe, R. T., &amp; Tesch-Römer, C. (1993). The role of deliberate practice. <em>Psychological Review, 100</em>(3), 363–406.</li>
              <li>Sweller, J. (1988). Cognitive load during problem solving. <em>Cognitive Science, 12</em>(2), 257–285.</li>
              <li>Vygotsky, L. S. (1978). <em>Mind in society.</em> Harvard University Press.</li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}
