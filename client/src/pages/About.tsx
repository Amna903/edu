import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import {
  Brain,
  BarChart3,
  GraduationCap,
  ArrowRight
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <Layout>
      {/* ================= HERO - THE MISSION ================= */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-blue-50/80 to-white">
        <div className="container-custom relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
        
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-8 font-display leading-tight text-slate-900">
              Transforming Education Through <span className="text-[#2366c9]">Science and Personalization</span>
            </h1>
            <div className="max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-[#2366c9] mb-4">Our Mission:</h3>
              <p className="text-xl text-slate-700 font-medium leading-relaxed">
                End the global learning crisis by replacing passive instruction and rapid forgetting with research-validated active learning and systematic retention strategies.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= THE LEARNING PROBLEM ================= */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 mb-6">
              Why Traditional Education Struggles
            </h2>
            <p className="text-xl text-slate-900/60 font-medium">The Science of Learning and Forgetting</p>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-[#2366c9] mb-4">Challenge #1: The Forgetting Curve</h3>
                <p className="text-slate-900/70 leading-relaxed mb-6">
                  Your brain is naturally wired to forget information rapidly without systematic review.
                </p>
                <div className="bg-blue-50 p-8 rounded-[2rem] border-2 border-blue-100">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-[14px] font-semibold">
                      <span className="text-red-500">Without Systematic Review</span>
                      <span className="text-[#2366c9]">With Spaced Retrieval</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium text-slate-900/50">
                        <span>Day 1: 100%</span>
                        <span>Day 1: 100%</span>
                      </div>
                      <div className="flex justify-between text-xs font-medium text-slate-900/50">
                        <span>Day 2: 58%</span>
                        <span>Day 7: 95%</span>
                      </div>
                      <div className="flex justify-between text-xs font-medium text-slate-900/50">
                        <span>Day 30: 10%</span>
                        <span>Day 30: 90%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-[14px] text-slate-900/40 font-medium">Research: Ebbinghaus (1885), Cepeda et al. (2006), Roediger & Karpicke (2006)</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-[#2366c9] mb-4">Challenge #2: Passive vs Active Learning</h3>
                <p className="text-slate-900/70 leading-relaxed mb-6">
                  Research shows dramatic differences in retention based on learning method.
                </p>
                <div className="space-y-4">
                  {[
                    { label: "Lectures", value: "5%", type: "passive" },
                    { label: "Reading Textbooks", value: "10%", type: "passive" },
                    { label: "Watching Videos", value: "20%", type: "passive" },
                    { label: "Practice by Doing", value: "75%", type: "active" },
                    { label: "Teaching Others", value: "90%", type: "active" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-32 text-xs font-semibold text-slate-900/60">{item.label}</div>
                      <div className="flex-1 h-3 bg-blue-50 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${item.type === 'active' ? 'bg-[#2366c9]' : 'bg-red-400 opacity-50'}`}
                          style={{ width: item.value }}
                        ></div>
                      </div>
                      <div className="w-12 text-xs font-semibold text-slate-900">{item.value}</div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-[14px] text-slate-900/40 font-medium">Source: Dale's Cone of Learning (1969), validated by Freeman et al. (2014)</p>
              </div>
            </div>
          </div>

          <div className="mt-20 p-12 bg-[#2366c9] rounded-[3rem] text-white">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <h4 className="text-3xl font-semibold text-blue-400 mb-2">91%</h4>
                <p className="text-xs font-semibold text-blue-200">Pass rate</p>
                <p className="text-[14px] text-slate-300 mt-2">vs 35% National</p>
              </div>
              <div>
                <h4 className="text-3xl font-semibold text-blue-400 mb-2">47%</h4>
                <p className="text-xs font-semibold text-blue-200">A/A* grades</p>
                <p className="text-[14px] text-slate-300 mt-2">vs 18% Traditional</p>
              </div>
              <div>
                <h4 className="text-3xl font-semibold text-blue-400 mb-2">75%+</h4>
                <p className="text-xs font-semibold text-blue-200">Retention</p>
                <p className="text-[14px] text-slate-300 mt-2">vs 5-10% Traditional</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= THE 10X LEARNING LEAP MODEL™ ================= */}
      <section className="py-16 md:py-24 bg-blue-50">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-10 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 mb-4">
              The 10X Learning Leap Model™
            </h2>
            <p className="text-xl text-blue-700 font-medium">A systematic, research-validated process</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-slate-900 px-8">Phase 1: Foundation Building</h3>
              {[
                { step: 1, title: "AI-Powered Comprehensive Diagnostic", desc: "Identifies exact gaps at sub-skill level in 90 minutes", res: "VanLehn, 2011" },
                { step: 2, title: "Personalized Remedial Pathway", desc: "Custom plan targeting only identified weak areas", res: "Bloom, 1984" },
                { step: 3, title: "Foundation Preparation Courses", desc: "Foundational O-Level Bridge Courses build O-Level readiness systematically", res: "Vygotsky, 1978" },
              ].map((item, i) => (
                <Card key={i} className="border border-white rounded-xl shadow-sm hover:shadow-xl transition-all">
                  <CardContent className="p-6">
                    <span className="text-[14px] font-semibold text-[#2366c9]">Step {item.step}</span>
                    <h4 className="text-xl font-semibold text-slate-900 mt-1 mb-2">{item.title}</h4>
                    <p className="text-slate-900/70 font-medium mb-4">{item.desc}</p>
                    <p className="text-[14px] text-slate-900/30 font-medium">Research: {item.res}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-slate-900 px-8">Phase 2: Mastery Building</h3>
              {[
                { step: 4, title: "Dual-Coding Instruction", desc: "Text + visuals + interactives = 2× memory strength", res: "Paivio, 1971; Mayer, 2009" },
                { step: 5, title: "Mastery Progression Gates", desc: "80% mastery required before advancing", res: "Bloom, 1984" },
                { step: 6, title: "Automated Spaced Retrieval", desc: "Reviews at Day 1, 3, 7, 14, 30, 90 defeat forgetting", res: "Roediger & Karpicke, 2006" },
                { step: 7, title: "Application & Transfer", desc: "Past papers + mock exams from Day 1", res: "Bransford et al., 2000" },
                { step: 8, title: "Real-Time Progress Monitoring", desc: "Dashboards for students, parents, teachers", res: "Black & Wiliam, 1998" },
              ].map((item, i) => (
                <Card key={i} className="border border-white rounded-xl shadow-sm hover:shadow-xl transition-all">
                  <CardContent className="p-6">
                    <span className="text-[14px] font-semibold text-[#2366c9]">Step {item.step}</span>
                    <h4 className="text-xl font-semibold text-slate-900 mt-1 mb-2">{item.title}</h4>
                    <p className="text-slate-900/70 font-medium mb-4">{item.desc}</p>
                    <p className="text-[14px] text-slate-900/30 font-medium">Research: {item.res}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= THREE PILLARS ================= */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-10 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 mb-4">
              Three foundational pillars
            </h2>
            <p className="text-xl text-slate-900/40 font-medium">What makes EduMeUp different at the core</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: Brain,
                title: "True Personalization",
                text: "AI Diagnostics identify exact gaps at sub-skill level, creating unique custom pathways for each student.",
                res: "Bloom's 2 Sigma Problem (1984)"
              },
              {
                icon: BarChart3,
                title: "Systematic Retention",
                text: "Automated Spaced Retrieval scheduled at scientifically optimal intervals (Day 1, 3, 7, 14, 30, 90).",
                res: "Roediger & Karpicke (2006)"
              },
              {
                icon: GraduationCap,
                title: "Future-Ready Mastery",
                text: "Platform design develops WEF Top 10 Skills: Problem-solving, critical thinking, and creativity.",
                res: "Transfer of Learning (Bransford, 2000)"
              },
            ].map((pillar, i) => (
              <div
                key={i}
                className="bg-blue-50 p-6 sm:p-10 md:p-12 rounded-[2rem] md:rounded-[3.5rem] shadow hover:shadow-2xl transition-all text-center border-4 border-white"
              >
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <pillar.icon className="h-10 w-10 text-[#2366c9]" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-6">
                  {pillar.title}
                </h3>
                <p className="text-slate-900/70 font-medium mb-6 leading-relaxed">{pillar.text}</p>
                <p className="text-[14px] text-slate-900/30 font-semibold">{pillar.res}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= RESULTS & VALIDATION ================= */}
      <section className="py-16 md:py-24 bg-blue-50">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-10 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 mb-4">
              University-validated results
            </h2>
            <p className="text-xl text-blue-700 font-medium">Proven through rigorous research (2021-2024)</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-[14px] font-semibold text-slate-900">Pass rate</span>
                  <span className="text-2xl font-semibold text-[#2366c9]">91% vs 35%</span>
                </div>
                <div className="h-4 bg-white rounded-full overflow-hidden border-2 border-white">
                  <div className="h-full bg-[#2366c9] rounded-full" style={{ width: "91%" }}></div>
                </div>
                <p className="text-[14px] font-medium text-slate-900/40">↑ 160% improvement over traditional</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-[14px] font-semibold text-slate-900">A/A* achievement</span>
                  <span className="text-2xl font-semibold text-[#2366c9]">47% vs 18%</span>
                </div>
                <div className="h-4 bg-white rounded-full overflow-hidden border-2 border-white">
                  <div className="h-full bg-[#2366c9] rounded-full" style={{ width: "47%" }}></div>
                </div>
                <p className="text-[14px] font-medium text-slate-900/40">↑ 161% improvement over traditional</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-[14px] font-semibold text-slate-900">Long-term retention</span>
                  <span className="text-2xl font-semibold text-[#2366c9]">75% vs 10%</span>
                </div>
                <div className="h-4 bg-white rounded-full overflow-hidden border-2 border-white">
                  <div className="h-full bg-[#2366c9] rounded-full" style={{ width: "75%" }}></div>
                </div>
                <p className="text-[14px] font-medium text-slate-900/40">↑ 7.5× better retention after 6 months</p>
              </div>
            </div>

         <div className="bg-[#2366c9] p-12 rounded-[3.5rem] text-white shadow-2xl border-4 border-white/10 relative overflow-hidden">
  {/* Subltle academic watermark/icon in background */}
  <div className="absolute top-0 right-0 p-8 opacity-10">
    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  </div>

  <h3 className="text-3xl font-semibold mb-8 text-white tracking-tight">Research Partnership</h3>
  
  <div className="space-y-6 relative z-10">
    {/* Institution */}
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-white/5 pb-4">
      <span className="text-blue-400 text-xs font-black uppercase tracking-widest mb-1 sm:mb-0">Institution</span>
      <p className="text-white text-lg ">University of Education Lahore</p>
    </div>

    {/* Duration */}
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-white/5 pb-4">
      <span className="text-blue-400 text-xs font-black uppercase tracking-widest mb-1 sm:mb-0">Duration</span>
      <p className="text-white text-lg ">3 Years (2021–2024)</p>
    </div>

    {/* Sample */}
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-white/5 pb-4">
      <span className="text-blue-400 text-xs font-black uppercase tracking-widest mb-1 sm:mb-0">Sample Size</span>
      <p className="text-white text-lg ">611 O-Level Students</p>
    </div>

    {/* Study Type */}
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-white/5 pb-4">
      <span className="text-blue-400 text-xs font-black uppercase tracking-widest mb-1 sm:mb-0">Study Type</span>
      <p className="text-white text-lg ">Longitudinal Control Group</p>
    </div>

    {/* Status Tag */}
    <div className="pt-4 flex items-center gap-3">
      <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
      <p className="text-white/90 font-medium text-[14px] tracking-wide">
        Status: Peer-reviewed and published
      </p>
    </div>
  </div>
</div>
          </div>
        </div>
      </section>

      {/* ================= COMPLETE ECOSYSTEM ================= */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-4">
              Supporting every stakeholder
            </h2>
            <p className="text-xl text-slate-900/40 font-medium">Education requires all parts working together</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Students",
                items: ["Personalized paths", "1000+ H5P activities", "24/7 AI support", "Anti-forgetting system"],
                result: "Confusion → Mastery"
              },
              {
                title: "Teachers",
                items: ["5-6 hours/week saved", "AI teaching insights", "Ready-made library", "Professional training"],
                result: "Overworked → Empowered"
              },
              {
                title: "Parents",
                items: ["Real-time dashboard", "Weekly reports", "Proactive alerts", "85-90% cost savings"],
                result: "Anxiety → Confidence"
              },
              {
                title: "Schools",
                items: ["Real-time analytics", "Predictive interventions", "Automated reporting", "Complete curriculum"],
                result: "Guesswork → Excellence"
              }
            ].map((box, i) => (
              <div key={i} className="bg-blue-50 p-6 rounded-xl border border-white hover:border-blue-100 transition-all">
                <h3 className="text-xl font-semibold text-slate-900 mb-6">{box.title}</h3>
                <ul className="space-y-4 mb-8">
                  {box.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-[14px] font-medium text-slate-900/60">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="pt-6 border-t border-blue-100">
                  <p className="text-[14px] font-medium text-[#2366c9]">Result: {box.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= RESEARCH FOUNDATION ================= */}
<section className="py-16 md:py-24 bg-[#2366c9] text-white">
  <div className="container-custom max-w-6xl">
    <div className="text-center mb-10 md:mb-20">
      <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4 ">
        Built on 40+ Years of Science
      </h2>
      <p className="text-xl text-blue-300 uppercase tracking-wide">
        Not Marketing Hype — Peer-Reviewed Facts
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
      {[
        { year: "1969", author: "Dale", topic: "Cone of Learning", desc: "Active learning (75% retention) vs passive (5%).", apply: "1000+ interactive activities" },
        { year: "1971", author: "Paivio", topic: "Dual Coding", desc: "Words + pictures = 2× memory strength.", apply: "Visual-first platform design" },
        { year: "1984", author: "Bloom", topic: "Mastery Learning", desc: "One-to-one tutoring effect size d=2.0.", apply: "AI personalization + mastery gates" },
        { year: "1998", author: "Black & Wiliam", topic: "Formative Assessment", desc: "Ongoing feedback improves learning 0.4-0.7σ.", apply: "Real-time stakeholder dashboards" },
        { year: "2006", author: "Roediger & Karpicke", topic: "Retrieval Practice", desc: "Testing improves retention 50-200% vs re-reading.", apply: "Automated spaced retrieval system" },
        { year: "2014", author: "Freeman et al.", topic: "Active Learning", desc: "Active learning: 6% higher scores, 55% fewer failures.", apply: "Practice-by-doing methodology" }
      ].map((res, i) => (
        <div
          key={i}
          className="p-10 bg-white/10 backdrop-blur-md rounded-[2.5rem] border border-white/20 hover:bg-white/20 transition-all shadow-lg"
        >
          {/* TOP ROW */}
          <div className="flex justify-between items-start mb-4">
            <span className="text-blue-300 font-black text-xs">
              {res.year}
            </span>
            <span className="text-white/70 font-bold text-[14px] uppercase">
              {res.author}
            </span>
          </div>

          {/* TITLE */}
          <h4 className="text-lg font-black uppercase mb-3 text-white">
            {res.topic}
          </h4>

          {/* DESCRIPTION */}
          <p className="text-white/90 text-[14px] font-medium mb-6 leading-relaxed">
            {res.desc}
          </p>

          {/* APPLY */}
          <p className="text-[14px] font-black uppercase tracking-widest text-blue-300 border-t border-white/20 pt-4">
            Applied: {res.apply}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* ================= OUR STORY ================= */}
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="container-custom max-w-4xl">
          <div className="space-y-12">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-4xl md:text-5xl font-semibold font-black text-slate-900 mb-4  ">
                How EduMeUp Was Born
              </h2>
              <p className="text-xl text-blue-600 font-semibold uppercase tracking-wide">From Frustration to Mission</p>
            </div>

            <div className="prose prose-lg max-w-none text-slate-900/80 font-medium leading-relaxed space-y-8">
              <p>
                As an educator in Pakistan for 15+ years, our founder witnessed a heartbreaking pattern: bright students struggling in O-Level not from lack of ability, but from a broken system of passive instruction and rapid forgetting.
              </p>
              <div className="bg-blue-50 p-6 sm:p-10 md:p-12 rounded-[2rem] sm:rounded-[3rem] border-l-4 sm:border-l-8 border-[#2366c9] my-8 md:my-12">
                <p className="text-base sm:text-lg md:text-2xl text-slate-900 uppercase tracking-tight mb-4 italic">"The question was simple: If cognitive science has proven what works for decades, why aren't these methods standard?"</p>
                <p className="text-[14px] font-semibold uppercase text-[#2366c9]">— Muhammad Benyameen, Founder</p>
              </div>
              <p>
                In 2021, EduMeUp was founded to bridge this gap. We didn't build technology for technology's sake—we built a system where every feature is grounded in research and every outcome is measured rigorously.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 pt-12">
              <div className="bg-blue-50 p-10 rounded-[2.5rem]">
                <h4 className="text-3xl  text-slate-900 mb-2">2,000+</h4>
                <p className="text-xs font-black uppercase text-blue-600 tracking-widest">Students Globally</p>
              </div>
              <div className="bg-blue-50 p-10 rounded-[2.5rem]">
                <h4 className="text-3xl  text-slate-900 mb-2">25+</h4>
                <p className="text-xs font-black uppercase text-blue-600 tracking-widest">Countries Reached</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHO THIS IS FOR ================= */}
      <section className="py-16 md:py-24 bg-blue-50">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-10 md:mb-20">
        <h2 className="text-4xl md:text-5xl font-semibold font-black text-slate-900 mb-4  ">
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
                      <li key={i} className="flex items-center gap-3 text-[14px] font-medium text-slate-900">
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
                      <li key={i} className="flex items-center gap-3 text-[14px] font-medium text-slate-900">
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
                      <li key={i} className="flex items-center gap-3 text-[14px] font-medium text-slate-900/60">
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
                      <li key={i} className="flex items-center gap-3 text-[14px] font-medium text-slate-900/60">
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
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom max-w-4xl">
          <div className="bg-[#2366c9] p-6 sm:p-10 md:p-16 rounded-[2rem] sm:rounded-[3rem] md:rounded-[4rem] text-white">
          <h2 className="text-4xl md:text-5xl font-semibold text-white   mb-4  ">
             Transparency Builds Trust</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h4 className="text-blue-400 font-black uppercase text-[14px] tracking-widest">What We Are</h4>
                <ul className="space-y-3">
                  {["Systematic & research-validated", "Stakeholder support system", "Data-proven results", "Cost-effective"].map((item, i) => (
                    <li key={i} className="text-[14px] font-medium text-white/80 flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full bg-blue-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                <h4 className="text-red-400 font-black uppercase text-[14px] tracking-widest">What We Are Not</h4>
                <ul className="space-y-3">
                  {["Not a teacher replacement", "Not an instant miracle", "Not a shortcut provider", "Not yet for every curriculum"].map((item, i) => (
                    <li key={i} className="text-[14px] font-medium text-white/60 flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full bg-red-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-12 pt-8 border-t border-white/10 text-center text-slate-300 text-xs font-medium   tracking-[0.2em]">
              We believe in radical honesty: transparency over overpromising
            </p>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-20 md:py-32 bg-[#2366c9] text-white relative overflow-hidden">
        <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-blue-600 opacity-30 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-blue-600 opacity-30 blur-3xl" aria-hidden="true" />
        <div className="container-custom text-center relative z-10">
          <div className="flex justify-center w-full mb-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-white font-semibold leading-[1.05] mb-3 text-center tracking-tight px-4">
              Ready to transform learning?
            </h2>
          </div>
          <p className="text-base text-blue-200 mb-12 max-w-3xl mx-auto">
            Experience the science of success
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6 max-w-5xl mx-auto">
            <Button size="lg" className="w-full md:w-auto min-w-[260px] bg-white text-[#2366c9] hover:bg-blue-50 font-semibold py-3 px-6 rounded-xl text-[14px] shadow-md flex items-center justify-center gap-2">
              Start Free Diagnostic <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="w-full md:w-auto min-w-[260px] border border-white/30 text-white hover:bg-white/10 font-semibold py-3 px-6 rounded-xl text-[14px] shadow-md flex items-center justify-center gap-2">
              Talk to Expert <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
