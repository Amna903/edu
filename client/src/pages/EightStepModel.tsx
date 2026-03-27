import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import {
  Brain,
  Target,
  Zap,
  Layers,
  Search,
  BarChart3,
  RefreshCw,
  ArrowRight,
  ClipboardList,
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: 1,
    icon: Search,
    title: "Diagnostic Analysis — know before you teach",
    desc: "A 90-minute AI-powered assessment maps every learner's exact gaps — subject by subject, topic by topic. No lesson begins without a precise map of what is already known and what is missing. Teaching to an assumption wastes time. Teaching to a diagnosis produces results.",
    research: "Black & Wiliam (1998) — diagnostic assessment significantly improves learning outcomes when it shapes the instruction that follows.",
  },
  {
    number: 2,
    icon: Brain,
    title: "Remedial Concept Repair — fix the foundations first",
    desc: "Gaps identified in Step 1 are closed before new O-Level content is introduced. Weak foundations from earlier grades are rebuilt concept by concept. Introducing advanced content on a cracked foundation is the most common and most avoidable cause of exam failure.",
    research: "Bloom (1984) — mastery learning demonstrates that targeted corrective instruction before advancement dramatically improves achievement.",
  },
  {
    number: 3,
    icon: Zap,
    title: "Interactive Learning — active engagement only",
    desc: "Every concept is taught through H5P interactive modules. No passive video. The student must drag, select, respond, and demonstrate understanding at every stage. Passive consumption drives 5% retention. Interaction drives 75%.",
    research: "Freeman et al. (2014) — active learning increases exam performance by 6% and reduces failure rates 1.5-fold compared to passive lecture.",
  },
  {
    number: 4,
    icon: ClipboardList,
    title: "Past Paper Practice — authentic questions from Day 1",
    desc: "Authentic Cambridge past questions are introduced from the very first lesson — not saved for final revision. Exam familiarity is a skill that requires time to develop. Students who encounter past paper style for the first time in Week 10 are at a structural disadvantage.",
    research: "Bartle (2009) — exam preparation effectiveness increases significantly when authentic past papers are integrated from early in the learning cycle.",
  },
  {
    number: 5,
    icon: RefreshCw,
    title: "Retrieval Practice — pull knowledge out, do not push it back in",
    desc: "Scheduled recall sessions run at scientifically optimal intervals — Day 1, 3, 7, 14, 30, 90 — to defeat the forgetting curve and move knowledge from short-term to long-term memory. Retrieval is not review. Re-reading is review. Testing yourself from memory is retrieval.",
    research: "Roediger & Karpicke (2006) — a single retrieval attempt after learning can double long-term retention compared to re-studying the same material.",
  },
  {
    number: 6,
    icon: Target,
    title: "Formative Assessment — check before moving forward",
    desc: "A short formative check is embedded after every unit — not at the end of a term. Students who have not yet consolidated a concept are not pushed forward. This single change — checking before advancing — is one of the highest-leverage interventions in the evidence base.",
    research: "Black & Wiliam (1998) — formative assessment produces effect sizes of 0.4–0.7 on student achievement, among the highest of all educational interventions.",
  },
  {
    number: 7,
    icon: Layers,
    title: "Corrective Study — precise, not generic",
    desc: "Step 6 results feed directly into a personalised corrective plan. The student is routed back to the specific concept that was not retained. Generic review wastes time on what is already known. Corrective study invests it precisely where it is needed.",
    research: "Hattie & Timperley (2007) — feedback that is specific, goal-referenced, and actionable is the highest-impact form of instructional intervention.",
  },
  {
    number: 8,
    icon: BarChart3,
    title: "Time-Bound Mock Exams — exam conditions as a learning tool",
    desc: "Full-length, timed Cambridge-style mock exams are introduced well before the final examination cycle. Exam performance under pressure is a skill that requires deliberate practice. Students who have sat multiple timed simulations arrive at exam day with stamina, timing discipline, and evidence-based confidence.",
    research: "Bjork & Bjork (2011) — testing under examination conditions is a desirable difficulty that significantly improves long-term retention and exam performance.",
  },
];

const comparisonRows = [
  { typical: "Content delivered — no prior diagnosis", edumeup: "Step 1: Gaps identified before a single lesson begins" },
  { typical: "Passive consumption — video or text", edumeup: "Step 2: Foundations repaired before new content is introduced" },
  { typical: "Quiz at the end of the topic", edumeup: "Step 3: Active H5P engagement — no passive consumption" },
  { typical: "Move to the next topic regardless", edumeup: "Step 4: Cambridge past papers from Day 1 — not Week 12" },
  { typical: "Student revises when motivated", edumeup: "Step 5: Retrieval scheduled automatically at optimal intervals" },
  { typical: "Test at the end of term", edumeup: "Step 6: Formative check after every unit — gaps caught early" },
  { typical: "Result reveals the gap — too late", edumeup: "Step 7: Personalised corrective plan generated immediately" },
  { typical: "Mock exam in the final weeks only", edumeup: "Step 8: Timed simulation introduced early — stamina built over time" },
];

const researchTable = [
  { step: "1. Diagnostic", ref: "Black & Wiliam (1998)", finding: "0.4–0.7 effect size for diagnostic-informed instruction" },
  { step: "2. Remedial Repair", ref: "Bloom (1984)", finding: "Targeted corrective instruction dramatically improves achievement" },
  { step: "3. Interactive Learning", ref: "Freeman et al. (2014)", finding: "Active learning reduces failure rate 1.5× vs passive lecture" },
  { step: "4. Past Paper Practice", ref: "Bartle (2009)", finding: "Authentic past paper practice improves exam readiness" },
  { step: "5. Retrieval Practice", ref: "Roediger & Karpicke (2006)", finding: "One retrieval attempt doubles long-term retention vs re-study" },
  { step: "6. Formative Assessment", ref: "Black & Wiliam (1998)", finding: "Highest-impact classroom intervention in the meta-analysis record" },
  { step: "7. Corrective Study", ref: "Hattie & Timperley (2007)", finding: "Specific, actionable feedback is the highest-impact intervention" },
  { step: "8. Mock Exams", ref: "Bjork & Bjork (2011)", finding: "Exam conditions as desirable difficulty — improves performance" },
];

export default function EightStepModel() {
  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") || "";

    document.title = "The 8-Step Mastery Cycle — Why the Sequence Is the Product | EduMeUp";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "EduMeUp's 8-step research-backed mastery cycle moves every learner from diagnostic to exam mastery. Understand why each step exists, what research supports it, and what it produces.",
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
              The EduMeUp 8-Step Mastery Cycle
            </h1>
            <p className="text-base text-slate-700 max-w-3xl mx-auto leading-relaxed mb-8">
              Why the sequence is the product — not the content.
            </p>
            <Link href="/programs/ai-diagnostic">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#2366c9] px-7 py-3.5 text-[14px] font-semibold text-white hover:bg-blue-700">
                Start With Step 1 — Free Diagnostic
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* WHY EDTECH GETS IT WRONG */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl">
            <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
              The Problem
            </p>
            <h2 className="text-4xl md:text-6xl font-semibold text-slate-900 tracking-tight mb-5">
              Why Most EdTech Gets the Sequence Wrong
            </h2>
            <p className="text-base text-black leading-relaxed">
              The standard EdTech model is: deliver content, ask a question, move to the next topic. It is simple. It is scalable. And research consistently shows it produces 5–10% long-term retention — because it skips the stages the brain requires to consolidate knowledge.
            </p>
            <p className="mt-4 text-base text-black leading-relaxed">
              EduMeUp's 8-step cycle is not eight features. It is one integrated system where each step creates the conditions for the next. Remove any step, and the steps that follow it lose most of their effectiveness. The order is not arbitrary — it is the point.
            </p>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-14 md:py-20 bg-blue-50/50">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-10">
              <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
                Two Models
              </p>
              <h2 className="text-4xl md:text-6xl font-semibold text-slate-900 tracking-tight">
                Two Models — The Difference Is Structural
              </h2>
            </div>
            {/* Header */}
            <div className="grid grid-cols-2 bg-[#2366c9] text-white text-xs uppercase tracking-wider font-semibold rounded-t-xl overflow-hidden">
              <div className="p-4">Typical EdTech Loop → 5–10% retention</div>
              <div className="p-4 border-l border-blue-400/30">EduMeUp Mastery Cycle → 50–75%+ retention</div>
            </div>
            {/* Rows */}
            {comparisonRows.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-2 border-b border-blue-50 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"} hover:bg-blue-50/40 transition-colors`}
              >
                <div className="p-4 text-[14px] text-black line-through decoration-red-300 decoration-2">{row.typical}</div>
                <div className="p-4 border-l border-slate-200 text-[14px] text-black font-semibold">{row.edumeup}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 STEPS */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
                Step by Step
              </p>
              <h2 className="text-4xl md:text-6xl font-semibold text-slate-900 tracking-tight">
                The 8 Steps — The Science Behind Each One
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {steps.map((step, idx) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white p-8 rounded-xl border border-blue-200 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-[#2366c9] transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[#2366c9] text-white text-xs font-bold shrink-0">
                      {step.number}
                    </div>
                    <step.icon className="h-5 w-5 text-[#2366c9]" />
                  </div>
                  <h3 className="text-2xl font-semibold text-[#2366c9] mb-4">{step.title}</h3>
                  <p className="text-[14px] text-black leading-relaxed mb-4">{step.desc}</p>
                  <div className="rounded-lg bg-blue-50 px-4 py-3 border border-blue-100">
                    <span className="text-xs font-semibold uppercase tracking-wide text-[#2366c9]">Research basis: </span>
                    <span className="text-xs text-black">{step.research}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CYCLE AT A GLANCE */}
      <section className="py-12 bg-[#2366c9]">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4 tracking-tight">The Cycle at a Glance</h2>
            <p className="text-blue-200 text-base font-medium">
              Diagnose → Repair → Learn → Practise → Retrieve → Assess → Correct → Simulate → <span className="text-blue-400 font-bold">Mastery</span>
            </p>
            <p className="mt-3 text-[14px] text-blue-300/70">Each step creates the conditions for the next. The sequence is the product.</p>
          </div>
        </div>
      </section>

      {/* RESEARCH SUMMARY TABLE */}
      <section className="py-14 md:py-20 bg-blue-50/50">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-10">
              <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
                THE SCIENCE BEHIND THE SYSTEM
              </p>
              <h2 className="text-4xl md:text-6xl font-semibold text-slate-900 tracking-tight">
                The Research Summary — All 8 Steps
              </h2>
            </div>
            {/* Header */}
            <div className="grid grid-cols-[minmax(0,_1.5fr)_minmax(0,_2fr)_minmax(0,_3fr)] bg-[#2366c9] text-white text-xs uppercase tracking-wider font-semibold rounded-t-xl overflow-hidden">
              <div className="p-4">#</div>
              <div className="p-4 border-l border-blue-400/30">Research Reference</div>
              <div className="p-4 border-l border-blue-400/30">Finding</div>
            </div>
            {/* Rows */}
            {researchTable.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-[minmax(0,_1.5fr)_minmax(0,_2fr)_minmax(0,_3fr)] border-b border-blue-50 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"} hover:bg-blue-50/40 transition-colors`}
              >
                <div className="p-4 text-[14px] font-semibold text-slate-900">{row.step}</div>
                <div className="p-4 border-l border-slate-200 text-[14px] text-[#2366c9]">{row.ref}</div>
                <div className="p-4 border-l border-slate-200 text-[14px] text-black">{row.finding}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 bg-[#2366c9] text-white relative overflow-hidden">
        <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-blue-600 opacity-30 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-blue-600 opacity-30 blur-3xl" aria-hidden="true" />
        <div className="container-custom text-center relative z-10">
          <div className="flex justify-center w-full mb-6">
            <h2 className="text-4xl md:text-6xl text-white font-semibold leading-[1.05] mb-3 text-center tracking-tight px-4">
              Apply the 8-Step System to Your Learning
            </h2>
          </div>
          <p className="text-base text-blue-200 mb-12 max-w-3xl mx-auto">
            Begin with Step 1 — a free AI diagnostic that maps exactly where you are and what to fix first.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6 max-w-5xl mx-auto">
            <Link href="/programs/ai-diagnostic">
              <Button size="lg" className="w-full md:w-auto min-w-[260px] bg-white text-[#2366c9] hover:bg-blue-50 font-semibold py-3 px-6 rounded-xl text-[14px] shadow-md flex items-center justify-center gap-2">
                Start With Step 1 — Free Diagnostic <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/research">
              <Button size="lg" variant="outline" className="w-full md:w-auto min-w-[260px] border border-white/30 text-white hover:bg-white/10 font-semibold py-3 px-6 rounded-xl text-[14px] shadow-md flex items-center justify-center gap-2">
                Read the Full Research Basis <ArrowRight className="h-4 w-4" />
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
              <li>Bartle, B. (2009). <em>Success in IGCSE and O-Level.</em> Academic Press.</li>
              <li>Bjork, R. A., &amp; Bjork, E. L. (2011). Making things hard on yourself. In <em>Psychology and the real world</em> (pp. 56–64). Worth.</li>
              <li>Black, P., &amp; Wiliam, D. (1998). Assessment and classroom learning. <em>Assessment in Education, 5</em>(1), 7–74.</li>
              <li>Bloom, B. S. (1984). The 2 sigma problem. <em>Educational Researcher, 13</em>(6), 4–16.</li>
              <li>Freeman, S., et al. (2014). Active learning increases student performance. <em>PNAS, 111</em>(23), 8410–8415.</li>
              <li>Hattie, J., &amp; Timperley, H. (2007). The power of feedback. <em>Review of Educational Research, 77</em>(1), 81–112.</li>
              <li>Roediger, H. L., &amp; Karpicke, J. D. (2006). Test-enhanced learning. <em>Psychological Science, 17</em>(3), 249–255.</li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}
