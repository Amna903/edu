import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowRight, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Blog() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <Layout>
      <style dangerouslySetInnerHTML={{ __html: `
        .blog-h1 { font-size: 40px; line-height: 1.1; font-weight: 800; color: white; }
        .blog-h2 { font-size: 28px; line-height: 1.3; font-weight: 700; color: #0B3C5D; }
        .max-container { max-width: 1200px; margin: 0 auto; padding-left: 24px; padding-right: 24px; }
      `}} />

      {/* HERO BANNER */}
      <section className="bg-[#0B3C5D] py-20 relative overflow-hidden border-b-4 border-[#F97316]">
        <div className="max-container text-center relative z-10">
          <motion.div {...fadeIn}>
            <h1 className="blog-h1 mb-6 uppercase tracking-tight">O-Level & IGCSE Learning Hub</h1>
            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto opacity-80">
              Research-backed articles, exam strategies, and study guides for Cambridge preparation.
            </p>
            <div className="max-w-xl mx-auto bg-white rounded-2xl p-1 flex items-center shadow-2xl">
              <input type="text" placeholder="Search articles, topics, or subjects..." className="flex-1 px-6 py-4 outline-none text-slate-900 font-medium" />
              <Button className="bg-[#F97316] hover:bg-orange-600 h-12 w-12 p-0 rounded-xl mr-1">
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CATEGORY BAR */}
      <div className="sticky top-16 z-40 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-container py-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
            {["All", "O-Level Strategy", "English P1&P2", "Sciences & ATP", "Mathematics", "Parent Guides", "Study Skills"].map((cat, i) => (
              <button key={i} className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${i === 0 ? "bg-[#F97316] text-white" : "bg-slate-50 text-slate-500 hover:bg-slate-100"}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURED ARTICLE */}
      <section className="py-20 bg-white">
        <div className="max-container">
          <motion.div {...fadeIn} className="group cursor-pointer">
            <div className="flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl border border-slate-100 bg-white hover:shadow-3xl transition-all">
              <div className="lg:w-[55%] h-[300px] lg:h-auto overflow-hidden relative">
                <div className="absolute top-6 left-6 z-10 bg-[#F97316] text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  Featured
                </div>
                <img src="https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=1200" alt="Featured" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="lg:w-[45%] p-10 lg:p-14 border-l-4 border-[#F97316] flex flex-col justify-center">
                <Badge className="w-fit mb-6 bg-blue-50 text-[#0B3C5D] border-none font-bold">O-Level Strategy</Badge>
                <h2 className="blog-h2 mb-6 group-hover:text-[#F97316] transition-colors">How to Prepare for O-Level: The Complete Guide for 2026</h2>
                <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3">A step-by-step preparation guide covering all subjects, from understanding Cambridge Assessment Objectives to mastering exam techniques.</p>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-full bg-slate-200" />
                  <div className="text-xs">
                    <div className="font-bold text-[#0B3C5D]">Muhammad</div>
                    <div className="text-slate-400">15 Mar · 10 min read</div>
                  </div>
                </div>
                <Button variant="outline" className="w-fit border-2 border-[#F97316] text-[#F97316] font-bold hover:bg-[#F97316] hover:text-white rounded-xl">
                  Read Article <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ARTICLE GRID */}
      <section className="py-20 bg-slate-50">
        <div className="max-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div key={i} {...fadeIn} className="bg-white rounded-[24px] overflow-hidden shadow-lg hover:shadow-2xl transition-all group flex flex-col h-full border border-slate-100">
                <div className="h-48 overflow-hidden">
                  <img src={`https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800&sig=${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <Badge className="w-fit mb-4 bg-orange-50 text-[#F97316] border-none font-bold text-[10px]">Study Skills</Badge>
                  <h3 className="text-lg font-bold text-[#0B3C5D] mb-4 group-hover:text-[#F97316] transition-colors line-clamp-2">Active Recall: The Most Powerful Learning Technique</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6 line-clamp-2">Why highlighting your notes is wasting time and what you should do instead.</p>
                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50">
                    <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-slate-200" /><span className="text-[10px] font-bold text-slate-400">12 Mar</span></div>
                    <span className="text-[10px] font-bold text-[#F97316] flex items-center">Read More <ChevronRight className="h-3 w-3" /></span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CTA STRIP */}
      <section className="bg-[#F97316] py-12">
        <div className="max-container flex flex-col md:flex-row items-center justify-between gap-8 text-white">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">Join Our Newsletter</h3>
            <p className="font-medium opacity-90">Get research-backed study tips and exam strategies in your inbox.</p>
          </div>
          <div className="flex w-full md:w-auto gap-4">
            <input type="email" placeholder="Enter your email" className="flex-1 md:w-64 px-6 py-4 rounded-xl text-slate-900 font-medium" />
            <Button className="bg-[#0B3C5D] hover:bg-slate-900 h-14 px-8 rounded-xl font-bold">Subscribe</Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
