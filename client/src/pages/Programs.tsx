import { Layout } from "@/components/Layout";
import { ProgramCard } from "@/components/ProgramCard";
import { usePrograms } from "@/hooks/use-programs";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Languages, Globe, ShieldCheck, PieChart, FileText, ArrowRight, CheckCircle2, UserCheck, Zap, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Programs() {
  const { data: programs, isLoading, error } = usePrograms();

  const categories = ["All", "O-Level", "Foundation", "School Charter"];

  if (error) {
    return (
      <Layout>
        <div className="container-custom py-20">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Failed to load programs. Please try again later.</AlertDescription>
          </Alert>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* HERO - EMOTIONAL HOOK */}
      <section className="pt-24 pb-32 bg-[#1e1b4b] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.2)_0%,transparent_50%)]"></div>
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <span className="text-blue-400 font-semibold text-[14px]">Exam Mastery pathways</span>
            <h1 className="text-5xl md:text-6xl font-semibold mb-8 font-display leading-tight text-white">
              STOP THE <span className="text-blue-400">STUDY STRUGGLE</span>
            </h1>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <p className="text-2xl md:text-3xl text-blue-100 font-semibold leading-tight">
                Most students struggle because they forget 80% of what they learn within 48 hours.
              </p>
              <p className="text-lg text-blue-200/60 font-medium italic">
                The "Ebbinghaus Forgetting Curve" isn't a theory—it's the reason for your exam anxiety. 
                EduMeUp doesn't just teach; it ensures you never forget.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
                <div className="bg-red-500/10 border border-red-500/20 px-6 py-3 rounded-full text-[14px] font-semibold text-red-400">
                80% forget rate (traditional)
              </div>
              <div className="bg-green-500/10 border border-green-500/20 px-6 py-3 rounded-full text-[14px] font-semibold text-green-400">
                92% grade improvement
              </div>
            </div>

            <div className="inline-block bg-white text-[#1e1b4b] px-10 py-4 rounded-2xl font-semibold text-[14px] shadow-2xl mt-8">
              Proven science. Guaranteed results.
            </div>
          </motion.div>
        </div>
      </section>

      {/* SYSTEM ECOSYSTEM */}
      <section className="py-20 bg-blue-50 border-y-4 border-blue-100">
        <div className="container-custom text-center">
          <div className="flex flex-wrap justify-center items-center gap-4 text-[14px] md:text-xs font-semibold text-[#1e1b4b]/60">
            <span>Diagnostic</span>
            <span className="text-blue-400">→</span>
            <span>Remedial</span>
            <span className="text-blue-400">→</span>
            <span>Foundation</span>
            <span className="text-blue-400">→</span>
            <span>Bridge</span>
            <span className="text-blue-400">→</span>
            <span>O-Level Mastery</span>
            <span className="text-blue-400">→</span>
            <span>Practice</span>
            <span className="text-blue-400">→</span>
            <span>Mock Exams</span>
          </div>
        </div>
      </section>

      {/* PROOF LAYER & RISK REVERSAL */}
      <section className="py-32 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-20 items-center ">
            <div>
              <h2 className="text-4xl md:text-5xl font-semibold text-[#1e1b4b] mb-8 leading-none">
                PROVEN BY <span className="text-blue-600">NUMBERS</span>
              </h2>
              <div className="grid grid-cols-2 gap-8 mb-12">
                {[
                  { label: "Grade Improvement", val: "92%", sub: "2+ Grades Up" },
                  { label: "Retention Rate", val: "85%", sub: "Long-term Memory" },
                  { label: "Cost Savings", val: "70%", sub: "Vs. Private Tutors" },
                  { label: "Students Served", val: "5k+", sub: "Since 2021" }
                ].map((stat, i) => (
                  <div key={i} className="p-8 bg-blue-50 rounded-[2.5rem] border-2 border-blue-100">
                    <p className="text-4xl font-semibold text-[#1e1b4b] mb-1">{stat.val}</p>
                    <p className="text-[14px] font-semibold text-blue-600 mb-1">{stat.label}</p>
                    <p className="text-[14px] font-semibold text-[#1e1b4b]/40 uppercase">{stat.sub}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-green-50 rounded-3xl border-2 border-green-100">
                  <ShieldCheck className="h-6 w-6 text-green-600 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold text-[#1e1b4b]">The EduMeUp guarantee</h4>
                    <p className="text-[14px] text-[#1e1b4b]/70 ">Try any program for 14 days. If you don't see a measurable shift in retention, we'll provide a 100% refund. No questions asked.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-[#1e1b4b] p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
                <h3 className="text-2xl font-semibold mb-8 text-red-400">Who it's not for</h3>
                <ul className="space-y-6">
                  {[
                    "Lazy students looking for shortcuts",
                    "Last-minute crammers (the science needs time)",
                    "Anyone unwilling to follow a systematic roadmap",
                    "Passive learners who only want to watch videos"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-white/60 font-semibold uppercase text-xs tracking-widest">
                      <span className="text-red-500 text-lg">✕</span> {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-12 pt-8 border-t border-white/10">
                  <p className="text-xs font-semibold text-blue-200 uppercase tracking-[0.2em]">"We build serious scholars, not just exam takers."</p>
                </div>
              </div>

              <div className="bg-blue-50 p-12 rounded-[4rem] border-4 border-blue-100">
                <h3 className="text-2xl font-semibold text-[#1e1b4b] mb-8">Success stories</h3>
                <div className="space-y-6">
                  <p className="text-[#1e1b4b]/70 font-medium italic">"Ahmed went from a 'D' in Physics to an 'A*' in just 4 months. The diagnostic revealed he was missing Grade 7 fundamentals."</p>
                  <p className="text-[14px] font-semibold text-blue-600">— O-Level parent</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE 4 LEARNING PATHWAYS */}
      <section className="py-28 bg-white">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-semibold text-[#1e1b4b] mb-4">The 4 learning pathways</h2>
            <p className="text-lg text-blue-600 font-semibold">Designed for every stage of the O-Level journey</p>
          </div>

          <div className="grid gap-8">
            {[
              {
                id: "p1",
                title: "Pathway 1: Foundation & Foundational O-Level Bridge Courses",
                subtitle: "Build Strong Basics → Transition to O-Level",
                for: "Grade 5-8 students, foundation gaps, curriculum transitions",
                priorities: [
                  { 
                    title: "Diagnostic + Remedial", 
                    details: "90-minute AI gap analysis pinpointing exact Grade 6-8 deficiencies. Result: Personalized remedial roadmap to fix 'leaky' foundations before starting O-Level.",
                    cost: "$30 (Included in programs)"
                  },
                  { 
                    title: "Pre-O-Level Victory Program", 
                    details: "9-month comprehensive system covering Grade 6-8 repair + Foundational O-Level Bridge Courses + 30% O-Level syllabus. Available in Self-Learning ($199) or Teacher-Led ($360).",
                    guarantee: "60% performance guarantee"
                  }
                ]
              },
              {
                id: "p2",
                title: "Pathway 2: O-Level Mastery",
                subtitle: "Comprehensive Preparation → Exam Excellence",
                for: "Current O-Level students (O1/O2), self-motivated learners",
                priorities: [
                  { 
                    title: "Complete O-Level Subject Preparation", 
                    details: "100% Cambridge syllabus coverage with 1000+ interactive H5P activities. Includes integrated past papers, anti-forgetting system, and 24/7 AI support.",
                    pricing: "$65/year per subject"
                  },
                  { 
                    title: "ATP Courses (Physics / Chemistry / Biology)", 
                    details: "Virtual lab demonstrations for Paper 4 (Physics, Chemistry, Biology). Build analytical skills for unseen experiments without needing a physical lab.",
                    pricing: "From $99/subject"
                  }
                ]
              },
              {
                id: "p3",
                title: "Pathway 3: Exam Specialization",
                subtitle: "Master Exam Technique → Peak Performance",
                for: "Exam preparation (1-6 months), technique mastery, time management",
                priorities: [
                  { 
                    title: "Real-Time Exam Preparation", 
                    details: "20+ actual Cambridge past papers with enhanced solutions. MCQ interface timed exactly like real exams with instant AI explanations for every mistake.",
                    value: "50-80% cheaper than traditional mocks"
                  },
                  { 
                    title: "Exam Practice Papers with Enhanced Solutions", 
                    details: "Condensed syllabus review targeting high-yield topics. Formula sheets, magic sheets, and rapid practice for emergency 2-4 week preparation.",
                    pricing: "From $40/subject"
                  }
                ]
              },
              {
                id: "p4",
                title: "Pathway 4: Personalized Support",
                subtitle: "Human Guidance → Accelerated Progress",
                for: "Students needing 1-on-1 guidance, accountability, human interaction",
                priorities: [
                  { 
                    title: "Tutor Booking - 1-to-1 Personalised Education", 
                    details: "Vetted, SMK-trained teachers matched to student needs. Includes 2 FREE sample lectures and full platform resource access ($360 value free).",
                    availability: "Online & Physical (Selected cities)"
                  }
                ]
              }
            ].map((path, i) => (
              <Accordion type="single" collapsible key={i} className="bg-blue-50 rounded-[2.5rem] border-4 border-white hover:border-blue-100 transition-all overflow-hidden shadow-sm">
                <AccordionItem value={path.id} className="border-none">
                  <AccordionTrigger className="px-10 py-8 hover:no-underline group">
                    <div className="text-left">
                      <h3 className="text-2xl font-semibold text-[#1e1b4b] group-hover:text-[#2366c9] transition-colors">{path.title}</h3>
                      <p className="text-blue-600 font-semibold uppercase text-xs tracking-widest mt-1">{path.subtitle}</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-10 pb-10">
                    <div className="pt-6 border-t border-white/50">
                      <div className="mb-8 p-6 bg-white/50 rounded-2xl border border-white">
                        <span className="text-[14px] font-semibold text-[#1e1b4b]/40">Ideal for</span>
                        <p className="text-[#1e1b4b] font-semibold mt-1">{path.for}</p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-8">
                        {path.priorities.map((item, j) => (
                          <div key={j} className="space-y-4">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-[#2366c9]" />
                              <h4 className="text-lg font-semibold text-[#1e1b4b]">{item.title}</h4>
                            </div>
                            <p className="text-[14px] text-[#1e1b4b]/70 font-medium leading-relaxed">{item.details}</p>
                            {('cost' in item || 'pricing' in item || 'value' in item) && (
                              <div className="text-[14px] font-semibold text-[#2366c9] bg-white/50 inline-block px-3 py-1 rounded-full">
                                {('cost' in item ? item.cost : 'pricing' in item ? item.pricing : 'value' in item ? item.value : '')}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="mt-10">
                        <Button className="bg-[#2366c9] hover:bg-blue-600 h-14 px-8 rounded-xl font-semibold">Explore this pathway</Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
      </section>

      {/* SYSTEM CAPABILITIES - COLLAPSIBLE */}
      <section className="py-32 bg-[#1e1b4b] text-white">
        <div className="container-custom">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl text-white font-semibold">System capabilities</h2>
            <p className="text-xl text-blue-400 font-semibold uppercase tracking-widest mt-4">The Engine Powering Your 10X Learning Leap</p>
          </div>
          
          <Accordion type="multiple" className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Languages, title: "Multilingual Support", desc: "Translate content instantly into 100+ languages to bridge any language gap." },
              { icon: ShieldCheck, title: "$678 FREE Value", desc: "Diagnostic assessments, AI doubt support, and digital workbooks included in every major program." },
              { icon: PieChart, title: "Automated Mastery Tracking", desc: "Real-time dashboards for students, parents, and schools. Identify gaps as they happen." },
              { icon: FileText, title: "Dual Coding Mastery", desc: "Every lesson uses text + visuals to reduce cognitive load and double retention rates." },
              { icon: Globe, title: "Global Benchmarking", desc: "See where you stand against students in 25+ countries with standardized mock exams." },
              { icon: AlertCircle, title: "Predictive AI Diagnostics", desc: "Our AI predicts exam performance 4 weeks early, giving you time to remediate weak spots." },
              { icon: Sparkles, title: "24/7 AI Tutor Access", desc: "Never wait for a teacher. Get instant, research-validated explanations at 2 AM or 2 PM." }
            ].map((f, i) => (
              <AccordionItem key={i} value={`cap-${i}`} className="border-none bg-white/5 rounded-[2.5rem] px-8 py-2 hover:bg-white/10 transition-all">
                <AccordionTrigger className="hover:no-underline py-6 group">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <f.icon className="h-6 w-6 text-blue-400 group-hover:text-white" />
                    </div>
                    <h3 className="text-lg text-white font-semibold text-left">{f.title}</h3>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-8 pl-[4.5rem] pr-6">
                  <p className="text-white/50 text-[14px]  leading-relaxed">{f.desc}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* DECISION FRAMEWORK */}
      <section className="py-32 bg-white">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-semibold text-[#1e1b4b]">Choose your path</h2>
            <p className="text-xl text-[#1e1b4b]/40 font-semibold uppercase tracking-wide">Quick Decision Framework</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h3 className="text-2xl font-semibold text-blue-600 px-4 border-l-8 border-blue-600">1. Where are you now?</h3>
              <div className="grid gap-4">
                {[
                  { q: "GRADE 7-8", path: "Foundation & Foundational O-Level Bridge Courses", start: "Pre-O-Level Victory Program" },
                  { q: "O-LEVEL YEAR 1", path: "Foundational O-Level Bridge Courses & Mastery", start: "Complete O-Level Subject Preparation" },
                  { q: "O-LEVEL YEAR 2-3", path: "O-Level Mastery", start: "Complete O-Level Subject Preparation" },
                  { q: "EXAM PREP", path: "Exam Specialization", start: "Real-Time Exam Preparation" },
                ].map((item, i) => (
                  <div key={i} className="p-8 bg-blue-50 rounded-3xl border-2 border-white hover:border-blue-100 transition-all">
                    <span className="text-[14px] font-semibold text-[#2366c9]">{item.q}</span>
                    <h4 className="text-xl font-semibold text-[#1e1b4b] mt-2 mb-1">{item.path}</h4>
                    <p className="text-xs text-[#1e1b4b]/40 font-semibold uppercase">Start With: {item.start}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl font-semibold text-blue-600 px-4 border-l-8 border-blue-600">2. Biggest challenge?</h3>
              <div className="grid gap-4">
                {[
                  { q: "Foundation Gaps", path: "Diagnostic + Remedial + Foundational O-Level Bridge Courses" },
                  { q: "Complete Prep", path: "Pre-O-Level Victory Program" },
                  { q: "Exam Technique", path: "Real-Time Exam Preparation" },
                  { q: "English Weakness", path: "English Paper 1 & 2 Skill Dev" },
                ].map((item, i) => (
                  <div key={i} className="p-8 bg-blue-50 rounded-3xl border-2 border-white hover:border-blue-100 transition-all flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-semibold text-[#1e1b4b]">{item.q}</h4>
                      <p className="text-xs text-[#1e1b4b]/40 font-semibold uppercase mt-1">Recommended: {item.path}</p>
                    </div>
                    <ArrowRight className="text-blue-600" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS LISTING */}
      <div className="container-custom py-24 bg-blue-50/30 rounded-[5rem] my-32 border-4 border-white shadow-inner">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-semibold text-[#1e1b4b] mb-4">Explore specific courses</h2>
          <div className="w-24 h-4 bg-[#2366c9] mx-auto rounded-full"></div>
        </div>

        <Tabs defaultValue="All" className="w-full">
          <div className="flex justify-center mb-16">
            <TabsList className="grid w-full max-w-3xl grid-cols-4 bg-white p-2 rounded-[2rem] border-2 border-blue-100 shadow-lg">
              {categories.map((cat) => (
                <TabsTrigger 
                  key={cat} 
                  value={cat}
                  className="rounded-2xl data-[state=active]:bg-[#2366c9] data_[state=active]:text-white data_[state=active]:shadow-xl font-semibold text-xs transition-all h-12"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="All" className="mt-0 outline-none">
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-[400px] w-full rounded-[3rem] bg-white" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {programs?.map((program, i) => (
                  <motion.div
                    key={program.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <ProgramCard program={program} />
                  </motion.div>
                ))}
                {(!programs || programs.length === 0) && (
                  <div className="col-span-full text-center py-32 bg-white rounded-[3rem] border-4 border-dashed border-blue-100 shadow-inner">
                    <p className="text-[#1e1b4b]/30 font-semibold text-[14px]">No programs found.</p>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          {categories.filter(c => c !== "All").map((cat) => (
            <TabsContent key={cat} value={cat} className="mt-0 outline-none">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                 {programs?.filter(p => p.category && p.category.includes(cat === "O-Level" ? "o_level" : cat.toLowerCase().replace(" ", "_"))).map((program, i) => (
                  <motion.div
                    key={program.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <ProgramCard program={program} />
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* PRICING & BUNDLES */}
      <section className="py-28 bg-blue-50 border-y-4 border-blue-100">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-semibold text-[#1e1b4b] mb-4">Flexible bundles</h2>
            <p className="text-xl text-[#1e1b4b]/40 font-semibold uppercase tracking-wide">Save Up to 40% with Subject Packages</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "2 Subjects", price: "$99", save: "$31", features: ["100% Syllabus Coverage", "24/7 AI Support", "Diagnostic Included"] },
              { title: "4 Subjects", price: "$170", save: "$90", features: ["100% Syllabus Coverage", "24/7 AI Support", "Diagnostic Included", "Custom Roadmap"], popular: true },
              { title: "8 Subjects", price: "$299", save: "$221", features: ["Complete O-Level Suite", "24/7 AI Support", "Priority Diagnostic", "Full Career Roadmap"] }
            ].map((pkg, i) => (
              <div key={i} className={`p-12 rounded-[3.5rem] border-4 ${pkg.popular ? 'border-[#2366c9] bg-white shadow-2xl' : 'border-white bg-white/50 shadow-sm'} relative`}>
                {pkg.popular && <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#2366c9] text-white px-6 py-2 rounded-full text-xs font-semibold">Most popular</span>}
                <h3 className="text-2xl font-semibold text-[#1e1b4b] mb-2">{pkg.title}</h3>
                <div className="flex items-end gap-2 mb-8">
                  <span className="text-5xl font-semibold text-[#2366c9]">{pkg.price}</span>
                  <span className="text-[14px] font-semibold text-[#1e1b4b]/40 uppercase mb-2">/ year</span>
                </div>
                <ul className="space-y-4 mb-10">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="text-[14px] font-semibold text-[#1e1b4b]/70 flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2366c9]" /> {f}
                    </li>
                  ))}
                </ul>
                <div className="text-[14px] font-medium text-emerald-500 bg-emerald-50/70 inline-block px-3 py-1 rounded-full mb-8">Save {pkg.save} vs individual</div>
                <Button className={`w-full h-16 rounded-2xl font-semibold ${pkg.popular ? 'bg-[#2366c9] hover:bg-blue-600 shadow-lg shadow-blue-200' : 'bg-[#1e1b4b] hover:bg-black'}`}>Select package</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 bg-[#1e1b4b] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.2)_0%,transparent_70%)] pointer-events-none"></div>
        <div className="container-custom relative z-10">
          <h2 className="text-4xl md:text-6xl text-white font-semibold mb-12 leading-none">Not sure which path <span className="text-blue-400">to take?</span></h2>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <Button size="lg" className="h-20 px-12 bg-[#2366c9] hover:bg-blue-600 rounded-2xl text-xl font-semibold shadow-xl">
              Take Free Diagnostic (90 Min)
            </Button>
            <Button size="lg" variant="outline" className="h-20 px-12 border-4 border-white/10 bg-white/5 hover:bg-white/10 rounded-2xl text-xl font-semibold shadow-lg">
              Talk to Education Expert
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
