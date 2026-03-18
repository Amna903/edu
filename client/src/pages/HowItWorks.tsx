import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Brain, 
  Target, 
  Zap, 
  Layers, 
  Search, 
  UserCheck, 
  BarChart3, 
  RefreshCw, 
  Monitor,
  Video,
  BookOpen,
  Image as ImageIcon,
  CheckCircle2
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      title: "1. DIAGNOSTIC ASSESSMENT",
      desc: "Identify exact gaps before starting",
      icon: Search,
      status: "Coming June 2026",
      phase: "Phase 1: Foundation Building"
    },
    {
      title: "2. PERSONALIZED PATHS",
      desc: "Teacher-guided pathways tailored to each student",
      icon: UserCheck,
      status: "Available Now",
      phase: "Phase 1: Foundation Building"
    },
    {
      title: "3. ACTIVE LEARNING ENGINE",
      desc: "1000+ interactive activities - practice by doing",
      icon: Zap,
      status: "Available Now",
      phase: "Phase 1: Foundation Building"
    },
    {
      title: "4. DUAL CODING",
      desc: "Every concept taught with text + visuals",
      icon: ImageIcon,
      status: "Available Now",
      phase: "Phase 2: Mastery Building"
    },
    {
      title: "5. RETRIEVAL PRACTICE",
      desc: "Frequent low-stakes quizzes strengthen memory",
      icon: Target,
      status: "Available Now",
      phase: "Phase 2: Mastery Building"
    },
    {
      title: "6. SPACED REPETITION",
      desc: "Automated reviews at optimal intervals",
      icon: RefreshCw,
      status: "Coming September 2026",
      phase: "Phase 2: Mastery Building"
    },
    {
      title: "7. INTERLEAVED PRACTICE",
      desc: "Mix topics for deeper learning (not blocked)",
      icon: Layers,
      status: "Available Now",
      phase: "Phase 2: Mastery Building"
    },
    {
      title: "8. MASTERY VERIFICATION",
      desc: "Track true understanding through dashboards",
      icon: BarChart3,
      status: "Available Now",
      phase: "Phase 2: Mastery Building"
    }
  ];

  return (
    <Layout>
      {/* HERO */}
      <section className="pt-24 pb-32 bg-[#1e1b4b] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.2)_0%,transparent_50%)]"></div>
        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-semibold mb-8 font-display leading-tight text-white"
            >
              How <span className="text-blue-400">EduMeUp</span> works
            </motion.h1>
            <p className="text-2xl md:text-3xl text-blue-100 font-semibold mb-10">A research-backed learning system that actually works</p>
            <p className="text-lg text-blue-200/80 max-w-2xl mx-auto font-medium">Not just another online course platform. A complete learning ecosystem designed to replace passive study with active mastery.</p>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-32 bg-white">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-semibold text-center mb-16 text-[#1e1b4b] leading-tight">Traditional vs EduMeUp</h2>
            <div className="bg-blue-50 rounded-[3rem] p-1 border-4 border-blue-100 overflow-hidden shadow-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#1e1b4b] text-white">
                    <th className="p-8 text-xl font-semibold">Traditional methods</th>
                    <th className="p-8 text-xl font-semibold text-blue-400">EduMeUp system</th> 
                  </tr>
                </thead>
                <tbody className="divide-y-4 divide-blue-100">
                  {[
                    { trad: "Passive learning (lectures, videos)", edu: "Active learning (practice by doing) ✓" },
                    { trad: "5-10% retention (forget within days)", edu: "60-75% retention (lasting memory) ✓" },
                    { trad: "One-size-fits-all", edu: "Teacher-guided personalization ✓" },
                    { trad: "No accountability", edu: "Multi-stakeholder dashboards ✓" },
                    { trad: "Forget 95% in 30 days", edu: "Maintain 70-80% long-term ✓" },
                  ].map((row, i) => (
                    <tr key={i} className="group hover:bg-white transition-colors">
                      <td className="p-8 text-[#1e1b4b]/50 font-medium uppercase text-[14px] line-through decoration-red-400 decoration-2">{row.trad}</td>
                      <td className="p-8 text-[#1e1b4b] font-semibold text-lg">{row.edu}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-8 text-center text-[14px] text-[#1e1b4b]/40 font-medium uppercase tracking-widest">
              Research: Active learning reduces failure rates by 55% in STEM subjects (Freeman et al., 2014)
            </p>
          </div>
        </div>
      </section>

      {/* THE FORGETTING CURVE */}
      <section className="py-32 bg-blue-50 relative overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-semibold mb-8 text-[#1e1b4b] leading-tight">The science <span className="text-[#2366c9]">behind forgetting</span></h2>
              <div className="space-y-12">
                <div>
                  <h3 className="text-xl font-semibold text-[#1e1b4b] mb-4">The forgetting curve (Ebbinghaus, 1885)</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-32 text-xs font-semibold text-[#1e1b4b]/40">Traditional</div>
                      <div className="flex-1 h-2 bg-blue-200 rounded-full">
                        <motion.div 
                          initial={{ width: "100%" }}
                          whileInView={{ width: "5%" }}
                          transition={{ duration: 2 }}
                          className="h-full bg-red-400 rounded-full"
                        ></motion.div>
                      </div>
                      <div className="w-12 text-xs font-semibold text-red-500">5%</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32 text-xs font-semibold text-[#2366c9]">EduMeUp</div>
                      <div className="flex-1 h-2 bg-blue-200 rounded-full">
                        <motion.div 
                          initial={{ width: "100%" }}
                          whileInView={{ width: "80%" }}
                          transition={{ duration: 2 }}
                          className="h-full bg-[#2366c9] rounded-full"
                        ></motion.div>
                      </div>
                      <div className="w-12 text-xs font-semibold text-[#2366c9]">80%</div>
                    </div>
                  </div>
                  <p className="mt-4 text-[#1e1b4b]/60 font-medium">Without active review, students forget 70% of new information within 24 hours.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#1e1b4b] mb-4">The passive learning trap</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-6 rounded-3xl border-2 border-blue-100">
                      <p className="text-[14px] font-semibold text-red-400 mb-2">Passive (low retention)</p>
                      <ul className="space-y-2 text-xs font-medium text-[#1e1b4b]/70">
                        <li>Reading Textbooks: 10%</li>
                        <li>Watching Videos: 20%</li>
                      </ul>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border-2 border-blue-600 shadow-xl">
                      <p className="text-[14px] font-semibold text-blue-600 mb-2">Active (high retention)</p>
                      <ul className="space-y-2 text-xs font-medium text-[#1e1b4b]">
                        <li>Practice by Doing: 75%</li>
                        <li>Teaching Others: 90%</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#1e1b4b] p-16 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-[#2366c9]/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
               <h3 className="text-3xl text-white font-semibold mb-8">10X learning leap model™</h3>
               <p className="text-xl text-blue-200 font-medium mb-12 uppercase tracking-wide leading-relaxed">Not magic. Science applied consistently. Every student completes all 8 steps.</p>
               <Button className="w-full h-20 bg-[#2366c9] hover:bg-blue-600 rounded-2xl text-xl font-semibold shadow-xl">
                 View Full Research
               </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 8 STRATEGIES GRID */}
      <section className="py-32 bg-white">
        <div className="container-custom">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-[#1e1b4b]">The 8 strategies</h2>
            <p className="text-xl text-blue-600 font-semibold">Phase 1 & phase 2 integration</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <Card className="border-[#2366c9]  border-2 h-full border-4 border-blue-50 rounded-[3rem] hover:border-[#2366c9] transition-all hover:shadow-2xl bg-white overflow-hidden">
                  <CardContent className="p-10 flex flex-col h-full">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#2366c9] group-hover:rotate-12 transition-all duration-500">
                      <s.icon className="h-8 w-8 text-[#2366c9] group-hover:text-white" />
                    </div>
                    <span className="text-[14px] font-semibold text-[#2366c9] mb-2">{s.phase}</span>
                    <h3 className="text-xl font-semibold text-[#1e1b4b] mb-4 leading-tight">{s.title}</h3>
                    <p className="text-[#1e1b4b]/60 font-medium mb-8 flex-1">{s.desc}</p>
                    <div className={`px-4 py-2 rounded-full text-[14px] font-semibold text-center ${s.status.includes('Now') ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                      {s.status}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STAKEHOLDER JOURNEYS */}
      <section className="py-32 bg-blue-50">
        <div className="container-custom">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-[#1e1b4b]">Real success stories</h2>
            <p className="text-xl text-[#1e1b4b]/40 font-medium uppercase tracking-widest">Experience the 10X Learning Leap Model™ in Action</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {[
              {
                name: "Ahmed (Student)",
                role: "O-Level Physics Student",
                story: "Started with 35% in diagnostics. After 4 months of systematic remediation and dual-coding, secured an A* in Physics.",
                stat: "35% → 92% Score"
              },
              {
                name: "Sarah's Mother",
                role: "Parent",
                story: "We spent ₨40,000/month on tutors with no results. EduMeUp's dashboard gave us visibility and saved us 85% in costs.",
                stat: "85% Cost Savings"
              },
              {
                name: "Mr. Raza",
                role: "School Teacher",
                story: "The auto-grading saved me 6 hours a week. Now I focus on actual teaching instead of marking papers.",
                stat: "6hrs/week Saved"
              }
            ].map((story, i) => (
              <div key={i} className="bg-white p-12 rounded-[3.5rem] shadow-xl border-4 border-white hover:border-blue-100 transition-all">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                    {story.name[0]}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#1e1b4b]">{story.name}</h4>
                    <p className="text-xs font-medium text-[#1e1b4b]/40 uppercase tracking-widest">{story.role}</p>
                  </div>
                </div>
                <p className="text-[#1e1b4b]/70 font-medium mb-8 italic">"{story.story}"</p>
                <div className="pt-6 border-t border-blue-50">
                  <p className="text-[14px] font-medium text-[#2366c9]">{story.stat}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHASE 2 ROADMAP */}
      <section className="py-32 bg-[#1e1b4b] text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
        <div className="container-custom">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl text-white font-semibold mb-6">Future of mastery (Phase 2)</h2>
            <p className="text-xl text-blue-400 font-semibold">Coming in 2026-2027</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "AI Personalized Tutoring", date: "Sept 2026", desc: "Generative AI tutor that knows your exact gaps." },
              { title: "Gamified Mastery Paths", date: "Jan 2027", desc: "Unlock achievements through retrieval mastery." },
              { title: "Peer-to-Peer Networks", date: "June 2027", desc: "Teach others to reach 90% retention levels." },
              { title: "Global Mock Exams", date: "Year-Round", desc: "Timed competitions with real-time global ranking." }
            ].map((item, i) => (
              <div key={i} className="p-10 bg-white/5 rounded-[2.5rem] border border-white/10">
                <span className="text-[14px] font-semibold text-blue-400 mb-4 block">{item.date}</span>
                <h4 className="text-xl font-semibold mb-4 text-white leading-tight">{item.title}</h4>
                <p className="text-white/50 text-[14px] font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESEARCH REFERENCES */}
      <section className="py-24 bg-white border-t-4 border-blue-50">
        <div className="container-custom text-center">
          <h2 className="text-xs font-semibold text-[#1e1b4b]/30 mb-12">Research Foundation</h2>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-[14px] font-medium text-[#1e1b4b]/40 uppercase">
            <span>Ebbinghaus (1885)</span>
            <span>Dale (1969)</span>
            <span>Bloom (1984)</span>
            <span>Paivio (1971)</span>
            <span>Roediger (2006)</span>
            <span>Freeman (2014)</span>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR & GET STARTED */}
      <section className="py-32 bg-blue-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 mb-24">
            {/* Who It's For / Not For */}
            <div className="space-y-8">
              <div className="bg-[#1e1b4b] p-16 rounded-[4rem] text-white shadow-2xl h-full">
                <h3 className="text-3xl text-white font-semibold mb-8 flex items-center gap-3">
                  <CheckCircle2 className="text-blue-400 h-8 w-8" />
                  Who It's For
                </h3>
                <ul className="space-y-6 mb-12">
                  {[
                    "Students struggling with forgetting",
                    "Parents seeking cost-effective quality",
                    "Schools wanting data-driven results",
                    "Independent learners seeking mastery"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-blue-100/80 font-medium uppercase text-[14px] tracking-widest">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> {item}
                    </li>
                  ))}
                </ul>

                <div className="pt-12 border-t border-white/10">
                  <h3 className="text-2xl font-semibold mb-6 text-red-400">Who it's not for</h3>
                  <ul className="space-y-4 opacity-60">
                    {[
                      "Those looking for quick 'exam hacks' without effort",
                      "Students who prefer passive video watching over active practice",
                      "Anyone seeking a 'magic pill' rather than a scientific system"
                    ].map((item, i) => (
                      <li key={i} className="text-xs font-medium uppercase tracking-widest flex items-start gap-3">
                        <span className="text-red-500">✕</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* What It Is / Isn't */}
            <div className="bg-white p-16 rounded-[4rem] border-4 border-blue-100 shadow-xl h-full flex flex-col">
              <h3 className="text-3xl font-semibold mb-10 text-[#1e1b4b]">System clarity</h3>
              <div className="grid grid-cols-2 gap-8 flex-1">
                <div>
                  <h4 className="text-[14px] font-semibold text-blue-600 mb-6">What it is</h4>
                  <ul className="space-y-4 text-xs font-medium text-[#1e1b4b] uppercase">
                    <li>✓ A Science-Backed Engine</li>
                    <li>✓ A Complete Mastery System</li>
                    <li>✓ Data-Driven Remediation</li>
                    <li>✓ Active Cognitive Training</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[14px] font-semibold text-red-400 mb-6">What it isn't</h4>
                  <ul className="space-y-4 text-xs font-medium text-[#1e1b4b]/40 uppercase">
                    <li>✕ Just another PDF library</li>
                    <li>✕ Random practice papers</li>
                    <li>✕ Passive video lectures</li>
                    <li>✕ Manual tracking</li>
                  </ul>
                </div>
              </div>
              <div className="mt-12 p-8 bg-blue-50 rounded-3xl border-2 border-dashed border-blue-200">
                <p className="text-[14px] font-semibold text-[#2366c9] leading-relaxed text-center">
                  "EduMeUp is the bridge between curriculum content and cognitive retention."
                </p>
              </div>
            </div>
          </div>

          {/* GET STARTED - OPTIMIZED */}
          <div className="bg-[#1e1b4b] p-20 rounded-[5rem] text-white relative overflow-hidden shadow-[0_0_100px_rgba(35,102,201,0.2)]">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
              <div>
                <h3 className="text-5xl text-white font-semibold mb-8 leading-none">
                  START YOUR <br /><span className="text-blue-400">10X LEAP</span> TODAY
                </h3>
                <div className="space-y-8 mb-12">
                  {[
                    { step: "01", title: "Free AI Diagnostic", desc: "Identify exact knowledge gaps in 90 mins" },
                    { step: "02", title: "Custom Mastery Path", desc: "Receive your research-validated study roadmap" },
                    { step: "03", title: "Guaranteed Growth", desc: "Follow the system and see results in 14 days" }
                  ].map((s, i) => (
                    <div key={i} className="flex gap-8 group">
                      <span className="text-3xl font-semibold text-blue-800 group-hover:text-blue-400 transition-colors">{s.step}</span>
                      <div>
                        <h4 className="text-xl text-white font-semibold mb-1">{s.title}</h4>
                        <p className="text-blue-100/50 font-medium text-[14px]">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Risk Reversal & Guarantee */}
                <div className="flex flex-wrap gap-4 pt-8 border-t border-white/10">
                  <div className="px-6 py-3 bg-blue-500/10 rounded-full border border-blue-500/20 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-400" />
                    <span className="text-[14px] font-semibold">30-Day money back guarantee</span>
                  </div>
                  <div className="px-6 py-3 bg-green-500/10 rounded-full border border-green-500/20 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-green-400" />
                    <span className="text-[14px] font-semibold">Permanent Free Library access</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-12 rounded-[4rem] shadow-2xl">
                <div className="text-center mb-10">
                  <p className="text-[14px] font-semibold text-blue-600 mb-4">Limited enrollment</p>
                  <h4 className="text-3xl font-semibold text-[#1e1b4b] mb-2">Secure your spot</h4>
                  <p className="text-[#1e1b4b]/40 font-medium uppercase text-[14px] tracking-widest">Next cohort starts in <span className="text-red-500">4 days, 12 hours</span></p>
                </div>
                
                <div className="space-y-6 mb-10">
                  <div className="p-6 bg-blue-50 rounded-3xl border-2 border-blue-100 flex justify-between items-center">
                    <div>
                      <p className="text-[14px] font-semibold text-blue-600 mb-1">Standard program</p>
                      <p className="text-2xl font-semibold text-[#1e1b4b]">PKR 36,000</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[14px] font-medium text-[#1e1b4b]/40 uppercase line-through">PKR 45,000</p>
                      <p className="text-[14px] font-semibold text-green-600">Save 20%</p>
                    </div>
                  </div>
                  <p className="text-center text-[14px] text-[#1e1b4b]/40 font-medium uppercase">All taxes included • No hidden fees</p>
                </div>

                <Button className="w-full h-24 bg-[#2366c9] hover:bg-blue-600 rounded-3xl text-2xl font-semibold shadow-xl group transition-all">
                  Join The Program
                  <ArrowRight className="ml-4 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 bg-white text-center relative overflow-hidden">
        <div className="container-custom">
          <h2 className="text-5xl md:text-7xl font-semibold mb-12 text-[#1e1b4b] leading-tight">
            Ready for <span className="text-[#2366c9]">True Mastery?</span>
          </h2>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Button size="lg" className="bg-[#2366c9] hover:bg-blue-600 h-24 px-20 rounded-[2rem] text-2xl font-semibold shadow-2xl active:scale-95 transition-all">
              Get Started Now
            </Button>
            <Button size="lg" variant="outline" className="border-4 border-blue-100 text-[#1e1b4b] hover:bg-blue-50 h-24 px-20 rounded-[2rem] text-2xl font-semibold shadow-lg active:scale-95 transition-all">
              REGISTER
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}