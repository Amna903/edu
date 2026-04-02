import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import type { LmsCourse } from "@shared/schema";

const fallbackPrograms: LmsCourse[] = [
  {
    id: 1,
    shortName: "PRE-O-LEVEL",
    title: "Pre-O-Level Victory Program",
    slug: "pre-o-level-victory",
    shortDescription: "Build foundation and transition confidently into O-Level with structured guidance.",
    fullDescription:
      "A complete 9-month pathway for Grade 7-8 learners covering gap repair, Foundational O-Level Bridge Courses content, and early O-Level readiness.",
    category: "foundation",
    categoryName: "Foundation",
    format: "topics",
    imageUrl: null,
    startDate: null,
    endDate: null,
    price: 36000,
    visible: true,
    lmsCourseUrl: "#",
  },
  {
    id: 2,
    shortName: "COMPLETE-O-LEVEL",
    title: "Complete O-Level Subject Preparation",
    slug: "complete-o-level",
    shortDescription: "Full Cambridge-aligned O-Level preparation with retention-focused learning design.",
    fullDescription:
      "Comprehensive syllabus mastery with active recall, spaced review, and exam-focused question banks.",
    category: "o_level",
    categoryName: "O-Level",
    format: "topics",
    imageUrl: null,
    startDate: null,
    endDate: null,
    price: 6500,
    visible: true,
    lmsCourseUrl: "#",
  },
  {
    id: 3,
    shortName: "ATP",
    title: "ATP Courses (Physics | Chemistry | Biology)",
    slug: "atp-courses",
    shortDescription: "Master practical and ATP paper strategy through simulation-style guided practice.",
    fullDescription:
      "Targeted preparation for practical and ATP components with experiment interpretation, data handling, and examiner-style techniques.",
    category: "o_level",
    categoryName: "O-Level",
    format: "topics",
    imageUrl: null,
    startDate: null,
    endDate: null,
    price: 9900,
    visible: true,
    lmsCourseUrl: "#",
  },
  {
    id: 3.1,
    shortName: "ENGLISH-MASTERY",
    title: "English Language Mastery Courses",
    slug: "english-mastery",
    shortDescription: "Master Cambridge English Language (Papers 1 & 2) with comprehensive comprehension and composition training.",
    fullDescription:
      "Complete English Language preparation covering comprehension skills, composition techniques, grammar mastery, and vocabulary building aligned with Cambridge standards.",
    category: "o_level",
    categoryName: "O-Level",
    format: "topics",
    imageUrl: null,
    startDate: null,
    endDate: null,
    price: 25000,
    visible: true,
    lmsCourseUrl: "#",
  },
  {
    id: 4,
    shortName: "EXAM-PREP",
    title: "Real-Time Exam Preparation",
    slug: "exam-prep",
    shortDescription: "Timed mock testing and exam strategy refinement for final-phase readiness.",
    fullDescription:
      "Exam simulation environment with timed papers, instant diagnostics, and strategic mistake correction.",
    category: "o_level",
    categoryName: "O-Level",
    format: "topics",
    imageUrl: null,
    startDate: null,
    endDate: null,
    price: 12000,
    visible: true,
    lmsCourseUrl: "#",
  },
  {
    id: 5,
    shortName: "BRIDGE",
    title: "Foundational O-Level Bridge Courses",
    slug: "foundation-bridge-courses",
    shortDescription: "Repair conceptual gaps quickly before higher-level exam preparation.",
    fullDescription:
      "Short, targeted Foundational O-Level Bridge Courses designed to close foundational weaknesses in core subjects.",
    category: "foundation",
    categoryName: "Foundation",
    format: "topics",
    imageUrl: null,
    startDate: null,
    endDate: null,
    price: 5000,
    visible: true,
    lmsCourseUrl: "#",
  },
  {
    id: 6,
    shortName: "TUTOR-BOOKING",
    title: "Tutor Booking — 1-to-1 Personalised Education",
    slug: "tutor-booking",
    shortDescription: "Personalized tutor support tailored to student needs and target outcomes.",
    fullDescription:
      "One-to-one tutor guidance with structured lesson plans, progress reporting, and platform-backed practice resources.",
    category: "tutoring",
    categoryName: "Tutoring",
    format: "topics",
    imageUrl: null,
    startDate: null,
    endDate: null,
    price: null,
    visible: true,
    lmsCourseUrl: "#",
  },
];

export function usePrograms() {
  return useQuery({
    queryKey: [api.lmsCourses.list.path],
    queryFn: async () => {
      try {
        const res = await fetch(api.lmsCourses.list.path);
        if (!res.ok) throw new Error("Failed to fetch programs");
        return api.lmsCourses.list.responses[200].parse(await res.json());
      } catch {
        return fallbackPrograms;
      }
    },
  });
}

export function useProgram(slug: string) {
  return useQuery({
    queryKey: [api.lmsCourses.get.path, slug],
    queryFn: async () => {
      try {
        const url = buildUrl(api.lmsCourses.get.path, { slug });
        const res = await fetch(url);
        if (res.status === 404) return null;
        if (!res.ok) throw new Error("Failed to fetch program details");
        return api.lmsCourses.get.responses[200].parse(await res.json());
      } catch {
        return fallbackPrograms.find((program) => program.slug === slug) ?? null;
      }
    },
  });
}
