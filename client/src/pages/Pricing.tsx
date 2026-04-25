import { Layout } from "@/components/Layout";
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

const SaveBadge = ({ percent }: { percent: number }) => (
  <Badge className="bg-blue-100 text-[#2366c9] hover:bg-blue-100 font-bold uppercase tracking-wider border-none text-xs">
    Save {percent}%
  </Badge>
);

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-blue-100 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full justify-between items-center text-left font-semibold text-lg text-slate-900 hover:text-[#2366c9] transition-colors"
      >
        <span>{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
      </button>
      {isOpen && <div className="mt-3 text-black text-[14px] leading-relaxed pr-8 font-medium">{answer}</div>}
    </div>
  );
};

export default function Pricing() {
  return (
    <Layout>
      <div className="bg-white min-h-screen">

        {/* SECTION 1 | HERO */}
        <section className="bg-gradient-to-b from-blue-50/80 to-white pt-16 pb-16 px-6">
          <div className="max-w-6xl mx-auto flex flex-col gap-12">
            <div className="space-y-6">
              <h1 className="text-5xl font-semibold text-slate-900 tracking-tight leading-tight">
                Simple, Transparent Pricing.
              </h1>
              <p className="text-xl text-[#2366c9] font-semibold">
                Pay only for what you need. All prices in USD. No hidden fees.
              </p>
              <p className="text-black text-[14px] font-medium leading-relaxed">
                EduMeUp pricing is structured around how you learn — not around how EdTech platforms maximise revenue. If you need one chapter, buy one chapter. If you are preparing across multiple subjects for two years, lock in a discounted rate. If you belong to a developing country and need financial support, our Global Access Scholarship may apply to you.
              </p>
              {/* <div className="flex flex-col sm:flex-row gap-4 pt-2 text-[14px] font-semibold text-slate-700">
                <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-[#2366c9]" /> Pay Once Options</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-[#2366c9]" /> Access starts instantly</span>
              </div> */}
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Path 1 */}
              <Card className="border-blue-100 shadow-lg flex flex-col">
                <CardContent className="p-6 flex flex-col h-full">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Path 1</span>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Chapter Courses</h3>
                  <p className="text-xs text-black font-medium flex-grow mb-4">Buy any chapter from any subject. One-time payment. No subscription.</p>
                  <div className="font-semibold text-[#2366c9]">From ${PRICING.CHAPTER_COURSES.TIERS[PRICING.CHAPTER_COURSES.TIERS.length - 1].pricePerChapter.toFixed(2)}/chapter</div>
                </CardContent>
              </Card>
              {/* Path 2 */}
              <Card className="border-blue-100 shadow-lg flex flex-col">
                <CardContent className="p-6 flex flex-col h-full">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Path 2</span>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Subject Courses (1-2 subjects)</h3>
                  <p className="text-xs text-black font-medium flex-grow mb-4">One or two complete subjects. One-time payment. Multi-year discount.</p>
                  <div className="font-semibold text-[#2366c9]">From ${PRICING.SUBJECT_COURSES.SINGLE_SUBJECT.THREE_YEARS / 3}/year</div>
                </CardContent>
              </Card>
              {/* Path 3 */}
              <Card className="border-blue-100 shadow-lg flex flex-col">
                <CardContent className="p-6 flex flex-col h-full">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Path 3</span>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Subscription (4+ subjects)</h3>
                  <p className="text-xs text-black font-medium flex-grow mb-4">Four or all subjects. Monthly or annual. Best value for full prep.</p>
                  <div className="font-semibold text-[#2366c9]">From ${PRICING.SUBSCRIPTIONS.FOUR_SUBJECTS.MONTHLY}/month</div>
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
              <div className="bg-blue-50 border-l-4 border-[#2366c9] rounded-none p-8 flex flex-col xl:flex-row items-center gap-8 shadow-sm">
                <div className="flex-grow">
                  <h2 className="text-xs font-bold text-[#2366c9] uppercase tracking-widest mb-2">Before you purchase — The Free Diagnostic</h2>
                  <p className="text-slate-900 text-lg font-semibold mb-2">
                    Not sure which subject or how many chapters you need? The EduMeUp diagnostic is free, takes 30 minutes, and tells you exactly which topics and subjects you have gaps in — <span className="text-[#2366c9]">so you only pay for what you actually need.</span>
                  </p>
                  <p className="text-[14px] text-black font-medium">The diagnostic is always free. No login required to start. Results in 30 minutes.</p>
                </div>
                <InquiryDialog
                  defaultType="diagnostic"
                  title="Free Diagnostic"
                  trigger={
                    <Button className="whitespace-nowrap h-16 px-10 bg-[#2366c9] hover:bg-blue-700 text-white font-bold rounded-2xl text-lg shadow-xl uppercase tracking-widest">
                      Start Free Diagnostic
                    </Button>
                  }
                />
              </div>
            </section>

            {/* SECTION 3 | CHAPTER COURSE PRICING */}
            <section id="chapter-pricing" className="scroll-mt-24">
              <div className="mb-10">
                <h2 className="text-3xl font-semibold text-slate-900 mb-4">Buy Any Chapter. From Any Subject. Pay Once.</h2>
                <p className="text-black font-medium leading-relaxed text-[14px]">
                  Chapter courses let you purchase specific chapters from any of EduMeUp's Cambridge O-Level subjects — without committing to a full subject course. Perfect if your diagnostic identifies gaps in a few specific topics, or if you want to supplement your school's teaching with targeted interactive content.
                </p>
                <ul className="mt-6 space-y-2 text-[14px] text-slate-700 font-medium"> How Chapter Pricing Works:
                  <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> The price per chapter decreases as you buy more chapters — volume discount applied automatically.</li>
                  <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> The per-year price is shown as the headline. The total you pay is shown in brackets.</li>
                  <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> Buying 2 or 3 years upfront gives a further discount: 25% off for 2 years, 40% off for 3 years.</li>
                  <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> Access begins on the day of purchase. There is no monthly fee — you pay once.</li>
                </ul>
              </div>

              <div className="overflow-x-auto rounded-xl border border-blue-100 shadow-sm mb-12">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-blue-100">
                      <th className="p-4 font-semibold text-slate-900 text-[14px]">Chapters purchased</th>
                      <th className="p-4 font-semibold text-slate-900 text-[14px]">1-year price<br />per chapter</th>
                      <th className="p-4 font-semibold text-slate-900 text-[14px]">1 year total<br /></th>
                      <th className="p-4 font-semibold text-slate-900 text-[14px]">2 years total<br /><SaveBadge percent={25} /></th>
                      <th className="p-4 font-semibold text-slate-900 text-[14px]">3 years total<br /><SaveBadge percent={40} /></th>
                      <th className="p-4 font-semibold text-slate-900 text-[14px]">Access period</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-50 text-[14px] font-medium text-black">
                    {[
                      { range: "1-4 chapters", price: "$6.00", yr1: "$6.00 total", yr2: "$9.00 total", yr2p: "$4.50/yr", yr3: "$10.80 total", yr3p: "$3.60/yr", period: "1, 2, or 3 years" },
                      { range: "5-8 chapters", price: "$5.00", yr1: "$5.00/chap · eg 6 chaps = $30", yr2: "$37.50 total for 6 chaps", yr2p: "$18.75/yr", yr3: "$45.00 total for 6 chaps", yr3p: "$15.00/yr", period: "1, 2, or 3 years" },
                      { range: "9-12 chapters", price: "$4.00", yr1: "$4.00/chap · eg 10 chaps = $40", yr2: "$50.00 total for 10 chaps", yr2p: "$25.00/yr", yr3: "$60.00 total for 10 chaps", yr3p: "$20.00/yr", period: "1, 2, or 3 years" },
                      { range: "13-16 chapters", price: "$3.00", yr1: "$3.00/chap · eg 14 chaps = $42", yr2: "$52.50 total for 14 chaps", yr2p: "$26.25/yr", yr3: "$63.00 total for 14 chaps", yr3p: "$21.00/yr", period: "1, 2, or 3 years" },
                      { range: "17+ chapters", price: "$2.50", yr1: "$2.50/chap · eg 20 chaps = $50", yr2: "$62.50 total for 20 chaps", yr2p: "$31.25/yr", yr3: "$75.00 total for 20 chaps", yr3p: "$25.00/yr", period: "1, 2, or 3 years" },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-blue-50/50 transition-colors">
                        <td className="p-4 font-semibold text-slate-900">{row.range}</td>
                        <td className="p-4 text-[#2366c9] font-semibold text-base">{row.price}</td>
                        <td className="p-4">{row.yr1}</td>
                        <td className="p-4">
                          <div className="font-semibold text-slate-900">{row.yr2}</div>
                          <div className="text-xs text-slate-500">({row.yr2p})</div>
                        </td>
                        <td className="p-4">
                          <div className="font-semibold text-slate-900">{row.yr3}</div>
                          <div className="text-xs text-slate-500">({row.yr3p})</div>
                        </td>
                        <td className="p-4 text-slate-600">{row.period}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2"><Info className="w-5 h-5 text-[#2366c9]" /> WORKED EXAMPLES — Chapter Course Pricing</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-100">
                    <div className="text-xs font-bold text-[#2366c9] uppercase mb-2 tracking-wider">Example A</div>
                    <div className="font-semibold text-[14px] text-slate-900 mb-3">Buying 3 Chemistry chapters for 1 year</div>
                    <div className="text-base font-semibold text-[#2366c9] mb-2">3 chapters x $6.00 = $18.00 total</div>
                    <div className="text-xs text-slate-500 font-medium">Access: 1 year from date of purchase</div>
                  </div>
                  <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-100">
                    <div className="text-xs font-bold text-[#2366c9] uppercase mb-2 tracking-wider">Example B</div>
                    <div className="font-semibold text-[14px] text-slate-900 mb-3">Buying 8 Physics chapters for 2 years</div>
                    <div className="text-[13px] text-black font-medium leading-relaxed mb-3">
                      8 chapters x $5.00 = $40.00 normal cost (1yr). 2-year total = <span className="font-bold text-[#2366c9]">$37.50</span> — saving $42.50 vs two separate 1-year payments.
                    </div>
                    <div className="text-xs text-slate-500 font-semibold">Per year: $18.75. Save 25%.</div>
                  </div>
                  <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-100">
                    <div className="text-xs font-bold text-[#2366c9] uppercase mb-2 tracking-wider">Example C</div>
                    <div className="font-semibold text-[14px] text-slate-900 mb-3">Buying 20 Maths chapters for 3 years</div>
                    <div className="text-[13px] text-black font-medium leading-relaxed mb-3">
                      20 chapters x $2.50 = $50.00 normal cost (1yr). 3-year total = <span className="font-bold text-[#2366c9]">$75.00</span> — saving $75.00 vs three separate 1-year payments of $50.
                    </div>
                    <div className="text-xs text-slate-500 font-semibold">Per year: $25.00. Save 40%.</div>
                  </div>
                </div>
                <div className="mt-8 bg-blue-50 border-l-4 border-[#2366c9] rounded-r-2xl p-6 shadow-sm">
                  <h4 className="text-xs font-bold text-[#2366c9] uppercase tracking-widest mb-2">What's included in every Chapter Course?</h4>
                  <p className="text-slate-900 text-[15px] font-semibold mb-2">
                    All H5P interactive content for that chapter, Cambridge past paper questions tagged to that chapter, mark-scheme annotated practice, and access to the AI Study Advisor for that chapter's topic.
                  </p>
                  <p className="text-[13px] text-black font-medium">
                    The 80% mastery gate applies — you must achieve 80% before the next chapter in sequence unlocks.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 4 | SUBJECT COURSE PRICING */}
            <section id="subject-pricing" className="scroll-mt-24">
              <div className="mb-12">
                <h2 className="text-3xl font-semibold text-slate-900 mb-4">Complete Subject Courses — 1 or 2 Subjects (ONE-TIME PAYMENT)</h2>
                <p className="text-black font-medium text-[14px] leading-relaxed">
                  A complete O-Level subject course covers the entire Cambridge syllabus for that subject — chapter by chapter, with H5P interactive content, past papers from Day 1, spaced retrieval, AI Study Advisor access, mock exam simulation, and the full 6-stage mastery cycle. One-time payment gives you access for 1, 2, or 3 years — no recurring charges.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 1 Subject Card */}
                <Card className="border-blue-100 shadow-lg flex flex-col">
                  <CardHeader className="p-8 pb-4">
                    <Badge className="w-fit mb-4 bg-slate-200 text-slate-900 hover:bg-slate-200 uppercase">One-Time Payment</Badge>
                    <CardTitle className="text-2xl font-semibold text-slate-900">1 Subject</CardTitle>
                    <p className="mt-2 text-black text-[14px] leading-relaxed font-medium pb-6 border-b border-blue-50">Full Cambridge syllabus coverage for 1 subject. All 10 O-Level subjects available.</p>
                  </CardHeader>
                  <CardContent className="p-8 pt-0 flex-grow space-y-4">
                    {/* 1 Year */}
                    <div className="flex items-center justify-between p-4 rounded-xl border border-blue-100 hover:border-[#2366c9] transition-colors">
                      <div className="font-semibold text-slate-900 text-[14px]">1 Year Access</div>
                      <div className="text-right">
                        <div className="text-xl font-semibold text-slate-900 flex items-center justify-end gap-2">
                          ${PRICING.SUBJECT_COURSES.SINGLE_SUBJECT.ONE_YEAR} <span className="text-xs font-medium text-slate-500">/ yr</span>
                          <Badge className="bg-blue-50 text-[#2366c9] border border-blue-100 text-[9px] uppercase px-1 py-0 h-4">Scholarship</Badge>
                        </div>
                        <div className="text-xs text-slate-500 font-medium">(${PRICING.SUBJECT_COURSES.SINGLE_SUBJECT.ONE_YEAR} total)</div>
                      </div>
                    </div>
                    {/* 2 Years */}
                    <div className="flex items-center justify-between p-4 rounded-xl border border-[#2366c9] bg-blue-50/50 transition-colors relative">
                      <div className="absolute -top-3 left-4 bg-[#2366c9] text-white text-[10px] font-bold uppercase px-2 py-1 rounded shadow-sm">Most Popular</div>
                      <div>
                        <div className="font-semibold text-slate-900 text-[14px] mb-1">2 Years Access</div>
                        <SaveBadge percent={25} />
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-semibold text-slate-900 flex items-center justify-end gap-2">
                          $90 <span className="text-xs font-medium text-slate-500">/ yr</span>
                          <Badge className="bg-blue-50 text-[#2366c9] border border-blue-100 text-[9px] uppercase px-1 py-0 h-4">Scholarship</Badge>
                        </div>
                        <div className="text-xs text-slate-500 font-medium">($180 total)</div>
                      </div>
                    </div>
                    {/* 3 Years */}
                    <div className="flex items-center justify-between p-4 rounded-xl border border-blue-100 bg-[#f8fafc] hover:border-[#2366c9] transition-colors relative">
                      <div className="absolute -top-3 left-4 bg-amber-500 text-white text-[10px] font-bold uppercase px-2 py-1 rounded shadow-sm">Best Value</div>
                      <div>
                        <div className="font-semibold text-slate-900 text-[14px] mb-1">3 Years Access</div>
                        <SaveBadge percent={40} />
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-semibold text-slate-900 flex items-center justify-end gap-2">
                          $72 <span className="text-xs font-medium text-slate-500">/ yr</span>
                          <Badge className="bg-blue-50 text-[#2366c9] border border-blue-100 text-[9px] uppercase px-1 py-0 h-4">Scholarship</Badge>
                        </div>
                        <div className="text-xs text-slate-500 font-medium">($216 total)</div>
                      </div>
                    </div>
                    <p className="mt-2 text-slate-600 text-[14px] leading-relaxed font-medium pb-6 border-b border-blue-50">Access begins on the date of purchase. Your chosen subject remains accessible until the end of your selected access period. No monthly charges.</p>

                  </CardContent>
                </Card>

                {/* 2 Subjects Card */}
                <Card className="border-blue-100 shadow-lg flex flex-col">
                  <CardHeader className="p-8 pb-4">
                    <Badge className="w-fit mb-4 bg-slate-200 text-slate-900 hover:bg-slate-200 uppercase">One-Time Payment</Badge>
                    <CardTitle className="text-2xl font-semibold text-slate-900">2 Subjects</CardTitle>
                    <p className="mt-2 text-black text-[14px] leading-relaxed font-medium pb-6 border-b border-blue-50">Full Cambridge syllabus coverage for any 2 subjects of your choice.</p>
                  </CardHeader>
                  <CardContent className="p-8 pt-0 flex-grow space-y-4">
                    {/* 1 Year */}
                    <div className="flex items-center justify-between p-4 rounded-xl border border-blue-100 hover:border-[#2366c9] transition-colors">
                      <div className="font-semibold text-slate-900 text-[14px]">1 Year Access</div>
                      <div className="text-right">
                        <div className="text-xl font-semibold text-slate-900 flex items-center justify-end gap-2">
                          $85 <span className="text-xs font-medium text-slate-500">/ yr/sub</span>
                          <Badge className="bg-blue-50 text-[#2366c9] border border-blue-100 text-[9px] uppercase px-1 py-0 h-4">Scholarship</Badge>
                        </div>
                        <div className="text-xs text-slate-500 font-medium">($170 total)</div>
                      </div>
                    </div>
                    {/* 2 Years */}
                    <div className="flex items-center justify-between p-4 rounded-xl border border-[#2366c9] bg-blue-50/50 transition-colors relative">
                      <div className="absolute -top-3 left-4 bg-[#2366c9] text-white text-[10px] font-bold uppercase px-2 py-1 rounded">Most Popular</div>
                      <div>
                        <div className="font-semibold text-slate-900 text-[14px] mb-1">2 Years Access</div>
                        <SaveBadge percent={25} />
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-semibold text-slate-900 flex items-center justify-end gap-2">
                          $63.75 <span className="text-xs font-medium text-slate-500">/ yr/sub</span>
                          <Badge className="bg-blue-50 text-[#2366c9] border border-blue-100 text-[9px] uppercase px-1 py-0 h-4">Scholarship</Badge>
                        </div>
                        <div className="text-xs text-slate-500 font-medium">($255 total)</div>
                      </div>
                    </div>
                    {/* 3 Years */}
                    <div className="flex items-center justify-between p-4 rounded-xl border border-blue-100 bg-[#f8fafc] hover:border-[#2366c9] transition-colors relative">
                      <div className="absolute -top-3 left-4 bg-amber-500 text-white text-[10px] font-bold uppercase px-2 py-1 rounded shadow-sm">Best Value</div>
                      <div>
                        <div className="font-semibold text-slate-900 text-[14px] mb-1">3 Years Access</div>
                        <SaveBadge percent={40} />
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-semibold text-slate-900 flex items-center justify-end gap-2">
                          $51 <span className="text-xs font-medium text-slate-500">/ yr/sub</span>
                          <Badge className="bg-blue-50 text-[#2366c9] border border-blue-100 text-[9px] uppercase px-1 py-0 h-4">Scholarship</Badge>
                        </div>
                        <div className="text-xs text-slate-500 font-medium">($306 total)</div>
                      </div>
                    </div>
                    <p className="mt-2 text-slate-600 text-[14px] leading-relaxed font-medium pb-6 border-b border-blue-50">Select any 2 subjects from the 10 available Cambridge O-Level subjects. Access for both subjects runs simultaneously from the date of purchase</p>
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
                  className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#2366c9] hover:text-blue-700 transition-colors"
                >
                  <Globe className="w-4 h-4" /> Studying in a developing country? You may qualify for our Global Access Scholarship — 40% off. Apply in 2 minutes.
                </a>
              </div>

              <div className="mt-8 bg-white border border-blue-200 rounded-xl p-6 flex items-start gap-4 shadow-sm">
                <AlertCircle className="w-6 h-6 text-[#2366c9] shrink-0" />
                <div>
                  <h4 className="font-semibold text-slate-900">Choosing 3 Subjects? Read this first.</h4>
                  <p className="text-[14px] text-black font-medium mt-1">
                    If you need 3 subjects, our <strong>4-Subject Subscription Plan</strong> is the better choice — and it gives you a 4th subject at no extra cost. At $25/month, it works out to $6.25 per subject per month, with full flexibility to change your subject selection. It is a better deal than buying 3 subjects one-time at $120 each.
                  </p>
                  <a
                    href="#subscription"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('subscription')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-block mt-3 text-[14px] font-semibold text-[#2366c9] hover:text-blue-800 transition-colors"
                  >
                    [ See 4-Subject Subscription below ]
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 5 | SUBSCRIPTION PRICING */}
            <section id="subscription" className="scroll-mt-24">
              <div className="mb-12">
                <h2 className="text-3xl font-semibold mb-4 text-slate-900">The Subscription Plans — 4 Subjects or All Subjects.</h2>
                <p className="text-black text-[14px] font-medium leading-relaxed">
                  The subscription plans give you access to 4 subjects or all 10 Cambridge O-Level subjects simultaneously — including all course content, the AI Study Advisor, spaced retrieval scheduling, mock exam simulation, past paper practice, and the parent dashboard. Ideal for students in full O-Level preparation mode who need comprehensive coverage across multiple subjects.
                </p>

                <div className="mt-8 bg-blue-50 border-l-4 border-[#2366c9] rounded-r-2xl p-6 shadow-sm">
                  <h4 className="text-xs font-bold text-[#2366c9] uppercase tracking-widest mb-3">[NOTE] WHAT 'ALL SUBJECTS' INCLUDES:</h4>
                  <p className="text-slate-900 text-[14px] font-semibold mb-3 leading-relaxed">
                    The All Subjects plan covers all 10 available Cambridge O-Level subject courses: Mathematics, Physics, Chemistry, Biology, Economics, Business Studies, English Language, Urdu, Islamiyat, and Pakistan Studies.
                  </p>
                  <p className="text-[13px] text-black font-medium leading-relaxed">
                    New chapter and topic additions are included automatically — as new content is added to any subject, all subscribers receive it at no extra cost.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* 4 Subjects Card */}
                <Card className="border-slate-200 bg-slate-50 flex flex-col h-full shadow-lg">
                  <CardHeader className="p-8 pb-4">
                    <Badge className="w-fit mb-4 bg-slate-200 text-slate-600 hover:bg-slate-200 uppercase">Subscription</Badge>
                    <CardTitle className="text-2xl font-semibold text-slate-900">4-Subject Plan</CardTitle>
                    <p className="mt-2 text-slate-600 text-[14px] leading-relaxed font-medium pb-6 border-b border-slate-200">Any 4 Cambridge O-Level subjects of your choice. Change subject selection at any time.</p>
                  </CardHeader>
                  <CardContent className="p-8 pt-0 flex-grow space-y-4">
                    {/* Monthly */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white border border-slate-200">
                      <div className="font-semibold text-slate-900 text-[14px]">Monthly</div>
                      <div className="text-right">
                        <div className="text-xl font-semibold text-slate-900 flex items-center justify-end gap-2">
                          ${PRICING.SUBSCRIPTIONS.FOUR_SUBJECTS.MONTHLY} <span className="text-xs font-medium text-slate-500">/ mo</span>
                          <Badge className="bg-blue-50 text-[#2366c9] border border-blue-100 text-[9px] uppercase px-1 py-0 h-4">Scholarship</Badge>
                        </div>
                        <div className="text-xs text-slate-500 font-medium">(cancel anytime)</div>
                      </div>
                    </div>
                    {/* 1 Year */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white border border-slate-200 hover:border-[#2366c9] transition-colors">
                      <div>
                        <div className="font-semibold text-slate-900 text-[14px] mb-1">1 Year Upfront</div>
                        <Badge className="bg-blue-50 text-[#2366c9] border-none text-[10px] uppercase">Save 15%</Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-semibold text-slate-900 flex items-center justify-end gap-2">
                          $21.25 <span className="text-xs font-medium text-slate-500">/ mo</span>
                          <Badge className="bg-blue-50 text-[#2366c9] border border-blue-100 text-[9px] uppercase px-1 py-0 h-4">Scholarship</Badge>
                        </div>
                        <div className="text-xs text-slate-500 font-medium">($255/yr total)</div>
                      </div>
                    </div>
                    {/* 2 Years */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white border border-slate-200 hover:border-[#2366c9] transition-colors">
                      <div>
                        <div className="font-semibold text-slate-900 text-[14px] mb-1">2 Years Upfront</div>
                        <Badge className="bg-blue-50 text-[#2366c9] border-none text-[10px] uppercase">Save 30%</Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-semibold text-slate-900 flex items-center justify-end gap-2">
                          $17.50 <span className="text-xs font-medium text-slate-500">/ mo</span>
                          <Badge className="bg-blue-50 text-[#2366c9] border border-blue-100 text-[9px] uppercase px-1 py-0 h-4">Scholarship</Badge>
                        </div>
                        <div className="text-xs text-slate-500 font-medium">($420 total)</div>
                      </div>
                    </div>
                    {/* 3 Years */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white border border-slate-200 hover:border-[#2366c9] transition-colors">
                      <div>
                        <div className="font-semibold text-slate-900 text-[14px] mb-1">3 Years Upfront</div>
                        <Badge className="bg-blue-50 text-[#2366c9] border-none text-[10px] uppercase">Save 50%</Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-semibold text-slate-900 flex items-center justify-end gap-2">
                          $12.50 <span className="text-xs font-medium text-slate-500">/ mo</span>
                          <Badge className="bg-blue-50 text-[#2366c9] border border-blue-100 text-[9px] uppercase px-1 py-0 h-4">Scholarship</Badge>
                        </div>
                        <div className="text-xs text-slate-500 font-medium">($450 total)</div>
                      </div>
                    </div>
                    <p className="text-slate-600 text-[14px] font-medium leading-relaxed">
Subscriptions renew automatically unless cancelled. Cancel any time before the next billing date. For annual and multi-year plans: full access for the paid period, no further charges until renewal.                </p>
                  </CardContent>
                </Card>

                {/* All Subjects Card */}
                <Card className="border-[#2366c9] bg-[#2366c9] shadow-2xl flex flex-col h-full relative text-white">
                  <div className="bg-[#4fb0ff] text-[#0a2347] text-center py-1.5 text-xs font-bold uppercase tracking-widest rounded-t-xl">Best Value</div>
                  <CardHeader className="p-8 pb-4">
                    <Badge className="w-fit mb-4 bg-blue-500 text-white hover:bg-blue-500 uppercase border-none">Subscription</Badge>
                    <CardTitle className="text-2xl font-semibold text-white">All Subjects Plan</CardTitle>
                    <p className="mt-2 text-blue-100 text-[14px] leading-relaxed font-medium pb-6 border-b border-blue-500">All 10 Cambridge O-Level subjects. Every new chapter added is included automatically.</p>
                  </CardHeader>
                  <CardContent className="p-8 pt-0 flex-grow space-y-4">
                    {/* Monthly */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white border border-white/10 shadow-sm">
                      <div className="font-semibold text-slate-900 text-[14px]">Monthly</div>
                      <div className="text-right">
                        <div className="text-xl font-semibold text-[#2366c9] flex items-center justify-end gap-2">
                          $40 <span className="text-xs font-medium text-slate-500">/ mo</span>
                          <Badge className="bg-blue-50 text-[#2366c9] border border-blue-100 text-[9px] uppercase px-1 py-0 h-4">Scholarship</Badge>
                        </div>
                        <div className="text-xs text-slate-500 font-medium">(cancel anytime)</div>
                      </div>
                    </div>
                    {/* 1 Year */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white border border-white/10 shadow-sm hover:bg-slate-50 transition-colors">
                      <div>
                        <div className="font-semibold text-slate-900 text-[14px] mb-1">1 Year Upfront</div>
                        <Badge className="bg-blue-100 text-[#2366c9] border-none text-[10px] uppercase font-bold">Save 15%</Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-semibold text-[#2366c9] flex items-center justify-end gap-2">
                          $34 <span className="text-xs font-medium text-slate-500">/ mo</span>
                          <Badge className="bg-blue-50 text-[#2366c9] border border-blue-100 text-[9px] uppercase px-1 py-0 h-4">Scholarship</Badge>
                        </div>
                        <div className="text-xs text-slate-500 font-medium">($408/yr total)</div>
                      </div>
                    </div>
                    {/* 2 Years */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white border border-white/10 shadow-sm hover:bg-slate-50 transition-colors">
                      <div>
                        <div className="font-semibold text-slate-900 text-[14px] mb-1">2 Years Upfront</div>
                        <Badge className="bg-blue-100 text-[#2366c9] border-none text-[10px] uppercase font-bold">Save 30%</Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-semibold text-[#2366c9] flex items-center justify-end gap-2">
                          $28 <span className="text-xs font-medium text-slate-500">/ mo</span>
                          <Badge className="bg-blue-50 text-[#2366c9] border border-blue-100 text-[9px] uppercase px-1 py-0 h-4">Scholarship</Badge>
                        </div>
                        <div className="text-xs text-slate-500 font-medium">($672 total)</div>
                      </div>
                    </div>
                    {/* 3 Years */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white border border-white/10 shadow-sm hover:bg-slate-50 transition-colors">
                      <div>
                        <div className="font-semibold text-slate-900 text-[14px] mb-1">3 Years Upfront</div>
                        <Badge className="bg-blue-100 text-[#2366c9] border-none text-[10px] uppercase font-bold">Save 50%</Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-semibold text-[#2366c9] flex items-center justify-end gap-2">
                          $20 <span className="text-xs font-medium text-slate-500">/ mo</span>
                          <Badge className="bg-blue-50 text-[#2366c9] border border-blue-100 text-[9px] uppercase px-1 py-0 h-4">Scholarship</Badge>
                        </div>
                        <div className="text-xs text-slate-500 font-medium">($720 total)</div>
                      </div>
                    </div>
                    <p className="text-white text-[14px] font-medium leading-relaxed">
Subscriptions renew automatically unless cancelled. Cancel any time before the next billing date. For annual and multi-year plans: full access for the paid period, no further charges until renewal.                </p>
                  </CardContent>
                </Card>
                <div className="mt-8 text-center md:text-left">
                  <a
                    href="#scholarship"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('scholarship')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#2366c9] hover:text-blue-700 transition-colors"
                  >
                    <Globe className="w-4 h-4" /> Studying in a developing country? You may qualify for our Global Access Scholarship — 40% off. Apply in 2 minutes.
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 6 | MUST-HAVE COURSES AND ENGLISH */}
            <section id="english-pricing" className="scroll-mt-24">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">

                {/* Must-Have */}
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900 mb-2">Must-Have Courses — English Language Pathway</h3>
                  <p className="text-black text-[14px] font-medium mb-6">The English language pathway courses and the Must-Have foundational courses are priced separately from the O-Level subject courses. These are recommended for all students regardless of their O-Level subject selection — they are the foundation that makes every other course more effective.</p>
                  <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden">
                    <div className="bg-slate-50 border-b border-blue-50 p-4 grid grid-cols-[1.5fr,80px,1.5fr] gap-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">
                      <div>Course</div>
                      <div>Price</div>
                      <div>Notes</div>
                    </div>
                    <div className="divide-y divide-blue-50">
                      <div className="p-4 grid grid-cols-[1.5fr,80px,1.5fr] gap-4 items-center hover:bg-blue-50/50 transition-colors">
                        <div>
                          <div className="font-semibold text-slate-900 text-[14px]">Learn How to Learn — Must-Have</div>
                          <div className="text-xs text-slate-500 font-medium">6 modules, Grade 6+</div>
                        </div>
                        <div className="font-semibold text-[#2366c9]">$20</div>
                        <div className="text-xs text-slate-600 font-medium">Recommended for all students as first course</div>
                      </div>
                      <div className="p-4 grid grid-cols-[1.5fr,80px,1.5fr] gap-4 items-center hover:bg-blue-50/50 transition-colors">
                        <div>
                          <div className="font-semibold text-slate-900 text-[14px]">Vocabulary Mastery Gr5-7</div>
                          <div className="text-xs text-slate-500 font-medium">7 modules, COMPLETE</div>
                        </div>
                        <div className="font-semibold text-[#2366c9]">$25</div>
                        <div className="text-xs text-slate-600 font-medium">English foundation, all students</div>
                      </div>
                      <div className="p-4 grid grid-cols-[1.5fr,80px,1.5fr] gap-4 items-center hover:bg-blue-50/50 transition-colors">
                        <div>
                          <div className="font-semibold text-slate-900 text-[14px]">Reading Comprehension RC68</div>
                          <div className="text-xs text-slate-500 font-medium">10 modules, dual track</div>
                        </div>
                        <div className="font-semibold text-[#2366c9]">$30</div>
                        <div className="text-xs text-slate-600 font-medium">Grade 6-8 English pathway, CEFR A2-B1+</div>
                      </div>
                      <div className="p-4 grid grid-cols-[1.5fr,80px,1.5fr] gap-4 items-center hover:bg-blue-50/50 transition-colors">
                        <div>
                          <div className="font-semibold text-slate-900 text-[14px]">ESL1 — CEFR A2</div>
                          <div className="text-xs text-slate-500 font-medium">English language course</div>
                        </div>
                        <div className="font-semibold text-[#2366c9]">$30</div>
                        <div className="text-xs text-slate-600 font-medium">English language course</div>
                      </div>
                      <div className="p-4 grid grid-cols-[1.5fr,80px,1.5fr] gap-4 items-center hover:bg-blue-50/50 transition-colors">
                        <div>
                          <div className="font-semibold text-slate-900 text-[14px]">ESL2 — CEFR B1</div>
                          <div className="text-xs text-slate-500 font-medium">English language course</div>
                        </div>
                        <div className="font-semibold text-[#2366c9]">$30</div>
                        <div className="text-xs text-slate-600 font-medium">English language course</div>
                      </div>
                      <div className="p-4 grid grid-cols-[1.5fr,80px,1.5fr] gap-4 items-center hover:bg-blue-50/50 transition-colors">
                        <div>
                          <div className="font-semibold text-slate-900 text-[14px]">O-Level English Bridge — B1+ to B2</div>
                          <div className="text-xs text-slate-500 font-medium">Pre-O-Level English preparation</div>
                        </div>
                        <div className="font-semibold text-[#2366c9]">$45</div>
                        <div className="text-xs text-slate-600 font-medium">Pre-O-Level English preparation</div>
                      </div>
                      <div className="p-4 grid grid-cols-[1.5fr,80px,1.5fr] gap-4 items-center bg-blue-50/80">
                        <div>
                          <div className="font-semibold text-slate-900 text-[14px]">Full O-Level English Foundation Pathway Program</div>
                          <div className="text-xs text-slate-700 font-medium">All 6 foundation courses</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-400 line-through font-semibold">$180</div>
                          <div className="font-semibold text-[#2366c9] text-lg">$130</div>
                        </div>
                        <div className="text-xs text-[#2366c9] font-bold uppercase tracking-wide">Save $50 on Bundle</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* O-Level English */}
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900 mb-2">O-LEVEL ENGLISH COURSES — FIXED BUNDLE PRICING</h3>
                  <p className="text-black text-[14px] font-medium mb-6">The 10 O-Level English Language courses are available as three fixed-price bundles — separate from and in addition to the O-Level English Language subject course above.</p>
                  <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden">
                    <div className="bg-slate-50 border-b border-blue-50 p-4 grid grid-cols-[1.5fr,80px,1.5fr] gap-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">
                      <div>Bundle</div>
                      <div>Price</div>
                      <div>What is included</div>
                    </div>
                    <div className="divide-y divide-blue-50">
                      <div className="p-4 grid grid-cols-[1.5fr,80px,1.5fr] gap-4 items-center hover:bg-blue-50/50 transition-colors">
                        <div>
                          <div className="font-semibold text-slate-900 text-[14px]">Comprehension Bundle</div>
                          <div className="text-xs text-slate-500 font-medium">5 courses — Cambridge Paper 1: Reading</div>
                        </div>
                        <div className="font-semibold text-[#2366c9]">$110</div>
                        <div className="text-xs text-slate-600 font-medium leading-relaxed">5 past-paper-based comprehension courses. Two texts, structured and extended writing questions. Mark-scheme annotated.</div>
                      </div>
                      <div className="p-4 grid grid-cols-[1.5fr,80px,1.5fr] gap-4 items-center hover:bg-blue-50/50 transition-colors">
                        <div>
                          <div className="font-semibold text-slate-900 text-[14px]">Essay and Composition Bundle</div>
                          <div className="text-xs text-slate-500 font-medium">3 courses — Cambridge Paper 2: Writing</div>
                        </div>
                        <div className="font-semibold text-[#2366c9]">$145</div>
                        <div className="text-xs text-slate-600 font-medium leading-relaxed">F1: Essay Types and Structure. F2: 10-Day Band 3 to Band 1 Bridge. F3: Complete Mastery Band 3 to Band 1.</div>
                      </div>
                      <div className="p-4 grid grid-cols-[1.5fr,80px,1.5fr] gap-4 items-center hover:bg-blue-50/50 transition-colors">
                        <div>
                          <div className="font-semibold text-slate-900 text-[14px]">Directed Writing Part 1</div>
                          <div className="text-xs text-slate-500 font-medium">9 modules — non-letter types, Format A and B</div>
                        </div>
                        <div className="font-semibold text-[#2366c9]">$65</div>
                        <div className="text-xs text-slate-600 font-medium leading-relaxed">All non-letter directed writing types. Includes 2024 paper questions.</div>
                      </div>
                      <div className="p-4 grid grid-cols-[1.5fr,80px,1.5fr] gap-4 items-center hover:bg-blue-50/50 transition-colors">
                        <div>
                          <div className="font-semibold text-slate-900 text-[14px]">Directed Writing Part 2</div>
                          <div className="text-xs text-slate-500 font-medium">6 letter types + formal email + mock exam</div>
                        </div>
                        <div className="font-semibold text-[#2366c9]">$70</div>
                        <div className="text-xs text-slate-600 font-medium leading-relaxed">All letter types, formal email format, and a complete timed mock examination.</div>
                      </div>
                      <div className="p-4 grid grid-cols-[1.5fr,80px,1.5fr] gap-4 items-center bg-blue-50/80">
                        <div>
                          <div className="font-semibold text-slate-900 text-[14px]">Full O-Level English Programme</div>
                          <div className="text-xs text-slate-700 font-medium">All 10 courses</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-400 line-through font-semibold">$390</div>
                          <div className="font-semibold text-[#2366c9] text-lg">$270</div>
                        </div>
                        <div className="text-xs text-slate-600 font-medium leading-relaxed">
                          <div className="text-[#2366c9] font-bold uppercase tracking-wide mb-1">Save $120 on Complete Prep Bundle</div>
                          Discounted bundle for students wanting complete Paper 1 and Paper 2 preparation.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7 | CAMBRIDGE 360deg EMPOWERMENT HUB */}
            <section id="cambridge-360" className="scroll-mt-24">
              <div className="bg-slate-900 rounded-3xl p-8 md:p-12 shadow-lg relative overflow-hidden text-center md:text-left text-white border border-slate-800">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
                  <div>
                    <Badge className="bg-[#2366c9] text-white hover:bg-[#2366c9] mb-4 border-none uppercase tracking-widest text-xs">AI Consultancy</Badge>
                    <h2 className="text-3xl text-white font-semibold mb-4">
                      Need Personalised Guidance? The Cambridge 360° Empowerment Hub Has Four Plans.
                    </h2>
                    <p className="text-slate-300 text-[14px] font-medium leading-relaxed">
                      The Cambridge 360° Empowerment Hub is EduMeUp's AI-powered consultancy and empowerment service — separate from the course pricing above. It provides Cambridge information, personalised guidance, study plans, and live expert sessions for students, parents, teachers, and schools.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Essentials */}
                  <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:border-[#2366c9] transition-colors">
                    <h3 className="text-lg font-semibold mb-1 text-white">Essentials</h3>
                    <div className="text-[#4fb0ff] font-semibold mb-4 text-[14px]">$15/month or $130/year</div>
                    <p className="text-xs text-slate-300 font-medium leading-relaxed">AI advisor, Cambridge Q&A, templates, Expert Review (2 questions/month).</p>
                  </div>
                  {/* Navigator */}
                  <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:border-[#2366c9] transition-colors relative">
                    <h3 className="text-lg font-semibold mb-1 text-white">Navigator</h3>
                    <div className="text-[#4fb0ff] font-semibold mb-4 text-[14px]">${PRICING.HUB_PLANS.NAVIGATOR.MONTHLY}/month or ${PRICING.HUB_PLANS.NAVIGATOR.YEARLY}/year</div>
                    <p className="text-xs text-slate-300 font-medium leading-relaxed">All Essentials + personalised study plan + 1 live expert session per month (15 min).</p>
                  </div>
                  {/* Accelerator */}
                  <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:border-[#2366c9] transition-colors">
                    <h3 className="text-lg font-semibold mb-1 text-white">Accelerator</h3>
                    <div className="text-[#4fb0ff] font-semibold mb-4 text-[14px]">$69/month or $590/year</div>
                    <p className="text-xs text-slate-300 font-medium leading-relaxed">All Navigator + full diagnostic + 1 subject course + 2 live sessions/month (30 min).</p>
                  </div>
                  {/* Excellence */}
                  <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:border-[#2366c9] transition-colors">
                    <h3 className="text-lg font-semibold mb-1 text-white">Excellence</h3>
                    <div className="text-[#4fb0ff] font-semibold mb-4 text-[14px]">$99/month or $850/year</div>
                    <p className="text-xs text-slate-300 font-medium leading-relaxed">All Accelerator + 2 subjects + English pathway + 3 sessions/month (individual) or School plan</p>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-center gap-4 text-center">
                  <p className="text-slate-400 text-[14px] font-medium">
                    For full plan details, feature comparison, and how to subscribe:
                  </p>
                  <Link href="/cambridge-360">
                    <Button variant="ghost" className="text-[#4fb0ff] hover:text-white p-0 font-semibold flex items-center gap-2 text-[14px] hover:bg-transparent">
                      View Cambridge 360° Empowerment Hub <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 8 | GLOBAL ACCESS SCHOLARSHIP */}
            <section id="scholarship" className="scroll-mt-24">
              <div className="bg-gradient-to-br from-blue-50/80 to-white border border-blue-100 rounded-3xl p-8 md:p-12 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                  <Globe className="w-64 h-64 text-[#2366c9]" />
                </div>

                <Badge className="bg-[#2366c9] text-white hover:bg-[#2366c9] mb-6 border-none uppercase tracking-widest text-xs">Up to 40% Off</Badge>
                <h2 className="text-3xl font-semibold text-slate-900 mb-4 relative z-10">
                  EduMeUp Global Access Scholarship — Quality Cambridge Preparation Should Not Be a Financial Barrier.
                </h2>
                <p className="text-black text-[14px] font-medium mb-12 relative z-10 leading-relaxed">
                  EduMeUp is committed to making Cambridge-standard O-Level preparation accessible to students in developing countries. If the cost of an EduMeUp course is a genuine financial barrier for you, our Global Access Scholarship may reduce your course price by up to 20% – 40% as applicable.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative z-10">
                  <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-blue-100 shadow-sm">
                    <h4 className="text-[#2366c9] font-bold text-xs uppercase tracking-widest mb-3">Who Can Apply</h4>
                    <p className="text-[13px] text-black font-medium leading-relaxed">
                      Students studying from qualifying developing or lower-income countries (list maintained internally — system checks automatically).
                    </p>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-blue-100 shadow-sm">
                    <h4 className="text-[#2366c9] font-bold text-xs uppercase tracking-widest mb-3">What You Need to Submit</h4>
                    <p className="text-[13px] text-black font-medium leading-relaxed">
                      A short form — name, class, phone, email, country, and a simple declaration. No salary certificate. No previous exam results. No supporting documents. Just your declaration that you genuinely cannot afford the full price.
                    </p>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-blue-100 shadow-sm">
                    <h4 className="text-[#2366c9] font-bold text-xs uppercase tracking-widest mb-3">What Happens Next</h4>
                    <p className="text-[13px] text-black font-medium leading-relaxed">
                      If your country qualifies, a 20% – 40% discount, which is applicable, is applied to your selected course(s) automatically. The system handles this — no manual review needed, no waiting period.
                    </p>
                  </div>
                </div>

                <div className="mb-10 bg-blue-50 border-l-4 border-[#2366c9] rounded-r-2xl p-6 shadow-sm relative z-10">
                  <p className="text-[13px] text-black font-medium leading-relaxed">
                    <strong>IMPORTANT:</strong> The scholarship applies to O-Level subject course pricing only. It does not apply to chapter courses (already low unit price) or the Cambridge 360° Hub consultancy plans etc.
  </p>
                </div>

                <form className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-blue-100 relative z-10">
                  <h3 className="font-semibold text-slate-900 mb-6 text-lg border-b border-blue-50 pb-4 uppercase tracking-wider text-sm">Scholarship Application Form</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-black mb-2">Full Name</label>
                      <input type="text" maxLength={100} required className="w-full h-11 px-3 rounded-xl border border-blue-100 focus:ring-2 focus:ring-[#2366c9] focus:border-[#2366c9] outline-none transition-all text-[14px] font-semibold text-slate-700" placeholder="Enter your full name" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-black mb-2">Current Class / Grade</label>
                      <select required className="w-full h-11 px-3 rounded-xl border border-blue-100 focus:ring-2 focus:ring-[#2366c9] outline-none bg-white text-[14px] font-semibold text-slate-700">
                        <option value="">Select your class...</option>
                        <option value="Grade 6">Grade 6</option>
                        <option value="Grade 7">Grade 7</option>
                        <option value="Grade 8">Grade 8</option>
                        <option value="O-Level Year 1">O-Level Year 1</option>
                        <option value="O-Level Year 2">O-Level Year 2</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-black mb-2">Email Address</label>
                      <input type="email" required className="w-full h-11 px-3 rounded-xl border border-blue-100 focus:ring-2 focus:ring-[#2366c9] outline-none text-[14px] font-semibold text-slate-700" placeholder="For discount code delivery" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-black mb-2">Phone Number (Optional)</label>
                      <input type="tel" className="w-full h-11 px-3 rounded-xl border border-blue-100 focus:ring-2 focus:ring-[#2366c9] outline-none text-[14px] font-semibold text-slate-700" placeholder="+Country Code Number" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-black mb-2">Country</label>
                      <select required className="w-full h-11 px-3 rounded-xl border border-blue-100 focus:ring-2 focus:ring-[#2366c9] outline-none bg-white text-[14px] font-semibold text-slate-700">
                        <option value="">Select your country...</option>
                        <optgroup label="Qualifying Regions (Internal Sample)">
                          <option value="Pakistan">Pakistan</option>
                          <option value="Bangladesh">Bangladesh</option>
                          <option value="Nigeria">Nigeria</option>
                          <option value="Egypt">Egypt</option>
                        </optgroup>
                        <option value="Other">Other...</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-black mb-2">Course(s) Selected</label>
                      <select required className="w-full h-11 px-3 rounded-xl border border-blue-100 focus:ring-2 focus:ring-[#2366c9] outline-none bg-white text-[14px] font-semibold text-slate-700">
                        <option value="">Select a course...</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Physics">Physics</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Biology">Biology</option>
                        <option value="Economics">Economics</option>
                        <option value="Business Studies">Business Studies</option>
                        <option value="English Language">English Language</option>
                        <option value="Urdu">Urdu</option>
                        <option value="Islamiyat">Islamiyat</option>
                        <option value="Pakistan Studies">Pakistan Studies</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <div className="mb-4 p-4 bg-slate-50 rounded-xl border border-blue-100">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input type="checkbox" required className="mt-1 w-4 h-4 text-[#2366c9] rounded border-blue-200 focus:ring-[#2366c9]" />
                          <span className="text-[14px] text-black font-medium leading-relaxed">
                            I confirm that I am genuinely unable to pay the full course price and that I am applying for this scholarship in good faith.
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <Button type="button" className="w-full h-12 text-[14px] font-semibold bg-[#2366c9] hover:bg-blue-700 rounded-xl transition-colors shadow-sm text-white">
                    Check My Eligibility and Apply
                  </Button>

                  <p className="text-xs text-center text-slate-500 mt-4 font-medium">
                    System checks automatically. If approved, discount is applied to your basket instantly.
                  </p>
                </form>
              </div>
            </section>

            {/* SOCIAL IMPACT CALLOUT */}
            <div className="mb-16 bg-blue-50/50 rounded-3xl p-8 border border-blue-100 relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="bg-blue-100 p-4 rounded-2xl">
                  <Globe className="w-8 h-8 text-[#2366c9]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Part of EduMeUp's Social Impact Mission</h3>
                  <p className="text-[14px] text-slate-600 font-medium leading-relaxed">
                    The Global Access Scholarship is a core part of our mission to ensure that quality Cambridge-standard education is accessible to everyone, regardless of geography or financial background. Learn more about our vision and impact initiatives in the <a href="#scholarship" onClick={(e) => { e.preventDefault(); document.getElementById('scholarship')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-[#2366c9] hover:underline font-semibold">Scholarship section</a> above.
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION 9 | PRICING FAQ */}
            <section id="faq" className="scroll-mt-24">
              <h2 className="text-3xl font-semibold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-blue-100">
                <FAQItem
                  question="Can I buy a single chapter from a subject?"
                  answer="Yes. Chapter courses let you purchase any individual chapter from any of the 10 Cambridge O-Level subjects available on EduMeUp. You are not required to purchase the full subject course. Your free diagnostic will tell you which specific chapters you need — so you only pay for what is relevant to your gaps."
                />
                <FAQItem
                  question="What is the difference between a chapter course and a subject course?"
                  answer="A chapter course covers one specific topic chapter from a subject. A subject course covers the complete Cambridge O-Level syllabus for that subject — all chapters, in sequence, with the full 6-stage mastery cycle. Chapter courses are ideal if you have specific gap areas identified by your diagnostic. Subject courses are ideal for comprehensive, systematic O-Level preparation."
                />
                <FAQItem
                  question="Do the 2-year and 3-year prices mean I pay that amount every year?"
                  answer="No. The price shown for 2 years or 3 years is the total you pay once — not a yearly recurring charge. For example, $180 for 1 subject over 2 years means you pay $180 once and have access for 2 full years from the purchase date. This works out to $90 per year — 25% less than the 1-year price of $120."
                />
                <FAQItem
                  question="What happens if I want 3 subjects?"
                  answer="Choosing 3 subjects? Our 4-Subject Subscription Plan is the better option — and it gives you a 4th subject at no extra cost. At $25/month, the 4-subject plan costs less per subject than purchasing 3 subjects one-time, and gives you full flexibility to change your subject selection. See Section 5 above."
                />
                <FAQItem
                  question="Can I switch subjects on a subscription plan?"
                  answer="Yes. On the 4-Subject and All Subjects subscription plans, you can change your subject selection at any time from your dashboard. Your spaced retrieval history and progress are preserved for subjects you return to. For one-time subject course purchases (1 or 2 subjects), your subject selection is fixed at the time of purchase."
                />
                <FAQItem
                  question="What does the scholarship cover?"
                  answer="The EduMeUp Global Access Scholarship covers O-Level subject course pricing — chapter courses and 1, 2-year, or 3-year subject purchases. The 40% discount is applied to whichever access period you select. The scholarship does not apply to the Cambridge 360deg Hub consultancy plans or the Must-Have and English pathway courses."
                />
                <FAQItem
                  question="Are all prices in USD?"
                  answer="Yes — all EduMeUp prices are in USD only. We do not display prices in local currencies on the platform. If you need to check the equivalent cost in your local currency, we recommend using a current exchange rate calculator. Payments are processed securely through our payment provider in USD."
                />
                <FAQItem
                  question="What payment methods are accepted?"
                  answer="Payments are processed securely through our payment provider. Major credit and debit cards are accepted internationally. For specific payment method availability in your country, please refer to the checkout page at the time of purchase."
                />
                <FAQItem
                  question="Is there a free trial?"
                  answer="EduMeUp does not offer a free trial of paid courses, but the Free Diagnostic is always available at no cost and gives you a clear picture of which courses are relevant for you before any purchase. The Free Resource Zone also provides sample interactive lesson previews so you can experience the H5P content quality before buying."
                />
              </div>
            </section>
          </div>
        </div>

        {/* SECTION 10 | FINAL CTA */}
        <section id="final-cta" className="py-20 bg-[#0a192f] rounded-none relative overflow-hidden mt-16 mb-0">
          {/* Subtle background decoration */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#2366c9] blur-[120px]"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#4fb0ff] blur-[120px]"></div>
          </div>

          <div className="container-custom relative z-10 px-6">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6">
                Not Sure Where to Start? <span className="text-[#4fb0ff]">The Diagnostic Is Free.</span>
              </h2>
              <p className="text-lg text-slate-300 font-medium leading-relaxed">
                The free 30-minute diagnostic tells you exactly which subjects and chapters you need — so you buy only what is relevant and nothing you do not need.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
              {/* Primary Card - Blue */}
              <div className="bg-[#2366c9] rounded-none p-10 flex flex-col items-center text-center shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
                <div className="bg-white/10 p-4 rounded-2xl mb-6">
                  <Activity className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Take the Free Diagnostic First</h3>
                <p className="text-blue-100 font-semibold text-[15px] mb-4">Know your gaps. Buy only what you need.</p>
                <div className="flex items-center gap-2 text-[13px] font-bold text-blue-200 uppercase tracking-wider mb-8">
                  <span>Free</span>
                  <span className="w-1 h-1 rounded-full bg-blue-300"></span>
                  <span>30 minutes</span>
                  <span className="w-1 h-1 rounded-full bg-blue-300"></span>
                  <span>No login needed</span>
                </div>
                <InquiryDialog
                  defaultType="diagnostic"
                  title="Free Diagnostic"
                  trigger={
                    <Button className="w-full h-16 bg-white text-[#2366c9] hover:bg-blue-50 font-bold rounded-2xl text-lg shadow-xl uppercase tracking-widest transition-all">
                      Start Free Diagnostic
                    </Button>
                  }
                />
              </div>

              {/* Secondary Card - Light Blue Outline */}
              <div className="bg-transparent border-2 border-[#4fb0ff] rounded-none p-10 flex flex-col items-center text-center hover:bg-[#4fb0ff]/5 transition-all duration-300">
                <div className="bg-[#4fb0ff]/10 p-4 rounded-2xl mb-6">
                  <BookOpen className="w-10 h-10 text-[#4fb0ff]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Ready to Enrol? Browse Courses</h3>
                <p className="text-slate-300 font-semibold text-[15px] mb-4">See all available subjects, chapters, and programmes.</p>
                <div className="text-[13px] font-bold text-[#4fb0ff] uppercase tracking-wider mb-8">
                  All courses available now
                </div>
                <Link href="/courses" className="w-full mt-auto">
                  <Button variant="outline" className="w-full h-16 border-2 border-[#4fb0ff] bg-transparent text-[#4fb0ff] hover:bg-[#4fb0ff] hover:text-[#0a192f] font-bold rounded-2xl text-lg shadow-xl uppercase tracking-widest transition-all">
                    Browse Courses
                  </Button>
                </Link>
              </div>
            </div>

            {/* Trust Signals Strip */}
            <div className="pt-12 border-t border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-8">
                <div className="flex items-start gap-4">
                  <div className="bg-white/5 p-3 rounded-xl shrink-0">
                    <Award className="w-6 h-6 text-[#4fb0ff]" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-[15px]">80% Mastery Gate</p>
                    <p className="text-slate-400 text-[13px] mt-1 leading-relaxed">Master every concept before advancing. Proven retention architecture.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/5 p-3 rounded-xl shrink-0">
                    <Globe className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-[15px]">Available Worldwide</p>
                    <p className="text-slate-400 text-[13px] mt-1 leading-relaxed">Standardized Cambridge preparation for all regions. All prices in USD.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/5 p-3 rounded-xl shrink-0">
                    <Lock className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-white font-semibold text-[15px]">Secure & Fast</p>
                      <Zap className="w-4 h-4 text-blue-400" />
                    </div>
                    <p className="text-slate-400 text-[13px] mt-1 leading-relaxed">Secure payment processing. Instant access immediately after checkout.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/5 p-3 rounded-xl shrink-0">
                    <GraduationCap className="w-6 h-6 text-[#4fb0ff]" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-[15px]">Global Access Scholarship</p>
                    <p className="text-slate-400 text-[13px] mt-1 leading-relaxed">Financial aid available for qualifying developing countries. Apply in minutes.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 md:col-span-2">
                  <div className="bg-white/5 p-3 rounded-xl shrink-0">
                    <Activity className="w-6 h-6 text-[#4fb0ff]" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-[15px]">Free 30-Minute Diagnostic</p>
                    <p className="text-slate-400 text-[13px] mt-1 leading-relaxed">
                      Always available. <InquiryDialog defaultType="diagnostic" title="Free Diagnostic" trigger={<span className="text-[#4fb0ff] hover:underline cursor-pointer">Start Your Free Diagnostic Now</span>} />. Identify exactly what you need before buying.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}