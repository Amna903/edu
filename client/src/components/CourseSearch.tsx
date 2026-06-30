/**
 * 4.22 — Site-wide Course Search Component
 * Renders a search bar with category filter, sort, and paginated results.
 * Drop it anywhere: <CourseSearch /> on Courses page, Programs page, etc.
 */
import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useCourseSearch, useDebounce } from "@/hooks/use-search";

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
    limit: 12,
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
    <div className={`space-y-4 ${className}`}>
      {/* Search bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Search courses, subjects, categories..."
            className="pl-10 pr-10"
          />
          {query && (
            <button
              onClick={() => handleQueryChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className={showFilters ? "border-blue-500 text-blue-600" : ""}
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
        </Button>
        {hasFilters && (
          <Button variant="ghost" onClick={clearFilters} className="text-slate-500">
            Clear
          </Button>
        )}
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Sort by</p>
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
                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition ${
                      sort === opt.value
                        ? "bg-blue-600 text-white border-blue-600"
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
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Category</p>
              <div className="flex flex-wrap gap-2">
                {data.categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition ${
                      category === cat
                        ? "bg-blue-600 text-white border-blue-600"
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
          <div className="flex items-center justify-between text-sm text-slate-500">
            {isLoading || isFetching ? (
              <span>Searching...</span>
            ) : data ? (
              <span>
                {data.total} {data.total === 1 ? "course" : "courses"} found
                {debouncedQuery ? ` for "${debouncedQuery}"` : ""}
                {category ? ` in ${category}` : ""}
              </span>
            ) : null}
          </div>

          {/* Course grid */}
          {isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-36 rounded-2xl bg-slate-100 animate-pulse" />
              ))}
            </div>
          ) : data && data.courses.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.courses.map((course) => (
                <Card
                  key={course.id}
                  className="cursor-pointer border-slate-200 hover:border-blue-300 hover:shadow-md transition"
                  onClick={() => onCourseClick?.(course.moodleCourseId, course.title)}
                >
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-slate-900 text-sm leading-snug line-clamp-2">
                        {course.title}
                      </p>
                      {course.price > 0 ? (
                        <span className="shrink-0 text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                          PKR {course.price.toLocaleString()}
                        </span>
                      ) : (
                        <Badge variant="secondary" className="shrink-0 text-xs">Free</Badge>
                      )}
                    </div>
                    {course.category && (
                      <span className="inline-block text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        {course.category}
                      </span>
                    )}
                    {course.summary && (
                      <p className="text-xs text-slate-500 line-clamp-2 leading-5">
                        {course.summary.replace(/<[^>]+>/g, "")}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : data && debouncedQuery ? (
            <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-slate-500">
              <Search className="mx-auto h-8 w-8 mb-3 opacity-30" />
              <p className="font-semibold text-slate-700">No courses found for "{debouncedQuery}"</p>
              <p className="mt-1 text-sm">Try a different keyword or clear the filters.</p>
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
