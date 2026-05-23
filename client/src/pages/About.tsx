import { Layout } from "@/components/Layout";
import { PageSidebar } from "@/components/PageSidebar";
import { motion } from "framer-motion";
import {
  Brain,
  BarChart3,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Globe,
  Users,
  School,
  Download,
  Play,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InquiryDialog } from "@/components/InquiryDialog";

export default function About() {
  return (
    <Layout>
      <div className="flex min-h-screen bg-white">
        <PageSidebar
          title="About EduMeUp"
          quote="Science, research, and genuine educational transformation."
          links={[
            { label: "Learning Crisis", href: "#learning-crisis" },
            { label: "10X Model", href: "#methodology" },
            { label: "Three Pillars", href: "#pillars" },
            { label: "How We Compare", href: "#comparison" },
            { label: "Complete Ecosystem", href: "#ecosystem" },
            { label: "Research Foundation", href: "#research" },
            { label: "Our Story", href: "#story" },
            { label: "Is EduMeUp Right?", href: "#fit" },
            { label: "Get Started", href: "#get-started" },
          ]}
        />

        <section className="relative overflow-hidden bg-white py-8 md:py-12">
          <div className="container-custom max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-[1.4fr_0.9fr] gap-6 items-stretch">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-brand-primary text-white relative overflow-hidden rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 shadow-2xl"
                >
                  <div className="absolute -top-20 -right-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
                  <div className="relative z-10 max-w-2xl space-y-6">
                    <p className="text-sm-small font-black uppercase tracking-[0.28em] text-blue-100">Our Mission &amp; Philosophy</p>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.05] tracking-tight text-white">
                      Education Should Work the Way the Brain Works.
                    </h1>
                    <p className="text-lg md:text-xl text-blue-50/90 leading-relaxed max-w-2xl">
                      We founded EduMeUp because the traditional education model — built on passive instruction and
                      wishful thinking — has been failing students for generations. The research has always pointed to a
                      better way. We built it.
                    </p>
                    <div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-5 md:p-6 backdrop-blur-sm">
                      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-100 mb-3">Mission Statement</p>
                      <p className="text-base md:text-lg text-white/90 leading-relaxed">
                        Our mission is to end the global learning crisis caused by passive instruction and the brain's natural
                        forgetting curve — replacing the traditional 5% retention model with 50%+ active mastery through the 10X
                        Learning Leap Model™.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                      <Button className="bg-white text-brand-primary hover:bg-brand-primary-soft font-semibold px-6 py-3 rounded-xl text-base shadow-md flex items-center justify-center gap-2">
                        Explore Our 10X Model <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="border border-white/35 text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-xl text-base flex items-center justify-center gap-2">
                        See the Research <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="rounded-2xl border border-neutral-border bg-white shadow-sm rounded-[2rem] md:rounded-[3rem] p-8 md:p-10 shadow-lg"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(35,102,201,0.18),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(79,134,224,0.16),transparent_35%)]" aria-hidden="true" />
                  <div className="relative z-10 flex h-full flex-col justify-between gap-8">
                    <div>
                      <p className="text-sm-small font-black uppercase tracking-[0.28em] text-brand-primary mb-4">Editorial Graphic</p>
                      <div className="rounded-2xl border border-neutral-border bg-white shadow-sm rounded-[2rem] p-6 shadow-sm">
                        <div className="flex items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-brand-primary via-brand-sky to-neutral-surface p-10 text-white">
                          <div className="text-center space-y-4">
                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                              <Sparkles className="h-10 w-10 text-white" />
                            </div>
                            <div>
                              <p className="text-lg font-semibold text-white">Research-led learning</p>
                              <p className="text-sm text-blue-50/80">Blue-led, minimal, human, and credible</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl border border-neutral-border bg-white shadow-sm rounded-2xl p-4 text-center shadow-sm">
                        <p className="text-2xl font-semibold text-brand-primary">91%*</p>
                        <p className="text-sm-small font-semibold uppercase tracking-widest text-slate-500 mt-1">Pass rate</p>
                      </div>
                      <div className="rounded-2xl border border-neutral-border bg-white shadow-sm p-4 text-center">
                        <p className="text-2xl font-semibold text-brand-primary">85%+</p>
                        <p className="text-sm-small font-semibold uppercase tracking-widest text-slate-500 mt-1">Retention</p>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-white/80">*Designed to Achieve</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          <main className="min-w-0 space-y-0">

          {/* ================= SECTION 2: THE GLOBAL LEARNING CRISIS ================= */}
          <section id="learning-crisis" className="py-16 md:py-24 bg-[#FFF8EC] -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0">
            <div className="w-full max-w-6xl mx-auto lg:px-0">
              <div className="text-center mb-16">
                <p className="text-sm-small font-black uppercase tracking-[0.28em] text-brand-primary mb-3">The Problem We Set Out to Solve</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 mb-6">
                  The Traditional Model Has a Hidden Failure Rate.
                </h2>
                <p className="text-xl text-slate-900/60 font-medium max-w-3xl mx-auto">
                  Students worldwide study hard, pay for tutors, and sit through thousands of hours of lessons — yet
                  the majority leave without genuine mastery. This is not a failure of effort. It is a failure of method.
                </p>
              </div>

              {/* Three stat cards */}
              <div className="grid md:grid-cols-3 gap-6 mb-16">
                {[
                  { stat: "5%", label: "Retention from lectures after 24 hours" },
                  { stat: "70%", label: "Of new content forgotten within 24 hours (Ebbinghaus)" },
                  { stat: "90%", label: "Lost within 30 days — without systematic reinforcement" },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-[1.5rem] p-8 shadow-sm text-center hover:-translate-y-1 transition-all">
                    <p className="text-4xl font-semibold text-red-500 mb-3">{item.stat}</p>
                    <p className="text-base text-slate-600 font-medium">{item.label}</p>
                  </div>
                ))}
              </div>

              {/* Research callout */}
              <div className="border-l-4 border-brand-primary bg-blue-50 p-6 rounded-r-[1.5rem] mb-16">
                <p className="text-base md:text-lg italic text-slate-800 leading-relaxed">
                  According to the Learning Pyramid (NTL Institute), traditional teaching methods — lectures, textbooks, and assigned readings — yield only 5%
                  knowledge retention after 24 hours. Most tutoring centers and EdTech platforms are built on exactly this model.
                </p>
                <p className="text-[12px] text-slate-500 mt-3 font-medium">NTL Institute, National Training Laboratories, Bethel, Maine.</p>
              </div>

              {/* Three problem cards with hover popups */}
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Passive Learning — 5% Retention",
                    icon: BookOpen,
                    desc: "Lectures, textbooks, and video courses create the feeling of learning — without the reality. Research consistently confirms: passive exposure is not the same as durable knowledge.",
                    popup: "NTL Institute Learning Pyramid: lectures = 5%, reading = 10%, audiovisual = 20%. Most schools and EdTech platforms are built on these methods. EduMeUp courses use active learning, retrieval practice, and dual-coding — consistently producing 50%+ retention.",
                  },
                  {
                    title: "The Forgetting Curve — Undefeated by Conventional Tutoring",
                    icon: BarChart3,
                    desc: "Without systematic, timed reinforcement, the human brain discards new information rapidly. No amount of re-reading defeats this — only spaced retrieval does.",
                    popup: "Ebbinghaus (1885 / replicated 2015): 42% lost in 20 min, 70% in 24 hrs, 90% in 30 days. EduMeUp's AI automatically schedules retrieval practice at scientifically validated intervals: Day 1, 3, 7, 14, 30, 90 — pushing retention to 85%+ after 90 days.",
                  },
                  {
                    title: "Tutor Dependency — An Unsustainable Model",
                    icon: Users,
                    desc: "Human tutors vary in quality, availability, and exam expertise. When a student's entire outcome depends on one person's judgment and schedule, the system is structurally fragile.",
                    popup: "EduMeUp's Cambridge-expert AI tutor operates 24/7, knows the IGCSE/O-Level syllabus in full, understands Cambridge examiner marking logic, and diagnoses gaps at the sub-skill level — providing consistent, always-available expert guidance.",
                  },
                ].map((card, i) => (
                  <div key={i} className="group relative bg-white rounded-[1.5rem] p-8 shadow-sm hover:shadow-xl transition-all cursor-default">
                    <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-5">
                      <card.icon className="h-7 w-7 text-red-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-red-500 mb-3">{card.title}</h3>
                    <p className="text-base text-slate-700 leading-relaxed">{card.desc}</p>
                    {/* Hover popup */}
                    <div className="absolute inset-0 bg-white rounded-[1.5rem] p-8 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 flex flex-col justify-center">
                      <p className="text-[13px] text-slate-700 leading-relaxed">{card.popup}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Problem explanation paragraphs */}
              <div className="mt-16 space-y-5 max-w-4xl mx-auto text-slate-700 font-medium leading-relaxed">
                <p>
                  The NTL Institute's Learning Pyramid — validated across decades of cognitive science research — shows that passive methods (lectures, assigned reading, audio-visual content) produce between 5% and 20% knowledge retention. Yet the majority of educational institutions and EdTech platforms are built entirely on these passive approaches.
                </p>
                <p>
                  The Ebbinghaus Forgetting Curve (1885, replicated 2015) shows that without systematic reinforcement, learners lose approximately 42% of new material within 20 minutes, 70% within 24 hours, and 90% within 30 days. No conventional tutoring model has a systematic answer to this.
                </p>
                <p>
                  Meanwhile, Bloom's 2 Sigma research (1984) demonstrated that students who receive genuine mastery-based, personalised instruction consistently outperform traditional classroom students by two full standard deviations — a finding that has never been systematically implemented at scale. Until now.
                </p>
              </div>
            </div>
          </section>

          {/* ================= SECTION 3: THE 10X LEARNING LEAP MODEL™ ================= */}
          <section id="methodology" className="bg-brand-primary-soft/40 py-16 md:py-24 -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0">
            <div className="w-full max-w-6xl mx-auto lg:px-0">
              <div className="text-center mb-10 md:mb-20">
                <p className="text-sm-small font-black uppercase tracking-[0.28em] text-brand-primary mb-3">Our Proprietary Methodology</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 mb-4">
                  The 10X Learning Leap Model™
                </h2>
                <p className="text-xl text-blue-700 font-medium mb-6">Two phases. Eight research-validated steps. One systematic transformation.</p>
                <p className="text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
                  The 10X Learning Leap Model™ is not a content library. It is not an adaptive quiz engine. It is a
                  complete, architecturally designed learning system — built from the ground up on cognitive science,
                  Cambridge examiner expectations, and the specific knowledge gaps that cause students to fail.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="bg-brand-primary text-white rounded-2xl px-6 py-3 inline-block">
                    <h3 className="text-lg text-white font-semibold">Phase 1: Diagnostic &amp; Remedial</h3>
                    <p className="text-blue-200 text-sm">Steps 1–3 | Know exactly what to fix before teaching</p>
                  </div>
                  {[
                    { step: 1, title: "Comprehensive Diagnostic Assessment", desc: "AI identifies precise sub-skill gaps — not vague scores. Based on effect size d=2.0 (Bloom's 2 Sigma). Duration: approx. 30 minutes.", res: "VanLehn, 2011" },
                    { step: 2, title: "Personalised Remedial Pathway", desc: "A custom repair plan targeting only the student's actual weak areas — saving 40–60% of study time compared to linear curriculum coverage.", res: "Bloom, 1984" },
                    { step: 3, title: "Bridge &amp; Readiness Courses", desc: "Pre-syllabus scaffolding for students not yet ready for O-Level content. Built on Vygotsky's Zone of Proximal Development (ZPD). Covers Grades 7–9 gaps.", res: "Vygotsky, 1978" },
                  ].map((item, i) => (
                    <Card key={i} className="border border-white rounded-xl shadow-sm hover:shadow-xl transition-all">
                      <CardContent className="p-6">
                        <span className="text-base font-semibold text-brand-primary">Step {item.step}</span>
                        <h4 className="text-xl font-semibold text-slate-900 mt-1 mb-2" dangerouslySetInnerHTML={{ __html: item.title }} />
                        <p className="text-slate-900/70 font-medium mb-4">{item.desc}</p>
                        <p className="text-base text-slate-900/30 font-medium">Research: {item.res}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="space-y-6">
                  <div className="bg-brand-primary text-white rounded-2xl px-6 py-3 inline-block">
                    <h3 className="text-lg text-white font-semibold">Phase 2: Systematic Learning &amp; Mastery</h3>
                    <p className="text-blue-200 text-sm">Steps 4–8 | Durable mastery, exam readiness, independent learning</p>
                  </div>
                  {[
                    { step: 4, title: "Dual-Coding Interactive Instruction", desc: "Every concept taught through text + visuals + H5P interactive activities simultaneously. Based on Paivio (1971) + Mayer (2009) — 2× memory strength vs text alone.", res: "Paivio, 1971; Mayer, 2009" },
                    { step: 5, title: "Mastery Progression Gates (80% Rule)", desc: "Students advance only when they demonstrate 80% mastery at each stage. No gaps left to compound.", res: "Bloom, 1984" },
                    { step: 6, title: "AI-Timed Spaced Retrieval Practice", desc: "Automated retrieval at Days 1, 3, 7, 14, 30, 90. AI tracks each student's individual forgetting curve and adjusts timing. Produces 85%+ retention after 90 days.", res: "Roediger & Karpicke, 2006" },
                    { step: 7, title: "Application &amp; Exam Integration", desc: "Past Cambridge papers from Day 1. Marked using Cambridge examiner mark scheme logic — the same standards Cambridge examiners apply. Mock exams.", res: "Bransford et al., 2000" },
                    { step: 8, title: "Real-Time Progress &amp; Stakeholder Monitoring", desc: "Live dashboards for students, parents, teachers, and school administrators. Predictive alerts before problems become failures.", res: "Black & Wiliam, 1998" },
                  ].map((item, i) => (
                    <Card key={i} className="border border-white rounded-xl shadow-sm hover:shadow-xl transition-all">
                      <CardContent className="p-6">
                        <span className="text-base font-semibold text-brand-primary">Step {item.step}</span>
                        <h4 className="text-xl font-semibold text-slate-900 mt-1 mb-2" dangerouslySetInnerHTML={{ __html: item.title }} />
                        <p className="text-slate-900/70 font-medium mb-4">{item.desc}</p>
                        <p className="text-base text-slate-900/30 font-medium">Research: {item.res}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Guaranteed Outcomes strip */}
              <div className="bg-brand-primary text-white relative overflow-hidden mt-20 p-12 rounded-[3rem]">
                <div className="grid md:grid-cols-2 gap-8 text-center">
                  <div>
                    <h4 className="text-3xl font-semibold text-blue-400 mb-2">91%*</h4>
                    <p className="text-xs font-semibold text-blue-200">Pass rate (vs ~35% traditional average)</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-semibold text-blue-400 mb-2">85%+</h4>
                    <p className="text-xs font-semibold text-blue-200">Knowledge retention after 90 days (vs 10% traditional)</p>
                  </div>
                </div>
                <p className="text-center text-blue-300 text-xs mt-6">Based on platform-tracked outcomes. Full methodology available on request.</p>
                <p className="text-center text-blue-300 text-xs mt-2">*Designed to Achieve</p>
              </div>

              <div className="mt-8 text-center">
                <a href="/how-it-works" className="inline-flex items-center gap-2 text-base font-semibold text-brand-primary hover:text-blue-700">
                  Read the Full Methodology <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </section>

          {/* ================= SECTION 4: THREE FOUNDATIONAL PILLARS ================= */}
          <section id="pillars" className="py-16 md:py-24 bg-white -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0">
            <div className="w-full max-w-6xl mx-auto lg:px-0">
              <div className="text-center mb-10 md:mb-20">
                <p className="text-sm-small font-black uppercase tracking-[0.28em] text-brand-primary mb-3">What Everything Is Built On</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 mb-4">
                  Three Pillars. Every Feature Traces Back to One of Them.
                </h2>
              </div>

              <div className="space-y-8">
                {[
                  {
                    icon: Brain,
                    title: "True Personalisation",
                    subtitle: "Not adaptive quizzes. Real AI-powered diagnostics and precision remediation.",
                    bullets: [
                      "Every student receives a unique learning pathway — built from their actual diagnostic results, not a generic sequence.",
                      "Only the genuine weak areas are targeted. Known content is skipped. Study time is not wasted.",
                      "80% mastery gates prevent gaps from compounding silently over time.",
                      "Cambridge AI tutor provides sub-skill level guidance — not generic hints.",
                    ],
                    res: "Bloom's 2 Sigma Problem (1984), effect size d=2.0",
                    popup: "Bloom's research showed that 1-to-1 mastery tutoring produces outcomes 2 standard deviations above conventional classroom instruction. EduMeUp delivers this at scale through AI — available to every student, not just those who can afford elite private tutoring.",
                  },
                  {
                    icon: BarChart3,
                    title: "10X Retention — Guaranteed",
                    subtitle: "Automated spaced retrieval + dual coding + mastery gates = durable knowledge, not exam-night cramming.",
                    bullets: [
                      "Automated spaced retrieval at scientifically validated intervals — the forgetting curve is not hoped away, it is systematically defeated.",
                      "Dual-coding instruction (text + visuals + interactive H5P activities) produces 2× memory consolidation vs. text alone.",
                      "Retrieval practice — not re-reading — is what converts short-term exposure into long-term, exam-ready knowledge.",
                      "Result: 85%+ retention after 90 days, versus 10% with traditional methods.",
                    ],
                    res: "Roediger & Karpicke (2006), Cepeda et al. (2006), Paivio (1971), Mayer (2009)",
                    popup: "The EduMeUp AI does not just schedule reviews — it tracks each individual student's forgetting curve and adjusts retrieval timing in real time. When a student's retention data shows accelerated forgetting on a specific concept, the AI automatically introduces additional practice cycles.",
                  },
                  {
                    icon: GraduationCap,
                    title: "Future-Ready Mastery",
                    subtitle: "Cambridge results are the benchmark — not the ceiling.",
                    bullets: [
                      "Every subject course builds the WEF Top 10 skills: critical thinking, problem-solving, analysis, creativity, and adaptability.",
                      "Unseen exam practice and genuine transfer learning — not pattern memorisation.",
                      "Cambridge AI tutor teaches students to think like Cambridge examiners: to understand what AO1, AO2, and AO3 actually demand.",
                      "Students build genuine academic independence — reducing tutor dependency, preparing for A-Level and university.",
                    ],
                    res: "Bransford et al. (2000); Zimmerman (2002); WEF Future of Jobs Report (2020)",
                    popup: "The 10X model is built for Cambridge standards, but its depth goes beyond any single examination system. Students who master content through this model are equipped for any high-stakes assessment that rewards genuine understanding over rote recall.",
                  },
                ].map((pillar, i) => (
                  <div key={i} className="group relative">
                    {/* Header band */}
                    <div className={`${i === 0 ? "bg-brand-primary" : i === 1 ? "bg-[#1e1b4b]" : "bg-slate-700"} text-white rounded-t-[2rem] px-8 py-5 flex items-center gap-4`}>
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <pillar.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl text-white font-semibold">{pillar.title}</h3>
                        <p className="text-white/70 text-sm">{pillar.subtitle}</p>
                      </div>
                    </div>
                    {/* Content */}
                    <div className="bg-brand-primary-soft/40 rounded-b-[2rem] p-8 hover:shadow-2xl transition-all border-4 border-white">
                      <ul className="space-y-3 mb-6">
                        {pillar.bullets.map((b, j) => (
                          <li key={j} className="flex items-start gap-3 text-base font-medium text-slate-700">
                            <CheckCircle2 className="h-4 w-4 text-brand-primary mt-0.5 flex-shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>
                      <p className="text-[13px] text-slate-500 font-medium border-t border-blue-100 pt-4">Research: {pillar.res}</p>
                      <a href="#" className="text-[13px] text-brand-primary font-semibold mt-2 inline-block hover:text-blue-800">Research behind this →</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ================= SECTION 5: COMPETITOR COMPARISON TABLE ================= */}
          <section id="comparison" className="bg-brand-primary-soft/40 py-16 md:py-24 -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0">
            <div className="w-full max-w-6xl mx-auto lg:px-0">
              <div className="text-center mb-10 md:mb-16">
                <p className="text-sm-small font-black uppercase tracking-[0.28em] text-brand-primary mb-3">How We Compare — Honestly</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 mb-4">
                  Every Claim We Make, We Can Substantiate.
                </h2>
                <p className="text-base text-slate-700 max-w-3xl mx-auto">
                  We believe students and schools deserve to know exactly what they are getting. Here is an evidence-based comparison of what EduMeUp delivers versus the most widely used alternatives.
                </p>
              </div>

              <div className="overflow-x-auto rounded-[1.5rem] shadow-sm">
                <table className="w-full min-w-[700px]">
                  <thead>
                    <tr className="bg-brand-primary text-white text-xs uppercase tracking-wider">
                      <th className="p-4 text-left font-semibold">Feature / Capability</th>
                      <th className="p-4 text-center font-semibold bg-green-600/20">EduMeUp ★</th>
                      <th className="p-4 text-center font-semibold">Khan Academy</th>
                      <th className="p-4 text-center font-semibold">Kognity</th>
                      <th className="p-4 text-center font-semibold">Generic AI Tools</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["10X retention methodology (systematic)", "✔", "✘", "~", "✘"],
                      ["Cambridge / IGCSE curriculum alignment", "✔", "✘", "✔", "✘"],
                      ["AI diagnostics at sub-skill level", "✔", "✘", "~", "~"],
                      ["Cambridge examiner insight (AO1/AO2/AO3)", "✔", "✘", "~", "✘"],
                      ["Automated spaced retrieval (AI-timed)", "✔", "✘", "✘", "✘"],
                      ["Interactive H5P activities (1000+)", "✔", "✘", "~", "✘"],
                      ["80% mastery gates (no gap compounding)", "✔", "✘", "✘", "✘"],
                      ["Complete stakeholder ecosystem (4 groups)", "✔", "✘", "~", "✘"],
                      ["Diagnostic & remedial pathways (auto)", "✔", "✘", "~", "~"],
                      ["24/7 Cambridge expert AI tutor", "✔", "✘", "✘", "~"],
                      ["Research foundation (15+ peer-reviewed)", "✔", "~", "~", "✘"],
                      ["Teacher training & CPD support", "✔", "✘", "✘", "✘"],
                      ["University-validated outcomes (3-year study)", "✔", "✘", "✘", "✘"],
                    ].map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                        <td className="p-4 text-base text-slate-700 font-medium">{row[0]}</td>
                        {row.slice(1).map((val, j) => (
                          <td key={j} className={`p-4 text-center text-lg font-bold ${j === 0 ? "bg-green-50" : ""} ${val === "✔" ? "text-green-600" : val === "✘" ? "text-red-400" : "text-amber-500"}`}>
                            {val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[12px] text-slate-500 mt-4">Legend: ✔ = Yes, fully available | ~ = Partial or limited | ✘ = Not available</p>

              {/* Verdict */}
              <div className="mt-8 border-l-4 border-brand-primary bg-blue-50 p-6 rounded-r-[1.5rem]">
                <p className="text-base text-slate-700 leading-relaxed font-medium">
                  <strong>Verdict:</strong> EduMeUp combines the breadth and accessibility of Khan Academy + the Cambridge curriculum depth of Kognity + the AI power of modern LLMs — and adds what none of them provide: a systematic, research-validated retention methodology, Cambridge examiner-calibrated AI tutoring, automated spaced retrieval, and a complete four-stakeholder ecosystem. This combination is unique in the global EdTech market.
                </p>
              </div>
            </div>
          </section>

          {/* ================= SECTION 6: COMPLETE ECOSYSTEM ================= */}
          <section id="ecosystem" className="py-16 md:py-24 bg-white -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0">
            <div className="w-full max-w-6xl mx-auto lg:px-0">
              <div className="text-center mb-20">
                <p className="text-sm-small font-black uppercase tracking-[0.28em] text-brand-primary mb-3">Everyone Empowered</p>
                <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-4">
                  Most Platforms Serve One Group. We Built for Four.
                </h2>
                <p className="text-xl text-slate-900/40 font-medium max-w-3xl mx-auto">
                  Education does not happen in isolation. Students cannot succeed without informed teachers. Teachers cannot excel without supportive systems. Schools cannot improve without data. Parents cannot engage without visibility.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: "🎓",
                    title: "Students",
                    items: [
                      "Personalised pathway — fixed to their exact gaps",
                      "24/7 Cambridge-expert AI tutor",
                      "1000+ interactive H5P activities",
                      "AI-timed retrieval practice — 85%+ retention",
                      "Real-time progress dashboard",
                      "Builds academic independence",
                    ],
                    popup: "EduMeUp students spend less time studying and achieve better results — because every study session is targeted to their genuine gaps and reinforced at scientifically optimal intervals.",
                    result: "Confusion → Mastery"
                  },
                  {
                    icon: "📋",
                    title: "Teachers",
                    items: [
                      "Automated grading — saves 5–6 hours/week",
                      "AI-generated insights on class mastery gaps",
                      "Ready-made, Cambridge-aligned lesson content",
                      "Professional development and CPD support",
                      "Student progress alerts before gaps become failures",
                    ],
                    popup: "EduMeUp does not replace teachers — it removes the administrative burden that prevents great teachers from doing their best work.",
                    result: "Overworked → Empowered"
                  },
                  {
                    icon: "👨‍👩‍👧",
                    title: "Parents",
                    items: [
                      "Free real-time progress dashboard",
                      "Proactive AI alerts before exam failure",
                      "Evidence-based approach explained clearly",
                      "Significant reduction in tutoring costs",
                      "Direct access to Cambridge expert support",
                    ],
                    popup: "The parent dashboard is designed to be genuinely useful — not just a reporting screen, but an early-warning and engagement system that keeps families informed and involved.",
                    result: "Anxiety → Confidence"
                  },
                  {
                    icon: "🏫",
                    title: "Schools",
                    items: [
                      "Real-time institutional analytics",
                      "Predictive intervention alerts",
                      "Complete Cambridge-aligned content library",
                      "Teacher training and CPD built in",
                      "White-label options available",
                      "271% ROI in validated institutional study",
                    ],
                    popup: "School partnerships are designed as genuine collaborations — not franchise arrangements. EduMeUp provides the research, content, systems, and support while schools maintain full autonomy.",
                    result: "Guesswork → Excellence"
                  }
                ].map((box, i) => (
                  <div key={i} className={`group relative bg-brand-primary-soft/40 p-6 rounded-xl border border-white hover:border-blue-100 hover:shadow-xl transition-all`}>
                    <div className="text-3xl mb-3">{box.icon}</div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">{box.title}</h3>
                    <ul className="space-y-3 mb-6">
                      {box.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-[13px] font-medium text-slate-900/60">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4 border-t border-blue-100">
                      <p className="text-base font-medium text-brand-primary">Result: {box.result}</p>
                    </div>
                    {/* Hover popup */}
                    <div className="absolute inset-0 bg-white rounded-xl p-6 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 flex flex-col justify-center border-2 border-brand-primary">
                      <p className="text-[13px] text-slate-700 leading-relaxed">{box.popup}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Outcome strip */}
              <div className="mt-16 grid md:grid-cols-3 gap-6">
                {[
                  { stat: "4", label: "Stakeholder groups fully supported" },
                  { stat: "24/7", label: "Platform availability" },
                  { stat: "1000+", label: "Interactive H5P activities" },
                ].map((item, i) => (
                  <div key={i} className="bg-brand-primary-soft/40 p-8 rounded-[1.5rem] text-center">
                    <p className="text-4xl font-semibold text-brand-primary mb-2">{item.stat}</p>
                    <p className="text-base text-slate-600 font-medium">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ================= SECTION 7: RESEARCH FOUNDATION (Timeline) ================= */}
          <section className="bg-brand-primary text-white relative overflow-hidden py-16 md:py-24 -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0">
            <div className="w-full max-w-6xl mx-auto lg:px-0">
              <div className="text-center mb-10 md:mb-20">
                <p className="text-sm-small font-black uppercase tracking-[0.28em] text-blue-300 mb-3">The Evidence Behind Everything</p>
                <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4">
                  Not Marketing — Science. 50 Years of Research, Implemented.
                </h2>
                <p className="text-xl text-blue-300 uppercase tracking-wide">Not Marketing Hype — Peer-Reviewed Facts</p>
              </div>

              {/* Timeline */}
              <div className="space-y-0 rounded-[1.5rem] overflow-hidden">
                {[
                  { year: "1885 / 2015", author: "Ebbinghaus", topic: "Forgetting Curve", impl: "AI-timed spaced retrieval system (Step 6)" },
                  { year: "1969", author: "Dale", topic: "Cone of Learning / Learning Pyramid", impl: "Active learning course architecture (all phases)" },
                  { year: "1971", author: "Paivio", topic: "Dual Coding Theory", impl: "Text + visual + H5P interactive instruction (Step 4)" },
                  { year: "1978", author: "Vygotsky", topic: "Zone of Proximal Development", impl: "Bridge & readiness courses, scaffolded pathways (Step 3)" },
                  { year: "1984", author: "Bloom", topic: "Mastery Learning & 2 Sigma Problem", impl: "80% mastery gates + AI diagnostics (Steps 1, 5)" },
                  { year: "1998", author: "Black & Wiliam", topic: "Formative Assessment", impl: "Continuous assessment + real-time feedback (Step 8)" },
                  { year: "2000", author: "Bransford et al.", topic: "Transfer of Learning", impl: "Unseen exam practice + application integration (Step 7)" },
                  { year: "2006", author: "Roediger & Karpicke ⭐", topic: "Retrieval Practice Effect", impl: "AI-automated retrieval practice (Step 6)" },
                  { year: "2006", author: "Cepeda et al.", topic: "Spacing Effect (replicated)", impl: "6-interval retrieval schedule: Day 1, 3, 7, 14, 30, 90 (Step 6)" },
                  { year: "2009", author: "Mayer", topic: "Multimedia Learning Principles", impl: "Interactive H5P multimedia course design (Step 4)" },
                  { year: "2011", author: "VanLehn", topic: "Intelligent Tutoring Systems", impl: "Cambridge-expert AI tutor + diagnostic engine (Steps 1–2)" },
                  { year: "2014", author: "Freeman et al.", topic: "Active Learning Meta-Analysis", impl: "Full active learning architecture across all courses" },
                  { year: "2020", author: "WEF", topic: "Future of Jobs / Top Skills", impl: "Future-ready skill development embedded in all subjects" },
                ].map((row, i) => (
                  <div key={i} className={`grid grid-cols-[120px_1fr] gap-6 p-5 border-b border-white/10 ${i % 2 === 0 ? "bg-white/10" : "bg-white/5"} hover:bg-white/20 transition-colors cursor-default`}>
                    <div>
                      <span className="inline-block bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-lg">{row.year}</span>
                    </div>
                    <div>
                      <span className="text-white/70 font-bold text-[13px] uppercase mr-3">{row.author}</span>
                      <span className="text-white font-semibold text-base">{row.topic}</span>
                      <p className="text-blue-300 text-[13px] mt-1">→ IMPLEMENTED: {row.impl}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-blue-300 text-xs italic mt-6">⭐ Star marks the study EduMeUp considers most directly transformative for student outcomes. Full research bibliography available on request.</p>
              <div className="mt-6">
                <a href="/research-bibliography" className="inline-flex items-center gap-2 bg-brand-primary text-white font-semibold px-6 py-3 rounded-xl text-base hover:bg-blue-700 transition-colors">
                  <Download className="h-4 w-4" /> Download the Full Research Bibliography →
                </a>
              </div>
            </div>
          </section>

          {/* ================= SECTION 8: OUR STORY ================= */}
          <section id="story" className="py-16 md:py-24 bg-[#FAFAF8] -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0">
            <div className="w-full max-w-4xl mx-auto lg:px-0">
              <div className="text-center mb-10 md:mb-16">
                <p className="text-sm-small font-black uppercase tracking-[0.28em] text-brand-primary mb-3">How It Began</p>
                <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-4">
                  Founded by Educators Who Saw the System Failing Students.
                </h2>
              </div>

              {/* Milestone timeline */}
              <div className="relative mb-16">
                {/* Desktop: horizontal line */}
                <div className="hidden md:block absolute top-5 left-0 right-0 h-0.5 bg-brand-primary/20" />
                <div className="grid md:grid-cols-4 gap-6">
                  {[
                    { year: "2019–20", title: "The Realisation", desc: "An educator and institution leader observes a repeating crisis: passive teaching, rapid forgetting, tutor dependency, exam failure. The research points clearly to a better system." },
                    { year: "2021", title: "EduMeUp Founded", desc: "The platform is founded with a single mandate: apply the full body of cognitive science research to Cambridge education, systematically and at scale." },
                    { year: "2021–24", title: "University-Validated Results", desc: "A rigorous 3-year study across 611 students produces validated outcomes: 91% pass rate, 47% A/A* rate, 75% long-term retention." },
                    { year: "2026+", title: "Global Expansion", desc: "2,000+ students across 25+ countries. A-Level development in progress. School Partnerships — serving students across 25+ countries. Continued R&D with partner institutions." },
                  ].map((m, i) => (
                    <div key={i} className="relative text-center">
                      <div className="inline-flex w-10 h-10 rounded-full bg-brand-primary text-white items-center justify-center text-sm font-bold mb-3 mx-auto">{i + 1}</div>
                      <p className="text-sm-small font-black uppercase tracking-[0.2em] text-brand-primary mb-1">{m.year}</p>
                      <p className="font-semibold text-slate-900 mb-2 text-sm">{m.title}</p>
                      <p className="text-[13px] text-slate-600">{m.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Founder card */}
              <div className="border border-blue-100 border-l-4 border-l-brand-primary rounded-[1.5rem] p-8 bg-white shadow-sm mb-12">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-primary to-brand-sky flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-white">MB</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-slate-900">Muhammad Benyameen</h4>
                    <p className="text-brand-primary font-semibold text-sm mb-3">Founder &amp; Chief Adviser</p>
                    <p className="text-slate-700 leading-relaxed text-base">
                      With over 27 years of educational leadership experience across institutional development and cognitive science application — including roles as Principal and Deputy Director at leading institutions — Muhammad built EduMeUp because he had seen, firsthand, what the passive instruction model costs students. His M.Phil in Educational Planning &amp; Management and M.Sc. in Physics are the academic foundation. The 10X Learning Leap Model™ is the result.
                    </p>
                    <p className="mt-4 italic text-slate-600 font-medium">"The research has always shown us a better way to teach. We simply chose to build it."</p>
                  </div>
                </div>
              </div>

              {/* Our Values */}
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {[
                  { title: "Research Over Hype", desc: "Every feature in EduMeUp is built on peer-reviewed evidence. If the research does not support it, we do not build it." },
                  { title: "Students First, Always", desc: "Every decision — from pricing to platform design to content sequencing — begins with a single question: does this genuinely help students learn better?" },
                  { title: "Radical Transparency", desc: "We publish our methodology, our research references, and our validated outcomes. We invite scrutiny because scrutiny is how trust is built." },
                  { title: "Continuous Improvement", desc: "Cognitive science continues to advance. So does EduMeUp. Our R&D team continuously evaluates new research and integrates validated findings into the platform." },
                ].map((v, i) => (
                  <div key={i} className="bg-white p-6 rounded-[1.5rem] border border-slate-100">
                    <h4 className="font-semibold text-brand-primary mb-2">{v.title}</h4>
                    <p className="text-base text-slate-600">{v.desc}</p>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-brand-primary-soft/40 p-10 rounded-[2.5rem]">
                  <h4 className="text-3xl text-slate-900 mb-2">2,000+*</h4>
                  <p className="text-xs font-black uppercase text-blue-600 tracking-widest">Students Globally</p>
                </div>
                <div className="bg-brand-primary-soft/40 p-10 rounded-[2.5rem]">
                  <h4 className="text-3xl text-slate-900 mb-2">25+</h4>
                  <p className="text-xs font-black uppercase text-blue-600 tracking-widest">Countries Reached</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 mt-4">*Designed to Achieve</p>
            </div>
          </section>

          {/* ================= WHO THIS IS FOR ================= */}
          <section id="fit" className="bg-brand-primary-soft/40 py-16 md:py-24 -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0">
            <div className="w-full max-w-6xl mx-auto lg:px-0">
              <div className="text-center mb-10 md:mb-20">
                <h2 className="text-4xl md:text-5xl font-semibold font-black text-slate-900 mb-4">
                  Is EduMeUp Right For You?
                </h2>
                <p className="text-xl text-slate-900/40 font-medium uppercase tracking-wide">An Honest Assessment of Fit</p>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-white p-6 sm:p-10 md:p-12 rounded-[2rem] md:rounded-[3.5rem] border-4 border-white shadow-xl">
                  <h3 className="text-2xl font-black text-green-600 mb-6 md:mb-8 uppercase flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-lg">✓</div>
                    Ideal For
                  </h3>
                  <div className="space-y-10">
                    <div>
                      <h4 className="text-xs font-black uppercase text-slate-900/40 mb-4 tracking-widest">Students Who</h4>
                      <ul className="space-y-4">
                        {["Are serious about O-Level prep", "Want to reduce tutor dependency", "Struggle with retention", "Have foundation gaps"].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-base font-medium text-slate-900">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase text-slate-900/40 mb-4 tracking-widest">Parents Who</h4>
                      <ul className="space-y-4">
                        {["Value research-backed approaches", "Want real-time visibility", "Seek cost-effective alternatives"].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-base font-medium text-slate-900">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 sm:p-10 md:p-12 rounded-[2rem] md:rounded-[3.5rem] border-4 border-white shadow-xl opacity-80">
                  <h3 className="text-2xl font-black text-red-500 mb-6 md:mb-8 uppercase flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-lg">×</div>
                    Not For
                  </h3>
                  <div className="space-y-10">
                    <div>
                      <h4 className="text-xs font-black uppercase text-slate-900/40 mb-4 tracking-widest">Students Who</h4>
                      <ul className="space-y-4">
                        {["Expect instant results without effort", "Won't commit min 3 hours/week", "Want shortcuts to success"].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-base font-medium text-slate-900/60">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase text-slate-900/40 mb-4 tracking-widest">Schools That</h4>
                      <ul className="space-y-4">
                        {["Won't implement systematically", "Expect tech to replace teachers", "Avoid data-driven decisions"].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-base font-medium text-slate-900/60">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ================= LIMITATIONS & HONESTY ================= */}
          <section id="honesty" className="py-16 md:py-24 bg-white -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0">
            <div className="w-full max-w-4xl mx-auto lg:px-0">
              <div className="bg-brand-primary text-white relative overflow-hidden p-6 sm:p-10 md:p-16 rounded-[2rem] sm:rounded-[3rem] md:rounded-[4rem]">
                <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4">Transparency Builds Trust</h2>
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <h4 className="text-blue-400 font-black uppercase text-base tracking-widest">What We Are</h4>
                    <ul className="space-y-3">
                      {["Systematic & research-validated", "Stakeholder support system", "Data-proven results", "Cost-effective"].map((item, i) => (
                        <li key={i} className="text-base font-medium text-white/80 flex items-center gap-3">
                          <div className="w-1 h-1 rounded-full bg-blue-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-6">
                    <h4 className="text-red-400 font-black uppercase text-base tracking-widest">What We Are Not</h4>
                    <ul className="space-y-3">
                      {["Not a teacher replacement", "Not an instant miracle", "Not a shortcut provider", "Not yet for every curriculum"].map((item, i) => (
                        <li key={i} className="text-base font-medium text-white/60 flex items-center gap-3">
                          <div className="w-1 h-1 rounded-full bg-red-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className="mt-12 pt-8 border-t border-white/10 text-center text-slate-300 text-xs font-medium tracking-[0.2em]">
                  We believe in radical honesty: transparency over overpromising
                </p>
              </div>
            </div>
            </section>

          {/* ================= SECTION 9: FINAL CTA — THREE OPTIONS ================= */}
      <section id="get-started" className="bg-brand-primary text-white relative overflow-hidden py-20 md:py-32 relative overflow-hidden -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0">
        <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-blue-600 opacity-30 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-blue-600 opacity-30 blur-3xl" aria-hidden="true" />
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-[1.05] mb-3 text-center tracking-tight px-4">
            Ready to See the Difference?
          </h2>
          <p className="text-base text-blue-200 mb-12 max-w-3xl mx-auto">
            Choose the step that is right for you right now.
          </p>

          {/* Three CTA Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            {/* Primary CTA Card */}
            <div className="bg-brand-primary border-4 border-white/20 rounded-[2rem] p-8 text-left flex flex-col shadow-2xl md:scale-105">
              <h3 className="text-2xl font-semibold text-white mb-2">Take the Free Diagnostic</h3>
              <p className="text-blue-200 text-sm font-semibold mb-4">Approx. 90 minutes. No credit card required.</p>
              <p className="text-white/80 text-base leading-relaxed mb-6 flex-1">
                Our AI identifies your exact sub-skill gaps and produces a personalised learning plan. You will know precisely what to focus on — before spending a single dollar on courses.
              </p>
              <InquiryDialog
                defaultType="diagnostic"
                title="Free Diagnostic Assessment"
                trigger={
                  <Button className="w-full bg-white text-brand-primary hover:bg-blue-50 font-semibold py-3 rounded-xl text-base flex items-center justify-center gap-2">
                    Start Free Diagnostic <ArrowRight className="h-4 w-4" />
                  </Button>
                }
              />
            </div>

            {/* Secondary CTA Card */}
            <div className="bg-white border-4 border-brand-primary rounded-[2rem] p-8 text-left flex flex-col shadow-xl">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Try a Free Interactive Demo</h3>
              <p className="text-brand-primary text-sm font-semibold mb-4">Experience an H5P interactive lesson + spaced retrieval in action.</p>
              <p className="text-slate-700 text-base leading-relaxed mb-6 flex-1">
                See exactly what active learning feels like on EduMeUp — before committing to any course. No login required for the demo.
              </p>
              <Button variant="outline" className="w-full border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-semibold py-3 rounded-xl text-base flex items-center justify-center gap-2">
                <Play className="h-4 w-4" /> Try the Demo
              </Button>
            </div>

            {/* Tertiary CTA Card */}
            <div className="bg-slate-100 rounded-[2rem] p-8 text-left flex flex-col shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Download the Research Bibliography</h3>
              <p className="text-slate-500 text-sm font-semibold mb-4">40-page PDF. 15+ peer-reviewed studies. Full citations.</p>
              <p className="text-slate-600 text-base leading-relaxed mb-6 flex-1">
                For educators, school leaders, and parents who want to go deeper — the full research foundation behind the 10X Learning Leap Model™, with implementation notes for each study.
              </p>
              <Button variant="outline" className="w-full border-2 border-slate-300 text-slate-700 hover:bg-slate-200 font-semibold py-3 rounded-xl text-base flex items-center justify-center gap-2">
                <Download className="h-4 w-4" /> Download Free PDF
              </Button>
            </div>
          </div>

          {/* Trust signals strip */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-blue-200 font-medium">
            {[
              "🎓 2,000+ Students",
              "🌍 25+ Countries",
              "🏛 University-Validated (3 years)",
              "📊 91% Pass Rate",
              "🔒 30-Day Money-Back Guarantee",
              "📞 24/7 Expert Support",
            ].map((item, i) => (
              <span key={i} className="flex items-center gap-1">{item}</span>
            ))}
          </div>

          {/* Secondary contact options */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-base">
            <a href="/consultation" className="text-blue-300 hover:text-white transition-colors">Free 30-minute consultation with a Cambridge expert</a>
            <a href="/support" className="text-blue-300 hover:text-white transition-colors">24/7 AI chat support</a>
            <a href="mailto:support@edumeup.com" className="text-blue-300 hover:text-white transition-colors">support@edumeup.com</a>
          </div>
        </div>
      </section>
        </main>
      </div>
    </Layout>
  );
}
