import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { InquiryDialog } from "@/components/InquiryDialog";

const stats = [
  { value: "90%", label: "FORGOTTEN", sub: "of learning lost within 6 days without review" },
  { value: "5%", label: "RETENTION", sub: "average from passive lecture methods" },
  { value: "10x", label: "BETTER", sub: "retention with EduMeUp's active system" },
  { value: "27+", label: "YEARS", sub: "of Cambridge classroom research behind the model" },
];

const comparisonRows = [
  {
    traditional: "No diagnostic — teaching starts from assumption",
    edumeup: "AI diagnostic identifies exact gaps before a lesson begins",
  },
  {
    traditional: "No retention system — knowledge decays between sessions",
    edumeup: "Spaced retrieval scheduled automatically — forgetting is designed out",
  },
  {
    traditional: "3 hours per week maximum",
    edumeup: "24/7 access — learning does not stop when the session ends",
  },
  {
    traditional: "Student cannot work independently",
    edumeup: "Self-learning capability built into every module from Day 1",
  },
  {
    traditional: "Parents receive verbal updates",
    edumeup: "Real-time parent dashboard — topic mastery, weak areas, consistency",
  },
  {
    traditional: "Increases dependency over time",
    edumeup: "Reduces dependency — the goal is independent exam performance",
  },
];

const fiveThings = [
  {
    title: "Diagnostic before teaching",
    desc: "Know exactly where the gaps are before spending a single learning hour. No guessing, no assumption, no wasted time.",
  },
  {
    title: "Automated retention scheduling",
    desc: "Spaced review runs at Day 1, 3, 7, 14, 30. The system remembers what the student is about to forget — and acts before it happens.",
  },
  {
    title: "24/7 independent practice",
    desc: "Students are not limited to 3 hours per week. They can practise, retrieve, and test themselves at any time, on any device.",
  },
  {
    title: "Parent visibility in real time",
    desc: "Not a monthly verbal update. A live dashboard showing topic mastery, study consistency, and predicted exam readiness — updated after every session.",
  },
  {
    title: "Self-learning capability",
    desc: "Every module is designed to make the student less dependent on external support over time — not more.",
  },
  {
    title: "Complete stakeholder ecosystem",
    desc: "Students, teachers, schools, and parents all have purpose-built tools. Most platforms serve students only.",
  },
];

export default function WhyEduMeUp() {
  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") || "";

    document.title = "Why EduMeUp — From Tutoring Dependency to Independent Mastery | EduMeUp";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "EduMeUp is designed to reduce tutoring dependency by building genuine self-learning capability. A structured system that produces better results than content delivery alone.",
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
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 to-white py-16 md:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
       
            <h1 className="text-5xl md:text-7xl font-semibold text-slate-900 mb-6 tracking-tight leading-tight">
              Why EduMeUp - The Science, The System, The Difference
            </h1>
            <p className="text-base text-slate-700 max-w-3xl mx-auto leading-relaxed mb-8">
              Not another course platform. A learning transformation system.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/why-edumeup/how-it-works">
                <Button className="bg-[#2366c9] hover:bg-blue-700 text-white font-semibold text-[14px] py-3 px-6">
                  See How It Works <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <InquiryDialog
                defaultType="diagnostic"
                title="Free Diagnostic Assessment"
                trigger={
                  <Button variant="outline" className="border-2 border-[#2366c9] text-[#2366c9] font-semibold text-[14px] py-3 px-6">
                    Start Free Diagnostic
                  </Button>
                }
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-blue-100 bg-white py-10 md:py-14">
        <div className="container-custom">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s) => (
              <motion.div
                key={s.value}
                whileHover={{ y: -4 }}
                className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm hover:shadow-md hover:border-blue-300 transition-all text-center"
              >
                <div className="text-[34px] font-semibold text-[#2366c9] mb-2">{s.value}</div>
                <div className="text-[14px] font-semibold text-black uppercase tracking-wide mb-2">{s.label}</div>
                <div className="text-[14px] text-black">{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM WITH TUTORING */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl">
            <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
              The Problem
            </p>
            <h2 className="text-4xl md:text-6xl font-semibold text-slate-900 tracking-tight mb-6">
              The Problem With Tutoring Alone
            </h2>
            <p className="text-base text-black leading-relaxed">
              Private tutoring costs families $2,400–$3,600 per year. Results are often disappointing — not because tutors are not skilled, but because tutoring is a content delivery model. It suffers from the same fundamental limitation as the classroom: the knowledge enters, but without a retention system, it exits within days.
            </p>
            <p className="mt-4 text-base text-black leading-relaxed">
              A tutor who teaches Chemistry on Tuesday cannot control whether your child retrieves it on Thursday, reviews it the following week, and practises it under timed conditions before the exam. EduMeUp can. And does.
            </p>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-14 md:py-20 bg-blue-50/50">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-10">
              <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
                Comparison
              </p>
              <h2 className="text-4xl md:text-6xl font-semibold text-slate-900 tracking-tight">
                What Tutoring Does Well — and Where It Falls Short
              </h2>
            </div>

            {/* Table header */}
            <div className="grid grid-cols-2 bg-[#2366c9] text-white text-xs uppercase tracking-wider font-semibold rounded-t-xl overflow-hidden">
              <div className="p-4">Traditional Tutoring</div>
              <div className="p-4 border-l border-blue-400/30">EduMeUp System</div>
            </div>
            {/* Table rows */}
            {comparisonRows.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-2 border-b border-blue-50 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"} hover:bg-blue-50/40 transition-colors`}
              >
                <div className="p-4 text-[14px] text-black flex items-start gap-2">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                  {row.traditional}
                </div>
                <div className="p-4 border-l border-slate-200 text-[14px] text-black font-medium flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                  {row.edumeup}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FIVE THINGS */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
                What EduMeUp Provides
              </p>
              <h2 className="text-4xl md:text-6xl font-semibold text-slate-900 tracking-tight">
                Five Things EduMeUp Provides That Tutoring Cannot
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {fiveThings.map((item) => (
                <div key={item.title} className="bg-white p-8 rounded-xl border border-blue-200 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-[#2366c9] transition-all duration-300 group">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-[#2366c9]">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-semibold text-[#2366c9] mb-4">{item.title}</h3>
                  <p className="text-[14px] text-black leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BETTER TOGETHER */}
      <section className="py-14 md:py-20 bg-blue-50/50">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl bg-white border border-blue-200 rounded-xl p-8 md:p-10 shadow-sm">
            <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
              Better Together
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight mb-5">
              EduMeUp and Tutoring — Better Together
            </h2>
            <p className="text-base text-black leading-relaxed">
              EduMeUp is not anti-tutoring. When a student arrives at a tutoring session having already completed the diagnostic, identified their weakest three topics, and done the spaced retrieval for that week — those 90 minutes become surgical rather than exploratory. The tutor spends zero time finding the gap. They spend all of it closing it.
            </p>
            <p className="mt-4 text-base text-black leading-relaxed">
              Families who use EduMeUp alongside tutoring consistently report reducing from three tutors to one — while improving results.
            </p>
          </div>
        </div>
      </section>

      {/* RESEARCH */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl">
            <p className="inline-flex rounded-full border border-blue-200 bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white mb-5">
              Research Engine
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight mb-5">
              The Research Behind the Model
            </h2>
            <p className="text-base text-black leading-relaxed">
              Students who develop self-regulated learning strategies consistently outperform those who are tutor-dependent under unsupported examination conditions (Hattie, 2009; Zimmermann, 2002). Personalised learning pathways generated from diagnostic data produce significantly stronger outcomes than fixed-curriculum delivery (Bloom, 1984). EduMeUp's 8-step cycle is a direct application of this evidence.
            </p>
            <div className="mt-6">
              <Link href="/why-edumeup/how-it-works">
                <span className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#2366c9] hover:text-blue-700">
                  See How EduMeUp Works
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="py-20 md:py-32 bg-[#2366c9] text-white relative overflow-hidden">
        <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-blue-600 opacity-30 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-blue-600 opacity-30 blur-3xl" aria-hidden="true" />
        <div className="container-custom text-center relative z-10">
          <div className="flex justify-center w-full mb-6">
            <h2 className="text-4xl md:text-6xl text-white font-semibold leading-[1.05] mb-3 text-center tracking-tight px-4">
              Stop Guessing. Start Learning Right.
            </h2>
          </div>
          <p className="text-base text-blue-200 mb-12 max-w-3xl mx-auto">
            EduMeUp diagnoses where your child is, then builds a system that ensures they never forget what they learn.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6 max-w-5xl mx-auto">
            <InquiryDialog
              defaultType="diagnostic"
              title="Free Diagnostic Assessment"
              trigger={
                <Button size="lg" className="w-full md:w-auto min-w-[260px] bg-white text-[#2366c9] hover:bg-blue-50 font-semibold py-3 px-6 rounded-xl text-[14px] shadow-md flex items-center justify-center gap-2">
                  Start Your Free Diagnostic <ArrowRight className="h-4 w-4" />
                </Button>
              }
            />
            <Link href="/why-edumeup/how-it-works">
              <Button size="lg" variant="outline" className="w-full md:w-auto min-w-[260px] border border-white/30 text-white hover:bg-white/10 font-semibold py-3 px-6 rounded-xl text-[14px] shadow-md flex items-center justify-center gap-2">
                See How the System Works <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* REFERENCES */}
      <section className="py-10 bg-white border-t border-blue-100">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">References</h3>
            <ul className="space-y-1 text-xs text-slate-500">
              <li>Bloom, B. S. (1984). The 2 sigma problem. <em>Educational Researcher, 13</em>(6), 4–16.</li>
              <li>Bray, M. (2011). The challenge of shadow education. European Commission.</li>
              <li>Hattie, J. (2009). <em>Visible learning.</em> Routledge.</li>
              <li>Zimmermann, B. J. (2002). Becoming a self-regulated learner. <em>Theory Into Practice, 41</em>(2), 64–70.</li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}
