import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowRight, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Link } from "wouter";

export default function Blog() {
  const categories = [
    "All",
    "O-Level Strategy",
    "English P1&P2",
    "Sciences & ATP",
    "Mathematics",
    "Foundational O-Level Bridge Courses",
    "Parent Guides",
    "Study Skills",
  ];

  const articles = [
    {
      id: 1,
      title: "How to Prepare for O-Level: The Complete Guide for Pakistani Students (2026)",
      excerpt: "A full roadmap from subject planning to past-paper execution and final revision cycles.",
      category: "O-Level Strategy",
      author: "Muhammad",
      date: "15 Mar 2026",
      readTime: "10 min",
      image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&q=80&w=1200",
      color: "#0B3C5D",
      featured: true,
    },
    {
      id: 2,
      title: "How to Write an O-Level English Essay That Actually Scores",
      excerpt: "Use frameworks for descriptive, narrative, and argumentative writing with timing strategy.",
      category: "English P1&P2",
      author: "Muhammad",
      date: "22 Mar 2026",
      readTime: "9 min",
      image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&q=80&w=800",
      color: "#F97316",
    },
    {
      id: 3,
      title: "ATP Without Guesswork: A Step-by-Step Answering Method",
      excerpt: "Master variables, controls, data interpretation, and conclusion writing for ATP papers.",
      category: "Sciences & ATP",
      author: "Muhammad",
      date: "24 Mar 2026",
      readTime: "8 min",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
      color: "#0891B2",
    },
    {
      id: 4,
      title: "Maths Revision System: From Weak Topics to Full Confidence",
      excerpt: "How to sequence algebra, trigonometry, and application problems under exam constraints.",
      category: "Mathematics",
      author: "Muhammad",
      date: "25 Mar 2026",
      readTime: "7 min",
      image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=800",
      color: "#7C3AED",
    },
    {
      id: 5,
      title: "Foundational O-Level Bridge Courses Explained: Why Starting Early Changes Everything",
      excerpt: "How Grade 6â€“8 preparation creates O-Level momentum before pressure spikes.",
      category: "Foundational O-Level Bridge Courses",
      author: "Muhammad",
      date: "26 Mar 2026",
      readTime: "7 min",
      image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&q=80&w=800",
      color: "#059669",
    },
    {
      id: 6,
      title: "Parent Visibility: Which Dashboard Signals Actually Matter",
      excerpt: "Use mastery, trajectory, and alert signals to intervene early without creating dependency.",
      category: "Parent Guides",
      author: "Muhammad",
      date: "27 Mar 2026",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
      color: "#0369A1",
    },
    {
      id: 7,
      title: "Active Recall vs Re-reading: What Top Students Do Differently",
      excerpt: "A practical weekly plan to convert passive study into high-retention performance.",
      category: "Study Skills",
      author: "Muhammad",
      date: "28 Mar 2026",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800",
      color: "#0D9488",
    },
    {
      id: 8,
      title: "Exam Week Strategy: What to Do 7 Days Before O-Level Papers",
      excerpt: "A low-stress execution plan for final revision, sleep, and mock calibration.",
      category: "O-Level Strategy",
      author: "Muhammad",
      date: "29 Mar 2026",
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
      color: "#0B3C5D",
    },
    {
      id: 9,
      title: "English Paper 1 Summary Method: 7 Steps in 20 Minutes",
      excerpt: "Stop guessing summary answers with a repeatable method aligned to examiner expectations.",
      category: "English P1&P2",
      author: "Muhammad",
      date: "30 Mar 2026",
      readTime: "7 min",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800",
      color: "#F97316",
    },
  ];

  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((article) => {
      const matchCategory = activeCategory === "All" || article.category === activeCategory;
      const matchQuery =
        q.length === 0 ||
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.category.toLowerCase().includes(q);
      return matchCategory && matchQuery;
    });
  }, [activeCategory, query]);

  const featured = filtered.find((article) => article.featured) ?? filtered[0];
  const cards = filtered.filter((article) => article.id !== featured?.id).slice(0, visibleCount);
  const hasMore = filtered.filter((article) => article.id !== featured?.id).length > visibleCount;

  const ctaByCategory: Record<string, { eyebrow: string; heading: string; sub: string }> = {
    All: {
      eyebrow: "FREE — NO COMMITMENT REQUIRED",
      heading: "Discover Your O-Level Readiness Score",
      sub: "Free 10-minute diagnostic. Find your exact weak areas.",
    },
    "O-Level Strategy": {
      eyebrow: "START PREPARING STRATEGICALLY",
      heading: "Get Your Personalised O-Level Study Plan",
      sub: "Use your diagnostic to prioritize the highest-impact topics first.",
    },
    "English P1&P2": {
      eyebrow: "MASTER ENGLISH FRAMEWORKS",
      heading: "Get Structured Writing Methods That Scale",
      sub: "Essay and summary frameworks you can apply under exam pressure.",
    },
    "Sciences & ATP": {
      eyebrow: "ATP IS A SCORING LEVER",
      heading: "Build ATP Skills Systematically",
      sub: "Stop guessing and learn repeatable answer patterns for ATP papers.",
    },
    Mathematics: {
      eyebrow: "TARGET MATHS WEAK AREAS",
      heading: "Find Exactly Where Marks Are Leaking",
      sub: "Diagnostic first, then focused practice blocks.",
    },
    "Foundational O-Level Bridge Courses": {
      eyebrow: "START EARLY, BUILD ADVANTAGE",
      heading: "Cover O-Level Foundations Before Pressure Peaks",
      sub: "Bridge strategy for Grades 6â€“8 and early O-Level pathways.",
    },
    "Parent Guides": {
      eyebrow: "PARENT DECISIONS, BACKED BY DATA",
      heading: "Know Where Your Child Stands This Week",
      sub: "Use visibility tools to intervene early, not after results.",
    },
    "Study Skills": {
      eyebrow: "APPLY BETTER METHODS NOW",
      heading: "Switch From Passive to Active Learning",
      sub: "Build retention, reduce wasted hours, and improve exam execution.",
    },
  };

  const inlineCta = ctaByCategory[activeCategory] ?? ctaByCategory.All;

  const cardTopBorderClass: Record<string, string> = {
    "O-Level Strategy": "border-t-[#1e1b4b]",
    "English P1&P2": "border-t-[#2366c9]",
    "Sciences & ATP": "border-t-[#2366c9]",
    Mathematics: "border-t-[#1e1b4b]",
    "Foundational O-Level Bridge Courses": "border-t-[#2366c9]",
    "Parent Guides": "border-t-[#1e1b4b]",
    "Study Skills": "border-t-[#2366c9]",
  };

  const pillClass: Record<string, string> = {
    "O-Level Strategy": "bg-[#2366c9]/10 text-slate-900",
    "English P1&P2": "bg-[#2366c9]/10 text-[#2366c9]",
    "Sciences & ATP": "bg-[#2366c9]/10 text-[#2366c9]",
    Mathematics: "bg-[#2366c9]/10 text-slate-900",
    "Foundational O-Level Bridge Courses": "bg-[#2366c9]/10 text-[#2366c9]",
    "Parent Guides": "bg-[#2366c9]/10 text-slate-900",
    "Study Skills": "bg-[#2366c9]/10 text-[#2366c9]",
  };

  return (
    <Layout>
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 to-white py-16 md:py-24">
        <div className="container-custom relative z-10 text-center max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
           
            <h1 className="text-5xl md:text-6xl font-semibold text-slate-900 mb-4 tracking-tight leading-tight">O-Level &amp; IGCSE Learning Hub</h1>
            <p className="text-base text-slate-700 font-medium mb-8 max-w-3xl mx-auto">
              Research-backed articles, exam strategies, and study guides for Cambridge preparation.
            </p>
            <div className="max-w-[560px] mx-auto bg-white border border-slate-200 rounded-lg overflow-hidden flex items-center">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles, topics, or subjects..."
                className="flex-1 px-4 py-3 outline-none text-[14px] text-slate-800"
              />
              <button className="px-4 py-3 text-[#2366c9]" aria-label="Search articles">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="sticky top-16 z-40 bg-white border-b border-slate-100 shadow-sm">
        <div className="container-custom py-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setVisibleCount(6);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-all ${
                  activeCategory === category
                    ? "bg-[#2366c9] text-white border-[#2366c9]"
                    : "bg-white text-slate-900 border-[#1e1b4b] hover:bg-[#EFF6FF]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="container-custom max-w-6xl">
          {featured && (
            <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="grid lg:grid-cols-[55%_45%] rounded-xl overflow-hidden bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-slate-200">
                <div className="relative min-h-[260px] lg:min-h-[380px]">
                  <img src={featured.image} alt={featured.title} className="w-full h-full object-cover" />
                  <span className="absolute top-4 left-4 bg-[#2366c9] text-white px-3 py-1 rounded-full text-[14px] font-medium uppercase tracking-wider">
                    Featured
                  </span>
                </div>
                <div className="p-7 lg:p-8 border-l-4 border-[#2366c9] flex flex-col justify-center">
                  <Badge className="w-fit mb-3 bg-[#EFF6FF] text-slate-900 border border-slate-200">{featured.category}</Badge>
                  <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 leading-tight mb-3 line-clamp-2">{featured.title}</h2>
                  <p className="text-[14px] text-black font-medium leading-relaxed mb-4 line-clamp-3">{featured.excerpt}</p>
                  <p className="text-xs text-black font-medium mb-5">
                    {featured.author} Â· {featured.date} Â· {featured.readTime} read
                  </p>
                  <Button className="w-fit bg-[#2366c9] hover:bg-blue-500 text-white font-medium rounded-lg">
                    Read Article <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <section className="py-8 bg-[#F8FAFC]">
        <div className="container-custom max-w-6xl">
          <div id="blog-grid" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((article) => (
              <article
                key={article.id}
                data-category={article.category}
                className={`bg-white rounded-xl overflow-hidden border border-slate-200 border-t-4 ${cardTopBorderClass[article.category] ?? "border-t-[#1e1b4b]"} shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all`}
              >
                <img src={article.image} alt={article.title} className="w-full h-[180px] object-cover" />
                <div className="p-5 flex flex-col min-h-[220px]">
                  <span className={`inline-flex w-fit px-2.5 py-1 rounded-full text-[11px] font-medium ${pillClass[article.category] ?? "bg-[#2366c9]/10 text-slate-900"}`}>
                    {article.category}
                  </span>
                  <h3 className="text-[17px] font-semibold text-slate-900 leading-snug mt-2 mb-2 line-clamp-3">{article.title}</h3>
                  <p className="text-[14px] text-black line-clamp-2 mb-3">{article.excerpt}</p>
                  <p className="text-xs text-black mt-auto mb-3">
                    {article.author} Â· {article.date} Â· {article.readTime} read
                  </p>
                  <button className="text-[14px] font-medium text-slate-900 hover:text-[#2366c9] text-left">
                    READ MORE â†’
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-xl bg-[#2366c9] p-8 md:p-10 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-blue-300 mb-2">{inlineCta.eyebrow}</p>
                <h3 className="text-2xl font-semibold text-white mb-2">{inlineCta.heading}</h3>
                <p className="text-[14px] text-blue-200 font-medium">{inlineCta.sub}</p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-3 min-w-[220px]">
                <Link href="/for-parents">
                  <Button className="bg-[#2366c9] hover:bg-blue-500 text-white font-medium" data-cta="diagnostic">
                    Take Free Diagnostic â†’
                  </Button>
                </Link>
                <Link href="/resources" className="text-[14px] text-blue-200 underline hover:text-white" data-cta="library">
                  Explore Free Library
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            {hasMore ? (
              <Button
                variant="outline"
                onClick={() => setVisibleCount((prev) => prev + 3)}
                className="border-2 border-[#2366c9] text-[#2366c9] hover:bg-[#2366c9] hover:text-white font-medium"
              >
                Load More Articles
              </Button>
            ) : (
              <p className="text-[14px] text-black italic">You have read everything — for now.</p>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container-custom max-w-6xl">
          <div className="bg-blue-50 border-l-4 border-[#2366c9] rounded-xl p-6 md:p-8 grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-widest text-[#2366c9]">Not sure where to start?</p>
              <h3 className="text-xl font-semibold text-slate-900">Find Your Starting Point</h3>
              <p className="text-[14px] text-slate-700">Sample lessons, essay frameworks, and diagnostic pathways in one place.</p>
              <Link href="/for-parents">
                <Button className="bg-[#2366c9] hover:bg-blue-500 text-white font-medium">Take Diagnostic</Button>
              </Link>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-widest text-[#2366c9]">Free resources, no login</p>
              <h3 className="text-xl font-semibold text-slate-900">Explore Free Learning Materials</h3>
              <p className="text-[14px] text-slate-700">No account needed to browse core samples and frameworks.</p>
              <Link href="/resources">
                <Button variant="outline" className="border-2 border-[#1e1b4b] text-slate-900 hover:bg-[#2366c9] hover:text-white font-medium">Visit Library</Button>
              </Link>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-widest text-[#2366c9]">Talk to a real person</p>
              <h3 className="text-xl font-semibold text-slate-900">Speak With Our Education Team</h3>
              <p className="text-[14px] text-slate-700">9AMâ€“9PM PKT. Guidance call, not a pressure sales call.</p>
              <Button variant="outline" className="border-2 border-[#2366c9] text-[#2366c9] hover:bg-[#2366c9] hover:text-white font-medium">WhatsApp Us</Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

