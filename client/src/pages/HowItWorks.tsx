import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Brain,
  Target,
  Zap,
  Layers,
  Search,
  BarChart3,
  RefreshCw,
  ClipboardList,
} from "lucide-react";
import { Link } from "wouter";

const steps = [
  {
    number: 1,
    icon: Search,
    title: "Diagnostic Analysis",
    desc: "A 90-minute AI-powered assessment maps every learner's exact knowledge gaps — subject by subject, topic by topic. No guessing. No generic starting points. Learning begins from where the student actually is.",
  },
  {
    number: 2,
    icon: Brain,
    title: "Remedial Concept Repair",
    desc: "Gaps identified in Step 1 are closed before new O-Level content is introduced. Weak foundations from Grades 6–8 are rebuilt concept by concept using structured micro-modules.",
  },
  {
    number: 3,
    icon: Zap,
    title: "Interactive Learning",
    desc: "Every concept is taught through H5P interactive modules — no passive video. The student must engage, respond, and demonstrate understanding at every stage.",
  },
  {
    number: 4,
    icon: ClipboardList,
    title: "Past Paper Practice",
    desc: "Authentic Cambridge past questions are introduced from the first lesson — not saved for the final weeks. Exam familiarity builds from Day 1.",
  },
  {
    number: 5,
    icon: RefreshCw,
    title: "Retrieval Practice",
    desc: "Scheduled recall sessions run at scientifically optimal intervals (Day 1, 3, 7, 14, 30, 90) to defeat the forgetting curve and lock knowledge into long-term memory.",
  },
  {
    number: 6,
    icon: Target,
    title: "Formative Assessment",
    desc: "After every unit, a short formative check identifies what has not yet been retained. Students are not pushed forward with hidden gaps still in place.",
  },
  {
    number: 7,
    icon: Layers,
    title: "Corrective Study",
    desc: "Step 6 results generate a personalised corrective plan. The student is routed back to the specific concept that was not retained — not a generic review.",
  },
  {
    number: 8,
    icon: BarChart3,
    title: "Time-Bound Mock Exams",
    desc: "Full-length, timed Cambridge-style mock exams are introduced well before the final examination. Students build stamina, timing discipline, and evidence-based confidence.",
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

export default function HowItWorks() {
  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") || "";

    document.title = "How EduMeUp Works — Built for Retention, Not Content Delivery | EduMeUp";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Understand how EduMeUp's 8-step mastery cycle moves every learner from diagnostic to exam mastery. The science and the system, explained in full.",
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
              How EduMeUp Works
            </h1>
            <p className="text-base text-slate-700 max-w-3xl mx-auto leading-relaxed mb-8">
              Built for retention, not content delivery.
            </p>
            <Link href="/programs/ai-diagnostic">
              <Button className="bg-[#2366c9] hover:bg-blue-700 text-white font-semibold text-[14px] py-3 px-6">
                Start Your Free Diagnostic <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* TWO SYSTEMS */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl">
            <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
              The Difference
            </p>
            <h2 className="text-4xl md:text-6xl font-semibold text-slate-900 tracking-tight mb-6">
              Two Systems. Two Outcomes.
            </h2>
            <div className="space-y-4 text-base text-black leading-relaxed">
              <p>
                <span className="font-semibold text-red-500">Most EdTech platforms:</span> Content → Video → Quiz → Next Topic → 5–10% retention.
              </p>
              <p>
                <span className="font-semibold text-[#2366c9]">EduMeUp:</span> Diagnose → Repair → Learn Actively → Practise → Retrieve → Assess → Correct → Simulate → 50–75%+ retention.
              </p>
              <p>
                The difference is not cosmetic. It is structural. Every step in our system exists because research says passive content delivery fails learners. We built an alternative from the evidence up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-14 md:py-20 bg-blue-50/50">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-10">
              <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
                THE SCIENCE BEHIND THE SYSTEM
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
                THE 8-STEP MASTERY CYCLE
              </p>
              <h2 className="text-4xl md:text-6xl font-semibold text-slate-900 tracking-tight">
                The 8 Steps — What Happens at Each Stage
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
                  <p className="text-[14px] text-black leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* THE CYCLE AT A GLANCE */}
      <section className="py-12 bg-blue-50">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-4 tracking-tight">The Cycle at a Glance</h2>
            <p className="text-slate-700 text-base font-medium">
              Diagnose → Repair → Learn → Practise → Retrieve → Assess → Correct → Simulate → <span className="text-[#2366c9] font-bold">Mastery</span>
            </p>
            <p className="mt-3 text-[14px] text-slate-500">Each step creates the conditions for the next. The sequence is the product.</p>
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
              Your Mastery Journey Starts Here
            </h2>
          </div>
          <p className="text-base text-blue-200 mb-12 max-w-3xl mx-auto">
            Begin with a free diagnostic and follow the 8-step system designed to take you from confusion to exam confidence.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6 max-w-5xl mx-auto">
            <Link href="/programs/ai-diagnostic">
              <Button size="lg" className="w-full md:w-auto min-w-[260px] bg-white text-[#2366c9] hover:bg-blue-50 font-semibold py-3 px-6 rounded-xl text-[14px] shadow-md flex items-center justify-center gap-2">
                Start Your Free Diagnostic <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/for-parents">
              <Button size="lg" variant="outline" className="w-full md:w-auto min-w-[260px] border border-white/30 text-white hover:bg-white/10 font-semibold py-3 px-6 rounded-xl text-[14px] shadow-md flex items-center justify-center gap-2">
                Parent Dashboard Overview <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* REFERENCES */}
      <section className="py-10 bg-white border-t border-blue-100">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">Research Foundation</h3>
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs text-slate-500">
              <span>Black &amp; Wiliam (1998)</span>
              <span>Bloom (1984)</span>
              <span>Freeman et al. (2014)</span>
              <span>Roediger &amp; Karpicke (2006)</span>
              <span>Hattie &amp; Timperley (2007)</span>
              <span>Bjork &amp; Bjork (2011)</span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
