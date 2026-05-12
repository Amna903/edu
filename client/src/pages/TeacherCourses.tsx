import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Award, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ui } from "@/theme";

const pathwaySteps = [
  { code: "CC", name: "Classroom English", duration: "Self-paced", cert: "Certificate of Completion" },
  { code: "T1", name: "Diagnostic (T1)", duration: "1-2 hours", cert: "Personalised CPD Report" },
  { code: "T2", name: "CTMW Workshop (T2)", duration: "1 day", cert: "CCTE Certificate (7 CPD hrs)" },
  { code: "T3", name: "SMK Training (T3)", duration: "Self-paced", cert: "SMK Certificate (88% gate)" },
  { code: "T4", name: "Examiner Intel. (T4)", duration: "2-3 half-days", cert: "Examiner Intel. Certificate" },
  { code: "T5", name: "Tutor Cert. (T5)", duration: "Ongoing", cert: "Tutor Certification" },
  { code: "T6", name: "AI Tools (T6)", duration: "Subscription", cert: "Tool Access + Updates" },
];

const classroomEnglishModules = [
  { num: 1, title: "Cambridge Classroom Vocabulary", desc: "Command words in context: how each command word changes what students must do. Practice using each in classroom instruction." },
  { num: 2, title: "Delivering AO1 Instructions", desc: "How to explain recall and definition tasks precisely. Common language errors that confuse students. Practised delivery of 10 AO1 instruction types." },
  { num: 3, title: "Explaining AO2 Application Tasks", desc: "Language for scaffolding application questions. How to direct students toward evidence-based reasoning using precise English." },
  { num: 4, title: "AO3 Evaluation — Language for Higher-Order Tasks", desc: "How to frame evaluation questions without simplifying them. Language for leading discussion of competing arguments." },
  { num: 5, title: "Giving Mark-Scheme Feedback in English", desc: "How Cambridge examiners describe marks awarded and marks lost. Practise delivering the same feedback language in classroom context." },
  { num: 6, title: "Handling Student Questions Professionally", desc: "Responding to student questions with accuracy and confidence. When to say 'I will check that' rather than improvise. Classroom authority through language." },
  { num: 7, title: "Academic Register for Cambridge Classrooms", desc: "Formal vs informal register. Written feedback in Cambridge-appropriate academic English. Email and report language for teacher-parent and teacher-school communication." },
];

const t1Details = {
  title: "T1 Teacher Subject Knowledge Diagnostic",
  tagline: "[START HERE — PERSONALISED CPD PATHWAY]",
  format: "AI-powered assessment — online, on demand | Approximately 60-90 minutes per subject",
  cpdHours: "No CPD hours awarded (this is an assessment, not a training programme)",
  certification: "Personalised T2/T3/T4 CPD Pathway Report",
  masteryGate: "N/A — this is a diagnostic, not a certification assessment",
  whoFor: "Every Cambridge teacher new to EduMeUp, and any teacher who wants to identify precisely where their Cambridge subject knowledge and pedagogical approach needs development. The T1 diagnostic is the mandatory first step for all teachers beginning the EduMeUp pathway.",
  whatYouLearn: "The T1 is not a taught programme — it is a structured assessment. It assesses two dimensions: (1) Cambridge Subject Knowledge — your mastery of the Cambridge O-Level syllabus content for your subject at the depth Cambridge examiners expect. (2) Cambridge Pedagogical Approach — how you currently teach each topic, what mark-scheme language you use, how you identify and address student misconceptions, and how you design AO2 and AO3 activities. The assessment covers the full subject — it is not topic-selectable. Every topic in the Cambridge syllabus is assessed at all three AO levels.",
  whatYouReceive: "A full written T1 Diagnostic Report covering: subject knowledge gap matrix (per topic per AO level), pedagogical approach gaps identified, overall Cambridge-readiness assessment, and a personalised CPD pathway — which of T2/T3/T4 to take, in which order, for which subjects. The report is saved to the teacher dashboard and is viewable by school administrators if the teacher is linked to a school account.",
};

const t2Modules = [
  { num: 1, title: "Cambridge Assessment Architecture", desc: "AO1 (Recall/Define/State), AO2 (Apply/Calculate/Explain), AO3 (Evaluate/Analyse/Discuss) — in depth, not as definitions. How each AO level changes what a student must do to earn marks. Cambridge command words mapped to AO levels." },
  { num: 2, title: "Reading Mark Schemes Like an Examiner", desc: "How Cambridge mark schemes are structured. The difference between a mark scheme and an answer key. Band descriptors for extended response questions. How examiners apply marking principles consistently. Live practice: marking 10 student responses against Cambridge mark schemes." },
  { num: 3, title: "Designing AO2 and AO3 Learning Activities", desc: "The three most common lesson design errors that prevent students from developing AO2 and AO3 skills. How to convert AO1 activities into AO2 activities. How to design questions that require evaluation, not just description. Live practice: redesigning existing lesson activities." },
  { num: 4, title: "The Most Common Student Errors — Per Subject", desc: "Cambridge examiner reports: what examiners say students do wrong most frequently. How to pre-empt these errors in lesson design. How to identify them in student work before they become examination habits. Subject-specific error analysis using real Cambridge examiner report language." },
  { num: 5, title: "Teaching for Long-Term Retention", desc: "Why students forget what they learn: the forgetting curve and what it means for lesson design. How spaced retrieval practice changes retention from 5% to 75%+. How to build retrieval practice into existing lesson structures without adding preparation time. Using EduMeUp's spaced retrieval system as a classroom tool." },
  { num: 6, title: "Integrating Past Papers from Day 1", desc: "Why saving past papers for revision is the most common and most costly examination preparation error. How to use past paper questions in every lesson — not just before examinations. AO-tagging past paper questions. How to give Cambridge-calibrated feedback on past paper responses without spending hours marking." },
  { num: 7, title: "Building AO3 in Students Who Start at AO1", desc: "The most challenging objective for most Cambridge teachers: how do you develop evaluation skills in students who can only recall? A structured 6-week classroom programme for moving a cohort from AO1 to AO3 proficiency. Live practice: planning the first four lessons of a topic using the AO progression framework." },
];

const t3Subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Economics",
  "Business Studies",
  "English Language",
  "Urdu",
  "Islamiyat",
  "Pakistan Studies",
];

const tools = [
  {
    num: "1",
    title: "AI Question Generator",
    desc: "Generates Cambridge-calibrated practice questions on demand for any topic in any O-Level subject. Input: topic name, AO level required (AO1/AO2/AO3), difficulty, and number of questions. Output: exam-style questions with mark schemes, Cambridge command words, and mark allocation — formatted exactly as they appear in Cambridge papers.",
    why: "Eliminates one of the most time-consuming parts of lesson preparation — creating new practice questions. A teacher can generate 10 new AO2 Chemistry questions in under 2 minutes, all calibrated to Cambridge standard.",
  },
  {
    num: "2",
    title: "AI Mark Scheme Analyser",
    desc: "Evaluates student written responses against Cambridge mark scheme criteria. Input: the question, the mark scheme (or the topic — the tool retrieves the mark scheme automatically), and the student's answer. Output: marks awarded per mark-scheme point, specific language that earned marks, specific language or content that lost marks, band assigned (for extended response questions), and one-sentence improvement suggestion phrased in Cambridge examiner language.",
    why: "Transforms marking from a slow, inconsistent process into a fast, calibrated one. A teacher can mark 30 student responses with consistent Cambridge-standard feedback in the time it previously took to mark 5. Also identifies patterns — if 20 of 30 students made the same error, the tool flags it as a teaching priority.",
  },
  {
    num: "3",
    title: "AI Lesson Planner",
    desc: "Generates AO-aligned lesson plans for any Cambridge O-Level topic. Input: subject, topic, available time (e.g. 45 minutes), AO focus (AO1 only / AO1+AO2 / AO1+AO2+AO3 / AO3 extension), and any specific learning objectives. Output: a structured lesson plan with: starter activity (retrieval practice from previous topic), main teaching sequence, AO-aligned practice activities, assessment check, and a homework or retrieval task for the spaced schedule.",
    why: "Removes the blank-page problem in lesson planning. A teacher who knows what Cambridge requires (from T2 training) but needs time-efficient preparation can generate a complete, AO-calibrated lesson plan in under 3 minutes and adapt it to their class.",
  },
  {
    num: "4",
    title: "AI Spaced Retrieval Scheduler",
    desc: "Manages the class-level spaced retrieval schedule for all topics covered in the teacher's class. Input: the teacher links the tool to their class group and the course they are teaching. Output: a weekly retrieval schedule — which topics should be reviewed by which students this week, based on individual forgetting curves and the Day 1/3/7/14/30/90 schedule. The teacher sees the schedule as a class dashboard; students see their individual schedule in their own dashboards.",
    why: "Automates the most research-proven but administratively demanding aspect of effective teaching — spaced retrieval practice. A teacher managing 30 students across 25 topics would need to track 750 individual retrieval schedules. This tool does it automatically.",
  },
  {
    num: "5",
    title: "AI Student Performance Briefing",
    desc: "Generates a pre-tutoring or pre-lesson briefing for the teacher about individual students or the whole class. Input: student name or class group, subject. Output: a 1-page brief covering the student's diagnostic results, mastery levels by topic, recent assessment scores, topics currently in the spaced retrieval schedule, and any risk alerts (topics below 50% mastery approaching the examination date). Automatically compiled 24 hours before a scheduled tutoring session.",
    why: "Ensures every tutoring session and every lesson is informed by data — not by what the teacher remembers from the last session. The teacher enters the classroom knowing exactly which students have gaps in which topics this week.",
  },
];

export default function TeacherCourses() {
  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") || "";

    document.title = "Teacher Courses — Cambridge Professional Development | EduMeUp";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "EduMeUp Teacher Courses — T1 Diagnostic, T2 CTMW Workshop, T3 SMK, T4 Examiner Intelligence, T5 Tutor Certification, T6 AI Tools. Professional development pathway for Cambridge teachers."
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
      {/* HERO */}
      <section className={ui.sections.hero + " py-16 md:py-24"}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <p className={ui.pills.brand + " mb-6 justify-center"}>
              Cambridge Teacher Excellence
            </p>
            <h1 className="text-5xl md:text-7xl font-semibold text-slate-900 mb-6 tracking-tight leading-tight">
              Seven Programmes. One Pathway. Examiner-Level Mastery.
            </h1>
            <p className="text-base text-slate-700 max-w-3xl mx-auto leading-relaxed mb-8">
              EduMeUp's teacher development pathway transforms any Cambridge teacher — regardless of starting point — into a specialist with examiner-level subject knowledge, evidence-based Cambridge pedagogy, and the confidence to produce consistent Band 1 student responses. The pathway begins with a diagnostic and ends with certification. Every programme is built on what research shows actually changes classroom teaching.
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link href="/diagnostic?role=teacher">
                <span className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-semibold ${ui.buttons.brand}`}>
                  Start with the T1 Diagnostic
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link href="#programmes">
                <span className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-semibold border-2 border-[#2366c9] text-[#2366c9] hover:bg-[#2366c9] hover:text-white transition-colors`}>
                  View All Programmes
                </span>
              </Link>
            </div>
            <p className="text-sm text-slate-600 mt-6">
              <Link href="/for-schools">
                <span className="text-[#2366c9] underline cursor-pointer">Are you a school? See the full teacher training offering for schools</span>
              </Link>
            </p>
          </motion.div>
        </div>
      </section>

      {/* TEACHER DEVELOPMENT PATHWAY */}
      <section className={ui.sections.softBlue + " py-14 md:py-20"}>
        <div className="container-custom">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight mb-6">
                Every Teacher Has a Starting Point. The T1 Diagnostic Finds Yours.
              </h2>
              <p className="text-base text-black leading-relaxed">
                The EduMeUp teacher pathway is not a fixed sequence every teacher completes in full. It is a diagnostic-driven, personalised development journey — you begin at the point your T1 results indicate, take the programmes that address your specific gaps, and earn certifications that verify your development at each stage.
              </p>
            </div>

            {/* Pathway Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-[14px]">
                <thead>
                  <tr className={ui.tables.header}>
                    <th className="p-4 text-left">Code</th>
                    <th className="p-4 text-left">Programme</th>
                    <th className="p-4 text-left">Duration</th>
                    <th className="p-4 text-left">Certification</th>
                  </tr>
                </thead>
                <tbody>
                  {pathwaySteps.map((step, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? ui.tables.row : ui.tables.rowAlt}>
                      <td className="p-4 font-semibold text-[#2366c9]">{step.code}</td>
                      <td className="p-4">{step.name}</td>
                      <td className="p-4">{step.duration}</td>
                      <td className="p-4">{step.cert}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={`${ui.cards.standard} p-6 mt-8 border-l-4 border-[#2366c9]`}>
              <p className="text-base font-semibold text-black mb-3">The recommended starting point for every teacher new to EduMeUp is T1 — the Subject Knowledge Diagnostic.</p>
              <p className="text-[14px] text-black">It identifies your specific Cambridge knowledge and pedagogy gaps, and generates a personalised T2/T3/T4 development pathway. You do not have to guess what to study next.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CLASSROOM ENGLISH COMMUNICATION */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl">
            <div className={`${ui.cards.standard} p-8 md:p-10 border-t-4 border-teal-600`}>
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-teal-600 mb-2">Programme</p>
                <h2 className="text-3xl font-semibold text-slate-900">Classroom English Communication (CC)</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Format</p>
                  <p className="text-[14px] text-black">[NEW PROGRAMME] Self-paced Moodle course | Flexible — complete at your own pace</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">CPD Hours & Certification</p>
                  <p className="text-[14px] text-black">Counts towards CPD hours (exact hours TBD) | Certificate of Completion | Mastery Gate: 80% (course completion)</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Who This Is For</p>
                  <p className="text-[14px] text-black">Cambridge teachers whose first language is not English — specifically Urdu-speaking and Arabic-speaking teachers. Any teacher who wants to improve the precision and confidence of their English-medium instruction.</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">7 Modules</p>
                  <div className="space-y-3">
                    {classroomEnglishModules.map((mod) => (
                      <div key={mod.num} className="flex gap-4">
                        <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-teal-100 text-teal-700 font-semibold text-xs">
                          {mod.num}
                        </div>
                        <div>
                          <p className="font-semibold text-[14px] text-black">{mod.title}</p>
                          <p className="text-[13px] text-slate-600 mt-1">{mod.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-[#dbe7f4]">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">What You Receive</p>
                  <ul className="space-y-2 text-[14px] text-black">
                    <li className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-teal-600 mt-0.5" />
                      Certificate of Completion
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-teal-600 mt-0.5" />
                      Verified proficiency in Cambridge classroom English
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-teal-600 mt-0.5" />
                      Immediate improvement in the precision of mark-scheme feedback delivered to students
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* T1 DIAGNOSTIC */}
      <section className={ui.sections.softBlue + " py-14 md:py-20"} id="programmes">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl">
            <div className={`${ui.cards.standard} p-8 md:p-10 border-t-4 border-blue-700`}>
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-700 mb-2">T1</p>
                <h2 className="text-3xl font-semibold text-slate-900">{t1Details.title}</h2>
                <p className="text-sm text-[#2366c9] font-semibold mt-2">{t1Details.tagline}</p>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Format</p>
                  <p className="text-[14px] text-black">{t1Details.format}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs font-semibold text-blue-700">CPD Hours</p>
                    <p className="text-[13px] text-black mt-2">{t1Details.cpdHours}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs font-semibold text-blue-700">Certification</p>
                    <p className="text-[13px] text-black mt-2">{t1Details.certification}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg col-span-2">
                    <p className="text-xs font-semibold text-blue-700">Mastery Gate</p>
                    <p className="text-[13px] text-black mt-2">{t1Details.masteryGate}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Who This Is For</p>
                  <p className="text-[14px] text-black">{t1Details.whoFor}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">What You Learn</p>
                  <p className="text-[14px] text-black leading-relaxed">{t1Details.whatYouLearn}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">What You Receive</p>
                  <p className="text-[14px] text-black leading-relaxed">{t1Details.whatYouReceive}</p>
                </div>

                <div className="pt-6 border-t border-[#dbe7f4]">
                  <p className="text-sm font-semibold text-slate-900 mb-3">The T1 diagnostic is always a full-subject assessment — teachers cannot select individual topics for assessment.</p>
                  <p className="text-[14px] text-black">This ensures the CPD pathway recommendation is based on a complete picture of the teacher's Cambridge readiness, not a partial view.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* T2 WORKSHOP */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl">
            <div className={`${ui.cards.standard} p-8 md:p-10 border-t-4 border-blue-900`}>
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-900 mb-2">T2</p>
                <h2 className="text-3xl font-semibold text-slate-900">Cambridge Teacher Mastery Workshop (CTMW)</h2>
                <p className="text-sm text-[#2366c9] font-semibold mt-2">[MOST IMPACTFUL — HIGHEST CPD VALUE]</p>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Format</p>
                  <p className="text-[14px] text-black">In-person OR live online — one intensive day | One full day (7 hours of structured CPD)</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Key Details</p>
                  <p className="text-[14px] text-black"><strong>CPD Hours:</strong> 7 CPD Hours — the highest single-session CPD award on the EduMeUp pathway</p>
                  <p className="text-[14px] text-black mt-2"><strong>Certification:</strong> Cambridge Certificate of Cambridge Teaching Excellence (CCTE)</p>
                  <p className="text-[14px] text-black mt-2"><strong>Mastery Gate:</strong> 88% — the teacher certification mastery gate</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">7 Modules — What the Day Covers</p>
                  <div className="space-y-3">
                    {t2Modules.map((mod) => (
                      <div key={mod.num} className="flex gap-4 p-4 bg-slate-50 rounded-lg">
                        <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-blue-700 text-white font-semibold text-xs">
                          {mod.num}
                        </div>
                        <div>
                          <p className="font-semibold text-[14px] text-black">{mod.title}</p>
                          <p className="text-[13px] text-slate-600 mt-1">{mod.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-[#dbe7f4]">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">What Teachers Leave With</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="font-semibold text-[14px] text-[#2366c9] mb-3">Practical tools — ready tomorrow:</p>
                      <ul className="space-y-2">
                        <li className="flex gap-2 text-[14px] text-black">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500 mt-0.5" />
                          A personalised 3-week lesson improvement plan
                        </li>
                        <li className="flex gap-2 text-[14px] text-black">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500 mt-0.5" />
                          One retrieval practice opener for their next lesson
                        </li>
                        <li className="flex gap-2 text-[14px] text-black">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500 mt-0.5" />
                          The Cambridge command word taxonomy — annotated
                        </li>
                        <li className="flex gap-2 text-[14px] text-black">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500 mt-0.5" />
                          A mark-loss pattern analysis for their subject
                        </li>
                        <li className="flex gap-2 text-[14px] text-black">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500 mt-0.5" />
                          The 3-phase retention lesson structure template
                        </li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-[14px] text-[#2366c9] mb-3">What the CCTE Certificate confirms:</p>
                      <ul className="space-y-2">
                        <li className="flex gap-2 text-[14px] text-black">
                          <Award className="h-4 w-4 shrink-0 text-[#2366c9] mt-0.5" />
                          Cambridge assessment architecture competency (AO1/AO2/AO3)
                        </li>
                        <li className="flex gap-2 text-[14px] text-black">
                          <Award className="h-4 w-4 shrink-0 text-[#2366c9] mt-0.5" />
                          Evidence-based retention lesson design skills
                        </li>
                        <li className="flex gap-2 text-[14px] text-black">
                          <Award className="h-4 w-4 shrink-0 text-[#2366c9] mt-0.5" />
                          Examination strategy teaching capability
                        </li>
                        <li className="flex gap-2 text-[14px] text-black">
                          <Award className="h-4 w-4 shrink-0 text-[#2366c9] mt-0.5" />
                          Classroom management for academic culture
                        </li>
                        <li className="flex gap-2 text-[14px] text-black">
                          <Award className="h-4 w-4 shrink-0 text-[#2366c9] mt-0.5" />
                          Cambridge AI tool integration capability
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* T3 SMK */}
      <section className={ui.sections.softBlue + " py-14 md:py-20"}>
        <div className="container-custom">
          <div className="mx-auto max-w-5xl">
            <div className={`${ui.cards.standard} p-8 md:p-10 border-t-4 border-purple-600`}>
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-purple-600 mb-2">T3</p>
                <h2 className="text-3xl font-semibold text-slate-900">Subject Mastery Knowledge Training (SMK)</h2>
                <p className="text-sm text-[#2366c9] font-semibold mt-2">[SUBJECT-SPECIFIC — PER SUBJECT]</p>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Format</p>
                  <p className="text-[14px] text-black">Self-paced Moodle course — complete at your own pace | Flexible — typically 4-8 weeks per subject depending on gap depth</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Key Details</p>
                  <p className="text-[14px] text-black"><strong>CPD Hours:</strong> CPD hours awarded proportional to modules completed (TBD per subject)</p>
                  <p className="text-[14px] text-black mt-2"><strong>Certification:</strong> Subject Mastery Knowledge Certificate (SMKC) — one per subject completed</p>
                  <p className="text-[14px] text-black mt-2"><strong>Mastery Gate:</strong> 88% — must achieve 88% on the end-of-subject assessment to earn the SMKC</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Available For All 10 Cambridge O-Level Subjects</p>
                  <div className="flex flex-wrap gap-2">
                    {t3Subjects.map((subject) => (
                      <span key={subject} className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-[13px] font-semibold">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Who This Is For</p>
                  <p className="text-[14px] text-black">Teachers whose T1 diagnostic identified specific subject knowledge gaps at Cambridge examiner depth. Teachers who want to achieve verified mastery of the Cambridge syllabus for their subject — not just familiarity. Each T3 programme is for one specific subject.</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">What You Receive</p>
                  <p className="text-[14px] text-black">Subject Mastery Knowledge Certificate (SMKC) for the subject completed — internationally recognised by EduMeUp as evidence of examiner-level Cambridge subject mastery. CPD hours documented. Dashboard updated to reflect T3 completion. T3 completion in a subject unlocks advanced features in the T6 AI Teaching Tools for that subject.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* T6 AI TOOLS */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <p className={ui.pills.brand + " mb-5 justify-center"}>
                T6 AI Teaching Tools
              </p>
              <h2 className="text-4xl font-semibold text-slate-900 tracking-tight">
                5 Cambridge-Calibrated AI Tools
              </h2>
              <p className="text-base text-slate-600 mt-4">Available after T2 completion — tools unlock progressively as you complete further pathway stages</p>
            </div>

            <div className="space-y-6">
              {tools.map((tool) => (
                <motion.div
                  key={tool.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`${ui.cards.standard} p-6 md:p-8 hover:shadow-lg transition-shadow`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-[#2366c9] text-white font-bold text-sm">
                      {tool.num}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-[#2366c9]">{tool.title}</h3>
                    </div>
                  </div>
                  <p className="text-[14px] text-black mb-4 leading-relaxed">{tool.desc}</p>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-xs font-semibold text-[#2366c9] mb-2">WHY IT MATTERS:</p>
                    <p className="text-[13px] text-black italic">{tool.why}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RESEARCH FOUNDATION */}
      <section className={ui.sections.softBlue + " py-14 md:py-20"}>
        <div className="container-custom">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <p className={ui.pills.brand + " mb-5 justify-center"}>
                The Evidence
              </p>
              <h2 className="text-4xl font-semibold text-slate-900 tracking-tight">
                Every EduMeUp Programme Is Grounded in Educational Research
              </h2>
            </div>

            <div className="space-y-6">
              <div className={`${ui.cards.standard} p-6 md:p-8 border-l-4 border-[#2366c9]`}>
                <p className="text-sm font-semibold text-[#2366c9] mb-2">Hattie (2009)</p>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Visible Learning</h3>
                <p className="text-[14px] text-black leading-relaxed">Teacher quality is the single most powerful in-school factor affecting student achievement — more than class size, school resources, or curriculum. The effect size of teacher expertise on student outcomes is d=0.49, among the highest modifiable factors in education.</p>
              </div>

              <div className={`${ui.cards.standard} p-6 md:p-8 border-l-4 border-[#2366c9]`}>
                <p className="text-sm font-semibold text-[#2366c9] mb-2">Shulman (1986)</p>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Pedagogical Content Knowledge</h3>
                <p className="text-[14px] text-black leading-relaxed">Knowing a subject thoroughly and knowing how to teach it for examination performance are distinct competencies. The most significant differentiator between teachers who produce Cambridge results and those who do not is not subject knowledge — it is pedagogical content knowledge (PCK): how to translate subject expertise into student examination performance.</p>
              </div>

              <div className={`${ui.cards.standard} p-6 md:p-8 border-l-4 border-[#2366c9]`}>
                <p className="text-sm font-semibold text-[#2366c9] mb-2">Darling-Hammond et al. (2017)</p>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Effective Teacher Professional Development</h3>
                <p className="text-[14px] text-black leading-relaxed">CPD that produces lasting change in classroom practice is: sustained (not one-off); content-specific (not generic); directly connected to classroom application; collaborative; and provides coaching or follow-up. One-day workshops that meet none of these criteria produce no measurable improvement in teacher practice.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className={ui.sections.brand + " py-20 md:py-32"}>
        <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-blue-600 opacity-30 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-blue-600 opacity-30 blur-3xl" aria-hidden="true" />
        <div className="container-custom text-center relative z-10">
          <h2 className="text-4xl md:text-6xl text-white font-semibold leading-[1.05] mb-5 tracking-tight">
            Start Where the Evidence Starts — With Your Diagnostic.
          </h2>
          <p className="text-base text-blue-200 mb-12 max-w-3xl mx-auto">
            The T1 diagnostic tells you which programmes you need and in which order — based on your actual gaps, not a generic CPD recommendation. Start there.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Link href="/diagnostic?role=teacher">
              <Button size="lg" className={`w-full md:w-auto min-w-[260px] font-semibold py-3 px-6 rounded-xl text-[14px] shadow-md flex items-center justify-center gap-2 ${ui.buttons.brandLight}`}>
                Take the T1 Diagnostic <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className={`w-full md:w-auto min-w-[260px] font-semibold py-3 px-6 rounded-xl text-[14px] shadow-md flex items-center justify-center gap-2 ${ui.buttons.brandOutline}`}>
                Training Your School's Teaching Team?
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
