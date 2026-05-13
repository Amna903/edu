import { Link } from "wouter";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { PageSidebar } from "@/components/PageSidebar";
import {
  ArrowRight,
  Brain,
  BarChart3,
  CheckCircle2,
  BookOpen,
  Globe,
  Users,
  Zap,
  Search,
  Clock,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const problemCards = [
  {
    title: "Rapid Forgetting",
    icon: BarChart3,
    stat: "Up to 70% of material is forgotten within 24h.",
    body: "The Ebbinghaus Forgetting Curve shows that content vanishes rapidly without reinforcement. Traditional tutoring lacks a system to prevent this.",
    popup: "EduMeUp's AI tracks each student's forgetting curve and delivers precisely timed retrieval prompts — converting short-term memory into mastery.",
    color: "bg-status-danger-soft/10",
    iconColor: "text-status-danger",
  },
  {
    title: "Tutor Dependency",
    icon: Users,
    stat: "Quality and availability vary dramatically.",
    body: "When progress is tied to a single human tutor, inconsistency and absence create compound learning gaps that traditional models can't fix.",
    popup: "EduMeUp provides a 24/7 Cambridge-expert AI tutor trained on examiner expectations — consistent, always available, always standard.",
    color: "bg-status-warning-soft/10",
    iconColor: "text-status-warning",
  },
  {
    title: "Passive Learning Illusion",
    icon: BookOpen,
    stat: "Watching videos feels like learning — but isn't.",
    body: "Passive methods produce 5–20% retention. Real mastery requires active engagement, retrieval practice, and immediate application.",
    popup: "Every EduMeUp course is interactive — built with H5P technology so students actively apply and are evaluated in real time, not just consume content.",
    color: "bg-brand-primary/5",
    iconColor: "text-brand-primary",
  },
];

const differentiators = [
  {
    icon: Brain,
    title: "Cambridge-Focused AI Tutor",
    desc: "Not a generic chatbot. Our AI tutor is trained specifically on IGCSE and O-Level curriculum, assessment objectives (AO1-AO3), and examiner marking expectations.",
    popup: "It thinks like an examiner — available 24/7. It diagnoses, teaches, and evaluates with deep knowledge of syllabus nuances and mark scheme logic.",
    color: "bg-brand-primary",
  },
  {
    icon: Zap,
    title: "Interactive Courses — Not Videos",
    desc: "Every lesson is an active experience. Every course element is designed to make the learner DO something, not just watch something.",
    popup: "Research shows interactive, retrieval-based learning produces 3–5× higher retention than passive video learning. We use H5P and research-backed design.",
    color: "bg-brand-primary",
  },
  {
    icon: Search,
    title: "Diagnostic & Remedial Engine",
    desc: "Our platform identifies learning gaps before they become exam failures. Targeted remedial pathways automatically repair foundational weaknesses.",
    popup: "EduMeUp's diagnostic system maps knowledge landscapes and prescribes targeted content to fix gaps from earlier grades that hinder O-Level success.",
    color: "bg-brand-navy",
  },
  {
    icon: Clock,
    title: "AI-Timed Retrieval Practice",
    desc: "Our system tracks the forgetting curve for each student and delivers precisely timed practice prompts — converting memory into exam-ready mastery.",
    popup: "Spaced retrieval is the most evidence-backed method for long-term retention. EduMeUp automates this entirely — right practice, right time.",
    color: "bg-brand-navy",
  },
  {
    icon: Users,
    title: "Complete Stakeholder Ecosystem",
    desc: "Students, parents, teachers, and administrators empowered with relevant tools and insights. Education does not happen in isolation.",
    popup: "Parents track progress, teachers access curriculum tools, and administrators manage data. All in one ecosystem — not scattered tools.",
    color: "bg-neutral-muted",
  },
  {
    icon: Globe,
    title: "Language Barriers Removed",
    desc: "Built-in translation and audio features ensure that language is never a barrier to understanding Cambridge-standard content.",
    popup: "Comprehension barriers can be as damaging as knowledge gaps. Our translation layer removes friction for ESL/EFL learners.",
    color: "bg-neutral-muted",
  },
];

const comparisonRows = [
  ["Cambridge / IGCSE curriculum alignment", "✔", "~", "✘", "✔"],
  ["AI tutor (curriculum-specific, not generic)", "✔", "✘", "✘", "✘"],
  ["Cambridge examiner insight & mark scheme logic", "✔", "~", "✘", "~"],
  ["Interactive courses (active learning — not videos)", "✔", "✘", "~", "✘"],
  ["Diagnostic & remedial learning pathways", "✔", "✘", "~", "✘"],
  ["AI-timed retrieval practice (spaced repetition)", "✔", "✘", "✘", "✘"],
  ["24/7 availability", "✔", "✘", "✔", "✘"],
  ["Language barrier support (translation + audio)", "✔", "✘", "~", "✘"],
  ["Complete stakeholder ecosystem (4 groups)", "✔", "✘", "✘", "~"],
  ["Forgetting curve management (automated)", "✔", "✘", "✘", "✘"],
  ["School partnership model (non-franchise)", "✔", "✘", "✘", "✘"],
  ["Teacher training & CPD support", "✔", "✘", "✘", "~"],
  ["Transparent pricing (USD, no hidden fees)", "✔", "~", "✔", "✘"],
  ["Research-backed learning architecture", "✔", "✘", "~", "✘"],
];

export default function HowEduMeUpIsDifferent() {
  return (
    <Layout>
      <div className="w-full lg:px-8 lg:grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-12 items-start pt-8 md:pt-12 bg-neutral-surface min-h-screen">
        <PageSidebar
          title="Why EduMeUp"
          quote="A complete Cambridge learning ecosystem — not just content delivery."
          links={[
            { label: "The Problem", href: "#problem" },
            { label: "Our Solution", href: "#section-3" },
            { label: "Key Differentiators", href: "#differentiators" },
            { label: "Comparison Table", href: "#comparison-table" },
            { label: "For Schools", href: "#schools" },
            { label: "Get Started", href: "#cta" },
          ]}
        />

        <main className="min-w-0 space-y-0 bg-white rounded-t-[3rem] shadow-2xl border-x border-t border-neutral-border overflow-hidden">
          {/* SECTION 2: THE PROBLEM */}
          <section id="problem" className="py-20 md:py-32 bg-status-danger-soft/5 px-6 md:px-12">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <span className="inline-flex items-center rounded-full bg-status-danger/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-status-danger mb-6">
                  The Research Is Clear
                </span>
                <h2 className="text-4xl md:text-6xl font-bold text-neutral-text mb-8 tracking-tighter leading-[0.95]">
                  The Traditional Model <br/><span className="text-status-danger">Fails 95% of Learners.</span>
                </h2>
                <p className="text-xl text-neutral-muted font-medium max-w-3xl mx-auto mb-12">
                  Traditional teaching methods yield only 5% retention after 24 hours. Here is why it matters for your results.
                </p>

                <div className="bg-white p-8 rounded-[2rem] border-l-8 border-status-danger shadow-xl text-left max-w-3xl mx-auto relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-status-danger/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                  <p className="text-lg italic text-neutral-text leading-relaxed relative z-10">
                    "Traditional teaching methods — lectures, textbooks, and assigned readings — yield only 5% knowledge retention. Most tutoring centers are built on exactly this model."
                  </p>
                  <p className="text-xs text-neutral-muted mt-4 font-bold uppercase tracking-widest">— NTL Institute Research</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {problemCards.map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group relative bg-white rounded-[2rem] p-8 border border-neutral-border shadow-lg hover:shadow-2xl transition-all overflow-hidden"
                  >
                    <div className={`w-14 h-14 ${card.color} rounded-2xl flex items-center justify-center mb-6`}>
                      <card.icon className={`h-7 w-7 ${card.iconColor}`} />
                    </div>
                    <h3 className={`text-xl font-bold ${card.iconColor} mb-3 tracking-tight`}>{card.title}</h3>
                    <p className="text-sm font-bold text-neutral-text mb-4 uppercase tracking-wider">{card.stat}</p>
                    <p className="text-base text-neutral-muted leading-relaxed font-medium">{card.body}</p>
                    <div className="absolute inset-0 bg-white rounded-[2rem] p-8 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 flex flex-col justify-center border-l-8 border-status-danger">
                      <p className="text-sm text-neutral-text leading-relaxed font-medium italic">"{card.popup}"</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 3: THE 10X SOLUTION */}
          <section id="section-3" className="py-20 md:py-32 bg-white px-6 md:px-12">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-20">
                <span className="inline-flex items-center rounded-full bg-brand-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-primary mb-6">
                  Our Proprietary Methodology
                </span>
                <h2 className="text-4xl md:text-6xl font-bold text-neutral-text mb-8 tracking-tighter leading-[0.95]">
                  The <span className="text-brand-primary">10X Learning Leap</span> Model.
                </h2>
                <p className="text-xl text-neutral-muted font-medium max-w-3xl mx-auto">
                  Transforming passive exposure into 50%+ mastery — systematically, measurably, and at scale.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8 bg-neutral-surface p-12 rounded-[3rem] border border-neutral-border shadow-xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                   <h3 className="text-2xl font-bold text-brand-primary uppercase tracking-widest">Cognitive Engineering</h3>
                   <p className="text-lg text-neutral-text leading-relaxed font-medium">
                     Our 8-stage architecture is engineered around cognitive science, retrieval practice, and Cambridge examiner expectations.
                   </p>
                   <p className="text-base text-neutral-muted leading-relaxed">
                     It is not a content library. It is a complete ecosystem that transforms how students think, retain, and perform.
                   </p>
                   <Link href="/how-it-works">
                     <Button variant="outline" className="h-12 px-8 rounded-xl border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-bold transition-all">
                        Explore the 8-Step Model <ArrowRight className="ml-2 h-4 w-4" />
                     </Button>
                   </Link>
                </div>

                <div className="space-y-6">
                   {[
                     { title: "Phase 1: Diagnostic & Remedial", steps: ["AI-powered skill gap identification", "Personalised target pathways", "Ready-for-O-Level scaffolding"], color: "bg-brand-primary" },
                     { title: "Phase 2: Systematic Mastery", steps: ["Dual-coding interactive instruction", "80% mastery gate progression", "AI-timed retrieval practice (90 days)"], color: "bg-brand-navy" }
                   ].map((phase, i) => (
                     <div key={i} className="space-y-4">
                       <span className={`inline-block ${phase.color} text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg`}>{phase.title}</span>
                       <ul className="space-y-3">
                         {phase.steps.map((step, j) => (
                           <li key={j} className="flex items-center gap-4 text-sm font-bold text-neutral-muted bg-white p-4 rounded-2xl border border-neutral-border shadow-sm group hover:border-brand-primary transition-all">
                             <CheckCircle2 className="h-5 w-5 text-brand-primary shrink-0 group-hover:scale-110 transition-transform" />
                             {step}
                           </li>
                         ))}
                       </ul>
                     </div>
                   ))}
                </div>
              </div>

              {/* Stat Strip */}
              <div className="mt-24 bg-brand-primary p-12 md:p-16 rounded-[4rem] text-white shadow-3xl relative overflow-hidden text-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
                <div className="grid md:grid-cols-3 gap-12 relative z-10">
                  {[
                    { stat: "5% → 50%+", label: "Learning Retention Transformation", sub: "Passive vs Active Methods" },
                    { stat: "24/7", label: "Cambridge Expert AI Tutor", sub: "Always available, always standard" },
                    { stat: "8 Stages", label: "Research-Backed Architecture", sub: "The sequence is the product" },
                  ].map((item, i) => (
                    <div key={i} className="space-y-3">
                      <p className="text-5xl font-bold text-white tracking-tighter">{item.stat}</p>
                      <p className="text-sm font-bold text-blue-100 uppercase tracking-widest">{item.label}</p>
                      <p className="text-xs text-blue-100/60 font-medium italic">{item.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: DIFFERENTIATORS */}
          <section id="differentiators" className="py-20 md:py-32 bg-neutral-surface px-6 md:px-12 border-y border-neutral-border">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-20">
                 <h2 className="text-4xl md:text-6xl font-bold text-neutral-text mb-8 tracking-tighter leading-[0.95]">
                   What Makes Us <span className="text-brand-primary">Truly Different.</span>
                 </h2>
                 <p className="text-xl text-neutral-muted font-medium max-w-3xl mx-auto">
                   World-class technology meeting research-validated pedagogy.
                 </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {differentiators.map((diff, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group bg-white rounded-[2.5rem] overflow-hidden border border-neutral-border shadow-lg hover:shadow-2xl transition-all"
                  >
                    <div className={`p-8 ${diff.color === 'bg-brand-primary' ? 'bg-brand-primary' : diff.color === 'bg-brand-navy' ? 'bg-brand-navy' : 'bg-neutral-muted'} text-white flex items-center gap-4`}>
                      <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
                        <diff.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold tracking-tight">{diff.title}</h3>
                    </div>
                    <div className="p-8 space-y-6">
                       <p className="text-lg text-neutral-text font-medium leading-relaxed">{diff.desc}</p>
                       <div className="bg-neutral-surface p-6 rounded-2xl border border-neutral-border italic text-sm text-neutral-muted font-medium">
                         "{diff.popup}"
                       </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 5: COMPARISON */}
          <section id="comparison-table" className="py-20 md:py-32 bg-white px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-20">
                <h2 className="text-4xl md:text-6xl font-bold text-neutral-text mb-8 tracking-tighter">
                  An <span className="text-brand-primary">Honest</span> Comparison.
                </h2>
              </div>

              <div className="overflow-x-auto rounded-[3rem] border-4 border-neutral-surface shadow-2xl bg-white mb-10">
                <table className="w-full text-left min-w-[900px]">
                  <thead>
                    <tr className="bg-brand-navy text-white">
                      <th className="p-8 font-bold uppercase tracking-widest text-xs">Feature</th>
                      <th className="p-8 font-bold uppercase tracking-widest text-xs bg-brand-primary text-center">EduMeUp ★</th>
                      <th className="p-8 font-bold uppercase tracking-widest text-xs text-center opacity-70">Tutoring</th>
                      <th className="p-8 font-bold uppercase tracking-widest text-xs text-center opacity-70">EdTech</th>
                      <th className="p-8 font-bold uppercase tracking-widest text-xs text-center opacity-70">Franchise</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-border">
                    {comparisonRows.map((row, i) => (
                      <tr key={i} className="hover:bg-neutral-surface transition-colors group">
                        <td className="p-6 font-bold text-neutral-text text-sm">{row[0]}</td>
                        <td className="p-6 text-center font-black text-2xl text-brand-primary bg-brand-primary/5 group-hover:bg-brand-primary/10 transition-all">{row[1]}</td>
                        <td className="p-6 text-center font-bold text-xl text-neutral-muted/50">{row[2]}</td>
                        <td className="p-6 text-center font-bold text-xl text-neutral-muted/50">{row[3]}</td>
                        <td className="p-6 text-center font-bold text-xl text-neutral-muted/50">{row[4]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-center text-xs font-bold text-neutral-muted uppercase tracking-widest">✔ = Fully Available | ~ = Partial | ✘ = Not Available</p>
            </div>
          </section>

          {/* FINAL CTA */}
          <section id="cta" className="py-24 md:py-40 bg-brand-primary text-white relative overflow-hidden text-center px-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1)_0%,transparent_60%)]" />
            <div className="container-custom relative z-10">
              <h2 className="text-5xl md:text-8xl font-bold mb-12 tracking-tighter leading-[0.9]">
                READY TO <br/><span className="text-brand-sky">EXPERIENCE THE DIFFERENCE?</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                 {[
                   { t: "Explore Courses", d: "Browse our full library of interactive subjects.", l: "/courses", b: "Browse Library" },
                   { t: "Start Diagnostic", d: "Identify your gaps in ~90 mins (Free).", l: "/diagnostics", b: "Start Now", primary: true },
                   { t: "Partner With Us", d: "For schools and institutional growth.", l: "/for-schools", b: "School Portal" }
                 ].map((card, i) => (
                   <div key={i} className={`p-10 rounded-[3rem] border-4 ${card.primary ? 'bg-white text-neutral-text border-brand-sky' : 'bg-white/5 text-white border-white/10'} shadow-2xl flex flex-col items-center justify-between group transform transition-all hover:scale-105`}>
                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold tracking-tight">{card.t}</h3>
                        <p className={`text-sm font-medium ${card.primary ? 'text-neutral-muted' : 'text-blue-100/60'}`}>{card.d}</p>
                      </div>
                      <Link href={card.l} className="w-full mt-10">
                        <Button className={`w-full h-14 rounded-2xl font-bold text-lg ${card.primary ? 'bg-brand-primary text-white hover:bg-brand-primary-dark' : 'bg-white text-brand-primary hover:bg-brand-sky'} shadow-xl transition-all`}>
                          {card.b}
                        </Button>
                      </Link>
                   </div>
                 ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
