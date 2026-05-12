import type { SubjectData } from "./types";

const mathematics: SubjectData = {
  slug: "mathematics",
  subjectName: "Mathematics",
  subjectCode: "Cambridge O-Level Mathematics",
  heroHeadline: "Master Cambridge O-Level Mathematics - Topic by Topic.",
  heroSubHeadline: "Interactive learning. Proven mastery method. Aligned to the latest Cambridge syllabus.",
  heroCopy:
    "EduMeUp's Cambridge O-Level Mathematics course covers all 25 topics of the Cambridge IGCSE and O-Level syllabus - from number theory and algebra through to trigonometry, statistics, and vectors. Every topic is taught through interactive content, not passive video. Students engage, practise, and demonstrate mastery before advancing. The course is built around the 80% mastery gate - no student moves to the next topic until they have genuinely understood the current one. AI Study Advisor support is available throughout. Spaced retrieval scheduling ensures long-term retention, not just short-term recall for the exam.",
  topicsTotal: 25,
  topicsAvailable: 14,
  topics: [
    { number: 1, name: "Number - Types and Properties", available: true },
    { number: 2, name: "Fractions, Decimals and Percentages", available: true },
    { number: 3, name: "Ratio and Proportion", available: true },
    { number: 4, name: "Directed Numbers and Ordering", available: true },
    { number: 5, name: "Indices and Standard Form", available: true },
    { number: 6, name: "Algebra - Expressions and Formulae", available: true },
    { number: 7, name: "Linear Equations and Inequalities", available: true },
    { number: 8, name: "Simultaneous Linear Equations", available: true },
    { number: 9, name: "Quadratic Equations and Expressions", available: true },
    { number: 10, name: "Functions and Graphs", available: true },
    { number: 11, name: "Coordinate Geometry", available: true },
    { number: 12, name: "Geometry - Angles and Lines", available: true },
    { number: 13, name: "Geometry - Circles", available: true },
    { number: 14, name: "Mensuration - Area, Perimeter, Volume", available: true },
    { number: 15, name: "Trigonometry - Right-Angled Triangles", available: false },
    { number: 16, name: "Trigonometry - Sine and Cosine Rules", available: false },
    { number: 17, name: "Vectors in Two Dimensions", available: false },
    { number: 18, name: "Matrices and Transformations", available: false },
    { number: 19, name: "Probability - Single and Combined Events", available: false },
    { number: 20, name: "Statistics - Data Collection and Display", available: false },
    { number: 21, name: "Statistics - Averages and Spread", available: false },
    { number: 22, name: "Sets - Notation and Venn Diagrams", available: false },
    { number: 23, name: "Commercial Mathematics", available: false },
    { number: 24, name: "Algebraic Fractions and Manipulation", available: false },
    { number: 25, name: "Graphs - Speed, Distance, Acceleration", available: false },
  ],
  keyFeatures: [
    "H5P interactive content across all 25 topics - no passive video at any stage",
    "80% mastery gate on every topic - progress is locked until understanding is confirmed",
    "Cambridge past paper questions tagged to each topic - practise exam-style questions from Day 1",
    "AI Study Advisor identifies the specific concept causing difficulty and points to the targeted resource",
    "Spaced retrieval scheduling - built-in review cycles ensure Maths skills are retained across months, not forgotten the week after studying",
  ],
  examBoard: "Cambridge IGCSE | Cambridge O-Level | Both",
  syllabusYear: "Aligned to Cambridge Mathematics syllabus 2023-2025",
  priceFrom: "From $120 / year for the complete subject",
  pricingNote: "Chapter courses available from $6/chapter. Full pricing at /pricing. Scholarship support available for qualifying countries - see /pricing for details.",
  diagnosticLink: "/diagnostics/start?subject=mathematics",
  enrollUrl: "/pricing?subject=mathematics",
  relatedCourses: [
    { name: "Pre-O Mathematics (13 foundation topics)", url: "/pre-olevel#pre-o-mathematics" },
    { name: "ATP Mathematics", url: "/courses/atp" },
    { name: "Cambridge O-Level Readiness Forecast", url: "/olevel-readiness-forecast" },
  ],
  seo: {
    title: "Cambridge O-Level Mathematics Course Online | EduMeUp",
    description:
      "Master Cambridge O-Level Mathematics with EduMeUp's interactive mastery learning platform. 25 topics. Interactive content. Free diagnostic. From $120/year.",
    ogTitle: "O-Level Mathematics - EduMeUp Cambridge Learning",
    ogDescription:
      "Interactive Cambridge O-Level Mathematics. 25 topics. Free diagnostic. 80% mastery gate. AI Study Advisor. From $120/year.",
    keywords:
      "Cambridge O-Level Mathematics online, IGCSE Maths course, Cambridge Maths mastery learning, O-Level Maths topics, Cambridge IGCSE Mathematics",
    canonicalUrl: "https://edume.up/olevel/mathematics",
  },
  faq: [
    {
      question: "Do I need to complete all 25 topics to sit the Cambridge O-Level?",
      answer:
        "Not necessarily - the Cambridge syllabus specifies which topics are examined. However, EduMeUp covers all 25 topics so students have no gaps when exam questions draw from across the syllabus. Your diagnostic will show which topics are most urgent for your specific gaps.",
    },
    {
      question: "Can I buy only the topics I need, rather than the full course?",
      answer:
        "Yes. EduMeUp's chapter course pricing lets you purchase specific topics from $6 per topic. If your diagnostic identifies 5 specific gaps, you can buy just those 5. See /pricing for chapter pricing details.",
    },
    {
      question: "How long does each topic take to complete on EduMeUp?",
      answer:
        "Each topic typically takes 3-6 hours of active platform engagement to complete to mastery (80% gate). This varies by topic complexity and the student's prior knowledge. Your dashboard shows estimated time to completion for each topic.",
    },
  ],
};

export default mathematics;