import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, AlertTriangle, TrendingUp, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";

const problems = [
  {
    title: "The Content-Performance Gap",
    desc: "A teacher who knows the subject thoroughly can still produce students who underperform in Cambridge examinations — if they have not been trained to teach for Cambridge assessment objectives specifically.",
    popup: "Cambridge examiners report that the most common cause of student underperformance is not lack of subject knowledge — it is lack of exam technique: students who know the content but cannot demonstrate it in the format, at the level, and in the language the mark scheme demands. EduMeUp's T4 (Cambridge Examiner Intelligence Training) addresses this directly.",
    icon: AlertTriangle,
  },
  {
    title: "The Forgetting Curve in the Classroom",
    desc: "Most lessons are designed for delivery — not for retention. Without structured retrieval practice and spaced repetition built into lesson design, up to 70% of what is taught is forgotten within 24 hours.",
    popup: "Roediger & Karpicke (2006) showed that retrieval practice produces dramatically higher long-term retention than re-study. Cepeda et al. (2006) confirmed the spacing effect. EduMeUp's T2 workshop teaches teachers to embed both into their lesson design — practical, ready-to-use, and applicable the next morning.",
    icon: TrendingUp,
  },
  {
    title: "AI in the Classroom — Without a Framework, It Is Chaos",
    desc: "Teachers are being expected to integrate AI tools into their practice — but without structured training, most AI classroom use is ad hoc, inconsistent, and not connected to Cambridge assessment outcomes.",
    popup: "EduMeUp's T6 (AI-Assisted Teaching Tools Subscription) gives teachers access to EduMeUp's Cambridge-calibrated AI system — structured, curriculum-mapped, and tied directly to AO1/AO2/AO3 assessment objectives. Not generic AI. Cambridge AI.",
    icon: Zap,
  },
];

const modules = [
  {
    number: 1,
    title: "Cambridge Assessment Architecture",
    desc: "How Cambridge examinations are structured, how marks are allocated across AO1 (knowledge/recall), AO2 (application), and AO3 (analysis/evaluation) — and the command word taxonomy every Cambridge teacher must master. Teachers leave knowing exactly what examiners are looking for at each mark band.",
  },
  {
    number: 2,
    title: "Teaching for Maximum Marks",
    desc: "The content-performance gap: why students who know the content still lose marks. Eight specific response-architecture techniques — structured writing frameworks, mark scheme language, and AO-aligned answer construction — that close the gap between content knowledge and examination performance.",
  },
  {
    number: 3,
    title: "High-Retention Lesson Design",
    desc: "The Ebbinghaus Forgetting Curve and its implications for lesson planning. A practical 3-phase lesson structure (Activate → Teach → Retrieve) based on retrieval practice (Roediger & Karpicke, 2006) and spaced repetition science (Cepeda et al., 2006). Every participant builds a retrieval-practice lesson opener during this module.",
  },
  {
    number: 4,
    title: "Classroom Management for Cambridge Academic Culture",
    desc: "Building a high-expectation academic culture in the classroom. Evidence-based strategies for anxiety management, cold calling without embarrassment, wait-time technique (3-second rule), and creating the psychological safety that supports students taking academic risks — essential for AO3 performance.",
  },
  {
    number: 5,
    title: "Inspiring and Motivating Cambridge Students",
    desc: "Self-Determination Theory (SDT) applied to Cambridge classrooms. Eight growth mindset language shifts that reframe failure as diagnostic data. Targeted motivation strategies for the four most common student motivation profiles encountered in O-Level preparation.",
  },
  {
    number: 6,
    title: "Common Teaching Mistakes That Cost Students Marks",
    desc: "The seven most costly student mark-loss patterns, their root teaching cause, and a specific correction for each. These are the patterns Cambridge examiners consistently flag in examiner reports — and that teachers can eliminate from their classrooms immediately after this module.",
  },
  {
    number: 7,
    title: "Subject Application & 3-Week Action Plan",
    desc: "Subject breakout groups apply the day's learning to their specific subject. Every participant leaves with: a personalised 3-week lesson improvement plan; one retrieval practice opener ready for their next lesson; the Cambridge command word taxonomy annotated for their subject; and a mark-loss pattern analysis specific to their teaching context.",
  },
];

const practicalTools = [
  "A personalised 3-week lesson improvement plan",
  "One retrieval practice opener for their next lesson",
  "The Cambridge command word taxonomy — annotated for their subject",
  "A mark-loss pattern analysis for their subject",
  "The 3-phase retention lesson structure template",
  "30-day trial of EduMeUp's AI-Assisted Teaching Tools (T6)",
];

const certConfirms = [
  "Cambridge assessment architecture competency (AO1/AO2/AO3)",
  "Evidence-based retention lesson design skills",
  "Examination strategy teaching capability",
  "Classroom management for academic culture",
  "Cambridge AI tool integration capability",
  "7 CPD hours of recognised professional development",
];

export default function TeacherTraining() {
  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") || "";

    document.title = "Cambridge Teacher Training & Professional Development | EduMeUp";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Train your teachers to teach the way Cambridge examiners think. 6 programmes, from diagnostic to full certification. AI-powered teaching tools included."
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
      <section className="py-20 md:py-32 bg-gradient-to-b from-brand-primary-soft to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary opacity-5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <span className="inline-flex items-center rounded-full bg-brand-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-primary mb-8">
              Cambridge Teacher & Professional Development
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-neutral-text mb-8 tracking-tight leading-tight">
              Train to Teach the Way <br/><span className="text-brand-primary">Cambridge Examiners Think.</span>
            </h1>
            <p className="text-lg text-neutral-muted max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
              EduMeUp's programmes go beyond subject knowledge — they build the examiner-level understanding, AI-assisted teaching capability, and retention-focused pedagogy that directly translate into better student outcomes.
            </p>

            {/* Hero Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
              <div className="rounded-2xl bg-white p-6 border border-neutral-border shadow-sm">
                <p className="text-3xl font-bold text-brand-primary">7 CPD Hours</p>
                <p className="text-xs font-bold text-neutral-muted uppercase mt-2 tracking-widest">per workshop day</p>
              </div>
              <div className="rounded-2xl bg-white p-6 border border-neutral-border shadow-sm">
                <p className="text-3xl font-bold text-brand-primary">6 Programmes</p>
                <p className="text-xs font-bold text-neutral-muted uppercase mt-2 tracking-widest">diagnostic to cert</p>
              </div>
              <div className="rounded-2xl bg-white p-6 border border-neutral-border shadow-sm">
                <p className="text-3xl font-bold text-brand-primary">Global</p>
                <p className="text-xs font-bold text-neutral-muted uppercase mt-2 tracking-widest">standardised results</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <Link href="/contact">
                <Button className="h-14 px-10 rounded-2xl bg-brand-primary text-white font-bold text-lg hover:bg-brand-primary-dark shadow-xl transition-all hover:scale-105">
                  Book a Workshop for Your School
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#programmes">
                <Button variant="outline" className="h-14 px-10 rounded-2xl border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-bold text-lg transition-all">
                  View All Programmes
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl mb-20">
            <span className="inline-flex items-center rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-primary mb-4">
              The Reality of Results
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-neutral-text tracking-tight mb-8">
              Subject Knowledge Is Necessary. <br/><span className="text-brand-primary">It Is Not Sufficient.</span>
            </h2>
            <p className="text-lg text-neutral-muted leading-relaxed font-medium">
              Cambridge examination performance requires explicit understanding of how assessment works, how marks are allocated across AO1/AO2/AO3, and how to teach students to demonstrate their knowledge under timed, unsupported conditions.
            </p>
            <div className="mt-10 p-8 bg-brand-primary-soft rounded-3xl border-l-[12px] border-brand-primary shadow-sm">
              <p className="text-sm font-bold text-brand-primary mb-3 uppercase tracking-widest">Research finding:</p>
              <p className="text-base text-neutral-text font-medium leading-relaxed">Teacher quality is the single most powerful in-school factor affecting student achievement (Hattie, 2009). Yet most CPD focuses exclusively on subject content, leaving the critical gap between subject knowledge and exam performance unaddressed.</p>
            </div>
          </div>

          {/* Problem Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {problems.map((problem, idx) => {
              const IconComponent = problem.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-10 rounded-[2.5rem] border border-neutral-border shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group cursor-help relative"
                  title={problem.popup}
                >
                  <div className="flex items-start gap-5 mb-6">
                    <div className="p-3 bg-status-warning/10 rounded-2xl">
                      <IconComponent className="h-8 w-8 text-status-warning shrink-0" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-text">{problem.title}</h3>
                  </div>
                  <p className="text-base text-neutral-muted leading-relaxed font-medium">{problem.desc}</p>
                  <p className="text-[10px] font-bold text-neutral-muted/40 mt-8 uppercase tracking-[0.3em]">Hover for insights</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROGRAMMES SECTION */}
      <section className="py-20 md:py-32 bg-neutral-surface" id="programmes">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-20">
              <span className="inline-flex items-center rounded-full bg-brand-navy/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-navy mb-4">
                The Pathway
              </span>
              <h2 className="text-4xl md:text-6xl font-bold text-neutral-text tracking-tight mb-8">
                Assessment to <span className="text-brand-primary">Mastery.</span>
              </h2>
              <p className="text-lg text-neutral-muted leading-relaxed max-w-3xl mx-auto font-medium">
                EduMeUp's six programmes form a coherent professional development pathway. Each programme builds on the last. You can enter at any point.
              </p>
            </div>

            {/* T1 DIAGNOSTIC */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 md:p-16 rounded-[3rem] border border-neutral-border shadow-2xl mb-12 hover:shadow-brand-primary/5 transition-all group"
            >
              <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <span className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-teal-100 text-teal-700 font-bold text-xl shadow-lg">T1</span>
                  <h3 className="text-3xl font-bold text-neutral-text">Teacher Subject Knowledge Diagnostic</h3>
                </div>
                <span className="px-4 py-1.5 bg-brand-primary/10 text-brand-primary text-xs font-bold rounded-full uppercase tracking-widest">Foundational Step</span>
              </div>

              <div className="grid md:grid-cols-2 gap-12 text-base text-neutral-muted font-medium">
                <div className="space-y-6">
                  <p className="leading-relaxed"><strong>What you receive:</strong> A structured diagnostic assessment of the teacher's subject knowledge against the Cambridge O-Level standard — topic by topic, AO by AO (AO1/AO2/AO3).</p>
                  <p className="leading-relaxed">The diagnostic produces a full written report identifying: areas of confident subject mastery; areas requiring content review; and a recommended development pathway.</p>
                </div>
                <div className="bg-neutral-surface p-8 rounded-2xl border border-neutral-border italic leading-relaxed">
                  "The diagnostic engine is calibrated to Cambridge O-Level examiner expectations, distinguishing between gaps in subject knowledge and pedagogical approach."
                </div>
              </div>
            </motion.div>

            {/* T2 WORKSHOP */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-brand-navy p-10 md:p-16 rounded-[3rem] text-white shadow-2xl mb-12 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              <div className="mb-12">
                <div className="flex items-center gap-6 mb-4">
                  <span className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-brand-sky text-brand-navy font-bold text-xl shadow-lg">T2</span>
                  <h3 className="text-3xl font-bold">One-Day Cambridge Teaching Workshop</h3>
                </div>
                <p className="text-sm text-brand-sky font-bold uppercase tracking-[0.2em]">[HIGHEST IMPACT]</p>
              </div>

              <div className="grid md:grid-cols-2 gap-16 mb-16">
                <div className="space-y-8">
                  <p className="text-lg text-blue-100/80 font-medium leading-relaxed">
                    A full-day intensive workshop (7 CPD hours) covering methodology, assessment architecture, and examiner-level strategy.
                  </p>
                  <div className="grid grid-cols-1 gap-4">
                    {practicalTools.slice(0, 4).map((tool, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm font-medium">
                        <CheckCircle2 className="h-5 w-5 text-status-success shrink-0" />
                        {tool}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                  <h4 className="text-xs font-bold text-brand-sky uppercase tracking-widest mb-6">Workshop Modules</h4>
                  <div className="space-y-3 max-h-[200px] overflow-y-auto pr-4 custom-scrollbar">
                    {modules.map((mod) => (
                      <div key={mod.number} className="flex gap-4 p-3 bg-white/5 rounded-xl">
                        <span className="text-brand-sky font-bold">{mod.number}</span>
                        <p className="text-xs text-blue-100/60 font-medium">{mod.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-10 border-t border-white/10 flex justify-between items-center flex-wrap gap-6">
                <p className="text-xs font-bold text-brand-sky uppercase tracking-widest">Certificate of Cambridge Teaching Excellence (CCTE)</p>
                <Link href="/contact">
                  <Button className="bg-white text-brand-primary hover:bg-brand-sky hover:text-brand-navy font-bold px-8 rounded-xl">Request Booking</Button>
                </Link>
              </div>
            </motion.div>

            {/* MORE PROGRAMMES CTA */}
            <div className="text-center pt-12">
              <Link href="/teacher-courses">
                <Button className="h-14 px-10 rounded-2xl bg-brand-primary text-white font-bold text-lg hover:bg-brand-primary-dark shadow-xl transition-all">
                  View All 6 Programmes (T1–T6)
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* RESEARCH FOUNDATION */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-20">
              <span className="inline-flex items-center rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-primary mb-4">
                The Science
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-text tracking-tight">
                Grounded in <span className="text-brand-primary">Research.</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {[
                { author: "Hattie (2009)", title: "Visible Learning", desc: "Teacher quality is the single most powerful factor affecting achievement." },
                { author: "Shulman (1986)", title: "PCK", desc: "Translating subject expertise into exam performance is a distinct competency." },
                { author: "Darling-Hammond (2017)", title: "Effective CPD", desc: "Change requires content-specific, sustained application, not one-off generic events." }
              ].map((item, i) => (
                <div key={i} className="bg-neutral-surface p-10 rounded-[2.5rem] border border-neutral-border shadow-lg">
                  <p className="text-[10px] font-bold text-brand-primary mb-3 uppercase tracking-widest">{item.author}</p>
                  <h3 className="text-xl font-bold text-neutral-text mb-4">{item.title}</h3>
                  <p className="text-sm text-neutral-muted font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOR SCHOOLS */}
      <section className="py-20 md:py-32 bg-brand-primary-soft">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <span className="inline-flex items-center rounded-full bg-brand-navy/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-navy mb-4">
                For Administrators
              </span>
              <h2 className="text-4xl md:text-6xl font-bold text-neutral-text tracking-tight">
                Transform Your <span className="text-brand-primary">Teaching Team.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 bg-white p-12 md:p-20 rounded-[4rem] border border-neutral-border shadow-2xl">
              <div>
                <h3 className="text-2xl font-bold text-brand-primary mb-8 tracking-tight">Partnership Benefits:</h3>
                <ul className="space-y-4">
                  {[
                    "T1 Diagnostic for all teaching staff",
                    "T2 Workshop — in-person at your school",
                    "T4 Examiner Intelligence for subject leads",
                    "T6 AI Teaching Tools — school-wide subscription",
                    "Pre-workshop needs analysis",
                    "30-day post-workshop accountability follow-up"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 text-base font-medium text-neutral-muted">
                      <ArrowRight className="h-5 w-5 shrink-0 text-brand-primary mt-1" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-brand-primary mb-8 tracking-tight">Institutional Impact:</h3>
                <ul className="space-y-4">
                  {[
                    "Measurable pass rate improvement",
                    "Reduction in exam preparation time",
                    "Improved teacher AO confidence",
                    "Reduced student private tutor dependency",
                    "Full administrator visibility via T6 dashboard",
                    "Transparent USD pricing — no hidden costs"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 text-base font-medium text-neutral-muted">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-status-success mt-1" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-16 text-center">
              <Link href="/contact">
                <Button size="lg" className="h-16 px-12 rounded-2xl bg-brand-primary text-white font-bold text-xl hover:bg-brand-primary-dark shadow-2xl transition-all">
                  Book a Free School Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 md:py-40 bg-brand-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-navy opacity-20" />
        <div className="container-custom text-center relative z-10">
          <h2 className="text-5xl md:text-8xl text-white font-bold leading-tight mb-8 tracking-tighter">
            Elevate Your <br/><span className="text-brand-sky">Teaching Legacy.</span>
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-16 font-medium leading-relaxed">
            Choose where you are starting from — and we will build the right pathway from there.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <Link href="/contact">
              <Button className="h-16 px-12 rounded-2xl bg-white text-brand-primary font-bold text-xl hover:bg-blue-50 shadow-2xl transition-all transform hover:scale-105">
                Book for Your School <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
            <Link href="/for-teachers">
              <Button variant="outline" className="h-16 px-12 rounded-2xl border-2 border-white/40 text-white font-bold text-xl hover:bg-white/10 shadow-xl transition-all transform hover:scale-105">
                Become a Certified Tutor
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
