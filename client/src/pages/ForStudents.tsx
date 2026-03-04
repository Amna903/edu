import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight, Zap, Target, RefreshCw, Brain } from "lucide-react";
import { motion } from "framer-motion";
import { InquiryDialog } from "@/components/InquiryDialog";

export default function ForStudents() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <Layout>
      <style dangerouslySetInnerHTML={{ __html: `
        .student-h1 { font-size: 48px; line-height: 1.1; font-weight: 800; color: #0f172a; }
        .student-h2 { font-size: 32px; line-height: 1.2; font-weight: 700; color: #1e293b; }
        .student-body { font-size: 16px; line-height: 1.6; color: #475569; }
        .section-padding { padding-top: 80px; padding-bottom: 80px; }
        .max-container { max-width: 1200px; margin: 0 auto; padding-left: 24px; padding-right: 24px; }
      `}} />

      {/* HERO SECTION */}
      <section className="section-padding bg-gradient-to-br from-slate-900 to-blue-900 text-white overflow-hidden relative">
        <div className="max-container relative z-10 text-center">
          <motion.div {...fadeIn}>
            <Badge className="bg-blue-500/20 text-blue-300 mb-6 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-blue-500/30">For Students</Badge>
            <h1 className="student-h1 text-white mb-6">Stop Studying Hard. <br className="hidden md:block" /> Start Studying Smart.</h1>
            <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              You don't need more tuition. You don't need more notes. You don't need more late nights.
              You need the right system. The right strategy. The right feedback.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-500 h-14 px-10 rounded-2xl font-black text-lg shadow-xl">
                Explore Free Library
              </Button>
              <InquiryDialog 
                defaultType="diagnostic"
                title="Free Diagnostic"
                trigger={
                  <Button size="lg" variant="outline" className="border-2 border-white/20 text-white hover:bg-white/10 h-14 px-10 rounded-2xl font-black text-lg">
                    Take Free Diagnostic
                  </Button>
                }
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 1: STRUGGLES & SOLUTIONS */}
      <section className="section-padding bg-white">
        <div className="max-container">
          <div className="text-center mb-16">
            <h2 className="student-h2 mb-4">We Understand Your Struggles</h2>
            <p className="student-body text-lg">Every struggle has a systematic solution built into EduMeUp.</p>
          </div>

          <div className="space-y-12">
            {[
              {
                q: "I study for hours but don't understand anything",
                s: "Interactive H5P activities require you to DO — drag-and-drop, label diagrams, complete equations. You cannot fake understanding; the platform won't advance you until you genuinely get it.",
                i: Brain
              },
              {
                q: "I can't solve unseen questions",
                s: "Principle-first teaching explains the WHY behind every topic. With 45,000+ varied practice questions, your brain learns patterns rather than copying solutions.",
                i: Target
              },
              {
                q: "I forget everything after a few days",
                s: "Automated Spaced Retrieval schedules reviews at research-optimised intervals. What you learn in September, you remember in May.",
                i: RefreshCw
              },
              {
                q: "ATP is impossible — nobody teaches it",
                s: "Comprehensive ATP courses for Physics, Chemistry, and Biology teaching experimental design, variable identification, and conclusion writing systematically.",
                i: Zap
              }
            ].map((item, i) => (
              <motion.div key={i} {...fadeIn} className="flex flex-col md:flex-row gap-8 items-start p-10 rounded-[32px] bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center shrink-0 text-blue-600">
                  <item.i className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 italic">"{item.q}"</h3>
                  <p className="student-body leading-relaxed">{item.s}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: 7 SKILLS */}
      <section className="section-padding bg-blue-50">
        <div className="max-container text-center">
          <h2 className="student-h2 mb-4">Beyond Content — We Teach You How To Learn</h2>
          <p className="student-body mb-12">7 Skills That Transform Results Now and Last a Lifetime</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Active Recall", "Spaced Practice", "Metacognition", "Problem Decomposition", "Self-Regulated Learning", "Growth Mindset", "Time Management"].map((skill, i) => (
              <div key={i} className="p-6 bg-white rounded-2xl shadow-sm border border-blue-100 font-bold text-slate-800">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-padding bg-[#1E3A8A] text-white text-center">
        <div className="max-container">
          <h2 className="text-4xl font-black mb-8">Ready to Study Smarter?</h2>
          <Button size="lg" className="bg-white text-[#1E3A8A] hover:bg-blue-50 h-16 px-12 rounded-2xl font-black text-xl shadow-2xl">
            Explore Free Library
          </Button>
        </div>
      </section>
    </Layout>
  );
}
