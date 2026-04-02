import { useMemo, useState } from "react";
import { Search, BookOpen, GraduationCap, CreditCard } from "lucide-react";
import { Layout } from "@/components/Layout";
import { usePrograms } from "@/hooks/use-programs";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ProgramCard } from "@/components/ProgramCard";

export default function Courses() {
  const { data: courses, isLoading, error } = usePrograms();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    const values = Array.from(
      new Set((courses || []).map((course) => (course.categoryName || course.category).replace(/_/g, " "))),
    );
    return ["All", ...values];
  }, [courses]);

  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase();
    return (courses || []).filter((course) => {
      const categoryLabel = (course.categoryName || course.category).replace(/_/g, " ");
      const matchesCategory = selectedCategory === "All" || categoryLabel === selectedCategory;
      const matchesQuery =
        !query ||
        course.title.toLowerCase().includes(query) ||
        course.shortName.toLowerCase().includes(query) ||
        course.shortDescription.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [courses, search, selectedCategory]);

  return (
    <Layout>
      <section className="overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(35,102,201,0.18),_transparent_45%),linear-gradient(180deg,#f8fbff,#ffffff)] py-16 md:py-24">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Moodle Course Catalog</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
              Explore Live Courses From Edu&apos;s Connected Moodle
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Browse the live course list, open detailed course pages, add courses to cart, and move directly into payment from the frontend.
            </p>
          </div>

          <div className="mt-10 grid gap-4 rounded-[2rem] border border-blue-100 bg-white p-5 shadow-xl md:grid-cols-[1fr_auto] md:items-center">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by course title, short name, or topic"
                className="h-12 rounded-2xl border-slate-200 pl-11"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    selectedCategory === category
                      ? "bg-[#2366c9] text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Badge variant="secondary" className="gap-2 rounded-full px-4 py-2 text-sm">
              <BookOpen className="h-4 w-4" />
              Live Moodle catalog
            </Badge>
            <Badge variant="secondary" className="gap-2 rounded-full px-4 py-2 text-sm">
              <GraduationCap className="h-4 w-4" />
              Course detail pages
            </Badge>
            <Badge variant="secondary" className="gap-2 rounded-full px-4 py-2 text-sm">
              <CreditCard className="h-4 w-4" />
              Cart and payment flow
            </Badge>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-custom">
          {isLoading && (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-[420px] rounded-[3rem] bg-blue-50" />
              ))}
            </div>
          )}

          {!isLoading && error && (
            <div className="rounded-[2rem] border border-red-200 bg-red-50 p-8 text-center text-red-700">
              Failed to load Moodle courses right now. Please try again in a moment.
            </div>
          )}

          {!isLoading && !error && (
            <>
              <div className="mb-8 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-black tracking-tight text-slate-900">Available Courses</h2>
                  <p className="mt-2 text-slate-500">
                    Showing {filteredCourses.length} {filteredCourses.length === 1 ? "course" : "courses"}
                  </p>
                </div>
              </div>

              {filteredCourses.length === 0 ? (
                <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-10 text-center">
                  <p className="text-lg font-semibold text-slate-900">No courses matched your filters.</p>
                  <p className="mt-2 text-slate-500">Try another keyword or switch back to all categories.</p>
                </div>
              ) : (
                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                  {filteredCourses.map((course) => (
                    <ProgramCard key={course.id} program={course} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
