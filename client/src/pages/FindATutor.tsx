import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { Search } from "lucide-react";
import tutorDataRaw from "@/data/tutors/directory.json";

type TutorProfile = {
  id: string;
  name: string;
  title: string;
  initials: string;
  avatarColor: string;
  sessions: number;
  subjects: string[];
  subjectLabels: string[];
  subjectStyle: string[];
  grades: string[];
  gradeLabels: string[];
  formats: string[];
  city: string | null;
  bio: string;
  active: boolean;
};

const tutorData: TutorProfile[] = Array.isArray(tutorDataRaw) ? tutorDataRaw as TutorProfile[] : [];
const allTutors: TutorProfile[] = tutorData.filter((t) => t.active);

const subjectOptions = [
  { value: "all", label: "All Subjects" },
  { value: "english", label: "English Language" },
  { value: "mathematics", label: "Mathematics" },
  { value: "physics", label: "Physics" },
  { value: "chemistry", label: "Chemistry" },
  { value: "biology", label: "Biology" },
  { value: "economics", label: "Economics" },
  { value: "business", label: "Business" },
  { value: "urdu", label: "Urdu" },
  { value: "islamiyat", label: "Islamiyat" },
  { value: "alevel", label: "A-Level" },
];

const gradeOptions = [
  { value: "all", label: "All Grade Levels" },
  { value: "gr6-8", label: "Grade 6–8" },
  { value: "pre-olevel", label: "Pre-O-Level" },
  { value: "olevel", label: "O-Level / IGCSE" },
  { value: "alevel", label: "A-Level" },
];

const formatOptions = [
  { value: "all", label: "All Formats" },
  { value: "online", label: "Online" },
  { value: "physical", label: "Physical" },
];

/* ─── Tutor Card ─── */
function TutorCard({ tutor }: { tutor: TutorProfile }) {
  const avatarBg =
    tutor.avatarColor === "teal"
      ? "bg-brand-primary"
      : tutor.avatarColor === "blue"
        ? "bg-brand-sky"
        : "bg-brand-primary-dark";

  return (
    <div className="rounded-2xl border border-neutral-border bg-white shadow-sm overflow-hidden flex flex-col">
      {/* Card Top */}
      <div className="bg-gradient-to-r from-brand-primary to-brand-sky p-5 text-white">
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 rounded-full ${avatarBg} flex items-center justify-center text-white font-bold text-lg`}
          >
            {tutor.initials}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{tutor.name}</h3>
            <p className="text-sm text-white/80 truncate">{tutor.title}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-white/70">
            {tutor.sessions} sessions completed
          </span>
          <span className="text-xs font-medium bg-brand-primary px-2 py-0.5 rounded-full">
            T5 Certified
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 space-y-4">
        {/* Subjects */}
        <div>
          <span className="text-xs font-semibold text-brand-primary uppercase tracking-wide">
            Subjects
          </span>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {tutor.subjectLabels.map((label) => (
              <span
                key={label}
                className="text-xs px-2.5 py-1 rounded-full bg-brand-primary-soft text-brand-primary font-medium"
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Grade Levels */}
        <div>
          <span className="text-xs font-semibold text-neutral-muted uppercase tracking-wide">
            Grade Levels
          </span>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {tutor.gradeLabels.map((label) => (
              <span
                key={label}
                className="text-xs px-2.5 py-1 rounded-full bg-neutral-surface text-neutral-slate-gray font-medium"
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Format */}
        <div>
          <span className="text-xs font-semibold text-neutral-muted uppercase tracking-wide">
            Format Available
          </span>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {tutor.formats.includes("online") && (
              <span className="flex items-center gap-1.5 text-xs text-neutral-slate-gray">
                <span className="w-2 h-2 rounded-full bg-status-success" />
                Online
              </span>
            )}
            {tutor.formats.includes("physical") && (
              <span className="flex items-center gap-1.5 text-xs text-neutral-slate-gray">
                <span className="w-2 h-2 rounded-full bg-brand-primary" />
                Physical{tutor.city ? ` · ${tutor.city}` : ""}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-5 pt-0 flex gap-2">
        <Link
          href={`/contact?tutor=${tutor.id}`}
          className="flex-1 text-center text-sm font-semibold bg-brand-primary hover:bg-brand-primary-dark text-white py-2.5 rounded-lg transition-colors"
        >
          Request This Tutor
        </Link>
        <Link
          href={`/contact?tutor=${tutor.id}&demo=true`}
          className="flex-1 text-center text-sm font-semibold border border-brand-primary text-brand-primary hover:bg-brand-primary-soft py-2.5 rounded-lg transition-colors"
        >
          Free Demo
        </Link>
      </div>
    </div>
  );
}

/* ─── Empty State ─── */
function EmptyState() {
  return (
    <div className="col-span-full text-center py-16">
      <div className="mb-4 flex justify-center"><Search className="h-12 w-12 text-brand-primary" /></div>
      <h3 className="text-xl font-semibold text-brand-navy mb-2">
        No tutors match your filters
      </h3>
      <p className="text-neutral-muted max-w-md mx-auto mb-6">
        Try adjusting your search criteria or clearing filters to see all
        available tutors in our certified network.
      </p>
      <Link
        href="/contact"
        className="inline-block bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors"
      >
        Contact EduMeUp
      </Link>
    </div>
  );
}

/* ─── Main Page ─── */
export default function FindATutor() {
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("all");
  const [grade, setGrade] = useState("all");
  const [format, setFormat] = useState("all");

  const filteredTutors = useMemo(() => {
    return allTutors.filter((t) => {
      // Search filter
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesName = t.name.toLowerCase().includes(q);
        const matchesSubjects =
          t.subjects.some((s) => s.toLowerCase().includes(q)) ||
          t.subjectLabels.some((s) => s.toLowerCase().includes(q));
        if (!matchesName && !matchesSubjects) return false;
      }
      // Subject filter
      if (subject !== "all" && !t.subjects.includes(subject)) return false;
      // Grade filter
      if (grade !== "all" && !t.grades.includes(grade)) return false;
      // Format filter
      if (format !== "all" && !t.formats.includes(format)) return false;
      return true;
    });
  }, [search, subject, grade, format]);

  const clearFilters = () => {
    setSearch("");
    setSubject("all");
    setGrade("all");
    setFormat("all");
  };

  const hasActiveFilters =
    search !== "" || subject !== "all" || grade !== "all" || format !== "all";

  return (
    <Layout>
      <div className="min-h-screen bg-white font-sans text-slate-700">
      {/* ─── Hero Section ─── */}
      <section className="bg-brand-primary text-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm font-medium text-brand-sky uppercase tracking-wider mb-3">
            EduMeUp Certified Tutors
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Browse Our Tutor Directory
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Every tutor in our network is T5 Certified — trained, tested, and
            aligned to the EduMeUp methodology. Browse by subject, grade level,
            or format to find the right match for your child.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "T5 Certified",
              "Cambridge Aligned",
              "Free Demo Session",
              "Matched by EduMeUp",
              "Progress Tracked",
            ].map((pill) => (
              <span
                key={pill}
                className="text-xs font-medium bg-white/10 border border-white/20 px-3 py-1.5 rounded-full"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Sticky Filter Bar ─── */}
      <section className="sticky top-14 xl:top-16 z-30 bg-white border-b border-neutral-border shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <input
              type="text"
              placeholder="Search by name or subject..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 min-w-[180px] text-sm border border-neutral-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
            />

            {/* Subject Dropdown */}
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="text-sm border border-neutral-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
            >
              {subjectOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            {/* Grade Dropdown */}
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="text-sm border border-neutral-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
            >
              {gradeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            {/* Format Tabs */}
            <div className="flex rounded-lg border border-neutral-border overflow-hidden">
              {formatOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setFormat(opt.value)}
                  className={`text-sm px-3 py-2 font-medium transition-colors ${
                    format === opt.value
                      ? "bg-brand-primary text-white"
                      : "bg-white text-neutral-slate-gray hover:bg-neutral-surface"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-brand-primary hover:text-brand-primary-dark font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Count */}
          <p className="text-xs text-neutral-muted mt-2">
            Showing {filteredTutors.length} of {allTutors.length} certified
            tutors
          </p>
        </div>
      </section>

      {/* ─── Tutor Grid ─── */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTutors.length > 0 ? (
            filteredTutors.map((tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))
          ) : (
            <EmptyState />
          )}
        </div>
      </section>

      {/* ─── Notice Box ─── */}
      <section className="max-w-6xl mx-auto px-4 pb-10">
        <div className="bg-brand-primary-soft border border-neutral-border rounded-xl p-6">
          <h3 className="font-semibold text-brand-navy text-lg mb-2">
            Our Consultative Model
          </h3>
          <p className="text-sm text-neutral-slate-gray leading-relaxed">
            EduMeUp doesn't just list tutors — we match them. After you submit a
            request, our academic team reviews your child's needs, learning
            style, and goals to recommend the best-fit tutor. You'll receive a
            personalised recommendation within 24 hours, along with a free demo
            session to confirm the match before committing.
          </p>
        </div>
      </section>

      {/* ─── How to Book ─── */}
      <section className="bg-neutral-surface py-14">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-navy text-center mb-10">
            How to Book a Tutor
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Browse & Select",
                desc: "Explore our directory and choose a tutor that fits your subject and grade needs.",
              },
              {
                step: "2",
                title: "Submit a Request",
                desc: "Click 'Request This Tutor' and fill in a short form about your child's requirements.",
              },
              {
                step: "3",
                title: "Free Demo Session",
                desc: "We'll arrange a complimentary 30-minute session so you can evaluate the fit.",
              },
              {
                step: "4",
                title: "Start Learning",
                desc: "Once confirmed, your tutor begins with a structured plan aligned to EduMeUp's methodology.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-xl border border-neutral-border p-5 text-center"
              >
                <div className="w-10 h-10 rounded-full bg-brand-primary text-white font-bold flex items-center justify-center mx-auto mb-3">
                  {item.step}
                </div>
                <h4 className="font-semibold text-brand-navy mb-1">
                  {item.title}
                </h4>
                <p className="text-sm text-neutral-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Trust Numbers ─── */}
      <section className="bg-blue-50/50 py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { stat: "T5", label: "Certification Standard" },
              { stat: "81%", label: "Students Improve 2+ Grades" },
              { stat: "100%", label: "Cambridge Aligned Tutors" },
              { stat: "30 min", label: "Free Demo Session" },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-3xl md:text-4xl font-bold text-brand-navy mb-1">
                  {item.stat}
                </div>
                <p className="text-sm text-neutral-slate-gray">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-4">
            Not Sure Who to Choose?
          </h2>
          <p className="text-neutral-muted mb-8 max-w-xl mx-auto">
            Let our academic team recommend the perfect tutor based on your
            child's subject, grade, and learning style. It's free and takes less
            than 2 minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Get a Recommendation
            </Link>
            <Link
              href="/contact?demo=true"
              className="border border-brand-primary text-brand-primary hover:bg-brand-primary-soft font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Book a Free Demo
            </Link>
            <Link
              href="/for-parents"
              className="border border-neutral-border text-neutral-slate-gray hover:bg-neutral-surface font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Learn More for Parents
            </Link>
          </div>
        </div>
      </section>
      </div>
    </Layout>
  );
}

