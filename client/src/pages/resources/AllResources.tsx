import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import {
  allResourceEntries,
  resourceCategories,
  resourceSubjects,
} from "@/components/resources/all-resources-content";
import { Input } from "@/components/ui/input";

export default function AllResources() {
  const [query, setQuery] = useState("");
  const [activeSubject, setActiveSubject] = useState<string>("All");

  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") || "";

    document.title = "All EduMeUp Resources - Courses, Workbooks & Worksheets | EduMeUp";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Browse all EduMeUp learning resources: interactive courses, conceptual workbooks, topical practice workbooks, exam papers, and printable worksheets from Grade 1 to O-Level.",
      );
    }

    return () => {
      document.title = previousTitle;
      if (metaDescription) {
        metaDescription.setAttribute("content", previousDescription);
      }
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allResourceEntries.filter((item) => {
      const matchesSubject = activeSubject === "All" || item.subject === activeSubject;
      const haystack = `${item.title} ${item.subject} ${item.type} ${item.keywords.join(" ")}`.toLowerCase();
      const matchesQuery = !q || haystack.includes(q);
      return matchesSubject && matchesQuery;
    });
  }, [activeSubject, query]);

  return (
    <Layout>
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 to-white py-16 md:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mx-auto max-w-5xl text-center"
          >
  
            <h1 className="text-4xl font-semibold text-slate-900 md:text-6xl">Every EduMeUp Resource, In One Place</h1>
            <p className="mx-auto mt-5 max-w-3xl text-base text-slate-700 md:text-lg">
              Courses. Workbooks. Worksheets. Past papers. All in one searchable catalogue.
            </p>
            <p className="mx-auto mt-3 max-w-3xl text-sm text-slate-600">
              EduMeUp all resources courses workbooks worksheets.
            </p>
            <div className="mt-10 max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search all resources..."
                className="pl-10"
              />
            </div>
            <div className="mt-8">
              <Link href="/resources/all">
                <span className="inline-flex items-center gap-2 rounded-lg bg-[#2366c9] px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700">
                  Browse All Resources
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-custom">
          <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl text-center">Browse by Category</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resourceCategories.map((category) => (
              <div key={category.title} className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-[#2366c9]">
                  <category.icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{category.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">{category.description}</p>
                <Link href={category.href}>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#2366c9] hover:text-blue-700">
                    {category.cta}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-blue-100 bg-blue-50/40 py-14 md:py-20">
        <div className="container-custom">
          <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl text-center">Browse by Subject</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {["All", ...resourceSubjects].map((subject) => (
              <button
                key={subject}
                type="button"
                onClick={() => setActiveSubject(subject)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  activeSubject === subject
                    ? "border-[#2366c9] bg-[#2366c9] text-white"
                    : "border-blue-200 bg-white text-slate-900 hover:border-blue-300"
                }`}
              >
                {subject}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {filtered.map((item) => (
              <Link key={`${item.title}-${item.subject}`} href={item.href}>
                <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm hover:border-blue-300">
                  <p className="text-base font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-1 text-xs text-slate-600">{item.subject} | {item.type}</p>
                </div>
              </Link>
            ))}
            {filtered.length === 0 ? (
              <p className="text-sm text-slate-600">No resources match your current search and subject filter.</p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl rounded-2xl border border-amber-300 bg-amber-50 p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-semibold text-amber-900">Important Legal Note - Read Before Publishing</h2>
            <p className="mt-3 text-sm leading-relaxed text-amber-900/90">
              The legal pages are structured templates and must be reviewed by a qualified legal adviser before commercial launch.
              Confirm governing jurisdiction, data categories collected, payment processor terms, and international compliance requirements including GDPR where applicable.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 border-y border-blue-100 bg-blue-50/40">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl rounded-2xl border border-blue-100 bg-white p-6 shadow-sm md:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <Link href="/programs/ai-diagnostic">
                <span className="flex items-center justify-between rounded-xl bg-[#2366c9] px-5 py-4 text-sm font-semibold text-white hover:bg-blue-700">
                  Start Free Diagnostic
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link href="/programs">
                <span className="flex items-center justify-between rounded-xl border border-blue-200 bg-white px-5 py-4 text-sm font-semibold text-slate-900 hover:border-blue-300 hover:text-[#2366c9]">
                  Explore Programmes
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

