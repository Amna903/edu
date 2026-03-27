import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { InquiryDialog } from "@/components/InquiryDialog";
import {
  ArrowRight,
  CheckCircle2,
  Brain,
  BarChart3,
  ShieldCheck,
  Users,
  BookOpen,
  FlaskConical,
  GraduationCap,
  MessageCircle,
} from "lucide-react";

export default function ForParents() {
  const pillars = [
    {
      icon: BookOpen,
      title: "Pillar 1: Structured Mastery Learning",
      points: [
        "Concept Introduction → Active Engagement → Retrieval Practice → Spaced Review → Mastery Verification",
        "Students cannot skip ahead; each stage unlocks only after genuine completion",
        "Mastery gates set at 80% to prevent fragile, lucky progression",
        "Immediate corrective feedback explains why answers are wrong, not just what is correct",
        "Cumulative assessments ensure nothing is “forgotten and closed”",
      ],
    },
    {
      icon: Brain,
      title: "Pillar 2: Spaced Retrieval System",
      points: [
        "Automated review timing at research-optimized expanding intervals",
        "Adaptive scheduling: weak topics return sooner, mastered topics later",
        "Converts September learning into May exam accessibility",
        "Reduces last-minute panic re-learning and wasted study hours",
      ],
    },
    {
      icon: GraduationCap,
      title: "Pillar 3: Independence Building",
      points: [
        "Four-level scaffold: Guided → Supported → Independent → Mastery",
        "Hint-first support with Socratic AI prompting rather than spoon-feeding",
        "24/7 chatbot support available in English and Urdu",
        "Builds self-learning capability for A-Level, university, and beyond",
      ],
    },
    {
      icon: BarChart3,
      title: "Pillar 4: Complete Parent Visibility",
      points: [
        "Topic-by-topic mastery data (not generic reassurance)",
        "Engagement tracking: login frequency, time per subject, completion",
        "Predicted performance trajectory before results season",
        "Weekly reports plus early warning alerts when risk appears",
      ],
    },
  ];

  const parentModules = [
    "Module 1 — Understanding Cambridge O-Level (1 hour): AO1/AO2/AO3, grading logic, and why method matters as much as content",
    "Module 2 — Reading Your Parent Dashboard (30 minutes): interpreting mastery data in timeline context",
    "Module 3 — Supporting Independence, Not Dependency (1 hour): practical language that helps without spoon-feeding",
    "Module 4 — Managing Academic Pressure (45 minutes): expectations, anxiety transfer, and family learning climate",
    "Module 5 — Platform Features for Parents (30 minutes): dashboard, alerts, diagnostics, and report interpretation",
    "Monthly Live Q&A Sessions: ask child-specific questions and stay aligned throughout the year",
  ];

  const faqs = [
    {
      q: "My child is already significantly behind. Is it too late to make a meaningful difference?",
      a: "Three to four months of structured, research-backed preparation can still produce meaningful gains for many students when diagnostics identify specific gaps and effort is prioritized intelligently. Earlier is better, but late does not mean impossible.",
    },
    {
      q: "How can a digital platform match the personalized attention of a private tutor?",
      a: "A skilled tutor offers human responsiveness. EduMeUp adds what most tutoring cannot sustain consistently: automated spaced retrieval over months, parent-visible topic mastery, 24/7 support, and longitudinal data history. Optional tutoring layers both approaches when needed.",
    },
    {
      q: "My child is not self-motivated. Will a digital platform work?",
      a: "Many students described as unmotivated are actually discouraged by ineffective methods and invisible progress. EduMeUp targets both: understanding-first activities and visible progress signals. Motivation often follows progress, commonly within 4–6 weeks.",
    },
    {
      q: "What human support is available if my child struggles with specific topics?",
      a: "Included support: 24/7 AI chatbot and education-team guidance. Optional support: live online tutoring from $15/hour and teacher-guided programmes from $40/month. Human support is available at every level; you choose intensity and timing.",
    },
    {
      q: "How is EduMeUp different from other online learning platforms?",
      a: "Three core differences: complete parent visibility (mastery, trajectory, alerts), methodology built around Cambridge objectives and cognitive science, and a structured Parent Orientation Programme that teaches families how to support learning effectively.",
    },
    {
      q: "What about students with learning differences?",
      a: "The platform’s chunked content, multisensory H5P activities, and immediate feedback help many students with attention and processing challenges. Accessibility includes adjustable text sizing and keyboard navigation. For significant needs, educational psychologist guidance is recommended.",
    },
    {
      q: "What comes after O-Level?",
      a: "The core capabilities developed here — active recall, spaced practice, metacognition, and self-regulated learning — transfer directly into A-Level and university. These are not exam hacks; they are lifelong learning skills.",
    },
  ];

  return (
    <Layout>
      <section className="pt-24 pb-28 bg-[#1e1b4b] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.25)_0%,transparent_55%)]" />
        <div className="container-custom relative z-10 max-w-6xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="bg-blue-500/20 text-blue-200 mb-6 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-blue-500/30">
              For Parents
            </Badge>
            <h1 className="text-5xl md:text-6xl font-semibold text-white leading-tight mb-5">
              Your Child Deserves a <span className="text-blue-400">Structured Path</span> to O-Level Success
            </h1>
            <p className="text-2xl md:text-3xl font-black text-blue-300 uppercase tracking-wide mb-6">Beyond Tutoring.</p>
            <p className="text-lg md:text-xl text-blue-100 max-w-4xl mx-auto font-medium leading-relaxed mb-6">
              A complete academic mastery system — with you informed at every step.
            </p>
            <p className="text-blue-200/90 max-w-5xl mx-auto  mb-10">
              Designed with educational researchers and Cambridge O-Level specialists. Built for how students actually learn. Structured so parents always know exactly where their child stands.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 max-w-5xl mx-auto mb-10 text-left">
              <p className="text-[14px] md:text-base text-blue-100 font-semibold mb-2">You want three outcomes from this journey:</p>
              <div className="grid md:grid-cols-3 gap-3 text-[14px]">
                <p className="text-white font-semibold">Genuine understanding — not fragile memorization</p>
                <p className="text-white font-semibold">Measurable progress — not vague reassurance</p>
                <p className="text-white font-semibold">Growing independence — not tutor dependency</p>
              </div>
              <p className="mt-4 text-blue-200 ">
                EduMeUp was built to deliver all three through a research-grounded digital platform with optional human support, giving your family complete control, complete visibility, and genuine results.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/for-parents">
                <Button size="lg" variant="outline" className="h-14 px-8 rounded-2xl border-2 border-white/10 bg-white/5 text-white hover:bg-white/10 font-semibold">
                  Open For Parents Main Page
                </Button>
              </Link>
              <Link href="/resources">
                <Button size="lg" className="bg-[#2366c9] hover:bg-blue-500 h-14 px-8 rounded-2xl font-semibold">
                  Explore Free Library <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <InquiryDialog
                defaultType="diagnostic"
                title="Take Free Diagnostic"
                trigger={<Button size="lg" variant="outline" className="h-14 px-8 rounded-2xl border-2 border-white/10 bg-white/5 text-white hover:bg-white/10 font-semibold">Take Free Diagnostic</Button>}
              />
              <Link href="/contact">
                <Button size="lg" variant="outline" className="h-14 px-8 rounded-2xl border-2 border-white/10 bg-white/5 text-white hover:bg-white/10 font-semibold">
                  Speak With Our Team
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-semibold text-[#1e1b4b] mb-4">Why O-Level Demands a Different Approach</h2>
            <p className="text-xl text-[#1e1b4b]/60 ">The O-Level challenge most families underestimate</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 items-start">
            <Card className="border-[#2366c9]  border-2 lg:col-span-2 border-2 border-blue-100 rounded-[2rem] shadow-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-[#1e1b4b] mb-4">Cambridge examinations test thinking — not memorization</h3>
                <p className="text-[#1e1b4b]/70 mb-5">
                  O-Level differs fundamentally from national-curriculum exam habits and from what most private tutoring emphasizes.
                </p>
                <div className="overflow-x-auto rounded-2xl border border-blue-100 bg-white">
                  <table className="w-full min-w-[620px] text-left">
                    <thead>
                      <tr className="bg-blue-50 border-b border-blue-100">
                        <th className="p-4 text-xs font-black uppercase tracking-wider text-[#1e1b4b]">Assessment Objective</th>
                        <th className="p-4 text-xs font-black uppercase tracking-wider text-[#1e1b4b]">What it demands</th>
                        <th className="p-4 text-xs font-black uppercase tracking-wider text-[#1e1b4b]">What most teaching delivers</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-blue-50">
                        <td className="p-4 text-[14px] font-semibold text-[#1e1b4b]">AO1 — Knowledge</td>
                        <td className="p-4 text-[14px] font-semibold text-[#1e1b4b]/80">Recall of concepts and facts</td>
                        <td className="p-4 text-[14px] font-semibold text-green-700"> Usually covered</td>
                      </tr>
                      <tr className="border-b border-blue-50">
                        <td className="p-4 text-[14px] font-semibold text-[#1e1b4b]">AO2 — Application</td>
                        <td className="p-4 text-[14px] font-semibold text-[#1e1b4b]/80">Applying knowledge in new contexts</td>
                        <td className="p-4 text-[14px] font-semibold text-amber-700"> Partially covered</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-[14px] font-semibold text-[#1e1b4b]">AO3 — Analysis</td>
                        <td className="p-4 text-[14px] font-semibold text-[#1e1b4b]/80">Evaluating, interpreting, synthesizing</td>
                        <td className="p-4 text-[14px] font-semibold text-red-700"> Rarely taught explicitly</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-5 text-[14px] text-[#1e1b4b]/70 ">
                  AO2 and AO3 represent the majority of marks in many papers. Students prepared only for AO1 often study hard yet underperform on unseen questions.
                </p>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card className="border-[#2366c9]  border-2 border-2 border-blue-100 rounded-[2rem] bg-blue-50/50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-[#1e1b4b] mb-3">Built for this exact reality</h3>
                  <p className="text-[14px] text-[#1e1b4b]/70">
                    EduMeUp is designed around the thinking Cambridge rewards, not just the content it tests.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-[#2366c9]  border-2 bg-[#1e1b4b] border-0 rounded-[2rem] text-white">
                <CardContent className="p-6">
                  <p className="text-[14px] uppercase tracking-widest font-black text-blue-300 mb-3">Platform Stack</p>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-black uppercase tracking-wide">
                    {[
                      "Moodle 4.5.1",
                      "H5P Interactives",
                      "AI Chatbot",
                      "Spaced Retrieval",
                      "Parent Dashboard",
                      "Weekly Reporting",
                    ].map((item, i) => (
                      <div key={i} className="rounded-lg border border-white/15 bg-white/5 px-2.5 py-2 text-blue-100">{item}</div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-50">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-semibold text-[#1e1b4b] mb-4">The EduMeUp Approach</h2>
            <p className="text-xl text-[#1e1b4b]/60 font-semibold">Built with O-Level specialists and decades of learning science</p>
          </div>

          <p className="text-center text-[#1e1b4b]/70 font-semibold max-w-4xl mx-auto mb-8">
            EduMeUp was developed with educational researchers and Cambridge specialists to solve a common failure point in exam preparation: content delivery without learning architecture.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {pillars.map((pillar, i) => (
              <Card key={i} className="bg-white border-2 border-blue-100 rounded-[2rem]">
                <CardContent className="p-7">
                  <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                    <pillar.icon className="h-6 w-6 text-[#2366c9]" />
                  </div>
                  <h3 className="text-xl  text-[#1e1b4b] mb-4">{pillar.title}</h3>
                  <div className="space-y-2">
                    {pillar.points.map((point, idx) => (
                      <p key={idx} className="text-[14px] text-[#1e1b4b]/80  flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        <span>{point}</span>
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom max-w-6xl">
          <div className="bg-[#1e1b4b] rounded-[2.5rem] p-8 md:p-12 text-white">
            <p className="text-xs font-black uppercase tracking-widest text-blue-300 mb-2">Key Differentiator</p>
            <h2 className="text-4xl md:text-5xl font-semibold text-white mb-5">Parent Partnership Model</h2>
            <p className="text-blue-100 text-lg  max-w-4xl mb-8">
              Most educational platforms treat parents as billing contacts. EduMeUp treats parents as meaningful partners in the learning process, with explicit guidance on when to intervene and when to allow productive struggle.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {parentModules.map((module, i) => (
                <div key={i} className="rounded-2xl border border-white/15 bg-white/5 px-4 py-4 text-[14px]  text-blue-100 flex items-start gap-3">
                  <Users className="h-4 w-4 text-blue-300 mt-0.5 shrink-0" />
                  <span>{module}</span>
                </div>
              ))}
            </div>

            <p className="mt-6 text-blue-200">
              “We don’t just want your child to succeed. We want your family to understand why they succeeded — and carry that understanding forward.”
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-50">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-semibold text-[#1e1b4b] mb-4">What’s Covered</h2>
            <p className="text-xl text-[#1e1b4b]/60 font-semibold">Comprehensive O-Level subject coverage</p>
          </div>

          <p className="text-center text-[#1e1b4b]/70 max-w-4xl mx-auto mb-8">
            Core subjects include Mathematics, Physics, Chemistry, Biology, English Language, Economics, Business Studies, Pakistan Studies, and Computer Science.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            <Card className="border-[#2366c9]  border-2 bg-white border-2 border-blue-100 rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-[#1e1b4b] mb-2">Core Subjects</h3>
                <p className="text-[14px] text-[#1e1b4b]/70 ">Mathematics, Physics, Chemistry, Biology, English Language, Economics, Business Studies, Pakistan Studies, Computer Science.</p>
              </CardContent>
            </Card>
            <Card className="border-[#2366c9]  border-2 bg-white border-2 border-blue-100 rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-[#1e1b4b] mb-2">ATP Courses</h3>
                <p className="text-[14px] text-[#1e1b4b]/70 ">Physics, Chemistry, Biology ATP with experimental design, variables, data interpretation, and conclusion writing.</p>
              </CardContent>
            </Card>
            <Card className="border-[#2366c9]  border-2 bg-white border-2 border-blue-100 rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-[#1e1b4b] mb-2">English Frameworks</h3>
                <p className="text-[14px] text-[#1e1b4b]/70 ">Structured Paper 1 summary and Paper 2 essay systems for repeatable high-quality writing.</p>
              </CardContent>
            </Card>
            <Card className="border-[#2366c9]  border-2 bg-white border-2 border-blue-100 rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-[#1e1b4b] mb-2">Foundational O-Level Bridge Courses + Past Papers</h3>
                <p className="text-[14px] text-[#1e1b4b]/70">Foundational O-Level Bridge Courses (Grades 6–8) and past paper coverage from 2010–2025.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-semibold text-[#1e1b4b] mb-4">Human Support — On Your Terms</h2>
            <p className="text-xl text-[#1e1b4b]/60 font-semibold">Platform-first. Human help available when needed.</p>
          </div>

          <p className="text-center text-[#1e1b4b]/70  max-w-4xl mx-auto mb-8">
            Most students can perform strongly with the platform alone when used consistently. Human support is offered as a flexible add-on, not a forced dependency.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-[#2366c9]  border-2 border-2 border-blue-100 rounded-2xl">
              <CardContent className="p-6">
                <FlaskConical className="h-6 w-6 text-[#2366c9] mb-3" />
                <h3 className="text-xl font-semibold text-[#1e1b4b] mb-2">Online Tutoring</h3>
                <p className="text-[14px] text-[#1e1b4b]/70  mb-3">One-on-one live sessions, booked only when needed, informed by platform data.</p>
                <p className="text-[14px] font-semibold text-[#2366c9]">From $15/hour</p>
              </CardContent>
            </Card>
            <Card className="border-[#2366c9]  border-2 border-2 border-blue-100 rounded-2xl">
              <CardContent className="p-6">
                <MessageCircle className="h-6 w-6 text-[#2366c9] mb-3" />
                <h3 className="text-xl font-semibold text-[#1e1b4b] mb-2">Tutor Booking - 1-to-1 Personalised Education</h3>
                <p className="text-[14px] text-[#1e1b4b]/70 mb-3">In-person support in Lahore, Karachi, Islamabad, and Rawalpindi.</p>
                <p className="text-[14px] font-semibold text-[#2366c9]">From $20/hour</p>
              </CardContent>
            </Card>
            <Card className="border-[#2366c9]  border-2 border-2 border-blue-100 rounded-2xl">
              <CardContent className="p-6">
                <ShieldCheck className="h-6 w-6 text-[#2366c9] mb-3" />
                <h3 className="text-xl font-semibold text-[#1e1b4b] mb-2">Teacher-Guided Programme</h3>
                <p className="text-[14px] text-[#1e1b4b]/70  mb-3">Structured oversight, homework review, and consistent guidance.</p>
                <p className="text-[14px] font-semibold text-[#2366c9]">From $40/month</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-50">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-semibold text-[#1e1b4b] mb-4">Investment and Value</h2>
            <p className="text-xl text-[#1e1b4b]/60 font-semibold">Transparent, measurable, and controllable</p>
          </div>

          <Card className="border-[#2366c9]  border-2 bg-white border-2 border-blue-100 rounded-[2rem]">
            <CardContent className="p-8">
              <p className="text-[#1e1b4b]/80 mb-4">
                  Many families in Pakistan and the Gulf spend roughly $300–$800/month on combined O-Level tutoring. The real decision is not just spend — it is whether you can clearly see accountability, risk, and progress in time to act.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                {[
                  "All subjects, courses, and resources",
                  "Parent Dashboard with full analytics",
                  "Spaced retrieval and AI support",
                  "Weekly progress reports",
                  "Diagnostic assessment + personalized plan",
                  "Parent Orientation Programme",
                ].map((item, i) => (
                  <p key={i} className="text-[14px] text-[#1e1b4b]/80  flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </p>
                ))}
              </div>
              <p className="text-[#2366c9] font-semibold">Platform pricing: from $30/month (local currency shown at checkout)</p>
              <p className="text-[#1e1b4b]/70 text-[14px] mt-2">Optional tutoring: from $15/hour, only if and when needed.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-semibold text-[#1e1b4b] mb-4">Parent Experiences</h2>
            <p className="text-xl text-[#1e1b4b]/60 font-semibold">Composite journeys based on common patterns</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "A parent like Mrs. Khan (Lahore)",
                body: "Her daughter’s shift began with understanding, not immediate grades. Dashboard data exposed one weak area — Electrolysis — enabling targeted intervention before exams.",
                value: "“I finally knew what was happening. Not guessing. Knowing.”",
              },
              {
                title: "A parent like Mr. Rahman (Dubai)",
                body: "He needed measurable evidence. Topic-level tracking replaced assumptions and helped resolve ATP gaps before final exams.",
                value: "“Finally, actual data. I could see the problem, address it, and watch it resolve.”",
              },
              {
                title: "A parent like Mrs. Siddiqui (Karachi)",
                body: "Her core goal was independence, not just marks. The scaffolded progression moved her daughter from tutor-reliant to self-directed learning.",
                value: "“The independence was the real result. The grades reflected it.”",
              },
            ].map((story, i) => (
              <Card key={i} className="border-2 border-blue-100 rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="text-lg  text-[#1e1b4b] mb-2">{story.title}</h3>
                  <p className="text-[14px] text-[#1e1b4b]/75  mb-3">{story.body}</p>
                  <p className="text-[14px] font-semibold text-[#2366c9] italic">{story.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-50">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-semibold text-[#1e1b4b] mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-5">
            {faqs.map((faq, i) => (
              <Card key={i} className="bg-white border-2 border-blue-100 rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="text-base font-semibold text-[#1e1b4b] mb-2">{faq.q}</h3>
                  <p className="text-[14px] text-[#1e1b4b]/70 font-semibold">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-semibold text-[#1e1b4b] mb-4">Start With Confidence</h2>
            <p className="text-xl text-[#1e1b4b]/60 font-semibold">Three low-risk ways to begin</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-10">
            <Card className="border-[#2366c9]  border-2 border-2 border-blue-200 rounded-[2rem] bg-white">
              <CardContent className="p-7">
                <p className="text-xs font-black uppercase tracking-widest text-blue-600 mb-2">Option 1</p>
                <h3 className="text-2xl font-semibold text-[#1e1b4b] mb-3">Explore Free Library</h3>
                <p className="text-[14px] text-[#1e1b4b]/70  mb-4">Permanent access to real sample resources: H5P activities, ATP samples, essay frameworks, worked examples, and walkthroughs.</p>
                <p className="text-[11px] text-[#1e1b4b]/50 font-semibold mb-4">No account needed for browsing.</p>
                <Link href="/resources">
                  <Button className="w-full bg-[#2366c9] hover:bg-blue-500 font-semibold">Explore Free Library</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-[#2366c9]  border-2 border-2 border-blue-100 rounded-[2rem] bg-white">
              <CardContent className="p-7">
                <p className="text-xs font-black uppercase tracking-widest text-blue-600 mb-2">Option 2</p>
                <h3 className="text-2xl font-semibold text-[#1e1b4b] mb-3">Free Diagnostic Assessment</h3>
                <p className="text-[14px] text-[#1e1b4b]/70  mb-4">30–40 minute assessment with topic-level gap report and personalized plan.</p>
                <Link href="/contact?type=diagnostic">
                  <Button className="w-full bg-[#1e1b4b] hover:bg-[#2366c9] font-semibold">Take Free Diagnostic</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-[#2366c9]  border-2 border-2 border-blue-100 rounded-[2rem] bg-white">
              <CardContent className="p-7">
                <p className="text-xs font-black uppercase tracking-widest text-blue-600 mb-2">Option 3</p>
                <h3 className="text-2xl font-semibold text-[#1e1b4b] mb-3">Speak With Our Education Team</h3>
                <p className="text-[14px] text-[#1e1b4b]/70 mb-4">Discuss your child’s subjects, timeline, and concerns with honest recommendations.</p>
                <p className="text-[14px] font-semibold text-[#1e1b4b] mb-4">9 AM – 9 PM Pakistan Time • International families supported</p>
                <Link href="/contact">
                  <Button variant="outline" className="w-full border-blue-200 text-[#1e1b4b] hover:bg-blue-50 font-semibold">WhatsApp / Call</Button>
                </Link>
              </CardContent>
            </Card>
          </div>

<div className="bg-[#1e1b4b] rounded-[2.5rem] p-10 text-white mb-12 shadow-2xl shadow-blue-900/30 relative overflow-hidden border border-white/5">
  {/* Decorative Background Element */}
  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full -mr-32 -mt-32"></div>

  <div className="relative z-10">
    <div className="flex items-center gap-2 mb-4">
      <span className="h-px w-8 bg-blue-400"></span>
      <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-300">
        March 2026 Launch Offer
      </p>
    </div>

    <h3 className="text-3xl md:text-4xl font-semibold text-white mb-8 tracking-tight">
      Families enrolling within 30 days receive
    </h3>

    <div className="grid md:grid-cols-2 gap-y-6 gap-x-12">
      <div className="flex items-center gap-4 group">
        <div className="flex-shrink-0 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#1e1b4b] transition-all">
          <span className="text-[14px] font-semibold">01</span>
        </div>
        <p className="text-lg  text-white">25% off all programmes</p>
      </div>

      <div className="flex items-center gap-4 group">
        <div className="flex-shrink-0 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#1e1b4b] transition-all">
          <span className="text-[14px] font-semibold">02</span>
        </div>
        <p className="text-lg  text-white">Free diagnostic assessment</p>
      </div>

      <div className="flex items-center gap-4 group">
        <div className="flex-shrink-0 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#1e1b4b] transition-all">
          <span className="text-[14px] font-semibold">03</span>
        </div>
        <p className="text-lg  text-white">Parent Orientation Programme</p>
      </div>

      <div className="flex items-center gap-4 group">
        <div className="flex-shrink-0 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#1e1b4b] transition-all">
          <span className="text-[14px] font-semibold">04</span>
        </div>
        <p className="text-lg  text-white">Permanent Library access</p>
      </div>
    </div>

    <div className="mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <p className="text-[11px] font-medium text-blue-200/60 uppercase tracking-widest">
        All pricing in USD • Local currency shown at checkout
      </p>
      <button className="bg-white text-[#1e1b4b] px-8 py-3 rounded-xl font-semibold text-[14px] hover:bg-blue-50 transition-colors shadow-lg">
        Claim Enrollment Offer
      </button>
    </div>
  </div>
</div>
          <p className="text-center text-[#1e1b4b]/80 font-semibold max-w-4xl mx-auto">
            EduMeUp is built on one conviction: every student deserves preparation designed around how learning actually works, and every parent deserves the confidence of clear, timely, data-backed visibility.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#1e1b4b] text-white text-center">
        <div className="container-custom max-w-5xl">
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-5">Begin Your Child’s Structured Preparation</h2>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto mb-8 font-medium">
            See the methodology first. Then decide with confidence.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/resources">
              <Button size="lg" className="bg-[#2366c9] hover:bg-blue-500 text-white h-14 px-8 font-semibold">Explore Free Library</Button>
            </Link>
            <InquiryDialog
              defaultType="diagnostic"
              title="Free Diagnostic"
              trigger={
                <Button size="lg" variant="outline" className="h-14 px-8 border-2 border-white/10 bg-white/5 text-white hover:bg-white/10 font-semibold">
                  Take Free Diagnostic
                </Button>
              }
            />
            <InquiryDialog
              defaultType="general"
              title="Speak With Our Team"
              trigger={
                <Button size="lg" variant="outline" className="h-14 px-8 border-2 border-white/10 bg-white/5 text-white hover:bg-white/10 font-semibold">
                  Speak With Our Team
                </Button>
              }
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}
