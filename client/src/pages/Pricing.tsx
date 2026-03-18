import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight, Calculator, Info, Minus, Plus, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { InquiryDialog } from "@/components/InquiryDialog";
import { Link } from "wouter";

type PricingCardProps = {
  title: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  badge?: string;
  note?: string;
  isPopular?: boolean;
  ctaText?: string;
};

const PricingCard = ({
  title,
  price,
  period = "/year",
  description,
  features,
  badge,
  note,
  isPopular,
  ctaText = "Enroll Now",
}: PricingCardProps) => (
  <Card className={`h-full flex flex-col border-2 ${isPopular ? "border-[#2366c9] shadow-xl md:scale-105 z-10" : "border-blue-100 shadow-lg"}`}>
    {isPopular && <div className="bg-[#2366c9] text-white text-center py-1.5 text-xs font-semibold uppercase tracking-widest">Most Popular</div>}
    <CardHeader className="p-8 pb-4">
      {badge && <Badge className="w-fit mb-4 bg-blue-100 text-[#1e1b4b]">{badge}</Badge>}
      <CardTitle className="text-2xl font-semibold text-[#1e1b4b]">{title}</CardTitle>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-4xl font-medium text-[#1e1b4b]">{price}</span>
        <span className="text-[14px] font-normal text-black">{period}</span>
      </div>
      <p className="mt-4 text-black text-[14px] leading-relaxed font-medium">{description}</p>
    </CardHeader>
    <CardContent className="p-8 pt-0 flex-grow">
      <ul className="space-y-4 mt-6">
        {features.map((feat: string, i: number) => (
          <li key={i} className="flex items-start gap-3 text-[14px] text-slate-700 font-medium">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <span>{feat}</span>
          </li>
        ))}
      </ul>
      {note && <p className="mt-6 text-xs text-black font-semibold">{note}</p>}
    </CardContent>
    <CardFooter className="p-8 pt-0">
      <Button className={`w-full h-12 text-[14px] font-semibold rounded-xl ${isPopular ? "bg-[#2366c9]" : "bg-[#1e1b4b]"}`}>{ctaText}</Button>
    </CardFooter>
  </Card>
);

const CostPerspectiveCalculator = () => {
  const [subjects, setSubjects] = useState(4);
  const traditionalCost = subjects * 750;
  const eduMeUpCost = subjects === 1 ? 55 : (subjects <= 4 ? 130 : 230);
  const savings = traditionalCost - eduMeUpCost;

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden text-slate-900 grid lg:grid-cols-2">
      <div className="p-8 md:p-12 bg-slate-50">
        <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3 text-[#1e1b4b]"><Calculator className="text-[#2366c9]" /> Cost Perspective</h3>
        <div className="space-y-10">
          <div>
            <label className="block text-[14px] font-semibold text-slate-700 mb-6 uppercase tracking-wider">Number of Subjects: <span className="text-[#2366c9] text-xl ml-2">{subjects}</span></label>
            <div className="flex items-center gap-6">
              <Button variant="outline" size="icon" onClick={() => setSubjects(Math.max(1, subjects - 1))}><Minus /></Button>
              <input type="range" min="1" max="10" value={subjects} onChange={(e) => setSubjects(parseInt(e.target.value))} title="Select number of subjects" className="flex-1 h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-[#2366c9]" />
              <Button variant="outline" size="icon" onClick={() => setSubjects(Math.min(10, subjects + 1))}><Plus /></Button>
            </div>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-blue-100 shadow-sm flex items-start gap-4">
            <Info className="h-5 w-5 text-[#2366c9] shrink-0 mt-1" />
            <p className="text-[14px] text-black italic">Traditional tutoring estimate: <span className="font-semibold">$750</span> per subject/year based on local market averages.</p>
          </div>
        </div>
      </div>
      <div className="p-8 md:p-12 flex flex-col justify-center items-center text-center bg-gradient-to-b from-emerald-50/40 via-white to-white border-t lg:border-t-0 lg:border-l border-emerald-100/60">
        <p className="text-black font-semibold uppercase tracking-widest text-xs mb-4">Estimated Annual Savings</p>
        <div className="text-6xl md:text-7xl font-medium text-[#1e1b4b] mb-4">${savings}</div>
        <div className="space-y-3 w-full max-w-xs">
          <div className="flex justify-between text-[14px] py-2 border-b border-slate-100"><span className="text-black">Traditional Cost</span><span className="font-medium line-through text-rose-400">${traditionalCost}</span></div>
          <div className="flex justify-between text-[14px] py-2"><span className="text-black">EduMeUp Cost</span><span className="font-medium text-emerald-400">${eduMeUpCost}</span></div>
        </div>
        <Button className="mt-10 w-full h-14 text-lg font-semibold bg-[#2366c9] shadow-xl rounded-2xl text-white">Secure This Pricing</Button>
      </div>
    </div>
  );
};

const supportTypeBaseline: Record<string, number> = {
  tutor: 900,
  academy: 650,
  free: 120,
};

const estimateEduMeUpCost = (program: string, subjects: number, years: number) => {
  if (program === "complete") {
    const annual = subjects === 1 ? 55 : subjects <= 4 ? 130 : 230;
    return annual * years;
  }
  if (program === "victory") {
    return 360 * years;
  }
  return Math.round(subjects * 65 * years);
};

const ROICalculator = () => {
  const [supportType, setSupportType] = useState("tutor");
  const [subjects, setSubjects] = useState(4);
  const [years, setYears] = useState(2);
  const [program, setProgram] = useState("complete");

  const { currentCost, eduCost, difference } = useMemo(() => {
    const current = supportTypeBaseline[supportType] * subjects * years;
    const edu = estimateEduMeUpCost(program, subjects, years);
    return {
      currentCost: current,
      eduCost: edu,
      difference: current - edu,
    };
  }, [supportType, subjects, years, program]);

  return (
    <Card className="border-[#2366c9]  border-2 border-blue-100 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl text-[#1e1b4b]">Estimate Your Savings</CardTitle>
        <p className="text-[14px] text-black font-medium">
          Results are estimates based on mid-range pricing assumptions. Educational outcomes depend on student participation and consistency.
        </p>
      </CardHeader>
      <CardContent className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-black mb-2">Current Support Type</label>
            <select value={supportType} onChange={(e) => setSupportType(e.target.value)} title="Select current support type" aria-label="Select current support type" className="w-full border border-blue-100 rounded-xl h-11 px-3 text-[14px] font-semibold text-slate-700">
              <option value="tutor">Private Tutors</option>
              <option value="academy">Evening Academies</option>
              <option value="free">Mostly Free Platforms</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-black mb-2">Subjects</label>
            <input type="range" min="1" max="10" value={subjects} onChange={(e) => setSubjects(parseInt(e.target.value))} title="Select number of subjects" className="w-full accent-[#2366c9]" />
            <p className="text-[14px] font-semibold text-[#2366c9] mt-2">{subjects} subjects</p>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-black mb-2">Time Horizon</label>
            <select value={years} onChange={(e) => setYears(parseInt(e.target.value))} title="Select time horizon" aria-label="Select time horizon" className="w-full border border-blue-100 rounded-xl h-11 px-3 text-[14px] font-semibold text-slate-700">
              <option value={1}>1 year</option>
              <option value={2}>2 years</option>
              <option value={3}>3 years</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-black mb-2">Desired EduMeUp Program</label>
            <select value={program} onChange={(e) => setProgram(e.target.value)} title="Select desired EduMeUp program" aria-label="Select desired EduMeUp program" className="w-full border border-blue-100 rounded-xl h-11 px-3 text-[14px] font-semibold text-slate-700">
              <option value="complete">Complete O-Level Subjects</option>
              <option value="victory">Pre-O-Level Victory</option>
              <option value="bridge">IGCSE / O-Level Bridge Programs</option>
            </select>
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-6 border border-blue-100 flex flex-col justify-center">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[14px] text-black">Estimated current cost</span>
              <span className="text-lg font-semibold text-[#1e1b4b]">${currentCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[14px] text-black">Estimated EduMeUp cost</span>
              <span className="text-lg font-medium text-emerald-400">${eduCost.toLocaleString()}</span>
            </div>
            <div className="border-t border-blue-100 pt-3 flex justify-between items-center">
              <span className="text-[14px] font-semibold text-slate-700">Approximate difference</span>
              <span className="text-2xl font-semibold text-[#2366c9]">${difference.toLocaleString()}</span>
            </div>
          </div>
          <p className="mt-5 text-xs text-black font-medium">Savings vary depending on family situation and chosen support mix.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default function Pricing() {
  return (
    <Layout>
      <section className="pt-28 pb-24 bg-[#1e1b4b] text-white relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.2)_0%,transparent_60%)]" />
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative z-10">
            <h1 className="text-5xl md:text-6xl text-white font-extrabold mb-6">Simple, Transparent Pricing</h1>
            <p className="text-2xl text-blue-300 font-semibold mb-4">Structured Support. Affordable Access.</p>
            <p className="text-lg text-blue-100 mb-10 max-w-3xl mx-auto">No hidden fees. Flexible plans. 30-day money-back guarantee. Education should be accessible — not exclusive.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/programs"><Button size="lg" className="bg-[#2366c9] hover:bg-[#1d57ac] h-14 px-10 rounded-2xl font-semibold text-white">Browse Programs <ArrowRight className="h-4 w-4 ml-2" /></Button></Link>
              <InquiryDialog defaultType="diagnostic" title="Free Diagnostic" trigger={<Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#1e1b4b] h-14 px-10 rounded-2xl font-semibold">Take Free Diagnostic</Button>} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold text-[#1e1b4b] mb-6">Why Our Prices Are Lower Than Traditional Tutoring</h2>
          <p className="text-lg text-black font-medium leading-relaxed">
            Private tutoring for O-Level students often costs between <span className="font-semibold text-[#1e1b4b]">$2,000–$6,000 per year</span>.
            For many families, that is unsustainable over 2–3 years. EduMeUp was designed differently.
          </p>
          <p className="text-lg text-black font-medium leading-relaxed mt-4">
            Instead of paying per tutor hour, families subscribe to a structured learning system.
          </p>
        </div>
        <div className="max-w-6xl mx-auto px-6 mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "Full syllabus coverage",
            "Interactive practice",
            "Automated spaced review",
            "AI-assisted diagnostics",
            "Parent progress visibility",
            "Optional certified tutor support",
          ].map((item) => (
            <div key={item} className="p-5 rounded-2xl border border-blue-100 bg-blue-50/50 text-[14px] font-semibold text-[#1e1b4b] flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-[#2366c9]" />
              {item}
            </div>
          ))}
        </div>
        <p className="max-w-5xl mx-auto px-6 mt-8 text-center text-black font-medium leading-relaxed">
          Because technology scales efficiently, we can offer structured preparation at a fraction of typical tutoring costs. Our goal is not to replace teachers. Our goal is to make structured learning affordable and systematic.
        </p>
      </section>

      <section className="py-20 bg-blue-50/60">
        <div className="max-w-6xl mx-auto px-6 text-center mb-12">
          <h2 className="text-4xl font-semibold text-[#1e1b4b] mb-3">Core Programs</h2>
          <p className="text-black font-semibold">Clear plans. Clear outcomes. Clear guarantees.</p>
        </div>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <PricingCard title="Complete O-Level Subjects" price="$55" period="/subject/year" badge="Self-Paced" description="Best for current O-Level students who want structured, independent preparation." features={["Complete syllabus coverage", "Interactive H5P practice", "Past paper integration (10+ years)", "Automated spaced review system", "AI diagnostic feedback", "Parent dashboard access", "Mock exams"]} note="4 subjects package: $130/year · 8 subjects package: $230/year · 30-Day Money-Back Guarantee." />
          <PricingCard title="Pre-O-Level Victory" price="$360" period="/year" badge="Teacher-Led + Platform" isPopular={true} description="Best for Grade 7–8 students preparing early." features={["Structured 12-month program", "Guided live sessions", "IGCSE / O-Level Bridge Programs included", "Platform access", "Diagnostic & remedial support", "Parent reporting", "Mock assessments"]} note="Installment options available. Performance guarantee applies to students who complete assigned coursework and assessments." />
          <PricingCard title="IGCSE / O-Level Bridge Programs" price="$50–$80" period="/course" badge="Repair Gaps" description="For students with foundational gaps." features={["Diagnostic pre-test", "Gap repair modules", "Interactive practice", "Readiness assessment", "Complete 5-course package: $250"]} />
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-8">
          <Card className="border-[#2366c9]  border-2 border-blue-100">
            <CardHeader>
              <CardTitle className="text-2xl text-[#1e1b4b]">What&apos;s Included (All Programs)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                "Structured syllabus mapping",
                "Spaced retrieval scheduling",
                "Interactive activities (1000+)",
                "Past paper analysis",
                "Performance tracking dashboard",
                "Parent access (no extra fee)",
                "Continuous platform updates",
                "AI support assistant",
              ].map((item) => (
                <p key={item} className="text-[14px] text-slate-700 font-semibold flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#2366c9] mt-0.5" />
                  {item}
                </p>
              ))}
              <p className="text-[14px] font-semibold text-[#1e1b4b] pt-2">No hidden platform charges.</p>
            </CardContent>
          </Card>

          <Card className="border-[#2366c9]  border-2 border-blue-100">
            <CardHeader>
              <CardTitle className="text-2xl text-[#1e1b4b]">Payment Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: "Annual (Best Value)", desc: "Pay once. Lowest total cost." },
                { title: "Quarterly", desc: "Annual price + 10%." },
                { title: "Monthly", desc: "Annual price + 15%. Cancel anytime." },
                { title: "Installments (Selected Programs)", desc: "Available for flagship teacher-led programs." },
              ].map((option) => (
                <div key={option.title} className="p-4 rounded-xl bg-blue-50/60 border border-blue-100">
                  <h4 className=" text-[#1e1b4b]">{option.title}</h4>
                  <p className="text-[14px] text-black font-medium">{option.desc}</p>
                </div>
              ))}
              <div className="pt-2">
                <h4 className=" text-[#1e1b4b] mb-2">Optional add-ons</h4>
                <ul className="space-y-2 text-[14px] text-black font-medium">
                  <li>• Certified tutors (online or in-home, region dependent)</li>
                  <li>• Printed workbooks</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 bg-blue-50/60">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-semibold text-[#1e1b4b] mb-3">How We Compare (Calm & Balanced)</h2>
            <p className="text-black font-semibold">Education support comes in many forms. Each has strengths.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: "Private Tutors",
                pros: ["Direct human interaction", "Personal attention"],
                considerations: ["Can be expensive over multiple subjects", "Quality varies by tutor", "Scheduling constraints"],
              },
              {
                title: "Evening Academies",
                pros: ["Structured environment", "Peer interaction"],
                considerations: ["Fixed schedules", "Larger class sizes", "Travel time"],
              },
              {
                title: "Free Platforms",
                pros: ["Free access", "Broad concept coverage"],
                considerations: ["Not exam-specific", "Limited personalization", "No structured retrieval scheduling"],
              },
              {
                title: "EduMeUp",
                pros: ["Curriculum-aligned", "Built-in spaced review", "Progress analytics", "Parent involvement tools", "Lower overall cost structure"],
                considerations: [],
              },
            ].map((block) => (
              <Card key={block.title} className="border-blue-100 h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-[#1e1b4b]">{block.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-[14px]">
                  <div>
                    <p className="font-semibold text-[#2366c9] mb-2">Pros</p>
                    <ul className="space-y-1 text-slate-700 font-medium">
                      {block.pros.map((line) => <li key={line}>• {line}</li>)}
                    </ul>
                  </div>
                  {block.considerations.length > 0 && (
                    <div>
                      <p className="font-semibold text-[#1e1b4b] mb-2">Considerations</p>
                      <ul className="space-y-1 text-black font-medium">
                        {block.considerations.map((line) => <li key={line}>• {line}</li>)}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="mt-8 text-[14px] text-black font-medium text-center max-w-4xl mx-auto">
            Internal cohort data (multi-year sample, 600+ students) shows strong improvement trends when students consistently complete assigned work. Individual results vary based on effort and engagement.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-semibold text-[#1e1b4b] mb-3">How EduMeUp Differs from Traditional Support Models</h2>
            <p className="text-black font-semibold">Clear Structural Differences</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-blue-100 shadow-sm">
            <table className="w-full text-[14px]">
              <thead>
                <tr className="bg-[#1e1b4b] text-white">
                  <th className="text-left p-4 font-semibold">Traditional Tutoring Model</th>
                  <th className="text-left p-4 font-semibold">EduMeUp Structured Platform</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Hourly-based instruction", "Structured curriculum system"],
                  ["Progress depends heavily on individual tutor style", "Standardized, research-informed methodology"],
                  ["Fixed schedules", "24/7 flexible access"],
                  ["Manual homework checking", "Automated feedback + analytics dashboard"],
                  ["Limited revision tracking", "Built-in spaced review scheduling"],
                  ["Parent visibility varies", "Real-time parent dashboard access"],
                  ["Cost increases with each subject added", "Bundled subject pricing reduces per-subject cost"],
                  ["Learning often ends when session ends", "Continuous access to full syllabus & practice bank"],
                  ["Quality varies by tutor", "Platform consistency across all students"],
                ].map((row, index) => (
                  <tr key={row[0]} className={index % 2 ? "bg-blue-50/40" : "bg-white"}>
                    <td className="p-4 text-slate-700  border-t border-blue-100">{row[0]}</td>
                    <td className="p-4 text-[#1e1b4b]  border-t border-blue-100">{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-white font-black mb-4">Cost Perspective</h2>
            <p className="text-blue-300 text-lg">A student taking 4 subjects: Typical mid-range tutoring ≈ $3,000–$5,000/year vs EduMeUp 4-subject package: $130/year.</p>
            <p className="text-[14px] text-blue-100 mt-4 max-w-3xl mx-auto">Even when combined with optional tutor support, total cost is typically significantly lower than traditional multi-subject tutoring models. Savings vary depending on family situation.</p>
          </div>
          <CostPerspectiveCalculator />
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <ROICalculator />
        </div>
      </section>

      <section className="py-20 bg-blue-50/60">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          <Card className="border-[#2366c9]  border-2 border-blue-100">
            <CardHeader>
              <CardTitle className="text-2xl text-[#1e1b4b] flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-[#2366c9]" /> Guarantee & Refund Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-[14px] text-slate-700 font-medium">
              <p><span className="font-semibold text-[#1e1b4b]">30-Day Money-Back Guarantee:</span> If you&apos;re not satisfied within the first 30 days, request refund via email. Full refund processed within 5–7 business days.</p>
              <p><span className="font-semibold text-[#1e1b4b]">Performance Support Guarantee (Selected Programs):</span> If a student completes ≥80% of assigned coursework and assessments and does not reach agreed benchmark levels, additional remediation support is provided at no extra cost. Clear compliance terms apply.</p>
              <p className="font-semibold text-[#1e1b4b]">We stand behind structured effort.</p>
            </CardContent>
          </Card>

          <Card className="border-[#2366c9]  border-2 border-blue-100">
            <CardHeader>
              <CardTitle className="text-2xl text-[#1e1b4b]">Pricing FAQ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-[14px]">
              {[
                ["Are there hidden fees?", "No. Platform features listed are included in subscription."],
                ["Can I cancel anytime?", "Monthly plans: yes. Annual plans: pro-rated refund policy applies."],
                ["Is parent access really free?", "Yes. Parent dashboard access is included."],
                ["Do results vary?", "Yes. Outcomes depend on student effort, consistency, and engagement."],
                ["Do you offer financial assistance?", "Case-by-case support and sibling discounts available."],
              ].map(([question, answer]) => (
                <div key={question} className="p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                  <p className="font-semibold text-[#1e1b4b]">{question}</p>
                  <p className="text-black font-medium mt-1">{answer}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 bg-[#1e1b4b] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.25)_0%,transparent_60%)]" />
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl text-white font-black mb-6">Ready to Start?</h2>
          <p className="text-blue-200 text-lg mb-8">30-Day Risk-Free Guarantee. Transparent pricing. Structured system. Sustainable cost.</p>

          <div className="grid md:grid-cols-3 gap-4 mb-10 text-left">
            <div className="p-5 rounded-2xl border border-white/20 bg-white/5">
              <p className="font-semibold text-blue-300"> Enroll Now</p>
              <p className="text-[14px] text-blue-100 mt-1">Start with the plan that fits your level and goals.</p>
            </div>
            <div className="p-5 rounded-2xl border border-white/20 bg-white/5">
              <p className="font-semibold text-blue-300"> Take Free Diagnostic</p>
              <p className="text-[14px] text-blue-100 mt-1">Identify exact gaps before spending on support.</p>
            </div>
            <div className="p-5 rounded-2xl border border-white/20 bg-white/5">
              <p className="font-semibold text-blue-300"> Schedule Consultation</p>
              <p className="text-[14px] text-blue-100 mt-1">Get clear guidance on program and payment structure.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/programs"><Button size="lg" className="bg-[#2366c9] hover:bg-[#1d57ac] h-14 px-10 rounded-2xl font-semibold text-white">Browse Programs <ArrowRight className="h-4 w-4 ml-2" /></Button></Link>
            <InquiryDialog defaultType="consultation" title="Schedule Consultation" trigger={<Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#1e1b4b] h-14 px-10 rounded-2xl font-semibold">Schedule Consultation</Button>} />
          </div>
        </div>
      </section>
    </Layout>
  );
}
