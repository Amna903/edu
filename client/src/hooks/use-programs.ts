import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import type { Program } from "@shared/schema";

const fallbackPrograms: Program[] = [
  {
    id: 1,
    title: "Pre-O-Level Victory Program",
    slug: "pre-o-level-victory",
    shortDescription: "Build foundation and transition confidently into O-Level with structured guidance.",
    fullDescription:
      "A complete 9-month pathway for Grade 7-8 learners covering gap repair, Foundational O-Level Bridge Courses content, and early O-Level readiness.",
    category: "foundation",
    price: 36000,
    prices: null,
    features: [
      "AI diagnostic and remedial mapping",
      "Foundational O-Level Bridge Courses and structured weekly roadmap",
      "Interactive H5P practice",
      "Parent progress visibility",
    ],
    isPopular: true,
    createdAt: new Date(),
  },
  {
    id: 2,
    title: "Complete O-Level Subject Preparation",
    slug: "complete-o-level",
    shortDescription: "Full Cambridge-aligned O-Level preparation with retention-focused learning design.",
    fullDescription:
      "Comprehensive syllabus mastery with active recall, spaced review, and exam-focused question banks.",
    category: "o_level",
    price: 6500,
    prices: null,
    features: [
      "Complete syllabus coverage",
      "Past paper integration",
      "Automated spaced repetition",
      "24/7 AI support",
    ],
    isPopular: true,
    createdAt: new Date(),
  },
  {
    id: 3,
    title: "ATP Courses (Physics / Chemistry / Biology)",
    slug: "atp-courses",
    shortDescription: "Master practical and ATP paper strategy through simulation-style guided practice.",
    fullDescription:
      "Targeted preparation for practical and ATP components with experiment interpretation, data handling, and examiner-style techniques.",
    category: "o_level",
    price: 9900,
    prices: null,
    features: [
      "Paper 4-focused preparation",
      "Scenario-based practical prompts",
      "Marking-scheme aligned feedback",
    ],
    isPopular: false,
    createdAt: new Date(),
  },
  {
    id: 4,
    title: "Real-Time Exam Preparation",
    slug: "exam-prep",
    shortDescription: "Timed mock testing and exam strategy refinement for final-phase readiness.",
    fullDescription:
      "Exam simulation environment with timed papers, instant diagnostics, and strategic mistake correction.",
    category: "o_level",
    price: 12000,
    prices: null,
    features: [
      "Timed mock paper interface",
      "Performance analytics by topic",
      "High-yield revision focus",
    ],
    isPopular: false,
    createdAt: new Date(),
  },
  {
    id: 5,
    title: "Foundational O-Level Bridge Courses",
    slug: "foundation-bridge-courses",
    shortDescription: "Repair conceptual gaps quickly before higher-level exam preparation.",
    fullDescription:
      "Short, targeted Foundational O-Level Bridge Courses designed to close foundational weaknesses in core subjects.",
    category: "foundation",
    price: 5000,
    prices: null,
    features: [
      "Pre-test and gap mapping",
      "Concept repair modules",
      "Readiness checkpoints",
    ],
    isPopular: false,
    createdAt: new Date(),
  },
  {
    id: 6,
    title: "Tutor Booking - 1-to-1 Personalised Education",
    slug: "tutor-booking",
    shortDescription: "Personalized tutor support tailored to student needs and target outcomes.",
    fullDescription:
      "One-to-one tutor guidance with structured lesson plans, progress reporting, and platform-backed practice resources.",
    category: "tutoring",
    price: null,
    prices: null,
    features: [
      "Personalized tutor matching",
      "Structured weekly learning plans",
      "Progress reporting with parent visibility",
    ],
    isPopular: false,
    createdAt: new Date(),
  },
];

export function usePrograms() {
  return useQuery({
    queryKey: [api.programs.list.path],
    queryFn: async () => {
      try {
        const res = await fetch(api.programs.list.path);
        if (!res.ok) throw new Error("Failed to fetch programs");
        return api.programs.list.responses[200].parse(await res.json());
      } catch {
        return fallbackPrograms;
      }
    },
  });
}

export function useProgram(slug: string) {
  return useQuery({
    queryKey: [api.programs.get.path, slug],
    queryFn: async () => {
      try {
        const url = buildUrl(api.programs.get.path, { slug });
        const res = await fetch(url);
        if (res.status === 404) return null;
        if (!res.ok) throw new Error("Failed to fetch program details");
        return api.programs.get.responses[200].parse(await res.json());
      } catch {
        return fallbackPrograms.find((program) => program.slug === slug) ?? null;
      }
    },
  });
}
