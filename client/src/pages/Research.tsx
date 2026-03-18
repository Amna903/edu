import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  ArrowRight,
  Beaker,
  Brain,
  CheckCircle2,
  Download,
  Layers,
  MessageSquare,
  RefreshCw,
  Search,
} from "lucide-react";
import { Link } from "wouter";
import { InquiryDialog } from "@/components/InquiryDialog";

const byNumbers = [
  ["50+ Years", "of cognitive science research informing our platform"],
  ["200+ Studies", "reviewed and synthesised"],
  ["15 Core", "principles implemented in our methodology"],
  ["5 Pillars", "of evidence-based learning in every feature"],
  ["N=127", "students in our ongoing pilot study"],
];

const whatWorks = [
  "Active Recall — retrieving information from memory",
  "Spaced Repetition — reviewing at expanding intervals",
  "Practice Testing — frequent low-stakes quizzes",
  "Elaboration — explaining concepts in your own words",
  "Dual Coding — combining visual and verbal information",
];

const edtechResearchGap = [
  [
    "Add gamification (points, badges, leaderboards)",
    "Extrinsic rewards can undermine intrinsic motivation (Deci et al., 1999)",
  ],
  ["Produce video lectures", "Passive viewing produces weak long-term retention"],
  [
    "Focus on content delivery",
    "Retrieval practice, not re-exposure, drives lasting learning",
  ],
  [
    "Ignore cognitive load",
    "Overloaded working memory prevents encoding entirely",
  ],
  [
    "Prioritise engagement over efficacy",
    "Feeling engaged is not equal to learning effectively",
  ],
];

const pillars = [
  {
    icon: Search,
    title: "Pillar 1: Active Retrieval Practice",
    science:
      "Forcing the brain to retrieve information from memory strengthens neural pathways and produces better long-term retention than passive review.",
    studies: [
      "Roediger & Karpicke (2006)",
      "Karpicke & Roediger (2008)",
      "Kornell, Hays & Bjork (2009)",
    ],
    myths: [
      ["Testing is just for assessment", "Testing is one of the strongest learning tools available."],
      [
        "I should study until I know it, then test",
        "Test early and often — even incorrect attempts support learning.",
      ],
    ],
    implementation: [
      "Practice questions after every concept",
      "Low-stakes frequent quizzes in H5P activities",
      "MCQ, short answer, problem-solving, drag-and-drop",
      "Immediate corrective feedback",
      "Confidence ratings for metacognitive awareness",
    ],
  },
  {
    icon: RefreshCw,
    title: "Pillar 2: Spaced Repetition",
    science:
      "Reviewing at expanding intervals produces dramatically stronger long-term retention than cramming.",
    studies: ["Ebbinghaus (1885)", "Cepeda et al. (2006, 2008)", "Pashler et al. (2007)"],
    myths: [
      ["Cramming works if I study hard enough", "Cramming boosts short-term recall but decays quickly."],
      ["Forgetting means failure", "Forgetting is part of durable memory building when followed by timely review."],
    ],
    implementation: [
      "Automated spaced repetition algorithm",
      "Performance-based adaptive intervals",
      "Platform-recommended review timing",
      "Cross-subject interleaving",
      "Cumulative assessments; no topic is ever closed",
    ],
  },
  {
    icon: Layers,
    title: "Pillar 3: Interleaved Practice",
    science:
      "Mixing problem types feels harder during practice but improves transfer and delayed performance.",
    studies: ["Rohrer & Taylor (2007)", "Kornell & Bjork (2008)", "Taylor & Rohrer (2010)"],
    myths: [
      ["If it feels hard, it is not working", "Higher challenge can signal stronger long-term learning."],
      ["Blocked practice means mastery", "Blocked practice can create an illusion of mastery."],
    ],
    implementation: [
      "Mixed H5P problem sets",
      "Spiralled curriculum progression",
      "Randomised problem-type sequencing",
      "Cumulative assessments include prior topics",
    ],
  },
  {
    icon: Brain,
    title: "Pillar 4: Dual Coding (Visual + Verbal)",
    science:
      "Information encoded visually and verbally is retained better than single-format delivery.",
    studies: ["Paivio (1971, 1986)", "Mayer (2001, 2009)", "Mayer & Moreno (2003)"],
    myths: [
      ["More visuals always help", "Only instructional visuals improve learning; decorative visuals can distract."],
      ["Text-only detail is best", "For complex topics, text + purposeful visuals improves encoding."],
    ],
    implementation: [
      "Relevant visuals for every complex concept",
      "H5P interactive diagrams and visual manipulatives",
      "Dual-channel explanations",
      "Consistent educational color coding",
      "No decorative-only media",
    ],
  },
  {
    icon: MessageSquare,
    title: "Pillar 5: Elaborative Interrogation & Self-Explanation",
    science:
      "Prompting learners to explain why and how improves understanding and transfer compared to passive reading.",
    studies: ["Chi et al. (1989, 1994)", "Pressley et al. (1992)", "Aleven & Koedinger (2002)"],
    myths: [
      ["Reading and highlighting are enough", "Deep explanation produces stronger retention than passive re-reading."],
      ["AI should just give the answer", "Socratic prompting supports deeper reasoning and independence."],
    ],
    implementation: [
      "Why/How prompts throughout lessons",
      "Explain-in-your-own-words H5P tasks",
      "Worked examples with reasoning gaps",
      "Socratic AI prompting strategy",
      "Post-practice reflection questions",
    ],
  },
];

const dailyExperienceRows = [
  ["Retrieval Practice", "Answers H5P questions after every concept before moving forward"],
  ["Spaced Repetition", "Receives review alerts at optimal intervals"],
  ["Interleaved Practice", "Gets mixed problem sets across topics and subjects"],
  ["Dual Coding", "Studies concepts through both diagrams and text"],
  ["Elaborative Interrogation", "Responds to why/how prompts before final answers"],
  ["Metacognition", "Rates confidence after questions to build self-awareness"],
  ["AI Chatbot Support", "Gets Socratic prompts, not answer dumps"],
  ["Cognitive Load Management", "Content is chunked progressively, not overloaded"],
];

const comparativeStudies = [
  {
    title: "Study 1: Retention Rates by Learning Method",
    source: "Dunlosky et al. (2013); Freeman et al. (2014)",
    summary:
      "Passive methods consistently underperform active methods across decades of research. EduMeUp Phase 1 is intentionally active-method first.",
    points: [
      "Lecture/reading/video-led models trend lower on delayed retention",
      "Practice by doing and teaching/peer explanation trend higher",
      "We avoid unsupported percentage claims from pop-learning graphics",
    ],
  },
  {
    title: "Study 2: Spaced vs. Massed Practice",
    source: "Cepeda et al. (2006, 2008); Pashler et al. (2007)",
    summary:
      "Cramming can produce better immediate recall but weaker delayed retention. Distributed review is more durable.",
    points: [
      "Next-day recall may look similar or slightly better with massed study",
      "One-week and one-month retention favors spaced review",
      "EduMeUp recommends timing based on review need, not convenience",
    ],
  },
  {
    title: "Study 3: Testing Effect Magnitude",
    source: "Roediger & Karpicke (2006); Karpicke & Roediger (2008)",
    summary:
      "Retrieval practice outperforms restudying on delayed tests, with medium-to-large effects in typical designs.",
    points: [
      "Students often misjudge re-reading as more effective due to fluency",
      "Desirable difficulty supports stronger encoding and recall",
      "Practice questions are embedded throughout Moodle flow",
    ],
  },
  {
    title: "Study 4: Interleaving vs. Blocking in Mathematics",
    source: "Rohrer & Taylor (2007); Taylor & Rohrer (2010)",
    summary:
      "Blocked practice feels easier during practice; interleaving improves discrimination and delayed test performance.",
    points: [
      "Blocked: high practice comfort, weaker transfer",
      "Interleaved: harder in-session, stronger delayed outcomes",
      "H5P sequencing intentionally mixes problem families",
    ],
  },
  {
    title: "Study 5: AI Support in Secondary Education",
    source: "Kasneci et al. (2023); VanLehn (2011); Mollick & Mollick (2023)",
    summary:
      "AI support helps when designed for guidance and integrated with structured practice and human oversight.",
    points: [
      "24/7 support is useful for routine conceptual clarification",
      "Socratic prompting outperforms direct-answer dependence",
      "Human tutor guidance remains essential for complex misconceptions",
    ],
  },
];

const roadmap = [
  [
    "Phase 1: Literature Review",
    "Complete",
    "Systematic review of 200+ peer-reviewed studies and principle mapping",
  ],
  [
    "Phase 2: Design Integration",
    "Complete",
    "Translation of research principles into Moodle + H5P feature architecture",
  ],
  [
    "Phase 3: Pilot Testing",
    "Ongoing",
    "N=127 tracked over 3–6 months with preliminary positive signals",
  ],
  [
    "Phase 4: Randomised Controlled Trial",
    "Planned 2026–2027",
    "500+ O-Level students, control comparison, independent evaluation",
  ],
  [
    "Phase 5: Publication & Peer Review",
    "Planned 2027–2028",
    "Journal submissions, conference dissemination, methodology transparency",
  ],
];

const references = [
  "Bjork, R. A. (1994). Memory and metamemory considerations in the training of human beings.",
  "Cepeda, N. J., et al. (2006). Distributed practice in verbal recall tasks. Psychological Bulletin.",
  "Chi, M. T., et al. (1994). Eliciting self-explanations improves understanding. Cognitive Science.",
  "Dunlosky, J., et al. (2013). Effective learning techniques. Psychological Science in the Public Interest.",
  "Ebbinghaus, H. (1885). Memory: A Contribution to Experimental Psychology.",
  "Freeman, S., et al. (2014). Active learning increases student performance. PNAS.",
  "Kasneci, E., et al. (2023). LLM opportunities and challenges in education.",
  "Karpicke, J. D., & Blunt, J. R. (2011). Retrieval practice produces more learning.",
  "Mayer, R. E. (2009). Multimedia Learning (2nd ed.).",
  "Mollick, E. R., & Mollick, L. (2023). AI teaching strategies.",
  "Paivio, A. (1986). Mental Representations: A Dual Coding Approach.",
  "Roediger, H. L., & Karpicke, J. D. (2006). Test-enhanced learning.",
  "Rohrer, D., & Taylor, K. (2007). Shuffling mathematics practice improves learning.",
  "Sweller, J. (1988). Cognitive load during problem solving.",
  "VanLehn, K. (2011). Relative effectiveness of tutoring systems.",
];

export default function Research() {
  return (
    <Layout>
      <section className="pt-28 pb-24 bg-[#1e1b4b] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.2)_0%,transparent_60%)]" />
        <div className="container-custom max-w-6xl relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-blue-400/20 text-blue-200 border border-blue-400/40 mb-6 px-4 py-1.5 uppercase tracking-widest text-xs font-semibold">
              Research & Development
            </Badge>
            <h1 className="text-5xl md:text-6xl text-white font-semibold leading-tight mb-5">
              Where Cognitive Science Meets <span className="text-blue-400">Educational Technology</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 font-medium mb-8">PROOF, NOT PROMISES</p>
            <p className="text-blue-100 text-lg leading-relaxed mb-5">
              Education is too important to rely on guesswork. EduMeUp is built on peer-reviewed learning science, not trends.
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-[14px] text-left mb-12 max-w-3xl mx-auto">
              <div className="p-4 rounded-2xl bg-white/10 border border-white/15">Others: Build features first, then find research to justify</div>
              <div className="p-4 rounded-2xl bg-blue-500/20 border border-blue-300/40">EduMeUp: Study research first, then design features accordingly</div>
            </div>
            <p className="text-[14px] text-blue-200/90 font-medium mb-8">
              Powered by: Moodle 4.5.1 LMS · H5P Interactive Activities · AI Chatbot · Multilingual Support
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-12">
            {byNumbers.map(([value, label]) => (
              <div key={value} className="rounded-2xl bg-white/10 border border-white/20 p-4 text-center">
                <p className="text-2xl font-semibold text-blue-300">{value}</p>
                <p className="text-xs text-blue-100 font-medium mt-1">{label}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-[14px] text-blue-100/90 mb-8">
            For the full academic treatment — 60+ citations, 22 study briefs, and complete APA references — download our Learning Science Whitepaper v1.0.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#pillars">
              <Button size="lg" className="bg-[#2366c9] hover:bg-[#1d57ac] text-white h-14 px-8 rounded-2xl font-semibold">
                Explore Our Methodology <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <a href="/downloads/learning-science-whitepaper-v1.pdf">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#1e1b4b] h-14 px-8 rounded-2xl font-semibold">
                Download Whitepaper <Download className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-28 bg-white">
        <div className="container-custom max-w-6xl">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold text-[#1e1b4b] mb-4">The Crisis of Unscientific Education</h2>
            <p className="text-lg text-black font-medium">Why most learning fails — and what science says we should do instead.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 mb-14">
            <Card className="border-[#2366c9]  border-2 border-red-100">
              <CardHeader>
                <CardTitle className="text-2xl text-[#1e1b4b] flex items-center gap-2">
                   The Forgetting Curve
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-slate-700 font-medium">
                <p>• Within 24 hours: Students can forget approximately 70% without structured review.</p>
                <p>• Within 1 week: Up to 90% may be forgotten without reinforcement.</p>
                <p>• After exams: Knowledge can fade rapidly without continued retrieval practice.</p>
                <p className="text-xs text-black pt-2">Source: Ebbinghaus, H. (1885). Memory: A Contribution to Experimental Psychology.</p>
              </CardContent>
            </Card>

            <Card className="border-[#2366c9]  border-2 border-blue-100">
              <CardHeader>
                <CardTitle className="text-2xl text-[#1e1b4b]">The Passive Learning Trap</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-[15px] leading-relaxed">
                {[
                  ["Lecture / teacher talk", "Very low"],
                  ["Passive reading", "Low"],
                  ["Watching videos", "Low–Moderate"],
                  ["Practice by doing", "High"],
                  ["Teaching others", "Very High"],
                ].map(([method, retention], i) => (
                  <div key={method} className={`flex justify-between p-3 rounded-xl ${i >= 3 ? "bg-blue-50 border border-blue-100" : "bg-slate-50 border border-slate-100"}`}>
                    <span className="font-medium text-slate-700">{method}</span>
                    <span className="font-semibold text-[#1e1b4b]">{retention}</span>
                  </div>
                ))}
                <p className="text-xs text-black pt-3">
                  Note: We avoid unsupported percentage claims often attributed to Dale&apos;s Cone. Directional evidence favoring active methods is robust across independent studies.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-[#2366c9]  border-2 border-blue-100 bg-blue-50/40">
            <CardHeader>
              <CardTitle className="text-2xl text-[#1e1b4b]">The Solution: Evidence-Based Design</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {whatWorks.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-[14px] font-medium text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-[#2366c9] mt-0.5" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="text-center mt-6">
                <a href="#pillars">
                  <Button className="bg-[#1e1b4b] hover:bg-[#17153c] text-white rounded-xl">See Our 5 Pillars <ArrowRight className="ml-2 h-4 w-4" /></Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-24 md:py-28 bg-blue-50/60">
        <div className="container-custom max-w-6xl">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl font-semibold text-[#1e1b4b] mb-4">Why Most EdTech Gets Research Wrong</h2>
            <p className="text-black font-medium">Most platforms add “research-backed” as an afterthought. We reverse the order.</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-blue-100 bg-white">
            <table className="w-full text-[15px] leading-relaxed">
              <thead>
                <tr className="bg-[#1e1b4b] text-white">
                  <th className="p-4 text-left font-semibold">What They Do</th>
                  <th className="p-4 text-left font-semibold">What Research Says</th>
                </tr>
              </thead>
              <tbody>
                {edtechResearchGap.map(([left, right], index) => (
                  <tr key={left} className={index % 2 ? "bg-blue-50/40" : "bg-white"}>
                    <td className="p-4 border-t border-blue-100 text-slate-700 font-medium">{left}</td>
                    <td className="p-4 border-t border-blue-100 text-[#1e1b4b] font-medium">{right}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-black font-medium leading-relaxed mt-8">
            EduMeUp is science-first, technology-second. Our H5P activities, AI questioning, and spaced review recommendations exist because learning science requires them — not because they are trendy features.
          </p>
        </div>
      </section>

      <section id="pillars" className="py-24 md:py-28 bg-white">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-semibold text-[#1e1b4b] mb-4">5 Pillars of Evidence-Based Learning</h2>
            <p className="text-black font-medium">The research foundation of EduMeUp&apos;s 10X Learning Leap Model™</p>
          </div>

          <div className="space-y-8">
            {pillars.map((pillar) => (
              <Card key={pillar.title} className="border-blue-100">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#1e1b4b] flex items-center gap-3">
                    <pillar.icon className="h-5 w-5 text-[#2366c9]" />
                    {pillar.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-slate-700 font-medium">{pillar.science}</p>

                  <div>
                    <p className="text-[14px] font-semibold text-[#2366c9] mb-2">Key Research</p>
                    <div className="flex flex-wrap gap-2">
                      {pillar.studies.map((study) => (
                        <Badge key={study} className="bg-blue-100 text-[#1e1b4b] border border-blue-200">{study}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {pillar.myths.map(([myth, reality]) => (
                      <div key={myth} className="p-4 rounded-xl border border-blue-100 bg-blue-50/40">
                        <p className="text-xs font-semibold uppercase tracking-wider text-black mb-1">Myth</p>
                        <p className="text-[14px] text-slate-700 font-medium mb-3">{myth}</p>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#2366c9] mb-1">Reality</p>
                        <p className="text-[14px] text-[#1e1b4b] font-medium">{reality}</p>
                      </div>
                    ))}
                  </div>

                  <div>
                    <p className="text-[14px] font-semibold text-[#2366c9] mb-2">EduMeUp Implementation (Moodle + H5P)</p>
                    <div className="grid md:grid-cols-2 gap-2">
                      {pillar.implementation.map((point) => (
                        <p key={point} className="text-[14px] text-slate-700 font-medium flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#2366c9] mt-0.5" />
                          {point}
                        </p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-28 bg-blue-50/60">
        <div className="container-custom max-w-6xl">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl font-semibold text-[#1e1b4b] mb-4">From Science to Student Experience</h2>
            <p className="text-black font-medium">What these principles look like in your child&apos;s daily platform experience.</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-blue-100 bg-white">
            <table className="w-full text-[15px] leading-relaxed">
              <thead>
                <tr className="bg-[#1e1b4b] text-white">
                  <th className="p-4 text-left font-semibold">Research Principle</th>
                  <th className="p-4 text-left font-semibold">What Your Child Actually Does on EduMeUp</th>
                </tr>
              </thead>
              <tbody>
                {dailyExperienceRows.map(([principle, action], index) => (
                  <tr key={principle} className={index % 2 ? "bg-blue-50/40" : "bg-white"}>
                    <td className="p-4 border-t border-blue-100 text-[#1e1b4b] font-medium">{principle}</td>
                    <td className="p-4 border-t border-blue-100 text-slate-700 font-medium">{action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-8 text-slate-700 font-medium leading-relaxed">
            The result: Every minute on the platform is active. Students think, retrieve, explain, and apply — not passively consume.
          </p>
        </div>
      </section>

      <section className="py-24 md:py-28 bg-white">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-[#1e1b4b] mb-4">What the Research Actually Shows</h2>
            <p className="text-black font-medium">Five comparative effectiveness findings (full library in Whitepaper).</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {comparativeStudies.map((study) => (
              <Card key={study.title} className="border-blue-100 h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-[#1e1b4b]">{study.title}</CardTitle>
                  <p className="text-xs text-[#2366c9] font-semibold">Source: {study.source}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[15px] leading-relaxed text-slate-700 font-medium">{study.summary}</p>
                  {study.points.map((point) => (
                    <p key={point} className="text-[15px] leading-relaxed text-black font-medium flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#2366c9] mt-0.5" />
                      {point}
                    </p>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-28 bg-[#1e1b4b] text-white">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-white font-semibold mb-4">Our Preliminary Data</h2>
            <p className="text-blue-200 font-medium">Pilot study — honest, preliminary, promising.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="border-[#2366c9]  border-2 bg-[#0f1538] border-blue-300/50 text-white shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-white font-extrabold">Pilot Study Parameters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-white font-medium text-base leading-relaxed">
                <p className="text-white">• Sample: N=127 early-access students</p>
                <p className="text-white">• Profile: O-Level students, primarily Pakistan-based</p>
                <p className="text-white">• Duration: 3–6 months active platform use</p>
                <p className="text-white">• Limitation: Self-selected sample; no randomised control group yet</p>
              </CardContent>
            </Card>

            <Card className="border-[#2366c9]  border-2 bg-[#0f1538] border-blue-300/50 text-white shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-white font-extrabold">Observed Signals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-white font-medium text-base leading-relaxed">
                <p className="text-white">• 3 months: +15 to +20 percentage point mock improvement</p>
                <p className="text-white">• 6 months: +22 to +27 percentage point mock improvement</p>
                <p className="text-white">• Spaced review adherence: 82%</p>
                <p className="text-white">• Satisfaction: 4.6/5.0</p>
                <p className="text-white">• Practice completion: 850+ H5P questions per student on average</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-10 p-7 rounded-2xl bg-blue-500/20 border border-blue-300/30 text-blue-100 text-base leading-relaxed font-medium">
            We will not overstate these numbers. Causality requires RCT evidence. We will publish future results transparently — positive or negative.
          </div>
        </div>
      </section>

      <section className="py-24 md:py-28 bg-white">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-[#1e1b4b] mb-4">How We Validate Our Approach</h2>
            <p className="text-black font-medium">A five-phase methodology validation roadmap.</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-blue-100">
            <table className="w-full text-[15px] leading-relaxed">
              <thead>
                <tr className="bg-[#1e1b4b] text-white">
                  <th className="p-4 text-left font-semibold">Phase</th>
                  <th className="p-4 text-left font-semibold">Status</th>
                  <th className="p-4 text-left font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                {roadmap.map(([phase, status, description], index) => (
                  <tr key={phase} className={index % 2 ? "bg-blue-50/40" : "bg-white"}>
                    <td className="p-4 border-t border-blue-100 text-[#1e1b4b] font-medium">{phase}</td>
                    <td className="p-4 border-t border-blue-100 text-slate-700 font-medium">{status}</td>
                    <td className="p-4 border-t border-blue-100 text-black font-medium">{description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-28 bg-blue-50/60">
        <div className="container-custom max-w-6xl">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl font-semibold text-[#1e1b4b] mb-4">Honest Limitations</h2>
            <p className="text-black font-medium">Intellectual honesty in educational research matters.</p>
          </div>

          <Card className="border-[#2366c9]  border-2 border-blue-100 mb-8">
            <CardContent className="pt-7 grid md:grid-cols-2 gap-6 text-[15px] leading-relaxed text-slate-700 font-medium">
              <p>1) Sample size is currently small (N=127) for definitive causal claims.</p>
              <p>2) Selection bias is possible with early adopters.</p>
              <p>3) Causality is not yet established; multiple factors influence outcomes.</p>
              <p>4) Long-term retention data beyond 6 months needs expansion.</p>
              <p>5) Cross-cultural generalisability requires broader testing.</p>
              <p>6) Implementation fidelity varies by student usage intensity.</p>
              <p>7) Cultural context affects motivation and learning behaviors.</p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl border border-green-200 bg-green-50">
              <p className="font-medium text-green-700"> High Confidence</p>
              <p className="text-[14px] text-slate-700 mt-1">Methodology grounded in robust cognitive science literature.</p>
            </div>
            <div className="p-5 rounded-2xl border border-yellow-200 bg-yellow-50">
              <p className="font-medium text-yellow-700"> Moderate Confidence</p>
              <p className="text-[14px] text-slate-700 mt-1">Pilot signals are promising but remain preliminary.</p>
            </div>
            <div className="p-5 rounded-2xl border border-orange-200 bg-orange-50">
              <p className="font-medium text-orange-700"> Awaiting Evidence</p>
              <p className="text-[14px] text-slate-700 mt-1">RCT and diverse samples required for stronger causal claims.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-28 bg-white">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-[#1e1b4b] mb-4">Research Partnerships</h2>
            <p className="text-black font-medium">Building independent validation through collaboration.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {[
              ["LUMS", "Potential RCT collaboration (early-stage discussion)"],
              ["NUST", "Potential cognitive load analysis (early-stage discussion)"],
              ["AKU-IED", "Potential methodology training partnership (early-stage discussion)"],
            ].map(([institution, context]) => (
              <Card key={institution} className="border-blue-100">
                <CardHeader>
                  <CardTitle className="text-xl text-[#1e1b4b]">{institution}</CardTitle>
                </CardHeader>
                <CardContent className="text-[14px] text-black font-medium">{context}</CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-[#2366c9]  border-2 border-blue-100 bg-blue-50/50">
            <CardHeader>
              <CardTitle className="text-2xl text-[#1e1b4b]">Call for Research Collaboration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-[15px] leading-relaxed text-slate-700 font-medium">
              <p>We welcome independent evaluation partnerships in learning analytics, assessment design, and pedagogical innovation.</p>
              <p>We provide: platform access, anonymised data (with consent), technical support, and publication collaboration.</p>
              <p>We ask: rigorous methods, transparent reporting (positive or negative), and peer-review intent.</p>
              <InquiryDialog
                defaultType="consultation"
                title="Research Collaboration"
                trigger={<Button className="mt-3 bg-[#1e1b4b] hover:bg-[#17153c] text-white">Express Research Interest <ArrowRight className="ml-2 h-4 w-4" /></Button>}
              />
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-24 md:py-28 bg-blue-50/60">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-[#1e1b4b] mb-4">Ongoing R&D Initiatives</h2>
            <p className="text-black font-medium">Continuous improvement through measurable experiments.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {[
              ["Adaptive Spacing Optimisation", "Personalised intervals by individual forgetting profiles (Q2–Q3 2026)."],
              ["AI Chatbot Effectiveness", "A/B analysis across factual, conceptual, and motivational query types (Q1–Q3 2026)."],
              ["Interleaving Ratio Optimisation", "Formal testing around new/review mix effectiveness (Q3 2026)."],
              ["Metacognitive Feature Impact", "Confidence rating and self-assessment effect tracking (2026–2027)."],
              ["Social Learning Features", "Peer explanation pilots with quality safeguards (Q4 2026)."],
              ["Sleep-Optimised Review Scheduling", "Testing evening prompts aligned to consolidation findings (Q2 2026)."],
            ].map(([title, detail]) => (
              <Card key={title} className="border-blue-100">
                <CardHeader>
                  <CardTitle className="text-xl text-[#1e1b4b] flex items-center gap-2"><Beaker className="h-4 w-4 text-[#2366c9]" /> {title}</CardTitle>
                </CardHeader>
                <CardContent className="text-[15px] leading-relaxed text-black font-medium">{detail}</CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <InquiryDialog
              defaultType="consultation"
              title="Suggest a Research Question"
              trigger={<Button className="bg-[#2366c9] hover:bg-[#1d57ac] text-white rounded-xl">Suggest a Research Question <ArrowRight className="ml-2 h-4 w-4" /></Button>}
            />
          </div>
        </div>
      </section>

      <section className="py-24 md:py-28 bg-white">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-semibold text-[#1e1b4b] mb-4">Selected References</h2>
            <p className="text-black font-medium">Full APA reference list (60+) is available in the downloadable Whitepaper.</p>
          </div>

          <Card className="border-[#2366c9]  border-2 border-blue-100">
            <CardContent className="pt-7 space-y-4">
              {references.map((reference) => (
                <p key={reference} className="text-[15px] leading-relaxed text-slate-700 font-medium">• {reference}</p>
              ))}
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <a href="/downloads/learning-science-whitepaper-v1.pdf">
              <Button className="bg-[#1e1b4b] hover:bg-[#17153c] text-white rounded-xl">
                Download Full Reference List (60+ Citations) <Download className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-28 bg-blue-50/60">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-semibold text-[#1e1b4b] mb-4">FAQ — Research Questions</h2>
          </div>

          <div className="space-y-6">
            {[
              [
                "How does your AI chatbot implement research principles?",
                "It is designed as a thinking-prompt tool, not an answer-delivery system. It uses elaborative interrogation, Socratic prompts, retrieval cues, and metacognitive reflection.",
              ],
              [
                "What about learning styles?",
                "Evidence for matching instruction to preferred styles is weak. We apply methods that consistently work across learners: dual coding, active engagement, and retrieval practice.",
              ],
              [
                "Does this research apply to Pakistani students specifically?",
                "Core cognitive mechanisms are broadly robust. We are conducting Pakistan-specific validation to account for contextual differences in motivation, habits, and classroom norms.",
              ],
              [
                "You criticise gamification but still talk about engagement. Why?",
                "We avoid extrinsic reward mechanics and focus on intrinsic engagement: meaningful interaction, feedback, mastery progression, and cognitive challenge.",
              ],
              [
                "How do you handle conflicting findings?",
                "We use hierarchical evidence review, pilot-test features, and update design when better evidence appears.",
              ],
            ].map(([q, a]) => (
              <Card key={q} className="border-blue-100">
                <CardHeader>
                  <CardTitle className="text-lg text-[#1e1b4b]">{q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[15px] leading-relaxed text-black font-medium">{a}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <InquiryDialog
              defaultType="consultation"
              title="Ask a Research Question"
              trigger={<Button className="bg-[#2366c9] hover:bg-[#1d57ac] text-white rounded-xl">Ask Your Research Question <ArrowRight className="ml-2 h-4 w-4" /></Button>}
            />
          </div>
        </div>
      </section>

      <section className="py-24 md:py-28 bg-[#1e1b4b] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.25)_0%,transparent_60%)]" />
        <div className="container-custom max-w-6xl relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-10">
            <h2 className="text-4xl md:text-5xl text-white font-semibold mb-4">Proof + Action = Results</h2>
            <p className="text-blue-200 text-lg">Turn research into your child&apos;s success.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border-[#2366c9]  border-2 bg-white/5 border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-lg text-blue-300">1) Free Diagnostic Test</CardTitle>
              </CardHeader>
              <CardContent className="text-[15px] leading-relaxed text-blue-100 font-medium">See baseline performance and identify specific knowledge gaps in about 30 minutes.</CardContent>
            </Card>
            <Card className="border-[#2366c9]  border-2 bg-white/5 border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-lg text-blue-300">2) Free Platform Trial (7 Days)</CardTitle>
              </CardHeader>
              <CardContent className="text-[15px] leading-relaxed text-blue-100 font-medium">Explore sample lessons, H5P interactions, and AI support before committing.</CardContent>
            </Card>
            <Card className="border-[#2366c9]  border-2 bg-white/5 border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-lg text-blue-300">3) Schedule Consultation</CardTitle>
              </CardHeader>
              <CardContent className="text-[15px] leading-relaxed text-blue-100 font-medium">Speak with our pedagogy team for a no-pressure fit assessment.</CardContent>
            </Card>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-5 mb-8">
            <InquiryDialog
              defaultType="diagnostic"
              title="Free Diagnostic"
              trigger={<Button size="lg" className="h-14 px-8 rounded-2xl bg-[#2366c9] hover:bg-[#1d57ac] text-white font-semibold">Take Free Diagnostic <ArrowRight className="ml-2 h-4 w-4" /></Button>}
            />
            <Link href="/programs">
              <Button size="lg" variant="outline" className="h-14 px-8 rounded-2xl border-2 border-white text-white hover:bg-white hover:text-[#1e1b4b] font-semibold">Explore Our Platform</Button>
            </Link>
            <InquiryDialog
              defaultType="consultation"
              title="Schedule Consultation"
              trigger={<Button size="lg" variant="outline" className="h-14 px-8 rounded-2xl border-2 border-blue-300 text-blue-100 hover:bg-blue-300 hover:text-[#1e1b4b] font-semibold">Book Consultation</Button>}
            />
          </div>

          <div className="text-center text-[14px] text-blue-100/90 max-w-4xl mx-auto">
            Education based on evidence, not guesswork. Every feature, interaction, and pathway is built on cognitive science — not opinion.
          </div>
        </div>
      </section>
    </Layout>
  );
}
