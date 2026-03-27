import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  CheckCircle2,
  Brain,
  Target,
  RefreshCw,
  FlaskConical,
  BookOpen,
  ShieldCheck,
  AlertTriangle,
  BarChart3,
  Library,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { InquiryDialog } from "@/components/InquiryDialog";
import { Link } from "wouter";

export default function ForStudents() {
  const notWorkingVsEdu = [
    ["Reading and re-reading (passive)", "Interactive activities that require thinking"],
    ["Memorizing solved examples", "Understanding principles that solve any question"],
    ["Cramming before exams", "Spaced retrieval that builds durable memory"],
    ["Depending on tutors", "Structured independence-building"],
    ["Hoping you are ready", "Data showing exactly where you stand"],
  ];

  const struggles = [
    {
      icon: Brain,
      title: "I study for hours but still don't understand",
      quote: "I read the textbook three times. I highlight everything. But in the exam my mind goes blank.",
      why: "Passive methods like highlighting and copying create the feeling of learning without deep understanding. Your brain processes words, but does not build durable retrieval pathways.",
      solution: [
        "Interactive H5P activities require active responses before progress",
        "Built-in active recall for memory retrieval, not recognition",
        "Immediate feedback explains why an answer is wrong",
      ],
      result: "Understanding replaces memorization, and concepts start sticking permanently.",
      cta: "Try a Sample H5P Activity in the Free Library â†’",
    },
    {
      icon: Target,
      title: "I can't solve unseen questions",
      quote: "If the question changes context, I panic even if I studied that chapter.",
      why: "Cambridge O-Level rewards application (AO2/AO3), not memorization of one familiar pattern. Copying examples trains recognition, not transfer.",
      solution: [
        "Principle-first teaching focused on the why behind each method",
        "45,000+ varied practice questions across different contexts",
        "Problem-solving framework: identify question type â†’ select method â†’ execute confidently",
      ],
      result: "Unseen questions become recognizable challenges, not panic moments.",
      cta: "See a Sample Problem-Solving Framework in the Free Library â†’",
    },
    {
      icon: RefreshCw,
      title: "I forget everything after a few days",
      quote: "I studied Chapter 1 in September. By November, it feels completely gone.",
      why: "Without systematic review, memory fades quickly and students end up relearning from scratch. Traditional instruction teaches once and moves on before retention stabilizes.",
      solution: [
        "Automated spaced retrieval sequence (Day 1 â†’ Day 3 â†’ Day 7 â†’ Week 2 â†’ Month 1 â†’ Month 3)",
        "10-minute targeted reviews instead of full chapter restudy",
        "Performance-based interval adjustment",
      ],
      result: "What you learn early is still available when exams arrive.",
      cta: "Explore Sample Spaced Retrieval Activities in the Free Library â†’",
    },
    {
      icon: FlaskConical,
      title: "ATP feels impossible",
      quote: "School says: practice ATP past papers. But nobody taught me what to write for full marks.",
      why: "ATP skills are rarely taught explicitly despite carrying significant exam weight. Students are expected to infer variable control, method validity, and conclusions without structured instruction.",
      solution: [
        "Structured ATP courses for Physics, Chemistry, and Biology with variable identification and control design",
        "Past paper analysis (2010â€“2025) with mark-scheme interpretation and model conclusions",
        "Practice activities simulating ATP reasoning",
      ],
      result: "ATP shifts from guesswork to a trainable scoring skill (students often move from partial marks to near-full marks like 35â€“38/40).",
      cta: "Try a Free ATP Sample Lesson in the Free Library â†’",
    },
    {
      icon: BookOpen,
      title: "English Paper 1 and 2 feel subjective",
      quote: "Teachers say my essay is not structured well, but no one explains what structure actually means.",
      why: "Many students are told what is wrong, but not taught a reproducible structure. Without repeatable frameworks, improvement feels random.",
      solution: [
        "Paper 1: 7-step summary method (overview â†’ detail â†’ key points â†’ paraphrase â†’ count â†’ coverage â†’ polish)",
        "Paper 2: explicit frameworks (Descriptive: Show-Don't-Tell + 5 Senses, Narrative: 5-Act structure, Argumentative: thesis + evidence + counterargument)",
        "50+ passages and 100+ prompts with modeled applications",
      ],
      result: "English becomes structured and trainable, not mysterious.",
      cta: "See a Sample Essay Framework in the Free Library â†’",
    },
    {
      icon: ShieldCheck,
      title: "I am dependent on my tutor",
      quote: "When my tutor explains, I get it. Alone, I get stuck in five minutes.",
      why: "Students can understand with guidance but struggle to build independent problem-solving habits. Support often gives answers too early instead of building thinking stamina.",
      solution: [
        "4-level independence scaffold from guided to mastery",
        "Hint-first support before full solutions",
        "AI chatbot nudges thinking instead of spoon-feeding",
      ],
      result: "Confidence grows from capability, not dependency.",
      cta: "Try a Sample Independent Practice Activity in the Free Library â†’",
    },
    {
      icon: BarChart3,
      title: "I don't know if I am exam-ready",
      quote: "I studied so muchâ€¦ but am I actually ready, or just hoping?",
      why: "Generic feedback creates uncertainty near exam time. Students need topic-level evidence, not vague reassurance.",
      solution: [
        "Topic-by-topic mastery tracking (for example: Maths 78%, Chemistry 65%, English 88%)",
        "Predicted performance insights tied to weak-topic priorities",
        "Timed mock exams and color-coded readiness alerts (red <60, yellow 60â€“75, green 80+)",
      ],
      result: "You know exactly where you stand, backed by data.",
      cta: "Take the Free Diagnostic â†’",
    },
  ];

  const skills = [
    {
      title: "Active Recall",
      why: "Retrieving from memory outperforms passive re-reading.",
      how: "Every H5P sequence forces retrieval before progression.",
    },
    {
      title: "Spaced Practice",
      why: "Expanding review intervals increase long-term retention.",
      how: "Platform automates review timing so revision is systematic.",
    },
    {
      title: "Metacognition",
      why: "Students often overestimate understanding until tested.",
      how: "Mastery gates and diagnostics replace false confidence with data.",
    },
    {
      title: "Problem Decomposition",
      why: "Complex questions feel easier when broken into steps.",
      how: "Worked examples model knowns â†’ unknowns â†’ method â†’ solve â†’ check.",
    },
    {
      title: "Self-Regulated Learning",
      why: "Progress accelerates when students set goals and monitor strategy.",
      how: "Dashboard prompts, weak-topic alerts, and weekly planning support this cycle.",
    },
    {
      title: "Growth Mindset",
      why: "Performance improves when mistakes are treated as feedback.",
      how: "Language and feedback focus on â€œnot yetâ€ and targeted next actions.",
    },
    {
      title: "Time Management",
      why: "Not all topics have equal score impact.",
      how: "Priority guidance pushes effort toward high-weight, low-mastery topics first.",
    },
  ];

  const pathways = [
    {
      title: "Pathway 1 — Struggling Student",
      profile: "D/E/F grades, weak fundamentals, exams in 3â€“4 months",
      route: [
        "Week 1: Diagnostic identifies exact gaps by topic and sub-skill",
        "Weeks 2â€“4: Foundation repair before heavy O-Level load",
        "Weeks 5â€“10: High-yield topic mastery using frequent exam patterns",
        "Weeks 11â€“14: Timed past papers with feedback loops",
        "Final 2 weeks: Consolidation via spaced retrieval + mock confidence build",
      ],
      expected: "Expected trajectory: D/E â†’ C/B with consistent effort",
    },
    {
      title: "Pathway 2 — Average Student",
      profile: "C/B range, wants consistent A/A* performance",
      route: [
        "Gap analysis pinpoints score-leak topics, not vague subject weakness",
        "~60% effort on weakest high-return topics first",
        "Moderate topics moved to strong with advanced mixed practice",
        "Strong topics maintained via short spaced retrieval loops",
        "Exam technique optimization: timing and mark maximization",
      ],
      expected: "Expected trajectory: C/B â†’ A/A* within 4â€“6 months",
    },
    {
      title: "Pathway 3 — Top Student",
      profile: "Already at A, targeting A* and scholarship readiness",
      route: [
        "Precision audit of final 10â€“15% score leakage",
        "Hardest past-paper sets (2015â€“2025) only",
        "Error-elimination checklists and mark-maximization technique",
        "ATP refinement targeting 38â€“40/40 range where possible",
        "Deeper theory transfer for scholarship-level confidence",
      ],
      expected: "Expected trajectory: A â†’ A* in target subjects",
    },
    {
      title: "Pathway 4 — Last-Minute Student",
      profile: "Exams in 6â€“8 weeks, needs maximum impact quickly",
      route: [
        "Emergency triage: safe vs at-risk vs opportunity subjects",
        "~80% effort on at-risk subjects first",
        "Opportunity subjects receive targeted grade-jump blocks",
        "Safe subjects kept on minimum maintenance schedule",
        "Final week: no new content, only consolidation and exam execution",
      ],
      expected: "Expected trajectory: 1â€“2 grade jumps in at-risk subjects",
    },
  ];

  const transformationTimeline = [
    {
      phase: "Month 1",
      title: "Foundation and Mindset Shift",
      feel: "Week 1â€“2 feels unfamiliar. Week 3â€“4: first â€œthis is actually clickingâ€ moments.",
      measurable: "Typical progression: 0% â†’ 25â€“35% mastery",
    },
    {
      phase: "Month 2",
      title: "Momentum Building",
      feel: "Active recall becomes natural. Dependence on external help starts dropping.",
      measurable: "Typical progression: 35% â†’ 55â€“65% mastery; study time reduces while scores rise",
    },
    {
      phase: "Month 3",
      title: "Acceleration",
      feel: "Confidence becomes earned, not borrowed. Students start aiming higher.",
      measurable: "Typical progression: 65% â†’ 75â€“80% mastery; mock scores often reach 70â€“75%",
    },
    {
      phase: "Months 4â€“6",
      title: "Refinement and Excellence",
      feel: "Exam-readiness feels stable because preparation is systematic.",
      measurable: "Typical progression: 80â€“90%+ mastery with strong grade predictability",
    },
  ];

  return (
    <Layout>
      <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-blue-50/80 to-white">
        <div className="container-custom relative z-10 max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
       
            <h1 className="text-5xl md:text-6xl font-semibold leading-tight text-slate-900 mb-6">
              Stop Studying Hard. <span className="text-[#2366c9]">Start Studying Smart.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-700 font-medium leading-relaxed max-w-4xl mx-auto mb-4">
              You do not need more tuition, more notes, or more late nights. You need the right system, strategy, and feedback.
            </p>
            <p className="text-[14px] md:text-base text-slate-600 font-semibold mb-10">
              Designed for O-Level and IGCSE students — Cambridge-aligned, research-backed, built for how your brain actually learns.
            </p>

            <div className="bg-white border border-blue-100 shadow-sm rounded-2xl p-3 md:p-6 mb-10 overflow-x-auto">
              <table className="w-full min-w-[760px] text-left">
                <thead>
                  <tr className="border-b border-blue-100">
                    <th className="p-3 text-xs font-semibold uppercase tracking-wider text-red-600">What is not working</th>
                    <th className="p-3 text-xs font-semibold uppercase tracking-wider text-green-600">What EduMeUp does instead</th>
                  </tr>
                </thead>
                <tbody>
                  {notWorkingVsEdu.map((row, i) => (
                    <tr key={i} className="border-b border-blue-50 last:border-0">
                      <td className="p-3 text-[14px] text-slate-600 font-semibold">{row[0]}</td>
                      <td className="p-3 text-[14px] text-slate-900 font-semibold">{row[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-slate-600 font-semibold mb-8">The earlier you start, the stronger your foundation.</p>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {["45,000+ Practice Questions", "Past Papers 2010â€“2025", "80% Mastery Gates", "ATP Pathway to 38â€“40/40"].map((signal, i) => (
                <span key={i} className="px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-[14px] md:text-xs font-semibold uppercase tracking-wide text-[#2366c9]">
                  {signal}
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/resources">
                <Button className="bg-[#2366c9] hover:bg-blue-700 text-white font-semibold text-[14px] py-3 px-6">
                  Explore Free Library <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <InquiryDialog
                defaultType="diagnostic"
                title="Take Free Diagnostic"
                trigger={
                  <Button variant="outline" className="border-2 border-[#2366c9] text-[#2366c9] font-semibold text-[14px] py-3 px-6">
                    Take Free Diagnostic
                  </Button>
                }
              />
              <Link href="/why-edumeup/how-it-works">
                <Button variant="outline" className="border-2 border-[#2366c9] text-[#2366c9] font-semibold text-[14px] py-3 px-6">
                  See How The Platform Works
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-4">We Understand Your Struggles</h2>
            <p className="text-xl text-slate-900/60 font-semibold">Because each struggle below has a systematic solution</p>
          </div>

          <div className="space-y-8">
            {struggles.map((item, index) => (
              <Card key={index} className="border-2 border-blue-50 rounded-[2rem] shadow-sm">
                <CardContent className="p-8 md:p-10">
                  <div className="flex items-start gap-5 mb-5">
                    <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                      <item.icon className="h-6 w-6 text-[#2366c9]" />
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold uppercase tracking-widest text-blue-600 mb-1">Struggle #{index + 1}</p>
                      <h3 className="text-2xl font-semibold text-slate-900">{item.title}</h3>
                    </div>
                  </div>

                  <p className="text-slate-900/70 font-medium mb-3"><span className="font-semibold text-slate-900">Why this happens:</span> {item.why}</p>
                  <p className="text-[14px] italic text-slate-900/60 font-semibold mb-3">â€œ{item.quote}â€</p>
                  <div className="space-y-2 mb-4">
                    {item.solution.map((point, i) => (
                      <div key={i} className="flex items-start gap-3 text-[14px] text-slate-900/80 font-semibold">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[#2366c9] font-semibold mb-5">The result: {item.result}</p>
                  <Button variant="outline" className="border-blue-200 text-slate-900 hover:bg-blue-50 font-semibold">
                    {item.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 bg-[#2366c9] rounded-[2.5rem] p-8 md:p-12 text-white overflow-x-auto">
            <h3 className="text-2xl font-semibold text-white mb-6">What happens when students follow the system</h3>
            <table className="w-full min-w-[680px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 text-xs font-semibold uppercase tracking-wider text-white/90">Metric</th>
                  <th className="text-left py-3 text-xs font-semibold uppercase tracking-wider text-white/90">Before</th>
                  <th className="text-left py-3 text-xs font-semibold uppercase tracking-wider text-white/90">After 3 months</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Average mock score", "50â€“60%", "70â€“78%"],
                  ["Daily study hours", "8+ (inefficient)", "5â€“6 (focused)"],
                  ["Readiness before exams", "Panic and relearning", "Clear readiness score"],
                  ["Tutor dependency", "High", "Significantly reduced"],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0">
                    <td className="py-3 text-[14px] font-semibold text-blue-100">{row[0]}</td>
                    <td className="py-3 text-[14px] font-semibold text-blue-200/80">{row[1]}</td>
                    <td className="py-3 text-[14px] font-semibold text-white">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-[14px] text-blue-200/70 font-semibold">Based on pilot programme data. Individual outcomes vary by starting point and consistency.</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-50">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-4">Beyond Content — We Teach How to Learn</h2>
            <p className="text-xl text-slate-900/60 font-semibold">7 skills that improve exam outcomes and last for life</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, i) => (
              <Card key={i} className="bg-white border-2 border-blue-100 rounded-2xl">
                <CardContent className="p-6">
                  <p className="text-[14px] font-semibold uppercase text-blue-600 tracking-widest mb-2">Skill {i + 1}</p>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{skill.title}</h3>
                  <p className="text-xs text-slate-900/70 font-medium mb-2"><span className="text-slate-900 font-semibold">Why it matters:</span> {skill.why}</p>
                  <p className="text-xs text-[#2366c9] font-medium"><span className="font-semibold">How EduMeUp builds it:</span> {skill.how}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/resources">
              <Button className="bg-[#2366c9] hover:bg-blue-500 rounded-xl font-semibold">
                Explore Skill-Building Free Library Samples <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-4">Your Personalized Learning Path</h2>
            <p className="text-xl text-slate-900/60 font-semibold">Four pathways, one platform</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {pathways.map((path, i) => (
              <Card key={i} className="border-2 border-blue-50 rounded-[2rem]">
                <CardHeader className="pb-2">
                  <h3 className="text-xl font-semibold text-slate-900">{path.title}</h3>
                  <p className="text-[14px] text-slate-900/60 font-semibold">{path.profile}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {path.route.map((step, stepIndex) => (
                      <p key={stepIndex} className="text-[14px] text-slate-900/80 font-semibold">
                        {stepIndex + 1}. {step}
                      </p>
                    ))}
                  </div>
                  <p className="text-[#2366c9] font-semibold text-[14px]">{path.expected}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <InquiryDialog
              defaultType="diagnostic"
              title="Diagnostic Test"
              trigger={<Button className="bg-[#2366c9] hover:bg-[#2366c9] rounded-xl font-semibold">Diagnostic Test Recommends Your Best Pathway â†’</Button>}
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-50">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-4">Your Transformation Timeline</h2>
            <p className="text-xl text-slate-900/60 font-semibold">What progress looks like month by month</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {transformationTimeline.map((month, i) => (
              <Card key={i} className="bg-white border-2 border-blue-100 rounded-2xl">
                <CardContent className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">{month.phase}</p>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{month.title}</h3>
                  <p className="text-slate-900/70 font-medium text-[14px] mb-2"><span className="font-semibold text-slate-900">What you'll feel:</span> {month.feel}</p>
                  <p className="text-[#2366c9] font-semibold text-[14px]">{month.measurable}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 bg-white border-2 border-blue-100 rounded-[2rem] p-8">
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">Composite student journeys</h3>
            <div className="space-y-4 text-[14px] text-slate-900/80 font-semibold">
              <p><span className="text-[#2366c9] font-semibold">ATP improvement case:</span> A student starting near 22/40 in ATP Chemistry moved to 35â€“38/40 in mock conditions through structured ATP training and past-paper strategy.</p>
              <p><span className="text-[#2366c9] font-semibold">English structure case:</span> A student struggling with essay structure reached A-grade performance after framework-driven writing practice and feedback cycles.</p>
              <p><span className="text-[#2366c9] font-semibold">Emergency prep case:</span> A student with D grades across multiple subjects used risk-based triage and high-yield planning to pass all subjects within 14 weeks.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-4">Is EduMeUp Right for You?</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-[#2366c9]  border-2 border-2 border-green-100 rounded-2xl bg-green-50/40">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center gap-2"><CheckCircle2 className="h-5 w-5" />EduMeUp works best if you</h3>
                <ul className="space-y-2 text-[14px] font-semibold text-slate-900/80">
                  <li>â€¢ Are willing to practice actively</li>
                  <li>â€¢ Want conceptual understanding, not memorization only</li>
                  <li>â€¢ Can follow a structured system consistently</li>
                  <li>â€¢ Are ready for mastery gates and feedback</li>
                  <li>â€¢ Want long-term independent learning</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-[#2366c9]  border-2 border-2 border-red-100 rounded-2xl bg-red-50/40">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-red-700 mb-4 flex items-center gap-2"><AlertTriangle className="h-5 w-5" />Not ideal if you</h3>
                <ul className="space-y-2 text-[14px] font-semibold text-slate-900/80">
                  <li>â€¢ Want shortcuts without effort</li>
                  <li>â€¢ Prefer direct answers without thinking</li>
                  <li>â€¢ Do not want a structured process</li>
                  <li>â€¢ Expect results without consistency</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-50">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-4">Three Ways to Start</h2>
            <p className="text-xl text-slate-900/60 font-semibold">The earlier you start, the stronger your foundation</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-10">
            <Card className="border-[#2366c9]  border-2 border-2 border-blue-200 rounded-[2rem] bg-white shadow-sm">
              <CardContent className="p-7">
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Recommended</p>
                <h3 className="text-2xl font-semibold text-slate-900 mb-3">Explore Free Library</h3>
                <p className="text-[14px] text-slate-900/70 font-semibold mb-4">Permanent free access to sample lessons, ATP previews, essay frameworks, worked examples, and platform walkthroughs.</p>
                <p className="text-[11px] text-slate-900/50 font-semibold mb-4">No time limit â€¢ Free account to save progress</p>
                <Link href="/resources">
                  <Button className="w-full bg-[#2366c9] hover:bg-blue-500 font-semibold">
                    <Library className="h-4 w-4 mr-2" /> Explore Free Library Now
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-[#2366c9]  border-2 border-2 border-blue-100 rounded-[2rem] bg-white shadow-sm">
              <CardContent className="p-7">
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Option 2</p>
                <h3 className="text-2xl font-semibold text-slate-900 mb-3">Free Diagnostic Assessment</h3>
                <p className="text-[14px] text-slate-900/70 font-semibold mb-4">30â€“40 minute test with topic-level gap analysis and personalized roadmap.</p>
                <InquiryDialog
                  defaultType="diagnostic"
                  title="Take Free Diagnostic Assessment"
                  trigger={<Button className="w-full bg-[#2366c9] hover:bg-[#2366c9] font-semibold">Take Free Diagnostic</Button>}
                />
              </CardContent>
            </Card>

            <Card className="border-[#2366c9]  border-2 border-2 border-blue-100 rounded-[2rem] bg-white shadow-sm">
              <CardContent className="p-7">
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Option 3</p>
                <h3 className="text-2xl font-semibold text-slate-900 mb-3">Speak With Our Team</h3>
                <p className="text-[14px] text-slate-900/70 font-semibold mb-4">Discuss your subjects, timeline, and concerns with zero pressure.</p>
                <p className="text-[14px] font-semibold text-slate-900 mb-4">Available 9 AM â€“ 9 PM Pakistan Time</p>
                <Button variant="outline" className="w-full border-blue-200 text-slate-900 hover:bg-blue-50 font-semibold">
                  <MessageCircle className="h-4 w-4 mr-2" /> Contact Support Team
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="bg-[#2366c9] rounded-[2rem] p-8 text-white">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-300 mb-2">March 2026 launch offer</p>
            <h3 className="text-2xl font-semibold text-white mb-4">Enroll within 30 days and receive</h3>
            <div className="grid md:grid-cols-2 gap-3 text-[14px] font-semibold text-white">
              {["25% off all programmes", "Free diagnostic assessment included", "Free parent orientation session", "Permanent Free Library access"].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-300 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-blue-200/80 mt-4">Pricing shown in USD. Local currency equivalents are available at checkout.</p>
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {[
              ["How is Free Library different from full platform?", "The Free Library offers real sample and partial resources to experience the method. Full courses include complete sequences, mastery tracking, and personalized pathways."],
              ["Is Free Library time-limited?", "No. Free Library access is permanent with no expiry countdown."],
              ["I am failing right now. Is it too late?", "A 3â€“4 month window can still produce meaningful gains with consistent daily execution."],
              ["Will this work on slow internet?", "The platform is optimized for low bandwidth and supports downloaded/offline learning workflows where available."],
            ].map((faq, i) => (
              <Card key={i} className="bg-white border border-blue-100 rounded-2xl">
                <CardContent className="p-6">
                  <h4 className="text-base font-semibold text-slate-900 mb-2">{faq[0]}</h4>
                  <p className="text-[14px] text-slate-900/70 font-semibold">{faq[1]}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-[#2366c9] text-white relative overflow-hidden">
        <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-blue-600 opacity-30 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-blue-600 opacity-30 blur-3xl" aria-hidden="true" />
        <div className="container-custom text-center relative z-10">
          <div className="flex justify-center w-full mb-6">
            <h2 className="text-4xl md:text-6xl text-white font-semibold leading-[1.05] mb-3 text-center tracking-tight px-4">
              The opportunity is yours.
            </h2>
          </div>
          <p className="text-base text-blue-200 mb-12 max-w-3xl mx-auto">
            Every activity, feedback loop, and progression gate is built around how learning actually works.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6 max-w-5xl mx-auto">
            <Link href="/resources">
              <Button size="lg" className="w-full md:w-auto min-w-[260px] bg-white text-[#2366c9] hover:bg-blue-50 font-semibold py-3 px-6 rounded-xl text-[14px] shadow-md flex items-center justify-center gap-2">
                Explore Free Library <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <InquiryDialog
              defaultType="diagnostic"
              title="Take Free Diagnostic"
              trigger={
                <Button size="lg" variant="outline" className="w-full md:w-auto min-w-[260px] border border-white/30 text-white hover:bg-white/10 font-semibold py-3 px-6 rounded-xl text-[14px] shadow-md flex items-center justify-center gap-2">
                  Take Free Diagnostic <ArrowRight className="h-4 w-4" />
                </Button>
              }
            />
            <Link href="/why-edumeup/how-it-works">
              <Button size="lg" variant="outline" className="w-full md:w-auto min-w-[260px] border border-white/30 text-white hover:bg-white/10 font-semibold py-3 px-6 rounded-xl text-[14px] shadow-md flex items-center justify-center gap-2">
                See Inside The Platform <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

