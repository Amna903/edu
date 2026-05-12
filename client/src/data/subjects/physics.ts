import type { SubjectData } from "./types";

const physics: SubjectData = {
  slug: "physics",
  subjectName: "Physics",
  subjectCode: "Cambridge O-Level Physics",
  heroHeadline: "Cambridge O-Level Physics - Understood, Not Memorised.",
  heroSubHeadline: "Conceptual clarity through interactive mastery. Cambridge-aligned. AI-supported.",
  heroCopy:
    "EduMeUp's Cambridge O-Level Physics course covers all sub-topics across the 6 major topic areas of the Cambridge IGCSE and O-Level Physics syllabus - from mechanics and thermal physics through to electricity, waves, and atomic physics. Physics is a subject where understanding the concept is everything - memorising formulas without understanding when and why to apply them is the most common cause of exam failure. Every EduMeUp Physics topic teaches the concept first, then tests application through Cambridge-style structured questions. The AI Study Advisor identifies the specific conceptual gap - not just the answer the student got wrong. The ATP Physics course complements this course for students in exam preparation mode.",
  topicsTotal: 27,
  topicsAvailable: 26,
  topics: [
    { number: 1, name: "Measurements and Units", available: true },
    { number: 2, name: "Scalars and Vectors", available: true },
    { number: 3, name: "Speed, Velocity, Acceleration", available: true },
    { number: 4, name: "Newton's Laws of Motion", available: true },
    { number: 5, name: "Forces and Moments", available: true },
    { number: 6, name: "Density and Pressure", available: true },
    { number: 7, name: "Centre of Gravity", available: true },
    { number: 8, name: "Kinetic Particle Model", available: true },
    { number: 9, name: "Thermal Expansion", available: true },
    { number: 10, name: "Temperature and Thermometry", available: true },
    { number: 11, name: "Heat Transfer", available: true },
    { number: 12, name: "Wave Properties", available: true },
    { number: 13, name: "Light - Reflection and Refraction", available: true },
    { number: 14, name: "Lenses and Optical Devices", available: true },
    { number: 15, name: "Dispersion of Light", available: true },
    { number: 16, name: "Sound Waves and Hearing", available: true },
    { number: 17, name: "Electromagnetic Spectrum", available: true },
    { number: 18, name: "Electrostatics", available: true },
    { number: 19, name: "Current, Voltage, Resistance", available: true },
    { number: 20, name: "Circuits - Series and Parallel", available: true },
    { number: 21, name: "Electromagnetism", available: true },
    { number: 22, name: "Electromagnetic Induction", available: true },
    { number: 23, name: "Cathode Rays", available: true },
    { number: 24, name: "Atomic Structure", available: true },
    { number: 25, name: "Radioactivity", available: true },
    { number: 26, name: "Nuclear Fission and Fusion", available: true },
    { number: 27, name: "Space Physics", available: false },
  ],
  keyFeatures: [
    "Conceptual teaching approach - understanding the physics principle, not just applying formulas",
    "Interactive content including drag-and-drop diagrams, circuit builders, and motion simulations",
    "Cambridge past paper questions linked to each sub-topic from Day 1",
    "ATP Physics course available separately for students preparing for Cambridge examinations",
    "80% mastery gate ensures no student proceeds with a conceptual gap that will undermine future topics",
  ],
  examBoard: "Cambridge IGCSE | Cambridge O-Level | Both",
  syllabusYear: "Aligned to Cambridge Physics syllabus 2023-2025",
  priceFrom: "From $120 / year for the complete subject",
  pricingNote: "Chapter courses available from $6/chapter. Full pricing at /pricing. Scholarship support available for qualifying countries - see /pricing for details.",
  diagnosticLink: "/diagnostics/start?subject=physics",
  enrollUrl: "/pricing?subject=physics",
  relatedCourses: [
    { name: "Pre-O Physics (15 foundation topics)", url: "/pre-olevel#pre-o-physics" },
    { name: "ATP Physics", url: "/atp" },
    { name: "Bridge Sciences & Economics", url: "/courses/bridge-sciences" },
  ],
  seo: {
    title: "Cambridge O-Level Physics Course Online | EduMeUp",
    description:
      "Cambridge O-Level Physics - conceptual mastery through interactive learning. 27 sub-topics across 6 areas. Free diagnostic. ATP Physics course available. From $120/year.",
    ogTitle: "O-Level Physics - EduMeUp Cambridge Learning",
    ogDescription:
      "Interactive Cambridge O-Level Physics. 27 sub-topics. Free diagnostic. AI Study Advisor. ATP Physics course available. From $120/year.",
    keywords:
      "Cambridge O-Level Physics online, IGCSE Physics course, Cambridge Physics mastery learning, O-Level Physics topics, Cambridge IGCSE Physics",
    canonicalUrl: "https://edume.up/olevel/physics",
  },
  faq: [
    {
      question: "Do I need Pre-O Physics before starting this course?",
      answer:
        "Not necessarily. If you have studied Physics at school (Grade 8-9 level) in any curriculum, you likely have the foundation needed. Take the free Physics diagnostic - it will confirm your readiness and identify any gaps before you enrol.",
    },
    {
      question: "What is the ATP Physics course and how does it differ from this O-Level Physics course?",
      answer:
        "The O-Level Physics course teaches all 27 sub-topics systematically from the beginning. The ATP Physics course is for students who have already studied O-Level Physics and are preparing for their Cambridge examinations - it uses past papers and is focused entirely on exam performance. Most serious O-Level Physics students use both.",
    },
    {
      question: "Does EduMeUp Physics cover both IGCSE and O-Level syllabi?",
      answer:
        "Yes. Cambridge IGCSE and Cambridge O-Level Physics are very closely aligned. EduMeUp's Physics course is built to cover both - the content is tagged to both syllabi so students can filter for their specific exam board if needed.",
    },
  ],
};

export default physics;