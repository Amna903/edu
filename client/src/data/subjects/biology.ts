import type { SubjectData } from "./types";

const biology: SubjectData = {
  slug: "biology",
  subjectName: "Biology",
  subjectCode: "Cambridge O-Level Biology",
  heroHeadline: "Cambridge O-Level Biology - Every System. Every Process. Every Mark.",
  heroSubHeadline: "21 topics. Interactive mastery. Aligned to Cambridge IGCSE and O-Level.",
  heroCopy:
    "EduMeUp's Cambridge O-Level Biology course covers all 21 topics of the Cambridge IGCSE and O-Level Biology syllabus - from cellular biology and biological molecules through to genetics, evolution, ecology, and biotechnology. Biology rewards students who understand processes and can explain them precisely - not just recall facts. EduMeUp builds explanation skills directly: every topic requires students to construct answers in Cambridge exam format, not just select from multiple choice. The ATP Biology course is available separately for students approaching their Cambridge examinations and wanting focused past-paper practice.",
  topicsTotal: 21,
  topicsAvailable: 19,
  topics: [
    { number: 1, name: "Cell Structure and Organisation", available: true },
    { number: 2, name: "Biological Molecules", available: true },
    { number: 3, name: "Enzymes", available: true },
    { number: 4, name: "Movement In and Out of Cells", available: true },
    { number: 5, name: "Nutrition in Plants (Photosynthesis)", available: true },
    { number: 6, name: "Nutrition in Humans (Digestion)", available: true },
    { number: 7, name: "Transport in Plants", available: true },
    { number: 8, name: "Transport in Humans (Circulatory System)", available: true },
    { number: 9, name: "Disease and Immunity", available: true },
    { number: 10, name: "Gas Exchange in Humans", available: true },
    { number: 11, name: "Respiration", available: true },
    { number: 12, name: "Excretion in Humans", available: true },
    { number: 13, name: "Coordination and Response", available: true },
    { number: 14, name: "Drugs and Their Effects", available: true },
    { number: 15, name: "Reproduction in Plants", available: true },
    { number: 16, name: "Reproduction in Humans", available: true },
    { number: 17, name: "Chromosomes, Genes and DNA", available: true },
    { number: 18, name: "Cell Division and Inheritance", available: true },
    { number: 19, name: "Variation and Natural Selection", available: true },
    { number: 20, name: "Biotechnology and Genetic Engineering", available: false },
    { number: 21, name: "Ecology and the Environment", available: false },
  ],
  keyFeatures: [
    "Interactive diagrams for labelling, annotation, and process sequencing exercises",
    "Exam answer construction practised in Cambridge format, not just recall questions",
    "ATP Biology course available separately for exam preparation mode",
    "Extended response practise with instant AI feedback on written responses",
    "Process-focused learning so every biological mechanism is taught as a sequence, not a list of facts",
  ],
  examBoard: "Cambridge IGCSE | Cambridge O-Level | Both",
  syllabusYear: "Aligned to Cambridge Biology syllabus 2023-2025",
  priceFrom: "From $120 / year for the complete subject",
  pricingNote: "Chapter courses available from $6/chapter. Full pricing at /pricing. Scholarship support available for qualifying countries - see /pricing for details.",
  diagnosticLink: "/diagnostics/start?subject=biology",
  enrollUrl: "/pricing?subject=biology",
  relatedCourses: [
    { name: "ATP Biology", url: "/atp" },
    { name: "ATP All Sciences Bundle", url: "/atp#bundle" },
    { name: "Cambridge O-Level Readiness Forecast", url: "/olevel-readiness-forecast" },
  ],
  seo: {
    title: "Cambridge O-Level Biology Course Online | EduMeUp",
    description:
      "Cambridge O-Level Biology - all 21 topics, process-focused mastery learning. Free diagnostic. AI written feedback. ATP Biology available. From $120/year.",
    ogTitle: "O-Level Biology - EduMeUp Cambridge Learning",
    ogDescription:
      "Interactive Cambridge O-Level Biology. 21 topics. Free diagnostic. AI written response feedback. ATP Biology available. From $120/year.",
    keywords:
      "Cambridge O-Level Biology online, IGCSE Biology course, Cambridge Biology mastery, O-Level Biology topics, Cambridge IGCSE Biology",
    canonicalUrl: "https://edume.up/olevel/biology",
  },
  faq: [
    {
      question: "Is Biology a good choice if I want to study medicine?",
      answer:
        "Cambridge O-Level Biology is an essential foundation for any student considering medicine, pharmacy, dentistry, or allied health sciences. EduMeUp's Biology course is particularly strong on the human biology topics that are most relevant to medical study - and teaches them with the depth and precision that pre-medical students need.",
    },
    {
      question: "I need to write extended answers in Biology exams. Does EduMeUp help with this?",
      answer:
        "Yes - and this is one of EduMeUp Biology's strongest features. Extended response practise is built into every process-based topic. Students write answers in Cambridge exam format and receive immediate AI feedback - identifying whether the answer covers all required marking points, uses the correct biological terminology, and demonstrates understanding of the sequence or mechanism.",
    },
    {
      question: "Can I take the Biology diagnostic before enrolling?",
      answer:
        "Yes - and it is strongly recommended. The free O-Level Subject Diagnostic for Biology takes 40-60 minutes and tells you exactly which of the 21 topics you have gaps in before you spend anything. Many students discover their gaps are in 3-4 specific topics rather than across the whole syllabus - and they can buy those topics as chapter courses at $6 each.",
    },
  ],
};

export default biology;