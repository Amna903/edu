import { Layout } from "@/components/Layout";
import { PageSidebar } from "@/components/PageSidebar";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  Download,
  CheckCircle2,
  Brain,
  BarChart3,
  RefreshCw,
  Target,
  Layers,
  Zap,
  BookOpen,
  MessageSquare,
  Search,
  Beaker,
} from "lucide-react";
import { Link } from "wouter";
import { InquiryDialog } from "@/components/InquiryDialog";

// ─── DATA ────────────────────────────────────────────────────────────────────

const trustStrip = [
  ["10+", "Peer-Reviewed Research Sources"],
  ["11", "Evidence-Based Principles"],
  ["200+", "Studies Reviewed"],
  ["5", "Pillars Implemented"],
  ["N=127", "Ongoing Pilot Study"],
];

const researchSections = [
  {
    number: 2,
    icon: BarChart3,
    color: "bg-brand-primary",
    title: "The Forgetting Curve",
    subtitle: "Ebbinghaus, H. (1885)",
    effectSize: "75–80% of new information lost within one week without reinforcement",
    findings: [
      "Hermann Ebbinghaus demonstrated through controlled self-experiments that newly learned information decays rapidly without reinforcement",
      "42% of new information is forgotten within 20 minutes of learning",
      "66% is forgotten within 24 hours",
      "Up to 75–80% is lost within one week without review or retrieval practice",
      "Critically: the rate of forgetting is consistent and measurable across subjects and learners",
    ],
    implementation: [
      "EduMeUp courses are structured to interrupt the forgetting curve at research-identified optimal intervals",
      "Topic quizzes are placed at the end of each topic — not as assessment, but as a forgetting-curve interrupt",
      "The platform schedules review of earlier topics before moving to new content",
      "Students who complete full modules have studied with built-in decay prevention, not just content exposure",
    ],
    citation: "Ebbinghaus, H. (1885). Über das Gedächtnis. Leipzig: Duncker & Humblot.",
  },
  {
    number: 3,
    icon: Zap,
    color: "bg-[#1e1b4b]",
    title: "Active Learning vs Passive Exposure",
    subtitle: "Freeman et al. (2014) | Dunlosky et al. (2013)",
    effectSize: "55% higher failure rate in passive vs active learning environments (Freeman et al., 2014)",
    findings: [
      "A landmark meta-analysis of 225 studies across STEM subjects found that students in active learning classrooms had exam scores 6% higher than in traditional lectures",
      "More significantly, failure rates in passive-learning classrooms were 55% higher than in active learning settings",
      "Students in passive settings showed greater short-term familiarity with content but collapsed under exam conditions requiring application",
      "Passive exposure creates the illusion of understanding without building the memory structures needed for retrieval under pressure",
    ],
    implementation: [
      "EduMeUp courses contain no passive video lectures",
      "Every topic module requires student action: drag-and-drop, fill-in-the-blank, structured writing, worked calculation",
      "H5P activities are not decorative — they are the primary learning mechanism",
      "Students cannot progress to assessment without completing interactive activities",
      "Practice by doing: research confirms this improves retention 10–15× over passive re-reading (Dunlosky et al., 2013)",
    ],
    citation: "Freeman, S. et al. (2014). Active learning increases student performance in science. PNAS, 111(23), 8410–8415.",
    note: "Note: Version 2 of this page has removed Dale's Cone percentages (5%/10%/20%) which did not appear in Dale's original 1969 work. Only peer-reviewed statistics are used.",
  },
  {
    number: 4,
    icon: Target,
    color: "bg-green-600",
    title: "Mastery Learning — No Moving Forward with Gaps",
    subtitle: "Bloom, B.S. (1984)",
    effectSize: "Effect size 2.0 — among the highest recorded in educational psychology (Bloom, 1984)",
    findings: [
      "Bloom's foundational 1984 study demonstrated that when students are required to demonstrate mastery before progression, achievement gaps narrow significantly",
      "Students taught under mastery conditions outperformed control groups by 84 percentile points on average",
      "Effect size of 2.0 — one of the largest recorded effects in educational research",
      "Mastery learning eliminates the accumulation of unresolved gaps that compound over time and become catastrophic at examination stage",
    ],
    implementation: [
      "EduMeUp begins every student journey with a diagnostic assessment — not content",
      "The diagnostic identifies which knowledge prerequisites are missing before instruction begins",
      "Students with identified gaps are routed through remediation before advancing",
      "Diagnostic-first philosophy: assess first, fill gaps, then teach — not teach and hope the student keeps up",
    ],
    citation: "Bloom, B.S. (1984). The 2 sigma problem. Educational Researcher, 13(6), 4–16.",
  },
  {
    number: 5,
    icon: RefreshCw,
    color: "bg-orange-500",
    title: "Retrieval Practice — Why Testing Builds Memory",
    subtitle: "Roediger & Karpicke (2006)",
    effectSize: "61% vs 40% retention at one month — 52% advantage for retrieval over restudy",
    findings: [
      "Roediger & Karpicke's 2006 study compared two groups: one restudied material repeatedly; the other practised retrieving it through low-stakes testing",
      "One week later, the retrieval practice group retained 56% of material; the restudy group retained 42%",
      "One month later, the gap widened: retrieval group 61%, restudy group 40%",
      "The paradox: the activity that feels less comfortable (being tested) produces dramatically better retention than re-reading",
      "The testing effect is one of the most replicated findings in educational psychology",
    ],
    implementation: [
      "Every EduMeUp topic ends with a retrieval quiz — not as summative assessment, but as a memory-building activity",
      "Quizzes are low-stakes: wrong answers trigger explanation, not penalties",
      "Students are tested before they see solutions — not after",
      "Topic quizzes are cumulative: they regularly include questions from previously completed topics",
      "The platform uses retrieval as the primary mechanism for long-term memory consolidation",
    ],
    citation: "Roediger, H.L., & Karpicke, J.D. (2006). Test-enhanced learning. Psychological Science, 17(3), 249–255.",
  },
  {
    number: 6,
    icon: Layers,
    color: "bg-purple-600",
    title: "Spaced Learning — Why Timing Is Not Optional",
    subtitle: "Cepeda et al. (2006)",
    effectSize: "10–30% retention advantage for spaced vs massed study at delayed test",
    findings: [
      "Cepeda et al.'s 2006 review of 254 studies confirmed that distributing study sessions across time produces significantly better long-term retention than equivalent massed study (cramming)",
      "Students who spaced their study outperformed massed-study students by an average of 10–30% on delayed retention tests",
      "The optimal spacing interval increases as the retention interval increases — the platform must adapt to the student's timeline",
      "Cramming produces short-term retrieval but near-total collapse of retention within 1–2 weeks",
    ],
    implementation: [
      "EduMeUp course design places topics in sequences that automatically introduce spacing between related concepts",
      "Earlier topics resurface within later modules — students review without being told they are reviewing",
      "The diagnostic system identifies topics studied long ago and flags them for revisit before examination",
      "Students preparing for Cambridge exams have a structured review calendar built into their course progression",
    ],
    citation: "Cepeda, N.J. et al. (2006). Distributed practice in verbal recall tasks. Psychological Bulletin, 132(3), 354–380.",
  },
  {
    number: 7,
    icon: Brain,
    color: "bg-brand-primary",
    title: "Worked Examples and Cognitive Load Theory",
    subtitle: "Sweller (1988) | Mayer (2009)",
    effectSize: "Effect size 0.57 for worked examples vs problem-solving alone (Sweller, 2006)",
    findings: [
      "John Sweller's Cognitive Load Theory (1988) established that novice learners have limited working memory capacity — overloading this capacity prevents learning even when content is accurate",
      "Mayer's Cognitive Theory of Multimedia Learning (2009) added: learning is most effective when instructional material manages cognitive load through clear sequencing and segmentation",
      "Worked examples — step-by-step demonstrations before independent problem-solving — reduce cognitive load and accelerate skill acquisition in novice learners",
      "Effect size for worked example instruction vs problem-solving alone: 0.57",
    ],
    implementation: [
      "EduMeUp content follows a strict sequence: concept explanation → worked example → guided practice → independent retrieval",
      "Students never face unseen problem types without first seeing worked examples at the same difficulty level",
      "Magic Sheets condense complex worked examples onto single reference pages — reducing extraneous cognitive load during revision",
      "H5P activities are segmented by difficulty — novice-level activities precede advanced ones within each topic",
    ],
    citation: "Sweller, J. (1988). Cognitive load during problem solving. Cognitive Science, 12(2), 257–285. | Mayer, R.E. (2009). Multimedia Learning (2nd ed.). Cambridge University Press.",
  },
  {
    number: 8,
    icon: MessageSquare,
    color: "bg-[#1e1b4b]",
    title: "Feedback — The Most Powerful Instructional Variable",
    subtitle: "Hattie (2009) | Black & Wiliam (1998)",
    effectSize: "Effect size 0.73 (Hattie, 2009) — top 10 most powerful influences on learning",
    findings: [
      "John Hattie's Visible Learning (2009) synthesised over 800 meta-analyses covering 250 million students — the most comprehensive review of educational research ever conducted",
      "Feedback had an effect size of 0.73 — placing it in the top 10 most powerful influences on student achievement",
      "Effective feedback has three components: it tells the student what they did, why it was wrong or right, and what to do next",
      "Feedback that only states correct/incorrect without explanation has minimal effect. Diagnostic feedback that guides the next action is transformative.",
      "Black & Wiliam (1998) found that formative assessment consistently raises student achievement by 0.4–0.7 standard deviations",
    ],
    implementation: [
      "Every wrong answer on every EduMeUp activity is followed by: (1) the correct answer, (2) a brief explanation of why, (3) the underlying concept",
      "The platform does not tell students their score and move on — it builds feedback into the learning sequence",
      "Diagnostic tests produce automated reports with specific gap identification and recommended next steps",
      "Teachers and parents receive performance dashboards showing error patterns — not just completion status",
    ],
    citation: "Hattie, J. (2009). Visible Learning. Routledge. | Black, P., & Wiliam, D. (1998). Assessment and classroom learning. Assessment in Education, 5(1), 7–74.",
  },
  {
    number: 9,
    icon: Search,
    color: "bg-teal-600",
    title: "Dual Coding — Why Visuals and Text Together Work",
    subtitle: "Paivio (1971, 1986) | Mayer (2001, 2009) — NEW in Version 2",
    effectSize: "89% more learning with explanatory text + visuals vs text alone (Mayer, 2009)",
    findings: [
      "Allan Paivio's Dual Coding Theory (1971, 1986) established that human memory uses two separate but connected systems: one for verbal information and one for visual/spatial information",
      "When both systems are activated simultaneously — through text combined with a relevant image, diagram, or animation — memory encoding is significantly stronger than either channel alone",
      "Mayer's Cognitive Theory of Multimedia Learning (2001, 2009) confirmed this in educational contexts: students who received text and relevant visuals together learned on average 89% more than those who received text alone",
      "The key qualifier: visuals must be explanatory and directly relevant — decorative images have no learning effect",
    ],
    implementation: [
      "EduMeUp's H5P modules combine written concept explanations with annotated diagrams, interactive visuals, and structured worked examples — not decorative images",
      "Every Physics, Chemistry, and Biology module includes subject-specific diagrams alongside written explanation for every concept",
      "Magic Sheets are dual-coded by design: each page combines key text with a visual summary structure",
      "The platform never uses text-only explanations for topics that have a spatial or visual component",
    ],
    citation: "Paivio, A. (1986). Mental Representations. Oxford University Press. | Mayer, R.E. (2009). Multimedia Learning (2nd ed.). Cambridge University Press.",
    isNew: true,
  },
  {
    number: 10,
    icon: Target,
    color: "bg-orange-500",
    title: "Transfer — Preparing Students for Questions They Have Never Seen",
    subtitle: "Perkins & Salomon (1989)",
    effectSize: "Transfer requires deep structural understanding — surface pattern-matching fails under novel exam conditions",
    findings: [
      "Cambridge O-Level examinations are explicitly designed to test transfer: the ability to apply knowledge to novel, unseen problems",
      "Perkins & Salomon (1989) identified the conditions required for transfer: deep understanding of underlying principles (not surface features), varied practice across contexts, and metacognitive awareness",
      "Students who only practise past paper patterns without conceptual understanding can mimic correct answers for familiar question types — but collapse when Cambridge examiners modify the framing",
      "Rote memorisation and surface pattern-matching are the most common causes of unexpected O-Level failure in students who appeared well-prepared",
    ],
    implementation: [
      "EduMeUp teaches concepts before procedures — students understand why before how",
      "Past paper solutions are presented with examiner insight: what the question is really testing, what common errors candidates make, and what the mark scheme rewards",
      "Unlike standard tutoring systems that only check for correct answers, EduMeUp's AI Tutor evaluates the student's entire reasoning process",
      "Students are regularly given unfamiliar question framings of familiar concepts — building the flexibility Cambridge examiners reward",
    ],
    citation: "Perkins, D., & Salomon, G. (1989). Are cognitive skills context-bound? Educational Researcher, 18(1), 16–25.",
  },
  {
    number: 11,
    icon: Brain,
    color: "bg-slate-700",
    title: "Self-Regulated Learning — Students Who Know How to Learn",
    subtitle: "Zimmerman (2002) | Hattie (2009)",
    effectSize: "Effect size 1.44 for metacognitive self-knowledge — highest of all studied learning influences (Hattie, 2009)",
    findings: [
      "Barry Zimmerman's research on self-regulated learning (2002) established that students who monitor their own progress, set specific goals, and use structured strategies outperform students of equal ability who study without this metacognitive layer",
      "Hattie (2009) confirmed: self-reported grades (students predicting their own performance) has an effect size of 1.44 — the highest single influence on learning",
      "Students without self-regulatory skills spend study time on what feels comfortable rather than what they need — creating the illusion of preparation without the substance",
      "The transition from school instruction to self-directed O-Level study is the most common failure point for Pakistani students entering the O-Level system",
    ],
    implementation: [
      "EduMeUp's diagnostic-first approach teaches students what they do not know before they begin — directly building accurate self-knowledge",
      "Student dashboards show topic-by-topic mastery in plain language: students always know where they are and where they need to go",
      "Study planning templates guide students to allocate time based on demonstrated gaps, not perceived confidence",
      "The platform is designed to build independent learners — students who can direct their own study when EduMeUp is not open",
    ],
    citation: "Zimmerman, B.J. (2002). Becoming a self-regulated learner. Theory Into Practice, 41(2), 64–70. | Hattie, J. (2009). Visible Learning. Routledge.",
  },
];

const modelPhases = [
  {
    phase: 1,
    name: "Diagnose",
    what: "AI Diagnostic identifies knowledge gaps before instruction begins",
    research: "Mastery Learning (Bloom, 1984); Formative Assessment (Black & Wiliam, 1998)",
    color: "bg-brand-primary",
  },
  {
    phase: 2,
    name: "Build",
    what: "Interactive H5P modules deliver concept → worked example → guided practice — with dual-coded visuals throughout",
    research: "Active Learning (Freeman, 2014); Dual Coding (Paivio, 1986; Mayer, 2009)",
    color: "bg-[#1e1b4b]",
  },
  {
    phase: 3,
    name: "Retrieve",
    what: "Low-stakes topic quizzes build memory through retrieval. Cumulative quizzes resurface earlier learning at optimal intervals.",
    research: "Retrieval Practice (Roediger & Karpicke, 2006); Spaced Learning (Cepeda et al., 2006)",
    color: "bg-slate-600",
  },
  {
    phase: 4,
    name: "Apply",
    what: "Past paper practice with examiner insight trains transfer to novel Cambridge exam questions",
    research: "Transfer (Perkins & Salomon, 1989); Cognitive Load / Worked Examples (Sweller, 1988)",
    color: "bg-slate-700",
  },
];

const rdInitiatives = [
  {
    title: "Cambridge Examiner Report Analysis",
    detail: "EduMeUp's Chief Advisor reads every published Cambridge examiner report for all subjects on the platform. Common student errors identified by examiners are used to add new content, revise existing explanations, and update question banks.",
  },
  {
    title: "Extended Examiner Knowledge Bases",
    detail: "For each O-Level subject, EduMeUp maintains an internal Extended Examiner Knowledge Base — a structured database of the most penalised student errors in Cambridge examinations, sourced directly from examiner reports.",
  },
  {
    title: "Learning Path Refinement",
    detail: "When data shows students consistently failing at a particular topic quiz, the preceding module is reviewed and revised — content, activity design, or sequencing may all be adjusted. Courses are not static after publication.",
  },
  {
    title: "Syllabus Currency",
    detail: "Cambridge syllabuses update on a 3–4 year cycle. EduMeUp monitors all Cambridge syllabus announcements and updates course content to match the current examination specification before the affected examination series.",
  },
  {
    title: "AI Tutor Validation",
    detail: "The AI Tutor is tested periodically against Cambridge past paper questions. Responses that would not meet Cambridge mark scheme standards are used to improve the tutor's knowledge base.",
  },
  {
    title: "Pedagogical Literature Review",
    detail: "The platform's instructional design team reviews newly published research in cognitive science and educational psychology. Where new findings suggest improvements, changes are evaluated and implemented on a structured review cycle.",
  },
];

const referenceSummary = [
  { num: 1, principle: "Forgetting Curve (Ebbinghaus)", stat: "75–80% of new information lost within one week without reinforcement" },
  { num: 2, principle: "Active Learning (Freeman et al.)", stat: "55% higher failure rate in passive classrooms; 6% higher exam scores" },
  { num: 3, principle: "Practice by Doing (Dunlosky et al.)", stat: "10–15× retention advantage over passive re-reading" },
  { num: 4, principle: "Mastery Learning (Bloom)", stat: "Effect size 2.0 — among the highest in educational research" },
  { num: 5, principle: "Retrieval Practice (Roediger & Karpicke)", stat: "52% retention advantage over restudy at one month" },
  { num: 6, principle: "Spaced Learning (Cepeda et al.)", stat: "10–30% retention advantage for spaced vs massed study" },
  { num: 7, principle: "Worked Examples (Sweller)", stat: "Effect size 0.57 vs problem-solving alone" },
  { num: 8, principle: "Feedback (Hattie)", stat: "Effect size 0.73 — top 10 most powerful educational influences" },
  { num: 9, principle: "Dual Coding (Paivio / Mayer)", stat: "89% more learning with text + explanatory visuals vs text alone" },
  { num: 10, principle: "Transfer (Perkins & Salomon)", stat: "Deep understanding required — surface pattern-matching fails under novel exam questions" },
  { num: 11, principle: "Self-Regulated Learning (Zimmerman / Hattie)", stat: "Effect size 1.44 for metacognitive self-knowledge — highest of all studied influences" },
];

// ─── RESEARCH SECTION CARD ───────────────────────────────────────────────────

function ResearchCard({ section }: { section: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      {/* Header band */}
      <div className={`${section.color} text-white rounded-t-[2rem] px-8 py-5 flex items-center gap-4`}>
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
          {section.number}
        </div>
        <section.icon className="h-5 w-5 text-white/80" />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold text-white">{section.title}</h3>
            {section.isNew && (
              <span className="bg-yellow-400 text-yellow-900 text-[12px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                New in v2
              </span>
            )}
          </div>
          <p className="text-[12px] text-white/60 font-medium mt-0.5">{section.subtitle}</p>
        </div>
      </div>

      {/* Body */}
      <div className="bg-blue-50/60 rounded-b-[2rem] p-8 border-4 border-white hover:shadow-2xl transition-all duration-300">
        {/* Effect size callout */}
        <div className="border-l-4 border-brand-primary bg-white rounded-r-xl p-4 mb-6">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-primary mb-1">Effect Size / Key Statistic</p>
          <p className="text-base font-bold text-slate-900">{section.effectSize}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* What research found */}
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-primary mb-3">What the Research Found</p>
            <ul className="space-y-2">
              {section.findings.map((f: any, i: number) => (
                <li key={i} className="flex items-start gap-2 text-[13px] text-slate-700 leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-[theme.colors.primary] mt-1.5 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* How EduMeUp applies */}
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-primary mb-3">How EduMeUp Applies This</p>
            <ul className="space-y-2">
              {section.implementation.map((impl: any, i: number) => (
                <li key={i} className="flex items-start gap-2 text-[13px] text-slate-700 leading-relaxed">
                  <CheckCircle2 className="h-4 w-4 text-brand-primary mt-0.5 flex-shrink-0" />
                  {impl}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {section.note && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
            <p className="text-[12px] text-amber-800 font-medium">{section.note}</p>
          </div>
        )}

        <p className="text-[12px] text-slate-400 italic">{section.citation}</p>
      </div>
    </motion.div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────

const researchSidebarLinks = [
  { label: "Research Overview", href: "#overview" },
  { label: "The Core Problem", href: "#core-problem" },
  { label: "11 Evidence-Based Principles", href: "#research-principles" },
  { label: "— The Forgetting Curve", href: "#2-the" },
  { label: "— Active Learning", href: "#3-active" },
  { label: "— Mastery Learning", href: "#4-mastery" },
  { label: "— Retrieval Practice", href: "#5-retrieval" },
  { label: "— Spaced Learning", href: "#6-spaced" },
  { label: "— Worked Examples", href: "#7-worked" },
  { label: "— Feedback", href: "#8-feedback" },
  { label: "— Dual Coding", href: "#9-dual" },
  { label: "— Transfer Learning", href: "#10-transfer" },
  { label: "— Self-Regulated Learning", href: "#11-self-regulated" },
  { label: "The 10X Model™", href: "#10x-model" },
  { label: "R&D Process", href: "#rd-process" },
  { label: "Quick Reference", href: "#summary" },
  { label: "Get Started", href: "#cta" },
];

export default function Research() {
  return (
    <Layout>
      <div className="flex min-h-screen bg-white">
        <PageSidebar
          title="Research Foundation"
          quote="50 years of cognitive science. 15+ peer-reviewed studies. All implemented."
          links={researchSidebarLinks}
        />

        <div className="flex-1 min-w-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex flex-col">
            {/* ═══════════════════════════════════════════════════════ HERO ══ */}
            <section id="overview" className="relative overflow-hidden bg-white py-8 md:py-12">
              <div className="container-custom max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-[1.4fr_0.9fr] gap-6 items-stretch">
                  {/* Left */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-brand-primary text-white relative overflow-hidden rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 shadow-2xl"
                  >
                    <div className="absolute -top-20 -right-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
                    <div className="relative z-10 max-w-2xl space-y-6">
                      <p className="text-[11px] font-black uppercase tracking-[0.28em] text-blue-100">Research &amp; R&amp;D</p>
                      <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.05] tracking-tight text-white">
                        Why EduMeUp Works.{" "}
                        <span className="text-blue-200">The Science Behind the System.</span>
                      </h1>
                      <p className="text-lg md:text-xl text-blue-50/90 leading-relaxed max-w-2xl">
                        EduMeUp is not built on opinions, trends, or what has always been done. Every design
                        decision is rooted in peer-reviewed research from cognitive science, educational psychology,
                        and instructional design.
                      </p>
                      <div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-5 md:p-6 backdrop-blur-sm">
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-100 mb-3">Our Commitment</p>
                        <p className="text-base md:text-lg text-white/90 leading-relaxed">
                          If you are a parent making a decision, a teacher evaluating a platform, or a student choosing how to study — this is the evidence you deserve to see.
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4 pt-2">
                        <a href="#research-principles">
                          <Button className="bg-white text-brand-primary hover:bg-blue-50 font-semibold px-6 py-3 rounded-xl text-base shadow-md flex items-center gap-2">
                            Explore the Research <ArrowRight className="h-4 w-4" />
                          </Button>
                        </a>
                        <a href="/downloads/learning-science-whitepaper-v1.pdf">
                          <Button variant="outline" className="border border-white/35 text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-xl text-base flex items-center gap-2">
                            <Download className="h-4 w-4" /> Download Whitepaper
                          </Button>
                        </a>
                      </div>
                    </div>
                  </motion.div>

                  {/* Right: stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="rounded-2xl border border-blue-100 bg-white shadow-sm rounded-[2rem] md:rounded-[3rem] p-8 md:p-10 shadow-lg"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(35,102,201,0.18),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(79,134,224,0.16),transparent_35%)]" />
                    <div className="relative z-10 flex h-full flex-col justify-between gap-6">
                      <div>
                        <p className="text-[11px] font-black uppercase tracking-[0.28em] text-brand-primary mb-4">By the Numbers</p>
                        <div className="space-y-3">
                          {trustStrip.map(([val, label]) => (
                            <div key={val} className="rounded-2xl border border-blue-100 bg-white shadow-sm rounded-2xl p-4 flex items-center gap-4 shadow-sm">
                              <p className="text-2xl font-semibold text-brand-primary min-w-[70px]">{val}</p>
                              <p className="text-[12px] font-medium text-slate-600">{label}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="border-t border-blue-100 pt-4">
                        <p className="text-[12px] text-slate-500 font-medium">
                          For the full academic treatment — 60+ citations, 22 study briefs, and complete APA references — download our Learning Science Whitepaper v1.0.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            <main className="w-full min-w-0 space-y-0">

                {/* ══════════════════════════════ SECTION 1: CORE PROBLEM ══ */}
                <section id="core-problem" className="py-16 md:py-24 bg-[#FFF8EC] -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0">
                  <div className="w-full max-w-6xl mx-auto">
                    <div className="mb-10">
                      <p className="text-[11px] font-black uppercase tracking-[0.28em] text-brand-primary mb-3">The Problem We Set Out to Solve</p>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 mb-6">
                        Why Most Students Forget Almost Everything — Even After Studying Hard
                      </h2>
                    </div>

                    <div className="border-l-4 border-brand-primary bg-white p-6 rounded-r-[1.5rem] mb-10">
                      <p className="text-base text-slate-700 leading-relaxed mb-4">
                        More than a century of research in cognitive science has established three findings that most educational systems still ignore:
                      </p>
                      <ul className="space-y-3">
                        {[
                          "Forgetting is predictable — it follows a measurable curve that begins within minutes of learning",
                          "Retention depends almost entirely on how learning is structured — not on how much time is spent",
                          "Passive exposure to information produces minimal durable memory, regardless of how many hours it lasts",
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-base font-medium text-slate-700">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-10">
                      {[
                        { stat: "5%", label: "Retention from lectures after 24 hours", color: "text-red-500" },
                        { stat: "70%", label: "Of new content forgotten within 24 hours (Ebbinghaus)", color: "text-red-500" },
                        { stat: "90%", label: "Lost within 30 days — without systematic reinforcement", color: "text-red-500" },
                      ].map((item) => (
                        <div key={item.stat} className="bg-white rounded-[1.5rem] p-8 shadow-sm text-center hover:-translate-y-1 transition-all">
                          <p className={`text-4xl font-semibold ${item.color} mb-3`}>{item.stat}</p>
                          <p className="text-base text-slate-600 font-medium">{item.label}</p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-brand-primary text-white relative overflow-hidden p-6 rounded-[1.5rem]">
                      <p className="text-white font-semibold mb-1">The conclusion is clear</p>
                      <p className="text-blue-100 text-base leading-relaxed">
                        The problem is not student effort. It is instructional design. Students who study for hours using ineffective methods will consistently underperform students who study for less time using methods that align with how memory actually works. This is the problem EduMeUp was built to solve.
                      </p>
                    </div>
                  </div>
                </section>

                {/* ════════════════════════ SECTION 2–11: RESEARCH PRINCIPLES ══ */}
                <section id="research-principles" className="bg-blue-50/40 py-16 md:py-24 -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0">
                  <div className="w-full max-w-6xl mx-auto">
                    <div className="text-center mb-10 md:mb-16">
                      <p className="text-[11px] font-black uppercase tracking-[0.28em] text-brand-primary mb-3">The Evidence</p>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 mb-4">
                        11 Evidence-Based Principles — Implemented, Not Just Cited.
                      </h2>
                      <p className="text-base text-slate-700 max-w-3xl mx-auto">
                        Every step in EduMeUp traces directly to peer-reviewed cognitive science research. Each principle below includes the key finding, the effect size, and how it is implemented on the platform.
                      </p>
                    </div>

                    <div className="space-y-6" id="2-forgetting">
                      {researchSections.map((section, i) => (
                        <div key={section.number} id={`${section.number}-${section.title.split(" ")[0].toLowerCase()}`}>
                          <ResearchCard section={section} />
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* ════════════════════════════ SECTION 12: 10X MODEL ══ */}
                <section id="10x-model" className="bg-brand-primary text-white relative overflow-hidden py-16 md:py-24 -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0">
                  <div className="w-full max-w-6xl mx-auto">
                    <div className="text-center mb-10 md:mb-16">
                      <p className="text-[11px] font-black uppercase tracking-[0.28em] text-blue-300 mb-3">Our Pedagogical Framework</p>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4">
                        The 10X Learning Leap Model™
                      </h2>
                      <p className="text-xl text-blue-300 font-medium mb-4">
                        Two phases. Eight research-validated steps. One systematic transformation.
                      </p>
                      <p className="text-base text-blue-100/80 max-w-3xl mx-auto">
                        The eleven research principles documented above are integrated into a single instructional framework — the EduMeUp 10X Learning Leap Model — which structures how every course, every module, and every assessment on the platform is designed.
                      </p>
                    </div>

                    <div className="overflow-x-auto rounded-[1.5rem] shadow-sm mb-8">
                      <table className="w-full min-w-[600px]">
                        <thead>
                          <tr className="bg-white/20 text-white text-xs uppercase tracking-wider">
                            <th className="p-4 text-left font-semibold">Phase</th>
                            <th className="p-4 text-left font-semibold">Name</th>
                            <th className="p-4 text-left font-semibold">What Happens</th>
                            <th className="p-4 text-left font-semibold">Research Basis</th>
                          </tr>
                        </thead>
                        <tbody>
                          {modelPhases.map((row, i) => (
                            <tr key={i} className={i % 2 === 0 ? "bg-white/10" : "bg-white/5"}>
                              <td className="p-4 border-t border-white/10">
                                <span className={`inline-block text-white text-xs font-bold px-3 py-1 rounded-lg ${row.color}`}>{row.phase}</span>
                              </td>
                              <td className="p-4 border-t border-white/10 text-white font-bold theme.typography.fontSize.base">{row.name}</td>
                              <td className="p-4 border-t border-white/10 text-blue-100 text-[13px] leading-relaxed">{row.what}</td>
                              <td className="p-4 border-t border-white/10 text-blue-300 text-[12px] italic leading-relaxed">{row.research}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="text-center">
                      <a href="/how-it-works" className="inline-flex items-center gap-2 bg-white text-brand-primary font-semibold px-6 py-3 rounded-xl text-base hover:bg-blue-50 transition-colors">
                        Read the Full 8-Step Methodology <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </section>

                {/* ══════════════════════════════ SECTION 13: R&D PROCESS ══ */}
                <section id="rd-process" className="py-16 md:py-24 bg-[#FAFAF8] -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0">
                  <div className="w-full max-w-6xl mx-auto">
                    <div className="text-center mb-10 md:mb-16">
                      <p className="text-[11px] font-black uppercase tracking-[0.28em] text-brand-primary mb-3">Continuous R&amp;D at EduMeUp</p>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 mb-4">
                        Research Does Not End at Publication — Neither Does Ours.
                      </h2>
                      <p className="text-base text-slate-700 max-w-3xl mx-auto">
                        The eleven research principles on this page are the foundation — not the ceiling. EduMeUp treats its own platform as a live research environment. Every student interaction generates data. That data is used to refine the learning design continuously.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                      {rdInitiatives.map((initiative, i) => (
                        <Card key={i} className="rounded-2xl border border-blue-100 bg-white shadow-sm rounded-[1.5rem] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                          <CardHeader>
                            <CardTitle className="text-xl text-slate-900 flex items-center gap-2">
                              <Beaker className="h-5 w-5 text-brand-primary" />
                              {initiative.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-base text-slate-700 leading-relaxed font-medium">{initiative.detail}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="bg-brand-primary text-white relative overflow-hidden p-8 rounded-[2rem] text-center">
                      <p className="text-white font-semibold text-lg mb-2">Our Promise on Intellectual Honesty</p>
                      <p className="text-blue-100 text-base leading-relaxed max-w-3xl mx-auto">
                        We do not promise outcomes that our research does not support. We do not cite studies we have not read. And we do not publish percentages that were never in the original research. EduMeUp does not promise magic. It applies science — systematically.
                      </p>
                    </div>
                  </div>
                </section>

                {/* ══════════════════════════ SECTION 14: QUICK REFERENCE ══ */}
                <section id="summary" className="bg-blue-50/40 py-16 md:py-24 -mx-4 sm:-mx-6 lg:px-0">
                  <div className="w-full max-w-6xl mx-auto">
                    <div className="text-center mb-10 md:mb-16">
                      <p className="text-[11px] font-black uppercase tracking-[0.28em] text-brand-primary mb-3">Research Summary</p>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
                        Quick Reference — 11 Principles at a Glance
                      </h2>
                    </div>

                    <div className="overflow-x-auto rounded-[1.5rem] shadow-sm">
                      <table className="w-full min-w-[500px]">
                        <thead>
                          <tr className="bg-brand-primary text-white text-xs uppercase tracking-wider">
                            <th className="p-4 text-left font-semibold w-8">#</th>
                            <th className="p-4 text-left font-semibold">Research Principle</th>
                            <th className="p-4 text-left font-semibold">Key Statistic / Effect Size</th>
                          </tr>
                        </thead>
                        <tbody>
                          {referenceSummary.map((row, i) => (
                            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-blue-50/40"}>
                              <td className="p-4 border-t border-blue-100 text-brand-primary font-bold text-base">{row.num}</td>
                              <td className="p-4 border-t border-blue-100 text-slate-900 font-medium text-base">{row.principle}</td>
                              <td className="p-4 border-t border-blue-100 text-slate-700 font-medium text-base">{row.stat}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="text-center mt-8">
                      <a href="/downloads/learning-science-whitepaper-v1.pdf">
                        <Button className="bg-brand-primary hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl text-base flex items-center gap-2 mx-auto">
                          <Download className="h-4 w-4" /> Download Full Reference List (60+ Citations)
                        </Button>
                      </a>
                    </div>
                  </div>
                </section>

              </main>

      {/* ═══════════════════════════════════════════ FINAL CTA SECTION ══ */}
      <section id="cta" className="bg-brand-primary text-white relative overflow-hidden py-20 md:py-32 relative overflow-hidden">
        <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-blue-600 opacity-30 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-blue-600 opacity-30 blur-3xl" />
        <div className="container-custom max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-[1.05] mb-3 tracking-tight px-4">
            The Science Is Clear. The Question Is Whether Your Child's Platform Uses It.
          </h2>
          <p className="text-base text-blue-200 mb-12 max-w-3xl mx-auto">
            Every feature of EduMeUp — from the diagnostic you take on day one to the retrieval quiz you complete at the end of every topic — is grounded in the research on this page. Nothing is guesswork. Nothing is convention.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            {/* Primary */}
            <div className="bg-brand-primary border-4 border-white/20 rounded-[2rem] p-8 text-left flex flex-col shadow-2xl md:scale-105">
              <h3 className="text-xl font-semibold text-white mb-2">Take Free AI Diagnostic</h3>
              <p className="text-blue-200 text-sm font-semibold mb-4">See where you stand. No credit card.</p>
              <p className="text-white/80 text-base leading-relaxed mb-6 flex-1">
                Our AI identifies your exact sub-skill gaps and produces a personalised learning plan — the first step of the 8-step system.
              </p>
              <InquiryDialog
                defaultType="diagnostic"
                title="Free Diagnostic Assessment"
                trigger={
                  <Button className="w-full bg-white text-brand-primary hover:bg-blue-50 font-semibold py-3 rounded-xl text-base flex items-center justify-center gap-2">
                    Start Free Diagnostic <ArrowRight className="h-4 w-4" />
                  </Button>
                }
              />
            </div>

            {/* Secondary */}
            <div className="bg-white border-4 border-brand-primary rounded-[2rem] p-8 text-left flex flex-col shadow-xl">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Explore Free Resources</h3>
              <p className="text-brand-primary text-sm font-semibold mb-4">Experience the method firsthand.</p>
              <p className="text-slate-700 text-base leading-relaxed mb-6 flex-1">
                Try a free interactive demo — sample H5P lessons, spaced retrieval in action, and AI tutor guidance. No login required.
              </p>
              <Link href="/programs">
                <Button variant="outline" className="w-full border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-semibold py-3 rounded-xl text-base flex items-center justify-center gap-2">
                  Explore Our Platform <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Tertiary */}
            <div className="bg-slate-100 rounded-[2rem] p-8 text-left flex flex-col shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Download Research Reference PDF</h3>
              <p className="text-slate-500 text-sm font-semibold mb-4">40-page PDF. 15+ peer-reviewed studies. Full citations.</p>
              <p className="text-slate-600 text-base leading-relaxed mb-6 flex-1">
                For educators, school leaders, and parents who want to go deeper — the full research foundation behind the 10X Learning Leap Model™.
              </p>
              <a href="/downloads/learning-science-whitepaper-v1.pdf">
                <Button variant="outline" className="w-full border-2 border-slate-300 text-slate-700 hover:bg-slate-200 font-semibold py-3 rounded-xl text-base flex items-center justify-center gap-2">
                  <Download className="h-4 w-4" /> Download Free PDF
                </Button>
              </a>
            </div>
          </div>

          {/* Trust strip */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-blue-200 font-medium">
            {[
              " 2,000+ Students",
              " 25+ Countries",
              " University-Validated (3 years)",
              " 91% Pass Rate",
              " 30-Day Money-Back Guarantee",
              " 24/7 Cambridge Expert Support",
            ].map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </div>
        </div>
      </section>      </div>
        </div>
      </div>    </Layout>
  );
}
