import type { SubjectData } from "./types";

const englishLanguage: SubjectData = {
  slug: "english-language",
  subjectName: "English Language",
  subjectCode: "Cambridge O-Level English Language",
  heroHeadline: "Cambridge O-Level English Language - The Most Comprehensive Preparation Available.",
  heroSubHeadline: "10 dedicated courses. Both papers. Every writing type. Every mark scheme technique.",
  heroCopy:
    "EduMeUp's Cambridge O-Level English Language programme is the most comprehensive online preparation available for Cambridge O-Level English. 10 dedicated courses cover the full breadth of Cambridge Paper 1 and Paper 2 - not as a single generic course, but as a suite of specific, targeted programmes designed to raise student performance in each assessed skill. Every course teaches students to write in the exact format Cambridge examiners expect - with mark scheme logic embedded in every exercise. Students do not just read about writing techniques. They write, receive instant AI feedback on their responses, and practise again until the technique is genuinely mastered.",
  topicsTotal: 10,
  topicsAvailable: 10,
  topics: [
    { number: 1, name: "Comprehension - Past Paper Set 1", available: true },
    { number: 2, name: "Comprehension - Past Paper Set 2", available: true },
    { number: 3, name: "Comprehension - Past Paper Set 3", available: true },
    { number: 4, name: "Comprehension - Past Paper Set 4", available: true },
    { number: 5, name: "Comprehension - Past Paper Set 5", available: true },
    { number: 6, name: "Essay Types and Structure", available: true },
    { number: 7, name: "10-Day Band 3 to Band 1 Bridge", available: true },
    { number: 8, name: "Complete Mastery - Band 3 to Band 1", available: true },
    { number: 9, name: "Directed Writing Part 1 - Non-Letter Types", available: true },
    { number: 10, name: "Directed Writing Part 2 - Letters and Email", available: true },
  ],
  keyFeatures: [
    "10 dedicated courses - not a single generic English Language course. Each course targets a specific Cambridge assessment skill.",
    "Mark scheme logic embedded - students learn exactly how Cambridge awards marks, not just how to write well in general",
    "AI written response feedback - immediate evaluation of student essays and directed writing responses",
    "Cambridge past paper comprehension texts with structured questions and mark-scheme annotations",
    "Pre-O English pathway available for students who need English foundation preparation before O-Level",
  ],
  examBoard: "Cambridge IGCSE | Cambridge O-Level | Both",
  syllabusYear: "Aligned to Cambridge English Language syllabus 2023-2025",
  priceFrom: "From $110 for the Comprehension Bundle (5 courses) | From $65 for Directed Writing Part 1",
  pricingNote: "10 dedicated courses are available as a full programme or as specific paper-focused bundles. Full pricing at /pricing. Scholarship support available for qualifying countries - see /pricing for details.",
  diagnosticLink: "/diagnostics/start?subject=english-language",
  enrollUrl: "/pricing?subject=english-language",
  relatedCourses: [
    { name: "Pre-O English Pathway", url: "/pre-olevel#pre-o-english" },
    { name: "English Level Check Diagnostic", url: "/diagnostics" },
    { name: "Vocabulary Gr 5-7 and Reading Comprehension RC68", url: "/courses/must-have" },
  ],
  seo: {
    title: "Cambridge O-Level English Language Courses | EduMeUp",
    description:
      "The most comprehensive Cambridge O-Level English Language preparation - 10 dedicated courses covering Paper 1 and Paper 2. AI feedback. Free diagnostic. From $65.",
    ogTitle: "O-Level English Language - EduMeUp",
    ogDescription:
      "10 dedicated courses for Cambridge O-Level English Language. Comprehension, Essay, Directed Writing. AI written feedback. Free diagnostic.",
    keywords:
      "Cambridge O-Level English Language online, IGCSE English Language course, Cambridge English essay writing, directed writing O-Level, Cambridge English comprehension",
    canonicalUrl: "https://edume.up/olevel/english-language",
  },
  faq: [
    {
      question: "Should I start with Comprehension or Essay/Composition?",
      answer:
        "This depends on your current skill level and your Cambridge exam timeline. The English Level Check diagnostic will confirm where to start. In general: if your exam is in the same or next session, prioritise the paper type where your diagnostic shows the largest gap. If you have a full year or more, start with the Comprehension Bundle and run the Essay courses alongside it.",
    },
    {
      question: "Is the 10-Day Band 3 to Band 1 Bridge course really achievable in 10 sessions?",
      answer:
        "It is an intensive structured programme - each day is a focused session of approximately 90-120 minutes of active engagement. It assumes the student commits fully to each session. For motivated students who follow the programme as designed, a significant improvement in band is achievable.",
    },
    {
      question: "What is the difference between Directed Writing Part 1 and Part 2?",
      answer:
        "Part 1 covers all non-letter formats: articles, reports, speeches, interviews, reviews, and others. Part 2 covers all letter types and the formal email format, which are a separate skill set. Both parts end with a mock examination. Most O-Level English students need both parts.",
    },
  ],
};

export default englishLanguage;