import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle,CardFooter } from "@/components/ui/card";
import { Zap, Target, LineChart, Trophy, BookOpen, UserCheck, CheckCircle2, MessageSquare, HelpCircle, ShieldCheck, Brain, Layers, Search, RefreshCw, MousePointer2, BarChart3, GraduationCap as GraduationIcon, ArrowRight, Download, Calendar, PlayCircle } from "lucide-react";
import { Link } from "wouter";
import { InquiryDialog } from "@/components/InquiryDialog";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useCurrency } from "@/hooks/use-currency";
import { Badge } from "@/components/ui/badge";
const rotations = [
  "Converting Traditional 5% Retention to 50%+ Active Mastery",
  "Overcoming the Brain's Natural Forgetting Pattern",
  "Removing Language Barriers and Tutor Dependency",
  "Building Self-Learning Skills and Capabilities",
  "Empowering All Education Stakeholders",
  "International Curriculum Mastery for Conceptual & Unseen Exams"
];

const stats = [
  { value: "91%", label: "PASS RATE", sub: "vs 35% National" },
  { value: "47%", label: "A/A* GRADES", sub: "vs 18% Traditional" },
  { value: "75%+", label: "RETENTION", sub: "vs 5-10% Traditional" },
  { value: "85%+", label: "COST SAVINGS", sub: "vs Tutors $2,400-3,600" },
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
  const [currentRotation, setCurrentRotation] = useState(0);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const { formatPrice } = useCurrency();

  const handleCheck = (index: number) => {
    setCheckedItems(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const getResult = () => {
    const count = checkedItems.length;
    if (count === 0) return null;
    if (count <= 3) return {
      title: "Your child may already be well-prepared.",
      desc: "But take our free diagnostic to confirm - you might be surprised by hidden gaps!",
      color: "text-[#2366c9]"
    };
    if (count <= 6) return {
      title: "EduMeUp can help, but may not be critical urgency.",
      desc: "Consider prevention strategy vs crisis management. Explore our Bridge Courses and diagnostic tools.",
      color: "text-[#2366c9]"
    };
    return {
      title: "PERFECT FIT!",
      desc: "Your child is exactly who we designed EduMeUp for. URGENT ACTION RECOMMENDED. EduMeUp will: Fix ALL gaps systematically, Build strong O-Level foundations, Develop self-learning capabilities, Eliminate need for expensive tutors, Guarantee 60%+ results.",
      color: "text-blue-700"
    };
  };

  const result = getResult();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentRotation((prev) => (prev + 1) % rotations.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Layout>
      {/* USER PATH NAVIGATION */}
      <section className="bg-gradient-to-r from-[#2366c9] to-blue-600 text-white py-8 border-b border-blue-700">
        <div className="container-custom text-center">
          <p className="text-label text-blue-100 mb-6">Select Your Role</p>
            <div className="flex flex-wrap justify-center gap-8">
            {[
              { label: "PARENT", id: "parent-section" },
              { label: "SCHOOL", id: "school-section" },
              { label: "TEACHER", id: "teacher-section" },
              { label: "STUDENT", id: "student-section" }
            ].map((role) => (
              <motion.button 
                key={role.label}
                whileHover={{ y: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => role.id ? scrollToSection(role.id) : null}
                className="bg-[#1e1b4b]/50 hover:bg-[#2366c9] px-10 py-5 rounded-3xl font-black flex items-center gap-4 transition-all border-4 border-blue-800 shadow-[0_20px_40px_rgba(0,0,0,0.3)] group backdrop-blur-sm"
              >
                <span className="tracking-widest uppercase">{role.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 1: HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 to-white py-16 md:py-24">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-display-lg text-slate-950 mb-6">
              The Most Comprehensive
              <br />
              <span className="text-[#2366c9]">IGCSE & O-Level</span>
              <br />
              Learning System
            </h1>

            <p className="text-2xl font-semibold text-slate-700 mb-4">
              Built on the Research-Backed 10X Learning Leap Model™
            </p>

            <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Not a content marketplace—a guided learning journey moving students from confusion to confidence
            </p>

            {/* Rotating Value Prop */}
            <div className="h-auto mb-16 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-200 max-w-2xl mx-auto p-8 shadow-sm overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentRotation}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  <span className="text-xl md:text-2xl font-semibold text-slate-900 leading-relaxed">
                    {rotations[currentRotation]}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
              {stats.map((stat, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -4 }}
                  className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm hover:shadow-md hover:border-blue-300 transition-all"
                >
                  <div className="text-4xl md:text-5xl font-bold text-[#2366c9] mb-2">{stat.value}</div>
                  <div className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">{stat.label}</div>
                  <div className="text-xs text-slate-500">{stat.sub}</div>
                </motion.div>
              ))}
            </div>

            <div className="bg-slate-900 text-white py-6 px-8 rounded-xl inline-block mb-16 shadow-lg">
              <p className="text-base font-medium text-center text-white">
                Trusted by 150+ Schools • 50,000+ Students • 25+ Countries
                <span className="block text-blue-300 text-xs mt-2 font-medium">University-Validated Results (2021-2024)</span>
              </p>
            </div>

            {/* FLAGSHIP PROGRAMS */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border border-blue-200 shadow-sm hover:shadow-lg transition-all rounded-2xl overflow-hidden group hover:-translate-y-1">
                <CardContent className="p-8 flex flex-col h-full text-left">
                  <div className="mb-6 text-red-600 font-semibold text-xs bg-red-50 py-1.5 px-3 rounded-lg inline-block">
                    Free Assessment
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">
                    Is Your Child Ready for O-Level?
                  </h3>
                  <p className="text-slate-600 font-medium text-base mb-8">
                    Free 90-minute AI diagnostic to discover exact gaps
                  </p>
                  <div className="mt-auto">
                    <InquiryDialog 
                      defaultType="diagnostic"
                      title="Free Diagnostic Assessment"
                      trigger={
                        <Button className="w-full bg-[#2366c9] hover:bg-blue-700 font-semibold h-12 rounded-lg text-sm shadow-md hover:shadow-lg transition-all text-white">
                          Start Free Diagnostic
                        </Button>
                      } 
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-[#2366c9] shadow-lg hover:shadow-xl transition-all rounded-2xl overflow-hidden bg-blue-50 relative md:scale-105">
                <div className="absolute top-0 right-0 bg-[#2366c9] text-white font-semibold text-xs px-4 py-1.5 rounded-bl-lg">Most Popular</div>
                <CardContent className="p-8 flex flex-col h-full text-left">
                  <div className="mb-6 text-[#2366c9] font-semibold text-xs bg-blue-100 py-1.5 px-3 rounded-lg inline-block">
                    Flagship Program
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">
                    Pre-O-Level Victory Program
                  </h3>
                  <p className="text-slate-600 font-medium text-base mb-8">
                    12-Month Complete Preparation
                  </p>
                  <p className="text-sm text-slate-500 mb-8">
                    Self-Learning: {formatPrice({'PK': 19900, 'GB': 16000, 'US': 19900}, 19900)}/yr<br/>
                    Teacher-Led: {formatPrice({'PK': 36000, 'GB': 30000, 'US': 36000}, 36000)}/yr
                  </p>
                  <div className="mt-auto">
                    <InquiryDialog 
                      defaultType="enrollment"
                      title="Enroll Now"
                      trigger={
                        <Button className="w-full bg-slate-900 hover:bg-black font-semibold h-12 rounded-lg text-sm transition-all text-white">
                          Enroll Now
                        </Button>
                      } 
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-blue-200 shadow-sm hover:shadow-lg transition-all rounded-2xl overflow-hidden group hover:-translate-y-1">
                <CardContent className="p-8 flex flex-col h-full text-left">
                  <div className="mb-6 text-[#2366c9] font-semibold text-xs bg-blue-50 py-1.5 px-3 rounded-lg inline-block">
                    Free Resource
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">
                    O-Level Survival Guide
                  </h3>
                  <p className="text-slate-600 font-medium text-base mb-8">
                    20-page free PDF with essential insights for parents
                  </p>
                  <div className="mt-auto">
                    <Button variant="outline" className="w-full border-2 border-blue-200 text-[#2366c9] font-semibold h-12 rounded-lg text-sm hover:bg-blue-50 transition-all">
                      Download Guide
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 1A: SCHOOL VALUE STRIP */}
      <section id="school-section" className="bg-slate-900 text-white py-16 md:py-20 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white leading-tight">
              Schools: Provide $678 of Premium Content
              <span className="text-blue-400 block mt-2">FREE to Students</span>
            </h2>
            <div className="text-lg text-slate-300 mb-12 leading-relaxed">
              <p className="mb-6">Through EduMeUp partnership, your students receive:</p>
              <ul className="grid sm:grid-cols-2 gap-4 text-left max-w-xl mx-auto mb-8 text-base">
                <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-blue-400 flex-shrink-0" /> Bridge Programs ($250)</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-blue-400 flex-shrink-0" /> ATP Courses ($229)</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-blue-400 flex-shrink-0" /> English Mastery ($199)</li>
                <li className="flex items-center gap-3 font-semibold text-white">Total: $678/student</li>
              </ul>
              <p>Demonstrate tremendous value to families while creating new revenue opportunities.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 text-left">
              <div className="bg-blue-900/40 p-8 rounded-xl border border-blue-800/50 text-left backdrop-blur-sm group hover:bg-blue-900/60 transition-all">
                <h3 className="font-bold text-xl mb-4 text-blue-300">Strategic Partnership</h3>
                <p className="text-slate-300 font-medium leading-relaxed">Lead the educational revolution by delivering world-class content with zero extra cost to families.</p>
              </div>
              <div className="bg-blue-900/40 p-8 rounded-xl border border-blue-800/50 flex flex-col items-center justify-center backdrop-blur-sm group hover:bg-blue-900/60 transition-all">
                <Link href="/schools" className="w-full mb-6">
                  <Button size="lg" className="bg-white text-slate-900 hover:bg-blue-50 font-semibold px-4 h-12 rounded-lg text-sm w-full shadow-lg hover:shadow-xl transition-all">
                    Learn More About School Partnership
                  </Button>
                </Link>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 rounded-full bg-blue-700 border-2 border-blue-900 shadow-md"></div>)}
                  </div>
                  <p className="text-blue-300 font-medium text-sm">Join 150+ School Partners</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Flagship Programs Section */}
      <section className="py-16 md:py-24 bg-slate-50 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Our Flagship Programs</h2>
            <p className="text-lg text-slate-600">Designed for guaranteed success</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {[
              {
                title: "Pre-O-Level Victory",
                target: "Grades 7-8",
                desc: "The most comprehensive 12-month foundation builder.",
                features: ["Foundation Repair", "30-40% Syllabus", "Teacher-Led"],
                price: formatPrice({'PK': 36000, 'GB': 300, 'US': 450}, 36000) + "/yr",
                tag: "Most Popular",
                icon: Trophy
              },
              {
                title: "Bridge Courses",
                target: "Grade 8 Entry",
                desc: "Intensive 8-week gap removal for key subjects.",
                features: ["Math/Physics/Chem", "Urdu to English", "Mastery Focus"],
                price: "From " + formatPrice({'PK': 5500, 'GB': 45, 'US': 65}, 5500),
                tag: "Fast Track",
                icon: Zap
              },
              {
                title: "O-Level Mastery",
                target: "Grades 9-11",
                desc: "Complete syllabus mastery for all core subjects.",
                features: ["Active Learning", "Past Paper Pro", "ATP Prep"],
                price: formatPrice({'PK': 45000, 'GB': 350, 'US': 500}, 45000) + "/yr",
                tag: "Core Academic",
                icon: BookOpen
              }
            ].map((p, i) => (
              <motion.div key={i} whileHover={{ y: -6 }}>
                <Card className="h-full border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col group bg-white">
                  <CardHeader className="p-8 pb-6">
                    <div className="flex justify-between items-center mb-6">
                      <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-[#2366c9] transition-colors">
                        <p.icon className="h-6 w-6 text-[#2366c9] group-hover:text-white transition-colors" />
                      </div>
                      <Badge className="bg-slate-900 text-white font-semibold text-xs px-3 py-1 rounded-lg">{p.tag}</Badge>
                    </div>
                    <CardTitle className="text-2xl font-bold text-slate-900 group-hover:text-[#2366c9] transition-colors">{p.title}</CardTitle>
                    <p className="text-[#2366c9] font-medium text-xs tracking-wide mt-2">{p.target}</p>
                  </CardHeader>
                  <CardContent className="px-8 pb-8 flex-1">
                    <p className="text-slate-600 font-medium text-base mb-6">{p.desc}</p>
                    <ul className="space-y-3">
                      {p.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-3 text-slate-700 font-medium text-sm">
                          <CheckCircle2 className="h-4 w-4 text-[#2366c9]" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="p-8 pt-6">
                    <div className="w-full flex flex-col gap-4 border-t border-slate-200 pt-6">
                      <div className="text-2xl font-bold text-slate-900">{p.price}</div>
                      <Link href="/programs" className="w-full">
                        <Button variant="ghost" className="text-[#2366c9] font-semibold w-full hover:bg-blue-50 px-4 h-10 rounded-lg text-sm">
                          Learn More
                        </Button>
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 1.5: THE EDUMEUP ENGINE */}
      <section className="py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">The EduMeUp Engine</h2>
            <p className="text-lg text-blue-300">Systematic research-backed mastery</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
            {[
              { 
                title: "Precise Diagnostics", 
                desc: "Every journey begins by mapping the exact gaps in current knowledge.",
                icon: <Search className="h-8 w-8 text-blue-400" />
              },
              { 
                title: "Active Recall", 
                desc: "Replace passive reading with active retrieval tasks that strengthen neural pathways.",
                icon: <Zap className="h-8 w-8 text-blue-400" />
              },
              { 
                title: "Spaced Repetition", 
                desc: "Our engine schedules reviews at scientifically optimal intervals.",
                icon: <RefreshCw className="h-8 w-8 text-blue-400" />
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -4 }}
                className="bg-blue-900/30 p-6 rounded-lg border border-blue-800/50 backdrop-blur-sm group hover:bg-blue-900/50 transition-all text-left"
              >
                <div className="mb-4 group-hover:scale-110 transition-transform inline-block">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-bold mb-3 text-white">{feature.title}</h4>
                <p className="text-blue-100 font-medium text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: THE CORE PROBLEM & OUR ENGINE */}
      <section className="py-40 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-3 leading-tight">The Science <span className="text-[#2366c9]">of Exam Mastery</span></h2>
            <p className="text-lg text-slate-700 font-medium">Research-Validated Active Retention Engine</p>
          </div>

          <Card className="grid md:grid-cols-2 gap-0 border border-blue-200 rounded-xl overflow-hidden shadow-md">
            <div className="bg-slate-50 p-8 border-r border-blue-200 text-left">
              <div className="mb-8 text-center">
                <div className="h-1 w-16 bg-red-600 mx-auto rounded-full mb-4"></div>
                <h4 className="font-bold text-slate-900 text-3xl mb-2 leading-tight">Your Brain is Built to Forget</h4>
                <p className="text-red-600 font-semibold text-xs">The Traditional Crisis</p>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg border border-red-200 shadow-sm text-left">
                   <h5 className="font-bold text-slate-900 text-lg mb-4 border-b border-red-200 pb-3">Key Statistics / Evidence</h5>
                   <ul className="space-y-4">
                    {[
                      { val: "42%", txt: "lost in 20 minutes (Ebbinghaus, 1885)" },
                      { val: "~70%", txt: "lost in 24 hours (Murre & Dros, 2015)" },
                      { val: "90%", txt: "irretrievable in 30 days (Cepeda et al., 2006)" }
                    ].map((stat, i) => (
                      <li key={i} className="flex items-center gap-4 group transition-all">
                        <div className="text-2xl font-bold text-red-600 w-16 shrink-0">{stat.val}</div>
                        <span className="font-medium text-slate-700 text-sm leading-snug">{stat.txt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-lg border border-red-200 shadow-sm">
                  <div className="relative h-48 mb-8 border-l-2 border-b-2 border-slate-300">
                    <div className="absolute left-[-45px] top-1/2 -rotate-90 text-[10px] font-bold text-slate-500">Retention (%)</div>
                    <div className="absolute left-[-25px] top-0 text-[10px] font-bold text-slate-500">100%</div>
                    <div className="absolute left-[-25px] bottom-0 text-[10px] font-bold text-slate-500">0%</div>
                    <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-500">Time</div>
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M 0 0 Q 10 80 100 90" fill="none" stroke="red" strokeWidth="3" />
                    </svg>
                  </div>
                  <p className="text-center font-bold text-red-600 text-sm">Outcome: 100% → 10% (No Review)</p>
                </div>
              </div>
            </div>

            <div className="bg-[#2366c9] p-8 text-white relative text-left">
              <div className="absolute inset-0 bg-[#1e1b4b]/10 pointer-events-none"></div>
              <div className="mb-8 text-center relative z-10">
                <div className="h-1 w-16 bg-white mx-auto rounded-full mb-4"></div>
                <h4 className="font-bold text-white text-3xl mb-2 leading-tight">We're Built to Stop Forgetting</h4>
                <p className="text-blue-200 font-semibold text-xs">The EduMeUp Solution</p>
              </div>

              <div className="space-y-6 relative z-10">
            <div className="bg-blue-500/40 p-6 rounded-lg border border-blue-400 backdrop-blur text-left">
                   <h5 className="font-bold text-white text-lg mb-4 border-b border-blue-400 pb-3">Our System Fights Forgetting</h5>
                   <ul className="space-y-4">
                    {[
                      { t: "1. Spaced Reviews", s: "Optimal intervals (Day 1, 3, 7, 14, 30, 90)", icon: RefreshCw },
                      { t: "2. Interactive H5P", s: "Active recall via 1000+ activities", icon: Zap },
                      { t: "3. Dual-Coding", s: "2× memory strength via Text+Visual (Paivio, 1971)", icon: Brain }
                    ].map((step, i) => (
                      <li key={i} className="group/item transition-all flex gap-3">
                        <step.icon className="h-6 w-6 text-white group-hover/item:rotate-12 transition-transform flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-white text-base">{step.t}</p>
                          <p className="text-white font-medium text-xs opacity-90">{step.s}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-700/50 p-6 rounded-lg border border-blue-400 shadow-sm">
                  <div className="relative h-40 mb-6 border-l border-b border-blue-300">
                    <div className="absolute left-[-45px] top-1/2 -rotate-90 text-[10px] font-semibold text-blue-200">Retention (%)</div>
                    <div className="absolute left-[-25px] top-0 text-[10px] font-semibold text-blue-200">100%</div>
                    <div className="absolute left-[-25px] bottom-0 text-[10px] font-semibold text-blue-200">0%</div>
                    <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 text-[10px] font-semibold text-blue-200">Time</div>
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M 0 0 L 5 30 L 15 20 L 30 35 L 50 25 L 70 30 L 85 20 L 100 15" fill="none" stroke="white" strokeWidth="3" />
                    </svg>
                  </div>
                  <p className="text-center font-bold text-white text-xs">Result: 100% → 85%+ (Long-term)</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* SECTION 3: 10X LEARNING LEAP MODEL PILLARS */}
      <section className="py-16 md:py-24 bg-blue-50 relative overflow-hidden">
        <div className="container-custom relative z-10 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 leading-tight">The 10X <span className="text-[#2366c9]">Learning Leap</span> Model™</h2>
          <p className="text-lg text-slate-600 mb-16">8 Scientific Pillars of Excellence</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {strategies.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border border-blue-200 bg-white hover:shadow-lg transition-all rounded-xl overflow-hidden group h-full">
                  <CardContent className="p-8 text-left h-full flex flex-col">
                    <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#2366c9] transition-all shadow-sm group-hover:rotate-12">
                      <s.icon className="h-6 w-6 text-[#2366c9] group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-3 text-lg">{s.title}</h3>
                    <p className="text-base text-slate-600 leading-relaxed">{s.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY EDUMEUP (CHECKLIST) */}
      <section id="parent-section" className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">Is EduMeUp Right <span className="text-[#2366c9]">for Your Child?</span></h2>
              <p className="text-lg text-slate-600 mb-12 leading-relaxed font-medium border-b border-slate-200 pb-4">Compatibility Assessment</p>

              <div className="grid sm:grid-cols-1 gap-3 mb-16">
                {[
                  "Struggles to remember concepts after a few days",
                  "Depends heavily on expensive home tutors",
                  "Lacks confidence in solving 'unseen' questions",
                  "Dreads studying and finds it boring/passive",
                  "Parents are worried about O-Level readiness",
                  "Needs a clear, guided learning pathway",
                  "Language barriers in traditional textbooks",
                  "Inconsistent school teacher support",
                  "Anxiety before exams and mocks",
                  "Difficulty transitioning to O-Level standards"
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
                    <div className={`h-5 w-5 rounded-md border-2 flex items-center justify-center transition-all shrink-0 ${
                      checkedItems.includes(i) ? "bg-[#2366c9] border-[#2366c9]" : "bg-white border-slate-300"
                    }`}>
                      {checkedItems.includes(i) && <CheckCircle2 className="h-4 w-4 text-white" />}
                    </div>
                    <span className={`text-sm font-medium leading-snug ${checkedItems.includes(i) ? "text-slate-900" : "text-slate-600"}`}>{item}</span>
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
                    <h3 className={`text-2xl font-bold mb-4 mt-2 ${result.color}`}>{result.title}</h3>
                    <p className="text-base text-slate-700 font-medium leading-relaxed mb-8">{result.desc}</p>
                    <div className="flex gap-4">
                       <InquiryDialog 
                          defaultType="diagnostic"
                          title="Free Diagnostic"
                          trigger={<Button className="bg-[#2366c9] hover:bg-blue-700 font-semibold px-8 rounded-lg text-sm text-white">Get Diagnostic</Button>}
                       />
                       <Link href="/programs">
                        <Button variant="outline" className="border border-[#2366c9] text-[#2366c9] hover:bg-blue-50 font-semibold px-8 rounded-lg text-sm">View Programs</Button>
                       </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative">
              <div className="absolute -inset-10 bg-blue-100/50 rounded-full blur-[100px] animate-pulse"></div>
              <Card className="relative border rounded-2xl overflow-hidden shadow-lg bg-white text-left">
                <CardContent className="p-0">
                  <div className="bg-[#1e1b4b] p-12 text-center text-white relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#2366c9]"></div>
                    <h3 className="text-2xl font-bold mb-3 text-white">The EduMeUp Promise</h3>
                    <p className="text-blue-300 font-medium text-sm">For Committed Students</p>
                  </div>
                  <div className="p-12 space-y-12">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-blue-600 mb-3">60%+</div>
                      <p className="text-xl font-bold text-blue-900 leading-tight">Guaranteed Minimum Result</p>
                      <p className="text-sm font-medium text-slate-600 mt-3 max-w-xs mx-auto italic">When following our research-backed learning pathway and completing retrieval tasks.</p>
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
                       <p className="text-slate-700 font-medium text-base leading-relaxed italic">"We don't just teach. We ensure your child develops the capability to learn any subject independently for the rest of their lives."</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: THE 10X LEARNING LEAP MODEL - 8 STEP JOURNEY */}
      <section className="py-16 md:py-24 bg-blue-50 relative overflow-hidden">
        <div className="container-custom relative z-10 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-3 leading-tight">The Science Behind Our Success:</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-[#2366c9] mb-6 leading-tight">10X Learning Leap Model™</h3>
          <p className="text-lg text-slate-700 font-medium mb-12 max-w-4xl mx-auto leading-relaxed">
            We don't just deliver content. We implement a systematic, research-validated process that supports lasting mastery. Every EduMeUp student follows this proven 8-step journey.
          </p>

          <div className="grid lg:grid-cols-2 gap-10 max-w-7xl mx-auto mb-20 text-left">
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-md text-left">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-12 w-12 rounded-lg bg-[#2366c9] flex items-center justify-center text-white font-bold text-lg">1</div>
                <div>
                  <h4 className="text-2xl font-bold text-slate-900 leading-snug">Phase 1: Diagnostic & Remedial</h4>
                  <p className="text-[#2366c9] font-medium text-xs mt-1">Foundation Building</p>
                </div>
              </div>
              <div className="space-y-6">
                {[
                  { step: "Step 1: Comprehensive Diagnostic",  desc: "AI identifies exact gaps at sub-skill level", example: '"Strong in Algebra (85%), weak in Quadratics (52%) due to Grade 8 foundation gap"', research: "Research: Intelligent tutoring systems (VanLehn, 2011)" },
                  { step: "Step 2: Personalized Remedial", desc: "Custom plan targeting ONLY weak areas", example: '"Priority 1: Fix Grade 8 gaps (3 hrs) → Priority 2: Master weak topics (8 hrs)"', research: "Research: Individualized learning (Pashler et al., 2007)" },
                  { step: "Step 3: Get Ready Courses", desc: "Proactive O-Level preparation (Grades 7-8)", example: "Pre-O-Level Victory & Bridge Courses. Support provided with completion", research: "" }
                ].map((s, i) => (
                  <div key={i} className="bg-blue-50 p-6 rounded-lg border border-blue-200 group hover:border-[#2366c9] transition-all">
                    <h5 className="font-bold text-slate-900 text-base mb-2">{s.step}</h5>
                    <p className="text-slate-700 font-medium text-sm mb-2">{s.desc}</p>
                    <p className="text-[#2366c9] text-sm font-medium italic mb-2 leading-relaxed">{s.example}</p>
                    {s.research && <p className="text-xs text-slate-600 font-medium">{s.research}</p>}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-12 rounded-[4rem] border-8 border-blue-900/10 shadow-2xl text-left">
              <div className="flex items-center gap-4 mb-10">
                <div className="h-16 w-16 rounded-3xl bg-blue-900 flex items-center justify-center text-white font-black text-2xl shadow-lg">2</div>
                <div>
                  <h4 className="text-3xl font-black text-[#1e1b4b] uppercase tracking-tighter leading-none">PHASE 2: SYSTEMATIC LEARNING</h4>
                  <p className="text-blue-900 font-bold uppercase text-xs tracking-widest mt-2">Mastery Building</p>
                </div>
              </div>
              <div className="space-y-6">
                {[
                  { step: "Step 4: Dual-Coding Instruction", desc: "Text + Visuals + H5P Interactives", result: "Result: 75% retention vs 5% lectures", research: "Research: Dual Coding Theory (Paivio, 1971; Mayer, 2009)" },
                  { step: "Step 5: Mastery Progression", desc: "80% mastery gates prevent advancing with gaps", result: "No moving forward until concepts truly understood", research: "Research: Mastery Learning (Bloom, 1984)" },
                  { step: "Step 6: Spaced Retrieval  (Most Critical)",  desc: "Automated reviews at Day 1, 3, 7, 14, 30, 90", result: "Result: 90%+ retention vs 20% without spacing", research: "Research: Spacing Effect (Cepeda et al., 2006; Roediger & Karpicke, 2006)" },
                  { step: "Step 7: Application & Integration",  desc: "Past papers, mock exams, enhanced solutions", result: "Transfer learning to real exam scenarios", research: "Research: Transfer of Learning (Bransford et al., 2000)" },
                  { step: "Step 8: Progress Monitoring",  desc: "Real-time dashboards for students, parents, teachers", result: "Continuous feedback and intervention", research: "Research: Formative Assessment (Black & Wiliam, 1998)" }
                ].map((s, i) => (
                  <div key={i} className="bg-slate-50 p-6 rounded-lg border border-slate-200 group hover:border-[#2366c9] transition-all text-left">
                    <h5 className="font-bold text-slate-900 text-base mb-2">{s.step}</h5>
                    <p className="text-slate-700 font-medium text-sm mb-2">{s.desc}</p>
                    <p className="text-blue-900 text-sm font-medium mb-2 leading-relaxed">{s.result}</p>
                    <p className="text-xs text-slate-600 font-medium">{s.research}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto bg-[#1e1b4b] p-12 rounded-2xl text-white border-t-4 border-[#2366c9] shadow-lg relative overflow-hidden mb-20 text-center">
            <h4 className="text-3xl font-bold mb-10 text-white text-center">Designed Outcome:</h4>
            <div className="grid grid-cols-3 gap-8">
              {[
                { val: "91%", label: "Pass Rate" },
                { val: "75%", label: "Retention" },
                { val: "90%", label: "Cost Saved" }
              ].map((o, i) => (
                <div key={i} className="text-center">
                  <div className="text-5xl font-bold text-blue-300 mb-3">{o.val}</div>
                  <div className="text-xs font-semibold text-blue-200">{o.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: KEY FEATURES - VISUAL BENEFIT GRID */}
      <section className="py-16 md:py-24 bg-white text-left">
        <div className="container-custom text-center">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-3 leading-tight">Powered by Learning Science,</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-[#2366c9] mb-0 leading-tight">Not Marketing Hype</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-7xl mx-auto text-left">
            <Card className="border border-slate-200 rounded-xl overflow-hidden shadow-md hover:border-[#2366c9] transition-all group text-left">
              <CardContent className="p-8 text-left">
                <div className="flex items-center gap-3 mb-8 text-left">
                  <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center group-hover:rotate-12 transition-transform">
                    <MessageSquare className="h-6 w-6 text-[#2366c9]" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 leading-tight text-left">Your Personal AI Learning Assistant</h4>
                </div>
                <div className="bg-[#2366c9] p-6 rounded-lg mb-8 border border-blue-400 shadow-md text-left">
                  <h5 className="font-bold text-white text-lg mb-3">Get Clear, Trusted Answers — Fast</h5>
                  <p className="text-white font-medium text-sm">Smart AI support for students, parents, and teachers focused on Pre-O Level and O Level success.</p>
                </div>
                <ul className="space-y-4 mb-8 text-left">
                  <li className="font-bold text-slate-900 text-base">Understands Your Exact Need:</li>
                  <li className="flex gap-3 items-start"><CheckCircle2 className="h-5 w-5 text-[#2366c9] shrink-0 mt-0.5" /> <span className="text-slate-600 font-medium text-sm">Explains syllabus and study pathways clearly</span></li>
                  <li className="flex gap-3 items-start"><CheckCircle2 className="h-5 w-5 text-[#2366c9] shrink-0 mt-0.5" /> <span className="text-slate-600 font-medium text-sm">Answers FAQs about programs and requirements</span></li>
                  <li className="flex gap-4 items-start"><CheckCircle2 className="h-6 w-6 text-[#2366c9] shrink-0" /> <span className="text-slate-600 font-medium italic">Guides you to the right Edumeup resources</span></li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 rounded-xl overflow-hidden shadow-md hover:border-[#2366c9] transition-all group text-left">
              <CardContent className="p-8 text-left">
                <div className="flex items-center gap-3 mb-8 text-left">
                  <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center group-hover:rotate-12 transition-transform">
                    <MousePointer2 className="h-6 w-6 text-[#2366c9]" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 leading-tight text-left">Learn By Doing, Not Watching</h4>
                </div>
                <div className="bg-[#2366c9] p-6 rounded-lg mb-8 border border-blue-400 shadow-md text-left">
                  <h5 className="font-bold text-white text-lg mb-3">1000+ Interactive Activity Types</h5>
                  <p className="text-white font-medium text-sm">Apply knowledge instantly, not later in homework.</p>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-8 text-left">
                  {["Branching Scenarios", "Interactive Simulations", "Drag & Drop Exercises", "Real-time Problem Solving", "Immediate Feedback"].map((act, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm font-medium text-slate-700 text-left"><CheckCircle2 className="h-4 w-4 text-[#2366c9] shrink-0" /> {act}</div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 rounded-xl overflow-hidden shadow-md hover:border-[#2366c9] transition-all group text-left">
              <CardContent className="p-8 text-left">
                <div className="flex items-center gap-3 mb-8 text-left">
                  <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center group-hover:rotate-12 transition-transform">
                    <RefreshCw className="h-6 w-6 text-[#2366c9]" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 leading-tight text-left">Memory Engine (Spaced Repetition)</h4>
                </div>
                <div className="bg-[#2366c9] p-6 rounded-lg mb-8 border border-blue-400 shadow-md text-left">
                   <p className="text-xs font-semibold text-blue-100 mb-3">Review Schedule:</p>
                   <div className="flex justify-between items-center text-sm font-bold text-white gap-1">
                      <span>Day 1</span> <span>→</span> <span>Day 3</span> <span>→</span> <span>Day 7</span> <span>→</span> <span>Day 14</span> <span>→</span> <span>Day 30</span> <span>→</span> <span>Day 90</span>
                   </div>
                </div>
                <p className="text-sm font-semibold text-slate-700 text-left">Result: 85%+ retention after 90 days vs 10% traditional</p>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 rounded-xl overflow-hidden shadow-md hover:border-[#2366c9] transition-all group text-left">
              <CardContent className="p-8 text-left">
                <div className="flex items-center gap-3 mb-8 text-left">
                  <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center group-hover:rotate-12 transition-transform">
                    <BarChart3 className="h-6 w-6 text-[#2366c9]" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 leading-tight text-left">Real-Time Insight Dashboards</h4>
                </div>
                <div className="bg-[#2366c9] p-6 rounded-lg mb-8 border border-blue-400 shadow-md text-left">
                  <h5 className="font-bold text-white text-lg mb-3">See Progress For All Stakeholders</h5>
                  <p className="text-white font-medium text-sm">Three specific views tailored for students, parents, and teachers.</p>
                </div>
                <ul className="space-y-3 text-sm font-medium text-slate-700 text-left">
                   <li className="text-left">• Student View: Mastery % & Badges</li>
                   <li className="text-left">• Parent View: Weekly engagement reports</li>
                   <li className="text-left">• Teacher View: Class-wide progress heatmap</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 7: HOW WE TRANSFORM STRUGGLING STUDENTS */}
      <section className="py-16 md:py-24 bg-slate-50 text-left">
        <div className="container-custom text-center">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-3 leading-tight">Your Child's 4-Step Journey</h2>
            <p className="text-lg text-slate-700 font-medium">Simple. Systematic. Effective.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-4 max-w-7xl mx-auto mb-16 text-left">
             {[
               { step: "Step 1", icon: <Search className="h-6 w-6"/>, label: "Diagnose", color: "bg-[#2366c9]" },
               { step: "Step 2", icon: <Layers className="h-6 w-6"/>, label: "Repair", color: "bg-blue-700" },
               { step: "Step 3", icon: <Zap className="h-6 w-6"/>, label: "Master", color: "bg-blue-800" },
               { step: "Step 4", icon: <Brain className="h-6 w-6"/>, label: "Retain", color: "bg-blue-900" }
             ].map((s, i) => (
               <div key={i} className={`${s.color} p-6 rounded-lg text-white text-center shadow-md group hover:shadow-lg transition-all`}>
                  <p className="text-xs font-semibold opacity-80 mb-3 text-white">{s.step}</p>
                  <div className="flex justify-center mb-3 group-hover:rotate-12 transition-transform">{s.icon}</div>
                  <p className="text-lg font-bold text-white">{s.label}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: THE RESEARCH FOUNDATION */}
      <section className="py-16 md:py-24 bg-white text-left">
        <div className="container-custom text-center">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-3 leading-tight">Built on 40+ Years of Science</h2>
            <p className="text-lg text-slate-700 font-medium">Peer-Reviewed Research, Not Marketing Claims</p>
          </div>
          <div className="space-y-6 max-w-7xl mx-auto text-left">
             {[
               { year: "1969", title: "Dale's Cone of Learning", finding: "Practice by Doing: 75% retention vs Passive Listening: 5%" },
               { year: "1984", title: "Bloom's Mastery Learning", finding: "One-to-one tutoring produces 98th percentile performance" },
               { year: "2006", title: "Roediger & Karpicke", finding: "Retrieval practice improves retention 50-200% over re-reading" },
               { year: "2009", title: "Mayer Dual Coding", finding: "Combining verbal and visual information increases long-term retention" }
             ].map((r, i) => (
               <Card key={i} className="border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-md hover:border-[#2366c9] transition-all group text-left">
                  <div className="flex flex-col md:flex-row gap-6 items-start md:items-center text-left">
                    <p className="text-3xl font-bold text-[#2366c9] shrink-0 group-hover:scale-110 transition-transform">{r.year}</p>
                    <div className="flex-1 text-left">
                      <h4 className="text-lg font-bold text-slate-900 mb-2">{r.title}</h4>
                      <p className="text-slate-700 font-medium text-sm">{r.finding}</p>
                    </div>
                  </div>
               </Card>
             ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: COMPARISON TABLE */}
      <section className="py-16 md:py-24 bg-[#1e1b4b] text-white text-center">
        <div className="container-custom text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 text-white">Why Choose <span className="text-blue-400">EduMeUp?</span></h2>
          <div className="max-w-7xl mx-auto overflow-x-auto text-left">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="text-left">
                  <th className="p-4 text-left bg-white/5 border-b border-white/20 text-white">Feature</th>
                  <th className="p-4 text-center bg-white/5 border-b border-white/20 text-white">Traditional</th>
                  <th className="p-4 text-center bg-[#2366c9]/30 border-b border-blue-400/30 text-blue-300">EduMeUp</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { f: "Learning Model", t: "Passive (Listening)", e: "Active (Doing)" },
                  { f: "Retention Rate", t: "5 - 10%", e: "75% - 90%+" },
                  { f: "Gap Identification", t: "Manual / Guesswork", e: "AI-Powered Precision" },
                  { f: "Review System", t: "None (Cramming)", e: "Spaced Retrieval" }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors text-left border-b border-white/10">
                    <td className="p-4 text-left font-semibold text-blue-100">{row.f}</td>
                    <td className="p-4 text-center opacity-50 text-white">{row.t}</td>
                    <td className="p-4 text-center bg-[#2366c9]/20 font-semibold text-blue-300">{row.e}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 11: TESTIMONIALS */}
      <section className="py-16 md:py-24 bg-white text-center">
        <div className="container-custom text-center">
           <h2 className="text-5xl md:text-6xl font-bold text-center text-slate-900 mb-12 leading-tight">What <span className="text-[#2366c9]">Parents Say</span></h2>
           <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto text-left">
             {[
               { quote: "My son's results improved from 50% to 90% in just two months. The diagnostic tool is incredible.", author: "Mrs. Fatima S., Lahore" },
               { quote: "Finally, a system that doesn't just ask my child to memorize. She actually understands now.", author: "Mr. Ahmed R., Karachi" },
               { quote: "The interactive activities keep him engaged. He's learning independently for the first time.", author: "Mrs. Sana K., Islamabad" }
             ].map((t, i) => (
               <Card key={i} className="border border-slate-200 rounded-xl p-6 bg-slate-50 shadow-sm hover:shadow-md text-left">
                  <p className="text-base font-medium text-slate-700 mb-6 italic leading-relaxed text-left">"{t.quote}"</p>
                  <p className="font-bold text-[#2366c9] text-sm text-left">{t.author}</p>
               </Card>
             ))}
          </div>
        </div>
      </section>

      {/* SECTION 12: FAQ */}
      <section className="py-16 md:py-24 bg-slate-50 text-left">
        <div className="container-custom text-center">
           <h2 className="text-5xl md:text-6xl font-bold text-center text-slate-900 mb-12 leading-tight">Frequently <span className="text-[#2366c9]">Asked Questions</span></h2>
           <div className="max-w-4xl mx-auto space-y-4 text-left">
             {[
               { q: "How is this different from YouTube?", a: "YouTube is passive. EduMeUp is active. We use 1000+ interactive tasks and scientific retrieval to ensure you remember." },
               { q: "Is it suitable for the Pakistani O-Level syllabus?", a: "Yes, our content is specifically aligned with International IGCSE/O-Level standards used in Pakistan." },
               { q: "What if my child needs help from a teacher?", a: "We offer both self-learning and teacher-led programs with live support and expert guidance." }
             ].map((f, i) => (
               <div key={i} className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm text-left hover:shadow-md transition-all">
                  <h4 className="text-lg font-bold text-slate-900 mb-3 flex gap-3 items-center text-left">
                    <HelpCircle className="h-5 w-5 text-[#2366c9] shrink-0" /> {f.q}
                  </h4>
                  <p className="text-slate-700 font-medium text-sm text-left">{f.a}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* SECTION 13: FINAL CTA */}
   
      {/* SECTION 14: WORKBOOKS & PROGRAMS COMPARISON */}
      <section className="py-16 md:py-24 bg-white text-left">
        <div className="container-custom text-center">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-3 leading-tight">Which Option <span className="text-[#2366c9]">Is Right For You?</span></h2>
            <p className="text-lg text-slate-700 font-medium">Choose Your Path to Success</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto text-left">
            <Card className="border-2 border-[#2366c9] shadow-md rounded-xl overflow-hidden bg-blue-50 relative flex flex-col group text-left">
              <div className="bg-[#2366c9] text-white p-6 text-center">
                <h4 className="text-xl font-bold text-white">Digital Platform</h4>
                <p className="text-xs font-semibold text-blue-100 mt-2">Most Effective Option</p>
              </div>
              <CardContent className="p-8 flex-1 flex flex-col text-left">
                <ul className="space-y-4 mb-8 flex-1 text-left">
                  {[
                    "Reliable internet access (even occasional)",
                    "Maximum results (91% pass, 47% A/A*)",
                    "Interactive & engaging learning",
                    "AI personalization & spaced retrieval",
                    "Full progress tracking",
                    "Complete research-backed methodology"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 items-start font-medium text-slate-700 text-sm text-left">
                      <CheckCircle2 className="h-5 w-5 text-[#2366c9] shrink-0 mt-0.5" /> {item}
                    </li>
                  ))}
                </ul>
                <p className="text-center font-semibold text-blue-900 bg-blue-100 py-3 rounded-lg mb-6 text-xs">Includes Type 1 Workbooks FREE</p>
                <div className="mt-auto text-center">
                   <Button className="w-full bg-[#2366c9] hover:bg-blue-700 font-semibold h-10 rounded-lg text-xs text-white">Enroll in Digital</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-4 border-slate-100 shadow-xl rounded-[4rem] overflow-hidden bg-white flex flex-col group text-left">
              <div className="bg-[#1e1b4b] text-white p-10 text-center">
                <h4 className="text-2xl font-black uppercase text-white">TYPE 1 WORKBOOKS</h4>
                <p className="text-xs font-black text-blue-200 mt-2 uppercase tracking-widest text-white">Offline-Only Fallback</p>
              </div>
              <CardContent className="p-12 flex-1 flex flex-col text-left">
                <ul className="space-y-6 mb-12 flex-1 opacity-60 text-left">
                  {[
                    "Zero internet availability (no WiFi/data)",
                    "Must study 100% offline",
                    "Strong preference for physical books only",
                    "No interactive features/spaced retrieval",
                    "No progress tracking or teacher support",
                    "Standalone chapter-by-chapter learning"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 items-start font-black text-[#1e1b4b] uppercase text-sm leading-tight text-left">
                      <div className="h-6 w-6 rounded-full bg-slate-100 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto text-center">
                   <Button variant="outline" className="w-full border border-slate-300 font-semibold h-10 rounded-lg text-xs hover:bg-slate-50">Browse Workbooks</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 shadow-md rounded-xl overflow-hidden bg-white flex flex-col group text-left">
              <div className="bg-blue-900 text-white p-6 text-center">
                <h4 className="text-xl font-bold text-white">Type 2 Workbooks</h4>
                <p className="text-xs font-semibold text-blue-300 mt-2">Exam Practice Supplement</p>
              </div>
              <CardContent className="p-8 flex-1 flex flex-col text-left">
                <ul className="space-y-4 mb-8 flex-1 text-left">
                  {[
                    "Already mastered O-Level syllabus",
                    "Just need final exam practice (last 2-3 months)",
                    "Using another main learning platform",
                    "Want affordable practice supplement ($20-30)",
                    "Need quick topic-wise revision tool",
                    "Past papers with enhanced solutions"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 items-start font-medium text-slate-700 text-sm text-left">
                      <CheckCircle2 className="h-5 w-5 text-blue-900 shrink-0 mt-0.5" /> {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto text-center">
                   <Button variant="outline" className="w-full border border-blue-900 text-blue-900 font-semibold h-10 rounded-lg text-xs hover:bg-blue-50">Exam Practice</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 15: FREE RESOURCES */}
      <section className="py-16 md:py-24 bg-slate-50 text-left">
        <div className="container-custom text-center">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-3 leading-tight">Start Learning Today</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-[#2366c9] mb-0 italic">100% Free (No Credit Card Required)</h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto text-left">
            {[
              { title: "FREE DIAGNOSTIC", subtitle: "90-Minute AI Test", items: ["Comprehensive test", "Exact gap analysis", "Detailed report", "Personalized plan"], btn: "START NOW", icon: <Search className="h-10 w-10"/> },
              { title: "FREE RESOURCES", subtitle: "Downloadable Library", items: ["Magic Sheets", "Practice sheets", "Revision guides", "Study planners"], btn: "BROWSE FREE", icon: <Download className="h-10 w-10"/> },
              { title: "FREE GUIDE", subtitle: "O-Level Survival PDF", items: ["O-Level crisis in Pakistan", "Avoid tuition trap", "Timeline guide", "Cost comparisons"], btn: "DOWNLOAD", icon: <BookOpen className="h-10 w-10"/> },
              { title: "FREE CONSULT", subtitle: "30-Minute Expert Call", items: ["Your child's situation", "Program recommendations", "Expert guidance", "No sales pressure"], btn: "SCHEDULE", icon: <Calendar className="h-10 w-10"/> }
            ].map((card, i) => (
              <Card key={i} className="border border-slate-200 bg-white rounded-lg shadow-sm hover:shadow-md transition-all group overflow-hidden text-left">
                <div className="p-6 text-left">
                   <div className="text-[#2366c9] mb-6 group-hover:scale-110 group-hover:rotate-12 transition-transform">{card.icon}</div>
                   <h4 className="text-lg font-bold text-slate-900 mb-2 text-left">{card.title}</h4>
                   <p className="text-xs font-semibold text-blue-600 mb-6 text-left">{card.subtitle}</p>
                   <ul className="space-y-2 mb-8 text-left">
                      {card.items.map((item, idx) => (
                        <li key={idx} className="flex gap-2 items-start text-xs font-medium text-slate-700 text-left"><CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" /> {item}</li>
                      ))}
                   </ul>
                   <Button variant="ghost" className="w-full text-[#2366c9] font-semibold group-hover:bg-blue-50 transition-colors text-xs flex items-center justify-between text-left">
                     {card.btn} <ArrowRight className="h-4 w-4 ml-2" />
                   </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 16: FINAL CTA (STRONG CLOSE) */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden text-left">
        <div className="container-custom text-center">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-3 leading-tight">Your Child's Success <span className="text-[#2366c9]">Starts Today</span></h2>
            <p className="text-xl text-slate-600 font-semibold text-center">The Choice Is Yours</p>
          </div>

          <div className="max-w-6xl mx-auto bg-[#1e1b4b] rounded-2xl overflow-hidden shadow-lg relative text-left">
            <div className="absolute inset-0 bg-blue-500/5 pointer-events-none text-left"></div>
            <div className="grid md:grid-cols-2 text-left">
              <div className="p-12 border-r border-white/10 bg-slate-900/50 text-left">
                <h4 className="text-xs font-bold text-slate-500 mb-10 text-left">Path 1: Traditional</h4>
                <div className="space-y-10 relative text-left">
                   {[
                     "Wait until child struggles in O-Level",
                     "Hire expensive home tutors",
                     "Spend $9,000-11,400 over 3 years",
                     "Child becomes tutor-dependent",
                     "65% pass rate, 18% A/A*",
                     "High stress, financial strain"
                   ].map((step, i) => (
                     <div key={i} className="flex gap-8 items-center opacity-40 text-left">
                        <div className="h-3 w-3 rounded-full bg-red-500 shrink-0 text-left" />
                        <p className="text-white font-black uppercase text-sm tracking-tight text-left text-white">{step}</p>
                     </div>
                   ))}
                   <div className="absolute top-4 left-[5px] bottom-4 w-0.5 bg-red-500/20 text-left" />
                </div>
              </div>

              <div className="p-20 bg-[#2366c9]/10 relative overflow-hidden text-left">
                <div className="absolute top-0 right-0 p-10 text-left">
                   <div className="bg-green-500 h-16 w-16 rounded-full flex items-center justify-center text-white shadow-2xl animate-bounce text-left">
                      <Trophy className="h-8 w-8 text-white text-left" />
                   </div>
                </div>
                <h4 className="text-sm font-black text-blue-400 uppercase tracking-[0.5em] mb-12 text-left">PATH 2: EDUMEUP</h4>
                <div className="space-y-10 relative text-left">
                   {[
                     "Start NOW with Pre-O-Level Victory",
                     "Build strong foundations systematically",
                     "Spend $1,080 over 3 years",
                     "Child becomes independent learner",
                     "91% pass rate, 47% A/A*",
                     "Confident, capable, saving $10,000"
                   ].map((step, i) => (
                     <motion.div 
                        key={i} 
                        initial={{ x: 20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex gap-8 items-center text-left"
                     >
                        <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0 text-left" />
                        <p className="text-white font-black uppercase text-sm tracking-tight text-left text-white">{step}</p>
                     </motion.div>
                   ))}
                   <div className="absolute top-4 left-[11px] bottom-4 w-0.5 bg-green-500/20 text-left" />
                </div>
                <div className="mt-20 pt-10 border-t-2 border-white/5 text-center">
                   <p className="text-blue-200 font-black italic text-lg text-center uppercase text-white">Which path will you choose?</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-32 grid md:grid-cols-3 gap-12 max-w-7xl mx-auto text-center">
             {[
               { step: "STEP 1", label: "DIAGNOSE", sub: "90-Min Diagnostic", desc: "Know where you stand", btn: "START NOW", icon: <Search className="h-10 w-10"/> },
               { step: "STEP 2", label: "EXPLORE", sub: "Browse Programs", desc: "See what we offer", btn: "BROWSE NOW", icon: <PlayCircle className="h-10 w-10"/> },
               { step: "STEP 3", label: "ENROLL", sub: "Start Learning", desc: "Save $10,000+", btn: "ENROLL NOW", icon: <Trophy className="h-10 w-10"/> }
             ].map((s, i) => (
               <div key={i} className="p-12 rounded-[4rem] border-8 border-slate-50 bg-white shadow-xl hover:shadow-[#2366c9]/10 transition-all group text-center">
                  <p className="text-xs font-black text-slate-300 uppercase tracking-[0.4em] mb-6 text-center">{s.step}</p>
                  <div className="flex justify-center text-[#2366c9] mb-8 group-hover:scale-110 group-hover:rotate-12 transition-transform text-center">{s.icon}</div>
                  <h4 className="text-3xl font-black text-[#1e1b4b] uppercase mb-2 tracking-tighter text-center">{s.label}</h4>
                  <p className="text-sm font-black text-[#2366c9] uppercase tracking-widest mb-6 text-center text-[#2366c9]">{s.sub}</p>
                  <p className="text-slate-400 font-medium italic mb-10 text-center">{s.desc}</p>
                  <Button className={`${i === 2 ? "bg-green-600 hover:bg-green-700" : "bg-[#2366c9] hover:bg-blue-700"} w-full font-black h-16 rounded-2xl uppercase tracking-widest shadow-xl border-b-4 border-black/20 text-white`}>
                    {s.btn}
                  </Button>
               </div>
             ))}
          </div>

          <div className="mt-40 text-center max-w-5xl mx-auto text-center">
             <h4 className="text-2xl font-black text-[#1e1b4b] uppercase tracking-tighter mb-16 flex items-center justify-center gap-6 text-center">
                <div className="h-0.5 w-20 bg-slate-100" /> STILL HAVE QUESTIONS? <div className="h-0.5 w-20 bg-slate-100" />
             </h4>
             <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                {[
                  { label: "AI CHAT", val: "Available 24/7", icon: <MessageSquare className="h-6 w-6"/> },
                  { label: "CONSULTATION", val: "30-min Expert Call", icon: <Calendar className="h-6 w-6"/> },
                  { label: "WHATSAPP", val: "Quick Questions", icon: <Zap className="h-6 w-6"/> },
                  { label: "EMAIL", val: "info@edumeup.com", icon: <Layers className="h-6 w-6"/> }
                ].map((c, i) => (
                  <div key={i} className="bg-slate-50 p-10 rounded-[2.5rem] border-4 border-white shadow-sm hover:border-[#2366c9]/20 transition-all cursor-pointer group text-center">
                     <div className="text-[#2366c9] mb-4 flex justify-center group-hover:rotate-12 transition-transform text-center">{c.icon}</div>
                     <p className="text-xs font-black text-[#1e1b4b] uppercase tracking-widest mb-1 text-center">{c.label}</p>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-tight text-center">{c.val}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#1e1b4b] to-black text-white text-center">
        <div className="container-custom text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-white text-center">Join the Revolution</h2>
          <p className="text-lg text-blue-400 font-semibold mb-12 text-center">Stop Guessing. Start Mastering.</p>
          <div className="flex flex-col md:flex-row justify-center gap-8 items-center mb-16 text-center">
             <div className="text-center">
                <div className="text-4xl font-bold mb-3 text-white">50K+</div>
                <p className="text-xs font-semibold text-blue-200 text-center">Students Reached</p>
             </div>
             <div className="text-center">
                <div className="text-4xl font-bold mb-3 text-white">150+</div>
                <p className="text-xs font-semibold text-blue-200 text-center">Partner Schools</p>
             </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto text-center">
             <Button className="bg-[#2366c9] hover:bg-blue-600 h-24 px-20 rounded-[2rem] text-2xl font-bold shadow-2xl active:scale-95 transition-all text-white">Start Free Diagnostic</Button>
             <Link href="/programs">
               <Button variant="outline" className="border-4 border-white text-white hover:bg-white/10 h-24 px-20 rounded-[2rem] text-2xl font-bold shadow-lg active:scale-95 transition-all">View Programs</Button>
             </Link>
          </div>
        </div>
      </section>

      {/* FOOTER TRUST SIGNALS */}
      <section className="bg-[#1e1b4b] text-white py-12 border-t border-blue-900 text-center">
        <div className="container-custom text-center">
          <div className="flex flex-wrap justify-center gap-8 opacity-60 text-center">
             {["2,000+ Students Enrolled", "25+ Countries Served", "University Validated Results", "30-Day Money-Back Guarantee"].map((trust, i) => (
               <div key={i} className="flex items-center gap-2 text-xs font-semibold text-white text-center">
                  <CheckCircle2 className="h-4 w-4 text-blue-400 text-white flex-shrink-0" /> {trust}
               </div>
             ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
