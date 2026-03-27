import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Search, FileText, CheckCircle2, Zap, LayoutDashboard, Microscope, BookOpen, Clock, Users, ShieldCheck, PieChart, ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "wouter";

export default function Resources() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");

  const freeResources = [
    { title: "Physics - Forces and Motion", type: "Magic Sheet", subject: "physics", icon: FileText },
    { title: "Chemistry - Ionic Bonding", type: "Magic Sheet", subject: "chemistry", icon: FileText },
    { title: "Biology - Photosynthesis", type: "Magic Sheet", subject: "biology", icon: FileText },
    { title: "Mathematics - Algebra Basics", type: "Magic Sheet", subject: "math", icon: FileText },
    { title: "Economics - Supply and Demand", type: "Magic Sheet", subject: "economics", icon: FileText },
    { title: "Physics - Forces Calculations", type: "Workbook", subject: "physics", icon: BookOpen },
    { title: "Chemistry - Balancing Equations", type: "Workbook", subject: "chemistry", icon: BookOpen },
    { title: "Mathematics - Quadratic Equations", type: "Workbook", subject: "math", icon: BookOpen },
    { title: "Weekly Study Schedule", type: "Planner", subject: "general", icon: Clock },
    { title: "O-Level Survival Guide", type: "Guide", subject: "general", icon: ShieldCheck },
  ];

  const filteredResources = freeResources.filter(r => 
    (category === "all" || r.type.toLowerCase().replace(" ", "_") === category) &&
    (r.title.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Layout>
      {/* SECTION 1: HERO */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-blue-50/80 to-white text-center">
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          
            <h1 className="text-5xl md:text-6xl text-slate-900 font-semibold font-display mb-8 leading-tight">
              Experience <span className="text-[#2366c9]">$698</span> worth of resources free
            </h1>
            <p className="text-2xl text-slate-700 max-w-3xl mx-auto mb-16 font-medium">
              Everything here is free. Forever. No credit card. No hidden costs. 
              Just research-backed learning resources to help you succeed.
            </p>

            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center bg-white p-10 rounded-2xl border border-blue-100 shadow-sm text-left">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-blue-400">Free resources â€“ no catch</h3>
                <ul className="space-y-4">
                  {[
                    "15+ Interactive Module Samples",
                    "10 Subject Magic Sheets",
                    "12 Sample Workbooks",
                    "Study Planning Templates",
                    "Parent Guides",
                    "Expert Roadmaps",
                    "Diagnostic Test Samples"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-[14px] font-medium text-slate-700">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-center">
                <div className="text-5xl font-semibold mb-4 text-slate-900">$698</div>
                <div className="text-[#2366c9] font-semibold text-xs mb-10">Total sample value free</div>
                <Button className="w-full bg-[#2366c9] hover:bg-blue-700 text-white font-semibold text-[14px] py-3 px-6">
                  Take Free Diagnostic Test
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: WHY WE OFFER FREE RESOURCES */}
      <section className="py-40 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto mb-32">
            <Badge className="bg-blue-50 text-[#2366c9] mb-6 px-4 py-1 rounded-full font-semibold">Our commitment</Badge>
            <h2 className="text-4xl md:text-5xl font-semibold font-display mb-8 text-slate-900 leading-tight">Accessible <span className="text-[#2366c9]">education</span></h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-slate-900">1. Experience quality before purchasing</h3>
                <p className="text-lg text-slate-900/60 font-medium leading-relaxed">
                  These aren't low-quality "freebies" designed to upsell. These are actual samples from our premium courses—same quality, same standards. Try before you buy and see our research-backed methodology firsthand.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-slate-900">2. Support those who cannot afford</h3>
                <p className="text-lg text-slate-900/60 font-medium leading-relaxed">
                  Education is a right, not a privilege. Even if you never purchase our Exam Mastery Path programs, these resources are yours to keep. Supplement school learning, prepare for exams independently, and improve grades without expensive tutoring.
                </p>
              </div>
            </div>

            <div className="bg-[#2366c9] p-16 rounded-[4rem] text-white">
               <h3 className="text-2xl font-semibold mb-10 text-blue-400">What makes this different</h3>
               <div className="space-y-6">
                 <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-6">
                   <div className="text-red-400 font-semibold text-xs">Traditional freebies</div>
                   <div className="text-green-400 font-semibold text-xs">EduMeUp free resources</div>
                 </div>
                 <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-6">
                   <div className="text-white/40 font-semibold italic">Low-quality upsell</div>
                   <div className="text-white font-semibold">Premium course samples âœ“</div>
                 </div>
                 <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-6">
                   <div className="text-white/40 font-semibold italic">Generic textbook copy</div>
                   <div className="text-white font-semibold">Purpose-built, tested âœ“</div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <div className="text-white/40 font-semibold italic">Time-limited access</div>
                   <div className="text-white font-semibold">Free forever, unlimited âœ“</div>
                 </div>
               </div>
               <Link href="/programs">
                 <Button className="w-full mt-12 h-20 bg-[#2366c9] hover:bg-blue-500 rounded-2xl font-semibold">Explore full programs</Button>
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: EVIDENCE-BASED DESIGN */}
      <section className="py-40 bg-blue-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
             <div>
               <h2 className="text-4xl md:text-5xl font-semibold mb-10 text-slate-900 leading-tight">Evidence-based <span className="text-[#2366c9]">design</span></h2>
               <p className="text-xl text-slate-900/60 font-medium mb-12">We don't create resources based on guesswork. Every resource follows a rigorous 5-step process.</p>
               <div className="space-y-6">
                 {[
                   "Research Analysis - 50+ studies per type",
                   "Cognitive Science Design - Proven strategies",
                   "Expert Review - Pedagogical validation",
                   "Pilot Testing - Real student tracking",
                   "Continuous Improvement - Annual updates"
                 ].map((step, i) => (
                   <div key={i} className="flex items-center gap-4 p-6 bg-white rounded-2xl border-2 border-blue-100 shadow-sm">
                     <div className="h-10 w-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">{i+1}</div>
                     <span className="font-semibold text-slate-900 text-[14px]">{step}</span>
                   </div>
                 ))}
               </div>
             </div>
             <div className="bg-[#2366c9] p-16 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                <Microscope className="absolute -top-10 -right-10 h-60 w-60 text-blue-500 opacity-10" />
                <h3 className="text-2xl font-semibold mb-8 text-blue-400">Quality threshold</h3>
                <div className="text-5xl font-semibold text-white mb-4">85%</div>
                <p className="text-blue-100/60 font-medium uppercase tracking-widest text-xs mb-10">Minimum student satisfaction rate</p>
                <div className="text-5xl font-semibold text-white mb-4">70%</div>
                <p className="text-blue-100/60 font-medium uppercase tracking-widest text-xs mb-10">Minimum improvement on topic assessments</p>
                <div className="pt-10 border-t border-white/10">
                  <p className="text-xs font-medium text-blue-200 italic">"Active learning produces 6% higher scores and 55% reduction in failures." (Freeman et al., 2014)</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: INTERACTIVE MODULES */}
      <section className="py-40 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto mb-32">
             <h2 className="text-4xl md:text-5xl font-semibold mb-8 text-slate-900 leading-tight">Experience <span className="text-[#2366c9]">interactive</span> courses</h2>
             <p className="text-lg text-slate-900/40 font-medium">Free access to 15 selected modules</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { s: "Physics", t: "Newton's Laws", time: "45-60 min", link: "https://moodle.example.com/physics1" },
              { s: "Chemistry", t: "Atomic Structure", time: "55-70 min", link: "https://moodle.example.com/chem1" },
              { s: "Biology", t: "Cell Organization", time: "50-60 min", link: "https://moodle.example.com/bio1" },
              { s: "Math", t: "Linear Equations", time: "45-60 min", link: "https://moodle.example.com/math1" },
              { s: "Economics", t: "Market Equilibrium", time: "65-80 min", link: "https://moodle.example.com/econ1" },
              { s: "Business", t: "Marketing Mix (4 Ps)", time: "60-75 min", link: "https://moodle.example.com/biz1" }
            ].map((mod, i) => (
              <Card key={i} className="rounded-[3rem] border-4 border-blue-50 overflow-hidden hover:border-[#2366c9] transition-all group shadow-xl">
                 <CardHeader className="p-10 bg-blue-50 group-hover:bg-[#2366c9] transition-colors">
                    <Badge className="bg-[#2366c9] text-white w-fit mb-4">{mod.s}</Badge>
                    <h4 className="text-2xl font-semibold text-slate-900 group-hover:text-white leading-none">{mod.t}</h4>
                 </CardHeader>
                 <CardContent className="p-10">
                    <p className="text-xs font-medium text-slate-900/40 mb-10 flex items-center gap-2">
                       <Clock className="h-4 w-4" /> {mod.time}
                    </p>
                    <Button className="w-full bg-[#2366c9] hover:bg-[#2366c9] h-16 rounded-xl font-semibold" onClick={() => window.open(mod.link, '_blank')}>
                      START MODULE
                    </Button>
                 </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-32 p-16 bg-[#2366c9] rounded-[4rem] text-white text-center shadow-2xl relative overflow-hidden">
            <Zap className="absolute -top-10 -left-10 h-40 w-40 text-blue-500 opacity-10" />
            <h3 className="text-3xl text-white font-semibold mb-8">Ready for the full structured course?</h3>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-16 font-medium">1000+ interactive modules, automated spaced repetition, adaptive difficulty, and 24/7 AI support.</p>
            <div className="flex flex-wrap justify-center gap-8">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-blue-50 h-20 px-12 rounded-2xl font-semibold">Explore Free Library</Button>
              <Link href="/programs">
                <Button size="lg" variant="outline" className="border-4 border-white text-white hover:bg-white/10 h-20 px-12 rounded-2xl font-semibold">Explore full programs</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 & 6: DOWNLOADS */}
      <section className="py-40 bg-blue-50">
        <div className="container-custom">
           <div className="text-center max-w-4xl mx-auto mb-32">
             <h2 className="text-4xl md:text-5xl font-semibold mb-8 text-slate-900 leading-tight">Revision <span className="text-[#2366c9]">& practice</span> tools</h2>
             <p className="text-lg text-slate-900/40 font-medium">Download premium magic sheets and workbooks</p>
          </div>

          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-6 mb-20 bg-white p-6 rounded-[3rem] shadow-xl border-4 border-blue-900/10">
            <div className="relative flex-1">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-blue-400" />
              <Input 
                placeholder="Search resources..." 
                className="pl-16 h-16 rounded-2xl border-blue-50 bg-blue-50/50 focus:bg-white transition-all font-semibold"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full sm:w-[260px] h-16 rounded-2xl border-blue-50 bg-blue-50/50 font-semibold">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="magic_sheet">Magic Sheets</SelectItem>
                <SelectItem value="workbook">Workbooks</SelectItem>
                <SelectItem value="planner">Planners</SelectItem>
                <SelectItem value="guide">Guides</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredResources.map((res, i) => (
               <Card key={i} className="rounded-[3rem] border-4 border-white shadow-xl bg-white group hover:border-[#2366c9] transition-all">
                  <CardContent className="p-10">
                     <div className="h-20 w-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 text-[#2366c9] group-hover:scale-110 transition-transform">
                        <res.icon className="h-10 w-10" />
                     </div>
                     <Badge className="bg-blue-100 text-[#2366c9] mb-4 border-none">{res.type}</Badge>
                     <h4 className="text-2xl font-semibold text-slate-900 leading-tight mb-8">{res.title}</h4>
                     <Button className="w-full bg-[#2366c9] hover:bg-[#2366c9] h-16 rounded-xl font-semibold gap-2">
                        <Download className="h-5 w-5" /> DOWNLOAD PDF
                     </Button>
                  </CardContent>
               </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: PARENT SUPPORT */}
      <section className="py-20 md:py-28 bg-[#2366c9] text-white relative overflow-hidden">
        <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-blue-600 opacity-30 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-blue-600 opacity-30 blur-3xl" aria-hidden="true" />
        <div className="container-custom relative z-10">
           <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="bg-white p-8 rounded-xl border border-blue-200 shadow-sm">
                 <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-[#2366c9] leading-tight">Parent support</h2>
                 <p className="text-[14px] text-black font-medium mb-8">Supporting your child's O-Level journey with research-backed guides.</p>
                 <div className="space-y-3">
                    {[
                      "O-Level Survival Guide (20 pages)",
                      "Monthly Parent Check-In Guide",
                      "Tutor Evaluation Rubric",
                      "Understanding Cambridge Reports"
                    ].map((guide, i) => (
                      <div key={i} className="flex items-center justify-between p-4 border border-blue-100 rounded-lg bg-blue-50/50 hover:border-[#2366c9] transition-all group">
                         <span className="font-medium text-[14px] text-black">{guide}</span>
                         <Button variant="ghost" className="text-[#2366c9] hover:text-blue-700 p-0 h-auto">
                            <Download className="h-5 w-5" />
                         </Button>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="space-y-8">
                 <h2 className="text-4xl md:text-5xl text-white font-semibold leading-tight">Schools use these resources</h2>
                 <p className="text-base text-blue-200 font-medium leading-relaxed">Many partner schools distribute our parent guides during O-Level orientation programs to help families understand the system.</p>
                  <Link href="/for-schools">
                    <Button size="lg" className="w-full md:w-auto min-w-[260px] bg-white text-[#2366c9] hover:bg-blue-50 font-semibold py-3 px-6 rounded-xl text-[14px] shadow-md flex items-center justify-center gap-2">
                      Explore Schools <ArrowRight className="h-4 w-4" />
                    </Button>
                 </Link>
              </div>
           </div>
        </div>
      </section>

      {/* FINAL CTA: FREE VS PAID */}
      <section className="py-40 bg-white">
        <div className="container-custom">
           <div className="text-center max-w-4xl mx-auto mb-32">
              <h2 className="text-4xl md:text-5xl font-semibold mb-8 text-slate-900 leading-tight">Value <span className="text-[#2366c9]">comparison</span></h2>
              <p className="text-lg text-slate-900/40 font-medium">Free resources vs full programs</p>
           </div>
           
           <div className="max-w-5xl mx-auto border-8 border-blue-50 rounded-[4rem] overflow-hidden shadow-2xl">
              <div className="grid grid-cols-3 bg-[#2366c9] text-white p-10 font-semibold text-xs">
                 <div>Feature</div>
                 <div className="text-center">Free Resources</div>
                 <div className="text-center text-blue-400">Paid Programs</div>
              </div>
              {[
                { f: "Module Access", free: "15 Samples", paid: "1000+ Modules" },
                { f: "Syllabus Coverage", free: "Topic Samples", paid: "100% Comprehensive" },
                { f: "AI Tutor Support", free: "âœ•", paid: "24/7 Unlimited" },
                { f: "Analytics Dashboards", free: "âœ•", paid: "Student, Parent, School" },
                { f: "Spaced Repetition", free: "âœ•", paid: "Automated System" },
                { f: "Adaptive Difficulty", free: "âœ•", paid: "AI-Driven" }
              ].map((row, i) => (
                <div key={i} className={`grid grid-cols-3 p-10 border-b-2 border-blue-50 font-semibold uppercase text-[14px] ${i % 2 === 0 ? 'bg-white' : 'bg-blue-50/20'}`}>
                   <div className="text-slate-900">{row.f}</div>
                   <div className="text-center text-slate-900/40">{row.free}</div>
                   <div className="text-center text-[#2366c9] font-semibold">{row.paid}</div>
                </div>
              ))}
           </div>
           <div className="text-center mt-16">
              <Link href="/programs">
                <Button size="lg" className="bg-[#2366c9] hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl text-[14px] shadow-md inline-flex items-center gap-2">
                  Upgrade to Full Access <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
           </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 md:py-32 bg-[#2366c9] text-white relative overflow-hidden">
        <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-blue-600 opacity-30 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-blue-600 opacity-30 blur-3xl" aria-hidden="true" />
        <div className="container-custom text-center relative z-10">
          <div className="flex justify-center w-full mb-6">
            <h2 className="text-4xl md:text-6xl text-white font-semibold leading-[1.05] mb-3 text-center tracking-tight px-4">
              Start Learning — Free, Right Now
            </h2>
          </div>
          <p className="text-base text-blue-200 mb-12 max-w-3xl mx-auto">
            Take the free diagnostic to find your exact gaps, then explore the full resource library.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6 max-w-5xl mx-auto">
            <Link href="/programs/ai-diagnostic">
              <Button size="lg" className="w-full md:w-auto min-w-[260px] bg-white text-[#2366c9] hover:bg-blue-50 font-semibold py-3 px-6 rounded-xl text-[14px] shadow-md flex items-center justify-center gap-2">
                Take Free Diagnostic <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/programs">
              <Button size="lg" variant="outline" className="w-full md:w-auto min-w-[260px] border border-white/30 text-white hover:bg-white/10 font-semibold py-3 px-6 rounded-xl text-[14px] shadow-md flex items-center justify-center gap-2">
                Browse All Programs <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

