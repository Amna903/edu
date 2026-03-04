import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight, Calculator, Info, Zap, Trophy, BookOpen, Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { InquiryDialog } from "@/components/InquiryDialog";
import { Link } from "wouter";

const PricingCard = ({ title, price, period = "/year", description, features, badge, isPopular, ctaText = "Enroll Now" }: any) => (
  <Card className={`h-full flex flex-col border-2 ${isPopular ? "border-blue-600 shadow-xl scale-105 z-10" : "border-slate-100 shadow-lg"}`}>
    {isPopular && <div className="bg-blue-600 text-white text-center py-1.5 text-xs font-bold uppercase tracking-widest">Most Popular</div>}
    <CardHeader className="p-8 pb-4">
      {badge && <Badge className="w-fit mb-4 bg-blue-100 text-blue-900">{badge}</Badge>}
      <CardTitle className="text-2xl font-bold">{title}</CardTitle>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-4xl font-black">{price}</span>
        <span className="text-sm font-medium text-slate-500">{period}</span>
      </div>
      <p className="mt-4 text-slate-600 text-sm leading-relaxed">{description}</p>
    </CardHeader>
    <CardContent className="p-8 pt-0 flex-grow">
      <ul className="space-y-4 mt-6">
        {features.map((feat: string, i: number) => (
          <li key={i} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
            <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
            <span>{feat}</span>
          </li>
        ))}
      </ul>
    </CardContent>
    <CardFooter className="p-8 pt-0">
      <Button className={`w-full h-12 text-sm font-bold rounded-xl ${isPopular ? "bg-blue-600" : "bg-slate-900"}`}>{ctaText}</Button>
    </CardFooter>
  </Card>
);

const SavingsCalculator = () => {
  const [subjects, setSubjects] = useState(4);
  const traditionalCost = subjects * 750;
  const eduMeUpCost = subjects === 1 ? 55 : (subjects <= 4 ? 130 : 230);
  const savings = traditionalCost - eduMeUpCost;

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-blue-50 overflow-hidden text-slate-900 grid lg:grid-cols-2">
      <div className="p-8 md:p-12 bg-slate-50">
        <h3 className="text-2xl font-bold mb-8 flex items-center gap-3"><Calculator className="text-blue-600" /> Personalize Your Plan</h3>
        <div className="space-y-10">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-6 uppercase tracking-wider">Number of Subjects: <span className="text-blue-600 text-xl ml-2">{subjects}</span></label>
            <div className="flex items-center gap-6">
              <Button variant="outline" size="icon" onClick={() => setSubjects(Math.max(1, subjects - 1))}><Minus /></Button>
              <input type="range" min="1" max="10" value={subjects} onChange={(e) => setSubjects(parseInt(e.target.value))} className="flex-1 h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              <Button variant="outline" size="icon" onClick={() => setSubjects(Math.min(10, subjects + 1))}><Plus /></Button>
            </div>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-blue-100 shadow-sm flex items-start gap-4">
            <Info className="h-5 w-5 text-blue-600 shrink-0 mt-1" />
            <p className="text-sm text-slate-600 italic">Traditional tutoring estimate: <span className="font-bold">$750</span> per subject/year based on local market averages.</p>
          </div>
        </div>
      </div>
      <div className="p-8 md:p-12 flex flex-col justify-center items-center text-center">
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-4">Estimated Annual Savings</p>
        <div className="text-7xl font-black text-blue-900 mb-4">${savings}</div>
        <div className="space-y-3 w-full max-w-xs">
          <div className="flex justify-between text-sm py-2 border-b border-slate-100"><span className="text-slate-500">Traditional Cost</span><span className="font-bold line-through text-red-500">${traditionalCost}</span></div>
          <div className="flex justify-between text-sm py-2"><span className="text-slate-500">EduMeUp Cost</span><span className="font-bold text-green-600">${eduMeUpCost}</span></div>
        </div>
        <Button className="mt-10 w-full h-14 text-lg font-bold bg-blue-600 shadow-xl rounded-2xl text-white">Secure This Pricing</Button>
      </div>
    </div>
  );
};

export default function Pricing() {
  return (
    <Layout>
      <section className="py-20 bg-gradient-to-b from-blue-50/50 to-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-extrabold mb-6">Simple, Transparent Pricing</h1>
          <p className="text-2xl text-blue-600 font-bold mb-4">Structured Support. Affordable Access.</p>
          <p className="text-lg text-slate-600 mb-10">No hidden fees. Flexible plans. 30-day money-back guarantee. Education should be accessible — not exclusive.</p>
          <div className="flex justify-center gap-6">
            <Link href="/programs"><Button size="lg" className="bg-slate-900 h-14 px-10 rounded-2xl font-bold">Browse Programs</Button></Link>
            <InquiryDialog defaultType="diagnostic" title="Free Diagnostic" trigger={<Button size="lg" variant="outline" className="border-2 border-slate-900 h-14 px-10 rounded-2xl font-bold">Take Free Diagnostic</Button>} />
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <PricingCard title="Complete O-Level" price="$55" period="/subject/yr" badge="Self-Paced" description="Best for independent students who want structured preparation." features={["Complete Syllabus", "Interactive H5P", "Past Paper integration", "Spaced Review", "Parent Dashboard"]} />
          <PricingCard title="Pre-O-Level Victory" price="$360" period="/year" badge="Teacher-Led" isPopular={true} description="Best for Grade 7–8 students preparing early." features={["Guided Live Sessions", "Bridge Courses Included", "Platform Access", "Diagnostic Support", "Parent reporting"]} />
          <PricingCard title="Foundation Bridge" price="$50-$80" period="/course" badge="Repair Gaps" description="For students with foundational gaps." features={["Diagnostic pre-test", "Gap repair modules", "Interactive practice", "Readiness assessment", "5-course bundle ($250)"]} />
        </div>
      </section>

      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Estimate Your Savings</h2>
            <p className="text-blue-300 text-lg">Compare your current spending with the EduMeUp model.</p>
          </div>
          <SavingsCalculator />
        </div>
      </section>
    </Layout>
  );
}
