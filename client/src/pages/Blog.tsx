import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight, ChevronRight, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ui } from "@/theme";

// ─── CATEGORIES (8 from B21 PDF) ─────────────────────────────────────────────
const categories = [
  { label: "All", slug: "all", hex: "#2366c9" },
  { label: "Study Skills & Learning Science", slug: "study-skills", hex: "#0B3C5D" },
  { label: "O-Level Subject Guides", slug: "subject-guides", hex: "#0D9488" },
  { label: "English Language & Writing", slug: "english-writing", hex: "#F97316" },
  { label: "Cambridge Exam System", slug: "cambridge-exams", hex: "#1D4ED8" },
  { label: "Parent's Corner", slug: "parents-corner", hex: "#16A34A" },
  { label: "EduMeUp Platform & Features", slug: "platform-features", hex: "#7C3AED" },
  { label: "Career & Future Pathways", slug: "career-pathways", hex: "#D97706" },
  { label: "Teacher Resources", slug: "teacher-resources", hex: "#0D9488" },
];

// ─── ARTICLES (10 Phase-1 from B21 PDF) ──────────────────────────────────────
const articles = [
  {
    id: 1, title: "The Complete O-Level Preparation Guide for Pakistani Students (2026)",
    excerpt: "A full roadmap from subject planning to past-paper execution and final revision cycles — the highest-traffic anchor piece for Cambridge students.",
    category: "Cambridge Exam System", slug: "cambridge-exams", author: "Muhammad", date: "15 Mar 2026", readTime: "10 min",
    image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&q=80&w=1200", featured: true,
  },
  {
    id: 2, title: "Why You Forget Everything You Study (And How to Fix It)",
    excerpt: "The Ebbinghaus Forgetting Curve explained — spaced retrieval, retrieval practice, interleaving, and a 4-week implementation plan.",
    category: "Study Skills & Learning Science", slug: "study-skills", author: "Muhammad", date: "15 Mar 2026", readTime: "7 min",
    image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3, title: "How to Write a Top-Grade O-Level English Essay",
    excerpt: "The 5-part essay structure, PEE/PEEL body paragraphs, and vocabulary upgrade strategies aligned to Cambridge AO1/AO2/AO3.",
    category: "English Language & Writing", slug: "english-writing", author: "Muhammad", date: "22 Mar 2026", readTime: "9 min",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4, title: "O-Level Summary Writing: The 7-Step Method That Works Every Time",
    excerpt: "Stop losing marks on summary questions — a repeatable 7-step method aligned to Cambridge examiner expectations.",
    category: "English Language & Writing", slug: "english-writing", author: "Muhammad", date: "29 Mar 2026", readTime: "7 min",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5, title: "O-Level ATP Complete Guide: Physics, Chemistry & Biology Paper 5",
    excerpt: "Master planning questions, results tables, graph drawing, and the most common errors across all three sciences.",
    category: "O-Level Subject Guides", slug: "subject-guides", author: "Muhammad", date: "5 Apr 2026", readTime: "8 min",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 6, title: "Is Private Tuition Really Necessary for O-Level? An Honest Answer",
    excerpt: "What research actually says about one-on-one tutoring, when it adds value, and a decision framework for parents.",
    category: "Cambridge Exam System", slug: "cambridge-exams", author: "Muhammad", date: "5 Apr 2026", readTime: "6 min",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 7, title: "O-Level vs Matric: What Every Pakistani Parent Needs to Know",
    excerpt: "A cost comparison, international recognition breakdown, and the transition challenge — answered plainly.",
    category: "Parent's Corner", slug: "parents-corner", author: "Muhammad", date: "12 Apr 2026", readTime: "7 min",
    image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 8, title: "Active Recall: The Study Technique That Improves Retention by 150%",
    excerpt: "Flashcards, blank-page recall, practice questions — and a 20-minute daily routine across O-Level subjects.",
    category: "Study Skills & Learning Science", slug: "study-skills", author: "Muhammad", date: "12 Apr 2026", readTime: "6 min",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 9, title: "What Is a Bridge Programme and Does Your Child Need One?",
    excerpt: "The foundation gap, what a bridge programme covers, and the EduMeUp Bridge-to-Certification pathway explained.",
    category: "EduMeUp Platform & Features", slug: "platform-features", author: "Muhammad", date: "19 Apr 2026", readTime: "6 min",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 10, title: "How to Become an Independent Learner Before O-Level Begins",
    excerpt: "The four components of self-regulated learning — goal setting, planning, self-monitoring, and reflection — built in Grade 8.",
    category: "Study Skills & Learning Science", slug: "study-skills", author: "Muhammad", date: "19 Apr 2026", readTime: "5 min",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
  },
];

const inlineCtas: Record<string, { eyebrow: string; heading: string; sub: string }> = {
  all: { eyebrow: "FREE — NO COMMITMENT REQUIRED", heading: "Not Sure Where to Start With O-Level?", sub: "Take the free 30-minute AI Diagnostic. It identifies your knowledge gaps by topic and tells you exactly which subject areas to focus on first." },
  "study-skills": { eyebrow: "APPLY BETTER METHODS NOW", heading: "Switch From Passive to Active Learning", sub: "Build retention, reduce wasted hours, and improve exam execution with EduMeUp's interactive modules." },
  "subject-guides": { eyebrow: "TARGET SUBJECT WEAK AREAS", heading: "Find Exactly Where Marks Are Leaking", sub: "Diagnostic first, then focused practice blocks by topic and AO level." },
  "english-writing": { eyebrow: "MASTER ENGLISH FRAMEWORKS", heading: "Get Structured Writing Methods That Scale", sub: "Essay and summary frameworks you can apply under exam pressure — download the free rubric." },
  "cambridge-exams": { eyebrow: "START PREPARING STRATEGICALLY", heading: "Get Your Personalised O-Level Study Plan", sub: "Use your diagnostic to prioritize the highest-impact topics first." },
  "parents-corner": { eyebrow: "PARENT DECISIONS, BACKED BY DATA", heading: "Know Where Your Child Stands This Week", sub: "Use visibility tools to intervene early, not after results." },
  "platform-features": { eyebrow: "START EARLY, BUILD ADVANTAGE", heading: "Explore EduMeUp Bridge & Foundation Courses", sub: "Bridge strategy for Grades 6–8 and early O-Level pathways." },
  "career-pathways": { eyebrow: "PLAN AHEAD", heading: "See Where Cambridge Takes You", sub: "A-Level pathways, university admissions, and career planning — all mapped." },
  "teacher-resources": { eyebrow: "CAMBRIDGE CPD", heading: "Train, Certify, and Teach at Cambridge Standard", sub: "T1–T6 professional development pathway with CCTE certification." },
};

export default function Blog() {
  const [activeSlug, setActiveSlug] = useState("all");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);

  const catColor = (label: string) => categories.find((c) => c.label === label)?.hex ?? "#2366c9";

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      const cat = categories.find((c) => c.label === a.category);
      const matchCat = activeSlug === "all" || cat?.slug === activeSlug;
      const matchQ = !q || a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.category.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [activeSlug, query]);

  const featured = filtered.find((a) => a.featured) ?? filtered[0];
  const gridCards = filtered.filter((a) => a.id !== featured?.id);
  const visibleCards = gridCards.slice(0, visibleCount);
  const hasMore = gridCards.length > visibleCount;
  const cta = inlineCtas[activeSlug] ?? inlineCtas.all;

  return (
    <Layout>
      {/* ══ SECTION 1: HERO BANNER ══════════════════════════════════════════════ */}
      <section className={ui.sections.brand + " relative overflow-hidden py-16 md:py-24"}>
        <div className="absolute -top-20 -right-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
        <div className="container-custom relative z-10 text-center max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-blue-300 mb-4">
              EduMeUp Blog · Research-Backed Study Guides for O-Level Students
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.05] tracking-tight text-white mb-5">
              Everything You Need to Know —<br className="hidden md:block" /> Explained Clearly
            </h1>
            <p className="text-lg text-blue-50/80 leading-relaxed max-w-2xl mx-auto mb-8">
              Study strategies, subject guides, exam prep advice, and parent resources — all written by the EduMeUp team and grounded in learning science research.
            </p>
            <div className="max-w-[540px] mx-auto bg-white rounded-[1.5rem] overflow-hidden flex items-center shadow-xl">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles — topic, subject, or keyword"
                className="flex-1 px-5 py-4 outline-none text-sm text-slate-800 bg-transparent"
              />
              <button className="px-5 py-4 text-[#2366c9]" aria-label="Search">
                <Search className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-4 text-xs text-blue-300 font-semibold tracking-wide">
              {articles.length} articles · 8 categories · New content every week
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══ STICKY CATEGORY FILTER BAR ═══════════════════════════════════════════ */}
      <div className="sticky top-16 z-40 bg-white border-b border-slate-100 shadow-sm">
        <div className="container-custom py-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => { setActiveSlug(cat.slug); setVisibleCount(6); }}
                className="px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-all duration-200"
                style={
                  activeSlug === cat.slug
                    ? { background: cat.hex, color: "#fff", borderColor: cat.hex }
                    : { background: "#fff", color: "#1E3A5F", borderColor: "#1E3A5F40" }
                }
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ══ FEATURED ARTICLE ═════════════════════════════════════════════════════ */}
      {featured && (
        <section className="py-12 bg-white">
          <div className="container-custom max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className={ui.cards.standard + " grid lg:grid-cols-[55%_45%] rounded-[2rem] overflow-hidden shadow-xl"}>
                <div className="relative min-h-[260px] lg:min-h-[380px]">
                  <img src={featured.image} alt={featured.title} className="w-full h-full object-cover" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#2366c9]">
                    Featured
                  </span>
                </div>
                <div className="p-7 lg:p-10 flex flex-col justify-center border-l-4 bg-[#EFF6FF]"
                  style={{ borderLeftColor: catColor(featured.category) }}>
                  <span className="inline-flex w-fit px-3 py-1 rounded-full text-xs font-bold mb-3"
                    style={{ background: `${catColor(featured.category)}18`, color: catColor(featured.category) }}>
                    {featured.category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 leading-tight mb-3 line-clamp-2">{featured.title}</h2>
                  <p className="text-sm text-slate-700 leading-relaxed mb-4 line-clamp-3">{featured.excerpt}</p>
                  <p className="text-xs text-slate-500 mb-5">{featured.author} · {featured.date} · {featured.readTime} read</p>
                  <Button className={ui.buttons.brand + " font-semibold rounded-xl w-fit"}>
                    Read Article <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ══ ARTICLE GRID + INLINE CTA ════════════════════════════════════════════ */}
      <section className={ui.sections.softBlue + " py-8 pb-20"}>
        <div className="container-custom max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {visibleCards.slice(0, 6).map((article, i) => (
              <ArticleCard key={article.id} article={article} catColor={catColor} index={i} />
            ))}
          </div>

          {/* INLINE CTA BLOCK */}
          <div className={ui.sections.brand + " rounded-[2rem] p-8 md:p-10 mb-8"}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.28em] text-blue-300 mb-2">{cta.eyebrow}</p>
                <h3 className="text-2xl font-semibold text-white mb-2">{cta.heading}</h3>
                <p className="text-sm text-blue-200 font-medium">{cta.sub}</p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-3 min-w-[220px]">
                <Button className={ui.buttons.brandLight + " font-semibold"}>
                  TAKE FREE AI DIAGNOSTIC <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Link href="/resources">
                  <span className="text-xs font-medium text-blue-200 underline cursor-pointer hover:text-white transition-colors">
                    Browse our free resource library →
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Row 3+ */}
          {visibleCards.length > 6 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {visibleCards.slice(6).map((article, i) => (
                <ArticleCard key={article.id} article={article} catColor={catColor} index={i + 6} />
              ))}
            </div>
          )}

          <div className="text-center mt-6">
            {hasMore ? (
              <Button variant="outline" onClick={() => setVisibleCount((p) => p + 3)} className={ui.buttons.brandOutline + " font-semibold"}>
                Load More Articles
              </Button>
            ) : (
              <p className="text-sm text-slate-500 italic">You have read everything — for now.</p>
            )}
          </div>
        </div>
      </section>

      {/* ══ FOOTER CTA STRIP ════════════════════════════════════════════════════ */}
      <section className="py-12 bg-white">
        <div className="container-custom max-w-6xl">
          <div className={ui.sections.softBlue + " rounded-[2rem] p-8 md:p-10 border-l-4 border-[#2366c9] grid md:grid-cols-3 gap-8"}>
            {[
              { label: "Not sure where to start?", title: "Find Your Starting Point", desc: "Sample lessons, essay frameworks, and diagnostic pathways in one place.", cta: "Take Diagnostic", href: "/for-parents", outline: false },
              { label: "Free resources, no login", title: "Explore Free Learning Materials", desc: "No account needed to browse core samples and frameworks.", cta: "Visit Library", href: "/resources", outline: true },
              { label: "Talk to a real person", title: "Speak With Our Education Team", desc: "9AM–9PM PKT. Guidance call, not a pressure sales call.", cta: "WhatsApp Us", href: "#", outline: true, icon: true },
            ].map((item) => (
              <div key={item.title} className="space-y-3">
                <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#2366c9]">{item.label}</p>
                <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                <Link href={item.href}>
                  <Button variant={item.outline ? "outline" : "default"}
                    className={(item.outline ? ui.buttons.brandOutline : ui.buttons.brand) + " font-semibold rounded-xl inline-flex items-center gap-2"}>
                    {item.icon && <MessageCircle className="h-4 w-4" />}
                    {item.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

function ArticleCard({ article, catColor, index }: { article: (typeof articles)[0]; catColor: (l: string) => string; index: number }) {
  const color = catColor(article.category);
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 3) * 0.08 }}
      className={ui.cards.standard + " rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"}
      style={{ borderTop: `4px solid ${color}` }}
    >
      <img src={article.image} alt={article.title} className="w-full h-[180px] object-cover" />
      <div className="p-5 flex flex-col min-h-[220px]">
        <span className="inline-flex w-fit px-2.5 py-1 rounded-full text-[11px] font-bold" style={{ background: `${color}15`, color }}>
          {article.category}
        </span>
        <h3 className="text-[16px] font-semibold text-slate-900 leading-snug mt-2 mb-2 line-clamp-3">{article.title}</h3>
        <p className="text-[13px] text-slate-600 line-clamp-2 mb-3 leading-relaxed">{article.excerpt}</p>
        <p className="text-xs text-slate-400 mt-auto mb-3">{article.author} · {article.date} · {article.readTime} read</p>
        <button className="text-[13px] font-semibold flex items-center gap-1 text-[#1E3A5F] hover:text-[#2366c9] transition-colors">
          READ MORE <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </motion.article>
  );
}