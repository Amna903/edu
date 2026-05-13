import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Award, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";

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
      <section className="py-20 md:py-32 bg-gradient-to-b from-brand-primary-soft to-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-brand-primary opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <span className="inline-flex items-center rounded-full bg-brand-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-primary mb-8">
              Cambridge Teacher Excellence
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-neutral-text mb-8 tracking-tight leading-tight">
              Seven Programmes. One Pathway. <br/><span className="text-brand-primary">Examiner-Level Mastery.</span>
            </h1>
            <p className="text-lg text-neutral-muted max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
              EduMeUp's teacher development pathway transforms any Cambridge teacher into a specialist with examiner-level subject knowledge, evidence-based pedagogy, and the confidence to produce consistent Band 1 student responses.
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <Link href="/diagnostic?role=teacher">
                <Button className="h-14 px-10 rounded-2xl bg-brand-primary text-white font-bold text-lg hover:bg-brand-primary-dark shadow-xl transition-all hover:scale-105">
                  Start with the T1 Diagnostic
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#programmes">
                <Button variant="outline" className="h-14 px-10 rounded-2xl border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-bold text-lg transition-all">
                  View All Programmes
                </Button>
              </Link>
            </div>
            <p className="text-sm text-neutral-muted mt-8 font-medium">
              <Link href="/for-schools">
                <span className="text-brand-primary font-bold hover:underline cursor-pointer">Are you a school? See the full teacher training offering for schools</span>
              </Link>
            </p>
          </motion.div>
        </div>
      </section>

      {/* TEACHER DEVELOPMENT PATHWAY */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-neutral-text tracking-tight mb-8">
                Every Teacher Has a Starting Point. <br/><span className="text-brand-primary">The T1 Diagnostic Finds Yours.</span>
              </h2>
              <p className="text-lg text-neutral-muted leading-relaxed max-w-4xl mx-auto font-medium">
                The EduMeUp teacher pathway is not a fixed sequence every teacher completes in full. It is a diagnostic-driven, personalised development journey — you begin at the point your T1 results indicate, take the programmes that address your specific gaps.
              </p>
            </div>

            {/* Pathway Table */}
            <div className="overflow-hidden rounded-[2rem] border border-neutral-border shadow-2xl bg-white mb-12">
              <table className="w-full text-base">
                <thead>
                  <tr className="bg-brand-primary text-white">
                    <th className="p-6 text-left font-bold uppercase tracking-wider text-sm">Code</th>
                    <th className="p-6 text-left font-bold uppercase tracking-wider text-sm">Programme</th>
                    <th className="p-6 text-left font-bold uppercase tracking-wider text-sm">Duration</th>
                    <th className="p-6 text-left font-bold uppercase tracking-wider text-sm">Certification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-border">
                  {pathwaySteps.map((step, idx) => (
                    <tr key={idx} className="hover:bg-brand-primary-soft transition-colors">
                      <td className="p-6 font-bold text-brand-primary">{step.code}</td>
                      <td className="p-6 font-bold text-neutral-text">{step.name}</td>
                      <td className="p-6 text-neutral-muted font-medium">{step.duration}</td>
                      <td className="p-6 text-neutral-muted font-medium">{step.cert}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-brand-primary-soft p-8 rounded-2xl border-l-8 border-brand-primary shadow-sm">
              <p className="text-lg font-bold text-neutral-text mb-3">The recommended starting point for every teacher new to EduMeUp is T1 — the Subject Knowledge Diagnostic.</p>
              <p className="text-base text-neutral-muted font-medium">It identifies your specific Cambridge knowledge and pedagogy gaps, and generates a personalised T2/T3/T4 development pathway. You do not have to guess what to study next.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CLASSROOM ENGLISH COMMUNICATION */}
      <section className="py-20 md:py-32 bg-neutral-surface">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 md:p-16 rounded-[3rem] border border-neutral-border shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-teal-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
              <div className="mb-12 border-b border-neutral-border pb-8">
                <span className="inline-flex items-center rounded-full bg-teal-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-teal-700 mb-4">
                  Programme CC
                </span>
                <h2 className="text-4xl font-bold text-neutral-text">Classroom English Communication</h2>
                <p className="text-lg text-neutral-muted mt-2 italic font-medium">[NEW PROGRAMME] Self-paced Moodle course</p>
              </div>

              <div className="grid md:grid-cols-2 gap-16">
                <div className="space-y-10">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-muted mb-4">Format & Certification</h4>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-teal-600 mt-1 shrink-0" />
                        <div>
                          <p className="font-bold text-neutral-text">Flexible Completion</p>
                          <p className="text-sm text-neutral-muted">Self-paced, complete at your own speed.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-teal-600 mt-1 shrink-0" />
                        <div>
                          <p className="font-bold text-neutral-text">Mastery Gate: 80%</p>
                          <p className="text-sm text-neutral-muted">Required for Certificate of Completion.</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-muted mb-4">Who This Is For</h4>
                    <p className="text-base text-neutral-muted leading-relaxed font-medium">Cambridge teachers whose first language is not English — specifically Urdu-speaking and Arabic-speaking teachers. Any teacher who wants to improve precision and confidence.</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-muted">7 Strategic Modules</h4>
                  <div className="space-y-4">
                    {classroomEnglishModules.map((mod) => (
                      <div key={mod.num} className="group p-4 rounded-xl hover:bg-neutral-surface transition-colors border border-transparent hover:border-neutral-border">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-xl bg-teal-100 text-teal-700 font-bold text-sm group-hover:bg-teal-600 group-hover:text-white transition-all shadow-sm">
                            {mod.num}
                          </div>
                          <div>
                            <p className="font-bold text-neutral-text group-hover:text-teal-700 transition-colors">{mod.title}</p>
                            <p className="text-xs text-neutral-muted mt-1 leading-relaxed">{mod.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* T1 DIAGNOSTIC */}
      <section className="py-20 md:py-32 bg-white" id="programmes">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-neutral-surface p-10 md:p-16 rounded-[3rem] border border-neutral-border shadow-2xl relative"
            >
              <div className="mb-12">
                <span className="inline-flex items-center rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-primary mb-4">
                  Programme T1
                </span>
                <h2 className="text-4xl font-bold text-neutral-text">{t1Details.title}</h2>
                <p className="text-sm text-brand-primary font-bold mt-4 uppercase tracking-widest">{t1Details.tagline}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="p-6 bg-white rounded-2xl border border-neutral-border shadow-sm">
                  <p className="text-xs font-bold text-brand-primary uppercase mb-2 tracking-widest">Format</p>
                  <p className="text-sm text-neutral-muted font-medium">AI-powered assessment — online, on demand.</p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-neutral-border shadow-sm">
                  <p className="text-xs font-bold text-brand-primary uppercase mb-2 tracking-widest">Duration</p>
                  <p className="text-sm text-neutral-muted font-medium">60-90 minutes per subject.</p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-neutral-border shadow-sm">
                  <p className="text-xs font-bold text-brand-primary uppercase mb-2 tracking-widest">Certification</p>
                  <p className="text-sm text-neutral-muted font-medium">Personalised CPD Pathway Report.</p>
                </div>
              </div>

              <div className="space-y-10 border-t border-neutral-border pt-12">
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-muted mb-4">What You Learn</h4>
                    <p className="text-base text-neutral-muted leading-relaxed font-medium">{t1Details.whatYouLearn}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-muted mb-4">What You Receive</h4>
                    <p className="text-base text-neutral-muted leading-relaxed font-medium">{t1Details.whatYouReceive}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* T2 WORKSHOP */}
      <section className="py-20 md:py-32 bg-brand-primary-soft">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-brand-primary p-10 md:p-16 rounded-[4rem] text-white shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              <div className="mb-12 text-center">
                <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white mb-4">
                  Programme T2
                </span>
                <h2 className="text-4xl md:text-5xl font-bold">Cambridge Teacher Mastery Workshop</h2>
                <p className="text-sm text-white/80 font-bold mt-4 uppercase tracking-[0.3em]">[HIGHEST CPD VALUE]</p>
              </div>

              <div className="grid md:grid-cols-2 gap-16 mb-16">
                <div className="space-y-6">
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                    <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-2">Key Highlights</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-sm font-medium">
                        <CheckCircle2 className="h-4 w-4 text-status-success shrink-0" />
                        7 CPD Hours (Highest Single Award)
                      </li>
                      <li className="flex items-center gap-3 text-sm font-medium">
                        <CheckCircle2 className="h-4 w-4 text-status-success shrink-0" />
                        Mastery Gate: 88%
                      </li>
                      <li className="flex items-center gap-3 text-sm font-medium">
                        <CheckCircle2 className="h-4 w-4 text-status-success shrink-0" />
                        CCTE Certification
                      </li>
                    </ul>
                  </div>
                  <p className="text-base text-blue-100/70 font-medium leading-relaxed">
                    The CTMW is the most impactful single-day training on the EduMeUp pathway. It bridges the gap between subject knowledge and examiner-standard instruction.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-white uppercase tracking-widest">Intensive Modules</h4>
                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
                    {t2Modules.map((mod) => (
                      <div key={mod.num} className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                        <p className="font-bold text-white text-sm">{mod.num}. {mod.title}</p>
                        <p className="text-xs text-blue-100/60 mt-1">{mod.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row gap-12">
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">The CCTE Certificate confirms:</h4>
                  <ul className="grid grid-cols-1 gap-3">
                    {[
                      "Assessment architecture competency",
                      "Retention lesson design skills",
                      "Examination strategy teaching",
                      "Academic culture management",
                      "AI tool integration capability"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm font-medium">
                        <Award className="h-4 w-4 text-white" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Practical tools included:</h4>
                  <ul className="grid grid-cols-1 gap-3">
                    {[
                      "3-week lesson improvement plan",
                      "Retrieval practice openers",
                      "Command word taxonomy",
                      "Mark-loss pattern analysis",
                      "Retention lesson templates"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm font-medium">
                        <CheckCircle2 className="h-4 w-4 text-status-success" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* T6 AI TOOLS */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-20">
              <span className="inline-flex items-center rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-primary mb-4">
                Programme T6
              </span>
              <h2 className="text-4xl md:text-6xl font-bold text-neutral-text tracking-tighter">
                AI Teaching <span className="text-brand-primary">Ecosystem</span>
              </h2>
              <p className="text-lg text-neutral-muted mt-6 font-medium italic">Available after T2 completion — tools unlock progressively as you grow</p>
            </div>

            <div className="space-y-12">
              {tools.map((tool) => (
                <motion.div
                  key={tool.num}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-neutral-surface p-10 rounded-[2.5rem] border border-neutral-border shadow-xl hover:shadow-2xl transition-all relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-brand-primary/10 transition-all" />
                  <div className="flex flex-col md:flex-row gap-10">
                    <div className="flex-shrink-0">
                      <div className="h-16 w-16 flex items-center justify-center rounded-[1.25rem] bg-brand-primary text-white font-bold text-xl shadow-lg">
                        {tool.num}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-brand-primary mb-4">{tool.title}</h3>
                      <p className="text-base text-neutral-text leading-relaxed font-medium mb-8">{tool.desc}</p>
                      <div className="p-6 bg-white rounded-2xl border border-brand-primary-soft shadow-inner">
                        <p className="text-xs font-bold text-brand-primary mb-2 uppercase tracking-[0.2em]">Why It Matters:</p>
                        <p className="text-sm text-neutral-muted italic font-medium leading-relaxed">{tool.why}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RESEARCH FOUNDATION */}
      <section className="py-20 md:py-32 bg-neutral-surface">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-20">
              <span className="inline-flex items-center rounded-full bg-brand-navy/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-navy mb-4">
                The Evidence
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-text tracking-tight">
                Grounded in <span className="text-brand-primary">Educational Research</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-1 gap-10">
              {[
                { author: "Hattie (2009)", title: "Visible Learning", desc: "Teacher quality is the single most powerful in-school factor affecting student achievement. The effect size of teacher expertise is d=0.49." },
                { author: "Shulman (1986)", title: "Pedagogical Content Knowledge", desc: "Knowing how to translate subject expertise into student examination performance is the key differentiator for results." },
                { author: "Darling-Hammond (2017)", title: "Effective CPD", desc: "CPD that produces lasting change must be sustained, content-specific, and connected to classroom application." }
              ].map((item, i) => (
                <div key={i} className="bg-white p-10 rounded-[2.5rem] border-l-[12px] border-brand-primary shadow-xl">
                  <p className="text-xs font-bold text-brand-primary mb-2 uppercase tracking-widest">{item.author}</p>
                  <h3 className="text-2xl font-bold text-neutral-text mb-4">{item.title}</h3>
                  <p className="text-base text-neutral-muted leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 md:py-40 bg-white relative overflow-hidden border-t border-neutral-border">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-[120px]" />
        <div className="container-custom text-center relative z-10">
          <h2 className="text-5xl md:text-8xl text-neutral-text font-bold leading-tight mb-8 tracking-tighter">
            Find Your <br/><span className="text-brand-primary">Starting Point.</span>
          </h2>
          <p className="text-xl text-neutral-muted max-w-2xl mx-auto mb-16 font-medium leading-relaxed">
            The T1 diagnostic identifies your specific gaps and generates your personalised pathway. No guesswork, just mastery.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <Link href="/diagnostic?role=teacher">
              <Button className="h-16 px-12 rounded-[1.5rem] bg-brand-primary text-white font-bold text-xl hover:bg-brand-primary-dark shadow-2xl transition-all transform hover:scale-105">
                Take the T1 Diagnostic <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="h-16 px-12 rounded-[1.5rem] border-2 border-brand-primary text-brand-primary font-bold text-xl hover:bg-brand-primary/5 shadow-xl transition-all transform hover:scale-105">
                Training Your School Team?
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </Layout>
  );
}
