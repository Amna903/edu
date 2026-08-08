/**
 * 4.22 — Site-wide Course Search Component
 * Renders a search bar with category filter, sort, and paginated results.
 * Drop it anywhere: <CourseSearch /> on Courses page, Programs page, etc.
 */
import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCourseSearch, useDebounce } from "@/hooks/use-search";
import { ProgramCard } from "@/components/ProgramCard";
import type { LmsCourse } from "@shared/schema";

interface CourseSearchProps {
  /** Show results inline (default) or just expose search state */
  showResults?: boolean;
  onCourseClick?: (courseId: number, title: string) => void;
  className?: string;
}

export function CourseSearch({ showResults = true, onCourseClick, className = "" }: CourseSearchProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("title");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const debouncedQuery = useDebounce(query, 350);

  const { data, isLoading, isFetching } = useCourseSearch({
    q: debouncedQuery,
    category,
    sort,
    page,
    limit: 9,
    enabled: showResults,
  });

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  const handleCategoryChange = (cat: string) => {
    setCategory(cat === category ? "" : cat);
    setPage(1);
  };

  const clearFilters = () => {
    setQuery("");
    setCategory("");
    setSort("title");
    setPage(1);
  };

  const hasFilters = query || category || sort !== "title";

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Search courses, subjects, categories..."
            className="pl-11 pr-10 h-12 rounded-2xl border-slate-200"
          />
          {query && (
            <button
              onClick={() => handleQueryChange("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className={`h-12 rounded-2xl px-5 font-bold ${showFilters ? "border-blue-500 text-[#2366c9] bg-blue-50" : ""}`}
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
        </Button>
        {hasFilters && (
          <Button variant="ghost" onClick={clearFilters} className="h-12 rounded-2xl font-semibold text-slate-500">
            Clear
          </Button>
        )}
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="rounded-2xl border border-blue-100 bg-slate-50/80 p-5 space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="space-y-1.5">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Sort by</p>
              <div className="flex gap-2 flex-wrap">
                {[
                  { value: "title", label: "Title A–Z" },
                  { value: "newest", label: "Newest" },
                  { value: "price_asc", label: "Price ↑" },
                  { value: "price_desc", label: "Price ↓" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setSort(opt.value); setPage(1); }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition ${
                      sort === opt.value
                        ? "bg-[#2366c9] text-white border-[#2366c9] shadow-sm"
                        : "bg-white text-slate-700 border-slate-200 hover:border-blue-300"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Category chips from live data */}
          {data?.categories && data.categories.length > 0 && (
            <div className="space-y-1.5 border-t border-slate-200/60 pt-3">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Categories</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleCategoryChange("")}
                  className={`px-3.5 py-1 rounded-full text-xs font-bold border transition ${
                    !category
                      ? "bg-[#2366c9] text-white border-[#2366c9] shadow-sm"
                      : "bg-white text-slate-700 border-slate-200 hover:border-blue-300"
                  }`}
                >
                  All Categories
                </button>
                {data.categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-3.5 py-1 rounded-full text-xs font-bold border transition ${
                      category === cat
                        ? "bg-[#2366c9] text-white border-[#2366c9] shadow-sm"
                        : "bg-white text-slate-700 border-slate-200 hover:border-blue-300"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Results */}
      {showResults && (
        <>
          {/* Status line */}
          <div className="flex items-center justify-between text-sm font-medium text-slate-500">
            {isLoading && !data ? (
              <span>Loading Courses…</span>
            ) : data ? (
              <span>
                Showing {data.courses.length} of {data.total} {data.total === 1 ? "course" : "courses"}
                {debouncedQuery ? ` for "${debouncedQuery}"` : ""}
                {category ? ` in ${category}` : ""}
                {isFetching ? " (updating…)" : ""}
              </span>
            ) : null}
          </div>

          {/* Course grid */}
          {isLoading && !data ? (
            <div className="space-y-8">
              <div className="flex flex-col items-center justify-center py-12">
                <div className="app-loader-mark mb-3">E</div>
                <p className="font-bold text-sm text-slate-700 animate-pulse">Loading Courses…</p>
              </div>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-96 rounded-[2.5rem] bg-slate-100/80 animate-pulse border border-slate-200" />
                ))}
              </div>
            </div>
          ) : data && data.courses.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {data.courses.map((course) => {
                const moodleId = typeof course.moodleCourseId === "number" ? course.moodleCourseId : Number(course.id) || 0;
                const programItem: LmsCourse = {
                  id: moodleId,
                  slug: course.slug || `course-${moodleId}`,
                  shortName: course.shortname || `COURSE-${moodleId}`,
                  title: course.title,
                  shortDescription: course.summary ? course.summary.replace(/<[^>]+>/g, "") : "Interactive Moodle course.",
                  fullDescription: course.summary ? course.summary.replace(/<[^>]+>/g, "") : "Interactive Moodle course.",
                  category: course.category || "General",
                  categoryName: course.category || "General",
                  categoryId: null,
                  format: "online",
                  imageUrl: course.imageUrl || null,
                  startDate: null,
                  endDate: null,
                  price: course.price ? Math.round(course.price * 100) : 0,
                  visible: true,
                  lmsCourseUrl: course.lmsUrl || `https://lms.edumeup.com/course/view.php?id=${moodleId}`,
                };

                return <ProgramCard key={course.id} program={programItem} />;
              })}
            </div>
          ) : data && debouncedQuery ? (
            <div className="rounded-[2rem] border border-dashed border-slate-200 bg-slate-50/50 p-12 text-center text-slate-500">
              <Search className="mx-auto h-10 w-10 mb-3 opacity-30 text-[#2366c9]" />
              <p className="font-bold text-slate-800 text-lg">No courses found for "{debouncedQuery}"</p>
              <p className="mt-1 text-sm">Try a different keyword or click Clear Filters.</p>
            </div>
          ) : null}

          {/* Pagination */}
          {data && data.totalPages > 1 && (
            <div className="flex items-center justify-between pt-2">
              <p className="text-sm text-slate-500">
                Page {data.page} of {data.totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= data.totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
