import { Layout } from "@/components/Layout";
import { CtaCard } from "@/components/CtaCard";
import { PageSidebar } from "@/components/PageSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { InquiryDialog } from "@/components/InquiryDialog";
import {
  ArrowRight,
  CheckCircle2,
  Lock,
  Globe,
  Award,
  Zap,
  Calendar,
  FileText,
  Search,
  MessageCircle,
  BarChart3,
  PlayCircle,
  Navigation,
  Brain,
  Activity,
  RefreshCw,
  AlertTriangle,
  ShieldCheck,
  BookOpen,
  Flame,
  Check
} from "lucide-react";
import { motion } from "framer-motion";

const sidebarLinks = [
  { label: "The Student Problem", href: "#problem" },
  { label: "Course Categories", href: "#courses" },
  { label: "The 8-Step Journey", href: "#journey" },
  { label: "The Mastery Cycle", href: "#mastery-cycle" },
  { label: "Sample H5P Activities", href: "#h5p-samples" },
  { label: "Your Dashboard", href: "#dashboard" },
  { label: "AI Study Advisor", href: "#ai-advisor" },
  { label: "Get Started", href: "#cta" },
];

export default function ForStudents() {
  const problems = [
    {
      title: "You don't know where your gaps are",
      desc: "Without a diagnostic, you study by guessing — spending time on topics you already know while the topics you are actually weak in remain unaddressed. By examination day, the gaps are still there.",
      fix: "Free 30-minute diagnostic pinpoints your exact gaps at AO level before you study a single topic."
    },
    {
      title: "You forget what you study",
      desc: "Reading your notes once produces approximately 5% retention after one week. You revise, you feel confident, and then the examination arrives and the information is gone. This is the forgetting curve — and it is entirely preventable.",
      fix: "Spaced retrieval practice scheduled at Day 1/3/7/14/30/90 produces 75%+ retention after 90 days."
    },
    {
      title: "You can recall facts but lose marks on application",
      desc: "Cambridge rewards three things: recalling facts (AO1), applying them to unfamiliar situations (AO2), and evaluating and analysing (AO3). Most students are confident at AO1 and struggle when the question requires AO2 or AO3. These are not harder topics — they are different skills that require different practice.",
      fix: "Every course is structured by AO level. Your AI diagnostic identifies which AO level your gaps are at — so your practice targets exactly the right skill."
    },
    {
      title: "You study passively",
      desc: "Watching a video or reading a textbook feels like studying but produces almost no durable learning. Your brain needs to actively retrieve information, apply it, and make mistakes for learning to stick. Passive content — however well produced — is not enough.",
      fix: "Every course uses H5P interactive activities — drag-and-drop, fill-in-blank, adaptive questions. No passive video. Every activity requires you to actively think."
    }
  ];

  const categories = [
    {
      id: "CAT 1",
      title: "Must-Have Courses — Learn How to Learn and English Foundation",
      who: "Every student from Grade 6 upward — regardless of subject level or Cambridge stage.",
      courses: "Learn How to Learn (6 modules) — Cornell note-taking, spaced retrieval, exam strategy, academic independence. Vocabulary Mastery Gr5-7 (7 modules). Reading Comprehension RC68 (10 modules, Foundation and Challenge tracks, CEFR A2-B1+). ESL1 (CEFR A2). ESL2 (CEFR B1). English Bridge B1+ to B2. Classroom English Communication (student sections).",
      linkText: "Start here",
      link: "/must-have-courses",
      color: "border-[#2366c9]"
    },
    {
      id: "CAT 2",
      title: "Pre-O-Level Foundation Courses — Before You Begin O-Level",
      who: "Students in Grade 7-8 or in the first months of O-Level Year 1 who want to build a strong foundation before full O-Level study begins.",
      courses: "Pre-O-Level Chemistry (11 chapters — Atomic Structure through Organic Chemistry introduction, covers 30-40% of O-Level syllabus). Pre-O-Level Mathematics (13 topics — Numbers through Basic Trigonometry). Pre-O-Level Physics (15 topics — Physics and Units through Current Electricity). Pre-O-Level Biology. Certification examination included for all Pre-O-Level programmes.",
      linkText: "Build your foundation",
      link: "/programs/bridge-courses",
      color: "border-blue-500"
    },
    {
      id: "CAT 3",
      title: "O-Level Bridge Courses — Close Specific Gaps Before O-Level",
      who: "Students entering or already in O-Level who have identified specific foundational gaps through the diagnostic.",
      courses: "O-Level Bridge: English, Chemistry, Physics, Mathematics, Economics. Topic-selectable — your diagnostic tells you which topics you need. 80% mastery gate before advancing to the full O-Level subject course. AI diagnostic identifies your entry point in each bridge course automatically.",
      linkText: "Take the diagnostic first",
      link: "/diagnostics",
      color: "border-indigo-500"
    },
    {
      id: "CAT 4",
      title: "O-Level Subject Courses — All 10 Cambridge Subjects",
      who: "Students actively studying for Cambridge O-Level examinations — all levels.",
      courses: "Mathematics (25 topics — 14 available now, more being added continuously). Physics (6 main topics, 27 sub-topics — almost all available). Chemistry (11 topics — almost all available). Biology (21 topics — almost all available). Economics (complete). Business Studies (complete). English Language (10 courses — Comprehension, Essay/Composition, Directed Writing). Urdu, Islamiyat, Pakistan Studies (complete per current syllabus). Chapter-by-chapter purchase available for all subjects.",
      linkText: "Browse all subjects",
      link: "/courses",
      color: "border-sky-500"
    },
    {
      id: "CAT 5",
      title: "O-Level English Courses — Full 10-Course English Programme",
      who: "Students preparing specifically for Cambridge O-Level English Language Paper 1 (Reading) and Paper 2 (Writing).",
      courses: "5 Comprehension courses (one per Cambridge past paper set — Paper 1 Reading: two texts, structured and extended writing questions). 3 Essay and Composition courses (F1: Essay Types and Structure; F2: 10-Day Band 3 to Band 1 Bridge; F3: Complete Mastery Band 3 to Band 1). 2 Directed Writing courses (Part 1: non-letter types including Format A and B with 2024 papers; Part 2: 6 letter types, formal email, mock exam).",
      linkText: "See all English courses",
      link: "/programs/english-mastery",
      color: "border-cyan-500"
    },
    {
      id: "CAT 6",
      title: "ATP Courses — Alternative to Practical (Sciences)",
      who: "Students taking Cambridge Paper 4 (Alternative to Practical) in Physics, Chemistry, and Biology.",
      courses: "ATP Physics (built from latest 5 years ATP past papers — teach the skill, worked examples, interactive practice, solved past papers). ATP Chemistry (same structure). ATP Biology (same structure). All ATP courses fully integrate Cambridge Paper 4 past papers. Suitable for schools without laboratory facilities and for students wanting maximum Paper 4 preparation.",
      linkText: "See ATP courses",
      link: "/programs/atp-courses",
      color: "border-teal-500"
    }
  ];

  const steps = [
    {
      title: "Diagnose — Know Your Exact Gaps",
      do: "Take the free 30-minute EduMeUp diagnostic for your chosen subject(s). Answer 20-35 adaptive questions — no time pressure, no trick questions.",
      get: "Your overall percentage score per subject. Your top 3 weakness areas. Specific remedial actions. Direct links to modules that address your gaps.",
      research: "Bloom (1984) — Personalised instruction based on diagnostic data produces effect size d=2.0.",
      color: "bg-[#2366c9]"
    },
    {
      title: "Plan — Receive Your Personalised Pathway",
      do: "Your diagnostic results generate a personalised learning pathway automatically.",
      get: "A personalised course sequence in priority order. A study timeline recommendation based on your examination date.",
      research: "Zimmerman (2002) — Self-regulated learners who begin with a clear plan significantly outperform those without direction.",
      color: "bg-slate-800"
    },
    {
      title: "Build Your Foundation — Study Skills and Language",
      do: "Complete the foundational courses: Learn How to Learn and English Language pathway.",
      get: "A permanent upgrade to how you study. Verified English language proficiency.",
      research: "Zimmerman (2002) — Self-regulated learning is the single strongest predictor of long-term academic success.",
      color: "bg-amber-500"
    },
    {
      title: "Repair — Close Your Foundation Gaps",
      do: "Complete the targeted bridge or Pre-O-Level course modules for foundational gaps. 80% mastery gate before advancing.",
      get: "A secure foundation for every O-Level topic. Each topic completed at 80%+ mastery.",
      research: "Bloom (1968) — Fixing foundation gaps first is the highest-return-per-hour activity available.",
      color: "bg-purple-600"
    },
    {
      title: "Master — Study Each O-Level Topic",
      do: "Work through your recommended O-Level subject courses chapter by chapter. H5P interactive activities, not passive video.",
      get: "Genuine understanding of every topic. AO2 and AO3 skills developed alongside the content.",
      research: "Freeman et al. (2014) — Active learning improves Cambridge exam performance by 6%.",
      color: "bg-[#2366c9]"
    },
    {
      title: "Verify — Test What You Have Mastered",
      do: "Adaptive practice session tests whether knowledge has genuinely been retained. Take a full mock examination.",
      get: "Confirmed knowledge at each step. A full mock exam result showing marks per question and AO-level performance.",
      research: "Bartlett (2009) — Testing yourself is 10 times more effective at revealing true retention than re-reading.",
      color: "bg-slate-800"
    },
    {
      title: "Retain — Spaced Retrieval Schedule",
      do: "Spaced retrieval system automatically schedules short review sessions at Day 1, 3, 7, 14, 30, and 90.",
      get: "85%+ long-term retention. A continuously updated picture of which topics are secure.",
      research: "Cepeda et al. (2006) — Spaced repetition improves long-term retention by 200%.",
      color: "bg-amber-500"
    },
    {
      title: "Grow Independent — Become a Cambridge Thinker",
      do: "Answer unseen questions at AO3 level. Take the EduMeUp certification examination.",
      get: "Genuine academic independence. The confidence that comes from genuine preparation.",
      research: "Zimmerman (2002) — Self-regulated learners consistently outperform peers in lifelong learning.",
      color: "bg-purple-600"
    }
  ];

  const masteryStages = [
    { num: "1", title: "DIAGNOSE", desc: "Short adaptive pre-test identifies your entry point." },
    { num: "2", title: "REPAIR", desc: "Prerequisite gaps are addressed with brief remedial activities." },
    { num: "3", title: "MASTER", desc: "H5P interactive activities develop genuine understanding." },
    { num: "4", title: "VERIFY", desc: "End-of-topic test confirms mastery. 80% gate." },
    { num: "5", title: "RETAIN", desc: "Spaced retrieval sessions at Day 1/3/7/14/30/90." },
    { num: "6", title: "GROW INDEPENDENT", desc: "Unseen application questions test ability in new contexts." }
  ];

  const aiSamples = [
    {
      q: "My diagnostic shows AO2 gaps in Chemistry. What does that mean and what should I do?",
      a: "Your AO2 gap means you can recall concepts correctly but struggle to apply them to a calculation or an unfamiliar situation. I recommend starting with Pre-O-Level Chemistry Chapter 7."
    },
    {
      q: "I have 4 months before my O-Level Physics exam. Am I on track?",
      a: "Based on your 58% overall mastery, 4 months is achievable if you complete 3 chapters per week. Priority order: Waves, then Electricity, then revision of Mechanics."
    },
    {
      q: "What is the difference between AO2 and AO3 in an Economics evaluation question?",
      a: "AO2 asks you to apply economic theory to the context. AO3 asks you to evaluate — assess limitations, consider other factors, and reach a justified judgement."
    }
  ];

  const scrollToCourses = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Layout>
      <div className="flex min-h-screen bg-white">
        {/* FULL-HEIGHT STICKY SIDEBAR */}
        <PageSidebar 
          title="Student Guide"
          quote="EduMeUp answers every question you have about Cambridge."
          links={sidebarLinks}
        />

        <div className="flex-1 min-w-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex flex-col">
            
            {/* SECTION 1 | HERO BANNER (Blue Theme) */}
            <section className="relative overflow-hidden bg-white py-20 px-6 border-b border-slate-100">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-400/10 blur-[120px] rounded-full -mr-64 -mt-64"></div>
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full -ml-32 -mb-32"></div>

              <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 max-w-2xl">
                    <span className="inline-block rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-sm font-bold tracking-wide text-[#2366c9] uppercase">
                      Your Cambridge O-Level Journey — Powered by AI, Proven by Science
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-semibold leading-[1.1] tracking-tight text-slate-900">
                      Start Mastering.
                      <span className="block text-[#2366c9] mt-2 text-2xl md:text-3xl">The only Cambridge platform that knows exactly what you need — before you ask.</span>
                    </h1>
                    <p className="text-lg text-slate-600 font-medium leading-relaxed">
                      Most students spend their Cambridge journey studying the wrong things. A free 30-minute diagnostic identifies your exact gaps. An AI-powered pathway tells you precisely what to study, in which order, and at which pace.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Link href="/diagnostics">
                        <Button className="w-full sm:w-auto h-14 px-8 bg-[#2366c9] hover:bg-blue-600 text-white text-lg font-bold rounded-xl shadow-[0_15px_30px_rgba(35,102,201,0.4)]">
                          Take the Free Diagnostic
                        </Button>
                      </Link>
                      <a href="#courses" onClick={scrollToCourses}>
                        <Button variant="outline" className="w-full sm:w-auto h-14 px-8 border-slate-200 text-slate-700 hover:bg-slate-50 text-lg font-bold rounded-xl backdrop-blur-md">
                          Browse Courses
                        </Button>
                      </a>
                    </div>
                    <p className="text-sm text-slate-500">Free · No login required to start · Results in 30 minutes</p>
                    
                    <div className="flex flex-wrap gap-3 pt-6">
                      <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 text-[14px] font-semibold text-slate-700 border border-slate-200 shadow-sm">
                        <Award className="h-4 w-4 text-[#2366c9]" /> 91% pass rate — Designed to Achieve
                      </div>
                      <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 text-[14px] font-semibold text-slate-700 border border-slate-200 shadow-sm">
                        <BarChart3 className="h-4 w-4 text-[#2366c9]" /> 75%+ long-term retention
                      </div>
                      <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 text-[14px] font-semibold text-slate-700 border border-slate-200 shadow-sm">
                        <Lock className="h-4 w-4 text-[#2366c9]" /> Private diagnostic results
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 lg:pl-10">
                    <div className="bg-white rounded-[2.5rem] border border-white/20 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] overflow-hidden scale-105 origin-center text-slate-800">
                      <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#2366c9] flex items-center justify-center text-white font-bold text-xs">ZH</div>
                          <div className="text-left">
                            <p className="text-white font-bold text-[10px] leading-tight">Student: Zainab H.</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-[#2366c9]">
                          <Activity className="w-3 h-3 animate-pulse" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Live Updates</span>
                        </div>
                      </div>
                      <div className="p-6 space-y-6 bg-slate-50/50">
                        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Subject Progress</p>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between text-sm mb-1 font-bold"><span>Chemistry</span><span className="text-[#2366c9]">72%</span></div>
                              <div className="h-2 bg-slate-100 rounded-full"><div className="h-full bg-[#2366c9] rounded-full" style={{ width: '72%' }}></div></div>
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1 font-bold"><span>Physics</span><span className="text-amber-500">58%</span></div>
                              <div className="h-2 bg-slate-100 rounded-full"><div className="h-full bg-amber-500 rounded-full" style={{ width: '58%' }}></div></div>
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1 font-bold"><span>Maths</span><span className="text-[#1A7A3A]">89%</span></div>
                              <div className="h-2 bg-slate-100 rounded-full"><div className="h-full bg-[#1A7A3A] rounded-full" style={{ width: '89%' }}></div></div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 shadow-sm">
                          <Calendar className="h-5 w-5 text-amber-500 mt-0.5" />
                          <div>
                            <p className="font-bold text-amber-600 text-sm">Spaced Retrieval Reminder</p>
                            <p className="text-xs text-slate-600 mt-1 font-medium">Review: Mole Concept — due today (Day 7)</p>
                          </div>
                        </div>
                        <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-4 shadow-sm">
                          <div className="flex items-center gap-2 mb-2">
                            <MessageCircle className="h-4 w-4 text-[#2366c9]" />
                            <p className="font-bold text-sm text-[#2366c9]">AI Study Advisor</p>
                          </div>
                          <p className="text-xs text-slate-700 leading-relaxed font-medium">
                            "Based on your recent Physics mock, I recommend revising Kinematics. You lost 4 marks on AO2 application questions. Here is a targeted practice set."
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* SECTION 2 | THE STUDENT PROBLEM */}
            <section id="problem" className="py-20 bg-white scroll-mt-10 border-y border-slate-100">
              <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-6">You Are Working Hard. But Are You Studying the Right Things?</h2>
                  <p className="text-lg text-slate-600 font-medium leading-relaxed">
                    Cambridge O-Level is not hard because it tests difficult content. It is hard because it tests whether you genuinely understand and can apply what you know. EduMeUp uses the approach that cognitive science research identifies as the most effective.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {problems.map((prob, i) => (
                    <Card key={i} className="border-l-4 border-l-[#2366c9] border-y-slate-200 border-r-slate-200 shadow-sm rounded-r-2xl rounded-l-none bg-white">
                      <CardContent className="p-8">
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{prob.title}</h3>
                        <p className="text-slate-600 mb-6 font-medium leading-relaxed">{prob.desc}</p>
                        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                          <p className="text-[14px] font-medium text-slate-800">
                            <span className="font-bold text-[#2366c9] mr-1">EduMeUp fix:</span> {prob.fix}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-12 text-center text-lg font-medium text-slate-700 max-w-3xl mx-auto italic">
                  EduMeUp is not a content library. It is a learning system — designed so that everything you study actually stays with you until examination day and beyond.
                </div>
              </div>
            </section>

            {/* SECTION 3 | YOUR COURSE CATEGORIES */}
            <section id="courses" className="py-20 bg-white scroll-mt-10">
              <div className="max-w-5xl mx-auto px-6">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-6">Everything You Need for Cambridge O-Level — From Foundation to Examination Day.</h2>
                  <p className="text-lg text-slate-600 max-w-4xl mx-auto font-medium leading-relaxed">
                    EduMeUp's courses are organised into six categories. Your free diagnostic tells you which categories apply to your current level. Browse below and start wherever feels right.
                  </p>
                </div>

                <div className="space-y-6">
                  {categories.map((cat, i) => (
                    <div key={i} className={`border-l-4 ${cat.color} bg-white shadow-sm hover:shadow-md transition-all rounded-r-2xl border-y border-r border-slate-100 p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start`}>
                      <div className="md:w-1/4 shrink-0">
                        <span className="inline-block px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-md bg-slate-100 text-slate-600 mb-3">{cat.id}</span>
                        <h3 className="text-xl font-bold text-slate-900 leading-snug">{cat.title}</h3>
                      </div>
                      <div className="md:w-1/2">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Who it is for:</p>
                        <p className="text-[14px] text-slate-700 font-medium mb-4">{cat.who}</p>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Courses available:</p>
                        <p className="text-[14px] text-slate-700 font-medium">{cat.courses}</p>
                      </div>
                      <div className="md:w-1/4 w-full flex md:justify-end items-center md:items-start pt-4 md:pt-0">
                        <Link href={cat.link}>
                          <Button variant="outline" className="w-full text-[#2366c9] border-blue-200 hover:bg-blue-50 font-bold rounded-xl h-10">
                            {cat.linkText} <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 4 | THE 8-STEP JOURNEY */}
            <section id="journey" className="py-20 bg-white border-t border-slate-100 scroll-mt-10">
              <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-6">Eight Research-Backed Steps. From Where You Are Now to Where You Need to Be.</h2>
                  <p className="text-lg text-slate-600 max-w-4xl mx-auto font-medium leading-relaxed">
                    Every student follows the same eight-step journey — but the content is personalised to your specific gaps, subjects, and examination timeline.
                  </p>
                </div>

                {/* Visual Sequence Strip */}
                <div className="hidden md:flex justify-between items-center mb-16 relative px-8">
                  <div className="absolute top-1/2 left-8 right-8 h-1 bg-slate-200 -z-10 rounded-full"></div>
                  {steps.map((_, i) => (
                    <div key={i} className="flex flex-col items-center bg-slate-50 px-2">
                      <div className="w-10 h-10 rounded-full bg-[#2366c9] text-white flex items-center justify-center font-bold mb-2 shadow-sm border-4 border-slate-50">
                        {i + 1}
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Step {i + 1}</span>
                    </div>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {steps.map((step, i) => (
                    <Card key={i} className="overflow-hidden border-0 shadow-sm rounded-2xl bg-white hover:shadow-md transition-all">
                      <div className={`${step.color} h-2 w-full`}></div>
                      <CardContent className="p-8">
                        <div className="flex items-center gap-4 mb-6">
                          <div className={`w-12 h-12 rounded-xl ${step.color} text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-sm`}>
                            {i + 1}
                          </div>
                          <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                        </div>
                        
                        <div className="space-y-4 mb-6">
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">What you do</p>
                            <p className="text-[14px] text-slate-700 font-medium">{step.do}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-[#2366c9] uppercase tracking-widest mb-1">What you get</p>
                            <p className="text-[14px] text-slate-700 font-medium">{step.get}</p>
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t border-slate-100 bg-slate-50/50 -mx-8 -mb-8 p-8">
                          <p className="text-[11px] text-slate-500 font-medium italic">
                            <span className="font-bold text-slate-700 not-italic">Research: </span>
                            {step.research}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 5 | THE 6-STAGE MASTERY CYCLE */}
            <section id="mastery-cycle" className="py-20 bg-white scroll-mt-10">
              <div className="max-w-5xl mx-auto px-6">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-6">Inside Every Course: The 6-Stage Mastery Cycle That Changes How You Learn.</h2>
                  <p className="text-lg text-slate-600 max-w-4xl mx-auto mb-12 font-medium leading-relaxed">
                    Every single course uses the same 6-stage learning cycle. It is the cognitive process that research identifies as producing genuine, durable learning.
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
                    {masteryStages.map((stage, i) => (
                      <div key={i} className="relative text-center p-5 border border-slate-200 rounded-2xl bg-white shadow-sm hover:border-[#2366c9] transition-colors">
                        <div className="w-10 h-10 mx-auto bg-blue-50 text-[#2366c9] rounded-xl flex items-center justify-center font-black mb-4 z-10 relative">
                          {stage.num}
                        </div>
                        <h4 className="font-bold text-[13px] text-slate-900 mb-2 leading-tight uppercase">{stage.title}</h4>
                        <p className="text-[11px] text-slate-600 font-medium">{stage.desc}</p>
                        {i < masteryStages.length - 1 && (
                          <div className="hidden lg:block absolute top-10 -right-3 text-slate-300">
                            <ArrowRight className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="bg-blue-50/50 rounded-2xl p-8 text-left max-w-3xl mx-auto border border-blue-100">
                    <p className="text-slate-700 leading-relaxed text-[14px] font-medium">
                      <span className="font-bold text-slate-900">The 80% mastery gate is not a threshold to aim for — it is the minimum before you are allowed to advance.</span> Research shows that students who advance before reaching 80% on a prerequisite topic consistently struggle with every subsequent related topic. EduMeUp enforces this standard automatically.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6 | SAMPLE H5P INTERACTIONS */}
            <section id="h5p-samples" className="py-24 bg-white border-t border-slate-100 overflow-hidden scroll-mt-10">
              <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-6">This Is What Studying on EduMeUp Actually Looks Like.</h2>
                  <p className="text-lg text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
                    No passive video. No static PDFs. Every activity requires you to think, apply, and respond. The platform adjusts based on your answers. The AI gives you immediate, specific feedback.
                  </p>
                </div>

                <div className="space-y-24">
                  {/* Sample 1 */}
                  <div className="grid lg:grid-cols-12 gap-10 items-center">
                    <div className="lg:col-span-5 space-y-4">
                      <span className="text-[#2366c9] font-black tracking-widest text-[10px] uppercase">Sample H5P Activity 1</span>
                      <h3 className="text-2xl font-bold text-slate-900">Drag-and-Drop Diagram: Chemistry AO2</h3>
                      <p className="text-slate-600 text-[14px] leading-relaxed font-medium mb-6">
                        Students interact directly with equations to demonstrate understanding.
                      </p>
                      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 relative">
                        <div className="absolute -left-3 top-6 w-6 h-6 bg-white rounded-full border border-slate-200 flex items-center justify-center text-[#2366c9]"><Brain className="w-3 h-3"/></div>
                        <p className="text-[10px] font-black text-[#2366c9] uppercase tracking-widest mb-2 ml-4">AI Feedback Example:</p>
                        <p className="text-[13px] text-slate-600 font-medium leading-relaxed italic ml-4">"Excellent AO2 application. You correctly used the stoichiometric ratio — not the masses — to determine the mole quantities. This is the most common error Cambridge examiners report..."</p>
                      </div>
                    </div>
                    <div className="lg:col-span-7">
                      <div className="bg-slate-800 rounded-[2rem] border border-slate-700 shadow-2xl overflow-hidden scale-100 lg:scale-105 origin-left">
                        <div className="bg-slate-950 p-4 flex items-center gap-2 border-b border-slate-700">
                          <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500"></div><div className="w-3 h-3 rounded-full bg-yellow-500"></div><div className="w-3 h-3 rounded-full bg-green-500"></div></div>
                          <div className="ml-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">EduMeUp Learn Platform</div>
                        </div>
                        <div className="p-8 bg-white text-slate-800">
                          <h4 className="font-bold text-lg mb-2">Mole Concept: Interpreting Molar Ratios</h4>
                          <p className="text-[13px] mb-6 bg-slate-50 p-4 border border-slate-200 rounded-xl font-medium">The equation below shows the reaction between hydrogen and oxygen to produce water: <br/><span className="font-mono font-bold text-[#2366c9] text-base mt-2 block">2H₂ + O₂ &rarr; 2H₂O</span><br/>Drag the correct label to each position.</p>
                          <div className="grid grid-cols-3 gap-4 mb-8">
                            <div className="border-2 border-dashed border-slate-300 rounded-xl h-28 flex flex-col items-center justify-center p-3 bg-slate-50">
                              <span className="text-[11px] font-bold text-slate-500 mb-3">moles of H₂</span>
                              <div className="bg-[#2366c9] text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-md cursor-pointer">2 mol</div>
                            </div>
                            <div className="border-2 border-dashed border-slate-300 rounded-xl h-28 flex flex-col items-center justify-center p-3 bg-slate-50">
                              <span className="text-[11px] font-bold text-slate-500 mb-3">moles of O₂</span>
                              <div className="bg-[#2366c9] text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-md cursor-pointer">1 mol</div>
                            </div>
                            <div className="border-2 border-dashed border-slate-300 rounded-xl h-28 flex flex-col items-center justify-center p-3 bg-slate-50">
                              <span className="text-[11px] font-bold text-slate-500 mb-3">moles of H₂O</span>
                              <div className="bg-slate-200 text-slate-500 px-4 py-1.5 rounded-lg text-sm font-bold shadow-inner cursor-pointer border border-slate-300">Drop here</div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[13px] font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">Progress: 2/3 Correct</span>
                            <Button className="bg-[#2366c9] hover:bg-blue-600 text-white font-bold rounded-xl h-10">Check Answers</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sample 2 */}
                  <div className="grid lg:grid-cols-12 gap-10 items-center">
                    <div className="lg:col-span-7 order-2 lg:order-1">
                      <div className="bg-slate-800 rounded-[2rem] border border-slate-700 shadow-2xl overflow-hidden scale-100 lg:scale-105 origin-right">
                        <div className="bg-slate-950 p-4 flex items-center gap-2 border-b border-slate-700">
                          <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500"></div><div className="w-3 h-3 rounded-full bg-yellow-500"></div><div className="w-3 h-3 rounded-full bg-green-500"></div></div>
                        </div>
                        <div className="p-8 bg-white text-slate-800">
                          <h4 className="font-bold text-lg mb-4">Evaluate Writer's Language</h4>
                          <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="border border-slate-200 rounded-xl p-4 text-[12px] bg-slate-50 font-medium leading-relaxed">
                              "...The <span className="bg-amber-200/50 px-1 rounded font-bold">racing pulse</span> of the engine matched his own as he <span className="bg-blue-200/50 px-1 rounded font-bold">swerved violently</span>. <span className="bg-emerald-200/50 px-1 rounded font-bold">Time stopped.</span> Then the <span className="bg-rose-200/50 px-1 rounded font-bold">shattering crash</span>..."
                            </div>
                            <div className="border border-slate-200 rounded-xl p-4 text-[12px] bg-blue-50/50 font-medium leading-relaxed">
                              <span className="font-bold text-slate-500 block mb-1">Student Response:</span> "The writer creates urgency by using repetition and short sentences like 'Time stopped.' This makes the reader feel the urgency."
                            </div>
                          </div>
                          <p className="text-[13px] font-bold text-slate-800 mb-3">Select the correct Band:</p>
                          <div className="flex gap-2 mb-4">
                            <Button variant="outline" className="text-[12px] h-9 font-bold border-slate-200 rounded-lg text-slate-600">Band 1</Button>
                            <Button className="bg-[#2366c9] text-[12px] h-9 font-bold text-white rounded-lg">Band 2</Button>
                            <Button variant="outline" className="text-[12px] h-9 font-bold border-slate-200 rounded-lg text-slate-600">Band 3</Button>
                          </div>
                          <div className="w-full border border-slate-300 rounded-xl p-3 text-[12px] text-slate-400 h-20 bg-slate-50 font-medium">Explain your decision here...</div>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-5 space-y-4 order-1 lg:order-2">
                      <span className="text-[#2366c9] font-black tracking-widest text-[10px] uppercase">Sample H5P Activity 2</span>
                      <h3 className="text-2xl font-bold text-slate-900">Annotated Text Evaluation: English AO3</h3>
                      <p className="text-slate-600 text-[14px] leading-relaxed font-medium mb-6">
                        Students learn mark schemes by becoming the examiner and evaluating sample responses.
                      </p>
                      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 relative">
                        <div className="absolute -left-3 top-6 w-6 h-6 bg-white rounded-full border border-slate-200 flex items-center justify-center text-[#2366c9]"><Brain className="w-3 h-3"/></div>
                        <p className="text-[10px] font-black text-[#2366c9] uppercase tracking-widest mb-2 ml-4">AI Feedback Example:</p>
                        <p className="text-[13px] text-slate-600 font-medium leading-relaxed italic ml-4">"Correct. This is a Band 2 response. The student identifies two techniques... However, the effect on the reader is stated but not fully developed."</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Sample 3 */}
                  <div className="grid lg:grid-cols-12 gap-10 items-center">
                    <div className="lg:col-span-5 space-y-4">
                      <span className="text-[#2366c9] font-black tracking-widest text-[10px] uppercase">Sample H5P Activity 3</span>
                      <h3 className="text-2xl font-bold text-slate-900">Adaptive Question Sequence: Maths</h3>
                      <p className="text-slate-600 text-[14px] leading-relaxed font-medium mb-6">
                        Questions adapt in difficulty based on the previous answer, providing scaffolded help or extension tasks instantly.
                      </p>
                      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 relative">
                        <div className="absolute -left-3 top-6 w-6 h-6 bg-white rounded-full border border-slate-200 flex items-center justify-center text-[#2366c9]"><Brain className="w-3 h-3"/></div>
                        <p className="text-[10px] font-black text-[#2366c9] uppercase tracking-widest mb-2 ml-4">AI Feedback Example:</p>
                        <p className="text-[13px] text-slate-600 font-medium leading-relaxed italic ml-4">"Not quite. Let us look at where the working went wrong. The error is in isolating x. Here is the correct step... Now try a similar question with slightly different values."</p>
                      </div>
                    </div>
                    <div className="lg:col-span-7">
                      <div className="bg-slate-800 rounded-[2rem] border border-slate-700 shadow-2xl overflow-hidden scale-100 lg:scale-105 origin-left">
                        <div className="bg-slate-950 p-4 flex items-center gap-2 border-b border-slate-700">
                          <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500"></div><div className="w-3 h-3 rounded-full bg-yellow-500"></div><div className="w-3 h-3 rounded-full bg-green-500"></div></div>
                        </div>
                        <div className="p-8 bg-white text-slate-800">
                          <div className="flex justify-between items-center mb-6">
                            <h4 className="font-bold text-lg">Simultaneous Equations</h4>
                            <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-full uppercase tracking-wider">Q1 of 4</span>
                          </div>
                          <p className="text-[14px] mb-6 font-medium">Solve: <span className="font-mono font-bold bg-blue-50 text-[#2366c9] px-2 py-0.5 rounded ml-1">3x + 2y = 12</span> and <span className="font-mono font-bold bg-blue-50 text-[#2366c9] px-2 py-0.5 rounded ml-1">x - y = 1</span></p>
                          <div className="flex gap-3 mb-6">
                            <Button className="bg-[#2366c9] h-10 text-[13px] font-bold text-white rounded-xl">Substitution</Button>
                            <Button variant="outline" className="h-10 text-[13px] font-bold border-slate-200 rounded-xl text-slate-600">Elimination</Button>
                          </div>
                          <div className="border border-slate-300 rounded-xl p-4 h-36 mb-6 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] bg-repeat relative">
                            <p className="font-mono text-[14px] text-blue-900 font-bold mb-1">x = 1 + y</p>
                            <p className="font-mono text-[14px] text-blue-900 font-bold mb-1">3(1 + y) + 2y = 12</p>
                            <p className="font-mono text-[14px] text-blue-900 font-bold">3 + 3y + 2y = 12</p>
                            <div className="absolute bottom-3 right-3 flex gap-2">
                              <span className="bg-white border border-slate-300 px-3 py-1.5 rounded-lg text-[13px] font-mono font-bold shadow-sm">x = [ 2 ]</span>
                              <span className="bg-white border border-slate-300 px-3 py-1.5 rounded-lg text-[13px] font-mono font-bold shadow-sm">y = [ 1 ]</span>
                            </div>
                          </div>
                          <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12 font-bold rounded-xl text-[14px]">Submit Working</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </section>

            {/* SECTION 7 | YOUR STUDENT DASHBOARD */}
            <section id="dashboard" className="py-24 bg-white border-t border-slate-100 scroll-mt-10">
              <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-6">Your Command Centre — Everything You Need, In One Place.</h2>
                  <p className="text-lg text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
                    When you log into EduMeUp, your dashboard shows you exactly what to do today, how much you have achieved this week, and where your attention is most needed.
                  </p>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-200 overflow-hidden p-6 md:p-10">
                   {/* Realistic mockup of the 9 widgets */}
                   <div className="grid md:grid-cols-3 gap-6">
                     
                     {/* 1. Today's Study Plan */}
                     <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50 col-span-1 md:col-span-2 shadow-sm">
                       <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Zap className="w-4 h-4 text-[#2366c9]" /> Today's Study Plan</h4>
                       <div className="space-y-3">
                         <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                           <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                           <span className="text-[14px] font-bold text-slate-800">Diagnostic Retest: Math Pre-O-Level</span>
                           <span className="text-[11px] font-bold text-slate-400 uppercase ml-auto tracking-widest">Due</span>
                         </div>
                         <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                           <div className="w-2 h-2 rounded-full bg-[#1A7A3A]"></div>
                           <span className="text-[14px] font-bold text-slate-800">Chemistry: Mole Concept</span>
                           <span className="text-[11px] font-bold text-slate-400 uppercase ml-auto tracking-widest">Chapter 4</span>
                         </div>
                       </div>
                     </div>

                     {/* 2. AI Study Advisor */}
                     <div className="border border-slate-200 rounded-2xl p-6 bg-blue-50/50 flex flex-col row-span-2 shadow-sm">
                       <h4 className="font-bold text-[#2366c9] mb-4 flex items-center gap-2"><MessageCircle className="w-4 h-4" /> AI Study Advisor</h4>
                       <div className="flex-1 bg-white rounded-xl border border-slate-100 p-4 flex flex-col text-[13px] text-slate-700 shadow-sm font-medium">
                         <div className="mb-4 bg-slate-50 p-4 rounded-xl rounded-tl-none border border-slate-100 leading-relaxed">Hi! What do you need help with today? Mark scheme guidance?</div>
                         <div className="mt-auto relative">
                           <input type="text" placeholder="Type a question..." className="w-full border border-slate-200 rounded-full px-4 py-3 text-[13px] bg-slate-50 font-medium" readOnly />
                           <div className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#2366c9] rounded-full flex items-center justify-center text-white"><ArrowRight className="w-4 h-4" /></div>
                         </div>
                       </div>
                     </div>

                     {/* 3. Subject Mastery Overview */}
                     <div className="border border-slate-200 rounded-2xl p-6 bg-white shadow-sm">
                       <h4 className="font-bold text-slate-900 mb-4 text-[15px]">Subject Mastery Overview</h4>
                       <div className="space-y-4 text-[14px]">
                         <div className="flex justify-between items-center"><span className="flex items-center gap-2 font-bold text-slate-700"><div className="w-3 h-3 rounded-full bg-[#1A7A3A] shadow-[0_0_8px_rgba(26,122,58,0.4)]"></div>English</span> <span className="font-black text-slate-900">88%</span></div>
                         <div className="flex justify-between items-center"><span className="flex items-center gap-2 font-bold text-slate-700"><div className="w-3 h-3 rounded-full bg-[#1A7A3A] shadow-[0_0_8px_rgba(26,122,58,0.4)]"></div>Maths</span> <span className="font-black text-slate-900">82%</span></div>
                         <div className="flex justify-between items-center"><span className="flex items-center gap-2 font-bold text-slate-700"><div className="w-3 h-3 rounded-full bg-[#C8860A] shadow-[0_0_8px_rgba(200,134,10,0.4)]"></div>Physics</span> <span className="font-black text-slate-900">64%</span></div>
                       </div>
                     </div>

                     {/* 4. Spaced Retrieval Schedule */}
                     <div className="border border-slate-200 rounded-2xl p-6 bg-white shadow-sm">
                       <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-[15px]"><Calendar className="w-4 h-4 text-[#2366c9]" /> Spaced Retrieval</h4>
                       <div className="flex flex-wrap gap-2">
                         <span className="bg-rose-50 text-rose-700 text-[10px] px-2 py-1 rounded border border-rose-200 font-bold uppercase tracking-wide">Mole Concept (Today)</span>
                         <span className="bg-slate-50 text-slate-600 text-[10px] px-2 py-1 rounded border border-slate-200 font-bold uppercase tracking-wide">Bonding (Day 3)</span>
                         <span className="bg-slate-50 text-slate-600 text-[10px] px-2 py-1 rounded border border-slate-200 font-bold uppercase tracking-wide">Rates (Day 7)</span>
                       </div>
                     </div>

                     {/* 5. Exam Readiness */}
                     <div className="border border-slate-200 rounded-2xl p-6 bg-slate-900 text-white col-span-1 md:col-span-2 shadow-xl">
                       <h4 className="font-bold text-white mb-2 text-[15px]">Exam Readiness Countdown</h4>
                       <p className="text-[13px] text-blue-200 mb-6 font-medium">Based on mastery rate, you are on track for an A in Physics.</p>
                       <div className="flex flex-col sm:flex-row gap-4">
                         <div className="bg-white/10 px-6 py-4 rounded-xl text-center flex-shrink-0"><span className="block text-3xl font-black">124</span><span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mt-1 block">Days Left</span></div>
                         <div className="bg-white/10 px-6 py-4 rounded-xl text-left flex-1 flex flex-col justify-center"><span className="text-[13px] font-medium text-white leading-relaxed">To reach A*, complete <span className="font-bold text-blue-300">4 chapters</span> before May 1st.</span></div>
                       </div>
                     </div>

                     {/* 6. Current Course Progress */}
                     <div className="border border-slate-200 rounded-2xl p-6 bg-white shadow-sm">
                       <h4 className="font-bold text-slate-900 mb-4 text-[15px]">Current Progress</h4>
                       <div>
                         <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">O-Level Chemistry</p>
                         <div className="flex justify-between text-[13px] font-bold mb-2 text-slate-800"><span>Chapter 4 of 11</span><span className="text-[#2366c9]">36%</span></div>
                         <div className="h-2.5 bg-slate-100 rounded-full w-full overflow-hidden"><div className="h-full bg-[#2366c9] w-[36%]"></div></div>
                       </div>
                     </div>

                     {/* 7. Diagnostic Results */}
                     <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50 shadow-sm col-span-1 md:col-span-2">
                       <h4 className="font-bold text-slate-900 mb-4 text-[15px]">Diagnostic Pathway</h4>
                       <div className="flex flex-col sm:flex-row gap-4 items-center">
                         <div className="flex-1 w-full bg-white p-4 rounded-xl border border-slate-200">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Original Score</p>
                           <p className="font-black text-2xl text-rose-500">45%</p>
                         </div>
                         <ArrowRight className="text-slate-300 hidden sm:block w-5 h-5" />
                         <div className="flex-1 w-full bg-white p-4 rounded-xl border border-slate-200">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Progress</p>
                           <p className="font-black text-2xl text-[#1A7A3A]">68%</p>
                         </div>
                         <Button variant="outline" className="h-12 w-full sm:w-auto px-6 text-[13px] font-bold border-slate-200 text-slate-700 rounded-xl hover:bg-slate-100">View Full Report</Button>
                       </div>
                     </div>

                     {/* 8. Resources and Downloads */}
                     <div className="border border-slate-200 rounded-2xl p-6 bg-white shadow-sm">
                       <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-[15px]"><FileText className="w-4 h-4 text-[#2366c9]" /> Resources</h4>
                       <div className="space-y-3">
                         <p className="text-[13px] text-[#2366c9] font-bold cursor-pointer hover:underline">Mind maps & infographics</p>
                         <p className="text-[13px] text-[#2366c9] font-bold cursor-pointer hover:underline">Topical Workbooks</p>
                         <p className="text-[13px] text-[#2366c9] font-bold cursor-pointer hover:underline">Exam Templates</p>
                       </div>
                     </div>

                   </div>
                   
                   <div className="mt-10 text-center">
                     <Button variant="outline" className="text-[#2366c9] border-blue-200 font-bold h-12 px-8 rounded-xl hover:bg-blue-50">View Full Progress Report Detail</Button>
                   </div>
                </div>
              </div>
            </section>

            {/* SECTION 8 | AI STUDY ADVISOR */}
            <section id="ai-advisor" className="py-24 bg-white border-y border-slate-100 scroll-mt-10">
              <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-6">Your AI Study Advisor. Available 24/7. Answers Like a Cambridge Expert.</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {aiSamples.map((sample, i) => (
                    <Card key={i} className="border border-slate-200 shadow-sm bg-slate-50/50 rounded-2xl hover:shadow-md transition-shadow">
                      <CardContent className="p-8 space-y-6">
                        <div className="flex gap-4">
                          <div className="w-10 h-10 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center text-lg shadow-inner">👤</div>
                          <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none text-[14px] font-medium text-slate-800 shadow-sm leading-relaxed">
                            "{sample.q}"
                          </div>
                        </div>
                        <div className="flex gap-4 flex-row-reverse">
                          <div className="w-10 h-10 rounded-full bg-[#2366c9] flex-shrink-0 flex items-center justify-center text-white shadow-md"><Brain className="w-5 h-5" /></div>
                          <div className="bg-[#1e3a8a] text-white p-4 rounded-2xl rounded-tr-none text-[14px] leading-relaxed shadow-sm font-medium">
                            {sample.a}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 9 | FINAL CTA */}
            <section id="cta" className="py-24 bg-white border-t border-slate-100 relative overflow-hidden scroll-mt-10">
              <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
                <h2 className="text-3xl md:text-5xl font-semibold mb-6 tracking-tight text-slate-900">The First Step Takes 30 Minutes. It Is Free. And It Changes Everything.</h2>
                <p className="text-lg text-slate-600 mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
                  Every hour you spend studying without knowing your gaps may not take you forward. The diagnostic costs nothing, takes 30 minutes, and gives you a precise, personalised starting point.
                </p>

                <div className="flex flex-col md:flex-row justify-center gap-4 mb-16 items-stretch max-w-5xl mx-auto">
                  <CtaCard
                    icon={<Activity className="w-8 h-8" />}
                    title="Take the Free Diagnostic First"
                    subtitle="Know your exact gaps. Get your personalised pathway. Start studying with a plan."
                    meta="Free · No login required · 30 minutes"
                    buttonText="Start Free Diagnostic"
                    buttonHref="/diagnostics"
                  />
                  <CtaCard
                    icon={<BookOpen className="w-8 h-8" />}
                    title="Browse All Courses"
                    subtitle="See every course available. Browse by subject, level, or category."
                    meta="All courses available now"
                    buttonText="Browse Courses"
                    buttonHref="#courses"
                    onClick={scrollToCourses}
                  />
                </div>

                <div className="flex flex-wrap justify-center gap-6 mb-12">
                  <div className="flex items-center gap-2 text-[13px] font-bold text-slate-700 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm"><Award className="w-4 h-4 text-[#2366c9]" /> 91% pass rate</div>
                  <div className="flex items-center gap-2 text-[13px] font-bold text-slate-700 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm"><BarChart3 className="w-4 h-4 text-[#2366c9]" /> 75%+ retention</div>
                  <div className="flex items-center gap-2 text-[13px] font-bold text-slate-700 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm"><Lock className="w-4 h-4 text-[#2366c9]" /> Private results</div>
                  <div className="flex items-center gap-2 text-[13px] font-bold text-slate-700 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm"><CheckCircle2 className="w-4 h-4 text-[#2366c9]" /> 80% mastery gate</div>
                  <div className="flex items-center gap-2 text-[13px] font-bold text-slate-700 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm"><Brain className="w-4 h-4 text-[#2366c9]" /> AI Study Advisor</div>
                  <div className="flex items-center gap-2 text-[13px] font-bold text-slate-700 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm"><Globe className="w-4 h-4 text-[#2366c9]" /> Global Access</div>
                </div>

                <div className="pt-8 border-t border-slate-200">
                  <p className="text-slate-600 font-medium text-[15px]">
                    Already have an account? <Link href="/login" className="text-[#2366c9] font-bold hover:text-blue-700 transition-colors">Log in to your dashboard</Link>
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
