import React, { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/Layout";
import { CtaCard } from "@/components/CtaCard";
import { PageSidebar } from "@/components/PageSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { InquiryDialog } from "@/components/InquiryDialog";
import {
  ArrowRight,
  CheckCircle2,
  Lock,
  Globe,
  Award,
  Zap,
  Calendar,
  FileText,
  Search,
  MessageCircle,
  BarChart3,
  PlayCircle,
  Navigation,
  Brain,
  Activity,
  RefreshCw,
  AlertTriangle,
  ShieldCheck,
  BookOpen,
  Flame,
  Check
} from "lucide-react";
import { motion } from "framer-motion";

const sidebarLinks = [
  { label: "The Student Problem", href: "#problem" },
  { label: "Course Categories", href: "#courses" },
  { label: "The 8-Step Journey", href: "#journey" },
  { label: "The Mastery Cycle", href: "#mastery-cycle" },
  { label: "Sample H5P Activities", href: "#h5p-samples" },
  { label: "Your Dashboard", href: "#dashboard" },
  { label: "AI Study Advisor", href: "#ai-advisor" },
  { label: "Get Started", href: "#cta" },
];

export default function ForStudents() {
  // --- Activity 1 State ---
  const [act1Placed, setAct1Placed] = useState<(string | null)[]>([null, null, null]);
  const [act1Feedback, setAct1Feedback] = useState<{ type: 'correct' | 'incorrect' | null, message: string }>({ type: null, message: '' });
  const [act1Checked, setAct1Checked] = useState(false);
  const [act1SelectedTileIdx, setAct1SelectedTileIdx] = useState<number | null>(null);
  const [act1HoveredBox, setAct1HoveredBox] = useState<number | null>(null);
  const [act1IsCorrect, setAct1IsCorrect] = useState(false);

  const handleAct1Drop = (idx: number, tileIdx: number) => {
    const tiles = ["2 mol", "1 mol", "2 mol", "4 mol", "32 g", "36 g"];
    const val = tiles[tileIdx];
    const newPlaced = [...act1Placed];
    newPlaced[idx] = val;
    setAct1Placed(newPlaced);
    setAct1SelectedTileIdx(null);
  };

  const checkAct1Answers = () => {
    setAct1Checked(true);
    const correct = act1Placed[0] === "2 mol" && act1Placed[1] === "1 mol" && act1Placed[2] === "2 mol";

    if (correct) {
      setAct1IsCorrect(true);
      setAct1Feedback({
        type: 'correct',
        message: "Excellent AO2 application. The mole ratio directly reflects the balancing numbers in the equation: 2:1:2. You correctly used the stoichiometric ratio — not the masses — to determine the mole quantities. This is the most common error Cambridge examiners report in this topic: students confuse mass ratio with mole ratio. Now try the extension question below: How many moles of water are produced from 4 moles of hydrogen, assuming oxygen is in excess?"
      });
    } else {
      setAct1IsCorrect(false);
      setAct1Feedback({
        type: 'incorrect',
        message: "Not quite. Remember: the mole ratio in a chemical equation comes from the balancing numbers (the large numbers in front of each formula), not from the relative molecular masses. The balancing number for H2 is 2, for O2 is 1, and for H2O is 2. So the mole ratio is 2:1:2. Review the Mole Ratio video note below, then try again."
      });
    }
  };


  const resetAct1 = () => {
    setAct1Placed([null, null, null]);
    setAct1Feedback({ type: null, message: '' });
    setAct1Checked(false);
    setAct1IsCorrect(false);
    setAct1SelectedTileIdx(null);
  };

  const targetRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

  const handleDrag = (event: any, info: any) => {
    let hovered: number | null = null;
    targetRefs.forEach((ref, idx) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        if (
          info.point.x >= rect.left &&
          info.point.x <= rect.right &&
          info.point.y >= rect.top &&
          info.point.y <= rect.bottom
        ) {
          hovered = idx;
        }
      }
    });
    setAct1HoveredBox(hovered);
  };

  const handleDragEnd = (idx: number, tileIdx: number) => {
    if (act1HoveredBox !== null) {
      handleAct1Drop(act1HoveredBox, tileIdx);
    }
    setAct1HoveredBox(null);
  };

  // --- Activity 2 State (for evaluation activity) ---
  const [act2SelectedBand, setAct2SelectedBand] = useState<string | null>(null); // "Band 1", "Band 2", or "Band 3"
  const [act2Explanation, setAct2Explanation] = useState("");
  const [act2Checked, setAct2Checked] = useState(false);
  const [act2IsCorrect, setAct2IsCorrect] = useState(false);
  const act2CorrectBand = "Band 2";

  const checkAct2Answers = () => {
    if (act2SelectedBand === "Band 2") {
      setAct2IsCorrect(true);
    } else {
      setAct2IsCorrect(false);
    }
    setAct2Checked(true);
  };

  const getAct2FeedbackMessage = () => {
    if (act2SelectedBand === "Band 2") {
      return "Correct. This is a Band 2 response. The student identifies two techniques (repetition and the use of short sentences) and provides textual references for both. However, the effect on the reader is stated but not fully developed — 'creates urgency' is stated without explaining how the specific language feature produces that feeling in a Cambridge reader. A Band 1 response would extend the effect statement: for example, 'the tripling of short sentences mirrors the racing pulse of the narrator, forcing the reader to read faster and feel the urgency physically.' Practise extending the effect statement to move from Band 2 to Band 1.";
    } 
    
    if (act2SelectedBand === "Band 1") {
      return "The correct answer is Band 2. You selected Band 1. While the student response correctly identifies techniques (repetition, short sentences) and provides precise textual references (\"ticked louder\"), it fails to fully develop the effect on the reader. Saying \"it makes the reader feel like something bad is about to happen\" is too vague and descriptive. To achieve Band 1, the response must explain exactly how the language creates that physical sense of panic (e.g., \"the countdown mimics a racing heartbeat\").";
    }

    if (act2SelectedBand === "Band 3") {
      return "The correct answer is Band 2. You selected Band 3. A Band 3 response typically contains only general comments with vague or no references to the text. However, this student does much more than that: they specifically name literary techniques (\"repetition\", \"short sentences\") and extract accurate quotes (\"ticked louder\", \"blinked\"). Because they successfully identified techniques and provided evidence, they have moved past Band 3, even if their explanation of the effect was weak.";
    }

    return "";
  };


  // --- Activity 3 State ---
  const [act3Method, setAct3Method] = useState<string | null>(null);
  const [act3X, setAct3X] = useState("");
  const [act3Y, setAct3Y] = useState("");
  const [act3Checked, setAct3Checked] = useState(false);
  const [act3IsCorrect, setAct3IsCorrect] = useState(false);

  const checkAct3Answers = () => {
    setAct3Checked(true);
    const isCorrect = act3X === "2" && act3Y === "1";
    setAct3IsCorrect(isCorrect);
  };

  const problems = [
    {
      title: "You don't know where your gaps are",
      desc: "Without a diagnostic, you study by guessing — spending time on topics you already know while the topics you are actually weak in remain unaddressed. By examination day, the gaps are still there.",
      fix: "Free 30-minute diagnostic pinpoints your exact gaps at AO level before you study a single topic."
    },
    {
      title: "You forget what you study",
      desc: "Reading your notes once produces approximately 5% retention after one week. You revise, you feel confident, and then the examination arrives and the information is gone. This is the forgetting curve — and it is entirely preventable.",
      fix: "Spaced retrieval practice scheduled at Day 1/3/7/14/30/90 produces 75%+ retention after 90 days."
    },
    {
      title: "You can recall facts but lose marks on application",
      desc: "Cambridge rewards three things: recalling facts (AO1), applying them to unfamiliar situations (AO2), and evaluating and analysing (AO3). Most students are confident at AO1 and struggle when the question requires AO2 or AO3. These are not harder topics — they are different skills that require different practice.",
      fix: "Every course is structured by AO level. Your AI diagnostic identifies which AO level your gaps are at — so your practice targets exactly the right skill."
    },
    {
      title: "You study passively",
      desc: "Watching a video or reading a textbook feels like studying but produces almost no durable learning. Your brain needs to actively retrieve information, apply it, and make mistakes for learning to stick. Passive content — however well produced — is not enough.",
      fix: "Every course uses H5P interactive activities — drag-and-drop, fill-in-blank, adaptive questions. No passive video. Every activity requires you to actively think."
    }
  ];

  const categories = [
    {
      id: "CAT 1",
      title: "Must-Have Courses — Learn How to Learn and English Foundation",
      who: "Every student from Grade 6 upward — regardless of subject level or Cambridge stage.",
      courses: "Learn How to Learn (6 modules) — Cornell note-taking, spaced retrieval, exam strategy, academic independence. Vocabulary Mastery Gr5-7 (7 modules). Reading Comprehension RC68 (10 modules, Foundation and Challenge tracks, CEFR A2-B1+). ESL1 (CEFR A2). ESL2 (CEFR B1). English Bridge B1+ to B2. Classroom English Communication (student sections).",
      linkText: "Start here",
      link: "/programs/must-have-courses",
      color: "border-brand-primary"
    },
    {
      id: "CAT 2",
      title: "Pre-O-Level Foundation Courses — Before You Begin O-Level",
      who: "Students in Grade 7-8 or in the first months of O-Level Year 1 who want to build a strong foundation before full O-Level study begins.",
      courses: "Pre-O-Level Chemistry (11 chapters — Atomic Structure through Organic Chemistry introduction, covers 30-40% of O-Level syllabus). Pre-O-Level Mathematics (13 topics — Numbers through Basic Trigonometry). Pre-O-Level Physics (15 topics — Physics and Units through Current Electricity). Pre-O-Level Biology. Certification examination included for all Pre-O-Level programmes.",
      linkText: "Build your foundation",
      link: "/programs/bridge-courses",
      color: "border-blue-500"
    },
    {
      id: "CAT 3",
      title: "O-Level Bridge Courses — Close Specific Gaps Before O-Level",
      who: "Students entering or already in O-Level who have identified specific foundational gaps through the diagnostic.",
      courses: "O-Level Bridge: English, Chemistry, Physics, Mathematics, Economics. Topic-selectable — your diagnostic tells you which topics you need. 80% mastery gate before advancing to the full O-Level subject course. AI diagnostic identifies your entry point in each bridge course automatically.",
      linkText: "Take the diagnostic first",
      link: "/diagnostics",
      color: "border-indigo-500"
    },
    {
      id: "CAT 4",
      title: "O-Level Subject Courses — All 10 Cambridge Subjects",
      who: "Students actively studying for Cambridge O-Level examinations — all levels.",
      courses: "Mathematics (25 topics — 14 available now, more being added continuously). Physics (6 main topics, 27 sub-topics — almost all available). Chemistry (11 topics — almost all available). Biology (21 topics — almost all available). Economics (complete). Business Studies (complete). English Language (10 courses — Comprehension, Essay/Composition, Directed Writing). Urdu, Islamiyat, Pakistan Studies (complete per current syllabus). Chapter-by-chapter purchase available for all subjects.",
      linkText: "Browse all subjects",
      link: "/programs/complete-o-level",
      color: "border-sky-500"
    },
    {
      id: "CAT 5",
      title: "O-Level English Courses — Full 10-Course English Programme",
      who: "Students preparing specifically for Cambridge O-Level English Language Paper 1 (Reading) and Paper 2 (Writing).",
      courses: "5 Comprehension courses (one per Cambridge past paper set — Paper 1 Reading: two texts, structured and extended writing questions). 3 Essay and Composition courses (F1: Essay Types and Structure; F2: 10-Day Band 3 to Band 1 Bridge; F3: Complete Mastery Band 3 to Band 1). 2 Directed Writing courses (Part 1: non-letter types including Format A and B with 2024 papers; Part 2: 6 letter types, formal email, mock exam).",
      linkText: "See all English courses",
      link: "/programs/english-mastery",
      color: "border-cyan-500"
    },
    {
      id: "CAT 6",
      title: "ATP Courses — Alternative to Practical (Sciences)",
      who: "Students taking Cambridge Paper 4 (Alternative to Practical) in Physics, Chemistry, and Biology.",
      courses: "ATP Physics (built from latest 5 years ATP past papers — teach the skill, worked examples, interactive practice, solved past papers). ATP Chemistry (same structure). ATP Biology (same structure). All ATP courses fully integrate Cambridge Paper 4 past papers. Suitable for schools without laboratory facilities and for students wanting maximum Paper 4 preparation.",
      linkText: "See ATP courses",
      link: "/programs/atp-courses",
      color: "border-teal-500"
    }
  ];

  const steps = [
    {
      title: "Diagnose — Know Your Exact Gaps",
      do: "Take the free 30-minute EduMeUp diagnostic for your chosen subject(s). Select Student as your role. Select your subject. Answer 20-35 adaptive questions — no time pressure, no trick questions. The questions adjust based on your responses, narrowing in on your specific gap areas.",
      get: "Your overall percentage score per subject. Your top 3 weakness areas in plain English. Specific remedial actions for each weakness. Direct links to the EduMeUp course modules that address your gaps. A course start-point recommendation — which course to begin with.",
      research: "Bloom (1984) — Personalised instruction based on diagnostic data produces effect size d=2.0 — the highest in educational research. Black & Wiliam (1998) — identifying gaps before instruction begins improves outcomes by 0.4-0.7 standard deviations.",
      color: "blue"
    },
    {
      title: "Plan — Receive Your Personalised Pathway",
      do: "Your diagnostic results generate a personalised learning pathway — automatically. Review the pathway in your dashboard. Your AI advisor explains what the diagnostic found, what it means for your examination preparation, and why the recommended course sequence is ordered the way it is.",
      get: "A personalised course sequence in priority order. A study timeline recommendation based on your examination date. Your gap matrix — which topics, at which AO level, need the most attention. Your dashboard activated and ready to track your progress from Day 1.",
      research: "Zimmerman (2002) — Self-regulated learners who begin with a clear plan and goals significantly outperform those who study without direction. Having a personalised, evidence-based plan from Day 1 removes the most common cause of wasted study time.",
      color: "navy"
    },
    {
      title: "Build Your Foundation — Study Skills and Language First",
      do: "Before any subject study begins, complete the two foundational courses that make every subsequent course more effective: (1) Learn How to Learn — Cornell note-taking, spaced retrieval technique, exam strategy, and academic independence. (2) English Language pathway (if your diagnostic shows a language gap) — beginning from the CEFR level your diagnostic identified.",
      get: "A permanent upgrade to how you study. Techniques you will use for every subject, for the rest of your educational life. Verified English language proficiency at the level your O-Level subjects require. These two courses are the multiplier — they make every subsequent study hour 10 times more effective.",
      research: "Zimmerman (2002) — Self-regulated learning is the single strongest predictor of long-term academic success. Nation (2001) — vocabulary breadth is the strongest predictor of reading comprehension across all academic subjects, making English proficiency a prerequisite for subject performance.",
      color: "blue"
    },
    {
      title: "Repair — Close Your Foundation Gaps",
      do: "If your diagnostic identified foundational gaps (Pre-O-Level level), complete the targeted bridge or Pre-O-Level course modules for those specific topics. Your pathway only assigns the modules you actually need — you do not complete the full Pre-O-Level programme unless your diagnostic recommends it. 80% mastery gate: you cannot advance until you have genuinely mastered each topic.",
      get: "A secure foundation for every O-Level topic you need to study. No more struggling with O-Level content because the Grade 8 prerequisite concept is missing. Each topic completed at 80%+ mastery — the platform confirms this before allowing you to advance.",
      research: "Bloom (1968) — Cumulative knowledge gaps compound. An unresolved foundation gap in one topic makes every subsequent related topic harder to master. Fixing foundation gaps first is the highest-return-per-hour activity available to an O-Level student.",
      color: "navy"
    },
    {
      title: "Master — Study Each O-Level Topic to Genuine Understanding",
      do: "Work through your recommended O-Level subject courses chapter by chapter. Every chapter contains: H5P interactive activities (not passive video), Cambridge past paper questions integrated from Day 1, AO1/AO2/AO3 structured practice, mark-scheme annotated worked examples, and an AI advisor available 24/7 for any question. 80% mastery gate per chapter: the course does not advance until you have mastered the current chapter.",
      get: "Genuine understanding of every topic — not surface familiarity. AO2 and AO3 skills developed alongside the content, not treated as a separate exam technique task. Past paper questions woven into learning from Day 1 — exam familiarity built throughout the course, not saved for revision.",
      research: "Freeman et al. (2014) — Active learning (H5P interactive vs. passive video) improves Cambridge examination performance by 6% and reduces examination failure rates by 55%. VanLehn (2011) — AI tutoring support during the learning phase produces effect size d=0.76.",
      color: "blue"
    },
    {
      title: "Verify — Test What You Have Mastered",
      do: "After completing each chapter or topic, the platform's spaced retrieval system schedules a verification activity — a short, adaptive practice session that tests whether the knowledge has genuinely been retained. When you approach examination time, take the full mock examination simulation under real Cambridge timed conditions for your subjects. The mock exam generates an immediate performance report.",
      get: "Confirmed knowledge at each step — not assumed. Specific identification of any topics that appeared to be mastered but have not been retained. A full mock exam result showing your marks per question, your AO-level performance, your comparison against class average, and specific improvement recommendations.",
      research: "Bartlett (2009) — Testing yourself (retrieval practice) is 10 times more effective at revealing true retention level than re-reading. Bjork & Bjork (2011) — Simulation of examination conditions significantly improves actual examination performance by reducing novelty-induced anxiety.",
      color: "navy"
    },
    {
      title: "Retain — The Spaced Retrieval Schedule",
      do: "EduMeUp's spaced retrieval system automatically schedules short review sessions for every topic you have mastered — at Day 1, 3, 7, 14, 30, and 90. Your dashboard shows which topics are scheduled for review today. Each retrieval session takes 5-10 minutes per topic. You do not need to schedule anything — the platform does it for you. Just follow the daily review notifications.",
      get: "85%+ long-term retention of every mastered topic after 90 days. A continuously updated picture of which topics are secure and which need attention. The forgetting curve systematically interrupted for every topic, every student, every day.",
      research: "Cepeda et al. (2006) — Spaced repetition with optimal intervals improves long-term retention by 200% compared to massed practice. Ebbinghaus (1885) — Without retrieval practice, memory decays to 5-10% within one week. With spaced retrieval, the same material is retained at 75%+ after 90 days.",
      color: "blue"
    },
    {
      title: "Grow Independent — Become an Independent Cambridge Thinker",
      do: "The final step is not a course or a test — it is the confirmation that you have genuinely internalized the Cambridge way of thinking. You can answer unseen questions in your subjects, explain your reasoning at AO3 level, and identify your own remaining gaps without waiting for a diagnostic. If you are eligible, take the EduMeUp certification examination (75% pass mark, one resit permitted) for the Pre-O-Level or teacher programme you have completed.",
      get: "Genuine academic independence — the ability to learn any new Cambridge topic efficiently using the same strategies EduMeUp has trained into you. If applicable: your EduMeUp certification confirming mastery of the programme completed. The confidence that comes from genuine preparation, not hope.",
      research: "Zimmerman (2002) — Self-regulated learners consistently outperform their peers not just in academic results but in career performance, problem-solving, and lifelong learning. The goal of EduMeUp is not examination performance alone — it is genuine intellectual capability.",
      color: "navy",
      extra: {
        title: "Earn Your Certificate",
        content: "Once you have completed your Bridge Course and passed the end-of-course assessment with 75% or above, you are eligible to sit the EduMeUp Pre-O-Level Certification Exam for that subject. Phase 1 subjects available: English, Mathematics, Physics, Chemistry, Economics. This is an EduMeUp qualification — it is not a Cambridge certificate and is not externally accredited. It is designed to formally confirm that you have achieved the knowledge and skill level required to begin O-Level study. One resit is permitted if the 75% pass mark is not reached on the first attempt."
      }
    }
  ];

  const colorMap: Record<string, { bg: string; text: string; border: string; light: string; header: string }> = {
    blue: {
      bg: "bg-brand-primary",
      text: "text-brand-primary",
      border: "border-blue-100",
      light: "bg-blue-50/50",
      header: "bg-brand-primary"
    },
    navy: {
      bg: "bg-[#1e3a8a]",
      text: "text-[#1e3a8a]",
      border: "border-blue-200",
      light: "bg-blue-50/70",
      header: "bg-[#1e3a8a]"
    }
  };

  const masteryStages = [
    {
      num: "1",
      title: "DIAGNOSE",
      desc: "What do you already know about this topic? A short adaptive pre-test identifies your entry point.",
      color: "bg-purple-50/50",
      border: "border-purple-100/50",
      accent: "text-purple-600"
    },
    {
      num: "2",
      title: "REPAIR",
      desc: "Any prerequisite gaps identified in Diagnose are addressed first with targeted, brief remedial activities.",
      color: "bg-blue-50/50",
      border: "border-blue-100/50",
      accent: "text-blue-600"
    },
    {
      num: "3",
      title: "MASTER",
      desc: "H5P interactive activities develop genuine understanding — AO1 recall, AO2 application, AO3 evaluation — in sequence.",
      color: "bg-green-50/50",
      border: "border-green-100/50",
      accent: "text-green-600"
    },
    {
      num: "4",
      title: "VERIFY",
      desc: "An adaptive end-of-topic test confirms whether mastery has been reached. 80% gate: below 80% means you repeat the Master stage.",
      color: "bg-red-50/50",
      border: "border-red-100/50",
      accent: "text-red-600"
    },
    {
      num: "5",
      title: "RETAIN",
      desc: "Spaced retrieval sessions scheduled at Day 1/3/7/14/30/90 ensure the topic stays in long-term memory.",
      color: "bg-yellow-50/50",
      border: "border-yellow-100/50",
      accent: "text-amber-600"
    },
    {
      num: "6",
      title: "GROW INDEPENDENT",
      desc: "Unseen application questions test your ability to use the topic in new contexts — the Cambridge AO3 standard.",
      color: "bg-orange-50/50",
      border: "border-orange-100/50",
      accent: "text-orange-600"
    }
  ];

  const aiSamples = [
    {
      q: "My diagnostic shows AO2 gaps in Chemistry. What does that mean and what should I do?",
      a: "Your AO2 gap means you can recall concepts correctly but struggle to apply them to a calculation or an unfamiliar situation. I recommend starting with Pre-O-Level Chemistry Chapter 7."
    },
    {
      q: "I have 4 months before my O-Level Physics exam. Am I on track?",
      a: "Based on your 58% overall mastery, 4 months is achievable if you complete 3 chapters per week. Priority order: Waves, then Electricity, then revision of Mechanics."
    },
    {
      q: "What is the difference between AO2 and AO3 in an Economics evaluation question?",
      a: "AO2 asks you to apply economic theory to the context. AO3 asks you to evaluate — assess limitations, consider other factors, and reach a justified judgement."
    }
  ];

  const h5pActivities = [
    {
      id: 1,
      title: "SAMPLE H5P ACTIVITY 1 — Chemistry AO2 (Application)",
      type: "Drag-and-Drop Diagram",
      topic: "O-Level Chemistry — Mole Concept: Interpreting Molar Ratios in Chemical Equations",
      instruction: "The equation below shows the reaction between hydrogen and oxygen to produce water: 2H2 + O2 -> 2H2O. Drag the correct label to each position in the mole ratio diagram. Use the molar masses: H=1, O=16.",
      content: "A chemical equation is displayed at the top. Below it, a diagram shows boxes labelled 'moles of H2', 'moles of O2', and 'moles of H2O' with drag-target zones. On the right side, draggable tiles show values: 2 mol, 1 mol, 2 mol, 4 mol, 32 g, 36 g. Students drag the correct values into the diagram. An animated progress indicator shows 0/3 correct. A 'Check Answers' button is highlighted in teal. Timer is optional — student can turn it on or off.",
      correctFeedback: "Excellent AO2 application. The mole ratio directly reflects the balancing numbers in the equation: 2:1:2. You correctly used the stoichiometric ratio — not the masses — to determine the mole quantities. This is the most common error Cambridge examiners report in this topic: students confuse mass ratio with mole ratio. Now try the extension question below: How many moles of water are produced from 4 moles of hydrogen, assuming oxygen is in excess?",
      incorrectFeedback: "Not quite. Remember: the mole ratio in a chemical equation comes from the balancing numbers (the large numbers in front of each formula), not from the relative molecular masses. The balancing number for H2 is 2, for O2 is 1, and for H2O is 2. So the mole ratio is 2:1:2. Review the Mole Ratio video note below, then try again.",
      color: "brand-primary"
    },
    {
      id: 2,
      title: "SAMPLE H5P ACTIVITY 2 — English Language AO3 (Analysis)",
      type: "Interactive Text Selection",
      topic: "O-Level English — Language Techniques: Analyzing Implicit Meaning",
      instruction: "Read the passage below. Click to highlight the three specific phrases where the author uses irony to suggest a hidden feeling of resentment. Then, explain your choice in the text box provided.",
      content: "A 200-word passage is displayed. When students click on phrases, they are highlighted in yellow. A 'Why this phrase?' box appears for each selection. The platform tracks whether the chosen phrases match the examiner's mark scheme for irony. An AI tutor icon sits in the corner, offering a hint if no irony is found in the first 60 seconds.",
      correctFeedback: "Correct. This is a Band 2 response. The student identifies two techniques (repetition and the use of short sentences) and provides textual references for both. However, the effect on the reader is stated but not fully developed — 'creates urgency' is stated without explaining how the specific language feature produces that feeling in a Cambridge reader. A Band 1 response would extend the effect statement: for example, 'the tripling of short sentences mirrors the racing pulse of the narrator, forcing the reader to read faster and feel the urgency physically.' Practise extending the effect statement to move from Band 2 to Band 1.",
      incorrectFeedback: "You have identified the correct phrases, but your explanation focuses on the literal meaning. Remember that irony involves a contrast between appearance and reality. Re-read the section on 'Sarcasm vs. Irony' and try to rephrase your explanation focusing on the author's hidden intent.",
      color: "navy"
    },
    {
      id: 3,
      title: "SAMPLE H5P ACTIVITY 3 — Mathematics AO1/AO2 Adaptive Sequence",
      type: "Adaptive Question Sequence (branching)",
      topic: "O-Level Mathematics — Algebra: Solving Simultaneous Equations",
      instruction: "Solve the following simultaneous equations: 3x + 2y = 12 and x - y = 1. Show your working in the box provided. Select the method you are using: [Elimination] [Substitution].",
      content: "Two equations displayed prominently. Below: a method selector (two buttons, teal when selected). A scratchpad area — a white box where students type or handwrite their working (stylus supported on touch devices). An input field for the final answer: x = [  ] and y = [  ]. A 'Submit' button. Below the submit button, a subtle progress bar showing 'Question 1 of 4 — Algebra: Simultaneous Equations'.",
      correctFeedback: "Correct — x=2, y=1. Well done for using substitution. Your working shows you correctly isolated x from the second equation before substituting into the first. Cambridge mark schemes award method marks even if the final answer is wrong — always show your working clearly. Next question: a context problem where you must first form the simultaneous equations from a word problem before solving. This tests AO2 — can you apply what you know to an unfamiliar situation?",
      incorrectFeedback: "Not quite. Let us look at where the working went wrong. [Colour-highlighted working shown back to student with the error circled in red.] The error is in [specific step identified by adaptive engine]. Here is the correct step: [annotated example]. Now try a similar question with slightly different values — same method, different numbers.",
      color: "purple"
    }
  ];

  const h5pTheme: Record<string, any> = {
    "brand-primary": { header: "bg-brand-primary", body: "bg-blue-50/30", text: "text-brand-primary", title: "text-brand-primary" },
    navy: { header: "bg-[#1e3a8a]", body: "bg-[#eff6ff]", text: "text-[#1e3a8a]", title: "text-[#1e3a8a]" },
    purple: { header: "bg-[#7c3aed]", body: "bg-[#f5f3ff]", text: "text-[#7c3aed]", title: "text-[#7c3aed]" }
  };

  const scrollToCourses = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Layout>
      <div className="flex min-h-screen bg-white">
        {/* FULL-HEIGHT STICKY SIDEBAR */}
        <PageSidebar
          title="Student Guide"
          quote="EduMeUp answers every question you have about Cambridge."
          links={sidebarLinks}
        />

        <div className="flex-1 min-w-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex flex-col">

            {/* SECTION 1 | HERO BANNER (Blue Theme) */}
            <section className="relative overflow-hidden bg-white py-20 px-6 border-b border-slate-100">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-400/10 blur-[120px] rounded-full -mr-64 -mt-64"></div>
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full -ml-32 -mb-32"></div>

              <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 max-w-2xl">
                    <span className="inline-block rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-sm font-bold tracking-wide text-brand-primary uppercase">
                      Your Cambridge O-Level Journey — Powered by AI, Proven by Science
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-semibold leading-[1.1] tracking-tight text-slate-900">
                      Start Mastering.
                      <span className="block text-brand-primary mt-2 text-2xl md:text-3xl">The only Cambridge platform that knows exactly what you need — before you ask.</span>
                    </h1>
                    <p className="text-lg text-slate-600 font-medium leading-relaxed">
                      Most students spend their Cambridge journey studying the wrong things — spending time on topics they already understand while their actual gaps remain unaddressed. EduMeUp fixes this. A free 30-minute diagnostic identifies your exact gaps. An AI-powered pathway tells you precisely what to study, in which order, and at which pace. Mastery-gated courses ensure you genuinely understand before advancing. The result: 75%+ long-term retention vs. the 5% that traditional studying produces.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Link href="/diagnostics">
                        <Button className="w-full sm:w-auto h-14 px-8 bg-brand-primary hover:bg-blue-600 text-white text-lg font-bold rounded-xl shadow-[0_15px_30px_rgba(35,102,201,0.4)]">
                          Take the Free Diagnostic
                        </Button>
                      </Link>
                      <a href="#courses" onClick={scrollToCourses}>
                        <Button variant="outline" className="w-full sm:w-auto h-14 px-8 border-slate-200 text-slate-700 hover:bg-slate-50 text-lg font-bold rounded-xl backdrop-blur-md">
                          Browse Courses
                        </Button>
                      </a>
                    </div>
                    <p className="text-sm text-slate-500">Free · No login required to start · Results in 30 minutes</p>

                    <div className="flex flex-wrap gap-3 pt-6">
                      <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 text-base font-semibold text-slate-700 border border-slate-200 shadow-sm">
                        <Award className="h-4 w-4 text-brand-primary" /> 91% pass rate — Designed to Achieve
                      </div>
                      <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 text-base font-semibold text-slate-700 border border-slate-200 shadow-sm">
                        <BarChart3 className="h-4 w-4 text-brand-primary" /> 75%+ long-term retention vs. 5% from passive study
                      </div>
                      <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 text-base font-semibold text-slate-700 border border-slate-200 shadow-sm">
                        <Lock className="h-4 w-4 text-brand-primary" /> Private diagnostic results — only you see them
                      </div>
                    </div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 lg:pl-10">
                    <div className="bg-white rounded-[2.5rem] border border-white/20 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] overflow-hidden scale-105 origin-center text-slate-800">
                      <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold text-xs">ZH</div>
                          <div className="text-left">
                            <p className="text-white font-bold text-xs leading-tight">Student: Zainab H.</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-brand-primary">
                          <Activity className="w-3 h-3 animate-pulse" />
                          <span className="text-xs font-black uppercase tracking-widest">Live Updates</span>
                        </div>
                      </div>
                      <div className="p-6 space-y-6 bg-slate-50/50">
                        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Subject Progress</p>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between text-sm mb-1 font-bold"><span>Chemistry</span><span className="text-brand-primary">72%</span></div>
                              <div className="h-2 bg-slate-100 rounded-full"><div className="h-full bg-brand-primary rounded-full" style={{ width: '72%' }}></div></div>
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1 font-bold"><span>Physics</span><span className="text-amber-500">58%</span></div>
                              <div className="h-2 bg-slate-100 rounded-full"><div className="h-full bg-amber-500 rounded-full" style={{ width: '58%' }}></div></div>
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1 font-bold"><span>Maths</span><span className="text-[#1A7A3A]">89%</span></div>
                              <div className="h-2 bg-slate-100 rounded-full"><div className="h-full bg-[#1A7A3A] rounded-full" style={{ width: '89%' }}></div></div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 shadow-sm">
                          <Calendar className="h-5 w-5 text-amber-500 mt-0.5" />
                          <div>
                            <p className="font-bold text-amber-600 text-sm">Spaced Retrieval Reminder</p>
                            <p className="text-xs text-slate-600 mt-1 font-medium">Review: Mole Concept — due today (Day 7)</p>
                          </div>
                        </div>
                        <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-4 shadow-sm">
                          <div className="flex items-center gap-2 mb-2">
                            <MessageCircle className="h-4 w-4 text-brand-primary" />
                            <p className="font-bold text-sm text-brand-primary">AI Study Advisor</p>
                          </div>
                          <p className="text-xs text-slate-700 leading-relaxed font-medium">
                            "Based on your recent Physics mock, I recommend revising Kinematics. You lost 4 marks on AO2 application questions. Here is a targeted practice set."
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* SECTION 2 | THE STUDENT PROBLEM */}
            <section id="problem" className="py-20 bg-white scroll-mt-10 border-y border-slate-100">
              <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-6">You Are Working Hard. But Are You Studying the Right Things?</h2>
                  <p className="text-lg text-slate-600 font-medium leading-relaxed">
                    Cambridge O-Level is not hard because it tests difficult content. It is hard because it tests whether you genuinely understand and can apply what you know. EduMeUp uses the approach that cognitive science research identifies as the most effective.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {problems.map((prob, i) => (
                    <Card key={i} className="border-l-4 border-l-brand-primary border-y-slate-200 border-r-slate-200 shadow-sm rounded-r-2xl rounded-l-none bg-white">
                      <CardContent className="p-8">
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{prob.title}</h3>
                        <p className="text-slate-600 mb-6 font-medium leading-relaxed">{prob.desc}</p>
                        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                          <p className="text-base font-medium text-slate-800">
                            <span className="font-bold text-brand-primary mr-1">EduMeUp fix:</span> {prob.fix}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-12 text-center text-lg font-medium text-slate-700 max-w-3xl mx-auto italic">
                  EduMeUp is not a content library. It is a learning system — designed so that everything you study actually stays with you until examination day and beyond.
                </div>
              </div>
            </section>

            {/* SECTION 3 | YOUR COURSE CATEGORIES */}
            <section id="courses" className="py-20 bg-white scroll-mt-10">
              <div className="max-w-5xl mx-auto px-6">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-6">Everything You Need for Cambridge O-Level — From Foundation to Examination Day.</h2>
                  <p className="text-lg text-slate-600 max-w-4xl mx-auto font-medium leading-relaxed">
                    EduMeUp's courses are organised into six categories. Your free diagnostic tells you which categories apply to your current level and what to start with. If you have not yet taken the diagnostic, browse the categories below and start wherever feels right — you can always take the diagnostic afterwards to confirm your starting point.
                  </p>
                </div>

                <div className="space-y-6">
                  {categories.map((cat, i) => (
                    <div key={i} className={`border-l-4 ${cat.color} bg-white shadow-sm hover:shadow-md transition-all rounded-r-2xl border-y border-r border-slate-100 p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start`}>
                      <div className="md:w-1/4 shrink-0">
                        <span className="inline-block px-3 py-1 text-xs font-black uppercase tracking-widest rounded-md bg-slate-100 text-slate-600 mb-3">{cat.id}</span>
                        <h3 className="text-xl font-bold text-slate-900 leading-snug">{cat.title}</h3>
                      </div>
                      <div className="md:w-1/2">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Who it is for:</p>
                        <p className="text-base text-slate-700 font-medium mb-4">{cat.who}</p>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Courses available:</p>
                        <p className="text-base text-slate-700 font-medium">{cat.courses}</p>
                      </div>
                      <div className="md:w-1/4 w-full flex md:justify-end items-center md:items-start pt-4 md:pt-0">
                        <Link href={cat.link}>
                          <Button variant="outline" className="w-full text-brand-primary border-blue-200 hover:bg-blue-50 font-bold rounded-xl h-10">
                            {cat.linkText} <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 4 | HOW EDUMEUP WORKS — YOUR 8-STEP LEARNING JOURNEY */}
            <section id="journey" className="py-24 bg-white border-t border-slate-100 scroll-mt-10">
              <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-semibold text-slate-900 mb-6 leading-tight">Eight Research-Backed Steps. <br className="hidden md:block" /> From Where You Are Now to Where You Need to Be.</h2>
                  <p className="text-lg text-slate-600 max-w-4xl mx-auto font-medium leading-relaxed">
                    Every EduMeUp student follows the same eight-step journey — but the content within each step is personalised to your specific gaps, your subjects, and your examination timeline. The steps below are not generic advice — they are the operational sequence of EduMeUp's platform, designed to take you from your current level to Cambridge mastery in the shortest time the research says is possible.
                  </p>
                </div>

                {/* Visual Sequence Strip */}
                <div className="hidden md:flex justify-between items-center mb-20 relative px-10">
                  <div className="absolute top-1/2 left-10 right-10 h-0.5 bg-slate-200 -z-10 rounded-full"></div>
                  {steps.map((step, i) => (
                    <div key={i} className="flex flex-col items-center group">
                      <div className={`w-12 h-12 rounded-full ${colorMap[step.color].bg} text-white flex items-center justify-center font-bold mb-3 shadow-lg border-4 border-white transition-transform group-hover:scale-110 z-10`}>
                        {i + 1}
                      </div>
                      <span className={`text-xs font-black uppercase tracking-widest ${colorMap[step.color].text}`}>Step {i + 1}</span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase mt-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap absolute -bottom-6">
                        {step.title.split(' — ')[0]}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Step Cards Grid (Desktop) / Vertical Timeline (Mobile) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                  {/* Vertical line for mobile timeline */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-100 md:hidden -z-10"></div>

                  {steps.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="group relative"
                    >
                      {/* Timeline dot for mobile */}
                      <div className={`absolute -left-[22px] top-10 w-3 h-3 rounded-full ${colorMap[step.color].bg} border-4 border-white shadow-sm md:hidden z-10`}></div>

                      <Card className="h-full overflow-hidden border border-slate-100 shadow-sm rounded-2xl bg-white hover:shadow-xl transition-all duration-300 flex flex-col ml-6 md:ml-0">
                        {/* Color-coded header */}
                        <div className={`${colorMap[step.color].header} p-4 text-white flex items-center gap-4`}>
                          <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-xl shrink-0">
                            {i + 1}
                          </div>
                          <h3 className="text-lg font-bold text-white leading-tight">{step.title}</h3>
                        </div>

                        <CardContent className="p-8 flex-1 flex flex-col">
                          <div className="space-y-6 flex-1">
                            <div>
                              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <Zap className="w-3 h-3" /> What you do
                              </p>
                              <p className="text-base text-slate-700 font-medium leading-relaxed">{step.do}</p>
                            </div>
                            <div>
                              <p className={`text-xs font-black ${colorMap[step.color].text} uppercase tracking-widest mb-2 flex items-center gap-2`}>
                                <CheckCircle2 className="w-3 h-3" /> What you get
                              </p>
                              <p className="text-base text-slate-700 font-medium leading-relaxed">{step.get}</p>
                            </div>

                            {/* Extra Section for Step 8 */}
                            {step.extra && (
                              <div className="mt-6 p-5 bg-blue-50/50 border border-blue-100 rounded-xl space-y-3">
                                <p className="text-[12px] font-bold text-[#1e3a8a] uppercase tracking-wide flex items-center gap-2">
                                  <Award className="w-4 h-4" /> {step.extra.title}
                                </p>
                                <p className="text-[13px] text-slate-700 font-medium leading-relaxed italic">
                                  {step.extra.content}
                                </p>
                              </div>
                            )}
                          </div>

                          <div className={`mt-8 pt-6 border-t border-slate-100 ${colorMap[step.color].light} -mx-8 -mb-8 p-8`}>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
                              <span className="font-bold text-slate-800 not-italic uppercase tracking-tighter text-xs mr-1">Research: </span>
                              {step.research}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-20 text-center">
                  <div className="inline-flex flex-col md:flex-row items-center gap-6 p-8 bg-slate-50 rounded-[2rem] border border-slate-200">
                    <p className="text-slate-700 font-medium text-lg max-w-2xl text-center md:text-left">
                      Steps 1 and 2 happen before any study begins. Steps 3-5 are the active learning phase. Steps 6-8 are the consolidation and examination preparation phase.
                    </p>
                    <Link href="/diagnostics">
                      <Button className="h-14 px-8 bg-brand-primary hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg">
                        Start Step 1: Take Diagnostic
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5 | THE 6-STAGE MASTERY CYCLE — INSIDE EVERY EDUMEUP COURSE */}
            <section id="mastery-cycle" className="py-24 bg-slate-50/30 scroll-mt-10 border-y border-slate-100">
              <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-semibold text-slate-900 mb-6 leading-tight">Inside Every Course: The 6-Stage Mastery Cycle That Changes How You Learn.</h2>
                  <p className="text-lg text-slate-600 max-w-4xl mx-auto mb-16 font-medium leading-relaxed">
                    Every single course on EduMeUp — from the Vocabulary Mastery course to the O-Level Chemistry final chapter — uses the same 6-stage learning cycle. This is not a lesson structure. It is the cognitive process that research identifies as producing genuine, durable learning. Here is what happens inside every topic you study:
                  </p>

                  {/* Circular Flow Diagram / Connected Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 relative">
                    {masteryStages.map((stage, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="relative"
                      >
                        <div className={`h-full p-8 rounded-[2rem] ${stage.color} border ${stage.border} shadow-sm hover:shadow-md transition-all group flex flex-col items-center text-center`}>
                          <div className={`w-14 h-14 bg-white/80 ${stage.accent} rounded-2xl flex items-center justify-center font-black text-xl mb-6 border border-white shadow-sm group-hover:scale-110 transition-transform`}>
                            {stage.num}
                          </div>
                          <h4 className="font-bold text-base text-slate-900 mb-3 tracking-wide uppercase">{stage.title}</h4>
                          <p className="text-base text-slate-600 font-medium leading-relaxed">{stage.desc}</p>
                        </div>

                        {/* Connector Arrows (Desktop) */}
                        {i < masteryStages.length - 1 && (
                          <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-20 items-center justify-center text-slate-200 pointer-events-none">
                            <ArrowRight className="w-6 h-6" />
                          </div>
                        )}

                        {/* Cycle Return Arrow (Desktop - from 6 back towards 1) */}
                        {i === 5 && (
                          <div className="hidden lg:flex absolute -bottom-10 left-1/2 -translate-x-1/2 text-slate-200 pointer-events-none italic text-xs font-black uppercase tracking-widest gap-2 items-center">
                            <RefreshCw className="w-3 h-3" /> Cycle repeats for every new topic
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  <div className="max-w-3xl mx-auto space-y-6 text-left">
                    <div className="bg-white/60 backdrop-blur-sm rounded-[2rem] p-10 border border-white shadow-sm">
                      <p className="text-slate-700 leading-relaxed text-lg font-medium mb-6">
                        The 80% mastery gate is not a threshold to aim for — it is the minimum before you are allowed to advance. Research shows that students who advance before reaching 80% on a prerequisite topic consistently struggle with every subsequent related topic. EduMeUp enforces this standard automatically.
                      </p>
                      <p className="text-slate-600 leading-relaxed text-base">
                        This approach ensures that you never build on a weak foundation. Instead of moving through a syllabus by date, you move through it by mastery. The result is a rock-solid understanding that makes advanced topics feel accessible rather than overwhelming.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6 | SAMPLE H5P INTERACTIONS */}
            <section id="h5p-samples" className="py-24 bg-white border-t border-slate-100 overflow-hidden scroll-mt-10">
              <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-6">This Is What Studying on EduMeUp Actually Looks Like.</h2>
                  <p className="text-lg text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
                    No passive video. No static PDFs. Every activity requires you to think, apply, and respond. The platform adjusts based on your answers. The AI gives you immediate, specific feedback — not just 'correct' or 'incorrect' but why your answer earned or lost marks, exactly as a Cambridge examiner would explain it.
                  </p>
                </div>

                <div className="space-y-48">
                  {h5pActivities.map((activity) => (
                    <div key={activity.id} className="space-y-12">
                      <div className="text-center max-w-2xl mx-auto">
                        <h3 className={`text-2xl md:text-3xl font-bold ${h5pTheme[activity.color].title} tracking-tight mb-4`}>
                          {activity.title}
                        </h3>
                        <p className="text-slate-500 font-medium text-sm uppercase tracking-[0.2em]">[H5P ACTIVITY TYPE: {activity.type}]</p>
                      </div>

                      {/* DEVICE FRAME MOCKUP */}
                      <div className="relative mx-auto">
                        {/* Shadow and outer glow */}
                        <div className="absolute -inset-4 bg-slate-200/50 blur-3xl rounded-[3rem] -z-10"></div>
                        
                        {/* The Frame */}
                        <div className="relative mx-auto border-slate-900 bg-slate-900 border-[12px] md:border-[16px] rounded-[2.5rem] md:rounded-[3rem] shadow-2xl overflow-hidden w-full max-w-5xl aspect-[16/10] md:aspect-auto md:min-h-[700px] flex flex-col">
                          
                          {/* Top Camera/Speaker Notch */}
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-20 flex items-center justify-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-slate-800"></div>
                            <div className="w-12 h-1.5 rounded-full bg-slate-800"></div>
                          </div>

                          {/* Screen Header (Inside the Device) */}
                          <div className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between relative z-10 shrink-0">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                                <span className="text-white font-black text-sm italic">E</span>
                              </div>
                              <span className="font-black text-slate-800 text-lg tracking-tighter">EduMeUp</span>
                              <div className="h-4 w-px bg-slate-200 mx-2 hidden md:block"></div>
                              <span className="text-slate-400 font-bold text-xs uppercase tracking-widest hidden md:block">Learning Management</span>
                            </div>
                            
                            <div className="flex items-center gap-4">
                              <div className="flex gap-1.5 items-center mr-4">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mastery Level: 84%</span>
                              </div>
                              <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-md overflow-hidden ring-2 ring-slate-50 transition-transform hover:scale-110 cursor-pointer">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=student${activity.id}`} alt="Student" />
                              </div>
                            </div>
                          </div>

                          {/* Screen Content Scroll Area */}
                          <div className="flex-1 overflow-y-auto bg-slate-50 relative flex flex-col">
                            {/* Inner Page Header */}
                            <div className={`${h5pTheme[activity.color].header} p-8 text-white relative overflow-hidden`}>
                              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2 text-white">Subject Mastery Activity</p>
                              <h4 className="text-xl md:text-3xl font-extrabold leading-tight tracking-tight max-w-2xl text-white">{activity.topic}</h4>
                              <div className="flex gap-2 mt-4">
                                {["AO1", "AO2", "AO3"].map(ao => (
                                  <span key={ao} className={`px-2 py-0.5 rounded text-xs font-bold ${ao === activity.title.split('—')[1]?.trim().split(' ')[0] ? 'bg-white text-slate-900' : 'bg-black/10 text-white/70'}`}>
                                    {ao}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Inner Page Body */}
                            <div className="p-4 md:p-8 flex-1">
                              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-full flex flex-col">
                                <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className={`px-3 py-1 rounded-full ${h5pTheme[activity.color].title.replace('text-', 'bg-')} flex items-center gap-2 shadow-sm`}>
                                      <p className="text-xs font-black text-white uppercase tracking-widest">INSTRUCTION</p>
                                    </div>
                                  </div>
                                  <p className="text-[15px] italic font-medium leading-relaxed text-slate-700">{activity.instruction}</p>
                                </div>

                                <div className="p-6 md:p-8 flex-1 bg-white relative">
                                  {/* THE ACTUAL ACTIVITY RENDERED INSIDE THE FRAME */}
                            {/* Activity 1 Mockup: Chemistry Drag-and-Drop */}
                            {activity.id === 1 && (
                              <div className="space-y-8">
                                <div className="flex justify-between items-center">
                                  <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-inner font-mono text-xl text-center border-b-4 border-slate-800 flex-1">
                                    2H<sub className="text-blue-400">2</sub> + O<sub className="text-blue-400">2</sub> &rarr; 2H<sub className="text-blue-400">2</sub>O
                                  </div>
                                </div>

                                <div className="grid grid-cols-3 gap-6">
                                  {["moles of H2", "moles of O2", "moles of H2O"].map((label, idx) => (
                                    <div
                                      key={idx}
                                      ref={targetRefs[idx]}
                                      onPointerEnter={() => setAct1HoveredBox(idx)}
                                      onPointerLeave={() => setAct1HoveredBox(null)}
                                      onClick={() => act1SelectedTileIdx !== null && handleAct1Drop(idx, act1SelectedTileIdx)}
                                      className={`bg-slate-50 border-2 border-dashed ${act1Checked ? (act1IsCorrect ? 'border-green-300 bg-green-50/30' : 'border-red-300 bg-red-50/30') : (act1HoveredBox === idx ? 'border-blue-500 bg-blue-100/50 scale-[1.02] shadow-md ring-2 ring-blue-200' : (act1SelectedTileIdx !== null ? 'border-blue-400 bg-blue-50/20' : 'border-slate-300'))} rounded-2xl p-4 h-32 flex flex-col items-center justify-center group transition-all relative cursor-pointer`}
                                    >
                                      <span className="text-xs font-bold text-slate-400 uppercase mb-4 absolute top-4">{label}</span>
                                      {act1Placed[idx] ? (
                                        <motion.div
                                          initial={{ scale: 0.8, opacity: 0 }}
                                          animate={{ scale: 1, opacity: 1 }}
                                          className={`bg-brand-primary text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg transition-colors`}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            const next = [...act1Placed];
                                            next[idx] = null;
                                            setAct1Placed(next);
                                          }}
                                        >
                                          {act1Placed[idx]}
                                        </motion.div>
                                      ) : (
                                        <div className="w-full h-10 bg-slate-200/50 rounded-lg shadow-inner mt-6"></div>
                                      )}

                                      {act1Checked && (
                                        <div className="absolute -bottom-3 right-2">
                                          {(idx === 0 && act1Placed[idx] === "2 mol") ||
                                            (idx === 1 && act1Placed[idx] === "1 mol") ||
                                            (idx === 2 && act1Placed[idx] === "2 mol") ? (
                                            <CheckCircle2 className="w-6 h-6 text-green-500 bg-white rounded-full" />
                                          ) : (
                                            <AlertTriangle className="w-6 h-6 text-red-500 bg-white rounded-full" />
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>

                                <div className="space-y-3">
                                  <div className="flex justify-between items-center">
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Available Tiles (Click to select or drag):</p>
                                    {act1SelectedTileIdx !== null && (
                                      <span className="text-xs font-bold text-brand-primary animate-pulse">Select a target box above</span>
                                    )}
                                  </div>
                                  <div className="flex flex-wrap gap-3 pt-2">
                                    {["2 mol", "1 mol", "2 mol", "4 mol", "32 g", "36 g"].map((val, idx) => (
                                      <motion.div
                                        key={idx}
                                        drag
                                        dragSnapToOrigin
                                        onDragStart={() => {
                                          setAct1SelectedTileIdx(idx);
                                          setAct1HoveredBox(null);
                                        }}
                                        onDragEnd={() => handleDragEnd(idx, idx)}
                                        onClick={() => setAct1SelectedTileIdx(idx === act1SelectedTileIdx ? null : idx)}
                                        whileDrag={{
                                          scale: 1.1,
                                          zIndex: 100,
                                          cursor: 'grabbing',
                                          pointerEvents: 'none'
                                        }}
                                        className={`px-4 py-2 rounded-xl text-sm font-bold shadow-sm cursor-grab hover:shadow-md transition-all select-none border ${act1SelectedTileIdx === idx ? 'bg-brand-primary text-white border-blue-700 ring-2 ring-blue-200' : 'bg-white text-slate-700 border-slate-200 hover:border-brand-primary'}`}
                                      >
                                        {val}
                                      </motion.div>
                                    ))}
                                  </div>
                                </div>

                                <div className="flex justify-between items-center pt-8 border-t border-slate-100">
                                  <div className="flex items-center gap-4">
                                    <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                                      <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(act1Placed.filter(v => v !== null).length / 3) * 100}%` }}
                                        className="h-full bg-brand-primary"
                                      ></motion.div>
                                    </div>
                                    <span className="text-xs font-bold text-slate-500 uppercase">
                                      Progress: {act1Placed.filter(v => v !== null).length}/3
                                    </span>
                                  </div>
                                  <div className="flex gap-3">
                                    <Button
                                      variant="outline"
                                      onClick={resetAct1}
                                      className="rounded-xl font-bold h-12 px-6"
                                    >
                                      Reset
                                    </Button>
                                    <Button
                                      className="bg-brand-primary hover:bg-blue-700 text-white font-bold rounded-xl h-12 px-8"
                                      onClick={checkAct1Answers}
                                      disabled={act1Placed.some(v => v === null)}
                                    >
                                      Check Answers
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Activity 2 Mockup: Evaluation activity */}
                            {activity.id === 2 && (
                              <div className="space-y-6">
                                {/* Two-column layout: passage (left) + student response (right) */}
                                <div className="grid md:grid-cols-2 gap-6">
                                  {/* Left Panel: Passage Extract */}
                                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">PASSAGE EXTRACT</p>
                                    <div className="leading-relaxed text-slate-700 text-[15px] font-medium space-y-3">
                                      <p>
                                        The clock on the wall ticked louder, each second a hammer blow.
                                        <span className="bg-red-100 px-1 rounded">"Now or never,"</span> she whispered, her fingers trembling over the keyboard.
                                        <span className="bg-blue-100 px-1 rounded">The cursor blinked – once, twice, three times</span> – a metronome counting down to disaster.
                                        <span className="bg-yellow-100 px-1 rounded">Sirens wailed in the distance</span>, growing closer.
                                        <span className="bg-green-100 px-1 rounded">She had thirty seconds.</span> Twenty. Ten. Her breath caught.
                                      </p>
                                      <p className="text-xs text-slate-400 italic mt-2">Highlighted words/phrases are for illustration only.</p>
                                    </div>
                                  </div>

                                  {/* Right Panel: Student Response + Mark Scheme */}
                                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-5">
                                    <div>
                                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">STUDENT RESPONSE</p>
                                      <div className="mt-2 p-4 bg-slate-50 rounded-xl border border-slate-100 italic text-slate-700 text-base leading-relaxed">
                                        "The writer uses repetition of 'seconds' and short sentences to create a sense of urgency. The words 'ticked louder' and 'blinked' also add to this. It makes the reader feel like something bad is about to happen."
                                      </div>
                                    </div>

                                    <div>
                                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">MARK SCHEME CRITERIA</p>
                                      <div className="mt-2 space-y-2 text-[13px]">
                                        <div className="flex items-start gap-2 p-2 rounded-lg bg-green-50 border border-green-100">
                                          <span className="font-black text-green-700">Band 1</span>
                                          <span className="text-slate-700">Specific technique named + precise textual reference + clear effect on reader.</span>
                                        </div>
                                        <div className="flex items-start gap-2 p-2 rounded-lg bg-yellow-50 border border-yellow-100">
                                          <span className="font-black text-yellow-700">Band 2</span>
                                          <span className="text-slate-700">Technique identified + some reference but effect not fully developed.</span>
                                        </div>
                                        <div className="flex items-start gap-2 p-2 rounded-lg bg-red-50 border border-red-100">
                                          <span className="font-black text-red-700">Band 3</span>
                                          <span className="text-slate-700">General comment, vague or no reference, no clear effect.</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Band Selection Buttons */}
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                                  <p className="text-[13px] font-bold text-slate-700">Award a band to this student’s response and explain why.</p>
                                  <div className="flex gap-4 flex-wrap">
                                    {["Band 1", "Band 2", "Band 3"].map((band) => (
                                      <Button
                                        key={band}
                                        variant={act2SelectedBand === band ? "default" : "outline"}
                                        className={`rounded-xl font-bold px-6 ${act2SelectedBand === band
                                            ? "bg-[#1e3a8a] text-white"
                                            : "border-slate-300 text-slate-700 hover:bg-slate-100"
                                          }`}
                                        onClick={() => !act2Checked && setAct2SelectedBand(band)}
                                        disabled={act2Checked}
                                      >
                                        {band}
                                      </Button>
                                    ))}
                                  </div>

                                  {/* Explanation Text Box */}
                                  <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Explain your decision in 2–3 sentences</p>
                                    <textarea
                                      rows={3}
                                      className="w-full border border-slate-200 rounded-xl p-3 text-sm font-medium focus:ring-2 focus:ring-[#1e3a8a] outline-none transition-all"
                                      placeholder="e.g., This response identifies repetition and short sentences, and it gives a textual reference ('ticked louder'). However, it doesn't explain how those features create urgency in a specific way, so it fits Band 2..."
                                      value={act2Explanation}
                                      onChange={(e) => !act2Checked && setAct2Explanation(e.target.value)}
                                      disabled={act2Checked}
                                    />
                                  </div>
                                </div>

                                {/* Footer Buttons */}
                                <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                                  <span className="text-xs font-bold text-slate-400 uppercase">
                                    Status: {!act2SelectedBand ? "No band selected" : `${act2SelectedBand} chosen`}
                                  </span>
                                  <div className="flex gap-3">
                                    <Button
                                      variant="outline"
                                      onClick={() => {
                                        setAct2SelectedBand(null);
                                        setAct2Explanation("");
                                        setAct2Checked(false);
                                        setAct2IsCorrect(false);
                                      }}
                                      className="rounded-xl font-bold"
                                    >
                                      Reset
                                    </Button>
                                    <Button
                                      className="bg-[#1e3a8a] text-white font-bold rounded-xl px-8"
                                      onClick={checkAct2Answers}
                                      disabled={!act2SelectedBand || !act2Explanation.trim() || act2Checked}
                                    >
                                      Submit Evaluation
                                    </Button>
                                  </div>
                                </div>

                                {/* AI Feedback after submission */}

                              </div>
                            )}

                            {/* Activity 3 Mockup: Mathematics Adaptive Sequence */}
                            {activity.id === 3 && (
                              <div className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-8 items-start">
                                  <div className="space-y-6">
                                    <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
                                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Simultaneous Equations</p>
                                      <div className="font-serif text-2xl text-slate-800 space-y-2">
                                        <div className="flex items-center gap-4">
                                          <span className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-sans text-slate-500 font-bold">1</span>
                                          3x + 2y = 12
                                        </div>
                                        <div className="flex items-center gap-4">
                                          <span className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-sans text-slate-500 font-bold">2</span>
                                          x - y = 1
                                        </div>
                                      </div>
                                    </div>
                                    <div className="space-y-3">
                                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select Method</p>
                                      <div className="flex gap-3">
                                        <Button
                                          variant={act3Method === 'Elimination' ? 'default' : 'outline'}
                                          className={`flex-1 rounded-xl font-bold ${act3Method === 'Elimination' ? 'bg-[#0d9488]' : 'border-slate-200'}`}
                                          onClick={() => setAct3Method('Elimination')}
                                          disabled={act3Checked}
                                        >
                                          Elimination
                                        </Button>
                                        <Button
                                          variant={act3Method === 'Substitution' ? 'default' : 'outline'}
                                          className={`flex-1 rounded-xl font-bold ${act3Method === 'Substitution' ? 'bg-[#0d9488]' : 'border-slate-200'}`}
                                          onClick={() => setAct3Method('Substitution')}
                                          disabled={act3Checked}
                                        >
                                          Substitution
                                        </Button>
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200/50">
                                      <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase mb-2">Final Answer x</p>
                                        <input
                                          type="text"
                                          className={`w-full bg-white border-2 ${act3Checked ? (act3X === "2" ? 'border-green-500' : 'border-red-500') : 'border-brand-primary'} rounded-xl h-12 text-center font-bold text-lg text-slate-800 shadow-sm outline-none`}
                                          value={act3X}
                                          onChange={(e) => setAct3X(e.target.value)}
                                          placeholder="?"
                                          disabled={act3Checked}
                                        />
                                      </div>
                                      <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase mb-2">Final Answer y</p>
                                        <input
                                          type="text"
                                          className={`w-full bg-white border-2 ${act3Checked ? (act3Y === "1" ? 'border-green-500' : 'border-red-500') : 'border-brand-primary'} rounded-xl h-12 text-center font-bold text-lg text-slate-800 shadow-sm outline-none`}
                                          value={act3Y}
                                          onChange={(e) => setAct3Y(e.target.value)}
                                          placeholder="?"
                                          disabled={act3Checked}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col h-full min-h-[300px]">
                                    <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
                                      <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Scratchpad / Working</span>
                                      <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                      </div>
                                    </div>
                                    <div className="p-6 flex-1 font-mono text-sm space-y-2">
                                      {act3Method === 'Substitution' ? (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                          <p className="text-slate-500 italic mb-4">// System: Substitution method selected</p>
                                          <p className="text-slate-800">From (2): x = 1 + y</p>
                                          <p className="text-slate-800">Sub into (1): 3(1 + y) + 2y = 12</p>
                                          <p className="text-slate-800">3 + 3y + 2y = 12</p>
                                          <p className="text-slate-800 font-bold text-blue-600">5y = 9 ... ?</p>
                                          <p className="text-xs text-slate-400 mt-4">(AI is analyzing your scratchpad steps...)</p>
                                        </motion.div>
                                      ) : act3Method === 'Elimination' ? (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                          <p className="text-slate-500 italic mb-4">// System: Elimination method selected</p>
                                          <p className="text-slate-800">Multiply (2) by 2: 2x - 2y = 2</p>
                                          <p className="text-slate-800">Add to (1): (3x + 2y) + (2x - 2y) = 12 + 2</p>
                                          <p className="text-slate-800">5x = 14 ... ?</p>
                                          <p className="text-xs text-slate-400 mt-4">(AI is analyzing your scratchpad steps...)</p>
                                        </motion.div>
                                      ) : (
                                        <div className="flex items-center justify-center h-full text-slate-300 italic">
                                          Select a method to start working
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                                  <div className="flex items-center gap-4">
                                    <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                                      <div className={`h-full bg-[#7c3aed] transition-all`} style={{ width: act3Checked ? '100%' : '25%' }}></div>
                                    </div>
                                    <span className="text-xs font-bold text-slate-500 uppercase">{act3Checked ? 'Step 1 Complete' : 'Question 1 of 4'}</span>
                                  </div>
                                  <div className="flex gap-3">
                                    <Button
                                      variant="outline"
                                      onClick={() => { setAct3X(""); setAct3Y(""); setAct3Method(null); setAct3Checked(false); setAct3IsCorrect(false); }}
                                      className="rounded-xl font-bold"
                                    >
                                      Reset
                                    </Button>
                                    <Button
                                      className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-bold rounded-xl h-12 px-10"
                                      onClick={checkAct3Answers}
                                      disabled={!act3Method || !act3X || !act3Y || act3Checked}
                                    >
                                      Submit Answer
                                    </Button>
                                  </div>
                                </div>

                              </div>
                            )}
                          </div>

                          {/* AI Feedback Section - Show only the relevant feedback after submission */}
                          {((activity.id === 1 && act1Checked) ||
                            (activity.id === 3 && act3Checked)) && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="p-8 border-t border-slate-200/50 bg-slate-50/30 overflow-hidden"
                              >
                                <p className={`text-[13px] font-black ${h5pTheme[activity.color].text} uppercase tracking-widest mb-6`}>AI ASSESSMENT:</p>

                                <div className="max-w-3xl">
                                  {((activity.id === 1 && act1IsCorrect) || (activity.id === 3 && act3IsCorrect)) ? (
                                    <motion.div
                                      initial={{ x: -20, opacity: 0 }}
                                      animate={{ x: 0, opacity: 1 }}
                                      className="bg-white p-6 rounded-2xl border-2 border-green-200 shadow-sm relative overflow-hidden group ring-4 ring-green-50"
                                    >
                                      <div className="absolute top-0 left-0 w-1.5 h-full bg-green-500"></div>
                                      <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                          <CheckCircle2 className="w-5 h-5" />
                                        </div>
                                        <p className="text-xs font-bold text-green-600 uppercase tracking-widest">CORRECT ANSWER</p>
                                      </div>
                                      <p className="text-[15px] font-medium leading-relaxed text-slate-700">
                                        {activity.correctFeedback}
                                      </p>
                                    </motion.div>
                                  ) : (
                                    <motion.div
                                      initial={{ x: -20, opacity: 0 }}
                                      animate={{ x: 0, opacity: 1 }}
                                      className="bg-white p-6 rounded-2xl border-2 border-red-200 shadow-sm relative overflow-hidden ring-4 ring-red-50"
                                    >
                                      <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500"></div>
                                      <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                                          <AlertTriangle className="w-5 h-5" />
                                        </div>
                                        <p className="text-xs font-bold text-red-600 uppercase tracking-widest">INCORRECT ANSWER</p>
                                      </div>
                                      <p className="text-[15px] font-medium leading-relaxed text-slate-600">
                                        {activity.incorrectFeedback}
                                      </p>
                                    </motion.div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>


                {/* Summary Note Box */}
                <div className="mt-20 max-w-5xl mx-auto">
                  <div className="bg-[#f0fdfa] border-l-4 border-[#0d9488] p-8 md:p-10 rounded-r-2xl shadow-sm">
                    <p className="text-slate-700 italic text-md md:text-xl leading-relaxed font-medium">
                      These three samples represent three different H5P activity types: drag-and-drop diagram, annotated text evaluation, and adaptive branching question sequence. EduMeUp courses use over 12 H5P activity types across all subjects — selected based on what the specific learning objective requires, not based on technical convenience.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7 | YOUR STUDENT DASHBOARD */}
            <section id="dashboard" className="py-24 bg-white border-t border-slate-100 scroll-mt-10">
              <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-6">Your Command Centre — Everything You Need, In One Place.</h2>
                  <p className="text-lg text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
                    When you log into EduMeUp, your dashboard shows you exactly what to do today, how much you have achieved this week, and where your attention is most needed. You do not need to decide what to study next — the dashboard tells you. Here is what you see:
                  </p>
                </div>

                <div className="bg-slate-50 rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden p-4 md:p-8">
                  {/* Dashboard Header Bar */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 px-2">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Welcome back, Student</h3>
                      <p className="text-sm text-slate-500 font-medium">Thursday, 12th May • 3 tasks remaining today</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                        <Flame className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-bold text-slate-700">12 Day Streak</span>
                      </div>
                      <div className="bg-brand-primary text-white px-4 py-2 rounded-xl shadow-md flex items-center gap-3">
                        <Award className="w-4 h-4" />
                        <span className="text-sm font-bold">1,240 Points</span>
                      </div>
                    </div>
                  </div>

                  {/* Realistic 9-Widget Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* 1. Today's Study Plan */}
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="font-bold text-slate-900 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-brand-primary" /> Today's Study Plan</h4>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded">Daily Goal</span>
                      </div>
                      <div className="space-y-3 flex-1">
                        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 flex items-center gap-3 group cursor-pointer hover:bg-rose-100/50 transition-colors">
                          <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-rose-500 font-bold">1</div>
                          <div className="flex-1">
                            <p className="text-[13px] font-bold text-slate-900">Diagnostic Retest: Math Pre-O</p>
                            <p className="text-xs text-rose-600 font-bold">Due by 4 PM</p>
                          </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex items-center gap-3 group cursor-pointer hover:bg-blue-100/50 transition-colors">
                          <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-brand-primary font-bold">2</div>
                          <div className="flex-1">
                            <p className="text-[13px] font-bold text-slate-900">Chemistry: Mole Concept</p>
                            <p className="text-xs text-brand-primary font-bold italic">Chapter 4 • Mastery Gate</p>
                          </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3 group cursor-pointer hover:bg-slate-200/50 transition-colors">
                          <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-400 font-bold">3</div>
                          <div className="flex-1">
                            <p className="text-[13px] font-bold text-slate-700">Retrieval: Bonding (D7)</p>
                            <p className="text-xs text-slate-500 font-medium">Scheduled for 6 PM</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 2. Subject Mastery Overview */}
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                      <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-brand-primary" /> Subject Mastery Overview</h4>
                      <div className="space-y-5 flex-1">
                        {[
                          { name: "English Language", score: 88, color: "bg-[#1A7A3A]" },
                          { name: "Mathematics", score: 82, color: "bg-[#1A7A3A]" },
                          { name: "Physics", score: 64, color: "bg-[#C8860A]" },
                          { name: "Chemistry", score: 42, color: "bg-[#D93025]" }
                        ].map((sub, i) => (
                          <div key={i} className="space-y-2 cursor-pointer group">
                            <div className="flex justify-between items-center">
                              <span className="text-[13px] font-bold text-slate-700 group-hover:text-brand-primary transition-colors">{sub.name}</span>
                              <span className="text-[13px] font-black text-slate-900">{sub.score}%</span>
                            </div>
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div className={`h-full ${sub.color} rounded-full transition-all`} style={{ width: `${sub.score}%` }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400">
                        <span>TAP TO BREAKDOWN</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>

                    {/* 3. Spaced Retrieval Schedule */}
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                      <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2"><Calendar className="w-5 h-5 text-brand-primary" /> Spaced Retrieval Schedule</h4>
                      <div className="space-y-4 flex-1">
                        <div className="space-y-2">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Chips (This Week)</p>
                          <div className="flex flex-wrap gap-2">
                            <span className="bg-rose-50 text-rose-700 text-xs px-3 py-1.5 rounded-full border border-rose-200 font-bold cursor-pointer hover:bg-rose-100 transition-colors">Mole Concept — Today</span>
                            <span className="bg-amber-50 text-amber-700 text-xs px-3 py-1.5 rounded-full border border-amber-200 font-bold cursor-pointer hover:bg-amber-100 transition-colors">Bonding — Day 3</span>
                            <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1.5 rounded-full border border-blue-200 font-bold cursor-pointer hover:bg-blue-100 transition-colors">Rates — Day 7</span>
                            <span className="bg-slate-50 text-slate-500 text-xs px-3 py-1.5 rounded-full border border-slate-200 font-bold cursor-pointer">Organic — Day 14</span>
                          </div>
                        </div>
                        <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                          <p className="text-xs text-slate-600 leading-relaxed font-medium">Next intensive retrieval session: <span className="font-bold text-slate-900">Saturday at 10:00 AM</span>. 4 topics scheduled.</p>
                        </div>
                      </div>
                      <Button variant="ghost" className="mt-4 w-full h-10 text-[12px] font-bold text-brand-primary hover:bg-blue-50 rounded-xl">View Calendar View</Button>
                    </div>

                    {/* 4. Current Course Progress */}
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                      <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2"><PlayCircle className="w-5 h-5 text-brand-primary" /> Current Progress</h4>
                      <div className="space-y-6 flex-1">
                        <div className="space-y-3">
                          <div className="flex justify-between items-end">
                            <div>
                              <p className="text-xs font-bold text-brand-primary uppercase tracking-widest mb-1">O-Level Chemistry</p>
                              <p className="text-base font-bold text-slate-900">Chapter 4: Mole Concept</p>
                            </div>
                            <span className="text-xl font-black text-slate-900">36%</span>
                          </div>
                          <div className="h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                            <div className="h-full bg-brand-primary rounded-full relative" style={{ width: "36%" }}>
                              <div className="absolute top-0 right-0 w-2 h-full bg-white/30 animate-pulse"></div>
                            </div>
                          </div>
                          <div className="flex justify-between text-xs font-bold text-slate-400">
                            <span>4 chapters completed</span>
                            <span>7 chapters remaining</span>
                          </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100">
                          <p className="text-[12px] font-bold text-indigo-700 mb-1">UP NEXT:</p>
                          <p className="text-[13px] font-bold text-slate-900 flex items-center justify-between">Chapter 5: Electrolysis <ArrowRight className="w-4 h-4" /></p>
                        </div>
                      </div>
                    </div>

                    {/* 5. AI Study Advisor */}
                    <div className="bg-[#eff6ff] border border-blue-100 rounded-3xl p-6 shadow-sm flex flex-col row-span-2">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="font-bold text-brand-primary flex items-center gap-2"><MessageCircle className="w-5 h-5" /> AI Study Advisor</h4>
                        <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce"></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce [animation-delay:0.2s]"></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce [animation-delay:0.4s]"></div>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col gap-4">
                        <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-blue-50 text-[13px] leading-relaxed text-slate-700 font-medium italic">
                          "Hi Student! I noticed your diagnostic retest for Math is due today. Would you like a quick review of the quadratic formula before you start?"
                        </div>
                        <div className="mt-auto space-y-4">
                          <div className="relative group">
                            <textarea
                              className="w-full bg-white border border-blue-200 rounded-2xl p-4 pr-12 text-[13px] font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400 shadow-sm"
                              placeholder="Type your question..."
                              rows={3}
                            />
                            <div className="absolute right-3 bottom-3 w-8 h-8 bg-brand-primary rounded-xl flex items-center justify-center text-white shadow-lg cursor-pointer hover:bg-[#1e3a8a] transition-colors">
                              <ArrowRight className="w-5 h-5" />
                            </div>
                          </div>
                          <p className="text-xs text-center font-bold text-blue-400 uppercase tracking-widest">Cambridge-Calibrated Advisor</p>
                        </div>
                      </div>
                    </div>

                    {/* 6. Exam Readiness Countdown */}
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl text-white flex flex-col">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="font-bold text-white flex items-center gap-2"><Zap className="w-5 h-5 text-yellow-400" /> Exam Readiness Countdown</h4>
                        <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-900/50 px-2 py-1 rounded">Live Target</span>
                      </div>
                      <div className="space-y-6 flex-1">
                        <div className="flex gap-4">
                          <div className="bg-white/10 px-4 py-2 rounded-xl text-center flex-1 backdrop-blur-sm border border-white/5">
                            <span className="block text-2xl font-black">124</span>
                            <span className="text-[9px] font-bold text-blue-300 uppercase tracking-widest">Days to Physics</span>
                          </div>
                          <div className="bg-white/10 px-4 py-2 rounded-xl text-center flex-1 backdrop-blur-sm border border-white/5">
                            <span className="block text-2xl font-black text-green-400">A</span>
                            <span className="text-[9px] font-bold text-blue-300 uppercase tracking-widest">Predicted Grade</span>
                          </div>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-4 border border-white/10 relative z-10">
                          <p className="text-[13px] leading-relaxed font-medium text-white">
                            Based on your current mastery rate, you are on track for an <span className="font-bold text-green-400">A</span> in Physics. To reach <span className="font-bold text-yellow-400">A*</span>, you need to complete <span className="font-bold text-white underline underline-offset-4 decoration-yellow-400">4 chapters</span> before June 1st.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 7. Diagnostic Results and Pathway */}
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                      <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2"><Search className="w-5 h-5 text-brand-primary" /> Diagnostic Pathway</h4>
                      <div className="space-y-4 flex-1">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Original Score</p>
                            <p className="text-xl font-black text-rose-500">45%</p>
                          </div>
                          <div className="bg-green-50 p-4 rounded-2xl border border-green-100 text-center">
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Current Mastery</p>
                            <p className="text-xl font-black text-[#1A7A3A]">68%</p>
                          </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-blue-50/30 border border-blue-100/50 relative overflow-hidden group cursor-pointer">
                          <div className="relative z-10">
                            <p className="text-[12px] font-bold text-slate-900 mb-1">Your Personalised Pathway</p>
                            <p className="text-xs text-slate-500 font-medium">Step 4 of 8: O-Level Bridge Complete</p>
                          </div>
                          <div className="absolute right-[-10px] bottom-[-10px] opacity-10 group-hover:opacity-20 transition-opacity">
                            <Navigation className="w-16 h-16 text-brand-primary" />
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" className="mt-4 w-full h-10 text-[12px] font-bold text-brand-primary border-blue-100 hover:bg-blue-50 rounded-xl">View Pathway Detail</Button>
                    </div>

                    {/* 8. Resources and Downloads */}
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                      <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2"><FileText className="w-5 h-5 text-brand-primary" /> Resources</h4>
                      <div className="space-y-3 flex-1">
                        {[
                          { name: "Mind maps & infographics", icon: Globe, count: 12 },
                          { name: "Topical Workbooks", icon: BookOpen, count: 5 },
                          { name: "Exam Readiness Checklist", icon: ShieldCheck, count: 2 }
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all cursor-pointer group">
                            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors">
                              <item.icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <p className="text-[13px] font-bold text-slate-800">{item.name}</p>
                              <p className="text-xs font-medium text-slate-400">{item.count} files available</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 p-3 rounded-xl bg-[#eff6ff] text-center border border-blue-50 cursor-pointer hover:bg-blue-100 transition-colors">
                        <span className="text-xs font-black text-brand-primary uppercase tracking-widest">Join Cambridge 360&deg; Hub</span>
                      </div>
                    </div>

                  </div>

                  {/* Dashboard Footer / Sub-page Entry */}
                  <div className="mt-12 text-center pt-8 border-t border-slate-200">
                    <Button className="bg-[#1e3a8a] hover:bg-[#152a61] text-white font-bold h-14 px-12 rounded-2xl shadow-xl hover:translate-y-[-2px] transition-all flex items-center gap-3 mx-auto text-lg">
                      View Full Progress Detail <ArrowRight className="w-6 h-6" />
                    </Button>
                    <p className="mt-4 text-[13px] text-slate-500 font-medium max-w-4xl mx-auto leading-relaxed">
                      A detailed progress sub-page showing: topic-by-topic mastery percentage across all enrolled subjects, AO1/AO2/AO3 performance per topic, spaced retrieval completion rate, assessment scores over time, and predicted examination grade based on current mastery trajectory.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8 | AI STUDY ADVISOR */}
            <section id="ai-advisor" className="py-24 bg-white border-y border-slate-100 scroll-mt-10">
              <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-6">Your AI Study Advisor. Available 24/7. Answers Like a Cambridge Expert.</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {aiSamples.map((sample, i) => (
                    <Card key={i} className="border border-slate-200 shadow-sm bg-slate-50/50 rounded-2xl hover:shadow-md transition-shadow">
                      <CardContent className="p-8 space-y-6">
                        <div className="flex gap-4">
                          <div className="w-10 h-10 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center text-lg shadow-inner"></div>
                          <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none text-base font-medium text-slate-800 shadow-sm leading-relaxed">
                            "{sample.q}"
                          </div>
                        </div>
                        <div className="flex gap-4 flex-row-reverse">
                          <div className="w-10 h-10 rounded-full bg-brand-primary flex-shrink-0 flex items-center justify-center text-white shadow-md"><Brain className="w-5 h-5" /></div>
                          <div className="bg-[#1e3a8a] text-white p-4 rounded-2xl rounded-tr-none text-base leading-relaxed shadow-sm font-medium">
                            {sample.a}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 9 | FINAL CTA */}
            <section id="cta" className="py-24 bg-white border-t border-slate-100 relative overflow-hidden scroll-mt-10">
              <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
                <h2 className="text-3xl md:text-5xl font-semibold mb-6 tracking-tight text-slate-900">The First Step Takes 30 Minutes. It Is Free. And It Changes Everything.</h2>
                <p className="text-lg text-slate-600 mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
                  Every hour you spend studying without knowing your gaps may not take you forward. The diagnostic costs nothing, takes 30 minutes, and gives you a precise, personalised starting point.
                </p>

                <div className="flex flex-col md:flex-row justify-center gap-4 mb-16 items-stretch max-w-5xl mx-auto">
                  <CtaCard
                    icon={<Activity className="w-8 h-8" />}
                    title="Take the Free Diagnostic First"
                    subtitle="Know your exact gaps. Get your personalised pathway. Start studying with a plan."
                    meta="Free · No login required · 30 minutes"
                    buttonText="Start Free Diagnostic"
                    buttonHref="/diagnostics"
                  />
                  <CtaCard
                    icon={<BookOpen className="w-8 h-8" />}
                    title="Browse All Courses"
                    subtitle="See every course available. Browse by subject, level, or category."
                    meta="All courses available now"
                    buttonText="Browse Courses"
                    buttonHref="#courses"
                    onClick={scrollToCourses}
                  />
                </div>

                <div className="flex flex-wrap justify-center gap-6 mb-12">
                  <div className="flex items-center gap-2 text-[13px] font-bold text-slate-700 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm"><Award className="w-4 h-4 text-brand-primary" /> 91% pass rate (Designed to Achieve)</div>
                  <div className="flex items-center gap-2 text-[13px] font-bold text-slate-700 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm"><BarChart3 className="w-4 h-4 text-brand-primary" /> 75%+ retention (Designed to Achieve)</div>
                  <div className="flex items-center gap-2 text-[13px] font-bold text-slate-700 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm"><Lock className="w-4 h-4 text-brand-primary" /> Private results</div>
                  <div className="flex items-center gap-2 text-[13px] font-bold text-slate-700 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm"><CheckCircle2 className="w-4 h-4 text-brand-primary" /> 80% mastery gate</div>
                  <div className="flex items-center gap-2 text-[13px] font-bold text-slate-700 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm"><Brain className="w-4 h-4 text-brand-primary" /> AI Study Advisor</div>
                  <div className="flex items-center gap-2 text-[13px] font-bold text-slate-700 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm"><Globe className="w-4 h-4 text-brand-primary" /> Global Access</div>
                </div>

                <div className="pt-8 border-t border-slate-200">
                  <p className="text-slate-600 font-medium text-[15px]">
                    Already have an account? <Link href="/login" className="text-brand-primary font-bold hover:text-blue-700 transition-colors">Log in to your dashboard</Link>
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}

