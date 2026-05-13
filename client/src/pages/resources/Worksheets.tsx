import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, FileText, Download, Layers, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { worksheetFeatures } from "@/components/resources/worksheets-content";

export default function Worksheets() {
  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") || "";

    document.title = "Cambridge & Primary Worksheets - Grade 1 to O-Level | EduMeUp";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "EduMeUp's graded worksheets cover English, Math, and Science from primary level through Cambridge O-Level - with worked examples and progressive practice.",
      );
    }

    return () => {
      document.title = previousTitle;
      if (metaDescription) {
        metaDescription.setAttribute("content", previousDescription);
      }
    };
  }, []);

  return (
    <Layout>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-primary-soft to-white py-24 md:py-32">
        <div className="absolute top-0 left-0 w-64 h-64 bg-brand-primary opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-5xl text-center"
          >
            <span className="inline-flex items-center rounded-full bg-brand-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-primary mb-8">
              Premium Educational Resources
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-neutral-text tracking-tight mb-8 leading-[1.05]">
              Conceptual Learning & <span className="text-brand-primary">Practice Worksheets.</span>
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-neutral-muted font-medium leading-relaxed mb-10">
              Structured printable and digital practice from Grade 1 through O-Level across all subjects. Conceptually graded for systematic growth.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <Link href="/programs/ai-diagnostic">
                <Button variant="outline" className="rounded-full border-neutral-border text-neutral-text hover:bg-neutral-surface font-bold px-6">
                  AI Diagnostic
                </Button>
              </Link>
              <Link href="/resources/all">
                <Button variant="outline" className="rounded-full border-neutral-border text-neutral-text hover:bg-neutral-surface font-bold px-6">
                  All Resources
                </Button>
              </Link>
              <Link href="/programs/complete-o-level">
                <Button variant="outline" className="rounded-full border-neutral-border text-neutral-text hover:bg-neutral-surface font-bold px-6">
                  Complete O-Level
                </Button>
              </Link>
            </div>

            <Link href="/resources/worksheets">
              <Button className="h-16 px-10 rounded-2xl bg-brand-primary text-white font-bold text-xl hover:bg-brand-primary-dark shadow-2xl transition-all hover:scale-105 active:scale-95">
                Explore Worksheets
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* VALUE PROPOSITION */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-5xl rounded-[3rem] border border-neutral-border bg-neutral-surface p-10 md:p-16 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            <h2 className="text-4xl font-bold text-neutral-text mb-6 tracking-tight">What This Resource Provides</h2>
            <p className="text-lg leading-relaxed text-neutral-muted font-medium">
              Worksheets provide structured printable and digital practice from Grade 1 through O-Level across English, Mathematics, and Sciences. Each sheet is conceptually graded, starts with a worked example, and progresses from foundational to higher-order questions. Suitable for classroom use, home learning, and targeted remediation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="pb-20 md:pb-32 bg-white">
        <div className="container-custom">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-text tracking-tighter">Premium Features</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {worksheetFeatures.map((feature, i) => (
              <motion.div 
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-[2.5rem] border border-neutral-border bg-white p-10 shadow-xl hover:shadow-2xl hover:border-brand-primary/30 transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-brand-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl group-hover:bg-brand-primary/10 transition-all" />
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-brand-primary text-white shadow-lg group-hover:scale-110 transition-transform">
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-text mb-4 tracking-tight group-hover:text-brand-primary transition-colors">{feature.title}</h3>
                <p className="text-base leading-relaxed text-neutral-muted font-medium">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA & PRICING */}
      <section className="py-20 md:py-32 border-t border-neutral-border bg-neutral-surface">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mx-auto max-w-5xl rounded-[3rem] border border-neutral-border bg-white p-10 md:p-16 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(35,102,201,0.05)_0%,transparent_50%)]" />
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-neutral-text mb-4 tracking-tight">Pricing & Access</h2>
              <p className="text-lg text-neutral-muted font-medium mb-10">
                Confirm current pricing and availability with Muhammad Benyameen.
              </p>
              <div className="grid gap-6 sm:grid-cols-2">
                <Link href="/resources/worksheets">
                  <Button variant="outline" className="h-16 w-full rounded-[1.5rem] border-2 border-brand-primary text-brand-primary font-bold text-lg hover:bg-brand-primary/5 transition-all flex items-center justify-between px-8">
                    Browse Worksheets
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/resources/all">
                  <Button className="h-16 w-full rounded-[1.5rem] bg-brand-primary text-white font-bold text-lg hover:bg-brand-primary-dark shadow-xl transition-all flex items-center justify-between px-8">
                    Explore All Resources
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
