import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Trophy, Zap, BarChart3, GraduationCap, BookOpen, PieChart, Languages, ArrowRight, Download, XCircle } from "lucide-react";
import { InquiryDialog } from "@/components/InquiryDialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Schools() {
  return (
    <Layout>
      {/* SECTION 1: HERO - PROBLEM → SOLUTION */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-brand-primary-soft to-white">
        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1"
            >
             
              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight text-neutral-text">
                Transform Your <br/><span className="text-brand-primary">O-Level</span> Program
              </h1>
              <p className="text-lg text-neutral-muted mb-8 leading-relaxed font-medium max-w-2xl">
                Research-Backed Platform. Zero Upfront Investment.
              </p>
              
              <div className="grid gap-4 mb-16">
                <p className="text-lg font-semibold text-status-danger mb-2">Is your school facing these challenges?</p>
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
                    <li key={i} className="flex items-center gap-3 text-base font-semibold text-neutral-muted">
                      <XCircle className="h-4 w-4 text-status-danger" /> {text}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-4">
                <InquiryDialog 
                  defaultType="school_charter"
                  title="School Partnership Inquiry"
                  trigger={
                    <Button className="bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold text-base py-6 px-8 h-auto rounded-xl">
                      Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
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
              <div className="bg-white p-6 rounded-xl border border-brand-primary-soft shadow-sm">
                <h3 className="text-2xl font-bold mb-6 text-brand-primary">The transformation</h3>
                <ul className="space-y-6">
                  {[
                    { val: "91%", label: "Pass Rate", sub: "vs 35% national average" },
                    { val: "47%", label: "A/A* Achievement", sub: "vs 18% typical" },
                    { val: "$678", label: "Premium Content FREE", sub: "Per student value" },
                    { val: "5-6h", label: "Saved Per Teacher", sub: "Weekly automation" }
                  ].map((stat, i) => (
                    <li key={i} className="flex items-center gap-6 group">
                      <div className="text-3xl font-bold text-neutral-text w-24">{stat.val}</div>
                      <div>
                        <p className="text-xs font-bold text-brand-primary uppercase tracking-wider">{stat.label}</p>
                        <p className="text-xs font-medium text-neutral-muted">{stat.sub}</p>
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
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-neutral-text">Complete <span className="text-brand-primary">Ecosystem</span></h2>
            <p className="text-lg text-neutral-muted font-semibold italic">Everything needed to transform student outcomes</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                title: "Academic Content",
                desc: "1000+ H5P interactive activities covering all subjects. Foundational O-Level Bridge Courses, ATP courses, and English skill development included.",
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
                <Card className="border-brand-primary/20 border border-neutral-surface-alt shadow-md hover:border-brand-primary transition-all group rounded-2xl bg-white h-full flex flex-col overflow-hidden">
                  <CardContent className="p-8 h-full flex flex-col">
                    <div className="h-16 w-16 bg-brand-primary-soft text-brand-primary rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-primary group-hover:text-white transition-all shadow-sm">
                      <item.icon className="h-8 w-8" />
                    </div>
                    <Badge className="w-fit mb-3 bg-brand-primary-soft text-brand-primary hover:bg-brand-primary-soft border-none px-4 py-1 text-xs font-bold">{item.value}</Badge>
                    <h3 className="text-xl font-bold mb-4 text-neutral-text">{item.title}</h3>
                    <p className="text-neutral-muted font-medium text-base leading-relaxed mb-6 flex-1">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: ACADEMIC RESULTS PROOF */}
      <section className="py-16 md:py-24 bg-brand-primary-soft relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-neutral-text">University <br/><span className="text-brand-primary">Validated</span></h2>
              <div className="space-y-12">
                <div>
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-base font-bold text-neutral-text uppercase tracking-tight">Pass rate (EduMeUp)</span>
                    <span className="text-4xl font-bold text-brand-primary">91%</span>
                  </div>
                  <div className="h-6 bg-white rounded-full overflow-hidden border-2 border-brand-primary-soft p-1">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "91%" }}
                      className="h-full bg-brand-primary rounded-full"
                    />
                  </div>
                  <div className="flex justify-between items-end mt-4 text-neutral-muted">
                    <span className="text-sm font-bold">Traditional average: 35%</span>
                    <span className="text-sm font-bold text-status-success">160% improvement</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-base font-bold text-neutral-text uppercase tracking-tight">A/A* achievement</span>
                    <span className="text-4xl font-bold text-brand-primary">47%</span>
                  </div>
                  <div className="h-6 bg-white rounded-full overflow-hidden border-2 border-brand-primary-soft p-1">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "47%" }}
                      className="h-full bg-brand-sky rounded-full"
                    />
                  </div>
                  <div className="flex justify-between items-end mt-4 text-neutral-muted">
                    <span className="text-sm font-bold">Traditional average: 18%</span>
                    <span className="text-sm font-bold text-status-success">161% improvement</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-brand-navy p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
              <h3 className="text-2xl font-bold mb-8 text-brand-sky uppercase tracking-wider">Retention outcome</h3>
              <div className="space-y-12">
                <div className="grid grid-cols-3 gap-8 text-center">
                  <div>
                    <p className="text-xs font-bold text-brand-sky mb-2 uppercase tracking-tight">Day 1</p>
                    <p className="text-3xl font-bold">100%</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-brand-sky mb-2 uppercase tracking-tight">Day 30</p>
                    <p className="text-3xl font-bold text-status-success">90%</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-brand-sky mb-2 uppercase tracking-tight">6 months</p>
                    <p className="text-3xl font-bold text-status-success">75%</p>
                  </div>
                </div>
                <div className="pt-12 border-t border-white/10">
                  <p className="text-xl font-bold mb-4 text-white">15× better retention</p>
                  <p className="text-blue-100/70 font-medium text-base leading-relaxed">
                    Traditional methods see students forget 95% within 6 months. EduMeUp students retain 75% due to active learning and spaced retrieval.
                  </p>
                </div>
                <Button variant="outline" className="w-full h-16 rounded-xl border border-brand-sky text-brand-sky hover:bg-brand-sky hover:text-white font-bold gap-2 text-base transition-all" onClick={() => {
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
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-neutral-text">Partnership <span className="text-brand-primary">models</span></h2>
            <p className="text-lg text-neutral-muted font-semibold italic">Strategic options for institution growth</p>
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
              <AccordionItem key={model.id} value={model.id} className="border border-brand-primary-soft rounded-2xl px-8 py-6 hover:border-brand-primary transition-all bg-neutral-surface shadow-sm">
                <AccordionTrigger className="hover:no-underline group">
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-neutral-text group-hover:text-brand-primary transition-colors">{model.title}</h3>
                    <p className="text-brand-sky font-bold text-xs mt-2 uppercase tracking-wider">{model.subtitle}</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-10 pb-4">
                  <div className="grid md:grid-cols-2 gap-16 border-t border-neutral-border pt-10">
                    <div className="space-y-8">
                      <p className="text-lg text-neutral-muted font-medium leading-relaxed">{model.details}</p>
                      <div className="bg-white p-6 rounded-2xl border border-neutral-border shadow-sm">
                        <p className="text-xs font-bold text-brand-primary mb-3 uppercase tracking-wider">Projected impact</p>
                        <p className="text-base font-bold text-neutral-text">{model.impact}</p>
                      </div>
                    </div>
                    <div className="bg-brand-primary text-white p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden">
                      <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 translate-x-1/2 blur-2xl" />
                      <h4 className="text-xl font-bold text-blue-200 mb-6 uppercase tracking-wider">Financial structure</h4>
                      <p className="text-base font-bold leading-relaxed text-blue-50">{model.revenue}</p>
                      <div className="mt-10 pt-10 border-t border-white/10">
                        <InquiryDialog 
                          defaultType="school_charter"
                          title={`Apply for ${model.title}`}
                          trigger={
                            <Button className="w-full bg-white text-brand-primary hover:bg-blue-50 font-bold h-14 rounded-xl text-base shadow-lg transition-all">Select this model</Button>
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
      <section className="py-16 md:py-24 bg-brand-primary-soft">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto mb-32">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-neutral-text">Available <span className="text-brand-primary">tiers</span></h2>
            <p className="text-lg text-neutral-muted font-semibold italic">Limited enrollment for 2026</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {[
              {
                tier: "Charter Tier",
                limit: "10 Founding Schools",
                desc: "Permanent charter status + 20% lifetime discount + founder privileges.",
                status: "6 spots remaining",
               color: "bg-white",
                textColor: "text-neutral-text"
              },
              {
                tier: "Growth Tier",
                limit: "Mid-Size Institutions",
                desc: "Complete platform access + standard support + revenue sharing.",
                status: "Open Enrollment",
                color: "bg-white",
                textColor: "text-neutral-text"
              },
              {
                tier: "Foundation Tier",
                limit: "Small Schools",
                desc: "Essential features + community support + flexible terms.",
                status: "Open Enrollment",
                color: "bg-white",
                textColor: "text-neutral-text"
              }
            ].map((option, i) => (
              <div key={i} className={`p-8 rounded-2xl border border-white flex flex-col ${option.color} ${option.textColor} shadow-xl hover:shadow-2xl transition-all`}>
                <h3 className="text-3xl font-bold mb-2 tracking-tight">{option.tier}</h3>
                <p className="text-xs font-bold text-brand-sky mb-8 uppercase tracking-wider">{option.limit}</p>
                <p className="text-lg text-neutral-muted font-medium mb-12 flex-1 leading-relaxed">{option.desc}</p>
                <div className="pt-8 border-t border-neutral-border">
                  <p className="text-xs font-bold mb-8 uppercase tracking-widest text-neutral-muted">{option.status}</p>
                  <InquiryDialog 
                    defaultType="school_charter"
                    title="Partnership Application"
                    trigger={
                      <Button className="w-full h-14 rounded-xl bg-brand-primary text-white font-bold text-base hover:bg-brand-primary-dark shadow-md">Apply now</Button>
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 md:py-32 bg-brand-primary text-white relative overflow-hidden">
        <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-blue-600 opacity-30 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-blue-600 opacity-30 blur-3xl" aria-hidden="true" />
        <div className="container-custom text-center relative z-10">
          <div className="flex justify-center w-full mb-8">
            <h2 className="text-4xl md:text-7xl text-white font-bold leading-tight mb-3 text-center tracking-tighter px-4">
              Ready to lead your city?
            </h2>
          </div>
          <p className="text-xl text-blue-100/80 mb-6 max-w-3xl mx-auto font-medium">
            Applications for 2026 Charter membership close March 31. Secure your institution's legacy today.
          </p>
          <p className="text-base font-bold text-brand-sky mb-16 uppercase tracking-[0.2em]">Serving 50,000+ students globally</p>
          <div className="flex flex-col md:flex-row justify-center gap-6 max-w-5xl mx-auto">
            <InquiryDialog
              defaultType="school_charter"
              title="School Partnership Inquiry"
              trigger={
                <Button size="lg" className="w-full md:w-auto min-w-[280px] bg-white text-brand-primary hover:bg-blue-50 font-bold py-8 px-10 rounded-2xl text-lg shadow-2xl flex items-center justify-center gap-3 transition-all transform hover:scale-105">
                  Apply for Charter <ArrowRight className="h-6 w-6" />
                </Button>
              }
            />
            <Button size="lg" variant="outline" className="w-full md:w-auto min-w-[280px] border-2 border-white/30 text-white hover:bg-white/10 font-bold py-8 px-10 rounded-2xl text-lg shadow-xl flex items-center justify-center gap-3 transition-all transform hover:scale-105">
              Explore Programs <ArrowRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
