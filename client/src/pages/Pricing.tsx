import { Layout } from "@/components/Layout";
import { CtaCard } from "@/components/CtaCard";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2, ArrowRight, Info, Globe, Lock,
  Zap, BookOpen, ChevronDown, ChevronUp, AlertCircle,
  Activity, Award, GraduationCap
} from "lucide-react";
import { useState } from "react";
import { InquiryDialog } from "@/components/InquiryDialog";
import { Link } from "wouter";
import { PRICING } from "@/lib/pricing";
import { ScholarshipApplicationForm } from "@/components/ScholarshipApplicationForm";

const SaveBadge = ({ percent }: { percent: number }) => (
  <Badge className="bg-[#eaf2ff] text-brand-primary hover:bg-[#eaf2ff] font-bold uppercase tracking-wider border-none text-[10px]">
    Save {percent}%
  </Badge>
);

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 py-5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full justify-between items-center text-left font-bold text-lg text-brand-navy hover:text-brand-primary transition-colors"
      >
        <span>{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
      </button>
      {isOpen && <div className="mt-4 text-slate-600 text-base leading-relaxed pr-8 font-medium">{answer}</div>}
    </div>
  );
};

export default function Pricing() {
  return (
    <Layout>
      <div className="bg-white min-h-screen">

        {/* SECTION 1 | HERO */}
        <section className="bg-gradient-to-b from-[#f8fbff] to-white pt-20 pb-16 px-6">
          <div className="max-w-6xl mx-auto flex flex-col gap-12">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-brand-navy tracking-tight leading-tight">
                Simple, Transparent Pricing.
              </h1>
              <p className="text-xl text-brand-primary font-bold">
                Pay only for what you need. All prices in USD. No hidden fees.
              </p>
              <p className="text-slate-600 text-base font-medium leading-relaxed max-w-4xl">
                EduMeUp pricing is structured around how you learn — not around how EdTech platforms maximise revenue. If you need one chapter, buy one chapter. If you are preparing across multiple subjects for two years, lock in a discounted rate. If you belong to a developing country and need financial support, our Global Access Scholarship may apply to you.
              </p>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Path 1 */}
              <Card className="border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col hover:border-brand-primary/20 transition-all group">
                <CardContent className="p-8 flex flex-col h-full">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Path 1</span>
                  <h3 className="text-xl font-bold text-brand-navy mb-3 group-hover:text-brand-primary transition-colors">Chapter Courses</h3>
                  <p className="text-sm text-slate-600 font-medium flex-grow mb-6 leading-relaxed">Buy any chapter from any subject. One-time payment. No subscription.</p>
                  <div className="font-bold text-brand-primary text-lg">From ${PRICING.CHAPTER_COURSES.TIERS[PRICING.CHAPTER_COURSES.TIERS.length - 1].pricePerChapter.toFixed(2)}/chapter</div>
                </CardContent>
              </Card>
              {/* Path 2 */}
              <Card className="border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col hover:border-brand-primary/20 transition-all group">
                <CardContent className="p-8 flex flex-col h-full">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Path 2</span>
                  <h3 className="text-xl font-bold text-brand-navy mb-3 group-hover:text-brand-primary transition-colors">Subject Courses</h3>
                  <p className="text-sm text-slate-600 font-medium flex-grow mb-6 leading-relaxed">One or two complete subjects. One-time payment. Multi-year discount.</p>
                  <div className="font-bold text-brand-primary text-lg">From ${PRICING.SUBJECT_COURSES.SINGLE_SUBJECT.THREE_YEARS / 3}/year</div>
                </CardContent>
              </Card>
              {/* Path 3 */}
              <Card className="border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col hover:border-brand-primary/20 transition-all group">
                <CardContent className="p-8 flex flex-col h-full">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Path 3</span>
                  <h3 className="text-xl font-bold text-brand-navy mb-3 group-hover:text-brand-primary transition-colors">Subscriptions</h3>
                  <p className="text-sm text-slate-600 font-medium flex-grow mb-6 leading-relaxed">Four or all subjects. Monthly or annual. Best value for full prep.</p>
                  <div className="font-bold text-brand-primary text-lg">From ${PRICING.SUBSCRIPTIONS.FOUR_SUBJECTS.MONTHLY}/month</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
          {/* MAIN CONTENT */}
          <div className="flex-grow space-y-24">

            {/* SECTION 2 | START HERE — THE FREE DIAGNOSTIC */}
            <section id="diagnostic" className="scroll-mt-24">
              <div className="bg-[#f8fbff] border-l-4 border-brand-primary rounded-2xl p-8 md:p-10 flex flex-col xl:flex-row items-center gap-8 shadow-sm">
                <div className="flex-grow">
                  <h2 className="text-xs font-bold text-brand-primary uppercase tracking-widest mb-3">Before you purchase — The Free Diagnostic</h2>
                  <p className="text-brand-navy text-xl font-bold mb-3 leading-tight">
                    Not sure which subject or how many chapters you need? The EduMeUp diagnostic is free, takes 30 minutes, and tells you exactly which topics and subjects you have gaps in — <span className="text-brand-primary">so you only pay for what you actually need.</span>
                  </p>
                  <p className="text-base text-slate-600 font-medium">The diagnostic is always free. No login required to start. Results in 30 minutes.</p>
                </div>
                <InquiryDialog
                  defaultType="diagnostic"
                  title="Free Diagnostic"
                  trigger={
                    <Button className="whitespace-nowrap h-16 px-10 bg-brand-primary hover:bg-brand-navy text-white font-bold rounded-2xl text-lg shadow-xl uppercase tracking-widest transition-all hover:scale-[1.02]">
                      Start Free Diagnostic
                    </Button>
                  }
                />
              </div>
            </section>

            {/* SECTION 3 | CHAPTER COURSE PRICING */}
            <section id="chapter-pricing" className="scroll-mt-24">
              <div className="mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">Buy Any Chapter. From Any Subject. Pay Once.</h2>
                <p className="text-slate-600 font-medium leading-relaxed text-base">
                  Chapter courses let you purchase specific chapters from any of EduMeUp's Cambridge O-Level subjects — without committing to a full subject course. Perfect if your diagnostic identifies gaps in a few specific topics, or if you want to supplement your school's teaching with targeted interactive content.
                </p>
                <div className="mt-8 space-y-3">
                  <p className="text-sm font-bold text-brand-navy uppercase tracking-widest mb-2">How Chapter Pricing Works:</p>
                  <ul className="space-y-3 text-slate-600 font-medium">
                    <li className="flex gap-3 items-start"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> <span>The price per chapter decreases as you buy more chapters — <span className="text-brand-navy font-bold">volume discount applied automatically.</span></span></li>
                    <li className="flex gap-3 items-start"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> <span>The per-year price is shown as the headline. The total you pay is shown in brackets.</span></li>
                    <li className="flex gap-3 items-start"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> <span>Buying 2 or 3 years upfront gives a further discount: <span className="text-brand-navy font-bold">25% off for 2 years, 40% off for 3 years.</span></span></li>
                    <li className="flex gap-3 items-start"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> <span>Access begins on the day of purchase. There is no monthly fee — you pay once.</span></li>
                  </ul>
                </div>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-md mb-12">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-6 py-5 font-bold text-brand-navy text-sm uppercase tracking-widest">Chapters purchased</th>
                      <th className="px-6 py-5 font-bold text-brand-navy text-sm uppercase tracking-widest">1-year price</th>
                      <th className="px-6 py-5 font-bold text-brand-navy text-sm uppercase tracking-widest">1 year total</th>
                      <th className="px-6 py-5 font-bold text-brand-navy text-sm uppercase tracking-widest">2 years total</th>
                      <th className="px-6 py-5 font-bold text-brand-navy text-sm uppercase tracking-widest">3 years total</th>
                      <th className="px-6 py-5 font-bold text-brand-navy text-sm uppercase tracking-widest">Access</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-base font-medium text-slate-700">
                    {[
                      { range: "1-4 chapters", price: "$6.00", yr1: "$6.00 total", yr2: "$9.00 total", yr2p: "$4.50/yr", yr3: "$10.80 total", yr3p: "$3.60/yr", period: "Up to 3 years" },
                      { range: "5-8 chapters", price: "$5.00", yr1: "$5.00/chap (e.g. $30 for 6)", yr2: "$37.50 total for 6", yr2p: "$18.75/yr", yr3: "$45.00 total for 6", yr3p: "$15.00/yr", period: "Up to 3 years" },
                      { range: "9-12 chapters", price: "$4.00", yr1: "$4.00/chap (e.g. $40 for 10)", yr2: "$50.00 total for 10", yr2p: "$25.00/yr", yr3: "$60.00 total for 10", yr3p: "$20.00/yr", period: "Up to 3 years" },
                      { range: "13-16 chapters", price: "$3.00", yr1: "$3.00/chap (e.g. $42 for 14)", yr2: "$52.50 total for 14", yr2p: "$26.25/yr", yr3: "$63.00 total for 14", yr3p: "$21.00/yr", period: "Up to 3 years" },
                      { range: "17+ chapters", price: "$2.50", yr1: "$2.50/chap (e.g. $50 for 20)", yr2: "$62.50 total for 20", yr2p: "$31.25/yr", yr3: "$75.00 total for 20", yr3p: "$25.00/yr", period: "Up to 3 years" },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-[#f8fbff] transition-colors">
                        <td className="px-6 py-5 font-bold text-brand-navy">{row.range}</td>
                        <td className="px-6 py-5 text-brand-primary font-bold">{row.price}</td>
                        <td className="px-6 py-5">{row.yr1}</td>
                        <td className="px-6 py-5">
                          <div className="font-bold text-brand-navy">{row.yr2}</div>
                          <div className="text-xs text-slate-400">({row.yr2p})</div>
                          <SaveBadge percent={25} />
                        </td>
                        <td className="px-6 py-5">
                          <div className="font-bold text-brand-navy">{row.yr3}</div>
                          <div className="text-xs text-slate-400">({row.yr3p})</div>
                          <SaveBadge percent={40} />
                        </td>
                        <td className="px-6 py-5 text-slate-500 text-sm">{row.period}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                <h3 className="font-bold text-brand-navy mb-6 flex items-center gap-2"><Info className="w-5 h-5 text-brand-primary" /> WORKED EXAMPLES — Chapter Course Pricing</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="text-xs font-bold text-brand-primary uppercase mb-3 tracking-widest">Example A</div>
                    <div className="font-bold text-base text-brand-navy mb-3">3 Chemistry chapters for 1 year</div>
                    <div className="text-xl font-bold text-brand-primary mb-2">$18.00 <span className="text-xs text-slate-400 font-medium">total</span></div>
                    <div className="text-xs text-slate-500 font-medium">3 x $6.00 per chapter</div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="text-xs font-bold text-brand-primary uppercase mb-3 tracking-widest">Example B</div>
                    <div className="font-bold text-base text-brand-navy mb-3">8 Physics chapters for 2 years</div>
                    <div className="text-xl font-bold text-brand-primary mb-2">$37.50 <span className="text-xs text-slate-400 font-medium">total</span></div>
                    <div className="text-xs text-slate-500 font-medium">Saving $42.50 vs two 1-year payments.</div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="text-xs font-bold text-brand-primary uppercase mb-3 tracking-widest">Example C</div>
                    <div className="font-bold text-base text-brand-navy mb-3">20 Maths chapters for 3 years</div>
                    <div className="text-xl font-bold text-brand-primary mb-2">$75.00 <span className="text-xs text-slate-400 font-medium">total</span></div>
                    <div className="text-xs text-slate-500 font-medium">Saving $75.00 vs three 1-year payments.</div>
                  </div>
                </div>
                <div className="mt-8 bg-[#f8fbff] border-l-4 border-brand-primary rounded-r-2xl p-6 shadow-sm">
                  <h4 className="text-xs font-bold text-brand-primary uppercase tracking-widest mb-3">What's included in every Chapter Course?</h4>
                  <p className="text-brand-navy text-base font-bold mb-3 leading-snug">
                    All H5P interactive content, Cambridge past paper questions tagged to that chapter, mark-scheme annotated practice, and access to the AI Study Advisor.
                  </p>
                  <p className="text-sm text-slate-600 font-medium">
                    The 80% mastery gate applies — you must achieve 80% before the next chapter in sequence unlocks.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 4 | SUBJECT COURSE PRICING */}
            <section id="subject-pricing" className="scroll-mt-24">
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">Complete Subject Courses — ONE-TIME PAYMENT</h2>
                <p className="text-slate-600 font-medium text-base leading-relaxed">
                  A complete O-Level subject course covers the entire Cambridge syllabus for that subject — chapter by chapter, with H5P interactive content, past papers from Day 1, spaced retrieval, AI Study Advisor access, mock exam simulation, and the full 6-stage mastery cycle. One-time payment gives you access for 1, 2, or 3 years — no recurring charges.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 1 Subject Card */}
                <Card className="border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col hover:border-brand-primary/20 transition-all">
                  <CardHeader className="p-8 pb-4">
                    <Badge className="w-fit mb-4 bg-slate-100 text-slate-600 hover:bg-slate-100 uppercase font-bold tracking-widest">One-Time Payment</Badge>
                    <CardTitle className="text-2xl font-bold text-brand-navy">1 Subject</CardTitle>
                    <p className="mt-2 text-slate-600 text-base leading-relaxed font-medium pb-6 border-b border-slate-100">Full Cambridge syllabus coverage for 1 subject. All 10 O-Level subjects available.</p>
                  </CardHeader>
                  <CardContent className="p-8 pt-0 flex-grow space-y-4">
                    {/* 1 Year */}
                    <div className="flex items-center justify-between p-5 rounded-2xl border border-slate-100 hover:border-brand-primary transition-colors">
                      <div className="font-bold text-brand-navy">1 Year Access</div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-brand-navy flex items-center justify-end gap-2">
                          ${PRICING.SUBJECT_COURSES.SINGLE_SUBJECT.ONE_YEAR} <span className="text-xs font-medium text-slate-400">/ yr</span>
                        </div>
                        <div className="text-xs text-slate-400 font-medium">(${PRICING.SUBJECT_COURSES.SINGLE_SUBJECT.ONE_YEAR} total)</div>
                      </div>
                    </div>
                    {/* 2 Years */}
                    <div className="flex items-center justify-between p-5 rounded-2xl border-2 border-brand-primary bg-[#f8fbff] transition-colors relative shadow-lg shadow-brand-primary/10">
                      <div className="absolute -top-3 left-6 bg-brand-primary text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full shadow-md">Most Popular</div>
                      <div>
                        <div className="font-bold text-brand-navy mb-1">2 Years Access</div>
                        <SaveBadge percent={25} />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-brand-primary flex items-center justify-end gap-2">
                          $90 <span className="text-xs font-medium text-slate-400">/ yr</span>
                        </div>
                        <div className="text-xs text-slate-400 font-medium">($180 total)</div>
                      </div>
                    </div>
                    {/* 3 Years */}
                    <div className="flex items-center justify-between p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:border-brand-primary transition-colors relative">
                      <div className="absolute -top-3 left-6 bg-amber-500 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full shadow-md">Best Value</div>
                      <div>
                        <div className="font-bold text-brand-navy mb-1">3 Years Access</div>
                        <SaveBadge percent={40} />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-brand-navy flex items-center justify-end gap-2">
                          $72 <span className="text-xs font-medium text-slate-400">/ yr</span>
                        </div>
                        <div className="text-xs text-slate-400 font-medium">($216 total)</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 2 Subjects Card */}
                <Card className="border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col hover:border-brand-primary/20 transition-all">
                  <CardHeader className="p-8 pb-4">
                    <Badge className="w-fit mb-4 bg-slate-100 text-slate-600 hover:bg-slate-100 uppercase font-bold tracking-widest">One-Time Payment</Badge>
                    <CardTitle className="text-2xl font-bold text-brand-navy">2 Subjects</CardTitle>
                    <p className="mt-2 text-slate-600 text-base leading-relaxed font-medium pb-6 border-b border-slate-100">Full Cambridge syllabus coverage for any 2 subjects of your choice.</p>
                  </CardHeader>
                  <CardContent className="p-8 pt-0 flex-grow space-y-4">
                    {/* 1 Year */}
                    <div className="flex items-center justify-between p-5 rounded-2xl border border-slate-100 hover:border-brand-primary transition-colors">
                      <div className="font-bold text-brand-navy">1 Year Access</div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-brand-navy flex items-center justify-end gap-2">
                          $85 <span className="text-xs font-medium text-slate-400">/ sub/yr</span>
                        </div>
                        <div className="text-xs text-slate-400 font-medium">($170 total)</div>
                      </div>
                    </div>
                    {/* 2 Years */}
                    <div className="flex items-center justify-between p-5 rounded-2xl border-2 border-brand-primary bg-[#f8fbff] transition-colors relative shadow-lg shadow-brand-primary/10">
                      <div className="absolute -top-3 left-6 bg-brand-primary text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full shadow-md">Most Popular</div>
                      <div>
                        <div className="font-bold text-brand-navy mb-1">2 Years Access</div>
                        <SaveBadge percent={25} />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-brand-primary flex items-center justify-end gap-2">
                          $63.75 <span className="text-xs font-medium text-slate-400">/ sub/yr</span>
                        </div>
                        <div className="text-xs text-slate-400 font-medium">($255 total)</div>
                      </div>
                    </div>
                    {/* 3 Years */}
                    <div className="flex items-center justify-between p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:border-brand-primary transition-colors relative">
                      <div className="absolute -top-3 left-6 bg-amber-500 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full shadow-md">Best Value</div>
                      <div>
                        <div className="font-bold text-brand-navy mb-1">3 Years Access</div>
                        <SaveBadge percent={40} />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-brand-navy flex items-center justify-end gap-2">
                          $51 <span className="text-xs font-medium text-slate-400">/ sub/yr</span>
                        </div>
                        <div className="text-xs text-slate-400 font-medium">($306 total)</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 text-center md:text-left">
                <a
                  href="#scholarship"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('scholarship')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 text-base font-bold text-brand-primary hover:text-brand-navy transition-colors group"
                >
                  <Globe className="w-5 h-5 group-hover:scale-110 transition-transform" /> 
                  <span>Studying in a developing country? You may qualify for our Global Access Scholarship — up to 30% off.</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </a>
              </div>

              <div className="mt-12 bg-white border border-slate-200 rounded-3xl p-8 flex flex-col md:flex-row items-start gap-6 shadow-sm">
                <div className="bg-amber-100 p-3 rounded-2xl shadow-inner">
                  <AlertCircle className="w-8 h-8 text-amber-600" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-brand-navy mb-2">Choosing 3 Subjects? Read this first.</h4>
                  <p className="text-base text-slate-600 font-medium leading-relaxed">
                    If you need 3 subjects, our <span className="text-brand-navy font-bold">4-Subject Subscription Plan</span> is the better choice — and it gives you a 4th subject at no extra cost. At $25/month, it works out to $6.25 per subject per month, with full flexibility to change your subject selection. It is a better deal than buying 3 subjects one-time.
                  </p>
                  <a
                    href="#subscription"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('subscription')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 mt-4 text-base font-bold text-brand-primary hover:underline"
                  >
                    Compare 4-Subject Subscription <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 5 | SUBSCRIPTION PRICING */}
            <section id="subscription" className="scroll-mt-24">
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-navy">Subscription Plans — Full Flexibility.</h2>
                <p className="text-slate-600 text-base font-medium leading-relaxed max-w-4xl">
                  Subscription plans give you access to 4 subjects or all 10 Cambridge O-Level subjects simultaneously — including all course content, AI Study Advisor, spaced retrieval, mock exams, and parent dashboard. Ideal for full-time O-Level students.
                </p>

                <div className="mt-8 bg-[#f8fbff] border-l-4 border-brand-primary rounded-r-3xl p-8 shadow-sm">
                  <div className="flex items-start gap-4">
                    <Info className="w-6 h-6 text-brand-primary shrink-0 mt-1" />
                    <div>
                      <h4 className="text-sm font-bold text-brand-primary uppercase tracking-widest mb-2">WHAT 'ALL SUBJECTS' INCLUDES:</h4>
                      <p className="text-brand-navy text-lg font-bold leading-snug">
                        All 10 available Cambridge O-Level subjects: Mathematics, Physics, Chemistry, Biology, Economics, Business Studies, English Language, Urdu, Islamiyat, and Pakistan Studies.
                      </p>
                      <p className="mt-3 text-sm text-slate-500 font-medium">
                        New chapters and topics are included automatically at no extra cost.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                {/* 4 Subjects Card */}
                <Card className="border-slate-100 bg-slate-50/50 flex flex-col h-full shadow-xl shadow-slate-200/50 hover:border-brand-primary/20 transition-all">
                  <CardHeader className="p-8 pb-4">
                    <Badge className="w-fit mb-4 bg-white text-slate-500 hover:bg-white uppercase font-bold tracking-widest border border-slate-100 shadow-sm">Subscription</Badge>
                    <CardTitle className="text-3xl font-bold text-brand-navy">4-Subject Plan</CardTitle>
                    <p className="mt-2 text-slate-600 text-base leading-relaxed font-medium pb-6 border-b border-slate-200">Any 4 Cambridge O-Level subjects. Change selection at any time.</p>
                  </CardHeader>
                  <CardContent className="p-8 pt-0 flex-grow space-y-4">
                    {/* Monthly */}
                    <div className="flex items-center justify-between p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-brand-primary transition-all">
                      <div className="font-bold text-brand-navy">Monthly</div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-brand-navy flex items-center justify-end gap-2">
                          ${PRICING.SUBSCRIPTIONS.FOUR_SUBJECTS.MONTHLY} <span className="text-xs font-medium text-slate-400">/ mo</span>
                        </div>
                        <div className="text-xs text-slate-400 font-medium">Cancel anytime</div>
                      </div>
                    </div>
                    {/* 1 Year */}
                    <div className="flex items-center justify-between p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-brand-primary transition-all group">
                      <div>
                        <div className="font-bold text-brand-navy mb-1">1 Year Upfront</div>
                        <SaveBadge percent={15} />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-brand-navy flex items-center justify-end gap-2 group-hover:text-brand-primary transition-colors">
                          $21.25 <span className="text-xs font-medium text-slate-400">/ mo</span>
                        </div>
                        <div className="text-xs text-slate-400 font-medium">($255/yr total)</div>
                      </div>
                    </div>
                    {/* 2 Years */}
                    <div className="flex items-center justify-between p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-brand-primary transition-all group">
                      <div>
                        <div className="font-bold text-brand-navy mb-1">2 Years Upfront</div>
                        <SaveBadge percent={30} />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-brand-navy flex items-center justify-end gap-2 group-hover:text-brand-primary transition-colors">
                          $17.50 <span className="text-xs font-medium text-slate-400">/ mo</span>
                        </div>
                        <div className="text-xs text-slate-400 font-medium">($420 total)</div>
                      </div>
                    </div>
                    {/* 3 Years */}
                    <div className="flex items-center justify-between p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-brand-primary transition-all group">
                      <div>
                        <div className="font-bold text-brand-navy mb-1">3 Years Upfront</div>
                        <SaveBadge percent={50} />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-brand-navy flex items-center justify-end gap-2 group-hover:text-brand-primary transition-colors">
                          $12.50 <span className="text-xs font-medium text-slate-400">/ mo</span>
                        </div>
                        <div className="text-xs text-slate-400 font-medium">($450 total)</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* All Subjects Card */}
                <Card className="border-brand-primary bg-brand-primary shadow-2xl flex flex-col h-full relative text-white hover:scale-[1.01] transition-transform duration-500">
                  <div className="bg-[#4fb0ff] text-brand-navy text-center py-2 text-xs font-bold uppercase tracking-[0.2em] rounded-t-xl">Most Recommended</div>
                  <CardHeader className="p-8 pb-4">
                    <Badge className="w-fit mb-4 bg-white/20 text-white hover:bg-white/30 uppercase border-none font-bold tracking-widest">Subscription</Badge>
                    <CardTitle className="text-3xl font-bold text-white">All Subjects Plan</CardTitle>
                    <p className="mt-2 text-blue-100 text-base leading-relaxed font-medium pb-6 border-b border-white/20">All 10 Cambridge O-Level subjects. The complete EduMeUp experience.</p>
                  </CardHeader>
                  <CardContent className="p-8 pt-0 flex-grow space-y-4">
                    {/* Monthly */}
                    <div className="flex items-center justify-between p-5 rounded-2xl bg-white text-brand-navy shadow-lg">
                      <div className="font-bold">Monthly</div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-brand-primary flex items-center justify-end gap-2">
                          $40 <span className="text-xs font-medium text-slate-400">/ mo</span>
                        </div>
                        <div className="text-xs text-slate-400 font-medium">Cancel anytime</div>
                      </div>
                    </div>
                    {/* 1 Year */}
                    <div className="flex items-center justify-between p-5 rounded-2xl bg-white text-brand-navy shadow-lg hover:bg-blue-50 transition-colors cursor-pointer group">
                      <div>
                        <div className="font-bold mb-1">1 Year Upfront</div>
                        <SaveBadge percent={15} />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-brand-primary flex items-center justify-end gap-2">
                          $34 <span className="text-xs font-medium text-slate-400">/ mo</span>
                        </div>
                        <div className="text-xs text-slate-400 font-medium">($408/yr total)</div>
                      </div>
                    </div>
                    {/* 2 Years */}
                    <div className="flex items-center justify-between p-5 rounded-2xl bg-white text-brand-navy shadow-lg hover:bg-blue-50 transition-colors cursor-pointer">
                      <div>
                        <div className="font-bold mb-1">2 Years Upfront</div>
                        <SaveBadge percent={30} />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-brand-primary flex items-center justify-end gap-2">
                          $28 <span className="text-xs font-medium text-slate-400">/ mo</span>
                        </div>
                        <div className="text-xs text-slate-400 font-medium">($672 total)</div>
                      </div>
                    </div>
                    {/* 3 Years */}
                    <div className="flex items-center justify-between p-5 rounded-2xl bg-white text-brand-navy shadow-lg hover:bg-blue-50 transition-colors cursor-pointer border-2 border-emerald-400 relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[9px] font-bold uppercase px-3 py-1 rounded-bl-xl shadow-md">Best Deal</div>
                      <div>
                        <div className="font-bold mb-1">3 Years Upfront</div>
                        <SaveBadge percent={50} />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-brand-primary flex items-center justify-end gap-2">
                          $20 <span className="text-xs font-medium text-slate-400">/ mo</span>
                        </div>
                        <div className="text-xs text-slate-400 font-medium">($720 total)</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* SECTION 6 | MUST-HAVE COURSES AND ENGLISH */}
            <section id="english-pricing" className="scroll-mt-24">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">

                {/* Must-Have */}
                <div>
                  <h3 className="text-2xl font-bold text-brand-navy mb-4">Must-Have Courses — English Language Pathway</h3>
                  <p className="text-slate-600 text-base font-medium mb-8 leading-relaxed">The English language pathway courses and the Must-Have foundational courses are priced separately. These are the foundation that makes every other course more effective.</p>
                  <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                    <div className="bg-slate-50 border-b border-slate-100 p-6 grid grid-cols-[1.5fr,80px,1.5fr] gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <div>Course</div>
                      <div>Price</div>
                      <div>Notes</div>
                    </div>
                    <div className="divide-y divide-slate-50">
                      {[
                        { name: "Learn How to Learn — Must-Have", meta: "6 modules, Grade 6+", price: "$20", notes: "Recommended for all students as first course" },
                        { name: "Vocabulary Mastery Gr5-7", meta: "7 modules, COMPLETE", price: "$25", notes: "English foundation, all students" },
                        { name: "Reading Comprehension RC68", meta: "10 modules, dual track", price: "$30", notes: "Grade 6-8 English pathway, CEFR A2-B1+" },
                        { name: "ESL1 — CEFR A2", meta: "English language course", price: "$30", notes: "English language course" },
                        { name: "ESL2 — CEFR B1", meta: "English language course", price: "$30", notes: "English language course" },
                        { name: "O-Level English Bridge — B1+ to B2", meta: "Pre-O-Level English preparation", price: "$45", notes: "Pre-O-Level English preparation" },
                      ].map((course, idx) => (
                        <div key={idx} className="p-6 grid grid-cols-[1.5fr,80px,1.5fr] gap-6 items-center hover:bg-[#f8fbff] transition-colors">
                          <div>
                            <div className="font-bold text-brand-navy text-[15px]">{course.name}</div>
                            <div className="text-xs text-slate-400 font-medium mt-1">{course.meta}</div>
                          </div>
                          <div className="font-bold text-brand-primary text-lg">{course.price}</div>
                          <div className="text-xs text-slate-500 font-medium leading-relaxed">{course.notes}</div>
                        </div>
                      ))}
                      <div className="p-6 grid grid-cols-[1.5fr,80px,1.5fr] gap-6 items-center bg-blue-50/50">
                        <div>
                          <div className="font-bold text-brand-navy text-[15px]">Full O-Level English Foundation Pathway</div>
                          <div className="text-xs text-slate-500 font-medium mt-1">All 6 foundation courses</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-400 line-through font-bold">$180</div>
                          <div className="font-bold text-emerald-600 text-xl">$130</div>
                        </div>
                        <div className="text-xs text-emerald-600 font-bold uppercase tracking-wider">Save $50 on Bundle</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* O-Level English */}
                <div>
                  <h3 className="text-2xl font-bold text-brand-navy mb-4">O-Level English Bundles</h3>
                  <p className="text-slate-600 text-base font-medium mb-8 leading-relaxed">Specific bundles for targeted O-Level English Language preparation. Separate from subject courses.</p>
                  <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                    <div className="bg-slate-50 border-b border-slate-100 p-6 grid grid-cols-[1.5fr,80px,1.5fr] gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <div>Bundle</div>
                      <div>Price</div>
                      <div>What is included</div>
                    </div>
                    <div className="divide-y divide-slate-50">
                      {[
                        { name: "Comprehension Bundle", meta: "5 courses — Cambridge Paper 1: Reading", price: "$110", info: "5 past-paper-based comprehension courses. Mark-scheme annotated." },
                        { name: "Essay and Composition Bundle", meta: "3 courses — Cambridge Paper 2: Writing", price: "$145", info: "Essay Types, structure, and Band 3 to Band 1 Bridge Mastery." },
                        { name: "Directed Writing Part 1", meta: "9 modules — non-letter types", price: "$65", info: "All non-letter types. Includes 2024 paper questions." },
                        { name: "Directed Writing Part 2", meta: "6 letter types + formal email + mock", price: "$70", info: "All letter types, formal email, and full timed mock exam." },
                      ].map((bundle, idx) => (
                        <div key={idx} className="p-6 grid grid-cols-[1.5fr,80px,1.5fr] gap-6 items-center hover:bg-[#f8fbff] transition-colors">
                          <div>
                            <div className="font-bold text-brand-navy text-[15px]">{bundle.name}</div>
                            <div className="text-xs text-slate-400 font-medium mt-1">{bundle.meta}</div>
                          </div>
                          <div className="font-bold text-brand-primary text-lg">{bundle.price}</div>
                          <div className="text-xs text-slate-500 font-medium leading-relaxed">{bundle.info}</div>
                        </div>
                      ))}
                      <div className="p-6 grid grid-cols-[1.5fr,80px,1.5fr] gap-6 items-center bg-blue-50/50">
                        <div>
                          <div className="font-bold text-brand-navy text-[15px]">Full O-Level English Programme</div>
                          <div className="text-xs text-slate-500 font-medium mt-1">All 10 courses</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-400 line-through font-bold">$390</div>
                          <div className="font-bold text-emerald-600 text-xl">$270</div>
                        </div>
                        <div className="text-xs text-emerald-600 font-bold uppercase tracking-wider">Save $120 on Complete Prep</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7 | CAMBRIDGE 360deg EMPOWERMENT HUB */}
            <section id="cambridge-360" className="scroll-mt-24">
              <div className="bg-brand-navy rounded-[40px] p-8 md:p-16 shadow-2xl relative overflow-hidden text-white border border-white/5">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-primary/20 rounded-full blur-[100px]" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px]" />
                
                <div className="relative z-10 max-w-4xl">
                  <Badge className="bg-brand-primary text-white mb-8 border-none uppercase tracking-[0.2em] px-4 py-1.5 text-[10px] font-bold">AI Consultancy Service</Badge>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                    Personalised Guidance for Your Cambridge Journey.
                  </h2>
                  <p className="text-white text-lg font-medium leading-relaxed mb-12">
                    The Cambridge 360° Empowerment Hub provides personalised study plans, live expert sessions, and AI-powered consultancy for students, parents, and schools.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { name: "Essentials", price: "$15/mo", meta: "AI advisor, templates, 2 reviews/mo" },
                      { name: "Navigator", price: "$25/mo", meta: "Study plan + 1 live session/mo" },
                      { name: "Accelerator", price: "$69/mo", meta: "1 subject + 2 live sessions/mo" },
                      { name: "Excellence", price: "$99/mo", meta: "2 subjects + English + 3 sessions" },
                    ].map((plan, i) => (
                      <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 hover:border-brand-primary/50 transition-all group">
                        <h3 className="text-lg font-bold mb-1 group-hover:text-brand-primary transition-colors">{plan.name}</h3>
                        <div className="text-brand-primary font-bold mb-4 text-sm">{plan.price}</div>
                        <p className="text-[13px] text-white/70 font-medium leading-relaxed">{plan.meta}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-16 flex flex-col md:flex-row items-center gap-8">
                    <Link href="/cambridge-360" className="w-full md:w-auto">
                      <Button className="w-full h-14 px-8 bg-brand-primary hover:bg-white hover:text-brand-navy text-white font-bold rounded-2xl transition-all shadow-xl shadow-brand-primary/20">
                        View Hub Details
                      </Button>
                    </Link>
                    <p className="text-white/60 text-sm font-medium">Explore all 360° Empowerment Hub features <ArrowRight className="w-4 h-4 inline ml-1" /></p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8 | GLOBAL ACCESS SCHOLARSHIP */}
            <section id="scholarship" className="scroll-mt-24">
              <div className="bg-gradient-to-br from-[#f8fbff] to-white border border-slate-200 rounded-[40px] p-8 md:p-16 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                  <Globe className="w-96 h-96 text-brand-primary" />
                </div>

                <Badge className="bg-brand-primary text-white mb-8 border-none uppercase tracking-[0.2em] px-4 py-1.5 text-[10px] font-bold">Financial Aid</Badge>
                <h2 className="text-4xl font-bold text-brand-navy mb-6 relative z-10 max-w-3xl">
                  EduMeUp Global Access Scholarship.
                </h2>
                <p className="text-slate-600 text-lg font-medium mb-12 relative z-10 max-w-4xl leading-relaxed">
                  If the cost of Cambridge preparation is a financial barrier, our country-based concession can reduce your course price by <span className="text-brand-primary font-bold">15% or 30%</span> depending on where you live. Instant verification for qualifying countries.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 relative z-10">
                  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <h4 className="text-brand-primary font-bold text-xs uppercase tracking-[0.2em] mb-4">Qualifying Regions</h4>
                    <p className="text-[14px] text-slate-600 font-medium leading-relaxed">
                      30% concession for listed African countries; 15% for listed Asian countries and Haiti. The system checks your country automatically.
                    </p>
                  </div>
                  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <h4 className="text-brand-primary font-bold text-xs uppercase tracking-[0.2em] mb-4">No Paperwork</h4>
                    <p className="text-[14px] text-slate-600 font-medium leading-relaxed">
                      No salary certificates or bank statements. Just a simple, honest declaration of need.
                    </p>
                  </div>
                  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <h4 className="text-brand-primary font-bold text-xs uppercase tracking-[0.2em] mb-4">Instant Results</h4>
                    <p className="text-[14px] text-slate-600 font-medium leading-relaxed">
                      If approved, your discount code is generated instantly. No manual review waiting times.
                    </p>
                  </div>
                </div>

                <ScholarshipApplicationForm />
              </div>
            </section>

            {/* SECTION 9 | PRICING FAQ */}
            <section id="faq" className="scroll-mt-24">
              <h2 className="text-4xl font-bold text-brand-navy mb-12 text-center">Frequently Asked Questions</h2>
              <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
                <FAQItem
                  question="Can I buy a single chapter from a subject?"
                  answer="Yes. Chapter courses let you purchase any individual chapter from any of the 10 Cambridge O-Level subjects available on EduMeUp. You are not required to purchase the full subject course."
                />
                <FAQItem
                  question="What is the difference between a chapter and a subject course?"
                  answer="A chapter course covers one specific topic. A subject course covers the complete Cambridge O-Level syllabus — all chapters, in sequence, with the full 6-stage mastery cycle."
                />
                <FAQItem
                  question="Do the 2-year and 3-year prices mean I pay that amount every year?"
                  answer="No. The price shown for 2 years or 3 years is the total you pay once. For example, $180 for 1 subject over 2 years means you pay $180 once and have access for 2 full years."
                />
                <FAQItem
                  question="Can I switch subjects on a subscription plan?"
                  answer="Yes. On the 4-Subject and All Subjects subscription plans, you can change your subject selection at any time from your dashboard."
                />
                <FAQItem
                  question="What does the scholarship cover?"
                  answer="The EduMeUp Global Access Scholarship covers O-Level subject course pricing. A 30% concession applies for qualifying African countries; a 15% concession applies for qualifying Asian and American countries. The discount is applied at checkout with your generated code."
                />
                <FAQItem
                  question="Are all prices in USD?"
                  answer="Yes — all EduMeUp prices are in USD only. We do not display prices in local currencies on the platform."
                />
              </div>
            </section>
          </div>
        </div>

        {/* SECTION 10 | FINAL CTA */}
        <section id="final-cta" className="py-32 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-primary rounded-full blur-[120px]" />
          </div>
          
          <div className="container-custom relative z-10 px-6">
            <div className="max-w-4xl mx-auto text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold text-brand-navy mb-8 leading-tight">
                The Diagnostic Is Free. <br /><span className="text-brand-primary">Start Knowing Your Gaps.</span>
              </h2>
              <p className="text-xl text-slate-600 font-medium leading-relaxed">
                Identify exactly what you need in 30 minutes. No commitment, no payment required.
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-8 mb-24 items-stretch max-w-5xl mx-auto">
              <CtaCard
                icon={<Activity className="w-10 h-10 text-white" />}
                title="Free Diagnostic"
                subtitle="Identify your specific learning gaps."
                meta="Free · 30 mins · No Login"
                buttonText="Start Diagnostic"
                actionWrapper={(btn) => <InquiryDialog defaultType="diagnostic" title="Free Diagnostic" trigger={btn} />}
              />
              <CtaCard
                icon={<BookOpen className="w-10 h-10 text-white" />}
                title="Browse Courses"
                subtitle="Explore all O-Level subjects and chapters."
                meta="Available Worldwide"
                buttonText="View All Courses"
                buttonHref="/courses"
              />
            </div>

            {/* Trust Signals */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 border-t border-slate-200 pt-20">
              <div className="flex gap-4">
                <Award className="w-8 h-8 text-brand-primary shrink-0" />
                <div>
                  <p className="font-bold text-brand-navy">80% Mastery Gate</p>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">Verified retention before moving forward.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Globe className="w-8 h-8 text-brand-primary shrink-0" />
                <div>
                  <p className="font-bold text-brand-navy">Global Standard</p>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">Cambridge syllabus coverage worldwide.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Lock className="w-8 h-8 text-brand-primary shrink-0" />
                <div>
                  <p className="font-bold text-brand-navy">Secure Access</p>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">Instant course activation after checkout.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <GraduationCap className="w-8 h-8 text-brand-primary shrink-0" />
                <div>
                  <p className="font-bold text-brand-navy">Global Scholarship</p>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">Financial support for qualifying students.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}
