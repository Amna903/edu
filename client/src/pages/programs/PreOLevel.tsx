import { useEffect } from "react";
import { Link } from "wouter";
import {
  CheckCircle2,
  BookOpen,
  Zap,
  Target,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";

export function PreOLevel() {
  useEffect(() => {
    document.title =
      "Pre-O-Level Programmes | Cambridge Foundation Courses | EduMeUp";
    document.
      querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "EduMeUp Pre-O-Level Programmes build Cambridge O-Level foundation skills in Mathematics, Physics, Chemistry, and English. Self-paced, interactive, mastery-based. Available now."
      );
  }, []);

  return (
    <Layout>
      {/* SECTION 1: HERO BANNER */}
      <section className="relative bg-brand-navy overflow-hidden py-16 md:py-24">
        {/* Diagonal teal stripe pattern (CSS only) */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, theme.colors.brand.primary, theme.colors.brand.primary 10px, transparent 10px, transparent 20px)",
          }}
        />

        <div className="relative container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            {/* Left Content: 60% */}
            <div className="lg:col-span-3">
              {/* Eyebrow */}
              <div className="mb-6">
                <span className="text-brand-primary text-xs uppercase tracking-widest font-semibold">
                  CAMBRIDGE O-LEVEL PREPARATION
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl font-semibold text-white mb-6 leading-tight">
                Build the Foundation That O-Level Demands.
              </h1>

              {/* Sub-headline */}
              <p className="text-lg text-gray-200 mb-8 leading-relaxed">
                EduMeUp Pre-O-Level Programmes prepare students for Cambridge
                O-Level entry — systematically, interactively, and at their own
                pace. Four subjects. Two delivery phases. One clear pathway to
                Cambridge readiness.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/diagnostics">
                  <a className="inline-flex items-center justify-center px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary-dark transition-colors">
                    Start Free Diagnostic
                  </a>
                </Link>
                <a
                  href="#programmes"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
                >
                  Browse Programmes
                  <ChevronRight className="ml-2 h-4 w-4" />
                </a>
              </div>

              {/* Trust Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/20">
                <div className="text-white/90 text-sm font-semibold">
                  All Courses Available Now
                </div>
                <div className="text-white/90 text-sm font-semibold">
                  Self-Paced Platform Learning
                </div>
                <div className="text-white/90 text-sm font-semibold">
                  Optional Certified Tutor
                </div>
                <div className="text-white/90 text-sm font-semibold">
                  Phase 2 Live Classes Coming
                </div>
              </div>
            </div>

            {/* Right Visual: 40% */}
            <div className="lg:col-span-2 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="w-full h-64 md:h-80 bg-gradient-to-br from-brand-primary/20 to-brand-primary/20 rounded-2xl flex items-center justify-center border border-white/10"
              >
                <svg
                  className="w-3/4 h-3/4"
                  viewBox="0 0 200 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Abstract ascending steps */}
                  <path
                    d="M 30 150 L 50 130 L 70 110 L 90 80 L 110 60 L 130 40 L 150 20"
                    stroke="#2366c9"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="30" cy="150" r="6" fill="#2366c9" />
                  <circle cx="50" cy="130" r="6" fill="#2366c9" />
                  <circle cx="70" cy="110" r="6" fill="#2366c9" />
                  <circle cx="90" cy="80" r="6" fill="#2366c9" />
                  <circle cx="110" cy="60" r="6" fill="#2366c9" />
                  <circle cx="130" cy="40" r="6" fill="#2366c9" />
                  <circle cx="150" cy="20" r="8" fill="#2366c9" />
                  {/* Gate shape */}
                  <rect
                    x="140"
                    y="5"
                    width="40"
                    height="50"
                    fill="none"
                    stroke="#2366c9"
                    strokeWidth="2"
                  />
                </svg>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHAT IS PRE-O-LEVEL vs LOWER SECONDARY */}
      <section className="py-16 md:py-24 bg-[#F5F5F5]">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-semibold text-brand-navy mb-12 text-center">
            What Makes Pre-O-Level Different?
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Lower Secondary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm"
            >
              <h3 className="text-2xl font-semibold text-brand-navy mb-6">
                Lower Secondary (Grade 6–8)
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    What it covers
                  </h4>
                  <p className="text-gray-700 text-sm">
                    International curriculum — broad academic content at Grade
                    6–8 level. Not tied to any single country or exam board.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Who it is for
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Students in Grades 6–8 who need strong general academic
                    preparation.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Cambridge alignment
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Not specifically aligned to Cambridge O-Level — broader
                    international standard.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Can students do both?
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Yes — students may study Lower Secondary and Pre-O-Level
                    simultaneously or sequentially.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Leads to
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Pre-O-Level programmes or direct O-Level enrolment depending
                    on student readiness.
                  </p>
                </div>
              </div>

              <Link href="/lower-secondary">
                <a className="mt-6 inline-flex items-center text-brand-primary font-semibold hover:underline">
                  Explore Lower Secondary Grade 6–8
                  <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </Link>
            </motion.div>

            {/* Pre-O-Level */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-8 border-2 border-brand-primary shadow-sm"
            >
              <h3 className="text-2xl font-semibold text-brand-navy mb-6">
                Pre-O-Level Programmes
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    What it covers
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Foundation content specifically mapped to Cambridge O-Level
                    entry requirements — in Maths, Physics, Chemistry, and
                    English.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Who it is for
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Students in Grades 8–9 (or any age) who are preparing to
                    begin Cambridge O-Level study.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Cambridge alignment
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Directly aligned to the foundation knowledge required for
                    Cambridge IGCSE and O-Level success.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Recommended for
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Students moving from Lower Secondary into Cambridge O-Level
                    preparation.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Leads to
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Cambridge O-Level subject courses — or the Cambridge O-Level
                    Readiness Forecast to confirm readiness.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHO IS THIS FOR */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-semibold text-brand-navy mb-12 text-center">
            Is Pre-O-Level Right for Your Student?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Profile 1: Transition Student */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white border-t-4 border-brand-primary rounded-xl p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-brand-navy mb-4">
                The Transition Student
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                A Grade 8–9 student who has completed their general schooling
                and is now preparing to begin Cambridge O-Level. They need to
                confirm their subject foundations before starting O-Level
                courses. Ideal starting point: Pre-O-Level Diagnostic, then the
                relevant programme.
              </p>
            </motion.div>

            {/* Profile 2: Gap Student */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white border-t-4 border-brand-primary rounded-xl p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-brand-navy mb-4">
                The Gap Student
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                A student already enrolled in O-Level who is struggling with
                specific subjects. A diagnostic has revealed foundation gaps in
                Maths, Physics, Chemistry, or English that are affecting their
                O-Level performance. Ideal starting point: Subject-specific
                Pre-O-Level programme for the gap subject.
              </p>
            </motion.div>

            {/* Profile 3: Early Starter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white border-t-4 border-brand-navy rounded-xl p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-brand-navy mb-4">
                The Early Starter
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                A younger student in Grade 6–7 whose parents want to accelerate
                their preparation for Cambridge by building subject foundations
                early. Ideal starting point: Pre-O English pathway first, then
                Pre-O Maths or Sciences as the student progresses.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4: PHASE 1 - SELF-PACED LEARNING */}
      <section className="py-16 md:py-24 bg-brand-navy text-white">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left: Features */}
            <div className="flex-1">
              <span className="text-brand-primary text-xs uppercase tracking-widest font-semibold">
                PHASE 1 — AVAILABLE NOW
              </span>

              <h2 className="text-4xl md:text-5xl font-semibold text-white mt-4 mb-8 leading-tight">
                Learn at Your Own Pace. Master Every Foundation Topic.
              </h2>

              <p className="text-gray-200 mb-8">
                Phase 1 is self-paced platform learning — available now for all
                four Pre-O-Level programmes. Study independently, or add a
                certified EduMeUp tutor for personalised support.
              </p>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-100">
                    <strong>H5P interactive content</strong> on every topic —
                    not passive video. Students engage, answer, and demonstrate
                    understanding before moving forward.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-100">
                    <strong>80% mastery gate</strong> on every topic — the
                    platform confirms understanding at each stage before the
                    student advances.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-100">
                    <strong>AI Study Advisor</strong> provides instant guidance
                    when a student is stuck — pointing to the exact concept or
                    example that addresses the gap.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-100">
                    <strong>Spaced retrieval scheduling</strong> ensures
                    foundation knowledge is retained over weeks, not forgotten
                    the day after it is studied.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-100">
                    <strong>Progress dashboard</strong> for students and parents
                    — tracking mastery completion, time on platform, and
                    readiness for O-Level entry.
                  </span>
                </li>
              </ul>

              <Link href="#programmes">
                <a className="mt-8 inline-flex items-center px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary-dark transition-colors">
                  Explore Programmes
                  <ChevronRight className="ml-2 h-4 w-4" />
                </a>
              </Link>
            </div>

            {/* Right: Visual */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="bg-white/10 rounded-2xl p-8 border border-white/20"
              >
                <BookOpen className="h-16 w-16 text-brand-primary mb-4" />
                <h4 className="text-2xl font-semibold mb-4">
                  Interactive Platform Features
                </h4>
                <p className="text-gray-200 text-sm">
                  Our proprietary learning system combines H5P interactive
                  content, AI-powered study guidance, and mastery-based
                  progression to ensure deep understanding and long-term
                  retention.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5-8: SUBJECT PROGRAMMES */}
      <section id="programmes" className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          {/* SECTION 5: MATHEMATICS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 bg-white border-l-4 border-brand-navy rounded-xl p-8 shadow-sm"
          >
            <span className="text-brand-primary text-xs uppercase tracking-widest font-semibold">
              PRE-O-LEVEL
            </span>
            <h3 className="text-2xl md:text-3xl font-semibold text-brand-navy mt-2 mb-4">
              Pre-O Mathematics Programme
            </h3>
            <p className="text-gray-700 mb-6">
              Pre-O Mathematics builds the 13 essential topic areas that
              Cambridge O-Level Mathematics requires as entry foundations.
              Students who complete this programme have the conceptual
              understanding needed to tackle O-Level Maths content without the
              gaps that cause failure at Grades 9–10.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-[#F5F5F5] p-4 rounded-lg">
                <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold mb-1">
                  1-Year Price
                </p>
                <p className="text-2xl font-bold text-brand-navy">$78</p>
              </div>
              <div className="bg-[#F5F5F5] p-4 rounded-lg">
                <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold mb-1">
                  2-Year Total
                </p>
                <p className="text-2xl font-bold text-brand-navy">$117</p>
                <p className="text-xs text-gray-600 mt-1">
                  ($78 Year 1 + $39 Year 2)
                </p>
              </div>
              <div className="bg-[#F5F5F5] p-4 rounded-lg">
                <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold mb-1">
                  Year 2 Discount
                </p>
                <p className="text-lg font-bold text-brand-navy">50% off</p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                13 Topics Covered
              </h4>
              <p className="text-xs text-green-600 font-semibold uppercase tracking-wide mb-4">
                All topics marked Available
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Numbers and the Number System",
                  "Fractions, Decimals, Percentages",
                  "Everyday Mathematics",
                  "Solving algebraic equations",
                  "Basic algebra",
                  "Coordinate geometry",
                  "Algebraic Fractions",
                  "Mensuration",
                  "Basic Statistics",
                  "Indices and Standard Form",
                  "Inequalities",
                  "Angles properties for Polygons",
                  "Basic Trigonometry",
                ].map((topic, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link href="/moodle/pre-o-mathematics">
              <a className="inline-flex items-center px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary-dark transition-colors">
                Enrol in Pre-O Mathematics
                <ChevronRight className="ml-2 h-4 w-4" />
              </a>
            </Link>
          </motion.div>

          {/* SECTION 6: PHYSICS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 bg-white border-l-4 border-brand-primary rounded-xl p-8 shadow-sm"
          >
            <span className="text-brand-primary text-xs uppercase tracking-widest font-semibold">
              PRE-O-LEVEL
            </span>
              <h3 className="text-2xl md:text-3xl font-semibold text-brand-navy mt-2 mb-4">
              Pre-O Physics Programme
            </h3>
            <p className="text-gray-700 mb-6">
              Pre-O Physics covers the 15 foundation topics that Cambridge
              O-Level Physics requires. Students who struggle with O-Level
              Physics often have gaps in the conceptual building blocks — force,
              energy, motion, and electrical principles — that this programme
              addresses systematically before O-Level study begins.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-[#F5F5F5] p-4 rounded-lg">
                <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold mb-1">
                  1-Year Price
                </p>
                <p className="text-2xl font-bold text-brand-navy">$47</p>
              </div>
              <div className="bg-[#F5F5F5] p-4 rounded-lg">
                <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold mb-1">
                  2-Year Total
                </p>
                <p className="text-2xl font-bold text-brand-navy">$70.50</p>
                <p className="text-xs text-gray-600 mt-1">
                  ($47 Year 1 + $23.50 Year 2)
                </p>
              </div>
              <div className="bg-[#F5F5F5] p-4 rounded-lg">
                <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold mb-1">
                  Year 2 Discount
                </p>
                <p className="text-lg font-bold text-brand-navy">50% off</p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                15 Topics Covered
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Physics and Units of Measurement",
                  "Scalar and Vector Quantities",
                  "Motion and Speed",
                  "Newton's Laws of Motion",
                  "Forces and Their Effects",
                  "Turning Effects and Moments",
                  "Centre of Gravity",
                  "Density and Buoyancy",
                  "Pressure",
                  "Energy, Work and Power",
                  "Properties of Waves",
                  "Sound Foundations",
                  "Reflection and refraction of Light",
                  "Lenses and images formed by converging lenses",
                  "Current Electricity Foundations",
                ].map((topic, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link href="/moodle/pre-o-physics">
              <a className="inline-flex items-center px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary-dark transition-colors">
                Enrol in Pre-O Physics
                <ChevronRight className="ml-2 h-4 w-4" />
              </a>
            </Link>
          </motion.div>

          {/* SECTION 7: CHEMISTRY */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 bg-white border-l-4 border-brand-primary rounded-xl p-8 shadow-sm"
          >
            <span className="text-brand-primary text-xs uppercase tracking-widest font-semibold">
              PRE-O-LEVEL
            </span>
              <h3 className="text-2xl md:text-3xl font-semibold text-brand-navy mt-2 mb-4">
              Pre-O Chemistry Programme
            </h3>
            <p className="text-gray-700 mb-6">
              Pre-O Chemistry covers 11 foundational chapters, from the nature
              of atoms and chemical bonds to the introductory principles of
              organic chemistry — covering 30–40% of the Cambridge O-Level
              Chemistry syllabus. Students who complete this programme begin
              O-Level Chemistry with a conceptual foundation that most of their
              peers lack.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-[#F5F5F5] p-4 rounded-lg">
                <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold mb-1">
                  1-Year Price
                </p>
                <p className="text-2xl font-bold text-brand-navy">$68</p>
              </div>
              <div className="bg-[#F5F5F5] p-4 rounded-lg">
                <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold mb-1">
                  2-Year Total
                </p>
                <p className="text-2xl font-bold text-brand-navy">$102</p>
                <p className="text-xs text-gray-600 mt-1">
                  ($68 Year 1 + $34 Year 2)
                </p>
              </div>
              <div className="bg-[#F5F5F5] p-4 rounded-lg">
                <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold mb-1">
                  Year 2 Discount
                </p>
                <p className="text-lg font-bold text-brand-navy">50% off</p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                11 Chapters Covered
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Atomic Structure",
                  "Symbols of Elements",
                  "States of Matter and Kinetic Theory",
                  "Elements, Compounds and Mixtures",
                  "Periodic Table",
                  "Chemical Formulae and Equations",
                  "Mole Concept and Calculations",
                  "Chemical Bonding",
                  "Acids, Bases and Salts",
                  "Chemical Reactions and Energy Changes",
                  "Introduction to Organic Chemistry",
                ].map((chapter, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{chapter}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link href="/moodle/pre-o-chemistry">
              <a className="inline-flex items-center px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary-dark transition-colors">
                Enrol in Pre-O Chemistry
                <ChevronRight className="ml-2 h-4 w-4" />
              </a>
            </Link>
          </motion.div>

          {/* SECTION 8: ENGLISH PATHWAY */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 bg-white border-l-4 border-brand-primary rounded-xl p-8 shadow-sm"
          >
            <span className="text-brand-primary text-xs uppercase tracking-widest font-semibold">
              PRE-O-LEVEL ENGLISH  NEW
            </span>
            <h3 className="text-2xl md:text-3xl font-semibold text-brand-navy mt-2 mb-4">
              Pre-O English Pathway (ESL & Bridge)
            </h3>
            <p className="text-gray-700 mb-6">
              Pre-O English is a three-stage progression designed for students
              who need to build their English language foundation before O-Level
              English study. Each course uses internationally sourced examples —
              no regional content. Dual-track (Foundation and Challenge)
              throughout. All examples are CEFR-aligned.
            </p>

            {/* 3-Stage Pathway */}
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* ESL1 */}
                <div className="bg-gradient-to-b from-brand-primary/10 to-white border border-brand-primary/30 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-brand-navy mb-2">
                    ESL1 — English Language Foundation
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    <strong>CEFR A2</strong> | <strong>$30</strong> (1-year
                    access)
                  </p>
                  <p className="text-sm text-gray-700">
                    Vocabulary building, sentence construction, reading
                    comprehension at A2 level. Dual-track (Foundation and
                    Challenge). Internationally sourced examples throughout.
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex items-center justify-center">
                  <ChevronRight className="h-6 w-6 text-brand-primary" />
                </div>

                {/* ESL2 */}
                <div className="bg-gradient-to-b from-brand-primary/10 to-white border border-brand-primary/30 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-brand-navy mb-2">
                    ESL2 — English Language Development
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    <strong>CEFR B1</strong> | <strong>$30</strong> (1-year
                    access)
                  </p>
                  <p className="text-sm text-gray-700">
                    Paragraph writing, extended reading, language in context at
                    B1 level. Builds on ESL1. Prepares students for the Bridge
                    course.
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex items-center justify-center">
                  <ChevronRight className="h-6 w-6 text-brand-primary" />
                </div>

                {/* Bridge */}
                <div className="bg-gradient-to-b from-brand-primary/10 to-white border border-brand-primary/30 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-brand-navy mb-2">
                    O-Level English Bridge
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    <strong>CEFR B1+ to B2</strong> | <strong>$45</strong>
                    (1-year access)
                  </p>
                  <p className="text-sm text-gray-700">
                    Bridges from B1 to the B2 level required for Cambridge
                    O-Level English success. Covers comprehension, directed
                    writing foundations, and composition structure. Cambridge
                    O-Level English entry preparation.
                  </p>
                </div>
              </div>
            </div>

            {/* Bundle Card */}
              <div className="bg-brand-primary/5 border-2 border-brand-primary rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-brand-navy mb-2">
                Pre-O English Bundle — All Three Courses
              </h4>
              <p className="text-2xl font-bold text-brand-primary mb-2">
                $75 <span className="text-sm text-gray-600">per year</span>
              </p>
              <p className="text-sm text-gray-700 mb-4">
                Save $30 vs buying separately — ESL1 $30 + ESL2 $30 + Bridge
                $45 = $105. 1-year access to all three courses. Recommended for
                students starting from A2 level who need the complete pathway to
                O-Level English readiness.
              </p>
              <p className="text-xs text-gray-600 italic">
                The English Level Check diagnostic helps determine which stage to
                start from. Grade 6–7 students take the Vocabulary + RC68
                variant. Grade 8+ students take the ESL/Bridge variant. Always
                recommended before enrolment.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/diagnostics">
                <a className="inline-flex items-center justify-center px-6 py-3 bg-white border-2 border-brand-primary text-brand-primary font-semibold rounded-lg hover:bg-brand-primary/5 transition-colors">
                  Take English Level Check
                </a>
              </Link>
              <Link href="/moodle/esl1">
                <a className="inline-flex items-center justify-center px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary-dark transition-colors">
                  Enrol in ESL1
                </a>
              </Link>
              <Link href="/checkout/english-bundle">
                <a className="inline-flex items-center justify-center px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary-dark transition-colors">
                  Get Pre-O English Bundle
                </a>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 9: BUNDLE OPTIONS */}
      <section className="py-16 md:py-24 bg-[#F5F5F5]">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-semibold text-brand-navy mb-12 text-center">
            Studying More Than One Subject? Save With a Bundle.
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Science Bundle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-8 border-t-4 border-brand-primary shadow-sm"
            >
              <h3 className="text-2xl font-semibold text-brand-navy mb-4">
                Pre-O Science Bundle
              </h3>
              <p className="text-3xl font-bold text-brand-primary mb-2">
                $95 <span className="text-sm text-gray-600">per year</span>
              </p>
              <p className="text-sm text-gray-600 mb-6">
                Separate: $47 + $68 = $115 — saving $20
              </p>

              <h4 className="font-semibold text-gray-900 mb-4">
                What Is Included
              </h4>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">
                    Pre-O Physics + Pre-O Chemistry
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">
                    Includes all 15 Pre-O Physics topics + all 11 Pre-O
                    Chemistry chapters
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">
                    H5P interactive content throughout
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">
                    80% mastery gate on every topic
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">
                    AI Study Advisor for both subjects
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">
                    Progress dashboard for student and parent
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">
                    Optional tutor add-on available for either or both subjects
                  </span>
                </li>
              </ul>

              <button className="w-full px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary-dark transition-colors">
                Choose Science Bundle
              </button>
            </motion.div>

            {/* Full Pre-O Bundle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-8 border-t-4 border-brand-primary shadow-sm relative"
            >
              <div className="absolute top-4 right-4 bg-brand-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                 Best Value
              </div>

              <h3 className="text-2xl font-semibold text-brand-navy mb-4">
                Full Pre-O Bundle
              </h3>
              <p className="text-3xl font-bold text-brand-primary mb-2">
                $155 <span className="text-sm text-gray-600">per year</span>
              </p>
              <p className="text-sm text-gray-600 mb-6">
                Separate: $78 + $47 + $68 = $193 — saving $38
              </p>

              <h4 className="font-semibold text-gray-900 mb-4">
                What Is Included
              </h4>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">
                    Pre-O Mathematics + Physics + Chemistry
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">
                    Complete Pre-O Sciences and Mathematics in one purchase
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">
                    80% mastery gate on every topic across all three subjects
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">
                    AI Study Advisor across all three subjects
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">
                    Full progress dashboard — one view for all three programmes
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">
                    Optional tutor add-on available
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">
                    Pre-O English priced separately — see Pre-O English Pathway
                    section above
                  </span>
                </li>
              </ul>

              <div className="bg-[#FFF8DC] border border-[#FFD700] rounded-lg p-4 mb-6 text-sm">
                <p className="text-gray-900">
                  <strong>Complete All Four Pre-O Programmes:</strong> Full Pre-O
                  Bundle ($155/year) + Pre-O English Bundle ($75/year) ={" "}
                  <strong>$230/year for all four</strong>
                </p>
              </div>

              <button className="w-full px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary-dark transition-colors">
                Choose Full Pre-O Bundle
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 10: PRICING SUMMARY TABLE */}
      <section className="py-16 md:py-24 bg-brand-navy">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 text-center">
            Clear Pricing. No Subscriptions. Pay Once.
          </h2>

          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand-navy text-white">
                    <th className="px-6 py-4 text-left font-semibold">
                      Programme
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Chapters / Topics
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      1-Year Price
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      2-Year Total
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      name: "Pre-O Mathematics",
                      topics: "13 topics",
                      yr1: "$78 / year",
                      yr2: "$117 total",
                    },
                    {
                      name: "Pre-O Physics",
                      topics: "15 topics",
                      yr1: "$47 / year",
                      yr2: "$70.50 total",
                    },
                    {
                      name: "Pre-O Chemistry",
                      topics: "11 chapters",
                      yr1: "$68 / year",
                      yr2: "$102 total",
                    },
                    {
                      name: "Pre-O English (ESL1)",
                      topics: "Full course",
                      yr1: "$30 / year",
                      yr2: "—",
                    },
                    {
                      name: "Pre-O English (ESL2)",
                      topics: "Full course",
                      yr1: "$30 / year",
                      yr2: "—",
                    },
                    {
                      name: "Pre-O English (Bridge)",
                      topics: "Full course",
                      yr1: "$45 / year",
                      yr2: "—",
                    },
                    {
                      name: "Pre-O English Bundle (all 3)",
                      topics: "—",
                      yr1: "$75 / year (save $30)",
                      yr2: "—",
                    },
                    {
                      name: "Pre-O Science Bundle (Phy+Che)",
                      topics: "—",
                      yr1: "$95 / year (save $20)",
                      yr2: "$142.50 total",
                    },
                    {
                      name: "Full Pre-O Bundle (M+P+C)",
                      topics: "—",
                      yr1: "$155 / year (save $38)",
                      yr2: "$232.50 total",
                    },
                  ].map((row, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {row.name}
                      </td>
                      <td className="px-6 py-4 text-gray-700">{row.topics}</td>
                      <td className="px-6 py-4 text-brand-primary font-semibold">
                        {row.yr1}
                      </td>
                      <td className="px-6 py-4 text-gray-700">{row.yr2}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          Available
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 bg-yellow-50 border-t border-gray-200">
              <p className="text-sm text-gray-800">
                <strong>ALL PRICES IN USD ONLY.</strong> All access periods
                start from the date of purchase. Year 2 discount = 50% off the
                Year 1 price. No 3-year option for Pre-O-Level programmes.
              </p>
            </div>

            <div className="px-6 py-4 bg-blue-50 border-t border-gray-200">
              <p className="text-sm text-gray-800">
                <strong>Scholarship support available</strong> for qualifying
                countries — 30–40% for African countries, 15–20% for qualifying
                Asian countries. Simple form, no documents required.{" "}
                <Link href="/pricing#scholarship">
                  <a className="text-brand-primary font-semibold hover:underline">
                    Apply for Scholarship →
                  </a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11: ADD A PERSONAL TUTOR */}
      <section className="py-16 md:py-24 bg-[#F5F5F5]">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-semibold text-brand-navy mb-12">
            Want Personalised Guidance Through Your Programme?
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Benefits */}
            <div>
              <p className="text-gray-700 mb-6">
                Every Pre-O-Level programme can be studied independently on the
                platform. If a student wants additional support — a certified
                EduMeUp tutor can guide them through the same programme content
                in 1-to-1 personalised sessions, online or in person.
              </p>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    <strong>Your tutor follows the same Pre-O-Level
                      curriculum</strong> — every session is aligned to your
                    current programme topic.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    <strong>All fees are paid securely to EduMeUp</strong> —
                    never directly to the tutor.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    <strong>Free 30-minute demo session</strong> before any
                    tutoring plan is confirmed.
                  </span>
                </li>
              </ul>
            </div>

            {/* Right: Pricing */}
            <div>
              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <h3 className="text-xl font-semibold text-brand-navy mb-6">
                  Tutor Plans
                </h3>

                <div className="space-y-4">
                  <div className="border-l-4 border-brand-primary pl-4">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Starter Plan
                    </h4>
                    <p className="text-sm text-gray-700 mb-2">
                      2 sessions/week • 50 minutes each
                    </p>
                    <p className="text-lg font-bold text-brand-primary">
                      $70 / month
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Online: $70 • Physical: $110
                    </p>
                  </div>

                  <div className="border-l-4 border-brand-primary pl-4">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Progress Plan
                    </h4>
                    <p className="text-sm text-gray-700 mb-2">
                      3 sessions/week • 50 minutes each
                    </p>
                    <p className="text-lg font-bold text-brand-primary">
                      $100 / month
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Online: $100 • Physical: $140
                    </p>
                  </div>

                  <div className="border-l-4 border-brand-navy pl-4">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Intensive Plan
                    </h4>
                    <p className="text-sm text-gray-700 mb-2">
                      5 sessions/week • 50 minutes each
                    </p>
                    <p className="text-lg font-bold text-brand-navy">
                      $160 / month
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Online: $160 • Physical: $200
                    </p>
                  </div>
                </div>

                <Link href="/tutoring">
                  <a className="mt-6 w-full inline-flex items-center justify-center px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary-dark transition-colors">
                    Find a Tutor
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 12: PHASE 2 - LIVE CLASSES */}
      <section className="py-16 md:py-24 bg-brand-navy text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <span className="text-brand-primary text-xs uppercase tracking-widest font-semibold">
                PHASE 2 — COMING SOON
              </span>

              <h2 className="text-4xl md:text-5xl font-semibold text-white mt-4 mb-8 leading-tight">
                Phase 2: Live Online Classes. Register Your Interest Now.
              </h2>

              <p className="text-gray-200 mb-6">
                Once a group of 5 to 10 students registers for the same Pre-O-Level
                programme, EduMeUp schedules live online class sessions — bringing
                structured, interactive group learning to the self-paced platform
                content.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-100">
                    <strong>Live online classes</strong> are led by a certified
                    EduMeUp tutor — covering the same programme content as
                    Phase 1.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-100">
                    <strong>Students already enrolled in Phase 1</strong>
                    (self-paced) can join Phase 2 live classes when their group
                    is ready — at no additional platform cost (live class
                    sessions may have a separate fee — to be announced).
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-100">
                    <strong>Groups form per programme and per grade level</strong>
                    — so every student in a live class is working on the same
                    content.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-100">
                    <strong>Register your interest now</strong> and EduMeUp will
                    notify you when a group for your programme is ready to begin.
                  </span>
                </li>
              </ul>

              <button className="inline-flex items-center px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary-dark transition-colors">
                Register My Interest in Phase 2
                <ChevronRight className="ml-2 h-4 w-4" />
              </button>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="bg-white/10 rounded-2xl p-8 border border-white/20"
              >
                <Zap className="h-16 w-16 text-brand-primary mb-4" />
                <h4 className="text-2xl font-semibold mb-4">
                  Group Learning Benefits
                </h4>
                <p className="text-gray-200 text-sm mb-6">
                  Phase 2 brings the structure of live teaching while leveraging
                  the personalization of Phase 1 self-paced content. Students
                  learn together, progress together, and achieve Cambridge
                  readiness together.
                </p>

                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-xs text-gray-300">
                    <strong>Minimum group size:</strong> 5–10 students per
                    programme per grade level.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 13: HOW IT WORKS */}
      <section className="py-16 md:py-24 bg-[#F5F5F5]">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-semibold text-brand-navy mb-12 text-center">
            Five Steps From Diagnostic to O-Level Ready.
          </h2>

          <div className="flex flex-col md:grid md:grid-cols-5 gap-8 items-stretch">
            {[
              {
                num: 1,
                title: "Take the Free Diagnostic",
                desc: "The free 40–60 minute diagnostic identifies your current level in each subject and recommends which Pre-O-Level programme to start with — so you do not buy what you do not need.",
              },
              {
                num: 2,
                title: "Enrol in Your Programme",
                desc: "Choose your programme or bundle. One-time payment. Access begins immediately. No subscription required.",
              },
              {
                num: 3,
                title: "Learn Interactively — Phase 1",
                desc: "Work through H5P interactive content topic by topic. Achieve the 80% mastery gate before advancing. AI Study Advisor available throughout.",
              },
              {
                num: 4,
                title: "Add a Tutor (Optional)",
                desc: "If you want personalised guidance, add an EduMeUp certified tutor to your programme — 1-to-1 online or in person. The tutor follows your programme curriculum exactly.",
              },
              {
                num: 5,
                title: "Join Live Classes — Phase 2",
                desc: "Once your programme group reaches 5–10 students, Phase 2 live online classes begin. Register your interest to be notified when your group is ready.",
              },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative flex flex-col items-center"
              >
                {/* Circle */}
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-brand-primary text-white font-bold text-lg mb-4 flex-shrink-0">
                  {step.num}
                </div>

                {/* Card */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 flex-1 text-center">
                  <h3 className="font-semibold text-brand-navy mb-3 text-lg">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-700">{step.desc}</p>
                </div>

                {/* Arrow (except last) */}
                {idx < 4 && (
                  <div className="hidden md:block absolute -bottom-14 left-1/2 transform -translate-x-1/2 text-brand-primary">
                    <ChevronRight className="h-8 w-8 rotate-90" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 14: READINESS FORECAST CROSSLINK */}
      <section className="py-12 md:py-16 bg-brand-primary/10 border-t-4 border-b-4 border-brand-primary">
        <div className="container-custom">
          <div className="bg-white rounded-lg p-8 border-l-4 border-brand-primary">
            <h3 className="text-2xl font-semibold text-brand-navy mb-4">
              Not Sure If You Need Pre-O-Level? Test Your O-Level Readiness
              First.
            </h3>
            <p className="text-gray-700 mb-6">
              The Cambridge O-Level Readiness Forecast is EduMeUp's
              certification test that tells you — with precision — what your
              Cambridge O-Level result is likely to be based on where you stand
              right now. If your forecast shows strong readiness, you may not
              need Pre-O-Level at all. If it shows gaps, it tells you exactly
              where to start.
            </p>
            <Link href="/olevel-readiness-forecast">
              <a className="inline-flex items-center px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary-dark transition-colors">
                Test My O-Level Readiness
                <ChevronRight className="ml-2 h-4 w-4" />
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 15: FAQ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-semibold text-brand-navy mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "What is the difference between Pre-O-Level and Lower Secondary?",
                a: "Lower Secondary Grade 6–8 covers international curriculum content at Grade 6–8 level — not specifically aligned to Cambridge O-Level. Pre-O-Level is directly mapped to the foundation knowledge required for Cambridge O-Level entry in each subject. Students can study both, or go directly to Pre-O-Level if their general schooling is already at Grade 6–8 standard.",
              },
              {
                q: "Do I need to take the diagnostic before enrolling?",
                a: "A diagnostic is strongly recommended before enrolment — it identifies which programme you need and which specific topics within it to prioritise. The free diagnostic (40–60 minutes, one subject) is available at /diagnostics. However, you can enrol directly if you already know which programme you need.",
              },
              {
                q: "Can I study more than one Pre-O-Level programme at the same time?",
                a: "Yes. The bundle options (Pre-O Science Bundle or Full Pre-O Bundle) are designed for students studying two or three subjects simultaneously. All programmes are available on the same platform — one login, one dashboard.",
              },
              {
                q: "What happens after I complete a Pre-O-Level programme?",
                a: "On completing a Pre-O-Level programme and achieving the mastery gates, a student is ready to begin the corresponding Cambridge O-Level subject course on EduMeUp. For English, completion of the Bridge course indicates readiness for O-Level English. The platform tracks readiness and recommends the next step automatically.",
              },
              {
                q: "Is a tutor included in the programme price?",
                a: "No. The programme price covers the self-paced platform content only. A certified EduMeUp tutor is an optional add-on — available at standard tutoring plan rates. See Section 11 for tutoring details.",
              },
              {
                q: "What is Phase 2 live classes and when will it be available?",
                a: "Phase 2 live classes are scheduled online group sessions led by a certified tutor — covering the same programme content as Phase 1. They begin once a minimum of 5–10 students are registered for the same programme. Register your interest and EduMeUp will notify you when your group is ready.",
              },
              {
                q: "Are all Pre-O-Level courses available now?",
                a: "Yes. All four Pre-O-Level programmes (Mathematics, Physics, Chemistry, and English) are fully available on the EduMeUp platform. All courses are marked Available — there are no Coming Soon courses.",
              },
              {
                q: "Can students in any country access these programmes?",
                a: "Yes. All Pre-O-Level programmes are accessible globally. All content uses international examples — not specific to any one country's curriculum. Scholarship support is available for students in qualifying countries — 30–40% for African countries, 15–20% for qualifying Asian countries.",
              },
            ].map((faq, idx) => (
              <details
                key={idx}
                className="group bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 bg-brand-navy text-white px-6 py-4 font-semibold">
                  {faq.q}
                  <ChevronRight className="h-5 w-5 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-6 py-4 text-gray-700 text-sm leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 16: FINAL CTA */}
      <section className="py-16 md:py-24 bg-brand-navy">
        <div className="container-custom">
          <h2 className="text-3xl md:text-5xl font-semibold text-white mb-12 text-center">
            Ready to Build Your Foundation? Start Today.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Take the Free Diagnostic First",
                desc: "40–60 minutes. Full detailed report. Free. Know which programme to start with before you spend anything.",
                cta: "Start Free Diagnostic",
                href: "/diagnostics",
                color: "bg-brand-primary",
              },
              {
                title: "Enrol in a Programme",
                desc: "Choose your programme, your bundle, or the complete Pre-O package. All courses available now.",
                cta: "View All Programmes",
                href: "#programmes",
                color: "bg-brand-primary",
              },
              {
                title: "Talk to Us",
                desc: "Questions about which programme is right for your student? Our team will help.",
                cta: "WhatsApp Us",
                href: "https://wa.me/your-number",
                color: "bg-[#25D366]",
              },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-xl p-8 text-center"
              >
                <h3 className="text-xl font-semibold text-brand-navy mb-4">
                  {card.title}
                </h3>
                <p className="text-gray-700 text-sm mb-6">{card.desc}</p>
                <Link href={card.href}>
                  <a
                    className={`inline-flex items-center justify-center px-6 py-3 ${card.color} text-white font-semibold rounded-lg hover:opacity-90 transition-opacity w-full`}
                  >
                    {card.cta}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </a>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
