
import { Layout } from "@/components/Layout";
import { CourseSearch } from "@/components/CourseSearch";
import { BookOpen, Sparkles, Award, GraduationCap } from "lucide-react";

export default function Courses() {
  return (
    <Layout>
      {/* Hero Header */}
      <section className="overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(35,102,201,0.18),_transparent_45%),linear-gradient(180deg,#f8fbff,#ffffff)] py-16 md:py-24 border-b border-blue-50">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.24em] text-[#2366c9]">
              <Sparkles className="h-3.5 w-3.5" />
              Moodle Course Catalog
            </div>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 md:text-6xl uppercase">
              Explore Live Courses From Edu&apos;s Connected Moodle
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-base md:text-lg leading-relaxed text-slate-600">
              Browse our live Cambridge-aligned course list, filter by subject or category, open detailed course pages, add to cart, and move directly into checkout.
            </p>

            {/* Quick Feature Badges */}
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
                <BookOpen className="h-4 w-4 text-[#2366c9]" /> Live Moodle Sync
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
                <Award className="h-4 w-4 text-emerald-600" /> Cambridge Aligned
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
                <GraduationCap className="h-4 w-4 text-indigo-600" /> H5P Interactive Activities
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Search & Cards Grid (CourseSearch placed above cards) */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="container-custom">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 uppercase">
              Search & Filter Courses
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Search by title, subject, category, or price with full-text search and server-side pagination.
            </p>
          </div>

          <div className="rounded-[2.5rem] border border-blue-100 bg-white p-6 md:p-8 shadow-xl">
            <CourseSearch showResults />
          </div>
        </div>
      </section>
    </Layout>
  );
}
