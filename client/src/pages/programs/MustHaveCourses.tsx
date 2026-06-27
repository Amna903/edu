import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Calendar,
  GraduationCap,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { useFreeEnroll, useCourseDetail, usePrograms } from "@/hooks/use-programs";
import { useAuthUser } from "@/hooks/use-auth";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { formatMoneyFromMinorUnits } from "@/lib/currency";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { LmsCourse } from "@shared/schema";

function slugifySection(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isPaidCourse(course: LmsCourse) {
  return typeof course.price === "number" && course.price > 0;
}

function formatCourseDate(value: string | null) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// ─── ENROLL DIALOG ─────────────────────────────────────────────────────────────
function CourseEnrollDialog({
  course,
  open,
  onOpenChange,
}: {
  course: LmsCourse | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [, navigate] = useLocation();
  const { data: user } = useAuthUser();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const freeEnroll = useFreeEnroll();
  const { data: courseDetail, isLoading: isDetailLoading } = useCourseDetail(course?.id ?? null, open);

  if (!course) return null;

  const displayCourse = courseDetail ?? course;
  const paid = isPaidCourse(displayCourse);
  const categoryLabel = (displayCourse.categoryName || displayCourse.category).replace(/_/g, " ");
  const startDate = formatCourseDate(displayCourse.startDate);
  const endDate = formatCourseDate(displayCourse.endDate);

  const redirectToSignup = () => {
    const returnUrl = encodeURIComponent(window.location.pathname);
    onOpenChange(false);
    navigate(`/register?returnUrl=${returnUrl}`);
  };

  const handleEnrollClick = async () => {
    if (!user) {
      redirectToSignup();
      return;
    }

    if (paid) {
      addToCart({
        programId: displayCourse.id,
        title: displayCourse.title,
        price: displayCourse.price || 0,
      });
      toast({
        title: "Course added to cart",
        description: `${displayCourse.title} has been added to your cart. Redirecting to payment...`,
      });
      onOpenChange(false);
      navigate("/cart");
      return;
    }

    try {
      const result = await freeEnroll.mutateAsync(displayCourse.id);
      toast({
        title: "Enrolled successfully",
        description: result.message,
      });
      onOpenChange(false);
      navigate("/dashboard/student");
    } catch (error) {
      toast({
        title: "Enrollment failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border-[#dbe7f4] p-0">
        <div className="px-6 py-5" style={{ background: "#2366c9" }}>
          <p
            className="uppercase mb-1"
            style={{ color: "#dbeafe", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em" }}
          >
            {categoryLabel}
          </p>
          <DialogHeader className="space-y-0 text-left">
            <DialogTitle
              className="text-white"
              style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: "18px", lineHeight: 1.3 }}
            >
              {displayCourse.title}
            </DialogTitle>
            <DialogDescription className="text-white/70 text-sm mt-2 leading-relaxed">
              {displayCourse.shortDescription}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div>
            <p className="uppercase mb-2 text-[11px] font-bold text-slate-500">About This Course</p>
            <p className="text-sm text-slate-700 leading-relaxed">{displayCourse.fullDescription}</p>
          </div>

          {isDetailLoading && (
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading course details from Moodle…
            </div>
          )}

          {courseDetail && courseDetail.contentItems.length > 0 && (
            <div>
              <p className="uppercase mb-2 text-[11px] font-bold text-slate-500">Course Content</p>
              <ul className="space-y-1.5 max-h-40 overflow-y-auto">
                {courseDetail.contentItems.map((item, index) => (
                  <li key={`${item.id ?? item.name}-${index}`} className="text-sm text-slate-700 flex items-center gap-2">
                    <BookOpen className="h-3.5 w-3.5 text-[#2366c9] shrink-0" />
                    <span>{item.name}</span>
                    {item.modname && (
                      <span className="text-[10px] font-semibold uppercase text-slate-400">{item.modname}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {displayCourse.shortName && (
              <span className="rounded-full px-2.5 py-0.5 bg-[#eef6ff] text-[#1E3A5F] text-[11px] font-semibold">
                {displayCourse.shortName}
              </span>
            )}
            {displayCourse.format && (
              <span className="rounded-full px-2.5 py-0.5 bg-[#eef6ff] text-[#1E3A5F] text-[11px] font-semibold">
                {displayCourse.format}
              </span>
            )}
            {startDate && (
              <span className="rounded-full px-2.5 py-0.5 bg-[#eef6ff] text-[#1E3A5F] text-[11px] font-semibold inline-flex items-center gap-1">
                <Calendar className="h-3 w-3" /> Starts {startDate}
              </span>
            )}
            {endDate && (
              <span className="rounded-full px-2.5 py-0.5 bg-[#eef6ff] text-[#1E3A5F] text-[11px] font-semibold inline-flex items-center gap-1">
                <Calendar className="h-3 w-3" /> Ends {endDate}
              </span>
            )}
          </div>

          <div className="rounded-xl border border-[#dbe7f4] bg-[#f8fbff] p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase text-slate-500 mb-1">Price</p>
              {paid ? (
                <p
                  style={{
                    fontFamily: "Sora, sans-serif",
                    fontWeight: 800,
                    fontSize: "24px",
                    color: "#1E3A5F",
                  }}
                >
                  {formatMoneyFromMinorUnits(displayCourse.price!)}
                </p>
              ) : (
                <p
                  style={{
                    fontFamily: "Sora, sans-serif",
                    fontWeight: 800,
                    fontSize: "24px",
                    color: "#059669",
                  }}
                >
                  Free
                </p>
              )}
            </div>
            {paid ? (
              <button
                type="button"
                onClick={handleEnrollClick}
                disabled={freeEnroll.isPending || isDetailLoading}
                className="rounded-xl px-6 py-3 font-bold text-white transition disabled:opacity-60 cursor-pointer"
                style={{ background: "#2366c9", fontSize: "14px" }}
              >
                {freeEnroll.isPending ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> Enrolling…
                  </span>
                ) : (
                  "Payment"
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleEnrollClick}
                disabled={freeEnroll.isPending || isDetailLoading}
                className="rounded-xl px-6 py-3 font-bold text-white transition disabled:opacity-60 cursor-pointer"
                style={{ background: "#059669", fontSize: "14px" }}
              >
                {freeEnroll.isPending ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> Enrolling…
                  </span>
                ) : (
                  "Free"
                )}
              </button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── COURSE CARD ────────────────────────────────────────────────────────────────
function CourseCard({ course, onEnroll }: { course: LmsCourse; onEnroll: (course: LmsCourse) => void }) {
  const paid = isPaidCourse(course);
  const categoryLabel = (course.categoryName || course.category).replace(/_/g, " ");

  return (
    <div className="relative flex-shrink-0" style={{ width: "272px" }}>
      <div
        className="rounded-[14px] bg-[#eef6ff] overflow-hidden transition-all duration-200"
        style={{ border: "1.5px solid #cfe0f5" }}
      >
        <div
          className="relative flex items-center justify-center"
          style={{
            height: "148px",
            background: course.imageUrl
              ? `url(${course.imageUrl}) center/cover`
              : "linear-gradient(135deg, #2366c9, #4f86e0)",
          }}
        >
          {!course.imageUrl && (
            <BookOpen className="relative z-10 text-white" style={{ width: 48, height: 48 }} />
          )}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.18))",
            }}
          />
          <span
            className="absolute top-2 left-2 rounded-md px-2 py-0.5"
            style={{ background: "white", color: "#2366c9", fontSize: "10px", fontWeight: 700 }}
          >
            {categoryLabel}
          </span>
          <span
            className="absolute top-2 right-2 rounded-md px-2 py-0.5"
            style={{
              background: paid ? "#2366c9" : "#059669",
              color: "white",
              fontSize: "10px",
              fontWeight: 700,
            }}
          >
            {paid ? "Paid" : "Free"}
          </span>
        </div>

        <div className="p-4">
          <p
            className="uppercase mb-1"
            style={{ color: "#2366c9", fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em" }}
          >
            {course.shortName}
          </p>
          <h3
            className="text-[#1E3A5F] leading-[1.35] mb-2 line-clamp-2"
            style={{ fontSize: "15px", fontFamily: "Sora, sans-serif", fontWeight: 700 }}
          >
            {course.title}
          </h3>
          <p className="mb-3 line-clamp-2" style={{ fontSize: "12px", color: "#64748B" }}>
            {course.shortDescription}
          </p>
          <div
            className="flex items-center justify-between pt-3"
            style={{ borderTop: "1px solid #dbe7f4" }}
          >
            <span
              style={{
                fontFamily: "Sora, sans-serif",
                fontWeight: 800,
                fontSize: "18px",
                color: paid ? "#1E3A5F" : "#059669",
              }}
            >
              {paid ? formatMoneyFromMinorUnits(course.price!) : "Free"}
            </span>
            <button
              type="button"
              onClick={() => onEnroll(course)}
              className="transition-colors"
              style={{
                background: "#2366c9",
                color: "white",
                fontSize: "12.5px",
                fontWeight: 700,
                borderRadius: "7px",
                padding: "6px 14px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Enroll
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── HORIZONTAL SCROLL ROW ────────────────────────────────────────────────────
function CourseScrollRow({ courses }: { courses: LmsCourse[] }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [selectedCourse, setSelectedCourse] = useState<LmsCourse | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const scroll = (dir: number) => {
    rowRef.current?.scrollBy({ left: dir * 580, behavior: "smooth" });
  };

  const handleEnroll = (course: LmsCourse) => {
    setSelectedCourse(course);
    setDialogOpen(true);
  };

  if (courses.length === 0) {
    return (
      <p className="text-sm text-slate-500 py-4">No courses available in this category yet.</p>
    );
  }

  return (
    <>
      <div className="relative">
        <button
          type="button"
          onClick={() => scroll(-1)}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 items-center justify-center w-9 h-9 rounded-full bg-white border border-[#dbe7f4] shadow-sm hover:border-[#2366c9] transition"
          aria-label="Scroll left"
        >
          ←
        </button>
        <div
          ref={rowRef}
          className="flex gap-[18px] overflow-x-auto pb-4 md:pl-12 md:pr-12"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#dbe7f4 transparent",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} onEnroll={handleEnroll} />
          ))}
        </div>
        <button
          type="button"
          onClick={() => scroll(1)}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 items-center justify-center w-9 h-9 rounded-full bg-white border border-[#dbe7f4] shadow-sm hover:border-[#2366c9] transition"
          aria-label="Scroll right"
        >
          →
        </button>
      </div>

      <CourseEnrollDialog
        course={selectedCourse}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
}

// ─── LEFT STICKY SIDEBAR ────────────────────────────────────────────────────────
function CoursesSidebar({
  activeSection,
  categorySections,
  courseCount,
}: {
  activeSection: string;
  categorySections: Array<{ id: string; label: string }>;
  courseCount: number;
}) {
  return (
    <aside
      className="hidden lg:block flex-shrink-0"
      style={{
        width: "240px",
        position: "sticky",
        top: "64px",
        height: "calc(100vh - 64px)",
        overflowY: "auto",
        background: "#FFFFFF",
        borderRight: "1px solid #dbe7f4",
        padding: "28px 0",
      }}
    >
      <div
        className="mx-4 mb-6 rounded-xl p-4"
        style={{
          background: "linear-gradient(135deg, #fff7ed, #ffedd5)",
          border: "1.5px solid #fed7aa",
        }}
      >
        <p
          className="uppercase mb-1"
          style={{ color: "#2366c9", fontSize: "10px", fontWeight: 700, letterSpacing: "0.28em" }}
        >
          Free · 30 Minutes
        </p>
        <h4
          style={{
            fontFamily: "Sora, sans-serif",
            fontWeight: 700,
            fontSize: "14px",
            color: "#1E3A5F",
            marginBottom: "6px",
          }}
        >
          Not sure where to start?
        </h4>
        <p style={{ fontSize: "12px", color: "#64748B", marginBottom: "10px", lineHeight: 1.5 }}>
          Take a free 30-min diagnostic and get a personalised learning roadmap.
        </p>
        <Link href="/programs/ai-diagnostic">
          <span
            className="block text-center font-semibold rounded-lg py-2 transition"
            style={{ background: "#2366c9", color: "white", fontSize: "13px", cursor: "pointer" }}
          >
            Take Free Diagnostic
          </span>
        </Link>
      </div>

      <div className="px-4 mb-4">
        <p
          className="uppercase mb-2"
          style={{ fontSize: "10px", fontWeight: 700, color: "#64748B", letterSpacing: "0.15em" }}
        >
          Course Categories
        </p>
        {categorySections.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className="block px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all mb-0.5"
            style={{
              color: activeSection === link.id ? "#2366c9" : "#1E293B",
              background: activeSection === link.id ? "rgba(35,102,201,0.1)" : "transparent",
              fontWeight: activeSection === link.id ? 600 : 400,
            }}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#diagnostic"
          className="block px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all mb-0.5"
          style={{
            color: activeSection === "diagnostic" ? "#2366c9" : "#1E293B",
            background: activeSection === "diagnostic" ? "rgba(35,102,201,0.1)" : "transparent",
            fontWeight: activeSection === "diagnostic" ? 600 : 400,
          }}
        >
          Free Diagnostic
        </a>
      </div>

      <div className="px-4">
        <div className="rounded-lg p-3" style={{ background: "#f8fbff", border: "1px solid #dbe7f4" }}>
          <p style={{ fontSize: "12.5px", color: "#64748B", lineHeight: 1.6 }}>
            {courseCount} live {courseCount === 1 ? "course" : "courses"} from Moodle
            <br />
            Lifetime access included
            <br />
            H5P interactive activities
            <br />
            AI diagnostic included free
          </p>
        </div>
      </div>
    </aside>
  );
}

// ─── MAIN PAGE ──────────────────────────────────────────────────────────────────
export default function MustHaveCoursesPage() {
  const [activeSection, setActiveSection] = useState("");
  const { data: courses, isLoading, error } = usePrograms();

  const categoryGroups = useMemo(() => {
    const groups = new Map<string, LmsCourse[]>();
    for (const course of courses || []) {
      const key = course.categoryName || course.category.replace(/_/g, " ");
      const existing = groups.get(key) || [];
      existing.push(course);
      groups.set(key, existing);
    }
    return Array.from(groups.entries()).map(([label, items]) => ({
      id: slugifySection(label),
      label,
      courses: items,
    }));
  }, [courses]);

  const categorySections = useMemo(
    () => categoryGroups.map((group) => ({ id: group.id, label: group.label })),
    [categoryGroups],
  );

  const courseCount = courses?.length ?? 0;
  const firstSectionId = categoryGroups[0]?.id ?? "";

  useEffect(() => {
    document.title = "Must-Have Courses | EduMeUp";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Build the academic foundations that O-Level students need — browse live courses from EduMeUp's Moodle platform and enroll instantly.",
      );
    }

    const sectionIds = [...categoryGroups.map((g) => g.id), "diagnostic"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [categoryGroups]);

  return (
    <Layout>
      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-14 md:py-20"
        style={{ background: "linear-gradient(135deg, #1a4fa0 0%, #2366c9 100%)" }}
      >
        <div className="absolute -top-20 -right-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" aria-hidden="true" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
              style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}
            >
              <span style={{ fontSize: "13px", fontWeight: 700, color: "white" }}>
                Live Moodle Course Catalog
              </span>
            </div>

            <h1
              className="mb-5"
              style={{
                fontFamily: "Sora, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                color: "white",
                lineHeight: 1.1,
              }}
            >
              Must-Have Courses{" "}
              <span style={{ color: "#dbeafe" }}>for Every Learner</span>
            </h1>

            <p
              className="mx-auto mb-8 max-w-3xl"
              style={{ fontSize: "17px", color: "rgba(255,255,255,0.85)", lineHeight: 1.7 }}
            >
              Browse live courses from EduMeUp&apos;s connected Moodle platform. Enroll in free courses
              instantly or pay for premium courses — all from one place.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
              <Link href="/programs/ai-diagnostic">
                <span
                  className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold transition"
                  style={{ background: "#2366c9", color: "white", fontSize: "14px", cursor: "pointer" }}
                >
                  Take Free AI Diagnostic <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              {firstSectionId && (
                <a
                  href={`#${firstSectionId}`}
                  className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold transition"
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    color: "white",
                    fontSize: "14px",
                    border: "1px solid rgba(255,255,255,0.25)",
                  }}
                >
                  Browse Courses
                </a>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[
                { stat: isLoading ? "…" : String(courseCount), label: "Courses Available" },
                { stat: "30 min", label: "Free Diagnostic" },
                { stat: "50–75%", label: "Retention Rate" },
                { stat: "100%", label: "H5P Interactive" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl py-3 px-4 text-center"
                  style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
                >
                  <p
                    style={{
                      fontFamily: "Sora, sans-serif",
                      fontWeight: 800,
                      fontSize: "22px",
                      color: "#dbeafe",
                    }}
                  >
                    {s.stat}
                  </p>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── DIAGNOSTIC BANNER ─────────────────────────────────────────────────── */}
      <div
        style={{
          background: "linear-gradient(90deg, #eef6ff, #f8fbff)",
          borderTop: "4px solid #2366c9",
          borderBottom: "1px solid #dbe7f4",
          padding: "22px 48px",
        }}
      >
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Brain className="h-8 w-8 text-brand-primary" />
            <div className="flex-1">
              <p style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "17px", color: "#1E3A5F" }}>
                Free 30-Minute AI Diagnostic — Know Exactly Which Course Is Right for You
              </p>
              <p style={{ fontSize: "14px", color: "#64748B" }}>
                Answer adaptive questions, get a skills report, and receive a personalised learning
                roadmap. No account needed.
              </p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Link href="/programs/ai-diagnostic">
                <span
                  className="inline-block rounded-xl px-5 py-2.5 font-semibold"
                  style={{ background: "#2366c9", color: "white", fontSize: "14px", cursor: "pointer" }}
                >
                  Take Free Diagnostic
                </span>
              </Link>
              <p style={{ fontSize: "12px", color: "#64748B" }}>Free · No login · Instant report</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ──────────────────────────────────────────────────────── */}
      <div className="flex" style={{ background: "#f8fbff" }}>
        <CoursesSidebar
          activeSection={activeSection}
          categorySections={categorySections}
          courseCount={courseCount}
        />

        <main className="flex-1 min-w-0 py-10">
          {isLoading && (
            <div className="px-6 md:px-10 space-y-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-64 w-full rounded-2xl bg-blue-50" />
              ))}
            </div>
          )}

          {!isLoading && error && (
            <div className="px-6 md:px-10">
              <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-700">
                <p className="font-semibold mb-2">Could not load courses from Moodle</p>
                <p className="text-sm">
                  {error instanceof Error ? error.message : "Please try again in a moment."}
                </p>
              </div>
            </div>
          )}

          {!isLoading && !error && categoryGroups.length === 0 && (
            <div className="px-6 md:px-10">
              <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
                <GraduationCap className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="text-lg font-semibold text-slate-900 mb-2">No courses available yet</p>
                <p className="text-slate-500">
                  Courses will appear here once they are published on the connected Moodle platform.
                </p>
              </div>
            </div>
          )}

          {!isLoading &&
            !error &&
            categoryGroups.map((group, index) => (
              <div key={group.id}>
                <section id={group.id} className="px-6 md:px-10 mb-10">
                  <p
                    className="uppercase mb-1"
                    style={{ color: "#2366c9", fontSize: "11px", fontWeight: 700, letterSpacing: "0.28em" }}
                  >
                    Moodle Category
                  </p>
                  <h2
                    className="mb-6"
                    style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "28px", color: "#1E3A5F" }}
                  >
                    {group.label}
                  </h2>
                  <CourseScrollRow courses={group.courses} />
                </section>
                {index < categoryGroups.length - 1 && (
                  <div style={{ height: "1px", background: "#dbe7f4", margin: "0 2.5rem 2.5rem" }} />
                )}
              </div>
            ))}

          {/* ── FULL DIAGNOSTIC SECTION ─────────────────────────────────── */}
          <section id="diagnostic" className="px-6 md:px-10 mb-10">
            <div
              className="relative overflow-hidden rounded-[20px] p-12"
              style={{ background: "#1a4fa0", margin: "0" }}
            >
              <p
                className="uppercase mb-3"
                style={{ color: "#dbeafe", fontSize: "11px", fontWeight: 700, letterSpacing: "0.28em" }}
              >
                Free · No Account Required · 30 Minutes
              </p>
              <h2
                className="mb-4 max-w-2xl"
                style={{
                  fontFamily: "Sora, sans-serif",
                  fontWeight: 800,
                  fontSize: "30px",
                  color: "white",
                  lineHeight: 1.2,
                }}
              >
                Not Sure Where to Start? Let Our AI Decide for You.
              </h2>
              <p
                className="mb-8 max-w-2xl"
                style={{ fontSize: "15px", color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}
              >
                Answer 30 adaptive questions and get an instant, personalised skills report that
                identifies your exact starting point. No account required, no credit card, no
                guesswork.
              </p>

              <div className="flex flex-col md:flex-row gap-6 mb-8">
                {[
                  { num: "1", title: "Take the Diagnostic", sub: "30 adaptive questions · 30 minutes" },
                  { num: "2", title: "Get Your Report", sub: "Instant skills breakdown · Level identification" },
                  { num: "3", title: "Start the Right Course", sub: "AI recommends your exact starting point" },
                ].map((step) => (
                  <div key={step.num} className="flex items-start gap-3 flex-1">
                    <div
                      className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full"
                      style={{
                        background: "rgba(249,115,22,0.2)",
                        border: "1.5px solid #93c5fd",
                        color: "#dbeafe",
                        fontWeight: 700,
                        fontSize: "14px",
                      }}
                    >
                      {step.num}
                    </div>
                    <div>
                      <p style={{ color: "white", fontWeight: 600, fontSize: "14px" }}>{step.title}</p>
                      <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "13px" }}>{step.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/programs/ai-diagnostic">
                <span
                  className="inline-flex items-center gap-2 rounded-xl font-bold transition"
                  style={{
                    background: "#2366c9",
                    color: "white",
                    fontSize: "16px",
                    padding: "14px 32px",
                    cursor: "pointer",
                  }}
                >
                  Take Free AI Diagnostic <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "13px", marginTop: "12px" }}>
                100% Free · No credit card · Instant results
              </p>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
