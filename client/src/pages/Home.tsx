import { useEffect } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { PageSidebar } from "@/components/PageSidebar";

const trust = [
  "80% Mastery Gate on Every Course",
  "H5P Interactive - No Passive Video",
  "Free Diagnostic to Start",
  "Certified Cambridge Tutors Available",
];

const stats = [
  { n: "91%", t: "O-Level Pass Rate" },
  { n: "47%", t: "Achieve A or A*" },
  { n: "75%+", t: "Long-Term Retention" },
  { n: "85%+", t: "Savings vs Tuition Costs" },
];

const paths = [
  { title: "PATH 1 Chapter Courses", desc: "Buy specific chapters from any subject. One-time payment.", price: "From $6 / chapter", cta: "Browse Chapters", href: "/all-programs#chapter" },
  { title: "PATH 2 Subject Courses", desc: "One or two complete O-Level subjects. One-time payment.", price: "From $120 / subject / year", cta: "Browse Subjects", href: "/olevel-subjects" },
  { title: "PATH 3 Subscription", desc: "Four or all subjects. Best value for full O-Level prep.", price: "From $25 / month", cta: "See Plans", href: "/pricing#subscription" },
];

const aiCards = [
  ["AI Diagnostic Engine", "Pinpoints exact knowledge gaps before teaching begins - so every student gets a personalised learning path, not a generic course."],
  ["Instant Written Feedback", "Specially trained AI evaluates written responses immediately - giving students the feedback they need at the moment they need it, not days later."],
  ["Smart Content Recommendation", "The platform recommends the right exercises and resources for each student's current level - automatically, in real time."],
  ["Predictive Risk Alerts", "AI identifies students at risk of falling behind - before it becomes critical - so tutors and parents can intervene early."],
  ["Lesson Planning Support", "AI-powered tools (T6) reduce teacher lesson preparation time by up to 70% - aligned to the latest Cambridge syllabus."],
  ["Progress Intelligence", "Live dashboard data on mastery completion, test scores, and learning trends - for students, parents, and teachers simultaneously."],
];

const sidebarGroups = [
  {
    title: "LEARN",
    links: [
      { href: "#mastery-model", label: "8-Step Model" },
      { href: "#differentiators", label: "Differentiators" },
      { href: "#all-programmes", label: "All Programmes" },
    ],
  },
  {
    title: "CAMBRIDGE",
    links: [
      { href: "#international-fit", label: "International Fit" },
      { href: "#research-basis", label: "Research Basis" },
      { href: "#ai-support", label: "Al Support" },
    ],
  },
  {
    title: "WHO IT'S FOR",
    links: [
      { href: "#for-students", label: "Students" },
      { href: "#for-parents", label: "Parents" },
      { href: "#for-teachers", label: "Teachers" },
      { href: "#for-schools", label: "Schools" },
    ],
  },
];

export default function Home() {

  useEffect(() => {
    const prev = document.title;
    document.title = "EduMeUp - Cambridge IGCSE & O-Level Mastery Learning Platform";

    const setMeta = (key: "name" | "property", value: string, content: string) => {
      let el = document.head.querySelector(`meta[${key}="${value}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(key, value);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
      return el;
    };

    const descriptionMeta = setMeta("name", "description", "EduMeUp replaces passive video with interactive H5P mastery learning for Cambridge IGCSE and O-Level students. Free diagnostic. AI-powered. Certified tutors. Global access.");
    const ogTitleMeta = setMeta("property", "og:title", "EduMeUp - Cambridge Mastery Learning Platform");
    const ogDescMeta = setMeta("property", "og:description", "Interactive Cambridge O-Level and IGCSE mastery learning. Free diagnostic. AI-powered. Certified tutors. Global access from $6 per chapter.");
    const ogImageMeta = setMeta("property", "og:image", "https://edume.up/og-homepage-1200x630.jpg");
    const ogUrlMeta = setMeta("property", "og:url", "https://edume.up/");

    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = "https://edume.up/";

    return () => {
      document.title = prev;
      descriptionMeta.remove();
      ogTitleMeta.remove();
      ogDescMeta.remove();
      ogImageMeta.remove();
      ogUrlMeta.remove();
    };
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-white font-sans text-slate-700">
        <div className="flex flex-col xl:flex-row items-start">
          <PageSidebar title="On This Page" quote="Start here - it is free" links={sidebarGroups.flatMap(g => g.links)} />

          <main className="flex-1 min-w-0">
          <section id="hero" className="min-h-[620px] bg-brand-primary border-b-[6px] border-brand-primary p-6 md:p-12 lg:px-[60px] lg:pb-[60px] relative overflow-hidden">
            <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_minmax(320px,0.66fr)] gap-7 md:gap-10 items-center">
                <div>
                  <h1 className="text-white text-4xl md:text-5xl leading-[1.1] mb-4 font-bold">The World’s No.1 Cambridge Education Ecosystem from Grade 6 to OLevel/IGCSE</h1>
                  <p className="text-white/90 text-base md:text-lg leading-[1.7] max-w-[760px] mb-6">EduMeUp replaces passive video with interactive mastery learning - so students do not just watch Cambridge content, they understand it, retain it, and apply it under exam conditions.</p>
                  <div className="flex gap-3 flex-wrap mb-6">
                    <a href="/diagnostics" className="no-underline rounded-lg px-6 py-3 text-base font-bold inline-block bg-white text-brand-primary">Start Free Diagnostic</a>
                    <a href="/all-programs" className="no-underline rounded-lg px-6 py-3 text-base font-bold inline-block border-2 border-white/85 text-white">Explore Courses</a>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 border border-white/20 rounded-xl overflow-hidden bg-black/15">
                    {trust.map((t, i) => (
                      <div key={t} className={`text-white text-sm md:text-base px-3 py-2.5 ${i > 0 ? 'sm:border-l border-t sm:border-t-0 border-white/15' : ''}`}>
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
                <motion.div 
                  className="relative min-h-[480px] rounded-[28px] p-[18px] bg-white/5 shadow-2xl overflow-hidden" 
                  aria-hidden="true" 
                  initial={{ opacity: 0, y: 18 }} 
                  animate={{ opacity: 1, y: [0, -10, 0] }} 
                  transition={{ 
                    opacity: { duration: 0.7, delay: 0.15 },
                    y: { repeat: Infinity, duration: 5, ease: "easeInOut" }
                  }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(35,102,201,0.18),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(79,134,224,0.16),transparent_35%),radial-gradient(circle_at_20%_20%,rgba(255,255,255,.14),transparent_36%),linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.03))]" />
                  
                  <div className="flex items-center justify-between gap-3 text-white mb-3 relative z-10">
                    <div>
                      <div className="text-[11px] tracking-[2px] uppercase font-bold text-blue-100">Mastery Cycle</div>
                      <div className="text-base font-bold">Diagnose, repair, master, retain.</div>
                    </div>
                    <div className="text-[11px] font-bold text-slate-900 bg-blue-100 rounded-full px-2.5 py-1.5">Animated SVG</div>
                  </div>

                  <svg viewBox="0 0 420 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Animated mastery cycle visual">
                    <defs>
                      <linearGradient id="cycleRing" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#dbe4ef" />
                        <stop offset="50%" stopColor="#2E75B6" />
                        <stop offset="100%" stopColor="#2366c9" />
                      </linearGradient>
                      <radialGradient id="cycleGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                        <stop offset="45%" stopColor="#f8faff" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#2366c9" stopOpacity="0" />
                      </radialGradient>
                    </defs>

                    <rect x="10" y="10" width="400" height="360" rx="26" fill="rgba(255,255,255,0.04)" />
                    <motion.circle cx="210" cy="190" r="118" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" strokeDasharray="4 10" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 24, ease: "linear" }} style={{ transformOrigin: "210px 190px" }} />
                    <motion.circle cx="210" cy="190" r="92" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 16, ease: "linear" }} style={{ transformOrigin: "210px 190px" }} />
                    <circle cx="210" cy="190" r="58" fill="url(#cycleGlow)" opacity="0.85" />
                    <circle cx="210" cy="190" r="28" fill="#fff" fillOpacity="0.94" />
                    <circle cx="210" cy="190" r="15" fill="#2366c9" />

                    <motion.g animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }} style={{ transformOrigin: "210px 190px" }}>
                      <circle cx="210" cy="72" r="12" fill="url(#cycleRing)" />
                      <circle cx="328" cy="190" r="12" fill="url(#cycleRing)" />
                      <circle cx="210" cy="308" r="12" fill="url(#cycleRing)" />
                      <circle cx="92" cy="190" r="12" fill="url(#cycleRing)" />
                    </motion.g>

                    <path d="M210 72c65 0 118 53 118 118" fill="none" stroke="rgba(191,219,254,0.55)" strokeWidth="8" strokeLinecap="round" strokeDasharray="8 18" />
                    <path d="M328 190c0 65-53 118-118 118" fill="none" stroke="rgba(46,117,182,0.55)" strokeWidth="8" strokeLinecap="round" strokeDasharray="8 18" />
                    <path d="M210 308c-65 0-118-53-118-118" fill="none" stroke="rgba(35,102,201,0.55)" strokeWidth="8" strokeLinecap="round" strokeDasharray="8 18" />
                    <path d="M92 190c0-65 53-118 118-118" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="8" strokeLinecap="round" strokeDasharray="8 18" />

                    <g>
                      <rect x="168" y="28" width="84" height="34" rx="17" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.18)" />
                      <text x="210" y="49" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">Diagnose</text>
                    </g>
                    <g>
                      <rect x="280" y="174" width="94" height="34" rx="17" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.18)" />
                      <text x="327" y="195" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">Repair</text>
                    </g>
                    <g>
                      <rect x="166" y="326" width="88" height="34" rx="17" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.18)" />
                      <text x="210" y="347" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">Master</text>
                    </g>
                    <g>
                      <rect x="32" y="174" width="92" height="34" rx="17" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.18)" />
                      <text x="78" y="195" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">Retain</text>
                    </g>

                    <motion.circle cx="210" cy="190" r="170" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="1 14" animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "210px 190px" }} />
                  </svg>

                  <div className="grid grid-cols-3 gap-2.5 mt-3 relative z-10">
                    <div className="bg-white/10 border border-white/12 rounded-2xl p-2.5 px-3 text-white">
                      <span className="block text-[10px] uppercase tracking-[1.8px] text-blue-100 mb-1">Step 1</span>
                      <span className="block text-sm font-bold">Identify gaps</span>
                    </div>
                    <div className="bg-white/10 border border-white/12 rounded-2xl p-2.5 px-3 text-white">
                      <span className="block text-[10px] uppercase tracking-[1.8px] text-blue-100 mb-1">Step 2</span>
                      <span className="block text-sm font-bold">Target practice</span>
                    </div>
                    <div className="bg-white/10 border border-white/12 rounded-2xl p-2.5 px-3 text-white">
                      <span className="block text-[10px] uppercase tracking-[1.8px] text-blue-100 mb-1">Step 3</span>
                      <span className="block text-sm font-bold">Prove mastery</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </section>

          <section id="stats" className="bg-blue-50/50 p-8 md:p-[60px] md:pt-[34px] md:pb-[26px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
              {stats.map((s) => (
                <div className="bg-white border border-slate-200 rounded-xl text-center p-5 md:p-3" key={s.t}>
                  <div className="text-brand-primary text-4xl font-bold leading-none">{s.n}</div>
                  <div className="text-slate-900 text-sm font-bold mt-2">{s.t}</div>
                  <div className="text-brand-primary text-[11px] italic mt-1.5">Designed to Achieve*</div>
                </div>
              ))}
            </div>
            <div className="text-slate-500 text-[13px] italic font-medium">*Designed to Achieve - These figures represent EduMeUp&apos;s design targets and intended outcomes. Independent verification in progress.</div>
          </section>

          <section id="purchase-paths" className="p-8 md:p-[60px] bg-white">
            <div id="all-programmes" className="scroll-mt-20" />
            <h2 className="text-center text-3xl font-bold text-slate-900 mb-8 md:mb-4">How Would You Like to Learn?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {paths.map((p) => (
                <div className="bg-white border border-slate-200 rounded-xl p-5 md:p-4 text-sm" key={p.title}>
                  <h3 className="font-bold text-slate-900 mb-1.5">{p.title}</h3>
                  <p className="text-slate-500 mb-2 leading-relaxed">{p.desc}</p>
                  <div className="text-xl font-bold text-slate-900 mb-2">{p.price}</div>
                  <a className="text-slate-900 no-underline font-bold text-sm hover:text-brand-primary transition-colors" href={p.href}>{p.cta}</a>
                </div>
              ))}
            </div>
            <div className="border border-brand-primary rounded-xl text-center p-3 text-[14px] font-medium text-slate-700">Not sure where to start? <a href="/diagnostics" className="text-brand-primary no-underline font-bold">Take the free diagnostic first</a></div>
          </section>

          <section id="for-students" className="p-8 md:p-[60px] bg-brand-primary text-white">
            <div className="text-[13px] tracking-[2px] uppercase text-blue-100 font-bold mb-2.5">FOR STUDENTS</div>
            <h2 className="text-white text-3xl font-bold mb-6">Master Every Topic. Retain It Longer. Perform Under Pressure.</h2>
            <div className="grid grid-cols-1 md:grid-cols-[1.45fr_0.55fr] gap-5 items-start">
              <div>
                <ul className="list-none p-0 m-0 space-y-2">
                  <li className="text-white/95 text-lg leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-white/40">H5P interactive content on every topic - no passive video. You engage, answer, and master before moving on.</li>
                  <li className="text-white/95 text-lg leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-white/40">Free diagnostic tells you exactly which subjects and chapters to focus on - before you spend anything.</li>
                  <li className="text-white/95 text-lg leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-white/40">80% mastery gate on every topic - you cannot move forward until you have genuinely understood the content.</li>
                  <li className="text-white/95 text-lg leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-white/40">AI Study Advisor guides you through gaps in real time - not after the exam.</li>
                  <li className="text-white/95 text-lg leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-white/40">Spaced retrieval scheduling ensures you retain what you learn - not just for the test but for the actual Cambridge exam.</li>
                  <li className="text-white/95 text-lg leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-white/40">Cambridge O-Level, IGCSE, Pre-O-Level, and A-Level subjects - all on one platform.</li>
                </ul>
                <a href="/for-students" className="border border-white/75 text-white no-underline px-4 py-2.5 rounded-lg inline-block mt-4 font-bold transition-colors hover:bg-white/10">Explore Student Courses</a>
              </div>
              <div className="bg-white rounded-xl p-3 shadow-lg" aria-hidden="true">
                <svg viewBox="0 0 420 280" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto"><rect x="10" y="10" width="400" height="260" rx="12" fill="#eef2f7"/><rect x="30" y="34" width="95" height="210" rx="8" fill="#4f86e0"/><rect x="138" y="34" width="252" height="40" rx="8" fill="#dbe4ef"/><rect x="138" y="84" width="120" height="72" rx="8" fill="#2366c9"/><rect x="270" y="84" width="120" height="72" rx="8" fill="#2E75B6"/></svg>
              </div>
            </div>
          </section>

          <section id="for-parents" className="p-8 md:p-[60px] bg-blue-50/50">
            <div className="text-[13px] tracking-[2px] uppercase text-brand-primary font-bold mb-2.5">FOR PARENTS</div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Know Exactly Where Your Child Stands. Always.</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-slate-200 rounded-xl p-4 text-sm"><h3 className="font-bold text-slate-900 mb-2 text-sm">Parent Dashboard</h3><p className="text-slate-500 leading-relaxed mb-0">Your dedicated dashboard shows your child&apos;s mastery progress, topics completed, and diagnostic results - updated after every session.</p></div>
              <div className="bg-white border border-slate-200 rounded-xl p-4 text-sm"><h3 className="font-bold text-slate-900 mb-2 text-sm">Secure Payments</h3><p className="text-slate-500 leading-relaxed mb-0">All tutoring fees are paid securely to EduMeUp - never directly to any tutor. Your money is always protected.</p></div>
              <div className="bg-white border border-slate-200 rounded-xl p-4 text-sm"><h3 className="font-bold text-slate-900 mb-2 text-sm">Progress Reports</h3><p className="text-slate-500 leading-relaxed mb-0">Monthly performance reports - issued by the EduMeUp Academic Team - give you a clear, professional record of your child&apos;s progress.</p></div>
            </div>
          </section>

          <section id="for-teachers" className="p-8 md:p-[60px] bg-white">
            <div className="text-[13px] tracking-[2px] uppercase text-brand-primary font-bold mb-2.5">FOR TEACHERS</div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6 border-l-4 border-brand-primary pl-3">Train. Certify. Teach. Earn.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="bg-white border border-slate-200 rounded-xl p-4 text-sm"><h3 className="font-bold text-slate-900 mb-2 text-sm">School &amp; Institution Teachers</h3><p className="text-slate-500 leading-relaxed mb-0">Structured CPD pathway (T1-T6) · CCTE Certificate · 7 CPD hours per workshop · AI teaching tools · Cambridge examiner insight · Ready-made resources</p></div>
              <div className="bg-white border border-slate-200 rounded-xl p-4 text-sm"><h3 className="font-bold text-slate-900 mb-2 text-sm">Independent &amp; Self-Employed Teachers</h3><p className="text-slate-500 leading-relaxed mb-0">Earn in USD · Global online students · Physical sessions in major cities · Curriculum provided · Platform admin handled · First-mover priority placement</p></div>
            </div>
          </section>

          <section id="for-schools" className="p-8 md:p-[60px] bg-brand-primary text-white">
            <div className="text-[13px] tracking-[2px] uppercase text-blue-100 font-bold mb-2.5">FOR SCHOOLS</div>
            <h2 className="text-white text-3xl font-bold mb-6">Cambridge Excellence for Every Classroom.</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-slate-200 rounded-xl p-4 text-sm text-slate-700"><h3 className="font-bold text-slate-900 mb-2 text-sm">Teacher CPD</h3><p className="text-slate-500 leading-relaxed mb-0">T1-T6 training pathway for all teaching staff. CCTE certification. Measurable outcomes.</p></div>
              <div className="bg-white border border-slate-200 rounded-xl p-4 text-sm text-slate-700"><h3 className="font-bold text-slate-900 mb-2 text-sm">Student Enrolment</h3><p className="text-slate-500 leading-relaxed mb-0">Enrol entire classes on EduMeUp&apos;s O-Level and Pre-O-Level programmes at institutional rates.</p></div>
              <div className="bg-white border border-slate-200 rounded-xl p-4 text-sm text-slate-700"><h3 className="font-bold text-slate-900 mb-2 text-sm">School Reports</h3><p className="text-slate-500 leading-relaxed mb-0">Class-level diagnostic reports and individual student performance reports - for leadership and teachers.</p></div>
              <div className="bg-white border border-slate-200 rounded-xl p-4 text-sm text-slate-700"><h3 className="font-bold text-slate-900 mb-2 text-sm">Consultancy</h3><p className="text-slate-500 leading-relaxed mb-0">Cambridge curriculum implementation guidance delivered by certified Cambridge professionals.</p></div>
            </div>
          </section>

          <section id="mastery-model" className="p-12 md:p-[80px] bg-blue-50/50">
            <div id="differentiators" className="scroll-mt-20" />
            <div id="international-fit" className="scroll-mt-20" />
            <div id="research-basis" className="scroll-mt-20" />
            <div className="text-[13px] tracking-[2px] uppercase text-brand-primary font-bold mb-2.5">HOW EDUME UP WORKS</div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Six Stages. One Goal: Mastery.</h2>
            <div className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-[940px] mb-5">EduMeUp replaces the content-delivery model with a complete 6-stage mastery cycle. Every course, every topic, every student follows the same proven path.</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white border border-slate-200 rounded-xl p-4 text-center relative group">
                <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold mx-auto mb-2.5">1</div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5 uppercase tracking-wide">DIAGNOSE</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-0">AI diagnostic identifies exact knowledge gaps before a single lesson begins</p>
                <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 text-brand-primary text-xl font-bold z-10">→</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-4 text-center relative group">
                <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold mx-auto mb-2.5">2</div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5 uppercase tracking-wide">REPAIR</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-0">Targeted H5P interactive content addresses each identified gap systematically</p>
                <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 text-brand-primary text-xl font-bold z-10">→</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-4 text-center relative group">
                <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold mx-auto mb-2.5">3</div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5 uppercase tracking-wide">MASTER</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-0">Student achieves 80% mastery gate on every topic before advancing</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-4 text-center relative group">
                <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold mx-auto mb-2.5">4</div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5 uppercase tracking-wide">VERIFY</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-0">Cambridge-style practice questions test the student&apos;s ability to apply - not just recall</p>
                <div className="hidden lg:block absolute -left-3.5 top-1/2 -translate-y-1/2 text-brand-primary text-xl font-bold z-10">↩</div>
                <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 text-brand-primary text-xl font-bold z-10">→</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-4 text-center relative group">
                <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold mx-auto mb-2.5">5</div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5 uppercase tracking-wide">RETAIN</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-0">Spaced retrieval scheduling ensures long-term retention - not just exam-night cramming</p>
                <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 text-brand-primary text-xl font-bold z-10">→</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
                <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold mx-auto mb-2.5">6</div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5 uppercase tracking-wide">GROW INDEPENDENT</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-0">Student develops the self-learning skills to tackle unseen questions and exam variations independently</p>
              </div>
            </div>
            <div className="mt-4"><a className="text-brand-primary no-underline font-bold text-[14px] hover:text-blue-700 transition-colors" href="/how-it-works">How EduMeUp Works</a></div>
          </section>

          <section id="ai-advantage" className="p-8 md:p-[60px] bg-white">
            <div id="ai-support" className="scroll-mt-20" />
            <div className="text-[13px] tracking-[2px] uppercase text-brand-primary font-bold mb-2.5">POWERED BY AI</div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">AI That Teaches, Not Just Tracks.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {aiCards.map(([title, desc]) => (
                <div className="bg-white border border-slate-200 border-t-4 border-t-brand-primary rounded-xl p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg" key={title}>
                  <h3 className="font-bold text-slate-900 mb-2 text-sm">{title}</h3>
                  <p className="text-slate-500 leading-relaxed mb-0 text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="tutoring" className="p-8 md:p-[60px] bg-brand-primary text-white">
            <div className="text-[13px] tracking-[2px] uppercase text-blue-100 font-bold mb-2.5">PERSONALISED TUTORING</div>
            <h2 className="text-white text-3xl font-bold mb-6">The Right Tutor. The Right Subject. Matched for You.</h2>
            <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-5 md:gap-7 items-start">
              <div>
                <ul className="list-none p-0 m-0 space-y-2">
                  <li className="text-white/95 text-lg leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-white/40">All fees paid securely to EduMeUp - never directly to the tutor. Parents are fully protected.</li>
                  <li className="text-white/95 text-lg leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-white/40">Every EduMeUp tutor passes a rigorous subject certification test. No unverified tutors - ever.</li>
                  <li className="text-white/95 text-lg leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-white/40">Notes, worksheets, and online tests are included in every tutoring plan - at no extra cost.</li>
                </ul>
                <div className="flex gap-3 flex-wrap mt-4">
                  <a href="/tutoring" className="no-underline rounded-lg px-4 py-2.5 text-sm font-bold inline-block bg-white text-brand-primary shadow-sm">Find a Tutor</a>
                  <a href="/for-teachers" className="no-underline rounded-lg px-4 py-2.5 text-sm font-bold inline-block border border-white/75 text-white transition-colors hover:bg-white/10">Become a Tutor</a>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="bg-white border border-slate-200 rounded-xl p-4 text-sm text-slate-700">
                  <h3 className="font-bold text-slate-900 mb-2 text-sm">1-to-1 Tutoring (TB2)</h3>
                  <p className="text-slate-500 leading-relaxed mb-0">Starter: from $70/month<br />Progress: from $100/month<br />Intensive: from $160/month<br />Online (worldwide) or physical (major cities)<br />+ $40/month for in-person sessions</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-4 text-sm text-slate-700">
                  <h3 className="font-bold text-slate-900 mb-2 text-sm">Group Booking (TB1)</h3>
                  <p className="text-slate-500 leading-relaxed mb-0">2-7 students share one tutor<br />Organiser pays 70% of standard rate<br />All other members pay 80%<br />Best value for study groups</p>
                </div>
              </div>
            </div>
          </section>

          <section id="free-resources" className="p-8 md:p-[60px] bg-blue-50/50">
            <div className="text-[13px] tracking-[2px] uppercase text-brand-primary font-bold mb-2.5">FREE RESOURCES</div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Explore Before You Enrol. Samples and Past Papers - Free.</h2>
            <div className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-[980px] mb-5">A taste of EduMeUp content quality - available to everyone, no registration required. Complete workbooks and full resources are available as paid products. Free Resources (Samples) only.</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-slate-200 rounded-xl p-4 text-sm text-slate-700"><h3 className="font-bold text-slate-900 mb-1.5 text-sm">Workbook Samples</h3><p className="text-slate-500 leading-relaxed mb-2.5">Sample extracts from our O-Level workbooks. One extract per subject - enough to see the quality.</p><a className="text-brand-primary no-underline font-bold text-sm hover:text-blue-700 transition-colors" href="/free-resources">View sample</a></div>
              <div className="bg-white border border-slate-200 rounded-xl p-4 text-sm text-slate-700"><h3 className="font-bold text-slate-900 mb-1.5 text-sm">Selected Mind Maps</h3><p className="text-slate-500 leading-relaxed mb-2.5">Selected subject mind maps covering key O-Level topics. A taste of our full paid sets.</p><a className="text-brand-primary no-underline font-bold text-sm hover:text-blue-700 transition-colors" href="/free-resources">View sample</a></div>
              <div className="bg-white border border-slate-200 rounded-xl p-4 text-sm text-slate-700"><h3 className="font-bold text-slate-900 mb-1.5 text-sm">Unsolved Past Papers</h3><p className="text-slate-500 leading-relaxed mb-2.5">Cambridge past papers without solutions. Solutions accessed on platform after enrolment.</p><a className="text-brand-primary no-underline font-bold text-sm hover:text-blue-700 transition-colors" href="/free-resources">View papers</a></div>
              <div className="bg-white border border-slate-200 rounded-xl p-4 text-sm text-slate-700"><h3 className="font-bold text-slate-900 mb-1.5 text-sm">Sample Diagnostics</h3><p className="text-slate-500 leading-relaxed mb-2.5">Sample questions from our subject diagnostic - so you know what to expect before you start.</p><a className="text-brand-primary no-underline font-bold text-sm hover:text-blue-700 transition-colors" href="/free-resources">Try sample</a></div>
            </div>
          </section>

          <section id="trust" className="p-8 md:p-[60px] bg-white">
            <h2 className="text-center text-3xl font-bold text-slate-900 mb-8 md:mb-12">Trusted by Students, Parents, Teachers and Schools Worldwide.</h2>
            <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-4 md:gap-7 items-start">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white border border-slate-200 border-l-4 border-l-brand-primary rounded-xl p-3.5 text-sm text-slate-700"><p className="mb-2 leading-relaxed italic text-slate-500">&quot;The diagnostic told us exactly which topics my son needed to work on. Within two months his Physics score improved by 22 marks.&quot;</p><span className="text-[11px] font-bold text-slate-900">Parent, O-Level student (placeholder)</span></div>
                <div className="bg-white border border-slate-200 border-l-4 border-l-brand-primary rounded-xl p-3.5 text-sm text-slate-700"><p className="mb-2 leading-relaxed italic text-slate-500">&quot;The CTMW workshop was the most relevant Cambridge teacher training I have attended. The CCTE certificate is already on my CV.&quot;</p><span className="text-[11px] font-bold text-slate-900">Teacher, Cambridge IGCSE school (placeholder)</span></div>
                <div className="bg-white border border-slate-200 border-l-4 border-l-brand-primary rounded-xl p-3.5 text-sm text-slate-700"><p className="mb-2 leading-relaxed italic text-slate-500">&quot;EduMeUp&apos;s class diagnostic showed us that 60% of our Grade 10 class had a gap in Organic Chemistry. We addressed it directly - before the exam.&quot;</p><span className="text-[11px] font-bold text-slate-900">Head of Science, partner school (placeholder)</span></div>
              </div>
              <div className="bg-blue-50/50 border border-slate-200 rounded-xl p-5 text-sm text-slate-700">
                <h3 className="font-bold text-slate-900 mb-4 text-base">Platform Stats and Partnerships</h3>
                <div className="text-brand-primary text-3xl font-bold leading-none mt-1.5">91%*</div><div className="text-slate-400 text-sm font-bold mb-3 mt-1">O-Level Pass Rate</div>
                <div className="text-brand-primary text-3xl font-bold leading-none mt-1.5">47%</div><div className="text-slate-400 text-sm font-bold mb-4 mt-1">Achieve A or A*</div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="border border-slate-200 bg-white rounded-lg text-center p-2 text-sm text-slate-700 font-medium">Partner School</div><div className="border border-slate-200 bg-white rounded-lg text-center p-2 text-sm text-slate-700 font-medium">Institution</div><div className="border border-slate-200 bg-white rounded-lg text-center p-2 text-sm text-slate-700 font-medium">Tutor Network</div><div className="border border-slate-200 bg-white rounded-lg text-center p-2 text-sm text-slate-700 font-medium">Academic Team</div>
                  <div className="text-xs text-slate-500 mt-3">*Designed to Achieve</div>
                </div>
              </div>
            </div>
          </section>

          <section id="final-cta" className="p-12 md:p-[80px] bg-brand-primary text-center text-white">
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">Ready to Begin? The Diagnostic Is Free.</h2>
            <p className="text-white/90 text-lg leading-relaxed max-w-[900px] mx-auto mb-6">Take the free 40-60 minute diagnostic and find out exactly which subjects and topics you need. No commitment. No payment required.</p>
            <p className="mt-2 mb-8 text-white/85 text-[15px] font-medium leading-relaxed">
              Looking for a grade prediction instead of a gap check? <a href="/olevel-readiness-forecast" className="text-blue-100 font-bold underline decoration-blue-100/50 hover:decoration-blue-100 transition-all">View the O-Level Readiness Forecast</a>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-left max-w-5xl mx-auto">
              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-lg text-slate-700"><h3 className="font-bold text-slate-900 mb-1.5 text-base">Take the Free Diagnostic</h3><p className="text-slate-500 text-sm leading-relaxed mb-3">Start with a free 40-60 minute subject diagnostic. Full detailed report. No payment required.</p><a href="/diagnostics" className="text-brand-primary no-underline font-bold text-sm hover:text-blue-700 transition-colors">Start Free Diagnostic</a></div>
              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-lg text-slate-700"><h3 className="font-bold text-slate-900 mb-1.5 text-base">Explore All Courses</h3><p className="text-slate-500 text-sm leading-relaxed mb-3">Browse all Cambridge O-Level, Pre-O-Level, A-Level and Teacher Training courses.</p><a href="/all-programs" className="text-brand-primary no-underline font-bold text-sm hover:text-blue-700 transition-colors">All Courses</a></div>
              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-lg text-slate-700"><h3 className="font-bold text-slate-900 mb-1.5 text-base">Talk to Us</h3><p className="text-slate-500 text-sm leading-relaxed mb-3">Questions about the right plan, scholarship eligibility, or school partnership?</p><a href="https://wa.me/000000000000" className="text-brand-primary no-underline font-bold text-sm hover:text-blue-700 transition-colors">WhatsApp Us</a></div>
            </div>
          </section>
          </main>
        </div>
      </div>
    </Layout>

  );
}

