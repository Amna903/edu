import { useEffect } from "react";
import { Link } from "wouter";
import { 
  ArrowRight, 
  BookOpen, 
  Users, 
  BarChart3, 
  GraduationCap, 
  CheckCircle2, 
  Globe, 
  Shield, 
  Database, 
  Lock, 
  UserCheck, 
  Zap,
  FileText,
  Calendar,
  User,
  Award,
  Target,
  Brain,
  TrendingUp,
  Clock,
  Headphones,
  Sparkles,
  LayoutDashboard,
  Layers,
  BookMarked
} from "lucide-react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";

// Service data structures based on the design document
const sectionAServices = [
  {
    code: "A1",
    title: "Cambridge Teacher Mastery Workshop — T2 CTMW",
    description: "7 modules · 7 CPD hours · Cambridge Certificate of Teaching Excellence (CCTE) · In-person and live online",
    advantage: "Transform any teacher into a Cambridge-ready specialist in one intensive day. Teachers leave with examiner-level mark scheme knowledge, AO1/AO2/AO3 calibrated lesson design, and retention-focused teaching strategies. This is Cambridge-specific technique — not generic pedagogy.",
    research: "Hattie (2009) — Teacher professional development effect size d=0.62. The highest school-level impact variable in educational research. One trained teacher improves outcomes for every student they teach — for the rest of their career."
  },
  {
    code: "A2",
    title: "Teacher Subject Knowledge Diagnostic — T1",
    description: "AI-powered assessment · Full gap report · Per subject · All 10 Cambridge O-Level subjects",
    advantage: "Every teacher begins their EduMeUp journey knowing precisely where their Cambridge subject knowledge and pedagogy gaps are. The T1 diagnostic identifies not just what the teacher does not know — but how they are currently teaching it and how that is affecting student outcomes. Development becomes targeted, not generic.",
    research: "Black & Wiliam (1998) — Diagnostic precision is the prerequisite for any effective professional development intervention. Generic CPD without prior diagnostic is demonstrably less effective than targeted, gap-specific training."
  },
  {
    code: "A3",
    title: "SMK Training Programme — T3",
    description: "Self-paced Moodle · Per subject · Subject Mastery Knowledge Certificate · 92% mastery gate",
    advantage: "The T3 SMK programme takes teachers from T1-identified knowledge gaps to full Cambridge subject mastery at examiner standard — not just content delivery standard. Teachers who complete T3 can teach every topic to the depth and precision Cambridge mark schemes require.",
    research: "Shulman (1986) — Pedagogical content knowledge (PCK) — knowing how to teach a subject at the required level — is the key differentiator between effective and ineffective subject teachers."
  },
  {
    code: "A4",
    title: "Cambridge Examiner Intelligence Training — T4",
    description: "Live online · 2-3 half-days · Examiner Intelligence Certificate · All 10 Cambridge subjects",
    advantage: "Teachers learn exactly how Cambridge examiners think — how they read a student response, apply the mark scheme, discriminate between Band 1 and Band 2 answers, and identify the specific errors that consistently lose marks. This is the most direct path to closing the gap between how teachers mark and how Cambridge examiners mark.",
    research: "Darling-Hammond et al. (2017) — Content-specific, practice-connected CPD that includes analysis of student work produces the largest and most durable changes in classroom teaching."
  },
  {
    code: "A5",
    title: "Classroom English Communication Course",
    description: "Interactive course · Urdu-speaker and Arabic-speaker editions · Available immediately",
    advantage: "Non-native English speaking teachers deliver Cambridge-standard classroom instruction with professional confidence and language accuracy. The specific language of Cambridge instruction — command words, mark-scheme vocabulary, academic register — is practised until it is automatic.",
    research: "Graham & Perin (2007) — Teacher language quality and precision directly impacts student academic language development and written response quality in all subjects."
  },
  {
    code: "A6",
    title: "Teacher Professional Learning Communities — PLCs",
    description: "Facilitated by EduMeUp · Ongoing · School-based or cross-school · Structured framework",
    advantage: "Teachers learn continuously from each other — sharing Cambridge mark scheme analysis, retrieval practice techniques, and AO-level lesson designs. EduMeUp provides the structure, resources, and research framework. PLCs prevent the 'one-time workshop' problem — professional development becomes embedded in school culture.",
    research: "Vescio et al. (2008) — Professional Learning Communities significantly and consistently improve student achievement across school types, subjects, and grade levels. The effect is largest when PLCs focus on student learning data."
  }
];

const sectionBServices = [
  {
    code: "B1",
    title: "T6 AI Teaching Tools Subscription",
    description: "5 AI-powered teaching tools · Monthly or annual subscription · Works for all 10 Cambridge subjects",
    advantage: "Cambridge-calibrated AI in every lesson: (1) generates retrieval openers from the school's own question bank, (2) analyses student responses against Cambridge mark schemes, (3) plans AO-aligned lessons automatically, (4) schedules class-level spaced retrieval, (5) generates student performance briefings before tutoring sessions. Teachers become more effective with less preparation time.",
    research: "VanLehn (2011) — AI tools that support teachers (not just students) produce effect sizes of d=0.76. AI tools aligned with Cambridge standards amplify the impact of trained teachers."
  },
  {
    code: "B2",
    title: "Curriculum Planning and Implementation Support",
    description: "Complete content infrastructure · Aligned to the school's Cambridge curriculum and timetable",
    advantage: "EduMeUp provides complete content infrastructure for curriculum delivery — diagnostic programmes, learning sequences, practice resources, evaluation tools, and personalised remedial plans — all aligned to the school's Cambridge curriculum targets and teaching timetable. Teachers facilitate and guide rather than create from scratch.",
    research: "Fullan & Quinn (2016) — Curriculum coherence and structured implementation, when combined with teacher professional development, produce the largest and most sustained improvement in student outcomes."
  },
  {
    code: "B3",
    title: "Purpose-Built Interactive Content — All 10 O-Level Subjects",
    description: "H5P interactive courses · AO-tagged · Past papers integrated · No passive video · Available now",
    advantage: "All lesson content, practice exercises, assessments, and past paper sets are ready — for all 10 Cambridge O-Level subjects. Teachers create nothing from scratch. Content is 100% H5P interactive — no passive video, no static PDFs. Every exercise requires active engagement from students.",
    research: "Freeman et al. (2014) — Active learning (interactive content vs. passive video) improves Cambridge examination performance by 6% and reduces examination failure rates by 55%."
  },
  {
    code: "B4",
    title: "Auto Assessment Session Management",
    description: "AI-generated assessments · Auto-scheduling · Instant grading · Zero teacher preparation",
    advantage: "Assessments across all 10 subjects are generated from the EduMeUp question bank, scheduled automatically, graded instantly, and results fed directly into the school analytics dashboard. Teachers set the frequency; EduMeUp handles generation, scheduling, grading, and reporting. No more setting, printing, marking, and recording.",
    research: "Brusilovsky (2001) — Adaptive assessment systems that automate generation and grading reduce teacher workload while increasing assessment frequency — and more frequent formative assessment consistently improves outcomes."
  },
  {
    code: "B5",
    title: "Ongoing Expert Support from EduMeUp Team",
    description: "Never alone after setup · Continuous guidance · Cambridge updates · Dedicated partnership contact",
    advantage: "EduMeUp's partnership does not end at onboarding. Schools receive continuous expert guidance on Cambridge syllabus updates, new platform features, teacher development progression, and technical support throughout the partnership. A dedicated partnership contact is assigned to every school.",
    research: "Joyce & Showers (2002) — Ongoing coaching and support after professional development is essential for transfer of training into consistent classroom practice. Without follow-through support, 90% of CPD has no measurable impact on student outcomes."
  }
];

const sectionCServices = [
  {
    code: "C1",
    title: "Learn How to Learn — Must-Have Course",
    description: "Grade 6+ · 6 modules · Available now · Cornell notes, spaced retrieval, exam strategy, academic independence",
    advantage: "Students learn how to study effectively — not just what to study. Cornell note-taking, time management, memory techniques (spaced retrieval, dual coding), exam preparation strategy, and academic independence. Students who complete this course get measurably more from every other course they take. The multiplier effect: one course that makes every subsequent course more effective.",
    research: "Zimmerman (2002) — Self-regulated learning is the single strongest predictor of long-term academic success across all subjects and all levels of schooling."
  },
  {
    code: "C2",
    title: "English Language Pathway — Grade 6 to O-Level",
    description: "6 courses: Vocabulary Mastery (Gr5-7) · RC68 Reading Comprehension (Gr6-8) · ESL1 · ESL2 · O-Level Bridge · Classroom English · All available",
    advantage: "A complete, CEFR-aligned English language pathway from Grade 6 vocabulary foundations through to Cambridge O-Level B2 standard. Every course uses H5P interactive content. A free AI diagnostic determines each student's entry point. Students who complete the pathway enter O-Level English courses with the language proficiency the examinations assume.",
    research: "Nation (2001) — Vocabulary breadth is the single strongest predictor of reading comprehension across all academic subjects. Council of Europe CEFR (2001) — Systematic, levelled language progression ensures measurable and verifiable language development."
  },
  {
    code: "C3",
    title: "Pre-O-Level Victory Programme",
    description: "4 subjects: Chemistry (11 chapters) · Mathematics (13 topics) · Physics (15 topics) · Biology · Certification exam included",
    advantage: "Covers the foundational concepts selected through Cambridge examiner report analysis as most predictive of O-Level success. Students who complete this programme enter O-Level study having already mastered 20-30% of the syllabus — and having earned a Pre-O-Level Certification confirming their readiness.",
    research: "Bloom (1968) — Mastery learning at the prerequisite level prevents cumulative knowledge gap compounding throughout subsequent study."
  },
  {
    code: "C4",
    title: "O-Level Bridge Courses — Sciences and Economics",
    description: "5 subjects: English · Chemistry · Physics · Mathematics · Economics · Mastery-gated · 80% before advancing",
    advantage: "Topic-selectable bridge courses targeting the specific foundational concepts students most commonly arrive at O-Level without. The AI diagnostic identifies which bridge topics each student needs — students take only the topics their results show they require. 80% mastery required before advancing to the full O-Level subject course.",
    research: "Vygotsky (1978) — Learning is most effective in the Zone of Proximal Development — just above current competency. Bridge courses place each student precisely in their ZPD for every topic."
  },
  {
    code: "C5",
    title: "Classroom English Communication — Student Edition",
    description: "Non-native English speaking students · Grade 7+ · Academic communication · Available now",
    advantage: "Students develop the specific English skills for academic participation: asking precise questions, understanding teacher instructions, seeking clarification, and using the academic language Cambridge examiners reward in written responses. Sections tagged by audience — teacher-only content is not shown to students.",
    research: "Graham & Perin (2007) — Students who articulate their subject knowledge clearly in academic English consistently perform better on Cambridge written assessments — not because their subject knowledge is stronger but because they can express it more precisely."
  },
  {
    code: "C6",
    title: "Homework and School Holiday Engagement Programmes",
    description: "School request basis · Topic-selectable · EduMeUp provides structured interactive content",
    advantage: "Structured learning programmes for homework and school holiday periods — preventing the learning loss that accumulates when students disengage during breaks. Schools request the topics to be covered; EduMeUp provides the interactive content aligned to those topics.",
    research: "Cooper et al. (1996) — Unstructured school holiday periods produce learning loss equivalent to 1 month of instructional time. Structured holiday programmes effectively prevent this loss when they maintain the retrieval and active learning principles."
  }
];

const sectionDServices = [
  {
    code: "D1",
    title: "AI-Powered Diagnostic Gap Analysis — Per Student",
    description: "Free 30-min (entry-level) · Paid 90-min (comprehensive) · 4 diagnostic types · Personalised remedial plan",
    advantage: "Four diagnostic types: O-Level Bridge (5 subjects), English Language Level Check, O-Level Subject (10 subjects), and ATP (Physics, Chemistry, Biology). Free 30-min diagnostic: percentage score, top 3 weaknesses, remedial actions, resource links. Paid 90-min: full gap analysis at AO1/AO2/AO3 level per topic, written remedial plan, full course sequence recommendation. Schools can run institutional diagnostics for entire cohorts.",
    research: "Bloom (1984) — Personalised instruction based on diagnostic data effect size d=2.0 — the highest in educational research. Black & Wiliam (1998) — formative diagnostic before instruction improves outcomes by 0.4-0.7 SD."
  },
  {
    code: "D2",
    title: "Complete O-Level Subject Courses — All 10 Subjects",
    description: "Chapter by chapter · AO-tagged · 10 subjects available · Chapter-purchase option for flexibility",
    advantage: "Complete, systematic O-Level preparation for all 10 Cambridge subjects. Every chapter with H5P interactive content — no passive video. Cambridge past paper integration from Day 1. AO1/AO2/AO3 aligned questions. Mark-scheme annotated practice. Students may purchase individual chapter courses for any subject — maximum flexibility for schools with different cohort needs.",
    research: "Freeman et al. (2014) — Active learning improves Cambridge examination performance by 6% and reduces examination failure rates by 55% compared to passive instruction."
  },
  {
    code: "D3",
    title: "ATP Courses — Physics, Chemistry, Biology",
    description: "Alternative to Practical · Cambridge Paper 4 · All 3 sciences · Latest 5 years past papers integrated",
    advantage: "Complete Cambridge Paper 4 preparation for Physics, Chemistry, and Biology. Virtual practical simulations. Latest 5 years of ATP past papers fully integrated — teach the skill, worked examples, interactive practice, solved past papers with further practice. Schools without adequate laboratory facilities can fully prepare students for Paper 4.",
    research: "Hofstein & Lunetta (2004) — Virtual laboratory environments effectively replace hands-on laboratories for conceptual understanding and examination preparation in Physics, Chemistry, and Biology."
  },
  {
    code: "D4",
    title: "O-Level Past Paper Retrieval Practice System",
    description: "Topical past papers · AO-tagged · Mark-scheme annotated · All 10 subjects · Integrated from Day 1",
    advantage: "Authentic Cambridge past paper questions integrated from the first lesson of every subject — not saved for revision. Topical organisation allows teachers to assign past paper practice alongside current teaching. AO-level annotation helps students understand what each question tests. Enhanced model answers explain the examiner's reasoning.",
    research: "Bartlett (2009) — Past paper practice integrated throughout the course produces significantly greater exam familiarity, strategy development, and question-type confidence than revision-only use."
  },
  {
    code: "D5",
    title: "Spaced Retrieval System — AI-Timed, Per Student",
    description: "Days 1/3/7/14/30/90 schedule · Individual schedule per student · Integrated with all courses",
    advantage: "The platform tracks each student's individual performance on every topic and schedules retrieval practice at scientifically optimal intervals — automatically. Teachers see the class-level retrieval schedule in T6 Tool 4. Students see their personal plan in their dashboard. After 90 days on the spaced schedule, topic retention averages 85%+ vs. 5% from passive re-reading.",
    research: "Cepeda et al. (2006) — Spaced repetition with optimal intervals improves long-term retention by 200% vs. massed practice. Roediger & Karpicke (2006) — retrieval practice effect size d=1.0."
  },
  {
    code: "D6",
    title: "Conceptual Mind Maps and Infographics",
    description: "All subjects · All chapters · Digital download · Dual coding — visual and verbal",
    advantage: "Ready-to-use conceptual mind maps and infographics for every subject and chapter in the Cambridge syllabus. Available as digital downloads. Dual coding: students who process the same content in both visual and verbal form encode it twice as strongly as those who use only one mode.",
    research: "Paivio (1971) — Dual coding theory: simultaneous visual and verbal encoding doubles memory strength. Clark & Paivio (1991) — Instructional materials that combine text and matching visuals produce 89% better retention than text alone."
  },
  {
    code: "D7",
    title: "Conceptual and Practice Workbooks",
    description: "Digital download · Topical (enhanced solutions included) · Yearly (solutions on platform) · All subjects",
    advantage: "Topical workbooks include enhanced solutions at the end of the download — not just answer keys, but AO-level explanations of why each answer earns marks. Year-wise past paper workbooks are downloaded as the paper only; solutions are accessed on the platform, simulating real exam conditions. Essay papers only — no MCQ workbooks.",
    research: "Mayer (2009) — Worked examples with explanatory commentary reduce cognitive load during practice and produce faster skill acquisition than practice alone."
  },
  {
    code: "D8",
    title: "Revision Programmes — Topic-wise and Full Syllabus",
    description: "Structured revision schedules · H5P retrieval activities · All subjects · Platform-based",
    advantage: "Targeted, structured revision programmes for examination preparation — systematic review of previously mastered content with spaced retrieval activities. Topic-wise revision allows teachers to target known weak areas from school assessment data. Full syllabus revision provides comprehensive pre-examination coverage.",
    research: "Dunlosky et al. (2013) — Practice testing (retrieval-based revision) is the single highest-utility learning strategy with the strongest evidence base across all subjects and age groups."
  },
  {
    code: "D9",
    title: "Full Mock Examination Simulation System",
    description: "Cambridge format · Timed · Full papers · Immediate performance report · All subjects",
    advantage: "Students sit full Cambridge-format mock examinations under real timed conditions — the complete paper, at the correct time allocation. Performance reports are generated immediately on completion: marks per question, AO-level performance, comparison against class average, and specific improvement recommendations. Students enter examination day having already practised the complete experience.",
    research: "Bjork & Bjork (2011) — Desirable difficulties, including simulation of examination conditions, significantly improve long-term performance on the actual examination by reducing novelty-induced anxiety and improving strategy execution."
  },
  {
    code: "D10",
    title: "AI Learning Support — 24/7",
    description: "Cambridge-calibrated · Subject-specific · Available anytime · All enrolled subjects",
    advantage: "Every student has access to a Cambridge-calibrated AI advisor — available 24 hours a day, 7 days a week — for every subject they are enrolled in. Questions answered, concepts explained, mark scheme guidance provided, practice questions generated on demand. No waiting for the next lesson. No question goes unanswered.",
    research: "VanLehn (2011) — AI tutoring systems produce an effect size of d=0.76 on student learning outcomes — comparable to one-to-one human tutoring. The 24/7 availability eliminates learning gaps that accumulate between school lessons."
  },
  {
    code: "D11",
    title: "Parent Progress Dashboard — Free with All Plans",
    description: "Real-time · Per student · Traffic light exam readiness · Included in all student enrolments",
    advantage: "Parents see their child's real-time mastery levels, weak topics, retrieval session status, course progress, and exam readiness — in plain English, without educational jargon. Traffic light indicators (green/amber/red) per subject communicate readiness immediately. Automated progress summaries reduce the need for parent-teacher phone calls about basic progress questions.",
    research: "Epstein (2005) — Parental monitoring and involvement in academic progress consistently improves student achievement across all age groups and socioeconomic contexts."
  },
  {
    code: "D12",
    title: "Real-Time Analytics — School Leader Dashboard",
    description: "Principal and admin view · Cohort heatmaps · Teacher CPD tracking · Subject gap analysis",
    advantage: "School leaders see institution-level data in real time: cohort mastery heatmaps by subject and topic, teacher CPD progress, curriculum coverage gaps, assessment result distributions, and exam readiness predictions. Four analytics reports: Cohort Progress, Curriculum Alignment, Teacher CPD, and Exam Readiness Prediction.",
    research: "Hattie (2009) — Feedback and monitoring systems that provide teachers and school leaders with timely, specific performance data have an effect size of d=0.73 — among the highest impacts available at the school system level."
  },
  {
    code: "D13",
    title: "White-Label Platform with School Branding",
    description: "School name · Logo · Custom domain · Complete ownership · All student and teacher accounts branded",
    advantage: "The complete EduMeUp platform is white-labelled to the school's identity — school name, logo, and domain throughout. Students and teachers experience the platform as the school's own system. The school owns the educational identity and the learning relationship. EduMeUp provides the infrastructure and content.",
    research: "Fullan & Quinn (2016) — School ownership and coherence — when the implementation feels like the school's own — is the critical factor in sustainable, long-term adoption of educational innovation."
  }
];

const sidebarLinks = [
  { href: "#challenge", label: "The Challenge" },
  { href: "#ecosystem", label: "The Ecosystem" },
  { href: "#section-a", label: "A: Teacher Capacity" },
  { href: "#section-b", label: "B: Empowering Teachers" },
  { href: "#section-c", label: "C: Student Skills" },
  { href: "#section-d", label: "D: Exam Preparation" },
  { href: "#services-table", label: "All 24 Services" },
  { href: "#c360", label: "Cambridge 360° Hub" },
  { href: "#process", label: "5-Step Process" },
  { href: "#cta", label: "Get Started" },
];

const allServices = [...sectionAServices, ...sectionBServices, ...sectionCServices, ...sectionDServices];

import { PageSidebar } from "@/components/PageSidebar";

export default function ForSchools() {
  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") || "";

    document.title = "For Schools - Your School. Cambridge-Ready. | EduMeUp";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "EduMeUp is the first EdTech platform to address the complete Cambridge educational ecosystem — teacher professional development, student skill building, subject learning, exam preparation, and real-time analytics — under one school partnership.",
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
      <div className="flex min-h-screen bg-white">
        {/* FULL-HEIGHT STICKY SIDEBAR */}
        <PageSidebar
          title="School Partnership"
          quote="A Complete Cambridge Educational Ecosystem — Not a Collection of Tools."
          links={sidebarLinks}
        />

        <main className="flex-1 min-w-0 px-4 md:px-8">
          {/* HERO BANNER */}
          <section id="hero" className="scroll-mt-20 pb-12 md:pb-16 pt-0">
            <div className="bg-white p-8 md:p-16 relative overflow-hidden group">
              <div className="relative z-10">
                <span className="inline-block rounded-full bg-blue-50 border border-blue-100 px-4 py-1.5 text-[12px] font-bold tracking-widest text-[#2366c9] uppercase mb-8">
                  EduMeUp School Partnerships — The Complete Cambridge EdTech Ecosystem
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-semibold leading-[1.1] tracking-tight text-slate-900 mb-6">
                  Complete Cambridge <br />
                  <span className="text-[#2366c9]">Mastery</span>, Delivered.
                </h1>
                <p className="text-2xl md:text-3xl font-semibold text-slate-700 mb-6 leading-tight max-w-3xl">
                  From Teacher Training to Student Mastery — Everything in One Partnership.
                </p>
                <p className="text-base text-slate-600 mt-4 max-w-2xl leading-relaxed">
                  EduMeUp is the first EdTech platform to address the complete Cambridge educational ecosystem — teacher professional development, student skill building, subject learning, exam preparation, and real-time analytics — under one school partnership.
                </p>
                
                <div className="flex flex-wrap gap-4 mt-12">
                  <Link href="/contact?type=school_partnership">
                    <Button className="bg-[#2366c9] hover:bg-blue-700 text-white font-black text-[13px] sm:text-[15px] py-4 sm:py-6 px-4 sm:px-8 rounded-2xl shadow-lg shadow-blue-500/20 transition-all hover:scale-105 active:scale-95 h-auto min-h-[3.5rem] whitespace-normal leading-tight">
                      Book Your Strategy Session <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 inline" />
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="border-slate-200 text-slate-700 hover:bg-slate-50 font-black text-[13px] sm:text-[15px] py-4 sm:py-6 px-4 sm:px-8 rounded-2xl transition-all h-auto min-h-[3.5rem] whitespace-normal leading-tight" 
                    onClick={() => alert("Download Overview (D-PDF05)")}
                  >
                    Download School Overview <FileText className="ml-2 h-4 w-4 sm:h-5 sm:w-5 inline" />
                  </Button>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-8 border-t border-slate-100">
                  <div className="space-y-1">
                    <p className="text-3xl font-black text-slate-900">10+</p>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">O-Level Subjects</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-3xl font-black text-slate-900">7</p>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Training Programmes</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-3xl font-black text-slate-900">24+</p>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">School Services</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-3xl font-black text-[#2366c9]">80%</p>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Mastery Gate</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CHALLENGE SECTION */}
          <section id="challenge" className="scroll-mt-20 py-12 md:py-16">
            <div className="bg-white p-8 md:p-16">
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-6">Most Cambridge Schools Face the Same Four Challenges — Year After Year.</h2>
              <p className="text-slate-700 mt-4 mb-8 text-lg leading-relaxed">
                Cambridge examination results data consistently reveals the same patterns: students who underperform despite adequate subject knowledge, teachers who lack the examiner-level insight that produces Band 1 responses, and school leaders who receive results without the data to understand what caused them or how to prevent them next year.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Teacher Gap */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100 flex flex-col">
                  <h3 className="font-bold text-xl text-slate-900 mb-3">The Teacher Gap</h3>
                  <p className="text-sm text-slate-600 leading-relaxed flex-1">
                    Most Cambridge school teachers have deep subject knowledge but limited Cambridge examiner-level insight — they know what to teach but not precisely how Cambridge examiners mark it, where students lose marks, and how to close those gaps systematically.
                  </p>
                  <div className="mt-4 pt-4 border-t border-slate-50">
                    <p className="text-[11px] font-bold text-amber-600 uppercase tracking-wider mb-1">Evidence-Based Research</p>
                    <p className="text-xs text-slate-500 italic">Hattie (2009): teacher expertise effect size d=0.62 — the single highest-impact school-level variable.</p>
                  </div>
                </div>

                {/* Foundation Gap */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100 flex flex-col">
                  <h3 className="font-bold text-xl text-slate-900 mb-3">The Foundation Gap</h3>
                  <p className="text-sm text-slate-600 leading-relaxed flex-1">
                    Students enter O-Level study without the prerequisite knowledge the syllabus assumes — in Mathematics, Sciences, and English language proficiency. They spend Year 1 catching up rather than advancing. An unresolved gap in Grade 7 makes every subsequent related concept harder to master.
                  </p>
                  <div className="mt-4 pt-4 border-t border-slate-50">
                    <p className="text-[11px] font-bold text-amber-600 uppercase tracking-wider mb-1">Evidence-Based Research</p>
                    <p className="text-xs text-slate-500 italic">Bloom (1984): mastery learning at prerequisite level produces effect size d=2.0 — the highest documented in educational research.</p>
                  </div>
                </div>

                {/* Assessment Gap */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100 flex flex-col">
                  <h3 className="font-bold text-xl text-slate-900 mb-3">The Assessment Gap</h3>
                  <p className="text-sm text-slate-600 leading-relaxed flex-1">
                    Schools receive Cambridge examination results as final grades — not as diagnostic data. They know who passed and who failed but not which specific sub-skills caused the failure, which teaching approaches need to change, or which students needed earlier intervention.
                  </p>
                  <div className="mt-4 pt-4 border-t border-slate-50">
                    <p className="text-[11px] font-bold text-amber-600 uppercase tracking-wider mb-1">Evidence-Based Research</p>
                    <p className="text-xs text-slate-500 italic">Black & Wiliam (1998): formative assessment implemented well raises achievement by 0.4-0.7 standard deviations.</p>
                  </div>
                </div>

                {/* Retention Gap */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100 flex flex-col">
                  <h3 className="font-bold text-xl text-slate-900 mb-3">The Retention Gap</h3>
                  <p className="text-sm text-slate-600 leading-relaxed flex-1">
                    Students learn content in class and forget it before the examination. Without systematic retrieval practice and spaced repetition, the forgetting curve eliminates most learning within days. EduMeUp's spaced retrieval system is built into every course as a core feature — not an add-on.
                  </p>
                  <div className="mt-4 pt-4 border-t border-slate-50">
                    <p className="text-[11px] font-bold text-amber-600 uppercase tracking-wider mb-1">Evidence-Based Research</p>
                    <p className="text-xs text-slate-500 italic">Cepeda et al. (2006): spaced repetition produces 200% better long-term retention than massed practice.</p>
                  </div>
                </div>
              </div>
              <p className="mt-10 text-center text-slate-700 font-medium bg-white/50 py-4 px-6 rounded-xl border border-amber-100 italic">
                EduMeUp was built to address all four challenges simultaneously — through one partnership, one platform, and one coherent educational approach grounded in 40 years of peer-reviewed cognitive science research.
              </p>
            </div>
          </section>

          {/* ECOSYSTEM OVERVIEW */}
          <section id="ecosystem" className="scroll-mt-20 py-12 md:py-16">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-6">
                A Complete Cambridge Educational Ecosystem — Not a Collection of Tools.
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                EduMeUp's school partnership provides 24 interconnected services across 4 domains. Unlike EdTech platforms that solve one problem (a question bank, a video library, or a homework tool), EduMeUp addresses the entire learning chain — from the teacher's professional knowledge through to the student's exam-day performance. Every component reinforces every other component.
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-blue-50/50 p-6 rounded-3xl text-center border border-blue-100 hover:shadow-lg transition-all duration-300">
                <span className="font-black text-[#2366c9] block text-3xl mb-2">A</span>
                <span className="text-base font-bold text-slate-800 block mb-2">Capacity Building of Teachers</span>
                <p className="text-xs text-slate-500 leading-relaxed">6 services. Transforms any teacher into a Cambridge-ready specialist.</p>
              </div>
              <div className="bg-blue-50/50 p-6 rounded-3xl text-center border border-blue-100 hover:shadow-lg transition-all duration-300">
                <span className="font-black text-[#2366c9] block text-3xl mb-2">B</span>
                <span className="text-base font-bold text-slate-800 block mb-2">Empowering Teachers in Classroom</span>
                <p className="text-xs text-slate-500 leading-relaxed">5 services. AI tools, curriculum resources, and assessment infrastructure.</p>
              </div>
              <div className="bg-purple-50/50 p-6 rounded-3xl text-center border border-purple-100 hover:shadow-lg transition-all duration-300">
                <span className="font-black text-purple-600 block text-3xl mb-2">C</span>
                <span className="text-base font-bold text-slate-800 block mb-2">Student Skill Development</span>
                <p className="text-xs text-slate-500 leading-relaxed">6 services. Must-Have courses, bridge courses, English language pathway.</p>
              </div>
              <div className="bg-slate-100/50 p-6 rounded-3xl text-center border border-slate-200 hover:shadow-lg transition-all duration-300">
                <span className="font-black text-slate-700 block text-3xl mb-2">D</span>
                <span className="text-base font-bold text-slate-800 block mb-2">Learning, Practice & Exam Prep</span>
                <p className="text-xs text-slate-500 leading-relaxed">13 services. Subject courses, past papers, mock exams, ATP, and analytics.</p>
              </div>
            </div>
          </section>

          {/* SECTION A */}
          <section id="section-a" className="scroll-mt-20 py-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#2366c9] text-white w-10 h-10 rounded-full flex items-center justify-center font-black shrink-0">A</div>
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 leading-tight">Capacity Building of Teachers</h2>
            </div>
            <p className="text-slate-600 mb-10 text-lg leading-relaxed max-w-4xl">
              Six programmes that transform any teacher — regardless of starting point — into a Cambridge-ready specialist with examiner-level subject knowledge, evidence-based pedagogy, and the professional confidence to teach at Cambridge standard.
            </p>
            <div className="grid gap-6">
              {sectionAServices.map(service => (
                <div key={service.code} className="bg-white border border-blue-100 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <span className="text-sm font-black bg-blue-100 text-[#2366c9] px-4 py-1.5 rounded-full">{service.code}</span>
                    <h3 className="text-2xl font-bold text-slate-900 flex-1">{service.title}</h3>
                  </div>
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <p className="text-[14px] text-slate-500 font-medium pb-4 border-b border-slate-50">{service.description}</p>
                      <div className="space-y-2">
                        <p className="text-[11px] font-black text-[#2366c9] uppercase tracking-widest">The Advantage</p>
                        <p className="text-[15px] text-slate-700 leading-relaxed font-medium">{service.advantage}</p>
                      </div>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 self-start">
                      <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">Evidence-Based Research</p>
                      <p className="text-sm text-slate-600 leading-relaxed italic">"{service.research}"</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION B */}
          <section id="section-b" className="scroll-mt-20 py-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-black shrink-0">B</div>
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 leading-tight">Empowering Teachers in the Classroom</h2>
            </div>
            <p className="text-slate-600 mb-10 text-lg leading-relaxed max-w-4xl">
              Five services that give teachers the tools, content, and infrastructure they need to deliver excellent Cambridge lessons every day — without spending evenings creating materials, marking repetitively, or planning from scratch.
            </p>
            <div className="grid gap-6">
              {sectionBServices.map(service => (
                <div key={service.code} className="bg-white border border-blue-100 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <span className="text-sm font-black bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full">{service.code}</span>
                    <h3 className="text-2xl font-bold text-slate-900 flex-1">{service.title}</h3>
                  </div>
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <p className="text-[14px] text-slate-500 font-medium pb-4 border-b border-slate-50">{service.description}</p>
                      <div className="space-y-2">
                        <p className="text-[11px] font-black text-blue-600 uppercase tracking-widest">The Advantage</p>
                        <p className="text-[15px] text-slate-700 leading-relaxed font-medium">{service.advantage}</p>
                      </div>
                    </div>
                    <div className="bg-blue-50/30 p-6 rounded-2xl border border-blue-100 self-start">
                      <p className="text-[11px] font-black text-blue-400 uppercase tracking-widest mb-3">Evidence-Based Research</p>
                      <p className="text-sm text-slate-600 leading-relaxed italic">"{service.research}"</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION C */}
          <section id="section-c" className="scroll-mt-20 py-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-black shrink-0">C</div>
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 leading-tight">Student Skill Development</h2>
            </div>
            <p className="text-slate-600 mb-10 text-lg leading-relaxed max-w-4xl">
              Six programmes that build the foundational skills every student needs before O-Level subject study begins — learning skills, English language proficiency, reading comprehension, academic communication, and the subject foundations that O-Level assumes.
            </p>
            <div className="grid gap-6">
              {sectionCServices.map(service => (
                <div key={service.code} className="bg-white border border-purple-100 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <span className="text-sm font-black bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full">{service.code}</span>
                    <h3 className="text-2xl font-bold text-slate-900 flex-1">{service.title}</h3>
                  </div>
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <p className="text-[14px] text-slate-500 font-medium pb-4 border-b border-slate-50">{service.description}</p>
                      <div className="space-y-2">
                        <p className="text-[11px] font-black text-purple-600 uppercase tracking-widest">The Advantage</p>
                        <p className="text-[15px] text-slate-700 leading-relaxed font-medium">{service.advantage}</p>
                      </div>
                    </div>
                    <div className="bg-purple-50/30 p-6 rounded-2xl border border-purple-100 self-start">
                      <p className="text-[11px] font-black text-purple-400 uppercase tracking-widest mb-3">Evidence-Based Research</p>
                      <p className="text-sm text-slate-600 leading-relaxed italic">"{service.research}"</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION D */}
          <section id="section-d" className="scroll-mt-20 py-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-slate-700 text-white w-10 h-10 rounded-full flex items-center justify-center font-black shrink-0">D</div>
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 leading-tight">Student Learning, Practice & Exam Prep</h2>
            </div>
            <p className="text-slate-600 mb-10 text-lg leading-relaxed max-w-4xl">
              Thirteen services covering the complete Cambridge exam preparation journey — from the first lesson of each subject through to the final mock examination. Every service is evidence-based, Cambridge-calibrated, and integrated with the diagnostic and analytics infrastructure of the EduMeUp platform.
            </p>
            <div className="grid gap-4">
              {sectionDServices.map(service => (
                <div key={service.code} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-mono">{service.code}</span>
                      <h3 className="font-bold text-lg text-slate-900">{service.title}</h3>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-[13px] text-slate-500">{service.description}</p>
                    <div className="bg-slate-50/50 p-4 rounded-xl space-y-2">
                       <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">The Advantage</p>
                       <p className="text-[14px] text-slate-700 leading-relaxed">{service.advantage}</p>
                    </div>
                    <p className="text-[12px] text-slate-400 italic">Research: {service.research}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SERVICES TABLE */}
          <section id="services-table" className="scroll-mt-20 py-12">
            <div className="flex justify-between items-center flex-wrap gap-4 mb-8">
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-6">Complete Services Table — All 24 Services</h2>
              <Button variant="outline" className="border-blue-200 bg-white hover:bg-blue-50 text-[#2366c9] font-bold" onClick={() => alert("PDF download of services table")}>
                Download Table as PDF <FileText className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="overflow-x-auto rounded-3xl border border-blue-100 shadow-sm">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-[#2366c9] text-white">
                    <th className="px-6 py-4 text-left font-black uppercase tracking-widest text-[11px]">#</th>
                    <th className="px-6 py-4 text-left font-black uppercase tracking-widest text-[11px]">What Schools Receive</th>
                    <th className="px-6 py-4 text-left font-black uppercase tracking-widest text-[11px]">The Advantage</th>
                    <th className="px-6 py-4 text-left font-black uppercase tracking-widest text-[11px]">Research Reference</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-blue-50">
                  {allServices.map((svc) => (
                    <tr key={svc.code} className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-6 py-4 font-mono font-black text-[#2366c9]">{svc.code}</td>
                      <td className="px-6 py-4 font-bold text-slate-900">{svc.title}</td>
                      <td className="px-6 py-4 text-slate-600 leading-relaxed text-xs">{svc.advantage}</td>
                      <td className="px-6 py-4 text-slate-400 italic text-[11px]">{svc.research}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* CAMBRIDGE 360 HUB */}
          <section id="c360" className="scroll-mt-20 py-16 bg-blue-50/30 rounded-[3rem] my-12 p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8">
              <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full shadow-lg shadow-blue-500/20">Consultancy Add-on</span>
            </div>
            
            <div className="max-w-3xl mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-6">Add Expert Consultancy and AI-Guided Empowerment to Your School Partnership.</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                The Cambridge 360° Empowerment Hub — available as an add-on for school partners — provides ongoing AI-powered consultancy, leadership training guidance, and expert sessions to ensure your school remains at the absolute leading edge of Cambridge educational delivery.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-blue-100 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-4">Cambridge Information on Demand</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Your team gains access to an AI advisor specifically trained on Cambridge system knowledge — providing instant answers on subject selection, grade boundary trends, syllabus updates, and administrative procedures.
                </p>
              </div>

              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-blue-100 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-4">Expert Live Sessions for School Leaders</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Monthly 45-minute expert sessions for principals, academic directors, and HODs. Focus on transition planning, teacher readiness audits, examination strategy, and institutional performance analysis.
                </p>
              </div>

              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-blue-100 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-4">Student and Parent Empowerment Layer</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Individual access for students and parents to guided study plans, diagnostic interpretation workshops, success roadmaps, and 24/7 AI guidance — taking the pressure off school administrative teams.
                </p>
              </div>
            </div>
            
            <div className="mt-12 flex justify-center">
              <Link href="/cambridge-360">
                <Button className="bg-[#2366c9] hover:bg-blue-700 text-white font-black py-4 px-10 rounded-2xl shadow-xl shadow-blue-500/20 transition-all hover:scale-105 active:scale-95">
                  Explore Cambridge 360° Empowerment Hub →
                </Button>
              </Link>
            </div>
          </section>

          {/* 5-STEP PROCESS */}
          <section id="process" className="scroll-mt-20 py-24">
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 text-center mb-6">From First Contact to Fully Active — Most Schools Launch Within 14 Days.</h2>
            <div className="relative mt-20">
              {/* Desktop Connecting Line */}
              <div className="hidden md:block absolute top-10 left-0 w-full h-[2px] bg-teal-200 -z-10"></div>
              
              <div className="grid md:grid-cols-5 gap-8">
                {[ 
                  {step:"1", title:"30-Minute Strategy Session", desc:"A free call with EduMeUp's Chief Adviser. We understand your school's context, current challenges, and specific Cambridge targets.", timeframe: "Day 1"}, 
                  {step:"2", title:"Partnership Proposal", desc:"EduMeUp produces a personalised proposal — which services, which subjects, which grade levels, and what the investment covers.", timeframe: "Days 2-4"}, 
                  {step:"3", title:"Agreement and Onboarding", desc:"Partnership agreement signed. School accounts created. Teacher and student accounts linked. White-label applied. Platform ready.", timeframe: "Days 5-8"}, 
                  {step:"4", title:"Teacher Orientation", desc:"Teachers complete T1 Diagnostic and receive their personalised T2/T3/T4 pathway. First T2 CTMW workshop scheduled. T6 AI tools activated.", timeframe: "Days 9-12"}, 
                  {step:"5", title:"Students Live", desc:"Student accounts activated. Diagnostic assessments assigned. Courses live. Parent dashboards linked. School analytics active.", timeframe: "Days 13-14" } 
                ].map(s => (
                  <div key={s.step} className="text-center group">
                    <div className="w-20 h-20 rounded-full bg-[#1e3a8a] text-white flex items-center justify-center font-black mx-auto mb-3 shadow-xl group-hover:scale-110 transition-transform border-4 border-white">
                      <span className="text-3xl">{s.step}</span>
                    </div>
                    <p className="text-[11px] font-black uppercase tracking-[0.15em] text-blue-600 mb-4">{s.timeframe}</p>
                    <h3 className="font-bold text-lg text-slate-900 mb-3 leading-tight">{s.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-16 text-center max-w-3xl mx-auto">
              <p className="text-slate-600 text-base leading-relaxed italic">
                EduMeUp does not offer generic packages. Every school partnership is configured to the school's specific Cambridge subjects, grade levels, teaching team, and student cohort. The 30-minute strategy session is where this configuration begins.
              </p>
            </div>
          </section>

          {/* FINAL CTA + TRUST STRIP */}
          <section id="cta" className="scroll-mt-20 py-16">
            <div className="bg-white p-8 text-slate-900">
              <h2 className="text-3xl md:text-4xl font-semibold text-center text-slate-900 mb-6">Ready to Transform Your School's Cambridge Results?</h2>
              <div className="grid md:grid-cols-3 gap-6 mt-10">
                {/* Strategy Session Card */}
                <div className="bg-blue-50/50 p-8 rounded-3xl border border-blue-100 flex flex-col hover:shadow-lg transition-all duration-300">
                  <h3 className="font-bold text-xl text-slate-900 mb-3">Book a Free 30-Minute Strategy Session</h3>
                  <p className="text-[14px] text-slate-600 leading-relaxed mb-8 flex-1">
                    With EduMeUp's Chief Adviser — no obligation, no sales pitch.
                  </p>
                  <Link href="/contact?type=school_partnership">
                    <Button className="w-full bg-[#2366c9] text-white hover:bg-blue-700 font-bold h-auto min-h-[3rem] py-3 px-4 rounded-xl text-[13px] sm:text-sm leading-tight whitespace-normal">
                      Book Your Strategy Session →
                    </Button>
                  </Link>
                </div>

                {/* PDF Download Card */}
                <div className="bg-blue-50/50 p-8 rounded-3xl border border-blue-100 flex flex-col hover:shadow-lg transition-all duration-300">
                  <h3 className="font-bold text-xl text-slate-900 mb-3">Download the School Partnership Overview</h3>
                  <p className="text-[14px] text-slate-600 leading-relaxed mb-8 flex-1">
                    A 2-page PDF for principals, boards, and academic directors.
                  </p>
                  <Button 
                    className="w-full bg-[#2366c9] text-white hover:bg-blue-700 font-bold h-auto min-h-[3rem] py-3 px-4 rounded-xl text-[13px] sm:text-sm leading-tight whitespace-normal"
                    onClick={() => alert("PDF download")}
                  >
                    Download PDF →
                  </Button>
                </div>

                {/* C360 Hub Card */}
                <div className="bg-blue-50/50 p-8 rounded-3xl border border-blue-100 flex flex-col hover:shadow-lg transition-all duration-300">
                  <h3 className="font-bold text-xl text-slate-900 mb-3">Explore Cambridge 360° Hub</h3>
                  <p className="text-[14px] text-slate-600 leading-relaxed mb-8 flex-1">
                    Add AI-guided consultancy to your school partnership.
                  </p>
                  <Link href="/cambridge-360">
                    <Button 
                      className="w-full bg-[#2366c9] text-white hover:bg-blue-700 font-bold h-auto min-h-[3rem] py-3 px-4 rounded-xl text-[13px] sm:text-sm leading-tight whitespace-normal"
                    >
                      View C360 Hub →
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-y-4 gap-x-8 mt-10 text-xs text-slate-500">
                <span className="flex items-center gap-2"><Globe className="w-4 h-4 text-[#2366c9]" /> Available Worldwide</span>
                <span className="flex items-center gap-2"><Award className="w-4 h-4 text-[#2366c9]" /> CCTE Certificate for T2 Completers</span>
                <span className="flex items-center gap-2"><BarChart3 className="w-4 h-4 text-[#2366c9]" /> Real-Time Analytics from Day 1</span>
                <span className="flex items-center gap-2"><Lock className="w-4 h-4 text-[#2366c9]" /> 80% Mastery Gate — Quality Guaranteed</span>
                <span className="flex items-center gap-2"><User className="w-4 h-4 text-[#2366c9]" /> Dedicated Partnership Contact</span>
                <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-[#2366c9]" /> Active Within 14 Days</span>
              </div>
              {/* <div className="mt-8 text-center text-blue-300 text-xs italic">Testimonials will appear here when available (Phase 2).</div> */}
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}