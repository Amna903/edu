import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Trophy, Zap, BarChart3, GraduationCap, BookOpen, PieChart, Languages, ArrowRight, Download } from "lucide-react";
import { InquiryDialog } from "@/components/InquiryDialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Schools() {
  return (
    <Layout>
      {/* SECTION 1: HERO - PROBLEM → SOLUTION */}
      <section className="bg-[#1e1b4b] py-16 md:py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.2)_0%,transparent_50%)]"></div>
        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1"
            >
              <Badge className="bg-[#2366c9] text-white border-none px-6 py-2 mb-8 font-semibold text-xs rounded-full shadow-xl shadow-[#2366c9]/20">
                COMPLETE O-LEVEL TRANSFORMATION SYSTEM
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight text-white">
                Transform Your <br/><span className="text-blue-400">O-Level</span> Program
              </h1>
              <p className="text-lg text-blue-100/80 mb-8 leading-relaxed font-medium max-w-2xl">
                Research-Backed Platform Used by 150+ Schools. Zero Upfront Investment.
              </p>
              
              <div className="grid gap-4 mb-16">
                <p className="text-lg font-bold text-red-400 mb-2">Is your school facing these challenges?</p>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Pass rates below 60% (national 35%)",
                    "Parents spending $2.4k-$3.6k on tutors",
                    "Student foundation gaps",
                    "Teacher burnout (60h/wk)",
                    "Limited resource quality",
                    "Difficulty competing with academies",
                    "No data-driven insights"
                  ].map((text, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-bold text-white/70">
                      <span className="text-red-500">❌</span> {text}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-6">
                <InquiryDialog 
                  defaultType="school_charter"
                  title="School Partnership Inquiry"
                  trigger={
                    <Button size="lg" className="bg-[#2366c9] hover:bg-blue-500 text-white font-semibold px-8 h-10 rounded-lg text-sm shadow-md active:scale-95 transition-all">
                      Get started now
                    </Button>
                  }
                />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 w-full max-w-2xl relative"
            >
              <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-6 text-blue-400">The transformation</h3>
                <ul className="space-y-6">
                  {[
                    { val: "91%", label: "Pass Rate", sub: "vs 35% national average" },
                    { val: "47%", label: "A/A* Achievement", sub: "vs 18% typical" },
                    { val: "$678", label: "Premium Content FREE", sub: "Per student value" },
                    { val: "5-6h", label: "Saved Per Teacher", sub: "Weekly automation" }
                  ].map((stat, i) => (
                    <li key={i} className="flex items-center gap-6 group">
                      <div className="text-3xl font-bold text-white w-24">{stat.val}</div>
                      <div>
                        <p className="text-xs font-semibold text-blue-400">{stat.label}</p>
                        <p className="text-xs font-medium text-white/40">{stat.sub}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHAT SCHOOLS ACTUALLY GET */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto mb-32">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-[#1e1b4b]">Complete <span className="text-[#2366c9]">Ecosystem</span></h2>
            <p className="text-lg text-[#1e1b4b]/40 font-semibold">Everything needed to transform student outcomes</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                title: "Academic Content",
                desc: "1000+ H5P interactive activities covering all subjects. Bridge programs, ATP courses, and English skill development included.",
                icon: BookOpen,
                value: "$678 Value/Student"
              },
              {
                title: "Diagnostic Systems",
                desc: "Precision gap analysis and predictive analytics identify at-risk students early with automated remedial assignments.",
                icon: PieChart,
                value: "AI-Powered"
              },
              {
                title: "Operational Automation",
                desc: "One-click test management, auto-grading, and workload reduction saving 5-6 hours per teacher weekly.",
                icon: Zap,
                value: "Teacher-Centric"
              },
              {
                title: "Multilingual Access",
                desc: "Content available in 100+ languages including Urdu, Arabic, and French. Bridge the language barrier instantly.",
                icon: Languages,
                value: "100+ Languages"
              },
              {
                title: "Teacher Development",
                desc: "SMK certification, 10X Learning Leap Model training, and continuous support through weekly office hours.",
                icon: GraduationCap,
                value: "Certified Training"
              },
              {
                title: "Real-Time Reporting",
                desc: "Automated progress summaries for parents and detailed analytics dashboards for administrators.",
                icon: BarChart3,
                value: "Data-Driven"
              }
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ y: -10 }}>
                <Card className="border border-blue-50 shadow-md hover:border-[#2366c9] transition-all group rounded-xl bg-white h-full flex flex-col">
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="h-16 w-16 bg-blue-50 text-[#2366c9] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#2366c9] group-hover:text-white transition-all shadow-lg">
                      <item.icon className="h-8 w-8" />
                    </div>
                    <Badge className="w-fit mb-2 bg-blue-100 text-blue-700 hover:bg-blue-100 border-none px-4">{item.value}</Badge>
                    <h3 className="text-xl font-bold mb-4 text-[#1e1b4b]">{item.title}</h3>
                    <p className="text-[#1e1b4b]/60 font-medium text-sm leading-relaxed mb-6 flex-1">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: ACADEMIC RESULTS PROOF */}
      <section className="py-16 md:py-24 bg-blue-50 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-[#1e1b4b]">University <br/><span className="text-[#2366c9]">Validated</span></h2>
              <div className="space-y-12">
                <div>
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-sm font-semibold text-[#1e1b4b]">Pass rate (EduMeUp)</span>
                    <span className="text-3xl font-bold text-[#2366c9]">91%</span>
                  </div>
                  <div className="h-6 bg-white rounded-full overflow-hidden border-2 border-blue-100 p-1">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "91%" }}
                      className="h-full bg-[#2366c9] rounded-full"
                    />
                  </div>
                  <div className="flex justify-between items-end mt-4 text-[#1e1b4b]/40">
                    <span className="text-[10px] font-semibold">Traditional average: 35%</span>
                    <span className="text-[10px] font-semibold">160% improvement</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-sm font-semibold text-[#1e1b4b]">A/A* achievement</span>
                    <span className="text-3xl font-bold text-[#2366c9]">47%</span>
                  </div>
                  <div className="h-6 bg-white rounded-full overflow-hidden border-2 border-blue-100 p-1">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "47%" }}
                      className="h-full bg-blue-400 rounded-full"
                    />
                  </div>
                  <div className="flex justify-between items-end mt-4 text-[#1e1b4b]/40">
                    <span className="text-[10px] font-semibold">Traditional average: 18%</span>
                    <span className="text-[10px] font-semibold">161% improvement</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#1e1b4b] p-6 rounded-xl text-white shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-blue-400">Retention outcome</h3>
              <div className="space-y-12">
                <div className="grid grid-cols-3 gap-8 text-center">
                  <div>
                    <p className="text-[10px] font-semibold text-blue-400 mb-2">Day 1</p>
                    <p className="text-3xl font-bold">100%</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-blue-400 mb-2">Day 30</p>
                    <p className="text-3xl font-bold text-green-400">90%</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-blue-400 mb-2">6 months</p>
                    <p className="text-3xl font-bold text-green-400">75%</p>
                  </div>
                </div>
                <div className="pt-12 border-t border-white/10">
                  <p className="text-lg font-bold mb-4">15× better retention</p>
                  <p className="text-white/60 font-medium text-sm leading-relaxed">
                    Traditional methods see students forget 95% within 6 months. EduMeUp students retain 75% due to active learning and spaced retrieval.
                  </p>
                </div>
                <Button variant="outline" className="w-full h-16 rounded-lg border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white font-semibold gap-2" onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/downloads/commercial-deck.pdf';
                  link.download = 'EduMeUp-Commercial-Deck.pdf';
                  link.click();
                }}>
                  <Download className="h-5 w-5" /> Download research report (PDF)
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: PARTNERSHIP & REVENUE MODELS */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto mb-32">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-[#1e1b4b]">Partnership <span className="text-[#2366c9]">models</span></h2>
            <p className="text-lg text-[#1e1b4b]/40 font-semibold">Strategic options for institution growth</p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-8">
            {[
              {
                id: "model1",
                title: "Model 1: Platform Replacement",
                subtitle: "Eliminate Evening Academies",
                details: "Students use EduMeUp instead of expensive evening academies. School recommends the platform, students save 85-90% on tutoring costs ($360/year vs $3,600/year).",
                revenue: "50% School | 50% EduMeUp revenue split on platform fees.",
                impact: "Immediate parent satisfaction and reduced community financial burden."
              },
              {
                id: "model2",
                title: "Model 2: School-Run Evening Academy",
                subtitle: "Maximize Institution Revenue",
                details: "School uses EduMeUp content to run its own evening academy program. School charges students $500-800/year for classes + platform.",
                revenue: "School keeps 100% of academy fees + 50% share of platform fees.",
                impact: "Builds school reputation and provides additional teacher employment."
              },
              {
                id: "model3",
                title: "Model 3: Integrated Tuition Model",
                subtitle: "Seamless Integration",
                details: "Platform cost is integrated into regular tuition fees. All students get mandatory access, ensuring 100% adoption and guaranteed results school-wide.",
                revenue: "Simplified billing and predictable revenue growth for the institution.",
                impact: "Total elimination of private tuition needs for all students."
              }
            ].map((model) => (
              <AccordionItem key={model.id} value={model.id} className="border border-blue-50 rounded-xl px-6 py-4 hover:border-blue-100 transition-all bg-blue-50/20">
                <AccordionTrigger className="hover:no-underline group">
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-[#1e1b4b] group-hover:text-blue-600 transition-colors">{model.title}</h3>
                    <p className="text-blue-400 font-semibold text-xs mt-1">{model.subtitle}</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-8 pb-4">
                  <div className="grid md:grid-cols-2 gap-12 border-t-2 border-white pt-8">
                    <div className="space-y-6">
                      <p className="text-lg text-[#1e1b4b]/70 font-medium leading-relaxed">{model.details}</p>
                      <div className="bg-white p-6 rounded-2xl border-2 border-blue-50">
                        <p className="text-xs font-semibold text-blue-600 mb-2">Projected impact</p>
                        <p className="text-sm font-bold text-[#1e1b4b]">{model.impact}</p>
                      </div>
                    </div>
                    <div className="bg-[#1e1b4b] text-white p-10 rounded-[2.5rem] shadow-xl">
                      <h4 className="text-xl font-bold text-blue-400 mb-6">Financial structure</h4>
                      <p className="text-sm font-bold leading-relaxed text-blue-100">{model.revenue}</p>
                      <div className="mt-8 pt-8 border-t border-white/10">
                        <InquiryDialog 
                          defaultType="school_charter"
                          title={`Apply for ${model.title}`}
                          trigger={
                            <Button className="w-full bg-[#2366c9] hover:bg-blue-500 text-white font-semibold h-12 rounded-lg">Select this model</Button>
                          }
                        />
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* SECTION 5: PARTNERSHIP TIERS */}
      <section className="py-16 md:py-24 bg-blue-50">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto mb-32">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-[#1e1b4b]">Available <span className="text-[#2366c9]">tiers</span></h2>
            <p className="text-lg text-[#1e1b4b]/40 font-semibold">Limited enrollment for 2026</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {[
              {
                tier: "CHARTER TIER",
                limit: "10 Founding Schools",
                desc: "Permanent charter status + 20% lifetime discount + founder privileges.",
                status: "6 spots remaining",
                color: "bg-[#1e1b4b]",
                textColor: "text-white"
              },
              {
                tier: "GROWTH TIER",
                limit: "Mid-Size Institutions",
                desc: "Complete platform access + standard support + revenue sharing.",
                status: "Open Enrollment",
                color: "bg-white",
                textColor: "text-[#1e1b4b]"
              },
              {
                tier: "FOUNDATION TIER",
                limit: "Small Schools",
                desc: "Essential features + community support + flexible terms.",
                status: "Open Enrollment",
                color: "bg-white",
                textColor: "text-[#1e1b4b]"
              }
            ].map((option, i) => (
              <div key={i} className={`p-6 rounded-xl border border-white flex flex-col ${option.color} ${option.textColor} shadow-lg`}>
                <h3
                  className={`text-3xl font-bold mb-2 tracking-tighter ${
                    option.tier === "CHARTER TIER" ? "text-white" : ""
                  }`}
                >
                  {option.tier}
                </h3>
                <p className="text-xs font-semibold text-blue-400 mb-6">{option.limit}</p>
                <p className="text-lg font-medium leading-relaxed mb-12 flex-1">{option.desc}</p>
                <div className="pt-8 border-t border-blue-200/20">
                  <p className="text-xs font-semibold mb-8">{option.status}</p>
                  <InquiryDialog 
                    defaultType="school_charter"
                    title="Partnership Application"
                    trigger={
                      <Button className="w-full h-12 rounded-lg bg-[#2366c9] text-white font-semibold">Apply now</Button>
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 md:py-24 bg-[#1e1b4b] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.2)_0%,transparent_70%)]"></div>
        <div className="container-custom relative z-10">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-white"
          >
            Ready to <span className="text-blue-400">lead</span> your city?
          </motion.h2>
          <p className="text-lg text-blue-100/80 mb-12 max-w-3xl mx-auto font-medium ">
            Applications for 2026 Charter membership close March 31. Secure your institution's legacy today.
          </p>
          <InquiryDialog 
            defaultType="school_charter"
            title="School Partnership Inquiry"
            trigger={
            <Button size="lg" className="bg-[#2366c9] hover:bg-blue-500 text-white font-bold h-28 px-20 rounded-3xl text-2xl shadow-2xl active:scale-95 transition-all border-b-[10px] border-blue-800">
                   Apply for charter
              </Button>
            }
          />
          <p className="mt-8 text-[#2366c9] font-semibold text-xs">Serving 50,000+ students globally</p>
        </div>
      </section>
    </Layout>
  );
}
