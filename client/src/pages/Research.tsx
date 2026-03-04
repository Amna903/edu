import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Target, RefreshCw, Brain, Layers, Search, Download, Beaker } from "lucide-react";
import { motion } from "framer-motion";

export default function Research() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <Layout>
      <style dangerouslySetInnerHTML={{ __html: `
        .research-h1 { font-size: 48px; line-height: 1.1; font-weight: 800; color: #0f172a; }
        .research-h2 { font-size: 32px; line-height: 1.2; font-weight: 700; color: #1e293b; }
        .max-container { max-width: 1200px; margin: 0 auto; padding-left: 24px; padding-right: 24px; }
      `}} />

      {/* HERO SECTION */}
      <section className="py-20 bg-gradient-to-b from-blue-50/50 to-white text-center border-b border-blue-100">
        <div className="max-container">
          <motion.div {...fadeIn}>
            <Badge className="bg-blue-100 text-[#1E3A8A] mb-6 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">Research & Development</Badge>
            <h1 className="research-h1 mb-6">Where Cognitive Science Meets <br className="hidden md:block" /> Educational Technology</h1>
            <p className="text-2xl text-[#2563EB] font-bold mb-8">PROOF, NOT PROMISES</p>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-10">EduMeUp isn't built on trends or opinions. Every feature is grounded in peer-reviewed research spanning 50+ years of cognitive science.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-[#1E3A8A] h-14 px-8 rounded-2xl font-bold">Explore Our Methodology</Button>
              <Button size="lg" variant="outline" className="border-2 border-[#1E3A8A] text-[#1E3A8A] h-14 px-8 rounded-2xl font-bold"><Download className="mr-2" /> Download Whitepaper</Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-16">
              {[["50+ Years", "of research"], ["200+ Studies", "reviewed"], ["15 Core", "principles"], ["5 Pillars", "of evidence"], ["N=127", "pilot study"]].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-blue-50 shadow-sm">
                  <div className="text-2xl font-black text-[#1E3A8A]">{stat[0]}</div>
                  <div className="text-xs font-bold text-slate-500 uppercase mt-1">{stat[1]}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION: FORGETTING CURVE */}
      <section className="py-20 bg-white">
        <div className="max-container grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="research-h2 mb-6">The Crisis of Unscientific Education</h2>
            <p className="text-lg italic text-slate-500 mb-8">Why most learning fails — and what science says we should do instead.</p>
            <div className="p-6 bg-red-50 border-l-4 border-red-500 rounded-r-2xl mb-8">
              <h4 className="font-bold text-red-900 mb-2 flex items-center gap-2"><Target className="h-5 w-5" /> The Forgetting Curve</h4>
              <p className="text-sm text-red-800">Within 24 hours, students forget ~70% of what they learned. Within 1 week, up to 90% is gone without structured review.</p>
            </div>
            <p className="text-slate-600">EduMeUp addresses this through 5 evidence-based pillars: Active Recall, Spaced Repetition, Practice Testing, Elaboration, and Dual Coding.</p>
          </div>
          <div className="bg-slate-900 p-8 rounded-[32px] text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-8">The Passive Learning Trap</h3>
            <div className="space-y-4">
              {[["Lecture", "Very Low"], ["Reading", "Low"], ["Videos", "Low–Moderate"], ["Practice", "High", true], ["Teaching Others", "Very High", true]].map((row, i) => (
                <div key={i} className={`flex justify-between p-4 rounded-xl border ${row[2] ? "bg-blue-600/20 border-blue-500" : "border-white/10 bg-white/5"}`}>
                  <span className="font-medium">{row[0]}</span><span className={`font-bold px-3 py-1 rounded-full text-xs ${row[2] ? "bg-blue-500" : "bg-white/10 text-white/60"}`}>{row[1]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: 5 PILLARS */}
      <section className="py-20 bg-slate-50">
        <div className="max-container">
          <div className="text-center mb-16">
            <h2 className="research-h2 mb-4">The 5 Pillars of Learning</h2>
            <p className="text-lg text-slate-600">The research foundation of the 10X Learning Leap Model™</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { t: "Active Retrieval", i: Search, d: "Forcing your brain to retrieve info strengthens neural pathways more than re-reading." },
              { t: "Spaced Repetition", i: RefreshCw, d: "Reviewing at expanding intervals produces dramatically stronger retention than cramming." },
              { t: "Interleaved Practice", i: Layers, d: "Mixing problem types feels harder but results in 3x better long-term retention." },
              { t: "Dual Coding", i: Brain, d: "Combining visual and verbal info doubles encoding capacity and retrieval pathways." },
              { t: "Elaborative Interrogation", i: Target, d: "Asking 'Why' and 'How' produces deeper understanding than passive reading." }
            ].map((pillar, i) => (
              <Card key={i} className="p-8 border-none shadow-lg rounded-3xl group hover:-translate-y-2 transition-all">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600"><pillar.i className="h-6 w-6" /></div>
                <h3 className="font-bold text-xl mb-4">{pillar.t}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{pillar.d}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
