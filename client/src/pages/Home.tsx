import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";

// ── CSS injected once ──────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');

  :root {
    --primary: #2366c9;
    --primary-dark: #1a4fa0;
    --primary-darker: #0B3C5D;
    --primary-light: #EFF6FF;
    --primary-border: #BFDBFE;
    --orange: #F97316;
    --green: #16A34A;
    --teal: #0D9488;
    --purple: #7C3AED;
    --amber: #D97706;
    --red: #DC2626;
    --lgrey: #F5F7FA;
    --mgrey: #E2E8F0;
    --dgrey: #475569;
    --text: #1E293B;
    --body: #334155;
    --sidebar-w: 220px;
    --nav-h: 64px;
  }

  .emu-body * { margin:0; padding:0; box-sizing:border-box; }
  .emu-body { font-family:'DM Sans',sans-serif; font-size:16px; color:var(--text); background:#fff; }

  /* MOCK BANNER */
  .emu-mock-banner { background:linear-gradient(90deg,var(--primary) 0%,var(--primary-darker) 100%); color:#fff; text-align:center; padding:12px; font-size:13px; font-weight:600; letter-spacing:.3px; }
  .emu-mock-banner span { background:rgba(255,255,255,.15); border-radius:4px; padding:2px 8px; margin-left:8px; font-size:11px; }

  /* PAGE WRAPPER */
  .emu-page-wrapper { display:flex; padding-top:calc(var(--nav-h) + 36px); }

  /* SIDEBAR */
  .emu-sidebar { width:var(--sidebar-w); flex-shrink:0; position:sticky; top:var(--nav-h); height:calc(100vh - var(--nav-h)); overflow-y:auto; background:#fff; border-right:1px solid var(--mgrey); padding:24px 16px; }
  .emu-sidebar-label { font-size:10px; font-weight:700; letter-spacing:1.5px; color:var(--dgrey); text-transform:uppercase; margin-bottom:12px; padding-left:12px; }
  .emu-sidebar-group { margin-bottom:20px; }
  .emu-sidebar-group-title { font-size:11px; font-weight:600; color:var(--primary); text-transform:uppercase; letter-spacing:.8px; padding:6px 12px; margin-bottom:4px; }
  .emu-sidebar-link { display:block; padding:7px 12px; font-size:13px; font-weight:500; color:var(--dgrey); text-decoration:none; border-radius:6px; border-left:3px solid transparent; transition:all .2s; margin-bottom:2px; cursor:pointer; }
  .emu-sidebar-link:hover, .emu-sidebar-link.active { color:var(--primary); background:var(--primary-light); border-left-color:var(--primary); }
  .emu-sidebar-diag { background:var(--primary); color:#ffff; border-radius:8px; padding:14px; margin-bottom:20px; text-align:center; }
  .emu-sidebar-diag p { font-size:12px; color:#ffff;font-weight:600; margin-bottom:8px; line-height:1.4; }
  .emu-sidebar-diag button { background:#fff; color:var(--primary); font-size:11px; font-weight:700; padding:7px 14px; border:none; border-radius:5px; cursor:pointer; width:100%; }

  /* MAIN */
  .emu-main { flex:1; min-width:0; }

  /* HERO */
  .emu-hero { background:linear-gradient(135deg,var(--primary-darker) 0%,var(--primary) 50%,#2e75d4 100%); padding:72px 60px 60px; position:relative; overflow:hidden; }
  .emu-hero::before { content:''; position:absolute; top:-100px; right:-100px; width:500px; height:500px; background:radial-gradient(circle,rgba(255,255,255,.08) 0%,transparent 70%); border-radius:50%; }
  .emu-hero-eyebrow { font-size:12px; font-weight:600; letter-spacing:2px; text-transform:uppercase; color:#facc15; margin-bottom:16px; }
  .emu-hero h1 { font-family:'Sora',sans-serif; font-size:48px; font-weight:800; color:#fff; line-height:1.1; margin-bottom:20px; max-width:800px; letter-spacing:-1px; }
  .emu-hero h1 em { color:#facc15; font-style:normal; }
  .emu-hero-sub { font-size:18px; color:rgba(255,255,255,.80); margin-bottom:32px; font-weight:400; max-width:600px; }
  .emu-hero-bullets { display:grid; grid-template-columns:1fr 1fr; gap:10px 32px; margin-bottom:36px; max-width:720px; }
  .emu-hero-bullet { display:flex; align-items:flex-start; gap:10px; font-size:14px; color:rgba(255,255,255,.88); font-weight:500; }
  .emu-hero-bullet-icon { color:#4ade80; font-size:15px; margin-top:1px; flex-shrink:0; font-weight:700; }
  .emu-hero-ctas { display:flex; gap:14px; align-items:center; margin-bottom:48px; flex-wrap:wrap; }
  .emu-btn-primary { background:white; color:var(--primary); font-family:'DM Sans',sans-serif; font-weight:700; font-size:15px; padding:14px 28px; border-radius:8px; border:none; cursor:pointer; transition:all .2s; }
  .emu-btn-primary:hover { background:#f0f6ff; transform:translateY(-1px); box-shadow:0 8px 24px rgba(0,0,0,.15); }
  .emu-btn-secondary { background:transparent; color:#fff; font-family:'DM Sans',sans-serif; font-weight:600; font-size:15px; padding:13px 26px; border-radius:8px; border:2px solid rgba(255,255,255,.45); cursor:pointer; transition:all .2s; }
  .emu-btn-secondary:hover { border-color:#fff; background:rgba(255,255,255,.1); }
  .emu-hero-microcopy { font-size:12px; color:rgba(255,255,255,.5); margin-top:-8px; }

  /* STAT CARDS */
  .emu-stat-row { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; max-width:800px; margin-top:40px; }
  .emu-stat-card { background:rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.18); border-radius:12px; padding:20px 16px; text-align:center; backdrop-filter:blur(8px); border-top:3px solid; }
  .emu-stat-card:nth-child(1) { border-top-color:#4ade80; }
  .emu-stat-card:nth-child(2) { border-top-color:#facc15; }
  .emu-stat-card:nth-child(3) { border-top-color:#38bdf8; }
  .emu-stat-card:nth-child(4) { border-top-color:#c084fc; }
  .emu-stat-num { font-family:'Sora',sans-serif; font-size:36px; font-weight:800; color:#fff; line-height:1; margin-bottom:6px; }
  .emu-stat-label { font-size:13px; font-weight:600; color:rgba(255,255,255,.9); margin-bottom:4px; }
  .emu-stat-sub { font-size:11px; color:rgba(255,255,255,.55); line-height:1.3; }

  /* STAKEHOLDER STRIP */
  .emu-stakeholder-strip { background:#fff; border-bottom:1px solid var(--mgrey); padding:16px 60px; display:flex; gap:12px; align-items:center; position:sticky; top:var(--nav-h); z-index:100; }
  .emu-strip-label { font-size:13px; font-weight:600; color:var(--dgrey); margin-right:8px; white-space:nowrap; }
  .emu-strip-btn { padding:9px 20px; border-radius:24px; border:2px solid var(--mgrey); font-size:13px; font-weight:600; cursor:pointer; transition:all .2s; background:#fff; color:var(--dgrey); }
  .emu-strip-btn:hover, .emu-strip-btn.active { border-color:var(--primary); background:var(--primary); color:#fff; }

  /* SECTIONS */
  .emu-section { padding:64px 60px; }
  .emu-section-eyebrow { font-size:11px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:var(--primary); margin-bottom:10px; }
  .emu-section-title { font-family:'Sora',sans-serif; font-size:34px; font-weight:700; color:#0f172a; margin-bottom:14px; line-height:1.2; letter-spacing:-.5px; }
  .emu-section-sub { font-size:17px; color:var(--body); max-width:680px; line-height:1.65; margin-bottom:40px; }

  /* DIAGNOSTIC BANNER */
  .emu-diag-banner { background:linear-gradient(135deg,var(--primary) 0%,var(--primary-dark) 100%); padding:36px 60px; display:flex; align-items:center; justify-content:space-between; gap:24px; }
  .emu-diag-banner h2 { font-family:'Sora',sans-serif; font-size:26px; font-weight:700; color:#fff; margin-bottom:8px; }
  .emu-diag-banner p { font-size:15px; color:rgba(255,255,255,.85); max-width:580px; line-height:1.55; }
  .emu-btn-white { background:#fff; color:var(--primary); font-family:'DM Sans',sans-serif; font-weight:700; font-size:14px; padding:13px 26px; border-radius:8px; border:none; cursor:pointer; white-space:nowrap; }
  .emu-btn-white:hover { background:#f0f6ff; }

  /* PROBLEM */
  .emu-problem-grid { display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-bottom:36px; }
  .emu-problem-col { border-radius:12px; padding:28px; }
  .emu-problem-col.bad { background:#FFF0F0; border:1px solid #FECACA; border-top:4px solid var(--red); }
  .emu-problem-col.good { background:var(--primary-light); border:1px solid var(--primary-border); border-top:4px solid var(--primary); }
  .emu-problem-col h3 { font-family:'Sora',sans-serif; font-size:17px; font-weight:700; margin-bottom:16px; }
  .emu-problem-col.bad h3 { color:var(--red); }
  .emu-problem-col.good h3 { color:var(--primary); }
  .emu-problem-item { display:flex; gap:10px; margin-bottom:10px; font-size:14px; color:var(--body); align-items:flex-start; }
  .emu-problem-result-bad { margin-top:14px; font-size:13px; font-weight:700; color:var(--red); }
  .emu-problem-result-good { margin-top:14px; font-size:13px; font-weight:700; color:var(--primary); }
  .emu-retention-table { width:100%; border-collapse:collapse; border-radius:10px; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,.06); }
  .emu-retention-table th { padding:14px 20px; font-family:'Sora',sans-serif; font-size:14px; font-weight:700; }
  .emu-retention-table th:first-child { background:#FFF0F0; color:var(--red); border-right:2px solid #fff; }
  .emu-retention-table th:last-child { background:var(--primary-light); color:var(--primary); }
  .emu-retention-table td { padding:11px 20px; font-size:13px; color:var(--body); border-top:1px solid var(--mgrey); }
  .emu-retention-table td:first-child { background:#fffafb; border-right:2px solid #fff; }
  .emu-retention-table td:last-child { background:#f0f7ff; }
  .emu-retention-cite { font-size:11px; color:var(--dgrey); font-style:italic; margin-top:12px; text-align:right; }

  /* 8-STEP MODEL */
  .emu-steps-flow { display:grid; grid-template-columns:repeat(4,1fr); gap:0; margin-bottom:12px; }
  .emu-step-row2 { display:grid; grid-template-columns:repeat(4,1fr); gap:0; }
  .emu-step-card { padding:24px 20px; position:relative; }
  .emu-step-card::after { content:'▶'; position:absolute; right:-8px; top:50%; transform:translateY(-50%); font-size:16px; color:rgba(255,255,255,.4); z-index:1; }
  .emu-step-card:last-child::after { display:none; }
  .emu-step-num { font-family:'Sora',sans-serif; font-size:11px; font-weight:700; letter-spacing:1px; text-transform:uppercase; opacity:.7; margin-bottom:6px; color:#fff; }
  .emu-step-title { font-family:'Sora',sans-serif; font-size:16px; font-weight:700; color:#fff; margin-bottom:8px; }
  .emu-step-desc { font-size:12px; color:rgba(255,255,255,.82); line-height:1.5; margin-bottom:8px; }
  .emu-step-ref { font-size:10px; color:rgba(255,255,255,.55); font-style:italic; }

  /* DIFFERENTIATORS */
  .emu-diff-table { width:100%; border-collapse:collapse; border-radius:12px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,.07); }
  .emu-diff-table tr:nth-child(odd) td { background:#fff; }
  .emu-diff-table tr:nth-child(even) td { background:var(--lgrey); }
  .emu-diff-icon-cell { width:60px; text-align:center; font-size:24px; padding:20px 16px; vertical-align:middle; }
  .emu-diff-main { padding:20px 24px; vertical-align:top; border-left:3px solid; }
  .emu-diff-main h4 { font-family:'Sora',sans-serif; font-size:16px; font-weight:700; color:#0f172a; margin-bottom:6px; }
  .emu-diff-main p { font-size:13px; color:var(--body); line-height:1.55; }
  .emu-diff-research { padding:20px 24px; vertical-align:top; background:#EFF6FF !important; border-left:3px solid var(--primary) !important; width:42%; }
  .emu-diff-research-label { font-size:10px; font-weight:700; letter-spacing:1px; color:var(--primary); text-transform:uppercase; margin-bottom:6px; }
  .emu-diff-research p { font-size:12px; color:var(--body); line-height:1.5; font-style:italic; }

  /* PROGRAMMES */
  .emu-prog-level { margin-bottom:36px; }
  .emu-prog-level-label { display:flex; align-items:center; gap:12px; margin-bottom:16px; }
  .emu-prog-level-badge { color:#fff; font-size:11px; font-weight:700; padding:4px 12px; border-radius:20px; letter-spacing:.5px; }
  .emu-prog-level-title { font-family:'Sora',sans-serif; font-size:20px; font-weight:700; color:#0f172a; }
  .emu-prog-scroll { display:flex; gap:16px; overflow-x:auto; padding-bottom:8px; scrollbar-width:thin; }
  .emu-prog-card { flex-shrink:0; width:220px; background:#fff; border-radius:12px; border:1px solid var(--mgrey); border-top:4px solid; padding:20px; transition:transform .2s,box-shadow .2s; cursor:pointer; }
  .emu-prog-card:hover { transform:translateY(-3px); box-shadow:0 8px 24px rgba(35,102,201,.12); }
  .emu-prog-card-icon { font-size:28px; margin-bottom:10px; }
  .emu-prog-card h4 { font-family:'Sora',sans-serif; font-size:15px; font-weight:700; color:#0f172a; margin-bottom:6px; }
  .emu-prog-level-tag { font-size:11px; color:var(--dgrey); margin-bottom:10px; font-style:italic; }
  .emu-prog-card p { font-size:12px; color:var(--body); line-height:1.5; margin-bottom:12px; }
  .emu-prog-card-link { font-size:12px; font-weight:700; color:var(--primary); text-decoration:none; }
  .emu-english-highlight { background:linear-gradient(135deg,var(--primary-light) 0%,#f0fdf4 100%); border:1px solid var(--primary-border); border-radius:14px; padding:28px 32px; margin-bottom:20px; }
  .emu-english-highlight h3 { font-family:'Sora',sans-serif; font-size:20px; font-weight:700; color:var(--primary); margin-bottom:10px; }
  .emu-english-highlight p { font-size:14px; color:var(--body); line-height:1.65; margin-bottom:16px; }
  .emu-english-pathway { display:flex; gap:0; align-items:center; flex-wrap:wrap; }
  .emu-eng-step { background:var(--primary); color:#fff; font-size:12px; font-weight:600; padding:8px 14px; border-radius:6px; white-space:nowrap; }
  .emu-eng-arrow { color:var(--dgrey); font-size:18px; margin:0 6px; }

  /* INTERNATIONAL */
  .emu-intl-grid { display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-bottom:32px; }
  .emu-intl-card { background:#fff; border-radius:12px; padding:24px 28px; border:1px solid var(--mgrey); border-left:5px solid; }
  .emu-intl-card h3 { font-family:'Sora',sans-serif; font-size:18px; font-weight:700; color:#0f172a; margin-bottom:12px; }
  .emu-intl-card p { font-size:14px; color:var(--body); line-height:1.65; margin-bottom:14px; }
  .emu-intl-tag-row { display:flex; flex-wrap:wrap; gap:8px; }
  .emu-intl-tag { background:var(--primary-light); color:var(--primary); font-size:12px; font-weight:600; padding:5px 12px; border-radius:20px; border:1px solid var(--primary-border); }

  /* RESEARCH STRIP */
  .emu-research-strip { display:grid; grid-template-columns:repeat(6,1fr); gap:0; border-radius:12px; overflow:hidden; }
  .emu-research-tile { padding:28px 16px; text-align:center; }
  .emu-research-stat { font-family:'Sora',sans-serif; font-size:32px; font-weight:800; color:#fff; margin-bottom:6px; }
  .emu-research-label { font-size:12px; color:rgba(255,255,255,.85); line-height:1.4; margin-bottom:6px; font-weight:500; }
  .emu-research-src { font-size:10px; color:rgba(255,255,255,.55); font-style:italic; }

  /* AI CARDS */
  .emu-ai-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
  .emu-ai-card { background:#fff; border-radius:12px; padding:24px; border:1px solid var(--mgrey); transition:all .2s; border-top:4px solid transparent; }
  .emu-ai-card:hover { border-top-color:var(--primary); transform:translateY(-3px); box-shadow:0 8px 24px rgba(35,102,201,.1); }
  .emu-ai-card-icon { font-size:32px; margin-bottom:12px; }
  .emu-ai-card h3 { font-family:'Sora',sans-serif; font-size:16px; font-weight:700; color:#0f172a; margin-bottom:8px; }
  .emu-ai-card p { font-size:13px; color:var(--body); line-height:1.55; margin-bottom:10px; }
  .emu-ai-card-ref { font-size:11px; color:var(--dgrey); font-style:italic; }

  /* STAKEHOLDER CARDS */
  .emu-stakeholder-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; }
  .emu-sth-card { border-radius:12px; padding:28px 22px; border:1px solid var(--mgrey); border-top:5px solid; background:#fff; }
  .emu-sth-icon { font-size:36px; margin-bottom:12px; }
  .emu-sth-card h3 { font-family:'Sora',sans-serif; font-size:18px; font-weight:700; margin-bottom:16px; }
  .emu-sth-benefit { display:flex; gap:8px; font-size:13px; color:var(--body); margin-bottom:8px; align-items:flex-start; }
  .emu-sth-cta { margin-top:16px; font-size:13px; font-weight:700; color:var(--primary); display:block; text-decoration:none; cursor:pointer; }

  /* COMPARE TABLE */
  .emu-compare-table { width:100%; border-collapse:collapse; border-radius:12px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,.07); }
  .emu-compare-table th { padding:14px 20px; font-family:'Sora',sans-serif; font-size:14px; font-weight:700; }
  .emu-compare-table th:first-child { background:var(--lgrey); color:var(--dgrey); text-align:left; }
  .emu-compare-table th:nth-child(2) { background:#FFF0F0; color:var(--red); }
  .emu-compare-table th:last-child { background:var(--primary); color:#fff; }
  .emu-compare-table td { padding:12px 20px; font-size:13px; color:var(--body); border-top:1px solid var(--mgrey); }
  .emu-compare-table td:first-child { font-weight:600; color:#0f172a; background:var(--lgrey); }
  .emu-compare-table td:nth-child(2) { background:#fffafb; }
  .emu-compare-table td:last-child { background:var(--primary-light); color:var(--primary); font-weight:600; }

  /* TESTIMONIALS */
  .emu-testi-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-bottom:32px; }
  .emu-testi-card { background:#fff; border-radius:12px; padding:28px; border:1px solid var(--mgrey); position:relative; }
  .emu-testi-quote { font-size:64px; color:var(--primary); opacity:.08; font-family:Georgia,serif; position:absolute; top:12px; left:20px; line-height:1; }
  .emu-testi-text { font-size:14px; color:var(--body); line-height:1.65; font-style:italic; margin-bottom:16px; padding-top:8px; }
  .emu-testi-author { font-size:13px; font-weight:700; color:var(--primary); }
  .emu-testi-role { font-size:12px; color:var(--dgrey); }
  .emu-trust-row { display:flex; gap:24px; justify-content:center; flex-wrap:wrap; margin-top:8px; }
  .emu-trust-badge { display:flex; align-items:center; gap:8px; font-size:13px; font-weight:600; color:var(--primary); background:var(--primary-light); border-radius:24px; padding:8px 18px; border:1px solid var(--primary-border); }

  /* FREE RESOURCES */
  .emu-res-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-bottom:28px; }
  .emu-res-card { background:#fff; border-radius:12px; padding:24px; border:1px solid var(--mgrey); border-top:4px solid; }
  .emu-res-card-icon { font-size:32px; margin-bottom:12px; }
  .emu-res-card h3 { font-family:'Sora',sans-serif; font-size:16px; font-weight:700; color:#0f172a; margin-bottom:6px; }
  .emu-res-card p { font-size:13px; color:var(--body); line-height:1.55; margin-bottom:12px; }
  .emu-res-card-link { font-size:13px; font-weight:700; color:var(--primary); text-decoration:none; }

  /* BOTTOM CTA */
  .emu-bottom-cta { background:linear-gradient(135deg,var(--primary-darker) 0%,var(--primary) 100%); padding:64px 60px; text-align:center; }
  .emu-bottom-cta h2 { font-family:'Sora',sans-serif; font-size:36px; font-weight:800; color:#fff; margin-bottom:14px; letter-spacing:-.5px; }
  .emu-bottom-cta p { font-size:17px; color:rgba(255,255,255,.75); max-width:580px; margin:0 auto 32px; line-height:1.65; }
  .emu-cta-group { display:flex; gap:16px; justify-content:center; }

  /* FOOTER */
  .emu-footer { background:var(--primary-darker); padding:56px 60px 24px; }
  .emu-footer-grid { display:grid; grid-template-columns:1.4fr 1fr 1fr 1fr; gap:48px; margin-bottom:48px; }
  .emu-footer-col h4 { font-family:'Sora',sans-serif; font-size:14px; font-weight:700; color:#fff; margin-bottom:16px; }
  .emu-footer-col p, .emu-footer-col a { font-size:13px; color:rgba(255,255,255,.55); text-decoration:none; display:block; margin-bottom:8px; }
  .emu-footer-col a:hover { color:rgba(255,255,255,.85); }
  .emu-footer-logo { font-family:'Sora',sans-serif; font-size:22px; font-weight:800; color:#fff; margin-bottom:10px; }
  .emu-footer-logo span { color:#facc15; }
  .emu-footer-divider { border-top:1px solid rgba(255,255,255,.08); padding-top:20px; display:flex; justify-content:space-between; align-items:center; }
  .emu-footer-copy { font-size:12px; color:rgba(255,255,255,.35); }
`;

// ── DATA ───────────────────────────────────────────────────────────────────────
const heroBullets = [
  "Science-backed: Diagnostic → Remedy → Interactive → Practice → Mock",
  "Moving students from confusion to confidence in every subject",
  "Converting passive study → 50%+ active, long-term mastery",
  "Overcoming the brain's natural rapid-forgetting problem",
  "Enhancing self-learning skills and learner independence",
  "International curriculum mastery for conceptual & unseen exams",
  "Empowering all stakeholders — students, teachers, schools, parents",
  "Overcoming language barriers and reducing tutor dependency",
];

const statCards = [
  { num: "75%+", label: "Retention Rate", sub: "vs passive study (Cepeda et al., 2006)" },
  { num: "55%", label: "Failure Rate Drop", sub: "active vs passive learning (Freeman et al., 2014)" },
  { num: "10–15×", label: "Retention Advantage", sub: "practice by doing (Dunlosky et al., 2013)" },
  { num: "2.0", label: "Effect Size — Mastery", sub: "highest in educational psychology (Bloom, 1984)" },
];

const steps1 = [
  { num: "Step 1", title: "Diagnostic Analysis", desc: "AI pinpoints exact conceptual gaps before teaching begins", ref: "Black & Wiliam (1998)", bg: "var(--primary)", br: "10px 0 0 10px" },
  { num: "Step 2", title: "Remedial Concept Repair", desc: "Targeted micro-lessons rebuild foundational understanding", ref: "Bloom (1984)", bg: "#1d59b8", br: "0" },
  { num: "Step 3", title: "Interactive Learning", desc: "H5P active modules — no passive video consumption", ref: "Freeman et al. (2014)", bg: "#1a4fa0", br: "0" },
  { num: "Step 4", title: "Past Paper Practice", desc: "Authentic Cambridge past questions from Day 1", ref: "Bartlett (2009)", bg: "#163f85", br: "0 10px 10px 0" },
];
const steps2 = [
  { num: "Step 5", title: "Retrieval Practice", desc: "Scheduled recall sessions defeat the forgetting curve", ref: "Roediger & Karpicke (2006)", bg: "#0e3d80", br: "10px 0 0 10px" },
  { num: "Step 6", title: "Formative Assessment", desc: "Continuous check-ins catch gaps before they compound", ref: "Black & Wiliam (1998)", bg: "#0B3C5D", br: "0" },
  { num: "Step 7", title: "Corrective Study", desc: "AI-driven personalised feedback restores mastery", ref: "Hattie & Timperley (2007)", bg: "#0d3255", br: "0" },
  { num: "Step 8", title: "Mock Exam Simulation", desc: "Full Cambridge-format simulations build stamina & strategy", ref: "Bjork & Bjork (2011)", bg: "#0a2844", br: "0 10px 10px 0" },
];

const differentiators = [
  { icon: "🎯", title: "Diagnostic-First — Always", desc: "No student begins a course without first taking an AI-powered diagnostic. We assess where you are before we teach you anything — so no time is wasted on content you already know.", research: "Mastery Learning (Bloom, 1984): students taught after diagnostic placement outperform non-diagnosed peers by effect size 2.0 — the highest recorded in educational psychology.", iconBg: "var(--primary)", borderColor: "var(--teal)", topBr: "10px 0 0 0", botBr: "" },
  { icon: "🖥", title: "Practice by Doing — No Passive Video", desc: "Every module requires student action: H5P drag-and-drop, structured writing, calculations with instant feedback. There are no lecture videos. Learning happens through doing.", research: "Freeman et al. (2014): active learning produces 55% lower failure rates than passive instruction. Dunlosky et al. (2013): practice by doing improves retention 10–15x over re-reading.", iconBg: "var(--primary-dark)", borderColor: "var(--primary)", topBr: "", botBr: "" },
  { icon: "🖼", title: "Dual Coding — Text and Visuals Together", desc: "Every concept is taught with both a written explanation and an explanatory diagram. Not decorative images — visual representations that directly illustrate the concept being taught.", research: "Mayer (2009): students who receive explanatory text and visuals learn 89% more than text alone. Paivio (1986): dual coding activates two separate memory systems simultaneously.", iconBg: "#163f85", borderColor: "var(--purple)", topBr: "", botBr: "" },
  { icon: "🔁", title: "Spaced Retrieval — Not Cramming", desc: "Topic quizzes placed at the end of every module interrupt the forgetting curve. Cumulative quizzes resurface earlier topics at scientifically optimal intervals — built into the course structure.", research: "Roediger & Karpicke (2006): 52% retention advantage for retrieval over restudy at one month. Cepeda et al. (2006): spaced learning produces 10–30% higher retention than massed study.", iconBg: "var(--primary-darker)", borderColor: "var(--green)", topBr: "", botBr: "" },
  { icon: "📊", title: "Feedback That Teaches — Not Just Marks", desc: "Every wrong answer is followed by the correct answer, why the student's answer was wrong, and what the examiner expects. No score-and-move-on. Feedback is the learning mechanism.", research: "Hattie (2009): feedback has an effect size of 0.73 — placing it in the top 10 most powerful influences on learning across 800+ meta-analyses covering 250 million students.", iconBg: "#0d3066", borderColor: "var(--primary-dark)", topBr: "", botBr: "" },
  { icon: "🔬", title: "Cambridge Examiner Intelligence", desc: "EduMeUp's content is informed by Cambridge examiner insights — identifying the exact errors that cost students marks year after year. Our AI Tutor delivers AO-standard feedback, not generic answers.", research: "Sweller (1988): worked example instruction + expert insight outperforms problem-solving alone by effect size 0.57. Perkins & Salomon (1989): surface pattern-matching fails under novel exam conditions.", iconBg: "#0a2244", borderColor: "var(--red)", topBr: "", botBr: "0 0 0 10px" },
];

const lowerSecondaryCards = [
  { icon: "🗣", title: "English Language", level: "Grade 6–8", desc: "Vocabulary, comprehension, writing mechanics across all three grade levels. Foundation for the full English pathway.", color: "var(--teal)" },
  { icon: "📐", title: "Mathematics", level: "Grade 6–8", desc: "Linear equations, geometry, probability, mensuration — systematic foundation before O-Level entry.", color: "var(--primary)" },
  { icon: "🔬", title: "Physics", level: "Grade 6–8", desc: "Forces, energy, circuits, waves — conceptual foundations built systematically before O-Level.", color: "var(--primary-dark)" },
  { icon: "⚗", title: "Chemistry", level: "Grade 6–8", desc: "Matter, atomic structure, acids/bases, chemical equations — strong foundation for O-Level Chemistry.", color: "var(--primary-darker)" },
  { icon: "🧬", title: "Biology", level: "Grade 6–8", desc: "Cells, photosynthesis, genetics, immunity — complete three-grade life science foundation.", color: "var(--green)" },
];

const bridgeCards = [
  { icon: "🌉", title: "English Bridge", level: "Pre-O-Level", desc: "ESL1 → ESL2 → Bridge B1+→B2. Structured English pathway to exam readiness.", color: "var(--primary)" },
  { icon: "🌉", title: "Mathematics Bridge", level: "Pre-O-Level", desc: "40 modules covering the full pre-O-Level mathematics foundation. 80% mastery gates.", color: "var(--primary-dark)" },
  { icon: "🌉", title: "Physics Bridge", level: "Pre-O-Level", desc: "14 modules building the conceptual physics foundation for O-Level entry.", color: "var(--primary-darker)" },
  { icon: "🌉", title: "Chemistry Bridge", level: "Pre-O-Level", desc: "18 modules — vetted content, H5P retrieval at every stage, factually verified.", color: "var(--teal)" },
  { icon: "🌉", title: "Economics Bridge", level: "Pre-O-Level", desc: "Core economic concepts and analysis skills before O-Level Economics begins.", color: "var(--amber)" },
];

const researchTiles = [
  { stat: "89%", label: "more learning: text + visuals vs text alone", src: "Mayer, 2009", bg: "var(--primary)" },
  { stat: "10–15×", label: "retention: practice by doing vs re-reading", src: "Dunlosky et al., 2013", bg: "var(--primary-dark)" },
  { stat: "55%", label: "lower failure rate: active vs passive", src: "Freeman et al., 2014", bg: "#163f85" },
  { stat: "0.73", label: "effect size of feedback — top 10 influences", src: "Hattie, 2009", bg: "var(--primary-darker)" },
  { stat: "52%", label: "retention advantage at one month: retrieval vs restudy", src: "Roediger & Karpicke, 2006", bg: "#0d3066" },
  { stat: "2.0", label: "effect size of mastery learning — highest in edu. psychology", src: "Bloom, 1984", bg: "#0a2244" },
];

const aiCards = [
  { icon: "🎯", title: "Smart Gap Detection", desc: "Identifies each student's exact weak topics before teaching begins — so no time is wasted on already-mastered content.", ref: "Black & Wiliam (1998) — Formative assessment improves outcomes by 0.4–0.7 SD" },
  { icon: "💬", title: "AI Tutor — Cambridge Standard", desc: "24/7 tutoring that delivers AO-standard feedback — the same depth an expert examiner would provide. Available any time, on any device.", ref: "VanLehn (2011) — Intelligent tutoring effect size d=0.76" },
  { icon: "📊", title: "Predictive Risk Alerts", desc: "Identifies at-risk students 30–45 days before exams — giving schools, teachers, and parents time to intervene before it is too late.", ref: "Baker & Inventado (2014) — Early risk detection" },
  { icon: "📅", title: "Smart Study Scheduling", desc: "Retrieval sessions are scheduled at the scientifically optimal moment for each student's individual forgetting curve — delivered via WhatsApp and email.", ref: "Cepeda et al. (2006) — Spaced retrieval scheduling" },
  { icon: "👨‍👩‍👧", title: "Parent Visibility System", desc: "Automatic weekly progress reports and score-drop alerts keep families informed — real data, not general reassurance.", ref: "Epstein (2005) — Parental monitoring improves achievement" },
  { icon: "📝", title: "Personalised Assessment", desc: "Every assessment is matched to each student's current level and gap profile — not a generic test everyone sits regardless of where they are.", ref: "Brusilovsky (2001) — Adaptive testing reduces teacher workload" },
];

const stakeholders = [
  { icon: "👨‍🎓", title: "Students", color: "var(--green)", checkColor: "var(--green)", benefits: ["Free AI Diagnostic — find your starting point before studying", "Interactive courses — practice by doing, not passive watching", "AI Tutor available 24/7 for Cambridge-standard subject help", "Dashboard tracks mastery topic by topic, in real time", "Pre-O-Level Certification available in 4 subjects"], cta: "→ For Students Page" },
  { icon: "👨‍👩‍👧", title: "Parents", color: "var(--primary)", checkColor: "var(--primary)", benefits: ["Linked parent dashboard — real data, not verbal updates", "Instant WhatsApp alert when your child's score drops", "Parent Guides: O-Level system explained clearly", "Group discount for siblings or study partners", "Evidence-based reassurance — not marketing claims"], cta: "→ For Parents Page" },
  { icon: "🏫", title: "Teachers", color: "var(--amber)", checkColor: "var(--amber)", benefits: ["Use AI diagnostics for classroom placement — no guesswork", "Download free lesson plan templates immediately", "Cambridge Teacher Mastery Workshop with CPD certificate", "AI teaching tools reduce preparation time significantly", "Subject Mastery Knowledge training per Cambridge subject"], cta: "→ Teacher Training Page" },
  { icon: "🏛", title: "Schools", color: "var(--primary-darker)", checkColor: "var(--primary-darker)", benefits: ["Bulk enrolment with centralised school-level analytics", "Complete teacher professional development package", "Custom diagnostic programmes aligned to your school calendar", "Real-time principal dashboard — all students, all subjects", "White-label platform with your school branding"], cta: "→ For Schools Page" },
];

const compareRows = [
  ["Gap Identification", "Random, reactive — often too late", "AI diagnostic before teaching begins"],
  ["Foundation Repair", "Rarely addressed systematically", "Structured remedial modules built in"],
  ["Retention Strategy", "None — hope it sticks", "AI-scheduled spaced retrieval system"],
  ["Past Paper Practice", "Ad hoc, teacher-dependent", "Cambridge past papers integrated from Day 1"],
  ["Parent Visibility", "Monthly verbal updates (if any)", "Real-time dashboard + weekly AI reports"],
  ["Availability", "3 hours/week maximum", "24/7 on any device"],
  ["Student Independence", "Dependency increases over time", "Self-learning skills built into every step"],
  ["Future Skills Development", "Exam-only focus", "Learn-how-to-learn, metacognition, self-regulation built in"],
];

const testimonials = [
  { text: "For the first time, I can actually see exactly where my child is struggling — not just hear 'he'll be fine' from the tutor. The weekly report tells me exactly what to ask about.", author: "A.K. — Parent", role: "O-Level student, Mathematics" },
  { text: "I used to rely on three tutors. After EduMeUp, I reduced to one — and my grades improved significantly. The diagnostic showed me what I actually needed to work on.", author: "S.M. — O-Level Student", role: "Physics & Chemistry" },
  { text: "We partnered with EduMeUp and immediately had something genuinely innovative to offer parents and students. The teacher training alone transformed how our staff deliver Cambridge lessons.", author: "F.H. — School Principal", role: "School Partnership Programme" },
];

const freeResources = [
  { icon: "⚡", title: "Magic Sheets", desc: "One-page dual-coded concept summaries per subject. Download free samples for Physics, Chemistry, Maths, and more. Visual + text for maximum retention.", link: "Download Free →", color: "var(--primary)" },
  { icon: "🖥", title: "Interactive Module Samples", desc: "One free H5P module per subject. Experience the actual learning format — not a video, not a screenshot. See exactly how practice by doing works.", link: "Open Free Module →", color: "var(--teal)" },
  { icon: "📝", title: "Sample Workbooks", desc: "4–6 page deep-dives covering one topic per workbook. Explanations, worked examples, practice questions — the same depth as paid courses.", link: "Download Free →", color: "var(--primary-darker)" },
];

// ── COMPONENTS ─────────────────────────────────────────────────────────────────
function SectionWrapper({ id, bg = "#fff", children }: { id: string; bg?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="emu-section" style={{ background: bg }}>
      {children}
    </section>
  );
}

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────────
export default function EduMeUpHomepage() {
  const [activeStrip, setActiveStrip] = useState("👨‍🎓 Student");

  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  const stripOptions = ["👨‍🎓 Student", "👨‍👩‍👧 Parent", "🏫 Teacher", "🏛 School"];

  return (
    <div className="emu-body">
      {/* MOCK BANNER */}
      <div className="emu-mock-banner">
        EduMeUp Homepage — Visual Mockup V4
        <span>For Chief Advisor Review — Not for Public Use</span>
      </div>

      <Navbar />

      {/* PAGE WRAPPER */}
      <div className="emu-page-wrapper">
        {/* SIDEBAR */}
        <aside className="emu-sidebar">
          <div className="emu-sidebar-diag">
            <p>Start here — it's free</p>
            <button>Take Free Diagnostic →</button>
          </div>
          <p className="emu-sidebar-label">On This Page</p>
          {[
            { group: "Learn", links: [["#problem","The Problem"],["#mastery","8-Step Model"],["#differentiators","Differentiators"],["#programmes","All Programmes"]] },
            { group: "Cambridge", links: [["#intl","International Fit"],["#research-strip","Research Basis"],["#ai-support","AI Support"]] },
            { group: "Who It's For", links: [["#stakeholders","Students"],["#stakeholders","Parents"],["#stakeholders","Teachers"],["#schools","Schools"]] },
            { group: "Explore Free", links: [["#free-resources","Free Resource Zone"],["#compare","Why EduMeUp?"],["#testimonials","Testimonials"]] },
          ].map(({ group, links }) => (
            <div className="emu-sidebar-group" key={group}>
              <div className="emu-sidebar-group-title">{group}</div>
              {links.map(([href, label]) => (
                <a key={label} href={href} className="emu-sidebar-link">{label}</a>
              ))}
            </div>
          ))}
        </aside>

        {/* MAIN */}
        <main className="emu-main">

          {/* HERO */}
          <section id="hero" className="emu-hero" style={{ paddingTop: 80 }}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="emu-hero-eyebrow">Cambridge O-Level &amp; IGCSE Preparation · Grade 6 through O-Level</div>
              <h1>The World's Most Comprehensive<br /><em>Cambridge Education Ecosystem</em></h1>
              <p className="emu-hero-sub">Research-validated. Diagnostic-first. Built on the science of how memory actually works.</p>
              <div className="emu-hero-bullets">
                {heroBullets.map((b, i) => (
                  <div className="emu-hero-bullet" key={i}>
                    <span className="emu-hero-bullet-icon">✓</span>{b}
                  </div>
                ))}
              </div>
              <div className="emu-hero-ctas">
                <button className="emu-btn-primary">GET FREE AI DIAGNOSTIC</button>
                <button className="emu-btn-secondary">EXPLORE PROGRAMMES</button>
              </div>
              <p className="emu-hero-microcopy">No account required · No credit card · No commitment</p>
              <div className="emu-stat-row">
                {statCards.map((s, i) => (
                  <div className="emu-stat-card" key={i}>
                    <div className="emu-stat-num">{s.num}</div>
                    <div className="emu-stat-label">{s.label}</div>
                    <div className="emu-stat-sub">{s.sub}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* STAKEHOLDER STRIP */}
          <div className="emu-stakeholder-strip">
            <span className="emu-strip-label">Find what's right for you:</span>
            {stripOptions.map((opt) => (
              <button
                key={opt}
                className={`emu-strip-btn${activeStrip === opt ? " active" : ""}`}
                onClick={() => setActiveStrip(opt)}
              >{opt}</button>
            ))}
          </div>

          {/* DIAGNOSTIC BANNER */}
          <div className="emu-diag-banner">
            <div>
              <h2>Not Sure Where to Start? The Diagnostic Does That for You.</h2>
              <p>Free · 30 minutes · No account required. Get a personalised gap analysis, a recommended starting point, and a clear study sequence — before you invest a single hour in the wrong area.</p>
              <div style={{ marginTop: 12, fontSize: 13, color: "rgba(255,255,255,.75)" }}>
                Available for: Physics · Chemistry · Mathematics · English Language · Economics
              </div>
            </div>
            <button className="emu-btn-white">TAKE FREE DIAGNOSTIC NOW</button>
          </div>

          {/* THE PROBLEM */}
          <SectionWrapper id="problem" bg="#fff">
            <div className="emu-section-eyebrow">The Research</div>
            <div className="emu-section-title">The Problem Is Not Effort. It Is Method.</div>
            <p className="emu-section-sub">Hundreds of thousands of students prepare for Cambridge O-Level each year — many study for hours, attend academies, use online platforms — and still underperform. Research has identified exactly why.</p>
            <div className="emu-problem-grid">
              <div className="emu-problem-col bad">
                <h3>❌ What Conventional Study Does</h3>
                {[
                  "Passive watching of video lectures — low engagement, low retention",
                  "Re-reading notes and textbooks — creates familiarity, not understanding",
                  "Cramming large amounts without spacing — collapses within days",
                  "Moving forward when earlier topics are unresolved — gaps compound",
                  "No feedback on whether understanding is real or illusory",
                ].map((t, i) => (
                  <div className="emu-problem-item" key={i}>
                    <span style={{ color: "var(--red)", fontWeight: 700, flexShrink: 0 }}>✗</span>{t}
                  </div>
                ))}
                <div className="emu-problem-result-bad">Result: familiarity without understanding — collapse under exam pressure</div>
              </div>
              <div className="emu-problem-col good">
                <h3>✅ What Research Says Actually Works</h3>
                {[
                  "Active practice — doing, not watching (Freeman et al., 2014)",
                  "Retrieval practice — testing before re-reading (Roediger & Karpicke, 2006)",
                  "Spaced repetition — review at optimal intervals (Cepeda et al., 2006)",
                  "Mastery gates — no advancement until 80% secured (Bloom, 1984)",
                  "Diagnostic-first — know gaps before studying (Black & Wiliam, 1998)",
                ].map((t, i) => (
                  <div className="emu-problem-item" key={i}>
                    <span style={{ color: "var(--primary)", fontWeight: 700, flexShrink: 0 }}>✓</span>{t}
                  </div>
                ))}
                <div className="emu-problem-result-good">Result: durable memory, transferable understanding, exam-ready performance</div>
              </div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 17, color: "#0f172a" }}>
                Retention: Without vs With Timely Reviews
              </span>
            </div>
            <table className="emu-retention-table">
              <thead>
                <tr>
                  <th>❌ Without Timely Reviews</th>
                  <th>✅ With EduMeUp Spaced Reviews</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Day 1: 100% → Day 2: 58%</td><td>Day 1: 100% → After Review 1: 100%</td></tr>
                <tr><td>Day 6: 26% → Day 31: 21%</td><td>Day 6: 80% → After Review 2: 95%</td></tr>
                <tr><td>Day 60: ~3% retained</td><td>Day 31: 85%+ → After Review 3: 98%</td></tr>
                <tr>
                  <td style={{ color: "var(--red)", fontWeight: 600 }}>Result: Panic. Tutor dependency. Exam failure.</td>
                  <td style={{ color: "var(--primary)", fontWeight: 600 }}>Result: Independent mastery. Exam confidence.</td>
                </tr>
              </tbody>
            </table>
            <p className="emu-retention-cite">Research basis: Ebbinghaus (1885), Murre &amp; Dros (2015), Cepeda et al. (2006)</p>
          </SectionWrapper>

          {/* 8-STEP MODEL */}
          <SectionWrapper id="mastery" bg="var(--lgrey)">
            <div className="emu-section-eyebrow">The 10X Learning Leap Model</div>
            <div className="emu-section-title">8-Step Research-Backed Mastery Cycle</div>
            <p className="emu-section-sub">Every learner on EduMeUp follows a structured pathway grounded in five decades of cognitive science — converting passive study into 50%+ active, long-term mastery.</p>
            <div className="emu-steps-flow">
              {steps1.map((s) => (
                <div key={s.num} className="emu-step-card" style={{ background: s.bg, borderRadius: s.br }}>
                  <div className="emu-step-num">{s.num}</div>
                  <div className="emu-step-title">{s.title}</div>
                  <div className="emu-step-desc">{s.desc}</div>
                  <div className="emu-step-ref">{s.ref}</div>
                </div>
              ))}
            </div>
            <div className="emu-step-row2">
              {steps2.map((s) => (
                <div key={s.num} className="emu-step-card" style={{ background: s.bg, borderRadius: s.br }}>
                  <div className="emu-step-num">{s.num}</div>
                  <div className="emu-step-title">{s.title}</div>
                  <div className="emu-step-desc">{s.desc}</div>
                  <div className="emu-step-ref">{s.ref}</div>
                </div>
              ))}
            </div>
          </SectionWrapper>

          {/* DIFFERENTIATORS */}
          <SectionWrapper id="differentiators" bg="#fff">
            <div className="emu-section-eyebrow">Why Choose EduMeUp</div>
            <div className="emu-section-title">Six Differentiators That Set This Platform Apart</div>
            <p className="emu-section-sub">Every differentiator is grounded in peer-reviewed research — not marketing language. Each one maps to a specific, documented failure in conventional learning that EduMeUp resolves.</p>
            <table className="emu-diff-table">
              <tbody>
                {differentiators.map((d, i) => (
                  <tr key={i}>
                    <td className="emu-diff-icon-cell" style={{ background: d.iconBg, borderRadius: d.topBr || d.botBr || "" }}>{d.icon}</td>
                    <td className="emu-diff-main" style={{ borderLeftColor: d.borderColor }}>
                      <h4>{d.title}</h4>
                      <p>{d.desc}</p>
                    </td>
                    <td className="emu-diff-research">
                      <div className="emu-diff-research-label">Research Basis</div>
                      <p>{d.research}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SectionWrapper>

          {/* PROGRAMMES */}
          <SectionWrapper id="programmes" bg="var(--lgrey)">
            <div className="emu-section-eyebrow">All Programmes</div>
            <div className="emu-section-title">Find the Right Programme — Whatever Stage You Are At</div>
            <p className="emu-section-sub">From Grade 6 foundation through Cambridge O-Level completion — every programme follows the 8-step mastery cycle. Group discount available: organiser 65%, group members 80%.</p>

            {/* Lower Secondary */}
            <div className="emu-prog-level" id="lower-secondary">
              <div className="emu-prog-level-label">
                <span className="emu-prog-level-badge" style={{ background: "var(--teal)" }}>Level 1</span>
                <span className="emu-prog-level-title">Lower Secondary — Grade 6 to 8</span>
              </div>
              <div className="emu-prog-scroll">
                {lowerSecondaryCards.map((c) => (
                  <div className="emu-prog-card" key={c.title} style={{ borderTopColor: c.color }}>
                    <div className="emu-prog-card-icon">{c.icon}</div>
                    <h4>{c.title}</h4>
                    <div className="emu-prog-level-tag">{c.level}</div>
                    <p>{c.desc}</p>
                    <a className="emu-prog-card-link" href="#">Lower Secondary →</a>
                  </div>
                ))}
              </div>
            </div>

            {/* English Pathway */}
            <div className="emu-english-highlight" id="english-pathway">
              <h3>🗣 English Language — A Complete, Purposeful Pathway from Foundation to O-Level Mastery</h3>
              <p>Unlike platforms where English courses are isolated purchases, every EduMeUp English course is purpose-built as part of a connected, progressive pathway. Each course is a complete standalone programme — but together they form a seamless journey from foundation level to full Cambridge O-Level English mastery.</p>
              <div className="emu-english-pathway">
                {["Grade 6–8 English (Foundation)", "ESL1 (A2 Level)", "ESL2 (B1 Level)", "O-Level English Bridge (B1+→B2)"].map((step, i) => (
                  <span key={i} style={{ display: "flex", alignItems: "center" }}>
                    <span className="emu-eng-step">{step}</span>
                    <span className="emu-eng-arrow">→</span>
                  </span>
                ))}
                <span className="emu-eng-step" style={{ background: "var(--green)" }}>O-Level English Mastery</span>
              </div>
              <p style={{ marginTop: 14, fontSize: 13, color: "var(--dgrey)", fontStyle: "italic" }}>
                Diagnostic-first entry at any level · Each course is complete as a standalone · Together they form a full roadmap
              </p>
            </div>

            {/* Bridge Courses */}
            <div className="emu-prog-level" id="bridge">
              <div className="emu-prog-level-label">
                <span className="emu-prog-level-badge" style={{ background: "var(--primary-darker)" }}>Level 2</span>
                <span className="emu-prog-level-title">Bridge Courses — Pre-O-Level Foundation</span>
              </div>
              <div className="emu-prog-scroll">
                {bridgeCards.map((c) => (
                  <div className="emu-prog-card" key={c.title} style={{ borderTopColor: c.color }}>
                    <div className="emu-prog-card-icon">{c.icon}</div>
                    <h4>{c.title}</h4>
                    <div className="emu-prog-level-tag">{c.level}</div>
                    <p>{c.desc}</p>
                    <a className="emu-prog-card-link" href="#">Bridge Courses →</a>
                  </div>
                ))}
              </div>
            </div>

            {/* Certification */}
            <div id="certification" style={{ background: "linear-gradient(135deg,var(--primary-light),#f0fdf4)", borderRadius: 14, padding: "28px 32px", marginBottom: 32, border: "1px solid var(--primary-border)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24, flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", color: "var(--primary)", textTransform: "uppercase", marginBottom: 8 }}>EduMeUp Qualification</div>
                  <h3 style={{ fontFamily: "'Sora',sans-serif", fontSize: 22, fontWeight: 700, color: "#0f172a", marginBottom: 10 }}>Pre-O-Level Certification — Prove Your Readiness</h3>
                  <p style={{ fontSize: 14, color: "var(--body)", lineHeight: 1.65, maxWidth: 580, marginBottom: 12 }}>Complete a Bridge Course and pass the end-of-course exam at 75%+ to earn the EduMeUp Pre-O-Level Certificate — confirming readiness for O-Level study. Included in Bridge Course fee.</p>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--primary)" }}>Phase 1: English Language · Mathematics · Physics · Chemistry</div>
                  <div style={{ fontSize: 11, color: "var(--dgrey)", fontStyle: "italic", marginTop: 8 }}>⚠ EduMeUp internal qualification only — not affiliated with Cambridge Assessment International Education</div>
                </div>
                <button className="emu-btn-primary" style={{ background: "var(--primary)", color: "#fff", flexShrink: 0 }}>Learn About Certification →</button>
              </div>
            </div>
          </SectionWrapper>

          {/* CAMBRIDGE + INTERNATIONAL */}
          <SectionWrapper id="intl" bg="#fff">
            <div className="emu-section-eyebrow">Cambridge &amp; Beyond</div>
            <div className="emu-section-title">Built for Cambridge. Ready for Any Conceptual Exam System.</div>
            <p className="emu-section-sub">Cambridge O-Level is the benchmark — but the skills, knowledge, and study methods EduMeUp builds transfer to any education system based on conceptual understanding and unseen exam application.</p>
            <div className="emu-intl-grid">
              <div className="emu-intl-card" style={{ borderLeftColor: "var(--primary)" }}>
                <h3>🎓 The Cambridge Benchmark</h3>
                <p>Every piece of EduMeUp content is built to the standard Cambridge examiners apply when marking. The syllabus scope, the assessment objectives, the mark scheme language, the expected depth of answer — all are built around Cambridge O-Level requirements, which represent the gold standard for rigorous conceptual examination at secondary level.</p>
                <p>When a student can answer an unseen Cambridge question correctly, they have demonstrated genuine understanding — not pattern recognition.</p>
                <div className="emu-intl-tag-row">
                  {["Cambridge O-Level", "Cambridge IGCSE", "O-Level Pakistan", "O-Level Sri Lanka"].map(t => <span key={t} className="emu-intl-tag">{t}</span>)}
                </div>
              </div>
              <div className="emu-intl-card" style={{ borderLeftColor: "var(--primary-dark)" }}>
                <h3>🌍 Ready for Other International Systems</h3>
                <p>Conceptual, unseen-exam education systems around the world share a fundamental characteristic: they test understanding, not memorisation. The syllabus chapters differ — but the method of preparation is the same. A student built for unseen Cambridge questions is prepared for any exam system that rewards reasoning over rote recall.</p>
                <p>The 8-step mastery cycle transfers directly: diagnose, build understanding, retrieve, apply to unseen problems.</p>
                <div className="emu-intl-tag-row">
                  {["IGCSE Globally", "IB MYP Foundation", "UAE Curriculum", "Malaysian O-Level", "African O-Level"].map(t => <span key={t} className="emu-intl-tag">{t}</span>)}
                </div>
              </div>
            </div>
          </SectionWrapper>

          {/* RESEARCH STRIP */}
          <section id="research-strip" className="emu-section" style={{ padding: "48px 60px", background: "var(--lgrey)" }}>
            <div className="emu-section-eyebrow" style={{ marginBottom: 20 }}>Research in Numbers</div>
            <div className="emu-research-strip">
              {researchTiles.map((t, i) => (
                <div key={i} className="emu-research-tile" style={{ background: t.bg }}>
                  <div className="emu-research-stat">{t.stat}</div>
                  <div className="emu-research-label">{t.label}</div>
                  <div className="emu-research-src">{t.src}</div>
                </div>
              ))}
            </div>
            <p style={{ textAlign: "center", marginTop: 20 }}>
              <a href="#research" style={{ fontSize: 14, fontWeight: 700, color: "var(--primary)", textDecoration: "none" }}>
                Read the full research basis on every design decision → Research &amp; RnD Page
              </a>
            </p>
          </section>

          {/* AI SUPPORT */}
          <SectionWrapper id="ai-support" bg="#fff">
            <div className="emu-section-eyebrow">AI-Powered Support</div>
            <div className="emu-section-title">24/7 Intelligent Support — Solving What Traditional Methods Cannot</div>
            <p className="emu-section-sub">EduMeUp's AI layer works continuously — personalising learning, identifying risk, alerting stakeholders, and delivering feedback that meets Cambridge standard. Proprietary. Benefit-focused. Always on.</p>
            <div className="emu-ai-grid">
              {aiCards.map((c) => (
                <div key={c.title} className="emu-ai-card">
                  <div className="emu-ai-card-icon">{c.icon}</div>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                  <div className="emu-ai-card-ref">{c.ref}</div>
                </div>
              ))}
            </div>
          </SectionWrapper>

          {/* STAKEHOLDERS */}
          <SectionWrapper id="stakeholders" bg="var(--lgrey)">
            <div className="emu-section-eyebrow">Who It's For</div>
            <div className="emu-section-title">EduMeUp Supports Everyone in the Learning Journey</div>
            <div className="emu-stakeholder-grid">
              {stakeholders.map((s) => (
                <div key={s.title} className="emu-sth-card" style={{ borderTopColor: s.color }}>
                  <div className="emu-sth-icon">{s.icon}</div>
                  <h3 style={{ color: s.color }}>{s.title}</h3>
                  {s.benefits.map((b, i) => (
                    <div key={i} className="emu-sth-benefit">
                      <span style={{ color: s.checkColor, fontWeight: 700, flexShrink: 0 }}>✓</span>{b}
                    </div>
                  ))}
                  <a className="emu-sth-cta" href="#">{s.cta}</a>
                </div>
              ))}
            </div>
          </SectionWrapper>

          {/* COMPARE TABLE */}
          <SectionWrapper id="compare" bg="#fff">
            <div className="emu-section-eyebrow">Platform Comparison</div>
            <div className="emu-section-title">Why Traditional Tutoring Often Falls Short</div>
            <p className="emu-section-sub">A structured, science-backed system versus reactive, gap-filled traditional approaches.</p>
            <table className="emu-compare-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>🔴 Traditional Tutoring</th>
                  <th>🔵 EduMeUp System</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map(([feat, trad, emu]) => (
                  <tr key={feat}>
                    <td>{feat}</td>
                    <td>{trad}</td>
                    <td>{emu}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SectionWrapper>

          {/* TESTIMONIALS */}
          <SectionWrapper id="testimonials" bg="var(--lgrey)">
            <div className="emu-section-eyebrow">Social Proof</div>
            <div className="emu-section-title">What Students, Parents &amp; Schools Say</div>
            <div className="emu-testi-grid">
              {testimonials.map((t) => (
                <div key={t.author} className="emu-testi-card">
                  <div className="emu-testi-quote">"</div>
                  <p className="emu-testi-text">{t.text}</p>
                  <div className="emu-testi-author">{t.author}</div>
                  <div className="emu-testi-role">{t.role}</div>
                </div>
              ))}
            </div>
            <div className="emu-trust-row">
              {["🔬 Research-Validated Since 2021", "📚 Built on 30+ Years of Learning Science", "🤖 AI-Powered Adaptive System", "🎓 Cambridge O-Level / IGCSE Aligned"].map(b => (
                <span key={b} className="emu-trust-badge">{b}</span>
              ))}
            </div>
          </SectionWrapper>

          {/* FREE RESOURCES */}
          <SectionWrapper id="free-resources" bg="#fff">
            <div className="emu-section-eyebrow">Try Before You Invest</div>
            <div className="emu-section-title">Free Resource Zone — Experience the Quality First</div>
            <p className="emu-section-sub">One free sample from every resource type we offer. No account required. For those who want to judge quality before spending — and for those who need it most.</p>
            <div className="emu-res-grid">
              {freeResources.map((r) => (
                <div key={r.title} className="emu-res-card" style={{ borderTopColor: r.color }}>
                  <div className="emu-res-card-icon">{r.icon}</div>
                  <h3>{r.title}</h3>
                  <p>{r.desc}</p>
                  <a className="emu-res-card-link" href="#">{r.link}</a>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center" }}>
              <button className="emu-btn-primary" style={{ background: "var(--primary)", color: "#fff" }}>
                VISIT FREE RESOURCE ZONE — 15 RESOURCE TYPES, ALL FREE
              </button>
            </div>
          </SectionWrapper>

          {/* BOTTOM CTA */}
          <div className="emu-bottom-cta">
            <h2>The First Step Costs Nothing. Take the Free Diagnostic.</h2>
            <p>30 minutes. No account. No credit card. A personalised gap analysis, recommended starting point, and clear study sequence — at no cost.</p>
            <div className="emu-cta-group">
              <button className="emu-btn-primary" style={{ fontSize: 16, padding: "16px 32px" }}>GET FREE AI DIAGNOSTIC</button>
              <button className="emu-btn-secondary" style={{ fontSize: 16, padding: "15px 30px" }}>BROWSE ALL PROGRAMMES</button>
            </div>
            <p style={{ marginTop: 16, fontSize: 13, color: "rgba(255,255,255,.45)" }}>Questions? Chat with us on WhatsApp →</p>
          </div>

          {/* FOOTER */}
          <footer className="emu-footer">
            <div className="emu-footer-grid">
              <div className="emu-footer-col">
                <div className="emu-footer-logo">Edu<span>Me</span>Up</div>
                <p>The World's Most Comprehensive Cambridge Education Ecosystem</p>
                <p>Research-Validated · Diagnostic-First · 24/7 AI Support</p>
                <p style={{ marginTop: 16, color: "rgba(255,255,255,.35)", fontSize: 11 }}>Chief Adviser: Muhammad Benyameen<br />M.Phil Educational Planning &amp; Management</p>
              </div>
              <div className="emu-footer-col">
                <h4>Programmes</h4>
                {["Lower Secondary (Gr 6–8)", "Bridge Courses", "O-Level Subjects", "English Pathway", "ATP Courses", "Pre-O-Level Certification", "View All Programmes →"].map(l => <a key={l} href="#">{l}</a>)}
              </div>
              <div className="emu-footer-col">
                <h4>Resources</h4>
                {["Free AI Diagnostic", "Free Resource Zone", "Blog", "Research & RnD", "Parent Guides", "School Partnership", "Pricing"].map(l => <a key={l} href="#">{l}</a>)}
              </div>
              <div className="emu-footer-col">
                <h4>Contact</h4>
                {["edumeup.com", "info@edumeup.com", "WhatsApp Support", "For Schools", "For Teachers"].map(l => <a key={l} href="#">{l}</a>)}
                <p style={{ marginTop: 16, fontSize: 11, color: "rgba(255,255,255,.3)" }}>Platform: Moodle 5.2 + React/Node.js</p>
              </div>
            </div>
            <div className="emu-footer-divider">
              <span className="emu-footer-copy">© 2026 EduMeUp.com — All rights reserved.</span>
              <span className="emu-footer-copy">Privacy Policy · Terms of Service · Sitemap</span>
            </div>
          </footer>

        </main>
      </div>
    </div>
  );
}
