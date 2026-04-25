import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { useState } from "react";
import { motion } from "framer-motion";
import { InquiryDialog } from "@/components/InquiryDialog";
import {
  ArrowRight,
  CheckCircle2,
  Lock,
  Globe,
  BookOpen,
  Calendar,
  Activity,
  AlertCircle,
  FileText,
  Shield,
  Search,
  GraduationCap,
  Check,
  ChevronDown,
  ChevronUp,
  Brain,
  Lightbulb,
  Clock,
  MessageCircle,
  BarChart3,
  Flame,
  ShieldCheck,
  RefreshCw,
  AlertTriangle,
  Eye,
  Navigation
} from "lucide-react";

const sidebarLinks = [
  { label: "Is Cambridge Right for My Child?", href: "#cambridge-right" },
  { label: "How EduMeUp Helps", href: "#how-it-helps" },
  { label: "Your Parent Dashboard", href: "#parent-dashboard" },
  { label: "Reading the Diagnostic Report", href: "#diagnostic-guide" },
  { label: "Supporting at Home", href: "#at-home" },
  { label: "Parent FAQ", href: "#parent-faq" },
  { label: "Get Started", href: "#cta" },
];

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-blue-100 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full justify-between items-center text-left font-semibold text-lg text-slate-900 hover:text-[#2366c9] transition-colors"
      >
        <span>{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
      </button>
      {isOpen && <div className="mt-3 text-black text-[14px] leading-relaxed pr-8 font-medium">{answer}</div>}
    </div>
  );
};

export default function ForParents() {
  return (
    <Layout>
      <div className="flex min-h-screen bg-white">
        {/* FULL-HEIGHT STICKY SIDEBAR */}
        <aside className="hidden xl:flex flex-col w-[320px] h-[calc(100vh-64px)] sticky top-[64px] bg-white border-r border-blue-50 z-40 overflow-y-auto shrink-0">
          <div className="p-8 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-xl bg-[#2366c9] flex items-center justify-center shadow-lg shadow-blue-200">
                <Navigation className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[10px] font-black text-[#2366c9] uppercase tracking-[0.2em]">Navigation</p>
                <p className="text-[#0f172a] font-bold text-sm">Parent Guide</p>
              </div>
            </div>

            <nav className="space-y-2">
              {sidebarLinks.map((link, i) => (
                <a 
                  key={i} 
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(link.href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group flex items-center gap-4 p-4 rounded-2xl transition-all hover:bg-blue-50 text-slate-600 hover:text-[#2366c9]"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-[#2366c9] group-hover:scale-150 transition-all"></div>
                  <span className="text-[14px] font-bold leading-tight">{link.label}</span>
                </a>
              ))}
            </nav>

            <div className="mt-auto pt-8 border-t border-blue-50">
              <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100 mb-6">
                <p className="text-slate-600 text-[13px] font-medium leading-relaxed italic">
                  "EduMeUp answers every question parents have about Cambridge."
                </p>
              </div>
              <InquiryDialog 
                defaultType="diagnostic" 
                title="Free Diagnostic" 
                trigger={
                  <Button className="w-full h-14 bg-[#2366c9] hover:bg-blue-600 text-white text-[13px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-200 transition-all hover:-translate-y-1 active:scale-95">
                    Free Diagnostic
                  </Button>
                } 
              />
            </div>
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col">
          {/* SECTION 1 | HERO BANNER */}
          <section className="bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#2366c9] pt-20 pb-24 px-6 relative overflow-hidden">
            {/* Decorative Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-400/10 blur-[120px] rounded-full -mr-64 -mt-64"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full -ml-32 -mb-32"></div>

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
              
              <div className="space-y-8 max-w-2xl relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider">
                  <Activity className="w-3 h-3" /> Real-Time Parent Monitoring
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-semibold text-white leading-[1.1] tracking-tight">
                  Now You Can See Exactly How They Are Doing — <span className="text-blue-300">In Real Time.</span>
                </h1>
               
                <p className="text-blue-100/70 text-lg md:text-xl font-medium leading-relaxed">
                  The EduMeUp parent dashboard gives you a clear, plain-English view of your child's Cambridge preparation — which subjects they are strong in, where the gaps are, and whether they are on track for their examination date.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <InquiryDialog 
                    defaultType="diagnostic" 
                    title="Free Diagnostic" 
                    trigger={
                      <Button className="w-full sm:w-auto px-10 py-8 bg-[#2366c9] border border-[#2366c9] hover:bg-blue-700 text-white rounded-2xl font-bold shadow-2xl shadow-blue-900/40 text-[16px] transition-all hover:-translate-y-1">
                        Book Free Diagnostic for My Child
                      </Button>
                    } 
                  />
                  <a href="#parent-dashboard">
                    <Button variant="outline" className="w-full sm:w-auto px-8 py-8 border-2 border-white/10 text-white hover:bg-white/5 rounded-2xl font-bold text-[16px] backdrop-blur-md">
                      See Dashboard Features
                    </Button>
                  </a>
                </div>
                
                <div className="flex flex-col gap-4 pt-6 items-start">
                  <div className="flex items-center gap-3 text-[14px] font-semibold text-blue-100/80 bg-white/5 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/10 shadow-sm">
                    <Lock className="w-4 h-4 text-blue-400"/> 
                    <span>Your child's detailed results are private — you see progress summaries</span>
                  </div>
                  <div className="flex items-center gap-3 text-[14px] font-semibold text-blue-100/80 bg-white/5 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/10 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400"/> 
                    <span>Parent dashboard is always free — included with enrolment</span>
                  </div>
                  <div className="flex items-center gap-3 text-[14px] font-semibold text-blue-100/80 bg-white/5 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/10 shadow-sm">
                    <Globe className="w-4 h-4 text-blue-400"/> 
                    <span>Available for parents worldwide — Cambridge students</span>
                  </div>
                </div>
              </div>

            {/* Hero Dashboard Mockup — Matching Section 5 Style */}
            <div className="relative z-10 lg:pl-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[2.5rem] border border-white/20 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] overflow-hidden scale-105 origin-center"
              >
                {/* Mockup Top Bar */}
                <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#2366c9] flex items-center justify-center text-white font-bold text-xs">EH</div>
                    <div className="text-left">
                      <p className="text-white font-bold text-[10px] leading-tight">Parent: Emily H.</p>
                      <p className="text-slate-400 text-[9px] font-bold uppercase tracking-wider">Student: Zainab H.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-blue-400">
                    <Activity className="w-3 h-3 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Live Updates</span>
                  </div>
                </div>

                <div className="p-6 space-y-6 bg-slate-50/50">
                  {/* Traffic Light Widgets */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm text-center">
                      <p className="text-[9px] font-black text-slate-400 uppercase mb-2">Chemistry</p>
                      <div className="w-3 h-3 rounded-full bg-[#1A7A3A] mx-auto shadow-[0_0_8px_rgba(26,122,58,0.5)]"></div>
                      <p className="text-[10px] font-bold text-[#1A7A3A] mt-2 uppercase">On Track</p>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm text-center">
                      <p className="text-[9px] font-black text-slate-400 uppercase mb-2">Physics</p>
                      <div className="w-3 h-3 rounded-full bg-[#C8860A] mx-auto shadow-[0_0_8px_rgba(200,134,10,0.5)]"></div>
                      <p className="text-[10px] font-bold text-[#C8860A] mt-2 uppercase">Developing</p>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm text-center">
                      <p className="text-[9px] font-black text-slate-400 uppercase mb-2">Maths</p>
                      <div className="w-3 h-3 rounded-full bg-[#C0392B] mx-auto shadow-[0_0_8px_rgba(192,57,43,0.5)]"></div>
                      <p className="text-[10px] font-bold text-[#C0392B] mt-2 uppercase">Action</p>
                    </div>
                  </div>

                  {/* Exam Countdown Widget */}
                  <div className="bg-slate-900 rounded-2xl p-4 text-white shadow-xl">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[9px] font-black text-blue-300 uppercase tracking-widest">Mathematics P1</span>
                      <span className="text-2xl font-black">87 <span className="text-[10px] font-bold opacity-40">DAYS</span></span>
                    </div>
                    <p className="text-[10px] text-slate-300 font-medium leading-relaxed">Status: <span className="text-white font-bold">On track for Grade B</span>. <span className="text-blue-400">Improve to A</span> by completing 3 chapters.</p>
                  </div>

                  {/* Streak & Active Widget */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                      <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Study Streak</p>
                      <p className="text-lg font-black text-slate-900">12 Days 🔥</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                      <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Last Active</p>
                      <p className="text-[11px] font-bold text-slate-900">Today, 7:34pm</p>
                    </div>
                  </div>

                  {/* Retrieval Schedule Widget */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <RefreshCw className="w-3 h-3 text-[#2366c9]" />
                      <p className="text-[10px] font-black text-slate-900 uppercase">Today's Retrieval</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-emerald-50 text-[#1A7A3A] border border-emerald-100 rounded text-[9px] font-bold">Mole Concept ✓</span>
                      <span className="px-2 py-1 bg-amber-50 text-[#C8860A] border border-amber-200 rounded text-[9px] font-bold">Bonding (Overdue)</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
          </div>
        </section>

        {/* SECTION 2 | QUESTIONS MENU */}
        <section className="py-12 bg-[#f8fafc] border-y border-blue-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-semibold text-slate-900 mb-8 text-center">Every Question You Have About Your Child's Cambridge Journey — Answered Here.</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                {q: "Is Cambridge right for my child?", a: "Understand what Cambridge actually demands and whether it is the right path.", link: "#cambridge-right"},
                {q: "How does EduMeUp help my child?", a: "See exactly what the platform does — in plain English, not technical terms.", link: "#how-it-helps"},
                {q: "What can I see in my dashboard?", a: "Your real-time view of your child's progress, gaps, and exam readiness.", link: "#parent-dashboard"},
                {q: "How do I read the diagnostic report?", a: "Understand what the results mean and what your child should do next.", link: "#diagnostic-guide"},
                {q: "How can I help at home?", a: "Practical, evidence-based actions that parents can take — without becoming a tutor.", link: "#at-home"}
              ].map((item, i) => (
                <a key={i} href={item.link} className="block h-full">
                  <Card className="h-full border-2 border-blue-100 hover:border-[#2366c9] transition-colors rounded-2xl bg-white shadow-sm cursor-pointer hover:shadow-md">
                    <CardContent className="p-5 flex flex-col h-full">
                      <h3 className="font-semibold text-slate-900 text-base mb-2">{item.q}</h3>
                      <p className="text-[14px] text-slate-600 font-medium flex-grow mb-4">{item.a}</p>
                      <p className="text-xs font-bold text-[#2366c9] uppercase tracking-wider flex items-center gap-1">See below <ChevronDown className="w-3 h-3"/></p>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3 | IS CAMBRIDGE RIGHT FOR MY CHILD? */}
        <section id="cambridge-right" className="py-20 bg-white scroll-mt-10">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">What Cambridge O-Level Actually Tests — And Why It Prepares Students Better.</h2>
              <p className="text-lg text-slate-700 font-medium max-w-3xl mx-auto">
                Cambridge O-Level is not harder than national board examinations because it tests harder content. It is different because it tests whether your child genuinely understands and can apply what they have learned — not whether they can memorise a textbook answer. This distinction matters enormously for your child's future.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-blue-100 shadow-sm mb-8">
              <table className="w-full text-left min-w-[600px] border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-blue-100">
                    <th className="p-5 text-[14px] font-bold text-slate-900 w-1/2">National Board / Rote Learning System</th>
                    <th className="p-5 text-[14px] font-bold text-white bg-[#2366c9] w-1/2">Cambridge O-Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-50 text-[14px] font-medium text-slate-800">
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-5 border-r border-blue-50">Students memorise textbook answers to predictable questions</td>
                    <td className="p-5">Students learn to understand concepts so they can answer questions they have never seen before</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-5 border-r border-blue-50">The exam tests recall — what did you memorise?</td>
                    <td className="p-5">The exam tests understanding — can you apply what you know to a new situation?</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-5 border-r border-blue-50">'Out of syllabus' means an unfamiliar question — which is seen as unfair</td>
                    <td className="p-5">Unfamiliar questions are the standard — and the point. Understanding, not memory, is tested</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-5 border-r border-blue-50">Students who do well can recall information but often struggle at university where analysis and evaluation are required</td>
                    <td className="p-5">Cambridge graduates consistently perform better at university because analytical thinking was developed throughout O-Level</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-5 border-r border-blue-50">Teaching typically involves lecturing and note-copying — passive learning</td>
                    <td className="p-5">EduMeUp's interactive courses develop active understanding — students cannot advance without genuinely mastering each topic</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <p className="text-[14px] font-medium text-slate-500 text-center mb-16 italic max-w-4xl mx-auto">
              This is not a criticism of national education systems or the teachers and students within them. It is a factual comparison of what each system tests. Cambridge O-Level can coexist with national qualifications — and many students study both simultaneously.
            </p>

            <h3 className="text-2xl font-semibold text-slate-900 mb-8 text-center">Is Cambridge suitable for my child specifically?</h3>
            <p className="text-[14px] text-slate-700 font-medium max-w-3xl mx-auto text-center mb-10">
              Cambridge O-Level is suitable for most students who are motivated to learn — not just those who are already academically strong. The most important factor is not your child's current grade but their willingness to engage actively with their learning. EduMeUp's diagnostic identifies exactly where your child stands and builds a learning pathway from that starting point.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50/50 rounded-2xl p-8 border border-blue-100">
                <h4 className="font-semibold text-[#2366c9] text-lg mb-4 flex items-center gap-2"><CheckCircle2 className="w-5 h-5"/> Cambridge may be especially suitable if your child:</h4>
                <ul className="space-y-3">
                  {["Wants to study at an international university", "Plans to study medicine, engineering, or another competitive field", "Is curious and asks 'why' not just 'what'", "Is willing to learn to study differently — not just harder", "Currently feels that school does not challenge them enough"].map((item, i) => (
                    <li key={i} className="flex gap-3 text-[14px] font-medium text-slate-800"><div className="w-1.5 h-1.5 rounded-full bg-[#2366c9] mt-2 shrink-0"></div>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-8 border border-blue-100 shadow-sm">
                <h4 className="font-semibold text-slate-900 text-lg mb-4 flex items-center gap-2"><Shield className="w-5 h-5 text-emerald-500"/> Cambridge is achievable with EduMeUp even if your child:</h4>
                <ul className="space-y-3">
                  {["Has struggled with rote-memorisation based exams", "Has gaps in the foundational knowledge O-Level assumes", "Is not confident in English language proficiency", "Has limited access to quality Cambridge tutoring locally", "Is just starting O-Level Year 1 or even still in Grade 7-8"].map((item, i) => (
                    <li key={i} className="flex gap-3 text-[14px] font-medium text-slate-800"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4 | HOW EDUMEUP HELPS */}
        <section id="how-it-helps" className="py-20 bg-slate-50 scroll-mt-10 border-t border-blue-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">Six Things EduMeUp Does That Most Cambridge Students Never Have Access To.</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Search,
                  title: "1. Finds the gaps before they become exam problems",
                  text: "Before your child studies a single topic, EduMeUp's free 30-minute diagnostic identifies exactly which subjects and topics they have gaps in. Most students spend hours studying things they already know while the actual gaps go unaddressed. The diagnostic tells your child precisely what to focus on, so every study hour moves them forward.",
                  research: "Research: Bloom (1984) — personalised instruction based on diagnostic data is the highest-impact learning strategy available."
                },
                {
                  icon: Check,
                  title: "2. Ensures your child genuinely learns — not just memorises",
                  text: "EduMeUp's courses use interactive exercises (not videos or textbooks) where your child must actively answer questions, drag elements, and demonstrate understanding. The platform only allows progress to the next topic once your child has scored 80% or above — confirming genuine mastery, not surface familiarity.",
                  research: "Research: Freeman et al. (2014) — interactive learning reduces examination failure rates by 55% compared to passive study methods."
                },
                {
                  icon: Brain,
                  title: "3. Prevents your child from forgetting what they study",
                  text: "Without a specific system to combat it, most of what a student studies is forgotten within a week. EduMeUp's spaced retrieval system automatically schedules short review sessions for every topic your child has completed — on Day 1, Day 3, Day 7, Day 14, Day 30, and Day 90. The platform manages the schedule automatically.",
                  research: "Research: Ebbinghaus (1885) and Cepeda et al. (2006) — spaced retrieval produces 200% better long-term retention."
                },
                {
                  icon: MessageCircle,
                  title: "4. Gives your child an expert available at any hour",
                  text: "Every student enrolled has access to an AI Study Advisor — available 24 hours a day, 7 days a week. When your child is working late and gets stuck on a Chemistry question, they ask the AI. It gives a Cambridge-calibrated answer immediately, including what a Cambridge examiner would look for in the response.",
                  research: "Research: VanLehn (2011) — AI tutoring support produces an effect size comparable to one-to-one human tutoring."
                },
                {
                  icon: Lightbulb,
                  title: "5. Teaches your child how to study — before anything else",
                  text: "Most students have never been explicitly taught how to study effectively. EduMeUp's 'Learn How to Learn' course is the first course every student takes — it teaches note-taking, time management, memory techniques, and examination strategy. Students who complete this get measurably more from every subsequent hour.",
                  research: "Research: Zimmerman (2002) — self-regulated learning is the single strongest predictor of long-term academic success."
                },
                {
                  icon: Eye,
                  title: "6. Lets you see your child's progress — without asking them",
                  text: "The free parent dashboard gives you a real-time view of your child's progress in every subject — which topics they have mastered, which need attention, and how on-track they are for their examination date. Traffic light indicators (green, amber, red) make the information immediately clear without requiring syllabus knowledge.",
                  research: "Research: Epstein (2005) — parental monitoring and involvement consistently improves student outcomes."
                }
              ].map((item, i) => {
                const cardColors = [
                  "bg-blue-50/40 border-blue-100",
                  "bg-emerald-50/40 border-emerald-100",
                  "bg-amber-50/40 border-amber-100",
                  "bg-indigo-50/40 border-indigo-100",
                  "bg-rose-50/40 border-rose-100",
                  "bg-cyan-50/40 border-cyan-100"
                ];
                const iconColors = [
                  "text-blue-600 bg-blue-100",
                  "text-emerald-600 bg-emerald-100",
                  "text-amber-600 bg-amber-100",
                  "text-indigo-600 bg-indigo-100",
                  "text-rose-600 bg-rose-100",
                  "text-cyan-600 bg-cyan-100"
                ];

                return (
                  <Card key={i} className={`border ${cardColors[i % 6]} rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 min-h-[480px] flex flex-col`}>
                    <CardHeader className="pb-3">
                      <div className={`w-12 h-12 ${iconColors[i % 6]} rounded-xl flex items-center justify-center mb-4`}>
                        <item.icon className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-lg font-semibold text-slate-900 leading-snug">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 flex flex-col flex-grow justify-between">
                      <p className="text-[14px] text-slate-700 font-medium leading-relaxed mb-6">{item.text}</p>
                      <div className="bg-white/60 p-3 rounded-lg border border-black/5 mt-auto">
                        <p className="text-xs text-slate-600 font-semibold italic">{item.research}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 5 | PARENT DASHBOARD DETAILS */}
        <section id="parent-dashboard" className="py-24 bg-slate-50/50 scroll-mt-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-6 leading-tight">Your Parent Dashboard. <span className="text-[#2366c9]">Free. Real-Time. Plain English.</span></h2>
              <p className="text-lg text-slate-700 font-medium leading-relaxed">
                The parent dashboard is included free with every student course enrolment on EduMeUp. You do not need to pay extra or subscribe to a separate service. When your child is enrolled, you receive an invitation to link a parent account — after which you have access to the following information in real time.
              </p>
            </div>

            {/* Realistic Dashboard Mockup */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden">
              {/* Dashboard Top Bar */}
              <div className="bg-slate-900 px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">EH</div>
                  <div>
                    <p className="text-white font-bold text-sm">Parent: Emily H.</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Student:</span>
                      <select className="bg-slate-800 text-white text-[10px] font-bold border-none rounded px-2 py-0.5 outline-none cursor-pointer">
                        <option>Zainab H.</option>
                        <option>Omar H.</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-end">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Last Synced</p>
                    <p className="text-white text-xs font-bold">Just now</p>
                  </div>
                  <div className="w-px h-8 bg-slate-700"></div>
                  <div className="flex items-center gap-2 text-teal-400">
                    <Activity className="w-4 h-4" />
                    <span className="text-xs font-bold">Live Updates On</span>
                  </div>
                </div>
              </div>

              {/* Dashboard Grid */}
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-slate-50/30">
                
                {/* 1. Subject Readiness — Traffic Light View */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-[#2366c9]" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-[15px]">Subject Readiness</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                      <span className="text-sm font-bold text-slate-700">Chemistry</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-[#1A7A3A] uppercase">On Track</span>
                        <div className="w-3 h-3 rounded-full bg-[#1A7A3A] shadow-[0_0_8px_rgba(26,122,58,0.4)]"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                      <span className="text-sm font-bold text-slate-700">Physics</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-[#C8860A] uppercase">Developing</span>
                        <div className="w-3 h-3 rounded-full bg-[#C8860A] shadow-[0_0_8px_rgba(200,134,10,0.4)]"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                      <span className="text-sm font-bold text-slate-700">Mathematics</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-[#C0392B] uppercase">Action Needed</span>
                        <div className="w-3 h-3 rounded-full bg-[#C0392B] shadow-[0_0_8px_rgba(192,57,43,0.4)]"></div>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-[11px] text-slate-500 font-medium italic">Tap any badge to see topic-by-topic breakdown</p>
                </div>

                {/* 2. Exam Readiness Countdown */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-[#2366c9]" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-[15px]">Exam Readiness</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-slate-900 rounded-xl p-4 text-white">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[11px] font-bold text-blue-300 uppercase tracking-wider">Mathematics P1</span>
                        <span className="text-xl font-black">87 <span className="text-[10px] opacity-60">DAYS</span></span>
                      </div>
                      <p className="text-[11px] font-medium text-slate-300 leading-relaxed">Currently on track for <span className="text-white font-bold">Grade B</span>. To improve to <span className="text-teal-400 font-bold">Grade A</span>, complete 3 more chapters before May 15th.</p>
                    </div>
                    <div className="bg-slate-100 rounded-xl p-4 border border-slate-200">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Physics P2</span>
                        <span className="text-xl font-black text-slate-900">94 <span className="text-[10px] opacity-40">DAYS</span></span>
                      </div>
                      <p className="text-[11px] font-medium text-slate-600 leading-relaxed">Readiness: <span className="text-[#C8860A] font-bold">Moderate</span>. Focus on Electricity module to secure target grade.</p>
                    </div>
                  </div>
                </div>

                {/* 3. Last Active and Study Streak */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Flame className="w-4 h-4 text-[#2366c9]" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-[15px]">Activity & Streak</h3>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-1">Last Active</p>
                      <p className="text-sm font-bold text-slate-800">Today, 7:34pm</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-1">Study Streak</p>
                      <div className="flex items-center gap-2">
                        <p className="text-2xl font-black text-slate-900">12 Days</p>
                        <span className="text-xl">🔥</span>
                      </div>
                    </div>
                    <div className="pt-2">
                      <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-2">Retrieval Reviews Today</p>
                      <div className="flex items-center gap-2">
                        <span className="bg-emerald-100 text-[#1A7A3A] px-2 py-0.5 rounded text-[10px] font-black">3 COMPLETED</span>
                        <span className="bg-amber-100 text-[#C8860A] px-2 py-0.5 rounded text-[10px] font-black border border-amber-200/50 animate-pulse">1 OVERDUE</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Current Course Progress */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-[#2366c9]" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-[15px]">Course Progress</h3>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[12px] font-bold text-slate-800">Chemistry</span>
                        <span className="text-[11px] font-bold text-slate-500">6 of 11 chapters</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#2366c9] w-[55%]"></div>
                      </div>
                      <p className="mt-2 text-[11px] text-slate-600 font-medium">Current: <span className="font-bold">Stoichiometry</span> (64% mastery — in progress)</p>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[12px] font-bold text-slate-800">Physics</span>
                        <span className="text-[11px] font-bold text-slate-500">4 of 12 chapters</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#2366c9] w-[33%]"></div>
                      </div>
                      <p className="mt-2 text-[11px] text-slate-600 font-medium">Current: <span className="font-bold">Electricity</span> (38% mastery — <span className="text-[#C0392B]">alert</span>)</p>
                    </div>
                  </div>
                </div>

                {/* 5. Diagnostic Results Summary */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-[#2366c9]" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-[15px]">Diagnostic Summary</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Chemistry Gap Analysis</p>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-slate-500">At Diagnostic:</span>
                        <span className="text-slate-800">44%</span>
                      </div>
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-[#2366c9]">Current Mastery:</span>
                        <span className="text-[#1A7A3A]">71% (+27%)</span>
                      </div>
                      <p className="mt-3 text-[11px] text-slate-600 leading-relaxed font-medium">Stoichiometry now <span className="font-bold">82%</span>, Bonding <span className="font-bold text-[#C8860A]">68%</span> (still developing).</p>
                    </div>
                  </div>
                </div>

                {/* 6. Spaced Retrieval Schedule */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                      <RefreshCw className="w-4 h-4 text-[#2366c9]" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-[15px]">Retrieval Schedule</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Today's Reviews</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-emerald-50 text-[#1A7A3A] border border-emerald-100 rounded text-[10px] font-bold flex items-center gap-1">
                          <Check className="w-2.5 h-2.5" /> Mole Concept
                        </span>
                        <span className="px-2 py-1 bg-emerald-50 text-[#1A7A3A] border border-emerald-100 rounded text-[10px] font-bold flex items-center gap-1">
                          <Check className="w-2.5 h-2.5" /> Atomic Structure
                        </span>
                        <span className="px-2 py-1 bg-amber-50 text-[#C8860A] border border-amber-200 rounded text-[10px] font-bold">
                          Bonding (Overdue)
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">This Week</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-slate-50 text-slate-500 border border-slate-200 rounded text-[10px] font-bold">Stoichiometry</span>
                        <span className="px-2 py-1 bg-slate-50 text-slate-500 border border-slate-200 rounded text-[10px] font-bold">Organic Chemistry</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 7. Weak Topic Alert */}
                <div className="bg-red-50 p-6 rounded-2xl border border-red-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-[#C0392B]" />
                    </div>
                    <h3 className="font-bold text-[#C0392B] text-[15px]">Weak Topic Alert</h3>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm font-bold text-slate-900">Electricity & Magnetism (Physics)</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-black text-[#C0392B]">38%</span>
                      <span className="text-[11px] font-bold text-slate-500">Mastery for 21 days</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">Your child is struggling with this concept. Encourage them to revisit the module.</p>
                    <Button variant="outline" className="w-full mt-2 h-9 text-xs font-bold border-red-200 text-[#C0392B] hover:bg-red-100">Go to Chapter</Button>
                  </div>
                </div>

                {/* 8. Assessment Scores */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-[#2366c9]" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-[15px]">Assessment Scores</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <p className="text-sm font-bold text-slate-800">Chemistry Mock Exam</p>
                      <p className="text-xl font-black text-slate-900">67<span className="text-xs opacity-40">/100</span></p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-bold">
                        <span className="text-slate-500 uppercase tracking-widest">AO1 Recall</span>
                        <span className="text-[#1A7A3A]">81%</span>
                      </div>
                      <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#1A7A3A] w-[81%]"></div>
                      </div>
                      <div className="flex justify-between text-[10px] font-bold mt-2">
                        <span className="text-slate-500 uppercase tracking-widest">AO2 Application</span>
                        <span className="text-[#C8860A]">62%</span>
                      </div>
                      <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#C8860A] w-[62%]"></div>
                      </div>
                      <div className="flex justify-between text-[10px] font-bold mt-2">
                        <span className="text-slate-500 uppercase tracking-widest">AO3 Evaluation</span>
                        <span className="text-[#C0392B]">44%</span>
                      </div>
                      <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#C0392B] w-[44%]"></div>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-500 font-semibold italic">Main area for improvement: AO3 evaluation questions.</p>
                  </div>
                </div>

                {/* 9. Privacy Controls */}
                <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Shield className="w-4 h-4 text-[#2366c9]" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-[15px]">Privacy Settings</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">Subject-level Progress</span>
                      <div className="w-8 h-4 bg-[#1A7A3A] rounded-full relative"><div className="absolute right-1 top-1 w-2 h-2 bg-white rounded-full"></div></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">Topic-level Detail</span>
                      <div className="w-8 h-4 bg-slate-300 rounded-full relative"><div className="absolute left-1 top-1 w-2 h-2 bg-white rounded-full"></div></div>
                    </div>
                    <div className="bg-white/80 p-3 rounded-lg border border-blue-100 mt-2">
                      <p className="text-[11px] text-slate-600 leading-relaxed font-medium">To see topic-level detail, ask your child to enable detailed parent view in their account settings.</p>
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold italic">Default: Session activity and AI conversations are private.</p>
                  </div>
                </div>

              </div>
            </div>
            <div className="mt-12 max-w-4xl mx-auto">
              <div className="bg-blue-50/50 border-l-4 border-[#1e3a8a] p-6 rounded-r-xl">
                <p className="text-slate-700 text-lg font-medium italic leading-relaxed">
                  If you have more than one child using EduMeUp, the parent dashboard includes a multi-child selector — switch between children's dashboards from a single parent login. Each child's data is shown separately.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6 | DIAGNOSTIC GUIDE */}
        <section id="diagnostic-guide" className="py-20 bg-slate-50 border-y border-blue-50 scroll-mt-10">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">Your Child Took the Diagnostic. Here Is What the Report Tells You.</h2>
              <p className="text-[14px] text-slate-700 font-medium">
                The diagnostic report uses terms that are specific to Cambridge examinations. This guide translates each section into plain English so you can understand what the results mean for your child — and what to do next.
              </p>
            </div>

            <div className="space-y-8">
              {[
                {
                  title: "The Overall Percentage Score",
                  example: "Example: 'Chemistry — 61%'",
                  text: "This is not a pass or fail score. It is a starting point. It tells you how much of the Cambridge O-Level Chemistry syllabus your child already understands at examination standard. 61% means they have a solid foundation in about 60% of the content — and identifiable gaps in the remaining 40%. A student scoring 40% and a student scoring 80% both benefit from the diagnostic — they simply start their EduMeUp pathway at a different point. There is no bad diagnostic score — there is only an honest starting point.",
                  bgColor: "bg-blue-50/40",
                  borderColor: "border-blue-100"
                },
                {
                  title: "The AO Level Breakdown",
                  example: "Example: 'AO1 (Recall): 74% — AO2 (Application): 55% — AO3 (Evaluation): 38%'",
                  text: "Cambridge marks questions at three levels — and most students are stronger at the lower levels. AO1 means your child can recall and define what they have studied. AO2 means they can apply that knowledge to solve a problem or explain something in a new context. AO3 means they can evaluate, analyse, and reach a justified conclusion — the highest level Cambridge tests. A gap at AO2 or AO3 does not mean your child does not know the content — it means they need practice at using the content in the way Cambridge asks. EduMeUp's courses specifically develop AO2 and AO3 skills, not just AO1 recall.",
                  bgColor: "bg-emerald-50/40",
                  borderColor: "border-emerald-100"
                },
                {
                  title: "The Top Weakness Areas",
                  example: "Example: '1. Mole Concept and Stoichiometry (38%)  2. Ionic and Covalent Bonding (44%)  3. Rate of Reaction (52%)'",
                  text: "These are the topics where your child's performance was significantly below the 80% mastery standard EduMeUp requires before advancing. The numbers in brackets are their current mastery percentage for that topic. The most important thing to understand is: these are gaps, not failures. Every student has them. The diagnostic has simply made them visible — so your child can fix them systematically rather than discovering them on examination day.",
                  bgColor: "bg-amber-50/40",
                  borderColor: "border-amber-100"
                },
                {
                  title: "The Course Recommendation",
                  example: "Example: 'Begin with: Pre-O-Level Chemistry Chapter 7 (Mole Concept) then O-Level Chemistry Topic 4 (Stoichiometry)'",
                  text: "This is your child's personalised starting point. The diagnostic has determined that these two modules address the highest-priority gaps in the most efficient order. Your child should begin with the first recommended module and not move on until they have reached 80% mastery in it. The platform enforces this — it will not allow progress to the next module until the current one is genuinely mastered. This may feel slow at first, but it prevents the most common Cambridge examination problem: reaching examination day with foundational gaps that compromise performance across multiple topics.",
                  bgColor: "bg-indigo-50/40",
                  borderColor: "border-indigo-100"
                }
              ].map((item, i) => (
                <div key={i} className={`${item.bgColor} border ${item.borderColor} rounded-3xl p-8 shadow-sm transition-all hover:shadow-md`}>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-xs font-black text-[#2366c9] uppercase tracking-widest mb-4">{item.example}</p>
                  <p className="text-[15px] text-slate-700 font-medium leading-relaxed">{item.text}</p>
                </div>
              ))}

              {/* What You Should Do As a Parent Card */}
              <div className="bg-rose-50/40 border border-rose-100 rounded-3xl p-8 shadow-sm">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">What You Should Do As a Parent</h3>
                <p className="text-sm font-bold text-rose-600 uppercase tracking-widest mb-6">Three specific actions after reading the diagnostic report</p>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center font-black text-rose-600 shrink-0">1</div>
                    <div>
                      <p className="font-bold text-slate-900 mb-1">Begin Immediately</p>
                      <p className="text-[14px] text-slate-700 font-medium leading-relaxed">Encourage your child to begin with the recommended course immediately — not next week. The longer the gap between the diagnostic and the first study session, the harder it is to maintain momentum.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center font-black text-rose-600 shrink-0">2</div>
                    <div>
                      <p className="font-bold text-slate-900 mb-1">Check Weekly, Not Daily</p>
                      <p className="text-[14px] text-slate-700 font-medium leading-relaxed">Check the parent dashboard weekly — not daily. Daily checking can create anxiety for your child. A weekly review gives you a meaningful picture of progress without micromanaging.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center font-black text-rose-600 shrink-0">3</div>
                    <div>
                      <p className="font-bold text-slate-900 mb-1">Calm, Supportive Conversation</p>
                      <p className="text-[14px] text-slate-700 font-medium leading-relaxed">If your child's progress has stalled for more than two weeks (you can see this in the 'Last Active' and 'Spaced Retrieval' widgets), have a calm, supportive conversation about what is blocking them — it is usually a practical obstacle, not a motivation problem.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7 | SUPPORT AT HOME */}
        <section id="at-home" className="py-20 bg-white scroll-mt-10">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">You Do Not Need to Know the Cambridge Syllabus to Support Your Child Effectively.</h2>
              <p className="text-[14px] text-slate-700 font-medium max-w-3xl mx-auto leading-relaxed">
                Research consistently shows that parental involvement in a child's education improves outcomes — but the type of involvement matters. The most effective thing parents can do is not teach the content (that is what EduMeUp is for) but create the conditions, accountability, and emotional environment where effective study can happen.
              </p>
            </div>

            <div className="space-y-8">
              {[
                {
                  num: "1",
                  title: "Create a consistent study environment — not just a study schedule",
                  text: "A dedicated study space (even a specific corner of a room), good lighting, no phone notifications during study sessions, and a consistent time each day reduces the cognitive load of starting — which is the biggest obstacle most students face. The study schedule is less important than the environment: a student who studies whenever they feel motivated will study less than a student whose environment is set up for study at a predictable time.",
                  research: "Research: Zimmerman (2002) — environmental structuring is one of the six key self-regulation strategies that predict academic success.",
                  bgColor: "bg-blue-50/50",
                  borderColor: "border-blue-100"
                },
                {
                  num: "2",
                  title: "Ask 'What did you learn today?' not 'How long did you study?'",
                  text: "The quality of study is more important than the quantity. Asking your child to explain what they learned — even briefly — is itself a retrieval practice activity. When they explain a concept to you, they are forcing the information out of their memory and strengthening it. You do not need to understand the explanation to make it useful — your child explaining Ohm's Law to a parent who does not know Physics consolidates their understanding more than reading it again.",
                  research: "Research: Karpicke & Blunt (2011) — explaining concepts to others (the protege effect) produces greater retention than re-studying.",
                  bgColor: "bg-emerald-50/50",
                  borderColor: "border-emerald-100"
                },
                {
                  num: "3",
                  title: "Monitor the dashboard weekly — and mention specific progress, not just results",
                  text: "When you check the parent dashboard and see that your child has improved from 44% to 67% in Chemistry Stoichiometry over three weeks, say so. Specific recognition of specific effort is far more motivating than generic praise. 'I saw you completed four review sessions this week' is more effective than 'Well done for studying hard.'",
                  research: "Research: Epstein (2005) — specific parental recognition of academic effort (not just results) is consistently associated with higher student motivation and academic persistence.",
                  bgColor: "bg-amber-50/50",
                  borderColor: "border-amber-100"
                },
                {
                  num: "4",
                  title: "Treat the 80% mastery gate as a feature, not a frustration",
                  text: "Your child will sometimes be unable to advance in a course because they have not yet reached 80% mastery on the current topic. This is not a problem — it is the system working exactly as designed. When this happens, the right response is: 'What does the AI tutor say you need to review?' not 'Why are you still on the same chapter?' The gate prevents the most common Cambridge examination problem — advancing with unresolved gaps.",
                  research: "Research: Bloom (1984) — mastery learning (advancing only when genuinely ready) produces the highest-impact outcomes in educational research, with an effect size of d=2.0.",
                  bgColor: "bg-indigo-50/50",
                  borderColor: "border-indigo-100"
                },
                {
                  num: "5",
                  title: "Respect the spaced retrieval schedule — it looks lighter than it feels",
                  text: "Spaced retrieval sessions are typically 5-10 minutes per topic. They may look like your child is not studying much. In fact, these short retrieval sessions are more effective per minute than two-hour re-reading sessions. If your child is completing their daily retrieval reviews, they are doing the most important thing on their study plan — even if it does not look impressive.",
                  research: "Research: Cepeda et al. (2006) — short, frequent retrieval sessions produce 200% better long-term retention than extended massed study. The most effective study looks lighter than the least effective study.",
                  bgColor: "bg-rose-50/50",
                  borderColor: "border-rose-100"
                }
              ].map((item, i) => (
                <div key={i} className={`flex flex-col md:flex-row gap-6 items-start ${item.bgColor} p-8 rounded-[2rem] border ${item.borderColor} shadow-sm transition-all hover:shadow-md`}>
                  <div className="w-12 h-12 bg-[#2366c9] text-white rounded-full flex items-center justify-center font-bold text-xl shrink-0">
                    {item.num}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-[15px] text-slate-700 font-medium leading-relaxed mb-4">{item.text}</p>
                    <p className="text-xs font-semibold text-slate-500 italic bg-white/80 p-3 rounded-lg border border-white/20 inline-block shadow-sm">{item.research}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 8 | PARENT FAQ */}
        <section id="parent-faq" className="py-20 bg-blue-50 scroll-mt-10">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-10 text-center">Questions Parents Commonly Ask</h2>
            <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-blue-100">
              <FAQItem 
                question="My child's school uses the national board system. Can they still use EduMeUp?" 
                answer="Yes — and many EduMeUp students attend schools that do not teach Cambridge. EduMeUp provides everything a student needs for independent Cambridge O-Level preparation, including courses, diagnostic support, past paper practice, and an AI study advisor available 24/7. Students who are preparing as private candidates can use EduMeUp as their complete preparation system. Students at national board schools use EduMeUp as a supplement to their school teaching." 
              />
              <FAQItem 
                question="My child is in Grade 7. Is it too early to start?" 
                answer="Grade 7 or 8 is actually the ideal time to begin — not too early. EduMeUp's Pre-O-Level Victory Programme is specifically designed for Grade 7-8 students, building the foundation knowledge that O-Level assumes. Students who complete foundational courses in Grade 7-8 enter O-Level Year 1 with a significant advantage. The diagnostic identifies exactly which foundational topics to focus on." 
              />
              <FAQItem 
                question="How much time should my child spend on EduMeUp each day?" 
                answer="The diagnostic-generated study plan recommends a specific daily allocation based on your child's gap depth and examination timeline. As a general guide: 45-60 minutes per subject per day is effective for most O-Level students. This includes both new learning and the spaced retrieval review sessions. Consistency is more important than length — 45 minutes every day is more effective than 4 hours once a week." 
              />
              <FAQItem 
                question="Will EduMeUp replace my child's school or private tutoring?" 
                answer="EduMeUp is not designed to replace a school — it is designed to supplement and deepen school teaching. Many students use EduMeUp alongside their school and reduce or eliminate private tutoring costs, since the AI Study Advisor provides on-demand, subject-specific guidance at any hour. Whether EduMeUp fully replaces tutoring depends on your child's needs — the diagnostic will give you a clear picture." 
              />
              <FAQItem 
                question="What if my child is not making progress on EduMeUp?" 
                answer="The most common reasons for stalled progress are: the topic is below 80% mastery and the gate is blocking advancement (action: focus on the current topic, use the AI tutor for help), the student has not been completing retrieval sessions (action: check the parent dashboard), or the student skipped prerequisites. If none of these apply, our support team can be contacted." 
              />
              <FAQItem 
                question="Is the diagnostic private? Who sees the results?" 
                answer="By default, your child's detailed diagnostic responses are private to them. As a linked parent, you see the summary view — overall score, top weakness areas, and course recommendation. You do not see individual question responses or the detailed AO-level breakdown unless your child enables the detailed parent view in their account settings." 
              />
            </div>
          </div>
        </section>

        {/* SECTION 9 | FINAL CTA */}
        <section id="cta" className="bg-slate-900 pt-20 pb-16 px-6 border-t border-slate-800">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">The Clearest First Step: Know Your Child's Gaps.</h2>
            <p className="text-slate-300 text-[14px] font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
              The free 30-minute diagnostic costs nothing, takes half an hour, and tells you precisely what your child needs to focus on. That is more useful than any amount of general Cambridge advice.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16 items-stretch">
              {/* Primary CTA */}
              <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 flex-1 max-w-sm text-left shadow-lg flex flex-col">
                <h3 className="text-xl font-semibold text-white mb-2">Book the Free Diagnostic for My Child</h3>
                <p className="text-slate-400 text-[14px] font-medium mb-6">Free · 30 minutes · No login needed to start</p>
                <div className="mt-auto">
                  <InquiryDialog 
                    defaultType="diagnostic" 
                    title="Free Diagnostic" 
                    trigger={
                      <Button className="w-full h-12 bg-[#2366c9] border border-[#2366c9] hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors text-[14px]">
                        Start the Diagnostic
                      </Button>
                    } 
                  />
                </div>
              </div>
              
              {/* Secondary CTA */}
              <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 flex-1 max-w-sm text-left shadow-lg flex flex-col">
                <h3 className="text-xl font-semibold text-white mb-2">See How EduMeUp Works for Students</h3>
                <p className="text-slate-400 text-[14px] font-medium mb-6">The 8-step learning journey, course catalogue, and sample interactive lessons.</p>
                <div className="mt-auto">
                  <Link href="/for-students">
                    <Button variant="outline" className="w-full h-12 bg-transparent border-2 border-[#2366c9] text-[#4fb0ff] hover:bg-[#2366c9] hover:text-white hover:border-[#2366c9] font-semibold rounded-xl transition-colors text-[14px]">
                      For Students
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Trust Signals Strip */}
            <div className="pt-10 border-t border-slate-800 flex flex-col gap-6 max-w-2xl mx-auto text-left text-white text-[14px] font-medium mb-10">
              <div className="flex items-start gap-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <Lock className="w-6 h-6 text-[#2366c9] shrink-0" />
                <p className="text-white">
                  <span className="text-white font-semibold block mb-1">Detailed results are private</span>
                  Your child's detailed results are private — you see progress summaries, not raw data
                </p>
              </div>
              <div className="flex items-start gap-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <BarChart3 className="w-6 h-6 text-emerald-500 shrink-0" />
                <p className="text-white">
                  <span className="text-white font-semibold block mb-1">Always free</span>
                  Parent dashboard is always free — included with any student course enrolment
                </p>
              </div>
              <div className="flex items-start gap-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <Globe className="w-6 h-6 text-blue-400 shrink-0" />
                <p className="text-white">
                  <span className="text-white font-semibold block mb-1">Available worldwide</span>
                  Available for parents worldwide — Cambridge students in any country
                </p>
              </div>
              <div className="flex items-start gap-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <CheckCircle2 className="w-6 h-6 text-[#4fb0ff] shrink-0" />
                <p className="text-white">
                  <span className="text-white font-semibold block mb-1">All prices in USD</span>
                  Standardized Cambridge preparation for all regions. All prices in USD.
                </p>
              </div>
              <div className="flex items-start gap-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <GraduationCap className="w-6 h-6 text-emerald-400 shrink-0" />
                <p className="text-white">
                  <span className="text-white font-semibold block mb-1">Scholarship available</span>
                  Financial aid available for qualifying developing countries. Apply in minutes.
                </p>
              </div>
            </div>

            <p className="text-[14px] text-slate-400 font-medium">
              Already have a parent account? <Link href="/login" className="text-[#4fb0ff] hover:underline font-semibold">Log in to your dashboard</Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  </div>
</Layout>
);
}