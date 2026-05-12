import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, AlertTriangle, TrendingUp, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ui } from "@/theme";

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
      <section className={ui.sections.hero + " py-16 md:py-24"}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <p className={ui.pills.brand + " mb-6 justify-center"}>
              Cambridge Teacher & Professional Development
            </p>
            <h1 className="text-5xl md:text-7xl font-semibold text-slate-900 mb-6 tracking-tight leading-tight">
              Train to Teach the Way Cambridge Examiners Think.
            </h1>
            <p className="text-base text-slate-700 max-w-3xl mx-auto leading-relaxed mb-8">
              EduMeUp's teacher and professional development programmes go beyond subject knowledge — they build the examiner-level understanding, AI-assisted teaching capability, and retention-focused pedagogy that directly translate into better student outcomes.
            </p>

            {/* Hero Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
              <div className="rounded-lg bg-white/50 border border-white/80 p-4">
                <p className="text-2xl font-semibold text-[#2366c9]">7 CPD Hours</p>
                <p className="text-[12px] text-slate-600 mt-2">per workshop day</p>
              </div>
              <div className="rounded-lg bg-white/50 border border-white/80 p-4">
                <p className="text-2xl font-semibold text-[#2366c9]">6 Programmes</p>
                <p className="text-[12px] text-slate-600 mt-2">diagnostic to certification</p>
              </div>
              <div className="rounded-lg bg-white/50 border border-white/80 p-4">
                <p className="text-2xl font-semibold text-[#2366c9]">Certificates</p>
                <p className="text-[12px] text-slate-600 mt-2">on 5 of 6 programmes</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link href="/contact">
                <span className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-semibold ${ui.buttons.brand}`}>
                  Book a Workshop for Your School
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link href="#programmes">
                <span className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-semibold border-2 border-[#2366c9] text-[#2366c9] hover:bg-[#2366c9] hover:text-white transition-colors`}>
                  View All Programmes
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl mb-12">
            <p className={ui.pills.brand + " mb-5 justify-start"}>
              Why Most Teacher Training Falls Short
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight mb-5">
              Subject Knowledge Is Necessary. It Is Not Sufficient.
            </h2>
            <p className="text-base text-black leading-relaxed">
              Cambridge examination performance requires something additional: explicit understanding of how assessment works, how marks are allocated across AO1/AO2/AO3, and how to teach students to demonstrate their knowledge under timed, unsupported conditions. Most professional development programmes never address this. EduMeUp's teacher programmes do — systematically, and at Cambridge examiner standard.
            </p>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-[#2366c9]">
              <p className="text-sm font-semibold text-[#2366c9] mb-2">Research finding:</p>
              <p className="text-[14px] text-black">Teacher quality is the single most powerful in-school factor affecting student achievement — more than class size, school resources, or curriculum (Hattie, 2009). Yet most CPD programmes focus exclusively on subject content and classroom management, leaving the critical gap between subject knowledge and Cambridge exam performance completely unaddressed.</p>
            </div>
          </div>

          {/* Problem Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {problems.map((problem, idx) => {
              const IconComponent = problem.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`${ui.cards.standard} p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-help relative`}
                  title={problem.popup}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <IconComponent className="h-6 w-6 text-orange-500 shrink-0 mt-1" />
                    <h3 className="text-xl font-semibold text-slate-900">{problem.title}</h3>
                  </div>
                  <p className="text-[14px] text-black leading-relaxed">{problem.desc}</p>
                  <p className="text-xs text-slate-400 mt-4">Hover for more</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROGRAMMES SECTION */}
      <section className="py-14 md:py-20 bg-white" id="programmes">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <p className={ui.pills.brand + " mb-5 justify-center"}>
                Choose Your Development Pathway
              </p>
              <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight mb-4">
                Six Programmes. One Clear Pathway from Assessment to Mastery.
              </h2>
              <p className="text-base text-black leading-relaxed max-w-3xl mx-auto">
                Whether you are starting with a diagnostic, seeking full Cambridge subject certification, or integrating AI tools into your teaching — EduMeUp's six programmes form a coherent professional development pathway. Each programme builds on the last. You can enter at any point.
              </p>
            </div>

            {/* T1 DIAGNOSTIC */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`${ui.cards.standard} p-8 md:p-10 border-t-4 border-teal-600 mb-8 hover:shadow-lg transition-all`}
            >
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-teal-100 text-teal-700 font-bold text-sm">T1</span>
                  <h3 className="text-3xl font-semibold text-slate-900">Teacher Subject Knowledge Diagnostic</h3>
                </div>
                <p className="text-sm text-[#2366c9] font-semibold">Know exactly where to start. Not where you assume.</p>
              </div>

              <div className="space-y-4 text-[14px] text-black">
                <p><strong>What you receive:</strong> A structured diagnostic assessment of the teacher's subject knowledge against the Cambridge O-Level standard — topic by topic, assessment objective by assessment objective (AO1/AO2/AO3). The diagnostic produces a full written report identifying: areas of confident subject mastery; areas requiring content review; areas where Cambridge examiner expectations are not yet fully understood; and a recommended development pathway (T2 Workshop, T3 SMK Programme, or T4 Examiner Intelligence Training). Duration: approximately 60–90 minutes.</p>
                <p><strong>Cambridge AI Tutor integration:</strong> The Cambridge AI Tutor system provides the diagnostic engine — the same AI that diagnoses student sub-skill gaps is configured for teacher-level assessment, calibrated to Cambridge O-Level examiner expectations rather than student mark bands. The diagnostic distinguishes between gaps in subject content knowledge and gaps in pedagogical content knowledge (Shulman, 1986) — how to teach the subject vs. simply knowing it.</p>
              </div>
            </motion.div>

            {/* T2 WORKSHOP */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`${ui.cards.standard} p-8 md:p-10 border-t-4 border-blue-900 mb-8 hover:shadow-lg transition-all`}
            >
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-blue-900/20 text-blue-900 font-bold text-sm">T2</span>
                  <h3 className="text-3xl font-semibold text-slate-900">One-Day Cambridge Teaching Workshop</h3>
                </div>
                <p className="text-sm text-[#2366c9] font-semibold">One intensive day. Immediate classroom application. Certificate of Cambridge Teaching Excellence.</p>
              </div>

              <div className="space-y-4 text-[14px] text-black">
                <p><strong>What you receive:</strong> A full-day intensive workshop (08:30–16:30, 7 CPD hours) covering Cambridge teaching methodology, assessment architecture, mark scheme analysis, retention-focused lesson design, and examiner-level classroom strategy. Available for all Cambridge O-Level subjects. Two delivery formats: in-person (at the school or a designated venue) or live online. School bookings include a pre-workshop needs analysis and a post-workshop 30-day follow-up session at no additional cost.</p>

                <div className="mt-6 pt-6 border-t border-[#dbe7f4]">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">7 Modules</p>
                  <div className="space-y-4">
                    {modules.slice(0, 7).map((mod) => (
                      <div key={mod.number} className="flex gap-4 p-4 bg-slate-50 rounded-lg">
                        <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-blue-900 text-white font-bold text-xs">
                          {mod.number}
                        </div>
                        <div>
                          <p className="font-semibold text-[14px] text-black">{mod.title}</p>
                          <p className="text-[13px] text-slate-600 mt-1">{mod.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* What Teachers Leave With */}
              <div className="mt-8 pt-8 border-t border-[#dbe7f4]">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-6">What Teachers Leave With</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="font-semibold text-[14px] text-[#2366c9] mb-4">Practical tools — ready tomorrow:</p>
                    <ul className="space-y-3">
                      {practicalTools.map((tool) => (
                        <li key={tool} className="flex gap-2 text-[13px] text-black">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500 mt-0.5" />
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-[14px] text-[#2366c9] mb-4">What the CCTE Certificate confirms:</p>
                    <ul className="space-y-3">
                      {certConfirms.map((cert) => (
                        <li key={cert} className="flex gap-2 text-[13px] text-black">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#2366c9] mt-0.5" />
                          {cert}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* MORE PROGRAMMES CTA */}
            <div className="text-center">
              <Link href="/teacher-courses">
                <span className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-semibold ${ui.buttons.brand}`}>
                  View All 6 Programmes (T1–T6)
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* RESEARCH FOUNDATION */}
      <section className={ui.sections.softBlue + " py-14 md:py-20"}>
        <div className="container-custom">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <p className={ui.pills.brand + " mb-5 justify-center"}>
                The Evidence for Teacher Development
              </p>
              <h2 className="text-4xl font-semibold text-slate-900 tracking-tight">
                Every EduMeUp Programme Is Grounded in Educational Research
              </h2>
            </div>

            <div className="space-y-6">
              <div className={`${ui.cards.standard} p-6 md:p-8 border-l-4 border-[#2366c9]`}>
                <p className="text-sm font-semibold text-[#2366c9] mb-2">Hattie (2009)</p>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Visible Learning</h3>
                <p className="text-[14px] text-black leading-relaxed">Teacher quality is the single most powerful in-school factor affecting student achievement — more than class size, school resources, or curriculum. The effect size of teacher expertise on student outcomes is d=0.49, among the highest modifiable factors in education.</p>
              </div>

              <div className={`${ui.cards.standard} p-6 md:p-8 border-l-4 border-[#2366c9]`}>
                <p className="text-sm font-semibold text-[#2366c9] mb-2">Shulman (1986)</p>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Pedagogical Content Knowledge</h3>
                <p className="text-[14px] text-black leading-relaxed">Knowing a subject thoroughly and knowing how to teach it for examination performance are distinct competencies. The most significant differentiator between teachers who produce Cambridge results and those who do not is not subject knowledge — it is pedagogical content knowledge (PCK): how to translate subject expertise into student examination performance.</p>
              </div>

              <div className={`${ui.cards.standard} p-6 md:p-8 border-l-4 border-[#2366c9]`}>
                <p className="text-sm font-semibold text-[#2366c9] mb-2">Darling-Hammond et al. (2017)</p>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Effective Teacher Professional Development</h3>
                <p className="text-[14px] text-black leading-relaxed">CPD that produces lasting change in classroom practice is: sustained (not one-off); content-specific (not generic); directly connected to classroom application; collaborative; and provides coaching or follow-up. One-day workshops that meet none of these criteria produce no measurable improvement in teacher practice.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOR SCHOOLS */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-10">
              <p className={ui.pills.brand + " mb-5 justify-center"}>
                For School Principals & Administrators
              </p>
              <h2 className="text-4xl font-semibold text-slate-900 tracking-tight mb-8">
                Train Your Teachers. Transform Your Results.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-[#2366c9] text-lg mb-4">What the School Partnership Includes:</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-[14px] text-black">
                    <ArrowRight className="h-4 w-4 shrink-0 text-[#2366c9] mt-0.5" />
                    T1 Diagnostic for all teaching staff — full subject knowledge gap report by teacher and subject
                  </li>
                  <li className="flex gap-3 text-[14px] text-black">
                    <ArrowRight className="h-4 w-4 shrink-0 text-[#2366c9] mt-0.5" />
                    T2 Workshop for all staff — one day, all subjects, in-person at your school
                  </li>
                  <li className="flex gap-3 text-[14px] text-black">
                    <ArrowRight className="h-4 w-4 shrink-0 text-[#2366c9] mt-0.5" />
                    T4 Examiner Intelligence Training — for subject leads and heads of department
                  </li>
                  <li className="flex gap-3 text-[14px] text-black">
                    <ArrowRight className="h-4 w-4 shrink-0 text-[#2366c9] mt-0.5" />
                    T6 AI Teaching Tools — school-wide annual subscription with administrator oversight dashboard
                  </li>
                  <li className="flex gap-3 text-[14px] text-black">
                    <ArrowRight className="h-4 w-4 shrink-0 text-[#2366c9] mt-0.5" />
                    Pre-workshop needs analysis — ensuring the day targets your school's specific development priorities
                  </li>
                  <li className="flex gap-3 text-[14px] text-black">
                    <ArrowRight className="h-4 w-4 shrink-0 text-[#2366c9] mt-0.5" />
                    30-day post-workshop follow-up — accountability session ensuring classroom application
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-[#2366c9] text-lg mb-4">What Schools Typically See:</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-[14px] text-black">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500 mt-0.5" />
                    Measurable improvement in student Cambridge pass rates within one academic year
                  </li>
                  <li className="flex gap-3 text-[14px] text-black">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500 mt-0.5" />
                    Reduction in teacher-led exam preparation time — AI handles retrieval scheduling and formative gap analysis
                  </li>
                  <li className="flex gap-3 text-[14px] text-black">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500 mt-0.5" />
                    Improved teacher confidence in Cambridge assessment objectives — evidenced in lesson observation
                  </li>
                  <li className="flex gap-3 text-[14px] text-black">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500 mt-0.5" />
                    Reduction in costly private tutor dependency for students — school provides comparable support in-house
                  </li>
                  <li className="flex gap-3 text-[14px] text-black">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500 mt-0.5" />
                    Administrator visibility of teacher professional development progress through the T6 dashboard
                  </li>
                  <li className="flex gap-3 text-[14px] text-black">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500 mt-0.5" />
                    School partnership model — not a franchise. No hidden costs. No revenue percentages. Transparent USD pricing.
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-10 text-center">
              <Link href="/contact">
                <Button size="lg" className={`font-semibold py-3 px-8 rounded-xl text-[14px] shadow-md ${ui.buttons.brand}`}>
                  Book a Free School Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className={ui.sections.brand + " py-20 md:py-32"}>
        <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-blue-600 opacity-30 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-blue-600 opacity-30 blur-3xl" aria-hidden="true" />
        <div className="container-custom text-center relative z-10">
          <h2 className="text-4xl md:text-6xl text-white font-semibold leading-[1.05] mb-5 tracking-tight">
            Start Your Development Journey Today.
          </h2>
          <p className="text-base text-blue-200 mb-12 max-w-3xl mx-auto">
            Choose where you are starting from — and we will build the right pathway from there.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Link href="/contact">
              <Button size="lg" className={`w-full md:w-auto min-w-[260px] font-semibold py-3 px-6 rounded-xl text-[14px] shadow-md flex items-center justify-center gap-2 ${ui.buttons.brandLight}`}>
                Book a Workshop for Your School <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className={`w-full md:w-auto min-w-[260px] font-semibold py-3 px-6 rounded-xl text-[14px] shadow-md flex items-center justify-center gap-2 ${ui.buttons.brandOutline}`}>
                Register as an Individual Teacher <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
