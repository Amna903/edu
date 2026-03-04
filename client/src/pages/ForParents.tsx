import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, UserCheck, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { InquiryDialog } from "@/components/InquiryDialog";

export default function ForParents() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <Layout>
      <style dangerouslySetInnerHTML={{ __html: `
        .parent-h1 { font-size: 48px; line-height: 1.1; font-weight: 800; color: #0f172a; }
        .parent-h2 { font-size: 32px; line-height: 1.2; font-weight: 700; color: #1e293b; }
        .parent-body { font-size: 16px; line-height: 1.6; color: #475569; }
        .section-padding { padding-top: 80px; padding-bottom: 80px; }
        .max-container { max-width: 1200px; margin: 0 auto; padding-left: 24px; padding-right: 24px; }
      `}} />

      {/* HERO SECTION */}
      <section className="section-padding bg-gradient-to-b from-blue-50/50 to-white overflow-hidden border-b border-blue-100">
        <div className="max-container text-center">
          <motion.div {...fadeIn}>
            <Badge className="bg-blue-100 text-[#1E3A8A] mb-6 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">For Parents</Badge>
            <h1 className="parent-h1 mb-6">Your Child Deserves a Structured Path to O-Level Success</h1>
            <p className="text-2xl text-[#2563EB] font-bold mb-8 uppercase tracking-tight">Beyond Tutoring.</p>
            <p className="parent-body max-w-3xl mx-auto text-lg mb-6">
              A Complete Academic Mastery System — With You Informed at Every Step.
              Designed with educational researchers and Cambridge O-Level specialists. Built for how students actually learn. Structured so parents always know exactly where their child stands.
            </p>
            <p className="parent-body max-w-2xl mx-auto mb-10 font-medium">
              You want three things for your child's O-Level journey: Genuine understanding, Measurable progress, and Growing independence. EduMeUp was built to deliver all three.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-[#1E3A8A] hover:bg-blue-800 text-white px-8 h-14 rounded-2xl font-bold">
                Explore Free Library
              </Button>
              <InquiryDialog 
                defaultType="diagnostic"
                title="Free Diagnostic"
                trigger={
                  <Button size="lg" variant="outline" className="border-2 border-[#1E3A8A] text-[#1E3A8A] hover:bg-blue-50 px-8 h-14 rounded-2xl font-bold">
                    Take Free Diagnostic
                  </Button>
                }
              />
              <Button size="lg" variant="ghost" className="text-[#1E3A8A] font-bold">Speak With Our Team →</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 1: THE CHALLENGE */}
      <section className="section-padding bg-white">
        <div className="max-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <h2 className="parent-h2 mb-6">The O-Level Challenge Most Families Underestimate</h2>
              <p className="parent-body text-lg mb-8 italic text-slate-500">Cambridge Examinations Test Thinking — Not Memorisation</p>
              
              <p className="parent-body mb-6">O-Level is fundamentally different from Pakistan's national curriculum. Cambridge Assessment Objectives require three levels, and most teaching only covers the first.</p>

              <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-xl">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="p-4 font-bold text-slate-900">Objective</th>
                      <th className="p-4 font-bold text-slate-900">What It Demands</th>
                      <th className="p-4 font-bold text-slate-500">Most Teaching</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-slate-50">
                      <td className="p-4 font-bold">AO1 — Knowledge</td>
                      <td className="p-4">Recall of concepts and facts</td>
                      <td className="p-4 text-green-600 font-bold">✅ Usually covered</td>
                    </tr>
                    <tr className="border-b border-slate-50">
                      <td className="p-4 font-bold">AO2 — Application</td>
                      <td className="p-4">Applying knowledge to new contexts</td>
                      <td className="p-4 text-amber-600 font-bold">⚠️ Partially covered</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold">AO3 — Analysis</td>
                      <td className="p-4">Evaluating, interpreting, synthesising</td>
                      <td className="p-4 text-red-600 font-bold">❌ Rarely taught explicitly</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
            <motion.div {...fadeIn} className="bg-blue-900 p-10 rounded-[40px] text-white shadow-2xl">
              <h3 className="text-2xl font-bold mb-6">Our Methodology</h3>
              <p className="opacity-80 mb-8 leading-relaxed">EduMeUp's entire methodology is designed around this reality — building the thinking skills Cambridge actually rewards, not just the content it tests.</p>
              <div className="grid grid-cols-2 gap-4 text-xs font-bold tracking-widest uppercase text-blue-300">
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Moodle 4.5.1</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> H5P Interactive</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> AI Chatbot</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Parent Dashboard</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE APPROACH (PILLARS) */}
      <section className="section-padding bg-slate-50">
        <div className="max-container">
          <div className="text-center mb-16">
            <h2 className="parent-h2 mb-4">What Makes This Different</h2>
            <p className="parent-body text-lg">A structured academic mastery system — not a video library, not a tutoring marketplace.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { 
                t: "Structured Mastery Learning", 
                d: "Concept Introduction → Active Engagement → Retrieval Practice → Spaced Review → Mastery Verification", 
                i: Zap,
                p: "Students cannot skip ahead. Each stage must be genuinely completed at 80% mastery before the next unlocks."
              },
              { 
                t: "Spaced Retrieval System", 
                d: "Automated tracking and surfacing of review activities at research-optimised intervals.", 
                i: RefreshCw,
                p: "What they learn in September is genuinely accessible in May — without last-minute panic re-learning."
              },
              { 
                t: "Independence Building", 
                d: "A 4-level scaffold moving from guided support to complete self-directed mastery.", 
                i: UserCheck,
                p: "We build genuine capability and knowing 'how to learn' rather than comfortable tutor dependency."
              },
              { 
                t: "Complete Parent Visibility", 
                d: "Real-time topic-by-topic mastery data, engagement tracking, and predicted trajectory.", 
                i: ShieldCheck,
                p: "Surfaces academic problems weeks or months early — when there is still time to address them."
              }
            ].map((p, i) => (
              <Card key={i} className="border-none shadow-xl rounded-[32px] overflow-hidden group hover:-translate-y-2 transition-all duration-300">
                <CardContent className="p-10">
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-[#2563EB]">
                    <p.i className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{p.t}</h3>
                  <p className="text-sm font-bold text-[#2563EB] mb-4 uppercase tracking-wider">{p.d}</p>
                  <p className="parent-body text-sm">{p.p}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: PARENT PARTNERSHIP */}
      <section className="section-padding bg-white">
        <div className="max-container">
          <div className="bg-[#1E3A8A] rounded-[48px] p-10 md:p-20 text-white relative overflow-hidden">
            <div className="relative z-10 max-w-3xl">
              <h2 className="text-4xl font-black mb-8">Structured Parent Partnership</h2>
              <p className="text-xl text-blue-200 mb-10 leading-relaxed">
                Most educational platforms treat parents as billing contacts. EduMeUp treats you as an essential partner in your child's learning journey.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "Understanding Cambridge O-Level (1 hour)",
                  "Reading Your Parent Dashboard (30 mins)",
                  "Supporting Independence, Not Dependency",
                  "Managing Academic Pressure (45 mins)",
                  "Platform Features for Parents (30 mins)",
                  "Monthly Live Q&A Sessions"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-lg font-medium">
                    <CheckCircle2 className="h-6 w-6 text-green-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute right-[-10%] bottom-[-10%] w-96 h-96 bg-blue-500 rounded-full blur-[100px] opacity-20" />
          </div>
        </div>
      </section>

      {/* SECTION 4: WHAT'S COVERED */}
      <section className="section-padding bg-slate-50">
        <div className="max-container">
          <div className="text-center mb-16">
            <h2 className="parent-h2 mb-4">Comprehensive Coverage</h2>
            <p className="parent-body">Across Every O-Level Subject & Specialist Courses</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-xl mb-4 text-[#1E3A8A]">Core Subjects</h3>
              <p className="text-sm text-slate-600 leading-relaxed">Mathematics, Physics, Chemistry, Biology, English, Economics, Business Studies, Pakistan Studies, Computer Science.</p>
            </div>
            <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-xl mb-4 text-[#1E3A8A]">Specialist Courses</h3>
              <p className="text-sm text-slate-600 leading-relaxed">ATP Courses (Experimental design & analysis), Structured English Writing, Mathematics Magic Sheets.</p>
            </div>
            <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-xl mb-4 text-[#1E3A8A]">Foundation Bridge</h3>
              <p className="text-sm text-slate-600 leading-relaxed">For Grades 6-8. Addressing gaps systematically before O-Level content begins. Past Paper coverage 2010-2025.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-padding bg-slate-900 text-white text-center">
        <div className="max-container">
          <h2 className="text-4xl font-black mb-6">Secure Your Child's Future</h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">Give them the system they need to move from confusion to genuine exam mastery.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button size="lg" className="bg-[#2563EB] hover:bg-blue-600 h-14 px-12 rounded-2xl font-bold text-lg">Speak With Our Team</Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 h-14 px-12 rounded-2xl font-bold text-lg">Take Diagnostic</Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function RefreshCw(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}
