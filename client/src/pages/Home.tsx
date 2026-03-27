import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Target, LineChart, Trophy, BookOpen, UserCheck, CheckCircle2, MessageSquare, HelpCircle, ShieldCheck, Brain, Layers, Search, RefreshCw, MousePointer2, BarChart3, GraduationCap as GraduationIcon, ArrowRight, Download, Calendar, PlayCircle } from "lucide-react";
import { Link } from "wouter";
import { InquiryDialog } from "@/components/InquiryDialog";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useCurrency } from "@/hooks/use-currency";
import React from "react";
const tiers = [
  {
    tier: "CHARTER TIER",
    limit: "10 Founding Schools",
    desc: "Permanent charter status + 20% lifetime discount + founder privileges.",
    status: "6 spots remaining",
    color: "bg-[#1e1b4b]",
    textColor: "text-white",
  },
  {
    tier: "GROWTH TIER",
    limit: "Unlimited Schools",
    desc: "Full platform access with onboarding support.",
    status: "Available",
    color: "bg-white",
    textColor: "text-gray-900",
  },
  {
    tier: "ENTERPRISE TIER",
    limit: "Custom Institutions",
    desc: "Dedicated infrastructure and enterprise integrations.",
    status: "Contact Sales",
    color: "bg-gray-900",
    textColor: "text-white",
  },
];
const stats = [
  { value: "91%", label: "PASS RATE", sub: "Designed to Achieve - vs 35% National Average" },
  { value: "47%", label: "A/A* GRADES", sub: "Designed to Achieve - vs 18% Traditional" },
  { value: "75%+", label: "RETENTION", sub: "Designed to Achieve - vs 5-10% Traditional" },
  { value: "85%+", label: "COST SAVINGS", sub: "Designed to Achieve - vs $2,400–3,600/yr Tutors" },
];

const masteryCycleSteps = [
  {
    step: 1,
    title: "Diagnostic Analysis",
    purpose: "Identifies each learner's conceptual gaps before instruction begins",
    research: "Black & Wiliam (1998) - formative and diagnostic assessment improves learning outcomes",
  },
  {
    step: 2,
    title: "Remedial Concept Repair",
    purpose: "Targeted micro-lessons rebuild missing foundational knowledge",
    research: "Bloom (1984) - mastery learning shows targeted corrective instruction dramatically improves achievement",
  },
  {
    step: 3,
    title: "Interactive Learning",
    purpose: "H5P-powered active engagement replaces passive video consumption",
    research: "Freeman et al. (2014) - active learning significantly improves student performance in STEM courses",
  },
  {
    step: 4,
    title: "Past Paper Practice",
    purpose: "Authentic Cambridge past questions build exam familiarity and strategy",
    research: "Bartlett (2009) - exam preparation improves through practice with authentic past papers",
  },
  {
    step: 5,
    title: "Retrieval Practice",
    purpose: "Scheduled recall sessions defeat the forgetting curve",
    research: "Roediger & Karpicke (2006) - retrieval practice improves long-term retention more than repeated study",
  },
  {
    step: 6,
    title: "Formative Assessment",
    purpose: "Continuous check-ins identify gaps before they compound",
    research: "Black & Wiliam (1998) - formative assessment significantly improves student achievement",
  },
  {
    step: 7,
    title: "Corrective Study",
    purpose: "Personalised feedback and targeted revision restore mastery",
    research: "Hattie & Timperley (2007) - feedback and corrective instruction strongly impact learning outcomes",
  },
  {
    step: 8,
    title: "Time-Bound Mock Exams",
    purpose: "Simulated exams develop timing, stamina, and exam strategy",
    research: "Bjork & Bjork (2011) - testing under exam conditions as desirable difficulties improves performance",
  },
];

const stakeholders = [
  {
    title: "STUDENTS",
    colorClass: "border-t-[#1e1b4b]",
    bulletColorClass: "bg-[#1e1b4b]",
    features: [
      "Personalised learning pathways",
      "AI-powered diagnostic analysis",
      "Interactive H5P mastery modules",
      "Cambridge past paper practice",
      "Retrieval practice & spaced repetition",
      "Metacognitive progress tracking",
    ],
  },
  {
    title: "TEACHERS",
    colorClass: "border-t-teal-500",
    bulletColorClass: "bg-teal-500",
    features: [
      "Cambridge exam system training",
      "One-day & SMK workshops",
      "Bloom's-aligned lesson resources",
      "AI teaching insights & automation",
      "Professional learning communities",
      "Competency gap development plans",
    ],
  },
  {
    title: "SCHOOLS",
    colorClass: "border-t-[#2366c9]",
    bulletColorClass: "bg-[#2366c9]",
    features: [
      "Full school partnership model",
      "Real-time analytics dashboards",
      "White-label platform option",
      "Curriculum quality assurance",
      "Admin reporting automation",
      "Teacher performance monitoring",
    ],
  },
  {
    title: "PARENTS",
    colorClass: "border-t-amber-500",
    bulletColorClass: "bg-amber-500",
    features: [
      "Progress dashboards & alerts",
      "Parent training modules",
      "Home-support activity guides",
      "Early learning gap identification",
      "School-home communication",
      "Co-facilitation strategies",
    ],
  },
];

const platformComparisonData = [
  ['Research-Backed Learning Science', 'Full 8-step cycle', 'Partial', 'Limited', 'Partial', 'Minimal'],
  ['Personalised Diagnostic Pathways', 'AI-powered, real-time', 'Prompt-based only', 'None', 'Partial', 'Partial'],
  ['Interactive Modules (No Passive Video)', 'H5P throughout', 'None', 'Video-only', 'Partial', 'Video-only'],
  ['Retrieval + Spaced Repetition System', 'Built-in, automated', 'None', 'None', 'Partial', 'None'],
  ['Full Stakeholder Ecosystem', 'All four groups', 'None', 'Students only', 'Students only', 'Students only'],
  ['Cambridge / O-Level Specialisation', 'Purpose-built', 'Generic', 'Generic', 'Yes', 'Yes'],
  ['Bridge / Early Prep Courses (Gr 7-8)', 'Unique - 5 subjects', 'None', 'None', 'None', 'None'],
  ['School Partnership B2B Model', 'Complete partnership', 'None', 'None', 'Limited', 'None'],
  ['AI Diagnostic + Chatbot Support', 'Integrated, curriculum-linked', 'General purpose', 'Partial', 'Partial', 'Partial'],
  ['Dual Curriculum (National + International)', 'Full dual coverage', 'None', 'None', 'None', 'None'],
];

const strategies = [
  { title: "Diagnostic", desc: "Identify gaps before you start", icon: Search },
  { title: "Personalized", desc: "Teacher-guided pathways", icon: UserCheck },
  { title: "Active Learning", desc: "Practice by doing", icon: Zap },
  { title: "Spaced Repetition", desc: "Review at optimal intervals", icon: RefreshCw },
  { title: "Dual Coding", desc: "Visual + verbal learning", icon: Brain },
  { title: "Retrieval", desc: "Frequent low-stakes quizzes", icon: Target },
  { title: "Interleaved", desc: "Mix topics for depth", icon: Layers },
  { title: "Mastery", desc: "True understanding tracking", icon: LineChart }
];

export default function Home() {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const { formatPrice } = useCurrency();

  const handleCheck = (index: number) => {
    setCheckedItems(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const getResult = () => {
    const count = checkedItems.length;
    if (count === 0) return null;
    if (count <= 1) return {
      title: "✓ Your child may already be well-prepared.",
      desc: "But take our free diagnostic to confirm - you might be surprised by hidden gaps!",
      color: "text-[#2366c9]"
    };
    if (count <= 3) return {
      title: "EduMeUp can help, but may not be critical urgency.",
      desc: "Consider a prevention strategy. Explore Bridge Courses and Diagnostic Tools.",
      color: "text-[#2366c9]"
    };
    return {
      title: "Your child is exactly who we designed EduMeUp for.",
      desc: "",
      color: "text-blue-700"
    };
  };

  const result = getResult();

  const learningSystemSteps = [
    {
      step: "STEP 1",
      title: "PRECISION DIAGNOSTIC",
      subtitle: "Step 1 of 8",
      body: "A 90-minute AI-powered diagnostic maps your child's exact knowledge gaps before a single lesson begins. We don't guess - we measure. Every student starts with a personalised gap report so learning is targeted from Day 1.",
      icon: Target,
    },
    {
      step: "STEP 2",
      title: "TARGETED FOUNDATION REPAIR",
      subtitle: "Step 2 of 8",
      body: "Identified gaps are closed through structured remedial modules - not glossed over. Weak foundations from Grade 6–8 are rebuilt concept by concept before any O-Level material is introduced. You cannot build a strong house on a cracked foundation.",
      icon: Layers,
    },
    {
      step: "STEP 3",
      title: "INTERACTIVE CONCEPT MASTERY",
      subtitle: "Step 3 of 8",
      body: "No passive reading. No lecture-style videos. Every concept is delivered through H5P-powered interactive modules requiring the student to engage, respond, and demonstrate understanding - because passive consumption produces only 5–20% retention.",
      icon: Zap,
    },
    {
      step: "STEPS 4 & 5",
      title: "CAMBRIDGE PAST PAPER PRACTICE + RETRIEVAL",
      subtitle: "Steps 4 & 5 of 8",
      body: "Students practice using real Cambridge O-Level past papers from the very first lesson - not just at the end. Practice is reinforced through active retrieval tasks scheduled at scientifically optimal intervals (Day 1, 3, 7, 14, 30, 90) to rewire memory pathways and prevent forgetting.",
      icon: BookOpen,
    },
    {
      step: "STEPS 6 & 7",
      title: "FORMATIVE ASSESSMENT + CORRECTIVE STUDY",
      subtitle: "Steps 6 & 7 of 8",
      body: "After every unit, smart formative assessments check what hasn't stuck. Students are automatically routed back for corrective study on weak areas - not pushed forward with hidden gaps. The system finds the holes and fills them before they compound.",
      icon: LineChart,
    },
    {
      step: "STEP 8",
      title: "TIME-BOUND MOCK EXAM SIMULATION",
      subtitle: "Step 8 of 8",
      body: "Full-length, timed Cambridge-style mock exams build exam stamina, pressure management, and final readiness. Students face the real experience before the real day - so on exam day, there are no surprises.",
      icon: Calendar,
    },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Layout>
 
   

      {/* SECTION 1: HERO */}
   <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 to-white py-16 md:py-24">
  <div className="container-custom relative z-10">
{/* H1 FULL WIDTH (LEFT ALIGNED) */}
<motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="text-5xl md:text-8xl font-semibold text-[#1e1b4b] mb-8 text-left max-w-6xl mx-auto"
>
  The Learning Ecosystem That Turns Passive Students Into Independent Masters
</motion.h1>
 {/* USER PATH NAVIGATION */}
      <section className="  py-10 md:py-12 border-b border-blue-100">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto p-4 md:p-6">
            <div className="text-center mb-6 md:mb-7">
              {/* Removed Quick Navigation and I AM A lines as requested */}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {[     { label: "STUDENT", id: "student-section", icon: Brain },
            
              { label: "SCHOOL", id: "school-section", icon: GraduationIcon },
              { label: "TEACHER", id: "teacher-section", icon: BookOpen }
         ,  { label: "PARENT", href: "/for-parents", icon: UserCheck }
            ].map((role) => (
              <motion.button 
                key={role.label}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => {
                  if ("href" in role && role.href) {
                    window.location.href = role.href;
                    return;
                  }

                  if ("id" in role && role.id) {
                    scrollToSection(role.id);
                  }
                }}
                className="w-full bg-white hover:bg-blue-50 px-4 py-3.5 md:py-4 rounded-xl transition-all border border-blue-200 hover:border-blue-300 shadow-sm hover:shadow-md group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2366c9]/40"
              >
                <div className="mx-auto h-12 w-12 md:h-16 md:w-16  bg-blue-100 text-[#2366c9] flex items-center justify-center mb-2">
                  <role.icon className="h-7 w-7 md:h-9 md:w-9" />
                </div>
                <span className="tracking-[0.1em] text-[11px] md:text-xs font-semibold uppercase text-slate-800">{role.label}</span>
              </motion.button>
            ))}
            </div>

            <p className="text-center text-[11px] md:text-xs text-black mt-5">Click to jump to your relevant section</p>
          </div>
        </div>
      </section>

{/* CENTERED CONTENT BELOW */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.1 }}
  className="max-w-4xl mx-auto"
>
<div className="text-center w-full">
      <div className="inline-block bg-blue-100 text-[#2366c9] px-6 py-3 rounded-full font-semibold text-base my-6 border border-blue-200">
        Research shows 90% of passive learning is forgotten within six days.
      </div>

      <p className="text-base text-slate-700 max-w-3xl mx-auto leading-relaxed my-8">
        EduMeUp diagnoses exactly where each learner stands, then rebuilds their understanding through a structured, science-backed 8-step mastery cycle - producing up to 10x better retention than passive learning methods.
      </p>

      <p className="text-s text-black mb-12">
        Built for ambitious learners and high-performance schools worldwide.
      </p>
{/* IGCSE / O-Level Total Mastery System Section */}
      <div className="max-w-3xl mx-auto mb-12 text-left bg-slate-50 p-8 rounded-2xl border border-blue-100">
        <h3 className="text-xl font-semibold text-[#1e1b4b] mb-6 flex items-center gap-2">
          <div className="h-2 w-2 bg-[#2366c9] rounded-full"></div>
          IGCSE / O-Level Total Mastery System
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
          {[
            "Moving Students from Confusion to Confidence",
            "5% Passive Retention to 50% Active Mastery",
            "Overcoming Brain Problem of Rapid Forgetting",
            "Enhancing self-learning skills & capabilities",
            "Mastery for Conceptual & Unseen Exams",
            "Empowering all education stakeholders",
            "Overcoming Language & Tutor dependency"
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="mt-1 bg-green-100 rounded-full p-0.5">
                <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-[14px] font-medium text-slate-700 leading-tight">{item}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
        <InquiryDialog
          defaultType="diagnostic"
          title="Free Diagnostic Assessment"
          trigger={
            <Button className="bg-[#2366c9] hover:bg-blue-700 font-semibold text-white text-[14px] py-3 px-6">
              START FREE DIAGNOSTIC NOW <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          }
        />
        <Button
          variant="outline"
          className="border-2 border-[#2366c9] text-[#2366c9] font-semibold text-[14px] py-3 px-6"
        >
          SEE HOW THE SYSTEM WORKS <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -4 }}
            className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm hover:shadow-md hover:border-blue-300 transition-all"
          >
            <div className="text-[34px] font-semibold text-[#2366c9] mb-2">{stat.value}</div>
            <div className="text-[14px] font-semibold text-black uppercase tracking-wide mb-2">{stat.label}</div>
            <div className="text-[14px] text-black">{stat.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* SECTION: OUR VISION & MISSION */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom max-w-4xl mx-auto text-center">
          
          {/* OUR VISION */}
          <div className="mb-12">
               
    <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
               OUR VISION</p>
            <motion.h2
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="text-4xl  md:text-6xl font-semibold text-[#1e1b4b] mb-8 text-left max-w-4xl mx-auto"
>
     From Passive Learning to Learning Mastery
</motion.h2>

{/* CENTERED CONTENT BELOW */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.1 }}
  className="max-w-4xl mx-auto"
></motion.div>    
       
            <p className="text-base text-black text-left leading-relaxed">
              EduMeUp aims to transform education by shifting from content delivery to learning mastery - empowering students, teachers, schools, and parents to reach their full potential.
            </p>
          </div>

          {/* DIVIDER */}
          <div className="w-24 h-1 bg-blue-100 mx-auto my-16"></div>

          {/* OUR MISSION */}
          <div>
        <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
           OUR MISSION</p>
            <p className="text-base text-left text-black leading-relaxed mb-12">
              Our mission is simple: help every learner understand deeply, retain longer, apply confidently, and become a truly independent thinker.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Zap, text: "Understand deeply" },
                { icon: Brain, text: "Retain longer" },
                { icon: Target, text: "Apply confidently" },
                { icon: UserCheck, text: "Become truly independent learners" }
              ].map((point, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center mb-4 text-[#2366c9]">
                    <point.icon className="h-8 w-8" />
                  </div>
                  <p className="font-semibold text-slate-800 text-center text-base">{point.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="bg-[#2366c9]  text-white py-6 px-8 rounded-xl inline-block mb-16 shadow-lg">
        <p className="text-base font-medium text-center text-white">
          Built on 30+ Years of Classroom Research & Educational Leadership
          <span className="block text-blue-200 text-[14px] mt-2 font-semibold">
            Developed by Cambridge educators using evidence-based learning science - not content aggregation
          </span>
        </p>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10 items-stretch py-8">
        {/* Card 1: Diagnostic */}
        <Card className="border-[#2366c9]   border-2    shadow-sm hover:shadow-lg transition-all rounded-2xl overflow-hidden group hover:-translate-y-1 bg-white">
          <CardContent className="p-10 flex flex-col h-full text-left">
            <div className="mb-6 text-[#2366c9] font-semibold text-[14px] bg-blue-50 py-1.5 px-3 rounded-lg inline-block self-start">
              FREE AI DIAGNOSTIC
            </div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-4 leading-tight">
              Is Your Child Ready for O-Level?
            </h3>
            <p className="text-base font-medium text-black mb-10">
              Free 90-minute AI diagnostic to map exact knowledge gaps before you spend a single rupee on preparation.
            </p>
            <div className="mt-auto pt-8">
              <InquiryDialog
                defaultType="diagnostic"
                title="Free Diagnostic Assessment"
                trigger={
     <Button className="w-full bg-[#2366c9] hover:bg-blue-700 font-medium min-h-[3rem] py-3 px-5 rounded-lg text-[13px] md:text-[14px] shadow-md transition-all text-white uppercase tracking-wide flex items-center justify-center gap-2 text-center leading-tight">
FREE DIAGNOSTIC
  <ArrowRight className="h-4 w-4 shrink-0" />
</Button>
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Featured Program */}
       <Card className="border-[#2366c9]   border-2    shadow-sm hover:shadow-lg transition-all rounded-2xl  group hover:-translate-y-1 bg-white">
           <CardContent className="p-10 flex flex-col h-full text-left">
            <div className="mb-6 text-[#2366c9] font-semibold text-[14px] bg-blue-50 py-1.5 px-3 rounded-lg inline-block self-start">
              EXPLORE ALL PROGRAMS
            </div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-4 leading-tight">
              Structured Learning Pathways
            </h3>
            <ul className="text-[14px] text-black font-medium mb-10 space-y-4 list-disc pl-5">
              <li>Bridge Programs Grade 6–8 Gaps</li>
              <li>Pre-O-Level Victory 12-Month Prep</li>
              <li>ATP Mastery Virtual Lab & Paper 4</li>
              <li>O-Level Subject Mastery & Mocks</li>
            </ul>
            <div className="mt-auto pt-8">
              <Link href="/programs" className="w-full">
              
<Button className="w-full bg-[#2366c9] hover:bg-blue-700 font-medium min-h-[3rem] py-3 px-5 rounded-lg text-[13px] md:text-[14px] shadow-md transition-all text-white uppercase tracking-wide flex items-center justify-center gap-2 text-center leading-tight">
  EXPLORE PROGRAMS
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Guide */}
        <Card className="border-[#2366c9]   border-2  shadow-sm hover:shadow-lg transition-all rounded-2xl overflow-hidden group hover:-translate-y-1 bg-white">
          <CardContent className="p-10 flex flex-col h-full text-left">
            <div className="mb-6 text-[#2366c9] font-semibold text-[14px] bg-blue-50 py-1.5 px-3 rounded-lg inline-block self-start">
              O-LEVEL SURVIVAL GUIDE
            </div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-4 leading-tight">
              Free 20-page PDF What every parent MUST know.
            </h3>
            <p className="text-[14px] font-medium text-black mb-10 leading-relaxed">
              Covers: Curriculum explained, gap diagnosis, cost comparison, and school checklists.
            </p>
            <div className="mt-auto pt-8">
           <Button className="w-full bg-[#2366c9] hover:bg-blue-700 font-medium min-h-[3rem] py-3 px-5 rounded-lg text-[13px] md:text-[14px] shadow-md transition-all text-white uppercase tracking-wide flex items-center justify-center gap-2 text-center leading-tight">
     DOWNLOAD  GUIDE
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </motion.div>
  </div>
</section>
{/* SECTION 1A: SCHOOL VALUE STRIP */}
<section id="school-section" className="bg-[#2366c9] text-white py-20 relative overflow-hidden">
  <div className="container-custom relative z-10">
    <div className="max-w-6xl mx-auto">

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
    {/* Section Header */}
<div className="text-center max-w-full mx-auto mb-16">
    <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
      For Schools & Educational Institutions
  </p>
  <div className="flex justify-center w-full">
           <h2 className="text-4xl md:text-6xl text-white font-semibold leading-[1.05] mb-7 text-center tracking-tight px-4 md:whitespace-nowrap">
           Transform Your School into a Centre of Excellence
    </h2>
  </div>

  <p className="text-base font-normal tracking-[0.5px] text-slate-300 leading-relaxed max-w-3xl mx-auto text-left">
    Running a strong Cambridge school today requires more than good teachers. 
    EduMeUp provides a complete academic infrastructure your leadership team can deploy immediately. 
 
          <span className="font-semibold text-white"> EduMeUp provides a complete academic infrastructure </span>
           your leadership team can deploy immediately allowing your school to focus
          on admissions, management, and growth.
        </p>
      </div>
</div>
      {/* Feature Grid */}
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">

  {/* Teacher Development */}
  <div className="bg-white p-8 rounded-xl border border-blue-200 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-[#2366c9] transition-all duration-300 group">
    <h3 className="text-2xl font-semibold text-[#2366c9] mb-4">
      Teacher & Academic Development
    </h3>
    <ul className="text-[14px] text-black space-y-3 leading-relaxed">
      <li>SMK-Aligned Teacher Training</li>
      <li>Bridge Programs (Grade 7 → O-Level)</li>
      <li>Diagnostic Gap Analysis & Remedial Repair</li>
    </ul>
  </div>

  {/* Learning Infrastructure */}
  <div className="bg-white p-8 rounded-xl border border-blue-200 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-[#2366c9] transition-all duration-300 group">
    <h3 className="text-2xl font-semibold text-[#2366c9] mb-4">
      Learning Infrastructure
    </h3>
    <ul className="text-[14px] text-black space-y-3 leading-relaxed">
      <li>Curriculum-Mapped Interactive Courses</li>
      <li>O-Level Past Paper Retrieval Systems</li>
      <li>Formative Assessments & Correction Programs</li>
      <li>Full Mock Exam Simulation System</li>
    </ul>
  </div>

  {/* Whole School Support */}
  <div className="bg-white p-8 rounded-xl border border-blue-200 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-[#2366c9] transition-all duration-300 group">
    <h3 className="text-2xl font-semibold text-[#2366c9] mb-4">
      Whole-School Empowerment
    </h3>
    <ul className="text-[14px] text-black space-y-3 leading-relaxed">
      <li>Student, Teacher & Parent Resources</li>
      <li>Administration Tools & Academic Trackers</li>
      <li>Management Templates & Proformas</li>
    </ul>
  </div>

  {/* Technology */}
  <div className="bg-white p-8 rounded-xl border border-blue-200 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-[#2366c9] transition-all duration-300 group">
    <h3 className="text-2xl font-semibold text-[#2366c9] mb-4">
      Platform & Technology
    </h3>
    <ul className="text-[14px] text-black space-y-3 leading-relaxed">
      <li>White-Label School Platform</li>
      <li>AI Learning Support & Chatbot</li>
      <li>Multilingual Audio Translation</li>
      <li>Continuous Expert Support</li>
    </ul>
  </div>
</div>

      {/* Advantage Section */}
      <div className="bg-white border border-blue-800/50 rounded-2xl p-10 text-center mb-12">
        <h3 className="text-2xl font-semibold mb-4 text-[#2366c9]">
          The EduMeUp Advantage
        </h3>
        <p className="text-base text-black max-w-3xl mx-auto text-left leading-relaxed mb-6">
          Most schools invest heavily in facilities and staffing but lack
          the structured academic systems required for international curriculum success.
           EduMeUp equips your school with research-backed Cambridge preparation systems,
          expert-designed content from Grade 1 to O-Level, and technology-enabled learning
         all at a fraction of the cost of building these systems internally.
        </p>
      </div>

      {/* CTA */}
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        <Link href="/schools">
          <Button className="bg-white text-slate-900 hover:bg-blue-50 font-semibold px-8 h-12 rounded-lg text-[14px] shadow-lg transition-all">
            Explore School Partnership →
          </Button>
        </Link>

        <Link href="/consultation">
          <Button className="bg-[#2366c9] hover:bg-blue-700 text-white font-semibold px-8 h-12 rounded-lg text-[14px] shadow-lg transition-all">
            Book a Consultation for Your School
          </Button>
        </Link>
      </div>

    </div>
  </div>
</section>

      {/* SECTION 1B: WHO EDUMEUP IS FOR */}
 <section className="py-24 bg-gradient-to-b from-white to-slate-50">
  <div className="container-custom">
    {/* SECTION 1B: WHO EDUMEUP IS FOR */}
<div className="text-center max-w-full mx-auto mb-16">
  <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
          Who This Is For
  </p>
  <div className="flex justify-center w-full">
           <h2 className="text-4xl md:text-6xl text-slate-900 font-semibold leading-[1.05] mb-3 text-center tracking-tight px-4 md:whitespace-nowrap">
           Who this Platform is Designed for
    </h2>
  </div>
</div>
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="border-[#2366c9]   border-2  border-2 group p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300">
        <CardContent className="p-0">
          <ul className="space-y-3 text-[14px] text-slate-700 font-medium">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
              Students in Grade 7-8 preparing for O-Level / IGCSE
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
              Students struggling despite heavy tutoring
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
              Students transitioning from national to Cambridge/IGCSE standards
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
              Learners who want structured, independent mastery - not tutor dependency
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="border-[#2366c9]   border-2  border-2 group p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300">
        <CardContent className="p-0">
          <ul className="space-y-3 text-[14px] text-slate-700 font-medium">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
              Families seeking a structured, low-cost tutor alternative
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
              Parents wanting real-time visibility on their child's progress
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
              Students who want to become independent self-directed learners
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
              Schools seeking to demonstrate extraordinary value to parents
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  </div>
</section>

      {/* 8-Step Mastery Cycle Table */}
      <section className="py-20 bg-blue-50/50">
        <div className="container-custom max-w-6xl">
          <div className="text-center w-full mb-12">
            <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
      THE SCIENCE BEHIND THE SYSTEM
            </p>
            <div className="flex justify-center w-full">
              <h2 className="text-4xl md:text-6xl font-semibold text-[#1e1b4b] mb-4 md:whitespace-nowrap">
                The EduMeUp 8-Step Research-Backed Mastery Cycle
              </h2>
            </div>
            <p className="text-lg text-black font-medium text-left">
              Every learner on EduMeUp follows a structured cycle grounded in Bloom's Mastery Learning, Retrieval Practice, Spaced Repetition, Cognitive Load Theory, and Active Learning science - for deep understanding and long-term retention.
            </p>
          </div>

          {/* Desktop Table */}
       <div className="w-full">

  {/* Header */}
 <div className="grid grid-cols-[60px_minmax(0,_1.5fr)_minmax(0,_2.5fr)_minmax(0,_3fr)] bg-[#2366c9] text-white text-xs uppercase tracking-wider font-semibold">   <div className="p-4 text-center">#</div>
    <div className="p-4 border-l border-blue-400/30">Step</div>
    <div className="p-4 border-l border-blue-400/30">Purpose</div>
    <div className="p-4 border-l border-blue-400/30">Research Reference</div>
  </div>

  {/* Rows */}
  {masteryCycleSteps.map((item, index) => (
    <div
      key={item.step}
className="grid grid-cols-[60px_minmax(0,_1.5fr)_minmax(0,_2.5fr)_minmax(0,_3fr)] border-b border-blue-50" >
      <div className="p-4 flex justify-center">
        <span className="h-6 w-6 flex items-center justify-center rounded-full bg-[#2366c9] text-white text-xs font-bold">
          {item.step}
        </span>
      </div>

      <div className="p-4 border-l border-slate-200 text-[14px] font-semibold text-black">
        {item.title}
      </div>

      <div className="p-4 border-l border-slate-200 text-[14px] text-black">
        {item.purpose}
      </div>

      <div className="p-4 border-l border-slate-200 text-[14px] italic text-black">
        {item.research}
      </div>
    </div>
  ))}
</div>

          {/* Mobile Cards */}
       

          <div className="text-center mt-10">
            <Link href="/research" className="text-[14px] font-semibold text-[#2366c9] hover:underline">
              See the full research basis <ArrowRight className="inline h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION: STAKEHOLDER ECOSYSTEM */}
      <section className="py-20 bg-white">
        <div className="container-custom max-w-8xl">
          <div className="text-center w-full mb-12">
         <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
        COMPLETE ECOSYSTEM
            </p>
            <h2 className="text-4xl md:text-6xl font-semibold text-[#1e1b4b] mb-4 md:whitespace-nowrap text-center">
                A Complete Ecosystem Empowering Every Stakeholder
            </h2>
            <p className="text-lg text-black font-medium text-left">
              EduMeUp is designed not just for students. It empowers the entire educational community - making it the only platform in the advanced international education market to serve all four stakeholder groups with purpose-built tools.
            </p>
          </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {stakeholders.map((stakeholder) => (
    <div 
      key={stakeholder.title} 
      className={`group rounded-2xl p-6 border-t-4 ${stakeholder.colorClass} bg-slate-50 shadow-sm 
        transition-all duration-300 ease-in-out
        hover:-translate-y-2 hover:shadow-xl hover:bg-white hover:border-l hover:border-r hover:border-b hover:border-slate-200`}
    >
      <a 
        href="#" 
        className="text-lg font-bold uppercase tracking-wider text-slate-800 group-hover:text-[#2366c9] transition-colors duration-300"
      >
        {stakeholder.title}
      </a>
      
      <ul className="mt-4 space-y-3">
        {stakeholder.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-[14px] text-black font-medium group-hover:translate-x-1 transition-transform duration-300">
            <span className={`mt-1.5 h-1.5 w-1.5 rounded-full ${stakeholder.bulletColorClass} flex-shrink-0`}></span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  ))}
</div>
        </div>
      </section>

   {/* SECTION 2: THE SCIENCE OF EXAM MASTERY */}
<section className="py-16 md:py-24 bg-white">
  <div className="container-custom">
    <div className="text-center max-w-4xl mx-auto mb-16">
       <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
     Research Engine
      </p>
      <div className="flex justify-center w-full overflow-hidden">
        <h2 className="text-4xl md:text-6xl text-slate-900 font-semibold leading-[1.05] mb-3 text-center tracking-tight px-4 md:whitespace-nowrap">
          The Science of Exam Mastery
        </h2>
      </div>
      <p className="text-base text-slate-700 font-medium">
        Research-Validated Active Retention Engine
      </p>
    </div>

    <Card className="border-[#2366c9]   border-2  border-2 grid md:grid-cols-2 gap-0 border border-blue-200 rounded-xl overflow-hidden shadow-md">
      <div className="bg-slate-50 p-8 border-r border-blue-200 text-left">
        <div className="mb-8 text-center">
          <div className="h-1 w-16 bg-red-600 mx-auto rounded-full mb-4"></div>
          <h4 className="text-2xl font-semibold text-slate-900 mb-2 leading-tight">
            Your Brain is Built to Forget
          </h4>
          {/* OVERLINE = 10px */}
          <p className="text-red-600 font-semibold text-[14px]">The Traditional Crisis</p>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-red-200 shadow-sm text-left">
            <h5 className="font-semibold text-slate-900 text-lg mb-4 border-b border-red-200 pb-3">
              Key Statistics / Evidence
            </h5>
            <ul className="space-y-4">
              {[
                { val: "42%", txt: "lost in 20 minutes (Ebbinghaus, 1885)" },
                { val: "70%", txt: "lost in 24 hours (Murre & Dros, 2015)" },
                { val: "90%", txt: "irretrievable in 30 days (Cepeda et al., 2006)" }
              ].map((stat, i) => (
                <li key={i} className="flex items-center gap-4 group transition-all">
                  <div className="text-[34px] font-semibold text-red-600 w-16 shrink-0">{stat.val}</div>
                  <span className="font-medium text-slate-700 text-[14px] leading-snug">{stat.txt}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg border border-red-200 shadow-sm">
             <div className="flex justify-center"><div className="relative w-80 h-52 mb-8 border-l-2 border-b-2 border-slate-300">
              <div className="absolute left-[-65px] top-1/2 -rotate-90 text-[14px] font-semibold text-black">Retention (%)</div>
              <div className="absolute left-[-40px] top-0 text-[14px] font-semibold text-black">100%</div>
              <div className="absolute left-[-30px] bottom-0 text-[14px] font-semibold text-black">0%</div>
              <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 text-[14px] font-semibold text-black">Time</div>
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M 0 0 Q 10 80 100 90" fill="none" stroke="red" strokeWidth="2" />
              </svg>
            </div></div>
            <p className="text-center font-semibold text-red-600 text-xs">
          Without Review: 100% Mastery drops to 10% Retention in 30 days
            </p>    
          </div>
        </div>
      </div>

      <div className="bg-[#2366c9] p-8 text-white relative text-left">
        <div className="absolute inset-0 bg-[#1e1b4b]/10 pointer-events-none"></div>
        <div className="mb-8 text-center relative z-10">
          <div className="h-1 w-16 bg-white mx-auto rounded-full mb-4"></div>
          <h4 className="text-2xl font-semibold text-white mb-2 leading-tight">
            We're Built to Stop Forgetting
          </h4>
          {/* OVERLINE = 10px */}
          <p className="text-blue-100 font-semibold text-[14px]">The EduMeUp Solution</p>
        </div>

        <div className="space-y-6 relative z-10">
          <div className="bg-blue-500/40 p-6 rounded-lg border border-blue-400 backdrop-blur text-left">
            <h5 className="font-semibold text-white text-lg mb-4 border-b border-blue-400 pb-3">
              Our System Fights Forgetting
            </h5>
            <ul className="space-y-4">
              {[
                { t: "1. Spaced Reviews", s: "Optimal intervals (Day 1, 3, 7, 14, 30, 90)", icon: RefreshCw },
                { t: "2. Interactive H5P", s: "Active recall via 1000+ activities", icon: Zap },
                { t: "3. Dual-Coding", s: "2× memory strength via Text+Visual (Paivio, 1971)", icon: Brain }
              ].map((step, i) => (
                <li key={i} className="group/item transition-all flex gap-3">
                  <step.icon className="h-6 w-6 text-white group-hover/item:rotate-12 transition-transform flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white text-base">{step.t}</p>
                    <p className="text-white font-medium text-xs opacity-90">{step.s}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className=" bg-blue-700/50 p-6 rounded-lg border border-blue-400 shadow-sm">
           <div className="flex justify-center">   <div className=" relative w-80 h-60 mb-8 border-l border-b border-blue-300">
              <div className="absolute left-[-65px] top-1/2 -rotate-90 text-[14px] font-semibold text-blue-200">Retention (%)</div>
              <div className="absolute left-[-45px] top-0 text-[14px] font-semibold text-blue-200">100%</div>
              <div className="absolute left-[-35px] bottom-0 text-[14px] font-semibold text-blue-200">0%</div>
              <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 text-[14px] font-semibold text-blue-200">Time</div>
                

              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M 0 0 L 5 30 L 15 20 L 30 35 L 50 25 L 70 30 L 85 20 L 100 15" fill="none" stroke="white" strokeWidth="2" />
              </svg></div>
            </div>
            <p className="text-center font-semibold text-white text-xs">
              EduMeUp: 100% → 95% → 90% → 85%+ (maintained long-term retention)
            </p>
          </div>
        </div>
      </div>
    </Card>

    <Card className="border-[#2366c9]   border-2  rounded-2xl overflow-hidden shadow-sm mt-12">
      <CardContent className="p-8">
        {/* H5 = 24px */}
        <h4 className="text-2xl font-semibold text-center text-slate-900 mb-10">
          Passive vs Active Learning
          <span className="block text-[14px] font-medium text-black mt-2">
            Why Traditional Methods Fail
          </span>
        </h4>
        <div className="grid md:grid-cols-2 gap-8">
          {/* PASSIVE */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-red-500 text-white p-2 rounded-lg">
                <BookOpen className="h-5 w-5" />
              </div>
              <h5 className="font-semibold text-red-700 text-lg">Passive Methods</h5>
            </div>

            <ul className="space-y-4">
              {[
                { name: "Lectures", val: "5%" },
                { name: "Reading Textbooks", val: "10%" },
                { name: "Watching Videos", val: "20%" }
              ].map((item, i) => (
                <li key={i} className="flex justify-between items-center bg-white p-3 rounded-lg border border-red-200">
                  <span className="text-[14px] font-medium text-slate-700">{item.name}</span>
                  <span className="text-red-600 font-semibold text-[14px]">{item.val}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-black mt-4">
              *Dale's Cone of Learning (1969), updated Freeman et al. (2014)
            </p>
          </div>

          {/* ACTIVE */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 relative">
            <div className="absolute -top-3 right-4 bg-[#2366c9] text-white text-xs px-3 py-1 rounded-full font-semibold">
              EduMeUp Method
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#2366c9] text-white p-2 rounded-lg">
                <Brain className="h-5 w-5" />
              </div>
              <h5 className="font-semibold text-blue-700 text-lg">Active Methods</h5>
            </div>

            <ul className="space-y-4">
              {[
                { name: "Discussion & Practice", val: "50%" },
                { name: "Practice by Doing", val: "75%" },
                { name: "Teaching Others", val: "90%" }
              ].map((item, i) => (
                <li key={i} className="flex justify-between items-center bg-white p-3 rounded-lg border border-blue-200">
                  <span className="text-[14px] font-medium text-slate-700">{item.name}</span>
                  <span className="text-[#2366c9] font-semibold text-[14px]">{item.val}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-black mt-4">
              *Freeman et al. (2014)
            </p>
          </div>
        </div>
        <div className="text-center mt-10">
          <p className="text-[14px] italic text-black mb-5">
            Traditional education often relies on less effective methods - then wonders why students struggle to retain information after exams.
          </p>

          {/* BUTTON = 14px */}
          <Button className="bg-[#2366c9] hover:bg-blue-700 text-white font-semibold px-6 py-3 text-[14px]">
            EXPERIENCE ACTIVE LEARNING - REGISTER
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</section>


 {/* SECTION 3: IS EDUMEUP RIGHT FOR YOUR CHILD? */}
<section id="parent-section" className="py-16 md:py-24 bg-white">
  <div className="container-custom">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="text-left">
        <p className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-[#2366c9] mb-5">
          Parent Fit Check
        </p>
        <h2 className="text-4xl md:text-6xl text-slate-900 font-semibold mb-4 leading-[1.05] tracking-tight ">
          Is EduMeUp Right for Your Child?  
        </h2>
        <h2 className="text-2xl font-semibold text-slate-800 mb-6 leading-tight md:whitespace-nowrap">
          Take This Quick Check (30 Seconds)
        </h2>
        <p className="text-base text-black mb-12 leading-relaxed font-medium italic border-b border-slate-200 pb-4">
          Check all that apply to your child:
        </p>

        <div className="grid sm:grid-cols-1 gap-3 mb-16">
          {[
            "Currently in Grade 7 or 8 (entering O-Level within 12 months)",
            "Scored below 70% in recent school exams",
            "Struggles with Math, Physics, Chemistry, or English",
            "Has learning gaps from Grade 6–7 that were never properly fixed",
            "Switching from Urdu medium to English medium",
            "Switching from national curriculum to Cambridge / IGCSE",
            "School has 35+ students per class (limited individual attention)",
            "Family cannot afford $200–300/month private tutors for 2–3 years",
            "You want child to become an independent learner (not tutor-dependent)",
            "You want research-backed results, not \"we'll try our best\""
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 10 }}
              onClick={() => handleCheck(i)}
              className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all border ${
                checkedItems.includes(i)
                  ? "bg-blue-50 border-[#2366c9]"
                  : "bg-white border-slate-200"
              }`}
            >
              <div
                className={`h-5 w-5 rounded-md border-2 flex items-center justify-center transition-all shrink-0 ${
                  checkedItems.includes(i)
                    ? "bg-[#2366c9] border-[#2366c9]"
                    : "bg-white border-slate-300"
                }`}
              >
                {checkedItems.includes(i) && <CheckCircle2 className="h-4 w-4 text-white" />}
              </div>
              <span
                className={`text-[14px] font-medium leading-snug ${
                  checkedItems.includes(i) ? "text-slate-900" : "text-black"
                }`}
              >
                {item}
              </span>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-8 rounded-xl border border-blue-200 bg-white shadow-md relative overflow-hidden`}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2366c9] to-blue-400"></div>
              <h3 className={`text-2xl font-semibold mb-4 mt-2 ${result.color}`}>{result.title}</h3>
              {checkedItems.length <= 3 && (
                <p className="text-base text-slate-700 font-medium leading-relaxed mb-8">{result.desc}</p>
              )}
              {checkedItems.length >= 4 && (
                <>
                  <p className="text-[14px] text-red-600 font-semibold mb-4">URGENT ACTION RECOMMENDED</p>
                  <p className="text-[14px] font-semibold text-slate-800 mb-3">EduMeUp will:</p>
                  <ul className="space-y-1 text-[14px] text-slate-700 mb-6">
                    <li>✓ Fix ALL gaps systematically</li>
                    <li>✓ Build strong O-Level foundations</li>
                    <li>✓ Develop self-learning capabilities</li>
                    <li>✓ Eliminate need for expensive tutors</li>
                    <li>✓ Support strong O-Level results</li>
                  </ul>
                  <p className="text-[14px] text-red-600 font-semibold mb-6">
                    Every month you wait = More gaps accumulate = Harder and more expensive to fix later.
                  </p>
                </>
              )}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="w-full sm:w-auto">
                  <InquiryDialog
                    defaultType="diagnostic"
                    title="Free Diagnostic"
                    trigger={
                      <Button className="w-full bg-[#2366c9] hover:bg-blue-700 font-semibold min-h-[3.25rem] h-auto py-3 px-4 rounded-lg text-[14px] text-white whitespace-normal leading-tight text-center">
                        {checkedItems.length <= 1
                          ? "TAKE FREE DIAGNOSTIC ANYWAY →"
                          : checkedItems.length <= 3
                          ? "TAKE FREE DIAGNOSTIC →"
                          : "START FREE DIAGNOSTIC NOW →"}
                      </Button>
                    }
                  />
                </div>
                <Link href="/programs" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="w-full border border-[#2366c9] text-[#2366c9] hover:bg-blue-50 font-semibold min-h-[3.25rem] h-auto py-3 px-4 rounded-lg text-[14px] whitespace-normal leading-tight text-center"
                  >
                    {checkedItems.length <= 3 ? "EXPLORE BRIDGE COURSES →" : "ENROLL IN PRE-O-LEVEL VICTORY →"}
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative">
        <div className="absolute -inset-10 bg-blue-100/50 rounded-full blur-[100px] animate-pulse"></div>
        <Card className="border-[#2366c9]   border-2  border-2 relative border rounded-2xl overflow-hidden shadow-lg bg-white text-left">
          <CardContent className="p-0">
            <div className="bg-[#2366c9] p-8 text-center text-white relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#2366c9]"></div>
              <h3 className="text-2xl font-semibold mb-3 text-white">The EduMeUp Promise</h3>
              <p className="text-blue-100 font-medium text-[14px]">For Committed Students</p>
            </div>
            <div className="p-12 space-y-12">
              <div className="text-center">
                <div className="text-5xl font-semibold text-blue-600 mb-3">60%+</div>
                <p className="text-2xl font-semibold text-blue-900 leading-tight">Guaranteed Minimum Result</p>
                <p className="text-[14px] font-medium text-black mt-3 max-w-xs mx-auto italic">
                  When following our research-backed learning pathway and completing retrieval tasks.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-slate-50 rounded-lg border border-slate-200">
                  <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
                  <p className="font-semibold text-slate-900 text-xs">A* Excellence</p>
                </div>
                <div className="text-center p-6 bg-slate-50 rounded-lg border border-slate-200">
                  <ShieldCheck className="h-8 w-8 text-green-500 mx-auto mb-3" />
                  <p className="font-semibold text-slate-900 text-xs">Risk Free</p>
                </div>
              </div>

              <div className="bg-blue-50 p-8 rounded-lg text-center border border-blue-200">
                <p className="text-left text-base text-slate-700 font-medium leading-relaxed italic">
                  "We don't just teach. We ensure your child develops the capability to learn any subject independently for the rest of their lives."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</section>
{/* SECTION 4: OUR COMPLETE PROGRAMS */}
<section className="py-24 bg-gradient-to-b from-slate-100 via-white to-slate-50">
<div className="container-custom max-w-7xl">
<div className="text-center max-w-4xl mx-auto mb-20">
  <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
  All Programs</p>
 <div className="flex justify-center w-full">
        <h2 className="text-4xl md:text-6xl text-slate-900 font-semibold leading-[1.05] mb-3 text-center tracking-tight px-4 md:whitespace-nowrap">
          Find the Right Program for Your Child
        </h2>
</div>
<p className="text-base text-black">
Built on Learning Science, Validated by Research
</p>
<p className="text-[14px] text-black mt-3">Each program card links to its own full detail page. On this homepage, all CTAs focus on seeing details, free demo, or free diagnostic.</p>
    </div>

   <Card className="border-[#2366c9]  border-2 rounded-3xl bg-white shadow-lg mb-16">
<CardContent className="p-8 text-left space-y-5">

      <p className="text-xs font-semibold text-[#2366c9] uppercase tracking-wider">Featured</p>
    <h3 className="text-3xl font-semibold text-slate-900">PRE-O-LEVEL VICTORY PROGRAM</h3>
        <p className="text-[14px] font-semibold text-slate-700">The complete bridge from middle school to O-Level mastery.</p>
        <p className="text-[14px] text-slate-700">The complete bridge from middle school to Cambridge O-Level readiness.</p>
        <p className="text-[14px] text-slate-700">Repair Grade 6–8 gaps, complete Bridge Program, and cover 30–40% of O-Level syllabus - equivalent to O1 preparation.</p>
        <p className="text-[14px] font-semibold text-slate-900">THREE-IN-ONE PROGRAM:</p>
        <ul className="text-[14px] text-slate-700 space-y-1">
          <li>✓ Grade 6–8 Deficiency Repair - Close all foundational gaps</li>
          <li>✓ Complete O-Level Bridge Program - Smooth Cambridge transition </li>
          <li>✓ O-Level Syllabus Coverage - Master 30–40% of O1 content</li>
        </ul>

        <p className="text-[14px] font-semibold text-slate-900">TWO LEARNING MODES:</p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-[14px] text-slate-700 space-y-2">
            <p className="font-semibold text-slate-900">ONLINE SELF-LEARNING  </p>
            <p>• 9 subjects: English, Math, Physics, Chemistry, Biology, Urdu, Islamiyat, History, Geography</p>
            <p>• Self-paced learning with full platform access</p>
            <p>• Interactive activities, diagnostic tests, AI support</p>
            <p>• Certificate on 60%+ completion</p>
            <p>• Flexible start anytime</p>
            <p><span className="font-semibold">Best For:</span> Self-motivated students, budget-conscious families</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-[14px] text-slate-700 space-y-2">
            <p className="font-semibold text-slate-900">TEACHER-LED CLASSES  </p>
            <p>• Everything in Self-Learning PLUS:</p>
            <p>• Live classes: 2.5–3 hours/day, 5 days/week (Sep–May)</p>
            <p>• Expert teachers (rotating by subject)</p>
            <p>• Online + Physical (Lahore - Phase 1)</p>
            <p>• Group learning environment</p>
            <p>• 60% Performance Designed Outcome* on actual O-Level papers from covered syllabus</p>
            <p>(*80% attendance + 80% task completion required)</p>
            <p><span className="font-semibold">Best For:</span> Students needing structure and guaranteed readiness</p>
          </div>
        </div>

        <p className="text-[14px] font-semibold text-slate-900">WHO IT'S FOR:</p>
        <ul className="text-[14px] text-slate-700 space-y-1">
          <li>• Grade 7–8 students preparing for O-Level</li>
          <li>• Post-Grade 8 students needing O-Level preparation</li>
          <li>• Students transitioning from local to Cambridge curriculum</li>
          <li>• Anyone wanting O1-level readiness</li>
        </ul>
        <p className="text-[14px] text-slate-700">SUCCESS RATE: 90%+ for students meeting program requirements</p>
        <p className="text-[14px] text-slate-700">Research Foundation: Mastery learning & scaffolding (Bloom, 1968; Rosenshine, 2012)</p>
        <p className="text-[14px] text-slate-700"> 20% discount when purchasing multiple programs</p>
        <Link href="/programs" className="w-full sm:w-auto inline-block">
          <Button className="bg-[#2366c9] hover:bg-blue-700">SEE FULL PROGRAM DETAILS <ArrowRight className="ml-2 h-4 w-4" /></Button>
        </Link>
      </CardContent>
    </Card>

 <div className="grid lg:grid-cols-2 gap-8 mb-10">

  {/* CARD 1 */}
  <Card className="border-[#2366c9]   border-2    rounded-3xl bg-white shadow-sm hover:shadow-xl transition-all duration-300">
    <CardContent className="p-8 flex flex-col h-full text-left">

      <div className="space-y-4">

        <h3 className="text-2xl font-semibold text-slate-900">
          COMPLETE O-LEVEL SUBJECT PREPARATION
        </h3>

        <p className="text-[14px] font-semibold text-slate-700">
          Full Syllabus Coverage + Exam Readiness • Understand • Cover • Practice
        </p>

        <p className="text-[14px] text-slate-700">
          Self-paced programs for complete O-Level subject mastery with continuous exam-style practice integrated from Day 1.
        </p>

        <p className="text-[14px] font-semibold text-slate-900">INCLUDES:</p>

        <ul className="text-[14px] text-slate-700 space-y-1">
          <li>• Complete syllabus coverage (100%)</li>
          <li>• 1,000+ interactive H5P activities</li>
          <li>• 2,000+ past paper questions integrated from first lesson</li>
          <li>• Spaced retrieval system (automated reviews)</li>
          <li>• Mock exams with enhanced solutions</li>
          <li>• Progress tracking dashboard</li>
        </ul>

        <p className="text-[14px] text-slate-700">
          AVAILABLE SUBJECTS: Math, Physics, Chemistry, Biology, Urdu, Islamiat,
          Pakistan Studies, Economics, Business Studies
        </p>

        <p className="text-[14px] text-slate-700">
          DELIVERY: Self-Learning (24/7 access)
        </p>

        <p className="text-[14px] text-slate-700">
          DURATION: Flexible - complete at your own pace
        </p>

        


        <p className="text-[14px] text-slate-700">
          Research Foundation: Spiral learning & retrieval practice
          (Bruner, 1960; Karpicke & Roediger, 2008)
        </p>

      </div>

      {/* BUTTONS */}
      <div className="mt-auto pt-6 flex flex-col sm:flex-row gap-3">

        <Link href="/programs" className="w-full">
          <Button className="w-full bg-[#2366c9] hover:bg-blue-700 text-white">
            READ MORE
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>

        <Button className="w-full bg-white border border-[#2366c9] text-[#2366c9] hover:bg-blue-50">
          REGISTER
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

      </div>

    </CardContent>
  </Card>


  {/* CARD 2 */}
  <Card className="border-[#2366c9]   border-2   rounded-3xl bg-white shadow-sm hover:shadow-xl transition-all duration-300">
    <CardContent className="p-8 flex flex-col h-full text-left">

      <div className="space-y-4">

        <h3 className="text-2xl font-semibold text-slate-900">
          REAL-TIME EXAM PREPARATION PROGRAM
        </h3>

        <p className="text-[14px] font-semibold text-slate-700">
          Master Cambridge Past Papers with Enhanced Solutions
        </p>

        <p className="text-[14px] text-slate-700">
          Practice with actual Cambridge O-Level past papers under exam
          conditions - then learn from detailed, enhanced solutions instantly.
        </p>

        <p className="text-[14px] font-semibold text-slate-900">
          WHAT YOU GET:
        </p>

        <ul className="text-[14px] text-slate-700 space-y-1">
          <li>✓ 20+ Actual Cambridge Past Papers per subject</li>
          <li>✓ Timed Exam Experience - Real exam limits</li>
          <li>✓ Instant Enhanced Solutions - MCQ explanations</li>
          <li>✓ Essay Paper Solutions - Model answers</li>
          <li>✓ 2-Year Access - Unlimited practice</li>
          <li>✓ 8 Core Subjects coverage</li>
        </ul>

        <p className="text-[14px] text-slate-700">
          PERFECT FOR: Last-minute exam preparation (3–6 months),
          year-round practice, understanding Cambridge marking schemes,
          and identifying weak areas.
        </p>

        <p className="text-[14px] text-slate-700">
          DELIVERY: Self-Learning (on-demand)
        </p>

        <p className="text-[14px] text-slate-700">
          AVAILABILITY: Standalone - no subscription required
        </p>

     

      </div>

      {/* BUTTONS */}
      <div className="mt-auto pt-6 flex flex-col sm:flex-row gap-3">

        <Button className="w-full bg-[#2366c9] hover:bg-blue-700 text-white">
          START EXAM PREP
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

        <Button className="w-full bg-white border border-[#2366c9] text-[#2366c9] hover:bg-blue-50">
          VIEW SAMPLE PAPER
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

      </div>

    </CardContent>
  </Card>

</div>

 <Card className="border-[#2366c9]   border-2  rounded-3xl bg-white shadow-sm mb-10">
  <CardContent className="p-8 text-left space-y-4">
    <h3 className="text-2xl font-semibold text-slate-900">ENGLISH LANGUAGE MASTERY COURSES</h3>
    <p className="text-[14px] font-semibold text-slate-700">Cambridge O-Level Paper 1 & Paper 2 - Targeted Skill Development</p>
    <p className="text-[14px] text-slate-700">Standalone Program - Not Included in Any Bundle</p>
    <p className="text-[14px] text-slate-700">Two dedicated courses - one for each English Language paper - built entirely from real Cambridge past papers, official Band 1 rubrics, and proven exam technique training.</p>

    <div className="grid md:grid-cols-2 gap-4">
      <div className="rounded-xl border border-slate-200 bg-blue-50/40 p-4 text-[14px] text-slate-700 space-y-2">
        <p className="font-semibold text-slate-900">COURSE 1 - COMPREHENSION MASTERY (Paper 1) </p>
        <p>Built around 8 complete Cambridge past paper modules. Each past paper is taught through a 9-step Learning Mastery System.</p>
        <p>✓ Full vocabulary preview before each reading passage</p>
        <p>✓ Scanning & skimming technique training per text</p>
        <p>✓ MCQs with complete justifications - not just answer keys</p>
        <p>✓ Actual Cambridge exam questions with model answers</p>
        <p>✓ Questions categorised as Literal / Inferential / Evaluative - the exact taxonomy Cambridge examiners use</p>
        <p>✓ Exam Skills Tip for each question type</p>
        <p>✓ Higher-order Challenge Corner for Band 1 performance</p>
        <p>✓ 100% interactive H5P - no passive reading or videos</p>
        <p>Perfect For: Students who lose marks on inference and "own words" questions - the 2 most common failure points in Paper 1.</p>
 
        <p className="font-semibold text-slate-900">PERFECT FOR - COMPREHENSION MASTERY (Paper 1)</p>
        <p>✓ Students who find the answer but lose marks writing it</p>
        <p>✓ Students who copy text instead of answering in own words</p>
        <p>✓ Students who cannot distinguish Literal from Inferential questions</p>
        <p>✓ Students who re-read passages repeatedly and run out of time</p>
        <p>✓ Students aiming for Band 1 but stuck just below it</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-blue-50/40 p-4 text-[14px] text-slate-700 space-y-2">
        <p className="font-semibold text-slate-900">COURSE 2 - COMPOSITION MASTERY (Paper 2)  </p>
        <p>Three progressive courses take students from Band 3 writing to Band 1 excellence - step by step:</p>
        <p> F1 - Essay Types & Structure</p>
        <p> F2 - 10-Day Band 3 → Band 1 Bridge</p>
        <p> Complete Mastery - Band 3 to Band 1 - The Cambridge Composition Transformation Course with complete training</p>
        <p>✓ 120+ H5P interactive activities</p>
        <p>✓ 30+ authentic O-Level exam prompts</p>
        <p>✓ 4 timed essays under real exam conditions</p>
        <p>✓ Official Band 1 rubric taught and applied throughout</p>
        <p>✓ 60+ vocabulary words - all from O-Level past papers</p>
        <p>✓ AI Chatbot support integrated</p>
        <p>✓ Portfolio tracks growth from first to final essay</p>
        <p>✓ Certificate on completion</p>
     
       
        <p className="font-semibold text-slate-900">PERFECT FOR - COMPOSITION MASTERY (Paper 2)</p>
        <p>✓ Students whose essays are "correct" but never rise above Band 3</p>
        <p>✓ Students who go blank when they see the exam prompt</p>
        <p>✓ Students using simple, repetitive vocabulary they cannot upgrade</p>
        <p>✓ Students who only attempt Narrative and avoid other essay types</p>
        <p>✓ Students who have never been shown - sentence by sentence - exactly what separates their writing from Band 1</p>
      </div>
    </div>

    <div className="grid md:grid-cols-3 gap-3 pt-2">
      <Button className="w-full bg-[#2366c9] hover:bg-blue-700 text-white">
        ENROLL IN COMPREHENSION   <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      <Button className="w-full bg-[#2366c9] hover:bg-blue-700 text-white">
        ENROLL IN COMPOSITION   <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      <Button className="w-full bg-[#2366c9] hover:bg-blue-700 text-white">
        GET BOTH - BUNDLE  <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  </CardContent>
</Card>

   <div className="grid lg:grid-cols-3 gap-6 mb-10">

  {/* CARD 1 */}
  <Card className="border-[#2366c9]   border-2   rounded-3xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
    <CardContent className="p-6 flex flex-col h-full justify-between">

      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-slate-900">FOUNDATIONAL O-LEVEL BRIDGE COURSES</h3>
        <p className="text-[14px] font-semibold text-slate-700">Fix Weak Foundations Before O-Level Starts • Diagnose • Repair • Strengthen</p>
        <p className="text-[14px] text-slate-700">Targeted remedial courses fixing Grade 6–8 gaps before entering O-Level. Prevents compounding knowledge gaps.</p>
     <p className="text-[14px] text-slate-700">Results: Designed to support 60%+ in standard tests.</p>
      </div>

      {/* BUTTONS */}
      <div className="grid gap-2 mt-6">
        <Button className="w-full bg-[#2366c9] hover:bg-blue-700 text-white">
          START BRIDGE COURSES <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <InquiryDialog
          defaultType="diagnostic"
          title="Free Diagnostic"
          trigger={
            <Button className="w-full bg-white border border-[#2366c9] text-[#2366c9] hover:bg-blue-50">
              FREE DIAGNOSTIC FIRST <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          }
        />
      </div>
    </CardContent>
  </Card>

  {/* CARD 2 */}
  <Card className="border-[#2366c9]   border-2   rounded-3xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
    <CardContent className="p-6 flex flex-col h-full justify-between">

      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-slate-900">ATP COURSES - PAPER 4 ALTERNATIVE</h3>
        <p className="text-[14px] font-semibold text-slate-700">Virtual Lab Training for Unseen Practical Exams • Unseen • Analytical • Conceptual</p>
        <p className="text-[14px] text-slate-700">Complete replacement for O-Level Paper 4 (Practical) with virtual lab skill development and unseen question training.</p>
         <p className="text-[14px] text-slate-700">NOTE: NOT included in annual packages - separate add-on</p>
      </div>

      {/* BUTTONS */}
      <div className="grid gap-2 mt-6">
        <Button className="w-full bg-[#2366c9] hover:bg-blue-700 text-white">
          START ATP COURSES <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button className="w-full bg-white border border-[#2366c9] text-[#2366c9] hover:bg-blue-50">
          VIEW SAMPLE ACTIVITIES <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </CardContent>
  </Card>

  {/* CARD 3 */}
  <Card className="border-[#2366c9]   border-2   rounded-3xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
    <CardContent className="p-6 flex flex-col h-full justify-between">

      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-slate-900">CERTIFIED TUTOR NETWORK</h3>
        <p className="text-[14px] font-semibold text-slate-700">Better Than Traditional Providers - Same Price, 10× Support</p>
        <p className="text-[14px] text-slate-700">Professional tutor matching service with FREE platform resources for both students and teachers. Quality guaranteed.</p>
         <p className="text-[14px] text-slate-700">NO EXTRA CHARGES - Just teacher fee. All platform resources 100% FREE.</p>
      </div>

      {/* BUTTONS */}
      <div className="grid gap-2 mt-6">
        <Button className="w-full bg-[#2366c9] hover:bg-blue-700 text-white">
          REQUEST A TUTOR <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button className="w-full bg-white border border-[#2366c9] text-[#2366c9] hover:bg-blue-50">
          BECOME A TUTOR <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </CardContent>
  </Card>

</div>

<Card className="border-[#2366c9] border-2 rounded-3xl bg-white shadow-sm mb-10">
  <CardContent className="p-8">
    <h3 className="text-2xl font-semibold text-center text-slate-900 mb-8 uppercase tracking-tight">
      Pakistan Board & ECAT Programs
    </h3>
    <div className="grid md:grid-cols-3 gap-6">
      
      {/* MATRIC CARD */}
      <div className="p-6 rounded-xl border border-blue-100 bg-blue-50/30 text-left flex flex-col h-full">
        <div className="mb-6">
          <h4 className="font-bold text-slate-900 text-lg mb-2">
            MATRIC <span className="text-xs font-medium text-slate-500">(Grades 9–10)</span>
          </h4>
          <p className="text-[14px] text-slate-700 leading-relaxed">
            <span className="font-semibold">Subjects:</span> English, Math, Physics, Chemistry, Biology
          </p>
        </div>
        <div className="mt-auto">
          <Button className="w-full bg-[#2366c9] hover:bg-blue-700 font-semibold py-5">
            ENROLL NOW <ArrowRight className="ml-2 h-2 w-4" />
          </Button>
        </div>
      </div>

      {/* FSc / ICS CARD */}
      <div className="p-6 rounded-xl border border-blue-100 bg-blue-50/30 text-left flex flex-col h-full">
        <div className="mb-6">
          <h4 className="font-bold text-slate-900 text-lg mb-2">
            FSc / ICS <span className="text-xs font-medium text-slate-500">(Intermediate)</span>
          </h4>
          <p className="text-[14px] text-slate-700 leading-relaxed">
            <span className="font-semibold">Subjects:</span> English, Math, Physics, Chemistry, Biology
          </p>
        </div>
        <div className="mt-auto">
          <Button className="w-full bg-[#2366c9] hover:bg-blue-700 font-semibold py-5">
            ENROLL NOW <ArrowRight className="ml-2 h-2 w-4" />
          </Button>
        </div>
      </div>

      {/* ECAT CARD */}
      <div className="p-6 rounded-xl border border-blue-100 bg-blue-50/30 text-left flex flex-col h-full">
        <div className="mb-6">
          <h4 className="font-bold text-slate-900 text-lg mb-2">
            ECAT <span className="text-xs font-medium text-slate-500">(Engineering Entry Test)</span>
          </h4>
          <p className="text-[14px] text-slate-700 leading-relaxed">
            <span className="font-semibold">Subjects:</span> Math, Physics, Chemistry, English
          </p>
        </div>
        <div className="mt-auto">
          <Button className="w-full bg-[#2366c9] hover:bg-blue-700 font-semibold py-5">
            ENROLL NOW <ArrowRight className="ml-2 h-2 w-4" />
          </Button>
        </div>
      </div>

    </div>
  </CardContent>
</Card>

  

    <Card className="border-[#2366c9]   border-2  border-2 rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-50 to-white shadow-sm">
      <CardContent className="p-8 md:p-10">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-3">COMING IN FEW MONTHS: A-LEVEL SUBJECTS</h3>
          <p className="text-black mb-4">Expanding to A-Level with the same research-backed 8-Step methodology.</p>
          <p className="text-[14px] text-slate-700 mb-6">Initial Subjects (In Development): Mathematics (AS + A2), Physics (AS + A2), Chemistry (AS + A2), Biology (AS + A2), Economics (AS + A2), Business Studies (AS + A2)</p>

          <div className="max-w-xl mx-auto text-left mb-8">
            <ul className="text-[14px] text-slate-700 space-y-2">
              <li>✓ Complete syllabus coverage</li>
              <li>✓ Interactive H5P activities</li>
              <li>✓ Past paper practice integrated</li>
              <li>✓ Spaced retrieval system</li>
              <li>✓ Same 10X Learning Leap Model™</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button className="w-full sm:w-auto min-w-[250px] bg-[#2366c9] hover:bg-blue-700">NOTIFY ME WHEN LAUNCHED</Button>
            <Button variant="outline" className="w-full sm:w-auto min-w-[220px] border-[#2366c9] text-[#2366c9]">EXPRESS INTEREST</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</section>

{/* SECTION 4A: THE EDUMEUP 8-STEP LEARNING SYSTEM */}
<section className="py-20 md:py-28 bg-white">
  <div className="container-custom max-w-7xl">

    {/* Section Header */}
    <div className="text-center max-w-3xl mx-auto mb-16">
{/* OVERLINE = 10px */}
  <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
    8-Step System
</p>

 <div className="flex justify-center w-full">
        {/* H2 – 60px desktop, responsive mobile size */}
<h2 className="text-4xl md:text-6xl text-slate-900 font-semibold leading-[1.05] mb-3 text-center tracking-tight px-4 md:whitespace-nowrap">
      
   The EduMeUp 8-Step Learning System
  </h2>
</div>

      {/* H5 emphasis = 24px */}
      <p className="text-2xl text-black mb-3">
        From Diagnosis to Exam Mastery - a Complete Learning Loop
      </p>

      {/* Body 1 = 16px */}
      <p className="text-base font-semibold text-blue-700">
        We don't sell content. We run a system.
      </p>
    </div>
  {/* Updated Grid: Centers the last row of cards */}
<div className="flex flex-wrap justify-center gap-6 mb-14">
  {learningSystemSteps.map((item, i) => (
    <Card
      key={i}
      className="group relative border border-slate-200 rounded-2xl bg-white hover:border-blue-200 hover:shadow-xl transition-all w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="h-10 w-10 rounded-lg bg-blue-50 text-[#2366c9] flex items-center justify-center">
            <item.icon className="h-5 w-5" />
          </div>
          <span className="text-[14px] font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
            {item.step}
          </span>
        </div>

        <h3 className="text-2xl font-semibold text-slate-900 leading-tight mb-1">
          {item.title}
        </h3>

        <p className="text-[14px] font-medium text-black mb-3">
          {item.subtitle}
        </p>
        <p className="text-[14px] text-slate-700 leading-relaxed">
          {item.body}
        </p>
      </CardContent>
    </Card>
  ))}
</div>

    <Card className="border-[#2366c9]   border-2   border-blue-200 bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-2xl shadow-sm">
      <CardContent className="p-7">

        <div className="flex flex-wrap items-center justify-center gap-3 text-[16px] font-semibold text-slate-800">

          <span>Diagnose</span>
          <span className="text-blue-500">→</span>

          <span>Repair</span>
          <span className="text-blue-500">→</span>

          <span>Learn</span>
          <span className="text-blue-500">→</span>

          <span>Practice</span>
          <span className="text-blue-500">→</span>

          <span>Assess</span>
          <span className="text-blue-500">→</span>

          <span>Correct</span>
          <span className="text-blue-500">→</span>

          <span>Mock</span>
          <span className="text-blue-500">→</span>

          <span className="text-green-700 font-semibold">Succeed</span>

        </div>

      </CardContent>
    </Card>

  </div>
</section>

<section className="py-20 md:py-28 bg-slate-50">
  <div className="container-custom max-w-6xl mx-auto">

    <div className="text-center mb-12">
  <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
    Tutoring Comparison
</p>
 <div className="flex justify-center w-full">
       <h2 className="text-4xl md:text-6xl text-slate-900 font-semibold leading-[1.05] mb-3 text-center tracking-tight px-4 md:whitespace-nowrap">
         Why Traditional Tutoring Often Fails
       </h2>
</div>
      <p className="text-base text-black">
        Compare traditional tutoring to our structured, research-backed EduMeUp system
      </p>
    </div>

    <div className="overflow-x-auto">
      <div className="min-w-[700px] border-slate-200 rounded-xl overflow-hidden shadow-sm">
        {/* Header Row */}
        
        <div className="flex  bg-[#2366c9]">
          <div className="flex-1 p-5 font-semibold text-left border-r border-slate-200 text-white">
            Feature
          </div>
          <div className="flex-1 p-5 font-semibold text-white text-left border-r border-red-200  ">
            Traditional Tutoring
          </div>
          <div className="flex-1 p-5 font-semibold text-white text-left  ">
            EduMeUp System
          </div>
        </div>

        {/* Rows */}
        {[
          ["Cost per year", "$2,400 – $3,600+", "~$199 – $360"],
          ["Gap identification", "Random, reactive", "Precision AI diagnostic"],
          ["Foundation repair", "Rarely addressed", "Systematic remedial modules"],
          ["Retention strategy", "None - hope it sticks", "Spaced retrieval scheduling"],
          ["Past paper practice", "Ad hoc, teacher-dependent", "Integrated from Day 1"],
          ["Parent visibility", "Monthly verbal updates", "Real-time progress dashboard"],
          ["Student independence", "Increases dependency", "Builds self-learning skills"],
          ["Availability", "3 hours/week max", "24/7 on any device"],
          ["Language support", "None", "Multilingual + audio translation"],
          ["Mock exam readiness", "No structured simulation", "Full timed Cambridge mocks"]
        ].map((row, i) => (
          <div
            key={i}
            className={`flex border-t ${
              i % 2 === 0 ? "bg-slate-50" : "bg-white"
            } hover:bg-slate-100/50 transition-colors`}
          >
            <div className="flex-1 p-5 font-medium text-slate-800 text-left border-r border-slate-200">
              {row[0]}
            </div>
            <div className="flex-1 p-5 text-red-700 text-[14px] text-left border-r border-red-200">
              {row[1]}
            </div>
            <div className="flex-1 p-5 text-green-700 text-[14px] text-left">
              {row[2]}
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="mt-12 text-center">
      <Button className="bg-[#2366c9] hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl text-[14px] shadow-md transition-all">
        See Full Program Advantages <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>

  </div>
</section>

      {/* SECTION: PLATFORM COMPARISON */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-custom max-w-7xl">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
      PLATFORM COMPARISON
            </p>
            <div className="flex justify-center w-full">
              <h2 className="text-4xl md:text-6xl text-slate-900 font-semibold leading-[1.05] mb-3 text-center tracking-tight px-4 md:whitespace-nowrap">
                How EduMeUp Compares to Other EdTech Platforms
              </h2>
            </div>
            <p className="text-lg text-black font-medium">
              Most EdTech platforms deliver content. EduMeUp delivers learning transformation. The difference is structural - not cosmetic.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-md">
            <table className="w-full min-w-[1000px] text-[14px] text-left">
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-black">
                <tr>
                  <th className="p-4 font-semibold w-1/4 text-white bg-[#2366c9]">Feature</th>
                  <th className="p-4 font-semibold text-white bg-[#2366c9]">EduMeUp</th>
                  <th className="p-4 font-semibold text-white bg-[#2366c9]">General AI (ChatGPT/Gemini)</th>
                  <th className="p-4 font-semibold text-white bg-[#2366c9]">Khanmigo</th>
                  <th className="p-4 font-semibold text-white bg-[#2366c9]">Kognity</th>
                  <th className="p-4 font-semibold text-white bg-[#2366c9]">GCSEPod</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {platformComparisonData.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-semibold text-slate-800">{row[0]}</td>
                    <td className="p-4 font-medium text-green-800 bg-green-50/70 border-x border-green-200">{row[1]}</td>
                    {row.slice(2).map((cell, j) => (
                      <td key={j} className={`p-4 font-medium ${cell.toLowerCase() === 'none' ? 'text-red-600' : 'text-black'}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

    {/* SECTION 4C: PLATFORM FEATURES */}
<section className="py-20 md:py-28 bg-slate-50">
  <div className="container-custom max-w-6xl mx-auto">

    <div className="text-center max-w-3xl mx-auto mb-16">
     <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
      Platform Features
      </p>
      <div className="flex justify-center w-full overflow-hidden">
       <h2 className="text-4xl md:text-6xl text-slate-900 font-semibold leading-[1.05] mb-3 text-center tracking-tight px-4 md:whitespace-nowrap">
         PLATFORM FEATURES  
       </h2>
      </div>
      <p className="text-base text-black">
        The tools that make independent mastery possible
      </p>
    </div>

    {/* Features Grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        {
          title: "AI Chatbot - Expert on Demand",
          body: "24/7 subject-expert chatbot for instant doubt-solving, concept explanations, and exam strategy guidance."
        },
        {
          title: "Multilingual Translator + Audio",
          body: "Built-in translation in 100+ languages with text-to-audio support for Urdu-medium and multilingual learners."
        },
        {
          title: "H5P Interactive Activities",
          body: "1,000+ interactive exercises across 40+ activity types to convert passive study into active recall and mastery."
        },
        {
          title: "Parent Progress Dashboard",
          body: "Real-time mastery, consistency, weak-topic alerts, and predicted exam readiness in one transparent dashboard."
        }
      ].map((feature, i) => (
        <Card
          key={i}
          className="group border border-blue-100 rounded-3xl bg-white shadow-md hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-start"
        >
          <h3 className="text-2xl font-semibold text-slate-900 mb-4 group-hover:text-[#2366c9] transition-colors leading-tight">
            {feature.title}
          </h3>
          <p className="text-[14px] text-black leading-relaxed mt-auto">
            {feature.body}
          </p>
        </Card>
      ))}
    </div>

    <div className="mt-16 text-center">
      <Button className="bg-[#2366c9] hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl shadow-md transition-all text-[14px]">
        Explore All Features <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>

  </div>
</section>
 <section className="py-20 bg-white">
        <div className="container-custom max-w-6xl">
          <div className="text-center max-w-4xl mx-auto mb-16">
           <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
       WHAT SETS US APART
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold text-[#1e1b4b] mb-4 md:whitespace-nowrap">
              What Makes EduMeUp Unique
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Research-backed learning science",
              "AI-powered diagnostics",
              "Interactive H5P learning modules",
              "Retrieval practice & spaced repetition",
              "Topic-by-topic interactive mastery modules (Grades 1 through O-Level)",
              "Past paper mastery system",
              "Bridge courses for early preparation (Grades 7-8)",
              "Teacher professional development & Cambridge training",
              "School Partnership B2B Model",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <span className="text-[14px] font-semibold text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: THE 10X LEARNING LEAP MODEL */}
  <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50 via-white to-blue-50 relative overflow-hidden">
  <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-blue-200/40 blur-3xl" aria-hidden="true"></div>
  <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl" aria-hidden="true"></div>

  <div className="container-custom relative z-10">
    <div className="text-center max-w-5xl mx-auto mb-14">
       <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
     Research Architecture
      </p>
      <div className="flex justify-center w-full overflow-hidden">
            <h2 className="text-4xl md:text-6xl text-slate-900 font-semibold leading-[1.05] mb-3 text-center tracking-tight px-4 md:whitespace-nowrap">
              The 10X Learning Leap Model
            </h2>
      </div>
      <p className="text-base text-slate-700">
        Why EduMeUp Students Retain 10X More - The Science + The System
      </p>
    </div>

    <div className="mb-14">
      <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 text-center mb-8">
        The Science Behind 10X Retention
      </h3>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-[#2366c9]   border-2   border-blue-100 rounded-2xl bg-white/90 backdrop-blur shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
          <CardContent className="p-6 text-left">
            <h4 className="text-xl font-semibold text-slate-900 mb-2">
              Mastery Learning
            </h4>
            <p className="text-[14px] text-[#2366c9] font-semibold mb-3">
              Bloom (1968)
            </p>
            <p className="text-[15px] text-slate-700 leading-relaxed">
              Students must master each concept before advancing. No topic is left partially understood.
            </p>
          </CardContent>
        </Card>

        <Card className="border-[#2366c9]   border-2   border-blue-100 rounded-2xl bg-white/90 backdrop-blur shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
          <CardContent className="p-6 text-left">
            <h4 className="text-xl font-semibold text-slate-900 mb-2">
              Spaced Retrieval
            </h4>
            <p className="text-[14px] text-[#2366c9] font-semibold mb-3">
              Ebbinghaus (1885), Cepeda (2006)
            </p>
            <p className="text-[15px] text-slate-700 leading-relaxed">
              Reviewing at 1, 3, 7, 14, 30, 90 day intervals rebuilds memory traces and prevents forgetting.
            </p>
          </CardContent>
        </Card>

        <Card className="border-[#2366c9]   border-2   border-blue-100 rounded-2xl bg-white/90 backdrop-blur shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
          <CardContent className="p-6 text-left">
            <h4 className="text-xl font-semibold text-slate-900 mb-2">
              Active Recall
            </h4>
            <p className="text-[14px] text-[#2366c9] font-semibold mb-3">
              Karpicke & Roediger (2008)
            </p>
            <p className="text-[15px] text-slate-700 leading-relaxed">
              Retrieving information from memory is more effective than re-reading. Every H5P activity forces retrieval.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>

    <div>
      <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 text-center mb-8">
        How EduMeUp Delivers 10X - At a Glance
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-[#2366c9]   border-2   border-red-200 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all overflow-hidden">
          <CardContent className="p-6 text-left">
            <div className="h-1 w-full rounded-full bg-red-500 mb-5"></div>
            <h4 className="text-xl font-semibold text-red-600 mb-4">
              Traditional Model - 5% Retention
            </h4>
            <ul className="space-y-2 text-[14px] text-slate-700">
              <li>• Lectures 5%</li>
              <li>• Textbook reading 10%</li>
              <li>• No diagnostic - gaps accumulate</li>
              <li>• Exam panic - no simulation</li>
              <li>• Tutor dependency - no independence</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-[#2366c9]   border-2   border-green-200 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all overflow-hidden">
          <CardContent className="p-6 text-left">
            <div className="h-1 w-full rounded-full bg-green-500 mb-5"></div>
            <h4 className="text-xl font-semibold text-green-700 mb-4">
              EduMeUp Model - 50%+ Retention
            </h4>
            <ul className="space-y-2 text-[14px] text-slate-700">
              <li>• Interactive H5P activities 50-75%</li>
              <li>• Active retrieval practice 75-90%</li>
              <li>• Diagnostic-first - gaps fixed</li>
              <li>• Timed mock exams - exam ready</li>
              <li>• 8-step system - self-directed</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</section>
 
  {/* SECTION 6: STUDENT SUCCESS PATH */}
<section id="student-section" className="py-20 md:py-28 bg-gradient-to-b from-blue-50 via-white to-slate-50">
  <div className="container-custom">

    <div className="text-center max-w-4xl mx-auto mb-16">
       <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
     Guided Timeline
      </p>
<div className="flex justify-center w-full">
     <h2 className="text-4xl md:text-6xl text-slate-900 font-semibold leading-[1.05] mb-3 text-center tracking-tight px-4 md:whitespace-nowrap">
       Your Child's Journey  
     </h2>
</div>
      <p className="text-base text-black">
        A clear, step-by-step pathway - nothing left to chance
      </p>
    </div>
    <div className="relative mb-16">
      <div className="hidden lg:block absolute top-6 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-200 via-[#2366c9] to-blue-200"></div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 lg:gap-6">
        {[
          "Diagnostic\nDay 1",
          "Repair\nWeeks 1–4",
          "Learn\nOngoing",
          "Practice\nFrom Day 1",
          "Assess\nPer Unit",
          "Correct\nAuto-routed",
          "Mock Exam\nPre-finals",
          "Succeed\nO-Level Day"
        ].map((node, i) => (
          <div
            key={i}
            className="relative rounded-xl h-[110%] border border-blue-100 bg-white p-5 text-center shadow-sm hover:shadow-lg transition hover:-translate-y-1"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#2366c9] text-white text-[14px] flex items-center justify-center font-semibold shadow-sm">
              {i + 1}
            </div>
            <p className="text-xs font-semibold text-slate-700 whitespace-pre-line pt-4 leading-tight">
              {node}
            </p>
          </div>
        ))}
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
      {[
        {
          title: "Month 1–2: Diagnostic + Repair",
          points: [
            "Complete AI diagnostic assessment",
            "Identify exact gaps from Grade 6–8",
            "Begin targeted remedial modules",
            "No new O-Level content until foundations are solid"
          ]
        },
        {
          title: "Month 3–6: Interactive Learning + Practice",
          points: [
            "H5P interactive concept modules begin",
            "Cambridge past paper practice integrated from first lesson",
            "Spaced retrieval reviews scheduled automatically",
            "Formative checks at end of each unit"
          ]
        },
        {
          title: "Month 7–10: Deep Mastery + Assessment",
          points: [
            "Full subject coverage in progress",
            "Corrective study loops for weak topics",
            "Regular unit-based formative assessments",
            "Parent dashboard updated in real time"
          ]
        },
        {
          title: "Month 11–12: Mock Exams + Final Readiness",
          points: [
            "Full-length timed Cambridge-style mock exams",
            "Exam strategy and stamina training",
            "Final weak-topic corrective loops",
            "Student enters exam day prepared and confident"
          ]
        }
      ].map((phase, i) => (
        <Card
          key={i}
          className="border border-slate-200 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all"
        >
          <CardContent className="p-8">
            <h4 className="flex items-center gap-3 text-2xl font-semibold text-slate-900 mb-6 leading-tight">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-[#2366c9] text-base font-semibold shrink-0">
                {i + 1}
              </span>
              {phase.title}
            </h4>
            <ul className="space-y-3 text-[14px] text-slate-700 font-medium">
              {phase.points.map((p, j) => (
                <li key={j} className="leading-relaxed">• {p}</li>
              ))}
            </ul>

          </CardContent>
        </Card>
      ))}
    </div>

  </div>
</section>

{/* SECTION 7: PRICING COMPARISON CARDS */}
{/* SECTION: PRICE INTELLIGENCE */}
<section id="teacher-section" className="py-20 md:py-28 bg-slate-50">
  <div className="container-custom">
    <div className="text-center max-w-4xl mx-auto mb-14">
     <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
       Price Intelligence
      </p>
      <div className="flex justify-center w-full">
           <h2 className="text-4xl md:text-6xl text-slate-900 font-semibold leading-[1.05] mb-3 text-center tracking-tight px-4 md:whitespace-nowrap">
             Transparent Pricing - No Hidden Fees
           </h2>
      </div>
      <p className="text-base text-black">
        World-class Cambridge preparation at a fraction of tutor costs
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      {[
        ["Pre-O-Level Victory Program", "$199/year", "$360/year", "Full prep - Grade 7–8 students"],
        ["Complete O-Level (per subject)", "$65/year", "N/A", "Individual subject mastery"],
        ["4 Subjects Bundle", "$170/year", "N/A", "Save $90 vs individual"],
        ["8 Subjects Bundle", "$299/year", "N/A", "Full Cambridge subject coverage"],
        ["Bridge Courses (all 5)", "$250 one-time", "N/A", "Foundation repair pre-O-Level"],
        ["Real-Time Exam Prep (all 8 subj)", "$250 (2-yr)", "N/A", "Final 3–6 months exam focus"],
        ["ATP Courses (all 3)", "$299", "N/A", "Paper 4 practical replacement"],
        ["Certified Online Tutor", "$80–150/month", "-", "Structured 1-on-1 support"],
        ["Matric (all subjects)", "$18/mo or $160/yr", "N/A", "Pakistan Board Grades 9–10"],
        ["FSc / ICS (all subjects)", "$20/mo or $199/yr", "N/A", "Intermediate Board students"],
        ["ECAT (all 5 subjects)", "$140 (2-yr)", "N/A", "Engineering entry test prep"]
      ].map((item, i) => (
        <Card
          key={i}
          className="border border-slate-200 rounded-2xl bg-white shadow-md hover:shadow-xl transition hover:-translate-y-1 flex flex-col"
        >
          <CardContent className="p-7 flex flex-col justify-between h-full">
            <div className="mb-1">
              <h3 className="text-2xl font-semibold text-slate-900 mb-2 leading-tight">
                {item[0]}
              </h3>
              <p className="text-xs text-black">{item[3]}</p>
            </div>

             
          </CardContent>
        </Card>
      ))}
    </div>
 
  </div>
</section>

{/* SECTION 8: PARENT TRANSPARENCY DASHBOARD */}
<section className="py-16 md:py-24 bg-white">
  <div className="container-custom">
    <div className="text-center max-w-5xl mx-auto mb-12">
    <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
        Parent Control Room
      </p>
      <div className="flex justify-center w-full">
          <h2 className="text-4xl md:text-6xl text-slate-900 font-semibold leading-[1.05] mb-3 text-center tracking-tight px-4 md:whitespace-nowrap">
            Parents See Everything 
          </h2>
      </div>
      <p className="text-base text-black">
        Real-time visibility into your child's learning - not just exam results
      </p>
    </div>

    <Card className="border-[#2366c9]   border-2  rounded-2xl bg-slate-50 shadow-sm mb-10">
      <CardContent className="p-6 md:p-10">
        {/* OVERLINE = 10px */}
        <h4 className="text-[14px] font-semibold text-slate-700 uppercase tracking-wide mb-6">
          Parent Dashboard Mockup
        </h4>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {[
              ["Math Mastery", 82],
              ["Physics Mastery", 74],
              ["Chemistry Mastery", 68]
            ].map(([subject, percent], i) => (
              <div key={i}>
                <div className="flex justify-between text-[14px] text-black mb-2 font-medium">
                  <span>{subject}</span>
                  <span>{percent}%</span>
                </div>
                <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <p className="text-xs font-semibold text-slate-700 mb-4">Topic Heat Map</p>
            <div className="grid grid-cols-4 gap-2">
              {[
                "bg-green-400", "bg-green-500", "bg-yellow-300", "bg-red-400",
                "bg-green-500", "bg-yellow-300", "bg-yellow-400", "bg-red-500",
                "bg-green-400", "bg-green-500", "bg-yellow-300", "bg-orange-400"
              ].map((color, i) => (
                <div key={i} className={`h-8 rounded ${color}`}></div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {[
        ["Mastery Progress", "Topic-by-topic mastery % updated after every activity"],
        ["Weak Topic Alerts", "Identifies struggling areas before they become exam problems"],
        ["Study Consistency", "Daily and weekly activity tracking - know if your child is engaging"],
        ["Exam Readiness Score", "Predicted readiness level updated throughout the year"]
      ].map(([title, desc], i) => (
        <Card
          key={i}
          className="border border-blue-100 rounded-2xl bg-white shadow-md hover:shadow-xl transition hover:-translate-y-1"
        >
          <CardContent className="p-7">
            <h4 className="text-2xl font-semibold text-slate-900 mb-3 leading-tight">
              {title}
            </h4>
            <p className="text-[14px] text-black leading-relaxed">
              {desc}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>

    <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 shadow-sm">
      <h4 className="text-2xl font-semibold text-slate-900 mb-5">
        What Parents Love Most:
      </h4>
      <ul className="space-y-3 text-[14px] text-slate-700">
        <li>✓ No more "I don't know how the test went" - results instantly visible</li>
        <li>✓ Know which topics need attention before the exam</li>
        <li>✓ Track daily study consistency</li>
        <li>✓ Compare current mastery vs target for O-Level</li>
        <li>✓ Data-backed insights for every conversation with teachers</li>
      </ul>
    </div>
  </div>
</section>

 {/* SECTION 9: FREE RESOURCES LIBRARY */}
<section className="py-16 md:py-24 bg-slate-50">
  <div className="container-custom">
    <div className="text-center max-w-4xl mx-auto mb-12">
      <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
     Starter Pack
      </p>
      <div className="flex justify-center w-full  ">
          <h2 className="text-4xl md:text-6xl text-slate-900 font-semibold leading-[1.05] mb-3 text-center tracking-tight px-4 md:whitespace-nowrap">
            Free Resources to Get Started
          </h2>
      </div>
      <p className="text-base text-black">
        No login required - download and use immediately
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-6">
      {[
        ["O-Level Survival Guide for Pakistani Parents", "20-page PDF covering Cambridge curriculum, gap analysis, tutor cost comparison, and what to ask your school.", "DOWNLOAD FREE"],
        ["Free AI Diagnostic Assessment", "90-minute AI-powered test that maps your child's exact knowledge gaps and generates a personalized learning report.", "START FREE"],
        ["O-Level Subject Checklist", "Topic-by-topic readiness checklist for every O-Level subject. Know exactly where your child stands before preparation begins.", "DOWNLOAD FREE"]
      ].map((res, i) => (
        <Card
          key={i}
          className="border border-blue-100 rounded-2xl bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden flex flex-col"
        >
          <CardContent className="p-7 flex flex-col h-full justify-between">
            <div>
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-[#2366c9]">
                {i === 0 ? <Download className="h-6 w-6" /> : i === 1 ? <PlayCircle className="h-6 w-6" /> : <Calendar className="h-6 w-6" />}
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-3 leading-tight">
                {res[0]}
              </h3>
              <p className="text-[14px] text-black leading-relaxed">
                {res[1]}
              </p>
            </div>

            <Button className="w-full mt-6 bg-[#2366c9] hover:bg-blue-700 text-white font-semibold flex items-center justify-center text-[14px] py-3">
              {res[2]} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>

{/* SECTION 10: ABOUT EDUMEUP / OUR STORY */}
<section className="py-16 md:py-24 bg-white relative overflow-hidden">
  <div className="absolute -top-20 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-blue-100/50 blur-3xl" aria-hidden="true"></div>

  <div className="container-custom">
    <div className="text-center max-w-4xl mx-auto mb-12">
       <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
     Founder Story
      </p>
      <div className="flex justify-center w-full  ">
            <h2 className="text-4xl md:text-6xl text-black font-semibold leading-[1.05] mb-3 text-center tracking-tight px-4 md:whitespace-nowrap">
              Why We Built EduMeUp
            </h2>
      </div>
      <p className="text-base text-black">
        Born from 30+ years inside classrooms, not in a tech lab
      </p>
    </div>

    <div className="grid lg:grid-cols-2 gap-8">
      <Card className="border-[#2366c9]   border-2   border-blue-100 rounded-2xl bg-gradient-to-br from-blue-50 via-white to-white shadow-lg hover:shadow-xl transition">
        <CardContent className="p-8 text-left">
          <h3 className="text-2xl font-semibold text-slate-900 mb-5 leading-tight">
            The Problem We Saw Every Day
          </h3>
          <p className="text-[14px] text-slate-700 mb-4 leading-relaxed">
            Students attended tuition daily and parents spent heavily, yet exams still exposed gaps, weak retention, and panic.
          </p>
          <p className="text-[14px] text-slate-700 mb-4 font-medium">
            The real problem was not content scarcity. It was the absence of a learning system:
          </p>

          <ul className="space-y-3 text-[14px] text-slate-700">
            <li>• No precise diagnostic of missing skills</li>
            <li>• No foundation repair before advancement</li>
            <li>• No spacing strategy against forgetting</li>
            <li>• No transparent parent visibility</li>
            <li>• No pathway to student independence</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="border-[#2366c9]   border-2   border-blue-100 rounded-2xl bg-gradient-to-b from-blue-50/60 to-white shadow-sm hover:shadow-lg transition-all">
        <CardContent className="p-8 text-left">
          <h3 className="text-2xl font-semibold text-slate-900 mb-5 leading-tight">
            The Solution We Designed
          </h3>
          <p className="text-[14px] text-slate-700 mb-4 leading-relaxed">
            EduMeUp combines learning science, interactive technology, and 30+ years of school leadership into one structured mastery platform.
          </p>
          <ul className="space-y-3 text-[14px] text-slate-700 mb-6">
            <li>✓ M.Phil Educational Planning & Management</li>
            <li>✓ 30+ years as Principal & Deputy Director</li>
            <li>✓ Cambridge curriculum specialization</li>
            <li>✓ Research-backed 10X Learning Leap model</li>
            <li>✓ Moodle + H5P + AI learning ecosystem</li>
          </ul>
          <p className="text-[14px] italic text-slate-700 border-l-4 border-[#2366c9] pl-5 py-3 bg-blue-50 rounded-r-lg leading-relaxed">
            "Every student can master difficult subjects when they have a system that finds gaps, repairs them, and builds lasting memory."
          </p>
          <p className="text-xs text-black mt-4 font-medium">
            - M.B.Yameen, Chief Adviser, EduMeUp
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
</section>

  {/* SECTION 11: TESTIMONIALS / SOCIAL PROOF */}
<section className="py-16 md:py-24 bg-slate-50">
  <div className="container-custom">
    <div className="text-center max-w-4xl mx-auto mb-12">
       <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
     Social Proof
      </p>
      <div className="flex justify-center w-full  ">
         <h2 className="text-4xl md:text-6xl text-slate-900 font-semibold leading-[1.05] mb-3 text-center tracking-tight px-4 md:whitespace-nowrap">
           What Students & Parents Say
         </h2>
      </div>
      <p className="text-base text-black">
        Real results from real families
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-6">
      {[
        ["A.K.", "Parent", "For the first time, I can actually see where my child is struggling - not just hear 'he'll be fine' from the tutor. The diagnostic alone was eye-opening."],
        ["S.M.", "O-Level Student", "I used to rely on three tutors. After EduMeUp diagnosed my gaps and gave me targeted modules, I reduced to one - and my grades improved."],
        ["F.H.", "School Principal", "We partnered with EduMeUp and immediately had something genuinely new to offer parents. The $678 value we provide through the school gives our families a real advantage."]
      ].map((t, i) => (
        <Card
          key={i}
          className="border border-slate-200 rounded-xl bg-white shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col"
        >
          <CardContent className="p-7 text-left flex flex-col h-full">
            <div className="mb-4">
              <p className="text-yellow-500 text-xl">★★★★★</p>
            </div>
            <p className="text-[14px] text-slate-700 mb-6 leading-relaxed flex-grow">
              "{t[2]}"
            </p>
            <p className="font-semibold text-[#2366c9] text-base">{t[0]}</p>
            <p className="text-xs text-black">{t[1]}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>

{/* SECTION 12: FREQUENTLY ASKED QUESTIONS */}
<section className="py-16 md:py-24 bg-white">
  <div className="container-custom">
    <div className="text-center max-w-4xl mx-auto mb-12">
      <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
      FAQ
      </p>
      <div className="flex justify-center w-full  ">
         <h2 className="text-4xl md:text-6xl text-slate-900 font-semibold leading-[1.05] mb-3 text-center tracking-tight px-4 md:whitespace-nowrap">
           Parents Ask. We Answer.
         </h2>
      </div>
    </div>
    <div className="max-w-5xl mx-auto space-y-4">
      {[
        ["Is EduMeUp replacing my child's school or tutor?", "No. EduMeUp is a structured supplemental learning system. It fills gaps that school and tutors leave behind, builds independent learning skills, and significantly reduces - but does not force the elimination of - tutor dependency. Many families use EduMeUp to reduce from 3 tutors to 1 while improving results."],
        ["My child already has tutors. Why would they need EduMeUp?", "Tutors teach - but rarely diagnose, repair foundations, schedule spaced reviews, or simulate timed exams. EduMeUp does all four systematically. It works with tutors, not against them. Tutors can use EduMeUp's diagnostic reports to teach more efficiently."],
        ["How is this different from YouTube or other online courses?", "YouTube provides content passively. EduMeUp is an active system: it first diagnoses what your child needs, then delivers interactive modules requiring active engagement, then schedules retrieval reviews, then assesses and corrects. Passive consumption = 5–20% retention. Active retrieval = 50–90% retention."],
        ["My child struggles with English. Will the platform work?", "Yes. EduMeUp includes a built-in multilingual translator with audio support, specifically designed for Urdu-medium students transitioning to Cambridge English-medium curriculum. Language barriers are addressed from Day 1."],
        ["Is this suitable for students outside Pakistan?", "Absolutely. The Cambridge O-Level and IGCSE curriculum is international. EduMeUp serves students globally wherever Cambridge exams are taken."],
        ["What if my child doesn't complete the required attendance or tasks?", "For the Teacher-Led program, the 60% Performance Designed Outcome guarantee requires 80% attendance and 80% task completion. For Self-Learning, students work at their own pace. The system tracks all activity so parents can monitor engagement in real time."],
        ["How do I know which program is right for my child?", "Take the Free AI Diagnostic first. It takes 90 minutes and generates a personalised report showing exactly which gaps exist and which program pathway best addresses them. No guesswork."]
      ].map((qa, i) => (
        <Card
          key={i}
          className="border border-slate-200 rounded-xl hover:border-blue-200 hover:shadow-md transition-all overflow-hidden"
        >
          <CardContent className="p-7 text-left">
            <button
              type="button"
              onClick={() => setOpenFaqIndex(prev => (prev === i ? null : i))}
              className="w-full text-left flex items-start justify-between gap-4 group"
            >
              <div className="flex items-start gap-3">
                <HelpCircle className="h-5 w-5 text-[#2366c9] shrink-0 mt-0.5" />
                <h4 className="text-xl font-medium text-slate-900 group-hover:text-[#2366c9] transition-colors leading-tight">
                  {qa[0]}
                </h4>
              </div>
              <span className="text-[#2366c9] font-semibold text-2xl leading-none mt-0.5 shrink-0">
                {openFaqIndex === i ? "−" : "+"}
              </span>
            </button>
            {openFaqIndex === i && (
              <p className="text-[14px] text-slate-700 mt-5 leading-relaxed pl-8">
                {qa[1]}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>

{/* SECTION 13: FINAL CTA */}
<section className="py-20 md:py-32 bg-[#2366c9] from-[#2366c9] to-black text-white relative overflow-hidden">
  <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-[#2366c9] blur-3xl" aria-hidden="true"></div>
  <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#2366c9] blur-3xl" aria-hidden="true"></div>

  <div className="container-custom text-center relative z-10">
    <div className="flex justify-center w-full mb-6">
      <h2 className="text-4xl md:text-6xl text-white font-semibold leading-[1.05] mb-3 text-center tracking-tight px-4 md:whitespace-nowrap">
        Your Child's O-Level Journey Starts with One Decision
      </h2>
    </div>
    <p className="text-base text-blue-200 mb-4 max-w-3xl mx-auto">
      The longer gaps remain unfixed, the harder - and more expensive - they become to repair.
    </p>
    <p className="text-[14px] md:text-xs font-semibold text-blue-300 mb-12 uppercase tracking-wider">
      Next cohort opens soon - Limited seats available
    </p>
    <div className="flex flex-col md:flex-row md:flex-wrap justify-center gap-6 max-w-5xl mx-auto mb-16">
      <InquiryDialog
        defaultType="diagnostic"
        title="Start Free Diagnostic"
        trigger={
       <Button
  size="lg"
  className="w-full md:w-auto min-w-[260px] bg-white text-[#2366c9] hover:bg-blue-50 font-semibold py-3 px-6 rounded-xl text-[14px] shadow-md transition-all flex items-center justify-center gap-2"
>
  START FREE DIAGNOSTIC
  <ArrowRight className="h-4 w-4" />
</Button>
        }
      />

      <Link href="/programs" className="w-full md:w-auto min-w-[320px]">
     <Button
  size="lg"
  variant="outline"
  className="w-full md:w-auto min-w-[260px] border border-white/30 text-white hover:bg-white/10 font-semibold py-3 px-6 rounded-xl text-[14px] shadow-md transition-all flex items-center justify-center gap-2"
>
  EXPLORE ALL PROGRAMS
  <ArrowRight className="h-4 w-4" />
</Button>
      </Link>

    <Button
  size="lg"
  variant="outline"
  className="w-full md:w-auto min-w-[260px] border border-white/30 text-white hover:bg-white/10 font-semibold py-3 px-6 rounded-xl text-[14px] shadow-md transition-all flex items-center justify-center gap-2"
>
  DOWNLOAD FREE GUIDE
  <ArrowRight className="h-4 w-4" />
</Button>
    </div>

    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
      <Card className="border-[#2366c9]   border-2  border-2 bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
        <CardContent className="p-8">
          <h3 className="text-2xl font-semibold text-white mb-4 leading-tight">
            Take the Free AI Diagnostic
          </h3>
          <p className="text-[14px] text-blue-100 mb-6 leading-relaxed">
            The first step costs nothing. The diagnostic finds exactly what is missing and tells you - and your child - precisely what to do next.
          </p>
          <InquiryDialog
            defaultType="diagnostic"
            title="Start Free Diagnostic"
            trigger={
<Button
  size="lg"
  className="w-full bg-[#2366c9] hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl text-[14px] shadow-md transition-all flex items-center justify-center gap-2"
>
  START FREE DIAGNOSTIC NOW
  <ArrowRight className="h-4 w-4" />
</Button>
            }
          />
        </CardContent>
      </Card>

      <Card className="border-[#2366c9]   border-2  border-2 bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
        <CardContent className="p-8">
          <h3 className="text-2xl font-semibold text-white mb-4 leading-tight">
            Explore All Programs
          </h3>
          <p className="text-[14px] text-blue-100 mb-6 leading-relaxed">
            Browse all learning pathways - from Bridge Courses to Complete O-Level Mastery - and compare which best fits your child's current stage.
          </p>
          <Link href="/programs" className="w-full block">
         <Button
  size="lg"
  className="w-full bg-white text-slate-900 hover:bg-blue-50 font-semibold py-3 px-6 rounded-xl text-[14px] shadow-md transition-all flex items-center justify-center gap-2"
>
  EXPLORE ALL PROGRAMS
  <ArrowRight className="h-4 w-4" />
</Button>
          </Link>
        </CardContent>
      </Card>
    </div>

    <p className="mt-12 text-xs text-blue-200 text-center">
      EduMeUp.com | Cambridge O-Level & IGCSE Learning System | Global
    </p>
    <p className="mt-2 text-[11px] text-blue-300 text-center">
      Powered by Moodle 5.2 + H5P + AI | Built on 30+ Years of Educational Research
    </p>
  </div>
</section>
    </Layout>
  );
}
