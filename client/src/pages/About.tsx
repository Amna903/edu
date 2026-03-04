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
      <section className="pt-28 pb-32 bg-[#1e1b4b] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.2)_0%,transparent_60%)]" />
        <div className="container-custom relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <span className="text-blue-400 font-semibold text-sm">About EduMeUp</span>
            <h1 className="text-5xl md:text-6xl font-bold mb-8 font-display leading-none text-white">
              Transforming Education Through <span className="text-blue-400">Science and Personalization</span>
            </h1>
            <div className="max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-blue-200 mb-4">Our Mission:</h3>
              <p className="text-xl text-blue-100 font-medium leading-relaxed">
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
            <h2 className="text-4xl md:text-5xl font-bold text-[#1e1b4b] mb-6">
              Why Traditional Education Struggles
            </h2>
            <p className="text-xl text-[#1e1b4b]/60 font-bold">The Science of Learning and Forgetting</p>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-[#2366c9] mb-4">Challenge #1: The Forgetting Curve</h3>
                <p className="text-[#1e1b4b]/70 leading-relaxed mb-6">
                  Your brain is naturally wired to forget information rapidly without systematic review.
                </p>
                <div className="bg-blue-50 p-8 rounded-[2rem] border-2 border-blue-100">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm font-semibold">
                      <span className="text-red-500">Without Systematic Review</span>
                      <span className="text-[#2366c9]">With Spaced Retrieval</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold text-[#1e1b4b]/50">
                        <span>Day 1: 100%</span>
                        <span>Day 1: 100%</span>
                      </div>
                      <div className="flex justify-between text-xs font-bold text-[#1e1b4b]/50">
                        <span>Day 2: 58%</span>
                        <span>Day 7: 95%</span>
                      </div>
                      <div className="flex justify-between text-xs font-bold text-[#1e1b4b]/50">
                        <span>Day 30: 10%</span>
                        <span>Day 30: 90%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-[10px] text-[#1e1b4b]/40 font-bold">Research: Ebbinghaus (1885), Cepeda et al. (2006), Roediger & Karpicke (2006)</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-[#2366c9] mb-4">Challenge #2: Passive vs Active Learning</h3>
                <p className="text-[#1e1b4b]/70 leading-relaxed mb-6">
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
                      <div className="w-32 text-xs font-semibold text-[#1e1b4b]/60">{item.label}</div>
                      <div className="flex-1 h-3 bg-blue-50 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${item.type === 'active' ? 'bg-[#2366c9]' : 'bg-red-400 opacity-50'}`}
                          style={{ width: item.value }}
                        ></div>
                      </div>
                      <div className="w-12 text-xs font-semibold text-[#1e1b4b]">{item.value}</div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-[10px] text-[#1e1b4b]/40 font-bold">Source: Dale's Cone of Learning (1969), validated by Freeman et al. (2014)</p>
              </div>
            </div>
          </div>

          <div className="mt-20 p-12 bg-[#1e1b4b] rounded-[3rem] text-white">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <h4 className="text-3xl font-bold text-blue-400 mb-2">91%</h4>
                <p className="text-xs font-semibold text-blue-200">Pass rate</p>
                <p className="text-[10px] text-white/40 mt-2">vs 35% National</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-blue-400 mb-2">47%</h4>
                <p className="text-xs font-semibold text-blue-200">A/A* grades</p>
                <p className="text-[10px] text-white/40 mt-2">vs 18% Traditional</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-blue-400 mb-2">75%+</h4>
                <p className="text-xs font-semibold text-blue-200">Retention</p>
                <p className="text-[10px] text-white/40 mt-2">vs 5-10% Traditional</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= THE 10X LEARNING LEAP MODEL™ ================= */}
      <section className="py-16 md:py-24 bg-blue-50">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1e1b4b] mb-4">
              The 10X Learning Leap Model™
            </h2>
            <p className="text-xl text-blue-700 font-bold">A systematic, research-validated process</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#1e1b4b] px-8">Phase 1: Foundation Building</h3>
              {[
                { step: 1, title: "AI-Powered Comprehensive Diagnostic", desc: "Identifies exact gaps at sub-skill level in 90 minutes", res: "VanLehn, 2011" },
                { step: 2, title: "Personalized Remedial Pathway", desc: "Custom plan targeting only identified weak areas", res: "Bloom, 1984" },
                { step: 3, title: "Foundation Preparation Courses", desc: "Bridge programs build O-Level readiness systematically", res: "Vygotsky, 1978" },
              ].map((item, i) => (
                <Card key={i} className="border border-white rounded-xl shadow-sm hover:shadow-xl transition-all">
                  <CardContent className="p-6">
                    <span className="text-[10px] font-semibold text-[#2366c9]">Step {item.step}</span>
                    <h4 className="text-xl font-bold text-[#1e1b4b] mt-1 mb-2">{item.title}</h4>
                    <p className="text-[#1e1b4b]/70 font-bold mb-4">{item.desc}</p>
                    <p className="text-[10px] text-[#1e1b4b]/30 font-medium">Research: {item.res}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#1e1b4b] px-8">Phase 2: Mastery Building</h3>
              {[
                { step: 4, title: "Dual-Coding Instruction", desc: "Text + visuals + interactives = 2× memory strength", res: "Paivio, 1971; Mayer, 2009" },
                { step: 5, title: "Mastery Progression Gates", desc: "80% mastery required before advancing", res: "Bloom, 1984" },
                { step: 6, title: "Automated Spaced Retrieval", desc: "Reviews at Day 1, 3, 7, 14, 30, 90 defeat forgetting", res: "Roediger & Karpicke, 2006" },
                { step: 7, title: "Application & Transfer", desc: "Past papers + mock exams from Day 1", res: "Bransford et al., 2000" },
                { step: 8, title: "Real-Time Progress Monitoring", desc: "Dashboards for students, parents, teachers", res: "Black & Wiliam, 1998" },
              ].map((item, i) => (
                <Card key={i} className="border border-white rounded-xl shadow-sm hover:shadow-xl transition-all">
                  <CardContent className="p-6">
                    <span className="text-[10px] font-semibold text-[#2366c9]">Step {item.step}</span>
                    <h4 className="text-xl font-bold text-[#1e1b4b] mt-1 mb-2">{item.title}</h4>
                    <p className="text-[#1e1b4b]/70 font-bold mb-4">{item.desc}</p>
                    <p className="text-[10px] text-[#1e1b4b]/30 font-medium">Research: {item.res}</p>
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
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1e1b4b] mb-4">
              Three foundational pillars
            </h2>
            <p className="text-xl text-[#1e1b4b]/40 font-bold">What makes EduMeUp different at the core</p>
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
                className="bg-blue-50 p-12 rounded-[3.5rem] shadow hover:shadow-2xl transition-all text-center border-4 border-white"
              >
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <pillar.icon className="h-10 w-10 text-[#2366c9]" />
                </div>
                <h3 className="text-2xl font-bold text-[#1e1b4b] mb-6">
                  {pillar.title}
                </h3>
                <p className="text-[#1e1b4b]/70 font-bold mb-6 leading-relaxed">{pillar.text}</p>
                <p className="text-[10px] text-[#1e1b4b]/30 font-semibold">{pillar.res}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= RESULTS & VALIDATION ================= */}
      <section className="py-16 md:py-24 bg-blue-50">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1e1b4b] mb-4">
              University-validated results
            </h2>
            <p className="text-xl text-blue-700 font-bold">Proven through rigorous research (2021-2024)</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-semibold text-[#1e1b4b]">Pass rate</span>
                  <span className="text-2xl font-bold text-[#2366c9]">91% vs 35%</span>
                </div>
                <div className="h-4 bg-white rounded-full overflow-hidden border-2 border-white">
                  <div className="h-full bg-[#2366c9] rounded-full" style={{ width: "91%" }}></div>
                </div>
                <p className="text-[10px] font-bold text-[#1e1b4b]/40">↑ 160% improvement over traditional</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-semibold text-[#1e1b4b]">A/A* achievement</span>
                  <span className="text-2xl font-bold text-[#2366c9]">47% vs 18%</span>
                </div>
                <div className="h-4 bg-white rounded-full overflow-hidden border-2 border-white">
                  <div className="h-full bg-[#2366c9] rounded-full" style={{ width: "47%" }}></div>
                </div>
                <p className="text-[10px] font-bold text-[#1e1b4b]/40">↑ 161% improvement over traditional</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-semibold text-[#1e1b4b]">Long-term retention</span>
                  <span className="text-2xl font-bold text-[#2366c9]">75% vs 10%</span>
                </div>
                <div className="h-4 bg-white rounded-full overflow-hidden border-2 border-white">
                  <div className="h-full bg-[#2366c9] rounded-full" style={{ width: "75%" }}></div>
                </div>
                <p className="text-[10px] font-bold text-[#1e1b4b]/40">↑ 7.5× better retention after 6 months</p>
              </div>
            </div>

            <div className="bg-[#1e1b4b] p-12 rounded-[3.5rem] text-white shadow-2xl border-4 border-white/10">
              <h3 className="text-3xl font-bold mb-4 text-white">Research partnership</h3>
              <div className="space-y-6 text-blue-100/70 font-medium">
                <p><span className="text-blue-400 font-black">Institution:</span> University of Education Lahore</p>
                <p><span className="text-blue-400 font-black">Duration:</span> 3 years (2021-2024)</p>
                <p><span className="text-blue-400 font-black">Sample:</span> 611 O-Level students across 6 schools</p>
                <p><span className="text-blue-400 font-black">Study Type:</span> Longitudinal with control group</p>
                <p className="pt-4 border-t border-white/10 text-white font-semibold text-sm">Status: peer-reviewed and published</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= COMPLETE ECOSYSTEM ================= */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1e1b4b] mb-4">
              Supporting every stakeholder
            </h2>
            <p className="text-xl text-[#1e1b4b]/40 font-bold">Education requires all parts working together</p>
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
                <h3 className="text-xl font-bold text-[#1e1b4b] mb-6">{box.title}</h3>
                <ul className="space-y-4 mb-8">
                  {box.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm font-bold text-[#1e1b4b]/60">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="pt-6 border-t border-blue-100">
                  <p className="text-[10px] font-medium text-[#2366c9]">Result: {box.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= RESEARCH FOUNDATION ================= */}
      <section className="py-16 md:py-24 bg-[#1e1b4b] text-white">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight">
              Built on 40+ Years of Science
            </h2>
            <p className="text-xl text-blue-400 font-bold uppercase tracking-wide">Not Marketing Hype — Peer-Reviewed Facts</p>
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
              <div key={i} className="p-10 bg-white/5 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-blue-400 font-black text-xs">{res.year}</span>
                  <span className="text-white/40 font-black text-[10px] uppercase">{res.author}</span>
                </div>
                <h4 className="text-lg font-black uppercase mb-3 text-white">{res.topic}</h4>
                <p className="text-white/60 text-sm font-medium mb-6 leading-relaxed">{res.desc}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 border-t border-white/10 pt-4">Applied: {res.apply}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= OUR STORY ================= */}
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="container-custom max-w-4xl">
          <div className="space-y-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-[#1e1b4b] mb-4 uppercase tracking-tight">
                How EduMeUp Was Born
              </h2>
              <p className="text-xl text-blue-600 font-bold uppercase tracking-wide">From Frustration to Mission</p>
            </div>

            <div className="prose prose-lg max-w-none text-[#1e1b4b]/80 font-medium leading-relaxed space-y-8">
              <p>
                As an educator in Pakistan for 15+ years, our founder witnessed a heartbreaking pattern: bright students struggling in O-Level not from lack of ability, but from a broken system of passive instruction and rapid forgetting.
              </p>
              <div className="bg-blue-50 p-12 rounded-[3rem] border-l-8 border-[#2366c9] my-12">
                <p className="text-2xl font-black text-[#1e1b4b] uppercase tracking-tight mb-4 italic">"The question was simple: If cognitive science has proven what works for decades, why aren't these methods standard?"</p>
                <p className="text-sm font-bold uppercase text-[#2366c9]">— Muhammad Benyameen, Founder</p>
              </div>
              <p>
                In 2021, EduMeUp was founded to bridge this gap. We didn't build technology for technology's sake—we built a system where every feature is grounded in research and every outcome is measured rigorously.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 pt-12">
              <div className="bg-blue-50 p-10 rounded-[2.5rem]">
                <h4 className="text-3xl font-black text-[#1e1b4b] mb-2">2,000+</h4>
                <p className="text-xs font-black uppercase text-blue-600 tracking-widest">Students Globally</p>
              </div>
              <div className="bg-blue-50 p-10 rounded-[2.5rem]">
                <h4 className="text-3xl font-black text-[#1e1b4b] mb-2">25+</h4>
                <p className="text-xs font-black uppercase text-blue-600 tracking-widest">Countries Reached</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHO THIS IS FOR ================= */}
      <section className="py-16 md:py-24 bg-blue-50">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-[#1e1b4b] mb-4 uppercase tracking-tight">
              Is EduMeUp Right For You?
            </h2>
            <p className="text-xl text-[#1e1b4b]/40 font-bold uppercase tracking-wide">An Honest Assessment of Fit</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-12 rounded-[3.5rem] border-4 border-white shadow-xl">
              <h3 className="text-2xl font-black text-green-600 mb-8 uppercase flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-lg">✓</div>
                Ideal For
              </h3>
              <div className="space-y-10">
                <div>
                  <h4 className="text-xs font-black uppercase text-[#1e1b4b]/40 mb-4 tracking-widest">Students Who</h4>
                  <ul className="space-y-4">
                    {["Are serious about O-Level prep", "Want to reduce tutor dependency", "Struggle with retention", "Have foundation gaps"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-bold text-[#1e1b4b]">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase text-[#1e1b4b]/40 mb-4 tracking-widest">Parents Who</h4>
                  <ul className="space-y-4">
                    {["Value research-backed approaches", "Want real-time visibility", "Seek cost-effective alternatives"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-bold text-[#1e1b4b]">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-12 rounded-[3.5rem] border-4 border-white shadow-xl opacity-80">
              <h3 className="text-2xl font-black text-red-500 mb-8 uppercase flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-lg">×</div>
                Not For
              </h3>
              <div className="space-y-10">
                <div>
                  <h4 className="text-xs font-black uppercase text-[#1e1b4b]/40 mb-4 tracking-widest">Students Who</h4>
                  <ul className="space-y-4">
                    {["Expect instant results without effort", "Won't commit min 3 hours/week", "Want shortcuts to success"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-bold text-[#1e1b4b]/60">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase text-[#1e1b4b]/40 mb-4 tracking-widest">Schools That</h4>
                  <ul className="space-y-4">
                    {["Won't implement systematically", "Expect tech to replace teachers", "Avoid data-driven decisions"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-bold text-[#1e1b4b]/60">
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
          <div className="bg-[#1e1b4b] p-16 rounded-[4rem] text-white">
            <h2 className="text-3xl font-black mb-12 uppercase tracking-tighter text-white ">Transparency Builds Trust</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h4 className="text-blue-400 font-black uppercase text-sm tracking-widest">What We Are</h4>
                <ul className="space-y-3">
                  {["Systematic & research-validated", "Stakeholder support system", "Data-proven results", "Cost-effective"].map((item, i) => (
                    <li key={i} className="text-sm font-bold text-white/80 flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full bg-blue-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                <h4 className="text-red-400 font-black uppercase text-sm tracking-widest">What We Are Not</h4>
                <ul className="space-y-3">
                  {["Not a teacher replacement", "Not an instant miracle", "Not a shortcut provider", "Not yet for every curriculum"].map((item, i) => (
                    <li key={i} className="text-sm font-bold text-white/60 flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full bg-red-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-12 pt-8 border-t border-white/10 text-center text-white/40 text-xs font-bold uppercase tracking-[0.2em]">
              We believe in radical honesty: transparency over overpromising.
            </p>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-16 md:py-24 bg-[#1e1b4b] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.2)_0%,transparent_70%)] pointer-events-none"></div>
        <div className="container-custom relative z-10 max-w-4xl">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Ready to transform <span className="text-blue-400">learning?</span>
          </h2>
          <p className="text-lg text-blue-200 mb-8 font-semibold">
            Experience the science of success
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
           <Button size="lg" className="bg-[#2366c9] hover:bg-blue-500 text-white font-bold h-28 px-20 rounded-3xl text-2xl shadow-2xl active:scale-95 transition-all border-b-[10px] border-blue-800">
                  Start free diagnostic
            </Button>
   <Button size="lg" variant="outline" className="h-28 px-20 border-4 border-white/10 bg-white/5 hover:bg-white/10 rounded-3xl text-2xl font-bold shadow-lg">
             Talk to expert
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
