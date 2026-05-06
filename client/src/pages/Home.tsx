import { useEffect } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";

const styles = `
  .emu-body * { box-sizing:border-box; }
  .emu-body { font-family:'Aeonik', 'Inter', sans-serif; color:#1E3A5F; background:#fff; }
  .emu-page-shell { display:flex; align-items:flex-start; }
  .emu-sidebar { width:230px; flex-shrink:0; position:sticky; top:64px; max-height:calc(100vh - 64px); overflow-y:auto; background:#fff; border-right:1px solid #dbe4ef; padding:20px 14px; }
  .emu-sidebar-diag { background:#2366c9; color:#fff; border-radius:8px; padding:14px; margin-bottom:16px; text-align:center; }
  .emu-sidebar-diag p { font-size:12px; font-weight:700; margin:0 0 8px; color:#fff; }
  .emu-sidebar-diag a { display:block; text-decoration:none; background:#fff; color:#1E3A5F; font-size:11px; font-weight:700; border-radius:5px; padding:7px 10px; }
  .emu-sidebar-label { font-size:10px; letter-spacing:1.4px; text-transform:uppercase; color:#64748b; font-weight:700; margin-bottom:12px; padding-left:10px; }
  .emu-sidebar-group { margin-bottom:14px; }
  .emu-sidebar-group-title { font-size:11px; font-weight:700; color:#1E3A5F; letter-spacing:.8px; text-transform:uppercase; padding:6px 10px; }
  .emu-sidebar-link { display:block; text-decoration:none; font-size:13px; font-weight:600; color:#475569; padding:7px 10px; border-left:3px solid transparent; border-radius:6px; margin-bottom:2px; transition:all .2s ease; }
  .emu-sidebar-link:hover { color:#1E3A5F; border-left-color:#2366c9; background:#eef6ff; }
  .emu-main { flex:1; min-width:0; }
  .emu-label { font-size:12px; letter-spacing:2px; text-transform:uppercase; color:#2366c9; font-weight:700; margin-bottom:10px; }

  .emu-hero { min-height:520px; background:repeating-linear-gradient(-35deg, rgba(255,255,255,.12) 0, rgba(255,255,255,.12) 2px, transparent 2px, transparent 18px), #2366c9; border-bottom:6px solid #2366c9; padding:72px 60px 60px; }
  .emu-hero-grid { display:grid; grid-template-columns:minmax(0, 3fr) minmax(320px, 2fr); gap:28px; align-items:center; }
  .emu-hero h1 { color:#fff; font-size:48px; line-height:1.1; margin:0 0 16px; font-weight:700; }
  .emu-hero p { color:rgba(255,255,255,.9); font-size:17px; line-height:1.7; max-width:760px; margin-bottom:24px; }
  .emu-cta-row { display:flex; gap:12px; flex-wrap:wrap; margin-bottom:22px; }
  .emu-cta { text-decoration:none; border-radius:8px; padding:12px 18px; font-size:16px; font-weight:700; display:inline-block; }
  .emu-cta-primary { background:#fff; color:#2366c9; }
  .emu-cta-secondary { border:2px solid rgba(255,255,255,.85); color:#fff; }
  .emu-hero-trust { display:grid; grid-template-columns:repeat(4,1fr); border:1px solid rgba(255,255,255,.2); border-radius:10px; overflow:hidden; background:rgba(0,0,0,.15); }
  .emu-hero-trust div { color:#fff; font-size:13px; padding:10px 12px; border-left:1px solid rgba(255,255,255,.15); }
  .emu-hero-trust div:first-child { border-left:none; }
  .emu-hero-visual { position:relative; min-height:420px; border-radius:28px; padding:18px; background:radial-gradient(circle at top right, rgba(35,102,201,0.18), transparent 40%), radial-gradient(circle at bottom left, rgba(79,134,224,0.16), transparent 35%), radial-gradient(circle at 20% 20%, rgba(255,255,255,.14), transparent 36%), linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.03)); border:1px solid rgba(255,255,255,.16); box-shadow:0 24px 70px rgba(0,0,0,.18); overflow:hidden; }
  .emu-hero-visual::before { content:""; position:absolute; inset:12px; border-radius:22px; border:1px solid rgba(255,255,255,.08); pointer-events:none; }
  .emu-hero-visual-header { display:flex; align-items:center; justify-content:space-between; gap:12px; color:#fff; margin-bottom:12px; position:relative; z-index:1; }
  .emu-hero-visual-label { font-size:11px; letter-spacing:2px; text-transform:uppercase; font-weight:700; color:#bfdbfe; }
  .emu-hero-visual-title { font-size:16px; font-weight:700; }
  .emu-hero-visual-chip { font-size:11px; font-weight:700; color:#1E3A5F; background:#bfdbfe; border-radius:999px; padding:6px 10px; }
  .emu-hero-visual svg { width:100%; height:auto; display:block; position:relative; z-index:1; }
  .emu-hero-visual-footer { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-top:12px; position:relative; z-index:1; }
  .emu-hero-visual-card { background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.12); border-radius:14px; padding:10px 12px; color:#fff; }
  .emu-hero-visual-card .k { display:block; font-size:10px; text-transform:uppercase; letter-spacing:1.8px; color:#bfdbfe; margin-bottom:4px; }
  .emu-hero-visual-card .v { display:block; font-size:14px; font-weight:700; }
  @keyframes emuFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-6px); }
  }
  @keyframes emuSpin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .emu-float { animation: emuFloat 5s ease-in-out infinite; }
  .emu-spin-slow { transform-origin: 50% 50%; animation: emuSpin 24s linear infinite; }
  .emu-spin-medium { transform-origin: 50% 50%; animation: emuSpin 16s linear infinite reverse; }
  .emu-spin-fast { transform-origin: 50% 50%; animation: emuSpin 10s linear infinite; }

  .emu-stats { background:#eef6ff; padding:34px 60px 26px; }
  .emu-stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:12px; }
  .emu-stat { background:#fff; border:1px solid #dbe4ef; border-radius:10px; text-align:center; padding:18px 12px; }
  .emu-stat .num { color:#2366c9; font-size:36px; font-weight:700; line-height:1; }
  .emu-stat .title { color:#1E3A5F; font-size:14px; font-weight:700; margin-top:8px; }
  .emu-stat .q { color:#2366c9; font-size:11px; font-style:italic; margin-top:5px; }
  .emu-footnote { font-size:12px; font-style:italic; color:#475569; }

  .emu-section { padding:56px 60px; }
  .emu-section h2 { margin:0 0 14px; font-size:28px; font-weight:700; }

  .emu-purchase { background:#fff; }
  .emu-purchase-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:16px; }
  .emu-card { background:#fff; border:1px solid #dbe4ef; border-radius:10px; padding:16px; }
  .emu-card h3 { margin:8px 0 6px; font-size:16px; }
  .emu-card p { margin:0 0 8px; color:#334155; font-size:14px; line-height:1.55; }
  .emu-price { font-size:20px; font-weight:700; margin:6px 0; }
  .emu-link { color:#1E3A5F; text-decoration:none; font-weight:700; font-size:14px; }
  .emu-callout { border:1px solid #2366c9; border-radius:8px; text-align:center; padding:12px; font-size:14px; }
  .emu-callout a { color:#2366c9; text-decoration:none; font-weight:700; }

  .emu-students { background:#2366c9; }
  .emu-students h2 { color:#fff; }
  .emu-students .emu-label { color:#dbeafe; }
  .emu-two-col { display:grid; grid-template-columns:1.45fr .55fr; gap:20px; align-items:start; }
  .emu-bullets { list-style:none; padding:0; margin:0; }
  .emu-bullets li { color:rgba(255,255,255,.92); font-size:14px; line-height:1.65; margin-bottom:8px; padding-left:16px; position:relative; }
  .emu-bullets li::before { content:"•"; position:absolute; left:0; color:#2366c9; }
  .emu-device { background:#fff; border-radius:12px; padding:12px; }
  .emu-device svg { width:100%; }
  .emu-outline-white { border:1px solid rgba(255,255,255,.75); color:#fff; text-decoration:none; padding:10px 14px; border-radius:8px; display:inline-block; margin-top:10px; font-weight:700; }

  .emu-parents { background:#eef6ff; }
  .emu-grid3 { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
  .emu-teachers { background:#fff; }
  .emu-teachers .head { border-left:5px solid #2366c9; padding-left:10px; }
  .emu-grid2 { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
  .emu-schools { background:#2366c9; }
  .emu-schools h2 { color:#fff; }
  .emu-schools .emu-label { color:#dbeafe; }
  .emu-grid4 { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; }

  .emu-cycle { background:#eef6ff; }
  .emu-cycle-sub { color:#334155; font-size:15px; line-height:1.65; max-width:940px; margin-bottom:18px; }
  .emu-cycle-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
  .emu-stage { background:#fff; border:1px solid #dbe4ef; border-radius:12px; padding:14px; position:relative; text-align:center; }
  .emu-stage:not(:last-child)::after { content:"→"; color:#2366c9; font-size:20px; font-weight:700; position:absolute; right:-13px; top:50%; transform:translateY(-50%); }
  .emu-stage:nth-child(3)::after { display:none; }
  .emu-stage:nth-child(4)::after { content:"↩"; left:-11px; right:auto; }
  .emu-num { width:42px; height:42px; border-radius:50%; background:#2366c9; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; margin:0 auto 8px; }
  .emu-stage h3 { font-size:13px; margin:0 0 6px; }
  .emu-stage p { font-size:12px; color:#334155; line-height:1.5; margin:0; }

  .emu-ai { background:#fff; }
  .emu-ai-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
  .emu-ai-card { border:1px solid #dbe4ef; border-top:4px solid #2366c9; border-radius:10px; padding:16px; background:#fff; transition:.2s; }
  .emu-ai-card:hover { transform:translateY(-3px); box-shadow:0 10px 20px rgba(30,58,95,.12); }

  .emu-tutoring { background:#2366c9; }
  .emu-tutoring h2 { color:#fff; }
  .emu-tutoring .emu-label { color:#dbeafe; }
  .emu-tutor-grid { display:grid; grid-template-columns:1.1fr .9fr; gap:16px; }
  .emu-tutor-bullets { list-style:none; padding:0; margin:0; }
  .emu-tutor-bullets li { color:rgba(255,255,255,.92); font-size:14px; line-height:1.65; margin-bottom:8px; padding-left:16px; position:relative; }
  .emu-tutor-bullets li::before { content:"•"; position:absolute; left:0; color:#2366c9; }
  .emu-tutor-cards { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
  .emu-tutor-card { background:#fff; border:1px solid #dbe4ef; border-radius:10px; padding:14px; }
  .emu-tutor-card p { color:#334155; font-size:13px; line-height:1.55; margin:0; }
  .emu-tutor-ctas { display:flex; gap:10px; flex-wrap:wrap; margin-top:10px; }
  .emu-tutor-ctas a { text-decoration:none; border-radius:8px; padding:10px 14px; font-size:14px; font-weight:700; }
  .emu-tutor-ctas a:first-child { background:#fff; color:#2366c9; }
  .emu-tutor-ctas a:last-child { border:1px solid rgba(255,255,255,.75); color:#fff; }

  .emu-free { background:#eef6ff; }
  .emu-free-sub { color:#334155; font-size:15px; line-height:1.65; margin-bottom:18px; max-width:980px; }
  .emu-trust { background:#fff; }
  .emu-trust h2 { text-align:center; }
  .emu-trust-grid { display:grid; grid-template-columns:1.2fr .8fr; gap:16px; }
  .emu-testi { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
  .emu-testi-card { background:#fff; border:1px solid #dbe4ef; border-left:4px solid #2366c9; border-radius:8px; padding:12px; }
  .emu-testi-card p { margin:0 0 8px; color:#334155; font-size:13px; line-height:1.55; font-style:italic; }
  .emu-testi-card span { font-size:12px; font-weight:700; }
  .emu-proof { background:#eef6ff; border:1px solid #dbe4ef; border-radius:10px; padding:14px; }
  .emu-proof .n { color:#2366c9; font-size:28px; font-weight:700; line-height:1; margin-top:6px; }
  .emu-proof .l { font-size:13px; color:#334155; margin-bottom:8px; }
  .emu-logo-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:8px; }
  .emu-logo { border:1px solid #dbe4ef; background:#fff; border-radius:6px; text-align:center; font-size:12px; padding:8px; color:#1E3A5F; }

  .emu-final { background:#2366c9; text-align:center; }
  .emu-final h2 { color:#fff; font-size:32px; }
  .emu-final p { color:rgba(255,255,255,.9); font-size:16px; line-height:1.65; max-width:900px; margin:0 auto 20px; }
  .emu-final .emu-label { color:#dbeafe; }
  .emu-final-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; text-align:left; }
  .emu-final-card { border:1px solid #dbe4ef; background:#fff; border-radius:10px; padding:14px; }
  .emu-final-card p { color:#334155; font-size:13px; line-height:1.55; margin-bottom:10px; }
  .emu-final-card a { color:#2366c9; text-decoration:none; font-weight:700; font-size:13px; }

  @media (max-width:1024px) {
    .emu-page-shell { display:block; }
    .emu-sidebar { display:none; }
    .emu-hero, .emu-stats, .emu-section { padding-left:24px; padding-right:24px; }
    .emu-hero-grid, .emu-two-col, .emu-tutor-grid, .emu-trust-grid { grid-template-columns:1fr; }
    .emu-stats-grid, .emu-cycle-grid, .emu-ai-grid, .emu-grid4, .emu-grid3, .emu-testi { grid-template-columns:1fr 1fr; }
    .emu-tutor-cards, .emu-final-grid { grid-template-columns:1fr; }
    .emu-stage::after { display:none !important; }
  }
  @media (max-width:767px) {
    .emu-hero { min-height:380px; padding-top:44px; }
    .emu-hero h1 { font-size:36px; }
    .emu-hero p { font-size:15px; }
    .emu-hero-trust { grid-template-columns:1fr; }
    .emu-hero-trust div { border-left:none; border-top:1px solid rgba(255,255,255,.15); }
    .emu-hero-trust div:first-child { border-top:none; }
    .emu-stats-grid, .emu-purchase-grid, .emu-grid3, .emu-grid4, .emu-cycle-grid, .emu-ai-grid, .emu-testi { grid-template-columns:1fr; }
    .emu-grid2 { grid-template-columns:1fr; }
  }
`;

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
    const styleEl = document.createElement("style");
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
    return () => {
      styleEl.remove();
    };
  }, []);

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
      <div className="emu-body">
        <div className="emu-page-shell">
          <aside className="emu-sidebar" aria-label="Homepage section navigation">
            <div className="emu-sidebar-diag">
              <p>Start here - it is free</p>
              <a href="/diagnostics">Take Free Diagnostic -&gt;</a>
            </div>
            <p className="emu-sidebar-label">On This Page</p>
            {sidebarGroups.map((group) => (
              <div key={group.title} className="emu-sidebar-group">
                <p className="emu-sidebar-group-title">{group.title}</p>
                {group.links.map((link) => (
                  <a key={link.href} href={link.href} className="emu-sidebar-link">
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </aside>

          <main className="emu-main">
          <section id="hero" className="emu-hero">
            <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="emu-hero-grid">
                <div>
                  <h1>From Content Delivery to Learning Mastery.</h1>
                  <p>EduMeUp replaces passive video with interactive mastery learning - so students do not just watch Cambridge content, they understand it, retain it, and apply it under exam conditions.</p>
                  <div className="emu-cta-row">
                    <a href="/diagnostics" className="emu-cta emu-cta-primary">Start Free Diagnostic</a>
                    <a href="/all-programs" className="emu-cta emu-cta-secondary">Explore Courses</a>
                  </div>
                  <div className="emu-hero-trust">{trust.map((t) => <div key={t}>{t}</div>)}</div>
                </div>
                <motion.div className="emu-hero-visual emu-float" aria-hidden="true" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
                  <div className="emu-hero-visual-header">
                    <div>
                      <div className="emu-hero-visual-label">Mastery Cycle</div>
                      <div className="emu-hero-visual-title">Diagnose, repair, master, retain.</div>
                    </div>
                    <div className="emu-hero-visual-chip">Animated SVG</div>
                  </div>

                  <svg viewBox="0 0 420 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Animated mastery cycle visual">
                    <defs>
                      <linearGradient id="cycleRing" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#bfdbfe" />
                        <stop offset="50%" stopColor="#2E75B6" />
                        <stop offset="100%" stopColor="#2366c9" />
                      </linearGradient>
                      <radialGradient id="cycleGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                        <stop offset="45%" stopColor="#eef6ff" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#2366c9" stopOpacity="0" />
                      </radialGradient>
                    </defs>

                    <rect x="10" y="10" width="400" height="360" rx="26" fill="rgba(255,255,255,0.04)" />
                    <circle cx="210" cy="190" r="118" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" strokeDasharray="4 10" className="emu-spin-slow" />
                    <circle cx="210" cy="190" r="92" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" className="emu-spin-medium" />
                    <circle cx="210" cy="190" r="58" fill="url(#cycleGlow)" opacity="0.85" />
                    <circle cx="210" cy="190" r="28" fill="#fff" fillOpacity="0.94" />
                    <circle cx="210" cy="190" r="15" fill="#2366c9" />

                    <motion.g className="emu-spin-fast" style={{ transformOrigin: "210px 190px" }}>
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

                  <div className="emu-hero-visual-footer">
                    <div className="emu-hero-visual-card">
                      <span className="k">Step 1</span>
                      <span className="v">Identify gaps</span>
                    </div>
                    <div className="emu-hero-visual-card">
                      <span className="k">Step 2</span>
                      <span className="v">Target practice</span>
                    </div>
                    <div className="emu-hero-visual-card">
                      <span className="k">Step 3</span>
                      <span className="v">Prove mastery</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </section>

          <section id="stats" className="emu-stats">
            <div className="emu-stats-grid">
              {stats.map((s) => (
                <div className="emu-stat" key={s.t}>
                  <div className="num">{s.n}</div>
                  <div className="title">{s.t}</div>
                  <div className="q">Designed to Achieve*</div>
                </div>
              ))}
            </div>
            <div className="emu-footnote">*Designed to Achieve - These figures represent EduMeUp&apos;s design targets and intended outcomes. Independent verification in progress.</div>
          </section>

          <section id="purchase-paths" className="emu-section emu-purchase">
            <div id="all-programmes" />
            <h2 style={{ textAlign: "center" }}>How Would You Like to Learn?</h2>
            <div className="emu-purchase-grid">
              {paths.map((p) => (
                <div className="emu-card" key={p.title}>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="emu-price">{p.price}</div>
                  <a className="emu-link" href={p.href}>{p.cta}</a>
                </div>
              ))}
            </div>
            <div className="emu-callout">Not sure where to start? <a href="/diagnostics">Take the free diagnostic first</a></div>
          </section>

          <section id="for-students" className="emu-section emu-students">
            <div className="emu-label">FOR STUDENTS</div>
            <h2>Master Every Topic. Retain It Longer. Perform Under Pressure.</h2>
            <div className="emu-two-col">
              <div>
                <ul className="emu-bullets">
                  <li>H5P interactive content on every topic - no passive video. You engage, answer, and master before moving on.</li>
                  <li>Free diagnostic tells you exactly which subjects and chapters to focus on - before you spend anything.</li>
                  <li>80% mastery gate on every topic - you cannot move forward until you have genuinely understood the content.</li>
                  <li>AI Study Advisor guides you through gaps in real time - not after the exam.</li>
                  <li>Spaced retrieval scheduling ensures you retain what you learn - not just for the test but for the actual Cambridge exam.</li>
                  <li>Cambridge O-Level, IGCSE, Pre-O-Level, and A-Level subjects - all on one platform.</li>
                </ul>
                <a href="/for-students" className="emu-outline-white">Explore Student Courses</a>
              </div>
              <div className="emu-device" aria-hidden="true">
                <svg viewBox="0 0 420 280" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="400" height="260" rx="12" fill="#eef2f7"/><rect x="30" y="34" width="95" height="210" rx="8" fill="#1E3A5F"/><rect x="138" y="34" width="252" height="40" rx="8" fill="#dbe4ef"/><rect x="138" y="84" width="120" height="72" rx="8" fill="#2366c9"/><rect x="270" y="84" width="120" height="72" rx="8" fill="#2E75B6"/></svg>
              </div>
            </div>
          </section>

          <section id="for-parents" className="emu-section emu-parents">
            <div className="emu-label">FOR PARENTS</div>
            <h2>Know Exactly Where Your Child Stands. Always.</h2>
            <div className="emu-grid3">
              <div className="emu-card"><h3>Parent Dashboard</h3><p>Your dedicated dashboard shows your child&apos;s mastery progress, topics completed, and diagnostic results - updated after every session.</p></div>
              <div className="emu-card"><h3>Secure Payments</h3><p>All tutoring fees are paid securely to EduMeUp - never directly to any tutor. Your money is always protected.</p></div>
              <div className="emu-card"><h3>Progress Reports</h3><p>Monthly performance reports - issued by the EduMeUp Academic Team - give you a clear, professional record of your child&apos;s progress.</p></div>
            </div>
          </section>

          <section id="for-teachers" className="emu-section emu-teachers">
            <div className="emu-label">FOR TEACHERS</div>
            <h2 className="head">Train. Certify. Teach. Earn.</h2>
            <div className="emu-grid2">
              <div className="emu-card"><h3>School &amp; Institution Teachers</h3><p>Structured CPD pathway (T1-T6) · CCTE Certificate · 7 CPD hours per workshop · AI teaching tools · Cambridge examiner insight · Ready-made resources</p></div>
              <div className="emu-card"><h3>Independent &amp; Self-Employed Teachers</h3><p>Earn in USD · Global online students · Physical sessions in major cities · Curriculum provided · Platform admin handled · First-mover priority placement</p></div>
            </div>
          </section>

          <section id="for-schools" className="emu-section emu-schools">
            <div className="emu-label">FOR SCHOOLS</div>
            <h2>Cambridge Excellence for Every Classroom.</h2>
            <div className="emu-grid4">
              <div className="emu-card"><h3>Teacher CPD</h3><p>T1-T6 training pathway for all teaching staff. CCTE certification. Measurable outcomes.</p></div>
              <div className="emu-card"><h3>Student Enrolment</h3><p>Enrol entire classes on EduMeUp&apos;s O-Level and Pre-O-Level programmes at institutional rates.</p></div>
              <div className="emu-card"><h3>School Reports</h3><p>Class-level diagnostic reports and individual student performance reports - for leadership and teachers.</p></div>
              <div className="emu-card"><h3>Consultancy</h3><p>Cambridge curriculum implementation guidance delivered by certified Cambridge professionals.</p></div>
            </div>
          </section>

          <section id="mastery-model" className="emu-section emu-cycle">
            <div id="differentiators" />
            <div id="international-fit" />
            <div id="research-basis" />
            <div className="emu-label">HOW EDUME UP WORKS</div>
            <h2>Six Stages. One Goal: Mastery.</h2>
            <div className="emu-cycle-sub">EduMeUp replaces the content-delivery model with a complete 6-stage mastery cycle. Every course, every topic, every student follows the same proven path.</div>
            <div className="emu-cycle-grid">
              <div className="emu-stage"><div className="emu-num">1</div><h3>DIAGNOSE</h3><p>AI diagnostic identifies exact knowledge gaps before a single lesson begins</p></div>
              <div className="emu-stage"><div className="emu-num">2</div><h3>REPAIR</h3><p>Targeted H5P interactive content addresses each identified gap systematically</p></div>
              <div className="emu-stage"><div className="emu-num">3</div><h3>MASTER</h3><p>Student achieves 80% mastery gate on every topic before advancing</p></div>
              <div className="emu-stage"><div className="emu-num">4</div><h3>VERIFY</h3><p>Cambridge-style practice questions test the student&apos;s ability to apply - not just recall</p></div>
              <div className="emu-stage"><div className="emu-num">5</div><h3>RETAIN</h3><p>Spaced retrieval scheduling ensures long-term retention - not just exam-night cramming</p></div>
              <div className="emu-stage"><div className="emu-num">6</div><h3>GROW INDEPENDENT</h3><p>Student develops the self-learning skills to tackle unseen questions and exam variations independently</p></div>
            </div>
            <div style={{ marginTop: 16 }}><a className="emu-link" href="/how-it-works">How EduMeUp Works</a></div>
          </section>

          <section id="ai-advantage" className="emu-section emu-ai">
            <div id="ai-support" />
            <div className="emu-label">POWERED BY AI</div>
            <h2>AI That Teaches, Not Just Tracks.</h2>
            <div className="emu-ai-grid">
              {aiCards.map(([title, desc]) => (
                <div className="emu-ai-card" key={title}><h3>{title}</h3><p>{desc}</p></div>
              ))}
            </div>
          </section>

          <section id="tutoring" className="emu-section emu-tutoring">
            <div className="emu-label">PERSONALISED TUTORING</div>
            <h2>The Right Tutor. The Right Subject. Matched for You.</h2>
            <div className="emu-tutor-grid">
              <div>
                <ul className="emu-tutor-bullets">
                  <li>All fees paid securely to EduMeUp - never directly to the tutor. Parents are fully protected.</li>
                  <li>Every EduMeUp tutor passes a rigorous subject certification test. No unverified tutors - ever.</li>
                  <li>Notes, worksheets, and online tests are included in every tutoring plan - at no extra cost.</li>
                </ul>
                <div className="emu-tutor-ctas"><a href="/tutoring">Find a Tutor</a><a href="/for-teachers">Become a Tutor</a></div>
              </div>
              <div className="emu-tutor-cards">
                <div className="emu-tutor-card"><h3>1-to-1 Tutoring (TB2)</h3><p>Starter: from $70/month<br />Progress: from $100/month<br />Intensive: from $160/month<br />Online (worldwide) or physical (major cities)<br />+ $40/month for in-person sessions</p></div>
                <div className="emu-tutor-card"><h3>Group Booking (TB1)</h3><p>2-7 students share one tutor<br />Organiser pays 70% of standard rate<br />All other members pay 80%<br />Best value for study groups</p></div>
              </div>
            </div>
          </section>

          <section id="free-resources" className="emu-section emu-free">
            <div className="emu-label">FREE RESOURCES</div>
            <h2>Explore Before You Enrol. Samples and Past Papers - Free.</h2>
            <div className="emu-free-sub">A taste of EduMeUp content quality - available to everyone, no registration required. Complete workbooks and full resources are available as paid products. Free Resources (Samples) only.</div>
            <div className="emu-grid4">
              <div className="emu-card"><h3>Workbook Samples</h3><p>Sample extracts from our O-Level workbooks. One extract per subject - enough to see the quality.</p><a className="emu-link" href="/free-resources">View sample</a></div>
              <div className="emu-card"><h3>Selected Mind Maps</h3><p>Selected subject mind maps covering key O-Level topics. A taste of our full paid sets.</p><a className="emu-link" href="/free-resources">View sample</a></div>
              <div className="emu-card"><h3>Unsolved Past Papers</h3><p>Cambridge past papers without solutions. Solutions accessed on platform after enrolment.</p><a className="emu-link" href="/free-resources">View papers</a></div>
              <div className="emu-card"><h3>Sample Diagnostics</h3><p>Sample questions from our subject diagnostic - so you know what to expect before you start.</p><a className="emu-link" href="/free-resources">Try sample</a></div>
            </div>
          </section>

          <section id="trust" className="emu-section emu-trust">
            <h2>Trusted by Students, Parents, Teachers and Schools Worldwide.</h2>
            <div className="emu-trust-grid">
              <div className="emu-testi">
                <div className="emu-testi-card"><p>&quot;The diagnostic told us exactly which topics my son needed to work on. Within two months his Physics score improved by 22 marks.&quot;</p><span>Parent, O-Level student (placeholder - replace with verified testimonial)</span></div>
                <div className="emu-testi-card"><p>&quot;The CTMW workshop was the most relevant Cambridge teacher training I have attended. The CCTE certificate is already on my CV.&quot;</p><span>Teacher, Cambridge IGCSE school (placeholder - replace with verified testimonial)</span></div>
                <div className="emu-testi-card"><p>&quot;EduMeUp&apos;s class diagnostic showed us that 60% of our Grade 10 class had a gap in Organic Chemistry. We addressed it directly - before the exam.&quot;</p><span>Head of Science, partner school (placeholder - replace with verified testimonial)</span></div>
              </div>
              <div className="emu-proof">
                <h3>Platform Stats and Partnerships</h3>
                <div className="n">91%</div><div className="l">O-Level Pass Rate</div>
                <div className="n">47%</div><div className="l">Achieve A or A*</div>
                <div className="logo-grid emu-logo-grid">
                  <div className="emu-logo">Partner School</div><div className="emu-logo">Institution</div><div className="emu-logo">Tutor Network</div><div className="emu-logo">Academic Team</div>
                </div>
              </div>
            </div>
          </section>

          <section id="final-cta" className="emu-section emu-final">
            <h2>Ready to Begin? The Diagnostic Is Free.</h2>
            <p>Take the free 40-60 minute diagnostic and find out exactly which subjects and topics you need. No commitment. No payment required.</p>
            <div className="emu-final-grid">
              <div className="emu-final-card"><h3>Take the Free Diagnostic</h3><p>Start with a free 40-60 minute subject diagnostic. Full detailed report. No payment required.</p><a href="/diagnostics">Start Free Diagnostic</a></div>
              <div className="emu-final-card"><h3>Explore All Courses</h3><p>Browse all Cambridge O-Level, Pre-O-Level, A-Level and Teacher Training courses.</p><a href="/all-programs">All Courses</a></div>
              <div className="emu-final-card"><h3>Talk to Us</h3><p>Questions about the right plan, scholarship eligibility, or school partnership?</p><a href="https://wa.me/000000000000">WhatsApp Us</a></div>
            </div>
          </section>
          </main>
        </div>
      </div>
    </Layout>
  );
}
